/* 14-gen-problemas.js — P1…P20, las 20 estructuras semánticas aditivas */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.problemas = {};

/* Ponderación y disponibilidad */
CB.gen.problemas.NUCLEAR = ['CAMBIO_1', 'CAMBIO_2', 'COMBINACION_1', 'COMBINACION_2',
                            'COMPARACION_1', 'COMPARACION_2'];
CB.gen.problemas.INTERMEDIO = ['CAMBIO_3', 'CAMBIO_4', 'COMPARACION_3', 'COMPARACION_4',
                               'IGUALACION_1', 'IGUALACION_2'];
CB.gen.problemas.AMPLIACION = ['CAMBIO_5', 'CAMBIO_6', 'COMPARACION_5', 'COMPARACION_6',
                               'IGUALACION_3', 'IGUALACION_4', 'IGUALACION_5', 'IGUALACION_6'];

CB.gen.problemas.PESO = function (sub) {
  if (CB.gen.problemas.NUCLEAR.indexOf(sub) !== -1) return 3;
  if (CB.gen.problemas.INTERMEDIO.indexOf(sub) !== -1) return 2;
  return 1;
};

CB.gen.problemas.SUBTIPOS = CB.gen.problemas.NUCLEAR
  .concat(CB.gen.problemas.INTERMEDIO)
  .concat(CB.gen.problemas.AMPLIACION);

CB.gen.problemas.DESTREZA = function (sub) {
  if (sub.indexOf('CAMBIO') === 0) return 'problemas_cambio';
  if (sub.indexOf('COMBINACION') === 0) return 'problemas_combinacion';
  if (sub.indexOf('COMPARACION') === 0) return 'problemas_comparacion';
  return 'problemas_igualacion';
};

/* Verbos que funcionan de verdad en un problema de cambio. «Después ve 5 peces.
   ¿Cuántos tiene ahora?» es una frase rota, y un niño de 7 años la detecta. */
CB.gen.problemas.VERBOS_PROBLEMA = {
  comida:    { ganar: ['coge', 'compra'],      perder: ['come', 'reparte'] },
  juguete:   { ganar: ['gana', 'compra'],      perder: ['regala', 'presta'] },
  escolar:   { ganar: ['compra', 'encuentra'], perder: ['pierde', 'presta'] },
  natura:    { ganar: ['recoge', 'encuentra'], perder: ['regala', 'planta'] },
  animal:    { ganar: ['encuentra', 'recoge'], perder: ['suelta', 'regala'] },
  coleccion: { ganar: ['gana', 'compra'],      perder: ['regala', 'cambia'] },
  bloque:    { ganar: ['pica', 'encuentra'],   perder: ['coloca', 'regala'] }
};

/* Bolsas persistidas: el género se ALTERNA por construcción (§9.7) */
CB.gen.problemas.nuevoEstadoBolsas = function () {
  return { genero: [], nombreF: [], nombreM: [], rol: [], objeto: [] };
};

CB.gen.problemas.elegirActores = function (rng, bolsas) {
  bolsas = bolsas || CB.gen.problemas.nuevoEstadoBolsas();

  const bG = new CB.util.BolsaBarajada(2, rng, bolsas.genero);
  const g1 = bG.sacar([]);
  bolsas.genero = bG.estado();

  const listaA = (g1 === 0) ? CB.datos.NOMBRES_F : CB.datos.NOMBRES_M;
  const listaB = (g1 === 0) ? CB.datos.NOMBRES_M : CB.datos.NOMBRES_F;
  const claveA = (g1 === 0) ? 'nombreF' : 'nombreM';
  const claveB = (g1 === 0) ? 'nombreM' : 'nombreF';

  const bA = new CB.util.BolsaBarajada(listaA.length, rng, bolsas[claveA]);
  const iA = bA.sacar([]); bolsas[claveA] = bA.estado();
  const bB = new CB.util.BolsaBarajada(listaB.length, rng, bolsas[claveB]);
  const iB = bB.sacar([]); bolsas[claveB] = bB.estado();

  const bO = new CB.util.BolsaBarajada(CB.datos.OBJETOS.length, rng, bolsas.objeto);
  const iO = bO.sacar([]); bolsas.objeto = bO.estado();

  const bR = new CB.util.BolsaBarajada(2, rng, bolsas.rol);
  const rol = bR.sacar([]); bolsas.rol = bR.estado();

  return {
    n1: listaA[iA < 0 ? 0 : iA],
    n2: listaB[iB < 0 ? 0 : iB],
    obj: CB.datos.OBJETOS[iO < 0 ? 0 : iO],
    generoPrimero: (g1 === 0) ? 'F' : 'M',
    rolPrimeroGana: rol === 0,
    bolsas: bolsas
  };
};

/* Las 20 plantillas */

function cuantos(obj) { return obj.g === 'f' ? 'Cuántas' : 'Cuántos'; }

CB.gen.problemas.PLANTILLAS = {

  CAMBIO_1: function (a, b, act, vg) {          /* incógnita en el resultado (+) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Después ' + vg + ' ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ahora?'
      ],
      datos: [a, b], respuesta: a + b, operacion: '+'
    };
  },

  CAMBIO_2: function (a, b, act, vg, vp) {      /* incógnita en el resultado (−) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Después ' + vp + ' ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' le quedan?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  COMBINACION_1: function (a, b, act) {          /* incógnita en el todo */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tienen en total?'
      ],
      datos: [a, b], respuesta: a + b, operacion: '+'
    };
  },

  COMBINACION_2: function (a, b, act) {          /* incógnita en una parte */
    return {
      frases: [
        'Entre ' + act.n1 + ' y ' + act.n2 + ' tienen ' + a + ' ' + act.obj.plur + '.',
        act.n1 + ' tiene ' + b + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  COMPARACION_1: function (a, b, act) {          /* diferencia desconocida (más) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' más tiene ' + act.n1 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  COMPARACION_2: function (a, b, act) {          /* diferencia desconocida (menos) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' menos tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  CAMBIO_3: function (a, c, act) {               /* incógnita en el cambio (+) */
    return {
      frases: [
        act.n1 + ' tenía ' + a + ' ' + act.obj.plur + '.',
        'Ahora tiene ' + c + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' ha ganado?'
      ],
      datos: [a, c], respuesta: c - a, operacion: '-'
    };
  },

  CAMBIO_4: function (a, c, act) {               /* incógnita en el cambio (−) */
    return {
      frases: [
        act.n1 + ' tenía ' + a + ' ' + act.obj.plur + '.',
        'Ahora tiene ' + c + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' ha perdido?'
      ],
      datos: [a, c], respuesta: a - c, operacion: '-'
    };
  },

  COMPARACION_3: function (a, b, act) {          /* referido desconocido (más) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' más.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a + b, operacion: '+'
    };
  },

  COMPARACION_4: function (a, b, act) {          /* referido desconocido (menos) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' menos.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  IGUALACION_1: function (a, b, act) {           /* añadir al menor */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' le faltan a ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  IGUALACION_2: function (a, b, act) {           /* quitar al mayor */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' le sobran a ' + act.n1 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  CAMBIO_5: function (b, c, act, vg) {           /* estado inicial (+) */
    return {
      frases: [
        act.n1 + ' ' + vg + ' ' + b + ' ' + act.obj.plur + '.',
        'Ahora tiene ' + c + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tenía antes?'
      ],
      datos: [b, c], respuesta: c - b, operacion: '-'
    };
  },

  CAMBIO_6: function (b, c, act, vg, vp) {       /* estado inicial (−) */
    return {
      frases: [
        act.n1 + ' ' + vp + ' ' + b + ' ' + act.obj.plur + '.',
        'Ahora tiene ' + c + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tenía antes?'
      ],
      datos: [b, c], respuesta: c + b, operacion: '+'
    };
  },

  COMPARACION_5: function (a, b, act) {          /* referente desconocido (más) */
    /* El ejemplo canónico del plan, con elipsis del sujeto en la 2.ª frase. */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Tiene ' + b + ' más que ' + act.n2 + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  COMPARACION_6: function (a, b, act) {          /* referente desconocido (menos) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Tiene ' + b + ' menos que ' + act.n2 + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a + b, operacion: '+'
    };
  },

  IGUALACION_3: function (a, b, act) {           /* referido desconocido (añadir) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'A ' + act.n2 + ' le faltan ' + b + ' para igualar.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  IGUALACION_4: function (a, b, act) {           /* referido desconocido (quitar) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Le sobran ' + b + ' para igualar.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  IGUALACION_5: function (c, b, act) {           /* referente desconocido (añadir) */
    return {
      frases: [
        act.n2 + ' tiene ' + c + ' ' + act.obj.plur + '.',
        'Le faltan ' + b + ' para igualar a ' + act.n1 + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n1 + '?'
      ],
      datos: [c, b], respuesta: c + b, operacion: '+'
    };
  },

  IGUALACION_6: function (c, b, act) {           /* referente desconocido (quitar) */
    return {
      frases: [
        act.n1 + ' tiene ' + c + ' ' + act.obj.plur + '.',
        'Le sobran ' + b + ' para igualar a ' + act.n2 + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [c, b], respuesta: c - b, operacion: '-'
    };
  }
};

/* resolver(): recálculo INDEPENDIENTE de la plantilla */
CB.gen.problemas.resolver = function (subtipo, d) {
  const x = d[0], y = d[1];
  switch (subtipo) {
    case 'CAMBIO_1':      return x + y;
    case 'CAMBIO_2':      return x - y;
    case 'COMBINACION_1': return x + y;
    case 'COMBINACION_2': return x - y;
    case 'COMPARACION_1': return x - y;
    case 'COMPARACION_2': return x - y;
    case 'CAMBIO_3':      return y - x;
    case 'CAMBIO_4':      return x - y;
    case 'COMPARACION_3': return x + y;
    case 'COMPARACION_4': return x - y;
    case 'IGUALACION_1':  return x - y;
    case 'IGUALACION_2':  return x - y;
    case 'CAMBIO_5':      return y - x;
    case 'CAMBIO_6':      return y + x;
    case 'COMPARACION_5': return x - y;
    case 'COMPARACION_6': return x + y;
    case 'IGUALACION_3':  return x - y;
    case 'IGUALACION_4':  return x - y;
    case 'IGUALACION_5':  return x + y;
    case 'IGUALACION_6':  return x - y;
    default: return null;
  }
};

/* Elección de números por subtipo, respetando el techo del trimestre */
CB.gen.problemas.numeros = function (subtipo, rng, D, techo) {
  let max = Math.min(techo || 99, (D === 1) ? 20 : (D === 2 ? 60 : techo || 99));
  if (max < 6) max = 6;
  let a, b, c, k = 0;

  switch (subtipo) {
    case 'CAMBIO_1': case 'COMBINACION_1': case 'COMPARACION_3': case 'COMPARACION_6':
      do { k++; a = CB.util.ent(rng, 2, max); b = CB.util.ent(rng, 1, max); }
      while (a + b > (techo || 99) && k < 40);
      return [a, b];

    case 'CAMBIO_6': case 'IGUALACION_5':
      do { k++; b = CB.util.ent(rng, 1, Math.floor(max / 2)); c = CB.util.ent(rng, 2, max); }
      while (c + b > (techo || 99) && k < 40);
      return [c, b];

    case 'CAMBIO_3': case 'CAMBIO_5':
      /* El segundo dato es el mayor: la respuesta nunca es negativa. */
      a = CB.util.ent(rng, 1, Math.max(2, max - 2));
      c = CB.util.ent(rng, a + 1, max);
      return [a, c];

    default:
      /* Todos los de resta: el primero SIEMPRE ≥ el segundo (invariante 2). */
      a = CB.util.ent(rng, 3, max);
      b = CB.util.ent(rng, 1, a);
      return [a, b];
  }
};

/* Dato sobrante (§9.4) */
CB.gen.problemas.datoSobrante = function (datos, respuesta, rng, techo) {
  const a = datos[0], b = datos[1];
  let k = 0, c;
  while (k < 40) {
    k++;
    c = CB.util.ent(rng, 1, Math.min(techo || 99, 40));
    if (c === a || c === b || c === respuesta) continue;
    if (a + c === respuesta || a - c === respuesta) continue;
    if (b + c === respuesta || b - c === respuesta) continue;
    if (c + a === respuesta || c - a === respuesta) continue;
    if (c + b === respuesta || c - b === respuesta) continue;
    return c;
  }
  return null;
};

/* El validador de lectura fácil — INVARIANTE 7 */

CB.gen.problemas.SUBORDINANTES = ['si', 'cuando', 'mientras', 'aunque', 'porque'];
/* «que» solo se admite en las comparativas: más que / menos que. */
CB.gen.problemas.ANTES_DE_QUE = ['más', 'menos', 'tantos', 'tantas'];

/* Formas que DEBEN llevar tilde en la acepción que usa el juego. Si aparece la
   forma sin tilde, el test falla: es material escolar. */
CB.gen.problemas.EXIGEN_TILDE = {
  'mas': 'más', 'numero': 'número', 'cuantos': 'cuántos', 'cuantas': 'cuántas',
  'cuanto': 'cuánto', 'despues': 'después', 'que': null, 'cual': 'cuál',
  'como': null, 'tenia': 'tenía'
};

CB.gen.problemas.validacion = {
  excedePalabras: function (textos, limite) {
    return textos.some(function (texto) {
      return CB.util.palabras(texto).length > limite;
    });
  },

  excedeAncho: function (lineas, limite) {
    return lineas.some(function (linea) { return linea.length > limite; });
  },

  tieneSubordinacion: function (palabras) {
    return palabras.some(function (palabra, indice) {
      if (CB.gen.problemas.SUBORDINANTES.indexOf(palabra) !== -1) return true;
      if (palabra !== 'que') return false;
      const anterior = indice > 0 ? palabras[indice - 1] : '';
      return CB.gen.problemas.ANTES_DE_QUE.indexOf(anterior) === -1;
    });
  },

  faltaTilde: function (palabras) {
    return palabras.some(function (palabra) {
      return !!CB.gen.problemas.EXIGEN_TILDE[palabra];
    });
  },

  repiteSujeto: function (frases) {
    return frases.some(function (frase, indice) {
      if (indice === 0) return false;
      const anterior = CB.util.palabras(frases[indice - 1])[0];
      const actual = CB.util.palabras(frase)[0];
      return !!(anterior && actual && anterior === actual && /^[A-ZÁÉÍÓÚÑ]/.test(anterior));
    });
  },

  fueraDeLista: function (palabras) {
    const invalida = palabras.find(function (palabra) {
      if (/^\d+$/.test(palabra)) return false;
      return !CB.datos.enListaBlanca(palabra);
    });
    return invalida || null;
  }
};

CB.gen.problemas.validar = function (item) {
  const motivos = [];
  const frases = item.frases || [];
  const texto = frases.join(' ');

  /* 1. Número de frases y forma de la pregunta */
  if (frases.length > 3) motivos.push('frases');
  if (!frases.length) { motivos.push('frases'); return { ok: false, motivos: motivos }; }

  const ultima = frases[frases.length - 1];
  if (ultima.indexOf('¿') !== 0 || ultima.charAt(ultima.length - 1) !== '?') {
    motivos.push('pregunta');
  }
  if (CB.util.palabras(ultima).length > 8) motivos.push('preguntaLarga');

  /* 2. Longitud */
  if (CB.gen.problemas.validacion.excedePalabras(frases, 12)) motivos.push('fraseLarga');
  if (CB.util.palabras(texto).length > 25) motivos.push('total');

  /* 3. Ancho de línea, con el MISMO algoritmo que usa la interfaz */
  const lineas = CB.util.cortarLineas(texto, 34);
  if (CB.gen.problemas.validacion.excedeAncho(lineas, 34)) motivos.push('ancho');
  if (lineas.length > 5) motivos.push('demasiadasLineas');

  /* 4. Datos numéricos */
  const numeros = texto.match(/\d+/g) || [];
  const maxDatos = item.datoSobrante ? 3 : 2;
  if (numeros.length > maxDatos) motivos.push('datos');

  /* 5. Subordinación prohibida */
  const palabras = CB.util.palabras(texto.toLowerCase().replace(/[¿?.,!¡]/g, ''));
  if (CB.gen.problemas.validacion.tieneSubordinacion(palabras)) motivos.push('subordinacion');

  /* 6. Tildes obligatorias */
  if (CB.gen.problemas.validacion.faltaTilde(palabras)) motivos.push('tilde');
  /* Toda exclamación abre con ¡ y cierra con !; toda interrogación con ¿ y ? */
  if (texto.indexOf('!') !== -1 && texto.indexOf('¡') === -1) motivos.push('signos');
  if (texto.indexOf('?') !== -1 && texto.indexOf('¿') === -1) motivos.push('signos');

  /* 7. Sujeto explícito repetido en frases consecutivas */
  if (CB.gen.problemas.validacion.repiteSujeto(frases)) motivos.push('sujetoRepetido');

  /* 8. Lista blanca */
  const fueraDeLista = CB.gen.problemas.validacion.fueraDeLista(palabras);
  if (fueraDeLista) motivos.push('listaBlanca:' + fueraDeLista);

  /* 9. Rango de la respuesta */
  if (!(item.respuesta >= 0 && item.respuesta <= 999)) motivos.push('rango');

  return { ok: motivos.length === 0, motivos: motivos };
};

/* PROBLEMAS_SEGUROS: 12 enunciados fijos validados a mano */
CB.gen.problemas.PROBLEMAS_SEGUROS = [
  { subtipo: 'CAMBIO_1', frases: ['Ana tiene 12 cromos.', 'Después gana 5 cromos.', '¿Cuántos cromos tiene ahora?'], datos: [12, 5], respuesta: 17, operacion: '+' },
  { subtipo: 'CAMBIO_2', frases: ['Leo tiene 15 canicas.', 'Después regala 6 canicas.', '¿Cuántas canicas le quedan?'], datos: [15, 6], respuesta: 9, operacion: '-' },
  { subtipo: 'COMBINACION_1', frases: ['Sara tiene 8 fresas.', 'Hugo tiene 7 fresas.', '¿Cuántas fresas tienen en total?'], datos: [8, 7], respuesta: 15, operacion: '+' },
  { subtipo: 'COMBINACION_2', frases: ['Entre Marta y Bruno tienen 20 globos.', 'Marta tiene 12.', '¿Cuántos globos tiene Bruno?'], datos: [20, 12], respuesta: 8, operacion: '-' },
  { subtipo: 'COMPARACION_1', frases: ['Julia tiene 14 pegatinas.', 'Pablo tiene 9 pegatinas.', '¿Cuántas pegatinas más tiene Julia?'], datos: [14, 9], respuesta: 5, operacion: '-' },
  { subtipo: 'COMPARACION_2', frases: ['Laia tiene 18 hojas.', 'Marc tiene 11 hojas.', '¿Cuántas hojas menos tiene Marc?'], datos: [18, 11], respuesta: 7, operacion: '-' },
  { subtipo: 'CAMBIO_3', frases: ['Noa tenía 10 conchas.', 'Ahora tiene 16 conchas.', '¿Cuántas conchas ha ganado?'], datos: [10, 16], respuesta: 6, operacion: '-' },
  { subtipo: 'CAMBIO_4', frases: ['Pau tenía 21 piedras.', 'Ahora tiene 13 piedras.', '¿Cuántas piedras ha perdido?'], datos: [21, 13], respuesta: 8, operacion: '-' },
  { subtipo: 'COMPARACION_3', frases: ['Emma tiene 9 flores.', 'Jan tiene 4 más.', '¿Cuántas flores tiene Jan?'], datos: [9, 4], respuesta: 13, operacion: '+' },
  { subtipo: 'COMPARACION_4', frases: ['Iris tiene 17 gemas.', 'Nil tiene 5 menos.', '¿Cuántas gemas tiene Nil?'], datos: [17, 5], respuesta: 12, operacion: '-' },
  { subtipo: 'IGUALACION_1', frases: ['Alba tiene 13 setas.', 'Iker tiene 6 setas.', '¿Cuántas le faltan a Iker?'], datos: [13, 6], respuesta: 7, operacion: '-' },
  { subtipo: 'COMPARACION_5', frases: ['Nora tiene 12 cromos.', 'Tiene 5 más que Mario.', '¿Cuántos cromos tiene Mario?'], datos: [12, 5], respuesta: 7, operacion: '-' }
];

/* Generación */
CB.gen.problemas.generarSubtipo = function (subtipo, rng, D, ctx) {
  ctx = ctx || {};
  /* El techo del problema se queda en 999 aunque el curso llegue al millón:
     el validador de lectura fácil exige respuesta ≤ 999, y sin este tope un
     curso alto agotaba los 20 intentos y servía SIEMPRE el problema de
     respaldo. En los problemas la dificultad vive en la estructura, no en el
     tamaño del número (3.1.0). */
  const techo = Math.min(ctx.techo || 99, 999);
  const conSobrante = !!ctx.datoSobrante;
  let intentos = 0, item;

  while (intentos < 20) {
    intentos++;
    const act = CB.gen.problemas.elegirActores(rng, ctx.bolsas);
    if (ctx.bolsas) ctx.bolsas = act.bolsas;

    const verbos = CB.gen.problemas.VERBOS_PROBLEMA[act.obj.cat];
    const vg = CB.util.elegir(rng, verbos.ganar);
    const vp = CB.util.elegir(rng, verbos.perder);

    const d = CB.gen.problemas.numeros(subtipo, rng, D, techo);
    const plantilla = CB.gen.problemas.PLANTILLAS[subtipo];
    if (!plantilla) break;

    const base = plantilla(d[0], d[1], act, vg, vp);
    if (base.respuesta < 0 || base.respuesta > 999) continue;

    item = {
      subtipo: subtipo,
      formato: 'teclado',            /* SIEMPRE teclado en primer intento (§9.5) */
      frases: base.frases,
      enunciado: base.frases.join(' '),
      datos: base.datos,
      respuesta: base.respuesta,
      operacion: base.operacion,
      destreza: CB.gen.problemas.DESTREZA(subtipo),
      objeto: act.obj,
      actores: [act.n1, act.n2],
      expr: subtipo + '_' + base.datos.join('_'),
      diagnostico: true,
      datoSobrante: false
    };

    if (conSobrante) {
      const c = CB.gen.problemas.datoSobrante(base.datos, base.respuesta, rng, techo);
      if (c != null) {
        item.datoSobrante = true;
        item.numeroSobrante = c;
        item.frases = [base.frases[0], base.frases[1],
                       base.frases[2]];
        /* El dato sobrante se inserta como una coletilla de la 2.ª frase, sin
           subordinación y sin pasar de 12 palabras. */
        const extra = 'También tiene ' + c + ' ' + act.obj.plur + ' de otro color.';
        if (CB.util.palabras(extra).length <= 12) {
          item.frases = [base.frases[0], extra, base.frases[2]];
          item.datos = base.datos.slice();
        } else {
          item.datoSobrante = false;
        }
        item.enunciado = item.frases.join(' ');
      }
    }

    const v = CB.gen.problemas.validar(item);
    if (v.ok) { item.validado = true; return item; }
    item.motivos = v.motivos;
  }

  /* Ningún intento ha validado: se sirve un enunciado seguro. */
  const seguro = CB.gen.problemas.PROBLEMAS_SEGUROS.filter(function (p) {
    return p.subtipo === subtipo;
  })[0] || CB.gen.problemas.PROBLEMAS_SEGUROS[0];

  return {
    subtipo: seguro.subtipo,
    formato: 'teclado',
    frases: seguro.frases.slice(),
    enunciado: seguro.frases.join(' '),
    datos: seguro.datos.slice(),
    respuesta: seguro.respuesta,
    operacion: seguro.operacion,
    destreza: CB.gen.problemas.DESTREZA(seguro.subtipo),
    expr: 'seguro_' + seguro.subtipo,
    diagnostico: true,
    datoSobrante: false,
    deRespaldo: true
  };
};

/* siguienteSubtipo(): deuda de cobertura PONDERADA (§9.2) */
CB.gen.problemas.disponibles = function (perfil) {
  const trimestre = (perfil && perfil.trimestreDeducido) ? perfil.trimestreDeducido : 1;
  let out = CB.gen.problemas.NUCLEAR.slice(), i, p, nuclearOk = true;

  /* Los INTERMEDIOS solo desde T2 y solo con ≥80 % en los nucleares. */
  let aciertos = 0, intentos = 0;
  for (i = 0; i < CB.gen.problemas.NUCLEAR.length; i++) {
    p = (perfil && perfil.problemas) ? perfil.problemas[CB.gen.problemas.NUCLEAR[i]] : null;
    if (p) { aciertos += p.aciertos || 0; intentos += p.intentos || 0; }
  }
  nuclearOk = (intentos >= 6) && ((aciertos / intentos) >= 0.8);

  if (trimestre >= 2 && nuclearOk) out = out.concat(CB.gen.problemas.INTERMEDIO);
  return out;
};

/**
 * @param ctx {lucesActuales} — la AMPLIACIÓN nunca se sirve con menos de 3 luces.
 */
CB.gen.problemas.siguienteSubtipo = function (perfil, ctx) {
  ctx = ctx || {};
  let lista = CB.gen.problemas.disponibles(perfil);

  const trimestre = (perfil && perfil.trimestreDeducido) ? perfil.trimestreDeducido : 1;
  if (trimestre >= 3 && (ctx.lucesActuales == null || ctx.lucesActuales >= 3)) {
    lista = lista.concat(CB.gen.problemas.AMPLIACION.filter(function (s) {
      return !ctx.soloNucleares;
    }));
  }
  if (!lista.length) lista = CB.gen.problemas.NUCLEAR.slice();

  let totalPeso = 0, i;
  for (i = 0; i < lista.length; i++) totalPeso += CB.gen.problemas.PESO(lista[i]);

  let servidasTotal = 0;
  for (i = 0; i < lista.length; i++) {
    const pr = (perfil && perfil.problemas) ? perfil.problemas[lista[i]] : null;
    servidasTotal += pr ? (pr.intentos || 0) : 0;
  }

  let mejor = null, mejorDeuda = -Infinity;
  for (i = 0; i < lista.length; i++) {
    const sub = lista[i];
    const peso = CB.gen.problemas.PESO(sub);
    const esperadas = (servidasTotal + 1) * (peso / totalPeso);
    const pr2 = (perfil && perfil.problemas) ? perfil.problemas[sub] : null;
    const servidas = pr2 ? (pr2.intentos || 0) : 0;
    const deuda = peso * (esperadas - servidas);

    if (deuda > mejorDeuda) {
      mejorDeuda = deuda; mejor = sub;
    } else if (deuda === mejorDeuda && mejor) {
      /* Empate: el de menor tiempo medio, para no encadenar los más lentos. */
      const a = (perfil && perfil.problemas && perfil.problemas[mejor]) ? perfil.problemas[mejor].rtMedioMs : 0;
      const b = pr2 ? pr2.rtMedioMs : 0;
      if (b < a) mejor = sub;
    }
  }
  return mejor || 'CAMBIO_1';
};

/* Nivel P1..P20 ↔ subtipo */
CB.gen.problemas.SUBTIPO_DE_NIVEL = {
  P1: 'CAMBIO_1', P2: 'CAMBIO_2', P3: 'COMBINACION_1', P4: 'COMBINACION_2',
  P5: 'COMPARACION_1', P6: 'COMPARACION_2', P7: 'CAMBIO_3', P8: 'CAMBIO_4',
  P9: 'COMPARACION_3', P10: 'COMPARACION_4', P11: 'IGUALACION_1', P12: 'IGUALACION_2',
  P13: 'CAMBIO_5', P14: 'CAMBIO_6', P15: 'COMPARACION_5', P16: 'COMPARACION_6',
  P17: 'IGUALACION_3', P18: 'IGUALACION_4', P19: 'IGUALACION_5', P20: 'IGUALACION_6',
  /* Curso 1.º (3.0.0): las mismas cuatro estructuras nucleares. El curso no
     cambia la plantilla, cambia el techo numérico que la partida pasa en ctx. */
  P21: 'CAMBIO_1', P22: 'CAMBIO_2', P23: 'COMBINACION_1', P24: 'COMBINACION_2',
  /* Cursos 3.º-6.º (3.1.0): las estructuras más duras del banco aditivo, con
     números hasta 999. Los problemas MULTIPLICATIVOS son deuda declarada en
     docs/decisiones.md: exigen plantillas y validación nuevas, no filas. */
  P25: 'IGUALACION_1', P26: 'CAMBIO_5', P27: 'CAMBIO_6', P28: 'COMPARACION_5',
  P29: 'COMPARACION_6',
  P30: 'IGUALACION_3', P31: 'IGUALACION_4', P32: 'COMBINACION_2', P33: 'CAMBIO_5',
  P34: 'COMPARACION_5',
  P35: 'IGUALACION_5', P36: 'IGUALACION_6', P37: 'CAMBIO_6', P38: 'COMPARACION_6',
  P39: 'COMBINACION_1',
  P40: 'IGUALACION_5', P41: 'IGUALACION_6', P42: 'COMPARACION_5', P43: 'CAMBIO_5',
  P44: 'COMBINACION_2'
};

/* Los generadores P1..P20 que consume el catálogo. */
(function () {
  let k;
  for (k in CB.gen.problemas.SUBTIPO_DE_NIVEL) {
    if (!Object.prototype.hasOwnProperty.call(CB.gen.problemas.SUBTIPO_DE_NIVEL, k)) continue;
    (function (nivelId, subtipo) {
      CB.gen.problemas[nivelId] = function (rng, D, ctx) {
        return CB.gen.problemas.generarSubtipo(subtipo, rng, D, ctx);
      };
    })(k, CB.gen.problemas.SUBTIPO_DE_NIVEL[k]);
  }
})();
