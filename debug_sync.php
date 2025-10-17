<?php
/**
 * DEBUG: Verificar qué datos recibe el servidor
 */

require_once __DIR__.'/_common.php';

// Log de entrada
error_log("DEBUG_SYNC: " . date('Y-m-d H:i:s') . " - REQUEST_METHOD: " . $_SERVER['REQUEST_METHOD']);
error_log("DEBUG_SYNC: " . date('Y-m-d H:i:s') . " - Content-Type: " . ($_SERVER['CONTENT_TYPE'] ?? 'NO_SET'));
error_log("DEBUG_SYNC: " . date('Y-m-d H:i:s') . " - Raw input: " . file_get_contents('php://input'));

// Obtener datos
$input = file_get_contents('php://input');
$data = json_decode($input, true);

error_log("DEBUG_SYNC: " . date('Y-m-d H:i:s') . " - Decoded data: " . print_r($data, true));

// Simular guardado
$uakey = 'bitj2a@gmail.com_lumetrix';
$level = max(1, (int)($data['level'] ?? 1));
$time = max(0, (int)($data['total_time_s'] ?? 0));
$puntos = max(0, (int)($data['puntos'] ?? 0));

error_log("DEBUG_SYNC: " . date('Y-m-d H:i:s') . " - Processed: uakey=$uakey, level=$level, time=$time, puntos=$puntos");

// Intentar guardar en BD
try {
    $pdo = db();
    
    $st = $pdo->prepare("
        INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s, total_puntos)
        VALUES (:k, :lvl, :tt, :pts)
        ON DUPLICATE KEY UPDATE
            nivel_actual = GREATEST(nivel_actual, :lvl),
            total_time_s = total_time_s + VALUES(total_time_s),
            total_puntos = VALUES(total_puntos),
            updated_at = CURRENT_TIMESTAMP
    ");
    
    $result = $st->execute([':k' => $uakey, ':lvl' => $level, ':tt' => $time, ':pts' => $puntos]);
    
    error_log("DEBUG_SYNC: " . date('Y-m-d H:i:s') . " - DB result: " . ($result ? 'SUCCESS' : 'FAILED'));
    
    if ($result) {
        json_out(['success' => true, 'debug' => 'Data saved successfully', 'uakey' => $uakey, 'level' => $level, 'puntos' => $puntos]);
    } else {
        json_out(['success' => false, 'debug' => 'DB execution failed']);
    }
    
} catch (Exception $e) {
    error_log("DEBUG_SYNC: " . date('Y-m-d H:i:s') . " - ERROR: " . $e->getMessage());
    json_out(['success' => false, 'debug' => 'Exception: ' . $e->getMessage()]);
}
?>
