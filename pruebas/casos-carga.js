/* casos-carga.js — 44 scripts, 17 secciones y los espacios de nombre de CB */

CB.pruebas.suite('Carga: contrato de 44 scripts y 17 pantallas', function () {
  var t = CB.pruebas;

  /* En pruebas.html hay además los ficheros de la propia suite: se cuentan solo
     los del juego, que son los que llevan el prefijo de ruta «../». */
  var delJuego = [].slice.call(document.scripts).filter(function (s) {
    return s.src && s.src.indexOf('/pruebas/') === -1;
  });
  t.igual(delJuego.length, 44, 'el juego carga exactamente 44 scripts');

  t.igual(CB.pantallas.IDS.length, 17, 'hay 17 ids de pantalla declarados');
  var faltan = CB.pantallas.IDS.filter(function (id) {
    return !document.getElementById(id);
  });
  t.ok(faltan.length === 0, 'las 17 <section> existen en el documento', faltan.join(', '));

  var espacios = ['util', 'LEGAL', 'almacen', 'texturas', 'sprites', 'audio', 'voz',
    'a11y', 'gen', 'catalogo', 'MUNDOS', 'ERRORES', 'distractores', 'diagnosticar',
    'CURRICULO', 'puntuacion', 'antiazar', 'vidas', 'adaptativo', 'logros', 'mensajes',
    'reparacion', 'leitner', 'memoria', 'grafo', 'escalera', 'ui', 'pantallas',
    'componentes', 'partida', 'adulto', 'jefes', 'mapaDestrezas', 'casa', 'arranque',
    'musica', 'pruebas'];
  var ausentes = espacios.filter(function (k) { return CB[k] === undefined; });
  t.ok(ausentes.length === 0, 'los ' + espacios.length + ' espacios de nombre de CB existen',
       ausentes.join(', '));

  var gens = ['numeracion', 'sumas', 'restas', 'multiplicacion', 'problemas',
              'dinero', 'vocabulario'];
  var sinGen = gens.filter(function (g) { return !CB.gen[g]; });
  t.ok(sinGen.length === 0, 'los 7 generadores están registrados', sinGen.join(', '));

  t.igual(CB.catalogo.ids().length, 92, 'el catálogo declara 92 niveles');
  t.igual(CB.MUNDOS.length, 4, 'hay 4 mundos en v1');

  /* La versión. auditar.sh comprueba que README, CHANGELOG y LEEME digan la
     misma; aquí solo se comprueba que exista y tenga forma de versión, que es
     lo que puede verificarse sin leer el disco. */
  t.ok(/^\d+\.\d+\.\d+$/.test(CB.VERSION || ''),
    'CB.VERSION existe y tiene formato x.y.z', String(CB.VERSION));

  /* ── ENTRAR EN CADA UNA DE LAS 17 PANTALLAS ─────────────────────────────
     No había ninguna prueba que ENTRARA en las pantallas: se comprobaba que las
     <section> existieran, que es comprobar la maqueta. Con eso, el panel del
     adulto llevaba desde el principio mandando al usuario a la pantalla de
     error —su handler de alEntrar navegaba a su propia pantalla y desbordaba la
     pila— y las 294 comprobaciones seguían en verde.

     Aquí se entra de verdad en las 17 y se exige que ninguna falle y que cada
     una deje CB.pantallas.actual en su sitio. */
  var fallos = [];
  var pantallaPrevia = CB.pantallas.actual;
  var falloOriginal = CB.pantallas.fallo;

  CB.pantallas.IDS.forEach(function (id) {
    if (id === 'p-error') return;                  // es el destino del fallo, no un origen
    var capturado = null;
    CB.pantallas.fallo = function (e) { capturado = (e && e.message) || String(e); };
    try {
      CB.pantallas.ir(id);
      if (CB.pantallas.actual !== id) {
        capturado = capturado || ('acabó en ' + CB.pantallas.actual);
      }
    } catch (e2) {
      capturado = 'lanzó: ' + e2.message;
    }
    CB.pantallas.fallo = falloOriginal;
    if (capturado) fallos.push(id + ' → ' + capturado);
  });

  CB.pantallas.fallo = falloOriginal;
  t.ok(fallos.length === 0,
    'se puede ENTRAR en las 16 pantallas navegables sin que ninguna falle',
    fallos.join(' · '));

  /* Y el cerrojo de reentrada que impide que vuelva a pasar */
  var vueltas = 0;
  CB.pantallas.alEntrar['p-creditos'] = function () {
    vueltas++;
    if (vueltas < 50) CB.pantallas.ir('p-creditos');   // handler malicioso a propósito
  };
  var reventó = false;
  try { CB.pantallas.ir('p-creditos'); } catch (e3) { reventó = true; }
  CB.pantallas.alEntrar['p-creditos'] = function () { CB.creditos(); };
  t.ok(!reventó && vueltas === 1,
    'un handler que navega a su propia pantalla se ejecuta UNA vez, no recursivamente',
    'vueltas: ' + vueltas);

  if (pantallaPrevia) { try { CB.pantallas.ir(pantallaPrevia); } catch (e4) { } }

  /* ── Los globales del proyecto son EXACTAMENTE estos ────────────────────
     Sin módulos ni empaquetador, toda `function nombre()` en el ámbito de
     fichero acaba en window. Hoy son doce, con nombres tan genéricos como
     `tabla`, `serie`, `comparacion` o `ls`, y no chocan entre sí por suerte,
     no por diseño: si el script 45 declara otra `function tabla()`, la segunda
     pisa a la primera EN SILENCIO y la multiplicación deja de funcionar sin un
     solo error en consola.

     Esta lista cerrada convierte ese choque futuro en un test en rojo. Añadir
     un global obliga a escribirlo aquí, que es justo el momento de mirar si el
     nombre ya está cogido. */
  var GLOBALES = ['ls', 'tramo', 'comparacion', 'serie', 'itemSuma', 'itemResta',
                  'itemMult', 'tabla', 'cuantos', 'itemVocab', 'digitos', 'desdeDigitos'];
  var faltan = GLOBALES.filter(function (n) { return typeof window[n] !== 'function'; });
  t.ok(faltan.length === 0,
    'los ' + GLOBALES.length + ' auxiliares globales declarados siguen existiendo',
    faltan.join(', '));

  /* ── El oyente del toque prematuro se registra UNA vez ──────────────────
     conectarToc() se llama desde los siete componentes de respuesta, es decir
     una vez por ítem, sobre #item-respuesta, que es un nodo permanente. Sin
     cerrojo, en el ítem 12 había once oyentes y un toque prematuro reproducía
     el «toc» once veces a la vez. */
  var caja = document.createElement('div');
  var registrados = 0;
  var añadir = caja.addEventListener;
  caja.addEventListener = function () { registrados++; return añadir.apply(this, arguments); };
  var v;
  for (v = 0; v < 20; v++) CB.componentes.conectarToc(caja);
  t.igual(registrados, 1,
    'conectarToc() sobre el mismo contenedor 20 veces registra UN solo oyente');
  t.igual(caja.getAttribute('data-toc'), 'si', 'y deja la marca visible en el nodo');

  /* ── Un perfil ilegible NO se confunde con un perfil que no existe ──────
     leerCrudo() se traga el fallo de JSON.parse y devuelve null igual que
     cuando no hay nada. Con eso, activar() hacía «if (!p) return;» y pulsar
     JUGAR sobre un perfil dañado no hacía absolutamente nada. */
  var claveFalsa = CB.almacen.claveDePerfil('perfil-de-prueba-ilegible');
  var previo = null;
  try { previo = localStorage.getItem(claveFalsa); } catch (e5) { }

  t.ok(CB.almacen.leerPerfil('perfil-que-no-existe-jamas') === null,
    'un perfil que NO existe devuelve null');

  var escrito = false;
  try { localStorage.setItem(claveFalsa, '{esto no es json,,,'); escrito = true; } catch (e6) { }
  if (escrito) {
    var roto = CB.almacen.leerPerfil('perfil-de-prueba-ilegible');
    t.ok(roto && roto.error === 'perfil-ilegible',
      'un perfil que existe pero está ILEGIBLE devuelve un error, no null',
      JSON.stringify(roto));
    t.ok(!!(roto && roto.mensaje && roto.mensaje.length > 20),
      'y trae un mensaje que se le puede enseñar a un adulto');
    try {
      if (previo === null) localStorage.removeItem(claveFalsa);
      else localStorage.setItem(claveFalsa, previo);
    } catch (e7) { }
  } else {
    t.saltar('perfil ilegible', 'no hay localStorage escribible');
  }

  /* La comprobación de que toda pantalla tiene salida se hace en auditar.sh,
     que lee el index.html REAL: aquí las <section> son maquetas vacías y el
     test mediría la maqueta, no el juego. */
});
