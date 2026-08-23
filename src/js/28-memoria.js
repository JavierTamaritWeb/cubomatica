/* 28-memoria.js — Curva de olvido y los 6 estados de una veta */

var CB = CB || {};
CB.memoria = CB.memoria || {};

CB.memoria.ESTADOS = ['bloqueado', 'nuevo', 'aprendiendo', 'afianzada', 'dominada', 'oxidada'];

CB.memoria.ETIQUETA = {
  bloqueado:   'aún cerrada',
  nuevo:       'sin empezar',
  aprendiendo: 'en marcha',
  afianzada:   'afianzada',
  dominada:    'dominada',
  oxidada:     'con musgo'
};

CB.memoria.ICONO = {
  bloqueado: '🔒', nuevo: '·', aprendiendo: '◔',
  afianzada: '◆', dominada: '💎', oxidada: '🌿'
};

/* R = 2^(-d/S). Blindado contra fechas imposibles y relojes mal puestos. */
CB.memoria.recuperabilidad = function (estado, hoyISO) {
  if (!estado || !estado.ultimoRepasoISO) return 1;
  let d = Math.max(0, CB.util.diasEntre(estado.ultimoRepasoISO, hoyISO));
  if (!isFinite(d)) d = 0;
  const S = Math.max(1, estado.estabilidadDias || 1);
  const r = Math.pow(2, -d / S);
  return isFinite(r) ? CB.util.clamp(r, 0, 1) : 1;
};

/* La estabilidad crece con el acierto y se desploma con el fallo. */
CB.memoria.actualizarEstabilidad = function (estado, acierto) {
  let S = Math.max(1, estado.estabilidadDias || 1);
  if (acierto) {
    S = Math.min(180, S * 1.9 + 0.5);
  } else {
    S = Math.max(1, S * 0.4);
  }
  estado.estabilidadDias = Math.round(S * 10) / 10;
  return estado.estabilidadDias;
};

CB.memoria.clasificar = function (estado, hoyISO, bloqueado) {
  if (bloqueado) return 'bloqueado';
  if (!estado || !estado.n) return 'nuevo';

  const p1 = (estado.aciertosPrimerIntento || 0) / estado.n;
  const R = CB.memoria.recuperabilidad(estado, hoyISO);
  const eraSolida = (estado.estado === 'afianzada' || estado.estado === 'dominada');

  /* Oxidada: era sólida y se ha olvidado. Es el único estado que MIRA ATRÁS. */
  if (eraSolida && R < 0.6) return 'oxidada';

  if (estado.n >= 12 && p1 >= 0.90 && (estado.estabilidadDias || 1) >= 6 && R >= 0.8) {
    return 'dominada';
  }
  if (p1 >= 0.75) return 'afianzada';
  return 'aprendiendo';
};

/* Recalcula y persiste el estado de todas las destrezas del perfil. */
CB.memoria.reclasificarTodo = function (perfil, hoyISO) {
  if (!perfil || !perfil.destrezas) return;
  let k;
  for (k in perfil.destrezas) {
    if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
    perfil.destrezas[k].estado = CB.memoria.clasificar(perfil.destrezas[k], hoyISO, false);
  }
};

/* Destrezas vencidas hoy, ordenadas por recuperabilidad ascendente: primero las
   que más se han olvidado. */
/**
 * Las destrezas que la Cantera pinta con musgo. MISMO PREDICADO que clasificar(),
 * no uno parecido.
 *
 * El saludo del mapa contaba vencidosHoy() —R < 0.7— y lo llamaba «vetas con
 * musgo», pero el musgo se pinta cuando clasificar() dice 'oxidada', que exige
 * además haber estado antes en afianzada o dominada. En la primera semana ninguna
 * destreza ha llegado a afianzada, así que 'oxidada' es imposible mientras
 * vencidosHoy ya cuenta media docena: «Hay 5 vetas con musgo esperándote» y ni
 * una hoja verde en la Cantera. La única razón honesta que este juego se dio para
 * volver mañana era, vista por un niño, una frase que no se correspondía con nada.
 *
 * Se cuentan DESTREZAS, no niveles: son 13 frente a 92, y «hay 24 vetas con
 * musgo» a un niño de 7 años es una deuda, no una invitación.
 *
 * @param bloqueados opcional, mapa de destrezas bloqueadas
 */
CB.memoria.conMusgo = function (perfil, hoyISO, bloqueados) {
  if (!perfil || !perfil.destrezas) return [];
  const lista = [];
  let k;
  for (k in perfil.destrezas) {
    if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
    if (CB.memoria.clasificar(perfil.destrezas[k], hoyISO,
        bloqueados ? !!bloqueados[k] : false) === 'oxidada') {
      lista.push(k);
    }
  }
  return lista;
};

CB.memoria.vencidosHoy = function (perfil, hoyISO) {
  if (!perfil || !perfil.destrezas) return [];
  const lista = [];
  let k, d, R;
  for (k in perfil.destrezas) {
    if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
    d = perfil.destrezas[k];
    if (!d.n) continue;
    R = CB.memoria.recuperabilidad(d, hoyISO);
    if (R < 0.7) lista.push({ destreza: k, R: R });
  }
  lista.sort(function (a, b) { return a.R - b.R; });
  return lista.map(function (x) { return x.destreza; });
};

/* Marca un repaso hecho hoy. */
CB.memoria.repasado = function (estado, acierto, hoyISO) {
  CB.memoria.actualizarEstabilidad(estado, acierto);
  estado.ultimoRepasoISO = hoyISO;
  estado.proximoRepasoISO = CB.util.sumarDias(
    hoyISO, Math.max(1, Math.round(estado.estabilidadDias || 1))
  );
  return estado;
};

/* ¿Hay alguna veta que se acabe de restaurar? Alimenta el logro «Veta
   restaurada», que concede luz. Solo cuenta si han pasado ≥48 h desde el último
   repaso: sin esa condición, el logro se farmearía repasando en bucle. */
CB.memoria.vetaRestaurada = function (estadoAntes, estadoDespues, hoyISO) {
  if (!estadoAntes || estadoAntes !== 'oxidada') return false;
  if (estadoDespues !== 'afianzada' && estadoDespues !== 'dominada') return false;
  return true;
};

CB.memoria.hanPasado48h = function (estado, hoyISO) {
  if (!estado || !estado.ultimoRepasoISO) return true;
  return CB.util.diasEntre(estado.ultimoRepasoISO, hoyISO) >= 2;
};

/* El predicado COMPLETO del logro «Veta restaurada», con la regla de las 48 h
   dentro: 40-partida lo consume y E149 lo mide. repasoAntesISO es la marca
   ANTERIOR al repaso de hoy — repasado() pisa ultimoRepasoISO antes de que
   nadie pregunte, y esa es exactamente la trampa que dejo la regla sin
   escribir desde su nacimiento hasta 3.4.5. */
CB.memoria.vetaConLuz = function (estadoAntes, estadoDespues, repasoAntesISO, hoyISO) {
  return CB.memoria.vetaRestaurada(estadoAntes, estadoDespues, hoyISO) &&
         CB.memoria.hanPasado48h({ ultimoRepasoISO: repasoAntesISO }, hoyISO);
};
