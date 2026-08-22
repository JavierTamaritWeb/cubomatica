/* objetos.js — 60 objetos contables para los enunciados */

var CB = CB || {};
CB.datos = CB.datos || {};

/* Verbos por categoría. Todos en 3.ª persona del singular del presente, que es
   el tiempo que sostiene la estructura semántica sin subordinación. */
CB.datos.VERBOS = {
  comida:   { ganar: ['coge', 'compra', 'recoge'],       perder: ['come', 'regala', 'reparte'] },
  juguete:  { ganar: ['gana', 'compra', 'encuentra'],    perder: ['regala', 'presta', 'pierde'] },
  escolar:  { ganar: ['compra', 'encuentra', 'coge'],    perder: ['pierde', 'presta', 'regala'] },
  natura:   { ganar: ['recoge', 'encuentra', 'coge'],    perder: ['pierde', 'planta', 'regala'] },
  animal:   { ganar: ['ve', 'cuida', 'encuentra'],       perder: ['suelta', 'regala', 'presta'] },
  coleccion:{ ganar: ['gana', 'compra', 'cambia'],       perder: ['cambia', 'regala', 'pierde'] },
  bloque:   { ganar: ['pica', 'coge', 'encuentra'],      perder: ['coloca', 'gasta', 'regala'] }
};

/* n = neutro para el artículo: f = femenino, m = masculino */
CB.datos.OBJETOS = [
  /* — coleccion — */
  { sing: 'cromo',     plur: 'cromos',     g: 'm', cat: 'coleccion', sprite: '🃏' },
  { sing: 'pegatina',  plur: 'pegatinas',  g: 'f', cat: 'coleccion', sprite: '⭐' },
  { sing: 'canica',    plur: 'canicas',    g: 'f', cat: 'coleccion', sprite: '🔵' },
  { sing: 'ficha',     plur: 'fichas',     g: 'f', cat: 'coleccion', sprite: '🔘' },
  { sing: 'carta',     plur: 'cartas',     g: 'f', cat: 'coleccion', sprite: '🂠' },
  { sing: 'sello',     plur: 'sellos',     g: 'm', cat: 'coleccion', sprite: '🏷' },
  { sing: 'gema',      plur: 'gemas',      g: 'f', cat: 'coleccion', sprite: '💎' },
  { sing: 'dado',      plur: 'dados',      g: 'm', cat: 'coleccion', sprite: '🎲' },

  /* — comida — */
  { sing: 'manzana',   plur: 'manzanas',   g: 'f', cat: 'comida', sprite: '🍎' },
  { sing: 'pera',      plur: 'peras',      g: 'f', cat: 'comida', sprite: '🍐' },
  { sing: 'fresa',     plur: 'fresas',     g: 'f', cat: 'comida', sprite: '🍓' },
  { sing: 'naranja',   plur: 'naranjas',   g: 'f', cat: 'comida', sprite: '🍊' },
  { sing: 'uva',       plur: 'uvas',       g: 'f', cat: 'comida', sprite: '🍇' },
  { sing: 'galleta',   plur: 'galletas',   g: 'f', cat: 'comida', sprite: '🍪' },
  { sing: 'caramelo',  plur: 'caramelos',  g: 'm', cat: 'comida', sprite: '🍬' },
  { sing: 'huevo',     plur: 'huevos',     g: 'm', cat: 'comida', sprite: '🥚' },
  { sing: 'tomate',    plur: 'tomates',    g: 'm', cat: 'comida', sprite: '🍅' },
  { sing: 'zanahoria', plur: 'zanahorias', g: 'f', cat: 'comida', sprite: '🥕' },
  { sing: 'patata',    plur: 'patatas',    g: 'f', cat: 'comida', sprite: '🥔' },
  { sing: 'nuez',      plur: 'nueces',     g: 'f', cat: 'comida', sprite: '🌰' },
  { sing: 'seta',      plur: 'setas',      g: 'f', cat: 'comida', sprite: '🍄' },

  /* — juguete — */
  { sing: 'pelota',    plur: 'pelotas',    g: 'f', cat: 'juguete', sprite: '⚽' },
  { sing: 'coche',     plur: 'coches',     g: 'm', cat: 'juguete', sprite: '🚗' },
  { sing: 'tren',      plur: 'trenes',     g: 'm', cat: 'juguete', sprite: '🚂' },
  { sing: 'barco',     plur: 'barcos',     g: 'm', cat: 'juguete', sprite: '⛵' },
  { sing: 'avión',     plur: 'aviones',    g: 'm', cat: 'juguete', sprite: '✈' },
  { sing: 'globo',     plur: 'globos',     g: 'm', cat: 'juguete', sprite: '🎈' },
  { sing: 'peluche',   plur: 'peluches',   g: 'm', cat: 'juguete', sprite: '🧸' },
  { sing: 'cometa',    plur: 'cometas',    g: 'f', cat: 'juguete', sprite: '🪁' },
  { sing: 'cuerda',    plur: 'cuerdas',    g: 'f', cat: 'juguete', sprite: '🪢' },
  { sing: 'aro',       plur: 'aros',       g: 'm', cat: 'juguete', sprite: '⭕' },
  { sing: 'pala',      plur: 'palas',      g: 'f', cat: 'juguete', sprite: '🥄' },
  { sing: 'cubo',      plur: 'cubos',      g: 'm', cat: 'juguete', sprite: '🪣' },

  /* — escolar — */
  { sing: 'lápiz',     plur: 'lápices',    g: 'm', cat: 'escolar', sprite: '✏' },
  { sing: 'goma',      plur: 'gomas',      g: 'f', cat: 'escolar', sprite: '🧽' },
  { sing: 'libro',     plur: 'libros',     g: 'm', cat: 'escolar', sprite: '📕' },
  { sing: 'cuaderno',  plur: 'cuadernos',  g: 'm', cat: 'escolar', sprite: '📓' },
  { sing: 'regla',     plur: 'reglas',     g: 'f', cat: 'escolar', sprite: '📏' },
  { sing: 'tijera',    plur: 'tijeras',    g: 'f', cat: 'escolar', sprite: '✂' },
  { sing: 'rotulador', plur: 'rotuladores',g: 'm', cat: 'escolar', sprite: '🖊' },
  { sing: 'carpeta',   plur: 'carpetas',   g: 'f', cat: 'escolar', sprite: '📁' },

  /* — natura — */
  { sing: 'hoja',      plur: 'hojas',      g: 'f', cat: 'natura', sprite: '🍂' },
  { sing: 'flor',      plur: 'flores',     g: 'f', cat: 'natura', sprite: '🌼' },
  { sing: 'piedra',    plur: 'piedras',    g: 'f', cat: 'natura', sprite: '🪨' },
  { sing: 'palo',      plur: 'palos',      g: 'm', cat: 'natura', sprite: '🥢' },
  { sing: 'concha',    plur: 'conchas',    g: 'f', cat: 'natura', sprite: '🐚' },
  { sing: 'pluma',     plur: 'plumas',     g: 'f', cat: 'natura', sprite: '🪶' },
  { sing: 'semilla',   plur: 'semillas',   g: 'f', cat: 'natura', sprite: '🌱' },
  { sing: 'bellota',   plur: 'bellotas',   g: 'f', cat: 'natura', sprite: '🌰' },
  { sing: 'estrella',  plur: 'estrellas',  g: 'f', cat: 'natura', sprite: '⭐' },

  /* — animal — */
  { sing: 'pez',       plur: 'peces',      g: 'm', cat: 'animal', sprite: '🐟' },
  { sing: 'pájaro',    plur: 'pájaros',    g: 'm', cat: 'animal', sprite: '🐦' },
  { sing: 'gato',      plur: 'gatos',      g: 'm', cat: 'animal', sprite: '🐱' },
  { sing: 'perro',     plur: 'perros',     g: 'm', cat: 'animal', sprite: '🐶' },
  { sing: 'conejo',    plur: 'conejos',    g: 'm', cat: 'animal', sprite: '🐰' },
  { sing: 'oveja',     plur: 'ovejas',     g: 'f', cat: 'animal', sprite: '🐑' },
  { sing: 'rana',      plur: 'ranas',      g: 'f', cat: 'animal', sprite: '🐸' },
  { sing: 'abeja',     plur: 'abejas',     g: 'f', cat: 'animal', sprite: '🐝' },

  /* — bloque — */
  { sing: 'bloque',    plur: 'bloques',    g: 'm', cat: 'bloque', sprite: '🟫' },
  { sing: 'ladrillo',  plur: 'ladrillos',  g: 'm', cat: 'bloque', sprite: '🧱' }
];

/* Se completan artículo y verbos en tiempo de definición: así el objeto que
   recibe el generador ya lleva todos los campos que declara PLAN §14.1. */
(function () {
  let i, o, v;
  for (i = 0; i < CB.datos.OBJETOS.length; i++) {
    o = CB.datos.OBJETOS[i];
    o.articulo    = (o.g === 'f') ? 'la'  : 'el';
    o.articuloPl  = (o.g === 'f') ? 'las' : 'los';
    o.indef       = (o.g === 'f') ? 'una' : 'un';
    v = CB.datos.VERBOS[o.cat];
    o.verbosGanar  = v.ganar.slice();
    o.verbosPerder = v.perder.slice();
    o.idx = i;
  }
})();
