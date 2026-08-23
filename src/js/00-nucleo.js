/* 00-nucleo.js — CB.util y CB.LEGAL */

var CB = CB || {};
CB.util = CB.util || {};

/* Aleatoriedad reproducible */

/* mulberry32: generador de 32 bits, rápido y con semilla. Devuelve [0,1). */
CB.util.mulberry32 = function (semilla) {
  let s = semilla >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/* hash32: cadena → entero de 32 bits sin signo. Para derivar semillas. */
CB.util.hash32 = function (texto) {
  let h = 2166136261 >>> 0, i;
  texto = String(texto);
  for (i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
};

/* Entero en [min, max], ambos incluidos. */
CB.util.ent = function (rng, min, max) {
  if (max < min) { const t = min; min = max; max = t; }
  return min + Math.floor(rng() * (max - min + 1));
};

CB.util.elegir = function (rng, lista) {
  if (!lista || !lista.length) return null;
  return lista[Math.floor(rng() * lista.length)];
};

/* Fisher-Yates. Devuelve una copia; no muta la entrada. */
CB.util.barajar = function (lista, rng) {
  const a = lista.slice();
  let i, j, t;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(rng() * (i + 1));
    t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};

CB.util.rango = function (n) {
  const a = [];
  let i;
  for (i = 0; i < n; i++) a.push(i);
  return a;
};

/* BolsaBarajada */
CB.util.BolsaBarajada = function (n, rng, restantes) {
  this.n = n | 0;
  this.rng = rng || CB.util.mulberry32(0x9E3779B9);
  this.restantes = Array.isArray(restantes) ? restantes.slice() : [];
};

CB.util.BolsaBarajada.prototype.rellenar = function () {
  this.restantes = CB.util.barajar(CB.util.rango(this.n), this.rng);
};

/* Saca un índice. `evitar` es una lista de índices vistos hace poco: si el
   candidato está ahí, se prueba con el siguiente de la bolsa. Si TODOS los
   restantes están en `evitar`, se devuelve uno igualmente: nunca se bloquea. */
CB.util.BolsaBarajada.prototype.sacar = function (evitar) {
  if (this.n <= 0) return -1;
  if (!this.restantes.length) this.rellenar();
  evitar = evitar || [];

  let i;
  for (i = this.restantes.length - 1; i >= 0; i--) {
    if (evitar.indexOf(this.restantes[i]) === -1) {
      return this.restantes.splice(i, 1)[0];
    }
  }
  return this.restantes.pop();
};

CB.util.BolsaBarajada.prototype.estado = function () {
  return this.restantes.slice();
};

/* Matemáticas de apoyo */

CB.util.clamp = function (v, a, b) {
  if (!isFinite(v)) return a;
  return v < a ? a : (v > b ? b : v);
};

CB.util.mediana = function (arr) {
  if (!arr || !arr.length) return 0;
  const a = arr.slice().sort(function (x, y) { return x - y; });
  const m = Math.floor(a.length / 2);
  return (a.length % 2) ? a[m] : Math.round((a[m - 1] + a[m]) / 2);
};

CB.util.media = function (arr) {
  if (!arr || !arr.length) return 0;
  let s = 0, i;
  for (i = 0; i < arr.length; i++) s += arr[i];
  return s / arr.length;
};

/* Media incremental. Con n === 0 devuelve el propio valor: sin esta guarda,
   rtMedioMs de un subtipo con intentos:0 producía NaN y contaminaba el perfil
   para siempre (§11.2). */
CB.util.mediaIncremental = function (medio, n, valor) {
  if (!n || n <= 0 || !isFinite(medio)) return valor;
  return (medio * n + valor) / (n + 1);
};

/* Tiempo y fechas */

CB.util.hoyISO = function (d) {
  d = d || new Date();
  const m = d.getMonth() + 1, x = d.getDate();
  return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (x < 10 ? '0' : '') + x;
};

/* Compara a MEDIODÍA LOCAL: inmune al cambio de hora. */
CB.util.diasEntre = function (a, b) {
  if (!a || !b) return 0;
  const A = new Date(a + 'T12:00:00');
  const B = new Date(b + 'T12:00:00');
  const d = Math.round((B - A) / 86400000);
  return isFinite(d) ? d : 0;
};

CB.util.sumarDias = function (iso, dias) {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + dias);
  return CB.util.hoyISO(d);
};

CB.util.esISO = function (s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
};

/* Reloj MONOTÓNICO. Un ajuste de reloj (NTP, cambio de hora, el niño tocando la
   fecha del iPad) daría un rt negativo o de horas. Ver exención en §14.4. */
CB.util.ahora = function () {
  if (typeof performance !== 'undefined' && performance && performance.now) {
    return performance.now();
  }
  return Date.now();
};

/* Todo rt del proyecto pasa por aquí. Nunca negativo, nunca de horas. */
CB.util.rt = function (t0) {
  return CB.util.clamp(Math.round(CB.util.ahora() - t0), 0, 600000);
};

/* Texto */

/* Minúsculas, sin tildes y sin signos. Base del test M3 de unicidad de mensajes. */
CB.util.normalizar = function (t) {
  return String(t)
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a').replace(/[éèëê]/g, 'e').replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o').replace(/[úùüû]/g, 'u').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

CB.util.palabras = function (t) {
  const s = String(t).trim();
  return s ? s.split(/\s+/) : [];
};

/* Corte de línea por ancho en caracteres. La interfaz y el validador de lectura
   fácil DEBEN usar este mismo algoritmo, o el invariante 7 mide una cosa y la
   pantalla muestra otra (§9.3). */
CB.util.cortarLineas = function (texto, ancho) {
  const palabras = CB.util.palabras(texto), lineas = [];
  let actual = '', i;
  for (i = 0; i < palabras.length; i++) {
    const cand = actual ? (actual + ' ' + palabras[i]) : palabras[i];
    if (cand.length > ancho && actual) {
      lineas.push(actual);
      actual = palabras[i];
    } else {
      actual = cand;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
};

CB.util.mayus1 = function (t) {
  t = String(t);
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/* Eleva fallos capturados al puente global de 99-arranque.js. Se hace en la
   siguiente tarea para no convertir un callback interno en una excepción de
   quien emitió el evento. */
CB.util.reportarError = function (causa, contexto) {
  const error = causa instanceof Error ? causa : new Error(String(causa || 'error sin detalle'));
  error.cbContexto = contexto || '';
  setTimeout(function () { throw error; }, 0);
};

/* EventoSimple: pub/sub mínimo, sin dependencias */
CB.util.EventoSimple = function () { this.oyentes = {}; };
CB.util.EventoSimple.prototype.escuchar = function (nombre, fn) {
  (this.oyentes[nombre] = this.oyentes[nombre] || []).push(fn);
};
CB.util.EventoSimple.prototype.emitir = function (nombre, dato) {
  const l = this.oyentes[nombre];
  if (!l) return;
  const copia = l.slice();
  let i, indice;
  for (i = 0; i < copia.length; i++) {
    try {
      copia[i](dato);
    } catch (e) {
      /* Retirarlo antes de informar evita que un oyente roto de `pantalla`
         vuelva a fallar cuando la pantalla global de error emita ese evento. */
      indice = l.indexOf(copia[i]);
      if (indice !== -1) l.splice(indice, 1);
      CB.util.reportarError(e, 'evento ' + nombre);
    }
  }
};

CB.bus = new CB.util.EventoSimple();

/* CB.LEGAL */
/* Versión */
CB.VERSION = '1.23.6';

CB.LEGAL = {
  AVISO: 'Cubomática es una obra original e independiente. No está afiliada, ' +
         'patrocinada ni respaldada por Mojang Studios ni por Microsoft. La estética ' +
         'de mundo de cubos es un género artístico y no es apropiable; todos los ' +
         'nombres, criaturas, texturas y sonidos de este juego son de creación propia ' +
         'y están generados por código.',

  NORMA: 'Real Decreto 157/2022, de 1 de marzo, por el que se establecen la ordenación ' +
         'y las enseñanzas mínimas de la Educación Primaria (BOE núm. 52, de 2 de marzo ' +
         'de 2022; referencia BOE-A-2022-3296).',

  ALCANCE: 'Cubomática trabaja el bloque A (Sentido numérico) y, de forma transversal, ' +
           'el bloque F (Sentido socioafectivo) de los saberes básicos del primer ciclo ' +
           'de Matemáticas del Real Decreto 157/2022. NO trabaja los bloques B (sentido ' +
           'de la medida), C (sentido espacial), D (sentido algebraico) ni E (sentido ' +
           'estocástico): esos saberes se trabajan en el aula y este juego no los sustituye.',

  SECUENCIACION: 'El Real Decreto fija los saberes por CICLO (1.º y 2.º juntos), no por ' +
                 'curso ni por trimestre. La distribución por curso y trimestre de este ' +
                 'juego es una secuenciación propia del proyecto. Debe confirmarse con la ' +
                 'programación didáctica del centro.',

  MULTIPLICACION: 'Las tablas del 2, del 5 y del 10 se practican como iniciación en el ' +
                  'tercer trimestre, tal como es habitual en el aula de 2.º. El Real ' +
                  'Decreto 157/2022 sitúa la construcción de las tablas de multiplicar en ' +
                  'el segundo ciclo, por lo que el resto de tablas está desactivado salvo ' +
                  'que la persona adulta lo active.',

  PRIVACIDAD: 'Cubomática no recoge datos personales. No hay servidor, ni red, ni cuentas, ' +
              'ni analítica. Todo el progreso vive en este navegador y no sale de aquí.',

  LIMITACION: 'Sin servidor, el progreso vive solo en este navegador. Si cambias de ' +
              'ordenador o limpias el navegador, se pierde. Haz una copia al terminar ' +
              'cada trimestre.'
};
