@echo off
REM Script para eliminar main.js del servidor

set WINSCP="C:\Users\agl03\AppData\Local\Programs\WinSCP\WinSCP.com"
set HOST=82.194.68.83
set USER=sistema_apps_user
set PASS=C4l1s4n24*
set REMOTE_DIR=/lumetrix/js

echo ========================================
echo   ELIMINAR main.js DEL SERVIDOR
echo ========================================
echo.

%WINSCP% /command ^
  "open ftps://%USER%:%PASS%@%HOST%/" ^
  "cd %REMOTE_DIR%" ^
  "rm main.js" ^
  "ls" ^
  "exit"

echo.
echo ========================================
echo   PROCESO COMPLETADO
echo ========================================
pause


