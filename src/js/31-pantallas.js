/* 31-pantallas.js — Navegación entre las 18 <section hidden> (PLAN §14.3) */

var CB = CB || {};
CB.pantallas = CB.pantallas || {};

CB.pantallas.IDS = [
  'p-portada', 'p-perfiles', 'p-calibracion', 'p-mapa', 'p-cantera', 'p-partida',
  'p-reparacion', 'p-descanso', 'p-jefe', 'p-fin', 'p-casa', 'p-glosario',
  'p-ajustes', 'p-adulto', 'p-informe', 'p-creditos', 'p-ayuda', 'p-error'
];

/* Pantallas sin botón Salir visible (§14.3) */
CB.pantallas.SIN_SALIR = ['p-portada', 'p-error'];

CB.pantallas.pila = [];
CB.pantallas.actual = null;
CB.pantallas._entrando = null;      // cerrojo de reentrada, ver CB.pantallas.ir
CB.pantallas._volviendo = false;    // ir() invocada desde atras(): no apila

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

  if (CB.pantallas.actual && CB.pantallas.actual !== id && !CB.pantallas._volviendo) {
    CB.pantallas.pila.push(CB.pantallas.actual);
    if (CB.pantallas.pila.length > 12) CB.pantallas.pila.shift();
  }
  CB.pantallas.actual = id;

  if (CB.pantallas.alEntrar[id] && CB.pantallas._entrando !== id) {
    var previo = CB.pantallas._entrando;
    CB.pantallas._entrando = id;
    try {
      CB.pantallas.alEntrar[id](props || {});
    } catch (e) {
      CB.pantallas.fallo(e);
    } finally {
      CB.pantallas._entrando = previo;
    }
  }

  /* El foco viaja al encabezado de la pantalla nueva: sin esto, un usuario de
     teclado o de lector de pantalla se queda en el botón que acaba de pulsar,
     que ya no existe. */
  var seccion = document.getElementById(id);
  if (seccion) {
    var h = seccion.querySelector('h1');
    if (h) {
      h.setAttribute('tabindex', '-1');

      /* Las dieciocho lo eran solo de nombre: un lector de pantalla no las lista, porque la especificación exige que una section tenga nombre para contar como landmark. */
      if (!h.id) h.id = id + '-titulo';
      seccion.setAttribute('aria-labelledby', h.id);

      try { h.focus({ preventScroll: false }); } catch (e2) { h.focus(); }
    }
    if (seccion.scrollTop) seccion.scrollTop = 0;
  }
  for (i = 0; i < CB.pantallas.IDS.length; i++) {
    el = document.getElementById(CB.pantallas.IDS[i]);
    if (!el) continue;
    if (CB.pantallas.IDS[i] === id) el.setAttribute('role', 'main');
    else el.removeAttribute('role');
  }

  CB.bus.emitir('pantalla', id);
  return id;
};

/* Pantallas de flujo: se sale de ellas hacia DELANTE y no se vuelve nunca. */
CB.pantallas.SIN_VUELTA = ['p-partida', 'p-reparacion', 'p-descanso', 'p-jefe',
                           'p-error', 'p-fin'];

/* Nunca deja al niño en un callejón sin salida. */
CB.pantallas.atras = function () {
  var destino = null;
  while (CB.pantallas.pila.length) {
    var cand = CB.pantallas.pila.pop();
    if (CB.pantallas.SIN_VUELTA.indexOf(cand) !== -1) continue;
    if (cand === CB.pantallas.actual) continue;
    destino = cand;
    break;
  }
  if (!destino) {
    destino = (!CB.perfil || CB.pantallas.actual === 'p-mapa') ? 'p-portada' : 'p-mapa';
  }

  CB.pantallas._volviendo = true;
  try {
    return CB.pantallas.ir(destino);
  } finally {
    CB.pantallas._volviendo = false;
  }
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

/* Delegación de eventos común a todas las pantallas */
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

    if (CB.pantallas.actual === 'p-partida' || CB.pantallas.actual === 'p-reparacion') {
      if (CB.partida && CB.partida.pausar) CB.partida.pausar();
      return;
    }
    CB.pantallas.atras();
  });
};
