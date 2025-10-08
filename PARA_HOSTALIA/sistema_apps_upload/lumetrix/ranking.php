<?php
require_once __DIR__.'/_common.php';
$act = $_GET['action'] ?? '';

if ($act === 'global') {
  $pdo = db();
  $st = $pdo->prepare("SELECT ua.nick AS nick, ua.email AS email, p.nivel_actual AS level, p.total_puntos
                       FROM lumetrix_progreso p
                       JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = p.usuario_aplicacion_key
                       WHERE ua.app_codigo = ?
                       ORDER BY p.nivel_actual DESC, p.total_puntos DESC
                       LIMIT 100");
  $st->execute(['lumetrix']);
  json_out(['success'=>true,'data'=>$st->fetchAll(PDO::FETCH_ASSOC)]);
}

json_out(['success'=>false,'message'=>'acción inválida']);

