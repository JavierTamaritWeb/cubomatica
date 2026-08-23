/* 19c-gen-decimales.js — C1…C15 (cursos 4.º-6.º).
   REGLA DE ORO: cada decimal nace como entero escalado y se divide UNA vez
   entre 10 o 100. Así la respuesta y parseFloat(lo tecleado) son el mismo
   doble, y la igualdad estricta de responder() es exacta. Los ítems que se
   contestan con coma llevan conComa: el teclado saca la tecla. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.decimales = {};

const comaTxt = function (sc, esc) { return CB.gen.motor.coma(sc, esc); };
const decNum = function (sc, esc) { return CB.gen.motor.dec(sc, esc); };

/* C1 Las décimas (4.º) */
CB.gen.decimales.C1 = function (rng, D) {
  const u = CB.util.ent(rng, 0, (D === 1) ? 5 : 9);
  const d = CB.util.ent(rng, 1, 9);
  return {
    formato: 'teclado', conComa: true,
    consigna: 'Escribe con coma: ' + u + (u === 1 ? ' unidad y ' : ' unidades y ') +
              d + (d === 1 ? ' décima' : ' décimas') + '.',
    respuesta: decNum(u * 10 + d, 10),
    expr: 'c1_' + u + '_' + d,
    diagnostico: false
  };
};

/* C2 Las centésimas (4.º) */
CB.gen.decimales.C2 = function (rng, D) {
  const u = CB.util.ent(rng, 0, (D === 1) ? 5 : 9);
  const c = CB.util.ent(rng, 1, 99);
  return {
    formato: 'teclado', conComa: true,
    consigna: 'Escribe con coma: ' + u + (u === 1 ? ' unidad y ' : ' unidades y ') +
              c + (c === 1 ? ' centésima' : ' centésimas') + '.',
    respuesta: decNum(u * 100 + c, 100),
    expr: 'c2_' + u + '_' + c,
    diagnostico: false
  };
};

/* C3 Sumar decimales (4.º) */
CB.gen.decimales.C3 = function (rng, D) {
  const a = CB.util.ent(rng, 11, (D === 1) ? 50 : 89);   // décimas escaladas
  const b = CB.util.ent(rng, 11, 99 - a);
  return {
    formato: 'teclado', conComa: true,
    operacion: '+', operandos: [decNum(a, 10), decNum(b, 10)],
    consigna: comaTxt(a, 10) + ' + ' + comaTxt(b, 10),
    respuesta: decNum(a + b, 10),
    expr: 'c3_' + a + '_' + b,
    diagnostico: true
  };
};

/* C4 Restar decimales (4.º) */
CB.gen.decimales.C4 = function (rng, D) {
  const b = CB.util.ent(rng, 11, (D === 1) ? 40 : 80);
  const a = CB.util.ent(rng, b + 1, 99);
  return {
    formato: 'teclado', conComa: true,
    operacion: '-', operandos: [decNum(a, 10), decNum(b, 10)],
    consigna: comaTxt(a, 10) + ' − ' + comaTxt(b, 10),
    respuesta: decNum(a - b, 10),
    expr: 'c4_' + a + '_' + b,
    diagnostico: true
  };
};

/* C5 El dinero con coma (4.º) */
CB.gen.decimales.C5 = function (rng, D) {
  const a = CB.util.elegir(rng, [125, 150, 175, 225, 250, 275, 325, 350, 450, 550]);
  const b = CB.util.elegir(rng, [25, 50, 75, 125, 150, 225, 250]);
  return {
    formato: 'teclado', conComa: true,
    consigna: 'Un cuaderno cuesta ' + comaTxt(a, 100) + ' € y un lápiz ' +
              comaTxt(b, 100) + ' €. ¿Cuánto es en total?',
    operacion: '+', operandos: [decNum(a, 100), decNum(b, 100)],
    respuesta: decNum(a + b, 100),
    expr: 'c5_' + a + '_' + b,
    diagnostico: true
  };
};

/* C6 Comparar decimales (5.º): el clásico 3,5 contra 3,45 */
CB.gen.decimales.C6 = function (rng, D) {
  const ent = CB.util.ent(rng, 1, 9);
  const d1 = CB.util.ent(rng, 2, 9);
  const grupo = [
    ent * 100 + d1 * 10,                       // x,d0  (x,5)
    /* desde 2: restar 1 daría x,(d-1)9, que es EXACTAMENTE el tercero */
    ent * 100 + d1 * 10 - CB.util.ent(rng, 2, 9),
    ent * 100 + (d1 - 1) * 10 + 9,             // x,(d-1)9
    (ent - 1) * 100 + 99                       // (x-1),99
  ];
  const mayor = Math.max.apply(null, grupo);
  return {
    formato: 'opciones4',
    consigna: 'Toca el número MAYOR.',
    respuesta: comaTxt(mayor, 100),
    respuestaFraccion: true,                    /* respuesta-texto, como 'c20' */
    distractoresFijos: grupo.filter(function (v) { return v !== mayor; })
      .map(function (v) { return comaTxt(v, 100); }),
    expr: 'c6_' + grupo.join('_'),
    diagnostico: false
  };
};

/* C7 Sumar y restar decimales (5.º): centésimas */
CB.gen.decimales.C7 = function (rng, D) {
  const resta = rng() < 0.5;
  let a = CB.util.ent(rng, 101, (D === 1) ? 500 : 899);
  let b = CB.util.ent(rng, 101, 899);
  if (resta && b > a) { const t = a; a = b; b = t; }
  if (!resta && a + b > 999) b = 999 - a;
  return {
    formato: 'teclado', conComa: true,
    operacion: resta ? '-' : '+', operandos: [decNum(a, 100), decNum(b, 100)],
    consigna: comaTxt(a, 100) + (resta ? ' − ' : ' + ') + comaTxt(b, 100),
    respuesta: decNum(resta ? (a - b) : (a + b), 100),
    expr: 'c7_' + a + (resta ? 'm' : 'p') + b,
    diagnostico: true
  };
};

/* C8 Un decimal por un entero (5.º) */
CB.gen.decimales.C8 = function (rng, D) {
  const a = CB.util.ent(rng, 11, (D === 1) ? 40 : 99);   // décimas
  const k = CB.util.ent(rng, 2, 9);
  return {
    formato: 'teclado', conComa: true,
    operacion: '×', operandos: [decNum(a, 10), k],
    consigna: comaTxt(a, 10) + ' × ' + k,
    respuesta: decNum(a * k, 10),
    expr: 'c8_' + a + '_' + k,
    diagnostico: false
  };
};

/* C9 Decimal por y entre 10 y 100 (5.º). Al DIVIDIR se parte de décimas: las
   centésimas entre 10 darían milésimas, y la milésima no existe en el juego. */
CB.gen.decimales.C9 = function (rng, D) {
  const divide = rng() < 0.4;
  if (divide) {
    const sd = CB.util.ent(rng, 11, 99);                 // décimas: x,y
    return {
      formato: 'teclado', conComa: true,
      consigna: comaTxt(sd, 10) + ' ÷ 10',
      respuesta: decNum(sd, 100),
      expr: 'c9d' + sd,
      diagnostico: false
    };
  }
  const sc = CB.util.ent(rng, 101, 999);                 // centésimas: x,yz
  const pot = CB.util.elegir(rng, (D === 1) ? [10] : [10, 100]);
  return {
    formato: 'teclado', conComa: true,
    consigna: comaTxt(sc, 100) + ' × ' + pot,
    respuesta: decNum(sc, Math.max(1, 100 / pot)),
    expr: 'c9_' + sc + 'x' + pot,
    diagnostico: false
  };
};

/* C10 Un decimal entre un entero, exacto (5.º) */
CB.gen.decimales.C10 = function (rng, D) {
  const c = CB.util.ent(rng, 11, (D === 1) ? 30 : 99);   // cociente en décimas
  const d = CB.util.ent(rng, 2, 9);
  return {
    formato: 'teclado', conComa: true,
    operacion: '÷', operandos: [decNum(c * d, 10), d],
    consigna: comaTxt(c * d, 10) + ' ÷ ' + d,
    respuesta: decNum(c, 10),
    expr: 'c10_' + c + '_' + d,
    diagnostico: false
  };
};

/* C11 Redondear decimales (5.º) */
CB.gen.decimales.C11 = function (rng, D) {
  let sc = CB.util.ent(rng, 101, 899);
  if (sc % 10 === 0) sc += CB.util.ent(rng, 1, 9);
  if (sc % 100 === 50) sc += 1;                          // sin caso frontera
  const resp = Math.round(sc / 100);
  return {
    formato: 'teclado',
    consigna: 'Redondea ' + comaTxt(sc, 100) + ' a las unidades.',
    respuesta: resp,
    expr: 'c11_' + sc,
    diagnostico: false
  };
};

/* C12 Operaciones con decimales (6.º) */
CB.gen.decimales.C12 = function (rng, D) {
  const modo = CB.util.ent(rng, 1, 3);
  if (modo === 3) {
    const a3 = CB.util.ent(rng, 12, 60);                 // décimas
    const k3 = CB.util.ent(rng, 3, 12);
    return {
      formato: 'teclado', conComa: true,
      operacion: '×', operandos: [decNum(a3, 10), k3],
      consigna: comaTxt(a3, 10) + ' × ' + k3,
      respuesta: decNum(a3 * k3, 10),
      expr: 'c12x_' + a3 + '_' + k3,
      diagnostico: false
    };
  }
  const resta = modo === 2;
  let a = CB.util.ent(rng, 105, 985);
  let b = CB.util.ent(rng, 105, 985);
  if (resta && b > a) { const t = a; a = b; b = t; }
  if (!resta && a + b > 1999) b = 1999 - a;
  return {
    formato: 'teclado', conComa: true,
    operacion: resta ? '-' : '+', operandos: [decNum(a, 100), decNum(b, 100)],
    consigna: comaTxt(a, 100) + (resta ? ' − ' : ' + ') + comaTxt(b, 100),
    respuesta: decNum(resta ? (a - b) : (a + b), 100),
    expr: 'c12_' + a + (resta ? 'm' : 'p') + b,
    diagnostico: true
  };
};

/* C13 Dividir entre 0,5 y 0,25 (6.º): multiplicar disfrazado */
CB.gen.decimales.C13 = function (rng, D) {
  const par = CB.util.elegir(rng, [[5, 10, 2], [25, 100, 4]]);   // 0,5 → ×2
  const a = CB.util.ent(rng, 2, (D === 1) ? 12 : 30);
  return {
    formato: 'teclado',
    consigna: a + ' ÷ ' + comaTxt(par[0], par[1]),
    respuesta: a * par[2],
    expr: 'c13_' + a + '_' + par[0],
    diagnostico: false
  };
};

/* C14 Porcentaje, decimal y fracción (6.º) */
CB.gen.decimales.C14 = function (rng, D) {
  const pct = CB.util.elegir(rng, [10, 20, 25, 30, 40, 50, 60, 75, 80, 90]);
  return {
    formato: 'teclado', conComa: true,
    consigna: 'Escribe el ' + pct + ' % como número con coma.',
    respuesta: decNum(pct, 100),
    expr: 'c14_' + pct,
    diagnostico: false
  };
};

/* C15 El ticket de la compra (6.º) */
CB.gen.decimales.C15 = function (rng, D) {
  const precios = [75, 125, 150, 175, 225, 250, 325, 350, 425, 550];
  const a = CB.util.elegir(rng, precios);
  const b = CB.util.elegir(rng, precios);
  const c = CB.util.elegir(rng, precios);
  return {
    formato: 'teclado', conComa: true,
    consigna: 'El ticket: ' + comaTxt(a, 100) + ' €, ' + comaTxt(b, 100) +
              ' € y ' + comaTxt(c, 100) + ' €. ¿Cuánto es en total?',
    respuesta: decNum(a + b + c, 100),
    expr: 'c15_' + a + '_' + b + '_' + c,
    diagnostico: false
  };
};
