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

CB.pruebas.ejecutar = function (largo) {
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

    try {
      s.fn();
    } catch (e) {
      CB.pruebas.ok(false, 'la suite ha lanzado una excepción', e && e.message);
    }

    i++;
    document.getElementById('progreso').style.width =
      Math.round(i / CB.pruebas.suites.length * 100) + '%';
    CB.pruebas.render();
    /* setTimeout 0 entre suites: la pestaña respira y el resultado parcial se ve. */
    setTimeout(siguiente, 0);
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
