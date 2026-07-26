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
CB.pantallas._entrando = null;      // cerrojo de reentrada, ver CB.pantallas.ir

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

  /* CERROJO DE REENTRADA. Un handler de alEntrar que navegue a su propia
     pantalla se llama a sí mismo sin fin: ir() invoca al handler, el handler
     invoca a ir(), y así hasta desbordar la pila. Pasó de verdad con
     CB.adulto.abrir(), y el síntoma no fue un error en consola sino la pantalla
     de «algo ha ido mal», porque el catch de aquí abajo se traga la recursión y
     la convierte en un fallo genérico.

     El contrato es que un handler PINTA, no navega. Esto lo hace cumplir: la
     segunda entrada a la misma pantalla, dentro de la primera, no se ejecuta. */
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

      /* UNA <section> SIN NOMBRE ACCESIBLE NO ES UNA REGIÓN.
         Las diecisiete lo eran solo de nombre: un lector de pantalla no las
         lista, porque la especificación exige que una section tenga nombre para
         contar como landmark. Se lo damos apuntando a su propio <h1>, que ya
         existe y ya está garantizado —casos-carga.js exige exactamente uno por
         pantalla— así que no hay ningún texto nuevo que traducir ni mantener.

         Y `role="main"` va SOLO en la visible. Diecisiete «main» a la vez no es
         que sea incorrecto: es que deja de significar nada, que es peor. */
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
