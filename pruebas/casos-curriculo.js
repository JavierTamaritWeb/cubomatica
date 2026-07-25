/* casos-curriculo.js — Las 8 comprobaciones CU1-CU8 de PLAN §6.3
   El test de v1 solo miraba que el campo no estuviera vacío: cualquier etiqueta
   inventada pasaba en verde. Era una comprobación de FORMA vendida como
   comprobación de rigor. */

CB.pruebas.suite('Currículo: CU1-CU8', function () {
  var t = CB.pruebas;
  var niveles = CB.catalogo.todos();

  /* CU1 — el saber declarado EXISTE en la transcripción del RD */
  var malSaber = niveles.filter(function (n) {
    if (!CB.CURRICULO.saberes[n.curriculo.saber]) return true;
    if (n.curriculo.saberSecundario &&
        !CB.CURRICULO.saberes[n.curriculo.saberSecundario]) return true;
    return false;
  });
  t.ok(malSaber.length === 0,
    'CU1 · los 92 niveles declaran un saber que existe en CB.CURRICULO.saberes',
    malSaber.map(function (n) { return n.id + ':' + n.curriculo.saber; }).join(', '));

  /* CU2 — los criterios declarados EXISTEN */
  var malCrit = [];
  niveles.forEach(function (n) {
    n.curriculo.criterios.forEach(function (c) {
      if (!CB.CURRICULO.criterios[c]) malCrit.push(n.id + ':' + c);
    });
  });
  t.ok(malCrit.length === 0,
    'CU2 · todos los criterios declarados existen en CB.CURRICULO.criterios',
    malCrit.join(', '));

  /* CU3 — compatibilidad tipo ↔ criterio */
  var malTipo = niveles.filter(function (n) {
    if (n.letra !== 'P') return false;
    return !n.curriculo.criterios.some(function (c) {
      return c.charAt(0) === '1' || c.charAt(0) === '2';
    });
  });
  t.ok(malTipo.length === 0,
    'CU3a · todo nivel PROBLEMA_* declara ≥1 criterio de la CE1 o la CE2',
    malTipo.map(function (n) { return n.id; }).join(', '));

  var soloSocio = niveles.filter(function (n) {
    return n.curriculo.criterios.length === 1 &&
           (n.curriculo.criterios[0].charAt(0) === '7' ||
            n.curriculo.criterios[0].charAt(0) === '8');
  });
  t.ok(soloSocio.length === 0,
    'CU3b · ningún nivel declara la CE7 o la CE8 como criterio único: el juego NO evalúa la CE7',
    soloSocio.map(function (n) { return n.id; }).join(', '));

  /* CU4 — cobertura ACOTADA: todo saber del bloque A tiene ≥1 nivel.
     Ya NO existe «todo saber de 1.er ciclo tiene ≥1 nivel»: era imposible de
     cumplir sin amputar la lista de saberes, que es exactamente el fraude
     curricular que el test decía impedir. */
  var saberesA = Object.keys(CB.CURRICULO.saberes).filter(function (k) {
    return k.charAt(0) === 'A';
  });
  var usados = {};
  niveles.forEach(function (n) {
    usados[n.curriculo.saber] = 1;
    if (n.curriculo.saberSecundario) usados[n.curriculo.saberSecundario] = 1;
  });
  var sinNivel = saberesA.filter(function (k) { return !usados[k]; });
  t.ok(sinNivel.length === 0,
    'CU4 · los ' + saberesA.length + ' saberes del bloque A tienen al menos un nivel',
    sinNivel.join(', '));

  /* Y la contrapartida honesta: los bloques B-E NO están cubiertos y se declara */
  t.ok(CB.CURRICULO.bloques.B.cubierto === false &&
       CB.CURRICULO.bloques.C.cubierto === false &&
       CB.CURRICULO.bloques.D.cubierto === false &&
       CB.CURRICULO.bloques.E.cubierto === false,
    'los bloques B, C, D y E se declaran expresamente NO cubiertos');
  t.ok(CB.LEGAL.ALCANCE.indexOf('NO trabaja los bloques B') !== -1,
    'el alcance declarado dice literalmente qué NO cubre el juego');

  /* CU5 — ninguna ampliación es prerrequisito de una nuclear */
  t.igual(CB.grafo.ampliacionesComoPrerrequisito().length, 0,
    'CU5 · ninguna ampliación es prerrequisito de un nivel nuclear');

  /* CU6 — los 92 apuntan a uno de los 13 slugs */
  var malSlug = niveles.filter(function (n) {
    return CB.adaptativo.SLUGS.indexOf(n.destreza) === -1;
  });
  t.ok(malSlug.length === 0,
    'CU6 · los 92 niveles apuntan a uno de los 13 slugs de destreza',
    malSlug.map(function (n) { return n.id + ':' + n.destreza; }).join(', '));

  /* CU7 — la unión de los mundos es EXACTAMENTE los 92 ids */
  var union = [], repes = [];
  CB.MUNDOS.forEach(function (m) {
    m.niveles.forEach(function (id) {
      if (union.indexOf(id) !== -1) repes.push(id);
      union.push(id);
    });
  });
  var huerfanos = CB.catalogo.ids().filter(function (id) { return union.indexOf(id) === -1; });
  var fantasmas = union.filter(function (id) { return !CB.catalogo.get(id); });
  t.igual(union.length, 92, 'CU7a · los mundos suman 92 niveles');
  t.ok(repes.length === 0, 'CU7b · ningún nivel aparece en dos mundos', repes.join(', '));
  t.ok(huerfanos.length === 0, 'CU7c · ningún nivel se queda fuera de los mundos',
       huerfanos.join(', '));
  t.ok(fantasmas.length === 0, 'CU7d · ningún mundo cita un nivel inexistente',
       fantasmas.join(', '));

  /* CU8 — CB.ERRORES y recomendaciones comparten el conjunto de claves */
  var ce = Object.keys(CB.ERRORES).sort();
  var cr = Object.keys(CB.datos.RECOMENDACIONES).sort();
  t.igual(ce.length, 24, 'CU8a · hay 24 códigos de error');
  t.igual(cr.length, 24, 'CU8b · hay 24 recomendaciones');
  t.ok(ce.join('|') === cr.join('|'),
    'CU8c · CB.ERRORES y datos/recomendaciones.js tienen el MISMO conjunto de claves',
    'solo en errores: ' + ce.filter(function (k) { return cr.indexOf(k) === -1; }).join(',') +
    ' | solo en recomendaciones: ' + cr.filter(function (k) { return ce.indexOf(k) === -1; }).join(','));

  var vacias = cr.filter(function (k) {
    var r = CB.datos.RECOMENDACIONES[k];
    return !r.frase || !r.frase.length || !r.actividad || !r.actividad.length;
  });
  t.ok(vacias.length === 0, 'CU8d · toda recomendación tiene frase llana y actividad',
       vacias.join(', '));

  var conSimular = ce.filter(function (k) { return typeof CB.ERRORES[k].simular === 'function'; });
  var sinDiag = ce.filter(function (k) { return CB.ERRORES[k].diagnostico === false; });
  t.igual(conSimular.length, 18, '18 códigos tienen simular()');
  t.igual(sinDiag.length, 6, 'los 6 restantes declaran diagnostico:false');
  var incoherentes = ce.filter(function (k) {
    return (typeof CB.ERRORES[k].simular === 'function') === (CB.ERRORES[k].diagnostico === false);
  });
  t.ok(incoherentes.length === 0,
    'simular() y diagnostico:false son mutuamente excluyentes', incoherentes.join(', '));

  /* ── Rangos y contenidos concretos de 2.º ─────────────────────────────── */
  var techos = CB.CURRICULO.techoTrimestre;
  t.ok(techos[1] === 199 && techos[2] === 599 && techos[3] === 999,
    'el techo por trimestre es 199 / 599 / 999 (§6.6)');

  var fueraDeTecho = niveles.filter(function (n) {
    return n.rango[1] > techos[n.trimestreSugerido];
  });
  t.ok(fueraDeTecho.length === 0,
    'ningún nivel excede el techo numérico de su trimestre sugerido',
    fueraDeTecho.map(function (n) {
      return n.id + ' (' + n.rango[1] + ' > ' + techos[n.trimestreSugerido] + ')';
    }).join(', '));

  /* La multiplicación: M1-M8 nucleares de T3, M9-M10 ampliación */
  var mult = niveles.filter(function (n) { return n.letra === 'M'; });
  t.igual(mult.length, 10, 'hay 10 niveles de multiplicación (no 18: §8.4)');
  var nucleares = mult.filter(function (n) { return !n.ampliacion; });
  t.igual(nucleares.length, 8, 'M1-M8 son iniciación NUCLEAR, no ampliación');
  t.ok(nucleares.every(function (n) { return n.trimestreSugerido === 3; }),
    'la iniciación a la multiplicación va en el 3.er trimestre');
  t.ok(mult.filter(function (n) { return n.ampliacion; })
           .every(function (n) { return n.flagAdulto === 'tablas69'; }),
    'M9 y M10 requieren el flag del adulto');
  t.ok(CB.LEGAL.MULTIPLICACION.indexOf('segundo ciclo') !== -1,
    'el aviso sobre la multiplicación cita que el RD la sitúa en 2.º ciclo');

  /* Dinero conforme al texto literal del saber A.5 */
  t.ok(CB.gen.dinero.MONEDAS.join(',') === '1,2',
    'las MONEDAS son exactamente 1 y 2 euros, como dice el saber A.5');
  t.ok(CB.gen.dinero.BILLETES.join(',') === '5,10,20,50,100',
    'los BILLETES son 5, 10, 20, 50 y 100, incluido el de 100 que está en el texto');
  var e8 = CB.catalogo.get('E8');
  t.ok(e8.ampliacion && e8.flagAdulto === 'centimos',
    'los céntimos son ampliación apagada por defecto (son saber de 2.º ciclo)');

  /* R14 con doble llevada, apagada */
  var r14 = CB.catalogo.get('R14');
  t.ok(r14.ampliacion && r14.flagAdulto === 'restasDobleLlevada',
    'R14 (doble llevada y cero intermedio) es ampliación apagada: es contenido de 3.º');

  /* Contenidos de 2.º que el plan decidió incluir (§6.8) */
  [['S10', 'tres sumandos'], ['N13', 'aproximación a la decena'],
   ['N14', 'ordinales hasta el 20.º'], ['N6', 'pares e impares'],
   ['M8', 'doble y mitad'], ['N5', 'series']].forEach(function (par) {
    t.ok(!!CB.catalogo.get(par[0]), 'incluido: ' + par[1] + ' (' + par[0] + ')');
  });

  /* Reparto declarado */
  var cuenta = {};
  niveles.forEach(function (n) { cuenta[n.letra] = (cuenta[n.letra] || 0) + 1; });
  t.ok(cuenta.N === 16 && cuenta.S === 16 && cuenta.R === 14 && cuenta.M === 10 &&
       cuenta.P === 20 && cuenta.E === 8 && cuenta.V === 8,
    'reparto 16 N · 16 S · 14 R · 10 M · 20 P · 8 E · 8 V = 92',
    JSON.stringify(cuenta));

  /* La cita de la norma es completa dondequiera que aparezca */
  t.ok(CB.LEGAL.NORMA.indexOf('157/2022') !== -1 &&
       CB.LEGAL.NORMA.indexOf('BOE núm. 52') !== -1 &&
       CB.LEGAL.NORMA.indexOf('BOE-A-2022-3296') !== -1,
    'la norma se cita completa: número, BOE y referencia');
  t.ok(CB.LEGAL.SECUENCIACION.indexOf('por CICLO') !== -1,
    'se declara que el RD fija los saberes por ciclo, no por curso ni trimestre');
});
