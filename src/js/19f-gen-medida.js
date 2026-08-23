/* 19f-gen-medida.js — Sentido de la medida (3.2.0): B1…B15 (CB.gen.medida) y
   H1…H6 (CB.gen.tiempo). Regla de la casa: los decimales solo aparecen en la
   CONSIGNA desde 4.º-5.º y solo son RESPUESTA con conComa; el resto de
   respuestas son enteros. El reloj es un visual, nunca una imagen. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.medida = {};
CB.gen.tiempo = {};

/* Conversión entre dos unidades con factor entero: la mitad de las veces se
   pregunta en un sentido y la mitad en el otro. */
function itemConversion(rng, grande, chica, factor, nMax, D) {
  const alReves = rng() < 0.5;
  const n = CB.util.ent(rng, 2, (D === 1) ? Math.max(2, Math.ceil(nMax / 2)) : nMax);
  if (alReves) {
    return {
      formato: 'teclado',
      consigna: '¿Cuántos ' + grande + ' son ' + CB.gen.motor.sep(n * factor) + ' ' + chica + '?',
      operacion: '÷', operandos: [n * factor, factor],
      respuesta: n,
      expr: 'cv' + grande + n + 'r',
      diagnostico: true
    };
  }
  return {
    formato: 'teclado',
    consigna: n + ' ' + grande + ' son… ¿cuántos ' + chica + '?',
    operacion: '×', operandos: [n, factor],
    respuesta: n * factor,
    expr: 'cv' + grande + n,
    diagnostico: true,
    tablasCompletas: true
  };
}
CB.gen.medida._itemConversion = itemConversion;

/* B1 Medir con bloques (1.º) */
CB.gen.medida.B1 = function (rng, D) {
  const n = CB.util.ent(rng, 2, (D === 1) ? 6 : 10);
  return {
    formato: 'teclado',
    consigna: 'Cada bloque mide 1 centímetro. ¿Cuántos centímetros mide la barra?',
    visual: { tipo: 'fraccion', partes: n, sombreadas: n },
    respuesta: n,
    expr: 'b1_' + n,
    diagnostico: false
  };
};

/* B2 Centímetros y metros (2.º) */
CB.gen.medida.B2 = function (rng, D) {
  return itemConversion(rng, 'metros', 'centímetros', 100, 9, D);
};

/* B3 ¿Con qué se mide? (2.º) */
CB.gen.medida.B3 = function (rng, D) {
  const casos = [
    ['el agua de una botella', 'litros'],
    ['lo que pesa una sandía', 'kilos'],
    ['el largo de una cuerda', 'metros'],
    ['lo que dura el recreo', 'minutos'],
    ['lo que pesa una carta', 'gramos'],
    ['el alto de una puerta', 'metros'],
    ['la leche de una jarra', 'litros']
  ];
  const c = CB.util.elegir(rng, casos);
  const todas = ['litros', 'kilos', 'metros', 'minutos', 'gramos'];
  const fijos = CB.util.barajar(
    todas.filter(function (u) { return u !== c[1]; }), rng).slice(0, 3);
  return {
    formato: 'opciones4',
    consigna: '¿Con qué medirías ' + c[0] + '?',
    respuesta: c[1],
    respuestaFraccion: true,
    distractoresFijos: fijos,
    expr: 'b3_' + c[0].replace(/ /g, ''),
    diagnostico: false
  };
};

/* B4 De metros a centímetros (3.º) */
CB.gen.medida.B4 = function (rng, D) {
  return itemConversion(rng, 'metros', 'centímetros', 100, 9, D);
};

/* B5 Gramos y kilos (3.º) */
CB.gen.medida.B5 = function (rng, D) {
  return itemConversion(rng, 'kilos', 'gramos', 1000, 9, D);
};

/* B6 El perímetro (3.º) */
CB.gen.medida.B6 = function (rng, D) {
  const a = CB.util.ent(rng, 2, (D === 1) ? 5 : 9);
  const b = CB.util.ent(rng, 2, (D === 1) ? 5 : 9);
  return {
    formato: 'teclado',
    consigna: 'Un rectángulo mide ' + a + ' cm de largo y ' + b +
              ' cm de alto. ¿Cuántos centímetros mide su borde entero?',
    visual: { tipo: 'matriz', filas: b, columnas: a },
    respuesta: 2 * (a + b),
    expr: 'b6_' + a + '_' + b,
    diagnostico: false
  };
};

/* B7 Kilómetros y metros (4.º) */
CB.gen.medida.B7 = function (rng, D) {
  return itemConversion(rng, 'kilómetros', 'metros', 1000, 9, D);
};

/* B8 Litros y mililitros (4.º) */
CB.gen.medida.B8 = function (rng, D) {
  return itemConversion(rng, 'litros', 'mililitros', 1000, 9, D);
};

/* B9 Perímetros de figuras (4.º) */
CB.gen.medida.B9 = function (rng, D) {
  const n = CB.util.ent(rng, 3, (D === 1) ? 9 : 25);
  const figura = CB.util.elegir(rng, [
    ['un cuadrado', 4], ['un triángulo de lados iguales', 3],
    ['un rombo de lados iguales', 4]
  ]);
  return {
    formato: 'teclado',
    consigna: 'Cada lado de ' + figura[0] + ' mide ' + n +
              ' cm. ¿Cuál es su perímetro?',
    operacion: '×', operandos: [figura[1], n],
    respuesta: figura[1] * n,
    /* cuadrado y rombo comparten lados=4: la figura entra en la identidad (E147) */
    expr: 'b9_' + figura[0].split(' ')[1].charAt(0) + figura[1] + '_' + n,
    diagnostico: true,
    tablasCompletas: true
  };
};

/* B10 El sistema métrico (5.º): decimal en la pregunta, entero en la respuesta */
CB.gen.medida.B10 = function (rng, D) {
  const casos = [
    ['m', 'cm', 100, 10], ['km', 'm', 1000, 10], ['cm', 'mm', 10, 10]
  ];
  const c = CB.util.elegir(rng, casos);
  const decimas = CB.util.ent(rng, 11, (D === 1) ? 45 : 95);   // x,y
  return {
    formato: 'teclado',
    consigna: CB.gen.motor.coma(decimas, 10) + ' ' + c[0] + ' son… ¿cuántos ' +
              c[1] + '?',
    respuesta: (decimas * c[2]) / 10,
    expr: 'b10_' + c[0] + '_' + decimas,
    diagnostico: false
  };
};

/* B11 El área del rectángulo (5.º) */
CB.gen.medida.B11 = function (rng, D) {
  const a = CB.util.ent(rng, 2, (D === 1) ? 5 : 9);
  const b = CB.util.ent(rng, 2, (D === 1) ? 5 : 9);
  return {
    formato: 'teclado',
    consigna: 'Un rectángulo mide ' + a + ' cm por ' + b +
              ' cm. ¿Cuántos cuadrados de 1 cm caben dentro?',
    visual: { tipo: 'matriz', filas: b, columnas: a },
    operacion: '×', operandos: [a, b],
    respuesta: a * b,
    expr: 'b11_' + a + '_' + b,
    diagnostico: true,
    tablasCompletas: true
  };
};

/* B12 Masa y capacidad con coma (5.º) */
CB.gen.medida.B12 = function (rng, D) {
  const c = CB.util.elegir(rng, [['kg', 'gramos', 1000], ['l', 'mililitros', 1000]]);
  const decimas = CB.util.ent(rng, 11, (D === 1) ? 45 : 95);
  return {
    formato: 'teclado',
    consigna: CB.gen.motor.coma(decimas, 10) + ' ' + c[0] + ' son… ¿cuántos ' +
              c[1] + '?',
    respuesta: decimas * 100,
    expr: 'b12_' + c[0] + '_' + decimas,
    diagnostico: false
  };
};

/* B13 Área del cuadrado y del triángulo (6.º) */
CB.gen.medida.B13 = function (rng, D) {
  if (rng() < 0.5) {
    const l = CB.util.ent(rng, 2, (D === 1) ? 8 : 12);
    return {
      formato: 'teclado',
      consigna: 'Un cuadrado tiene lados de ' + l +
                ' cm. ¿Cuál es su área, en centímetros cuadrados?',
      respuesta: l * l,
      expr: 'b13c_' + l,
      diagnostico: false
    };
  }
  const base = CB.util.ent(rng, 2, (D === 1) ? 5 : 8) * 2;
  const altura = CB.util.ent(rng, 2, 9);
  return {
    formato: 'teclado',
    consigna: 'Un triángulo tiene ' + base + ' cm de base y ' + altura +
              ' cm de altura. ¿Cuál es su área, en centímetros cuadrados?',
    respuesta: (base * altura) / 2,
    expr: 'b13t_' + base + '_' + altura,
    diagnostico: false
  };
};

/* B14 Conversiones con coma (6.º): aquí la respuesta SÍ puede llevarla */
CB.gen.medida.B14 = function (rng, D) {
  if (rng() < 0.5) {
    const g = CB.util.ent(rng, 2, 9) * 100 + CB.util.ent(rng, 1, 9) * 10;
    return {
      formato: 'teclado', conComa: true,
      consigna: g + ' gramos son… ¿cuántos kilos?',
      respuesta: CB.gen.motor.dec(g, 1000) * 1,
      expr: 'b14g_' + g,
      diagnostico: false
    };
  }
  const centesimas = CB.util.ent(rng, 105, (D === 1) ? 500 : 985);
  return {
    formato: 'teclado',
    consigna: CB.gen.motor.coma(centesimas, 100) + ' km son… ¿cuántos metros?',
    respuesta: centesimas * 10,
    expr: 'b14k_' + centesimas,
    diagnostico: false
  };
};

/* B15 Problemas de medida (6.º) */
CB.gen.medida.B15 = function (rng, D) {
  const modo = CB.util.ent(rng, 1, 3);
  if (modo === 1) {
    const a = CB.util.ent(rng, 4, 30);
    const b = CB.util.ent(rng, 3, 20);
    return {
      formato: 'teclado',
      consigna: 'Un huerto rectangular mide ' + a + ' m por ' + b +
                ' m. ¿Cuántos metros de valla hacen falta para rodearlo?',
      respuesta: 2 * (a + b),
      expr: 'b15v_' + a + '_' + b,
      diagnostico: false
    };
  }
  if (modo === 2) {
    const vasos = CB.util.elegir(rng, [[1500, 250, 6], [1000, 250, 4], [1500, 500, 3], [2000, 250, 8], [1000, 200, 5]]);
    return {
      formato: 'teclado',
      consigna: 'Una botella tiene ' + CB.gen.motor.coma(vasos[0] / 100, 10) +
                ' litros. ¿Cuántos vasos de ' + vasos[1] + ' ml se pueden llenar?',
      respuesta: vasos[2],
      expr: 'b15b_' + vasos[0] + '_' + vasos[1],
      diagnostico: false
    };
  }
  const cajas = CB.util.ent(rng, 2, 9);
  const peso = CB.util.elegir(rng, [250, 500, 750]);
  return {
    formato: 'teclado',
    consigna: 'Cada caja pesa ' + peso + ' gramos. ¿Cuántos gramos pesan ' +
              cajas + ' cajas?',
    respuesta: cajas * peso,
    expr: 'b15c_' + cajas + '_' + peso,
    diagnostico: false
  };
};

/* ——— El tiempo: H1…H6 ——— */

function nombreHora(h, m) {
  if (m === 0) return h + ' en punto';
  if (m === 15) return h + ' y cuarto';
  if (m === 30) return h + ' y media';
  return (h % 12 + 1) + ' menos cuarto';
}
CB.gen.tiempo._nombreHora = nombreHora;

/* H1 La hora en punto (1.º) */
CB.gen.tiempo.H1 = function (rng, D) {
  const h = CB.util.ent(rng, 1, (D === 1) ? 6 : 12);
  return {
    formato: 'teclado',
    consigna: 'Mira el reloj. ¿Qué hora es? Escribe solo el número.',
    visual: { tipo: 'reloj', horas: h, minutos: 0 },
    respuesta: h,
    expr: 'h1_' + h,
    diagnostico: false
  };
};

/* H2 En punto y y media (2.º) */
CB.gen.tiempo.H2 = function (rng, D) {
  const h = CB.util.ent(rng, 1, 12);
  const m = (D === 1 || rng() < 0.5) ? 0 : 30;
  const resp = nombreHora(h, m);
  const fijos = [nombreHora(h, m === 0 ? 30 : 0),
                 nombreHora(h % 12 + 1, m),
                 nombreHora(h % 12 + 1, m === 0 ? 30 : 0)];
  return {
    formato: 'opciones4',
    consigna: '¿Qué hora marca el reloj?',
    visual: { tipo: 'reloj', horas: h, minutos: m },
    respuesta: resp,
    respuestaFraccion: true,
    distractoresFijos: fijos,
    expr: 'h2_' + h + '_' + m,
    diagnostico: false
  };
};

/* H3 Los cuartos (3.º) */
CB.gen.tiempo.H3 = function (rng, D) {
  const h = CB.util.ent(rng, 1, 12);
  const m = CB.util.elegir(rng, (D === 1) ? [15, 30] : [0, 15, 30, 45]);
  const resp = nombreHora(h, m);
  const otras = [0, 15, 30, 45].filter(function (x) { return x !== m; });
  const fijos = otras.map(function (x) { return nombreHora(h, x); });
  return {
    formato: 'opciones4',
    consigna: '¿Qué hora marca el reloj?',
    visual: { tipo: 'reloj', horas: h, minutos: m },
    respuesta: resp,
    respuestaFraccion: true,
    distractoresFijos: fijos,
    expr: 'h3_' + h + '_' + m,
    diagnostico: false
  };
};

/* H4 El reloj de minutos (4.º) */
CB.gen.tiempo.H4 = function (rng, D) {
  const h = CB.util.ent(rng, 1, 12);
  const m = CB.util.ent(rng, 1, 11) * 5;
  function txt(hh, mm) { return hh + ':' + (mm < 10 ? '0' : '') + mm; }
  const resp = txt(h, m);
  const fijos = [txt(h % 12 + 1, m), txt(h, (m + 5) % 60), txt(h, (m + 55) % 60)];
  return {
    formato: 'opciones4',
    consigna: '¿Qué hora marca el reloj?',
    visual: { tipo: 'reloj', horas: h, minutos: m },
    respuesta: resp,
    respuestaFraccion: true,
    distractoresFijos: fijos,
    expr: 'h4_' + h + '_' + m,
    diagnostico: false
  };
};

/* H5 Horas y minutos (5.º) */
CB.gen.tiempo.H5 = function (rng, D) {
  const h = CB.util.ent(rng, 1, (D === 1) ? 2 : 4);
  const m = CB.util.ent(rng, 0, 11) * 5;
  return {
    formato: 'teclado',
    consigna: '¿Cuántos minutos son ' + h + (h === 1 ? ' hora' : ' horas') +
              (m ? ' y ' + m + ' minutos' : '') + '?',
    operacion: '×', operandos: [h, 60],
    respuesta: h * 60 + m,
    expr: 'h5_' + h + '_' + m,
    diagnostico: false
  };
};

/* H6 Minutos y segundos (6.º) */
CB.gen.tiempo.H6 = function (rng, D) {
  if (rng() < 0.5) {
    const min = CB.util.ent(rng, 2, (D === 1) ? 5 : 10);
    return {
      formato: 'teclado',
      consigna: '¿Cuántos segundos son ' + min + ' minutos?',
      operacion: '×', operandos: [min, 60],
      respuesta: min * 60,
      expr: 'h6s_' + min,
      diagnostico: false
    };
  }
  const min2 = CB.util.ent(rng, 2, 9);
  return {
    formato: 'teclado',
    consigna: '¿Cuántos minutos son ' + (min2 * 60) + ' segundos?',
    operacion: '÷', operandos: [min2 * 60, 60],
    respuesta: min2,
    expr: 'h6m_' + min2,
    diagnostico: false
  };
};
