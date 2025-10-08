<?php
/**
 * API de guardado de progreso del juego
 */

require_once __DIR__.'/_common.php';
require_login();

$act = $_GET['action'] ?? '';

if ($act === 'save_progress') {
    $in = json_decode(file_get_contents('php://input'), true) ?: [];
    
    $uakey = $_SESSION['uakey']; // ÚNICO origen de verdad (no aceptar del cliente)
    $level = max(1, (int)($in['level'] ?? 1));
    $time  = max(0, (int)($in['total_time_s'] ?? 0));
    $succ  = (int)($in['success'] ?? 0);
    
    $pdo = db();
    
    try {
        $pdo->beginTransaction();
        
        // 1. Guardar run histórico
        $st = $pdo->prepare("
            INSERT INTO lumetrix_runs (usuario_aplicacion_key, level, duration_s, success)
            VALUES (?, ?, ?, ?)
        ");
        $st->execute([$uakey, $level, $time, $succ]);
        
        // 2. Actualizar progreso agregado (UPSERT)
        $st = $pdo->prepare("
            INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s)
            VALUES (:k, :lvl, :tt)
            ON DUPLICATE KEY UPDATE
                nivel_actual = GREATEST(nivel_actual, VALUES(nivel_actual)),
                total_time_s = total_time_s + VALUES(total_time_s),
                updated_at = CURRENT_TIMESTAMP
        ");
        $st->execute([':k' => $uakey, ':lvl' => $level, ':tt' => $time]);
        
        $pdo->commit();
        
        json_out(['success' => true, 'uakey' => $uakey, 'level' => $level]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        error_log("Lumetrix save_progress error: " . $e->getMessage());
        json_out(['success' => false, 'message' => 'error al guardar progreso']);
    }
}

if ($act === 'get_progress') {
    $uakey = $_SESSION['uakey'];
    $pdo = db();
    
    // Obtener progreso del usuario
    $st = $pdo->prepare("
        SELECT nivel_actual, total_time_s, updated_at
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
            INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s)
            VALUES (?, 1, 0)
        ")->execute([$uakey]);
        
        json_out(['success' => true, 'data' => ['nivel_actual' => 1, 'total_time_s' => 0]]);
    }
}

json_out(['success' => false, 'message' => 'acción inválida']);
