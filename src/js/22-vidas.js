/* 22-vidas.js — Requisitos 9 y 10: las 3 luces del casco y las luces extra */

var CB = CB || {};
CB.vidas = CB.vidas || {};

CB.vidas.INICIALES = 3;
CB.vidas.TOPE = 5;
CB.vidas.RESERVA_MAX = 2;
CB.vidas.MAX_CONCEDIDAS_PARTIDA = 2;
CB.vidas.TIMEOUTS_CAMBIA_MODO = 3;   // consecutivos
CB.vidas.TIMEOUTS_FIN = 6;           // en la partida

CB.vidas.tope = function () { return CB.vidas.TOPE; };

CB.vidas.nuevoEstado = function (reserva) {
  var r = Math.max(0, Math.min(CB.vidas.RESERVA_MAX, reserva || 0));
  var luces = CB.vidas.INICIALES + r;
  if (luces > CB.vidas.TOPE) luces = CB.vidas.TOPE;
  return {
    luces: luces,
    reserva: 0,                    // la reserva se consume al empezar
    reservaAplicada: r,
    concedidasPartida: 0,
    timeoutsConsecutivos: 0,
    timeoutsPartida: 0,
    vueltaAlPozoCobrada: false,
    aciertosDesdeApagon: 0,
    huboApagon: false
  };
};

CB.vidas.estado = function (est) {
  return {
    luces: est ? est.luces : CB.vidas.INICIALES,
    tope: CB.vidas.TOPE,
    reserva: est ? est.reserva : 0
  };
};

/**
 * Fallo de un ítem.
 * @param est     estado de luces de la partida
 * @param intento 1 = primer fallo, 2 = fallo tras la tarjeta de reparación
 * @param modo    'expedicion' | 'tranquila' | 'jefe'
 */
CB.vidas.fallo = function (est, intento, modo) {
  /* En Cantera Tranquila no hay luces: no se puede perder (§3.8). */
  if (modo === 'tranquila') {
    /* Reparación INMEDIATA tras el primer fallo, sin segundo intento a ciegas. */
    return { luces: est.luces, intento: intento,
             abrePista: false, abreReparacion: true, apagada: false };
  }

  /* Durante el combate de jefe, el fallo NO apaga luces: solo repara un bloque de la armadura y alarga el combate. */
  if (modo === 'jefe') {
    return { luces: est.luces, intento: intento,
             abrePista: false, abreReparacion: false, apagada: false };
  }

  if (intento === 1) {

    return { luces: est.luces, intento: 1,
             abrePista: true, abreReparacion: false, apagada: false };
  }

  /* Segundo fallo, tras la tarjeta de reparación: aquí y solo aquí. */
  est.luces = Math.max(0, est.luces - 1);
  est.huboApagon = true;
  est.aciertosDesdeApagon = 0;
  return { luces: est.luces, intento: 2,
           abrePista: false, abreReparacion: false, apagada: true };
};

/* Tiempo agotado. NUNCA apaga luz. Ni el primero, ni ninguno. */
CB.vidas.timeout = function (est) {
  est.timeoutsConsecutivos = (est.timeoutsConsecutivos || 0) + 1;
  est.timeoutsPartida = (est.timeoutsPartida || 0) + 1;

  var cambiaModo = est.timeoutsConsecutivos >= CB.vidas.TIMEOUTS_CAMBIA_MODO;
  var finAmable  = est.timeoutsPartida >= CB.vidas.TIMEOUTS_FIN;

  return {
    luces: est.luces,                 // SIN CAMBIO
    consecutivos: est.timeoutsConsecutivos,
    cambiaModo: cambiaModo,
    avisoCambioModo: cambiaModo ? 'Vamos con más calma' : null,
    finAmable: finAmable,
    motivoFin: finAmable ? 'pausa' : null
  };
};

CB.vidas.reiniciarTimeouts = function (est) { est.timeoutsConsecutivos = 0; };

/* Azar detectado. NUNCA apaga luz. */
CB.vidas.azar = function (est) {
  return {
    luces: est.luces,                 // SIN CAMBIO
    efectos: ['sinBono', 'confirmacion', 'bloqueo1200']
  };
};

/* Acierto: alimenta el contador de «Vuelta al pozo». */
CB.vidas.acierto = function (est, primerIntento) {
  CB.vidas.reiniciarTimeouts(est);
  if (est.huboApagon && primerIntento) {
    est.aciertosDesdeApagon = (est.aciertosDesdeApagon || 0) + 1;
  } else if (!primerIntento) {
    est.aciertosDesdeApagon = 0;
  }
  return est.aciertosDesdeApagon;
};

CB.vidas.fallaRacha = function (est) { est.aciertosDesdeApagon = 0; };

/**
 * Concede una luz extra. Requisito 10.
 * @param motivo 'vuelta_al_pozo' | 'veta_restaurada' | 'reto_bonus'
 * @param perfil para volcar el exceso a vidasReserva
 */
CB.vidas.conceder = function (est, motivo, perfil, modo) {
  /* En Cantera Tranquila no hay luces, luego no hay luces extra (§12.7). */
  if (modo === 'tranquila') {
    return { aplicada: false, guardada: false, reserva: perfil ? (perfil.vidasReserva || 0) : 0,
             motivoRechazo: 'modo_tranquila' };
  }
  if (est.concedidasPartida >= CB.vidas.MAX_CONCEDIDAS_PARTIDA) {
    return { aplicada: false, guardada: false, reserva: perfil ? (perfil.vidasReserva || 0) : 0,
             motivoRechazo: 'tope_partida' };
  }
  if (motivo === 'vuelta_al_pozo') {
    if (est.vueltaAlPozoCobrada) {
      return { aplicada: false, guardada: false, reserva: perfil ? (perfil.vidasReserva || 0) : 0,
               motivoRechazo: 'ya_cobrado' };
    }
    est.vueltaAlPozoCobrada = true;
  }

  est.concedidasPartida++;

  if (est.luces < CB.vidas.TOPE) {
    est.luces++;
    return { aplicada: true, guardada: false, reserva: perfil ? (perfil.vidasReserva || 0) : 0,
             luces: est.luces, celebracionMs: 1500, texto: '¡Luz extra!' };
  }

  /* Al tope: se guarda para la próxima expedición. NUNCA se convierte en gemas. */
  if (perfil) {
    perfil.vidasReserva = Math.min(CB.vidas.RESERVA_MAX, (perfil.vidasReserva || 0) + 1);
  }
  est.reserva = perfil ? perfil.vidasReserva : 1;
  return { aplicada: false, guardada: true, reserva: est.reserva, luces: est.luces,
           celebracionMs: 1500, texto: 'Guardas 1 luz para la próxima expedición' };
};

/* ¿Se ha acabado la expedición por luces? */
CB.vidas.agotadas = function (est) { return est.luces <= 0; };

/* Precedencia de los finales de partida (§3.6). Menor número = mayor prioridad. */
CB.vidas.PRECEDENCIA_FIN = {
  limiteSesion: 1,
  luces: 2,
  guion: 3,
  salida: 4,
  pausa: 5
};
