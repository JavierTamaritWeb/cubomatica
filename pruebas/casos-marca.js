/* casos-marca.js — Auditoría de marca EN RUNTIME, sin fetch (PLAN §14.6) */

CB.pruebas.suite('Marca y seguridad: comprobación en runtime (cobertura parcial)', function () {
  const t = CB.pruebas;

  /* La lista negra va en UNA sola línea a propósito: auditar.sh exime este
     fichero pero comprueba que cada línea que la menciona sea su declaración. */
  const NEGRA = ['minecraft', 'creeper', 'steve', 'enderman', 'netherite', 'redstone', 'piglin', 'mojangles', 'minecraftia'];  // lista negra

  /* Recorrido de todo lo exportado en CB, salvo los dos lugares donde el aviso
     legal SÍ debe aparecer. */
  let texto = '';
  const visto = [];
  function recorrer(obj, ruta, prof) {
    if (prof > 4 || !obj || visto.indexOf(obj) !== -1) return;
    visto.push(obj);
    let k, v;
    for (k in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
      if (ruta === 'CB' && k === 'LEGAL') continue;      // exento: §21.1
      if (ruta === 'CB' && k === 'pruebas') continue;    // este propio fichero
      if (k === 'NOMBRES_PROHIBIDOS') continue;          // es la lista negra misma
      if (k === 'PROHIBIDO_EN_INTERFAZ') continue;       // idem
      try { v = obj[k]; } catch (e) { continue; }
      if (typeof v === 'function') {
        try { texto += ' ' + Function.prototype.toString.call(v); } catch (e) { }
      } else if (typeof v === 'string') {
        texto += ' ' + v;
      } else if (v && typeof v === 'object') {
        recorrer(v, ruta + '.' + k, prof + 1);
      }
    }
  }
  recorrer(CB, 'CB', 0);

  const norm = texto.toLowerCase();
  const encontradas = NEGRA.filter(function (p) {
    return new RegExp('\\b' + p + '\\b').test(norm);
  });
  /* «…craft» al final de palabra, que es como se cuelan los derivados */
  if (/[a-z]craft\b/.test(norm)) encontradas.push('*craft');

  t.ok(encontradas.length === 0,
    'ninguna cadena de la lista negra aparece en el código exportado',
    encontradas.join(', '));

  /* Lo mismo sobre el CSS realmente cargado */
  let css = '', i, j, reglas;
  try {
    for (i = 0; i < document.styleSheets.length; i++) {
      try { reglas = document.styleSheets[i].cssRules; } catch (e) { continue; }
      if (!reglas) continue;
      for (j = 0; j < reglas.length; j++) css += ' ' + reglas[j].cssText;
    }
  } catch (e) { }
  const enCss = NEGRA.filter(function (p) {
    return new RegExp('\\b' + p + '\\b').test(css.toLowerCase());
  });
  t.ok(enCss.length === 0, 'ninguna cadena de la lista negra aparece en el CSS cargado',
       enCss.join(', '));

  /* El aviso legal existe y está en UN SOLO sitio del código */
  t.ok(CB.LEGAL && CB.LEGAL.AVISO && CB.LEGAL.AVISO.length > 80,
    'CB.LEGAL.AVISO existe y es la única constante con el aviso de no afiliación');
  t.ok(CB.LEGAL.AVISO.indexOf('No está afiliada') !== -1,
    'el aviso declara expresamente la ausencia de afiliación');

  /* innerHTML: solo con literales, nunca con variables (§15.8) */
  const conInnerHTML = [];
  function buscarInnerHTML(obj, ruta, prof) {
    if (prof > 3 || !obj) return;
    let k, v;
    for (k in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
      try { v = obj[k]; } catch (e) { continue; }
      if (typeof v === 'function') {
        let src;
        try { src = Function.prototype.toString.call(v); } catch (e) { continue; }
        if (/\.innerHTML\s*=/.test(src)) conInnerHTML.push(ruta + '.' + k);
      } else if (v && typeof v === 'object' && prof < 3) {
        buscarInnerHTML(v, ruta + '.' + k, prof + 1);
      }
    }
  }
  buscarInnerHTML(CB, 'CB', 0);
  t.ok(conInnerHTML.length === 0,
    'ninguna función asigna innerHTML: todo el texto del perfil se pinta con textContent',
    conInnerHTML.join(', '));

  /* Frontera: el motor y los generadores son PUROS */
  const PUROS = [
    ['CB.puntuacion', CB.puntuacion], ['CB.antiazar', CB.antiazar],
    ['CB.vidas', CB.vidas], ['CB.adaptativo', CB.adaptativo],
    ['CB.logros', CB.logros], ['CB.mensajes', CB.mensajes],
    ['CB.reparacion', CB.reparacion], ['CB.leitner', CB.leitner],
    ['CB.memoria', CB.memoria], ['CB.grafo', CB.grafo], ['CB.escalera', CB.escalera],
    ['CB.gen.numeracion', CB.gen.numeracion], ['CB.gen.sumas', CB.gen.sumas],
    ['CB.gen.restas', CB.gen.restas], ['CB.gen.multiplicacion', CB.gen.multiplicacion],
    ['CB.gen.problemas', CB.gen.problemas], ['CB.gen.dinero', CB.gen.dinero],
    ['CB.gen.vocabulario', CB.gen.vocabulario], ['CB.catalogo', CB.catalogo],
    ['CB.distractores', CB.distractores]
  ];
  const impuros = [], conRandom = [], conISO = [];
  PUROS.forEach(function (par) {
    const nombre = par[0], mod = par[1];
    let k, src;
    for (k in mod) {
      if (!Object.prototype.hasOwnProperty.call(mod, k)) continue;
      if (typeof mod[k] !== 'function') continue;
      try { src = Function.prototype.toString.call(mod[k]); } catch (e) { continue; }
      if (/\bdocument\.|\bwindow\.|\blocalStorage\b|\bnavigator\./.test(src)) {
        impuros.push(nombre + '.' + k);
      }
      if (/Math\.random/.test(src)) conRandom.push(nombre + '.' + k);
      if (/toISOString/.test(src)) conISO.push(nombre + '.' + k);
    }
  });
  t.ok(impuros.length === 0,
    'FRONTERA · el motor y los generadores no tocan el DOM', impuros.join(', '));
  t.ok(conRandom.length === 0,
    'FRONTERA · cero Math.random: todo aleatorio pasa por el rng inyectado',
    conRandom.join(', '));
  t.ok(conISO.length === 0,
    'FRONTERA · cero toISOString en todo el proyecto', conISO.join(', '));

  /* Los literales de clave viven solo en 01-almacen.js */
  const conClave = [];
  PUROS.forEach(function (par) {
    let k, src;
    for (k in par[1]) {
      if (typeof par[1][k] !== 'function') continue;
      try { src = Function.prototype.toString.call(par[1][k]); } catch (e) { continue; }
      if (/'cubomatica\./.test(src) || /"cubomatica\./.test(src)) conClave.push(par[0] + '.' + k);
    }
  });
  t.ok(conClave.length === 0,
    'los literales de clave «cubomatica.…» solo existen en 01-almacen.js', conClave.join(', '));

  /* Vocabulario prohibido en la interfaz del niño (§12.4) */
  const acusatorio = CB.antiazar.PROHIBIDO_EN_INTERFAZ.filter(function (p) {
    const enMensajes = CB.datos.MENSAJES.acierto.concat(CB.datos.MENSAJES.animo)
      .some(function (m) { return CB.util.normalizar(m).indexOf(CB.util.normalizar(p)) !== -1; });
    return enMensajes;
  });
  t.ok(acusatorio.length === 0,
    'ningún mensaje contiene «adivinar», «al azar», «trampas» ni «concéntrate»',
    acusatorio.join(', '));
  t.ok(CB.antiazar.TEXTO_PERMITIDO.indexOf('Gluglú') !== -1,
    'Gluglú se presenta como accidente del entorno, no como juez');

  /* Vocabulario prohibido en la pantalla de fin (§3.7) */
  const PROHIBIDO_FIN = ['has perdido', 'game over', 'fin de la partida', 'fallaste',
                       'te has quedado sin'];
  const srcFin = Function.prototype.toString.call(CB.partida.pintarFin).toLowerCase();
  /* Aparecen en el comentario que los prohíbe: se comprueba que no estén en los
     textos reales de la tabla. */
  const textosFin = srcFin.split('var textos')[1] || '';
  const enTextos = PROHIBIDO_FIN.filter(function (p) { return textosFin.indexOf(p) !== -1; });
  t.ok(enTextos.length === 0,
    'la pantalla de fin no contiene «has perdido», «game over» ni «fallaste»',
    enTextos.join(', '));
});
