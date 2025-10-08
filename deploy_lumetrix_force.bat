@echo off
setlocal

REM ====== DEPLOY FORZADO (por fecha, no por tamaño) ======
set "HOST=82.194.68.83"
set "USER=sistema_apps_user"
set "PASS=GestionUploadSistemaApps!"
set "REMOTE=/sistema_apps_upload"
set "LOCAL=C:\Proyectos\Lumetrix\PARA_HOSTALIA\sistema_apps_upload"
set "WINSCP_DIR=C:\Users\agl03\AppData\Local\Programs\WinSCP"
set "WINSCP=%WINSCP_DIR%\WinSCP.com"

echo ========================================
echo     DEPLOY LUMETRIX FORZADO (por fecha)
echo ========================================
echo.

"%WINSCP%" /ini=nul /log:"%LOCAL%\deploy_winscp.log" /command ^
 "open ftps://%USER%:%PASS%@%HOST%/ -explicit -certificate=*" ^
 "option batch on" ^
 "option confirm off" ^
 "cd %REMOTE%" ^
 "lcd %LOCAL%" ^
 "synchronize remote -criteria=time" ^
 "exit"

if "%ERRORLEVEL%"=="0" (
  echo.
  echo ✅ Deploy forzado completado
  echo.
  echo Verifica: https://colisan.com/sistema_apps_upload/app_lumetrix.html
) else (
  echo.
  echo ❌ Error en deploy
)

echo.
pause
