/* ============================================================================
   motes.js — Lista CERRADA de 120 motes y las 16 paletas de avatar
   ----------------------------------------------------------------------------
   El mote es la IDENTIDAD PERMANENTE del niño en el juego, y por eso no puede
   contener ningún adjetivo de capacidad (PLAN §14.8): si se llama «Gema Lista»,
   cada fallo contradice su propio nombre, que es exactamente el mecanismo de la
   mentalidad fija. Y «Topo Veloz» premiaría la rapidez como rasgo, reforzando la
   presión temporal que todo el diseño trata de quitar.

   Todos los motes son de MATERIAL, de OBJETO de la mina o de ACCIÓN de cavar.

   La lista es cerrada también por seguridad: CB.almacen.importar sustituye por
   uno de estos cualquier mote que venga en un fichero .json manipulado, de modo
   que nunca puede inyectarse texto arbitrario en la interfaz (§15.8).
   ========================================================================== */

var CB = CB || {};
CB.datos = CB.datos || {};

CB.datos.MOTES = [
  'Gema Pulida',      'Gema Honda',        'Gema Azul',          'Gema Serena',
  'Topo Cavador',     'Topo Curioso',      'Topo Tranquilo',     'Topo Paciente',
  'Pico Fino',        'Pico Firme',        'Pico Nuevo',         'Pico de Hierro',
  'Casco Verde',      'Casco Naranja',     'Casco Amarillo',     'Casco Abollado',
  'Farol Naranja',    'Farol Encendido',   'Farol de Aceite',    'Farol Alto',
  'Bota de Barro',    'Bota Gruesa',       'Bota Firme',         'Bota Vieja',
  'Vagón Azul',       'Vagón Cargado',     'Vagón Lento',        'Vagón de Madera',
  'Musgo Suave',      'Musgo Verde',       'Musgo Antiguo',      'Musgo Húmedo',
  'Cristal Hondo',    'Cristal Claro',     'Cristal Azul',       'Cristal Partido',
  'Roca Alta',        'Roca Serena',       'Roca Gris',          'Roca Redonda',
  'Carbón Negro',     'Carbón Callado',    'Carbón Menudo',      'Carbón de Fondo',
  'Cobre Brillante',  'Cobre Torcido',     'Cobre Fino',         'Cobre Antiguo',
  'Arena Fina',       'Arena Dorada',      'Arena Tibia',        'Arena de Río',
  'Barro Blando',     'Barro Seco',        'Barro Espeso',       'Barro de Cueva',
  'Tronco Recto',     'Tronco Hueco',      'Tronco Nudoso',      'Tronco Caído',
  'Hoja Verde',       'Hoja Seca',         'Hoja Ancha',         'Hoja de Otoño',
  'Semilla Pequeña',  'Semilla Dormida',   'Semilla Nueva',      'Semilla de Roble',
  'Chispa Corta',     'Chispa Clara',      'Chispa Menuda',      'Chispa de Fragua',
  'Brasa Tibia',      'Brasa Roja',        'Brasa Callada',      'Brasa de Noche',
  'Nube Baja',        'Nube Cuadrada',     'Nube Gris',          'Nube de Mañana',
  'Río Manso',        'Río Hondo',         'Río Frío',           'Río de Piedra',
  'Cueva Honda',      'Cueva Fresca',      'Cueva Larga',        'Cueva de Eco',
  'Puente Largo',     'Puente de Tabla',   'Puente Firme',       'Puente Colgante',
  'Escalera Larga',   'Escalera de Piedra','Escalera Estrecha',  'Escalera Curva',
  'Cuerda Gruesa',    'Cuerda Trenzada',   'Cuerda Larga',       'Cuerda de Cáñamo',
  'Cesto Lleno',      'Cesto de Mimbre',   'Cesto Hondo',        'Cesto Nuevo',
  'Saco Pesado',      'Saco de Lona',      'Saco Remendado',     'Saco Abierto',
  'Linterna Tenue',   'Linterna Nueva',    'Linterna de Mano',   'Linterna Firme',
  'Yunque Pesado',    'Yunque Frío',       'Yunque de Hierro',   'Yunque Viejo',
  'Fragua Caliente',  'Fragua Antigua',    'Fragua Encendida',   'Fragua de Piedra'
];

/* ── Los 16 avatares de Cubi: permutación de paleta sobre 2 mapas base ──── */
CB.datos.AVATARES = [
  { casco: '#5AA02C', ropa: '#8B5E3C', piel: '#F2C99C' },
  { casco: '#E8B923', ropa: '#3C7BD4', piel: '#8D5A34' },
  { casco: '#3C7BD4', ropa: '#4E7A3A', piel: '#5C3A20' },
  { casco: '#C87137', ropa: '#8C8C8C', piel: '#F2C99C' },
  { casco: '#7FD4E8', ropa: '#A0763F', piel: '#C68E63' },
  { casco: '#E8642A', ropa: '#2A5CA8', piel: '#5C3A20' },
  { casco: '#A88A5E', ropa: '#5AA02C', piel: '#F2C99C' },
  { casco: '#4E7A3A', ropa: '#E0D08A', piel: '#8D5A34' },
  { casco: '#8C8C8C', ropa: '#E8642A', piel: '#C68E63' },
  { casco: '#E0D08A', ropa: '#3A3A3A', piel: '#5C3A20' },
  { casco: '#5C9BE8', ropa: '#C87137', piel: '#F2C99C' },
  { casco: '#B84618', ropa: '#7BC44A', piel: '#8D5A34' },
  { casco: '#F5D45C', ropa: '#6B4526', piel: '#C68E63' },
  { casco: '#55AEC4', ropa: '#A87850', piel: '#5C3A20' },
  { casco: '#6D9B54', ropa: '#5C9BE8', piel: '#F2C99C' },
  { casco: '#9E5525', ropa: '#ADADAD', piel: '#8D5A34' }
];

/* Colores de bloque elegibles para el perfil. Se valida con /^#[0-9A-Fa-f]{6}$/
   antes de escribirlos en ningún `style` (§15.8). */
CB.datos.COLORES_BLOQUE = [
  '#5AA02C', '#3C7BD4', '#E8B923', '#C87137', '#7FD4E8',
  '#E8642A', '#4E7A3A', '#8C8C8C', '#A0763F', '#E0D08A'
];
