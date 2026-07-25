/* ============================================================================
   18-distractores.js — Los 24 códigos de error, los distractores y el
                        diagnóstico
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   EL PROBLEMA QUE RESUELVE EL ALGORITMO (PLAN §13.8): construir distractores
   simulando errores es lo correcto pedagógicamente, pero muchas simulaciones
   COLISIONAN con la respuesta correcta. E-S-LLEV-OLV sobre 20+30 devuelve 50,
   que es correcto; E-R-INV sobre 68−24 devuelve 44, que es correcto; E-M-SUMA
   sobre 2×2 devuelve 4, que es correcto. El plan v1 no decía qué pasaba
   entonces: el niño podía ver DOS opciones correctas, o el bucle de relleno
   podía no terminar nunca.

   Aquí: se descartan las colisiones, se rellena con un plan B acotado, y si aun
   así no hay 4 opciones únicas, ESE ÍTEM pasa a formato teclado. Ningún bucle
   sin cota.

   18 códigos tienen simular(); 6 tienen diagnostico:false porque simular un
   error numérico sobre vocabulario, estimación, ordenación o un fallo de puro
   cálculo no produce ninguna hipótesis discriminante (invariante 6-bis).
   ========================================================================== */

var CB = CB || {};

/* ── Ayudas de dígitos ──────────────────────────────────────────────────── */
function digitos(n) {
  var d = [], x = Math.abs(Math.round(n));
  if (x === 0) return [0];
  while (x > 0) { d.push(x % 10); x = Math.floor(x / 10); }
  return d;                                    // índice 0 = unidades
}
function desdeDigitos(d) {
  var v = 0, p = 1, i;
  for (i = 0; i < d.length; i++) { v += d[i] * p; p *= 10; }
  return v;
}

CB.ERRORES = {

  /* ══ SUMAS ═════════════════════════════════════════════════════════════ */
  'E-S-LLEV-OLV': {
    familia: 'S', diagnostico: true,
    pista: 'Mira si al sumar las unidades pasas de diez.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      var a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      var n = Math.max(a.length, b.length), out = [], i, s;
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
      var a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      var n = Math.max(a.length, b.length), txt = '', i, s;
      for (i = n - 1; i >= 0; i--) {
        s = (a[i] || 0) + (b[i] || 0);
        txt += String(s);                      // se escribe la columna entera
      }
      var v = parseInt(txt, 10);
      return isFinite(v) ? v : null;
    }
  },

  'E-S-LLEV-DOBLE': {
    familia: 'S', diagnostico: true, puedeSuperar999: true,
    pista: 'La decena que llevas se usa una sola vez.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      var llev = CB.gen.sumas.llevadas(item.operandos[0], item.operandos[1]);
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
      var a = item.operandos[0], b = item.operandos[1];
      if (b >= 10 || a < 10) return null;      // solo tiene sentido con DU + U
      return a + b * 10;                       // la unidad se suma a las decenas
    }
  },

  /* ══ RESTAS ════════════════════════════════════════════════════════════ */
  'E-R-INV': {
    familia: 'R', diagnostico: true,
    pista: 'Si el de arriba es más pequeño, pide una decena prestada.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      var a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      var n = Math.max(a.length, b.length), out = [], i, x, y;
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
      var p = CB.gen.restas.prestamos(item.operandos[0], item.operandos[1]);
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
      var p = CB.gen.restas.prestamos(item.operandos[0], item.operandos[1]);
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
      var a = digitos(item.operandos[0]);
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

  /* ══ NUMERACIÓN ════════════════════════════════════════════════════════ */
  'E-N-POS': {
    familia: 'N', diagnostico: true,
    pista: 'Mira qué lugar ocupa cada cifra.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      var r = item.respuesta;
      if (r < 10) return null;
      var d = digitos(r);
      var t = d[0]; d[0] = d[1]; d[1] = t;     // se intercambian D y U
      return desdeDigitos(d);
    }
  },

  'E-N-CERO': {
    familia: 'N', diagnostico: true,
    pista: 'El cero también ocupa su sitio.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      var d = digitos(item.respuesta);
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

  /* ══ MULTIPLICACIÓN ════════════════════════════════════════════════════ */
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
      var a = item.operandos[0];
      return item.respuesta - a;               // el hecho anterior de la tabla
    }
  },

  'E-M-CERO': {
    familia: 'M', diagnostico: true,
    pista: 'Cuatro platos con cero galletas siguen siendo cero galletas.',
    reparacion: 'matrizFilasColumnas',
    simular: function (item) {
      if (item.operacion !== '×' || !item.operandos) return null;
      var a = item.operandos[0], b = item.operandos[1];
      if (a !== 0 && b !== 0 && a !== 1 && b !== 1) return null;
      return (a === 0 || b === 0) ? (a + b) : (a === 1 ? 1 : b);
    }
  },

  /* ══ PROBLEMAS ═════════════════════════════════════════════════════════ */
  'E-P-PALCLAVE': {
    familia: 'P', diagnostico: true,
    pista: 'No te fíes solo de la palabra: mira lo que cuenta el problema.',
    reparacion: 'barrasComparativas',
    simular: function (item) {
      if (!item.datos || item.datos.length < 2) return null;
      var a = item.datos[0], b = item.datos[1];
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

  /* ══ DINERO ════════════════════════════════════════════════════════════ */
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

  /* ══ VOCABULARIO ═══════════════════════════════════════════════════════ */
  'E-V-TERMINO': { familia: 'V', diagnostico: false, simular: null,
    pista: 'Piensa en qué operación te pide esa palabra.', reparacion: 'rectaNumerica' },
  'E-V-SINONIMO': { familia: 'V', diagnostico: false, simular: null,
    pista: 'Lee la frase entera antes de decidir.', reparacion: 'rectaNumerica' }
};

CB.ERRORES_IDS = Object.keys(CB.ERRORES);

/* ── Los distractores ───────────────────────────────────────────────────── */
CB.distractores = CB.distractores || {};

CB.distractores.LIMITE_NORMAL = 999;
CB.distractores.LIMITE_INTENCIONADO = 1999;
CB.distractores.RELLENOS = [1, 2, 10, 20, 100];
CB.distractores.MAX_INTENTOS_RELLENO = 40;

CB.distractores.codigosAplicables = function (item) {
  var letra = (item.nivelId || 'S1').charAt(0);
  var out = [], k;
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
  var correcta = item.respuesta;
  var vistos = {}, opciones = [], i, k, v, cod;

  vistos[correcta] = true;

  /* 1) candidatos por simulación de error */
  var codigos = CB.util.barajar(CB.distractores.codigosAplicables(item), rng);
  for (i = 0; i < codigos.length && opciones.length < 3; i++) {
    cod = codigos[i];
    try { v = CB.ERRORES[cod].simular(item); } catch (e) { v = null; }
    if (v == null || !isFinite(v)) continue;
    v = Math.round(v);

    /* 2) descarte de colisiones, negativos y repetidos */
    if (v === correcta || v < 0 || vistos[v]) continue;

    var intencionado = !!CB.ERRORES[cod].puedeSuperar999;
    var limite = intencionado ? CB.distractores.LIMITE_INTENCIONADO
                              : CB.distractores.LIMITE_NORMAL;
    if (v > limite) continue;

    /* Invariante 6: distractor plausible, salvo los intencionados. */
    if (!intencionado &&
        Math.abs(v - correcta) > Math.max(20, 0.5 * correcta)) continue;

    vistos[v] = true;
    opciones.push({ valor: v, codigoError: cod, intencionado: intencionado, correcta: false });
  }

  /* 3) relleno acotado: respuesta ± k */
  var intentos = 0;
  var ks = CB.util.barajar(CB.distractores.RELLENOS, rng);
  var signos = [1, -1];
  var idx = 0;
  while (opciones.length < 3 && intentos < CB.distractores.MAX_INTENTOS_RELLENO) {
    intentos++;
    var kk = ks[idx % ks.length];
    var sg = signos[Math.floor(idx / ks.length) % 2];
    idx++;
    v = correcta + sg * kk;
    if (v < 0 || v > CB.distractores.LIMITE_NORMAL) continue;
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
  var pos = (item.posicionCorrecta != null)
    ? item.posicionCorrecta
    : CB.util.ent(rng, 0, 3);
  var correctaObj = opciones.pop();
  var mezcladas = CB.util.barajar(opciones, rng);
  mezcladas.splice(pos, 0, correctaObj);

  return { opciones: mezcladas.slice(0, 4), formato: 'opciones4', posicionCorrecta: pos };
};

/* ── Diagnóstico ────────────────────────────────────────────────────────────
   discriminante === true SOLO si un único código de error es compatible con la
   respuesta dada. El informe solo acumula evidencia de ítems discriminantes: si
   dos códigos empatan, se cuentan ambos pero NO SE AFIRMA NINGUNO. */
CB.diagnosticar = function (item, valorDado) {
  var hipotesis = [], codigos, i, v;
  if (valorDado == null || !isFinite(valorDado)) {
    return { hipotesis: [], discriminante: false };
  }
  if (item.diagnostico === false) {
    return { hipotesis: [], discriminante: false, motivo: 'nivelNoDiagnostico' };
  }

  codigos = CB.distractores.codigosAplicables(item);
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
  var d = CB.diagnosticar(item, valorDado);
  if (!d.hipotesis.length) return d;
  if (!perfil.errores) perfil.errores = {};
  var i, cod;
  for (i = 0; i < d.hipotesis.length; i++) {
    cod = d.hipotesis[i];
    if (!perfil.errores[cod]) {
      perfil.errores[cod] = { veces: 0, vecesDiscriminante: 0, ejemplos: [] };
    }
    perfil.errores[cod].veces++;
    if (d.discriminante) perfil.errores[cod].vecesDiscriminante++;
    var ej = (item.consigna || item.enunciado || item.expr) + ' → ' + valorDado;
    perfil.errores[cod].ejemplos.unshift(ej);
    if (perfil.errores[cod].ejemplos.length > 3) perfil.errores[cod].ejemplos.length = 3;
  }
  return d;
};
