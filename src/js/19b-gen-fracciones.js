/* 19b-gen-fracciones.js — F1…F20 (cursos 3.º-6.º).
   LA RESPUESTA DE UNA FRACCIÓN ES UNA CADENA ('3/4'), como 'c20' en el
   dinero: no se puede teclear y el motor de distractores haría aritmética con
   ella. Todos los ítems de fracción-como-respuesta llevan respuestaFraccion,
   opciones4 y distractoresFijos; los de resultado entero o decimal, teclado. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.fracciones = {};

const fstr = function (n, d) { return CB.gen.motor.fstr(n, d); };

function itemFrac(consigna, num, den, fijos, expr, visual) {
  const resp = fstr(num, den);
  /* Los fijos se DEDUPLICAN aquí, no en cada nivel: den−num puede coincidir
     con num±1, a·b con a+b+1… y un juego de opciones con dos iguales rompe el
     invariante 5. Si tras depurar faltan, se rellena con fracciones vecinas. */
  const unicos = [];
  fijos.forEach(function (f) {
    if (f !== resp && unicos.indexOf(f) === -1) unicos.push(f);
  });
  let k = 2;
  while (unicos.length < 3 && k < 40) {
    const cand = fstr(num + k, den + k + 1);
    if (cand !== resp && unicos.indexOf(cand) === -1) unicos.push(cand);
    k++;
  }
  const it = {
    formato: 'opciones4',
    consigna: consigna,
    respuesta: resp,
    respuestaFraccion: true,
    distractoresFijos: unicos.slice(0, 3),
    expr: expr,
    diagnostico: false
  };
  if (visual) it.visual = visual;
  return it;
}
CB.gen.fracciones._itemFrac = itemFrac;

/* F1 Mitades, tercios y cuartos (3.º) */
CB.gen.fracciones.F1 = function (rng, D) {
  const den = CB.util.elegir(rng, (D === 1) ? [2, 4] : [2, 3, 4]);
  return itemFrac('¿Qué parte está pintada?', 1, den,
    [2, 3, 4, 6].filter(function (x) { return x !== den; })
      .slice(0, 3).map(function (x) { return fstr(1, x); }),
    'f1_' + den, { tipo: 'fraccion', partes: den, sombreadas: 1 });
};

/* F2 ¿Qué fracción está pintada? (3.º) */
CB.gen.fracciones.F2 = function (rng, D) {
  const den = CB.util.elegir(rng, (D === 1) ? [4, 5, 6] : [5, 6, 8, 10, 12]);
  const num = CB.util.ent(rng, 2, den - 1);
  const fijos = [];
  if (num - 1 >= 1) fijos.push(fstr(num - 1, den));
  if (num + 1 <= den) fijos.push(fstr(num + 1, den));
  fijos.push(fstr(den - num, den));
  if (fijos.length < 3) fijos.push(fstr(num, den + 2));
  return itemFrac('¿Qué fracción está pintada?', num, den,
    fijos.slice(0, 3), 'f2_' + num + '_' + den,
    { tipo: 'fraccion', partes: den, sombreadas: num });
};

/* F3 La fracción de una cantidad (3.º) */
CB.gen.fracciones.F3 = function (rng, D) {
  const den = CB.util.elegir(rng, [2, 3, 4, 5]);
  const parte = CB.util.ent(rng, 2, (D === 1) ? 10 : 20);
  const total = den * parte;
  return {
    formato: 'teclado',
    consigna: '¿Cuánto es ' + fstr(1, den) + ' de ' + total + '?',
    operacion: '÷', operandos: [total, den],
    respuesta: parte,
    expr: 'f3_' + den + '_' + total,
    diagnostico: true
  };
};

/* F4 Comparar fracciones sencillas (3.º): la mayor de las unitarias */
CB.gen.fracciones.F4 = function (rng, D) {
  const pool = CB.util.barajar([2, 3, 4, 5, 6, 8, 10, 12], rng).slice(0, 4);
  pool.sort(function (a, b) { return a - b; });
  return itemFrac('Toca la fracción MAYOR.', 1, pool[0],
    pool.slice(1).map(function (x) { return fstr(1, x); }),
    'f4_' + pool.join('_'));
};

/* F5 Fracciones equivalentes (4.º) */
CB.gen.fracciones.F5 = function (rng, D) {
  const base = CB.util.elegir(rng, [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5]]);
  const k = CB.util.ent(rng, 2, (D === 1) ? 3 : 4);
  return itemFrac('¿Cuál vale lo MISMO que ' + fstr(base[0], base[1]) + '?',
    base[0] * k, base[1] * k,
    [fstr(base[0], base[1] * k), fstr(base[0] + 1, base[1]),
     fstr(base[0] * k, base[1] * k + 1)],
    'f5_' + base.join('_') + 'x' + k);
};

/* F6 La fracción de una cantidad grande (4.º) */
CB.gen.fracciones.F6 = function (rng, D) {
  const den = CB.util.elegir(rng, [2, 3, 4, 5, 10]);
  const num = CB.util.ent(rng, 1, den - 1);
  const parte = CB.util.ent(rng, 5, (D === 1) ? 30 : 90);
  const total = den * parte;
  return {
    formato: 'teclado',
    consigna: '¿Cuánto es ' + fstr(num, den) + ' de ' + CB.gen.motor.sep(total) + '?',
    respuesta: num * parte,
    expr: 'f6_' + num + '_' + den + '_' + total,
    diagnostico: false
  };
};

/* F7 Mayor que un entero (4.º) */
CB.gen.fracciones.F7 = function (rng, D) {
  const den = CB.util.elegir(rng, [2, 3, 4, 5]);
  const num = den + CB.util.ent(rng, 1, den);
  return itemFrac('Toca la fracción MAYOR que un entero.', num, den,
    [fstr(Math.max(1, den - 1), den), fstr(1, den), fstr(den, den + 1)],
    'f7_' + num + '_' + den);
};

/* F8 Sumar con el mismo denominador (4.º) */
CB.gen.fracciones.F8 = function (rng, D) {
  const den = CB.util.elegir(rng, [5, 6, 8, 10, 12]);
  const a = CB.util.ent(rng, 1, den - 3);
  const b = CB.util.ent(rng, 1, den - a - 1);
  return itemFrac(fstr(a, den) + ' + ' + fstr(b, den),
    a + b, den,
    [fstr(a + b, den * 2), fstr(a * b, den), fstr(a + b + 1, den)],
    'f8_' + a + '_' + b + '_' + den);
};

/* F9 La fracción y el decimal (4.º) */
CB.gen.fracciones.F9 = function (rng, D) {
  const par = CB.util.elegir(rng, [
    [['0,5'], 1, 2, [[1, 5], [2, 5], [1, 4]]],
    [['0,25'], 1, 4, [[1, 2], [2, 5], [1, 5]]],
    [['0,75'], 3, 4, [[7, 5], [1, 4], [3, 5]]],
    [['0,1'], 1, 10, [[1, 2], [1, 5], [10, 1]]]
  ]);
  return itemFrac('¿Qué fracción es ' + par[0][0] + '?', par[1], par[2],
    par[3].map(function (p) { return fstr(p[0], p[1]); }),
    'f9_' + par[0][0]);
};

/* F10 Simplificar (5.º) */
CB.gen.fracciones.F10 = function (rng, D) {
  const base = CB.util.elegir(rng, [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [1, 5]]);
  const k = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  return itemFrac('Simplifica ' + fstr(base[0] * k, base[1] * k) + '.',
    base[0], base[1],
    [fstr(base[0], base[1] * k), fstr(base[0] + 1, base[1] + 1),
     fstr(base[0] * k, base[1])],
    'f10_' + base.join('_') + 'x' + k);
};

/* F11 El denominador común (5.º) */
CB.gen.fracciones.F11 = function (rng, D) {
  const pares = [[2, 3], [3, 4], [2, 5], [4, 6], [3, 5], [4, 10], [6, 8], [2, 7]];
  const p = CB.util.elegir(rng, (D === 1) ? pares.slice(0, 4) : pares);
  return {
    formato: 'teclado',
    consigna: 'Para sumar ' + fstr(1, p[0]) + ' y ' + fstr(1, p[1]) +
              ', ¿qué denominador común usas? (el menor)',
    respuesta: CB.gen.motor.mcm(p[0], p[1]),
    expr: 'f11_' + p.join('_'),
    diagnostico: false
  };
};

/* F12 Sumar y restar con el mismo denominador (5.º) */
CB.gen.fracciones.F12 = function (rng, D) {
  const den = CB.util.elegir(rng, [6, 8, 9, 10, 12]);
  const resta = rng() < 0.5;
  const a = CB.util.ent(rng, 3, den - 1);
  const b = CB.util.ent(rng, 1, a - 1);
  const sumaReal = resta ? (a - b) : (a + b);
  return itemFrac(fstr(a, den) + (resta ? ' − ' : ' + ') + fstr(b, den),
    sumaReal, den,
    [fstr(sumaReal, resta ? den : den * 2), fstr(Math.abs(a * 1 - b) + 1, den),
     fstr(sumaReal + 1, den)],
    'f12_' + a + (resta ? 'm' : 'p') + b + '_' + den);
};

/* F13 La fracción de una cantidad (5.º) */
CB.gen.fracciones.F13 = function (rng, D) {
  const den = CB.util.elegir(rng, [3, 4, 5, 6, 8, 10]);
  const num = CB.util.ent(rng, 1, den - 1);
  const parte = CB.util.ent(rng, 10, (D === 1) ? 50 : 120);
  return {
    formato: 'teclado',
    consigna: '¿Cuánto es ' + fstr(num, den) + ' de ' + CB.gen.motor.sep(den * parte) + '?',
    respuesta: num * parte,
    expr: 'f13_' + num + '_' + den + '_' + parte,
    diagnostico: false
  };
};

/* F14 El número mixto (5.º) */
CB.gen.fracciones.F14 = function (rng, D) {
  const den = CB.util.elegir(rng, [2, 3, 4, 5]);
  const ent = CB.util.ent(rng, 1, 3);
  const resto = CB.util.ent(rng, 1, den - 1);
  const num = ent * den + resto;
  return {
    formato: 'teclado',
    consigna: fstr(num, den) + ' son ' + ent +
              (ent === 1 ? ' entero' : ' enteros') + ' y ¿cuántos ' +
              ['medios', 'tercios', 'cuartos', 'quintos'][den - 2] + '?',
    respuesta: resto,
    expr: 'f14_' + num + '_' + den,
    diagnostico: false
  };
};

/* F15 De la fracción al decimal (5.º) */
CB.gen.fracciones.F15 = function (rng, D) {
  const par = CB.util.elegir(rng, [[1, 2, 5, 10], [1, 4, 25, 100], [3, 4, 75, 100],
                                   [1, 5, 2, 10], [3, 10, 3, 10], [7, 10, 7, 10],
                                   [1, 10, 1, 10], [9, 10, 9, 10]]);
  return {
    formato: 'teclado',
    conComa: true,
    consigna: 'Escribe ' + fstr(par[0], par[1]) + ' como número con coma.',
    respuesta: CB.gen.motor.dec(par[2], par[3]),
    expr: 'f15_' + par[0] + '_' + par[1],
    diagnostico: false
  };
};

/* F16 Sumar con distinto denominador (6.º) */
CB.gen.fracciones.F16 = function (rng, D) {
  const casos = [[1, 2, 1, 4, 3, 4], [1, 2, 1, 6, 4, 6], [1, 3, 1, 6, 3, 6],
                 [1, 2, 1, 8, 5, 8], [1, 4, 1, 8, 3, 8], [1, 2, 3, 10, 8, 10],
                 [1, 3, 1, 9, 4, 9], [1, 5, 3, 10, 5, 10]];
  const c = CB.util.elegir(rng, casos);
  return itemFrac(fstr(c[0], c[1]) + ' + ' + fstr(c[2], c[3]),
    c[4], c[5],
    [fstr(c[0] + c[2], c[1] + c[3]), fstr(c[4] + 1, c[5]), fstr(c[4], c[5] * 2)],
    'f16_' + c.slice(0, 4).join('_'));
};

/* F17 Restar con distinto denominador (6.º) */
CB.gen.fracciones.F17 = function (rng, D) {
  const casos = [[1, 2, 1, 4, 1, 4], [1, 2, 1, 6, 2, 6], [1, 3, 1, 6, 1, 6],
                 [3, 4, 1, 2, 1, 4], [1, 2, 1, 8, 3, 8], [7, 10, 1, 2, 2, 10],
                 [2, 3, 1, 6, 3, 6], [1, 2, 1, 10, 4, 10]];
  const c = CB.util.elegir(rng, casos);
  return itemFrac(fstr(c[0], c[1]) + ' − ' + fstr(c[2], c[3]),
    c[4], c[5],
    [fstr(c[0] + c[2], c[1] + c[3]), fstr(c[4] + 1, c[5]), fstr(1, c[1] + c[3])],
    'f17_' + c.slice(0, 4).join('_'));
};

/* F18 Una fracción por un entero (6.º) */
CB.gen.fracciones.F18 = function (rng, D) {
  const den = CB.util.elegir(rng, [2, 3, 4, 5]);
  const num = CB.util.ent(rng, 1, den - 1);
  const k = den * CB.util.ent(rng, 1, (D === 1) ? 4 : 10);
  return {
    formato: 'teclado',
    consigna: fstr(num, den) + ' × ' + k,
    respuesta: (num * k) / den,
    expr: 'f18_' + num + '_' + den + '_' + k,
    diagnostico: false
  };
};

/* F19 La fracción de una fracción (6.º) */
CB.gen.fracciones.F19 = function (rng, D) {
  const casos = [[2, 2, 'la mitad de un medio', 1, 4],
                 [2, 3, 'la mitad de un tercio', 1, 6],
                 [2, 4, 'la mitad de un cuarto', 1, 8],
                 [3, 2, 'el tercio de un medio', 1, 6],
                 [2, 5, 'la mitad de un quinto', 1, 10],
                 [3, 3, 'el tercio de un tercio', 1, 9]];
  const c = CB.util.elegir(rng, casos);
  return itemFrac('¿Cuánto es ' + c[2] + '?', c[3], c[4],
    [fstr(1, c[0] + c[1]), fstr(2, c[4]), fstr(1, c[4] - 1)],
    'f19_' + c[0] + '_' + c[1]);
};

/* F20 La fracción mayor (6.º) */
CB.gen.fracciones.F20 = function (rng, D) {
  const candidatas = CB.util.barajar(
    [[1, 2], [2, 3], [3, 4], [1, 3], [3, 5], [5, 6], [1, 4], [4, 5], [2, 5], [5, 8]],
    rng).slice(0, 4);
  let mayor = candidatas[0], i;
  for (i = 1; i < candidatas.length; i++) {
    if (candidatas[i][0] * mayor[1] > mayor[0] * candidatas[i][1]) mayor = candidatas[i];
  }
  return itemFrac('Toca la fracción MAYOR.', mayor[0], mayor[1],
    candidatas.filter(function (f) { return f !== mayor; })
      .map(function (f) { return fstr(f[0], f[1]); }),
    'f20_' + candidatas.map(function (f) { return f.join('-'); }).join('_'));
};
