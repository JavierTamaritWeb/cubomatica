/* 19i-gen-espacial.js — Sentido espacial (3.4.0): J1…J7 (CB.gen.geometria,
   figuras, ángulos y cuerpos) y K1…K6 (CB.gen.espacio, posición, simetría y
   coordenadas). Tres reglas de la casa: el color nunca lleva la información
   (las casillas se distinguen por su LETRA, los ángulos por sus grados); toda
   figura dibujada tiene lados rectos, porque el vóxel no tiene curvas (el
   círculo no aparece dibujado jamás); y toda pregunta de coordenadas declara
   su convenio en la consigna — primero la columna, después la fila, y la fila
   1 es la de abajo — para que la respuesta sea inequívoca por construcción. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.geometria = {};
CB.gen.espacio = {};

/* Las cuatro figuras dibujables. Lista CERRADA: son las que CB.ui.figuraPlana
   sabe pintar. lados === vértices en todo polígono; se pregunta por ambos. */
const FIGURAS_PLANAS = [
  { nombre: 'cuadrado',   lados: 4 },
  { nombre: 'rectángulo', lados: 4 },
  { nombre: 'triángulo',  lados: 3 },
  { nombre: 'rombo',      lados: 4 }
];

/* Polígonos por número de lados (4.º, solo de palabra). */
const POLIGONOS_LADOS = [
  ['el triángulo', 3], ['el cuadrilátero', 4], ['el pentágono', 5],
  ['el hexágono', 6], ['el octógono', 8]
];

/* Cuerpos geométricos: nombre, caras, aristas y vértices. */
const CUERPOS_GEO = [
  ['un cubo', 6, 12, 8],
  ['una pirámide de base cuadrada', 5, 8, 5],
  ['un prisma de base triangular', 5, 9, 6]
];

/* Tipos de ángulo con los grados que los dibujan. «llano» incluido: 180 se ve. */
const ANGULOS_TIPO = [
  ['agudo', [30, 45, 60]], ['recto', [90]],
  ['obtuso', [120, 135, 150]], ['llano', [180]]
];

/* Giros y sus grados. La vuelta entera se da como ANCLA en la consigna, así
   que no se pregunta nunca por ella. */
const VUELTAS_GIRO = [
  ['un cuarto de vuelta', 90], ['media vuelta', 180], ['tres cuartos de vuelta', 270]
];

/* Figuras y sus ejes de simetría, descritas sin ambigüedad. */
const SIMETRIAS_FIGURA = [
  ['un cuadrado', 4],
  ['un rectángulo que no es cuadrado', 2],
  ['un triángulo equilátero, con los tres lados iguales', 3],
  ['un rombo que no es cuadrado', 2]
];

/* Letras para las casillas: mayúsculas bien distintas entre sí. */
const LETRAS_CASILLA = ['A', 'B', 'C', 'D', 'E', 'H', 'J', 'L', 'M', 'P',
                        'R', 'S', 'T', 'U', 'V', 'Z'];

/* J1 ¿Qué figura es? (1.º) */
CB.gen.geometria.J1 = function (rng, D) {
  const fig = FIGURAS_PLANAS[CB.util.ent(rng, 0, (D === 1) ? 2 : 3)];
  return {
    formato: 'opciones4',
    consigna: 'Mira la figura. ¿Cómo se llama?',
    visual: { tipo: 'figura', nombre: fig.nombre },
    respuesta: fig.nombre,
    respuestaFraccion: true,
    distractoresFijos: FIGURAS_PLANAS.map(function (f) { return f.nombre; })
      .filter(function (n) { return n !== fig.nombre; }),
    expr: 'j1_' + fig.nombre,
    diagnostico: false
  };
};

/* J2 Lados y vértices (2.º) */
CB.gen.geometria.J2 = function (rng, D) {
  const fig = CB.util.elegir(rng, FIGURAS_PLANAS);
  const porVertices = (D !== 1) && rng() < 0.5;
  return {
    formato: 'teclado',
    consigna: 'Mira la figura. ¿Cuántos ' +
              (porVertices ? 'vértices (esquinas)' : 'lados') + ' tiene?',
    visual: { tipo: 'figura', nombre: fig.nombre },
    respuesta: fig.lados,
    expr: 'j2_' + fig.nombre + (porVertices ? 'v' : 'l'),
    diagnostico: true
  };
};

/* J3 Recto, agudo, obtuso o llano (3.º): el ángulo se dibuja y la respuesta
   es su nombre — nunca dos nombres verdaderos a la vez. */
CB.gen.geometria.J3 = function (rng, D) {
  const tipo = ANGULOS_TIPO[CB.util.ent(rng, 0, (D === 1) ? 2 : 3)];
  const grados = CB.util.elegir(rng, tipo[1]);
  return {
    formato: 'opciones4',
    consigna: 'Mira el ángulo. ¿Cómo es?',
    visual: { tipo: 'angulo', grados: grados },
    respuesta: tipo[0],
    respuestaFraccion: true,
    distractoresFijos: ANGULOS_TIPO.map(function (t) { return t[0]; })
      .filter(function (n) { return n !== tipo[0]; }),
    expr: 'j3_' + grados,
    diagnostico: false
  };
};

/* J4 Las figuras por sus lados (4.º) */
CB.gen.geometria.J4 = function (rng, D) {
  const p = CB.util.elegir(rng, POLIGONOS_LADOS);
  const otros = POLIGONOS_LADOS.map(function (q) { return q[0]; })
    .filter(function (n) { return n !== p[0]; });
  return {
    formato: 'opciones4',
    consigna: 'Una figura plana tiene ' + p[1] +
              ' lados rectos. ¿Cómo se llama?',
    respuesta: p[0],
    respuestaFraccion: true,
    distractoresFijos: CB.util.barajar(otros, rng).slice(0, 3),
    expr: 'j4_' + p[1],
    diagnostico: false
  };
};

/* J5 Caras, aristas y vértices (5.º): los cuerpos, de palabra. */
CB.gen.geometria.J5 = function (rng, D) {
  const cuerpo = (D === 1) ? CUERPOS_GEO[0] : CB.util.elegir(rng, CUERPOS_GEO);
  const preguntas = [['caras', 'Cuántas', 1], ['aristas', 'Cuántas', 2],
                     ['vértices', 'Cuántos', 3]];
  const p = CB.util.elegir(rng, preguntas);
  return {
    formato: 'teclado',
    consigna: 'Piensa en ' + cuerpo[0] + '. ¿' + p[1] + ' ' + p[0] + ' tiene?',
    respuesta: cuerpo[p[2]],
    expr: 'j5_' + cuerpo[0].replace(/ /g, '') + '_' + p[0],
    diagnostico: true
  };
};

/* J6 El tercer ángulo (6.º) */
CB.gen.geometria.J6 = function (rng, D) {
  const a = CB.util.ent(rng, 20, (D === 1) ? 60 : 80);
  const b = CB.util.ent(rng, 20, 150 - a);
  return {
    formato: 'teclado',
    consigna: 'Los ángulos de un triángulo suman 180 grados. Dos de ellos ' +
              'miden ' + a + ' y ' + b + ' grados. ¿Cuánto mide el tercero?',
    respuesta: 180 - a - b,
    anguloA: a,
    anguloB: b,
    expr: 'j6_' + a + '_' + b,
    diagnostico: true
  };
};

/* J7 Los grados de la vuelta (6.º) */
CB.gen.geometria.J7 = function (rng, D) {
  const v = VUELTAS_GIRO[CB.util.ent(rng, 0, (D === 1) ? 1 : 2)];
  return {
    formato: 'teclado',
    consigna: 'Una vuelta entera son 360 grados. ¿Cuántos grados ' +
              (v[1] === 90 ? 'es ' : 'son ') + v[0] + '?',
    respuesta: v[1],
    expr: 'j7_' + v[1],
    diagnostico: true
  };
};

/* ——— El espacio: K1…K6. ——— */

/* Una cuadrícula de letras de nc × nf casillas, todas distintas. Las filas
   van EN ORDEN LÓGICO: celdas[0] es la fila 1, la de abajo. */
function cuadriculaDeLetras(rng, nc, nf) {
  const letras = CB.util.barajar(LETRAS_CASILLA.slice(), rng).slice(0, nc * nf);
  const celdas = [];
  let f, c;
  for (f = 0; f < nf; f++) {
    const fila = [];
    for (c = 0; c < nc; c++) fila.push(letras[f * nc + c]);
    celdas.push(fila);
  }
  return celdas;
}
CB.gen.espacio._cuadriculaDeLetras = cuadriculaDeLetras;

/* Tres distractores de letra, empezando por la casilla de coordenadas
   INVERTIDAS si existe y es otra: es el error que la pregunta enseña a evitar. */
function fijosDeLetras(rng, celdas, resp, invertida) {
  const fijos = [];
  if (invertida != null && invertida !== resp) fijos.push(invertida);
  const resto = [];
  celdas.forEach(function (fila) {
    fila.forEach(function (l) {
      if (l && l !== resp && fijos.indexOf(l) === -1) resto.push(l);
    });
  });
  const mezcla = CB.util.barajar(resto, rng);
  let i;
  for (i = 0; i < mezcla.length && fijos.length < 3; i++) fijos.push(mezcla[i]);
  return fijos;
}
CB.gen.espacio._fijosDeLetras = fijosDeLetras;

/* K1 La posición en la fila (1.º): reutiliza la fila de vagonetas. */
CB.gen.espacio.K1 = function (rng, D) {
  const total = CB.util.ent(rng, 5, (D === 1) ? 6 : 9);
  const pos = CB.util.ent(rng, 1, total);
  return {
    formato: 'teclado',
    consigna: 'Mira la fila. ¿Qué posición ocupa la vagoneta marcada con la ' +
              'estrella, contando desde la izquierda?',
    visual: { tipo: 'fila', total: total, marcada: pos },
    respuesta: pos,
    expr: 'k1_' + total + '_' + pos,
    diagnostico: true
  };
};

/* K2 La casilla de la cuadrícula (2.º) */
CB.gen.espacio.K2 = function (rng, D) {
  const celdas = cuadriculaDeLetras(rng, 3, 3);
  const cc = CB.util.ent(rng, 1, 3);
  const fc = CB.util.ent(rng, 1, 3);
  const resp = celdas[fc - 1][cc - 1];
  const invertida = (cc !== fc) ? celdas[cc - 1][fc - 1] : null;
  return {
    formato: 'opciones4',
    consigna: 'Mira la cuadrícula. ¿Qué letra está en la columna ' + cc +
              ' y en la fila ' + fc + '? La fila 1 es la de abajo.',
    visual: { tipo: 'cuadricula', celdas: celdas },
    respuesta: resp,
    respuestaFraccion: true,
    distractoresFijos: fijosDeLetras(rng, celdas, resp, invertida),
    /* El expr lleva la cuadrícula ENTERA: dos cuadrículas distintas jamás
       comparten identidad (la auditoría severa de 3.4.0 cazó que solo la
       fila 1 no basta: el anti-repetición trataría como iguales dos ítems
       con respuestas distintas). */
    expr: 'k2_' + cc + '_' + fc + '_' + celdas.map(function (f) { return f.join(''); }).join(''),
    diagnostico: false
  };
};

/* K3 Los ejes de simetría (3.º) */
CB.gen.espacio.K3 = function (rng, D) {
  const s = SIMETRIAS_FIGURA[CB.util.ent(rng, 0, (D === 1) ? 1 : 3)];
  return {
    formato: 'teclado',
    consigna: 'Piensa en ' + s[0] + '. ¿Cuántos ejes de simetría tiene?',
    respuesta: s[1],
    expr: 'k3_' + s[1] + '_' + s[0].replace(/[ ,]/g, ''),
    diagnostico: true
  };
};

/* K4 La casilla (columna, fila) (4.º): la notación entre paréntesis. */
CB.gen.espacio.K4 = function (rng, D) {
  const celdas = cuadriculaDeLetras(rng, 4, 3);
  const cc = CB.util.ent(rng, 1, 4);
  const fc = CB.util.ent(rng, 1, 3);
  const resp = celdas[fc - 1][cc - 1];
  const invertida = (cc !== fc && fc <= 4 && cc <= 3) ? celdas[cc - 1][fc - 1] : null;
  return {
    formato: 'opciones4',
    consigna: 'En la casilla (' + cc + ', ' + fc + ') se dice primero la ' +
              'columna y después la fila, y la fila 1 es la de abajo. ' +
              '¿Qué letra hay en esa casilla?',
    visual: { tipo: 'cuadricula', celdas: celdas },
    respuesta: resp,
    respuestaFraccion: true,
    distractoresFijos: fijosDeLetras(rng, celdas, resp, invertida),
    expr: 'k4_' + cc + '_' + fc + '_' + celdas.map(function (f) { return f.join(''); }).join(''),
    diagnostico: false
  };
};

/* K5 El punto del plano (5.º): cuatro puntos con nombre y uno preguntado por
   sus coordenadas. El punto de coordenadas invertidas SIEMPRE está en el
   plano: es el distractor que enseña. */
CB.gen.espacio.K5 = function (rng, D) {
  const tam = 5;
  const x = CB.util.ent(rng, 1, tam);
  let y = CB.util.ent(rng, 1, tam - 1);
  if (y >= x) y += 1;                       /* y ≠ x, sin bucles de rechazo */
  const celdas = [];
  let f, c;
  for (f = 0; f < tam; f++) {
    const fila = [];
    for (c = 0; c < tam; c++) fila.push('');
    celdas.push(fila);
  }
  const etiquetas = CB.util.barajar(['A', 'B', 'C', 'D'], rng);
  celdas[y - 1][x - 1] = etiquetas[0];      /* el preguntado, en (x, y) */
  celdas[x - 1][y - 1] = etiquetas[1];      /* el de coordenadas invertidas */
  /* Dos puntos más en casillas libres, deterministas desde el rng. */
  let puestos = 2, intento;
  for (intento = 0; intento < 40 && puestos < 4; intento++) {
    const cx = CB.util.ent(rng, 1, tam);
    const cy = CB.util.ent(rng, 1, tam);
    if (!celdas[cy - 1][cx - 1]) {
      celdas[cy - 1][cx - 1] = etiquetas[puestos];
      puestos++;
    }
  }
  if (puestos < 4) {                        /* cota alcanzada: relleno fijo */
    for (f = 0; f < tam && puestos < 4; f++) {
      for (c = 0; c < tam && puestos < 4; c++) {
        if (!celdas[f][c]) { celdas[f][c] = etiquetas[puestos]; puestos++; }
      }
    }
  }
  return {
    formato: 'opciones4',
    consigna: 'En el plano se dice primero la columna y después la fila, y ' +
              'la fila 1 es la de abajo. ¿Qué punto está en la casilla (' +
              x + ', ' + y + ')?',
    visual: { tipo: 'cuadricula', celdas: celdas },
    respuesta: etiquetas[0],
    respuestaFraccion: true,
    distractoresFijos: [etiquetas[1], etiquetas[2], etiquetas[3]],
    expr: 'k5_' + x + '_' + y + '_' + celdas.map(function (f) { return f.map(function (l) { return l || '-'; }).join(''); }).join(''),
    diagnostico: false
  };
};

/* K6 La traslación del punto (6.º) */
CB.gen.espacio.K6 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 6);
  const y = CB.util.ent(rng, 1, 9);
  const modo = (D === 1) ? 1 : CB.util.ent(rng, 1, 3);
  if (modo === 1) {
    const x = CB.util.ent(rng, 1, 9);
    return {
      formato: 'teclado',
      consigna: 'El punto (' + x + ', ' + y + ') se mueve ' + d +
                ' casillas a la derecha. ¿En qué columna (el primer número) queda?',
      respuesta: x + d,
      coordenadaInicial: x,
      desplazamiento: d,
      expr: 'k6a_' + x + '_' + y + '_' + d,
      diagnostico: true
    };
  }
  if (modo === 2) {
    const x = CB.util.ent(rng, 1, 9);
    return {
      formato: 'teclado',
      consigna: 'El punto (' + x + ', ' + y + ') se mueve ' + d +
                ' casillas hacia arriba. ¿En qué fila (el segundo número) queda?',
      respuesta: y + d,
      coordenadaInicial: y,
      desplazamiento: d,
      expr: 'k6b_' + x + '_' + y + '_' + d,
      diagnostico: true
    };
  }
  const x = CB.util.ent(rng, d + 1, 12);
  return {
    formato: 'teclado',
    consigna: 'El punto (' + x + ', ' + y + ') se mueve ' + d +
              ' casillas a la izquierda. ¿En qué columna (el primer número) queda?',
    respuesta: x - d,
    expr: 'k6c_' + x + '_' + y + '_' + d,
    diagnostico: true
  };
};
