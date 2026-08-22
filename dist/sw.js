/* sw.plantilla.js — el service worker. Gulp sustituye los tres __MARCADORES__. */

const VERSION = '1.23.4';
const HUELLA  = '839c2b44';
const ARMAZON = ["index.html","css/cubomatica.min.css","js/cubomatica.min.js","manifest.webmanifest","img/pieza-c1.webp","img/pieza-c5.webp","img/pieza-c10.webp","img/pieza-c20.webp","img/pieza-c50.webp","img/pieza-1.webp","img/pieza-2.webp","img/pieza-5.webp","img/pieza-10.webp","img/pieza-20.webp","img/pieza-50.webp","img/pieza-100.webp"];

const MAYOR = VERSION.split('.')[0];
const CACHE_ARMAZON = 'cubomatica-armazon-' + VERSION + '-' + HUELLA;
const CACHE_MUSICA  = 'cubomatica-musica-' + MAYOR;

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
  const req = e.request;
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
