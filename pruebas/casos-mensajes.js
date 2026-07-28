/* casos-mensajes.js — Las 10 comprobaciones M1-M10 de PLAN §14.7
   Requisitos 4 y 5 del usuario: enhorabuena variada y ánimo al fallar. */

CB.pruebas.suite('Mensajes: M1-M10 (requisitos 4 y 5)', function () {
  var t = CB.pruebas;
  var M = CB.datos.MENSAJES;

  /* Coincidencia por PALABRA COMPLETA: buscar «top» como subcadena marcaría
     «Topo Cavador» y «tropieza», y el test se acabaría desactivando. */
  function contienePalabra(texto, palabra) {
    var norm = ' ' + CB.util.normalizar(texto) + ' ';
    return norm.indexOf(' ' + CB.util.normalizar(palabra) + ' ') !== -1;
  }

  /* M1 — cantidades EXACTAS. v1 pedía «≥80 y ≥45», más laxo que lo diseñado:
     admitía entregar menos de lo prometido. */
  t.igual(M.acierto.length, 84, 'M1a · exactamente 84 mensajes de acierto');
  t.igual(M.animo.length, 48, 'M1b · exactamente 48 mensajes de ánimo');

  /* M2 — por categoría */
  t.igual(M.acierto_A.length, 21, 'M2a · categoría A (procedimiento): 21');
  t.igual(M.acierto_B.length, 21, 'M2b · categoría B (esfuerzo): 21');
  t.igual(M.acierto_C.length, 21, 'M2c · categoría C (superación): 21');
  t.igual(M.acierto_D.length, 21, 'M2d · categoría D (descubrimiento): 21');
  t.igual(M.animo_P1.length, 24, 'M2e · categoría P1 (mira otra vez): 24');
  t.igual(M.animo_P2.length, 24, 'M2f · categoría P2 (el error enseña): 24');

  /* M3 — 0 duplicados tras normalizar */
  var todos = M.acierto.concat(M.animo);
  var vistos = {}, dupes = [];
  todos.forEach(function (m) {
    var n = CB.util.normalizar(m);
    if (vistos[n]) dupes.push(m); else vistos[n] = 1;
  });
  t.ok(dupes.length === 0, 'M3 · 0 duplicados tras normalizar', dupes.join(' | '));

  /* M4 — ≥20 de los 84 nombran el PROCEDIMIENTO concreto */
  var conProc = M.acierto.filter(function (m) { return m.indexOf('{proc}') !== -1; });
  t.ok(conProc.length >= 20,
    'M4 · ' + conProc.length + ' de los 84 nombran el procedimiento concreto (≥20)');
  var slugs = Object.keys(CB.datos.MENSAJES.PROCEDIMIENTOS);
  t.igual(slugs.length, 13, 'hay una frase de procedimiento para cada una de las 13 destrezas');
  var sinTres = slugs.filter(function (s) {
    return CB.datos.MENSAJES.PROCEDIMIENTOS[s].length < 3;
  });
  t.ok(sinTres.length === 0, 'cada destreza tiene 3 frases de procedimiento distintas',
       sinTres.join(', '));

  /* Y lo equivalente para el ánimo: ≥20 señalan dónde mirar */
  var conPista = M.animo.filter(function (m) { return m.indexOf('{pista}') !== -1; });
  t.ok(conPista.length >= 20,
    'M4-bis · ' + conPista.length + ' de los 48 mensajes de ánimo señalan el procedimiento');

  /* E53 · LOS GRITOS PASAN POR EL MISMO FILTRO. Son texto que el niño lee, igual
     que los 132 mensajes, y el hecho de que sean cortos y vivan en otra lista no
     los exime de nada. Un criterio aplicado en un sitio de dos es exactamente la
     tercera familia de fallo de este proyecto (E44: el cerrojo de una respuesta
     por intento estaba en la partida y faltaba en el jefe y en la calibración). */
  var G = M.GRITOS;
  t.ok(G && G.acierto.length >= 20,
    'E53 · hay gritos suficientes para que no se repitan en una sesión',
    G ? String(G.acierto.length) : 'no existen');

  /* Solo hay gritos de acierto. Detrás de un fallo no se celebra: el vehículo
     del ánimo es Rocarr asintiendo, y ahí no hay dónde escribir nada. Un dato
     que no se pinta acaba pareciendo que sí, así que la lista se retiró. */
  t.ok(!G.animo, 'E53 · no quedan gritos de ánimo huérfanos en los datos');

  var largos = G.acierto.filter(function (g) { return g.length > 16; });
  t.ok(largos.length === 0,
    'E53 · ningún grito pasa de 16 caracteres: la cinta cruza en menos de 2 s',
    largos.join(' | '));

  todos = todos.concat(G.acierto);

  /* M5 — 0 elogios de PERSONA. El elogio de rasgo instala mentalidad fija:
     cada fallo posterior contradice la etiqueta. */
  var conElogio = [];
  todos.forEach(function (m) {
    M.NEGRA_PERSONA.forEach(function (p) {
      if (contienePalabra(m, p)) conElogio.push(m + ' → «' + p + '»');
    });
  });
  t.ok(conElogio.length === 0, 'M5 · 0 elogios de persona en los 132 mensajes',
       conElogio.slice(0, 3).join(' | '));

  /* M6 — 0 términos de registro impropio */
  var conRegistro = [];
  todos.forEach(function (m) {
    M.NEGRA_REGISTRO.forEach(function (p) {
      if (contienePalabra(m, p.trim())) conRegistro.push(m + ' → «' + p + '»');
    });
  });
  t.ok(conRegistro.length === 0, 'M6 · 0 términos de registro impropio o voseo',
       conRegistro.slice(0, 3).join(' | '));

  /* M7 — 120 aciertos: 0 repeticiones dentro de la categoría antes del ítem 21 */
  var perfil = CB.pruebas.perfilNuevo();
  var rng = CB.util.mulberry32(20260725);
  var porCategoria = { A: [], B: [], C: [], D: [] };
  var i;
  for (i = 0; i < 120; i++) {
    var ctx = { perfil: perfil, destreza: 'suma_llevada', rng: rng };
    var cat = CB.mensajes.categoriaAcierto(ctx);
    var m = CB.mensajes.acierto(ctx);
    porCategoria[cat].push(m);
  }
  var repiteAntesDe21 = false, detalle = '';
  Object.keys(porCategoria).forEach(function (c) {
    var lista = porCategoria[c].slice(0, 21);
    var s = {}, j;
    for (j = 0; j < lista.length; j++) {
      /* Se compara el MARCO, no el texto resuelto: {proc} varía cada vez. */
      var marco = lista[j].split('!')[0];
      if (s[marco]) { repiteAntesDe21 = true; detalle = c + ': ' + marco; }
      s[marco] = 1;
    }
  });
  t.ok(!repiteAntesDe21,
    'M7 · en 120 aciertos, ningún mensaje se repite dentro de su categoría antes del 21.º',
    detalle);

  /* M8 — 40 minutos de juego sin ver dos veces el mismo mensaje.
     Se mide POR CATEGORÍA, que es donde vive la bolsa: exigir que no se repita
     dentro de una ventana GLOBAL de 21 sería un criterio distinto del diseñado
     y fallaría contra código correcto. A un ítem cada 15 s, 40 minutos son 160
     ítems. */
  var perfil2 = CB.pruebas.perfilNuevo();
  var rng2 = CB.util.mulberry32(31415);
  var vistosPorCat = { A: [], B: [], C: [], D: [] };
  for (i = 0; i < 160; i++) {
    var ctx2 = { perfil: perfil2, destreza: CB.adaptativo.SLUGS[i % 13], rng: rng2,
                 racha: (i % 7 === 0) ? 4 : 0, reparacion: (i % 11 === 0) };
    var cat2 = CB.mensajes.categoriaAcierto(ctx2);
    vistosPorCat[cat2].push(CB.mensajes.acierto(ctx2).split('!')[0]);
  }
  var repEnCiclo = 0, detalle2 = '';
  Object.keys(vistosPorCat).forEach(function (c) {
    var lista = vistosPorCat[c], ciclo = {}, j;
    for (j = 0; j < lista.length; j++) {
      if (j % 21 === 0) ciclo = {};                 // arranca una bolsa nueva
      if (ciclo[lista[j]]) { repEnCiclo++; detalle2 = c + ': ' + lista[j]; }
      ciclo[lista[j]] = 1;
    }
  });
  t.igual(repEnCiclo, 0,
    'M8 · en 160 ítems (≈40 min) ningún mensaje se repite dentro de su bolsa de 21');
  var totalUsados = Object.keys(vistosPorCat).reduce(function (a, c) {
    return a + vistosPorCat[c].length;
  }, 0);
  t.igual(totalUsados, 160, 'los 160 mensajes se han servido de verdad');

  /* Lo mismo para el ánimo, con bolsas de 24 */
  var perfil3 = CB.pruebas.perfilNuevo();
  var rng3 = CB.util.mulberry32(2718);
  var animoPorCat = { P1: [], P2: [] };
  for (i = 0; i < 96; i++) {
    var ctx3 = { perfil: perfil3, destreza: CB.adaptativo.SLUGS[i % 13], rng: rng3 };
    var cat3 = CB.mensajes.categoriaAnimo(ctx3);
    animoPorCat[cat3].push(CB.mensajes.animo(ctx3).split('!')[0]);
  }
  var rep3 = 0;
  Object.keys(animoPorCat).forEach(function (c) {
    var lista = animoPorCat[c], ciclo = {}, j;
    for (j = 0; j < lista.length; j++) {
      if (j % 24 === 0) ciclo = {};
      if (ciclo[lista[j]]) rep3++;
      ciclo[lista[j]] = 1;
    }
  });
  t.igual(rep3, 0, 'los mensajes de ánimo tampoco se repiten dentro de su bolsa de 24');

  /* M9 — la lista negra de persona aplicada a los 120 motes */
  t.igual(CB.datos.MOTES.length, 120, 'la lista de motes tiene exactamente 120 entradas');
  var motesSucios = [];
  var negraMotes = M.NEGRA_PERSONA.concat(['veloz', 'rapido', 'rapida', 'mejor']);
  CB.datos.MOTES.forEach(function (mote) {
    negraMotes.forEach(function (p) {
      if (contienePalabra(mote, p)) motesSucios.push(mote + ' → «' + p + '»');
    });
  });
  t.ok(motesSucios.length === 0,
    'M9 · ningún mote contiene adjetivos de capacidad ni de velocidad',
    motesSucios.join(' | '));
  var motesDup = CB.datos.MOTES.filter(function (m, i, a) { return a.indexOf(m) !== i; });
  t.ok(motesDup.length === 0, 'no hay motes repetidos', motesDup.join(', '));

  /* M10 — signos de apertura */
  var malSignos = [];
  todos.concat(Object.keys(CB.datos.MENSAJES.PROCEDIMIENTOS).reduce(function (acc, k) {
    return acc.concat(CB.datos.MENSAJES.PROCEDIMIENTOS[k], CB.datos.MENSAJES.PISTAS[k]);
  }, [])).forEach(function (m) {
    var abre = (m.match(/¡/g) || []).length, cierra = (m.match(/!/g) || []).length;
    var abreI = (m.match(/¿/g) || []).length, cierraI = (m.match(/\?/g) || []).length;
    if (abre !== cierra || abreI !== cierraI) malSignos.push(m);
  });
  t.ok(malSignos.length === 0,
    'M10 · toda exclamación abre con ¡ y cierra con !, y toda interrogación con ¿ y ?',
    malSignos.slice(0, 3).join(' | '));

  /* Ortografía: los mensajes son material escolar */
  var sinTilde = [];
  var exigen = { mas: 'más', numero: 'número', cuantos: 'cuántos', despues: 'después',
                 tambien: 'también', esta: null, aqui: 'aquí', asi: 'así' };
  todos.forEach(function (m) {
    CB.util.palabras(m.toLowerCase().replace(/[¡!¿?.,:«»…]/g, '')).forEach(function (w) {
      if (exigen[w]) sinTilde.push(m + ' → «' + w + '»');
    });
  });
  t.ok(sinTilde.length === 0, 'ninguna forma que exige tilde aparece sin ella',
       sinTilde.slice(0, 3).join(' | '));
});
