/* 02-texturas.js — 8 texturas de 16×16 generadas por canvas. CERO .png */

var CB = CB || {};
CB.texturas = CB.texturas || {};

CB.texturas.LADO = 16;
CB.texturas.cache = {};

/* [nombre, semilla, colorBase, colorClaro, colorOscuro, patrón] */
CB.texturas.RECETAS = [
  ['piedra',  0x51A3E1, '#8C8C8C', '#ADADAD', '#6E6E6E', 'ruido'],
  ['tierra',  0x2B7F41, '#8B5E3C', '#A87850', '#6B4526', 'ruido'],
  ['hierba',  0x9C4D22, '#5AA02C', '#7BC44A', '#3F7A1E', 'hierba'],
  ['madera',  0x33B1D7, '#A0763F', '#C29A62', '#7A5628', 'vetas'],
  ['arena',   0x7E2C90, '#E0D08A', '#F0E4AE', '#C4B067', 'ruido'],
  ['agua',    0x1D5FA8, '#3C7BD4', '#5C9BE8', '#2A5CA8', 'ondas'],
  ['musgo',   0x6A31C4, '#4E7A3A', '#6D9B54', '#3A5C2A', 'ruido'],
  ['cristal', 0x8F1E77, '#7FD4E8', '#B0EAF5', '#55AEC4', 'brillo']
];

CB.texturas.pintar = function (receta) {
  const semilla = receta[1];
  const base = receta[2], claro = receta[3], oscuro = receta[4], patron = receta[5];
  const L = CB.texturas.LADO;

  const lienzo = document.createElement('canvas');
  lienzo.width = L; lienzo.height = L;
  const g = lienzo.getContext('2d');
  if (!g) return null;

  const rng = CB.util.mulberry32(semilla);
  let x, y, r;

  g.fillStyle = base;
  g.fillRect(0, 0, L, L);

  for (y = 0; y < L; y++) {
    for (x = 0; x < L; x++) {
      r = rng();
      switch (patron) {
        case 'hierba':
          /* Franja superior más clara: es lo que hace que un bloque de hierba
             se lea como hierba y no como un cuadrado verde. */
          if (y < 4) { if (r < 0.5) { g.fillStyle = claro; g.fillRect(x, y, 1, 1); } }
          else if (r < 0.18) { g.fillStyle = oscuro; g.fillRect(x, y, 1, 1); }
          break;
        case 'vetas':
          if ((x % 5) === 0) { g.fillStyle = oscuro; g.fillRect(x, y, 1, 1); }
          else if (r < 0.10) { g.fillStyle = claro; g.fillRect(x, y, 1, 1); }
          break;
        case 'ondas':
          if (((y + Math.floor(x / 3)) % 4) === 0) { g.fillStyle = claro; g.fillRect(x, y, 1, 1); }
          else if (r < 0.08) { g.fillStyle = oscuro; g.fillRect(x, y, 1, 1); }
          break;
        case 'brillo':
          if (x === y || x === y + 1) { g.fillStyle = claro; g.fillRect(x, y, 1, 1); }
          else if (r < 0.12) { g.fillStyle = oscuro; g.fillRect(x, y, 1, 1); }
          break;
        default:                                   /* ruido */
          if (r < 0.16) { g.fillStyle = oscuro; g.fillRect(x, y, 1, 1); }
          else if (r < 0.28) { g.fillStyle = claro; g.fillRect(x, y, 1, 1); }
      }
    }
  }

  /* Bisel de bloque: una línea clara arriba y una oscura abajo. Es lo que
     convierte una textura plana en un cubo. */
  g.fillStyle = claro; g.fillRect(0, 0, L, 1);
  g.fillStyle = oscuro; g.fillRect(0, L - 1, L, 1);

  try { return lienzo.toDataURL('image/png'); } catch (e) { return null; }
};

CB.texturas.generarTodas = function () {
  const raiz = document.documentElement;
  let i, receta, url;
  for (i = 0; i < CB.texturas.RECETAS.length; i++) {
    receta = CB.texturas.RECETAS[i];
    if (CB.texturas.cache[receta[0]]) continue;
    url = CB.texturas.pintar(receta);
    if (!url) continue;                            // sin canvas: queda el color plano
    CB.texturas.cache[receta[0]] = url;
    raiz.style.setProperty('--tex-' + receta[0], 'url(' + url + ')');
  }
  return Object.keys(CB.texturas.cache).length;
};

CB.texturas.get = function (nombre) { return CB.texturas.cache[nombre] || null; };
