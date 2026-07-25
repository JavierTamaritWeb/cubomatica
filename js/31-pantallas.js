/* ============================================================================
   31-pantallas.js — Navegación entre las 17 <section hidden> (PLAN §14.3)
   ----------------------------------------------------------------------------
   Toca el DOM: pertenece a la serie 30- y está por tanto FUERA de la regla de
   frontera de §14.4.
   ========================================================================== */

var CB = CB || {};
CB.pantallas = CB.pantallas || {};

CB.pantallas.IDS = [
  'p-portada', 'p-perfiles', 'p-calibracion', 'p-mapa', 'p-cantera', 'p-partida',
  'p-reparacion', 'p-descanso', 'p-jefe', 'p-fin', 'p-casa', 'p-glosario',
  'p-ajustes', 'p-adulto', 'p-informe', 'p-creditos', 'p-error'
];

/* Pantallas sin botón Salir visible (§14.3) */
CB.pantallas.SIN_SALIR = ['p-portada', 'p-error'];

CB.pantallas.pila = [];
CB.pantallas.actual = null;

/* Handlers que un módulo puede registrar para reaccionar al entrar en su
   pantalla: CB.pantallas.alEntrar['p-mapa'] = function (props) {...} */
CB.pantallas.alEntrar = {};
CB.pantallas.alSalir  = {};

CB.pantallas.ir = function (id, props) {
  if (CB.pantallas.IDS.indexOf(id) === -1) {
    throw new Error('Pantalla desconocida: ' + id);
  }
  var i, el;

  if (CB.pantallas.actual && CB.pantallas.alSalir[CB.pantallas.actual]) {
    try { CB.pantallas.alSalir[CB.pantallas.actual](); } catch (e) { }
  }

  for (i = 0; i < CB.pantallas.IDS.length; i++) {
    el = document.getElementById(CB.pantallas.IDS[i]);
    if (el) el.hidden = (CB.pantallas.IDS[i] !== id);
  }

  if (CB.pantallas.actual && CB.pantallas.actual !== id) {
    CB.pantallas.pila.push(CB.pantallas.actual);
    if (CB.pantallas.pila.length > 12) CB.pantallas.pila.shift();
  }
  CB.pantallas.actual = id;

  if (CB.pantallas.alEntrar[id]) {
    try { CB.pantallas.alEntrar[id](props || {}); } catch (e) { CB.pantallas.fallo(e); }
  }

  /* El foco viaja al encabezado de la pantalla nueva: sin esto, un usuario de
     teclado o de lector de pantalla se queda en el botón que acaba de pulsar,
     que ya no existe. */
  var seccion = document.getElementById(id);
  if (seccion) {
    var h = seccion.querySelector('h1');
    if (h) {
      h.setAttribute('tabindex', '-1');
      try { h.focus({ preventScroll: false }); } catch (e2) { h.focus(); }
    }
    if (seccion.scrollTop) seccion.scrollTop = 0;
  }

  CB.bus.emitir('pantalla', id);
  return id;
};

/* Vuelve a la pantalla anterior; si no hay, al mapa (o a la portada si aún no
   hay perfil activo). Nunca deja al niño en un callejón sin salida. */
CB.pantallas.atras = function () {
  var anterior = CB.pantallas.pila.pop();
  var destino = anterior || (CB.perfil ? 'p-mapa' : 'p-portada');
  /* No se vuelve nunca a una pantalla de flujo: se sale de ellas hacia delante */
  if (destino === 'p-partida' || destino === 'p-reparacion' ||
      destino === 'p-descanso' || destino === 'p-jefe' || destino === 'p-error') {
    destino = CB.perfil ? 'p-mapa' : 'p-portada';
  }
  var i;
  for (i = 0; i < CB.pantallas.IDS.length; i++) {
    var el = document.getElementById(CB.pantallas.IDS[i]);
    if (el) el.hidden = (CB.pantallas.IDS[i] !== destino);
  }
  CB.pantallas.actual = destino;
  if (CB.pantallas.alEntrar[destino]) {
    try { CB.pantallas.alEntrar[destino]({}); } catch (e) { }
  }
  CB.bus.emitir('pantalla', destino);
  return destino;
};

/* Pantalla de error: se llama desde window.onerror y desde unhandledrejection */
CB.pantallas.fallo = function (e) {
  try {
    if (CB.perfil && CB.almacen && CB.almacen.guardarPerfil) {
      CB.almacen.guardarPerfil(CB.perfil);
    }
  } catch (e2) { /* si ni siquiera se puede guardar, seguimos: lo importante
                     es no dejar al niño con la pantalla congelada */ }

  var det = document.getElementById('error-detalle');
  if (det) {
    det.textContent = (e && e.message) ? String(e.message).slice(0, 160) : '';
  }
  var i;
  for (i = 0; i < CB.pantallas.IDS.length; i++) {
    var el = document.getElementById(CB.pantallas.IDS[i]);
    if (el) el.hidden = (CB.pantallas.IDS[i] !== 'p-error');
  }
  CB.pantallas.actual = 'p-error';
  /* La pantalla de error también avisa por el bus: si no, la música del mundo
     se queda sonando alegremente encima de «algo ha ido mal». */
  CB.bus.emitir('pantalla', 'p-error');
};

/* ── Delegación de eventos común a todas las pantallas ─────────────────── */
CB.pantallas.conectar = function () {
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    /* Sube hasta 4 niveles: los botones llevan spans dentro */
    var n = 0;
    while (t && t !== document.body && n < 4) {
      if (t.hasAttribute && t.hasAttribute('data-ir')) {
        CB.pantallas.ir(t.getAttribute('data-ir'));
        return;
      }
      if (t.hasAttribute && t.hasAttribute('data-salir')) {
        CB.pantallas.atras();
        return;
      }
      t = t.parentNode; n++;
    }
  });

  var volver = document.getElementById('btn-error-mapa');
  if (volver) {
    volver.addEventListener('click', function () {
      CB.pantallas.ir(CB.perfil ? 'p-mapa' : 'p-portada');
    });
  }

  /* Escape retrocede, salvo en portada y error */
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape') return;
    if (CB.pantallas.SIN_SALIR.indexOf(CB.pantallas.actual) !== -1) return;
    if (CB.pantallas.actual === 'p-partida') {
      if (CB.partida && CB.partida.pausar) CB.partida.pausar();
      return;
    }
    CB.pantallas.atras();
  });
};
