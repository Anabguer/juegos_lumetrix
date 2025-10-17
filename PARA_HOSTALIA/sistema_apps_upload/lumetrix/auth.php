<?php
require_once __DIR__.'/_common.php';
require_once __DIR__.'/enviar_email_smtp_mejorado.php'; // ⚡ Versión SMTP mejorada (puerto 25 sin TLS)
$act = $_GET['action'] ?? '';

if ($act === 'register') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $nombre = trim($in['nombre'] ?? '');
  $nick  = trim($in['username'] ?? '');
  $email = trim($in['email'] ?? '');
  $pass  = $in['password'] ?? '';
  if (!$nombre || !$nick || !$email || !$pass) json_out(['success'=>false,'message'=>'faltan campos']);

  $pdo = db();
  $uakey = key_from_email($email);

  // ya existe para esta app (por key o por nick+app)
  $st = $pdo->prepare('SELECT usuario_aplicacion_id FROM usuarios_aplicaciones WHERE (usuario_aplicacion_key=? OR (nick=? AND app_codigo=?)) LIMIT 1');
  $st->execute([$uakey, $nick, 'lumetrix']);
  if ($st->fetch()) json_out(['success'=>false,'message'=>'usuario/email ya existen para esta app']);

  // Generar código de verificación
  $codigo = generarCodigoVerificacion();
  $verification_expiry = date('Y-m-d H:i:s', strtotime('+15 minutes')); // ⭐ 15 minutos de validez
  
  $now = date('Y-m-d H:i:s');
  $ins = $pdo->prepare('INSERT INTO usuarios_aplicaciones
    (usuario_aplicacion_key,email,nombre,nick,password_hash,app_codigo,fecha_registro,ultimo_acceso,activo,created_at,verification_code,verification_expiry)
    VALUES (?,?,?,?,?,?, ?, ?, 0, ?, ?, ?)');
  $ins->execute([$uakey,$email,$nombre,$nick,password_hash($pass,PASSWORD_BCRYPT),'lumetrix',$now,$now,$now,$codigo,$verification_expiry]);

  // upsert progreso (tabla del juego la crea Neni)
  $pdo->prepare('INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key) VALUES (?)')->execute([$uakey]);

  // Enviar email de verificación
  $email_enviado = enviarEmailVerificacion($email, $nombre, $codigo);
  
  $response = [
    'success' => true,
    'message' => 'Registro exitoso. Revisa tu email para el código de verificación.',
    'email_sent' => $email_enviado,
    'requires_verification' => true,
    'user_key' => $uakey
  ];
  
  // En modo desarrollo, incluir el código si el email falla
  if (!$email_enviado) {
    $response['debug_code'] = $codigo;
    $response['message'] .= ' (Código: ' . $codigo . ')';
  }
  
  json_out($response);
}

if ($act === 'login') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $user = trim($in['username'] ?? ''); // nick o email
  $pass = $in['password'] ?? '';
  if (!$user || !$pass) json_out(['success'=>false,'message'=>'faltan campos']);

  error_log("🔑 [LOGIN] Intentando login para: $user");
  $pdo = db();

  // Buscar usuario SIN filtrar por activo (para poder detectar cuentas no verificadas)
  if (strpos($user, '@') !== false) {
    $uakey = key_from_email($user);
    $st = $pdo->prepare('SELECT nick, email, password_hash, fecha_registro, verified_at, activo FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
  } else {
    $st = $pdo->prepare('SELECT usuario_aplicacion_key AS uakey, nick, email, password_hash, fecha_registro, verified_at, activo FROM usuarios_aplicaciones WHERE nick=? AND app_codigo=? LIMIT 1');
    $st->execute([$user, 'lumetrix']);
    $row = $st->fetch(PDO::FETCH_ASSOC);
    if (!$row) json_out(['success'=>false,'message'=>'usuario no encontrado']);
    $uakey = (string)$row['uakey'];
    $st = $pdo->prepare('SELECT nick, email, password_hash, fecha_registro, verified_at, activo FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
  }

  $row = $st->fetch(PDO::FETCH_ASSOC);
  if (!$row || !password_verify($pass, $row['password_hash'])) {
    error_log("❌ [LOGIN] Credenciales inválidas para: $user");
    json_out(['success'=>false,'message'=>'credenciales inválidas']);
  }

  error_log("🔍 [LOGIN] Usuario encontrado: " . json_encode($row));

  // Verificar que el email esté verificado ANTES de permitir login
  if ($row['verified_at'] === NULL) {
    error_log("❌ [LOGIN] Email no verificado para: $user");
    json_out(['success'=>false,'message'=>'Debes verificar tu email antes de iniciar sesión','requires_verification'=>true,'email'=>$row['email']]);
  }

  // Verificar que la cuenta esté activa
  if ($row['activo'] != 1) {
    // ⭐ MEJORADO: Si no está activo pero está verificado, activarlo
    if ($row['verified_at'] !== NULL) {
      error_log("🔧 AUTO-FIX: Activando cuenta verificada para $uakey");
      $fix = $pdo->prepare('UPDATE usuarios_aplicaciones SET activo=1 WHERE usuario_aplicacion_key=?');
      $fix->execute([$uakey]);
      $row['activo'] = 1; // Actualizar el array local
    } else {
      json_out(['success'=>false,'message'=>'Tu cuenta está desactivada. Contacta al administrador.']);
    }
  }

  $_SESSION['uakey'] = $uakey;

  // upsert progreso
  $pdo->prepare('INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key) VALUES (?)')->execute([$uakey]);
  $pr = $pdo->prepare('SELECT nivel_actual,total_time_s,total_puntos FROM lumetrix_progreso WHERE usuario_aplicacion_key=?');
  $pr->execute([$uakey]);
  $progreso = $pr->fetch(PDO::FETCH_ASSOC) ?: ['nivel_actual'=>1,'total_time_s'=>0,'total_puntos'=>0];

  error_log("✅ [LOGIN] Login exitoso para: $user (uakey: $uakey)");
  json_out(['success'=>true,'user'=>['key'=>$uakey,'nick'=>$row['nick'],'email'=>$row['email'],'fecha_registro'=>$row['fecha_registro']], 'progreso'=>$progreso]);
}

if ($act === 'check_session') {
  if (!uakey()) json_out(['success'=>false]);
  $pdo = db();
  $st = $pdo->prepare('SELECT nick, email, fecha_registro FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=?');
  $st->execute([uakey(), 'lumetrix']);
  $u = $st->fetch(PDO::FETCH_ASSOC);
  if (!$u) json_out(['success'=>false]);
  
  // Obtener progreso del servidor (igual que en login)
  $pdo->prepare('INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key) VALUES (?)')->execute([uakey()]);
  $pr = $pdo->prepare('SELECT nivel_actual, total_time_s, total_puntos FROM lumetrix_progreso WHERE usuario_aplicacion_key=?');
  $pr->execute([uakey()]);
  $progreso = $pr->fetch(PDO::FETCH_ASSOC) ?: ['nivel_actual'=>1,'total_time_s'=>0,'total_puntos'=>0];
  
  json_out(['success'=>true,'uakey'=>uakey(),'user'=>['key'=>uakey()] + $u, 'progreso'=>$progreso]);
}

if ($act === 'verify_code') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $email = trim($in['email'] ?? '');
  $codigo = trim($in['codigo'] ?? '');
  
  if (!$email || !$codigo) json_out(['success'=>false,'error'=>'Faltan datos requeridos']);
  
  $pdo = db();
  $uakey = key_from_email($email);
  
  $st = $pdo->prepare('SELECT verification_code, verification_expiry FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? AND verified_at IS NULL');
  $st->execute([$uakey, 'lumetrix']);
  $usuario = $st->fetch(PDO::FETCH_ASSOC);
  
  if (!$usuario) json_out(['success'=>false,'error'=>'Usuario no encontrado o ya verificado']);
  
  if ($usuario['verification_code'] !== $codigo) json_out(['success'=>false,'error'=>'Código incorrecto']);
  
  if (!codigoEsValido($usuario['verification_expiry'])) json_out(['success'=>false,'error'=>'El código ha expirado. Solicita uno nuevo.']);
  
  // Activar cuenta
  $upd = $pdo->prepare('UPDATE usuarios_aplicaciones SET verified_at=NOW(), activo=1, verification_code=NULL, verification_expiry=NULL WHERE usuario_aplicacion_key=?');
  $upd->execute([$uakey]);
  
  // ⭐ CRÍTICO: Verificar que la actualización se aplicó correctamente
  $verify = $pdo->prepare('SELECT activo, verified_at FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=?');
  $verify->execute([$uakey, 'lumetrix']);
  $verification_result = $verify->fetch(PDO::FETCH_ASSOC);
  
  if (!$verification_result || $verification_result['activo'] != 1) {
    error_log("❌ ERROR: La verificación no se aplicó correctamente para $uakey");
    json_out(['success'=>false,'error'=>'Error interno al activar la cuenta']);
  }
  
  json_out(['success'=>true,'message'=>'¡Cuenta verificada correctamente!','verified'=>true,'user_key'=>$uakey,'activo'=>$verification_result['activo']]);
}

if ($act === 'resend_code') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $email = trim($in['email'] ?? '');
  
  if (!$email) json_out(['success'=>false,'error'=>'Email requerido']);
  
  $pdo = db();
  $uakey = key_from_email($email);
  
  $st = $pdo->prepare('SELECT nombre FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? AND verified_at IS NULL');
  $st->execute([$uakey, 'lumetrix']);
  $usuario = $st->fetch(PDO::FETCH_ASSOC);
  
  if (!$usuario) json_out(['success'=>false,'error'=>'Usuario no encontrado o ya verificado']);
  
  // Generar nuevo código
  $codigo = generarCodigoVerificacion();
  $verification_expiry = date('Y-m-d H:i:s', strtotime('+15 minutes')); // ⭐ 15 minutos de validez
  
  $upd = $pdo->prepare('UPDATE usuarios_aplicaciones SET verification_code=?, verification_expiry=? WHERE usuario_aplicacion_key=?');
  $upd->execute([$codigo, $verification_expiry, $uakey]);
  
  // Enviar email
  $email_enviado = enviarEmailVerificacion($email, $usuario['nombre'], $codigo);
  
  $response = ['success'=>true,'message'=>'Código reenviado a tu email','email_sent'=>$email_enviado];
  if (!$email_enviado) {
    $response['debug_code'] = $codigo;
    $response['message'] .= ' (Código: ' . $codigo . ')';
  }
  
  json_out($response);
}

if ($act === 'request_delete') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $email = trim($in['email'] ?? '');
  $reason = trim($in['reason'] ?? '');
  
  if (!$email || !$reason) {
    json_out(['success'=>false,'message'=>'Email y razón son obligatorios']);
  }
  
  $pdo = db();
  $uakey = key_from_email($email);
  
  // Verificar que el usuario existe
  $st = $pdo->prepare('SELECT usuario_aplicacion_id, nombre, nick FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
  $st->execute([$uakey, 'lumetrix']);
  $user = $st->fetch(PDO::FETCH_ASSOC);
  
  if (!$user) {
    json_out(['success'=>false,'message'=>'Usuario no encontrado']);
  }
  
  // Guardar solicitud de eliminación
  $now = date('Y-m-d H:i:s');
  $ins = $pdo->prepare('INSERT INTO solicitudes_eliminacion 
    (usuario_aplicacion_key, email, nombre, nick, razon, fecha_solicitud, estado) 
    VALUES (?, ?, ?, ?, ?, ?, "pendiente")');
  $ins->execute([$uakey, $email, $user['nombre'], $user['nick'], $reason, $now]);
  
  // Enviar email al administrador
  $admin_email = 'info@intocables.com'; // ⭐ Email del administrador
  $subject = 'Solicitud de eliminación de cuenta - LUMETRIX';
  $body = "
    <h2>🗑️ Solicitud de eliminación de cuenta</h2>
    <p><strong>Usuario:</strong> {$user['nombre']} ({$user['nick']})</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Fecha:</strong> {$now}</p>
    <p><strong>Razón:</strong></p>
    <p style='background:#f5f5f5;padding:10px;border-radius:5px;'>{$reason}</p>
    <p><strong>Acción requerida:</strong> Revisar y eliminar la cuenta si procede.</p>
  ";
  
  $email_enviado = enviarEmail($admin_email, $subject, $body);
  
  json_out([
    'success' => true,
    'message' => 'Solicitud enviada correctamente. Te contactaremos pronto.',
    'email_sent' => $email_enviado
  ]);
}

if ($act === 'logout') {
  session_destroy();
  json_out(['success'=>true,'message'=>'sesión cerrada']);
}

json_out(['success'=>false,'message'=>'acción inválida']);

