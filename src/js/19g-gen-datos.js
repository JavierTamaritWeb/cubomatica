/* 19g-gen-datos.js — Sentido estocástico (3.3.0): G1…G12 (CB.gen.datos) y
   A1…A7 (CB.gen.azar). Dos reglas de la casa: el color NUNCA lleva la
   información él solo (la consigna dice los recuentos con palabras, y las
   barras del gráfico se distinguen por su etiqueta, no por su tinte), y toda
   pregunta de azar tiene UNA respuesta inequívoca — «posible» a secas nunca es
   opción, porque cuando algo es seguro también es posible. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.datos = {};
CB.gen.azar = {};

/* Temas de los gráficos: 4 categorías por tema, en plural. Lista CERRADA. */
const TEMAS_DATOS = [
  ['perros', 'gatos', 'peces', 'pájaros'],
  ['manzanas', 'peras', 'plátanos', 'fresas'],
  ['canicas', 'cromos', 'puzles', 'cuentos'],
  ['coches', 'trenes', 'barcos', 'aviones']
];

/* Colores de las bolas de la bolsa, en femenino singular («bola roja»). */
const COLORES_BOLA = ['roja', 'azul', 'verde', 'amarilla', 'naranja', 'morada'];

/* Un gráfico de barras: nCats categorías de un tema, con valores DISTINTOS
   entre minV y maxV (distintos para que «el que más» y «el que menos» sean
   siempre inequívocos). Devuelve { filas, valores, nombres }. */
function hacerGrafico(rng, nCats, minV, maxV) {
  const tema = CB.util.elegir(rng, TEMAS_DATOS);
  const nombres = CB.util.barajar(tema.slice(), rng).slice(0, nCats);
  const posibles = [];
  let v;
  for (v = minV; v <= maxV; v++) posibles.push(v);
  const valores = CB.util.barajar(posibles, rng).slice(0, nCats);
  const filas = nombres.map(function (n, i) {
    return { nombre: n, valor: valores[i] };
  });
  return { filas: filas, valores: valores, nombres: nombres };
}
CB.gen.datos._hacerGrafico = hacerGrafico;

/* G1 El gráfico de los juguetes (1.º): leer una barra, valores pequeños. */
CB.gen.datos.G1 = function (rng, D) {
  const g = hacerGrafico(rng, 3, 1, (D === 1) ? 6 : 9);
  const i = CB.util.ent(rng, 0, 2);
  return {
    formato: 'teclado',
    consigna: 'Mira el gráfico. ¿Cuántos ' + g.nombres[i] + ' hay?',
    visual: { tipo: 'barras', filas: g.filas },
    respuesta: g.valores[i],
    datosGrafico: g.valores.slice(),
    expr: 'g1_' + g.valores.join('-') + '_' + i,
    diagnostico: true
  };
};

/* G2 Leer el gráfico de barras (2.º): cuatro barras, valores mayores. */
CB.gen.datos.G2 = function (rng, D) {
  const g = hacerGrafico(rng, 4, 1, (D === 1) ? 8 : 12);
  const i = CB.util.ent(rng, 0, 3);
  return {
    formato: 'teclado',
    consigna: 'Mira el gráfico. ¿Cuántos ' + g.nombres[i] + ' hay?',
    visual: { tipo: 'barras', filas: g.filas },
    respuesta: g.valores[i],
    datosGrafico: g.valores.slice(),
    expr: 'g2_' + g.valores.join('-') + '_' + i,
    diagnostico: true
  };
};

/* G3 El que más y el que menos (2.º): la respuesta es una CATEGORÍA (cadena,
   mecanismo 'c20'), y los valores distintos garantizan que es única. */
CB.gen.datos.G3 = function (rng, D) {
  const g = hacerGrafico(rng, 4, 1, (D === 1) ? 8 : 12);
  const buscaMax = rng() < 0.5;
  let mejor = 0, i;
  for (i = 1; i < 4; i++) {
    if (buscaMax ? g.valores[i] > g.valores[mejor]
                 : g.valores[i] < g.valores[mejor]) mejor = i;
  }
  return {
    formato: 'opciones4',
    consigna: 'Mira el gráfico. ¿De qué hay ' + (buscaMax ? 'MÁS' : 'MENOS') + '?',
    visual: { tipo: 'barras', filas: g.filas },
    respuesta: g.nombres[mejor],
    respuestaFraccion: true,
    distractoresFijos: g.nombres.filter(function (n, j) { return j !== mejor; }),
    expr: 'g3_' + g.valores.join('-') + (buscaMax ? 'M' : 'm'),
    diagnostico: false
  };
};

/* G4 Los votos de la clase (3.º): sumar dos barras. */
CB.gen.datos.G4 = function (rng, D) {
  const g = hacerGrafico(rng, 4, 2, (D === 1) ? 8 : 12);
  const par = CB.util.barajar([0, 1, 2, 3], rng).slice(0, 2);
  const a = par[0], b = par[1];
  return {
    formato: 'teclado',
    consigna: 'Mira el gráfico. ¿Cuántos ' + g.nombres[a] + ' y ' +
              g.nombres[b] + ' hay entre los dos?',
    visual: { tipo: 'barras', filas: g.filas },
    operacion: '+', operandos: [g.valores[a], g.valores[b]],
    respuesta: g.valores[a] + g.valores[b],
    datosGrafico: g.valores.slice(),
    expr: 'g4_' + g.valores.join('-') + '_' + a + b,
    diagnostico: true
  };
};

/* G5 ¿Cuántos más? (3.º): la diferencia entre dos barras. */
CB.gen.datos.G5 = function (rng, D) {
  const g = hacerGrafico(rng, 4, 1, (D === 1) ? 9 : 12);
  const par = CB.util.barajar([0, 1, 2, 3], rng).slice(0, 2);
  const a = (g.valores[par[0]] > g.valores[par[1]]) ? par[0] : par[1];
  const b = (a === par[0]) ? par[1] : par[0];
  return {
    formato: 'teclado',
    consigna: 'Mira el gráfico. ¿Cuántos ' + g.nombres[a] + ' hay MÁS que ' +
              g.nombres[b] + '?',
    visual: { tipo: 'barras', filas: g.filas },
    operacion: '−', operandos: [g.valores[a], g.valores[b]],
    respuesta: g.valores[a] - g.valores[b],
    datosGrafico: g.valores.slice(),
    expr: 'g5_' + g.valores.join('-') + '_' + a + b,
    diagnostico: true
  };
};

/* G6 El pictograma (4.º): cada bloque vale 2, 5 o 10. */
CB.gen.datos.G6 = function (rng, D) {
  const escala = CB.util.elegir(rng, (D === 1) ? [2, 10] : [2, 5, 10]);
  const g = hacerGrafico(rng, 3, 1, (D === 1) ? 6 : 8);
  const i = CB.util.ent(rng, 0, 2);
  return {
    formato: 'teclado',
    consigna: 'En este gráfico cada bloque vale ' + escala +
              '. ¿Cuántos ' + g.nombres[i] + ' hay de verdad?',
    visual: { tipo: 'barras', filas: g.filas, escala: escala },
    operacion: '×', operandos: [g.valores[i], escala],
    respuesta: g.valores[i] * escala,
    tablasCompletas: true,
    expr: 'g6_' + escala + '_' + g.valores.join('-') + '_' + i,
    diagnostico: true
  };
};

/* G7 La encuesta entera (4.º): el total de las cuatro barras. */
CB.gen.datos.G7 = function (rng, D) {
  const g = hacerGrafico(rng, 4, 2, (D === 1) ? 9 : 12);
  const total = g.valores[0] + g.valores[1] + g.valores[2] + g.valores[3];
  return {
    formato: 'teclado',
    consigna: 'Mira el gráfico. ¿Cuántos hay en total, sumando las cuatro barras?',
    visual: { tipo: 'barras', filas: g.filas },
    respuesta: total,
    datosGrafico: g.valores.slice(),
    expr: 'g7_' + g.valores.join('-'),
    diagnostico: false
  };
};

/* ——— Ciclo 3: la media, la moda y el rango. ——— */

/* Una lista con moda ÚNICA: la moda aparece 3 veces y otros dos valores una.
   Los tres valores distintos salen de una baraja, no de un bucle de rechazo:
   todo while de src/ necesita cota, y aquí ni hace falta el while. */
function listaConModa(rng, maxV) {
  const posibles = [];
  let v;
  for (v = 1; v <= maxV; v++) posibles.push(v);
  const tres = CB.util.barajar(posibles, rng).slice(0, 3);
  const lista = CB.util.barajar([tres[0], tres[0], tres[0], tres[1], tres[2]], rng);
  return { lista: lista, moda: tres[0] };
}
CB.gen.datos._listaConModa = listaConModa;

/* Una lista de `k` valores cuya media es un entero EXACTO y cuyos valores se
   quedan todos en [1, topeValor]. Se separa en PARES (+d, −d): la suma no se
   mueve, así que nunca hace falta un valor «de cierre» que pueda salirse
   (la primera versión cerraba la suma con el último valor, y en un gráfico
   salían barras de 0 o de 14 bloques: una barra que miente). */
function listaConMedia(rng, k, maxMedia, topeValor) {
  const media = CB.util.ent(rng, 2, maxMedia);
  const holgura = Math.min(media - 1, topeValor - media);
  const lista = [];
  let i, d;
  for (i = 0; i < k; i++) lista.push(media);
  for (i = 0; i + 1 < k; i += 2) {
    d = holgura > 0 ? CB.util.ent(rng, 0, holgura) : 0;
    lista[i] += d;
    lista[i + 1] -= d;
  }
  return { lista: CB.util.barajar(lista, rng), media: media, suma: media * k };
}
CB.gen.datos._listaConMedia = listaConMedia;

function enLista(lista) {
  const partes = lista.map(String);
  return partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1];
}

/* G8 La moda (5.º) */
CB.gen.datos.G8 = function (rng, D) {
  const l = listaConModa(rng, (D === 1) ? 6 : 12);
  return {
    formato: 'teclado',
    consigna: 'Los goles de cinco partidos: ' + enLista(l.lista) +
              '. ¿Cuál es la moda, el número que más se repite?',
    respuesta: l.moda,
    datosGrafico: l.lista.slice(),
    expr: 'g8_' + l.lista.join('-'),
    diagnostico: true
  };
};

/* G9 La media (5.º) */
CB.gen.datos.G9 = function (rng, D) {
  const k = (D === 1) ? 3 : CB.util.elegir(rng, [3, 4, 5]);
  const l = listaConMedia(rng, k, (D === 1) ? 8 : 12, 20);
  return {
    formato: 'teclado',
    consigna: 'Los puntos de ' + k + ' partidas: ' + enLista(l.lista) +
              '. ¿Cuál es la media?',
    operacion: '÷', operandos: [l.suma, k],
    respuesta: l.media,
    sumaDatos: l.suma,
    expr: 'g9_' + l.lista.join('-'),
    diagnostico: true
  };
};

/* G10 El rango (5.º) */
CB.gen.datos.G10 = function (rng, D) {
  const posibles = [];
  let v;
  for (v = 2; v <= ((D === 1) ? 12 : 20); v++) posibles.push(v);
  const lista = CB.util.barajar(posibles, rng).slice(0, 4);
  const max = Math.max.apply(null, lista);
  const min = Math.min.apply(null, lista);
  return {
    formato: 'teclado',
    consigna: 'Las temperaturas de cuatro días: ' + enLista(lista) +
              ' grados. ¿Cuál es el rango: el mayor menos el menor?',
    operacion: '−', operandos: [max, min],
    respuesta: max - min,
    maxDato: max,
    expr: 'g10_' + lista.join('-'),
    diagnostico: true
  };
};

/* G11 La media del gráfico (6.º): la media de las barras, exacta. */
CB.gen.datos.G11 = function (rng, D) {
  const k = (D === 1) ? 3 : CB.util.elegir(rng, [3, 4]);
  const l = listaConMedia(rng, k, (D === 1) ? 8 : 11, 12);
  const tema = CB.util.elegir(rng, TEMAS_DATOS);
  const nombres = CB.util.barajar(tema.slice(), rng).slice(0, k);
  const filas = nombres.map(function (n, i) {
    return { nombre: n, valor: l.lista[i] };
  });
  return {
    formato: 'teclado',
    consigna: 'Mira el gráfico. ¿Cuál es la media de las ' + k + ' barras?',
    visual: { tipo: 'barras', filas: filas },
    operacion: '÷', operandos: [l.suma, k],
    respuesta: l.media,
    sumaDatos: l.suma,
    expr: 'g11_' + l.lista.join('-'),
    diagnostico: true
  };
};

/* G12 Media, moda y rango (6.º): una de las tres, dicha por su nombre. */
CB.gen.datos.G12 = function (rng, D) {
  const modo = CB.util.ent(rng, 1, 3);
  if (modo === 1) {
    const m = listaConMedia(rng, 4, (D === 1) ? 9 : 12, 20);
    return {
      formato: 'teclado',
      consigna: 'Estos son los datos: ' + enLista(m.lista) +
                '. ¿Cuál es la MEDIA?',
      operacion: '÷', operandos: [m.suma, 4],
      respuesta: m.media,
      sumaDatos: m.suma,
      expr: 'g12a_' + m.lista.join('-'),
      diagnostico: true
    };
  }
  if (modo === 2) {
    const mo = listaConModa(rng, 12);
    return {
      formato: 'teclado',
      consigna: 'Estos son los datos: ' + enLista(mo.lista) +
                '. ¿Cuál es la MODA?',
      respuesta: mo.moda,
      datosGrafico: mo.lista.slice(),
      expr: 'g12b_' + mo.lista.join('-'),
      diagnostico: true
    };
  }
  const posibles = [];
  let v;
  for (v = 3; v <= 20; v++) posibles.push(v);
  const lista = CB.util.barajar(posibles, rng).slice(0, 4);
  const max = Math.max.apply(null, lista);
  const min = Math.min.apply(null, lista);
  return {
    formato: 'teclado',
    consigna: 'Estos son los datos: ' + enLista(lista) +
              '. ¿Cuál es el RANGO?',
    operacion: '−', operandos: [max, min],
    respuesta: max - min,
    maxDato: max,
    expr: 'g12c_' + lista.join('-'),
    diagnostico: true
  };
};

/* ——— El azar: A1…A7. ——— */

/* A1 Seguro o imposible (1.º): la respuesta es un COLOR, nunca la palabra
   «posible» (cuando algo es seguro, también es posible: sería ambiguo). */
CB.gen.azar.A1 = function (rng, D) {
  const colores = CB.util.barajar(COLORES_BOLA.slice(0, 4), rng);
  if (D === 1 || rng() < 0.5) {
    return {
      formato: 'opciones4',
      consigna: 'En la bolsa todas las bolas son de color ' + colores[0] +
                '. Sacas una sin mirar. ¿De qué color saldrá SEGURO?',
      respuesta: colores[0],
      respuestaFraccion: true,
      distractoresFijos: [colores[1], colores[2], colores[3]],
      expr: 'a1s_' + colores[0],
      diagnostico: false
    };
  }
  return {
    formato: 'opciones4',
    consigna: 'En la bolsa hay bolas de color ' + colores[0] + ', ' +
              colores[1] + ' y ' + colores[2] +
              '. ¿De qué color es IMPOSIBLE que salga una bola?',
    respuesta: colores[3],
    respuestaFraccion: true,
    distractoresFijos: [colores[0], colores[1], colores[2]],
    expr: 'a1i_' + colores.join(''),
    diagnostico: false
  };
};

/* A2 La bolsa de las bolas (2.º): seguro, imposible o puede salir. En el modo
   «puede salir» la bolsa tiene DOS colores pero las opciones solo enseñan uno
   de ellos: la respuesta sigue siendo única. */
CB.gen.azar.A2 = function (rng, D) {
  const colores = CB.util.barajar(COLORES_BOLA.slice(), rng);
  const modo = CB.util.ent(rng, 1, (D === 1) ? 2 : 3);
  if (modo === 1) {
    return {
      formato: 'opciones4',
      consigna: 'Todas las bolas de la bolsa son de color ' + colores[0] +
                '. ¿De qué color saldrá SEGURO?',
      respuesta: colores[0],
      respuestaFraccion: true,
      distractoresFijos: [colores[1], colores[2], colores[3]],
      expr: 'a2s_' + colores[0],
      diagnostico: false
    };
  }
  if (modo === 2) {
    return {
      formato: 'opciones4',
      consigna: 'En la bolsa hay bolas de color ' + colores[0] + ', ' +
                colores[1] + ' y ' + colores[2] +
                '. ¿Qué color es IMPOSIBLE?',
      respuesta: colores[3],
      respuestaFraccion: true,
      distractoresFijos: [colores[0], colores[1], colores[2]],
      expr: 'a2i_' + colores.slice(0, 4).join(''),
      diagnostico: false
    };
  }
  return {
    formato: 'opciones4',
    consigna: 'En la bolsa hay bolas de color ' + colores[0] + ' y ' +
              colores[1] + '. ¿Cuál de estos colores PUEDE salir?',
    respuesta: colores[1],
    respuestaFraccion: true,
    distractoresFijos: [colores[2], colores[3], colores[4]],
    expr: 'a2p_' + colores.slice(0, 5).join(''),
    diagnostico: false
  };
};

/* Una bolsa con recuentos DISTINTOS de tres colores: el más y el menos
   probable son únicos. */
function bolsaConCuentas(rng, maxN) {
  const colores = CB.util.barajar(COLORES_BOLA.slice(0, 4), rng);
  const posibles = [];
  let v;
  for (v = 1; v <= maxN; v++) posibles.push(v);
  const cuentas = CB.util.barajar(posibles, rng).slice(0, 3);
  return { colores: colores, cuentas: cuentas };
}
CB.gen.azar._bolsaConCuentas = bolsaConCuentas;

function fraseBolsa(b) {
  return 'En la bolsa hay ' + b.cuentas[0] + ' bolas de color ' + b.colores[0] +
         ', ' + b.cuentas[1] + ' de color ' + b.colores[1] +
         ' y ' + b.cuentas[2] + ' de color ' + b.colores[2] + '.';
}

/* A3 Más probable (3.º) */
CB.gen.azar.A3 = function (rng, D) {
  const b = bolsaConCuentas(rng, (D === 1) ? 6 : 9);
  let mejor = 0, i;
  for (i = 1; i < 3; i++) if (b.cuentas[i] > b.cuentas[mejor]) mejor = i;
  return {
    formato: 'opciones4',
    consigna: fraseBolsa(b) + ' Sacas una sin mirar. ¿Qué color es MÁS probable?',
    respuesta: b.colores[mejor],
    respuestaFraccion: true,
    distractoresFijos: b.colores.filter(function (c, j) { return j !== mejor; }),
    expr: 'a3_' + b.cuentas.join('-') + '_' + mejor,
    diagnostico: false
  };
};

/* A4 Menos probable (4.º): siempre entre colores que SÍ están en la bolsa
   (un color con cero bolas no es «menos probable»: es imposible). */
CB.gen.azar.A4 = function (rng, D) {
  const b = bolsaConCuentas(rng, (D === 1) ? 6 : 9);
  let peor = 0, i;
  for (i = 1; i < 3; i++) if (b.cuentas[i] < b.cuentas[peor]) peor = i;
  return {
    formato: 'opciones4',
    consigna: fraseBolsa(b) + ' Sacas una sin mirar. ¿Qué color es MENOS probable?',
    respuesta: b.colores[peor],
    respuestaFraccion: true,
    distractoresFijos: b.colores.filter(function (c, j) { return j !== peor; }),
    expr: 'a4_' + b.cuentas.join('-') + '_' + peor,
    diagnostico: false
  };
};

/* Tres distractores de fracción DISTINTOS de la respuesta, sin repetirse:
   el mismo cierre con relleno que usa itemFrac en 19b. */
function fijosFraccion(resp, candidatos, num, den) {
  const fijos = [];
  let i, k = 1;
  for (i = 0; i < candidatos.length && fijos.length < 3; i++) {
    if (candidatos[i] !== resp && fijos.indexOf(candidatos[i]) === -1) {
      fijos.push(candidatos[i]);
    }
  }
  for (k = 1; k <= 20 && fijos.length < 3; k++) {   // cota: todo while/for la lleva
    const relleno = CB.gen.motor.fstr(num + k, den + k + 1);
    if (relleno !== resp && fijos.indexOf(relleno) === -1) fijos.push(relleno);
  }
  return fijos;
}
CB.gen.azar._fijosFraccion = fijosFraccion;

/* A5 La probabilidad como fracción (5.º) */
CB.gen.azar.A5 = function (rng, D) {
  const total = CB.util.ent(rng, 4, (D === 1) ? 6 : 10);
  const fav = CB.util.ent(rng, 1, total - 1);
  const color = CB.util.elegir(rng, COLORES_BOLA);
  const resp = CB.gen.motor.fstr(fav, total);
  const fijos = fijosFraccion(resp, [
    CB.gen.motor.fstr(total - fav, total),
    CB.gen.motor.fstr(total, fav),
    CB.gen.motor.fstr(fav, total - fav),
    CB.gen.motor.fstr(fav + 1, total)
  ], fav, total);
  return {
    formato: 'opciones4',
    consigna: 'En la bolsa hay ' + total + ' bolas y ' + fav +
              (fav === 1 ? ' es' : ' son') + ' de color ' + color +
              '. ¿Qué fracción dice la probabilidad de sacar una bola ' +
              color + '?',
    respuesta: resp,
    respuestaFraccion: true,
    distractoresFijos: fijos,
    expr: 'a5_' + fav + '_' + total + '_' + color,
    diagnostico: false
  };
};

/* A6 La regla de Laplace (6.º): dado o ruleta, casos favorables entre casos
   posibles, SIN simplificar (la fracción que se lee directamente). */
CB.gen.azar.A6 = function (rng, D) {
  if (D === 1 || rng() < 0.5) {
    const casos = CB.util.elegir(rng, [
      ['sacar un 6', 1], ['sacar un número par', 3], ['sacar más de 4', 2],
      ['sacar menos de 3', 2], ['sacar un 1 o un 2', 2]
    ]);
    const resp = CB.gen.motor.fstr(casos[1], 6);
    return {
      formato: 'opciones4',
      consigna: 'Tiras un dado del 1 al 6. ¿Qué probabilidad tiene ' +
                casos[0] + '? Escribe los casos favorables entre los posibles.',
      respuesta: resp,
      respuestaFraccion: true,
      distractoresFijos: fijosFraccion(resp, [
        CB.gen.motor.fstr(6 - casos[1], 6),
        CB.gen.motor.fstr(6, casos[1]),
        CB.gen.motor.fstr(casos[1] + 1, 6)
      ], casos[1], 6),
      expr: 'a6d_' + casos[1] + '_' + casos[0].replace(/ /g, ''),
      diagnostico: false
    };
  }
  const partes = CB.util.elegir(rng, [4, 5, 8, 10]);
  const pintadas = CB.util.ent(rng, 1, partes - 1);
  const resp = CB.gen.motor.fstr(pintadas, partes);
  return {
    formato: 'opciones4',
    consigna: 'Una ruleta tiene ' + partes + ' partes iguales y ' + pintadas +
              (pintadas === 1 ? ' está pintada' : ' están pintadas') +
              '. ¿Qué probabilidad hay de que pare en una parte pintada?',
    respuesta: resp,
    respuestaFraccion: true,
    distractoresFijos: fijosFraccion(resp, [
      CB.gen.motor.fstr(partes - pintadas, partes),
      CB.gen.motor.fstr(partes, pintadas),
      CB.gen.motor.fstr(pintadas + 1, partes)
    ], pintadas, partes),
    expr: 'a6r_' + pintadas + '_' + partes,
    diagnostico: false
  };
};

/* A7 Las veces que saldrá (6.º): frecuencia esperada de un experimento. */
CB.gen.azar.A7 = function (rng, D) {
  const modo = CB.util.ent(rng, 1, (D === 1) ? 2 : 3);
  if (modo === 1) {
    const k = CB.util.ent(rng, 5, 30) * 2;
    return {
      formato: 'teclado',
      consigna: 'Tiras una moneda ' + k + ' veces. Si el azar reparte por ' +
                'igual, ¿cuántas caras te tocan?',
      operacion: '÷', operandos: [k, 2],
      respuesta: k / 2,
      totalTiradas: k,
      expr: 'a7m_' + k,
      diagnostico: true
    };
  }
  if (modo === 2) {
    const k6 = CB.util.ent(rng, 2, 10) * 6;
    const cara = CB.util.ent(rng, 1, 6);
    return {
      formato: 'teclado',
      consigna: 'Tiras un dado ' + k6 + ' veces. Si el azar reparte por ' +
                'igual, ¿cuántas veces te toca el ' + cara + '?',
      operacion: '÷', operandos: [k6, 6],
      respuesta: k6 / 6,
      totalTiradas: k6,
      expr: 'a7d_' + k6 + '_' + cara,
      diagnostico: true
    };
  }
  const k4 = CB.util.ent(rng, 3, 15) * 4;
  return {
    formato: 'teclado',
    consigna: 'Una ruleta tiene 4 partes iguales y la giras ' + k4 +
              ' veces. Si el azar reparte por igual, ¿cuántas veces para ' +
              'en cada parte?',
    operacion: '÷', operandos: [k4, 4],
    respuesta: k4 / 4,
    totalTiradas: k4,
    expr: 'a7r_' + k4,
    diagnostico: true
  };
};
