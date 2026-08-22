/* casos-contraste.js — Ratios WCAG par a par sobre las variables CSS calculadas */

CB.pruebas.suite('Contraste: ratios WCAG par a par', function () {
  const t = CB.pruebas;

  /* Hasta 1.7.0 solo admitía seis dígitos, y eso bastaba mientras el CSS lo escribiera una persona. */
  function hex(v) {
    const s = getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(s)) return s;
    if (/^#[0-9A-Fa-f]{3}$/.test(s)) {
      return '#' + s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) +
                   s.charAt(3) + s.charAt(3);
    }
    return null;
  }
  function lum(h) {
    const r = parseInt(h.substr(1, 2), 16) / 255;
    const g = parseInt(h.substr(3, 2), 16) / 255;
    const b = parseInt(h.substr(5, 2), 16) / 255;
    function c(x) { return (x <= 0.03928) ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }
    return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
  }
  function ratio(a, b) {
    const la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }

  CB.pruebas.PARES = [
    ['--bg-texto-panel',   '--texto-principal',      4.5, 'texto principal sobre panel crema'],
    ['--bg-texto-panel',   '--texto-secundario',     4.5, 'texto secundario sobre panel crema'],
    ['--bg-pantalla',      '--texto-claro',          4.5, 'texto claro sobre fondo de pantalla'],
    ['--bg-pantalla',      '--texto-sec-claro',      4.5, 'texto secundario claro sobre pantalla'],
    ['--bg-texto-oscuro',  '--texto-claro',          4.5, 'texto claro sobre panel oscuro'],
    ['--bg-texto-aviso',   '--texto-aviso',          4.5, 'texto sobre panel de aviso'],
    ['--btn-fondo',        '--btn-texto',            4.5, 'botón en reposo'],
    ['--btn-fondo-hundido','--btn-texto',            4.5, 'botón hundido'],
    ['--btn-primario',     '--btn-primario-texto',   4.5, 'botón primario'],
    ['--ok-fondo',         '--ok-texto',             4.5, 'mensaje de acierto'],
    ['--mal-fondo',        '--mal-texto',            4.5, 'mensaje de ánimo'],
    ['--foco-oro',         '--foco-borde',           3.0, 'anillo de foco: oro contra borde'],
    ['--foco-borde',       '--bg-texto-panel',       3.0, 'anillo de foco: borde contra panel'],
    ['--foco-borde',       '--bg-pantalla',          1.0, 'anillo de foco sobre fondo oscuro'],
    ['--alto-contraste-bg','--alto-contraste-texto', 7.0, 'modo de alto contraste'],

    ['--bg-texto-oscuro',  '--texto-claro',          4.5, 'la cifra en la cinta de cada moneda y cada billete']
  ];

  let malos = 0;
  const saltados = [];
  let i;
  for (i = 0; i < CB.pruebas.PARES.length; i++) {
    const p = CB.pruebas.PARES[i];
    const a = hex(p[0]), b = hex(p[1]);
    if (!a || !b) {
      saltados.push(a ? p[1] : p[0]);
      CB.pruebas.saltar(p[3], 'variable no resuelta: ' + (a ? p[1] : p[0]));
      continue;
    }
    const r = ratio(a, b);
    const ok = r >= p[2] - 0.005;
    if (!ok) malos++;
    t.ok(ok, p[3] + ' (' + p[0] + ' / ' + p[1] + ') ≥ ' + p[2] + ':1',
         r.toFixed(2) + ':1');
  }
  t.ok(malos === 0, 'ningún par de color queda por debajo de su umbral WCAG',
       malos + ' pares por debajo');

  /* LA COMPROBACIÓN QUE FALTABA. Un par que no se puede medir se saltaba, y un
     salto no cuenta como fallo: el resumen seguía diciendo «TODO EN VERDE» con
     una obligación legal sin verificar. Aquí un salto es un fallo. */
  t.ok(saltados.length === 0,
    'los ' + CB.pruebas.PARES.length + ' pares WCAG se han podido medir, ninguno saltado',
    'sin resolver: ' + saltados.join(', '));

  /* Ningún texto se dibuja jamás sobre una textura (§10.1): el contraste de un
     texto sobre ruido pseudoaleatorio no es un par de colores y no se puede
     verificar. */
  const conTextura = [], sinRegla = [], sinMedir = [];
  const sospechosas = ['.enunciado', '.enunciado--operacion', '.texto--menor', '.panel-bloque',
                     '.btn-bloque', '.mensaje-resultado', '.veta', '.cromo'];

  sospechosas.forEach(function (sel) {
    const hay = t.claseEnHoja(sel);
    if (hay === null) sinMedir.push(sel);
    else if (!hay) sinRegla.push(sel);
  });
  t.ok(sinMedir.length === 0,
    'se pueden leer las reglas de la hoja para comprobar los nombres',
    sinMedir.length ? 'sirve la página por HTTP: por file:// el navegador no deja leer cssRules' : '');
  t.ok(sinRegla.length === 0,
    'las ' + sospechosas.length + ' clases con texto siguen existiendo en la hoja',
    'sin regla: ' + sinRegla.join(', '));

  /* Y DESPUÉS se miden. La que no esté montada en la maqueta se monta: medir
     solo las que había a mano dejaba fuera a las demás sin decirlo. */
  sospechosas.forEach(function (sel) {
    let el = document.querySelector(sel), prestado = null;
    if (!el) {
      prestado = document.createElement('div');
      prestado.className = sel.slice(1);
      document.body.appendChild(prestado);
      el = prestado;
    }
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none' && bg.indexOf('url(') !== -1) conTextura.push(sel);
    if (prestado) document.body.removeChild(prestado);
  });
  t.ok(conTextura.length === 0,
    'ninguna clase con texto hereda una textura de fondo', conTextura.join(', '));

  /* Los dos grupos de color no se mezclan */
  let decoConTexto = 0;
  ['--deco-piedra', '--deco-tierra', '--deco-hierba'].forEach(function (v) {
    if (!hex(v)) decoConTexto++;
  });
  t.igual(decoConTexto, 0, 'los colores de decoración están declarados como colores planos');

  /* Tamaños mínimos: ningún texto del niño por debajo de 20 px */
  const raiz = getComputedStyle(document.documentElement);
  const min = parseInt(raiz.getPropertyValue('--tam-texto-min'), 10);
  t.ok(min >= 20, 'el suelo de tamaño de texto es de al menos 20 px', min + ' px');
  const numOpcion = parseInt(raiz.getPropertyValue('--tam-numero-opcion'), 10);
  t.ok(numOpcion >= 44,
    'los dígitos en tipografía pixel van a 44 px o más (6/8/9 y 1/7 se confunden por debajo)',
    numOpcion + ' px');

  const sondaLado = document.createElement('div');
  sondaLado.style.position = 'absolute';
  sondaLado.style.width = 'var(--lado-respuesta)';
  document.body.appendChild(sondaLado);
  const lado = parseFloat(getComputedStyle(sondaLado).width);
  document.body.removeChild(sondaLado);
  t.ok(lado >= 64, 'el botón de respuesta nunca baja de 64 px', lado + ' px');
  /* --e3 es un calc(): getPropertyValue devuelve la expresión sin resolver.
     Hay que renderizarla para leer el valor real. */
  const sonda = document.createElement('div');
  sonda.style.position = 'absolute';
  sonda.style.width = 'var(--e3)';
  document.body.appendChild(sonda);
  const e3 = parseFloat(getComputedStyle(sonda).width);
  document.body.removeChild(sonda);
  t.ok(e3 >= 16, 'la separación entre botones es de al menos 16 px', e3 + ' px');
});

/* E63 · El par del botón BLOQUEADO, medido sobre el botón de verdad */
CB.pruebas.suite('Contraste: el teclado bloqueado también se lee', function () {
  const t = CB.pruebas;

  function rgbAHex(s) {
    const m = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(s || '');
    if (!m) return null;
    function dos(n) { const h = Number(n).toString(16); return h.length === 1 ? '0' + h : h; }
    return '#' + dos(m[1]) + dos(m[2]) + dos(m[3]);
  }
  function lum(h) {
    const r = parseInt(h.substr(1, 2), 16) / 255, g = parseInt(h.substr(3, 2), 16) / 255,
        b = parseInt(h.substr(5, 2), 16) / 255;
    function c(x) { return (x <= 0.03928) ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }
    return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
  }
  function ratio(a, b) {
    const la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }

  const caja = document.getElementById('item-respuesta');
  if (!t.ok(!!caja, 'E63 · hay contenedor de respuesta en la maqueta')) return;

  /* Se monta el teclado REAL con un bloqueo largo, para pillarlo apagado. */
  CB.componentes.tecladoBloques({ respuesta: 7 }, function () {}, { bloqueoMs: 30000 });
  const teclas = caja.querySelectorAll('.btn-bloque');
  if (!t.ok(teclas.length >= 12, 'E63 · el teclado monta sus doce teclas',
      String(teclas.length))) return;

  const apagadas = [];
  let i, cs;
  for (i = 0; i < teclas.length; i++) {
    if (teclas[i].disabled || teclas[i].getAttribute('aria-disabled') === 'true') {
      apagadas.push(teclas[i]);
    }
  }
  /* SE AFIRMA QUE ESTÁN APAGADAS antes de medir nada. Si el bloqueo no llegara a
     aplicarse, todo lo de abajo mediría el botón activo y pasaría en verde
     midiendo otra cosa. */
  t.ok(apagadas.length >= 12, 'E63 · las doce teclas están deshabilitadas durante el bloqueo',
    apagadas.length + ' de ' + teclas.length);

  const pares = [], fondos = {};
  for (i = 0; i < apagadas.length; i++) {
    cs = getComputedStyle(apagadas[i]);
    const f = rgbAHex(cs.backgroundColor), c = rgbAHex(cs.color);
    if (!f || !c) continue;
    fondos[f] = (fondos[f] || 0) + 1;
    pares.push({ tecla: apagadas[i].getAttribute('data-tecla') || apagadas[i].textContent,
                 r: ratio(f, c), f: f, c: c });
  }

  /* TODAS del mismo color de fondo. Es lo que caza el OK: si una tecla se queda
     verde mientras las once están de piedra, aquí hay dos fondos distintos. */
  t.igual(Object.keys(fondos).length, 1,
    'E63 · las doce teclas bloqueadas comparten fondo: ninguna finge estar viva',
    JSON.stringify(fondos));

  const flojas = pares.filter(function (p) { return p.r < 4.5; })
    .map(function (p) { return p.tecla + ' ' + p.c + ' sobre ' + p.f + ' = ' + p.r.toFixed(2); });
  t.igual(flojas.length, 0,
    'E63 · y sus cifras se leen: 4,5:1 o más', flojas.slice(0, 4).join(' · '));

  /* Y EN ALTO CONTRASTE, que reescribe --btn-texto a blanco sin tocar la piedra:
     sin su propia línea, el bloqueado quedaría a 3,36:1. */
  const raiz = document.documentElement, tenia = raiz.classList.contains('alto-contraste');
  raiz.classList.add('alto-contraste');
  let peorAC = 99;
  for (i = 0; i < apagadas.length; i++) {
    cs = getComputedStyle(apagadas[i]);
    const fa = rgbAHex(cs.backgroundColor), ca = rgbAHex(cs.color);
    if (fa && ca) peorAC = Math.min(peorAC, ratio(fa, ca));
  }
  if (!tenia) raiz.classList.remove('alto-contraste');
  t.ok(peorAC >= 4.5, 'E63 · en alto contraste el bloqueado sigue por encima de 4,5:1',
    peorAC.toFixed(2) + ':1');
});
