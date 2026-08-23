/* casos-curriculo.js — Las 8 comprobaciones CU1-CU8 de PLAN §6.3 */

CB.pruebas.suite('Currículo: CU1-CU8', function () {
  const t = CB.pruebas;
  const niveles = CB.catalogo.todos();

  /* CU1 — el saber declarado EXISTE en la transcripción del RD */
  const malSaber = niveles.filter(function (n) {
    if (!CB.CURRICULO.saberes[n.curriculo.saber]) return true;
    if (n.curriculo.saberSecundario &&
        !CB.CURRICULO.saberes[n.curriculo.saberSecundario]) return true;
    return false;
  });
  t.ok(malSaber.length === 0,
    'CU1 · los ' + niveles.length + ' niveles declaran un saber que existe en CB.CURRICULO.saberes',
    malSaber.map(function (n) { return n.id + ':' + n.curriculo.saber; }).join(', '));

  /* CU2 — los criterios declarados EXISTEN */
  const malCrit = [];
  niveles.forEach(function (n) {
    n.curriculo.criterios.forEach(function (c) {
      if (!CB.CURRICULO.criterios[c]) malCrit.push(n.id + ':' + c);
    });
  });
  t.ok(malCrit.length === 0,
    'CU2 · todos los criterios declarados existen en CB.CURRICULO.criterios',
    malCrit.join(', '));

  /* CU3 — compatibilidad tipo ↔ criterio */
  const malTipo = niveles.filter(function (n) {
    if (n.letra !== 'P') return false;
    return !n.curriculo.criterios.some(function (c) {
      return c.charAt(0) === '1' || c.charAt(0) === '2';
    });
  });
  t.ok(malTipo.length === 0,
    'CU3a · todo nivel PROBLEMA_* declara ≥1 criterio de la CE1 o la CE2',
    malTipo.map(function (n) { return n.id; }).join(', '));

  const soloSocio = niveles.filter(function (n) {
    return n.curriculo.criterios.length === 1 &&
           (n.curriculo.criterios[0].charAt(0) === '7' ||
            n.curriculo.criterios[0].charAt(0) === '8');
  });
  t.ok(soloSocio.length === 0,
    'CU3b · ningún nivel declara la CE7 o la CE8 como criterio único: el juego NO evalúa la CE7',
    soloSocio.map(function (n) { return n.id; }).join(', '));

  const saberesA = Object.keys(CB.CURRICULO.saberes).filter(function (k) {
    return k.charAt(0) === 'A';
  });
  const usados = {};
  niveles.forEach(function (n) {
    usados[n.curriculo.saber] = 1;
    if (n.curriculo.saberSecundario) usados[n.curriculo.saberSecundario] = 1;
  });
  const sinNivel = saberesA.filter(function (k) { return !usados[k]; });
  t.ok(sinNivel.length === 0,
    'CU4 · los ' + saberesA.length + ' saberes del bloque A tienen al menos un nivel',
    sinNivel.join(', '));

  /* Desde 3.4.0 los cinco sentidos están cubiertos y el texto legal lo dice.
     El texto legal y esta aserción cambian JUNTOS, siempre. */
  t.ok(CB.CURRICULO.bloques.B.cubierto === true,
    'el bloque B (medida) se declara cubierto desde 3.2.0');
  t.ok(CB.CURRICULO.bloques.E.cubierto === true,
    'el bloque E (estocástico) se declara cubierto desde 3.3.0');
  t.ok(CB.CURRICULO.bloques.C.cubierto === true &&
       CB.CURRICULO.bloques.D.cubierto === true,
    'los bloques C (espacial) y D (algebraico) se declaran cubiertos desde 3.4.0');
  t.ok(CB.LEGAL.ALCANCE.indexOf('C (Sentido espacial)') !== -1 &&
       CB.LEGAL.ALCANCE.indexOf('D (Sentido algebraico)') !== -1 &&
       CB.LEGAL.ALCANCE.indexOf('B (Sentido de la medida)') !== -1 &&
       CB.LEGAL.ALCANCE.indexOf('E (Sentido estocástico)') !== -1 &&
       CB.LEGAL.ALCANCE.indexOf('no la sustituye') !== -1,
    'el alcance declarado nombra los cinco sentidos y no sustituye al aula');

  /* Todos los saberes de bloque B declarados tienen al menos un nivel. */
  const saberesB = Object.keys(CB.CURRICULO.saberes).filter(function (k) {
    return k.charAt(0) === 'B';
  });
  const sinNivelB = saberesB.filter(function (k) { return !usados[k]; });
  t.ok(saberesB.length >= 8 && sinNivelB.length === 0,
    'los ' + saberesB.length + ' saberes del bloque B tienen al menos un nivel',
    sinNivelB.join(', '));

  /* Todos los saberes del bloque E declarados tienen al menos un nivel. */
  const saberesE = Object.keys(CB.CURRICULO.saberes).filter(function (k) {
    return k.charAt(0) === 'E';
  });
  const sinNivelE = saberesE.filter(function (k) { return !usados[k]; });
  t.ok(saberesE.length >= 6 && sinNivelE.length === 0,
    'los ' + saberesE.length + ' saberes del bloque E tienen al menos un nivel',
    sinNivelE.join(', '));

  /* Todos los saberes de los bloques D y C declarados tienen al menos un
     nivel (3.4.0). */
  const saberesD = Object.keys(CB.CURRICULO.saberes).filter(function (k) {
    return k.charAt(0) === 'D';
  });
  const sinNivelD = saberesD.filter(function (k) { return !usados[k]; });
  t.ok(saberesD.length >= 7 && sinNivelD.length === 0,
    'los ' + saberesD.length + ' saberes del bloque D tienen al menos un nivel',
    sinNivelD.join(', '));
  const saberesC = Object.keys(CB.CURRICULO.saberes).filter(function (k) {
    return k.charAt(0) === 'C';
  });
  const sinNivelC = saberesC.filter(function (k) { return !usados[k]; });
  t.ok(saberesC.length >= 6 && sinNivelC.length === 0,
    'los ' + saberesC.length + ' saberes del bloque C tienen al menos un nivel',
    sinNivelC.join(', '));

  /* CU5 — ninguna ampliación es prerrequisito de una nuclear */
  t.igual(CB.grafo.ampliacionesComoPrerrequisito().length, 0,
    'CU5 · ninguna ampliación es prerrequisito de un nivel nuclear');

  /* CU6 — todos los niveles apuntan a uno de los slugs declarados */
  const malSlug = niveles.filter(function (n) {
    return CB.adaptativo.SLUGS.indexOf(n.destreza) === -1;
  });
  t.igual(CB.adaptativo.SLUGS.length, 26, 'CU6 · hay 26 slugs de destreza (22 + los 4 del algebraico y el espacial)');
  t.ok(malSlug.length === 0,
    'CU6 · los ' + niveles.length + ' niveles apuntan a uno de los ' +
    CB.adaptativo.SLUGS.length + ' slugs de destreza',
    malSlug.map(function (n) { return n.id + ':' + n.destreza; }).join(', '));

  /* CU7 — la unión de los mundos es EXACTAMENTE los 92 ids */
  const union = [], repes = [];
  CB.MUNDOS.forEach(function (m) {
    m.niveles.forEach(function (id) {
      if (union.indexOf(id) !== -1) repes.push(id);
      union.push(id);
    });
  });
  const huerfanos = CB.catalogo.ids().filter(function (id) { return union.indexOf(id) === -1; });
  const fantasmas = union.filter(function (id) { return !CB.catalogo.get(id); });
  t.igual(union.length, 308, 'CU7a · los mundos suman 308 niveles (los seis cursos y los cinco sentidos)');
  t.ok(repes.length === 0, 'CU7b · ningún nivel aparece en dos mundos', repes.join(', '));
  t.ok(huerfanos.length === 0, 'CU7c · ningún nivel se queda fuera de los mundos',
       huerfanos.join(', '));
  t.ok(fantasmas.length === 0, 'CU7d · ningún mundo cita un nivel inexistente',
       fantasmas.join(', '));

  /* CU8 — CB.ERRORES y recomendaciones comparten el conjunto de claves */
  const ce = Object.keys(CB.ERRORES).sort();
  const cr = Object.keys(CB.datos.RECOMENDACIONES).sort();
  t.igual(ce.length, 47, 'CU8a · hay 47 códigos de error (42 + los 5 del algebraico y el espacial)');
  t.igual(cr.length, 47, 'CU8b · hay 47 recomendaciones');
  t.ok(ce.join('|') === cr.join('|'),
    'CU8c · CB.ERRORES y datos/recomendaciones.js tienen el MISMO conjunto de claves',
    'solo en errores: ' + ce.filter(function (k) { return cr.indexOf(k) === -1; }).join(',') +
    ' | solo en recomendaciones: ' + cr.filter(function (k) { return ce.indexOf(k) === -1; }).join(','));

  const vacias = cr.filter(function (k) {
    const r = CB.datos.RECOMENDACIONES[k];
    return !r.frase || !r.frase.length || !r.actividad || !r.actividad.length;
  });
  t.ok(vacias.length === 0, 'CU8d · toda recomendación tiene frase llana y actividad',
       vacias.join(', '));

  const conSimular = ce.filter(function (k) { return typeof CB.ERRORES[k].simular === 'function'; });
  const sinDiag = ce.filter(function (k) { return CB.ERRORES[k].diagnostico === false; });
  t.igual(conSimular.length, 36, '36 códigos tienen simular()');
  t.igual(sinDiag.length, 11, 'los 11 restantes declaran diagnostico:false');
  const incoherentes = ce.filter(function (k) {
    return (typeof CB.ERRORES[k].simular === 'function') === (CB.ERRORES[k].diagnostico === false);
  });
  t.ok(incoherentes.length === 0,
    'simular() y diagnostico:false son mutuamente excluyentes', incoherentes.join(', '));

  /* Rangos: el techo es ahora POR CURSO y trimestre (3.0.0) */
  const techosCurso = CB.CURRICULO.techoCurso;
  t.ok(techosCurso[2][1] === 199 && techosCurso[2][2] === 599 && techosCurso[2][3] === 999,
    'el techo de 2.º sigue siendo 199 / 599 / 999 (§6.6)');
  t.ok(techosCurso[1][1] === 20 && techosCurso[1][2] === 59 && techosCurso[1][3] === 99,
    'el techo de 1.º es 20 / 59 / 99');
  t.ok(CB.CURRICULO.techoTrimestre[1] === techosCurso[2][1] &&
       CB.CURRICULO.techoTrimestre[2] === techosCurso[2][2] &&
       CB.CURRICULO.techoTrimestre[3] === techosCurso[2][3],
    'el alias techoTrimestre coincide con la fila de 2.º');

  const fueraDeTecho = niveles.filter(function (n) {
    const fila = techosCurso[n.curso] || techosCurso[2];
    return n.rango[1] > fila[n.trimestreSugerido];
  });
  t.ok(fueraDeTecho.length === 0,
    'ningún nivel excede el techo numérico de su curso y trimestre sugerido',
    fueraDeTecho.map(function (n) {
      return n.id + ' (' + n.rango[1] + ' > techo de ' + n.curso + '.º T' +
             n.trimestreSugerido + ')';
    }).join(', '));

  /* La multiplicación DE 2.º: M1-M8 nucleares de T3, M9-M10 ampliación. Los
     M11-M22 de 3.º-5.º son otra cosa: tablas completas y factores grandes. */
  const mult = niveles.filter(function (n) { return n.letra === 'M' && n.curso === 2; });
  t.igual(mult.length, 10, 'hay 10 niveles de multiplicación en 2.º (no 18: §8.4)');
  const nucleares = mult.filter(function (n) { return !n.ampliacion; });
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
  const e8 = CB.catalogo.get('E8');
  t.ok(e8.ampliacion && e8.flagAdulto === 'centimos',
    'los céntimos son ampliación apagada por defecto (son saber de 2.º ciclo)');

  /* R14 con doble llevada, apagada */
  const r14 = CB.catalogo.get('R14');
  t.ok(r14.ampliacion && r14.flagAdulto === 'restasDobleLlevada',
    'R14 (doble llevada y cero intermedio) es ampliación apagada: es contenido de 3.º');

  /* Contenidos de 2.º que el plan decidió incluir (§6.8) */
  [['S10', 'tres sumandos'], ['N13', 'aproximación a la decena'],
   ['N14', 'ordinales hasta el 20.º'], ['N6', 'pares e impares'],
   ['M8', 'doble y mitad'], ['N5', 'series']].forEach(function (par) {
    t.ok(!!CB.catalogo.get(par[0]), 'incluido: ' + par[1] + ' (' + par[0] + ')');
  });

  /* Reparto declarado, por letra y por curso */
  const cuenta = {};
  niveles.forEach(function (n) { cuenta[n.letra] = (cuenta[n.letra] || 0) + 1; });
  t.ok(cuenta.N === 44 && cuenta.S === 26 && cuenta.R === 23 && cuenta.M === 22 &&
       cuenta.P === 44 && cuenta.E === 14 && cuenta.V === 8 &&
       cuenta.D === 17 && cuenta.F === 20 && cuenta.C === 15 &&
       cuenta.T === 6 && cuenta.Z === 4 && cuenta.B === 15 && cuenta.H === 6 &&
       cuenta.G === 12 && cuenta.A === 7 &&
       cuenta.U === 6 && cuenta.X === 6 && cuenta.J === 7 && cuenta.K === 6,
    'reparto 44 N · 26 S · 23 R · 22 M · 44 P · 14 E · 8 V · 17 D · 20 F · 15 C · 6 T · 4 Z · 15 B · 6 H · 12 G · 7 A · 6 U · 6 X · 7 J · 6 K = 308',
    JSON.stringify(cuenta));

  const porCurso = {};
  niveles.forEach(function (n) { porCurso[n.curso] = (porCurso[n.curso] || 0) + 1; });
  t.ok(porCurso[1] === 29 && porCurso[2] === 102 && porCurso[3] === 47 &&
       porCurso[4] === 45 && porCurso[5] === 41 && porCurso[6] === 44,
    'por curso: 29 · 102 · 47 · 45 · 41 · 44 (los 92 numéricos de 2.º, intactos)',
    JSON.stringify(porCurso));

  /* La cita de la norma es completa dondequiera que aparezca */
  t.ok(CB.LEGAL.NORMA.indexOf('157/2022') !== -1 &&
       CB.LEGAL.NORMA.indexOf('BOE núm. 52') !== -1 &&
       CB.LEGAL.NORMA.indexOf('BOE-A-2022-3296') !== -1,
    'la norma se cita completa: número, BOE y referencia');
  t.ok(CB.LEGAL.SECUENCIACION.indexOf('por CICLO') !== -1,
    'se declara que el RD fija los saberes por ciclo, no por curso ni trimestre');
});
