/* 32-componentes.js — Los 7 formatos de respuesta */

var CB = CB || {};
CB.componentes = CB.componentes || {};

CB.componentes.MS_CONSTRUCCION = 800;
CB.componentes.MS_POR_BLOQUE = 200;

CB.componentes.actual = null;      // {tipo, valor(), reset(), item}
CB.componentes._valor = '';
CB.componentes._seleccion = [];
CB.componentes._confirmacionPendiente = false;
CB.componentes._montaje = 0;

CB.componentes.contenedor = function () {
  return document.getElementById(
    CB.pantallas.actual === 'p-calibracion' ? 'cal-respuesta' : 'item-respuesta'
  );
};

/* Construcción visible + bloqueo */
CB.componentes.montar = function (contenedor, bloqueoMs, alDesbloquear) {
  const ms = (bloqueoMs == null) ? CB.componentes.MS_CONSTRUCCION : bloqueoMs;
  const botones = [].slice.call(contenedor.querySelectorAll('button'));
  const montaje = ++CB.componentes._montaje;
  let i;

  for (i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
    botones[i].classList.add('btn-bloque--monta');
  }
  if (CB.partida) CB.partida.bloqueado = true;

  setTimeout(function () {
    /* Un montaje anterior puede vencer después de que el siguiente ya haya
       bloqueado sus botones. Solo el montaje más reciente puede abrir el
       cerrojo global, mover el foco o ejecutar su callback. */
    if (montaje !== CB.componentes._montaje) return;
    for (i = 0; i < botones.length; i++) {
      botones[i].disabled = false;
      botones[i].classList.remove('btn-bloque--monta');
      botones[i].classList.add('btn-bloque--destello');
    }
    setTimeout(function () {
      for (i = 0; i < botones.length; i++) botones[i].classList.remove('btn-bloque--destello');
    }, 140);

    if (CB.partida) CB.partida.bloqueado = false;
    /* El foco NO se coloca hasta que expira el bloqueo: si no, el lector de
       pantalla anunciaría botones inertes. */
    if (botones.length) CB.a11y.enfocar(botones[0]);
    if (alDesbloquear) alDesbloquear();
  }, ms);
};

/* Sin este cerrojo, en el ítem 12 había once oyentes sobre el mismo elemento y un solo toque prematuro reproducía el «toc» ONCE VECES simultáneas: un chasquido cada vez más fuerte que además empeoraba cuanto más jugaba el niño. */
CB.componentes.conectarToc = function (contenedor) {
  if (!contenedor || contenedor.getAttribute('data-toc') === 'si') return;
  contenedor.setAttribute('data-toc', 'si');

  contenedor.addEventListener('pointerdown', function (ev) {
    if (!CB.partida || !CB.partida.bloqueado) return;
    const b = ev.target;
    /* Monedas y billetes NO son .btn-bloque, así que durante los 800 ms de
       construcción no recibían ni el «toc» ni la sacudida: se tocaban y no pasaba
       nada de nada, ni siquiera el sonido de «aún no». */
    if (b && b.classList && (b.classList.contains('btn-bloque') ||
        b.classList.contains('pieza'))) {
      b.classList.add('btn-bloque--toc');
      setTimeout(function () { b.classList.remove('btn-bloque--toc'); }, 260);
    }
    CB.audio.sfx('toc');
    ev.preventDefault();
  });
};

/* El primer toque real de un problema de enunciado */
CB.componentes.conectarLectura = function (contenedor) {
  if (!contenedor || contenedor.getAttribute('data-lectura') === 'si') return;
  contenedor.setAttribute('data-lectura', 'si');

  const arranca = function () {
    if (CB.partida && CB.partida.marcarLectura) CB.partida.marcarLectura();
  };
  contenedor.addEventListener('pointerdown', arranca);
  contenedor.addEventListener('keydown', arranca);
};

/* Confirmación de doble toque, tras detectar azar (§12.3) */
CB.componentes.pedirConfirmacion = function (boton, alConfirmar) {
  if (!CB.componentes._confirmacionPendiente) { alConfirmar(); return; }
  if (boton.getAttribute('data-confirmando') === 'si') {
    boton.removeAttribute('data-confirmando');
    alConfirmar();
    return;
  }
  const previos = document.querySelectorAll('[data-confirmando="si"]');
  let i;
  for (i = 0; i < previos.length; i++) previos[i].removeAttribute('data-confirmando');
  boton.setAttribute('data-confirmando', 'si');
  boton.classList.add('btn-bloque--hundido');
  setTimeout(function () { boton.classList.remove('btn-bloque--hundido'); }, 300);
  /* SE VE, no solo se oye. */
  CB.ui.mensaje('Toca otra vez para confirmar.', 'animo');
};

/* 1. TECLADO DE BLOQUES */
/**
 * El teclado numérico. Desde 1.11.0 lo montan DOS sitios: la respuesta normal y
 * la tercera fase de selectorDatos, que antes tenía su propia copia.
 *
 * @param opciones.contenedor  dónde montarlo; por defecto, el de respuesta
 * @param opciones.vaciar      false para conservar lo que ya haya dentro
 */
CB.componentes.tecladoBloques = function (item, alResponder, opciones) {
  opciones = opciones || {};
  const cont = opciones.contenedor || CB.componentes.contenedor();
  if (opciones.vaciar !== false) CB.ui.vaciar(cont);
  CB.componentes._valor = '';

  const visor = CB.ui.crear('div', 'respuesta__visor');
  visor.id = 'visor-respuesta';
  visor.setAttribute('role', 'status');
  visor.setAttribute('aria-live', 'polite');
  visor.setAttribute('aria-label', 'Tu respuesta');
  cont.appendChild(visor);

  const teclado = CB.ui.crear('div', 'teclado-bloques');
  /* Cifras según el RANGO DEL NIVEL (3.1.0): el tope fijo de 3 era el mundo
     de 2.º, y con él un niño de 4.º no podía ni teclear 45.231. La coma y el
     signo solo existen si el ítem los pide (decimales de 4.º-6.º, enteros de
     6.º): en los cursos bajos el teclado es EXACTAMENTE el de siempre. */
  const rangoMax = (item && item.rangoNivel && item.rangoNivel[1]) || 999;
  const maxLargo = String(Math.max(999, rangoMax)).length +
                   (item && item.conComa ? 3 : 0) +
                   (item && item.conSigno ? 1 : 0);
  let teclas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', 'OK'];
  if (item && item.conComa) {
    teclas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', '⌫', 'OK'];
  } else if (item && item.conSigno) {
    teclas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '−', '0', '⌫', 'OK'];
  }
  let i;

  function pinta() {
    visor.textContent = CB.componentes._valor;
  }

  function pulsa(t, boton) {
    if (CB.partida && CB.partida.bloqueado) return;
    if (t === '⌫') {
      CB.componentes._valor = CB.componentes._valor.slice(0, -1);
      pinta(); CB.audio.sfx('toc');
      return;
    }
    if (t === 'OK') {
      if (!CB.componentes._valor.length) return;
      if (!/[0-9]/.test(CB.componentes._valor)) return;   // solo «−» o «,»: nada
      CB.componentes.pedirConfirmacion(boton, function () {
        const bruto = CB.componentes._valor.replace('−', '-').replace(',', '.');
        const v = (item && (item.conComa || item.conSigno))
          ? parseFloat(bruto)
          : parseInt(bruto, 10);
        alResponder(v, 'teclado');
      });
      return;
    }
    if (t === ',') {
      if (CB.componentes._valor.indexOf(',') !== -1) return;   // una coma, no dos
      if (!CB.componentes._valor.length) CB.componentes._valor = '0';
    }
    if (t === '−') {
      /* El signo conmuta y siempre va delante. */
      CB.componentes._valor = (CB.componentes._valor.charAt(0) === '−')
        ? CB.componentes._valor.slice(1)
        : '−' + CB.componentes._valor;
      pinta(); CB.audio.sfx('picar');
      return;
    }
    if (CB.componentes._valor.length >= maxLargo) return;
    CB.componentes._valor += t;
    pinta();
    CB.audio.sfx('picar');
  }

  let botonOK = null;
  for (i = 0; i < teclas.length; i++) {
    (function (t) {

      const b = CB.ui.boton(t, 'teclado-bloques__tecla' +
        (t === 'OK' ? ' btn-bloque--primario' : ''), function () {
        pulsa(t, b);
      }, { tecla: t === '⌫' ? 'borrar' : (t === 'OK' ? 'ok' : t) });
      b.setAttribute('aria-label', t === '⌫' ? 'Borrar' : (t === 'OK' ? 'Confirmar' : t));
      if (t === 'OK') botonOK = b;
      teclado.appendChild(b);
    })(teclas[i]);
  }
  cont.appendChild(teclado);

  CB.componentes.conectarToc(cont);
  CB.a11y.conectarFlechas(teclado, 3);
  CB.componentes.montar(cont, opciones.bloqueoMs);

  CB.componentes.actual = {
    tipo: 'tecladoBloques',
    tecla: function (k) {
      if (/^[0-9]$/.test(k)) { pulsa(k, null); return true; }
      if ((k === ',' || k === '.') && item && item.conComa) { pulsa(',', null); return true; }
      if (k === '-' && item && item.conSigno) { pulsa('−', null); return true; }
      if (k === 'Backspace' || k === 'Delete') { pulsa('⌫', null); return true; }
      /* Iba por su cuenta y se saltaba pedirConfirmacion(), así que la confirmación de dos toques que impone el antiazar tras una detección solo se le aplicaba a quien juega tocando: con teclado, Enter contestaba a la primera. */
      if (k === 'Enter') { pulsa('OK', botonOK); return true; }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* 2. OPCIONES 4 */
CB.componentes.opciones4 = function (item, opcionesValores, alResponder, opciones) {
  opciones = opciones || {};
  const cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  const rej = CB.ui.crear('div', 'rejilla-respuestas');
  /* Las columnas de la retícula miden --lado-respuesta, que en la pantalla más
     estrecha son 64 px; un billete mide 128×64 y desbordaría su celda. Con las
     piezas, el ancho de columna lo manda el contenido. */
  if (item.piezasDinero) rej.classList.add('rejilla-respuestas--dinero');
  /* Opciones-frase (3.2.0): «10 y media» o «litros» no caben en la celda
     cuadrada de una cifra. El modificador deja que el contenido mande. */
  const hayTexto = opcionesValores.some(function (o) {
    return o.texto != null || (typeof o.valor === 'string' && !item.piezasDinero);
  });
  if (hayTexto) rej.classList.add('rejilla-respuestas--texto');
  let i;

  for (i = 0; i < opcionesValores.length; i++) {
    (function (op, idx) {
      let b;
      function elegir() {
        if (CB.partida && CB.partida.bloqueado) return;
        CB.componentes.pedirConfirmacion(b, function () {
          alResponder(op.valor, 'opciones', { posicion: idx, codigoError: op.codigoError });
        });
      }

      if (item.piezasDinero) {
        b = CB.ui.pieza('button', op.valor);
        b.type = 'button';
        b.setAttribute('data-posicion', idx);
        b.addEventListener('click', elegir);
      } else {
        const etiqueta = (op.texto != null) ? op.texto : String(op.valor);
        b = CB.ui.boton(etiqueta, 'rejilla-respuestas__opcion', elegir, { posicion: idx });
      }
      rej.appendChild(b);
    })(opcionesValores[i], i);
  }
  cont.appendChild(rej);

  CB.componentes.conectarToc(cont);
  CB.a11y.conectarFlechas(rej, 2);
  CB.componentes.montar(cont, opciones.bloqueoMs);

  CB.componentes.actual = {
    tipo: 'opciones4',
    tecla: function (k) {
      const n = parseInt(k, 10);
      if (n >= 1 && n <= opcionesValores.length) {
        const b = rej.querySelectorAll('button')[n - 1];
        if (b && !b.disabled) b.click();
        return true;
      }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* 3. SELECTOR DE SIGNO */
CB.componentes.selectorSigno = function (item, alResponder, opciones) {
  opciones = opciones || {};
  const cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  const fila = CB.ui.crear('div', 'rejilla-respuestas');
  ['+', '−'].forEach(function (s, idx) {
    const b = CB.ui.boton(s, 'rejilla-respuestas__opcion', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      /* La misma regla que el teclado y las opciones. Se la saltaba, y con ella
         tres formatos más: una regla aplicada en tres sitios de siete es
         literalmente E44. */
      CB.componentes.pedirConfirmacion(b, function () {
        alResponder(s === '+' ? '+' : '-', 'signo', { posicion: idx });
      });
    }, { posicion: idx });
    b.setAttribute('aria-label', s === '+' ? 'Más, sumar' : 'Menos, restar');
    fila.appendChild(b);
  });
  cont.appendChild(fila);

  CB.componentes.conectarToc(cont);
  CB.componentes.montar(cont, opciones.bloqueoMs);
  CB.componentes.actual = { tipo: 'selectorSigno', tecla: function () { return false; } };
  return CB.componentes.actual;
};

/* 4. BALANZA */
CB.componentes.balanza = function (item, alResponder, opciones) {
  opciones = opciones || {};
  const cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  const fila = CB.ui.crear('div', 'rejilla-respuestas');
  const signos = item.opcionesFijas || ['>', '<', '='];
  const etiquetas = { '>': 'mayor que', '<': 'menor que', '=': 'igual que' };

  signos.forEach(function (s, idx) {
    const b = CB.ui.boton(s, 'rejilla-respuestas__opcion', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      CB.componentes.pedirConfirmacion(b, function () {
        alResponder(s, 'balanza', { posicion: idx });
      });
    }, { posicion: idx });
    b.setAttribute('aria-label', etiquetas[s] || s);
    fila.appendChild(b);
  });
  cont.appendChild(fila);

  CB.componentes.conectarToc(cont);
  CB.a11y.conectarFlechas(fila, 2);
  CB.componentes.montar(cont, opciones.bloqueoMs);
  CB.componentes.actual = {
    tipo: 'balanza',
    tecla: function (k) {
      const n = parseInt(k, 10);
      if (n >= 1 && n <= signos.length) {
        const b = fila.querySelectorAll('button')[n - 1];
        if (b && !b.disabled) b.click();
        return true;
      }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* 5. ORDENAR FILA (por toque, nunca solo por arrastre) */
CB.componentes.ordenarFila = function (item, alResponder, opciones) {
  opciones = opciones || {};
  const cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);
  CB.componentes._seleccion = [];

  const huecos = CB.ui.crear('div', 'fila-ordenar');
  let i;
  for (i = 0; i < item.orden.length; i++) {
    const h = CB.ui.crear('span', 'fila-ordenar__hueco', '·');
    h.setAttribute('data-hueco', i);
    huecos.appendChild(h);
  }
  cont.appendChild(CB.ui.crear('p', 'respuesta__consigna', 'Toca los números en orden.'));
  cont.appendChild(huecos);

  const piezas = CB.ui.crear('div', 'fila-ordenar');

  const usados = [];

  function cerrarSiEstaLlena() {
    if (CB.componentes._seleccion.length !== item.orden.length) return;
    const correcto = CB.componentes._seleccion.every(function (x, j) {
      return x === item.orden[j];
    });
    alResponder(correcto ? item.respuesta : -1, 'ordenar',
                { secuencia: CB.componentes._seleccion.slice() });
  }

  item.piezas.forEach(function (v, idx) {
    const b = CB.ui.boton(String(v), '', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      if (b.disabled) return;
      const pos = CB.componentes._seleccion.length;
      CB.componentes._seleccion.push(v);
      usados.push(b);
      const hueco = huecos.querySelector('[data-hueco="' + pos + '"]');
      if (hueco) hueco.textContent = String(v);
      b.disabled = true;
      b.classList.add('btn-bloque--hundido');
      CB.audio.sfx('picar');

      if (CB.componentes._seleccion.length === item.orden.length) {
        CB.componentes.pedirConfirmacion(b, cerrarSiEstaLlena);
      }
    }, { posicion: idx });
    b.style.width = '80px'; b.style.height = '80px';
    piezas.appendChild(b);
  });
  cont.appendChild(piezas);

  const deshacer = CB.ui.boton('⌫ Quitar', '', function () {
    if (CB.partida && CB.partida.bloqueado) return;
    if (!CB.componentes._seleccion.length) return;
    CB.componentes._seleccion.pop();
    const pieza = usados.pop();
    const pos = CB.componentes._seleccion.length;
    const hueco = huecos.querySelector('[data-hueco="' + pos + '"]');
    if (hueco) hueco.textContent = '·';
    if (pieza) {
      pieza.disabled = false;
      pieza.classList.remove('btn-bloque--hundido');
      pieza.removeAttribute('data-confirmando');
    }
    CB.audio.sfx('toc');
  });
  deshacer.setAttribute('aria-label', 'Quitar el último número colocado');
  cont.appendChild(deshacer);

  CB.componentes.conectarToc(cont);
  CB.componentes.montar(cont, opciones.bloqueoMs);
  CB.componentes.actual = { tipo: 'ordenarFila', tecla: function () { return false; } };
  return CB.componentes.actual;
};

/* 6. MONEDAS */
CB.componentes.monedas = function (item, alResponder, opciones) {
  opciones = opciones || {};
  const cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  /* Modo «pagar»: el niño elige piezas hasta el importe exacto. */
  if (item.modo === 'pagar') {
    let total = 0;
    const marcador = CB.ui.crear('div', 'respuesta__visor', '0');
    cont.appendChild(marcador);

    /* LA FILA DE LO COGIDO: «2 € + 2 € + 1 €». Es lo que de verdad descarga la
       memoria del niño. Con solo el marcador del total, quien va por 5 € no sabe
       si ha cogido dos de 2 y una de 1 o una de 5, y no puede comprobarlo. */
    const cogidas = [];
    const fila = CB.ui.crear('div', 'hilera-cogidas');
    fila.setAttribute('aria-live', 'off');
    cont.appendChild(fila);

    function pintarCogidas() {
      CB.ui.vaciar(fila);
      let j;
      for (j = 0; j < cogidas.length; j++) {
        if (j) fila.appendChild(CB.ui.crear('span', 'hilera-cogidas__mas', '+'));
        fila.appendChild(CB.ui.crear('span', 'hilera-cogidas__pieza', cogidas[j] + ' €'));
      }
    }

    const caja = CB.ui.crear('div', 'contenedor-dinero');
    item.disponibles.forEach(function (v, idx) {
      const b = CB.ui.pieza('button', v);
      b.type = 'button';
      b.setAttribute('data-posicion', idx);
      b.addEventListener('click', function () {
        if (CB.partida && CB.partida.bloqueado) return;
        total += v;
        marcador.textContent = String(total);
        cogidas.push(v);
        /* Y va ANTES de comprobar el objetivo: si fuera después, la pieza que cierra el pago no llegaría a verse marcada nunca. */
        const veces = (parseInt(b.getAttribute('data-veces'), 10) || 0) + 1;
        b.setAttribute('data-veces', String(veces));
        pintarCogidas();
        CB.audio.sfx('gema');
        if (total >= item.objetivo) {
          /* Igual que en la fila de ordenar: la confirmación cuelga del gesto que
             cierra el pago, porque aquí tampoco hay OK. */
          CB.componentes.pedirConfirmacion(b, function () {
            alResponder(total, 'monedas', {});
          });
        }
      });
      caja.appendChild(b);
    });
    cont.appendChild(caja);

    const deshacer = CB.ui.boton('Empezar de nuevo', '', function () {
      total = 0; marcador.textContent = '0';
      /* Y SE LIMPIAN LAS MARCAS. Sin esto, tras reiniciar las piezas seguirían
         contadas: peor que no marcarlas, porque el marcador diría 0 y las monedas
         dirían que se han cogido. */
      cogidas.length = 0;
      pintarCogidas();
      const piezas = caja.querySelectorAll('[data-veces]');
      let k;
      for (k = 0; k < piezas.length; k++) {
        piezas[k].removeAttribute('data-veces');
        piezas[k].removeAttribute('data-confirmando');
      }
    });
    cont.appendChild(deshacer);

    CB.componentes.conectarToc(cont);
    CB.componentes.montar(cont, opciones.bloqueoMs);
    CB.componentes.actual = { tipo: 'monedas', tecla: function () { return false; } };
    return CB.componentes.actual;
  }

  /* Modo «contar»: se muestran las piezas y se responde con teclado. */
  const muestra = CB.ui.crear('div', 'contenedor-dinero');
  (item.piezas || []).forEach(function (v) {
    muestra.appendChild(CB.ui.pieza('span', v));
  });
  const arriba = document.getElementById('item-enunciado');
  if (arriba) arriba.appendChild(muestra);

  return CB.componentes.tecladoBloques(item, alResponder, opciones);
};

/* 7. SELECTOR DE DATOS (3 toques que hacen visible el razonamiento) */
CB.componentes.selectorDatos = function (item, alResponder, opciones) {
  opciones = opciones || {};
  const cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  const necesarios = item.datoSobrante ? 2 : item.datos.length;
  let elegidos = [];
  let fase = 'datos';
  let signoElegido = null;
  /* El teclado que monta la fase 3, para poder cederle las teclas físicas. Antes
     la fase 3 devolvía `tecla: function () { return false; }`: se jugaba con el
     dedo o no se jugaba. */
  let montado = null;

  /* El paso 1 SE OMITE si el enunciado tiene exactamente 2 números y el nivel
     no lleva dato sobrante: no se hace perder el tiempo con una decisión que
     no existe (§9.6). */
  if (!item.datoSobrante && item.datos.length === 2) {
    elegidos = item.datos.slice();
    fase = 'operacion';
  }

  const titulo = CB.ui.crear('p', 'respuesta__consigna', '');
  cont.appendChild(titulo);
  const zona = CB.ui.crear('div');
  cont.appendChild(zona);

  function pintarFase() {
    CB.ui.vaciar(zona);

    if (fase === 'datos') {
      titulo.textContent = 'Toca los números que necesitas.';
      const numeros = (item.enunciado.match(/\d+/g) || []).map(Number);
      const rej = CB.ui.crear('div', 'rejilla-respuestas');
      numeros.forEach(function (n, idx) {
        const b = CB.ui.boton(String(n), 'rejilla-respuestas__opcion', function () {
          if (CB.partida && CB.partida.bloqueado) return;

          if (b.getAttribute('aria-pressed') === 'true') {
            b.setAttribute('aria-pressed', 'false');
            b.classList.remove('btn-bloque--hundido');
            const donde = elegidos.indexOf(n);
            if (donde !== -1) elegidos.splice(donde, 1);
            CB.audio.sfx('toc');
            return;
          }
          b.setAttribute('aria-pressed', 'true');
          b.classList.add('btn-bloque--hundido');
          elegidos.push(n);
          CB.audio.sfx('picar');
          if (elegidos.length === necesarios) { fase = 'operacion'; pintarFase(); }
        }, { posicion: idx });
        b.setAttribute('aria-pressed', 'false');
        rej.appendChild(b);
      });
      zona.appendChild(rej);
      CB.componentes.montar(zona, 0);
      return;
    }

    if (fase === 'operacion') {
      titulo.textContent = '¿Qué hay que hacer?';
      const fila = CB.ui.crear('div', 'rejilla-respuestas');
      ['+', '−'].forEach(function (s, idx) {
        const b = CB.ui.boton(s, 'rejilla-respuestas__opcion', function () {
          signoElegido = (s === '+') ? '+' : '-';
          fase = 'calculo';
          pintarFase();
        }, { posicion: idx });
        b.setAttribute('aria-label', s === '+' ? 'Sumar' : 'Restar');
        fila.appendChild(b);
      });
      zona.appendChild(fila);
      CB.componentes.montar(zona, 0);
      return;
    }

    titulo.textContent = 'Escribe el resultado.';
    /* Volver a elegir los números. La fase salta sola al tocar el último, así que
       sin esto un error en el penúltimo toque era irreparable. Un toque SOLO
       cuando hace falta: quien acierta a la primera no lo ve ni lo paga. */
    const volverDatos = CB.ui.boton('◀ Cambiar los números', '', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      elegidos.length = 0;
      signoElegido = null;
      fase = 'datos';
      pintarFase();
    });
    volverDatos.setAttribute('aria-label', 'Volver a elegir los números del problema');
    zona.appendChild(volverDatos);

    montado = CB.componentes.tecladoBloques(item, function (valor) {
      /* Cada fase se registra por separado: un niño que elige bien los datos y la
         operación pero se equivoca al calcular NO tiene un problema de comprensión
         lectora, y el informe lo dice (§9.6). */
      alResponder(valor, 'datos', {
        datosElegidos: elegidos.slice(),
        signoElegido: signoElegido,
        faseDatosOk: CB.componentes.datosCorrectos(item, elegidos),
        faseOperacionOk: signoElegido === item.operacion
      });
    }, { contenedor: zona, vaciar: false, bloqueoMs: opciones.bloqueoMs });
    /* El teclado se anuncia como suyo; esto sigue siendo el selector de datos. */
    CB.componentes.actual.tipo = 'selectorDatos';
  }

  if (CB.partida) CB.partida.bloqueado = false;
  pintarFase();
  CB.componentes.conectarToc(cont);

  CB.componentes.actual = {
    tipo: 'selectorDatos',
    /* Se consulta al vuelo, no se captura: `montado` no existe hasta que se llega
       a la fase 3, y capturarlo aquí guardaría null para siempre. */
    tecla: function (k) {
      return (montado && montado.tecla) ? montado.tecla(k) : false;
    }
  };
  return CB.componentes.actual;
};

CB.componentes.datosCorrectos = function (item, elegidos) {
  if (!item.datos || elegidos.length !== item.datos.length) return false;
  const copia = item.datos.slice();
  let i, j;
  for (i = 0; i < elegidos.length; i++) {
    j = copia.indexOf(elegidos[i]);
    if (j === -1) return false;
    copia.splice(j, 1);
  }
  return true;
};

/* Puente para el manejador global de teclado de 06-a11y.js. */
CB.componentes.tecla = function (k, ev) {
  if (CB.componentes.actual && CB.componentes.actual.tecla) {
    return CB.componentes.actual.tecla(k, ev);
  }
  return false;
};

/* Presentación de cada componente la PRIMERA vez (§7.3) */
CB.componentes.PRESENTACION = {
  tecladoBloques: 'Escribe el 7',
  opciones4: 'Toca el 5',
  selectorSigno: '¿Aquí va más o menos? 4 __ 2 = 6',
  balanza: '¿Cuál pesa más? 8 y 5',
  monedas: 'Toca la moneda de 2 euros',
  ordenarFila: 'Coloca en orden: 3, 1, 2',
  selectorDatos: 'Toca los dos números del cuento'
};

CB.componentes.necesitaPresentacion = function (perfil, tipo) {
  if (!perfil.componentesVistos) perfil.componentesVistos = [];
  return perfil.componentesVistos.indexOf(tipo) === -1;
};

CB.componentes.marcarVisto = function (perfil, tipo) {
  if (!perfil.componentesVistos) perfil.componentesVistos = [];
  if (perfil.componentesVistos.indexOf(tipo) === -1) perfil.componentesVistos.push(tipo);
};
