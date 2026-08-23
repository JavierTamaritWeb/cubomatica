/* 18-distractores.js — Los 24 códigos de error, los distractores y el */

var CB = CB || {};

/* Ayudas de dígitos */
function digitos(n) {
  const d = [];
  let x = Math.abs(Math.round(n));
  if (x === 0) return [0];
  while (x > 0) { d.push(x % 10); x = Math.floor(x / 10); }
  return d;                                    // índice 0 = unidades
}
function desdeDigitos(d) {
  let v = 0, p = 1, i;
  for (i = 0; i < d.length; i++) { v += d[i] * p; p *= 10; }
  return v;
}

CB.ERRORES = {

  /* SUMAS */
  'E-S-LLEV-OLV': {
    familia: 'S', diagnostico: true,
    pista: 'Mira si al sumar las unidades pasas de diez.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      const a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      const n = Math.max(a.length, b.length), out = [];
      let i, s;
      for (i = 0; i < n; i++) {
        s = (a[i] || 0) + (b[i] || 0);
        out.push(s % 10);                      // se pierde la llevada
      }
      return desdeDigitos(out);
    }
  },

  'E-S-LLEV-ESCR': {
    familia: 'S', diagnostico: true, puedeSuperar999: true,
    pista: 'En la casilla de las unidades solo cabe hasta el 9.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      const a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      const n = Math.max(a.length, b.length);
      let txt = '', i, s;
      for (i = n - 1; i >= 0; i--) {
        s = (a[i] || 0) + (b[i] || 0);
        txt += String(s);                      // se escribe la columna entera
      }
      const v = parseInt(txt, 10);
      return isFinite(v) ? v : null;
    }
  },

  'E-S-LLEV-DOBLE': {
    familia: 'S', diagnostico: true, puedeSuperar999: true,
    pista: 'La decena que llevas se usa una sola vez.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      const llev = CB.gen.sumas.llevadas(item.operandos[0], item.operandos[1]);
      if (!llev) return null;
      return item.respuesta + 10 * llev;       // la llevada se suma dos veces
    }
  },

  'E-S-COL': {
    familia: 'S', diagnostico: true,
    pista: 'Coloca las unidades debajo de las unidades.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      const a = item.operandos[0], b = item.operandos[1];
      if (b >= 10 || a < 10) return null;      // solo tiene sentido con DU + U
      return a + b * 10;                       // la unidad se suma a las decenas
    }
  },

  /* RESTAS */
  'E-R-INV': {
    familia: 'R', diagnostico: true,
    pista: 'Si el de arriba es más pequeño, pide una decena prestada.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      const a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      const n = Math.max(a.length, b.length), out = [];
      let i, x, y;
      for (i = 0; i < n; i++) {
        x = a[i] || 0; y = b[i] || 0;
        out.push(Math.abs(x - y));             // se resta el menor del mayor
      }
      return desdeDigitos(out);
    }
  },

  'E-R-PREST-OLV': {
    familia: 'R', diagnostico: true,
    pista: 'Si pides una decena, a las decenas les queda una menos.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      const p = CB.gen.restas.prestamos(item.operandos[0], item.operandos[1]);
      if (!p) return null;
      return item.respuesta + 10 * p;          // no se descuenta la decena pedida
    }
  },

  'E-R-PREST-DOBLE': {
    familia: 'R', diagnostico: true,
    pista: 'La decena prestada se descuenta una sola vez.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      const p = CB.gen.restas.prestamos(item.operandos[0], item.operandos[1]);
      if (!p) return null;
      return item.respuesta - 10 * p;
    }
  },

  'E-R-CERO': {
    familia: 'R', diagnostico: true,
    pista: 'Cuando hay un cero, se pide prestado a la columna de más allá.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      const a = digitos(item.operandos[0]);
      if (a.indexOf(0) === -1) return null;
      return item.respuesta + 100;
    }
  },

  'E-R-SUMA': {
    familia: 'R', diagnostico: true,
    pista: '¿El resultado tiene que ser mayor o menor que el número de partida?',
    reparacion: 'rectaNumerica',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      return item.operandos[0] + item.operandos[1];
    }
  },

  /* NUMERACIÓN */
  'E-N-POS': {
    familia: 'N', diagnostico: true,
    pista: 'Mira qué lugar ocupa cada cifra.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      const r = item.respuesta;
      if (r < 10) return null;
      const d = digitos(r);
      const t = d[0]; d[0] = d[1]; d[1] = t;     // se intercambian D y U
      return desdeDigitos(d);
    }
  },

  'E-N-CERO': {
    familia: 'N', diagnostico: true,
    pista: 'El cero también ocupa su sitio.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      const d = digitos(item.respuesta);
      if (d.length < 3 || d[1] !== 0) return null;
      return d[2] * 10 + d[0];                 // se omite el cero de en medio
    }
  },

  /* Sin simular(): diagnostico:false (invariante 6-bis) */
  'E-N-SERIE': { familia: 'N', diagnostico: false, simular: null,
    pista: 'Comprueba que todos los saltos son iguales.', reparacion: 'rectaNumerica' },
  'E-N-APROX': { familia: 'N', diagnostico: false, simular: null,
    pista: 'Mira a qué decena está más cerca.', reparacion: 'rectaNumerica' },
  'E-N-ORDEN': { familia: 'N', diagnostico: false, simular: null,
    pista: 'Empieza por el más pequeño.', reparacion: 'rectaNumerica' },

  /* MULTIPLICACIÓN */
  'E-M-SUMA': {
    familia: 'M', diagnostico: true,
    pista: 'Multiplicar es repetir el mismo número varias veces.',
    reparacion: 'matrizFilasColumnas',
    simular: function (item) {
      if (item.operacion !== '×' || !item.operandos) return null;
      return item.operandos[0] + item.operandos[1];
    }
  },

  'E-M-VECINO': {
    familia: 'M', diagnostico: true,
    pista: 'Canta la tabla entera desde el principio.',
    reparacion: 'matrizFilasColumnas',
    simular: function (item) {
      if (item.operacion !== '×' || !item.operandos) return null;
      const a = item.operandos[0];
      return item.respuesta - a;               // el hecho anterior de la tabla
    }
  },

  'E-M-CERO': {
    familia: 'M', diagnostico: true,
    pista: 'Cuatro platos con cero galletas siguen siendo cero galletas.',
    reparacion: 'matrizFilasColumnas',
    simular: function (item) {
      if (item.operacion !== '×' || !item.operandos) return null;
      const a = item.operandos[0], b = item.operandos[1];
      if (a !== 0 && b !== 0 && a !== 1 && b !== 1) return null;
      return (a === 0 || b === 0) ? (a + b) : (a === 1 ? 1 : b);
    }
  },

  /* PROBLEMAS */
  'E-P-PALCLAVE': {
    familia: 'P', diagnostico: true,
    pista: 'No te fíes solo de la palabra: mira lo que cuenta el problema.',
    reparacion: 'barrasComparativas',
    simular: function (item) {
      if (!item.datos || item.datos.length < 2) return null;
      const a = item.datos[0], b = item.datos[1];
      return (item.operacion === '+') ? (a - b) : (a + b);   // operación contraria
    }
  },

  'E-P-TODOSDATOS': {
    familia: 'P', diagnostico: true,
    pista: 'Mira si todos los números del cuento te sirven.',
    reparacion: 'barrasComparativas',
    simular: function (item) {
      if (!item.datoSobrante || item.numeroSobrante == null) return null;
      return item.respuesta + item.numeroSobrante;
    }
  },

  'E-P-CALCULO': { familia: 'P', diagnostico: false, simular: null,
    pista: 'El planteamiento está bien. Repasa solo la cuenta.',
    reparacion: 'columnasCDU' },

  /* DINERO */
  'E-E-VALOR': {
    familia: 'E', diagnostico: true,
    pista: 'No cuentes las monedas: cuenta lo que vale cada una.',
    reparacion: 'monedas',
    simular: function (item) {
      if (!item.piezas || !item.piezas.length) return null;
      return item.piezas.length;               // se cuentan piezas, no valor
    }
  },

  'E-E-CAMBIO': {
    familia: 'E', diagnostico: true,
    pista: 'Para saber el cambio hay que quitar el precio.',
    reparacion: 'monedas',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      return item.operandos[0] + item.operandos[1];
    }
  },

  /* VOCABULARIO */
  'E-V-TERMINO': { familia: 'V', diagnostico: false, simular: null,
    pista: 'Piensa en qué operación te pide esa palabra.', reparacion: 'rectaNumerica' },
  'E-V-SINONIMO': { familia: 'V', diagnostico: false, simular: null,
    pista: 'Lee la frase entera antes de decidir.', reparacion: 'rectaNumerica' }
};

CB.ERRORES_IDS = Object.keys(CB.ERRORES);

/* Los distractores */
CB.distractores = CB.distractores || {};

CB.distractores.LIMITE_NORMAL = 999;
CB.distractores.LIMITE_INTENCIONADO = 1999;
CB.distractores.RELLENOS = [1, 2, 10, 20, 100];
CB.distractores.MAX_INTENTOS_RELLENO = 40;

CB.distractores.codigosAplicables = function (item) {
  const letra = (item.nivelId || 'S1').charAt(0);
  const out = [];
  let k;
  for (k in CB.ERRORES) {
    if (!Object.prototype.hasOwnProperty.call(CB.ERRORES, k)) continue;
    if (CB.ERRORES[k].familia !== letra) continue;
    if (!CB.ERRORES[k].simular) continue;
    out.push(k);
  }
  return out;
};

/**
 * @return {opciones: [{valor, codigoError, intencionado, correcta}], formato}
 *         Si no se consiguen 4 opciones únicas, formato pasa a 'teclado'.
 */
CB.distractores.para = function (item, rng) {
  const correcta = item.respuesta;
  const vistos = {}, opciones = [];
  let i, v, cod;

  vistos[correcta] = true;

  /* 1) candidatos por simulación de error */
  const codigos = CB.util.barajar(CB.distractores.codigosAplicables(item), rng);
  for (i = 0; i < codigos.length && opciones.length < 3; i++) {
    cod = codigos[i];
    try { v = CB.ERRORES[cod].simular(item); } catch (e) { v = null; }
    if (v == null || !isFinite(v)) continue;
    v = Math.round(v);

    /* 2) descarte de colisiones, negativos y repetidos */
    if (v === correcta || v < 0 || vistos[v]) continue;

    const intencionado = !!CB.ERRORES[cod].puedeSuperar999;
    /* El tope escala con el rango del nivel (3.1.0): 999 era el mundo de 2.º
       y silenciaba todo distractor de un producto de cuatro cifras — el ítem
       degradaba a teclado sin que nadie lo viera. */
    const topeNivel = Math.max(CB.distractores.LIMITE_NORMAL,
      (item.rangoNivel && item.rangoNivel[1]) || 0);
    const limite = intencionado ? Math.max(CB.distractores.LIMITE_INTENCIONADO, topeNivel * 2)
                              : topeNivel;
    if (v > limite) continue;

    /* Invariante 6: distractor plausible, salvo los intencionados. */
    if (!intencionado &&
        Math.abs(v - correcta) > Math.max(20, 0.5 * correcta)) continue;

    vistos[v] = true;
    opciones.push({ valor: v, codigoError: cod, intencionado: intencionado, correcta: false });
  }

  /* 3) relleno acotado: respuesta ± k */
  let intentos = 0;
  const ks = CB.util.barajar(CB.distractores.RELLENOS, rng);
  const signos = [1, -1];
  let idx = 0;
  while (opciones.length < 3 && intentos < CB.distractores.MAX_INTENTOS_RELLENO) {
    intentos++;
    const kk = ks[idx % ks.length];
    const sg = signos[Math.floor(idx / ks.length) % 2];
    idx++;
    v = correcta + sg * kk;
    if (v < 0 || v > Math.max(CB.distractores.LIMITE_NORMAL,
                              (item.rangoNivel && item.rangoNivel[1]) || 0)) continue;
    if (v === correcta || vistos[v]) continue;
    vistos[v] = true;
    opciones.push({ valor: v, codigoError: null, intencionado: false, correcta: false });
  }

  /* 4) si aun así no hay 4 opciones únicas, ESTE ítem se sirve con teclado */
  if (opciones.length < 3) {
    return { opciones: null, formato: 'teclado', motivo: 'sinDistractores' };
  }

  opciones.push({ valor: correcta, codigoError: null, intencionado: false, correcta: true });

  /* 6) contrabalanceo de posición con bolsa: la correcta se reparte uniformemente
     entre las 4 posiciones a lo largo de la partida. */
  const pos = (item.posicionCorrecta != null)
    ? item.posicionCorrecta
    : CB.util.ent(rng, 0, 3);
  const correctaObj = opciones.pop();
  const mezcladas = CB.util.barajar(opciones, rng);
  mezcladas.splice(pos, 0, correctaObj);

  return { opciones: mezcladas.slice(0, 4), formato: 'opciones4', posicionCorrecta: pos };
};

/* Diagnóstico */
CB.diagnosticar = function (item, valorDado) {
  const hipotesis = [];
  let i, v;
  if (valorDado == null || !isFinite(valorDado)) {
    return { hipotesis: [], discriminante: false };
  }
  if (item.diagnostico === false) {
    return { hipotesis: [], discriminante: false, motivo: 'nivelNoDiagnostico' };
  }

  const codigos = CB.distractores.codigosAplicables(item);
  for (i = 0; i < codigos.length; i++) {
    try { v = CB.ERRORES[codigos[i]].simular(item); } catch (e) { v = null; }
    if (v != null && isFinite(v) && Math.round(v) === Math.round(valorDado)) {
      hipotesis.push(codigos[i]);
    }
  }
  return { hipotesis: hipotesis, discriminante: hipotesis.length === 1 };
};

/* Registra el diagnóstico en el perfil, solo si es discriminante. */
CB.distractores.registrar = function (perfil, item, valorDado) {
  const d = CB.diagnosticar(item, valorDado);
  if (!d.hipotesis.length) return d;
  if (!perfil.errores) perfil.errores = {};
  let i, cod;
  for (i = 0; i < d.hipotesis.length; i++) {
    cod = d.hipotesis[i];
    if (!perfil.errores[cod]) {
      perfil.errores[cod] = { veces: 0, vecesDiscriminante: 0, ejemplos: [] };
    }
    perfil.errores[cod].veces++;
    if (d.discriminante) perfil.errores[cod].vecesDiscriminante++;
    const ej = (item.consigna || item.enunciado || item.expr) + ' → ' + valorDado;
    perfil.errores[cod].ejemplos.unshift(ej);
    if (perfil.errores[cod].ejemplos.length > 3) perfil.errores[cod].ejemplos.length = 3;
  }
  return d;
};

/* ——— Códigos de error de 3.º-6.º (3.1.0): división, decimales, porcentajes,
   enteros y fracciones. Mismo contrato que los 24 originales: simular() y
   diagnostico:false son mutuamente excluyentes, y cada código tiene su
   recomendación en datos/recomendaciones.js (CU8 lo cruza). ——— */

CB.ERRORES['E-D-COC-VECINO'] = {
  familia: 'D', diagnostico: true,
  pista: 'Repasa la tabla: te has quedado una vez por encima.',
  reparacion: 'matrizFilasColumnas',
  simular: function (item) {
    if (item.operacion !== '÷') return null;
    const c = (item.contexto && item.contexto.cociente != null)
      ? item.contexto.cociente : item.respuesta;
    return c + 1;
  }
};

CB.ERRORES['E-D-COC-CORTO'] = {
  familia: 'D', diagnostico: true,
  pista: 'Repasa la tabla: te has quedado una vez por debajo.',
  reparacion: 'matrizFilasColumnas',
  simular: function (item) {
    if (item.operacion !== '÷') return null;
    const c = (item.contexto && item.contexto.cociente != null)
      ? item.contexto.cociente : item.respuesta;
    return c > 1 ? c - 1 : null;
  }
};

CB.ERRORES['E-D-RESTO-COMO-COC'] = {
  familia: 'D', diagnostico: true,
  pista: 'Eso que has escrito es lo que sobra, no lo que toca a cada uno.',
  reparacion: 'matrizFilasColumnas',
  simular: function (item) {
    if (item.operacion !== '÷' || !item.contexto) return null;
    return item.contexto.resto > 0 ? item.contexto.resto : null;
  }
};

CB.ERRORES['E-D-TABLA-VECINA'] = {
  familia: 'D', diagnostico: true,
  pista: 'Mira bien entre qué número estás dividiendo.',
  reparacion: 'matrizFilasColumnas',
  simular: function (item) {
    if (item.operacion !== '÷' || !item.operandos) return null;
    const a = item.operandos[0], d = item.operandos[1];
    if (!(d >= 2)) return null;
    return Math.round(a / (d + 1));
  }
};

CB.ERRORES['E-C-COMA-CORRIDA'] = {
  familia: 'C', diagnostico: true, puedeSuperar999: true,
  pista: 'La coma se te ha movido un sitio: el número salió diez veces más grande.',
  reparacion: 'rectaNumerica',
  simular: function (item) { return item.respuesta * 10; }
};

CB.ERRORES['E-C-COMA-CORTA'] = {
  familia: 'C', diagnostico: true,
  pista: 'La coma se te ha movido un sitio: el número salió diez veces más pequeño.',
  reparacion: 'rectaNumerica',
  simular: function (item) { return item.respuesta / 10; }
};

CB.ERRORES['E-T-RESTA-DIRECTA'] = {
  familia: 'T', diagnostico: true,
  pista: 'Has restado el número del porcentaje, y el porcentaje no se resta: se calcula.',
  reparacion: 'rectaNumerica',
  simular: function (item) {
    if (item.operacion !== '%' || !item.operandos) return null;
    const v = item.operandos[0] - item.operandos[1];
    return v > 0 ? v : null;
  }
};

CB.ERRORES['E-T-SIN-DIVIDIR'] = {
  familia: 'T', diagnostico: true, puedeSuperar999: true,
  pista: 'Multiplicaste bien, pero falta dividir entre 100.',
  reparacion: 'rectaNumerica',
  simular: function (item) {
    if (item.operacion !== '%' || !item.operandos) return null;
    return item.operandos[0] * item.operandos[1];
  }
};

CB.ERRORES['E-Z-SIN-SIGNO'] = {
  familia: 'Z', diagnostico: true,
  pista: 'El número es ese, pero por DEBAJO de cero: le falta el signo.',
  reparacion: 'rectaNumerica',
  simular: function (item) {
    return (item.respuesta < 0) ? Math.abs(item.respuesta) : null;
  }
};

CB.ERRORES['E-F-SUMA-DENOM'] = {
  familia: 'F', diagnostico: false,
  pista: 'Los denominadores no se suman: dicen en cuántas partes está cortado el todo.',
  reparacion: 'barrasComparativas'
};

CB.ERRORES['E-C-ALINEACION'] = {
  familia: 'C', diagnostico: false,
  pista: 'Coloca coma debajo de coma antes de operar.',
  reparacion: 'rectaNumerica'
};
