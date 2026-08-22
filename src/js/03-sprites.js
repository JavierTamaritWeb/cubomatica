/* ============================================================================
   03-sprites.js — Sprites de mapa de píxeles. 24 entradas de caché
   ----------------------------------------------------------------------------
   Adaptador de plataforma declarado (§14.4).

   UMBRAL DE RASTERIZACIÓN (PLAN §10.8): box-shadow SOLO para sprites ESTÁTICOS
   de ≤ 64 píxeles encendidos. Todo sprite ANIMADO o de > 64 píxeles se rasteriza
   a canvas y se usa como background-image con data: URI cacheado.

   El umbral v1 («>400 sombras») permitía animar elementos con 400 box-shadow a
   60 fps en un Chromebook de 2019: repintados de decenas de milisegundos y
   tirones garantizados justo en el momento de la celebración.

   RECUENTO DECLARADO: 24 entradas = 11 criaturas + 6 iconos de HUD + 5 bloques
   + 2 mapas base de avatar (de los que salen los 16 por permutación de paleta).
   ========================================================================== */

var CB = CB || {};
CB.sprites = CB.sprites || {};

CB.sprites.UMBRAL_BOXSHADOW = 64;
CB.sprites.cache = {};

/* Los mapas son cadenas: cada carácter es un índice de paleta, '.' = transparente.
   Formato compacto y legible: se puede corregir un sprite a ojo. */
CB.sprites.MAPAS = {

  /* ── 11 criaturas ─────────────────────────────────────────────────────── */
  cubi: ['..000..',
         '.01110.',
         '.12221.',
         '.02220.',
         '.33333.',
         '.3.3.3.',
         '.4...4.'],

  rocarr: ['.11111.',
           '1112111',
           '1211121',
           '1111111',
           '1122111',
           '.11111.',
           '..1.1..'],

  chispa: ['...2...',
           '..222..',
           '.22222.',
           '2222222',
           '.22222.',
           '..222..',
           '...2...'],

  /* Gluglú es una GOTA escalonada, nunca un cubo perfecto: su forma y su color
     tienen que leerse como agua a primera vista, muy distintos de Rocarr. */
  gluglu: ['...3...',
           '..333..',
           '.33333.',
           '3333333',
           '3334333',
           '.33333.',
           '..333..'],

  brasita: ['..1.1..',
            '.11111.',
            '1121211',
            '1122211',
            '.12221.',
            '..111..',
            '...1...'],

  cristalina: ['...1...',
               '..121..',
               '.12321.',
               '1233321',
               '.12321.',
               '..121..',
               '...1...'],

  blopi: ['.......',
          '..111..',
          '.11211.',
          '1112111',
          '1111111',
          '.11111.',
          '..1.1..'],

  tronquete: ['..111..',
              '.11111.',
              '1112111',
              '.11111.',
              '..222..',
              '..222..',
              '.22.22.'],

  chispita: ['.......',
             '...2...',
             '..222..',
             '.22222.',
             '..222..',
             '...2...',
             '.......'],

  ranacubo: ['.1...1.',
             '11111111',
             '12111121',
             '11111111',
             '.111111.',
             '1.1..1.1',
             '.......'],

  vagoneto: ['.......',
             '1111111',
             '1211121',
             '1111111',
             '1111111',
             '.2...2.',
             '.......'],

  /* ── 6 iconos de HUD ──────────────────────────────────────────────────── */
  luzEncendida: ['..111..',
                 '.12211.',
                 '1122111',
                 '1121111',
                 '1111111',
                 '.11111.',
                 '..111..'],

  luzApagada: ['..111..',
               '.11111.',
               '1111111',
               '1113111',
               '1111111',
               '.11111.',
               '..111..'],

  gema: ['..111..',
         '.12221.',
         '1222221',
         '1222221',
         '.12221.',
         '..121..',
         '...1...'],

  pista: ['..111..',
          '.11211.',
          '1112111',
          '1112111',
          '.11111.',
          '..333..',
          '..333..'],

  altavoz: ['...11..',
            '..111..',
            '1111.3.',
            '11113.3',
            '1111.3.',
            '..111..',
            '...11..'],

  pausa: ['.......',
          '.11.11.',
          '.11.11.',
          '.11.11.',
          '.11.11.',
          '.11.11.',
          '.......'],

  /* ── 5 bloques ────────────────────────────────────────────────────────── */
  bloquePiedra: ['1111111','1211121','1111111','1121211','1111111','1211121','1111111'],
  bloqueTierra: ['1111111','1121111','1111211','1111111','1211112','1111111','1112111'],
  bloqueHierba: ['2222222','2222222','1111111','1211121','1111111','1121211','1111111'],
  bloqueCristal:['1111111','1211121','1121211','1112111','1121211','1211121','1111111'],
  bloqueMusgo:  ['2121212','1212121','1111111','1211121','1111111','2121212','1212121'],

  /* ── 2 mapas base de avatar (16 variantes por permutación de paleta) ──── */
  avatarBase1: ['..000..',
                '.01110.',
                '.12221.',
                '.02220.',
                '.33333.',
                '.3.3.3.',
                '.4...4.'],

  avatarBase2: ['..000..',
                '.01110.',
                '.12121.',
                '.02220.',
                '.33333.',
                '.33.33.',
                '.4...4.']
};

CB.sprites.PALETAS = {
  cubi:        ['#5AA02C', '#F2C99C', '#241C14', '#8B5E3C', '#6B4526'],
  rocarr:      ['#8C8C8C', '#8C8C8C', '#241C14', '#6E6E6E', '#6E6E6E'],
  chispa:      ['#F5D45C', '#F5D45C', '#FFFFFF', '#E8B923', '#E8B923'],
  gluglu:      ['#3C7BD4', '#3C7BD4', '#5C9BE8', '#5C9BE8', '#FFFFFF'],
  brasita:     ['#E8642A', '#E8642A', '#F5D45C', '#B84618', '#B84618'],
  cristalina:  ['#7FD4E8', '#7FD4E8', '#B0EAF5', '#FFFFFF', '#55AEC4'],
  blopi:       ['#4E7A3A', '#4E7A3A', '#241C14', '#6D9B54', '#3A5C2A'],
  tronquete:   ['#A0763F', '#A0763F', '#4E7A3A', '#7A5628', '#7A5628'],
  chispita:    ['#F5D45C', '#F5D45C', '#FFF6E5', '#E8B923', '#E8B923'],
  ranacubo:    ['#5AA02C', '#5AA02C', '#241C14', '#3F7A1E', '#3F7A1E'],
  vagoneto:    ['#8C8C8C', '#8C8C8C', '#241C14', '#6E6E6E', '#6E6E6E'],
  luzEncendida:['#7FD4E8', '#7FD4E8', '#FFFFFF', '#59554F', '#55AEC4'],
  luzApagada:  ['#59554F', '#59554F', '#7A766F', '#33302B', '#33302B'],
  gema:        ['#55AEC4', '#55AEC4', '#B0EAF5', '#FFFFFF', '#7FD4E8'],
  pista:       ['#E8B923', '#E8B923', '#FFF6E5', '#8C8C8C', '#8C8C8C'],
  altavoz:     ['#241C14', '#241C14', '#FFF6E5', '#3C7BD4', '#3C7BD4'],
  pausa:       ['#241C14', '#241C14', '#FFF6E5', '#8C8C8C', '#8C8C8C'],
  bloquePiedra:['#8C8C8C', '#8C8C8C', '#6E6E6E', '#ADADAD', '#ADADAD'],
  bloqueTierra:['#8B5E3C', '#8B5E3C', '#6B4526', '#A87850', '#A87850'],
  bloqueHierba:['#8B5E3C', '#8B5E3C', '#6B4526', '#5AA02C', '#5AA02C'],
  bloqueCristal:['#7FD4E8','#7FD4E8', '#B0EAF5', '#55AEC4', '#55AEC4'],
  bloqueMusgo: ['#4E7A3A', '#4E7A3A', '#3A5C2A', '#6D9B54', '#6D9B54'],
  avatarBase1: ['#5AA02C', '#F2C99C', '#241C14', '#8B5E3C', '#6B4526'],
  avatarBase2: ['#3C7BD4', '#F2C99C', '#241C14', '#A0763F', '#7A5628']
};

CB.sprites.IDS = Object.keys(CB.sprites.MAPAS);

CB.sprites.encendidos = function (mapa) {
  var n = 0, y, x;
  for (y = 0; y < mapa.length; y++) {
    for (x = 0; x < mapa[y].length; x++) if (mapa[y].charAt(x) !== '.') n++;
  }
  return n;
};

/* Cadena de box-shadow: solo para sprites estáticos pequeños. */
CB.sprites.aBoxShadow = function (mapa, paleta, px) {
  var partes = [], y, x, c;
  for (y = 0; y < mapa.length; y++) {
    for (x = 0; x < mapa[y].length; x++) {
      c = mapa[y].charAt(x);
      if (c === '.') continue;
      partes.push((x * px) + 'px ' + (y * px) + 'px 0 0 ' + (paleta[+c] || '#000'));
    }
  }
  return partes.join(',');
};

/* Rasterización a canvas: para sprites animados o grandes. */
CB.sprites.aDataURL = function (mapa, paleta, px) {
  var ancho = 0, y, x, c;
  for (y = 0; y < mapa.length; y++) ancho = Math.max(ancho, mapa[y].length);

  var lienzo = document.createElement('canvas');
  lienzo.width = ancho * px; lienzo.height = mapa.length * px;
  var g = lienzo.getContext('2d');
  if (!g) return null;

  for (y = 0; y < mapa.length; y++) {
    for (x = 0; x < mapa[y].length; x++) {
      c = mapa[y].charAt(x);
      if (c === '.') continue;
      g.fillStyle = paleta[+c] || '#000';
      g.fillRect(x * px, y * px, px, px);
    }
  }
  try { return lienzo.toDataURL('image/png'); } catch (e) { return null; }
};

/**
 * @param opciones {animado:boolean, px:number, paleta:[...]}
 * @return {tipo:'sombra'|'imagen', valor:string, ancho, alto}
 */
CB.sprites.desdeMapa = function (nombre, opciones) {
  opciones = opciones || {};
  var px = opciones.px || 8;
  var clave = nombre + '@' + px + (opciones.paletaId != null ? ('#' + opciones.paletaId) : '');
  if (CB.sprites.cache[clave]) return CB.sprites.cache[clave];

  var mapa = CB.sprites.MAPAS[nombre];
  if (!mapa) return null;
  var paleta = opciones.paleta || CB.sprites.PALETAS[nombre] || ['#000'];

  var n = CB.sprites.encendidos(mapa);
  var ancho = 0, y;
  for (y = 0; y < mapa.length; y++) ancho = Math.max(ancho, mapa[y].length);

  var res;
  if (!opciones.animado && n <= CB.sprites.UMBRAL_BOXSHADOW) {
    res = { tipo: 'sombra', valor: CB.sprites.aBoxShadow(mapa, paleta, px),
            ancho: ancho * px, alto: mapa.length * px, px: px };
  } else {
    var url = CB.sprites.aDataURL(mapa, paleta, px);
    res = url
      ? { tipo: 'imagen', valor: url, ancho: ancho * px, alto: mapa.length * px, px: px }
      : { tipo: 'sombra', valor: CB.sprites.aBoxShadow(mapa, paleta, px),
          ancho: ancho * px, alto: mapa.length * px, px: px };
  }

  CB.sprites.cache[clave] = res;
  return res;
};

/* Los 16 avatares por permutación de paleta sobre los 2 mapas base. */
CB.sprites.avatar = function (indice, px) {
  var i = CB.util.clamp(parseInt(indice, 10) || 0, 0, 15);
  var pal = CB.datos.AVATARES[i];
  var base = (i % 2 === 0) ? 'avatarBase1' : 'avatarBase2';
  return CB.sprites.desdeMapa(base, {
    px: px || 8, paletaId: i,
    paleta: [pal.casco, pal.piel, '#241C14', pal.ropa, '#3A3A3A']
  });
};

/* Aplica un sprite a un elemento del DOM sin usar innerHTML. */
CB.sprites.aplicar = function (el, nombre, opciones) {
  var s = (nombre === 'avatar')
    ? CB.sprites.avatar(opciones.indice, opciones.px)
    : CB.sprites.desdeMapa(nombre, opciones);
  if (!el || !s) return null;
  el.style.width = s.px + 'px';
  el.style.height = s.px + 'px';
  if (s.tipo === 'sombra') {
    el.style.boxShadow = s.valor;
    el.style.backgroundImage = 'none';
  } else {
    el.style.width = s.ancho + 'px';
    el.style.height = s.alto + 'px';
    el.style.boxShadow = 'none';
    el.style.backgroundImage = 'url(' + s.valor + ')';
    el.style.backgroundSize = '100% 100%';
  }
  return s;
};

CB.sprites.precalentar = function () {
  var i, n = 0;
  for (i = 0; i < CB.sprites.IDS.length; i++) {
    if (CB.sprites.desdeMapa(CB.sprites.IDS[i], { px: 8 })) n++;
  }
  return n;
};

/* ══ EL DINERO YA NO SE DIBUJA: SE FOTOGRAFÍA ════════════════════════════════

   Aquí vivían `svgMoneda`, `svgBillete`, `estrellasSVG` y `generarDinero`: siete
   piezas compuestas en SVG al arrancar y publicadas como data: URI en las
   variables `--pieza-*`. Desde 1.20.0 las doce piezas son fotografías en
   `dist/img/*.webp` y el CSS las declara él mismo, así que este bloque no tiene
   nada que hacer y se ha ido entero —64 KB de imágenes a cambio de 90 líneas de
   dibujo y de un arranque que ya no compone nada—.

   El porqué del cambio está escrito donde ahora se decide, que es
   `src/scss/_01-variables.scss`. Se anota aquí porque el motivo que se dio en su
   día para dibujarlas —«la auditoría no admite un solo binario»— sigue siendo
   verdad y no era la razón que parecía: lo que prohíbe binarios es una lista del
   bloque 4 de `auditar.mjs`, no `file://`. Una imagen es un subrecurso y se abre
   con doble clic igual que la hoja de estilos.

   LO QUE NO SE HA IDO es el resto del fichero: las ocho texturas del terreno
   SIGUEN dibujándose en canvas. Ahí el argumento sí se sostiene, porque lo que
   producen es ruido de 16×16 que como fichero pesaría más de lo que pesa el
   código que lo genera.
   ══════════════════════════════════════════════════════════════════════════ */
