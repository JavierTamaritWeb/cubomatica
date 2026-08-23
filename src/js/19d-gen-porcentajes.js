/* 19d-gen-porcentajes.js — T1…T6 (6.º). Respuestas SIEMPRE enteras: los
   porcentajes se construyen desde la respuesta para que el reparto cuadre. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.porcentajes = {};

/* T1 El tanto por ciento */
CB.gen.porcentajes.T1 = function (rng, D) {
  const pct = CB.util.elegir(rng, (D === 1) ? [50, 100] : [10, 25, 50, 75, 100]);
  const base = CB.util.ent(rng, 2, 20) * (pct === 25 || pct === 75 ? 4 : (pct === 10 ? 10 : 2));
  const resp = (base * pct) / 100;
  const candidatos = [base - resp, resp + pct, Math.round(resp / 2), resp * 2,
                      resp + 5, resp + 1];
  const fijos = [];
  candidatos.forEach(function (v) {
    if (v > 0 && v !== resp && fijos.indexOf(v) === -1 && fijos.length < 3) fijos.push(v);
  });
  return {
    formato: 'opciones4',
    consigna: '¿Cuánto es el ' + pct + ' % de ' + base + '?',
    respuesta: resp,
    expr: 't1_' + pct + '_' + base,
    diagnostico: false,
    distractoresFijos: fijos
  };
};

/* T2 El 10 %, el 25 % y el 50 % de números grandes */
CB.gen.porcentajes.T2 = function (rng, D) {
  const pct = CB.util.elegir(rng, [10, 25, 50]);
  const paso = { 10: 10, 25: 4, 50: 2 }[pct];
  const base = CB.util.ent(rng, 3, (D === 1) ? 40 : 99) * paso;
  return {
    formato: 'teclado',
    consigna: '¿Cuánto es el ' + pct + ' % de ' + CB.gen.motor.sep(base) + '?',
    respuesta: (base * pct) / 100,
    expr: 't2_' + pct + '_' + base,
    diagnostico: true,
    operacion: '%', operandos: [base, pct]
  };
};

/* T3 El descuento */
CB.gen.porcentajes.T3 = function (rng, D) {
  const pct = CB.util.elegir(rng, [10, 20, 25, 50]);
  const paso = { 10: 10, 20: 5, 25: 4, 50: 2 }[pct];
  const precio = CB.util.ent(rng, 2, (D === 1) ? 20 : 90) * paso;
  return {
    formato: 'teclado',
    consigna: 'Cuesta ' + precio + ' € y tiene un ' + pct +
              ' % de descuento. ¿Cuánto pagas?',
    respuesta: precio - (precio * pct) / 100,
    expr: 't3_' + pct + '_' + precio,
    diagnostico: true,
    operacion: '%', operandos: [precio, pct]
  };
};

/* T4 La subida */
CB.gen.porcentajes.T4 = function (rng, D) {
  const pct = CB.util.elegir(rng, [10, 25, 50]);
  const paso = { 10: 10, 25: 4, 50: 2 }[pct];
  const precio = CB.util.ent(rng, 2, (D === 1) ? 20 : 80) * paso;
  return {
    formato: 'teclado',
    consigna: 'Costaba ' + precio + ' € y sube un ' + pct +
              ' %. ¿Cuánto cuesta ahora?',
    respuesta: precio + (precio * pct) / 100,
    expr: 't4_' + pct + '_' + precio,
    diagnostico: false
  };
};

/* T5 La proporción directa */
CB.gen.porcentajes.T5 = function (rng, D) {
  const unidad = CB.util.ent(rng, 2, (D === 1) ? 5 : 12);
  const n1 = CB.util.ent(rng, 2, 5);
  let n2 = CB.util.ent(rng, 2, 9);
  if (n2 === n1) n2 += 1;
  return {
    formato: 'teclado',
    consigna: n1 + ' cuadernos cuestan ' + (n1 * unidad) + ' €. ¿Cuánto cuestan ' +
              n2 + '?',
    respuesta: n2 * unidad,
    expr: 't5_' + unidad + '_' + n1 + '_' + n2,
    diagnostico: false
  };
};

/* T6 Cualquier porcentaje entero */
CB.gen.porcentajes.T6 = function (rng, D) {
  const pct = CB.util.ent(rng, 2, 30);
  const base = CB.util.ent(rng, 2, (D === 1) ? 6 : 9) * 100;
  return {
    formato: 'teclado',
    consigna: '¿Cuánto es el ' + pct + ' % de ' + CB.gen.motor.sep(base) + '?',
    respuesta: (base * pct) / 100,
    expr: 't6_' + pct + '_' + base,
    diagnostico: true,
    operacion: '%', operandos: [base, pct]
  };
};
