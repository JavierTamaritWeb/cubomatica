/* ============================================================================
   40-partida.js — El bucle de juego
   ----------------------------------------------------------------------------
   PRESUPUESTO DE TIEMPO, NO DE ÍTEMS (PLAN §3.6): el plan v1 fijaba 15 ítems y a
   la vez un objetivo de 6-9 minutos, y sus propios datos daban 21-58 s por
   problema de enunciado. Una partida con 6 problemas y 9 operaciones supera los
   12 minutos. Eran incompatibles.

   CUOTA OBLIGATORIA: toda partida de ≥10 ítems sirve ≥2 problemas de enunciado y
   ≥1 ítem de cada bloque desbloqueado. Sin ella, un motor adaptativo puro podía
   dejar a un niño 10 sesiones sin ver un solo problema con texto, que es
   exactamente lo que el usuario pidió que hubiera.
   ========================================================================== */

var CB = CB || {};
CB.partida = CB.partida || {};

CB.partida.OBJETIVO_S = 420;          // 7 min
CB.partida.TOLERANCIA_S = 120;
CB.partida.MIN_ITEMS = 8;
CB.partida.MAX_ITEMS = 20;
CB.partida.EST_S = { operacion: 12, problema: 35, vocabulario: 8 };
CB.partida.CADA_DESCANSO = [6, 7, 8];
CB.partida.PROB_BLOQUE_RARO = 0.05;   // ~1 de cada 20

CB.partida.estado = null;
CB.partida.bloqueado = false;

/* ── Construcción del guion ─────────────────────────────────────────────── */
CB.partida.estimaSegundos = function (nivel) {
  if (nivel.letra === 'P') return CB.partida.EST_S.problema;
  if (nivel.letra === 'V') return CB.partida.EST_S.vocabulario;
  return CB.partida.EST_S.operacion;
};

CB.partida.rtMedianaDe = function (nivel, perfil) {
  var d = perfil.destrezas ? perfil.destrezas[nivel.destreza] : null;
  if (d && d.rtMediana > 0) return d.rtMediana / 1000;
  return CB.partida.estimaSegundos(nivel);
};

/* Tope de repeticiones del MISMO nivel dentro de una partida.
   Sin él, en la primera partida de la vida del niño solo hay cuatro niveles
   abiertos (los que no tienen prerrequisitos) y el relleno por presupuesto de
   tiempo produce un guion de 20 ítems con 12 del mismo nivel: monótono y, de
   hecho, la mejor manera de que abandone en la sesión 1. */
CB.partida.MAX_REPETICIONES = 3;

CB.partida.construirGuion = function (perfil, mundo, rng, modo) {
  var guion = [], segundos = 0, intentos = 0, veces = {};
  var destrezas = CB.util.barajar(CB.adaptativo.SLUGS, rng);
  var nivelesMundo = mundo ? mundo.niveles : CB.catalogo.ids();

  function cabe(id) {
    return (veces[id] || 0) < CB.partida.MAX_REPETICIONES;
  }
  function anotar(id) {
    veces[id] = (veces[id] || 0) + 1;
    guion.push(id);
    segundos += CB.partida.rtMedianaDe(CB.catalogo.get(id), perfil);
  }

  function candidatoDe(slug) {
    var banda = CB.adaptativo.elegirBeta(slug, perfil);
    var lista = CB.catalogo.candidatos(slug, banda, perfil).filter(function (n) {
      return nivelesMundo.indexOf(n.id) !== -1 && cabe(n.id);
    });
    if (!lista.length) {
      lista = CB.catalogo.candidatos(slug, banda, perfil).filter(function (n) {
        return cabe(n.id);
      });
    }
    return CB.util.elegir(rng, lista);
  }

  /* 1) Vencidos por la curva de olvido primero: la razón honesta de volver. */
  var vencidos = CB.memoria.vencidosHoy(perfil, CB.util.hoyISO());
  var i, n;
  for (i = 0; i < vencidos.length && guion.length < 4; i++) {
    n = candidatoDe(vencidos[i]);
    if (n && guion.indexOf(n.id) === -1) anotar(n.id);
  }

  /* 2) CUOTA: al menos 2 problemas de enunciado, si hay alguno abierto. */
  var problemasPuestos = 0;
  while (problemasPuestos < 2 && intentos < 40) {
    intentos++;
    var sub = CB.gen.problemas.siguienteSubtipo(perfil, { lucesActuales: 3 });
    var slugP = CB.gen.problemas.DESTREZA(sub);
    n = candidatoDe(slugP);
    if (!n || CB.catalogo.get(n.id).letra !== 'P') break;   // ninguno abierto todavía
    if (guion.indexOf(n.id) === -1) anotar(n.id);
    problemasPuestos++;
  }

  /* 3) CUOTA: al menos 1 ítem de cada bloque desbloqueado. */
  var letras = ['N', 'S', 'R', 'M', 'P', 'E', 'V'];
  for (i = 0; i < letras.length; i++) {
    (function (letra) {
      var deLaLetra = nivelesMundo.filter(function (id) {
        var nv = CB.catalogo.get(id);
        return nv && nv.letra === letra && CB.grafo.estado(id, perfil) === 'abierta';
      });
      if (!deLaLetra.length) return;
      if (guion.some(function (id) { return CB.catalogo.get(id).letra === letra; })) return;
      var elegido = CB.util.elegir(rng, deLaLetra);
      if (elegido && guion.length < CB.partida.MAX_ITEMS) anotar(elegido);
    })(letras[i]);
  }

  /* 4) Se rellena hasta agotar el presupuesto de tiempo, respetando el tope de
        repeticiones. Si se agotan los niveles abiertos, se para: más vale una
        partida corta que veinte veces la misma pregunta. */
  intentos = 0;
  var seguidosSinSuerte = 0;
  while (segundos < CB.partida.OBJETIVO_S && guion.length < CB.partida.MAX_ITEMS &&
         intentos < 200 && seguidosSinSuerte < destrezas.length * 2) {
    intentos++;
    var slug = destrezas[intentos % destrezas.length];
    n = candidatoDe(slug);
    if (!n) { seguidosSinSuerte++; continue; }
    seguidosSinSuerte = 0;
    anotar(n.id);
  }

  /* 5) Mínimo de 8 ítems. Si ni siquiera se alcanza con el tope, se relaja el
        tope antes que servir una partida de 4 preguntas. */
  intentos = 0;
  while (guion.length < CB.partida.MIN_ITEMS && intentos < 80) {
    intentos++;
    n = candidatoDe(destrezas[intentos % destrezas.length]);
    if (n) { anotar(n.id); continue; }
    var abiertos = CB.grafo.desbloqueados(perfil);
    if (!abiertos.length) break;
    guion.push(CB.util.elegir(rng, abiertos));
  }

  return CB.util.barajar(guion, rng).slice(0, CB.partida.MAX_ITEMS);
};

/* ── Iniciar ────────────────────────────────────────────────────────────── */
CB.partida.iniciar = function (opciones) {
  opciones = opciones || {};
  var perfil = CB.perfil;
  if (!perfil) return null;

  var modo = opciones.modo || 'expedicion';
  var mundo = CB.catalogo.getMundo(opciones.mundoId || 'M1') || CB.MUNDOS[0];
  var semilla = CB.util.hash32(perfil.id + CB.util.hoyISO() +
                               (perfil.historial ? perfil.historial.length : 0));
  var rng = CB.util.mulberry32(semilla);

  CB.partida.pararCronometro();
  CB.ui.limpiarReparacion();                 // ninguna tarjeta anterior sigue viva
  CB.escalera.levantarPausas(perfil);        // «no hasta la siguiente sesión»

  var luces = CB.vidas.nuevoEstado(modo === 'tranquila' ? 0 : perfil.vidasReserva);
  if (modo !== 'tranquila' && perfil.vidasReserva > 0) {
    CB.a11y.anunciar('Empiezas con una luz guardada de la expedición anterior.');
    perfil.vidasReserva = 0;
  }

  CB.partida.estado = {
    modo: modo,
    mundo: mundo,
    semilla: semilla,
    rng: rng,
    guion: CB.partida.construirGuion(perfil, mundo, rng, modo),
    indice: 0,
    itemActual: null,
    intento: 1,
    puntos: 0,
    gemas: 0,
    luces: luces,
    antiazar: CB.antiazar.nuevoEstado(),
    escalera: CB.escalera.nuevoContador(),
    /* Escalón 4: el nivel que se cuela por delante del guion, una sola vez. */
    prerrequisitoPendiente: null,
    /* La veta del ítem ANTERIOR, para saber cuándo se cambia de veta. */
    vetaPrevia: null,
    /* Las vetas que se quedaron a medias sin dejar deuda en la cola de repaso.
       Hoy solo hay una manera de que eso pase —que se agote el tiempo, que no
       reinserta nada— y sin este mapa el juego cantaría «Nivel superado» de una
       veta cuyo único ítem se quedó sin contestar. */
    vetasSinCerrar: {},
    colaRepaso: CB.leitner.nuevaCola(),
    itemsServidos: [],
    servidosSet: {},
    respuestas: [],
    rachaPrimerIntento: 0,
    aciertos: 0,
    aciertos1er: 0,
    preguntas: 0,
    lucesApagadas: 0,
    azares: 0,
    destrezasMejoradas: [],
    proximoDescanso: CB.util.elegir(rng, CB.partida.CADA_DESCANSO),
    t0: 0,
    tLectura0: 0,
    lecturaHecha: false,
    temporizador: null,
    inicioTs: Date.now(),
    finTrasEsteItem: false,
    motivoFin: null,
    modoTiempo: (modo === 'tranquila') ? 'sinPrisa' : (perfil.ajustes.modoTiempo || 'conCalma'),
    pausada: false,
    avisoLimiteDado: false
  };

  CB.pantallas.ir('p-partida');
  CB.ui.pintarBioma(mundo.bioma, 0);
  /* En este punto el guion ya está construido pero no se ha servido nada:
     0 de N, que es lo que hay que enseñar. */
  CB.ui.pintarHUD({ luces: luces.luces, gemas: 0,
                    indice: 0, total: CB.partida.estado.guion.length });
  CB.partida.servirItem();
  return CB.partida.estado;
};

/**
 * Cuántos ítems de esta veta le quedan a la expedición: los del guion que aún no
 * se han servido, más los que esperan en la cola de repaso por haberse fallado.
 *
 * CUENTA DE MÁS A PROPÓSITO. Una reinserción consume el hueco de un ítem del
 * guion, así que este número es un techo, no una cifra exacta. Equivocarse por
 * arriba significa callarse una vez; equivocarse por abajo significa cantar
 * «Nivel superado» y volver a servir esa misma veta tres ítems después, que es
 * mentirle a quien juega. De los dos errores posibles solo uno es aceptable.
 */
CB.partida.quedanDeLaVeta = function (e, nivelId) {
  if (!e || !nivelId) return 0;
  var n = 0, i;
  for (i = e.indice; i < e.guion.length; i++) {
    if (e.guion[i] === nivelId) n++;
  }
  for (i = 0; i < e.colaRepaso.length; i++) {
    if (e.colaRepaso[i].nivelId === nivelId) n++;
  }
  return n;
};

/**
 * ¿Se acaba de terminar una veta? Devuelve el nivel que queda atrás, o null.
 *
 * SUPERADA SIGNIFICA SUPERADA, y por eso hay tres condiciones y no una:
 *   1. que la veta del ítem que llega sea otra distinta;
 *   2. que a la anterior no le quede ni un ítem por delante —ni en el guion ni
 *      en la cola de repaso, donde cae todo lo que se falla dos veces—;
 *   3. que no se haya quedado a medias por tiempo agotado.
 *
 * La segunda es la que hace honesta a la frase: un ítem fallado vuelve, así que
 * mientras se deba un repaso de esa veta no se ha superado nada. La tercera
 * tapa el único agujero que deja la segunda, porque el tiempo agotado no
 * reinserta.
 *
 * Se pregunta al SERVIR el ítem siguiente y no al acertar el anterior, y eso
 * tampoco es casual: en el momento del acierto todavía no se sabe qué veta viene
 * —una reinserción puede colarse por delante del guion—, así que anunciarla
 * entonces sería adivinar. Aquí ya está decidida.
 */
CB.partida.vetaSuperada = function (nivelId) {
  var e = CB.partida.estado;
  if (!e || !e.vetaPrevia || e.vetaPrevia === nivelId) return null;
  if (e.vetasSinCerrar[e.vetaPrevia]) return null;
  if (CB.partida.quedanDeLaVeta(e, e.vetaPrevia) > 0) return null;
  return CB.catalogo.get(e.vetaPrevia);
};

/* ── Servir un ítem ─────────────────────────────────────────────────────── */
CB.partida.servirItem = function () {
  var e = CB.partida.estado, perfil = CB.perfil;
  if (!e) return;

  CB.ui.ocultarMensaje();
  CB.ui.hileraBono(0);
  CB.ui.ocultarPersonaje('rocarr');
  CB.ui.ocultarPersonaje('gluglu');
  CB.ui.ocultarPersonaje('chispa');

  /* Fin del guion */
  if (e.indice >= e.guion.length) { CB.partida.finalizar('guion'); return; }

  /* Micro-descanso cada 6-8 ítems */
  if (e.indice > 0 && e.indice >= e.proximoDescanso) {
    e.proximoDescanso = e.indice + CB.util.elegir(e.rng, CB.partida.CADA_DESCANSO);
    CB.partida.microDescanso();
    return;
  }

  /* Reinserción de un ítem fallado, con OTROS números del mismo tipo */
  var reinsertado = CB.leitner.tocaReinsertar(e.colaRepaso, e.indice);

  /* ESCALÓN 4 de la escalera anti-frustración: un ítem del prerrequisito ya
     dominado, por delante del guion y una sola vez. Se consume aquí porque este
     es el único sitio que decide qué nivel toca. */
  var delPrerrequisito = false;
  var nivelId;
  if (e.prerrequisitoPendiente) {
    nivelId = e.prerrequisitoPendiente;
    e.prerrequisitoPendiente = null;
    delPrerrequisito = true;
  } else {
    nivelId = reinsertado || e.guion[e.indice];
  }
  var nivel = CB.catalogo.get(nivelId);
  if (!nivel) { e.indice++; CB.partida.servirItem(); return; }

  var estadoNivel = perfil.niveles[nivelId] ||
    (perfil.niveles[nivelId] = { n: 0, aciertos: 0, caja: 1, D: 2, ultimoISO: null, enPausa: false });

  /* Generación con reintentos: nunca se repite el mismo ítem en la sesión */
  var item = null, k = 0;
  while (k < 12) {
    k++;
    var rngItem = CB.util.mulberry32(e.semilla + e.indice * 7919 + k * 104729);
    item = nivel.generar(rngItem, estadoNivel.D || 2, {
      ajustes: perfil.ajustes,
      techo: CB.CURRICULO.techoTrimestre[perfil.trimestreDeducido || 1] || 99,
      bolsas: perfil.bolsasProblemas,
      datoSobrante: nivel.datoSobrante &&
                    (perfil.trimestreDeducido === 3) &&
                    (perfil.historial && perfil.historial.length > 0)
    });
    if (!item) break;
    var idItem = nivelId + '#' + item.expr;
    if (!e.servidosSet[idItem]) { e.servidosSet[idItem] = true; break; }
    item = null;
  }
  if (!item) { e.indice++; CB.partida.servirItem(); return; }

  item.itemId = nivelId + '#' + item.expr + '@' + e.semilla + '.' + e.indice;
  item.repaso = !!reinsertado;
  item.esRetoBonus = (estadoNivel.D === 3) && (e.rng() < 0.25) && nivel.retoBonus;
  item.esBloqueRaro = (e.rng() < CB.partida.PROB_BLOQUE_RARO);

  e.itemActual = item;
  e.intento = 1;
  e.lecturaHecha = false;

  /* LA GALERÍA SE PINTA AQUÍ, y no solo en trasAcierto: en ese momento e.indice
     todavía es el del ítem que se acaba de responder, así que la fila iría un
     bloque por detrás toda la partida. Aquí `indice` es exactamente el número de
     ítems ya servidos, que es lo que la fila tiene que decir. */
  CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas,
                    indice: e.indice, total: e.guion.length });

  /* ── EN QUÉ VETA ESTAMOS ─────────────────────────────────────────────────
     Se resuelve ANTES de mover e.vetaPrevia, que es lo que la pregunta compara.
     El rótulo se repinta siempre; la cinta solo cuando de verdad se ha cerrado
     una veta, que son tres o cuatro veces por expedición y no veinte. */
  var superada = CB.partida.vetaSuperada(nivelId);
  e.vetaPrevia = nivelId;
  CB.ui.pintarVeta(nivel, e.mundo);

  CB.ui.pintarItem(item);
  CB.ui.pintarBioma(e.mundo.bioma, e.indice / Math.max(1, e.guion.length));
  CB.partida.pintarRespuesta(item);

  /* ── «NIVEL SUPERADO» ────────────────────────────────────────────────────
     La cinta lleva el grito corto y el mensaje quieto lleva las dos frases que
     hay que poder leer: cuál se ha cerrado y cuál empieza. Es el mismo reparto
     que el resto del juego —la cinta cruza en un segundo y medio y ahí no cabe
     nada que haya que leer— y es lo que hace que decir a la vez «superado» y «a
     dónde vamos» no obligue a elegir entre las dos.

     Va ANTES del anuncio de la consigna a propósito: CB.ui.mensaje escribe en la
     región viva, y en el mismo turno gana la última escritura. La última tiene
     que ser la que dice qué hay que hacer ahora.

     Y NO CUANDO ADEMÁS SE BAJA AL PRERREQUISITO: los dos escriben en el mismo
     nodo y el último ganaría, así que el aviso del escalón 4 —que es el que hace
     falta entender— se comería a este. No pueden coincidir, porque el escalón 4
     llega detrás de cuatro fallos seguidos y una veta que debe un repaso nunca
     está superada; pero eso es un razonamiento sobre el estado de otro fichero,
     y de esos ya se ha caído alguno en este proyecto. */
  var dicho = '';
  if (superada && !delPrerrequisito) {
    /* PRIMERO A DÓNDE VAMOS, y no es indiferente: la caja del mensaje garantiza
       tres líneas y la veta con el nombre más largo del catálogo ocupa dos. Si
       la frase de destino fuera la segunda, con dos nombres largos se quedaría
       fuera justo la mitad que se ha pedido enseñar. La que puede recortarse es
       la de despedida, que además ya la ha dicho la cinta. */
    dicho = 'Ahora vas a: ' + nivel.nombre + '. Ya has terminado ' +
            superada.nombre + '. ';
    CB.ui.mensaje('Ahora vas a: ' + nivel.nombre + '. Ya has terminado ' +
                  superada.nombre + '.', 'acierto');
    CB.ui.festejo.mostrar('vetaSuperada', '¡Nivel superado!');
  }

  /* UNA SOLA CADENA. CB.a11y.anunciar reescribe la región viva de una vez, así
     que dos anuncios en el mismo turno se tapan: el «Reto» tiene que ir dentro
     del mismo texto que la consigna, no en una llamada aparte. */
  CB.a11y.anunciar(dicho + (item.esRetoBonus ? 'Reto. ' : '') +
                   (item.consigna || item.enunciado || ''));

  /* Y SE LEE EN VOZ ALTA, que es lo que la documentación daba por hecho desde la
     primera versión sin que ocurriera: aquí solo había una llamada a la región
     viva, que es texto para un lector de pantalla, no voz. Un niño de 7 años que
     apenas lee se quedaba con el enunciado delante y nada que lo dijera, salvo
     que supiera pulsar la tecla L.

     TRES CONDICIONES, y las tres importan:

     · Solo los problemas de enunciado (item.subtipo). Leer «6 − 3» en voz alta
       no ayuda a nadie y alarga cada ítem sin motivo.
     · Solo con el ajuste encendido. CB.voz.leer lo comprueba, pero se comprueba
       también AQUÍ porque la alternativa —CB.voz.leerOGuiar— cae en
       lecturaGuiada, que NO mira CB.voz.activa: sería audio que arranca solo y
       no se puede apagar, es decir, WCAG 2.2 1.4.2 incumplido.
     · Solo con voz de verdad disponible. En un Chromebook sin voz española la
       lectura guiada va a 1000 ms por palabra: veinticinco segundos de resaltado
       con el cronómetro corriendo, y todos los problemas se agotarían por tiempo.

     El cronómetro se para mientras lee y se reanuda al terminar. Si la voz no
     llega a salir, CB.voz.leer llama igualmente a alTerminar, así que el reloj
     vuelve a arrancar en el peor caso. */
  if (item.subtipo && CB.voz.activa && CB.voz.disponible()) {
    CB.partida.pararCronometro();
    CB.voz.leer(item.enunciado || item.consigna || '', function () {
      CB.partida.iniciarCronometro(true);
    });
  }

  /* Se dice DESPUÉS de pintar, porque servirItem empieza ocultando el mensaje:
     ponerlo antes equivalía a no ponerlo. Y se dice, en vez de cambiar el nivel
     en silencio, porque un niño que ve aparecer de golpe algo mucho más fácil
     sin explicación concluye que el juego se ha estropeado o que le está dando
     lástima. Se cuenta que es a propósito y que se vuelve. */
  if (delPrerrequisito) {
    CB.ui.mensaje('Vamos a por uno más fácil de este mismo tema. Luego volvemos.', 'animo');
  }
};

/* Elige y monta el componente de respuesta */
CB.partida.pintarRespuesta = function (item) {
  var e = CB.partida.estado, perfil = CB.perfil;

  /* Se abre el cerrojo de «una respuesta por intento». Pasa por aquí tanto el
     ítem nuevo (desde servirItem) como el segundo intento tras un fallo. */
  e.respondido = false;

  /* El oyente que arranca el cronómetro de los problemas en el primer toque.
     Se pide en cada ítem y se instala una sola vez: el contenedor es permanente. */
  CB.componentes.conectarLectura(CB.componentes.contenedor());

  var efectos = CB.antiazar.consumir(e.antiazar);
  CB.componentes._confirmacionPendiente = efectos.confirmacionDoble;
  var bloqueo = Math.max(CB.componentes.MS_CONSTRUCCION, efectos.bloqueoMs || 0);

  function responder(valor, origen, extra) { CB.partida.responder(valor, origen, extra); }

  /* LA PRESENTACIÓN DE CADA COMPONENTE, LA PRIMERA VEZ QUE SE VE (§7.3).
     Las siete frases llevaban escritas desde la primera versión, con sus dos
     funciones de apoyo, y NO LAS LLAMABA NADIE: `componentesVistos` se declaraba
     en el esqueleto del perfil, se reparaba en la migración y estaba en los
     campos permitidos, pero no lo escribía nunca nadie. Un niño veía la balanza
     por primera vez sin una sola frase que le dijera qué hacer, teniéndola
     escrita. Es la familia de E41.

     Se marca DONDE SE MONTA cada componente, no adivinando desde item.formato:
     los nombres no coinciden —el formato dice 'ordenar' y el componente se llama
     'ordenarFila'— y además el componente real depende de condiciones de
     ejecución (un problema monta selectorDatos o tecladoBloques según el
     trimestre). Resolverlo por el formato habría dado `undefined` en casi todos
     los casos, sin fallar: la familia de E42.

     Solo en el PRIMER intento: en el segundo ya hay un mensaje en pantalla
     —«Esta no suma gemas. Te queda otro intento»— y taparlo con una instrucción
     sería peor que no presentar nada. */
  function presentar(tipo) {
    if (e.intento !== 1) return;
    var frase = CB.componentes.PRESENTACION[tipo];
    if (!frase) return;                  // clave desconocida: nunca un mensaje vacío
    if (!CB.componentes.necesitaPresentacion(perfil, tipo)) return;
    CB.componentes.marcarVisto(perfil, tipo);
    CB.ui.mensaje(frase, 'aviso');
  }

  var formato = item.formato;

  /* Los problemas SIEMPRE con teclado en primer intento (§9.5): con 2 datos y
     4 opciones un niño acierta sin haber comprendido nada, y eso destruye la
     validez diagnóstica de la matriz de 20 subtipos. */
  if (item.subtipo) {
    if (perfil.trimestreDeducido >= 2 || item.datoSobrante) {
      presentar('selectorDatos');
      CB.componentes.selectorDatos(item, responder, { bloqueoMs: bloqueo });
    } else {
      presentar('tecladoBloques');
      CB.componentes.tecladoBloques(item, responder, { bloqueoMs: bloqueo });
    }
    CB.partida.iniciarCronometro(true);
    return;
  }

  if (formato === 'opciones4') {
    var opciones;
    if (item.distractoresTexto) {
      /* Vocabulario: las opciones son PALABRAS, no números. */
      opciones = item.distractoresTexto.map(function (t, i) {
        return { valor: item.distractoresIndice[i], texto: t, codigoError: 'E-V-TERMINO' };
      });
      opciones.push({ valor: item.respuesta, texto: item.termino, codigoError: null });
      opciones = CB.util.barajar(opciones, e.rng);
    } else if (item.distractoresFijos) {
      /* EL GENERADOR YA HA ELEGIDO LAS TRES, y antes se llamaba igualmente a
         CB.distractores.para() para tirar el resultado dos líneas después. Con
         los euros solo sobraba trabajo; con los céntimos rompe, porque la
         respuesta es 'c20' y el motor de distractores hace aritmética con ella.
         Un `else if` en vez de un `if` dentro. */
      opciones = item.distractoresFijos.slice(0, 3)
        .map(function (v) { return { valor: v, codigoError: null }; })
        .concat([{ valor: item.respuesta, codigoError: null }]);
      opciones = CB.util.barajar(opciones, e.rng);
    } else {
      var d = CB.distractores.para(item, e.rng);
      if (d.formato === 'teclado') {
        presentar('tecladoBloques');
        CB.componentes.tecladoBloques(item, responder, { bloqueoMs: bloqueo });
        CB.partida.iniciarCronometro(false);
        return;
      }
      opciones = d.opciones;
    }
    presentar('opciones4');
    CB.componentes.opciones4(item, opciones, responder, { bloqueoMs: bloqueo });
  } else if (formato === 'balanza') {
    presentar('balanza');
    CB.componentes.balanza(item, responder, { bloqueoMs: bloqueo });
  } else if (formato === 'ordenar') {
    presentar('ordenarFila');
    CB.componentes.ordenarFila(item, responder, { bloqueoMs: bloqueo });
  } else if (formato === 'monedas') {
    presentar('monedas');
    CB.componentes.monedas(item, responder, { bloqueoMs: bloqueo });
  } else if (formato === 'signo') {
    presentar('selectorSigno');
    CB.componentes.selectorSigno(item, responder, { bloqueoMs: bloqueo });
  } else {
    presentar('tecladoBloques');
    CB.componentes.tecladoBloques(item, responder, { bloqueoMs: bloqueo });
  }

  CB.partida.iniciarCronometro(false);
};

/* ── Cronómetro ─────────────────────────────────────────────────────────────
   En los PROBLEMA_* el cronómetro NO arranca al mostrar el enunciado: arrancar
   ahí puntúa la VELOCIDAD LECTORA, no la competencia matemática. Un niño con
   dislexia o con lectura silabeante obtendría M_tiempo bajo aunque razonara
   perfectamente (§11.4). */
/* SEGUNDOS POR ÍTEM. Un solo número para todo el juego: 30, que es lo pedido.

   Antes cada familia tenía su propio tLimite (18 s la numeración, 50 s los
   problemas) y «Con calma» lo doblaba, pero nada de eso se veía: era un
   temporizador invisible. Ahora la cuenta atrás está en pantalla, y un reloj
   que dura distinto en cada pregunta sin decir por qué desconcierta más que
   ayuda. tIdeal y tLimite SIGUEN existiendo y siguen gobernando el bono por
   rapidez (§11.7): lo que cambia es solo cuándo se agota el tiempo.

   «Sin prisa» = 0 = sin cuenta atrás, y no es un detalle de gusto: la WCAG
   2.2.1 exige que un límite de tiempo se pueda desactivar, y esto es material
   escolar sujeto a la EN 301 549.

   Los problemas de enunciado son el punto flojo de tener 30 s para todo: hay
   que leer tres frases antes de poder empezar a pensar. Si el pilotaje con
   niños dice que se quedan cortos, se sube AQUÍ y en ningún otro sitio. */
CB.partida.SEGUNDOS_ITEM = { normal: 30, conCalma: 30, sinPrisa: 0 };

CB.partida.msDeItem = function (modoTiempo) {
  var s = CB.partida.SEGUNDOS_ITEM[modoTiempo];
  if (s == null) s = CB.partida.SEGUNDOS_ITEM.conCalma;
  return s * 1000;
};

CB.partida.iniciarCronometro = function (esProblema) {
  var e = CB.partida.estado;
  if (!e) return;
  CB.partida.pararCronometro();

  if (esProblema) {
    e.tLectura0 = CB.util.ahora();
    e.t0 = 0;                              // arranca en el primer toque real
  } else {
    e.t0 = CB.util.ahora() + CB.componentes.MS_CONSTRUCCION;
  }

  var limite = CB.partida.msDeItem(e.modoTiempo);
  if (limite <= 0) { CB.ui.reloj.arrancar(0); return; }   // «Sin prisa»

  /* La cuenta atrás empieza cuando los botones terminan de construirse: los
     800 ms de construcción no se le descuentan a nadie. */
  e.relojArranque = setTimeout(function () {
    if (CB.partida.estado === e && !e.pausada) CB.ui.reloj.arrancar(limite);
  }, CB.componentes.MS_CONSTRUCCION);

  e.temporizador = setTimeout(function () {
    CB.partida.tiempoAgotado();
  }, limite + CB.componentes.MS_CONSTRUCCION);
};

CB.partida.pararCronometro = function () {
  var e = CB.partida.estado;
  if (e && e.temporizador) { clearTimeout(e.temporizador); e.temporizador = null; }
  if (e && e.relojArranque) { clearTimeout(e.relojArranque); e.relojArranque = null; }
  CB.ui.reloj.parar();
};

/* El primer toque de un problema arranca el cronómetro de puntuación.
   ────────────────────────────────────────────────────────────────────────────
   ESTA FUNCIÓN EXISTÍA Y NO LA LLAMABA NADIE. El único sitio que la invocaba era
   `responder()`, o sea el instante EXACTO en que el niño contesta: `t0` se ponía
   a `ahora()` y el rt que se medía a renglón seguido era 0 ms. Medido en
   navegador: 3.743 ms reales de lectura y razonamiento → rt registrado 0.

   Lo que eso rompía, y ninguna de las 405 comprobaciones lo veía:

     · el multiplicador de tiempo salía siempre 1,4 —el tope— y con él las 3
       gemas de bono por rapidez, en TODOS los problemas de enunciado, tardara
       lo que tardara. La familia que más cuesta era la que más premiaba.
     · el informe del adulto daba 0 ms de tiempo medio en los 20 subtipos.
     · y lo peor: en el antiazar, rt = 0 dispara S1 (< 700 ms) siempre. Tres
       problemas fallados seguidos disparan además S3 (tres fallos de menos de
       2 s), y dos señales son azar. Es decir, el niño que lee despacio y falla
       tres problemas seguidos —justo el que más ayuda necesita— quedaba marcado
       como que responde al tuntún. Con el rt de verdad: cero señales.

   Ahora la llama `CB.componentes.conectarLectura()` desde el contenedor de
   respuesta, que es donde ocurre el primer toque REAL. Se comprueba `subtipo`
   aquí dentro y no en quien llama, para que ningún sitio nuevo pueda pisar el
   `t0` de una operación corriente: en esas el cronómetro arranca al mostrarlas y
   mover `t0` al primer dígito regalaría el tiempo de pensarlo. */
CB.partida.marcarLectura = function () {
  var e = CB.partida.estado;
  if (!e || e.lecturaHecha) return;
  if (!e.itemActual || !e.itemActual.subtipo) return;   // solo los problemas
  if (CB.partida.bloqueado) return;                     // los 800 ms no se cobran
  e.lecturaHecha = true;
  e.t0 = CB.util.ahora();
};

CB.partida.tiempoAgotado = function () {
  var e = CB.partida.estado;
  if (!e || e.pausada) return;

  /* El tiempo agotado NUNCA apaga una luz. Ni el primero, ni ninguno. */
  var r = CB.vidas.timeout(e.luces);

  /* PERO SÍ DEJA LA VETA A MEDIAS. Un fallo reinserta el ítem —vuelve tres o
     cinco ítems después— y por eso la deuda se ve en la cola de repaso; quedarse
     sin tiempo no reinserta nada, así que la veta parecería cerrada sin que
     nadie la haya contestado. Sin esta línea el juego cantaría «Nivel superado»
     de una veta cuyo único ítem se quedó en blanco. */
  if (e.itemActual) e.vetasSinCerrar[e.itemActual.nivelId] = true;

  if (r.cambiaModo && e.modoTiempo !== 'sinPrisa') {
    e.modoTiempo = 'sinPrisa';
    CB.ui.mensaje('Vamos con más calma.', 'animo');
    CB.a11y.anunciar('Vamos con más calma.');
  }
  /* INALCANZABLE EN LA PRÁCTICA, y está bien que lo sea. A los 3 tiempos
     agotados seguidos, r.cambiaModo pone la partida en «Sin prisa», y ese modo
     apaga el cronómetro del todo: a partir de ahí no puede volver a agotarse el
     tiempo, así que timeoutsPartida se queda clavado en 3 y nunca llega a los 6
     que pide TIMEOUTS_FIN.

     No se quita porque CB.vidas.timeout() es una función pura y su contrato es
     suyo; pero conviene saber que la protección REAL contra un niño que se
     queda sin tiempo una y otra vez es el cambio de modo de arriba, no esto.
     Quitarle el reloj es mejor intervención que terminarle la sesión. */
  if (r.finAmable) { CB.partida.finalizar('pausa'); return; }

  CB.ui.mensaje(CB.mensajes.animo({
    perfil: CB.perfil, destreza: e.itemActual.destreza, rng: e.rng
  }), 'animo');
  CB.ui.festejo.mostrar('animo');
  setTimeout(function () { CB.partida.siguiente(); }, 2200);
};

/* ── Responder ──────────────────────────────────────────────────────────── */
CB.partida.responder = function (valor, origen, extra) {
  var e = CB.partida.estado, perfil = CB.perfil;
  if (!e || !e.itemActual || CB.partida.bloqueado) return;

  /* UNA RESPUESTA POR INTENTO. Los botones NO se deshabilitan al responder
     —siguen en pantalla mientras se ve el mensaje—, así que seis toques en OK
     registraban SEIS respuestas. Medido: 6 pulsaciones, 18 gemas en vez de 3.

     Y lo grave no eran las gemas. Cada toque metía una observación más en el
     motor adaptativo, así que la competencia estimada de esa destreza se movía
     seis veces por un solo ítem; y el informe del adulto contaba seis intentos
     donde hubo uno. Es decir: machacar el botón, que es exactamente lo que hace
     un niño de 7 años cuando la respuesta le sale sola, falseaba en silencio lo
     único que este juego promete medir.

     El cerrojo se abre en pintarRespuesta(), que es el único sitio donde se
     construye la zona de respuesta, y por el que pasan tanto el ítem nuevo como
     el segundo intento tras un fallo. */
  if (e.respondido) return;
  e.respondido = true;

  extra = extra || {};
  CB.partida.pararCronometro();

  var item = e.itemActual;
  var nivel = CB.catalogo.get(item.nivelId);

  /* Red de seguridad: si nadie tocó nada antes de contestar —un formato que no
     pase por el contenedor de respuesta, o una vía de teclado futura— se mide
     desde que se MOSTRÓ el enunciado. Mide de más, porque incluye la lectura,
     pero medir de más es un error que se ve; medir cero es el que no se ve. */
  if (item.subtipo && !e.lecturaHecha) {
    e.lecturaHecha = true;
    e.t0 = e.tLectura0 || CB.util.ahora();
  }
  var rt = CB.util.rt(e.t0 || CB.util.ahora());

  /* Corrección */
  var correcto;
  if (item.respuestaSigno) correcto = (valor === item.respuestaSigno);
  else if (origen === 'ordenar') correcto = (valor === item.respuesta);
  /* LA RESPUESTA DE «TOCA LA MONEDA DE 20 CÉNTIMOS» NO ES UN NÚMERO: es 'c20',
     porque el 20 a secas ya lo tiene el billete de 20 €. Sin esta rama,
     Number('c20') es NaN, NaN === NaN es false y la pregunta se contestaría mal
     siempre —tocando la moneda correcta—. Es exactamente la forma de fallo que
     no rompe nada y que solo se ve jugando. Ver la cabecera de
     `15-gen-dinero.js`. */
  else if (typeof item.respuesta === 'string') correcto = (String(valor) === item.respuesta);
  else correcto = (Number(valor) === Number(item.respuesta));

  /* Anti-azar. La primera línea de evaluar() garantiza que un acierto rápido
     NUNCA se marca como azar. */
  item.valorDado = Number(valor);
  var histo = e.respuestas.map(function (r) {
    return { posicion: r.posicion, rtMs: r.rt, correcto: r.correcto };
  });
  var az = CB.antiazar.evaluar(item, rt, correcto, histo, perfil);

  var punt = CB.puntuacion.calcular(item, rt, {
    correcto: correcto, azar: az.azar, intento: e.intento, modoTiempo: e.modoTiempo
  });

  e.respuestas.push({ itemId: item.itemId, rt: rt, correcto: correcto,
                      posicion: extra.posicion, valor: Number(valor) });
  CB.partida.registrarRespuesta(item, rt, correcto, az, extra);

  if (az.azar) { CB.partida.trasAzar(item, punt); return; }
  if (correcto) { CB.partida.trasAcierto(item, nivel, punt, rt, extra); return; }
  CB.partida.trasFallo(item, nivel, extra);
};

/* ── Acierto ────────────────────────────────────────────────────────────── */
CB.partida.trasAcierto = function (item, nivel, punt, rt, extra) {
  var e = CB.partida.estado, perfil = CB.perfil;

  e.preguntas++;
  e.aciertos++;
  if (e.intento === 1) { e.aciertos1er++; e.rachaPrimerIntento++; }
  else e.rachaPrimerIntento = 0;

  CB.puntuacion.acumular(e, punt.puntos);
  e.gemas += punt.gemas;
  perfil.gemas = (perfil.gemas || 0) + punt.gemas;

  CB.vidas.acierto(e.luces, e.intento === 1);

  /* El bono de rapidez se muestra RETROSPECTIVAMENTE, como ganancia. Nunca como
     una cuenta atrás corriendo mientras el niño piensa (§3.4). */
  var bono = CB.puntuacion.gemasDeRapidez(punt.mTiempo);
  CB.ui.hileraBono(bono);

  var vetaNueva = CB.partida.actualizarDestreza(item, nivel, true);

  var ctxMsg = {
    perfil: perfil, destreza: item.destreza, rng: e.rng,
    reparacion: e.intento === 2, superacion: e.intento === 2,
    racha: e.rachaPrimerIntento, vetaNueva: vetaNueva,
    lento: punt.mTiempo < 1.0, intento: e.intento
  };
  var msg = CB.mensajes.acierto(ctxMsg);
  /* El mensaje entero se queda QUIETO aquí. Es donde va la frase de
     procedimiento, que es la única parte que enseña algo y que hay que poder
     leer con calma: no cabe en una cinta que cruza en menos de dos segundos. */
  /* SE CONCATENA, no se sustituye: la frase de procedimiento es la única parte
     del mensaje que enseña algo, y el cromo no puede comérsela. */
  if (cromo) {
    msg = msg + ' Bloque raro: ' + (CB.casa.NOMBRES_CROMO[cromo] || cromo) +
          ' es tuyo. Está en tu álbum.';
  }
  CB.ui.mensaje(msg, 'acierto');
  CB.ui.personaje('cubi', 'acierto');
  if (e.rachaPrimerIntento >= 3) CB.ui.personaje('chispa', 'racha');

  /* Y la celebración. Lo que cambia entre una y otra es el VEHÍCULO —una
     insignia, una criatura, una cinta, un cartel, un temblor—, no el recorrido
     de un mismo cartel: la forma es lo que se reconoce sin leer. Las cuatro
     categorías ya las calculaba CB.mensajes.categoriaAcierto() desde el primer
     día; aquí solo se les pone cuerpo. Encima va el bloque raro, que es 1 de
     cada 20 y se lleva lo que casi nunca se ve. */
  /* EL CROMO SE RESUELVE ANTES DE GRITAR, para poder decir cuál es. Efecto
     colateral declarado: mover CB.util.elegir por delante de sacarDeBolsa cambia
     el orden de consumo del RNG sembrado. La partida sigue siendo reproducible
     desde su semilla, pero deja de dar la misma secuencia que daba antes. */
  var cromo = item.esBloqueRaro ? CB.partida.darCromo() : null;
  /* Si coinciden, manda el más raro: el bloque raro es 1 de cada 20 y el reto
     necesita además D === 3. */
  var festejo = item.esBloqueRaro ? 'raro'
    : (item.esRetoBonus ? 'logro'
      : CB.ui.festejo.POR_CATEGORIA[CB.mensajes.categoriaAcierto(ctxMsg)]);
  /* Si ya están los once, darCromo devuelve null y queda el grito normal. */
  var grito = cromo ? ('¡' + (CB.casa.NOMBRES_CROMO[cromo] || cromo) + '!')
            : (item.esRetoBonus ? '¡Reto!'
              : CB.mensajes.grito({ perfil: perfil, rng: e.rng }));
  CB.ui.festejo.mostrar(festejo, grito, { bono: bono });

  /* El sonido lo pone el festejo: cada uno trae el suyo, y por eso una
     superación no suena igual que un acierto de todos los días. */
  if (bono > 0 && festejo !== 'hallazgo') CB.audio.sfx('gema');
  CB.ui.particulasDe(document.getElementById('item-enunciado'), 'var(--deco-hierba)');

  /* Bloque raro: cromo garantizado. Es la sorpresa que hace que merezca la pena
     el ítem 47 (§7.5). */
  /* Los logros del cromo van DESPUÉS de la cinta: su propia cinta 'estalla'
     cancelaría la de 'raro' si se comprobaran antes. */
  if (cromo) CB.partida.logrosDeCromo();

  /* Vocabulario: el término entra en el Diccionario de Bloques. */
  var termino = CB.gen.vocabulario.terminoDe(item);
  if (termino && perfil.glosario.indexOf(termino) === -1) {
    perfil.glosario.push(termino);
    CB.logros.comprobar('glosario', { perfil: perfil, modo: e.modo, hoyISO: CB.util.hoyISO() });
  }

  CB.partida.comprobarLogros(item);
  CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas,
                   indice: e.indice, total: e.guion.length });

  /* NUNCA menos de los 1600 ms de siempre: la espera se estira si la coreografía
     es larga, pero no se encoge nunca. Acortarla recortaría tiempo de lectura. */
  setTimeout(function () { CB.partida.siguiente(); },
             CB.ui.festejo.espera(festejo, 1600, msg));
};

/**
 * Cuánto se queda en pantalla el mensaje del primer fallo. Era un 2600 escrito a
 * pelo, el último número del bucle fuera de la fuente única —las otras dos
 * esperas ya pasaban por ella—. Se expone como función para poder comprobarla:
 * un literal dentro de un setTimeout no se puede probar sin leer el código.
 *
 * NO se recorta el suelo. Se estudió quitar los 800 ms de construcción en el
 * segundo intento y es exactamente el patrón de E40: iniciarCronometro tiene
 * MS_CONSTRUCCION cableado en tres sitios, y habilitar los botones antes deja el
 * t0 en el futuro. Eso da rt NEGATIVO: multiplicador de tiempo al tope, bono
 * máximo por rapidez, y esa muestra envenenada entra en el detector de azar.
 */
CB.partida.esperaSegundoIntento = function (pista) {
  return CB.ui.festejo.espera('animo', 2600,
    'Esta no suma gemas. Te queda otro intento. ' + (pista || ''));
};

/* ── Fallo ──────────────────────────────────────────────────────────────── */
CB.partida.trasFallo = function (item, nivel, extra) {
  var e = CB.partida.estado, perfil = CB.perfil;

  CB.distractores.registrar(perfil, item, Number(item.valorDado));

  CB.audio.sfx('fallo');
  /* UNA SOLA CONSECUENCIA VISIBLE: no cae la gema y el marcador se queda quieto
     con un parpadeo gris. Jamás un número negativo (§3.4). */
  CB.ui.parpadeoGris();

  if (e.intento === 1) {
    /* Escalón 1: pista de Rocarr. NO apaga luz. NO rompe racha. */
    e.intento = 2;
    var pistas = CB.datos.MENSAJES.PISTAS[item.destreza];
    var pista = pistas ? pistas[0] : 'Vuelve a mirarlo con calma.';
    /* «Te queda otro intento» es la frase que faltaba. Sin ella, un fallo no
       tiene ninguna consecuencia visible —no cae la gema y ya está— y quien
       juega concluye que el juego no se entera de los errores. La regla es que
       la luz se apaga SOLO al fallar el segundo intento (docs/decisiones.md,
       Documento 5), y esa regla hay que contarla en el momento en que importa,
       no dejarla escrita en un documento que el niño no lee. */
    CB.ui.mensaje('Esta no suma gemas. Te queda otro intento. ' + pista, 'animo');
    CB.ui.festejo.mostrar('animo');
    CB.audio.sfx('rocarr');
    setTimeout(function () {
      CB.ui.ocultarMensaje();
      CB.partida.pintarRespuesta(item);
      CB.partida.iniciarCronometro(!!item.subtipo);
    }, CB.partida.esperaSegundoIntento(pista));
    return;
  }

  /* Segundo fallo: tarjeta de reparación y, al confirmarla, se apaga una luz. */
  CB.escalera.registrarFallo(e.escalera, item.destreza);
  e.preguntas++;
  e.rachaPrimerIntento = 0;
  CB.vidas.fallaRacha(e.luces);
  CB.partida.actualizarDestreza(item, nivel, false);
  CB.leitner.programarReinsercion(e.colaRepaso, item.nivelId, e.indice, e.rng);

  var diag = CB.diagnosticar(item, Number(item.valorDado));
  CB.ui.mostrarReparacion(item, diag.hipotesis, function () {
    var r = CB.vidas.fallo(e.luces, 2, e.modo);
    if (r.apagada) {
      e.lucesApagadas++;
      CB.audio.sfx('luzApagada');
    }
    CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas,
                   indice: e.indice, total: e.guion.length });

    /* Escalones 3, 4 y 5 según los fallos acumulados de ESE concepto.
       LA DECISIÓN LA TOMA CB.escalera, no este fichero. Antes se llamaba a
       siguienteEscalon() al entrar en trasFallo, se guardaba en una variable
       `esc` que no leía nadie, y aquí abajo se volvían a escribir los umbrales a
       mano. Dos implementaciones de la misma escalera, y solo una probada: la
       que no se usaba. Se pedía además ANTES de registrar el fallo, con lo que
       el escalón que devolvía iba siempre uno por detrás.

       EL ESCALÓN 4 YA ESTÁ. Estuvo declarado y sin implementación desde la
       primera versión: la escalera decía «al cuarto fallo seguido de un
       concepto, volvemos un paso atrás al prerrequisito», CB.grafo tenía escrita
       y documentada la función que lo resuelve —prerrequisitoDominado(), con un
       comentario que dice literalmente «para el escalón 4»— y no la llamaba
       nadie. Un agujero de los que no fallan: el juego seguía preguntando lo
       mismo que el niño no entendía, cuatro veces, cinco, y de ahí saltaba a
       retirarle el concepto. Reconstruir desde abajo es §12.5 del plan. */
    CB.partida.aplicarEscalon(
      CB.escalera.siguienteEscalon(
        CB.escalera.fallosDe(e.escalera, item.destreza), 2),
      item, perfil, e);

    CB.pantallas.ir('p-partida');
    if (CB.vidas.agotadas(e.luces)) { CB.partida.finalizar('luces'); return; }

    /* Y decir que se ha apagado. El HUD lo pinta —la luz se pone gris— pero eso
       pasa arriba del todo mientras se mira la tarjeta de reparación, así que
       nadie lo ve ocurrir. Sin esta línea, la luz desaparece sin causa aparente
       varias pantallas después del fallo que la costó. Se dice lo que pasó y
       cuántas quedan, sin regañar y sin números negativos (§3.4). */
    if (r.apagada) {
      var quedan = e.luces.luces;
      var aviso = 'Se ha apagado una luz. Te ' +
                  (quedan === 1 ? 'queda 1 luz.' : 'quedan ' + quedan + ' luces.');
      CB.ui.mensaje(aviso, 'animo');
      /* Tambien urgente: el mensaje visible dura 2,2 s y luego la pantalla pasa
         sola al siguiente item. Si el lector lo anuncia detras de la cola, se lo
         cuenta a un nino que ya esta en otra pregunta. */
      CB.a11y.urgente(aviso);
      setTimeout(function () {
        CB.ui.ocultarMensaje();
        CB.partida.siguiente();
      }, 2200);
      return;
    }
    CB.partida.siguiente();
  });
};

/**
 * Lo que la escalera manda hacer, aplicado. Devuelve la acción realmente
 * ejecutada, o null si no se hizo nada.
 *
 * ESTÁ EXTRAÍDO A PROPÓSITO. Mientras vivía dentro del callback de la tarjeta de
 * reparación, la única forma de comprobar que el escalón 4 funciona era leer el
 * código, y leer el código es exactamente como el escalón 4 pasó varias
 * versiones declarado y sin implementar sin que nada se pusiera rojo.
 */
CB.partida.aplicarEscalon = function (esc, item, perfil, e) {
  if (!esc || !item || !perfil || !e) return null;

  if (esc.accion === 'enPausa') {
    /* Escalón 5: se retira el concepto SIN DECIRLE NADA AL NIÑO. */
    CB.escalera.pausarConcepto(perfil, item.nivelId);
    return 'enPausa';
  }

  if (esc.accion === 'prerrequisito') {
    /* Escalón 4. Si no hay ningún prerrequisito dominado —pasa en los niveles
       que abren un bloque, que por definición no tienen ninguno— no se hace nada
       y el fallo siguiente cae en el escalón 5, que es lo que ocurría antes de
       implementar esto. Degradar así es lo correcto: nunca inventarse un nivel
       que el niño no haya superado ya, porque entonces «volvemos un paso atrás»
       sería mentira y le pondría delante algo aún más difícil. */
    var previo = CB.grafo.prerrequisitoDominado(item.nivelId, perfil);
    if (!previo) return null;
    e.prerrequisitoPendiente = previo;
    return 'prerrequisito';
  }

  if (esc.accion === 'bajarD_opciones' && perfil.niveles[item.nivelId]) {
    perfil.niveles[item.nivelId].D = esc.D;
    return 'bajarD_opciones';
  }

  return null;
};

/* ── Azar ───────────────────────────────────────────────────────────────── */
CB.partida.trasAzar = function (item, punt) {
  var e = CB.partida.estado;
  e.azares++;
  e.rachaPrimerIntento = 0;
  CB.vidas.fallaRacha(e.luces);

  var ef = CB.antiazar.aplicar(e.antiazar);

  /* Gluglú NO es un juez, es un accidente del entorno. En ninguna parte de la
     interfaz del niño aparece «adivinar», «al azar» ni «concéntrate» (§12.4). */
  CB.ui.mensaje(CB.antiazar.TEXTO_PERMITIDO, 'animo');
  CB.ui.personaje('gluglu', 'moja');
  CB.audio.sfx('gluglu');
  CB.ui.parpadeoGris();

  setTimeout(function () {
    if (ef.fuerzaDescanso) { CB.partida.microDescanso(); return; }
    CB.ui.ocultarMensaje();
    CB.ui.ocultarPersonaje('gluglu');
    e.intento = 1;
    CB.partida.pintarRespuesta(item);
    CB.partida.iniciarCronometro(!!item.subtipo);
  }, 2600);
};

/* ── Registro en el perfil ──────────────────────────────────────────────── */
CB.partida.registrarRespuesta = function (item, rt, correcto, az, extra) {
  var e = CB.partida.estado, perfil = CB.perfil;

  /* Array posicional documentado (§15.3): baja cada respuesta de ~380 a ~120
     bytes, que es lo que hace viable el modo aula con 30 perfiles. */
  var flags = 0;
  if (e.intento === 2) flags |= 1;
  if (extra.usoPista) flags |= 2;
  if (extra.usoAudio) flags |= 4;
  if (az.azar) flags |= 8;
  if (item.repaso) flags |= 16;
  if (extra.reparacionCompletada) flags |= 32;
  if (item.formato === 'opciones4') flags |= 64;

  perfil.respuestas.push([Date.now(), item.itemId, item.beta, item.D,
                          rt, correcto ? 1 : 0, Number(item.valorDado) || 0, flags]);

  if (item.subtipo) {
    var p = perfil.problemas[item.subtipo] ||
            (perfil.problemas[item.subtipo] = { intentos: 0, aciertos: 0, rtMedioMs: 0 });
    p.rtMedioMs = CB.util.mediaIncremental(p.rtMedioMs, p.intentos, rt);
    p.intentos++;
    if (correcto) p.aciertos++;
    /* Fase fallada: distingue «no comprende» de «comprende y calcula mal». */
    if (!correcto && extra.faseDatosOk === false) p.faseFallada = 'datos';
    else if (!correcto && extra.faseOperacionOk === false) p.faseFallada = 'operacion';
    else if (!correcto) p.faseFallada = 'calculo';
  }
};

CB.partida.actualizarDestreza = function (item, nivel, correcto) {
  var e = CB.partida.estado, perfil = CB.perfil, hoy = CB.util.hoyISO();

  var d = perfil.destrezas[item.destreza];
  var estadoAntes = d ? d.estado : 'nuevo';

  CB.adaptativo.registrar(item.destreza, {
    correcto: correcto, intento: e.intento, rtMs: e.respuestas.length
      ? e.respuestas[e.respuestas.length - 1].rt : 0,
    beta: item.beta, ejemplo: item.consigna || item.enunciado
  }, perfil, hoy);

  d = perfil.destrezas[item.destreza];
  CB.memoria.repasado(d, correcto, hoy);
  var estadoDespues = CB.memoria.clasificar(d, hoy, false);
  d.estado = estadoDespues;

  var estadoNivel = perfil.niveles[item.nivelId];
  estadoNivel.n++;
  if (correcto) estadoNivel.aciertos++;
  estadoNivel.ultimoISO = hoy;
  CB.leitner.actualizar(estadoNivel, correcto);
  CB.adaptativo.actualizarD(estadoNivel, correcto, e.intento === 1);

  /* «Veta restaurada» concede luz, pero solo si han pasado ≥48 h desde el
     último repaso: sin esa condición el logro se farmearía en bucle. */
  if (CB.memoria.vetaRestaurada(estadoAntes, estadoDespues, hoy) && correcto) {
    if (e.destrezasMejoradas.indexOf(item.destreza) === -1) {
      e.destrezasMejoradas.push(item.destreza);
    }
    var nuevos = CB.logros.comprobar('destreza', {
      perfil: perfil, modo: e.modo, hoyISO: hoy, vetaRestaurada: true
    });
    CB.partida.aplicarLogros(nuevos);
    return true;
  }
  if (correcto && (estadoDespues === 'afianzada' || estadoDespues === 'dominada') &&
      estadoAntes !== estadoDespues) {
    if (e.destrezasMejoradas.indexOf(item.destreza) === -1) {
      e.destrezasMejoradas.push(item.destreza);
    }
    return true;
  }
  return false;
};

/* ── Logros y luces extra ───────────────────────────────────────────────── */
CB.partida.comprobarLogros = function (item) {
  var e = CB.partida.estado;
  var nuevos = CB.logros.comprobar('acierto', {
    perfil: CB.perfil, modo: e.modo, hoyISO: CB.util.hoyISO(),
    estadoLuces: e.luces, rachaPrimerIntento: e.rachaPrimerIntento,
    esRetoBonus: item.esRetoBonus
  });
  CB.partida.aplicarLogros(nuevos);
};

/**
 * Celebra un logro ENCOLADO. Si caen dos en el mismo ítem, el bucle llamaba dos
 * veces a mostrar() y la segunda cancelaba a la primera —mostrar() empieza por
 * ocultar()—, así que el segundo logro no se veía. Es la lección de E51 llegando
 * por una ruta que E51 no vigila.
 */
CB.partida.festejarLogro = function (grito, indice) {
  if (!indice) { CB.ui.festejo.mostrar('logro', grito); return; }
  setTimeout(function () { CB.ui.festejo.mostrar('logro', grito); },
             CB.ui.festejo.espera('logro', 0) * indice);
};

CB.partida.aplicarLogros = function (nuevos) {
  var e = CB.partida.estado, i, l, r;
  for (i = 0; i < (nuevos || []).length; i++) {
    l = nuevos[i];
    if (!l.luz) {
      CB.a11y.anunciar('Logro: ' + l.nombre);
      /* EL NOMBRE SE VE, y no cabe en la cinta: «Reto bonus superado» son 19
         caracteres y el tope del texto de cinta es 16. La cinta lleva el grito
         corto y fijo; el nombre va al mensaje quieto, que es donde se lee. Sin
         esta línea el nombre del logro solo lo oía un lector de pantalla. */
      CB.ui.mensaje('Logro: ' + l.nombre, 'acierto');
      CB.partida.festejarLogro('¡Logro!', i);
      continue;
    }

    r = CB.vidas.conceder(e.luces, l.id, CB.perfil, e.modo);
    if (r.aplicada) {
      CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas,
                   indice: e.indice, total: e.guion.length });
      CB.ui.encenderLuz(e.luces.luces - 1);
      CB.ui.mensaje('¡Luz extra! ' + l.nombre, 'acierto');
      CB.partida.festejarLogro('¡Luz extra!', i);
      CB.a11y.anunciar('Luz extra por ' + l.nombre);
    } else if (r.guardada) {
      CB.ui.mensaje('Guardas 1 luz para la próxima expedición.', 'acierto');
      CB.partida.festejarLogro('¡Luz guardada!', i);
    }
  }
};

/**
 * Entrega un cromo del bloque raro. DEVUELVE su id, o null si ya están los once.
 *
 * Antes no devolvía nada y su única salida era un anuncio con el ID CRUDO
 * —«el cromo de gluglu»—, que solo oía un lector de pantalla. El premio más raro
 * del juego, uno de cada veinte ítems, se entregaba sin decir qué era.
 *
 * Y NO comprueba logros aquí: lo hace quien la llama, DESPUÉS de pintar la cinta.
 * Estaba dentro, y aplicarLogros pinta su propia cinta 'estalla', que empieza por
 * ocultar la anterior: en el ítem donde cae el quinto cromo y salta
 * «Coleccionista», la cinta del cromo se cancelaba a sí misma. Es E51 otra vez,
 * llegando por una ruta que E51 no vigila.
 */
CB.partida.darCromo = function () {
  var perfil = CB.perfil, e = CB.partida.estado;
  var posibles = Object.keys(CB.ui.CRIATURAS).filter(function (c) {
    return perfil.cromos.indexOf(c) === -1;
  });
  if (!posibles.length) return null;
  var c = CB.util.elegir(e.rng, posibles);
  perfil.cromos.push(c);
  /* El sonido lo pone la cinta 'veta-madre', que ya suena a cofre. Sonaba dos
     veces seguidas y se oía como un eco. */
  return c;
};

/* Los logros que dispara un cromo, aparte y a posteriori. */
CB.partida.logrosDeCromo = function () {
  var e = CB.partida.estado;
  if (!e) return;
  CB.partida.aplicarLogros(CB.logros.comprobar('cromo', {
    perfil: CB.perfil, modo: e.modo, hoyISO: CB.util.hoyISO()
  }));
};

/* ── Avanzar ────────────────────────────────────────────────────────────── */
CB.partida.siguiente = function () {
  var e = CB.partida.estado;
  if (!e) return;
  e.indice++;

  if (e.indice % 3 === 0) CB.partida.guardarEnCurso();

  /* Precedencia de los finales de partida (§3.6) */
  if (e.finTrasEsteItem) { CB.partida.finalizar('limiteSesion'); return; }
  if (CB.vidas.agotadas(e.luces)) { CB.partida.finalizar('luces'); return; }
  CB.partida.comprobarLimiteSesion();
  CB.partida.servirItem();
};

CB.partida.comprobarLimiteSesion = function () {
  var e = CB.partida.estado, perfil = CB.perfil;
  var limite = (perfil.ajustes.limiteSesionMin || 20) * 60000;
  var transcurrido = Date.now() - e.inicioTs;

  /* Aviso suave 2 minutos antes, sin cuenta atrás numérica. */
  if (!e.avisoLimiteDado && transcurrido > limite - 120000) {
    e.avisoLimiteDado = true;
    CB.a11y.anunciar('Nos queda poco para la última pregunta.');
  }
  /* NUNCA interrumpe un ítem ni un jefe: marca y deja terminar. */
  if (transcurrido >= limite) e.finTrasEsteItem = true;
};

/* ── Micro-descansos: 5 distintos, en bolsa para que no se repitan ──────── */
CB.partida.DESCANSOS = [
  { id: 'romper', titulo: '¡Descanso! Rompe los bloques' },
  { id: 'blopi', titulo: '¡Descanso! Dale de comer a Blopi' },
  { id: 'casa', titulo: '¡Descanso! Coloca bloques en tu casa' },
  /* NO PROMETE GEMAS, y el título lo decía. El manejador de microDescanso solo
     marca el cofre como roto, tira partículas y suena: no suma ni una gema a
     e.gemas ni a perfil.gemas, y los tres cofres siguen pulsables, así que
     «Elige uno» tampoco era verdad. Se corrige el TEXTO, no la economía: regalar
     gemas aquí rompería el invariante de la moneda visible, haría del cofre el
     único de los cinco descansos que paga, y ni siquiera se vería —servirItem no
     llama a pintarHUD, así que el premio no aparecería hasta el acierto
     siguiente—. Si algún día se quiere la mecánica entera, es una decisión de
     economía y va a docs/decisiones.md, no un arreglo de texto. */
  { id: 'cofre', titulo: '¡Descanso! Rompe los cofres de piedra' },
  { id: 'vagoneta', titulo: '¡Descanso! Monta en la vagoneta' }
];

CB.partida.microDescanso = function () {
  var e = CB.partida.estado;
  /* EN BOLSA, ahora sí. El comentario decía «en bolsa para que no se repitan» y
     la línea sorteaba CON REEMPLAZO: con tres descansos por sesión, un 52 % de
     probabilidad de ver dos veces el mismo. Se reutiliza la bolsa barajada de
     los mensajes, que ya existe y ya está probada. */
  var m = CB.mensajes.asegurar(CB.perfil);
  var idx = CB.mensajes.sacarDeBolsa(m, 'bolsaDescansos',
    CB.partida.DESCANSOS.length, [], [], 0, e.rng);
  var d = CB.partida.DESCANSOS[idx < 0 ? 0 : idx];

  CB.pantallas.ir('p-descanso');
  var t = document.getElementById('descanso-titulo');
  if (t) t.textContent = d.titulo;

  var tablero = document.getElementById('descanso-tablero');
  CB.ui.vaciar(tablero);

  if (d.id === 'cofre') {
    /* Se ve la lista completa de premios ANTES de abrir: sin cofres opacos, que
       es un patrón oscuro prohibido en un juego infantil (§21.4). */
    var aviso = CB.ui.crear('p', 'texto texto--menor', 'Tres cofres de piedra. Rómpelos todos.');
    tablero.appendChild(aviso);
  }

  var n = (d.id === 'cofre') ? 3 : 8, i;
  for (i = 0; i < n; i++) {
    (function () {
      var b = CB.ui.crear('button', 'tablero-descanso__bloque');
      b.type = 'button';
      b.setAttribute('aria-label', d.id === 'cofre' ? 'Cofre' : 'Bloque');
      b.addEventListener('click', function () {
        b.setAttribute('data-roto', 'si');
        CB.ui.particulasDe(b, 'var(--deco-piedra)');
        CB.audio.sfx(d.id === 'cofre' ? 'cofre' : 'picar');
      });
      tablero.appendChild(b);
    })();
  }

  var seguir = document.getElementById('btn-seguir');
  if (seguir) {
    seguir.onclick = function () {
      CB.pantallas.ir('p-partida');
      CB.partida.servirItem();
    };
  }
  /* Ninguno se puede fallar, ninguno puntúa, todos se pueden saltar. */
};

/* ── Pausa y partida guardada ───────────────────────────────────────────── */
CB.partida.pausar = function () {
  var e = CB.partida.estado;
  if (!e || e.pausada) return;
  e.pausada = true;
  CB.partida.pararCronometro();
  CB.partida.guardarEnCurso();
  CB.pantallas.ir('p-ajustes', { desdePausa: true });
};

CB.partida.reanudar = function () {
  var e = CB.partida.estado;
  if (!e) return;
  e.pausada = false;
  CB.pantallas.ir('p-partida');
  CB.partida.iniciarCronometro(!!(e.itemActual && e.itemActual.subtipo));
};

CB.partida.guardarEnCurso = function () {
  var e = CB.partida.estado, perfil = CB.perfil;
  if (!e || !perfil) return;
  perfil.partidaEnCurso = {
    iniciadaTs: e.inicioTs,
    /* Cuándo se GUARDÓ, que no es cuándo empezó. El arranque lo usa para
       distinguir una recarga (hace segundos) de volver al día siguiente. */
    guardadaTs: Date.now(),
    mundo: e.mundo.id, modo: e.modo,
    guion: e.guion.slice(), indice: e.indice,
    luces: e.luces.luces, puntos: e.puntos, gemas: e.gemas,
    semillaPartida: e.semilla, itemsServidos: Object.keys(e.servidosSet)
  };
  CB.almacen.guardarPerfil(perfil);
};

CB.partida.hayPartidaGuardada = function (perfil) {
  var p = perfil && perfil.partidaEnCurso;
  if (!p) return false;
  /* Caducidad: pasadas 24 h se descarta y se ofrece empezar de nuevo. */
  if (Date.now() - p.iniciadaTs > 86400000) { perfil.partidaEnCurso = null; return false; }
  return true;
};

CB.partida.reanudarGuardada = function (perfil) {
  var p = perfil.partidaEnCurso;
  if (!p) return null;
  var e = CB.partida.iniciar({ mundoId: p.mundo, modo: p.modo });
  if (!e) return null;
  e.guion = p.guion.slice();
  e.indice = p.indice;
  e.luces.luces = p.luces;
  e.puntos = p.puntos;
  e.gemas = p.gemas;
  (p.itemsServidos || []).forEach(function (k) { e.servidosSet[k] = true; });
  CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas,
                   indice: e.indice, total: e.guion.length });
  CB.partida.servirItem();
  return e;
};

/* ── Fin de la expedición ───────────────────────────────────────────────── */
CB.partida.finalizar = function (motivo) {
  var e = CB.partida.estado, perfil = CB.perfil;
  if (!e) return;
  CB.partida.pararCronometro();
  e.motivoFin = motivo;

  var precision1er = e.preguntas ? (e.aciertos1er / e.preguntas) : 0;
  var bono = CB.puntuacion.bonoFinal(
    precision1er, e.luces.luces >= CB.vidas.INICIALES, e.preguntas >= 15,
    e.preguntas, e.puntos
  );
  e.puntos += bono.total;
  e.gemas += Math.max(0, Math.round(bono.total / 50));
  perfil.gemas += Math.max(0, Math.round(bono.total / 50));
  perfil.puntosTotales = (perfil.puntosTotales || 0) + Math.max(0, e.puntos);

  /* EL RÉCORD SE LEE ANTES DE PISARLO. Si se lee después, `e.puntos > récord`
     es falso siempre y la celebración no se dispara nunca. Y se compara SIEMPRE
     contra el récord del MISMO modo: el antifarmeo cerrado en 24-logros.js. */
  var claveModo = (e.modo === 'tranquila') ? 'sinPrisa' : e.modoTiempo;
  if (!perfil.mejorPuntuacion[claveModo]) perfil.mejorPuntuacion[claveModo] = 0;
  var esRecord = e.preguntas > 0 && e.puntos > perfil.mejorPuntuacion[claveModo];
  if (esRecord) perfil.mejorPuntuacion[claveModo] = e.puntos;

  var hoy = CB.util.hoyISO();
  perfil.historial.push({
    fechaISO: hoy, modo: e.modo, mundo: e.mundo.id,
    seg: Math.round((Date.now() - e.inicioTs) / 1000),
    preguntas: e.preguntas, aciertos: e.aciertos, aciertos1erIntento: e.aciertos1er,
    precision1er: precision1er,
    precisionTotal: e.preguntas ? (e.aciertos / e.preguntas) : 0,
    puntos: e.puntos, gemas: e.gemas, lucesApagadas: e.lucesApagadas,
    azares: e.azares, motivoFin: motivo, animo: null,
    destrezasMejoradas: e.destrezasMejoradas.slice()
  });

  if (!perfil.diario.diasJugados) perfil.diario.diasJugados = [];
  if (perfil.diario.diasJugados.indexOf(hoy) === -1) perfil.diario.diasJugados.push(hoy);
  perfil.diario.ultimoDia = hoy;
  perfil.diario.tiempoPantallaPorDia[hoy] =
    (perfil.diario.tiempoPantallaPorDia[hoy] || 0) + Math.round((Date.now() - e.inicioTs) / 1000);

  var mundoCompletado = CB.catalogo.progresoMundo(e.mundo.id, perfil).fraccion >= 0.6;
  /* Se GUARDAN para pintarlos en p-fin. Se aplicaban aquí, estando todavía en
     p-partida, y nueve líneas después la pantalla cambiaba: «Primer pico»,
     «Cantero» y «Vuelvo mañana» sonaban sobre una pantalla que desaparecía. */
  var logrosFin = CB.logros.comprobar('finPartida', {
    perfil: perfil, modo: e.modo, hoyISO: hoy, mundoCompletado: mundoCompletado
  });
  CB.partida.aplicarLogros(logrosFin);

  /* QUÉ MUNDOS ESTABAN ABIERTOS, ANTES de abrir ninguno. Capturarlo después
     daría siempre «ninguno nuevo», que es la forma silenciosa de que esto no
     funcione. Abrir el Bosque, el Río o la Mina son los tres hitos más grandes
     de la vida de un perfil y ocurrían sin una sola línea de interfaz. */
  var abiertosAntes = {};
  CB.MUNDOS.forEach(function (m) {
    abiertosAntes[m.id] = !!(perfil.mundos[m.id] && perfil.mundos[m.id].desbloqueado);
  });
  CB.partida.desbloquearMundos();
  var mundoNuevo = null;
  CB.MUNDOS.forEach(function (m) {
    if (!abiertosAntes[m.id] && perfil.mundos[m.id] && perfil.mundos[m.id].desbloqueado) {
      mundoNuevo = m;
    }
  });
  perfil.partidaEnCurso = null;
  CB.almacen.podar(perfil, {});
  CB.almacen.guardarPerfil(perfil);

  CB.partida.pintarFin(motivo, bono, { logros: logrosFin, mundoNuevo: mundoNuevo, esRecord: esRecord });
  CB.partida.estado = null;
};

CB.partida.desbloquearMundos = function () {
  var perfil = CB.perfil, i, m;
  for (i = 0; i < CB.MUNDOS.length; i++) {
    m = CB.MUNDOS[i];
    if (!perfil.mundos[m.id]) {
      perfil.mundos[m.id] = { desbloqueado: false, gemasNivel: 0,
                              nivelesCompletados: 0, jefe: false, jefeSinFallos: false };
    }
    if (CB.catalogo.mundoDesbloqueado(m.id, perfil)) perfil.mundos[m.id].desbloqueado = true;
    perfil.mundos[m.id].nivelesCompletados = CB.catalogo.progresoMundo(m.id, perfil).hechos;
  }
};

/* Pantalla de fin: MISMO TONO se acabe como se acabe (§3.7) */
CB.partida.pintarFin = function (motivo, bono, hitos) {
  var e = CB.partida.estado, perfil = CB.perfil;
  CB.pantallas.ir('p-fin');

  var titulo = document.getElementById('fin-titulo');
  var sub = document.getElementById('fin-subtitulo');

  /* Prohibido literalmente: «has perdido», «game over», «fin de la partida»,
     «fallaste», «te has quedado sin», y cualquier recuento de fallos. */
  var textos = {
    luces: ['Fin de la expedición', 'Se ha apagado la luz del casco. ¡Mañana la cargamos!'],
    guion: ['Fin de la expedición', '¡Has cavado toda la galería de hoy!'],
    limiteSesion: ['Misión cumplida por hoy', 'Se ha acabado el tiempo de hoy. ¡Buena expedición!'],
    salida: ['Fin de la expedición', 'Hasta la próxima bajada a la cantera.'],
    pausa: ['Fin de la expedición', 'Lo dejamos aquí por hoy. Todo queda guardado.']
  };
  var t = textos[motivo] || textos.guion;
  if (titulo) titulo.textContent = t[0];
  if (sub) sub.textContent = t[1];

  /* 1.º Lo que has dominado hoy. Orden de lectura obligatorio. */
  var dom = document.getElementById('fin-dominado');
  CB.ui.vaciar(dom);
  if (e.destrezasMejoradas.length) {
    e.destrezasMejoradas.forEach(function (slug) {
      var d = perfil.destrezas[slug];
      var fila = CB.ui.crear('div', 'bloque-dominado');
      fila.appendChild(CB.ui.crear('span', null, CB.memoria.ICONO[d.estado] || '◆'));
      fila.appendChild(CB.ui.crear('span', null,
        CB.partida.nombreDestreza(slug) + ' → ' + CB.memoria.ETIQUETA[d.estado]));
      dom.appendChild(fila);
    });
  } else {
    dom.appendChild(CB.ui.crear('p', 'texto texto--menor',
      'Hoy has practicado. Mañana se notará en el mapa.'));
  }

  /* 1.º bis · HOY ADEMÁS: los tres hitos que el juego calculaba y no enseñaba.
     Panel nuevo, declarado en docs/decisiones.md porque el orden de lectura de
     §3.7 es contrato cerrado. Va entre lo dominado y las gemas: son hitos, y los
     hitos van antes que el recuento. */
  hitos = hitos || {};
  var caja = document.getElementById('fin-hitos');
  var lista = document.getElementById('fin-hitos-lista');
  var dijo = [];
  if (caja && lista) {
    CB.ui.vaciar(lista);

    (hitos.logros || []).forEach(function (l) {
      lista.appendChild(CB.ui.crear('p', null, 'Logro: ' + l.nombre));
      dijo.push('Logro: ' + l.nombre);
    });

    if (hitos.mundoNuevo) {
      /* El nombre sale de CB.MUNDOS, NUNCA escrito a mano: no existe ningún
         «Bosque de las Restas», y una cadena literal aquí se desviaría del
         catálogo el día que alguien renombre un mundo. */
      lista.appendChild(CB.ui.crear('p', null, 'Se ha abierto ' + hitos.mundoNuevo.nombre + '.'));
      dijo.push('Se ha abierto ' + hitos.mundoNuevo.nombre);
    }

    if (hitos.esRecord) {
      lista.appendChild(CB.ui.crear('p', null, '¡Tu mejor expedición!'));
      dijo.push('Tu mejor expedición');
    }

    caja.hidden = !dijo.length;
  }

  /* 2.º Gemas y desglose del bono. */
  var g = document.getElementById('fin-gemas');
  /* Desde cero, y contando. Es el único sitio donde el número de la partida
     entera aparece de golpe, así que es donde más se nota que aparezca subiendo.
     Se pone el 0 a mano porque el nodo conserva el total de la partida anterior:
     sin eso, contarHasta compararía contra esa cifra vieja y una partida peor que
     la anterior escribiría el número sin más. */
  if (g) { g.textContent = '0'; CB.ui.contarHasta(g, Math.max(0, e.gemas)); }
  var bl = document.getElementById('fin-bono');
  if (bl) {
    /* EN GEMAS, no en puntos. Decía «+340 de bono» justo debajo del recuento de
       gemas, en puntos, y parecía que eran gemas. Las gemas del bono ya están
       dentro de #fin-gemas —se suman en finalizar—, así que esta cifra es
       literalmente verdad y además es la moneda que el niño conoce. */
    var gemasBono = Math.max(0, Math.round(bono.total / 50));
    bl.textContent = gemasBono > 0
      ? ('+' + gemasBono + ' gemas de bono: ' + bono.extras.map(function (x) {
          return CB.puntuacion.ETIQUETA_EXTRA[x] || x;
        }).join(', '))
      : '';
  }

  /* La cinta es aria-hidden por diseño, así que sin este anuncio los hitos no
     existirían para un lector de pantalla. Una sola cadena: dos anuncios en el
     mismo turno se tapan. */
  if (dijo.length) CB.a11y.anunciar(dijo.join('. ') + '.');
  if (hitos.mundoNuevo) CB.ui.festejo.mostrar('jefe', '¡Paso abierto!');
  else if (hitos.esRecord) CB.ui.festejo.mostrar('logro', '¡Tu récord!');

  /* 3.º Momento socioafectivo: 1,5 s DESPUÉS, y solo si la partida duró ≥3 min.
     Nunca inmediatamente después de la tercera luz. */
  var cajaAnimo = document.getElementById('fin-animo');
  var duro = (Date.now() - e.inicioTs) >= 180000;
  if (cajaAnimo) {
    cajaAnimo.hidden = true;
    if (duro) {
      setTimeout(function () { cajaAnimo.hidden = false; }, 1500);
    }
  }

  /* Tras dos partidas seguidas acabadas por luces, se ofrece Cantera Tranquila
     en primer lugar. La recomendación no puede ser una promesa vacía (§3.8). */
  var h = perfil.historial;
  var dosSeguidas = h.length >= 2 &&
    h[h.length - 1].motivoFin === 'luces' && h[h.length - 2].motivoFin === 'luces';
  var btnTranquila = document.getElementById('btn-tranquila-fin');
  if (btnTranquila) btnTranquila.hidden = !dosSeguidas;

  CB.audio.sfx(motivo === 'luces' ? 'luzApagada' : 'subirNivel');
};

CB.partida.NOMBRES_DESTREZA = {
  numeracion: 'Los números', valor_posicional: 'Decenas y unidades',
  suma_sin_llevar: 'Sumas sin llevar', suma_llevada: 'Sumas llevando',
  resta_sin_llevar: 'Restas sin llevar', resta_llevada: 'Restas llevando',
  multiplicacion: 'Las veces', problemas_cambio: 'Problemas de cambio',
  problemas_combinacion: 'Problemas de juntar', problemas_comparacion: 'Problemas de comparar',
  problemas_igualacion: 'Problemas de igualar', dinero: 'El dinero',
  vocabulario: 'Las palabras'
};
CB.partida.nombreDestreza = function (slug) {
  return CB.partida.NOMBRES_DESTREZA[slug] || slug;
};

/* ── Acciones de la barra de herramientas ───────────────────────────────── */
/**
 * Como accionLeer, pero SIN levantar el bloqueo de construcción.
 * Es la que usa el altavoz que va dentro del enunciado, y la diferencia no es
 * cosmética: accionLeer pone CB.partida.bloqueado = false a propósito —quien
 * pulsa el altavoz de la barra ya ha invertido tiempo en el ítem—, pero un
 * altavoz que está justo encima de la pregunta se roza sin querer, y ese roce
 * anularía de un toque el bloqueo antiazar de 1200 ms. El niño se quedaría sin
 * la única protección que hay contra responder al tuntún, sin enterarse.
 */
CB.partida.accionLeerSuave = function () {
  var e = CB.partida.estado;
  if (!e || !e.itemActual) return;
  var texto = e.itemActual.enunciado || e.itemActual.consigna || '';
  CB.partida.pararCronometro();
  CB.voz.leerOGuiar(texto, CB.ui.resaltarPalabra, function () {
    CB.ui.resaltarLinea(-1);
    CB.partida.iniciarCronometro(!!e.itemActual.subtipo);
  });
};

CB.partida.accionLeer = function () {
  var e = CB.partida.estado;

  /* La calibración NO crea estado de partida (no tiene cronómetro, ni luces, ni
     puntuación: no debe parecer un test). Sin esta rama, el altavoz de esa
     pantalla salía por el `return` de abajo y no hacía absolutamente nada —
     justo en la primera pantalla de la vida del niño, donde más falta hace
     poder volver a oír la pregunta. Aquí no se toca el cronómetro porque en la
     calibración no hay ninguno que parar ni que reanudar. */
  if (!e || !e.itemActual) {
    if (CB.pantallas.actual === 'p-calibracion' &&
        CB.calibracion && CB.calibracion.consignaActual) {
      CB.voz.leerOGuiar(CB.calibracion.consignaActual, CB.ui.resaltarPalabra, function () {
        CB.ui.resaltarLinea(-1);
      });
    }
    return;
  }

  var texto = e.itemActual.enunciado || e.itemActual.consigna || '';
  /* Pulsar el altavoz salta el bloqueo de 800 ms: el niño ya ha invertido
     tiempo en el ítem, no está respondiendo al tuntún (§3.5). */
  CB.partida.bloqueado = false;
  CB.partida.pararCronometro();
  CB.voz.leerOGuiar(texto, CB.ui.resaltarPalabra, function () {
    CB.ui.resaltarLinea(-1);
    CB.partida.iniciarCronometro(!!e.itemActual.subtipo);
  });
};

CB.partida.accionPista = function () {
  var e = CB.partida.estado;
  if (!e || !e.itemActual) return;
  var pistas = CB.datos.MENSAJES.PISTAS[e.itemActual.destreza];
  /* La pista está SIEMPRE disponible y NO cuesta ninguna luz (§3.2). */
  CB.ui.mensaje(pistas ? pistas[1] : 'Léelo otra vez con calma.', 'animo');
  CB.ui.personaje('rocarr', 'pista');
  CB.audio.sfx('rocarr');
};

/* ── El botón de silencio dice la verdad, y lo dicen los DOS ────────────────
   Hay un botón de sonido por pantalla con barra (calibración y partida) y el
   silencio es uno solo, del aparato. Actualizando únicamente el botón pulsado
   pasaban tres cosas: el otro se quedaba mintiendo, el ajuste guardado se
   restauraba al arrancar sin que el icono se enterara (silencio real con icono
   de altavoz encendido), y `aria-pressed` no existía hasta el primer clic, de
   modo que un lector de pantalla no podía decir si estaba pulsado. */
CB.partida.sincronizarSonido = function () {
  var s = !!CB.audio.silenciado;
  var bs = document.querySelectorAll('[data-accion="sonido"]');
  var i, ico;
  for (i = 0; i < bs.length; i++) {
    /* Solo el icono: el rótulo «Sonido» se queda, y escribir sobre el botón
       entero se lo llevaría por delante. */
    ico = bs[i].querySelector('.btn-bloque__ico') || bs[i];
    ico.textContent = s ? '🔇' : '🔈';
    bs[i].setAttribute('aria-pressed', s ? 'true' : 'false');
  }
};

/* SUBE POR EL ÁRBOL, COMO CB.pantallas.conectar. Los cuatro botones de la barra
   llevan dos <span> dentro —el icono y el rótulo, que existen porque E15/E16
   exigen palabra visible en todo botón de barra—, así que el ev.target de un
   toque sobre el emoji o sobre la palabra es el span, no el botón, y el span no
   tiene data-accion. Leerlo directamente de ev.target dejaba Pista, Pausa,
   Sonido y Salir sin responder salvo que se acertara en el reborde de padding.

   Es un fallo que se prueba y no se ve: en el navegador el botón se hunde igual
   —eso es CSS, :active— y no hay ningún error. Lo mismo que 31-pantallas.js ya
   había resuelto para data-ir con este mismo bucle, y con este mismo comentario.

   La resolución vive en su propia función y no dentro del oyente a propósito:
   así se puede comprobar sin instalar un oyente de documento en la suite, que
   además se quedaría puesto y contaría doble en la segunda ejecución. */
CB.partida.accionDe = function (nodo) {
  var n = 0, a = null;
  while (nodo && nodo !== document.body && n < 4) {
    if (nodo.getAttribute) a = nodo.getAttribute('data-accion');
    if (a) return a;
    nodo = nodo.parentNode; n++;
  }
  return null;
};

CB.partida.MS_CONFIRMAR_SALIDA = 3000;

/**
 * Salir pide dos toques. NO se usa CB.componentes.pedirConfirmacion: esa función
 * empieza con `if (!_confirmacionPendiente) { alConfirmar(); return; }`, y esa
 * bandera solo se pone a true cuando el antiazar ha detectado azar. En una
 * partida normal vale false, así que pasar por ahí habría sido un no-operativo
 * — un cerrojo que no cierra, verde en las pruebas y roto en el juego.
 *
 * El botón está abajo a la derecha, a 16 px del de sonido y del mismo tamaño:
 * la zona del pulgar que sujeta la tableta. Un roce y se acababa la expedición.
 *
 * Y el aviso CAMBIA EL TEXTO del botón, no su color: «nunca solo color» es
 * obligación legal, y aquí además el color no se vería —el dedo está encima.
 */
CB.partida.pedirSalida = function (nodo) {
  var boton = nodo && nodo.closest ? nodo.closest('[data-accion="salir-partida"]') : null;
  if (!boton) { CB.partida.finalizar('salida'); return false; }

  if (boton.getAttribute('data-confirmando') === 'si') {
    /* SE SUELTA EL CERROJO ANTES DE SALIR, y no es limpieza cosmética: sin esto
       el botón se queda armado para siempre. Al volver a una partida, el primer
       roce en Salir la terminaría sin aviso ninguno — es decir, el fallo que este
       cerrojo venía a impedir, reaparecido por la puerta de atrás. Lo cazó E66,
       en su tercera aserción, que es justo la que parecía la menos importante. */
    CB.partida.soltarSalida(boton);
    CB.partida.finalizar('salida');
    return true;
  }

  if (CB.partida._rotuloSalir == null) CB.partida._rotuloSalir = boton.textContent;
  boton.setAttribute('data-confirmando', 'si');
  boton.textContent = '◀ Salir de verdad';
  CB.ui.mensaje('Toca otra vez para salir. La expedición se guarda.', 'animo');

  if (CB.partida._temporizadorSalir) clearTimeout(CB.partida._temporizadorSalir);
  /* CADUCA. Un cerrojo que no se suelta es peor que no tenerlo: el niño toca
     Salir sin querer, sigue jugando cinco minutos y el siguiente roce —ya sin
     ningún aviso en pantalla— termina la partida. */
  CB.partida._temporizadorSalir = setTimeout(function () {
    CB.partida.soltarSalida(boton);
    CB.ui.ocultarMensaje();
  }, CB.partida.MS_CONFIRMAR_SALIDA);
  return false;
};

/* Desarma el botón y le devuelve su rótulo. Se llama desde los DOS sitios que
   cierran el ciclo —confirmar y caducar—, porque una de las dos salidas siempre
   se olvida cuando esto se escribe en línea. */
CB.partida.soltarSalida = function (boton) {
  if (CB.partida._temporizadorSalir) {
    clearTimeout(CB.partida._temporizadorSalir);
    CB.partida._temporizadorSalir = null;
  }
  if (!boton) return;
  boton.removeAttribute('data-confirmando');
  if (CB.partida._rotuloSalir != null) boton.textContent = CB.partida._rotuloSalir;
};

CB.partida.conectarBarra = function () {
  document.addEventListener('click', function (ev) {
    var a = CB.partida.accionDe(ev.target);
    if (!a) return;

    /* Ya no hay botón «Leer»: se retiró a petición. accionLeer() sigue viva
       porque la tecla L de CB.a11y la usa. */
    if (a === 'pista') CB.partida.accionPista();
    if (a === 'pausa') CB.partida.pausar();
    if (a === 'sonido') {
      var s = CB.audio.silenciar(!CB.audio.silenciado);
      CB.partida.sincronizarSonido();
      var aj = CB.almacen.ajustesDispositivo();
      aj.silencio = s;
      CB.almacen.guardarAjustesDispositivo(aj);
    }
    if (a === 'salir-partida') CB.partida.pedirSalida(ev.target);
  });
};
