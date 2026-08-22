/* 05-voz.js — Lectura en voz alta y lectura guiada */

var CB = CB || {};
CB.voz = CB.voz || {};

CB.voz.MS_POR_PALABRA = 1000;
CB.voz.activa = true;
CB.voz.temporizador = null;
CB.voz.vozES = null;

CB.voz.disponible = function () {
  if (typeof speechSynthesis === 'undefined') return false;
  try {
    const vs = speechSynthesis.getVoices();
    if (!vs || !vs.length) return false;
    let i;
    for (i = 0; i < vs.length; i++) {
      if (vs[i].lang && vs[i].lang.toLowerCase().indexOf('es') === 0) {
        CB.voz.vozES = vs[i];
        return true;
      }
    }
    return false;
  } catch (e) { return false; }
};

/* La música se agacha mientras habla la voz. Un niño de 7 años que aún no lee
   con fluidez tendría que separar la voz de la música, que es exactamente el
   esfuerzo que la voz venía a ahorrarle. */
CB.voz.agacharMusica = function (b) {
  if (CB.musica && CB.musica.agachar) CB.musica.agachar(b);
};

CB.voz.cancelar = function () {
  if (CB.voz.temporizador) {
    clearTimeout(CB.voz.temporizador);
    CB.voz.temporizador = null;
  }
  try { if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); } catch (e) { }
  CB.voz.agacharMusica(false);
};

CB.voz.leer = function (texto, alTerminar) {
  if (!CB.voz.activa || !texto) { if (alTerminar) alTerminar(); return false; }
  CB.voz.cancelar();

  if (!CB.voz.disponible()) {
    if (alTerminar) alTerminar();
    return false;
  }
  try {
    const u = new SpeechSynthesisUtterance(String(texto));
    u.lang = 'es-ES';
    if (CB.voz.vozES) u.voice = CB.voz.vozES;
    u.rate = 0.85;                  // más lento que el habla adulta normal
    u.pitch = 1.05;
    u.onend = function () {
      CB.voz.agacharMusica(false);
      if (alTerminar) alTerminar();
    };
    u.onerror = function () {
      CB.voz.agacharMusica(false);
      if (alTerminar) alTerminar();
    };
    CB.voz.agacharMusica(true);
    speechSynthesis.speak(u);
    return true;
  } catch (e) {
    CB.voz.agacharMusica(false);
    if (alTerminar) alTerminar();
    return false;
  }
};

/**
 * Lectura guiada: resalta palabra a palabra a 1 s/palabra. Es el respaldo
 * cuando no hay voz española, y también un ajuste que el adulto puede forzar
 * para un lector muy incipiente.
 * @param alResaltar function(indicePalabra, palabra)
 */
CB.voz.lecturaGuiada = function (texto, alResaltar, alTerminar) {
  CB.voz.cancelar();
  const palabras = CB.util.palabras(texto);
  let i = 0;

  function paso() {
    if (i >= palabras.length) {
      CB.voz.agacharMusica(false);
      if (alResaltar) alResaltar(-1, null);
      if (alTerminar) alTerminar();
      return;
    }
    if (alResaltar) alResaltar(i, palabras[i]);
    i++;
    CB.voz.temporizador = setTimeout(paso, CB.voz.MS_POR_PALABRA);
  }
  CB.voz.agacharMusica(true);
  paso();
  return palabras.length * CB.voz.MS_POR_PALABRA;
};

/* El botón de altavoz: intenta voz real y, si no la hay, guía la lectura.
   Nunca no hace nada. */
CB.voz.leerOGuiar = function (texto, alResaltar, alTerminar) {
  if (CB.voz.disponible()) {
    return { modo: 'voz', ms: CB.voz.leer(texto, alTerminar) ? 0 : 0 };
  }
  return { modo: 'guiada', ms: CB.voz.lecturaGuiada(texto, alResaltar, alTerminar) };
};

/* Algunas plataformas cargan las voces de forma asíncrona. */
CB.voz.precargar = function () {
  if (typeof speechSynthesis === 'undefined') return;
  try {
    CB.voz.disponible();
    speechSynthesis.onvoiceschanged = function () { CB.voz.disponible(); };
  } catch (e) { }
};
