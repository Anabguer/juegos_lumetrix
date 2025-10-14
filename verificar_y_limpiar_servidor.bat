@echo off
setlocal

set WINSCP_PATH=C:\Users\agl03\AppData\Local\Programs\WinSCP\WinSCP.com
set LOGFILE=deploy_winscp.log

echo ========================================
echo   VERIFICAR Y LIMPIAR SERVIDOR
echo ========================================
echo.
echo [INFO] Usando: %WINSCP_PATH%
echo.

"%WINSCP_PATH%" ^
  /log="%LOGFILE%" ^
  /ini=nul ^
  /command ^
    "open ftps://sistema_apps_user:C4l1s4n24*@82.194.68.83/ -passive=on -explicit -certificate=*" ^
    "option batch on" ^
    "option confirm off" ^
    "cd /lumetrix/js" ^
    "ls" ^
    "rm main.js" ^
    "ls" ^
    "exit"

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Hubo un problema con WinSCP
    echo [INFO] Revisa el log: %LOGFILE%
    pause
    exit /b 1
)

echo.
echo ========================================
echo   MAIN.JS ELIMINADO DEL SERVIDOR
echo ========================================
pause



