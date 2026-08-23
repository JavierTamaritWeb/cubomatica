/* 30-ui.js — Pintado. Toca el DOM (serie 30-, fuera de la regla de frontera) */

var CB = CB || {};
CB.ui = CB.ui || {};

CB.ui.POOL_PARTICULAS = 24;
CB.ui._particulas = [];
CB.ui._sigParticula = 0;

/* Utilidades de creación */
CB.ui.crear = function (etiqueta, clase, texto) {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto != null) el.textContent = String(texto);
  return el;
};

CB.ui.vaciar = function (el) {
  if (!el) return;
  while (el.firstChild) el.removeChild(el.firstChild);
};

CB.ui.boton = function (texto, clase, alPulsar, datos) {
  const b = CB.ui.crear('button', 'btn-bloque ' + (clase || ''), texto);
  b.type = 'button';
  if (datos) {
    let k;
    for (k in datos) {
      if (Object.prototype.hasOwnProperty.call(datos, k)) b.setAttribute('data-' + k, datos[k]);
    }
  }
  if (alPulsar) b.addEventListener('click', alPulsar);
  return b;
};

/* medirLineas: el MISMO algoritmo que usa el validador (§9.3) */
CB.ui.ANCHO_LINEA = 34;
CB.ui.medirLineas = function (texto) {
  return CB.util.cortarLineas(texto, CB.ui.ANCHO_LINEA);
};

/* HUD */
CB.ui.pintarHUD = function (estado) {
  const cont = document.getElementById('hud-luces');
  if (cont) {
    CB.ui.vaciar(cont);
    let i, luz;
    for (i = 0; i < CB.vidas.TOPE; i++) {
      if (i >= Math.max(CB.vidas.INICIALES, estado.luces)) break;
      luz = CB.ui.crear('span', 'luces__luz');
      luz.setAttribute('data-estado', i < estado.luces ? 'encendida' : 'apagada');
      cont.appendChild(luz);
    }
    cont.setAttribute('aria-label', CB.a11y.textoLuces(estado.luces, CB.vidas.TOPE));
  }
  const g = document.getElementById('hud-gemas');
  /* El contador de gemas SOLO SUBE. Nunca baja, nunca es negativo (§3.4). */
  if (g) CB.ui.contarHasta(g, Math.max(0, estado.gemas || 0));

  /* CUÁNTO QUEDA */
  const gal = document.getElementById('hud-galeria');
  if (gal && estado.total) {
    CB.ui.vaciar(gal);
    const hechos = Math.max(0, Math.min(estado.total, estado.indice || 0));
    let j, b;
    for (j = 0; j < estado.total; j++) {
      b = CB.ui.crear('b', 'galeria-avance__bloque');
      if (j < hechos) b.setAttribute('data-caido', 'si');
      gal.appendChild(b);
    }
    gal.setAttribute('aria-label', 'Bloque ' + hechos + ' de ' + estado.total);
    /* La versión corta, para cuando no caben los bloques. La escribe el JS
       porque CSS no sabe sumar. */
    gal.setAttribute('data-texto', hechos + '/' + estado.total);
  }
};

/* EN QUÉ VETA SE ESTÁ */
CB.ui.pintarVeta = function (nivel, mundo) {
  const nombre = document.getElementById('hud-veta-nombre');
  const mun = document.getElementById('hud-veta-mundo');
  if (nombre) nombre.textContent = nivel ? nivel.nombre : '';
  if (mun) mun.textContent = mundo ? mundo.nombre : '';
};

/* UNA PIEZA DE DINERO */
/* UNA PIEZA DE DINERO */
CB.ui.pieza = function (etiqueta, v) {
  const esCent = CB.gen.dinero.esCentimo(v);
  const el = CB.ui.crear(etiqueta,
    'pieza ' + (CB.gen.dinero.esMoneda(v) ? 'pieza--moneda' : 'pieza--billete'));
  if (esCent) {
    el.setAttribute('data-centimos', String(CB.gen.dinero.valorCent(v)));
    el.appendChild(CB.ui.crear('span', 'pieza__cifra',
                               CB.gen.dinero.valorCent(v) + ' c'));
  } else {
    el.setAttribute('data-valor', String(v));
    el.appendChild(CB.ui.crear('span', 'pieza__cifra', v + ' €'));
  }
  el.setAttribute('aria-label', CB.gen.dinero.nombre(v));
  return el;
};

/* LA CIFRA QUE SUBE */
CB.ui.MS_PASO_CIFRA = 90;
CB.ui.PASOS_CIFRA = 8;
CB.ui._cuentas = {};

CB.ui.sinMovimiento = function () {
  return !!(document.documentElement &&
            document.documentElement.classList.contains('sin-movimiento'));
};

CB.ui.contarHasta = function (nodo, destino) {
  if (!nodo) return;
  destino = Math.max(0, Math.round(Number(destino)) || 0);

  const clave = nodo.id || 'cifra';
  if (CB.ui._cuentas[clave]) {
    clearInterval(CB.ui._cuentas[clave]);
    CB.ui._cuentas[clave] = null;
  }

  let previo = parseInt(nodo.textContent, 10);
  if (!isFinite(previo)) previo = destino;

  if (destino <= previo) { nodo.textContent = String(destino); return; }

  /* El salto de la cifra. Va aunque el movimiento esté apagado —el CSS lo anula
     ahí— porque quitar la clase a mano sería una segunda lista que mantener. */
  nodo.classList.remove('cifra-viva--sube');
  void nodo.offsetWidth;
  nodo.classList.add('cifra-viva--sube');

  if (CB.ui.sinMovimiento()) { nodo.textContent = String(destino); return; }

  const falta = destino - previo;
  const pasos = Math.min(CB.ui.PASOS_CIFRA, falta);
  const salto = Math.ceil(falta / pasos);
  let valor = previo;

  CB.ui._cuentas[clave] = setInterval(function () {
    valor += salto;
    if (valor >= destino) {
      valor = destino;                       // el destino EXACTO, siempre
      clearInterval(CB.ui._cuentas[clave]);
      CB.ui._cuentas[clave] = null;
      nodo.classList.remove('cifra-viva--sube');
    }
    nodo.textContent = String(valor);
  }, CB.ui.MS_PASO_CIFRA);
};

CB.ui.parpadeoGris = function () {
  const g = document.querySelector('#p-partida .gemas');
  if (!g) return;
  g.classList.add('gemas--parpadeo');
  setTimeout(function () { g.classList.remove('gemas--parpadeo'); }, 240);
};

CB.ui.encenderLuz = function (indice) {
  const luces = document.querySelectorAll('#hud-luces .luces__luz');
  if (luces[indice]) {
    luces[indice].setAttribute('data-estado', 'encendida');
    luces[indice].classList.add('luces__luz--recien-encendida');
    setTimeout(function () { luces[indice].classList.remove('luces__luz--recien-encendida'); }, 1600);
  }
};

/* Enunciado del ítem */
CB.ui.pintarItem = function (item) {
  const cont = document.getElementById('item-enunciado');
  if (!cont) return;
  CB.ui.vaciar(cont);
  cont.className = 'panel-bloque';

  /* EL DISTINTIVO DE RETO, y va aquí arriba a propósito: la rama de los problemas de enunciado hace `return` unas líneas más abajo, así que ponerlo al final no se vería nunca en los problemas — que es justo donde D === 3 es más probable. */
  if (item.esRetoBonus) {
    cont.appendChild(CB.ui.crear('span', 'distintivo', 'reto'));
  }

  /* Problemas de enunciado: frases separadas, tipografía del sistema, 34ch. */
  if (item.frases && item.frases.length) {
    const caja = CB.ui.crear('div', 'enunciado');
    let i;
    for (i = 0; i < item.frases.length; i++) {
      const p = CB.ui.crear('p', 'enunciado__frase', item.frases[i]);
      p.setAttribute('data-frase', i);
      caja.appendChild(p);
    }
    cont.appendChild(caja);
    /* Solo en problemas: en «6 − 3» no hay nada que leer. */
    const altavoz = CB.ui.boton('🔊 Leer', 'btn-bloque--icono enunciado__altavoz', function () {
      if (CB.partida && CB.partida.accionLeerSuave) CB.partida.accionLeerSuave();
    });
    altavoz.setAttribute('aria-label', 'Leer el problema en voz alta');
    cont.appendChild(altavoz);
    return;
  }

  /* Multiplicación: matriz y suma reiterada SIEMPRE ANTES que el resultado.
     Criterio de HECHO de F7, sin excepción (§6.5). */
  if (item.visual && item.visual.tipo === 'matriz') {
    cont.appendChild(CB.ui.matriz(item.visual.filas, item.visual.columnas));
    if (item.sumaReiterada) {
      cont.appendChild(CB.ui.crear('p', 'texto texto--menor', item.sumaReiterada));
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

  if (item.visual && item.visual.tipo === 'fraccion') {
    cont.appendChild(CB.ui.barraFraccion(item.visual.partes, item.visual.sombreadas));
  }

  if (item.preguntaPrevia) {
    cont.appendChild(CB.ui.crear('p', 'texto texto--menor', item.preguntaPrevia));
  }

  const texto = item.consigna || '';
  const esOperacion = !!item.operacion && !item.visual;
  const linea = CB.ui.crear('p',
    'enunciado' + (esOperacion ? ' enunciado--operacion' : ''), texto);
  cont.appendChild(linea);
};

/* Matriz de filas y columnas para la multiplicación. */
CB.ui.matriz = function (filas, columnas) {
  const caja = CB.ui.crear('div', 'lienzo-explicador');
  const rej = CB.ui.crear('div');
  rej.style.display = 'grid';
  rej.style.gridTemplateColumns = 'repeat(' + columnas + ', 20px)';
  rej.style.gap = '4px';
  let i;
  const total = filas * columnas;
  for (i = 0; i < total && i < 120; i++) {
    const b = CB.ui.crear('span');
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

/* La barra de fracción (3.1.0): un todo partido en `partes` rectángulos
   iguales, con `sombreadas` pintadas. Vóxel puro: rectángulos con bisel,
   nada de tartas (una tarta pide border-radius, y aquí no existe). */
CB.ui.barraFraccion = function (partes, sombreadas) {
  const caja = CB.ui.crear('div', 'lienzo-explicador');
  const rej = CB.ui.crear('div');
  rej.style.display = 'grid';
  rej.style.gridTemplateColumns = 'repeat(' + partes + ', 40px)';
  rej.style.gap = '4px';
  let i;
  for (i = 0; i < partes && i < 12; i++) {
    const b = CB.ui.crear('span');
    b.style.width = '40px'; b.style.height = '28px';
    if (i < sombreadas) {
      b.style.background = 'var(--deco-cristal)';
      b.style.boxShadow = 'inset 3px 3px 0 0 var(--deco-cristal-cla), ' +
                          'inset -3px -3px 0 0 var(--deco-cristal-osc)';
    } else {
      b.style.background = 'var(--deco-piedra)';
      b.style.boxShadow = 'inset 3px 3px 0 0 var(--deco-piedra-cla), ' +
                          'inset -3px -3px 0 0 var(--deco-piedra-osc)';
    }
    rej.appendChild(b);
  }
  caja.appendChild(rej);
  caja.setAttribute('aria-label',
    sombreadas + ' de ' + partes + ' partes pintadas');
  return caja;
};

CB.ui.conteo = function (n) {
  const caja = CB.ui.crear('div', 'lienzo-explicador');
  let i;
  for (i = 0; i < n && i < 60; i++) {
    const b = CB.ui.crear('span');
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
  const caja = CB.ui.crear('div', 'balanza');
  function plato(v) {
    const p = CB.ui.crear('div', 'balanza__plato');
    p.appendChild(CB.ui.crear('div', 'balanza__cifra', v));
    let i;
    const n = Math.min(9, Math.max(1, Math.round(v / Math.max(1, Math.max(a, b)) * 9)));
    for (i = 0; i < n; i++) p.appendChild(CB.ui.crear('span', 'balanza__cubo'));
    return p;
  }
  caja.appendChild(plato(a));
  caja.appendChild(CB.ui.crear('div', 'balanza__cifra', '?'));
  caja.appendChild(plato(b));
  caja.setAttribute('aria-label', a + ' y ' + b);
  return caja;
};

CB.ui.filaVagonetas = function (total, marcada) {
  const caja = CB.ui.crear('div', 'fila-ordenar');
  let i;
  for (i = 1; i <= total && i <= 20; i++) {
    const v = CB.ui.crear('span', 'fila-ordenar__hueco', i === marcada ? '★' : '·');
    if (i === marcada) v.style.background = 'var(--deco-oro-cla)';
    caja.appendChild(v);
  }
  caja.setAttribute('aria-label', 'Fila de ' + total + ' vagonetas, marcada la ' + marcada);
  return caja;
};

/* Mensajes */

CB.ui.nodoMensaje = function () {
  const id = (CB.pantallas && CB.pantallas.actual === 'p-calibracion')
    ? 'cal-mensaje' : 'item-mensaje';
  return document.getElementById(id) || document.getElementById('item-mensaje');
};

CB.ui.mensaje = function (texto, tipo) {
  const m = CB.ui.nodoMensaje();
  if (!m) return;
  m.hidden = false;
  m.setAttribute('data-tipo', tipo);
  m.textContent = texto;
  CB.a11y.anunciar(texto);
};

CB.ui.ocultarMensaje = function () {
  /* Se limpian LOS DOS: si la pantalla cambió entre mostrar y ocultar, el que
     quedó escrito no es el que ahora devuelve nodoMensaje(). */
  ['item-mensaje', 'cal-mensaje'].forEach(function (id) {
    const m = document.getElementById(id);
    if (m) { m.hidden = true; m.textContent = ''; }
  });
};

/* Bono retrospectivo: GANANCIA, nunca pérdida en directo (§3.4) */
CB.ui.hileraBono = function (n) {
  const h = document.getElementById('item-bono');
  if (!h) return;
  CB.ui.vaciar(h);
  if (!n || n <= 0) { h.hidden = true; return; }
  h.hidden = false;
  let i;
  for (i = 0; i < n; i++) h.appendChild(CB.ui.crear('span', 'gemas__icono'));
  h.appendChild(CB.ui.crear('span', null, '+' + n + ' por rapidez'));
};

/* Partículas */
CB.ui.iniciarParticulas = function () {
  if (CB.ui._particulas.length) return;
  let i, p;
  for (i = 0; i < CB.ui.POOL_PARTICULAS; i++) {
    p = CB.ui.crear('span', 'particula');
    document.body.appendChild(p);
    CB.ui._particulas.push(p);
  }
};

CB.ui.particulas = function (x, y, color, cuantas) {
  CB.ui.iniciarParticulas();
  const n = Math.min(cuantas || 8, CB.ui.POOL_PARTICULAS);
  let i, p, ang, dist;
  for (i = 0; i < n; i++) {
    p = CB.ui._particulas[CB.ui._sigParticula % CB.ui.POOL_PARTICULAS];
    CB.ui._sigParticula++;
    p.classList.remove('particula--viva');
    /* Reflow forzado para que la animación se reinicie de verdad. */
    void p.offsetWidth;
    p.style.left = (x - 6) + 'px';
    p.style.top = (y - 6) + 'px';
    p.style.background = color || 'var(--deco-cristal)';
    ang = (Math.PI * 2 * i) / n;
    dist = 40 + (i % 3) * 18;
    p.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
    p.style.setProperty('--dy', Math.round(Math.sin(ang) * dist + 40) + 'px');
    p.classList.add('particula--viva');
  }
};

CB.ui.particulasDe = function (el, color) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  CB.ui.particulas(r.left + r.width / 2, r.top + r.height / 2, color, 10);
};

/* Criaturas */
CB.ui.CRIATURAS = {
  cubi: '🧍', rocarr: '🪨', gluglu: '💧', chispa: '✨', blopi: '🟩',
  tronquete: '🌳', ranacubo: '🐸', cristalina: '💠', brasita: '🔥',
  chispita: '⭐', vagoneto: '🛒'
};

/* Cada criatura tiene su propia reacción. Un niño debe poder decir qué hace
   Rocarr y qué hace Gluglú sin haber leído nada (criterio de HECHO de F6). */
CB.ui.personaje = function (quien, estado) {
  const el = document.getElementById('cri-' + quien);
  if (!el) return;
  el.hidden = false;

  ['criatura--flota', 'criatura--saltito', 'criatura--asiente',
   'criatura--gotea', 'criatura--gira'].forEach(function (c) {
    el.classList.remove(c);
  });
  void el.offsetWidth;
  const anim = { acierto: 'criatura--saltito', pista: 'criatura--asiente',
               moja: 'criatura--gotea', racha: 'criatura--gira' }[estado];
  if (anim) el.classList.add(anim);
  else el.classList.add('criatura--flota');
};

CB.ui.ocultarPersonaje = function (quien) {
  const el = document.getElementById('cri-' + quien);
  if (el) el.hidden = true;
};

/* Lectura guiada: resalta la palabra que se está leyendo */
CB.ui.resaltarLinea = function (indice) {
  const lineas = document.querySelectorAll('#item-enunciado .enunciado__frase');
  let i;
  for (i = 0; i < lineas.length; i++) {
    lineas[i].classList.toggle('enunciado__linea--activa', i === indice);
  }
};

CB.ui.resaltarPalabra = function (indice, texto) {
  const caja = document.querySelector('#item-enunciado .enunciado');
  if (!caja) return;
  if (indice < 0) { CB.ui.resaltarLinea(-1); return; }
  /* Se resalta la frase que contiene esa palabra: resaltar palabra a palabra
     exigiría reconstruir el DOM en cada paso, y eso rompe el lector de pantalla. */
  let acumulado = 0, i;
  const frases = caja.querySelectorAll('.enunciado__frase');
  for (i = 0; i < frases.length; i++) {
    const n = CB.util.palabras(frases[i].textContent).length;
    if (indice < acumulado + n) { CB.ui.resaltarLinea(i); return; }
    acumulado += n;
  }
};

/* Bioma y cielo */
CB.ui.pintarBioma = function (bioma, avance) {
  const z = document.getElementById('zona-juego');
  if (z) {
    z.className = 'zona-juego bioma bioma--' + bioma;
  }
  const cielo = document.querySelector('#p-partida .cielo');
  if (!cielo) return;
  const paso = CB.util.clamp(Math.floor((avance || 0) * 6), 0, 5);
  cielo.className = 'cielo cielo--' + paso;
  /* Capa 2: solo si el navegador la soporta de verdad (§10.7). */
  cielo.style.setProperty('--avance', String(CB.util.clamp(avance || 0, 0, 1)));
};

/* Tarjeta de reparación: PUERTA DE INTERACCIÓN, no temporizador */
CB.ui._timersReparacion = null;

CB.ui.limpiarReparacion = function () {
  if (!CB.ui._timersReparacion) return;
  clearTimeout(CB.ui._timersReparacion.salvavidas);
  clearInterval(CB.ui._timersReparacion.reloj);
  CB.ui._timersReparacion = null;
};

CB.ui.mostrarReparacion = function (item, hipotesis, alTerminar) {
  CB.ui.limpiarReparacion();

  const tarjeta = CB.reparacion.tarjeta(item, hipotesis);
  const puerta = CB.reparacion.nuevaPuerta(tarjeta.sueloMs);
  const abiertaTs = CB.util.ahora();

  CB.pantallas.ir('p-reparacion');

  const lienzo = document.getElementById('rep-lienzo');
  CB.ui.vaciar(lienzo);
  lienzo.appendChild(CB.ui.crear('h2', null, tarjeta.titulo));
  lienzo.appendChild(CB.ui.dibujoReparacion(tarjeta));

  const cont = document.getElementById('rep-pasos');
  CB.ui.vaciar(cont);

  const boton = document.getElementById('btn-lo-pillo');
  boton.disabled = true;

  const ayuda = document.getElementById('rep-ayuda');

  /* El botón NUNCA está inerte en silencio: el texto de ayuda dice siempre qué
     falta. Un botón que no responde y no explica por qué hace que el niño crea
     que el juego está roto. */
  function revisar() {
    const ms = CB.util.ahora() - abiertaTs;
    if (boton.disabled && CB.reparacion.puedeAbrir(puerta, ms)) {
      boton.disabled = false;
      boton.classList.add('btn-bloque--destello');
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
    const fila = CB.ui.crear('button', 'reparacion__paso');
    fila.type = 'button';
    fila.setAttribute('data-hecho', 'no');
    fila.appendChild(CB.ui.crear('span', 'reparacion__numero', String(i + 1)));
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
  const salvavidas = setTimeout(function () {
    CB.reparacion.autocompletar(puerta);
    const filas = cont.querySelectorAll('.reparacion__paso');
    let i;
    for (i = 0; i < filas.length; i++) filas[i].setAttribute('data-hecho', 'si');
    boton.disabled = false;
    boton.classList.add('btn-bloque--destello');
    if (ayuda) ayuda.textContent = 'Rocarr te lo ha enseñado. Puedes seguir.';
    CB.voz.leer(tarjeta.pasos.map(function (p) { return p.texto; }).join(' '));
  }, tarjeta.salvavidasMs);

  const reloj = setInterval(revisar, 400);
  CB.ui._timersReparacion = { salvavidas: salvavidas, reloj: reloj };

  boton.onclick = function () {
    if (boton.disabled) return;
    CB.ui.limpiarReparacion();
    boton.classList.remove('btn-bloque--destello');
    boton.onclick = null;
    alTerminar(CB.reparacion.completada(puerta));
  };
};

/* Dibujo del explicador. Seis formas distintas, no un texto con otro color. */
CB.ui.dibujoReparacion = function (tarjeta) {
  const caja = CB.ui.crear('div', 'lienzo-explicador');
  const d = tarjeta.datos;
  let i;

  if (tarjeta.dibujo === 'columnas') {
    ['C', 'D', 'U'].forEach(function (letra, idx) {
      const col = CB.ui.crear('div', 'columna-cdu');
      col.setAttribute('data-columna', letra);
      col.setAttribute('data-activa', 'no');
      col.appendChild(CB.ui.crear('span', 'texto texto--menor', letra));
      const pot = Math.pow(10, 2 - idx);
      col.appendChild(CB.ui.crear('span', null, Math.floor(d.a / pot) % 10));
      col.appendChild(CB.ui.crear('span', null, d.op));
      col.appendChild(CB.ui.crear('span', null, Math.floor(d.b / pot) % 10));
      caja.appendChild(col);
    });
    const manojo = CB.ui.crear('div', 'manojo-decena');
    for (i = 0; i < 10; i++) manojo.appendChild(CB.ui.crear('b', 'manojo-decena__palo'));
    caja.appendChild(manojo);

  } else if (tarjeta.dibujo === 'matriz') {
    caja.appendChild(CB.ui.matriz(d.filas, d.columnas));

  } else if (tarjeta.dibujo === 'barras') {
    [d.a, d.b].forEach(function (v) {
      const barra = CB.ui.crear('div');
      barra.style.display = 'flex'; barra.style.gap = '2px';
      const n = Math.min(20, v);
      for (i = 0; i < n; i++) {
        const b = CB.ui.crear('span');
        b.style.width = '14px'; b.style.height = '28px';
        b.style.background = 'var(--deco-cobre)';
        barra.appendChild(b);
      }
      barra.appendChild(CB.ui.crear('span', null, ' ' + v));
      caja.appendChild(barra);
    });

  } else if (tarjeta.dibujo === 'monedas') {
    (d.piezas || []).forEach(function (v) {
      caja.appendChild(CB.ui.crear('span', 'pieza pieza--moneda', v + ' €'));
    });

  } else if (tarjeta.dibujo === 'tabla100') {
    const rej = CB.ui.crear('div');
    rej.style.display = 'grid';
    rej.style.gridTemplateColumns = 'repeat(10, 24px)';
    rej.style.gap = '2px';
    for (i = 1; i <= 100; i++) {
      const c = CB.ui.crear('span', null, i);
      c.style.fontSize = '11px'; c.style.textAlign = 'center';
      c.style.background = (i === d.marca) ? 'var(--deco-oro-cla)' : 'var(--bg-texto-panel)';
      rej.appendChild(c);
    }
    caja.appendChild(rej);

  } else {
    const recta = CB.ui.crear('div', 'fila-ordenar');
    for (i = d.desde; i <= d.hasta && i - d.desde < 20; i++) {
      const h = CB.ui.crear('span', 'fila-ordenar__hueco', i);
      h.style.width = '48px'; h.style.height = '48px'; h.style.fontSize = '16px';
      if (i === d.marca) h.style.background = 'var(--deco-oro-cla)';
      recta.appendChild(h);
    }
    caja.appendChild(recta);
  }
  return caja;
};

CB.ui.resaltarPasoDibujo = function (foco) {
  const mapa = { unidades: 'U', decenas: 'D', prestamo: 'D', llevada: 'D' };
  const letra = mapa[foco];
  const cols = document.querySelectorAll('.columna-cdu');
  let i;
  for (i = 0; i < cols.length; i++) {
    cols[i].setAttribute('data-activa',
      letra && cols[i].getAttribute('data-columna') === letra ? 'si' : 'no');
  }
};

/* Barra de progreso genérica */
CB.ui.barra = function (fraccion) {
  const b = CB.ui.crear('div', 'tarjeta-mundo__barra');
  const i = CB.ui.crear('i', 'tarjeta-mundo__relleno');
  i.style.width = Math.round(CB.util.clamp(fraccion, 0, 1) * 100) + '%';
  b.appendChild(i);
  return b;
};

/* Reloj de arena de la cuenta atrás */
/* LA CINTA */
CB.ui.cinta = { nodo: null, _salida: null, _clave: null };

CB.ui.cinta.COREOGRAFIAS = {
  'prisa':   { ms: 1900, sfx: 'prisa'      },
  'junta':   { ms: 1300, sfx: 'subirNivel' },
  'sube':    { ms: 1400, sfx: 'subirNivel' },
  'bandera': { ms: 1800, sfx: 'cofre'      }
};

/* La cinta de la pantalla que se está viendo. Se resuelve en cada llamada y no
   se cachea: la partida y el jefe tienen la suya, y cachear la primera dejaba
   al jefe escribiendo en un nodo oculto de otra pantalla. */
CB.ui.cinta.nodoDe = function () {
  const visible = document.querySelector('.pantalla:not([hidden]) .cinta');
  return visible || document.getElementById('cinta');
};

CB.ui.cinta.mostrar = function (clave, texto) {
  const c = CB.ui.cinta;
  const co = c.COREOGRAFIAS[clave];
  const n = c.nodoDe();
  if (!n || !co) return false;

  CB.ui.cinta.ocultar();                 // una cinta a la vez, siempre
  c.nodo = n;
  c._clave = clave;

  let t = n.querySelector('.cinta__texto');
  if (!t) {
    t = CB.ui.crear('span', 'cinta__texto');
    CB.ui.vaciar(n);
    n.appendChild(t);
  }
  t.textContent = String(texto);

  /* Reasignar className entero es lo que quita la coreografía anterior. */
  n.className = 'cinta cinta--' + clave;
  n.hidden = false;
  n.style.animationDuration = co.ms + 'ms';
  void n.offsetWidth;                    // reinicia la animación
  n.classList.add('cinta--entra');

  if (co.sfx) CB.audio.sfx(co.sfx);

  c._salida = setTimeout(function () { CB.ui.cinta.ocultar(); }, co.ms);
  return true;
};

CB.ui.cinta.ocultar = function () {
  const c = CB.ui.cinta;
  if (c._salida) { clearTimeout(c._salida); c._salida = null; }
  const n = c.nodo || c.nodoDe();
  c._clave = null;
  if (!n) return;
  n.classList.remove('cinta--entra');
  n.hidden = true;
};

/* EL FESTEJO */
CB.ui.festejo = { _salida: null, _clave: null };

CB.ui.festejo.CELEBRACIONES = {
  /* El acierto de todos los días. Sin banda, sin texto grande, sin parar nada. */
  normal:     { vehiculo: 'insignia', ms:  700, sfx: 'acierto' },
  /* Le ha costado y lo ha sacado: Cubi salta. */
  esfuerzo:   { vehiculo: 'criatura', ms: 1100, sfx: 'acierto',
                quien: 'cubi', gesto: 'acierto' },
  /* Acierta tras haber fallado. El acierto que más pesa: se lleva la banda. */
  superacion: { vehiculo: 'cinta',    ms: 1300, sfx: 'subirNivel', coreo: 'junta' },
  /* Racha, veta o mundo nuevo: Chispa gira y estalla el surtidor. */
  hallazgo:   { vehiculo: 'criatura', ms: 1400, sfx: 'gema',
                quien: 'chispa', gesto: 'racha', particulas: true },
  /* Logro o luz extra: un cartel centrado con bisel, no una franja. */
  logro:      { vehiculo: 'cartel',   ms: 1600, sfx: 'luzExtra' },

  vetaSuperada: { vehiculo: 'cinta',  ms: 1400, sfx: 'subirNivel', coreo: 'sube' },
  /* El jefe cede. Cuatro veces en la vida de un perfil. */
  jefe:       { vehiculo: 'cinta',    ms: 1800, sfx: 'cofre', coreo: 'bandera' },
  /* Bloque raro, 1 de cada 20: tiembla la cantera entera. */
  raro:       { vehiculo: 'sacudida', ms: 1200, sfx: 'cofre', particulas: true },

  animo:      { vehiculo: 'criatura', ms: 1100, sfx: null,
                quien: 'rocarr', gesto: 'pista' }
};

/* Las cuatro categorías de acierto de js/25-mensajes.js, cada una con su
   celebración. No se sortea: acertar a la segunda después de haber fallado (C)
   no es lo mismo que acertar a la primera (A). */
CB.ui.festejo.POR_CATEGORIA = {
  A: 'normal', B: 'esfuerzo', C: 'superacion', D: 'hallazgo'
};

/* NUNCA menos que antes: acortar la espera recortaría tiempo de lectura, que es justo lo contrario de lo que se busca. */
CB.ui.festejo.MS_POR_PALABRA = 350;
CB.ui.festejo.TOPE_LECTURA = 3200;

/**
 * @param texto opcional: si se pasa, la espera se estira para poder leerlo.
 *
 * EL TERCER PARÁMETRO ES OPCIONAL A PROPÓSITO. Sin él, esta función devuelve
 * exactamente lo que devolvía antes, y eso es lo que permite que las llamadas y
 * los guardianes viejos sigan valiendo. Un global habría cambiado todas a la vez.
 *
 * 350 ms POR PALABRA, TOPE 3200. El mensaje típico de acierto son 13-15 palabras
 * y la espera era de 1600 ms: 560 palabras por minuto. Un lector de 2.º va a
 * 60-90, así que la única parte del mensaje que enseña algo —la frase de
 * procedimiento— no se leía nunca.
 *
 * Con 700 ms/palabra, que sería el ritmo real de lectura, esas 13 palabras darían
 * 9,1 s recortados al tope: el juego se congelaría 5,2 s en casi todos los
 * aciertos, doce veces por sesión. Eso contradice de frente el principio de que
 * la fricción vive en la matemática y en ningún otro sitio. Con 350 se dobla el
 * tiempo de lectura sin convertir cada acierto en una espera.
 */
CB.ui.festejo.espera = function (clave, minimoMs, texto) {
  const c = CB.ui.festejo.CELEBRACIONES[clave];
  const m = minimoMs || 0;
  let lectura = texto
    ? CB.util.palabras(texto).length * CB.ui.festejo.MS_POR_PALABRA : 0;
  if (lectura > CB.ui.festejo.TOPE_LECTURA) lectura = CB.ui.festejo.TOPE_LECTURA;
  return Math.max(m, c ? c.ms + 400 : 0, lectura);
};

CB.ui.festejo.limpiar = function () {
  const f = CB.ui.festejo;
  if (f._salida) { clearTimeout(f._salida); f._salida = null; }
  f._clave = null;
  CB.ui.cinta.ocultar();
  CB.ui.insignia(0);
  CB.ui.cartel(null);
  const z = document.getElementById('zona-juego');
  if (z) z.classList.remove('zona-juego--sacude');
};

/**
 * Celebra algo. `texto` es el grito corto; el mensaje entero sigue quieto en
 * #item-mensaje, que es donde se puede leer.
 * @param clave una de CELEBRACIONES
 * @param texto grito corto (lo usan cinta y cartel; los demás vehículos no)
 * @param extra {bono} gemas de rapidez, para la insignia
 */
CB.ui.festejo.mostrar = function (clave, texto, extra) {
  const f = CB.ui.festejo;
  const c = f.CELEBRACIONES[clave];
  if (!c) return false;

  CB.ui.festejo.limpiar();          // una celebración a la vez, siempre
  f._clave = clave;
  extra = extra || {};

  if (c.vehiculo === 'cinta') {
    CB.ui.cinta.mostrar(c.coreo, texto);
    return true;                     // la cinta trae su propio sonido y salida
  }

  if (c.vehiculo === 'insignia') {
    CB.ui.insignia(1 + (extra.bono || 0));
  } else if (c.vehiculo === 'criatura') {
    CB.ui.personaje(c.quien, c.gesto);
  } else if (c.vehiculo === 'cartel') {
    CB.ui.cartel(texto);
  } else if (c.vehiculo === 'sacudida') {
    const z = document.getElementById('zona-juego');
    if (z) { void z.offsetWidth; z.classList.add('zona-juego--sacude'); }
  }

  if (c.particulas) {
    CB.ui.particulasDe(document.getElementById('item-enunciado'),
                       'var(--deco-cristal-cla)');
  }
  if (c.sfx) CB.audio.sfx(c.sfx);

  if (c.ms > 0) {
    f._salida = setTimeout(function () { CB.ui.festejo.limpiar(); }, c.ms);
  }
  return true;
};

/* «+1», «+3»: brota junto al contador de gemas y se apaga. Es el acierto de
   todos los días, y por eso es lo más pequeño del juego. */
CB.ui.insignia = function (n) {
  const el = document.getElementById('insignia-gemas');
  if (!el) return;
  el.classList.remove('insignia--brota');
  if (!(n > 0)) { el.hidden = true; return; }
  el.textContent = '+' + n;
  el.hidden = false;
  void el.offsetWidth;
  el.classList.add('insignia--brota');
};

/* Cartel centrado con bisel, para el logro y la luz extra. No es una franja:
   esa es la diferencia con la cinta, y es la que se ve de un vistazo. */
CB.ui.cartel = function (texto) {
  const el = document.getElementById('cartel-festejo');
  if (!el) return;
  el.classList.remove('cartel--brota');
  if (!texto) { el.hidden = true; return; }
  el.textContent = String(texto);
  el.hidden = false;
  void el.offsetWidth;
  el.classList.add('cartel--brota');
};

CB.ui.reloj = {
  caja: null, arena: null, cifra: null, alta: null, baja: null,
  _tic: null, _finMs: 0, _totalMs: 0, _ultimoSeg: -1, _avisado: false
};

CB.ui.reloj.SEG_PRISA = 10;          // cuándo sale «Hurry up!»
CB.ui.reloj.PASOS_ARENA = 20;        // la arena baja a saltos de un veinteavo

CB.ui.reloj.montar = function () {
  const r = CB.ui.reloj;
  if (r.caja) return r.caja;
  r.caja  = document.getElementById('hud-reloj');
  r.cifra = document.getElementById('hud-segundos');
  r.alta  = document.getElementById('ra-alta');
  r.baja  = document.getElementById('ra-baja');
  r.arena = r.caja ? r.caja.querySelector('.reloj__arena') : null;
  return r.caja;
};

/** @param ms duración total; 0 o negativo = sin cuenta atrás (modo «Sin prisa») */
CB.ui.reloj.arrancar = function (ms) {
  const r = CB.ui.reloj;
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
    r.arena.classList.remove('reloj__arena--voltea');
    void r.arena.offsetWidth;                 // reinicia la animación
    r.arena.classList.add('reloj__arena--voltea');
  }

  CB.ui.reloj.pintar(ms);
  r._tic = setInterval(CB.ui.reloj.paso, 100);
  return true;
};

CB.ui.reloj.parar = function () {
  const r = CB.ui.reloj;
  if (r._tic) { clearInterval(r._tic); r._tic = null; }
  if (r.caja) {
    r.caja.hidden = true;
    r.caja.classList.remove('reloj--prisa');
  }
  CB.ui.reloj.ocultarCartel(true);
};

CB.ui.reloj.paso = function () {
  const r = CB.ui.reloj;
  const resta = r._finMs - CB.util.ahora();
  if (resta <= 0) {
    CB.ui.reloj.pintar(0);
    if (r._tic) { clearInterval(r._tic); r._tic = null; }
    return;
  }
  CB.ui.reloj.pintar(resta);
};

CB.ui.reloj.pintar = function (restaMs) {
  const r = CB.ui.reloj;
  if (!r.caja) return;

  /* Arena: fracción QUE QUEDA, redondeada a veinteavos. Sin redondear se ve
     una barra de progreso; redondeada se ve arena. */
  const frac = CB.util.clamp(restaMs / (r._totalMs || 1), 0, 1);
  const p = Math.round(frac * CB.ui.reloj.PASOS_ARENA) / CB.ui.reloj.PASOS_ARENA;
  if (r.alta) r.alta.style.height = Math.round(p * 100) + '%';
  if (r.baja) r.baja.style.height = Math.round((1 - p) * 100) + '%';

  const seg = Math.ceil(restaMs / 1000);
  if (seg === r._ultimoSeg) return;
  r._ultimoSeg = seg;
  if (r.cifra) r.cifra.textContent = String(seg);

  if (seg <= CB.ui.reloj.SEG_PRISA) {
    r.caja.classList.add('reloj--prisa');
    if (r.cifra) {
      r.cifra.classList.remove('reloj__cifra--late');
      void r.cifra.offsetWidth;
      r.cifra.classList.add('reloj__cifra--late');
    }
    if (!r._avisado) { r._avisado = true; CB.ui.reloj.gritar(); }
  }
};

/* «Hurry up!» sube desde abajo. El texto va en inglés porque así se pidió; el
   aviso que oye un lector de pantalla va en español y se dice UNA vez. */
CB.ui.reloj.gritar = function () {
  CB.ui.cinta.mostrar('prisa', 'Hurry up!');

  CB.a11y.urgente('Quedan diez segundos.');
};

CB.ui.reloj.ocultarCartel = function () {
  CB.ui.cinta.ocultar();
};
