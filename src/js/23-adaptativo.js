/* 23-adaptativo.js — Elo por DESTREZA (no por nivel) */

var CB = CB || {};
CB.adaptativo = CB.adaptativo || {};

/* Lista CERRADA de los 18 slugs. casos-curriculo.js (CU6) comprueba que todos
   los niveles del catálogo apuntan a uno de estos. Los cinco últimos llegan
   con los cursos 3.º-6.º (3.1.0). */
CB.adaptativo.SLUGS = [
  'numeracion', 'valor_posicional',
  'suma_sin_llevar', 'suma_llevada',
  'resta_sin_llevar', 'resta_llevada',
  'multiplicacion',
  'problemas_cambio', 'problemas_combinacion',
  'problemas_comparacion', 'problemas_igualacion',
  'dinero', 'vocabulario',
  'division', 'fracciones', 'decimales', 'porcentajes', 'enteros',
  'medida', 'tiempo'
];

CB.adaptativo.THETA_INICIAL = 1000;
CB.adaptativo.THETA_MIN = 400;
CB.adaptativo.THETA_MAX = 1800;

/* Peso del acierto en segundo intento en el Elo: es aprendizaje, no dominio. */
CB.adaptativo.PESO_INTENTO_2 = 0.4;

CB.adaptativo.nuevaDestreza = function (hoyISO) {
  return {
    theta: CB.adaptativo.THETA_INICIAL,
    n: 0, aciertos: 0, aciertosPrimerIntento: 0,
    rtMediana: 0, rtMuestras: [],
    ventana10: [],
    caja: 1, estabilidadDias: 1,
    ultimoRepasoISO: hoyISO || null,
    proximoRepasoISO: hoyISO || null,
    estado: 'nuevo',
    fallosSesion: 0,
    ejemplosFallados: []
  };
};

CB.adaptativo.theta = function (destreza, perfil) {
  const d = (perfil && perfil.destrezas) ? perfil.destrezas[destreza] : null;
  if (!d || !isFinite(d.theta)) return CB.adaptativo.THETA_INICIAL;
  return CB.util.clamp(d.theta, CB.adaptativo.THETA_MIN, CB.adaptativo.THETA_MAX);
};

/* K decreciente: menos ruido a medida que hay más observaciones. */
CB.adaptativo.K = function (n) {
  if (n < 10) return 40;
  if (n < 30) return 24;
  return 16;
};

/* Expectativa logística clásica. Se conserva porque es la referencia con la que
   se leen las betaBase del catálogo, PERO no es la regla de actualización.
   Ver la nota de abajo. */
CB.adaptativo.esperado = function (theta, beta) {
  return 1 / (1 + Math.pow(10, (beta - theta) / 400));
};

/* POR QUÉ NO SE USA EL ELO CLÁSICO */
CB.adaptativo.OBJETIVO_ACIERTO = 0.80;

/**
 * @param acierto 1 acierto a primer intento, 0 fallo.
 *                Un acierto en segundo intento se pasa como
 *                CB.adaptativo.PESO_INTENTO_2 (0,4): es aprendizaje, no dominio.
 */
CB.adaptativo.actualizar = function (destreza, acierto, beta, perfil) {
  if (!perfil.destrezas) perfil.destrezas = {};

  /* Mientras tanto, la destreza de verdad no se actualizaba nunca y su competencia estimada se quedaba clavada. */
  if (CB.adaptativo.SLUGS.indexOf(destreza) === -1) {
    throw new Error('CB.adaptativo.actualizar: destreza desconocida «' + destreza +
                    '». Se espera uno de los 13 slugs, no el objeto de destreza.');
  }

  let d = perfil.destrezas[destreza];
  if (!d) d = perfil.destrezas[destreza] = CB.adaptativo.nuevaDestreza(null);

  const K = CB.adaptativo.K(d.n || 0);
  const nuevo = CB.util.clamp(
    d.theta + K * (acierto - CB.adaptativo.OBJETIVO_ACIERTO),
    CB.adaptativo.THETA_MIN, CB.adaptativo.THETA_MAX
  );
  d.theta = isFinite(nuevo) ? Math.round(nuevo) : CB.adaptativo.THETA_INICIAL;
  return d.theta;
};

/* Banda objetivo */
CB.adaptativo.BANDA_INFERIOR = 420;
CB.adaptativo.BANDA_SUPERIOR = 260;

CB.adaptativo.elegirBeta = function (destreza, perfil) {
  const th = CB.adaptativo.theta(destreza, perfil);
  return [th - CB.adaptativo.BANDA_INFERIOR, th - CB.adaptativo.BANDA_SUPERIOR];
};

/* Registro completo de una respuesta en la destreza. */
CB.adaptativo.registrar = function (destreza, datos, perfil, hoyISO) {
  if (!perfil.destrezas) perfil.destrezas = {};
  let d = perfil.destrezas[destreza];
  if (!d) d = perfil.destrezas[destreza] = CB.adaptativo.nuevaDestreza(hoyISO);

  d.n = (d.n || 0) + 1;
  if (datos.correcto) {
    d.aciertos = (d.aciertos || 0) + 1;
    if (datos.intento === 1) d.aciertosPrimerIntento = (d.aciertosPrimerIntento || 0) + 1;
  } else {
    d.fallosSesion = (d.fallosSesion || 0) + 1;
    if (datos.ejemplo) {
      d.ejemplosFallados = d.ejemplosFallados || [];
      d.ejemplosFallados.unshift(datos.ejemplo);
      if (d.ejemplosFallados.length > 3) d.ejemplosFallados.length = 3;   // poda §15.6
    }
  }

  if (isFinite(datos.rtMs) && datos.rtMs > 0) {
    d.rtMuestras = d.rtMuestras || [];
    d.rtMuestras.push(datos.rtMs);
    if (d.rtMuestras.length > 12) d.rtMuestras.shift();                   // poda §15.6
    d.rtMediana = CB.util.mediana(d.rtMuestras);
  }

  d.ventana10 = d.ventana10 || [];
  d.ventana10.push(datos.correcto ? 1 : 0);
  if (d.ventana10.length > 10) d.ventana10.shift();

  const peso = datos.correcto
    ? (datos.intento === 1 ? 1 : CB.adaptativo.PESO_INTENTO_2)
    : 0;
  CB.adaptativo.actualizar(destreza, peso, datos.beta, perfil);

  return d;
};

CB.adaptativo.precision1er = function (d) {
  if (!d || !d.n) return 0;
  return (d.aciertosPrimerIntento || 0) / d.n;
};

/* Regla simple de respaldo (§13.2) */
CB.adaptativo.reglaSimple = function (nivelEstado) {
  const v = nivelEstado.ventanaSimple || [];
  const n = v.length;
  let i, seguidos = 0;
  for (i = n - 1; i >= 0; i--) { if (v[i] === 1) seguidos++; else break; }
  if (seguidos >= 3) return +1;
  let fallos = 0;
  for (i = n - 1; i >= 0 && i >= n - 2; i--) if (v[i] === 0) fallos++;
  if (fallos >= 2) return -1;
  return 0;
};

/* Dificultad interna D del nivel (§8.2) */
CB.adaptativo.actualizarD = function (nivelEstado, correcto, primerIntento) {
  nivelEstado.D = nivelEstado.D || 2;
  nivelEstado.rachaD = nivelEstado.rachaD || 0;
  nivelEstado.fallosD = nivelEstado.fallosD || 0;

  if (correcto && primerIntento) {
    nivelEstado.rachaD++;
    nivelEstado.fallosD = 0;
    if (nivelEstado.rachaD >= 3 && nivelEstado.D < 3) {
      nivelEstado.D++;
      nivelEstado.rachaD = 0;
    }
  } else if (!correcto) {
    nivelEstado.fallosD++;
    nivelEstado.rachaD = 0;
    if (nivelEstado.fallosD >= 2 && nivelEstado.D > 1) {
      nivelEstado.D--;
      nivelEstado.fallosD = 0;
    }
  } else {
    nivelEstado.rachaD = 0;
  }
  return nivelEstado.D;
};
