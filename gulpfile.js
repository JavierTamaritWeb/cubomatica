/* ============================================================================
   gulpfile.js — el paso de construcción de Cubomática
   ----------------------------------------------------------------------------
   CommonJS a propósito, sin "type": "module". Las dependencias elegidas son CJS
   o híbridas; las que obligarían a ESM (del, globby, chalk) no hacen falta, y el
   proyecto entero es ES5 con `var`: un gulpfile CJS no obliga a nadie a cambiar
   de modelo mental. Si algún día hiciera falta, gulpfile.mjs funciona en gulp 5
   sin más cambios.

   REGLA QUE GOBIERNA TODO ESTE FICHERO: `manifiesto.json` es la fuente única del
   orden de carga. Aquí no se escribe ni una lista de ficheros a mano.
   ========================================================================== */

const { src, dest, series, parallel, watch } = require('gulp');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');   /* solo para el servidor de pruebas de `gulp dev` */

const concat = require('gulp-concat');
/* gulp-sass no trae compilador: hay que pasárselo. sass-embedded es dart-sass
   corriendo como proceso, tres o cuatro veces más rápido en modo vigilancia. */
const sass = require('gulp-sass')(require('sass-embedded'));
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const htmlmin = require('gulp-html-minifier-terser');
const navegador = require('browser-sync').create();

const M = require('./manifiesto.json');

/* ── Rutas ─────────────────────────────────────────────────────────────────
   Las del manifiesto son relativas a src/, que es donde viven las fuentes.

   `audio/` NO aparece: los 9 MP3 viven directamente en `dist/audio/` porque no
   se compilan desde nada —ya SON el artefacto— y con dist/ versionada, tenerlos
   en dos sitios duplicaría 42 MB en el árbol de trabajo de todo el que clone.
   Gulp no los toca nunca, y por eso `limpiar` borra rutas concretas en vez de
   arrasar la carpeta. */
const FUENTE = 'src';
/* Los DOCE .scss, no los diez del manifiesto. El manifiesto declara los diez
   PARCIALES —lo que se compila, y en qué orden—, pero el punto de entrada y el
   fichero de mixins también son fuentes de estilo y también hay que vigilarlos
   y firmarlos.
   Dejarlos fuera del vigilante fue un fallo real: `_herramientas.scss` es donde
   viven `bisel()`, `paso()` y los mapas de puntos de ruptura, o sea el sitio
   donde más se toca al ajustar el diseño, y `npm run dev` no reconstruía al
   guardarlo. El síntoma no es un error: es que la pantalla no cambia, que se lee
   como «el mixin no funciona». */
const SCSS_EXTRA = [FUENTE + '/' + M.entradaEstilos,
                    FUENTE + '/scss/abstracts/_herramientas.scss'];
const RUTAS = {
  html: FUENTE + '/index.html',
  guiones: M.guiones.map((f) => FUENTE + '/' + f),
  estilos: M.estilos.map((f) => FUENTE + '/' + f).concat(SCSS_EXTRA),
  entradaScss: FUENTE + '/' + M.entradaEstilos,
  estaticos: ['LEEME.txt', 'AVISO-LEGAL.txt', 'LICENSE', 'LICENCIAS-TERCEROS.md'],
  salida: 'dist',
};

/* ══════════════════════════════════════════════════════════════════════════
   TERSER — cada opción está aquí por un fallo concreto que provocaría
   ══════════════════════════════════════════════════════════════════════════ */
const OPCIONES_TERSER = {
  /* El suelo declarado es un Chromebook de 2019 y un iPad de 6.ª generación.
     Con ecma:2015 terser reescribe `function(){}` como arrow y los objetos en
     forma abreviada: sale más corto y sale fuera del suelo declarado. */
  ecma: 5,
  module: false,
  toplevel: false,

  compress: {
    /* ← LA OPCIÓN CRÍTICA. Con true, terser borra las doce `function tabla()`,
       `function serie()`, `function ls()`… porque NADIE las llama por su nombre
       dentro del bundle: solo pruebas/casos-carga.js las busca en window. Doce
       comprobaciones en rojo y la multiplicación rota, sin un error. */
    toplevel: false,
    /* Los 44 `var CB = CB || {}` y los IIFE de datos/vocabulario.js y
       js/17-catalogo.js son efectos laterales POR DISEÑO. Con true terser puede
       considerarlos puros y tirarlos. */
    side_effects: false,
    unused: true,          // seguro DENTRO de funciones; toplevel es false
    dead_code: true,
    drop_console: false,   // hay avisos deliberados; quitarlos cambia la conducta
    keep_fargs: true,      // la suite inspecciona funciones: Function.length importa
    passes: 2,
  },

  mangle: {
    /* Lo mismo por el otro lado: renombrar `tabla` a `t` deja window.tabla sin
       definir y casos-carga.js falla igual. */
    toplevel: false,
    reserved: ['CB'],
    /* properties: PROHIBIDO Y NO NEGOCIABLE.
       js/01-almacen.js serializa el perfil con JSON.stringify. Manglear
       propiedades reescribe las CLAVES GUARDADAS en localStorage y todo perfil
       existente de todo niño se vuelve ilegible. Además los slugs de destreza y
       los data-* son cadenas que se comparan por igualdad. */
  },

  format: {
    /* Conserva la cabecera legal. El aviso de no afiliacion NO depende de esto:
       vive en CB.LEGAL.AVISO, que es una cadena, y terser no toca las cadenas.
       Nombrar la marca aqui haria saltar la lista negra del bloque 1 de la
       auditoria contra este mismo fichero, y la salida seria una exencion nueva
       que debilita el grep para nada. */
    comments: /Cubom|AVISO|Licencia|MIT|©/i,
    ascii_only: false,     // el juego es UTF-8 y lo declara en <meta charset>
  },
};

/* Y lo que NO se pone, explícitamente:

   · SIN envoltura IIFE (output.wrap). Una IIFE saca los 12 globales de window y,
     peor, deja `var CB` local del bundle: los 14 pruebas/casos-*.js se cargan
     como <script> aparte y no verían CB en absoluto. Moriría la suite entera.

   · SIN 'use strict'. Las 11 989 líneas nunca se han ejecutado en modo estricto.
     Activarlo convierte en TypeError cosas hoy silenciosas (asignar a variable
     no declarada, parámetros duplicados, literales octales). Es otra migración,
     con su fase y su suite; no se cuela dentro de esta. */

/* cssnano conservador. reduceIdents renombraría los @keyframes —hoy es seguro
   porque ningún JS nombra uno, verificado, pero se desactiva igual— y zindex
   tocaría los valores que 06-biomas.css razona en comentarios. */
const OPCIONES_CSSNANO = {
  preset: ['default', {
    discardComments: { removeAll: true },
    reduceIdents: false,
    mergeIdents: false,
    zindex: false,
    normalizeUrl: false,
  }],
};

/* html-minifier-terser. removeOptionalTags queda FUERA: quitaría </body> y
   </html>. Las comillas de atributo se conservan para que la auditoría y el
   cruce de clases sigan pudiendo leer dist/index.html. */
const OPCIONES_HTML = {
  collapseWhitespace: true,
  conservativeCollapse: false,
  removeComments: true,
  removeAttributeQuotes: false,
  removeOptionalTags: false,
  removeRedundantAttributes: false,
  minifyJS: false,
  minifyCSS: false,
  caseSensitive: true,
  keepClosingSlash: true,
};

/* ══════════════════════════════════════════════════════════════════════════
   Tareas
   ══════════════════════════════════════════════════════════════════════════ */

/* Borra rutas concretas, NUNCA `dist/` entera: dist/audio/ está versionada y
   son 42 MB que no se regeneran desde nada. */
async function limpiar() {
  const fuera = ['index.html', 'css', 'js', 'sw.js', 'manifest.webmanifest']
    .concat(RUTAS.estaticos.map((f) => path.basename(f)));
  await Promise.all(fuera.map((f) =>
    fsp.rm(path.join(RUTAS.salida, f), { recursive: true, force: true })));
}

/* El expandido es el que audita el bloque 3 (las tres reglas duras de estilo),
   así que sale con `expanded` y sin sourcemap: nada que no sea CSS del
   proyecto, y una regla por línea para que los filtros por línea del bloque 3
   sigan significando algo. */
function estilosDev() {
  return src(RUTAS.entradaScss)
    .pipe(sass.sync({ style: 'expanded' }).on('error', sass.logError))
    .pipe(rename('cubomatica.css'))
    .pipe(dest(RUTAS.salida + '/css'));
}

/* SIN MAPA DE ORIGEN, y es una corrección, no un olvido.
   Los emitía, `.gitignore` los excluía (977 KB por construcción) y `dist/` está
   versionada: resultado, los dos ficheros minificados que SÍ se publican
   terminaban con un `sourceMappingURL` que apunta a algo que no existe en
   ningún clon. Correcto solo en la máquina que acababa de construir, roto para
   todos los demás — un 404 por fichero en cuanto se abren las herramientas de
   desarrollo, en un proyecto cuyo criterio de entrega es «consola limpia».

   Las dos salidas eran malas: publicar 977 KB generados en cada construcción, o
   dejar la referencia colgando. Y no hacen falta, porque la depuración de este
   proyecto ya está resuelta mejor: `dist/js/cubomatica.js` es el bundle legible,
   que no es una reconstrucción aproximada sino las fuentes pegadas byte a byte,
   y `pruebas/pruebas.html` corre contra él justamente por eso. */
function estilosMin() {
  return src(RUTAS.entradaScss)
    .pipe(sass.sync({ style: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano(OPCIONES_CSSNANO)]))
    .pipe(rename('cubomatica.min.css'))
    .pipe(dest(RUTAS.salida + '/css'));
}

/* El bundle legible es la concatenación BYTE A BYTE de los 44, unidos con \n.
   Nada más. Así la auditoría puede reconstruirlo en memoria desde el manifiesto
   y compararlo: si coinciden, el orden es correcto, sin heurística ninguna.

   Y por eso NO lleva sourcemap: la línea `//# sourceMappingURL=…` son 39 bytes
   que rompen esa igualdad y obligarían a normalizar antes de comparar. Un mapa
   de origen aquí tampoco aporta nada —el fichero ES las fuentes pegadas—;
   el minificado, que sí lo necesita, lo conserva. */
function guionesDev() {
  return src(RUTAS.guiones)
    .pipe(concat('cubomatica.js', { newLine: '\n' }))
    .pipe(dest(RUTAS.salida + '/js'));
}

/* Sin mapa de origen, por el mismo motivo que estilosMin: ver allí. */
function guionesMin() {
  return src(RUTAS.guiones)
    .pipe(concat('cubomatica.min.js', { newLine: '\n' }))
    .pipe(terser(OPCIONES_TERSER))
    .pipe(dest(RUTAS.salida + '/js'));
}

function html() {
  return src(RUTAS.html)
    .pipe(replace(/<!-- ESTILOS:INICIO[\s\S]*?ESTILOS:FIN -->/,
      '<link rel="stylesheet" href="css/cubomatica.min.css">'))
    .pipe(replace(/<!-- GUIONES:INICIO[\s\S]*?GUIONES:FIN -->/,
      '<script src="js/cubomatica.min.js"></script>'))
    .pipe(htmlmin(OPCIONES_HTML))
    .pipe(dest(RUTAS.salida));
}

function estaticos() {
  return src(RUTAS.estaticos, { encoding: false }).pipe(dest(RUTAS.salida));
}

/* Huellas de las fuentes, para que la auditoría pueda demostrar que dist/ está
   al día SIN tener que compilar nada.
   Con el JS basta con reconstruir el bundle en memoria y compararlo byte a byte,
   porque es una concatenación pura. Con el CSS ya no: Sass no concatena, genera.
   Recompilar desde la auditoría exigiría sass-embedded, y la auditoría tiene que
   correr en un clon limpio sin `npm install`. Así que gulp deja escrito el sha1
   de cada fuente y la auditoría lo recalcula: cero dependencias, y detecta
   igualmente un .scss tocado sin reconstruir. */
async function huellas() {
  const crypto = require('node:crypto');
  const sha = (f) => crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex');
  const fuentes = {};
  for (const f of RUTAS.estilos) {          // los 12: los 10 parciales, la entrada y los mixins
    if (fs.existsSync(f)) fuentes[f] = sha(f);
  }
  await fsp.writeFile(path.join(RUTAS.salida, '.huellas.json'),
    JSON.stringify({ _: 'lo escribe gulp; lo verifica la auditoria', fuentes }, null, 2) + '\n');
}

/* ── sw ────────────────────────────────────────────────────────────────────
   VA EN `series`, NUNCA EN `parallel`, y es el error clásico de esta tarea:
   necesita el HTML, el CSS y el JS ya escritos EN DISCO para calcular la huella
   sha1 de su contenido. En paralelo calcularía la huella de un fichero que aún
   no existe, y el resultado sería una caché con nombre estable sobre contenido
   cambiante — es decir, exactamente el fallo que la huella venía a evitar. */
async function sw() {
  const crypto = require('node:crypto');
  /* LAS DOCE PIEZAS DE DINERO ENTRAN EN EL ARMAZÓN, la música no. La diferencia
     es el peso: 64 KB las doce contra 42 MB las nueve pistas. Un juego sin red
     que se queda mudo sigue siendo el juego; uno que en la pregunta «toca la
     moneda de 2 euros» pinta cuatro rectángulos de color, no.
     Van en `dist/img/` y NO se compilan desde nada, igual que `dist/audio/`:
     `docs/dinero.md` guarda los comandos con los que se generaron. */
  const PIEZAS = ['c1', 'c5', 'c10', 'c20', 'c50', '1', '2', '5', '10', '20', '50', '100'];
  const armazon = ['index.html', 'css/cubomatica.min.css',
                   'js/cubomatica.min.js', 'manifest.webmanifest']
    .concat(PIEZAS.map((p) => 'img/pieza-' + p + '.webp'));

  /* La versión sale de CB.VERSION con el mismo regex que usa el bloque 5b de la
     auditoría: es una réplica GENERADA, no escrita a mano, así que no puede
     desviarse. */
  const nucleo = fs.readFileSync(path.join(FUENTE, 'js', '00-nucleo.js'), 'utf8');
  const version = (nucleo.match(/CB\.VERSION\s*=\s*'(\d+\.\d+\.\d+)'/) || [])[1];
  if (!version) throw new Error('no se encuentra CB.VERSION en 00-nucleo.js');

  /* El manifest primero: entra en el armazón, así que su contenido cuenta para
     la huella. Icono SVG en data: URI porque el proyecto no admite un solo
     binario —el bloque 4 de la auditoría lo prohíbe— y sin icons Chrome no
     ofrece instalar. */
  const icono = encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<rect width="64" height="64" fill="#2B2118"/>' +
    '<rect x="12" y="12" width="18" height="18" fill="#5AA02C"/>' +
    '<rect x="34" y="12" width="18" height="18" fill="#E8B923"/>' +
    '<rect x="12" y="34" width="18" height="18" fill="#3C7BD4"/>' +
    '<rect x="34" y="34" width="18" height="18" fill="#8C8C8C"/></svg>');
  await fsp.writeFile(path.join(RUTAS.salida, 'manifest.webmanifest'),
    JSON.stringify({
      name: 'Cubomática', short_name: 'Cubomática', lang: 'es',
      description: 'Juego de matemáticas para 2.º de Primaria',
      start_url: './index.html', scope: './',
      display: 'fullscreen',
      /* «any», no «landscape»: el juego funciona en las dos y avisa por TAMAÑO,
         no por orientación. Forzarla se lo quitaría a quien tiene la tableta
         fijada en vertical por su propia configuración de accesibilidad. */
      orientation: 'any',
      theme_color: '#2B2118', background_color: '#2B2118',
      icons: [{ src: 'data:image/svg+xml,' + icono, sizes: 'any',
                type: 'image/svg+xml', purpose: 'any maskable' }],
    }, null, 2) + '\n');

  const bytes = armazon.map((f) => fs.readFileSync(path.join(RUTAS.salida, f)));
  const huella = crypto.createHash('sha1')
    .update(Buffer.concat(bytes)).digest('hex').slice(0, 8);

  const plantilla = fs.readFileSync(path.join(FUENTE, 'sw.plantilla.js'), 'utf8');
  await fsp.writeFile(path.join(RUTAS.salida, 'sw.js'),
    plantilla.replace('__VERSION__', version)
             .replace('__HUELLA__', huella)
             .replace('__PRECACHE__', JSON.stringify(armazon)));
  console.log('  sw: version ' + version + ', huella ' + huella);
}

/* ── LOS DOS SERVIDORES DE DESARROLLO, Y POR QUE SON DOS ─────────────────────

   8080 · EL JUEGO, con recarga en vivo. Lo sirve browser-sync desde dist/ e
          inyecta su cliente en el HTML para poder recargar solo.

   8081 · LAS PRUEBAS, sin tocar nada. Un servidor estatico de veinte lineas
          sobre la raiz del repositorio, para que /pruebas/pruebas.html encuentre
          su ../dist/js/cubomatica.js.

   Podrian ser uno, y se intento: browser-sync inyecta su cliente como un <script>
   mas en CADA html que sirve, y `casos-carga.js` comprueba —con razon— que la
   pagina de pruebas cargue UN SOLO guion, el bundle de dist/ y nada mas. Con la
   inyeccion puesta, la suite decia «obtenido 2, esperado 1» y señalaba a
   browser-sync-client.js. Su `snippetOptions.blacklist` deberia excluir una ruta;
   con este browser-sync apaga la inyeccion ENTERA, y entonces lo que se pierde es
   la recarga del juego, que es justo lo que se venia a ganar.

   Asi que la comprobacion se queda como esta —el dia que alguien vuelva a partir
   el juego en 45 <script> sueltos tiene que ponerse rojo— y lo que se separa son
   los servidores. Cada uno hace una cosa y ninguno estorba al otro.
   ────────────────────────────────────────────────────────────────────────── */

/* SIN CACHE, Y NO ES PARANOIA. Chrome reutiliza alegremente un
   `dist/js/cubomatica.js` de hace tres ediciones: la pagina recarga, el numero de
   comprobaciones no cambia, y lo verde que sale mide codigo viejo. Es el modo de
   fallo mas caro que tiene este proyecto, porque no se distingue de funcionar. */
function sinCache(req, res, siguiente) {
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  siguiente();
}

/* ── EL SERVICE WORKER, DESARMADO EN DESARROLLO ──────────────────────────────
   Este es EL motivo por el que `npm run dev` podia recompilar, recargar y seguir
   enseñando el bundle anterior. `dist/index.html` registra un service worker que
   cachea el armazon con politica cache-first (js/45-offline.js): en cuanto se
   instala una vez, deja de importar lo que diga el servidor, sirve su copia.
   Guardas, gulp recompila, browser-sync recarga, y en pantalla no cambia nada.
   Es la version local del riesgo R7 —«el SW sirve una version vieja para
   siempre»— que el plan preveia para un aula de 25 aparatos.

   La respuesta es un sw.js que se suicida: se instala, borra TODAS las caches, se
   da de baja y renavega las pestañas abiertas. La primera carga tras arrancar
   `npm run dev` limpia lo que hubiera registrado, y a partir de ahi manda el
   servidor.

   PARA PROBAR EL SERVICE WORKER DE VERDAD: `CON_SW=1 npm run dev`. Sin esa
   salida no se podria comprobar el modo sin conexion, que es una funcion
   entregada y hay que poder mirarla. */
const SW_SUICIDA = [
  "self.addEventListener('install', function () { self.skipWaiting(); });",
  "self.addEventListener('activate', function (ev) {",
  "  ev.waitUntil(caches.keys()",
  "    .then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })",
  "    .then(function () { return self.registration.unregister(); })",
  "    .then(function () { return self.clients.matchAll(); })",
  "    .then(function (cs) { cs.forEach(function (c) { c.navigate(c.url); }); }));",
  "});",
].join('\n');

function swDesarmado(req, res, siguiente) {
  if (process.env.CON_SW === '1') return siguiente();
  if (req.url.split('?')[0] !== '/sw.js') return siguiente();
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(SW_SUICIDA);
}

const TIPOS_DEV = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

/* El servidor de las pruebas. Sin dependencias y sin inyectar nada: lo que llega
   al navegador es exactamente el fichero del disco. */
function servidorPruebas(cb) {
  const raiz = path.resolve('.');
  http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    const f = path.join(raiz, rel);
    if (!f.startsWith(raiz) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('no existe: ' + rel);
      return;
    }
    res.writeHead(200, {
      'Content-Type': TIPOS_DEV[path.extname(f)] || 'application/octet-stream',
      'Cache-Control': 'no-store, must-revalidate',
    });
    fs.createReadStream(f).pipe(res);
  }).listen(8081, cb);
}

function servidor(cb) {
  navegador.init({
    server: { baseDir: RUTAS.salida, middleware: [sinCache, swDesarmado] },
    open: false, notify: false, ghostMode: false, port: 8080,
  });
  console.log('');
  console.log('  juego (recarga sola):  http://localhost:8080/');
  console.log('  pruebas:               http://localhost:8081/pruebas/pruebas.html');
  console.log('  pruebas minificadas:   http://localhost:8081/pruebas/pruebas-min.html');
  console.log('  las dos paginas de prueba se recargan a mano (F5): no se les');
  console.log('  inyecta nada, para que sigan cargando un solo guion y nada mas.');
  if (process.env.CON_SW === '1') {
    console.log('  CON_SW=1: el service worker REAL esta activo; los cambios pueden');
    console.log('            tardar en verse porque su cache manda sobre el servidor.');
  }
  console.log('');
  cb();
}

/* Lo que se vigila tiene que ser lo que se compila, o el modo desarrollo miente
   por omisión: guardas, no pasa nada, y concluyes que el cambio no funciona.
   `manifiesto.json` NO está aquí a propósito: gulp lo lee con require() al
   arrancar, así que cambiarlo obliga a reiniciar `npm run dev` de todas formas.
   Vigilarlo daría una recarga que parece atender el cambio sin atenderlo. */
function vigilar(cb) {
  const recarga = (d) => series(d, (f) => { navegador.reload(); f(); });
  watch(RUTAS.estilos, recarga(series(estilos, sw, huellas)));
  watch(RUTAS.guiones, recarga(series(guiones, sw)));
  watch([RUTAS.html, FUENTE + '/sw.plantilla.js'], recarga(series(html, sw)));
  /* Las pruebas NO se compilan: los casos-*.js y las dos paginas se sirven tal
     cual desde la raiz. No hay nada que reconstruir, solo que recargar — y sin
     esto habia que darle a F5 a mano despues de cada guardado, que es la razon
     por la que se acababa mirando una suite de hace dos ediciones. */
  watch(['pruebas/*.js', 'pruebas/*.html'], (f) => {
    console.log('  pruebas: cambio detectado — recarga la pestaña de 8081 (F5)');
    f();
  });
  cb();
}

const estilos = parallel(estilosDev, estilosMin);
const guiones = parallel(guionesDev, guionesMin);

/* html va DESPUES del resto: en la fase 8 el service worker necesita el HTML, el
   CSS y el JS ya escritos en disco para calcular la huella sha1 del armazon. */
const build = series(limpiar, parallel(estilos, guiones, estaticos), html, sw, huellas);
const dev = series(build, parallel(servidor, servidorPruebas, vigilar));

exports.limpiar = limpiar;
exports.estilos = estilos;
exports.guiones = guiones;
exports.html = html;
exports.estaticos = estaticos;
exports.sw = sw;
exports.build = build;
exports.dev = dev;
/* `watch` es el alias explicito para quien invoque Gulp directamente. La tarea
   predeterminada tambien entra en desarrollo para que `gulp` no construya y se
   cierre, sino que quede a la espera de cambios. `gulp build` conserva la
   construccion puntual para CI y entregas. */
exports.watch = dev;
exports.default = dev;
