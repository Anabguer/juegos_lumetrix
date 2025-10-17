<?php
/**
 * Debug script para verificar qué está pasando con save_progress
 */

require_once __DIR__.'/_common.php';

// Simular los datos que vienen del juego
$test_data = [
    'level' => 3,
    'total_time_s' => 120,
    'puntos' => 75,
    'success' => 1
];

echo "=== DEBUG SAVE PROGRESS ===\n";
echo "Datos de prueba: " . json_encode($test_data) . "\n\n";

// Verificar conexión a BD
try {
    $pdo = db();
    echo "✅ Conexión a BD exitosa\n";
} catch (Exception $e) {
    echo "❌ Error conexión BD: " . $e->getMessage() . "\n";
    exit;
}

// Verificar si existe la tabla
try {
    $st = $pdo->query("SHOW TABLES LIKE 'lumetrix_progreso'");
    if ($st->rowCount() > 0) {
        echo "✅ Tabla lumetrix_progreso existe\n";
    } else {
        echo "❌ Tabla lumetrix_progreso NO existe\n";
        exit;
    }
} catch (Exception $e) {
    echo "❌ Error verificando tabla: " . $e->getMessage() . "\n";
    exit;
}

// Verificar estructura de la tabla
try {
    $st = $pdo->query("DESCRIBE lumetrix_progreso");
    echo "✅ Estructura de tabla:\n";
    while ($row = $st->fetch(PDO::FETCH_ASSOC)) {
        echo "  - " . $row['Field'] . " (" . $row['Type'] . ")\n";
    }
} catch (Exception $e) {
    echo "❌ Error describiendo tabla: " . $e->getMessage() . "\n";
}

// Probar la consulta SQL
$uakey = 'bitj2a@gmail.com_lumetrix';
$level = max(1, (int)($test_data['level'] ?? 1));
$time = max(0, (int)($test_data['total_time_s'] ?? 0));
$puntos = max(0, (int)($test_data['puntos'] ?? 0));

echo "\n=== PROBANDO CONSULTA SQL ===\n";
echo "uakey: $uakey\n";
echo "level: $level\n";
echo "time: $time\n";
echo "puntos: $puntos\n\n";

try {
    $st = $pdo->prepare("
        INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s, total_puntos)
        VALUES (:k, :lvl, :tt, :pts)
        ON DUPLICATE KEY UPDATE
            nivel_actual = :lvl,
            total_time_s = VALUES(total_time_s),
            total_puntos = VALUES(total_puntos),
            updated_at = CURRENT_TIMESTAMP
    ");
    
    $result = $st->execute([':k' => $uakey, ':lvl' => $level, ':tt' => $time, ':pts' => $puntos]);
    
    if ($result) {
        echo "✅ Consulta SQL ejecutada exitosamente\n";
        
        // Verificar que se guardó
        $st2 = $pdo->prepare("SELECT * FROM lumetrix_progreso WHERE usuario_aplicacion_key = ?");
        $st2->execute([$uakey]);
        $data = $st2->fetch(PDO::FETCH_ASSOC);
        
        if ($data) {
            echo "✅ Datos guardados correctamente:\n";
            echo json_encode($data, JSON_PRETTY_PRINT) . "\n";
        } else {
            echo "❌ No se encontraron datos después de insertar\n";
        }
    } else {
        echo "❌ Error ejecutando consulta SQL\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error en consulta SQL: " . $e->getMessage() . "\n";
    echo "Código de error: " . $e->getCode() . "\n";
}

echo "\n=== FIN DEBUG ===\n";
?>
