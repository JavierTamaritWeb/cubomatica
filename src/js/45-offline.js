/* 45-offline.js — el service worker, y la guarda que impide que estorbe */

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

/* La música, bajo control de un adulto */
/* Escribirlas otra vez sería una cuarta copia de la misma lista —ya hay tres: dist/audio/, la tabla de 07-musica.js y CREDITOS.txt— y la cuarta es la peligrosa, porque es la única que nadie mira al renombrar un fichero: la música seguiría… */
CB.offline.urlesPistas = function () {
  const m = CB.musica;
  if (!m || !m.PISTAS) return [];
  const raiz = m.RAIZ || 'audio/';
  const urles = [];
  for (const k in m.PISTAS) {
    if (Object.prototype.hasOwnProperty.call(m.PISTAS, k)) urles.push(raiz + m.PISTAS[k].fichero);
  }
  return urles;
};

CB.offline.CACHE_MUSICA = 'cubomatica-musica';
CB.offline._cancelar = false;

/* CONTAR LO QUE FALLA, NO SOLO LO QUE TERMINA. */
CB.offline.descargarMusica = function (alAvanzar, alTerminar) {
  const urles = CB.offline.urlesPistas();
  if (!CB.offline.DISPONIBLE || typeof caches === 'undefined' || !urles.length) {
    if (alTerminar) alTerminar({ ok: false, motivo: 'no-disponible', hechas: 0, fallos: 0 });
    return;
  }
  CB.offline._cancelar = false;
  const total = urles.length;
  let i = 0, guardadas = 0, fallos = 0;

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
      const url = urles[i];
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
    const pendientes = claves.filter(function (k) { return k.indexOf('cubomatica-') === 0; });
    if (!pendientes.length) { if (alTerminar) alTerminar(true); return; }
    let n = 0;
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
