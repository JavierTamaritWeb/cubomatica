#!/usr/bin/env node
/* ============================================================================
   cruzar-clases.mjs — el juez del renombrado BEM
   ----------------------------------------------------------------------------
   POR QUÉ EXISTE: una clase renombrada en el CSS y no en el JS no produce
   NINGÚN error. `CB.ui.crear('div', 'veta-icono')` sigue creando el div; sale
   sin estilo, la consola queda limpia y la suite sigue en verde. Con ~170
   clases repartidas entre CSS, HTML y JS, ese es el único modo de fallo real
   de la migración a BEM, y ningún test del proyecto lo ve hoy.

   POR QUÉ AQUÍ Y NO EN LA SUITE DEL NAVEGADOR: pruebas/pruebas.html monta
   maquetas reducidas de las 17 pantallas, no el index.html real. Contra esas
   maquetas, la mitad de las clases del juego parecerían no usarse. El cruce
   necesita leer los ficheros de verdad, así que es trabajo de la auditoría.

   CERO DEPENDENCIAS a propósito: solo node:fs y node:path, para que corra en un
   clon limpio sin `npm install`, igual que hace hoy auditar.sh.

   Uso:  node herramientas/cruzar-clases.mjs [--json] [--estricto]
         --estricto  sale con código 1 si hay hallazgos (modo auditoría)
   ========================================================================== */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_ = process.argv.includes('--json');
const ESTRICTO = process.argv.includes('--estricto');

/* ── Rutas. Se resuelven las dos disposiciones para que la herramienta
      sobreviva al `git mv` a src/ de la fase 2 sin tocarla. ─────────────── */
const D = (...p) => join(RAIZ, ...p);
const HAY_SRC = existsSync(D('src', 'index.html'));
const BASE = HAY_SRC ? D('src') : RAIZ;

/* EL UNIVERSO CSS SE LEE DEL COMPILADO, no de las fuentes.
   Con Sass, media docena de clases no existen literalmente en ningun .scss: son
   `.bioma--#{$bioma}`, `.cielo--#{$i}` y `.veta[data-estado="#{$estado}"]`,
   generadas por @each desde los mapas de _herramientas.scss. Leyendo la fuente
   desaparecian diez clases del universo y la direccion 2 las denunciaba a todas
   como inexistentes.
   Ademas es lo correcto: lo que hay que cruzar es lo que se SIRVE. */
const CSS_COMPILADO = D('dist', 'css', 'cubomatica.css');
const DIR_CSS = existsSync(join(BASE, 'scss')) ? join(BASE, 'scss') : join(BASE, 'css');
const DIR_JS     = join(BASE, 'js');
const DIR_DATOS  = join(BASE, 'datos');
const HTML_JUEGO = join(BASE, 'index.html');

const ficheros = (dir, ext) =>
  existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith(ext)).sort().map(f => join(dir, f)) : [];

const leer = f => readFileSync(f, 'utf8');
const corto = f => f.slice(RAIZ.length + 1);

/* ══════════════════════════════════════════════════════════════════════════
   1. Despiece de comentarios
   ══════════════════════════════════════════════════════════════════════════ */

/* Respeta cadenas y conserva los saltos de línea, para que los números de línea
   sigan siendo útiles al señalar un desajuste.
   Este mismo algoritmo está también en pruebas/auditar.mjs. Son dos copias de
   veinte líneas y se ha decidido dejarlas: unirlas obligaría a que la auditoría
   importara de herramientas/ o al revés, y las dos tienen como requisito duro
   correr sueltas en un clon sin `npm install`. La copia se paga una vez; el
   acoplamiento se paga siempre. */
function sinComentariosJS(texto) {
  let salida = '', i = 0, cadena = null, linea = false, bloque = false, escapado = false;
  while (i < texto.length) {
    const c = texto[i], sig = texto[i + 1] || '';
    if (linea) { if (c === '\n') { linea = false; salida += c; } i++; continue; }
    if (bloque) {
      if (c === '*' && sig === '/') { bloque = false; i += 2; continue; }
      salida += (c === '\n' ? '\n' : ' '); i++; continue;
    }
    if (cadena) {
      salida += c;
      if (escapado) escapado = false;
      else if (c === '\\') escapado = true;
      else if (c === cadena) cadena = null;
      i++; continue;
    }
    if (c === '"' || c === "'" || c === '`') { cadena = c; salida += c; i++; continue; }
    if (c === '/' && sig === '/') { linea = true; i += 2; continue; }
    if (c === '/' && sig === '*') { bloque = true; i += 2; continue; }
    salida += c; i++;
  }
  return salida;
}

const sinComentariosCSS = t => t.replace(/\/\*[\s\S]*?\*\//g, ' ');
const sinComentariosHTML = t => t.replace(/<!--[\s\S]*?-->/g, ' ');

/* ══════════════════════════════════════════════════════════════════════════
   2. Universo CSS — clases declaradas
   ══════════════════════════════════════════════════════════════════════════ */

/* Extrae los preludios de regla llevando la cuenta de la profundidad de llaves.
   Hace falta la máquina de estados y no basta un grep: dentro de @keyframes los
   preludios son «from», «to» y porcentajes, y dentro de @font-face, @page y
   @property no hay selectores en absoluto. Un grep de /\.[a-z-]+/ sobre el
   fichero entero recogería además trozos de declaraciones. */
function selectoresDe(css) {
  const sel = [];
  let buf = '', i = 0, cadena = null, escapado = false;
  const pila = [];
  while (i < css.length) {
    const c = css[i];
    if (cadena) {
      if (escapado) escapado = false;
      else if (c === '\\') escapado = true;
      else if (c === cadena) cadena = null;
      buf += c; i++; continue;
    }
    if (c === '"' || c === "'") { cadena = c; buf += c; i++; continue; }
    if (c === '{') {
      const prel = buf.trim(); buf = '';
      let tipo;
      if (prel.startsWith('@')) {
        const nombre = (prel.match(/^@([\w-]+)/) || [])[1] || '';
        tipo = ['media', 'supports', 'layer', 'container', 'scope'].includes(nombre)
          ? 'anidado' : 'hoja';
      } else {
        tipo = 'regla';
        if (!pila.includes('hoja') && prel) sel.push(prel);
      }
      pila.push(tipo); i++; continue;
    }
    if (c === '}') { pila.pop(); buf = ''; i++; continue; }
    if (c === ';') { buf = ''; i++; continue; }
    buf += c; i++;
  }
  return sel;
}

const RE_CLASE = /\.(-?[A-Za-z_][\w-]*)/g;

function universoCSS() {
  const donde = new Map();          // clase → Set de ficheros
  const selectoresConId = [];
  const fuentesCss = existsSync(CSS_COMPILADO)
    ? [CSS_COMPILADO]
    : ficheros(DIR_CSS, '.css').concat(ficheros(DIR_CSS, '.scss'));
  for (const f of fuentesCss) {
    const css = sinComentariosCSS(leer(f));
    for (const sel of selectoresDe(css)) {
      if (/(^|[\s,>+~])#[A-Za-z_]/.test(' ' + sel)) selectoresConId.push(corto(f) + ' → ' + sel);
      let m;
      RE_CLASE.lastIndex = 0;
      while ((m = RE_CLASE.exec(sel))) {
        if (!donde.has(m[1])) donde.set(m[1], new Set());
        donde.get(m[1]).add(corto(f));
      }
    }
  }
  return { donde, selectoresConId };
}

/* ══════════════════════════════════════════════════════════════════════════
   3. Universo HTML — clases e ids escritos en la maqueta
   ══════════════════════════════════════════════════════════════════════════ */

function universoHTML(ruta) {
  const clases = new Set(), ids = new Set();
  if (!existsSync(ruta)) return { clases, ids };
  const html = sinComentariosHTML(leer(ruta));
  for (const m of html.matchAll(/\sclass\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    (m[1] ?? m[2]).split(/\s+/).filter(Boolean).forEach(c => clases.add(c));
  }
  for (const m of html.matchAll(/\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    ids.add(m[1] ?? m[2]);
  }
  return { clases, ids };
}

/* ══════════════════════════════════════════════════════════════════════════
   4. Universo JS — dos extracciones, con precisión distinta a propósito
   ──────────────────────────────────────────────────────────────────────────
   Las dos direcciones del cruce quieren precisiones opuestas:

     · Dirección 1 (CSS → uso): pasarse recogiendo es SEGURO — a lo sumo una
       clase muerta pasa por viva. Quedarse corto produce falsas alarmas.
       Se usa la extracción PERMISIVA: todo literal de cadena.

     · Dirección 2 (uso → CSS): pasarse es PELIGROSO — una frase en español
       se denunciaría como clase inexistente, y el JS está lleno de cadenas que
       el niño lee en pantalla. Quedarse corto es seguro.
       Se usa la extracción ESTRICTA: solo los sitios donde una cadena ES una
       clase, que son exactamente los que tocará el codemod de la fase 5.
   ══════════════════════════════════════════════════════════════════════════ */

const CADENA = String.raw`'((?:[^'\\]|\\.)*)'`;
const ARG1   = String.raw`(?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|[^,()]*)`;

const PATRONES_ESTRICTOS = [
  // CB.ui.crear(etiqueta, 'clases', texto) y CB.ui.boton(texto, 'clases', fn)
  new RegExp(String.raw`CB\.ui\.(?:crear|boton)\s*\(\s*${ARG1}\s*,\s*${CADENA}`, 'g'),
  // el.className = 'a b'   /   el.className += ' c'
  new RegExp(String.raw`\.className\s*\+?=\s*${CADENA}`, 'g'),
  // setAttribute('class', 'a b')
  new RegExp(String.raw`setAttribute\s*\(\s*['"]class['"]\s*,\s*${CADENA}`, 'g'),
];
/* classList.X(...): NO todo argumento es una clase. `toggle('sin-movimiento',
   rm === 'si' || rm !== 'no')` lleva dos literales en la condición que no son
   clases de nada. Se parte por comas de primer nivel y se toma solo lo que la
   API declara como nombre de clase. */
const RE_CLASSLIST = /classList\.(add|remove|toggle|contains|replace)\s*\(([^)]*)\)/g;
const ARGS_CLASE = { add: 'todos', remove: 'todos', toggle: 1, contains: 1, replace: 2 };
// querySelector('.a .b') — de un selector solo interesan sus tokens de clase
const RE_SELECTOR = /(?:querySelector|querySelectorAll|closest|matches)\s*\(\s*'([^']*)'/g;
const RE_GET_BY_ID = /getElementById\s*\(\s*'([^']*)'/g;
/* Un id que el propio JS crea (`aviso.id = 'adulto-aviso-datos'`) no tiene por
   qué estar en la maqueta: existe desde que se pinta. */
const RE_ID_ASIGNADO = /\.id\s*=\s*'([^']*)'/g;
const RE_LITERAL = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g;
const FORMA_CLASE = /^-?[A-Za-z_][\w-]*$/;

/* Parte «'a', 'b', x === 'c'» por comas de primer nivel. */
function argumentos(texto) {
  const out = []; let buf = '', prof = 0, cadena = null, esc = false;
  for (const c of texto) {
    if (cadena) {
      buf += c;
      if (esc) esc = false; else if (c === '\\') esc = true; else if (c === cadena) cadena = null;
      continue;
    }
    if (c === '"' || c === "'") { cadena = c; buf += c; continue; }
    if (c === '(' || c === '[') prof++;
    if (c === ')' || c === ']') prof--;
    if (c === ',' && prof === 0) { out.push(buf.trim()); buf = ''; continue; }
    buf += c;
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}
const literalPuro = a => /^'(?:[^'\\]|\\.)*'$/.test(a) ? a.slice(1, -1) : null;

/* ── Excepciones declaradas ────────────────────────────────────────────────
   Clases que el JS aplica a propósito SIN que exista una regla CSS: son puntos
   de enganche para querySelector, no estilo. Cada una necesita su motivo, y la
   lista es cerrada: cualquier clase nueva sin estilo es un hallazgo. */
const GANCHOS_SIN_ESTILO = {
  'frase-enunciado': 'engancha CB.ui.resaltarLinea; el <p> se pinta con las reglas de p',
};

function universoJS() {
  const estricto = new Map();       // clase → Set de «fichero:línea»
  const permisivo = new Set();
  const prefijos = new Set();
  const idsPedidos = new Map();     // id → Set de «fichero:línea»
  const idsCreados = new Set();     // ids que el propio JS asigna en runtime

  const anotar = (mapa, clave, f, texto, indice) => {
    const linea = texto.slice(0, indice).split('\n').length;
    if (!mapa.has(clave)) mapa.set(clave, new Set());
    mapa.get(clave).add(corto(f) + ':' + linea);
  };

  for (const f of ficheros(DIR_JS, '.js').concat(ficheros(DIR_DATOS, '.js'))) {
    const src = sinComentariosJS(leer(f));

    const tomar = (bruto, indice) => {
      for (const tok of bruto.split(/\s+/).filter(Boolean)) {
        // Un literal que termina en «-», «--» o «__» es un PREFIJO: la clase
        // real la termina de construir el JS por concatenación.
        if (/(?:-|--|__)$/.test(tok) && !FORMA_CLASE.test(tok.replace(/[-_]+$/, '') + 'x')) continue;
        if (/[-_]$/.test(tok)) { prefijos.add(tok); continue; }
        if (FORMA_CLASE.test(tok)) anotar(estricto, tok, f, src, indice);
      }
    };

    for (const re of PATRONES_ESTRICTOS) {
      re.lastIndex = 0;
      for (const m of src.matchAll(re)) tomar(m[1], m.index);
    }
    for (const m of src.matchAll(RE_CLASSLIST)) {
      const cuantos = ARGS_CLASE[m[1]];
      const args = argumentos(m[2]);
      const mira = cuantos === 'todos' ? args : args.slice(0, cuantos);
      for (const a of mira) {
        const v = literalPuro(a);
        if (v !== null) tomar(v, m.index);
      }
    }
    for (const m of src.matchAll(RE_SELECTOR)) {
      RE_CLASE.lastIndex = 0;
      let c;
      while ((c = RE_CLASE.exec(m[1]))) anotar(estricto, c[1], f, src, m.index);
    }
    for (const m of src.matchAll(RE_GET_BY_ID)) {
      if (/-$/.test(m[1])) { prefijos.add(m[1]); continue; }   // getElementById('cri-' + x)
      anotar(idsPedidos, m[1], f, src, m.index);
    }
    for (const m of src.matchAll(RE_ID_ASIGNADO)) idsCreados.add(m[1]);

    // Permisivo: todo literal, partido en palabras. Solo alimenta la dirección 1.
    for (const m of src.matchAll(RE_LITERAL)) {
      const v = m[1] ?? m[2] ?? '';
      for (const tok of v.split(/[\s,>+~()]+/).filter(Boolean)) {
        const limpio = tok.replace(/^\./, '');
        if (/[-_]$/.test(limpio)) prefijos.add(limpio);
        else if (FORMA_CLASE.test(limpio)) permisivo.add(limpio);
      }
    }
  }
  return { estricto, permisivo, prefijos, idsPedidos, idsCreados };
}

/* ══════════════════════════════════════════════════════════════════════════
   5. El cruce
   ══════════════════════════════════════════════════════════════════════════ */

/* Sin el CSS compilado, las clases que generan los @each no existen en ninguna
   parte y las dos direcciones darian una lista larguisima de falsos positivos.
   Un fallo falso en una auditoria es peor que no comprobar: se desactiva. */
if (!existsSync(CSS_COMPILADO)) {
  console.log('CRUCE DE CLASES  ·  saltado: no hay ' + corto(CSS_COMPILADO) +
              '\n  Las clases de .bioma--, .cielo-- y .veta[data-estado] las genera Sass' +
              '\n  con @each, y sin compilar no existen en ningun fichero.' +
              '\n  Ejecuta `npm run build`.');
  process.exit(0);
}

const css = universoCSS();
const htmlJuego = universoHTML(HTML_JUEGO);
const htmlPruebas = universoHTML(D('pruebas', 'pruebas.html'));
const htmlDobleClic = universoHTML(D('pruebas', 'comprobar-doble-clic.html'));
const js = universoJS();

const cubiertaPorPrefijo = c => [...js.prefijos].some(p => c.startsWith(p) && c.length > p.length);

/* Dirección 1 — toda clase declarada en el CSS se usa en algún sitio. */
const huerfanas = [];
for (const [clase, hojas] of [...css.donde].sort()) {
  if (htmlJuego.clases.has(clase)) continue;
  if (js.estricto.has(clase) || js.permisivo.has(clase)) continue;
  if (cubiertaPorPrefijo(clase)) continue;
  huerfanas.push({
    clase,
    hojas: [...hojas].join(', '),
    soloPruebas: htmlPruebas.clases.has(clase) || htmlDobleClic.clases.has(clase),
  });
}

/* Dirección 2 — toda clase que se aplica existe en el CSS. Es la que atrapa un
   renombrado a medias, y la razón por la que este fichero existe. */
const fantasmas = [];
for (const [clase, sitios] of [...js.estricto].sort()) {
  if (css.donde.has(clase)) continue;
  if (GANCHOS_SIN_ESTILO[clase]) continue;
  fantasmas.push({ clase, origen: [...sitios].join(', '), tipo: 'js' });
}
for (const clase of [...htmlJuego.clases].sort()) {
  if (css.donde.has(clase)) continue;
  if (js.estricto.has(clase)) continue;   // ya denunciada arriba
  fantasmas.push({ clase, origen: corto(HTML_JUEGO), tipo: 'html' });
}

/* getElementById('X') sin id="X": devuelve null en silencio, y el código está
   lleno de `if (!el) return;` que convierten el fallo en «no pasa nada». */
const idsHuerfanos = [];
for (const [id, sitios] of [...js.idsPedidos].sort()) {
  if (htmlJuego.ids.has(id) || htmlPruebas.ids.has(id)) continue;
  if (js.idsCreados.has(id)) continue;          // lo crea el propio JS al pintar
  idsHuerfanos.push({ id, origen: [...sitios].join(', ') });
}

/* ══════════════════════════════════════════════════════════════════════════
   6. Informe
   ══════════════════════════════════════════════════════════════════════════ */

const resumen = {
  clasesCSS: css.donde.size,
  clasesHTML: htmlJuego.clases.size,
  clasesJS: js.estricto.size,
  prefijos: [...js.prefijos].sort(),
  huerfanas, fantasmas, idsHuerfanos,
  selectoresConId: css.selectoresConId,
};

if (JSON_) {
  console.log(JSON.stringify(resumen, null, 2));
} else {
  const bloque = (titulo, lista, pinta) => {
    console.log('\n' + titulo + '  (' + lista.length + ')');
    if (!lista.length) console.log('  — ninguno');
    else lista.forEach(x => console.log('  ' + pinta(x)));
  };
  console.log('CRUCE DE CLASES  ·  ' + (existsSync(CSS_COMPILADO) ? corto(CSS_COMPILADO) : corto(DIR_CSS)) +
    '\n  CSS: ' + css.donde.size + ' clases   HTML: ' + htmlJuego.clases.size +
    '   JS (estricto): ' + js.estricto.size +
    '   prefijos: ' + [...js.prefijos].sort().join(' ') || '—');
  bloque('DIRECCIÓN 1 · declaradas en el CSS y sin usar', huerfanas,
    x => x.clase.padEnd(28) + x.hojas + (x.soloPruebas ? '   [solo en pruebas/]' : ''));
  bloque('DIRECCIÓN 2 · se aplican y NO existen en el CSS', fantasmas,
    x => x.clase.padEnd(28) + '[' + x.tipo + '] ' + x.origen);
  bloque('getElementById sin id en la maqueta', idsHuerfanos,
    x => x.id.padEnd(28) + x.origen);
  bloque('selectores que estilan por #id', css.selectoresConId, x => x);
}

/* CERO SELECTORES POR ID, y en absoluto: «casi cero» no se puede auditar.
   Eran 20. Estilar a traves de un id ata el estilo a que ese nodo sea unico y
   se llame asi, con una especificidad que solo se puede vencer con otro id —de
   hecho habia un `#p-portada #portada-pista` con DOS, puesto ahi para ganarle a
   una clase—. Los ids siguen en el HTML: los necesitan getElementById,
   CB.pantallas.IDS y los data-ir. Lo que se ha quitado es estilar POR ellos. */
if (ESTRICTO && (fantasmas.length || huerfanas.length || idsHuerfanos.length ||
                 css.selectoresConId.length)) {
  process.exit(1);
}
