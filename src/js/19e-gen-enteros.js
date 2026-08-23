/* 19e-gen-enteros.js — Z1…Z4 (6.º). La primera vez que el juego dice un
   número negativo, y siempre con contexto: termómetro, ascensor, recta. El
   teclado saca la tecla del signo con conSigno. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.enteros = {};

/* Z1 El termómetro */
CB.gen.enteros.Z1 = function (rng, D) {
  const desde = CB.util.ent(rng, (D === 1) ? 2 : 0, 9);
  const baja = CB.util.ent(rng, desde + 1, desde + ((D === 1) ? 6 : 15));
  return {
    formato: 'teclado', conSigno: true,
    consigna: 'Estaba a ' + desde + ' °C y baja ' + baja +
              ' grados. ¿A qué temperatura queda?',
    operacion: '-', operandos: [desde, baja],
    respuesta: desde - baja,
    expr: 'z1_' + desde + '_' + baja,
    diagnostico: true
  };
};

/* Z2 El ascensor */
CB.gen.enteros.Z2 = function (rng, D) {
  const planta = CB.util.ent(rng, 0, (D === 1) ? 3 : 6);
  const baja = CB.util.ent(rng, planta + 1, planta + 5);
  return {
    formato: 'teclado', conSigno: true,
    consigna: 'El ascensor está en la planta ' + planta + ' y baja ' + baja +
              ' plantas. ¿A qué planta llega?',
    operacion: '-', operandos: [planta, baja],
    respuesta: planta - baja,
    expr: 'z2_' + planta + '_' + baja,
    diagnostico: true
  };
};

/* Z3 Comparar enteros */
CB.gen.enteros.Z3 = function (rng, D) {
  const grupo = [];
  let k = 0;
  while (grupo.length < 4 && k < 60) {
    k++;
    const v = CB.util.ent(rng, 0, 20) - 10;
    if (grupo.indexOf(v) === -1) grupo.push(v);
  }
  const menor = Math.min.apply(null, grupo);
  return {
    formato: 'opciones4',
    consigna: 'Toca el número MENOR.',
    respuesta: menor,
    expr: 'z3_' + grupo.join('_'),
    diagnostico: false,
    distractoresFijos: grupo.filter(function (v) { return v !== menor; })
  };
};

/* Z4 La recta con negativos */
CB.gen.enteros.Z4 = function (rng, D) {
  const n = CB.util.ent(rng, 0, 18) - 9;
  const pidePosterior = rng() < 0.5;
  return {
    formato: 'teclado', conSigno: true,
    consigna: pidePosterior
      ? '¿Qué número va justo después del ' + n + '?'
      : '¿Qué número va justo antes del ' + n + '?',
    respuesta: pidePosterior ? n + 1 : n - 1,
    expr: 'z4_' + (pidePosterior ? 'p' : 'a') + n,
    diagnostico: false
  };
};
