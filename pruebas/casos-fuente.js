/* casos-fuente.js — Cobertura de glifos (PLAN §10.2) */

CB.pruebas.suite('Tipografía: cobertura de glifos y rama activa de la cascada', function () {
  var CRITICOS = 'ÁÉÍÓÚÜÑáéíóúüñ¿¡«»€0123456789';
  var t = CB.pruebas;

  var lienzo = document.createElement('canvas');
  lienzo.width = 64; lienzo.height = 64;
  var g = lienzo.getContext('2d');
  if (!g) { CB.pruebas.saltar('cobertura de glifos', 'sin canvas'); return; }

  function huella(fuente, ch) {
    g.clearRect(0, 0, 64, 64);
    g.font = '40px ' + fuente;
    g.textBaseline = 'top';
    g.fillStyle = '#000';
    g.fillText(ch, 4, 4);
    var d = g.getImageData(0, 0, 64, 64).data;
    var h = 0, i;
    for (i = 3; i < d.length; i += 4) h = (h * 31 + (d[i] > 8 ? 1 : 0)) % 4294967296;
    return h;
  }

  var PRIVADO = '\uE000';

  ['--fuente-lectura', '--fuente-pixel'].forEach(function (nombreVar) {
    var fuente = getComputedStyle(document.documentElement)
      .getPropertyValue(nombreVar).trim();
    if (!fuente) { CB.pruebas.saltar(nombreVar, 'variable no resuelta'); return; }

    var hNotdef = huella(fuente, PRIVADO);
    var faltan = [], i, ch;
    for (i = 0; i < CRITICOS.length; i++) {
      ch = CRITICOS.charAt(i);
      var h = huella(fuente, ch);
      if (h === hNotdef) faltan.push(ch);
    }
    CB.pruebas.ok(faltan.length === 0,
      'los ' + CRITICOS.length + ' glifos críticos existen en ' + nombreVar,
      'faltan: ' + faltan.join(' '));
  });

  var pixel = getComputedStyle(document.documentElement)
    .getPropertyValue('--fuente-pixel');
  t.ok(pixel.indexOf('monospace') !== -1,
    'la cascada de la fuente pixel termina en una pila del sistema con cobertura completa');
  var lectura = getComputedStyle(document.documentElement)
    .getPropertyValue('--fuente-lectura');
  t.ok(lectura.indexOf('Verdana') !== -1,
    'la pila de lectura encabeza con Verdana (x-height alta, formas abiertas)');

  /* Los enunciados de problema NUNCA usan la fuente pixel (§10.2) */
  /* Lo que NO puede darse por hecho es que la clase siga existiendo en la hoja: sin regla, la sonda hereda la tipografía del body —que también es la de lectura— y la comprobación pasa midiendo la nada. */
  var reglaEnunciado = t.claseEnHoja('.enunciado');
  t.ok(reglaEnunciado === true,
    'la clase .enunciado sigue teniendo regla en la hoja cargada',
    reglaEnunciado === null ? 'no se pueden leer las cssRules: sirve la página por HTTP' : 'sin regla');
  var enun = document.querySelector('.enunciado') || document.createElement('div');
  enun.className = 'enunciado';
  document.body.appendChild(enun);
  var ff = getComputedStyle(enun).fontFamily;
  t.ok(ff.indexOf('Verdana') !== -1 || ff.indexOf('sans-serif') !== -1,
    'los enunciados de problema usan la pila del sistema, no la fuente pixel', ff);
  enun.parentNode.removeChild(enun);

  /* Cero ficheros de fuente sueltos: el @font-face solo usa local() */
  var conUrl = 0;
  try {
    var hojas = document.styleSheets, i2, j, reglas, r;
    for (i2 = 0; i2 < hojas.length; i2++) {
      try { reglas = hojas[i2].cssRules; } catch (e) { continue; }
      if (!reglas) continue;
      for (j = 0; j < reglas.length; j++) {
        r = reglas[j];
        if (r.type === 5 /* FONT_FACE_RULE */ &&
            r.style && r.style.src && r.style.src.indexOf('url(') !== -1) {
          conUrl++;
        }
      }
    }
  } catch (e) { }
  t.igual(conUrl, 0,
    'ningún @font-face descarga un fichero: la cascada usa solo local() (cero peticiones de red)');
});
