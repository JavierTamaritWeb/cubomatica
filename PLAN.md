# CUBOMÁTICA — Plan maestro v2 (definitivo)

> **Juego educativo web de matemáticas para 2.º de Educación Primaria (7-8 años).**
> Lema: **«las Matemáticas son muy divertidas»**. Aprender divirtiéndose.
> Sin servidor, sin red, sin datos personales. Se abre con doble clic sobre `index.html`.
>
> **Esta versión v2 incorpora las 49 correcciones críticas y altas y las 29 medias/bajas de las tres auditorías adversariales (CURRÍCULO, NIÑO, TÉCNICO), más las 33 ausencias señaladas.** Las decisiones en que me aparto de una corrección de auditoría están justificadas al final, en «Decisiones sobre la auditoría».
>
> **Fecha de cierre de esta versión: 25 de julio de 2026.**

---

## ÍNDICE

| § | Sección | Qué cierra |
|---|---|---|
| **1** | Resumen ejecutivo, lema y alcance declarado | Qué es y qué NO es |
| **2** | Público, contexto de uso y matriz de dispositivos | Navegadores mínimos, tabletas, aula |
| **3** | Bucle de juego, HUD y economía de la partida | Luces, gemas, bono de rapidez, pausa |
| **4** | Identidad visual propia «mundo de cubos» | Estética original sin marca ajena |
| **5** | Criaturas, mundos y biomas | 11 criaturas propias, 4 mundos v1 |
| **6** | Base normativa y alcance curricular real | RD 157/2022 literal, bloques cubiertos |
| **7** | Primeros 60 segundos: onboarding y calibración jugable | Sin pantalla de «trimestre» |
| **8** | Anexo del catálogo: los 92 niveles con rango, llevadas y trimestre | Contrato de contenido verificable |
| **9** | Problemas de enunciado: 20 estructuras semánticas y su ponderación | Cómo se generan y se reparten |
| **10** | Sistema visual: paleta, tipografía, contraste, retícula y bocetos | Escala de espaciado y maquetas |
| **11** | Motor de puntuación: fórmula cerrada y 30 casos exactos | Requisitos 6 y 7 |
| **12** | Luces (vidas), anti-azar y escalera anti-frustración | Requisitos 7, 9 y 10 |
| **13** | Motor adaptativo, memoria, grafo de destrezas y repaso | Elo por destreza, curva de olvido |
| **14** | Arquitectura de ficheros, reglas de frontera y APIs | 43 scripts, motor puro |
| **15** | Modelo de datos y persistencia | Claves, esquema, migración, cuota |
| **16** | Accesibilidad e inclusión | WCAG, dislexia, teclado, tiempo |
| **17** | Panel para familias y maestros | 10 métricas, informe A4, honestidad |
| **18** | Plan de implementación por fases (F0-F10) | Criterios de HECHO verificables |
| **19** | Plan de pruebas | 12 invariantes, suite, pilotaje |
| **20** | Mejoras propuestas más allá de lo pedido | Requisito 11 |
| **21** | Cumplimiento legal, marca y privacidad | RGPD, Children's Code, no afiliación |
| **A** | **Trazabilidad de requisitos** | Los 11 requisitos → sección → cómo |
| **B** | **Decisiones sobre la auditoría** | Qué no aplico y por qué |
| **C** | **Siguiente paso** | Comando exacto para empezar |

---

## 1. Resumen ejecutivo, lema y alcance declarado

### 1.1 Qué es

**Cubomática** es un videojuego web de matemáticas, de un solo fichero de entrada (`index.html`), **sin instalación, sin servidor, sin red y sin cuentas**, con estética propia de mundo de cubos (voxel/pixel-art), pensado para que un niño o niña de 2.º de Primaria juegue **6-9 minutos** y salga con la sensación de haber cavado, encontrado gemas y aprendido algo.

El niño es un **minero de la Cantera del Saber**. Cada pregunta bien resuelta pica un bloque. Cada nivel dominado ilumina una **veta** del mapa de la cantera. Las vetas que no se repasan se cubren de **musgo** y hay que restaurarlas.

### 1.2 Los cuatro contenidos obligatorios (requisito 1 del usuario)

1. **Sumas** — 16 niveles (S1-S16).
2. **Restas** — 14 niveles (R1-R14).
3. **Repaso de tablas de multiplicar** — 10 niveles (M1-M10). Las tablas del **2, del 5 y del 10** forman parte del **recorrido nuclear del tercer trimestre**, no son opcionales (§6.5).
4. **Problemas de enunciado de sumas y restas** — 20 niveles (P1-P20), uno por estructura semántica.

Más tres bloques de apoyo que el currículo exige y casi ninguna app entrena: **numeración** (16 niveles), **dinero** (8) y **vocabulario matemático** (8). **Total: 92 niveles.**

**Regla de composición del guion (cierra una ausencia del auditor técnico):** toda partida de ≥10 ítems sirve **como mínimo 2 problemas de enunciado y al menos 1 ítem de cada bloque desbloqueado**. Sin esta cuota, un motor adaptativo puro podría dejar a un niño 10 sesiones sin ver un solo problema con texto, que es exactamente lo que el usuario pidió que hubiera. Se verifica en `casos-motor.js`.

### 1.3 Alcance curricular declarado — texto literal obligatorio

Este párrafo aparece **literal** en `README.md`, en la pantalla de Créditos y en la primera pantalla del panel del adulto:

> **«Cubomática trabaja el bloque A (Sentido numérico) y, de forma transversal, el bloque F (Sentido socioafectivo) de los saberes básicos del primer ciclo de Matemáticas del Real Decreto 157/2022, de 1 de marzo, por el que se establecen la ordenación y las enseñanzas mínimas de la Educación Primaria (BOE núm. 52, de 2 de marzo de 2022). NO trabaja los bloques B (sentido de la medida: longitud, masa, capacidad, tiempo, reloj y calendario), C (sentido espacial: figuras y posición), D (sentido algebraico: patrones e igualdades) ni E (sentido estocástico: datos y azar): esos saberes se trabajan en el aula y este juego no los sustituye.»**

**Por qué importa:** el plan v1 declaraba como criterio de HECHO que «todo saber de 1.er ciclo tiene ≥1 nivel». Era falso por construcción y, peor, el test lo habría dado por bueno amputando la lista de saberes. Un producto educativo no puede sostener una afirmación de cobertura que no es cierta.

### 1.4 Qué NO es

- No es una evaluación, ni una nota, ni un test de capacidad.
- No compara al niño con otros niños. No hay percentiles ni ranking.
- No sustituye al maestro ni al material manipulativo. El panel del adulto propone precisamente lo contrario: 10 minutos con regletas, monedas o palillos.
- No cubre los bloques B, C, D y E del currículo (§1.3).

### 1.5 Alcance v1 / v2

| | v1 (esta entrega) | v2 (documentado, no implementado) |
|---|---|---|
| Niveles | 92 | +12 (medida y patrones, si se decide ampliar alcance) |
| Mundos con jefe | 4 (M1-M4) | 6 |
| Logros | **10 activos** de una lista de 24 declarada | los 14 restantes |
| Códigos de error | **24 documentados**, 18 con `simular()` | — |
| Modos | Expedición · **Cantera Tranquila** · Jefe · Repaso de verano | Veta Profunda · Cooperativo local «dos picos» |
| Panel de aula | Tabla de hasta 30 alumnos, comparaciones ocultas | `agrupamientoPorError()` |
| Casa | Álbum de cromos | Rejilla de construcción 16×16×6 y planos |

---

## 2. Público, contexto de uso y matriz de dispositivos

### 2.1 Público

- **Primario:** niño o niña de 7-8 años cursando 2.º de Primaria en España, jugando solo, sin adulto al lado, sabiendo leer con fluidez incipiente (≈60 palabras por minuto).
- **Secundario:** la familia (panel del adulto, informe A4, ficha de refuerzo).
- **Terciario:** el maestro (modo aula hasta 30 perfiles, modo proyección para pizarra digital, 10 minutos de gran grupo).

### 2.2 Contextos de uso previstos

| Contexto | Cómo arranca | Restricción que impone |
|---|---|---|
| Casa, portátil familiar | Doble clic en `index.html` | Debe funcionar bajo `file://` |
| Casa, tableta | Abrir el `index.html` desde el gestor de archivos, o `servir.command` | Táctil, sin teclado físico |
| Aula, carro de portátiles sin internet | Pendrive USB → doble clic | Cero red, cero CDN |
| Aula, pizarra digital | Modo proyección | Tipografía ×1,6, un ítem por pantalla |
| Chromebook escolar de 2019 | Doble clic | Rendimiento: presupuesto estricto |

### 2.3 Matriz de navegadores soportados — suelo declarado

*(Cierra una ausencia del auditor técnico: sin esta tabla no se puede decidir si `color-mix`, `@property` o `:has()` son utilizables.)*

| Navegador | Versión mínima soportada | Consecuencia |
|---|---|---|
| Chrome / Edge / ChromeOS | **100** | Sin `color-mix`, sin `:has()`, sin `@property` garantizados |
| Firefox | **100** | Idem |
| Safari (macOS / iPadOS) | **15.4** | Idem |

**Regla de sintaxis JS:** **ES2017 estricto**. Permitido: `let/const`, funciones flecha, `class`, plantillas literales, `Object.assign`, `Array.prototype.includes`, `async/await`. **Prohibido** en todo el proyecto (romperían el suelo declarado): encadenamiento opcional `?.`, coalescencia `??`, `Array.prototype.at`, `structuredClone`, `Object.hasOwn`, campos privados `#x`, `:has()`, `color-mix()` y `@property` **fuera de un bloque `@supports`**.

**Regla de CSS moderno:** toda propiedad posterior a 2021 se usa **solo como mejora progresiva dentro de `@supports`**, con una implementación base garantizada. Ejemplo cerrado en §10.7 (cielo día→noche).

**`<meta name="viewport">` obligatorio y su forma exacta** *(ausencia del auditor técnico)*:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

**Sin `maximum-scale` y sin `user-scalable=no`**: WCAG 1.4.4 exige permitir el zoom, y un niño con baja visión lo va a usar.

### 2.4 Presupuesto de rendimiento (medible, no aspiracional)

| Métrica | Presupuesto | Dónde se mide |
|---|---|---|
| Tiempo hasta pantalla de portada interactiva | **< 600 ms** en Chromebook 2019; < 300 ms en portátil moderno | F4, perfilador |
| Peso total del proyecto en disco | **< 900 KB** (sin `.png`, sin `.woff2` suelto) | F9, `du -sh` |
| Fotogramas durante partículas | 60 fps sostenidos, 0 fotogramas > 32 ms | F4, perfilador |
| Suite rápida de pruebas | **< 8 s** (92.000 ítems) | F2 |
| Suite exhaustiva | **< 90 s** (920.000 ítems, por lotes) | F9 |

**Prohibido publicar cifras de rendimiento no medidas.** El plan v1 afirmaba «920.000 generaciones en ~4 s», lo que equivale a 4,3 µs por ítem completo en JavaScript: era un dato inventado por un orden de magnitud. Cada cifra de esta tabla se remide y se anota en `docs/decisiones.md` en cuanto exista la fase correspondiente.

---

## 3. Bucle de juego, HUD y economía de la partida

### 3.1 El bucle, ítem a ítem

```
PORTADA → [JUGAR] → (primera vez: CALIBRACIÓN JUGABLE, §7) → MAPA DE MUNDOS
  → EXPEDICIÓN (guion por presupuesto de tiempo, §3.6)
      ├─ se monta el ítem (800 ms de construcción visible, §3.5)
      ├─ el niño responde (teclado de bloques / 4 opciones / signo / balanza / monedas / ordenar / datos)
      ├─ ACIERTO  → mensaje variado (§ requisito 4) + gemas + bono de rapidez retrospectivo
      ├─ 1.er FALLO → pista de Rocarr. NO se apaga luz. NO se rompe racha.
      ├─ 2.º FALLO → TARJETA DE REPARACIÓN (puerta de interacción, §12.4) → se apaga una luz
      ├─ cada 6-8 ítems → MICRO-DESCANSO (uno de 5 distintos, §20 mejora 5)
      └─ ~1 de cada 20 ítems → BLOQUE RARO (cromo garantizado, §20 mejora 15)
  → JEFE del mundo (opcional, nunca apaga luces, §12.7)
  → FIN DE LA EXPEDICIÓN (misma pantalla y mismo tono se acabe como se acabe, §3.7)
```

### 3.2 El HUD: qué se ve y qué NO se ve

```
┌──────────────────────────────────────────────────────────┐
│  ◼◼◼ (3 luces del casco)          ◈ 58 gemas             │
│                                                          │
│                    [ ENUNCIADO / OPERACIÓN ]             │
│                                                          │
│                    [ ZONA DE RESPUESTA ]                 │
│                                                          │
│  [🔊 Leer]  [💡 Pista]        [⏸ Pausa] [🔈 Sonido] [◀ Salir]│
└──────────────────────────────────────────────────────────┘
```

**Lo que SÍ está, permanentemente:**

| Elemento | Tamaño | Regla |
|---|---|---|
| **3 luces de cristal del casco** | 12×12 px de bloque, escaladas ×4 | Sustituyen a los corazones (§3.3) |
| Contador de gemas | — | Solo sube. **Nunca baja. Nunca es negativo.** |
| Botón **Leer** (altavoz) | 64×64 px | Lee el enunciado o hace lectura guiada (§16.4) |
| Botón **Pista** | 64×64 px | Disponible siempre, sin coste de luz |
| Botón **Pausa** | 64×64 px | Congela el cronómetro. Sin límite de tiempo. No cuenta para el límite de sesión |
| Botón **Sonido** | 64×64 px | Silencia en **un solo toque**. Persiste en `ajustesDispositivo` |
| Botón **Salir** | 64×64 px | Guarda íntegro y sale **sin diálogo de retención** |

**Lo que NO está, y por qué:**

- ❌ **La hilera de gemas del tiempo apagándose.** El plan v1 prohibía la cuenta atrás numérica, el rojo creciente y el tic-tac, y luego conservaba una hilera de gemas que se apagaban mientras el niño pensaba. Es una cuenta atrás con otra piel: cumple la letra de la norma y viola su motivo. Para el niño lento —el que más necesita este juego— es un recordatorio permanente de que va perdiendo, y es el estímulo que la literatura sobre ansiedad matemática señala como desencadenante en primaria.
- ❌ Cuenta atrás numérica, color rojo creciente, tic-tac acelerado, vibración, mensaje «¡RÁPIDO!».
- ❌ Marcador de fallos, contador de errores, porcentaje de acierto en vivo.
- ❌ Números negativos en cualquier parte de la interfaz del niño.

**Excepción declarada:** en **modo proyección / aula** el adulto puede reactivar la hilera de tiempo en vivo desde §17.8, porque en gran grupo cumple una función distinta (ritmo colectivo) y no hay un niño solo mirándola.

### 3.3 Las luces del casco (sustituyen a los corazones)

**Decisión cerrada.** Los corazones que estallan aplican iconografía de daño corporal al error matemático en niños de 7 años: asocian equivocarse con romperse, y un corazón roto es irreversible en el imaginario infantil, con lo que la vida extra del requisito 10 pierde legibilidad.

| Estado | Aspecto | Sonido |
|---|---|---|
| Encendida | Bloque de cristal 12×12 px, color `--cristal-claro`, con brillo cuadrado arriba a la izquierda | — |
| **Se apaga** (fallo del 2.º intento) | Pasa a gris con borde oscuro. **Sin partículas, sin estallido, sin sacudida de pantalla** | Dos notas descendentes suaves (Sol4 → Mi4, 180 ms) |
| **Se enciende** (luz extra) | Brillo creciente de 1,5 s | Tres notas ascendentes (Do5 → Mi5 → Sol5) |

Apagar y encender es **reversible**: el niño entiende la luz extra sin que nadie se la explique. Requisito 9 intacto: **3 luces apagadas = fin de la expedición**.

En CSS la clase pasa de `.vidas` a `.luces`. En JS `CB.vidas` **mantiene el nombre de la API** (es el vocabulario del requisito del usuario) pero `CB.vidas.estado()` devuelve `{luces: 3, tope: 5, reserva: 1}`.

### 3.4 Economía: gemas, puntos y bono de rapidez

| Concepto | Regla |
|---|---|
| **Puntos** | Se calculan con la fórmula cerrada de §11. **Nunca negativos, nunca decrecen.** |
| **Gemas** | Moneda visible. `gemas = max(1, round(puntos/50))` al acertar; 0 al fallar. Nunca se restan. |
| **Bono de rapidez** | Se calcula igual que siempre (requisito 6 intacto) pero se muestra **retrospectivamente**: al acertar caen 0-3 «gemas rápidas» con la etiqueta **«+2 por rapidez»**. Ganancia, nunca pérdida en directo. |
| **Fallo** | **Una sola consecuencia visible**: no cae la gema y el marcador se queda quieto con un parpadeo gris de 200 ms. Texto: **«Esta no suma gemas.»** Jamás «−49». |
| **Racha** | **No se rompe con el primer fallo.** Solo si también falla el segundo intento. |

**Regla de una sola consecuencia (decisión cerrada).** El plan v1 aplicaba cuatro castigos simultáneos a un único error: resta de puntos, pérdida de vida, rotura de racha y pérdida del bono. Un niño de 7 años no puede desentrañar cuál pesa; el resultado esperado es que deje de arriesgar. A partir de v2: **un error = se pierde la recompensa de ese ítem**; y solo si falla también el segundo intento, se apaga una luz.

### 3.5 Los 800 ms de construcción (bloqueo anti-azar con retroalimentación)

Durante los primeros **800 ms** de cada ítem la respuesta está bloqueada. Pero **nunca en silencio**: los botones **se montan visiblemente bloque a bloque** (200 ms cada uno) y quedan grises con el bisel hundido. Un toque prematuro produce un **«toc» de madera** y un desplazamiento de 2 px del botón. Al habilitarse, los cuatro biseles suben a la vez con un destello de 100 ms.

- Con `prefers-reduced-motion: reduce`, los botones aparecen grises y cambian de color de golpe.
- **El bloqueo se salta** si el niño ya ha pulsado el altavoz (ya ha invertido tiempo en el ítem).
- El bloqueo **desactiva simultáneamente** los botones, `pointerdown` y el manejador de teclado (`if (CB.partida.bloqueado) return;` como primera línea del manejador en `06-a11y.js`). El foco no se coloca en la primera opción hasta que expira, para que el lector de pantalla no anuncie botones inertes.
- El cronómetro de puntuación arranca **al terminar** el bloqueo.

### 3.6 Duración de la partida: presupuesto de TIEMPO, no de ítems

El plan v1 fijaba 15 ítems y a la vez un objetivo de 6-9 minutos, y sus propios datos daban 21-58 s por problema de enunciado. Una partida con 6 problemas y 9 operaciones supera los 12 minutos. Eran incompatibles.

**`CB.partida.construirGuion()` trabaja con presupuesto de tiempo:**

```
objetivo = 420 s (7 min);  tolerancia ±120 s
se añaden niveles mientras  Σ rtMediana(destreza del nivel) < 420
mínimo 8 ítems, máximo 20 ítems
si no hay datos de rtMediana:  operación = 12 s, problema = 35 s, vocabulario = 8 s
cuota obligatoria: ≥2 problemas de enunciado y ≥1 ítem por bloque desbloqueado
```

**Precedencia de los finales de partida** (cada uno con su `motivoFin`):

1. `limiteSesion` (el adulto fijó 10/15/20/30 min) — **nunca interrumpe un ítem ni un jefe**: marca `estado.finTrasEsteItem = true`, deja terminar la pregunta (y el jefe entero) y muestra la pantalla de fin con el encabezado **«Misión cumplida por hoy»**. Aviso suave 2 minutos antes: *«Nos queda poco para la última pregunta»*, sin cuenta atrás numérica.
2. `luces` (3 luces apagadas).
3. `guion` (guion agotado).
4. `salida` (el niño pulsó Salir).
5. `pausa` (6 tiempos agotados en la partida, §12.3).

### 3.7 Pantalla «Fin de la expedición» — única, mismo tono siempre

**Prohibido literalmente** en toda la pantalla: *«has perdido»*, *«game over»*, *«fin de la partida»*, *«fallaste»*, *«te has quedado sin»*, y **cualquier recuento de fallos**.

Texto de cierre cuando se acaban las luces: **«Se ha apagado la luz del casco. ¡Mañana la cargamos!»**

**Orden de lectura obligatorio, siempre el mismo:**

1. **«Lo que has dominado hoy»** — las vetas que han subido de estado, con su icono y su nombre.
2. **Gemas ganadas** en la expedición, con el desglose del bono final.
3. **Momento socioafectivo**: 3 caras. Aparece **1,5 s después** de la pantalla de logros —nunca inmediatamente después de la tercera luz— y **solo si la partida ha durado ≥3 min**. Se puede saltar con un toque. Texto literal bajo las caras: *«Esto lo guarda el juego para elegir tus retos de mañana. Nadie te pone nota.»*
4. **Dos botones grandes**: **«Otra expedición»** (mismo mundo, **un solo toque, sin diálogos**) y **«Salir»**.

Si la partida ha terminado por luces **dos veces seguidas**, la pantalla ofrece además, en primer lugar, el botón **«Cantera Tranquila»** (§3.8).

### 3.8 Modo «Cantera Tranquila» — modo de primera clase

*(El plan v1 lo recomendaba literalmente al padre en el informe impreso y no existía en ninguna parte del juego. Una promesa vacía en un A4 sobre la mesa de la cocina.)*

| Propiedad | Valor |
|---|---|
| Luces | **No hay.** No se puede perder. |
| Cronómetro | **No hay.** `M_tiempo = 0,85` fijo. |
| Puntos | Se ganan gemas, no se computa récord. |
| Fallo | **Reparación inmediata** tras el primer fallo, sin segundo intento a ciegas. |
| Acceso | Botón propio en la portada, junto a JUGAR. Y ofrecido automáticamente en la pantalla de fin tras dos partidas seguidas acabadas por luces. |
| Contabilidad | Sí cuenta para destrezas, memoria y Mapa de Destrezas. **No** cuenta para logros de puntuación. |

---

## 4. Identidad visual propia «mundo de cubos»

### 4.1 Principio

La estética **voxel / pixel-art de bloques ES UN GÉNERO y no es protegible**. Lo protegido son nombres, logotipos, texturas concretas y diseños de personaje concretos. Cubomática puede parecer «de mundo de cubos» sin ningún problema, siempre que **todo** —nombre, criaturas, texturas, HUD, sonidos, tipografía— sea original. Ver §21.1 para la lista negra completa y las 14 alternativas adoptadas.

### 4.2 Reglas duras de estilo (verificables por revisión visual en F9)

| Regla | Valor |
|---|---|
| Unidad base | `--u: 4px`. **Toda** medida es múltiplo de `--u`. |
| Esquinas | `border-radius: 0` **global**. Una sola esquina redondeada **suspende** la revisión. |
| Sombras | Solo sombras **duras** (`box-shadow: 4px 4px 0 …`). **Ninguna sombra con desenfoque.** |
| Transiciones | Solo **escalonadas** (`steps()`). **Ninguna transición suave**, ningún `ease`. |
| Escalado de imagen | `image-rendering: pixelated` global. |
| Gradientes | Solo `repeating-linear-gradient` de bandas duras. Ningún degradado continuo salvo el cielo (§10.7). |
| Foco | Contorno **4 px** oro `#F5C518` con `outline-offset: var(--u)`. |

### 4.3 Escala de espaciado

*(Ausencia señalada: el plan v1 solo tenía `--u:4px` y ninguna escala; un criterio de entrega puramente negativo —«nada de border-radius»— no garantiza que resulte bonito.)*

```css
--e1: calc(var(--u) * 1);   /*  4px  separación interna mínima     */
--e2: calc(var(--u) * 2);   /*  8px  entre elementos hermanos      */
--e3: calc(var(--u) * 4);   /* 16px  separación entre botones (mín)*/
--e4: calc(var(--u) * 8);   /* 32px  margen de panel               */
--e5: calc(var(--u) * 12);  /* 48px  separación entre bloques de UI*/
--e6: calc(var(--u) * 16);  /* 64px  margen de pantalla            */
```

Prohibido cualquier valor de `margin`, `padding` o `gap` fuera de esta escala. Verificado por inspección en F9.

### 4.4 Cero ficheros de imagen

- **Texturas:** 8 texturas de 16×16 generadas por `canvas` con **PRNG y semilla propia** (`js/02-texturas.js`), exportadas a variables CSS `--tex-*` como `data:` URI. Se ejecuta **una sola vez** al arrancar.
- **Sprites:** mapas de píxeles a cadena de `box-shadow` o a `canvas` (§14.4, `03-sprites.js`).
- **Sonidos:** 11 efectos sintetizados nota a nota con Web Audio (§14.4, `04-audio.js`).
- **Tipografía:** una única fuente pixel libre (SIL OFL) subseteada e incrustada en base64 (§10.2).

**No hay ni un `.png`, ni un `.jpg`, ni un `.woff2` suelto, ni una petición de red.**

---

## 5. Criaturas, mundos y biomas

### 5.1 Las 11 criaturas propias

| Nombre | Qué es | Papel en el juego | Reacción al acierto | Reacción al fallo |
|---|---|---|---|---|
| **Cubi** | El avatar minero del niño (16 variantes) | Protagonista | Levanta el pico y da un saltito | Se rasca el casco, mira el bloque |
| **Rocarr** | Bloque de piedra con ojos, lento y amable | **Da las pistas y las reparaciones** | Asiente despacio | Se acerca y enseña la tarjeta |
| **Chispa** | Chispa de cristal veloz | Celebra las rachas | Gira a toda velocidad | Se queda quieta, expectante |
| **Gluglú** | **Gota escalonada** de agua (nunca un cubo perfecto) | **Accidente del entorno** que moja la pregunta (§12.5) | — | «¡Gluglú te ha mojado la pregunta! Léela otra vez.» |
| **Brasita** | Brasa naranja | Jefe del mundo del Volcán | — | — |
| **Cristalina** | Geoda con caras | Jefa del mundo de la Cueva | — | — |
| **Blopi** | Bloque de musgo blando, mascota | Micro-descanso «dar de comer a Blopi» | Rebota | Se acurruca |
| **Tronquete** | Tronco con brazos | Jefe del mundo del Bosque | — | — |
| **Chispita** | Cría de Chispa | Cromo coleccionable | — | — |
| **Ranacubo** | Rana cúbica del río | Jefa del mundo del Río | — | — |
| **Vagoneto** | Vagoneta con ojos | Micro-descanso «montar en la vagoneta» | — | — |

**Gluglú y Rocarr tienen tratamiento visual y sonoro claramente distinto** (criterio de HECHO de F5): Rocarr es lento, marrón, con sonido grave de piedra; Gluglú es azul, rápido, con sonido de gota. Un niño debe poder decir qué hace cada uno sin haber leído nada (pregunta 2 y 3 del protocolo de §19.3).

### 5.2 Los 4 mundos de v1 y su tabla cerrada

*(Cierra el defecto: v1 declaraba 7 biomas en CSS, 4 mundos en las fases y 3 en el esquema del perfil, sin ninguna tabla que ligara mundo ↔ bioma ↔ niveles. `43-mapa-destrezas.js` necesita ese dato para pintar las 92 vetas agrupadas.)*

`CB.MUNDOS` vive en `js/17-catalogo.js` y es una **tabla cerrada**:

| id | Nombre | Bioma | Jefe | Niveles (24+24+22+22 = 92) |
|---|---|---|---|---|
| **M1** | La Pradera de los Números | `pradera` | Tronquete | N1-N8, S1-S7, R1-R5, P1-P2, E1-E2 |
| **M2** | El Bosque de las Llevadas | `bosque` | Ranacubo | N9-N13, S8-S13, R6-R10, P3-P8, E3-E4, V1-V2 |
| **M3** | El Río de los Problemas | `rio` | Cristalina | N14, S14, R11-R12, P9-P16, E5-E6, V3-V6 |
| **M4** | La Mina de las Veces | `mina` | Brasita | N15-N16, S15-S16, R13-R14, P17-P20, E7-E8, M1-M10, V7-V8 |

Los biomas `cueva`, `volcan` y `taller` quedan en `06-biomas.css` **dentro de un bloque comentado `/* v2 */`**: no se entrega CSS muerto activo.

`casos-curriculo.js` verifica que **la unión de `mundo.niveles` es exactamente los 92 ids, sin repetidos ni huérfanos**.

### 5.3 Progresión entre mundos

- M1 está abierto desde el primer minuto.
- Un mundo se desbloquea al **completar el 60 % de los niveles nucleares** del anterior (no el 100 %: bloquear por perfección es un muro).
- El jefe **no bloquea** el paso al mundo siguiente. Su función es cerrar el mundo con una victoria (§12.7).
- **M4 lleva el distintivo `INICIACIÓN` visible** con nota tocable que explica en lenguaje llano por qué la multiplicación es iniciación (§6.5).

---

## 6. Base normativa y alcance curricular real

### 6.1 Cómo se cita la norma en TODO el proyecto

**Primera mención en cada documento, obligatoriamente completa:**

> **Real Decreto 157/2022, de 1 de marzo, por el que se establecen la ordenación y las enseñanzas mínimas de la Educación Primaria (BOE núm. 52, de 2 de marzo de 2022; referencia BOE-A-2022-3296).**

**Advertencia normativa obligatoria, primera línea de `docs/mapa-curricular.md`:**

> **«El RD 157/2022 fija saberes básicos y criterios de evaluación POR CICLO (1.er ciclo = 1.º y 2.º juntos), no por curso ni por trimestre. La distribución por curso y por trimestre que aparece en esta tabla es una secuenciación PROPIA del proyecto, basada en la práctica de aula habitual; no procede del Real Decreto ni de ningún decreto autonómico. Debe confirmarse con la programación didáctica del centro.»**

En consecuencia, el campo del catálogo se llama **`trimestreSugerido`**, nunca `trimestre`.

### 6.2 `/datos/curriculo-rd157.js` — transcripción literal (verificada contra el BOE)

Fichero nuevo, **fuente única de verdad curricular**. Contiene, entre comillas y con su código oficial, el texto **literal** del RD. Transcripción verificada el 25/07/2026 contra el texto consolidado del BOE:

```js
CB.CURRICULO = {
  norma: 'Real Decreto 157/2022, de 1 de marzo (BOE núm. 52, de 2 de marzo de 2022)',
  ciclo: 'Primer ciclo de Educación Primaria',

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

  criterios: {   // PRIMER CICLO, texto literal
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

  saberes: {     // PRIMER CICLO, bloque A y bloque F. Texto literal.
    'A.1': 'Conteo. Estrategias variadas de conteo y recuento sistemático en situaciones de la vida cotidiana en cantidades hasta el 999.',
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

  // Saberes de SEGUNDO ciclo citados en el proyecto solo para justificar exclusiones o ampliaciones.
  segundoCicloReferencia: {
    'A.3.c-2c': 'Construcción de las tablas de multiplicar apoyándose en número de veces, suma repetida o disposición en cuadrículas.',
    'A.2.d-2c': 'Fracciones propias con denominador hasta 12 en contextos de la vida cotidiana.',
    'A.5-2c':   'Cálculo y estimación de cantidades y cambios (euros y céntimos de euro) en problemas de la vida cotidiana: ingresos, gastos y ahorro. Decisiones de compra responsable.'
  }
};
```

### 6.3 El test de cobertura, reescrito para que signifique algo

El plan v1 comprobaba que cada nivel «declarase ≥1 saber y ≥1 criterio», es decir, **que el campo no estuviera vacío**. Cualquier etiqueta inventada pasaba en verde. Era una comprobación de forma vendida como comprobación de rigor.

**`/pruebas/casos-curriculo.js` en v2 comprueba:**

| # | Comprobación | Criterio |
|---|---|---|
| CU1 | `nivel.curriculo.saber` es una **clave existente** en `CB.CURRICULO.saberes` | 92/92 |
| CU2 | `nivel.curriculo.criterios[]` son **claves existentes** en `CB.CURRICULO.criterios` | 92/92 |
| CU3 | **Compatibilidad tipo↔criterio**: todo nivel `PROBLEMA_*` declara ≥1 criterio de **CE1 o CE2**; ningún nivel declara la **CE7 o la CE8 como criterio único** (el juego no evalúa la CE7: ver §17.3) | 0 violaciones |
| CU4 | **Cobertura acotada**: todo saber de `CB.CURRICULO.saberes` con prefijo **`A.`** tiene ≥1 nivel asociado | 10/10 |
| CU5 | Ningún nivel con `ampliacion:true` es prerrequisito de un nivel nuclear | 0 |
| CU6 | Los 92 niveles apuntan a uno de los **13 slugs de destreza** declarados (§13.1) | 92/92 |
| CU7 | La unión de `CB.MUNDOS[*].niveles` es exactamente los 92 ids, sin repetidos ni huérfanos | exacto |
| CU8 | `CB.ERRORES` y `datos/recomendaciones.js` tienen **el mismo conjunto de claves** y toda entrada tiene frase llana y actividad no vacías | 24 = 24 |

**Ya no existe** el criterio «todo saber de 1.er ciclo tiene ≥1 nivel»: era imposible de cumplir sin amputar la lista de saberes, que es exactamente el fraude curricular que el test decía impedir.

### 6.4 Las cuatro citas sin fuente del plan v1: qué pasa con cada una

| Cita v1 | Estado tras verificación | Redacción definitiva |
|---|---|---|
| «los 48 términos del criterio 6.1» | **FALSA.** Verificado: el criterio 6.1 dice literalmente «Reconocer lenguaje matemático sencillo presente en la vida cotidiana, **adquiriendo vocabulario específico básico**». No enumera términos ni contiene lista alguna. | **«Diccionario de Bloques: 48 términos de un glosario PROPIO del proyecto, seleccionado para dar cobertura al criterio de evaluación 6.1 del RD 157/2022 (1.er ciclo). La cifra 48 y la selección son decisiones de este proyecto, no una enumeración oficial.»** La tabla de los 48 términos con su fuente va en `docs/mapa-curricular.md`. |
| «Citado literalmente en la concreción curricular canaria: “resta en modelos manipulativos: recta de cuentas, recta numérica, tabla del 100”» | **NO VERIFICABLE.** El decreto existe (**Decreto 211/2022, de 10 de noviembre, por el que se establece la ordenación y el currículo de la Educación Primaria en la Comunidad Autónoma de Canarias, BOC núm. 231, de 23 de noviembre de 2022**), pero **no he podido confirmar esa frase literal** en su anexo de Matemáticas. Se **retira la atribución**. | **«La tabla del 100 es un modelo manipulativo de uso extendido en el aula de primer ciclo para visualizar los patrones ±1 y ±10. Su inclusión es una decisión propia del proyecto. A confirmar con la programación didáctica del centro.»** |
| «el currículo LOMLOE de la Comunitat Valenciana lo incluye [la multiplicación] en primer ciclo» | **NO VERIFICADA la ubicación literal.** El decreto existe (**Decreto 106/2022, de 5 de agosto, del Consell, de ordenación y currículo de la etapa de Educación Primaria, DOGV**, modificado por el **Decreto 96/2026, de 19 de junio**), pero **no he podido confirmar** el saber básico literal que sitúe la multiplicación en primer ciclo, ni en qué redacción vigente. Se **retira la afirmación normativa**. | Ver §6.5, redacción definitiva. |
| «RD 157/2022» sin identificación completa | Corregido. | Ver §6.1. |

**Regla de proceso que evita que esto se repita:** *toda cita de un criterio o de un saber en cualquier documento del proyecto va entre comillas, con su código y su ciclo, y proviene de `/datos/curriculo-rd157.js`. Si no está ahí, no se cita.* Se aplica a los criterios 1.1, 1.2, 2.1, 2.2, 2.3, 4.2, 6.1, 6.2, 7.1, 7.2, 8.1 y 8.2, que el plan v1 parafraseaba.

**Comunidad autónoma de referencia (ausencia señalada):** el proyecto se entrega alineado con la norma **estatal** (RD 157/2022), que es la base común de toda la escuela pública española. La secuenciación por curso y trimestre es propia. `docs/mapa-curricular.md` incluye una sección **«Cómo adaptar la secuenciación a tu comunidad»** con la lista de decretos autonómicos identificados y la advertencia: *«el reparto por curso puede variar entre comunidades; confirma con la programación didáctica de tu centro.»*

### 6.5 La multiplicación: redacción definitiva y decisión de alcance

**Hecho verificado contra el BOE:** en el **primer ciclo**, el saber A.3.b se limita literalmente a *«Suma y resta de números naturales resueltas con flexibilidad y sentido»*. La construcción de las tablas de multiplicar aparece en el **segundo ciclo**: *«Construcción de las tablas de multiplicar apoyándose en número de veces, suma repetida o disposición en cuadrículas»*. La multiplicación es, por tanto, contenido de segundo ciclo en la norma estatal.

**Pero el requisito 1 del usuario es explícito y obligatorio: «repaso de tablas de multiplicar».** El plan v1 lo resolvía convirtiendo la multiplicación en un mundo de AMPLIACIÓN que «no bloquea el progreso», sin ser prerrequisito de nada: un niño podía terminar el juego sin repasar ni una tabla. Requisito incumplido de facto.

**Decisión cerrada — dos categorías separadas en el catálogo:**

| Categoría | Niveles | Estado |
|---|---|---|
| `INICIACION_2_CURSO` | **M1-M8**: concepto de multiplicación como suma reiterada y disposición rectangular, y **tablas del 2, del 5 y del 10** | **Recorrido NUCLEAR del tercer trimestre.** Entra en el guion por defecto. Aparece en el informe. `ampliacion:false` |
| `AMPLIACION` | **M9-M10**: tablas del 3 y del 4. Con `ajustes.tablas69` activo, M9 y M10 **extienden su conjunto de factores** a `{0..10}` | `ampliacion:true`, con distintivo visible, nunca prerrequisito |

**Aviso literal en README, Créditos, panel del adulto y nota tocable del mundo M4:**

> **«Las tablas del 2, del 5 y del 10 se practican como iniciación en el tercer trimestre, tal como es habitual en el aula de 2.º. El Real Decreto 157/2022 sitúa la construcción de las tablas de multiplicar en el segundo ciclo, por lo que el resto de tablas está desactivado salvo que la persona adulta lo active. La ubicación exacta en tu comunidad autónoma debe confirmarse con la programación didáctica del centro.»**

Toda multiplicación muestra **matriz de filas y columnas + suma reiterada antes que el resultado**, sin excepción (criterio de HECHO de F7).

### 6.6 Rango numérico por trimestre (ausencia señalada)

El plan v1 declaraba un único techo `[0,999]` para todo el curso, lo que permite servir números de tres cifras a un niño en septiembre. **Escalonado definitivo:**

| Trimestre sugerido | Techo de números visibles | Justificación |
|---|---|---|
| **T1** | **≤ 199** | Repaso de la decena y del valor posicional de 1.º; introducción de la centena al final |
| **T2** | **≤ 599** | Centena ya introducida |
| **T3** | **≤ 999** | Techo del saber A.1 y A.2.b del primer ciclo, literal |

**Calendario escolar por defecto** (usado para deducir el trimestre sin preguntarle nada al niño, §7):

| Periodo | Trimestre asumido |
|---|---|
| 8 sep – 22 dic | T1 |
| 8 ene – vacaciones de Semana Santa | T2 |
| tras Semana Santa – 22 jun | T3 |
| 23 jun – 7 sep | **Modo repaso de verano**: trimestre del curso anterior (T3), sin niveles nuevos |

*A confirmar con el calendario escolar de la comunidad; es ajustable desde el panel del adulto.*

### 6.7 Restas: techo real de 2.º

**Regla dura.** En 2.º se llega, como techo de final de curso, a la resta de tres cifras con **UNA** llevada. Las restas de tres cifras con **dos** llevadas y, sobre todo, con **cero intermedio en el minuendo** (504 − 267, que obliga a pedir prestado a través del cero) son contenido de 3.º en cualquier secuenciación española.

Servirlas en el flujo normal garantiza fallo, pérdida de luz y frustración, y **contamina el diagnóstico**: el niño no tiene el bug `E-R-INV`, es que se le está preguntando algo de otro curso.

```
Restas con ampliacion:false  →  como máximo UNA llevada, sea en 2 o en 3 cifras
                             →  PROHIBIDO el 0 en cualquier posición del minuendo
                                cuando esa columna exija préstamo
R14 (doble llevada y cero intermedio) → ampliacion:true + flagAdulto:'restasDobleLlevada'
                                        apagado por defecto
```

**Invariante 11** (§19.1): *ninguna resta con `ampliacion:false` tiene más de una llevada, ni un 0 en columna que requiera préstamo.*

Todos los ejemplos del documento y de los datos se corrigen a operaciones de 2.º: **`63 − 28 → 45`**, **`82 − 47 → 35`**, **`140 − 26 → 114`**.

### 6.8 Contenidos de 2.º: incluidos o declarados fuera de alcance

*(Ausencia señalada: el auditor listó nueve contenidos habituales de 2.º sobre los que había que decidir explícitamente.)*

| Contenido | Decisión | Dónde |
|---|---|---|
| Sumas de **tres sumandos** | **Incluido** | S10, S16 |
| **Aproximación a la decena** más próxima | **Incluido** | N13, N16 |
| Números **ordinales hasta el 20.º** | **Incluido** | N14, V5 |
| **Pares e impares** | **Incluido** | N6 |
| **Doble y mitad** (solo en palabras, nunca notación de fracción) | **Incluido** | M8, V7 |
| **Series** ascendentes y descendentes de 2 en 2, 5 en 5 y 10 en 10 | **Incluido** | N5, N11 |
| Comparación con **=** y **≠** | **Incluido**. *El saber D.3 de 1.er ciclo cita literalmente los signos `=` y `≠`; los signos `<` y `>` no aparecen en el texto del primer ciclo, aunque son de uso habitual en 2.º* | N4, N10, componente `balanza` |
| Comparación con **<** y **>** | **Incluido con nota**: se enseña dentro del componente `balanza`, que muestra a la vez el signo y la representación de la balanza. Declarado como **decisión propia, a confirmar con la programación del centro** | N4, N10 |
| Problemas de **dos operaciones** (final de 2.º) | **Fuera de alcance de v1**, declarado en README. Motivo: con ≤2 datos necesarios y el validador de lectura fácil, un problema de dos operaciones no cabe en 25 palabras sin subordinación | — |
| **Monedas de céntimo** | **Ampliación, apagada por defecto** (E8). **Verificado**: el saber A.5 de **primer** ciclo cita literalmente solo *«monedas (1, 2 euros) y billetes de euro (5, 10, 20, 50 y 100)»*; los céntimos aparecen en el saber de **segundo** ciclo. Se ofrecen como ampliación porque la práctica de aula de 2.º sí los introduce | E8, `flagAdulto:'centimos'` |

### 6.9 Dinero: conjuntos separados, conforme al texto literal

```js
// js/15-gen-dinero.js  — conforme al saber A.5 de primer ciclo, literal
CB.gen.dinero.MONEDAS  = [1, 2];                 // euros
CB.gen.dinero.BILLETES = [5, 10, 20, 50, 100];   // euros
CB.gen.dinero.CENTIMOS = [5, 10, 20, 50];        // AMPLIACIÓN, flagAdulto:'centimos'
```

- Monedas y billetes **se distinguen siempre** visual y verbalmente. No existe «billete de 1 €» ni «moneda de 5 €».
- El billete de **100 €** se conserva: está **en el texto literal** del saber A.5 de primer ciclo.
- Los céntimos, cuando el adulto los activa, se representan **siempre como número entero seguido de la palabra «céntimos»** (`50 céntimos`), **nunca** como `0,50 €`: el invariante 3 prohíbe los decimales.

### 6.10 Fracciones: prohibidas

**Invariante 3 definitivo:** *sin decimales, sin negativos y **sin notación de fracción** en ningún ítem.* Las nociones de **mitad**, **doble** y **cuarto** se expresan solo con palabras («la mitad de», «el doble de», «un cuarto de») y con reparto gráfico de bloques.

Verificado: las fracciones propias aparecen en el saber de **segundo** ciclo. Un niño de 2.º que ve «½ €» no lee «medio euro»: no lee nada.

### 6.11 La fase de comprobación: cierre de la CE2

*(Ausencia señalada: el criterio **2.3** de primer ciclo pide literalmente «Describir verbalmente la idoneidad de las soluciones de un problema a partir de las preguntas previamente planteadas», y el juego nunca pedía valorar si el resultado tenía sentido.)*

**Se añade un paso de comprobación de un solo toque** en los niveles de problemas del tercer trimestre (P9-P20):

```
Tras teclear la respuesta, antes de confirmar:
  «¿Puede quedarle MÁS de lo que tenía?»      [ Sí ]  [ No ]
  o «¿Tu respuesta es mayor o menor que 12?»   [ Mayor ] [ Menor ]
```

- Elegir mal la comprobación **no apaga luz** y **no cuenta como fallo del problema**: registra `faseFallada: 'comprobacion'` (campo que el modelo de datos ya preveía y que nadie escribía) y muestra a Rocarr diciendo *«Mira otra vez cuántos tenía al principio.»*
- El panel del adulto lo informa aparte: **«Resuelve bien pero no comprueba»** es un diagnóstico distinto de **«no resuelve»**.

---

## 7. Primeros 60 segundos: onboarding y calibración jugable

### 7.1 Se elimina la pantalla «¿Por dónde vas en clase?»

La primera pantalla que veía un niño de 7 años le pedía que declarase su trimestre. **Un niño de 2.º no sabe qué es un trimestre**, no sabe en cuál está y no puede leer la pregunta con fluidez el día 1. Era el punto exacto en el que el juego dejaba de ser autónomo y exigía un adulto al lado, contradiciendo el criterio de «se abre con doble clic».

**En la portada hay un único botón grande: `JUGAR`, de 200 × 96 px.** Junto a él, `CANTERA TRANQUILA` y, en una esquina discreta, la llave del panel del adulto.

### 7.2 Calibración jugable: 4 ítems, sin metatexto, con voz automática

La primera partida de la vida del niño empieza con cuatro ítems que **no parecen un test**:

| # | Ítem | Formato | Qué calibra |
|---|---|---|---|
| 1 | «Toca el número más grande» — **34 / 43** | opciones (2) | Valor posicional |
| 2 | **23 + 14** | teclado de bloques | Suma sin llevar |
| 3 | **47 − 12** | teclado de bloques | Resta sin llevar |
| 4 | **28 + 15** | teclado de bloques | Suma con llevada |

- Sin cronómetro. Sin luces. Sin puntuación. Con voz automática que lee la consigna.
- `CB.adaptativo` fija el `theta` inicial de cada destreza con estos 4 resultados.
- **`trimestreDeclarado` se DEDUCE**, nunca se pregunta: 0 aciertos → T1 (rango bajo); 1-2 → T1; 3 → T2; 4 → T3. Y se cruza con el calendario escolar de §6.6, tomando **el menor** de los dos.
- El selector de trimestre se traslada íntegro al panel del adulto (§17.8) como **«Ajustar punto de partida»**.

### 7.3 El primer ítem de la vida del niño

*(Ausencia señalada: había 17 pantallas, teclado de bloques, selector de datos de 3 toques, balanza y ordenación de filas, y **ningún tutorial**. Un niño de 7 años no lee instrucciones.)*

- El **primer ítem de la primera partida es siempre trivial**: **2 + 3**, con una **mano-cursor animada** que toca la respuesta correcta y luego se retira.
- **Cada componente nuevo se presenta la primera vez** (`perfil.componentesVistos[]`) con un ítem de **una sola acción y sin cronómetro**:

| Componente | Ítem de presentación |
|---|---|
| `tecladoBloques` | «Escribe el 7» |
| `opciones4` | «Toca el 5» |
| `selectorSigno` | «¿Aquí va más o menos? 4 __ 2 = 6» |
| `balanza` | «¿Cuál pesa más? 8 y 5» |
| `monedas` | «Toca la moneda de 2 euros» |
| `ordenarFila` | «Coloca en orden: 3, 1, 2» |
| `selectorDatos` | «Toca los dos números del cuento» (con los dos únicos números resaltados) |

### 7.4 Micro-descansos: cinco, distintos, de 20 segundos

*(Ausencia señalada: el plan tenía un motor psicométrico excelente y casi ningún momento de diversión especificado. Sin esto, el juego será justo, riguroso y aburrido.)*

Cada 6-8 ítems aparece **uno de los cinco**, en bolsa barajada para que no se repita:

1. **Romper bloques** — 8 bloques de piedra que estallan a toques, con partículas y sonido de picado.
2. **Dar de comer a Blopi** — arrastrar (o tocar) 3 setas hacia Blopi, que rebota y hace un ruidito.
3. **Colocar 3 bloques en la casa** — tres toques que añaden bloques al álbum/casa del niño.
4. **Encontrar la gema escondida** — tres cofres, uno tiene la gema; se ve la lista completa de premios antes de abrir (§21.4).
5. **Montar en la vagoneta** — Vagoneto cruza la pantalla y el niño toca para hacerle dar saltos.

Ninguno se puede fallar. Ninguno tiene puntuación. Todos se pueden saltar con un toque.

### 7.5 El bloque raro

Con probabilidad ≈ **1/20 ítems** (semilla reproducible, §20 mejora 11), el bloque que se rompe al acertar es un **bloque raro** brillante: da un **cromo garantizado** de la colección y una animación de 1,5 s. Es la sorpresa que hace que merezca la pena el ítem 47.

---

## 8. Anexo del catálogo: los 92 niveles

> **Este anexo es un contrato.** El plan v1 escribía «N1…N12, S1…S15, R1…R13» como rótulos vacíos: no se podía verificar ni un solo rango numérico, y el requisito 2 del usuario (basarse en el currículo oficial) era **no auditable**. Nada de la fase F2 se escribe antes de que esta tabla esté cerrada.

### 8.1 Valores base por familia

*(Ausencia señalada: `t_ideal`, `t_limite`, `betaBase` y `puntosBase` se citaban decenas de veces sin definirse ni una vez.)*

| Familia | `puntosBase` | `tIdeal` (ms) | `tLimite` (ms) | `betaBase` (rango) | Destreza (slug) |
|---|---|---|---|---|---|
| **N** numeración | 80 | 6.000 | 18.000 | 880 – 1.180 | `numeracion`, `valor_posicional` |
| **S** sumas | 100 | 8.000 | 24.000 | 940 – 1.260 | `suma_sin_llevar`, `suma_llevada` |
| **R** restas | 110 | 9.000 | 27.000 | 980 – 1.320 | `resta_sin_llevar`, `resta_llevada` |
| **M** multiplicación | 100 | 7.000 | 21.000 | 1.140 – 1.360 | `multiplicacion` |
| **P** problemas | 160 | 20.000 | 50.000 | 1.040 – 1.420 | `problemas_*` (4 slugs) |
| **E** dinero | 90 | 10.000 | 26.000 | 940 – 1.220 | `dinero` |
| **V** vocabulario | 70 | 7.000 | 20.000 | 880 – 1.100 | `vocabulario` |

Para los ítems `PROBLEMA_*`, `tIdeal` y `tLimite` se aplican **al tiempo posterior a la lectura** (§11.4).

**Guarda obligatoria:** `if (tLimite - tIdeal < 500) tLimite = tIdeal + 500;` — sin ella, la fórmula de §11 divide por cero.

### 8.2 `D` — dificultad interna del nivel

*(Ausencia señalada: `D` aparecía en el esquema, en `nivel.generar(rng, D)` y en `respuestas[].D`, y nunca se definía.)*

| `D` | Significado | Regla de cambio |
|---|---|---|
| **1** | Números pequeños del rango del nivel, sin llevada si el nivel la permite | Se **sube** tras **3 aciertos consecutivos a primer intento** en ese nivel |
| **2** | Estándar del nivel | — |
| **3** | Límite del rango del nivel | Se **baja** tras **2 fallos** en ese nivel |

`D` es **interno al nivel** y no cambia el rango declarado en la tabla de §8.3. Se persiste en `perfil.niveles[id].D`.

### 8.3 Los 92 niveles

Columnas: **id · nombre · rango numérico exacto · llevadas · `trimestreSugerido` · formato · saber (código de `CB.CURRICULO`) · criterios · ampliación**

#### Numeración — 16 niveles

| id | Nombre | Rango | Llev. | T | Formato | Saber | Criterios | Ampl. |
|---|---|---|---|---|---|---|---|---|
| N1 | Contar y recontar | 0-99 | — | 1 | opciones4 | A.1 | 1.1, 5.1 | no |
| N2 | Leer y escribir hasta 99 | 0-99 | — | 1 | teclado | A.2.b | 6.1 | no |
| N3 | Decenas y unidades | 0-99 | — | 1 | opciones4 | A.4.a | 1.2, 6.1 | no |
| N4 | Mayor, menor, igual | 0-99 | — | 1 | balanza | A.4.b | 5.1, 6.1 | no |
| N5 | Series de 2 en 2 y de 10 en 10 | 0-99 | — | 1 | ordenar | A.4.a | 3.1 | no |
| N6 | Pares e impares | 0-99 | — | 1 | opciones4 | A.4.b | 3.1 | no |
| N7 | La recta numérica | 0-199 | — | 1 | ordenar | A.2.b | 1.2 | no |
| N8 | Números hasta 199 | 0-199 | — | 1 | teclado | A.2.b | 6.1 | no |
| N9 | La centena: C, D y U | 0-599 | — | 2 | opciones4 | A.4.a | 1.2, 6.1 | no |
| N10 | Comparar y ordenar hasta 599 | 0-599 | — | 2 | balanza | A.4.b | 5.1 | no |
| N11 | Series de 5 en 5 y de 100 en 100 | 0-599 | — | 2 | ordenar | A.4.a | 3.1 | no |
| N12 | Descomponer C + D + U | 0-599 | — | 2 | teclado | A.2.b | 1.2, 6.2 | no |
| N13 | Aproximar a la decena | 0-599 | — | 2 | opciones4 | A.2.a | 2.1 | no |
| N14 | Ordinales hasta el 20.º | 1-20 | — | 2 | opciones4 | A.4.b | 6.1 | no |
| N15 | Números hasta 999 | 0-999 | — | 3 | teclado | A.2.b | 6.1 | no |
| N16 | Comparar y aproximar hasta 999 | 0-999 | — | 3 | balanza | A.4.b, A.2.a | 2.1, 5.1 | no |

#### Sumas — 16 niveles

| id | Nombre | Rango | Llev. | T | Formato | Saber | Criterios | Ampl. |
|---|---|---|---|---|---|---|---|---|
| S1 | Sumas hasta 10 | 0-10 | 0 | 1 | teclado | A.3.b | 2.1 | no |
| S2 | Sumas hasta 20 sin llevar | 0-20 | 0 | 1 | teclado | A.3.b | 2.1 | no |
| S3 | Dobles hasta 10 + 10 | 0-20 | 0 | 1 | opciones4 | A.3.a | 3.1 | no |
| S4 | Sumar 10 | 0-99 | 0 | 1 | teclado | A.3.a | 3.1 | no |
| S5 | DU + U sin llevar | 0-99 | 0 | 1 | teclado | A.3.b | 2.1 | no |
| S6 | DU + DU sin llevar | 0-99 | 0 | 1 | teclado | A.3.b | 2.1 | no |
| S7 | DU + U con llevada | 0-199 | 1 | 1 | teclado | A.3.b | 2.1, 6.2 | no |
| S8 | DU + DU con una llevada | 0-99 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | no |
| S9 | DU + DU con llevada hasta 199 | 0-199 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | no |
| S10 | Tres sumandos de una cifra | 0-27 | ≤1 | 2 | teclado | A.3.b | 2.1 | no |
| S11 | CDU + DU sin llevar | 0-599 | 0 | 2 | teclado | A.3.b | 2.1 | no |
| S12 | CDU + DU con una llevada | 0-599 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | no |
| S13 | Sumar decenas completas | 0-599 | 0 | 2 | opciones4 | A.3.a | 3.1 | no |
| S14 | CDU + CDU sin llevar | 0-999 | 0 | 3 | teclado | A.3.b | 2.1 | no |
| S15 | CDU + CDU con una llevada | 0-999 | 1 | 3 | teclado | A.3.b | 2.1, 6.2 | no |
| S16 | Tres sumandos con decenas | 0-999 | ≤1 | 3 | teclado | A.3.b | 2.1 | no |

#### Restas — 14 niveles

| id | Nombre | Rango | Llev. | T | Formato | Saber | Criterios | Ampl. |
|---|---|---|---|---|---|---|---|---|
| R1 | Restas hasta 10 | 0-10 | 0 | 1 | teclado | A.3.b | 2.1 | no |
| R2 | Restas hasta 20 sin llevar | 0-20 | 0 | 1 | teclado | A.3.b | 2.1 | no |
| R3 | Restar 10 | 0-99 | 0 | 1 | teclado | A.3.a | 3.1 | no |
| R4 | DU − U sin llevar | 0-99 | 0 | 1 | teclado | A.3.b | 2.1 | no |
| R5 | DU − DU sin llevar | 0-99 | 0 | 1 | teclado | A.3.b | 2.1 | no |
| R6 | Complementos a 10 y a 100 | 0-100 | 0 | 2 | teclado | A.4.c | 3.1, 5.1 | no |
| R7 | DU − U con una llevada | 0-99 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | no |
| R8 | DU − DU con una llevada | 0-99 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | no |
| R9 | Restar decenas completas | 0-599 | 0 | 2 | opciones4 | A.3.a | 3.1 | no |
| R10 | CDU − DU sin llevar | 0-599 | 0 | 2 | teclado | A.3.b | 2.1 | no |
| R11 | CDU − DU con una llevada | 0-599 | 1 | 3 | teclado | A.3.b | 2.1, 6.2 | no |
| R12 | CDU − CDU sin llevar | 0-999 | 0 | 3 | teclado | A.3.b | 2.1 | no |
| R13 | CDU − CDU con una llevada | 0-999 | 1 | 3 | teclado | A.3.b | 2.1, 6.2 | no |
| R14 | Restas con doble llevada | 0-999 | **2 y cero intermedio** | — | teclado | A.3.b | 2.1 | **SÍ** — `flagAdulto:'restasDobleLlevada'` |

#### Multiplicación — 10 niveles

| id | Nombre | Factores | T | Formato | Saber | Criterios | Categoría |
|---|---|---|---|---|---|---|---|
| M1 | Veces: la suma reiterada | 2-5 × 2-5 | 3 | opciones4 | A.3.b (+ ref. 2.º ciclo) | 1.2, 5.1 | `INICIACION_2_CURSO` |
| M2 | Filas y columnas | 2-5 × 2-5 | 3 | opciones4 | A.3.b | 1.2, 6.1 | `INICIACION_2_CURSO` |
| M3 | Del dibujo a «a × b» | 2-5 × 2-5 | 3 | teclado | A.3.b | 6.2 | `INICIACION_2_CURSO` |
| M4 | Tabla del 2 | 2 × 0-10 | 3 | teclado | A.3.a | 3.1 | `INICIACION_2_CURSO` |
| M5 | Tabla del 10 | 10 × 0-10 | 3 | teclado | A.3.a | 3.1 | `INICIACION_2_CURSO` |
| M6 | Tabla del 5 | 5 × 0-10 | 3 | teclado | A.3.a | 3.1 | `INICIACION_2_CURSO` |
| M7 | Mezcla del 2, 5 y 10 | {2,5,10} × 0-10 | 3 | teclado | A.3.a | 3.1, 5.1 | `INICIACION_2_CURSO` |
| M8 | Dobles y mitades | 2 × 0-10 | 3 | opciones4 | A.3.a | 3.1 | `INICIACION_2_CURSO` |
| M9 | Tabla del 3 | 3 × 0-10 (→ 0-10 × 0-10 con flag) | — | teclado | A.3.a | 3.1 | **AMPLIACIÓN** |
| M10 | Tabla del 4 | 4 × 0-10 (→ 0-10 × 0-10 con flag) | — | teclado | A.3.a | 3.1 | **AMPLIACIÓN** |

> **Invariante 4 definitivo.** Con `ajustes.tablas69 = false`, **AMBOS factores** de todo ítem de multiplicación pertenecen a **`{0,1,2,3,4,5,10}`**. Con el flag activo se admiten ambos factores en `{0..10}`. En ningún caso hay factores > 10.
> *Motivo:* la redacción v1 («factores ≤ 10; tablas 6-9 solo con flag») dejaba pasar `4 × 8` en el «nivel de la tabla del 4», y `4 × 8` **es** un hecho de la tabla del 8. Los 920.000 casos pasaban en verde mientras el juego preguntaba tablas del 6 al 9 con el flag apagado.

#### Problemas de enunciado — 20 niveles (uno por estructura semántica)

| id | Subtipo | Estructura | Peso | T | Formato | Saber | Criterios | Ampl. |
|---|---|---|---|---|---|---|---|---|
| P1 | `CAMBIO_1` | Cambio, incógnita en el resultado (aumento) | **3** | 1 | teclado | A.3.b, A.4.c | 1.1, 2.1, 2.2 | no |
| P2 | `CAMBIO_2` | Cambio, incógnita en el resultado (disminución) | **3** | 1 | teclado | A.3.b, A.4.c | 1.1, 2.1, 2.2 | no |
| P3 | `COMBINACION_1` | Combinación, incógnita en el todo | **3** | 1 | teclado | A.3.b | 1.1, 2.1, 2.2 | no |
| P4 | `COMBINACION_2` | Combinación, incógnita en una parte | **3** | 2 | teclado | A.3.b, A.4.c | 1.1, 2.1, 2.2 | no |
| P5 | `COMPARACION_1` | Comparación, diferencia desconocida (más que) | **3** | 2 | teclado | A.4.b | 1.1, 2.1, 2.2 | no |
| P6 | `COMPARACION_2` | Comparación, diferencia desconocida (menos que) | **3** | 2 | teclado | A.4.b | 1.1, 2.1, 2.2 | no |
| P7 | `CAMBIO_3` | Cambio, incógnita en el cambio (aumento) | **2** | 2 | teclado | A.4.c | 1.1, 2.1, 2.2 | no |
| P8 | `CAMBIO_4` | Cambio, incógnita en el cambio (disminución) | **2** | 2 | teclado | A.4.c | 1.1, 2.1, 2.2 | no |
| P9 | `COMPARACION_3` | Comparación, referido desconocido (más que) | **2** | 2 | teclado | A.4.b | 1.1, 2.1, 2.3 | no |
| P10 | `COMPARACION_4` | Comparación, referido desconocido (menos que) | **2** | 2 | teclado | A.4.b | 1.1, 2.1, 2.3 | no |
| P11 | `IGUALACION_1` | Igualación, cantidad a añadir al menor | **2** | 3 | teclado | A.4.b, A.4.c | 1.1, 2.1, 2.3 | no |
| P12 | `IGUALACION_2` | Igualación, cantidad a quitar al mayor | **2** | 3 | teclado | A.4.b, A.4.c | 1.1, 2.1, 2.3 | no |
| P13 | `CAMBIO_5` | Cambio, incógnita en el estado inicial (aumento) | **1** | 3 | teclado | A.4.c | 1.1, 2.1, 2.3 | **SÍ** |
| P14 | `CAMBIO_6` | Cambio, incógnita en el estado inicial (disminución) | **1** | 3 | teclado | A.4.c | 1.1, 2.1, 2.3 | **SÍ** |
| P15 | `COMPARACION_5` | Comparación, referente desconocido (más que) | **1** | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | **SÍ** |
| P16 | `COMPARACION_6` | Comparación, referente desconocido (menos que) | **1** | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | **SÍ** |
| P17 | `IGUALACION_3` | Igualación, referido desconocido (añadir) | **1** | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | **SÍ** |
| P18 | `IGUALACION_4` | Igualación, referido desconocido (quitar) | **1** | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | **SÍ** |
| P19 | `IGUALACION_5` | Igualación, referente desconocido (añadir) | **1** | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | **SÍ** |
| P20 | `IGUALACION_6` | Igualación, referente desconocido (quitar) | **1** | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | **SÍ** |

**Niveles con `datoSobrante:true`:** P3, P4, P7, P8 (solo en el 3.er trimestre y nunca en la primera partida del niño). Ver §9.4.

#### Dinero — 8 niveles

| id | Nombre | Rango | T | Formato | Saber | Criterios | Ampl. |
|---|---|---|---|---|---|---|---|
| E1 | Monedas y billetes: reconocerlos | — | 1 | opciones4 | A.5 | 5.2, 6.1 | no |
| E2 | Contar con monedas de 1 y 2 € | 0-20 € | 1 | monedas | A.5 | 2.1, 5.2 | no |
| E3 | Contar con billetes | 0-100 € | 2 | monedas | A.5 | 2.1, 5.2 | no |
| E4 | Equivalencias entre billetes | 0-100 € | 2 | opciones4 | A.5 | 3.1, 5.1 | no |
| E5 | Pagar con importe exacto | 0-50 € | 2 | monedas | A.5 | 2.1, 2.2 | no |
| E6 | El cambio | 0-20 € | 3 | teclado | A.5, A.4.c | 2.1, 2.2 | no |
| E7 | La compra: gasto total | 0-99 € | 3 | teclado | A.5, A.3.b | 2.1, 2.2 | no |
| E8 | Céntimos y equivalencias | 5-100 cént. | — | opciones4 | A.5 (+ ref. 2.º ciclo) | 5.2 | **SÍ** — `flagAdulto:'centimos'` |

#### Vocabulario matemático — 8 niveles (Diccionario de Bloques)

| id | Nombre | Términos | T | Formato | Saber | Criterios | Ampl. |
|---|---|---|---|---|---|---|---|
| V1 | Las palabras de la suma | sumando, suma, total, en total, juntar | 2 | opciones4 | A.3.b | 6.1 | no |
| V2 | Las palabras de la resta | minuendo, sustraendo, diferencia, quitar, quedar | 2 | opciones4 | A.3.b | 6.1 | **nota** |
| V3 | Unidades, decenas, centenas | cifra, unidad, decena, centena, valor | 3 | opciones4 | A.4.a | 6.1 | no |
| V4 | Comparar | mayor que, menor que, igual, anterior, siguiente | 3 | balanza | A.4.b | 6.1 | no |
| V5 | Orden y posición | primero, segundo… vigésimo, entre, delante de | 3 | ordenar | A.4.b | 6.1 | no |
| V6 | Las palabras del dinero | moneda, billete, euro, precio, cambio, pagar | 3 | opciones4 | A.5 | 6.1, 5.2 | no |
| V7 | Veces, doble y mitad | veces, doble, mitad, filas, columnas | 3 | opciones4 | A.3.a | 6.1 | no |
| V8 | Las palabras de los problemas | en total, le quedan, más que, menos que, tantos como | 3 | opciones4 | A.3.b | 6.1, 1.1 | no |

> **Nota sobre V2:** «minuendo» y «sustraendo» son terminología que el RD no sitúa explícitamente en primer ciclo. Se marcan en el Diccionario de Bloques con el distintivo **«palabra de mayores»** y no cuentan para ningún requisito de progresión. `docs/mapa-curricular.md` indica, para **cada uno de los 48 términos**, si figura en el texto del primer ciclo, si es de uso habitual en 2.º, o si es un añadido propio del proyecto.

**Justificación de la lista blanca de vocabulario de los enunciados** *(ausencia señalada)*: el validador de lectura fácil no puede certificar legibilidad contra una lista arbitraria. `docs/mapa-curricular.md` documenta el criterio de construcción de la lista blanca: **sustantivos concretos de los 60 objetos contables, los 40 nombres propios, los verbos de los campos `verbosGanar`/`verbosPerder`, los 48 términos del Diccionario y los conectores del español básico**, y declara la fuente de frecuencia léxica infantil empleada. **Si en el momento de la implementación no se dispone de un corpus de frecuencia infantil citable, la lista se declara literalmente como «lista blanca propia del proyecto, revisada por un maestro de primer ciclo», nunca como «validada por corpus».**

### 8.4 Reparto y su justificación

| Bloque | Niveles v1 (plan antiguo) | **Niveles v2** | Motivo del cambio |
|---|---|---|---|
| Numeración | 12 | **16** | Es el eje del sentido numérico de 2.º; recupera series, aproximación, ordinales y pares/impares |
| Sumas | 15 | **16** | Añade tres sumandos |
| Restas | 13 | **14** | Añade complementos; la doble llevada pasa a ampliación |
| **Multiplicación** | **18 (20 % del catálogo)** | **10** | Un producto alineado con 2.º **no puede dedicar más contenido a lo que es de 2.º ciclo que al núcleo de 2.º curso** |
| Problemas | 20 | **20** | — |
| Dinero | 6 | **8** | Añade cambio y compra; los céntimos como ampliación |
| Vocabulario | 8 | **8** | — |
| **Total** | 92 | **92** | — |

---

## 9. Problemas de enunciado: 20 estructuras y su ponderación

### 9.1 Por qué 20 y por qué importan

La clasificación de las estructuras semánticas aditivas (cambio, combinación, comparación e igualación) es el resultado mejor establecido de la investigación sobre resolución de problemas aritméticos en los primeros cursos. **Dos problemas con los mismos números y la misma operación tienen tasas de acierto radicalmente distintas según su estructura.** Un problema de cambio con incógnita en el resultado lo resuelve casi todo el mundo en 2.º; un problema de comparación con referente desconocido lo resuelve menos de un tercio.

**Esto es lo que hace útil el informe del maestro:** saber que un niño falla «las restas» no sirve de nada; saber que resuelve `CAMBIO_2` al 95 % y `COMPARACION_5` al 0 % es un dato accionable el lunes siguiente.

### 9.2 Ponderación por dificultad — corrige el reparto equitativo

El plan v1 repartía los 20 subtipos «de forma equitativa». Con eso, **la mitad de los problemas que ve el niño están por encima de su curso**, y su propio perfil de ejemplo lo delataba (`COMPARACION_5`: 0 de 1 en 61 s; `CAMBIO_5`: 0 de 2 en 58 s). Con 3 luces, eso es fin de partida.

| Categoría | Subtipos | Peso | Disponibilidad |
|---|---|---|---|
| **NUCLEAR** | `CAMBIO_1`, `CAMBIO_2`, `COMBINACION_1`, `COMBINACION_2`, `COMPARACION_1`, `COMPARACION_2` | **3** | Desde T1 |
| **INTERMEDIO** | `CAMBIO_3`, `CAMBIO_4`, `COMPARACION_3`, `COMPARACION_4`, `IGUALACION_1`, `IGUALACION_2` | **2** | Desde T2, **solo si el niño tiene ≥80 % en los nucleares** |
| **AMPLIACIÓN** | `CAMBIO_5`, `CAMBIO_6`, `COMPARACION_5`, `COMPARACION_6`, `IGUALACION_3`-`IGUALACION_6` | **1** | Solo en T3, `ampliacion:true`, **y nunca durante una partida con menos de 3 luces** |

**`CB.gen.problemas.siguienteSubtipo(perfil)` — deuda de cobertura PONDERADA:**

```
deuda(subtipo) = peso(subtipo) * (vecesEsperadas - vecesServidas)
se sirve el subtipo disponible con mayor deuda; empate → el de menor rtMedio
```

**Criterio de HECHO de F3 corregido:** ya no es «reparto equitativo de los 20 subtipos» sino **«reparto proporcional a los pesos declarados, verificado en 40 partidas simuladas (±10 %)»**.

### 9.3 Validador de lectura fácil — invariante 7 definitivo

El invariante v1 («≤2 frases») hacía **ingenerables las 12 plantillas de comparación e igualación**, que requieren canónicamente tres oraciones: dato, relación y pregunta. Afirmar que las 1.200 combinaciones pasaban al 100 % era imposible.

```
INVARIANTE 7 (definitivo)
  ≤ 3 frases, de las cuales la TERCERA es obligatoriamente la pregunta y tiene ≤ 7 palabras
  ≤ 12 palabras por frase
  ≤ 25 palabras en total
  ≤ 2 datos numéricos NECESARIOS  (+1 sobrante solo si datoSobrante:true, §9.4)
  ≤ 34 caracteres por línea, medidos con el MISMO algoritmo de corte que usa la interfaz
```

**Reglas adicionales del validador:**

1. **Comparación e igualación presentan el dato y la relación en frases SEPARADAS.** Queda **prohibida la subordinación** en el enunciado: ninguna aparición de `que` (como conjunción), `si`, `cuando`, `mientras`, `aunque`, `porque`. *(La subordinación es precisamente la estructura que peor comprende un lector de 7 años.)*
2. **Todo enunciado termina obligatoriamente en una frase interrogativa** abierta con `¿` y cerrada con `?`.
3. **Ortografía acentuada obligatoria.** Lista de formas que deben llevar tilde en su acepción usada: **más, número, cuántos, cuántas, cuánto, después, él, sí, qué, cuál, cómo**. La aparición de la forma sin tilde **hace fallar el test**. Mismo tratamiento para `¡` en las exclamaciones de los mensajes.
4. **Prohibida la repetición del mismo sujeto explícito en dos frases consecutivas.** Se usa elipsis, que es lo natural en español de España.
5. Todas las palabras del enunciado deben estar en la **lista blanca** (§8.3).

**Ejemplo canónico corregido** (el del plan v1 tenía tres defectos en una línea: «mas» sin tilde, sin pregunta y con el sujeto repetido):

> ❌ v1: `Ana tiene 12 cromos. Ana tiene 5 cromos mas que Leo.`
> ✅ v2: `Ana tiene 12 cromos. Tiene 5 más que Leo. ¿Cuántos cromos tiene Leo?`

**Coherencia con la interfaz:** el número de líneas que calcula el validador debe **coincidir exactamente** con el que devuelve `CB.ui.medirLineas()` para el mismo texto (test cruzado en `casos-problemas.js`). En CSS, `.enunciado { max-width: 34ch; }` — en `ch`, no en píxeles, para que siga cumpliéndose con «Fuente ampliada» y en modo proyección.

### 9.4 El dato sobrante: cómo se recupera un contenido real de 2.º

El invariante v1 («≤2 datos numéricos») dejaba **muerto** el código de error `E-P-TODOSDATOS`, sin sentido la recomendación al adulto («subrayad los datos que sí sirven») y **sin decisión** el `selectorDatos` de 3 toques: el niño tocaba los dos únicos números que había.

```
≤ 2 datos numéricos NECESARIOS
+ se permite 1 ÚNICO dato distractor adicional (3 números como máximo en el enunciado)
  exclusivamente en los niveles marcados datoSobrante:true  (P3, P4, P7, P8)
  que solo se sirven en el 3.er trimestre y NUNCA en la primera partida del niño
```

**Invariante 10:** *en niveles con `datoSobrante:true`, el dato sobrante nunca puede combinarse con un dato necesario para dar la respuesta correcta* (si `a+c` o `a−c` o `b+c` o `b−c` coincide con la respuesta, se regenera).

### 9.5 Los problemas se responden con TECLADO, no con 4 opciones

Con 2 datos y 4 opciones, un niño de 2.º acierta sin haber comprendido nada: prueba mentalmente sumar y restar los dos números y busca cuál de los dos resultados está en la lista. Eso **destruye la validez diagnóstica de la matriz de 20 subtipos**, que es la métrica estrella del informe, y contradice la CE2, que exige plantear y ejecutar, no reconocer.

| Regla | Detalle |
|---|---|
| Formato de primer intento | **Siempre `tecladoBloques`** en todos los `PROBLEMA_*` |
| Las 4 opciones | Solo como **escalón 3** de la escalera anti-frustración (tras dos fallos) |
| Registro | En ese caso el ítem se registra con `formato:'opciones'` y **NO computa en la matriz de subtipos** del informe |
| Test | *Ningún ítem `PROBLEMA_*` de primer intento tiene `formato:'opciones'`* |

### 9.6 El selector de datos de 3 toques

Para los problemas de T2 en adelante, la respuesta se construye en tres toques que hacen visible el razonamiento:

```
1) «Toca los números que necesitas»        → selecciona 2 de los 2 o 3 números del enunciado
2) «¿Qué hay que hacer?»                   → [+] o [−]   (selectorSigno)
3) «Escribe el resultado»                  → tecladoBloques
```

- Cada paso registra su acierto por separado en `respuestas[].faseFallada` (`'datos' | 'operacion' | 'calculo' | 'comprobacion'`). **Un niño que elige bien los datos y la operación pero se equivoca al calcular NO tiene un problema de comprensión lectora**, y el informe lo dice.
- El paso 1 se **omite** si el enunciado tiene exactamente 2 números y el nivel no es `datoSobrante:true` (no se hace perder el tiempo con una decisión que no existe).

### 9.7 Nombres, objetos y equilibrio de género — por construcción, no por azar

El criterio v1 («equilibrio de género 50/50 ±1 en 200 generaciones») es **matemáticamente imposible** con muestreo aleatorio: la desviación típica en 200 extracciones es ≈7 y la probabilidad de caer en 100±1 ronda el 12 %. El test habría fallado casi siempre contra código correcto y se habría acabado desactivando.

```js
// El género se ALTERNA por construcción, no se sortea.
CB.gen.problemas.bolsaGenero  = new CB.util.BolsaBarajada(['F','M']);        // persistida
CB.gen.problemas.bolsaNombreF = new CB.util.BolsaBarajada(NOMBRES_F);        // 20, persistida
CB.gen.problemas.bolsaNombreM = new CB.util.BolsaBarajada(NOMBRES_M);        // 20, persistida
CB.gen.problemas.bolsaRol     = new CB.util.BolsaBarajada(['gana','pierde']); // quién gana/pierde
```

**Criterio de test corregido:** *reparto por género 50/50 ±1 en 200 generaciones **con bolsa**; y 50 % ±4 puntos porcentuales en 5.000 generaciones.* El mismo mecanismo se aplica al reparto de **roles** (quién gana y quién pierde objetos), que en v1 no estaba controlado en absoluto: siempre ganaba el mismo género por puro azar acumulado.

Ventaja adicional: el equilibrio se garantiza **dentro de cada partida**, que es lo que ve el niño, no solo en el agregado estadístico que no ve nadie.

**Encaje curricular correcto** *(el plan v1 colgaba esto del bloque F sin más)*: el saber **F.2.c** de primer ciclo dice literalmente *«Contribución de las matemáticas a los distintos ámbitos del conocimiento humano desde una perspectiva de género»* y el saber **F.2.a** habla de *«Identificación y rechazo de actitudes discriminatorias ante las diferencias individuales»*. El equilibrio de nombres y roles se apoya en **esos dos saberes citados literalmente**, más en los elementos transversales de la LOMLOE y los principios pedagógicos del RD. Ver §16.7.

### 9.8 `validar()` no lanza excepciones

Una excepción lanzada desde el generador dentro de `CB.partida.servirItem()` deja al niño con la pantalla congelada a mitad de partida y sin guardar. Usar excepciones como valor de retorno en el camino caliente del bucle de juego es un fallo de diseño.

```js
CB.gen.problemas.validar(item) -> {ok: boolean, motivos: ['frases', 'tilde', 'ancho', ...]}
```

- `generar()` reintenta hasta **20 veces** con el `rng`.
- Si ninguno valida, devuelve un ítem de **`PROBLEMAS_SEGUROS`**: 12 enunciados fijos ya validados a mano, uno por estructura frecuente.
- Solo `pruebas.html` convierte `ok:false` en fallo rojo.
- Además, F0 entrega un **`window.onerror` y un `unhandledrejection` globales** que guardan el perfil, muestran la pantalla `p-error` con el texto *«Se ha soltado un bloque, volvemos al mapa»* y navegan a `mapa`.

---

## 10. Sistema visual: paleta, tipografía, contraste, retícula y bocetos

### 10.1 Paleta: 13 materiales × 3 tonos, y los DOS grupos separados

`css/01-variables.css` declara **39 colores** en dos grupos que **nunca se mezclan**:

| Grupo | Prefijo | Uso |
|---|---|---|
| **Fondos de texto** | `--bg-texto-*` | Solo colores planos. **Todo texto vive aquí.** |
| **Decoración** | `--deco-*`, `--tex-*` | Bloques, biomas, texturas. **Nunca lleva texto encima.** |

**Regla dura (cierra una ausencia de accesibilidad):** *ningún texto se dibuja jamás sobre una textura.* El contraste de un texto sobre ruido pseudoaleatorio de 16×16 **no es un par de colores** y no se puede verificar. Todo texto va dentro de un `.panel-bloque` de color plano `--bg-texto-*`. `casos-contraste.js` comprueba que **ninguna clase que contenga texto hereda una variable `--tex-*`**.

Materiales: piedra, tierra, hierba, madera, arena, agua, hielo, carbón, cobre, cristal, musgo, brasa, oro. Fondo de texto **crema `#FFF6E5`, nunca blanco puro**.

### 10.2 Tipografía y tamaños mínimos

*(Ausencia señalada: el plan v1 fijaba `line-height`, `letter-spacing`, `word-spacing` y ancho de línea, y **en ningún punto un tamaño mínimo de fuente**, que es la variable que más pesa para un lector de 7-8 años.)*

```css
/* 01-variables.css */
--tam-enunciado:     28px;   /* enunciados de problema, pila del sistema */
--tam-texto-min:     20px;   /* suelo absoluto de todo texto legible por el niño */
--tam-numero-opcion: 44px;   /* dígitos de opciones y teclado, en pixel */
--tam-titulo:        40px;
```

| Regla | Valor |
|---|---|
| Suelo de tamaño | **Ningún texto legible por el niño por debajo de `--tam-texto-min` (20px).** El panel del adulto queda excluido |
| Enunciados de problema | **Pila del sistema (Verdana)**, nunca fuente pixel. **Fuente pixel prohibida en bloques de más de 6 palabras** |
| Dígitos en pixel | Solo **a partir de 44 px**, porque las fuentes pixel confunden 6/8/9 y 1/7 a tamaño pequeño, y los números son el contenido crítico |
| Interlineado | `line-height: 1.6`, `letter-spacing: .05em`, `word-spacing: .16em` |
| Alineación | A la izquierda, **sin justificar**, sin cursiva, sin mayúsculas sostenidas |
| Ancho | `max-width: 34ch` |

**Prueba manual obligatoria (§19.2):** una lámina con los dígitos 0-9 y las parejas **6/8, 9/8, 1/7, 3/8** a los tres tamaños, revisada a 50 cm de distancia.

**Cobertura de glifos — criterio de HECHO de F4:** `pruebas/casos-fuente.js` mide con `canvas.measureText` cada carácter de la cadena **`ÁÉÍÓÚÜÑáéíóúüñ¿¡«»€0123456789`** y **falla si alguno mide igual que `.notdef`**. El nombre del juego lleva tilde y todo el módulo de dinero lleva `€`: si falta un glifo, el niño ve un cuadrado vacío el primer día. Cascada declarada: Silkscreen → Press Start 2P → si ninguna cubre, la tipografía pixel se limita a cifras y signos y los títulos van en la pila del sistema.

### 10.3 Contraste: verificado por un test propio

El plan v1 decía que el contraste estaba «auditado por `casos-marca.js`». Un fichero de auditoría de **marca** no puede auditar **contraste**: son cosas sin relación y no tiene acceso a los valores calculados de las variables CSS.

**`pruebas/casos-contraste.js`** (fichero nuevo):

```js
CB.pruebas.PARES = [
  ['--bg-texto-panel',  '--texto-principal', 4.5],
  ['--bg-texto-panel',  '--texto-secundario',4.5],
  ['--btn-fondo',       '--btn-texto',       4.5],
  ['--btn-fondo-hundido','--btn-texto',      4.5],
  ['--foco-oro',        '--bg-texto-panel',  3.0],
  ['--bg-texto-crema',  '--texto-principal', 4.5],
  ['--alto-contraste-bg','--alto-contraste-texto', 7.0],
  /* … el resto de pares realmente usados, uno por uno … */
];
```

Lee `getComputedStyle(document.documentElement)`, calcula la luminancia relativa y el ratio WCAG de cada par y **falla en rojo** si alguno queda por debajo. El contraste es una obligación legal (EN 301 549) para material escolar: no puede depender de una afirmación sin respaldo.

Objetivos: **≥ 4,5:1** texto normal, **≥ 3:1** texto grande (≥24 px) y componentes de interfaz.

### 10.4 Nunca solo color

El resultado se codifica **siempre con cuatro canales a la vez**: **color + forma + movimiento + texto**. Acierto = verde + bloque que estalla + partículas + mensaje. Fallo = gris + bloque que se agrieta + parpadeo + mensaje. Con el sonido silenciado y en blanco y negro, toda la información sigue llegando (criterio de HECHO de F8).

### 10.5 Retícula de respuestas y degradación responsive

*(Cierra el defecto: la rejilla 2×2 de 96×96 con gap 16 ocupa 208×208 px; en un móvil de 320×568 la mitad inferior son 284 px y no quedan 76 px para HUD + altavoz. En apaisado 568×320 es imposible. No había ninguna regla de degradación.)*

```css
.rejilla-respuestas{ --lado:96px; display:grid; grid-template-columns:repeat(2,var(--lado));
                     gap:var(--e3); justify-content:center; }

@media (max-height:600px) and (orientation:portrait){
  .rejilla-respuestas{ --lado:80px; }
}
@media (orientation:landscape) and (max-height:420px){
  .rejilla-respuestas{ grid-template-columns:repeat(4,1fr); --lado:72px; }
  .enunciado{ max-height:5.5em; overflow:auto; }
}
```

**El mínimo absoluto de 64×64 px nunca se cruza.** Por debajo de 320×420 px de viewport se muestra **«Gira el dispositivo»** en lugar de seguir encogiendo.

### 10.6 Bocetos de las tres pantallas críticas

*(Ausencia señalada: lo único verificable en el plan v1 sobre estética eran **prohibiciones**. Un criterio de entrega puramente negativo no garantiza que resulte bonito.)*

**PORTADA**

```
╔══════════════════════════════════════════════════════╗
║  ░░░ cielo en bandas duras, 3 nubes cúbicas ░░░      ║
║                                                      ║
║          ▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▜                ║
║          ▌  C U B O M Á T I C A     ▐  ← pixel 40px  ║
║          ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟                ║
║       «las Matemáticas son muy divertidas»  ← 20px   ║
║                                                      ║
║            ┏━━━━━━━━━━━━━━━━━━┓                      ║
║            ┃     J U G A R    ┃  200×96, bisel 4px   ║
║            ┗━━━━━━━━━━━━━━━━━━┛                      ║
║            ┌──────────────────┐                      ║
║            │ CANTERA TRANQUILA│  200×72               ║
║            └──────────────────┘                      ║
║  🧍Cubi                              [🔑 adulto] 48px║
║ ▓▓▓▓▓▓▓▓▓ suelo de hierba texturizado ▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════╝
```

**PARTIDA (vertical)**

```
╔══════════════════════════════════════════════════════╗
║ ◼◼◼                                      ◈ 58        ║  HUD 64px
╟──────────────────────────────────────────────────────╢
║        ░ bioma: pradera, cielo por --avance ░        ║
║   ▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▜        ║
║   ▌  Ana tiene 12 cromos.                  ▐        ║  panel plano
║   ▌  Tiene 5 más que Leo.                  ▐        ║  Verdana 28px
║   ▌  ¿Cuántos cromos tiene Leo?            ▐        ║  max-width 34ch
║   ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟        ║
║                    🧍Cubi   🪨Rocarr                 ║
╟──────────────────────── mitad inferior ──────────────╢
║              ┌───────┐  ← resultado (44px pixel)     ║
║              │   7   │                               ║
║              └───────┘                               ║
║        ┏━━━┓ ┏━━━┓ ┏━━━┓   96×96, gap 16            ║
║        ┃ 1 ┃ ┃ 2 ┃ ┃ 3 ┃                            ║
║        ┗━━━┛ ┗━━━┛ ┗━━━┛                            ║
║        ┏━━━┓ ┏━━━┓ ┏━━━┓                            ║
║        ┃ 4 ┃ ┃ 5 ┃ ┃ 6 ┃                            ║
║        ┗━━━┛ ┗━━━┛ ┗━━━┛                            ║
║        ┏━━━┓ ┏━━━┓ ┏━━━┓                            ║
║        ┃ 7 ┃ ┃ 8 ┃ ┃ 9 ┃                            ║
║        ┗━━━┛ ┗━━━┛ ┗━━━┛                            ║
║        ┏━━━┓ ┏━━━┓ ┏━━━━━━┓                         ║
║        ┃ ⌫ ┃ ┃ 0 ┃ ┃  OK  ┃                         ║
║        ┗━━━┛ ┗━━━┛ ┗━━━━━━┛                         ║
╟──────────────────────────────────────────────────────╢
║ [🔊][💡]                        [⏸][🔈][◀ Salir]     ║  64px
╚══════════════════════════════════════════════════════╝
```

**FIN DE LA EXPEDICIÓN**

```
╔══════════════════════════════════════════════════════╗
║        Se ha apagado la luz del casco.               ║
║             ¡Mañana la cargamos!                     ║
║                                                      ║
║   ▛ LO QUE HAS DOMINADO HOY ▜                        ║
║   ▌ ◆ Sumas llevando  →  afianzada                   ║
║   ▌ ◆ Restar 10       →  dominada                    ║
║   ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟                        ║
║                                                      ║
║        ◈ 58 gemas   (+12 de bono final)              ║
║                                                      ║
║        ¿Cómo te has sentido hoy?                     ║
║          ( ☺ )   ( · )   ( ☹ )                      ║
║   Esto lo guarda el juego para elegir tus retos      ║
║   de mañana. Nadie te pone nota.                     ║
║                                                      ║
║   ┏━━━━━━━━━━━━━━━━━┓   ┏━━━━━━━━━━━━┓              ║
║   ┃ OTRA EXPEDICIÓN ┃   ┃   SALIR    ┃              ║
║   ┗━━━━━━━━━━━━━━━━━┛   ┗━━━━━━━━━━━━┛              ║
╚══════════════════════════════════════════════════════╝
```

### 10.7 El cielo día→noche: base garantizada + mejora progresiva

Interpolar colores con una custom property sin registrar **no funciona**: sin `@property` con `syntax:'<number>'` no hay interpolación animable, y `color-mix` exige Chrome 111+ / Safari 16.2+, por encima del suelo declarado en §2.3. El efecto visual estrella del juego podía no verse en el dispositivo objetivo.

```css
/* CAPA 1 — base garantizada en TODO navegador del suelo */
.cielo--0{background:#8FD3F4} .cielo--1{background:#7FC2E8} .cielo--2{background:#6BA6D6}
.cielo--3{background:#4F7BA8} .cielo--4{background:#2E4A72} .cielo--5{background:#1A2A48}
/* JS aplica la clase según Math.floor(avance*6) */

/* CAPA 2 — mejora progresiva */
@supports (color: color-mix(in srgb, red, blue)){
  @property --avance{ syntax:'<number>'; inherits:true; initial-value:0; }
  .cielo{ background: color-mix(in srgb,
            var(--cielo-noche) calc(var(--avance)*100%), var(--cielo-dia)); }
}
```

### 10.8 Sprites: recuento real y umbral de rendimiento

El plan v1 declaraba «14 mapas cacheados» mientras el propio §21.1 enumeraba 11 criaturas + 16 avatares + corazón + pico. El número no cuadraba.

**Recuento definitivo: 24 entradas de caché.**

- **11 mapas de criatura** (Cubi, Rocarr, Chispa, Gluglú, Brasita, Cristalina, Blopi, Tronquete, Chispita, Ranacubo, Vagoneto).
- **6 iconos de HUD** (luz de casco encendida, luz apagada, gema, pista, altavoz, pausa).
- **5 bloques** (piedra, tierra, hierba, cristal, musgo).
- **2 mapas base de avatar**, de los que se generan los **16 avatares por permutación de paleta**.

**Umbral de rasterización corregido:** `box-shadow` solo para sprites **estáticos de ≤ 64 píxeles encendidos**. Todo sprite **animado o de > 64 píxeles** se rasteriza a `canvas` y se usa como `background-image` con `data:` URI cacheado. *(El umbral v1 de «>400 sombras» permitía animar elementos con 400 `box-shadow` a 60 fps en un Chromebook de 2019: repintados de decenas de milisegundos.)*

Medición real con el perfilador **antes** de dar F4 por hecha.

---

## 11. Motor de puntuación: fórmula cerrada y 30 casos exactos

> El plan v1 **no contenía la fórmula**. Solo doce resultados huérfanos («175, 158, 456, 72, 109, −49, −27, −69, −36, −50, 0, 165») que ningún desarrollador puede reproducir ni testar. La fase F1 era inimplementable y `casos-formulas.js` no se podía escribir. Esto lo cierra.

### 11.1 Pseudocódigo cerrado

```js
// js/20-puntuacion.js  — FUNCIÓN PURA, cero DOM, cero Math.random
CB.puntuacion.calcular = function (item, rtMs, estado) {
  var Pb = item.puntosBase;                 // entero 60..200, de la tabla §8.1
  var tI = item.tIdeal, tL = item.tLimite;
  if (tL - tI < 500) tL = tI + 500;         // guarda de división por cero

  var mT;
  if (estado.modoTiempo === 'sinPrisa') {
    mT = 0.85;                              // NEUTRO: ni premia ni castiga (§11.3)
  } else {
    mT = CB.util.clamp(1.4 - 0.8 * (rtMs - tI) / (tL - tI), 0.6, 1.4);
  }

  var puntos = 0, gemas = 0;
  if (estado.azar) {                        // requisito 7
    puntos = 0; gemas = 0;
  } else if (estado.correcto) {
    var fIntento = (estado.intento === 1) ? 1.0 : 0.4;   // §11.5
    puntos = Math.round(Pb * mT * fIntento);
    gemas  = Math.max(1, Math.round(puntos / 50));
  }                                          // fallo → 0 puntos, 0 gemas. NUNCA negativo.

  if (!Number.isFinite(puntos)) puntos = 0;
  if (!Number.isFinite(gemas))  gemas  = 0;

  return { puntos: puntos, gemas: gemas, mTiempo: mT,
           desglose: { Pb: Pb, mT: mT, fIntento: fIntento, azar: !!estado.azar } };
};
```

**Acumulación en la partida — el marcador NUNCA baja:**

```js
estado.puntos = Math.max(estado.puntos, estado.puntos + delta);   // delta ≥ 0 siempre
perfil.puntosTotales += Math.max(0, puntosSesion);
```

### 11.2 Cero números negativos, cero NaN

**Los cinco casos negativos del plan v1 (−49, −27, −69, −36, −50) se reescriben a 0.** Un niño de 7 años no ha visto un entero negativo en su vida: los negativos están en segundo/tercer ciclo. Mostrarle un símbolo matemático desconocido **en el instante del castigo** es simultáneamente incoherencia curricular y detonante directo de ansiedad matemática: el marcador se convierte en una deuda.

**Invariante de puntuación:** *ningún valor de `puntos` ni de `gemas` mostrado al niño es < 0, en ninguna pantalla, en ningún momento.*

**Guardas contra no finitos** (tres caminos producían `NaN`, que `JSON.stringify` convierte en `null` y a partir de ahí toda la aritmética del perfil da `NaN` para siempre):

| Camino | Guarda |
|---|---|
| `bonoFinal()` con 0 preguntas (el niño pulsa Salir en el primer ítem) | `if (preguntas === 0) return {factor:1, extras:[], total:0};` |
| `rtMedioMs` de un subtipo con `intentos:0` | media incremental `medio = (medio*n + rt)/(n+1)`, con `n===0 ⇒ medio = rt` |
| Cualquier otro | **Guarda universal en `CB.almacen.escribir`**: recorre el objeto y `if (typeof v === 'number' && !Number.isFinite(v)) v = 0;`, con contador de incidencias visible en el panel del adulto |

### 11.3 Los tres modos de tiempo y el antifarmeo

| Modo | Qué cambia | `M_tiempo` |
|---|---|---|
| **Normal** | `d` base del nivel | 0,6 – 1,4 según `rt` |
| **Con calma** (**por defecto permanente**) | `d × 2` **solo para cuándo se agota el tiempo** | 0,6 – 1,4 según `rt`, **calculado siempre con la `d` BASE** |
| **Sin prisa** | Sin temporizador | **0,85 constante** |

**Dos reglas antifarmeo, necesarias porque en v1 el modo accesible era el que MÁS puntuaba:**

1. **`M_tiempo` se calcula SIEMPRE con la `d` base del nivel**, sea cual sea el modo. El modo solo cambia **cuándo se agota el tiempo**, no **cómo se puntúa**. Sin esto, «Con calma» con la `d` duplicada regalaba multiplicadores altos por respuestas lentas.
2. **`M_tiempo("sinPrisa") = 0,85`**, punto medio del rango 0,6-1,4: ni premia ni castiga. WCAG 2.2.1 (Timing Adjustable, nivel A) exige que el tiempo **no impida completar la tarea**, no que puntúe igual. Ningún logro de aprendizaje queda bloqueado.
3. **`mejorPuntuacion` se guarda desglosada por modo**: `{normal:0, conCalma:0, sinPrisa:0}`, y los logros de puntuación solo se evalúan contra el récord **del mismo modo**.

**«Con calma» es el modo por defecto PERMANENTE.** El plan v1 lo desactivaba solo en la 4.ª sesión: un día el juego cambiaba de reglas y el niño empezaba a fallar más sin saber por qué — atribución errónea garantizada («ayer me salía, hoy soy peor»), que es el mecanismo por el que se instala la indefensión aprendida. El cambio a «Normal» solo ocurre **por acción explícita**: o el adulto lo cambia, o el niño lo elige tras un ofrecimiento **único e ignorable** que aparece si su `rt` mediana es < 50 % de `t_limite` durante 3 sesiones: *«Vas muy suelto. ¿Quieres el reloj normal? Puedes volver cuando quieras.»*

Los tres modos son cambiables **también desde la pausa, en mitad de la partida**.

### 11.4 Los problemas: el cronómetro NO cronometra la lectura

En los ítems `PROBLEMA_*`, arrancar el cronómetro al mostrar el enunciado **puntúa la velocidad lectora, no la competencia matemática**. Un niño con dislexia, con retraso lector o con lectura silabeante obtiene `M_tiempo` bajo aunque razone perfectamente. Es discriminatorio, invalida la métrica «tiempo medio por tema» del informe y choca con el bloque F y con el principio de atención a las diferencias individuales.

```
En todo ítem PROBLEMA_*:
  el cronómetro de puntuación arranca en el PRIMER TOQUE del selectorDatos
  (o al pulsar el botón «Ya lo he leído», visible y obligatorio si no hay selectorDatos)

  t_lectura = palabras × 1,5 s + 3 s      → tiempo NO puntuable, no computa en rt
  t_limite_efectivo usa coeficiente 1,5 s/palabra (v1 usaba 1,1: no daba margen
  ni para una sola pasada de decodificación, menos aún para releer)

  El cronómetro tampoco corre durante la lectura guiada (§16.4) ni durante la pausa.
```

**Test obligatorio en la suite:** *ningún ítem `PROBLEMA_*` puede recibir `M_tiempo < 1,0` por tiempo transcurrido antes del primer toque.*

**Ajuste del adulto asociado** *(ausencia señalada)*: **«No puntuar la velocidad en problemas»**, activable **por alumno concreto** desde §17.8. Con él, todos los `PROBLEMA_*` de ese perfil usan `M_tiempo = 0,85` fijo.

### 11.5 El segundo intento: aprendizaje, no castigo

*(Ausencia señalada: nada verificaba que la penalización por fallo más la pérdida de luz no fueran doble castigo del mismo error, algo que choca frontalmente con el criterio 7.2, «valorando el error como una oportunidad de aprendizaje».)*

> **Tras la tarjeta de reparación, el acierto en segundo intento vale el 40 % de `P_base × M_tiempo` y se registra como APRENDIZAJE, no como fallo.**

- Cuenta para `aciertos` y para la destreza (con menos peso en el Elo).
- No cuenta para `aciertosPrimerIntento` ni para el semáforo.
- El mensaje que recibe el niño es de la categoría **«superación»**, no de consuelo.

### 11.6 `bonoFinal()`

```js
CB.puntuacion.bonoFinal = function (precision1er, sinDanio, maraton, preguntas, puntosSesion) {
  if (preguntas === 0) return {factor: 1, extras: [], total: 0};
  var factor = 1.0, extras = [];
  if (precision1er >= 0.90)      { factor += 0.20; extras.push('precision90'); }
  else if (precision1er >= 0.75) { factor += 0.10; extras.push('precision75'); }
  if (sinDanio)                  { factor += 0.15; extras.push('sinDanio'); }   // 3 luces intactas
  if (maraton)                   { factor += 0.10; extras.push('maraton'); }    // ≥15 ítems
  return {factor: factor, extras: extras,
          total: Math.max(0, Math.round(puntosSesion * (factor - 1)))};
};
```

### 11.7 Los 30 casos exactos — `pruebas/casos-formulas.js`

**Sin tolerancia. Todos los valores calculados con la fórmula de §11.1 y verificados.**

| # | Nivel | P_base | rt (ms) | t_ideal | t_limite | modo | intento | correcto | azar | **M_tiempo** | **puntos** | **gemas** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| C01 | S9 | 100 | 8000 | 8000 | 24000 | normal | 1 | sí | no | **1,40** | **140** | **3** |
| C02 | S9 | 100 | 4000 | 8000 | 24000 | normal | 1 | sí | no | **1,40** | **140** | **3** |
| C03 | S9 | 100 | **600** | 8000 | 24000 | normal | 1 | sí | no | **1,40** | **140** | **3** |
| C04 | S9 | 100 | 12000 | 8000 | 24000 | normal | 1 | sí | no | **1,20** | **120** | **2** |
| C05 | S9 | 100 | 16000 | 8000 | 24000 | normal | 1 | sí | no | **1,00** | **100** | **2** |
| C06 | S9 | 100 | 24000 | 8000 | 24000 | normal | 1 | sí | no | **0,60** | **60** | **1** |
| C07 | S9 | 100 | 35000 | 8000 | 24000 | normal | 1 | sí | no | **0,60** | **60** | **1** |
| C08 | S9 | 100 | 12000 | 8000 | 24000 | normal | **2** | sí | no | **1,20** | **48** | **1** |
| C09 | S9 | 100 | 12000 | 8000 | 24000 | normal | 1 | **no** | no | **1,20** | **0** | **0** |
| C10 | S9 | 100 | 900 | 8000 | 24000 | normal | 1 | no | **sí** | **1,40** | **0** | **0** |
| C11 | S9 | 100 | 12000 | 8000 | 24000 | conCalma | 1 | sí | no | **1,20** | **120** | **2** |
| C12 | S9 | 100 | 12000 | 8000 | 24000 | **sinPrisa** | 1 | sí | no | **0,85** | **85** | **2** |
| C13 | S9 | 100 | 4000 | 8000 | 24000 | sinPrisa | 1 | sí | no | **0,85** | **85** | **2** |
| C14 | S9 | 100 | 30000 | 8000 | 24000 | sinPrisa | 1 | sí | no | **0,85** | **85** | **2** |
| C15 | N3 | 80 | 6000 | 6000 | 18000 | normal | 1 | sí | no | **1,40** | **112** | **2** |
| C16 | N3 | 80 | 12000 | 6000 | 18000 | normal | 1 | sí | no | **1,00** | **80** | **2** |
| C17 | N3 | 80 | 18000 | 6000 | 18000 | normal | 1 | sí | no | **0,60** | **48** | **1** |
| C18 | R8 | 110 | 9000 | 9000 | 27000 | normal | 1 | sí | no | **1,40** | **154** | **3** |
| C19 | R8 | 110 | 18000 | 9000 | 27000 | normal | 1 | sí | no | **1,00** | **110** | **2** |
| C20 | R8 | 110 | 27000 | 9000 | 27000 | normal | 1 | sí | no | **0,60** | **66** | **1** |
| C21 | R8 | 110 | 18000 | 9000 | 27000 | normal | **2** | sí | no | **1,00** | **44** | **1** |
| C22 | M4 | 100 | 7000 | 7000 | 21000 | normal | 1 | sí | no | **1,40** | **140** | **3** |
| C23 | M4 | 100 | 14000 | 7000 | 21000 | normal | 1 | sí | no | **1,00** | **100** | **2** |
| C24 | M4 | 100 | 21000 | 7000 | 21000 | normal | 1 | sí | no | **0,60** | **60** | **1** |
| C25 | P3 | 160 | 20000 | 20000 | 50000 | normal | 1 | sí | no | **1,40** | **224** | **4** |
| C26 | P3 | 160 | 35000 | 20000 | 50000 | normal | 1 | sí | no | **1,00** | **160** | **3** |
| C27 | P3 | 160 | 50000 | 20000 | 50000 | normal | 1 | sí | no | **0,60** | **96** | **2** |
| C28 | P3 | 160 | 35000 | 20000 | 50000 | normal | **2** | sí | no | **1,00** | **64** | **1** |
| C29 | E4 | 90 | 10000 | 10000 | 26000 | normal | 1 | sí | no | **1,40** | **126** | **3** |
| C30 | V1 | 70 | 7000 | 7000 | 20000 | normal | 1 | sí | no | **1,40** | **98** | **2** |

**Aserciones adicionales de `casos-formulas.js`:**

| # | Aserción | Por qué |
|---|---|---|
| A1 | Tras **3 fallos consecutivos**, `estado.puntos` es **idéntico** al de antes de los 3 fallos, nunca menor | Regla de una sola consecuencia |
| A2 | `C03` (acierto legítimo en 600 ms) da 140 puntos **y `azar === false`** | Invariante blindado del requisito 7 |
| A3 | `C12` (85) **<** `C01` (140) **y** `C12` (85) **>** `C06` (60) | Sin prisa no es el modo que más puntúa ni el que menos |
| A4 | `bonoFinal(*, *, *, 0, 0)` devuelve `{factor:1, extras:[], total:0}` sin `NaN` | Salir en el primer ítem |
| A5 | Los 6 casos de penalización (C09, C10 y 4 variantes de modo) devuelven exactamente **0**, jamás negativo | §11.2 |
| A6 | `bonoFinal(0.92, true, true, 15, 1500)` → `factor 1,45`, `total 675` | Bono final |

---

## 12. Luces (vidas), anti-azar y escalera anti-frustración

### 12.1 La regla de las luces, en una sola redacción

> El plan v1 tenía la mecánica central del requisito 9 escrita de **dos formas contradictorias** (§16.2: «nunca se pierde vida por agotar el tiempo»; F5: «el timeout **inicial** nunca quita vida», que implica que los siguientes sí). Y con la lectura permisiva, un niño que dejase correr el tiempo en todos los ítems **no perdía nunca una luz y la partida no terminaba jamás**: el sistema de 3 vidas quedaba anulado por una estrategia trivial.

**Redacción única y definitiva** (va literal a `docs/decisiones.md`):

```
1. El tiempo agotado NUNCA apaga una luz, en ninguna circunstancia
   (§16.2 y WCAG 2.2.1 Timing Adjustable, nivel A). Ni el primero, ni ninguno.

2. La detección de azar NUNCA apaga una luz.

3. Se apaga una luz ÚNICAMENTE al fallar el SEGUNDO intento de un ítem,
   después de haber visto la tarjeta de reparación.

4. SALVAGUARDA ANTI-BLOQUEO (cierra el agujero de v1):
   · 3 tiempos agotados CONSECUTIVOS  ⇒ el juego cambia automáticamente a
     modo «Sin prisa» y muestra «Vamos con más calma».
   · 6 tiempos agotados EN LA PARTIDA ⇒ fin amable de la expedición con el
     progreso guardado íntegro y motivoFin:'pausa'.

5. Tope de luces en partida: 5.   Luces iniciales: 3.
6. El exceso sobre el tope NO se convierte en gemas: se guarda en
   perfil.vidasReserva (máximo 2). Ver §12.6.
7. Al apagarse la 3.ª luz: pantalla «Fin de la expedición» (§3.7) conservando
   el 100 % de las gemas ganadas y TODO el progreso de destrezas.
   NUNCA se pierde lo aprendido.
```

### 12.2 API de `CB.vidas`

```js
CB.vidas.estado()            -> {luces:3, tope:5, reserva:1}
CB.vidas.fallo(itemId)       -> {luces, intento, abreReparacion:boolean}
CB.vidas.timeout(itemId)     -> {luces: SIN CAMBIO, consecutivos:n, cambiaModo:boolean}
CB.vidas.azar(itemId)        -> {luces: SIN CAMBIO, efectos:['sinBono','confirmacion','bloqueo1200']}
CB.vidas.conceder(motivo)    -> {aplicada:boolean, guardada:boolean, reserva:number}
CB.vidas.tope()              -> 5
```

### 12.3 Requisito 7: qué penaliza exactamente el azar

*(Ausencia señalada: el plan v1 definía cómo **detectar** el azar y decía que no restaba vida, pero **en ningún sitio** decía qué penalización aplicaba.)*

```
azar detectado ⇒  puntos = 0
                  gemas  = 0
                  rompe la racha
                  NO cuenta para logros
                  no se otorga bono de rapidez en ese ítem
                  en los 3 ítems siguientes: segundo toque de confirmación
                  en los 3 ítems siguientes: bloqueo de habilitación a 1200 ms
                  a la 3.ª detección de la sesión: se fuerza un micro-descanso
                  NUNCA apaga una luz, NUNCA resta puntos ya ganados,
                  NUNCA bloquea contenido
```

### 12.4 Detección de azar: fórmula cerrada y sin acusación

**El problema de la fórmula v1:** el umbral era `0,15 × mediana personal` (con mediana 9.100 ms → 1.365 ms) mientras F1 declaraba invariante blindado que «ningún acierto rápido se marca como azar» y F5 exigía premiar un acierto en 600 ms. La fórmula y el invariante se contradecían. Y con destrezas nuevas, `rtMuestras` vacío → mediana 0 → umbral 0: el detector quedaba desactivado sin decirlo.

```js
// js/21-antiazar.js — FUNCIÓN PURA
CB.antiazar.T_MIN = 700;   // ms

CB.antiazar.evaluar = function (item, rtMs, correcto, historial, perfil) {
  if (correcto) return {azar: false, senales: []};   // ← INVARIANTE POR CONSTRUCCIÓN
  var senales = [];
  var mediana = CB.antiazar.medianaPersonal(item.destreza, perfil);
  var umbral  = Math.max(CB.antiazar.T_MIN, 0.15 * mediana);
  if (rtMs < umbral)                        senales.push('S1');
  if (CB.antiazar.mismaPosicion3(historial)) senales.push('S2');
  if (CB.antiazar.tresFallosRapidos(historial)) senales.push('S3');
  if (!CB.antiazar.respuestaPosible(item))  senales.push('S4');
  return {azar: senales.length >= 2, senales: senales};
};

CB.antiazar.medianaPersonal = function (destreza, perfil) {
  var d = perfil.destrezas[destreza];
  return (d && d.rtMuestras && d.rtMuestras.length >= 5)
       ? CB.util.mediana(d.rtMuestras)
       : CB.catalogo.tIdealDe(destreza);      // respaldo declarado, nunca 0
};
```

| Señal | Definición |
|---|---|
| **S1** | `rt < max(700 ms, 0,15 × mediana personal de la destreza)` |
| **S2** | Misma posición de botón pulsada 3 veces seguidas |
| **S3** | 3 fallos en menos de 2 s cada uno |
| **S4** | Respuesta imposible (fuera de `[0, 999]`, o negativa) |

**El invariante «acierto rápido nunca es azar» queda garantizado por construcción, no por calibración**: es la primera línea de la función.

**Gluglú no es un juez, es un accidente del entorno.** El plan v1 atribuía **intención** («está adivinando») a un niño de 7 años a partir de un umbral estadístico, y materializaba la acusación en una criatura; su propio protocolo de observación lo reconocía («se enfada, se siente acusado»). Además confundía adivinar con **impulsividad**, que es la firma conductual normal de un niño de esa edad y la firma clínica del TDAH.

```
✅ Texto permitido:  «¡Gluglú te ha mojado la pregunta! Léela otra vez.»
❌ Prohibido en toda la interfaz del niño:
   «adivinar», «al azar», «trampas», «en serio», «de verdad», «concéntrate»
```

`azar:true` se registra **solo en `respuestas[]`** para la métrica 8 del panel del adulto. **Nunca aparece en la interfaz del niño.**

### 12.5 La escalera anti-frustración: 5 escalones

`CB.escalera.siguienteEscalon(fallosConcepto)`:

| Escalón | Disparador | Acción |
|---|---|---|
| **1** | 1.er fallo del ítem | **Pista de Rocarr.** No apaga luz. No rompe racha. |
| **2** | 2.º fallo del ítem | **Tarjeta de reparación** (§12.6) → se apaga una luz al confirmar |
| **3** | 2.º fallo del **mismo concepto** en la partida | El siguiente ítem del concepto baja a `D=1` **y se sirve en formato `opciones4`** (en problemas, con la marca que lo excluye de la matriz, §9.5) |
| **4** | 3.er fallo del mismo concepto | Se sirve un **prerrequisito ya dominado** del concepto, para reconstruir desde abajo |
| **5** | **4.º fallo del mismo concepto** | **`enPausa`** (ausencia señalada: v1 no decía qué pasaba en el 5.º fallo, y ese niño —posible discalculia, o simplemente mal día— es el que más importa) |

**Escalón 5 en detalle:**

- El concepto **se retira del guion de la sesión sin decirle nada al niño** y se sustituye por un concepto ya dominado.
- Se marca `perfil.niveles[id].enPausa = true`.
- **No se vuelve a proponer hasta la siguiente sesión.**
- Se anota en el panel del adulto: **«Conviene trabajarlo con material manipulativo antes de volver a la pantalla»**, con la actividad de 10 minutos correspondiente al código de error diagnosticado.

### 12.6 La tarjeta de reparación: puerta de INTERACCIÓN, no temporizador

El plan v1 habilitaba el botón «¡Lo pillo!» **a los 2,0 s**. Dos segundos no bastan ni para leer el título: un niño de 2.º lee ≈1 palabra por segundo y una explicación de columnas C-D-U tiene 15-25 palabras. **El propio protocolo de observación de v1 lo reconocía como señal de alarma** («pulsa a los 2,0 s exactos sin mirar») y mantenía el valor. La única intervención reparadora del juego era saltable con un toque, y se habría saltado siempre.

```
El botón «¡Lo pillo!» aparece DESHABILITADO.
Se habilita cuando el niño ha tocado los 3 pasos de la explicación EN ORDEN.
  Ejemplo (explicador columnasCDU, 63 − 28):
    toque 1 → se ilumina la columna de las unidades:  «3 es menos que 8»
    toque 2 → se deshace un manojo de 10:             «pido prestada una decena»
    toque 3 → se decrementa la decena y se resta:     «me quedan 5 decenas»

Suelo temporal adicional: Math.max(4000, palabras * 900) ms
Salvavidas: si a los 25 s no ha tocado nada, la tarjeta se autocompleta con voz
            y el botón se habilita. NUNCA se deja al niño atrapado.
Se registra reparacionCompletada: true|false en respuestas[] → métrica del panel.
```

**Los 6 explicadores** (`js/26-reparacion.js`): `columnasCDU`, `rectaNumerica`, `matrizFilasColumnas`, `barrasComparativas`, `monedas`, `tabla100`.

### 12.7 Luces extra: los 3 logros que las conceden

*(Ausencia señalada en dos auditorías: `CB.vidas.conceder()` existía, `retoBonus` existía, «los 8 logros de v1» existían, y **ningún logro estaba declarado como concesor de vida**. El requisito 10 quedaba sobre el papel.)*

| Logro | Condición | Alcanzable en una sola partida |
|---|---|---|
| **«Vuelta al pozo»** | 3 aciertos seguidos a primer intento **después de** haber apagado una luz | **Sí** |
| **«Veta restaurada»** | Recuperar una destreza en estado `oxidada` (§13.4) | **Sí**, si hay una oxidada |
| **«Reto bonus superado»** | Acertar el `retoBonus` declarado del nivel (un ítem marcado, de dificultad `D=3`) | **Sí** |

**Reglas antifarmeo:**

- **Máximo 2 luces concedidas por partida.**
- «Vuelta al pozo» solo se puede cobrar **una vez por partida**.
- «Veta restaurada» solo cuenta si han pasado **≥ 48 h** desde el último repaso de esa veta.
- Los tres logros están **desactivados en modo Cantera Tranquila** (allí no hay luces).

**Celebración obligatoria de 1,5 s**: la luz se enciende con brillo creciente, tres notas ascendentes propias (Do5-Mi5-Sol5), y el texto **«¡Luz extra!»**.

**Si las luces están al tope (5):** `conceder()` incrementa `perfil.vidasReserva` (máximo 2) y muestra **«Guardas 1 luz para la próxima expedición»**. Al iniciar la siguiente partida se aplica automáticamente con aviso visible.

**Se elimina `gemasSustitutas` de la API.** Prometer una vida y entregar otra cosa es una promesa incumplida, y un niño de 7 años lo detecta al instante; erosiona la confianza en el sistema de logros, que es justo lo que sostiene el requisito 10.

### 12.8 Los 10 logros de v1 (de una lista declarada de 24)

`CB.logros.LISTA` tiene **24 entradas**, cada una con un campo **`version: 1 | 2`**. **Exactamente 10 tienen `version:1`** y son las únicas evaluadas en v1. `casos-motor.js` lo comprueba.

| # | Logro | Condición | ¿Da luz? |
|---|---|---|---|
| 1 | **Vuelta al pozo** | 3 aciertos seguidos tras apagar una luz | **SÍ** |
| 2 | **Veta restaurada** | Recuperar una destreza `oxidada` | **SÍ** |
| 3 | **Reto bonus superado** | Acertar el `retoBonus` de un nivel | **SÍ** |
| 4 | **Vena de cristal** | 10 aciertos seguidos a primer intento | no |
| 5 | **Primer pico** | Completar la primera expedición | no |
| 6 | **Cantero** | Completar los niveles nucleares de un mundo | no |
| 7 | **Guardián del bloque** | Superar un jefe | no |
| 8 | **Coleccionista** | Reunir 5 cromos | no |
| 9 | **Palabra de piedra** | Añadir 10 términos al Diccionario de Bloques | no |
| 10 | **Vuelvo mañana** | Jugar 2 días distintos separados ≥ 24 h | no |

Los 14 restantes (v2) están nombrados en `docs/decisiones.md` como reserva declarada: *Mina profunda, Reloj de piedra, Sin una grieta, Explorador, Arquitecto, Cambista, Lector de rocas, Nueve vetas, Pico de oro, Repaso de verano, Constructor, Amigo de Blopi, Vagoneta veloz, Maestro cantero.*

**Reglas antifarmeo generales:** ningún logro se puede obtener dos veces; los de racha exigen aciertos **a primer intento**; los de puntuación se evalúan contra el récord **del mismo modo de tiempo** (§11.3); ninguno se evalúa en Cantera Tranquila salvo los de colección.

### 12.9 Los jefes: cierran el mundo con una victoria

El plan v1 daba al jefe «armadura de 10 bloques y daño 1-3», es decir, capacidad de quitar vidas **en el momento de máxima fatiga y máxima expectativa**. Un niño que recorre un mundo entero y muere en el jefe pierde la recompensa de cierre: es el punto de abandono clásico.

```
Durante el combate de jefe:
  CB.vidas.fallo() devuelve {luces: SIN CAMBIO} si estado.modo === 'jefe'
  El fallo solo REPARA 1 bloque de la armadura → el combate se alarga, nunca se pierde
  Tope de 20 turnos: pasado ese punto el jefe cede igualmente, con recompensa menor
  Vocabulario: «bloques que caen», NUNCA «daño». Sin vocabulario de combate.
```

**Cada jefe usa una mecánica propia, no una lista de preguntas más difíciles** (criterio de HECHO de F6):

| Jefe | Mundo | Mecánica |
|---|---|---|
| **Tronquete** | M1 Pradera | Cada acierto tala una rama: hay que elegir **qué rama** (qué operación) atacar |
| **Ranacubo** | M2 Bosque | Salta entre nenúfares numerados: hay que **anticipar dónde caerá** (series) |
| **Cristalina** | M3 Río | Refleja el enunciado: hay que **elegir los datos correctos** antes de operar |
| **Brasita** | M4 Mina | Va apagando bloques: hay que **restaurar** el que falta (multiplicación como matriz) |

---

## 13. Motor adaptativo, memoria, grafo de destrezas y repaso

### 13.1 Dos taxonomías separadas: destrezas y niveles

El plan v1 indexaba `perfil.destrezas` **por id de nivel** (`S9`, `P12`) mientras la API hablaba de «Elo por destreza» y `respuestas[]` llevaba un campo aparte `destreza:"suma_llevada"`. Con 92 niveles y partidas de 15 ítems, la mayoría de los niveles tendrían `n < 5`: **un Elo con 5 observaciones y K=32 es ruido puro**, y `elegirBeta` seleccionaría niveles al azar durante las primeras 10 sesiones.

**Se separan los dos objetos:**

```
perfil.destrezas  →  indexado por los 13 SLUGS   →  theta, n, rtMediana, ventana10,
                                                     estabilidadDias, estado, caja
perfil.niveles    →  indexado por los 92 IDS     →  n, aciertos, caja, D, ultimoISO,
                                                     enPausa
```

**Los 13 slugs de destreza (lista cerrada):**

`numeracion` · `valor_posicional` · `suma_sin_llevar` · `suma_llevada` · `resta_sin_llevar` · `resta_llevada` · `multiplicacion` · `problemas_cambio` · `problemas_combinacion` · `problemas_comparacion` · `problemas_igualacion` · `dinero` · `vocabulario`

`nivel.destreza` es **obligatorio** en el catálogo y `casos-curriculo.js` verifica que los 92 niveles apuntan a uno de estos 13 (comprobación CU6).

- **El Elo vive en la destreza** (13 objetos con muchas observaciones cada uno): converge rápido y tiene sentido estadístico.
- **El Mapa de Destrezas y el semáforo se pintan desde `perfil.niveles`** (92 objetos con estado grueso): es información, no medida.

### 13.2 Elo por destreza

```js
CB.adaptativo.theta(destreza, perfil)          -> 400..1800  (inicial 1000)
CB.adaptativo.actualizar(destreza, acierto, beta, perfil) -> thetaNuevo
CB.adaptativo.elegirBeta(destreza, perfil)     -> [betaMin, betaMax]
```

```
K = 40 si n < 10;  24 si n < 30;  16 si n >= 30      (K decreciente: menos ruido)
esperado = 1 / (1 + 10^((beta - theta)/400))
theta' = clamp(theta + K * (acierto - esperado), 400, 1800)
El acierto en SEGUNDO intento cuenta con peso 0,4 (§11.5).

elegirBeta:  banda objetivo = [theta - 60, theta + 120]
             → probabilidad de acierto esperada ≈ 0,80-0,88 (zona de desarrollo próximo)
```

**Regla simple de respaldo** (activable por el adulto desde §17.8, «conmutar a la regla simple sin Elo»): *3 aciertos seguidos → sube de nivel; 2 fallos → baja*. Se usa para depuración y para centros que prefieran un comportamiento predecible.

### 13.3 `candidatos()` nunca devuelve vacío

El plan v1 no definía qué devolvía `CB.catalogo.candidatos()` cuando no había ningún nivel desbloqueado en la banda β —caso frecuente al principio, con θ=1000 y casi todo el grafo bloqueado. Si devolvía `[]`, `construirGuion` generaba un guion vacío y **la partida terminaba en el ítem 0**, que es exactamente lo que F1 dice que no puede pasar.

```
1) filtrar niveles desbloqueados de la destreza dentro de [βmin, βmax]
2) si vacío → ensanchar la banda ±150, hasta 3 veces
3) si sigue vacío → devolver el nivel desbloqueado de esa destreza con β más cercana a θ
4) si la destreza no tiene NINGÚN nivel desbloqueado → devolver el nivel frontera de
   CB.grafo.frontera(perfil) más cercano
5) SOLO puede devolver [] si el perfil no tiene ningún nivel desbloqueado, situación
   imposible: el catálogo declara ≥1 nivel con prerrequisitos:[] por destreza
   (verificado en casos-curriculo.js)
```

### 13.4 Memoria: los 6 estados y la curva de olvido

```js
CB.memoria.recuperabilidad(estado, hoyISO) -> 0..1
CB.memoria.actualizarEstabilidad(estado, acierto) -> estabilidadDias'
CB.memoria.clasificar(estado) -> 'bloqueado'|'nuevo'|'aprendiendo'|'afianzada'|'dominada'|'oxidada'
CB.memoria.vencidosHoy(perfil, hoyISO) -> [destrezaId] ordenados por R ascendente
```

```js
// Blindaje obligatorio contra fechas imposibles y relojes mal puestos
CB.memoria.recuperabilidad = function (estado, hoyISO) {
  var d = Math.max(0, CB.util.diasEntre(estado.ultimoRepasoISO, hoyISO));
  if (!isFinite(d)) d = 0;
  var S = Math.max(1, estado.estabilidadDias || 1);
  return Math.pow(2, -d / S);            // R = 2^(-d/S)
};
```

| Estado | Definición | Aspecto en el Mapa |
|---|---|---|
| `bloqueado` | Prerrequisitos no cumplidos | Veta gris con candado |
| `nuevo` | `n === 0` | Veta apagada |
| `aprendiendo` | `n ≥ 1` y precisión a 1.er intento < 75 % | Veta con brillo tenue |
| `afianzada` | precisión 1.er intento ≥ 75 % | Veta brillante |
| `dominada` | Ver §17.2 métrica 5 (criterio endurecido) | Veta con cristal y destello |
| **`oxidada`** | Era `afianzada` o `dominada` y `R < 0,6` | **Veta cubierta de musgo** |

**La razón para volver mañana es honesta:** una veta se ha apagado y repasarla cuesta 2 minutos. Sustituye a la racha que se pierde, que es un patrón oscuro prohibido por el Children's Code (§21.4).

### 13.5 Repaso Leitner y reinserción intra-partida

```js
CB.leitner: 3 cajas.  caja 1 → repaso hoy;  caja 2 → +3 días;  caja 3 → +10 días
Acierto  → sube de caja.   Fallo → vuelve a la caja 1.
Reinserción intra-partida: un ítem fallado vuelve a aparecer entre 3 y 5 ítems después,
con OTROS números del mismo tipo (nunca el mismo ítem literal: sería memorizar, no aprender).
Los ítems reinsertados llevan item.repaso = true.
```

### 13.6 Grafo de destrezas (DAG de 92 nodos)

```js
CB.grafo.estado(nivelId, perfil)   -> 'bloqueado' | 'abierta'
CB.grafo.desbloqueados(perfil)     -> [nivelId]
CB.grafo.frontera(perfil)          -> [nivelId]   // abiertos y no empezados
CB.grafo.rutaHasta(nivelId, perfil)-> [nivelId]   // camino de prerrequisitos
```

**Verificado por `casos-motor.js`:** el grafo es **acíclico**, **todo nodo es alcanzable** desde el conjunto de niveles con `prerrequisitos: []`, y **ninguna destreza `ampliacion:true` es prerrequisito de una nuclear** (CU5).

### 13.7 Repetición de ítems dentro de la partida

Nada impedía en v1 que `nivel.generar(rng, D)` produjese el mismo ítem dos o tres veces en la misma partida, y varios niveles tienen un espacio muestral diminuto (tabla del 2 con factores ≤10 = 11 ítems; sumas hasta 10 = 36 pares; V1-V8 = 48 términos repartidos). Además, esa repetición era indistinguible de un fallo del generador.

```
CB.partida mantiene un Set de itemId servidos en la sesión.
servirItem reintenta hasta 12 veces; si el nivel está agotado, cambia al siguiente
nivel candidato.
nivel.cardinalidad (nº de ítems distintos posibles) es OBLIGATORIO en el catálogo.
Invariante 12: en 200 generaciones consecutivas con semillas distintas, los ítems
únicos son ≥ min(200, 0,8 × cardinalidad).
Los ítems reinsertados por Leitner (item.repaso = true) NO cuentan para ese invariante.
```

### 13.8 Distractores: algoritmo cerrado y sin bucles sin cota

El plan v1 construía los distractores simulando códigos de error, y muchas simulaciones **colisionan con la respuesta correcta**: `E-S-LLEV-OLV` sobre 20+30 devuelve 50 (correcto); `E-R-INV` sobre 68−24 devuelve 44 (correcto); `E-M-SUMA` sobre 2×2 devuelve 4 (correcto). El plan no definía qué pasaba entonces: el niño podía ver dos opciones correctas, o el bucle de relleno podía no terminar.

```
CB.distractores.para(item, rng):
 1) generar candidatos aplicando cada código de error aplicable al ítem
 2) DESCARTAR los que cumplan  d === respuesta || d < 0 || d ya presente
 3) si quedan < 3, rellenar con respuesta ± k, con k ∈ [1,2,10,20,100] barajado,
    descartando negativos, colisiones y valores > límite del invariante 1
 4) el paso 3 tiene un máximo de 40 intentos; si aun así no hay 4 opciones únicas,
    el nivel se marca formato:'teclado' PARA ESE ÍTEM
 5) NUNCA hay un bucle while sin cota
 6) contrabalanceo de posición: la correcta se reparte uniformemente entre las 4
    posiciones a lo largo de la partida (bolsa barajada de posiciones)
```

**Invariante 5-ter:** *ningún distractor es igual a la respuesta correcta*, comprobado en los 92.000 ítems.

### 13.9 Los 24 códigos de error

`CB.ERRORES` tiene **24 códigos**, cada uno con `simular / pista / reparacion / actividadAula / diagnostico`. **18 tienen `simular()`**; los 6 restantes pertenecen a bloques (vocabulario, estimación, ordenar) donde simular un error numérico no tiene sentido: esos niveles declaran **`diagnostico:false`**, usan distractores de cercanía y **el informe no emite hipótesis sobre ellos**.

**Invariante 6-bis corregido:** *«≥2 distractores diagnósticos por ítem» se exige solo en ítems con `diagnostico:true`.*

Ver la tabla completa de los 24 con su frase en lenguaje llano y su actividad manipulativa en **§17.5**.

### 13.10 `CB.diagnosticar()` y la evidencia discriminante

```js
CB.diagnosticar(item, valorDado) -> {hipotesis: ['E-R-INV'], discriminante: boolean}
```

`discriminante === true` **solo si un único código de error es compatible** con la respuesta dada. El informe **solo acumula evidencia de ítems discriminantes** (§17.3): si dos códigos empatan, se cuentan ambos pero no se afirma ninguno.

---

## 14. Arquitectura de ficheros, reglas de frontera y APIs

### 14.1 Árbol completo

```
mathsgame/
├── index.html                   ← ÚNICO fichero de entrada. Doble clic.
│                                  <head> con las 9 hojas de estilo y los 43 <script src>
│                                  en el orden exacto de §14.2; <body> con las 17
│                                  <section hidden> de §14.3.
├── AVISO-LEGAL.txt              Único lugar del proyecto donde aparecen «Mojang
│                                  Studios» y «Microsoft» (§21.1).
├── LEEME.txt                    4 líneas para la familia.
├── README.md                    Descripción, alcance curricular literal (§1.3),
│                                  alcance v1/v2 y referencia al AVISO-LEGAL.txt.
├── servir.command               Plan B macOS.
├── servir.bat                   Plan B Windows.
│
├── css/
│   ├── 00-fuentes.css           @font-face «Bloque Pixel» con WOFF2 en base64 (≈19 KB)
│   │                              + pila del sistema (Verdana) para lectura.
│   ├── 01-variables.css         :root con --u:4px, la escala --e1..--e6, los tamaños
│   │                              --tam-*, y los DOS grupos --bg-texto-* / --deco-*.
│   ├── 02-base.css              Reset, border-radius:0 global, image-rendering:pixelated,
│   │                              foco oro 4px, .visually-hidden, suelo --tam-texto-min.
│   ├── 03-componentes.css       .panel-bloque (9-slice), .btn-bloque (bisel), .teclado-bloques,
│   │                              .hud, .luces, .hilera-bono, .cromo, .barra-carga.
│   ├── 04-pantallas.css         Layout de las 17 pantallas; rejilla de respuestas con las
│   │                              tres reglas responsive de §10.5.
│   ├── 05-animaciones.css       @keyframes partícula, agrietado, nivel, brillo-cofre,
│   │                              luz-extra, flotar, nubes, musgo. Bloque
│   │                              prefers-reduced-motion al final.
│   ├── 06-biomas.css            .bioma--pradera/--bosque/--rio/--mina + cielo en 6 clases
│   │                              discretas y bloque @supports (§10.7).
│   │                              cueva/volcan/taller en bloque comentado /* v2 */.
│   ├── 07-adulto.css            Panel del adulto (tipografía de sistema, sin pixel).
│   └── 08-imprimir.css          @page A4; informe y ficha de refuerzo en papel (§17.4).
│
├── js/                          36 ficheros
│   ├── 00-nucleo.js             CB.util: mulberry32, hash32, ent, elegir, barajar,
│   │                              BolsaBarajada, clamp, mediana, ahora(), hoyISO(),
│   │                              diasEntre(), EventoSimple. Y CB.LEGAL.AVISO.
│   ├── 01-almacen.js            leer/escribir/borrar/podar/exportar/importar/migrar,
│   │                              claveDePerfil(), VERSION_ESQUEMA, ESQUELETO_PROBLEMAS.
│   ├── 02-texturas.js           generarTodas(): 8 texturas canvas 16×16 con semillas fijas.
│   ├── 03-sprites.js            desdeMapa(mapa, paleta, px) → box-shadow o canvas.
│   │                              24 entradas de caché (§10.8).
│   ├── 04-audio.js              iniciar/nota/ruido/sfx/silenciar/volumen. 11 efectos con
│   │                              frecuencias exactas. Pausa en visibilitychange.
│   ├── 05-voz.js                leer/disponible/cancelar/lecturaGuiada (§16.4).
│   ├── 06-a11y.js               anunciar() sobre #region-viva, foco, mapa de teclado (§16.5).
│   │
│   ├── 10-gen-numeracion.js     N1…N16
│   ├── 11-gen-sumas.js          S1…S16
│   ├── 12-gen-restas.js         R1…R14  (construidas desde el resultado: nunca negativo;
│   │                              invariante 11 de una sola llevada)
│   ├── 13-gen-multiplicacion.js M1…M10  (siempre suma reiterada + matriz)
│   ├── 14-gen-problemas.js      P1…P20, las 20 plantillas, siguienteSubtipo() por deuda
│   │                              PONDERADA, validar() → {ok, motivos}, PROBLEMAS_SEGUROS.
│   ├── 15-gen-dinero.js         E1…E8  (MONEDAS / BILLETES / CENTIMOS separados, §6.9)
│   ├── 16-gen-vocabulario.js    V1…V8
│   ├── 17-catalogo.js           CB.catalogo (los 92 niveles del anexo §8.3) + CB.MUNDOS.
│   └── 18-distractores.js       CB.ERRORES (24 códigos), CB.distractores.para(),
│                                  CB.diagnosticar().
│   │
│   ├── 20-puntuacion.js         calcular() y bonoFinal() — §11
│   ├── 21-antiazar.js           evaluar(), medianaPersonal(), T_MIN — §12.4
│   ├── 22-vidas.js              estado/fallo/timeout/azar/conceder/tope — §12.2
│   ├── 23-adaptativo.js         theta/actualizar/elegirBeta + regla simple — §13.2
│   ├── 24-logros.js             LISTA (24, 10 con version:1) y comprobar() — §12.8
│   ├── 25-mensajes.js           acierto(ctx)/animo(ctx), 4 bolsas persistidas — §14.7
│   ├── 26-reparacion.js         tarjeta(item) y los 6 explicadores — §12.6
│   ├── 27-repaso.js             CB.leitner — §13.5
│   ├── 28-memoria.js            recuperabilidad/actualizarEstabilidad/clasificar — §13.4
│   ├── 29-grafo.js              estado/desbloqueados/frontera/rutaHasta — §13.6
│   └── 2A-escalera.js           siguienteEscalon() — 5 escalones, §12.5
│   │
│   ├── 30-ui.js                 pintarItem/pintarHUD/particulas (pool de 24)/personaje/
│   │                              hileraBono/barraCarga/resaltarLinea/medirLineas.
│   ├── 31-pantallas.js          ir(id, props), pila de navegación, Salir siempre visible.
│   ├── 32-componentes.js        tecladoBloques, opciones4, selectorSigno, balanza,
│   │                              ordenarFila, monedas, selectorDatos (§9.6).
│   ├── 40-partida.js            iniciar/construirGuion/servirItem/responder/pausar/
│   │                              reanudar/hayPartidaGuardada/reanudarGuardada/finalizar.
│   ├── 41-panel-adulto.js       abrir(), puerta parental, 10 métricas, CSV, JSON,
│   │                              imprimirInforme(), fichaRefuerzo(), borrar.
│   ├── 42-jefes.js              Las 4 mecánicas propias — §12.9
│   ├── 43-mapa-destrezas.js     La cantera: mundo actual por defecto, «Ver toda la
│   │                              cantera» como vista secundaria (§20 mejora 1).
│   ├── 44-casa.js               Álbum de cromos (v1).
│   └── 99-arranque.js           CB.arranque(): texturas → sprites → perfil → poda →
│                                  pantalla inicial. ÚNICO DOMContentLoaded del proyecto.
│
├── datos/                       7 ficheros
│   ├── curriculo-rd157.js       ★ NUEVO. Transcripción literal del RD (§6.2).
│   ├── nombres.js               40 nombres (20 F + 20 M), 1-2 sílabas, diversos.
│   │                              PROHIBIDOS por lista negra: Alex, Álex, Steve.
│   ├── objetos.js               60 objetos {sing, plur, articulo, genero, sprite,
│   │                              verbosGanar, verbosPerder}.
│   ├── vocabulario.js           Lista blanca + los 48 términos del Diccionario.
│   ├── mensajes.js              84 aciertos (4 categorías × 21) + 48 de ánimo.
│   ├── motes.js                 120 motes depurados (§14.8).
│   └── recomendaciones.js       Los 24 códigos → frase llana → actividad de 10 min.
│
├── pruebas/
│   ├── pruebas.html             Ejecutor propio. Verde/rojo por caso. Doble clic.
│   ├── auditar.sh / auditar.bat ★ NUEVO. Los greps que bloquean la entrega (§14.6).
│   ├── casos-carga.js           ★ 43 scripts, espacios de nombre, 17 secciones.
│   ├── casos-formulas.js        Los 30 casos de §11.7 + las 6 aserciones.
│   ├── casos-generadores.js     92.000 ítems (rápido) / 920.000 (exhaustivo), 12 invariantes.
│   ├── casos-problemas.js       Producto cartesiano, validador, género con bolsa, tildes.
│   ├── casos-motor.js           Niño sintético independiente, DAG, cuota, fechas, logros.
│   ├── casos-curriculo.js       Las 8 comprobaciones CU1-CU8 de §6.3.
│   ├── casos-mensajes.js        Unicidad, elogio de proceso, registro lingüístico, motes.
│   ├── casos-contraste.js       ★ NUEVO. Ratios WCAG par a par (§10.3).
│   ├── casos-fuente.js          ★ NUEVO. Cobertura de glifos (§10.2).
│   ├── casos-marca.js           Comprobación en runtime, sin fetch (§14.6).
│   └── fixtures/perfilV1.json   ★ NUEVO. Perfil v1 sintético para el test de migración.
│
└── docs/                        NO se distribuye con el juego (cabecera declarada)
    ├── mapa-curricular.md       Tabla nivel ↔ saber ↔ criterio ↔ trimestreSugerido,
    │                              con la advertencia normativa de §6.1 como primera línea,
    │                              los 48 términos con su origen y «Cómo adaptar la
    │                              secuenciación a tu comunidad».
    ├── errores-frecuentes.md    Los 24 códigos con su actividad de aula.
    ├── guia-del-maestro.md      2 páginas: qué mide, qué NO mide, 20 min de aula.
    ├── decisiones.md            Registro de decisiones cerradas con fecha y motivo.
    └── licencias/
        ├── OFL-Silkscreen.txt
        ├── OFL-PressStart2P.txt
        └── NOTA-SUBSETEO.txt   Nombre original, renombrado a «Bloque Pixel» exigido por
                                  el Reserved Font Name de la OFL, y comando de subseteo.
```

### 14.2 Los 43 `<script src>` y su orden exacto

El plan v1 decía «28 `<script src>`» y su propio árbol contenía 42. Si alguien toma ese número como contrato, faltan scripts y el juego rompe con `CB.x is not defined`.

```
ORDEN EXACTO (los datos van PRIMERO porque 25-mensajes y 14-gen-problemas
los leen en tiempo de definición):

  1-7    datos/  : curriculo-rd157, nombres, objetos, vocabulario, mensajes, motes,
                   recomendaciones
  8-14   js/00-06: nucleo, almacen, texturas, sprites, audio, voz, a11y
 15-23   js/10-18: gen-numeracion, gen-sumas, gen-restas, gen-multiplicacion,
                   gen-problemas, gen-dinero, gen-vocabulario, catalogo, distractores
 24-34   js/20-2A: puntuacion, antiazar, vidas, adaptativo, logros, mensajes, reparacion,
                   repaso, memoria, grafo, escalera
 35-43   js/30-99: ui, pantallas, componentes, partida, panel-adulto, jefes,
                   mapa-destrezas, casa, arranque
```

**`pruebas/casos-carga.js` comprueba:** `document.scripts.length === 43` y que `CB` contiene exactamente los espacios de nombre declarados: `util, LEGAL, almacen, texturas, sprites, audio, voz, a11y, gen, catalogo, MUNDOS, ERRORES, distractores, diagnosticar, CURRICULO, puntuacion, antiazar, vidas, adaptativo, logros, mensajes, reparacion, leitner, memoria, grafo, escalera, ui, pantallas, componentes, partida, adulto, jefes, mapaDestrezas, casa, arranque, pruebas`.

### 14.3 Las 17 pantallas (`<section hidden>`) — lista cerrada

*(Ausencia señalada: F0 exigía navegar entre ellas y `CB.pantallas.ir(id)` las direccionaba, y sus ids no aparecían en ninguna parte del plan.)*

| # | id | Título | Condición de entrada |
|---|---|---|---|
| 1 | `p-portada` | Cubomática | Siempre. Pantalla inicial si hay perfil activo |
| 2 | `p-perfiles` | ¿Quién juega? | Si hay >1 perfil o ninguno |
| 3 | `p-calibracion` | (sin título visible) | Primera partida del perfil |
| 4 | `p-mapa` | La Cantera | Tras JUGAR, con ≥1 mundo desbloqueado |
| 5 | `p-cantera` | Mis vetas | Desde el mapa o el fin de partida |
| 6 | `p-partida` | (HUD) | `CB.partida.iniciar()` |
| 7 | `p-reparacion` | Vamos a verlo | 2.º fallo de un ítem |
| 8 | `p-descanso` | ¡Descanso! | Cada 6-8 ítems |
| 9 | `p-jefe` | (nombre del jefe) | Niveles nucleares del mundo completados |
| 10 | `p-fin` | Fin de la expedición | Cualquier `motivoFin` |
| 11 | `p-casa` | Mi álbum | Desde el mapa |
| 12 | `p-glosario` | Diccionario de Bloques | Desde el mapa |
| 13 | `p-ajustes` | Ajustes | Desde la portada o la pausa |
| 14 | `p-adulto` | Personas adultas | Tras la puerta parental |
| 15 | `p-informe` | Informe | Desde `p-adulto`. **`class="imprimible"`** |
| 16 | `p-creditos` | Créditos | Desde la portada |
| 17 | `p-error` | Se ha soltado un bloque | `window.onerror` / `unhandledrejection` |

**El botón «Salir» es visible en todas ellas** salvo `p-portada` y `p-error`.

### 14.4 Regla de arquitectura verificable

> **Ningún fichero `.js` puede tocar el DOM salvo los de la serie `30-` a `44-` y los seis adaptadores de plataforma declarados.** Los generadores (`10-18`) y el motor (`20-2A`) son **funciones puras sobre datos**.

**Adaptadores de plataforma declarados y EXENTOS del grep:**

`01-almacen.js` · **`02-texturas.js`** · **`03-sprites.js`** · `04-audio.js` · `05-voz.js` · `06-a11y.js`

*(La lista v1 olvidaba 02 y 03, que necesitan `document.createElement('canvas')`: el test de frontera habría fallado el primer día contra código correcto, y la reacción típica habría sido desactivar el test.)*

**Los tres greps de frontera** (`pruebas/auditar.sh`), aplicados a `00-nucleo.js`, `10-18` y `20-2A`:

```bash
grep -nE 'document\.|window\.|localStorage|navigator\.' js/00-nucleo.js js/1?-*.js js/2?-*.js  # → 0
grep -n  'Math.random'                                  js/00-nucleo.js js/1?-*.js js/2?-*.js  # → 0
grep -n  'toISOString'                                  js/*.js datos/*.js                     # → 0
grep -n  "'cubomatica\." $(ls js/*.js | grep -v 01-almacen)                                    # → 0
```

- **Prohibido `Math.random`** en el motor y los generadores: todo aleatorio pasa por el `rng` inyectado. Sin esto, la «semilla reproducible» de §20 mejora 11 es falsa.
- **Prohibido `toISOString`** en TODO el proyecto: ver §15.5.
- **Prohibidos los literales de clave** `'cubomatica.…'` fuera de `01-almacen.js`.

**Consecuencia:** se puede simular una partida de 10.000 ítems en un test sin navegador simulado. *Ese es, más que el doble clic, el motivo por el que esta arquitectura puede ganar.*

### 14.5 APIs de los módulos clave

```js
// ─── MOTOR (puro, cero DOM, cero Math.random) ─────────────────
CB.puntuacion.calcular(item, rtMs, estado) -> {puntos, gemas, mTiempo, desglose}
CB.puntuacion.bonoFinal(precision1er, sinDanio, maraton, preguntas, puntosSesion)
                                           -> {factor, extras, total}
CB.antiazar.evaluar(item, rtMs, correcto, historial, perfil) -> {azar, senales:['S1','S4']}
CB.antiazar.medianaPersonal(destreza, perfil) -> ms
CB.vidas.estado() / .fallo(itemId) / .timeout(itemId) / .azar(itemId)
CB.vidas.conceder(motivo)                  -> {aplicada, guardada, reserva}
CB.vidas.tope()                            -> 5
CB.adaptativo.theta(destreza, perfil) / .elegirBeta(destreza, perfil) -> [betaMin, betaMax]
CB.adaptativo.actualizar(destreza, acierto, beta, perfil) -> thetaNuevo
CB.memoria.recuperabilidad(estado, hoyISO) -> 0..1
CB.memoria.clasificar(estado)              -> 'bloqueado'|'nuevo'|'aprendiendo'|
                                              'afianzada'|'dominada'|'oxidada'
CB.memoria.vencidosHoy(perfil, hoyISO)     -> [destrezaId]
CB.grafo.estado(nivelId, perfil) / .desbloqueados(perfil) / .frontera(perfil)
CB.escalera.siguienteEscalon(fallosConcepto) -> {escalon:1|2|3|4|5, accion}
CB.logros.comprobar(evento, estado)        -> [logro]
CB.mensajes.acierto(ctx) -> string   // ctx: {rapido, racha, superacion, reparacion, destreza}
CB.mensajes.animo(ctx)   -> string
CB.diagnosticar(item, valorDado)           -> {hipotesis:[codigo], discriminante:boolean}

// ─── GENERADORES (puros) ──────────────────────────────────────
CB.catalogo.get(nivelId) -> Nivel
CB.catalogo.candidatos(destreza, [betaMin, betaMax], perfil) -> [Nivel]   // NUNCA []
CB.catalogo.porTrimestreSugerido(n) / .porDestreza(slug) / .desbloqueados(perfil)
CB.catalogo.tIdealDe(destreza) -> ms
nivel.generar(rng, D) -> Item      // rng SIEMPRE inyectado
CB.distractores.para(item, rng) -> [Opcion]
CB.gen.problemas.siguienteSubtipo(perfil) -> Plantilla
CB.gen.problemas.validar(item) -> {ok:boolean, motivos:[string]}    // NO lanza

// ─── INTERFAZ (tocan DOM) ─────────────────────────────────────
CB.pantallas.ir('p-mapa'|'p-partida'|'p-fin'|…, props)
CB.ui.pintarItem(item) / .pintarHUD(estado) / .particulas(x,y,color)
CB.ui.personaje(nombre, estado) / .hileraBono(n) / .resaltarLinea(i) / .medirLineas(txt)
CB.partida.iniciar({mundoId, modo}) / .responder(valor, origen) / .finalizar(motivo)
CB.partida.pausar() / .reanudar() / .hayPartidaGuardada(perfil) / .reanudarGuardada(perfil)
CB.adulto.abrir() / .imprimirInforme(perfilId) / .fichaRefuerzo(perfilId, codigoError)

// ─── PLATAFORMA ───────────────────────────────────────────────
CB.almacen.leer(clave) / .escribir(clave, obj) / .podar(perfil, opciones)
CB.almacen.claveDePerfil(id) / .exportar(perfilId) / .importar(file) / .migrar(perfil)
CB.audio.iniciar() / .sfx(nombre) / .silenciar(bool) / .volumen(0..1)
CB.voz.leer(texto) / .disponible() / .lecturaGuiada(lineas, alTerminar) / .cancelar()
CB.a11y.anunciar(texto)
CB.util.ahora() / .hoyISO(d) / .diasEntre(a, b) / .mulberry32(s) / .hash32(s)
CB.util.BolsaBarajada(items) / .clamp(v,a,b) / .mediana(arr)
```

### 14.6 La auditoría de marca, dividida en dos porque `file://` bloquea `fetch`

El plan v1 declaraba dos tests bloqueantes para la entrega —lista negra de marca y frontera DOM— que necesitan **leer el texto de los ficheros**. `fetch()` y `XMLHttpRequest` sobre `file://` están **bloqueados por CORS en Chrome y Firefox** (`Origin 'null' has been blocked`). **Los dos tests que bloqueaban la entrega eran literalmente inejecutables en el modo de uso principal del proyecto.**

| Parte | Dónde | Qué hace | ¿Bloquea la entrega? |
|---|---|---|---|
| **1** | **`pruebas/auditar.sh` y `auditar.bat`** | Los greps de §14.4 y §21.1 sobre el sistema de ficheros | **SÍ.** Es la puerta de F9 |
| **2** | `pruebas.html` → `casos-marca.js` | Comprobación **en runtime sin fetch**: recorre `Function.prototype.toString()` de las funciones exportadas y el texto de `document.styleSheets[i].cssRules` | No. **Cobertura parcial declarada** |

Fila añadida a §19.2: *«la suite completa de `pruebas.html` requiere abrirla mediante `servir.command` → `http://localhost:8000/pruebas/pruebas.html`; con doble clic se ejecuta todo salvo lo que necesita leer ficheros.»*

### 14.7 Mensajes: la garantía de no repetición, bien planteada

El requisito 4 del usuario es **mensajes de enhorabuena variados, nunca el mismo repetido**. El plan v1 tenía 84 mensajes en 4 categorías elegidos por contexto: la bolsa **efectiva** era la de la categoría, quizá 15-20 mensajes, y un niño con racha vería repetido el mismo elogio de racha en 15 aciertos. Muy por debajo de los «40 minutos sin repetir» prometidos.

```
4 categorías × EXACTAMENTE 21 mensajes = 84 mensajes de acierto
  A) PROCEDIMIENTO   (nombra lo que ha hecho: «has llevado bien la decena»)
  B) ESFUERZO        («lo has vuelto a intentar y ha salido»)
  C) SUPERACIÓN      (tras reparación o tras un concepto difícil)
  D) DESCUBRIMIENTO  (racha, mundo, veta nueva)

48 mensajes de ánimo, en 2 categorías × 24.

CADA CATEGORÍA tiene su PROPIA BolsaBarajada persistida en el perfil.
Ningún mensaje se repite hasta agotar la bolsa de su categoría.
Además, nunca se repite uno de los `ultimos12` globales: si la bolsa solo ofrece
uno ya reciente, se toma el siguiente de la bolsa.
```

**`casos-mensajes.js` (endurecido):**

| # | Comprobación | Criterio |
|---|---|---|
| M1 | `mensajes.acierto.length === 84` y `animo.length === 48` **exactos** | exacto (v1 pedía «≥80 y ≥45»: más laxo que lo diseñado, admitía entregar menos) |
| M2 | **21 por categoría** de acierto, 24 por categoría de ánimo | exacto |
| M3 | 0 duplicados tras normalizar (minúsculas, sin tildes, sin signos) | 0 |
| M4 | **≥20 de los 84 nombran el PROCEDIMIENTO concreto** | ≥20 |
| M5 | **0 elogios de persona.** Lista negra: `listo, lista, inteligente, genio, crack, campeón, campeona, máquina, fenómeno, eres el mejor, qué listo, qué lista` | 0 |
| M6 | **0 términos de registro impropio.** Lista negra: `wow, cool, top, súper, campeoncito, mi niño, cielo, cariño, chaval` + voseo + «tú» latinoamericano + diminutivos condescendientes sistemáticos | 0 |
| M7 | Simulación de **120 aciertos**: 0 repeticiones dentro de la misma categoría antes del ítem 21 | 0 |
| M8 | Simulación de **40 minutos de juego**: ningún mensaje visto dos veces | 0 |
| M9 | La misma lista negra de M5 aplicada a **`datos/motes.js`** | 0 |
| M10 | Todas las exclamaciones abren con `¡` y cierran con `!`; todas las interrogaciones con `¿`/`?` | 0 fallos |

**Revisión final obligatoria:** los 132 mensajes leídos **en voz alta por un adulto hispanohablante de España**, con el resultado registrado en `docs/decisiones.md`. Ningún test automático detecta que una frase suene rara.

### 14.8 Motes: identidad sin adjetivo de capacidad

El mote es la **identidad permanente** del niño en el juego. Si se llama «Gema Lista», cada fallo contradice su propio nombre: es el mecanismo de mentalidad fija. Y «Topo Veloz» premia la rapidez como rasgo, reforzando la presión temporal.

```
Lista negra aplicada a los 120 motes:
  listo, lista, genio, sabio, sabia, crack, máquina, campeón, campeona,
  veloz, rápido, rápida, fenómeno, mejor, súper, listillo

Motes de ACCIÓN o de MATERIAL:
  «Gema Pulida», «Topo Cavador», «Pico Fino», «Casco Verde», «Farol Naranja»,
  «Bota Barro», «Vagón Azul», «Musgo Suave», «Cristal Hondo», «Roca Alta»…
```

---

## 15. Modelo de datos y persistencia

### 15.1 Claves de `localStorage` — versión FUERA de la clave

El plan v1 tenía la clave escrita de **dos formas contradictorias** (`cubomatica.perfil.v1` sin id en §14; `cubomatica.perfil.v1.<id>` en §15.1) y, peor, ponía la **versión a la vez en la clave y en el objeto**: en cuanto `migrar()` dejase el objeto en `version:2`, o se seguía escribiendo bajo `.v1.` (y la clave mentía) o se escribía en `.v2.` y quedaban **huérfanos el índice y `ultimoPerfil`** → **pérdida silenciosa de todo el progreso en la primera migración**. Justo el caso que el «test obligatorio» decía cubrir y que el esquema hacía imposible aprobar.

| Clave | Contenido |
|---|---|
| `cubomatica.perfil.<id>` | Objeto `Perfil` completo (JSON) |
| `cubomatica.perfiles.indice` | `[{id, mote, avatar, ultimoISO}]` — hasta 4 en casa, 30 en modo aula |
| `cubomatica.ultimoPerfil` | id del último perfil activo |
| `cubomatica.ajustes` | Ajustes **del aparato**: `{volumen, silencio, modoAula, modoProyeccion}` |
| `cubomatica.esquema` | Entero: versión de esquema global |

```js
CB.almacen.VERSION_ESQUEMA = 2;
CB.almacen.claveDePerfil = function (id) { return 'cubomatica.perfil.' + id; };
// Prohibidos los literales de clave fuera de 01-almacen.js (grep de §14.4).
```

**Perfil más nuevo que el juego:** si `perfil.version > VERSION_ESQUEMA`, `leer()` **NO carga** y devuelve `{error:'perfil-mas-nuevo'}`, mostrando *«Este perfil viene de una versión más nueva del juego. Actualiza el juego o usa otra copia.»* Mejor no cargar que corromper.

### 15.2 Una sola fuente de verdad para cada ajuste

En v1, `tablas69`, `limiteSesionMin`, `volumen` y `silencio/sonido` existían **a la vez** en `ajustesDispositivo` y en `perfil.ajustes`, sin regla de precedencia. En modo aula con 30 perfiles, el maestro activaría las tablas en el dispositivo y no entendería por qué a 12 alumnos no les aparecen.

```
cubomatica.ajustes  →  SOLO lo FÍSICO del aparato:
                       {volumen, silencio, modoAula, modoProyeccion}

perfil.ajustes      →  TODO lo pedagógico y de accesibilidad:
                       modoTiempo, voz, letraGrande, altoContraste, reduceMotion,
                       tablas69, centimos, restasDobleLlevada, division,
                       limiteSesionMin, noPuntuarVelocidadProblemas

Al crear un perfil se COPIAN los valores del último perfil creado como defecto.
El panel del adulto ofrece «Aplicar a todos los perfiles» como ACCIÓN EXPLÍCITA,
nunca como herencia implícita.
```

### 15.3 Esquema JSON literal del perfil (versión 2, fechas coherentes)

> **Las fechas del ejemplo v1 eran imposibles**: perfil creado el 15-09-2026 (dos meses en el futuro respecto a la última sesión, 25-07-2026), `diasJugados` desordenado con septiembre antes de julio, un logro desbloqueado después de la última actividad y un `ts` que correspondía al 29 de julio. Cualquier cálculo de racha, de estabilidad o de «oxidada» sobre ese fixture da días negativos, `R > 1` o `NaN`, y el fixture de pruebas habría nacido envenenado.

```json
{
  "version": 2,
  "id": "p-3f9a1c",
  "mote": "Topo Cavador",
  "avatar": 7,
  "colorBloque": "#5AA02C",
  "creadoISO": "2026-05-15",
  "trimestreDeducido": 3,
  "calibrado": true,
  "grupo": null,

  "ajustes": {
    "modoTiempo": "conCalma",
    "voz": true,
    "letraGrande": false,
    "altoContraste": false,
    "reduceMotion": "auto",
    "tablas69": false,
    "centimos": false,
    "restasDobleLlevada": false,
    "division": false,
    "limiteSesionMin": 20,
    "noPuntuarVelocidadProblemas": false
  },

  "gemas": 1240,
  "puntosTotales": 18420,
  "mejorPuntuacion": { "normal": 2640, "conCalma": 2180, "sinPrisa": 0 },
  "vidasReserva": 1,
  "componentesVistos": ["tecladoBloques", "opciones4", "balanza", "selectorDatos"],

  "destrezas": {
    "suma_llevada": {
      "theta": 1180, "n": 34, "aciertos": 29, "aciertosPrimerIntento": 25,
      "rtMediana": 9100, "rtMuestras": [8200,9400,9100,10300,8800,9600,9200,9000],
      "ventana10": [1,1,1,0,1,1,1,1,1,1],
      "caja": 3, "estabilidadDias": 8.2,
      "ultimoRepasoISO": "2026-07-22", "proximoRepasoISO": "2026-07-30",
      "estado": "afianzada", "fallosSesion": 0,
      "ejemplosFallados": ["68 + 57"]
    },
    "problemas_comparacion": {
      "theta": 880, "n": 9, "aciertos": 4, "aciertosPrimerIntento": 3,
      "rtMediana": 41300, "rtMuestras": [38000,44100,41300,39900,43200,42000],
      "ventana10": [0,0,1,0,0,1,1,0,1],
      "caja": 1, "estabilidadDias": 1,
      "ultimoRepasoISO": "2026-07-25", "proximoRepasoISO": "2026-07-26",
      "estado": "aprendiendo", "fallosSesion": 2,
      "ejemplosFallados": ["Ana tiene 12 cromos. Tiene 5 más que Leo. ¿Cuántos cromos tiene Leo?"]
    }
  },

  "niveles": {
    "S9":  { "n": 22, "aciertos": 19, "caja": 3, "D": 2, "ultimoISO": "2026-07-25", "enPausa": false },
    "P9":  { "n": 5,  "aciertos": 2,  "caja": 1, "D": 1, "ultimoISO": "2026-07-25", "enPausa": false },
    "R14": { "n": 0,  "aciertos": 0,  "caja": 1, "D": 1, "ultimoISO": null,         "enPausa": false }
  },

  "problemas": {
    "CAMBIO_1":      { "intentos": 14, "aciertos": 13, "rtMedioMs": 21400 },
    "CAMBIO_5":      { "intentos": 0,  "aciertos": 0,  "rtMedioMs": 0 },
    "COMBINACION_1": { "intentos": 11, "aciertos": 10, "rtMedioMs": 23100 },
    "COMPARACION_3": { "intentos": 5,  "aciertos": 2,  "rtMedioMs": 39800 },
    "IGUALACION_5":  { "intentos": 0,  "aciertos": 0,  "rtMedioMs": 0 }
  },

  "errores": {
    "E-R-INV":      { "veces": 9, "vecesDiscriminante": 4,
                      "ejemplos": ["63 - 28 -> 45 escrito 25", "82 - 47 -> 45", "140 - 26 -> 126"] },
    "E-P-PALCLAVE": { "veces": 5, "vecesDiscriminante": 5,
                      "ejemplos": ["Leo tiene 3 menos que Ana -> sumó"] }
  },

  "items": {
    "S9#56+78": { "vistas": 2, "fallos": 1, "caja": 1, "proximoRepaso": "2026-07-27" }
  },

  "mundos": {
    "M1": { "desbloqueado": true,  "gemasNivel": 11, "nivelesCompletados": 14, "jefe": true,  "jefeSinFallos": false },
    "M2": { "desbloqueado": true,  "gemasNivel": 3,  "nivelesCompletados": 6,  "jefe": false, "jefeSinFallos": false },
    "M3": { "desbloqueado": false, "gemasNivel": 0,  "nivelesCompletados": 0,  "jefe": false, "jefeSinFallos": false },
    "M4": { "desbloqueado": false, "gemasNivel": 0,  "nivelesCompletados": 0,  "jefe": false, "jefeSinFallos": false }
  },

  "logros": {
    "vena_de_cristal": { "desbloqueadoISO": "2026-05-19", "progreso": 10, "cobrado": true },
    "veta_restaurada": { "desbloqueadoISO": "2026-07-24", "progreso": 3,  "cobrado": true }
  },

  "cromos": ["blopi", "tronquete"],
  "glosario": ["sumando", "decena", "centena", "diferencia"],

  "mensajes": {
    "acierto": {
      "bolsaA": [12,3], "bolsaB": [44,7], "bolsaC": [61], "bolsaD": [19,2],
      "ultimos12": [7,19,2,55,31,8,44,12,3,61,70,22]
    },
    "animo": { "bolsa1": [5,18], "bolsa2": [33], "ultimos10": [2,9,14,5,18,33,7,41,26,11] }
  },

  "diario": {
    "diasJugados": ["2026-07-18", "2026-07-20", "2026-07-24", "2026-07-25"],
    "racha": 2, "mejorRacha": 6,
    "segundosHoy": 720, "ultimoDia": "2026-07-25",
    "tiempoPantallaPorDia": { "2026-07-24": 1140, "2026-07-25": 720 }
  },

  "animo": [ { "fechaISO": "2026-07-25", "cara": 1 } ],

  "partidaEnCurso": null,

  "historial": [
    { "fechaISO": "2026-07-25", "modo": "expedicion", "mundo": "M2", "seg": 412,
      "preguntas": 15, "aciertos": 13, "aciertos1erIntento": 11,
      "precision1er": 0.73, "precisionTotal": 0.87,
      "puntos": 2140, "gemas": 58, "lucesApagadas": 1, "azares": 0,
      "motivoFin": "guion", "animo": 1,
      "destrezasMejoradas": ["suma_llevada", "resta_llevada"] }
  ],

  "respuestas": [
    [1784972745678, "S9#56+78", 1180, 2, 9100, 1, 134, 0]
  ]
}
```

**`respuestas[]` es un array posicional documentado**, no un objeto de 27 claves. Motivo: cuota (§15.6).

```
[0] ts (epoch ms)      [1] itemId          [2] beta       [3] D
[4] rtMs               [5] correcta (0|1)  [6] valorDado  [7] flags (máscara de bits)

flags:  1 = intento2   2 = usoPista   4 = usoAudio   8 = azar
       16 = repaso    32 = reparacionCompletada     64 = formatoOpciones
```

Los campos ricos que necesita el panel del adulto (`nivelId`, `destreza`, `subtipo`, `hipotesis`, `faseFallada`, `semillaPartida`, `indiceItem`) se **derivan** del `itemId` y del catálogo, salvo `semillaPartida` e `indiceItem`, que van en el propio `itemId` con el formato **`<nivelId>#<expresión>@<semilla>.<índice>`**. Esto hace realmente posible la mejora 11 (§20).

### 15.4 Migración: nunca borra, nunca revienta

```js
CB.almacen.migrar = function (perfil) {
  try {
    if (!perfil.version) perfil.version = 1;

    // Regla de oro: cada migración AÑADE campos con valor por defecto. JAMÁS BORRA.
    if (perfil.version < 2) {
      // Sin dependencias externas: 01-almacen.js no puede referenciar ningún CB.*
      // salvo CB.util (regla añadida a §14.4). El plan v1 llamaba a
      // CB.plantillas.esqueletoVacio(), que no existe, desde un script que carga
      // 13 ficheros ANTES que el generador de problemas → TypeError y el perfil
      // no cargaba NUNCA.
      perfil.problemas = perfil.problemas || CB.almacen.ESQUELETO_PROBLEMAS();

      var ds = perfil.destrezas || (perfil.destrezas = {});   // guarda contra undefined
      Object.keys(ds).forEach(function (k) {
        if (ds[k].estabilidadDias == null) ds[k].estabilidadDias = 1;
        if (ds[k].estado == null)          ds[k].estado = 'nuevo';
      });

      if (!perfil.niveles) perfil.niveles = {};
      if (perfil.historial) perfil.historial.forEach(function (h) {
        if (h.precision != null) {            // el campo ambiguo de v1
          h.precision1er   = h.precision;
          h.precisionTotal = h.preguntas ? (h.aciertos / h.preguntas) : 0;
        }
      });
      if (typeof perfil.mejorPuntuacion === 'number') {
        perfil.mejorPuntuacion = { normal: perfil.mejorPuntuacion, conCalma: 0, sinPrisa: 0 };
      }
      perfil.version = 2;
    }
    return perfil;
  } catch (e) {
    return CB.almacen.perfilNuevoDesdeRestos(perfil);   // conserva id, mote, gemas,
  }                                                     // puntosTotales, logros, cromos, glosario
};

CB.almacen.ESQUELETO_PROBLEMAS = function () {          // array literal LOCAL
  var subtipos = ['CAMBIO_1','CAMBIO_2','CAMBIO_3','CAMBIO_4','CAMBIO_5','CAMBIO_6',
                  'COMBINACION_1','COMBINACION_2',
                  'COMPARACION_1','COMPARACION_2','COMPARACION_3','COMPARACION_4',
                  'COMPARACION_5','COMPARACION_6',
                  'IGUALACION_1','IGUALACION_2','IGUALACION_3','IGUALACION_4',
                  'IGUALACION_5','IGUALACION_6'];
  var o = {};
  subtipos.forEach(function (s) { o[s] = {intentos:0, aciertos:0, rtMedioMs:0}; });
  return o;
};
```

**Escritura en dos fases** (el niño cierra la tapa del portátil a mitad de guardado):

```js
CB.almacen.escribir = function (clave, obj) {
  var s = JSON.stringify(CB.almacen.sanear(obj));   // sanear: NaN/Infinity → 0
  try {
    ls.setItem(clave + '.tmp', s);
    JSON.parse(ls.getItem(clave + '.tmp'));          // verificación
    ls.setItem(clave, s);
    ls.removeItem(clave + '.tmp');
  } catch (e) {
    if (e.name === 'QuotaExceededError') { /* ver §15.6 */ }
    else { CB.almacen.memoria[clave] = obj; CB.almacen.avisarSinDisco(); }
  }
};
```

**Test obligatorio:** cargar `pruebas/fixtures/perfilV1.json` —un perfil **sin** `problemas`, **sin** `estabilidadDias`, **sin** `estado`, con 3 logros, 2 cromos y 1240 gemas— y comprobar que **no se pierde ni una gema, ni un logro, ni un cromo** y que se añaden las 20 claves de `problemas`.

*(El esquema literal de v1 declaraba `"version": 1` y ya contenía los tres campos que la migración añadía: el fixture nunca habría probado la migración real.)*

### 15.5 Fechas: `hoyISO()` obligatorio, `toISOString` prohibido

Todo el modelo (racha, `proximoRepasoISO`, `diasJugados`, `tiempoPantallaPorDia`, curva de olvido) se apoya en cadenas `YYYY-MM-DD`, y el plan v1 no decía cómo se obtenían. La implementación obvia, `new Date().toISOString().slice(0,10)`, **da el día anterior** para cualquier partida jugada después de las 22:00 en España peninsular en verano (UTC+2): la racha se rompe sola, el repaso vence dos veces y `segundosHoy` se reinicia a mitad de sesión.

```js
CB.util.hoyISO = function (d) {
  d = d || new Date();
  var m = d.getMonth() + 1, x = d.getDate();
  return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (x < 10 ? '0' : '') + x;
};
CB.util.diasEntre = function (a, b) {     // compara a MEDIODÍA LOCAL:
  var A = new Date(a + 'T12:00:00');      // inmune al cambio de hora
  var B = new Date(b + 'T12:00:00');
  return Math.round((B - A) / 86400000);
};
CB.util.ahora = function () {             // MONOTÓNICA: un ajuste de reloj (NTP, cambio
  return (window.performance && performance.now)   // de hora, el niño toca la fecha del
       ? performance.now() : Date.now();           // iPad) daría rt negativo o de horas
};
// y siempre:  rt = CB.util.clamp(Math.round(ahora() - t0), 0, 600000);
```

**Invariantes de fecha comprobados en `casos-motor.js`:**

- `diario.diasJugados` es **estrictamente creciente**.
- **Ninguna fecha ISO del perfil es posterior a hoy.** Si al cargar se detecta una fecha futura (reloj del dispositivo mal puesto), `migrar()` **la recorta a hoy** en lugar de romper la racha.
- `CB.almacen.escribir` **rechaza** cualquier ISO > hoy + 1 día.

### 15.6 Cuota, poda y modo aula

800 respuestas × ~380 bytes = ~300 KB por perfil. Con `modoAula` y 30 perfiles, **~9-10 MB**, muy por encima del límite típico de **5 MB** por origen. El primer `setItem` que desborde lanza `QuotaExceededError` y, con el respaldo en memoria de v1, **la clase entera deja de guardar sin que nadie se entere hasta el día siguiente**.

| Modo | Respuestas por perfil | Sesiones de historial | Tamaño estimado |
|---|---|---|---|
| Doméstico (≤4 perfiles) | **800** | 60 | ~110 KB × 4 = 440 KB |
| **Modo aula (≤30 perfiles)** | **150** | 20 | ~22 KB × 30 = **660 KB** |

*(El array posicional de §15.3 baja cada respuesta de ~380 a ~120 bytes.)*

```js
// en escribir(), ante QuotaExceededError:
CB.almacen.podar(perfil, {agresiva: true});
reintentar UNA vez;
si vuelve a fallar → respaldo en memoria + aviso VISIBLE en el panel del adulto
```

**`podar()` recorta también** *(en v1 crecían sin límite: un curso son ~180 entradas por perfil)*:

- `diario.diasJugados` y `diario.tiempoPantallaPorDia`: últimos **120 días**.
- `errores[*].ejemplos` y `destrezas[*].ejemplosFallados`: máximo **3**.
- `destrezas[*].rtMuestras`: máximo **12**.

**`podar()` se ejecuta en tres momentos**, no solo al cerrar partida (si el niño cierra la pestaña de golpe —lo normal— nunca se ejecutaría): **al cerrar partida**, en **`pagehide`** y al inicio de **`CB.arranque()`**.

**Test:** serializar 30 perfiles llenos en modo aula y comprobar `total < 4.000.000` bytes.

### 15.7 Partida en curso: se guarda y se restaura

*(F5 exigía «al salir se guarda todo y al volver se restaura» y §16.2 permitía cambiar el modo de tiempo desde la pausa, y **ni la API ni el esquema tenían dónde**. El criterio de HECHO era inalcanzable.)*

```json
"partidaEnCurso": {
  "iniciadaTs": 1784972000000,
  "mundo": "M2", "modo": "expedicion",
  "guion": ["S9","R7","P3","N9","S12"],
  "indice": 4,
  "luces": 2, "puntos": 540, "gemas": 12,
  "semillaPartida": 1234567,
  "itemsServidos": ["S9#56+78@1234567.0", "R7#63-28@1234567.1"]
}
```

- API: `CB.partida.pausar()`, `.reanudar()`, `.hayPartidaGuardada(perfil)`, `.reanudarGuardada(perfil)`.
- Se escribe en **`visibilitychange`**, en **`pagehide`** y **cada 3 ítems**.
- Al terminar o abandonar: `partidaEnCurso = null`.
- **Caducidad:** si `Date.now() - iniciadaTs > 24 h`, se descarta y se ofrece empezar de nuevo.

### 15.8 Multi-perfil, exportación e importación segura

- **Hasta 4 perfiles** en modo doméstico; **hasta 30** con `modoAula`.
- El niño se identifica con un **mote de lista cerrada de 120**, jamás con nombre real, correo, edad ni ubicación.
- «Borrar este perfil» está **detrás de la puerta parental** y exige escribir la palabra `BORRAR`.

**`CB.almacen.importar` valida ANTES de escribir.** Aceptar JSON arbitrario y volcarlo al DOM es la única superficie de ataque que existe en este proyecto, y en v1 estaba abierta (un fichero manipulado podía traer `mote` con HTML, `colorBloque` con una cadena que se inyecta en un `style`, arrays de 500.000 entradas o `version: 99`):

| Campo | Validación |
|---|---|
| `mote` | Debe pertenecer a la lista cerrada de 120 de `datos/motes.js`; si no, se sustituye por uno aleatorio |
| `colorBloque` | Debe casar `/^#[0-9A-Fa-f]{6}$/`; si no, `#5AA02C` |
| `avatar` | Entero, `clamp(0, 15)` |
| `version` | `<= VERSION_ESQUEMA`; si es mayor, se rechaza el fichero |
| `respuestas`, `historial`, `diario.diasJugados` | Truncados a sus topes |
| Cualquier clave desconocida de primer nivel | **Se descarta** (lista blanca de campos) |

**Y en toda la interfaz:** todo texto que venga del perfil se pinta con **`textContent`, nunca con `innerHTML`**. `casos-marca.js` comprueba que `innerHTML` solo aparece en `js/30-44` y **solo con literales de plantilla sin variables**.

**Limitación estructural declarada** en LEEME.txt y en la primera pantalla del panel: *«sin servidor, el progreso vive solo en este navegador. Si cambias de ordenador o limpias el navegador, se pierde. Haz una copia al terminar cada trimestre.»*

---

## 16. Accesibilidad e inclusión

### 16.1 Motricidad

| Regla | Valor |
|---|---|
| Tamaño de botón de respuesta | **96 × 96 px** (mínimo absoluto 64 × 64). *WCAG 2.2 AA exige 24×24 y AAA 44×44; un niño de 7-8 años necesita mucho más.* |
| Separación entre botones | **≥ 16 px** (`--e3`) |
| Área táctil real | **≥ 20 mm** |
| Disposición en vertical | **Todas** las opciones en la mitad inferior, al alcance del pulgar |
| Arrastrar y soltar | **Nunca como vía única.** Siempre alternativa por toque simple (`ordenar` = tocar en secuencia; «dar de comer a Blopi» = tocar) |
| Degradación responsive | §10.5 |

### 16.2 Tiempo (WCAG 2.2.1 Timing Adjustable, nivel A)

Tres modos (§11.3), cambiables **también desde la pausa en mitad de la partida**. **«Con calma» es el modo por defecto permanente.** **Ninguno bloquea contenido ni logros de aprendizaje.**

**Prohibido en todo el juego:** cuenta atrás numérica, color rojo creciente, tic-tac acelerado, vibración, mensaje «¡RÁPIDO!», hilera de tiempo que se apaga en directo (§3.2) y **apagar una luz por agotar el tiempo** (§12.1).

**Botón de pausa permanente** de 64×64 px: congela el cronómetro, oscurece el enunciado y muestra *«Seguimos cuando quieras»* con un botón grande **«Seguir»**. **Sin límite de tiempo. No cuenta para el límite de sesión.** *(En v1 solo existía `Esc`, que en una tableta —el dispositivo más probable— no existe: un niño que necesitaba parar 20 segundos solo podía salir, con el cronómetro corriendo.)*

### 16.3 Visión

- **Contraste** ≥ 4,5:1 texto normal, ≥ 3:1 texto grande y componentes. Verificado par a par por **`casos-contraste.js`** (§10.3).
- **Fondo de texto crema `#FFF6E5`, nunca blanco puro.**
- **Nunca se codifica el resultado solo con color**: color + forma + movimiento + texto (§10.4).
- **Ningún texto sobre textura** (§10.1).
- **Tamaños mínimos** de §10.2: `--tam-texto-min: 20px`.
- **Modo alto contraste**: panel oscuro `#10142C`, texto crema, texturas decorativas desactivadas.
- **Fuente ampliada**: ×1,25 en todo el texto de lectura.
- **Modo proyección**: tipografía ×1,6, un ítem por pantalla.

### 16.4 Lectura, dislexia y lectura guiada

- Fuente de lectura: **pila del sistema (Verdana)**, recomendada para dislexia. **Fuente pixel prohibida en bloques de más de 6 palabras.**
- `line-height: 1.6`, `letter-spacing: .05em`, `word-spacing: .16em`, alineación a la izquierda **sin justificar**, **máximo 34 caracteres por línea** (`max-width: 34ch`), sin cursiva, sin mayúsculas sostenidas.
- **Botón de altavoz permanente** que lee el enunciado completo con `speechSynthesis` (`lang="es-ES"`, prefiere voces locales).

**Respaldo obligatorio, corregido.** El plan v1 afirmaba que resaltar cada línea **1,6 s** equivalía a «60 palabras por minuto, la fluidez típica de 2.º». A 34 caracteres por línea, una línea tiene 5-7 palabras; a 60 ppm eso son **5-7 segundos**, no 1,6. **La ayuda pensada para el peor lector avanzaba casi cuatro veces más rápido de lo que ese niño lee**: el resaltado le adelantaba y le hacía perder el sitio.

```js
CB.voz.lecturaGuiada = function (lineas, alTerminar) {
  var i = 0;
  (function paso () {
    CB.ui.resaltarLinea(i);
    var ms = Math.max(2500, contarPalabras(lineas[i]) * 1000 * CB.ajustes.factorLectura);
    if (++i < lineas.length) setTimeout(paso, ms);
    else setTimeout(function () { CB.ui.resaltarLinea(-1); alTerminar(); }, ms);
  })();
};
// factorLectura = 1,0 por defecto;  1,5 en modo «Sin prisa»
```

**Es decir: 1 segundo por palabra (60 ppm real), con un suelo de 2,5 s por línea.**

**Y el ritmo lo marca el niño:** bajo el enunciado aparecen **«‹ Otra vez»**, **«› Siguiente»** y **«Más despacio»** (×1,5 acumulativo hasta ×2).

- Si `getVoices()` no devuelve **ninguna** voz `es-*` tras 1200 ms, **el botón NO se oculta**: se convierte en lectura guiada. *El botón hace siempre algo, que es lo que un niño necesita.*
- **El cronómetro no corre durante la lectura guiada** (§11.4).

### 16.5 Teclado y lectores de pantalla

**Mapa de teclado completo y sin ambigüedad.** En v1, `1-4` «seleccionaban opción» y a la vez `0-9` era «teclado numérico»: en un ítem de formato `teclado`, pulsar `2` era indeterminado y el criterio «se completa una partida entera solo con teclado» no se podía cumplir.

| Tecla | Acción | Condición |
|---|---|---|
| `1`-`4` | Selecciona la opción 1-4 | **Únicamente si `item.formato === 'opciones4'`** |
| `0`-`9` | Escribe un dígito | **En cualquier otro formato** |
| `Enter` | Confirma | siempre |
| `Retroceso` | Borra el último dígito — **siempre con `preventDefault()`**, para no navegar atrás | siempre |
| `Esc` | Pausa | siempre |
| `L` | Lee el enunciado en voz alta | siempre |
| `P` | Pide pista | siempre |
| `Tab` | Recorre los controles | siempre |

El mapa completo aparece también en la pantalla de Ajustes, y §19.2 incluye **una prueba manual por formato**.

| Elemento | Especificación |
|---|---|
| Foco | Contorno **4 px** oro `#F5C518`, `outline-offset: var(--u)`, contraste ≥ 3:1, **siempre visible** |
| Feedback | `#region-viva` con `aria-live="polite"` |
| Temporizador | `aria-live="off"` |
| Botones | `aria-label` descriptivo (`aria-label="Opción 3: 134"`) |
| Enunciado | `<p>` dentro de `role="group"` con `aria-labelledby` |
| Documento | `<html lang="es">` |

**Criterio de aceptación:** *se completa una partida entera solo con teclado y con el sonido silenciado.*

### 16.6 Movimiento y fotosensibilidad

`prefers-reduced-motion: reduce` desactiva partículas, construcción de botones y transiciones **manteniendo el cambio de color, de icono y de texto**. Ajuste manual equivalente en Ajustes. **Ningún destello supera 3/s** (WCAG 2.3.1). **Nunca** flashes a pantalla completa. **No hay sacudida de pantalla en ningún caso** (se eliminó con los corazones que estallaban, §3.3).

### 16.7 Igualdad y diversidad

*(Epígrafe reubicado. En v1 colgaba del bloque F y afirmaba que «la perspectiva de género está en el texto legal». **Verificado**: la perspectiva de género **sí** figura literalmente en el saber F.2.c del primer ciclo. Pero el reparto 50/50 de los nombres no se sostiene solo en él.)*

**Base normativa citada correctamente:**

- Saber **F.2.c**, literal: *«Contribución de las matemáticas a los distintos ámbitos del conocimiento humano desde una perspectiva de género»*.
- Saber **F.2.a**, literal: *«Identificación y rechazo de actitudes discriminatorias ante las diferencias individuales presentes en el aula. Actitudes inclusivas y aceptación de la diversidad del grupo»*.
- Y los **elementos transversales de la LOMLOE** y los principios pedagógicos del RD 157/2022 (no del bloque F).

**Implementación:** los 40 nombres propios están **equilibrados por género por construcción, con bolsa barajada** (§9.7), no por azar, y son culturalmente diversos. El **reparto de roles** (quién gana y quién pierde objetos) también.

### 16.8 El bloque socioafectivo: qué hace el juego y qué NO

*(Corrección de un error de categoría. Los criterios de evaluación describen lo que hace y demuestra el **ALUMNO**; un mensaje de una aplicación no «es» un criterio. Escrito así en un documento que verá un maestro, es una sobreventa que un inspector marca, y es el mismo tipo de exageración que el propio plan corregía con acierto respecto a las tablas de multiplicar.)*

**Redacción definitiva, literal en §16, en `docs/guia-del-maestro.md` y en el panel del adulto:**

> **«Los mensajes de acierto y de ánimo no son decoración: son el ANDAMIAJE con el que el juego apoya las conductas que describen los criterios 7.1 («Reconocer las emociones básicas propias al abordar retos matemáticos, pidiendo ayuda solo cuando sea necesario») y 7.2 («Expresar actitudes positivas ante retos matemáticos, valorando el error como una oportunidad de aprendizaje»). Esos criterios se evalúan EN EL ALUMNO y en el aula, no en la aplicación. Cubomática NO evalúa ni acredita la competencia específica 7.»**

Lo que sí corresponde al bloque F y sí está implementado: el **momento socioafectivo** al final de la partida, la **normalización del error** (una sola consecuencia, segundo intento que suma, pantalla de fin sin recuento de fallos) y el trabajo **por turnos** (v2, «dos picos»).

---

## 17. Panel para familias y maestros

### 17.1 Puerta parental: barrera de LECTURA, no de cálculo

La puerta v1 era «una multiplicación de dos cifras (p. ej. 14 × 7)» —que además es de dos cifras **por una**— **en un juego cuyo módulo estrella es la multiplicación**. Un niño motivado que ha practicado la tabla del 7 y sabe sumar 70+28 la atraviesa; y el mensaje implícito es perverso: *«lo que aprendes aquí sirve para entrar donde no debes.»*

```
PUERTA PARENTAL DEFINITIVA
  «Escribe el resultado de: trescientos cuarenta y siete menos ciento ochenta y nueve»
  → El numeral va ESCRITO EN LETRA: es barrera de LECTURA además de de cálculo.
    Un niño de 2.º no descodifica ese numeral ni resuelve la resta llevando de 3 cifras.
  → Sin límite de intentos y sin bloqueo temporal (un adulto con prisa que falle dos
    veces no debe quedarse fuera).
  → Botón «Otra operación». La operación es siempre distinta.
  → NUNCA aparece una tabla de multiplicar en la puerta: no se cruza la barrera con
    el contenido que el juego enseña.
BORRADOS (perfil o todos los datos): además de la puerta, escribir la palabra BORRAR
  en un campo de texto.
```

Sin registro, sin correo, sin servidor.

### 17.2 Informe individual — las 10 métricas obligatorias

| # | Métrica | Detalle |
|---|---|---|
| 1 | **Resumen de sesiones** | Fecha, duración, modo, mundo, niveles completados, preguntas totales |
| 2 | **Precisión global y por tema** | **En grande: «Resuelve 87 de cada 100»** (`precisionTotal`, la que refleja el aprendizaje tras la reparación). **En letra pequeña y solo en la vista detallada: «a la primera: 73 %»** (`precision1er`). Por tema: suma sin llevar, suma llevando, resta sin llevar, resta llevando, valor posicional, dinero, cada tabla por separado, problemas |
| 3 | **🎯 Precisión POR ESTRUCTURA SEMÁNTICA** | Matriz de los **20 subtipos** con intentos, aciertos y %. **El dato que un maestro puede usar el lunes siguiente.** No computan los ítems servidos en formato `opciones` (§9.5) |
| 4 | **Tiempo medio por tema frente al `t_ideal`** | Barra: por debajo / en torno / muy por encima. **En problemas, sin el tiempo de lectura** (§11.4) |
| 5 | **Semáforo de destrezas** | Ver criterio endurecido abajo |
| 6 | **«En qué está trabajando ahora»** | Los 3 conceptos con más margen, con **3 ejemplos literales fallados** cada uno y la **actividad manipulativa sugerida** |
| 7 | **Evolución en 8 semanas** | Línea de `precisionTotal` + línea de tiempo medio |
| 8 | **Uso de pistas (%), respuestas relámpago y tasa de detecciones de azar** | Para poder ajustar `T_MIN` con datos reales |
| 9 | **Días jugados, racha y tiempo de pantalla por día** | Y **media agregada de ánimo** de las últimas 8 sesiones, **sin fechas y sin detalle** |
| 10 | **Recomendación en lenguaje llano** | Generada de los datos. Ejemplo real: *«Domina la tabla del 2 y del 5. Le cuestan las restas llevando (48 % de aciertos, 14 s de media). Sugerencia: 5 minutos al día en modo Cantera Tranquila y practicar con objetos reales el cambio de decena.»* |

**Métrica 6, renombrada.** «Top 3 conceptos flojos» era una **etiqueta despectiva sobre un niño de 7 años, impresa en A4** y potencialmente enseñada al propio niño. Basta con que el padre lea «flojo» en voz alta para deshacer todo el trabajo socioafectivo del juego. **Prohibido en todo el panel, el CSV, la impresión y `docs/`:** `flojo`, `débil`, `retraso`, `por debajo`, `suspenso`, `nivel bajo`.

**Métrica 5, criterio de «dominada» endurecido.** El umbral v1 («≥90 % y RT < t_ideal») se alcanzaba **dentro de una única sesión**: acertar 9 de 10 seguidos la misma tarde es efecto de calentamiento, no dominio, y contradecía el propio modelo de memoria del plan.

| Estado | Criterio |
|---|---|
| 🟢 **dominada** | `precision1er ≥ 90 %` **y** RT mediano < `t_ideal` **y** `n ≥ 12` **y** evidencia en **≥2 sesiones de días distintos separadas ≥48 h** **y** `estabilidadDias ≥ 7` |
| 🟡 afianzada | `precision1er ≥ 75 %` (o dominada sin las dos sesiones) |
| 🟠 aprendiendo | `n ≥ 1` y `precision1er < 75 %` |
| ⚪ sin practicar | `n === 0` |
| 🌿 **oxidada** | Era afianzada/dominada y `R < 0,6` |
| 🔒 bloqueada | Prerrequisitos no cumplidos |

**Leyenda literal obligatoria:** *«El semáforo se calcula con los aciertos A LA PRIMERA.»*

**Métrica 9, la carita.** En cuanto el niño intuye que su padre ve la carita de cada sesión, deja de responder con sinceridad, y el dato pierde valor a la vez que introduce vigilancia emocional. Por eso **el panel muestra solo una media agregada de las últimas 8 sesiones, sin fechas y sin detalle**: *«las últimas semanas: mayoría de caras contentas.»*

### 17.3 Honestidad diagnóstica

**Cabecera obligatoria del informe, literal, en pantalla y en papel:**

> **«Esto es una herramienta descriptiva, no una nota.** Sirve para ver en qué está trabajando el niño y qué le está costando. No compara con otros niños ni mide su capacidad.»
>
> **«Este informe es para la persona adulta. No hace falta enseñárselo al niño ni comentar los porcentajes con él.»**

**Reglas:**

- El informe **solo acumula evidencia de ítems discriminantes** (§13.10).
- Si una destreza tiene **menos de 8 respuestas**: **«Evidencia insuficiente: hacen falta más partidas para saberlo»**, en vez de inventar una causa.
- Si dos códigos empatan, se muestran **ambos**: *«Podría estar restando la cifra menor de la mayor, o pidiendo prestado sin decrementar la decena. Los próximos ejercicios lo aclararán.»*
- **No hay percentiles**, no hay media de clase visible por defecto, no hay nota.
- El panel indica **qué NO mide Cubomática**: los bloques B, C, D y E (§1.3) y la competencia específica 7 (§16.8).

### 17.4 Informe A4 imprimible — coste 0 KB

`window.print()` + `css/08-imprimir.css`. **Sin `jsPDF` (≈280 KB) ni `html2canvas`.** El adulto imprime o elige «Guardar como PDF» en el diálogo del navegador.

```css
@media print{
  @page{ size: A4; margin: 12mm; }

  /* v1 usaba :not(#p-adulto), lo que obligaba a que el informe VIVIERA dentro del
     panel; pintado en su propia sección, la impresión salía en blanco.            */
  #app > section:not(.imprimible){ display:none !important; }
  .hud, .nav, .btn-bloque{ display:none !important; }

  body{ background:#fff; color:#000; font-family: Verdana, sans-serif; font-size:11pt; }
  .informe{ display:block; }
  .informe h1{ font-size:16pt; }
  .informe table{ width:100%; border-collapse:collapse; }
  .informe thead{ display:table-header-group; }   /* la cabecera se repite por página */
  .informe tr{ page-break-inside:avoid; }         /* v1 lo ponía en la TABLA entera:
                                                     una tabla de 20 subtipos más alta
                                                     que un A4 se saltaba o se cortaba */
  .informe td, .informe th{ border:1px solid #000; padding:3pt 5pt; }
  .semaforo{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .salto{ page-break-before: always; }
}
```

**El semáforo nunca se imprime solo con color** (una impresora en blanco y negro lo destruiría, justo en el soporte donde el color puede no existir): junto al color va **siempre** una columna de texto —*Dominada / Afianzada / Aprendiendo / Sin practicar / Oxidada / Bloqueada*— y un símbolo: **● ◐ ○ · ◍ ✕**.

### 17.5 Los 24 códigos de error → frase llana → actividad manipulativa

`datos/recomendaciones.js`. **CU8 exige que este conjunto de claves sea idéntico al de `CB.ERRORES` y que ninguna frase ni actividad esté vacía.**

| # | Código | `simular` | Frase para el adulto (lenguaje llano) | Actividad manipulativa de 10 minutos |
|---|---|---|---|---|
| 1 | `E-S-LLEV-OLV` | sí | «Suma bien las unidades pero se le queda la llevada por el camino.» | «Que escriba la llevada como un bloquecito de verdad encima de la columna, y que la señale antes de sumar las decenas.» |
| 2 | `E-S-LLEV-ESCR` | sí | «No lleva y escribe las dos sumas parciales seguidas: en 56 + 78 escribe **1214**.» | «Con hueveras de 10: no caben 14 huevos en una huevera, hay que llenar una y empezar otra.» |
| 3 | `E-S-LLEV-DOBLE` | sí | «Lleva bien a las decenas pero además escribe el 14 entero: en 56 + 78 escribe **1314**.» | «Tapa el resultado de las unidades con el dedo: solo puede quedar UNA cifra debajo de esa columna.» |
| 4 | `E-S-COL` | sí | «Desalinea las columnas: suma las decenas de uno con las unidades del otro.» | «Papel cuadriculado y una casilla por cifra. Que alinee siempre por la derecha.» |
| 5 | `E-S-CONT` | sí | «Cuenta de uno en uno con los dedos y se le va un número.» | «Contar “a partir del mayor”: para 8 + 3, empezar en 8 y dar 3 saltos, no contar los 8.» |
| 6 | `E-R-INV` | sí | «Cuando arriba hay un número más pequeño que abajo, le da la vuelta a la columna en vez de pedir prestado. En 63 − 28 hace 8−3 y responde 45.» | «Cinco minutos con regletas o palillos en manojos de 10: **que deshaga físicamente un manojo** antes de restar. Hazlo tú primero, en voz alta.» |
| 7 | `E-R-NODEC` | sí | «Pide prestado pero se olvida de quitarle una a la decena.» | «Tapa la decena con el dedo mientras deshace el manojo y pregúntale: “¿cuántas decenas te quedan ahora?”.» |
| 8 | `E-R-CEROMIN` | sí | «Con un cero en el minuendo se bloquea o inventa un resultado.» | *(Solo aparece con `restasDobleLlevada` activo.)* «Tres cajas C-D-U: para sacar de la caja vacía hay que ir antes a la de al lado.» |
| 9 | `E-N-VALPOS` | sí | «Confunde la cifra con su valor: dice que el 4 de 246 vale 4.» | «Ábaco o monedas: el 4 de 246 son 4 monedas de 10 €, no 4 monedas de 1 €.» |
| 10 | `E-N-CERO` | sí | «El cero de en medio le desaparece: escribe 76 en vez de 706.» | «Tres cajas etiquetadas C, D, U. La de las decenas se queda **vacía pero sigue estando ahí**.» |
| 11 | `E-N-ORDEN` | sí | «Compara por número de cifras o por la última cifra: dice que 19 es mayor que 91.» | «Dos torres de bloques, decenas primero. Que compare las torres de decenas antes de mirar las unidades.» |
| 12 | `E-N-SERIE` | sí | «Rompe la serie al cambiar de decena: 28, 38, 48… y se para o salta.» | «Tabla del 100 impresa: que baje con el dedo por la columna. Todos los de la columna acaban igual.» |
| 13 | `E-N-ORDINAL` | sí | «Confunde el ordinal con el cardinal: para “el tercero” cuenta tres.» | «Fila de 8 muñecos: “dame el tercero” frente a “dame tres”. Repetirlo hasta que se ría.» |
| 14 | `E-P-PALCLAVE` | sí | «Ve la palabra “menos que” y resta, aunque el problema pida sumar.» | «Dibujad juntos las dos barras con bloques antes de tocar nada. Pregunta siempre: “¿quién tiene más?”.» |
| 15 | `E-P-TODOSDATOS` | sí | «Usa todos los números del enunciado, aunque alguno no haga falta.» | «Subrayad con lápiz los datos que sí sirven y tachad los que no, antes de operar.» |
| 16 | `E-P-INICIAL` | sí | «Cuando no sabe cuánto había al principio, hace la operación directa en vez de la contraria.» | «Contadlo al revés con objetos: quitad lo que le dieron y ved cuántos quedan.» |
| 17 | `E-P-OPINV` | sí | «Elige la operación contraria a la que pide el problema.» | «Antes de operar, que diga en voz alta: “¿va a quedar MÁS o MENOS que al principio?”.» |
| 18 | `E-P-IGUAL` | sí | «Confunde igualar con comparar: dice la diferencia cuando le piden cuánto hay que añadir.» | «Dos torres de bloques: “¿cuántos le faltan a esta para ser igual?”. Que los coloque de verdad.» |
| 19 | `E-M-SUMA` | sí | «Confunde multiplicar con sumar: dice que 3 × 4 = 7.» | «Colocad 3 filas de 4 fichas y contadlas todas. Que vea que 3 × 4 son **tres veces cuatro**.» |
| 20 | `E-M-VECINO` | sí | «Se le va a la fila de al lado de la tabla: 7 × 8 le da 63.» | «Cantad la tabla saltando de 7 en 7 con los dedos, sin recitar el resultado suelto.» |
| 21 | `E-M-ORDEN` | sí | «Invierte el papel de los factores al dibujar: para 3 × 4 pinta 4 filas de 3.» | «Que coloque las fichas mientras dice “tres filas… de cuatro”. Comprobad que salen los mismos 12.» |
| 22 | `E-M-CERO` | sí | «Con el 0 o el 1 duda: dice que 5 × 0 = 5.» | «Cinco platos vacíos: “¿cuántas galletas hay en total?”. Ninguna.» |
| 23 | `E-E-CUENTA` | sí | «Cuenta cuántas monedas hay, no cuánto valen.» | «Con monedas de verdad: 3 monedas de 2 € valen más que 4 de 1 €. Que lo compruebe.» |
| 24 | `E-E-MEZCLA` | sí | «Suma monedas y billetes como si todos valieran lo mismo.» | «Separad en dos montones, monedas y billetes, y contad cada montón por su valor.» |

**Los 6 códigos con `diagnostico:false`** (sin `simular`, porque simular un error numérico no tiene sentido en esos bloques) son de vocabulario, estimación y ordenación: `E-V-TERM` («confunde sumando con suma»), `E-V-COMP`, `E-V-ORD`, `E-A-ESTIM`, `E-A-ORDENAR`, `E-A-BALANZA`. **Tienen frase llana y actividad**, pero el informe **no emite hipótesis** sobre ellos (§13.9).

> **Nota sobre `E-S-LLEV-ESCR`.** El plan v1 describía «escribe las dos sumas parciales seguidas» y daba **1314** como ejemplo. Las sumas parciales de 56+78 sin llevar son 12 y 14 → **1214**. Para llegar a 1314 hay que aplicar la llevada a las decenas (5+7+1=13) **y además** escribir el 14 entero: es **otro bug**. Con la especificación v1, el simulador habría generado uno y la frase del informe habría descrito el otro, y **el maestro habría trabajado el error equivocado**. Por eso ahora son los códigos 2 y 3, separados.

### 17.6 Ficha de refuerzo en papel

Botón **«Ficha de refuerzo»**: genera un A4 imprimible con **10 ítems del tipo fallado**, generados por el mismo motor, **sin soluciones** (van en una segunda hoja). Sección con `class="imprimible"`.

**Justificación, sin forzar la norma.** El criterio **4.2** de primer ciclo dice literalmente *«Emplear herramientas tecnológicas adecuadas, de forma guiada, en el proceso de resolución de problemas»* — se cita **entre comillas, con su código y su ciclo**, y no se dice que el juego lo «cumpla». La ficha en papel es, además y sobre todo, **una decisión pedagógica del proyecto: convierte el diagnóstico en trabajo manipulativo y de lápiz, que es como el maestro lo va a usar.**

### 17.7 Vista de aula (v1 reducida, v2 completa)

- Tabla de hasta 30 alumnos con precisión por bloque. **Las comparaciones entre alumnos están OCULTAS por defecto.**
- **v2:** `agrupamientoPorError()` — agrupa a los alumnos que comparten el mismo código de error y propone una actividad manipulativa común de 10 minutos.

### 17.8 Ajustes reservados al adulto

- Activar **tablas 6-9** · activar **céntimos** · activar **restas de doble llevada** · activar división como reparto (v2).
- **Ajustar punto de partida** (el antiguo selector de trimestre, §7.2).
- Fijar **límite duro de sesión** (10/15/20/30 min) — **nunca interrumpe un ítem ni un jefe** (§3.6).
- Forzar modo **«Sin prisa»** para un alumno concreto.
- **«No puntuar la velocidad en problemas»** para un alumno concreto (§11.4).
- Activar **modo aula** (30 perfiles) · activar **modo proyección** · **reactivar la hilera de tiempo en vivo** (solo en proyección/aula).
- **Conmutar el motor adaptativo a la regla simple sin Elo** (depuración).
- **Aplicar ajustes a todos los perfiles** (acción explícita, §15.2).
- **Ver la semilla reproducible** de cualquier pregunta y **«Reproducir esta pregunta»** (§20 mejora 11).

### 17.9 Exportación y borrado

**Exportar perfil (.json)** · **Exportar informe (.csv)** · **Imprimir informe A4** · **Ficha de refuerzo** · **BORRAR ESTE PERFIL** · **BORRAR TODOS LOS DATOS** (puerta parental + escribir `BORRAR`).

Aviso visible: *el progreso vive solo en este navegador; haz una copia si cambias de ordenador.*

Bajo `file://` funciona: `Blob` + `URL.createObjectURL` + `<a download>` para exportar; `<input type="file">` + `FileReader` + validación de §15.8 para importar.

---

## 18. Plan de implementación por fases

> **REGLA DE ORO:** no se toca ni un píxel de interfaz hasta que `/pruebas/pruebas.html` esté en verde en F1, F2 y F3.
>
> **REGLA CERO (nueva):** antes de F0 hay que cerrar en `docs/decisiones.md` los **cinco documentos** que el plan v1 no tenía y sin los cuales cualquiera que implemente tendrá que inventar más de veinte decisiones sobre la marcha: **(1)** la fórmula de puntuación con su tabla de 30 casos → **§11**; **(2)** la tabla de `t_ideal`/`t_limite`/`betaBase`/`puntosBase` de los 92 niveles → **§8**; **(3)** el esquema de claves y la migración → **§15**; **(4)** la lista de las 17 pantallas con sus ids → **§14.3**; **(5)** la regla de luces/tiempo/azar en una sola redacción → **§12.1**. **Los cinco están cerrados en este documento.** Se copian a `docs/decisiones.md` como F-1.

| Fase | Duración | Entregable | Criterio de «HECHO» (verificable) |
|---|---|---|---|
| **F-1 — Decisiones cerradas** | 1 h | `docs/decisiones.md` con los 5 documentos de la Regla Cero copiados de este plan | Los 5 apartados existen y ningún valor está marcado «por definir» |
| **F0 — Andamiaje y blindaje legal** | 5-7 h | `index.html` con las **17 `<section hidden>`** y los **43 `<script src>`** en orden; `css/01-variables.css` (paleta, escala `--e1..--e6`, tamaños `--tam-*`, los dos grupos `--bg-texto-*`/`--deco-*`); `02-base.css`; `03-componentes.css`; `js/00-nucleo.js` (incl. `hoyISO`, `diasEntre`, `ahora`, `CB.LEGAL.AVISO`); `js/31-pantallas.js`; `window.onerror`/`unhandledrejection` + pantalla `p-error`; `AVISO-LEGAL.txt`; `README.md`; `LEEME.txt`; `servir.command`/`servir.bat`; `pruebas/auditar.sh`+`auditar.bat`; `pruebas/casos-carga.js`; `pruebas/casos-contraste.js` | Se abre con **doble clic**; se navega Portada → Mapa → Partida con botones que se hunden 4 px; **ni un `border-radius`, ni una sombra con desenfoque, ni una transición suave**; `auditar.sh` devuelve **0 coincidencias**; `casos-carga.js` verde (43 scripts, 17 secciones); `casos-contraste.js` verde; `servir.command` abre **el juego**, no un listado de directorio |
| **F0.5 — Pilotaje de papel (NUEVO)** | 2 h | Maquetas impresas de: pantalla de calibración, HUD de partida, tarjeta de reparación y pantalla de fin | **3 niños de 2.º, 20 minutos.** Comprueba UNA sola cosa: **¿entienden qué hay que tocar sin que nadie les diga nada?** *Es la prueba que puede ahorrar la mitad de los defectos de una auditoría, y cuesta 2 horas en vez de 100.* |
| **F1 — Motor puro y sus tests** | 10-12 h | `20-puntuacion.js`, `21-antiazar.js`, `22-vidas.js`, `23-adaptativo.js`, `24-logros.js`, `25-mensajes.js`, `27-repaso.js`, `28-memoria.js`, `29-grafo.js`, `2A-escalera.js`. **Cero DOM, cero `Math.random`.** `casos-formulas.js` y `casos-motor.js` | Los **30 casos de §11.7** dan el valor exacto (140, 140, 140, 120, 100, 60, 60, 48, 0, 0, 120, 85, 85, 85, 112, 80, 48, 154, 110, 66, 44, 140, 100, 60, 224, 160, 96, 64, 126, 98) **y las 6 aserciones A1-A6**; **ningún valor negativo en ninguna salida**; el **niño sintético independiente** (§19.1) converge entre 75 % y 92 % en los tres perfiles; **ninguna partida simulada termina antes del ítem 10**; **<5 %** de partidas apagan las 3 luces antes del ítem 8; el grafo es **acíclico** y todo nodo alcanzable; **timeout y azar nunca apagan luz**; **ningún acierto se marca como azar** (garantizado por la primera línea de `evaluar`); los 3 logros que dan luz son alcanzables en una partida simulada |
| **F2 — Contenido y generadores** | 14-16 h | `datos/curriculo-rd157.js`; `js/17-catalogo.js` (los **92 niveles del anexo §8.3** con `curriculo{}`, `prerrequisitos[]`, `destreza`, `cardinalidad`, `retoBonus`, `ampliacion`, `trimestreSugerido`); `10-`, `11-`, `12-`, `13-`, `15-`, `16-gen-*.js`; `18-distractores.js` con los **24 códigos** y `diagnosticar()`; `casos-generadores.js` y `casos-curriculo.js` | **92.000 generaciones (< 8 s)** cumplen los **12 invariantes** de §19.1; en modo exhaustivo, 920.000 en **< 90 s por lotes** sin congelar la pestaña; **`casos-curriculo.js` verde en las 8 comprobaciones CU1-CU8**; contraejemplo explícito: **100.000 ítems de multiplicación con el flag apagado y ningún factor en {6,7,8,9}**; ninguna resta `ampliacion:false` con más de una llevada ni con cero en columna de préstamo |
| **F3 — Problemas de enunciado** | 12-14 h | `14-gen-problemas.js` con las **20 plantillas**, `siguienteSubtipo()` por **deuda PONDERADA**, `validar()` → `{ok, motivos}`, `PROBLEMAS_SEGUROS`; `datos/nombres.js`, `objetos.js`, `vocabulario.js`; `casos-problemas.js` | El producto cartesiano **20 × 60 = 1.200 combinaciones** pasa el validador al **100 %** (≤3 frases con la 3.ª interrogativa de ≤7 palabras, ≤12 palabras/frase, ≤25 totales, ≤2 datos necesarios, ≤34 caracteres/línea, sin subordinación, con tildes, sin sujeto repetido, vocabulario en lista blanca); `resolver()` coincide con un recálculo independiente en los 20 subtipos; **reparto por género 50/50 ±1 en 200 generaciones con bolsa** y 50 % ±4 pp en 5.000; **cada subtipo produce ≥400 enunciados distintos**; **el reparto de subtipos en 40 partidas simuladas es proporcional a los pesos 3/2/1 (±10 %)**; `medirLineas()` coincide con el validador |
| **F4 — Arte generado por código** | 8-10 h | `02-texturas.js` (8 texturas), `03-sprites.js` (**24 entradas de caché**), `05-animaciones.css`, `06-biomas.css` con las dos capas del cielo, fuente pixel base64 en `00-fuentes.css`; `casos-fuente.js` | El juego **parece un mundo de cubos**; **ni un `.png` ni un `.woff2` suelto**; **arranque < 600 ms en Chromebook 2019**; el pool de 24 divs de partículas **no genera tirones** (medido con perfilador, cifra anotada en `decisiones.md`); **`casos-fuente.js` verde**: los 24 glifos `ÁÉÍÓÚÜÑáéíóúüñ¿¡«»€` presentes; la fuente carga bajo `file://` en **Chrome, Firefox y Safari** (verificado aquí, no al final); el cielo se ve en las dos capas |
| **F5 — Bucle jugable vertical (M1)** | 11-13 h | `40-partida.js` (game loop con presupuesto de tiempo, cuota de bloques, `pausar/reanudar/reanudarGuardada`), `30-ui.js`, `32-componentes.js` (los 7 componentes + `selectorDatos`), `26-reparacion.js` con los 6 explicadores y la **puerta de interacción**, `04-audio.js` (11 efectos), `01-almacen.js` completo | Partida completa de principio a fin; **construcción visible de 800 ms** con «toc» al tocar antes, y el cronómetro arranca después; **1.er fallo = pista sin luz; 2.º fallo = tarjeta de reparación que solo se habilita tras los 3 toques, con salvavidas a los 25 s**; **el tiempo agotado nunca apaga luz, ni el primero ni ninguno**; acierto en 600 ms se premia con 140 puntos y **jamás se marca azar**; **Gluglú y Rocarr tienen tratamiento visual y sonoro claramente distintos**; al salir se guarda todo y al volver se restaura la partida en curso; **CRITERIO DE COMPRENSIÓN: 2 de cada 3 niños de 2.º completan el primer ítem, el primer fallo y la primera tarjeta de reparación SIN que el observador diga una sola palabra** |
| **F6 — Mensajes, logros, fin y Mapa de Destrezas** | 10-12 h | `datos/mensajes.js` (84 = 4×21, y 48 = 2×24), `25-mensajes.js` con **4 bolsas persistidas**, `24-logros.js` (los 10 de v1, 3 de ellos concesores de luz), pantalla `p-fin`, `43-mapa-destrezas.js`, `42-jefes.js` con las 4 mecánicas, los **5 micro-descansos** y el **bloque raro** | **40 minutos de juego seguidos sin ver dos veces el mismo mensaje**; `casos-mensajes.js` verde en las **10 comprobaciones M1-M10** (84 y 48 exactos, 21 por categoría, 0 elogios de persona, 0 registro impropio, ≥20 de procedimiento, motes limpios); el Mapa de Destrezas **muestra por defecto solo el mundo actual (12-24 vetas)** con las 2-3 de la frontera destacadas y «Ver toda la cantera» como vista secundaria; **cada jefe usa una mecánica distinta y NINGÚN jefe apaga luces**; **CRITERIO DE COMPRENSIÓN: 2 de 3 niños explican qué hace Gluglú y qué hace Rocarr sin haberlo leído** |
| **F7 — Tablas, dinero, vocabulario y M2-M4** | 10-12 h | Generadores M, E y V integrados; mundos M2, M3 y M4 con sus jefes; distintivo `INICIACIÓN` en M4 con nota tocable | Las **tablas del 2, 5 y 10 entran en el guion por defecto en T3** (requisito 1 cumplido de hecho, no solo sobre el papel); las tablas 3 y 4 aparecen como **AMPLIACIÓN** y **no bloquean el progreso**; las tablas 6-9 **no aparecen sin el flag**; toda multiplicación muestra **matriz + suma reiterada antes que el resultado**; los céntimos no aparecen sin flag; la tasa de acierto simulada se estabiliza entre **80 % y 90 %** |
| **F8 — Accesibilidad, panel y persistencia** | 11-13 h | `06-a11y.js` con el mapa de teclado de §16.5, `05-voz.js` con **lectura guiada a 1 s/palabra**, los 3 modos de tiempo, `prefers-reduced-motion`, `41-panel-adulto.js` con las 10 métricas, puerta parental de lectura, CSV, `08-imprimir.css` + `imprimirInforme()` + `fichaRefuerzo()`, exportar/importar JSON **con validación** | **Se completa una partida entera solo con teclado y con el sonido silenciado**; con `localStorage` bloqueado el juego sigue funcionando y avisa; **ningún acierto ni fallo se distingue únicamente por color**; el informe A4 sale legible en **3 clics**; con voz `es-*` ausente el botón **hace lectura guiada**, no desaparece; un perfil `.json` manipulado **no inyecta nada**; la migración de `fixtures/perfilV1.json` **no pierde ni una gema, ni un logro, ni un cromo** |
| **F9 — Auditoría y entrega** | 6-8 h | Suite completa en verde; `docs/mapa-curricular.md`, `errores-frecuentes.md`, `guia-del-maestro.md`, `decisiones.md`, `licencias/`; revisión visual | **`pruebas/auditar.sh` devuelve 0** en los greps de marca y de frontera (§14.4, §21.1) **y exactamente 2 apariciones de «Mojang» en `AVISO-LEGAL.txt`**; revisión visual: cualquier esquina redondeada, sombra difuminada o transición suave **suspende**; suite exhaustiva de 920.000 ítems en verde; **la carpeta se copia a un pendrive USB, se abre en un Windows sin internet con doble clic y funciona idéntica**; peso total < 900 KB |
| **F10 — Calibración con niños reales** | 2 sesiones | Datos de 10-15 niños de 2.º; recalibración de `t_ideal`, `t_limite` y `betaBase` | Partida media **6-9 minutos**; `precisionTotal` observada **80-90 %**; **<5 %** de partidas apagan las 3 luces antes del ítem 8; **0 falsos positivos** de azar. **Plan B ya escrito:** si la partida media dura <5 min o se apagan las 3 luces antes del ítem 8 → subir el suelo de `M_tiempo` de **0,6 a 0,7** y bajar el umbral de `INTERMEDIO` de 80 % a 70 % |

**Total v1: ≈ 100-120 horas de desarrollo + 1 pilotaje de papel + 2 sesiones de campo.** Las fases F0-F6 ya producen un juego completo y jugable.

---

## 19. Plan de pruebas

### 19.1 Suite automática (`/pruebas/pruebas.html`)

| Fichero | Qué comprueba | Criterio |
|---|---|---|
| `casos-carga.js` | 43 scripts, 17 secciones, espacios de nombre de `CB` | exacto |
| `casos-formulas.js` | Los **30 casos** de §11.7 + las **6 aserciones A1-A6** + `bonoFinal` | Todos verdes, **sin tolerancia** |
| `casos-generadores.js` | **1.000 ítems × 92 niveles = 92.000** (rápido, `<8 s`) / **10.000 × 92 = 920.000** (exhaustivo, `<90 s` **por lotes**) contra los **12 invariantes** | 0 violaciones |
| `casos-problemas.js` | 1.200 combinaciones contra el validador; `resolver()` contra recálculo independiente; género con bolsa; tildes; `medirLineas()` cruzado | 0 infracciones; ≥400 enunciados por subtipo |
| `casos-motor.js` | **Niño sintético independiente** (abajo); DAG acíclico y alcanzable; invariantes de fecha; cuota de 30 perfiles; cuota de bloques del guion; los 3 logros de luz | Ver criterios de F1 |
| `casos-curriculo.js` | Las 8 comprobaciones **CU1-CU8** de §6.3 | 100 % |
| `casos-mensajes.js` | Las 10 comprobaciones **M1-M10** de §14.7 | 100 % |
| `casos-contraste.js` | Ratios WCAG **par a par** sobre las variables CSS calculadas | 0 pares por debajo |
| `casos-fuente.js` | Cobertura de los 24 glifos críticos | 0 `.notdef` |
| `casos-marca.js` | Lista negra en **runtime, sin `fetch`** (`Function.toString()` + `cssRules`); `innerHTML` solo con literales | 0 coincidencias |

**Ejecución por lotes obligatoria:** la suite grande corre en lotes de **2.000 ítems** con `setTimeout(…, 0)` entre lotes, **barra de progreso y resultado parcial visible**. Modo rápido por defecto (`?n=1000`); botón **«Suite larga»** para el exhaustivo. *Sin esto, la pestaña se marca como «no responde» y la suite deja de ejecutarse, que es donde muere la regla de oro del proyecto.*

**Los 12 invariantes de generación:**

| # | Invariante |
|---|---|
| **1** | Todo **operando** y toda **respuesta correcta** en `[0, 999]`. Los **distractores** en `[0, 1999]`, y solo pueden superar 999 si `opcion.codigoError === 'E-S-LLEV-ESCR'` o `'E-S-LLEV-DOBLE'`, marcados con **`intencionado:true`** |
| **2** | Toda resta con resultado **≥ 0** (construida desde el resultado) |
| **3** | Sin decimales, sin negativos y **sin notación de fracción** en ningún ítem (§6.10) |
| **4** | Con `tablas69 === false`, **AMBOS** factores en `{0,1,2,3,4,5,10}`; con el flag, ambos en `{0..10}`. Nunca > 10 |
| **5** | Por formato: `opciones4` → **exactamente 4** opciones únicas, ninguna negativa, la correcta incluida **una sola vez**; `signo` → 2; `balanza` → 3; `teclado`/`ordenar`/`monedas`/`datos` → `item.opciones === null` y `item.respuesta` entero de `[0,999]` |
| **5-bis** | Todo ítem declara un `formato` de la **lista cerrada de 7 valores**: `opciones4, teclado, signo, balanza, ordenar, monedas, datos` |
| **5-ter** | **Ningún distractor es igual a la respuesta correcta** |
| **6** | Distractor plausible: `|distractor − respuesta| ≤ max(20, 0,5 × respuesta)`, **salvo** los marcados `intencionado:true`. **≥2 distractores diagnósticos** solo en ítems con `diagnostico:true` |
| **7** | Enunciado: **≤3 frases** con la tercera interrogativa de **≤7 palabras**, ≤12 palabras/frase, ≤25 totales, ≤2 datos necesarios, **≤34 caracteres/línea**, sin subordinación, con tildes, sin sujeto repetido |
| **8** | Todas las palabras del enunciado en la **lista blanca** |
| **9** | **Marca**: ninguna cadena de la lista negra (§21.1) |
| **10** | En niveles `datoSobrante:true`, el dato sobrante **nunca** combina con un necesario para dar la respuesta correcta |
| **11** | **Ninguna resta `ampliacion:false`** tiene más de una llevada, ni un 0 en columna que requiera préstamo |
| **12** | **Variedad**: en 200 generaciones con semillas distintas, los ítems únicos son ≥ `min(200, 0,8 × cardinalidad)`. Los `item.repaso === true` no cuentan |

**El niño sintético, como modelo INDEPENDIENTE.** Si el simulador respondiera según el mismo modelo logístico que usa `CB.adaptativo` para elegir β, el test sería **tautológico**: la convergencia estaría garantizada por construcción y no probaría nada. Era el criterio de HECHO principal de F1 y no tenía valor diagnóstico.

```
P(acierto) = c + (1 - c - s) · 1/(1 + 10^((β - θ_real)/400))
  c = 0,25 en opciones4    c = 0,02 en teclado     s = 0,10 (desliz)
  θ_real es DESCONOCIDO para el motor, distinto por destreza,
  con deriva de +8 puntos por sesión (aprendizaje) y −3 por día sin práctica (olvido)
  El motor solo ve aciertos y fallos.

Tres perfiles obligatorios:  θ_real = 700 (flojo) · 1000 (medio) · 1400 (avanzado)
Criterio: los tres se estabilizan entre 75 % y 92 %, y ninguno apaga las 3 luces antes
          del ítem 8 en más del 5 % de las partidas.
```

### 19.2 Pruebas manuales de navegador

| Prueba | Cómo | Criterio |
|---|---|---|
| Doble clic `file://` | Chrome, Firefox, Safari, Edge en macOS y Windows | Arranca, la fuente pixel se ve, el audio suena tras JUGAR |
| Suite completa | `servir.command` → `http://localhost:8000/pruebas/pruebas.html` | Todo verde, incluidos los tests que necesitan leer ficheros |
| Pendrive sin internet | Copiar carpeta, abrir en Windows en modo avión | Idéntico comportamiento |
| `localStorage` bloqueado | Safari con configuración restrictiva | Funciona y avisa en el panel del adulto |
| Cuota desbordada | Rellenar 30 perfiles en modo aula | Poda agresiva, reintento, aviso; nunca falla en silencio |
| Sin voz `es-*` | Chromebook sin paquete de voz español | El botón hace **lectura guiada** a 1 s/palabra, no desaparece |
| Rendimiento | Perfilador en Chromebook 2019 y iPad 6.ª gen | 60 fps con partículas; arranque < 600 ms; cifras anotadas |
| Solo teclado | Partida completa sin ratón, **una por cada uno de los 7 formatos** | Se completa en los 7 |
| Solo sin sonido | Partida completa silenciada | Toda la información llega por color + forma + texto |
| Impresión | `window.print()` en Chrome y Safari | A4 legible, 1-2 páginas, sin HUD, semáforo con texto y símbolo |
| Legibilidad de cifras | Lámina con 0-9 y las parejas **6/8, 9/8, 1/7, 3/8** a los tres tamaños | Distinguibles a 50 cm |
| Orientación | Girar a apaisado en móvil de 568×320 | Rejilla 4×1 de 72 px; nada se sale; nunca por debajo de 64×64 |
| Reloj mal puesto | Adelantar el reloj del sistema un año, jugar, volver a ponerlo bien | No se rompe la racha; ninguna fecha futura persiste |

### 19.3 Pruebas con niños reales — protocolo exacto

**Dos momentos, no uno:**

- **F0.5 — pilotaje de papel:** 3 niños, 20 min, maquetas impresas. Antes de escribir la interfaz.
- **F10 — pilotaje jugable:** 10-15 niños de 2.º, **2 sesiones de 20 minutos separadas ≥3 días**.

**Consentimiento de las familias por escrito. No se recogen datos personales**: solo se exportan los CSV locales anonimizados por mote.

**Preparación:** dispositivo con el juego ya instalado, perfil nuevo, modo «Con calma» (por defecto). El observador **no ayuda ni explica** salvo que el niño lo pida explícitamente.

**Hoja de registro (una fila por minuto):**

| Momento | Qué mirar exactamente | Señal de alarma |
|---|---|---|
| **Primeros 60 s** | ¿Pulsa JUGAR sin ayuda? ¿Entiende los 4 ítems de calibración sin metatexto? | Necesita que le lean algo |
| **Primer ítem** | ¿Espera a que se monten los botones o toca antes? ¿Reacciona al «toc»? | Cree que está roto |
| **Primer fallo** | **Lenguaje corporal:** ¿se encoge, suspira, mira al observador? ¿Lee la pista de Rocarr o la salta? | Se retrae, pide salir, dice «no sé» sin intentar |
| **Tarjeta de reparación** | ¿Toca los 3 pasos? ¿Verbaliza el procedimiento? ¿Cuánto tarda en habilitarse «¡Lo pillo!»? | Se queda esperando sin tocar hasta el salvavidas de 25 s |
| **Luz que se apaga** | ¿Reacciona? ¿Cambia el ritmo después? | Deja de intentarlo por miedo a perder luz |
| **Problemas de 3 toques** | ¿Entiende «toca los números que necesitas» sin explicación? ¿Toca el distractor? | No entiende el paso 1 |
| **Enunciados** | ¿Los lee o pulsa el altavoz? ¿Mueve el dedo? ¿Usa «Más despacio»? | Tarda >30 s en 20 palabras y no pulsa el altavoz |
| **Gluglú** | Provocarlo en el minuto 12 pulsando rápido. ¿Se lo toma a broma? | **Se siente acusado** |
| **Micro-descanso** | ¿Lo aprovecha o lo salta? ¿Vuelve con más energía? ¿Repite alguno? | Los salta todos |
| **Bloque raro** | ¿Lo nota? ¿Le hace ilusión el cromo? | Pasa desapercibido |
| **Minuto 15** | ¿Sigue enganchado o mira alrededor? | Pierde el foco antes del minuto 10 |
| **Fin de partida** | ¿Lee «Lo que has dominado hoy»? ¿Qué cara elige y por qué? ¿Pulsa «Otra expedición»? | Elige «me ha costado» y no quiere repetir |
| **Sesión 2** | ¿Recuerda dónde estaba? ¿Nota el musgo? ¿Le motiva restaurarlo? | El musgo le parece un castigo |

**Preguntas al niño al terminar (máximo 5, abiertas):**

1. «¿Qué era lo más difícil?»
2. «¿Qué hace Gluglú?» *(comprueba si la regla implícita se ha interiorizado sin leer)*
3. «¿Y Rocarr?»
4. «¿Qué pasa cuando una veta se pone verde?»
5. «¿Volverías a jugar mañana? ¿Por qué?»

**Métricas a extraer del CSV:**

| Métrica | Objetivo | Acción si falla |
|---|---|---|
| Duración media de partida | **6-9 min** | <5 min → subir suelo de `M_tiempo` a 0,7 |
| `precisionTotal` observada | **80-90 %** | <75 % → bajar `betaBase` de los niveles implicados; >92 % → subirlas |
| % partidas con 3 luces apagadas antes del ítem 8 | **<5 %** | Revisar la escalera anti-frustración (§12.5) |
| Falsos positivos de azar | **0** | Subir `T_MIN` de 700 a 900 ms |
| Tiempo de lectura por palabra en `PROBLEMA_*` | ≤1,5 s | Subir el coeficiente de `t_lectura` de 1,5 a 1,8 |
| % de uso del botón de altavoz | ≥25 % | Si es 0 %, no se está viendo: agrandar |
| % de uso de pista | 15-35 % | Si es 0 %, no sabe que existe o le da vergüenza |
| % de reparaciones con los 3 toques completados | ≥70 % | Simplificar los explicadores |
| Cara elegida tras la 4.ª sesión | ≥80 % «contento» o «normal» | Revisar la dureza de la penalización |

`pruebas/calibrar-beta.js` recalcula `betaBase` de los 92 niveles a partir de la precisión observada y genera el catálogo actualizado.

---

## 20. Mejoras propuestas más allá de lo pedido (requisito 11)

| # | Mejora | Justificación pedagógica | Coste | v |
|---|---|---|---|---|
| **1** | **Mapa de Destrezas** — las vetas del niño en 6 estados, con musgo en las oxidadas. **Por defecto muestra solo el mundo actual (12-24 vetas)** con las 2-3 de la frontera destacadas y el texto «Lo siguiente que puedes cavar»; «Ver toda la cantera» es una vista secundaria | Recompensa **informativa** en lugar de numérica. Antídoto contra el efecto de sobrejustificación: el niño ve crecer su conocimiento, no su marcador. *Presentar 92 vetas de golpe a un niño de 7 años produce parálisis, no competencia percibida: la misma pantalla que pretende sostenerla acaba documentando la incompetencia* | Medio | **v1** ⭐ |
| **2** | **Curva de olvido con estado `oxidado`** | La razón para volver mañana es **honesta**: una veta se ha apagado y repasarla cuesta 2 minutos. Sustituye a la racha que se pierde, patrón oscuro prohibido por el Children's Code | Medio | **v1** ⭐ |
| **3** | **Diccionario de Bloques** — 48 términos de un **glosario propio** con definición ilustrada, coleccionables | Da cobertura al criterio 6.1 («adquiriendo vocabulario específico básico»), que casi ninguna app entrena. Convierte el léxico en colección | Bajo | v1 |
| **4** | **Ficha de refuerzo en papel** generada por el propio motor | Cierra el círculo digital→analógico: 10 ítems del tipo exacto que falla el alumno. **Decisión pedagógica del proyecto** (§17.6) | Bajo | v1 |
| **5** | **5 micro-descansos DISTINTOS de 20 s** (§7.4) | La práctica distribuida supera a la masiva en fluidez de hechos aritméticos. Convierte una necesidad cognitiva (atención de 14-20 min) en recompensa | Bajo | v1 |
| **6** | **El bloque raro** (~1/20 ítems, cromo garantizado) | La sorpresa que hace que merezca la pena el ítem 47. Sin momentos de diversión especificados, un motor psicométrico excelente produce un juego justo, riguroso y **aburrido** | Bajo | v1 |
| **7** | **Reacciones propias de cada criatura** al acierto y al fallo (§5.1) | Personalidad legible sin texto. Un niño debe poder decir qué hace Rocarr sin haber leído nada | Bajo | v1 |
| **8** | **Modo «Cantera Tranquila»** (§3.8) | Salida real para el niño que lo está pasando mal, y la única forma de que la recomendación del informe no sea una promesa vacía | Bajo | v1 |
| **9** | **Modo proyección** para pizarra digital (×1,6, un ítem por pantalla) | Permite usar el juego como actividad de gran grupo de 10 minutos, que es como un maestro lo va a usar en la práctica | Bajo | v1 |
| **10** | **Semilla reproducible visible en el panel del adulto** + botón «Reproducir esta pregunta» | Si un padre dice «la pregunta 7 estaba mal», se reproduce exacta. Herramienta de confianza y de depuración. **Implementable de verdad** porque el `itemId` lleva `@semilla.índice` (§15.3) | Bajo | v1 |
| **11** | **Fase de comprobación** de un toque en los problemas de T3 (§6.11) | Cierra el criterio 2.3, literal: «Describir verbalmente la idoneidad de las soluciones». Distingue «resuelve pero no comprueba» de «no resuelve» | Bajo | v1 |
| **12** | **Minijuego de la Tabla del 100** navegable | Modelo manipulativo de uso extendido en el aula de primer ciclo para visualizar los patrones ±1 y ±10. **Decisión propia del proyecto** (§6.4) | Bajo | v2 |
| **13** | **Modo cooperativo local «dos picos»** (dos niños, mismo dispositivo, por turnos, **sin puntuación comparada**) | Apoya el saber F.2.b, literal: «Participación activa en el trabajo en equipo: interacción positiva y respeto por el trabajo de los demás». Sin ranking ni comparación | Medio | v2 |
| **14** | **«Explica cómo lo has hecho»**: tras acertar un problema difícil, elegir entre 3 explicaciones cuál describe su procedimiento | Apoya el criterio 6.2, literal: «Explicar ideas y procesos matemáticos sencillos, los pasos seguidos». Metacognición con coste de interacción mínimo | Bajo | v2 |
| **15** | **Veta Profunda** — modo sin fin por concepto, con récord de profundidad **personal** | Rejugabilidad para quien ya domina un bloque, sin comparación social. Satisface la necesidad de autonomía | Medio | v2 |
| **16** | **Planos de construcción** que exigen vetas afianzadas además de gemas | Vincula la recompensa estética al aprendizaje real, no al tiempo jugado. Impide farmear el nivel fácil para decorar | Medio | v2 |
| **17** | **Selector de contexto de los problemas** (mercado / huerto / patio / biblioteca / taller) elegido por el niño | Autonomía y variedad narrativa percibida. No confundir cantidad de combinaciones con **sensación** de variedad | Bajo | v2 |
| **18** | **Locución grabada** de las ~60 consignas fijas y los 48 términos | La calidad de `speechSynthesis` en español es muy desigual y el audio es crítico para lectores incipientes y disléxicos. **Rompería el «cero ficheros»**, por eso es opcional y solo si el pilotaje lo exige | Alto | v2 |

---

## 21. Cumplimiento legal, marca y privacidad

### 21.1 Marca registrada: lista negra, alternativas y una regla de entrega que SÍ se puede cumplir

**El fallo lógico de v1:** el grep de marca debía devolver **0 coincidencias** «o el proyecto no se entrega», y el mismo apartado **obligaba** a incluir literalmente *«No está afiliado, patrocinado ni respaldado por Mojang Studios ni por Microsoft»* en README y Créditos, y usaba «Minecraft» decenas de veces en la propia documentación. **La regla de entrega era imposible de cumplir por construcción: el proyecto nunca se podría entregar.**

**Regla de entrega definitiva:**

```
1. El aviso legal vive en UN ÚNICO fichero:  AVISO-LEGAL.txt
   y en UNA ÚNICA constante:  CB.LEGAL.AVISO  (en js/00-nucleo.js)
   README.md y la pantalla de Créditos lo REFERENCIAN / lo INSERTAN desde ahí.

2. docs/ es documentación interna, NO se distribuye con el juego, y lleva esta
   cabecera en cada fichero:  «Documentación interna. No se distribuye con el juego.»

3. La auditoría que bloquea la entrega (pruebas/auditar.sh) es:

   grep -riE '\bminecraft\b|\bcreeper\b|\bsteve\b|\balex\b|\benderman\b|\bmojang\b|\bnetherite\b|\bredstone\b|\bpiglin\b|\bmojangles\b|\bminecraftia\b|[a-z]craft\b' . \
        --exclude-dir=docs --exclude=AVISO-LEGAL.txt --exclude=00-nucleo.js
   → debe devolver 0 coincidencias

   grep -c 'Mojang' AVISO-LEGAL.txt   → debe devolver exactamente 2
                                        (Mojang Studios y una segunda mención)

4. LÍMITES DE PALABRA obligatorios (\b). Sin ellos:
   · 'alex' colisiona con nombres propios españoles legítimos (Alex, y por el -i
     también «Alexia») → el proyecto quedaba bloqueado por su propio datos/nombres.js
   · 'craft' suelto genera falsos positivos en cualquier comentario en inglés
   Y en datos/nombres.js, regla explícita: PROHIBIDOS Alex, Álex, Steve.
   Usar Álvaro, Alba, Aitor, Alma. Documentado en decisiones.md para que nadie
   lo reintroduzca.
```

**Los 14 elementos prohibidos y sus alternativas originales:**

| # | Elemento prohibido | Alternativa original adoptada |
|---|---|---|
| 1 | El nombre de la marca en cualquier sitio | — |
| 2 | Los patrones `-craft` y `Mine-` | **«Cubomática»**, decisión cerrada |
| 3 | El logotipo y su lettering con relieve de piedra | Título en fuente pixel libre sobre panel oscuro |
| 4 | La fuente propietaria del juego original y **sus clones** (incluidos los repos de GitHub que se autoetiquetan OFL: son obras derivadas de un diseño propietario) | **Silkscreen** / **Press Start 2P**, exclusivamente desde `github.com/google/fonts/ofl/`, con su OFL versionado y renombradas a «Bloque Pixel» |
| 5 | Nombres de las criaturas originales del juego ajeno | **Cubi, Chispa, Rocarr, Gluglú, Brasita, Cristalina, Blopi, Tronquete, Chispita, Ranacubo, Vagoneto** (§5.1) |
| 6 | **La cara de la criatura verde** (dos ojos cuadrados negros + boca en zigzag descendente sobre cuerpo moteado): marca figurativa distintiva | **Gluglú es una gota escalonada**, azul, nunca un cubo perfecto, sin boca en zigzag |
| 7 | La skin del protagonista original | **16 avatares de minero propios** por permutación de paleta |
| 8 | Cualquier textura extraída del `.jar` o de un *resource pack* derivado | Texturas generadas por canvas con **PRNG y semilla propia** |
| 9 | El HUD oficial: sus corazones exactos, barra de hambre, barra de experiencia, *hotbar* | **3 luces de cristal de casco propias de 12×12 px** (§3.3) |
| 10 | Nombres de materiales y dimensiones propietarios | **«Cristal del Saber», «Roca Ardiente», «Piedra Musgosa», «Oro Estelar»** |
| 11 | La banda sonora y los efectos del juego original | **11 efectos sintetizados nota a nota** con Web Audio |
| 12 | Capturas o vídeo del juego real como fondo | Diorama propio en canvas |
| 13 | Reclamos tipo «para fans de …» en la ficha o el marketing | «Estética de mundo de cubos» |
| 14 | El pico de diamante como silueta icónica reconocible | Pico propio de 5×5 con mango de madera `#9C6B34` |

> **Tranquilizador y cierto:** la estética voxel/pixel-art de bloques **ES UN GÉNERO y no es protegible**. Lo protegido son los nombres, logotipos, texturas concretas y diseños de personaje. Cubomática puede parecer «de mundo de cubos» sin ningún problema.

**Contenido de `AVISO-LEGAL.txt`, literal:**

> **«Cubomática es un proyecto independiente. No está afiliado, patrocinado ni respaldado por Mojang Studios ni por Microsoft. Todas las marcas registradas pertenecen a sus respectivos titulares.»**

### 21.2 Licencias de terceros

| Recurso | Licencia | Ubicación |
|---|---|---|
| **Silkscreen Regular + Bold** | SIL Open Font License 1.1 | `docs/licencias/OFL-Silkscreen.txt` |
| **Press Start 2P** (alternativa) | SIL OFL 1.1 | `docs/licencias/OFL-PressStart2P.txt` |
| Nota de subseteo y renombrado | — | `docs/licencias/NOTA-SUBSETEO.txt` |
| Texturas | **Generadas por código.** Sin licencia de terceros | — |
| Sonidos | **Sintetizados por código.** Sin licencia de terceros | — |
| Fuente de lectura | Pila del sistema. Sin distribución | — |

`NOTA-SUBSETEO.txt` documenta: **nombre original de la fuente**, el **renombrado a «Bloque Pixel»** que exige el *Reserved Font Name* de la OFL cuando se modifica, y el **comando exacto de subseteo** empleado.

**Regla de proceso:** cualquier recurso de terceros que entre en el proyecto exige guardar **la captura de su página de licencia** en `docs/licencias/` **antes** de añadirlo. Prohibido fiarse del título de una colección: los repositorios de recursos libres mezclan CC0, CC-BY y CC-BY-NC dentro de la misma colección.

### 21.3 Protección de datos (RGPD / LOPDGDD / Children's Code)

Al tratarse de menores de 14 años, la única opción segura es **100 % local, sin red**.

| Compromiso | Implementación |
|---|---|
| **Cero datos personales** | Sin nombre real, apellidos, correo, fecha de nacimiento, ubicación ni foto. Mote de una **lista cerrada de 120** |
| **Cero red** | **Ninguna petición HTTP en tiempo de ejecución.** Sin CDN de fuentes (cargar desde un CDN transferiría la IP de un menor a un tercero), sin analítica, sin telemetría, sin servidor |
| **Cero cuentas** | Sin login, sin registro, sin recuperación de contraseña |
| **Almacenamiento** | Todo en `localStorage` **del dispositivo**. Botón visible **«Borrar todos los datos»** |
| **Sin chat** | No existe ningún canal de comunicación entre usuarios |
| **Sin publicidad** | Ninguna, de ningún tipo |
| **Sin compras** | Sin dinero real, sin moneda premium, sin compras integradas, sin anuncios recompensados |
| **Sin ranking en línea** | Ninguna comparación con otros niños. Los récords son personales. En modo aula, las comparaciones están **ocultas por defecto** |
| **Sin perfilado emocional expuesto** | La carita se agrega y se anonimiza en el tiempo (§17.2 métrica 9) |
| **Portabilidad** | Exportar/importar perfil `.json`, **con validación de entrada** (§15.8) |

**Nota:** si algún día se añadiera un ranking en línea, habría que replantear **todo** el modelo de consentimiento parental. **Queda descartado por diseño.**

### 21.4 Lista negra ética (patrones oscuros prohibidos)

Estándar de *nudge techniques* del Children's Code de la ICO. **No se implementa bajo ningún concepto:**

- ❌ Rachas diarias que se **pierden** (la nuestra se **congela**).
- ❌ Contadores de cuenta atrás para eventos («¡te quedan 2 h!»).
- ❌ Notificaciones push (desactivadas por defecto; si el adulto las activa, máx. 1/día, nunca en horario escolar ni después de las 20:30).
- ❌ Cajas o cofres aleatorios opacos (**los nuestros muestran la lista COMPLETA de premios antes de abrirse** y aplican protección anti-duplicado).
- ❌ Moneda comprable, compras integradas, publicidad.
- ❌ Vidas que se regeneran con el reloj real (muro de espera).
- ❌ Clasificaciones públicas o comparación con otros niños.
- ❌ Autoplay de la siguiente partida.
- ❌ Pantallas que dificulten salir. **«Salir» está visible en todo momento y guarda el progreso íntegro sin preguntar nada, sin diálogo de retención («¿seguro? perderás…») y sin mensajes de culpa.**
- ❌ Perfilar al menor para mantenerlo en la plataforma.
- ❌ **Números negativos y marcadores que bajan** (§11.2).
- ❌ **Iconografía de daño corporal** aplicada al error (§3.3).
- ❌ **Atribución de intención** («estás adivinando») a partir de un umbral estadístico (§12.4).
- ❌ **Etiquetas de valor** sobre el niño en el informe («flojo», «débil») (§17.2).

**Sí se admite empujar hacia el bienestar:** aviso de descanso a los 15 min, «Misión cumplida por hoy» a los 25 min, límite de sesión configurable por el adulto (que **nunca corta a mitad de pregunta**) y guardado permanente.

### 21.5 Rigor curricular (obligación de veracidad)

- **Prohibido** afirmar que el juego «cumple el currículo oficial de 2.º». La fórmula correcta es la de **§1.3**, que declara qué bloques trabaja y **cuáles no**.
- **Prohibido** atribuir al RD una secuenciación por curso o por trimestre: el RD secuencia **por ciclo** (§6.1).
- **Prohibido** citar un criterio o un saber sin comillas, sin código y sin ciclo, y sin que provenga de `/datos/curriculo-rd157.js` (§6.4).
- **Prohibido** citar un decreto autonómico sin número, fecha y boletín, o atribuirle una frase literal que no se haya verificado (§6.4).
- La multiplicación se declara **iniciación**, con la redacción exacta de **§6.5**.
- El juego **no evalúa la competencia específica 7** y así se dice en la guía del maestro (§16.8).
- Todo lo que sea decisión propia del proyecto (los 48 términos, la tabla del 100, la secuenciación por trimestre, los signos `<` y `>`, la lista blanca de vocabulario) va marcado como **decisión propia** y, donde proceda, como **«a confirmar con la programación didáctica del centro»**.
- Test automático `casos-curriculo.js` (§6.3) que hace verificable todo lo anterior.

---

## A. Trazabilidad de requisitos

| # | Requisito explícito del usuario | Sección(es) que lo cumplen | Cómo, concretamente |
|---|---|---|---|
| **1** | **Sumas, restas, repaso de tablas de multiplicar y problemas de sumas y restas** | §1.2, §6.5, §8.3, §9, §3.6 | 16 niveles de suma (S1-S16), 14 de resta (R1-R14), 10 de multiplicación (M1-M10, con las tablas del **2, 5 y 10 como recorrido NUCLEAR del 3.er trimestre**, no opcional) y 20 de problemas de enunciado (P1-P20, uno por estructura semántica). **Cuota obligatoria en `construirGuion`: toda partida de ≥10 ítems sirve ≥2 problemas de enunciado y ≥1 ítem de cada bloque desbloqueado**, verificado en `casos-motor.js`. Sin esa cuota, un adaptativo puro podía dejar al niño 10 sesiones sin ver un problema con texto |
| **2** | **Basado en el currículo oficial de 2.º de la escuela pública española** | §6 completo, §8.3, §19.1 (CU1-CU8) | `/datos/curriculo-rd157.js` con la **transcripción literal verificada** del RD 157/2022 (BOE núm. 52, de 2/3/2022); los 92 niveles declaran saber y criterios que **deben existir en ese fichero** (CU1, CU2) y ser **compatibles con su tipo** (CU3); anexo de los 92 niveles con **rango exacto, llevadas y `trimestreSugerido`**; rango escalonado T1≤199 / T2≤599 / T3≤999; restas de máximo una llevada; sin notación de fracción; dinero conforme al saber A.5 literal. **Alcance declarado con honestidad** (§1.3): bloque A + F transversal, y NO los bloques B, C, D y E |
| **3** | **Muy agradable visualmente y muy divertido** | §4, §5, §10, §7.4, §7.5, §20 | Estética de bloques con reglas duras verificables (§4.2), escala de espaciado `--e1..--e6`, **bocetos ASCII de las 3 pantallas críticas** (§10.6), paleta de 13 materiales, cielo día→noche, texturas y sprites generados por código. Diversión **especificada, no supuesta**: 11 criaturas con reacción propia al acierto y al fallo, **5 micro-descansos distintos**, **bloque raro (~1/20) con cromo garantizado**, 4 jefes con **mecánica propia cada uno**, álbum de cromos y Diccionario de Bloques |
| **4** | **Mensajes de enhorabuena VARIADOS, nunca el mismo repetido** | §14.7, §19.1 | **84 mensajes de acierto = 4 categorías × exactamente 21**, cada categoría con **su propia bolsa barajada persistida** (la v1 elegía por contexto de una bolsa efectiva de 15-20 y repetía). Ningún mensaje se repite hasta agotar su bolsa, y nunca se repite uno de los `ultimos12` globales. **Test M7: 120 aciertos sin repetición dentro de categoría antes del ítem 21. Test M8: 40 minutos de juego sin ver dos veces el mismo mensaje** |
| **5** | **Mensajes motivadores al fallar** | §14.7, §16.8, §12.5 | **48 mensajes de ánimo = 2 categorías × 24**, con bolsa propia. **0 elogios de persona** (M5) y **0 registro impropio** (M6); **≥20 mensajes nombran el PROCEDIMIENTO concreto** («has llevado bien la decena»). Andamiaje declarado de los criterios 7.1 y 7.2, sin afirmar que los evalúa. Además: pista de Rocarr al primer fallo, tarjeta de reparación al segundo y **escalera de 5 escalones** que retira el concepto sin decir nada al 4.º fallo |
| **6** | **Se valora el TIEMPO de respuesta (puntuación por rapidez)** | §11 completo, §3.4 | **Fórmula cerrada** `mT = clamp(1.4 − 0.8·(rt−tI)/(tL−tI), 0.6, 1.4)` con `puntosBase`, `tIdeal` y `tLimite` **tabulados para las 7 familias** (§8.1) y **30 casos exactos verificados** (§11.7). El bono se muestra **como ganancia retrospectiva** («+2 por rapidez»), nunca como cuenta atrás en vivo. **Antifarmeo**: `mT` se calcula siempre con la `d` base, «Sin prisa» vale 0,85 (ni el máximo ni el mínimo) y el récord se guarda por modo. **En problemas NO se cronometra la lectura** (§11.4) |
| **7** | **Se PENALIZA responder al azar / respuestas erróneas** | §12.3, §12.4, §11.1 | **Azar**: 0 puntos, 0 gemas, rompe la racha, no cuenta para logros, sin bono, confirmación de doble toque y bloqueo de 1200 ms en los 3 ítems siguientes, micro-descanso forzado a la 3.ª detección. **Error**: se pierde toda la recompensa del ítem (0 puntos, 0 gemas, sin bono) y, si falla también el segundo intento, se apaga una luz. **Detección**: `azar = !correcto && rt < max(700 ms, 0,15·mediana) && ≥2 señales`, con el invariante «acierto nunca es azar» garantizado por la primera línea de la función. **Sin números negativos y sin atribuir intención al niño** |
| **8** | **Estética tipo mundo de cubos para captar la atención y que no abandonen** | §4, §5, §10, §21.1 | Estética **propia** voxel/pixel-art: `--u:4px`, `border-radius:0` global, sombras duras, transiciones `steps()`, `image-rendering:pixelated`, 8 texturas y 24 sprites generados por código, 4 biomas, cielo día→noche. **Retención medida, no supuesta**: pantalla de fin sin léxico de derrota y con «Otra expedición» a un toque, micro-descansos, bloque raro, Mapa de Destrezas del mundo actual, jefes que siempre se superan. **Sin un solo elemento de la marca ajena** (§21.1, 14 alternativas originales) |
| **9** | **3 vidas; al perder 3 veces, fin de la partida** | §3.3, §12.1, §12.2 | **3 luces de cristal del casco** (no corazones que estallan: §3.3). **Redacción única** de la regla (§12.1): el tiempo agotado y el azar **nunca** apagan luz; solo se apaga al fallar el **segundo** intento tras la reparación; **salvaguarda anti-bloqueo** de 3/6 tiempos agotados que cierra el agujero por el que un niño podía no perder nunca; **3 luces apagadas = fin de la expedición**, conservando el 100 % de gemas y todo el progreso |
| **10** | **Vidas extra conseguibles mediante logros bonus** | §12.7, §12.8 | **Tres logros nombrados que conceden luz, los tres alcanzables dentro de una sola partida**: «Vuelta al pozo» (3 aciertos seguidos tras apagar una luz), «Veta restaurada» (recuperar una destreza oxidada) y «Reto bonus superado». **Máximo 2 luces por partida**, con reglas antifarmeo. Tope de 5 luces; el exceso va a `vidasReserva` (máx. 2) y **nunca se convierte en gemas** (`gemasSustitutas` eliminada de la API). Celebración obligatoria de 1,5 s |
| **11** | **Propuestas de mejora, sin perder la finalidad de aprender divirtiéndose** | §20 (18 mejoras), §6.11, §7.4, §7.5 | 11 mejoras en v1 (Mapa de Destrezas, curva de olvido con musgo, Diccionario de Bloques, ficha de refuerzo, micro-descansos, bloque raro, reacciones de criatura, Cantera Tranquila, modo proyección, semilla reproducible, fase de comprobación) y 7 documentadas para v2. **Todas justificadas pedagógicamente y ninguna a costa del aprendizaje**: no hay moneda comprable, ni ranking, ni cofres opacos, ni racha que se pierde |

---

## B. Decisiones sobre la auditoría

**He aplicado las 49 correcciones críticas y altas y las 29 medias/bajas, y he cubierto las 33 ausencias.** Estas seis son las excepciones, todas por verificación documental contra el texto del BOE.

| # | Corrección de auditoría | Qué he hecho | Motivo |
|---|---|---|---|
| **B1** | *«Dinero: los céntimos son contenido de 2.º; excluirlos deja fuera la mitad del contenido de dinero. Añadir E7 y E8 de céntimos como nuclear.»* | **Aplicada solo en parte.** Separo `MONEDAS`/`BILLETES` (que sí era un defecto real: v1 los mezclaba) y añado E7 y E8, pero **E8 (céntimos) queda como AMPLIACIÓN apagada por defecto** | **Verificado contra el BOE**: el saber A.5 de **primer ciclo** dice literalmente *«Sistema monetario europeo: monedas (1, 2 euros) y billetes de euro (5, 10, 20, 50 y 100), valor y equivalencia»*. Los **céntimos aparecen en el saber de SEGUNDO ciclo** («euros y céntimos de euro»). Declararlos nucleares de 2.º habría sido el mismo error que la auditoría reprocha con las tablas de multiplicar |
| **B2** | *«Eliminar el billete de 100 €: ni se maneja en el aula ni aporta nada.»* | **No aplicada.** Se conserva el billete de 100 € | Está **en el texto literal** del saber A.5 de primer ciclo. Quitarlo sería apartarse de la norma que el proyecto dice seguir. Sí se le da poco peso: aparece en E3 y E4, no en los niveles de pago |
| **B3** | *«El bloque F NO contiene la perspectiva de género; es una misatribución normativa.»* | **Aplicada en la forma, no en el fondo.** Reubico el epígrafe y añado los elementos transversales de la LOMLOE, **pero cito el bloque F porque sí corresponde** | **Verificado**: el saber **F.2.c** de primer ciclo dice literalmente *«Contribución de las matemáticas a los distintos ámbitos del conocimiento humano desde una perspectiva de género»*, y **F.2.a** habla de rechazo de actitudes discriminatorias. La atribución de v1 era vaga, no falsa |
| **B4** | *«El criterio 4.2 es de pensamiento computacional; atribuirle “usar herramientas tecnológicas en el proceso” es forzar la norma.»* | **Aplicada la forma (cita literal, código y ciclo), no la retirada** | **Verificado**: el criterio **4.2 de primer ciclo** dice literalmente *«Emplear herramientas tecnológicas adecuadas, de forma guiada, en el proceso de resolución de problemas»*. La paráfrasis de v1 era exacta. Aun así, ahora se cita entre comillas y **la justificación principal de la ficha de papel es pedagógica, no normativa** |
| **B5** | *«Reducir `CB.ERRORES` a los 12 códigos documentados» (TÉCNICO) vs. «completar la tabla a 24 filas» (CURRÍCULO)* | **Aplico la de CURRÍCULO: documento los 24.** Y aplico el fondo de la de TÉCNICO marcando **`diagnostico:false`** en los 6 códigos donde `simular()` no tiene sentido | Las dos correcciones apuntaban al mismo defecto (alcance no especificado presentado como cerrado). Documentar los 24 lo cierra sin recortar el diagnóstico; marcar 6 como no diagnósticos evita prometer hipótesis imposibles en vocabulario y estimación |
| **B6** | *«Declarar una comunidad autónoma de referencia y citar su decreto.»* | **Aplicada con una variante.** Identifico los dos decretos (**Decreto 106/2022 CV** y **Decreto 211/2022 Canarias**) con número, fecha y boletín, pero **no fijo una comunidad de referencia**: la base declarada es la **estatal** | No dispongo del dato de en qué comunidad se usará el juego, y **no he podido verificar las frases literales** que v1 atribuía a esos decretos. Fijar una comunidad sin ese dato sería inventar. `docs/mapa-curricular.md` incluye «Cómo adaptar la secuenciación a tu comunidad» y **todo lo secuenciado por curso va marcado como decisión propia «a confirmar con la programación didáctica del centro»** |

**Otras dos aclaraciones de forma:**

- **17 secciones en vez de 14.** El plan v1 decía «14 `<section hidden>`» y la propia auditoría exigía una sección `imprimible` para el informe y una pantalla de recuperación de errores. Prefiero un número exacto y verificable (`casos-carga.js`) a un número redondo heredado.
- **43 scripts en vez de 28 o 42.** El recuento del árbol v2 es 7 (datos) + 36 (js) = 43, verificado por `casos-carga.js`.

---

## C. Siguiente paso

**Empieza aquí, en este orden. No abras F0 antes de F-1.**

```bash
cd ruta/al/proyecto

# ── F-1 (1 hora): copiar las 5 decisiones cerradas ────────────────────────────
mkdir -p css js datos pruebas/fixtures docs/licencias

# docs/decisiones.md debe contener, copiadas de PLAN.md y sin ningún «por definir»:
#   1. §11 completo  → fórmula de puntuación + los 30 casos exactos
#   2. §8.1 y §8.3   → puntosBase / tIdeal / tLimite / betaBase y los 92 niveles
#   3. §15.1-§15.5   → claves de localStorage, esquema v2 y migración
#   4. §14.3         → los 17 ids de pantalla
#   5. §12.1         → la regla única de luces / tiempo / azar

# ── F0 (5-7 h): andamiaje y blindaje legal ───────────────────────────────────
# Orden EXACTO de creación de ficheros:
#   1)  AVISO-LEGAL.txt          (2 menciones a Mojang, ni una más)
#   2)  index.html               (17 <section hidden> de §14.3 + 43 <script src> de §14.2
#                                 + <meta viewport> de §2.3, sin maximum-scale)
#   3)  css/01-variables.css     (--u, --e1..--e6, --tam-*, --bg-texto-*, --deco-*)
#   4)  css/02-base.css          (reset, border-radius:0, pixelated, foco oro 4px)
#   5)  css/03-componentes.css   (.panel-bloque 9-slice, .btn-bloque bisel, .luces)
#   6)  js/00-nucleo.js          (CB.util: mulberry32, hash32, BolsaBarajada, clamp,
#                                 mediana, ahora(), hoyISO(), diasEntre(); CB.LEGAL.AVISO)
#   7)  js/31-pantallas.js       (CB.pantallas.ir + pila + Salir siempre visible)
#   8)  js/99-arranque.js        (único DOMContentLoaded + window.onerror + p-error)
#   9)  pruebas/pruebas.html + casos-carga.js + casos-contraste.js
#  10)  pruebas/auditar.sh + auditar.bat
#  11)  README.md (con el párrafo literal de §1.3) + LEEME.txt
#  12)  servir.command + servir.bat

chmod +x pruebas/auditar.sh servir.command

# ── PUERTA DE F0: los tres comandos que deciden si la fase está hecha ─────────
./pruebas/auditar.sh          # → 0 coincidencias de marca y 0 de frontera DOM
open index.html               # → doble clic: Portada → Mapa → Partida, biseles de 4 px
open pruebas/pruebas.html     # → casos-carga (43 scripts, 17 secciones) y
                              #   casos-contraste en VERDE

# ── F0.5 (2 h), antes de escribir una sola línea de interfaz de verdad ───────
# Imprimir en papel las 4 maquetas de §10.6 y llevarlas a 3 niños de 2.º durante
# 20 minutos. Una sola pregunta: ¿entienden qué hay que tocar sin que nadie hable?
# Registrar el resultado en docs/decisiones.md ANTES de empezar F1.
```

**Regla de oro recordada:** después de F0 y F0.5 **no se toca ni un píxel más de interfaz** hasta que F1, F2 y F3 estén en verde. El motor puro (§14.4: cero DOM, cero `Math.random`, cero `toISOString`) es lo que permite simular 10.000 ítems en un test, y ese es el motivo por el que esta arquitectura puede ganar.

---

*Fin del plan maestro v2. **Decisiones cerradas:** nombre «Cubomática»; paleta de 13 materiales; `--u:4px`; fórmula de puntuación con sus 30 casos; sin números negativos; luces del casco en lugar de corazones; `localStorage` con la versión fuera de la clave; 92 niveles con rango, llevadas y trimestre sugerido publicados; multiplicación como iniciación nuclear del 3.er trimestre; alcance curricular limitado y declarado a los bloques A y F. **Cualquier desviación se registra en `docs/decisiones.md` con fecha y motivo.***







