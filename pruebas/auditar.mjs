#!/usr/bin/env node
/* ============================================================================
   auditar.mjs — LA AUDITORÍA QUE BLOQUEA LA ENTREGA
   ----------------------------------------------------------------------------
   POR QUÉ DEJA DE SER UN GUION DE SHELL, y son cuatro razones:

   1. HABÍA DOS IMPLEMENTACIONES Y YA HABÍAN DIVERGIDO. `auditar.bat` cubría
      cinco de los ocho bloques: le faltaban la versión, la documentación y el
      peso. Mantener dos veces la misma lógica es exactamente el fallo que este
      fichero persigue en otros —«un número repetido a mano en tres sitios está
      mal en dos en cuanto alguien se despista una vez»— aplicado a sí mismo.
   2. DEPENDÍA DE python3 Y perl. En Windows no hay ninguno de los dos por
      defecto, y por eso el .bat estaba capado. Node ya es obligatorio desde que
      hay compilación, así que el problema desaparece en vez de repartirse.
   3. Los bloques nuevos no son trabajo de grep. El 3 lee UN fichero compilado en
      vez de nueve fuentes; el 5 cruza tres estructuras contra un manifiesto.
   4. `node --check` y la extracción de los doce globales necesitan Node igual.

   RESTRICCIÓN AUTOIMPUESTA: solo `node:fs`, `node:path`, `node:child_process`.
   CERO devDependencies. Tiene que correr en un clon recién descargado, sin
   `npm install`, porque si no la puerta de entrega deja de ser una puerta y pasa
   a ser un privilegio de quien tenga el entorno montado.

   Y una regla que gobierna todo el fichero, escrita aquí para no volver a
   discutirla en cada bloque:

     · Toda comprobación de CONTENIDO DE CÓDIGO se hace sobre `src/`. Terser
       reescribe `{ clave: 'calma' }` como `{clave:"calma"}`, así que cualquier
       grep de texto sobre el bundle miente.
     · Sobre `dist/` solo se comprueban INVARIANTES ESTRUCTURALES: existe,
       parsea, conserva los doce globales, lleva el aviso legal, pesa menos de X.
     · Y todo lo que mira `dist/` se SALTA CON AVISO si no está, en vez de
       fallar. Un rojo falso acaba siempre igual: alguien desactiva la auditoría.

   Uso:  node pruebas/auditar.mjs [--autoprueba]
   ========================================================================== */

import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(RAIZ);
const D = (...p) => join(RAIZ, ...p);

let FALLOS = 0;
const verde = (m) => console.log('  \x1b[32m✔\x1b[0m ' + m);
const rojo = (m, d) => {
  FALLOS++;
  console.log('  \x1b[31m✘ ' + m + '\x1b[0m');
  if (d) String(d).split('\n').slice(0, 10).forEach((l) => console.log('      ' + l));
};
const salto = (m) => console.log('  \x1b[33m–\x1b[0m ' + m);
const juzgar = (cond, bien, mal, detalle) => (cond ? verde(bien) : rojo(mal, detalle));
const titulo = (n) => { console.log(''); console.log(n); };

/* ── Recorrido de ficheros, con poda ───────────────────────────────────────
   `node_modules` tiene 415 paquetes y `dist/` es el producto. Recorrerlos no es
   que dé falsos positivos: es que TARDA MINUTOS, y una auditoría que se cuelga
   no la ejecuta nadie. Es el fallo E26. */
const PODA = new Set(['node_modules', '.git', 'dist', 'vendor', '__pycache__']);
function* recorrer(dir, podarDist = true) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (PODA.has(e.name) && (e.name !== 'dist' || podarDist)) continue;
      yield* recorrer(join(dir, e.name), podarDist);
    } else {
      yield join(dir, e.name);
    }
  }
}
const corto = (f) => relative(RAIZ, f);
const leer = (f) => readFileSync(f, 'utf8');
const listar = (dir, ext) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)).sort().map((f) => join(dir, f)) : [];

/* Despiece de comentarios. Existe porque el comentario que DOCUMENTA una
   prohibición hacía saltar el grep que la persigue: la auditoría se ponía roja
   contra código perfectamente correcto, y la reacción típica ante un test que
   grita en falso es desactivarlo. Es el fallo E5. */
function sinComentariosJS(texto) {
  let s = '', i = 0, cad = null, linea = false, bloque = false, esc = false;
  while (i < texto.length) {
    const c = texto[i], sig = texto[i + 1] || '';
    if (linea) { if (c === '\n') { linea = false; s += c; } i++; continue; }
    if (bloque) { if (c === '*' && sig === '/') { bloque = false; i += 2; continue; } s += (c === '\n' ? '\n' : ' '); i++; continue; }
    if (cad) { s += c; if (esc) esc = false; else if (c === '\\') esc = true; else if (c === cad) cad = null; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { cad = c; s += c; i++; continue; }
    if (c === '/' && sig === '/') { linea = true; i += 2; continue; }
    if (c === '/' && sig === '*') { bloque = true; i += 2; continue; }
    s += c; i++;
  }
  return s;
}
const sinComentariosCSS = (t) => t.replace(/\/\*[\s\S]*?\*\//g, ' ');

/* Devuelve «fichero:linea:texto» de cada línea que casa, como hacía `grep -n`. */
function buscar(ficheros, re, limpiar = sinComentariosJS) {
  const hits = [];
  for (const f of ficheros) {
    if (!existsSync(f)) continue;
    limpiar(leer(f)).split('\n').forEach((l, n) => {
      if (re.test(l)) hits.push(corto(f) + ':' + (n + 1) + ': ' + l.trim().slice(0, 110));
    });
  }
  return hits;
}

/* ── Las tres reglas duras de estilo, como funciones ───────────────────────
   Están aquí arriba, y no dentro del bloque 3, para que la AUTOPRUEBA pueda
   dispararlas contra violaciones inventadas. Sin eso, la autoprueba cubría tres
   greps del bloque 2 y ninguno del 3 — y los del 3 resultaron ser justo los
   flojos. Una autoprueba que no llega a la comprobación rota no vale nada.

   CERO SE ESCRIBE DE MUCHAS MANERAS, y la versión anterior de estos tres
   detectores solo conocía una. Los cuatro agujeros que tenían, encontrados
   probándolos contra violaciones inventadas en vez de dar por bueno el verde:

     · `border-radius: 0.5rem` pasaba. El filtro que perdonaba el cero,
       /border-radius: *0/, casa con el CERO INICIAL de «0.5rem». La regla que
       «tumba la construcción ante cualquier esquina redondeada» perdonaba justo
       las escritas en rem y en em.
     · `box-shadow: 0 0 4px` pasaba: el regex exigía `px` en los desplazamientos
       y en CSS el cero no lleva unidad. Es la forma MÁS común de escribirla.
     · `box-shadow: inset 0 0 8px` pasaba por lo mismo, y encima todo el relieve
       del juego es inset.
     · `transition: opacity 90ms` pasaba porque no nombra ninguna función — y la
       función POR DEFECTO en CSS es `ease`. Una transición suave que no escribe
       la palabra «ease» sigue siendo una transición suave.

   Se lee declaración a declaración y capa a capa, no por línea: es lo que
   permite mirar el tercer valor de una sombra de verdad. */
const cero = (v) => parseFloat(v) === 0;
const ESTILO = {
  radios: (css) => [...css.matchAll(/border-radius:\s*([^;}]+)/g)].map((m) => m[1].trim())
    .filter((v) => !v.replace(/!important/, '').trim().split(/[\s/]+/).every(cero)),

  /* Una sombra puede llevar varias capas separadas por comas; la coma de dentro
     de rgba() no separa capas, de ahí el (?![^(]*\)). */
  difusas: (css) => {
    const malas = [];
    for (const m of css.matchAll(/box-shadow:\s*([^;}]+)/g)) {
      for (const capa of m[1].split(/,(?![^(]*\))/)) {
        const n = capa.trim().replace(/^inset\s+/, '')
          .match(/^(-?[\d.]+)\w*\s+(-?[\d.]+)\w*\s+(-?[\d.]+)\w*/);
        if (n && !cero(n[3])) malas.push(capa.trim().slice(0, 110));
      }
    }
    return malas;
  },

  /* EN POSITIVO: toda transición y toda animación tienen que decir steps(). Así
     no hay que enumerar las maneras de ser suave —que incluyen no decir nada—,
     solo la única manera admitida de ser escalonado. */
  suaves: (css) => [...css.matchAll(/(?:transition|animation):\s*([^;}]+)/g)].map((m) => m[1].trim())
    .filter((v) => !/steps\(/.test(v) && !/^(none|inherit|initial|unset)\b/.test(v)),
};

const M = JSON.parse(leer(D('manifiesto.json')));
const CSS_COMPILADO = D('dist', 'css', 'cubomatica.css');
const HAY_DIST = existsSync(CSS_COMPILADO);

console.log('\nCubomática — auditoría de entrega');
console.log('=================================');

/* ══ 1. LISTA NEGRA DE MARCA ══════════════════════════════════════════════ */
titulo('1. Marca registrada');
const PATRON = /\bminecraft\b|\bcreeper\b|\bsteve\b|\benderman\b|\bmojang\b|\bnetherite\b|\bredstone\b|\bpiglin\b|\bmojangles\b|\bminecraftia\b|[a-z]craft\b/i;
/* Exentos porque son los ficheros que DECLARAN la lista negra. Se comprueba
   aparte que solo la citen para prohibirla, nunca para usarla. */
const EXENTOS = new Set(['AVISO-LEGAL.txt', '00-nucleo.js', 'auditar.sh', 'auditar.bat',
  'auditar.mjs', 'PLAN.md', 'nombres.js', 'casos-marca.js']);
const EXT_TEXTO = /\.(js|mjs|css|scss|html|md|txt|json|sh|bat|command)$/;

const hitsMarca = [];
for (const f of recorrer(RAIZ)) {
  if (!EXT_TEXTO.test(f)) continue;
  if (corto(f).startsWith('docs/')) continue;
  if (EXENTOS.has(f.split('/').pop())) continue;
  leer(f).split('\n').forEach((l, n) => {
    if (PATRON.test(l)) hitsMarca.push(corto(f) + ':' + (n + 1) + ': ' + l.trim().slice(0, 110));
  });
}
juzgar(!hitsMarca.length, '0 coincidencias de la lista negra fuera de los ficheros exentos',
  'coincidencias de la lista negra:', hitsMarca.join('\n'));

const usos = buscar([D('src/datos/nombres.js'), D('pruebas/casos-marca.js')], PATRON, (t) => t)
  .filter((l) => !/PROHIBIDOS|NEGRA|lista negra/i.test(l));
if (usos.length) rojo('los ficheros de lista negra la usan fuera de su declaracion', usos.join('\n'));

const nMoj = (leer(D('AVISO-LEGAL.txt')).match(/Mojang/g) || []).length;
juzgar(nMoj === 2, 'AVISO-LEGAL.txt contiene exactamente 2 menciones a la marca',
  'AVISO-LEGAL.txt tiene ' + nMoj + ' menciones (deben ser 2)');

/* ══ 2. FRONTERA DE ARQUITECTURA ══════════════════════════════════════════ */
titulo('2. Frontera de arquitectura');
const PUROS = M.puros.map((f) => D('src', f));
juzgar(!buscar(PUROS, /document\.|window\.|localStorage|navigator\./).length,
  'cero DOM en el nucleo, los generadores y el motor', 'el motor toca el DOM',
  buscar(PUROS, /document\.|window\.|localStorage|navigator\./).join('\n'));
juzgar(!buscar(PUROS, /Math\.random/).length,
  'cero Math.random: todo aleatorio pasa por el rng inyectado',
  'Math.random en el motor: la semilla reproducible seria falsa',
  buscar(PUROS, /Math\.random/).join('\n'));

const TODO_JS = listar(D('src/js'), '.js').concat(listar(D('src/datos'), '.js'));
juzgar(!buscar(TODO_JS, /toISOString/).length,
  'cero toISOString en todo el proyecto',
  'toISOString presente: daria el dia anterior despues de las 22:00',
  buscar(TODO_JS, /toISOString/).join('\n'));

const otros = TODO_JS.filter((f) => !f.includes('01-almacen'));
juzgar(!buscar(otros, /['"]cubomatica\./).length,
  'los literales de clave solo existen en 01-almacen.js',
  'literales de clave fuera de 01-almacen.js',
  buscar(otros, /['"]cubomatica\./).join('\n'));

/* ══ 3. REGLAS DURAS DE ESTILO ════════════════════════════════════════════ */
titulo('3. Estilo de mundo de cubos');
if (!HAY_DIST) {
  salto('saltado: no hay dist/css/cubomatica.css (ejecuta `npm run build`)');
} else {
  /* EL SUJETO ES EL COMPILADO Y EXPANDIDO, nunca el minificado. Con SCSS, un
     mixin puede generar una sombra que ningún .scss escribe literalmente; y el
     minificado es UNA sola línea, así que un filtro por línea sobre él o
     descarta el fichero entero o lo conserva entero: deja de significar nada,
     EN VERDE. Es la misma familia que «grep -c cuenta líneas». */
  const css = sinComentariosCSS(leer(CSS_COMPILADO));

  const radios = ESTILO.radios(css);
  juzgar(!radios.length, 'ni una esquina redondeada',
    'hay border-radius distinto de 0', radios.join('\n'));

  const difusas = ESTILO.difusas(css);
  juzgar(!difusas.length, 'ninguna sombra con desenfoque', 'hay sombras con desenfoque',
    difusas.join('\n'));

  const suaves = ESTILO.suaves(css);
  juzgar(!suaves.length, 'ningún movimiento suave: transiciones y animaciones con steps()',
    'hay movimiento sin steps()', suaves.join('\n'));

  /* Las MISMAS reglas sobre la fuente y EN POSITIVO. Los tres greps de arriba
     miran el resultado y dicen «no hay ninguna»; estos miran la fuente y dicen
     «no se PUEDE escribir». `paso()` y `bisel()` no tienen parámetro donde meter
     un easing ni un desenfoque. */
  /* Cada exclusión se nombra por su motivo, y NO se hereda. Antes había una
     sola lista —«todo menos _herramientas»— excluida porque el mixin `paso()`
     es quien tiene derecho a escribir `transition:`; y esa misma lista se
     reutilizaba para los colores, así que los 39 hex del mapa de materiales de
     _herramientas.scss quedaban sin mirar POR ACCIDENTE, mientras el verde
     seguía diciendo «todos con nombre en _01-variables.scss». Verde y falso. */
  const SCSS = listar(D('src/scss'), '.scss');
  const salvo = (lista, ...nombres) => lista.filter((f) => !nombres.some((n) => f.includes(n)));

  /* SOLO `transition:`, no `animation:`. La puerta única existe para las
     transiciones —`paso()` no tiene parámetro donde meter un easing, así que a
     través de él es imposible escribir una suave—, pero las animaciones se
     declaran también a mano con su propio `steps()` y son correctas. Extender
     este grep a `animation:` pone en rojo código bueno, y una regla que grita en
     falso acaba desactivada, llevándose por delante la que sí valía.
     A las animaciones las cubre, mejor, el detector EN POSITIVO de arriba, que
     mira el CSS compilado y exige steps() en todas. */
  const aMano = buscar(salvo(SCSS, '_herramientas'), /transition:/, sinComentariosCSS);
  juzgar(!aMano.length, 'ninguna transición escrita a mano: todas pasan por @include paso()',
    'hay transiciones fuera del mixin', aMano.join('\n'));

  /* Dos ficheros DECLARAN color y por eso pueden escribir hex: _01-variables
     (la paleta) y _herramientas (el mapa de materiales, que genera los --deco-*
     con un @each). Los otros diez lo consumen por nombre. */
  const sueltos = buscar(salvo(SCSS, '_01-variables', '_herramientas'),
    /#[0-9A-Fa-f]{3,8}\b/, sinComentariosCSS);
  juzgar(!sueltos.length,
    'cero colores sueltos: solo los declaran _01-variables.scss y _herramientas.scss',
    'hay colores escritos a mano fuera de los dos ficheros que declaran la paleta',
    sueltos.join('\n'));

  /* El suelo táctil de 64px. El riesgo no es incumplirlo hoy: es que un punto de
     ruptura futuro baje sin que nadie redimensione el navegador a diez tamaños
     antes de entregar. */
  const lados = [...css.matchAll(/--lado-(?:deseado|techo): *(\d+)px/g)].map((m) => +m[1]);
  const minLado = lados.length ? Math.min(...lados) : null;
  juzgar(minLado !== null && minLado >= 64,
    'ninguna regla baja el boton de ' + minLado + ' px (suelo tactil: 64)',
    'hay una regla que baja el boton a ' + minLado + ' px, por debajo del suelo de 64');

  /* A zoom 400 % sobre 1280px el viewport CSS es EXACTAMENTE 320px (WCAG
     1.4.10). El aviso de girar se disparaba en 319: un píxel de margen.

     SE MIRA SOLO LA REGLA DEL AVISO, no todos los max-width del proyecto. La
     versión anterior tomaba el máximo de TODAS las consultas max-width y exigía
     que fuese ≤ 300. Hoy pasa porque solo hay una, pero el primer
     `@media (max-width: 767px)` legítimo —lo más normal del mundo en una hoja
     responsiva— habría tumbado la construcción con un mensaje sobre el aviso de
     girar que no tiene nada que ver. Un rojo que miente sobre su causa se
     desactiva, y con él se va la comprobación de verdad. */
  const reglasAviso = [...css.matchAll(/@media[^{]*max-width: *(\d+)px[^{]*\{([\s\S]*?)\n\}/g)]
    .filter((m) => /\.aviso-gira\b/.test(m[2]));
  const anchosAviso = reglasAviso.map((m) => +m[1]);
  const maxAviso = anchosAviso.length ? Math.max(...anchosAviso) : null;
  juzgar(maxAviso !== null && maxAviso <= 300,
    'el aviso de girar salta a ' + maxAviso + 'px y no invade el viewport de 320px del zoom al 400%',
    maxAviso === null
      ? 'no se encuentra la regla del aviso de girar: o ha desaparecido o ha cambiado de nombre'
      : 'el aviso de girar salta a ' + maxAviso + 'px: a zoom 400% el viewport es 320 justos');
}

/* ══ 4. AUTONOMÍA: CERO ACTIVOS EXTERNOS ══════════════════════════════════ */
titulo('4. Autonomía: cero red, cero binarios salvo la música declarada');
const BINARIOS = /\.(png|jpe?g|gif|svg|webp|ico|woff2?|ttf|otf)$/i;
const binarios = [...recorrer(RAIZ, false)].filter((f) => BINARIOS.test(f)).map(corto);
juzgar(!binarios.length, 'cero ficheros de imagen y de fuente', 'hay imagenes o fuentes',
  binarios.join('\n'));

const PISTAS = ['calma', 'cantera', 'jefe', 'mundo-bosque', 'mundo-mina',
                'mundo-pradera', 'mundo-rio', 'tema-principal', 'victoria'];

/* dist/audio/ NO es una carpeta generada: los nueve MP3 estan VERSIONADOS en
   git, porque no se compilan desde nada —ya son el artefacto— y porque con
   dist/ en el repositorio, tenerlos ademas en audio/ duplicaria 42 MB en el
   arbol de trabajo de todo el que clone.
   Si no estan, el problema no es que falte construir: es que se ha borrado algo
   que si estaba. Decirlo asi evita tres rojos cripticos sobre pistas y creditos
   que no explican que hacer. */
const HAY_AUDIO = existsSync(D('dist/audio'));
if (!HAY_AUDIO) {
  rojo('falta dist/audio/, que NO es una carpeta generada',
    'los 9 MP3 estan versionados en git. Recuperalos con `git checkout -- dist/audio`.');
}

/* La lista cerrada es lo que hace que la música sea una EXCEPCIÓN y no un
   agujero. Los mp3 viven SOLO en dist/audio: no se compilan desde nada, y con
   dist/ versionada tenerlos además en audio/ duplicaría 42 MB en el árbol de
   trabajo de todo el que clone. */
const AUDIO = /\.(mp3|wav|ogg|m4a|flac)$/i;
const audioSuelto = [...recorrer(RAIZ, false)].filter(AUDIO.test.bind(AUDIO))
  .map(corto).filter((f) => !PISTAS.some((p) => f === 'dist/audio/' + p + '.mp3'));
juzgar(!audioSuelto.length, 'ningun fichero de audio fuera de la lista cerrada',
  'hay audio no declarado', audioSuelto.join('\n'));

const musica = leer(D('src/js/07-musica.js'));
const nClaves = (musica.match(/clave: '/g) || []).length;
if (HAY_AUDIO) {
  const faltanPistas = PISTAS.filter((p) => !existsSync(D('dist/audio', p + '.mp3')));
  juzgar(!faltanPistas.length, 'estan las 9 pistas de dist/audio/ declaradas en 07-musica.js',
    'faltan pistas', faltanPistas.join(', '));

  const enDistAudio = readdirSync(D('dist/audio'));
  juzgar(enDistAudio.length === 10, 'dist/audio contiene las 9 pistas y CREDITOS.txt, nada mas',
    'dist/audio tiene ' + enDistAudio.length + ' ficheros (deben ser 10)');

  const creditos = existsSync(D('dist/audio/CREDITOS.txt')) ? leer(D('dist/audio/CREDITOS.txt')) : '';
  const sinCredito = PISTAS.filter((p) => !musica.includes(p) || !creditos.includes(p));
  juzgar(!sinCredito.length && nClaves === 9,
    'las 9 pistas estan en la tabla, en los creditos de pantalla y en CREDITOS.txt',
    'credito incompleto: ' + sinCredito.join(', ') + ' (entradas clave: ' + nClaves + ')');
} else {
  /* Sin los mp3 no se puede comprobar el credito, y saltarlo es lo honesto: un
     rojo aqui diria «falta credito» cuando lo que falta es el fichero. */
  salto('creditos y lista cerrada de audio: no estan los mp3');
}

/* Cero red. Se filtran las citas legales y las referencias en comentarios: lo
   que se persigue es una PETICIÓN, no una URL escrita. */
const fuentes = TODO_JS.concat(listar(D('src/scss'), '.scss')).concat([D('src/index.html')]);
const red = buscar(fuentes, /https?:\/\//, sinComentariosJS)
  .filter((l) => !/boe\.es|localhost|w3\.org|claude/i.test(l))
  .filter((l) => /src=|url\(|fetch|XMLHttpRequest/.test(l));
juzgar(!red.length, 'ninguna petición de red en el código', 'hay referencias de red',
  red.join('\n'));

/* ══ 5. CONTRATO DE CARGA ═════════════════════════════════════════════════ */
titulo('5. Contrato de carga');
const enDisco = listar(D('src/js'), '.js').concat(listar(D('src/datos'), '.js'));
juzgar(enDisco.length === M.guiones.length,
  enDisco.length + ' guiones en disco, los mismos que declara el manifiesto',
  'hay ' + enDisco.length + ' guiones en disco y el manifiesto declara ' + M.guiones.length);

const html = leer(D('src/index.html'));
const enHtml = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
juzgar(enHtml.length === M.guiones.length,
  enHtml.length + ' <script src> en src/index.html',
  'src/index.html carga ' + enHtml.length + ' guiones y el manifiesto declara ' + M.guiones.length);

const nSec = (html.match(/<section id="p-/g) || []).length;
juzgar(nSec === 17, '17 <section> de pantalla', 'hay ' + nSec + ' secciones, deben ser 17');

const ausentes = enHtml.filter((f) => !existsSync(D('src', f)));
juzgar(!ausentes.length, 'todos los guiones referenciados existen',
  'faltan ficheros', ausentes.join(', '));

/* ══ 5c. LA CADENA DEL MANIFIESTO ═════════════════════════════════════════ */
titulo('5c. Manifiesto, bundle y entrega');
try {
  const salida = execFileSync(process.execPath, [D('herramientas/comprobar-dist.mjs')],
    { encoding: 'utf8' });
  process.stdout.write(salida);
} catch (e) {
  process.stdout.write(String(e.stdout || ''));
  FALLOS++;
}

/* ══ 5b. VERSIÓN: UNA FUENTE, CINCO RÉPLICAS ══════════════════════════════ */
titulo('5b. Versión');
const VER = (leer(D('src/js/00-nucleo.js')).match(/CB\.VERSION *= *'(\d+\.\d+\.\d+)'/) || [])[1];
if (!VER) {
  rojo('src/js/00-nucleo.js no declara CB.VERSION con formato x.y.z');
} else {
  verde('CB.VERSION = ' + VER + ' (fuente unica)');
  /* Un número repetido a mano en cinco sitios está mal en cuatro en cuanto
     alguien se despista una vez. Por eso se comprueban los cinco. */
  const replicas = [
    ['README.md', new RegExp('Versión ' + VER.replace(/\./g, '\\.'))],
    ['CHANGELOG.md', new RegExp('^## \\[' + VER.replace(/\./g, '\\.') + '\\]', 'm')],
    ['LEEME.txt', new RegExp('Version ' + VER.replace(/\./g, '\\.'))],
    ['package.json', new RegExp('"version": *"' + VER.replace(/\./g, '\\.') + '"')],
  ];
  for (const [f, re] of replicas) {
    juzgar(existsSync(D(f)) && re.test(leer(D(f))), f + ' declara la misma version',
      f + ' no declara la version ' + VER);
  }
  if (existsSync(D('dist/sw.js'))) {
    juzgar(leer(D('dist/sw.js')).includes("'" + VER + "'"),
      'dist/sw.js lleva la misma version (la inyecta gulp: no puede desviarse)',
      'dist/sw.js no lleva la version ' + VER + ' — ejecuta `npm run build`');
  } else {
    salto('dist/sw.js no existe todavia');
  }
}

/* ══ 6. DOCUMENTACIÓN INTERNA ═════════════════════════════════════════════ */
titulo('6. Documentación interna');
const sinCabecera = listar(D('docs'), '.md')
  .filter((f) => !leer(f).split('\n').slice(0, 3).join('\n').includes('No se distribuye con el juego'))
  .map(corto);
juzgar(!sinCabecera.length, 'todo docs/*.md lleva la cabecera de no distribución',
  'sin la cabecera de no distribución', sinCabecera.join('\n'));

/* ══ 7. PESO ══════════════════════════════════════════════════════════════ */
titulo('7. Peso');
/* TRES presupuestos, no uno. El de ARRANQUE lo mide comprobar-dist.mjs porque
   hay que sumar exactamente lo que dist/index.html referencia: dentro de dist/
   conviven el bundle minificado que se sirve y el legible que solo usan la
   auditoría y la suite, y pesar la carpeta daría más del doble de lo que nadie
   descarga. */
let bytesFuente = 0;
for (const f of recorrer(RAIZ)) {
  const c = corto(f);
  if (c.startsWith('src/') || c.startsWith('pruebas/') || c.startsWith('herramientas/') ||
      /^(README\.md|manifiesto\.json|gulpfile\.js|package\.json|servir\.|[^/]*\.txt)/.test(c)) {
    bytesFuente += statSync(f).size;
  }
}
const kbFuente = Math.round(bytesFuente / 1024);
juzgar(kbFuente < 1100, 'las fuentes ocupan ' + kbFuente + ' KB (presupuesto: < 1100 KB)',
  'las fuentes ocupan ' + kbFuente + ' KB, por encima del presupuesto de 1100 KB');

const bytesMusica = PISTAS.reduce((n, p) => {
  const f = D('dist/audio', p + '.mp3');
  return n + (existsSync(f) ? statSync(f).size : 0);
}, 0);
const mbMusica = Math.round(bytesMusica / 1024 / 1024);
juzgar(mbMusica < 60, 'la musica ocupa ' + mbMusica + ' MB (presupuesto: < 60 MB)',
  'la musica ocupa ' + mbMusica + ' MB, por encima del presupuesto de 60 MB');

/* Quien vaya a repartir el juego en un colegio necesita saber ANTES que no cabe
   en un correo. Ojo con `grep -i MB`: casa con «nombre» y con «cambia», y la
   primera versión de esta comprobación pasaba en verde con un README mudo. */
juzgar(/[0-9]+ MB/.test(leer(D('README.md'))), 'README.md avisa del peso de la carpeta',
  'README.md no dice cuanto ocupa el juego con la musica');

/* ══ 8. CRUCE DE CLASES ═══════════════════════════════════════════════════ */
titulo('8. Cruce de clases (CSS ↔ HTML ↔ JS)');
try {
  const salida = execFileSync(process.execPath,
    [D('herramientas/cruzar-clases.mjs'), '--estricto'], { encoding: 'utf8' });
  verde(salida.split('\n')[1].trim());
  verde('cero clases muertas, cero fantasma, cero getElementById huerfano, cero selectores por id');
} catch (e) {
  rojo('el cruce de clases ha encontrado desajustes', String(e.stdout || ''));
}

/* ══ AUTOPRUEBA ═══════════════════════════════════════════════════════════
   Una auditoría que no se prueba a sí misma puede llevar meses en verde por
   estar rota, y nadie se entera porque el verde es justo lo que se espera. Se
   introduce una violación real en un fichero temporal y se comprueba que el
   grep correspondiente la ve. */
if (process.argv.includes('--autoprueba')) {
  titulo('AUTOPRUEBA: ¿ve la auditoría lo que dice que ve?');
  const tmp = D('src/js/zz-autoprueba-temporal.js');
  const casos = [
    ['Math.random en un fichero puro', 'var x = Math.random();', /Math\.random/],
    ['una clave de almacenamiento fuera de 01-almacen', "var k = 'cubomatica.perfil';", /['"]cubomatica\./],
    ['un toISOString', 'var d = new Date().toISOString();', /toISOString/],
  ];
  for (const [nombre, codigo, re] of casos) {
    writeFileSync(tmp, '/* temporal */\n' + codigo + '\n');
    const visto = buscar([tmp], re).length > 0;
    rmSync(tmp, { force: true });
    juzgar(visto, 'detecta ' + nombre, 'NO detecta ' + nombre + ': el grep esta roto');
  }
  /* Y el caso inverso, que es el que de verdad falla: la MISMA violación dentro
     de un comentario NO debe contar. Sin el despiece de comentarios, la
     auditoría se pone roja contra código correcto (E5). */
  writeFileSync(tmp, '/* aqui se explica que Math.random esta prohibido */\nvar x = 1;\n');
  const falsoPositivo = buscar([tmp], /Math\.random/).length > 0;
  rmSync(tmp, { force: true });
  juzgar(!falsoPositivo, 'y NO se dispara con la prohibición escrita en un comentario',
    'se dispara contra un comentario: volvería el fallo E5');

  /* ── Las tres reglas duras de estilo ─────────────────────────────────────
     ESTA ES LA PARTE QUE FALTABA, y no es un detalle: la autoprueba cubría los
     tres greps del bloque 2 y ninguno del bloque 3, y los cuatro agujeros que
     esta auditoría ha tenido durante toda la migración estaban todos en el
     bloque 3. Una autoprueba que no llega hasta la comprobación rota da la
     misma tranquilidad que no tenerla, y además la firma.

     No hace falta escribir en disco: los detectores toman una cadena de CSS. */
  const inventadas = [
    ['border-radius: 4px',        '.x{border-radius:4px}',                 'radios'],
    ['border-radius: 0.5rem',     '.x{border-radius:0.5rem}',              'radios'],
    ['border-radius: 50%',        '.x{border-radius:50%}',                 'radios'],
    ['sombra difusa con 0 0 4px', '.x{box-shadow:0 0 4px #000}',           'difusas'],
    ['sombra difusa inset',       '.x{box-shadow:inset 0 0 8px #000}',     'difusas'],
    ['transición con ease',       '.x{transition:opacity 90ms ease}',      'suaves'],
    ['transición sin función',    '.x{transition:opacity 90ms}',           'suaves'],
    ['animación con easing',      '.x{animation:late 1s ease-in infinite}', 'suaves'],
  ];
  for (const [nombre, css, cual] of inventadas) {
    juzgar(ESTILO[cual](css).length > 0, 'detecta ' + nombre,
      'NO detecta ' + nombre + ': la regla dura no protege nada');
  }

  /* Y el inverso otra vez, porque lo que de verdad rompe una regla dura no es
     que deje pasar: es que se dispare contra lo correcto y alguien la apague. */
  const legitimas = [
    ['border-radius: 0',      '.x{border-radius:0}',                       'radios'],
    ['sombra sin desenfoque', '.x{box-shadow:inset 0 -4px 0 #000}',        'difusas'],
    ['transición con steps',  '.x{transition:opacity 90ms steps(2)}',      'suaves'],
    ['animation: none',       '.x{animation:none}',                        'suaves'],
  ];
  for (const [nombre, css, cual] of legitimas) {
    juzgar(ESTILO[cual](css).length === 0, 'y NO se dispara con ' + nombre,
      'se dispara contra ' + nombre + ', que es correcto: la regla grita en falso');
  }
}

/* ══ RESULTADO ════════════════════════════════════════════════════════════ */
console.log('');
if (FALLOS === 0) {
  console.log('\x1b[32m════ AUDITORÍA EN VERDE: el proyecto se puede entregar ════\x1b[0m\n');
  process.exit(0);
}
console.log('\x1b[31m════ AUDITORÍA EN ROJO: ' + FALLOS + ' comprobaciones fallidas ════\x1b[0m\n');
process.exit(1);
