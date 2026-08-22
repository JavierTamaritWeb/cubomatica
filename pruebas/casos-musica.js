/* casos-musica.js — Las tablas de música y la aritmética del volumen */

CB.pruebas.suite('Música: tablas, volúmenes y bucles', function () {
  const t = CB.pruebas;
  const claves = Object.keys(CB.musica.PISTAS);

  /* La suite no puede hacer ruido */
  t.ok(CB.musica.iniciada === false,
    'la suite de pruebas NO arranca la música');

  /* Las 9 pistas */
  t.igual(claves.length, 9, 'hay 9 pistas declaradas');

  const ficheros = claves.map(function (k) { return CB.musica.PISTAS[k].fichero; });
  const repes = ficheros.filter(function (f, i) { return ficheros.indexOf(f) !== i; });
  t.ok(repes.length === 0, 'ninguna pista repite fichero', repes.join(', '));

  const malFichero = ficheros.filter(function (f) { return !/^[a-z0-9-]+\.mp3$/.test(f); });
  t.ok(malFichero.length === 0,
    'todo nombre de fichero es neutro: minúsculas, guiones y .mp3',
    malFichero.join(', '));

  /* Rangos de cada pista */
  const malRango = claves.filter(function (k) {
    const p = CB.musica.PISTAS[k];
    return !(p.gan > 0) || !(p.entra >= 0) || !(p.sale > p.entra + 10);
  });
  t.ok(malRango.length === 0,
    'toda pista tiene ganancia > 0 y al menos 10 s entre entra y sale',
    malRango.join(', '));

  /* LA invariante del volumen */
  let ganMax = 0, cualMax = null;
  claves.forEach(function (k) {
    if (CB.musica.PISTAS[k].gan > ganMax) { ganMax = CB.musica.PISTAS[k].gan; cualMax = k; }
  });
  const nivelMax = CB.musica.NIVELES[CB.musica.NIVELES.length - 1].valor;
  t.ok(ganMax * nivelMax <= 1.0,
    'el nivel más alto por la ganancia mayor no se pasa de 1: la normalización sobrevive',
    cualMax + ': ' + nivelMax + ' × ' + ganMax + ' = ' + (nivelMax * ganMax).toFixed(3));

  /* Los cuatro niveles */
  t.igual(CB.musica.NIVELES.length, 4, 'el ajuste tiene 4 niveles');
  t.igual(CB.musica.NIVELES[0].valor, 0, 'el primer nivel es silencio total');
  let creciente = true, i;
  for (i = 1; i < CB.musica.NIVELES.length; i++) {
    if (CB.musica.NIVELES[i].valor <= CB.musica.NIVELES[i - 1].valor) creciente = false;
  }
  t.ok(creciente, 'los niveles son estrictamente crecientes');

  /* Ida y vuelta del ajuste: fijar por índice y volver a leerlo */
  const antes = CB.musica.base;
  const idaVuelta = [0, 1, 2, 3].every(function (n) {
    CB.musica.fijarNivel(n);
    return CB.musica.nivelActual() === n;
  });
  CB.musica.base = antes;
  t.ok(idaVuelta, 'fijarNivel() y nivelActual() son inversas para los 4 niveles');

  /* Las 17 pantallas */
  const sinEntrada = CB.pantallas.IDS.filter(function (id) {
    return !(id in CB.musica.PANTALLAS);
  });
  t.ok(sinEntrada.length === 0,
    'las 18 pantallas están en CB.musica.PANTALLAS', sinEntrada.join(', '));

  const sobran = Object.keys(CB.musica.PANTALLAS).filter(function (id) {
    return CB.pantallas.IDS.indexOf(id) === -1;
  });
  t.ok(sobran.length === 0,
    'CB.musica.PANTALLAS no cita ninguna pantalla inexistente', sobran.join(', '));

  const malDestino = Object.keys(CB.musica.PANTALLAS).filter(function (id) {
    const v = CB.musica.PANTALLAS[id];
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

  /* Un mundo, una música */
  const sinBioma = CB.MUNDOS.filter(function (m) {
    const clave = CB.musica.POR_BIOMA[m.bioma];
    return !clave || !CB.musica.PISTAS[clave];
  });
  t.ok(sinBioma.length === 0,
    'los 4 mundos tienen pista propia y existe',
    sinBioma.map(function (m) { return m.id + ':' + m.bioma; }).join(', '));

  const pistasMundo = CB.MUNDOS.map(function (m) { return CB.musica.POR_BIOMA[m.bioma]; });
  const repesMundo = pistasMundo.filter(function (p, j) { return pistasMundo.indexOf(p) !== j; });
  t.ok(repesMundo.length === 0,
    'dos mundos nunca comparten música: cambiar de mundo se oye',
    repesMundo.join(', '));

  /* Test e implementación se daban la razón el uno al otro mientras tres de las cuatro pistas de mundo no sonaban nunca. */
  const estadoPrevio = CB.partida.estado;
  const bien = CB.MUNDOS.every(function (m) {
    CB.partida.estado = { mundo: CB.catalogo.getMundo(m.id) };
    return CB.musica.claveDePantalla('p-partida') === CB.musica.POR_BIOMA[m.bioma];
  });
  /* Y sin partida en curso no revienta: devuelve algo reproducible */
  CB.partida.estado = null;
  const sinPartida = CB.musica.claveDePantalla('p-partida');
  CB.partida.estado = estadoPrevio;
  t.ok(bien, 'claveDePantalla() da la pista del bioma de cada uno de los 4 mundos');
  t.ok(!!CB.musica.PISTAS[sinPartida],
    'claveDePantalla() sin partida en curso devuelve una pista válida, no null');

  /* Créditos */
  t.igual(CB.musica.CREDITOS.length, 9, 'hay 9 créditos, uno por pista');

  const clavesCred = CB.musica.CREDITOS.map(function (c) { return c.clave; }).sort();
  t.ok(clavesCred.join('|') === claves.slice().sort().join('|'),
    'el conjunto de claves de CREDITOS es EXACTAMENTE el de PISTAS',
    'pistas: ' + claves.slice().sort().join(',') + ' | créditos: ' + clavesCred.join(','));

  const sinAutor = CB.musica.CREDITOS.filter(function (c) {
    return !c.autor || !c.autor.length || !c.id;
  });
  t.ok(sinAutor.length === 0, 'todo crédito lleva autor e identificador',
    sinAutor.map(function (c) { return c.clave; }).join(', '));

  const sinDonde = CB.musica.CREDITOS.filter(function (c) { return !CB.DONDE_SUENA[c.clave]; });
  t.ok(sinDonde.length === 0,
    'los créditos dicen dónde suena cada pista, en lenguaje de niño',
    sinDonde.map(function (c) { return c.clave; }).join(', '));

  t.ok(CB.musica.LICENCIA.indexOf('Pixabay Content License') !== -1,
    'la licencia se cita por su nombre');

  /* El fundido del bucle */
  const p = { entra: 0, sale: 100 };
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
  const q = { entra: 10, sale: 100 };
  t.ok(CB.musica.factorBucle({ duration: 120, currentTime: 10 }, q) <= 0.001,
    'con entrada retrasada, el cero del fundido está en entra, no en 0');

  /* Una pista más corta de lo declarado no se sale por el final */
  t.ok(CB.musica.factorBucle({ duration: 40, currentTime: 40 }, p) <= 0.001,
    'si el fichero dura menos de lo declarado, manda la duración real');

  /* El silencio del aparato manda sobre la música */
  const silPrevio = CB.audio.silenciado;
  const basePrevia = CB.musica.base;
  CB.musica.base = 0.4;
  CB.audio.silenciado = true;
  t.igual(CB.musica.volumenBase(), 0, 'con el sonido del aparato apagado, la música vale 0');
  CB.audio.silenciado = false;
  t.igual(CB.musica.volumenBase(), 0.4, 'con el sonido encendido vuelve al nivel elegido');
  CB.audio.silenciado = silPrevio;
  CB.musica.base = basePrevia;

  /* Aparatos que NO dejan fijar el volumen (iPhone y iPad) */
  const ajustePrevio = CB.musica.volumenAjustable;
  const basePrev2 = CB.musica.base;
  const agachPrev = CB.musica.agachada;
  const canalesPrev = CB.musica.canales;

  function elementoDeIOS() {
    const e = { paused: true, _v: 1, pausas: 0, arranques: 0 };
    Object.defineProperty(e, 'volume', {
      get: function () { return 1; },              // iOS: siempre 1
      set: function () { }                          // iOS: no hace nada
    });
    e.pause = function () { e.paused = true; e.pausas++; };
    e.play = function () { e.paused = false; e.arranques++; return { then: function () { } }; };
    return e;
  }

  const elIOS = elementoDeIOS();
  CB.musica.volumenAjustable = null;
  t.ok(CB.musica.detectarVolumen(elIOS) === false,
    'se detecta un aparato que ignora el volumen escribiendo y releyendo');

  const elNormal = { volume: 0, paused: false, pause: function () { }, play: function () { } };
  CB.musica.volumenAjustable = null;
  t.ok(CB.musica.detectarVolumen(elNormal) === true,
    'y un aparato normal se detecta como ajustable');

  /* La visibilidad de la pestaña se FIJA a mano */
  const descHidden = Object.getOwnPropertyDescriptor(Document.prototype, 'hidden');
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
  const cIOS = { el: elementoDeIOS(), clave: 'temaPrincipal', f: 1, objetivo: 1 };
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
  const arranquesAntes = cIOS.el.arranques, pausasAntes = cIOS.el.pausas;
  cIOS.f = 0;                                    // como en el punto de bucle
  CB.musica.aplicarVolumenes();
  t.ok(cIOS.el.pausas === pausasAntes && cIOS.el.arranques === arranquesAntes,
    'el fundido del bucle NO para la música en un aparato sin volumen');

  /* Y la otra cara, que es la que antes se colaba disfrazada de fallo: con la
     pestaña de fondo NO se arranca música. Ahora se comprueba a propósito. */
  cIOS.f = 1;
  cIOS.el.pause();
  fijarVisible(false);
  const arranquesFondo = cIOS.el.arranques;
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

  /* El agachado de la voz */
  t.ok(CB.musica.AGACHADO > 0 && CB.musica.AGACHADO < 0.5,
    'la música se agacha por debajo de la mitad mientras habla la voz, pero no calla del todo');
  CB.voz.agacharMusica(true);
  t.ok(CB.musica.agachada === true, 'CB.voz agacha la música al empezar a leer');
  CB.voz.cancelar();
  t.ok(CB.musica.agachada === false, 'cancelar la voz devuelve la música a su nivel');
});

CB.pruebas.suite('E109 · la suite alcanza los MP3 reales', function () {
  const t = CB.pruebas;
  const url = CB.musica.RAIZ + CB.musica.PISTAS.calma.fichero;
  t.ok(CB.musica.RAIZ === '../dist/audio/',
    'E109 · la raíz de audio de pruebas apunta a dist/audio', CB.musica.RAIZ);

  if (location.protocol === 'file:') {
    t.saltar('E109 · el servidor entrega un MP3 real', 'file:// no ofrece respuestas HTTP');
    return;
  }

  return fetch(url, { method: 'HEAD', cache: 'no-store' }).then(function (respuesta) {
    t.ok(respuesta.ok, 'E109 · el servidor entrega un MP3 real',
      respuesta.status + ' ' + respuesta.statusText);
    t.ok(/^audio\/mpeg\b/.test(respuesta.headers.get('content-type') || ''),
      'E109 · y lo entrega con el tipo audio/mpeg', respuesta.headers.get('content-type'));
  }, function (error) {
    t.ok(false, 'E109 · el servidor entrega un MP3 real', error.message);
  });
});

/* E79 · La victoria del jefe suena a victoria */
CB.pruebas.suite('E79 · al ganar al jefe, la música cambia a victoria', function () {
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  const perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;

  const puestas = [];
  const ponerPrevio = CB.musica.poner;
  CB.musica.poner = function (clave) { puestas.push(clave); return true; };

  const e = CB.jefes.iniciar('M1');
  if (!t.ok(!!e, 'E79 · el combate arranca con iniciar() de verdad')) {
    CB.musica.poner = ponerPrevio; CB.perfil = perfilPrevio; return;
  }
  t.ok(!!e.mundo && !!e.mundo.bioma,
    'E79 · y el estado trae el mundo real, no una forma fabricada a mano',
    e.mundo ? e.mundo.id : 'sin mundo');

  puestas.length = 0;
  CB.jefes.terminar(true);
  t.ok(puestas.indexOf('victoria') !== -1,
    'E79 · terminar() pone la música de victoria', puestas.join(',') || 'ninguna');

  /* Y el bus repone el tema al salir: la excepción es puntual, no permanente. */
  CB.musica.poner = ponerPrevio;
  CB.pantallas.ir('p-mapa');
  t.igual(CB.musica.claveDePantalla('p-mapa'), 'temaPrincipal',
    'E79 · y volver al mapa devuelve el tema principal');

  CB.jefes.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

/* E82 · La pista del mundo no vuelve al segundo cero */
CB.pruebas.suite('E82 · la música del mundo retoma donde se quedó', function () {
  const t = CB.pruebas;
  if (!t.ok(!!CB.musica.posiciones, 'E82 · existe la tabla de posiciones')) return;

  const posPrevias = CB.musica.posiciones;
  const actualPrevia = CB.musica.pistaActual;
  CB.musica.posiciones = {};

  const puesta = CB.musica.poner('mundoPradera');
  const canal = CB.musica.canales[CB.musica._activo];
  if (!t.ok(puesta && canal && canal.el,
      'E82 · la pista del mundo llega a sonar en este navegador')) {
    CB.musica.posiciones = posPrevias;
    CB.musica.pistaActual = actualPrevia;
    return;
  }

  /* Se avanza a mano y se comprueba que el avance ha cuajado: asignar
     currentTime antes del metadato es lo que un try/catch se traga en silencio. */
  const destino = 40;
  try { canal.el.currentTime = destino; } catch (e) { }
  const llegó = canal.el.currentTime;
  if (!t.ok(llegó > 1,
      'E82 · el elemento acepta que se le mueva el tiempo', String(llegó))) {
    CB.musica.posiciones = posPrevias;
    CB.musica.pistaActual = actualPrevia;
    return;
  }

  CB.musica.poner('calma');
  CB.musica.poner('mundoPradera');
  const vuelta = CB.musica.canales[CB.musica._activo];
  const entra = CB.musica.PISTAS.mundoPradera.entra;

  t.ok(vuelta && vuelta.el, 'E82 · vuelve a sonar');
  if (vuelta && vuelta.el) {
    t.ok(Math.abs(vuelta.el.currentTime - llegó) < 3,
      'E82 · y retoma cerca de donde se quedó',
      'estaba en ' + llegó.toFixed(1) + ' y vuelve en ' + vuelta.el.currentTime.toFixed(1));
    t.ok(Math.abs(vuelta.el.currentTime - entra) > 1,
      'E82 · no en el punto de entrada, que es el fallo que se corrige',
      'entra = ' + entra);
  }

  CB.musica.poner(null);
  CB.musica.posiciones = posPrevias;
  CB.musica.pistaActual = actualPrevia;
});
