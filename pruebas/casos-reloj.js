/* casos-reloj.js — La cuenta atrás de 30 s */

CB.pruebas.suite('Reloj: cuenta atrás de 30 s', function () {
  const t = CB.pruebas;

  /* Los segundos */
  const modos = Object.keys(CB.partida.SEGUNDOS_ITEM).sort();
  t.ok(modos.join('|') === 'conCalma|normal|sinPrisa',
    'SEGUNDOS_ITEM declara los tres modos de tiempo y solo esos', modos.join(','));

  t.igual(CB.partida.msDeItem('normal'), 30000, 'el modo normal da 30 s');
  t.igual(CB.partida.msDeItem('conCalma'), 30000, 'el modo con calma da 30 s');

  /* LA salvaguarda legal: sin esto el juego incumple la WCAG 2.2.1, que exige
     poder desactivar un límite de tiempo, y con ello la EN 301 549. */
  t.igual(CB.partida.msDeItem('sinPrisa'), 0,
    '«Sin prisa» apaga la cuenta atrás: un límite de tiempo tiene que poder quitarse');

  t.igual(CB.partida.msDeItem('modoQueNoExiste'), 30000,
    'un modo desconocido no deja el ítem sin límite ni con límite cero');

  /* Quedarse sin tiempo no castiga */
  const est = { luces: 3, timeoutsConsecutivos: 0, timeoutsPartida: 0 };
  const r1 = CB.vidas.timeout(est);
  const r2 = CB.vidas.timeout(est);
  t.igual(est.luces, 3, 'agotar el tiempo dos veces seguidas NO apaga ninguna luz');
  t.igual(r2.luces, 3, 'y el resultado devuelve las mismas 3 luces');
  t.ok(r1.consecutivos === 1 && r2.consecutivos === 2,
    'los tiempos agotados se cuentan para bajar el ritmo, no para castigar');

  /* El reloj de arena */
  t.igual(CB.ui.reloj.SEG_PRISA, 10, '«Hurry up!» sale cuando quedan 10 segundos');
  t.ok(CB.ui.reloj.PASOS_ARENA >= 8 && CB.ui.reloj.PASOS_ARENA <= 40,
    'la arena baja a saltos, ni continua ni de dos en dos');

  /* pintar() con nodos de mentira: se comprueba la cuenta, no el dibujo */
  const caja = document.createElement('div');
  const cifra = document.createElement('span');
  const alta = document.createElement('i');
  const baja = document.createElement('i');
  const previo = {
    caja: CB.ui.reloj.caja, cifra: CB.ui.reloj.cifra,
    alta: CB.ui.reloj.alta, baja: CB.ui.reloj.baja,
    aviso: CB.ui.reloj.aviso, total: CB.ui.reloj._totalMs
  };
  CB.ui.reloj.caja = caja; CB.ui.reloj.cifra = cifra;
  CB.ui.reloj.alta = alta; CB.ui.reloj.baja = baja;
  CB.ui.reloj.aviso = null;                     // gritar() no hace nada sin cartel
  CB.ui.reloj._totalMs = 30000;

  function pinta(ms) {
    CB.ui.reloj._ultimoSeg = -1;
    CB.ui.reloj._avisado = true;                // no dispara el cartel ni el sonido
    CB.ui.reloj.pintar(ms);
    return { cifra: cifra.textContent, alta: alta.style.height, baja: baja.style.height };
  }

  const lleno = pinta(30000);
  t.igual(lleno.cifra, '30', 'a 30 000 ms la cifra es 30');
  t.igual(lleno.alta, '100%', 'a tiempo completo toda la arena está arriba');
  t.igual(lleno.baja, '0%', 'y nada abajo');

  const medio = pinta(15000);
  t.igual(medio.cifra, '15', 'a la mitad la cifra es 15');
  t.igual(medio.alta, '50%', 'a la mitad, media arena arriba');
  t.igual(medio.baja, '50%', 'y media abajo');

  const vacio = pinta(0);
  t.igual(vacio.cifra, '0', 'a cero la cifra es 0, nunca negativa');
  t.igual(vacio.alta, '0%', 'a cero no queda arena arriba');
  t.igual(vacio.baja, '100%', 'y toda está abajo');

  /* La suma de las dos arenas es SIEMPRE 100: si no, se ve arena que desaparece
     o arena que se duplica, que es lo que delata que el reloj es una barra de
     progreso disfrazada. */
  const descuadre = [];
  let i;
  for (i = 0; i <= 30; i++) {
    const v = pinta(i * 1000);
    const suma = parseInt(v.alta, 10) + parseInt(v.baja, 10);
    if (suma !== 100) descuadre.push(i + 's:' + suma);
  }
  t.ok(descuadre.length === 0,
    'la arena de arriba y la de abajo suman 100 % en los 31 segundos',
    descuadre.join(', '));

  /* La cifra nunca se salta un segundo ni repite: 30, 29, 28... */
  const esperados = [], reales = [];
  for (i = 30; i >= 0; i--) { esperados.push(String(i)); reales.push(pinta(i * 1000).cifra); }
  t.ok(esperados.join(',') === reales.join(','),
    'la cifra baja de uno en uno de 30 a 0', reales.join(','));

  /* La marca de prisa entra exactamente en el segundo 10, no antes */
  caja.className = '';
  pinta(11000);
  const a11 = caja.classList.contains('reloj--prisa');
  pinta(10000);
  const a10 = caja.classList.contains('reloj--prisa');
  t.ok(!a11 && a10,
    'la marca de prisa entra en el segundo 10 exacto, no en el 11');

  /* arrancar(0) es «Sin prisa»: ni pinta, ni deja intervalo suelto */
  CB.ui.reloj.caja = caja;
  const arrancado = CB.ui.reloj.arrancar(0);
  t.ok(arrancado === false, 'arrancar(0) no pone cuenta atrás');
  t.ok(CB.ui.reloj._tic === null, 'y no deja ningún intervalo corriendo');

  CB.ui.reloj.parar();
  /* El temporizador de ocultar el cartel ya no es del reloj: es de la cinta, que
     desde 1.8.0 la comparten los nueve avisos. El invariante es el mismo —parar()
     no puede dejar nada pendiente— pero hay que mirar donde vive ahora. */
  t.ok(CB.ui.reloj._tic === null && CB.ui.cinta._salida === null,
    'parar() deja el reloj sin intervalos ni temporizadores pendientes');

  CB.ui.reloj.caja = previo.caja; CB.ui.reloj.cifra = previo.cifra;
  CB.ui.reloj.alta = previo.alta; CB.ui.reloj.baja = previo.baja;
  CB.ui.reloj.aviso = previo.aviso; CB.ui.reloj._totalMs = previo.total;

  /* El sonido del aviso */
  t.ok(typeof CB.audio.EFECTOS.prisa === 'function',
    'existe el efecto «prisa» que acompaña al cartel');
  t.igual(Object.keys(CB.audio.EFECTOS).length, 13,
    'hay 13 efectos sintetizados, ni uno más sin declararlo');
});
