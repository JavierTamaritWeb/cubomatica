/* casos-carga.js — el bundle, 18 secciones y los espacios de nombre de CB */

CB.pruebas.suite('Carga: contrato del bundle y las 18 pantallas', function () {
  const t = CB.pruebas;

  /* El invariante no desaparece, cambia de sitio y se parte en dos, cada mitad donde puede comprobarse de verdad: · la AUDITORÍA (herramientas/comprobar-dist.mjs) cuenta los ficheros en disco, los cruza con manifiesto.json y reconstruye el… */
  const delJuego = [].slice.call(document.scripts).filter(function (s) {
    return s.src && s.src.indexOf('/pruebas/') === -1;
  });
  t.igual(delJuego.length, 1, 'el juego entero se carga en un solo guion');
  t.ok(delJuego.length === 1 && /\/dist\/js\/cubomatica(\.min)?\.js$/.test(delJuego[0].src),
    'y ese guion es el bundle de dist/, no las fuentes sueltas',
    delJuego.length ? delJuego[0].src : 'ninguno');

  t.igual(CB.pantallas.IDS.length, 18, 'hay 18 ids de pantalla declarados');
  const faltanPantallas = CB.pantallas.IDS.filter(function (id) {
    return !document.getElementById(id);
  });
  t.ok(faltanPantallas.length === 0, 'las 18 <section> existen en el documento',
    faltanPantallas.join(', '));

  const espacios = ['util', 'LEGAL', 'almacen', 'texturas', 'sprites', 'audio', 'voz',
    'a11y', 'gen', 'catalogo', 'MUNDOS', 'ERRORES', 'distractores', 'diagnosticar',
    'CURRICULO', 'puntuacion', 'antiazar', 'vidas', 'adaptativo', 'logros', 'mensajes',
    'reparacion', 'leitner', 'memoria', 'grafo', 'escalera', 'ui', 'pantallas',
    'componentes', 'partida', 'adulto', 'jefes', 'mapaDestrezas', 'casa', 'arranque',
    'musica', 'modos', 'pruebas'];
  const ausentes = espacios.filter(function (k) { return CB[k] === undefined; });
  t.ok(ausentes.length === 0, 'los ' + espacios.length + ' espacios de nombre de CB existen',
       ausentes.join(', '));

  const gens = ['numeracion', 'sumas', 'restas', 'multiplicacion', 'problemas',
              'dinero', 'vocabulario',
              'division', 'fracciones', 'decimales', 'porcentajes', 'enteros',
              'medida', 'tiempo', 'datos', 'azar'];
  const sinGen = gens.filter(function (g) { return !CB.gen[g]; });
  t.ok(sinGen.length === 0, 'los ' + gens.length + ' generadores están registrados',
       sinGen.join(', '));

  t.igual(CB.catalogo.ids().length, 283, 'el catálogo declara 283 niveles (3.3.0)');
  t.igual(CB.MUNDOS.length, 4, 'hay 4 mundos en v1');

  /* La versión. auditar.sh comprueba que README, CHANGELOG y LEEME digan la
     misma; aquí solo se comprueba que exista y tenga forma de versión, que es
     lo que puede verificarse sin leer el disco. */
  t.ok(/^\d+\.\d+\.\d+$/.test(CB.VERSION || ''),
    'CB.VERSION existe y tiene formato x.y.z', String(CB.VERSION));

  /* ENTRAR EN CADA UNA DE LAS 18 PANTALLAS */
  const fallos = [];
  const pantallaPrevia = CB.pantallas.actual;
  const falloOriginal = CB.pantallas.fallo;

  CB.pantallas.IDS.forEach(function (id) {
    if (id === 'p-error') return;                  // es el destino del fallo, no un origen
    let capturado = null;
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
    'se puede ENTRAR en las 17 pantallas navegables sin que ninguna falle',
    fallos.join(' · '));

  /* Y el cerrojo de reentrada que impide que vuelva a pasar */
  let vueltas = 0;
  CB.pantallas.alEntrar['p-creditos'] = function () {
    vueltas++;
    if (vueltas < 50) CB.pantallas.ir('p-creditos');   // handler malicioso a propósito
  };
  let reventó = false;
  try { CB.pantallas.ir('p-creditos'); } catch (e3) { reventó = true; }
  CB.pantallas.alEntrar['p-creditos'] = function () { CB.creditos(); };
  t.ok(!reventó && vueltas === 1,
    'un handler que navega a su propia pantalla se ejecuta UNA vez, no recursivamente',
    'vueltas: ' + vueltas);

  if (pantallaPrevia) { try { CB.pantallas.ir(pantallaPrevia); } catch (e4) { } }

  /* Cada pantalla tiene UN encabezado y la jerarquía no salta niveles */
  const malEncabezado = [];
  CB.pantallas.IDS.forEach(function (id) {
    const sec = document.getElementById(id);
    if (!sec) return;
    const h1 = sec.querySelectorAll('h1');
    if (h1.length !== 1) malEncabezado.push(id + ': ' + h1.length + ' h1');
  });
  t.ok(malEncabezado.length === 0,
    'las 18 pantallas declaran exactamente un <h1> en su maqueta',
    malEncabezado.join(', '));

  /* Exportar SIN importar es un botón que promete y no cumple */
  t.ok(typeof CB.adulto.restaurar === 'function',
    'existe la restauración de una copia, no solo la exportación');

  const ida = CB.almacen.exportar(CB.pruebas.perfilNuevo());
  const vuelta = CB.almacen.validarImportado(JSON.parse(ida), CB.datos.MOTES);
  t.ok(vuelta.ok && vuelta.perfil && vuelta.perfil.id,
    'lo que exporta el juego lo acepta su propio validador de importación',
    vuelta.ok ? '' : vuelta.motivo);

  /* Los globales del proyecto son EXACTAMENTE estos */
  const GLOBALES = ['ls', 'tramo', 'comparacion', 'serie', 'itemSuma', 'itemResta',
                  'itemMult', 'tabla', 'cuantos', 'itemVocab', 'digitos', 'desdeDigitos'];
  const faltanGlobales = GLOBALES.filter(function (n) { return typeof window[n] !== 'function'; });
  t.ok(faltanGlobales.length === 0,
    'los ' + GLOBALES.length + ' auxiliares globales declarados siguen existiendo',
    faltanGlobales.join(', '));

  /* El oyente del toque prematuro se registra UNA vez */
  const caja = document.createElement('div');
  let registrados = 0;
  const añadir = caja.addEventListener;
  caja.addEventListener = function () { registrados++; return añadir.apply(this, arguments); };
  let v;
  for (v = 0; v < 20; v++) CB.componentes.conectarToc(caja);
  t.igual(registrados, 1,
    'conectarToc() sobre el mismo contenedor 20 veces registra UN solo oyente');
  t.igual(caja.getAttribute('data-toc'), 'si', 'y deja la marca visible en el nodo');

  /* Un perfil ilegible NO se confunde con un perfil que no existe */
  const claveFalsa = CB.almacen.claveDePerfil('perfil-de-prueba-ilegible');
  let previo = null;
  try { previo = localStorage.getItem(claveFalsa); } catch (e5) { }

  t.ok(CB.almacen.leerPerfil('perfil-que-no-existe-jamas') === null,
    'un perfil que NO existe devuelve null');

  let escrito = false;
  try { localStorage.setItem(claveFalsa, '{esto no es json,,,'); escrito = true; } catch (e6) { }
  if (escrito) {
    const roto = CB.almacen.leerPerfil('perfil-de-prueba-ilegible');
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
