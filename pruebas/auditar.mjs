#!/usr/bin/env node
/* auditar.mjs — LA AUDITORÍA QUE BLOQUEA LA ENTREGA */

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

/* Recorrido de ficheros, con poda */
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
const listarRecursivo = (dir, ext) =>
  existsSync(dir) ? [...recorrer(dir)].filter((f) => f.endsWith(ext)).sort() : [];

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

/* Las tres reglas duras de estilo, como funciones */
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

  /* El grep de arriba solo mira las formas ABREVIADAS, `animation:` y `transition:`. */
  suavesLargas: (css) => [...css.matchAll(/animation-timing-function:\s*([^;}]+)/g)]
    .map((m) => m[1].trim())
    .filter((v) => !/steps\(/.test(v) && !/^(inherit|initial|unset)\b/.test(v)),

  /* Es lo que les pasó a las cinco que se retiraron en 1.7.0 —bloque-estalla, bloque-agrieta, veta-sube, brillo-cofre, bloque-raro—, diseñadas y nunca conectadas, y que estuvieron ahí versión tras versión sin que nada avisara. */
  fotogramasHuerfanos: (css) => {
    const declarados = [...css.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)].map((m) => m[1]);
    const sinKeyframes = css.replace(/@keyframes\s+[A-Za-z0-9_-]+\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, '');
    return declarados.filter((n) => {
      const usos = new RegExp('(?:animation|animation-name):[^;}]*\\b' + n + '\\b');
      return !usos.test(sinKeyframes);
    });
  },
};

const M = JSON.parse(leer(D('manifiesto.json')));
const CSS_COMPILADO = D('dist', 'css', 'cubomatica.css');
const HAY_DIST = existsSync(CSS_COMPILADO);

console.log('\nCubomática — auditoría de entrega');
console.log('=================================');

/* 1. LISTA NEGRA DE MARCA */
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

/* 2. FRONTERA DE ARQUITECTURA */
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

/* 3. REGLAS DURAS DE ESTILO */
titulo('3. Estilo de mundo de cubos');
if (!HAY_DIST) {
  salto('saltado: no hay dist/css/cubomatica.css (ejecuta `npm run build`)');
} else {
  /* EL SUJETO ES EL COMPILADO Y EXPANDIDO, nunca el minificado. */
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

  const suavesLargas = ESTILO.suavesLargas(css);
  juzgar(!suavesLargas.length,
    'tampoco en forma larga: animation-timing-function siempre con steps()',
    'hay animation-timing-function sin steps()', suavesLargas.join('\n'));

  const huerfanos = ESTILO.fotogramasHuerfanos(css);
  juzgar(!huerfanos.length, 'toda animación declarada la dispara alguna regla',
    'hay @keyframes que no usa nadie', huerfanos.join(', '));


  const SCSS = listarRecursivo(D('src/scss'), '.scss');
  const salvo = (lista, ...nombres) => lista.filter((f) => !nombres.some((n) => f.includes(n)));

  /* SOLO `transition:`, no `animation:`. */
  const aMano = buscar(salvo(SCSS, '_mixins'), /transition:/, sinComentariosCSS);
  juzgar(!aMano.length, 'ninguna transición escrita a mano: todas pasan por @include m.paso()',
    'hay transiciones fuera del mixin', aMano.join('\n'));

  /* Un solo fichero DECLARA color y por eso puede escribir hex: _variables.
     Los demás parciales consumen la paleta por nombre. */
  const sueltos = buscar(salvo(SCSS, '_variables'),
    /#[0-9A-Fa-f]{3,8}\b/, sinComentariosCSS);
  juzgar(!sueltos.length,
    'cero colores sueltos: solo los declara _variables.scss',
    'hay colores escritos a mano fuera del fichero de variables',
    sueltos.join('\n'));

  /* El suelo táctil de 64px. El riesgo no es incumplirlo hoy: es que un punto de
     ruptura futuro baje sin que nadie redimensione el navegador a diez tamaños
     antes de entregar. */
  const lados = [...css.matchAll(/--lado-(?:deseado|techo): *(\d+)px/g)].map((m) => +m[1]);
  const minLado = lados.length ? Math.min(...lados) : null;
  juzgar(minLado !== null && minLado >= 64,
    'ninguna regla baja el boton de ' + minLado + ' px (suelo tactil: 64)',
    'hay una regla que baja el boton a ' + minLado + ' px, por debajo del suelo de 64');

  /* SE MIRA SOLO LA REGLA DEL AVISO, no todos los max-width del proyecto. */
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

/* 4. AUTONOMÍA: CERO ACTIVOS EXTERNOS */
titulo('4. Autonomía: cero red, cero binarios salvo la musica y el dinero declarados');

/* LA SEGUNDA LISTA CERRADA: LAS DOCE PIEZAS DE DINERO */
const PIEZAS = ['c1', 'c5', 'c10', 'c20', 'c50', '1', '2', '5', '10', '20', '50', '100'];
const RUTAS_PIEZAS = PIEZAS.map((p) => 'dist/img/pieza-' + p + '.webp');

const BINARIOS = /\.(png|jpe?g|gif|svg|webp|ico|woff2?|ttf|otf)$/i;
const binarios = [...recorrer(RAIZ, false)].filter((f) => BINARIOS.test(f)).map(corto)
  .filter((f) => !RUTAS_PIEZAS.includes(f));
juzgar(!binarios.length, 'cero imagenes y fuentes fuera de las 12 piezas de dinero',
  'hay imagenes o fuentes no declaradas', binarios.join('\n'));

const faltanPiezas = RUTAS_PIEZAS.filter((f) => !existsSync(D(f)));
juzgar(!faltanPiezas.length,
  'estan las 12 piezas de dinero de dist/img/',
  'faltan piezas de dinero — NO se generan al construir, estan versionadas en git '
  + '(recuperalas con `git checkout -- dist/img`, y ver docs/dinero.md)',
  faltanPiezas.join('\n'));

/* Que esten no basta: que las USE el CSS. Se lee la hoja compilada y no el SCSS
   porque lo que se entrega es la hoja, y porque una variable declarada y jamas
   consumida seria verde aqui y negra en pantalla. */
if (existsSync(D('dist/css/cubomatica.css'))) {
  const hoja = leer(D('dist/css/cubomatica.css'));
  const sinDeclarar = PIEZAS.filter((p) => !hoja.includes('img/pieza-' + p + '.webp')
                                        || !hoja.includes('var(--pieza-' + p + ')'));
  juzgar(!sinDeclarar.length,
    'las 12 piezas estan declaradas Y consumidas en el CSS compilado',
    'hay piezas que el CSS no declara o no usa', sinDeclarar.join(', '));
} else {
  salto('las piezas contra el CSS: falta dist/css/cubomatica.css');
}

const PISTAS = ['calma', 'cantera', 'jefe', 'mundo-bosque', 'mundo-mina',
                'mundo-pradera', 'mundo-rio', 'tema-principal', 'victoria'];

const HAY_AUDIO = existsSync(D('dist/audio'));
if (!HAY_AUDIO) {
  rojo('falta dist/audio/, que NO es una carpeta generada',
    'los 9 MP3 estan versionados en git. Recuperalos con `git checkout -- dist/audio`.');
}

/* Los mp3 viven SOLO en dist/audio: no se compilan desde nada, y con dist/ versionada tenerlos además en audio/ duplicaría 42 MB en el árbol de trabajo de todo el que clone. */
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
const fuentes = TODO_JS.concat(listarRecursivo(D('src/scss'), '.scss')).concat([D('src/index.html')]);
const red = buscar(fuentes, /https?:\/\//, sinComentariosJS)
  .filter((l) => !/boe\.es|localhost|w3\.org|claude/i.test(l))
  .filter((l) => /src=|url\(|fetch|XMLHttpRequest/.test(l));
juzgar(!red.length, 'ninguna petición de red en el código', 'hay referencias de red',
  red.join('\n'));

/* 5. CONTRATO DE CARGA */
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
juzgar(nSec === 18, '18 <section> de pantalla', 'hay ' + nSec + ' secciones, deben ser 18');

/* E101 · La AYUDA se comprueba aqui, no en el navegador */
const secAyuda = (html.match(/<section id="p-ayuda"[\s\S]*?<\/section>/) || [])[0] || '';
juzgar(!!secAyuda && /<h1>/.test(secAyuda) && /data-salir/.test(secAyuda),
  'E101 · la pantalla de ayuda existe, con su <h1> y su salida',
  'falta la seccion p-ayuda, su encabezado o su boton de salir');
juzgar((html.match(/data-ir="p-ayuda"/g) || []).length >= 1,
  'E101 · se puede llegar a la ayuda desde algun boton',
  'ningun boton lleva a p-ayuda: la pantalla seria inalcanzable');
const mundosCat = [...leer(D('src/js/17-catalogo.js'))
  .matchAll(/\{ id: 'M\d+', nombre: '([^']+)'/g)].map((m) => m[1]);
const sinNombrar = mundosCat.filter((n) => !secAyuda.includes(n));
juzgar(mundosCat.length === 4 && !sinNombrar.length,
  'E101 · la ayuda nombra los cuatro mundos tal y como los declara el catalogo',
  'la ayuda no nombra: ' + sinNombrar.join(', '));

/* E124 · La ayuda nombra los TRES modos, igual que nombra los cuatro mundos.
   Misma razon: renombrar un modo y dejar el nombre viejo en la ayuda no lanza
   ningun error, solo deja a un nino leyendo instrucciones de un juego que ya no
   existe. Se leen los rotulos de la tabla, no una lista escrita aqui. */
const modosTabla = [...leer(D('src/js/2B-modos.js'))
  .matchAll(/etiqueta: '([^']+)', segundos: (\d+)/g)].map((m) => [m[1], Number(m[2])]);
const modosSinNombrar = modosTabla.filter(([n]) => !secAyuda.includes(n));
juzgar(modosTabla.length === 3 && !modosSinNombrar.length,
  'E124 · la ayuda nombra los tres modos tal y como los declara CB.modos.TABLA',
  'la ayuda no nombra: ' + modosSinNombrar.map(([n]) => n).join(', '));

/* Y los minutos que promete: el texto dice «2 minutos» y «30 segundos», y esos
   dos numeros salen de la misma tabla. Un cambio de reloj sin tocar la ayuda
   deja al nino con una promesa falsa. */
const seg = Object.fromEntries(modosTabla);
juzgar(secAyuda.includes(String(seg.Experto) + ' segundos') &&
       secAyuda.includes(String(seg.Normal / 60) + ' minuto'),
  'E124 · y los tiempos que promete la ayuda son los de la tabla',
  'la ayuda promete un reloj distinto del que da CB.modos.TABLA');

/* El literal de segundos vuelve a la maqueta del HUD: solo era cierto en uno de
   los tres modos, y en los otros dos parpadeaba un numero falso al arrancar. */
juzgar(/<span id="hud-segundos" class="reloj__cifra"><\/span>/.test(html),
  'E124 · el HUD no trae un numero de segundos escrito a mano',
  '#hud-segundos vuelve a nacer con un literal que solo vale para un modo');

/* E125 · Normal empieza en 120: TRES digitos donde la caja media dos. A 320 px
   eso no lanza ningun error, se recorta contra el borde y no lo ve nadie. */
const cssComp = leer(D('src/scss/components/_componentes.scss'));
const anchoCifra = (cssComp.match(/\.reloj__cifra\s*\{[\s\S]*?min-width:\s*([\d.]+)ch/) || [])[1];
const digitos = Math.max(...modosTabla.map(([, s2]) => String(s2).length));
juzgar(!!anchoCifra && Number(anchoCifra) >= digitos + 0.2,
  'E125 · la cifra del reloj cabe con ' + digitos + ' digitos (min-width: ' + anchoCifra + 'ch)',
  'min-width de .reloj__cifra es ' + anchoCifra + 'ch y el reloj mas largo tiene ' +
  digitos + ' digitos: se recorta sin avisar');

/* E110-E111 · Los atributos que viven en la maqueta se protegen aquí; la suite
   del navegador cubre después el nombre y el estado que genera JavaScript. */
const campoAdulto = (html.match(/<input id="adulto-respuesta"[\s\S]*?>/) || [])[0] || '';
juzgar(!!campoAdulto && !/inputmode="numeric"/.test(campoAdulto) &&
       /aria-describedby="adulto-pregunta"/.test(campoAdulto) &&
       /aria-errormessage="adulto-error"/.test(campoAdulto) &&
       /aria-invalid="false"/.test(campoAdulto),
  'E110 · la puerta parental acepta texto y relaciona su ayuda y error',
  'el campo parental vuelve a pedir teclado numerico o pierde su semantica de error');
juzgar(/id="adulto-error"[^>]*role="alert"/.test(html),
  'E110 · el error parental es una alerta',
  'adulto-error no lleva role="alert"');
juzgar(/class="animo" role="group"[^>]*aria-labelledby="fin-animo-titulo"/.test(html) &&
       (html.match(/class="animo__cara"[^>]*aria-pressed="false"/g) || []).length === 3,
  'E110 · el estado de animo nace como grupo con tres estados explicitos',
  'el grupo de animo o sus aria-pressed iniciales estan incompletos');

const cssBase = leer(D('src/scss/base/_base.scss'));
juzgar(!/:focus\s*\{\s*outline:\s*none/.test(cssBase) &&
       /@supports selector\(:focus-visible\)/.test(cssBase),
  'E110 · el foco conserva respaldo visible antes de :focus-visible',
  'se ha vuelto a borrar globalmente el foco o falta el respaldo compatible');

const paginasSuite = ['pruebas/pruebas.html', 'pruebas/pruebas-min.html'].map((f) => leer(D(f)));
juzgar(paginasSuite.every((p) => /id="resumen" role="status"/.test(p) &&
       /class="barra-carga" role="progressbar"/.test(p) && /aria-valuenow="0"/.test(p)),
  'E111 · las dos suites anuncian el resultado y exponen el progreso',
  'falta role=status o progressbar en una pagina de suite');
const htmlDobleClic = leer(D('pruebas/comprobar-doble-clic.html'));
juzgar(/<script src="\.\.\/dist\/js\/cubomatica\.min\.js"><\/script>/.test(htmlDobleClic) &&
       /id="veredicto" role="status"/.test(htmlDobleClic) &&
       /id="sc-resultado" role="status"/.test(htmlDobleClic),
  'E111 · la comprobacion de doble clic carga el bundle y anuncia sus resultados',
  'comprobar-doble-clic.html no carga CB.offline o no expone sus estados');

const ausentes = enHtml.filter((f) => !existsSync(D('src', f)));
juzgar(!ausentes.length, 'todos los guiones referenciados existen',
  'faltan ficheros', ausentes.join(', '));

/* 5c. LA CADENA DEL MANIFIESTO */
titulo('5c. Manifiesto, bundle y entrega');
try {
  const salida = execFileSync(process.execPath, [D('herramientas/comprobar-dist.mjs')],
    { encoding: 'utf8' });
  process.stdout.write(salida);
} catch (e) {
  process.stdout.write(String(e.stdout || ''));
  FALLOS++;
}

/* 5b. VERSIÓN: UNA FUENTE, CINCO RÉPLICAS */
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

/* 6. DOCUMENTACIÓN INTERNA */
titulo('6. Documentación interna');
const sinCabecera = listar(D('docs'), '.md')
  .filter((f) => !leer(f).split('\n').slice(0, 3).join('\n').includes('No se distribuye con el juego'))
  .map(corto);
juzgar(!sinCabecera.length, 'todo docs/*.md lleva la cabecera de no distribución',
  'sin la cabecera de no distribución', sinCabecera.join('\n'));

/* 7. PESO */
titulo('7. Peso');
/* El de ARRANQUE lo mide comprobar-dist.mjs porque hay que sumar exactamente lo que dist/index.html referencia: dentro de dist/ conviven el bundle minificado que se sirve y el legible que solo usan la auditoría y la suite, y pesar la… */
/* Había uno solo de 1 100 KB para todo lo que no es dist/, y en 1.10.0 se pasó por 1 KB — enteramente por el crecimiento de pruebas/: casos-regresiones.js había pasado de 1 358 a 2 473 líneas en cinco rondas de guardianes nuevos. */
/* Contarlo con las fuentes solo se sostenía mientras fuera pequeño; en cuanto crece, el rojo dice «el juego ha engordado» cuando lo que ha pasado es que se ha comprobado más, que es lo contrario de un problema. */
let bytesCompilado = 0, bytesPruebas = 0, bytesHerramientas = 0;
for (const f of recorrer(RAIZ)) {
  const c = corto(f);
  if (c.startsWith('pruebas/')) { bytesPruebas += statSync(f).size; continue; }
  if (c.startsWith('herramientas/')) { bytesHerramientas += statSync(f).size; continue; }
  if (c.startsWith('src/') ||
      /^(README\.md|manifiesto\.json|gulpfile\.js|package\.json|servir\.|[^/]*\.txt)/.test(c)) {
    bytesCompilado += statSync(f).size;
  }
}
const kbFuente = Math.round(bytesCompilado / 1024);
const kbPruebas = Math.round(bytesPruebas / 1024);
const kbHerramientas = Math.round(bytesHerramientas / 1024);
juzgar(kbFuente < 900, 'las fuentes ocupan ' + kbFuente + ' KB (presupuesto: < 900 KB)',
  'las fuentes ocupan ' + kbFuente + ' KB, por encima del presupuesto de 900 KB');
juzgar(kbPruebas < 500, 'las pruebas ocupan ' + kbPruebas + ' KB (presupuesto: < 500 KB)',
  'las pruebas ocupan ' + kbPruebas + ' KB, por encima del presupuesto de 500 KB');
juzgar(kbHerramientas < 100, 'las herramientas ocupan ' + kbHerramientas + ' KB (presupuesto: < 100 KB)',
  'las herramientas ocupan ' + kbHerramientas + ' KB, por encima del presupuesto de 100 KB');

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

/* 8. CRUCE DE CLASES */
titulo('8. Cruce de clases (CSS ↔ HTML ↔ JS)');
try {
  const salida = execFileSync(process.execPath,
    [D('herramientas/cruzar-clases.mjs'), '--estricto'], { encoding: 'utf8' });
  verde(salida.split('\n')[1].trim());
  verde('cero clases muertas, cero fantasma, cero getElementById huerfano, cero selectores por id');
} catch (e) {
  rojo('el cruce de clases ha encontrado desajustes', String(e.stdout || ''));
}

/* 9. LA GRAMATICA DE LAS CLASES */
titulo('9. Gramatica de las clases (BEM)');
if (existsSync(D('node_modules', 'stylelint'))) {
  try {
    execFileSync(process.execPath, [D('node_modules/stylelint/bin/stylelint.mjs'),
      'src/scss/**/*.scss'], { cwd: RAIZ, encoding: 'utf8', stdio: 'pipe' });
    verde('E104 · stylelint: los nombres de clase cumplen la gramatica BEM');
  } catch (e) {
    rojo('E104 · stylelint ha encontrado nombres fuera de la gramatica',
      String(e.stdout || '') + String(e.stderr || ''));
  }
} else {
  salto('E104 · stylelint no esta instalado (npm install)');
}

/* E105 · CERO DESCENDENCIA ENTRE BLOQUES, que es la regla que ninguna herramienta generica sabe leer porque la lista blanca es del proyecto. */
if (!existsSync(CSS_COMPILADO)) {
  salto('E105 · descendencia entre bloques: no hay CSS compilado');
} else {
  const cssE105 = sinComentariosCSS(leer(CSS_COMPILADO));

  const bloqueDe = (compuesto) => {
    const limpio = compuesto.replace(/:not\([^)]*\)/g, '');
    const m = limpio.match(/\.([a-z][\w-]*)/);
    return m ? m[1].split('__')[0].split('--')[0] : null;
  };
  const ESTADOS = ['sin-movimiento', 'letra-grande', 'modo-proyeccion', 'alto-contraste'];
  const acoplados = [];
  for (const m of cssE105.matchAll(/([^{}]+)\{/g)) {
    const preludio = m[1].trim();
    if (preludio.startsWith('@')) continue;
    for (const parte of preludio.split(',')) {
      const compuestos = parte.trim().split(/\s+(?![^(]*\))/).filter((x) => x && x !== '>' && x !== '+' && x !== '~');
      let previo = null;
      for (const c of compuestos) {
        const b = bloqueDe(c);
        /* Los cuatro estados globales viven en :root y no son bloques de nada:
           que precedan a cualquier cosa es justo su trabajo. */
        if (previo && b && previo !== b && !ESTADOS.includes(previo)) {
          acoplados.push(parte.trim());
          break;
        }
        if (b) previo = b;
      }
    }
  }
  juzgar(!acoplados.length, 'E105 · ningun bloque se estila por quien lo contiene',
    'descendencia entre bloques', [...new Set(acoplados)].join('\n'));
}

/* AUTOPRUEBA */
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

  /* Las tres reglas duras de estilo */
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

/* RESULTADO */
console.log('');
if (FALLOS === 0) {
  console.log('\x1b[32m════ AUDITORÍA EN VERDE: el proyecto se puede entregar ════\x1b[0m\n');
  process.exit(0);
}
console.log('\x1b[31m════ AUDITORÍA EN ROJO: ' + FALLOS + ' comprobaciones fallidas ════\x1b[0m\n');
process.exit(1);
