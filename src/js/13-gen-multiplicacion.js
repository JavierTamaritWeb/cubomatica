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

  /* Desde 3.º las tablas enteras y los factores grandes son nucleares: este
     vigilante protege la INICIACIÓN de 2.º (M1-M10), no a los mayores. */
  if (item.tablasCompletas) return true;

  const a = o[0], b = o[1];
  if (!(a >= 0 && a <= 10) || !(b >= 0 && b <= 10)) return false;   // nunca > 10
  if (tablas69) return true;

  const N = CB.gen.multiplicacion.TABLAS_NUCLEARES;
  const M = CB.gen.multiplicacion.MAX_CONCEPTO;
  return (N.indexOf(a) !== -1) || (N.indexOf(b) !== -1) || (a <= M && b <= M);
};

/* ——— Cursos 3.º-5.º (3.1.0): M11…M22. Todos llevan tablasCompletas: desde
   3.º las tablas enteras son nucleares y los factores pueden pasar de 10, y
   factoresValidos deja de vigilarlos (vigila la INICIACIÓN de 2.º). ——— */

function itemMultGrande(a, b) {
  return {
    formato: 'teclado',
    operacion: '×',
    operandos: [a, b],
    respuesta: a * b,
    expr: a + 'x' + b,
    consigna: (a > 999 ? CB.gen.motor.sep(a) : a) + ' × ' + b,
    diagnostico: true,
    tablasCompletas: true
  };
}
CB.gen.multiplicacion._itemMultGrande = itemMultGrande;

function conTablasCompletas(it) { it.tablasCompletas = true; return it; }

/* M11 La tabla del 6 (3.º) */
CB.gen.multiplicacion.M11 = function (rng, D) {
  return conTablasCompletas(tabla(6)(rng, D));
};

/* M12 Las tablas del 7, del 8 y del 9 (3.º) */
CB.gen.multiplicacion.M12 = function (rng, D) {
  return conTablasCompletas(tabla(CB.util.elegir(rng, [7, 8, 9]))(rng, D));
};

/* M13 Todas las tablas (3.º) */
CB.gen.multiplicacion.M13 = function (rng, D) {
  return conTablasCompletas(tabla(CB.util.ent(rng, 2, 10))(rng, D));
};

/* M14 Por una cifra, sin llevada (3.º): cada dígito × b se queda en su casilla */
CB.gen.multiplicacion.M14 = function (rng, D) {
  const b = CB.util.ent(rng, 2, 4);
  const tope = Math.floor(9 / b);
  const a = CB.util.ent(rng, 1, tope) * 10 + CB.util.ent(rng, 0, tope);
  return itemMultGrande(a, b);
};

/* M15 Por una cifra, con llevada (3.º) */
CB.gen.multiplicacion.M15 = function (rng, D) {
  const b = CB.util.ent(rng, 3, 9);
  const a = CB.util.ent(rng, 12, (D === 1) ? 40 : Math.floor(999 / b));
  return itemMultGrande(a, b);
};

/* M16 Por 10 y por 100 (3.º) */
CB.gen.multiplicacion.M16 = function (rng, D) {
  const pot = CB.util.elegir(rng, (D === 1) ? [10] : [10, 100]);
  const a = CB.util.ent(rng, 2, 99);
  return itemMultGrande(a, pot);
};

/* M17 Por dos cifras (4.º) */
CB.gen.multiplicacion.M17 = function (rng, D) {
  const a = CB.util.ent(rng, 12, (D === 1) ? 40 : 99);
  const b = CB.util.ent(rng, 12, (D === 1) ? 25 : 99);
  return itemMultGrande(a, b);
};

/* M18 Por decenas enteras (4.º) */
CB.gen.multiplicacion.M18 = function (rng, D) {
  const a = CB.util.ent(rng, 12, (D === 1) ? 40 : 99);
  const b = CB.util.ent(rng, 2, 9) * 10;
  return itemMultGrande(a, b);
};

/* M19 El doble y el triple de grandes (4.º) */
CB.gen.multiplicacion.M19 = function (rng, D) {
  const k = CB.util.elegir(rng, [2, 3]);
  const n = CB.util.ent(rng, 100, Math.floor(9999 / k));
  const it = itemMultGrande(n, k);
  it.consigna = '¿Cuánto es el ' + (k === 2 ? 'doble' : 'triple') + ' de ' +
                CB.gen.motor.sep(n) + '?';
  it.expr = 'dt' + k + '_' + n;
  return it;
};

/* M20 Por 1.000 (4.º) */
CB.gen.multiplicacion.M20 = function (rng, D) {
  const a = CB.util.ent(rng, 2, (D === 1) ? 99 : 999);
  return itemMultGrande(a, 1000);
};

/* M21 Decenas por decenas y centenas (5.º) */
CB.gen.multiplicacion.M21 = function (rng, D) {
  const a = CB.util.ent(rng, 2, 9) * ((rng() < 0.5) ? 100 : 10);
  const b = CB.util.ent(rng, 2, 9) * 10;
  return itemMultGrande(a, b);
};

/* M22 Operaciones combinadas (5.º): el paréntesis manda */
CB.gen.multiplicacion.M22 = function (rng, D) {
  const a = CB.util.ent(rng, 2, (D === 1) ? 10 : 20);
  const b = CB.util.ent(rng, 2, 9);
  const c = CB.util.ent(rng, 2, 9);
  const conParentesis = rng() < 0.5;
  return {
    formato: 'teclado',
    consigna: conParentesis
      ? '(' + a + ' + ' + b + ') × ' + c
      : a + ' + ' + b + ' × ' + c,
    respuesta: conParentesis ? (a + b) * c : a + b * c,
    expr: 'comb' + (conParentesis ? 'p' : '') + a + '_' + b + '_' + c,
    diagnostico: false,
    tablasCompletas: true
  };
};
