@echo off
echo ========================================
echo   DEPLOY LUMETRIX APK - COMPLETO
echo ========================================
echo.

REM 1. Build frontend
echo [1/6] Compilando frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ERROR en npm run build
    pause
    exit /b 1
)

REM 2. Limpiar public
echo [2/6] Limpiando carpeta public...
cd android\app\src\main\assets
if exist public rmdir /s /q public
mkdir public
mkdir public\js

REM 3. Copiar solo lo necesario
echo [3/6] Copiando archivos necesarios...
cd ..\..\..\..\..\..\..
copy /Y frontend\dist\game.bundle.js frontend\android\app\src\main\assets\public\js\game.bundle.js
copy /Y frontend\dist\game.bundle.js.map frontend\android\app\src\main\assets\public\js\game.bundle.js.map

REM 4. Crear index.html limpio
echo [4/6] Creando index.html...
(
echo ^<!DOCTYPE html^>
echo ^<html lang="es"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"^>
echo     ^<title^>Lumetrix^</title^>
echo     ^<style^>
echo         html, body { margin: 0; padding: 0; background: #1a1a2e !important; height: 100%%; overflow: hidden; }
echo         #gameRoot { width: 100%%; height: 100%%; }
echo     ^</style^>
echo ^</head^>
echo ^<body^>
echo     ^<div id="gameRoot"^>^</div^>
echo     ^<script src="js/game.bundle.js?v=%date:~-4%%date:~3,2%%date:~0,2%%time:~0,2%%time:~3,2%"^>^</script^>
echo ^</body^>
echo ^</html^>
) > frontend\android\app\src\main\assets\public\index.html

REM 5. Copiar capacitor config
echo [5/6] Copiando Capacitor config...
cd frontend
call npx cap sync android

REM 6. Compilar e instalar
echo [6/6] Compilando e instalando APK...
cd android
call gradlew assembleDebug installDebug

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ APK INSTALADA CORRECTAMENTE
    echo ========================================
    cd ..\..
    copy /Y frontend\android\app\build\outputs\apk\debug\app-debug.apk lumetrix-DEPLOYED.apk
    echo APK guardada: lumetrix-DEPLOYED.apk
) else (
    echo.
    echo ========================================
    echo   ❌ ERROR EN LA COMPILACION
    echo ========================================
)

cd ..\..
pause

