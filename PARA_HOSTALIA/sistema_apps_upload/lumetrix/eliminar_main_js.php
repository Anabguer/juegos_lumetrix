<?php
// Script para eliminar main.js del servidor
header('Content-Type: text/plain; charset=utf-8');

$archivo = __DIR__ . '/js/main.js';

echo "=== ELIMINAR MAIN.JS ===\n\n";

if (file_exists($archivo)) {
    echo "✓ Archivo encontrado: $archivo\n";
    
    if (unlink($archivo)) {
        echo "✓ Archivo eliminado exitosamente\n";
    } else {
        echo "✗ Error al eliminar el archivo\n";
        echo "  Permisos del directorio: " . substr(sprintf('%o', fileperms(__DIR__ . '/js')), -4) . "\n";
    }
} else {
    echo "✓ El archivo ya no existe (probablemente ya fue eliminado)\n";
}

echo "\n=== ARCHIVOS EN /js/ ===\n";
$archivos = scandir(__DIR__ . '/js');
foreach ($archivos as $arch) {
    if ($arch !== '.' && $arch !== '..') {
        echo "  - $arch\n";
    }
}

echo "\n¡Listo! Ahora limpia la caché del navegador (Ctrl+Shift+R)\n";
?>



