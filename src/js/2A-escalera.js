/* 2A-escalera.js — La escalera anti-frustración de 5 escalones */

var CB = CB || {};
CB.escalera = CB.escalera || {};

/* La UNICA fuente de accion/apagaLuz/rompeRacha por escalon: siguienteEscalon
   la consume. Hasta 3.4.5 esta tabla vivia muerta y ademas MENTIA en los
   escalones 3-5 (decia apagaLuz:false donde la funcion devolvia true): una
   tabla que nadie lee no avisa cuando se queda vieja. */
CB.escalera.ESCALONES = {
  1: { accion: 'pista',           apagaLuz: false, rompeRacha: false },
  2: { accion: 'reparacion',      apagaLuz: true,  rompeRacha: true  },
  3: { accion: 'bajarD_opciones', apagaLuz: true,  rompeRacha: true  },
  4: { accion: 'prerrequisito',   apagaLuz: true,  rompeRacha: true  },
  5: { accion: 'enPausa',         apagaLuz: true,  rompeRacha: true  }
};

/* Miembro del espacio de nombres, no funcion de nivel superior: las de nivel
   superior aterrizan en window y casos-carga pina la lista exacta de doce. */
CB.escalera.escalonDe = function (n, extras) {
  const base = CB.escalera.ESCALONES[n];
  const r = { escalon: n, accion: base.accion,
              apagaLuz: base.apagaLuz, rompeRacha: base.rompeRacha };
  let k;
  for (k in extras) r[k] = extras[k];
  return r;
}

/**
 * @param fallosConcepto nº de fallos del MISMO concepto en esta partida
 * @param fallosItem     nº de fallos del ítem actual (1 o 2)
 */
CB.escalera.siguienteEscalon = function (fallosConcepto, fallosItem) {
  /* Escalones 1 y 2: dentro del propio ítem. */
  if (fallosItem === 1) {
    return CB.escalera.escalonDe(1, { texto: 'Rocarr te enseña por dónde va.' });
  }
  if (fallosItem >= 2 && fallosConcepto < 2) {
    return CB.escalera.escalonDe(2, { texto: 'Vamos a verlo paso a paso.' });
  }

  /* Escalones 3, 4 y 5: acumulados por CONCEPTO a lo largo de la partida. */
  if (fallosConcepto === 2) {
    return CB.escalera.escalonDe(3, { D: 1, formato: 'opciones4',
                        texto: 'El siguiente de este tipo será más fácil.' });
  }
  if (fallosConcepto === 3) {
    return CB.escalera.escalonDe(4, { texto: 'Volvemos un paso atrás para coger carrerilla.' });
  }
  return CB.escalera.escalonDe(5, { silencioso: true,
                      notaAdulto: 'Conviene trabajarlo con material manipulativo antes de ' +
                                  'volver a la pantalla.' });
};

/* Aplica el escalón 5: retira el concepto de la sesión, sin avisar al niño. */
CB.escalera.pausarConcepto = function (perfil, nivelId) {
  if (!perfil.niveles) perfil.niveles = {};
  if (!perfil.niveles[nivelId]) {
    perfil.niveles[nivelId] = { n: 0, aciertos: 0, caja: 1, D: 1, ultimoISO: null, enPausa: false };
  }
  perfil.niveles[nivelId].enPausa = true;
  return perfil.niveles[nivelId];
};

/* Al empezar una sesión nueva se levantan todas las pausas: «no se vuelve a
   proponer hasta la siguiente sesión», no «nunca más». */
CB.escalera.levantarPausas = function (perfil) {
  if (!perfil || !perfil.niveles) return 0;
  let k, n = 0;
  for (k in perfil.niveles) {
    if (!Object.prototype.hasOwnProperty.call(perfil.niveles, k)) continue;
    if (perfil.niveles[k].enPausa) { perfil.niveles[k].enPausa = false; n++; }
  }
  return n;
};

/* Contador de fallos por concepto dentro de la partida. */
CB.escalera.nuevoContador = function () { return {}; };

CB.escalera.registrarFallo = function (contador, destreza) {
  contador[destreza] = (contador[destreza] || 0) + 1;
  return contador[destreza];
};

CB.escalera.fallosDe = function (contador, destreza) {
  return contador[destreza] || 0;
};
