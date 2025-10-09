@echo off
setlocal

REM ====== LIMPIAR CARPETA MAL UBICADA ======
set "HOST=82.194.68.83"
set "USER=sistema_apps_user"
set "PASS=GestionUploadSistemaApps!"

REM Ruta a WinSCP.com (tu instalación)
set "WINSCP_DIR=C:\Users\agl03\AppData\Local\Programs\WinSCP"
set "WINSCP=%WINSCP_DIR%\WinSCP.com"

echo ========================================
echo   LIMPIANDO CARPETA MAL UBICADA
echo ========================================
echo.

if not exist "%WINSCP%" (
  echo [ERROR] No encuentro WinSCP.com en:
  echo        %WINSCP%
  pause & exit /b 1
)

echo [INFO] Eliminando /sistema_apps_upload/lumetrix (carpeta mal ubicada)
echo [INFO] Usando: %WINSCP%
echo.

REM --- Eliminar la carpeta mal ubicada ---
"%WINSCP%" /ini=nul /log:"limpiar_carpeta.log" /command ^
 "open ftps://%USER%:%PASS%@%HOST%/ -explicit -certificate=*" ^
 "option batch on" ^
 "option confirm off" ^
 "cd /sistema_apps_upload" ^
 "ls" ^
 "rmdir lumetrix" ^
 "ls" ^
 "exit"

set "ERR=%ERRORLEVEL%"
if not "%ERR%"=="0" (
  echo [WARN] FTPS falló (codigo %ERR%). Probando FTP plano...
  "%WINSCP%" /ini=nul /log:"limpiar_carpeta_ftp.log" /command ^
   "open ftp://%USER%:%PASS%@%HOST%/" ^
   "option batch on" ^
   "option confirm off" ^
   "cd /sistema_apps_upload" ^
   "ls" ^
   "rmdir lumetrix" ^
   "ls" ^
   "exit"
  set "ERR=%ERRORLEVEL%"
)

if "%ERR%"=="0" (
  echo.
  echo ========================================
  echo ✅ CARPETA MAL UBICADA ELIMINADA
  echo ========================================
  echo.
  echo 🗑️ Se eliminó: /sistema_apps_upload/lumetrix
  echo ✅ Solo queda: /lumetrix (la correcta)
  echo.
  echo ========================================
) else (
  echo.
  echo ========================================
  echo ❌ ERROR AL ELIMINAR (codigo %ERR%)
  echo ========================================
  echo.
  echo 📝 Revisa los logs:
  echo   limpiar_carpeta.log
  echo   limpiar_carpeta_ftp.log
  echo.
  echo ========================================
)

echo.
pause
