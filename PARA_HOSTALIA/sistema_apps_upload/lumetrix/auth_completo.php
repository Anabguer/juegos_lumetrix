<?php
/**
 * Sistema de autenticación completo para Lumetrix
 * Incluye: registro, login, verificación por email, recuperación de contraseña
 */

require_once __DIR__.'/_common.php';
require_once __DIR__.'/enviar_email_phpmailer.php';

$act = $_GET['action'] ?? '';

// ========================================
// REGISTRO DE USUARIO
// ========================================
if ($act === 'register') {
    $in = json_decode(file_get_contents('php://input'), true) ?: [];
    $nombre = trim($in['nombre'] ?? '');
    $nick = trim($in['username'] ?? '');
    $email = trim($in['email'] ?? '');
    $pass = $in['password'] ?? '';
    
    if (!$nombre || !$nick || !$email || !$pass) {
        json_out(['success' => false, 'message' => 'Faltan campos requeridos']);
    }
    
    // Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_out(['success' => false, 'message' => 'Email inválido']);
    }
    
    // Validar longitud de contraseña
    if (strlen($pass) < 6) {
        json_out(['success' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres']);
    }
    
    $pdo = db();
    $uakey = key_from_email($email);
    
    // Verificar si ya existe el usuario
    $st = $pdo->prepare('SELECT usuario_aplicacion_id FROM usuarios_aplicaciones WHERE (usuario_aplicacion_key=? OR (nick=? AND app_codigo=?)) LIMIT 1');
    $st->execute([$uakey, $nick, 'lumetrix']);
    if ($st->fetch()) {
        json_out(['success' => false, 'message' => 'Usuario o email ya existen para esta aplicación']);
    }
    
    // Generar código de verificación
    $codigo_verificacion = generarCodigoVerificacion();
    $fecha_expiracion = date('Y-m-d H:i:s', strtotime('+24 hours'));
    
    // Insertar usuario (no verificado inicialmente)
    $st = $pdo->prepare('INSERT INTO usuarios_aplicaciones (usuario_aplicacion_key, nick, email, password, app_codigo, activo, verification_code, verification_expiry) VALUES (?, ?, ?, ?, ?, 0, ?, ?)');
    $password_hash = password_hash($pass, PASSWORD_DEFAULT);
    
    try {
        $st->execute([$uakey, $nick, $email, $password_hash, 'lumetrix', $codigo_verificacion, $fecha_expiracion]);
        
        // Enviar email de verificación
        $email_enviado = enviarEmailVerificacion($email, $nombre, $codigo_verificacion);
        
        json_out([
            'success' => true,
            'message' => 'Registro exitoso. Revisa tu email para el código de verificación.',
            'email_sent' => $email_enviado,
            'requires_verification' => true,
            'user_key' => $uakey,
            'codigo_dev' => $email_enviado ? null : $codigo_verificacion // Solo en desarrollo si email falla
        ]);
        
    } catch (Exception $e) {
        json_out(['success' => false, 'message' => 'Error al crear usuario: ' . $e->getMessage()]);
    }
}

// ========================================
// VERIFICACIÓN DE CÓDIGO
// ========================================
if ($act === 'verify_code') {
    $in = json_decode(file_get_contents('php://input'), true) ?: [];
    $email = trim($in['email'] ?? '');
    $codigo = trim($in['codigo'] ?? '');
    
    if (!$email || !$codigo) {
        json_out(['success' => false, 'error' => 'Email y código son requeridos']);
    }
    
    $pdo = db();
    $uakey = key_from_email($email);
    
    // Buscar usuario
    $st = $pdo->prepare('SELECT usuario_aplicacion_id, verification_code, verification_expiry, nick FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
    $user = $st->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        json_out(['success' => false, 'error' => 'Usuario no encontrado']);
    }
    
    // Verificar código
    if ($user['verification_code'] !== $codigo) {
        json_out(['success' => false, 'error' => 'Código incorrecto']);
    }
    
    // Verificar si el código ha expirado
    if (!codigoEsValido($user['verification_expiry'])) {
        json_out(['success' => false, 'error' => 'Código expirado. Solicita uno nuevo.']);
    }
    
    // Activar usuario y marcar como verificado
    $st = $pdo->prepare('UPDATE usuarios_aplicaciones SET activo=1, verified_at=NOW(), verification_code=NULL, verification_expiry=NULL WHERE usuario_aplicacion_key=? AND app_codigo=?');
    $st->execute([$uakey, 'lumetrix']);
    
    json_out([
        'success' => true,
        'message' => '¡Cuenta verificada correctamente!',
        'verified' => true,
        'user_key' => $uakey
    ]);
}

// ========================================
// REENVÍO DE CÓDIGO
// ========================================
if ($act === 'resend_code') {
    $in = json_decode(file_get_contents('php://input'), true) ?: [];
    $email = trim($in['email'] ?? '');
    
    if (!$email) {
        json_out(['success' => false, 'error' => 'Email es requerido']);
    }
    
    $pdo = db();
    $uakey = key_from_email($email);
    
    // Buscar usuario
    $st = $pdo->prepare('SELECT usuario_aplicacion_id, nick, verification_expiry FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
    $user = $st->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        json_out(['success' => false, 'error' => 'Usuario no encontrado']);
    }
    
    // Si ya está verificado, no enviar código
    if ($user['verification_expiry'] === null) {
        json_out(['success' => false, 'error' => 'Usuario ya está verificado']);
    }
    
    // Generar nuevo código
    $codigo_verificacion = generarCodigoVerificacion();
    $fecha_expiracion = date('Y-m-d H:i:s', strtotime('+24 hours'));
    
    // Actualizar código en BD
    $st = $pdo->prepare('UPDATE usuarios_aplicaciones SET verification_code=?, verification_expiry=? WHERE usuario_aplicacion_key=? AND app_codigo=?');
    $st->execute([$codigo_verificacion, $fecha_expiracion, $uakey, 'lumetrix']);
    
    // Enviar email
    $email_enviado = enviarEmailVerificacion($email, $user['nick'], $codigo_verificacion);
    
    json_out([
        'success' => true,
        'message' => 'Código reenviado. Revisa tu email.',
        'email_sent' => $email_enviado,
        'codigo_dev' => $email_enviado ? null : $codigo_verificacion
    ]);
}

// ========================================
// LOGIN
// ========================================
if ($act === 'login') {
    $in = json_decode(file_get_contents('php://input'), true) ?: [];
    $username = trim($in['username'] ?? '');
    $pass = $in['password'] ?? '';
    
    if (!$username || !$pass) {
        json_out(['success' => false, 'message' => 'Usuario y contraseña son requeridos']);
    }
    
    $pdo = db();
    
    // Buscar por email o nick
    $st = $pdo->prepare('SELECT usuario_aplicacion_id, nick, email, password, activo, verification_expiry, usuario_aplicacion_key FROM usuarios_aplicaciones WHERE (email=? OR nick=?) AND app_codigo=? LIMIT 1');
    $st->execute([$username, $username, 'lumetrix']);
    $user = $st->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        json_out(['success' => false, 'message' => 'Usuario no encontrado']);
    }
    
    // Verificar contraseña
    if (!password_verify($pass, $user['password'])) {
        json_out(['success' => false, 'message' => 'Contraseña incorrecta']);
    }
    
    // Verificar que esté activo
    if (!$user['activo']) {
        json_out(['success' => false, 'message' => 'Cuenta inactiva']);
    }
    
    // Verificar que el email esté verificado
    if ($user['verification_expiry'] !== null) {
        json_out(['success' => false, 'message' => 'Debes verificar tu email antes de hacer login', 'requires_verification' => true]);
    }
    
    // Login exitoso - crear sesión
    $_SESSION['user_id'] = $user['usuario_aplicacion_id'];
    $_SESSION['user_key'] = $user['usuario_aplicacion_key'];
    $_SESSION['nick'] = $user['nick'];
    $_SESSION['email'] = $user['email'];
    
    json_out([
        'success' => true,
        'message' => 'Login exitoso',
        'user' => [
            'id' => $user['usuario_aplicacion_id'],
            'nick' => $user['nick'],
            'email' => $user['email'],
            'key' => $user['usuario_aplicacion_key']
        ]
    ]);
}

// ========================================
// RECUPERACIÓN DE CONTRASEÑA - SOLICITAR
// ========================================
if ($act === 'forgot_password') {
    $in = json_decode(file_get_contents('php://input'), true) ?: [];
    $email = trim($in['email'] ?? '');
    
    if (!$email) {
        json_out(['success' => false, 'error' => 'Email es requerido']);
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_out(['success' => false, 'error' => 'Email inválido']);
    }
    
    $pdo = db();
    $uakey = key_from_email($email);
    
    // Buscar usuario
    $st = $pdo->prepare('SELECT usuario_aplicacion_id, nick, activo FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
    $user = $st->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        json_out(['success' => false, 'error' => 'Usuario no encontrado']);
    }
    
    if (!$user['activo']) {
        json_out(['success' => false, 'error' => 'Cuenta inactiva']);
    }
    
    // Generar código de recuperación
    $codigo_recuperacion = generarCodigoVerificacion();
    $fecha_expiracion = date('Y-m-d H:i:s', strtotime('+1 hour')); // 1 hora para recuperación
    
    // Guardar código de recuperación (usamos verification_code para esto)
    $st = $pdo->prepare('UPDATE usuarios_aplicaciones SET verification_code=?, verification_expiry=? WHERE usuario_aplicacion_key=? AND app_codigo=?');
    $st->execute([$codigo_recuperacion, $fecha_expiracion, $uakey, 'lumetrix']);
    
    // Enviar email de recuperación
    $email_enviado = enviarEmailRecuperacion($email, $user['nick'], $codigo_recuperacion);
    
    json_out([
        'success' => true,
        'message' => 'Código de recuperación enviado. Revisa tu email.',
        'email_sent' => $email_enviado,
        'codigo_dev' => $email_enviado ? null : $codigo_recuperacion
    ]);
}

// ========================================
// RECUPERACIÓN DE CONTRASEÑA - CAMBIAR
// ========================================
if ($act === 'reset_password') {
    $in = json_decode(file_get_contents('php://input'), true) ?: [];
    $email = trim($in['email'] ?? '');
    $codigo = trim($in['codigo'] ?? '');
    $nueva_password = $in['new_password'] ?? '';
    
    if (!$email || !$codigo || !$nueva_password) {
        json_out(['success' => false, 'error' => 'Email, código y nueva contraseña son requeridos']);
    }
    
    if (strlen($nueva_password) < 6) {
        json_out(['success' => false, 'error' => 'La nueva contraseña debe tener al menos 6 caracteres']);
    }
    
    $pdo = db();
    $uakey = key_from_email($email);
    
    // Buscar usuario
    $st = $pdo->prepare('SELECT usuario_aplicacion_id, verification_code, verification_expiry FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=? LIMIT 1');
    $st->execute([$uakey, 'lumetrix']);
    $user = $st->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        json_out(['success' => false, 'error' => 'Usuario no encontrado']);
    }
    
    // Verificar código
    if ($user['verification_code'] !== $codigo) {
        json_out(['success' => false, 'error' => 'Código incorrecto']);
    }
    
    // Verificar si el código ha expirado (1 hora para recuperación)
    if (!codigoEsValido($user['verification_expiry'], 1)) {
        json_out(['success' => false, 'error' => 'Código expirado. Solicita uno nuevo.']);
    }
    
    // Cambiar contraseña
    $password_hash = password_hash($nueva_password, PASSWORD_DEFAULT);
    $st = $pdo->prepare('UPDATE usuarios_aplicaciones SET password=?, verification_code=NULL, verification_expiry=NULL WHERE usuario_aplicacion_key=? AND app_codigo=?');
    $st->execute([$password_hash, $uakey, 'lumetrix']);
    
    json_out([
        'success' => true,
        'message' => 'Contraseña cambiada exitosamente. Ya puedes hacer login con tu nueva contraseña.'
    ]);
}

// ========================================
// VERIFICAR SESIÓN
// ========================================
if ($act === 'check_session') {
    if (isset($_SESSION['user_id'])) {
        json_out([
            'success' => true,
            'logged_in' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'nick' => $_SESSION['nick'],
                'email' => $_SESSION['email'],
                'key' => $_SESSION['user_key']
            ]
        ]);
    } else {
        json_out(['success' => false, 'logged_in' => false]);
    }
}

// ========================================
// LOGOUT
// ========================================
if ($act === 'logout') {
    session_destroy();
    json_out(['success' => true, 'message' => 'Sesión cerrada']);
}

// ========================================
// ACCIÓN NO VÁLIDA
// ========================================
json_out(['success' => false, 'message' => 'Acción no válida']);
?>
