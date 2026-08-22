/* 21-antiazar.js — Requisito 7: penalizar responder al azar */

var CB = CB || {};
CB.antiazar = CB.antiazar || {};

CB.antiazar.T_MIN = 700;           // ms. Suelo absoluto del umbral.
CB.antiazar.SENALES_MINIMAS = 2;   // hacen falta ≥2 señales concurrentes.

/* Texto permitido y lista negra, para que casos-marca.js pueda comprobarlo. */
CB.antiazar.TEXTO_PERMITIDO = '¡Gluglú te ha mojado la pregunta! Léela otra vez.';
CB.antiazar.PROHIBIDO_EN_INTERFAZ =
  ['adivinar', 'al azar', 'trampas', 'en serio', 'de verdad', 'concéntrate'];

/**
 * @param item      {destreza, respuesta, formato}
 * @param rtMs      tiempo de respuesta
 * @param correcto  boolean
 * @param historial [{posicion, rtMs, correcto}] de la partida, más reciente al final
 * @param perfil    para la mediana personal de la destreza
 */
CB.antiazar.evaluar = function (item, rtMs, correcto, historial, perfil) {
  /* ← INVARIANTE POR CONSTRUCCIÓN. No tocar esta línea. */
  if (correcto) return { azar: false, senales: [] };

  var senales = [];
  var mediana = CB.antiazar.medianaPersonal(item ? item.destreza : null, perfil);
  var umbral = Math.max(CB.antiazar.T_MIN, 0.15 * mediana);

  if (isFinite(rtMs) && rtMs < umbral) senales.push('S1');
  if (CB.antiazar.mismaPosicion3(historial)) senales.push('S2');
  if (CB.antiazar.tresFallosRapidos(historial)) senales.push('S3');
  if (!CB.antiazar.respuestaPosible(item)) senales.push('S4');

  return { azar: senales.length >= CB.antiazar.SENALES_MINIMAS, senales: senales };
};

/* Mediana del tiempo de respuesta del niño en ESA destreza. Con menos de 5
   muestras no hay mediana que valga: se usa el respaldo declarado. */
CB.antiazar.medianaPersonal = function (destreza, perfil) {
  var d = (perfil && perfil.destrezas) ? perfil.destrezas[destreza] : null;
  if (d && d.rtMuestras && d.rtMuestras.length >= 5) {
    return CB.util.mediana(d.rtMuestras);
  }
  if (CB.catalogo && CB.catalogo.tIdealDe) {
    return CB.catalogo.tIdealDe(destreza);
  }
  return 8000;   // respaldo del respaldo: nunca 0
};

/* S2 — la misma posición de botón pulsada 3 veces seguidas. */
CB.antiazar.mismaPosicion3 = function (historial) {
  if (!historial || historial.length < 3) return false;
  var n = historial.length;
  var a = historial[n - 1], b = historial[n - 2], c = historial[n - 3];
  if (a.posicion == null || b.posicion == null || c.posicion == null) return false;
  return a.posicion === b.posicion && b.posicion === c.posicion;
};

/* S3 — 3 fallos, cada uno en menos de 2 s. */
CB.antiazar.tresFallosRapidos = function (historial) {
  if (!historial || historial.length < 3) return false;
  var n = historial.length, i, h;
  for (i = n - 3; i < n; i++) {
    h = historial[i];
    if (!h || h.correcto || !(h.rtMs < 2000)) return false;
  }
  return true;
};

/* S4 — respuesta imposible: fuera de [0, 999] o negativa. */
CB.antiazar.respuestaPosible = function (item) {
  if (!item) return true;
  var v = item.valorDado;
  if (v == null) return true;
  if (!isFinite(v)) return false;
  return v >= 0 && v <= 999;
};

/* Los efectos del azar. NUNCA apaga una luz (§12.1, regla 2) */
CB.antiazar.EFECTOS = {
  puntos: 0,
  gemas: 0,
  rompeRacha: true,
  cuentaParaLogros: false,
  bonoRapidez: false,
  itemsConConfirmacion: 3,
  bloqueoMs: 1200,
  microDescansoALaTercera: true,
  apagaLuz: false,          // ← invariante
  restaPuntosGanados: false,
  bloqueaContenido: false
};

/* Estado de los efectos pendientes tras una detección. Vive en la partida. */
CB.antiazar.nuevoEstado = function () {
  return { pendientes: 0, deteccionesSesion: 0 };
};

CB.antiazar.aplicar = function (est) {
  est.pendientes = CB.antiazar.EFECTOS.itemsConConfirmacion;
  est.deteccionesSesion = (est.deteccionesSesion || 0) + 1;
  return {
    confirmacionDoble: true,
    bloqueoMs: CB.antiazar.EFECTOS.bloqueoMs,
    fuerzaDescanso: est.deteccionesSesion >= 3
  };
};

/* ¿Este ítem hereda los efectos de una detección anterior? */
CB.antiazar.consumir = function (est) {
  if (!est || !est.pendientes || est.pendientes <= 0) {
    return { confirmacionDoble: false, bloqueoMs: 0 };
  }
  est.pendientes--;
  return { confirmacionDoble: true, bloqueoMs: CB.antiazar.EFECTOS.bloqueoMs };
};
