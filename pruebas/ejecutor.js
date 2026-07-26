/* ============================================================================
   ejecutor.js — Ejecutor propio de la suite. Verde/rojo por caso.
   ----------------------------------------------------------------------------
   EJECUCIÓN POR LOTES OBLIGATORIA (PLAN §19.1): la suite grande corre en lotes
   con setTimeout(…, 0) entre ellos, con barra de progreso y resultado parcial
   visible. Sin esto, la pestaña se marca como «no responde» y la suite deja de
   ejecutarse, que es donde muere la regla de oro del proyecto.
   ========================================================================== */

var CB = CB || {};
CB.pruebas = CB.pruebas || {};

CB.pruebas.suites = [];
CB.pruebas.modoLargo = false;
CB.pruebas.total = 0;
CB.pruebas.fallos = 0;
CB.pruebas.saltados = 0;

CB.pruebas.suite = function (nombre, fn) {
  CB.pruebas.suites.push({ nombre: nombre, fn: fn });
};

CB.pruebas._actual = null;

CB.pruebas.ok = function (cond, texto, detalle) {
  CB.pruebas.total++;
  var li = document.createElement('div');
  li.className = 'caso ' + (cond ? 'ok' : 'mal');
  li.textContent = (cond ? '✔ ' : '✘ ') + texto + (cond || !detalle ? '' : ' → ' + detalle);
  if (CB.pruebas._actual) CB.pruebas._actual.appendChild(li);
  if (!cond) CB.pruebas.fallos++;
  return cond;
};

CB.pruebas.igual = function (a, b, texto) {
  return CB.pruebas.ok(a === b, texto, 'obtenido ' + JSON.stringify(a) +
                                       ', esperado ' + JSON.stringify(b));
};

CB.pruebas.saltar = function (texto, motivo) {
  CB.pruebas.saltados++;
  var li = document.createElement('div');
  li.className = 'caso saltado';
  li.textContent = '– ' + texto + ' (saltado: ' + motivo + ')';
  if (CB.pruebas._actual) CB.pruebas._actual.appendChild(li);
};

/* Perfil sintético limpio para las pruebas que necesitan uno. */
CB.pruebas.perfilNuevo = function () {
  var p = CB.almacen.perfilNuevo('p-test', 'Topo Cavador', 0, CB.util.hoyISO(), null);
  p.trimestreDeducido = 3;
  p.calibrado = true;
  return p;
};

CB.pruebas.render = function () {
  var r = document.getElementById('resumen');
  var verde = CB.pruebas.fallos === 0;
  r.className = verde ? 'verde' : 'rojo';
  r.textContent = (verde ? 'TODO EN VERDE — ' : 'HAY FALLOS — ') +
    CB.pruebas.total + ' comprobaciones, ' + CB.pruebas.fallos + ' fallos' +
    (CB.pruebas.saltados ? ', ' + CB.pruebas.saltados + ' saltadas' : '');
};

/* Cerrojo de ejecución. Las suites se encadenan con setTimeout, así que una
   segunda llamada mientras la primera sigue viva NO la cancela: las dos cadenas
   escriben en el mismo #salida y suman en el mismo contador. El resultado son
   más cajas de suite que suites y un total inflado —23 cajas para 15 suites,
   541 comprobaciones donde había 450— y encima parece que la suite no es
   determinista, que es la conclusión más cara posible.

   Pasa con solo pulsar dos veces «Suite rápida», y en una pestaña de segundo
   plano (donde Chrome estrangula los setTimeout y una ejecución tarda 80 s en
   vez de 9) es lo normal, no lo raro. */
CB.pruebas.ejecutando = false;

CB.pruebas.ejecutar = function (largo) {
  if (CB.pruebas.ejecutando) return false;
  CB.pruebas.ejecutando = true;

  CB.pruebas.modoLargo = !!largo;
  CB.pruebas.total = 0;
  CB.pruebas.fallos = 0;
  CB.pruebas.saltados = 0;

  var salida = document.getElementById('salida');
  while (salida.firstChild) salida.removeChild(salida.firstChild);

  var i = 0;
  var t0 = CB.util.ahora();

  function siguiente() {
    if (i >= CB.pruebas.suites.length) {
      CB.pruebas.ejecutando = false;
      CB.pruebas.render();
      var r = document.getElementById('resumen');
      r.textContent += '  ·  ' + Math.round(CB.util.ahora() - t0) + ' ms';
      document.getElementById('progreso').style.width = '100%';
      return;
    }
    var s = CB.pruebas.suites[i];
    var caja = document.createElement('div');
    caja.className = 'suite';
    var h = document.createElement('h2');
    h.textContent = s.nombre;
    caja.appendChild(h);
    salida.appendChild(caja);
    CB.pruebas._actual = caja;

    function cerrar() {
      i++;
      document.getElementById('progreso').style.width =
        Math.round(i / CB.pruebas.suites.length * 100) + '%';
      CB.pruebas.render();
      /* setTimeout 0 entre suites: la pestaña respira y el resultado parcial se ve. */
      setTimeout(siguiente, 0);
    }

    /* El catch mantiene viva la cadena, así que el cerrojo se suelta siempre en
       el `if` de arriba: una suite que revienta no lo deja echado. */
    var devuelto;
    try {
      devuelto = s.fn();
    } catch (e) {
      CB.pruebas.ok(false, 'la suite ha lanzado una excepción', e && e.message);
      cerrar();
      return;
    }

    /* UNA SUITE PUEDE DEVOLVER UNA PROMESA, y la cadena la espera. Hasta ahora
       no: se llamaba a s.fn() y se pasaba a la siguiente en el mismo turno.
       Consecuencia, y no es teórica: cualquier comprobación sobre algo asíncrono
       —una descarga, una caché, un callback— se escribía como
       `if (aunNoHaLlegado) pasa`, o sea PASABA SIEMPRE. Verde por no haber
       mirado, que es el peor verde que hay.
       Se reconoce por `.then` y no por `instanceof Promise` para no atarse a la
       implementación, y el rechazo cuenta como fallo de la suite en vez de
       imprimir «Uncaught (in promise)» y dejar la cadena colgada para siempre. */
    if (devuelto && typeof devuelto.then === 'function') {
      devuelto.then(cerrar, function (e) {
        CB.pruebas.ok(false, 'la suite ha rechazado su promesa', e && e.message);
        cerrar();
      });
      return;
    }
    cerrar();
  }
  siguiente();
};

CB.pruebas.conectarBotones = function () {
  document.getElementById('btn-rapida').onclick = function () { CB.pruebas.ejecutar(false); };
  document.getElementById('btn-larga').onclick = function () { CB.pruebas.ejecutar(true); };
  document.getElementById('btn-limpiar').onclick = function () {
    var s = document.getElementById('salida');
    while (s.firstChild) s.removeChild(s.firstChild);
    document.getElementById('resumen').textContent = 'Preparado.';
    document.getElementById('resumen').className = '';
  };
  /* Arranque automático en modo rápido: quien abre la suite quiere el resultado. */
  setTimeout(function () { CB.pruebas.ejecutar(false); }, 60);
};
