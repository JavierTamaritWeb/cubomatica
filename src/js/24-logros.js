/* 24-logros.js — Requisito 10: vidas extra por logros bonus */

var CB = CB || {};
CB.logros = CB.logros || {};

CB.logros.LISTA = [
  /* Los 3 que conceden luz (requisito 10) */
  { id: 'vuelta_al_pozo', version: 1, luz: true,
    nombre: 'Vuelta al pozo',
    desc: '3 aciertos seguidos a primer intento después de que se apagara una luz.',
    evento: 'acierto' },

  { id: 'veta_restaurada', version: 1, luz: true,
    nombre: 'Veta restaurada',
    desc: 'Has quitado el musgo de una veta que se había olvidado.',
    evento: 'destreza' },

  { id: 'reto_bonus', version: 1, luz: true,
    nombre: 'Reto bonus superado',
    desc: 'Has acertado el reto marcado del nivel.',
    evento: 'acierto' },

  /* Los otros 7 de v1 */
  { id: 'vena_de_cristal', version: 1, luz: false,
    nombre: 'Vena de cristal',
    desc: '10 aciertos seguidos a primer intento.',
    evento: 'acierto' },

  { id: 'primer_pico', version: 1, luz: false,
    nombre: 'Primer pico',
    desc: 'Has terminado tu primera expedición.',
    evento: 'finPartida' },

  { id: 'cantero', version: 1, luz: false,
    nombre: 'Cantero',
    desc: 'Has completado los niveles nucleares de un mundo.',
    evento: 'finPartida' },

  { id: 'guardian_del_bloque', version: 1, luz: false,
    nombre: 'Guardián del bloque',
    desc: 'Has superado a un jefe.',
    evento: 'jefe' },

  { id: 'coleccionista', version: 1, luz: false,
    nombre: 'Coleccionista',
    desc: 'Has reunido 5 cromos.',
    evento: 'cromo', enTranquila: true },

  { id: 'palabra_de_piedra', version: 1, luz: false,
    nombre: 'Palabra de piedra',
    desc: 'Has añadido 10 términos al Diccionario de Bloques.',
    evento: 'glosario', enTranquila: true },

  { id: 'vuelvo_manana', version: 1, luz: false,
    nombre: 'Vuelvo mañana',
    desc: 'Has jugado 2 días distintos separados por al menos un día.',
    evento: 'finPartida' },

  /* Los 14 de v2: reserva DECLARADA, no evaluada */
  { id: 'mina_profunda',   version: 2, luz: false, nombre: 'Mina profunda',   desc: 'Reservado para la versión 2.' },
  { id: 'reloj_de_piedra', version: 2, luz: false, nombre: 'Reloj de piedra', desc: 'Reservado para la versión 2.' },
  { id: 'sin_una_grieta',  version: 2, luz: false, nombre: 'Sin una grieta',  desc: 'Reservado para la versión 2.' },
  { id: 'explorador',      version: 2, luz: false, nombre: 'Explorador',      desc: 'Reservado para la versión 2.' },
  { id: 'arquitecto',      version: 2, luz: false, nombre: 'Arquitecto',      desc: 'Reservado para la versión 2.' },
  { id: 'cambista',        version: 2, luz: false, nombre: 'Cambista',        desc: 'Reservado para la versión 2.' },
  { id: 'lector_de_rocas', version: 2, luz: false, nombre: 'Lector de rocas', desc: 'Reservado para la versión 2.' },
  { id: 'nueve_vetas',     version: 2, luz: false, nombre: 'Nueve vetas',     desc: 'Reservado para la versión 2.' },
  { id: 'pico_de_oro',     version: 2, luz: false, nombre: 'Pico de oro',     desc: 'Reservado para la versión 2.' },
  { id: 'repaso_de_verano',version: 2, luz: false, nombre: 'Repaso de verano',desc: 'Reservado para la versión 2.' },
  { id: 'constructor',     version: 2, luz: false, nombre: 'Constructor',     desc: 'Reservado para la versión 2.' },
  { id: 'amigo_de_blopi',  version: 2, luz: false, nombre: 'Amigo de Blopi',  desc: 'Reservado para la versión 2.' },
  { id: 'vagoneta_llena',  version: 2, luz: false, nombre: 'Vagoneta llena',  desc: 'Reservado para la versión 2.' },
  { id: 'maestro_cantero', version: 2, luz: false, nombre: 'Maestro cantero', desc: 'Reservado para la versión 2.' }
];

CB.logros.V1 = CB.logros.LISTA.filter(function (l) { return l.version === 1; });
CB.logros.CONCEDEN_LUZ = CB.logros.LISTA.filter(function (l) { return l.luz; })
                                        .map(function (l) { return l.id; });

CB.logros.get = function (id) {
  var i;
  for (i = 0; i < CB.logros.LISTA.length; i++) {
    if (CB.logros.LISTA[i].id === id) return CB.logros.LISTA[i];
  }
  return null;
};

CB.logros.yaTiene = function (perfil, id) {
  return !!(perfil && perfil.logros && perfil.logros[id] && perfil.logros[id].cobrado);
};

CB.logros.otorgar = function (perfil, id, hoyISO, progreso) {
  if (!perfil.logros) perfil.logros = {};
  if (perfil.logros[id] && perfil.logros[id].cobrado) return null;
  perfil.logros[id] = { desbloqueadoISO: hoyISO, progreso: progreso || 1, cobrado: true };
  return CB.logros.get(id);
};

/**
 * Comprueba qué logros se desbloquean con este evento.
 * @param evento 'acierto' | 'finPartida' | 'jefe' | 'cromo' | 'glosario' | 'destreza'
 * @param ctx    {perfil, estadoLuces, modo, rachaPrimerIntento, esRetoBonus,
 *                vetaRestaurada, jefeSuperado, mundoCompletado, hoyISO}
 * @return [logro] recién desbloqueados
 */
CB.logros.comprobar = function (evento, ctx) {
  var out = [], p = ctx.perfil, hoy = ctx.hoyISO;
  if (!p) return out;

  /* En Cantera Tranquila solo se evalúan los de colección (§12.8). */
  var soloColeccion = (ctx.modo === 'tranquila');

  function intenta(id, condicion, progreso) {
    var l = CB.logros.get(id);
    if (!l || l.version !== 1) return;
    if (soloColeccion && !l.enTranquila) return;
    if (CB.logros.yaTiene(p, id)) return;
    if (!condicion) return;
    var otorgado = CB.logros.otorgar(p, id, hoy, progreso);
    if (otorgado) out.push(otorgado);
  }

  if (evento === 'acierto') {
    intenta('vuelta_al_pozo',
      ctx.estadoLuces && ctx.estadoLuces.huboApagon &&
      ctx.estadoLuces.aciertosDesdeApagon >= 3, 3);

    intenta('vena_de_cristal', (ctx.rachaPrimerIntento || 0) >= 10, 10);

    intenta('reto_bonus', !!ctx.esRetoBonus, 1);
  }

  if (evento === 'destreza') {
    intenta('veta_restaurada', !!ctx.vetaRestaurada, 1);
  }

  if (evento === 'jefe') {
    intenta('guardian_del_bloque', !!ctx.jefeSuperado, 1);
  }

  if (evento === 'cromo') {
    intenta('coleccionista', (p.cromos || []).length >= 5, (p.cromos || []).length);
  }

  if (evento === 'glosario') {
    intenta('palabra_de_piedra', (p.glosario || []).length >= 10, (p.glosario || []).length);
  }

  if (evento === 'finPartida') {
    intenta('primer_pico', (p.historial || []).length >= 1, 1);
    intenta('cantero', !!ctx.mundoCompletado, 1);

    var dias = (p.diario && p.diario.diasJugados) ? p.diario.diasJugados : [];
    var dosDias = false;
    if (dias.length >= 2) {
      dosDias = CB.util.diasEntre(dias[0], dias[dias.length - 1]) >= 1;
    }
    intenta('vuelvo_manana', dosDias, dias.length);
  }

  return out;
};

/* De los recién desbloqueados, ¿cuáles conceden luz? */
CB.logros.filtrarConLuz = function (lista) {
  return (lista || []).filter(function (l) { return l && l.luz; });
};
