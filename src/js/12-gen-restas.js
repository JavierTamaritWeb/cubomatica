/* 12-gen-restas.js — R1…R14 */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.restas = {};

/* Cuenta los préstamos reales de a − b. */
CB.gen.restas.prestamos = function (a, b) {
  let n = 0, deuda = 0, x = a, y = b, dA, dB;
  while (y > 0 || deuda > 0) {
    dA = x % 10; dB = y % 10;
    if (dA - deuda < dB) { n++; deuda = 1; } else { deuda = 0; }
    x = Math.floor(x / 10); y = Math.floor(y / 10);
    if (x === 0 && y === 0) break;
  }
  return n;
};

/* ¿Hay un 0 en el minuendo en una columna que exige préstamo? */
CB.gen.restas.ceroEnColumnaDePrestamo = function (a, b) {
  let deuda = 0, x = a, y = b, dA, dB;
  while (y > 0 || deuda > 0) {
    dA = x % 10; dB = y % 10;
    if (deuda === 1 && dA === 0) return true;     // hay que pedir A TRAVÉS del 0
    if (dA - deuda < dB) { deuda = 1; } else { deuda = 0; }
    x = Math.floor(x / 10); y = Math.floor(y / 10);
    if (x === 0 && y === 0) break;
  }
  return false;
};

/**
 * Construye a − b = r con el patrón de préstamos pedido.
 * @param patron por columna desde las unidades: true = esa columna pide prestado
 */
CB.gen.restas.construir = function (rng, patron, cifrasR, cifrasB, techo) {
  let k = 0, s, a;
  while (k < 40) {
    k++;
    s = CB.gen.sumas.construir(rng, patron, cifrasR, cifrasB);
    if (!s) continue;
    a = s.r;                                   // minuendo = resultado + sustraendo
    if (a > techo) continue;
    if (CB.gen.restas.ceroEnColumnaDePrestamo(a, s.b)) continue;
    if (CB.gen.restas.prestamos(a, s.b) !== patron.filter(Boolean).length) continue;
    return { a: a, b: s.b, r: s.a };
  }
  return { a: 9, b: 4, r: 5 };                 // respaldo seguro, nunca negativo
};

function itemResta(t) {
  return {
    formato: 'teclado',
    operacion: '-',
    operandos: [t.a, t.b],
    respuesta: t.r,
    expr: t.a + '-' + t.b,
    consigna: t.a + ' − ' + t.b,
    diagnostico: true,
    llevadas: CB.gen.restas.prestamos(t.a, t.b)
  };
}

/* R1 Restas hasta 10 */
CB.gen.restas.R1 = function (rng, D) {
  const a = CB.util.ent(rng, (D === 1) ? 2 : 5, 10);
  const b = CB.util.ent(rng, 0, a);
  return itemResta({ a: a, b: b, r: a - b });
};

/* R2 Restas hasta 20 sin llevar */
CB.gen.restas.R2 = function (rng, D) {
  const a = CB.util.ent(rng, 10, 20);
  const b = CB.util.ent(rng, 0, a % 10);          // sin préstamo por construcción
  return itemResta({ a: a, b: b, r: a - b });
};

/* R3 Restar 10 */
CB.gen.restas.R3 = function (rng, D) {
  const a = CB.util.ent(rng, 11, (D === 1) ? 49 : 99);
  return itemResta({ a: a, b: 10, r: a - 10 });
};

/* R4 DU − U sin llevar */
CB.gen.restas.R4 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [false, false], 2, 1, 99));
};

/* R5 DU − DU sin llevar */
CB.gen.restas.R5 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [false, false], 2, 2, 99));
};

/* R6 Complementos a 10 y a 100 */
CB.gen.restas.R6 = function (rng, D) {
  const base = (D === 1 || rng() < 0.5) ? 10 : 100;
  const b = (base === 10) ? CB.util.ent(rng, 1, 9) : CB.util.ent(rng, 1, 9) * 10;
  const it = itemResta({ a: base, b: b, r: base - b });
  it.consigna = '¿Cuánto le falta a ' + b + ' para llegar a ' + base + '?';
  it.expr = 'comp' + base + '_' + b;
  return it;
};

/* R7 DU − U con UNA llevada */
CB.gen.restas.R7 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [true, false], 2, 1, 99));
};

/* R8 DU − DU con UNA llevada */
CB.gen.restas.R8 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [true, false], 2, 2, 99));
};

/* R9 Restar decenas completas */
CB.gen.restas.R9 = function (rng, D) {
  const a = CB.util.ent(rng, 3, (D === 1) ? 20 : 59) * 10;
  const b = CB.util.ent(rng, 1, Math.min(9, a / 10)) * 10;
  const it = itemResta({ a: a, b: b, r: a - b });
  it.formato = 'opciones4';
  return it;
};

/* R10 CDU − DU sin llevar */
CB.gen.restas.R10 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [false, false, false], 3, 2, 599));
};

/* R11 CDU − DU con UNA llevada */
CB.gen.restas.R11 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [true, false, false], 3, 2, 599));
};

/* R12 CDU − CDU sin llevar */
CB.gen.restas.R12 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [false, false, false], 3, 3, 999));
};

/* R13 CDU − CDU con UNA llevada */
CB.gen.restas.R13 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [true, false, false], 3, 3, 999));
};

/* R14 Restas con doble llevada — AMPLIACIÓN, apagada por defecto */
CB.gen.restas.R14 = function (rng, D) {
  /* Único nivel del juego que puede tener dos préstamos y cero intermedio. Solo
     se sirve con ajustes.restasDobleLlevada activado por el adulto (§6.7). */
  let k = 0, s, a;
  while (k < 40) {
    k++;
    s = CB.gen.sumas.construir(rng, [true, true, false], 3, 3);
    if (!s) continue;
    a = s.r;
    if (a > 999) continue;
    if (CB.gen.restas.prestamos(a, s.b) !== 2) continue;
    return itemResta({ a: a, b: s.b, r: s.a });
  }
  return itemResta({ a: 504, b: 267, r: 237 });
};

/* ——— Curso 1.º (3.0.0): R15…R18 ——— */

/* R15 Quitar 1, 2 y 3 */
CB.gen.restas.R15 = function (rng, D) {
  const a = CB.util.ent(rng, (D === 1) ? 3 : 4, 10);
  const b = CB.util.ent(rng, 1, Math.min(3, a));
  return itemResta({ a: a, b: b, r: a - b });
};

/* R16 Restar sin pasar de 20, sin préstamo por construcción */
CB.gen.restas.R16 = function (rng, D) {
  const a = CB.util.ent(rng, 5, 20);
  const b = CB.util.ent(rng, 0, a % 10);
  return itemResta({ a: a, b: b, r: a - b });
};

/* R17 Restar decenas enteras hasta 50 */
CB.gen.restas.R17 = function (rng, D) {
  const a = CB.util.ent(rng, 2, 5) * 10;
  const b = CB.util.ent(rng, 1, a / 10 - 1) * 10;
  const it = itemResta({ a: a, b: b, r: a - b });
  it.formato = 'opciones4';
  return it;
};

/* R18 Restas de dos cifras sin llevar: mezcla DU−U y DU−DU */
CB.gen.restas.R18 = function (rng, D) {
  const cifrasB = (rng() < 0.5) ? 1 : 2;
  return itemResta(CB.gen.restas.construir(rng, [false, false], 2, cifrasB, 99));
};
