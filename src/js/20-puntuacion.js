/* 20-puntuacion.js — Requisitos 6 y 7 del usuario */

var CB = CB || {};
CB.puntuacion = CB.puntuacion || {};

/* Punto medio del rango 0,6-1,4. Ni premia ni castiga: el modo sin reloj no
   puede ser ni el que más puntúa ni el que menos (antifarmeo, §11.3). La ventaja
   de los modos con reloj vive FUERA de esta fórmula, en CB.modos, y por eso esta
   regla sigue significando lo mismo que el primer día. */
CB.puntuacion.M_SIN_PRISA = 0.85;
CB.puntuacion.M_MIN = 0.6;
CB.puntuacion.M_MAX = 1.4;

/* Factor del acierto en segundo intento: es APRENDIZAJE, no castigo (§11.5). */
CB.puntuacion.F_INTENTO_2 = 0.4;

/**
 * @param item   {puntosBase, tIdeal, tLimite}
 * @param rtMs   tiempo de respuesta en ms (ya recortado por CB.util.rt)
 * @param estado {correcto, azar, intento, modoTiempo}
 */
CB.puntuacion.calcular = function (item, rtMs, estado) {
  item = item || {};
  estado = estado || {};

  let Pb = item.puntosBase;
  if (!isFinite(Pb) || Pb <= 0) Pb = 100;

  let tI = item.tIdeal, tL = item.tLimite;
  if (!isFinite(tI) || tI <= 0) tI = 8000;
  if (!isFinite(tL) || tL <= 0) tL = tI * 3;
  /* Guarda de división por cero: sin ella la fórmula revienta (§8.1). */
  if (tL - tI < 500) tL = tI + 500;

  if (!isFinite(rtMs) || rtMs < 0) rtMs = tI;

  let mT;
  if (estado.modoTiempo === 'facil') {
    mT = CB.puntuacion.M_SIN_PRISA;
  } else {
    /* El modo solo cambia CUÁNDO se agota el tiempo, no CÓMO se puntúa: sin esta regla, un modo con el doble de reloj regalaba multiplicadores altos por respuestas lentas y era el que más puntuaba. */
    mT = CB.util.clamp(
      CB.puntuacion.M_MAX - 0.8 * (rtMs - tI) / (tL - tI),
      CB.puntuacion.M_MIN, CB.puntuacion.M_MAX
    );
  }

  let puntos = 0, gemas = 0, fIntento = 1.0;

  if (estado.azar) {
    /* Requisito 7: responder al azar no puntúa. Pero no resta, no apaga luz y
       no bloquea contenido (§12.3). */
    puntos = 0; gemas = 0;
  } else if (estado.correcto) {
    fIntento = (estado.intento === 2) ? CB.puntuacion.F_INTENTO_2 : 1.0;
    puntos = Math.round(Pb * mT * fIntento);
    gemas = Math.max(1, Math.round(puntos / 50));
  }
  /* Fallo → 0 puntos, 0 gemas. NUNCA negativo. */

  if (!isFinite(puntos) || puntos < 0) puntos = 0;
  if (!isFinite(gemas) || gemas < 0) gemas = 0;

  return {
    puntos: puntos,
    gemas: gemas,
    mTiempo: mT,
    desglose: { Pb: Pb, mT: mT, fIntento: fIntento, azar: !!estado.azar }
  };
};

/* Cuántas «gemas rápidas» caen como bono retrospectivo: 0 a 3. Se muestra como
   GANANCIA («+2 por rapidez»), jamás como cuenta atrás en vivo (§3.4). */
CB.puntuacion.gemasDeRapidez = function (mTiempo) {
  if (!isFinite(mTiempo)) return 0;
  if (mTiempo >= 1.35) return 3;
  if (mTiempo >= 1.20) return 2;
  if (mTiempo >= 1.05) return 1;
  return 0;
};

/* Acumulación: delta siempre ≥ 0, el marcador nunca baja. */
CB.puntuacion.acumular = function (estado, delta) {
  const d = (isFinite(delta) && delta > 0) ? delta : 0;
  estado.puntos = Math.max(estado.puntos || 0, (estado.puntos || 0) + d);
  return estado.puntos;
};

/**
 * Bono de final de partida.
 * @param precision1er  0..1 de aciertos a primer intento
 * @param sinDanio      true si las 3 luces siguen encendidas
 * @param maraton       true si ha resuelto ≥ 15 ítems
 * @param preguntas     nº de ítems servidos
 * @param puntosSesion  puntos acumulados
 * @param modoTiempo    OPCIONAL. Sin él la función devuelve exactamente lo que
 *                      devolvía antes, que es lo que permite que las llamadas y
 *                      los guardianes viejos —A6 entre ellos— sigan valiendo.
 *                      Con él suma el extra del modo: es la única de las cinco
 *                      palancas que multiplica, y multiplica sobre lo YA ganado,
 *                      así que no puede convertir una sesión floja en un número
 *                      grande.
 */
CB.puntuacion.bonoFinal = function (precision1er, sinDanio, maraton, preguntas, puntosSesion, modoTiempo) {
  /* El niño pulsa Salir en el primer ítem: sin esta guarda salían NaN, y
     JSON.stringify convierte NaN en null; a partir de ahí toda la aritmética
     del perfil da NaN para siempre (§11.2). */
  if (!preguntas || preguntas === 0) return { factor: 1, extras: [], total: 0 };

  let factor = 1.0;
  const extras = [];
  const p = isFinite(precision1er) ? precision1er : 0;
  const ps = isFinite(puntosSesion) ? puntosSesion : 0;

  if (p >= 0.90)      { factor += 0.20; extras.push('precision90'); }
  else if (p >= 0.75) { factor += 0.10; extras.push('precision75'); }
  if (sinDanio)       { factor += 0.15; extras.push('sinDanio'); }
  if (maraton)        { factor += 0.10; extras.push('maraton'); }

  /* El extra del modo va CON SU RÓTULO en la lista de extras de p-fin: el niño
     tiene que poder ver por qué ha ganado más, no solo que ha ganado más.
     La clave se DECLARA, no se compone: 'modo_' + modo era un literal terminado
     en guion bajo, y el cruce de clases lo tomaba por un prefijo de clases
     dinamicas y dejaba de mirar todo lo que empezara por ahi. */
  const extraModo = CB.modos.extraBonoFinal(modoTiempo);
  const claveModo = CB.puntuacion.CLAVE_MODO[modoTiempo];
  if (extraModo > 0 && claveModo) { factor += extraModo; extras.push(claveModo); }

  let total = Math.max(0, Math.round(ps * (factor - 1)));
  if (!isFinite(total)) total = 0;

  return { factor: factor, extras: extras, total: total };
};

/* Qué extra añade cada modo. Solo los que dan bono: Fácil no aparece porque no
   suma nada, y una clave sin extra sería un rótulo que no se gana nunca. */
CB.puntuacion.CLAVE_MODO = {
  normal:  'modoNormal',
  experto: 'modoExperto'
};

/* Etiquetas en español para la pantalla de fin. Una clave sin rótulo aquí se
   pinta cruda en p-fin: el niño leería «modoExperto». */
CB.puntuacion.ETIQUETA_EXTRA = {
  precision90:  'Casi todo a la primera',
  precision75:  'Muchas a la primera',
  sinDanio:     'Las tres luces encendidas',
  maraton:      'Expedición larga',
  modoNormal:   'Reto del modo Normal',
  modoExperto:  'Reto del modo Experto'
};
