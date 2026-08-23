/* 2B-modos.js — Los tres modos de juego */

var CB = CB || {};
CB.modos = CB.modos || {};

/* FUENTE ÚNICA de los tres modos: los segundos del reloj, el rótulo que ve el
   niño y las cinco palancas de recompensa. Antes los segundos vivían en
   40-partida.js y los rótulos estaban escritos a mano en 99-arranque.js y en
   41-panel-adulto.js a la vez. Aquí cada número y cada nombre existe una vez.

   LAS RECOMPENSAS NO ENTRAN EN LA FÓRMULA. CB.puntuacion.calcular() sigue sin
   saber que esto existe: la fórmula mide la respuesta y el modo mide el reto
   aceptado, y por eso el antifarmeo de §11.3 —el modo sin reloj no puede ser ni
   el que más puntúa ni el que menos— sigue en pie dentro de calcular(). */
CB.modos.TABLA = {
  facil: {
    etiqueta: 'Fácil', segundos: 0,
    gemaPrimera: 0, rapidezExtra: 0, probCromo: 0.03, probReto: 0.15, bonoFinal: 0
  },
  normal: {
    etiqueta: 'Normal', segundos: 120,
    gemaPrimera: 0, rapidezExtra: 0, probCromo: 0.05, probReto: 0.25, bonoFinal: 0.10
  },
  experto: {
    etiqueta: 'Experto', segundos: 30,
    gemaPrimera: 1, rapidezExtra: 1, probCromo: 0.09, probReto: 0.40, bonoFinal: 0.25
  }
};

/* De menos a más reto. El orden lo consumen la rueda de ajustes, el panel del
   adulto y el guardián que comprueba que ninguna palanca esté del revés. */
CB.modos.ORDEN = ['facil', 'normal', 'experto'];

CB.modos.POR_DEFECTO = 'normal';

/* Las cinco palancas, declaradas. Un guardián que las recorra ve una palanca
   nueva desordenada; uno escrito a mano solo ve las que ya conocía. */
CB.modos.PALANCAS = ['gemaPrimera', 'rapidezExtra', 'probCromo', 'probReto', 'bonoFinal'];

/* Un modo que no existe cae al de por defecto, NUNCA a cero: un límite de cero
   es la salida de accesibilidad y tiene que llegar por decisión, no por
   despiste. */
CB.modos.get = function (id) {
  return CB.modos.TABLA[id] || CB.modos.TABLA[CB.modos.POR_DEFECTO];
};

CB.modos.etiqueta = function (id) {
  return CB.modos.get(id).etiqueta;
};

CB.modos.siguiente = function (id) {
  const i = CB.modos.ORDEN.indexOf(id);
  return CB.modos.ORDEN[(i + 1) % CB.modos.ORDEN.length];
};

/**
 * Milisegundos de cuenta atrás. 0 = sin reloj.
 * @param ajustes opcional: si trae sinLimiteTiempo, apaga el reloj SIN tocar
 *                las recompensas. Es la salida para el niño que no puede jugar
 *                con reloj, y por eso vive en el panel del adulto: la necesidad
 *                y la elección son cosas distintas (WCAG 2.2.1 / EN 301 549).
 */
CB.modos.msDeItem = function (id, ajustes) {
  if (ajustes && ajustes.sinLimiteTiempo) return 0;
  return CB.modos.get(id).segundos * 1000;
};

CB.modos.probCromo = function (id) { return CB.modos.get(id).probCromo; };
CB.modos.probReto  = function (id) { return CB.modos.get(id).probReto; };

/**
 * Gemas EXTRA del modo en un acierto. Se suman a las que ya devuelve
 * CB.puntuacion.calcular(); no las sustituyen.
 * @param estado {correcto, azar, intento}
 */
CB.modos.gemasDeAcierto = function (id, estado) {
  estado = estado || {};
  /* Ni al azar ni en segundo intento: la ventaja del modo premia resolverlo a
     la primera, que es lo que el reto corto de verdad exige. */
  if (!estado.correcto || estado.azar || estado.intento !== 1) return 0;
  return CB.modos.get(id).gemaPrimera;
};

/**
 * Bono de rapidez del modo, sobre el que ya calculó CB.puntuacion.gemasDeRapidez.
 * SOLO SUMA SI EL BASE YA ERA > 0: si no, una respuesta lenta cobraría bono por
 * el hecho de estar en Experto, que es justo lo que esta palanca no debe hacer.
 */
CB.modos.rapidezDe = function (id, bonoBase) {
  const b = (isFinite(bonoBase) && bonoBase > 0) ? bonoBase : 0;
  if (b <= 0) return 0;
  return b + CB.modos.get(id).rapidezExtra;
};

CB.modos.extraBonoFinal = function (id) {
  return CB.modos.TABLA[id] ? CB.modos.TABLA[id].bonoFinal : 0;
};

/* MIGRACIÓN. Una sola regla la ordena: a nadie se le acorta el reloj.
   «Con calma» (30 s, el de por defecto) gana 90 s al pasar a Normal, y el viejo
   «Normal» conserva sus 30 s exactos al pasar a Experto. */
CB.modos.MIGRACION = {
  sinPrisa: 'facil',
  conCalma: 'normal',
  normal: 'experto'
};

/* DOS FUNCIONES Y NO UNA, porque «normal» existe en los dos vocabularios con
   dos significados: era el modo de 30 s y ahora es el de 120. Una sola función
   que intentara ser idempotente y migrar a la vez tenía que elegir, y elegía
   mal en silencio: el niño que jugaba en el viejo «Normal» se quedaba en el
   nuevo Normal —con 90 s de más— y su récord se comparaba contra otro modo.
   Aquí no hace falta idempotencia: el bloque que la llama está detrás de la
   guarda `perfil.version < 3` y por tanto corre una vez. */
CB.modos.migrarDesdeV2 = function (id) {
  return CB.modos.MIGRACION[id] || CB.modos.POR_DEFECTO;
};

/* Defensiva, para leer un ajuste que puede venir de cualquier sitio. No sabe
   nada de la migración: un nombre que no está en la tabla cae al de por defecto. */
CB.modos.normalizar = function (id) {
  return CB.modos.TABLA[id] ? id : CB.modos.POR_DEFECTO;
};
