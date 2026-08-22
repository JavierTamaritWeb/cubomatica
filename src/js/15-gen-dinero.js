/* 15-gen-dinero.js — E1…E8 */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.dinero = {};

CB.gen.dinero.MONEDAS  = [1, 2];                   // euros
CB.gen.dinero.BILLETES = [5, 10, 20, 50, 100];     // euros

/* Las que hacen 1 euro justo, que es lo que pregunta la equivalencia de E8. La
   de 1 céntimo no está: cien monedas no es una equivalencia, es una lista. */
CB.gen.dinero.CENTIMOS = [5, 10, 20, 50];          // AMPLIACIÓN, flagAdulto

/* Las CINCO que existen como pieza, que son las cinco que hay en un bolsillo y
   las cinco que tienen fotografía. La de 1 céntimo entra aquí y no arriba porque
   reconocerla sí tiene sentido; multiplicarla por cien, no. */
CB.gen.dinero.PIEZAS_CENTIMO = [1, 5, 10, 20, 50];

/* UNA PIEZA DE CÉNTIMO SE NOMBRA 'c20', NO 20 */
CB.gen.dinero.pieza      = function (c) { return 'c' + c; };
CB.gen.dinero.esCentimo  = function (v) { return typeof v === 'string' && v.charAt(0) === 'c'; };
CB.gen.dinero.valorCent  = function (v) { return parseInt(String(v).slice(1), 10); };

CB.gen.dinero.esMoneda  = function (v) {
  return CB.gen.dinero.esCentimo(v) || CB.gen.dinero.MONEDAS.indexOf(v) !== -1;
};
CB.gen.dinero.esBillete = function (v) { return CB.gen.dinero.BILLETES.indexOf(v) !== -1; };

/* Concordancia obligatoria: «1 euro», no «1 euros». Es material escolar; una
   falta de concordancia en la consigna la ve el maestro a la primera. */
CB.gen.dinero.euros = function (v) {
  return v + (v === 1 ? ' euro' : ' euros');
};

/* SIEMPRE entero + la palabra, NUNCA «0,50 €»: el invariante 3 prohíbe los
   decimales y en 2.º todavía no se han visto. Y la misma concordancia. */
CB.gen.dinero.centimos = function (c) {
  return c + (c === 1 ? ' céntimo' : ' céntimos');
};

CB.gen.dinero.nombre = function (v) {
  if (CB.gen.dinero.esCentimo(v)) {
    return 'la moneda de ' + CB.gen.dinero.centimos(CB.gen.dinero.valorCent(v));
  }
  if (CB.gen.dinero.esMoneda(v))  return 'la moneda de ' + CB.gen.dinero.euros(v);
  if (CB.gen.dinero.esBillete(v)) return 'el billete de ' + CB.gen.dinero.euros(v);
  return CB.gen.dinero.euros(v);
};

/* Reparte un importe en piezas reales, de mayor a menor. */
CB.gen.dinero.descomponer = function (importe, conBilletes) {
  var piezas = [], resto = importe, i;
  var valores = conBilletes
    ? CB.gen.dinero.BILLETES.slice().reverse().concat(CB.gen.dinero.MONEDAS.slice().reverse())
    : CB.gen.dinero.MONEDAS.slice().reverse();
  for (i = 0; i < valores.length; i++) {
    while (resto >= valores[i] && piezas.length < 12) {
      piezas.push(valores[i]);
      resto -= valores[i];
    }
  }
  return piezas;
};

/* E1 Reconocer monedas y billetes */
CB.gen.dinero.E1 = function (rng, D) {
  var todos = CB.gen.dinero.MONEDAS.concat(CB.gen.dinero.BILLETES);
  var v = CB.util.elegir(rng, todos);
  return {
    formato: 'opciones4',
    consigna: 'Toca ' + CB.gen.dinero.nombre(v) + '.',

    piezasDinero: true,
    respuesta: v,
    expr: 'reconocer' + v,
    diagnostico: false,
    contexto: { pieza: v, esMoneda: CB.gen.dinero.esMoneda(v) },
    distractoresFijos: CB.util.barajar(
      todos.filter(function (x) { return x !== v; }), rng
    ).slice(0, 3)
  };
};

/* E2 Contar con monedas de 1 y 2 € */
CB.gen.dinero.E2 = function (rng, D) {
  var n = CB.util.ent(rng, 3, (D === 1) ? 5 : 8), piezas = [], total = 0, i, v;
  for (i = 0; i < n; i++) {
    v = CB.util.elegir(rng, CB.gen.dinero.MONEDAS);
    piezas.push(v); total += v;
  }
  return {
    formato: 'monedas',
    consigna: '¿Cuántos euros hay en total?',
    piezas: piezas,
    respuesta: total,
    expr: 'contarM' + piezas.join('_'),
    diagnostico: true,
    contexto: { soloMonedas: true }
  };
};

/* E3 Contar con billetes */
CB.gen.dinero.E3 = function (rng, D) {
  var n = CB.util.ent(rng, 2, (D === 1) ? 3 : 4), piezas = [], total = 0, i, v;
  var pool = (D === 3) ? CB.gen.dinero.BILLETES : [5, 10, 20];
  for (i = 0; i < n; i++) {
    v = CB.util.elegir(rng, pool);
    if (total + v > 100) break;
    piezas.push(v); total += v;
  }
  if (!piezas.length) { piezas = [5]; total = 5; }
  return {
    formato: 'monedas',
    consigna: '¿Cuántos euros hay en billetes?',
    piezas: piezas,
    respuesta: total,
    expr: 'contarB' + piezas.join('_'),
    diagnostico: true,
    contexto: { soloBilletes: true }
  };
};

/* E4 Equivalencias entre billetes */
CB.gen.dinero.E4 = function (rng, D) {
  var grande = CB.util.elegir(rng, [10, 20, 50, 100]);
  var pequeno = CB.util.elegir(rng, CB.gen.dinero.BILLETES.filter(function (v) {
    return v < grande && grande % v === 0;
  }));
  if (pequeno == null) pequeno = 5;
  return {
    formato: 'opciones4',
    consigna: '¿Cuántos billetes de ' + CB.gen.dinero.euros(pequeno) +
              ' hacen falta para ' + CB.gen.dinero.euros(grande) + '?',
    respuesta: grande / pequeno,
    expr: 'equiv' + grande + '_' + pequeno,
    diagnostico: true
  };
};

/* E5 Pagar con importe exacto */
CB.gen.dinero.E5 = function (rng, D) {
  var precio = CB.util.ent(rng, 3, (D === 1) ? 12 : 50);
  return {
    formato: 'monedas',
    consigna: 'Paga justo ' + CB.gen.dinero.euros(precio) + '.',
    modo: 'pagar',
    objetivo: precio,
    disponibles: CB.gen.dinero.MONEDAS.concat([5, 10, 20]),
    respuesta: precio,
    expr: 'pagar' + precio,
    diagnostico: true
  };
};

/* E6 El cambio */
CB.gen.dinero.E6 = function (rng, D) {
  var precio = CB.util.ent(rng, 2, (D === 1) ? 8 : 18);
  var pagaCon = CB.util.elegir(rng, CB.gen.dinero.BILLETES.filter(function (v) {
    return v > precio && v <= 20;
  }));
  if (pagaCon == null) pagaCon = 20;
  return {
    formato: 'teclado',
    consigna: 'El precio es ' + CB.gen.dinero.euros(precio) + '. Pagas con ' +
              CB.gen.dinero.euros(pagaCon) + '. ¿Cuánto te devuelven?',
    operacion: '-', operandos: [pagaCon, precio],
    respuesta: pagaCon - precio,
    expr: 'cambio' + pagaCon + '_' + precio,
    diagnostico: true
  };
};

/* E7 La compra: gasto total */
CB.gen.dinero.E7 = function (rng, D) {
  var a = CB.util.ent(rng, 2, (D === 1) ? 15 : 45);
  var b = CB.util.ent(rng, 2, (D === 1) ? 15 : 45);
  if (a + b > 99) b = 99 - a;
  return {
    formato: 'teclado',
    consigna: 'Una cosa cuesta ' + CB.gen.dinero.euros(a) + ' y la otra ' +
              CB.gen.dinero.euros(b) + '. ¿Cuánto es en total?',
    operacion: '+', operandos: [a, b],
    respuesta: a + b,
    expr: 'compra' + a + '_' + b,
    diagnostico: true
  };
};

/* E8 Céntimos — AMPLIACIÓN, apagada por defecto */
CB.gen.dinero.E8 = function (rng, D) {
  if (D === 1 || CB.util.ent(rng, 1, 2) === 1) return CB.gen.dinero.E8reconocer(rng, D);
  return CB.gen.dinero.E8equivalencia(rng, D);
};

CB.gen.dinero.E8reconocer = function (rng, D) {
  var todas = CB.gen.dinero.PIEZAS_CENTIMO.map(CB.gen.dinero.pieza);
  var v = CB.util.elegir(rng, todas);
  return {
    formato: 'opciones4',
    consigna: 'Toca ' + CB.gen.dinero.nombre(v) + '.',
    piezasDinero: true,
    /* NO ES UN NÚMERO, y es a propósito: ver la cabecera del fichero. */
    respuesta: v,
    expr: 'reconocerC' + v,
    diagnostico: false,
    contexto: { pieza: v, esMoneda: true, esCentimo: true },
    distractoresFijos: CB.util.barajar(
      todas.filter(function (x) { return x !== v; }), rng
    ).slice(0, 3)
  };
};

CB.gen.dinero.E8equivalencia = function (rng, D) {
  var c = CB.util.elegir(rng, CB.gen.dinero.CENTIMOS);
  var cuantas = Math.round(100 / c);
  return {
    formato: 'opciones4',
    /* SIEMPRE entero + la palabra «céntimos». Nunca «0,50 €». */
    consigna: '¿Cuántas monedas de ' + CB.gen.dinero.centimos(c) + ' hacen 1 euro?',
    respuesta: cuantas,
    expr: 'cent' + c,
    diagnostico: false
  };
};
