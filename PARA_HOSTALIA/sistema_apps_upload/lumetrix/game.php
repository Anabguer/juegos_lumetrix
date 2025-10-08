<?php
require_once __DIR__.'/_common.php';
require_login();
$act = $_GET['action'] ?? '';

if ($act === 'save_progress') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $level   = max(1, (int)($in['level'] ?? 1));
  $total   = max(0, (int)($in['total_time_s'] ?? 0));
  $success = (int)($in['success'] ?? 0);

  $pdo = db(); $key = uakey();

  $pdo->prepare('UPDATE lumetrix_progreso SET total_time_s = total_time_s + ?, updated_at=NOW() WHERE usuario_aplicacion_key=?')
      ->execute([$total, $key]);

  if ($success) {
    $pdo->prepare('UPDATE lumetrix_progreso SET nivel_actual = GREATEST(nivel_actual, ?), updated_at=NOW() WHERE usuario_aplicacion_key=?')
        ->execute([$level, $key]);
  }

  $pdo->prepare('INSERT INTO lumetrix_runs (usuario_aplicacion_key, level, duration_s, success) VALUES (?,?,?,?)')
      ->execute([$key, $level, $total, $success]);

  json_out(['success'=>true]);
}

json_out(['success'=>false,'message'=>'acción inválida']);

