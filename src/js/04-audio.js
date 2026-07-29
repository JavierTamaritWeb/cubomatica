/* ============================================================================
   04-audio.js — 12 efectos sintetizados con Web Audio. CERO ficheros de sonido
   ----------------------------------------------------------------------------
   Adaptador de plataforma declarado (§14.4).

   El contexto de audio NO se crea al cargar la página: los navegadores lo
   suspenden hasta que hay un gesto del usuario, y un AudioContext suspendido que
   nadie reanuda deja el juego mudo sin decir por qué. Se crea en el primer toque
   real (iniciar() se llama desde el botón JUGAR).

   REGLA DE §10.4: el sonido NUNCA es el único canal. Con el volumen a cero, toda
   la información sigue llegando por color + forma + movimiento + texto.
   ========================================================================== */

var CB = CB || {};
CB.audio = CB.audio || {};

CB.audio.ctx = null;
CB.audio.maestro = null;
CB.audio.silenciado = false;
CB.audio.vol = 0.7;

CB.audio.NOTAS = {
  do4: 261.63, re4: 293.66, mi4: 329.63, fa4: 349.23, sol4: 392.00,
  la4: 440.00, si4: 493.88, do5: 523.25, re5: 587.33, mi5: 659.25,
  fa5: 698.46, sol5: 783.99, la5: 880.00, do6: 1046.50
};

CB.audio.iniciar = function () {
  if (CB.audio.ctx) {
    if (CB.audio.ctx.state === 'suspended') { try { CB.audio.ctx.resume(); } catch (e) { } }
    return CB.audio.ctx;
  }
  var AC = (typeof AudioContext !== 'undefined') ? AudioContext
         : (typeof webkitAudioContext !== 'undefined') ? webkitAudioContext : null;
  if (!AC) return null;
  try {
    CB.audio.ctx = new AC();
    CB.audio.maestro = CB.audio.ctx.createGain();
    CB.audio.maestro.gain.value = CB.audio.silenciado ? 0 : CB.audio.vol;
    CB.audio.maestro.connect(CB.audio.ctx.destination);
  } catch (e) { CB.audio.ctx = null; }
  return CB.audio.ctx;
};

CB.audio.silenciar = function (b) {
  CB.audio.silenciado = !!b;
  if (CB.audio.maestro) CB.audio.maestro.gain.value = b ? 0 : CB.audio.vol;
  /* La música va por elementos <audio> aparte (07-musica.js explica por qué),
     así que el silencio del aparato tiene que alcanzarla a mano. Silenciar el
     juego y seguir oyendo la música sería el fallo más visible posible. */
  if (CB.musica && CB.musica.aplicarVolumenes) CB.musica.aplicarVolumenes();
  return CB.audio.silenciado;
};

CB.audio.volumen = function (v) {
  CB.audio.vol = CB.util.clamp(v, 0, 1);
  if (CB.audio.maestro && !CB.audio.silenciado) CB.audio.maestro.gain.value = CB.audio.vol;
  return CB.audio.vol;
};

/* Una nota chiptune: onda cuadrada con envolvente corta. */
CB.audio.nota = function (frec, cuando, duracion, tipo, ganancia) {
  var c = CB.audio.ctx;
  if (!c || CB.audio.silenciado) return;
  try {
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = tipo || 'square';
    osc.frequency.setValueAtTime(frec, c.currentTime + cuando);
    var pico = (ganancia == null ? 0.22 : ganancia);
    g.gain.setValueAtTime(0.0001, c.currentTime + cuando);
    g.gain.exponentialRampToValueAtTime(pico, c.currentTime + cuando + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + cuando + duracion);
    osc.connect(g); g.connect(CB.audio.maestro);
    osc.start(c.currentTime + cuando);
    osc.stop(c.currentTime + cuando + duracion + 0.02);
  } catch (e) { /* un fallo de audio jamás detiene la partida */ }
};

/* Ruido filtrado: piedra, madera, partículas. */
CB.audio.ruido = function (cuando, duracion, frecFiltro, ganancia) {
  var c = CB.audio.ctx;
  if (!c || CB.audio.silenciado) return;
  try {
    var n = Math.floor(c.sampleRate * duracion);
    var buf = c.createBuffer(1, Math.max(1, n), c.sampleRate);
    var datos = buf.getChannelData(0);
    var rng = CB.util.mulberry32(0x5EED + Math.floor(frecFiltro));
    var i;
    for (i = 0; i < n; i++) datos[i] = (rng() * 2 - 1) * (1 - i / n);

    var src = c.createBufferSource(); src.buffer = buf;
    var filtro = c.createBiquadFilter();
    filtro.type = 'lowpass'; filtro.frequency.value = frecFiltro || 900;
    var g = c.createGain(); g.gain.value = (ganancia == null ? 0.2 : ganancia);
    src.connect(filtro); filtro.connect(g); g.connect(CB.audio.maestro);
    src.start(c.currentTime + cuando);
  } catch (e) { }
};

/* ── Los 13 efectos ─────────────────────────────────────────────────────── */
CB.audio.EFECTOS = {

  acierto: function () {
    CB.audio.nota(CB.audio.NOTAS.do5, 0, 0.09);
    CB.audio.nota(CB.audio.NOTAS.mi5, 0.07, 0.09);
    CB.audio.nota(CB.audio.NOTAS.sol5, 0.14, 0.14);
  },

  /* Fallo: DOS notas descendentes SUAVES. Ni bocina, ni pitido de error, ni
     nada que suene a castigo (§3.3). */
  fallo: function () {
    CB.audio.nota(CB.audio.NOTAS.sol4, 0, 0.11, 'triangle', 0.16);
    CB.audio.nota(CB.audio.NOTAS.mi4, 0.10, 0.14, 'triangle', 0.16);
  },

  /* La luz que se apaga: Sol4 → Mi4, 180 ms. Sin estallido, sin sacudida. */
  luzApagada: function () {
    CB.audio.nota(CB.audio.NOTAS.sol4, 0, 0.09, 'sine', 0.18);
    CB.audio.nota(CB.audio.NOTAS.mi4, 0.09, 0.09, 'sine', 0.18);
  },

  /* La luz extra: Do5 → Mi5 → Sol5 ascendentes. */
  luzExtra: function () {
    CB.audio.nota(CB.audio.NOTAS.do5, 0, 0.13, 'square', 0.24);
    CB.audio.nota(CB.audio.NOTAS.mi5, 0.14, 0.13, 'square', 0.24);
    CB.audio.nota(CB.audio.NOTAS.sol5, 0.28, 0.30, 'square', 0.26);
  },

  picar: function () { CB.audio.ruido(0, 0.10, 1200, 0.18); },

  /* «Toc» de madera del toque prematuro durante los 800 ms de construcción. */
  toc: function () { CB.audio.ruido(0, 0.05, 380, 0.22); },

  /* ── EL CLIC DE PULSAR, y es el decimotercero ──────────────────────────────
     Se pedía que todos los botones sonaran al pulsarse. Hasta ahora sonaba lo
     que PASA —el acierto, el fallo, la gema, la luz— pero no el acto de tocar,
     así que un botón de navegación, uno de ajustes o el de pausa se pulsaban en
     silencio y no había forma de saber si el toque había entrado.

     Este es el sonido más frecuente del juego con diferencia, y por eso es el
     más corto y el más flojo de los trece: 35 ms y ganancia 0,12, contra los
     0,22 del «toc». Un clic que se oye tanto como una celebración deja de ser
     información y pasa a ser ruido — la misma regla que ordena las
     celebraciones, aplicada al sonido.

     Y suena DISTINTO del «toc»: el «toc» es ruido filtrado grave —«aún no»— y
     esto es una nota corta y clara —«sí»—. Que se distingan importa: son las dos
     respuestas posibles a la misma acción. */
  pulsar: function () {
    CB.audio.nota(CB.audio.NOTAS.do5, 0, 0.035, 'square', 0.12);
  },

  gema: function () {
    CB.audio.nota(CB.audio.NOTAS.la5, 0, 0.07, 'sine', 0.18);
    CB.audio.nota(CB.audio.NOTAS.do6, 0.06, 0.10, 'sine', 0.18);
  },

  subirNivel: function () {
    CB.audio.nota(CB.audio.NOTAS.do5, 0, 0.10);
    CB.audio.nota(CB.audio.NOTAS.fa5, 0.10, 0.10);
    CB.audio.nota(CB.audio.NOTAS.la5, 0.20, 0.10);
    CB.audio.nota(CB.audio.NOTAS.do6, 0.30, 0.26);
  },

  /* Rocarr: grave, lento, de piedra. */
  rocarr: function () {
    CB.audio.ruido(0, 0.16, 260, 0.20);
    CB.audio.nota(CB.audio.NOTAS.do4, 0.04, 0.20, 'triangle', 0.14);
  },

  /* Gluglú: agudo, rápido, de gota. Deliberadamente opuesto a Rocarr: un niño
     debe poder distinguirlos con los ojos cerrados (criterio de HECHO de F5). */
  gluglu: function () {
    CB.audio.nota(CB.audio.NOTAS.la5, 0, 0.05, 'sine', 0.16);
    CB.audio.nota(CB.audio.NOTAS.re5, 0.05, 0.09, 'sine', 0.16);
  },

  /* «Hurry up!»: tres notas ascendentes rápidas. Deliberadamente NO es una
     alarma. Una alarma a un niño de 7 años que está pensando le borra lo que
     tenía en la cabeza; esto tiene que sonar a que empieza algo, no a que se
     acaba algo. */
  prisa: function () {
    CB.audio.nota(CB.audio.NOTAS.sol4, 0,    0.07, 'square', 0.18);
    CB.audio.nota(CB.audio.NOTAS.si4,  0.07, 0.07, 'square', 0.18);
    CB.audio.nota(CB.audio.NOTAS.re5,  0.14, 0.07, 'square', 0.20);
    CB.audio.nota(CB.audio.NOTAS.sol5, 0.21, 0.16, 'square', 0.22);
  },

  cofre: function () {
    CB.audio.nota(CB.audio.NOTAS.mi5, 0, 0.08);
    CB.audio.nota(CB.audio.NOTAS.sol5, 0.08, 0.08);
    CB.audio.nota(CB.audio.NOTAS.do6, 0.16, 0.22);
    CB.audio.ruido(0.16, 0.20, 2400, 0.10);
  }
};

CB.audio.sfx = function (nombre) {
  if (!CB.audio.ctx) return false;
  var f = CB.audio.EFECTOS[nombre];
  if (!f) return false;
  try { f(); } catch (e) { }
  return true;
};

/* Al ocultarse la pestaña se suspende: si no, el audio sigue sonando de fondo
   en una pestaña que el niño ya no mira. */
CB.audio.conectarVisibilidad = function () {
  document.addEventListener('visibilitychange', function () {
    if (!CB.audio.ctx) return;
    try {
      if (document.hidden) CB.audio.ctx.suspend();
      else CB.audio.ctx.resume();
    } catch (e) { }
  });
};
