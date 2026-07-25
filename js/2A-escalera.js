/* ============================================================================
   2A-escalera.js — La escalera anti-frustración de 5 escalones
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   EL ESCALÓN 5 EXISTE PORQUE EL PLAN v1 NO DECÍA QUÉ PASABA EN EL 4.º FALLO DEL
   MISMO CONCEPTO, y ese niño —posible discalculia, o simplemente un mal día— es
   justo el que más importa. Sin escalón 5, el juego le seguía sirviendo el mismo
   concepto hasta agotarle las tres luces.

   El concepto se retira del guion SIN DECIRLE NADA AL NIÑO. Anunciar «voy a
   quitarte esto porque no te sale» convierte una ayuda en una etiqueta.
   ========================================================================== */

var CB = CB || {};
CB.escalera = CB.escalera || {};

CB.escalera.ESCALONES = {
  1: { accion: 'pista',        apagaLuz: false, rompeRacha: false },
  2: { accion: 'reparacion',   apagaLuz: true,  rompeRacha: true  },
  3: { accion: 'bajarD_opciones', apagaLuz: false, rompeRacha: false },
  4: { accion: 'prerrequisito',   apagaLuz: false, rompeRacha: false },
  5: { accion: 'enPausa',         apagaLuz: false, rompeRacha: false }
};

/**
 * @param fallosConcepto nº de fallos del MISMO concepto en esta partida
 * @param fallosItem     nº de fallos del ítem actual (1 o 2)
 */
CB.escalera.siguienteEscalon = function (fallosConcepto, fallosItem) {
  /* Escalones 1 y 2: dentro del propio ítem. */
  if (fallosItem === 1) {
    return { escalon: 1, accion: 'pista', apagaLuz: false, rompeRacha: false,
             texto: 'Rocarr te enseña por dónde va.' };
  }
  if (fallosItem >= 2 && fallosConcepto < 2) {
    return { escalon: 2, accion: 'reparacion', apagaLuz: true, rompeRacha: true,
             texto: 'Vamos a verlo paso a paso.' };
  }

  /* Escalones 3, 4 y 5: acumulados por CONCEPTO a lo largo de la partida. */
  if (fallosConcepto === 2) {
    return { escalon: 3, accion: 'bajarD_opciones', apagaLuz: true, rompeRacha: true,
             D: 1, formato: 'opciones4',
             texto: 'El siguiente de este tipo será más fácil.' };
  }
  if (fallosConcepto === 3) {
    return { escalon: 4, accion: 'prerrequisito', apagaLuz: true, rompeRacha: true,
             texto: 'Volvemos un paso atrás para coger carrerilla.' };
  }
  return { escalon: 5, accion: 'enPausa', apagaLuz: true, rompeRacha: true,
           silencioso: true,
           notaAdulto: 'Conviene trabajarlo con material manipulativo antes de ' +
                       'volver a la pantalla.' };
};

/* Aplica el escalón 5: retira el concepto de la sesión, sin avisar al niño. */
CB.escalera.pausarConcepto = function (perfil, nivelId) {
  if (!perfil.niveles) perfil.niveles = {};
  if (!perfil.niveles[nivelId]) {
    perfil.niveles[nivelId] = { n: 0, aciertos: 0, caja: 1, D: 1, ultimoISO: null, enPausa: false };
  }
  perfil.niveles[nivelId].enPausa = true;
  return perfil.niveles[nivelId];
};

/* Al empezar una sesión nueva se levantan todas las pausas: «no se vuelve a
   proponer hasta la siguiente sesión», no «nunca más». */
CB.escalera.levantarPausas = function (perfil) {
  if (!perfil || !perfil.niveles) return 0;
  var k, n = 0;
  for (k in perfil.niveles) {
    if (!Object.prototype.hasOwnProperty.call(perfil.niveles, k)) continue;
    if (perfil.niveles[k].enPausa) { perfil.niveles[k].enPausa = false; n++; }
  }
  return n;
};

/* Contador de fallos por concepto dentro de la partida. */
CB.escalera.nuevoContador = function () { return {}; };

CB.escalera.registrarFallo = function (contador, destreza) {
  contador[destreza] = (contador[destreza] || 0) + 1;
  return contador[destreza];
};

CB.escalera.fallosDe = function (contador, destreza) {
  return contador[destreza] || 0;
};
