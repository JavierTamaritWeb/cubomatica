/* 29-grafo.js — DAG de prerrequisitos de los 92 niveles */

var CB = CB || {};
CB.grafo = CB.grafo || {};

/* Un nivel está abierto si TODOS sus prerrequisitos se han superado.
   Superado = el niño lo ha visto al menos 3 veces con ≥60 % de acierto. Con un
   umbral del 100 % el grafo sería un muro; con 1 acierto suelto sería ruido. */
CB.grafo.superado = function (nivelId, perfil) {
  const e = (perfil && perfil.niveles) ? perfil.niveles[nivelId] : null;
  if (!e || !e.n) return false;
  return e.n >= 3 && (e.aciertos / e.n) >= 0.6;
};

CB.grafo.estado = function (nivelId, perfil) {
  const nivel = CB.catalogo.get(nivelId);
  if (!nivel) return 'bloqueado';
  const pre = nivel.prerrequisitos || [];
  let i;

  /* El contenido de un curso POSTERIOR al del perfil no existe todavía para
     ese niño: bloqueado aquí, y con ello fuera de desbloqueados(), de la
     frontera y de la cantera de una sola vez. */
  const cursoPerfil = CB.catalogo.cursoDe(perfil);
  if (nivel.curso > cursoPerfil) return 'bloqueado';

  /* Los niveles de ampliación siguen sus prerrequisitos, pero además exigen que
     el adulto haya activado su flag. Nunca bloquean nada nuclear (CU5). */
  if (nivel.ampliacion && nivel.flagAdulto) {
    const aj = (perfil && perfil.ajustes) ? perfil.ajustes : {};
    if (!aj[nivel.flagAdulto]) return 'bloqueado';
  }

  /* Un prerrequisito de un CURSO ANTERIOR al del perfil se da por satisfecho:
     quien entra en 4.º no ha «superado» nada de 3.º dentro del juego, y sin
     esta regla no desbloquearía ni un nivel. Las lagunas reales las cubren la
     calibración, la escalera y el 20 % de repaso de cursos anteriores. */
  for (i = 0; i < pre.length; i++) {
    const nivelPre = CB.catalogo.get(pre[i]);
    if (nivelPre && nivelPre.curso < cursoPerfil) continue;
    if (!CB.grafo.superado(pre[i], perfil)) return 'bloqueado';
  }
  return 'abierta';
};

/* Un curso está DOMINADO cuando todos sus niveles nucleares están superados
   con la definición de siempre (n≥3 y ≥60 %). Es lo que dispara la promoción
   al curso siguiente, con su felicitación, al final de la partida (E129). */
CB.grafo.cursoDominado = function (perfil, curso) {
  const nucleares = CB.catalogo.nuclearesDeCurso(curso);
  if (!nucleares.length) return false;
  let i;
  for (i = 0; i < nucleares.length; i++) {
    if (!CB.grafo.superado(nucleares[i].id, perfil)) return false;
  }
  return true;
};

CB.grafo.desbloqueados = function (perfil) {
  const ids = CB.catalogo.ids(), out = [];
  let i;
  for (i = 0; i < ids.length; i++) {
    if (CB.grafo.estado(ids[i], perfil) === 'abierta') out.push(ids[i]);
  }
  return out;
};

/* Frontera: abiertos y todavía sin empezar. Es lo que se destaca en el Mapa de
   Destrezas bajo el texto «Lo siguiente que puedes cavar». */
CB.grafo.frontera = function (perfil) {
  const abiertos = CB.grafo.desbloqueados(perfil), out = [];
  let i, e;
  for (i = 0; i < abiertos.length; i++) {
    e = (perfil && perfil.niveles) ? perfil.niveles[abiertos[i]] : null;
    if (!e || !e.n) out.push(abiertos[i]);
  }
  return out;
};

/* Camino de prerrequisitos hasta un nivel, en orden de aprendizaje. */
CB.grafo.rutaHasta = function (nivelId, perfil) {
  const visto = {}, ruta = [];
  function baja(id) {
    if (visto[id]) return;
    visto[id] = true;
    const n = CB.catalogo.get(id);
    if (!n) return;
    const pre = n.prerrequisitos || [];
    let i;
    for (i = 0; i < pre.length; i++) baja(pre[i]);
    ruta.push(id);
  }
  baja(nivelId);
  return ruta;
};

/* Un prerrequisito YA DOMINADO del concepto, para el escalón 4 de la escalera
   anti-frustración: reconstruir desde abajo (§12.5). */
CB.grafo.prerrequisitoDominado = function (nivelId, perfil) {
  const ruta = CB.grafo.rutaHasta(nivelId, perfil);
  let i, id;
  for (i = ruta.length - 2; i >= 0; i--) {     // -2: se salta el propio nivel
    id = ruta[i];
    if (CB.grafo.superado(id, perfil)) return id;
  }
  return null;
};

/* Verificaciones estructurales, usadas por casos-motor.js */

CB.grafo.esAciclico = function () {
  const ids = CB.catalogo.ids();
  const estado = {};   // 0 sin visitar, 1 en pila, 2 cerrado
  let ok = true;

  function visita(id) {
    if (estado[id] === 1) { ok = false; return; }
    if (estado[id] === 2) return;
    estado[id] = 1;
    const n = CB.catalogo.get(id);
    const pre = (n && n.prerrequisitos) ? n.prerrequisitos : [];
    for (let i = 0; i < pre.length; i++) visita(pre[i]);
    estado[id] = 2;
  }
  for (let i = 0; i < ids.length && ok; i++) visita(ids[i]);
  return ok;
};

/* Todo nodo alcanzable desde los que no tienen prerrequisitos. */
CB.grafo.huerfanos = function () {
  const ids = CB.catalogo.ids();
  let i, n;
  const alcanzable = {};
  let cambios = true;

  for (i = 0; i < ids.length; i++) {
    n = CB.catalogo.get(ids[i]);
    if (!n.prerrequisitos || !n.prerrequisitos.length) alcanzable[ids[i]] = true;
  }
  while (cambios) {
    cambios = false;
    for (i = 0; i < ids.length; i++) {
      if (alcanzable[ids[i]]) continue;
      n = CB.catalogo.get(ids[i]);
      const pre = n.prerrequisitos || [];
      let todos = pre.length > 0, j;
      for (j = 0; j < pre.length; j++) if (!alcanzable[pre[j]]) todos = false;
      if (todos) { alcanzable[ids[i]] = true; cambios = true; }
    }
  }
  const out = [];
  for (i = 0; i < ids.length; i++) if (!alcanzable[ids[i]]) out.push(ids[i]);
  return out;
};

/* CU5: ninguna ampliación es prerrequisito de un nivel nuclear. */
CB.grafo.ampliacionesComoPrerrequisito = function () {
  const ids = CB.catalogo.ids(), out = [];
  let i, j, n, pre, p;
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
