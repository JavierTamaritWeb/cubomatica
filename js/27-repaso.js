/* ============================================================================
   27-repaso.js — CB.leitner: 3 cajas y reinserción intra-partida
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   REINSERCIÓN: un ítem fallado vuelve a aparecer entre 3 y 5 ítems después, con
   OTROS NÚMEROS del mismo tipo. Nunca el mismo ítem literal: eso sería
   memorizar la respuesta, no aprender el procedimiento (PLAN §13.5).
   ========================================================================== */

var CB = CB || {};
CB.leitner = CB.leitner || {};

CB.leitner.CAJAS = 3;
CB.leitner.DIAS = { 1: 0, 2: 3, 3: 10 };   // caja 1 → hoy; 2 → +3 días; 3 → +10

CB.leitner.subir = function (estado) {
  estado.caja = Math.min(CB.leitner.CAJAS, (estado.caja || 1) + 1);
  return estado.caja;
};

CB.leitner.bajar = function (estado) {
  estado.caja = 1;                            // el fallo devuelve SIEMPRE a la 1
  return estado.caja;
};

CB.leitner.actualizar = function (estado, acierto) {
  return acierto ? CB.leitner.subir(estado) : CB.leitner.bajar(estado);
};

CB.leitner.proximoRepaso = function (estado, hoyISO) {
  var dias = CB.leitner.DIAS[estado.caja || 1];
  if (!isFinite(dias)) dias = 0;
  return CB.util.sumarDias(hoyISO, dias);
};

CB.leitner.venceHoy = function (estado, hoyISO) {
  if (!estado || !estado.proximoRepaso) return true;
  return CB.util.diasEntre(estado.proximoRepaso, hoyISO) >= 0;
};

/* ── Reinserción intra-partida ──────────────────────────────────────────── */

CB.leitner.nuevaCola = function () { return []; };

/**
 * Programa la reaparición de un nivel fallado entre 3 y 5 ítems después.
 * @param cola     lista de {nivelId, enIndice}
 * @param indiceActual posición del ítem que se acaba de fallar
 * @param rng      inyectado: nada de Math.random
 */
CB.leitner.programarReinsercion = function (cola, nivelId, indiceActual, rng) {
  var salto = CB.util.ent(rng, 3, 5);
  cola.push({ nivelId: nivelId, enIndice: indiceActual + salto });
  return cola;
};

/* Devuelve el nivelId que toca reinsertar en este índice, o null. */
CB.leitner.tocaReinsertar = function (cola, indice) {
  var i;
  for (i = 0; i < cola.length; i++) {
    if (cola[i].enIndice <= indice) {
      return cola.splice(i, 1)[0].nivelId;
    }
  }
  return null;
};
