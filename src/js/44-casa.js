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
  var perfil = CB.perfil;
  if (!perfil) return;

  var resumen = document.getElementById('casa-resumen');
  if (resumen) {
    resumen.textContent = perfil.cromos.length + ' de ' +
      Object.keys(CB.casa.NOMBRES_CROMO).length + ' cromos · ' +
      Math.max(0, perfil.gemas) + ' gemas';
  }

  var cont = document.getElementById('rejilla-cromos');
  if (!cont) return;
  CB.ui.vaciar(cont);

  Object.keys(CB.casa.NOMBRES_CROMO).forEach(function (id) {
    var tiene = perfil.cromos.indexOf(id) !== -1;
    var c = CB.ui.crear('div', 'cromo' + (tiene ? '' : ' cromo--bloqueado'));
    var icono = CB.ui.crear('div', 'criatura', tiene ? (CB.ui.CRIATURAS[id] || '◆') : '?');
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
};

/* Diccionario de Bloques */
CB.casa.pintarGlosario = function () {
  var perfil = CB.perfil;
  if (!perfil) return;

  var resumen = document.getElementById('glosario-resumen');
  if (resumen) {
    resumen.textContent = perfil.glosario.length + ' de ' +
      CB.datos.GLOSARIO.length + ' palabras descubiertas.';
  }

  var cont = document.getElementById('lista-glosario');
  if (!cont) return;
  CB.ui.vaciar(cont);

  CB.datos.GLOSARIO.forEach(function (g) {
    var tiene = perfil.glosario.indexOf(g.t) !== -1;
    var fila = CB.ui.crear('div', 'termino-glosario');
    fila.setAttribute('data-bloqueado', tiene ? 'no' : 'si');

    var titulo = CB.ui.crear('strong', null, tiene ? g.t : '· · ·');
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
