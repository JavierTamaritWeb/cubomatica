export const meta = {
  name: 'lentes-pendientes-cubomatica',
  description: 'Las dos lentes que quedaron sin hacer: diversion y facilidad de jugar',
  phases: [
    { title: 'Explorar', detail: 'diversion y facilidad, en paralelo, sobre el codigo real' },
    { title: 'Contrastar', detail: 'critica adversaria contra las restricciones del proyecto' },
    { title: 'Sintetizar', detail: 'fases ejecutables con guardianes, desde E56' },
  ],
}

/* ============================================================================
   lentes-pendientes.js — las dos lentes que faltan del plan de mejoras
   ----------------------------------------------------------------------------
   QUÉ ES. Un guion de orquestación multiagente, no código del juego: no lo carga
   nadie, no entra en manifiesto.json y no toca `dist/`. Vive aquí porque
   `.claude/workflows/` es el sitio del que se leen los workflows por nombre.

   POR QUÉ EXISTE. El plan de la versión 1.8.0
   (`docs/plan-mejoras-1.8.0.md`) salió de cinco lentes: pedagogía, diversión,
   facilidad de jugar, cintas y pruebas. La auditoría multiagente que iba a
   contrastarlas **murió entera por límite de uso**, así que el plan se escribió
   leyendo el código a mano. Las lentes de las cintas y de las pruebas quedaron
   apoyadas línea a línea y se implementaron; las de **diversión** y **facilidad**
   se quedaron sin evidencia suficiente y NO se implementaron. Esas dos son las
   que quedan, y las que ejecuta este guion.

   CÓMO SE LANZA:
     Workflow({ name: 'lentes-pendientes-cubomatica' })
   o, por ruta:
     Workflow({ scriptPath: '.claude/workflows/lentes-pendientes.js' })

   Son cinco agentes: dos exploraciones, dos críticas adversarias y una síntesis.
   Devuelve un plan en Markdown pensado para añadirse a
   `docs/plan-mejoras-1.8.0.md` como continuación.

   QUÉ NO DEBE VOLVER A PROPONER, y por eso está escrito dentro del contexto: la
   cinta y el escalón 4 ya están hechos en 1.8.0, y ocultar los diez logros de la
   versión 2 se descartó tras comprobar que ninguna pantalla los pinta.

   ANTES DE CREER LO QUE DEVUELVA: comprueba en el código un par de las
   evidencias que cite. Ya ha pasado que un agente cite un fichero y una línea
   que no dicen lo que afirma.
   ────────────────────────────────────────────────────────────────────────── */

const RAIZ = '/Users/imac_mini_javi/Desktop/mathsgame'

const CONTEXTO = `
PROYECTO: Cubomatica 1.8.0, en ${RAIZ}. Juego de matematicas en espanol para 2.o de
Primaria (7-8 anos), curriculo RD 157/2022. TODO —codigo, comentarios, identificadores,
documentacion, interfaz— esta en espanol y debe seguir estandolo.

LEE ANTES DE NADA, de verdad y no de memoria:
  ${RAIZ}/CLAUDE.md                      restricciones duras
  ${RAIZ}/docs/decisiones.md             decisiones cerradas; no las reabras sin motivo fuerte
  ${RAIZ}/docs/plan-mejoras-1.8.0.md     el plan del que salen estas dos lentes

RESTRICCIONES DURAS. Cualquier propuesta que las incumpla no vale:
- El destino es dist/index.html abierto CON DOBLE CLIC desde file://. Sin servidor, sin red.
- Cero fetch, cero XMLHttpRequest, cero import(): CORS los bloquea en file://.
- Sin modulos ES. 45 fuentes concatenadas por gulp en el orden que manda manifiesto.json.
  Todo cuelga de un global CB. Anadir un fichero = anadirlo a manifiesto.json y a nada mas.
- ES2017 estricto con var y funciones expresion: nada de ?., ??, campos privados.
  Hardware base: Chromebook escolar de 2019 e iPad de 6.a generacion. terser con ecma:5.
- Frontera de pureza: 00, 10-18 y 20-2A NO pueden tocar document., window., localStorage,
  navigator. ni Math.random (toda aleatoriedad va por el RNG sembrado). El DOM solo en 30-99.
- Nada de toISOString. Se usa CB.util.hoyISO().
- Las claves de almacen ('cubomatica.') solo existen en src/js/01-almacen.js.
- CB.almacen.sanear() borra toda clave que empiece por _: ningun campo con _ delante puede
  guardar estado que deba sobrevivir a un guardado.
- Todo while en src/ debe tener cota.
- CSS: cero border-radius distinto de 0, cero box-shadow con desenfoque, cero transiciones
  suavizadas. TODO el movimiento va con steps(). La auditoria falla la construccion si no.
- Cero ficheros de imagen y cero fuentes: las texturas se generan con canvas y los efectos
  con Web Audio. No propongas assets nuevos.
- Accesibilidad EN 301 549 / WCAG 2.2 AA, que aqui es obligacion legal: todo limite de
  tiempo desactivable; nunca color solo; prefers-reduced-motion y :root.sin-movimiento
  salen de UNA lista en _05-animaciones.scss; quitar movimiento no puede quitar informacion.

CONTRATOS QUE LAS PRUEBAS VERIFICAN. Tocar uno exige cambiar su prueba A PROPOSITO y decirlo:
45 fuentes · 17 pantallas · 92 niveles en 4 mundos · 24 codigos de error = 24 recomendaciones
30 casos exactos de puntuacion · 9 pistas de musica · 12 efectos de sonido
Pesos: fuentes < 1100 KB, descarga de arranque < 400 KB, musica < 60 MB.
Base de la suite: 489 comprobaciones, 0 fallos, en dos paginas. Auditoria: 58 comprobaciones.
Guardianes de regresion: van por E55. Los nuevos empiezan en E56.

LO QUE YA SE HIZO EN 1.8.0, y NO hay que volver a proponer:
- La cinta: un solo nodo por pantalla, .cinta + .cinta--<coreografia>, NUEVE coreografias
  (sello, sube, junta, cascada, estalla, bandera, veta-madre, posa, prisa). El CSS es dueno
  de la forma y el JS de la duracion (CB.ui.cinta.COREOGRAFIAS). Los gritos salen de una
  bolsa barajada. Ya esta hecho y probado; no lo redisenes.
- El escalon 4 de la escalera (retroceder al prerrequisito dominado). Implementado.
- Se DESCARTO ocultar los diez logros «reservados a la version 2»: CB.logros.LISTA no la
  pinta ninguna pantalla, asi que el nino no ve ningun hueco. No vuelvas sobre ello.

ERES DE SOLO LECTURA. No edites ni crees ningun fichero. Devuelve datos, no relleno. Cita
siempre fichero:linea, y que la evidencia exista de verdad en esa linea. Cada propuesta
debe apoyarse en algo que hayas LEIDO en este codigo, no en buenas practicas de manual.
`

const ESQUEMA_HALLAZGOS = {
  type: 'object',
  additionalProperties: false,
  required: ['hallazgos'],
  properties: {
    hallazgos: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['titulo', 'evidencia', 'problema', 'propuesta', 'impacto', 'esfuerzo', 'riesgo'],
        properties: {
          titulo: { type: 'string', description: 'Una linea, concreta, en espanol' },
          evidencia: { type: 'string', description: 'fichero:linea y que dice ese codigo' },
          problema: { type: 'string', description: 'Que falla hoy, para el nino de 7 anos' },
          propuesta: { type: 'string', description: 'Cambio concreto: ficheros, funciones, numeros' },
          impacto: { type: 'string', enum: ['alto', 'medio', 'bajo'] },
          esfuerzo: { type: 'string', enum: ['pequeno', 'medio', 'grande'] },
          riesgo: { type: 'string', description: 'Que se puede romper y que contrato o prueba toca' },
        },
      },
    },
  },
}

const ESQUEMA_CRITICA = {
  type: 'object',
  additionalProperties: false,
  required: ['veredictos'],
  properties: {
    veredictos: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['titulo', 'veredicto', 'motivo', 'correccion'],
        properties: {
          titulo: { type: 'string' },
          veredicto: {
            type: 'string',
            enum: ['solido', 'necesita-correccion', 'incumple-restriccion', 'descartar'],
          },
          motivo: { type: 'string', description: 'Citando la restriccion o el codigo que lo desmiente' },
          correccion: { type: 'string', description: 'Version corregida, o vacio si se descarta' },
        },
      },
    },
  },
}

const LENTES = [
  {
    clave: 'diversion',
    prompt: `${CONTEXTO}

TU LENTE: diversion y bucle de juego. Lee src/js/40-partida.js, src/js/42-jefes.js,
src/js/24-logros.js, src/js/44-casa.js, src/js/43-mapa-destrezas.js, src/js/22-vidas.js,
src/js/20-puntuacion.js, src/js/27-repaso.js, src/js/31-pantallas.js y src/js/07-musica.js.

Responde: donde ABURRE hoy? Concretamente:
- El bucle minuto a minuto. Cuantos segundos pasan entre dos momentos de recompensa? Hay
  tramos muertos? Mira las esperas reales, que ahora salen de CB.ui.cinta.espera().
- La recompensa: es variable o siempre la misma? Cromos, bloques raros, gemas, logros.
  El bloque raro es 1 de cada 20 (PROB_BLOQUE_RARO). Es la unica sorpresa que hay?
- La razon para volver manana (musgo sobre las vetas, la casa, el mapa): es honesta o es
  burocracia? La sentiria un nino de 7 anos o solo la entiende un adulto?
- Las peleas de jefe: tienen tension o son cuatro botones mas con otro fondo?
- Que celebra el juego, y que NO celebra y deberia. Ojo: las celebraciones visuales ya
  estan resueltas en 1.8.0; busca MOMENTOS que no tienen ninguna, no efectos nuevos.
- Progresion visible: sabe el nino que esta avanzando, y en que?

Nada que exija imagenes, fuentes ni binarios nuevos. Entre 6 y 12 hallazgos con
fichero:linea.`,
  },
  {
    clave: 'facilidad',
    prompt: `${CONTEXTO}

TU LENTE: «facil de jugar, no facil de resolver». Toda friccion que NO sea matematica es un
defecto. Lee src/js/32-componentes.js, src/js/30-ui.js, src/js/31-pantallas.js,
src/js/99-arranque.js, src/js/06-a11y.js, src/index.html, src/scss/_02-base.scss,
src/scss/_03-componentes.scss y src/scss/_04-pantallas.scss.

Responde con friccion concreta que sufre un nino de 7 anos:
- Entrada: el teclado de bloques, el bloqueo de CB.componentes.MS_CONSTRUCCION al montar,
  el borrado, la confirmacion doble del antiazar. Cuantos toques cuesta contestar? Y si se
  equivoca al teclear? RECIBE ALGUNA SENAL de que aun no puede tocar, o pulsa y no pasa
  nada, que se lee como que el juego esta roto?
- Navegacion entre las 17 pantallas: cuantos toques de la portada al primer item? Se puede
  uno perder? Hay callejones sin salida?
- Legibilidad: tamanos de toque (WCAG 2.5.8 pide 24 px; aqui hay botones de 64), longitud
  de los enunciados, densidad de texto para quien apenas lee.
- Estados que solo se distinguen por color, o que no dan respuesta al toque.
- Cosas que un nino no puede deshacer y deberia.

Distingue EXPLICITAMENTE en cada hallazgo entre «dificultad legitima» (la matematica) y
«friccion» (todo lo demas). Solo la friccion es un defecto. Entre 6 y 12 hallazgos con
fichero:linea.`,
  },
]

phase('Explorar')

const resultados = await pipeline(
  LENTES,
  (lente) => agent(lente.prompt, {
    label: `explora:${lente.clave}`,
    phase: 'Explorar',
    schema: ESQUEMA_HALLAZGOS,
  }),
  (exploracion, lente) => {
    if (!exploracion || !exploracion.hallazgos || !exploracion.hallazgos.length) return null
    return agent(`${CONTEXTO}

ERES EL CRITICO ADVERSARIO. Otro agente propone estas mejoras desde la lente
"${lente.clave}". Tu trabajo NO es mejorarlas por gusto: es intentar DERRIBAR cada una
comprobandola contra el codigo real. Abre los ficheros y verifica; no juzgues de memoria.

Para cada propuesta, una por una:
1. Incumple alguna restriccion dura? (file://, sin fetch, sin modulos, ES2017 con var,
   frontera de pureza, sin Math.random en modulos puros, steps() obligatorio, cero
   border-radius, cero sombra difusa, sin toISOString, claves de almacen solo en
   01-almacen.js, campos con _ delante que no sobreviven a sanear(), cero assets nuevos)
2. Rompe un contrato verificado? Si lo rompe, di QUE prueba hay que cambiar a proposito.
3. Reabre una decision cerrada en docs/decisiones.md sin motivo suficiente?
4. Rompe la accesibilidad legal?
5. Es apropiada para un nino de 7-8 anos o es una idea de adulto? Funciona en un
   Chromebook de 2019?
6. La evidencia que cita EXISTE en ese fichero y esa linea? Compruebalo. Si no, dilo.
7. Choca con algo que 1.8.0 ya resolvio (la cinta, el escalon 4)?

Se duro. Marca "solido" solo lo que aguante las siete. Si algo es salvable, escribe en
"correccion" la version que si aguanta, con el mismo detalle.

PROPUESTAS A JUZGAR:
${JSON.stringify(exploracion.hallazgos, null, 1)}`, {
      label: `critica:${lente.clave}`,
      phase: 'Contrastar',
      schema: ESQUEMA_CRITICA,
      effort: 'high',
    }).then((critica) => ({ lente: lente.clave, hallazgos: exploracion.hallazgos, critica: critica }))
  }
)

const utiles = resultados.filter(Boolean)
log(`${utiles.length} de 2 lentes exploradas y contrastadas`)

phase('Sintetizar')

const sintesis = await agent(`${CONTEXTO}

ERES EL SINTETIZADOR. Tienes las dos lentes que faltaban del plan de Cubomatica —diversion
y facilidad de jugar— con la critica adversaria de cada una.

TU TRABAJO: un plan EJECUTABLE en espanol, en Markdown, que se pueda anadir tal cual a
docs/plan-mejoras-1.8.0.md como continuacion. No un resumen: un plan.

REGLAS:
- Descarta sin piedad lo marcado "incumple-restriccion" o "descartar". Donde la critica dio
  una "correccion", usa esa version.
- Fases numeradas, cada una con un "hecho cuando" comprobable objetivamente.
- Cada fase dice QUE guardian nuevo nace y donde vive. Los guardianes van por E55: los
  nuevos empiezan en E56 y se numeran de corrido. Ningun fallo se cierra sin guardian.
- Para cada guardian, di como se comprueba que NO nace roto: que fallo hay que sembrar y
  que comprobacion tiene que ponerse roja. Dos de los ultimos nueve nacieron rotos —uno
  pasaba en verde con el fallo dentro y otro se ponia rojo contra codigo correcto— y solo
  se vio sembrando.
- Di si cada fase es REVERSIBLE o IRREVERSIBLE y que contrato verificado toca.
- Di explicitamente que queda FUERA y por que. Un plan sin fuera-de-alcance miente.
- Propon version resultante segun la regla del proyecto: primera cifra solo si cambia el
  formato del perfil guardado (migracion en 01-almacen.js); segunda si entra capacidad;
  tercera para correcciones. Justificalo.
- Frases cortas. Numeros. Ficheros. Lineas. Nada de relleno motivacional.

MATERIAL:
${JSON.stringify(utiles, null, 1)}`, {
  label: 'sintesis:plan',
  phase: 'Sintetizar',
  effort: 'high',
})

return { plan: sintesis, lentes: utiles.map((u) => ({ lente: u.lente, n: u.hallazgos.length })) }
