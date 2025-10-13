<?php
/**
 * SISTEMA DE AUTENTICACIÓN CON VERIFICACIÓN POR EMAIL - LUMETRIX
 * Basado en el sistema de MemoFlip
 */

require_once __DIR__.'/_common.php';
require_once __DIR__.'/enviar_email.php';

$act = $_GET['action'] ?? '';

// ==============================================
// REGISTRO CON VERIFICACIÓN POR EMAIL
// ==============================================
if ($act === 'register') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $nombre = trim($in['nombre'] ?? '');
  $nick  = trim($in['username'] ?? '');
  $email = trim($in['email'] ?? '');
  $pass  = $in['password'] ?? '';
  
  if (!$nombre || !$nick || !$email || !$pass) {
    json_out(['success'=>false,'message'=>'Faltan campos obligatorios']);
  }

  $pdo = db();
  $uakey = uakey_from_email($email, 'lumetrix');

  // Verificar si ya existe
  $st = $pdo->prepare('SELECT usuario_aplicacion_id, email_verificado FROM usuarios_aplicaciones WHERE (usuario_aplicacion_key=? OR (nick=? AND app_codigo=?)) LIMIT 1');
  $st->execute([$uakey, $nick, 'lumetrix']);
  $existing = $st->fetch(PDO::FETCH_ASSOC);
  
  if ($existing) {
    if ($existing['email_verificado'] == 0) {
      json_out(['success'=>false,'message'=>'Usuario ya registrado pero no verificado. Revisa tu email.']);
    }
    json_out(['success'=>false,'message'=>'Usuario/email ya existen para esta app']);
  }

  // Generar código de verificación
  $codigo = generarCodigoVerificacion();
  $now = date('Y-m-d H:i:s');
  
  // Crear usuario (sin activar hasta verificar email)
  $ins = $pdo->prepare('INSERT INTO usuarios_aplicaciones
    (usuario_aplicacion_key, email, nombre, nick, password_hash, app_codigo, fecha_registro, ultimo_acceso, activo, created_at, email_verificado, codigo_verificacion, tiempo_verificacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 0, ?, ?)');
  $ins->execute([
    $uakey, 
    $email, 
    $nombre, 
    $nick, 
    password_hash($pass, PASSWORD_BCRYPT), 
    'lumetrix', 
    $now, 
    $now, 
    $now,
    $codigo,
    $now
  ]);

  // Crear progreso inicial
  $pdo->prepare('INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key) VALUES (?)')->execute([$uakey]);

  // Enviar email con código
  $email_sent = enviarEmailVerificacion($email, $nombre, $codigo);
  
  if (!$email_sent) {
    // Si falla el envío (desarrollo), devolver código en respuesta
    json_out([
      'success' => true,
      'message' => 'Registro exitoso. Revisa tu email para el código de verificación.',
      'requires_verification' => true,
      'email_sent' => false,
      'codigo_dev' => $codigo, // Solo para desarrollo
      'user_key' => $uakey
    ]);
  }
  
  json_out([
    'success' => true,
    'message' => 'Registro exitoso. Revisa tu email para el código de verificación.',
    'requires_verification' => true,
    'email_sent' => true,
    'user_key' => $uakey
  ]);
}

// ==============================================
// VERIFICAR CÓDIGO
// ==============================================
if ($act === 'verify_code') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $email = trim($in['email'] ?? '');
  $codigo = trim($in['codigo'] ?? '');
  
  if (!$email || !$codigo) {
    json_out(['success'=>false,'error'=>'Faltan datos']);
  }

  $pdo = db();
  $uakey = uakey_from_email($email, 'lumetrix');
  
  // Obtener usuario
  $st = $pdo->prepare('SELECT codigo_verificacion, tiempo_verificacion, intentos_verificacion, email_verificado 
                      FROM usuarios_aplicaciones 
                      WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
  $st->execute([$uakey, 'lumetrix']);
  $user = $st->fetch(PDO::FETCH_ASSOC);
  
  if (!$user) {
    json_out(['success'=>false,'error'=>'Usuario no encontrado']);
  }
  
  // Si ya está verificado
  if ($user['email_verificado'] == 1) {
    json_out(['success'=>true,'message'=>'Email ya verificado','verified'=>true]);
  }
  
  // Verificar que el código no haya expirado
  if (!codigoEsValido($user['tiempo_verificacion'])) {
    json_out(['success'=>false,'error'=>'Código expirado. Solicita uno nuevo.']);
  }
  
  // Verificar el código
  if ($user['codigo_verificacion'] !== $codigo) {
    // Incrementar intentos fallidos
    $pdo->prepare('UPDATE usuarios_aplicaciones SET intentos_verificacion = intentos_verificacion + 1 WHERE usuario_aplicacion_key=?')
        ->execute([$uakey]);
    
    json_out(['success'=>false,'error'=>'Código incorrecto']);
  }
  
  // ✅ Código correcto - Activar cuenta
  $pdo->prepare('UPDATE usuarios_aplicaciones 
                 SET email_verificado = 1, 
                     activo = 1,
                     codigo_verificacion = NULL,
                     tiempo_verificacion = NULL,
                     intentos_verificacion = 0
                 WHERE usuario_aplicacion_key=?')
      ->execute([$uakey]);
  
  json_out([
    'success' => true,
    'message' => '¡Cuenta verificada correctamente!',
    'verified' => true,
    'user_key' => $uakey
  ]);
}

// ==============================================
// REENVIAR CÓDIGO
// ==============================================
if ($act === 'resend_code') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $email = trim($in['email'] ?? '');
  
  if (!$email) {
    json_out(['success'=>false,'error'=>'Email requerido']);
  }

  $pdo = db();
  $uakey = uakey_from_email($email, 'lumetrix');
  
  // Obtener usuario
  $st = $pdo->prepare('SELECT nombre, email_verificado FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
  $st->execute([$uakey, 'lumetrix']);
  $user = $st->fetch(PDO::FETCH_ASSOC);
  
  if (!$user) {
    json_out(['success'=>false,'error'=>'Usuario no encontrado']);
  }
  
  if ($user['email_verificado'] == 1) {
    json_out(['success'=>false,'error'=>'Email ya verificado']);
  }
  
  // Generar nuevo código
  $codigo = generarCodigoVerificacion();
  $now = date('Y-m-d H:i:s');
  
  $pdo->prepare('UPDATE usuarios_aplicaciones 
                 SET codigo_verificacion = ?, 
                     tiempo_verificacion = ?,
                     intentos_verificacion = 0
                 WHERE usuario_aplicacion_key=?')
      ->execute([$codigo, $now, $uakey]);
  
  // Enviar email
  $email_sent = enviarEmailVerificacion($email, $user['nombre'], $codigo);
  
  if (!$email_sent) {
    json_out([
      'success' => true,
      'message' => 'Código reenviado',
      'email_sent' => false,
      'codigo_dev' => $codigo // Solo para desarrollo
    ]);
  }
  
  json_out([
    'success' => true,
    'message' => 'Código reenviado a tu email',
    'email_sent' => true
  ]);
}

// ==============================================
// LOGIN (REQUIERE EMAIL VERIFICADO)
// ==============================================
if ($act === 'login') {
  $in = json_decode(file_get_contents('php://input'), true) ?: [];
  $user = trim($in['username'] ?? ''); // nick o email
  $pass = $in['password'] ?? '';
  
  if (!$user || !$pass) {
    json_out(['success'=>false,'message'=>'Faltan campos']);
  }

  $pdo = db();

  if (strpos($user, '@') !== false) {
    $uakey = uakey_from_email($user, 'lumetrix');
    $st = $pdo->prepare('SELECT nick, email, password_hash, fecha_registro, email_verificado FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
  } else {
    $st = $pdo->prepare('SELECT usuario_aplicacion_key AS uakey, nick, email, password_hash, fecha_registro, email_verificado FROM usuarios_aplicaciones WHERE nick=? AND app_codigo=? LIMIT 1');
    $st->execute([$user, 'lumetrix']);
    $row = $st->fetch(PDO::FETCH_ASSOC);
    if (!$row) json_out(['success'=>false,'message'=>'Usuario no encontrado']);
    $uakey = (string)$row['uakey'];
    $st = $pdo->prepare('SELECT nick, email, password_hash, fecha_registro, email_verificado FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
  }

  $row = $st->fetch(PDO::FETCH_ASSOC);
  if (!$row || !password_verify($pass, $row['password_hash'])) {
    json_out(['success'=>false,'message'=>'Credenciales inválidas']);
  }
  
  // ✅ Verificar que el email esté verificado
  if ($row['email_verificado'] == 0) {
    json_out([
      'success' => false,
      'message' => 'Debes verificar tu email antes de iniciar sesión',
      'requires_verification' => true,
      'email' => $row['email']
    ]);
  }

  $_SESSION['uakey'] = $uakey;

  // upsert progreso
  $pdo->prepare('INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key) VALUES (?)')->execute([$uakey]);
  $pr = $pdo->prepare('SELECT nivel_actual, total_time_s FROM lumetrix_progreso WHERE usuario_aplicacion_key=?');
  $pr->execute([$uakey]);
  $progreso = $pr->fetch(PDO::FETCH_ASSOC) ?: ['nivel_actual'=>1,'total_time_s'=>0];

  json_out([
    'success' => true,
    'user' => [
      'key' => $uakey,
      'nick' => $row['nick'],
      'email' => $row['email'],
      'fecha_registro' => $row['fecha_registro']
    ],
    'progreso' => $progreso
  ]);
}

// ==============================================
// CHECK SESSION (sin cambios)
// ==============================================
if ($act === 'check_session') {
  if (!uakey()) json_out(['success'=>false]);
  $pdo = db();
  $st = $pdo->prepare('SELECT nick, email, fecha_registro FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=?');
  $st->execute([uakey(), 'lumetrix']);
  $u = $st->fetch(PDO::FETCH_ASSOC);
  if (!$u) json_out(['success'=>false]);
  json_out(['success'=>true,'uakey'=>uakey(),'user'=>['key'=>uakey()] + $u]);
}

// ==============================================
// LOGOUT (sin cambios)
// ==============================================
if ($act === 'logout') {
  session_destroy();
  json_out(['success'=>true,'message'=>'Sesión cerrada']);
}

json_out(['success'=>false,'message'=>'Acción inválida']);

