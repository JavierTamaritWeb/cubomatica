/* sw.plantilla.js — el service worker. Gulp sustituye los tres __MARCADORES__. */

var VERSION = '__VERSION__';
var HUELLA  = '__HUELLA__';
var ARMAZON = __PRECACHE__;

var MAYOR = VERSION.split('.')[0];
var CACHE_ARMAZON = 'cubomatica-armazon-' + VERSION + '-' + HUELLA;
var CACHE_MUSICA  = 'cubomatica-musica-' + MAYOR;

/* install */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_ARMAZON).then(function (c) { return c.addAll(ARMAZON); })
  );
});

/* activate */
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

/* fetch */
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
