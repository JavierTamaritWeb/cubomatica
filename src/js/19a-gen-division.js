/* 19a-gen-division.js — D1…D17 (cursos 3.º-6.º) */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.division = {};

/* a ÷ d = c (resto r). Se construye desde el cociente: la división siempre
   cuadra por construcción, nunca por reintento. */
function itemDiv(a, d, c, pideResto, r) {
  return {
    formato: 'teclado',
    operacion: '÷',
    operandos: [a, d],
    respuesta: pideResto ? r : c,
    expr: a + '/' + d + (pideResto ? 'r' : ''),
    consigna: pideResto
      ? (a + ' ÷ ' + d + ' — ¿cuánto SOBRA?')
      : (a + ' ÷ ' + d),
    diagnostico: true,
    contexto: { cociente: c, resto: r || 0 }
  };
}
CB.gen.division._itemDiv = itemDiv;

/* D1 Repartir en partes iguales (3.º) */
CB.gen.division.D1 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 5);
  const c = CB.util.ent(rng, 2, (D === 1) ? 5 : 10);
  const a = d * c;
  return {
    formato: 'opciones4',
    consigna: a + ' caramelos entre ' + d + ' amigos. ¿Cuántos a cada uno?',
    operacion: '÷', operandos: [a, d],
    respuesta: c,
    expr: 'rep' + a + '_' + d,
    diagnostico: true
  };
};

/* D2 Dividir con las tablas del 2, del 5 y del 10 (3.º) */
CB.gen.division.D2 = function (rng, D) {
  const d = CB.util.elegir(rng, [2, 5, 10]);
  const c = CB.util.ent(rng, 1, (D === 1) ? 5 : 10);
  return itemDiv(d * c, d, c, false, 0);
};

/* D3 Dividir con todas las tablas (3.º) */
CB.gen.division.D3 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 10);
  const c = CB.util.ent(rng, 2, (D === 1) ? 5 : 10);
  return itemDiv(d * c, d, c, false, 0);
};

/* D4 La división con resto (3.º): pide el cociente o lo que sobra */
CB.gen.division.D4 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 9);
  const c = CB.util.ent(rng, 2, (D === 1) ? 5 : 9);
  const r = CB.util.ent(rng, 1, d - 1);
  return itemDiv(d * c + r, d, c, rng() < 0.4, r);
};

/* D5 Dividir dos cifras entre una, exacta (3.º) */
CB.gen.division.D5 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 9);
  const c = CB.util.ent(rng, Math.ceil(10 / d) + 1, Math.floor(99 / d));
  return itemDiv(d * c, d, c, false, 0);
};

/* D6 La prueba de la división (3.º): divisor × cociente + resto */
CB.gen.division.D6 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 9);
  const c = CB.util.ent(rng, 3, (D === 1) ? 10 : 30);
  const r = CB.util.ent(rng, 0, d - 1);
  return {
    formato: 'teclado',
    consigna: 'El divisor es ' + d + ', el cociente ' + c + ' y el resto ' + r +
              '. ¿Qué número se dividió?',
    respuesta: d * c + r,
    expr: 'prueba' + d + '_' + c + '_' + r,
    diagnostico: false
  };
};

/* D7 Tres cifras entre una, exacta (4.º) */
CB.gen.division.D7 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 9);
  const c = CB.util.ent(rng, Math.ceil(100 / d) + 1, Math.floor(999 / d));
  return itemDiv(d * c, d, c, false, 0);
};

/* D8 Con resto y números grandes (4.º) */
CB.gen.division.D8 = function (rng, D) {
  const d = CB.util.ent(rng, 3, 9);
  const c = CB.util.ent(rng, 12, (D === 1) ? 40 : 99);
  const r = CB.util.ent(rng, 1, d - 1);
  return itemDiv(d * c + r, d, c, rng() < 0.4, r);
};

/* D9 Dividir entre 10, 100 y 1.000 (4.º) */
CB.gen.division.D9 = function (rng, D) {
  const pot = CB.util.elegir(rng, (D === 1) ? [10, 100] : [10, 100, 1000]);
  const c = CB.util.ent(rng, 2, 99);
  return itemDiv(c * pot, pot, c, false, 0);
};

/* D10 Entre dos cifras: iniciación (4.º) */
CB.gen.division.D10 = function (rng, D) {
  const d = CB.util.elegir(rng, [11, 12, 15, 20, 25]);
  const c = CB.util.ent(rng, 2, (D === 1) ? 5 : 9);
  return itemDiv(d * c, d, c, false, 0);
};

/* D11 La mitad, el tercio y el cuarto (4.º) */
CB.gen.division.D11 = function (rng, D) {
  const par = CB.util.elegir(rng, [[2, 'la mitad'], [3, 'el tercio'], [4, 'el cuarto']]);
  const c = CB.util.ent(rng, 25, (D === 1) ? 200 : 2400);
  const a = c * par[0];
  return {
    formato: 'teclado',
    consigna: '¿Cuánto es ' + par[1] + ' de ' + CB.gen.motor.sep(a) + '?',
    operacion: '÷', operandos: [a, par[0]],
    respuesta: c,
    expr: 'parte' + par[0] + '_' + a,
    diagnostico: true
  };
};

/* D12 Entre dos cifras (5.º) */
CB.gen.division.D12 = function (rng, D) {
  const d = CB.util.ent(rng, 11, 30);
  const c = CB.util.ent(rng, 3, (D === 1) ? 12 : 40);
  return itemDiv(d * c, d, c, false, 0);
};

/* D13 Exacta y entera (5.º): con dos cifras y resto */
CB.gen.division.D13 = function (rng, D) {
  const d = CB.util.ent(rng, 11, 25);
  const c = CB.util.ent(rng, 4, (D === 1) ? 15 : 60);
  const r = CB.util.ent(rng, 0, d - 1);
  return itemDiv(d * c + r, d, c, r > 0 && rng() < 0.4, r);
};

/* D14 Números grandes (5.º) */
CB.gen.division.D14 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 12);
  const c = CB.util.ent(rng, 300, (D === 1) ? 2000 : 8000);
  return itemDiv(d * c, d, c, false, 0);
};

/* D15 Cocientes con ceros (5.º): 2.412 ÷ 12 = 201 */
CB.gen.division.D15 = function (rng, D) {
  const d = CB.util.ent(rng, 2, 12);
  const c = CB.util.ent(rng, 1, 9) * 100 + CB.util.ent(rng, 1, 9);
  return itemDiv(d * c, d, c, false, 0);
};

/* D16 Divisores grandes (6.º) */
CB.gen.division.D16 = function (rng, D) {
  const d = CB.util.ent(rng, 25, 99);
  const c = CB.util.ent(rng, 10, (D === 1) ? 40 : 99);
  return itemDiv(d * c, d, c, false, 0);
};

/* D17 Estimar el cociente (6.º) */
CB.gen.division.D17 = function (rng, D) {
  const d = CB.util.ent(rng, 3, 9);
  const cRedondo = CB.util.ent(rng, 2, 9) * 100;
  const a = cRedondo * d + CB.util.ent(rng, 1, d * 9);
  return {
    formato: 'opciones4',
    consigna: '¿Cuál es la MEJOR estimación de ' + CB.gen.motor.sep(a) + ' ÷ ' + d + '?',
    respuesta: cRedondo,
    expr: 'est' + a + '_' + d,
    diagnostico: false,
    distractoresFijos: [cRedondo / 10, cRedondo * 10, cRedondo + 500]
  };
};
