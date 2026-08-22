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

/* Pantallas de flujo: se sale de ellas hacia DELANTE y no se vuelve nunca.
   p-fin entra en la lista por lo mismo que las demás: es el final de una
   expedición terminada, y volver a él desde el mapa muestra el resumen de una
   partida que ya no existe. */
CB.pantallas.SIN_VUELTA = ['p-partida', 'p-reparacion', 'p-descanso', 'p-jefe',
                           'p-error', 'p-fin'];

/* Vuelve a la pantalla anterior; si no hay ninguna utilizable, al mapa (o a la
   portada, si ya estamos en el mapa o aún no hay perfil). Nunca deja al niño en
   un callejón sin salida.

   EL «SALIR» DEL MAPA QUE NO HACÍA NADA. Antes se sacaba UNA sola entrada de la
   pila y, si resultaba ser una pantalla de flujo, se caía al mapa — estando ya
   en el mapa. Es decir: destino === actual, se repintaba la misma pantalla y el
   botón parecía muerto. Y no era un caso raro sino EL camino normal: portada →
   mapa → partida → fin → SALIR deja la pila en [portada, mapa] con el mapa
   delante, así que el siguiente Salir se sacaba «p-mapa» a sí mismo. Lo mismo
   pasaba al salir del jefe o de una partida abandonada.

   Ahora se descartan TODAS las entradas que no sirven —las de flujo y la propia
   pantalla actual, que la pila puede contener porque atras() no apila— y solo
   cuando la pila se agota se recurre al destino de reserva. */
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

  /* SE DELEGA EN ir(), que es lo que debió hacerse desde el principio. Aquí
     estaban copiados a mano el manejador de salida (E59, y llegó dos versiones
     tarde), el barrido de `hidden` y el aviso al bus; y NO estaban el foco en el
     <h1>, el aria-labelledby, el role="main" ni el cerrojo de reentrada. O sea
     que salir con «Salir» dejaba el foco en un botón ya oculto y la pantalla
     nueva sin landmark, mientras entrar con ir() hacía las dos cosas bien.
     _volviendo es lo único que atras() necesita de propio: impide que ir() apile
     la pantalla que estamos abandonando, que convertiría atrás en adelante. */
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
    /* La reparación se comporta como la partida: PAUSA, no retroceso. Escape ahí
       llevaba al mapa —atras() remapea p-reparacion a p-mapa— dejando
       CB.partida.estado vivo detrás, es decir, con una expedición a medias y
       ninguna forma evidente de volver a ella. Pausar es lo que ya existe para
       ese caso y no obliga a inventar una pantalla nueva. */
    if (CB.pantallas.actual === 'p-partida' || CB.pantallas.actual === 'p-reparacion') {
      if (CB.partida && CB.partida.pausar) CB.partida.pausar();
      return;
    }
    CB.pantallas.atras();
  });
};
