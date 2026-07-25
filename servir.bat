@echo off
REM Cubomatica - Plan B para Windows.
REM Solo hace falta si el navegador restringe el acceso a file:// o si quieres
REM ejecutar la suite completa de pruebas (los tests que leen ficheros del disco).
REM
REM Doble clic sobre este fichero. Para parar el servidor, cierra esta ventana.

cd /d "%~dp0"

set PUERTO=8000

echo Cubomatica se esta abriendo en http://localhost:%PUERTO%/index.html
echo Suite de pruebas: http://localhost:%PUERTO%/pruebas/pruebas.html
echo.
echo Deja esta ventana abierta mientras juegas. Ctrl+C para parar.
echo.

REM Se abre el JUEGO, no el listado de directorio.
start "" "http://localhost:%PUERTO%/index.html"

python -m http.server %PUERTO%
if errorlevel 1 py -3 -m http.server %PUERTO%
