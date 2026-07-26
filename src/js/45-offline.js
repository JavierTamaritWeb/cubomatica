/* ============================================================================
   45-offline.js — el service worker, y la guarda que impide que estorbe
   ----------------------------------------------------------------------------
   LO PRIMERO, PORQUE ES LO QUE MÁS SE MALENTIENDE: este juego YA funciona sin
   internet. Cero fetch, cero CDN, cero fuentes remotas; las tipografías se piden
   con local() y si no están, cae en la pila del sistema. Abrir dist/index.html
   con doble clic y jugar una expedición entera no toca la red ni una vez.

   Entonces, ¿para qué un service worker? Para tres cosas concretas, y ninguna es
   «que funcione sin conexión»:

     1. Que siga funcionando cuando el SERVIDOR se apaga. El caso real es un
        colegio que sirve el juego desde un portátil que se apaga a las 14:00.
     2. Arrancar sin idas y venidas de revalidación.
     3. La música sin conexión, bajo control explícito de un adulto: 42 MB que
        nadie debe descargar por accidente.

   UN SERVICE WORKER NO SE REGISTRA EN file://. Exige contexto seguro, y el modo
   de uso principal de este proyecto es el doble clic. Así que aquí lo importante
   no es registrarlo: es que NO ESTORBE cuando no se puede.

   Y puede fallar de DOS maneras distintas según el motor: unos lanzan un
   SecurityError síncrono y otros devuelven una promesa rechazada. Hacen falta
   las dos protecciones. Una promesa rechazada sin manejador imprime «Uncaught
   (in promise)» en la consola: no rompe nada, pero ensucia una consola que hoy
   está limpia — y una consola sucia es lo primero que un maestro lee como «está
   roto».
   ========================================================================== */

var CB = CB || {};
CB.offline = CB.offline || {};

CB.offline.DISPONIBLE = (function () {
  try {
    return typeof navigator !== 'undefined' &&
           'serviceWorker' in navigator &&
           typeof window !== 'undefined' &&
           window.isSecureContext === true &&
           location.protocol !== 'file:';
  } catch (e) { return false; }
})();

CB.offline.registrar = function () {
  if (!CB.offline.DISPONIBLE) return false;
  try {
    navigator.serviceWorker.register('sw.js', { scope: './' })
      .then(function () { }, function () { });   /* el rechazo TAMBIÉN se traga */
  } catch (e) { return false; }
  return true;
};

/* ── La música, bajo control de un adulto ──────────────────────────────────
   NUNCA cache.addAll(). Es atómico: una sola pista que falle —un corte de wifi,
   un 404— tira las nueve. Y si estuviera dentro del install del worker, ese
   fallo impediría instalar también el armazón de 300 KB: se perdería todo por
   querer ganar de más.

   Se piden de una en una, con progreso y con cancelación, porque son 42 MB en
   el disco de un aparato escolar y quien decide eso es una persona adulta. */
/* LAS RUTAS NO SE ESCRIBEN AQUÍ. Salen de CB.musica, que es su dueño único:
   `PISTAS[x].fichero` y `RAIZ`. Escribirlas otra vez sería una cuarta copia de
   la misma lista —ya hay tres: dist/audio/, la tabla de 07-musica.js y
   CREDITOS.txt— y la cuarta es la peligrosa, porque es la única que nadie mira
   al renombrar un fichero: la música seguiría sonando con normalidad y solo
   fallaría la descarga sin conexión, meses después y en otro sitio.
   Se leen en el momento de llamar, no al definir, para no atarse al orden de
   carga: 45 va después de 07, pero depender de eso no aporta nada. */
CB.offline.urlesPistas = function () {
  var m = CB.musica;
  if (!m || !m.PISTAS) return [];
  var raiz = m.RAIZ || 'audio/';
  var urles = [];
  for (var k in m.PISTAS) {
    if (Object.prototype.hasOwnProperty.call(m.PISTAS, k)) urles.push(raiz + m.PISTAS[k].fichero);
  }
  return urles;
};

CB.offline.CACHE_MUSICA = 'cubomatica-musica';
CB.offline._cancelar = false;

/* CONTAR LO QUE FALLA, NO SOLO LO QUE TERMINA. Antes esta función avanzaba el
   contador igual en el camino de éxito y en el de error y acababa informando
   siempre `ok: true`: con las nueve pistas caídas —un 404 tras renombrar un
   fichero, o el servidor apagado a media descarga— el panel decía «Listo: las 9
   pistas están guardadas» y no había ninguna. Es el peor reparto posible del
   error, porque el adulto se lleva la tableta al sitio sin wifi creyendo que la
   música va dentro. Ahora `ok` significa lo que dice: las nueve, guardadas. */
CB.offline.descargarMusica = function (alAvanzar, alTerminar) {
  var urles = CB.offline.urlesPistas();
  if (!CB.offline.DISPONIBLE || typeof caches === 'undefined' || !urles.length) {
    if (alTerminar) alTerminar({ ok: false, motivo: 'no-disponible', hechas: 0, fallos: 0 });
    return;
  }
  CB.offline._cancelar = false;
  var total = urles.length;
  var i = 0, guardadas = 0, fallos = 0;

  caches.open(CB.offline.CACHE_MUSICA + '-' + CB.offline.mayor()).then(function (c) {
    function siguiente() {
      if (CB.offline._cancelar) {
        if (alTerminar) alTerminar({ ok: false, motivo: 'cancelado', hechas: guardadas, fallos: fallos });
        return;
      }
      if (i >= total) {
        if (alTerminar) {
          alTerminar(fallos === 0
            ? { ok: true, hechas: guardadas, fallos: 0 }
            : { ok: false, motivo: 'fallos', hechas: guardadas, fallos: fallos });
        }
        return;
      }
      var url = urles[i];
      /* Una pista que falla no tira las otras ocho —por eso no se usa addAll,
         que es atómico—, pero SÍ se cuenta y sale en el resultado. */
      c.add(url).then(function () {
        i++; guardadas++;
        if (alAvanzar) alAvanzar(i, total, guardadas);
        siguiente();
      }, function () {
        i++; fallos++;
        if (alAvanzar) alAvanzar(i, total, guardadas);
        siguiente();
      });
    }
    siguiente();
  }, function () {
    if (alTerminar) alTerminar({ ok: false, motivo: 'sin-cache', hechas: 0, fallos: 0 });
  });
};

CB.offline.cancelarDescarga = function () { CB.offline._cancelar = true; };

/* La caché de música se indexa por versión MAYOR, no por versión completa: los
   nueve MP3 son una lista cerrada que no cambia nunca, y volver a bajar 42 MB
   porque se ha tocado el CSS es inaceptable. */
CB.offline.mayor = function () {
  return String(CB.VERSION || '0').split('.')[0];
};

/* Y el botón que un maestro puede pulsar sin saber qué es un service worker
   cuando algo se queda pegado. Es lo que evita el peor fallo de esta fase: un
   worker mal invalidado sirviendo la versión de la semana pasada para siempre. */
CB.offline.olvidarTodo = function (alTerminar) {
  if (typeof caches === 'undefined') { if (alTerminar) alTerminar(false); return; }
  caches.keys().then(function (claves) {
    var pendientes = claves.filter(function (k) { return k.indexOf('cubomatica-') === 0; });
    if (!pendientes.length) { if (alTerminar) alTerminar(true); return; }
    var n = 0;
    pendientes.forEach(function (k) {
      caches['delete'](k).then(function () {
        if (++n === pendientes.length && alTerminar) alTerminar(true);
      });
    });
  }, function () { if (alTerminar) alTerminar(false); });
};

/* Cuánto ocupa lo descargado, para poder decírselo al adulto antes de que
   decida. Sin esto, «Borrar la música» es un botón que no se sabe si hace algo. */
CB.offline.musicaGuardada = function (alSaber) {
  if (typeof caches === 'undefined') { alSaber(0); return; }
  caches.open(CB.offline.CACHE_MUSICA + '-' + CB.offline.mayor()).then(function (c) {
    c.keys().then(function (ks) { alSaber(ks.length); }, function () { alSaber(0); });
  }, function () { alSaber(0); });
};
