/* 40-partida.js — El bucle de juego */

var CB = CB || {};
CB.partida = CB.partida || {};

CB.partida.OBJETIVO_S = 420;          // 7 min
CB.partida.TOLERANCIA_S = 120;
CB.partida.MIN_ITEMS = 8;
CB.partida.MAX_ITEMS = 20;
CB.partida.EST_S = { operacion: 12, problema: 35, vocabulario: 8 };
CB.partida.CADA_DESCANSO = [6, 7, 8];
/* La probabilidad del bloque raro es de CB.modos.TABLA: cambia con el modo. */

CB.partida.estado = null;
CB.partida.bloqueado = false;

/* Construcción del guion */
CB.partida.estimaSegundos = function (nivel) {
  if (nivel.letra === 'P') return CB.partida.EST_S.problema;
  if (nivel.letra === 'V') return CB.partida.EST_S.vocabulario;
  return CB.partida.EST_S.operacion;
};

CB.partida.rtMedianaDe = function (nivel, perfil) {
  const d = perfil.destrezas ? perfil.destrezas[nivel.destreza] : null;
  if (d && d.rtMediana > 0) return d.rtMediana / 1000;
  return CB.partida.estimaSegundos(nivel);
};

/* Sin él, en la primera partida de la vida del niño solo hay cuatro niveles abiertos (los que no tienen prerrequisitos) y el relleno por presupuesto de tiempo produce un guion de 20 ítems con 12 del mismo nivel: monótono y, de hecho, la… */
CB.partida.MAX_REPETICIONES = 3;

/* Un nivel de curso anterior para la cuota de repaso del guion, por
   preferencia: destreza vencida por la curva de olvido > nivel aún no
   superado > azar. `cabe` viene del guion: respeta su tope de repeticiones. */
CB.partida.elegirRepasoInferior = function (perfil, bolsaInferior, cabe, rng) {
  const abiertos = bolsaInferior.filter(function (id) {
    const n = CB.catalogo.get(id);
    return n && !n.ampliacion && cabe(id) &&
           CB.grafo.estado(id, perfil) === 'abierta';
  });
  if (!abiertos.length) return null;
  const vencidas = CB.memoria.vencidosHoy(perfil, CB.util.hoyISO());
  let lista = abiertos.filter(function (id) {
    return vencidas.indexOf(CB.catalogo.get(id).destreza) !== -1;
  });
  if (!lista.length) {
    lista = abiertos.filter(function (id) { return !CB.grafo.superado(id, perfil); });
  }
  if (!lista.length) lista = abiertos;
  return CB.catalogo.get(CB.util.elegir(rng, lista));
};

/* El techo numérico que la partida pasa al generador: el del CURSO del perfil
   y su trimestre deducido. Un ítem de repaso de 1.º dentro de una partida de
   2.º sigue siendo de 1.º porque su generador manda; un problema de 2.º nunca
   debe encogerse por culpa de la fila de al lado. */
CB.partida.techoDe = function (perfil) {
  const fila = CB.CURRICULO.techoCurso[CB.catalogo.cursoDe(perfil)] ||
               CB.CURRICULO.techoCurso[2];
  return fila[perfil.trimestreDeducido || 1] || 99;
};

CB.partida.construirGuion = function (perfil, mundo, rng, modo) {
  const guion = [];
  let segundos = 0, intentos = 0;
  const veces = {};
  const destrezas = CB.util.barajar(CB.adaptativo.SLUGS, rng);
  const nivelesMundo = mundo ? mundo.niveles : CB.catalogo.ids();

  /* La mezcla 80/20 (3.0.0): el 80 % del guion es del curso del perfil y en
     torno al 20 % de cursos ANTERIORES — repaso que da confianza. El barajado
     final de siempre reparte los dos montones: nunca «las fáciles primero». */
  const cursoActivo = CB.catalogo.cursoDe(perfil);
  function cursoDeNivel(id) {
    const n = CB.catalogo.get(id);
    return n ? n.curso : cursoActivo;
  }
  const bolsaCurso = nivelesMundo.filter(function (id) {
    return cursoDeNivel(id) === cursoActivo;
  });
  const bolsaInferior = nivelesMundo.filter(function (id) {
    return cursoDeNivel(id) < cursoActivo;
  });
  let deInferior = 0;

  function cabe(id) {
    return (veces[id] || 0) < CB.partida.MAX_REPETICIONES;
  }
  function anotar(id) {
    veces[id] = (veces[id] || 0) + 1;
    guion.push(id);
    if (cursoDeNivel(id) < cursoActivo) deInferior++;
    segundos += CB.partida.rtMedianaDe(CB.catalogo.get(id), perfil);
  }

  function candidatoDe(slug) {
    const banda = CB.adaptativo.elegirBeta(slug, perfil);
    const todos = CB.catalogo.candidatos(slug, banda, perfil);
    /* Tres anillos: el curso activo dentro del mundo, el mundo entero, el
       catálogo. Los anillos de reserva solo admiten cursos anteriores mientras
       la cuota del 20 % lo pida: sin este cerrojo, un perfil de 2.º recién
       creado —con casi todo 2.º aún bloqueado y todo 1.º abierto de golpe—
       recibía un guion con el 80 % de repaso, la proporción EXACTAMENTE al
       revés de la pedida. */
    function admisible(n) {
      return cabe(n.id) && (n.curso === cursoActivo || cuotaInferiorPendiente());
    }
    let lista = todos.filter(function (n) {
      return bolsaCurso.indexOf(n.id) !== -1 && cabe(n.id);
    });
    if (!lista.length) {
      lista = todos.filter(function (n) {
        return nivelesMundo.indexOf(n.id) !== -1 && admisible(n);
      });
    }
    if (!lista.length) lista = todos.filter(admisible);
    return CB.util.elegir(rng, lista);
  }

  function candidatoInferior() {
    return CB.partida.elegirRepasoInferior(perfil, bolsaInferior, cabe, rng);
  }

  function cuotaInferiorPendiente() {
    return cursoActivo > 1 && bolsaInferior.length > 0 &&
           deInferior < Math.floor(0.2 * (guion.length + 1));
  }

  /* 1) Vencidos por la curva de olvido primero: la razón honesta de volver. */
  const vencidos = CB.memoria.vencidosHoy(perfil, CB.util.hoyISO());
  let i, n;
  for (i = 0; i < vencidos.length && guion.length < 4; i++) {
    n = candidatoDe(vencidos[i]);
    if (n && guion.indexOf(n.id) === -1) anotar(n.id);
  }

  /* 2) CUOTA: al menos 2 problemas de enunciado, si hay alguno abierto. */
  let problemasPuestos = 0;
  while (problemasPuestos < 2 && intentos < 40) {
    intentos++;
    const sub = CB.gen.problemas.siguienteSubtipo(perfil, { lucesActuales: 3 });
    const slugP = CB.gen.problemas.DESTREZA(sub);
    n = candidatoDe(slugP);
    if (!n || CB.catalogo.get(n.id).letra !== 'P') break;   // ninguno abierto todavía
    if (guion.indexOf(n.id) === -1) anotar(n.id);
    problemasPuestos++;
  }

  /* 3) CUOTA: al menos 1 ítem de cada bloque desbloqueado. Las cinco letras
     nuevas solo existen desde 3.º: en los cursos bajos su lista sale vacía y
     el bucle las salta solo. */
  const letras = ['N', 'S', 'R', 'M', 'P', 'E', 'V', 'D', 'F', 'C', 'T', 'Z', 'B', 'H', 'G', 'A', 'U', 'X', 'J', 'K'];
  for (i = 0; i < letras.length; i++) {
    (function (letra) {
      const deLaLetra = nivelesMundo.filter(function (id) {
        const nv = CB.catalogo.get(id);
        return nv && nv.letra === letra && CB.grafo.estado(id, perfil) === 'abierta';
      });
      if (!deLaLetra.length) return;
      if (guion.some(function (id) { return CB.catalogo.get(id).letra === letra; })) return;
      /* Con nivel del curso activo disponible, la cuota por letra no se paga
         con repaso: el repaso tiene su propia cuota. */
      const delCurso = deLaLetra.filter(function (id) {
        return CB.catalogo.get(id).curso === cursoActivo;
      });
      const elegido = CB.util.elegir(rng, delCurso.length ? delCurso : deLaLetra);
      if (elegido && guion.length < CB.partida.MAX_ITEMS) anotar(elegido);
    })(letras[i]);
  }

  /* 4) Se rellena hasta agotar el presupuesto de tiempo, respetando el tope de
        repeticiones. Si se agotan los niveles abiertos, se para: más vale una
        partida corta que veinte veces la misma pregunta. La cuota del 20 % se
        cobra aquí, ítem a ítem, ANTES de tirar del curso activo. */
  intentos = 0;
  let seguidosSinSuerte = 0;
  while (segundos < CB.partida.OBJETIVO_S && guion.length < CB.partida.MAX_ITEMS &&
         intentos < 200 && seguidosSinSuerte < destrezas.length * 2) {
    intentos++;
    if (cuotaInferiorPendiente()) {
      n = candidatoInferior();
      if (n) { anotar(n.id); seguidosSinSuerte = 0; continue; }
    }
    const slug = destrezas[intentos % destrezas.length];
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
    const abiertos = CB.grafo.desbloqueados(perfil);
    if (!abiertos.length) break;
    const abiertosDelCurso = abiertos.filter(function (id) {
      return CB.catalogo.get(id).curso === cursoActivo;
    });
    guion.push(CB.util.elegir(rng, abiertosDelCurso.length ? abiertosDelCurso : abiertos));
  }

  /* Garantía de la mezcla: con curso > 1 y una partida entera, al menos UN
     ítem de repaso de cursos anteriores, aunque el relleno no lo haya pedido. */
  if (cursoActivo > 1 && deInferior === 0 && guion.length >= CB.partida.MIN_ITEMS) {
    n = candidatoInferior();
    if (n) anotar(n.id);
  }

  return CB.util.barajar(guion, rng).slice(0, CB.partida.MAX_ITEMS);
};

/* Iniciar */
CB.partida.iniciar = function (opciones) {
  opciones = opciones || {};
  const perfil = CB.perfil;
  if (!perfil) return null;

  const modo = opciones.modo || 'expedicion';
  const mundo = CB.catalogo.getMundo(opciones.mundoId || 'M1') || CB.MUNDOS[0];
  const semilla = CB.util.hash32(perfil.id + CB.util.hoyISO() +
                               (perfil.historial ? perfil.historial.length : 0));
  const rng = CB.util.mulberry32(semilla);

  CB.partida.pararCronometro();
  CB.ui.limpiarReparacion();                 // ninguna tarjeta anterior sigue viva
  CB.escalera.levantarPausas(perfil);        // «no hasta la siguiente sesión»

  const luces = CB.vidas.nuevoEstado(modo === 'tranquila' ? 0 : perfil.vidasReserva);
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
    /* Hoy solo hay una manera de que eso pase —que se agote el tiempo, que no reinserta nada— y sin este mapa el juego cantaría «Nivel superado» de una veta cuyo único ítem se quedó sin contestar. */
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
    modoTiempo: (modo === 'tranquila') ? 'facil' : (perfil.ajustes.modoTiempo || CB.modos.POR_DEFECTO),
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

/* De los dos errores posibles solo uno es aceptable. */
CB.partida.quedanDeLaVeta = function (e, nivelId) {
  if (!e || !nivelId) return 0;
  let n = 0, i;
  for (i = e.indice; i < e.guion.length; i++) {
    if (e.guion[i] === nivelId) n++;
  }
  for (i = 0; i < e.colaRepaso.length; i++) {
    if (e.colaRepaso[i].nivelId === nivelId) n++;
  }
  return n;
};

CB.partida.vetaSuperada = function (nivelId) {
  const e = CB.partida.estado;
  if (!e || !e.vetaPrevia || e.vetaPrevia === nivelId) return null;
  if (e.vetasSinCerrar[e.vetaPrevia]) return null;
  if (CB.partida.quedanDeLaVeta(e, e.vetaPrevia) > 0) return null;
  return CB.catalogo.get(e.vetaPrevia);
};

/* Servir un ítem */
CB.partida.servirItem = function () {
  const e = CB.partida.estado, perfil = CB.perfil;
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
  const reinsertado = CB.leitner.tocaReinsertar(e.colaRepaso, e.indice);

  /* ESCALÓN 4 de la escalera anti-frustración: un ítem del prerrequisito ya
     dominado, por delante del guion y una sola vez. Se consume aquí porque este
     es el único sitio que decide qué nivel toca. */
  let delPrerrequisito = false;
  let nivelId;
  if (e.prerrequisitoPendiente) {
    nivelId = e.prerrequisitoPendiente;
    e.prerrequisitoPendiente = null;
    delPrerrequisito = true;
  } else {
    nivelId = reinsertado || e.guion[e.indice];
  }
  const nivel = CB.catalogo.get(nivelId);
  if (!nivel) { e.indice++; CB.partida.servirItem(); return; }

  const estadoNivel = perfil.niveles[nivelId] ||
    (perfil.niveles[nivelId] = { n: 0, aciertos: 0, caja: 1, D: 2, ultimoISO: null, enPausa: false });

  /* Generación con reintentos: nunca se repite el mismo ítem en la sesión */
  let item = null, k = 0;
  while (k < 12) {
    k++;
    const rngItem = CB.util.mulberry32(e.semilla + e.indice * 7919 + k * 104729);
    item = nivel.generar(rngItem, estadoNivel.D || 2, {
      ajustes: perfil.ajustes,
      techo: CB.partida.techoDe(perfil),
      bolsas: perfil.bolsasProblemas,
      datoSobrante: nivel.datoSobrante &&
                    (perfil.trimestreDeducido === 3) &&
                    (perfil.historial && perfil.historial.length > 0)
    });
    if (!item) break;
    const idItem = nivelId + '#' + item.expr;
    if (!e.servidosSet[idItem]) { e.servidosSet[idItem] = true; break; }
    item = null;
  }
  if (!item) { e.indice++; CB.partida.servirItem(); return; }

  item.itemId = nivelId + '#' + item.expr + '@' + e.semilla + '.' + e.indice;
  item.repaso = !!reinsertado;
  /* Las dos sorpresas del juego. Su frecuencia es del MODO: es la mitad de «más
     recompensas en Experto», y la mitad que no toca ningún número de la fórmula.
     El álbum tiene once cromos y darCromo() devuelve null cuando están todos, así
     que subir la probabilidad acelera una colección finita, no infla nada. */
  item.esRetoBonus = (estadoNivel.D === 3) &&
                     (e.rng() < CB.modos.probReto(e.modoTiempo)) && nivel.retoBonus;
  item.esBloqueRaro = (e.rng() < CB.modos.probCromo(e.modoTiempo));

  e.itemActual = item;
  /* Bits 2 y 4 del registro (§15.3): hasta 3.4.5 se leian de `extra`, que
     ningun componente escribia — el CSV del adulto decia «0 pistas, 0 audio»
     para siempre. El productor es el estado, y se estrena con cada item. */
  e.usoPistaItem = false;
  e.usoAudioItem = false;
  e.intento = 1;
  e.lecturaHecha = false;

  /* LA GALERÍA SE PINTA AQUÍ, y no solo en trasAcierto: en ese momento e.indice todavía es el del ítem que se acaba de responder, así que la fila iría un bloque por detrás toda la partida. */
  CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas,
                    indice: e.indice, total: e.guion.length });

  /* EN QUÉ VETA ESTAMOS */
  const superada = CB.partida.vetaSuperada(nivelId);
  e.vetaPrevia = nivelId;
  CB.ui.pintarVeta(nivel, e.mundo);

  CB.ui.pintarItem(item);
  CB.ui.pintarBioma(e.mundo.bioma, e.indice / Math.max(1, e.guion.length));
  CB.partida.pintarRespuesta(item);

  /* «NIVEL SUPERADO» */
  let dicho = '';
  if (superada && !delPrerrequisito) {

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

  /* Y SE LEE EN VOZ ALTA, que es lo que la documentación daba por hecho desde la primera versión sin que ocurriera: aquí solo había una llamada a la región viva, que es texto para un lector de pantalla, no voz. */
  if (item.subtipo && CB.voz.activa && CB.voz.disponible()) {
    CB.partida.pararCronometro();
    CB.voz.leer(CB.voz.textoDeItem(item), function () {
      CB.partida.iniciarCronometro(true);
    });
  }

  if (delPrerrequisito) {
    CB.ui.mensaje('Vamos a por uno más fácil de este mismo tema. Luego volvemos.', 'animo');
  }
};

/* Elige y monta el componente de respuesta */
CB.partida.pintarRespuesta = function (item) {
  const e = CB.partida.estado, perfil = CB.perfil;

  if (!e || !item || e.itemActual !== item) return false;

  /* Se abre el cerrojo de «una respuesta por intento». Pasa por aquí tanto el
     ítem nuevo (desde servirItem) como el segundo intento tras un fallo. */
  e.respondido = false;

  /* El oyente que arranca el cronómetro de los problemas en el primer toque.
     Se pide en cada ítem y se instala una sola vez: el contenedor es permanente. */
  CB.componentes.conectarLectura(CB.componentes.contenedor());

  const efectos = CB.antiazar.consumir(e.antiazar);
  CB.componentes._confirmacionPendiente = efectos.confirmacionDoble;
  const bloqueo = Math.max(CB.componentes.MS_CONSTRUCCION, efectos.bloqueoMs || 0);

  function responder(valor, origen, extra) { CB.partida.responder(valor, origen, extra); }

  /* Las siete frases llevaban escritas desde la primera versión, con sus dos funciones de apoyo, y NO LAS LLAMABA NADIE: `componentesVistos` se declaraba en el esqueleto del perfil, se reparaba en la migración y estaba en los campos… */
  function presentar(tipo) {
    if (e.intento !== 1) return;
    const frase = CB.componentes.PRESENTACION[tipo];
    if (!frase) return;                  // clave desconocida: nunca un mensaje vacío
    if (!CB.componentes.necesitaPresentacion(perfil, tipo)) return;
    CB.componentes.marcarVisto(perfil, tipo);
    CB.ui.mensaje(frase, 'aviso');
  }

  const formato = item.formato;

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
    return true;
  }

  if (formato === 'opciones4') {
    let opciones;
    if (item.distractoresTexto) {
      /* Vocabulario: las opciones son PALABRAS, no números. */
      opciones = item.distractoresTexto.map(function (t, i) {
        return { valor: item.distractoresIndice[i], texto: t, codigoError: 'E-V-TERMINO' };
      });
      opciones.push({ valor: item.respuesta, texto: item.termino, codigoError: null });
      opciones = CB.util.barajar(opciones, e.rng);
    } else if (item.distractoresFijos) {
      /* Con los euros solo sobraba trabajo; con los céntimos rompe, porque la respuesta es 'c20' y el motor de distractores hace aritmética con ella. */
      opciones = item.distractoresFijos.slice(0, 3)
        .map(function (v) { return { valor: v, codigoError: null }; })
        .concat([{ valor: item.respuesta, codigoError: null }]);
      opciones = CB.util.barajar(opciones, e.rng);
    } else {
      const d = CB.distractores.para(item, e.rng);
      if (d.formato === 'teclado') {
        presentar('tecladoBloques');
        CB.componentes.tecladoBloques(item, responder, { bloqueoMs: bloqueo });
        CB.partida.iniciarCronometro(false);
        return true;
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
  return true;
};

/* Cronómetro */
/* Los segundos son de CB.modos.TABLA y de ningún otro sitio. Aquí vivía una
   copia —SEGUNDOS_ITEM— que además de duplicar el número no sabía nada del
   ajuste «sin límite de tiempo» del panel del adulto. */

CB.partida.iniciarCronometro = function (esProblema) {
  const e = CB.partida.estado;
  if (!e) return;
  CB.partida.pararCronometro();

  if (esProblema) {
    e.tLectura0 = CB.util.ahora();
    e.t0 = 0;                              // arranca en el primer toque real
  } else {
    e.t0 = CB.util.ahora() + CB.componentes.MS_CONSTRUCCION;
  }

  const limite = CB.modos.msDeItem(e.modoTiempo, CB.perfil && CB.perfil.ajustes);
  if (limite <= 0) { CB.ui.reloj.arrancar(0); return; }   // Fácil, o sin límite de tiempo

  /* La cuenta atrás empieza cuando los botones terminan de construirse: los
     800 ms de construcción no se le descuentan a nadie. */
  e.relojArranque = setTimeout(function () {
    if (CB.partida.estado === e && !e.pausada) CB.ui.reloj.arrancar(limite);
  }, CB.componentes.MS_CONSTRUCCION);

  e.temporizador = setTimeout(function () {
    if (CB.partida.estado === e) CB.partida.tiempoAgotado();
  }, limite + CB.componentes.MS_CONSTRUCCION);
};

CB.partida.pararCronometro = function () {
  const e = CB.partida.estado;
  if (e && e.temporizador) { clearTimeout(e.temporizador); e.temporizador = null; }
  if (e && e.relojArranque) { clearTimeout(e.relojArranque); e.relojArranque = null; }
  CB.ui.reloj.parar();
};

/* El primer toque de un problema arranca el cronómetro de puntuación. */
CB.partida.marcarLectura = function () {
  const e = CB.partida.estado;
  if (!e || e.lecturaHecha) return;
  if (!e.itemActual || !e.itemActual.subtipo) return;   // solo los problemas
  if (CB.partida.bloqueado) return;                     // los 800 ms no se cobran
  e.lecturaHecha = true;
  e.t0 = CB.util.ahora();
};

CB.partida.tiempoAgotado = function () {
  const e = CB.partida.estado;
  if (!e || e.pausada) return;

  /* El tiempo agotado NUNCA apaga una luz. Ni el primero, ni ninguno. */
  const r = CB.vidas.timeout(e.luces);

  if (e.itemActual) e.vetasSinCerrar[e.itemActual.nivelId] = true;

  if (r.cambiaModo && e.modoTiempo !== 'facil') {
    e.modoTiempo = 'facil';
    CB.ui.mensaje('Vamos con más calma.', 'animo');
    CB.a11y.anunciar('Vamos con más calma.');
  }
  /* A los 3 tiempos agotados seguidos, r.cambiaModo pone la partida en Fácil, y ese modo apaga el cronómetro del todo: a partir de ahí no puede volver a agotarse el tiempo, así que timeoutsPartida se queda clavado en 3 y nunca llega a… */
  if (r.finAmable) { CB.partida.finalizar('pausa'); return; }

  CB.ui.mensaje(CB.mensajes.animo({
    perfil: CB.perfil, destreza: e.itemActual.destreza, rng: e.rng
  }), 'animo');
  CB.ui.festejo.mostrar('animo');
  setTimeout(function () {
    if (CB.partida.estado === e) CB.partida.siguiente();
  }, 2200);
};

/* Responder */
CB.partida.responder = function (valor, origen, extra) {
  const e = CB.partida.estado, perfil = CB.perfil;
  if (!e || !e.itemActual || CB.partida.bloqueado) return;

  /* Cada toque metía una observación más en el motor adaptativo, así que la competencia estimada de esa destreza se movía seis veces por un solo ítem; y el informe del adulto contaba seis intentos donde hubo uno. */
  if (e.respondido) return;
  e.respondido = true;

  extra = extra || {};
  CB.partida.pararCronometro();

  const item = e.itemActual;
  const nivel = CB.catalogo.get(item.nivelId);

  /* Red de seguridad: si nadie tocó nada antes de contestar —un formato que no pase por el contenedor de respuesta, o una vía de teclado futura— se mide desde que se MOSTRÓ el enunciado. */
  if (item.subtipo && !e.lecturaHecha) {
    e.lecturaHecha = true;
    e.t0 = e.tLectura0 || CB.util.ahora();
  }
  const rt = CB.util.rt(e.t0 || CB.util.ahora());

  /* Corrección */
  let correcto;
  if (item.respuestaSigno) correcto = (valor === item.respuestaSigno);
  else if (origen === 'ordenar') correcto = (valor === item.respuesta);
  /* Es exactamente la forma de fallo que no rompe nada y que solo se ve jugando. */
  else if (typeof item.respuesta === 'string') correcto = (String(valor) === item.respuesta);
  else correcto = (Number(valor) === Number(item.respuesta));

  /* Anti-azar. La primera línea de evaluar() garantiza que un acierto rápido
     NUNCA se marca como azar. */
  item.valorDado = Number(valor);
  const histo = e.respuestas.map(function (r) {
    return { posicion: r.posicion, rtMs: r.rt, correcto: r.correcto };
  });
  const az = CB.antiazar.evaluar(item, rt, correcto, histo, perfil);

  const punt = CB.puntuacion.calcular(item, rt, {
    correcto: correcto, azar: az.azar, intento: e.intento, modoTiempo: e.modoTiempo,
    /* El ajuste del adulto existia desde 3.0.0 y no lo leia nadie: el conmutador
       cambiaba el perfil y la puntuacion seguia midiendo velocidad lectora. */
    sinVelocidad: !!(item.subtipo && CB.perfil && CB.perfil.ajustes &&
                     CB.perfil.ajustes.noPuntuarVelocidadProblemas)
  });

  e.respuestas.push({ itemId: item.itemId, rt: rt, correcto: correcto,
                      posicion: extra.posicion, valor: Number(valor) });
  CB.partida.registrarRespuesta(item, rt, correcto, az, extra);

  if (az.azar) { CB.partida.trasAzar(item, punt); return; }
  if (correcto) { CB.partida.trasAcierto(item, nivel, punt, rt, extra); return; }
  CB.partida.trasFallo(item, nivel, extra);
};

/* Acierto */
CB.partida.trasAcierto = function (item, nivel, punt, rt, extra) {
  const e = CB.partida.estado, perfil = CB.perfil;

  e.preguntas++;
  e.aciertos++;
  if (e.intento === 1) { e.aciertos1er++; e.rachaPrimerIntento++; }
  else e.rachaPrimerIntento = 0;

  CB.puntuacion.acumular(e, punt.puntos);

  /* LA GEMA EXTRA DEL MODO SE SUMA UNA VEZ Y EN UN SITIO. e.gemas y perfil.gemas
     son dos contadores del mismo hecho: sumarles a mano por separado es como se
     descuadra un marcador y no lo nota nadie hasta que el niño compara. */
  const gemas = punt.gemas +
    CB.modos.gemasDeAcierto(e.modoTiempo,
      { correcto: true, azar: false, intento: e.intento });
  e.gemas += gemas;
  perfil.gemas = (perfil.gemas || 0) + gemas;

  CB.vidas.acierto(e.luces, e.intento === 1);

  /* El bono de rapidez se muestra RETROSPECTIVAMENTE, como ganancia. Nunca como
     una cuenta atrás corriendo mientras el niño piensa (§3.4). El extra del modo
     solo suma si el bono base ya era mayor que cero: no puede convertir una
     respuesta lenta en premio por el hecho de estar en Experto. */
  const bono = CB.modos.rapidezDe(e.modoTiempo,
    CB.puntuacion.gemasDeRapidez(punt.mTiempo));
  CB.ui.hileraBono(bono);

  const vetaNueva = CB.partida.actualizarDestreza(item, nivel, true);

  const ctxMsg = {
    perfil: perfil, destreza: item.destreza, rng: e.rng,
    reparacion: e.intento === 2, superacion: e.intento === 2,
    racha: e.rachaPrimerIntento, vetaNueva: vetaNueva,
    lento: punt.mTiempo < 1.0, intento: e.intento
  };
  let msg = CB.mensajes.acierto(ctxMsg);
  const cromo = item.esBloqueRaro ? CB.partida.darCromo() : null;
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

  /* Las cuatro categorías ya las calculaba CB.mensajes.categoriaAcierto() desde el primer día; aquí solo se les pone cuerpo. */

  /* Si coinciden, manda el más raro: el bloque raro es 1 de cada 20 y el reto
     necesita además D === 3. */
  const festejo = item.esBloqueRaro ? 'raro'
    : (item.esRetoBonus ? 'logro'
      : CB.ui.festejo.POR_CATEGORIA[CB.mensajes.categoriaAcierto(ctxMsg)]);
  /* Si ya están los once, darCromo devuelve null y queda el grito normal. */
  const grito = cromo ? ('¡' + (CB.casa.NOMBRES_CROMO[cromo] || cromo) + '!')
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
  const termino = CB.gen.vocabulario.terminoDe(item);
  if (termino && perfil.glosario.indexOf(termino) === -1) {
    perfil.glosario.push(termino);
    CB.logros.comprobar('glosario', { perfil: perfil, modo: e.modo, hoyISO: CB.util.hoyISO() });
  }

  CB.partida.comprobarLogros(item);
  CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas,
                   indice: e.indice, total: e.guion.length });

  /* NUNCA menos de los 1600 ms de siempre: la espera se estira si la coreografía
     es larga, pero no se encoge nunca. Acortarla recortaría tiempo de lectura. */
  setTimeout(function () {
    if (CB.partida.estado === e) CB.partida.siguiente();
  },
             CB.ui.festejo.espera(festejo, 1600, msg));
};

CB.partida.esperaSegundoIntento = function (pista) {
  return CB.ui.festejo.espera('animo', 2600,
    'Esta no suma gemas. Te queda otro intento. ' + (pista || ''));
};

/* Fallo */
CB.partida.trasFallo = function (item, nivel, extra) {
  const e = CB.partida.estado, perfil = CB.perfil;

  CB.distractores.registrar(perfil, item, Number(item.valorDado));

  CB.audio.sfx('fallo');
  /* UNA SOLA CONSECUENCIA VISIBLE: no cae la gema y el marcador se queda quieto
     con un parpadeo gris. Jamás un número negativo (§3.4). */
  CB.ui.parpadeoGris();

  if (e.intento === 1) {
    /* Escalón 1: pista de Rocarr. NO apaga luz. NO rompe racha. */
    e.intento = 2;
    const pistas = CB.datos.MENSAJES.PISTAS[item.destreza];
    const pista = pistas ? pistas[0] : 'Vuelve a mirarlo con calma.';
    /* La regla es que la luz se apaga SOLO al fallar el segundo intento (docs/decisiones.md, Documento 5), y esa regla hay que contarla en el momento en que importa, no dejarla escrita en un documento que el niño no lee. */
    CB.ui.mensaje('Esta no suma gemas. Te queda otro intento. ' + pista, 'animo');
    CB.ui.festejo.mostrar('animo');
    CB.audio.sfx('rocarr');
    setTimeout(function () {
      if (CB.partida.estado !== e || e.itemActual !== item) return;
      CB.ui.ocultarMensaje();
      if (CB.partida.pintarRespuesta(item)) CB.partida.iniciarCronometro(!!item.subtipo);
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

  const diag = CB.diagnosticar(item, Number(item.valorDado));
  CB.ui.mostrarReparacion(item, diag.hipotesis, function (completada) {
    if (CB.partida.estado !== e || e.itemActual !== item) return;
    /* 30-ui SIEMPRE envio este booleano y este callback lo tiraba (declaraba
       cero parametros), asi que el bit 32 no se escribia jamas y el panel del
       adulto decia «0 % de explicaciones seguidas» a perpetuidad. La fila ya
       esta registrada —el registro corre en responder(), antes de la
       tarjeta—, de modo que se completa a posteriori, con el itemId como
       cerrojo. */
    if (completada) CB.partida.marcarReparacionCompletada(item);
    const r = CB.vidas.fallo(e.luces, 2, e.modo);
    if (r.apagada) {
      e.lucesApagadas++;
      CB.audio.sfx('luzApagada');
    }
    CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas,
                   indice: e.indice, total: e.guion.length });

    /* Dos implementaciones de la misma escalera, y solo una probada: la que no se usaba. */
    CB.partida.aplicarEscalon(
      CB.escalera.siguienteEscalon(
        CB.escalera.fallosDe(e.escalera, item.destreza), 2),
      item, perfil, e);

    CB.pantallas.ir('p-partida');
    if (CB.vidas.agotadas(e.luces)) { CB.partida.finalizar('luces'); return; }

    if (r.apagada) {
      const quedan = e.luces.luces;
      const aviso = 'Se ha apagado una luz. Te ' +
                  (quedan === 1 ? 'queda 1 luz.' : 'quedan ' + quedan + ' luces.');
      CB.ui.mensaje(aviso, 'animo');
      /* Tambien urgente: el mensaje visible dura 2,2 s y luego la pantalla pasa
         sola al siguiente item. Si el lector lo anuncia detras de la cola, se lo
         cuenta a un nino que ya esta en otra pregunta. */
      CB.a11y.urgente(aviso);
      setTimeout(function () {
        if (CB.partida.estado !== e) return;
        CB.ui.ocultarMensaje();
        CB.partida.siguiente();
      }, 2200);
      return;
    }
    CB.partida.siguiente();
  });
};

CB.partida.aplicarEscalon = function (esc, item, perfil, e) {
  if (!esc || !item || !perfil || !e) return null;

  if (esc.accion === 'enPausa') {
    /* Escalón 5: se retira el concepto SIN DECIRLE NADA AL NIÑO. */
    CB.escalera.pausarConcepto(perfil, item.nivelId);
    return 'enPausa';
  }

  if (esc.accion === 'prerrequisito') {
    /* Degradar así es lo correcto: nunca inventarse un nivel que el niño no haya superado ya, porque entonces «volvemos un paso atrás» sería mentira y le pondría delante algo aún más difícil. */
    const previo = CB.grafo.prerrequisitoDominado(item.nivelId, perfil);
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

/* Azar */
CB.partida.trasAzar = function (item, punt) {
  const e = CB.partida.estado;
  e.azares++;
  e.rachaPrimerIntento = 0;
  CB.vidas.fallaRacha(e.luces);

  const ef = CB.antiazar.aplicar(e.antiazar);

  /* Gluglú NO es un juez, es un accidente del entorno. En ninguna parte de la
     interfaz del niño aparece «adivinar», «al azar» ni «concéntrate» (§12.4). */
  CB.ui.mensaje(CB.antiazar.TEXTO_PERMITIDO, 'animo');
  CB.ui.personaje('gluglu', 'moja');
  CB.audio.sfx('gluglu');
  CB.ui.parpadeoGris();

  setTimeout(function () {
    if (CB.partida.estado !== e || e.itemActual !== item) return;
    if (ef.fuerzaDescanso) { CB.partida.microDescanso(); return; }
    CB.ui.ocultarMensaje();
    CB.ui.ocultarPersonaje('gluglu');
    e.intento = 1;
    if (CB.partida.pintarRespuesta(item)) CB.partida.iniciarCronometro(!!item.subtipo);
  }, 2600);
};

/* La explicacion se siguio hasta el final: el bit 32 se escribe A POSTERIORI
   sobre la fila ya registrada (responder() registra antes de abrir la tarjeta),
   con el itemId como cerrojo para no marcar una fila ajena. */
CB.partida.marcarReparacionCompletada = function (item) {
  const filas = CB.perfil && CB.perfil.respuestas;
  if (filas && filas.length && filas[filas.length - 1][1] === item.itemId) {
    filas[filas.length - 1][7] |= 32;
  }
};

/* Registro en el perfil */
CB.partida.registrarRespuesta = function (item, rt, correcto, az, extra) {
  const e = CB.partida.estado, perfil = CB.perfil;

  /* Array posicional documentado (§15.3): baja cada respuesta de ~380 a ~120
     bytes, que es lo que hace viable el modo aula con 30 perfiles. */
  let flags = 0;
  if (e.intento === 2) flags |= 1;
  if (extra.usoPista || e.usoPistaItem) flags |= 2;
  if (extra.usoAudio || e.usoAudioItem) flags |= 4;
  if (az.azar) flags |= 8;
  if (item.repaso) flags |= 16;
  if (extra.reparacionCompletada) flags |= 32;
  if (item.formato === 'opciones4') flags |= 64;

  perfil.respuestas.push([Date.now(), item.itemId, item.beta, item.D,
                          rt, correcto ? 1 : 0, Number(item.valorDado) || 0, flags]);

  if (item.subtipo) {
    const p = perfil.problemas[item.subtipo] ||
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
  const e = CB.partida.estado, perfil = CB.perfil, hoy = CB.util.hoyISO();

  let d = perfil.destrezas[item.destreza];
  const estadoAntes = d ? d.estado : 'nuevo';
  /* ANTES de repasado(), que escribe ultimoRepasoISO = hoy y dejaria la
     condicion de 48 h en falso perpetuo. */
  const repasoAntesISO = d ? d.ultimoRepasoISO : null;

  CB.adaptativo.registrar(item.destreza, {
    correcto: correcto, intento: e.intento, rtMs: e.respuestas.length
      ? e.respuestas[e.respuestas.length - 1].rt : 0,
    beta: item.beta, ejemplo: item.consigna || item.enunciado
  }, perfil, hoy);

  d = perfil.destrezas[item.destreza];
  CB.memoria.repasado(d, correcto, hoy);
  const estadoDespues = CB.memoria.clasificar(d, hoy, false);
  d.estado = estadoDespues;

  const estadoNivel = perfil.niveles[item.nivelId];
  estadoNivel.n++;
  if (correcto) estadoNivel.aciertos++;
  estadoNivel.ultimoISO = hoy;
  CB.leitner.actualizar(estadoNivel, correcto);
  CB.adaptativo.actualizarD(estadoNivel, correcto, e.intento === 1);

  /* «Veta restaurada» concede luz, pero solo si han pasado ≥48 h desde el
     último repaso. La condicion estuvo documentada aqui y en 28-memoria desde
     su nacimiento y NO ESTABA ESCRITA en ningun sitio: hanPasado48h existia y
     nadie la llamaba (la familia de marcarLectura). Acotaba el daño el tope de
     2 luces por partida, no la regla. */
  if (correcto && CB.memoria.vetaConLuz(estadoAntes, estadoDespues, repasoAntesISO, hoy)) {
    if (e.destrezasMejoradas.indexOf(item.destreza) === -1) {
      e.destrezasMejoradas.push(item.destreza);
    }
    const nuevos = CB.logros.comprobar('destreza', {
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

/* Logros y luces extra */
CB.partida.comprobarLogros = function (item) {
  const e = CB.partida.estado;
  const nuevos = CB.logros.comprobar('acierto', {
    perfil: CB.perfil, modo: e.modo, hoyISO: CB.util.hoyISO(),
    estadoLuces: e.luces, rachaPrimerIntento: e.rachaPrimerIntento,
    esRetoBonus: item.esRetoBonus
  });
  CB.partida.aplicarLogros(nuevos);
};

CB.partida.festejarLogro = function (grito, indice) {
  if (!indice) { CB.ui.festejo.mostrar('logro', grito); return; }
  const e = CB.partida.estado;
  setTimeout(function () {
    /* finalizar() pone estado a null después de pintar p-fin; allí la cola sí
       pertenece a la partida que acaba. En cualquier otra pantalla o partida,
       el logro diferido ya es caduco. */
    if (CB.partida.estado === e ||
        (CB.partida.estado === null && CB.pantallas.actual === 'p-fin')) {
      CB.ui.festejo.mostrar('logro', grito);
    }
  },
             CB.ui.festejo.espera('logro', 0) * indice);
};

CB.partida.aplicarLogros = function (nuevos) {
  const e = CB.partida.estado;
  let i, l, r;
  for (i = 0; i < (nuevos || []).length; i++) {
    l = nuevos[i];
    if (!l.luz) {
      CB.a11y.anunciar('Logro: ' + l.nombre);
      /* Sin esta línea el nombre del logro solo lo oía un lector de pantalla. */
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

/* Antes no devolvía nada y su única salida era un anuncio con el ID CRUDO —«el cromo de gluglu»—, que solo oía un lector de pantalla. */
CB.partida.darCromo = function () {
  const perfil = CB.perfil, e = CB.partida.estado;
  const posibles = Object.keys(CB.ui.CRIATURAS).filter(function (c) {
    return perfil.cromos.indexOf(c) === -1;
  });
  if (!posibles.length) return null;
  const c = CB.util.elegir(e.rng, posibles);
  perfil.cromos.push(c);
  /* El sonido lo pone la cinta 'veta-madre', que ya suena a cofre. Sonaba dos
     veces seguidas y se oía como un eco. */
  return c;
};

/* Los logros que dispara un cromo, aparte y a posteriori. */
CB.partida.logrosDeCromo = function () {
  const e = CB.partida.estado;
  if (!e) return;
  CB.partida.aplicarLogros(CB.logros.comprobar('cromo', {
    perfil: CB.perfil, modo: e.modo, hoyISO: CB.util.hoyISO()
  }));
};

/* Avanzar */
CB.partida.siguiente = function () {
  const e = CB.partida.estado;
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
  const e = CB.partida.estado, perfil = CB.perfil;
  const limite = (perfil.ajustes.limiteSesionMin || 20) * 60000;
  const transcurrido = Date.now() - e.inicioTs;

  /* Aviso suave 2 minutos antes, sin cuenta atrás numérica. */
  if (!e.avisoLimiteDado && transcurrido > limite - 120000) {
    e.avisoLimiteDado = true;
    CB.a11y.anunciar('Nos queda poco para la última pregunta.');
  }
  /* NUNCA interrumpe un ítem ni un jefe: marca y deja terminar. */
  if (transcurrido >= limite) e.finTrasEsteItem = true;
};

/* Micro-descansos: 5 distintos, en bolsa para que no se repitan */
CB.partida.DESCANSOS = [
  { id: 'romper', titulo: '¡Descanso! Rompe los bloques' },
  { id: 'blopi', titulo: '¡Descanso! Dale de comer a Blopi' },
  { id: 'casa', titulo: '¡Descanso! Coloca bloques en tu casa' },
  /* El manejador de microDescanso solo marca el cofre como roto, tira partículas y suena: no suma ni una gema a e.gemas ni a perfil.gemas, y los tres cofres siguen pulsables, así que «Elige uno» tampoco era verdad. */
  { id: 'cofre', titulo: '¡Descanso! Rompe los cofres de piedra' },
  { id: 'vagoneta', titulo: '¡Descanso! Monta en la vagoneta' }
];

CB.partida.microDescanso = function () {
  const e = CB.partida.estado;

  const m = CB.mensajes.asegurar(CB.perfil);
  const idx = CB.mensajes.sacarDeBolsa(m, 'bolsaDescansos',
    CB.partida.DESCANSOS.length, [], [], 0, e.rng);
  const d = CB.partida.DESCANSOS[idx < 0 ? 0 : idx];

  CB.pantallas.ir('p-descanso');
  const t = document.getElementById('descanso-titulo');
  if (t) t.textContent = d.titulo;

  const tablero = document.getElementById('descanso-tablero');
  CB.ui.vaciar(tablero);

  if (d.id === 'cofre') {
    /* Se ve la lista completa de premios ANTES de abrir: sin cofres opacos, que
       es un patrón oscuro prohibido en un juego infantil (§21.4). */
    const aviso = CB.ui.crear('p', 'texto texto--menor', 'Tres cofres de piedra. Rómpelos todos.');
    tablero.appendChild(aviso);
  }

  const n = (d.id === 'cofre') ? 3 : 8;
  let i;
  for (i = 0; i < n; i++) {
    (function () {
      const b = CB.ui.crear('button', 'tablero-descanso__bloque');
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

  const seguir = document.getElementById('btn-seguir');
  if (seguir) {
    seguir.onclick = function () {
      CB.pantallas.ir('p-partida');
      CB.partida.servirItem();
    };
  }
  /* Ninguno se puede fallar, ninguno puntúa, todos se pueden saltar. */
};

/* Pausa y partida guardada */
CB.partida.pausar = function () {
  const e = CB.partida.estado;
  if (!e || e.pausada) return;
  e.pausada = true;
  CB.partida.pararCronometro();
  CB.partida.guardarEnCurso();
  CB.pantallas.ir('p-ajustes', { desdePausa: true });
};

CB.partida.reanudar = function () {
  const e = CB.partida.estado;
  if (!e) return;
  e.pausada = false;
  CB.pantallas.ir('p-partida');
  CB.partida.iniciarCronometro(!!(e.itemActual && e.itemActual.subtipo));
};

CB.partida.guardarEnCurso = function () {
  const e = CB.partida.estado, perfil = CB.perfil;
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
  const p = perfil && perfil.partidaEnCurso;
  if (!p) return false;
  /* Caducidad: pasadas 24 h se descarta y se ofrece empezar de nuevo. */
  if (Date.now() - p.iniciadaTs > 86400000) { perfil.partidaEnCurso = null; return false; }
  return true;
};

CB.partida.reanudarGuardada = function (perfil) {
  const p = perfil.partidaEnCurso;
  if (!p) return null;
  const e = CB.partida.iniciar({ mundoId: p.mundo, modo: p.modo });
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

/* Fin de la expedición */
CB.partida.finalizar = function (motivo) {
  const e = CB.partida.estado, perfil = CB.perfil;
  if (!e) return;
  CB.partida.pararCronometro();
  e.motivoFin = motivo;

  const precision1er = e.preguntas ? (e.aciertos1er / e.preguntas) : 0;
  const bono = CB.puntuacion.bonoFinal(
    precision1er, e.luces.luces >= CB.vidas.INICIALES, e.preguntas >= 15,
    e.preguntas, e.puntos, e.modoTiempo
  );
  e.puntos += bono.total;
  e.gemas += Math.max(0, Math.round(bono.total / 50));
  perfil.gemas += Math.max(0, Math.round(bono.total / 50));
  perfil.puntosTotales = (perfil.puntosTotales || 0) + Math.max(0, e.puntos);

  /* EL RÉCORD SE LEE ANTES DE PISARLO. Si se lee después, `e.puntos > récord`
     es falso siempre y la celebración no se dispara nunca. Y se compara SIEMPRE
     contra el récord del MISMO modo: el antifarmeo cerrado en 24-logros.js. */
  const claveModo = (e.modo === 'tranquila') ? 'facil' : e.modoTiempo;
  if (!perfil.mejorPuntuacion[claveModo]) perfil.mejorPuntuacion[claveModo] = 0;
  const esRecord = e.preguntas > 0 && e.puntos > perfil.mejorPuntuacion[claveModo];
  if (esRecord) perfil.mejorPuntuacion[claveModo] = e.puntos;

  const hoy = CB.util.hoyISO();
  perfil.historial.push({
    /* Sin el modo, el adulto ve puntuaciones que no puede comparar entre si y no
       sabe por que una sesion dio el doble que otra. */
    fechaISO: hoy, modo: e.modo, modoTiempo: e.modoTiempo, mundo: e.mundo.id,
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

  const mundoCompletado = CB.catalogo.progresoMundo(e.mundo.id, perfil).fraccion >= 0.6;
  /* Se GUARDAN para pintarlos en p-fin. Se aplicaban aquí, estando todavía en
     p-partida, y nueve líneas después la pantalla cambiaba: «Primer pico»,
     «Cantero» y «Vuelvo mañana» sonaban sobre una pantalla que desaparecía. */
  const logrosFin = CB.logros.comprobar('finPartida', {
    perfil: perfil, modo: e.modo, hoyISO: hoy, mundoCompletado: mundoCompletado
  });
  CB.partida.aplicarLogros(logrosFin);

  const abiertosAntes = {};
  CB.MUNDOS.forEach(function (m) {
    abiertosAntes[m.id] = !!(perfil.mundos[m.id] && perfil.mundos[m.id].desbloqueado);
  });
  CB.partida.desbloquearMundos();
  let mundoNuevo = null;
  CB.MUNDOS.forEach(function (m) {
    if (!abiertosAntes[m.id] && perfil.mundos[m.id] && perfil.mundos[m.id].desbloqueado) {
      mundoNuevo = m;
    }
  });

  /* PROMOCIÓN DE CURSO (3.0.0, E129). Con todos los nucleares del curso
     superados, el perfil sube de curso él solo y la felicitación se lleva el
     cartel grande. cursosCompletados es el cerrojo: una vez por curso, aunque
     el adulto baje y vuelva a subir. Si el curso siguiente aún no tiene
     contenido (fases pendientes), se celebra la maestría y no se sube a un
     curso vacío. */
  const cursoNuevo = CB.partida.comprobarPromocion(perfil);

  perfil.partidaEnCurso = null;
  CB.almacen.podar(perfil, {});
  CB.almacen.guardarPerfil(perfil);

  CB.partida.pintarFin(motivo, bono, { logros: logrosFin, mundoNuevo: mundoNuevo,
                                       esRecord: esRecord, cursoNuevo: cursoNuevo });
  CB.partida.estado = null;
};

/* Devuelve el curso al que se ha promocionado, 'maestria' si se ha dominado el
   último curso disponible, o null si no ha pasado nada. Muta el perfil pero NO
   guarda: se guarda en finalizar, junto con todo lo demás. */
CB.partida.comprobarPromocion = function (perfil) {
  const curso = CB.catalogo.cursoDe(perfil);
  if (!perfil.cursosCompletados) perfil.cursosCompletados = [];
  if (perfil.cursosCompletados.indexOf(curso) !== -1) return null;
  if (!CB.grafo.cursoDominado(perfil, curso)) return null;

  perfil.cursosCompletados.push(curso);
  const disponibles = CB.catalogo.cursosDisponibles();
  const siguiente = curso + 1;
  if (curso < 6 && disponibles.indexOf(siguiente) !== -1) {
    perfil.curso = siguiente;
    return siguiente;
  }
  return 'maestria';
};

CB.partida.desbloquearMundos = function () {
  const perfil = CB.perfil;
  let i, m;
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
  const e = CB.partida.estado, perfil = CB.perfil;
  CB.pantallas.ir('p-fin');

  const titulo = document.getElementById('fin-titulo');
  const sub = document.getElementById('fin-subtitulo');

  /* Prohibido literalmente: «has perdido», «game over», «fin de la partida»,
     «fallaste», «te has quedado sin», y cualquier recuento de fallos. */
  const textos = {
    luces: ['Fin de la expedición', 'Se ha apagado la luz del casco. ¡Mañana la cargamos!'],
    guion: ['Fin de la expedición', '¡Has cavado toda la galería de hoy!'],
    limiteSesion: ['Misión cumplida por hoy', 'Se ha acabado el tiempo de hoy. ¡Buena expedición!'],
    salida: ['Fin de la expedición', 'Hasta la próxima bajada a la cantera.'],
    pausa: ['Fin de la expedición', 'Lo dejamos aquí por hoy. Todo queda guardado.']
  };
  const t = textos[motivo] || textos.guion;
  if (titulo) titulo.textContent = t[0];
  if (sub) sub.textContent = t[1];

  /* 1.º Lo que has dominado hoy. Orden de lectura obligatorio. */
  const dom = document.getElementById('fin-dominado');
  CB.ui.vaciar(dom);
  if (e.destrezasMejoradas.length) {
    e.destrezasMejoradas.forEach(function (slug) {
      const d = perfil.destrezas[slug];
      const fila = CB.ui.crear('div', 'bloque-dominado');
      fila.appendChild(CB.ui.crear('span', null, CB.memoria.ICONO[d.estado] || '◆'));
      fila.appendChild(CB.ui.crear('span', null,
        CB.partida.nombreDestreza(slug) + ' → ' + CB.memoria.ETIQUETA[d.estado]));
      dom.appendChild(fila);
    });
  } else {
    dom.appendChild(CB.ui.crear('p', 'texto texto--menor',
      'Hoy has practicado. Mañana se notará en el mapa.'));
  }

  hitos = hitos || {};
  const caja = document.getElementById('fin-hitos');
  const lista = document.getElementById('fin-hitos-lista');
  const dijo = [];
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

    if (hitos.cursoNuevo) {
      const frase = (hitos.cursoNuevo === 'maestria')
        ? '¡Has dominado todo el contenido de tu curso!'
        : '¡Curso completado! Pasas a ' + hitos.cursoNuevo + '.º de Primaria.';
      lista.appendChild(CB.ui.crear('p', null, frase));
      dijo.push(frase);
    }

    caja.hidden = !dijo.length;
  }

  /* 2.º Gemas y desglose del bono. */
  const g = document.getElementById('fin-gemas');

  if (g) { g.textContent = '0'; CB.ui.contarHasta(g, Math.max(0, e.gemas)); }
  const bl = document.getElementById('fin-bono');
  if (bl) {

    const gemasBono = Math.max(0, Math.round(bono.total / 50));
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
  /* Una celebración a la vez, y la promoción de curso gana a todas: es el
     momento más raro del juego — como mucho cinco veces en la vida de un
     perfil — y el espectáculo es inversamente proporcional a la frecuencia. */
  if (hitos.cursoNuevo === 'maestria') {
    CB.ui.festejo.mostrar('logro', '¡Curso dominado!');
  } else if (hitos.cursoNuevo) {
    CB.ui.festejo.mostrar('logro', '¡Pasas a ' + hitos.cursoNuevo + '.º!');
  } else if (hitos.mundoNuevo) CB.ui.festejo.mostrar('jefe', '¡Paso abierto!');
  else if (hitos.esRecord) CB.ui.festejo.mostrar('logro', '¡Tu récord!');

  /* 3.º Momento socioafectivo: 1,5 s DESPUÉS, y solo si la partida duró ≥3 min.
     Nunca inmediatamente después de la tercera luz. */
  const cajaAnimo = document.getElementById('fin-animo');
  const duro = (Date.now() - e.inicioTs) >= 180000;
  if (cajaAnimo) {
    cajaAnimo.hidden = true;
    if (duro) {
      setTimeout(function () {
        if (CB.pantallas.actual === 'p-fin') cajaAnimo.hidden = false;
      }, 1500);
    }
  }

  /* Tras dos partidas seguidas acabadas por luces, se ofrece Cantera Tranquila
     en primer lugar. La recomendación no puede ser una promesa vacía (§3.8). */
  const h = perfil.historial;
  const dosSeguidas = h.length >= 2 &&
    h[h.length - 1].motivoFin === 'luces' && h[h.length - 2].motivoFin === 'luces';
  const btnTranquila = document.getElementById('btn-tranquila-fin');
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
  vocabulario: 'Las palabras',
  division: 'La división', fracciones: 'Las fracciones',
  decimales: 'Los números con coma', porcentajes: 'El tanto por ciento',
  enteros: 'Los números bajo cero',
  medida: 'Las medidas', tiempo: 'El reloj y el tiempo',
  datos: 'Los datos y los gráficos', azar: 'El azar',
  patrones: 'Las series y los patrones', algebra: 'Las igualdades y la incógnita',
  geometria: 'Las figuras y los ángulos', espacio: 'El espacio y las coordenadas'
};
CB.partida.nombreDestreza = function (slug) {
  return CB.partida.NOMBRES_DESTREZA[slug] || slug;
};

/* Acciones de la barra de herramientas */

CB.partida.accionLeerSuave = function () {
  const e = CB.partida.estado;
  if (!e || !e.itemActual) return;
  e.usoAudioItem = true;
  const texto = CB.voz.textoDeItem(e.itemActual);
  CB.voz.cancelar();
  CB.partida.pararCronometro();
  CB.voz.leerOGuiar(texto, CB.ui.resaltarPalabra, function () {
    CB.ui.resaltarLinea(-1);
    CB.partida.iniciarCronometro(!!e.itemActual.subtipo);
  });
};

CB.partida.accionLeer = function () {
  const e = CB.partida.estado;

  /* La calibración NO crea estado de partida (no tiene cronómetro, ni luces, ni puntuación: no debe parecer un test). */
  if (!e || !e.itemActual) {
    /* Cada pantalla resalta en SU contenedor: sin pasarlo, lecturaGuiada caia
       en #item-enunciado —el nodo OCULTO de la partida— y la lectura guiada de
       la calibracion y del jefe no resaltaba nada. */
    if (CB.pantallas.actual === 'p-calibracion' &&
        CB.calibracion && CB.calibracion.consignaActual) {
      const cajaCal = document.getElementById('cal-enunciado');
      CB.voz.cancelar();
      CB.voz.leerOGuiar(CB.voz.textoDeItem({ consigna: CB.calibracion.consignaActual }),
                        function (i, palabra) { CB.ui.resaltarPalabra(i, palabra, cajaCal); },
                        function () { CB.ui.resaltarLinea(-1, cajaCal); });
    } else if (CB.pantallas.actual === 'p-jefe') {
      /* La tecla L (06-a11y) sirve p-jefe desde siempre, pero esta funcion no
         tenia rama para el: el atajo era un boton muerto. */
      const cajaJefe = document.getElementById('jefe-enunciado');
      if (cajaJefe && cajaJefe.textContent) {
        CB.voz.cancelar();
        CB.voz.leerOGuiar(CB.voz.textoDeItem({ consigna: cajaJefe.textContent }),
                          function (i, palabra) { CB.ui.resaltarPalabra(i, palabra, cajaJefe); },
                          function () { CB.ui.resaltarLinea(-1, cajaJefe); });
      }
    }
    return;
  }

  e.usoAudioItem = true;
  const texto = CB.voz.textoDeItem(e.itemActual);
  /* Pulsar el altavoz salta el bloqueo de 800 ms: el niño ya ha invertido
     tiempo en el ítem, no está respondiendo al tuntún (§3.5). */
  CB.partida.bloqueado = false;
  CB.voz.cancelar();
  CB.partida.pararCronometro();
  CB.voz.leerOGuiar(texto, CB.ui.resaltarPalabra, function () {
    CB.ui.resaltarLinea(-1);
    CB.partida.iniciarCronometro(!!e.itemActual.subtipo);
  });
};

CB.partida.accionPista = function () {
  const e = CB.partida.estado;
  if (!e || !e.itemActual) return;
  e.usoPistaItem = true;
  const pistas = CB.datos.MENSAJES.PISTAS[e.itemActual.destreza];
  /* La pista está SIEMPRE disponible y NO cuesta ninguna luz (§3.2). */
  CB.ui.mensaje(pistas ? pistas[1] : 'Léelo otra vez con calma.', 'animo');
  CB.ui.personaje('rocarr', 'pista');
  CB.audio.sfx('rocarr');
};

/* El botón de silencio dice la verdad, y lo dicen los DOS */
CB.partida.sincronizarSonido = function () {
  const s = !!CB.audio.silenciado;
  const bs = document.querySelectorAll('[data-accion="sonido"]');
  let i, ico;
  for (i = 0; i < bs.length; i++) {
    /* Solo el icono: el rótulo «Sonido» se queda, y escribir sobre el botón
       entero se lo llevaría por delante. */
    ico = bs[i].querySelector('.btn-bloque__ico') || bs[i];
    ico.textContent = s ? '🔇' : '🔈';
    bs[i].setAttribute('aria-pressed', s ? 'true' : 'false');
  }
};

CB.partida.accionDe = function (nodo) {
  let n = 0, a = null;
  while (nodo && nodo !== document.body && n < 4) {
    if (nodo.getAttribute) a = nodo.getAttribute('data-accion');
    if (a) return a;
    nodo = nodo.parentNode; n++;
  }
  return null;
};

CB.partida.MS_CONFIRMAR_SALIDA = 3000;

/* NO se usa CB.componentes.pedirConfirmacion: esa función empieza con `if (!_confirmacionPendiente) { alConfirmar(); return; }`, y esa bandera solo se pone a true cuando el antiazar ha detectado azar. */
CB.partida.pedirSalida = function (nodo) {
  const boton = nodo && nodo.closest ? nodo.closest('[data-accion="salir-partida"]') : null;
  if (!boton) { CB.partida.finalizar('salida'); return false; }

  if (boton.getAttribute('data-confirmando') === 'si') {
    /* Lo cazó E66, en su tercera aserción, que es justo la que parecía la menos importante. */
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
    const a = CB.partida.accionDe(ev.target);
    if (!a) return;

    /* Ya no hay botón «Leer»: se retiró a petición. accionLeer() sigue viva
       porque la tecla L de CB.a11y la usa. */
    if (a === 'pista') CB.partida.accionPista();
    if (a === 'pausa') CB.partida.pausar();
    if (a === 'sonido') {
      const s = CB.audio.silenciar(!CB.audio.silenciado);
      CB.partida.sincronizarSonido();
      const aj = CB.almacen.ajustesDispositivo();
      aj.silencio = s;
      CB.almacen.guardarAjustesDispositivo(aj);
    }
    if (a === 'salir-partida') CB.partida.pedirSalida(ev.target);
  });
};
