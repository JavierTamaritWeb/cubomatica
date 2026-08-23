/* 10-gen-numeracion.js — N1…N16 */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.numeracion = {};

/* Número → palabras, 0-999 en español */
CB.gen.numeracion.UNIDADES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco',
                              'seis', 'siete', 'ocho', 'nueve'];
CB.gen.numeracion.DIEZ_A_QUINCE = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince'];
CB.gen.numeracion.DECENAS = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
                             'sesenta', 'setenta', 'ochenta', 'noventa'];
CB.gen.numeracion.CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
                              'quinientos', 'seiscientos', 'setecientos', 'ochocientos',
                              'novecientos'];

CB.gen.numeracion.enPalabras = function (n) {
  n = Math.round(n);
  if (n < 0 || n > 999) return String(n);
  if (n < 10) return CB.gen.numeracion.UNIDADES[n];
  if (n <= 15) return CB.gen.numeracion.DIEZ_A_QUINCE[n - 10];
  if (n < 20) {
    const u = n - 10;
    return 'dieci' + (u === 6 ? 'séis' : CB.gen.numeracion.UNIDADES[u]);
  }
  if (n < 30) {
    if (n === 20) return 'veinte';
    const u2 = n - 20;
    if (u2 === 1) return 'veintiuno';
    if (u2 === 2) return 'veintidós';
    if (u2 === 3) return 'veintitrés';
    if (u2 === 6) return 'veintiséis';
    return 'veinti' + CB.gen.numeracion.UNIDADES[u2];
  }
  if (n < 100) {
    const d = Math.floor(n / 10), r = n % 10;
    return CB.gen.numeracion.DECENAS[d] + (r ? ' y ' + CB.gen.numeracion.UNIDADES[r] : '');
  }
  if (n === 100) return 'cien';
  const c = Math.floor(n / 100), resto = n % 100;
  const txt = CB.gen.numeracion.CENTENAS[c];
  if (!resto) return txt;
  return txt + ' ' + CB.gen.numeracion.enPalabras(resto);
};

CB.gen.numeracion.ORDINALES = ['', 'primero', 'segundo', 'tercero', 'cuarto', 'quinto',
  'sexto', 'séptimo', 'octavo', 'noveno', 'décimo', 'undécimo', 'duodécimo',
  'decimotercero', 'decimocuarto', 'decimoquinto', 'decimosexto', 'decimoséptimo',
  'decimoctavo', 'decimonoveno', 'vigésimo'];

/* Ayudas comunes */

/* Rango efectivo del nivel según D (§8.2): D no cambia el rango declarado, lo
   recorre. D=1 la parte baja, D=2 todo, D=3 la parte alta. */
function tramo(min, max, D, rng) {
  const span = max - min;
  if (D === 1) return CB.util.ent(rng, min, min + Math.max(1, Math.floor(span * 0.4)));
  if (D === 3) return CB.util.ent(rng, min + Math.floor(span * 0.6), max);
  return CB.util.ent(rng, min, max);
}
CB.gen.numeracion._tramo = tramo;

/* N1 Contar y recontar */
CB.gen.numeracion.N1 = function (rng, D) {
  const n = tramo(3, D === 1 ? 12 : 24, D, rng);
  return {
    formato: 'opciones4',
    consigna: '¿Cuántos bloques hay?',
    visual: { tipo: 'conteo', n: n },
    respuesta: n,
    expr: 'contar' + n,
    diagnostico: false
  };
};

/* N2 Leer y escribir hasta 99 */
CB.gen.numeracion.N2 = function (rng, D) {
  const n = tramo(10, 99, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabras(n),
    respuesta: n,
    expr: 'leer' + n,
    diagnostico: true
  };
};

/* N3 Decenas y unidades */
CB.gen.numeracion.N3 = function (rng, D) {
  const n = tramo(11, 99, D, rng);
  const pideDecenas = rng() < 0.5;
  return {
    formato: 'opciones4',
    consigna: pideDecenas
      ? '¿Cuántas decenas tiene el ' + n + '?'
      : '¿Cuántas unidades sueltas tiene el ' + n + '?',
    respuesta: pideDecenas ? Math.floor(n / 10) : (n % 10),
    expr: (pideDecenas ? 'dec' : 'uni') + n,
    diagnostico: true,
    contexto: { numero: n, parte: pideDecenas ? 'decenas' : 'unidades' }
  };
};

/* N4 Mayor, menor, igual (balanza) */
function comparacion(rng, D, max) {
  const a = tramo(0, max, D, rng);
  let b;
  const r = rng();
  if (r < 0.15) b = a;                                    // el = existe de verdad
  else if (r < 0.6) b = CB.util.clamp(a + CB.util.ent(rng, 1, 20), 0, max);
  else b = CB.util.clamp(a - CB.util.ent(rng, 1, 20), 0, max);
  const signo = (a > b) ? '>' : (a < b ? '<' : '=');
  return {
    formato: 'balanza',
    consigna: '¿Qué signo va en medio?',
    visual: { tipo: 'balanza', a: a, b: b },
    opcionesFijas: ['>', '<', '='],
    respuestaSigno: signo,
    respuesta: Math.max(a, b),        // entero de [0,999], invariante 5
    expr: a + signo + b,
    diagnostico: true,
    contexto: { a: a, b: b }
  };
}
CB.gen.numeracion.N4  = function (rng, D) { return comparacion(rng, D, 99); };
CB.gen.numeracion.N10 = function (rng, D) { return comparacion(rng, D, 599); };
CB.gen.numeracion.N16 = function (rng, D) { return comparacion(rng, D, 999); };

/* N5 / N11 Series (ordenar) */
function serie(rng, D, saltos, max) {
  const salto = CB.util.elegir(rng, saltos);
  const asc = rng() < 0.65;
  const cuantos = (D === 1) ? 3 : 4;
  const inicio = CB.util.ent(rng, salto * cuantos, Math.max(salto * cuantos, max - salto * cuantos));
  const orden = [];
  let i, v;
  for (i = 0; i < cuantos; i++) {
    v = asc ? inicio + i * salto : inicio - i * salto;
    orden.push(CB.util.clamp(v, 0, 999));
  }
  return {
    formato: 'ordenar',
    consigna: asc
      ? 'Coloca en orden, de ' + salto + ' en ' + salto + ', de menor a mayor.'
      : 'Coloca en orden, de ' + salto + ' en ' + salto + ', de mayor a menor.',
    orden: orden,
    piezas: CB.util.barajar(orden, rng),
    respuesta: orden[orden.length - 1],
    expr: 'serie' + salto + '_' + inicio + (asc ? 'a' : 'd'),
    diagnostico: false
  };
}
CB.gen.numeracion.N5  = function (rng, D) { return serie(rng, D, [2, 10], 99); };
CB.gen.numeracion.N11 = function (rng, D) { return serie(rng, D, [5, 100], 599); };

/* N6 Pares e impares */
CB.gen.numeracion.N6 = function (rng, D) {
  const pidePar = rng() < 0.5;
  const base = tramo(1, 99, D, rng);
  let resp = pidePar ? (base % 2 === 0 ? base : base + 1) : (base % 2 === 1 ? base : base + 1);
  resp = CB.util.clamp(resp, 0, 99);
  return {
    formato: 'opciones4',
    consigna: pidePar ? 'Toca el número PAR.' : 'Toca el número IMPAR.',
    respuesta: resp,
    expr: (pidePar ? 'par' : 'impar') + resp,
    diagnostico: false,
    /* Los distractores de este nivel son de la paridad contraria: es lo único
       que lo hace diagnóstico de verdad. */
    distractoresFijos: (function () {
      const out = [];
      let v, k = 0;
      while (out.length < 3 && k < 60) {
        k++;
        v = CB.util.ent(rng, 1, 99);
        if ((v % 2 === 0) === pidePar) continue;
        if (v === resp || out.indexOf(v) !== -1) continue;
        out.push(v);
      }
      return out;
    })()
  };
};

/* N7 La recta numérica (ordenar) */
CB.gen.numeracion.N7 = function (rng, D) {
  const max = 199, cuantos = (D === 1) ? 3 : 4, orden = [];
  let v, k = 0;
  while (orden.length < cuantos && k < 80) {
    k++;
    v = tramo(0, max, D, rng);
    if (orden.indexOf(v) === -1) orden.push(v);
  }
  orden.sort(function (a, b) { return a - b; });
  return {
    formato: 'ordenar',
    consigna: 'Coloca los números de menor a mayor.',
    orden: orden,
    piezas: CB.util.barajar(orden, rng),
    respuesta: orden[orden.length - 1],
    expr: 'recta' + orden.join('_'),
    diagnostico: false
  };
};

/* N8 / N15 Escribir números grandes */
CB.gen.numeracion.N8 = function (rng, D) {
  const n = tramo(100, 199, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabras(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};
CB.gen.numeracion.N15 = function (rng, D) {
  const n = tramo(200, 999, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabras(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};

/* N9 La centena: C, D y U */
CB.gen.numeracion.N9 = function (rng, D) {
  const n = tramo(100, 599, D, rng);
  const cual = CB.util.ent(rng, 0, 2);
  const partes = ['centenas', 'decenas', 'unidades sueltas'];
  const val = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10][cual];
  return {
    formato: 'opciones4',
    consigna: '¿Cuántas ' + partes[cual] + ' tiene el ' + n + '?',
    respuesta: val,
    expr: 'cdu' + cual + '_' + n,
    diagnostico: true,
    contexto: { numero: n, parte: partes[cual] }
  };
};

/* N12 Descomponer C + D + U */
CB.gen.numeracion.N12 = function (rng, D) {
  const n = tramo(101, 599, D, rng);
  const c = Math.floor(n / 100) * 100, d = Math.floor(n / 10) % 10 * 10, u = n % 10;
  const trozos = [];
  if (c) trozos.push(c);
  if (d) trozos.push(d);
  if (u) trozos.push(u);
  return {
    formato: 'teclado',
    consigna: '¿Qué número es? ' + trozos.join(' + '),
    respuesta: n,
    operacion: '+', operandos: trozos,
    expr: trozos.join('+'),
    diagnostico: true
  };
};

/* N13 Aproximar a la decena */
CB.gen.numeracion.N13 = function (rng, D) {
  let n = tramo(11, 599, D, rng);
  if (n % 10 === 0) n += CB.util.ent(rng, 1, 9);
  const abajo = Math.floor(n / 10) * 10, arriba = abajo + 10;
  const resp = ((n % 10) >= 5) ? arriba : abajo;
  return {
    formato: 'opciones4',
    consigna: '¿A qué decena está más cerca el ' + n + '?',
    respuesta: resp,
    expr: 'aprox' + n,
    diagnostico: false,
    distractoresFijos: [
      (resp === arriba ? abajo : arriba),
      CB.util.clamp(abajo - 10, 0, 999),
      CB.util.clamp(arriba + 10, 0, 999)
    ]
  };
};

/* N14 Ordinales hasta el 20.º */
CB.gen.numeracion.N14 = function (rng, D) {
  const total = (D === 1) ? CB.util.ent(rng, 5, 9) : CB.util.ent(rng, 10, 20);
  const pos = CB.util.ent(rng, 1, total);
  return {
    formato: 'opciones4',
    consigna: 'En la fila hay ' + total + ' vagonetas. ' +
              '¿Qué lugar ocupa la marcada?',
    visual: { tipo: 'fila', total: total, marcada: pos },
    respuesta: pos,
    ordinal: CB.gen.numeracion.ORDINALES[pos] || (pos + '.º'),
    expr: 'ord' + pos + '_' + total,
    diagnostico: false
  };
};

/* ——— Curso 1.º (3.0.0): N17…N22, sobre las mismas ayudas ——— */

/* N17 Contar hasta 12 */
CB.gen.numeracion.N17 = function (rng, D) {
  const n = tramo(2, 12, D, rng);
  return {
    formato: 'opciones4',
    consigna: '¿Cuántos bloques hay?',
    visual: { tipo: 'conteo', n: n },
    respuesta: n,
    expr: 'contar' + n,
    diagnostico: false
  };
};

/* N18 Leer y escribir hasta 20 */
CB.gen.numeracion.N18 = function (rng, D) {
  const n = tramo(1, 20, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabras(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};

/* N19 Mayor o menor hasta 20 */
CB.gen.numeracion.N19 = function (rng, D) { return comparacion(rng, D, 20); };

/* N20 Leer y escribir hasta 59 */
CB.gen.numeracion.N20 = function (rng, D) {
  const n = tramo(21, 59, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabras(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};

/* N21 Series de 1 en 1 y de 2 en 2 */
CB.gen.numeracion.N21 = function (rng, D) { return serie(rng, D, [1, 2], 59); };

/* N22 El anterior y el posterior */
CB.gen.numeracion.N22 = function (rng, D) {
  const n = tramo(1, 98, D, rng);
  const pidePosterior = rng() < 0.5;
  return {
    formato: 'teclado',
    consigna: pidePosterior
      ? '¿Qué número va justo después del ' + n + '?'
      : '¿Qué número va justo antes del ' + n + '?',
    respuesta: pidePosterior ? n + 1 : n - 1,
    expr: (pidePosterior ? 'pos' : 'ant') + n,
    diagnostico: false
  };
};
