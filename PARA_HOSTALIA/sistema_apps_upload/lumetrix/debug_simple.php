<?php
/**
 * Debug simple para verificar la conexión y la tabla
 */

require_once __DIR__.'/_common.php';

echo "=== DEBUG SIMPLE ===\n";

// Verificar conexión
try {
    $pdo = db();
    echo "✅ Conexión BD: OK\n";
} catch (Exception $e) {
    echo "❌ Error BD: " . $e->getMessage() . "\n";
    exit;
}

// Verificar tabla
try {
    $st = $pdo->query("SHOW TABLES LIKE 'lumetrix_progreso'");
    if ($st->rowCount() > 0) {
        echo "✅ Tabla lumetrix_progreso: EXISTE\n";
    } else {
        echo "❌ Tabla lumetrix_progreso: NO EXISTE\n";
        exit;
    }
} catch (Exception $e) {
    echo "❌ Error verificando tabla: " . $e->getMessage() . "\n";
    exit;
}

// Verificar estructura
try {
    $st = $pdo->query("DESCRIBE lumetrix_progreso");
    echo "✅ Estructura tabla:\n";
    while ($row = $st->fetch(PDO::FETCH_ASSOC)) {
        echo "  - " . $row['Field'] . " (" . $row['Type'] . ")\n";
    }
} catch (Exception $e) {
    echo "❌ Error describiendo tabla: " . $e->getMessage() . "\n";
}

// Probar insert simple
try {
    $uakey = 'bitj2a@gmail.com_lumetrix';
    $level = 3;
    $time = 120;
    $puntos = 75;
    
    echo "\n=== PROBANDO INSERT ===\n";
    echo "uakey: $uakey\n";
    echo "level: $level\n";
    echo "time: $time\n";
    echo "puntos: $puntos\n";
    
    $st = $pdo->prepare("
        INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s, total_puntos)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            nivel_actual = VALUES(nivel_actual),
            total_time_s = VALUES(total_time_s),
            total_puntos = VALUES(total_puntos),
            updated_at = CURRENT_TIMESTAMP
    ");
    
    $result = $st->execute([$uakey, $level, $time, $puntos]);
    
    if ($result) {
        echo "✅ INSERT: EXITOSO\n";
        
        // Verificar que se guardó
        $st2 = $pdo->prepare("SELECT * FROM lumetrix_progreso WHERE usuario_aplicacion_key = ?");
        $st2->execute([$uakey]);
        $data = $st2->fetch(PDO::FETCH_ASSOC);
        
        if ($data) {
            echo "✅ DATOS GUARDADOS:\n";
            echo json_encode($data, JSON_PRETTY_PRINT) . "\n";
        } else {
            echo "❌ No se encontraron datos\n";
        }
    } else {
        echo "❌ INSERT: FALLÓ\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error en INSERT: " . $e->getMessage() . "\n";
    echo "Código: " . $e->getCode() . "\n";
}

echo "\n=== FIN DEBUG ===\n";
?>
