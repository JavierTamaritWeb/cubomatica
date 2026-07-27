/* ============================================================================
   99-arranque.js — ÚNICO DOMContentLoaded del proyecto
   ----------------------------------------------------------------------------
   Orden: texturas → sprites → ajustes del aparato → perfil → poda → pantalla.

   NO HAY PANTALLA DE «¿POR DÓNDE VAS EN CLASE?» (PLAN §7.1). La primera pantalla
   que veía un niño de 7 años le pedía declarar su trimestre. Un niño de 2.º no
   sabe qué es un trimestre, no sabe en cuál está y no puede leer la pregunta con
   fluidez el día 1. Era el punto exacto en el que el juego dejaba de ser
   autónomo y exigía un adulto al lado, contradiciendo el criterio de «se abre
   con doble clic».

   El trimestre se DEDUCE de cuatro ítems jugables y del calendario escolar.
   ========================================================================== */

var CB = CB || {};
CB.perfil = null;

/* ── Manejadores globales de error ──────────────────────────────────────── */
window.onerror = function (mensaje, fuente, linea, col, error) {
  try { CB.pantallas.fallo(error || { message: mensaje }); } catch (e) { }
  return false;
};
window.addEventListener('unhandledrejection', function (ev) {
  try { CB.pantallas.fallo(ev.reason || { message: 'promesa rechazada' }); } catch (e) { }
});

/* ── Calibración jugable: 4 ítems, sin cronómetro, sin luces, sin nota ──── */
CB.calibracion = {
  ITEMS: [
    { consigna: 'Toca el número más grande.', opciones: [34, 43], respuesta: 43,
      destreza: 'valor_posicional' },
    { consigna: '23 + 14', respuesta: 37, destreza: 'suma_sin_llevar', teclado: true },
    { consigna: '47 − 12', respuesta: 35, destreza: 'resta_sin_llevar', teclado: true },
    { consigna: '28 + 15', respuesta: 43, destreza: 'suma_llevada', teclado: true }
  ],
  indice: 0,
  aciertos: 0
};

CB.calibracion.iniciar = function () {
  CB.calibracion.indice = 0;
  CB.calibracion.aciertos = 0;
  CB.pantallas.ir('p-calibracion');
  CB.calibracion.servir();
};

CB.calibracion.servir = function () {
  var i = CB.calibracion.indice;

  if (i >= CB.calibracion.ITEMS.length) { CB.calibracion.terminar(); return; }

  var it = CB.calibracion.ITEMS[i];
  /* Lo lee el botón del altavoz de esta pantalla: aquí no hay estado de partida
     de donde sacar el enunciado. */
  CB.calibracion.consignaActual = it.consigna;

  /* Decir dónde está y por qué no hay reloj. Sin esto son cuatro preguntas
     sueltas que parecen una partida a la que le falta el cronómetro. */
  var paso = document.getElementById('cal-paso');
  if (paso) {
    paso.textContent = 'Pregunta ' + (i + 1) + ' de ' + CB.calibracion.ITEMS.length +
      ' · Sin reloj y sin puntos: solo para saber por dónde empezar.';
  }

  var enun = document.getElementById('cal-enunciado');
  CB.ui.vaciar(enun);
  enun.appendChild(CB.ui.crear('p', it.teclado ? 'operacion' : 'enunciado', it.consigna));

  /* Voz automática: la consigna se lee sola. En la primera partida de su vida,
     el niño no tiene por qué saber que existe el botón del altavoz. */
  CB.voz.leer(it.consigna);
  CB.a11y.anunciar(it.consigna);

  /* UNA RESPUESTA POR PREGUNTA. Es el mismo cerrojo que CB.partida.responder, y
     faltaba justo donde más caro sale: los botones siguen vivos los 1.300 ms que
     dura el mensaje, así que machacar el botón —que es exactamente lo que hace
     un niño de 7 años cuando la respuesta le sale sola— contaba un acierto por
     toque. Medido: cinco toques en la primera pregunta dan CINCO aciertos sobre
     cuatro ítems.

     Y esos cuatro aciertos son lo único que decide `trimestreDeducido`, es decir
     el techo de números de todo el juego a partir de ahí. Un niño que empieza en
     el primer trimestre acababa colocado en el tercero por pulsar dos veces. */
  var contestada = false;

  function responder(valor) {
    if (contestada) return;
    contestada = true;
    var ok = Number(valor) === it.respuesta;
    if (ok) CB.calibracion.aciertos++;
    /* Sin cronómetro, sin luces, sin puntuación: esto no parece un test. */
    CB.ui.mensaje(ok ? '¡Muy bien!' : 'Vamos con la siguiente.', ok ? 'acierto' : 'animo');
    CB.audio.sfx(ok ? 'acierto' : 'picar');
    CB.calibracion.indice++;
    setTimeout(function () {
      CB.ui.ocultarMensaje();
      CB.calibracion.servir();
    }, 1300);
  }

  CB.pantallas.actual = 'p-calibracion';
  if (it.teclado) {
    CB.componentes.tecladoBloques(it, responder, { bloqueoMs: 300 });
  } else {
    var ops = it.opciones.map(function (v) { return { valor: v }; });
    CB.componentes.opciones4(it, ops, responder, { bloqueoMs: 300 });
  }
};

CB.calibracion.terminar = function () {
  var perfil = CB.perfil;
  var a = CB.calibracion.aciertos;

  /* trimestreDeclarado se DEDUCE, nunca se pregunta (§7.2). */
  var porResultado = (a >= 4) ? 3 : (a === 3 ? 2 : 1);
  var porCalendario = CB.CURRICULO.trimestrePorFecha(CB.util.hoyISO());
  if (porCalendario === 'verano') porCalendario = 3;

  /* Se toma el MENOR de los dos: más vale empezar por debajo y subir. */
  perfil.trimestreDeducido = Math.min(porResultado, porCalendario);
  perfil.calibrado = true;

  /* Los 4 resultados fijan el theta inicial de cada destreza tocada. */
  var hoy = CB.util.hoyISO();
  CB.calibracion.ITEMS.forEach(function (it, i) {
    var d = perfil.destrezas[it.destreza] ||
            (perfil.destrezas[it.destreza] = CB.adaptativo.nuevaDestreza(hoy));
    d.theta = (i < a) ? 1080 : 920;
  });

  CB.almacen.guardarPerfil(perfil);

  /* Y decir que se ha acabado. Antes las cuatro preguntas terminaban en
     silencio: contestabas la última y aparecías en un mapa, sin que nadie te
     dijera que aquello era la preparación ni que el juego empieza ahora. Quien
     lo probó lo dijo así: «empiezas con una demo y no avisa que es una demo».
     Una prueba que no anuncia que termina no se distingue de una partida que se
     ha roto. */
  var cierre = '¡Ya está! Ya sabemos por dónde empezar. Ahora sí empieza el ' +
               'juego: con reloj, con luces y con gemas.';
  var paso = document.getElementById('cal-paso');
  if (paso) paso.textContent = cierre;
  CB.ui.mensaje(cierre, 'acierto');
  CB.a11y.anunciar(cierre);
  CB.voz.leer(cierre);

  setTimeout(function () {
    CB.ui.ocultarMensaje();
    CB.pantallas.ir('p-mapa');
  }, 3400);
};

/* ── Perfiles ───────────────────────────────────────────────────────────── */
CB.perfiles = {};

CB.perfiles.pintar = function () {
  var cont = document.getElementById('lista-perfiles');
  if (!cont) return;
  CB.ui.vaciar(cont);

  var idx = CB.almacen.indice();
  idx.forEach(function (e) {
    var t = CB.ui.crear('div', 'tarjeta-perfil');
    var av = CB.ui.crear('div', 'avatar-cubi');
    var pal = CB.datos.AVATARES[CB.util.clamp(e.avatar || 0, 0, 15)];
    av.style.background = pal.casco;
    t.appendChild(av);
    t.appendChild(CB.ui.crear('div', null, e.mote));
    t.appendChild(CB.ui.boton('Jugar', 'btn-bloque--primario btn-bloque--ancho', function () {
      CB.perfiles.activar(e.id);
    }));
    cont.appendChild(t);
  });

  var ap = CB.almacen.ajustesDispositivo();
  var tope = ap.modoAula ? CB.almacen.TOPES.aula.perfiles : CB.almacen.TOPES.domestico.perfiles;
  var btn = document.getElementById('btn-nuevo-perfil');
  if (btn) {
    btn.hidden = idx.length >= tope;
    btn.onclick = function () { CB.perfiles.crear(); };
  }
};

CB.perfiles.crear = function () {
  var idx = CB.almacen.indice();
  var hoy = CB.util.hoyISO();
  var semilla = CB.util.hash32(hoy + idx.length + (CB.almacen.bytesUsados() || 0));
  var rng = CB.util.mulberry32(semilla);

  /* El mote sale de la lista CERRADA de 120: jamás nombre real, correo, edad ni
     ubicación (§15.8). */
  var usados = idx.map(function (e) { return e.mote; });
  var libres = CB.datos.MOTES.filter(function (m) { return usados.indexOf(m) === -1; });
  var mote = CB.util.elegir(rng, libres.length ? libres : CB.datos.MOTES);
  var avatar = CB.util.ent(rng, 0, 15);
  var id = 'p-' + semilla.toString(16);

  /* Los ajustes se COPIAN del último perfil como valor por defecto; nunca se
     heredan de forma implícita después (§15.2). */
  var previos = null;
  if (idx.length) {
    var ultimo = CB.almacen.leerPerfil(idx[idx.length - 1].id);
    if (ultimo && ultimo.ajustes && !ultimo.error) {
      previos = JSON.parse(JSON.stringify(ultimo.ajustes));
    }
  }

  var perfil = CB.almacen.perfilNuevo(id, mote, avatar, hoy, previos);
  CB.almacen.guardarPerfil(perfil);
  CB.almacen.fijarUltimoPerfil(id);
  CB.perfiles.activar(id);
};

CB.perfiles.activar = function (id) {
  var p = CB.almacen.leerPerfil(id);
  if (!p) return;
  if (p.error) {
    /* Se queda EN LA LISTA DE PERFILES, no se va a la pantalla de error. Aquí
       hay algo que hacer —elegir otro minero o crear uno nuevo— y allí no hay
       nada: «algo ha ido mal» con un botón de volver al mapa es un callejón.
       El aviso va en la propia lista, encima de las tarjetas. */
    CB.a11y.anunciar(p.mensaje);
    CB.pantallas.ir('p-perfiles');
    var lista = document.getElementById('lista-perfiles');
    if (lista && lista.parentNode) {
      var aviso = document.getElementById('aviso-perfil-roto');
      if (!aviso) {
        aviso = CB.ui.crear('p', 'texto-menor');
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

/* ── Ajustes visibles para el niño ──────────────────────────────────────── */
CB.ajustesNino = function (props) {
  var cont = document.getElementById('lista-ajustes');
  if (!cont) return;
  CB.ui.vaciar(cont);
  var perfil = CB.perfil;

  /* Pulsar «Pausa» lleva aquí, y aquí ponía «Ajustes» en grande con la salida
     al final de la lista. Un niño que pausa no ha venido a configurar nada:
     ha venido a parar un momento, y necesita ver antes que nada cómo volver.
     `desdePausa` ya se pasaba desde CB.partida.pausar() y no lo usaba nadie. */
  var enPausa = !!(props && props.desdePausa) ||
                !!(CB.partida.estado && CB.partida.estado.pausada);
  var titulo = document.getElementById('ajustes-titulo');
  if (titulo) titulo.textContent = enPausa ? 'En pausa' : 'Ajustes';

  function fila(etiqueta, valor, alPulsar) {
    var f = CB.ui.crear('div', 'ajuste');
    f.appendChild(CB.ui.crear('span', 'ajuste__etiqueta', etiqueta));
    var b = CB.ui.boton(valor, '', function () { alPulsar(b); });
    f.appendChild(b);
    cont.appendChild(f);
    return b;
  }

  var ap = CB.almacen.ajustesDispositivo();
  fila('Sonido', CB.audio.silenciado ? 'No' : 'Sí', function (b) {
    var s = CB.audio.silenciar(!CB.audio.silenciado);
    ap.silencio = s;
    CB.almacen.guardarAjustesDispositivo(ap);
    b.textContent = s ? 'No' : 'Sí';
  });

  /* La música tiene su propio nivel, aparte del de los efectos, y llega hasta
     el silencio total en un solo toque. No es un capricho: hay evidencia en
     las dos direcciones sobre si la música de fondo ayuda o estorba cuando la
     carga cognitiva es alta, y resolver problemas de enunciado con 7 años lo
     es. Quien no la quiera tiene que poder quitarla sin buscarla. */
  fila('Música', CB.musica.NIVELES[CB.musica.nivelActual()].etiqueta, function (b) {
    var i = (CB.musica.nivelActual() + 1) % CB.musica.NIVELES.length;
    CB.musica.fijarNivel(i);
    ap.nivelMusica = i;
    CB.almacen.guardarAjustesDispositivo(ap);
    b.textContent = CB.musica.NIVELES[i].etiqueta;
  });

  if (perfil) {
    /* Los tres modos de tiempo se pueden cambiar también desde la pausa. */
    var nombres = { conCalma: 'Con calma', normal: 'Normal', sinPrisa: 'Sin prisa' };
    var orden = ['conCalma', 'normal', 'sinPrisa'];
    fila('El reloj', nombres[perfil.ajustes.modoTiempo] || 'Con calma', function (b) {
      var i = orden.indexOf(perfil.ajustes.modoTiempo);
      perfil.ajustes.modoTiempo = orden[(i + 1) % orden.length];
      b.textContent = nombres[perfil.ajustes.modoTiempo];
      if (CB.partida.estado) CB.partida.estado.modoTiempo = perfil.ajustes.modoTiempo;
      CB.almacen.guardarPerfil(perfil);
    });
    fila('Letra grande', perfil.ajustes.letraGrande ? 'Sí' : 'No', function (b) {
      perfil.ajustes.letraGrande = !perfil.ajustes.letraGrande;
      b.textContent = perfil.ajustes.letraGrande ? 'Sí' : 'No';
      CB.a11y.aplicarAjustes(perfil.ajustes, ap);
      CB.almacen.guardarPerfil(perfil);
    });
    fila('Leer en voz alta', perfil.ajustes.voz ? 'Sí' : 'No', function (b) {
      perfil.ajustes.voz = !perfil.ajustes.voz;
      CB.voz.activa = perfil.ajustes.voz;
      b.textContent = perfil.ajustes.voz ? 'Sí' : 'No';
      CB.almacen.guardarPerfil(perfil);
    });
  }

  /* PRIMERO, no al final de la lista: es lo que ha venido a hacer. */
  if (CB.partida.estado && CB.partida.estado.pausada) {
    cont.insertBefore(
      CB.ui.boton('◀ Seguir cavando', 'btn-bloque--primario btn-bloque--medio',
        function () { CB.partida.reanudar(); }),
      cont.firstChild);
  }
};

/* ── Créditos ───────────────────────────────────────────────────────────── */
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
  var legal = document.getElementById('creditos-legal');
  var curri = document.getElementById('creditos-curriculo');
  var mus = document.getElementById('creditos-musica');

  if (mus) {
    CB.ui.vaciar(mus);
    mus.appendChild(CB.ui.crear('h2', null, 'Música'));
    CB.musica.CREDITOS.forEach(function (c) {
      var linea = CB.DONDE_SUENA[c.clave] + ' — ' + c.autor + ' (Pixabay ' + c.id + ')';
      mus.appendChild(CB.ui.crear('p', 'texto-menor', linea));
    });
    mus.appendChild(CB.ui.crear('p', 'texto-menor', CB.musica.LICENCIA));
  }
  if (legal) {
    CB.ui.vaciar(legal);
    legal.appendChild(CB.ui.crear('h2', null, 'Aviso legal'));
    legal.appendChild(CB.ui.crear('p', 'texto-menor', CB.LEGAL.AVISO));
    /* La versión se enseña aquí y en ningún otro sitio del juego: es lo que un
       adulto necesita decir por teléfono cuando algo no le funciona. */
    legal.appendChild(CB.ui.crear('p', 'texto-menor', 'Versión ' + CB.VERSION));
  }
  if (curri) {
    CB.ui.vaciar(curri);
    curri.appendChild(CB.ui.crear('h2', null, 'Currículo'));
    curri.appendChild(CB.ui.crear('p', 'texto-menor', CB.LEGAL.ALCANCE));
    curri.appendChild(CB.ui.crear('p', 'texto-menor', CB.LEGAL.SECUENCIACION));
    curri.appendChild(CB.ui.crear('p', 'texto-menor', CB.LEGAL.MULTIPLICACION));
    curri.appendChild(CB.ui.crear('p', 'texto-menor', CB.datos.ORIGEN_GLOSARIO));
  }
};

/* ── Enganches de pantalla ──────────────────────────────────────────────── */
CB.pantallas.alEntrar['p-mapa'] = function () { CB.mapaDestrezas.pintarMundos(); };
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

/* Y al abandonar la partida por cualquier vía hay que matar la cuenta atrás.
   Sin esto, el intervalo del reloj sigue vivo en la tarjeta de reparación, en
   el descanso y en el mapa: invisible, porque el HUD está oculto, pero
   gastando y —peor— soltando «Hurry up!» encima de otra pantalla. */
CB.pantallas.alSalir['p-partida'] = function () { CB.ui.reloj.parar(); };

/* ── Arranque ───────────────────────────────────────────────────────────── */
CB.arranque = function () {
  var t0 = CB.util.ahora();

  CB.texturas.generarTodas();
  CB.sprites.precalentar();
  CB.ui.iniciarParticulas();

  var ap = CB.almacen.ajustesDispositivo();
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
  var ultimo = CB.almacen.ultimoPerfil();
  var idx = CB.almacen.indice();
  if (ultimo && idx.some(function (e) { return e.id === ultimo; })) {
    var p = CB.almacen.leerPerfil(ultimo);
    if (p && !p.error) {
      CB.perfil = p;
      CB.almacen.podar(p, {});                 // poda también AL ARRANCAR
      CB.memoria.reclasificarTodo(p, CB.util.hoyISO());
      CB.a11y.aplicarAjustes(p.ajustes, ap);
    }
  }

  /* Botones de la portada */
  var jugar = document.getElementById('btn-jugar');
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

  var tranquila = document.getElementById('btn-tranquila');
  if (tranquila) {
    tranquila.addEventListener('click', function () {
      CB.audio.iniciar();
      if (!CB.perfil) { CB.pantallas.ir('p-perfiles'); return; }
      CB.partida.iniciar({ mundoId: 'M1', modo: 'tranquila' });
    });
  }

  var otra = document.getElementById('btn-otra');
  if (otra) {
    /* Un solo toque, sin diálogos (§3.7). */
    otra.addEventListener('click', function () {
      var m = CB.perfil ? CB.mapaDestrezas.mundoActual(CB.perfil).id : 'M1';
      CB.partida.iniciar({ mundoId: m, modo: 'expedicion' });
    });
  }

  var tranquilaFin = document.getElementById('btn-tranquila-fin');
  if (tranquilaFin) {
    tranquilaFin.addEventListener('click', function () {
      CB.partida.iniciar({ mundoId: 'M1', modo: 'tranquila' });
    });
  }

  /* Momento socioafectivo del fin de partida */
  var caras = document.querySelectorAll('#fin-animo .cara-animo');
  var i;
  for (i = 0; i < caras.length; i++) {
    (function (b) {
      b.addEventListener('click', function () {
        if (!CB.perfil) return;
        var v = parseInt(b.getAttribute('data-animo'), 10);
        CB.perfil.animo.push({ fechaISO: CB.util.hoyISO(), cara: v });
        var h = CB.perfil.historial;
        if (h.length) h[h.length - 1].animo = v;
        var todas = document.querySelectorAll('#fin-animo .cara-animo');
        var j;
        for (j = 0; j < todas.length; j++) todas[j].setAttribute('aria-pressed', 'false');
        b.setAttribute('aria-pressed', 'true');
        CB.almacen.guardarPerfil(CB.perfil);
      });
    })(caras[i]);
  }

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

  /* ── Volver de una recarga sin perder la partida ──────────────────────────
     `pagehide` guarda la partida en curso, también cuando la recarga la provoca
     otro (Live Server al guardar un fichero, un F5 sin querer, iOS reciclando
     la pestaña). Lo que faltaba era la vuelta: se aterrizaba en la portada y
     había que pulsar JUGAR, con lo que una recarga a media pregunta parecía que
     el juego se había reiniciado solo.

     La ventana es corta A PROPÓSITO. Con un minuto, lo único que cabe es una
     recarga: nadie cierra el juego y vuelve a abrirlo en menos de eso. Pasado
     ese minuto se aterriza en la portada como siempre y JUGAR sigue ofreciendo
     reanudar durante 24 h, que es la conducta de toda la vida. Sin el límite,
     un niño que abre el juego por la mañana se encontraría metido de golpe en
     la expedición de ayer sin haber tocado nada. */
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

/* Ventana corta A PROPÓSITO: en un minuto lo único que cabe es una recarga.
   Pasado ese minuto se aterriza en la portada y JUGAR sigue ofreciendo reanudar
   durante 24 h, que es la conducta de siempre. Sin el límite, un niño que abre
   el juego por la mañana se encontraría metido de golpe en la expedición de
   ayer sin haber tocado nada. */
CB.arranque.MS_RECARGA = 60000;

/* ── El botón de la portada dice lo que va a pasar ──────────────────────────
   «JUGAR» prometía una partida y llevaba a cuatro preguntas de colocación sin
   reloj, sin luces y sin puntos. La colocación es necesaria y no debe parecer
   un examen —por eso no tiene cronómetro— pero eso no justifica anunciarla como
   una partida: quien lo probó lo describió como «muy muy muy confuso», y la
   confusión no estaba en el flujo sino en el rótulo.

   Devuelve TEXTO, no navega: quien decide a dónde se va sigue siendo el
   manejador del clic. */
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
  var b = document.getElementById('btn-jugar');
  if (b) b.textContent = CB.arranque.rotuloJugar(CB.perfil);
  var p = document.getElementById('portada-pista');
  if (p) p.textContent = CB.arranque.pistaJugar(CB.perfil);
};

CB.arranque.esRecarga = function (perfil, ahoraMs) {
  var g = perfil && perfil.partidaEnCurso;
  if (!g || g.guardadaTs == null) return false;
  return (ahoraMs - g.guardadaTs) < CB.arranque.MS_RECARGA;
};

document.addEventListener('DOMContentLoaded', function () {
  /* La suite de pruebas carga los mismos 43 scripts pero NO debe arrancar una
     partida: monta su propio banco de pruebas sobre los mismos módulos. */
  if (!document.getElementById('btn-jugar')) return;

  /* El service worker se registra AQUI, detras de la guarda de arriba, y no es
     un detalle de colocacion: si pruebas.html registrara uno, cachearia la
     propia suite y el siguiente cambio de codigo se serviria desde cache. El
     sintoma seria «las pruebas no son deterministas», que ejecutor.js ya
     identifica como la conclusion mas cara posible.
     En file:// no hace nada y no dice nada: CB.offline.DISPONIBLE es false. */
  try { CB.offline.registrar(); } catch (eSW) { }

  try {
    CB.arranque();
  } catch (e) {
    CB.pantallas.fallo(e);
  }
});
