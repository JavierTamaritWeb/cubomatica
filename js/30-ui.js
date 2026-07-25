/* ============================================================================
   30-ui.js — Pintado. Toca el DOM (serie 30-, fuera de la regla de frontera)
   ----------------------------------------------------------------------------
   REGLA DE SEGURIDAD (PLAN §15.8): todo texto que venga del perfil o de un
   fichero importado se pinta con textContent, NUNCA con innerHTML. En este
   fichero no hay ni una asignación a innerHTML con variables.

   POOL DE 24 PARTÍCULAS: se crean una vez y se reciclan. Crear y destruir nodos
   en cada acierto produce tirones en un Chromebook de 2019, que es justo el
   dispositivo objetivo.
   ========================================================================== */

var CB = CB || {};
CB.ui = CB.ui || {};

CB.ui.POOL_PARTICULAS = 24;
CB.ui._particulas = [];
CB.ui._sigParticula = 0;

/* ── Utilidades de creación ─────────────────────────────────────────────── */
CB.ui.crear = function (etiqueta, clase, texto) {
  var el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto != null) el.textContent = String(texto);
  return el;
};

CB.ui.vaciar = function (el) {
  if (!el) return;
  while (el.firstChild) el.removeChild(el.firstChild);
};

CB.ui.boton = function (texto, clase, alPulsar, datos) {
  var b = CB.ui.crear('button', 'btn-bloque ' + (clase || ''), texto);
  b.type = 'button';
  if (datos) {
    var k;
    for (k in datos) {
      if (Object.prototype.hasOwnProperty.call(datos, k)) b.setAttribute('data-' + k, datos[k]);
    }
  }
  if (alPulsar) b.addEventListener('click', alPulsar);
  return b;
};

/* ── medirLineas: el MISMO algoritmo que usa el validador (§9.3) ────────────
   Si la interfaz cortase por píxeles y el validador por caracteres, el
   invariante 7 mediría una cosa y la pantalla mostraría otra. */
CB.ui.ANCHO_LINEA = 34;
CB.ui.medirLineas = function (texto) {
  return CB.util.cortarLineas(texto, CB.ui.ANCHO_LINEA);
};

/* ── HUD ────────────────────────────────────────────────────────────────── */
CB.ui.pintarHUD = function (estado) {
  var cont = document.getElementById('hud-luces');
  if (cont) {
    CB.ui.vaciar(cont);
    var i, luz;
    for (i = 0; i < CB.vidas.TOPE; i++) {
      if (i >= Math.max(CB.vidas.INICIALES, estado.luces)) break;
      luz = CB.ui.crear('span', 'luz');
      luz.setAttribute('data-estado', i < estado.luces ? 'encendida' : 'apagada');
      cont.appendChild(luz);
    }
    cont.setAttribute('aria-label', CB.a11y.textoLuces(estado.luces, CB.vidas.TOPE));
  }
  var g = document.getElementById('hud-gemas');
  /* El contador de gemas SOLO SUBE. Nunca baja, nunca es negativo (§3.4). */
  if (g) g.textContent = String(Math.max(0, estado.gemas || 0));
};

CB.ui.parpadeoGris = function () {
  var g = document.querySelector('#p-partida .gemas');
  if (!g) return;
  g.classList.add('parpadeo-gris');
  setTimeout(function () { g.classList.remove('parpadeo-gris'); }, 240);
};

CB.ui.encenderLuz = function (indice) {
  var luces = document.querySelectorAll('#hud-luces .luz');
  if (luces[indice]) {
    luces[indice].setAttribute('data-estado', 'encendida');
    luces[indice].classList.add('recien-encendida');
    setTimeout(function () { luces[indice].classList.remove('recien-encendida'); }, 1600);
  }
};

/* ── Enunciado del ítem ─────────────────────────────────────────────────── */
CB.ui.pintarItem = function (item) {
  var cont = document.getElementById('item-enunciado');
  if (!cont) return;
  CB.ui.vaciar(cont);
  cont.className = 'panel-bloque';

  /* Problemas de enunciado: frases separadas, tipografía del sistema, 34ch. */
  if (item.frases && item.frases.length) {
    var caja = CB.ui.crear('div', 'enunciado');
    var i;
    for (i = 0; i < item.frases.length; i++) {
      var p = CB.ui.crear('p', 'frase-enunciado', item.frases[i]);
      p.setAttribute('data-frase', i);
      caja.appendChild(p);
    }
    cont.appendChild(caja);
    return;
  }

  /* Multiplicación: matriz y suma reiterada SIEMPRE ANTES que el resultado.
     Criterio de HECHO de F7, sin excepción (§6.5). */
  if (item.visual && item.visual.tipo === 'matriz') {
    cont.appendChild(CB.ui.matriz(item.visual.filas, item.visual.columnas));
    if (item.sumaReiterada) {
      cont.appendChild(CB.ui.crear('p', 'texto-menor', item.sumaReiterada));
    }
  }

  if (item.visual && item.visual.tipo === 'conteo') {
    cont.appendChild(CB.ui.conteo(item.visual.n));
  }

  if (item.visual && item.visual.tipo === 'balanza') {
    cont.appendChild(CB.ui.balanza(item.visual.a, item.visual.b));
  }

  if (item.visual && item.visual.tipo === 'fila') {
    cont.appendChild(CB.ui.filaVagonetas(item.visual.total, item.visual.marcada));
  }

  if (item.preguntaPrevia) {
    cont.appendChild(CB.ui.crear('p', 'texto-menor', item.preguntaPrevia));
  }

  var texto = item.consigna || '';
  var esOperacion = !!item.operacion && !item.visual;
  var linea = CB.ui.crear('p', esOperacion ? 'operacion' : 'enunciado', texto);
  cont.appendChild(linea);
};

/* Matriz de filas y columnas para la multiplicación. */
CB.ui.matriz = function (filas, columnas) {
  var caja = CB.ui.crear('div', 'lienzo-explicador');
  var rej = CB.ui.crear('div');
  rej.style.display = 'grid';
  rej.style.gridTemplateColumns = 'repeat(' + columnas + ', 20px)';
  rej.style.gap = '4px';
  var i, total = filas * columnas;
  for (i = 0; i < total && i < 120; i++) {
    var b = CB.ui.crear('span');
    b.style.width = '20px'; b.style.height = '20px';
    b.style.background = 'var(--deco-cristal)';
    b.style.boxShadow = 'inset 3px 3px 0 0 var(--deco-cristal-cla), ' +
                        'inset -3px -3px 0 0 var(--deco-cristal-osc)';
    rej.appendChild(b);
  }
  caja.appendChild(rej);
  caja.setAttribute('aria-label', filas + ' filas de ' + columnas);
  return caja;
};

CB.ui.conteo = function (n) {
  var caja = CB.ui.crear('div', 'lienzo-explicador');
  var i;
  for (i = 0; i < n && i < 60; i++) {
    var b = CB.ui.crear('span');
    b.style.width = '24px'; b.style.height = '24px';
    b.style.background = 'var(--deco-tierra)';
    b.style.boxShadow = 'inset 4px 4px 0 0 var(--deco-tierra-cla), ' +
                        'inset -4px -4px 0 0 var(--deco-tierra-osc)';
    caja.appendChild(b);
  }
  caja.setAttribute('aria-label', n + ' bloques');
  return caja;
};

CB.ui.balanza = function (a, b) {
  var caja = CB.ui.crear('div', 'balanza');
  function plato(v) {
    var p = CB.ui.crear('div', 'balanza-plato');
    p.appendChild(CB.ui.crear('div', 'balanza-cifra', v));
    var i, n = Math.min(9, Math.max(1, Math.round(v / Math.max(1, Math.max(a, b)) * 9)));
    for (i = 0; i < n; i++) p.appendChild(CB.ui.crear('span', 'balanza-cubo'));
    return p;
  }
  caja.appendChild(plato(a));
  caja.appendChild(CB.ui.crear('div', 'balanza-cifra', '?'));
  caja.appendChild(plato(b));
  caja.setAttribute('aria-label', a + ' y ' + b);
  return caja;
};

CB.ui.filaVagonetas = function (total, marcada) {
  var caja = CB.ui.crear('div', 'fila-ordenar');
  var i;
  for (i = 1; i <= total && i <= 20; i++) {
    var v = CB.ui.crear('span', 'hueco-orden', i === marcada ? '★' : '·');
    if (i === marcada) v.style.background = 'var(--deco-oro-cla)';
    caja.appendChild(v);
  }
  caja.setAttribute('aria-label', 'Fila de ' + total + ' vagonetas, marcada la ' + marcada);
  return caja;
};

/* ── Mensajes ───────────────────────────────────────────────────────────── */
CB.ui.mensaje = function (texto, tipo) {
  var m = document.getElementById('item-mensaje');
  if (!m) return;
  m.hidden = false;
  m.setAttribute('data-tipo', tipo);
  m.textContent = texto;
  CB.a11y.anunciar(texto);
};

CB.ui.ocultarMensaje = function () {
  var m = document.getElementById('item-mensaje');
  if (m) { m.hidden = true; m.textContent = ''; }
};

/* ── Bono retrospectivo: GANANCIA, nunca pérdida en directo (§3.4) ──────── */
CB.ui.hileraBono = function (n) {
  var h = document.getElementById('item-bono');
  if (!h) return;
  CB.ui.vaciar(h);
  if (!n || n <= 0) { h.hidden = true; return; }
  h.hidden = false;
  var i;
  for (i = 0; i < n; i++) h.appendChild(CB.ui.crear('span', 'gema-icono'));
  h.appendChild(CB.ui.crear('span', null, '+' + n + ' por rapidez'));
};

/* ── Partículas ─────────────────────────────────────────────────────────── */
CB.ui.iniciarParticulas = function () {
  if (CB.ui._particulas.length) return;
  var i, p;
  for (i = 0; i < CB.ui.POOL_PARTICULAS; i++) {
    p = CB.ui.crear('span', 'particula');
    document.body.appendChild(p);
    CB.ui._particulas.push(p);
  }
};

CB.ui.particulas = function (x, y, color, cuantas) {
  CB.ui.iniciarParticulas();
  var n = Math.min(cuantas || 8, CB.ui.POOL_PARTICULAS);
  var i, p, ang, dist;
  for (i = 0; i < n; i++) {
    p = CB.ui._particulas[CB.ui._sigParticula % CB.ui.POOL_PARTICULAS];
    CB.ui._sigParticula++;
    p.classList.remove('viva');
    /* Reflow forzado para que la animación se reinicie de verdad. */
    void p.offsetWidth;
    p.style.left = (x - 6) + 'px';
    p.style.top = (y - 6) + 'px';
    p.style.background = color || 'var(--deco-cristal)';
    ang = (Math.PI * 2 * i) / n;
    dist = 40 + (i % 3) * 18;
    p.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
    p.style.setProperty('--dy', Math.round(Math.sin(ang) * dist + 40) + 'px');
    p.classList.add('viva');
  }
};

CB.ui.particulasDe = function (el, color) {
  if (!el) return;
  var r = el.getBoundingClientRect();
  CB.ui.particulas(r.left + r.width / 2, r.top + r.height / 2, color, 10);
};

/* ── Criaturas ──────────────────────────────────────────────────────────── */
CB.ui.CRIATURAS = {
  cubi: '🧍', rocarr: '🪨', gluglu: '💧', chispa: '✨', blopi: '🟩',
  tronquete: '🌳', ranacubo: '🐸', cristalina: '💠', brasita: '🔥',
  chispita: '⭐', vagoneto: '🛒'
};

/* Cada criatura tiene su propia reacción. Un niño debe poder decir qué hace
   Rocarr y qué hace Gluglú sin haber leído nada (criterio de HECHO de F6). */
CB.ui.personaje = function (quien, estado) {
  var el = document.getElementById('cri-' + quien);
  if (!el) return;
  el.hidden = false;
  ['flota', 'saltito', 'asiente', 'gotea', 'gira'].forEach(function (c) {
    el.classList.remove(c);
  });
  void el.offsetWidth;
  var anim = { acierto: 'saltito', pista: 'asiente', moja: 'gotea', racha: 'gira' }[estado];
  if (anim) el.classList.add(anim);
  else el.classList.add('flota');
};

CB.ui.ocultarPersonaje = function (quien) {
  var el = document.getElementById('cri-' + quien);
  if (el) el.hidden = true;
};

/* ── Lectura guiada: resalta la palabra que se está leyendo ─────────────── */
CB.ui.resaltarLinea = function (indice) {
  var lineas = document.querySelectorAll('#item-enunciado .frase-enunciado');
  var i;
  for (i = 0; i < lineas.length; i++) {
    lineas[i].classList.toggle('linea-activa', i === indice);
  }
};

CB.ui.resaltarPalabra = function (indice, texto) {
  var caja = document.querySelector('#item-enunciado .enunciado');
  if (!caja) return;
  if (indice < 0) { CB.ui.resaltarLinea(-1); return; }
  /* Se resalta la frase que contiene esa palabra: resaltar palabra a palabra
     exigiría reconstruir el DOM en cada paso, y eso rompe el lector de pantalla. */
  var acumulado = 0, i;
  var frases = caja.querySelectorAll('.frase-enunciado');
  for (i = 0; i < frases.length; i++) {
    var n = CB.util.palabras(frases[i].textContent).length;
    if (indice < acumulado + n) { CB.ui.resaltarLinea(i); return; }
    acumulado += n;
  }
};

/* ── Bioma y cielo ──────────────────────────────────────────────────────── */
CB.ui.pintarBioma = function (bioma, avance) {
  var z = document.getElementById('zona-juego');
  if (z) {
    z.className = 'zona-juego bioma bioma--' + bioma;
  }
  var cielo = document.querySelector('#p-partida .cielo');
  if (!cielo) return;
  var paso = CB.util.clamp(Math.floor((avance || 0) * 6), 0, 5);
  cielo.className = 'cielo cielo--' + paso;
  /* Capa 2: solo si el navegador la soporta de verdad (§10.7). */
  cielo.style.setProperty('--avance', String(CB.util.clamp(avance || 0, 0, 1)));
};

/* ── Tarjeta de reparación: PUERTA DE INTERACCIÓN, no temporizador ──────────
   El botón «¡Lo pillo!» aparece deshabilitado y solo se habilita cuando el niño
   ha tocado los 3 pasos EN ORDEN, con un suelo temporal de max(4 s, palabras ×
   900 ms). Salvavidas a los 25 s: la tarjeta se autocompleta con voz y el botón
   se habilita. NUNCA se deja al niño atrapado (§12.6). */
CB.ui._timersReparacion = null;

/* Limpia los temporizadores de una tarjeta anterior. SIN ESTO la puerta de
   interacción quedaba anulada en cuanto había una segunda reparación en la
   sesión: el setInterval de la tarjeta vieja seguía vivo, apuntaba al MISMO
   nodo #btn-lo-pillo y lo habilitaba usando el estado de SU puerta (ya
   completada). Es decir, a partir del segundo fallo grave del día el botón
   «¡Lo pillo!» volvía a ser saltable de un toque, que es exactamente el defecto
   que §12.6 existe para impedir. */
CB.ui.limpiarReparacion = function () {
  if (!CB.ui._timersReparacion) return;
  clearTimeout(CB.ui._timersReparacion.salvavidas);
  clearInterval(CB.ui._timersReparacion.reloj);
  CB.ui._timersReparacion = null;
};

CB.ui.mostrarReparacion = function (item, hipotesis, alTerminar) {
  CB.ui.limpiarReparacion();

  var tarjeta = CB.reparacion.tarjeta(item, hipotesis);
  var puerta = CB.reparacion.nuevaPuerta(tarjeta.sueloMs);
  var abiertaTs = CB.util.ahora();

  CB.pantallas.ir('p-reparacion');

  var lienzo = document.getElementById('rep-lienzo');
  CB.ui.vaciar(lienzo);
  lienzo.appendChild(CB.ui.crear('h2', null, tarjeta.titulo));
  lienzo.appendChild(CB.ui.dibujoReparacion(tarjeta));

  var cont = document.getElementById('rep-pasos');
  CB.ui.vaciar(cont);

  var boton = document.getElementById('btn-lo-pillo');
  boton.disabled = true;

  var ayuda = document.getElementById('rep-ayuda');

  /* El botón NUNCA está inerte en silencio: el texto de ayuda dice siempre qué
     falta. Un botón que no responde y no explica por qué hace que el niño crea
     que el juego está roto. */
  function revisar() {
    var ms = CB.util.ahora() - abiertaTs;
    if (boton.disabled && CB.reparacion.puedeAbrir(puerta, ms)) {
      boton.disabled = false;
      boton.classList.add('destello');
      if (ayuda) ayuda.textContent = 'Ya lo tienes. Sigue cuando quieras.';
      return;
    }
    if (!boton.disabled || !ayuda) return;

    if (puerta.tocados.length < 3) {
      ayuda.textContent = 'Toca los tres pasos para verlo entero. Llevas ' +
                          puerta.tocados.length + ' de 3.';
    } else {
      ayuda.textContent = 'Rocarr está terminando de explicártelo…';
    }
  }

  tarjeta.pasos.forEach(function (paso, i) {
    var fila = CB.ui.crear('button', 'paso-reparacion');
    fila.type = 'button';
    fila.setAttribute('data-hecho', 'no');
    fila.appendChild(CB.ui.crear('span', 'num-paso', String(i + 1)));
    fila.appendChild(CB.ui.crear('span', null, paso.texto));
    fila.addEventListener('click', function () {
      CB.reparacion.tocar(puerta, i);
      if (puerta.tocados.indexOf(i) !== -1) {
        fila.setAttribute('data-hecho', 'si');
        CB.ui.resaltarPasoDibujo(paso.foco);
        CB.audio.sfx('rocarr');
        CB.voz.leer(paso.texto);
      }
      revisar();
    });
    cont.appendChild(fila);
  });

  if (ayuda) ayuda.textContent = 'Toca los tres pasos para verlo entero.';

  /* Salvavidas: siempre por detrás del suelo temporal, nunca antes de 25 s */
  var salvavidas = setTimeout(function () {
    CB.reparacion.autocompletar(puerta);
    var filas = cont.querySelectorAll('.paso-reparacion');
    var i;
    for (i = 0; i < filas.length; i++) filas[i].setAttribute('data-hecho', 'si');
    boton.disabled = false;
    boton.classList.add('destello');
    if (ayuda) ayuda.textContent = 'Rocarr te lo ha enseñado. Puedes seguir.';
    CB.voz.leer(tarjeta.pasos.map(function (p) { return p.texto; }).join(' '));
  }, tarjeta.salvavidasMs);

  var reloj = setInterval(revisar, 400);
  CB.ui._timersReparacion = { salvavidas: salvavidas, reloj: reloj };

  boton.onclick = function () {
    if (boton.disabled) return;
    CB.ui.limpiarReparacion();
    boton.classList.remove('destello');
    boton.onclick = null;
    alTerminar(CB.reparacion.completada(puerta));
  };
};

/* Dibujo del explicador. Seis formas distintas, no un texto con otro color. */
CB.ui.dibujoReparacion = function (tarjeta) {
  var caja = CB.ui.crear('div', 'lienzo-explicador');
  var d = tarjeta.datos, i;

  if (tarjeta.dibujo === 'columnas') {
    ['C', 'D', 'U'].forEach(function (letra, idx) {
      var col = CB.ui.crear('div', 'columna-cdu');
      col.setAttribute('data-columna', letra);
      col.setAttribute('data-activa', 'no');
      col.appendChild(CB.ui.crear('span', 'texto-menor', letra));
      var pot = Math.pow(10, 2 - idx);
      col.appendChild(CB.ui.crear('span', null, Math.floor(d.a / pot) % 10));
      col.appendChild(CB.ui.crear('span', null, d.op));
      col.appendChild(CB.ui.crear('span', null, Math.floor(d.b / pot) % 10));
      caja.appendChild(col);
    });
    var manojo = CB.ui.crear('div', 'manojo-decena');
    for (i = 0; i < 10; i++) manojo.appendChild(CB.ui.crear('b'));
    caja.appendChild(manojo);

  } else if (tarjeta.dibujo === 'matriz') {
    caja.appendChild(CB.ui.matriz(d.filas, d.columnas));

  } else if (tarjeta.dibujo === 'barras') {
    [d.a, d.b].forEach(function (v) {
      var barra = CB.ui.crear('div');
      barra.style.display = 'flex'; barra.style.gap = '2px';
      var n = Math.min(20, v);
      for (i = 0; i < n; i++) {
        var b = CB.ui.crear('span');
        b.style.width = '14px'; b.style.height = '28px';
        b.style.background = 'var(--deco-cobre)';
        barra.appendChild(b);
      }
      barra.appendChild(CB.ui.crear('span', null, ' ' + v));
      caja.appendChild(barra);
    });

  } else if (tarjeta.dibujo === 'monedas') {
    (d.piezas || []).forEach(function (v) {
      caja.appendChild(CB.ui.crear('span', 'moneda', v + ' €'));
    });

  } else if (tarjeta.dibujo === 'tabla100') {
    var rej = CB.ui.crear('div');
    rej.style.display = 'grid';
    rej.style.gridTemplateColumns = 'repeat(10, 24px)';
    rej.style.gap = '2px';
    for (i = 1; i <= 100; i++) {
      var c = CB.ui.crear('span', null, i);
      c.style.fontSize = '11px'; c.style.textAlign = 'center';
      c.style.background = (i === d.marca) ? 'var(--deco-oro-cla)' : 'var(--bg-texto-panel)';
      rej.appendChild(c);
    }
    caja.appendChild(rej);

  } else {
    var recta = CB.ui.crear('div', 'fila-ordenar');
    for (i = d.desde; i <= d.hasta && i - d.desde < 20; i++) {
      var h = CB.ui.crear('span', 'hueco-orden', i);
      h.style.width = '48px'; h.style.height = '48px'; h.style.fontSize = '16px';
      if (i === d.marca) h.style.background = 'var(--deco-oro-cla)';
      recta.appendChild(h);
    }
    caja.appendChild(recta);
  }
  return caja;
};

CB.ui.resaltarPasoDibujo = function (foco) {
  var mapa = { unidades: 'U', decenas: 'D', prestamo: 'D', llevada: 'D' };
  var letra = mapa[foco];
  var cols = document.querySelectorAll('.columna-cdu');
  var i;
  for (i = 0; i < cols.length; i++) {
    cols[i].setAttribute('data-activa',
      letra && cols[i].getAttribute('data-columna') === letra ? 'si' : 'no');
  }
};

/* ── Barra de progreso genérica ─────────────────────────────────────────── */
CB.ui.barra = function (fraccion) {
  var b = CB.ui.crear('div', 'barra-progreso-mundo');
  var i = CB.ui.crear('i');
  i.style.width = Math.round(CB.util.clamp(fraccion, 0, 1) * 100) + '%';
  b.appendChild(i);
  return b;
};

/* ── Reloj de arena de la cuenta atrás ──────────────────────────────────────
   30 segundos por ítem, visibles. El plan original decía expresamente lo
   contrario («la rapidez suma, nunca resta; jamás una cuenta atrás que corre
   mientras el niño piensa») y esto lo cambia por petición explícita. Las dos
   salvaguardas que SÍ se conservan, porque no son de gusto:

   1. El modo «Sin prisa» apaga la cuenta atrás entera. Un límite de tiempo que
      no se puede desactivar incumple la WCAG 2.2.1, y esto es material escolar
      sujeto a la EN 301 549.
   2. Quedarse sin tiempo NO apaga una luz. Eso ya era así y sigue siéndolo:
      lo comprueba CB.vidas.timeout().

   La cifra es texto de verdad y el dibujo es aria-hidden. Un lector de pantalla
   lee «18», no «reloj de arena a dos tercios».
   ────────────────────────────────────────────────────────────────────────── */
CB.ui.reloj = {
  caja: null, arena: null, cifra: null, alta: null, baja: null, aviso: null,
  _tic: null, _finMs: 0, _totalMs: 0, _ultimoSeg: -1, _avisado: false,
  _salida: null
};

CB.ui.reloj.SEG_PRISA = 10;          // cuándo sale «Hurry up!»
CB.ui.reloj.PASOS_ARENA = 20;        // la arena baja a saltos de un veinteavo
/* Tiene que valer EXACTAMENTE lo que dura la animación prisa-cruza de
   05-animaciones.css. Si el JS oculta antes, el cartel desaparece a media
   pantalla; si oculta después, se queda un rectángulo invisible tapando. */
CB.ui.reloj.MS_CARTEL = 1900;

CB.ui.reloj.montar = function () {
  var r = CB.ui.reloj;
  if (r.caja) return r.caja;
  r.caja  = document.getElementById('hud-reloj');
  r.cifra = document.getElementById('hud-segundos');
  r.alta  = document.getElementById('ra-alta');
  r.baja  = document.getElementById('ra-baja');
  r.aviso = document.getElementById('aviso-prisa');
  r.arena = r.caja ? r.caja.querySelector('.reloj-arena') : null;
  return r.caja;
};

/** @param ms duración total; 0 o negativo = sin cuenta atrás (modo «Sin prisa») */
CB.ui.reloj.arrancar = function (ms) {
  var r = CB.ui.reloj;
  if (!r.montar()) return false;
  CB.ui.reloj.parar();

  if (!(ms > 0)) { r.caja.hidden = true; return false; }

  r.caja.hidden = false;
  r.caja.classList.remove('reloj--prisa');
  r._totalMs = ms;
  r._finMs = CB.util.ahora() + ms;
  r._ultimoSeg = -1;
  r._avisado = false;

  /* La vuelta de campana: el reloj se pone del derecho al empezar el ítem. */
  if (r.arena) {
    r.arena.classList.remove('voltea');
    void r.arena.offsetWidth;                 // reinicia la animación
    r.arena.classList.add('voltea');
  }

  CB.ui.reloj.pintar(ms);
  r._tic = setInterval(CB.ui.reloj.paso, 100);
  return true;
};

CB.ui.reloj.parar = function () {
  var r = CB.ui.reloj;
  if (r._tic) { clearInterval(r._tic); r._tic = null; }
  if (r._salida) { clearTimeout(r._salida); r._salida = null; }
  if (r.caja) {
    r.caja.hidden = true;
    r.caja.classList.remove('reloj--prisa');
  }
  CB.ui.reloj.ocultarCartel(true);
};

CB.ui.reloj.paso = function () {
  var r = CB.ui.reloj;
  var resta = r._finMs - CB.util.ahora();
  if (resta <= 0) {
    CB.ui.reloj.pintar(0);
    if (r._tic) { clearInterval(r._tic); r._tic = null; }
    return;
  }
  CB.ui.reloj.pintar(resta);
};

CB.ui.reloj.pintar = function (restaMs) {
  var r = CB.ui.reloj;
  if (!r.caja) return;

  /* Arena: fracción QUE QUEDA, redondeada a veinteavos. Sin redondear se ve
     una barra de progreso; redondeada se ve arena. */
  var frac = CB.util.clamp(restaMs / (r._totalMs || 1), 0, 1);
  var p = Math.round(frac * CB.ui.reloj.PASOS_ARENA) / CB.ui.reloj.PASOS_ARENA;
  if (r.alta) r.alta.style.height = Math.round(p * 100) + '%';
  if (r.baja) r.baja.style.height = Math.round((1 - p) * 100) + '%';

  var seg = Math.ceil(restaMs / 1000);
  if (seg === r._ultimoSeg) return;
  r._ultimoSeg = seg;
  if (r.cifra) r.cifra.textContent = String(seg);

  if (seg <= CB.ui.reloj.SEG_PRISA) {
    r.caja.classList.add('reloj--prisa');
    if (r.cifra) {
      r.cifra.classList.remove('late');
      void r.cifra.offsetWidth;
      r.cifra.classList.add('late');
    }
    if (!r._avisado) { r._avisado = true; CB.ui.reloj.gritar(); }
  }
};

/* «Hurry up!» sube desde abajo. El texto va en inglés porque así se pidió; el
   aviso que oye un lector de pantalla va en español y se dice UNA vez. */
CB.ui.reloj.gritar = function () {
  var r = CB.ui.reloj;
  if (!r.aviso) return;

  r.aviso.hidden = false;
  r.aviso.classList.remove('entra');
  void r.aviso.offsetWidth;                   // reinicia la animación
  r.aviso.classList.add('entra');

  CB.audio.sfx('prisa');
  CB.a11y.anunciar('Quedan diez segundos.');

  if (r._salida) clearTimeout(r._salida);
  r._salida = setTimeout(function () {
    CB.ui.reloj.ocultarCartel(true);
  }, CB.ui.reloj.MS_CARTEL);
};

CB.ui.reloj.ocultarCartel = function () {
  var r = CB.ui.reloj;
  if (r._salida) { clearTimeout(r._salida); r._salida = null; }
  if (!r.aviso) return;
  r.aviso.classList.remove('entra');
  r.aviso.hidden = true;
};
