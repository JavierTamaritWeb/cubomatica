/* 99-arranque.js — ÚNICO DOMContentLoaded del proyecto */

var CB = CB || {};
CB.perfil = null;

/* Manejadores globales de error */
window.onerror = function (mensaje, fuente, linea, col, error) {
  try { CB.pantallas.fallo(error || { message: mensaje }); } catch (e) { }
  return false;
};
window.addEventListener('unhandledrejection', function (ev) {
  try { CB.pantallas.fallo(ev.reason || { message: 'promesa rechazada' }); } catch (e) { }
});

/* Calibración jugable: 4 ítems POR CURSO, sin cronómetro, sin luces, sin nota.
   El banco de 2.º es el original; cada curso nuevo trae el suyo con su fase de
   contenido. ITEMS apunta al banco del perfil activo desde iniciar(). */
CB.calibracion = {
  BANCOS: {
    1: [
      { consigna: 'Toca el número más grande.', opciones: [7, 9], respuesta: 9,
        destreza: 'numeracion' },
      { consigna: '3 + 2', respuesta: 5, destreza: 'suma_sin_llevar', teclado: true },
      { consigna: '8 − 3', respuesta: 5, destreza: 'resta_sin_llevar', teclado: true },
      { consigna: '6 + 4', respuesta: 10, destreza: 'suma_sin_llevar', teclado: true }
    ],
    2: [
      { consigna: 'Toca el número más grande.', opciones: [34, 43], respuesta: 43,
        destreza: 'valor_posicional' },
      { consigna: '23 + 14', respuesta: 37, destreza: 'suma_sin_llevar', teclado: true },
      { consigna: '47 − 12', respuesta: 35, destreza: 'resta_sin_llevar', teclado: true },
      { consigna: '28 + 15', respuesta: 43, destreza: 'suma_llevada', teclado: true }
    ]
  },
  indice: 0,
  aciertos: 0
};
CB.calibracion.ITEMS = CB.calibracion.BANCOS[2];

CB.calibracion.iniciar = function () {
  CB.calibracion.indice = 0;
  CB.calibracion.aciertos = 0;
  CB.calibracion.ITEMS =
    CB.calibracion.BANCOS[CB.catalogo.cursoDe(CB.perfil)] || CB.calibracion.BANCOS[2];
  CB.pantallas.ir('p-calibracion');
  CB.calibracion.servir();
};

CB.calibracion.servir = function () {
  const i = CB.calibracion.indice;

  if (i >= CB.calibracion.ITEMS.length) { CB.calibracion.terminar(); return; }

  const it = CB.calibracion.ITEMS[i];
  /* Lo lee el botón del altavoz de esta pantalla: aquí no hay estado de partida
     de donde sacar el enunciado. */
  CB.calibracion.consignaActual = it.consigna;

  /* Decir dónde está y por qué no hay reloj. Sin esto son cuatro preguntas
     sueltas que parecen una partida a la que le falta el cronómetro. */
  const paso = document.getElementById('cal-paso');
  if (paso) {
    paso.textContent = 'Pregunta ' + (i + 1) + ' de ' + CB.calibracion.ITEMS.length +
      ' · Sin reloj y sin puntos: solo para saber por dónde empezar.';
  }

  const enun = document.getElementById('cal-enunciado');
  CB.ui.vaciar(enun);
  enun.appendChild(CB.ui.crear('p',
    'enunciado' + (it.teclado ? ' enunciado--operacion' : ''), it.consigna));

  /* Voz automática: la consigna se lee sola. En la primera partida de su vida,
     el niño no tiene por qué saber que existe el botón del altavoz. */
  CB.voz.leer(it.consigna);
  CB.a11y.anunciar(it.consigna);

  let contestada = false;

  function responder(valor) {
    if (contestada) return;
    contestada = true;
    const ok = Number(valor) === it.respuesta;
    if (ok) CB.calibracion.aciertos++;
    /* Sin cronómetro, sin luces, sin puntuación: esto no parece un test. */
    CB.ui.mensaje(ok ? '¡Muy bien!' : 'Vamos con la siguiente.', ok ? 'acierto' : 'animo');
    CB.audio.sfx(ok ? 'acierto' : 'picar');
    CB.calibracion.indice++;
    const indiceEsperado = CB.calibracion.indice;
    setTimeout(function () {
      if (CB.pantallas.actual !== 'p-calibracion' ||
          CB.calibracion.indice !== indiceEsperado) return;
      CB.ui.ocultarMensaje();
      CB.calibracion.servir();
    }, 1300);
  }

  CB.pantallas.actual = 'p-calibracion';
  if (it.teclado) {
    CB.componentes.tecladoBloques(it, responder, { bloqueoMs: 300 });
  } else {
    const ops = it.opciones.map(function (v) { return { valor: v }; });
    CB.componentes.opciones4(it, ops, responder, { bloqueoMs: 300 });
  }
};

CB.calibracion.terminar = function () {
  const perfil = CB.perfil;
  const a = CB.calibracion.aciertos;

  /* trimestreDeclarado se DEDUCE, nunca se pregunta (§7.2). */
  const porResultado = (a >= 4) ? 3 : (a === 3 ? 2 : 1);
  let porCalendario = CB.CURRICULO.trimestrePorFecha(CB.util.hoyISO());
  if (porCalendario === 'verano') porCalendario = 3;

  /* Se toma el MENOR de los dos: más vale empezar por debajo y subir. */
  perfil.trimestreDeducido = Math.min(porResultado, porCalendario);
  perfil.calibrado = true;

  /* Los 4 resultados fijan el theta inicial de cada destreza tocada. */
  const hoy = CB.util.hoyISO();
  CB.calibracion.ITEMS.forEach(function (it, i) {
    const d = perfil.destrezas[it.destreza] ||
            (perfil.destrezas[it.destreza] = CB.adaptativo.nuevaDestreza(hoy));
    d.theta = (i < a) ? 1080 : 920;
  });

  CB.almacen.guardarPerfil(perfil);

  const cierre = '¡Ya está! Ya sabemos por dónde empezar. Ahora sí empieza el ' +
               'juego: con reloj, con luces y con gemas. Puedes parar cuando ' +
               'quieras con Pausa.';
  const paso = document.getElementById('cal-paso');
  if (paso) paso.textContent = cierre;
  CB.ui.mensaje(cierre, 'acierto');
  CB.a11y.anunciar(cierre);
  CB.voz.leer(cierre);

  /* Adelantarlo serviría el primer ítem con el trimestre por defecto en vez del recién calibrado — un fallo silencioso: la partida arranca igual, solo que con la dificultad equivocada. */
  setTimeout(function () {
    if (CB.pantallas.actual !== 'p-calibracion' || CB.perfil !== perfil) return;
    CB.ui.ocultarMensaje();
    CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  }, 3400);
};

/* Perfiles */
CB.perfiles = {};

CB.perfiles.pintar = function () {
  const cont = document.getElementById('lista-perfiles');
  if (!cont) return;
  CB.ui.vaciar(cont);

  const idx = CB.almacen.indice();
  idx.forEach(function (e) {
    const t = CB.ui.crear('div', 'tarjeta-perfil');
    const av = CB.ui.crear('div', 'tarjeta-perfil__avatar');
    const pal = CB.datos.AVATARES[CB.util.clamp(e.avatar || 0, 0, 15)];
    av.style.background = pal.casco;
    t.appendChild(av);
    t.appendChild(CB.ui.crear('div', null, e.mote));
    t.appendChild(CB.ui.boton('Jugar', 'btn-bloque--primario btn-bloque--ancho', function () {
      CB.perfiles.activar(e.id);
    }));
    cont.appendChild(t);
  });

  const ap = CB.almacen.ajustesDispositivo();
  const tope = ap.modoAula ? CB.almacen.TOPES.aula.perfiles : CB.almacen.TOPES.domestico.perfiles;
  const btn = document.getElementById('btn-nuevo-perfil');
  if (btn) {
    btn.hidden = idx.length >= tope;
    btn.onclick = function () { CB.perfiles.crear(); };
  }
};

/* Paso previo a crear: «¿En qué curso está?». El curso se DECLARA una vez —
   es un dato administrativo que quien crea el perfil sabe con certeza —, y
   después solo el panel del adulto puede cambiarlo; el trimestre, en cambio,
   se sigue DEDUCIENDO en la calibración (§7.2). Los cursos ofrecidos salen de
   cursosDisponibles(): cuando una fase añada 3.º-6.º, aparecerán solos. */
CB.perfiles.crear = function () {
  const cont = document.getElementById('lista-perfiles');
  const btnNuevo = document.getElementById('btn-nuevo-perfil');
  if (!cont) { CB.perfiles.crearConCurso(2); return; }

  CB.ui.vaciar(cont);
  if (btnNuevo) btnNuevo.hidden = true;

  const pregunta = CB.ui.crear('p', 'texto', '¿En qué curso de Primaria está?');
  pregunta.id = 'pregunta-curso';
  cont.appendChild(pregunta);

  const fila = CB.ui.crear('div', 'fila fila--centro');
  fila.setAttribute('role', 'group');
  fila.setAttribute('aria-labelledby', 'pregunta-curso');
  CB.catalogo.cursosDisponibles().forEach(function (c) {
    fila.appendChild(CB.ui.boton(c + '.º', 'btn-bloque--primario', function () {
      CB.perfiles.crearConCurso(c);
    }));
  });
  cont.appendChild(fila);

  cont.appendChild(CB.ui.boton('◀ Volver', '', function () {
    CB.perfiles.pintar();
  }));
  CB.a11y.anunciar('¿En qué curso de Primaria está?');
};

CB.perfiles.crearConCurso = function (curso) {
  const idx = CB.almacen.indice();
  const hoy = CB.util.hoyISO();
  const semilla = CB.util.hash32(hoy + idx.length + (CB.almacen.bytesUsados() || 0));
  const rng = CB.util.mulberry32(semilla);

  /* El mote sale de la lista CERRADA de 120: jamás nombre real, correo, edad ni
     ubicación (§15.8). */
  const usados = idx.map(function (e) { return e.mote; });
  const libres = CB.datos.MOTES.filter(function (m) { return usados.indexOf(m) === -1; });
  const mote = CB.util.elegir(rng, libres.length ? libres : CB.datos.MOTES);
  const avatar = CB.util.ent(rng, 0, 15);
  const id = 'p-' + semilla.toString(16);

  /* Los ajustes se COPIAN del último perfil como valor por defecto; nunca se
     heredan de forma implícita después (§15.2). */
  let previos = null;
  if (idx.length) {
    const ultimo = CB.almacen.leerPerfil(idx[idx.length - 1].id);
    if (ultimo && ultimo.ajustes && !ultimo.error) {
      previos = JSON.parse(JSON.stringify(ultimo.ajustes));
    }
  }

  const perfil = CB.almacen.perfilNuevo(id, mote, avatar, hoy, previos);
  perfil.curso = CB.util.clamp(curso || 2, 1, 6);
  CB.almacen.guardarPerfil(perfil);
  CB.almacen.fijarUltimoPerfil(id);
  CB.perfiles.activar(id);
};

CB.perfiles.activar = function (id) {
  const p = CB.almacen.leerPerfil(id);
  if (!p) return;
  if (p.error) {

    CB.a11y.anunciar(p.mensaje);
    CB.pantallas.ir('p-perfiles');
    const lista = document.getElementById('lista-perfiles');
    if (lista && lista.parentNode) {
      let aviso = document.getElementById('aviso-perfil-roto');
      if (!aviso) {
        aviso = CB.ui.crear('p', 'texto texto--menor');
        aviso.id = 'aviso-perfil-roto';
        aviso.setAttribute('role', 'alert');
        lista.parentNode.insertBefore(aviso, lista);
      }
      aviso.textContent = p.mensaje;
    }
    return;
  }
  CB.perfil = p;
  CB.almacen.fijarUltimoPerfil(id);
  CB.almacen.podar(p, {});
  CB.memoria.reclasificarTodo(p, CB.util.hoyISO());
  CB.a11y.aplicarAjustes(p.ajustes, CB.almacen.ajustesDispositivo());
  CB.pantallas.ir('p-portada');
};

/* Ajustes visibles para el niño */
CB.ajustesNino = function (props) {
  const cont = document.getElementById('lista-ajustes');
  if (!cont) return;
  CB.ui.vaciar(cont);
  const perfil = CB.perfil;

  const enPausa = !!(props && props.desdePausa) ||
                !!(CB.partida.estado && CB.partida.estado.pausada);
  const titulo = document.getElementById('ajustes-titulo');
  if (titulo) titulo.textContent = enPausa ? 'En pausa' : 'Ajustes';
  let numeroAjuste = 0;

  function fila(etiqueta, valor, alPulsar) {
    const f = CB.ui.crear('div', 'ajuste');
    const numero = ++numeroAjuste;
    const rotulo = CB.ui.crear('span', 'ajuste__etiqueta', etiqueta);
    rotulo.id = 'ajuste-nino-etiqueta-' + numero;
    f.appendChild(rotulo);
    const b = CB.ui.boton(valor, '', function () { alPulsar(b); });
    b.id = 'ajuste-nino-control-' + numero;
    b.setAttribute('aria-labelledby', rotulo.id + ' ' + b.id);
    f.appendChild(b);
    cont.appendChild(f);
    return b;
  }

  const ap = CB.almacen.ajustesDispositivo();
  const botonSonido = fila('Sonido', CB.audio.silenciado ? 'No' : 'Sí', function (b) {
    const s = CB.audio.silenciar(!CB.audio.silenciado);
    ap.silencio = s;
    CB.almacen.guardarAjustesDispositivo(ap);
    b.textContent = s ? 'No' : 'Sí';
    b.setAttribute('aria-pressed', s ? 'false' : 'true');
  });
  botonSonido.setAttribute('aria-pressed', CB.audio.silenciado ? 'false' : 'true');

  /* La música tiene su propio nivel, aparte del de los efectos, y llega hasta el silencio total en un solo toque. */
  fila('Música', CB.musica.NIVELES[CB.musica.nivelActual()].etiqueta, function (b) {
    const i = (CB.musica.nivelActual() + 1) % CB.musica.NIVELES.length;
    CB.musica.fijarNivel(i);
    ap.nivelMusica = i;
    CB.almacen.guardarAjustesDispositivo(ap);
    b.textContent = CB.musica.NIVELES[i].etiqueta;
  });

  if (perfil) {
    /* Los tres modos se pueden cambiar también desde la pausa. Los rótulos y el
       orden salen de CB.modos: aquí vivía una copia a mano de los tres nombres. */
    fila('Modo de juego', CB.modos.etiqueta(perfil.ajustes.modoTiempo), function (b) {
      perfil.ajustes.modoTiempo = CB.modos.siguiente(perfil.ajustes.modoTiempo);
      b.textContent = CB.modos.etiqueta(perfil.ajustes.modoTiempo);
      if (CB.partida.estado) CB.partida.estado.modoTiempo = perfil.ajustes.modoTiempo;
      CB.almacen.guardarPerfil(perfil);
    });
    const botonLetra = fila('Letra grande', perfil.ajustes.letraGrande ? 'Sí' : 'No', function (b) {
      perfil.ajustes.letraGrande = !perfil.ajustes.letraGrande;
      b.textContent = perfil.ajustes.letraGrande ? 'Sí' : 'No';
      b.setAttribute('aria-pressed', perfil.ajustes.letraGrande ? 'true' : 'false');
      CB.a11y.aplicarAjustes(perfil.ajustes, ap);
      CB.almacen.guardarPerfil(perfil);
    });
    botonLetra.setAttribute('aria-pressed', perfil.ajustes.letraGrande ? 'true' : 'false');
    const botonVoz = fila('Leer en voz alta', perfil.ajustes.voz ? 'Sí' : 'No', function (b) {
      perfil.ajustes.voz = !perfil.ajustes.voz;
      CB.voz.activa = perfil.ajustes.voz;
      b.textContent = perfil.ajustes.voz ? 'Sí' : 'No';
      b.setAttribute('aria-pressed', perfil.ajustes.voz ? 'true' : 'false');
      CB.almacen.guardarPerfil(perfil);
    });
    botonVoz.setAttribute('aria-pressed', perfil.ajustes.voz ? 'true' : 'false');
  }

  /* PRIMERO, no al final de la lista: es lo que ha venido a hacer. */
  if (CB.partida.estado && CB.partida.estado.pausada) {
    cont.insertBefore(
      CB.ui.boton('◀ Seguir cavando', 'btn-bloque--primario btn-bloque--medio',
        function () { CB.partida.reanudar(); }),
      cont.firstChild);
  }
};

/* Créditos */
/* Dónde suena cada pista, dicho como lo diría un niño. */
CB.DONDE_SUENA = {
  temaPrincipal: 'el tema del juego',
  victoria:      'al terminar la partida',
  mundoPradera:  'en la Pradera de los Números',
  mundoBosque:   'en el Bosque de las Llevadas',
  mundoRio:      'en el Río de los Problemas',
  mundoMina:     'en la Mina de las Veces',
  jefe:          'con los guardianes',
  calma:         'en los descansos',
  cantera:       'en las vetas y el álbum'
};

CB.creditos = function () {
  const legal = document.getElementById('creditos-legal');
  const curri = document.getElementById('creditos-curriculo');
  const mus = document.getElementById('creditos-musica');

  if (mus) {
    CB.ui.vaciar(mus);
    mus.appendChild(CB.ui.crear('h2', null, 'Música'));
    CB.musica.CREDITOS.forEach(function (c) {
      const linea = CB.DONDE_SUENA[c.clave] + ' — ' + c.autor + ' (Pixabay ' + c.id + ')';
      mus.appendChild(CB.ui.crear('p', 'texto texto--menor', linea));
    });
    mus.appendChild(CB.ui.crear('p', 'texto texto--menor', CB.musica.LICENCIA));
  }
  if (legal) {
    CB.ui.vaciar(legal);
    legal.appendChild(CB.ui.crear('h2', null, 'Aviso legal'));
    legal.appendChild(CB.ui.crear('p', 'texto texto--menor', CB.LEGAL.AVISO));
    /* La versión se enseña aquí y en ningún otro sitio del juego: es lo que un
       adulto necesita decir por teléfono cuando algo no le funciona. */
    legal.appendChild(CB.ui.crear('p', 'texto texto--menor', 'Versión ' + CB.VERSION));
  }
  if (curri) {
    CB.ui.vaciar(curri);
    curri.appendChild(CB.ui.crear('h2', null, 'Currículo'));
    curri.appendChild(CB.ui.crear('p', 'texto texto--menor', CB.LEGAL.ALCANCE));
    curri.appendChild(CB.ui.crear('p', 'texto texto--menor', CB.LEGAL.SECUENCIACION));
    curri.appendChild(CB.ui.crear('p', 'texto texto--menor', CB.LEGAL.MULTIPLICACION));
    curri.appendChild(CB.ui.crear('p', 'texto texto--menor', CB.datos.ORIGEN_GLOSARIO));
  }
};

/* Enganches de pantalla */
/* El rotulo del boton de modo. Se pinta al entrar y tras cada toque: el modo
   tambien se cambia desde Ajustes, desde la pausa y desde el panel del adulto,
   asi que el mapa no puede darlo por sabido. */
CB.pintarBotonModo = function () {
  const b = document.getElementById('btn-modo');
  if (!b || !CB.perfil) return null;
  b.textContent = 'Modo: ' + CB.modos.etiqueta(CB.perfil.ajustes.modoTiempo);
  return b;
};

CB.pantallas.alEntrar['p-mapa'] = function () {
  CB.pintarBotonModo();
  CB.mapaDestrezas.pintarMundos();
  /* Con un solo mundo abierto, el foco va al único botón que hace algo. */
  const abiertos = CB.MUNDOS.filter(function (m) {
    return CB.perfil && CB.perfil.mundos[m.id] && CB.perfil.mundos[m.id].desbloqueado;
  });
  if (abiertos.length === 1) {
    const rejilla = document.getElementById('rejilla-mundos');
    const cavar = rejilla ? rejilla.querySelector('.btn-bloque--primario') : null;
    if (cavar) CB.a11y.enfocar(cavar);
  }
};
CB.pantallas.alEntrar['p-cantera'] = function () { CB.mapaDestrezas.pintar(); };
CB.pantallas.alEntrar['p-casa'] = function () { CB.casa.pintar(); };
CB.pantallas.alEntrar['p-glosario'] = function () { CB.casa.pintarGlosario(); };
CB.pantallas.alEntrar['p-ajustes'] = function (props) { CB.ajustesNino(props); };
CB.pantallas.alEntrar['p-perfiles'] = function () { CB.perfiles.pintar(); };
CB.pantallas.alEntrar['p-adulto'] = function () { CB.adulto.abrir(); };
CB.pantallas.alEntrar['p-creditos'] = function () { CB.creditos(); };

/* Al abandonar la tarjeta de reparación por cualquier vía (Escape, fin de
   partida, cambio de pantalla) hay que matar sus temporizadores. */
CB.pantallas.alSalir['p-reparacion'] = function () { CB.ui.limpiarReparacion(); };

CB.pantallas.alSalir['p-partida'] = function () { CB.ui.reloj.parar(); };

/* Arranque */
CB.arranque = function () {
  const t0 = CB.util.ahora();

  CB.texturas.generarTodas();
  CB.sprites.precalentar();

  CB.ui.iniciarParticulas();

  const ap = CB.almacen.ajustesDispositivo();
  CB.audio.silenciado = !!ap.silencio;
  CB.audio.vol = (ap.volumen == null) ? 0.7 : ap.volumen;
  CB.audio.conectarVisibilidad();
  CB.musica.iniciar();
  CB.voz.precargar();

  CB.pantallas.conectar();
  CB.a11y.conectarTeclado();
  CB.partida.conectarBarra();
  /* El silencio guardado ya está aplicado (CB.audio.silenciado, arriba); esto
     hace que los iconos lo cuenten en vez de mostrar siempre el altavoz. */
  CB.partida.sincronizarSonido();

  /* Perfil activo */
  const ultimo = CB.almacen.ultimoPerfil();
  const idx = CB.almacen.indice();
  if (ultimo && idx.some(function (e) { return e.id === ultimo; })) {
    const p = CB.almacen.leerPerfil(ultimo);
    if (p && !p.error) {
      CB.perfil = p;
      CB.almacen.podar(p, {});                 // poda también AL ARRANCAR
      CB.memoria.reclasificarTodo(p, CB.util.hoyISO());
      CB.a11y.aplicarAjustes(p.ajustes, ap);
    }
  }

  /* Botones de la portada */
  const jugar = document.getElementById('btn-jugar');
  if (jugar) {
    jugar.addEventListener('click', function () {
      CB.audio.iniciar();                      // primer gesto real del usuario
      if (!CB.perfil) { CB.pantallas.ir('p-perfiles'); return; }
      if (!CB.perfil.calibrado) { CB.calibracion.iniciar(); return; }
      if (CB.partida.hayPartidaGuardada(CB.perfil)) {
        CB.partida.reanudarGuardada(CB.perfil);
        return;
      }
      CB.pantallas.ir('p-mapa');
    });
  }

  const btnModo = document.getElementById('btn-modo');
  if (btnModo) {
    btnModo.addEventListener('click', function () {
      if (!CB.perfil) return;
      CB.perfil.ajustes.modoTiempo = CB.modos.siguiente(CB.perfil.ajustes.modoTiempo);
      CB.almacen.guardarPerfil(CB.perfil);
      CB.pintarBotonModo();
      /* El lector de pantalla no ve el rotulo cambiar solo: el boton se queda
         enfocado y su nombre accesible ES su texto, asi que hay que decirlo. */
      CB.a11y.anunciar('Modo ' + CB.modos.etiqueta(CB.perfil.ajustes.modoTiempo));
    });
  }

  const tranquila = document.getElementById('btn-tranquila');
  if (tranquila) {
    tranquila.addEventListener('click', function () {
      CB.audio.iniciar();
      if (!CB.perfil) { CB.pantallas.ir('p-perfiles'); return; }
      CB.partida.iniciar({ mundoId: 'M1', modo: 'tranquila' });
    });
  }

  const otra = document.getElementById('btn-otra');
  if (otra) {
    /* Un solo toque, sin diálogos (§3.7). */
    otra.addEventListener('click', function () {
      const m = CB.perfil ? CB.mapaDestrezas.mundoActual(CB.perfil).id : 'M1';
      CB.partida.iniciar({ mundoId: m, modo: 'expedicion' });
    });
  }

  const tranquilaFin = document.getElementById('btn-tranquila-fin');
  if (tranquilaFin) {
    tranquilaFin.addEventListener('click', function () {
      CB.partida.iniciar({ mundoId: 'M1', modo: 'tranquila' });
    });
  }

  /* Momento socioafectivo del fin de partida */
  const caras = document.querySelectorAll('#fin-animo .animo__cara');
  let i;
  for (i = 0; i < caras.length; i++) {
    (function (b) {
      b.addEventListener('click', function () {
        if (!CB.perfil) return;
        const v = parseInt(b.getAttribute('data-animo'), 10);
        CB.perfil.animo.push({ fechaISO: CB.util.hoyISO(), cara: v });
        const h = CB.perfil.historial;
        if (h.length) h[h.length - 1].animo = v;
        const todas = document.querySelectorAll('#fin-animo .animo__cara');
        let j;
        for (j = 0; j < todas.length; j++) todas[j].setAttribute('aria-pressed', 'false');
        b.setAttribute('aria-pressed', 'true');
        CB.almacen.guardarPerfil(CB.perfil);
      });
    })(caras[i]);
  }

  CB.arranque.conectarSonidoBotones(document);
  CB.arranque.conectarSonidoTeclas(document);

  /* Guardado ante cierre y cambio de pestaña */
  window.addEventListener('pagehide', function () {
    if (!CB.perfil) return;
    if (CB.partida.estado) CB.partida.guardarEnCurso();
    CB.almacen.podar(CB.perfil, {});
    CB.almacen.guardarPerfil(CB.perfil);
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && CB.perfil) {
      if (CB.partida.estado) CB.partida.guardarEnCurso();
      CB.almacen.guardarPerfil(CB.perfil);
    }
  });

  /* Volver de una recarga sin perder la partida */
  if (!CB.perfil) CB.pantallas.ir('p-perfiles');
  else if (CB.arranque.esRecarga(CB.perfil, Date.now()) &&
           CB.partida.hayPartidaGuardada(CB.perfil)) {
    CB.pantallas.ir('p-portada');           // deja la portada debajo, para «Salir»
    CB.partida.reanudarGuardada(CB.perfil);
  }
  else CB.pantallas.ir('p-portada');

  CB.arranqueMs = Math.round(CB.util.ahora() - t0);
  return CB.arranqueMs;
};

CB.arranque.MS_RECARGA = 60000;

/* El botón de la portada dice lo que va a pasar */
CB.arranque.rotuloJugar = function (perfil) {
  if (!perfil || !perfil.calibrado) return 'EMPEZAR';
  if (CB.partida.hayPartidaGuardada(perfil)) return 'SEGUIR JUGANDO';
  return 'JUGAR';
};

CB.arranque.pistaJugar = function (perfil) {
  if (!perfil) return 'Primero elegimos quién juega.';
  if (!perfil.calibrado) {
    return 'Primero, ' + CB.calibracion.ITEMS.length +
           ' preguntas para saber por dónde empezar. Sin reloj y sin puntos.';
  }
  if (CB.partida.hayPartidaGuardada(perfil)) return 'Tienes una expedición a medias.';
  return '';
};

/* PINTA, no navega: el contrato de alEntrar (ver casos-regresiones.js, E1). */
CB.pantallas.alEntrar['p-portada'] = function () {
  const b = document.getElementById('btn-jugar');
  if (b) b.textContent = CB.arranque.rotuloJugar(CB.perfil);
  const p = document.getElementById('portada-pista');
  if (p) p.textContent = CB.arranque.pistaJugar(CB.perfil);
};

CB.arranque.esRecarga = function (perfil, ahoraMs) {
  const g = perfil && perfil.partidaEnCurso;
  if (!g || g.guardadaTs == null) return false;
  return (ahoraMs - g.guardadaTs) < CB.arranque.MS_RECARGA;
};

/* UN GESTO, UN SONIDO */
CB.arranque.clicDiferido = function (antes) {
  setTimeout(function () {
    if (CB.audio.emitidos !== antes) return;      // el gesto ya ha hablado
    CB.audio.sfx('pulsar');
  }, 0);
};

/* CUALQUIER GESTO ABRE EL AUDIO, no solo JUGAR. */
CB.arranque.despertarAudio = function (ev) {
  if (ev && ev.isTrusted === false) return false;
  try { CB.audio.iniciar(); } catch (e) { }
  return true;
};

/* UN SOLO OYENTE, en el documento y en fase de captura. */
CB.arranque.conectarSonidoBotones = function (raiz) {
  if (!raiz) return false;
  const marca = raiz.documentElement || raiz;
  if (marca.getAttribute && marca.getAttribute('data-clic') === 'si') return false;
  if (marca.setAttribute) marca.setAttribute('data-clic', 'si');

  raiz.addEventListener('click', function (ev) {
    let b = ev.target;
    if (!b || !b.closest) return;
    b = b.closest('button');
    if (!b || b.disabled) return;
    CB.arranque.despertarAudio(ev);
    CB.arranque.clicDiferido(CB.audio.emitidos);
  }, true);
  return true;
};

/* Y LAS TECLAS TAMBIÉN */
CB.arranque.TECLAS_MUDAS = ['Shift', 'Control', 'Alt', 'AltGraph', 'Meta',
  'CapsLock', 'NumLock', 'ScrollLock', 'ContextMenu', 'Dead', 'Unidentified'];

CB.arranque.esCampo = function (el) {
  if (!el || !el.tagName) return false;
  const t = el.tagName;
  if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return true;
  return el.isContentEditable === true;
};

CB.arranque.esActivable = function (el) {
  if (!el || !el.tagName) return false;
  const t = el.tagName;
  if (t === 'BUTTON' || t === 'SUMMARY') return true;
  return t === 'A' && el.hasAttribute('href');
};

CB.arranque.conectarSonidoTeclas = function (raiz) {
  if (!raiz) return false;
  const marca = raiz.documentElement || raiz;
  if (marca.getAttribute && marca.getAttribute('data-clic-tecla') === 'si') return false;
  if (marca.setAttribute) marca.setAttribute('data-clic-tecla', 'si');

  raiz.addEventListener('keydown', function (ev) {
    if (ev.repeat) return;
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (CB.arranque.TECLAS_MUDAS.indexOf(ev.key) !== -1) return;
    if (CB.arranque.esCampo(ev.target)) return;
    if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
      if (CB.arranque.esActivable(raiz.activeElement || document.activeElement)) return;
    }
    CB.arranque.despertarAudio(ev);
    CB.arranque.clicDiferido(CB.audio.emitidos);
  }, true);
  return true;
};

document.addEventListener('DOMContentLoaded', function () {
  /* La suite de pruebas carga los mismos 43 scripts pero NO debe arrancar una
     partida: monta su propio banco de pruebas sobre los mismos módulos. */
  if (!document.getElementById('btn-jugar')) return;

  try { CB.offline.registrar(); } catch (eSW) { }

  try {
    CB.arranque();
  } catch (e) {
    CB.pantallas.fallo(e);
  }
});
