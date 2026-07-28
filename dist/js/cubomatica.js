/* ============================================================================
   curriculo-rd157.js — FUENTE ÚNICA DE VERDAD CURRICULAR
   ----------------------------------------------------------------------------
   Real Decreto 157/2022, de 1 de marzo, por el que se establecen la ordenación y
   las enseñanzas mínimas de la Educación Primaria (BOE núm. 52, de 2 de marzo de
   2022; referencia BOE-A-2022-3296). Anexo II, área de Matemáticas, PRIMER CICLO.

   REGLA DE PROCESO (PLAN §6.4): toda cita de un criterio o de un saber en
   cualquier documento del proyecto va entre comillas, con su código y su ciclo, y
   PROVIENE DE AQUÍ. Si no está en este fichero, no se cita.

   ADVERTENCIA NORMATIVA: el Real Decreto fija saberes básicos y criterios de
   evaluación POR CICLO (1.er ciclo = 1.º y 2.º juntos), NO por curso ni por
   trimestre. La distribución por curso y trimestre del catálogo es una
   secuenciación PROPIA del proyecto, basada en la práctica de aula habitual; no
   procede del Real Decreto ni de ningún decreto autonómico. Debe confirmarse con
   la programación didáctica del centro. Por eso el campo del catálogo se llama
   `trimestreSugerido` y nunca `trimestre`.
   ========================================================================== */

var CB = CB || {};

CB.CURRICULO = {
  norma: 'Real Decreto 157/2022, de 1 de marzo (BOE núm. 52, de 2 de marzo de 2022)',
  referencia: 'BOE-A-2022-3296',
  ciclo: 'Primer ciclo de Educación Primaria',
  area: 'Matemáticas',

  /* ── Competencias específicas del área, texto literal ─────────────────── */
  competencias: {
    CE1: 'Interpretar situaciones de la vida cotidiana, proporcionando una representación matemática de las mismas mediante conceptos, herramientas y estrategias, para analizar la información más relevante.',
    CE2: 'Resolver situaciones problematizadas, aplicando diferentes técnicas, estrategias y formas de razonamiento, para explorar distintas maneras de proceder, obtener soluciones y asegurar su validez desde un punto de vista formal y en relación con el contexto planteado.',
    CE3: 'Explorar, formular y comprobar conjeturas sencillas o plantear problemas de tipo matemático en situaciones basadas en la vida cotidiana, de forma guiada, reconociendo el valor del razonamiento y la argumentación, para contrastar su validez, adquirir e integrar nuevo conocimiento.',
    CE4: 'Utilizar el pensamiento computacional, organizando datos, descomponiendo en partes, reconociendo patrones, generalizando e interpretando, modificando y creando algoritmos de forma guiada, para modelizar y automatizar situaciones de la vida cotidiana.',
    CE5: 'Reconocer y utilizar conexiones entre las diferentes ideas matemáticas, así como identificar las matemáticas implicadas en otras áreas o en la vida cotidiana, interrelacionando conceptos y procedimientos, para interpretar situaciones y contextos diversos.',
    CE6: 'Comunicar y representar, de forma individual y colectiva, conceptos, procedimientos y resultados matemáticos, utilizando el lenguaje oral, escrito, gráfico, multimodal y la terminología apropiados, para dar significado y permanencia a las ideas matemáticas.',
    CE7: 'Desarrollar destrezas personales que ayuden a identificar y gestionar emociones al enfrentarse a retos matemáticos, fomentando la confianza en las propias posibilidades, aceptando el error como parte del proceso de aprendizaje y adaptándose a las situaciones de incertidumbre, para mejorar la perseverancia y disfrutar en el aprendizaje de las matemáticas.',
    CE8: 'Desarrollar destrezas sociales, reconociendo y respetando las emociones, las experiencias de los demás y el valor de la diversidad y participando activamente en equipos de trabajo heterogéneos con roles asignados, para construir una identidad positiva como estudiante de matemáticas, fomentar el bienestar personal y crear relaciones saludables.'
  },

  /* ── Criterios de evaluación del PRIMER CICLO, texto literal ──────────── */
  criterios: {
    '1.1': 'Comprender las preguntas planteadas a través de diferentes estrategias o herramientas, reconociendo la información contenida en problemas de la vida cotidiana.',
    '1.2': 'Proporcionar ejemplos de representaciones de situaciones problematizadas sencillas, con recursos manipulativos y gráficos que ayuden en la resolución de un problema de la vida cotidiana.',
    '2.1': 'Emplear algunas estrategias adecuadas en la resolución de problemas.',
    '2.2': 'Obtener posibles soluciones a problemas, de forma guiada, aplicando estrategias básicas de resolución.',
    '2.3': 'Describir verbalmente la idoneidad de las soluciones de un problema a partir de las preguntas previamente planteadas.',
    '3.1': 'Realizar conjeturas matemáticas sencillas, investigando patrones, propiedades y relaciones de forma guiada.',
    '3.2': 'Dar ejemplos de problemas a partir de situaciones cotidianas que se resuelven matemáticamente.',
    '4.1': 'Describir rutinas y actividades sencillas de la vida cotidiana que se realicen paso a paso, utilizando principios básicos del pensamiento computacional de forma guiada.',
    '4.2': 'Emplear herramientas tecnológicas adecuadas, de forma guiada, en el proceso de resolución de problemas.',
    '5.1': 'Reconocer conexiones entre los diferentes elementos matemáticos, aplicando conocimientos y experiencias propios.',
    '5.2': 'Reconocer las matemáticas presentes en la vida cotidiana y en otras áreas, estableciendo conexiones sencillas entre ellas.',
    '6.1': 'Reconocer lenguaje matemático sencillo presente en la vida cotidiana, adquiriendo vocabulario específico básico.',
    '6.2': 'Explicar ideas y procesos matemáticos sencillos, los pasos seguidos en la resolución de un problema o los resultados matemáticos, de forma verbal o gráfica.',
    '7.1': 'Reconocer las emociones básicas propias al abordar retos matemáticos, pidiendo ayuda solo cuando sea necesario.',
    '7.2': 'Expresar actitudes positivas ante retos matemáticos, valorando el error como una oportunidad de aprendizaje.',
    '8.1': 'Participar respetuosamente en el trabajo en equipo, estableciendo relaciones saludables basadas en el respeto, la igualdad y la resolución pacífica de conflictos.',
    '8.2': 'Aceptar la tarea y rol asignado en el trabajo en equipo, cumpliendo con las responsabilidades individuales y contribuyendo a la consecución de los objetivos del grupo.'
  },

  /* ── Saberes básicos del PRIMER CICLO. Bloques A y F. Texto literal ───── */
  saberes: {
    'A.1':   'Conteo. Estrategias variadas de conteo y recuento sistemático en situaciones de la vida cotidiana en cantidades hasta el 999.',
    'A.2.a': 'Cantidad. Estimaciones razonadas de cantidades en contextos de resolución de problemas.',
    'A.2.b': 'Cantidad. Lectura, representación (incluida la recta numérica y con materiales manipulativos), composición, descomposición y recomposición de números naturales hasta 999.',
    'A.2.c': 'Cantidad. Representación de una misma cantidad de distintas formas (manipulativa, gráfica o numérica) y estrategias de elección de la representación adecuada para cada situación o problema.',
    'A.3.a': 'Sentido de las operaciones. Estrategias de cálculo mental con números naturales hasta 999.',
    'A.3.b': 'Sentido de las operaciones. Suma y resta de números naturales resueltas con flexibilidad y sentido: utilidad en situaciones contextualizadas, estrategias y herramientas de resolución y propiedades.',
    'A.4.a': 'Relaciones. Sistema de numeración de base diez (hasta el 999): aplicación de las relaciones que genera en las operaciones.',
    'A.4.b': 'Relaciones. Números naturales en contextos de la vida cotidiana: comparación y ordenación.',
    'A.4.c': 'Relaciones. Relaciones entre la suma y la resta: aplicación en contextos cotidianos.',
    'A.5':   'Educación financiera. Sistema monetario europeo: monedas (1, 2 euros) y billetes de euro (5, 10, 20, 50 y 100), valor y equivalencia.',
    'F.1':   'Creencias, actitudes y emociones. Gestión emocional: estrategias de identificación y expresión de las propias emociones ante las matemáticas. Curiosidad e iniciativa en el aprendizaje de las matemáticas.',
    'F.2.a': 'Trabajo en equipo, inclusión, respeto y diversidad. Identificación y rechazo de actitudes discriminatorias ante las diferencias individuales presentes en el aula. Actitudes inclusivas y aceptación de la diversidad del grupo.',
    'F.2.b': 'Trabajo en equipo, inclusión, respeto y diversidad. Participación activa en el trabajo en equipo: interacción positiva y respeto por el trabajo de los demás.',
    'F.2.c': 'Trabajo en equipo, inclusión, respeto y diversidad. Contribución de las matemáticas a los distintos ámbitos del conocimiento humano desde una perspectiva de género.'
  },

  /* ── Saberes de SEGUNDO ciclo, citados SOLO para justificar exclusiones ─ */
  segundoCicloReferencia: {
    'A.3.c-2c': 'Construcción de las tablas de multiplicar apoyándose en número de veces, suma repetida o disposición en cuadrículas.',
    'A.2.d-2c': 'Fracciones propias con denominador hasta 12 en contextos de la vida cotidiana.',
    'A.5-2c':   'Cálculo y estimación de cantidades y cambios (euros y céntimos de euro) en problemas de la vida cotidiana: ingresos, gastos y ahorro. Decisiones de compra responsable.'
  },

  /* ── Bloques del área y qué cubre este juego ──────────────────────────── */
  bloques: {
    A: { nombre: 'Sentido numérico',      cubierto: true  },
    B: { nombre: 'Sentido de la medida',  cubierto: false },
    C: { nombre: 'Sentido espacial',      cubierto: false },
    D: { nombre: 'Sentido algebraico',    cubierto: false },
    E: { nombre: 'Sentido estocástico',   cubierto: false },
    F: { nombre: 'Sentido socioafectivo', cubierto: true, modo: 'transversal' }
  },

  /* ── Techo numérico por trimestre. DECISIÓN PROPIA del proyecto ───────── */
  techoTrimestre: { 1: 199, 2: 599, 3: 999 },

  /* ── Calendario escolar por defecto, para deducir el trimestre sin
        preguntarle nada al niño (PLAN §6.6). Ajustable por el adulto.
        Devuelve 1, 2, 3 o 'verano'. ───────────────────────────────────── */
  trimestrePorFecha: function (isoFecha) {
    var partes = String(isoFecha).split('-');
    var mes = parseInt(partes[1], 10), dia = parseInt(partes[2], 10);
    if (!isFinite(mes) || !isFinite(dia)) return 1;
    var md = mes * 100 + dia;
    if (md >= 908 && md <= 1222) return 1;               //  8 sep – 22 dic
    if (md >= 108 && md <= 331) return 2;                //  8 ene – Semana Santa (aprox.)
    if (md >= 401 && md <= 622) return 3;                //  tras Semana Santa – 22 jun
    if (md >= 623 && md <= 907) return 'verano';         //  23 jun –  7 sep
    return 1;                                            //  23 dic –  7 ene
  }
};

/* ============================================================================
   nombres.js — 40 nombres propios para los enunciados (20 F + 20 M)
   ----------------------------------------------------------------------------
   Criterios (PLAN §9.7):
     · 1 o 2 sílabas: un lector de 7 años no debe gastar su presupuesto de
       decodificación en el nombre, sino en la estructura del problema.
     · Diversidad real del aula de la escuela pública española.
     · Sin tilde en la medida de lo posible, para no añadir carga ortográfica.
     · El género se ALTERNA por construcción con BolsaBarajada, no se sortea:
       el equilibrio 50/50 con muestreo aleatorio es matemáticamente inalcanzable
       en 200 extracciones (σ ≈ 7).

   LISTA NEGRA DE NOMBRES: quedan excluidos los que colisionan con la auditoría
   de marca de §21.1 o con personajes de terceros.
   ========================================================================== */

var CB = CB || {};
CB.datos = CB.datos || {};

CB.datos.NOMBRES_F = [
  'Ana', 'Eva', 'Sara', 'Marta', 'Julia', 'Laia', 'Noa', 'Emma', 'Iris', 'Alba',
  'Nora', 'Elsa', 'Lola', 'Vega', 'Aixa', 'Nadia', 'Yasmin', 'Fatma', 'Lin', 'Zoe'
];

CB.datos.NOMBRES_M = [
  'Leo', 'Hugo', 'Bruno', 'Pablo', 'Marc', 'Pau', 'Jan', 'Nil', 'Iker', 'Mario',
  'Nico', 'Iván', 'Adam', 'Omar', 'Amir', 'Karim', 'Wei', 'Dani', 'Raúl', 'Toño'
];

/* Nombres prohibidos: colisionan con la lista negra de marca o con personajes
   de terceros. `pruebas/casos-problemas.js` comprueba que ninguno aparece. */
CB.datos.NOMBRES_PROHIBIDOS = ['Alex', 'Álex', 'Steve', 'Herobrine', 'Notch'];

/* ============================================================================
   objetos.js — 60 objetos contables para los enunciados
   ----------------------------------------------------------------------------
   Cada objeto lleva: singular, plural, artículo, género, sprite (carácter
   Unicode, cero ficheros de imagen) y sus verbos de ganar y de perder.

   Los verbos NO son intercambiables: «se come tres coches» es una frase que un
   niño de 7 años detecta como rota al instante y le hace desconfiar del juego
   entero. Por eso los verbos se derivan de la CATEGORÍA del objeto.
   ========================================================================== */

var CB = CB || {};
CB.datos = CB.datos || {};

/* Verbos por categoría. Todos en 3.ª persona del singular del presente, que es
   el tiempo que sostiene la estructura semántica sin subordinación. */
CB.datos.VERBOS = {
  comida:   { ganar: ['coge', 'compra', 'recoge'],       perder: ['come', 'regala', 'reparte'] },
  juguete:  { ganar: ['gana', 'compra', 'encuentra'],    perder: ['regala', 'presta', 'pierde'] },
  escolar:  { ganar: ['compra', 'encuentra', 'coge'],    perder: ['pierde', 'presta', 'regala'] },
  natura:   { ganar: ['recoge', 'encuentra', 'coge'],    perder: ['pierde', 'planta', 'regala'] },
  animal:   { ganar: ['ve', 'cuida', 'encuentra'],       perder: ['suelta', 'regala', 'presta'] },
  coleccion:{ ganar: ['gana', 'compra', 'cambia'],       perder: ['cambia', 'regala', 'pierde'] },
  bloque:   { ganar: ['pica', 'coge', 'encuentra'],      perder: ['coloca', 'gasta', 'regala'] }
};

/* n = neutro para el artículo: f = femenino, m = masculino */
CB.datos.OBJETOS = [
  /* — coleccion — */
  { sing: 'cromo',     plur: 'cromos',     g: 'm', cat: 'coleccion', sprite: '🃏' },
  { sing: 'pegatina',  plur: 'pegatinas',  g: 'f', cat: 'coleccion', sprite: '⭐' },
  { sing: 'canica',    plur: 'canicas',    g: 'f', cat: 'coleccion', sprite: '🔵' },
  { sing: 'ficha',     plur: 'fichas',     g: 'f', cat: 'coleccion', sprite: '🔘' },
  { sing: 'carta',     plur: 'cartas',     g: 'f', cat: 'coleccion', sprite: '🂠' },
  { sing: 'sello',     plur: 'sellos',     g: 'm', cat: 'coleccion', sprite: '🏷' },
  { sing: 'gema',      plur: 'gemas',      g: 'f', cat: 'coleccion', sprite: '💎' },
  { sing: 'dado',      plur: 'dados',      g: 'm', cat: 'coleccion', sprite: '🎲' },

  /* — comida — */
  { sing: 'manzana',   plur: 'manzanas',   g: 'f', cat: 'comida', sprite: '🍎' },
  { sing: 'pera',      plur: 'peras',      g: 'f', cat: 'comida', sprite: '🍐' },
  { sing: 'fresa',     plur: 'fresas',     g: 'f', cat: 'comida', sprite: '🍓' },
  { sing: 'naranja',   plur: 'naranjas',   g: 'f', cat: 'comida', sprite: '🍊' },
  { sing: 'uva',       plur: 'uvas',       g: 'f', cat: 'comida', sprite: '🍇' },
  { sing: 'galleta',   plur: 'galletas',   g: 'f', cat: 'comida', sprite: '🍪' },
  { sing: 'caramelo',  plur: 'caramelos',  g: 'm', cat: 'comida', sprite: '🍬' },
  { sing: 'huevo',     plur: 'huevos',     g: 'm', cat: 'comida', sprite: '🥚' },
  { sing: 'tomate',    plur: 'tomates',    g: 'm', cat: 'comida', sprite: '🍅' },
  { sing: 'zanahoria', plur: 'zanahorias', g: 'f', cat: 'comida', sprite: '🥕' },
  { sing: 'patata',    plur: 'patatas',    g: 'f', cat: 'comida', sprite: '🥔' },
  { sing: 'nuez',      plur: 'nueces',     g: 'f', cat: 'comida', sprite: '🌰' },
  { sing: 'seta',      plur: 'setas',      g: 'f', cat: 'comida', sprite: '🍄' },

  /* — juguete — */
  { sing: 'pelota',    plur: 'pelotas',    g: 'f', cat: 'juguete', sprite: '⚽' },
  { sing: 'coche',     plur: 'coches',     g: 'm', cat: 'juguete', sprite: '🚗' },
  { sing: 'tren',      plur: 'trenes',     g: 'm', cat: 'juguete', sprite: '🚂' },
  { sing: 'barco',     plur: 'barcos',     g: 'm', cat: 'juguete', sprite: '⛵' },
  { sing: 'avión',     plur: 'aviones',    g: 'm', cat: 'juguete', sprite: '✈' },
  { sing: 'globo',     plur: 'globos',     g: 'm', cat: 'juguete', sprite: '🎈' },
  { sing: 'peluche',   plur: 'peluches',   g: 'm', cat: 'juguete', sprite: '🧸' },
  { sing: 'cometa',    plur: 'cometas',    g: 'f', cat: 'juguete', sprite: '🪁' },
  { sing: 'cuerda',    plur: 'cuerdas',    g: 'f', cat: 'juguete', sprite: '🪢' },
  { sing: 'aro',       plur: 'aros',       g: 'm', cat: 'juguete', sprite: '⭕' },
  { sing: 'pala',      plur: 'palas',      g: 'f', cat: 'juguete', sprite: '🥄' },
  { sing: 'cubo',      plur: 'cubos',      g: 'm', cat: 'juguete', sprite: '🪣' },

  /* — escolar — */
  { sing: 'lápiz',     plur: 'lápices',    g: 'm', cat: 'escolar', sprite: '✏' },
  { sing: 'goma',      plur: 'gomas',      g: 'f', cat: 'escolar', sprite: '🧽' },
  { sing: 'libro',     plur: 'libros',     g: 'm', cat: 'escolar', sprite: '📕' },
  { sing: 'cuaderno',  plur: 'cuadernos',  g: 'm', cat: 'escolar', sprite: '📓' },
  { sing: 'regla',     plur: 'reglas',     g: 'f', cat: 'escolar', sprite: '📏' },
  { sing: 'tijera',    plur: 'tijeras',    g: 'f', cat: 'escolar', sprite: '✂' },
  { sing: 'rotulador', plur: 'rotuladores',g: 'm', cat: 'escolar', sprite: '🖊' },
  { sing: 'carpeta',   plur: 'carpetas',   g: 'f', cat: 'escolar', sprite: '📁' },

  /* — natura — */
  { sing: 'hoja',      plur: 'hojas',      g: 'f', cat: 'natura', sprite: '🍂' },
  { sing: 'flor',      plur: 'flores',     g: 'f', cat: 'natura', sprite: '🌼' },
  { sing: 'piedra',    plur: 'piedras',    g: 'f', cat: 'natura', sprite: '🪨' },
  { sing: 'palo',      plur: 'palos',      g: 'm', cat: 'natura', sprite: '🥢' },
  { sing: 'concha',    plur: 'conchas',    g: 'f', cat: 'natura', sprite: '🐚' },
  { sing: 'pluma',     plur: 'plumas',     g: 'f', cat: 'natura', sprite: '🪶' },
  { sing: 'semilla',   plur: 'semillas',   g: 'f', cat: 'natura', sprite: '🌱' },
  { sing: 'bellota',   plur: 'bellotas',   g: 'f', cat: 'natura', sprite: '🌰' },
  { sing: 'estrella',  plur: 'estrellas',  g: 'f', cat: 'natura', sprite: '⭐' },

  /* — animal — */
  { sing: 'pez',       plur: 'peces',      g: 'm', cat: 'animal', sprite: '🐟' },
  { sing: 'pájaro',    plur: 'pájaros',    g: 'm', cat: 'animal', sprite: '🐦' },
  { sing: 'gato',      plur: 'gatos',      g: 'm', cat: 'animal', sprite: '🐱' },
  { sing: 'perro',     plur: 'perros',     g: 'm', cat: 'animal', sprite: '🐶' },
  { sing: 'conejo',    plur: 'conejos',    g: 'm', cat: 'animal', sprite: '🐰' },
  { sing: 'oveja',     plur: 'ovejas',     g: 'f', cat: 'animal', sprite: '🐑' },
  { sing: 'rana',      plur: 'ranas',      g: 'f', cat: 'animal', sprite: '🐸' },
  { sing: 'abeja',     plur: 'abejas',     g: 'f', cat: 'animal', sprite: '🐝' },

  /* — bloque — */
  { sing: 'bloque',    plur: 'bloques',    g: 'm', cat: 'bloque', sprite: '🟫' },
  { sing: 'ladrillo',  plur: 'ladrillos',  g: 'm', cat: 'bloque', sprite: '🧱' }
];

/* Se completan artículo y verbos en tiempo de definición: así el objeto que
   recibe el generador ya lleva todos los campos que declara PLAN §14.1. */
(function () {
  var i, o, v;
  for (i = 0; i < CB.datos.OBJETOS.length; i++) {
    o = CB.datos.OBJETOS[i];
    o.articulo    = (o.g === 'f') ? 'la'  : 'el';
    o.articuloPl  = (o.g === 'f') ? 'las' : 'los';
    o.indef       = (o.g === 'f') ? 'una' : 'un';
    v = CB.datos.VERBOS[o.cat];
    o.verbosGanar  = v.ganar.slice();
    o.verbosPerder = v.perder.slice();
    o.idx = i;
  }
})();

/* ============================================================================
   vocabulario.js — Lista blanca de los enunciados y los 48 términos del
                    Diccionario de Bloques
   ----------------------------------------------------------------------------
   SOBRE LOS 48 TÉRMINOS (PLAN §6.4, cita corregida): el criterio de evaluación
   6.1 del primer ciclo dice literalmente «Reconocer lenguaje matemático sencillo
   presente en la vida cotidiana, adquiriendo vocabulario específico básico». NO
   enumera términos ni contiene lista alguna. Por tanto:

     «Diccionario de Bloques: 48 términos de un glosario PROPIO del proyecto,
      seleccionado para dar cobertura al criterio de evaluación 6.1 del
      RD 157/2022 (1.er ciclo). La cifra 48 y la selección son decisiones de este
      proyecto, no una enumeración oficial.»

   SOBRE LA LISTA BLANCA (§8.3): se construye con los sustantivos concretos de
   los 60 objetos contables, los 40 nombres propios, los verbos de ganar y de
   perder, los 48 términos del Diccionario y los conectores del español básico.
   Se declara literalmente como «lista blanca propia del proyecto, pendiente de
   revisión por un maestro de primer ciclo», NUNCA como «validada por corpus»:
   no se dispone de un corpus de frecuencia léxica infantil citable.
   ========================================================================== */

var CB = CB || {};
CB.datos = CB.datos || {};

/* ── Los 48 términos del Diccionario de Bloques (6 por nivel × 8 niveles) ── */
CB.datos.GLOSARIO = [
  /* V1 — Las palabras de la suma */
  { t: 'sumando',    n: 'V1', d: 'Cada uno de los números que se juntan en una suma.' },
  { t: 'suma',       n: 'V1', d: 'El resultado de juntar dos o más números.' },
  { t: 'total',      n: 'V1', d: 'Todo lo que hay cuando se junta.' },
  { t: 'juntar',     n: 'V1', d: 'Poner cosas de dos grupos en uno solo.' },
  { t: 'añadir',     n: 'V1', d: 'Poner más cosas a las que ya había.' },
  { t: 'más',        n: 'V1', d: 'La palabra que avisa de que la cantidad crece.' },

  /* V2 — Las palabras de la resta */
  { t: 'minuendo',   n: 'V2', d: 'El número al que se le quita.', mayores: true },
  { t: 'sustraendo', n: 'V2', d: 'El número que se quita.',       mayores: true },
  { t: 'diferencia', n: 'V2', d: 'Lo que hay de un número a otro.' },
  { t: 'quitar',     n: 'V2', d: 'Sacar cosas de un grupo.' },
  { t: 'quedar',     n: 'V2', d: 'Lo que sobra después de quitar.' },
  { t: 'menos',      n: 'V2', d: 'La palabra que avisa de que la cantidad baja.' },

  /* V3 — Unidades, decenas y centenas */
  { t: 'cifra',      n: 'V3', d: 'Cada uno de los signos con los que se escribe un número.' },
  { t: 'unidad',     n: 'V3', d: 'Una sola cosa. La cifra de la derecha del todo.' },
  { t: 'decena',     n: 'V3', d: 'Un grupo de diez.' },
  { t: 'centena',    n: 'V3', d: 'Un grupo de cien.' },
  { t: 'valor',      n: 'V3', d: 'Lo que vale una cifra según el lugar que ocupa.' },
  { t: 'número',     n: 'V3', d: 'Lo que dice cuántas cosas hay.' },

  /* V4 — Comparar */
  { t: 'mayor que',  n: 'V4', d: 'Que tiene más cantidad.' },
  { t: 'menor que',  n: 'V4', d: 'Que tiene menos cantidad.' },
  { t: 'igual',      n: 'V4', d: 'Que tiene la misma cantidad.' },
  { t: 'anterior',   n: 'V4', d: 'El que va justo antes.' },
  { t: 'siguiente',  n: 'V4', d: 'El que va justo después.' },
  { t: 'comparar',   n: 'V4', d: 'Mirar dos cantidades para ver cuál es mayor.' },

  /* V5 — Orden y posición */
  { t: 'primero',    n: 'V5', d: 'El que va delante de todos.' },
  { t: 'segundo',    n: 'V5', d: 'El que va justo detrás del primero.' },
  { t: 'último',     n: 'V5', d: 'El que va detrás de todos.' },
  { t: 'vigésimo',   n: 'V5', d: 'El que ocupa el lugar veinte.' },
  { t: 'entre',      n: 'V5', d: 'En medio de dos.' },
  { t: 'delante de', n: 'V5', d: 'Justo antes de otro.' },

  /* V6 — Las palabras del dinero */
  { t: 'moneda',     n: 'V6', d: 'Pieza de metal con la que se paga.' },
  { t: 'billete',    n: 'V6', d: 'Papel con el que se paga.' },
  { t: 'euro',       n: 'V6', d: 'El dinero que usamos en España.' },
  { t: 'precio',     n: 'V6', d: 'Lo que cuesta una cosa.' },
  { t: 'cambio',     n: 'V6', d: 'El dinero que devuelven cuando pagas de más.' },
  { t: 'pagar',      n: 'V6', d: 'Dar dinero a cambio de algo.' },

  /* V7 — Veces, doble y mitad */
  { t: 'veces',      n: 'V7', d: 'Cuántas veces se repite una cantidad.' },
  { t: 'doble',      n: 'V7', d: 'Dos veces la misma cantidad.' },
  { t: 'mitad',      n: 'V7', d: 'Una de las dos partes iguales de algo.' },
  { t: 'fila',       n: 'V7', d: 'Cosas puestas una al lado de otra, a lo ancho.' },
  { t: 'columna',    n: 'V7', d: 'Cosas puestas una encima de otra, a lo alto.' },
  { t: 'contar',     n: 'V7', d: 'Decir los números en orden para saber cuántos hay.' },

  /* V8 — Las palabras de los problemas */
  { t: 'en total',   n: 'V8', d: 'Todo junto, sin dejarse nada.' },
  { t: 'le quedan',  n: 'V8', d: 'Lo que tiene después de perder o de dar.' },
  { t: 'más que',    n: 'V8', d: 'Tiene una cantidad mayor que el otro.' },
  { t: 'menos que',  n: 'V8', d: 'Tiene una cantidad menor que el otro.' },
  { t: 'tantos como',n: 'V8', d: 'Tiene la misma cantidad que el otro.' },
  { t: 'cuántos',    n: 'V8', d: 'La palabra con la que se pregunta la cantidad.' }
];

/* ── Conectores y palabras funcionales del español básico ────────────────── */
CB.datos.FUNCIONALES = [
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'de', 'del', 'a', 'al', 'en', 'con', 'sin', 'por', 'para', 'sobre', 'hasta',
  'y', 'e', 'o', 'u',
  'su', 'sus', 'le', 'les', 'se', 'me', 'te', 'lo',
  'tiene', 'tienen', 'tenía', 'tenían', 'había', 'hay', 'es', 'son', 'está', 'están',
  'queda', 'quedan', 'quedaban', 'falta', 'faltan', 'sobra', 'sobran',
  'ha', 'han', 'ganado', 'perdido', 'igualar', 'quiere', 'quieren', 'color',
  'ahora', 'antes', 'después', 'luego', 'también', 'ya', 'todavía',
  'todos', 'todas', 'cada', 'otro', 'otra', 'otros', 'otras',
  'mismo', 'misma', 'mismos', 'mismas',
  'como', 'que', 'qué', 'cuánto', 'cuánta', 'cuántas',
  'tanto', 'tantas', 'muy', 'poco', 'pocos', 'nada',
  'él', 'ella', 'ellos', 'ellas',
  'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho',
  'nueve', 'diez', 'once', 'doce',
  'ninguno', 'ninguna', 'juntos', 'juntas', 'iguales', 'mismo'
];

/* ── Construcción de la lista blanca ─────────────────────────────────────── */
CB.datos.LISTA_BLANCA = (function () {
  var set = {}, i, j, o, partes;

  function meter(palabra) {
    if (!palabra) return;
    var p = String(palabra).toLowerCase().trim();
    if (p) set[p] = true;
  }
  function meterFrase(frase) {
    var w = String(frase).toLowerCase().split(/\s+/);
    for (var k = 0; k < w.length; k++) meter(w[k]);
  }

  for (i = 0; i < CB.datos.FUNCIONALES.length; i++) meter(CB.datos.FUNCIONALES[i]);

  for (i = 0; i < CB.datos.GLOSARIO.length; i++) meterFrase(CB.datos.GLOSARIO[i].t);

  if (CB.datos.OBJETOS) {
    for (i = 0; i < CB.datos.OBJETOS.length; i++) {
      o = CB.datos.OBJETOS[i];
      meter(o.sing); meter(o.plur);
      for (j = 0; j < o.verbosGanar.length; j++)  meter(o.verbosGanar[j]);
      for (j = 0; j < o.verbosPerder.length; j++) meter(o.verbosPerder[j]);
    }
  }

  if (CB.datos.NOMBRES_F) {
    for (i = 0; i < CB.datos.NOMBRES_F.length; i++) meter(CB.datos.NOMBRES_F[i]);
    for (i = 0; i < CB.datos.NOMBRES_M.length; i++) meter(CB.datos.NOMBRES_M[i]);
  }

  /* Formas verbales concretas que usan las plantillas y que no salen de las
     listas anteriores. Se declaran una a una: la lista blanca es un contrato. */
  partes = ['reparte', 'reparten', 'cambia', 'cambian', 'gana', 'ganan',
            'pierde', 'pierden', 'compra', 'compran', 'vende', 'venden',
            'recoge', 'recogen', 'coge', 'cogen', 'come', 'comen',
            'regala', 'regalan', 'presta', 'prestan', 'planta', 'plantan',
            'suelta', 'sueltan', 'cuida', 'cuidan', 've', 'ven',
            'pica', 'pican', 'coloca', 'colocan', 'gasta', 'gastan',
            'encuentra', 'encuentran', 'guarda', 'guardan'];
  for (i = 0; i < partes.length; i++) meter(partes[i]);

  return set;
})();

CB.datos.enListaBlanca = function (palabra) {
  return CB.datos.LISTA_BLANCA[String(palabra).toLowerCase()] === true;
};

/* Declaración honesta del origen de la lista, para el panel del adulto y la
   documentación. No se afirma nada que no se pueda sostener. */
CB.datos.ORIGEN_LISTA_BLANCA =
  'Lista blanca propia del proyecto, pendiente de revisión por un maestro de ' +
  'primer ciclo. No procede de ningún corpus de frecuencia léxica infantil.';

CB.datos.ORIGEN_GLOSARIO =
  'Diccionario de Bloques: 48 términos de un glosario propio del proyecto, ' +
  'seleccionado para dar cobertura al criterio de evaluación 6.1 del ' +
  'RD 157/2022 (1.er ciclo). La cifra 48 y la selección son decisiones de este ' +
  'proyecto, no una enumeración oficial.';

/* ============================================================================
   mensajes.js — 84 mensajes de acierto (4 × 21) y 48 de ánimo (2 × 24)
   ----------------------------------------------------------------------------
   REQUISITOS 4 y 5 DEL USUARIO. Cada categoría tiene su PROPIA BolsaBarajada
   persistida en el perfil: ningún mensaje se repite hasta agotar su bolsa.

   POR QUÉ HAY PLANTILLAS CON {proc} Y {pista}:
   un elogio de procedimiento solo educa si nombra el procedimiento CORRECTO. Un
   mensaje fijo como «¡has llevado bien la decena!» es falso detrás de un ítem de
   vocabulario, y un niño de 7 años detecta esa incoherencia al instante. Las 21
   plantillas de la categoría A y las 24 de la categoría P1 llevan una ranura que
   se rellena con la frase de la destreza real del ítem: 21 marcos × 13 destrezas
   × 3 frases = variedad enorme y siempre cierta.

   LISTAS NEGRAS APLICADAS (casos-mensajes.js, M5 y M6):
     · Elogio de persona: listo, lista, inteligente, genio, crack, campeón,
       campeona, máquina, fenómeno, eres el mejor, qué listo, qué lista.
       Motivo: el elogio de rasgo instala mentalidad fija; cada fallo posterior
       contradice la etiqueta.
     · Registro impropio: wow, cool, top, súper, campeoncito, mi niño, cielo,
       cariño, chaval, voseo y diminutivos condescendientes.
   ========================================================================== */

var CB = CB || {};
CB.datos = CB.datos || {};

CB.datos.MENSAJES = {};

/* ── Frases de procedimiento, por destreza (13 slugs × 3) ───────────────── */
CB.datos.MENSAJES.PROCEDIMIENTOS = {
  numeracion: [
    'Has leído el número entero, sin saltarte ninguna cifra.',
    'Has contado sin perderte por el camino.',
    'Has visto qué número va antes y cuál va después.'
  ],
  valor_posicional: [
    'Has colocado cada cifra en su sitio: centenas, decenas y unidades.',
    'Has sabido cuánto vale cada cifra según el lugar que ocupa.',
    'Has separado las decenas de las unidades.'
  ],
  suma_sin_llevar: [
    'Has sumado primero las unidades y después las decenas.',
    'Has juntado las dos cantidades sin equivocarte de columna.',
    'Has sumado ordenado, columna a columna.'
  ],
  suma_llevada: [
    'Has llevado bien la decena a la columna de al lado.',
    'Al pasar de diez has llevado una decena, justo como toca.',
    'Has recordado la llevada. Eso es lo más difícil de todo.'
  ],
  resta_sin_llevar: [
    'Has restado unidades con unidades y decenas con decenas.',
    'Has quitado la cantidad justa.',
    'Has restado columna a columna, sin mezclarlas.'
  ],
  resta_llevada: [
    'Has pedido prestada una decena y la has deshecho bien.',
    'Has desatado un manojo de diez para poder restar.',
    'Has llevado la resta con préstamo hasta el final.'
  ],
  multiplicacion: [
    'Has contado las filas y las columnas.',
    'Has visto que multiplicar es sumar el mismo número varias veces.',
    'Has recordado cuántas veces cabe ese número.'
  ],
  problemas_cambio: [
    'Has visto qué tenía al principio y qué pasó después.',
    'Has entendido si la cantidad crecía o se hacía más pequeña.',
    'Has seguido el cuento hasta el final antes de operar.'
  ],
  problemas_combinacion: [
    'Has juntado las dos partes para formar el todo.',
    'Has visto que las dos cantidades formaban un mismo grupo.',
    'Has separado la parte del total.'
  ],
  problemas_comparacion: [
    'Has comparado las dos cantidades sin dejarte llevar por la palabra.',
    'Has visto quién tenía más y cuánto más.',
    'Has medido la diferencia entre los dos.'
  ],
  problemas_igualacion: [
    'Has calculado cuánto falta para que los dos tengan lo mismo.',
    'Has igualado las dos cantidades.',
    'Has visto cuánto había que mover de un lado al otro.'
  ],
  dinero: [
    'Has contado las monedas y los billetes por su valor.',
    'Has sabido cuánto vale cada moneda.',
    'Has calculado bien el cambio.'
  ],
  vocabulario: [
    'Has recordado qué significa esa palabra de matemáticas.',
    'Has usado la palabra exacta.',
    'Has reconocido el término a la primera.'
  ]
};

/* ── Pistas de procedimiento para el fallo (13 slugs × 2) ───────────────── */
CB.datos.MENSAJES.PISTAS = {
  numeracion: [
    'Fíjate bien en cuántas cifras tiene el número.',
    'Cuenta otra vez, despacio.'
  ],
  valor_posicional: [
    'Mira qué lugar ocupa cada cifra.',
    'Separa las decenas de las unidades.'
  ],
  suma_sin_llevar: [
    'Suma primero las unidades y después las decenas.',
    'Cuida de no mezclar las columnas.'
  ],
  suma_llevada: [
    'Mira si al sumar las unidades pasas de diez.',
    'Si pasas de diez, hay que llevar una decena.'
  ],
  resta_sin_llevar: [
    'Quita unidades a unidades y decenas a decenas.',
    'Coloca bien las dos cantidades antes de restar.'
  ],
  resta_llevada: [
    'Mira si puedes quitar sin pedir prestado.',
    'Si el de arriba es más pequeño, pide una decena prestada.'
  ],
  multiplicacion: [
    'Cuenta las filas y luego las columnas.',
    'Prueba a sumar ese número tantas veces.'
  ],
  problemas_cambio: [
    'Vuelve a leer qué tenía al principio.',
    'Mira si al final tiene más o tiene menos.'
  ],
  problemas_combinacion: [
    'Mira si te piden el total o solo una parte.',
    'Las dos cantidades juntas forman el todo.'
  ],
  problemas_comparacion: [
    'No te fíes solo de la palabra: mira quién tiene más.',
    'Piensa cuánto le falta a uno para llegar al otro.'
  ],
  problemas_igualacion: [
    'Piensa cuánto hay que mover para que tengan lo mismo.',
    'Mira cuál tiene menos y cuánto le falta.'
  ],
  dinero: [
    'Cuenta primero los billetes y luego las monedas.',
    'Mira cuánto vale cada moneda.'
  ],
  vocabulario: [
    'Piensa qué operación te pide esa palabra.',
    'Lee la palabra otra vez, sin prisa.'
  ]
};

/* ══ ACIERTO — 4 categorías × EXACTAMENTE 21 = 84 ═══════════════════════ */

/* A) PROCEDIMIENTO — nombran lo que ha hecho. Las 21 llevan {proc}. */
CB.datos.MENSAJES.acierto_A = [
  '¡Muy bien! {proc}',
  '¡Eso es! {proc}',
  '¡Bloque picado! {proc}',
  '¡Exacto! {proc}',
  '¡Justo así! {proc}',
  '¡Toma gema! {proc}',
  '¡Perfecto! {proc}',
  '¡Ahí está! {proc}',
  '¡Bien hecho! {proc}',
  '¡Lo has clavado! {proc}',
  '¡Adelante! {proc}',
  '¡Se abre la veta! {proc}',
  '¡Correcto! {proc}',
  '¡Buen pico! {proc}',
  '¡Así se cava! {proc}',
  '¡Cae el bloque! {proc}',
  '¡Muy bien visto! {proc}',
  '¡Estupendo! {proc}',
  '¡Bloque limpio! {proc}',
  '¡Buen trabajo! {proc}',
  '¡La cantera se ilumina! {proc}'
];

/* B) ESFUERZO — elogian el proceso de intentarlo, nunca el rasgo. */
CB.datos.MENSAJES.acierto_B = [
  '¡Lo has vuelto a intentar y ha salido!',
  '¡No lo has dejado y ha caído el bloque!',
  '¡Has seguido cavando hasta el final!',
  '¡Te lo has tomado con calma y ha funcionado!',
  '¡Has pensado antes de tocar y se nota!',
  '¡Has aguantado y lo has sacado!',
  '¡Ese ha costado y aun así ha salido!',
  '¡Has mirado con cuidado y has acertado!',
  '¡Paso a paso, y ya está!',
  '¡Has trabajado ese bloque hasta el final!',
  '¡Lo has revisado y ha valido la pena!',
  '¡Has vuelto a comprobarlo antes de responder!',
  '¡Con calma se pican mejor los bloques!',
  '¡Has insistido y la piedra ha cedido!',
  '¡Cada intento acerca, y este ha entrado!',
  '¡Has cavado despacio y has llegado!',
  '¡No te has rendido con este!',
  '¡Has tomado carrerilla y ha salido!',
  '¡Has puesto atención y se ha notado!',
  '¡Este te ha llevado tiempo y lo has conseguido!',
  '¡Has probado de otra manera y ha funcionado!'
];

/* C) SUPERACIÓN — tras la tarjeta de reparación o un concepto difícil. */
CB.datos.MENSAJES.acierto_C = [
  '¡Antes se te resistía y ahora lo tienes!',
  '¡Lo has aprendido hace un momento y ya te sale!',
  '¡Has arreglado el bloque que se te cayó!',
  '¡Lo que fallaste antes, ahora te sale!',
  '¡Esa veta se te atragantaba y la has abierto!',
  '¡Has vuelto al pozo y has salido con gema!',
  '¡Justo eso era lo que había que hacer!',
  '¡Has cogido el truco!',
  '¡Ese fallo de antes te ha servido!',
  '¡Ahora sí lo tienes!',
  '¡Has remontado ese bloque!',
  '¡Rocarr te lo enseñó y lo has usado!',
  '¡Segunda vez y bloque picado!',
  '¡Ese ya no se te escapa!',
  '¡Lo has vuelto a mirar y esta vez ha entrado!',
  '¡Has reparado la grieta sin ayuda!',
  '¡Lo difícil ya lo has pasado!',
  '¡Has dado la vuelta a ese bloque!',
  '¡Se te resistía y ya no!',
  '¡Ahora entiendes por dónde iba!',
  '¡Has salido del apuro con el pico bien puesto!'
];

/* D) DESCUBRIMIENTO — racha, mundo nuevo, veta que se ilumina. */
CB.datos.MENSAJES.acierto_D = [
  '¡Vas encadenando bloques!',
  '¡La veta se ilumina!',
  '¡Chispa gira de lo contenta que está!',
  '¡Se abre un camino nuevo en la cantera!',
  '¡Otro bloque más para la racha!',
  '¡Estás abriendo galería!',
  '¡La cantera se llena de luz!',
  '¡Ese ha sido un buen filón!',
  '¡Vas cavando hondo!',
  '¡La racha sigue viva!',
  '¡Blopi ha dado un bote!',
  '¡Ahí había cristal escondido!',
  '¡Suena el pico contra la roca buena!',
  '¡Vas dejando el túnel bien recto!',
  '¡Otra gema para el saco!',
  '¡La veta empieza a brillar!',
  '¡Has encontrado el filón!',
  '¡Se oye eco: la galería es larga!',
  '¡Vagoneto pasa cargado de gemas!',
  '¡El mapa se te queda pequeño!',
  '¡Sigue esa veta, que da gemas!'
];

/* ══ ÁNIMO — 2 categorías × EXACTAMENTE 24 = 48 ═════════════════════════ */

/* P1) MIRA OTRA VEZ — señalan DÓNDE mirar. Las 24 llevan {pista}. */
CB.datos.MENSAJES.animo_P1 = [
  '¡Casi! {pista}',
  '¡Estaba cerca! {pista}',
  '¡Este se ha escapado! {pista}',
  '¡No pasa nada! {pista}',
  '¡Vamos a verlo otra vez! {pista}',
  '¡Buen intento! {pista}',
  '¡Le has dado casi! {pista}',
  '¡Ese bloque es duro! {pista}',
  '¡Un momento y lo tienes! {pista}',
  '¡Prueba otra vez! {pista}',
  '¡Estabas muy cerca! {pista}',
  '¡Nos falta poco! {pista}',
  '¡A ver por dónde se rompe! {pista}',
  '¡Con calma! {pista}',
  '¡Otra pasada y cae! {pista}',
  '¡Este se resiste! {pista}',
  '¡Falta un golpe de pico! {pista}',
  '¡Sin prisa! {pista}',
  '¡Mira por aquí! {pista}',
  '¡Vamos paso a paso! {pista}',
  '¡Un vistazo más! {pista}',
  '¡Casi lo tienes! {pista}',
  '¡No se ha roto todavía! {pista}',
  '¡Vuelve a intentarlo! {pista}'
];

/* P2) EL ERROR ENSEÑA — normalizan el fallo. Criterio 7.2 del RD, literal:
   «valorando el error como una oportunidad de aprendizaje». */
CB.datos.MENSAJES.animo_P2 = [
  'Equivocarse es parte de cavar. Seguimos.',
  'Hasta los mineros expertos fallan muchos golpes. Sigue.',
  'Este bloque no ha caído. El siguiente puede.',
  'Nadie pica una veta a la primera. Adelante.',
  'Rocarr también falla, y mira lo mayor que es.',
  'De los bloques que no caen se aprende el truco.',
  'Aquí no se pierde nada por probar.',
  'Ese fallo te dice por dónde seguir cavando.',
  'Ha fallado el golpe, no quien lo da.',
  'Vamos otra vez, que hay galería de sobra.',
  'Todo el mundo tropieza con esa piedra.',
  'Ya sabes una manera que no funciona. Eso es un avance.',
  'Sigue con el pico en la mano.',
  'Este bloque necesita más de un golpe.',
  'Con tranquilidad, que la cantera no se acaba.',
  'Un fallo no apaga ninguna luz por sí solo.',
  'Lo importante es volver a levantar el pico.',
  'Esa veta se abre poco a poco.',
  'Aquí se viene a aprender, no a acertar siempre.',
  'El siguiente bloque puede ser el bueno.',
  'Los fallos dejan marcas que enseñan el camino.',
  'Nada roto: solo un bloque que sigue ahí.',
  'Se aprende cavando, y estás cavando.',
  'Este ha salido torcido. Enderezamos y seguimos.'
];

/* ── Listas planas y su contrato de tamaño ──────────────────────────────── */
CB.datos.MENSAJES.CATEGORIAS_ACIERTO = ['A', 'B', 'C', 'D'];
CB.datos.MENSAJES.CATEGORIAS_ANIMO   = ['P1', 'P2'];

CB.datos.MENSAJES.acierto = []
  .concat(CB.datos.MENSAJES.acierto_A)
  .concat(CB.datos.MENSAJES.acierto_B)
  .concat(CB.datos.MENSAJES.acierto_C)
  .concat(CB.datos.MENSAJES.acierto_D);

CB.datos.MENSAJES.animo = []
  .concat(CB.datos.MENSAJES.animo_P1)
  .concat(CB.datos.MENSAJES.animo_P2);

/* ── GRITOS: lo que va escrito en la cinta ──────────────────────────────────
   La cinta cruza la pantalla en menos de dos segundos, así que solo cabe —y
   solo se lee— algo muy corto. El mensaje entero sigue apareciendo QUIETO en
   #item-mensaje, que es donde vive la carga educativa: «Has pedido prestada una
   decena y la has deshecho bien» no se puede leer de refilón, y esa frase es la
   única parte del mensaje que de verdad enseña algo.

   Por eso el grito es material NUEVO y no un trozo recortado del mensaje. Las
   84 plantillas de acierto y las 48 de ánimo no se tocan.

   SOLO HAY GRITOS DE ACIERTO. Los hubo de ánimo, y se retiran: detrás de un
   fallo no se celebra, se acompaña, y el vehículo del ánimo pasó a ser Rocarr
   asintiendo (js/30-ui.js). Sin cartel no hay dónde escribir un grito, y un dato
   que no se pinta en ningún sitio acaba pareciendo que sí. Se les aplican las
   mismas dos listas negras que a todo lo demás (casos-mensajes.js, M5 y M6). */
CB.datos.MENSAJES.GRITOS = {
  acierto: [
    '¡Toma!', '¡Eso es!', '¡Ahí está!', '¡Bloque!', '¡Clavado!', '¡Se abre!',
    '¡Justo!', '¡Muy bien!', '¡Cae!', '¡Exacto!', '¡Buen pico!', '¡Adelante!',
    '¡Limpio!', '¡Así se cava!', '¡Perfecto!', '¡Sigue!', '¡Correcto!',
    '¡Bien visto!', '¡Vamos!', '¡Otra veta!', '¡Chispa!', '¡Buen golpe!',
    '¡Ya está!', '¡Cristal!'
  ]
};

/* Listas negras: viven aquí para que casos-mensajes.js y casos-motes las
   compartan sin duplicar el criterio en dos sitios. */
CB.datos.MENSAJES.NEGRA_PERSONA = [
  'listo', 'lista', 'inteligente', 'genio', 'crack', 'campeon', 'campeona',
  'maquina', 'fenomeno', 'eres el mejor', 'que listo', 'que lista', 'listillo',
  'sabio', 'sabia'
];

CB.datos.MENSAJES.NEGRA_REGISTRO = [
  'wow', 'cool', 'top', 'super', 'campeoncito', 'mi nino', 'cielo', 'carino',
  'chaval', 'sos ', 'tenes ', 'podes ', 'ahorita', 'platicar'
];

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

/* ============================================================================
   recomendaciones.js — Los 24 códigos de error → frase llana → actividad de aula
   ----------------------------------------------------------------------------
   CU8 (PLAN §6.3) comprueba que este fichero y CB.ERRORES tienen EXACTAMENTE el
   mismo conjunto de claves, y que ninguna entrada tiene la frase o la actividad
   vacías. Si alguien añade un código en 18-distractores.js y se olvida de la
   recomendación, la suite se pone en rojo.

   La frase va dirigida a una persona adulta sin formación matemática. Nada de
   «error de transferencia en el algoritmo aditivo»: «se olvida de llevar».
   La actividad es SIEMPRE manipulativa y de 10 minutos, porque el remedio de un
   error de procedimiento no está en más pantalla.
   ========================================================================== */

var CB = CB || {};
CB.datos = CB.datos || {};

CB.datos.RECOMENDACIONES = {

  /* ── Sumas ───────────────────────────────────────────────────────────── */
  'E-S-LLEV-OLV': {
    frase: 'Suma bien las columnas pero se olvida de llevar la decena.',
    actividad: 'Con 20 palillos y gomas: que sume 8 + 5 juntando palillos y que ATE un ' +
               'manojo de 10 en cuanto lo consiga. El manojo atado es la llevada. Repetidlo ' +
               'con 7 + 6 y 9 + 4 antes de volver a escribir nada en papel.'
  },
  'E-S-LLEV-ESCR': {
    frase: 'Escribe en la casilla el resultado entero de la columna, en vez de dejar ' +
           'solo las unidades y llevar el resto.',
    actividad: 'Cajita de las unidades: dibujad dos cajas, una para unidades y otra para ' +
               'decenas, y decid en voz alta «en la caja de las unidades solo cabe hasta 9». ' +
               'Que reparta 13 fichas entre las dos cajas él mismo.'
  },
  'E-S-LLEV-DOBLE': {
    frase: 'Lleva la decena, pero luego la vuelve a sumar otra vez.',
    actividad: 'Que escriba la llevada arriba con lápiz y la TACHE en cuanto la use. ' +
               'Ver la marca tachada le da la señal de que esa decena ya está gastada.'
  },
  'E-S-COL': {
    frase: 'Descoloca las columnas: suma una decena con una unidad.',
    actividad: 'Papel cuadriculado, una cifra por cuadro. Diez minutos copiando cinco ' +
               'sumas en la cuadrícula SIN resolverlas: el objetivo del día es solo colocar.'
  },

  /* ── Restas ──────────────────────────────────────────────────────────── */
  'E-R-INV': {
    frase: 'Cuando el número de arriba es menor, resta al revés: quita el pequeño del ' +
           'grande dentro de la columna. Es el error de resta más común de 2.º.',
    actividad: 'Con 3 monedas de 1 € en la mano, pedidle 8 €. Que diga en voz alta ' +
               '«no puedo, necesito cambio». Cambiad un billete de 10 por 10 monedas y ' +
               'que lo vuelva a intentar. La palabra clave es CAMBIO, no «al revés».'
  },
  'E-R-PREST-OLV': {
    frase: 'Pide prestada la decena, pero se olvida de quitarle 1 a la columna de al lado.',
    actividad: 'Regletas o palillos: que DESATE físicamente el manojo de 10 y compruebe ' +
               'que ahora hay un manojo menos. Contad juntos los manojos antes y después.'
  },
  'E-R-PREST-DOBLE': {
    frase: 'Al pedir prestado, resta dos veces de la columna de al lado.',
    actividad: 'Que tache la decena prestada mientras lo dice en alto: «me llevo una, ' +
               'ya está gastada». Cinco restas con llevada, tachando siempre.'
  },
  'E-R-CERO': {
    frase: 'Se atasca cuando hay un cero en el número de arriba y hay que pedir prestado ' +
           'a través de él.',
    actividad: 'Esto es contenido de 3.º: el juego no se lo va a volver a proponer. Si ' +
               'aun así queréis trabajarlo, usad monedas: 1 billete de 100 se cambia por ' +
               '10 de 10, y uno de esos por 10 monedas de 1.'
  },
  'E-R-SUMA': {
    frase: 'Suma cuando había que restar. Suele ser lectura rápida del signo.',
    actividad: 'Tarjetas con + y − boca abajo. Saca una, y que diga en voz alta si el ' +
               'resultado va a ser MAYOR o MENOR que el número de partida, antes de operar.'
  },

  /* ── Numeración ──────────────────────────────────────────────────────── */
  'E-N-POS': {
    frase: 'Confunde el valor de las cifras según su lugar: lee 34 donde pone 43.',
    actividad: 'Tabla de valor posicional en una hoja, con dos columnas: D y U. Dictadle ' +
               'seis números y que coloque una ficha en cada columna antes de escribirlos.'
  },
  'E-N-CERO': {
    frase: 'Se salta el cero de en medio: escribe 37 donde pone 307.',
    actividad: 'Con tres cajas (C, D, U) y garbanzos: pedidle 307 y que vea que la caja ' +
               'de las decenas se queda VACÍA, y que el cero es justo lo que dice eso.'
  },
  'E-N-SERIE': {
    frase: 'Se pierde en las series: se salta un paso o cambia el salto a mitad de camino.',
    actividad: 'Contad juntos de 2 en 2 y de 5 en 5 dando palmadas, subiendo y BAJANDO. ' +
               'Bajar es lo que casi nunca se practica y es donde aparece el fallo.'
  },
  'E-N-APROX': {
    frase: 'Aproxima a la decena equivocada, casi siempre hacia abajo.',
    actividad: 'Recta numérica dibujada de 0 a 100 en una tira de papel. Marcad el número ' +
               'y preguntadle a qué decena está MÁS CERCA. Es una pregunta de distancia, no de cálculo.'
  },
  'E-N-ORDEN': {
    frase: 'Ordena los números al revés, o se lía cuando le piden «de mayor a menor».',
    actividad: 'Cartas del 1 al 20 boca arriba en la mesa. Que las ordene primero de menor ' +
               'a mayor y luego al revés, diciendo en alto en qué sentido va.'
  },

  /* ── Multiplicación ──────────────────────────────────────────────────── */
  'E-M-SUMA': {
    frase: 'Suma los dos factores en vez de multiplicar: para 3 × 4 responde 7.',
    actividad: 'Hueveras o cajas de 4: que ponga 3 huevos en cada una de las 4 y cuente. ' +
               'Multiplicar es «cuántos hay en total si repito ese grupo».'
  },
  'E-M-VECINO': {
    frase: 'Da el resultado de al lado en la tabla: para 5 × 6 responde 35.',
    actividad: 'Cantad la tabla del 5 completa, subiendo, y luego preguntadle solo el ' +
               'que falla. Suele ser recuperación de memoria, no falta de comprensión.'
  },
  'E-M-CERO': {
    frase: 'Se atasca con el 0 y con el 1: para 4 × 0 responde 4.',
    actividad: 'Cuatro platos vacíos sobre la mesa: «hay cuatro platos con cero galletas ' +
               'cada uno, ¿cuántas galletas hay?». Que lo diga mirando los platos.'
  },

  /* ── Problemas ───────────────────────────────────────────────────────── */
  'E-P-PALCLAVE': {
    frase: 'Se guía por la palabra suelta y no por lo que cuenta el problema: ve «más» y ' +
           'suma, aunque el problema pidiera restar.',
    actividad: 'Leedle el problema y que lo DIBUJE con dos barras, una por cada personaje, ' +
               'antes de escribir ninguna cuenta. La barra enseña quién tiene más sin ' +
               'depender de la palabra.'
  },
  'E-P-TODOSDATOS': {
    frase: 'Usa todos los números que aparecen, incluido el que no hacía falta.',
    actividad: 'Subrayad juntos SOLO los datos que sirven, y tachad el que sobra, antes de ' +
               'operar. Preguntadle: «¿este número para qué te sirve?».'
  },
  'E-P-CALCULO': {
    frase: 'Entiende el problema y elige bien la operación: falla solo al calcular. Esto ' +
           'NO es un problema de comprensión lectora.',
    actividad: 'No trabajéis el problema: trabajad la cuenta suelta. Cinco minutos de la ' +
               'operación concreta que falla, sin enunciado, es lo que hace falta.'
  },

  /* ── Dinero ──────────────────────────────────────────────────────────── */
  'E-E-VALOR': {
    frase: 'Cuenta las piezas en vez de su valor: tres monedas de 2 € le parecen 3 €.',
    actividad: 'Monedas de verdad sobre la mesa. Que haga montones por valor y cuente ' +
               '«de dos en dos» los de 2 €. Comparad un montón de tres monedas de 1 € con ' +
               'otro de dos monedas de 2 €.'
  },
  'E-E-CAMBIO': {
    frase: 'Al calcular el cambio suma en vez de restar.',
    actividad: 'Jugad a la tienda de verdad, con monedas. Que sea él quien cobre y ' +
               'devuelva el cambio contando hacia arriba desde el precio.'
  },

  /* ── Vocabulario ─────────────────────────────────────────────────────── */
  'E-V-TERMINO': {
    frase: 'Confunde dos términos del vocabulario matemático.',
    actividad: 'Tarjetas con la palabra por una cara y un dibujo por la otra. Cinco minutos ' +
               'de emparejar. El vocabulario se aprende por uso, no por definición.'
  },
  'E-V-SINONIMO': {
    frase: 'Reconoce la palabra suelta pero no la reconoce dentro de una frase.',
    actividad: 'Que sea él quien INVENTE un problema usando la palabra. Inventar el ' +
               'problema exige entender la palabra mucho más que resolverlo.'
  }
};

/* ============================================================================
   00-nucleo.js — CB.util y CB.LEGAL
   ----------------------------------------------------------------------------
   REGLAS DE FRONTERA (PLAN §14.4), verificadas por pruebas/auditar.sh:
     · Cero DOM: ni document., ni window., ni localStorage, ni navigator.
     · Cero Math.random: todo aleatorio pasa por el rng inyectado.
     · Cero toISOString.
     · Cero literales de clave 'cubomatica.…' (solo en 01-almacen.js).

   EXENCIÓN DECLARADA (docs/decisiones.md): CB.util.ahora() necesita el reloj
   monotónico de la plataforma. Se implementa con `typeof performance` en lugar
   de `window.performance` precisamente para no romper el grep de frontera.
   ES2017 estricto: sin ?., sin ??, sin campos privados.
   ========================================================================== */

var CB = CB || {};
CB.util = CB.util || {};

/* ── Aleatoriedad reproducible ─────────────────────────────────────────── */

/* mulberry32: generador de 32 bits, rápido y con semilla. Devuelve [0,1). */
CB.util.mulberry32 = function (semilla) {
  var s = semilla >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    var t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/* hash32: cadena → entero de 32 bits sin signo. Para derivar semillas. */
CB.util.hash32 = function (texto) {
  var h = 2166136261 >>> 0, i;
  texto = String(texto);
  for (i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
};

/* Entero en [min, max], ambos incluidos. */
CB.util.ent = function (rng, min, max) {
  if (max < min) { var t = min; min = max; max = t; }
  return min + Math.floor(rng() * (max - min + 1));
};

CB.util.elegir = function (rng, lista) {
  if (!lista || !lista.length) return null;
  return lista[Math.floor(rng() * lista.length)];
};

/* Fisher-Yates. Devuelve una copia; no muta la entrada. */
CB.util.barajar = function (lista, rng) {
  var a = lista.slice(), i, j, t;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(rng() * (i + 1));
    t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};

CB.util.rango = function (n) {
  var a = [], i;
  for (i = 0; i < n; i++) a.push(i);
  return a;
};

/* ── BolsaBarajada ──────────────────────────────────────────────────────────
   Reparte índices 0..n-1 sin repetir hasta agotar la bolsa. Es el mecanismo que
   sostiene el requisito 4 del usuario (mensajes de enhorabuena nunca repetidos)
   y el equilibrio de género por CONSTRUCCIÓN de §9.7.

   Se persiste como array de índices restantes, exactamente como el esquema del
   perfil (§15.3): "bolsaA": [12, 3].
   ────────────────────────────────────────────────────────────────────────── */
CB.util.BolsaBarajada = function (n, rng, restantes) {
  this.n = n | 0;
  this.rng = rng || CB.util.mulberry32(0x9E3779B9);
  this.restantes = Array.isArray(restantes) ? restantes.slice() : [];
};

CB.util.BolsaBarajada.prototype.rellenar = function () {
  this.restantes = CB.util.barajar(CB.util.rango(this.n), this.rng);
};

/* Saca un índice. `evitar` es una lista de índices vistos hace poco: si el
   candidato está ahí, se prueba con el siguiente de la bolsa. Si TODOS los
   restantes están en `evitar`, se devuelve uno igualmente: nunca se bloquea. */
CB.util.BolsaBarajada.prototype.sacar = function (evitar) {
  if (this.n <= 0) return -1;
  if (!this.restantes.length) this.rellenar();
  evitar = evitar || [];

  var i;
  for (i = this.restantes.length - 1; i >= 0; i--) {
    if (evitar.indexOf(this.restantes[i]) === -1) {
      return this.restantes.splice(i, 1)[0];
    }
  }
  return this.restantes.pop();
};

CB.util.BolsaBarajada.prototype.estado = function () {
  return this.restantes.slice();
};

/* ── Matemáticas de apoyo ──────────────────────────────────────────────── */

CB.util.clamp = function (v, a, b) {
  if (!isFinite(v)) return a;
  return v < a ? a : (v > b ? b : v);
};

CB.util.mediana = function (arr) {
  if (!arr || !arr.length) return 0;
  var a = arr.slice().sort(function (x, y) { return x - y; });
  var m = Math.floor(a.length / 2);
  return (a.length % 2) ? a[m] : Math.round((a[m - 1] + a[m]) / 2);
};

CB.util.media = function (arr) {
  if (!arr || !arr.length) return 0;
  var s = 0, i;
  for (i = 0; i < arr.length; i++) s += arr[i];
  return s / arr.length;
};

/* Media incremental. Con n === 0 devuelve el propio valor: sin esta guarda,
   rtMedioMs de un subtipo con intentos:0 producía NaN y contaminaba el perfil
   para siempre (§11.2). */
CB.util.mediaIncremental = function (medio, n, valor) {
  if (!n || n <= 0 || !isFinite(medio)) return valor;
  return (medio * n + valor) / (n + 1);
};

/* ── Tiempo y fechas ────────────────────────────────────────────────────────
   toISOString está PROHIBIDO en todo el proyecto: new Date().toISOString() da el
   DÍA ANTERIOR para cualquier partida jugada después de las 22:00 en horario
   peninsular de verano (UTC+2). La racha se rompería sola y el repaso vencería
   dos veces (§15.5).
   ────────────────────────────────────────────────────────────────────────── */

CB.util.hoyISO = function (d) {
  d = d || new Date();
  var m = d.getMonth() + 1, x = d.getDate();
  return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (x < 10 ? '0' : '') + x;
};

/* Compara a MEDIODÍA LOCAL: inmune al cambio de hora. */
CB.util.diasEntre = function (a, b) {
  if (!a || !b) return 0;
  var A = new Date(a + 'T12:00:00');
  var B = new Date(b + 'T12:00:00');
  var d = Math.round((B - A) / 86400000);
  return isFinite(d) ? d : 0;
};

CB.util.sumarDias = function (iso, dias) {
  var d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + dias);
  return CB.util.hoyISO(d);
};

CB.util.esISO = function (s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
};

/* Reloj MONOTÓNICO. Un ajuste de reloj (NTP, cambio de hora, el niño tocando la
   fecha del iPad) daría un rt negativo o de horas. Ver exención en §14.4. */
CB.util.ahora = function () {
  if (typeof performance !== 'undefined' && performance && performance.now) {
    return performance.now();
  }
  return Date.now();
};

/* Todo rt del proyecto pasa por aquí. Nunca negativo, nunca de horas. */
CB.util.rt = function (t0) {
  return CB.util.clamp(Math.round(CB.util.ahora() - t0), 0, 600000);
};

/* ── Texto ──────────────────────────────────────────────────────────────── */

/* Minúsculas, sin tildes y sin signos. Base del test M3 de unicidad de mensajes. */
CB.util.normalizar = function (t) {
  return String(t)
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a').replace(/[éèëê]/g, 'e').replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o').replace(/[úùüû]/g, 'u').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

CB.util.palabras = function (t) {
  var s = String(t).trim();
  return s ? s.split(/\s+/) : [];
};

/* Corte de línea por ancho en caracteres. La interfaz y el validador de lectura
   fácil DEBEN usar este mismo algoritmo, o el invariante 7 mide una cosa y la
   pantalla muestra otra (§9.3). */
CB.util.cortarLineas = function (texto, ancho) {
  var palabras = CB.util.palabras(texto), lineas = [], actual = '', i;
  for (i = 0; i < palabras.length; i++) {
    var cand = actual ? (actual + ' ' + palabras[i]) : palabras[i];
    if (cand.length > ancho && actual) {
      lineas.push(actual);
      actual = palabras[i];
    } else {
      actual = cand;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
};

CB.util.mayus1 = function (t) {
  t = String(t);
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/* ── EventoSimple: pub/sub mínimo, sin dependencias ─────────────────────── */
CB.util.EventoSimple = function () { this.oyentes = {}; };
CB.util.EventoSimple.prototype.escuchar = function (nombre, fn) {
  (this.oyentes[nombre] = this.oyentes[nombre] || []).push(fn);
};
CB.util.EventoSimple.prototype.emitir = function (nombre, dato) {
  var l = this.oyentes[nombre], i;
  if (!l) return;
  for (i = 0; i < l.length; i++) {
    try { l[i](dato); } catch (e) { /* un oyente roto no tumba la partida */ }
  }
};

CB.bus = new CB.util.EventoSimple();

/* ── CB.LEGAL ───────────────────────────────────────────────────────────────
   ÚNICA constante del proyecto donde vive el aviso de no afiliación. README.md
   y la pantalla de Créditos lo INSERTAN desde aquí. Este fichero está excluido
   del grep de marca precisamente por esto (§21.1).
   ────────────────────────────────────────────────────────────────────────── */
/* ── Versión ────────────────────────────────────────────────────────────────
   FUENTE ÚNICA, y desde 1.7.0 tiene CINCO réplicas: README.md, CHANGELOG.md,
   LEEME.txt, package.json y dist/sw.js. Las cuatro primeras las escribe una
   persona y `pruebas/auditar.mjs` comprueba que no se separen; la quinta la
   inyecta gulp leyendo esta misma línea, así que no puede desviarse.
   Un número de versión repetido a mano en cinco sitios está mal en cuatro en
   cuanto alguien se despista una vez.

   Versionado semántico: la segunda cifra sube cuando entra algo nuevo —contenido
   o capacidad— sin romper nada; la tercera, cuando solo se corrigen fallos. La primera sube el día que cambie
   el formato del perfil guardado, porque eso obliga a una migración en
   `01-almacen.js` y es lo único que puede romperle el progreso a un niño. */
CB.VERSION = '1.9.0';

CB.LEGAL = {
  AVISO: 'Cubomática es una obra original e independiente. No está afiliada, ' +
         'patrocinada ni respaldada por Mojang Studios ni por Microsoft. La estética ' +
         'de mundo de cubos es un género artístico y no es apropiable; todos los ' +
         'nombres, criaturas, texturas y sonidos de este juego son de creación propia ' +
         'y están generados por código.',

  NORMA: 'Real Decreto 157/2022, de 1 de marzo, por el que se establecen la ordenación ' +
         'y las enseñanzas mínimas de la Educación Primaria (BOE núm. 52, de 2 de marzo ' +
         'de 2022; referencia BOE-A-2022-3296).',

  ALCANCE: 'Cubomática trabaja el bloque A (Sentido numérico) y, de forma transversal, ' +
           'el bloque F (Sentido socioafectivo) de los saberes básicos del primer ciclo ' +
           'de Matemáticas del Real Decreto 157/2022. NO trabaja los bloques B (sentido ' +
           'de la medida), C (sentido espacial), D (sentido algebraico) ni E (sentido ' +
           'estocástico): esos saberes se trabajan en el aula y este juego no los sustituye.',

  SECUENCIACION: 'El Real Decreto fija los saberes por CICLO (1.º y 2.º juntos), no por ' +
                 'curso ni por trimestre. La distribución por curso y trimestre de este ' +
                 'juego es una secuenciación propia del proyecto. Debe confirmarse con la ' +
                 'programación didáctica del centro.',

  MULTIPLICACION: 'Las tablas del 2, del 5 y del 10 se practican como iniciación en el ' +
                  'tercer trimestre, tal como es habitual en el aula de 2.º. El Real ' +
                  'Decreto 157/2022 sitúa la construcción de las tablas de multiplicar en ' +
                  'el segundo ciclo, por lo que el resto de tablas está desactivado salvo ' +
                  'que la persona adulta lo active.',

  PRIVACIDAD: 'Cubomática no recoge datos personales. No hay servidor, ni red, ni cuentas, ' +
              'ni analítica. Todo el progreso vive en este navegador y no sale de aquí.',

  LIMITACION: 'Sin servidor, el progreso vive solo en este navegador. Si cambias de ' +
              'ordenador o limpias el navegador, se pierde. Haz una copia al terminar ' +
              'cada trimestre.'
};

/* ============================================================================
   01-almacen.js — Persistencia. ÚNICO fichero con literales 'cubomatica.…'
   ----------------------------------------------------------------------------
   Adaptador de plataforma declarado: puede tocar localStorage (§14.4).

   LA VERSIÓN VA EN EL OBJETO, NUNCA EN LA CLAVE (PLAN §15.1). El plan v1 la
   ponía en las dos: en cuanto migrar() dejase el objeto en version:2, o se
   seguía escribiendo bajo `.v1.` (y la clave mentía) o se escribía en `.v2.` y
   quedaban HUÉRFANOS el índice y ultimoPerfil → pérdida silenciosa de todo el
   progreso en la primera migración. Justo el caso que el «test obligatorio»
   decía cubrir y que el esquema hacía imposible aprobar.

   REGLA AÑADIDA (§15.4): este fichero NO puede referenciar ningún CB.* salvo
   CB.util. El plan v1 llamaba desde aquí a CB.plantillas.esqueletoVacio(), que
   no existe, desde un script que carga 13 ficheros ANTES que el generador de
   problemas → TypeError, y el perfil no cargaba NUNCA.
   ========================================================================== */

var CB = CB || {};
CB.almacen = CB.almacen || {};

CB.almacen.VERSION_ESQUEMA = 2;
CB.almacen.PREFIJO = 'cubomatica.';
CB.almacen.memoria = {};          // respaldo si localStorage está bloqueado
CB.almacen.sinDisco = false;
CB.almacen.incidenciasNoFinito = 0;

CB.almacen.claveDePerfil = function (id) { return 'cubomatica.perfil.' + id; };
CB.almacen.CLAVE_INDICE = 'cubomatica.perfiles.indice';
CB.almacen.CLAVE_ULTIMO = 'cubomatica.ultimoPerfil';
CB.almacen.CLAVE_AJUSTES = 'cubomatica.ajustes';
CB.almacen.CLAVE_ESQUEMA = 'cubomatica.esquema';

CB.almacen.TOPES = {
  domestico: { respuestas: 800, historial: 60, perfiles: 4 },
  aula:      { respuestas: 150, historial: 20, perfiles: 30 }
};

/* ── Acceso crudo, con respaldo en memoria ──────────────────────────────── */
function ls() {
  try {
    if (typeof localStorage === 'undefined') return null;
    localStorage.setItem('cubomatica.__t', '1');
    localStorage.removeItem('cubomatica.__t');
    return localStorage;
  } catch (e) { return null; }
}

CB.almacen.disponible = function () { return ls() !== null; };

/* sanear: NaN e Infinity → 0. Sin esto, JSON.stringify convierte NaN en null y
   a partir de ahí toda la aritmética del perfil da NaN para siempre (§11.2). */
CB.almacen.sanear = function (obj) {
  var vistos = [];
  function limpia(v) {
    if (typeof v === 'number') {
      if (!isFinite(v)) { CB.almacen.incidenciasNoFinito++; return 0; }
      return v;
    }
    if (v && typeof v === 'object') {
      if (vistos.indexOf(v) !== -1) return null;
      vistos.push(v);
      if (Object.prototype.toString.call(v) === '[object Array]') {
        return v.map(limpia);
      }
      var out = {}, k;
      for (k in v) {
        if (!Object.prototype.hasOwnProperty.call(v, k)) continue;
        if (k.charAt(0) === '_') continue;        // campos internos, no se guardan
        out[k] = limpia(v[k]);
      }
      return out;
    }
    return v;
  }
  return limpia(obj);
};

CB.almacen.leerCrudo = function (clave) {
  var s = ls();
  var txt = s ? s.getItem(clave) : null;
  if (txt == null && CB.almacen.memoria[clave] != null) return CB.almacen.memoria[clave];
  if (txt == null) return null;
  try { return JSON.parse(txt); } catch (e) { return null; }
};

/* Escritura en DOS FASES: el niño cierra la tapa del portátil a mitad de
   guardado y el JSON queda truncado. Se escribe en .tmp, se verifica con
   JSON.parse, y solo entonces se pisa la clave buena. */
CB.almacen.escribir = function (clave, obj) {
  var limpio = CB.almacen.sanear(obj);
  var s;
  try { s = JSON.stringify(limpio); } catch (e) { return false; }

  var store = ls();
  if (!store) {
    CB.almacen.memoria[clave] = limpio;
    CB.almacen.sinDisco = true;
    return false;
  }
  try {
    store.setItem(clave + '.tmp', s);
    JSON.parse(store.getItem(clave + '.tmp'));      // verificación real
    store.setItem(clave, s);
    store.removeItem(clave + '.tmp');
    return true;
  } catch (e) {
    if (e && e.name === 'QuotaExceededError') {
      /* Poda agresiva y UN reintento. Con el respaldo en memoria a secas, en
         modo aula la clase entera dejaría de guardar sin que nadie se entere
         hasta el día siguiente (§15.6). */
      if (obj && obj.id) CB.almacen.podar(obj, { agresiva: true });
      try {
        store.setItem(clave, JSON.stringify(CB.almacen.sanear(obj)));
        return true;
      } catch (e2) { /* cae al respaldo */ }
    }
    CB.almacen.memoria[clave] = limpio;
    CB.almacen.sinDisco = true;
    return false;
  }
};

CB.almacen.borrar = function (clave) {
  var s = ls();
  if (s) { try { s.removeItem(clave); s.removeItem(clave + '.tmp'); } catch (e) { } }
  delete CB.almacen.memoria[clave];
};

/* ── Ajustes del APARATO (solo lo físico) ───────────────────────────────── */
CB.almacen.ajustesDispositivo = function () {
  var a = CB.almacen.leerCrudo(CB.almacen.CLAVE_AJUSTES);
  if (!a) {
    a = { volumen: 0.7, silencio: false, modoAula: false, modoProyeccion: false,
          nivelMusica: 2 };
  }
  /* nivelMusica es índice en CB.musica.NIVELES; llegó después que el resto, así
     que un perfil guardado antes NO lo tiene y hay que darle el valor por
     defecto aquí, no en quien lo lee. */
  if (a.nivelMusica == null) a.nivelMusica = 2;
  return a;
};
CB.almacen.guardarAjustesDispositivo = function (a) {
  return CB.almacen.escribir(CB.almacen.CLAVE_AJUSTES, a);
};

/* ── Índice de perfiles ─────────────────────────────────────────────────── */
CB.almacen.indice = function () {
  var i = CB.almacen.leerCrudo(CB.almacen.CLAVE_INDICE);
  return (i && i.length != null) ? i : [];
};
CB.almacen.guardarIndice = function (idx) {
  return CB.almacen.escribir(CB.almacen.CLAVE_INDICE, idx);
};
CB.almacen.ultimoPerfil = function () {
  return CB.almacen.leerCrudo(CB.almacen.CLAVE_ULTIMO);
};
CB.almacen.fijarUltimoPerfil = function (id) {
  return CB.almacen.escribir(CB.almacen.CLAVE_ULTIMO, id);
};

/* ── Esqueleto de problemas: array literal LOCAL, sin dependencias ──────── */
CB.almacen.ESQUELETO_PROBLEMAS = function () {
  var subtipos = ['CAMBIO_1', 'CAMBIO_2', 'CAMBIO_3', 'CAMBIO_4', 'CAMBIO_5', 'CAMBIO_6',
                  'COMBINACION_1', 'COMBINACION_2',
                  'COMPARACION_1', 'COMPARACION_2', 'COMPARACION_3', 'COMPARACION_4',
                  'COMPARACION_5', 'COMPARACION_6',
                  'IGUALACION_1', 'IGUALACION_2', 'IGUALACION_3', 'IGUALACION_4',
                  'IGUALACION_5', 'IGUALACION_6'];
  var o = {}, i;
  for (i = 0; i < subtipos.length; i++) {
    o[subtipos[i]] = { intentos: 0, aciertos: 0, rtMedioMs: 0 };
  }
  return o;
};

/* ── Perfil nuevo ───────────────────────────────────────────────────────── */
CB.almacen.perfilNuevo = function (id, mote, avatar, hoyISO, ajustesPrevios) {
  return {
    version: CB.almacen.VERSION_ESQUEMA,
    id: id, mote: mote, avatar: avatar, colorBloque: '#5AA02C',
    creadoISO: hoyISO,
    trimestreDeducido: 1,
    calibrado: false,
    grupo: null,
    ajustes: ajustesPrevios || {
      modoTiempo: 'conCalma',        // por defecto PERMANENTE (§11.3)
      voz: true, letraGrande: false, altoContraste: false, reduceMotion: 'auto',
      tablas69: false, centimos: false, restasDobleLlevada: false, division: false,
      limiteSesionMin: 20, noPuntuarVelocidadProblemas: false
    },
    gemas: 0, puntosTotales: 0,
    mejorPuntuacion: { normal: 0, conCalma: 0, sinPrisa: 0 },
    vidasReserva: 0,
    componentesVistos: [],
    destrezas: {}, niveles: {},
    problemas: CB.almacen.ESQUELETO_PROBLEMAS(),
    errores: {}, items: {},
    mundos: { M1: { desbloqueado: true, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false },
              M2: { desbloqueado: false, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false },
              M3: { desbloqueado: false, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false },
              M4: { desbloqueado: false, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false } },
    logros: {}, cromos: [], glosario: [],
    mensajes: { acierto: { bolsaA: [], bolsaB: [], bolsaC: [], bolsaD: [], ultimos12: [] },
                animo: { bolsa1: [], bolsa2: [], ultimos10: [] } },
    bolsasProblemas: { genero: [], nombreF: [], nombreM: [], rol: [], objeto: [] },
    diario: { diasJugados: [], racha: 0, mejorRacha: 0, segundosHoy: 0,
              ultimoDia: null, tiempoPantallaPorDia: {} },
    animo: [],
    partidaEnCurso: null,
    historial: [],
    respuestas: []
  };
};

/* Conserva lo que se pueda de un perfil roto. Nunca se devuelve al niño a cero
   sin motivo: sus gemas, sus logros y sus cromos son suyos. */
CB.almacen.perfilNuevoDesdeRestos = function (roto) {
  var hoy = CB.util.hoyISO();
  var p = CB.almacen.perfilNuevo(
    (roto && roto.id) || ('p-' + CB.util.hash32(hoy).toString(16)),
    (roto && roto.mote) || 'Topo Cavador',
    (roto && roto.avatar) || 0, hoy, null
  );
  if (roto) {
    if (isFinite(roto.gemas)) p.gemas = roto.gemas;
    if (isFinite(roto.puntosTotales)) p.puntosTotales = roto.puntosTotales;
    if (roto.logros) p.logros = roto.logros;
    if (roto.cromos) p.cromos = roto.cromos;
    if (roto.glosario) p.glosario = roto.glosario;
  }
  p.recuperado = true;
  return p;
};

/* ── Migración: cada paso AÑADE campos. JAMÁS BORRA ─────────────────────── */
CB.almacen.migrar = function (perfil) {
  try {
    if (!perfil.version) perfil.version = 1;

    if (perfil.version < 2) {
      perfil.problemas = perfil.problemas || CB.almacen.ESQUELETO_PROBLEMAS();

      var ds = perfil.destrezas || (perfil.destrezas = {});
      Object.keys(ds).forEach(function (k) {
        if (ds[k].estabilidadDias == null) ds[k].estabilidadDias = 1;
        if (ds[k].estado == null) ds[k].estado = 'nuevo';
        if (ds[k].rtMuestras == null) ds[k].rtMuestras = [];
        if (ds[k].ventana10 == null) ds[k].ventana10 = [];
      });

      if (!perfil.niveles) perfil.niveles = {};
      if (!perfil.mundos) {
        perfil.mundos = { M1: { desbloqueado: true, gemasNivel: 0, nivelesCompletados: 0, jefe: false, jefeSinFallos: false } };
      }
      if (!perfil.mensajes) {
        perfil.mensajes = { acierto: { bolsaA: [], bolsaB: [], bolsaC: [], bolsaD: [], ultimos12: [] },
                            animo: { bolsa1: [], bolsa2: [], ultimos10: [] } };
      }
      if (!perfil.bolsasProblemas) {
        perfil.bolsasProblemas = { genero: [], nombreF: [], nombreM: [], rol: [], objeto: [] };
      }
      if (perfil.vidasReserva == null) perfil.vidasReserva = 0;
      if (!perfil.componentesVistos) perfil.componentesVistos = [];
      if (!perfil.animo) perfil.animo = [];
      if (perfil.partidaEnCurso === undefined) perfil.partidaEnCurso = null;

      if (perfil.historial) {
        perfil.historial.forEach(function (h) {
          if (h.precision != null) {
            h.precision1er = h.precision;
            h.precisionTotal = h.preguntas ? (h.aciertos / h.preguntas) : 0;
          }
        });
      }
      if (typeof perfil.mejorPuntuacion === 'number') {
        perfil.mejorPuntuacion = { normal: perfil.mejorPuntuacion, conCalma: 0, sinPrisa: 0 };
      }
      if (!perfil.mejorPuntuacion) {
        perfil.mejorPuntuacion = { normal: 0, conCalma: 0, sinPrisa: 0 };
      }
      perfil.version = 2;
    }

    CB.almacen.recortarFechasFuturas(perfil);
    return perfil;
  } catch (e) {
    return CB.almacen.perfilNuevoDesdeRestos(perfil);
  }
};

/* Reloj del dispositivo mal puesto: se recorta a hoy en lugar de romper la
   racha o producir días negativos (§15.5). */
CB.almacen.recortarFechasFuturas = function (perfil) {
  var hoy = CB.util.hoyISO(), k, d;
  function recorta(iso) {
    if (!CB.util.esISO(iso)) return iso;
    return (CB.util.diasEntre(iso, hoy) < 0) ? hoy : iso;
  }
  if (perfil.creadoISO) perfil.creadoISO = recorta(perfil.creadoISO);
  if (perfil.destrezas) {
    for (k in perfil.destrezas) {
      if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
      d = perfil.destrezas[k];
      if (d.ultimoRepasoISO) d.ultimoRepasoISO = recorta(d.ultimoRepasoISO);
    }
  }
  if (perfil.diario && perfil.diario.diasJugados) {
    perfil.diario.diasJugados = perfil.diario.diasJugados
      .map(recorta)
      .filter(function (v, i, a) { return a.indexOf(v) === i; })
      .sort();
  }
  return perfil;
};

/* ── Leer y guardar perfil ──────────────────────────────────────────────── */
/* ¿Hay algo escrito en esa clave, aunque no se pueda leer? Distinguir «no hay
   perfil» de «hay un perfil y está roto» es lo único que separa un mensaje útil
   de un botón que no hace nada. */
CB.almacen.existeCrudo = function (clave) {
  var s = ls();
  if (s) {
    try { if (s.getItem(clave) != null) return true; } catch (e) { }
  }
  return CB.almacen.memoria[clave] != null;
};

CB.almacen.leerPerfil = function (id) {
  var clave = CB.almacen.claveDePerfil(id);
  var p = CB.almacen.leerCrudo(clave);

  /* PERFIL ILEGIBLE. leerCrudo() se traga el fallo de JSON.parse y devuelve
     null, igual que cuando el perfil no existe. Para el índice o los ajustes
     eso está bien: se cae a los valores por defecto y no pasa nada. Para un
     perfil es lo contrario de lo que hay que hacer, porque quien lo llama
     —CB.perfiles.activar()— hace «if (!p) return;» y se va sin decir nada.

     El resultado era que pulsar JUGAR sobre un perfil dañado no hacía NADA:
     ni mensaje, ni error, ni pantalla nueva. Un niño toca el botón, no pasa
     nada, lo toca otra vez, sigue sin pasar nada. Y el adulto no tiene forma
     de enterarse de que hay progreso guardado que ya no se puede leer.

     Con el centinela de error, activar() sí tiene algo que contar. */
  if (!p && CB.almacen.existeCrudo(clave)) {
    return { error: 'perfil-ilegible',
             mensaje: 'Los datos de este minero están dañados y no se pueden ' +
                      'leer. Puedes crear un minero nuevo; el progreso anterior ' +
                      'no se puede recuperar.' };
  }
  if (!p) return null;
  /* Perfil más nuevo que el juego: mejor no cargar que corromper. */
  if (p.version > CB.almacen.VERSION_ESQUEMA) {
    return { error: 'perfil-mas-nuevo',
             mensaje: 'Este perfil viene de una versión más nueva del juego. ' +
                      'Actualiza el juego o usa otra copia.' };
  }
  return CB.almacen.migrar(p);
};

CB.almacen.guardarPerfil = function (perfil) {
  if (!perfil || !perfil.id) return false;
  var ok = CB.almacen.escribir(CB.almacen.claveDePerfil(perfil.id), perfil);
  var idx = CB.almacen.indice(), i, hallado = false;
  for (i = 0; i < idx.length; i++) {
    if (idx[i].id === perfil.id) {
      idx[i].mote = perfil.mote; idx[i].avatar = perfil.avatar;
      idx[i].ultimoISO = CB.util.hoyISO();
      hallado = true;
    }
  }
  if (!hallado) {
    idx.push({ id: perfil.id, mote: perfil.mote, avatar: perfil.avatar,
               ultimoISO: CB.util.hoyISO() });
  }
  CB.almacen.guardarIndice(idx);
  return ok;
};

CB.almacen.borrarPerfil = function (id) {
  CB.almacen.borrar(CB.almacen.claveDePerfil(id));
  var idx = CB.almacen.indice().filter(function (e) { return e.id !== id; });
  CB.almacen.guardarIndice(idx);
  if (CB.almacen.ultimoPerfil() === id) {
    CB.almacen.fijarUltimoPerfil(idx.length ? idx[0].id : null);
  }
};

/* ── Poda ───────────────────────────────────────────────────────────────── */
CB.almacen.podar = function (perfil, opciones) {
  opciones = opciones || {};
  var aula = CB.almacen.ajustesDispositivo().modoAula;
  var t = aula ? CB.almacen.TOPES.aula : CB.almacen.TOPES.domestico;
  var factor = opciones.agresiva ? 0.5 : 1;
  var k, d;

  if (perfil.respuestas && perfil.respuestas.length > t.respuestas * factor) {
    perfil.respuestas = perfil.respuestas.slice(-Math.floor(t.respuestas * factor));
  }
  if (perfil.historial && perfil.historial.length > t.historial * factor) {
    perfil.historial = perfil.historial.slice(-Math.floor(t.historial * factor));
  }
  if (perfil.diario) {
    if (perfil.diario.diasJugados && perfil.diario.diasJugados.length > 120) {
      perfil.diario.diasJugados = perfil.diario.diasJugados.slice(-120);
    }
    if (perfil.diario.tiempoPantallaPorDia) {
      var dias = Object.keys(perfil.diario.tiempoPantallaPorDia).sort();
      while (dias.length > 120) delete perfil.diario.tiempoPantallaPorDia[dias.shift()];
    }
  }
  if (perfil.errores) {
    for (k in perfil.errores) {
      if (!Object.prototype.hasOwnProperty.call(perfil.errores, k)) continue;
      if (perfil.errores[k].ejemplos && perfil.errores[k].ejemplos.length > 3) {
        perfil.errores[k].ejemplos.length = 3;
      }
    }
  }
  if (perfil.destrezas) {
    for (k in perfil.destrezas) {
      if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
      d = perfil.destrezas[k];
      if (d.rtMuestras && d.rtMuestras.length > 12) d.rtMuestras = d.rtMuestras.slice(-12);
      if (d.ejemplosFallados && d.ejemplosFallados.length > 3) d.ejemplosFallados.length = 3;
    }
  }
  if (perfil.items) {
    var claves = Object.keys(perfil.items);
    while (claves.length > 400) delete perfil.items[claves.shift()];
  }
  return perfil;
};

/* ── Exportar e importar CON VALIDACIÓN ─────────────────────────────────────
   Aceptar JSON arbitrario y volcarlo al DOM es la ÚNICA superficie de ataque
   que existe en este proyecto, y en v1 estaba abierta: un fichero manipulado
   podía traer `mote` con HTML, `colorBloque` con una cadena que se inyecta en un
   style, arrays de 500.000 entradas o version:99. */
CB.almacen.CAMPOS_PERMITIDOS = [
  'version', 'id', 'mote', 'avatar', 'colorBloque', 'creadoISO', 'trimestreDeducido',
  'calibrado', 'grupo', 'ajustes', 'gemas', 'puntosTotales', 'mejorPuntuacion',
  'vidasReserva', 'componentesVistos', 'destrezas', 'niveles', 'problemas',
  'errores', 'items', 'mundos', 'logros', 'cromos', 'glosario', 'mensajes',
  'bolsasProblemas', 'diario', 'animo', 'partidaEnCurso', 'historial', 'respuestas'
];

CB.almacen.exportar = function (perfil) {
  return JSON.stringify(CB.almacen.sanear(perfil), null, 1);
};

CB.almacen.validarImportado = function (crudo, motesValidos) {
  if (!crudo || typeof crudo !== 'object') return { ok: false, motivo: 'formato' };
  if (isFinite(crudo.version) && crudo.version > CB.almacen.VERSION_ESQUEMA) {
    return { ok: false, motivo: 'version' };
  }

  var limpio = {}, i, c;
  for (i = 0; i < CB.almacen.CAMPOS_PERMITIDOS.length; i++) {
    c = CB.almacen.CAMPOS_PERMITIDOS[i];
    if (crudo[c] !== undefined) limpio[c] = crudo[c];
  }

  /* mote: de la lista cerrada de 120, o uno por defecto. Nunca texto libre. */
  if (!motesValidos || motesValidos.indexOf(limpio.mote) === -1) {
    limpio.mote = (motesValidos && motesValidos.length) ? motesValidos[0] : 'Topo Cavador';
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(String(limpio.colorBloque))) limpio.colorBloque = '#5AA02C';
  limpio.avatar = CB.util.clamp(parseInt(limpio.avatar, 10) || 0, 0, 15);
  if (!limpio.id || !/^[A-Za-z0-9\-]{1,32}$/.test(String(limpio.id))) {
    limpio.id = 'p-' + CB.util.hash32(String(limpio.mote) + limpio.avatar).toString(16);
  }

  if (limpio.respuestas && limpio.respuestas.length > 800) limpio.respuestas = limpio.respuestas.slice(-800);
  if (limpio.historial && limpio.historial.length > 60) limpio.historial = limpio.historial.slice(-60);
  if (limpio.diario && limpio.diario.diasJugados && limpio.diario.diasJugados.length > 120) {
    limpio.diario.diasJugados = limpio.diario.diasJugados.slice(-120);
  }
  if (limpio.cromos && limpio.cromos.length > 60) limpio.cromos.length = 60;
  if (limpio.glosario && limpio.glosario.length > 48) limpio.glosario.length = 48;

  return { ok: true, perfil: CB.almacen.migrar(limpio) };
};

CB.almacen.avisarSinDisco = function () { CB.almacen.sinDisco = true; };

/* Tamaño total ocupado, para el aviso del panel del adulto. */
CB.almacen.bytesUsados = function () {
  var s = ls(), total = 0, i, k;
  if (!s) return 0;
  for (i = 0; i < s.length; i++) {
    k = s.key(i);
    if (k && k.indexOf(CB.almacen.PREFIJO) === 0) {
      total += k.length + (s.getItem(k) || '').length;
    }
  }
  return total * 2;                 // UTF-16
};

/* ============================================================================
   02-texturas.js — 8 texturas de 16×16 generadas por canvas. CERO .png
   ----------------------------------------------------------------------------
   Adaptador de plataforma declarado (§14.4): necesita document.createElement.
   La lista v1 de exentos se olvidaba de este fichero y de 03-sprites.js, con lo
   que el test de frontera habría fallado el primer día contra código correcto.

   Se ejecuta UNA SOLA VEZ al arrancar. El resultado se vuelca a las variables
   CSS --tex-* como data: URI, de modo que el CSS las usa sin saber de dónde
   vienen y sin una sola petición de red.

   El ruido usa PRNG con SEMILLA PROPIA: la misma textura en todos los
   dispositivos y en todas las sesiones. Sin semilla fija, cada arranque
   repintaría un mundo distinto y el niño lo notaría.
   ========================================================================== */

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
  var nombre = receta[0], semilla = receta[1];
  var base = receta[2], claro = receta[3], oscuro = receta[4], patron = receta[5];
  var L = CB.texturas.LADO;

  var lienzo = document.createElement('canvas');
  lienzo.width = L; lienzo.height = L;
  var g = lienzo.getContext('2d');
  if (!g) return null;

  var rng = CB.util.mulberry32(semilla);
  var x, y, r;

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
  var raiz = document.documentElement, i, receta, url;
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

/* ============================================================================
   04-audio.js — 12 efectos sintetizados con Web Audio. CERO ficheros de sonido
   ----------------------------------------------------------------------------
   Adaptador de plataforma declarado (§14.4).

   El contexto de audio NO se crea al cargar la página: los navegadores lo
   suspenden hasta que hay un gesto del usuario, y un AudioContext suspendido que
   nadie reanuda deja el juego mudo sin decir por qué. Se crea en el primer toque
   real (iniciar() se llama desde el botón JUGAR).

   REGLA DE §10.4: el sonido NUNCA es el único canal. Con el volumen a cero, toda
   la información sigue llegando por color + forma + movimiento + texto.
   ========================================================================== */

var CB = CB || {};
CB.audio = CB.audio || {};

CB.audio.ctx = null;
CB.audio.maestro = null;
CB.audio.silenciado = false;
CB.audio.vol = 0.7;

CB.audio.NOTAS = {
  do4: 261.63, re4: 293.66, mi4: 329.63, fa4: 349.23, sol4: 392.00,
  la4: 440.00, si4: 493.88, do5: 523.25, re5: 587.33, mi5: 659.25,
  fa5: 698.46, sol5: 783.99, la5: 880.00, do6: 1046.50
};

CB.audio.iniciar = function () {
  if (CB.audio.ctx) {
    if (CB.audio.ctx.state === 'suspended') { try { CB.audio.ctx.resume(); } catch (e) { } }
    return CB.audio.ctx;
  }
  var AC = (typeof AudioContext !== 'undefined') ? AudioContext
         : (typeof webkitAudioContext !== 'undefined') ? webkitAudioContext : null;
  if (!AC) return null;
  try {
    CB.audio.ctx = new AC();
    CB.audio.maestro = CB.audio.ctx.createGain();
    CB.audio.maestro.gain.value = CB.audio.silenciado ? 0 : CB.audio.vol;
    CB.audio.maestro.connect(CB.audio.ctx.destination);
  } catch (e) { CB.audio.ctx = null; }
  return CB.audio.ctx;
};

CB.audio.silenciar = function (b) {
  CB.audio.silenciado = !!b;
  if (CB.audio.maestro) CB.audio.maestro.gain.value = b ? 0 : CB.audio.vol;
  /* La música va por elementos <audio> aparte (07-musica.js explica por qué),
     así que el silencio del aparato tiene que alcanzarla a mano. Silenciar el
     juego y seguir oyendo la música sería el fallo más visible posible. */
  if (CB.musica && CB.musica.aplicarVolumenes) CB.musica.aplicarVolumenes();
  return CB.audio.silenciado;
};

CB.audio.volumen = function (v) {
  CB.audio.vol = CB.util.clamp(v, 0, 1);
  if (CB.audio.maestro && !CB.audio.silenciado) CB.audio.maestro.gain.value = CB.audio.vol;
  return CB.audio.vol;
};

/* Una nota chiptune: onda cuadrada con envolvente corta. */
CB.audio.nota = function (frec, cuando, duracion, tipo, ganancia) {
  var c = CB.audio.ctx;
  if (!c || CB.audio.silenciado) return;
  try {
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = tipo || 'square';
    osc.frequency.setValueAtTime(frec, c.currentTime + cuando);
    var pico = (ganancia == null ? 0.22 : ganancia);
    g.gain.setValueAtTime(0.0001, c.currentTime + cuando);
    g.gain.exponentialRampToValueAtTime(pico, c.currentTime + cuando + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + cuando + duracion);
    osc.connect(g); g.connect(CB.audio.maestro);
    osc.start(c.currentTime + cuando);
    osc.stop(c.currentTime + cuando + duracion + 0.02);
  } catch (e) { /* un fallo de audio jamás detiene la partida */ }
};

/* Ruido filtrado: piedra, madera, partículas. */
CB.audio.ruido = function (cuando, duracion, frecFiltro, ganancia) {
  var c = CB.audio.ctx;
  if (!c || CB.audio.silenciado) return;
  try {
    var n = Math.floor(c.sampleRate * duracion);
    var buf = c.createBuffer(1, Math.max(1, n), c.sampleRate);
    var datos = buf.getChannelData(0);
    var rng = CB.util.mulberry32(0x5EED + Math.floor(frecFiltro));
    var i;
    for (i = 0; i < n; i++) datos[i] = (rng() * 2 - 1) * (1 - i / n);

    var src = c.createBufferSource(); src.buffer = buf;
    var filtro = c.createBiquadFilter();
    filtro.type = 'lowpass'; filtro.frequency.value = frecFiltro || 900;
    var g = c.createGain(); g.gain.value = (ganancia == null ? 0.2 : ganancia);
    src.connect(filtro); filtro.connect(g); g.connect(CB.audio.maestro);
    src.start(c.currentTime + cuando);
  } catch (e) { }
};

/* ── Los 12 efectos ─────────────────────────────────────────────────────── */
CB.audio.EFECTOS = {

  acierto: function () {
    CB.audio.nota(CB.audio.NOTAS.do5, 0, 0.09);
    CB.audio.nota(CB.audio.NOTAS.mi5, 0.07, 0.09);
    CB.audio.nota(CB.audio.NOTAS.sol5, 0.14, 0.14);
  },

  /* Fallo: DOS notas descendentes SUAVES. Ni bocina, ni pitido de error, ni
     nada que suene a castigo (§3.3). */
  fallo: function () {
    CB.audio.nota(CB.audio.NOTAS.sol4, 0, 0.11, 'triangle', 0.16);
    CB.audio.nota(CB.audio.NOTAS.mi4, 0.10, 0.14, 'triangle', 0.16);
  },

  /* La luz que se apaga: Sol4 → Mi4, 180 ms. Sin estallido, sin sacudida. */
  luzApagada: function () {
    CB.audio.nota(CB.audio.NOTAS.sol4, 0, 0.09, 'sine', 0.18);
    CB.audio.nota(CB.audio.NOTAS.mi4, 0.09, 0.09, 'sine', 0.18);
  },

  /* La luz extra: Do5 → Mi5 → Sol5 ascendentes. */
  luzExtra: function () {
    CB.audio.nota(CB.audio.NOTAS.do5, 0, 0.13, 'square', 0.24);
    CB.audio.nota(CB.audio.NOTAS.mi5, 0.14, 0.13, 'square', 0.24);
    CB.audio.nota(CB.audio.NOTAS.sol5, 0.28, 0.30, 'square', 0.26);
  },

  picar: function () { CB.audio.ruido(0, 0.10, 1200, 0.18); },

  /* «Toc» de madera del toque prematuro durante los 800 ms de construcción. */
  toc: function () { CB.audio.ruido(0, 0.05, 380, 0.22); },

  gema: function () {
    CB.audio.nota(CB.audio.NOTAS.la5, 0, 0.07, 'sine', 0.18);
    CB.audio.nota(CB.audio.NOTAS.do6, 0.06, 0.10, 'sine', 0.18);
  },

  subirNivel: function () {
    CB.audio.nota(CB.audio.NOTAS.do5, 0, 0.10);
    CB.audio.nota(CB.audio.NOTAS.fa5, 0.10, 0.10);
    CB.audio.nota(CB.audio.NOTAS.la5, 0.20, 0.10);
    CB.audio.nota(CB.audio.NOTAS.do6, 0.30, 0.26);
  },

  /* Rocarr: grave, lento, de piedra. */
  rocarr: function () {
    CB.audio.ruido(0, 0.16, 260, 0.20);
    CB.audio.nota(CB.audio.NOTAS.do4, 0.04, 0.20, 'triangle', 0.14);
  },

  /* Gluglú: agudo, rápido, de gota. Deliberadamente opuesto a Rocarr: un niño
     debe poder distinguirlos con los ojos cerrados (criterio de HECHO de F5). */
  gluglu: function () {
    CB.audio.nota(CB.audio.NOTAS.la5, 0, 0.05, 'sine', 0.16);
    CB.audio.nota(CB.audio.NOTAS.re5, 0.05, 0.09, 'sine', 0.16);
  },

  /* «Hurry up!»: tres notas ascendentes rápidas. Deliberadamente NO es una
     alarma. Una alarma a un niño de 7 años que está pensando le borra lo que
     tenía en la cabeza; esto tiene que sonar a que empieza algo, no a que se
     acaba algo. */
  prisa: function () {
    CB.audio.nota(CB.audio.NOTAS.sol4, 0,    0.07, 'square', 0.18);
    CB.audio.nota(CB.audio.NOTAS.si4,  0.07, 0.07, 'square', 0.18);
    CB.audio.nota(CB.audio.NOTAS.re5,  0.14, 0.07, 'square', 0.20);
    CB.audio.nota(CB.audio.NOTAS.sol5, 0.21, 0.16, 'square', 0.22);
  },

  cofre: function () {
    CB.audio.nota(CB.audio.NOTAS.mi5, 0, 0.08);
    CB.audio.nota(CB.audio.NOTAS.sol5, 0.08, 0.08);
    CB.audio.nota(CB.audio.NOTAS.do6, 0.16, 0.22);
    CB.audio.ruido(0.16, 0.20, 2400, 0.10);
  }
};

CB.audio.sfx = function (nombre) {
  if (!CB.audio.ctx) return false;
  var f = CB.audio.EFECTOS[nombre];
  if (!f) return false;
  try { f(); } catch (e) { }
  return true;
};

/* Al ocultarse la pestaña se suspende: si no, el audio sigue sonando de fondo
   en una pestaña que el niño ya no mira. */
CB.audio.conectarVisibilidad = function () {
  document.addEventListener('visibilitychange', function () {
    if (!CB.audio.ctx) return;
    try {
      if (document.hidden) CB.audio.ctx.suspend();
      else CB.audio.ctx.resume();
    } catch (e) { }
  });
};

/* ============================================================================
   05-voz.js — Lectura en voz alta y lectura guiada
   ----------------------------------------------------------------------------
   Adaptador de plataforma declarado (§14.4).

   SIN VOZ ES-* EL BOTÓN NO DESAPARECE, HACE LECTURA GUIADA (PLAN §16.4): en un
   Chromebook escolar sin paquete de voz en español, un botón de altavoz que no
   hace nada es peor que no tenerlo. La lectura guiada resalta palabra a palabra
   a 1 s/palabra, que es exactamente el ritmo de un lector de 2.º, y funciona en
   cualquier dispositivo porque no depende de nada externo.

   El cronómetro de puntuación NO CORRE durante la lectura guiada (§11.4).
   ========================================================================== */

var CB = CB || {};
CB.voz = CB.voz || {};

CB.voz.MS_POR_PALABRA = 1000;
CB.voz.activa = true;
CB.voz.temporizador = null;
CB.voz.vozES = null;

CB.voz.disponible = function () {
  if (typeof speechSynthesis === 'undefined') return false;
  try {
    var vs = speechSynthesis.getVoices();
    if (!vs || !vs.length) return false;
    var i;
    for (i = 0; i < vs.length; i++) {
      if (vs[i].lang && vs[i].lang.toLowerCase().indexOf('es') === 0) {
        CB.voz.vozES = vs[i];
        return true;
      }
    }
    return false;
  } catch (e) { return false; }
};

/* La música se agacha mientras habla la voz. Un niño de 7 años que aún no lee
   con fluidez tendría que separar la voz de la música, que es exactamente el
   esfuerzo que la voz venía a ahorrarle. */
CB.voz.agacharMusica = function (b) {
  if (CB.musica && CB.musica.agachar) CB.musica.agachar(b);
};

CB.voz.cancelar = function () {
  if (CB.voz.temporizador) {
    clearTimeout(CB.voz.temporizador);
    CB.voz.temporizador = null;
  }
  try { if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); } catch (e) { }
  CB.voz.agacharMusica(false);
};

CB.voz.leer = function (texto, alTerminar) {
  if (!CB.voz.activa || !texto) { if (alTerminar) alTerminar(); return false; }
  CB.voz.cancelar();

  if (!CB.voz.disponible()) {
    if (alTerminar) alTerminar();
    return false;
  }
  try {
    var u = new SpeechSynthesisUtterance(String(texto));
    u.lang = 'es-ES';
    if (CB.voz.vozES) u.voice = CB.voz.vozES;
    u.rate = 0.85;                  // más lento que el habla adulta normal
    u.pitch = 1.05;
    u.onend = function () {
      CB.voz.agacharMusica(false);
      if (alTerminar) alTerminar();
    };
    u.onerror = function () {
      CB.voz.agacharMusica(false);
      if (alTerminar) alTerminar();
    };
    CB.voz.agacharMusica(true);
    speechSynthesis.speak(u);
    return true;
  } catch (e) {
    CB.voz.agacharMusica(false);
    if (alTerminar) alTerminar();
    return false;
  }
};

/**
 * Lectura guiada: resalta palabra a palabra a 1 s/palabra. Es el respaldo
 * cuando no hay voz española, y también un ajuste que el adulto puede forzar
 * para un lector muy incipiente.
 * @param alResaltar function(indicePalabra, palabra)
 */
CB.voz.lecturaGuiada = function (texto, alResaltar, alTerminar) {
  CB.voz.cancelar();
  var palabras = CB.util.palabras(texto);
  var i = 0;

  function paso() {
    if (i >= palabras.length) {
      CB.voz.agacharMusica(false);
      if (alResaltar) alResaltar(-1, null);
      if (alTerminar) alTerminar();
      return;
    }
    if (alResaltar) alResaltar(i, palabras[i]);
    i++;
    CB.voz.temporizador = setTimeout(paso, CB.voz.MS_POR_PALABRA);
  }
  CB.voz.agacharMusica(true);
  paso();
  return palabras.length * CB.voz.MS_POR_PALABRA;
};

/* El botón de altavoz: intenta voz real y, si no la hay, guía la lectura.
   Nunca no hace nada. */
CB.voz.leerOGuiar = function (texto, alResaltar, alTerminar) {
  if (CB.voz.disponible()) {
    return { modo: 'voz', ms: CB.voz.leer(texto, alTerminar) ? 0 : 0 };
  }
  return { modo: 'guiada', ms: CB.voz.lecturaGuiada(texto, alResaltar, alTerminar) };
};

/* Algunas plataformas cargan las voces de forma asíncrona. */
CB.voz.precargar = function () {
  if (typeof speechSynthesis === 'undefined') return;
  try {
    CB.voz.disponible();
    speechSynthesis.onvoiceschanged = function () { CB.voz.disponible(); };
  } catch (e) { }
};

/* ============================================================================
   06-a11y.js — Accesibilidad: región viva, foco y mapa de teclado
   ----------------------------------------------------------------------------
   Adaptador de plataforma declarado (§14.4).

   CRITERIO DE HECHO DE F8: se completa una partida entera SOLO CON TECLADO y con
   el sonido silenciado, en cada uno de los 7 formatos de respuesta.

   El manejador de teclado comprueba `CB.partida.bloqueado` COMO PRIMERA LÍNEA:
   durante los 800 ms de construcción del ítem, el teclado tiene que estar tan
   bloqueado como los botones, o el bloqueo anti-azar sería puramente decorativo
   para quien juega con teclado (§3.5).
   ========================================================================== */

var CB = CB || {};
CB.a11y = CB.a11y || {};

CB.a11y.ultimoAnuncio = '';

CB.a11y.anunciar = function (texto) {
  var r = document.getElementById('region-viva');
  if (!r || !texto) return;
  /* Si el texto es idéntico al anterior, el lector de pantalla no lo repite.
     Se alterna un espacio final para forzar el anuncio. */
  var t = (texto === CB.a11y.ultimoAnuncio) ? (texto + ' ') : texto;
  CB.a11y.ultimoAnuncio = t;
  r.textContent = t;
};

/* ── La SEGUNDA región viva, y por qué hacen falta dos ──────────────────────
   Había una sola, `polite`, y por ella pasaba todo: «has ganado 3 gemas», «muy
   bien», «se ha apagado una luz» y «te quedan 5 segundos». Una región `polite`
   se anuncia cuando el lector termina lo que estaba diciendo, y respetando el
   orden de llegada. Con la cuenta atrás corriendo, eso significa que el aviso
   urgente se lee DESPUÉS de la felicitación — es decir, tarde.

   `role="alert"` interrumpe. Se usa solo para lo que caduca: el reloj y el aviso
   de prisa. Todo lo demás sigue en la región educada, porque un lector que
   interrumpe cada tres segundos es inutilizable. */
CB.a11y.ultimaUrgencia = '';

CB.a11y.urgente = function (texto) {
  var r = document.getElementById('region-urgente');
  if (!r || !texto) return;
  var t = (texto === CB.a11y.ultimaUrgencia) ? (texto + ' ') : texto;
  CB.a11y.ultimaUrgencia = t;
  r.textContent = t;
};

CB.a11y.enfocar = function (el) {
  if (!el) return;
  try { el.focus({ preventScroll: false }); } catch (e) { try { el.focus(); } catch (e2) { } }
};

/* Primer elemento enfocable de una pantalla. */
CB.a11y.primerEnfocable = function (contenedor) {
  if (!contenedor) return null;
  return contenedor.querySelector(
    'button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled])'
  );
};

/* ── Mapa de teclado (PLAN §16.5) ──────────────────────────────────────────
   0-9      escribe cifra (tecladoBloques) / elige opción 1-4 (opciones4)
   Enter    confirma
   Retroceso borra la última cifra
   Espacio  activa el elemento con foco
   Flechas  mueven el foco por la rejilla
   L        leer en voz alta        P  pista
   Escape   pausa (en partida) o volver
   ────────────────────────────────────────────────────────────────────────── */
CB.a11y.MAPA = {
  leer: ['l', 'L'],
  pista: ['p', 'P'],
  confirmar: ['Enter'],
  borrar: ['Backspace', 'Delete']
};

CB.a11y.conectarTeclado = function () {
  document.addEventListener('keydown', function (ev) {
    /* ← PRIMERA LÍNEA. El bloqueo de 800 ms vale también para el teclado. */
    if (CB.partida && CB.partida.bloqueado) {
      if (ev.key !== 'Tab' && ev.key !== 'Escape') {
        ev.preventDefault();
        if (CB.audio) CB.audio.sfx('toc');
      }
      return;
    }

    if (CB.pantallas.actual !== 'p-partida' &&
        CB.pantallas.actual !== 'p-calibracion' &&
        CB.pantallas.actual !== 'p-jefe') return;

    var k = ev.key;

    if (CB.a11y.MAPA.leer.indexOf(k) !== -1) {
      ev.preventDefault();
      if (CB.partida && CB.partida.accionLeer) CB.partida.accionLeer();
      return;
    }
    if (CB.a11y.MAPA.pista.indexOf(k) !== -1) {
      ev.preventDefault();
      if (CB.partida && CB.partida.accionPista) CB.partida.accionPista();
      return;
    }

    if (CB.componentes && CB.componentes.tecla) {
      if (CB.componentes.tecla(k, ev)) ev.preventDefault();
    }
  });
};

/* Movimiento del foco por una rejilla con las flechas. */
CB.a11y.conectarFlechas = function (contenedor, columnas) {
  if (!contenedor) return;
  contenedor.addEventListener('keydown', function (ev) {
    var teclas = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];
    if (teclas.indexOf(ev.key) === -1) return;
    var botones = [].slice.call(contenedor.querySelectorAll('button:not([disabled])'));
    var i = botones.indexOf(document.activeElement);
    if (i === -1) return;
    ev.preventDefault();
    var d = 0;
    if (ev.key === 'ArrowRight') d = 1;
    if (ev.key === 'ArrowLeft') d = -1;
    if (ev.key === 'ArrowDown') d = columnas;
    if (ev.key === 'ArrowUp') d = -columnas;
    var j = CB.util.clamp(i + d, 0, botones.length - 1);
    CB.a11y.enfocar(botones[j]);
  });
};

/* ── Ajustes de accesibilidad sobre la raíz del documento ───────────────── */
CB.a11y.aplicarAjustes = function (ajustes, ajustesAparato) {
  var raiz = document.documentElement;
  ajustes = ajustes || {};
  ajustesAparato = ajustesAparato || {};

  raiz.classList.toggle('letra-grande', !!ajustes.letraGrande);
  raiz.classList.toggle('alto-contraste', !!ajustes.altoContraste);
  raiz.classList.toggle('modo-proyeccion', !!ajustesAparato.modoProyeccion);

  var rm = ajustes.reduceMotion;
  var prefiereReducir = false;
  try {
    prefiereReducir = (typeof matchMedia !== 'undefined') &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { }
  raiz.classList.toggle('sin-movimiento', rm === 'si' || (rm !== 'no' && prefiereReducir));

  CB.voz.activa = ajustes.voz !== false;
};

/* Descripción textual del estado de las luces, para lector de pantalla.
   Nunca «has perdido una vida»: mismo vocabulario que ve el niño. */
CB.a11y.textoLuces = function (luces, tope) {
  if (luces <= 0) return 'Se han apagado todas las luces del casco.';
  return luces + (luces === 1 ? ' luz encendida' : ' luces encendidas') +
         ' de ' + tope + '.';
};

/* ============================================================================
   07-musica.js — Las 9 pistas de música de fondo
   ----------------------------------------------------------------------------
   Adaptador de plataforma (§14.4): toca el DOM y crea elementos <audio>. Está
   por tanto FUERA de la regla de frontera, igual que 04-audio.js y 05-voz.js.

   POR QUÉ <audio> Y NO WEB AUDIO. El resto del sonido del juego se sintetiza en
   04-audio.js y sale por el nodo maestro de Web Audio. La música NO puede ir por
   ahí: meter un fichero en un AudioContext exige decodeAudioData() sobre un
   ArrayBuffer, es decir fetch() o XMLHttpRequest, y sobre file:// eso está
   bloqueado por CORS. Un elemento <audio> con src relativo, en cambio, se carga
   como subrecurso del documento igual que una hoja de estilo, y funciona con
   doble clic. Ese es el criterio que manda: el juego se abre con doble clic.

   La consecuencia es que la música NO pasa por CB.audio.maestro y tiene su
   propio volumen. Se ha convertido en ventaja: la música lleva su nivel aparte
   del de los efectos, que es lo que uno quiere de todas formas.

   TRES COSAS QUE ESTE FICHERO ARREGLA Y QUE NO SON EVIDENTES:

   1. Las nueve pistas tienen 8,2 dB de diferencia de volumen entre la más
      fuerte y la más floja. Sin corregir, pasar del mapa a una partida en el
      Río hunde la música y volver la dispara. Cada pista lleva su ganancia.

   2. Cinco pistas acaban en silencio y dos empiezan con silencio. Con loop=true
      a secas, el bucle mete hasta tres segundos de nada. Cada pista declara
      dónde entra y dónde sale, y el bucle funde entre esos dos puntos.

   3. Los navegadores prohíben reproducir sonido antes de un gesto del usuario.
      Si play() se rechaza, no se pierde: queda pendiente y se reintenta en el
      primer toque o la primera tecla.
   ========================================================================== */

var CB = CB || {};
CB.musica = CB.musica || {};

/* ── Tabla CERRADA de pistas ────────────────────────────────────────────────
   gan   ganancia de normalización = 10^((−16 − volumenMedio) / 20), medido con
         ffmpeg -af volumedetect. Objetivo −16 dB.
   entra segundo en el que empieza la música de verdad (tras el silencio inicial)
   sale  segundo en el que empieza el silencio final, medido con silencedetect
         a −45 dB. El bucle vuelve a `entra` al llegar aquí.
   La equivalencia con el fichero original y el criterio de reparto están en
   docs/musica.md; los créditos, en audio/CREDITOS.txt.
   ────────────────────────────────────────────────────────────────────────── */
CB.musica.PISTAS = {
  temaPrincipal: { fichero: 'tema-principal.mp3', gan: 0.851, entra: 0,    sale: 137.0 },
  cantera:       { fichero: 'cantera.mp3',        gan: 0.631, entra: 0,    sale: 72.8 },
  calma:         { fichero: 'calma.mp3',          gan: 1.122, entra: 0,    sale: 239.9 },
  mundoPradera:  { fichero: 'mundo-pradera.mp3',  gan: 0.741, entra: 0,    sale: 108.4 },
  mundoBosque:   { fichero: 'mundo-bosque.mp3',   gan: 0.638, entra: 0.40, sale: 191.6 },
  mundoRio:      { fichero: 'mundo-rio.mp3',      gan: 1.603, entra: 0,    sale: 153.4 },
  mundoMina:     { fichero: 'mundo-mina.mp3',     gan: 1.084, entra: 0.45, sale: 240.0 },
  jefe:          { fichero: 'jefe.mp3',           gan: 1.189, entra: 0,    sale: 116.0 },
  victoria:      { fichero: 'victoria.mp3',       gan: 0.624, entra: 0,    sale: 105.5 }
};

/* Qué suena en cada una de las 17 pantallas.
   null  = silencio deliberado.
   La ausencia de una pantalla en esta tabla NO ocurre: están las 17, para que
   añadir una pantalla nueva y olvidarse de la música sea un fallo de prueba y
   no un silencio que nadie note. 'p-partida' se resuelve por el mundo. */
CB.musica.PANTALLAS = {
  'p-portada':     'temaPrincipal',
  'p-perfiles':    'temaPrincipal',
  'p-calibracion': 'temaPrincipal',
  'p-mapa':        'temaPrincipal',
  'p-ajustes':     'temaPrincipal',
  'p-creditos':    'temaPrincipal',
  'p-cantera':     'cantera',
  'p-casa':        'cantera',
  'p-glosario':    'cantera',
  'p-descanso':    'calma',
  'p-reparacion':  'calma',
  'p-informe':     'calma',
  'p-adulto':      'calma',
  'p-jefe':        'jefe',
  'p-fin':         'victoria',
  'p-partida':     '@mundo',
  'p-error':       null
};

/* Crédito de cada pista. La Pixabay Content License no exige atribución, pero
   el crédito le corresponde a quien compuso la música igual. Esta lista es la
   que pinta la pantalla de Créditos; audio/CREDITOS.txt dice lo mismo para
   quien abra la carpeta sin abrir el juego. */
CB.musica.CREDITOS = [
  { clave: 'temaPrincipal', autor: 'musicinmedia',        id: 381366, dura: '2:20' },
  { clave: 'victoria',      autor: 'musicinmedia',        id: 453214, dura: '1:49' },
  { clave: 'mundoPradera',  autor: 'Tunetank',            id: 347589, dura: '1:48' },
  { clave: 'mundoBosque',   autor: 'maksymmalko',         id: 385611, dura: '3:12' },
  { clave: 'mundoRio',      autor: 'viacheslavstarostin', id: 370830, dura: '2:35' },
  { clave: 'mundoMina',     autor: 'maksymmalko',         id: 358426, dura: '4:02' },
  { clave: 'jefe',          autor: 'u_z2x0wum3cm',        id: 394978, dura: '1:56' },
  { clave: 'calma',         autor: 'unrealmicikcz12',     id: 235545, dura: '4:00' },
  { clave: 'cantera',       autor: 'Tatamusic',           id: 423630, dura: '1:16' }
];

CB.musica.LICENCIA = 'Las nueve pistas de música son obra de sus autores y se ' +
  'usan bajo la Pixabay Content License, que permite el uso comercial y no ' +
  'comercial. Los ficheros no se han modificado: solo se ha cambiado su nombre.';

CB.musica.POR_BIOMA = {
  pradera: 'mundoPradera',
  bosque:  'mundoBosque',
  rio:     'mundoRio',
  mina:    'mundoMina'
};

/* Los cuatro niveles del ajuste. Son botones, no un deslizador: en esta
   interfaz no hay ni un solo control continuo y no va a haberlo ahora (§10.2).

   EL 0,62 DE «ALTA» NO ES UN GUSTO. El volumen que se le pide al elemento es
   nivel × ganancia de la pista, y hay ganancias por encima de 1 (mundo-rio
   venía 4 dB por debajo del resto y necesita 1,603). Si nivel × ganancia se
   pasa de 1, el recorte cae justo sobre la pista que necesitaba el empujón:
   la normalización se desactiva sola y vuelve el desnivel entre pistas que
   venía a quitar. 0,62 × 1,603 = 0,994. Lo comprueba casos-musica.js, así que
   una pista nueva más floja que mundo-rio suspende el test en vez de recortar
   en silencio. */
CB.musica.NIVELES = [
  { etiqueta: 'No',    valor: 0 },
  { etiqueta: 'Baja',  valor: 0.20 },
  { etiqueta: 'Media', valor: 0.40 },
  { etiqueta: 'Alta',  valor: 0.62 }
];
CB.musica.NIVEL_DEFECTO = 2;                       // «Media»

CB.musica.RAIZ = 'audio/';
CB.musica.MS_FUNDIDO = 900;                        // cruce entre pistas
CB.musica.S_BUCLE = 1.4;                           // fundido a cada lado del bucle
CB.musica.MS_TICK = 100;
CB.musica.AGACHADO = 0.30;                         // cuánto baja mientras habla la voz

CB.musica.base = CB.musica.NIVELES[CB.musica.NIVEL_DEFECTO].valor;
CB.musica.agachada = false;
CB.musica.pistaActual = null;
CB.musica.pendiente = null;                        // pista que espera un gesto
CB.musica.iniciada = false;
CB.musica.fallo = null;                            // motivo si la música no puede sonar

/* Dos canales: uno sale mientras el otro entra. Nunca hacen falta tres. */
CB.musica.canales = [
  { el: null, clave: null, f: 0, objetivo: 0 },
  { el: null, clave: null, f: 0, objetivo: 0 }
];
CB.musica._activo = 0;
CB.musica._reloj = null;

/* ── Volumen ────────────────────────────────────────────────────────────── */

/* El silencio del aparato manda sobre todo: si un adulto apaga el sonido,
   apaga TODO el sonido, no solo los efectos. */
CB.musica.volumenBase = function () {
  if (CB.audio && CB.audio.silenciado) return 0;
  return CB.musica.base;
};

CB.musica.volumenDe = function (canal) {
  var p = CB.musica.PISTAS[canal.clave];
  if (!p || !canal.el) return 0;
  var v = CB.musica.volumenBase() * p.gan * canal.f;
  if (CB.musica.agachada) v *= CB.musica.AGACHADO;
  v *= CB.musica.factorBucle(canal.el, p);
  return CB.util.clamp(v, 0, 1);
};

/* Fundido de entrada y de salida alrededor del punto de bucle. Devuelve 1 en
   todo el cuerpo de la pista y baja a 0 en los últimos S_BUCLE segundos y en
   los primeros S_BUCLE segundos tras dar la vuelta. */
CB.musica.factorBucle = function (el, p) {
  var fin = p.sale;
  if (el.duration && isFinite(el.duration) && fin > el.duration) fin = el.duration;
  var f = 1;
  var restante = fin - el.currentTime;
  var desde = el.currentTime - p.entra;
  if (restante < CB.musica.S_BUCLE) {
    f = Math.min(f, Math.max(0, restante / CB.musica.S_BUCLE));
  }
  if (desde < CB.musica.S_BUCLE) {
    f = Math.min(f, Math.max(0, desde / CB.musica.S_BUCLE));
  }
  return f;
};

/* ── iOS NO DEJA FIJAR EL VOLUMEN ───────────────────────────────────────────
   En iPhone y iPad, `HTMLMediaElement.volume` es de solo lectura: asignarle un
   valor no hace nada y leerlo devuelve siempre 1. Está documentado por Apple y
   el motivo es que el volumen lo manda el botón físico del aparato.

   Todo este módulo se apoyaba en `el.volume`, así que en un iPad —que es
   objetivo declarado del proyecto, el de 6.ª generación— pasaba esto:

     · silenciar el juego NO silenciaba la música. Justo el fallo que el
       comentario de CB.audio.silenciar() llama «el más visible posible».
     · «Baja», «Media» y «Alta» sonaban exactamente igual: a tope.
     · la normalización por pista no hacía nada, y el desnivel de 8 dB entre
       pistas volvía entero.
     · el fundido cruzado no fundía: durante 900 ms sonaban DOS pistas a la vez
       a todo volumen.
     · el agachado durante la voz tampoco funcionaba, de modo que un niño que
       aún no lee con fluidez tenía que separar la voz de la música a tope.

   Sin volumen, solo hay dos estados: sonando o parado. Es peor que un fundido,
   pero es infinitamente mejor que lo anterior, y el «No» del ajuste vuelve a
   silenciar de verdad. Se detecta una vez, escribiendo y releyendo.
   ────────────────────────────────────────────────────────────────────────── */
CB.musica.volumenAjustable = null;          // null = todavía no se sabe

CB.musica.detectarVolumen = function (el) {
  if (CB.musica.volumenAjustable !== null || !el) return CB.musica.volumenAjustable;
  try {
    el.volume = 0.123;
    CB.musica.volumenAjustable = Math.abs(el.volume - 0.123) < 0.01;
  } catch (e) {
    CB.musica.volumenAjustable = false;
  }
  return CB.musica.volumenAjustable;
};

CB.musica.aplicarVolumenes = function () {
  var i, c, debe;
  for (i = 0; i < 2; i++) {
    c = CB.musica.canales[i];
    if (!c.el) continue;

    if (CB.musica.volumenAjustable !== false) {
      try { c.el.volume = CB.musica.volumenDe(c); } catch (e) { }
      continue;
    }

    /* Aparato sin volumen ajustable. El fundido y el bucle se ignoran a
       propósito: si se tuvieran en cuenta, la música se pararía y arrancaría en
       cada vuelta del bucle, que suena mucho peor que una costura. */
    debe = c.objetivo > 0 && CB.musica.volumenBase() > 0 && !CB.musica.agachada;
    try {
      if (!debe) { if (!c.el.paused) c.el.pause(); }
      else if (c.el.paused && !document.hidden) { CB.musica.reproducir(c); }
    } catch (e) { }
  }
};

/* ── Motor ──────────────────────────────────────────────────────────────── */
CB.musica.arrancarReloj = function () {
  if (CB.musica._reloj) return;
  CB.musica._reloj = setInterval(CB.musica.tick, CB.musica.MS_TICK);
};

CB.musica.pararReloj = function () {
  if (!CB.musica._reloj) return;
  clearInterval(CB.musica._reloj);
  CB.musica._reloj = null;
};

CB.musica.tick = function () {
  var paso = CB.musica.MS_TICK / CB.musica.MS_FUNDIDO;
  var vivo = false;
  var i, c, p, fin;

  for (i = 0; i < 2; i++) {
    c = CB.musica.canales[i];
    if (!c.el) continue;

    /* Fundido hacia el objetivo */
    if (c.f < c.objetivo) c.f = Math.min(c.objetivo, c.f + paso);
    else if (c.f > c.objetivo) c.f = Math.max(c.objetivo, c.f - paso);

    /* Salto de bucle: se da cuando ya se ha llegado al final útil */
    p = CB.musica.PISTAS[c.clave];
    if (p && !c.el.paused) {
      fin = p.sale;
      if (c.el.duration && isFinite(c.el.duration) && fin > c.el.duration) fin = c.el.duration;
      if (c.el.currentTime >= fin - 0.05) {
        try { c.el.currentTime = p.entra; } catch (e) { }
      }
    }

    /* Un canal apagado del todo se suelta: si no, quedan hasta nueve ficheros
       de audio decodificados a la vez en una sesión larga. */
    if (c.f <= 0 && c.objetivo === 0) {
      CB.musica.soltar(c);
    } else if (!c.el.paused) {
      vivo = true;
    }
  }

  CB.musica.aplicarVolumenes();
  if (!vivo) CB.musica.pararReloj();
};

CB.musica.soltar = function (c) {
  if (!c.el) return;
  try { c.el.pause(); c.el.removeAttribute('src'); c.el.load(); } catch (e) { }
  c.el = null;
  c.clave = null;
  c.f = 0;
  c.objetivo = 0;
};

/* ── Elementos ──────────────────────────────────────────────────────────── */
CB.musica.crearElemento = function (clave) {
  var p = CB.musica.PISTAS[clave];
  if (!p) return null;
  var el;
  try {
    el = document.createElement('audio');
  } catch (e) { return null; }
  el.src = CB.musica.RAIZ + p.fichero;
  el.preload = 'auto';
  el.loop = false;                       // el bucle lo lleva CB.musica.tick
  CB.musica.detectarVolumen(el);         // una sola vez en toda la sesión
  el.volume = 0;
  /* Un fichero que no se puede leer no puede dejar el juego sin música para
     siempre: se anota y se sigue. */
  el.addEventListener('error', function () {
    CB.musica.fallo = 'no se pudo leer ' + p.fichero;
  });
  return el;
};

/* ── API pública ────────────────────────────────────────────────────────── */

/**
 * Pone una pista con fundido cruzado. Si ya suena esa misma, no hace nada:
 * volver al mapa desde los ajustes no debe reiniciar el tema principal.
 * @param clave clave de CB.musica.PISTAS, o null para silencio
 */
CB.musica.poner = function (clave) {
  if (clave && !CB.musica.PISTAS[clave]) return false;
  if (CB.musica.pistaActual === clave) return true;
  CB.musica.pistaActual = clave;

  var i;
  /* Todo lo que suene se va apagando */
  for (i = 0; i < 2; i++) CB.musica.canales[i].objetivo = 0;

  if (!clave || CB.musica.volumenBase() <= 0) {
    CB.musica.arrancarReloj();
    return true;
  }

  /* El canal libre (o el que ya estaba más apagado) recibe la nueva pista */
  var destino = CB.musica.canales[1 - CB.musica._activo];
  if (destino.el) CB.musica.soltar(destino);
  CB.musica._activo = 1 - CB.musica._activo;

  destino.el = CB.musica.crearElemento(clave);
  if (!destino.el) return false;
  destino.clave = clave;
  destino.f = 0;
  destino.objetivo = 1;
  try { destino.el.currentTime = CB.musica.PISTAS[clave].entra; } catch (e) { }

  CB.musica.reproducir(destino);
  CB.musica.arrancarReloj();
  return true;
};

/* play() devuelve una promesa que el navegador rechaza si aún no ha habido un
   gesto del usuario. No es un error: es la política de autoarranque. Se apunta
   la pista y se reintenta en el primer toque. */
CB.musica.reproducir = function (c) {
  if (!c.el) return;
  var pr;
  try { pr = c.el.play(); } catch (e) { CB.musica.pendiente = c.clave; return; }
  if (pr && pr.then) {
    pr.then(function () {
      CB.musica.pendiente = null;
    }, function () {
      CB.musica.pendiente = c.clave;
    });
  }
};

CB.musica.reintentar = function () {
  if (!CB.musica.pendiente) return;
  var i, c;
  for (i = 0; i < 2; i++) {
    c = CB.musica.canales[i];
    if (c.el && c.objetivo > 0 && c.el.paused) CB.musica.reproducir(c);
  }
  CB.musica.arrancarReloj();
};

/** Agacha la música mientras habla la voz. Sin esto, un niño que aún no lee con
    fluidez tiene que separar la voz de la música, que es justo el esfuerzo que
    la voz venía a ahorrarle. */
CB.musica.agachar = function (b) {
  CB.musica.agachada = !!b;
  CB.musica.aplicarVolumenes();
  return CB.musica.agachada;
};

/** @param i índice en CB.musica.NIVELES */
CB.musica.fijarNivel = function (i) {
  i = CB.util.clamp(Math.round(i), 0, CB.musica.NIVELES.length - 1);
  CB.musica.base = CB.musica.NIVELES[i].valor;
  if (CB.musica.base <= 0) {
    CB.musica.parar();
  } else if (!CB.musica.canales[CB.musica._activo].el && CB.musica.pistaActual) {
    /* Se había parado del todo: hay que volver a montar la pista de la pantalla */
    var clave = CB.musica.pistaActual;
    CB.musica.pistaActual = null;
    CB.musica.poner(clave);
  }
  CB.musica.aplicarVolumenes();
  return i;
};

CB.musica.nivelActual = function () {
  var i;
  for (i = 0; i < CB.musica.NIVELES.length; i++) {
    if (CB.musica.NIVELES[i].valor === CB.musica.base) return i;
  }
  return CB.musica.NIVEL_DEFECTO;
};

CB.musica.parar = function () {
  var i;
  for (i = 0; i < 2; i++) CB.musica.soltar(CB.musica.canales[i]);
  CB.musica.pararReloj();
};

/* ── Resolución pantalla → pista ────────────────────────────────────────── */
CB.musica.claveDePantalla = function (idPantalla) {
  var v = CB.musica.PANTALLAS[idPantalla];
  if (v !== '@mundo') return (v === undefined) ? null : v;

  /* En partida, la música la fija el bioma del mundo: cambiar de mundo se oye
     antes de leerse.

     SE LEE `estado.mundo`, QUE ES LO QUE ESCRIBE CB.partida.iniciar(). Antes
     leía `estado.mundoId`, que no existe en ninguna parte del proyecto: el
     estado guarda el OBJETO de mundo, no su id. `mundoId` es el nombre del
     parámetro de iniciar({mundoId:…}), y ahí se quedó.

     La consecuencia era muda y completa: undefined → getMundo(null) → null →
     el respaldo. Tres de las cuatro pistas de mundo —bosque, río y mina— no han
     sonado jamás, y toda expedición sonaba a pradera. No hay error, no hay
     silencio, no hay nada que mirar: suena música, solo que siempre la misma.

     El test lo daba por bueno porque construía el estado a mano con la forma
     equivocada, `{mundoId: m.id}`, copiada de esta misma línea. Un test escrito
     contra la implementación en vez de contra la conducta se pone de acuerdo con
     el fallo. El guardián E42 de casos-regresiones.js parte del estado que crea
     iniciar() de verdad, que es lo único que no se puede inventar. */
  var mundo = (CB.partida && CB.partida.estado) ? CB.partida.estado.mundo : null;
  var clave = (mundo && mundo.bioma) ? CB.musica.POR_BIOMA[mundo.bioma] : null;
  return clave || 'mundoPradera';
};

/* ── Arranque ───────────────────────────────────────────────────────────── */
CB.musica.iniciar = function () {
  if (CB.musica.iniciada) return;
  CB.musica.iniciada = true;

  var ap = CB.almacen.ajustesDispositivo();
  var n = (ap.nivelMusica == null) ? CB.musica.NIVEL_DEFECTO : ap.nivelMusica;
  CB.musica.base = CB.musica.NIVELES[CB.util.clamp(n, 0, 3)].valor;

  CB.bus.escuchar('pantalla', function (id) {
    CB.musica.poner(CB.musica.claveDePantalla(id));
  });

  /* Cualquier gesto sirve para desbloquear el autoarranque, no solo el botón
     JUGAR: un niño puede empezar tocando «Ajustes». */
  var desbloquear = function () { CB.musica.reintentar(); };
  document.addEventListener('pointerdown', desbloquear, true);
  document.addEventListener('keydown', desbloquear, true);

  /* Pestaña oculta: la música se para. Un juego que sigue sonando en una
     pestaña que nadie mira es un juego que el adulto cierra de golpe. */
  document.addEventListener('visibilitychange', function () {
    var i, c;
    for (i = 0; i < 2; i++) {
      c = CB.musica.canales[i];
      if (!c.el) continue;
      try {
        if (document.hidden) c.el.pause();
        else if (c.objetivo > 0) CB.musica.reproducir(c);
      } catch (e) { }
    }
    if (!document.hidden) CB.musica.arrancarReloj();
  });
};

/* ============================================================================
   10-gen-numeracion.js — N1…N16
   ----------------------------------------------------------------------------
   FUNCIÓN PURA: cero DOM, cero Math.random. El rng SIEMPRE se inyecta, o la
   «semilla reproducible» de la mejora 11 sería falsa y el botón «Reproducir esta
   pregunta» del panel del adulto no reproduciría nada.

   Formato `ordenar`: por el invariante 5, item.opciones es null y item.respuesta
   es un entero de [0,999]. El array esperado va en item.orden, y el componente
   valida la secuencia completa; item.respuesta es el último número de la
   secuencia, que es el que el niño coloca al final.
   ========================================================================== */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.numeracion = {};

/* ── Número → palabras, 0-999 en español ────────────────────────────────── */
CB.gen.numeracion.UNIDADES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco',
                              'seis', 'siete', 'ocho', 'nueve'];
CB.gen.numeracion.DIEZ_A_QUINCE = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince'];
CB.gen.numeracion.DECENAS = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
                             'sesenta', 'setenta', 'ochenta', 'noventa'];
CB.gen.numeracion.CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
                              'quinientos', 'seiscientos', 'setecientos', 'ochocientos',
                              'novecientos'];

CB.gen.numeracion.enPalabras = function (n) {
  n = Math.round(n);
  if (n < 0 || n > 999) return String(n);
  if (n < 10) return CB.gen.numeracion.UNIDADES[n];
  if (n <= 15) return CB.gen.numeracion.DIEZ_A_QUINCE[n - 10];
  if (n < 20) {
    var u = n - 10;
    return 'dieci' + (u === 6 ? 'séis' : CB.gen.numeracion.UNIDADES[u]);
  }
  if (n < 30) {
    if (n === 20) return 'veinte';
    var u2 = n - 20;
    if (u2 === 1) return 'veintiuno';
    if (u2 === 2) return 'veintidós';
    if (u2 === 3) return 'veintitrés';
    if (u2 === 6) return 'veintiséis';
    return 'veinti' + CB.gen.numeracion.UNIDADES[u2];
  }
  if (n < 100) {
    var d = Math.floor(n / 10), r = n % 10;
    return CB.gen.numeracion.DECENAS[d] + (r ? ' y ' + CB.gen.numeracion.UNIDADES[r] : '');
  }
  if (n === 100) return 'cien';
  var c = Math.floor(n / 100), resto = n % 100;
  var txt = CB.gen.numeracion.CENTENAS[c];
  if (!resto) return txt;
  return txt + ' ' + CB.gen.numeracion.enPalabras(resto);
};

CB.gen.numeracion.ORDINALES = ['', 'primero', 'segundo', 'tercero', 'cuarto', 'quinto',
  'sexto', 'séptimo', 'octavo', 'noveno', 'décimo', 'undécimo', 'duodécimo',
  'decimotercero', 'decimocuarto', 'decimoquinto', 'decimosexto', 'decimoséptimo',
  'decimoctavo', 'decimonoveno', 'vigésimo'];

/* ── Ayudas comunes ─────────────────────────────────────────────────────── */

/* Rango efectivo del nivel según D (§8.2): D no cambia el rango declarado, lo
   recorre. D=1 la parte baja, D=2 todo, D=3 la parte alta. */
function tramo(min, max, D, rng) {
  var span = max - min;
  if (D === 1) return CB.util.ent(rng, min, min + Math.max(1, Math.floor(span * 0.4)));
  if (D === 3) return CB.util.ent(rng, min + Math.floor(span * 0.6), max);
  return CB.util.ent(rng, min, max);
}
CB.gen.numeracion._tramo = tramo;

/* ── N1 Contar y recontar ───────────────────────────────────────────────── */
CB.gen.numeracion.N1 = function (rng, D) {
  var n = tramo(3, D === 1 ? 12 : 24, D, rng);
  return {
    formato: 'opciones4',
    consigna: '¿Cuántos bloques hay?',
    visual: { tipo: 'conteo', n: n },
    respuesta: n,
    expr: 'contar' + n,
    diagnostico: false
  };
};

/* ── N2 Leer y escribir hasta 99 ────────────────────────────────────────── */
CB.gen.numeracion.N2 = function (rng, D) {
  var n = tramo(10, 99, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabras(n),
    respuesta: n,
    expr: 'leer' + n,
    diagnostico: true
  };
};

/* ── N3 Decenas y unidades ──────────────────────────────────────────────── */
CB.gen.numeracion.N3 = function (rng, D) {
  var n = tramo(11, 99, D, rng);
  var pideDecenas = rng() < 0.5;
  return {
    formato: 'opciones4',
    consigna: pideDecenas
      ? '¿Cuántas decenas tiene el ' + n + '?'
      : '¿Cuántas unidades sueltas tiene el ' + n + '?',
    respuesta: pideDecenas ? Math.floor(n / 10) : (n % 10),
    expr: (pideDecenas ? 'dec' : 'uni') + n,
    diagnostico: true,
    contexto: { numero: n, parte: pideDecenas ? 'decenas' : 'unidades' }
  };
};

/* ── N4 Mayor, menor, igual (balanza) ───────────────────────────────────── */
function comparacion(rng, D, max) {
  var a = tramo(0, max, D, rng), b;
  var r = rng();
  if (r < 0.15) b = a;                                    // el = existe de verdad
  else if (r < 0.6) b = CB.util.clamp(a + CB.util.ent(rng, 1, 20), 0, max);
  else b = CB.util.clamp(a - CB.util.ent(rng, 1, 20), 0, max);
  var signo = (a > b) ? '>' : (a < b ? '<' : '=');
  return {
    formato: 'balanza',
    consigna: '¿Qué signo va en medio?',
    visual: { tipo: 'balanza', a: a, b: b },
    opcionesFijas: ['>', '<', '='],
    respuestaSigno: signo,
    respuesta: Math.max(a, b),        // entero de [0,999], invariante 5
    expr: a + signo + b,
    diagnostico: true,
    contexto: { a: a, b: b }
  };
}
CB.gen.numeracion.N4  = function (rng, D) { return comparacion(rng, D, 99); };
CB.gen.numeracion.N10 = function (rng, D) { return comparacion(rng, D, 599); };
CB.gen.numeracion.N16 = function (rng, D) { return comparacion(rng, D, 999); };

/* ── N5 / N11 Series (ordenar) ──────────────────────────────────────────── */
function serie(rng, D, saltos, max) {
  var salto = CB.util.elegir(rng, saltos);
  var asc = rng() < 0.65;
  var cuantos = (D === 1) ? 3 : 4;
  var inicio = CB.util.ent(rng, salto * cuantos, Math.max(salto * cuantos, max - salto * cuantos));
  var orden = [], i, v;
  for (i = 0; i < cuantos; i++) {
    v = asc ? inicio + i * salto : inicio - i * salto;
    orden.push(CB.util.clamp(v, 0, 999));
  }
  return {
    formato: 'ordenar',
    consigna: asc
      ? 'Coloca en orden, de ' + salto + ' en ' + salto + ', de menor a mayor.'
      : 'Coloca en orden, de ' + salto + ' en ' + salto + ', de mayor a menor.',
    orden: orden,
    piezas: CB.util.barajar(orden, rng),
    respuesta: orden[orden.length - 1],
    expr: 'serie' + salto + '_' + inicio + (asc ? 'a' : 'd'),
    diagnostico: false
  };
}
CB.gen.numeracion.N5  = function (rng, D) { return serie(rng, D, [2, 10], 99); };
CB.gen.numeracion.N11 = function (rng, D) { return serie(rng, D, [5, 100], 599); };

/* ── N6 Pares e impares ─────────────────────────────────────────────────── */
CB.gen.numeracion.N6 = function (rng, D) {
  var pidePar = rng() < 0.5;
  var base = tramo(1, 99, D, rng);
  var resp = pidePar ? (base % 2 === 0 ? base : base + 1) : (base % 2 === 1 ? base : base + 1);
  resp = CB.util.clamp(resp, 0, 99);
  return {
    formato: 'opciones4',
    consigna: pidePar ? 'Toca el número PAR.' : 'Toca el número IMPAR.',
    respuesta: resp,
    expr: (pidePar ? 'par' : 'impar') + resp,
    diagnostico: false,
    /* Los distractores de este nivel son de la paridad contraria: es lo único
       que lo hace diagnóstico de verdad. */
    distractoresFijos: (function () {
      var out = [], v, k = 0;
      while (out.length < 3 && k < 60) {
        k++;
        v = CB.util.ent(rng, 1, 99);
        if ((v % 2 === 0) === pidePar) continue;
        if (v === resp || out.indexOf(v) !== -1) continue;
        out.push(v);
      }
      return out;
    })()
  };
};

/* ── N7 La recta numérica (ordenar) ─────────────────────────────────────── */
CB.gen.numeracion.N7 = function (rng, D) {
  var max = 199, cuantos = (D === 1) ? 3 : 4, orden = [], i, v, k = 0;
  while (orden.length < cuantos && k < 80) {
    k++;
    v = tramo(0, max, D, rng);
    if (orden.indexOf(v) === -1) orden.push(v);
  }
  orden.sort(function (a, b) { return a - b; });
  return {
    formato: 'ordenar',
    consigna: 'Coloca los números de menor a mayor.',
    orden: orden,
    piezas: CB.util.barajar(orden, rng),
    respuesta: orden[orden.length - 1],
    expr: 'recta' + orden.join('_'),
    diagnostico: false
  };
};

/* ── N8 / N15 Escribir números grandes ──────────────────────────────────── */
CB.gen.numeracion.N8 = function (rng, D) {
  var n = tramo(100, 199, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabras(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};
CB.gen.numeracion.N15 = function (rng, D) {
  var n = tramo(200, 999, D, rng);
  return {
    formato: 'teclado',
    consigna: 'Escribe el número: ' + CB.gen.numeracion.enPalabras(n),
    respuesta: n, expr: 'leer' + n, diagnostico: true
  };
};

/* ── N9 La centena: C, D y U ────────────────────────────────────────────── */
CB.gen.numeracion.N9 = function (rng, D) {
  var n = tramo(100, 599, D, rng);
  var cual = CB.util.ent(rng, 0, 2);
  var partes = ['centenas', 'decenas', 'unidades sueltas'];
  var val = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10][cual];
  return {
    formato: 'opciones4',
    consigna: '¿Cuántas ' + partes[cual] + ' tiene el ' + n + '?',
    respuesta: val,
    expr: 'cdu' + cual + '_' + n,
    diagnostico: true,
    contexto: { numero: n, parte: partes[cual] }
  };
};

/* ── N12 Descomponer C + D + U ──────────────────────────────────────────── */
CB.gen.numeracion.N12 = function (rng, D) {
  var n = tramo(101, 599, D, rng);
  var c = Math.floor(n / 100) * 100, d = Math.floor(n / 10) % 10 * 10, u = n % 10;
  var trozos = [];
  if (c) trozos.push(c);
  if (d) trozos.push(d);
  if (u) trozos.push(u);
  return {
    formato: 'teclado',
    consigna: '¿Qué número es? ' + trozos.join(' + '),
    respuesta: n,
    operacion: '+', operandos: trozos,
    expr: trozos.join('+'),
    diagnostico: true
  };
};

/* ── N13 Aproximar a la decena ──────────────────────────────────────────── */
CB.gen.numeracion.N13 = function (rng, D) {
  var n = tramo(11, 599, D, rng);
  if (n % 10 === 0) n += CB.util.ent(rng, 1, 9);
  var abajo = Math.floor(n / 10) * 10, arriba = abajo + 10;
  var resp = ((n % 10) >= 5) ? arriba : abajo;
  return {
    formato: 'opciones4',
    consigna: '¿A qué decena está más cerca el ' + n + '?',
    respuesta: resp,
    expr: 'aprox' + n,
    diagnostico: false,
    distractoresFijos: [
      (resp === arriba ? abajo : arriba),
      CB.util.clamp(abajo - 10, 0, 999),
      CB.util.clamp(arriba + 10, 0, 999)
    ]
  };
};

/* ── N14 Ordinales hasta el 20.º ────────────────────────────────────────── */
CB.gen.numeracion.N14 = function (rng, D) {
  var total = (D === 1) ? CB.util.ent(rng, 5, 9) : CB.util.ent(rng, 10, 20);
  var pos = CB.util.ent(rng, 1, total);
  return {
    formato: 'opciones4',
    consigna: 'En la fila hay ' + total + ' vagonetas. ' +
              '¿Qué lugar ocupa la marcada?',
    visual: { tipo: 'fila', total: total, marcada: pos },
    respuesta: pos,
    ordinal: CB.gen.numeracion.ORDINALES[pos] || (pos + '.º'),
    expr: 'ord' + pos + '_' + total,
    diagnostico: false
  };
};

/* ============================================================================
   11-gen-sumas.js — S1…S16
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   Las sumas se construyen DÍGITO A DÍGITO con un patrón de llevadas declarado,
   no «a ver qué sale». Así el nivel «DU + DU con UNA llevada» sirve siempre
   exactamente eso, y el invariante correspondiente se puede comprobar sobre los
   92.000 ítems de la suite sin depender de la suerte del rng.
   ========================================================================== */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.sumas = {};

/* Cuenta las llevadas reales de a + b. Compartida con casos-generadores.js. */
CB.gen.sumas.llevadas = function (a, b) {
  var n = 0, acarreo = 0, x = a, y = b, s;
  while (x > 0 || y > 0) {
    s = (x % 10) + (y % 10) + acarreo;
    acarreo = (s >= 10) ? 1 : 0;
    if (acarreo) n++;
    x = Math.floor(x / 10); y = Math.floor(y / 10);
  }
  return n;
};

/**
 * Construye a + b con el patrón de llevadas pedido.
 * @param patron array por columna desde las unidades: true = esa columna lleva
 * @param cifrasA / cifrasB número de cifras de cada sumando
 */
CB.gen.sumas.construir = function (rng, patron, cifrasA, cifrasB) {
  var cols = Math.max(cifrasA, cifrasB, patron.length);
  var digA = [], digB = [], acarreo = 0, i, dA, dB, suma, intentos;

  for (i = 0; i < cols; i++) {
    var quiere = !!patron[i];
    var maxA = (i < cifrasA) ? 9 : 0;
    var maxB = (i < cifrasB) ? 9 : 0;
    var minA = (i === cifrasA - 1 && cifrasA > 1) ? 1 : 0;
    var minB = (i === cifrasB - 1 && cifrasB > 1) ? 1 : 0;

    dA = 0; dB = 0; intentos = 0;
    do {
      intentos++;
      dA = CB.util.ent(rng, minA, maxA);
      dB = CB.util.ent(rng, minB, maxB);
      suma = dA + dB + acarreo;
    } while (((suma >= 10) !== quiere) && intentos < 60);

    /* Si el rng no lo consigue por azar, se fuerza de forma determinista: nunca
       se devuelve un ítem que incumpla el patrón declarado. */
    if ((suma >= 10) !== quiere) {
      if (quiere && maxA > 0 && maxB > 0) {
        dA = Math.max(minA, 9 - acarreo); dB = Math.max(minB, 9);
      } else {
        dA = minA; dB = minB;
      }
      suma = dA + dB + acarreo;
      if ((suma >= 10) !== quiere) return null;
    }

    digA.push(dA); digB.push(dB);
    acarreo = (suma >= 10) ? 1 : 0;
  }

  var a = 0, b = 0, p = 1;
  for (i = 0; i < cols; i++) { a += digA[i] * p; b += digB[i] * p; p *= 10; }
  return { a: a, b: b, r: a + b };
};

/* Genera hasta que el resultado cabe en el techo del nivel. */
CB.gen.sumas.intentar = function (rng, patron, cifrasA, cifrasB, techo, intentos) {
  var k = 0, s;
  intentos = intentos || 30;
  while (k < intentos) {
    k++;
    s = CB.gen.sumas.construir(rng, patron, cifrasA, cifrasB);
    if (s && s.r <= techo && s.r >= 0) return s;
  }
  return s || { a: 1, b: 1, r: 2 };
};

function itemSuma(s, destreza) {
  return {
    formato: 'teclado',
    operacion: '+',
    operandos: [s.a, s.b],
    respuesta: s.r,
    expr: s.a + '+' + s.b,
    consigna: s.a + ' + ' + s.b,
    diagnostico: true,
    llevadas: CB.gen.sumas.llevadas(s.a, s.b)
  };
}

/* ── S1  Sumas hasta 10, sin llevar ─────────────────────────────────────── */
CB.gen.sumas.S1 = function (rng, D) {
  var techo = (D === 1) ? 6 : 10;
  var a = CB.util.ent(rng, 0, techo);
  var b = CB.util.ent(rng, 0, techo - a);
  return itemSuma({ a: a, b: b, r: a + b });
};

/* ── S2  Sumas hasta 20 sin llevar ──────────────────────────────────────── */
CB.gen.sumas.S2 = function (rng, D) {
  var a = CB.util.ent(rng, 10, (D === 1) ? 14 : 19);
  var b = CB.util.ent(rng, 0, 9 - (a % 10));
  return itemSuma({ a: a, b: b, r: a + b });
};

/* ── S3  Dobles hasta 10 + 10 ───────────────────────────────────────────── */
CB.gen.sumas.S3 = function (rng, D) {
  var a = CB.util.ent(rng, 1, (D === 1) ? 5 : 10);
  var it = itemSuma({ a: a, b: a, r: a + a });
  it.formato = 'opciones4';
  it.consigna = '¿Cuánto es el doble de ' + a + '?';
  return it;
};

/* ── S4  Sumar 10 ───────────────────────────────────────────────────────── */
CB.gen.sumas.S4 = function (rng, D) {
  var a = CB.util.ent(rng, 1, (D === 1) ? 49 : 89);
  return itemSuma({ a: a, b: 10, r: a + 10 });
};

/* ── S5  DU + U sin llevar ──────────────────────────────────────────────── */
CB.gen.sumas.S5 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false], 2, 1, 99));
};

/* ── S6  DU + DU sin llevar ─────────────────────────────────────────────── */
CB.gen.sumas.S6 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false], 2, 2, 99));
};

/* ── S7  DU + U con llevada ─────────────────────────────────────────────── */
CB.gen.sumas.S7 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false], 2, 1, 199));
};

/* ── S8  DU + DU con UNA llevada ────────────────────────────────────────── */
CB.gen.sumas.S8 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false], 2, 2, 99));
};

/* ── S9  DU + DU con llevada, hasta 199 ─────────────────────────────────── */
CB.gen.sumas.S9 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false], 2, 2, 199));
};

/* ── S10 Tres sumandos de una cifra ─────────────────────────────────────── */
CB.gen.sumas.S10 = function (rng, D) {
  var techo = (D === 1) ? 15 : 27;
  var a, b, c, k = 0;
  do {
    k++;
    a = CB.util.ent(rng, 1, 9); b = CB.util.ent(rng, 1, 9); c = CB.util.ent(rng, 1, 9);
  } while (a + b + c > techo && k < 40);
  return {
    formato: 'teclado', operacion: '+', operandos: [a, b, c],
    respuesta: a + b + c,
    expr: a + '+' + b + '+' + c,
    consigna: a + ' + ' + b + ' + ' + c,
    diagnostico: true,
    llevadas: (a + b + c >= 10) ? 1 : 0
  };
};

/* ── S11 CDU + DU sin llevar ────────────────────────────────────────────── */
CB.gen.sumas.S11 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false, false], 3, 2, 599));
};

/* ── S12 CDU + DU con UNA llevada ───────────────────────────────────────── */
CB.gen.sumas.S12 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false, false], 3, 2, 599));
};

/* ── S13 Sumar decenas completas ────────────────────────────────────────── */
CB.gen.sumas.S13 = function (rng, D) {
  var a = CB.util.ent(rng, 1, (D === 1) ? 20 : 49) * 10;
  var b = CB.util.ent(rng, 1, 9) * 10;
  if (a + b > 599) a = 599 - b - ((599 - b) % 10);
  var it = itemSuma({ a: a, b: b, r: a + b });
  it.formato = 'opciones4';
  return it;
};

/* ── S14 CDU + CDU sin llevar ───────────────────────────────────────────── */
CB.gen.sumas.S14 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [false, false, false], 3, 3, 999));
};

/* ── S15 CDU + CDU con UNA llevada ──────────────────────────────────────── */
CB.gen.sumas.S15 = function (rng, D) {
  return itemSuma(CB.gen.sumas.intentar(rng, [true, false, false], 3, 3, 999));
};

/* ── S16 Tres sumandos con decenas ──────────────────────────────────────── */
CB.gen.sumas.S16 = function (rng, D) {
  var a = CB.util.ent(rng, 1, 9) * 10 + CB.util.ent(rng, 0, 9);
  var b = CB.util.ent(rng, 1, 9) * 10;
  var c = CB.util.ent(rng, 1, 9);
  var r = a + b + c;
  if (r > 999) { a = 100; b = 20; c = 3; r = 123; }
  return {
    formato: 'teclado', operacion: '+', operandos: [a, b, c],
    respuesta: r,
    expr: a + '+' + b + '+' + c,
    consigna: a + ' + ' + b + ' + ' + c,
    diagnostico: true,
    llevadas: CB.gen.sumas.llevadas(a + b, c) + CB.gen.sumas.llevadas(a, b)
  };
};

/* ============================================================================
   12-gen-restas.js — R1…R14
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   DOS REGLAS DURAS (PLAN §6.7 e invariantes 2 y 11):

     · Toda resta se construye DESDE EL RESULTADO: a = r + b. Así el resultado es
       SIEMPRE ≥ 0 por construcción, no por comprobación posterior.

     · Con ampliacion:false, como máximo UNA llevada, y PROHIBIDO el 0 en
       cualquier posición del minuendo cuando esa columna exija préstamo.
       Motivo: 504 − 267 obliga a pedir prestado a través del cero, y eso es
       contenido de 3.º en cualquier secuenciación española. Servirlo en el flujo
       normal garantiza fallo, pérdida de luz y frustración, y además CONTAMINA
       EL DIAGNÓSTICO: el niño no tiene el error E-R-INV, es que se le está
       preguntando algo de otro curso.

   Como a = r + b, los préstamos de a − b son exactamente las llevadas de r + b.
   Por eso se reutiliza el constructor de 11-gen-sumas.js: mismo patrón, misma
   garantía, un solo sitio donde equivocarse.
   ========================================================================== */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.restas = {};

/* Cuenta los préstamos reales de a − b. */
CB.gen.restas.prestamos = function (a, b) {
  var n = 0, deuda = 0, x = a, y = b, dA, dB;
  while (y > 0 || deuda > 0) {
    dA = x % 10; dB = y % 10;
    if (dA - deuda < dB) { n++; deuda = 1; } else { deuda = 0; }
    x = Math.floor(x / 10); y = Math.floor(y / 10);
    if (x === 0 && y === 0) break;
  }
  return n;
};

/* ¿Hay un 0 en el minuendo en una columna que exige préstamo? */
CB.gen.restas.ceroEnColumnaDePrestamo = function (a, b) {
  var deuda = 0, x = a, y = b, dA, dB;
  while (y > 0 || deuda > 0) {
    dA = x % 10; dB = y % 10;
    if (deuda === 1 && dA === 0) return true;     // hay que pedir A TRAVÉS del 0
    if (dA - deuda < dB) { deuda = 1; } else { deuda = 0; }
    x = Math.floor(x / 10); y = Math.floor(y / 10);
    if (x === 0 && y === 0) break;
  }
  return false;
};

/**
 * Construye a − b = r con el patrón de préstamos pedido.
 * @param patron por columna desde las unidades: true = esa columna pide prestado
 */
CB.gen.restas.construir = function (rng, patron, cifrasR, cifrasB, techo) {
  var k = 0, s, a;
  while (k < 40) {
    k++;
    s = CB.gen.sumas.construir(rng, patron, cifrasR, cifrasB);
    if (!s) continue;
    a = s.r;                                   // minuendo = resultado + sustraendo
    if (a > techo) continue;
    if (CB.gen.restas.ceroEnColumnaDePrestamo(a, s.b)) continue;
    if (CB.gen.restas.prestamos(a, s.b) !== patron.filter(Boolean).length) continue;
    return { a: a, b: s.b, r: s.a };
  }
  return { a: 9, b: 4, r: 5 };                 // respaldo seguro, nunca negativo
};

function itemResta(t) {
  return {
    formato: 'teclado',
    operacion: '-',
    operandos: [t.a, t.b],
    respuesta: t.r,
    expr: t.a + '-' + t.b,
    consigna: t.a + ' − ' + t.b,
    diagnostico: true,
    llevadas: CB.gen.restas.prestamos(t.a, t.b)
  };
}

/* ── R1  Restas hasta 10 ────────────────────────────────────────────────── */
CB.gen.restas.R1 = function (rng, D) {
  var a = CB.util.ent(rng, (D === 1) ? 2 : 5, 10);
  var b = CB.util.ent(rng, 0, a);
  return itemResta({ a: a, b: b, r: a - b });
};

/* ── R2  Restas hasta 20 sin llevar ─────────────────────────────────────── */
CB.gen.restas.R2 = function (rng, D) {
  var a = CB.util.ent(rng, 10, 20);
  var b = CB.util.ent(rng, 0, a % 10);          // sin préstamo por construcción
  return itemResta({ a: a, b: b, r: a - b });
};

/* ── R3  Restar 10 ──────────────────────────────────────────────────────── */
CB.gen.restas.R3 = function (rng, D) {
  var a = CB.util.ent(rng, 11, (D === 1) ? 49 : 99);
  return itemResta({ a: a, b: 10, r: a - 10 });
};

/* ── R4  DU − U sin llevar ──────────────────────────────────────────────── */
CB.gen.restas.R4 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [false, false], 2, 1, 99));
};

/* ── R5  DU − DU sin llevar ─────────────────────────────────────────────── */
CB.gen.restas.R5 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [false, false], 2, 2, 99));
};

/* ── R6  Complementos a 10 y a 100 ──────────────────────────────────────── */
CB.gen.restas.R6 = function (rng, D) {
  var base = (D === 1 || rng() < 0.5) ? 10 : 100;
  var b = (base === 10) ? CB.util.ent(rng, 1, 9) : CB.util.ent(rng, 1, 9) * 10;
  var it = itemResta({ a: base, b: b, r: base - b });
  it.consigna = '¿Cuánto le falta a ' + b + ' para llegar a ' + base + '?';
  it.expr = 'comp' + base + '_' + b;
  return it;
};

/* ── R7  DU − U con UNA llevada ─────────────────────────────────────────── */
CB.gen.restas.R7 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [true, false], 2, 1, 99));
};

/* ── R8  DU − DU con UNA llevada ────────────────────────────────────────── */
CB.gen.restas.R8 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [true, false], 2, 2, 99));
};

/* ── R9  Restar decenas completas ───────────────────────────────────────── */
CB.gen.restas.R9 = function (rng, D) {
  var a = CB.util.ent(rng, 3, (D === 1) ? 20 : 59) * 10;
  var b = CB.util.ent(rng, 1, Math.min(9, a / 10)) * 10;
  var it = itemResta({ a: a, b: b, r: a - b });
  it.formato = 'opciones4';
  return it;
};

/* ── R10 CDU − DU sin llevar ────────────────────────────────────────────── */
CB.gen.restas.R10 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [false, false, false], 3, 2, 599));
};

/* ── R11 CDU − DU con UNA llevada ───────────────────────────────────────── */
CB.gen.restas.R11 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [true, false, false], 3, 2, 599));
};

/* ── R12 CDU − CDU sin llevar ───────────────────────────────────────────── */
CB.gen.restas.R12 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [false, false, false], 3, 3, 999));
};

/* ── R13 CDU − CDU con UNA llevada ──────────────────────────────────────── */
CB.gen.restas.R13 = function (rng, D) {
  return itemResta(CB.gen.restas.construir(rng, [true, false, false], 3, 3, 999));
};

/* ── R14 Restas con doble llevada — AMPLIACIÓN, apagada por defecto ─────── */
CB.gen.restas.R14 = function (rng, D) {
  /* Único nivel del juego que puede tener dos préstamos y cero intermedio. Solo
     se sirve con ajustes.restasDobleLlevada activado por el adulto (§6.7). */
  var k = 0, s, a;
  while (k < 40) {
    k++;
    s = CB.gen.sumas.construir(rng, [true, true, false], 3, 3);
    if (!s) continue;
    a = s.r;
    if (a > 999) continue;
    if (CB.gen.restas.prestamos(a, s.b) !== 2) continue;
    return itemResta({ a: a, b: s.b, r: s.a });
  }
  return itemResta({ a: 504, b: 267, r: 237 });
};

/* ============================================================================
   13-gen-multiplicacion.js — M1…M10
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   INVARIANTE 4 — CORRECCIÓN DE UNA CONTRADICCIÓN DEL PLAN, documentada en
   docs/decisiones.md:

   El plan escribía dos cosas incompatibles. En §8.3, M4 declara «Tabla del 2,
   factores 2 × 0-10»; el invariante 4 exigía que AMBOS factores estuvieran en
   {0,1,2,3,4,5,10}. Bajo esa lectura, la tabla del 2 solo podría practicarse
   para ×0,1,2,3,4,5 y ×10: faltarían ×6, ×7, ×8 y ×9, es decir, MÁS DE UN
   TERCIO de la única tabla que el propio plan declara nuclear. El requisito 1
   del usuario («repaso de las tablas de multiplicar») quedaría a medias.

   Lo que el invariante quería impedir está dicho en su propio motivo: que
   «4 × 8 pase dentro del nivel de la tabla del 4», porque 4 × 8 ES un hecho de
   la tabla del 8. La regla que expresa esa intención sin mutilar la tabla del 2
   es esta:

     Con tablas69 === false:
        al menos UNO de los dos factores está en {2, 5, 10}  (las tres tablas
        nucleares de 2.º), O AMBOS son ≤ 5 (que es trabajo de concepto con
        matrices y suma reiterada, no recuperación de tabla).
     Con tablas69 === true:  ambos en {0..10}.
     En ningún caso hay factores > 10.

   Comprobación: 2 × 7 ✓ (tabla del 2 completa) · 5 × 9 ✓ · 10 × 8 ✓ ·
   3 × 4 ✓ (matriz) · 4 × 8 ✗ · 3 × 8 ✗ · 6 × 7 ✗.

   TODA multiplicación muestra MATRIZ DE FILAS Y COLUMNAS + SUMA REITERADA ANTES
   QUE EL RESULTADO, sin excepción (criterio de HECHO de F7). Es lo que convierte
   un contenido de 2.º ciclo en una iniciación honesta de 2.º curso.
   ========================================================================== */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.multiplicacion = {};

/* Las tres tablas que 2.º practica como iniciación en el tercer trimestre. */
CB.gen.multiplicacion.TABLAS_NUCLEARES = [2, 5, 10];
/* Multiplicadores: la tabla se practica ENTERA, de 0 a 10. */
CB.gen.multiplicacion.MULTIPLICADORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/* Trabajo de concepto con matrices: ambos factores pequeños. */
CB.gen.multiplicacion.MAX_CONCEPTO = 5;

CB.gen.multiplicacion.conFlag = function (ctx) {
  return !!(ctx && ctx.ajustes && ctx.ajustes.tablas69);
};

function itemMult(a, b, formato) {
  return {
    formato: formato || 'teclado',
    operacion: '×',
    operandos: [a, b],
    respuesta: a * b,
    expr: a + 'x' + b,
    consigna: a + ' × ' + b,
    /* La UI está OBLIGADA a pintar esto antes del resultado. */
    visual: { tipo: 'matriz', filas: a, columnas: b },
    sumaReiterada: (function () {
      if (a === 0 || a > 6) return null;         // no se dibujan 10 sumandos
      var t = [], i;
      for (i = 0; i < a; i++) t.push(b);
      return t.join(' + ');
    })(),
    diagnostico: true
  };
}

/* ── M1 Veces: la suma reiterada ────────────────────────────────────────── */
CB.gen.multiplicacion.M1 = function (rng, D) {
  var a = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  var b = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  var it = itemMult(a, b, 'opciones4');
  it.consigna = '¿Cuánto es ' + b + ' repetido ' + a + ' veces?';
  return it;
};

/* ── M2 Filas y columnas ────────────────────────────────────────────────── */
CB.gen.multiplicacion.M2 = function (rng, D) {
  var a = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  var b = CB.util.ent(rng, 2, (D === 1) ? 3 : 5);
  var it = itemMult(a, b, 'opciones4');
  it.consigna = 'Hay ' + a + ' filas de ' + b + ' bloques. ¿Cuántos bloques hay?';
  return it;
};

/* ── M3 Del dibujo a «a × b» ────────────────────────────────────────────── */
CB.gen.multiplicacion.M3 = function (rng, D) {
  var a = CB.util.ent(rng, 2, 5), b = CB.util.ent(rng, 2, 5);
  var it = itemMult(a, b, 'teclado');
  it.consigna = a + ' × ' + b;
  return it;
};

/* ── Tablas ─────────────────────────────────────────────────────────────── */
/* Nivel de tabla: el factor FIJO es el del nivel y el multiplicador recorre la
   tabla ENTERA, de 0 a 10. Las tablas del 3 y del 4 (M9, M10) son niveles de
   ampliación y solo se sirven con el flag del adulto activado, de modo que con
   el flag apagado el factor fijo siempre pertenece a {2, 5, 10}. */
function tabla(fijo) {
  return function (rng, D, ctx) {
    var pool = CB.gen.multiplicacion.MULTIPLICADORES.slice();
    if (D === 1) pool = pool.filter(function (v) { return v <= 5; });
    if (D === 3) pool = pool.filter(function (v) { return v >= 5; });
    var b = CB.util.elegir(rng, pool);
    if (b == null) b = 2;
    return itemMult(fijo, b, 'teclado');
  };
}

CB.gen.multiplicacion.M4 = tabla(2);
CB.gen.multiplicacion.M5 = tabla(10);
CB.gen.multiplicacion.M6 = tabla(5);

/* ── M7 Mezcla del 2, del 5 y del 10 ────────────────────────────────────── */
CB.gen.multiplicacion.M7 = function (rng, D) {
  var f = CB.util.elegir(rng, CB.gen.multiplicacion.TABLAS_NUCLEARES);
  var b = CB.util.elegir(rng, CB.gen.multiplicacion.MULTIPLICADORES);
  return itemMult(f, b == null ? 2 : b, 'teclado');
};

/* ── M8 Dobles y mitades ────────────────────────────────────────────────── */
CB.gen.multiplicacion.M8 = function (rng, D) {
  var pideMitad = rng() < 0.5;
  var b = CB.util.ent(rng, 1, (D === 1) ? 5 : 10);
  if (pideMitad) {
    /* La mitad se expresa SOLO con palabras, nunca con notación de fracción
       (invariante 3): un niño de 2.º que ve «½» no lee «medio», no lee nada. */
    var doble = b * 2;
    var it = itemMult(2, b, 'opciones4');
    it.consigna = '¿Cuál es la mitad de ' + doble + '?';
    it.respuesta = b;
    it.expr = 'mitad' + doble;
    it.visual = { tipo: 'matriz', filas: 2, columnas: b };
    return it;
  }
  var it2 = itemMult(2, b, 'opciones4');
  it2.consigna = '¿Cuál es el doble de ' + b + '?';
  it2.expr = 'doble' + b;
  return it2;
};

/* ── M9 y M10: AMPLIACIÓN (tablas del 3 y del 4) ────────────────────────── */
CB.gen.multiplicacion.M9  = tabla(3);
CB.gen.multiplicacion.M10 = tabla(4);

/* Comprobación del invariante 4, usada por casos-generadores.js.
   Contraejemplo explícito de F2: con el flag apagado, ningún ítem puede ser un
   hecho propio de las tablas del 3, 4, 6, 7, 8 o 9. */
CB.gen.multiplicacion.factoresValidos = function (item, tablas69) {
  var o = item.operandos || [];
  if (o.length !== 2) return true;              // «la mitad de» no es un producto

  var a = o[0], b = o[1];
  if (!(a >= 0 && a <= 10) || !(b >= 0 && b <= 10)) return false;   // nunca > 10
  if (tablas69) return true;

  var N = CB.gen.multiplicacion.TABLAS_NUCLEARES;
  var M = CB.gen.multiplicacion.MAX_CONCEPTO;
  return (N.indexOf(a) !== -1) || (N.indexOf(b) !== -1) || (a <= M && b <= M);
};

/* ============================================================================
   14-gen-problemas.js — P1…P20, las 20 estructuras semánticas aditivas
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   POR QUÉ 20 Y NO «problemas de sumas y restas» a secas (PLAN §9.1): dos
   problemas con los mismos números y la misma operación tienen tasas de acierto
   radicalmente distintas según su estructura. Un problema de cambio con
   incógnita en el resultado lo resuelve casi todo 2.º; uno de comparación con
   referente desconocido lo resuelve menos de un tercio. Saber que un niño
   «falla las restas» no sirve de nada; saber que resuelve CAMBIO_2 al 95 % y
   COMPARACION_5 al 0 % es un dato accionable el lunes siguiente.

   PONDERACIÓN 3/2/1 (§9.2): el reparto equitativo del plan v1 ponía la mitad de
   los problemas por encima del curso del niño. Con 3 luces, eso es fin de
   partida.

   validar() NO LANZA EXCEPCIONES (§9.8): una excepción desde el generador dentro
   de servirItem() deja al niño con la pantalla congelada a mitad de partida y
   sin guardar. Devuelve {ok, motivos}.
   ========================================================================== */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.problemas = {};

/* ── Ponderación y disponibilidad ───────────────────────────────────────── */
CB.gen.problemas.NUCLEAR = ['CAMBIO_1', 'CAMBIO_2', 'COMBINACION_1', 'COMBINACION_2',
                            'COMPARACION_1', 'COMPARACION_2'];
CB.gen.problemas.INTERMEDIO = ['CAMBIO_3', 'CAMBIO_4', 'COMPARACION_3', 'COMPARACION_4',
                               'IGUALACION_1', 'IGUALACION_2'];
CB.gen.problemas.AMPLIACION = ['CAMBIO_5', 'CAMBIO_6', 'COMPARACION_5', 'COMPARACION_6',
                               'IGUALACION_3', 'IGUALACION_4', 'IGUALACION_5', 'IGUALACION_6'];

CB.gen.problemas.PESO = function (sub) {
  if (CB.gen.problemas.NUCLEAR.indexOf(sub) !== -1) return 3;
  if (CB.gen.problemas.INTERMEDIO.indexOf(sub) !== -1) return 2;
  return 1;
};

CB.gen.problemas.SUBTIPOS = CB.gen.problemas.NUCLEAR
  .concat(CB.gen.problemas.INTERMEDIO)
  .concat(CB.gen.problemas.AMPLIACION);

CB.gen.problemas.DESTREZA = function (sub) {
  if (sub.indexOf('CAMBIO') === 0) return 'problemas_cambio';
  if (sub.indexOf('COMBINACION') === 0) return 'problemas_combinacion';
  if (sub.indexOf('COMPARACION') === 0) return 'problemas_comparacion';
  return 'problemas_igualacion';
};

/* Verbos que funcionan de verdad en un problema de cambio. «Después ve 5 peces.
   ¿Cuántos tiene ahora?» es una frase rota, y un niño de 7 años la detecta. */
CB.gen.problemas.VERBOS_PROBLEMA = {
  comida:    { ganar: ['coge', 'compra'],      perder: ['come', 'reparte'] },
  juguete:   { ganar: ['gana', 'compra'],      perder: ['regala', 'presta'] },
  escolar:   { ganar: ['compra', 'encuentra'], perder: ['pierde', 'presta'] },
  natura:    { ganar: ['recoge', 'encuentra'], perder: ['regala', 'planta'] },
  animal:    { ganar: ['encuentra', 'recoge'], perder: ['suelta', 'regala'] },
  coleccion: { ganar: ['gana', 'compra'],      perder: ['regala', 'cambia'] },
  bloque:    { ganar: ['pica', 'encuentra'],   perder: ['coloca', 'regala'] }
};

/* ── Bolsas persistidas: el género se ALTERNA por construcción (§9.7) ──────
   El criterio «50/50 ±1 en 200 generaciones» es matemáticamente inalcanzable con
   muestreo aleatorio (σ ≈ 7; la probabilidad de caer en 100±1 ronda el 12 %). El
   test habría fallado casi siempre contra código correcto y se habría acabado
   desactivando. Con bolsa, el equilibrio se garantiza además DENTRO de cada
   partida, que es lo que ve el niño. */
CB.gen.problemas.nuevoEstadoBolsas = function () {
  return { genero: [], nombreF: [], nombreM: [], rol: [], objeto: [] };
};

CB.gen.problemas.elegirActores = function (rng, bolsas) {
  bolsas = bolsas || CB.gen.problemas.nuevoEstadoBolsas();

  var bG = new CB.util.BolsaBarajada(2, rng, bolsas.genero);
  var g1 = bG.sacar([]);
  bolsas.genero = bG.estado();

  var listaA = (g1 === 0) ? CB.datos.NOMBRES_F : CB.datos.NOMBRES_M;
  var listaB = (g1 === 0) ? CB.datos.NOMBRES_M : CB.datos.NOMBRES_F;
  var claveA = (g1 === 0) ? 'nombreF' : 'nombreM';
  var claveB = (g1 === 0) ? 'nombreM' : 'nombreF';

  var bA = new CB.util.BolsaBarajada(listaA.length, rng, bolsas[claveA]);
  var iA = bA.sacar([]); bolsas[claveA] = bA.estado();
  var bB = new CB.util.BolsaBarajada(listaB.length, rng, bolsas[claveB]);
  var iB = bB.sacar([]); bolsas[claveB] = bB.estado();

  var bO = new CB.util.BolsaBarajada(CB.datos.OBJETOS.length, rng, bolsas.objeto);
  var iO = bO.sacar([]); bolsas.objeto = bO.estado();

  var bR = new CB.util.BolsaBarajada(2, rng, bolsas.rol);
  var rol = bR.sacar([]); bolsas.rol = bR.estado();

  return {
    n1: listaA[iA < 0 ? 0 : iA],
    n2: listaB[iB < 0 ? 0 : iB],
    obj: CB.datos.OBJETOS[iO < 0 ? 0 : iO],
    generoPrimero: (g1 === 0) ? 'F' : 'M',
    rolPrimeroGana: rol === 0,
    bolsas: bolsas
  };
};

/* ── Las 20 plantillas ──────────────────────────────────────────────────────
   Cada una devuelve tres frases. La TERCERA es siempre la pregunta, de ≤7
   palabras. Comparación e igualación presentan el dato y la relación en frases
   SEPARADAS: la subordinación es justo lo que peor comprende un lector de 7
   años, y por eso está prohibida en el validador.
   ────────────────────────────────────────────────────────────────────────── */

function cuantos(obj) { return obj.g === 'f' ? 'Cuántas' : 'Cuántos'; }

CB.gen.problemas.PLANTILLAS = {

  CAMBIO_1: function (a, b, act, vg) {          /* incógnita en el resultado (+) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Después ' + vg + ' ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ahora?'
      ],
      datos: [a, b], respuesta: a + b, operacion: '+'
    };
  },

  CAMBIO_2: function (a, b, act, vg, vp) {      /* incógnita en el resultado (−) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Después ' + vp + ' ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' le quedan?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  COMBINACION_1: function (a, b, act) {          /* incógnita en el todo */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tienen en total?'
      ],
      datos: [a, b], respuesta: a + b, operacion: '+'
    };
  },

  COMBINACION_2: function (a, b, act) {          /* incógnita en una parte */
    return {
      frases: [
        'Entre ' + act.n1 + ' y ' + act.n2 + ' tienen ' + a + ' ' + act.obj.plur + '.',
        act.n1 + ' tiene ' + b + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  COMPARACION_1: function (a, b, act) {          /* diferencia desconocida (más) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' más tiene ' + act.n1 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  COMPARACION_2: function (a, b, act) {          /* diferencia desconocida (menos) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' menos tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  CAMBIO_3: function (a, c, act) {               /* incógnita en el cambio (+) */
    return {
      frases: [
        act.n1 + ' tenía ' + a + ' ' + act.obj.plur + '.',
        'Ahora tiene ' + c + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' ha ganado?'
      ],
      datos: [a, c], respuesta: c - a, operacion: '-'
    };
  },

  CAMBIO_4: function (a, c, act) {               /* incógnita en el cambio (−) */
    return {
      frases: [
        act.n1 + ' tenía ' + a + ' ' + act.obj.plur + '.',
        'Ahora tiene ' + c + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' ha perdido?'
      ],
      datos: [a, c], respuesta: a - c, operacion: '-'
    };
  },

  COMPARACION_3: function (a, b, act) {          /* referido desconocido (más) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' más.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a + b, operacion: '+'
    };
  },

  COMPARACION_4: function (a, b, act) {          /* referido desconocido (menos) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' menos.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  IGUALACION_1: function (a, b, act) {           /* añadir al menor */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' le faltan a ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  IGUALACION_2: function (a, b, act) {           /* quitar al mayor */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        act.n2 + ' tiene ' + b + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' le sobran a ' + act.n1 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  CAMBIO_5: function (b, c, act, vg) {           /* estado inicial (+) */
    return {
      frases: [
        act.n1 + ' ' + vg + ' ' + b + ' ' + act.obj.plur + '.',
        'Ahora tiene ' + c + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tenía antes?'
      ],
      datos: [b, c], respuesta: c - b, operacion: '-'
    };
  },

  CAMBIO_6: function (b, c, act, vg, vp) {       /* estado inicial (−) */
    return {
      frases: [
        act.n1 + ' ' + vp + ' ' + b + ' ' + act.obj.plur + '.',
        'Ahora tiene ' + c + ' ' + act.obj.plur + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tenía antes?'
      ],
      datos: [b, c], respuesta: c + b, operacion: '+'
    };
  },

  COMPARACION_5: function (a, b, act) {          /* referente desconocido (más) */
    /* El ejemplo canónico del plan, con elipsis del sujeto en la 2.ª frase. */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Tiene ' + b + ' más que ' + act.n2 + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  COMPARACION_6: function (a, b, act) {          /* referente desconocido (menos) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Tiene ' + b + ' menos que ' + act.n2 + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a + b, operacion: '+'
    };
  },

  IGUALACION_3: function (a, b, act) {           /* referido desconocido (añadir) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'A ' + act.n2 + ' le faltan ' + b + ' para igualar.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  IGUALACION_4: function (a, b, act) {           /* referido desconocido (quitar) */
    return {
      frases: [
        act.n1 + ' tiene ' + a + ' ' + act.obj.plur + '.',
        'Le sobran ' + b + ' para igualar.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [a, b], respuesta: a - b, operacion: '-'
    };
  },

  IGUALACION_5: function (c, b, act) {           /* referente desconocido (añadir) */
    return {
      frases: [
        act.n2 + ' tiene ' + c + ' ' + act.obj.plur + '.',
        'Le faltan ' + b + ' para igualar a ' + act.n1 + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n1 + '?'
      ],
      datos: [c, b], respuesta: c + b, operacion: '+'
    };
  },

  IGUALACION_6: function (c, b, act) {           /* referente desconocido (quitar) */
    return {
      frases: [
        act.n1 + ' tiene ' + c + ' ' + act.obj.plur + '.',
        'Le sobran ' + b + ' para igualar a ' + act.n2 + '.',
        '¿' + cuantos(act.obj) + ' ' + act.obj.plur + ' tiene ' + act.n2 + '?'
      ],
      datos: [c, b], respuesta: c - b, operacion: '-'
    };
  }
};

/* ── resolver(): recálculo INDEPENDIENTE de la plantilla ────────────────────
   casos-problemas.js compara esto con lo que devuelve la plantilla. Si ambos
   salieran del mismo código, el test sería una tautología. */
CB.gen.problemas.resolver = function (subtipo, d) {
  var x = d[0], y = d[1];
  switch (subtipo) {
    case 'CAMBIO_1':      return x + y;
    case 'CAMBIO_2':      return x - y;
    case 'COMBINACION_1': return x + y;
    case 'COMBINACION_2': return x - y;
    case 'COMPARACION_1': return x - y;
    case 'COMPARACION_2': return x - y;
    case 'CAMBIO_3':      return y - x;
    case 'CAMBIO_4':      return x - y;
    case 'COMPARACION_3': return x + y;
    case 'COMPARACION_4': return x - y;
    case 'IGUALACION_1':  return x - y;
    case 'IGUALACION_2':  return x - y;
    case 'CAMBIO_5':      return y - x;
    case 'CAMBIO_6':      return y + x;
    case 'COMPARACION_5': return x - y;
    case 'COMPARACION_6': return x + y;
    case 'IGUALACION_3':  return x - y;
    case 'IGUALACION_4':  return x - y;
    case 'IGUALACION_5':  return x + y;
    case 'IGUALACION_6':  return x - y;
    default: return null;
  }
};

/* ── Elección de números por subtipo, respetando el techo del trimestre ──── */
CB.gen.problemas.numeros = function (subtipo, rng, D, techo) {
  var max = Math.min(techo || 99, (D === 1) ? 20 : (D === 2 ? 60 : techo || 99));
  if (max < 6) max = 6;
  var a, b, c, k = 0;

  switch (subtipo) {
    case 'CAMBIO_1': case 'COMBINACION_1': case 'COMPARACION_3': case 'COMPARACION_6':
      do { k++; a = CB.util.ent(rng, 2, max); b = CB.util.ent(rng, 1, max); }
      while (a + b > (techo || 99) && k < 40);
      return [a, b];

    case 'CAMBIO_6': case 'IGUALACION_5':
      do { k++; b = CB.util.ent(rng, 1, Math.floor(max / 2)); c = CB.util.ent(rng, 2, max); }
      while (c + b > (techo || 99) && k < 40);
      return [c, b];

    case 'CAMBIO_3': case 'CAMBIO_5':
      /* El segundo dato es el mayor: la respuesta nunca es negativa. */
      a = CB.util.ent(rng, 1, Math.max(2, max - 2));
      c = CB.util.ent(rng, a + 1, max);
      return [a, c];

    default:
      /* Todos los de resta: el primero SIEMPRE ≥ el segundo (invariante 2). */
      a = CB.util.ent(rng, 3, max);
      b = CB.util.ent(rng, 1, a);
      return [a, b];
  }
};

/* ── Dato sobrante (§9.4) ───────────────────────────────────────────────────
   INVARIANTE 10: el dato sobrante NUNCA puede combinarse con un dato necesario
   para dar la respuesta correcta. Si a+c, a−c, b+c o b−c coincide con la
   respuesta, se regenera. */
CB.gen.problemas.datoSobrante = function (datos, respuesta, rng, techo) {
  var a = datos[0], b = datos[1], k = 0, c;
  while (k < 40) {
    k++;
    c = CB.util.ent(rng, 1, Math.min(techo || 99, 40));
    if (c === a || c === b || c === respuesta) continue;
    if (a + c === respuesta || a - c === respuesta) continue;
    if (b + c === respuesta || b - c === respuesta) continue;
    if (c + a === respuesta || c - a === respuesta) continue;
    if (c + b === respuesta || c - b === respuesta) continue;
    return c;
  }
  return null;
};

/* ── El validador de lectura fácil — INVARIANTE 7 ───────────────────────── */

CB.gen.problemas.SUBORDINANTES = ['si', 'cuando', 'mientras', 'aunque', 'porque'];
/* «que» solo se admite en las comparativas: más que / menos que. */
CB.gen.problemas.ANTES_DE_QUE = ['más', 'menos', 'tantos', 'tantas'];

/* Formas que DEBEN llevar tilde en la acepción que usa el juego. Si aparece la
   forma sin tilde, el test falla: es material escolar. */
CB.gen.problemas.EXIGEN_TILDE = {
  'mas': 'más', 'numero': 'número', 'cuantos': 'cuántos', 'cuantas': 'cuántas',
  'cuanto': 'cuánto', 'despues': 'después', 'que': null, 'cual': 'cuál',
  'como': null, 'tenia': 'tenía'
};

CB.gen.problemas.validar = function (item) {
  var motivos = [];
  var frases = item.frases || [];
  var texto = frases.join(' ');
  var i, j, w, palabras;

  /* 1. Número de frases y forma de la pregunta */
  if (frases.length > 3) motivos.push('frases');
  if (!frases.length) { motivos.push('frases'); return { ok: false, motivos: motivos }; }

  var ultima = frases[frases.length - 1];
  if (ultima.indexOf('¿') !== 0 || ultima.charAt(ultima.length - 1) !== '?') {
    motivos.push('pregunta');
  }
  if (CB.util.palabras(ultima).length > 8) motivos.push('preguntaLarga');

  /* 2. Longitud */
  for (i = 0; i < frases.length; i++) {
    if (CB.util.palabras(frases[i]).length > 12) { motivos.push('fraseLarga'); break; }
  }
  if (CB.util.palabras(texto).length > 25) motivos.push('total');

  /* 3. Ancho de línea, con el MISMO algoritmo que usa la interfaz */
  var lineas = CB.util.cortarLineas(texto, 34);
  for (i = 0; i < lineas.length; i++) {
    if (lineas[i].length > 34) { motivos.push('ancho'); break; }
  }
  if (lineas.length > 5) motivos.push('demasiadasLineas');

  /* 4. Datos numéricos */
  var numeros = texto.match(/\d+/g) || [];
  var maxDatos = item.datoSobrante ? 3 : 2;
  if (numeros.length > maxDatos) motivos.push('datos');

  /* 5. Subordinación prohibida */
  palabras = CB.util.palabras(texto.toLowerCase().replace(/[¿?.,!¡]/g, ''));
  for (i = 0; i < palabras.length; i++) {
    w = palabras[i];
    if (CB.gen.problemas.SUBORDINANTES.indexOf(w) !== -1) { motivos.push('subordinacion'); break; }
    if (w === 'que') {
      var previa = (i > 0) ? palabras[i - 1] : '';
      if (CB.gen.problemas.ANTES_DE_QUE.indexOf(previa) === -1) {
        motivos.push('subordinacion'); break;
      }
    }
  }

  /* 6. Tildes obligatorias */
  for (i = 0; i < palabras.length; i++) {
    var esperado = CB.gen.problemas.EXIGEN_TILDE[palabras[i]];
    if (esperado) { motivos.push('tilde'); break; }
  }
  /* Toda exclamación abre con ¡ y cierra con !; toda interrogación con ¿ y ? */
  if (texto.indexOf('!') !== -1 && texto.indexOf('¡') === -1) motivos.push('signos');
  if (texto.indexOf('?') !== -1 && texto.indexOf('¿') === -1) motivos.push('signos');

  /* 7. Sujeto explícito repetido en frases consecutivas */
  for (i = 1; i < frases.length; i++) {
    var s1 = CB.util.palabras(frases[i - 1])[0];
    var s2 = CB.util.palabras(frases[i])[0];
    if (s1 && s2 && s1 === s2 && /^[A-ZÁÉÍÓÚÑ]/.test(s1)) {
      motivos.push('sujetoRepetido'); break;
    }
  }

  /* 8. Lista blanca */
  for (i = 0; i < palabras.length; i++) {
    w = palabras[i];
    if (/^\d+$/.test(w)) continue;
    if (CB.datos.enListaBlanca(w)) continue;
    /* Los nombres propios van con inicial mayúscula en el texto original */
    var original = null;
    var todas = CB.util.palabras(texto.replace(/[¿?.,!¡]/g, ''));
    for (j = 0; j < todas.length; j++) {
      if (todas[j].toLowerCase() === w) { original = todas[j]; break; }
    }
    if (original && CB.datos.enListaBlanca(original.toLowerCase())) continue;
    motivos.push('listaBlanca:' + w);
    break;
  }

  /* 9. Rango de la respuesta */
  if (!(item.respuesta >= 0 && item.respuesta <= 999)) motivos.push('rango');

  return { ok: motivos.length === 0, motivos: motivos };
};

/* ── PROBLEMAS_SEGUROS: 12 enunciados fijos validados a mano ──────────────
   Si el generador no consigue un enunciado válido en 20 intentos, se sirve uno
   de estos. Nunca se lanza una excepción en el camino caliente del bucle. */
CB.gen.problemas.PROBLEMAS_SEGUROS = [
  { subtipo: 'CAMBIO_1', frases: ['Ana tiene 12 cromos.', 'Después gana 5 cromos.', '¿Cuántos cromos tiene ahora?'], datos: [12, 5], respuesta: 17, operacion: '+' },
  { subtipo: 'CAMBIO_2', frases: ['Leo tiene 15 canicas.', 'Después regala 6 canicas.', '¿Cuántas canicas le quedan?'], datos: [15, 6], respuesta: 9, operacion: '-' },
  { subtipo: 'COMBINACION_1', frases: ['Sara tiene 8 fresas.', 'Hugo tiene 7 fresas.', '¿Cuántas fresas tienen en total?'], datos: [8, 7], respuesta: 15, operacion: '+' },
  { subtipo: 'COMBINACION_2', frases: ['Entre Marta y Bruno tienen 20 globos.', 'Marta tiene 12.', '¿Cuántos globos tiene Bruno?'], datos: [20, 12], respuesta: 8, operacion: '-' },
  { subtipo: 'COMPARACION_1', frases: ['Julia tiene 14 pegatinas.', 'Pablo tiene 9 pegatinas.', '¿Cuántas pegatinas más tiene Julia?'], datos: [14, 9], respuesta: 5, operacion: '-' },
  { subtipo: 'COMPARACION_2', frases: ['Laia tiene 18 hojas.', 'Marc tiene 11 hojas.', '¿Cuántas hojas menos tiene Marc?'], datos: [18, 11], respuesta: 7, operacion: '-' },
  { subtipo: 'CAMBIO_3', frases: ['Noa tenía 10 conchas.', 'Ahora tiene 16 conchas.', '¿Cuántas conchas ha ganado?'], datos: [10, 16], respuesta: 6, operacion: '-' },
  { subtipo: 'CAMBIO_4', frases: ['Pau tenía 21 piedras.', 'Ahora tiene 13 piedras.', '¿Cuántas piedras ha perdido?'], datos: [21, 13], respuesta: 8, operacion: '-' },
  { subtipo: 'COMPARACION_3', frases: ['Emma tiene 9 flores.', 'Jan tiene 4 más.', '¿Cuántas flores tiene Jan?'], datos: [9, 4], respuesta: 13, operacion: '+' },
  { subtipo: 'COMPARACION_4', frases: ['Iris tiene 17 gemas.', 'Nil tiene 5 menos.', '¿Cuántas gemas tiene Nil?'], datos: [17, 5], respuesta: 12, operacion: '-' },
  { subtipo: 'IGUALACION_1', frases: ['Alba tiene 13 setas.', 'Iker tiene 6 setas.', '¿Cuántas le faltan a Iker?'], datos: [13, 6], respuesta: 7, operacion: '-' },
  { subtipo: 'COMPARACION_5', frases: ['Nora tiene 12 cromos.', 'Tiene 5 más que Mario.', '¿Cuántos cromos tiene Mario?'], datos: [12, 5], respuesta: 7, operacion: '-' }
];

/* ── Generación ─────────────────────────────────────────────────────────── */
CB.gen.problemas.generarSubtipo = function (subtipo, rng, D, ctx) {
  ctx = ctx || {};
  var techo = ctx.techo || 99;
  var conSobrante = !!ctx.datoSobrante;
  var intentos = 0, item;

  while (intentos < 20) {
    intentos++;
    var act = CB.gen.problemas.elegirActores(rng, ctx.bolsas);
    if (ctx.bolsas) ctx.bolsas = act.bolsas;

    var verbos = CB.gen.problemas.VERBOS_PROBLEMA[act.obj.cat];
    var vg = CB.util.elegir(rng, verbos.ganar);
    var vp = CB.util.elegir(rng, verbos.perder);

    var d = CB.gen.problemas.numeros(subtipo, rng, D, techo);
    var plantilla = CB.gen.problemas.PLANTILLAS[subtipo];
    if (!plantilla) break;

    var base = plantilla(d[0], d[1], act, vg, vp);
    if (base.respuesta < 0 || base.respuesta > 999) continue;

    item = {
      subtipo: subtipo,
      formato: 'teclado',            /* SIEMPRE teclado en primer intento (§9.5) */
      frases: base.frases,
      enunciado: base.frases.join(' '),
      datos: base.datos,
      respuesta: base.respuesta,
      operacion: base.operacion,
      destreza: CB.gen.problemas.DESTREZA(subtipo),
      objeto: act.obj,
      actores: [act.n1, act.n2],
      expr: subtipo + '_' + base.datos.join('_'),
      diagnostico: true,
      datoSobrante: false
    };

    if (conSobrante) {
      var c = CB.gen.problemas.datoSobrante(base.datos, base.respuesta, rng, techo);
      if (c != null) {
        item.datoSobrante = true;
        item.numeroSobrante = c;
        item.frases = [base.frases[0], base.frases[1],
                       base.frases[2]];
        /* El dato sobrante se inserta como una coletilla de la 2.ª frase, sin
           subordinación y sin pasar de 12 palabras. */
        var extra = 'También tiene ' + c + ' ' + act.obj.plur + ' de otro color.';
        if (CB.util.palabras(extra).length <= 12) {
          item.frases = [base.frases[0], extra, base.frases[2]];
          item.datos = base.datos.slice();
        } else {
          item.datoSobrante = false;
        }
        item.enunciado = item.frases.join(' ');
      }
    }

    var v = CB.gen.problemas.validar(item);
    if (v.ok) { item.validado = true; return item; }
    item.motivos = v.motivos;
  }

  /* Ningún intento ha validado: se sirve un enunciado seguro. */
  var seguro = CB.gen.problemas.PROBLEMAS_SEGUROS.filter(function (p) {
    return p.subtipo === subtipo;
  })[0] || CB.gen.problemas.PROBLEMAS_SEGUROS[0];

  return {
    subtipo: seguro.subtipo,
    formato: 'teclado',
    frases: seguro.frases.slice(),
    enunciado: seguro.frases.join(' '),
    datos: seguro.datos.slice(),
    respuesta: seguro.respuesta,
    operacion: seguro.operacion,
    destreza: CB.gen.problemas.DESTREZA(seguro.subtipo),
    expr: 'seguro_' + seguro.subtipo,
    diagnostico: true,
    datoSobrante: false,
    deRespaldo: true
  };
};

/* ── siguienteSubtipo(): deuda de cobertura PONDERADA (§9.2) ─────────────── */
CB.gen.problemas.disponibles = function (perfil) {
  var trimestre = (perfil && perfil.trimestreDeducido) ? perfil.trimestreDeducido : 1;
  var out = CB.gen.problemas.NUCLEAR.slice(), i, p, nuclearOk = true;

  /* Los INTERMEDIOS solo desde T2 y solo con ≥80 % en los nucleares. */
  var aciertos = 0, intentos = 0;
  for (i = 0; i < CB.gen.problemas.NUCLEAR.length; i++) {
    p = (perfil && perfil.problemas) ? perfil.problemas[CB.gen.problemas.NUCLEAR[i]] : null;
    if (p) { aciertos += p.aciertos || 0; intentos += p.intentos || 0; }
  }
  nuclearOk = (intentos >= 6) && ((aciertos / intentos) >= 0.8);

  if (trimestre >= 2 && nuclearOk) out = out.concat(CB.gen.problemas.INTERMEDIO);
  return out;
};

/**
 * @param ctx {lucesActuales} — la AMPLIACIÓN nunca se sirve con menos de 3 luces.
 */
CB.gen.problemas.siguienteSubtipo = function (perfil, ctx) {
  ctx = ctx || {};
  var lista = CB.gen.problemas.disponibles(perfil);

  var trimestre = (perfil && perfil.trimestreDeducido) ? perfil.trimestreDeducido : 1;
  if (trimestre >= 3 && (ctx.lucesActuales == null || ctx.lucesActuales >= 3)) {
    lista = lista.concat(CB.gen.problemas.AMPLIACION.filter(function (s) {
      return !ctx.soloNucleares;
    }));
  }
  if (!lista.length) lista = CB.gen.problemas.NUCLEAR.slice();

  var totalPeso = 0, i;
  for (i = 0; i < lista.length; i++) totalPeso += CB.gen.problemas.PESO(lista[i]);

  var servidasTotal = 0;
  for (i = 0; i < lista.length; i++) {
    var pr = (perfil && perfil.problemas) ? perfil.problemas[lista[i]] : null;
    servidasTotal += pr ? (pr.intentos || 0) : 0;
  }

  var mejor = null, mejorDeuda = -Infinity;
  for (i = 0; i < lista.length; i++) {
    var sub = lista[i];
    var peso = CB.gen.problemas.PESO(sub);
    var esperadas = (servidasTotal + 1) * (peso / totalPeso);
    var pr2 = (perfil && perfil.problemas) ? perfil.problemas[sub] : null;
    var servidas = pr2 ? (pr2.intentos || 0) : 0;
    var deuda = peso * (esperadas - servidas);

    if (deuda > mejorDeuda) {
      mejorDeuda = deuda; mejor = sub;
    } else if (deuda === mejorDeuda && mejor) {
      /* Empate: el de menor tiempo medio, para no encadenar los más lentos. */
      var a = (perfil && perfil.problemas && perfil.problemas[mejor]) ? perfil.problemas[mejor].rtMedioMs : 0;
      var b = pr2 ? pr2.rtMedioMs : 0;
      if (b < a) mejor = sub;
    }
  }
  return mejor || 'CAMBIO_1';
};

/* Nivel P1..P20 ↔ subtipo */
CB.gen.problemas.SUBTIPO_DE_NIVEL = {
  P1: 'CAMBIO_1', P2: 'CAMBIO_2', P3: 'COMBINACION_1', P4: 'COMBINACION_2',
  P5: 'COMPARACION_1', P6: 'COMPARACION_2', P7: 'CAMBIO_3', P8: 'CAMBIO_4',
  P9: 'COMPARACION_3', P10: 'COMPARACION_4', P11: 'IGUALACION_1', P12: 'IGUALACION_2',
  P13: 'CAMBIO_5', P14: 'CAMBIO_6', P15: 'COMPARACION_5', P16: 'COMPARACION_6',
  P17: 'IGUALACION_3', P18: 'IGUALACION_4', P19: 'IGUALACION_5', P20: 'IGUALACION_6'
};

/* Los generadores P1..P20 que consume el catálogo. */
(function () {
  var k;
  for (k in CB.gen.problemas.SUBTIPO_DE_NIVEL) {
    if (!Object.prototype.hasOwnProperty.call(CB.gen.problemas.SUBTIPO_DE_NIVEL, k)) continue;
    (function (nivelId, subtipo) {
      CB.gen.problemas[nivelId] = function (rng, D, ctx) {
        return CB.gen.problemas.generarSubtipo(subtipo, rng, D, ctx);
      };
    })(k, CB.gen.problemas.SUBTIPO_DE_NIVEL[k]);
  }
})();

/* ============================================================================
   15-gen-dinero.js — E1…E8
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   CONFORME AL TEXTO LITERAL del saber A.5 de PRIMER ciclo (PLAN §6.9):
     «Sistema monetario europeo: monedas (1, 2 euros) y billetes de euro
      (5, 10, 20, 50 y 100), valor y equivalencia.»

   · MONEDAS y BILLETES son conjuntos SEPARADOS. No existe «billete de 1 €» ni
     «moneda de 5 €», y el juego los distingue siempre visual y verbalmente.
   · El billete de 100 € SE CONSERVA: está en el texto literal. Se le da poco
     peso (aparece en reconocimiento y equivalencias, no en los niveles de pago).
   · Los CÉNTIMOS son AMPLIACIÓN apagada por defecto: el saber de primer ciclo
     cita solo monedas de 1 y 2 euros; los céntimos aparecen en el saber de
     SEGUNDO ciclo. Se ofrecen porque la práctica de aula de 2.º sí los
     introduce, pero la decisión es del adulto.
   · Cuando se activan, se escriben SIEMPRE como entero + la palabra «céntimos»
     («50 céntimos»), NUNCA como «0,50 €»: el invariante 3 prohíbe los decimales.
   ========================================================================== */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.dinero = {};

CB.gen.dinero.MONEDAS  = [1, 2];                   // euros
CB.gen.dinero.BILLETES = [5, 10, 20, 50, 100];     // euros
CB.gen.dinero.CENTIMOS = [5, 10, 20, 50];          // AMPLIACIÓN, flagAdulto

CB.gen.dinero.esMoneda  = function (v) { return CB.gen.dinero.MONEDAS.indexOf(v) !== -1; };
CB.gen.dinero.esBillete = function (v) { return CB.gen.dinero.BILLETES.indexOf(v) !== -1; };

/* Concordancia obligatoria: «1 euro», no «1 euros». Es material escolar; una
   falta de concordancia en la consigna la ve el maestro a la primera. */
CB.gen.dinero.euros = function (v) {
  return v + (v === 1 ? ' euro' : ' euros');
};

CB.gen.dinero.nombre = function (v) {
  if (CB.gen.dinero.esMoneda(v))  return 'la moneda de ' + CB.gen.dinero.euros(v);
  if (CB.gen.dinero.esBillete(v)) return 'el billete de ' + CB.gen.dinero.euros(v);
  return CB.gen.dinero.euros(v);
};

/* Reparte un importe en piezas reales, de mayor a menor. */
CB.gen.dinero.descomponer = function (importe, conBilletes) {
  var piezas = [], resto = importe, i;
  var valores = conBilletes
    ? CB.gen.dinero.BILLETES.slice().reverse().concat(CB.gen.dinero.MONEDAS.slice().reverse())
    : CB.gen.dinero.MONEDAS.slice().reverse();
  for (i = 0; i < valores.length; i++) {
    while (resto >= valores[i] && piezas.length < 12) {
      piezas.push(valores[i]);
      resto -= valores[i];
    }
  }
  return piezas;
};

/* ── E1 Reconocer monedas y billetes ────────────────────────────────────── */
CB.gen.dinero.E1 = function (rng, D) {
  var todos = CB.gen.dinero.MONEDAS.concat(CB.gen.dinero.BILLETES);
  var v = CB.util.elegir(rng, todos);
  return {
    formato: 'opciones4',
    consigna: 'Toca ' + CB.gen.dinero.nombre(v) + '.',
    respuesta: v,
    expr: 'reconocer' + v,
    diagnostico: false,
    contexto: { pieza: v, esMoneda: CB.gen.dinero.esMoneda(v) },
    distractoresFijos: CB.util.barajar(
      todos.filter(function (x) { return x !== v; }), rng
    ).slice(0, 3)
  };
};

/* ── E2 Contar con monedas de 1 y 2 € ───────────────────────────────────── */
CB.gen.dinero.E2 = function (rng, D) {
  var n = CB.util.ent(rng, 3, (D === 1) ? 5 : 8), piezas = [], total = 0, i, v;
  for (i = 0; i < n; i++) {
    v = CB.util.elegir(rng, CB.gen.dinero.MONEDAS);
    piezas.push(v); total += v;
  }
  return {
    formato: 'monedas',
    consigna: '¿Cuántos euros hay en total?',
    piezas: piezas,
    respuesta: total,
    expr: 'contarM' + piezas.join('_'),
    diagnostico: true,
    contexto: { soloMonedas: true }
  };
};

/* ── E3 Contar con billetes ─────────────────────────────────────────────── */
CB.gen.dinero.E3 = function (rng, D) {
  var n = CB.util.ent(rng, 2, (D === 1) ? 3 : 4), piezas = [], total = 0, i, v;
  var pool = (D === 3) ? CB.gen.dinero.BILLETES : [5, 10, 20];
  for (i = 0; i < n; i++) {
    v = CB.util.elegir(rng, pool);
    if (total + v > 100) break;
    piezas.push(v); total += v;
  }
  if (!piezas.length) { piezas = [5]; total = 5; }
  return {
    formato: 'monedas',
    consigna: '¿Cuántos euros hay en billetes?',
    piezas: piezas,
    respuesta: total,
    expr: 'contarB' + piezas.join('_'),
    diagnostico: true,
    contexto: { soloBilletes: true }
  };
};

/* ── E4 Equivalencias entre billetes ────────────────────────────────────── */
CB.gen.dinero.E4 = function (rng, D) {
  var grande = CB.util.elegir(rng, [10, 20, 50, 100]);
  var pequeno = CB.util.elegir(rng, CB.gen.dinero.BILLETES.filter(function (v) {
    return v < grande && grande % v === 0;
  }));
  if (pequeno == null) pequeno = 5;
  return {
    formato: 'opciones4',
    consigna: '¿Cuántos billetes de ' + CB.gen.dinero.euros(pequeno) +
              ' hacen falta para ' + CB.gen.dinero.euros(grande) + '?',
    respuesta: grande / pequeno,
    expr: 'equiv' + grande + '_' + pequeno,
    diagnostico: true
  };
};

/* ── E5 Pagar con importe exacto ────────────────────────────────────────── */
CB.gen.dinero.E5 = function (rng, D) {
  var precio = CB.util.ent(rng, 3, (D === 1) ? 12 : 50);
  return {
    formato: 'monedas',
    consigna: 'Paga justo ' + CB.gen.dinero.euros(precio) + '.',
    modo: 'pagar',
    objetivo: precio,
    disponibles: CB.gen.dinero.MONEDAS.concat([5, 10, 20]),
    respuesta: precio,
    expr: 'pagar' + precio,
    diagnostico: true
  };
};

/* ── E6 El cambio ───────────────────────────────────────────────────────── */
CB.gen.dinero.E6 = function (rng, D) {
  var precio = CB.util.ent(rng, 2, (D === 1) ? 8 : 18);
  var pagaCon = CB.util.elegir(rng, CB.gen.dinero.BILLETES.filter(function (v) {
    return v > precio && v <= 20;
  }));
  if (pagaCon == null) pagaCon = 20;
  return {
    formato: 'teclado',
    consigna: 'El precio es ' + CB.gen.dinero.euros(precio) + '. Pagas con ' +
              CB.gen.dinero.euros(pagaCon) + '. ¿Cuánto te devuelven?',
    operacion: '-', operandos: [pagaCon, precio],
    respuesta: pagaCon - precio,
    expr: 'cambio' + pagaCon + '_' + precio,
    diagnostico: true
  };
};

/* ── E7 La compra: gasto total ──────────────────────────────────────────── */
CB.gen.dinero.E7 = function (rng, D) {
  var a = CB.util.ent(rng, 2, (D === 1) ? 15 : 45);
  var b = CB.util.ent(rng, 2, (D === 1) ? 15 : 45);
  if (a + b > 99) b = 99 - a;
  return {
    formato: 'teclado',
    consigna: 'Una cosa cuesta ' + CB.gen.dinero.euros(a) + ' y la otra ' +
              CB.gen.dinero.euros(b) + '. ¿Cuánto es en total?',
    operacion: '+', operandos: [a, b],
    respuesta: a + b,
    expr: 'compra' + a + '_' + b,
    diagnostico: true
  };
};

/* ── E8 Céntimos — AMPLIACIÓN, apagada por defecto ──────────────────────── */
CB.gen.dinero.E8 = function (rng, D) {
  var c = CB.util.elegir(rng, CB.gen.dinero.CENTIMOS);
  var cuantas = Math.round(100 / c);
  return {
    formato: 'opciones4',
    /* SIEMPRE entero + la palabra «céntimos». Nunca «0,50 €». */
    consigna: '¿Cuántas monedas de ' + c + ' céntimos hacen 1 euro?',
    respuesta: cuantas,
    expr: 'cent' + c,
    diagnostico: false
  };
};

/* ============================================================================
   16-gen-vocabulario.js — V1…V8 (Diccionario de Bloques)
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   Da cobertura al criterio 6.1 del primer ciclo, literal: «Reconocer lenguaje
   matemático sencillo presente en la vida cotidiana, adquiriendo vocabulario
   específico básico». Es lo que casi ninguna aplicación de cálculo entrena, y es
   la mitad de por qué un niño no entiende un enunciado.

   NOTA SOBRE V2: «minuendo» y «sustraendo» son terminología que el RD no sitúa
   explícitamente en primer ciclo. Se marcan en el Diccionario con el distintivo
   «palabra de mayores» y NO cuentan para ningún requisito de progresión.

   Estos niveles declaran diagnostico:false: simular un error numérico sobre una
   palabra no tiene sentido, y el informe no emite hipótesis sobre ellos
   (invariante 6-bis).
   ========================================================================== */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.vocabulario = {};

CB.gen.vocabulario.terminosDe = function (nivelId) {
  return CB.datos.GLOSARIO.filter(function (g) { return g.n === nivelId; });
};

/* Un ítem de vocabulario es: se da la definición, se elige el término.
   El índice del término dentro del glosario hace de «respuesta» entera, para
   cumplir el invariante 5 sin inventar un número que no significa nada. */
function itemVocab(nivelId, rng, D) {
  var propios = CB.gen.vocabulario.terminosDe(nivelId);
  if (!propios.length) propios = CB.datos.GLOSARIO.slice(0, 6);

  var elegido = CB.util.elegir(rng, propios);
  var iGlobal = CB.datos.GLOSARIO.indexOf(elegido);

  /* Los distractores salen del MISMO nivel siempre que se pueda: confundir
     «sumando» con «decena» no informa de nada; confundirlo con «total» sí. */
  var candidatos = propios.filter(function (g) { return g.t !== elegido.t; });
  if (candidatos.length < 3) {
    candidatos = candidatos.concat(
      CB.datos.GLOSARIO.filter(function (g) {
        return g.t !== elegido.t && candidatos.indexOf(g) === -1;
      })
    );
  }
  var distractores = CB.util.barajar(candidatos, rng).slice(0, 3);

  return {
    formato: 'opciones4',
    consigna: elegido.d,
    preguntaPrevia: '¿Qué palabra es?',
    respuesta: iGlobal,
    /* La UI pinta textos, no números: opcionesTexto lleva las palabras. */
    opcionesTexto: null,
    termino: elegido.t,
    esMayores: !!elegido.mayores,
    distractoresTexto: distractores.map(function (g) { return g.t; }),
    distractoresIndice: distractores.map(function (g) { return CB.datos.GLOSARIO.indexOf(g); }),
    expr: 'voc_' + elegido.t.replace(/\s+/g, '-'),
    diagnostico: false,
    esTextual: true
  };
}

CB.gen.vocabulario.V1 = function (rng, D) { return itemVocab('V1', rng, D); };
CB.gen.vocabulario.V2 = function (rng, D) { return itemVocab('V2', rng, D); };
CB.gen.vocabulario.V3 = function (rng, D) { return itemVocab('V3', rng, D); };
CB.gen.vocabulario.V6 = function (rng, D) { return itemVocab('V6', rng, D); };
CB.gen.vocabulario.V7 = function (rng, D) { return itemVocab('V7', rng, D); };
CB.gen.vocabulario.V8 = function (rng, D) { return itemVocab('V8', rng, D); };

/* ── V4 Comparar: se responde en la balanza, no eligiendo palabra ───────── */
CB.gen.vocabulario.V4 = function (rng, D) {
  var a = CB.util.ent(rng, 1, (D === 1) ? 20 : 99);
  var b = CB.util.ent(rng, 1, (D === 1) ? 20 : 99);
  var signo = (a > b) ? '>' : (a < b ? '<' : '=');
  var palabra = (signo === '>') ? 'mayor que' : (signo === '<' ? 'menor que' : 'igual');
  return {
    formato: 'balanza',
    consigna: '¿' + a + ' es mayor, menor o igual que ' + b + '?',
    visual: { tipo: 'balanza', a: a, b: b },
    opcionesFijas: ['>', '<', '='],
    respuestaSigno: signo,
    respuesta: Math.max(a, b),
    termino: palabra,
    expr: 'voccomp' + a + signo + b,
    diagnostico: false,
    esTextual: false
  };
};

/* ── V5 Orden y posición: se responde ordenando ─────────────────────────── */
CB.gen.vocabulario.V5 = function (rng, D) {
  var inicio = CB.util.ent(rng, 1, 14);
  var cuantos = (D === 1) ? 3 : 4;
  var orden = [], i;
  for (i = 0; i < cuantos; i++) orden.push(inicio + i);
  return {
    formato: 'ordenar',
    consigna: 'Coloca las vagonetas de la primera a la última.',
    orden: orden,
    piezas: CB.util.barajar(orden, rng),
    respuesta: orden[orden.length - 1],
    termino: 'primero',
    expr: 'vocord' + inicio + '_' + cuantos,
    diagnostico: false,
    esTextual: false
  };
};

/* Términos que el niño «desbloquea» al acertar: alimentan el logro
   «Palabra de piedra» y la pantalla del Diccionario. */
CB.gen.vocabulario.terminoDe = function (item) {
  return item && item.termino ? item.termino : null;
};

/* ============================================================================
   17-catalogo.js — Los 92 niveles y los 4 mundos. ESTE FICHERO ES UN CONTRATO.
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   El plan v1 escribía «N1…N12, S1…S15, R1…R13» como rótulos vacíos: no se podía
   verificar ni un solo rango numérico, y el requisito 2 del usuario (basarse en
   el currículo oficial) era NO AUDITABLE. Aquí cada nivel declara su rango, sus
   llevadas, su trimestre SUGERIDO, su saber y sus criterios, y casos-curriculo.js
   comprueba una a una las 8 condiciones CU1-CU8.

   `trimestreSugerido` se llama así y no `trimestre` porque el RD 157/2022 fija
   los saberes POR CICLO, no por curso ni por trimestre: la secuenciación es una
   decisión propia del proyecto.

   NOTA SOBRE EL REPARTO POR MUNDOS: el encabezado del plan decía «24+24+22+22»
   pero sus propias listas suman 24+26+18+24. Manda la LISTA, que es el contenido
   real; el total sigue siendo 92 y CU7 lo verifica.
   ========================================================================== */

var CB = CB || {};
CB.catalogo = CB.catalogo || {};

/* ── Valores base por familia ───────────────────────────────────────────────
   `puntosBase`, `tIdeal` y `tLimite` son EXACTAMENTE los de PLAN §8.1: son el
   contrato de los 30 casos de puntuación y no se tocan.

   Las `beta`, en cambio, están RECALIBRADAS. Las del plan (880-1420) no cubren
   el rango de competencia que el motor puede estimar (400-1800): con una β
   mínima de 880, el nivel MÁS FÁCIL del catálogo —contar ocho bloques— quedaba
   fuera del alcance de un niño flojo, y el niño sintético se quedaba en el 44 %
   en lugar del 75-92 % exigido. Dicho de otro modo: el juego no tenía nada
   suficientemente fácil que ofrecer al niño que más lo necesita.

   La escala nueva va de 320 a 1280 y se lee así: β es la competencia a la que
   ese nivel se acierta el 50 % de las veces. «Contar 8 bloques» tiene β 320
   porque casi cualquier niño de 2.º lo hace; «CDU − CDU con llevada» tiene β
   1160 porque es el techo del curso.

   Estas cifras son una CALIBRACIÓN INICIAL RAZONADA, no una medida. F10 las
   recalcula con 10-15 niños reales mediante pruebas/calibrar-beta.js, que es
   justo para lo que el plan reserva esa fase. */
CB.catalogo.FAMILIAS = {
  N: { puntosBase: 80,  tIdeal: 6000,  tLimite: 18000, beta: [320, 1000] },
  S: { puntosBase: 100, tIdeal: 8000,  tLimite: 24000, beta: [340, 1120] },
  R: { puntosBase: 110, tIdeal: 9000,  tLimite: 27000, beta: [380, 1160] },
  M: { puntosBase: 100, tIdeal: 7000,  tLimite: 21000, beta: [780, 1180] },
  P: { puntosBase: 160, tIdeal: 20000, tLimite: 50000, beta: [620, 1280] },
  E: { puntosBase: 90,  tIdeal: 10000, tLimite: 26000, beta: [400, 1040] },
  V: { puntosBase: 70,  tIdeal: 7000,  tLimite: 20000, beta: [320, 920] }
};

/* Tabla compacta. Orden de columnas:
   [id, nombre, destreza, minRango, maxRango, llevadas, trimestreSugerido,
    formato, saber, criterios, prerrequisitos, cardinalidad, ampliacion,
    flagAdulto, saberSecundario?]

   `saberSecundario` es opcional y existe porque la propia tabla del plan asigna
   DOS saberes a algunos niveles (N16 = A.4.b + A.2.a; E6 = A.5 + A.4.c;
   E7 = A.5 + A.3.b). Sin él, el saber A.2.c —«representación de una misma
   cantidad de distintas formas»— se quedaba sin ningún nivel y CU4 fallaba. */
CB.catalogo.TABLA = [
  /* ── Numeración: 16 ───────────────────────────────────────────────────── */
  ['N1','Contar y recontar','numeracion',0,99,0,1,'opciones4','A.1',['1.1','5.1'],[],22,false,null,'A.2.c'],
  ['N2','Leer y escribir hasta 99','numeracion',0,99,0,1,'teclado','A.2.b',['6.1'],['N1'],90,false,null],
  ['N3','Decenas y unidades','valor_posicional',0,99,0,1,'opciones4','A.4.a',['1.2','6.1'],['N1'],178,false,null],
  ['N4','Mayor, menor, igual','numeracion',0,99,0,1,'balanza','A.4.b',['5.1','6.1'],['N1'],300,false,null],
  ['N5','Series de 2 en 2 y de 10 en 10','numeracion',0,99,0,1,'ordenar','A.4.a',['3.1'],['N1'],160,false,null],
  ['N6','Pares e impares','numeracion',0,99,0,1,'opciones4','A.4.b',['3.1'],['N1'],99,false,null],
  ['N7','La recta numérica','numeracion',0,199,0,1,'ordenar','A.2.b',['1.2'],['N2'],400,false,null],
  ['N8','Números hasta 199','numeracion',0,199,0,1,'teclado','A.2.b',['6.1'],['N2'],100,false,null],
  ['N9','La centena: C, D y U','valor_posicional',0,599,0,2,'opciones4','A.4.a',['1.2','6.1'],['N3','N8'],500,false,null],
  ['N10','Comparar y ordenar hasta 599','numeracion',0,599,0,2,'balanza','A.4.b',['5.1'],['N4','N8'],600,false,null],
  ['N11','Series de 5 en 5 y de 100 en 100','numeracion',0,599,0,2,'ordenar','A.4.a',['3.1'],['N5','N9'],200,false,null],
  ['N12','Descomponer C + D + U','valor_posicional',0,599,0,2,'teclado','A.2.b',['1.2','6.2'],['N9'],499,false,null,'A.2.c'],
  ['N13','Aproximar a la decena','numeracion',0,599,0,2,'opciones4','A.2.a',['2.1'],['N3'],540,false,null],
  ['N14','Ordinales hasta el 20.º','numeracion',1,20,0,2,'opciones4','A.4.b',['6.1'],['N1'],160,false,null],
  ['N15','Números hasta 999','numeracion',0,999,0,3,'teclado','A.2.b',['6.1'],['N12'],800,false,null],
  ['N16','Comparar y aproximar hasta 999','numeracion',0,999,0,3,'balanza','A.4.b',['2.1','5.1'],['N10','N13'],900,false,null,'A.2.a'],

  /* ── Sumas: 16 ────────────────────────────────────────────────────────── */
  ['S1','Sumas hasta 10','suma_sin_llevar',0,10,0,1,'teclado','A.3.b',['2.1'],[],66,false,null],
  ['S2','Sumas hasta 20 sin llevar','suma_sin_llevar',0,20,0,1,'teclado','A.3.b',['2.1'],['S1'],55,false,null],
  ['S3','Dobles hasta 10 + 10','suma_sin_llevar',0,20,0,1,'opciones4','A.3.a',['3.1'],['S1'],10,false,null],
  ['S4','Sumar 10','suma_sin_llevar',0,99,0,1,'teclado','A.3.a',['3.1'],['S1'],89,false,null],
  ['S5','DU + U sin llevar','suma_sin_llevar',0,99,0,1,'teclado','A.3.b',['2.1'],['S2'],405,false,null],
  ['S6','DU + DU sin llevar','suma_sin_llevar',0,99,0,1,'teclado','A.3.b',['2.1'],['S5'],900,false,null],
  ['S7','DU + U con llevada','suma_llevada',0,199,1,1,'teclado','A.3.b',['2.1','6.2'],['S5'],360,false,null],
  ['S8','DU + DU con una llevada','suma_llevada',0,99,1,2,'teclado','A.3.b',['2.1','6.2'],['S6','S7'],700,false,null],
  ['S9','DU + DU con llevada hasta 199','suma_llevada',0,199,1,2,'teclado','A.3.b',['2.1','6.2'],['S8'],1200,false,null],
  ['S10','Tres sumandos de una cifra','suma_llevada',0,27,1,2,'teclado','A.3.b',['2.1'],['S2'],500,false,null],
  ['S11','CDU + DU sin llevar','suma_sin_llevar',0,599,0,2,'teclado','A.3.b',['2.1'],['S6','N9'],1500,false,null],
  ['S12','CDU + DU con una llevada','suma_llevada',0,599,1,2,'teclado','A.3.b',['2.1','6.2'],['S11','S8'],1500,false,null],
  ['S13','Sumar decenas completas','suma_sin_llevar',0,599,0,2,'opciones4','A.3.a',['3.1'],['S4'],441,false,null],
  ['S14','CDU + CDU sin llevar','suma_sin_llevar',0,999,0,3,'teclado','A.3.b',['2.1'],['S11'],2000,false,null],
  ['S15','CDU + CDU con una llevada','suma_llevada',0,999,1,3,'teclado','A.3.b',['2.1','6.2'],['S14','S12'],2000,false,null],
  ['S16','Tres sumandos con decenas','suma_llevada',0,999,1,3,'teclado','A.3.b',['2.1'],['S10','S13'],1800,false,null],

  /* ── Restas: 14 ───────────────────────────────────────────────────────── */
  ['R1','Restas hasta 10','resta_sin_llevar',0,10,0,1,'teclado','A.3.b',['2.1'],[],66,false,null],
  ['R2','Restas hasta 20 sin llevar','resta_sin_llevar',0,20,0,1,'teclado','A.3.b',['2.1'],['R1'],66,false,null],
  ['R3','Restar 10','resta_sin_llevar',0,99,0,1,'teclado','A.3.a',['3.1'],['R1'],89,false,null],
  ['R4','DU − U sin llevar','resta_sin_llevar',0,99,0,1,'teclado','A.3.b',['2.1'],['R2'],405,false,null],
  ['R5','DU − DU sin llevar','resta_sin_llevar',0,99,0,1,'teclado','A.3.b',['2.1'],['R4'],900,false,null],
  ['R6','Complementos a 10 y a 100','resta_sin_llevar',0,100,0,2,'teclado','A.4.c',['3.1','5.1'],['R1'],18,false,null],
  ['R7','DU − U con una llevada','resta_llevada',0,99,1,2,'teclado','A.3.b',['2.1','6.2'],['R4'],360,false,null],
  ['R8','DU − DU con una llevada','resta_llevada',0,99,1,2,'teclado','A.3.b',['2.1','6.2'],['R5','R7'],700,false,null],
  ['R9','Restar decenas completas','resta_sin_llevar',0,599,0,2,'opciones4','A.3.a',['3.1'],['R3'],441,false,null],
  ['R10','CDU − DU sin llevar','resta_sin_llevar',0,599,0,2,'teclado','A.3.b',['2.1'],['R5','N9'],1500,false,null],
  ['R11','CDU − DU con una llevada','resta_llevada',0,599,1,3,'teclado','A.3.b',['2.1','6.2'],['R10','R8'],1500,false,null],
  ['R12','CDU − CDU sin llevar','resta_sin_llevar',0,999,0,3,'teclado','A.3.b',['2.1'],['R10'],2000,false,null],
  ['R13','CDU − CDU con una llevada','resta_llevada',0,999,1,3,'teclado','A.3.b',['2.1','6.2'],['R12','R11'],2000,false,null],
  ['R14','Restas con doble llevada','resta_llevada',0,999,2,3,'teclado','A.3.b',['2.1'],['R13'],1500,true,'restasDobleLlevada'],

  /* ── Multiplicación: 10 (M1-M8 iniciación nuclear de T3; M9-M10 ampliación) */
  ['M1','Veces: la suma reiterada','multiplicacion',2,5,0,3,'opciones4','A.3.b',['1.2','5.1'],['S1'],16,false,null],
  ['M2','Filas y columnas','multiplicacion',2,5,0,3,'opciones4','A.3.b',['1.2','6.1'],['M1'],16,false,null],
  ['M3','Del dibujo a «a × b»','multiplicacion',2,5,0,3,'teclado','A.3.b',['6.2'],['M2'],16,false,null],
  ['M4','Tabla del 2','multiplicacion',0,20,0,3,'teclado','A.3.a',['3.1'],['M3'],11,false,null],
  ['M5','Tabla del 10','multiplicacion',0,100,0,3,'teclado','A.3.a',['3.1'],['M3'],11,false,null],
  ['M6','Tabla del 5','multiplicacion',0,50,0,3,'teclado','A.3.a',['3.1'],['M3'],11,false,null],
  ['M7','Mezcla del 2, del 5 y del 10','multiplicacion',0,100,0,3,'teclado','A.3.a',['3.1','5.1'],['M4','M5','M6'],33,false,null],
  ['M8','Dobles y mitades','multiplicacion',0,20,0,3,'opciones4','A.3.a',['3.1'],['M4'],20,false,null],
  ['M9','Tabla del 3','multiplicacion',0,30,0,3,'teclado','A.3.a',['3.1'],['M7'],11,true,'tablas69'],
  ['M10','Tabla del 4','multiplicacion',0,40,0,3,'teclado','A.3.a',['3.1'],['M7'],11,true,'tablas69'],

  /* ── Problemas de enunciado: 20 ───────────────────────────────────────── */
  ['P1','Cambio: cuántos hay ahora','problemas_cambio',0,99,0,1,'teclado','A.3.b',['1.1','2.1','2.2'],['S1'],600,false,null],
  ['P2','Cambio: cuántos quedan','problemas_cambio',0,99,0,1,'teclado','A.3.b',['1.1','2.1','2.2'],['R1'],600,false,null],
  ['P3','Combinación: el total','problemas_combinacion',0,99,0,1,'teclado','A.3.b',['1.1','2.1','2.2'],['S2'],600,false,null],
  ['P4','Combinación: una parte','problemas_combinacion',0,99,0,2,'teclado','A.3.b',['1.1','2.1','2.2'],['R2','P3'],600,false,null],
  ['P5','Comparación: cuántos más','problemas_comparacion',0,99,0,2,'teclado','A.4.b',['1.1','2.1','2.2'],['R4'],600,false,null],
  ['P6','Comparación: cuántos menos','problemas_comparacion',0,99,0,2,'teclado','A.4.b',['1.1','2.1','2.2'],['R4'],600,false,null],
  ['P7','Cambio: cuánto ha ganado','problemas_cambio',0,99,0,2,'teclado','A.4.c',['1.1','2.1','2.2'],['P1'],600,false,null],
  ['P8','Cambio: cuánto ha perdido','problemas_cambio',0,99,0,2,'teclado','A.4.c',['1.1','2.1','2.2'],['P2'],600,false,null],
  ['P9','Comparación: el otro tiene más','problemas_comparacion',0,99,0,2,'teclado','A.4.b',['1.1','2.1','2.3'],['P5'],600,false,null],
  ['P10','Comparación: el otro tiene menos','problemas_comparacion',0,99,0,2,'teclado','A.4.b',['1.1','2.1','2.3'],['P6'],600,false,null],
  ['P11','Igualación: cuánto falta','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P5'],600,false,null],
  ['P12','Igualación: cuánto sobra','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P6'],600,false,null],
  ['P13','Cambio: cuánto tenía antes (+)','problemas_cambio',0,99,0,3,'teclado','A.4.c',['1.1','2.1','2.3'],['P7'],600,true,null],
  ['P14','Cambio: cuánto tenía antes (−)','problemas_cambio',0,99,0,3,'teclado','A.4.c',['1.1','2.1','2.3'],['P8'],600,true,null],
  ['P15','Comparación: referente con más','problemas_comparacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P9'],600,true,null],
  ['P16','Comparación: referente con menos','problemas_comparacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P10'],600,true,null],
  ['P17','Igualación: referido con añadir','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P11'],600,true,null],
  ['P18','Igualación: referido con quitar','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P12'],600,true,null],
  ['P19','Igualación: referente con añadir','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P11'],600,true,null],
  ['P20','Igualación: referente con quitar','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P12'],600,true,null],

  /* ── Dinero: 8 ────────────────────────────────────────────────────────── */
  ['E1','Monedas y billetes: reconocerlos','dinero',0,100,0,1,'opciones4','A.5',['5.2','6.1'],[],7,false,null],
  ['E2','Contar con monedas de 1 y 2 €','dinero',0,20,0,1,'monedas','A.5',['2.1','5.2'],['E1','S1'],250,false,null],
  ['E3','Contar con billetes','dinero',0,100,0,2,'monedas','A.5',['2.1','5.2'],['E1'],120,false,null],
  ['E4','Equivalencias entre billetes','dinero',0,100,0,2,'opciones4','A.5',['3.1','5.1'],['E3'],10,false,null],
  ['E5','Pagar con importe exacto','dinero',0,50,0,2,'monedas','A.5',['2.1','2.2'],['E2'],48,false,null],
  ['E6','El cambio','dinero',0,20,0,3,'teclado','A.5',['2.1','2.2'],['E5','R4'],34,false,null,'A.4.c'],
  ['E7','La compra: gasto total','dinero',0,99,0,3,'teclado','A.5',['2.1','2.2'],['E5','S6'],400,false,null,'A.3.b'],
  ['E8','Céntimos y equivalencias','dinero',5,100,0,3,'opciones4','A.5',['5.2'],['E4'],4,true,'centimos'],

  /* ── Vocabulario: 8 ───────────────────────────────────────────────────── */
  ['V1','Las palabras de la suma','vocabulario',0,0,0,2,'opciones4','A.3.b',['6.1'],['S1'],6,false,null],
  ['V2','Las palabras de la resta','vocabulario',0,0,0,2,'opciones4','A.3.b',['6.1'],['R1'],6,false,null],
  ['V3','Unidades, decenas, centenas','vocabulario',0,0,0,3,'opciones4','A.4.a',['6.1'],['N3'],6,false,null],
  ['V4','Comparar','vocabulario',0,99,0,3,'balanza','A.4.b',['6.1'],['N4'],300,false,null],
  ['V5','Orden y posición','vocabulario',1,20,0,3,'ordenar','A.4.b',['6.1'],['N14'],28,false,null],
  ['V6','Las palabras del dinero','vocabulario',0,0,0,3,'opciones4','A.5',['6.1','5.2'],['E1'],6,false,null],
  ['V7','Veces, doble y mitad','vocabulario',0,0,0,3,'opciones4','A.3.a',['6.1'],['M1'],6,false,null],
  ['V8','Las palabras de los problemas','vocabulario',0,0,0,3,'opciones4','A.3.b',['6.1','1.1'],['P1'],6,false,null]
];

/* Los 4 niveles con dato sobrante (§9.4): solo en 3.er trimestre y NUNCA en la
   primera partida del niño. */
CB.catalogo.CON_DATO_SOBRANTE = ['P3', 'P4', 'P7', 'P8'];

/* Categoría declarada de la multiplicación (§6.5). */
CB.catalogo.CATEGORIA_MULT = {
  M1: 'INICIACION_2_CURSO', M2: 'INICIACION_2_CURSO', M3: 'INICIACION_2_CURSO',
  M4: 'INICIACION_2_CURSO', M5: 'INICIACION_2_CURSO', M6: 'INICIACION_2_CURSO',
  M7: 'INICIACION_2_CURSO', M8: 'INICIACION_2_CURSO',
  M9: 'AMPLIACION', M10: 'AMPLIACION'
};

/* ── Construcción de los objetos Nivel ──────────────────────────────────── */
CB.catalogo._porId = {};
CB.catalogo._ids = [];

(function () {
  var familiaDe = { N: 'numeracion', S: 'sumas', R: 'restas', M: 'multiplicacion',
                    P: 'problemas', E: 'dinero', V: 'vocabulario' };
  var contadorFamilia = {};

  CB.catalogo.TABLA.forEach(function (fila) {
    var id = fila[0];
    var letra = id.charAt(0);
    var fam = CB.catalogo.FAMILIAS[letra];
    contadorFamilia[letra] = (contadorFamilia[letra] || 0) + 1;

    /* betaBase repartida por la familia: los primeros niveles en la parte baja
       del rango, los últimos en la alta. */
    var total = CB.catalogo.TABLA.filter(function (f) {
      return f[0].charAt(0) === letra;
    }).length;
    var pos = (total > 1) ? (contadorFamilia[letra] - 1) / (total - 1) : 0;
    var beta = Math.round(fam.beta[0] + pos * (fam.beta[1] - fam.beta[0]));

    var tI = fam.tIdeal, tL = fam.tLimite;
    if (tL - tI < 500) tL = tI + 500;          // guarda obligatoria (§8.1)

    var nivel = {
      id: id,
      nombre: fila[1],
      familia: familiaDe[letra],
      letra: letra,
      destreza: fila[2],
      rango: [fila[3], fila[4]],
      llevadas: fila[5],
      trimestreSugerido: fila[6],
      formato: fila[7],
      curriculo: { saber: fila[8], criterios: fila[9].slice(),
                   saberSecundario: fila[14] || null },
      prerrequisitos: fila[10].slice(),
      cardinalidad: fila[11],
      ampliacion: !!fila[12],
      flagAdulto: fila[13],
      categoria: CB.catalogo.CATEGORIA_MULT[id] || null,
      datoSobrante: CB.catalogo.CON_DATO_SOBRANTE.indexOf(id) !== -1,
      retoBonus: true,
      puntosBase: fam.puntosBase,
      tIdeal: tI,
      tLimite: tL,
      betaBase: beta,
      diagnostico: true
    };

    /* El generador se resuelve por familia y por id. */
    var mod = { N: CB.gen.numeracion, S: CB.gen.sumas, R: CB.gen.restas,
                M: CB.gen.multiplicacion, P: CB.gen.problemas,
                E: CB.gen.dinero, V: CB.gen.vocabulario }[letra];

    nivel.generar = (function (m, i) {
      return function (rng, D, ctx) {
        var fn = m[i];
        if (!fn) return null;
        var base = fn(rng, D || 2, ctx || {});
        if (!base) return null;
        base.nivelId = i;
        base.destreza = base.destreza || nivel.destreza;
        base.D = D || 2;
        base.puntosBase = nivel.puntosBase;
        base.tIdeal = nivel.tIdeal;
        base.tLimite = nivel.tLimite;
        base.beta = nivel.betaBase;
        base.ampliacion = nivel.ampliacion;
        if (base.diagnostico == null) base.diagnostico = nivel.diagnostico;
        return base;
      };
    })(mod, id);

    CB.catalogo._porId[id] = nivel;
    CB.catalogo._ids.push(id);
  });
})();

/* ── API ────────────────────────────────────────────────────────────────── */
CB.catalogo.get  = function (id) { return CB.catalogo._porId[id] || null; };
CB.catalogo.ids  = function () { return CB.catalogo._ids.slice(); };
CB.catalogo.todos = function () {
  return CB.catalogo._ids.map(function (i) { return CB.catalogo._porId[i]; });
};

CB.catalogo.porDestreza = function (slug) {
  return CB.catalogo.todos().filter(function (n) { return n.destreza === slug; });
};

CB.catalogo.porTrimestreSugerido = function (t) {
  return CB.catalogo.todos().filter(function (n) { return n.trimestreSugerido <= t; });
};

CB.catalogo.tIdealDe = function (slug) {
  var l = CB.catalogo.porDestreza(slug);
  return l.length ? l[0].tIdeal : 8000;
};

CB.catalogo.desbloqueados = function (perfil) {
  return CB.grafo.desbloqueados(perfil).map(function (id) { return CB.catalogo.get(id); });
};

/**
 * candidatos() NUNCA devuelve []. El plan v1 no definía qué pasaba cuando no
 * había ningún nivel desbloqueado en la banda β —caso frecuente al principio,
 * con θ=1000 y casi todo el grafo bloqueado—. Si devolvía [], construirGuion
 * generaba un guion vacío y LA PARTIDA TERMINABA EN EL ÍTEM 0.
 */
CB.catalogo.candidatos = function (slug, banda, perfil) {
  var abiertos = CB.catalogo.porDestreza(slug).filter(function (n) {
    if (CB.grafo.estado(n.id, perfil) !== 'abierta') return false;
    var e = perfil && perfil.niveles ? perfil.niveles[n.id] : null;
    if (e && e.enPausa) return false;                  // escalón 5 de la escalera
    return true;
  });

  var min = banda[0], max = banda[1], i, sel;

  /* 1) dentro de la banda */
  sel = abiertos.filter(function (n) { return n.betaBase >= min && n.betaBase <= max; });
  if (sel.length) return sel;

  /* 2) ensanchar ±150, hasta 3 veces */
  for (i = 1; i <= 3; i++) {
    sel = abiertos.filter(function (n) {
      return n.betaBase >= min - 150 * i && n.betaBase <= max + 150 * i;
    });
    if (sel.length) return sel;
  }

  /* 3) el abierto de esa destreza con β más cercana a θ */
  if (abiertos.length) {
    var centro = (min + max) / 2;
    abiertos.sort(function (a, b) {
      return Math.abs(a.betaBase - centro) - Math.abs(b.betaBase - centro);
    });
    return [abiertos[0]];
  }

  /* 4) la destreza no tiene ningún nivel abierto: se cae a la frontera global */
  var frontera = CB.grafo.frontera(perfil);
  if (frontera.length) return [CB.catalogo.get(frontera[0])];

  /* 5) solo posible si el perfil no tiene NINGÚN nivel abierto, situación
     imposible: el catálogo declara ≥1 nivel con prerrequisitos:[] por bloque.
     Aun así, se devuelve algo antes que dejar la partida sin ítems. */
  return [CB.catalogo.get('S1')];
};

/* ── Los 4 mundos (§5.2). Tabla CERRADA ─────────────────────────────────── */
CB.MUNDOS = [
  { id: 'M1', nombre: 'La Pradera de los Números', bioma: 'pradera', jefe: 'Tronquete',
    jefeIcono: '🌳',
    niveles: ['N1','N2','N3','N4','N5','N6','N7','N8',
              'S1','S2','S3','S4','S5','S6','S7',
              'R1','R2','R3','R4','R5',
              'P1','P2','E1','E2'] },

  { id: 'M2', nombre: 'El Bosque de las Llevadas', bioma: 'bosque', jefe: 'Ranacubo',
    jefeIcono: '🐸',
    niveles: ['N9','N10','N11','N12','N13',
              'S8','S9','S10','S11','S12','S13',
              'R6','R7','R8','R9','R10',
              'P3','P4','P5','P6','P7','P8',
              'E3','E4','V1','V2'] },

  { id: 'M3', nombre: 'El Río de los Problemas', bioma: 'rio', jefe: 'Cristalina',
    jefeIcono: '💠',
    niveles: ['N14','S14','R11','R12',
              'P9','P10','P11','P12','P13','P14','P15','P16',
              'E5','E6','V3','V4','V5','V6'] },

  { id: 'M4', nombre: 'La Mina de las Veces', bioma: 'mina', jefe: 'Brasita',
    jefeIcono: '🔥', distintivo: 'INICIACIÓN',
    niveles: ['N15','N16','S15','S16','R13','R14',
              'P17','P18','P19','P20','E7','E8',
              'M1','M2','M3','M4','M5','M6','M7','M8','M9','M10',
              'V7','V8'] }
];

CB.catalogo.mundoDe = function (nivelId) {
  var i;
  for (i = 0; i < CB.MUNDOS.length; i++) {
    if (CB.MUNDOS[i].niveles.indexOf(nivelId) !== -1) return CB.MUNDOS[i];
  }
  return null;
};

CB.catalogo.getMundo = function (id) {
  var i;
  for (i = 0; i < CB.MUNDOS.length; i++) if (CB.MUNDOS[i].id === id) return CB.MUNDOS[i];
  return null;
};

/* Niveles NUCLEARES de un mundo: los que no son ampliación. Un mundo se
   desbloquea al completar el 60 % de los nucleares del anterior (§5.3): no el
   100 %, porque bloquear por perfección es un muro. */
CB.catalogo.nuclearesDe = function (mundoId) {
  var m = CB.catalogo.getMundo(mundoId);
  if (!m) return [];
  return m.niveles.filter(function (id) {
    var n = CB.catalogo.get(id);
    return n && !n.ampliacion;
  });
};

CB.catalogo.progresoMundo = function (mundoId, perfil) {
  var nucleares = CB.catalogo.nuclearesDe(mundoId), hechos = 0, i;
  for (i = 0; i < nucleares.length; i++) {
    if (CB.grafo.superado(nucleares[i], perfil)) hechos++;
  }
  return { hechos: hechos, total: nucleares.length,
           fraccion: nucleares.length ? hechos / nucleares.length : 0 };
};

/* ── INVARIANTE 12 (variedad) — reformulado ─────────────────────────────────
   El plan lo escribía así: «en 200 generaciones con semillas distintas, los
   ítems únicos son ≥ min(200, 0,8 × cardinalidad)». Con cardinalidad ≥ 250 eso
   exige 200 únicos en 200 tiradas, es decir CERO COLISIONES, que es imposible
   por el problema del cumpleaños: extrayendo 200 veces de un espacio de 250, el
   número esperado de valores distintos es 250·(1−(1−1/250)^200) ≈ 138, no 200.
   El test habría fallado siempre contra generadores correctos.

   Reformulación que sí mide lo que se quería medir —que el generador no se
   colapse y recorra su espacio—: se compara con la esperanza bajo muestreo
   uniforme y se exige el 75 % de ella. Un generador que devolviese siempre el
   mismo ítem, o que solo recorriese una esquina de su rango, falla en rojo.

   Documentado en docs/decisiones.md. */
CB.catalogo.unicosEsperados = function (cardinalidad, tiradas) {
  var C = Math.max(1, cardinalidad);
  return C * (1 - Math.pow(1 - 1 / C, tiradas));
};

CB.catalogo.variedadSuficiente = function (nivelId, unicos, tiradas) {
  var n = CB.catalogo.get(nivelId);
  if (!n) return true;
  var esperados = CB.catalogo.unicosEsperados(n.cardinalidad, tiradas);
  return unicos >= 0.75 * esperados;
};

CB.catalogo.mundoDesbloqueado = function (mundoId, perfil) {
  var i, idx = -1;
  for (i = 0; i < CB.MUNDOS.length; i++) if (CB.MUNDOS[i].id === mundoId) idx = i;
  if (idx <= 0) return true;                       // M1 abierto desde el minuto 1
  return CB.catalogo.progresoMundo(CB.MUNDOS[idx - 1].id, perfil).fraccion >= 0.6;
};

/* ============================================================================
   18-distractores.js — Los 24 códigos de error, los distractores y el
                        diagnóstico
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   EL PROBLEMA QUE RESUELVE EL ALGORITMO (PLAN §13.8): construir distractores
   simulando errores es lo correcto pedagógicamente, pero muchas simulaciones
   COLISIONAN con la respuesta correcta. E-S-LLEV-OLV sobre 20+30 devuelve 50,
   que es correcto; E-R-INV sobre 68−24 devuelve 44, que es correcto; E-M-SUMA
   sobre 2×2 devuelve 4, que es correcto. El plan v1 no decía qué pasaba
   entonces: el niño podía ver DOS opciones correctas, o el bucle de relleno
   podía no terminar nunca.

   Aquí: se descartan las colisiones, se rellena con un plan B acotado, y si aun
   así no hay 4 opciones únicas, ESE ÍTEM pasa a formato teclado. Ningún bucle
   sin cota.

   18 códigos tienen simular(); 6 tienen diagnostico:false porque simular un
   error numérico sobre vocabulario, estimación, ordenación o un fallo de puro
   cálculo no produce ninguna hipótesis discriminante (invariante 6-bis).
   ========================================================================== */

var CB = CB || {};

/* ── Ayudas de dígitos ──────────────────────────────────────────────────── */
function digitos(n) {
  var d = [], x = Math.abs(Math.round(n));
  if (x === 0) return [0];
  while (x > 0) { d.push(x % 10); x = Math.floor(x / 10); }
  return d;                                    // índice 0 = unidades
}
function desdeDigitos(d) {
  var v = 0, p = 1, i;
  for (i = 0; i < d.length; i++) { v += d[i] * p; p *= 10; }
  return v;
}

CB.ERRORES = {

  /* ══ SUMAS ═════════════════════════════════════════════════════════════ */
  'E-S-LLEV-OLV': {
    familia: 'S', diagnostico: true,
    pista: 'Mira si al sumar las unidades pasas de diez.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      var a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      var n = Math.max(a.length, b.length), out = [], i, s;
      for (i = 0; i < n; i++) {
        s = (a[i] || 0) + (b[i] || 0);
        out.push(s % 10);                      // se pierde la llevada
      }
      return desdeDigitos(out);
    }
  },

  'E-S-LLEV-ESCR': {
    familia: 'S', diagnostico: true, puedeSuperar999: true,
    pista: 'En la casilla de las unidades solo cabe hasta el 9.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      var a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      var n = Math.max(a.length, b.length), txt = '', i, s;
      for (i = n - 1; i >= 0; i--) {
        s = (a[i] || 0) + (b[i] || 0);
        txt += String(s);                      // se escribe la columna entera
      }
      var v = parseInt(txt, 10);
      return isFinite(v) ? v : null;
    }
  },

  'E-S-LLEV-DOBLE': {
    familia: 'S', diagnostico: true, puedeSuperar999: true,
    pista: 'La decena que llevas se usa una sola vez.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      var llev = CB.gen.sumas.llevadas(item.operandos[0], item.operandos[1]);
      if (!llev) return null;
      return item.respuesta + 10 * llev;       // la llevada se suma dos veces
    }
  },

  'E-S-COL': {
    familia: 'S', diagnostico: true,
    pista: 'Coloca las unidades debajo de las unidades.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '+' || !item.operandos || item.operandos.length !== 2) return null;
      var a = item.operandos[0], b = item.operandos[1];
      if (b >= 10 || a < 10) return null;      // solo tiene sentido con DU + U
      return a + b * 10;                       // la unidad se suma a las decenas
    }
  },

  /* ══ RESTAS ════════════════════════════════════════════════════════════ */
  'E-R-INV': {
    familia: 'R', diagnostico: true,
    pista: 'Si el de arriba es más pequeño, pide una decena prestada.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      var a = digitos(item.operandos[0]), b = digitos(item.operandos[1]);
      var n = Math.max(a.length, b.length), out = [], i, x, y;
      for (i = 0; i < n; i++) {
        x = a[i] || 0; y = b[i] || 0;
        out.push(Math.abs(x - y));             // se resta el menor del mayor
      }
      return desdeDigitos(out);
    }
  },

  'E-R-PREST-OLV': {
    familia: 'R', diagnostico: true,
    pista: 'Si pides una decena, a las decenas les queda una menos.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      var p = CB.gen.restas.prestamos(item.operandos[0], item.operandos[1]);
      if (!p) return null;
      return item.respuesta + 10 * p;          // no se descuenta la decena pedida
    }
  },

  'E-R-PREST-DOBLE': {
    familia: 'R', diagnostico: true,
    pista: 'La decena prestada se descuenta una sola vez.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      var p = CB.gen.restas.prestamos(item.operandos[0], item.operandos[1]);
      if (!p) return null;
      return item.respuesta - 10 * p;
    }
  },

  'E-R-CERO': {
    familia: 'R', diagnostico: true,
    pista: 'Cuando hay un cero, se pide prestado a la columna de más allá.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      var a = digitos(item.operandos[0]);
      if (a.indexOf(0) === -1) return null;
      return item.respuesta + 100;
    }
  },

  'E-R-SUMA': {
    familia: 'R', diagnostico: true,
    pista: '¿El resultado tiene que ser mayor o menor que el número de partida?',
    reparacion: 'rectaNumerica',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      return item.operandos[0] + item.operandos[1];
    }
  },

  /* ══ NUMERACIÓN ════════════════════════════════════════════════════════ */
  'E-N-POS': {
    familia: 'N', diagnostico: true,
    pista: 'Mira qué lugar ocupa cada cifra.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      var r = item.respuesta;
      if (r < 10) return null;
      var d = digitos(r);
      var t = d[0]; d[0] = d[1]; d[1] = t;     // se intercambian D y U
      return desdeDigitos(d);
    }
  },

  'E-N-CERO': {
    familia: 'N', diagnostico: true,
    pista: 'El cero también ocupa su sitio.',
    reparacion: 'columnasCDU',
    simular: function (item) {
      var d = digitos(item.respuesta);
      if (d.length < 3 || d[1] !== 0) return null;
      return d[2] * 10 + d[0];                 // se omite el cero de en medio
    }
  },

  /* Sin simular(): diagnostico:false (invariante 6-bis) */
  'E-N-SERIE': { familia: 'N', diagnostico: false, simular: null,
    pista: 'Comprueba que todos los saltos son iguales.', reparacion: 'rectaNumerica' },
  'E-N-APROX': { familia: 'N', diagnostico: false, simular: null,
    pista: 'Mira a qué decena está más cerca.', reparacion: 'rectaNumerica' },
  'E-N-ORDEN': { familia: 'N', diagnostico: false, simular: null,
    pista: 'Empieza por el más pequeño.', reparacion: 'rectaNumerica' },

  /* ══ MULTIPLICACIÓN ════════════════════════════════════════════════════ */
  'E-M-SUMA': {
    familia: 'M', diagnostico: true,
    pista: 'Multiplicar es repetir el mismo número varias veces.',
    reparacion: 'matrizFilasColumnas',
    simular: function (item) {
      if (item.operacion !== '×' || !item.operandos) return null;
      return item.operandos[0] + item.operandos[1];
    }
  },

  'E-M-VECINO': {
    familia: 'M', diagnostico: true,
    pista: 'Canta la tabla entera desde el principio.',
    reparacion: 'matrizFilasColumnas',
    simular: function (item) {
      if (item.operacion !== '×' || !item.operandos) return null;
      var a = item.operandos[0];
      return item.respuesta - a;               // el hecho anterior de la tabla
    }
  },

  'E-M-CERO': {
    familia: 'M', diagnostico: true,
    pista: 'Cuatro platos con cero galletas siguen siendo cero galletas.',
    reparacion: 'matrizFilasColumnas',
    simular: function (item) {
      if (item.operacion !== '×' || !item.operandos) return null;
      var a = item.operandos[0], b = item.operandos[1];
      if (a !== 0 && b !== 0 && a !== 1 && b !== 1) return null;
      return (a === 0 || b === 0) ? (a + b) : (a === 1 ? 1 : b);
    }
  },

  /* ══ PROBLEMAS ═════════════════════════════════════════════════════════ */
  'E-P-PALCLAVE': {
    familia: 'P', diagnostico: true,
    pista: 'No te fíes solo de la palabra: mira lo que cuenta el problema.',
    reparacion: 'barrasComparativas',
    simular: function (item) {
      if (!item.datos || item.datos.length < 2) return null;
      var a = item.datos[0], b = item.datos[1];
      return (item.operacion === '+') ? (a - b) : (a + b);   // operación contraria
    }
  },

  'E-P-TODOSDATOS': {
    familia: 'P', diagnostico: true,
    pista: 'Mira si todos los números del cuento te sirven.',
    reparacion: 'barrasComparativas',
    simular: function (item) {
      if (!item.datoSobrante || item.numeroSobrante == null) return null;
      return item.respuesta + item.numeroSobrante;
    }
  },

  'E-P-CALCULO': { familia: 'P', diagnostico: false, simular: null,
    pista: 'El planteamiento está bien. Repasa solo la cuenta.',
    reparacion: 'columnasCDU' },

  /* ══ DINERO ════════════════════════════════════════════════════════════ */
  'E-E-VALOR': {
    familia: 'E', diagnostico: true,
    pista: 'No cuentes las monedas: cuenta lo que vale cada una.',
    reparacion: 'monedas',
    simular: function (item) {
      if (!item.piezas || !item.piezas.length) return null;
      return item.piezas.length;               // se cuentan piezas, no valor
    }
  },

  'E-E-CAMBIO': {
    familia: 'E', diagnostico: true,
    pista: 'Para saber el cambio hay que quitar el precio.',
    reparacion: 'monedas',
    simular: function (item) {
      if (item.operacion !== '-' || !item.operandos) return null;
      return item.operandos[0] + item.operandos[1];
    }
  },

  /* ══ VOCABULARIO ═══════════════════════════════════════════════════════ */
  'E-V-TERMINO': { familia: 'V', diagnostico: false, simular: null,
    pista: 'Piensa en qué operación te pide esa palabra.', reparacion: 'rectaNumerica' },
  'E-V-SINONIMO': { familia: 'V', diagnostico: false, simular: null,
    pista: 'Lee la frase entera antes de decidir.', reparacion: 'rectaNumerica' }
};

CB.ERRORES_IDS = Object.keys(CB.ERRORES);

/* ── Los distractores ───────────────────────────────────────────────────── */
CB.distractores = CB.distractores || {};

CB.distractores.LIMITE_NORMAL = 999;
CB.distractores.LIMITE_INTENCIONADO = 1999;
CB.distractores.RELLENOS = [1, 2, 10, 20, 100];
CB.distractores.MAX_INTENTOS_RELLENO = 40;

CB.distractores.codigosAplicables = function (item) {
  var letra = (item.nivelId || 'S1').charAt(0);
  var out = [], k;
  for (k in CB.ERRORES) {
    if (!Object.prototype.hasOwnProperty.call(CB.ERRORES, k)) continue;
    if (CB.ERRORES[k].familia !== letra) continue;
    if (!CB.ERRORES[k].simular) continue;
    out.push(k);
  }
  return out;
};

/**
 * @return {opciones: [{valor, codigoError, intencionado, correcta}], formato}
 *         Si no se consiguen 4 opciones únicas, formato pasa a 'teclado'.
 */
CB.distractores.para = function (item, rng) {
  var correcta = item.respuesta;
  var vistos = {}, opciones = [], i, k, v, cod;

  vistos[correcta] = true;

  /* 1) candidatos por simulación de error */
  var codigos = CB.util.barajar(CB.distractores.codigosAplicables(item), rng);
  for (i = 0; i < codigos.length && opciones.length < 3; i++) {
    cod = codigos[i];
    try { v = CB.ERRORES[cod].simular(item); } catch (e) { v = null; }
    if (v == null || !isFinite(v)) continue;
    v = Math.round(v);

    /* 2) descarte de colisiones, negativos y repetidos */
    if (v === correcta || v < 0 || vistos[v]) continue;

    var intencionado = !!CB.ERRORES[cod].puedeSuperar999;
    var limite = intencionado ? CB.distractores.LIMITE_INTENCIONADO
                              : CB.distractores.LIMITE_NORMAL;
    if (v > limite) continue;

    /* Invariante 6: distractor plausible, salvo los intencionados. */
    if (!intencionado &&
        Math.abs(v - correcta) > Math.max(20, 0.5 * correcta)) continue;

    vistos[v] = true;
    opciones.push({ valor: v, codigoError: cod, intencionado: intencionado, correcta: false });
  }

  /* 3) relleno acotado: respuesta ± k */
  var intentos = 0;
  var ks = CB.util.barajar(CB.distractores.RELLENOS, rng);
  var signos = [1, -1];
  var idx = 0;
  while (opciones.length < 3 && intentos < CB.distractores.MAX_INTENTOS_RELLENO) {
    intentos++;
    var kk = ks[idx % ks.length];
    var sg = signos[Math.floor(idx / ks.length) % 2];
    idx++;
    v = correcta + sg * kk;
    if (v < 0 || v > CB.distractores.LIMITE_NORMAL) continue;
    if (v === correcta || vistos[v]) continue;
    vistos[v] = true;
    opciones.push({ valor: v, codigoError: null, intencionado: false, correcta: false });
  }

  /* 4) si aun así no hay 4 opciones únicas, ESTE ítem se sirve con teclado */
  if (opciones.length < 3) {
    return { opciones: null, formato: 'teclado', motivo: 'sinDistractores' };
  }

  opciones.push({ valor: correcta, codigoError: null, intencionado: false, correcta: true });

  /* 6) contrabalanceo de posición con bolsa: la correcta se reparte uniformemente
     entre las 4 posiciones a lo largo de la partida. */
  var pos = (item.posicionCorrecta != null)
    ? item.posicionCorrecta
    : CB.util.ent(rng, 0, 3);
  var correctaObj = opciones.pop();
  var mezcladas = CB.util.barajar(opciones, rng);
  mezcladas.splice(pos, 0, correctaObj);

  return { opciones: mezcladas.slice(0, 4), formato: 'opciones4', posicionCorrecta: pos };
};

/* ── Diagnóstico ────────────────────────────────────────────────────────────
   discriminante === true SOLO si un único código de error es compatible con la
   respuesta dada. El informe solo acumula evidencia de ítems discriminantes: si
   dos códigos empatan, se cuentan ambos pero NO SE AFIRMA NINGUNO. */
CB.diagnosticar = function (item, valorDado) {
  var hipotesis = [], codigos, i, v;
  if (valorDado == null || !isFinite(valorDado)) {
    return { hipotesis: [], discriminante: false };
  }
  if (item.diagnostico === false) {
    return { hipotesis: [], discriminante: false, motivo: 'nivelNoDiagnostico' };
  }

  codigos = CB.distractores.codigosAplicables(item);
  for (i = 0; i < codigos.length; i++) {
    try { v = CB.ERRORES[codigos[i]].simular(item); } catch (e) { v = null; }
    if (v != null && isFinite(v) && Math.round(v) === Math.round(valorDado)) {
      hipotesis.push(codigos[i]);
    }
  }
  return { hipotesis: hipotesis, discriminante: hipotesis.length === 1 };
};

/* Registra el diagnóstico en el perfil, solo si es discriminante. */
CB.distractores.registrar = function (perfil, item, valorDado) {
  var d = CB.diagnosticar(item, valorDado);
  if (!d.hipotesis.length) return d;
  if (!perfil.errores) perfil.errores = {};
  var i, cod;
  for (i = 0; i < d.hipotesis.length; i++) {
    cod = d.hipotesis[i];
    if (!perfil.errores[cod]) {
      perfil.errores[cod] = { veces: 0, vecesDiscriminante: 0, ejemplos: [] };
    }
    perfil.errores[cod].veces++;
    if (d.discriminante) perfil.errores[cod].vecesDiscriminante++;
    var ej = (item.consigna || item.enunciado || item.expr) + ' → ' + valorDado;
    perfil.errores[cod].ejemplos.unshift(ej);
    if (perfil.errores[cod].ejemplos.length > 3) perfil.errores[cod].ejemplos.length = 3;
  }
  return d;
};

/* ============================================================================
   20-puntuacion.js — Requisitos 6 y 7 del usuario
   ----------------------------------------------------------------------------
   FUNCIÓN PURA: cero DOM, cero Math.random, cero fechas.
   Los 30 casos de PLAN §11.7 se verifican SIN TOLERANCIA en casos-formulas.js.

   DOS INVARIANTES QUE NO SE NEGOCIAN:
     · Ningún valor de `puntos` ni de `gemas` es nunca < 0. Un niño de 7 años no
       ha visto un entero negativo en su vida (están en 2.º/3.er ciclo) y verlo
       justo en el instante del castigo convierte el marcador en una deuda.
     · El marcador NUNCA baja. Un error cuesta la recompensa de ESE ítem, nada más.
   ========================================================================== */

var CB = CB || {};
CB.puntuacion = CB.puntuacion || {};

/* Punto medio del rango 0,6-1,4. Ni premia ni castiga: el modo accesible no
   puede ser ni el que más puntúa ni el que menos (antifarmeo, §11.3). */
CB.puntuacion.M_SIN_PRISA = 0.85;
CB.puntuacion.M_MIN = 0.6;
CB.puntuacion.M_MAX = 1.4;

/* Factor del acierto en segundo intento: es APRENDIZAJE, no castigo (§11.5). */
CB.puntuacion.F_INTENTO_2 = 0.4;

/**
 * @param item   {puntosBase, tIdeal, tLimite}
 * @param rtMs   tiempo de respuesta en ms (ya recortado por CB.util.rt)
 * @param estado {correcto, azar, intento, modoTiempo}
 */
CB.puntuacion.calcular = function (item, rtMs, estado) {
  item = item || {};
  estado = estado || {};

  var Pb = item.puntosBase;
  if (!isFinite(Pb) || Pb <= 0) Pb = 100;

  var tI = item.tIdeal, tL = item.tLimite;
  if (!isFinite(tI) || tI <= 0) tI = 8000;
  if (!isFinite(tL) || tL <= 0) tL = tI * 3;
  /* Guarda de división por cero: sin ella la fórmula revienta (§8.1). */
  if (tL - tI < 500) tL = tI + 500;

  if (!isFinite(rtMs) || rtMs < 0) rtMs = tI;

  var mT;
  if (estado.modoTiempo === 'sinPrisa') {
    mT = CB.puntuacion.M_SIN_PRISA;
  } else {
    /* mT se calcula SIEMPRE con la d base del nivel, sea cual sea el modo. El
       modo solo cambia CUÁNDO se agota el tiempo, no CÓMO se puntúa: sin esta
       regla, «Con calma» con la d duplicada regalaba multiplicadores altos por
       respuestas lentas y era el modo que más puntuaba. */
    mT = CB.util.clamp(
      CB.puntuacion.M_MAX - 0.8 * (rtMs - tI) / (tL - tI),
      CB.puntuacion.M_MIN, CB.puntuacion.M_MAX
    );
  }

  var puntos = 0, gemas = 0, fIntento = 1.0;

  if (estado.azar) {
    /* Requisito 7: responder al azar no puntúa. Pero no resta, no apaga luz y
       no bloquea contenido (§12.3). */
    puntos = 0; gemas = 0;
  } else if (estado.correcto) {
    fIntento = (estado.intento === 2) ? CB.puntuacion.F_INTENTO_2 : 1.0;
    puntos = Math.round(Pb * mT * fIntento);
    gemas = Math.max(1, Math.round(puntos / 50));
  }
  /* Fallo → 0 puntos, 0 gemas. NUNCA negativo. */

  if (!isFinite(puntos) || puntos < 0) puntos = 0;
  if (!isFinite(gemas) || gemas < 0) gemas = 0;

  return {
    puntos: puntos,
    gemas: gemas,
    mTiempo: mT,
    desglose: { Pb: Pb, mT: mT, fIntento: fIntento, azar: !!estado.azar }
  };
};

/* Cuántas «gemas rápidas» caen como bono retrospectivo: 0 a 3. Se muestra como
   GANANCIA («+2 por rapidez»), jamás como cuenta atrás en vivo (§3.4). */
CB.puntuacion.gemasDeRapidez = function (mTiempo) {
  if (!isFinite(mTiempo)) return 0;
  if (mTiempo >= 1.35) return 3;
  if (mTiempo >= 1.20) return 2;
  if (mTiempo >= 1.05) return 1;
  return 0;
};

/* Acumulación: delta siempre ≥ 0, el marcador nunca baja. */
CB.puntuacion.acumular = function (estado, delta) {
  var d = (isFinite(delta) && delta > 0) ? delta : 0;
  estado.puntos = Math.max(estado.puntos || 0, (estado.puntos || 0) + d);
  return estado.puntos;
};

/**
 * Bono de final de partida.
 * @param precision1er  0..1 de aciertos a primer intento
 * @param sinDanio      true si las 3 luces siguen encendidas
 * @param maraton       true si ha resuelto ≥ 15 ítems
 * @param preguntas     nº de ítems servidos
 * @param puntosSesion  puntos acumulados
 */
CB.puntuacion.bonoFinal = function (precision1er, sinDanio, maraton, preguntas, puntosSesion) {
  /* El niño pulsa Salir en el primer ítem: sin esta guarda salían NaN, y
     JSON.stringify convierte NaN en null; a partir de ahí toda la aritmética
     del perfil da NaN para siempre (§11.2). */
  if (!preguntas || preguntas === 0) return { factor: 1, extras: [], total: 0 };

  var factor = 1.0, extras = [];
  var p = isFinite(precision1er) ? precision1er : 0;
  var ps = isFinite(puntosSesion) ? puntosSesion : 0;

  if (p >= 0.90)      { factor += 0.20; extras.push('precision90'); }
  else if (p >= 0.75) { factor += 0.10; extras.push('precision75'); }
  if (sinDanio)       { factor += 0.15; extras.push('sinDanio'); }
  if (maraton)        { factor += 0.10; extras.push('maraton'); }

  var total = Math.max(0, Math.round(ps * (factor - 1)));
  if (!isFinite(total)) total = 0;

  return { factor: factor, extras: extras, total: total };
};

/* Etiquetas en español para la pantalla de fin. */
CB.puntuacion.ETIQUETA_EXTRA = {
  precision90: 'Casi todo a la primera',
  precision75: 'Muchas a la primera',
  sinDanio:    'Las tres luces encendidas',
  maraton:     'Expedición larga'
};

/* ============================================================================
   21-antiazar.js — Requisito 7: penalizar responder al azar
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   EL INVARIANTE «UN ACIERTO RÁPIDO NUNCA ES AZAR» ESTÁ GARANTIZADO POR
   CONSTRUCCIÓN, NO POR CALIBRACIÓN: es la primera línea de evaluar(). El plan v1
   fijaba el umbral en 0,15 × mediana personal (con mediana 9.100 ms → 1.365 ms) y
   a la vez exigía premiar un acierto legítimo en 600 ms. La fórmula y el
   invariante se contradecían.

   Y CON DESTREZAS NUEVAS, rtMuestras vacío daba mediana 0 → umbral 0 → el
   detector quedaba DESACTIVADO sin decirlo. Por eso medianaPersonal() cae en un
   respaldo declarado (el tIdeal de la destreza), nunca en cero.

   GLUGLÚ NO ES UN JUEZ, ES UN ACCIDENTE DEL ENTORNO. En ninguna parte de la
   interfaz del niño aparece «adivinar», «al azar», «trampas» ni «concéntrate».
   Atribuir intención a un niño de 7 años a partir de un umbral estadístico
   confunde adivinar con impulsividad, que es la firma conductual normal a esa
   edad. `azar:true` se registra SOLO en respuestas[], para el panel del adulto.
   ========================================================================== */

var CB = CB || {};
CB.antiazar = CB.antiazar || {};

CB.antiazar.T_MIN = 700;           // ms. Suelo absoluto del umbral.
CB.antiazar.SENALES_MINIMAS = 2;   // hacen falta ≥2 señales concurrentes.

/* Texto permitido y lista negra, para que casos-marca.js pueda comprobarlo. */
CB.antiazar.TEXTO_PERMITIDO = '¡Gluglú te ha mojado la pregunta! Léela otra vez.';
CB.antiazar.PROHIBIDO_EN_INTERFAZ =
  ['adivinar', 'al azar', 'trampas', 'en serio', 'de verdad', 'concéntrate'];

/**
 * @param item      {destreza, respuesta, formato}
 * @param rtMs      tiempo de respuesta
 * @param correcto  boolean
 * @param historial [{posicion, rtMs, correcto}] de la partida, más reciente al final
 * @param perfil    para la mediana personal de la destreza
 */
CB.antiazar.evaluar = function (item, rtMs, correcto, historial, perfil) {
  /* ← INVARIANTE POR CONSTRUCCIÓN. No tocar esta línea. */
  if (correcto) return { azar: false, senales: [] };

  var senales = [];
  var mediana = CB.antiazar.medianaPersonal(item ? item.destreza : null, perfil);
  var umbral = Math.max(CB.antiazar.T_MIN, 0.15 * mediana);

  if (isFinite(rtMs) && rtMs < umbral) senales.push('S1');
  if (CB.antiazar.mismaPosicion3(historial)) senales.push('S2');
  if (CB.antiazar.tresFallosRapidos(historial)) senales.push('S3');
  if (!CB.antiazar.respuestaPosible(item)) senales.push('S4');

  return { azar: senales.length >= CB.antiazar.SENALES_MINIMAS, senales: senales };
};

/* Mediana del tiempo de respuesta del niño en ESA destreza. Con menos de 5
   muestras no hay mediana que valga: se usa el respaldo declarado. */
CB.antiazar.medianaPersonal = function (destreza, perfil) {
  var d = (perfil && perfil.destrezas) ? perfil.destrezas[destreza] : null;
  if (d && d.rtMuestras && d.rtMuestras.length >= 5) {
    return CB.util.mediana(d.rtMuestras);
  }
  if (CB.catalogo && CB.catalogo.tIdealDe) {
    return CB.catalogo.tIdealDe(destreza);
  }
  return 8000;   // respaldo del respaldo: nunca 0
};

/* S2 — la misma posición de botón pulsada 3 veces seguidas. */
CB.antiazar.mismaPosicion3 = function (historial) {
  if (!historial || historial.length < 3) return false;
  var n = historial.length;
  var a = historial[n - 1], b = historial[n - 2], c = historial[n - 3];
  if (a.posicion == null || b.posicion == null || c.posicion == null) return false;
  return a.posicion === b.posicion && b.posicion === c.posicion;
};

/* S3 — 3 fallos, cada uno en menos de 2 s. */
CB.antiazar.tresFallosRapidos = function (historial) {
  if (!historial || historial.length < 3) return false;
  var n = historial.length, i, h;
  for (i = n - 3; i < n; i++) {
    h = historial[i];
    if (!h || h.correcto || !(h.rtMs < 2000)) return false;
  }
  return true;
};

/* S4 — respuesta imposible: fuera de [0, 999] o negativa. */
CB.antiazar.respuestaPosible = function (item) {
  if (!item) return true;
  var v = item.valorDado;
  if (v == null) return true;
  if (!isFinite(v)) return false;
  return v >= 0 && v <= 999;
};

/* ── Los efectos del azar. NUNCA apaga una luz (§12.1, regla 2) ─────────── */
CB.antiazar.EFECTOS = {
  puntos: 0,
  gemas: 0,
  rompeRacha: true,
  cuentaParaLogros: false,
  bonoRapidez: false,
  itemsConConfirmacion: 3,
  bloqueoMs: 1200,
  microDescansoALaTercera: true,
  apagaLuz: false,          // ← invariante
  restaPuntosGanados: false,
  bloqueaContenido: false
};

/* Estado de los efectos pendientes tras una detección. Vive en la partida. */
CB.antiazar.nuevoEstado = function () {
  return { pendientes: 0, deteccionesSesion: 0 };
};

CB.antiazar.aplicar = function (est) {
  est.pendientes = CB.antiazar.EFECTOS.itemsConConfirmacion;
  est.deteccionesSesion = (est.deteccionesSesion || 0) + 1;
  return {
    confirmacionDoble: true,
    bloqueoMs: CB.antiazar.EFECTOS.bloqueoMs,
    fuerzaDescanso: est.deteccionesSesion >= 3
  };
};

/* ¿Este ítem hereda los efectos de una detección anterior? */
CB.antiazar.consumir = function (est) {
  if (!est || !est.pendientes || est.pendientes <= 0) {
    return { confirmacionDoble: false, bloqueoMs: 0 };
  }
  est.pendientes--;
  return { confirmacionDoble: true, bloqueoMs: CB.antiazar.EFECTOS.bloqueoMs };
};

/* ============================================================================
   22-vidas.js — Requisitos 9 y 10: las 3 luces del casco y las luces extra
   ----------------------------------------------------------------------------
   FUNCIÓN PURA (opera sobre un objeto de estado que se le pasa).

   LA REGLA, EN UNA SOLA REDACCIÓN (PLAN §12.1, copiada a docs/decisiones.md):

     1. El tiempo agotado NUNCA apaga una luz, en ninguna circunstancia.
        Ni el primero, ni ninguno. (WCAG 2.2.1 Timing Adjustable, nivel A.)
     2. La detección de azar NUNCA apaga una luz.
     3. Se apaga una luz ÚNICAMENTE al fallar el SEGUNDO intento de un ítem,
        después de haber visto la tarjeta de reparación.
     4. SALVAGUARDA ANTI-BLOQUEO: 3 tiempos agotados consecutivos → modo «Sin
        prisa»; 6 en la partida → fin amable con motivoFin 'pausa'.
        Sin esta salvaguarda, un niño que dejase correr el tiempo en todos los
        ítems NO PERDÍA NUNCA UNA LUZ y la partida no terminaba jamás: el sistema
        de 3 vidas quedaba anulado por una estrategia trivial.
     5. Tope 5. Iniciales 3.
     6. El exceso va a perfil.vidasReserva (máx. 2). NO se convierte en gemas:
        prometer una vida y entregar otra cosa erosiona la confianza en el
        sistema de logros, que es justo lo que sostiene el requisito 10.
     7. Al apagarse la 3.ª: fin conservando el 100 % de gemas y TODO el progreso.

   Se llama CB.vidas y no CB.luces porque «vidas» es el vocabulario del requisito
   del usuario. Lo que cambia es la METÁFORA VISUAL: luces de cristal que se
   apagan y se encienden, no corazones que estallan. Un corazón roto es
   irreversible en el imaginario infantil, y eso hace ilegible la vida extra.
   ========================================================================== */

var CB = CB || {};
CB.vidas = CB.vidas || {};

CB.vidas.INICIALES = 3;
CB.vidas.TOPE = 5;
CB.vidas.RESERVA_MAX = 2;
CB.vidas.MAX_CONCEDIDAS_PARTIDA = 2;
CB.vidas.TIMEOUTS_CAMBIA_MODO = 3;   // consecutivos
CB.vidas.TIMEOUTS_FIN = 6;           // en la partida

CB.vidas.tope = function () { return CB.vidas.TOPE; };

CB.vidas.nuevoEstado = function (reserva) {
  var r = Math.max(0, Math.min(CB.vidas.RESERVA_MAX, reserva || 0));
  var luces = CB.vidas.INICIALES + r;
  if (luces > CB.vidas.TOPE) luces = CB.vidas.TOPE;
  return {
    luces: luces,
    reserva: 0,                    // la reserva se consume al empezar
    reservaAplicada: r,
    concedidasPartida: 0,
    timeoutsConsecutivos: 0,
    timeoutsPartida: 0,
    vueltaAlPozoCobrada: false,
    aciertosDesdeApagon: 0,
    huboApagon: false
  };
};

CB.vidas.estado = function (est) {
  return {
    luces: est ? est.luces : CB.vidas.INICIALES,
    tope: CB.vidas.TOPE,
    reserva: est ? est.reserva : 0
  };
};

/**
 * Fallo de un ítem.
 * @param est     estado de luces de la partida
 * @param intento 1 = primer fallo, 2 = fallo tras la tarjeta de reparación
 * @param modo    'expedicion' | 'tranquila' | 'jefe'
 */
CB.vidas.fallo = function (est, intento, modo) {
  /* En Cantera Tranquila no hay luces: no se puede perder (§3.8). */
  if (modo === 'tranquila') {
    /* Reparación INMEDIATA tras el primer fallo, sin segundo intento a ciegas. */
    return { luces: est.luces, intento: intento,
             abrePista: false, abreReparacion: true, apagada: false };
  }

  /* Durante el combate de jefe, el fallo NO apaga luces: solo repara un bloque
     de la armadura y alarga el combate. Un niño que recorre un mundo entero y
     «muere» en el jefe pierde la recompensa de cierre: es el punto de abandono
     clásico (§12.9). */
  if (modo === 'jefe') {
    return { luces: est.luces, intento: intento,
             abrePista: false, abreReparacion: false, apagada: false };
  }

  if (intento === 1) {
    /* Primer fallo: PISTA de Rocarr. NO apaga luz. NO rompe racha.
       El campo se llama `abrePista` y no `abreReparacion`: la tarjeta de
       reparación es cosa del SEGUNDO fallo, y confundir los dos nombres es
       confundir los dos escalones de la escalera anti-frustración. */
    return { luces: est.luces, intento: 1,
             abrePista: true, abreReparacion: false, apagada: false };
  }

  /* Segundo fallo, tras la tarjeta de reparación: aquí y solo aquí. */
  est.luces = Math.max(0, est.luces - 1);
  est.huboApagon = true;
  est.aciertosDesdeApagon = 0;
  return { luces: est.luces, intento: 2,
           abrePista: false, abreReparacion: false, apagada: true };
};

/* Tiempo agotado. NUNCA apaga luz. Ni el primero, ni ninguno. */
CB.vidas.timeout = function (est) {
  est.timeoutsConsecutivos = (est.timeoutsConsecutivos || 0) + 1;
  est.timeoutsPartida = (est.timeoutsPartida || 0) + 1;

  var cambiaModo = est.timeoutsConsecutivos >= CB.vidas.TIMEOUTS_CAMBIA_MODO;
  var finAmable  = est.timeoutsPartida >= CB.vidas.TIMEOUTS_FIN;

  return {
    luces: est.luces,                 // SIN CAMBIO
    consecutivos: est.timeoutsConsecutivos,
    cambiaModo: cambiaModo,
    avisoCambioModo: cambiaModo ? 'Vamos con más calma' : null,
    finAmable: finAmable,
    motivoFin: finAmable ? 'pausa' : null
  };
};

CB.vidas.reiniciarTimeouts = function (est) { est.timeoutsConsecutivos = 0; };

/* Azar detectado. NUNCA apaga luz. */
CB.vidas.azar = function (est) {
  return {
    luces: est.luces,                 // SIN CAMBIO
    efectos: ['sinBono', 'confirmacion', 'bloqueo1200']
  };
};

/* Acierto: alimenta el contador de «Vuelta al pozo». */
CB.vidas.acierto = function (est, primerIntento) {
  CB.vidas.reiniciarTimeouts(est);
  if (est.huboApagon && primerIntento) {
    est.aciertosDesdeApagon = (est.aciertosDesdeApagon || 0) + 1;
  } else if (!primerIntento) {
    est.aciertosDesdeApagon = 0;
  }
  return est.aciertosDesdeApagon;
};

CB.vidas.fallaRacha = function (est) { est.aciertosDesdeApagon = 0; };

/**
 * Concede una luz extra. Requisito 10.
 * @param motivo 'vuelta_al_pozo' | 'veta_restaurada' | 'reto_bonus'
 * @param perfil para volcar el exceso a vidasReserva
 */
CB.vidas.conceder = function (est, motivo, perfil, modo) {
  /* En Cantera Tranquila no hay luces, luego no hay luces extra (§12.7). */
  if (modo === 'tranquila') {
    return { aplicada: false, guardada: false, reserva: perfil ? (perfil.vidasReserva || 0) : 0,
             motivoRechazo: 'modo_tranquila' };
  }
  if (est.concedidasPartida >= CB.vidas.MAX_CONCEDIDAS_PARTIDA) {
    return { aplicada: false, guardada: false, reserva: perfil ? (perfil.vidasReserva || 0) : 0,
             motivoRechazo: 'tope_partida' };
  }
  if (motivo === 'vuelta_al_pozo') {
    if (est.vueltaAlPozoCobrada) {
      return { aplicada: false, guardada: false, reserva: perfil ? (perfil.vidasReserva || 0) : 0,
               motivoRechazo: 'ya_cobrado' };
    }
    est.vueltaAlPozoCobrada = true;
  }

  est.concedidasPartida++;

  if (est.luces < CB.vidas.TOPE) {
    est.luces++;
    return { aplicada: true, guardada: false, reserva: perfil ? (perfil.vidasReserva || 0) : 0,
             luces: est.luces, celebracionMs: 1500, texto: '¡Luz extra!' };
  }

  /* Al tope: se guarda para la próxima expedición. NUNCA se convierte en gemas. */
  if (perfil) {
    perfil.vidasReserva = Math.min(CB.vidas.RESERVA_MAX, (perfil.vidasReserva || 0) + 1);
  }
  est.reserva = perfil ? perfil.vidasReserva : 1;
  return { aplicada: false, guardada: true, reserva: est.reserva, luces: est.luces,
           celebracionMs: 1500, texto: 'Guardas 1 luz para la próxima expedición' };
};

/* ¿Se ha acabado la expedición por luces? */
CB.vidas.agotadas = function (est) { return est.luces <= 0; };

/* Precedencia de los finales de partida (§3.6). Menor número = mayor prioridad. */
CB.vidas.PRECEDENCIA_FIN = {
  limiteSesion: 1,
  luces: 2,
  guion: 3,
  salida: 4,
  pausa: 5
};

/* ============================================================================
   23-adaptativo.js — Elo por DESTREZA (no por nivel)
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   POR QUÉ EL ELO VIVE EN LA DESTREZA Y NO EN EL NIVEL (PLAN §13.1): con 92
   niveles y partidas de 15 ítems, la mayoría de los niveles tendrían n < 5. Un
   Elo con 5 observaciones y K = 32 es RUIDO PURO, y elegirBeta seleccionaría
   niveles al azar durante las primeras 10 sesiones. Con 13 slugs, cada uno
   acumula muchas observaciones y converge deprisa.

     perfil.destrezas  → indexado por los 13 SLUGS  → theta, n, rtMediana, …
     perfil.niveles    → indexado por los 92 IDS    → n, aciertos, caja, D, …

   El Mapa de Destrezas se pinta desde perfil.niveles: eso es INFORMACIÓN.
   La elección de dificultad sale de perfil.destrezas: eso es MEDIDA.
   ========================================================================== */

var CB = CB || {};
CB.adaptativo = CB.adaptativo || {};

/* Lista CERRADA de los 13 slugs. casos-curriculo.js (CU6) comprueba que los 92
   niveles del catálogo apuntan a uno de estos. */
CB.adaptativo.SLUGS = [
  'numeracion', 'valor_posicional',
  'suma_sin_llevar', 'suma_llevada',
  'resta_sin_llevar', 'resta_llevada',
  'multiplicacion',
  'problemas_cambio', 'problemas_combinacion',
  'problemas_comparacion', 'problemas_igualacion',
  'dinero', 'vocabulario'
];

CB.adaptativo.THETA_INICIAL = 1000;
CB.adaptativo.THETA_MIN = 400;
CB.adaptativo.THETA_MAX = 1800;

/* Peso del acierto en segundo intento en el Elo: es aprendizaje, no dominio. */
CB.adaptativo.PESO_INTENTO_2 = 0.4;

CB.adaptativo.nuevaDestreza = function (hoyISO) {
  return {
    theta: CB.adaptativo.THETA_INICIAL,
    n: 0, aciertos: 0, aciertosPrimerIntento: 0,
    rtMediana: 0, rtMuestras: [],
    ventana10: [],
    caja: 1, estabilidadDias: 1,
    ultimoRepasoISO: hoyISO || null,
    proximoRepasoISO: hoyISO || null,
    estado: 'nuevo',
    fallosSesion: 0,
    ejemplosFallados: []
  };
};

CB.adaptativo.theta = function (destreza, perfil) {
  var d = (perfil && perfil.destrezas) ? perfil.destrezas[destreza] : null;
  if (!d || !isFinite(d.theta)) return CB.adaptativo.THETA_INICIAL;
  return CB.util.clamp(d.theta, CB.adaptativo.THETA_MIN, CB.adaptativo.THETA_MAX);
};

/* K decreciente: menos ruido a medida que hay más observaciones. */
CB.adaptativo.K = function (n) {
  if (n < 10) return 40;
  if (n < 30) return 24;
  return 16;
};

/* Expectativa logística clásica. Se conserva porque es la referencia con la que
   se leen las betaBase del catálogo, PERO no es la regla de actualización.
   Ver la nota de abajo. */
CB.adaptativo.esperado = function (theta, beta) {
  return 1 / (1 + Math.pow(10, (beta - theta) / 400));
};

/* ── POR QUÉ NO SE USA EL ELO CLÁSICO ────────────────────────────────────────
   El plan pedía dos cosas incompatibles: la actualización de Elo estándar
   `theta += K·(acierto − esperado)` y una banda objetivo con «probabilidad de
   acierto esperada ≈ 0,80-0,88». El Elo clásico converge al punto en que el
   acierto observado iguala a la expectativa logística; con adivinanza c y
   desliz s, ese punto fijo está en L = c/(c+s), que para el teclado (c = 0,02,
   s = 0,10) da un 16,7 % de aciertos. El niño sintético lo confirmó: 43,9 % y
   64,2 %, cayendo, en lugar del 75-92 % exigido.

   La regla que sí produce lo que el plan quiere es la de Robbins-Monro (la
   escalera clásica de la psicofísica): mover theta contra un OBJETIVO DE TASA.

        theta' = theta + K · (acierto − 0,80)

   Converge exactamente al punto en que el niño acierta el 80 % de las veces,
   sea cual sea su adivinanza o su desliz. Y da a `theta` un significado
   directo y explicable: «la dificultad a la que este niño acierta 8 de cada
   10». Con eso, la banda [theta−60, theta+120] de elegirBeta vuelve a ser
   coherente con la zona de desarrollo próximo que el plan describe.

   Documentado en docs/decisiones.md. Se recalibra en F10 con niños reales. */
CB.adaptativo.OBJETIVO_ACIERTO = 0.80;

/**
 * @param acierto 1 acierto a primer intento, 0 fallo.
 *                Un acierto en segundo intento se pasa como
 *                CB.adaptativo.PESO_INTENTO_2 (0,4): es aprendizaje, no dominio.
 */
CB.adaptativo.actualizar = function (destreza, acierto, beta, perfil) {
  if (!perfil.destrezas) perfil.destrezas = {};

  /* `destreza` es el SLUG, no el objeto de destreza. Pasarle el objeto no daba
     ningún error: JavaScript lo convertía a la cadena "[object Object]" y se
     creaba una destreza con ese nombre, que se guardaba en el perfil del niño y
     salía en el informe del adulto. Mientras tanto, la destreza de verdad no se
     actualizaba nunca y su competencia estimada se quedaba clavada.

     No es hipotético: es el fallo que cometí auditando este mismo motor, y
     tardé tres intentos en verlo porque nada se quejaba. Trece slugs, lista
     cerrada: cualquier otra cosa es un error de programación y tiene que
     notarse. */
  if (CB.adaptativo.SLUGS.indexOf(destreza) === -1) {
    throw new Error('CB.adaptativo.actualizar: destreza desconocida «' + destreza +
                    '». Se espera uno de los 13 slugs, no el objeto de destreza.');
  }

  var d = perfil.destrezas[destreza];
  if (!d) d = perfil.destrezas[destreza] = CB.adaptativo.nuevaDestreza(null);

  var K = CB.adaptativo.K(d.n || 0);
  var nuevo = CB.util.clamp(
    d.theta + K * (acierto - CB.adaptativo.OBJETIVO_ACIERTO),
    CB.adaptativo.THETA_MIN, CB.adaptativo.THETA_MAX
  );
  d.theta = isFinite(nuevo) ? Math.round(nuevo) : CB.adaptativo.THETA_INICIAL;
  return d.theta;
};

/* ── Banda objetivo ─────────────────────────────────────────────────────────
   La banda va POR DEBAJO de theta, no por encima. El plan escribía
   [theta−60, theta+120] y a la vez «probabilidad de acierto esperada ≈
   0,80-0,88»; son incompatibles: con la logística de Elo, un ítem cuya β iguala
   a θ da el 50 %, no el 80 %. Para acertar 8 de cada 10 hace falta que el ítem
   esté unos 340 puntos POR DEBAJO de la competencia del niño.

   Con esta banda y la regla de tasa objetivo de `actualizar`, el sistema es
   coherente: theta estima la competencia real, los ítems se sirven ~340 puntos
   por debajo, y el acierto observado se estabiliza en el 80 % que pide la zona
   de desarrollo próximo. */
CB.adaptativo.BANDA_INFERIOR = 420;
CB.adaptativo.BANDA_SUPERIOR = 260;

CB.adaptativo.elegirBeta = function (destreza, perfil) {
  var th = CB.adaptativo.theta(destreza, perfil);
  return [th - CB.adaptativo.BANDA_INFERIOR, th - CB.adaptativo.BANDA_SUPERIOR];
};

/* Registro completo de una respuesta en la destreza. */
CB.adaptativo.registrar = function (destreza, datos, perfil, hoyISO) {
  if (!perfil.destrezas) perfil.destrezas = {};
  var d = perfil.destrezas[destreza];
  if (!d) d = perfil.destrezas[destreza] = CB.adaptativo.nuevaDestreza(hoyISO);

  d.n = (d.n || 0) + 1;
  if (datos.correcto) {
    d.aciertos = (d.aciertos || 0) + 1;
    if (datos.intento === 1) d.aciertosPrimerIntento = (d.aciertosPrimerIntento || 0) + 1;
  } else {
    d.fallosSesion = (d.fallosSesion || 0) + 1;
    if (datos.ejemplo) {
      d.ejemplosFallados = d.ejemplosFallados || [];
      d.ejemplosFallados.unshift(datos.ejemplo);
      if (d.ejemplosFallados.length > 3) d.ejemplosFallados.length = 3;   // poda §15.6
    }
  }

  if (isFinite(datos.rtMs) && datos.rtMs > 0) {
    d.rtMuestras = d.rtMuestras || [];
    d.rtMuestras.push(datos.rtMs);
    if (d.rtMuestras.length > 12) d.rtMuestras.shift();                   // poda §15.6
    d.rtMediana = CB.util.mediana(d.rtMuestras);
  }

  d.ventana10 = d.ventana10 || [];
  d.ventana10.push(datos.correcto ? 1 : 0);
  if (d.ventana10.length > 10) d.ventana10.shift();

  var peso = datos.correcto
    ? (datos.intento === 1 ? 1 : CB.adaptativo.PESO_INTENTO_2)
    : 0;
  CB.adaptativo.actualizar(destreza, peso, datos.beta, perfil);

  return d;
};

CB.adaptativo.precision1er = function (d) {
  if (!d || !d.n) return 0;
  return (d.aciertosPrimerIntento || 0) / d.n;
};

/* ── Regla simple de respaldo (§13.2) ───────────────────────────────────────
   3 aciertos seguidos → sube; 2 fallos → baja. Activable por el adulto para
   depuración y para centros que prefieran un comportamiento predecible. */
CB.adaptativo.reglaSimple = function (nivelEstado) {
  var v = nivelEstado.ventanaSimple || [];
  var n = v.length, i, seguidos = 0;
  for (i = n - 1; i >= 0; i--) { if (v[i] === 1) seguidos++; else break; }
  if (seguidos >= 3) return +1;
  var fallos = 0;
  for (i = n - 1; i >= 0 && i >= n - 2; i--) if (v[i] === 0) fallos++;
  if (fallos >= 2) return -1;
  return 0;
};

/* ── Dificultad interna D del nivel (§8.2) ─────────────────────────────────
   Sube tras 3 aciertos consecutivos A PRIMER INTENTO; baja tras 2 fallos.
   D es interno al nivel y NO cambia el rango declarado en el catálogo.

   LOS CONTADORES NO PUEDEN EMPEZAR POR GUION BAJO. Se llamaban `_racha` y
   `_fallos`, y CB.almacen.sanear() descarta por diseño toda clave que empiece
   por `_` —«campos internos, no se guardan»—, así que se borraban en cada
   guardado mientras que `D` sí se guardaba. El resultado era un trinquete en una
   sola dirección:

     · para SUBIR hacen falta 3 aciertos seguidos del MISMO nivel, y una partida
       sirve como mucho 3 ítems del mismo nivel (CB.partida.MAX_REPETICIONES).
       O sea: exigía un pleno de 3 sobre 3 dentro de una única sesión, porque al
       día siguiente la racha volvía a cero.
     · para BAJAR bastan 2 fallos, y además CB.partida.trasFallo pone D = 1 a la
       segunda caída del concepto. Eso sí persiste, porque vive en `D`.

   Es decir: la dificultad podía bajar para siempre y casi nunca subir. Un niño
   que mejora se quedaba con los ítems fáciles de su peor día. Con nombres sin
   guion bajo, los contadores sobreviven al guardado y la regla hace lo que dice.
   No hace falta migración: ausentes valen 0, que es como empezaban. */
CB.adaptativo.actualizarD = function (nivelEstado, correcto, primerIntento) {
  nivelEstado.D = nivelEstado.D || 2;
  nivelEstado.rachaD = nivelEstado.rachaD || 0;
  nivelEstado.fallosD = nivelEstado.fallosD || 0;

  if (correcto && primerIntento) {
    nivelEstado.rachaD++;
    nivelEstado.fallosD = 0;
    if (nivelEstado.rachaD >= 3 && nivelEstado.D < 3) {
      nivelEstado.D++;
      nivelEstado.rachaD = 0;
    }
  } else if (!correcto) {
    nivelEstado.fallosD++;
    nivelEstado.rachaD = 0;
    if (nivelEstado.fallosD >= 2 && nivelEstado.D > 1) {
      nivelEstado.D--;
      nivelEstado.fallosD = 0;
    }
  } else {
    nivelEstado.rachaD = 0;
  }
  return nivelEstado.D;
};

/* ============================================================================
   24-logros.js — Requisito 10: vidas extra por logros bonus
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   LISTA de 24 entradas, cada una con `version: 1 | 2`. EXACTAMENTE 10 tienen
   version:1 y son las únicas evaluadas en v1 (casos-motor.js lo comprueba).

   TRES LOGROS CONCEDEN LUZ, y los tres son alcanzables DENTRO DE UNA MISMA
   PARTIDA. En el plan v1 existía CB.vidas.conceder(), existía retoBonus,
   existían «los 8 logros» y NINGÚN logro estaba declarado como concesor de vida:
   el requisito 10 quedaba sobre el papel.

   ANTIFARMEO: ningún logro se obtiene dos veces; los de racha exigen aciertos a
   PRIMER intento; los de puntuación se evalúan contra el récord DEL MISMO MODO
   de tiempo; en Cantera Tranquila solo se evalúan los de colección.
   ========================================================================== */

var CB = CB || {};
CB.logros = CB.logros || {};

CB.logros.LISTA = [
  /* ── Los 3 que conceden luz (requisito 10) ───────────────────────────── */
  { id: 'vuelta_al_pozo', version: 1, luz: true,
    nombre: 'Vuelta al pozo',
    desc: '3 aciertos seguidos a primer intento después de que se apagara una luz.',
    evento: 'acierto' },

  { id: 'veta_restaurada', version: 1, luz: true,
    nombre: 'Veta restaurada',
    desc: 'Has quitado el musgo de una veta que se había olvidado.',
    evento: 'destreza' },

  { id: 'reto_bonus', version: 1, luz: true,
    nombre: 'Reto bonus superado',
    desc: 'Has acertado el reto marcado del nivel.',
    evento: 'acierto' },

  /* ── Los otros 7 de v1 ───────────────────────────────────────────────── */
  { id: 'vena_de_cristal', version: 1, luz: false,
    nombre: 'Vena de cristal',
    desc: '10 aciertos seguidos a primer intento.',
    evento: 'acierto' },

  { id: 'primer_pico', version: 1, luz: false,
    nombre: 'Primer pico',
    desc: 'Has terminado tu primera expedición.',
    evento: 'finPartida' },

  { id: 'cantero', version: 1, luz: false,
    nombre: 'Cantero',
    desc: 'Has completado los niveles nucleares de un mundo.',
    evento: 'finPartida' },

  { id: 'guardian_del_bloque', version: 1, luz: false,
    nombre: 'Guardián del bloque',
    desc: 'Has superado a un jefe.',
    evento: 'jefe' },

  { id: 'coleccionista', version: 1, luz: false,
    nombre: 'Coleccionista',
    desc: 'Has reunido 5 cromos.',
    evento: 'cromo', enTranquila: true },

  { id: 'palabra_de_piedra', version: 1, luz: false,
    nombre: 'Palabra de piedra',
    desc: 'Has añadido 10 términos al Diccionario de Bloques.',
    evento: 'glosario', enTranquila: true },

  { id: 'vuelvo_manana', version: 1, luz: false,
    nombre: 'Vuelvo mañana',
    desc: 'Has jugado 2 días distintos separados por al menos un día.',
    evento: 'finPartida' },

  /* ── Los 14 de v2: reserva DECLARADA, no evaluada ────────────────────── */
  { id: 'mina_profunda',   version: 2, luz: false, nombre: 'Mina profunda',   desc: 'Reservado para la versión 2.' },
  { id: 'reloj_de_piedra', version: 2, luz: false, nombre: 'Reloj de piedra', desc: 'Reservado para la versión 2.' },
  { id: 'sin_una_grieta',  version: 2, luz: false, nombre: 'Sin una grieta',  desc: 'Reservado para la versión 2.' },
  { id: 'explorador',      version: 2, luz: false, nombre: 'Explorador',      desc: 'Reservado para la versión 2.' },
  { id: 'arquitecto',      version: 2, luz: false, nombre: 'Arquitecto',      desc: 'Reservado para la versión 2.' },
  { id: 'cambista',        version: 2, luz: false, nombre: 'Cambista',        desc: 'Reservado para la versión 2.' },
  { id: 'lector_de_rocas', version: 2, luz: false, nombre: 'Lector de rocas', desc: 'Reservado para la versión 2.' },
  { id: 'nueve_vetas',     version: 2, luz: false, nombre: 'Nueve vetas',     desc: 'Reservado para la versión 2.' },
  { id: 'pico_de_oro',     version: 2, luz: false, nombre: 'Pico de oro',     desc: 'Reservado para la versión 2.' },
  { id: 'repaso_de_verano',version: 2, luz: false, nombre: 'Repaso de verano',desc: 'Reservado para la versión 2.' },
  { id: 'constructor',     version: 2, luz: false, nombre: 'Constructor',     desc: 'Reservado para la versión 2.' },
  { id: 'amigo_de_blopi',  version: 2, luz: false, nombre: 'Amigo de Blopi',  desc: 'Reservado para la versión 2.' },
  { id: 'vagoneta_llena',  version: 2, luz: false, nombre: 'Vagoneta llena',  desc: 'Reservado para la versión 2.' },
  { id: 'maestro_cantero', version: 2, luz: false, nombre: 'Maestro cantero', desc: 'Reservado para la versión 2.' }
];

CB.logros.V1 = CB.logros.LISTA.filter(function (l) { return l.version === 1; });
CB.logros.CONCEDEN_LUZ = CB.logros.LISTA.filter(function (l) { return l.luz; })
                                        .map(function (l) { return l.id; });

CB.logros.get = function (id) {
  var i;
  for (i = 0; i < CB.logros.LISTA.length; i++) {
    if (CB.logros.LISTA[i].id === id) return CB.logros.LISTA[i];
  }
  return null;
};

CB.logros.yaTiene = function (perfil, id) {
  return !!(perfil && perfil.logros && perfil.logros[id] && perfil.logros[id].cobrado);
};

CB.logros.otorgar = function (perfil, id, hoyISO, progreso) {
  if (!perfil.logros) perfil.logros = {};
  if (perfil.logros[id] && perfil.logros[id].cobrado) return null;
  perfil.logros[id] = { desbloqueadoISO: hoyISO, progreso: progreso || 1, cobrado: true };
  return CB.logros.get(id);
};

/**
 * Comprueba qué logros se desbloquean con este evento.
 * @param evento 'acierto' | 'finPartida' | 'jefe' | 'cromo' | 'glosario' | 'destreza'
 * @param ctx    {perfil, estadoLuces, modo, rachaPrimerIntento, esRetoBonus,
 *                vetaRestaurada, jefeSuperado, mundoCompletado, hoyISO}
 * @return [logro] recién desbloqueados
 */
CB.logros.comprobar = function (evento, ctx) {
  var out = [], p = ctx.perfil, hoy = ctx.hoyISO;
  if (!p) return out;

  /* En Cantera Tranquila solo se evalúan los de colección (§12.8). */
  var soloColeccion = (ctx.modo === 'tranquila');

  function intenta(id, condicion, progreso) {
    var l = CB.logros.get(id);
    if (!l || l.version !== 1) return;
    if (soloColeccion && !l.enTranquila) return;
    if (CB.logros.yaTiene(p, id)) return;
    if (!condicion) return;
    var otorgado = CB.logros.otorgar(p, id, hoy, progreso);
    if (otorgado) out.push(otorgado);
  }

  if (evento === 'acierto') {
    intenta('vuelta_al_pozo',
      ctx.estadoLuces && ctx.estadoLuces.huboApagon &&
      ctx.estadoLuces.aciertosDesdeApagon >= 3, 3);

    intenta('vena_de_cristal', (ctx.rachaPrimerIntento || 0) >= 10, 10);

    intenta('reto_bonus', !!ctx.esRetoBonus, 1);
  }

  if (evento === 'destreza') {
    intenta('veta_restaurada', !!ctx.vetaRestaurada, 1);
  }

  if (evento === 'jefe') {
    intenta('guardian_del_bloque', !!ctx.jefeSuperado, 1);
  }

  if (evento === 'cromo') {
    intenta('coleccionista', (p.cromos || []).length >= 5, (p.cromos || []).length);
  }

  if (evento === 'glosario') {
    intenta('palabra_de_piedra', (p.glosario || []).length >= 10, (p.glosario || []).length);
  }

  if (evento === 'finPartida') {
    intenta('primer_pico', (p.historial || []).length >= 1, 1);
    intenta('cantero', !!ctx.mundoCompletado, 1);

    var dias = (p.diario && p.diario.diasJugados) ? p.diario.diasJugados : [];
    var dosDias = false;
    if (dias.length >= 2) {
      dosDias = CB.util.diasEntre(dias[0], dias[dias.length - 1]) >= 1;
    }
    intenta('vuelvo_manana', dosDias, dias.length);
  }

  return out;
};

/* De los recién desbloqueados, ¿cuáles conceden luz? */
CB.logros.filtrarConLuz = function (lista) {
  return (lista || []).filter(function (l) { return l && l.luz; });
};

/* ============================================================================
   25-mensajes.js — Requisitos 4 y 5: enhorabuena variada y ánimo al fallar
   ----------------------------------------------------------------------------
   FUNCIÓN PURA (opera sobre el objeto perfil que se le pasa).

   POR QUÉ CADA CATEGORÍA TIENE SU PROPIA BOLSA (PLAN §14.7): el plan v1 tenía 84
   mensajes en 4 categorías elegidos por contexto. La bolsa EFECTIVA era la de la
   categoría —15-20 mensajes— y un niño con racha veía repetido el mismo elogio
   de racha en 15 aciertos seguidos. Muy por debajo de los «40 minutos sin
   repetir» que el propio plan prometía.

   Ahora: 4 categorías × EXACTAMENTE 21, cada una con su BolsaBarajada persistida
   en el perfil. Ningún mensaje se repite hasta agotar la bolsa de SU categoría.
   Además, nunca se repite uno de los `ultimos12` globales: si la bolsa solo
   ofrece uno ya reciente, se toma el siguiente de la bolsa.
   ========================================================================== */

var CB = CB || {};
CB.mensajes = CB.mensajes || {};

CB.mensajes.CATS_ACIERTO = ['A', 'B', 'C', 'D'];
CB.mensajes.CATS_ANIMO   = ['P1', 'P2'];
CB.mensajes.RECIENTES_ACIERTO = 12;
CB.mensajes.RECIENTES_ANIMO   = 10;

CB.mensajes.listaDe = function (cat) {
  var M = CB.datos.MENSAJES;
  if (cat === 'A')  return M.acierto_A;
  if (cat === 'B')  return M.acierto_B;
  if (cat === 'C')  return M.acierto_C;
  if (cat === 'D')  return M.acierto_D;
  if (cat === 'P1') return M.animo_P1;
  if (cat === 'P2') return M.animo_P2;
  return [];
};

/* Estructura persistida en perfil.mensajes (§15.3). */
CB.mensajes.nuevoEstado = function () {
  return {
    acierto: { bolsaA: [], bolsaB: [], bolsaC: [], bolsaD: [], ultimos12: [] },
    animo:   { bolsa1: [], bolsa2: [], ultimos10: [] },
    /* SIN GUION BAJO DELANTE, y no es estilo. CB.almacen.sanear() borra todas
       las claves que empiezan por «_», así que una bolsa llamada `_gritos` se
       reiniciaría en cada guardado y el grito volvería a repetirse cada dos por
       tres sin que nada fallara. Es exactamente lo que le pasó a la dificultad D
       (E45), que era un trinquete de una sola dirección por este mismo motivo. */
    gritos:  { bolsaAcierto: [] }
  };
};

CB.mensajes.asegurar = function (perfil) {
  if (!perfil.mensajes) perfil.mensajes = CB.mensajes.nuevoEstado();
  var m = perfil.mensajes;
  if (!m.acierto) m.acierto = { bolsaA: [], bolsaB: [], bolsaC: [], bolsaD: [], ultimos12: [] };
  if (!m.animo)   m.animo   = { bolsa1: [], bolsa2: [], ultimos10: [] };
  if (!m.acierto.ultimos12) m.acierto.ultimos12 = [];
  if (!m.animo.ultimos10)   m.animo.ultimos10 = [];
  /* Un perfil de 1.7.1 no la trae. Se crea aquí y por eso 1.8.0 no necesita
     migración en 01-almacen.js: la primera cifra de la versión se queda. */
  if (!m.gritos)  m.gritos  = { bolsaAcierto: [] };
  return m;
};

/* Índice global 0..83 de un mensaje de acierto, para los `ultimos12`. */
CB.mensajes.indiceGlobalAcierto = function (cat, i) {
  return CB.mensajes.CATS_ACIERTO.indexOf(cat) * 21 + i;
};
CB.mensajes.indiceGlobalAnimo = function (cat, i) {
  return CB.mensajes.CATS_ANIMO.indexOf(cat) * 24 + i;
};

/**
 * Elige la categoría de acierto según el contexto real del ítem.
 * @param ctx {rapido, racha, superacion, reparacion, vetaNueva, mundoNuevo}
 */
CB.mensajes.categoriaAcierto = function (ctx) {
  ctx = ctx || {};
  /* C) SUPERACIÓN tiene prioridad: viene de una tarjeta de reparación o de un
     concepto que se le atragantaba. Es el momento en que el mensaje más pesa. */
  if (ctx.reparacion || ctx.superacion) return 'C';
  /* D) DESCUBRIMIENTO: racha larga, veta o mundo nuevo. */
  if (ctx.mundoNuevo || ctx.vetaNueva || (ctx.racha && ctx.racha >= 3)) return 'D';
  /* B) ESFUERZO: le ha costado tiempo y lo ha sacado. */
  if (ctx.lento || (ctx.intento && ctx.intento > 1)) return 'B';
  /* A) PROCEDIMIENTO: el caso por defecto, y el más educativo. */
  return 'A';
};

CB.mensajes.categoriaAnimo = function (ctx) {
  ctx = ctx || {};
  /* P1 señala DÓNDE mirar: solo tiene sentido si conocemos la destreza. */
  if (ctx.destreza && CB.datos.MENSAJES.PISTAS[ctx.destreza]) return 'P1';
  return 'P2';
};

/* Rellena {proc} y {pista} con la frase de la destreza REAL del ítem. Un elogio
   de procedimiento solo educa si nombra el procedimiento correcto. */
CB.mensajes.rellenar = function (plantilla, ctx, rng) {
  var t = String(plantilla);
  var r = rng || CB.util.mulberry32(CB.util.hash32(t));

  if (t.indexOf('{proc}') !== -1) {
    var procs = CB.datos.MENSAJES.PROCEDIMIENTOS[ctx.destreza];
    var proc = procs ? procs[CB.util.ent(r, 0, procs.length - 1)]
                     : 'Has resuelto el bloque.';
    t = t.replace('{proc}', proc);
  }
  if (t.indexOf('{pista}') !== -1) {
    var pistas = CB.datos.MENSAJES.PISTAS[ctx.destreza];
    var pista = pistas ? pistas[CB.util.ent(r, 0, pistas.length - 1)]
                       : 'Vuelve a leerlo con calma.';
    t = t.replace('{pista}', pista);
  }
  return t;
};

/* Saca un índice de la bolsa de esa categoría, evitando los recientes. */
CB.mensajes.sacarDeBolsa = function (estadoBolsas, claveBolsa, n, recientes, evitarGlobales, offset, rng) {
  var bolsa = new CB.util.BolsaBarajada(n, rng, estadoBolsas[claveBolsa]);

  /* `recientes` son índices GLOBALES; se traducen a locales de esta bolsa. */
  var evitarLocal = [], i, g;
  for (i = 0; i < evitarGlobales.length; i++) {
    g = evitarGlobales[i] - offset;
    if (g >= 0 && g < n) evitarLocal.push(g);
  }

  var idx = bolsa.sacar(evitarLocal);
  estadoBolsas[claveBolsa] = bolsa.estado();
  return idx;
};

/**
 * Mensaje de enhorabuena. Requisito 4.
 * @param ctx {destreza, rapido, lento, racha, superacion, reparacion,
 *             vetaNueva, mundoNuevo, intento, perfil, rng}
 */
CB.mensajes.acierto = function (ctx) {
  ctx = ctx || {};
  var perfil = ctx.perfil || {};
  var m = CB.mensajes.asegurar(perfil);
  var rng = ctx.rng || CB.util.mulberry32(CB.util.hash32(String(m.acierto.ultimos12.length)));

  var cat = CB.mensajes.categoriaAcierto(ctx);
  var lista = CB.mensajes.listaDe(cat);
  var clave = 'bolsa' + cat;
  var offset = CB.mensajes.CATS_ACIERTO.indexOf(cat) * 21;

  var idx = CB.mensajes.sacarDeBolsa(
    m.acierto, clave, lista.length, m.acierto.ultimos12, m.acierto.ultimos12, offset, rng
  );
  if (idx < 0) idx = 0;

  var global = offset + idx;
  m.acierto.ultimos12.push(global);
  while (m.acierto.ultimos12.length > CB.mensajes.RECIENTES_ACIERTO) {
    m.acierto.ultimos12.shift();
  }

  return CB.mensajes.rellenar(lista[idx], ctx, rng);
};

/**
 * Mensaje motivador al fallar. Requisito 5.
 * Nunca contiene elogio de persona ni acusación: el criterio 7.2 del RD pide
 * literalmente «valorando el error como una oportunidad de aprendizaje».
 */
CB.mensajes.animo = function (ctx) {
  ctx = ctx || {};
  var perfil = ctx.perfil || {};
  var m = CB.mensajes.asegurar(perfil);
  var rng = ctx.rng || CB.util.mulberry32(CB.util.hash32(String(m.animo.ultimos10.length)));

  var cat = CB.mensajes.categoriaAnimo(ctx);
  var lista = CB.mensajes.listaDe(cat);
  var clave = (cat === 'P1') ? 'bolsa1' : 'bolsa2';
  var offset = CB.mensajes.CATS_ANIMO.indexOf(cat) * 24;

  var idx = CB.mensajes.sacarDeBolsa(
    m.animo, clave, lista.length, m.animo.ultimos10, m.animo.ultimos10, offset, rng
  );
  if (idx < 0) idx = 0;

  var global = offset + idx;
  m.animo.ultimos10.push(global);
  while (m.animo.ultimos10.length > CB.mensajes.RECIENTES_ANIMO) {
    m.animo.ultimos10.shift();
  }

  return CB.mensajes.rellenar(lista[idx], ctx, rng);
};

/**
 * El grito corto que va escrito en la cinta. No es un trozo del mensaje: es
 * material aparte, porque el mensaje entero se queda quieto donde se pueda leer.
 *
 * Sale de su propia bolsa barajada, igual que los mensajes, así que no se
 * repite hasta agotarla. Esa es la segunda de las tres capas contra la
 * monotonía: la primera es que la coreografía significa algo (js/30-ui.js) y la
 * tercera es que hay una que casi nunca sale.
 *
 * @param ctx {perfil, rng}
 */
CB.mensajes.grito = function (ctx) {
  ctx = ctx || {};
  var perfil = ctx.perfil || {};
  var m = CB.mensajes.asegurar(perfil);
  var lista = CB.datos.MENSAJES.GRITOS.acierto;
  var clave = 'bolsaAcierto';
  var rng = ctx.rng || CB.util.mulberry32(CB.util.hash32(clave + lista.length));

  var idx = CB.mensajes.sacarDeBolsa(m.gritos, clave, lista.length, [], [], 0, rng);
  if (idx < 0) idx = 0;
  return lista[idx];
};

/* Contrato de tamaño, para casos-mensajes.js (M1 y M2). */
CB.mensajes.contrato = function () {
  var M = CB.datos.MENSAJES;
  return {
    aciertoTotal: M.acierto.length,
    animoTotal: M.animo.length,
    porCategoriaAcierto: [M.acierto_A.length, M.acierto_B.length,
                          M.acierto_C.length, M.acierto_D.length],
    porCategoriaAnimo: [M.animo_P1.length, M.animo_P2.length],
    gritosAcierto: M.GRITOS.acierto.length
  };
};

/* ============================================================================
   26-reparacion.js — La tarjeta de reparación y los 6 explicadores
   ----------------------------------------------------------------------------
   FUNCIÓN PURA: devuelve una descripción de la tarjeta; quien la pinta es
   30-ui.js. Cero DOM aquí.

   POR QUÉ EL BOTÓN «¡LO PILLO!» ES UNA PUERTA DE INTERACCIÓN Y NO UN
   TEMPORIZADOR (PLAN §12.6): el plan v1 lo habilitaba a los 2,0 s. Dos segundos
   no bastan ni para leer el título —un niño de 2.º lee ≈1 palabra por segundo y
   una explicación de columnas C-D-U tiene 15-25 palabras—. El propio protocolo
   de observación de v1 listaba «pulsa a los 2,0 s exactos sin mirar» como señal
   de alarma y mantenía el valor. La única intervención reparadora del juego era
   saltable de un toque, y se habría saltado siempre.

   Ahora el botón se habilita cuando el niño ha TOCADO LOS 3 PASOS EN ORDEN.
   Con salvavidas: si a los 25 s no ha tocado nada, la tarjeta se autocompleta
   con voz y el botón se habilita. NUNCA se deja al niño atrapado.
   ========================================================================== */

var CB = CB || {};
CB.reparacion = CB.reparacion || {};

CB.reparacion.SUELO_MS_MIN = 4000;
CB.reparacion.MS_POR_PALABRA = 900;

/* El salvavidas NO es un valor fijo (corrección de un defecto del plan):
   con 25 palabras el suelo temporal sale a 22,5 s y el salvavidas fijo de 25 s
   quedaba a solo 2,5 s de distancia. Esperar dos segundos y medio daba el mismo
   resultado que tocar los tres pasos, con lo que la PUERTA DE INTERACCIÓN
   —razón de ser de §12.6— volvía a ser un temporizador disfrazado.

   Ahora el salvavidas va siempre 8 s por detrás del suelo, y nunca antes de los
   25 s. Tocar los tres pasos sigue siendo el camino corto y real. */
CB.reparacion.SALVAVIDAS_MIN_MS = 25000;
CB.reparacion.SALVAVIDAS_MARGEN_MS = 8000;

CB.reparacion.salvavidasDe = function (sueloMs) {
  return Math.max(CB.reparacion.SALVAVIDAS_MIN_MS,
                  sueloMs + CB.reparacion.SALVAVIDAS_MARGEN_MS);
};

CB.reparacion.EXPLICADORES = ['columnasCDU', 'rectaNumerica', 'matrizFilasColumnas',
                              'barrasComparativas', 'monedas', 'tabla100'];

/* Qué explicador toca según la destreza del ítem. */
CB.reparacion.explicadorDe = function (destreza) {
  switch (destreza) {
    case 'suma_llevada':
    case 'resta_llevada':
    case 'valor_posicional':   return 'columnasCDU';
    case 'suma_sin_llevar':
    case 'resta_sin_llevar':   return 'tabla100';
    case 'numeracion':         return 'rectaNumerica';
    case 'multiplicacion':     return 'matrizFilasColumnas';
    case 'problemas_comparacion':
    case 'problemas_igualacion':
    case 'problemas_cambio':
    case 'problemas_combinacion': return 'barrasComparativas';
    case 'dinero':             return 'monedas';
    default:                   return 'rectaNumerica';
  }
};

/* ── Los 6 explicadores. Cada uno devuelve EXACTAMENTE 3 pasos ─────────── */

CB.reparacion.columnasCDU = function (item) {
  var a = item.operandos ? item.operandos[0] : 63;
  var b = item.operandos ? item.operandos[1] : 28;
  var esResta = (item.operacion === '-');

  if (esResta) {
    var uA = a % 10, uB = b % 10;
    return {
      titulo: 'Las columnas',
      dibujo: 'columnas',
      datos: { a: a, b: b, op: '-' },
      pasos: [
        { texto: uA + ' es menos que ' + uB + ': no llega para quitar.', foco: 'unidades' },
        { texto: 'Pido prestada una decena y la deshago en 10 unidades.', foco: 'prestamo' },
        { texto: 'A las decenas les queda una menos. Ahora sí se puede restar.', foco: 'decenas' }
      ]
    };
  }
  return {
    titulo: 'Las columnas',
    dibujo: 'columnas',
    datos: { a: a, b: b, op: '+' },
    pasos: [
      { texto: 'Sumo primero las unidades: ' + (a % 10) + ' y ' + (b % 10) + '.', foco: 'unidades' },
      { texto: 'Si paso de 10, ato un manojo de diez y lo llevo.', foco: 'llevada' },
      { texto: 'Sumo las decenas y añado la que llevaba.', foco: 'decenas' }
    ]
  };
};

CB.reparacion.rectaNumerica = function (item) {
  var r = item.respuesta;
  var d = Math.floor(r / 10) * 10;
  return {
    titulo: 'La recta de los números',
    dibujo: 'recta',
    datos: { desde: Math.max(0, d - 10), hasta: d + 20, marca: r },
    pasos: [
      { texto: 'Busco el número en la recta.', foco: 'buscar' },
      { texto: 'Miro cuál va justo antes y cuál va justo después.', foco: 'vecinos' },
      { texto: 'Cuento los saltos de uno en uno hasta llegar.', foco: 'saltos' }
    ]
  };
};

CB.reparacion.matrizFilasColumnas = function (item) {
  var f = item.operandos ? item.operandos[0] : 3;
  var c = item.operandos ? item.operandos[1] : 4;
  return {
    titulo: 'Filas y columnas',
    dibujo: 'matriz',
    datos: { filas: f, columnas: c },
    pasos: [
      { texto: 'Cuento cuántas filas hay: ' + f + '.', foco: 'filas' },
      { texto: 'Cuento cuántos hay en cada fila: ' + c + '.', foco: 'columnas' },
      { texto: 'Sumo ' + c + ' un total de ' + f + ' veces. Eso es multiplicar.', foco: 'suma' }
    ]
  };
};

CB.reparacion.barrasComparativas = function (item) {
  var a = item.datos ? item.datos[0] : 12;
  var b = item.datos ? item.datos[1] : 5;
  return {
    titulo: 'Las dos barras',
    dibujo: 'barras',
    datos: { a: a, b: b },
    pasos: [
      { texto: 'Dibujo una barra para cada uno, con lo que tiene.', foco: 'dibujar' },
      { texto: 'Miro cuál es más larga.', foco: 'comparar' },
      { texto: 'Lo que sobresale es la diferencia. Eso es lo que preguntan.', foco: 'diferencia' }
    ]
  };
};

CB.reparacion.monedas = function (item) {
  return {
    titulo: 'El valor de cada moneda',
    dibujo: 'monedas',
    datos: { piezas: item.piezas || [2, 2, 1] },
    pasos: [
      { texto: 'No cuento las monedas: cuento lo que vale cada una.', foco: 'valor' },
      { texto: 'Junto primero las que valen lo mismo.', foco: 'agrupar' },
      { texto: 'Sumo los montones para saber el total.', foco: 'sumar' }
    ]
  };
};

CB.reparacion.tabla100 = function (item) {
  var r = item.respuesta;
  return {
    titulo: 'La tabla del 100',
    dibujo: 'tabla100',
    datos: { marca: r },
    pasos: [
      { texto: 'Busco el número de partida en la tabla.', foco: 'partida' },
      { texto: 'Para sumar o quitar 1, me muevo de lado.', foco: 'lado' },
      { texto: 'Para sumar o quitar 10, me muevo arriba o abajo.', foco: 'vertical' }
    ]
  };
};

/**
 * Construye la tarjeta completa para un ítem fallado dos veces.
 * @return {explicador, titulo, dibujo, datos, pasos[3], sueloMs, salvavidasMs,
 *          codigoError, notaAdulto}
 */
CB.reparacion.tarjeta = function (item, hipotesis) {
  var nombre = CB.reparacion.explicadorDe(item.destreza);
  var base = CB.reparacion[nombre](item);

  /* Suelo temporal adicional: 4 s como mínimo, y 900 ms por palabra. Un niño de
     2.º lee ≈1 palabra por segundo; menos que esto es no dejarle leer. */
  var palabras = 0, i;
  for (i = 0; i < base.pasos.length; i++) {
    palabras += CB.util.palabras(base.pasos[i].texto).length;
  }
  var suelo = Math.max(CB.reparacion.SUELO_MS_MIN,
                       palabras * CB.reparacion.MS_POR_PALABRA);

  var cod = (hipotesis && hipotesis.length) ? hipotesis[0] : null;
  var rec = (cod && CB.datos.RECOMENDACIONES[cod]) ? CB.datos.RECOMENDACIONES[cod] : null;

  return {
    explicador: nombre,
    titulo: base.titulo,
    dibujo: base.dibujo,
    datos: base.datos,
    pasos: base.pasos,
    sueloMs: suelo,
    salvavidasMs: CB.reparacion.salvavidasDe(suelo),
    codigoError: cod,
    notaAdulto: rec ? rec.frase : null
  };
};

/* ── La puerta de interacción ───────────────────────────────────────────── */

CB.reparacion.nuevaPuerta = function (sueloMs) {
  return { tocados: [], sueloMs: sueloMs || CB.reparacion.SUELO_MS_MIN,
           abiertaTs: null, autocompletada: false };
};

/* Solo cuentan los toques EN ORDEN: 0, luego 1, luego 2. */
CB.reparacion.tocar = function (puerta, indicePaso) {
  if (indicePaso === puerta.tocados.length) puerta.tocados.push(indicePaso);
  return puerta.tocados.length;
};

CB.reparacion.puedeAbrir = function (puerta, msTranscurridos) {
  if (puerta.autocompletada) return true;
  if (puerta.tocados.length < 3) return false;
  return msTranscurridos >= puerta.sueloMs;
};

/* Salvavidas: a los 25 s sin tocar nada, se autocompleta con voz. */
CB.reparacion.autocompletar = function (puerta) {
  puerta.autocompletada = true;
  puerta.tocados = [0, 1, 2];
  return true;
};

/* Se registra en respuestas[] con el bit 32: alimenta la métrica «% de
   reparaciones con los 3 toques completados» del panel del adulto. */
CB.reparacion.completada = function (puerta) {
  return puerta.tocados.length >= 3 && !puerta.autocompletada;
};

/* ============================================================================
   27-repaso.js — CB.leitner: 3 cajas y reinserción intra-partida
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   REINSERCIÓN: un ítem fallado vuelve a aparecer entre 3 y 5 ítems después, con
   OTROS NÚMEROS del mismo tipo. Nunca el mismo ítem literal: eso sería
   memorizar la respuesta, no aprender el procedimiento (PLAN §13.5).
   ========================================================================== */

var CB = CB || {};
CB.leitner = CB.leitner || {};

CB.leitner.CAJAS = 3;
CB.leitner.DIAS = { 1: 0, 2: 3, 3: 10 };   // caja 1 → hoy; 2 → +3 días; 3 → +10

CB.leitner.subir = function (estado) {
  estado.caja = Math.min(CB.leitner.CAJAS, (estado.caja || 1) + 1);
  return estado.caja;
};

CB.leitner.bajar = function (estado) {
  estado.caja = 1;                            // el fallo devuelve SIEMPRE a la 1
  return estado.caja;
};

CB.leitner.actualizar = function (estado, acierto) {
  return acierto ? CB.leitner.subir(estado) : CB.leitner.bajar(estado);
};

CB.leitner.proximoRepaso = function (estado, hoyISO) {
  var dias = CB.leitner.DIAS[estado.caja || 1];
  if (!isFinite(dias)) dias = 0;
  return CB.util.sumarDias(hoyISO, dias);
};

CB.leitner.venceHoy = function (estado, hoyISO) {
  if (!estado || !estado.proximoRepaso) return true;
  return CB.util.diasEntre(estado.proximoRepaso, hoyISO) >= 0;
};

/* ── Reinserción intra-partida ──────────────────────────────────────────── */

CB.leitner.nuevaCola = function () { return []; };

/**
 * Programa la reaparición de un nivel fallado entre 3 y 5 ítems después.
 * @param cola     lista de {nivelId, enIndice}
 * @param indiceActual posición del ítem que se acaba de fallar
 * @param rng      inyectado: nada de Math.random
 */
CB.leitner.programarReinsercion = function (cola, nivelId, indiceActual, rng) {
  var salto = CB.util.ent(rng, 3, 5);
  cola.push({ nivelId: nivelId, enIndice: indiceActual + salto });
  return cola;
};

/* Devuelve el nivelId que toca reinsertar en este índice, o null. */
CB.leitner.tocaReinsertar = function (cola, indice) {
  var i;
  for (i = 0; i < cola.length; i++) {
    if (cola[i].enIndice <= indice) {
      return cola.splice(i, 1)[0].nivelId;
    }
  }
  return null;
};

/* ============================================================================
   28-memoria.js — Curva de olvido y los 6 estados de una veta
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   LA RAZÓN PARA VOLVER MAÑANA ES HONESTA (PLAN §13.4): una veta se ha cubierto
   de musgo y repasarla cuesta dos minutos. Eso SUSTITUYE a la racha que se
   pierde, que es un patrón oscuro prohibido por el código de diseño apropiado a
   la edad. La diferencia no es cosmética: el musgo informa de un hecho real
   sobre la memoria del niño; la racha perdida solo fabrica miedo a no volver.
   ========================================================================== */

var CB = CB || {};
CB.memoria = CB.memoria || {};

CB.memoria.ESTADOS = ['bloqueado', 'nuevo', 'aprendiendo', 'afianzada', 'dominada', 'oxidada'];

CB.memoria.ETIQUETA = {
  bloqueado:   'aún cerrada',
  nuevo:       'sin empezar',
  aprendiendo: 'en marcha',
  afianzada:   'afianzada',
  dominada:    'dominada',
  oxidada:     'con musgo'
};

CB.memoria.ICONO = {
  bloqueado: '🔒', nuevo: '·', aprendiendo: '◔',
  afianzada: '◆', dominada: '💎', oxidada: '🌿'
};

/* R = 2^(-d/S). Blindado contra fechas imposibles y relojes mal puestos. */
CB.memoria.recuperabilidad = function (estado, hoyISO) {
  if (!estado || !estado.ultimoRepasoISO) return 1;
  var d = Math.max(0, CB.util.diasEntre(estado.ultimoRepasoISO, hoyISO));
  if (!isFinite(d)) d = 0;
  var S = Math.max(1, estado.estabilidadDias || 1);
  var r = Math.pow(2, -d / S);
  return isFinite(r) ? CB.util.clamp(r, 0, 1) : 1;
};

/* La estabilidad crece con el acierto y se desploma con el fallo. */
CB.memoria.actualizarEstabilidad = function (estado, acierto) {
  var S = Math.max(1, estado.estabilidadDias || 1);
  if (acierto) {
    S = Math.min(180, S * 1.9 + 0.5);
  } else {
    S = Math.max(1, S * 0.4);
  }
  estado.estabilidadDias = Math.round(S * 10) / 10;
  return estado.estabilidadDias;
};

CB.memoria.clasificar = function (estado, hoyISO, bloqueado) {
  if (bloqueado) return 'bloqueado';
  if (!estado || !estado.n) return 'nuevo';

  var p1 = (estado.aciertosPrimerIntento || 0) / estado.n;
  var R = CB.memoria.recuperabilidad(estado, hoyISO);
  var eraSolida = (estado.estado === 'afianzada' || estado.estado === 'dominada');

  /* Oxidada: era sólida y se ha olvidado. Es el único estado que MIRA ATRÁS. */
  if (eraSolida && R < 0.6) return 'oxidada';

  /* Dominada, criterio endurecido (§17.2 métrica 5): no basta con acertar
     mucho; hace falta volumen, precisión a primer intento y persistencia en el
     tiempo. Sin las tres condiciones, «dominada» es una palabra vacía que el
     informe le enseña a una familia. */
  if (estado.n >= 12 && p1 >= 0.90 && (estado.estabilidadDias || 1) >= 6 && R >= 0.8) {
    return 'dominada';
  }
  if (p1 >= 0.75) return 'afianzada';
  return 'aprendiendo';
};

/* Recalcula y persiste el estado de todas las destrezas del perfil. */
CB.memoria.reclasificarTodo = function (perfil, hoyISO) {
  if (!perfil || !perfil.destrezas) return;
  var k;
  for (k in perfil.destrezas) {
    if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
    perfil.destrezas[k].estado = CB.memoria.clasificar(perfil.destrezas[k], hoyISO, false);
  }
};

/* Destrezas vencidas hoy, ordenadas por recuperabilidad ascendente: primero las
   que más se han olvidado. */
CB.memoria.vencidosHoy = function (perfil, hoyISO) {
  if (!perfil || !perfil.destrezas) return [];
  var lista = [], k, d, R;
  for (k in perfil.destrezas) {
    if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
    d = perfil.destrezas[k];
    if (!d.n) continue;
    R = CB.memoria.recuperabilidad(d, hoyISO);
    if (R < 0.7) lista.push({ destreza: k, R: R });
  }
  lista.sort(function (a, b) { return a.R - b.R; });
  return lista.map(function (x) { return x.destreza; });
};

/* Marca un repaso hecho hoy. */
CB.memoria.repasado = function (estado, acierto, hoyISO) {
  CB.memoria.actualizarEstabilidad(estado, acierto);
  estado.ultimoRepasoISO = hoyISO;
  estado.proximoRepasoISO = CB.util.sumarDias(
    hoyISO, Math.max(1, Math.round(estado.estabilidadDias || 1))
  );
  return estado;
};

/* ¿Hay alguna veta que se acabe de restaurar? Alimenta el logro «Veta
   restaurada», que concede luz. Solo cuenta si han pasado ≥48 h desde el último
   repaso: sin esa condición, el logro se farmearía repasando en bucle. */
CB.memoria.vetaRestaurada = function (estadoAntes, estadoDespues, hoyISO) {
  if (!estadoAntes || estadoAntes !== 'oxidada') return false;
  if (estadoDespues !== 'afianzada' && estadoDespues !== 'dominada') return false;
  return true;
};

CB.memoria.hanPasado48h = function (estado, hoyISO) {
  if (!estado || !estado.ultimoRepasoISO) return true;
  return CB.util.diasEntre(estado.ultimoRepasoISO, hoyISO) >= 2;
};

/* ============================================================================
   29-grafo.js — DAG de prerrequisitos de los 92 niveles
   ----------------------------------------------------------------------------
   FUNCIÓN PURA. Lee CB.catalogo, no lo modifica.

   casos-motor.js verifica: el grafo es ACÍCLICO, TODO nodo es alcanzable desde
   el conjunto de niveles con prerrequisitos:[], y NINGUNA destreza con
   ampliacion:true es prerrequisito de una nuclear (CU5).
   ========================================================================== */

var CB = CB || {};
CB.grafo = CB.grafo || {};

/* Un nivel está abierto si TODOS sus prerrequisitos se han superado.
   Superado = el niño lo ha visto al menos 3 veces con ≥60 % de acierto. Con un
   umbral del 100 % el grafo sería un muro; con 1 acierto suelto sería ruido. */
CB.grafo.superado = function (nivelId, perfil) {
  var e = (perfil && perfil.niveles) ? perfil.niveles[nivelId] : null;
  if (!e || !e.n) return false;
  return e.n >= 3 && (e.aciertos / e.n) >= 0.6;
};

CB.grafo.estado = function (nivelId, perfil) {
  var nivel = CB.catalogo.get(nivelId);
  if (!nivel) return 'bloqueado';
  var pre = nivel.prerrequisitos || [], i;

  /* Los niveles de ampliación siguen sus prerrequisitos, pero además exigen que
     el adulto haya activado su flag. Nunca bloquean nada nuclear (CU5). */
  if (nivel.ampliacion && nivel.flagAdulto) {
    var aj = (perfil && perfil.ajustes) ? perfil.ajustes : {};
    if (!aj[nivel.flagAdulto]) return 'bloqueado';
  }

  for (i = 0; i < pre.length; i++) {
    if (!CB.grafo.superado(pre[i], perfil)) return 'bloqueado';
  }
  return 'abierta';
};

CB.grafo.desbloqueados = function (perfil) {
  var ids = CB.catalogo.ids(), out = [], i;
  for (i = 0; i < ids.length; i++) {
    if (CB.grafo.estado(ids[i], perfil) === 'abierta') out.push(ids[i]);
  }
  return out;
};

/* Frontera: abiertos y todavía sin empezar. Es lo que se destaca en el Mapa de
   Destrezas bajo el texto «Lo siguiente que puedes cavar». */
CB.grafo.frontera = function (perfil) {
  var abiertos = CB.grafo.desbloqueados(perfil), out = [], i, e;
  for (i = 0; i < abiertos.length; i++) {
    e = (perfil && perfil.niveles) ? perfil.niveles[abiertos[i]] : null;
    if (!e || !e.n) out.push(abiertos[i]);
  }
  return out;
};

/* Camino de prerrequisitos hasta un nivel, en orden de aprendizaje. */
CB.grafo.rutaHasta = function (nivelId, perfil) {
  var visto = {}, ruta = [];
  function baja(id) {
    if (visto[id]) return;
    visto[id] = true;
    var n = CB.catalogo.get(id);
    if (!n) return;
    var pre = n.prerrequisitos || [], i;
    for (i = 0; i < pre.length; i++) baja(pre[i]);
    ruta.push(id);
  }
  baja(nivelId);
  return ruta;
};

/* Un prerrequisito YA DOMINADO del concepto, para el escalón 4 de la escalera
   anti-frustración: reconstruir desde abajo (§12.5). */
CB.grafo.prerrequisitoDominado = function (nivelId, perfil) {
  var ruta = CB.grafo.rutaHasta(nivelId, perfil), i, id;
  for (i = ruta.length - 2; i >= 0; i--) {     // -2: se salta el propio nivel
    id = ruta[i];
    if (CB.grafo.superado(id, perfil)) return id;
  }
  return null;
};

/* ── Verificaciones estructurales, usadas por casos-motor.js ────────────── */

CB.grafo.esAciclico = function () {
  var ids = CB.catalogo.ids();
  var estado = {};   // 0 sin visitar, 1 en pila, 2 cerrado
  var ok = true;

  function visita(id) {
    if (estado[id] === 1) { ok = false; return; }
    if (estado[id] === 2) return;
    estado[id] = 1;
    var n = CB.catalogo.get(id);
    var pre = (n && n.prerrequisitos) ? n.prerrequisitos : [];
    for (var i = 0; i < pre.length; i++) visita(pre[i]);
    estado[id] = 2;
  }
  for (var i = 0; i < ids.length && ok; i++) visita(ids[i]);
  return ok;
};

/* Todo nodo alcanzable desde los que no tienen prerrequisitos. */
CB.grafo.huerfanos = function () {
  var ids = CB.catalogo.ids(), i, n;
  var alcanzable = {}, cambios = true;

  for (i = 0; i < ids.length; i++) {
    n = CB.catalogo.get(ids[i]);
    if (!n.prerrequisitos || !n.prerrequisitos.length) alcanzable[ids[i]] = true;
  }
  while (cambios) {
    cambios = false;
    for (i = 0; i < ids.length; i++) {
      if (alcanzable[ids[i]]) continue;
      n = CB.catalogo.get(ids[i]);
      var pre = n.prerrequisitos || [], todos = pre.length > 0, j;
      for (j = 0; j < pre.length; j++) if (!alcanzable[pre[j]]) todos = false;
      if (todos) { alcanzable[ids[i]] = true; cambios = true; }
    }
  }
  var out = [];
  for (i = 0; i < ids.length; i++) if (!alcanzable[ids[i]]) out.push(ids[i]);
  return out;
};

/* CU5: ninguna ampliación es prerrequisito de un nivel nuclear. */
CB.grafo.ampliacionesComoPrerrequisito = function () {
  var ids = CB.catalogo.ids(), out = [], i, j, n, pre, p;
  for (i = 0; i < ids.length; i++) {
    n = CB.catalogo.get(ids[i]);
    if (n.ampliacion) continue;
    pre = n.prerrequisitos || [];
    for (j = 0; j < pre.length; j++) {
      p = CB.catalogo.get(pre[j]);
      if (p && p.ampliacion) out.push(n.id + ' ← ' + p.id);
    }
  }
  return out;
};

/* ============================================================================
   2A-escalera.js — La escalera anti-frustración de 5 escalones
   ----------------------------------------------------------------------------
   FUNCIÓN PURA.

   EL ESCALÓN 5 EXISTE PORQUE EL PLAN v1 NO DECÍA QUÉ PASABA EN EL 4.º FALLO DEL
   MISMO CONCEPTO, y ese niño —posible discalculia, o simplemente un mal día— es
   justo el que más importa. Sin escalón 5, el juego le seguía sirviendo el mismo
   concepto hasta agotarle las tres luces.

   El concepto se retira del guion SIN DECIRLE NADA AL NIÑO. Anunciar «voy a
   quitarte esto porque no te sale» convierte una ayuda en una etiqueta.
   ========================================================================== */

var CB = CB || {};
CB.escalera = CB.escalera || {};

CB.escalera.ESCALONES = {
  1: { accion: 'pista',        apagaLuz: false, rompeRacha: false },
  2: { accion: 'reparacion',   apagaLuz: true,  rompeRacha: true  },
  3: { accion: 'bajarD_opciones', apagaLuz: false, rompeRacha: false },
  4: { accion: 'prerrequisito',   apagaLuz: false, rompeRacha: false },
  5: { accion: 'enPausa',         apagaLuz: false, rompeRacha: false }
};

/**
 * @param fallosConcepto nº de fallos del MISMO concepto en esta partida
 * @param fallosItem     nº de fallos del ítem actual (1 o 2)
 */
CB.escalera.siguienteEscalon = function (fallosConcepto, fallosItem) {
  /* Escalones 1 y 2: dentro del propio ítem. */
  if (fallosItem === 1) {
    return { escalon: 1, accion: 'pista', apagaLuz: false, rompeRacha: false,
             texto: 'Rocarr te enseña por dónde va.' };
  }
  if (fallosItem >= 2 && fallosConcepto < 2) {
    return { escalon: 2, accion: 'reparacion', apagaLuz: true, rompeRacha: true,
             texto: 'Vamos a verlo paso a paso.' };
  }

  /* Escalones 3, 4 y 5: acumulados por CONCEPTO a lo largo de la partida. */
  if (fallosConcepto === 2) {
    return { escalon: 3, accion: 'bajarD_opciones', apagaLuz: true, rompeRacha: true,
             D: 1, formato: 'opciones4',
             texto: 'El siguiente de este tipo será más fácil.' };
  }
  if (fallosConcepto === 3) {
    return { escalon: 4, accion: 'prerrequisito', apagaLuz: true, rompeRacha: true,
             texto: 'Volvemos un paso atrás para coger carrerilla.' };
  }
  return { escalon: 5, accion: 'enPausa', apagaLuz: true, rompeRacha: true,
           silencioso: true,
           notaAdulto: 'Conviene trabajarlo con material manipulativo antes de ' +
                       'volver a la pantalla.' };
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
  var k, n = 0;
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

/* ============================================================================
   30-ui.js — Pintado. Toca el DOM (serie 30-, fuera de la regla de frontera)
   ----------------------------------------------------------------------------
   REGLA DE SEGURIDAD (PLAN §15.8): todo texto que venga del perfil o de un
   fichero importado se pinta con textContent, NUNCA con innerHTML. En este
   fichero no hay ni una asignación a innerHTML con variables.

   POOL DE 24 PARTÍCULAS: se crean una vez y se reciclan. Crear y destruir nodos
   en cada acierto produce tirones en un Chromebook de 2019, que es justo el
   dispositivo objetivo.
   ========================================================================== */

var CB = CB || {};
CB.ui = CB.ui || {};

CB.ui.POOL_PARTICULAS = 24;
CB.ui._particulas = [];
CB.ui._sigParticula = 0;

/* ── Utilidades de creación ─────────────────────────────────────────────── */
CB.ui.crear = function (etiqueta, clase, texto) {
  var el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto != null) el.textContent = String(texto);
  return el;
};

CB.ui.vaciar = function (el) {
  if (!el) return;
  while (el.firstChild) el.removeChild(el.firstChild);
};

CB.ui.boton = function (texto, clase, alPulsar, datos) {
  var b = CB.ui.crear('button', 'btn-bloque ' + (clase || ''), texto);
  b.type = 'button';
  if (datos) {
    var k;
    for (k in datos) {
      if (Object.prototype.hasOwnProperty.call(datos, k)) b.setAttribute('data-' + k, datos[k]);
    }
  }
  if (alPulsar) b.addEventListener('click', alPulsar);
  return b;
};

/* ── medirLineas: el MISMO algoritmo que usa el validador (§9.3) ────────────
   Si la interfaz cortase por píxeles y el validador por caracteres, el
   invariante 7 mediría una cosa y la pantalla mostraría otra. */
CB.ui.ANCHO_LINEA = 34;
CB.ui.medirLineas = function (texto) {
  return CB.util.cortarLineas(texto, CB.ui.ANCHO_LINEA);
};

/* ── HUD ────────────────────────────────────────────────────────────────── */
CB.ui.pintarHUD = function (estado) {
  var cont = document.getElementById('hud-luces');
  if (cont) {
    CB.ui.vaciar(cont);
    var i, luz;
    for (i = 0; i < CB.vidas.TOPE; i++) {
      if (i >= Math.max(CB.vidas.INICIALES, estado.luces)) break;
      luz = CB.ui.crear('span', 'luz');
      luz.setAttribute('data-estado', i < estado.luces ? 'encendida' : 'apagada');
      cont.appendChild(luz);
    }
    cont.setAttribute('aria-label', CB.a11y.textoLuces(estado.luces, CB.vidas.TOPE));
  }
  var g = document.getElementById('hud-gemas');
  /* El contador de gemas SOLO SUBE. Nunca baja, nunca es negativo (§3.4). */
  if (g) g.textContent = String(Math.max(0, estado.gemas || 0));
};

CB.ui.parpadeoGris = function () {
  var g = document.querySelector('#p-partida .gemas');
  if (!g) return;
  g.classList.add('gemas--parpadeo');
  setTimeout(function () { g.classList.remove('gemas--parpadeo'); }, 240);
};

CB.ui.encenderLuz = function (indice) {
  var luces = document.querySelectorAll('#hud-luces .luz');
  if (luces[indice]) {
    luces[indice].setAttribute('data-estado', 'encendida');
    luces[indice].classList.add('luz--recien-encendida');
    setTimeout(function () { luces[indice].classList.remove('luz--recien-encendida'); }, 1600);
  }
};

/* ── Enunciado del ítem ─────────────────────────────────────────────────── */
CB.ui.pintarItem = function (item) {
  var cont = document.getElementById('item-enunciado');
  if (!cont) return;
  CB.ui.vaciar(cont);
  cont.className = 'panel-bloque';

  /* Problemas de enunciado: frases separadas, tipografía del sistema, 34ch. */
  if (item.frases && item.frases.length) {
    var caja = CB.ui.crear('div', 'enunciado');
    var i;
    for (i = 0; i < item.frases.length; i++) {
      var p = CB.ui.crear('p', 'frase-enunciado', item.frases[i]);
      p.setAttribute('data-frase', i);
      caja.appendChild(p);
    }
    cont.appendChild(caja);
    /* El altavoz va DENTRO del enunciado, donde está lo que hay que oír, y no
       en la barra: P3 retiró el de la barra a petición expresa y esto no lo
       devuelve. Llama a accionLeerSuave, que no levanta el bloqueo antiazar.
       Solo en problemas: en «6 − 3» no hay nada que leer. */
    var altavoz = CB.ui.boton('🔊 Leer', 'btn-bloque--icono enunciado__altavoz', function () {
      if (CB.partida && CB.partida.accionLeerSuave) CB.partida.accionLeerSuave();
    });
    altavoz.setAttribute('aria-label', 'Leer el problema en voz alta');
    cont.appendChild(altavoz);
    return;
  }

  /* Multiplicación: matriz y suma reiterada SIEMPRE ANTES que el resultado.
     Criterio de HECHO de F7, sin excepción (§6.5). */
  if (item.visual && item.visual.tipo === 'matriz') {
    cont.appendChild(CB.ui.matriz(item.visual.filas, item.visual.columnas));
    if (item.sumaReiterada) {
      cont.appendChild(CB.ui.crear('p', 'texto-menor', item.sumaReiterada));
    }
  }

  if (item.visual && item.visual.tipo === 'conteo') {
    cont.appendChild(CB.ui.conteo(item.visual.n));
  }

  if (item.visual && item.visual.tipo === 'balanza') {
    cont.appendChild(CB.ui.balanza(item.visual.a, item.visual.b));
  }

  if (item.visual && item.visual.tipo === 'fila') {
    cont.appendChild(CB.ui.filaVagonetas(item.visual.total, item.visual.marcada));
  }

  if (item.preguntaPrevia) {
    cont.appendChild(CB.ui.crear('p', 'texto-menor', item.preguntaPrevia));
  }

  var texto = item.consigna || '';
  var esOperacion = !!item.operacion && !item.visual;
  var linea = CB.ui.crear('p', esOperacion ? 'operacion' : 'enunciado', texto);
  cont.appendChild(linea);
};

/* Matriz de filas y columnas para la multiplicación. */
CB.ui.matriz = function (filas, columnas) {
  var caja = CB.ui.crear('div', 'lienzo-explicador');
  var rej = CB.ui.crear('div');
  rej.style.display = 'grid';
  rej.style.gridTemplateColumns = 'repeat(' + columnas + ', 20px)';
  rej.style.gap = '4px';
  var i, total = filas * columnas;
  for (i = 0; i < total && i < 120; i++) {
    var b = CB.ui.crear('span');
    b.style.width = '20px'; b.style.height = '20px';
    b.style.background = 'var(--deco-cristal)';
    b.style.boxShadow = 'inset 3px 3px 0 0 var(--deco-cristal-cla), ' +
                        'inset -3px -3px 0 0 var(--deco-cristal-osc)';
    rej.appendChild(b);
  }
  caja.appendChild(rej);
  caja.setAttribute('aria-label', filas + ' filas de ' + columnas);
  return caja;
};

CB.ui.conteo = function (n) {
  var caja = CB.ui.crear('div', 'lienzo-explicador');
  var i;
  for (i = 0; i < n && i < 60; i++) {
    var b = CB.ui.crear('span');
    b.style.width = '24px'; b.style.height = '24px';
    b.style.background = 'var(--deco-tierra)';
    b.style.boxShadow = 'inset 4px 4px 0 0 var(--deco-tierra-cla), ' +
                        'inset -4px -4px 0 0 var(--deco-tierra-osc)';
    caja.appendChild(b);
  }
  caja.setAttribute('aria-label', n + ' bloques');
  return caja;
};

CB.ui.balanza = function (a, b) {
  var caja = CB.ui.crear('div', 'balanza');
  function plato(v) {
    var p = CB.ui.crear('div', 'balanza__plato');
    p.appendChild(CB.ui.crear('div', 'balanza__cifra', v));
    var i, n = Math.min(9, Math.max(1, Math.round(v / Math.max(1, Math.max(a, b)) * 9)));
    for (i = 0; i < n; i++) p.appendChild(CB.ui.crear('span', 'balanza__cubo'));
    return p;
  }
  caja.appendChild(plato(a));
  caja.appendChild(CB.ui.crear('div', 'balanza__cifra', '?'));
  caja.appendChild(plato(b));
  caja.setAttribute('aria-label', a + ' y ' + b);
  return caja;
};

CB.ui.filaVagonetas = function (total, marcada) {
  var caja = CB.ui.crear('div', 'fila-ordenar');
  var i;
  for (i = 1; i <= total && i <= 20; i++) {
    var v = CB.ui.crear('span', 'hueco-orden', i === marcada ? '★' : '·');
    if (i === marcada) v.style.background = 'var(--deco-oro-cla)';
    caja.appendChild(v);
  }
  caja.setAttribute('aria-label', 'Fila de ' + total + ' vagonetas, marcada la ' + marcada);
  return caja;
};

/* ── Mensajes ───────────────────────────────────────────────────────────── */
/* El nodo de mensaje de la pantalla que está a la vista. #item-mensaje vive
   DENTRO de <section id="p-partida">, así que mientras se calibra está oculto:
   escribir ahí el «¡Muy bien!» de cada una de las cuatro preguntas equivalía a
   no dar ninguna respuesta. Mismo patrón que usa 32-componentes.js para elegir
   entre cal-respuesta e item-respuesta. */
CB.ui.nodoMensaje = function () {
  var id = (CB.pantallas && CB.pantallas.actual === 'p-calibracion')
    ? 'cal-mensaje' : 'item-mensaje';
  return document.getElementById(id) || document.getElementById('item-mensaje');
};

CB.ui.mensaje = function (texto, tipo) {
  var m = CB.ui.nodoMensaje();
  if (!m) return;
  m.hidden = false;
  m.setAttribute('data-tipo', tipo);
  m.textContent = texto;
  CB.a11y.anunciar(texto);
};

CB.ui.ocultarMensaje = function () {
  /* Se limpian LOS DOS: si la pantalla cambió entre mostrar y ocultar, el que
     quedó escrito no es el que ahora devuelve nodoMensaje(). */
  ['item-mensaje', 'cal-mensaje'].forEach(function (id) {
    var m = document.getElementById(id);
    if (m) { m.hidden = true; m.textContent = ''; }
  });
};

/* ── Bono retrospectivo: GANANCIA, nunca pérdida en directo (§3.4) ──────── */
CB.ui.hileraBono = function (n) {
  var h = document.getElementById('item-bono');
  if (!h) return;
  CB.ui.vaciar(h);
  if (!n || n <= 0) { h.hidden = true; return; }
  h.hidden = false;
  var i;
  for (i = 0; i < n; i++) h.appendChild(CB.ui.crear('span', 'gemas__icono'));
  h.appendChild(CB.ui.crear('span', null, '+' + n + ' por rapidez'));
};

/* ── Partículas ─────────────────────────────────────────────────────────── */
CB.ui.iniciarParticulas = function () {
  if (CB.ui._particulas.length) return;
  var i, p;
  for (i = 0; i < CB.ui.POOL_PARTICULAS; i++) {
    p = CB.ui.crear('span', 'particula');
    document.body.appendChild(p);
    CB.ui._particulas.push(p);
  }
};

CB.ui.particulas = function (x, y, color, cuantas) {
  CB.ui.iniciarParticulas();
  var n = Math.min(cuantas || 8, CB.ui.POOL_PARTICULAS);
  var i, p, ang, dist;
  for (i = 0; i < n; i++) {
    p = CB.ui._particulas[CB.ui._sigParticula % CB.ui.POOL_PARTICULAS];
    CB.ui._sigParticula++;
    p.classList.remove('particula--viva');
    /* Reflow forzado para que la animación se reinicie de verdad. */
    void p.offsetWidth;
    p.style.left = (x - 6) + 'px';
    p.style.top = (y - 6) + 'px';
    p.style.background = color || 'var(--deco-cristal)';
    ang = (Math.PI * 2 * i) / n;
    dist = 40 + (i % 3) * 18;
    p.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
    p.style.setProperty('--dy', Math.round(Math.sin(ang) * dist + 40) + 'px');
    p.classList.add('particula--viva');
  }
};

CB.ui.particulasDe = function (el, color) {
  if (!el) return;
  var r = el.getBoundingClientRect();
  CB.ui.particulas(r.left + r.width / 2, r.top + r.height / 2, color, 10);
};

/* ── Criaturas ──────────────────────────────────────────────────────────── */
CB.ui.CRIATURAS = {
  cubi: '🧍', rocarr: '🪨', gluglu: '💧', chispa: '✨', blopi: '🟩',
  tronquete: '🌳', ranacubo: '🐸', cristalina: '💠', brasita: '🔥',
  chispita: '⭐', vagoneto: '🛒'
};

/* Cada criatura tiene su propia reacción. Un niño debe poder decir qué hace
   Rocarr y qué hace Gluglú sin haber leído nada (criterio de HECHO de F6). */
CB.ui.personaje = function (quien, estado) {
  var el = document.getElementById('cri-' + quien);
  if (!el) return;
  el.hidden = false;
  /* OJO al renombrar: estas dos listas NO las ve un codemod de clases, porque
     aqui los nombres no estan en posicion de clase —estan en un array y en una
     tabla de consulta, y classList.remove/add reciben una VARIABLE. Quien lo
     atrapa si se olvidan es la direccion 1 del cruce (herramientas/
     cruzar-clases.mjs): la clase se quedaria en el CSS sin que nadie la nombre. */
  ['criatura--flota', 'criatura--saltito', 'criatura--asiente',
   'criatura--gotea', 'criatura--gira'].forEach(function (c) {
    el.classList.remove(c);
  });
  void el.offsetWidth;
  var anim = { acierto: 'criatura--saltito', pista: 'criatura--asiente',
               moja: 'criatura--gotea', racha: 'criatura--gira' }[estado];
  if (anim) el.classList.add(anim);
  else el.classList.add('criatura--flota');
};

CB.ui.ocultarPersonaje = function (quien) {
  var el = document.getElementById('cri-' + quien);
  if (el) el.hidden = true;
};

/* ── Lectura guiada: resalta la palabra que se está leyendo ─────────────── */
CB.ui.resaltarLinea = function (indice) {
  var lineas = document.querySelectorAll('#item-enunciado .frase-enunciado');
  var i;
  for (i = 0; i < lineas.length; i++) {
    lineas[i].classList.toggle('enunciado__linea--activa', i === indice);
  }
};

CB.ui.resaltarPalabra = function (indice, texto) {
  var caja = document.querySelector('#item-enunciado .enunciado');
  if (!caja) return;
  if (indice < 0) { CB.ui.resaltarLinea(-1); return; }
  /* Se resalta la frase que contiene esa palabra: resaltar palabra a palabra
     exigiría reconstruir el DOM en cada paso, y eso rompe el lector de pantalla. */
  var acumulado = 0, i;
  var frases = caja.querySelectorAll('.frase-enunciado');
  for (i = 0; i < frases.length; i++) {
    var n = CB.util.palabras(frases[i].textContent).length;
    if (indice < acumulado + n) { CB.ui.resaltarLinea(i); return; }
    acumulado += n;
  }
};

/* ── Bioma y cielo ──────────────────────────────────────────────────────── */
CB.ui.pintarBioma = function (bioma, avance) {
  var z = document.getElementById('zona-juego');
  if (z) {
    z.className = 'zona-juego bioma bioma--' + bioma;
  }
  var cielo = document.querySelector('#p-partida .cielo');
  if (!cielo) return;
  var paso = CB.util.clamp(Math.floor((avance || 0) * 6), 0, 5);
  cielo.className = 'cielo cielo--' + paso;
  /* Capa 2: solo si el navegador la soporta de verdad (§10.7). */
  cielo.style.setProperty('--avance', String(CB.util.clamp(avance || 0, 0, 1)));
};

/* ── Tarjeta de reparación: PUERTA DE INTERACCIÓN, no temporizador ──────────
   El botón «¡Lo pillo!» aparece deshabilitado y solo se habilita cuando el niño
   ha tocado los 3 pasos EN ORDEN, con un suelo temporal de max(4 s, palabras ×
   900 ms). Salvavidas a los 25 s: la tarjeta se autocompleta con voz y el botón
   se habilita. NUNCA se deja al niño atrapado (§12.6). */
CB.ui._timersReparacion = null;

/* Limpia los temporizadores de una tarjeta anterior. SIN ESTO la puerta de
   interacción quedaba anulada en cuanto había una segunda reparación en la
   sesión: el setInterval de la tarjeta vieja seguía vivo, apuntaba al MISMO
   nodo #btn-lo-pillo y lo habilitaba usando el estado de SU puerta (ya
   completada). Es decir, a partir del segundo fallo grave del día el botón
   «¡Lo pillo!» volvía a ser saltable de un toque, que es exactamente el defecto
   que §12.6 existe para impedir. */
CB.ui.limpiarReparacion = function () {
  if (!CB.ui._timersReparacion) return;
  clearTimeout(CB.ui._timersReparacion.salvavidas);
  clearInterval(CB.ui._timersReparacion.reloj);
  CB.ui._timersReparacion = null;
};

CB.ui.mostrarReparacion = function (item, hipotesis, alTerminar) {
  CB.ui.limpiarReparacion();

  var tarjeta = CB.reparacion.tarjeta(item, hipotesis);
  var puerta = CB.reparacion.nuevaPuerta(tarjeta.sueloMs);
  var abiertaTs = CB.util.ahora();

  CB.pantallas.ir('p-reparacion');

  var lienzo = document.getElementById('rep-lienzo');
  CB.ui.vaciar(lienzo);
  lienzo.appendChild(CB.ui.crear('h2', null, tarjeta.titulo));
  lienzo.appendChild(CB.ui.dibujoReparacion(tarjeta));

  var cont = document.getElementById('rep-pasos');
  CB.ui.vaciar(cont);

  var boton = document.getElementById('btn-lo-pillo');
  boton.disabled = true;

  var ayuda = document.getElementById('rep-ayuda');

  /* El botón NUNCA está inerte en silencio: el texto de ayuda dice siempre qué
     falta. Un botón que no responde y no explica por qué hace que el niño crea
     que el juego está roto. */
  function revisar() {
    var ms = CB.util.ahora() - abiertaTs;
    if (boton.disabled && CB.reparacion.puedeAbrir(puerta, ms)) {
      boton.disabled = false;
      boton.classList.add('btn-bloque--destello');
      if (ayuda) ayuda.textContent = 'Ya lo tienes. Sigue cuando quieras.';
      return;
    }
    if (!boton.disabled || !ayuda) return;

    if (puerta.tocados.length < 3) {
      ayuda.textContent = 'Toca los tres pasos para verlo entero. Llevas ' +
                          puerta.tocados.length + ' de 3.';
    } else {
      ayuda.textContent = 'Rocarr está terminando de explicártelo…';
    }
  }

  tarjeta.pasos.forEach(function (paso, i) {
    var fila = CB.ui.crear('button', 'paso-reparacion');
    fila.type = 'button';
    fila.setAttribute('data-hecho', 'no');
    fila.appendChild(CB.ui.crear('span', 'paso-reparacion__numero', String(i + 1)));
    fila.appendChild(CB.ui.crear('span', null, paso.texto));
    fila.addEventListener('click', function () {
      CB.reparacion.tocar(puerta, i);
      if (puerta.tocados.indexOf(i) !== -1) {
        fila.setAttribute('data-hecho', 'si');
        CB.ui.resaltarPasoDibujo(paso.foco);
        CB.audio.sfx('rocarr');
        CB.voz.leer(paso.texto);
      }
      revisar();
    });
    cont.appendChild(fila);
  });

  if (ayuda) ayuda.textContent = 'Toca los tres pasos para verlo entero.';

  /* Salvavidas: siempre por detrás del suelo temporal, nunca antes de 25 s */
  var salvavidas = setTimeout(function () {
    CB.reparacion.autocompletar(puerta);
    var filas = cont.querySelectorAll('.paso-reparacion');
    var i;
    for (i = 0; i < filas.length; i++) filas[i].setAttribute('data-hecho', 'si');
    boton.disabled = false;
    boton.classList.add('btn-bloque--destello');
    if (ayuda) ayuda.textContent = 'Rocarr te lo ha enseñado. Puedes seguir.';
    CB.voz.leer(tarjeta.pasos.map(function (p) { return p.texto; }).join(' '));
  }, tarjeta.salvavidasMs);

  var reloj = setInterval(revisar, 400);
  CB.ui._timersReparacion = { salvavidas: salvavidas, reloj: reloj };

  boton.onclick = function () {
    if (boton.disabled) return;
    CB.ui.limpiarReparacion();
    boton.classList.remove('btn-bloque--destello');
    boton.onclick = null;
    alTerminar(CB.reparacion.completada(puerta));
  };
};

/* Dibujo del explicador. Seis formas distintas, no un texto con otro color. */
CB.ui.dibujoReparacion = function (tarjeta) {
  var caja = CB.ui.crear('div', 'lienzo-explicador');
  var d = tarjeta.datos, i;

  if (tarjeta.dibujo === 'columnas') {
    ['C', 'D', 'U'].forEach(function (letra, idx) {
      var col = CB.ui.crear('div', 'columna-cdu');
      col.setAttribute('data-columna', letra);
      col.setAttribute('data-activa', 'no');
      col.appendChild(CB.ui.crear('span', 'texto-menor', letra));
      var pot = Math.pow(10, 2 - idx);
      col.appendChild(CB.ui.crear('span', null, Math.floor(d.a / pot) % 10));
      col.appendChild(CB.ui.crear('span', null, d.op));
      col.appendChild(CB.ui.crear('span', null, Math.floor(d.b / pot) % 10));
      caja.appendChild(col);
    });
    var manojo = CB.ui.crear('div', 'manojo-decena');
    for (i = 0; i < 10; i++) manojo.appendChild(CB.ui.crear('b'));
    caja.appendChild(manojo);

  } else if (tarjeta.dibujo === 'matriz') {
    caja.appendChild(CB.ui.matriz(d.filas, d.columnas));

  } else if (tarjeta.dibujo === 'barras') {
    [d.a, d.b].forEach(function (v) {
      var barra = CB.ui.crear('div');
      barra.style.display = 'flex'; barra.style.gap = '2px';
      var n = Math.min(20, v);
      for (i = 0; i < n; i++) {
        var b = CB.ui.crear('span');
        b.style.width = '14px'; b.style.height = '28px';
        b.style.background = 'var(--deco-cobre)';
        barra.appendChild(b);
      }
      barra.appendChild(CB.ui.crear('span', null, ' ' + v));
      caja.appendChild(barra);
    });

  } else if (tarjeta.dibujo === 'monedas') {
    (d.piezas || []).forEach(function (v) {
      caja.appendChild(CB.ui.crear('span', 'moneda', v + ' €'));
    });

  } else if (tarjeta.dibujo === 'tabla100') {
    var rej = CB.ui.crear('div');
    rej.style.display = 'grid';
    rej.style.gridTemplateColumns = 'repeat(10, 24px)';
    rej.style.gap = '2px';
    for (i = 1; i <= 100; i++) {
      var c = CB.ui.crear('span', null, i);
      c.style.fontSize = '11px'; c.style.textAlign = 'center';
      c.style.background = (i === d.marca) ? 'var(--deco-oro-cla)' : 'var(--bg-texto-panel)';
      rej.appendChild(c);
    }
    caja.appendChild(rej);

  } else {
    var recta = CB.ui.crear('div', 'fila-ordenar');
    for (i = d.desde; i <= d.hasta && i - d.desde < 20; i++) {
      var h = CB.ui.crear('span', 'hueco-orden', i);
      h.style.width = '48px'; h.style.height = '48px'; h.style.fontSize = '16px';
      if (i === d.marca) h.style.background = 'var(--deco-oro-cla)';
      recta.appendChild(h);
    }
    caja.appendChild(recta);
  }
  return caja;
};

CB.ui.resaltarPasoDibujo = function (foco) {
  var mapa = { unidades: 'U', decenas: 'D', prestamo: 'D', llevada: 'D' };
  var letra = mapa[foco];
  var cols = document.querySelectorAll('.columna-cdu');
  var i;
  for (i = 0; i < cols.length; i++) {
    cols[i].setAttribute('data-activa',
      letra && cols[i].getAttribute('data-columna') === letra ? 'si' : 'no');
  }
};

/* ── Barra de progreso genérica ─────────────────────────────────────────── */
CB.ui.barra = function (fraccion) {
  var b = CB.ui.crear('div', 'barra-progreso-mundo');
  var i = CB.ui.crear('i');
  i.style.width = Math.round(CB.util.clamp(fraccion, 0, 1) * 100) + '%';
  b.appendChild(i);
  return b;
};

/* ── Reloj de arena de la cuenta atrás ──────────────────────────────────────
   30 segundos por ítem, visibles. El plan original decía expresamente lo
   contrario («la rapidez suma, nunca resta; jamás una cuenta atrás que corre
   mientras el niño piensa») y esto lo cambia por petición explícita. Las dos
   salvaguardas que SÍ se conservan, porque no son de gusto:

   1. El modo «Sin prisa» apaga la cuenta atrás entera. Un límite de tiempo que
      no se puede desactivar incumple la WCAG 2.2.1, y esto es material escolar
      sujeto a la EN 301 549.
   2. Quedarse sin tiempo NO apaga una luz. Eso ya era así y sigue siéndolo:
      lo comprueba CB.vidas.timeout().

   La cifra es texto de verdad y el dibujo es aria-hidden. Un lector de pantalla
   lee «18», no «reloj de arena a dos tercios».
   ────────────────────────────────────────────────────────────────────────── */
/* ── LA CINTA ───────────────────────────────────────────────────────────────
   Un solo cartel para los nueve momentos que merecen uno, y UN SOLO NODO por
   pantalla. Lo segundo importa más de lo que parece: dos cintas superpuestas
   son ilegibles, y mientras hubiera un nodo por cada tipo de aviso, evitar que
   coincidieran era disciplina. Con un nodo es imposible que coincidan.

   EL REPARTO DE NÚMEROS, que es lo que hace que esto no se pudra:
     · el CSS es dueño de la FORMA — los fotogramas y el número de pasos
     · el JS es dueño del TIEMPO — la tabla de aquí abajo
   Ningún número vive en los dos sitios. Antes MS_CARTEL valía 1900 «porque es
   lo que dura prisa-cruza», copiado a mano, con un comentario avisando de lo
   frágil que era. Con nueve coreografías habrían sido nueve copias.
   ────────────────────────────────────────────────────────────────────────── */
CB.ui.cinta = { nodo: null, _salida: null, _clave: null };

/* LA CINTA ES UN VEHÍCULO, NO EL SISTEMA DE CELEBRACIÓN. Quedan tres
   coreografías, y las tres son de cosas que casi no pasan: el aviso de tiempo,
   la superación y el jefe. Quién usa la cinta lo decide CB.ui.festejo.

   Eran nueve. La primera versión de 1.8.0 daba a cada momento su propio
   recorrido —entrar por abajo, caer, estallar— pero TODAS eran la misma banda,
   del mismo ancho, en el mismo sitio y con la misma letra. Visto en pantalla,
   veinte veces por sesión, eso no es variedad: es el mismo rectángulo moviéndose
   distinto. Lo que tiene que cambiar es el VEHÍCULO, no la trayectoria. */
CB.ui.cinta.COREOGRAFIAS = {
  'prisa':   { ms: 1900, sfx: 'prisa'      },
  'junta':   { ms: 1300, sfx: 'subirNivel' },
  'bandera': { ms: 1800, sfx: 'cofre'      }
};

/* La cinta de la pantalla que se está viendo. Se resuelve en cada llamada y no
   se cachea: la partida y el jefe tienen la suya, y cachear la primera dejaba
   al jefe escribiendo en un nodo oculto de otra pantalla. */
CB.ui.cinta.nodoDe = function () {
  var visible = document.querySelector('.pantalla:not([hidden]) .cinta');
  return visible || document.getElementById('cinta');
};

CB.ui.cinta.mostrar = function (clave, texto) {
  var c = CB.ui.cinta;
  var co = c.COREOGRAFIAS[clave];
  var n = c.nodoDe();
  if (!n || !co) return false;

  CB.ui.cinta.ocultar();                 // una cinta a la vez, siempre
  c.nodo = n;
  c._clave = clave;

  var t = n.querySelector('.cinta__texto');
  if (!t) {
    t = CB.ui.crear('span', 'cinta__texto');
    CB.ui.vaciar(n);
    n.appendChild(t);
  }
  t.textContent = String(texto);

  /* Reasignar className entero es lo que quita la coreografía anterior. */
  n.className = 'cinta cinta--' + clave;
  n.hidden = false;
  n.style.animationDuration = co.ms + 'ms';
  void n.offsetWidth;                    // reinicia la animación
  n.classList.add('cinta--entra');

  if (co.sfx) CB.audio.sfx(co.sfx);

  c._salida = setTimeout(function () { CB.ui.cinta.ocultar(); }, co.ms);
  return true;
};

CB.ui.cinta.ocultar = function () {
  var c = CB.ui.cinta;
  if (c._salida) { clearTimeout(c._salida); c._salida = null; }
  var n = c.nodo || c.nodoDe();
  c._clave = null;
  if (!n) return;
  n.classList.remove('cinta--entra');
  n.hidden = true;
};

/* ── EL FESTEJO ─────────────────────────────────────────────────────────────
   SEIS VEHÍCULOS, no seis recorridos. Esta es la corrección de la primera
   versión de 1.8.0, y conviene que quede escrito por qué: allí cada momento
   tenía su propia coreografía, pero todas eran la misma banda oscura, del mismo
   ancho, en el mismo sitio y con la misma tipografía. Un niño no ve nueve
   celebraciones distintas; ve el mismo rectángulo entrando de nueve maneras. A
   la tercera vez ya no celebra nada.

   Peor: al unificarlo todo en un nodo se escribió un guardián (E47) que PROHIBÍA
   a cada modificador tocar la posición. Es decir, la monotonía estaba blindada
   por una prueba. Ese guardián se reescribe: lo que hay que prohibir no es que
   el cartel se mueva, es que invada la zona de respuesta.

   La regla que ordena la tabla no cambia, y ahora sí se cumple de verdad: EL
   ESPECTÁCULO ES INVERSAMENTE PROPORCIONAL A LA FRECUENCIA. Lo que sale en el
   60 % de los aciertos es lo más pequeño que hay —un «+1» que brota junto al
   contador de gemas— y ni siquiera usa la banda. La banda se reserva para lo
   que casi no pasa.

   Ni un efecto de sonido nuevo: los doce de 04-audio.js son contrato. */
CB.ui.festejo = { _salida: null, _clave: null };

CB.ui.festejo.CELEBRACIONES = {
  /* El acierto de todos los días. Sin banda, sin texto grande, sin parar nada. */
  normal:     { vehiculo: 'insignia', ms:  700, sfx: 'acierto' },
  /* Le ha costado y lo ha sacado: Cubi salta. */
  esfuerzo:   { vehiculo: 'criatura', ms: 1100, sfx: 'acierto',
                quien: 'cubi', gesto: 'acierto' },
  /* Acierta tras haber fallado. El acierto que más pesa: se lleva la banda. */
  superacion: { vehiculo: 'cinta',    ms: 1300, sfx: 'subirNivel', coreo: 'junta' },
  /* Racha, veta o mundo nuevo: Chispa gira y estalla el surtidor. */
  hallazgo:   { vehiculo: 'criatura', ms: 1400, sfx: 'gema',
                quien: 'chispa', gesto: 'racha', particulas: true },
  /* Logro o luz extra: un cartel centrado con bisel, no una franja. */
  logro:      { vehiculo: 'cartel',   ms: 1600, sfx: 'luzExtra' },
  /* El jefe cede. Cuatro veces en la vida de un perfil. */
  jefe:       { vehiculo: 'cinta',    ms: 1800, sfx: 'cofre', coreo: 'bandera' },
  /* Bloque raro, 1 de cada 20: tiembla la cantera entera. */
  raro:       { vehiculo: 'sacudida', ms: 1200, sfx: 'cofre', particulas: true },
  /* Detrás de un fallo NO se celebra: se acompaña. Rocarr asiente despacio, que
     es un gesto que ya existía y que un niño lee sin que nadie se lo explique.
     Ni cartel ni banda ni grito: un rótulo de fiesta encima de un fallo se lee
     como burla, y lo que importa está escrito debajo, quieto y legible. */
  animo:      { vehiculo: 'criatura', ms: 1100, sfx: null,
                quien: 'rocarr', gesto: 'pista' }
};

/* Las cuatro categorías de acierto de js/25-mensajes.js, cada una con su
   celebración. No se sortea: acertar a la segunda después de haber fallado (C)
   no es lo mismo que acertar a la primera (A). */
CB.ui.festejo.POR_CATEGORIA = {
  A: 'normal', B: 'esfuerzo', C: 'superacion', D: 'hallazgo'
};

/**
 * Cuánto espera el juego antes de servir el ítem siguiente.
 * NUNCA menos que antes: acortar la espera recortaría tiempo de lectura, que es
 * justo lo contrario de lo que se busca.
 */
CB.ui.festejo.espera = function (clave, minimoMs) {
  var c = CB.ui.festejo.CELEBRACIONES[clave];
  var m = minimoMs || 0;
  return c ? Math.max(m, c.ms + 400) : m;
};

CB.ui.festejo.limpiar = function () {
  var f = CB.ui.festejo;
  if (f._salida) { clearTimeout(f._salida); f._salida = null; }
  f._clave = null;
  CB.ui.cinta.ocultar();
  CB.ui.insignia(0);
  CB.ui.cartel(null);
  var z = document.getElementById('zona-juego');
  if (z) z.classList.remove('zona-juego--sacude');
};

/**
 * Celebra algo. `texto` es el grito corto; el mensaje entero sigue quieto en
 * #item-mensaje, que es donde se puede leer.
 * @param clave una de CELEBRACIONES
 * @param texto grito corto (lo usan cinta y cartel; los demás vehículos no)
 * @param extra {bono} gemas de rapidez, para la insignia
 */
CB.ui.festejo.mostrar = function (clave, texto, extra) {
  var f = CB.ui.festejo;
  var c = f.CELEBRACIONES[clave];
  if (!c) return false;

  CB.ui.festejo.limpiar();          // una celebración a la vez, siempre
  f._clave = clave;
  extra = extra || {};

  if (c.vehiculo === 'cinta') {
    CB.ui.cinta.mostrar(c.coreo, texto);
    return true;                     // la cinta trae su propio sonido y salida
  }

  if (c.vehiculo === 'insignia') {
    CB.ui.insignia(1 + (extra.bono || 0));
  } else if (c.vehiculo === 'criatura') {
    CB.ui.personaje(c.quien, c.gesto);
  } else if (c.vehiculo === 'cartel') {
    CB.ui.cartel(texto);
  } else if (c.vehiculo === 'sacudida') {
    var z = document.getElementById('zona-juego');
    if (z) { void z.offsetWidth; z.classList.add('zona-juego--sacude'); }
  }

  if (c.particulas) {
    CB.ui.particulasDe(document.getElementById('item-enunciado'),
                       'var(--deco-cristal-cla)');
  }
  if (c.sfx) CB.audio.sfx(c.sfx);

  if (c.ms > 0) {
    f._salida = setTimeout(function () { CB.ui.festejo.limpiar(); }, c.ms);
  }
  return true;
};

/* «+1», «+3»: brota junto al contador de gemas y se apaga. Es el acierto de
   todos los días, y por eso es lo más pequeño del juego. */
CB.ui.insignia = function (n) {
  var el = document.getElementById('insignia-gemas');
  if (!el) return;
  el.classList.remove('insignia--brota');
  if (!(n > 0)) { el.hidden = true; return; }
  el.textContent = '+' + n;
  el.hidden = false;
  void el.offsetWidth;
  el.classList.add('insignia--brota');
};

/* Cartel centrado con bisel, para el logro y la luz extra. No es una franja:
   esa es la diferencia con la cinta, y es la que se ve de un vistazo. */
CB.ui.cartel = function (texto) {
  var el = document.getElementById('cartel-festejo');
  if (!el) return;
  el.classList.remove('cartel--brota');
  if (!texto) { el.hidden = true; return; }
  el.textContent = String(texto);
  el.hidden = false;
  void el.offsetWidth;
  el.classList.add('cartel--brota');
};

CB.ui.reloj = {
  caja: null, arena: null, cifra: null, alta: null, baja: null,
  _tic: null, _finMs: 0, _totalMs: 0, _ultimoSeg: -1, _avisado: false
};

CB.ui.reloj.SEG_PRISA = 10;          // cuándo sale «Hurry up!»
CB.ui.reloj.PASOS_ARENA = 20;        // la arena baja a saltos de un veinteavo

CB.ui.reloj.montar = function () {
  var r = CB.ui.reloj;
  if (r.caja) return r.caja;
  r.caja  = document.getElementById('hud-reloj');
  r.cifra = document.getElementById('hud-segundos');
  r.alta  = document.getElementById('ra-alta');
  r.baja  = document.getElementById('ra-baja');
  r.arena = r.caja ? r.caja.querySelector('.reloj__arena') : null;
  return r.caja;
};

/** @param ms duración total; 0 o negativo = sin cuenta atrás (modo «Sin prisa») */
CB.ui.reloj.arrancar = function (ms) {
  var r = CB.ui.reloj;
  if (!r.montar()) return false;
  CB.ui.reloj.parar();

  if (!(ms > 0)) { r.caja.hidden = true; return false; }

  r.caja.hidden = false;
  r.caja.classList.remove('reloj--prisa');
  r._totalMs = ms;
  r._finMs = CB.util.ahora() + ms;
  r._ultimoSeg = -1;
  r._avisado = false;

  /* La vuelta de campana: el reloj se pone del derecho al empezar el ítem. */
  if (r.arena) {
    r.arena.classList.remove('reloj__arena--voltea');
    void r.arena.offsetWidth;                 // reinicia la animación
    r.arena.classList.add('reloj__arena--voltea');
  }

  CB.ui.reloj.pintar(ms);
  r._tic = setInterval(CB.ui.reloj.paso, 100);
  return true;
};

CB.ui.reloj.parar = function () {
  var r = CB.ui.reloj;
  if (r._tic) { clearInterval(r._tic); r._tic = null; }
  if (r.caja) {
    r.caja.hidden = true;
    r.caja.classList.remove('reloj--prisa');
  }
  CB.ui.reloj.ocultarCartel(true);
};

CB.ui.reloj.paso = function () {
  var r = CB.ui.reloj;
  var resta = r._finMs - CB.util.ahora();
  if (resta <= 0) {
    CB.ui.reloj.pintar(0);
    if (r._tic) { clearInterval(r._tic); r._tic = null; }
    return;
  }
  CB.ui.reloj.pintar(resta);
};

CB.ui.reloj.pintar = function (restaMs) {
  var r = CB.ui.reloj;
  if (!r.caja) return;

  /* Arena: fracción QUE QUEDA, redondeada a veinteavos. Sin redondear se ve
     una barra de progreso; redondeada se ve arena. */
  var frac = CB.util.clamp(restaMs / (r._totalMs || 1), 0, 1);
  var p = Math.round(frac * CB.ui.reloj.PASOS_ARENA) / CB.ui.reloj.PASOS_ARENA;
  if (r.alta) r.alta.style.height = Math.round(p * 100) + '%';
  if (r.baja) r.baja.style.height = Math.round((1 - p) * 100) + '%';

  var seg = Math.ceil(restaMs / 1000);
  if (seg === r._ultimoSeg) return;
  r._ultimoSeg = seg;
  if (r.cifra) r.cifra.textContent = String(seg);

  if (seg <= CB.ui.reloj.SEG_PRISA) {
    r.caja.classList.add('reloj--prisa');
    if (r.cifra) {
      r.cifra.classList.remove('reloj__cifra--late');
      void r.cifra.offsetWidth;
      r.cifra.classList.add('reloj__cifra--late');
    }
    if (!r._avisado) { r._avisado = true; CB.ui.reloj.gritar(); }
  }
};

/* «Hurry up!» sube desde abajo. El texto va en inglés porque así se pidió; el
   aviso que oye un lector de pantalla va en español y se dice UNA vez. */
CB.ui.reloj.gritar = function () {
  CB.ui.cinta.mostrar('prisa', 'Hurry up!');
  /* URGENTE, no educado. Este aviso caduca: dentro de diez segundos ya no sirve
     de nada. En la region polite se leia detras de la cola —«¡Muy bien!», «has
     ganado 3 gemas»— y podia llegar con la pregunta ya cerrada. Es el unico
     mensaje del juego que tiene fecha de caducidad, junto con el de la luz. */
  CB.a11y.urgente('Quedan diez segundos.');
};

CB.ui.reloj.ocultarCartel = function () {
  CB.ui.cinta.ocultar();
};

/* ============================================================================
   31-pantallas.js — Navegación entre las 17 <section hidden> (PLAN §14.3)
   ----------------------------------------------------------------------------
   Toca el DOM: pertenece a la serie 30- y está por tanto FUERA de la regla de
   frontera de §14.4.
   ========================================================================== */

var CB = CB || {};
CB.pantallas = CB.pantallas || {};

CB.pantallas.IDS = [
  'p-portada', 'p-perfiles', 'p-calibracion', 'p-mapa', 'p-cantera', 'p-partida',
  'p-reparacion', 'p-descanso', 'p-jefe', 'p-fin', 'p-casa', 'p-glosario',
  'p-ajustes', 'p-adulto', 'p-informe', 'p-creditos', 'p-error'
];

/* Pantallas sin botón Salir visible (§14.3) */
CB.pantallas.SIN_SALIR = ['p-portada', 'p-error'];

CB.pantallas.pila = [];
CB.pantallas.actual = null;
CB.pantallas._entrando = null;      // cerrojo de reentrada, ver CB.pantallas.ir

/* Handlers que un módulo puede registrar para reaccionar al entrar en su
   pantalla: CB.pantallas.alEntrar['p-mapa'] = function (props) {...} */
CB.pantallas.alEntrar = {};
CB.pantallas.alSalir  = {};

CB.pantallas.ir = function (id, props) {
  if (CB.pantallas.IDS.indexOf(id) === -1) {
    throw new Error('Pantalla desconocida: ' + id);
  }
  var i, el;

  if (CB.pantallas.actual && CB.pantallas.alSalir[CB.pantallas.actual]) {
    try { CB.pantallas.alSalir[CB.pantallas.actual](); } catch (e) { }
  }

  for (i = 0; i < CB.pantallas.IDS.length; i++) {
    el = document.getElementById(CB.pantallas.IDS[i]);
    if (el) el.hidden = (CB.pantallas.IDS[i] !== id);
  }

  if (CB.pantallas.actual && CB.pantallas.actual !== id) {
    CB.pantallas.pila.push(CB.pantallas.actual);
    if (CB.pantallas.pila.length > 12) CB.pantallas.pila.shift();
  }
  CB.pantallas.actual = id;

  /* CERROJO DE REENTRADA. Un handler de alEntrar que navegue a su propia
     pantalla se llama a sí mismo sin fin: ir() invoca al handler, el handler
     invoca a ir(), y así hasta desbordar la pila. Pasó de verdad con
     CB.adulto.abrir(), y el síntoma no fue un error en consola sino la pantalla
     de «algo ha ido mal», porque el catch de aquí abajo se traga la recursión y
     la convierte en un fallo genérico.

     El contrato es que un handler PINTA, no navega. Esto lo hace cumplir: la
     segunda entrada a la misma pantalla, dentro de la primera, no se ejecuta. */
  if (CB.pantallas.alEntrar[id] && CB.pantallas._entrando !== id) {
    var previo = CB.pantallas._entrando;
    CB.pantallas._entrando = id;
    try {
      CB.pantallas.alEntrar[id](props || {});
    } catch (e) {
      CB.pantallas.fallo(e);
    } finally {
      CB.pantallas._entrando = previo;
    }
  }

  /* El foco viaja al encabezado de la pantalla nueva: sin esto, un usuario de
     teclado o de lector de pantalla se queda en el botón que acaba de pulsar,
     que ya no existe. */
  var seccion = document.getElementById(id);
  if (seccion) {
    var h = seccion.querySelector('h1');
    if (h) {
      h.setAttribute('tabindex', '-1');

      /* UNA <section> SIN NOMBRE ACCESIBLE NO ES UNA REGIÓN.
         Las diecisiete lo eran solo de nombre: un lector de pantalla no las
         lista, porque la especificación exige que una section tenga nombre para
         contar como landmark. Se lo damos apuntando a su propio <h1>, que ya
         existe y ya está garantizado —casos-carga.js exige exactamente uno por
         pantalla— así que no hay ningún texto nuevo que traducir ni mantener.

         Y `role="main"` va SOLO en la visible. Diecisiete «main» a la vez no es
         que sea incorrecto: es que deja de significar nada, que es peor. */
      if (!h.id) h.id = id + '-titulo';
      seccion.setAttribute('aria-labelledby', h.id);

      try { h.focus({ preventScroll: false }); } catch (e2) { h.focus(); }
    }
    if (seccion.scrollTop) seccion.scrollTop = 0;
  }
  for (i = 0; i < CB.pantallas.IDS.length; i++) {
    el = document.getElementById(CB.pantallas.IDS[i]);
    if (!el) continue;
    if (CB.pantallas.IDS[i] === id) el.setAttribute('role', 'main');
    else el.removeAttribute('role');
  }

  CB.bus.emitir('pantalla', id);
  return id;
};

/* Vuelve a la pantalla anterior; si no hay, al mapa (o a la portada si aún no
   hay perfil activo). Nunca deja al niño en un callejón sin salida. */
CB.pantallas.atras = function () {
  /* EL MANEJADOR DE SALIDA, QUE AQUÍ NO SE EJECUTABA. ir() sí lo llama (arriba),
     atras() no lo hacía en ningún punto, y solo hay dos registrados: el de
     p-reparacion, que apaga los temporizadores de la tarjeta, y el de p-partida,
     que para el reloj. Es decir, la mitad de las salidas del juego no limpiaban
     nada, y el síntoma no era un error sino un salvavidas que a los 25 s se
     ponía a leer los tres pasos de una reparación ENCIMA DE OTRA PANTALLA.

     Va lo PRIMERO de todo, antes de calcular el destino: estas tres líneas leen
     CB.pantallas.actual y unas líneas más abajo atras() lo reescribe. */
  if (CB.pantallas.actual && CB.pantallas.alSalir[CB.pantallas.actual]) {
    try { CB.pantallas.alSalir[CB.pantallas.actual](); } catch (e) { }
  }

  var anterior = CB.pantallas.pila.pop();
  var destino = anterior || (CB.perfil ? 'p-mapa' : 'p-portada');
  /* No se vuelve nunca a una pantalla de flujo: se sale de ellas hacia delante */
  if (destino === 'p-partida' || destino === 'p-reparacion' ||
      destino === 'p-descanso' || destino === 'p-jefe' || destino === 'p-error') {
    destino = CB.perfil ? 'p-mapa' : 'p-portada';
  }
  var i;
  for (i = 0; i < CB.pantallas.IDS.length; i++) {
    var el = document.getElementById(CB.pantallas.IDS[i]);
    if (el) el.hidden = (CB.pantallas.IDS[i] !== destino);
  }
  CB.pantallas.actual = destino;
  if (CB.pantallas.alEntrar[destino]) {
    try { CB.pantallas.alEntrar[destino]({}); } catch (e) { }
  }
  CB.bus.emitir('pantalla', destino);
  return destino;
};

/* Pantalla de error: se llama desde window.onerror y desde unhandledrejection */
CB.pantallas.fallo = function (e) {
  try {
    if (CB.perfil && CB.almacen && CB.almacen.guardarPerfil) {
      CB.almacen.guardarPerfil(CB.perfil);
    }
  } catch (e2) { /* si ni siquiera se puede guardar, seguimos: lo importante
                     es no dejar al niño con la pantalla congelada */ }

  var det = document.getElementById('error-detalle');
  if (det) {
    det.textContent = (e && e.message) ? String(e.message).slice(0, 160) : '';
  }
  var i;
  for (i = 0; i < CB.pantallas.IDS.length; i++) {
    var el = document.getElementById(CB.pantallas.IDS[i]);
    if (el) el.hidden = (CB.pantallas.IDS[i] !== 'p-error');
  }
  CB.pantallas.actual = 'p-error';
  /* La pantalla de error también avisa por el bus: si no, la música del mundo
     se queda sonando alegremente encima de «algo ha ido mal». */
  CB.bus.emitir('pantalla', 'p-error');
};

/* ── Delegación de eventos común a todas las pantallas ─────────────────── */
CB.pantallas.conectar = function () {
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    /* Sube hasta 4 niveles: los botones llevan spans dentro */
    var n = 0;
    while (t && t !== document.body && n < 4) {
      if (t.hasAttribute && t.hasAttribute('data-ir')) {
        CB.pantallas.ir(t.getAttribute('data-ir'));
        return;
      }
      if (t.hasAttribute && t.hasAttribute('data-salir')) {
        CB.pantallas.atras();
        return;
      }
      t = t.parentNode; n++;
    }
  });

  var volver = document.getElementById('btn-error-mapa');
  if (volver) {
    volver.addEventListener('click', function () {
      CB.pantallas.ir(CB.perfil ? 'p-mapa' : 'p-portada');
    });
  }

  /* Escape retrocede, salvo en portada y error */
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape') return;
    if (CB.pantallas.SIN_SALIR.indexOf(CB.pantallas.actual) !== -1) return;
    /* La reparación se comporta como la partida: PAUSA, no retroceso. Escape ahí
       llevaba al mapa —atras() remapea p-reparacion a p-mapa— dejando
       CB.partida.estado vivo detrás, es decir, con una expedición a medias y
       ninguna forma evidente de volver a ella. Pausar es lo que ya existe para
       ese caso y no obliga a inventar una pantalla nueva. */
    if (CB.pantallas.actual === 'p-partida' || CB.pantallas.actual === 'p-reparacion') {
      if (CB.partida && CB.partida.pausar) CB.partida.pausar();
      return;
    }
    CB.pantallas.atras();
  });
};

/* ============================================================================
   32-componentes.js — Los 7 formatos de respuesta
   ----------------------------------------------------------------------------
   tecladoBloques · opciones4 · selectorSigno · balanza · ordenarFila · monedas
   · selectorDatos

   TODOS son manejables SOLO CON TECLADO (criterio de HECHO de F8) y todos
   respetan los 800 ms de construcción visible: los botones se montan bloque a
   bloque, quedan grises con el bisel hundido, y un toque prematuro produce un
   «toc» de madera y un desplazamiento de 2 px. NUNCA en silencio: un botón
   inerte y mudo hace que el niño crea que el juego está roto (§3.5).

   ARRASTRAR Y SOLTAR NO ES NUNCA LA VÍA ÚNICA (§16.1): «ordenar» se resuelve
   tocando en secuencia.
   ========================================================================== */

var CB = CB || {};
CB.componentes = CB.componentes || {};

CB.componentes.MS_CONSTRUCCION = 800;
CB.componentes.MS_POR_BLOQUE = 200;

CB.componentes.actual = null;      // {tipo, valor(), reset(), item}
CB.componentes._valor = '';
CB.componentes._seleccion = [];
CB.componentes._confirmacionPendiente = false;

CB.componentes.contenedor = function () {
  return document.getElementById(
    CB.pantallas.actual === 'p-calibracion' ? 'cal-respuesta' : 'item-respuesta'
  );
};

/* ── Construcción visible + bloqueo ─────────────────────────────────────── */
CB.componentes.montar = function (contenedor, bloqueoMs, alDesbloquear) {
  var ms = (bloqueoMs == null) ? CB.componentes.MS_CONSTRUCCION : bloqueoMs;
  var botones = [].slice.call(contenedor.querySelectorAll('button'));
  var i;

  for (i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
    botones[i].classList.add('btn-bloque--monta');
  }
  if (CB.partida) CB.partida.bloqueado = true;

  setTimeout(function () {
    for (i = 0; i < botones.length; i++) {
      botones[i].disabled = false;
      botones[i].classList.remove('btn-bloque--monta');
      botones[i].classList.add('btn-bloque--destello');
    }
    setTimeout(function () {
      for (i = 0; i < botones.length; i++) botones[i].classList.remove('btn-bloque--destello');
    }, 140);

    if (CB.partida) CB.partida.bloqueado = false;
    /* El foco NO se coloca hasta que expira el bloqueo: si no, el lector de
       pantalla anunciaría botones inertes. */
    if (botones.length) CB.a11y.enfocar(botones[0]);
    if (alDesbloquear) alDesbloquear();
  }, ms);
};

/* Toque prematuro: «toc» de madera y desplazamiento de 2 px.

   SE REGISTRA UNA SOLA VEZ POR CONTENEDOR. Esto no es una precaución teórica:
   `contenedor()` devuelve #item-respuesta, que es un nodo PERMANENTE del
   index.html —se vacía y se rellena en cada ítem, pero no se sustituye—, y
   conectarToc() se llama desde los siete componentes de respuesta, es decir una
   vez por ítem. Sin este cerrojo, en el ítem 12 había once oyentes sobre el
   mismo elemento y un solo toque prematuro reproducía el «toc» ONCE VECES
   simultáneas: un chasquido cada vez más fuerte que además empeoraba cuanto más
   jugaba el niño. Medido en navegador, no deducido.

   Se marca con un atributo y no con una propiedad JS porque el atributo se ve
   en el inspector, y el día que alguien dude de si esto sigue vivo lo comprueba
   mirando, sin leer este comentario. */
CB.componentes.conectarToc = function (contenedor) {
  if (!contenedor || contenedor.getAttribute('data-toc') === 'si') return;
  contenedor.setAttribute('data-toc', 'si');

  contenedor.addEventListener('pointerdown', function (ev) {
    if (!CB.partida || !CB.partida.bloqueado) return;
    var b = ev.target;
    if (b && b.classList && b.classList.contains('btn-bloque')) {
      b.classList.add('btn-bloque--toc');
      setTimeout(function () { b.classList.remove('btn-bloque--toc'); }, 260);
    }
    CB.audio.sfx('toc');
    ev.preventDefault();
  });
};

/* ── El primer toque real de un problema de enunciado ───────────────────────
   En los PROBLEMA_* el cronómetro de puntuación no arranca al mostrar el
   enunciado: arrancar ahí puntúa la velocidad lectora y no la competencia
   matemática (§11.4). Arranca en el primer toque, y ESTE es el sitio donde ese
   toque se puede ver una sola vez para los siete formatos.

   Va sobre el contenedor de respuesta y no sobre el documento a propósito: así
   el altavoz, la pista y la pausa —que están en la barra, fuera— no cuentan como
   empezar a pensar. Pedir que te lo lean otra vez sigue siendo leer.

   Mismo cerrojo por atributo que conectarToc(), y por el mismo motivo: el
   contenedor es un nodo PERMANENTE del index.html que se vacía y se rellena en
   cada ítem, así que sin marca acumularía un oyente por ítem servido. */
CB.componentes.conectarLectura = function (contenedor) {
  if (!contenedor || contenedor.getAttribute('data-lectura') === 'si') return;
  contenedor.setAttribute('data-lectura', 'si');

  var arranca = function () {
    if (CB.partida && CB.partida.marcarLectura) CB.partida.marcarLectura();
  };
  contenedor.addEventListener('pointerdown', arranca);
  contenedor.addEventListener('keydown', arranca);
};

/* ── Confirmación de doble toque, tras detectar azar (§12.3) ────────────── */
CB.componentes.pedirConfirmacion = function (boton, alConfirmar) {
  if (!CB.componentes._confirmacionPendiente) { alConfirmar(); return; }
  if (boton.getAttribute('data-confirmando') === 'si') {
    boton.removeAttribute('data-confirmando');
    alConfirmar();
    return;
  }
  var previos = document.querySelectorAll('[data-confirmando="si"]');
  var i;
  for (i = 0; i < previos.length; i++) previos[i].removeAttribute('data-confirmando');
  boton.setAttribute('data-confirmando', 'si');
  boton.classList.add('btn-bloque--hundido');
  setTimeout(function () { boton.classList.remove('btn-bloque--hundido'); }, 300);
  CB.a11y.anunciar('Toca otra vez para confirmar.');
};

/* ══ 1. TECLADO DE BLOQUES ═════════════════════════════════════════════════ */
CB.componentes.tecladoBloques = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);
  CB.componentes._valor = '';

  var visor = CB.ui.crear('div', 'visor-respuesta');
  visor.id = 'visor-respuesta';
  visor.setAttribute('role', 'status');
  visor.setAttribute('aria-live', 'polite');
  visor.setAttribute('aria-label', 'Tu respuesta');
  cont.appendChild(visor);

  var teclado = CB.ui.crear('div', 'teclado-bloques');
  var teclas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', 'OK'];
  var i;

  function pinta() {
    visor.textContent = CB.componentes._valor;
  }

  function pulsa(t, boton) {
    if (CB.partida && CB.partida.bloqueado) return;
    if (t === '⌫') {
      CB.componentes._valor = CB.componentes._valor.slice(0, -1);
      pinta(); CB.audio.sfx('toc');
      return;
    }
    if (t === 'OK') {
      if (!CB.componentes._valor.length) return;
      CB.componentes.pedirConfirmacion(boton, function () {
        alResponder(parseInt(CB.componentes._valor, 10), 'teclado');
      });
      return;
    }
    if (CB.componentes._valor.length >= 3) return;      // techo 999
    CB.componentes._valor += t;
    pinta();
    CB.audio.sfx('picar');
  }

  var botonOK = null;
  for (i = 0; i < teclas.length; i++) {
    (function (t) {
      var b = CB.ui.boton(t, t === 'OK' ? 'btn-bloque--primario' : '', function () {
        pulsa(t, b);
      }, { tecla: t === '⌫' ? 'borrar' : (t === 'OK' ? 'ok' : t) });
      b.setAttribute('aria-label', t === '⌫' ? 'Borrar' : (t === 'OK' ? 'Confirmar' : t));
      if (t === 'OK') botonOK = b;
      teclado.appendChild(b);
    })(teclas[i]);
  }
  cont.appendChild(teclado);

  CB.componentes.conectarToc(cont);
  CB.a11y.conectarFlechas(teclado, 3);
  CB.componentes.montar(cont, opciones.bloqueoMs);

  CB.componentes.actual = {
    tipo: 'tecladoBloques',
    tecla: function (k) {
      if (/^[0-9]$/.test(k)) { pulsa(k, null); return true; }
      if (k === 'Backspace' || k === 'Delete') { pulsa('⌫', null); return true; }
      /* Enter PASA POR pulsa('OK'), no por alResponder directo. Iba por su
         cuenta y se saltaba pedirConfirmacion(), así que la confirmación de dos
         toques que impone el antiazar tras una detección solo se le aplicaba a
         quien juega tocando: con teclado, Enter contestaba a la primera. Un
         antiazar que se desactiva cambiando de dispositivo de entrada no es un
         antiazar, y F8 pide una partida entera solo con teclado —lo que no pide
         es que el teclado tenga reglas distintas. */
      if (k === 'Enter') { pulsa('OK', botonOK); return true; }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* ══ 2. OPCIONES 4 ═════════════════════════════════════════════════════════ */
CB.componentes.opciones4 = function (item, opcionesValores, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  var rej = CB.ui.crear('div', 'rejilla-respuestas');
  var i;

  for (i = 0; i < opcionesValores.length; i++) {
    (function (op, idx) {
      var etiqueta = (op.texto != null) ? op.texto : String(op.valor);
      var b = CB.ui.boton(etiqueta, '', function () {
        if (CB.partida && CB.partida.bloqueado) return;
        CB.componentes.pedirConfirmacion(b, function () {
          alResponder(op.valor, 'opciones', { posicion: idx, codigoError: op.codigoError });
        });
      }, { posicion: idx });
      if (op.texto != null) b.style.fontSize = 'var(--tam-texto-min)';
      rej.appendChild(b);
    })(opcionesValores[i], i);
  }
  cont.appendChild(rej);

  CB.componentes.conectarToc(cont);
  CB.a11y.conectarFlechas(rej, 2);
  CB.componentes.montar(cont, opciones.bloqueoMs);

  CB.componentes.actual = {
    tipo: 'opciones4',
    tecla: function (k) {
      var n = parseInt(k, 10);
      if (n >= 1 && n <= opcionesValores.length) {
        var b = rej.querySelectorAll('button')[n - 1];
        if (b && !b.disabled) b.click();
        return true;
      }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* ══ 3. SELECTOR DE SIGNO ══════════════════════════════════════════════════ */
CB.componentes.selectorSigno = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  var fila = CB.ui.crear('div', 'rejilla-respuestas');
  ['+', '−'].forEach(function (s, idx) {
    var b = CB.ui.boton(s, '', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      alResponder(s === '+' ? '+' : '-', 'signo', { posicion: idx });
    }, { posicion: idx });
    b.setAttribute('aria-label', s === '+' ? 'Más, sumar' : 'Menos, restar');
    fila.appendChild(b);
  });
  cont.appendChild(fila);

  CB.componentes.conectarToc(cont);
  CB.componentes.montar(cont, opciones.bloqueoMs);
  CB.componentes.actual = { tipo: 'selectorSigno', tecla: function () { return false; } };
  return CB.componentes.actual;
};

/* ══ 4. BALANZA ════════════════════════════════════════════════════════════ */
CB.componentes.balanza = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  var fila = CB.ui.crear('div', 'rejilla-respuestas');
  var signos = item.opcionesFijas || ['>', '<', '='];
  var etiquetas = { '>': 'mayor que', '<': 'menor que', '=': 'igual que' };

  signos.forEach(function (s, idx) {
    var b = CB.ui.boton(s, '', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      CB.componentes.pedirConfirmacion(b, function () {
        alResponder(s, 'balanza', { posicion: idx });
      });
    }, { posicion: idx });
    b.setAttribute('aria-label', etiquetas[s] || s);
    fila.appendChild(b);
  });
  cont.appendChild(fila);

  CB.componentes.conectarToc(cont);
  CB.a11y.conectarFlechas(fila, 2);
  CB.componentes.montar(cont, opciones.bloqueoMs);
  CB.componentes.actual = {
    tipo: 'balanza',
    tecla: function (k) {
      var n = parseInt(k, 10);
      if (n >= 1 && n <= signos.length) {
        var b = fila.querySelectorAll('button')[n - 1];
        if (b && !b.disabled) b.click();
        return true;
      }
      return false;
    }
  };
  return CB.componentes.actual;
};

/* ══ 5. ORDENAR FILA (por toque, nunca solo por arrastre) ══════════════════ */
CB.componentes.ordenarFila = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);
  CB.componentes._seleccion = [];

  var huecos = CB.ui.crear('div', 'fila-ordenar');
  var i;
  for (i = 0; i < item.orden.length; i++) {
    var h = CB.ui.crear('span', 'hueco-orden', '·');
    h.setAttribute('data-hueco', i);
    huecos.appendChild(h);
  }
  cont.appendChild(CB.ui.crear('p', 'consigna-respuesta', 'Toca los números en orden.'));
  cont.appendChild(huecos);

  var piezas = CB.ui.crear('div', 'fila-ordenar');
  item.piezas.forEach(function (v, idx) {
    var b = CB.ui.boton(String(v), '', function () {
      if (CB.partida && CB.partida.bloqueado) return;
      if (b.disabled) return;
      var pos = CB.componentes._seleccion.length;
      CB.componentes._seleccion.push(v);
      var hueco = huecos.querySelector('[data-hueco="' + pos + '"]');
      if (hueco) hueco.textContent = String(v);
      b.disabled = true;
      b.classList.add('btn-bloque--hundido');
      CB.audio.sfx('picar');

      if (CB.componentes._seleccion.length === item.orden.length) {
        var correcto = CB.componentes._seleccion.every(function (x, j) {
          return x === item.orden[j];
        });
        alResponder(correcto ? item.respuesta : -1, 'ordenar',
                    { secuencia: CB.componentes._seleccion.slice() });
      }
    }, { posicion: idx });
    b.style.width = '80px'; b.style.height = '80px';
    piezas.appendChild(b);
  });
  cont.appendChild(piezas);

  CB.componentes.conectarToc(cont);
  CB.componentes.montar(cont, opciones.bloqueoMs);
  CB.componentes.actual = { tipo: 'ordenarFila', tecla: function () { return false; } };
  return CB.componentes.actual;
};

/* ══ 6. MONEDAS ════════════════════════════════════════════════════════════ */
CB.componentes.monedas = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  /* Modo «pagar»: el niño elige piezas hasta el importe exacto. */
  if (item.modo === 'pagar') {
    var total = 0;
    var marcador = CB.ui.crear('div', 'visor-respuesta', '0');
    cont.appendChild(marcador);

    var caja = CB.ui.crear('div', 'contenedor-dinero');
    item.disponibles.forEach(function (v, idx) {
      var esMoneda = CB.gen.dinero.esMoneda(v);
      var b = CB.ui.crear('button', esMoneda ? 'moneda' : 'billete', String(v) + ' €');
      b.type = 'button';
      b.setAttribute('aria-label', CB.gen.dinero.nombre(v));
      b.setAttribute('data-posicion', idx);
      b.addEventListener('click', function () {
        if (CB.partida && CB.partida.bloqueado) return;
        total += v;
        marcador.textContent = String(total);
        CB.audio.sfx('gema');
        if (total >= item.objetivo) {
          alResponder(total, 'monedas', {});
        }
      });
      caja.appendChild(b);
    });
    cont.appendChild(caja);

    var deshacer = CB.ui.boton('Empezar de nuevo', '', function () {
      total = 0; marcador.textContent = '0';
    });
    cont.appendChild(deshacer);

    CB.componentes.conectarToc(cont);
    CB.componentes.montar(cont, opciones.bloqueoMs);
    CB.componentes.actual = { tipo: 'monedas', tecla: function () { return false; } };
    return CB.componentes.actual;
  }

  /* Modo «contar»: se muestran las piezas y se responde con teclado. */
  var muestra = CB.ui.crear('div', 'contenedor-dinero');
  (item.piezas || []).forEach(function (v) {
    var esMoneda = CB.gen.dinero.esMoneda(v);
    var p = CB.ui.crear('span', esMoneda ? 'moneda' : 'billete', String(v) + ' €');
    p.setAttribute('aria-label', CB.gen.dinero.nombre(v));
    muestra.appendChild(p);
  });
  var arriba = document.getElementById('item-enunciado');
  if (arriba) arriba.appendChild(muestra);

  return CB.componentes.tecladoBloques(item, alResponder, opciones);
};

/* ══ 7. SELECTOR DE DATOS (3 toques que hacen visible el razonamiento) ═════ */
CB.componentes.selectorDatos = function (item, alResponder, opciones) {
  opciones = opciones || {};
  var cont = CB.componentes.contenedor();
  CB.ui.vaciar(cont);

  var necesarios = item.datoSobrante ? 2 : item.datos.length;
  var elegidos = [];
  var fase = 'datos';
  var signoElegido = null;

  /* El paso 1 SE OMITE si el enunciado tiene exactamente 2 números y el nivel
     no lleva dato sobrante: no se hace perder el tiempo con una decisión que
     no existe (§9.6). */
  if (!item.datoSobrante && item.datos.length === 2) {
    elegidos = item.datos.slice();
    fase = 'operacion';
  }

  var titulo = CB.ui.crear('p', 'consigna-respuesta', '');
  cont.appendChild(titulo);
  var zona = CB.ui.crear('div');
  cont.appendChild(zona);

  function pintarFase() {
    CB.ui.vaciar(zona);

    if (fase === 'datos') {
      titulo.textContent = 'Toca los números que necesitas.';
      var numeros = (item.enunciado.match(/\d+/g) || []).map(Number);
      var rej = CB.ui.crear('div', 'rejilla-respuestas');
      numeros.forEach(function (n, idx) {
        var b = CB.ui.boton(String(n), '', function () {
          if (b.getAttribute('aria-pressed') === 'true') return;
          b.setAttribute('aria-pressed', 'true');
          b.classList.add('btn-bloque--hundido');
          elegidos.push(n);
          CB.audio.sfx('picar');
          if (elegidos.length === necesarios) { fase = 'operacion'; pintarFase(); }
        }, { posicion: idx });
        b.setAttribute('aria-pressed', 'false');
        rej.appendChild(b);
      });
      zona.appendChild(rej);
      CB.componentes.montar(zona, 0);
      return;
    }

    if (fase === 'operacion') {
      titulo.textContent = '¿Qué hay que hacer?';
      var fila = CB.ui.crear('div', 'rejilla-respuestas');
      ['+', '−'].forEach(function (s, idx) {
        var b = CB.ui.boton(s, '', function () {
          signoElegido = (s === '+') ? '+' : '-';
          fase = 'calculo';
          pintarFase();
        }, { posicion: idx });
        b.setAttribute('aria-label', s === '+' ? 'Sumar' : 'Restar');
        fila.appendChild(b);
      });
      zona.appendChild(fila);
      CB.componentes.montar(zona, 0);
      return;
    }

    titulo.textContent = 'Escribe el resultado.';
    CB.componentes._valor = '';
    var visor = CB.ui.crear('div', 'visor-respuesta');
    zona.appendChild(visor);
    var teclado = CB.ui.crear('div', 'teclado-bloques');
    ['1','2','3','4','5','6','7','8','9','⌫','0','OK'].forEach(function (t) {
      var b = CB.ui.boton(t, t === 'OK' ? 'btn-bloque--primario' : '', function () {
        if (t === '⌫') { CB.componentes._valor = CB.componentes._valor.slice(0, -1); }
        else if (t === 'OK') {
          if (!CB.componentes._valor.length) return;
          /* Cada fase se registra por separado: un niño que elige bien los datos
             y la operación pero se equivoca al calcular NO tiene un problema de
             comprensión lectora, y el informe lo dice (§9.6). */
          alResponder(parseInt(CB.componentes._valor, 10), 'datos', {
            datosElegidos: elegidos.slice(),
            signoElegido: signoElegido,
            faseDatosOk: CB.componentes.datosCorrectos(item, elegidos),
            faseOperacionOk: signoElegido === item.operacion
          });
          return;
        } else if (CB.componentes._valor.length < 3) {
          CB.componentes._valor += t;
        }
        visor.textContent = CB.componentes._valor;
      }, { tecla: t });
      teclado.appendChild(b);
    });
    zona.appendChild(teclado);
    CB.a11y.conectarFlechas(teclado, 3);
    CB.componentes.montar(zona, 0);
  }

  pintarFase();
  CB.componentes.conectarToc(cont);
  if (CB.partida) CB.partida.bloqueado = false;

  CB.componentes.actual = { tipo: 'selectorDatos', tecla: function () { return false; } };
  return CB.componentes.actual;
};

CB.componentes.datosCorrectos = function (item, elegidos) {
  if (!item.datos || elegidos.length !== item.datos.length) return false;
  var copia = item.datos.slice(), i, j;
  for (i = 0; i < elegidos.length; i++) {
    j = copia.indexOf(elegidos[i]);
    if (j === -1) return false;
    copia.splice(j, 1);
  }
  return true;
};

/* Puente para el manejador global de teclado de 06-a11y.js. */
CB.componentes.tecla = function (k, ev) {
  if (CB.componentes.actual && CB.componentes.actual.tecla) {
    return CB.componentes.actual.tecla(k, ev);
  }
  return false;
};

/* ── Presentación de cada componente la PRIMERA vez (§7.3) ──────────────── */
CB.componentes.PRESENTACION = {
  tecladoBloques: 'Escribe el 7',
  opciones4: 'Toca el 5',
  selectorSigno: '¿Aquí va más o menos? 4 __ 2 = 6',
  balanza: '¿Cuál pesa más? 8 y 5',
  monedas: 'Toca la moneda de 2 euros',
  ordenarFila: 'Coloca en orden: 3, 1, 2',
  selectorDatos: 'Toca los dos números del cuento'
};

CB.componentes.necesitaPresentacion = function (perfil, tipo) {
  if (!perfil.componentesVistos) perfil.componentesVistos = [];
  return perfil.componentesVistos.indexOf(tipo) === -1;
};

CB.componentes.marcarVisto = function (perfil, tipo) {
  if (!perfil.componentesVistos) perfil.componentesVistos = [];
  if (perfil.componentesVistos.indexOf(tipo) === -1) perfil.componentesVistos.push(tipo);
};

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
  CB.ui.pintarHUD({ luces: luces.luces, gemas: 0 });
  CB.partida.servirItem();
  return CB.partida.estado;
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

  CB.ui.pintarItem(item);
  CB.ui.pintarBioma(e.mundo.bioma, e.indice / Math.max(1, e.guion.length));
  CB.partida.pintarRespuesta(item);
  CB.a11y.anunciar(item.consigna || item.enunciado || '');

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
    } else {
      var d = CB.distractores.para(item, e.rng);
      if (d.formato === 'teclado') {
        presentar('tecladoBloques');
        CB.componentes.tecladoBloques(item, responder, { bloqueoMs: bloqueo });
        CB.partida.iniciarCronometro(false);
        return;
      }
      opciones = d.opciones;
      if (item.distractoresFijos) {
        opciones = item.distractoresFijos.slice(0, 3)
          .map(function (v) { return { valor: v, codigoError: null }; })
          .concat([{ valor: item.respuesta, codigoError: null }]);
        opciones = CB.util.barajar(opciones, e.rng);
      }
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
  CB.ui.mensaje(msg, 'acierto');
  CB.ui.personaje('cubi', 'acierto');
  if (e.rachaPrimerIntento >= 3) CB.ui.personaje('chispa', 'racha');

  /* Y la celebración. Lo que cambia entre una y otra es el VEHÍCULO —una
     insignia, una criatura, una cinta, un cartel, un temblor—, no el recorrido
     de un mismo cartel: la forma es lo que se reconoce sin leer. Las cuatro
     categorías ya las calculaba CB.mensajes.categoriaAcierto() desde el primer
     día; aquí solo se les pone cuerpo. Encima va el bloque raro, que es 1 de
     cada 20 y se lleva lo que casi nunca se ve. */
  var festejo = item.esBloqueRaro
    ? 'raro'
    : CB.ui.festejo.POR_CATEGORIA[CB.mensajes.categoriaAcierto(ctxMsg)];
  CB.ui.festejo.mostrar(festejo,
    CB.mensajes.grito({ perfil: perfil, rng: e.rng }),
    { bono: bono });

  /* El sonido lo pone el festejo: cada uno trae el suyo, y por eso una
     superación no suena igual que un acierto de todos los días. */
  if (bono > 0 && festejo !== 'hallazgo') CB.audio.sfx('gema');
  CB.ui.particulasDe(document.getElementById('item-enunciado'), 'var(--deco-hierba)');

  /* Bloque raro: cromo garantizado. Es la sorpresa que hace que merezca la pena
     el ítem 47 (§7.5). */
  if (item.esBloqueRaro) CB.partida.darCromo();

  /* Vocabulario: el término entra en el Diccionario de Bloques. */
  var termino = CB.gen.vocabulario.terminoDe(item);
  if (termino && perfil.glosario.indexOf(termino) === -1) {
    perfil.glosario.push(termino);
    CB.logros.comprobar('glosario', { perfil: perfil, modo: e.modo, hoyISO: CB.util.hoyISO() });
  }

  CB.partida.comprobarLogros(item);
  CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas });

  /* NUNCA menos de los 1600 ms de siempre: la espera se estira si la coreografía
     es larga, pero no se encoge nunca. Acortarla recortaría tiempo de lectura. */
  setTimeout(function () { CB.partida.siguiente(); },
             CB.ui.festejo.espera(festejo, 1600));
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
    }, 2600);
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
    CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas });

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

CB.partida.aplicarLogros = function (nuevos) {
  var e = CB.partida.estado, i, l, r;
  for (i = 0; i < (nuevos || []).length; i++) {
    l = nuevos[i];
    /* Un logro sin luz solo se anunciaba a los lectores de pantalla: quien ve
       la pantalla no se enteraba de nada. Ahora la cinta lo dice. */
    if (!l.luz) {
      CB.a11y.anunciar('Logro: ' + l.nombre);
      CB.ui.festejo.mostrar('logro', '¡Logro! ' + l.nombre);
      continue;
    }

    r = CB.vidas.conceder(e.luces, l.id, CB.perfil, e.modo);
    if (r.aplicada) {
      CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas });
      CB.ui.encenderLuz(e.luces.luces - 1);
      CB.ui.mensaje('¡Luz extra! ' + l.nombre, 'acierto');
      CB.ui.festejo.mostrar('logro', '¡Luz extra!');
      CB.a11y.anunciar('Luz extra por ' + l.nombre);
    } else if (r.guardada) {
      CB.ui.mensaje('Guardas 1 luz para la próxima expedición.', 'acierto');
      CB.ui.festejo.mostrar('logro', '¡Luz guardada!');
    }
  }
};

CB.partida.darCromo = function () {
  var perfil = CB.perfil, e = CB.partida.estado;
  var posibles = Object.keys(CB.ui.CRIATURAS).filter(function (c) {
    return perfil.cromos.indexOf(c) === -1;
  });
  if (!posibles.length) return;
  var c = CB.util.elegir(e.rng, posibles);
  perfil.cromos.push(c);
  /* El sonido lo pone la cinta 'veta-madre', que ya suena a cofre. Sonaba dos
     veces seguidas y se oía como un eco. */
  CB.a11y.anunciar('Bloque raro: has encontrado el cromo de ' + c);
  var nuevos = CB.logros.comprobar('cromo', {
    perfil: perfil, modo: e.modo, hoyISO: CB.util.hoyISO()
  });
  CB.partida.aplicarLogros(nuevos);
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
  { id: 'cofre', titulo: '¡Descanso! ¿En qué cofre está la gema?' },
  { id: 'vagoneta', titulo: '¡Descanso! Monta en la vagoneta' }
];

CB.partida.microDescanso = function () {
  var e = CB.partida.estado;
  var d = CB.util.elegir(e.rng, CB.partida.DESCANSOS);

  CB.pantallas.ir('p-descanso');
  var t = document.getElementById('descanso-titulo');
  if (t) t.textContent = d.titulo;

  var tablero = document.getElementById('descanso-tablero');
  CB.ui.vaciar(tablero);

  if (d.id === 'cofre') {
    /* Se ve la lista completa de premios ANTES de abrir: sin cofres opacos, que
       es un patrón oscuro prohibido en un juego infantil (§21.4). */
    var aviso = CB.ui.crear('p', 'texto-menor', 'En los tres cofres hay gemas. Elige uno.');
    tablero.appendChild(aviso);
  }

  var n = (d.id === 'cofre') ? 3 : 8, i;
  for (i = 0; i < n; i++) {
    (function () {
      var b = CB.ui.crear('button', 'bloque-rompible');
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
  CB.ui.pintarHUD({ luces: e.luces.luces, gemas: e.gemas });
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

  var claveModo = (e.modo === 'tranquila') ? 'sinPrisa' : e.modoTiempo;
  if (!perfil.mejorPuntuacion[claveModo]) perfil.mejorPuntuacion[claveModo] = 0;
  if (e.puntos > perfil.mejorPuntuacion[claveModo]) {
    perfil.mejorPuntuacion[claveModo] = e.puntos;
  }

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
  CB.partida.aplicarLogros(CB.logros.comprobar('finPartida', {
    perfil: perfil, modo: e.modo, hoyISO: hoy, mundoCompletado: mundoCompletado
  }));

  CB.partida.desbloquearMundos();
  perfil.partidaEnCurso = null;
  CB.almacen.podar(perfil, {});
  CB.almacen.guardarPerfil(perfil);

  CB.partida.pintarFin(motivo, bono);
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
CB.partida.pintarFin = function (motivo, bono) {
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
    dom.appendChild(CB.ui.crear('p', 'texto-menor',
      'Hoy has practicado. Mañana se notará en el mapa.'));
  }

  /* 2.º Gemas y desglose del bono. */
  var g = document.getElementById('fin-gemas');
  if (g) g.textContent = String(Math.max(0, e.gemas));
  var bl = document.getElementById('fin-bono');
  if (bl) {
    bl.textContent = bono.total > 0
      ? ('+' + bono.total + ' de bono: ' + bono.extras.map(function (x) {
          return CB.puntuacion.ETIQUETA_EXTRA[x] || x;
        }).join(', '))
      : '';
  }

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
    /* Salir guarda íntegro y sale SIN diálogo de retención. */
    if (a === 'salir-partida') CB.partida.finalizar('salida');
  });
};

/* ============================================================================
   41-panel-adulto.js — Panel para familias y maestros
   ----------------------------------------------------------------------------
   LA PUERTA PARENTAL ES DE LECTURA, NO DE CÁLCULO. Poner una multiplicación
   difícil como cerradura en un juego de matemáticas enseña exactamente lo
   contrario de lo que el juego defiende: que las matemáticas son un muro. Se
   pide localizar una palabra concreta en una frase, que un adulto resuelve en
   dos segundos y un lector de 2.º no.

   HONESTIDAD DEL INFORME (PLAN §17.3): se distingue siempre entre lo que el
   juego MIDE y lo que NO mide, y solo se emiten hipótesis de error a partir de
   evidencia DISCRIMINANTE. Si dos códigos empatan, se cuentan ambos y no se
   afirma ninguno.
   ========================================================================== */

var CB = CB || {};
CB.adulto = CB.adulto || {};

CB.adulto.desbloqueado = false;
CB.adulto.FRASES_PUERTA = [
  { frase: 'La cantera guarda muchas gemas azules', n: 4 },
  { frase: 'Los mineros bajan temprano con su pico', n: 3 },
  { frase: 'El musgo crece sobre las piedras antiguas', n: 5 },
  { frase: 'Una vagoneta cruza el túnel cargada', n: 2 }
];

/* PINTA el panel; NO navega hasta él.

   Esta función es el handler de CB.pantallas.alEntrar['p-adulto'], y llamaba
   como primera línea a CB.pantallas.ir('p-adulto'). Es decir: ir() invocaba al
   handler, y el handler volvía a llamar a ir(). Recursión infinita, desbordamiento
   de pila, y el catch de ir() mandaba al usuario a la pantalla de error.

   Efecto real: pulsar la llave de la portada NUNCA abría el panel del adulto.
   Se iba a «algo ha ido mal». Con ello quedaban fuera de alcance los ajustes,
   el informe imprimible, la exportación del progreso y los interruptores de las
   tablas del 6 al 9 y de los céntimos.

   Los otros siete handlers de alEntrar solo pintan, que es el contrato. Este era
   el único que navegaba. */
CB.adulto.abrir = function () {
  var puerta = document.getElementById('adulto-puerta');
  var contenido = document.getElementById('adulto-contenido');

  if (CB.adulto.desbloqueado) {
    puerta.hidden = true;
    contenido.hidden = false;
    CB.adulto.pintar();
    return;
  }
  puerta.hidden = false;
  contenido.hidden = true;

  var reto = CB.adulto.FRASES_PUERTA[
    CB.util.hash32(CB.util.hoyISO()) % CB.adulto.FRASES_PUERTA.length];
  var orden = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta'];

  var preg = document.getElementById('adulto-pregunta');
  preg.textContent = 'Para entrar, escribe la ' + orden[reto.n - 1] +
                     ' palabra de esta frase: «' + reto.frase + '»';

  var campo = document.getElementById('adulto-respuesta');
  var error = document.getElementById('adulto-error');
  campo.value = '';
  error.hidden = true;

  document.getElementById('adulto-entrar').onclick = function () {
    var esperada = CB.util.palabras(reto.frase)[reto.n - 1].toLowerCase();
    if (CB.util.normalizar(campo.value) === CB.util.normalizar(esperada)) {
      CB.adulto.desbloqueado = true;
      puerta.hidden = true;
      contenido.hidden = false;
      CB.adulto.pintar();
    } else {
      error.hidden = false;
    }
  };
};

/* ── Las 10 métricas ────────────────────────────────────────────────────── */
CB.adulto.metricas = function (perfil) {
  var hoy = CB.util.hoyISO();
  var h = perfil.historial || [];
  var ultimas = h.slice(-10);

  var segTotal = 0, preg = 0, ac = 0, ac1 = 0, azar = 0, luces = 0, i;
  for (i = 0; i < ultimas.length; i++) {
    segTotal += ultimas[i].seg || 0;
    preg += ultimas[i].preguntas || 0;
    ac += ultimas[i].aciertos || 0;
    ac1 += ultimas[i].aciertos1erIntento || 0;
    azar += ultimas[i].azares || 0;
    luces += ultimas[i].lucesApagadas || 0;
  }

  var dominadas = [], flojas = [], k, d;
  for (k in perfil.destrezas) {
    if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
    d = perfil.destrezas[k];
    if (d.estado === 'dominada') dominadas.push(k);
    if (d.n >= 6 && CB.adaptativo.precision1er(d) < 0.5) flojas.push(k);
  }

  var repCompletas = 0, repTotal = 0;
  (perfil.respuestas || []).forEach(function (r) {
    var flags = r[7] || 0;
    if (flags & 1) { repTotal++; if (flags & 32) repCompletas++; }
  });

  return {
    m1_tiempoHoy: (perfil.diario.tiempoPantallaPorDia || {})[hoy] || 0,
    m2_partidas: h.length,
    m2_duracionMedia: ultimas.length ? Math.round(segTotal / ultimas.length) : 0,
    m3_precisionTotal: preg ? (ac / preg) : null,
    m3_precision1er: preg ? (ac1 / preg) : null,
    m4_semaforo: CB.adulto.semaforo(perfil),
    m5_dominadas: dominadas,
    m5_flojas: flojas,
    m6_subtipos: perfil.problemas || {},
    m7_errores: perfil.errores || {},
    m8_azares: azar,
    m9_reparaciones: repTotal ? (repCompletas / repTotal) : null,
    m9_reparacionesTotal: repTotal,
    m10_animo: (perfil.animo || []).slice(-5),
    lucesApagadas: luces,
    diasJugados: (perfil.diario.diasJugados || []).length
  };
};

/* Semáforo por bloque. NUNCA solo color: la clase CSS añade símbolo y texto. */
CB.adulto.semaforo = function (perfil) {
  var bloques = {
    'Numeración': ['numeracion', 'valor_posicional'],
    'Sumas': ['suma_sin_llevar', 'suma_llevada'],
    'Restas': ['resta_sin_llevar', 'resta_llevada'],
    'Tablas (iniciación)': ['multiplicacion'],
    'Problemas': ['problemas_cambio', 'problemas_combinacion',
                  'problemas_comparacion', 'problemas_igualacion'],
    'Dinero': ['dinero'],
    'Vocabulario': ['vocabulario']
  };
  var out = [], nombre, slugs, n = 0, p = 0, i, d;

  for (nombre in bloques) {
    if (!Object.prototype.hasOwnProperty.call(bloques, nombre)) continue;
    slugs = bloques[nombre]; n = 0; p = 0;
    for (i = 0; i < slugs.length; i++) {
      d = perfil.destrezas[slugs[i]];
      if (d && d.n) { n += d.n; p += (d.aciertosPrimerIntento || 0); }
    }
    /* Con menos de 6 observaciones NO se emite juicio: «sin datos suficientes»
       es una respuesta honesta y «rojo» con n=2 no lo es. */
    var nivel;
    if (n < 6) nivel = 'sindatos';
    else if (p / n >= 0.8) nivel = 'verde';
    else if (p / n >= 0.55) nivel = 'ambar';
    else nivel = 'rojo';
    out.push({ bloque: nombre, nivel: nivel, n: n,
               precision: n ? Math.round(p / n * 100) : null });
  }
  return out;
};

/* ── Pintado del panel ──────────────────────────────────────────────────── */
CB.adulto.pintar = function () {
  var perfil = CB.perfil;
  var cont = document.getElementById('adulto-contenido');
  if (!perfil || !cont) return;
  CB.ui.vaciar(cont);

  var m = CB.adulto.metricas(perfil);

  cont.appendChild(CB.ui.crear('h1', null, 'Panel de personas adultas'));
  cont.appendChild(CB.ui.crear('p', null, perfil.mote + ' · ' + m.diasJugados +
    (m.diasJugados === 1 ? ' día jugado' : ' días jugados')));

  /* Alcance declarado, LITERAL, en la primera pantalla del panel (§1.3). */
  var aviso = CB.ui.crear('div', 'adulto-aviso');
  aviso.appendChild(CB.ui.crear('h3', null, 'Qué mide y qué no mide este juego'));
  aviso.appendChild(CB.ui.crear('p', null, CB.LEGAL.ALCANCE));
  aviso.appendChild(CB.ui.crear('p', null, CB.LEGAL.SECUENCIACION));
  aviso.appendChild(CB.ui.crear('p', null, CB.LEGAL.MULTIPLICACION));
  aviso.appendChild(CB.ui.crear('p', null,
    'Esto NO es una evaluación ni un diagnóstico. Es un registro de lo que ha ' +
    'hecho en la pantalla. El criterio del maestro y la observación en el aula ' +
    'están por encima de cualquier número de esta pantalla.'));
  cont.appendChild(aviso);

  if (CB.almacen.sinDisco) {
    var alerta = CB.ui.crear('div', 'adulto-aviso');
    alerta.appendChild(CB.ui.crear('h3', null, 'Aviso: no se está guardando en disco'));
    alerta.appendChild(CB.ui.crear('p', null,
      'El navegador no permite guardar. El progreso de esta sesión se perderá ' +
      'al cerrar. Revisa la configuración de privacidad del navegador.'));
    cont.appendChild(alerta);
  }

  /* ── Métricas 1-3 ──────────────────────────────────────────────────── */
  var caja1 = CB.ui.crear('div', 'adulto-caja');
  caja1.appendChild(CB.ui.crear('h2', null, 'De un vistazo'));
  CB.adulto.metrica(caja1, 'Tiempo de pantalla hoy',
    Math.round(m.m1_tiempoHoy / 60) + ' min');
  CB.adulto.metrica(caja1, 'Expediciones completadas', String(m.m2_partidas));
  CB.adulto.metrica(caja1, 'Duración media de la partida',
    Math.round(m.m2_duracionMedia / 60) + ' min ' + (m.m2_duracionMedia % 60) + ' s');
  CB.adulto.metrica(caja1, 'Aciertos (últimas 10 partidas)',
    m.m3_precisionTotal == null ? 'sin datos' : Math.round(m.m3_precisionTotal * 100) + ' %');
  CB.adulto.metrica(caja1, 'Aciertos a la primera',
    m.m3_precision1er == null ? 'sin datos' : Math.round(m.m3_precision1er * 100) + ' %');
  caja1.appendChild(CB.ui.crear('p', null,
    'Lo esperable en 2.º es entre el 80 % y el 90 % de aciertos. Por debajo, el ' +
    'juego bajará solo la dificultad; por encima, la subirá.'));
  cont.appendChild(caja1);

  /* ── Métrica 4: semáforo ───────────────────────────────────────────── */
  var caja2 = CB.ui.crear('div', 'adulto-caja');
  caja2.appendChild(CB.ui.crear('h2', null, 'Por bloques de contenido'));
  var tabla = CB.ui.crear('table', 'tabla-adulto');
  var thead = CB.ui.crear('thead');
  var trh = CB.ui.crear('tr');
  ['Bloque', 'Situación', 'Preguntas'].forEach(function (t) {
    trh.appendChild(CB.ui.crear('th', null, t));
  });
  thead.appendChild(trh); tabla.appendChild(thead);
  var tbody = CB.ui.crear('tbody');
  m.m4_semaforo.forEach(function (s) {
    var tr = CB.ui.crear('tr');
    tr.appendChild(CB.ui.crear('td', null, s.bloque));
    var td = CB.ui.crear('td');
    var sp = CB.ui.crear('span', 'semaforo',
      s.precision == null ? '' : (s.precision + ' %'));
    sp.setAttribute('data-nivel', s.nivel);
    td.appendChild(sp);
    tr.appendChild(td);
    tr.appendChild(CB.ui.crear('td', null, String(s.n)));
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);
  caja2.appendChild(tabla);
  cont.appendChild(caja2);

  /* ── Métrica 6: la matriz de los 20 subtipos ───────────────────────── */
  var caja3 = CB.ui.crear('div', 'adulto-caja');
  caja3.appendChild(CB.ui.crear('h2', null, 'Problemas de enunciado, por tipo'));
  caja3.appendChild(CB.ui.crear('p', null,
    'Dos problemas con los mismos números y la misma operación tienen ' +
    'dificultades muy distintas según cómo estén contados. Esta tabla es la ' +
    'información más accionable del panel.'));
  var t2 = CB.ui.crear('table', 'tabla-adulto matriz-subtipos');
  var th2 = CB.ui.crear('tr');
  ['Tipo de problema', 'Intentos', 'Aciertos', 'Tiempo medio'].forEach(function (t) {
    th2.appendChild(CB.ui.crear('th', null, t));
  });
  t2.appendChild(th2);
  CB.gen.problemas.SUBTIPOS.forEach(function (s) {
    var p = m.m6_subtipos[s];
    if (!p || !p.intentos) return;
    var tr = CB.ui.crear('tr');
    tr.appendChild(CB.ui.crear('td', null, CB.adulto.NOMBRE_SUBTIPO[s] || s));
    var td1 = CB.ui.crear('td', 'matriz-subtipos__dato', String(p.intentos)); tr.appendChild(td1);
    var td2 = CB.ui.crear('td', 'matriz-subtipos__dato',
      p.aciertos + ' (' + Math.round(p.aciertos / p.intentos * 100) + ' %)');
    tr.appendChild(td2);
    tr.appendChild(CB.ui.crear('td', 'matriz-subtipos__dato', Math.round(p.rtMedioMs / 1000) + ' s'));
    t2.appendChild(tr);
  });
  caja3.appendChild(t2);
  cont.appendChild(caja3);

  /* ── Métrica 7: errores frecuentes con su actividad de 10 minutos ──── */
  var caja4 = CB.ui.crear('div', 'adulto-caja');
  caja4.appendChild(CB.ui.crear('h2', null, 'Qué conviene trabajar'));
  var codigos = Object.keys(m.m7_errores).filter(function (c) {
    return m.m7_errores[c].vecesDiscriminante >= 2;
  }).sort(function (a, b) {
    return m.m7_errores[b].vecesDiscriminante - m.m7_errores[a].vecesDiscriminante;
  }).slice(0, 3);

  if (!codigos.length) {
    caja4.appendChild(CB.ui.crear('p', null,
      'Todavía no hay evidencia suficiente para señalar un error concreto. ' +
      'Hacen falta al menos dos respuestas que apunten sin ambigüedad al mismo ' +
      'procedimiento.'));
  } else {
    codigos.forEach(function (c) {
      var rec = CB.datos.RECOMENDACIONES[c];
      if (!rec) return;
      caja4.appendChild(CB.ui.crear('h3', null, rec.frase));
      caja4.appendChild(CB.ui.crear('p', null, '10 minutos: ' + rec.actividad));
      var ejemplos = (m.m7_errores[c].ejemplos || []).join(' · ');
      if (ejemplos) caja4.appendChild(CB.ui.crear('p', 'texto-menor', 'Ejemplos: ' + ejemplos));
      caja4.appendChild(CB.ui.boton('Imprimir ficha de refuerzo', 'btn-adulto', function () {
        CB.adulto.fichaRefuerzo(perfil, c);
      }));
    });
  }
  cont.appendChild(caja4);

  /* ── Métricas 8-10 ─────────────────────────────────────────────────── */
  var caja5 = CB.ui.crear('div', 'adulto-caja');
  caja5.appendChild(CB.ui.crear('h2', null, 'Cómo está jugando'));
  CB.adulto.metrica(caja5, 'Respuestas muy rápidas sin acertar', String(m.m8_azares));
  caja5.appendChild(CB.ui.crear('p', 'texto-menor',
    'El juego no se lo reprocha nunca: solo deja de puntuar esa pregunta y da ' +
    'un momento de pausa. Si el número es alto, suele indicar cansancio o que ' +
    'la dificultad está por encima, no mala intención.'));
  CB.adulto.metrica(caja5, 'Explicaciones seguidas hasta el final',
    m.m9_reparaciones == null ? 'sin datos'
      : Math.round(m.m9_reparaciones * 100) + ' % de ' + m.m9_reparacionesTotal);
  CB.adulto.metrica(caja5, 'Luces apagadas (últimas 10 partidas)', String(m.lucesApagadas));
  if (m.m10_animo.length) {
    var caras = ['me ha costado', 'normal', 'contento'];
    CB.adulto.metrica(caja5, 'Cómo dice que se ha sentido',
      m.m10_animo.map(function (a) { return caras[a.cara] || '?'; }).join(', '));
  }
  cont.appendChild(caja5);

  /* ── Ajustes ───────────────────────────────────────────────────────── */
  cont.appendChild(CB.adulto.cajaAjustes(perfil));

  /* ── Sin conexión ──────────────────────────────────────────────────────
     SOLO aparece si de verdad se puede: con doble clic desde file:// no hay
     service worker y la sección no existe. Nada de «esta función no está
     disponible»: un aviso sobre algo que el usuario no ha pedido es ruido.

     Y va AQUÍ, en el panel del adulto, detrás de la puerta parental, porque
     descargar 42 MB en el disco de un aparato escolar es una decisión informada
     de una persona adulta, no un efecto colateral de darle a jugar. */
  if (CB.offline && CB.offline.DISPONIBLE) {
    var cajaSC = CB.ui.crear('div', 'adulto-caja');
    cajaSC.appendChild(CB.ui.crear('h2', null, 'Sin conexión'));
    cajaSC.appendChild(CB.ui.crear('p', null,
      'El juego ya funciona sin internet: no pide nada a la red. Lo único que ' +
      'no se guarda por su cuenta es la música, porque son 42 MB.'));

    var estadoSC = CB.ui.crear('p', 'texto-menor', 'Comprobando…');
    cajaSC.appendChild(estadoSC);
    CB.offline.musicaGuardada(function (n) {
      estadoSC.textContent = n === 0
        ? 'Ahora mismo no hay ninguna pista guardada.'
        : 'Guardadas ' + n + ' de 9 pistas.';
    });

    var filaSC = CB.ui.crear('div', 'fila');
    var btnBajar = CB.ui.boton('Descargar la música (42 MB)', 'btn-adulto', function () {
      btnBajar.disabled = true;
      estadoSC.textContent = 'Descargando… 0 de 9';
      CB.offline.descargarMusica(
        function (intentadas, total) {
          estadoSC.textContent = 'Descargando… ' + intentadas + ' de ' + total;
        },
        /* El mensaje distingue los tres finales, porque antes los tres decían
           «Listo»: terminar sin fallos, terminar con pistas caídas, y no haber
           podido empezar. Decir «guardadas» cuando no lo están es lo que hace
           que alguien se lleve la tableta a un sitio sin wifi. */
        function (r) {
          btnBajar.disabled = false;
          var n = r.hechas || 0;
          if (r.ok) {
            estadoSC.textContent = 'Listo: las ' + n + ' pistas están guardadas.';
          } else if (r.fallos) {
            estadoSC.textContent = 'Guardadas ' + n + ' de 9. ' + r.fallos +
              (r.fallos === 1 ? ' pista no se ha podido descargar' : ' pistas no se han podido descargar') +
              '. Comprueba la conexión y vuelve a intentarlo.';
          } else if (r.motivo === 'cancelado') {
            estadoSC.textContent = 'Descarga cancelada. Guardadas ' + n + ' de 9.';
          } else {
            estadoSC.textContent = 'No se ha podido guardar ninguna pista. Puedes volver a intentarlo.';
          }
          CB.a11y.anunciar(estadoSC.textContent);
        });
    });
    filaSC.appendChild(btnBajar);

    /* El botón que un maestro puede pulsar sin saber qué es un service worker
       cuando algo se queda pegado. Es el remedio contra el peor fallo posible de
       esta parte: una versión vieja servida desde la caché para siempre. */
    filaSC.appendChild(CB.ui.boton('Borrar lo guardado y recargar', 'btn-adulto btn-adulto--peligro',
      function () {
        CB.offline.olvidarTodo(function () { location.reload(); });
      }));
    cajaSC.appendChild(filaSC);
    cont.appendChild(cajaSC);
  }

  /* ── Datos ─────────────────────────────────────────────────────────── */
  var caja7 = CB.ui.crear('div', 'adulto-caja');
  caja7.appendChild(CB.ui.crear('h2', null, 'Datos'));
  caja7.appendChild(CB.ui.crear('p', null, CB.LEGAL.PRIVACIDAD));
  caja7.appendChild(CB.ui.crear('p', null, CB.LEGAL.LIMITACION));

  var fila = CB.ui.crear('div', 'fila');
  fila.appendChild(CB.ui.boton('Ver informe imprimible', 'btn-adulto', function () {
    CB.adulto.imprimirInforme(perfil.id);
  }));
  fila.appendChild(CB.ui.boton('Descargar CSV', 'btn-adulto', function () {
    CB.adulto.descargarCSV(perfil);
  }));
  fila.appendChild(CB.ui.boton('Exportar copia (.json)', 'btn-adulto', function () {
    CB.adulto.descargar(CB.almacen.exportar(perfil),
      'cubomatica-' + perfil.mote.replace(/\s+/g, '-') + '.json', 'application/json');
  }));

  /* RESTAURAR. Faltaba, y su ausencia dejaba sin efecto la única respuesta que
     el proyecto da a su propia limitación estructural: el README dice «haz una
     copia con Exportar al terminar cada trimestre», y esa copia no se podía
     volver a meter. Exportar sin importar es un botón que promete algo que no
     cumple. CB.almacen.validarImportado() ya existía, estaba probado y no lo
     llamaba nadie.

     El fichero lo elige la persona adulta en su propio disco: no hay red, no
     hay servidor y no se lee nada que no se haya señalado a mano. */
  fila.appendChild(CB.ui.boton('Restaurar copia (.json)', 'btn-adulto', function () {
    CB.adulto.restaurar(caja7);
  }));
  caja7.appendChild(fila);

  var aviso = CB.ui.crear('p', 'texto-menor');
  aviso.id = 'adulto-aviso-datos';
  aviso.setAttribute('role', 'status');
  caja7.appendChild(aviso);

  var borrar = CB.ui.boton('Borrar este perfil', 'btn-adulto btn-adulto--peligro', function () {
    CB.adulto.confirmarBorrado(perfil, caja7);
  });
  caja7.appendChild(borrar);
  cont.appendChild(caja7);

  cont.appendChild(CB.ui.boton('◀ Salir', 'btn-bloque', function () {
    CB.pantallas.ir(CB.perfil ? 'p-portada' : 'p-portada');
  }));
};

CB.adulto.metrica = function (cont, etiqueta, valor) {
  var d = CB.ui.crear('div', 'metrica');
  d.appendChild(CB.ui.crear('span', null, etiqueta));
  d.appendChild(CB.ui.crear('span', 'metrica__valor', valor));
  cont.appendChild(d);
};

CB.adulto.NOMBRE_SUBTIPO = {
  CAMBIO_1: 'Cambio · cuántos hay ahora',
  CAMBIO_2: 'Cambio · cuántos quedan',
  CAMBIO_3: 'Cambio · cuánto ha ganado',
  CAMBIO_4: 'Cambio · cuánto ha perdido',
  CAMBIO_5: 'Cambio · cuánto tenía antes (más)',
  CAMBIO_6: 'Cambio · cuánto tenía antes (menos)',
  COMBINACION_1: 'Juntar · el total',
  COMBINACION_2: 'Juntar · una parte',
  COMPARACION_1: 'Comparar · cuántos más',
  COMPARACION_2: 'Comparar · cuántos menos',
  COMPARACION_3: 'Comparar · el otro tiene más',
  COMPARACION_4: 'Comparar · el otro tiene menos',
  COMPARACION_5: 'Comparar · referente con más',
  COMPARACION_6: 'Comparar · referente con menos',
  IGUALACION_1: 'Igualar · cuánto falta',
  IGUALACION_2: 'Igualar · cuánto sobra',
  IGUALACION_3: 'Igualar · referido, añadir',
  IGUALACION_4: 'Igualar · referido, quitar',
  IGUALACION_5: 'Igualar · referente, añadir',
  IGUALACION_6: 'Igualar · referente, quitar'
};

/* ── Ajustes pedagógicos (viven en perfil.ajustes, §15.2) ───────────────── */
CB.adulto.AJUSTES = [
  { k: 'modoTiempo', t: 'Reloj', tipo: 'opciones',
    ops: [['conCalma', 'Con calma (recomendado)'], ['normal', 'Normal'], ['sinPrisa', 'Sin prisa']] },
  { k: 'noPuntuarVelocidadProblemas', t: 'No puntuar la velocidad en los problemas', tipo: 'bool' },
  { k: 'voz', t: 'Lectura en voz alta', tipo: 'bool' },
  { k: 'letraGrande', t: 'Letra grande', tipo: 'bool' },
  { k: 'altoContraste', t: 'Alto contraste', tipo: 'bool' },
  { k: 'tablas69', t: 'Activar las tablas del 3, 4, 6, 7, 8 y 9', tipo: 'bool',
    nota: 'El Real Decreto 157/2022 sitúa la construcción de las tablas en el segundo ciclo.' },
  { k: 'centimos', t: 'Activar los céntimos', tipo: 'bool',
    nota: 'El saber de primer ciclo cita solo monedas de 1 y 2 euros y billetes.' },
  { k: 'restasDobleLlevada', t: 'Activar restas con doble llevada', tipo: 'bool',
    nota: 'Contenido de 3.º. Activarlo suele producir frustración en 2.º.' },
  { k: 'limiteSesionMin', t: 'Límite de sesión', tipo: 'opciones',
    ops: [[10, '10 min'], [15, '15 min'], [20, '20 min'], [30, '30 min']] }
];

CB.adulto.cajaAjustes = function (perfil) {
  var caja = CB.ui.crear('div', 'adulto-caja');
  caja.appendChild(CB.ui.crear('h2', null, 'Ajustes'));

  CB.adulto.AJUSTES.forEach(function (a) {
    var fila = CB.ui.crear('div', 'metrica');
    var izq = CB.ui.crear('span');
    izq.appendChild(CB.ui.crear('span', null, a.t));
    if (a.nota) izq.appendChild(CB.ui.crear('p', 'texto-menor', a.nota));
    fila.appendChild(izq);

    if (a.tipo === 'bool') {
      var b = CB.ui.boton(perfil.ajustes[a.k] ? 'Sí' : 'No', 'btn-adulto', function () {
        perfil.ajustes[a.k] = !perfil.ajustes[a.k];
        b.textContent = perfil.ajustes[a.k] ? 'Sí' : 'No';
        CB.a11y.aplicarAjustes(perfil.ajustes, CB.almacen.ajustesDispositivo());
        CB.almacen.guardarPerfil(perfil);
      });
      b.className = 'btn-adulto';
      fila.appendChild(b);
    } else {
      var sel = CB.ui.crear('span');
      a.ops.forEach(function (op) {
        var b2 = CB.ui.crear('button', 'btn-adulto', op[1]);
        b2.type = 'button';
        if (perfil.ajustes[a.k] === op[0]) b2.style.fontWeight = 'bold';
        b2.addEventListener('click', function () {
          perfil.ajustes[a.k] = op[0];
          CB.almacen.guardarPerfil(perfil);
          CB.adulto.pintar();
        });
        sel.appendChild(b2);
      });
      fila.appendChild(sel);
    }
    caja.appendChild(fila);
  });

  /* Ajustes del APARATO, separados: en modo aula con 30 perfiles, mezclarlos
     hace que el maestro no entienda por qué a 12 alumnos no les aparece (§15.2). */
  var ap = CB.almacen.ajustesDispositivo();
  var f2 = CB.ui.crear('div', 'metrica');
  f2.appendChild(CB.ui.crear('span', null, 'Modo aula (hasta 30 perfiles)'));
  var ba = CB.ui.boton(ap.modoAula ? 'Sí' : 'No', 'btn-adulto', function () {
    ap.modoAula = !ap.modoAula;
    CB.almacen.guardarAjustesDispositivo(ap);
    ba.textContent = ap.modoAula ? 'Sí' : 'No';
  });
  f2.appendChild(ba);
  caja.appendChild(f2);

  var f3 = CB.ui.crear('div', 'metrica');
  f3.appendChild(CB.ui.crear('span', null, 'Modo proyección (pizarra digital)'));
  var bp = CB.ui.boton(ap.modoProyeccion ? 'Sí' : 'No', 'btn-adulto', function () {
    ap.modoProyeccion = !ap.modoProyeccion;
    CB.almacen.guardarAjustesDispositivo(ap);
    CB.a11y.aplicarAjustes(perfil.ajustes, ap);
    bp.textContent = ap.modoProyeccion ? 'Sí' : 'No';
  });
  f3.appendChild(bp);
  caja.appendChild(f3);

  return caja;
};

/* ── Informe imprimible ─────────────────────────────────────────────────── */
CB.adulto.imprimirInforme = function (perfilId) {
  var perfil = CB.perfil;
  var m = CB.adulto.metricas(perfil);
  var cuerpo = document.getElementById('informe-cuerpo');
  CB.ui.vaciar(cuerpo);

  cuerpo.appendChild(CB.ui.crear('h1', null, 'Cubomática — informe de ' + perfil.mote));
  cuerpo.appendChild(CB.ui.crear('p', null,
    'Fecha: ' + CB.util.hoyISO() + ' · ' + m.diasJugados + ' días jugados · ' +
    m.m2_partidas + ' expediciones'));

  var av = CB.ui.crear('div', 'adulto-aviso');
  av.appendChild(CB.ui.crear('p', null, CB.LEGAL.ALCANCE));
  av.appendChild(CB.ui.crear('p', null, CB.LEGAL.SECUENCIACION));
  av.appendChild(CB.ui.crear('p', null,
    'Este informe NO es una evaluación ni un diagnóstico clínico.'));
  cuerpo.appendChild(av);

  cuerpo.appendChild(CB.ui.crear('h2', null, 'Por bloques'));
  var t = CB.ui.crear('table', 'tabla-adulto');
  var trh = CB.ui.crear('tr');
  ['Bloque', 'Situación', 'Preguntas'].forEach(function (x) {
    trh.appendChild(CB.ui.crear('th', null, x));
  });
  t.appendChild(trh);
  m.m4_semaforo.forEach(function (s) {
    var tr = CB.ui.crear('tr');
    tr.appendChild(CB.ui.crear('td', null, s.bloque));
    var td = CB.ui.crear('td');
    var sp = CB.ui.crear('span', 'semaforo', s.precision == null ? '' : s.precision + ' %');
    sp.setAttribute('data-nivel', s.nivel);
    td.appendChild(sp); tr.appendChild(td);
    tr.appendChild(CB.ui.crear('td', null, String(s.n)));
    t.appendChild(tr);
  });
  cuerpo.appendChild(t);

  var cods = Object.keys(m.m7_errores).filter(function (c) {
    return m.m7_errores[c].vecesDiscriminante >= 2;
  }).slice(0, 3);
  cuerpo.appendChild(CB.ui.crear('h2', null, 'Qué conviene trabajar en casa o en el aula'));
  if (!cods.length) {
    cuerpo.appendChild(CB.ui.crear('p', null,
      'Sin evidencia suficiente para señalar un procedimiento concreto.'));
  } else {
    cods.forEach(function (c) {
      var rec = CB.datos.RECOMENDACIONES[c];
      if (!rec) return;
      cuerpo.appendChild(CB.ui.crear('h3', null, rec.frase));
      cuerpo.appendChild(CB.ui.crear('p', null, rec.actividad));
    });
  }

  cuerpo.appendChild(CB.ui.crear('p', 'pie-informe',
    CB.LEGAL.NORMA + ' — ' + CB.LEGAL.PRIVACIDAD));

  CB.pantallas.ir('p-informe');
  var b = document.getElementById('btn-imprimir');
  if (b) b.onclick = function () { window.print(); };
};

/* ── Ficha de refuerzo en papel: 10 ítems del tipo exacto que falla ─────── */
CB.adulto.fichaRefuerzo = function (perfil, codigoError) {
  var rec = CB.datos.RECOMENDACIONES[codigoError];
  var err = CB.ERRORES[codigoError];
  if (!rec || !err) return;

  var cuerpo = document.getElementById('informe-cuerpo');
  CB.ui.vaciar(cuerpo);

  var ficha = CB.ui.crear('div', 'ficha-refuerzo');
  ficha.appendChild(CB.ui.crear('h1', null, 'Ficha de refuerzo · ' + perfil.mote));
  ficha.appendChild(CB.ui.crear('p', null, rec.frase));
  ficha.appendChild(CB.ui.crear('p', null, 'Antes de la ficha: ' + rec.actividad));

  var niveles = CB.catalogo.todos().filter(function (n) {
    return n.letra === err.familia && !n.ampliacion;
  });
  var nivel = niveles[Math.floor(niveles.length / 2)] || niveles[0];

  var rej = CB.ui.crear('div', 'rejilla-ejercicios');
  var i;
  for (i = 0; i < 10 && nivel; i++) {
    var rng = CB.util.mulberry32(CB.util.hash32(perfil.id + codigoError + i));
    var item = nivel.generar(rng, 2, { ajustes: perfil.ajustes, techo: 999,
                                       bolsas: CB.gen.problemas.nuevoEstadoBolsas() });
    if (!item) continue;
    rej.appendChild(CB.ui.crear('div', 'ficha-refuerzo__ejercicio',
      (item.consigna || item.enunciado || '') + '  ='));
  }
  ficha.appendChild(rej);
  ficha.appendChild(CB.ui.crear('p', 'ficha-refuerzo__pie',
    'Cubomática · ficha generada el ' + CB.util.hoyISO() +
    ' · sin datos personales · ' + CB.LEGAL.NORMA));
  cuerpo.appendChild(ficha);

  CB.pantallas.ir('p-informe');
  var b = document.getElementById('btn-imprimir');
  if (b) b.onclick = function () { window.print(); };
};

/* ── CSV ────────────────────────────────────────────────────────────────── */
CB.adulto.descargarCSV = function (perfil) {
  var lineas = ['fecha;itemId;nivel;destreza;beta;D;rt_ms;correcta;valor_dado;flags'];
  (perfil.respuestas || []).forEach(function (r) {
    var nivelId = String(r[1]).split('#')[0];
    var nivel = CB.catalogo.get(nivelId);
    var f = new Date(r[0]);
    lineas.push([
      CB.util.hoyISO(f), r[1], nivelId, nivel ? nivel.destreza : '',
      r[2], r[3], r[4], r[5], r[6], r[7]
    ].join(';'));
  });
  CB.adulto.descargar(lineas.join('\n'),
    'cubomatica-' + perfil.mote.replace(/\s+/g, '-') + '.csv', 'text/csv');
};

CB.adulto.descargar = function (texto, nombre, tipo) {
  try {
    var blob = new Blob([texto], { type: tipo + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  } catch (e) {
    CB.a11y.anunciar('No se ha podido descargar el fichero en este navegador.');
  }
};

/* Borrar exige escribir la palabra BORRAR (§15.8). */
/* Restaurar un perfil desde un .json exportado.

   Todo lo que entra pasa por CB.almacen.validarImportado(), que es la ÚNICA
   superficie de ataque del proyecto: recorta a los campos permitidos, obliga a
   que el mote salga de la lista cerrada de 120, valida el color contra un
   patrón y acota el tamaño de los arrays. Aquí no se salta ni un paso. */
CB.adulto.restaurar = function (cont) {
  var aviso = document.getElementById('adulto-aviso-datos');
  function decir(t) {
    if (aviso) aviso.textContent = t;
    CB.a11y.anunciar(t);
  }

  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.style.display = 'none';

  input.addEventListener('change', function () {
    var f = input.files && input.files[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) {
      decir('Ese fichero es demasiado grande para ser una copia de Cubomática.');
      return;
    }
    var lector = new FileReader();
    lector.onerror = function () { decir('No se ha podido leer el fichero.'); };
    lector.onload = function () {
      var crudo;
      try {
        crudo = JSON.parse(String(lector.result));
      } catch (e) {
        decir('Ese fichero no es una copia de Cubomática: no se entiende su contenido.');
        return;
      }
      var v = CB.almacen.validarImportado(crudo, CB.datos.MOTES);
      if (!v.ok) {
        decir(v.motivo === 'version'
          ? 'Esa copia viene de una versión más nueva del juego. Actualiza Cubomática antes de restaurarla.'
          : 'Ese fichero no tiene la forma de una copia de Cubomática.');
        return;
      }

      var p = v.perfil;
      var idx = CB.almacen.indice();
      var existe = idx.some(function (e) { return e.id === p.id; });
      /* Si ya hay un perfil con ese id, se restaura ENCIMA: es lo que espera
         quien recupera su propia copia. Si es nuevo, se añade al índice. */
      CB.almacen.guardarPerfil(p);
      if (!existe) {
        idx.push({ id: p.id, mote: p.mote, avatar: p.avatar });
        CB.almacen.guardarIndice(idx);
      }
      CB.almacen.fijarUltimoPerfil(p.id);
      decir('Copia restaurada: ' + p.mote + (existe ? ' (se ha sustituido el perfil que había)' : '') + '.');
      CB.perfiles.activar(p.id);
    };
    lector.readAsText(f);
  });

  if (cont) cont.appendChild(input);
  input.click();
};

CB.adulto.confirmarBorrado = function (perfil, cont) {
  var caja = CB.ui.crear('div', 'adulto-aviso');
  caja.appendChild(CB.ui.crear('p', null,
    'Esto borra para siempre el progreso de ' + perfil.mote +
    '. Escribe BORRAR para confirmar.'));
  var campo = CB.ui.crear('input');
  campo.type = 'text';
  campo.setAttribute('aria-label', 'Escribe BORRAR');
  caja.appendChild(campo);
  caja.appendChild(CB.ui.boton('Confirmar', 'btn-adulto btn-adulto--peligro', function () {
    if (campo.value.trim().toUpperCase() !== 'BORRAR') return;
    CB.almacen.borrarPerfil(perfil.id);
    CB.perfil = null;
    CB.adulto.desbloqueado = false;
    CB.pantallas.ir('p-perfiles');
  }));
  cont.appendChild(caja);
};

/* ============================================================================
   42-jefes.js — Los 4 jefes, cada uno con una mecánica PROPIA
   ----------------------------------------------------------------------------
   NINGÚN JEFE APAGA LUCES (PLAN §12.9). El plan v1 le daba al jefe «armadura de
   10 bloques y daño 1-3», es decir, capacidad de quitar vidas en el momento de
   máxima fatiga y máxima expectativa. Un niño que recorre un mundo entero y
   pierde en el jefe se queda sin la recompensa de cierre: es el punto de
   abandono clásico.

   Aquí el fallo solo REPARA un bloque de la armadura: el combate se alarga,
   nunca se pierde. Tope de 20 turnos, pasado el cual el jefe cede igualmente.
   Vocabulario: «bloques que caen», NUNCA «daño». Sin vocabulario de combate.

   Y cada jefe usa una MECÁNICA DISTINTA, no una lista de preguntas más difíciles
   (criterio de HECHO de F6).
   ========================================================================== */

var CB = CB || {};
CB.jefes = CB.jefes || {};

CB.jefes.TOPE_TURNOS = 20;
CB.jefes.BLOQUES = 8;

CB.jefes.DEFINICION = {
  Tronquete: {
    mundo: 'M1', icono: '🌳',
    mecanica: 'ramas',
    intro: 'Tronquete tiene cuatro ramas. Elige cuál talas primero.'
  },
  Ranacubo: {
    mundo: 'M2', icono: '🐸',
    mecanica: 'nenufares',
    intro: 'Ranacubo salta de nenúfar en nenúfar. ¿Dónde caerá?'
  },
  Cristalina: {
    mundo: 'M3', icono: '💠',
    mecanica: 'reflejo',
    intro: 'Cristalina refleja el cuento. Elige los datos que sirven.'
  },
  Brasita: {
    mundo: 'M4', icono: '🔥',
    mecanica: 'restaurar',
    intro: 'Brasita apaga bloques de la matriz. Restaura el que falta.'
  }
};

CB.jefes.estado = null;

CB.jefes.iniciar = function (mundoId) {
  var mundo = CB.catalogo.getMundo(mundoId);
  if (!mundo) return null;
  var def = CB.jefes.DEFINICION[mundo.jefe];
  var perfil = CB.perfil;

  CB.jefes.estado = {
    mundo: mundo, jefe: mundo.jefe, def: def,
    bloques: CB.jefes.BLOQUES, turno: 0, sinFallos: true,
    respondido: false,
    rng: CB.util.mulberry32(CB.util.hash32(perfil.id + mundoId + CB.util.hoyISO()))
  };

  CB.pantallas.ir('p-jefe');
  var n = document.getElementById('jefe-nombre');
  if (n) n.textContent = mundo.jefe;
  var c = document.getElementById('jefe-criatura');
  if (c) c.textContent = def.icono;
  var av = document.getElementById('jefe-aviso');
  if (av) av.textContent = 'Aquí no se apagan luces. Aquí solo se cavan bloques.';

  CB.jefes.pintarArmadura();
  CB.jefes.turno();
  return CB.jefes.estado;
};

CB.jefes.pintarArmadura = function () {
  var e = CB.jefes.estado;
  var cont = document.getElementById('jefe-armadura');
  if (!cont) return;
  CB.ui.vaciar(cont);
  var i;
  for (i = 0; i < CB.jefes.BLOQUES; i++) {
    var b = CB.ui.crear('b');
    b.setAttribute('data-caido', i < (CB.jefes.BLOQUES - e.bloques) ? 'si' : 'no');
    cont.appendChild(b);
  }
  cont.setAttribute('aria-label', 'Quedan ' + e.bloques + ' bloques por caer');
};

/* ── Un turno, con la mecánica propia de cada jefe ──────────────────────── */
CB.jefes.turno = function () {
  var e = CB.jefes.estado, perfil = CB.perfil;
  if (!e) return;

  if (e.bloques <= 0 || e.turno >= CB.jefes.TOPE_TURNOS) {
    CB.jefes.terminar(e.bloques <= 0);
    return;
  }
  e.turno++;
  e.respondido = false;          // se abre el cerrojo del turno nuevo

  var enun = document.getElementById('jefe-enunciado');
  var opc = document.getElementById('jefe-opciones');
  CB.ui.vaciar(enun);
  CB.ui.vaciar(opc);

  var m = e.def.mecanica;

  if (m === 'ramas') {
    /* Hay que ELEGIR QUÉ RAMA atacar: cada rama es una operación distinta. */
    enun.appendChild(CB.ui.crear('p', 'enunciado', 'Elige la rama cuyo resultado sea ' +
      CB.jefes.prepararRamas(e, opc) + '.'));
    return;
  }

  if (m === 'nenufares') {
    /* Hay que ANTICIPAR dónde caerá: es una serie, no una operación suelta. */
    var salto = CB.util.elegir(e.rng, [2, 5, 10]);
    var inicio = CB.util.ent(e.rng, salto, 40);
    var serie = [inicio, inicio + salto, inicio + salto * 2];
    var destino = inicio + salto * 3;
    enun.appendChild(CB.ui.crear('p', 'enunciado',
      'Ranacubo salta: ' + serie.join(', ') + '… ¿A qué nenúfar irá?'));
    CB.jefes.opciones(opc, destino, [destino + salto, destino - salto, destino + 1]);
    return;
  }

  if (m === 'reflejo') {
    /* Hay que ELEGIR LOS DATOS correctos antes de operar. */
    var a = CB.util.ent(e.rng, 5, 40), b = CB.util.ent(e.rng, 1, a);
    var sobra = CB.util.ent(e.rng, 1, 9);
    enun.appendChild(CB.ui.crear('p', 'enunciado',
      'Cristalina refleja: ' + a + ', ' + b + ' y ' + sobra + '.'));
    enun.appendChild(CB.ui.crear('p', 'texto-menor',
      '¿Cuánto queda al quitar ' + b + ' de ' + a + '?'));
    CB.jefes.opciones(opc, a - b, [a + b, a - b + sobra, a - sobra]);
    return;
  }

  /* restaurar: la multiplicación como matriz a la que le falta una pieza */
  var f = CB.util.elegir(e.rng, [2, 5, 10]);
  var g = CB.util.ent(e.rng, 2, 10);
  enun.appendChild(CB.ui.crear('p', 'enunciado',
    'Brasita ha apagado la matriz de ' + f + ' × ' + g + '.'));
  enun.appendChild(CB.ui.matriz(f, g));
  enun.appendChild(CB.ui.crear('p', 'texto-menor', '¿Cuántos bloques hay que restaurar?'));
  CB.jefes.opciones(opc, f * g, [f * g - f, f * g + f, f + g]);
};

CB.jefes.prepararRamas = function (e, opc) {
  var objetivo = CB.util.ent(e.rng, 10, 60);
  var ramas = [], i, a, b;
  for (i = 0; i < 4; i++) {
    if (i === 0) { a = CB.util.ent(e.rng, 1, objetivo); b = objetivo - a; }
    else {
      a = CB.util.ent(e.rng, 1, 60);
      b = CB.util.ent(e.rng, 1, 40);
      if (a + b === objetivo) b += 1;
    }
    ramas.push({ a: a, b: b, valor: a + b });
  }
  ramas = CB.util.barajar(ramas, e.rng);
  ramas.forEach(function (r) {
    var b2 = CB.ui.boton(r.a + ' + ' + r.b, '', function () {
      CB.jefes.responder(r.valor === objetivo);
    });
    opc.appendChild(b2);
  });
  return objetivo;
};

/* EL RELLENO TIENE QUE AVANZAR SIEMPRE. La versión anterior calculaba el
   candidato como `correcta + lista.length` DENTRO del bucle: si ese número ya
   estaba en la lista no se añadía nada, la longitud no cambiaba, y la siguiente
   vuelta calculaba exactamente el mismo candidato. Bucle infinito, pestaña
   colgada, y el niño pierde la partida entera sin un solo error en consola.

   No era teórico ni raro: pasa siempre que un distractor coincide con otro y la
   lista se queda en tres. Barrido exhaustivo del espacio real de la mecánica
   «reflejo» de Cristalina: 1,29 % de los turnos, es decir el 22,9 % de los
   combates de veinte turnos. Y como el rng va sembrado con perfil+mundo+fecha,
   al niño al que le toca le vuelve a tocar cada vez que lo reintenta ese día.

   Ahora el candidato depende de un contador propio que sube en cada vuelta, con
   tope explícito además: el desplazamiento es la garantía, el tope es el
   cinturón. Si aun así no se llegara a cuatro, se sirven las que haya —tres
   opciones son un turno raro; una pestaña colgada es una partida perdida. */
CB.jefes.opciones = function (cont, correcta, distractores) {
  var e = CB.jefes.estado;
  var lista = [{ v: correcta, ok: true }];

  function anadir(v) {
    if (v === correcta || !(v >= 0) || v > 999) return false;
    if (lista.some(function (x) { return x.v === v; })) return false;
    lista.push({ v: v, ok: false });
    return true;
  }

  distractores.forEach(anadir);

  var paso = 1;
  while (lista.length < 4 && paso <= 20) {
    anadir(correcta + paso);
    if (lista.length < 4) anadir(correcta - paso);
    paso++;
  }

  CB.util.barajar(lista, e.rng).forEach(function (o) {
    cont.appendChild(CB.ui.boton(String(o.v), '', function () {
      CB.jefes.responder(o.ok);
    }));
  });
};

/* UNA RESPUESTA POR TURNO, igual que en la partida (ver el cerrojo `respondido`
   de CB.partida.responder y el porqué largo que lleva al lado). Aquí faltaba, y
   el jefe es donde más se nota: los cuatro botones siguen en pantalla los 900 ms
   que dura la animación de los bloques y NO se deshabilitan, así que ocho toques
   rápidos en la opción correcta tiraban los ocho bloques de la armadura y el
   combate se acababa antes del primer turno. Medido: 5 toques, 5 bloques.

   Y no era solo el atajo. Cada toque encolaba otro setTimeout(turno, 900), de
   modo que el enunciado se repintaba encima de sí mismo y el contador de turnos
   avanzaba de cinco en cinco hacia el tope de veinte. */
CB.jefes.responder = function (correcto) {
  var e = CB.jefes.estado;
  if (!e || e.respondido) return;
  e.respondido = true;

  if (correcto) {
    e.bloques--;
    CB.audio.sfx('picar');
    CB.ui.particulasDe(document.getElementById('jefe-armadura'), 'var(--deco-piedra)');
  } else {
    /* El fallo REPARA un bloque: alarga el combate, nunca lo pierde.
       CB.vidas.fallo() devuelve luces SIN CAMBIO en modo jefe. */
    e.sinFallos = false;
    e.bloques = Math.min(CB.jefes.BLOQUES, e.bloques + 1);
    CB.audio.sfx('fallo');
    CB.a11y.anunciar('Ese bloque vuelve a su sitio. Sigue intentándolo.');
  }
  CB.jefes.pintarArmadura();
  setTimeout(function () { CB.jefes.turno(); }, 900);
};

CB.jefes.terminar = function (porBloques) {
  var e = CB.jefes.estado, perfil = CB.perfil;
  if (!e) return;

  if (!perfil.mundos[e.mundo.id]) {
    perfil.mundos[e.mundo.id] = { desbloqueado: true, gemasNivel: 0,
                                  nivelesCompletados: 0, jefe: false, jefeSinFallos: false };
  }
  perfil.mundos[e.mundo.id].jefe = true;
  if (e.sinFallos) perfil.mundos[e.mundo.id].jefeSinFallos = true;

  /* Pasado el tope de turnos el jefe cede igualmente, con recompensa menor. */
  var gemas = porBloques ? 25 : 10;
  perfil.gemas += gemas;

  var nuevos = CB.logros.comprobar('jefe', {
    perfil: perfil, modo: 'jefe', hoyISO: CB.util.hoyISO(), jefeSuperado: true
  });
  var i;
  for (i = 0; i < nuevos.length; i++) CB.a11y.anunciar('Logro: ' + nuevos[i].nombre);

  /* La cinta más larga del juego, y puede permitírselo: se ve cuatro veces en
     toda la vida de un perfil, una por mundo. Trae su propio sonido. */
  CB.ui.festejo.mostrar('jefe', '¡Paso abierto!');
  CB.almacen.guardarPerfil(perfil);

  var enun = document.getElementById('jefe-enunciado');
  var opc = document.getElementById('jefe-opciones');
  CB.ui.vaciar(enun); CB.ui.vaciar(opc);
  enun.appendChild(CB.ui.crear('h2', null, '¡' + e.jefe + ' abre el paso!'));
  enun.appendChild(CB.ui.crear('p', 'texto-lectura',
    'Has ganado ' + gemas + ' gemas y el mundo queda cerrado con una victoria.'));
  opc.appendChild(CB.ui.boton('Volver al mapa', 'btn-bloque--primario btn-bloque--medio',
    function () { CB.pantallas.ir('p-mapa'); }));

  CB.jefes.estado = null;
};

/* ============================================================================
   43-mapa-destrezas.js — La Cantera: el mapa de vetas del niño
   ----------------------------------------------------------------------------
   POR DEFECTO SOLO EL MUNDO ACTUAL (PLAN §20, mejora 1). Presentar 92 vetas de
   golpe a un niño de 7 años produce parálisis, no competencia percibida: la
   misma pantalla que pretende sostener su motivación acabaría documentando su
   incompetencia. «Ver toda la cantera» es una vista secundaria.

   Es una recompensa INFORMATIVA en lugar de numérica: el niño ve crecer su
   conocimiento, no su marcador. Es el antídoto contra el efecto de
   sobrejustificación.
   ========================================================================== */

var CB = CB || {};
CB.mapaDestrezas = CB.mapaDestrezas || {};

CB.mapaDestrezas.verTodo = false;

CB.mapaDestrezas.mundoActual = function (perfil) {
  var i, m, ultimo = CB.MUNDOS[0];
  for (i = 0; i < CB.MUNDOS.length; i++) {
    m = CB.MUNDOS[i];
    if (perfil.mundos[m.id] && perfil.mundos[m.id].desbloqueado) ultimo = m;
  }
  return ultimo;
};

CB.mapaDestrezas.pintar = function () {
  var perfil = CB.perfil;
  if (!perfil) return;
  var hoy = CB.util.hoyISO();
  var cont = document.getElementById('rejilla-vetas');
  if (!cont) return;
  CB.ui.vaciar(cont);

  var mundo = CB.mapaDestrezas.mundoActual(perfil);
  var ids = CB.mapaDestrezas.verTodo ? CB.catalogo.ids() : mundo.niveles;
  var frontera = CB.grafo.frontera(perfil);

  var pista = document.getElementById('cantera-pista');
  if (pista) {
    pista.textContent = CB.mapaDestrezas.verTodo
      ? 'Toda la cantera'
      : 'Lo siguiente que puedes cavar — ' + mundo.nombre;
  }

  var conteo = { bloqueado: 0, nuevo: 0, aprendiendo: 0, afianzada: 0, dominada: 0, oxidada: 0 };

  ids.forEach(function (id) {
    var nivel = CB.catalogo.get(id);
    if (!nivel) return;
    var bloqueado = CB.grafo.estado(id, perfil) === 'bloqueado';
    var d = perfil.destrezas[nivel.destreza];
    var estadoNivel = perfil.niveles[id];

    var estado;
    if (bloqueado) estado = 'bloqueado';
    else if (!estadoNivel || !estadoNivel.n) estado = 'nuevo';
    else estado = CB.memoria.clasificar(d, hoy, false);
    conteo[estado] = (conteo[estado] || 0) + 1;

    var veta = CB.ui.crear('div', 'veta');
    veta.setAttribute('data-estado', estado);
    veta.setAttribute('role', 'img');
    /* Nunca solo color: icono + nombre + estado en texto (§10.4). */
    veta.setAttribute('aria-label', nivel.nombre + ': ' + CB.memoria.ETIQUETA[estado]);
    veta.appendChild(CB.ui.crear('span', 'veta__icono', CB.memoria.ICONO[estado]));
    veta.appendChild(CB.ui.crear('span', null, nivel.nombre));
    veta.appendChild(CB.ui.crear('span', 'texto-menor', CB.memoria.ETIQUETA[estado]));

    if (frontera.indexOf(id) !== -1) veta.classList.add('veta--frontera');
    if (estado === 'oxidada') veta.classList.add('veta--musgo');
    if (nivel.ampliacion) {
      var dist = CB.ui.crear('span', 'distintivo', 'ampliación');
      veta.appendChild(dist);
    }
    cont.appendChild(veta);
  });

  var ley = document.getElementById('leyenda-vetas');
  if (ley) {
    CB.ui.vaciar(ley);
    ['dominada', 'afianzada', 'aprendiendo', 'oxidada', 'nuevo', 'bloqueado'].forEach(function (k) {
      if (!conteo[k]) return;
      var s = CB.ui.crear('span', null,
        CB.memoria.ICONO[k] + ' ' + conteo[k] + ' ' + CB.memoria.ETIQUETA[k] + '   ');
      ley.appendChild(s);
    });
    if (conteo.oxidada) {
      ley.appendChild(CB.ui.crear('p', 'texto-menor',
        'Las vetas con musgo se repasan en dos minutos.'));
    }
  }

  var btn = document.getElementById('btn-toda-cantera');
  if (btn) {
    btn.textContent = CB.mapaDestrezas.verTodo ? 'Ver solo mi mundo' : 'Ver toda la cantera';
    btn.onclick = function () {
      CB.mapaDestrezas.verTodo = !CB.mapaDestrezas.verTodo;
      CB.mapaDestrezas.pintar();
    };
  }
};

/* ── El mapa de mundos ──────────────────────────────────────────────────── */
CB.mapaDestrezas.pintarMundos = function () {
  var perfil = CB.perfil;
  if (!perfil) return;
  var cont = document.getElementById('rejilla-mundos');
  if (!cont) return;
  CB.ui.vaciar(cont);

  var saludo = document.getElementById('mapa-saludo');
  if (saludo) {
    var vencidos = CB.memoria.vencidosHoy(perfil, CB.util.hoyISO());
    saludo.textContent = vencidos.length
      ? ('Hay ' + vencidos.length + (vencidos.length === 1 ? ' veta' : ' vetas') +
         ' con musgo esperándote.')
      : ('Hola, ' + perfil.mote + '.');
  }

  CB.partida.desbloquearMundos();

  CB.MUNDOS.forEach(function (m) {
    var estado = perfil.mundos[m.id] || { desbloqueado: false };
    var prog = CB.catalogo.progresoMundo(m.id, perfil);
    var tarjeta = CB.ui.crear('div', 'tarjeta-mundo');
    tarjeta.setAttribute('data-bloqueado', estado.desbloqueado ? 'no' : 'si');

    var cinta = CB.ui.crear('div', 'cinta-bioma');
    cinta.setAttribute('data-bioma', m.bioma);
    tarjeta.appendChild(cinta);

    tarjeta.appendChild(CB.ui.crear('h2', null, m.nombre));   /* h2, no h3: el h1 es el de la pantalla y saltarse un nivel rompe la navegacion por encabezados */

    /* M4 lleva el distintivo INICIACIÓN con nota tocable que explica en lenguaje
       llano por qué la multiplicación es iniciación (§6.5). */
    if (m.distintivo) {
      var d = CB.ui.crear('button', 'distintivo', m.distintivo);
      d.type = 'button';
      d.addEventListener('click', function () {
        CB.a11y.anunciar(CB.LEGAL.MULTIPLICACION);
        var nota = document.getElementById('nota-iniciacion');
        if (!nota) {
          nota = CB.ui.crear('p', 'texto-menor');
          nota.id = 'nota-iniciacion';
          tarjeta.appendChild(nota);
        }
        nota.textContent = CB.LEGAL.MULTIPLICACION;
      });
      tarjeta.appendChild(d);
    }

    tarjeta.appendChild(CB.ui.barra(prog.fraccion));
    tarjeta.appendChild(CB.ui.crear('p', 'texto-menor',
      prog.hechos + ' de ' + prog.total + ' vetas abiertas'));

    if (estado.desbloqueado) {
      tarjeta.appendChild(CB.ui.boton('Cavar aquí', 'btn-bloque--primario btn-bloque--ancho',
        function () { CB.partida.iniciar({ mundoId: m.id, modo: 'expedicion' }); }));

      /* El jefe NO bloquea el paso al mundo siguiente: cierra el mundo con una
         victoria (§5.3). */
      if (prog.fraccion >= 0.6) {
        tarjeta.appendChild(CB.ui.boton(m.jefeIcono + ' Reto: ' + m.jefe, 'btn-bloque--ancho',
          function () { CB.jefes.iniciar(m.id); }));
      }
    } else {
      tarjeta.appendChild(CB.ui.crear('p', 'texto-menor',
        'Se abre al cavar más vetas del mundo anterior.'));
    }
    cont.appendChild(tarjeta);
  });
};

/* ============================================================================
   44-casa.js — El álbum de cromos y el Diccionario de Bloques
   ----------------------------------------------------------------------------
   Colección NO MONETARIA (PLAN §21.4): no hay moneda comprable, no hay cofres
   opacos —la lista de premios se ve antes de abrir— y no hay nada que se pierda
   por no volver. Las gemas solo decoran; nunca compran ventaja ni desbloquean
   contenido de aprendizaje.
   ========================================================================== */

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
      c.appendChild(CB.ui.crear('div', 'texto-menor', CB.casa.DESCRIPCION[id]));
    }
    c.setAttribute('aria-label', tiene
      ? (CB.casa.NOMBRES_CROMO[id] + ': ' + CB.casa.DESCRIPCION[id])
      : 'Cromo por descubrir');
    cont.appendChild(c);
  });
};

/* ── Diccionario de Bloques ─────────────────────────────────────────────── */
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
      fila.appendChild(CB.ui.crear('p', 'texto-menor', 'Aún no la has encontrado.'));
    }
    cont.appendChild(fila);
  });
};

/* ============================================================================
   45-offline.js — el service worker, y la guarda que impide que estorbe
   ----------------------------------------------------------------------------
   LO PRIMERO, PORQUE ES LO QUE MÁS SE MALENTIENDE: este juego YA funciona sin
   internet. Cero fetch, cero CDN, cero fuentes remotas; las tipografías se piden
   con local() y si no están, cae en la pila del sistema. Abrir dist/index.html
   con doble clic y jugar una expedición entera no toca la red ni una vez.

   Entonces, ¿para qué un service worker? Para tres cosas concretas, y ninguna es
   «que funcione sin conexión»:

     1. Que siga funcionando cuando el SERVIDOR se apaga. El caso real es un
        colegio que sirve el juego desde un portátil que se apaga a las 14:00.
     2. Arrancar sin idas y venidas de revalidación.
     3. La música sin conexión, bajo control explícito de un adulto: 42 MB que
        nadie debe descargar por accidente.

   UN SERVICE WORKER NO SE REGISTRA EN file://. Exige contexto seguro, y el modo
   de uso principal de este proyecto es el doble clic. Así que aquí lo importante
   no es registrarlo: es que NO ESTORBE cuando no se puede.

   Y puede fallar de DOS maneras distintas según el motor: unos lanzan un
   SecurityError síncrono y otros devuelven una promesa rechazada. Hacen falta
   las dos protecciones. Una promesa rechazada sin manejador imprime «Uncaught
   (in promise)» en la consola: no rompe nada, pero ensucia una consola que hoy
   está limpia — y una consola sucia es lo primero que un maestro lee como «está
   roto».
   ========================================================================== */

var CB = CB || {};
CB.offline = CB.offline || {};

CB.offline.DISPONIBLE = (function () {
  try {
    return typeof navigator !== 'undefined' &&
           'serviceWorker' in navigator &&
           typeof window !== 'undefined' &&
           window.isSecureContext === true &&
           location.protocol !== 'file:';
  } catch (e) { return false; }
})();

CB.offline.registrar = function () {
  if (!CB.offline.DISPONIBLE) return false;
  try {
    navigator.serviceWorker.register('sw.js', { scope: './' })
      .then(function () { }, function () { });   /* el rechazo TAMBIÉN se traga */
  } catch (e) { return false; }
  return true;
};

/* ── La música, bajo control de un adulto ──────────────────────────────────
   NUNCA cache.addAll(). Es atómico: una sola pista que falle —un corte de wifi,
   un 404— tira las nueve. Y si estuviera dentro del install del worker, ese
   fallo impediría instalar también el armazón de 300 KB: se perdería todo por
   querer ganar de más.

   Se piden de una en una, con progreso y con cancelación, porque son 42 MB en
   el disco de un aparato escolar y quien decide eso es una persona adulta. */
/* LAS RUTAS NO SE ESCRIBEN AQUÍ. Salen de CB.musica, que es su dueño único:
   `PISTAS[x].fichero` y `RAIZ`. Escribirlas otra vez sería una cuarta copia de
   la misma lista —ya hay tres: dist/audio/, la tabla de 07-musica.js y
   CREDITOS.txt— y la cuarta es la peligrosa, porque es la única que nadie mira
   al renombrar un fichero: la música seguiría sonando con normalidad y solo
   fallaría la descarga sin conexión, meses después y en otro sitio.
   Se leen en el momento de llamar, no al definir, para no atarse al orden de
   carga: 45 va después de 07, pero depender de eso no aporta nada. */
CB.offline.urlesPistas = function () {
  var m = CB.musica;
  if (!m || !m.PISTAS) return [];
  var raiz = m.RAIZ || 'audio/';
  var urles = [];
  for (var k in m.PISTAS) {
    if (Object.prototype.hasOwnProperty.call(m.PISTAS, k)) urles.push(raiz + m.PISTAS[k].fichero);
  }
  return urles;
};

CB.offline.CACHE_MUSICA = 'cubomatica-musica';
CB.offline._cancelar = false;

/* CONTAR LO QUE FALLA, NO SOLO LO QUE TERMINA. Antes esta función avanzaba el
   contador igual en el camino de éxito y en el de error y acababa informando
   siempre `ok: true`: con las nueve pistas caídas —un 404 tras renombrar un
   fichero, o el servidor apagado a media descarga— el panel decía «Listo: las 9
   pistas están guardadas» y no había ninguna. Es el peor reparto posible del
   error, porque el adulto se lleva la tableta al sitio sin wifi creyendo que la
   música va dentro. Ahora `ok` significa lo que dice: las nueve, guardadas. */
CB.offline.descargarMusica = function (alAvanzar, alTerminar) {
  var urles = CB.offline.urlesPistas();
  if (!CB.offline.DISPONIBLE || typeof caches === 'undefined' || !urles.length) {
    if (alTerminar) alTerminar({ ok: false, motivo: 'no-disponible', hechas: 0, fallos: 0 });
    return;
  }
  CB.offline._cancelar = false;
  var total = urles.length;
  var i = 0, guardadas = 0, fallos = 0;

  caches.open(CB.offline.CACHE_MUSICA + '-' + CB.offline.mayor()).then(function (c) {
    function siguiente() {
      if (CB.offline._cancelar) {
        if (alTerminar) alTerminar({ ok: false, motivo: 'cancelado', hechas: guardadas, fallos: fallos });
        return;
      }
      if (i >= total) {
        if (alTerminar) {
          alTerminar(fallos === 0
            ? { ok: true, hechas: guardadas, fallos: 0 }
            : { ok: false, motivo: 'fallos', hechas: guardadas, fallos: fallos });
        }
        return;
      }
      var url = urles[i];
      /* Una pista que falla no tira las otras ocho —por eso no se usa addAll,
         que es atómico—, pero SÍ se cuenta y sale en el resultado. */
      c.add(url).then(function () {
        i++; guardadas++;
        if (alAvanzar) alAvanzar(i, total, guardadas);
        siguiente();
      }, function () {
        i++; fallos++;
        if (alAvanzar) alAvanzar(i, total, guardadas);
        siguiente();
      });
    }
    siguiente();
  }, function () {
    if (alTerminar) alTerminar({ ok: false, motivo: 'sin-cache', hechas: 0, fallos: 0 });
  });
};

CB.offline.cancelarDescarga = function () { CB.offline._cancelar = true; };

/* La caché de música se indexa por versión MAYOR, no por versión completa: los
   nueve MP3 son una lista cerrada que no cambia nunca, y volver a bajar 42 MB
   porque se ha tocado el CSS es inaceptable. */
CB.offline.mayor = function () {
  return String(CB.VERSION || '0').split('.')[0];
};

/* Y el botón que un maestro puede pulsar sin saber qué es un service worker
   cuando algo se queda pegado. Es lo que evita el peor fallo de esta fase: un
   worker mal invalidado sirviendo la versión de la semana pasada para siempre. */
CB.offline.olvidarTodo = function (alTerminar) {
  if (typeof caches === 'undefined') { if (alTerminar) alTerminar(false); return; }
  caches.keys().then(function (claves) {
    var pendientes = claves.filter(function (k) { return k.indexOf('cubomatica-') === 0; });
    if (!pendientes.length) { if (alTerminar) alTerminar(true); return; }
    var n = 0;
    pendientes.forEach(function (k) {
      caches['delete'](k).then(function () {
        if (++n === pendientes.length && alTerminar) alTerminar(true);
      });
    });
  }, function () { if (alTerminar) alTerminar(false); });
};

/* Cuánto ocupa lo descargado, para poder decírselo al adulto antes de que
   decida. Sin esto, «Borrar la música» es un botón que no se sabe si hace algo. */
CB.offline.musicaGuardada = function (alSaber) {
  if (typeof caches === 'undefined') { alSaber(0); return; }
  caches.open(CB.offline.CACHE_MUSICA + '-' + CB.offline.mayor()).then(function (c) {
    c.keys().then(function (ks) { alSaber(ks.length); }, function () { alSaber(0); });
  }, function () { alSaber(0); });
};

/* ============================================================================
   99-arranque.js — ÚNICO DOMContentLoaded del proyecto
   ----------------------------------------------------------------------------
   Orden: texturas → sprites → ajustes del aparato → perfil → poda → pantalla.

   NO HAY PANTALLA DE «¿POR DÓNDE VAS EN CLASE?» (PLAN §7.1). La primera pantalla
   que veía un niño de 7 años le pedía declarar su trimestre. Un niño de 2.º no
   sabe qué es un trimestre, no sabe en cuál está y no puede leer la pregunta con
   fluidez el día 1. Era el punto exacto en el que el juego dejaba de ser
   autónomo y exigía un adulto al lado, contradiciendo el criterio de «se abre
   con doble clic».

   El trimestre se DEDUCE de cuatro ítems jugables y del calendario escolar.
   ========================================================================== */

var CB = CB || {};
CB.perfil = null;

/* ── Manejadores globales de error ──────────────────────────────────────── */
window.onerror = function (mensaje, fuente, linea, col, error) {
  try { CB.pantallas.fallo(error || { message: mensaje }); } catch (e) { }
  return false;
};
window.addEventListener('unhandledrejection', function (ev) {
  try { CB.pantallas.fallo(ev.reason || { message: 'promesa rechazada' }); } catch (e) { }
});

/* ── Calibración jugable: 4 ítems, sin cronómetro, sin luces, sin nota ──── */
CB.calibracion = {
  ITEMS: [
    { consigna: 'Toca el número más grande.', opciones: [34, 43], respuesta: 43,
      destreza: 'valor_posicional' },
    { consigna: '23 + 14', respuesta: 37, destreza: 'suma_sin_llevar', teclado: true },
    { consigna: '47 − 12', respuesta: 35, destreza: 'resta_sin_llevar', teclado: true },
    { consigna: '28 + 15', respuesta: 43, destreza: 'suma_llevada', teclado: true }
  ],
  indice: 0,
  aciertos: 0
};

CB.calibracion.iniciar = function () {
  CB.calibracion.indice = 0;
  CB.calibracion.aciertos = 0;
  CB.pantallas.ir('p-calibracion');
  CB.calibracion.servir();
};

CB.calibracion.servir = function () {
  var i = CB.calibracion.indice;

  if (i >= CB.calibracion.ITEMS.length) { CB.calibracion.terminar(); return; }

  var it = CB.calibracion.ITEMS[i];
  /* Lo lee el botón del altavoz de esta pantalla: aquí no hay estado de partida
     de donde sacar el enunciado. */
  CB.calibracion.consignaActual = it.consigna;

  /* Decir dónde está y por qué no hay reloj. Sin esto son cuatro preguntas
     sueltas que parecen una partida a la que le falta el cronómetro. */
  var paso = document.getElementById('cal-paso');
  if (paso) {
    paso.textContent = 'Pregunta ' + (i + 1) + ' de ' + CB.calibracion.ITEMS.length +
      ' · Sin reloj y sin puntos: solo para saber por dónde empezar.';
  }

  var enun = document.getElementById('cal-enunciado');
  CB.ui.vaciar(enun);
  enun.appendChild(CB.ui.crear('p', it.teclado ? 'operacion' : 'enunciado', it.consigna));

  /* Voz automática: la consigna se lee sola. En la primera partida de su vida,
     el niño no tiene por qué saber que existe el botón del altavoz. */
  CB.voz.leer(it.consigna);
  CB.a11y.anunciar(it.consigna);

  /* UNA RESPUESTA POR PREGUNTA. Es el mismo cerrojo que CB.partida.responder, y
     faltaba justo donde más caro sale: los botones siguen vivos los 1.300 ms que
     dura el mensaje, así que machacar el botón —que es exactamente lo que hace
     un niño de 7 años cuando la respuesta le sale sola— contaba un acierto por
     toque. Medido: cinco toques en la primera pregunta dan CINCO aciertos sobre
     cuatro ítems.

     Y esos cuatro aciertos son lo único que decide `trimestreDeducido`, es decir
     el techo de números de todo el juego a partir de ahí. Un niño que empieza en
     el primer trimestre acababa colocado en el tercero por pulsar dos veces. */
  var contestada = false;

  function responder(valor) {
    if (contestada) return;
    contestada = true;
    var ok = Number(valor) === it.respuesta;
    if (ok) CB.calibracion.aciertos++;
    /* Sin cronómetro, sin luces, sin puntuación: esto no parece un test. */
    CB.ui.mensaje(ok ? '¡Muy bien!' : 'Vamos con la siguiente.', ok ? 'acierto' : 'animo');
    CB.audio.sfx(ok ? 'acierto' : 'picar');
    CB.calibracion.indice++;
    setTimeout(function () {
      CB.ui.ocultarMensaje();
      CB.calibracion.servir();
    }, 1300);
  }

  CB.pantallas.actual = 'p-calibracion';
  if (it.teclado) {
    CB.componentes.tecladoBloques(it, responder, { bloqueoMs: 300 });
  } else {
    var ops = it.opciones.map(function (v) { return { valor: v }; });
    CB.componentes.opciones4(it, ops, responder, { bloqueoMs: 300 });
  }
};

CB.calibracion.terminar = function () {
  var perfil = CB.perfil;
  var a = CB.calibracion.aciertos;

  /* trimestreDeclarado se DEDUCE, nunca se pregunta (§7.2). */
  var porResultado = (a >= 4) ? 3 : (a === 3 ? 2 : 1);
  var porCalendario = CB.CURRICULO.trimestrePorFecha(CB.util.hoyISO());
  if (porCalendario === 'verano') porCalendario = 3;

  /* Se toma el MENOR de los dos: más vale empezar por debajo y subir. */
  perfil.trimestreDeducido = Math.min(porResultado, porCalendario);
  perfil.calibrado = true;

  /* Los 4 resultados fijan el theta inicial de cada destreza tocada. */
  var hoy = CB.util.hoyISO();
  CB.calibracion.ITEMS.forEach(function (it, i) {
    var d = perfil.destrezas[it.destreza] ||
            (perfil.destrezas[it.destreza] = CB.adaptativo.nuevaDestreza(hoy));
    d.theta = (i < a) ? 1080 : 920;
  });

  CB.almacen.guardarPerfil(perfil);

  /* Y decir que se ha acabado. Antes las cuatro preguntas terminaban en
     silencio: contestabas la última y aparecías en un mapa, sin que nadie te
     dijera que aquello era la preparación ni que el juego empieza ahora. Quien
     lo probó lo dijo así: «empiezas con una demo y no avisa que es una demo».
     Una prueba que no anuncia que termina no se distingue de una partida que se
     ha roto. */
  var cierre = '¡Ya está! Ya sabemos por dónde empezar. Ahora sí empieza el ' +
               'juego: con reloj, con luces y con gemas.';
  var paso = document.getElementById('cal-paso');
  if (paso) paso.textContent = cierre;
  CB.ui.mensaje(cierre, 'acierto');
  CB.a11y.anunciar(cierre);
  CB.voz.leer(cierre);

  setTimeout(function () {
    CB.ui.ocultarMensaje();
    CB.pantallas.ir('p-mapa');
  }, 3400);
};

/* ── Perfiles ───────────────────────────────────────────────────────────── */
CB.perfiles = {};

CB.perfiles.pintar = function () {
  var cont = document.getElementById('lista-perfiles');
  if (!cont) return;
  CB.ui.vaciar(cont);

  var idx = CB.almacen.indice();
  idx.forEach(function (e) {
    var t = CB.ui.crear('div', 'tarjeta-perfil');
    var av = CB.ui.crear('div', 'avatar-cubi');
    var pal = CB.datos.AVATARES[CB.util.clamp(e.avatar || 0, 0, 15)];
    av.style.background = pal.casco;
    t.appendChild(av);
    t.appendChild(CB.ui.crear('div', null, e.mote));
    t.appendChild(CB.ui.boton('Jugar', 'btn-bloque--primario btn-bloque--ancho', function () {
      CB.perfiles.activar(e.id);
    }));
    cont.appendChild(t);
  });

  var ap = CB.almacen.ajustesDispositivo();
  var tope = ap.modoAula ? CB.almacen.TOPES.aula.perfiles : CB.almacen.TOPES.domestico.perfiles;
  var btn = document.getElementById('btn-nuevo-perfil');
  if (btn) {
    btn.hidden = idx.length >= tope;
    btn.onclick = function () { CB.perfiles.crear(); };
  }
};

CB.perfiles.crear = function () {
  var idx = CB.almacen.indice();
  var hoy = CB.util.hoyISO();
  var semilla = CB.util.hash32(hoy + idx.length + (CB.almacen.bytesUsados() || 0));
  var rng = CB.util.mulberry32(semilla);

  /* El mote sale de la lista CERRADA de 120: jamás nombre real, correo, edad ni
     ubicación (§15.8). */
  var usados = idx.map(function (e) { return e.mote; });
  var libres = CB.datos.MOTES.filter(function (m) { return usados.indexOf(m) === -1; });
  var mote = CB.util.elegir(rng, libres.length ? libres : CB.datos.MOTES);
  var avatar = CB.util.ent(rng, 0, 15);
  var id = 'p-' + semilla.toString(16);

  /* Los ajustes se COPIAN del último perfil como valor por defecto; nunca se
     heredan de forma implícita después (§15.2). */
  var previos = null;
  if (idx.length) {
    var ultimo = CB.almacen.leerPerfil(idx[idx.length - 1].id);
    if (ultimo && ultimo.ajustes && !ultimo.error) {
      previos = JSON.parse(JSON.stringify(ultimo.ajustes));
    }
  }

  var perfil = CB.almacen.perfilNuevo(id, mote, avatar, hoy, previos);
  CB.almacen.guardarPerfil(perfil);
  CB.almacen.fijarUltimoPerfil(id);
  CB.perfiles.activar(id);
};

CB.perfiles.activar = function (id) {
  var p = CB.almacen.leerPerfil(id);
  if (!p) return;
  if (p.error) {
    /* Se queda EN LA LISTA DE PERFILES, no se va a la pantalla de error. Aquí
       hay algo que hacer —elegir otro minero o crear uno nuevo— y allí no hay
       nada: «algo ha ido mal» con un botón de volver al mapa es un callejón.
       El aviso va en la propia lista, encima de las tarjetas. */
    CB.a11y.anunciar(p.mensaje);
    CB.pantallas.ir('p-perfiles');
    var lista = document.getElementById('lista-perfiles');
    if (lista && lista.parentNode) {
      var aviso = document.getElementById('aviso-perfil-roto');
      if (!aviso) {
        aviso = CB.ui.crear('p', 'texto-menor');
        aviso.id = 'aviso-perfil-roto';
        aviso.setAttribute('role', 'alert');
        lista.parentNode.insertBefore(aviso, lista);
      }
      aviso.textContent = p.mensaje;
    }
    return;
  }
  CB.perfil = p;
  CB.almacen.fijarUltimoPerfil(id);
  CB.almacen.podar(p, {});
  CB.memoria.reclasificarTodo(p, CB.util.hoyISO());
  CB.a11y.aplicarAjustes(p.ajustes, CB.almacen.ajustesDispositivo());
  CB.pantallas.ir('p-portada');
};

/* ── Ajustes visibles para el niño ──────────────────────────────────────── */
CB.ajustesNino = function (props) {
  var cont = document.getElementById('lista-ajustes');
  if (!cont) return;
  CB.ui.vaciar(cont);
  var perfil = CB.perfil;

  /* Pulsar «Pausa» lleva aquí, y aquí ponía «Ajustes» en grande con la salida
     al final de la lista. Un niño que pausa no ha venido a configurar nada:
     ha venido a parar un momento, y necesita ver antes que nada cómo volver.
     `desdePausa` ya se pasaba desde CB.partida.pausar() y no lo usaba nadie. */
  var enPausa = !!(props && props.desdePausa) ||
                !!(CB.partida.estado && CB.partida.estado.pausada);
  var titulo = document.getElementById('ajustes-titulo');
  if (titulo) titulo.textContent = enPausa ? 'En pausa' : 'Ajustes';

  function fila(etiqueta, valor, alPulsar) {
    var f = CB.ui.crear('div', 'ajuste');
    f.appendChild(CB.ui.crear('span', 'ajuste__etiqueta', etiqueta));
    var b = CB.ui.boton(valor, '', function () { alPulsar(b); });
    f.appendChild(b);
    cont.appendChild(f);
    return b;
  }

  var ap = CB.almacen.ajustesDispositivo();
  fila('Sonido', CB.audio.silenciado ? 'No' : 'Sí', function (b) {
    var s = CB.audio.silenciar(!CB.audio.silenciado);
    ap.silencio = s;
    CB.almacen.guardarAjustesDispositivo(ap);
    b.textContent = s ? 'No' : 'Sí';
  });

  /* La música tiene su propio nivel, aparte del de los efectos, y llega hasta
     el silencio total en un solo toque. No es un capricho: hay evidencia en
     las dos direcciones sobre si la música de fondo ayuda o estorba cuando la
     carga cognitiva es alta, y resolver problemas de enunciado con 7 años lo
     es. Quien no la quiera tiene que poder quitarla sin buscarla. */
  fila('Música', CB.musica.NIVELES[CB.musica.nivelActual()].etiqueta, function (b) {
    var i = (CB.musica.nivelActual() + 1) % CB.musica.NIVELES.length;
    CB.musica.fijarNivel(i);
    ap.nivelMusica = i;
    CB.almacen.guardarAjustesDispositivo(ap);
    b.textContent = CB.musica.NIVELES[i].etiqueta;
  });

  if (perfil) {
    /* Los tres modos de tiempo se pueden cambiar también desde la pausa. */
    var nombres = { conCalma: 'Con calma', normal: 'Normal', sinPrisa: 'Sin prisa' };
    var orden = ['conCalma', 'normal', 'sinPrisa'];
    fila('El reloj', nombres[perfil.ajustes.modoTiempo] || 'Con calma', function (b) {
      var i = orden.indexOf(perfil.ajustes.modoTiempo);
      perfil.ajustes.modoTiempo = orden[(i + 1) % orden.length];
      b.textContent = nombres[perfil.ajustes.modoTiempo];
      if (CB.partida.estado) CB.partida.estado.modoTiempo = perfil.ajustes.modoTiempo;
      CB.almacen.guardarPerfil(perfil);
    });
    fila('Letra grande', perfil.ajustes.letraGrande ? 'Sí' : 'No', function (b) {
      perfil.ajustes.letraGrande = !perfil.ajustes.letraGrande;
      b.textContent = perfil.ajustes.letraGrande ? 'Sí' : 'No';
      CB.a11y.aplicarAjustes(perfil.ajustes, ap);
      CB.almacen.guardarPerfil(perfil);
    });
    fila('Leer en voz alta', perfil.ajustes.voz ? 'Sí' : 'No', function (b) {
      perfil.ajustes.voz = !perfil.ajustes.voz;
      CB.voz.activa = perfil.ajustes.voz;
      b.textContent = perfil.ajustes.voz ? 'Sí' : 'No';
      CB.almacen.guardarPerfil(perfil);
    });
  }

  /* PRIMERO, no al final de la lista: es lo que ha venido a hacer. */
  if (CB.partida.estado && CB.partida.estado.pausada) {
    cont.insertBefore(
      CB.ui.boton('◀ Seguir cavando', 'btn-bloque--primario btn-bloque--medio',
        function () { CB.partida.reanudar(); }),
      cont.firstChild);
  }
};

/* ── Créditos ───────────────────────────────────────────────────────────── */
/* Dónde suena cada pista, dicho como lo diría un niño. */
CB.DONDE_SUENA = {
  temaPrincipal: 'el tema del juego',
  victoria:      'al terminar la partida',
  mundoPradera:  'en la Pradera de los Números',
  mundoBosque:   'en el Bosque de las Llevadas',
  mundoRio:      'en el Río de los Problemas',
  mundoMina:     'en la Mina de las Veces',
  jefe:          'con los guardianes',
  calma:         'en los descansos',
  cantera:       'en las vetas y el álbum'
};

CB.creditos = function () {
  var legal = document.getElementById('creditos-legal');
  var curri = document.getElementById('creditos-curriculo');
  var mus = document.getElementById('creditos-musica');

  if (mus) {
    CB.ui.vaciar(mus);
    mus.appendChild(CB.ui.crear('h2', null, 'Música'));
    CB.musica.CREDITOS.forEach(function (c) {
      var linea = CB.DONDE_SUENA[c.clave] + ' — ' + c.autor + ' (Pixabay ' + c.id + ')';
      mus.appendChild(CB.ui.crear('p', 'texto-menor', linea));
    });
    mus.appendChild(CB.ui.crear('p', 'texto-menor', CB.musica.LICENCIA));
  }
  if (legal) {
    CB.ui.vaciar(legal);
    legal.appendChild(CB.ui.crear('h2', null, 'Aviso legal'));
    legal.appendChild(CB.ui.crear('p', 'texto-menor', CB.LEGAL.AVISO));
    /* La versión se enseña aquí y en ningún otro sitio del juego: es lo que un
       adulto necesita decir por teléfono cuando algo no le funciona. */
    legal.appendChild(CB.ui.crear('p', 'texto-menor', 'Versión ' + CB.VERSION));
  }
  if (curri) {
    CB.ui.vaciar(curri);
    curri.appendChild(CB.ui.crear('h2', null, 'Currículo'));
    curri.appendChild(CB.ui.crear('p', 'texto-menor', CB.LEGAL.ALCANCE));
    curri.appendChild(CB.ui.crear('p', 'texto-menor', CB.LEGAL.SECUENCIACION));
    curri.appendChild(CB.ui.crear('p', 'texto-menor', CB.LEGAL.MULTIPLICACION));
    curri.appendChild(CB.ui.crear('p', 'texto-menor', CB.datos.ORIGEN_GLOSARIO));
  }
};

/* ── Enganches de pantalla ──────────────────────────────────────────────── */
CB.pantallas.alEntrar['p-mapa'] = function () { CB.mapaDestrezas.pintarMundos(); };
CB.pantallas.alEntrar['p-cantera'] = function () { CB.mapaDestrezas.pintar(); };
CB.pantallas.alEntrar['p-casa'] = function () { CB.casa.pintar(); };
CB.pantallas.alEntrar['p-glosario'] = function () { CB.casa.pintarGlosario(); };
CB.pantallas.alEntrar['p-ajustes'] = function (props) { CB.ajustesNino(props); };
CB.pantallas.alEntrar['p-perfiles'] = function () { CB.perfiles.pintar(); };
CB.pantallas.alEntrar['p-adulto'] = function () { CB.adulto.abrir(); };
CB.pantallas.alEntrar['p-creditos'] = function () { CB.creditos(); };

/* Al abandonar la tarjeta de reparación por cualquier vía (Escape, fin de
   partida, cambio de pantalla) hay que matar sus temporizadores. */
CB.pantallas.alSalir['p-reparacion'] = function () { CB.ui.limpiarReparacion(); };

/* Y al abandonar la partida por cualquier vía hay que matar la cuenta atrás.
   Sin esto, el intervalo del reloj sigue vivo en la tarjeta de reparación, en
   el descanso y en el mapa: invisible, porque el HUD está oculto, pero
   gastando y —peor— soltando «Hurry up!» encima de otra pantalla. */
CB.pantallas.alSalir['p-partida'] = function () { CB.ui.reloj.parar(); };

/* ── Arranque ───────────────────────────────────────────────────────────── */
CB.arranque = function () {
  var t0 = CB.util.ahora();

  CB.texturas.generarTodas();
  CB.sprites.precalentar();
  CB.ui.iniciarParticulas();

  var ap = CB.almacen.ajustesDispositivo();
  CB.audio.silenciado = !!ap.silencio;
  CB.audio.vol = (ap.volumen == null) ? 0.7 : ap.volumen;
  CB.audio.conectarVisibilidad();
  CB.musica.iniciar();
  CB.voz.precargar();

  CB.pantallas.conectar();
  CB.a11y.conectarTeclado();
  CB.partida.conectarBarra();
  /* El silencio guardado ya está aplicado (CB.audio.silenciado, arriba); esto
     hace que los iconos lo cuenten en vez de mostrar siempre el altavoz. */
  CB.partida.sincronizarSonido();

  /* Perfil activo */
  var ultimo = CB.almacen.ultimoPerfil();
  var idx = CB.almacen.indice();
  if (ultimo && idx.some(function (e) { return e.id === ultimo; })) {
    var p = CB.almacen.leerPerfil(ultimo);
    if (p && !p.error) {
      CB.perfil = p;
      CB.almacen.podar(p, {});                 // poda también AL ARRANCAR
      CB.memoria.reclasificarTodo(p, CB.util.hoyISO());
      CB.a11y.aplicarAjustes(p.ajustes, ap);
    }
  }

  /* Botones de la portada */
  var jugar = document.getElementById('btn-jugar');
  if (jugar) {
    jugar.addEventListener('click', function () {
      CB.audio.iniciar();                      // primer gesto real del usuario
      if (!CB.perfil) { CB.pantallas.ir('p-perfiles'); return; }
      if (!CB.perfil.calibrado) { CB.calibracion.iniciar(); return; }
      if (CB.partida.hayPartidaGuardada(CB.perfil)) {
        CB.partida.reanudarGuardada(CB.perfil);
        return;
      }
      CB.pantallas.ir('p-mapa');
    });
  }

  var tranquila = document.getElementById('btn-tranquila');
  if (tranquila) {
    tranquila.addEventListener('click', function () {
      CB.audio.iniciar();
      if (!CB.perfil) { CB.pantallas.ir('p-perfiles'); return; }
      CB.partida.iniciar({ mundoId: 'M1', modo: 'tranquila' });
    });
  }

  var otra = document.getElementById('btn-otra');
  if (otra) {
    /* Un solo toque, sin diálogos (§3.7). */
    otra.addEventListener('click', function () {
      var m = CB.perfil ? CB.mapaDestrezas.mundoActual(CB.perfil).id : 'M1';
      CB.partida.iniciar({ mundoId: m, modo: 'expedicion' });
    });
  }

  var tranquilaFin = document.getElementById('btn-tranquila-fin');
  if (tranquilaFin) {
    tranquilaFin.addEventListener('click', function () {
      CB.partida.iniciar({ mundoId: 'M1', modo: 'tranquila' });
    });
  }

  /* Momento socioafectivo del fin de partida */
  var caras = document.querySelectorAll('#fin-animo .cara-animo');
  var i;
  for (i = 0; i < caras.length; i++) {
    (function (b) {
      b.addEventListener('click', function () {
        if (!CB.perfil) return;
        var v = parseInt(b.getAttribute('data-animo'), 10);
        CB.perfil.animo.push({ fechaISO: CB.util.hoyISO(), cara: v });
        var h = CB.perfil.historial;
        if (h.length) h[h.length - 1].animo = v;
        var todas = document.querySelectorAll('#fin-animo .cara-animo');
        var j;
        for (j = 0; j < todas.length; j++) todas[j].setAttribute('aria-pressed', 'false');
        b.setAttribute('aria-pressed', 'true');
        CB.almacen.guardarPerfil(CB.perfil);
      });
    })(caras[i]);
  }

  /* Guardado ante cierre y cambio de pestaña */
  window.addEventListener('pagehide', function () {
    if (!CB.perfil) return;
    if (CB.partida.estado) CB.partida.guardarEnCurso();
    CB.almacen.podar(CB.perfil, {});
    CB.almacen.guardarPerfil(CB.perfil);
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && CB.perfil) {
      if (CB.partida.estado) CB.partida.guardarEnCurso();
      CB.almacen.guardarPerfil(CB.perfil);
    }
  });

  /* ── Volver de una recarga sin perder la partida ──────────────────────────
     `pagehide` guarda la partida en curso, también cuando la recarga la provoca
     otro (Live Server al guardar un fichero, un F5 sin querer, iOS reciclando
     la pestaña). Lo que faltaba era la vuelta: se aterrizaba en la portada y
     había que pulsar JUGAR, con lo que una recarga a media pregunta parecía que
     el juego se había reiniciado solo.

     La ventana es corta A PROPÓSITO. Con un minuto, lo único que cabe es una
     recarga: nadie cierra el juego y vuelve a abrirlo en menos de eso. Pasado
     ese minuto se aterriza en la portada como siempre y JUGAR sigue ofreciendo
     reanudar durante 24 h, que es la conducta de toda la vida. Sin el límite,
     un niño que abre el juego por la mañana se encontraría metido de golpe en
     la expedición de ayer sin haber tocado nada. */
  if (!CB.perfil) CB.pantallas.ir('p-perfiles');
  else if (CB.arranque.esRecarga(CB.perfil, Date.now()) &&
           CB.partida.hayPartidaGuardada(CB.perfil)) {
    CB.pantallas.ir('p-portada');           // deja la portada debajo, para «Salir»
    CB.partida.reanudarGuardada(CB.perfil);
  }
  else CB.pantallas.ir('p-portada');

  CB.arranqueMs = Math.round(CB.util.ahora() - t0);
  return CB.arranqueMs;
};

/* Ventana corta A PROPÓSITO: en un minuto lo único que cabe es una recarga.
   Pasado ese minuto se aterriza en la portada y JUGAR sigue ofreciendo reanudar
   durante 24 h, que es la conducta de siempre. Sin el límite, un niño que abre
   el juego por la mañana se encontraría metido de golpe en la expedición de
   ayer sin haber tocado nada. */
CB.arranque.MS_RECARGA = 60000;

/* ── El botón de la portada dice lo que va a pasar ──────────────────────────
   «JUGAR» prometía una partida y llevaba a cuatro preguntas de colocación sin
   reloj, sin luces y sin puntos. La colocación es necesaria y no debe parecer
   un examen —por eso no tiene cronómetro— pero eso no justifica anunciarla como
   una partida: quien lo probó lo describió como «muy muy muy confuso», y la
   confusión no estaba en el flujo sino en el rótulo.

   Devuelve TEXTO, no navega: quien decide a dónde se va sigue siendo el
   manejador del clic. */
CB.arranque.rotuloJugar = function (perfil) {
  if (!perfil || !perfil.calibrado) return 'EMPEZAR';
  if (CB.partida.hayPartidaGuardada(perfil)) return 'SEGUIR JUGANDO';
  return 'JUGAR';
};

CB.arranque.pistaJugar = function (perfil) {
  if (!perfil) return 'Primero elegimos quién juega.';
  if (!perfil.calibrado) {
    return 'Primero, ' + CB.calibracion.ITEMS.length +
           ' preguntas para saber por dónde empezar. Sin reloj y sin puntos.';
  }
  if (CB.partida.hayPartidaGuardada(perfil)) return 'Tienes una expedición a medias.';
  return '';
};

/* PINTA, no navega: el contrato de alEntrar (ver casos-regresiones.js, E1). */
CB.pantallas.alEntrar['p-portada'] = function () {
  var b = document.getElementById('btn-jugar');
  if (b) b.textContent = CB.arranque.rotuloJugar(CB.perfil);
  var p = document.getElementById('portada-pista');
  if (p) p.textContent = CB.arranque.pistaJugar(CB.perfil);
};

CB.arranque.esRecarga = function (perfil, ahoraMs) {
  var g = perfil && perfil.partidaEnCurso;
  if (!g || g.guardadaTs == null) return false;
  return (ahoraMs - g.guardadaTs) < CB.arranque.MS_RECARGA;
};

document.addEventListener('DOMContentLoaded', function () {
  /* La suite de pruebas carga los mismos 43 scripts pero NO debe arrancar una
     partida: monta su propio banco de pruebas sobre los mismos módulos. */
  if (!document.getElementById('btn-jugar')) return;

  /* El service worker se registra AQUI, detras de la guarda de arriba, y no es
     un detalle de colocacion: si pruebas.html registrara uno, cachearia la
     propia suite y el siguiente cambio de codigo se serviria desde cache. El
     sintoma seria «las pruebas no son deterministas», que ejecutor.js ya
     identifica como la conclusion mas cara posible.
     En file:// no hace nada y no dice nada: CB.offline.DISPONIBLE es false. */
  try { CB.offline.registrar(); } catch (eSW) { }

  try {
    CB.arranque();
  } catch (e) {
    CB.pantallas.fallo(e);
  }
});
