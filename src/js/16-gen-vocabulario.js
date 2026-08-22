/* 16-gen-vocabulario.js — V1…V8 (Diccionario de Bloques) */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.vocabulario = {};

CB.gen.vocabulario.terminosDe = function (nivelId) {
  return CB.datos.GLOSARIO.filter(function (g) { return g.n === nivelId; });
};

/* Un ítem de vocabulario es: se da la definición, se elige el término.
   El índice del término dentro del glosario hace de «respuesta» entera, para
   cumplir el invariante 5 sin inventar un número que no significa nada. */
function itemVocab(nivelId, rng, D) {
  let propios = CB.gen.vocabulario.terminosDe(nivelId);
  if (!propios.length) propios = CB.datos.GLOSARIO.slice(0, 6);

  const elegido = CB.util.elegir(rng, propios);
  const iGlobal = CB.datos.GLOSARIO.indexOf(elegido);

  /* Los distractores salen del MISMO nivel siempre que se pueda: confundir
     «sumando» con «decena» no informa de nada; confundirlo con «total» sí. */
  let candidatos = propios.filter(function (g) { return g.t !== elegido.t; });
  if (candidatos.length < 3) {
    candidatos = candidatos.concat(
      CB.datos.GLOSARIO.filter(function (g) {
        return g.t !== elegido.t && candidatos.indexOf(g) === -1;
      })
    );
  }
  const distractores = CB.util.barajar(candidatos, rng).slice(0, 3);

  return {
    formato: 'opciones4',
    consigna: elegido.d,
    preguntaPrevia: '¿Qué palabra es?',
    respuesta: iGlobal,
    /* La UI pinta textos, no números: opcionesTexto lleva las palabras. */
    opcionesTexto: null,
    termino: elegido.t,
    esMayores: !!elegido.mayores,
    distractoresTexto: distractores.map(function (g) { return g.t; }),
    distractoresIndice: distractores.map(function (g) { return CB.datos.GLOSARIO.indexOf(g); }),
    expr: 'voc_' + elegido.t.replace(/\s+/g, '-'),
    diagnostico: false,
    esTextual: true
  };
}

CB.gen.vocabulario.V1 = function (rng, D) { return itemVocab('V1', rng, D); };
CB.gen.vocabulario.V2 = function (rng, D) { return itemVocab('V2', rng, D); };
CB.gen.vocabulario.V3 = function (rng, D) { return itemVocab('V3', rng, D); };
CB.gen.vocabulario.V6 = function (rng, D) { return itemVocab('V6', rng, D); };
CB.gen.vocabulario.V7 = function (rng, D) { return itemVocab('V7', rng, D); };
CB.gen.vocabulario.V8 = function (rng, D) { return itemVocab('V8', rng, D); };

/* V4 Comparar: se responde en la balanza, no eligiendo palabra */
CB.gen.vocabulario.V4 = function (rng, D) {
  const a = CB.util.ent(rng, 1, (D === 1) ? 20 : 99);
  const b = CB.util.ent(rng, 1, (D === 1) ? 20 : 99);
  const signo = (a > b) ? '>' : (a < b ? '<' : '=');
  const palabra = (signo === '>') ? 'mayor que' : (signo === '<' ? 'menor que' : 'igual');
  return {
    formato: 'balanza',
    consigna: '¿' + a + ' es mayor, menor o igual que ' + b + '?',
    visual: { tipo: 'balanza', a: a, b: b },
    opcionesFijas: ['>', '<', '='],
    respuestaSigno: signo,
    respuesta: Math.max(a, b),
    termino: palabra,
    expr: 'voccomp' + a + signo + b,
    diagnostico: false,
    esTextual: false
  };
};

/* V5 Orden y posición: se responde ordenando */
CB.gen.vocabulario.V5 = function (rng, D) {
  const inicio = CB.util.ent(rng, 1, 14);
  const cuantos = (D === 1) ? 3 : 4;
  const orden = [];
  let i;
  for (i = 0; i < cuantos; i++) orden.push(inicio + i);
  return {
    formato: 'ordenar',
    consigna: 'Coloca las vagonetas de la primera a la última.',
    orden: orden,
    piezas: CB.util.barajar(orden, rng),
    respuesta: orden[orden.length - 1],
    termino: 'primero',
    expr: 'vocord' + inicio + '_' + cuantos,
    diagnostico: false,
    esTextual: false
  };
};

/* Términos que el niño «desbloquea» al acertar: alimentan el logro
   «Palabra de piedra» y la pantalla del Diccionario. */
CB.gen.vocabulario.terminoDe = function (item) {
  return item && item.termino ? item.termino : null;
};
