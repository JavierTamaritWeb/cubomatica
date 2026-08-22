/* 26-reparacion.js — La tarjeta de reparación y los 6 explicadores */

var CB = CB || {};
CB.reparacion = CB.reparacion || {};

CB.reparacion.SUELO_MS_MIN = 4000;
CB.reparacion.MS_POR_PALABRA = 900;

/* El salvavidas NO es un valor fijo (corrección de un defecto del plan): con 25 palabras el suelo temporal sale a 22,5 s y el salvavidas fijo de 25 s quedaba a solo 2,5 s de distancia. */
CB.reparacion.SALVAVIDAS_MIN_MS = 25000;
CB.reparacion.SALVAVIDAS_MARGEN_MS = 8000;

CB.reparacion.salvavidasDe = function (sueloMs) {
  return Math.max(CB.reparacion.SALVAVIDAS_MIN_MS,
                  sueloMs + CB.reparacion.SALVAVIDAS_MARGEN_MS);
};

CB.reparacion.EXPLICADORES = ['columnasCDU', 'rectaNumerica', 'matrizFilasColumnas',
                              'barrasComparativas', 'monedas', 'tabla100'];

/* Qué explicador toca según la destreza del ítem. */
CB.reparacion.explicadorDe = function (destreza) {
  switch (destreza) {
    case 'suma_llevada':
    case 'resta_llevada':
    case 'valor_posicional':   return 'columnasCDU';
    case 'suma_sin_llevar':
    case 'resta_sin_llevar':   return 'tabla100';
    case 'numeracion':         return 'rectaNumerica';
    case 'multiplicacion':     return 'matrizFilasColumnas';
    case 'problemas_comparacion':
    case 'problemas_igualacion':
    case 'problemas_cambio':
    case 'problemas_combinacion': return 'barrasComparativas';
    case 'dinero':             return 'monedas';
    default:                   return 'rectaNumerica';
  }
};

/* Los 6 explicadores. Cada uno devuelve EXACTAMENTE 3 pasos */

CB.reparacion.columnasCDU = function (item) {
  var a = item.operandos ? item.operandos[0] : 63;
  var b = item.operandos ? item.operandos[1] : 28;
  var esResta = (item.operacion === '-');

  if (esResta) {
    var uA = a % 10, uB = b % 10;
    return {
      titulo: 'Las columnas',
      dibujo: 'columnas',
      datos: { a: a, b: b, op: '-' },
      pasos: [
        { texto: uA + ' es menos que ' + uB + ': no llega para quitar.', foco: 'unidades' },
        { texto: 'Pido prestada una decena y la deshago en 10 unidades.', foco: 'prestamo' },
        { texto: 'A las decenas les queda una menos. Ahora sí se puede restar.', foco: 'decenas' }
      ]
    };
  }
  return {
    titulo: 'Las columnas',
    dibujo: 'columnas',
    datos: { a: a, b: b, op: '+' },
    pasos: [
      { texto: 'Sumo primero las unidades: ' + (a % 10) + ' y ' + (b % 10) + '.', foco: 'unidades' },
      { texto: 'Si paso de 10, ato un manojo de diez y lo llevo.', foco: 'llevada' },
      { texto: 'Sumo las decenas y añado la que llevaba.', foco: 'decenas' }
    ]
  };
};

CB.reparacion.rectaNumerica = function (item) {
  var r = item.respuesta;
  var d = Math.floor(r / 10) * 10;
  return {
    titulo: 'La recta de los números',
    dibujo: 'recta',
    datos: { desde: Math.max(0, d - 10), hasta: d + 20, marca: r },
    pasos: [
      { texto: 'Busco el número en la recta.', foco: 'buscar' },
      { texto: 'Miro cuál va justo antes y cuál va justo después.', foco: 'vecinos' },
      { texto: 'Cuento los saltos de uno en uno hasta llegar.', foco: 'saltos' }
    ]
  };
};

CB.reparacion.matrizFilasColumnas = function (item) {
  var f = item.operandos ? item.operandos[0] : 3;
  var c = item.operandos ? item.operandos[1] : 4;
  return {
    titulo: 'Filas y columnas',
    dibujo: 'matriz',
    datos: { filas: f, columnas: c },
    pasos: [
      { texto: 'Cuento cuántas filas hay: ' + f + '.', foco: 'filas' },
      { texto: 'Cuento cuántos hay en cada fila: ' + c + '.', foco: 'columnas' },
      { texto: 'Sumo ' + c + ' un total de ' + f + ' veces. Eso es multiplicar.', foco: 'suma' }
    ]
  };
};

CB.reparacion.barrasComparativas = function (item) {
  var a = item.datos ? item.datos[0] : 12;
  var b = item.datos ? item.datos[1] : 5;
  return {
    titulo: 'Las dos barras',
    dibujo: 'barras',
    datos: { a: a, b: b },
    pasos: [
      { texto: 'Dibujo una barra para cada uno, con lo que tiene.', foco: 'dibujar' },
      { texto: 'Miro cuál es más larga.', foco: 'comparar' },
      { texto: 'Lo que sobresale es la diferencia. Eso es lo que preguntan.', foco: 'diferencia' }
    ]
  };
};

CB.reparacion.monedas = function (item) {
  return {
    titulo: 'El valor de cada moneda',
    dibujo: 'monedas',
    datos: { piezas: item.piezas || [2, 2, 1] },
    pasos: [
      { texto: 'No cuento las monedas: cuento lo que vale cada una.', foco: 'valor' },
      { texto: 'Junto primero las que valen lo mismo.', foco: 'agrupar' },
      { texto: 'Sumo los montones para saber el total.', foco: 'sumar' }
    ]
  };
};

CB.reparacion.tabla100 = function (item) {
  var r = item.respuesta;
  return {
    titulo: 'La tabla del 100',
    dibujo: 'tabla100',
    datos: { marca: r },
    pasos: [
      { texto: 'Busco el número de partida en la tabla.', foco: 'partida' },
      { texto: 'Para sumar o quitar 1, me muevo de lado.', foco: 'lado' },
      { texto: 'Para sumar o quitar 10, me muevo arriba o abajo.', foco: 'vertical' }
    ]
  };
};

/**
 * Construye la tarjeta completa para un ítem fallado dos veces.
 * @return {explicador, titulo, dibujo, datos, pasos[3], sueloMs, salvavidasMs,
 *          codigoError, notaAdulto}
 */
CB.reparacion.tarjeta = function (item, hipotesis) {
  var nombre = CB.reparacion.explicadorDe(item.destreza);
  var base = CB.reparacion[nombre](item);

  /* Suelo temporal adicional: 4 s como mínimo, y 900 ms por palabra. Un niño de
     2.º lee ≈1 palabra por segundo; menos que esto es no dejarle leer. */
  var palabras = 0, i;
  for (i = 0; i < base.pasos.length; i++) {
    palabras += CB.util.palabras(base.pasos[i].texto).length;
  }
  var suelo = Math.max(CB.reparacion.SUELO_MS_MIN,
                       palabras * CB.reparacion.MS_POR_PALABRA);

  var cod = (hipotesis && hipotesis.length) ? hipotesis[0] : null;
  var rec = (cod && CB.datos.RECOMENDACIONES[cod]) ? CB.datos.RECOMENDACIONES[cod] : null;

  return {
    explicador: nombre,
    titulo: base.titulo,
    dibujo: base.dibujo,
    datos: base.datos,
    pasos: base.pasos,
    sueloMs: suelo,
    salvavidasMs: CB.reparacion.salvavidasDe(suelo),
    codigoError: cod,
    notaAdulto: rec ? rec.frase : null
  };
};

/* La puerta de interacción */

CB.reparacion.nuevaPuerta = function (sueloMs) {
  return { tocados: [], sueloMs: sueloMs || CB.reparacion.SUELO_MS_MIN,
           abiertaTs: null, autocompletada: false };
};

/* Solo cuentan los toques EN ORDEN: 0, luego 1, luego 2. */
CB.reparacion.tocar = function (puerta, indicePaso) {
  if (indicePaso === puerta.tocados.length) puerta.tocados.push(indicePaso);
  return puerta.tocados.length;
};

CB.reparacion.puedeAbrir = function (puerta, msTranscurridos) {
  if (puerta.autocompletada) return true;
  if (puerta.tocados.length < 3) return false;
  return msTranscurridos >= puerta.sueloMs;
};

/* Salvavidas: a los 25 s sin tocar nada, se autocompleta con voz. */
CB.reparacion.autocompletar = function (puerta) {
  puerta.autocompletada = true;
  puerta.tocados = [0, 1, 2];
  return true;
};

/* Se registra en respuestas[] con el bit 32: alimenta la métrica «% de
   reparaciones con los 3 toques completados» del panel del adulto. */
CB.reparacion.completada = function (puerta) {
  return puerta.tocados.length >= 3 && !puerta.autocompletada;
};
