/* casos-modos.js — Los tres modos de juego (E114-E123) */

CB.pruebas.suite('Modos: Fácil, Normal y Experto', function () {
  const t = CB.pruebas;

  /* E114 · La tabla */
  const ids = Object.keys(CB.modos.TABLA).sort();
  t.ok(ids.join('|') === 'experto|facil|normal',
    'E114 · la tabla declara los tres modos y solo esos', ids.join(','));
  t.ok(CB.modos.ORDEN.join('|') === 'facil|normal|experto',
    'E114 · ORDEN va de menos a más reto', CB.modos.ORDEN.join(','));
  t.igual(CB.modos.TABLA.facil.segundos, 0, 'E114 · Fácil no tiene cuenta atrás');
  t.igual(CB.modos.TABLA.normal.segundos, 120, 'E114 · Normal da 2 minutos');
  t.igual(CB.modos.TABLA.experto.segundos, 30, 'E114 · Experto da 30 segundos');

  /* E115 · Ninguna palanca está del revés.
     Se recorre CB.modos.PALANCAS en vez de enumerarlas a mano: una palanca nueva
     que alguien añada desordenada falla aquí sola. */
  const desordenadas = CB.modos.PALANCAS.filter(function (k) {
    const f = CB.modos.TABLA.facil[k];
    const n = CB.modos.TABLA.normal[k];
    const x = CB.modos.TABLA.experto[k];
    return !(f <= n && n < x);
  });
  t.ok(CB.modos.PALANCAS.length === 5 && desordenadas.length === 0,
    'E115 · las ' + CB.modos.PALANCAS.length + ' palancas cumplen facil ≤ normal < experto',
    desordenadas.join(', '));

  /* Y que ninguna esté sin declarar en algún modo: undefined <= undefined es
     false, pero NaN comparado con NaN también, y un despiste así se lee igual. */
  const sinDeclarar = [];
  CB.modos.ORDEN.forEach(function (m) {
    CB.modos.PALANCAS.forEach(function (k) {
      if (!isFinite(CB.modos.TABLA[m][k])) sinDeclarar.push(m + '.' + k);
    });
  });
  t.igual(sinDeclarar.length, 0,
    'E115 · los tres modos declaran las cinco palancas con un número');

  /* El reloj */
  t.igual(CB.modos.msDeItem('experto'), 30000, 'Experto da 30 000 ms');
  t.igual(CB.modos.msDeItem('normal'), 120000, 'Normal da 120 000 ms');

  /* LA salvaguarda legal: sin esto el juego incumple la WCAG 2.2.1, que exige
     poder desactivar un límite de tiempo, y con ello la EN 301 549. */
  t.igual(CB.modos.msDeItem('facil'), 0,
    'Fácil apaga la cuenta atrás: un límite de tiempo tiene que poder quitarse');

  t.igual(CB.modos.msDeItem('modoQueNoExiste'), 120000,
    'un modo desconocido cae al de por defecto, ni sin límite ni con límite cero');

  /* E120 · Migración de los perfiles guardados */
  t.igual(CB.modos.migrarDesdeV2('sinPrisa'), 'facil', 'E120 · «Sin prisa» pasa a Fácil');
  t.igual(CB.modos.migrarDesdeV2('conCalma'), 'normal', 'E120 · «Con calma» pasa a Normal');
  t.igual(CB.modos.migrarDesdeV2('normal'), 'experto',
    'E120 · el viejo «Normal» pasa a Experto y conserva sus 30 s exactos');
  t.igual(CB.modos.migrarDesdeV2('loQueSea'), 'normal',
    'E120 · un perfil sin modo reconocible cae al de por defecto');

  /* Y las dos funciones NO son la misma: «normal» significa una cosa en el
     vocabulario viejo y otra en el nuevo, y confundirlas dejaba al niño del
     viejo «Normal» con 90 s de más y el récord en otro modo. */
  t.ok(CB.modos.migrarDesdeV2('normal') !== CB.modos.normalizar('normal'),
    'E120 · migrar y normalizar no son la misma función, porque «normal» existe en los dos vocabularios');
  t.igual(CB.modos.normalizar('facil'), 'facil',
    'E120 · normalizar deja intacto un modo que ya existe');
  t.igual(CB.modos.normalizar('sinPrisa'), 'normal',
    'E120 · y no migra: un nombre que no está en la tabla cae al de por defecto');

  /* A nadie se le acorta el reloj: es la regla que ordena el mapa entero. */
  const acortados = Object.keys(CB.modos.MIGRACION).filter(function (viejo) {
    const antes = { sinPrisa: 0, conCalma: 30, normal: 30 }[viejo];
    return CB.modos.TABLA[CB.modos.MIGRACION[viejo]].segundos < antes;
  });
  t.igual(acortados.length, 0,
    'E120 · la migración no acorta el reloj de ningún perfil existente',
    acortados.join(', '));

  /* Y el perfil migrado de verdad, no solo la función pura */
  const v2 = {
    version: 2, id: 'p-mig', mote: 'Topo Cavador', avatar: 0,
    creadoISO: CB.util.hoyISO(),
    ajustes: { modoTiempo: 'conCalma', voz: true },
    mejorPuntuacion: { normal: 900, conCalma: 400, sinPrisa: 120 },
    historial: [], destrezas: {}, niveles: {}
  };
  const mig = CB.almacen.migrar(v2);
  t.igual(mig.version, CB.almacen.VERSION_ESQUEMA,
    'E120 · el perfil sale con la versión de esquema vigente (v4 desde 3.0.0)');
  t.igual(mig.ajustes.modoTiempo, 'normal', 'E120 · y con el modo renombrado');
  t.igual(mig.ajustes.sinLimiteTiempo, false,
    'E120 · y con el ajuste de accesibilidad declarado, no ausente');
  t.ok(mig.mejorPuntuacion.experto === 900 &&
       mig.mejorPuntuacion.normal === 400 &&
       mig.mejorPuntuacion.facil === 120,
    'E120 · cada récord viaja con su modo y ninguno se pierde',
    JSON.stringify(mig.mejorPuntuacion));

  /* Un perfil nuevo ya nace con las claves nuevas */
  const nuevo = CB.pruebas.perfilNuevo();
  t.igual(nuevo.ajustes.modoTiempo, CB.modos.POR_DEFECTO,
    'un perfil nuevo empieza en el modo por defecto');
  t.ok(Object.keys(nuevo.mejorPuntuacion).sort().join('|') === 'experto|facil|normal',
    'un perfil nuevo trae los tres récords con los nombres nuevos',
    Object.keys(nuevo.mejorPuntuacion).join(','));

  /* E116 · bonoFinal sin el sexto parámetro devuelve lo de siempre.
     Es lo que permite que A6 y las llamadas viejas sigan valiendo sin tocarlas. */
  const sinModo = CB.puntuacion.bonoFinal(0.92, true, true, 15, 1500);
  t.ok(Math.abs(sinModo.factor - 1.45) < 1e-9 && sinModo.total === 675 &&
       sinModo.extras.length === 3,
    'E116 · bonoFinal sin modo devuelve exactamente lo que devolvía antes',
    'factor ' + sinModo.factor + ', total ' + sinModo.total);

  const conFacil = CB.puntuacion.bonoFinal(0.92, true, true, 15, 1500, 'facil');
  t.ok(Math.abs(conFacil.factor - 1.45) < 1e-9 &&
       CB.puntuacion.CLAVE_MODO.facil === undefined,
    'E116 · Fácil no suma extra y tampoco añade un rótulo vacío a la lista',
    JSON.stringify(conFacil.extras));

  const conNormal  = CB.puntuacion.bonoFinal(0.92, true, true, 15, 1500, 'normal');
  const conExperto = CB.puntuacion.bonoFinal(0.92, true, true, 15, 1500, 'experto');
  t.ok(conFacil.total < conNormal.total && conNormal.total < conExperto.total,
    'E116 · el bono final crece con el modo: ' + conFacil.total + ' < ' +
    conNormal.total + ' < ' + conExperto.total);
  t.ok(conNormal.extras.indexOf('modoNormal') !== -1 &&
       conExperto.extras.indexOf('modoExperto') !== -1,
    'E116 · y cada extra llega con su clave, para poder pintarlo en p-fin');

  /* Recorre los MODOS, no una lista escrita a mano: un modo nuevo con bono y sin
     clave no falla, simplemente deja de sumarlo y nadie se entera. */
  const sinClave = CB.modos.ORDEN.filter(function (m) {
    return CB.modos.extraBonoFinal(m) > 0 && !CB.puntuacion.CLAVE_MODO[m];
  });
  t.igual(sinClave.length, 0,
    'E116 · todo modo que da bono final declara su clave de extra', sinClave.join(', '));

  /* El niño tiene que poder LEER por qué ha ganado más: una clave sin rótulo se
     pinta cruda («modo_experto») en la pantalla de fin. */
  const sinRotulo = conNormal.extras.concat(conExperto.extras).filter(function (k) {
    return !CB.puntuacion.ETIQUETA_EXTRA[k];
  });
  t.igual(sinRotulo.length, 0,
    'E116 · todo extra que el modo añade tiene rótulo en español', sinRotulo.join(', '));

  /* Y el rótulo no puede nombrar un reloj: con «sin límite de tiempo» el modo
     sigue dando su extra y no hubo cuenta atrás. */
  const mienten = Object.keys(CB.puntuacion.CLAVE_MODO).map(function (m) {
    return CB.puntuacion.CLAVE_MODO[m];
  }).filter(function (k) {
    return /minuto|segundo/.test(CB.puntuacion.ETIQUETA_EXTRA[k]);
  });
  t.igual(mienten.length, 0,
    'E116 · el rótulo del extra nombra el modo, no un reloj que puede no existir',
    mienten.join(', '));

  /* E117 · El modo NO entra en la fórmula. Es la razón de que los 30 casos
     exactos de §11.7 y el antifarmeo de §11.3 sigan intactos. */
  const it = { puntosBase: 100, tIdeal: 8000, tLimite: 24000 };
  const enNormal  = CB.puntuacion.calcular(it, 12000, { correcto: true, intento: 1, modoTiempo: 'normal' });
  const enExperto = CB.puntuacion.calcular(it, 12000, { correcto: true, intento: 1, modoTiempo: 'experto' });
  t.ok(enNormal.puntos === enExperto.puntos && enNormal.gemas === enExperto.gemas,
    'E117 · con el mismo tiempo de respuesta, Normal y Experto puntúan IGUAL en la fórmula',
    enNormal.puntos + ' vs ' + enExperto.puntos);

  const enFacil = CB.puntuacion.calcular(it, 12000, { correcto: true, intento: 1, modoTiempo: 'facil' });
  t.igual(enFacil.mTiempo, CB.puntuacion.M_SIN_PRISA,
    'E117 · y Fácil conserva su multiplicador fijo, que es el antifarmeo de §11.3');

  /* E118 · La gema extra del modo */
  t.igual(CB.modos.gemasDeAcierto('experto', { correcto: true, azar: false, intento: 1 }), 1,
    'E118 · Experto da una gema extra por acertar a la primera');
  t.igual(CB.modos.gemasDeAcierto('experto', { correcto: true, azar: false, intento: 2 }), 0,
    'E118 · pero no en segundo intento');
  t.igual(CB.modos.gemasDeAcierto('experto', { correcto: true, azar: true, intento: 1 }), 0,
    'E118 · y nunca al azar: responder al azar no puntúa (requisito 7)');
  t.igual(CB.modos.gemasDeAcierto('experto', { correcto: false, azar: false, intento: 1 }), 0,
    'E118 · ni por fallar');
  t.igual(CB.modos.gemasDeAcierto('normal', { correcto: true, azar: false, intento: 1 }), 0,
    'E118 · Normal y Fácil no dan gema extra');

  /* E119 · El bono de rapidez del modo no premia la lentitud */
  t.igual(CB.modos.rapidezDe('experto', 0), 0,
    'E119 · el extra de Experto NO convierte un cero en un uno: una respuesta lenta no cobra bono');
  t.igual(CB.modos.rapidezDe('experto', 3), 4, 'E119 · pero sí sube el bono que ya existía');
  t.igual(CB.modos.rapidezDe('normal', 3), 3, 'E119 · y Normal deja el bono como estaba');
  const negativo = CB.modos.ORDEN.filter(function (m) {
    return CB.modos.rapidezDe(m, -2) !== 0 || CB.modos.rapidezDe(m, NaN) !== 0;
  });
  t.igual(negativo.length, 0,
    'E119 · un bono base imposible da cero en los tres modos, nunca un negativo');

  /* E121 · En Fácil el reloj no aparece.
     Se mide el nodo, no la variable: arrancar(0) tiene que DEJARLO OCULTO. */
  const caja = document.getElementById('hud-reloj');
  if (!caja) {
    t.ok(false, 'E121 · falta #hud-reloj en la maqueta de pruebas');
  } else {
    CB.ui.reloj.caja = null;                       // fuerza un montar() limpio
    CB.ui.reloj.arrancar(CB.modos.msDeItem('experto'));
    const visibleEnExperto = !caja.hidden;
    CB.ui.reloj.arrancar(CB.modos.msDeItem('facil'));
    const visibleEnFacil = !caja.hidden;
    CB.ui.reloj.parar();
    t.ok(visibleEnExperto && !visibleEnFacil,
      'E121 · el reloj se ve en Experto y NO se ve en Fácil',
      'experto ' + visibleEnExperto + ', facil ' + visibleEnFacil);
  }

  /* E122 · La bajada automática tras tres tiempos agotados */
  t.ok(CB.vidas.TIMEOUTS_CAMBIA_MODO < CB.vidas.TIMEOUTS_FIN,
    'E122 · el cambio de modo llega antes que el fin amable');
  const fuente = String(CB.partida.tiempoAgotado);
  t.ok(fuente.indexOf('facil') !== -1,
    'E122 · tres tiempos agotados seguidos bajan la partida a Fácil');
  t.igual(CB.modos.msDeItem('facil'), 0,
    'E122 · y desde Fácil ya no puede volver a agotarse el tiempo: el reloj está apagado');

  /* E123 · Quitar el reloj sin cambiar de modo.
     La salida para quien NECESITA jugar sin cuenta atrás. Necesitar más tiempo
     no es elegir menos reto, así que no puede tocar ninguna palanca. */
  const conReloj = { sinLimiteTiempo: false };
  const sinReloj = { sinLimiteTiempo: true };
  const noApagados = CB.modos.ORDEN.filter(function (m) {
    return CB.modos.msDeItem(m, sinReloj) !== 0;
  });
  t.igual(noApagados.length, 0,
    'E123 · «sin límite de tiempo» apaga el reloj en los TRES modos', noApagados.join(', '));
  t.igual(CB.modos.msDeItem('experto', conReloj), 30000,
    'E123 · y sin activarlo el reloj sigue como estaba');

  /* Que no toque las palancas hay que MEDIRLO, no darlo por hecho: comparar la
     tabla consigo misma habría salido verde diga lo que diga el código. La
     propiedad real es que el ajuste llega al reloj y a nada más, así que se
     cuenta quién lo lee. Un nombre de propiedad sobrevive a terser —mangle.properties
     está prohibido en este proyecto—, así que vale en las dos páginas. */
  const lectores = Object.keys(CB.modos).filter(function (k) {
    return typeof CB.modos[k] === 'function' &&
           String(CB.modos[k]).indexOf('sinLimiteTiempo') !== -1;
  });
  t.ok(lectores.length === 1 && lectores[0] === 'msDeItem',
    'E123 · solo el reloj lee «sin límite de tiempo»: ninguna palanca lo consulta',
    lectores.join(', '));

  /* Y la comprobación de arriba solo vale si de verdad hay palancas que mirar. */
  t.ok(CB.modos.PALANCAS.every(function (k) {
    return CB.modos.TABLA.experto[k] >= CB.modos.TABLA.facil[k];
  }), 'E123 · y las cinco palancas de Experto siguen en pie con el reloj quitado');
  t.ok(CB.adulto.AJUSTES.some(function (a) { return a.k === 'sinLimiteTiempo'; }),
    'E123 · y el ajuste vive en el panel del adulto, detrás de la puerta parental');
});
