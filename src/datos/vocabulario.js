/* vocabulario.js — Lista blanca de los enunciados y los 48 términos del */

var CB = CB || {};
CB.datos = CB.datos || {};

/* Los 48 términos del Diccionario de Bloques (6 por nivel × 8 niveles) */
CB.datos.GLOSARIO = [
  /* V1 — Las palabras de la suma */
  { t: 'sumando',    n: 'V1', d: 'Cada uno de los números que se juntan en una suma.' },
  { t: 'suma',       n: 'V1', d: 'El resultado de juntar dos o más números.' },
  { t: 'total',      n: 'V1', d: 'Todo lo que hay cuando se junta.' },
  { t: 'juntar',     n: 'V1', d: 'Poner cosas de dos grupos en uno solo.' },
  { t: 'añadir',     n: 'V1', d: 'Poner más cosas a las que ya había.' },
  { t: 'más',        n: 'V1', d: 'La palabra que avisa de que la cantidad crece.' },

  /* V2 — Las palabras de la resta */
  { t: 'minuendo',   n: 'V2', d: 'El número al que se le quita.', mayores: true },
  { t: 'sustraendo', n: 'V2', d: 'El número que se quita.',       mayores: true },
  { t: 'diferencia', n: 'V2', d: 'Lo que hay de un número a otro.' },
  { t: 'quitar',     n: 'V2', d: 'Sacar cosas de un grupo.' },
  { t: 'quedar',     n: 'V2', d: 'Lo que sobra después de quitar.' },
  { t: 'menos',      n: 'V2', d: 'La palabra que avisa de que la cantidad baja.' },

  /* V3 — Unidades, decenas y centenas */
  { t: 'cifra',      n: 'V3', d: 'Cada uno de los signos con los que se escribe un número.' },
  { t: 'unidad',     n: 'V3', d: 'Una sola cosa. La cifra de la derecha del todo.' },
  { t: 'decena',     n: 'V3', d: 'Un grupo de diez.' },
  { t: 'centena',    n: 'V3', d: 'Un grupo de cien.' },
  { t: 'valor',      n: 'V3', d: 'Lo que vale una cifra según el lugar que ocupa.' },
  { t: 'número',     n: 'V3', d: 'Lo que dice cuántas cosas hay.' },

  /* V4 — Comparar */
  { t: 'mayor que',  n: 'V4', d: 'Que tiene más cantidad.' },
  { t: 'menor que',  n: 'V4', d: 'Que tiene menos cantidad.' },
  { t: 'igual',      n: 'V4', d: 'Que tiene la misma cantidad.' },
  { t: 'anterior',   n: 'V4', d: 'El que va justo antes.' },
  { t: 'siguiente',  n: 'V4', d: 'El que va justo después.' },
  { t: 'comparar',   n: 'V4', d: 'Mirar dos cantidades para ver cuál es mayor.' },

  /* V5 — Orden y posición */
  { t: 'primero',    n: 'V5', d: 'El que va delante de todos.' },
  { t: 'segundo',    n: 'V5', d: 'El que va justo detrás del primero.' },
  { t: 'último',     n: 'V5', d: 'El que va detrás de todos.' },
  { t: 'vigésimo',   n: 'V5', d: 'El que ocupa el lugar veinte.' },
  { t: 'entre',      n: 'V5', d: 'En medio de dos.' },
  { t: 'delante de', n: 'V5', d: 'Justo antes de otro.' },

  /* V6 — Las palabras del dinero */
  { t: 'moneda',     n: 'V6', d: 'Pieza de metal con la que se paga.' },
  { t: 'billete',    n: 'V6', d: 'Papel con el que se paga.' },
  { t: 'euro',       n: 'V6', d: 'El dinero que usamos en España.' },
  { t: 'precio',     n: 'V6', d: 'Lo que cuesta una cosa.' },
  { t: 'cambio',     n: 'V6', d: 'El dinero que devuelven cuando pagas de más.' },
  { t: 'pagar',      n: 'V6', d: 'Dar dinero a cambio de algo.' },

  /* V7 — Veces, doble y mitad */
  { t: 'veces',      n: 'V7', d: 'Cuántas veces se repite una cantidad.' },
  { t: 'doble',      n: 'V7', d: 'Dos veces la misma cantidad.' },
  { t: 'mitad',      n: 'V7', d: 'Una de las dos partes iguales de algo.' },
  { t: 'fila',       n: 'V7', d: 'Cosas puestas una al lado de otra, a lo ancho.' },
  { t: 'columna',    n: 'V7', d: 'Cosas puestas una encima de otra, a lo alto.' },
  { t: 'contar',     n: 'V7', d: 'Decir los números en orden para saber cuántos hay.' },

  /* V8 — Las palabras de los problemas */
  { t: 'en total',   n: 'V8', d: 'Todo junto, sin dejarse nada.' },
  { t: 'le quedan',  n: 'V8', d: 'Lo que tiene después de perder o de dar.' },
  { t: 'más que',    n: 'V8', d: 'Tiene una cantidad mayor que el otro.' },
  { t: 'menos que',  n: 'V8', d: 'Tiene una cantidad menor que el otro.' },
  { t: 'tantos como',n: 'V8', d: 'Tiene la misma cantidad que el otro.' },
  { t: 'cuántos',    n: 'V8', d: 'La palabra con la que se pregunta la cantidad.' }
];

/* Conectores y palabras funcionales del español básico */
CB.datos.FUNCIONALES = [
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'de', 'del', 'a', 'al', 'en', 'con', 'sin', 'por', 'para', 'sobre', 'hasta',
  'y', 'e', 'o', 'u',
  'su', 'sus', 'le', 'les', 'se', 'me', 'te', 'lo',
  'tiene', 'tienen', 'tenía', 'tenían', 'había', 'hay', 'es', 'son', 'está', 'están',
  'queda', 'quedan', 'quedaban', 'falta', 'faltan', 'sobra', 'sobran',
  'ha', 'han', 'ganado', 'perdido', 'igualar', 'quiere', 'quieren', 'color',
  'ahora', 'antes', 'después', 'luego', 'también', 'ya', 'todavía',
  'todos', 'todas', 'cada', 'otro', 'otra', 'otros', 'otras',
  'mismo', 'misma', 'mismos', 'mismas',
  'como', 'que', 'qué', 'cuánto', 'cuánta', 'cuántas',
  'tanto', 'tantas', 'muy', 'poco', 'pocos', 'nada',
  'él', 'ella', 'ellos', 'ellas',
  'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho',
  'nueve', 'diez', 'once', 'doce',
  'ninguno', 'ninguna', 'juntos', 'juntas', 'iguales', 'mismo'
];

/* Construcción de la lista blanca */
CB.datos.LISTA_BLANCA = (function () {
  var set = {}, i, j, o, partes;

  function meter(palabra) {
    if (!palabra) return;
    var p = String(palabra).toLowerCase().trim();
    if (p) set[p] = true;
  }
  function meterFrase(frase) {
    var w = String(frase).toLowerCase().split(/\s+/);
    for (var k = 0; k < w.length; k++) meter(w[k]);
  }

  for (i = 0; i < CB.datos.FUNCIONALES.length; i++) meter(CB.datos.FUNCIONALES[i]);

  for (i = 0; i < CB.datos.GLOSARIO.length; i++) meterFrase(CB.datos.GLOSARIO[i].t);

  if (CB.datos.OBJETOS) {
    for (i = 0; i < CB.datos.OBJETOS.length; i++) {
      o = CB.datos.OBJETOS[i];
      meter(o.sing); meter(o.plur);
      for (j = 0; j < o.verbosGanar.length; j++)  meter(o.verbosGanar[j]);
      for (j = 0; j < o.verbosPerder.length; j++) meter(o.verbosPerder[j]);
    }
  }

  if (CB.datos.NOMBRES_F) {
    for (i = 0; i < CB.datos.NOMBRES_F.length; i++) meter(CB.datos.NOMBRES_F[i]);
    for (i = 0; i < CB.datos.NOMBRES_M.length; i++) meter(CB.datos.NOMBRES_M[i]);
  }

  /* Formas verbales concretas que usan las plantillas y que no salen de las
     listas anteriores. Se declaran una a una: la lista blanca es un contrato. */
  partes = ['reparte', 'reparten', 'cambia', 'cambian', 'gana', 'ganan',
            'pierde', 'pierden', 'compra', 'compran', 'vende', 'venden',
            'recoge', 'recogen', 'coge', 'cogen', 'come', 'comen',
            'regala', 'regalan', 'presta', 'prestan', 'planta', 'plantan',
            'suelta', 'sueltan', 'cuida', 'cuidan', 've', 'ven',
            'pica', 'pican', 'coloca', 'colocan', 'gasta', 'gastan',
            'encuentra', 'encuentran', 'guarda', 'guardan'];
  for (i = 0; i < partes.length; i++) meter(partes[i]);

  return set;
})();

CB.datos.enListaBlanca = function (palabra) {
  return CB.datos.LISTA_BLANCA[String(palabra).toLowerCase()] === true;
};

/* Declaración honesta del origen de la lista, para el panel del adulto y la
   documentación. No se afirma nada que no se pueda sostener. */
CB.datos.ORIGEN_LISTA_BLANCA =
  'Lista blanca propia del proyecto, pendiente de revisión por un maestro de ' +
  'primer ciclo. No procede de ningún corpus de frecuencia léxica infantil.';

CB.datos.ORIGEN_GLOSARIO =
  'Diccionario de Bloques: 48 términos de un glosario propio del proyecto, ' +
  'seleccionado para dar cobertura al criterio de evaluación 6.1 del ' +
  'RD 157/2022 (1.er ciclo). La cifra 48 y la selección son decisiones de este ' +
  'proyecto, no una enumeración oficial.';
