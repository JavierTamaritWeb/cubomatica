/* ============================================================================
   25-mensajes.js — Requisitos 4 y 5: enhorabuena variada y ánimo al fallar
   ----------------------------------------------------------------------------
   FUNCIÓN PURA (opera sobre el objeto perfil que se le pasa).

   POR QUÉ CADA CATEGORÍA TIENE SU PROPIA BOLSA (PLAN §14.7): el plan v1 tenía 84
   mensajes en 4 categorías elegidos por contexto. La bolsa EFECTIVA era la de la
   categoría —15-20 mensajes— y un niño con racha veía repetido el mismo elogio
   de racha en 15 aciertos seguidos. Muy por debajo de los «40 minutos sin
   repetir» que el propio plan prometía.

   Ahora: 4 categorías × EXACTAMENTE 21, cada una con su BolsaBarajada persistida
   en el perfil. Ningún mensaje se repite hasta agotar la bolsa de SU categoría.
   Además, nunca se repite uno de los `ultimos12` globales: si la bolsa solo
   ofrece uno ya reciente, se toma el siguiente de la bolsa.
   ========================================================================== */

var CB = CB || {};
CB.mensajes = CB.mensajes || {};

CB.mensajes.CATS_ACIERTO = ['A', 'B', 'C', 'D'];
CB.mensajes.CATS_ANIMO   = ['P1', 'P2'];
CB.mensajes.RECIENTES_ACIERTO = 12;
CB.mensajes.RECIENTES_ANIMO   = 10;

CB.mensajes.listaDe = function (cat) {
  var M = CB.datos.MENSAJES;
  if (cat === 'A')  return M.acierto_A;
  if (cat === 'B')  return M.acierto_B;
  if (cat === 'C')  return M.acierto_C;
  if (cat === 'D')  return M.acierto_D;
  if (cat === 'P1') return M.animo_P1;
  if (cat === 'P2') return M.animo_P2;
  return [];
};

/* Estructura persistida en perfil.mensajes (§15.3). */
CB.mensajes.nuevoEstado = function () {
  return {
    acierto: { bolsaA: [], bolsaB: [], bolsaC: [], bolsaD: [], ultimos12: [] },
    animo:   { bolsa1: [], bolsa2: [], ultimos10: [] },
    /* SIN GUION BAJO DELANTE, y no es estilo. CB.almacen.sanear() borra todas
       las claves que empiezan por «_», así que una bolsa llamada `_gritos` se
       reiniciaría en cada guardado y el grito volvería a repetirse cada dos por
       tres sin que nada fallara. Es exactamente lo que le pasó a la dificultad D
       (E45), que era un trinquete de una sola dirección por este mismo motivo. */
    gritos:  { bolsaAcierto: [] }
  };
};

CB.mensajes.asegurar = function (perfil) {
  if (!perfil.mensajes) perfil.mensajes = CB.mensajes.nuevoEstado();
  var m = perfil.mensajes;
  if (!m.acierto) m.acierto = { bolsaA: [], bolsaB: [], bolsaC: [], bolsaD: [], ultimos12: [] };
  if (!m.animo)   m.animo   = { bolsa1: [], bolsa2: [], ultimos10: [] };
  if (!m.acierto.ultimos12) m.acierto.ultimos12 = [];
  if (!m.animo.ultimos10)   m.animo.ultimos10 = [];
  /* Un perfil de 1.7.1 no la trae. Se crea aquí y por eso 1.8.0 no necesita
     migración en 01-almacen.js: la primera cifra de la versión se queda. */
  if (!m.gritos)  m.gritos  = { bolsaAcierto: [] };
  return m;
};

/* Índice global 0..83 de un mensaje de acierto, para los `ultimos12`. */
CB.mensajes.indiceGlobalAcierto = function (cat, i) {
  return CB.mensajes.CATS_ACIERTO.indexOf(cat) * 21 + i;
};
CB.mensajes.indiceGlobalAnimo = function (cat, i) {
  return CB.mensajes.CATS_ANIMO.indexOf(cat) * 24 + i;
};

/**
 * Elige la categoría de acierto según el contexto real del ítem.
 * @param ctx {rapido, racha, superacion, reparacion, vetaNueva, mundoNuevo}
 */
CB.mensajes.categoriaAcierto = function (ctx) {
  ctx = ctx || {};
  /* C) SUPERACIÓN tiene prioridad: viene de una tarjeta de reparación o de un
     concepto que se le atragantaba. Es el momento en que el mensaje más pesa. */
  if (ctx.reparacion || ctx.superacion) return 'C';
  /* D) DESCUBRIMIENTO: racha larga, veta o mundo nuevo. */
  if (ctx.mundoNuevo || ctx.vetaNueva || (ctx.racha && ctx.racha >= 3)) return 'D';
  /* B) ESFUERZO: le ha costado tiempo y lo ha sacado. */
  if (ctx.lento || (ctx.intento && ctx.intento > 1)) return 'B';
  /* A) PROCEDIMIENTO: el caso por defecto, y el más educativo. */
  return 'A';
};

CB.mensajes.categoriaAnimo = function (ctx) {
  ctx = ctx || {};
  /* P1 señala DÓNDE mirar: solo tiene sentido si conocemos la destreza. */
  if (ctx.destreza && CB.datos.MENSAJES.PISTAS[ctx.destreza]) return 'P1';
  return 'P2';
};

/* Rellena {proc} y {pista} con la frase de la destreza REAL del ítem. Un elogio
   de procedimiento solo educa si nombra el procedimiento correcto. */
CB.mensajes.rellenar = function (plantilla, ctx, rng) {
  var t = String(plantilla);
  var r = rng || CB.util.mulberry32(CB.util.hash32(t));

  if (t.indexOf('{proc}') !== -1) {
    var procs = CB.datos.MENSAJES.PROCEDIMIENTOS[ctx.destreza];
    var proc = procs ? procs[CB.util.ent(r, 0, procs.length - 1)]
                     : 'Has resuelto el bloque.';
    t = t.replace('{proc}', proc);
  }
  if (t.indexOf('{pista}') !== -1) {
    var pistas = CB.datos.MENSAJES.PISTAS[ctx.destreza];
    var pista = pistas ? pistas[CB.util.ent(r, 0, pistas.length - 1)]
                       : 'Vuelve a leerlo con calma.';
    t = t.replace('{pista}', pista);
  }
  return t;
};

/* Saca un índice de la bolsa de esa categoría, evitando los recientes. */
CB.mensajes.sacarDeBolsa = function (estadoBolsas, claveBolsa, n, recientes, evitarGlobales, offset, rng) {
  var bolsa = new CB.util.BolsaBarajada(n, rng, estadoBolsas[claveBolsa]);

  /* `recientes` son índices GLOBALES; se traducen a locales de esta bolsa. */
  var evitarLocal = [], i, g;
  for (i = 0; i < evitarGlobales.length; i++) {
    g = evitarGlobales[i] - offset;
    if (g >= 0 && g < n) evitarLocal.push(g);
  }

  var idx = bolsa.sacar(evitarLocal);
  estadoBolsas[claveBolsa] = bolsa.estado();
  return idx;
};

/**
 * Mensaje de enhorabuena. Requisito 4.
 * @param ctx {destreza, rapido, lento, racha, superacion, reparacion,
 *             vetaNueva, mundoNuevo, intento, perfil, rng}
 */
CB.mensajes.acierto = function (ctx) {
  ctx = ctx || {};
  var perfil = ctx.perfil || {};
  var m = CB.mensajes.asegurar(perfil);
  var rng = ctx.rng || CB.util.mulberry32(CB.util.hash32(String(m.acierto.ultimos12.length)));

  var cat = CB.mensajes.categoriaAcierto(ctx);
  var lista = CB.mensajes.listaDe(cat);
  var clave = 'bolsa' + cat;
  var offset = CB.mensajes.CATS_ACIERTO.indexOf(cat) * 21;

  var idx = CB.mensajes.sacarDeBolsa(
    m.acierto, clave, lista.length, m.acierto.ultimos12, m.acierto.ultimos12, offset, rng
  );
  if (idx < 0) idx = 0;

  var global = offset + idx;
  m.acierto.ultimos12.push(global);
  while (m.acierto.ultimos12.length > CB.mensajes.RECIENTES_ACIERTO) {
    m.acierto.ultimos12.shift();
  }

  return CB.mensajes.rellenar(lista[idx], ctx, rng);
};

/**
 * Mensaje motivador al fallar. Requisito 5.
 * Nunca contiene elogio de persona ni acusación: el criterio 7.2 del RD pide
 * literalmente «valorando el error como una oportunidad de aprendizaje».
 */
CB.mensajes.animo = function (ctx) {
  ctx = ctx || {};
  var perfil = ctx.perfil || {};
  var m = CB.mensajes.asegurar(perfil);
  var rng = ctx.rng || CB.util.mulberry32(CB.util.hash32(String(m.animo.ultimos10.length)));

  var cat = CB.mensajes.categoriaAnimo(ctx);
  var lista = CB.mensajes.listaDe(cat);
  var clave = (cat === 'P1') ? 'bolsa1' : 'bolsa2';
  var offset = CB.mensajes.CATS_ANIMO.indexOf(cat) * 24;

  var idx = CB.mensajes.sacarDeBolsa(
    m.animo, clave, lista.length, m.animo.ultimos10, m.animo.ultimos10, offset, rng
  );
  if (idx < 0) idx = 0;

  var global = offset + idx;
  m.animo.ultimos10.push(global);
  while (m.animo.ultimos10.length > CB.mensajes.RECIENTES_ANIMO) {
    m.animo.ultimos10.shift();
  }

  return CB.mensajes.rellenar(lista[idx], ctx, rng);
};

/**
 * El grito corto que va escrito en la cinta. No es un trozo del mensaje: es
 * material aparte, porque el mensaje entero se queda quieto donde se pueda leer.
 *
 * Sale de su propia bolsa barajada, igual que los mensajes, así que no se
 * repite hasta agotarla. Esa es la segunda de las tres capas contra la
 * monotonía: la primera es que la coreografía significa algo (js/30-ui.js) y la
 * tercera es que hay una que casi nunca sale.
 *
 * @param ctx {perfil, rng}
 */
CB.mensajes.grito = function (ctx) {
  ctx = ctx || {};
  var perfil = ctx.perfil || {};
  var m = CB.mensajes.asegurar(perfil);
  var lista = CB.datos.MENSAJES.GRITOS.acierto;
  var clave = 'bolsaAcierto';
  var rng = ctx.rng || CB.util.mulberry32(CB.util.hash32(clave + lista.length));

  var idx = CB.mensajes.sacarDeBolsa(m.gritos, clave, lista.length, [], [], 0, rng);
  if (idx < 0) idx = 0;
  return lista[idx];
};

/* Contrato de tamaño, para casos-mensajes.js (M1 y M2). */
CB.mensajes.contrato = function () {
  var M = CB.datos.MENSAJES;
  return {
    aciertoTotal: M.acierto.length,
    animoTotal: M.animo.length,
    porCategoriaAcierto: [M.acierto_A.length, M.acierto_B.length,
                          M.acierto_C.length, M.acierto_D.length],
    porCategoriaAnimo: [M.animo_P1.length, M.animo_P2.length],
    gritosAcierto: M.GRITOS.acierto.length
  };
};
