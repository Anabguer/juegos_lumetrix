<?php
echo "CWD=" . getcwd() . "\n";
echo "THIS=" . __FILE__ . "\n";
require_once __DIR__ . '/config_hostalia.php';
echo "CONFIG=" . realpath(__DIR__ . '/config_hostalia.php') . "\n";
echo "DB_HOST=" . DB_HOST . "\n";
echo "DB_USUARIO=" . DB_USUARIO . "\n";
echo "DB_NOMBRE=" . DB_NOMBRE . "\n";
echo "DB_PORT=" . DB_PORT . "\n";
?>

