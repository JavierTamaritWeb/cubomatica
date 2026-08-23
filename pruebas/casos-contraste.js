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

/* E112 · Un respaldo pensado para fondo oscuro, aplicado sobre fondo claro */

/* Los PARES de arriba miden las parejas que el diseño PRETENDE. El fallo de
   1.23.6 fue una pareja que nadie declaró: .texto--menor consume
   var(--texto-sec, var(--texto-sec-claro)), y en un contenedor claro que no
   declaraba la variable caía al respaldo —pensado para fondo oscuro— y quedaba
   en 1,5:1. Ninguna pareja de la tabla era falsa; faltaba la que ocurría de
   hecho. Por eso esta suite no mide variables: mide el color calculado de los
   nodos reales contra el fondo que de verdad tienen debajo. */
CB.pruebas.suite('E112 · el texto del panel adulto se lee en los dos modos', function () {
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
  /* Un texto casi nunca pinta su propio fondo: el que cuenta es el del primer
     antepasado que pinta alguno. Medir contra el del propio nodo daba siempre
     transparente, que es como no medir. */
  function fondoDe(n) {
    let x = n;
    while (x && x.nodeType === 1) {
      const c = getComputedStyle(x).backgroundColor;
      if (c && c.indexOf('rgba(0, 0, 0, 0)') === -1 && c !== 'transparent') {
        const h = rgbAHex(c);
        if (h) return h;
      }
      x = x.parentElement;
    }
    return null;
  }
  function textoPropio(n) {
    let s = '', i;
    for (i = 0; i < n.childNodes.length; i++) {
      if (n.childNodes[i].nodeType === 3) s += n.childNodes[i].textContent;
    }
    return s.trim();
  }

  /* La caja la construye el módulo, no esta prueba: así sus clases son las que
     tendrá en el panel de verdad. Y cuelga de #p-adulto porque es
     .pantalla--documento quien declara --texto-sec; medirla suelta, fuera de su
     contenedor, mediría justamente lo que no falla. */
  const pantalla = document.getElementById('p-adulto');
  const montada = !!pantalla && pantalla.classList.contains('pantalla--documento');
  if (!t.ok(montada, 'E112 · el panel adulto está montado como documento')) return;

  const perfilPrevio = CB.perfil;
  CB.perfil = CB.pruebas.perfilNuevo();
  const ocultaAntes = pantalla.hidden;
  pantalla.hidden = false;
  const caja = CB.adulto.cajaAjustes(CB.perfil);
  pantalla.appendChild(caja);

  const nodos = [].slice.call(caja.querySelectorAll('*')).filter(function (n) {
    return textoPropio(n) !== '';
  });
  t.ok(nodos.length >= 8,
    'E112 · la caja de ajustes trae texto que medir', nodos.length + ' nodos');

  const raiz = document.documentElement;
  const teniaAC = raiz.classList.contains('alto-contraste');
  const flojos = [], sinMedir = [];

  ['sin alto contraste', 'con alto contraste'].forEach(function (modo) {
    if (modo === 'con alto contraste') raiz.classList.add('alto-contraste');
    else raiz.classList.remove('alto-contraste');
    nodos.forEach(function (n) {
      const c = rgbAHex(getComputedStyle(n).color), f = fondoDe(n);
      if (!c || !f) { sinMedir.push(modo + ' · ' + textoPropio(n).slice(0, 18)); return; }
      const r = ratio(c, f);
      if (r < 4.5) {
        flojos.push(modo + ' · ' + textoPropio(n).slice(0, 18) + ' ' +
                    c + ' sobre ' + f + ' = ' + r.toFixed(2));
      }
    });
  });

  if (!teniaAC) raiz.classList.remove('alto-contraste');
  else raiz.classList.add('alto-contraste');
  pantalla.removeChild(caja);
  pantalla.hidden = ocultaAntes;
  CB.perfil = perfilPrevio;

  /* Que no se pueda medir es un fallo, no un permiso para saltarse la prueba. */
  t.igual(sinMedir.length, 0,
    'E112 · se ha podido medir el color de todos los nodos',
    sinMedir.slice(0, 4).join(' · '));
  t.igual(flojos.length, 0,
    'E112 · todo el texto de la caja llega a 4,5:1 en los dos modos',
    flojos.slice(0, 4).join(' · '));
});

/* E113 · La pieza tomaba su color del bioma, y el bioma no se apaga */

/* La veta se pintaba con var(--deco-<tono>) directamente. Ese tono no es solo
   suyo: pinta biseles, nubes y fondos, así que la paleta de alto contraste no
   podía apagarlo sin borrar el relieve del juego entero — y no apagarlo dejaba
   el rótulo blanco sobre arena, a 1,55:1. La pieza necesitaba una superficie
   que fuera solo suya (--bg-veta-<estado>), y entonces la paleta ya puede.
   Como los seis estados los escribe CB.memoria, el cruce es la prueba: todo
   estado que el JS sabe escribir tiene que ser legible en los dos modos. */
CB.pruebas.suite('E113 · cada estado de veta se lee en los dos modos', function () {
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

  const perfilPrevio = CB.perfil;
  CB.perfil = CB.pruebas.perfilNuevo();

  /* Las vetas las pinta el módulo que las pinta: así el rótulo, el icono y el
     texto de estado son los del juego, con sus clases. */
  CB.mapaDestrezas.pintar();
  const veta = document.querySelector('#rejilla-vetas .veta');
  if (!t.ok(!!veta, 'E113 · el mapa de destrezas ha pintado vetas que medir')) {
    CB.perfil = perfilPrevio;
    return;
  }

  const estados = Object.keys(CB.memoria.ETIQUETA);
  t.igual(estados.length, 6, 'E113 · CB.memoria declara los seis estados de veta');

  const raiz = document.documentElement;
  const teniaAC = raiz.classList.contains('alto-contraste');
  const estadoOriginal = veta.getAttribute('data-estado');
  const flojos = [], sinSuperficie = [], sinMedir = [];
  let medidas = 0;

  ['sin alto contraste', 'con alto contraste'].forEach(function (modo) {
    if (modo === 'con alto contraste') raiz.classList.add('alto-contraste');
    else raiz.classList.remove('alto-contraste');

    estados.forEach(function (estado) {
      /* Se cambia el mismo atributo que escribe 43-mapa-destrezas.js cuando el
         niño avanza; no se fabrica ninguna veta a mano. */
      veta.setAttribute('data-estado', estado);
      const fondoCrudo = getComputedStyle(veta).backgroundColor;
      const fondo = rgbAHex(fondoCrudo);

      /* Un estado sin superficie propia no pinta nada y hereda la de abajo:
         eso es justo el fallo, y se ve aquí antes que en el ratio. */
      if (!fondo || fondoCrudo.indexOf('rgba(0, 0, 0, 0)') !== -1) {
        sinSuperficie.push(modo + ' · ' + estado);
        return;
      }

      const textos = [].slice.call(veta.querySelectorAll('span'));
      textos.forEach(function (n) {
        if (!(n.textContent || '').trim()) return;
        const tinta = rgbAHex(getComputedStyle(n).color);
        if (!tinta) { sinMedir.push(modo + ' · ' + estado); return; }
        medidas++;
        const r = ratio(tinta, fondo);
        /* El bloqueado se mide igual, pero no se le exige: WCAG 1.4.3 exime a
           los componentes inactivos, y su gris ES el lenguaje de «cerrada». */
        if (estado !== 'bloqueado' && r < 4.5) {
          flojos.push(modo + ' · ' + estado + ' ' + tinta + ' sobre ' + fondo +
                      ' = ' + r.toFixed(2));
        }
      });
    });
  });

  if (estadoOriginal) veta.setAttribute('data-estado', estadoOriginal);
  if (!teniaAC) raiz.classList.remove('alto-contraste');
  else raiz.classList.add('alto-contraste');
  CB.perfil = perfilPrevio;

  t.igual(sinSuperficie.length, 0,
    'E113 · los seis estados pintan superficie propia, no la heredan',
    sinSuperficie.slice(0, 4).join(' · '));
  t.igual(sinMedir.length, 0,
    'E113 · se ha podido medir la tinta de cada rótulo', sinMedir.slice(0, 4).join(' · '));
  t.ok(medidas >= estados.length * 2,
    'E113 · se ha medido cada estado en los dos modos', medidas + ' medidas');
  t.igual(flojos.length, 0,
    'E113 · los cinco estados abiertos llegan a 4,5:1 en los dos modos',
    flojos.slice(0, 4).join(' · '));
});
