/* casos-musica.js — Las tablas de música y la aritmética del volumen
   ----------------------------------------------------------------------------
   Aquí NO se reproduce nada. Un test que llama a play() en una página abierta
   por un script de pruebas no comprueba que la música suene: comprueba que el
   navegador rechaza el autoarranque, que es otra cosa. Lo que sí se puede
   comprobar sin sonido es todo lo que se rompe en silencio: una pantalla sin
   pista asignada, una pista sin crédito, una ganancia que se sale de rango.

   Que las nueve pistas se oyen de verdad está verificado a mano en el
   navegador; lo que no se puede automatizar se declara, no se maquilla. */

CB.pruebas.suite('Música: tablas, volúmenes y bucles', function () {
  var t = CB.pruebas;
  var claves = Object.keys(CB.musica.PISTAS);

  /* ── La suite no puede hacer ruido ──────────────────────────────────────
     pruebas.html carga los mismos 44 scripts que el juego. Si algún día
     alguien mueve CB.musica.iniciar() fuera de CB.arranque(), esta página
     empezaría a sonar sola en mitad de los tests. */
  t.ok(CB.musica.iniciada === false,
    'la suite de pruebas NO arranca la música');

  /* ── Las 9 pistas ───────────────────────────────────────────────────── */
  t.igual(claves.length, 9, 'hay 9 pistas declaradas');

  var ficheros = claves.map(function (k) { return CB.musica.PISTAS[k].fichero; });
  var repes = ficheros.filter(function (f, i) { return ficheros.indexOf(f) !== i; });
  t.ok(repes.length === 0, 'ninguna pista repite fichero', repes.join(', '));

  var malFichero = ficheros.filter(function (f) { return !/^[a-z0-9-]+\.mp3$/.test(f); });
  t.ok(malFichero.length === 0,
    'todo nombre de fichero es neutro: minúsculas, guiones y .mp3',
    malFichero.join(', '));

  /* ── Rangos de cada pista ───────────────────────────────────────────── */
  var malRango = claves.filter(function (k) {
    var p = CB.musica.PISTAS[k];
    return !(p.gan > 0) || !(p.entra >= 0) || !(p.sale > p.entra + 10);
  });
  t.ok(malRango.length === 0,
    'toda pista tiene ganancia > 0 y al menos 10 s entre entra y sale',
    malRango.join(', '));

  /* ── LA invariante del volumen ──────────────────────────────────────────
     Las pistas están normalizadas con una ganancia por pista, y algunas de
     esas ganancias pasan de 1 (mundo-rio venía 4 dB por debajo del resto).
     Si el nivel más alto del ajuste multiplicado por la ganancia mayor se
     pasa de 1, el clamp recorta justo la pista que necesitaba el empujón: la
     normalización se cae en silencio y vuelve el desnivel que venía a quitar.
     Esto es lo que fija el 0,62 del nivel «Alta», y no un gusto. */
  var ganMax = 0, cualMax = null;
  claves.forEach(function (k) {
    if (CB.musica.PISTAS[k].gan > ganMax) { ganMax = CB.musica.PISTAS[k].gan; cualMax = k; }
  });
  var nivelMax = CB.musica.NIVELES[CB.musica.NIVELES.length - 1].valor;
  t.ok(ganMax * nivelMax <= 1.0,
    'el nivel más alto por la ganancia mayor no se pasa de 1: la normalización sobrevive',
    cualMax + ': ' + nivelMax + ' × ' + ganMax + ' = ' + (nivelMax * ganMax).toFixed(3));

  /* ── Los cuatro niveles ─────────────────────────────────────────────── */
  t.igual(CB.musica.NIVELES.length, 4, 'el ajuste tiene 4 niveles');
  t.igual(CB.musica.NIVELES[0].valor, 0, 'el primer nivel es silencio total');
  var creciente = true, i;
  for (i = 1; i < CB.musica.NIVELES.length; i++) {
    if (CB.musica.NIVELES[i].valor <= CB.musica.NIVELES[i - 1].valor) creciente = false;
  }
  t.ok(creciente, 'los niveles son estrictamente crecientes');

  /* Ida y vuelta del ajuste: fijar por índice y volver a leerlo */
  var antes = CB.musica.base;
  var idaVuelta = [0, 1, 2, 3].every(function (n) {
    CB.musica.fijarNivel(n);
    return CB.musica.nivelActual() === n;
  });
  CB.musica.base = antes;
  t.ok(idaVuelta, 'fijarNivel() y nivelActual() son inversas para los 4 niveles');

  /* ── Las 17 pantallas ───────────────────────────────────────────────────
     Toda pantalla tiene que estar en la tabla, aunque sea con null. Sin esto,
     añadir una pantalla y olvidar la música no da error: deja sonando la
     música de la pantalla anterior, que es un fallo que nadie reporta. */
  var sinEntrada = CB.pantallas.IDS.filter(function (id) {
    return !(id in CB.musica.PANTALLAS);
  });
  t.ok(sinEntrada.length === 0,
    'las 17 pantallas están en CB.musica.PANTALLAS', sinEntrada.join(', '));

  var sobran = Object.keys(CB.musica.PANTALLAS).filter(function (id) {
    return CB.pantallas.IDS.indexOf(id) === -1;
  });
  t.ok(sobran.length === 0,
    'CB.musica.PANTALLAS no cita ninguna pantalla inexistente', sobran.join(', '));

  var malDestino = Object.keys(CB.musica.PANTALLAS).filter(function (id) {
    var v = CB.musica.PANTALLAS[id];
    if (v === null || v === '@mundo') return false;
    return !CB.musica.PISTAS[v];
  });
  t.ok(malDestino.length === 0,
    'toda pantalla apunta a una pista que existe, a null o al mundo',
    malDestino.join(', '));

  t.igual(CB.musica.PANTALLAS['p-portada'], 'temaPrincipal',
    'la portada suena con el tema principal');
  t.igual(CB.musica.PANTALLAS['p-error'], null,
    'la pantalla de error va en silencio');

  /* ── Un mundo, una música ───────────────────────────────────────────── */
  var sinBioma = CB.MUNDOS.filter(function (m) {
    var clave = CB.musica.POR_BIOMA[m.bioma];
    return !clave || !CB.musica.PISTAS[clave];
  });
  t.ok(sinBioma.length === 0,
    'los 4 mundos tienen pista propia y existe',
    sinBioma.map(function (m) { return m.id + ':' + m.bioma; }).join(', '));

  var pistasMundo = CB.MUNDOS.map(function (m) { return CB.musica.POR_BIOMA[m.bioma]; });
  var repesMundo = pistasMundo.filter(function (p, j) { return pistasMundo.indexOf(p) !== j; });
  t.ok(repesMundo.length === 0,
    'dos mundos nunca comparten música: cambiar de mundo se oye',
    repesMundo.join(', '));

  /* claveDePantalla resuelve el mundo en curso */
  var estadoPrevio = CB.partida.estado;
  var bien = CB.MUNDOS.every(function (m) {
    CB.partida.estado = { mundoId: m.id };
    return CB.musica.claveDePantalla('p-partida') === CB.musica.POR_BIOMA[m.bioma];
  });
  /* Y sin partida en curso no revienta: devuelve algo reproducible */
  CB.partida.estado = null;
  var sinPartida = CB.musica.claveDePantalla('p-partida');
  CB.partida.estado = estadoPrevio;
  t.ok(bien, 'claveDePantalla() da la pista del bioma de cada uno de los 4 mundos');
  t.ok(!!CB.musica.PISTAS[sinPartida],
    'claveDePantalla() sin partida en curso devuelve una pista válida, no null');

  /* ── Créditos ───────────────────────────────────────────────────────────
     Música de otras personas sin crédito no se puede entregar. auditar.sh lo
     comprueba en el fichero de texto; esto lo comprueba en lo que VE el niño. */
  t.igual(CB.musica.CREDITOS.length, 9, 'hay 9 créditos, uno por pista');

  var clavesCred = CB.musica.CREDITOS.map(function (c) { return c.clave; }).sort();
  t.ok(clavesCred.join('|') === claves.slice().sort().join('|'),
    'el conjunto de claves de CREDITOS es EXACTAMENTE el de PISTAS',
    'pistas: ' + claves.slice().sort().join(',') + ' | créditos: ' + clavesCred.join(','));

  var sinAutor = CB.musica.CREDITOS.filter(function (c) {
    return !c.autor || !c.autor.length || !c.id;
  });
  t.ok(sinAutor.length === 0, 'todo crédito lleva autor e identificador',
    sinAutor.map(function (c) { return c.clave; }).join(', '));

  var sinDonde = CB.musica.CREDITOS.filter(function (c) { return !CB.DONDE_SUENA[c.clave]; });
  t.ok(sinDonde.length === 0,
    'los créditos dicen dónde suena cada pista, en lenguaje de niño',
    sinDonde.map(function (c) { return c.clave; }).join(', '));

  t.ok(CB.musica.LICENCIA.indexOf('Pixabay Content License') !== -1,
    'la licencia se cita por su nombre');

  /* ── El fundido del bucle ───────────────────────────────────────────────
     Pura aritmética: se le pasa un elemento falso. Cinco de las nueve pistas
     acaban en silencio, así que el bucle NO puede ir hasta el final del
     fichero: tiene que fundir y volver antes. */
  var p = { entra: 0, sale: 100 };
  function f(seg) { return CB.musica.factorBucle({ duration: 120, currentTime: seg }, p); }

  t.igual(f(50), 1, 'en mitad de la pista el fundido de bucle no toca el volumen');
  t.ok(f(100) <= 0.001, 'justo en el punto de salida el volumen es cero');
  t.ok(f(0) <= 0.001, 'justo al entrar el volumen es cero');
  t.ok(f(99.3) > 0 && f(99.3) < 1, 'el último medio segundo antes de salir está a media altura');
  t.ok(f(0.7) > 0 && f(0.7) < 1, 'el medio segundo de después está a media altura');
  t.ok(f(99.3) < f(98.9), 'el fundido de salida baja de verdad');
  t.ok(f(0.7) > f(0.3), 'el fundido de entrada sube de verdad');

  /* Con silencio de cabecera (mundo-bosque entra en 0,40) el fundido de
     entrada se cuenta desde entra, no desde cero. */
  var q = { entra: 10, sale: 100 };
  t.ok(CB.musica.factorBucle({ duration: 120, currentTime: 10 }, q) <= 0.001,
    'con entrada retrasada, el cero del fundido está en entra, no en 0');

  /* Una pista más corta de lo declarado no se sale por el final */
  t.ok(CB.musica.factorBucle({ duration: 40, currentTime: 40 }, p) <= 0.001,
    'si el fichero dura menos de lo declarado, manda la duración real');

  /* ── El silencio del aparato manda sobre la música ─────────────────────
     Silenciar el juego y seguir oyendo la música sería el fallo más visible
     que puede tener esto. */
  var silPrevio = CB.audio.silenciado;
  var basePrevia = CB.musica.base;
  CB.musica.base = 0.4;
  CB.audio.silenciado = true;
  t.igual(CB.musica.volumenBase(), 0, 'con el sonido del aparato apagado, la música vale 0');
  CB.audio.silenciado = false;
  t.igual(CB.musica.volumenBase(), 0.4, 'con el sonido encendido vuelve al nivel elegido');
  CB.audio.silenciado = silPrevio;
  CB.musica.base = basePrevia;

  /* ── Aparatos que NO dejan fijar el volumen (iPhone y iPad) ─────────────
     En iOS, HTMLMediaElement.volume es de solo lectura. Todo el módulo se
     apoyaba en él, así que en un iPad —objetivo declarado— silenciar el juego
     NO silenciaba la música. Sin volumen solo hay dos estados, y hay que
     comprobar que se llega a los dos. */
  var ajustePrevio = CB.musica.volumenAjustable;
  var basePrev2 = CB.musica.base;
  var agachPrev = CB.musica.agachada;
  var canalesPrev = CB.musica.canales;

  function elementoDeIOS() {
    var e = { paused: true, _v: 1, pausas: 0, arranques: 0 };
    Object.defineProperty(e, 'volume', {
      get: function () { return 1; },              // iOS: siempre 1
      set: function () { }                          // iOS: no hace nada
    });
    e.pause = function () { e.paused = true; e.pausas++; };
    e.play = function () { e.paused = false; e.arranques++; return { then: function () { } }; };
    return e;
  }

  var elIOS = elementoDeIOS();
  CB.musica.volumenAjustable = null;
  t.ok(CB.musica.detectarVolumen(elIOS) === false,
    'se detecta un aparato que ignora el volumen escribiendo y releyendo');

  var elNormal = { volume: 0, paused: false, pause: function () { }, play: function () { } };
  CB.musica.volumenAjustable = null;
  t.ok(CB.musica.detectarVolumen(elNormal) === true,
    'y un aparato normal se detecta como ajustable');

  /* ── La visibilidad de la pestaña se FIJA a mano ─────────────────────────
     aplicarVolumenes() solo reanuda si `!document.hidden`: no se arranca música
     en una pestaña de fondo, y eso está bien. Pero estas comprobaciones lo
     leían del navegador de verdad, así que daban rojo sobre código correcto en
     cuanto la ventana perdía el foco — que es justo lo que pasa cuando alguien
     lanza la suite y se va a mirar otra cosa. Una prueba cuyo resultado depende
     del foco es peor que no tenerla. */
  var descHidden = Object.getOwnPropertyDescriptor(Document.prototype, 'hidden');
  function fijarVisible(v) {
    Object.defineProperty(document, 'hidden', {
      configurable: true, get: function () { return !v; }
    });
  }
  function soltarVisibilidad() {
    delete document.hidden;
    if (!descHidden) return;
  }
  fijarVisible(true);

  /* Con volumen bloqueado: silenciar tiene que PARAR, no bajar a cero */
  CB.musica.volumenAjustable = false;
  CB.musica.base = 0.4;
  CB.musica.agachada = false;
  var cIOS = { el: elementoDeIOS(), clave: 'temaPrincipal', f: 1, objetivo: 1 };
  cIOS.el.paused = false;
  CB.musica.canales = [cIOS, { el: null, clave: null, f: 0, objetivo: 0 }];

  CB.audio.silenciado = true;
  CB.musica.aplicarVolumenes();
  t.ok(cIOS.el.paused === true,
    'sin volumen ajustable, silenciar el aparato PARA la música en vez de bajarla a cero');

  CB.audio.silenciado = false;
  CB.musica.aplicarVolumenes();
  t.ok(cIOS.el.paused === false, 'y al quitar el silencio vuelve a sonar');

  CB.musica.agachada = true;
  CB.musica.aplicarVolumenes();
  t.ok(cIOS.el.paused === true,
    'el agachado de la voz también para la música: sin volumen no hay medias tintas');
  CB.musica.agachada = false;
  CB.musica.aplicarVolumenes();
  t.ok(cIOS.el.paused === false, 'y al callar la voz la música vuelve por donde iba');

  /* El bucle NO debe parar y arrancar: eso sonaría mucho peor que la costura */
  var arranquesAntes = cIOS.el.arranques, pausasAntes = cIOS.el.pausas;
  cIOS.f = 0;                                    // como en el punto de bucle
  CB.musica.aplicarVolumenes();
  t.ok(cIOS.el.pausas === pausasAntes && cIOS.el.arranques === arranquesAntes,
    'el fundido del bucle NO para la música en un aparato sin volumen');

  /* Y la otra cara, que es la que antes se colaba disfrazada de fallo: con la
     pestaña de fondo NO se arranca música. Ahora se comprueba a propósito. */
  cIOS.f = 1;
  cIOS.el.pause();
  fijarVisible(false);
  var arranquesFondo = cIOS.el.arranques;
  CB.musica.aplicarVolumenes();
  t.ok(cIOS.el.paused === true && cIOS.el.arranques === arranquesFondo,
    'con la pestaña en segundo plano la música NO se arranca sola');

  fijarVisible(true);
  CB.musica.aplicarVolumenes();
  t.ok(cIOS.el.paused === false, 'y al volver a primer plano sí se reanuda');

  soltarVisibilidad();

  CB.musica.canales = canalesPrev;
  CB.musica.volumenAjustable = ajustePrevio;
  CB.musica.base = basePrev2;
  CB.musica.agachada = agachPrev;
  CB.audio.silenciado = silPrevio;

  /* ── El agachado de la voz ──────────────────────────────────────────── */
  t.ok(CB.musica.AGACHADO > 0 && CB.musica.AGACHADO < 0.5,
    'la música se agacha por debajo de la mitad mientras habla la voz, pero no calla del todo');
  CB.voz.agacharMusica(true);
  t.ok(CB.musica.agachada === true, 'CB.voz agacha la música al empezar a leer');
  CB.voz.cancelar();
  t.ok(CB.musica.agachada === false, 'cancelar la voz devuelve la música a su nivel');
});
