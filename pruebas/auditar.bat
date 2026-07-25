@echo off
REM ===========================================================================
REM auditar.bat - La auditoria que bloquea la entrega, version Windows.
REM Equivalente a pruebas/auditar.sh. Requiere Python 3 en el PATH.
REM ===========================================================================
setlocal enabledelayedexpansion
cd /d "%~dp0.."

set FALLOS=0

echo.
echo Cubomatica - auditoria de entrega
echo =================================
echo.

REM -- 1. Lista negra de marca ------------------------------------------------
echo 1. Marca registrada
set NEGRA=minecraft creeper steve enderman mojang netherite redstone piglin
set ENCONTRADO=0
for %%P in (%NEGRA%) do (
  findstr /S /I /M /C:"%%P" css\*.css js\*.js datos\*.js index.html *.md 2^>nul ^
    | findstr /V /I "AVISO-LEGAL 00-nucleo nombres.js casos-marca PLAN.md" >nul 2>&1
  if !errorlevel! equ 0 (
    echo   [X] aparece "%%P" fuera de los ficheros exentos
    set /a FALLOS+=1
    set ENCONTRADO=1
  )
)
if !ENCONTRADO! equ 0 echo   [OK] 0 coincidencias de la lista negra

for /f %%N in ('findstr /C:"Mojang" AVISO-LEGAL.txt ^| find /c /v ""') do set NMOJ=%%N
if "!NMOJ!"=="2" (
  echo   [OK] AVISO-LEGAL.txt contiene exactamente 2 lineas con "Mojang"
) else (
  echo   [X] AVISO-LEGAL.txt tiene !NMOJ! lineas con "Mojang", deben ser 2
  set /a FALLOS+=1
)

REM -- 2. Frontera de arquitectura -------------------------------------------
echo.
echo 2. Frontera de arquitectura
set PUROS=js\00-nucleo.js js\10-gen-numeracion.js js\11-gen-sumas.js js\12-gen-restas.js js\13-gen-multiplicacion.js js\14-gen-problemas.js js\15-gen-dinero.js js\16-gen-vocabulario.js js\17-catalogo.js js\18-distractores.js js\20-puntuacion.js js\21-antiazar.js js\22-vidas.js js\23-adaptativo.js js\24-logros.js js\25-mensajes.js js\26-reparacion.js js\27-repaso.js js\28-memoria.js js\29-grafo.js js\2A-escalera.js

python pruebas\sin-comentarios.py %PUROS% > "%TEMP%\cb_puros.txt" 2>nul
if errorlevel 1 py -3 pruebas\sin-comentarios.py %PUROS% > "%TEMP%\cb_puros.txt" 2>nul

findstr /R "document\. window\. localStorage navigator\." "%TEMP%\cb_puros.txt" >nul 2>&1
if !errorlevel! equ 0 (
  echo   [X] el motor toca el DOM
  set /a FALLOS+=1
) else (
  echo   [OK] cero DOM en el nucleo, los generadores y el motor
)

findstr /C:"Math.random" "%TEMP%\cb_puros.txt" >nul 2>&1
if !errorlevel! equ 0 (
  echo   [X] Math.random en el motor
  set /a FALLOS+=1
) else (
  echo   [OK] cero Math.random
)

python pruebas\sin-comentarios.py js\*.js datos\*.js > "%TEMP%\cb_todo.txt" 2>nul
if errorlevel 1 py -3 pruebas\sin-comentarios.py js\*.js datos\*.js > "%TEMP%\cb_todo.txt" 2>nul
findstr /C:"toISOString" "%TEMP%\cb_todo.txt" >nul 2>&1
if !errorlevel! equ 0 (
  echo   [X] toISOString presente
  set /a FALLOS+=1
) else (
  echo   [OK] cero toISOString en todo el proyecto
)

REM -- 3. Reglas duras de estilo ---------------------------------------------
echo.
echo 3. Estilo de mundo de cubos
findstr /S /C:"border-radius" css\*.css | findstr /V /C:"border-radius: 0" | findstr /V /C:"border-radius:0" >nul 2>&1
if !errorlevel! equ 0 (
  echo   [X] hay border-radius distinto de 0
  set /a FALLOS+=1
) else (
  echo   [OK] ni una esquina redondeada
)

REM -- 4. Cero activos externos ----------------------------------------------
echo.
echo 4. Autonomia
set BIN=0
for %%E in (png jpg jpeg gif woff woff2 ttf mp3 wav ogg) do (
  dir /s /b *.%%E >nul 2>&1 && set BIN=1
)
if !BIN! equ 0 (
  echo   [OK] cero ficheros de imagen, de fuente y de audio
) else (
  echo   [X] hay ficheros binarios en el proyecto
  set /a FALLOS+=1
)

REM -- 5. Contrato de carga --------------------------------------------------
echo.
echo 5. Contrato de carga
for /f %%N in ('dir /b js\*.js ^| find /c /v ""') do set NJS=%%N
for /f %%N in ('dir /b datos\*.js ^| find /c /v ""') do set NDATOS=%%N
for /f %%N in ('dir /b css\*.css ^| find /c /v ""') do set NCSS=%%N
for /f %%N in ('findstr /C:"<script src=" index.html ^| find /c /v ""') do set NHTML=%%N
for /f %%N in ('findstr /C:"<section id=\"p-" index.html ^| find /c /v ""') do set NSEC=%%N
set /a NTOTAL=!NJS!+!NDATOS!

if "!NTOTAL!"=="43" (echo   [OK] 43 scripts en disco) else (echo   [X] hay !NTOTAL! scripts, deben ser 43 & set /a FALLOS+=1)
if "!NHTML!"=="43"  (echo   [OK] 43 script src en index.html) else (echo   [X] index.html carga !NHTML! & set /a FALLOS+=1)
if "!NSEC!"=="17"   (echo   [OK] 17 secciones de pantalla) else (echo   [X] hay !NSEC! secciones & set /a FALLOS+=1)
if "!NCSS!"=="9"    (echo   [OK] 9 hojas de estilo) else (echo   [X] hay !NCSS! hojas & set /a FALLOS+=1)

echo.
if !FALLOS! equ 0 (
  echo ==== AUDITORIA EN VERDE: el proyecto se puede entregar ====
  exit /b 0
)
echo ==== AUDITORIA EN ROJO: !FALLOS! comprobaciones fallidas ====
exit /b 1
