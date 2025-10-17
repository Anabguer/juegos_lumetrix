<?php
/**
 * API de guardado de progreso del juego
 */

require_once __DIR__.'/_common.php';
// require_login(); // ✅ TEMPORALMENTE DESHABILITADO PARA DEBUG

$act = $_GET['action'] ?? '';

if ($act === 'save_progress') {
    $in = json_decode(file_get_contents('php://input'), true) ?: [];
    
    $uakey = $_SESSION['uakey'] ?? 'bitj2a@gmail.com_lumetrix'; // ✅ TEMPORAL: Usar usuario fijo para debug
    $level = max(1, (int)($in['level'] ?? 1));
    $time  = max(0, (int)($in['total_time_s'] ?? 0));
    $puntos = max(0, (int)($in['puntos'] ?? 0));
    $succ  = (int)($in['success'] ?? 0);
    
    $pdo = db();
    
    try {
        // ✅ SIMPLIFICADO: Solo guardar progreso (sin historial innecesario)
        $st = $pdo->prepare("
            INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s, total_puntos)
            VALUES (:k, :lvl, :tt, :pts)
            ON DUPLICATE KEY UPDATE
                nivel_actual = VALUES(nivel_actual),
                total_time_s = VALUES(total_time_s),
                total_puntos = VALUES(total_puntos),
                updated_at = CURRENT_TIMESTAMP
        ");
        $st->execute([':k' => $uakey, ':lvl' => $level, ':tt' => $time, ':pts' => $puntos]);
        
        json_out(['success' => true, 'uakey' => $uakey, 'level' => $level]);
        
    } catch (Exception $e) {
        error_log("Lumetrix save_progress error: " . $e->getMessage());
        error_log("Lumetrix save_progress error code: " . $e->getCode());
        error_log("Lumetrix save_progress error trace: " . $e->getTraceAsString());
        echo json_encode(['success' => false, 'message' => 'error al guardar progreso', 'error' => $e->getMessage(), 'code' => $e->getCode()]);
        exit;
    }
}

if ($act === 'get_progress') {
    $uakey = $_SESSION['uakey'] ?? 'bitj2a@gmail.com_lumetrix'; // ✅ TEMPORAL: Usar usuario fijo para debug
    $pdo = db();
    
    // Obtener progreso del usuario
    $st = $pdo->prepare("
        SELECT nivel_actual, total_time_s, total_puntos, updated_at
        FROM lumetrix_progreso
        WHERE usuario_aplicacion_key = ?
    ");
    $st->execute([$uakey]);
    $data = $st->fetch(PDO::FETCH_ASSOC);
    
    if ($data) {
        json_out(['success' => true, 'data' => $data]);
    } else {
        // Si no existe progreso, crear registro inicial
        $pdo->prepare("
            INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s, total_puntos)
            VALUES (?, 1, 0, 0)
        ")->execute([$uakey]);
        
        json_out(['success' => true, 'data' => ['nivel_actual' => 1, 'total_time_s' => 0, 'total_puntos' => 0]]);
    }
}

json_out(['success' => false, 'message' => 'acción inválida']);
