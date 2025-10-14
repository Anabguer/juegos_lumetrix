<?php
// Test CORS headers
header('Content-Type: text/plain; charset=utf-8');

echo "=== TEST CORS ===\n\n";

echo "HTTP_ORIGIN: " . ($_SERVER['HTTP_ORIGIN'] ?? 'NO DEFINIDO') . "\n";
echo "REQUEST_METHOD: " . $_SERVER['REQUEST_METHOD'] . "\n\n";

echo "=== HEADERS ENVIADOS ===\n";
foreach (headers_list() as $header) {
    echo "$header\n";
}

echo "\n=== CARGAR config_hostalia.php ===\n";
require_once __DIR__.'/config_hostalia.php';

echo "\nHeaders después de cargar config:\n";
foreach (headers_list() as $header) {
    echo "$header\n";
}

echo "\n✅ Si ves 'Access-Control-Allow-Origin' arriba, CORS está funcionando\n";



