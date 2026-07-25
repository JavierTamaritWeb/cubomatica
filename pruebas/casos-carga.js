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

  /* La comprobación de que toda pantalla tiene salida se hace en auditar.sh,
     que lee el index.html REAL: aquí las <section> son maquetas vacías y el
     test mediría la maqueta, no el juego. */
});
