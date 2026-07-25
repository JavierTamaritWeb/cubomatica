#!/bin/bash
# Cubomatica — Plan B para macOS.
# Solo hace falta si el navegador restringe el acceso a file:// o si quieres
# ejecutar la suite completa de pruebas (los tests que leen ficheros del disco).
#
# Doble clic sobre este fichero. Para parar el servidor, cierra la ventana del
# Terminal o pulsa Ctrl+C.

cd "$(dirname "$0")" || exit 1

PUERTO=8000
while lsof -i :$PUERTO >/dev/null 2>&1; do
  PUERTO=$((PUERTO + 1))
done

echo "Cubomatica se esta abriendo en http://localhost:$PUERTO/index.html"
echo "Suite de pruebas: http://localhost:$PUERTO/pruebas/pruebas.html"
echo
echo "Deja esta ventana abierta mientras juegas. Ctrl+C para parar."
echo

# Se abre el JUEGO, no el listado de directorio.
( sleep 1 && open "http://localhost:$PUERTO/index.html" ) &

python3 -m http.server $PUERTO
