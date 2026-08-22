/* 06-a11y.js — Accesibilidad: región viva, foco y mapa de teclado */

var CB = CB || {};
CB.a11y = CB.a11y || {};

CB.a11y.ultimoAnuncio = '';

CB.a11y.anunciar = function (texto) {
  const r = document.getElementById('region-viva');
  if (!r || !texto) return;
  /* Si el texto es idéntico al anterior, el lector de pantalla no lo repite.
     Se alterna un espacio final para forzar el anuncio. */
  const t = (texto === CB.a11y.ultimoAnuncio) ? (texto + ' ') : texto;
  CB.a11y.ultimoAnuncio = t;
  r.textContent = t;
};

/* La SEGUNDA región viva, y por qué hacen falta dos */
CB.a11y.ultimaUrgencia = '';

CB.a11y.urgente = function (texto) {
  const r = document.getElementById('region-urgente');
  if (!r || !texto) return;
  const t = (texto === CB.a11y.ultimaUrgencia) ? (texto + ' ') : texto;
  CB.a11y.ultimaUrgencia = t;
  r.textContent = t;
};

CB.a11y.enfocar = function (el) {
  if (!el) return;
  try { el.focus({ preventScroll: false }); } catch (e) { try { el.focus(); } catch (e2) { } }
};

/* Primer elemento enfocable de una pantalla. */
CB.a11y.primerEnfocable = function (contenedor) {
  if (!contenedor) return null;
  return contenedor.querySelector(
    'button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled])'
  );
};

/* Mapa de teclado (PLAN §16.5) */
CB.a11y.MAPA = {
  leer: ['l', 'L'],
  pista: ['p', 'P'],
  confirmar: ['Enter'],
  borrar: ['Backspace', 'Delete']
};

CB.a11y.conectarTeclado = function () {
  document.addEventListener('keydown', function (ev) {
    /* ← PRIMERA LÍNEA. El bloqueo de 800 ms vale también para el teclado. */
    if (CB.partida && CB.partida.bloqueado) {
      if (ev.key !== 'Tab' && ev.key !== 'Escape') {
        ev.preventDefault();
        if (CB.audio) CB.audio.sfx('toc');
      }
      return;
    }

    if (CB.pantallas.actual !== 'p-partida' &&
        CB.pantallas.actual !== 'p-calibracion' &&
        CB.pantallas.actual !== 'p-jefe') return;

    const k = ev.key;

    if (CB.a11y.MAPA.leer.indexOf(k) !== -1) {
      ev.preventDefault();
      if (CB.partida && CB.partida.accionLeer) CB.partida.accionLeer();
      return;
    }
    if (CB.a11y.MAPA.pista.indexOf(k) !== -1) {
      ev.preventDefault();
      if (CB.partida && CB.partida.accionPista) CB.partida.accionPista();
      return;
    }

    if (CB.componentes && CB.componentes.tecla) {
      if (CB.componentes.tecla(k, ev)) ev.preventDefault();
    }
  });
};

/* Movimiento del foco por una rejilla con las flechas. */
CB.a11y.conectarFlechas = function (contenedor, columnas) {
  if (!contenedor) return;
  contenedor.addEventListener('keydown', function (ev) {
    const teclas = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];
    if (teclas.indexOf(ev.key) === -1) return;
    const botones = [].slice.call(contenedor.querySelectorAll('button:not([disabled])'));
    const i = botones.indexOf(document.activeElement);
    if (i === -1) return;
    ev.preventDefault();
    let d = 0;
    if (ev.key === 'ArrowRight') d = 1;
    if (ev.key === 'ArrowLeft') d = -1;
    if (ev.key === 'ArrowDown') d = columnas;
    if (ev.key === 'ArrowUp') d = -columnas;
    const j = CB.util.clamp(i + d, 0, botones.length - 1);
    CB.a11y.enfocar(botones[j]);
  });
};

/* Ajustes de accesibilidad sobre la raíz del documento */
CB.a11y.aplicarAjustes = function (ajustes, ajustesAparato) {
  const raiz = document.documentElement;
  ajustes = ajustes || {};
  ajustesAparato = ajustesAparato || {};

  raiz.classList.toggle('letra-grande', !!ajustes.letraGrande);
  raiz.classList.toggle('alto-contraste', !!ajustes.altoContraste);
  raiz.classList.toggle('modo-proyeccion', !!ajustesAparato.modoProyeccion);

  const rm = ajustes.reduceMotion;
  let prefiereReducir = false;
  try {
    prefiereReducir = (typeof matchMedia !== 'undefined') &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { }
  raiz.classList.toggle('sin-movimiento', rm === 'si' || (rm !== 'no' && prefiereReducir));

  CB.voz.activa = ajustes.voz !== false;
};

/* Descripción textual del estado de las luces, para lector de pantalla.
   Nunca «has perdido una vida»: mismo vocabulario que ve el niño. */
CB.a11y.textoLuces = function (luces, tope) {
  if (luces <= 0) return 'Se han apagado todas las luces del casco.';
  return luces + (luces === 1 ? ' luz encendida' : ' luces encendidas') +
         ' de ' + tope + '.';
};
