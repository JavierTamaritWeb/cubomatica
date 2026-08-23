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
    /* cuantos varia con D y el ultimo termino es la respuesta: sin el,
       dos items distintos compartian identidad (E147). */
    expr: 'serie' + salto + '_' + inicio + (asc ? 'a' : 'd') + cuantos,
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

/* ——— Cursos 3.º-6.º (3.1.0): N23…N44 ——— */

/* enPalabras hasta 9.999.999 (3.1.0). La versión base topa en 999 a propósito
   para 2.º; los cursos altos leen millares y millones. Con apócope: 21.000 es
   «veintiún mil», no «veintiuno mil». */
CB.gen.numeracion.enPalabrasGrande = function (n) {
  n = Math.round(n);
  if (n < 0 || n > 9999999) return String(n);
  if (n <= 999) return CB.gen.numeracion.enPalabras(n);

  function apocopa(txt) {
    return txt.replace(/veintiuno$/, 'veintiún').replace(/ uno$/, ' un')
              .replace(/^uno$/, 'un');
  }

  if (n < 1000000) {
    const miles = Math.floor(n / 1000), resto = n % 1000;
    const milesTxt = (miles === 1)
      ? 'mil'
      : apocopa(CB.gen.numeracion.enPalabras(miles)) + ' mil';
    return milesTxt + (resto ? ' ' + CB.gen.numeracion.enPalabras(resto) : '');
  }
  const millones = Math.floor(n / 1000000), resto2 = n % 1000000;
  const cabeza = (millones === 1)
    ? 'un millón'
    : CB.gen.numeracion.enPalabras(millones) + ' millones';
  return cabeza + (resto2 ? ' ' + CB.gen.numeracion.enPalabrasGrande(resto2) : '');
};

/* Aproximar a la potencia de diez pedida, sin caso frontera (el ,5 exacto se
   esquiva sumando: redondear 450 a la centena es debatible en 3.º). */
function itemAproximar(rng, D, min, max, unidad, nombreUnidad) {
  let n = tramo(min, max, D, rng);
  if (n % unidad === 0) n += CB.util.ent(rng, 1, 9);
  if (n % unidad === unidad / 2) n += 1;
  const abajo = Math.floor(n / unidad) * unidad;
  const arriba = abajo + unidad;
  const resp = (n % unidad) >= unidad / 2 ? arriba : abajo;
  return {
    formato: 'opciones4',
    consigna: 'Aproxima ' + CB.gen.motor.sep(n) + ' a la ' + nombreUnidad + '.',
    respuesta: resp,
    expr: 'apx' + unidad + '_' + n,
    diagnostico: false,
    distractoresFijos: [resp === arriba ? abajo : arriba,
                        abajo - unidad >= 0 ? abajo - unidad : arriba + 2 * unidad,
                        arriba + unidad]
  };
}
CB.gen.numeracion._itemAproximar = itemAproximar;

/* N23 Aproximar a la centena (3.º) */
CB.gen.numeracion.N23 = function (rng, D) {
  return itemAproximar(rng, D, 150, 949, 100, 'centena más cercana');
};

/* N24 Leer y escribir hasta 9.999 (3.º) */
CB.gen.numeracion.N24 = function (rng, D) {
  const n = tramo(1000, 9999, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabrasGrande(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};

/* N25 Las unidades de millar (3.º) */
CB.gen.numeracion.N25 = function (rng, D) {
  const n = tramo(1000, 9999, D, rng);
  const cual = CB.util.ent(rng, 0, 3);
  const partes = ['unidades de millar', 'centenas', 'decenas', 'unidades sueltas'];
  const val = [Math.floor(n / 1000), Math.floor(n / 100) % 10,
               Math.floor(n / 10) % 10, n % 10][cual];
  return {
    formato: 'opciones4',
    consigna: '¿Cuántas ' + partes[cual] + ' tiene el ' + CB.gen.motor.sep(n) + '?',
    respuesta: val,
    expr: 'um' + cual + '_' + n,
    diagnostico: true,
    contexto: { numero: n, parte: partes[cual] }
  };
};

/* N26 Comparar hasta 9.999 (3.º) */
CB.gen.numeracion.N26 = function (rng, D) { return comparacion(rng, D, 9999); };

/* N27 Aproximar al millar (3.º) */
CB.gen.numeracion.N27 = function (rng, D) {
  return itemAproximar(rng, D, 1500, 9499, 1000, 'unidad de millar más cercana');
};

/* N28 Leer y escribir hasta 99.999 (3.º) */
CB.gen.numeracion.N28 = function (rng, D) {
  const n = tramo(10000, 99999, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabrasGrande(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};

/* N29 Ordenar números grandes (3.º) */
CB.gen.numeracion.N29 = function (rng, D) {
  const cuantos = (D === 1) ? 3 : 4, orden = [];
  let v, k = 0;
  while (orden.length < cuantos && k < 80) {
    k++;
    v = tramo(1000, 99999, D, rng);
    if (orden.indexOf(v) === -1) orden.push(v);
  }
  orden.sort(function (a, b) { return a - b; });
  return {
    formato: 'ordenar',
    consigna: 'Coloca los números de menor a mayor.',
    orden: orden,
    piezas: CB.util.barajar(orden, rng),
    respuesta: orden[orden.length - 1],
    expr: 'ordg' + orden.join('_'),
    diagnostico: false
  };
};

/* N30 Hasta el medio millón (4.º) */
CB.gen.numeracion.N30 = function (rng, D) {
  const n = tramo(100000, 499999, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabrasGrande(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};

/* N31 Hasta 999.999 (4.º) */
CB.gen.numeracion.N31 = function (rng, D) {
  const n = tramo(500000, 999999, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabrasGrande(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};

/* N32 Aproximar a la decena de millar (4.º) */
CB.gen.numeracion.N32 = function (rng, D) {
  return itemAproximar(rng, D, 15000, 94999, 10000, 'decena de millar más cercana');
};

/* N33 Descomponer números grandes (4.º) */
CB.gen.numeracion.N33 = function (rng, D) {
  const n = tramo(10000, 99999, D, rng);
  const trozos = [];
  let resto = n, unidad = 10000;
  while (unidad >= 1) {
    const parte = Math.floor(resto / unidad) * unidad;
    if (parte) trozos.push(CB.gen.motor.sep(parte));
    resto -= parte;
    unidad /= 10;
  }
  return {
    formato: 'teclado',
    consigna: '¿Qué número es? ' + trozos.join(' + '),
    respuesta: n,
    expr: 'descg' + n,
    diagnostico: true
  };
};

/* N34 Los millones (5.º) */
CB.gen.numeracion.N34 = function (rng, D) {
  const n = CB.util.ent(rng, 1, 9) * 1000000 + CB.util.ent(rng, 0, 9) * 100000;
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabrasGrande(n),
    respuesta: n, expr: 'leer' + n, diagnostico: false
  };
};

/* N35 El valor de cada cifra (5.º) */
CB.gen.numeracion.N35 = function (rng, D) {
  const n = tramo(100000, 999999, D, rng);
  const cual = CB.util.ent(rng, 0, 2);
  const partes = ['centenas de millar', 'decenas de millar', 'unidades de millar'];
  const val = [Math.floor(n / 100000), Math.floor(n / 10000) % 10,
               Math.floor(n / 1000) % 10][cual];
  return {
    formato: 'opciones4',
    consigna: '¿Cuántas ' + partes[cual] + ' tiene el ' + CB.gen.motor.sep(n) + '?',
    respuesta: val,
    expr: 'cm' + cual + '_' + n,
    diagnostico: true,
    contexto: { numero: n, parte: partes[cual] }
  };
};

/* N36 Múltiplos (5.º) */
CB.gen.numeracion.N36 = function (rng, D) {
  const d = CB.util.ent(rng, 3, 9);
  const k = CB.util.ent(rng, 3, (D === 1) ? 6 : 12);
  const resp = d * k;
  return {
    formato: 'opciones4',
    consigna: 'Toca el MÚLTIPLO de ' + d + '.',
    respuesta: resp,
    expr: 'mul' + d + '_' + k,
    diagnostico: false,
    distractoresFijos: [resp + 1, resp - 1, resp + 2]
  };
};

/* N37 Divisores (5.º) */
CB.gen.numeracion.N37 = function (rng, D) {
  const n = CB.util.elegir(rng, [12, 18, 20, 24, 30, 36, 40, 48, 60]);
  const divisores = [];
  const noDivisores = [];
  let v;
  for (v = 2; v < n; v++) {
    if (n % v === 0) divisores.push(v); else noDivisores.push(v);
  }
  const resp = CB.util.elegir(rng, divisores);
  return {
    formato: 'opciones4',
    consigna: 'Toca el DIVISOR de ' + n + '.',
    respuesta: resp,
    expr: 'div' + n + '_' + resp,
    diagnostico: false,
    distractoresFijos: CB.util.barajar(noDivisores, rng).slice(0, 3)
  };
};

/* N38 Divisible entre 2, 3, 5 y 10 (5.º) */
CB.gen.numeracion.N38 = function (rng, D) {
  const d = CB.util.elegir(rng, [2, 3, 5, 10]);
  const resp = d * CB.util.ent(rng, 11, Math.floor(999 / d));
  const fijos = [];
  let k = 0, v;
  while (fijos.length < 3 && k < 80) {
    k++;
    v = CB.util.ent(rng, 20, 999);
    if (v % d === 0 || v === resp || fijos.indexOf(v) !== -1) continue;
    fijos.push(v);
  }
  return {
    formato: 'opciones4',
    consigna: 'Toca el número divisible entre ' + d + '.',
    respuesta: resp,
    expr: 'dvs' + d + '_' + resp,
    diagnostico: false,
    distractoresFijos: fijos
  };
};

/* N39 Aproximar números grandes (5.º) */
CB.gen.numeracion.N39 = function (rng, D) {
  return itemAproximar(rng, D, 150000, 8949999, 100000, 'centena de millar más cercana');
};

/* N40 Potencias (6.º) */
CB.gen.numeracion.N40 = function (rng, D) {
  const casos = [];
  let b;
  for (b = 2; b <= 12; b++) casos.push([b, 2, b + '²', b * b]);
  for (b = 2; b <= 5; b++) casos.push([b, 3, b + '³', b * b * b]);
  const c = CB.util.elegir(rng, (D === 1) ? casos.slice(0, 8) : casos);
  return {
    formato: 'teclado',
    consigna: '¿Cuánto es ' + c[2] + '?',
    respuesta: c[3],
    expr: 'pot' + c[0] + '_' + c[1],
    diagnostico: false
  };
};

/* N41 La raíz cuadrada exacta (6.º) */
CB.gen.numeracion.N41 = function (rng, D) {
  const r = CB.util.ent(rng, 2, (D === 1) ? 8 : 12);
  return {
    formato: 'teclado',
    consigna: '¿Qué número multiplicado por sí mismo da ' + (r * r) + '?',
    respuesta: r,
    expr: 'raiz' + (r * r),
    diagnostico: false
  };
};

/* N42 El mínimo común múltiplo (6.º) */
CB.gen.numeracion.N42 = function (rng, D) {
  const pares = [[2, 3], [3, 4], [4, 6], [2, 5], [6, 8], [3, 5], [4, 10], [6, 9], [8, 12], [5, 10]];
  const p = CB.util.elegir(rng, (D === 1) ? pares.slice(0, 5) : pares);
  return {
    formato: 'teclado',
    consigna: '¿Cuál es el mínimo común múltiplo de ' + p[0] + ' y ' + p[1] + '?',
    respuesta: CB.gen.motor.mcm(p[0], p[1]),
    expr: 'mcm' + p.join('_'),
    diagnostico: false
  };
};

/* N43 El máximo común divisor (6.º) */
CB.gen.numeracion.N43 = function (rng, D) {
  const pares = [[6, 9], [8, 12], [10, 15], [12, 18], [6, 8], [9, 12], [20, 30], [14, 21], [16, 24], [15, 25]];
  const p = CB.util.elegir(rng, (D === 1) ? pares.slice(0, 5) : pares);
  return {
    formato: 'teclado',
    consigna: '¿Cuál es el máximo común divisor de ' + p[0] + ' y ' + p[1] + '?',
    respuesta: CB.gen.motor.mcd(p[0], p[1]),
    expr: 'mcd' + p.join('_'),
    diagnostico: false
  };
};

/* N44 Las potencias de 10 (6.º) */
CB.gen.numeracion.N44 = function (rng, D) {
  const e = CB.util.ent(rng, 2, (D === 1) ? 4 : 6);
  const sup = ['', '', '²', '³', '⁴', '⁵', '⁶'][e];
  const pideCeros = rng() < 0.4;
  return {
    formato: 'teclado',
    consigna: pideCeros
      ? '¿Cuántos ceros tiene 10' + sup + '?'
      : '¿Cuánto es 10' + sup + '?',
    respuesta: pideCeros ? e : Math.pow(10, e),
    expr: 'p10_' + e + (pideCeros ? 'c' : ''),
    diagnostico: false
  };
};
