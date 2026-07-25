/* ============================================================================
   07-musica.js — Las 9 pistas de música de fondo
   ----------------------------------------------------------------------------
   Adaptador de plataforma (§14.4): toca el DOM y crea elementos <audio>. Está
   por tanto FUERA de la regla de frontera, igual que 04-audio.js y 05-voz.js.

   POR QUÉ <audio> Y NO WEB AUDIO. El resto del sonido del juego se sintetiza en
   04-audio.js y sale por el nodo maestro de Web Audio. La música NO puede ir por
   ahí: meter un fichero en un AudioContext exige decodeAudioData() sobre un
   ArrayBuffer, es decir fetch() o XMLHttpRequest, y sobre file:// eso está
   bloqueado por CORS. Un elemento <audio> con src relativo, en cambio, se carga
   como subrecurso del documento igual que una hoja de estilo, y funciona con
   doble clic. Ese es el criterio que manda: el juego se abre con doble clic.

   La consecuencia es que la música NO pasa por CB.audio.maestro y tiene su
   propio volumen. Se ha convertido en ventaja: la música lleva su nivel aparte
   del de los efectos, que es lo que uno quiere de todas formas.

   TRES COSAS QUE ESTE FICHERO ARREGLA Y QUE NO SON EVIDENTES:

   1. Las nueve pistas tienen 8,2 dB de diferencia de volumen entre la más
      fuerte y la más floja. Sin corregir, pasar del mapa a una partida en el
      Río hunde la música y volver la dispara. Cada pista lleva su ganancia.

   2. Cinco pistas acaban en silencio y dos empiezan con silencio. Con loop=true
      a secas, el bucle mete hasta tres segundos de nada. Cada pista declara
      dónde entra y dónde sale, y el bucle funde entre esos dos puntos.

   3. Los navegadores prohíben reproducir sonido antes de un gesto del usuario.
      Si play() se rechaza, no se pierde: queda pendiente y se reintenta en el
      primer toque o la primera tecla.
   ========================================================================== */

var CB = CB || {};
CB.musica = CB.musica || {};

/* ── Tabla CERRADA de pistas ────────────────────────────────────────────────
   gan   ganancia de normalización = 10^((−16 − volumenMedio) / 20), medido con
         ffmpeg -af volumedetect. Objetivo −16 dB.
   entra segundo en el que empieza la música de verdad (tras el silencio inicial)
   sale  segundo en el que empieza el silencio final, medido con silencedetect
         a −45 dB. El bucle vuelve a `entra` al llegar aquí.
   La equivalencia con el fichero original y el criterio de reparto están en
   docs/musica.md; los créditos, en audio/CREDITOS.txt.
   ────────────────────────────────────────────────────────────────────────── */
CB.musica.PISTAS = {
  temaPrincipal: { fichero: 'tema-principal.mp3', gan: 0.851, entra: 0,    sale: 137.0 },
  cantera:       { fichero: 'cantera.mp3',        gan: 0.631, entra: 0,    sale: 72.8 },
  calma:         { fichero: 'calma.mp3',          gan: 1.122, entra: 0,    sale: 239.9 },
  mundoPradera:  { fichero: 'mundo-pradera.mp3',  gan: 0.741, entra: 0,    sale: 108.4 },
  mundoBosque:   { fichero: 'mundo-bosque.mp3',   gan: 0.638, entra: 0.40, sale: 191.6 },
  mundoRio:      { fichero: 'mundo-rio.mp3',      gan: 1.603, entra: 0,    sale: 153.4 },
  mundoMina:     { fichero: 'mundo-mina.mp3',     gan: 1.084, entra: 0.45, sale: 240.0 },
  jefe:          { fichero: 'jefe.mp3',           gan: 1.189, entra: 0,    sale: 116.0 },
  victoria:      { fichero: 'victoria.mp3',       gan: 0.624, entra: 0,    sale: 105.5 }
};

/* Qué suena en cada una de las 17 pantallas.
   null  = silencio deliberado.
   La ausencia de una pantalla en esta tabla NO ocurre: están las 17, para que
   añadir una pantalla nueva y olvidarse de la música sea un fallo de prueba y
   no un silencio que nadie note. 'p-partida' se resuelve por el mundo. */
CB.musica.PANTALLAS = {
  'p-portada':     'temaPrincipal',
  'p-perfiles':    'temaPrincipal',
  'p-calibracion': 'temaPrincipal',
  'p-mapa':        'temaPrincipal',
  'p-ajustes':     'temaPrincipal',
  'p-creditos':    'temaPrincipal',
  'p-cantera':     'cantera',
  'p-casa':        'cantera',
  'p-glosario':    'cantera',
  'p-descanso':    'calma',
  'p-reparacion':  'calma',
  'p-informe':     'calma',
  'p-adulto':      'calma',
  'p-jefe':        'jefe',
  'p-fin':         'victoria',
  'p-partida':     '@mundo',
  'p-error':       null
};

/* Crédito de cada pista. La Pixabay Content License no exige atribución, pero
   el crédito le corresponde a quien compuso la música igual. Esta lista es la
   que pinta la pantalla de Créditos; audio/CREDITOS.txt dice lo mismo para
   quien abra la carpeta sin abrir el juego. */
CB.musica.CREDITOS = [
  { clave: 'temaPrincipal', autor: 'musicinmedia',        id: 381366, dura: '2:20' },
  { clave: 'victoria',      autor: 'musicinmedia',        id: 453214, dura: '1:49' },
  { clave: 'mundoPradera',  autor: 'Tunetank',            id: 347589, dura: '1:48' },
  { clave: 'mundoBosque',   autor: 'maksymmalko',         id: 385611, dura: '3:12' },
  { clave: 'mundoRio',      autor: 'viacheslavstarostin', id: 370830, dura: '2:35' },
  { clave: 'mundoMina',     autor: 'maksymmalko',         id: 358426, dura: '4:02' },
  { clave: 'jefe',          autor: 'u_z2x0wum3cm',        id: 394978, dura: '1:56' },
  { clave: 'calma',         autor: 'unrealmicikcz12',     id: 235545, dura: '4:00' },
  { clave: 'cantera',       autor: 'Tatamusic',           id: 423630, dura: '1:16' }
];

CB.musica.LICENCIA = 'Las nueve pistas de música son obra de sus autores y se ' +
  'usan bajo la Pixabay Content License, que permite el uso comercial y no ' +
  'comercial. Los ficheros no se han modificado: solo se ha cambiado su nombre.';

CB.musica.POR_BIOMA = {
  pradera: 'mundoPradera',
  bosque:  'mundoBosque',
  rio:     'mundoRio',
  mina:    'mundoMina'
};

/* Los cuatro niveles del ajuste. Son botones, no un deslizador: en esta
   interfaz no hay ni un solo control continuo y no va a haberlo ahora (§10.2).

   EL 0,62 DE «ALTA» NO ES UN GUSTO. El volumen que se le pide al elemento es
   nivel × ganancia de la pista, y hay ganancias por encima de 1 (mundo-rio
   venía 4 dB por debajo del resto y necesita 1,603). Si nivel × ganancia se
   pasa de 1, el recorte cae justo sobre la pista que necesitaba el empujón:
   la normalización se desactiva sola y vuelve el desnivel entre pistas que
   venía a quitar. 0,62 × 1,603 = 0,994. Lo comprueba casos-musica.js, así que
   una pista nueva más floja que mundo-rio suspende el test en vez de recortar
   en silencio. */
CB.musica.NIVELES = [
  { etiqueta: 'No',    valor: 0 },
  { etiqueta: 'Baja',  valor: 0.20 },
  { etiqueta: 'Media', valor: 0.40 },
  { etiqueta: 'Alta',  valor: 0.62 }
];
CB.musica.NIVEL_DEFECTO = 2;                       // «Media»

CB.musica.RAIZ = 'audio/';
CB.musica.MS_FUNDIDO = 900;                        // cruce entre pistas
CB.musica.S_BUCLE = 1.4;                           // fundido a cada lado del bucle
CB.musica.MS_TICK = 100;
CB.musica.AGACHADO = 0.30;                         // cuánto baja mientras habla la voz

CB.musica.base = CB.musica.NIVELES[CB.musica.NIVEL_DEFECTO].valor;
CB.musica.agachada = false;
CB.musica.pistaActual = null;
CB.musica.pendiente = null;                        // pista que espera un gesto
CB.musica.iniciada = false;
CB.musica.fallo = null;                            // motivo si la música no puede sonar

/* Dos canales: uno sale mientras el otro entra. Nunca hacen falta tres. */
CB.musica.canales = [
  { el: null, clave: null, f: 0, objetivo: 0 },
  { el: null, clave: null, f: 0, objetivo: 0 }
];
CB.musica._activo = 0;
CB.musica._reloj = null;

/* ── Volumen ────────────────────────────────────────────────────────────── */

/* El silencio del aparato manda sobre todo: si un adulto apaga el sonido,
   apaga TODO el sonido, no solo los efectos. */
CB.musica.volumenBase = function () {
  if (CB.audio && CB.audio.silenciado) return 0;
  return CB.musica.base;
};

CB.musica.volumenDe = function (canal) {
  var p = CB.musica.PISTAS[canal.clave];
  if (!p || !canal.el) return 0;
  var v = CB.musica.volumenBase() * p.gan * canal.f;
  if (CB.musica.agachada) v *= CB.musica.AGACHADO;
  v *= CB.musica.factorBucle(canal.el, p);
  return CB.util.clamp(v, 0, 1);
};

/* Fundido de entrada y de salida alrededor del punto de bucle. Devuelve 1 en
   todo el cuerpo de la pista y baja a 0 en los últimos S_BUCLE segundos y en
   los primeros S_BUCLE segundos tras dar la vuelta. */
CB.musica.factorBucle = function (el, p) {
  var fin = p.sale;
  if (el.duration && isFinite(el.duration) && fin > el.duration) fin = el.duration;
  var f = 1;
  var restante = fin - el.currentTime;
  var desde = el.currentTime - p.entra;
  if (restante < CB.musica.S_BUCLE) {
    f = Math.min(f, Math.max(0, restante / CB.musica.S_BUCLE));
  }
  if (desde < CB.musica.S_BUCLE) {
    f = Math.min(f, Math.max(0, desde / CB.musica.S_BUCLE));
  }
  return f;
};

CB.musica.aplicarVolumenes = function () {
  var i, c;
  for (i = 0; i < 2; i++) {
    c = CB.musica.canales[i];
    if (c.el) { try { c.el.volume = CB.musica.volumenDe(c); } catch (e) { } }
  }
};

/* ── Motor ──────────────────────────────────────────────────────────────── */
CB.musica.arrancarReloj = function () {
  if (CB.musica._reloj) return;
  CB.musica._reloj = setInterval(CB.musica.tick, CB.musica.MS_TICK);
};

CB.musica.pararReloj = function () {
  if (!CB.musica._reloj) return;
  clearInterval(CB.musica._reloj);
  CB.musica._reloj = null;
};

CB.musica.tick = function () {
  var paso = CB.musica.MS_TICK / CB.musica.MS_FUNDIDO;
  var vivo = false;
  var i, c, p, fin;

  for (i = 0; i < 2; i++) {
    c = CB.musica.canales[i];
    if (!c.el) continue;

    /* Fundido hacia el objetivo */
    if (c.f < c.objetivo) c.f = Math.min(c.objetivo, c.f + paso);
    else if (c.f > c.objetivo) c.f = Math.max(c.objetivo, c.f - paso);

    /* Salto de bucle: se da cuando ya se ha llegado al final útil */
    p = CB.musica.PISTAS[c.clave];
    if (p && !c.el.paused) {
      fin = p.sale;
      if (c.el.duration && isFinite(c.el.duration) && fin > c.el.duration) fin = c.el.duration;
      if (c.el.currentTime >= fin - 0.05) {
        try { c.el.currentTime = p.entra; } catch (e) { }
      }
    }

    /* Un canal apagado del todo se suelta: si no, quedan hasta nueve ficheros
       de audio decodificados a la vez en una sesión larga. */
    if (c.f <= 0 && c.objetivo === 0) {
      CB.musica.soltar(c);
    } else if (!c.el.paused) {
      vivo = true;
    }
  }

  CB.musica.aplicarVolumenes();
  if (!vivo) CB.musica.pararReloj();
};

CB.musica.soltar = function (c) {
  if (!c.el) return;
  try { c.el.pause(); c.el.removeAttribute('src'); c.el.load(); } catch (e) { }
  c.el = null;
  c.clave = null;
  c.f = 0;
  c.objetivo = 0;
};

/* ── Elementos ──────────────────────────────────────────────────────────── */
CB.musica.crearElemento = function (clave) {
  var p = CB.musica.PISTAS[clave];
  if (!p) return null;
  var el;
  try {
    el = document.createElement('audio');
  } catch (e) { return null; }
  el.src = CB.musica.RAIZ + p.fichero;
  el.preload = 'auto';
  el.loop = false;                       // el bucle lo lleva CB.musica.tick
  el.volume = 0;
  /* Un fichero que no se puede leer no puede dejar el juego sin música para
     siempre: se anota y se sigue. */
  el.addEventListener('error', function () {
    CB.musica.fallo = 'no se pudo leer ' + p.fichero;
  });
  return el;
};

/* ── API pública ────────────────────────────────────────────────────────── */

/**
 * Pone una pista con fundido cruzado. Si ya suena esa misma, no hace nada:
 * volver al mapa desde los ajustes no debe reiniciar el tema principal.
 * @param clave clave de CB.musica.PISTAS, o null para silencio
 */
CB.musica.poner = function (clave) {
  if (clave && !CB.musica.PISTAS[clave]) return false;
  if (CB.musica.pistaActual === clave) return true;
  CB.musica.pistaActual = clave;

  var i;
  /* Todo lo que suene se va apagando */
  for (i = 0; i < 2; i++) CB.musica.canales[i].objetivo = 0;

  if (!clave || CB.musica.volumenBase() <= 0) {
    CB.musica.arrancarReloj();
    return true;
  }

  /* El canal libre (o el que ya estaba más apagado) recibe la nueva pista */
  var destino = CB.musica.canales[1 - CB.musica._activo];
  if (destino.el) CB.musica.soltar(destino);
  CB.musica._activo = 1 - CB.musica._activo;

  destino.el = CB.musica.crearElemento(clave);
  if (!destino.el) return false;
  destino.clave = clave;
  destino.f = 0;
  destino.objetivo = 1;
  try { destino.el.currentTime = CB.musica.PISTAS[clave].entra; } catch (e) { }

  CB.musica.reproducir(destino);
  CB.musica.arrancarReloj();
  return true;
};

/* play() devuelve una promesa que el navegador rechaza si aún no ha habido un
   gesto del usuario. No es un error: es la política de autoarranque. Se apunta
   la pista y se reintenta en el primer toque. */
CB.musica.reproducir = function (c) {
  if (!c.el) return;
  var pr;
  try { pr = c.el.play(); } catch (e) { CB.musica.pendiente = c.clave; return; }
  if (pr && pr.then) {
    pr.then(function () {
      CB.musica.pendiente = null;
    }, function () {
      CB.musica.pendiente = c.clave;
    });
  }
};

CB.musica.reintentar = function () {
  if (!CB.musica.pendiente) return;
  var i, c;
  for (i = 0; i < 2; i++) {
    c = CB.musica.canales[i];
    if (c.el && c.objetivo > 0 && c.el.paused) CB.musica.reproducir(c);
  }
  CB.musica.arrancarReloj();
};

/** Agacha la música mientras habla la voz. Sin esto, un niño que aún no lee con
    fluidez tiene que separar la voz de la música, que es justo el esfuerzo que
    la voz venía a ahorrarle. */
CB.musica.agachar = function (b) {
  CB.musica.agachada = !!b;
  CB.musica.aplicarVolumenes();
  return CB.musica.agachada;
};

/** @param i índice en CB.musica.NIVELES */
CB.musica.fijarNivel = function (i) {
  i = CB.util.clamp(Math.round(i), 0, CB.musica.NIVELES.length - 1);
  CB.musica.base = CB.musica.NIVELES[i].valor;
  if (CB.musica.base <= 0) {
    CB.musica.parar();
  } else if (!CB.musica.canales[CB.musica._activo].el && CB.musica.pistaActual) {
    /* Se había parado del todo: hay que volver a montar la pista de la pantalla */
    var clave = CB.musica.pistaActual;
    CB.musica.pistaActual = null;
    CB.musica.poner(clave);
  }
  CB.musica.aplicarVolumenes();
  return i;
};

CB.musica.nivelActual = function () {
  var i;
  for (i = 0; i < CB.musica.NIVELES.length; i++) {
    if (CB.musica.NIVELES[i].valor === CB.musica.base) return i;
  }
  return CB.musica.NIVEL_DEFECTO;
};

CB.musica.parar = function () {
  var i;
  for (i = 0; i < 2; i++) CB.musica.soltar(CB.musica.canales[i]);
  CB.musica.pararReloj();
};

/* ── Resolución pantalla → pista ────────────────────────────────────────── */
CB.musica.claveDePantalla = function (idPantalla) {
  var v = CB.musica.PANTALLAS[idPantalla];
  if (v !== '@mundo') return (v === undefined) ? null : v;

  /* En partida, la música la fija el bioma del mundo: cambiar de mundo se oye
     antes de leerse. */
  var mundoId = (CB.partida && CB.partida.estado) ? CB.partida.estado.mundoId : null;
  var mundo = mundoId ? CB.catalogo.getMundo(mundoId) : null;
  var clave = mundo ? CB.musica.POR_BIOMA[mundo.bioma] : null;
  return clave || 'mundoPradera';
};

/* ── Arranque ───────────────────────────────────────────────────────────── */
CB.musica.iniciar = function () {
  if (CB.musica.iniciada) return;
  CB.musica.iniciada = true;

  var ap = CB.almacen.ajustesDispositivo();
  var n = (ap.nivelMusica == null) ? CB.musica.NIVEL_DEFECTO : ap.nivelMusica;
  CB.musica.base = CB.musica.NIVELES[CB.util.clamp(n, 0, 3)].valor;

  CB.bus.escuchar('pantalla', function (id) {
    CB.musica.poner(CB.musica.claveDePantalla(id));
  });

  /* Cualquier gesto sirve para desbloquear el autoarranque, no solo el botón
     JUGAR: un niño puede empezar tocando «Ajustes». */
  var desbloquear = function () { CB.musica.reintentar(); };
  document.addEventListener('pointerdown', desbloquear, true);
  document.addEventListener('keydown', desbloquear, true);

  /* Pestaña oculta: la música se para. Un juego que sigue sonando en una
     pestaña que nadie mira es un juego que el adulto cierra de golpe. */
  document.addEventListener('visibilitychange', function () {
    var i, c;
    for (i = 0; i < 2; i++) {
      c = CB.musica.canales[i];
      if (!c.el) continue;
      try {
        if (document.hidden) c.el.pause();
        else if (c.objetivo > 0) CB.musica.reproducir(c);
      } catch (e) { }
    }
    if (!document.hidden) CB.musica.arrancarReloj();
  });
};
