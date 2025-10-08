<?php
// DEBUG: mostrar rutas y constantes cargadas
echo "CWD=" . getcwd() . "\n";
echo "HEALTH_FILE=" . __FILE__ . "\n";

require_once __DIR__ . '/config_hostalia.php';

echo "CONFIG_FILE=" . realpath(__DIR__ . '/config_hostalia.php') . "\n";

// ¿Constantes definidas?
echo "DB_HOST=" . (defined('DB_HOST') ? DB_HOST : '(no definido)') . "\n";
echo "DB_USUARIO=" . (defined('DB_USUARIO') ? DB_USUARIO : '(no definido)') . "\n";
echo "DB_NOMBRE=" . (defined('DB_NOMBRE') ? DB_NOMBRE : '(no definido)') . "\n";
echo "DB_PORT=" . (defined('DB_PORT') ? DB_PORT : '(no definido)') . "\n";

// Intentar conexión
try {
  $pdo = db();
  $pdo->query('SELECT 1');
  echo "DB_STATUS=ok\n";
} catch (Throwable $e) {
  echo "DB_STATUS=error\n";
  echo "DB_ERROR=" . $e->getMessage() . "\n";
}
?>
