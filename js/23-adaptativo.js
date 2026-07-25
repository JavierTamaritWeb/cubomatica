/* ============================================================================
   23-adaptativo.js — Elo por DESTREZA (no por nivel)
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   POR QUÉ EL ELO VIVE EN LA DESTREZA Y NO EN EL NIVEL (PLAN §13.1): con 92
   niveles y partidas de 15 ítems, la mayoría de los niveles tendrían n < 5. Un
   Elo con 5 observaciones y K = 32 es RUIDO PURO, y elegirBeta seleccionaría
   niveles al azar durante las primeras 10 sesiones. Con 13 slugs, cada uno
   acumula muchas observaciones y converge deprisa.

     perfil.destrezas  → indexado por los 13 SLUGS  → theta, n, rtMediana, …
     perfil.niveles    → indexado por los 92 IDS    → n, aciertos, caja, D, …

   El Mapa de Destrezas se pinta desde perfil.niveles: eso es INFORMACIÓN.
   La elección de dificultad sale de perfil.destrezas: eso es MEDIDA.
   ========================================================================== */

var CB = CB || {};
CB.adaptativo = CB.adaptativo || {};

/* Lista CERRADA de los 13 slugs. casos-curriculo.js (CU6) comprueba que los 92
   niveles del catálogo apuntan a uno de estos. */
CB.adaptativo.SLUGS = [
  'numeracion', 'valor_posicional',
  'suma_sin_llevar', 'suma_llevada',
  'resta_sin_llevar', 'resta_llevada',
  'multiplicacion',
  'problemas_cambio', 'problemas_combinacion',
  'problemas_comparacion', 'problemas_igualacion',
  'dinero', 'vocabulario'
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
  var d = (perfil && perfil.destrezas) ? perfil.destrezas[destreza] : null;
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

/* ── POR QUÉ NO SE USA EL ELO CLÁSICO ────────────────────────────────────────
   El plan pedía dos cosas incompatibles: la actualización de Elo estándar
   `theta += K·(acierto − esperado)` y una banda objetivo con «probabilidad de
   acierto esperada ≈ 0,80-0,88». El Elo clásico converge al punto en que el
   acierto observado iguala a la expectativa logística; con adivinanza c y
   desliz s, ese punto fijo está en L = c/(c+s), que para el teclado (c = 0,02,
   s = 0,10) da un 16,7 % de aciertos. El niño sintético lo confirmó: 43,9 % y
   64,2 %, cayendo, en lugar del 75-92 % exigido.

   La regla que sí produce lo que el plan quiere es la de Robbins-Monro (la
   escalera clásica de la psicofísica): mover theta contra un OBJETIVO DE TASA.

        theta' = theta + K · (acierto − 0,80)

   Converge exactamente al punto en que el niño acierta el 80 % de las veces,
   sea cual sea su adivinanza o su desliz. Y da a `theta` un significado
   directo y explicable: «la dificultad a la que este niño acierta 8 de cada
   10». Con eso, la banda [theta−60, theta+120] de elegirBeta vuelve a ser
   coherente con la zona de desarrollo próximo que el plan describe.

   Documentado en docs/decisiones.md. Se recalibra en F10 con niños reales. */
CB.adaptativo.OBJETIVO_ACIERTO = 0.80;

/**
 * @param acierto 1 acierto a primer intento, 0 fallo.
 *                Un acierto en segundo intento se pasa como
 *                CB.adaptativo.PESO_INTENTO_2 (0,4): es aprendizaje, no dominio.
 */
CB.adaptativo.actualizar = function (destreza, acierto, beta, perfil) {
  if (!perfil.destrezas) perfil.destrezas = {};

  /* `destreza` es el SLUG, no el objeto de destreza. Pasarle el objeto no daba
     ningún error: JavaScript lo convertía a la cadena "[object Object]" y se
     creaba una destreza con ese nombre, que se guardaba en el perfil del niño y
     salía en el informe del adulto. Mientras tanto, la destreza de verdad no se
     actualizaba nunca y su competencia estimada se quedaba clavada.

     No es hipotético: es el fallo que cometí auditando este mismo motor, y
     tardé tres intentos en verlo porque nada se quejaba. Trece slugs, lista
     cerrada: cualquier otra cosa es un error de programación y tiene que
     notarse. */
  if (CB.adaptativo.SLUGS.indexOf(destreza) === -1) {
    throw new Error('CB.adaptativo.actualizar: destreza desconocida «' + destreza +
                    '». Se espera uno de los 13 slugs, no el objeto de destreza.');
  }

  var d = perfil.destrezas[destreza];
  if (!d) d = perfil.destrezas[destreza] = CB.adaptativo.nuevaDestreza(null);

  var K = CB.adaptativo.K(d.n || 0);
  var nuevo = CB.util.clamp(
    d.theta + K * (acierto - CB.adaptativo.OBJETIVO_ACIERTO),
    CB.adaptativo.THETA_MIN, CB.adaptativo.THETA_MAX
  );
  d.theta = isFinite(nuevo) ? Math.round(nuevo) : CB.adaptativo.THETA_INICIAL;
  return d.theta;
};

/* ── Banda objetivo ─────────────────────────────────────────────────────────
   La banda va POR DEBAJO de theta, no por encima. El plan escribía
   [theta−60, theta+120] y a la vez «probabilidad de acierto esperada ≈
   0,80-0,88»; son incompatibles: con la logística de Elo, un ítem cuya β iguala
   a θ da el 50 %, no el 80 %. Para acertar 8 de cada 10 hace falta que el ítem
   esté unos 340 puntos POR DEBAJO de la competencia del niño.

   Con esta banda y la regla de tasa objetivo de `actualizar`, el sistema es
   coherente: theta estima la competencia real, los ítems se sirven ~340 puntos
   por debajo, y el acierto observado se estabiliza en el 80 % que pide la zona
   de desarrollo próximo. */
CB.adaptativo.BANDA_INFERIOR = 420;
CB.adaptativo.BANDA_SUPERIOR = 260;

CB.adaptativo.elegirBeta = function (destreza, perfil) {
  var th = CB.adaptativo.theta(destreza, perfil);
  return [th - CB.adaptativo.BANDA_INFERIOR, th - CB.adaptativo.BANDA_SUPERIOR];
};

/* Registro completo de una respuesta en la destreza. */
CB.adaptativo.registrar = function (destreza, datos, perfil, hoyISO) {
  if (!perfil.destrezas) perfil.destrezas = {};
  var d = perfil.destrezas[destreza];
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

  var peso = datos.correcto
    ? (datos.intento === 1 ? 1 : CB.adaptativo.PESO_INTENTO_2)
    : 0;
  CB.adaptativo.actualizar(destreza, peso, datos.beta, perfil);

  return d;
};

CB.adaptativo.precision1er = function (d) {
  if (!d || !d.n) return 0;
  return (d.aciertosPrimerIntento || 0) / d.n;
};

/* ── Regla simple de respaldo (§13.2) ───────────────────────────────────────
   3 aciertos seguidos → sube; 2 fallos → baja. Activable por el adulto para
   depuración y para centros que prefieran un comportamiento predecible. */
CB.adaptativo.reglaSimple = function (nivelEstado) {
  var v = nivelEstado.ventanaSimple || [];
  var n = v.length, i, seguidos = 0;
  for (i = n - 1; i >= 0; i--) { if (v[i] === 1) seguidos++; else break; }
  if (seguidos >= 3) return +1;
  var fallos = 0;
  for (i = n - 1; i >= 0 && i >= n - 2; i--) if (v[i] === 0) fallos++;
  if (fallos >= 2) return -1;
  return 0;
};

/* ── Dificultad interna D del nivel (§8.2) ─────────────────────────────────
   Sube tras 3 aciertos consecutivos A PRIMER INTENTO; baja tras 2 fallos.
   D es interno al nivel y NO cambia el rango declarado en el catálogo. */
CB.adaptativo.actualizarD = function (nivelEstado, correcto, primerIntento) {
  nivelEstado.D = nivelEstado.D || 2;
  nivelEstado._racha = nivelEstado._racha || 0;
  nivelEstado._fallos = nivelEstado._fallos || 0;

  if (correcto && primerIntento) {
    nivelEstado._racha++;
    nivelEstado._fallos = 0;
    if (nivelEstado._racha >= 3 && nivelEstado.D < 3) {
      nivelEstado.D++;
      nivelEstado._racha = 0;
    }
  } else if (!correcto) {
    nivelEstado._fallos++;
    nivelEstado._racha = 0;
    if (nivelEstado._fallos >= 2 && nivelEstado.D > 1) {
      nivelEstado.D--;
      nivelEstado._fallos = 0;
    }
  } else {
    nivelEstado._racha = 0;
  }
  return nivelEstado.D;
};
