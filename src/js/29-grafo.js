/* ============================================================================
   29-grafo.js — DAG de prerrequisitos de los 92 niveles
   ----------------------------------------------------------------------------
   FUNCIÓN PURA. Lee CB.catalogo, no lo modifica.

   casos-motor.js verifica: el grafo es ACÍCLICO, TODO nodo es alcanzable desde
   el conjunto de niveles con prerrequisitos:[], y NINGUNA destreza con
   ampliacion:true es prerrequisito de una nuclear (CU5).
   ========================================================================== */

var CB = CB || {};
CB.grafo = CB.grafo || {};

/* Un nivel está abierto si TODOS sus prerrequisitos se han superado.
   Superado = el niño lo ha visto al menos 3 veces con ≥60 % de acierto. Con un
   umbral del 100 % el grafo sería un muro; con 1 acierto suelto sería ruido. */
CB.grafo.superado = function (nivelId, perfil) {
  var e = (perfil && perfil.niveles) ? perfil.niveles[nivelId] : null;
  if (!e || !e.n) return false;
  return e.n >= 3 && (e.aciertos / e.n) >= 0.6;
};

CB.grafo.estado = function (nivelId, perfil) {
  var nivel = CB.catalogo.get(nivelId);
  if (!nivel) return 'bloqueado';
  var pre = nivel.prerrequisitos || [], i;

  /* Los niveles de ampliación siguen sus prerrequisitos, pero además exigen que
     el adulto haya activado su flag. Nunca bloquean nada nuclear (CU5). */
  if (nivel.ampliacion && nivel.flagAdulto) {
    var aj = (perfil && perfil.ajustes) ? perfil.ajustes : {};
    if (!aj[nivel.flagAdulto]) return 'bloqueado';
  }

  for (i = 0; i < pre.length; i++) {
    if (!CB.grafo.superado(pre[i], perfil)) return 'bloqueado';
  }
  return 'abierta';
};

CB.grafo.desbloqueados = function (perfil) {
  var ids = CB.catalogo.ids(), out = [], i;
  for (i = 0; i < ids.length; i++) {
    if (CB.grafo.estado(ids[i], perfil) === 'abierta') out.push(ids[i]);
  }
  return out;
};

/* Frontera: abiertos y todavía sin empezar. Es lo que se destaca en el Mapa de
   Destrezas bajo el texto «Lo siguiente que puedes cavar». */
CB.grafo.frontera = function (perfil) {
  var abiertos = CB.grafo.desbloqueados(perfil), out = [], i, e;
  for (i = 0; i < abiertos.length; i++) {
    e = (perfil && perfil.niveles) ? perfil.niveles[abiertos[i]] : null;
    if (!e || !e.n) out.push(abiertos[i]);
  }
  return out;
};

/* Camino de prerrequisitos hasta un nivel, en orden de aprendizaje. */
CB.grafo.rutaHasta = function (nivelId, perfil) {
  var visto = {}, ruta = [];
  function baja(id) {
    if (visto[id]) return;
    visto[id] = true;
    var n = CB.catalogo.get(id);
    if (!n) return;
    var pre = n.prerrequisitos || [], i;
    for (i = 0; i < pre.length; i++) baja(pre[i]);
    ruta.push(id);
  }
  baja(nivelId);
  return ruta;
};

/* Un prerrequisito YA DOMINADO del concepto, para el escalón 4 de la escalera
   anti-frustración: reconstruir desde abajo (§12.5). */
CB.grafo.prerrequisitoDominado = function (nivelId, perfil) {
  var ruta = CB.grafo.rutaHasta(nivelId, perfil), i, id;
  for (i = ruta.length - 2; i >= 0; i--) {     // -2: se salta el propio nivel
    id = ruta[i];
    if (CB.grafo.superado(id, perfil)) return id;
  }
  return null;
};

/* ── Verificaciones estructurales, usadas por casos-motor.js ────────────── */

CB.grafo.esAciclico = function () {
  var ids = CB.catalogo.ids();
  var estado = {};   // 0 sin visitar, 1 en pila, 2 cerrado
  var ok = true;

  function visita(id) {
    if (estado[id] === 1) { ok = false; return; }
    if (estado[id] === 2) return;
    estado[id] = 1;
    var n = CB.catalogo.get(id);
    var pre = (n && n.prerrequisitos) ? n.prerrequisitos : [];
    for (var i = 0; i < pre.length; i++) visita(pre[i]);
    estado[id] = 2;
  }
  for (var i = 0; i < ids.length && ok; i++) visita(ids[i]);
  return ok;
};

/* Todo nodo alcanzable desde los que no tienen prerrequisitos. */
CB.grafo.huerfanos = function () {
  var ids = CB.catalogo.ids(), i, n;
  var alcanzable = {}, cambios = true;

  for (i = 0; i < ids.length; i++) {
    n = CB.catalogo.get(ids[i]);
    if (!n.prerrequisitos || !n.prerrequisitos.length) alcanzable[ids[i]] = true;
  }
  while (cambios) {
    cambios = false;
    for (i = 0; i < ids.length; i++) {
      if (alcanzable[ids[i]]) continue;
      n = CB.catalogo.get(ids[i]);
      var pre = n.prerrequisitos || [], todos = pre.length > 0, j;
      for (j = 0; j < pre.length; j++) if (!alcanzable[pre[j]]) todos = false;
      if (todos) { alcanzable[ids[i]] = true; cambios = true; }
    }
  }
  var out = [];
  for (i = 0; i < ids.length; i++) if (!alcanzable[ids[i]]) out.push(ids[i]);
  return out;
};

/* CU5: ninguna ampliación es prerrequisito de un nivel nuclear. */
CB.grafo.ampliacionesComoPrerrequisito = function () {
  var ids = CB.catalogo.ids(), out = [], i, j, n, pre, p;
  for (i = 0; i < ids.length; i++) {
    n = CB.catalogo.get(ids[i]);
    if (n.ampliacion) continue;
    pre = n.prerrequisitos || [];
    for (j = 0; j < pre.length; j++) {
      p = CB.catalogo.get(pre[j]);
      if (p && p.ampliacion) out.push(n.id + ' ← ' + p.id);
    }
  }
  return out;
};
