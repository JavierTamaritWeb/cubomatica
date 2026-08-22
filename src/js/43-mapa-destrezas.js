/* 43-mapa-destrezas.js — La Cantera: el mapa de vetas del niño */

var CB = CB || {};
CB.mapaDestrezas = CB.mapaDestrezas || {};

CB.mapaDestrezas.verTodo = false;

CB.mapaDestrezas.mundoActual = function (perfil) {
  let i, m, ultimo = CB.MUNDOS[0];
  for (i = 0; i < CB.MUNDOS.length; i++) {
    m = CB.MUNDOS[i];
    if (perfil.mundos[m.id] && perfil.mundos[m.id].desbloqueado) ultimo = m;
  }
  return ultimo;
};

CB.mapaDestrezas.pintar = function () {
  const perfil = CB.perfil;
  if (!perfil) return;
  const hoy = CB.util.hoyISO();
  const cont = document.getElementById('rejilla-vetas');
  if (!cont) return;
  CB.ui.vaciar(cont);

  const mundo = CB.mapaDestrezas.mundoActual(perfil);
  const ids = CB.mapaDestrezas.verTodo ? CB.catalogo.ids() : mundo.niveles;
  const frontera = CB.grafo.frontera(perfil);

  const pista = document.getElementById('cantera-pista');
  if (pista) {
    pista.textContent = CB.mapaDestrezas.verTodo
      ? 'Toda la cantera'
      : 'Lo siguiente que puedes cavar — ' + mundo.nombre;
  }

  const conteo = { bloqueado: 0, nuevo: 0, aprendiendo: 0, afianzada: 0, dominada: 0, oxidada: 0 };

  ids.forEach(function (id) {
    const nivel = CB.catalogo.get(id);
    if (!nivel) return;
    const bloqueado = CB.grafo.estado(id, perfil) === 'bloqueado';
    const d = perfil.destrezas[nivel.destreza];
    const estadoNivel = perfil.niveles[id];

    let estado;
    if (bloqueado) estado = 'bloqueado';
    else if (!estadoNivel || !estadoNivel.n) estado = 'nuevo';
    else estado = CB.memoria.clasificar(d, hoy, false);
    conteo[estado] = (conteo[estado] || 0) + 1;

    const veta = CB.ui.crear('div', 'veta');
    veta.setAttribute('data-estado', estado);
    veta.setAttribute('role', 'img');
    /* Nunca solo color: icono + nombre + estado en texto (§10.4). */
    veta.setAttribute('aria-label', nivel.nombre + ': ' + CB.memoria.ETIQUETA[estado]);
    veta.appendChild(CB.ui.crear('span', 'veta__icono', CB.memoria.ICONO[estado]));
    veta.appendChild(CB.ui.crear('span', null, nivel.nombre));
    veta.appendChild(CB.ui.crear('span', 'texto texto--menor', CB.memoria.ETIQUETA[estado]));

    if (frontera.indexOf(id) !== -1) veta.classList.add('veta--frontera');
    if (estado === 'oxidada') veta.classList.add('veta--musgo');
    if (nivel.ampliacion) {
      const dist = CB.ui.crear('span', 'distintivo', 'ampliación');
      veta.appendChild(dist);
    }
    cont.appendChild(veta);
  });

  const ley = document.getElementById('leyenda-vetas');
  if (ley) {
    CB.ui.vaciar(ley);
    ['dominada', 'afianzada', 'aprendiendo', 'oxidada', 'nuevo', 'bloqueado'].forEach(function (k) {
      if (!conteo[k]) return;
      const s = CB.ui.crear('span', null,
        CB.memoria.ICONO[k] + ' ' + conteo[k] + ' ' + CB.memoria.ETIQUETA[k] + '   ');
      ley.appendChild(s);
    });
    if (conteo.oxidada) {
      ley.appendChild(CB.ui.crear('p', 'texto texto--menor',
        'Las vetas con musgo se repasan en dos minutos.'));
    }
  }

  const btn = document.getElementById('btn-toda-cantera');
  if (btn) {
    btn.textContent = CB.mapaDestrezas.verTodo ? 'Ver solo mi mundo' : 'Ver toda la cantera';
    btn.onclick = function () {
      CB.mapaDestrezas.verTodo = !CB.mapaDestrezas.verTodo;
      CB.mapaDestrezas.pintar();
    };
  }
};

/* El mapa de mundos */
CB.mapaDestrezas.pintarMundos = function () {
  const perfil = CB.perfil;
  if (!perfil) return;
  const cont = document.getElementById('rejilla-mundos');
  if (!cont) return;
  CB.ui.vaciar(cont);

  const saludo = document.getElementById('mapa-saludo');
  if (saludo) {
    /* CB.partida sigue usando vencidosHoy para elegir qué servir: son dos preguntas distintas y solo una se le enseña al niño. */
    const conMusgo = CB.memoria.conMusgo(perfil, CB.util.hoyISO());
    saludo.textContent = conMusgo.length
      ? ('Hay ' + conMusgo.length + (conMusgo.length === 1 ? ' veta' : ' vetas') +
         ' con musgo esperándote.')
      : ('Hola, ' + perfil.mote + '.');
  }

  CB.partida.desbloquearMundos();

  CB.MUNDOS.forEach(function (m) {
    const estado = perfil.mundos[m.id] || { desbloqueado: false };
    const prog = CB.catalogo.progresoMundo(m.id, perfil);
    const tarjeta = CB.ui.crear('div', 'tarjeta-mundo');
    tarjeta.setAttribute('data-bloqueado', estado.desbloqueado ? 'no' : 'si');

    const cinta = CB.ui.crear('div', 'tarjeta-mundo__cinta');
    cinta.setAttribute('data-bioma', m.bioma);
    tarjeta.appendChild(cinta);

    tarjeta.appendChild(CB.ui.crear('h2', null, m.nombre));   /* h2, no h3: el h1 es el de la pantalla y saltarse un nivel rompe la navegacion por encabezados */

    /* M4 lleva el distintivo INICIACIÓN con nota tocable que explica en lenguaje
       llano por qué la multiplicación es iniciación (§6.5). */
    if (m.distintivo) {
      const d = CB.ui.crear('button', 'distintivo', m.distintivo);
      d.type = 'button';
      d.addEventListener('click', function () {
        CB.a11y.anunciar(CB.LEGAL.MULTIPLICACION);
        let nota = document.getElementById('nota-iniciacion');
        if (!nota) {
          nota = CB.ui.crear('p', 'texto texto--menor');
          nota.id = 'nota-iniciacion';
          tarjeta.appendChild(nota);
        }
        nota.textContent = CB.LEGAL.MULTIPLICACION;
      });
      tarjeta.appendChild(d);
    }

    tarjeta.appendChild(CB.ui.barra(prog.fraccion));
    tarjeta.appendChild(CB.ui.crear('p', 'texto texto--menor',
      prog.hechos + ' de ' + prog.total + ' vetas abiertas'));

    if (estado.desbloqueado) {
      tarjeta.appendChild(CB.ui.boton('Cavar aquí', 'btn-bloque--primario btn-bloque--ancho',
        function () { CB.partida.iniciar({ mundoId: m.id, modo: 'expedicion' }); }));

      /* El jefe NO bloquea el paso al mundo siguiente: cierra el mundo con una
         victoria (§5.3). */
      if (prog.fraccion >= 0.6) {
        tarjeta.appendChild(CB.ui.boton(m.jefeIcono + ' Reto: ' + m.jefe, 'btn-bloque--ancho',
          function () { CB.jefes.iniciar(m.id); }));
      }

      /* Se lee aquí, y solo aquí: es un RECUERDO retrospectivo, no una apuesta. */
      if (estado.jefeSinFallos) {
        tarjeta.appendChild(CB.ui.crear('span', 'distintivo', 'cerrado sin un fallo'));
      }
    } else {
      tarjeta.appendChild(CB.ui.crear('p', 'texto texto--menor',
        'Se abre al cavar más vetas del mundo anterior.'));
    }
    cont.appendChild(tarjeta);
  });
};
