/* ============================================================================
   01-almacen.js — Persistencia. ÚNICO fichero con literales 'cubomatica.…'
   ----------------------------------------------------------------------------
   Adaptador de plataforma declarado: puede tocar localStorage (§14.4).

   LA VERSIÓN VA EN EL OBJETO, NUNCA EN LA CLAVE (PLAN §15.1). El plan v1 la
   ponía en las dos: en cuanto migrar() dejase el objeto en version:2, o se
   seguía escribiendo bajo `.v1.` (y la clave mentía) o se escribía en `.v2.` y
   quedaban HUÉRFANOS el índice y ultimoPerfil → pérdida silenciosa de todo el
   progreso en la primera migración. Justo el caso que el «test obligatorio»
   decía cubrir y que el esquema hacía imposible aprobar.

   REGLA AÑADIDA (§15.4): este fichero NO puede referenciar ningún CB.* salvo
   CB.util. El plan v1 llamaba desde aquí a CB.plantillas.esqueletoVacio(), que
   no existe, desde un script que carga 13 ficheros ANTES que el generador de
   problemas → TypeError, y el perfil no cargaba NUNCA.
   ========================================================================== */

var CB = CB || {};
CB.almacen = CB.almacen || {};

CB.almacen.VERSION_ESQUEMA = 2;
CB.almacen.PREFIJO = 'cubomatica.';
CB.almacen.memoria = {};          // respaldo si localStorage está bloqueado
CB.almacen.sinDisco = false;
CB.almacen.incidenciasNoFinito = 0;

CB.almacen.claveDePerfil = function (id) { return 'cubomatica.perfil.' + id; };
CB.almacen.CLAVE_INDICE = 'cubomatica.perfiles.indice';
CB.almacen.CLAVE_ULTIMO = 'cubomatica.ultimoPerfil';
CB.almacen.CLAVE_AJUSTES = 'cubomatica.ajustes';
CB.almacen.CLAVE_ESQUEMA = 'cubomatica.esquema';

CB.almacen.TOPES = {
  domestico: { respuestas: 800, historial: 60, perfiles: 4 },
  aula:      { respuestas: 150, historial: 20, perfiles: 30 }
};

/* ── Acceso crudo, con respaldo en memoria ──────────────────────────────── */
function ls() {
  try {
    if (typeof localStorage === 'undefined') return null;
    localStorage.setItem('cubomatica.__t', '1');
    localStorage.removeItem('cubomatica.__t');
    return localStorage;
  } catch (e) { return null; }
}

CB.almacen.disponible = function () { return ls() !== null; };

/* sanear: NaN e Infinity → 0. Sin esto, JSON.stringify convierte NaN en null y
   a partir de ahí toda la aritmética del perfil da NaN para siempre (§11.2). */
CB.almacen.sanear = function (obj) {
  var vistos = [];
  function limpia(v) {
    if (typeof v === 'number') {
      if (!isFinite(v)) { CB.almacen.incidenciasNoFinito++; return 0; }
      return v;
    }
    if (v && typeof v === 'object') {
      if (vistos.indexOf(v) !== -1) return null;
      vistos.push(v);
      if (Object.prototype.toString.call(v) === '[object Array]') {
        return v.map(limpia);
      }
      var out = {}, k;
      for (k in v) {
        if (!Object.prototype.hasOwnProperty.call(v, k)) continue;
        if (k.charAt(0) === '_') continue;        // campos internos, no se guardan
        out[k] = limpia(v[k]);
      }
      return out;
    }
    return v;
  }
  return limpia(obj);
};

CB.almacen.leerCrudo = function (clave) {
  var s = ls();
  var txt = s ? s.getItem(clave) : null;
  if (txt == null && CB.almacen.memoria[clave] != null) return CB.almacen.memoria[clave];
  if (txt == null) return null;
  try { return JSON.parse(txt); } catch (e) { return null; }
};

/* Escritura en DOS FASES: el niño cierra la tapa del portátil a mitad de
   guardado y el JSON queda truncado. Se escribe en .tmp, se verifica con
   JSON.parse, y solo entonces se pisa la clave buena. */
CB.almacen.escribir = function (clave, obj) {
  var limpio = CB.almacen.sanear(obj);
  var s;
  try { s = JSON.stringify(limpio); } catch (e) { return false; }

  var store = ls();
  if (!store) {
    CB.almacen.memoria[clave] = limpio;
    CB.almacen.sinDisco = true;
    return false;
  }
  try {
    store.setItem(clave + '.tmp', s);
    JSON.parse(store.getItem(clave + '.tmp'));      // verificación real
    store.setItem(clave, s);
    store.removeItem(clave + '.tmp');
    return true;
  } catch (e) {
    if (e && e.name === 'QuotaExceededError') {
      /* Poda agresiva y UN reintento. Con el respaldo en memoria a secas, en
         modo aula la clase entera dejaría de guardar sin que nadie se entere
         hasta el día siguiente (§15.6). */
      if (obj && obj.id) CB.almacen.podar(obj, { agresiva: true });
      try {
        store.setItem(clave, JSON.stringify(CB.almacen.sanear(obj)));
        return true;
      } catch (e2) { /* cae al respaldo */ }
    }
    CB.almacen.memoria[clave] = limpio;
    CB.almacen.sinDisco = true;
    return false;
  }
};

CB.almacen.borrar = function (clave) {
  var s = ls();
  if (s) { try { s.removeItem(clave); s.removeItem(clave + '.tmp'); } catch (e) { } }
  delete CB.almacen.memoria[clave];
};

/* ── Ajustes del APARATO (solo lo físico) ───────────────────────────────── */
CB.almacen.ajustesDispositivo = function () {
  var a = CB.almacen.leerCrudo(CB.almacen.CLAVE_AJUSTES);
  if (!a) {
    a = { volumen: 0.7, silencio: false, modoAula: false, modoProyeccion: false,
          nivelMusica: 2 };
  }
  /* nivelMusica es índice en CB.musica.NIVELES; llegó después que el resto, así
     que un perfil guardado antes NO lo tiene y hay que darle el valor por
     defecto aquí, no en quien lo lee. */
  if (a.nivelMusica == null) a.nivelMusica = 2;
  return a;
};
CB.almacen.guardarAjustesDispositivo = function (a) {
  return CB.almacen.escribir(CB.almacen.CLAVE_AJUSTES, a);
};

/* ── Índice de perfiles ─────────────────────────────────────────────────── */
CB.almacen.indice = function () {
  var i = CB.almacen.leerCrudo(CB.almacen.CLAVE_INDICE);
  return (i && i.length != null) ? i : [];
};
CB.almacen.guardarIndice = function (idx) {
  return CB.almacen.escribir(CB.almacen.CLAVE_INDICE, idx);
};
CB.almacen.ultimoPerfil = function () {
  return CB.almacen.leerCrudo(CB.almacen.CLAVE_ULTIMO);
};
CB.almacen.fijarUltimoPerfil = function (id) {
  return CB.almacen.escribir(CB.almacen.CLAVE_ULTIMO, id);
};

/* ── Esqueleto de problemas: array literal LOCAL, sin dependencias ──────── */
CB.almacen.ESQUELETO_PROBLEMAS = function () {
  var subtipos = ['CAMBIO_1', 'CAMBIO_2', 'CAMBIO_3', 'CAMBIO_4', 'CAMBIO_5', 'CAMBIO_6',
                  'COMBINACION_1', 'COMBINACION_2',
                  'COMPARACION_1', 'COMPARACION_2', 'COMPARACION_3', 'COMPARACION_4',
                  'COMPARACION_5', 'COMPARACION_6',
                  'IGUALACION_1', 'IGUALACION_2', 'IGUALACION_3', 'IGUALACION_4',
                  'IGUALACION_5', 'IGUALACION_6'];
  var o = {}, i;
  for (i = 0; i < subtipos.length; i++) {
    o[subtipos[i]] = { intentos: 0, aciertos: 0, rtMedioMs: 0 };
  }
  return o;
};

/* ── Perfil nuevo ───────────────────────────────────────────────────────── */
CB.almacen.perfilNuevo = function (id, mote, avatar, hoyISO, ajustesPrevios) {
  return {
    version: CB.almacen.VERSION_ESQUEMA,
    id: id, mote: mote, avatar: avatar, colorBloque: '#5AA02C',
    creadoISO: hoyISO,
    trimestreDeducido: 1,
    calibrado: false,
    grupo: null,
    ajustes: ajustesPrevios || {
      modoTiempo: 'conCalma',        // por defecto PERMANENTE (§11.3)
      voz: true, letraGrande: false, altoContraste: false, reduceMotion: 'auto',
      tablas69: false, centimos: false, restasDobleLlevada: false, division: false,
      limiteSesionMin: 20, noPuntuarVelocidadProblemas: false
    },
    gemas: 0, puntosTotales: 0,
    mejorPuntuacion: { normal: 0, conCalma: 0, sinPrisa: 0 },
    vidasReserva: 0,
    componentesVistos: [],
    destrezas: {}, niveles: {},
    problemas: CB.almacen.ESQUELETO_PROBLEMAS(),
    errores: {}, items: {},
    mundos: { M1: { desbloqueado: true, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false },
              M2: { desbloqueado: false, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false },
              M3: { desbloqueado: false, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false },
              M4: { desbloqueado: false, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false } },
    logros: {}, cromos: [], glosario: [],
    mensajes: { acierto: { bolsaA: [], bolsaB: [], bolsaC: [], bolsaD: [], ultimos12: [] },
                animo: { bolsa1: [], bolsa2: [], ultimos10: [] } },
    bolsasProblemas: { genero: [], nombreF: [], nombreM: [], rol: [], objeto: [] },
    diario: { diasJugados: [], racha: 0, mejorRacha: 0, segundosHoy: 0,
              ultimoDia: null, tiempoPantallaPorDia: {} },
    animo: [],
    partidaEnCurso: null,
    historial: [],
    respuestas: []
  };
};

/* Conserva lo que se pueda de un perfil roto. Nunca se devuelve al niño a cero
   sin motivo: sus gemas, sus logros y sus cromos son suyos. */
CB.almacen.perfilNuevoDesdeRestos = function (roto) {
  var hoy = CB.util.hoyISO();
  var p = CB.almacen.perfilNuevo(
    (roto && roto.id) || ('p-' + CB.util.hash32(hoy).toString(16)),
    (roto && roto.mote) || 'Topo Cavador',
    (roto && roto.avatar) || 0, hoy, null
  );
  if (roto) {
    if (isFinite(roto.gemas)) p.gemas = roto.gemas;
    if (isFinite(roto.puntosTotales)) p.puntosTotales = roto.puntosTotales;
    if (roto.logros) p.logros = roto.logros;
    if (roto.cromos) p.cromos = roto.cromos;
    if (roto.glosario) p.glosario = roto.glosario;
  }
  p.recuperado = true;
  return p;
};

/* ── Migración: cada paso AÑADE campos. JAMÁS BORRA ─────────────────────── */
CB.almacen.migrar = function (perfil) {
  try {
    if (!perfil.version) perfil.version = 1;

    if (perfil.version < 2) {
      perfil.problemas = perfil.problemas || CB.almacen.ESQUELETO_PROBLEMAS();

      var ds = perfil.destrezas || (perfil.destrezas = {});
      Object.keys(ds).forEach(function (k) {
        if (ds[k].estabilidadDias == null) ds[k].estabilidadDias = 1;
        if (ds[k].estado == null) ds[k].estado = 'nuevo';
        if (ds[k].rtMuestras == null) ds[k].rtMuestras = [];
        if (ds[k].ventana10 == null) ds[k].ventana10 = [];
      });

      if (!perfil.niveles) perfil.niveles = {};
      if (!perfil.mundos) {
        perfil.mundos = { M1: { desbloqueado: true, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false } };
      }
      if (!perfil.mensajes) {
        perfil.mensajes = { acierto: { bolsaA: [], bolsaB: [], bolsaC: [], bolsaD: [], ultimos12: [] },
                            animo: { bolsa1: [], bolsa2: [], ultimos10: [] } };
      }
      if (!perfil.bolsasProblemas) {
        perfil.bolsasProblemas = { genero: [], nombreF: [], nombreM: [], rol: [], objeto: [] };
      }
      if (perfil.vidasReserva == null) perfil.vidasReserva = 0;
      if (!perfil.componentesVistos) perfil.componentesVistos = [];
      if (!perfil.animo) perfil.animo = [];
      if (perfil.partidaEnCurso === undefined) perfil.partidaEnCurso = null;

      if (perfil.historial) {
        perfil.historial.forEach(function (h) {
          if (h.precision != null) {
            h.precision1er = h.precision;
            h.precisionTotal = h.preguntas ? (h.aciertos / h.preguntas) : 0;
          }
        });
      }
      if (typeof perfil.mejorPuntuacion === 'number') {
        perfil.mejorPuntuacion = { normal: perfil.mejorPuntuacion, conCalma: 0, sinPrisa: 0 };
      }
      if (!perfil.mejorPuntuacion) {
        perfil.mejorPuntuacion = { normal: 0, conCalma: 0, sinPrisa: 0 };
      }
      perfil.version = 2;
    }

    CB.almacen.recortarFechasFuturas(perfil);
    return perfil;
  } catch (e) {
    return CB.almacen.perfilNuevoDesdeRestos(perfil);
  }
};

/* Reloj del dispositivo mal puesto: se recorta a hoy en lugar de romper la
   racha o producir días negativos (§15.5). */
CB.almacen.recortarFechasFuturas = function (perfil) {
  var hoy = CB.util.hoyISO(), k, d;
  function recorta(iso) {
    if (!CB.util.esISO(iso)) return iso;
    return (CB.util.diasEntre(iso, hoy) < 0) ? hoy : iso;
  }
  if (perfil.creadoISO) perfil.creadoISO = recorta(perfil.creadoISO);
  if (perfil.destrezas) {
    for (k in perfil.destrezas) {
      if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
      d = perfil.destrezas[k];
      if (d.ultimoRepasoISO) d.ultimoRepasoISO = recorta(d.ultimoRepasoISO);
    }
  }
  if (perfil.diario && perfil.diario.diasJugados) {
    perfil.diario.diasJugados = perfil.diario.diasJugados
      .map(recorta)
      .filter(function (v, i, a) { return a.indexOf(v) === i; })
      .sort();
  }
  return perfil;
};

/* ── Leer y guardar perfil ──────────────────────────────────────────────── */
CB.almacen.leerPerfil = function (id) {
  var p = CB.almacen.leerCrudo(CB.almacen.claveDePerfil(id));
  if (!p) return null;
  /* Perfil más nuevo que el juego: mejor no cargar que corromper. */
  if (p.version > CB.almacen.VERSION_ESQUEMA) {
    return { error: 'perfil-mas-nuevo',
             mensaje: 'Este perfil viene de una versión más nueva del juego. ' +
                      'Actualiza el juego o usa otra copia.' };
  }
  return CB.almacen.migrar(p);
};

CB.almacen.guardarPerfil = function (perfil) {
  if (!perfil || !perfil.id) return false;
  var ok = CB.almacen.escribir(CB.almacen.claveDePerfil(perfil.id), perfil);
  var idx = CB.almacen.indice(), i, hallado = false;
  for (i = 0; i < idx.length; i++) {
    if (idx[i].id === perfil.id) {
      idx[i].mote = perfil.mote; idx[i].avatar = perfil.avatar;
      idx[i].ultimoISO = CB.util.hoyISO();
      hallado = true;
    }
  }
  if (!hallado) {
    idx.push({ id: perfil.id, mote: perfil.mote, avatar: perfil.avatar,
               ultimoISO: CB.util.hoyISO() });
  }
  CB.almacen.guardarIndice(idx);
  return ok;
};

CB.almacen.borrarPerfil = function (id) {
  CB.almacen.borrar(CB.almacen.claveDePerfil(id));
  var idx = CB.almacen.indice().filter(function (e) { return e.id !== id; });
  CB.almacen.guardarIndice(idx);
  if (CB.almacen.ultimoPerfil() === id) {
    CB.almacen.fijarUltimoPerfil(idx.length ? idx[0].id : null);
  }
};

/* ── Poda ───────────────────────────────────────────────────────────────── */
CB.almacen.podar = function (perfil, opciones) {
  opciones = opciones || {};
  var aula = CB.almacen.ajustesDispositivo().modoAula;
  var t = aula ? CB.almacen.TOPES.aula : CB.almacen.TOPES.domestico;
  var factor = opciones.agresiva ? 0.5 : 1;
  var k, d;

  if (perfil.respuestas && perfil.respuestas.length > t.respuestas * factor) {
    perfil.respuestas = perfil.respuestas.slice(-Math.floor(t.respuestas * factor));
  }
  if (perfil.historial && perfil.historial.length > t.historial * factor) {
    perfil.historial = perfil.historial.slice(-Math.floor(t.historial * factor));
  }
  if (perfil.diario) {
    if (perfil.diario.diasJugados && perfil.diario.diasJugados.length > 120) {
      perfil.diario.diasJugados = perfil.diario.diasJugados.slice(-120);
    }
    if (perfil.diario.tiempoPantallaPorDia) {
      var dias = Object.keys(perfil.diario.tiempoPantallaPorDia).sort();
      while (dias.length > 120) delete perfil.diario.tiempoPantallaPorDia[dias.shift()];
    }
  }
  if (perfil.errores) {
    for (k in perfil.errores) {
      if (!Object.prototype.hasOwnProperty.call(perfil.errores, k)) continue;
      if (perfil.errores[k].ejemplos && perfil.errores[k].ejemplos.length > 3) {
        perfil.errores[k].ejemplos.length = 3;
      }
    }
  }
  if (perfil.destrezas) {
    for (k in perfil.destrezas) {
      if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
      d = perfil.destrezas[k];
      if (d.rtMuestras && d.rtMuestras.length > 12) d.rtMuestras = d.rtMuestras.slice(-12);
      if (d.ejemplosFallados && d.ejemplosFallados.length > 3) d.ejemplosFallados.length = 3;
    }
  }
  if (perfil.items) {
    var claves = Object.keys(perfil.items);
    while (claves.length > 400) delete perfil.items[claves.shift()];
  }
  return perfil;
};

/* ── Exportar e importar CON VALIDACIÓN ─────────────────────────────────────
   Aceptar JSON arbitrario y volcarlo al DOM es la ÚNICA superficie de ataque
   que existe en este proyecto, y en v1 estaba abierta: un fichero manipulado
   podía traer `mote` con HTML, `colorBloque` con una cadena que se inyecta en un
   style, arrays de 500.000 entradas o version:99. */
CB.almacen.CAMPOS_PERMITIDOS = [
  'version', 'id', 'mote', 'avatar', 'colorBloque', 'creadoISO', 'trimestreDeducido',
  'calibrado', 'grupo', 'ajustes', 'gemas', 'puntosTotales', 'mejorPuntuacion',
  'vidasReserva', 'componentesVistos', 'destrezas', 'niveles', 'problemas',
  'errores', 'items', 'mundos', 'logros', 'cromos', 'glosario', 'mensajes',
  'bolsasProblemas', 'diario', 'animo', 'partidaEnCurso', 'historial', 'respuestas'
];

CB.almacen.exportar = function (perfil) {
  return JSON.stringify(CB.almacen.sanear(perfil), null, 1);
};

CB.almacen.validarImportado = function (crudo, motesValidos) {
  if (!crudo || typeof crudo !== 'object') return { ok: false, motivo: 'formato' };
  if (isFinite(crudo.version) && crudo.version > CB.almacen.VERSION_ESQUEMA) {
    return { ok: false, motivo: 'version' };
  }

  var limpio = {}, i, c;
  for (i = 0; i < CB.almacen.CAMPOS_PERMITIDOS.length; i++) {
    c = CB.almacen.CAMPOS_PERMITIDOS[i];
    if (crudo[c] !== undefined) limpio[c] = crudo[c];
  }

  /* mote: de la lista cerrada de 120, o uno por defecto. Nunca texto libre. */
  if (!motesValidos || motesValidos.indexOf(limpio.mote) === -1) {
    limpio.mote = (motesValidos && motesValidos.length) ? motesValidos[0] : 'Topo Cavador';
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(String(limpio.colorBloque))) limpio.colorBloque = '#5AA02C';
  limpio.avatar = CB.util.clamp(parseInt(limpio.avatar, 10) || 0, 0, 15);
  if (!limpio.id || !/^[A-Za-z0-9\-]{1,32}$/.test(String(limpio.id))) {
    limpio.id = 'p-' + CB.util.hash32(String(limpio.mote) + limpio.avatar).toString(16);
  }

  if (limpio.respuestas && limpio.respuestas.length > 800) limpio.respuestas = limpio.respuestas.slice(-800);
  if (limpio.historial && limpio.historial.length > 60) limpio.historial = limpio.historial.slice(-60);
  if (limpio.diario && limpio.diario.diasJugados && limpio.diario.diasJugados.length > 120) {
    limpio.diario.diasJugados = limpio.diario.diasJugados.slice(-120);
  }
  if (limpio.cromos && limpio.cromos.length > 60) limpio.cromos.length = 60;
  if (limpio.glosario && limpio.glosario.length > 48) limpio.glosario.length = 48;

  return { ok: true, perfil: CB.almacen.migrar(limpio) };
};

CB.almacen.avisarSinDisco = function () { CB.almacen.sinDisco = true; };

/* Tamaño total ocupado, para el aviso del panel del adulto. */
CB.almacen.bytesUsados = function () {
  var s = ls(), total = 0, i, k;
  if (!s) return 0;
  for (i = 0; i < s.length; i++) {
    k = s.key(i);
    if (k && k.indexOf(CB.almacen.PREFIJO) === 0) {
      total += k.length + (s.getItem(k) || '').length;
    }
  }
  return total * 2;                 // UTF-16
};
