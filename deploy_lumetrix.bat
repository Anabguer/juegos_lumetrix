@echo off
setlocal

REM ====== CONFIGURACION LUMETRIX ======
set "HOST=82.194.68.83"
set "USER=sistema_apps_user"
set "PASS=GestionUploadSistemaApps!"
set "REMOTE=/sistema_apps_upload"
set "LOCAL=C:\Proyectos\Lumetrix\PARA_HOSTALIA\sistema_apps_upload"

REM Ruta a WinSCP.com (tu instalación)
set "WINSCP_DIR=C:\Users\agl03\AppData\Local\Programs\WinSCP"
set "WINSCP=%WINSCP_DIR%\WinSCP.com"

echo ========================================
echo     DEPLOY LUMETRIX con WinSCP (RAIZ)
echo ========================================
echo.

if not exist "%WINSCP%" (
  echo [ERROR] No encuentro WinSCP.com en:
  echo        %WINSCP%
  echo Instala WinSCP o corrige la ruta WINSCP_DIR.
  pause & exit /b 1
)

if not exist "%LOCAL%" (
  echo [ERROR] No existe la carpeta local:
  echo        %LOCAL%
  pause & exit /b 1
)

echo [INFO] Subiendo "%LOCAL%" -> "%HOST%:%REMOTE%"
echo [INFO] Usando: %WINSCP%
echo.

REM --- Primero intentamos FTPS (TLS explicito). Si falla, caemos a FTP plano ---
"%WINSCP%" /ini=nul /log:"%LOCAL%\deploy_winscp.log" /command ^
 "open ftps://%USER%:%PASS%@%HOST%/ -explicit -certificate=*" ^
 "option batch on" ^
 "option confirm off" ^
 "cd %REMOTE%" ^
 "pwd" ^
 "lcd %LOCAL%" ^
 "ls" ^
 "synchronize remote -mirror -criteria=size -filemask=""|*.md;*.git*;database/;*.backup;*.bak;*.example""" ^
 "exit"

set "ERR=%ERRORLEVEL%"
if not "%ERR%"=="0" (
  echo [WARN] FTPS falló (codigo %ERR%). Probando FTP plano...
  "%WINSCP%" /ini=nul /log:"%LOCAL%\deploy_ftp.log" /command ^
   "open ftp://%USER%:%PASS%@%HOST%/" ^
   "option batch on" ^
   "option confirm off" ^
   "cd %REMOTE%" ^
   "pwd" ^
   "lcd %LOCAL%" ^
   "ls" ^
   "synchronize remote -mirror -criteria=size -filemask=""|*.md;*.git*;database/;*.backup;*.bak;*.example""" ^
   "exit"
  set "ERR=%ERRORLEVEL%"
)

if "%ERR%"=="0" (
  echo.
  echo ========================================
  echo ✅ DEPLOY LUMETRIX COMPLETADO
  echo ========================================
  echo.
  echo 🌐 Comprueba el juego:
  echo   https://colisan.com/sistema_apps_upload/app_lumetrix.html
  echo   (o si usas index propio)
  echo   https://colisan.com/sistema_apps_upload/lumetrix/index.html
  echo.
  echo 🔌 Health/API en carpeta lumetrix:
  echo   https://colisan.com/sistema_apps_upload/lumetrix/__ping.php
  echo   https://colisan.com/sistema_apps_upload/lumetrix/test_db.php
  echo   https://colisan.com/sistema_apps_upload/lumetrix/auth.php?action=check_session
  echo.
  echo 📋 Archivos subidos desde:
  echo   %LOCAL%
  echo ========================================
) else (
  echo.
  echo ========================================
  echo ❌ ERROR EN EL DEPLOY (codigo %ERR%)
  echo ========================================
  echo.
  echo 📝 Revisa los logs:
  echo   %LOCAL%\deploy_winscp.log
  echo   %LOCAL%\deploy_ftp.log
  echo.
  echo Posibles causas:
  echo   - Credenciales incorrectas
  echo   - Firewall bloqueando FTP
  echo   - Servidor no disponible
  echo   - WinSCP no instalado correctamente
  echo.
  echo ========================================
)

echo.
pause
