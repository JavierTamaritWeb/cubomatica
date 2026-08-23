/* casos-mensajes.js — Las 10 comprobaciones M1-M10 de PLAN §14.7 */

CB.pruebas.suite('Mensajes: M1-M10 (requisitos 4 y 5)', function () {
  const t = CB.pruebas;
  const M = CB.datos.MENSAJES;

  /* Coincidencia por PALABRA COMPLETA: buscar «top» como subcadena marcaría
     «Topo Cavador» y «tropieza», y el test se acabaría desactivando. */
  function contienePalabra(texto, palabra) {
    const norm = ' ' + CB.util.normalizar(texto) + ' ';
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
  let todos = M.acierto.concat(M.animo);
  const vistos = {}, dupes = [];
  todos.forEach(function (m) {
    const n = CB.util.normalizar(m);
    if (vistos[n]) dupes.push(m); else vistos[n] = 1;
  });
  t.ok(dupes.length === 0, 'M3 · 0 duplicados tras normalizar', dupes.join(' | '));

  /* M4 — ≥20 de los 84 nombran el PROCEDIMIENTO concreto */
  const conProc = M.acierto.filter(function (m) { return m.indexOf('{proc}') !== -1; });
  t.ok(conProc.length >= 20,
    'M4 · ' + conProc.length + ' de los 84 nombran el procedimiento concreto (≥20)');
  /* Una por destreza, y la cuenta la manda la lista CERRADA de destrezas, no
     un número escrito a mano: cuando el catálogo pasó de 13 a 26 slugs esta
     línea siguió diciendo 13 y nadie se enteró de que la mitad de los niveles
     se habían quedado sin elogio propio (E146). */
  const slugs = Object.keys(CB.datos.MENSAJES.PROCEDIMIENTOS);
  t.igual(slugs.length, CB.adaptativo.SLUGS.length,
    'hay una frase de procedimiento para cada una de las ' +
    CB.adaptativo.SLUGS.length + ' destrezas');
  const sinTres = slugs.filter(function (s) {
    return CB.datos.MENSAJES.PROCEDIMIENTOS[s].length < 3;
  });
  t.ok(sinTres.length === 0, 'cada destreza tiene 3 frases de procedimiento distintas',
       sinTres.join(', '));

  /* Y lo equivalente para el ánimo: ≥20 señalan dónde mirar */
  const conPista = M.animo.filter(function (m) { return m.indexOf('{pista}') !== -1; });
  t.ok(conPista.length >= 20,
    'M4-bis · ' + conPista.length + ' de los 48 mensajes de ánimo señalan el procedimiento');

  const G = M.GRITOS;
  t.ok(G && G.acierto.length >= 20,
    'E53 · hay gritos suficientes para que no se repitan en una sesión',
    G ? String(G.acierto.length) : 'no existen');

  /* Solo hay gritos de acierto. Detrás de un fallo no se celebra: el vehículo
     del ánimo es Rocarr asintiendo, y ahí no hay dónde escribir nada. Un dato
     que no se pinta acaba pareciendo que sí, así que la lista se retiró. */
  t.ok(!G.animo, 'E53 · no quedan gritos de ánimo huérfanos en los datos');

  const largos = G.acierto.filter(function (g) { return g.length > 16; });
  t.ok(largos.length === 0,
    'E53 · ningún grito pasa de 16 caracteres: la cinta cruza en menos de 2 s',
    largos.join(' | '));

  todos = todos.concat(G.acierto);

  /* M5 — 0 elogios de PERSONA. El elogio de rasgo instala mentalidad fija:
     cada fallo posterior contradice la etiqueta. */
  const conElogio = [];
  todos.forEach(function (m) {
    M.NEGRA_PERSONA.forEach(function (p) {
      if (contienePalabra(m, p)) conElogio.push(m + ' → «' + p + '»');
    });
  });
  t.ok(conElogio.length === 0, 'M5 · 0 elogios de persona en los 132 mensajes',
       conElogio.slice(0, 3).join(' | '));

  /* M6 — 0 términos de registro impropio */
  const conRegistro = [];
  todos.forEach(function (m) {
    M.NEGRA_REGISTRO.forEach(function (p) {
      if (contienePalabra(m, p.trim())) conRegistro.push(m + ' → «' + p + '»');
    });
  });
  t.ok(conRegistro.length === 0, 'M6 · 0 términos de registro impropio o voseo',
       conRegistro.slice(0, 3).join(' | '));

  /* M7 — 120 aciertos: 0 repeticiones dentro de la categoría antes del ítem 21 */
  const perfil = CB.pruebas.perfilNuevo();
  const rng = CB.util.mulberry32(20260725);
  const porCategoria = { A: [], B: [], C: [], D: [] };
  let i;
  for (i = 0; i < 120; i++) {
    const ctx = { perfil: perfil, destreza: 'suma_llevada', rng: rng };
    const cat = CB.mensajes.categoriaAcierto(ctx);
    const m = CB.mensajes.acierto(ctx);
    porCategoria[cat].push(m);
  }
  let repiteAntesDe21 = false, detalle = '';
  Object.keys(porCategoria).forEach(function (c) {
    const lista = porCategoria[c].slice(0, 21);
    const s = {};
    let j;
    for (j = 0; j < lista.length; j++) {
      /* Se compara el MARCO, no el texto resuelto: {proc} varía cada vez. */
      const marco = lista[j].split('!')[0];
      if (s[marco]) { repiteAntesDe21 = true; detalle = c + ': ' + marco; }
      s[marco] = 1;
    }
  });
  t.ok(!repiteAntesDe21,
    'M7 · en 120 aciertos, ningún mensaje se repite dentro de su categoría antes del 21.º',
    detalle);

  const perfil2 = CB.pruebas.perfilNuevo();
  const rng2 = CB.util.mulberry32(31415);
  const vistosPorCat = { A: [], B: [], C: [], D: [] };
  for (i = 0; i < 160; i++) {
    const ctx2 = { perfil: perfil2, destreza: CB.adaptativo.SLUGS[i % CB.adaptativo.SLUGS.length], rng: rng2,
                 racha: (i % 7 === 0) ? 4 : 0, reparacion: (i % 11 === 0) };
    const cat2 = CB.mensajes.categoriaAcierto(ctx2);
    vistosPorCat[cat2].push(CB.mensajes.acierto(ctx2).split('!')[0]);
  }
  let repEnCiclo = 0;
  Object.keys(vistosPorCat).forEach(function (c) {
    const lista = vistosPorCat[c];
    let ciclo = {}, j;
    for (j = 0; j < lista.length; j++) {
      if (j % 21 === 0) ciclo = {};                 // arranca una bolsa nueva
      if (ciclo[lista[j]]) repEnCiclo++;
      ciclo[lista[j]] = 1;
    }
  });
  t.igual(repEnCiclo, 0,
    'M8 · en 160 ítems (≈40 min) ningún mensaje se repite dentro de su bolsa de 21');
  const totalUsados = Object.keys(vistosPorCat).reduce(function (a, c) {
    return a + vistosPorCat[c].length;
  }, 0);
  t.igual(totalUsados, 160, 'los 160 mensajes se han servido de verdad');

  /* Lo mismo para el ánimo, con bolsas de 24 */
  const perfil3 = CB.pruebas.perfilNuevo();
  const rng3 = CB.util.mulberry32(2718);
  const animoPorCat = { P1: [], P2: [] };
  for (i = 0; i < 96; i++) {
    const ctx3 = { perfil: perfil3, destreza: CB.adaptativo.SLUGS[i % CB.adaptativo.SLUGS.length], rng: rng3 };
    const cat3 = CB.mensajes.categoriaAnimo(ctx3);
    animoPorCat[cat3].push(CB.mensajes.animo(ctx3).split('!')[0]);
  }
  let rep3 = 0;
  Object.keys(animoPorCat).forEach(function (c) {
    const lista = animoPorCat[c];
    let ciclo = {}, j;
    for (j = 0; j < lista.length; j++) {
      if (j % 24 === 0) ciclo = {};
      if (ciclo[lista[j]]) rep3++;
      ciclo[lista[j]] = 1;
    }
  });
  t.igual(rep3, 0, 'los mensajes de ánimo tampoco se repiten dentro de su bolsa de 24');

  /* M9 — la lista negra de persona aplicada a los 120 motes */
  t.igual(CB.datos.MOTES.length, 120, 'la lista de motes tiene exactamente 120 entradas');
  const motesSucios = [];
  const negraMotes = M.NEGRA_PERSONA.concat(['veloz', 'rapido', 'rapida', 'mejor']);
  CB.datos.MOTES.forEach(function (mote) {
    negraMotes.forEach(function (p) {
      if (contienePalabra(mote, p)) motesSucios.push(mote + ' → «' + p + '»');
    });
  });
  t.ok(motesSucios.length === 0,
    'M9 · ningún mote contiene adjetivos de capacidad ni de velocidad',
    motesSucios.join(' | '));
  const motesDup = CB.datos.MOTES.filter(function (m, i, a) { return a.indexOf(m) !== i; });
  t.ok(motesDup.length === 0, 'no hay motes repetidos', motesDup.join(', '));

  /* M10 — signos de apertura */
  const malSignos = [];
  todos.concat(Object.keys(CB.datos.MENSAJES.PROCEDIMIENTOS).reduce(function (acc, k) {
    return acc.concat(CB.datos.MENSAJES.PROCEDIMIENTOS[k], CB.datos.MENSAJES.PISTAS[k]);
  }, [])).forEach(function (m) {
    const abre = (m.match(/¡/g) || []).length, cierra = (m.match(/!/g) || []).length;
    const abreI = (m.match(/¿/g) || []).length, cierraI = (m.match(/\?/g) || []).length;
    if (abre !== cierra || abreI !== cierraI) malSignos.push(m);
  });
  t.ok(malSignos.length === 0,
    'M10 · toda exclamación abre con ¡ y cierra con !, y toda interrogación con ¿ y ?',
    malSignos.slice(0, 3).join(' | '));

  /* Ortografía: los mensajes son material escolar */
  const sinTilde = [];
  const exigen = { mas: 'más', numero: 'número', cuantos: 'cuántos', despues: 'después',
                 tambien: 'también', esta: null, aqui: 'aquí', asi: 'así' };
  todos.forEach(function (m) {
    CB.util.palabras(m.toLowerCase().replace(/[¡!¿?.,:«»…]/g, '')).forEach(function (w) {
      if (exigen[w]) sinTilde.push(m + ' → «' + w + '»');
    });
  });
  t.ok(sinTilde.length === 0, 'ninguna forma que exige tilde aparece sin ella',
       sinTilde.slice(0, 3).join(' | '));
});

/* E146 · TODA DESTREZA TIENE PISTA Y ELOGIO PROPIOS (3.4.4). Las dos tablas se
   escribieron con los 13 slugs de 2.º y no crecieron con el catálogo: en 127 de
   los 308 niveles el botón «Pista» contestaba «Léelo otra vez con calma» —que
   no es una pista— y el elogio decía «Has resuelto el bloque», que no nombra
   ningún procedimiento y por tanto no enseña nada. Se comprueba contra la lista
   CERRADA de destrezas y EN LOS DOS SENTIDOS, como CU8 con los códigos de
   error: una destreza nueva sin pista se pone roja el día que se declara. */
CB.pruebas.suite('E146 · toda destreza tiene pista y elogio propios', function () {
  const t = CB.pruebas;
  const slugs = CB.adaptativo.SLUGS;

  [['PISTAS', 2], ['PROCEDIMIENTOS', 3]].forEach(function (par) {
    const tabla = CB.datos.MENSAJES[par[0]];
    const claves = Object.keys(tabla);
    const faltan = slugs.filter(function (s) { return claves.indexOf(s) === -1; });
    const sobran = claves.filter(function (s) { return slugs.indexOf(s) === -1; });
    t.igual(faltan.length, 0,
      'E146 · ' + par[0] + ' cubre las ' + slugs.length + ' destrezas', faltan.join(', '));
    t.igual(sobran.length, 0,
      'E146 · y no habla de ninguna que no exista', sobran.join(', '));
    const flojas = claves.filter(function (s) {
      const f = tabla[s];
      return !Array.isArray(f) || f.length < par[1] ||
             f.some(function (x) { return typeof x !== 'string' || x.trim().length < 12; });
    });
    t.igual(flojas.length, 0,
      'E146 · cada entrada de ' + par[0] + ' trae sus ' + par[1] + ' frases llanas',
      flojas.join(', '));
  });

  /* Y lo que ve el niño: el botón da LA pista de SU destreza, no una genérica.
     Se pulsa la acción de verdad y se lee el nodo de mensaje. */
  const estadoPrevio = CB.partida.estado;
  const genericas = [];
  slugs.forEach(function (slug) {
    CB.partida.estado = { itemActual: { destreza: slug, consigna: '1 + 1' } };
    CB.partida.accionPista();
    const nodo = CB.ui.nodoMensaje();
    const texto = nodo ? nodo.textContent || '' : '';
    const suya = CB.datos.MENSAJES.PISTAS[slug];
    if (!suya || texto.indexOf(suya[1]) === -1) genericas.push(slug);
  });
  t.igual(genericas.length, 0,
    'E146 · el botón de pista da la pista de esa destreza en las ' + slugs.length,
    genericas.join(', '));
  CB.partida.estado = estadoPrevio;
  CB.ui.ocultarMensaje();

  /* Y el elogio nombra el procedimiento en vez del comodín. */
  const sinProc = slugs.filter(function (slug) {
    const frase = CB.mensajes.rellenar('{proc}', { destreza: slug },
      CB.util.mulberry32(3));
    return !frase || frase === 'Has resuelto el bloque.';
  });
  t.igual(sinProc.length, 0,
    'E146 · el elogio nombra el procedimiento en las ' + slugs.length + ' destrezas',
    sinProc.join(', '));
});
