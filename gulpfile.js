/* gulpfile.js — el paso de construcción de Cubomática */

const { src, dest, series, parallel, watch } = require('gulp');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');   /* los dos servidores locales de `gulp dev` */

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

const M = require('./manifiesto.json');

/* Rutas */
const FUENTE = 'src';

const SCSS_EXTRA = [FUENTE + '/' + M.entradaEstilos,
                    FUENTE + '/scss/abstracts/_mixins.scss'];
const RUTAS = {
  html: FUENTE + '/index.html',
  guiones: M.guiones.map((f) => FUENTE + '/' + f),
  estilos: M.estilos.map((f) => FUENTE + '/' + f).concat(SCSS_EXTRA),
  entradaScss: FUENTE + '/' + M.entradaEstilos,
  estaticos: ['LEEME.txt', 'AVISO-LEGAL.txt', 'LICENSE', 'LICENCIAS-TERCEROS.md'],
  salida: 'dist',
};

/* TERSER — cada opción está aquí por un fallo concreto que provocaría */
const OPCIONES_TERSER = {
  /* El suelo declarado es un Chromebook de 2019 y un iPad de 6.ª generación.
     Con ecma:2015 terser reescribe `function(){}` como arrow y los objetos en
     forma abreviada: sale más corto y sale fuera del suelo declarado. */
  ecma: 5,
  module: false,
  toplevel: false,

  compress: {
    /* Con true, terser borra las doce `function tabla()`, `function serie()`, `function ls()`… porque NADIE las llama por su nombre dentro del bundle: solo pruebas/casos-carga.js las busca en window. */
    toplevel: false,
    /* Los 45 `var CB = CB || {}` y los IIFE de datos/vocabulario.js y
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

  },

  format: {

    comments: /Cubom|AVISO|Licencia|MIT|©/i,
    ascii_only: false,     // el juego es UTF-8 y lo declara en <meta charset>
  },
};

/* El bundle clásico nunca se ha ejecutado en modo estricto. */

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

/* Tareas */

/* Borra rutas concretas, NUNCA `dist/` entera: dist/audio/ está versionada y
   son 42 MB que no se regeneran desde nada. */
async function limpiar() {
  const fuera = ['index.html', 'css', 'js', 'sw.js', 'manifest.webmanifest']
    .concat(RUTAS.estaticos.map((f) => path.basename(f)));
  await Promise.all(fuera.map((f) =>
    fsp.rm(path.join(RUTAS.salida, f), { recursive: true, force: true })));
}

/* El expandido es el que audita el bloque 3 (las tres reglas duras de estilo), así que sale con `expanded` y sin sourcemap: nada que no sea CSS del proyecto, y una regla por línea para que los filtros por línea del bloque 3 sigan… */
function estilosDev() {
  return src(RUTAS.entradaScss)
    .pipe(sass.sync({ style: 'expanded' }).on('error', sass.logError))
    .pipe(rename('cubomatica.css'))
    .pipe(dest(RUTAS.salida + '/css'));
}

/* Correcto solo en la máquina que acababa de construir, roto para todos los demás — un 404 por fichero en cuanto se abren las herramientas de desarrollo, en un proyecto cuyo criterio de entrega es «consola limpia». */
function estilosMin() {
  return src(RUTAS.entradaScss)
    .pipe(sass.sync({ style: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano(OPCIONES_CSSNANO)]))
    .pipe(rename('cubomatica.min.css'))
    .pipe(dest(RUTAS.salida + '/css'));
}

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

async function huellas() {
  const crypto = require('node:crypto');
  const sha = (f) => crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex');
  const fuentes = {};
  for (const f of RUTAS.estilos) {          // los 13: los 11 parciales, la entrada y los mixins
    if (fs.existsSync(f)) fuentes[f] = sha(f);
  }
  await fsp.writeFile(path.join(RUTAS.salida, '.huellas.json'),
    JSON.stringify({ _: 'lo escribe gulp; lo verifica la auditoria', fuentes }, null, 2) + '\n');
}

/* sw */
async function sw() {
  const crypto = require('node:crypto');

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

  /* Icono SVG en data: URI porque el proyecto no admite un solo binario —el bloque 4 de la auditoría lo prohíbe— y sin icons Chrome no ofrece instalar. */
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

/* LOS DOS SERVIDORES DE DESARROLLO, Y POR QUE SON DOS */

/* EL SERVICE WORKER, DESARMADO EN DESARROLLO */
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
const PUERTO_JUEGO = Number(process.env.PUERTO_JUEGO) || 8080;
const PUERTO_PRUEBAS = Number(process.env.PUERTO_PRUEBAS) || 8081;

/* SIN CACHE, Y NO ES PARANOIA. Chrome reutiliza alegremente un bundle de hace
   tres ediciones: la pagina recarga y lo verde mide codigo viejo. Además se
   resuelve la ruta antes de leer nada: `..` nunca puede escapar de la raiz. */
function rutaDev(raiz, url) {
  let rel;
  try { rel = decodeURIComponent(url.split('?')[0]).replace(/^\/+/, ''); }
  catch (e) { return null; }
  const f = path.resolve(raiz, rel || 'index.html');
  return (f === raiz || f.startsWith(raiz + path.sep)) ? f : null;
}

function servirFichero(raiz, req, res, opciones) {
  const f = rutaDev(raiz, req.url);
  if (!f || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('no existe');
    return;
  }

  const cabeceras = {
    'Content-Type': TIPOS_DEV[path.extname(f)] || 'application/octet-stream',
    'Cache-Control': 'no-store, must-revalidate',
  };
  if (opciones && opciones.inyectarRecarga && path.extname(f) === '.html') {
    const htmlDev = fs.readFileSync(f, 'utf8').replace('</body>', CLIENTE_RECARGA + '</body>');
    res.writeHead(200, cabeceras);
    res.end(htmlDev);
    return;
  }
  res.writeHead(200, cabeceras);
  fs.createReadStream(f).pipe(res);
}

/* El servidor de las pruebas. Sin dependencias y sin inyectar nada: lo que llega
   al navegador es exactamente el fichero del disco. */
/* Un puerto ocupado es casi siempre otro `npm run dev` de este mismo proyecto,
   ya sirviendo lo mismo. Antes la excepcion de EADDRINUSE viajaba sin manejador,
   abortaba la serie entera y se llevaba por delante a `vigilar`, que corre en el
   mismo `parallel` y es lo unico que no se puede sustituir: el servidor viejo
   sigue sirviendo, pero nadie reconstruye. El aviso basta y el vigilante queda. */
function escuchar(srv, puerto, nombre, cb, alArrancar) {
  srv.once('error', (e) => {
    if (e.code !== 'EADDRINUSE') { cb(e); return; }
    console.log('');
    console.log('  AVISO: el puerto ' + puerto + ' (' + nombre + ') ya esta ocupado.');
    console.log('  Suele ser otro "npm run dev" vivo. Para verlo:');
    console.log('    lsof -nP -iTCP:' + puerto + ' -sTCP:LISTEN');
    console.log('  Sigo sin ese servidor: el vigilante de cambios SI queda activo.');
    console.log('');
    cb();
  });
  srv.listen(puerto, alArrancar || cb);
}

function servidorPruebas(cb) {
  const raiz = path.resolve('.');
  const srv = http.createServer((req, res) => {
    servirFichero(raiz, req, res);
  });
  escuchar(srv, PUERTO_PRUEBAS, 'pruebas', cb);
}

const CLIENTE_RECARGA = '<script>(function(){var e=new EventSource("/__recarga");' +
  'e.onmessage=function(){location.reload();};})();</script>';
const clientesRecarga = new Set();

function recargarNavegadores() {
  clientesRecarga.forEach((res) => res.write('data: recargar\n\n'));
}

function servidor(cb) {
  const raiz = path.resolve(RUTAS.salida);
  const srv = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    if (url === '/__recarga') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-store',
        'Connection': 'keep-alive',
      });
      res.write(': conectado\n\n');
      clientesRecarga.add(res);
      req.on('close', () => clientesRecarga.delete(res));
      return;
    }
    if (url === '/sw.js' && process.env.CON_SW !== '1') {
      res.writeHead(200, {
        'Content-Type': 'text/javascript; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(SW_SUICIDA);
      return;
    }
    servirFichero(raiz, req, res, { inyectarRecarga: true });
  });

  escuchar(srv, PUERTO_JUEGO, 'juego', cb, () => {
    console.log('');
    console.log('  juego (recarga sola):  http://localhost:' + PUERTO_JUEGO + '/');
    console.log('  pruebas:               http://localhost:' + PUERTO_PRUEBAS + '/pruebas/pruebas.html');
    console.log('  pruebas minificadas:   http://localhost:' + PUERTO_PRUEBAS + '/pruebas/pruebas-min.html');
    console.log('  las dos paginas de prueba se recargan a mano (F5): no se les');
    console.log('  inyecta nada, para que sigan cargando un solo guion y nada mas.');
    if (process.env.CON_SW === '1') {
      console.log('  CON_SW=1: el service worker REAL esta activo; los cambios pueden');
      console.log('            tardar en verse porque su cache manda sobre el servidor.');
    }
    console.log('');
    cb();
  });
}

function vigilar(cb) {
  const recarga = (d) => series(d, (f) => { recargarNavegadores(); f(); });
  watch(RUTAS.estilos, recarga(series(estilos, sw, huellas)));
  watch(RUTAS.guiones, recarga(series(guiones, sw)));
  watch([RUTAS.html, FUENTE + '/sw.plantilla.js'], recarga(series(html, sw)));
  /* No hay nada que reconstruir, solo que recargar — y sin esto habia que darle a F5 a mano despues de cada guardado, que es la razon por la que se acababa mirando una suite de hace dos ediciones. */
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

exports.watch = dev;
exports.default = dev;
