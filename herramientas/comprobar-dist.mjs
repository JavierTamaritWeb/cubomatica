#!/usr/bin/env node
/* ============================================================================
   comprobar-dist.mjs — la cadena que sustituye a los contadores 44/44/17/9
   ----------------------------------------------------------------------------
   Los cuatro contadores del bloque 5 de la auditoría medían el mismo hecho —«se
   carga lo que hay que cargar, en el orden que hay que cargarlo»— de la única
   manera posible sin build: contando etiquetas. Con un bundle, `dist/index.html`
   tiene UN <script>, así que contar deja de significar nada.

   Lo que nace en su lugar es más fuerte, no más débil: `manifiesto.json` es la
   fuente, y todo lo demás se verifica contra él. Cinco eslabones:

     manifiesto  →  sin duplicados
     manifiesto ↔ disco     igualdad EXACTA, no subconjunto: un fichero nuevo
                            que nadie añadió al manifiesto es un fallo
     manifiesto ↔ index.html  el bloque entre marcadores es exactamente eso
     manifiesto ↔ bundle    se reconstruye en memoria y se compara BYTE A BYTE.
                            Tres líneas, y es la comprobación más fuerte posible:
                            si coinciden, el orden es correcto, sin heurística.
     bundle     → parsea, conserva los 12 globales y lleva el aviso legal

   El cuarto eslabón trae gratis la comprobación más insidiosa que no existía:
   que `dist/` esté al día. Sin ella la auditoría puede pasar en verde sobre una
   entrega de hace tres días.

   CERO DEPENDENCIAS: solo node:*, para que corra en un clon limpio sin npm i.
   Lo que necesita dist/ se salta con aviso en vez de fallar.
   ========================================================================== */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const D = (...p) => join(RAIZ, ...p);
const M = JSON.parse(readFileSync(D('manifiesto.json'), 'utf8'));

const HAY_SRC = existsSync(D('src', 'index.html'));
const BASE = HAY_SRC ? D('src') : RAIZ;
const HTML = join(BASE, 'index.html');
const DIST = D('dist');

let fallos = 0;
const ok = (m) => console.log('  \x1b[32m✔\x1b[0m ' + m);
const mal = (m, d) => { fallos++; console.log('  \x1b[31m✘ ' + m + '\x1b[0m'); if (d) console.log('      ' + d); };
const salto = (m) => console.log('  \x1b[33m–\x1b[0m ' + m);
const juzgar = (cond, bien, mensajeMal, detalle) => (cond ? ok(bien) : mal(mensajeMal, detalle));

/* ── 1. El manifiesto no se contradice ─────────────────────────────────── */
const dup = M.guiones.filter((f, i) => M.guiones.indexOf(f) !== i);
juzgar(!dup.length, 'el manifiesto declara ' + M.guiones.length + ' guiones sin duplicados',
  'guiones duplicados en el manifiesto', dup.join(', '));

const sinPuro = M.puros.filter((p) => !M.guiones.includes(p));
juzgar(!sinPuro.length, 'los ' + M.puros.length + ' ficheros puros estan dentro de los guiones',
  'hay puros que no son guiones', sinPuro.join(', '));

/* ── 2. Manifiesto ↔ disco, igualdad exacta ────────────────────────────── */
const enDisco = ['js', 'datos']
  .flatMap((d) => existsSync(join(BASE, d))
    ? readdirSync(join(BASE, d)).filter((f) => f.endsWith('.js')).map((f) => d + '/' + f)
    : [])
  .sort();
const declarados = [...M.guiones].sort();
const sobran = enDisco.filter((f) => !declarados.includes(f));
const faltan = declarados.filter((f) => !enDisco.includes(f));
juzgar(!sobran.length && !faltan.length,
  'manifiesto y disco coinciden exactamente (' + enDisco.length + ' guiones)',
  'manifiesto y disco no coinciden',
  (sobran.length ? 'en disco y no declarados: ' + sobran.join(', ') + '  ' : '') +
  (faltan.length ? 'declarados y sin fichero: ' + faltan.join(', ') : ''));

const cssDisco = existsSync(join(BASE, 'scss'))
  ? readdirSync(join(BASE, 'scss')).filter((f) => /^_\d\d-.*\.scss$/.test(f))
      .map((f) => 'scss/' + f).sort()
  : [];
juzgar(JSON.stringify(cssDisco) === JSON.stringify([...M.estilos].sort()),
  'los ' + M.estilos.length + ' parciales del manifiesto son los que hay en disco',
  'los parciales del manifiesto no coinciden con el disco',
  'disco: ' + cssDisco.join(', ') + ' | manifiesto: ' + M.estilos.join(', '));

/* EL ORDEN DE LAS HOJAS YA NO LO DECLARA index.html. Antes eran nueve <link> y
   la cascada era el orden de las etiquetas; ahora Sass compila una sola hoja y
   la cascada es el orden de los @use de cubomatica.scss. Se verifica ahi, que
   es donde vive de verdad — y se sigue verificando contra el manifiesto, que es
   el unico dueño del orden en todo el proyecto. */
const entrada = join(BASE, M.entradaEstilos);
if (!existsSync(entrada)) {
  mal('falta ' + M.entradaEstilos, 'es el punto de entrada declarado en el manifiesto');
} else {
  const scss = readFileSync(entrada, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ' ');
  const usados = [...scss.matchAll(/@use\s+'([^']+)'/g)].map((m) => m[1])
    .filter((n) => n !== 'herramientas');
  const esperados = M.estilos.map((f) => f.replace(/^scss\/_/, '').replace(/\.scss$/, ''));
  juzgar(JSON.stringify(usados) === JSON.stringify(esperados),
    'cubomatica.scss carga los ' + esperados.length + ' parciales en el orden del manifiesto',
    'el orden de @use no coincide con el manifiesto: la cascada cambiaria',
    'scss: ' + usados.join(' ') + ' | manifiesto: ' + esperados.join(' '));
}

/* ── 3. Manifiesto ↔ index.html, entre marcadores ──────────────────────── */
const html = readFileSync(HTML, 'utf8');
const bloque = (nombre) => {
  const m = html.match(new RegExp('<!-- ' + nombre + ':INICIO[\\s\\S]*?' + nombre + ':FIN -->'));
  return m ? m[0] : null;
};
const bg = bloque('GUIONES'), be = bloque('ESTILOS');
if (!bg || !be) {
  mal('index.html no tiene los marcadores GUIONES:/ESTILOS:', 'los pone gulp html');
} else {
  const enHtml = [...bg.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
  juzgar(JSON.stringify(enHtml) === JSON.stringify(M.guiones),
    'index.html carga los ' + M.guiones.length + ' guiones del manifiesto, en orden',
    'index.html y el manifiesto discrepan en los guiones',
    'html: ' + enHtml.length + ' · manifiesto: ' + M.guiones.length);
  const hojasHtml = [...be.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  juzgar(hojasHtml.length === 1 && /cubomatica(\.min)?\.css$/.test(hojasHtml[0]),
    'index.html declara una sola hoja, la compilada',
    'index.html declara ' + hojasHtml.length + ' hojas: ' + hojasHtml.join(', '));
}

/* La suite prueba lo que se entrega. Si vuelve a cargar las fuentes sueltas, un
   fallo de orden de concatenacion no aparece hasta que un nino abre el juego. */
for (const [pagina, bundle] of [['pruebas.html', 'cubomatica.js'],
                                ['pruebas-min.html', 'cubomatica.min.js']]) {
  const ruta = D('pruebas', pagina);
  if (!existsSync(ruta)) { mal('falta pruebas/' + pagina); continue; }
  const p = readFileSync(ruta, 'utf8');
  /* Los de la propia suite son relativos («ejecutor.js»); los del juego suben un
     nivel («../dist/…»). Solo interesan los segundos. */
  const guiones = [...p.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1])
    .filter((u) => u.startsWith('../'));
  juzgar(guiones.length === 1 && guiones[0] === '../dist/js/' + bundle,
    'pruebas/' + pagina + ' prueba el bundle ' + bundle + ', no las fuentes sueltas',
    'pruebas/' + pagina + ' carga ' + guiones.length + ' guiones del juego: ' + guiones.join(', '));
}

/* ── 4 y 5. Todo lo que necesita dist/ ─────────────────────────────────── */
if (!existsSync(join(DIST, 'js', 'cubomatica.js'))) {
  salto('saltado lo que mira dist/: no existe todavia (ejecuta `npm run build`)');
  process.exit(fallos ? 1 : 0);
}

const pegar = (lista, base) => Buffer.concat(
  lista.flatMap((f, i) => (i ? [Buffer.from('\n'), readFileSync(join(base, f))]
                             : [readFileSync(join(base, f))])));

/* LA COMPROBACION. Si el bundle reconstruido en memoria es igual al de disco,
   el orden es correcto Y dist/ esta al dia. Las dos cosas de una vez. */
juzgar(pegar(M.guiones, BASE).equals(readFileSync(join(DIST, 'js', 'cubomatica.js'))),
  'dist/js/cubomatica.js es la concatenacion exacta del manifiesto, y esta al dia',
  'dist/js/cubomatica.js NO coincide con las fuentes', 'ejecuta `npm run build`');

/* Con el CSS no se puede hacer lo mismo: Sass no concatena, genera. Se compara
   contra las huellas que dejó gulp. Detecta igualmente un .scss tocado sin
   reconstruir, y sigue sin necesitar ni una dependencia. */
const rutaHuellas = join(DIST, '.huellas.json');
if (!existsSync(rutaHuellas)) {
  mal('falta dist/.huellas.json', 'lo escribe `gulp build`');
} else {
  const { fuentes } = JSON.parse(readFileSync(rutaHuellas, 'utf8'));
  const desviadas = Object.keys(fuentes).filter((f) => {
    if (!existsSync(join(RAIZ, f))) return true;
    return createHash('sha1').update(readFileSync(join(RAIZ, f))).digest('hex') !== fuentes[f];
  });
  const sinHuella = M.estilos.map((f) => 'src/' + f).filter((f) => !(f in fuentes));
  juzgar(!desviadas.length && !sinHuella.length,
    'las ' + Object.keys(fuentes).length + ' fuentes de estilo coinciden con lo compilado en dist/',
    'hay estilos tocados sin reconstruir',
    (desviadas.length ? 'cambiadas: ' + desviadas.join(', ') + '  ' : '') +
    (sinHuella.length ? 'sin huella: ' + sinHuella.join(', ') : '') + ' → `npm run build`');
}

/* Los 44 (45 con el offline) terminan en \n. Hoy es cierto y nadie lo comprueba;
   un editor puede romperlo y el sintoma seria `var CB = CB || {};var CB = …`
   pegado en la misma linea, que casualmente sigue funcionando hasta que un
   fichero acabe en un comentario de //. */
const sinSalto = M.guiones.filter((f) => !readFileSync(join(BASE, f), 'utf8').endsWith('\n'));
juzgar(!sinSalto.length, 'los ' + M.guiones.length + ' guiones terminan en salto de linea',
  'hay guiones que no terminan en salto de linea', sinSalto.join(', '));

for (const b of ['cubomatica.js', 'cubomatica.min.js']) {
  const ruta = join(DIST, 'js', b);
  try {
    execFileSync(process.execPath, ['--check', ruta], { stdio: 'pipe' });
    ok('dist/js/' + b + ' parsea');
  } catch (e) {
    mal('dist/js/' + b + ' NO parsea', String(e.stderr || e).slice(0, 200));
  }
}

/* Los 12 globales sobreviven a terser. La lista NO se copia: se extrae del
   propio casos-carga.js, que es su dueño. Terser sin mangle de nivel superior
   conserva el nombre literalmente, asi que basta buscarlo. */
const min = readFileSync(join(DIST, 'js', 'cubomatica.min.js'), 'utf8');
const casos = readFileSync(D('pruebas', 'casos-carga.js'), 'utf8');
const mg = casos.match(/var GLOBALES = \[([\s\S]*?)\];/);
if (!mg) {
  mal('no se encuentra la lista GLOBALES en pruebas/casos-carga.js');
} else {
  const globales = [...mg[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  const perdidos = globales.filter((n) => !new RegExp('function\\s+' + n + '\\s*\\(').test(min));
  juzgar(!perdidos.length,
    'los ' + globales.length + ' globales sobreviven a terser en el minificado',
    'terser se ha comido globales (revisa mangle.toplevel / compress.toplevel)',
    perdidos.join(', '));
}

/* Si terser borrase el aviso legal, habria desaparecido del producto entregado
   y hoy no lo comprobaria nadie: el bloque 1 exime a 00-nucleo.js por nombre, y
   el bundle no se llama asi.

   Se busca la FRASE del aviso, no la marca. Nombrar la marca aqui haria saltar
   la lista negra contra este mismo fichero, y la salida seria una exencion nueva
   que debilita el grep — el mismo razonamiento que en el gulpfile. Ademas es
   mejor comprobacion: lo que importa es que sobreviva la declaracion de no
   afiliacion, no que aparezca un nombre. */
const FRASE_LEGAL = 'No está afiliada';
const nLegal = (min.split(FRASE_LEGAL).length - 1);
juzgar(nLegal >= 1, 'el aviso de no afiliacion sobrevive a la minificacion',
  'la frase «' + FRASE_LEGAL + '» no esta en el minificado: terser se ha llevado el aviso legal');

/* dist/index.html: estructura, no contenido. Y con conteo de OCURRENCIAS, no de
   lineas: el HTML minificado es una sola linea y `grep -c` daria 1. */
const dh = readFileSync(join(DIST, 'index.html'), 'utf8');
const cuenta = (re) => (dh.match(re) || []).length;
juzgar(cuenta(/<section id="p-/g) === 17, 'dist/index.html conserva las 17 pantallas',
  'dist/index.html tiene ' + cuenta(/<section id="p-/g) + ' pantallas');
juzgar(cuenta(/<script src=/g) === 1 && cuenta(/rel="stylesheet"/g) === 1,
  'dist/index.html carga un solo guion y una sola hoja',
  'dist/index.html carga ' + cuenta(/<script src=/g) + ' guiones y ' +
  cuenta(/rel="stylesheet"/g) + ' hojas');
juzgar(/<html lang="es">/.test(dh), 'dist/index.html conserva lang="es" tras minificar',
  'la minificacion se ha llevado lang="es"');

const referidos = [...dh.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1])
  .filter((u) => !/^(https?:|data:|#|mailto:)/.test(u));
const ausentes = referidos.filter((u) => !existsSync(join(DIST, u.split('?')[0])));
juzgar(!ausentes.length, 'todo lo que referencia dist/index.html existe en dist/',
  'dist/index.html apunta a ficheros que no estan', ausentes.join(', '));

/* EL PRESUPUESTO QUE IMPORTA: lo que un navegador descarga para arrancar. Se
   suman el HTML y exactamente lo que referencia, y nada mas — en dist/ conviven
   el bundle minificado que se sirve y el legible que solo usan la auditoria y la
   suite, asi que pesar la carpeta entera daria mas del doble de lo que nadie
   descarga. La musica queda fuera: va con preload="none" y no se pide hasta que
   suena. Los 900 KB de antes querian proteger el arranque; esto lo protege. */
const TOPE_KB = 400;
const pesa = (f) => readFileSync(join(DIST, f)).length;
const arranque = ['index.html'].concat(referidos.filter((u) => !/^audio\//.test(u)));
const kb = Math.round(arranque.reduce((n, f) => n + pesa(f.split('?')[0]), 0) / 1024);
juzgar(kb < TOPE_KB,
  'el arranque descarga ' + kb + ' KB (presupuesto: < ' + TOPE_KB + ' KB) — ' +
  arranque.join(' + '),
  'el arranque descarga ' + kb + ' KB, por encima del presupuesto de ' + TOPE_KB + ' KB');

process.exit(fallos ? 1 : 0);
