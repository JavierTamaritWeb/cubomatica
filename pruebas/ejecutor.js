/* ejecutor.js — Ejecutor propio de la suite. Verde/rojo por caso. */

var CB = CB || {};
CB.pruebas = CB.pruebas || {};

CB.pruebas.suites = [];
CB.pruebas.modoLargo = false;
CB.pruebas.total = 0;
CB.pruebas.fallos = 0;
CB.pruebas.saltados = 0;
CB.pruebas._capturaGlobalInstalada = false;

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

/* Es exactamente la clase de falso verde que una auditoría debe impedir. */
CB.pruebas.capturarErroresGlobales = function () {
  if (CB.pruebas._capturaGlobalInstalada) return;
  CB.pruebas._capturaGlobalInstalada = true;

  function registrar(tipo, causa) {
    var detalle = causa && (causa.stack || causa.message) ?
      (causa.stack || causa.message) : String(causa || 'sin detalle');
    CB.pruebas.ok(false, tipo, detalle);
    CB.pruebas.render();
  }

  window.addEventListener('error', function (ev) {
    registrar('excepción no capturada', ev.error || ev.message);
  });
  window.addEventListener('unhandledrejection', function (ev) {
    registrar('promesa rechazada sin manejar', ev.reason);
  });
};

CB.pruebas.capturarErroresGlobales();

/* Si el navegador no deja leerlas —pasa al abrir la página por `file://`— devuelve null, y quien llama debe tratar ese null como un fallo con instrucciones, nunca como un permiso para saltarse la comprobación. */
CB.pruebas.claseEnHoja = function (nombre) {
  var busca = '.' + nombre.replace(/^\./, '');
  var i, hojas = document.styleSheets, reglas;
  var visto = false;
  for (i = 0; i < hojas.length; i++) {
    try { reglas = hojas[i].cssRules; } catch (e) { continue; }   // otra procedencia
    if (!reglas) continue;
    visto = true;
    if (CB.pruebas._buscaEn(reglas, busca)) return true;
  }
  return visto ? false : null;
};

CB.pruebas._buscaEn = function (reglas, busca) {
  var k, r;
  for (k = 0; k < reglas.length; k++) {
    r = reglas[k];
    if (r.selectorText && r.selectorText.indexOf(busca) !== -1) {
      /* Que no case `.veta-larga` cuando se pregunta por `.veta`: detrás del
         nombre solo puede venir algo que no sea letra, cifra, guion ni _. */
      var re = new RegExp('\\' + busca.replace(/[-]/g, '\\-') + '(?![\\w-])');
      if (re.test(r.selectorText)) return true;
    }
    if (r.cssRules && CB.pruebas._buscaEn(r.cssRules, busca)) return true;
  }
  return false;
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

/* Pasa con solo pulsar dos veces «Suite rápida», y en una pestaña de segundo plano (donde Chrome estrangula los setTimeout y una ejecución tarda 80 s en vez de 9) es lo normal, no lo raro. */
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
