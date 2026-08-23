/* 11-gen-sumas.js — S1…S16 */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.sumas = {};

/* Cuenta las llevadas reales de a + b. Compartida con casos-generadores.js. */
CB.gen.sumas.llevadas = function (a, b) {
  let n = 0, acarreo = 0, x = a, y = b, s;
  while (x > 0 || y > 0) {
    s = (x % 10) + (y % 10) + acarreo;
    acarreo = (s >= 10) ? 1 : 0;
    if (acarreo) n++;
    x = Math.floor(x / 10); y = Math.floor(y / 10);
  }
  return n;
};

/**
 * Construye a + b con el patrón de llevadas pedido.
 * @param patron array por columna desde las unidades: true = esa columna lleva
 * @param cifrasA / cifrasB número de cifras de cada sumando
 */
CB.gen.sumas.construir = function (rng, patron, cifrasA, cifrasB) {
  const cols = Math.max(cifrasA, cifrasB, patron.length);
  const digA = [], digB = [];
  let acarreo = 0, i, dA, dB, suma, intentos;

  for (i = 0; i < cols; i++) {
    const quiere = !!patron[i];
    const maxA = (i < cifrasA) ? 9 : 0;
    const maxB = (i < cifrasB) ? 9 : 0;
    const minA = (i === cifrasA - 1 && cifrasA > 1) ? 1 : 0;
    const minB = (i === cifrasB - 1 && cifrasB > 1) ? 1 : 0;

    dA = 0; dB = 0; intentos = 0;
    do {
      intentos++;
      dA = CB.util.ent(rng, minA, maxA);
      dB = CB.util.ent(rng, minB, maxB);
      suma = dA + dB + acarreo;
    } while (((suma >= 10) !== quiere) && intentos < 60);

    /* Si el rng no lo consigue por azar, se fuerza de forma determinista: nunca
       se devuelve un ítem que incumpla el patrón declarado. */
    if ((suma >= 10) !== quiere) {
      if (quiere && maxA > 0 && maxB > 0) {
        dA = Math.max(minA, 9 - acarreo); dB = Math.max(minB, 9);
      } else {
        dA = minA; dB = minB;
      }
      suma = dA + dB + acarreo;
      if ((suma >= 10) !== quiere) return null;
    }

    digA.push(dA); digB.push(dB);
    acarreo = (suma >= 10) ? 1 : 0;
  }

  let a = 0, b = 0, p = 1;
  for (i = 0; i < cols; i++) { a += digA[i] * p; b += digB[i] * p; p *= 10; }
  return { a: a, b: b, r: a + b };
};

/* Genera hasta que el resultado cabe en el techo del nivel. */
CB.gen.sumas.intentar = function (rng, patron, cifrasA, cifrasB, techo, intentos) {
  let k = 0, s;
  intentos = intentos || 30;
  while (k < intentos) {
    k++;
    s = CB.gen.sumas.construir(rng, patron, cifrasA, cifrasB);
    if (s && s.r <= techo && s.r >= 0) return s;
  }
  return s || { a: 1, b: 1, r: 2 };
};

function itemSuma(s, destreza) {
  return {
    formato: 'teclado',
    operacion: '+',
    operandos: [s.a, s.b],
    respuesta: s.r,
    expr: s.a + '+' + s.b,
    consigna: s.a + ' + ' + s.b,
    diagnostico: true,
    llevadas: CB.gen.sumas.llevadas(s.a, s.b)
  };
}

/* S1 Sumas hasta 10, sin llevar */
CB.gen.sumas.S1 = function (rng, D) {
  const techo = (D === 1) ? 6 : 10;
  const a = CB.util.ent(rng, 0, techo);
  const b = CB.util.ent(rng, 0, techo - a);
  return itemSuma({ a: a, b: b, r: a + b });
};

/* S2 Sumas hasta 20 sin llevar */
CB.gen.sumas.S2 = function (rng, D) {
  const a = CB.util.ent(rng, 10, (D === 1) ? 14 : 19);
  const b = CB.util.ent(rng, 0, 9 - (a % 10));
  return itemSuma({ a: a, b: b, r: a + b });
};

/* S3 Dobles hasta 10 + 10 */
CB.gen.sumas.S3 = function (rng, D) {
  const a = CB.util.ent(rng, 1, (D === 1) ? 5 : 10);
  const it = itemSuma({ a: a, b: a, r: a + a });
  it.formato = 'opciones4';
  it.consigna = '¿Cuánto es el doble de ' + a + '?';
  return it;
};

/* S4 Sumar 10 */
CB.gen.sumas.S4 = function (rng, D) {
  const a = CB.util.ent(rng, 1, (D === 1) ? 49 : 89);
  return itemSuma({ a: a, b: 10, r: a + 10 });
};

/* S5 DU + U sin llevar */
CB.gen.sumas.S5 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false], 2, 1, 99));
};

/* S6 DU + DU sin llevar */
CB.gen.sumas.S6 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false], 2, 2, 99));
};

/* S7 DU + U con llevada */
CB.gen.sumas.S7 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false], 2, 1, 199));
};

/* S8 DU + DU con UNA llevada */
CB.gen.sumas.S8 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false], 2, 2, 99));
};

/* S9 DU + DU con llevada, hasta 199 */
CB.gen.sumas.S9 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false], 2, 2, 199));
};

/* S10 Tres sumandos de una cifra */
CB.gen.sumas.S10 = function (rng, D) {
  const techo = (D === 1) ? 15 : 27;
  let a, b, c, k = 0;
  do {
    k++;
    a = CB.util.ent(rng, 1, 9); b = CB.util.ent(rng, 1, 9); c = CB.util.ent(rng, 1, 9);
  } while (a + b + c > techo && k < 40);
  return {
    formato: 'teclado', operacion: '+', operandos: [a, b, c],
    respuesta: a + b + c,
    expr: a + '+' + b + '+' + c,
    consigna: a + ' + ' + b + ' + ' + c,
    diagnostico: true,
    llevadas: (a + b + c >= 10) ? 1 : 0
  };
};

/* S11 CDU + DU sin llevar */
CB.gen.sumas.S11 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false, false], 3, 2, 599));
};

/* S12 CDU + DU con UNA llevada */
CB.gen.sumas.S12 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false, false], 3, 2, 599));
};

/* S13 Sumar decenas completas */
CB.gen.sumas.S13 = function (rng, D) {
  let a = CB.util.ent(rng, 1, (D === 1) ? 20 : 49) * 10;
  const b = CB.util.ent(rng, 1, 9) * 10;
  if (a + b > 599) a = 599 - b - ((599 - b) % 10);
  const it = itemSuma({ a: a, b: b, r: a + b });
  it.formato = 'opciones4';
  return it;
};

/* S14 CDU + CDU sin llevar */
CB.gen.sumas.S14 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false, false], 3, 3, 999));
};

/* S15 CDU + CDU con UNA llevada */
CB.gen.sumas.S15 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false, false], 3, 3, 999));
};

/* S16 Tres sumandos con decenas */
CB.gen.sumas.S16 = function (rng, D) {
  let a = CB.util.ent(rng, 1, 9) * 10 + CB.util.ent(rng, 0, 9);
  let b = CB.util.ent(rng, 1, 9) * 10;
  let c = CB.util.ent(rng, 1, 9);
  let r = a + b + c;
  if (r > 999) { a = 100; b = 20; c = 3; r = 123; }
  return {
    formato: 'teclado', operacion: '+', operandos: [a, b, c],
    respuesta: r,
    expr: a + '+' + b + '+' + c,
    consigna: a + ' + ' + b + ' + ' + c,
    diagnostico: true,
    llevadas: CB.gen.sumas.llevadas(a + b, c) + CB.gen.sumas.llevadas(a, b)
  };
};

/* ——— Curso 1.º (3.0.0): S17…S21 ——— */

/* S17 Sumar 1, 2 y 3 */
CB.gen.sumas.S17 = function (rng, D) {
  const a = CB.util.ent(rng, 0, (D === 1) ? 5 : 10);
  const b = CB.util.ent(rng, 1, 3);
  return itemSuma({ a: a, b: b, r: a + b });
};

/* S18 Sumar sin pasar de 20, sin llevada por construcción */
CB.gen.sumas.S18 = function (rng, D) {
  const a = CB.util.ent(rng, 0, (D === 1) ? 10 : 19);
  const b = CB.util.ent(rng, 0, Math.min(9 - (a % 10), 20 - a));
  return itemSuma({ a: a, b: b, r: a + b });
};

/* S19 Sumar decenas enteras hasta 50 */
CB.gen.sumas.S19 = function (rng, D) {
  const a = CB.util.ent(rng, 1, (D === 1) ? 2 : 4) * 10;
  const b = CB.util.ent(rng, 1, Math.max(1, (50 - a) / 10)) * 10;
  const it = itemSuma({ a: a, b: b, r: a + b });
  it.formato = 'opciones4';
  return it;
};

/* S20 Sumas de dos cifras sin llevar: mezcla DU+U y DU+DU */
CB.gen.sumas.S20 = function (rng, D) {
  const cifrasB = (rng() < 0.5) ? 1 : 2;
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false], 2, cifrasB, 99));
};

/* S21 Pasar de 10: la primera llevada (a + b entre 11 y 18) */
CB.gen.sumas.S21 = function (rng, D) {
  let a, b, k = 0;
  do {
    k++;
    a = CB.util.ent(rng, 2, 9); b = CB.util.ent(rng, 2, 9);
  } while (a + b < 11 && k < 40);
  if (a + b < 11) { a = 8; b = 5; }
  return itemSuma({ a: a, b: b, r: a + b });
};

/* ——— Cursos 3.º-4.º (3.1.0): S22…S26 ——— */

/* S22 Sumas con dos llevadas (3.º) */
CB.gen.sumas.S22 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, true, false], 3, 3, 999));
};

/* S23 Sumas de cuatro cifras (3.º) */
CB.gen.sumas.S23 = function (rng, D) {
  const patron = [rng() < 0.6, rng() < 0.4, false, false];
  return itemSuma(CB.gen.sumas.intentar(rng, patron, 4, 4, 9999));
};

/* S24 Sumar centenas y millares de cabeza (3.º) */
CB.gen.sumas.S24 = function (rng, D) {
  const a = CB.util.ent(rng, 10, (D === 1) ? 40 : 89) * 100;
  const b = CB.util.ent(rng, 1, 9) * 100;
  const it = itemSuma({ a: a, b: b, r: a + b });
  it.formato = 'opciones4';
  it.consigna = CB.gen.motor.sep(a) + ' + ' + b;
  return it;
};

/* S25 Sumas de números grandes (4.º) */
CB.gen.sumas.S25 = function (rng, D) {
  const patron = [rng() < 0.6, rng() < 0.4, rng() < 0.3, false, false];
  return itemSuma(CB.gen.sumas.intentar(rng, patron, 5, 5, 99999));
};

/* S26 Estimar sumas (4.º) */
CB.gen.sumas.S26 = function (rng, D) {
  const am = CB.util.ent(rng, 2, 5) * 1000;
  const bm = CB.util.ent(rng, 2, 4) * 1000;
  const a = am - CB.util.ent(rng, 30, 180);
  const b = bm - CB.util.ent(rng, 30, 180);
  const est = am + bm;
  return {
    formato: 'opciones4',
    consigna: '¿Cuál es la MEJOR estimación de ' + CB.gen.motor.sep(a) + ' + ' +
              CB.gen.motor.sep(b) + '?',
    respuesta: est,
    expr: 'estS' + a + '_' + b,
    diagnostico: false,
    distractoresFijos: [est - 1000, est + 1000, est - 500]
  };
};
