/* ============================================================================
   32-componentes.js — Los 7 formatos de respuesta
   ----------------------------------------------------------------------------
   tecladoBloques · opciones4 · selectorSigno · balanza · ordenarFila · monedas
   · selectorDatos

   TODOS son manejables SOLO CON TECLADO (criterio de HECHO de F8) y todos
   respetan los 800 ms de construcción visible: los botones se montan bloque a
   bloque, quedan grises con el bisel hundido, y un toque prematuro produce un
   «toc» de madera y un desplazamiento de 2 px. NUNCA en silencio: un botón
   inerte y mudo hace que el niño crea que el juego está roto (§3.5).

   ARRASTRAR Y SOLTAR NO ES NUNCA LA VÍA ÚNICA (§16.1): «ordenar» se resuelve
   tocando en secuencia.
   ========================================================================== */

var CB = CB || {};
CB.componentes = CB.componentes || {};

CB.componentes.MS_CONSTRUCCION = 800;
CB.componentes.MS_POR_BLOQUE = 200;

CB.componentes.actual = null;      // {tipo, valor(), reset(), item}
CB.componentes._valor = '';
CB.componentes._seleccion = [];
CB.componentes._confirmacionPendiente = false;

CB.componentes.contenedor = function () {
  return document.getElementById(
    CB.pantallas.actual === 'p-calibracion' ? 'cal-respuesta' : 'item-respuesta'
  );
};

/* ── Construcción visible + bloqueo ─────────────────────────────────────── */
CB.componentes.montar = function (contenedor, bloqueoMs, alDesbloquear) {
  var ms = (bloqueoMs == null) ? CB.componentes.MS_CONSTRUCCION : bloqueoMs;
  var botones = [].slice.call(contenedor.querySelectorAll('button'));
  var i;

  for (i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
    botones[i].classList.add('btn-bloque--monta');
  }
  if (CB.partida) CB.partida.bloqueado = true;

  setTimeout(function () {
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

/* Toque prematuro: «toc» de madera y desplazamiento de 2 px.

   SE REGISTRA UNA SOLA VEZ POR CONTENEDOR. Esto no es una precaución teórica:
   `contenedor()` devuelve #item-respuesta, que es un nodo PERMANENTE del
   index.html —se vacía y se rellena en cada ítem, pero no se sustituye—, y
   conectarToc() se llama desde los siete componentes de respuesta, es decir una
   vez por ítem. Sin este cerrojo, en el ítem 12 había once oyentes sobre el
   mismo elemento y un solo toque prematuro reproducía el «toc» ONCE VECES
   simultáneas: un chasquido cada vez más fuerte que además empeoraba cuanto más
   jugaba el niño. Medido en navegador, no deducido.

   Se marca con un atributo y no con una propiedad JS porque el atributo se ve
   en el inspector, y el día que alguien dude de si esto sigue vivo lo comprueba
   mirando, sin leer este comentario. */
CB.componentes.conectarToc = function (contenedor) {
  if (!contenedor || contenedor.getAttribute('data-toc') === 'si') return;
  contenedor.setAttribute('data-toc', 'si');

  contenedor.addEventListener('pointerdown', function (ev) {
    if (!CB.partida || !CB.partida.bloqueado) return;
    var b = ev.target;
    if (b && b.classList && b.classList.contains('btn-bloque')) {
      b.classList.add('btn-bloque--toc');
      setTimeout(function () { b.classList.remove('btn-bloque--toc'); }, 260);
    }
    CB.audio.sfx('toc');
    ev.preventDefault();
  });
};

/* ── Confirmación de doble toque, tras detectar azar (§12.3) ────────────── */
CB.componentes.pedirConfirmacion = function (boton, alConfirmar) {
  if (!CB.componentes._confirmacionPendiente) { alConfirmar(); return; }
  if (boton.getAttribute('data-confirmando') === 'si') {
    boton.removeAttribute('data-confirmando');
    alConfirmar();
    return;
  }
  var previos = document.querySelectorAll('[data-confirmando="si"]');
  var i;
  for (i = 0; i < previos.length; i++) previos[i].removeAttribute('data-confirmando');
  boton.setAttribute('data-confirmando', 'si');
  boton.classList.add('btn-bloque--hundido');
  setTimeout(function () { boton.classList.remove('btn-bloque--hundido'); }, 300);
  CB.a11y.anunciar('Toca otra vez para confirmar.');
};

/* ══ 1. TECLADO DE BLOQUES ═════════════════════════════════════════════════ */
CB.componentes.tecladoBloques = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);
  CB.componentes._valor = '';

  var visor = CB.ui.crear('div', 'visor-respuesta');
  visor.id = 'visor-respuesta';
  visor.setAttribute('role', 'status');
  visor.setAttribute('aria-live', 'polite');
  visor.setAttribute('aria-label', 'Tu respuesta');
  cont.appendChild(visor);

  var teclado = CB.ui.crear('div', 'teclado-bloques');
  var teclas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', 'OK'];
  var i;

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
      CB.componentes.pedirConfirmacion(boton, function () {
        alResponder(parseInt(CB.componentes._valor, 10), 'teclado');
      });
      return;
    }
    if (CB.componentes._valor.length >= 3) return;      // techo 999
    CB.componentes._valor += t;
    pinta();
    CB.audio.sfx('picar');
  }

  for (i = 0; i < teclas.length; i++) {
    (function (t) {
      var b = CB.ui.boton(t, t === 'OK' ? 'btn-bloque--primario' : '', function () {
        pulsa(t, b);
      }, { tecla: t === '⌫' ? 'borrar' : (t === 'OK' ? 'ok' : t) });
      b.setAttribute('aria-label', t === '⌫' ? 'Borrar' : (t === 'OK' ? 'Confirmar' : t));
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
      if (k === 'Backspace' || k === 'Delete') { pulsa('⌫', null); return true; }
      if (k === 'Enter') {
        if (CB.componentes._valor.length) alResponder(parseInt(CB.componentes._valor, 10), 'teclado');
        return true;
      }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* ══ 2. OPCIONES 4 ═════════════════════════════════════════════════════════ */
CB.componentes.opciones4 = function (item, opcionesValores, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  var rej = CB.ui.crear('div', 'rejilla-respuestas');
  var i;

  for (i = 0; i < opcionesValores.length; i++) {
    (function (op, idx) {
      var etiqueta = (op.texto != null) ? op.texto : String(op.valor);
      var b = CB.ui.boton(etiqueta, '', function () {
        if (CB.partida && CB.partida.bloqueado) return;
        CB.componentes.pedirConfirmacion(b, function () {
          alResponder(op.valor, 'opciones', { posicion: idx, codigoError: op.codigoError });
        });
      }, { posicion: idx });
      if (op.texto != null) b.style.fontSize = 'var(--tam-texto-min)';
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
      var n = parseInt(k, 10);
      if (n >= 1 && n <= opcionesValores.length) {
        var b = rej.querySelectorAll('button')[n - 1];
        if (b && !b.disabled) b.click();
        return true;
      }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* ══ 3. SELECTOR DE SIGNO ══════════════════════════════════════════════════ */
CB.componentes.selectorSigno = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  var fila = CB.ui.crear('div', 'rejilla-respuestas');
  ['+', '−'].forEach(function (s, idx) {
    var b = CB.ui.boton(s, '', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      alResponder(s === '+' ? '+' : '-', 'signo', { posicion: idx });
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

/* ══ 4. BALANZA ════════════════════════════════════════════════════════════ */
CB.componentes.balanza = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  var fila = CB.ui.crear('div', 'rejilla-respuestas');
  var signos = item.opcionesFijas || ['>', '<', '='];
  var etiquetas = { '>': 'mayor que', '<': 'menor que', '=': 'igual que' };

  signos.forEach(function (s, idx) {
    var b = CB.ui.boton(s, '', function () {
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
      var n = parseInt(k, 10);
      if (n >= 1 && n <= signos.length) {
        var b = fila.querySelectorAll('button')[n - 1];
        if (b && !b.disabled) b.click();
        return true;
      }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* ══ 5. ORDENAR FILA (por toque, nunca solo por arrastre) ══════════════════ */
CB.componentes.ordenarFila = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);
  CB.componentes._seleccion = [];

  var huecos = CB.ui.crear('div', 'fila-ordenar');
  var i;
  for (i = 0; i < item.orden.length; i++) {
    var h = CB.ui.crear('span', 'hueco-orden', '·');
    h.setAttribute('data-hueco', i);
    huecos.appendChild(h);
  }
  cont.appendChild(CB.ui.crear('p', 'consigna-respuesta', 'Toca los números en orden.'));
  cont.appendChild(huecos);

  var piezas = CB.ui.crear('div', 'fila-ordenar');
  item.piezas.forEach(function (v, idx) {
    var b = CB.ui.boton(String(v), '', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      if (b.disabled) return;
      var pos = CB.componentes._seleccion.length;
      CB.componentes._seleccion.push(v);
      var hueco = huecos.querySelector('[data-hueco="' + pos + '"]');
      if (hueco) hueco.textContent = String(v);
      b.disabled = true;
      b.classList.add('btn-bloque--hundido');
      CB.audio.sfx('picar');

      if (CB.componentes._seleccion.length === item.orden.length) {
        var correcto = CB.componentes._seleccion.every(function (x, j) {
          return x === item.orden[j];
        });
        alResponder(correcto ? item.respuesta : -1, 'ordenar',
                    { secuencia: CB.componentes._seleccion.slice() });
      }
    }, { posicion: idx });
    b.style.width = '80px'; b.style.height = '80px';
    piezas.appendChild(b);
  });
  cont.appendChild(piezas);

  CB.componentes.conectarToc(cont);
  CB.componentes.montar(cont, opciones.bloqueoMs);
  CB.componentes.actual = { tipo: 'ordenarFila', tecla: function () { return false; } };
  return CB.componentes.actual;
};

/* ══ 6. MONEDAS ════════════════════════════════════════════════════════════ */
CB.componentes.monedas = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  /* Modo «pagar»: el niño elige piezas hasta el importe exacto. */
  if (item.modo === 'pagar') {
    var total = 0;
    var marcador = CB.ui.crear('div', 'visor-respuesta', '0');
    cont.appendChild(marcador);

    var caja = CB.ui.crear('div', 'contenedor-dinero');
    item.disponibles.forEach(function (v, idx) {
      var esMoneda = CB.gen.dinero.esMoneda(v);
      var b = CB.ui.crear('button', esMoneda ? 'moneda' : 'billete', String(v) + ' €');
      b.type = 'button';
      b.setAttribute('aria-label', CB.gen.dinero.nombre(v));
      b.setAttribute('data-posicion', idx);
      b.addEventListener('click', function () {
        if (CB.partida && CB.partida.bloqueado) return;
        total += v;
        marcador.textContent = String(total);
        CB.audio.sfx('gema');
        if (total >= item.objetivo) {
          alResponder(total, 'monedas', {});
        }
      });
      caja.appendChild(b);
    });
    cont.appendChild(caja);

    var deshacer = CB.ui.boton('Empezar de nuevo', '', function () {
      total = 0; marcador.textContent = '0';
    });
    cont.appendChild(deshacer);

    CB.componentes.conectarToc(cont);
    CB.componentes.montar(cont, opciones.bloqueoMs);
    CB.componentes.actual = { tipo: 'monedas', tecla: function () { return false; } };
    return CB.componentes.actual;
  }

  /* Modo «contar»: se muestran las piezas y se responde con teclado. */
  var muestra = CB.ui.crear('div', 'contenedor-dinero');
  (item.piezas || []).forEach(function (v) {
    var esMoneda = CB.gen.dinero.esMoneda(v);
    var p = CB.ui.crear('span', esMoneda ? 'moneda' : 'billete', String(v) + ' €');
    p.setAttribute('aria-label', CB.gen.dinero.nombre(v));
    muestra.appendChild(p);
  });
  var arriba = document.getElementById('item-enunciado');
  if (arriba) arriba.appendChild(muestra);

  return CB.componentes.tecladoBloques(item, alResponder, opciones);
};

/* ══ 7. SELECTOR DE DATOS (3 toques que hacen visible el razonamiento) ═════ */
CB.componentes.selectorDatos = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  var necesarios = item.datoSobrante ? 2 : item.datos.length;
  var elegidos = [];
  var fase = 'datos';
  var signoElegido = null;

  /* El paso 1 SE OMITE si el enunciado tiene exactamente 2 números y el nivel
     no lleva dato sobrante: no se hace perder el tiempo con una decisión que
     no existe (§9.6). */
  if (!item.datoSobrante && item.datos.length === 2) {
    elegidos = item.datos.slice();
    fase = 'operacion';
  }

  var titulo = CB.ui.crear('p', 'consigna-respuesta', '');
  cont.appendChild(titulo);
  var zona = CB.ui.crear('div');
  cont.appendChild(zona);

  function pintarFase() {
    CB.ui.vaciar(zona);

    if (fase === 'datos') {
      titulo.textContent = 'Toca los números que necesitas.';
      var numeros = (item.enunciado.match(/\d+/g) || []).map(Number);
      var rej = CB.ui.crear('div', 'rejilla-respuestas');
      numeros.forEach(function (n, idx) {
        var b = CB.ui.boton(String(n), '', function () {
          if (b.getAttribute('aria-pressed') === 'true') return;
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
      var fila = CB.ui.crear('div', 'rejilla-respuestas');
      ['+', '−'].forEach(function (s, idx) {
        var b = CB.ui.boton(s, '', function () {
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
    CB.componentes._valor = '';
    var visor = CB.ui.crear('div', 'visor-respuesta');
    zona.appendChild(visor);
    var teclado = CB.ui.crear('div', 'teclado-bloques');
    ['1','2','3','4','5','6','7','8','9','⌫','0','OK'].forEach(function (t) {
      var b = CB.ui.boton(t, t === 'OK' ? 'btn-bloque--primario' : '', function () {
        if (t === '⌫') { CB.componentes._valor = CB.componentes._valor.slice(0, -1); }
        else if (t === 'OK') {
          if (!CB.componentes._valor.length) return;
          /* Cada fase se registra por separado: un niño que elige bien los datos
             y la operación pero se equivoca al calcular NO tiene un problema de
             comprensión lectora, y el informe lo dice (§9.6). */
          alResponder(parseInt(CB.componentes._valor, 10), 'datos', {
            datosElegidos: elegidos.slice(),
            signoElegido: signoElegido,
            faseDatosOk: CB.componentes.datosCorrectos(item, elegidos),
            faseOperacionOk: signoElegido === item.operacion
          });
          return;
        } else if (CB.componentes._valor.length < 3) {
          CB.componentes._valor += t;
        }
        visor.textContent = CB.componentes._valor;
      }, { tecla: t });
      teclado.appendChild(b);
    });
    zona.appendChild(teclado);
    CB.a11y.conectarFlechas(teclado, 3);
    CB.componentes.montar(zona, 0);
  }

  pintarFase();
  CB.componentes.conectarToc(cont);
  if (CB.partida) CB.partida.bloqueado = false;

  CB.componentes.actual = { tipo: 'selectorDatos', tecla: function () { return false; } };
  return CB.componentes.actual;
};

CB.componentes.datosCorrectos = function (item, elegidos) {
  if (!item.datos || elegidos.length !== item.datos.length) return false;
  var copia = item.datos.slice(), i, j;
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

/* ── Presentación de cada componente la PRIMERA vez (§7.3) ──────────────── */
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
