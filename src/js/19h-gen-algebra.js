/* 19h-gen-algebra.js — Sentido algebraico (3.4.0): U1…U6 (CB.gen.patrones,
   series y pensamiento computacional) y X1…X6 (CB.gen.algebra, igualdades con
   hueco e incógnita). La regla heredada del azar sigue mandando: toda pregunta
   tiene UNA respuesta inequívoca — el salto de una serie nunca es 0, y los
   campos ultimoTermino/salto/factorSerie permiten RECONSTRUIR la serie, que es
   lo que mide el guardián E142. Los campos sumandoConocido/resultadoIgualdad
   alimentan E-X-SUMA-LOS-DOS y solo se declaran cuando «sumar los dos números
   visibles» NO coincide con la respuesta. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.patrones = {};
CB.gen.algebra = {};

/* Una serie aritmética de `n` términos con salto CON SIGNO (nunca 0). */
function serieDeSalto(inicio, salto, n) {
  const t = [];
  let i;
  for (i = 0; i < n; i++) t.push(inicio + i * salto);
  return t;
}
CB.gen.patrones._serieDeSalto = serieDeSalto;

function fraseSerie(terminos) {
  return terminos.join(', ') + ', …';
}

/* U1 Seguir la serie (1.º): sumar 1, 2 o 3, sin pasar de 20. */
CB.gen.patrones.U1 = function (rng, D) {
  const salto = CB.util.ent(rng, 1, (D === 1) ? 2 : 3);
  const inicio = CB.util.ent(rng, 0, 20 - 4 * salto);
  const t = serieDeSalto(inicio, salto, 4);
  return {
    formato: 'teclado',
    consigna: 'Sigue la serie: ' + fraseSerie(t) + ' ¿Qué número viene después?',
    respuesta: t[3] + salto,
    ultimoTermino: t[3],
    salto: salto,
    expr: 'u1_' + inicio + '_' + salto,
    diagnostico: true
  };
};

/* U2 La serie que baja (2.º): el salto viaja con signo. */
CB.gen.patrones.U2 = function (rng, D) {
  const paso = CB.util.elegir(rng, (D === 1) ? [1, 2] : [2, 5, 10]);
  const inicio = CB.util.ent(rng, 4 * paso + paso, 99);
  const t = serieDeSalto(inicio, -paso, 4);
  return {
    formato: 'teclado',
    consigna: 'La serie baja: ' + fraseSerie(t) + ' ¿Qué número viene después?',
    respuesta: t[3] - paso,
    ultimoTermino: t[3],
    salto: -paso,
    expr: 'u2_' + inicio + '_' + paso,
    diagnostico: true
  };
};

/* U3 La serie y su salto (3.º): seguirla, o decir de cuánto en cuánto va. */
CB.gen.patrones.U3 = function (rng, D) {
  const salto = CB.util.ent(rng, 3, 9);
  const inicio = CB.util.ent(rng, 1, 900);
  const t = serieDeSalto(inicio, salto, 4);
  if (D === 1 || rng() < 0.6) {
    return {
      formato: 'teclado',
      consigna: 'Sigue la serie: ' + fraseSerie(t) + ' ¿Qué número viene después?',
      respuesta: t[3] + salto,
      ultimoTermino: t[3],
      salto: salto,
      expr: 'u3a_' + inicio + '_' + salto,
      diagnostico: true
    };
  }
  return {
    formato: 'teclado',
    consigna: 'Mira la serie: ' + fraseSerie(t) + ' ¿De cuánto en cuánto va?',
    respuesta: salto,
    expr: 'u3b_' + inicio + '_' + salto,
    diagnostico: true
  };
};

/* U4 El robot de la cuadrícula (4.º): pensamiento computacional. El robot
   ejecuta instrucciones sobre una fila de 10 casillas y nunca se sale. */
CB.gen.patrones.U4 = function (rng, D) {
  const inicio = CB.util.ent(rng, 1, 5);
  const avanza = CB.util.ent(rng, 2, 10 - inicio);
  const retro = (D === 1) ? 0 : CB.util.ent(rng, 1, inicio + avanza - 1);
  return {
    formato: 'teclado',
    consigna: 'El robot está en la casilla ' + inicio + ' de una fila de 10. ' +
              'Avanza ' + avanza + (avanza === 1 ? ' casilla' : ' casillas') +
              (retro ? ' y retrocede ' + retro + (retro === 1 ? ' casilla' : ' casillas') : '') +
              '. ¿En qué casilla acaba?',
    visual: { tipo: 'fila', total: 10, marcada: inicio },
    respuesta: inicio + avanza - retro,
    expr: 'u4_' + inicio + '_' + avanza + '_' + retro,
    diagnostico: true
  };
};

/* U5 La serie de multiplicar (5.º) */
CB.gen.patrones.U5 = function (rng, D) {
  const factor = (D === 1) ? 2 : CB.util.elegir(rng, [2, 3]);
  const inicio = CB.util.ent(rng, 2, (factor === 2) ? 50 : 12);
  const t = [inicio, inicio * factor, inicio * factor * factor,
             inicio * factor * factor * factor];
  return {
    formato: 'teclado',
    consigna: 'La serie multiplica: ' + fraseSerie(t) + ' ¿Qué número viene después?',
    respuesta: t[3] * factor,
    ultimoTermino: t[3],
    factorSerie: factor,
    expr: 'u5_' + inicio + '_' + factor,
    diagnostico: true
  };
};

/* U6 El término del lugar N (6.º): la regla general de una serie aritmética. */
CB.gen.patrones.U6 = function (rng, D) {
  const a = CB.util.ent(rng, 1, 20);
  const d = CB.util.ent(rng, 2, (D === 1) ? 5 : 9);
  const lugar = CB.util.ent(rng, 5, (D === 1) ? 8 : 12);
  const t = serieDeSalto(a, d, 3);
  return {
    formato: 'teclado',
    consigna: 'Una serie empieza así: ' + fraseSerie(t) + ' Suma ' + d +
              ' cada vez. ¿Qué número ocupa el lugar ' + lugar + '?',
    respuesta: a + d * (lugar - 1),
    expr: 'u6_' + a + '_' + d + '_' + lugar,
    diagnostico: true
  };
};

/* ——— Las igualdades con hueco y la incógnita: X1…X6. ——— */

/* X1 El hueco de la suma (1.º) */
CB.gen.algebra.X1 = function (rng, D) {
  const c = CB.util.ent(rng, (D === 1) ? 5 : 8, (D === 1) ? 10 : 20);
  const a = CB.util.ent(rng, 1, c - 1);
  return {
    formato: 'teclado',
    consigna: 'Busca el número del hueco: ' + a + ' + □ = ' + c + '.',
    respuesta: c - a,
    sumandoConocido: a,
    resultadoIgualdad: c,
    expr: 'x1_' + a + '_' + c,
    diagnostico: true
  };
};

/* X2 El hueco de la resta (2.º): el hueco puede estar en el sustraendo o en
   el minuendo. Con el hueco en el minuendo la respuesta ES la suma de los dos
   números visibles, así que ahí NO se declaran los campos del error. */
CB.gen.algebra.X2 = function (rng, D) {
  if (D === 1 || rng() < 0.5) {
    const m = CB.util.ent(rng, (D === 1) ? 6 : 12, (D === 1) ? 20 : 99);
    const r = CB.util.ent(rng, 1, m - 1);
    return {
      formato: 'teclado',
      consigna: 'Busca el número del hueco: ' + m + ' − □ = ' + r + '.',
      respuesta: m - r,
      sumandoConocido: m,
      resultadoIgualdad: r,
      expr: 'x2a_' + m + '_' + r,
      diagnostico: true
    };
  }
  const b = CB.util.ent(rng, 1, 50);
  const r = CB.util.ent(rng, 1, 99 - b);
  return {
    formato: 'teclado',
    consigna: 'Busca el número del hueco: □ − ' + b + ' = ' + r + '.',
    respuesta: b + r,
    expr: 'x2b_' + b + '_' + r,
    diagnostico: true
  };
};

/* X3 El hueco de multiplicar (3.º): las tablas al revés. */
CB.gen.algebra.X3 = function (rng, D) {
  const a = CB.util.ent(rng, 2, (D === 1) ? 5 : 9);
  const h = CB.util.ent(rng, 2, 9);
  return {
    formato: 'teclado',
    consigna: 'Busca el número del hueco: ' + a + ' × □ = ' + (a * h) + '.',
    respuesta: h,
    sumandoConocido: a,
    resultadoIgualdad: a * h,
    tablasCompletas: true,
    expr: 'x3_' + a + '_' + h,
    diagnostico: true
  };
};

/* X4 El hueco con dos operaciones (4.º): a un lado el hueco, al otro un
   producto que hay que calcular primero. */
CB.gen.algebra.X4 = function (rng, D) {
  const c = CB.util.ent(rng, 3, (D === 1) ? 6 : 9);
  const d = CB.util.ent(rng, 3, (D === 1) ? 6 : 9);
  const p = c * d;
  if (D === 1 || rng() < 0.6) {
    const b = CB.util.ent(rng, 1, p - 1);
    return {
      formato: 'teclado',
      consigna: 'Busca el número del hueco: □ + ' + b + ' = ' + c + ' × ' + d + '.',
      respuesta: p - b,
      sumandoConocido: b,
      resultadoIgualdad: p,
      expr: 'x4a_' + b + '_' + c + '_' + d,
      diagnostico: true
    };
  }
  const b = CB.util.ent(rng, 1, 99);
  return {
    formato: 'teclado',
    consigna: 'Busca el número del hueco: □ − ' + b + ' = ' + c + ' × ' + d + '.',
    respuesta: p + b,
    expr: 'x4b_' + b + '_' + c + '_' + d,
    diagnostico: true
  };
};

/* X5 La incógnita x (5.º): la letra ya tiene nombre. */
CB.gen.algebra.X5 = function (rng, D) {
  const modo = (D === 1) ? 1 : CB.util.ent(rng, 1, 3);
  if (modo === 1) {
    const a = CB.util.ent(rng, 10, (D === 1) ? 40 : 400);
    const x = CB.util.ent(rng, 10, (D === 1) ? 50 : 500);
    return {
      formato: 'teclado',
      consigna: 'La incógnita: x + ' + a + ' = ' + (x + a) + '. ¿Cuánto vale x?',
      respuesta: x,
      sumandoConocido: a,
      resultadoIgualdad: x + a,
      expr: 'x5a_' + a + '_' + x,
      diagnostico: true
    };
  }
  if (modo === 2) {
    const a = CB.util.ent(rng, 10, 300);
    const c = CB.util.ent(rng, 10, 400);
    return {
      formato: 'teclado',
      consigna: 'La incógnita: x − ' + a + ' = ' + c + '. ¿Cuánto vale x?',
      respuesta: a + c,
      expr: 'x5b_' + a + '_' + c,
      diagnostico: true
    };
  }
  const a = CB.util.ent(rng, 3, 12);
  const x = CB.util.ent(rng, 4, 50);
  return {
    formato: 'teclado',
    consigna: 'La incógnita: ' + a + ' · x = ' + (a * x) + '. ¿Cuánto vale x?',
    respuesta: x,
    sumandoConocido: a,
    resultadoIgualdad: a * x,
    expr: 'x5c_' + a + '_' + x,
    diagnostico: true
  };
};

/* X6 La incógnita en las cuatro (6.º) */
CB.gen.algebra.X6 = function (rng, D) {
  const modo = (D === 1) ? 1 : CB.util.ent(rng, 1, 3);
  if (modo === 1) {
    const a = CB.util.ent(rng, 3, 15);
    const x = CB.util.ent(rng, 6, 60);
    return {
      formato: 'teclado',
      consigna: 'La incógnita: ' + a + ' · x = ' + (a * x) + '. ¿Cuánto vale x?',
      respuesta: x,
      sumandoConocido: a,
      resultadoIgualdad: a * x,
      expr: 'x6a_' + a + '_' + x,
      diagnostico: true
    };
  }
  if (modo === 2) {
    const a = CB.util.ent(rng, 3, 9);
    const c = CB.util.ent(rng, 4, 30);
    return {
      formato: 'teclado',
      consigna: 'La incógnita: x ÷ ' + a + ' = ' + c + '. ¿Cuánto vale x?',
      respuesta: a * c,
      sumandoConocido: a,
      resultadoIgualdad: c,
      expr: 'x6b_' + a + '_' + c,
      diagnostico: true
    };
  }
  const a = CB.util.ent(rng, 25, 400);
  const c = CB.util.ent(rng, 25, 500);
  return {
    formato: 'teclado',
    consigna: 'La incógnita: x − ' + a + ' = ' + c + '. ¿Cuánto vale x?',
    respuesta: a + c,
    expr: 'x6c_' + a + '_' + c,
    diagnostico: true
  };
};
