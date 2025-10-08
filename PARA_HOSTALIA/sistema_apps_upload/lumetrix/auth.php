<?php
require_once __DIR__.'/_common.php';
$act = $_GET['action'] ?? '';

if ($act === 'register') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $nombre = trim($in['nombre'] ?? '');
  $nick  = trim($in['username'] ?? '');
  $email = trim($in['email'] ?? '');
  $pass  = $in['password'] ?? '';
  if (!$nombre || !$nick || !$email || !$pass) json_out(['success'=>false,'message'=>'faltan campos']);

  $pdo = db();
  $uakey = uakey_from_email($email, 'lumetrix');

  // ya existe para esta app (por key o por nick+app)
  $st = $pdo->prepare('SELECT usuario_aplicacion_id FROM usuarios_aplicaciones WHERE (usuario_aplicacion_key=? OR (nick=? AND app_codigo=?)) LIMIT 1');
  $st->execute([$uakey, $nick, 'lumetrix']);
  if ($st->fetch()) json_out(['success'=>false,'message'=>'usuario/email ya existen para esta app']);

  $now = date('Y-m-d H:i:s');
  $ins = $pdo->prepare('INSERT INTO usuarios_aplicaciones
    (usuario_aplicacion_key,email,nombre,nick,password_hash,app_codigo,fecha_registro,ultimo_acceso,activo,created_at)
    VALUES (?,?,?,?,?,?, ?, ?, 1, ?)');
  $ins->execute([$uakey,$email,$nombre,$nick,password_hash($pass,PASSWORD_BCRYPT),'lumetrix',$now,$now,$now]);

  // upsert progreso (tabla del juego la crea Neni)
  $pdo->prepare('INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key) VALUES (?)')->execute([$uakey]);

  json_out(['success'=>true,'usuario_aplicacion_key'=>$uakey]);
}

if ($act === 'login') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $user = trim($in['username'] ?? ''); // nick o email
  $pass = $in['password'] ?? '';
  if (!$user || !$pass) json_out(['success'=>false,'message'=>'faltan campos']);

  $pdo = db();

  if (strpos($user, '@') !== false) {
    $uakey = uakey_from_email($user, 'lumetrix');
    $st = $pdo->prepare('SELECT nick, email, password_hash, fecha_registro FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? AND activo=1 LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
  } else {
    $st = $pdo->prepare('SELECT usuario_aplicacion_key AS uakey, nick, email, password_hash, fecha_registro FROM usuarios_aplicaciones WHERE nick=? AND app_codigo=? AND activo=1 LIMIT 1');
    $st->execute([$user, 'lumetrix']);
    $row = $st->fetch(PDO::FETCH_ASSOC);
    if (!$row) json_out(['success'=>false,'message'=>'usuario no encontrado']);
    $uakey = (string)$row['uakey'];
    $st = $pdo->prepare('SELECT nick, email, password_hash, fecha_registro FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
  }

  $row = $st->fetch(PDO::FETCH_ASSOC);
  if (!$row || !password_verify($pass, $row['password_hash'])) json_out(['success'=>false,'message'=>'credenciales inválidas']);

  $_SESSION['uakey'] = $uakey;

  // upsert progreso
  $pdo->prepare('INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key) VALUES (?)')->execute([$uakey]);
  $pr = $pdo->prepare('SELECT nivel_actual,total_time_s FROM lumetrix_progreso WHERE usuario_aplicacion_key=?');
  $pr->execute([$uakey]);
  $progreso = $pr->fetch(PDO::FETCH_ASSOC) ?: ['nivel_actual'=>1,'total_time_s'=>0];

  json_out(['success'=>true,'user'=>['key'=>$uakey,'nick'=>$row['nick'],'email'=>$row['email'],'fecha_registro'=>$row['fecha_registro']], 'progreso'=>$progreso]);
}

if ($act === 'check_session') {
  if (!uakey()) json_out(['success'=>false]);
  $pdo = db();
  $st = $pdo->prepare('SELECT nick, email, fecha_registro FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=?');
  $st->execute([uakey(), 'lumetrix']);
  $u = $st->fetch(PDO::FETCH_ASSOC);
  if (!$u) json_out(['success'=>false]);
  json_out(['success'=>true,'uakey'=>uakey(),'user'=>['key'=>uakey()] + $u]);
}

if ($act === 'logout') {
  session_destroy();
  json_out(['success'=>true,'message'=>'sesión cerrada']);
}

json_out(['success'=>false,'message'=>'acción inválida']);

