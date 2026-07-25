#!/bin/bash
# ============================================================================
# auditar.sh — LA AUDITORÍA QUE BLOQUEA LA ENTREGA (PLAN §14.4 y §21.1)
# ----------------------------------------------------------------------------
# Esta parte SÍ puede leer el sistema de ficheros. La otra mitad
# (pruebas/casos-marca.js) comprueba lo mismo en runtime, con cobertura parcial
# declarada, porque fetch() sobre file:// está bloqueado por CORS.
#
# Uso:  bash pruebas/auditar.sh     (desde la raíz del proyecto o desde pruebas/)
# ============================================================================

cd "$(dirname "$0")/.." || exit 1

FALLOS=0
AYUDA="pruebas/sin-comentarios.py"
verde() { printf '  \033[32m✔\033[0m %s\n' "$1"; }
rojo()  { printf '  \033[31m✘ %s\033[0m\n' "$1"; FALLOS=$((FALLOS+1)); }

echo
echo "Cubomática — auditoría de entrega"
echo "================================="
echo

# ── 1. LISTA NEGRA DE MARCA ────────────────────────────────────────────────
echo "1. Marca registrada"
PATRON='\bminecraft\b|\bcreeper\b|\bsteve\b|\balex\b|\benderman\b|\bmojang\b|\bnetherite\b|\bredstone\b|\bpiglin\b|\bmojangles\b|\bminecraftia\b|[a-z]craft\b'

HITS=$(grep -riE "$PATRON" . \
  --include='*.js' --include='*.css' --include='*.html' --include='*.md' \
  --include='*.txt' --include='*.json' --include='*.sh' --include='*.bat' \
  --include='*.command' \
  --exclude-dir=docs --exclude-dir=.git \
  --exclude=AVISO-LEGAL.txt --exclude=00-nucleo.js --exclude=auditar.sh \
  --exclude=auditar.bat --exclude=PLAN.md \
  --exclude=nombres.js --exclude=casos-marca.js 2>/dev/null)

# nombres.js y casos-marca.js están exentos por la MISMA razón que
# AVISO-LEGAL.txt: son los ficheros que DECLARAN la lista negra. Se comprueba
# aparte que solo la citen para prohibirla, nunca para usarla.
USOS=$(grep -nE "$PATRON" datos/nombres.js pruebas/casos-marca.js 2>/dev/null \
  | grep -viE 'PROHIBIDOS|NEGRA|lista negra')
if [ -n "$USOS" ]; then
  rojo "los ficheros de lista negra la usan fuera de su declaracion:"
  echo "$USOS" | sed 's/^/      /'
fi

if [ -z "$HITS" ]; then
  verde "0 coincidencias de la lista negra fuera de los ficheros exentos"
else
  rojo "coincidencias de la lista negra:"
  echo "$HITS" | head -20 | sed 's/^/      /'
fi

# El aviso vive en UN solo fichero y con un número exacto de menciones
N=$(grep -c 'Mojang' AVISO-LEGAL.txt 2>/dev/null || echo 0)
if [ "$N" -eq 2 ]; then
  verde "AVISO-LEGAL.txt contiene exactamente 2 líneas con «Mojang»"
else
  rojo "AVISO-LEGAL.txt tiene $N líneas con «Mojang» (deben ser 2)"
fi

# ── 2. FRONTERA: el motor y los generadores son PUROS ──────────────────────
echo
echo "2. Frontera de arquitectura"
PUROS="js/00-nucleo.js js/10-gen-numeracion.js js/11-gen-sumas.js js/12-gen-restas.js"
PUROS="$PUROS js/13-gen-multiplicacion.js js/14-gen-problemas.js js/15-gen-dinero.js"
PUROS="$PUROS js/16-gen-vocabulario.js js/17-catalogo.js js/18-distractores.js"
PUROS="$PUROS js/20-puntuacion.js js/21-antiazar.js js/22-vidas.js js/23-adaptativo.js"
PUROS="$PUROS js/24-logros.js js/25-mensajes.js js/26-reparacion.js js/27-repaso.js"
PUROS="$PUROS js/28-memoria.js js/29-grafo.js js/2A-escalera.js"

# Los comentarios se retiran ANTES de grepear: si no, el propio comentario que
# documenta la prohibicion la hace saltar, y el resultado es un test que grita
# contra codigo correcto hasta que alguien lo desactiva.
sincom() { python3 "$AYUDA" "$@"; }

# shellcheck disable=SC2086
HITS=$(sincom $PUROS | grep -nE 'document\.|window\.|localStorage|navigator\.')
if [ -z "$HITS" ]; then
  verde "cero DOM en el nucleo, los generadores y el motor"
else
  rojo "el motor toca el DOM:"
  echo "$HITS" | head -10 | sed 's/^/      /'
fi

# shellcheck disable=SC2086
HITS=$(sincom $PUROS | grep -nE 'Math\.random')
if [ -z "$HITS" ]; then
  verde "cero Math.random: todo aleatorio pasa por el rng inyectado"
else
  rojo "Math.random en el motor (la semilla reproducible seria falsa):"
  echo "$HITS" | sed 's/^/      /'
fi

# shellcheck disable=SC2086
HITS=$(sincom js/*.js datos/*.js | grep -nE 'toISOString')
if [ -z "$HITS" ]; then
  verde "cero toISOString en todo el proyecto"
else
  rojo "toISOString presente (daria el dia anterior despues de las 22:00):"
  echo "$HITS" | sed 's/^/      /'
fi

OTROS=$(ls js/*.js | grep -v 01-almacen)
# shellcheck disable=SC2086
HITS=$(sincom $OTROS | grep -nE "['\"]cubomatica\\.")
if [ -z "$HITS" ]; then
  verde "los literales de clave solo existen en 01-almacen.js"
else
  rojo "literales de clave fuera de 01-almacen.js:"
  echo "$HITS" | sed 's/^/      /'
fi

# ── 3. REGLAS DURAS DE ESTILO ──────────────────────────────────────────────
echo
echo "3. Estilo de mundo de cubos"

# Por la MISMA razon que en el bloque 2: el comentario que documenta la regla
# hace saltar la regla. Un comentario que dice «cero border-radius» suspendia la
# auditoria. Se despiezan los comentarios de CSS antes de grepear.
cssin() { perl -0pe 's{/\*.*?\*/}{}gs' "$@"; }

HITS=$(cssin css/*.css | grep -n 'border-radius' | grep -v 'border-radius: *0' \
  | grep -v 'border-radius:0')
if [ -z "$HITS" ]; then
  verde "ni una esquina redondeada"
else
  rojo "hay border-radius distinto de 0 (suspende la revisión visual):"
  echo "$HITS" | sed 's/^/      /'
fi

# Sombra con desenfoque: 3.er valor distinto de 0 en box-shadow
HITS=$(cssin css/*.css | grep -nE 'box-shadow:[^;]*[0-9]+px +[0-9-]+px +[1-9][0-9]*px')
if [ -z "$HITS" ]; then
  verde "ninguna sombra con desenfoque"
else
  rojo "hay sombras con desenfoque:"
  echo "$HITS" | sed 's/^/      /'
fi

HITS=$(cssin css/*.css | grep -nE 'transition:[^;]*(ease|linear|cubic-bezier)')
if [ -z "$HITS" ]; then
  verde "ninguna transición suave: todo escalonado con steps()"
else
  rojo "hay transiciones suaves:"
  echo "$HITS" | sed 's/^/      /'
fi

# ── 4. CERO ACTIVOS EXTERNOS ───────────────────────────────────────────────
echo
echo "4. Autonomía: cero red, cero binarios salvo la música declarada"

# Cero imagenes y cero fuentes SIGUE siendo absoluto: todo el arte se genera
# por codigo. Lo que cambio con la musica es el audio, y solo el audio.
BINARIOS=$(find . -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \
  -o -name '*.gif' -o -name '*.woff' -o -name '*.woff2' -o -name '*.ttf' \) \
  -not -path './.git/*' 2>/dev/null)
if [ -z "$BINARIOS" ]; then
  verde "cero ficheros de imagen y de fuente"
else
  rojo "hay imagenes o fuentes:"
  echo "$BINARIOS" | sed 's/^/      /'
fi

# La musica es la UNICA excepcion, y es una lista cerrada: nueve ficheros con
# nombre exacto en audio/. Cualquier otro binario de audio, en audio/ o fuera,
# es un fallo. Una excepcion sin lista cerrada deja de ser una excepcion.
PISTAS="calma.mp3 cantera.mp3 jefe.mp3 mundo-bosque.mp3 mundo-mina.mp3"
PISTAS="$PISTAS mundo-pradera.mp3 mundo-rio.mp3 tema-principal.mp3 victoria.mp3"

FALTA=""
for p in $PISTAS; do [ -f "audio/$p" ] || FALTA="$FALTA $p"; done
if [ -z "$FALTA" ]; then
  verde "estan las 9 pistas de audio/ declaradas en js/07-musica.js"
else
  rojo "faltan pistas:$FALTA"
fi

SOBRAN=$(find . -type f \( -name '*.mp3' -o -name '*.wav' -o -name '*.ogg' \
  -o -name '*.m4a' -o -name '*.flac' \) -not -path './.git/*' 2>/dev/null \
  | grep -vE "^\./audio/($(echo "$PISTAS" | tr ' ' '|'))$")
if [ -z "$SOBRAN" ]; then
  verde "ningun fichero de audio fuera de la lista cerrada"
else
  rojo "hay audio no declarado:"
  echo "$SOBRAN" | sed 's/^/      /'
fi

# Cada pista tiene que estar citada en los creditos que VE el usuario. Musica
# de otras personas sin credito visible es justo lo que no se puede entregar.
SINCREDITO=""
for p in $PISTAS; do
  grep -q "$p" js/07-musica.js || SINCREDITO="$SINCREDITO $p"
  grep -q "$p" audio/CREDITOS.txt || SINCREDITO="$SINCREDITO $p(txt)"
done
NCRED=$(grep -cE "clave: '" js/07-musica.js)
if [ -z "$SINCREDITO" ] && [ "$NCRED" -eq 9 ]; then
  verde "las 9 pistas estan en la tabla, en los creditos de pantalla y en CREDITOS.txt"
else
  rojo "credito incompleto:$SINCREDITO (entradas en CB.musica.CREDITOS: $NCRED)"
fi

HITS=$(grep -nE 'https?://' css/*.css js/*.js datos/*.js index.html 2>/dev/null \
  | grep -viE 'boe\.es|localhost|w3\.org|claude|^\s*\*|//\s' | grep -E 'src=|url\(|fetch|XMLHttpRequest')
if [ -z "$HITS" ]; then
  verde "ninguna petición de red en el código"
else
  rojo "hay referencias de red:"
  echo "$HITS" | sed 's/^/      /'
fi

# ── 5. CONTRATO DE CARGA ───────────────────────────────────────────────────
echo
echo "5. Contrato de carga"

NJS=$(ls js/*.js 2>/dev/null | wc -l | tr -d ' ')
NDATOS=$(ls datos/*.js 2>/dev/null | wc -l | tr -d ' ')
NTOTAL=$((NJS + NDATOS))
NHTML=$(grep -c '<script src=' index.html)
NSEC=$(grep -c '<section id="p-' index.html)
NCSS=$(ls css/*.css 2>/dev/null | wc -l | tr -d ' ')

[ "$NTOTAL" -eq 44 ] && verde "44 scripts en disco ($NDATOS datos + $NJS js)" \
                     || rojo "hay $NTOTAL scripts en disco, deben ser 44"
[ "$NHTML" -eq 44 ]  && verde "44 <script src> en index.html" \
                     || rojo "index.html carga $NHTML scripts, deben ser 44"
[ "$NSEC" -eq 17 ]   && verde "17 <section> de pantalla" \
                     || rojo "hay $NSEC secciones, deben ser 17"
[ "$NCSS" -eq 9 ]    && verde "9 hojas de estilo" \
                     || rojo "hay $NCSS hojas de estilo, deben ser 9"

FALTAN=0
for f in $(grep -o 'src="[^"]*"' index.html | sed 's/src="//;s/"//'); do
  [ -f "$f" ] || { rojo "falta el fichero $f"; FALTAN=1; }
done
[ "$FALTAN" -eq 0 ] && verde "todos los scripts referenciados existen"

# ── 5b. VERSIÓN ────────────────────────────────────────────────────────────
echo
echo "5b. Versión"
# CB.VERSION manda. README.md y CHANGELOG.md la repiten para quien lee el
# repositorio sin abrir el juego, y aquí se comprueba que no se han separado:
# un numero de version repetido a mano en tres sitios esta mal en dos de ellos
# en cuanto alguien se despista una vez.
VER=$(grep -oE "CB\.VERSION *= *'[0-9]+\.[0-9]+\.[0-9]+'" js/00-nucleo.js \
  | grep -oE "[0-9]+\.[0-9]+\.[0-9]+")

if [ -z "$VER" ]; then
  rojo "js/00-nucleo.js no declara CB.VERSION con formato x.y.z"
else
  verde "CB.VERSION = $VER (fuente unica)"
  grep -q "Versión $VER" README.md \
    && verde "README.md declara la misma version" \
    || rojo "README.md no dice «Versión $VER»"
  grep -qE "^## \[$VER\]" CHANGELOG.md \
    && verde "CHANGELOG.md tiene la entrada [$VER]" \
    || rojo "CHANGELOG.md no tiene una entrada «## [$VER]»"
  grep -q "Version $VER" LEEME.txt \
    && verde "LEEME.txt declara la misma version" \
    || rojo "LEEME.txt no dice «Version $VER»"
fi

# ── 6. DOCUMENTACIÓN INTERNA NO DISTRIBUIBLE ───────────────────────────────
echo
echo "6. Documentación interna"
SINCAB=$(for f in docs/*.md; do
  head -3 "$f" 2>/dev/null | grep -q 'No se distribuye con el juego' || echo "$f"
done)
if [ -z "$SINCAB" ]; then
  verde "todo docs/*.md lleva la cabecera de no distribución"
else
  rojo "faltan cabeceras en:"
  echo "$SINCAB" | sed 's/^/      /'
fi

# ── 7. PESO ────────────────────────────────────────────────────────────────
echo
echo "7. Peso"
# El presupuesto esta PARTIDO EN DOS desde que hay musica. El tope de 900 KB
# existia para proteger el tiempo de arranque, y eso solo depende del codigo:
# las pistas van con preload="none" y no se leen hasta que suenan. Meter 42 MB
# de mp3 en el mismo saco habria obligado a subir el tope a 60 MB, y con el a
# 60 MB el codigo podria hincharse 70 veces sin que nadie se enterase.
# Solo lo que se DISTRIBUYE: docs/ y PLAN.md son documentacion interna, y du de
# BSD (macOS) no admite --exclude.
BYTES=$(find . -type f \
  \( -path './css/*' -o -path './js/*' -o -path './datos/*' -o -path './pruebas/*' \
     -o -name 'index.html' -o -name '*.txt' -o -name 'README.md' \
     -o -name 'servir.*' \) \
  -not -path './.git/*' -exec wc -c {} + 2>/dev/null | tail -1 | awk '{print $1}')
KB=$((BYTES / 1024))
if [ "$KB" -lt 900 ]; then
  verde "el codigo ocupa ${KB} KB (presupuesto: < 900 KB)"
else
  rojo "el codigo ocupa ${KB} KB, por encima del presupuesto de 900 KB"
fi

MBYTES=$(find audio -type f -name '*.mp3' -exec wc -c {} + 2>/dev/null \
  | tail -1 | awk '{print $1}')
MMB=$((MBYTES / 1024 / 1024))
if [ "$MMB" -lt 60 ]; then
  verde "la musica ocupa ${MMB} MB (presupuesto: < 60 MB)"
else
  rojo "la musica ocupa ${MMB} MB, por encima del presupuesto de 60 MB"
fi

# El README tiene que decir el peso real: quien vaya a repartir el juego en un
# colegio necesita saber ANTES que no cabe en un correo.
# OJO con grep -i 'MB': casa con «nombre» y con «cambia». La primera version de
# esta comprobacion pasaba en verde con un README que no hablaba del peso.
if grep -qE '[0-9]+ MB' README.md 2>/dev/null; then
  verde "README.md avisa del peso de la carpeta"
else
  rojo "README.md no dice cuanto ocupa el juego con la musica"
fi

# ── Resultado ──────────────────────────────────────────────────────────────
echo
if [ "$FALLOS" -eq 0 ]; then
  printf '\033[32m════ AUDITORÍA EN VERDE: el proyecto se puede entregar ════\033[0m\n\n'
  exit 0
fi
printf '\033[31m════ AUDITORÍA EN ROJO: %s comprobaciones fallidas ════\033[0m\n\n' "$FALLOS"
exit 1
