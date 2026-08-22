/* 13-gen-multiplicacion.js — M1…M10 */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.multiplicacion = {};

/* Las tres tablas que 2.º practica como iniciación en el tercer trimestre. */
CB.gen.multiplicacion.TABLAS_NUCLEARES = [2, 5, 10];
/* Multiplicadores: la tabla se practica ENTERA, de 0 a 10. */
CB.gen.multiplicacion.MULTIPLICADORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/* Trabajo de concepto con matrices: ambos factores pequeños. */
CB.gen.multiplicacion.MAX_CONCEPTO = 5;

CB.gen.multiplicacion.conFlag = function (ctx) {
  return !!(ctx && ctx.ajustes && ctx.ajustes.tablas69);
};

function itemMult(a, b, formato) {
  return {
    formato: formato || 'teclado',
    operacion: '×',
    operandos: [a, b],
    respuesta: a * b,
    expr: a + 'x' + b,
    consigna: a + ' × ' + b,
    /* La UI está OBLIGADA a pintar esto antes del resultado. */
    visual: { tipo: 'matriz', filas: a, columnas: b },
    sumaReiterada: (function () {
      if (a === 0 || a > 6) return null;         // no se dibujan 10 sumandos
      const t = [];
      let i;
      for (i = 0; i < a; i++) t.push(b);
      return t.join(' + ');
    })(),
    diagnostico: true
  };
}

/* M1 Veces: la suma reiterada */
CB.gen.multiplicacion.M1 = function (rng, D) {
  const a = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  const b = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  const it = itemMult(a, b, 'opciones4');
  it.consigna = '¿Cuánto es ' + b + ' repetido ' + a + ' veces?';
  return it;
};

/* M2 Filas y columnas */
CB.gen.multiplicacion.M2 = function (rng, D) {
  const a = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  const b = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  const it = itemMult(a, b, 'opciones4');
  it.consigna = 'Hay ' + a + ' filas de ' + b + ' bloques. ¿Cuántos bloques hay?';
  return it;
};

/* M3 Del dibujo a «a × b» */
CB.gen.multiplicacion.M3 = function (rng, D) {
  const a = CB.util.ent(rng, 2, 5), b = CB.util.ent(rng, 2, 5);
  const it = itemMult(a, b, 'teclado');
  it.consigna = a + ' × ' + b;
  return it;
};

/* Tablas */
/* Las tablas del 3 y del 4 (M9, M10) son niveles de ampliación y solo se sirven con el flag del adulto activado, de modo que con el flag apagado el factor fijo siempre pertenece a {2, 5, 10}. */
function tabla(fijo) {
  return function (rng, D, ctx) {
    let pool = CB.gen.multiplicacion.MULTIPLICADORES.slice();
    if (D === 1) pool = pool.filter(function (v) { return v <= 5; });
    if (D === 3) pool = pool.filter(function (v) { return v >= 5; });
    let b = CB.util.elegir(rng, pool);
    if (b == null) b = 2;
    return itemMult(fijo, b, 'teclado');
  };
}

CB.gen.multiplicacion.M4 = tabla(2);
CB.gen.multiplicacion.M5 = tabla(10);
CB.gen.multiplicacion.M6 = tabla(5);

/* M7 Mezcla del 2, del 5 y del 10 */
CB.gen.multiplicacion.M7 = function (rng, D) {
  const f = CB.util.elegir(rng, CB.gen.multiplicacion.TABLAS_NUCLEARES);
  const b = CB.util.elegir(rng, CB.gen.multiplicacion.MULTIPLICADORES);
  return itemMult(f, b == null ? 2 : b, 'teclado');
};

/* M8 Dobles y mitades */
CB.gen.multiplicacion.M8 = function (rng, D) {
  const pideMitad = rng() < 0.5;
  const b = CB.util.ent(rng, 1, (D === 1) ? 5 : 10);
  if (pideMitad) {
    /* La mitad se expresa SOLO con palabras, nunca con notación de fracción
       (invariante 3): un niño de 2.º que ve «½» no lee «medio», no lee nada. */
    const doble = b * 2;
    const it = itemMult(2, b, 'opciones4');
    it.consigna = '¿Cuál es la mitad de ' + doble + '?';
    it.respuesta = b;
    it.expr = 'mitad' + doble;
    it.visual = { tipo: 'matriz', filas: 2, columnas: b };
    return it;
  }
  const it2 = itemMult(2, b, 'opciones4');
  it2.consigna = '¿Cuál es el doble de ' + b + '?';
  it2.expr = 'doble' + b;
  return it2;
};

/* M9 y M10: AMPLIACIÓN (tablas del 3 y del 4) */
CB.gen.multiplicacion.M9  = tabla(3);
CB.gen.multiplicacion.M10 = tabla(4);

/* Comprobación del invariante 4, usada por casos-generadores.js.
   Contraejemplo explícito de F2: con el flag apagado, ningún ítem puede ser un
   hecho propio de las tablas del 3, 4, 6, 7, 8 o 9. */
CB.gen.multiplicacion.factoresValidos = function (item, tablas69) {
  const o = item.operandos || [];
  if (o.length !== 2) return true;              // «la mitad de» no es un producto

  const a = o[0], b = o[1];
  if (!(a >= 0 && a <= 10) || !(b >= 0 && b <= 10)) return false;   // nunca > 10
  if (tablas69) return true;

  const N = CB.gen.multiplicacion.TABLAS_NUCLEARES;
  const M = CB.gen.multiplicacion.MAX_CONCEPTO;
  return (N.indexOf(a) !== -1) || (N.indexOf(b) !== -1) || (a <= M && b <= M);
};
