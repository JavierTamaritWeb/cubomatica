/* ============================================================================
   sw.plantilla.js — el service worker. Gulp sustituye los tres __MARCADORES__.
   ----------------------------------------------------------------------------
   NO SE EDITA dist/sw.js: se edita esto y se reconstruye. La versión y la huella
   las inyecta `gulp sw` leyendo src/js/00-nucleo.js y el contenido real de lo
   compilado, así que no pueden desviarse escribiéndolas a mano.

   EL PEOR FALLO POSIBLE DE ESTE FICHERO no es que no cachee: es que cachee de
   más y sirva una versión vieja para siempre. En un aula eso son veinticinco
   aparatos con el juego de la semana pasada y nadie sabiendo por qué. Contra eso
   hay cuatro cosas, y ninguna sobra:

     · el nombre de la caché lleva la VERSIÓN y además una HUELLA del contenido,
       para el caso «se corrige un fallo sin subir de versión»;
     · `activate` borra toda caché de armazón que no sea la actual;
     · NO hay skipWaiting() ni clients.claim(): la versión nueva entra en el
       siguiente arranque. Cambiar el JS bajo los pies de una partida en curso es
       peor que esperar, y este juego se abre y se cierra veinticinco veces al
       día;
     · y un botón «Borrar la caché y recargar» en el panel del adulto, que es lo
       que un maestro puede pulsar sin saber qué es un service worker.
   ========================================================================== */

var VERSION = '1.8.1';
var HUELLA  = '39952112';
var ARMAZON = ["index.html","css/cubomatica.min.css","js/cubomatica.min.js","manifest.webmanifest"];

var MAYOR = VERSION.split('.')[0];
var CACHE_ARMAZON = 'cubomatica-armazon-' + VERSION + '-' + HUELLA;
var CACHE_MUSICA  = 'cubomatica-musica-' + MAYOR;

/* ── install ───────────────────────────────────────────────────────────────
   Solo el armazón: HTML, CSS y JS minificados, unos 300 KB. La música NO entra
   aquí y es una decisión, no un olvido. cache.addAll() es atómico, así que una
   pista que falle tiraría las nueve; y como esto está dentro de waitUntil, ese
   fallo impediría instalar TAMBIÉN el armazón. Se perdería todo por querer ganar
   de más.
   Aritmética de aula, además: 42 MB × 25 tabletas ≈ 1 GB simultáneos. */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_ARMAZON).then(function (c) { return c.addAll(ARMAZON); })
  );
});

/* ── activate ──────────────────────────────────────────────────────────────
   Se borra todo armazón que no sea el de esta versión+huella. La música NO se
   borra salvo que cambie el mayor: los nueve MP3 son una lista cerrada que no
   cambia nunca, y volver a bajar 42 MB porque se ha tocado el CSS es
   inaceptable en la conexión de un colegio. */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (claves) {
      return Promise.all(claves.map(function (k) {
        if (k.indexOf('cubomatica-armazon-') === 0 && k !== CACHE_ARMAZON) {
          return caches['delete'](k);
        }
        if (k.indexOf('cubomatica-musica-') === 0 && k !== CACHE_MUSICA) {
          return caches['delete'](k);
        }
        return null;
      }));
    })
  );
});

/* ── fetch ─────────────────────────────────────────────────────────────────
   Cache-first, y solo GET del mismo origen. `navigator.onLine` no se consulta en
   ningún momento: miente —dice «conectado» con un cable puesto y sin salida— y
   la estrategia correcta es intentarlo y ver qué pasa, no preguntar.

   Lo que no está en caché se pide a la red y NO se guarda automáticamente. La
   música solo entra por el botón del panel del adulto: si se guardara al
   reproducirse, un niño con la música puesta se llevaría 42 MB al disco sin que
   nadie lo hubiera decidido. */
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req)['catch'](function () {
        /* Sin red y sin caché: para una navegación se devuelve el armazón, que
           es lo único que puede seguir siendo útil. Para un mp3 no hay nada que
           hacer y el juego sigue en silencio, que es un modo previsto. */
        if (req.mode === 'navigate') return caches.match('index.html');
        return new Response('', { status: 504, statusText: 'sin conexion' });
      });
    })
  );
});
