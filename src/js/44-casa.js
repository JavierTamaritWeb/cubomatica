/* 44-casa.js — El álbum de cromos y el Diccionario de Bloques */

var CB = CB || {};
CB.casa = CB.casa || {};

CB.casa.NOMBRES_CROMO = {
  cubi: 'Cubi', rocarr: 'Rocarr', chispa: 'Chispa', gluglu: 'Gluglú',
  brasita: 'Brasita', cristalina: 'Cristalina', blopi: 'Blopi',
  tronquete: 'Tronquete', chispita: 'Chispita', ranacubo: 'Ranacubo',
  vagoneto: 'Vagoneto'
};

CB.casa.DESCRIPCION = {
  cubi: 'El minero. Levanta el pico cuando aciertas.',
  rocarr: 'Bloque de piedra con ojos. Lento y amable. Te enseña cómo se hace.',
  chispa: 'Chispa de cristal. Gira a toda velocidad cuando encadenas aciertos.',
  gluglu: 'Gota de agua muy rápida. A veces te moja la pregunta.',
  brasita: 'Brasa naranja. Guarda la Mina de las Veces.',
  cristalina: 'Geoda con caras. Guarda el Río de los Problemas.',
  blopi: 'Bloque de musgo blando. Le gusta comer setas.',
  tronquete: 'Tronco con brazos. Guarda la Pradera de los Números.',
  chispita: 'La cría de Chispa. Muy difícil de ver.',
  ranacubo: 'Rana cúbica del río. Salta entre nenúfares.',
  vagoneto: 'Vagoneta con ojos. Lleva las gemas a casa.'
};

CB.casa.pintar = function () {
  const perfil = CB.perfil;
  if (!perfil) return;

  const resumen = document.getElementById('casa-resumen');
  if (resumen) {
    resumen.textContent = perfil.cromos.length + ' de ' +
      Object.keys(CB.casa.NOMBRES_CROMO).length + ' cromos · ' +
      Math.max(0, perfil.gemas) + ' gemas';
  }

  const cont = document.getElementById('rejilla-cromos');
  if (!cont) return;
  CB.ui.vaciar(cont);

  Object.keys(CB.casa.NOMBRES_CROMO).forEach(function (id) {
    const tiene = perfil.cromos.indexOf(id) !== -1;
    const c = CB.ui.crear('div', 'cromo' + (tiene ? '' : ' cromo--bloqueado'));
    const icono = CB.ui.crear('div', 'criatura', tiene ? (CB.ui.CRIATURAS[id] || '◆') : '?');
    icono.style.width = 'auto'; icono.style.height = '64px'; icono.style.fontSize = '40px';
    c.appendChild(icono);
    c.appendChild(CB.ui.crear('div', null, tiene ? CB.casa.NOMBRES_CROMO[id] : '???'));
    if (tiene) {
      c.appendChild(CB.ui.crear('div', 'texto texto--menor', CB.casa.DESCRIPCION[id]));
    }
    c.setAttribute('aria-label', tiene
      ? (CB.casa.NOMBRES_CROMO[id] + ': ' + CB.casa.DESCRIPCION[id])
      : 'Cromo por descubrir');
    cont.appendChild(c);
  });

  CB.casa.pintarVitrina(perfil);
};

/* La VITRINA DE PREMIOS (3.0.0): lo ganado jugando, todo junto y en la casa
   del minero. No inventa datos: lee lo que ya guarda el perfil — diplomas de
   curso (cursosCompletados), guardianes vencidos (mundos[..].jefe), récords
   por modo (mejorPuntuacion) y los logros de la versión 1. Los premios que
   faltan se enseñan cerrados, como los cromos: una vitrina con huecos dice
   «esto se puede ganar»; una vitrina que los oculta no dice nada. */
CB.casa.premios = function (perfil) {
  const lista = [];

  CB.catalogo.cursosDisponibles().forEach(function (c) {
    const tiene = (perfil.cursosCompletados || []).indexOf(c) !== -1;
    lista.push({
      icono: '📜', tiene: tiene,
      nombre: 'Diploma de ' + c + '.º',
      desc: tiene ? 'Todo el curso dominado.' : 'Domina todas las vetas de ' + c + '.º.'
    });
  });

  CB.MUNDOS.forEach(function (m) {
    const em = perfil.mundos[m.id];
    const tiene = !!(em && em.jefe);
    lista.push({
      icono: m.jefeIcono, tiene: tiene,
      nombre: tiene ? (m.jefe + ' vencido') : 'Guardián por vencer',
      desc: tiene ? ('El guardián de ' + m.nombre + '.') : ''
    });
  });

  CB.modos.ORDEN.forEach(function (modo) {
    const v = perfil.mejorPuntuacion[modo] || 0;
    lista.push({
      icono: '🏆', tiene: v > 0,
      nombre: 'Récord en ' + CB.modos.etiqueta(modo),
      desc: v > 0 ? (v + ' puntos.') : ''
    });
  });

  CB.logros.LISTA.filter(function (l) { return l.version === 1; }).forEach(function (l) {
    const tiene = CB.logros.yaTiene(perfil, l.id);
    lista.push({ icono: '⭐', tiene: tiene,
                 nombre: tiene ? l.nombre : '???',
                 desc: tiene ? l.desc : '' });
  });

  return lista;
};

CB.casa.pintarVitrina = function (perfil) {
  const cont = document.getElementById('vitrina-premios');
  if (!cont) return;
  CB.ui.vaciar(cont);

  const premios = CB.casa.premios(perfil);
  const ganados = premios.filter(function (p) { return p.tiene; }).length;

  const resumen = document.getElementById('vitrina-resumen');
  if (resumen) {
    resumen.textContent = ganados + ' de ' + premios.length + ' premios en la vitrina.';
  }

  premios.forEach(function (p) {
    const c = CB.ui.crear('div', 'cromo' + (p.tiene ? '' : ' cromo--bloqueado'));
    const icono = CB.ui.crear('div', 'criatura', p.tiene ? p.icono : '?');
    icono.style.width = 'auto'; icono.style.height = '64px'; icono.style.fontSize = '40px';
    c.appendChild(icono);
    c.appendChild(CB.ui.crear('div', null, p.nombre));
    if (p.tiene && p.desc) {
      c.appendChild(CB.ui.crear('div', 'texto texto--menor', p.desc));
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', p.tiene
      ? (p.nombre + (p.desc ? ': ' + p.desc : ''))
      : 'Premio por ganar' + (p.desc ? ': ' + p.desc : ''));
    cont.appendChild(c);
  });
};

/* Diccionario de Bloques */
CB.casa.pintarGlosario = function () {
  const perfil = CB.perfil;
  if (!perfil) return;

  const resumen = document.getElementById('glosario-resumen');
  if (resumen) {
    resumen.textContent = perfil.glosario.length + ' de ' +
      CB.datos.GLOSARIO.length + ' palabras descubiertas.';
  }

  const cont = document.getElementById('lista-glosario');
  if (!cont) return;
  CB.ui.vaciar(cont);

  CB.datos.GLOSARIO.forEach(function (g) {
    const tiene = perfil.glosario.indexOf(g.t) !== -1;
    const fila = CB.ui.crear('div', 'termino-glosario');
    fila.setAttribute('data-bloqueado', tiene ? 'no' : 'si');

    const titulo = CB.ui.crear('strong', null, tiene ? g.t : '· · ·');
    fila.appendChild(titulo);

    /* «minuendo» y «sustraendo» son terminología que el RD no sitúa
       explícitamente en primer ciclo: van con distintivo y no cuentan para
       ninguna progresión (§8.3, nota sobre V2). */
    if (g.mayores) {
      fila.appendChild(CB.ui.crear('span', 'termino-glosario__marca', ' palabra de mayores '));
    }
    if (tiene) {
      fila.appendChild(CB.ui.crear('p', null, g.d));
    } else {
      fila.appendChild(CB.ui.crear('p', 'texto texto--menor', 'Aún no la has encontrado.'));
    }
    cont.appendChild(fila);
  });
};
