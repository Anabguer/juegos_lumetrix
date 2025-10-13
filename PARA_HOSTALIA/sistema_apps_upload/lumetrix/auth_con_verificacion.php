<?php
/**
 * API de Autenticación con Verificación por Email - LUMETRIX
 * Basado en el sistema de MemoFlip
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config_hostalia.php';
require_once 'enviar_email.php';

function conectarDB() {
    global $host, $usuario, $password, $base_datos;
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$base_datos;charset=utf8mb4", $usuario, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Error de conexión DB: " . $e->getMessage());
        return null;
    }
}

function limpiarInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function generarUserKey($email) {
    return $email . '_lumetrix';
}

// Limpiar códigos expirados al inicio
$pdo = conectarDB();
if ($pdo) {
    limpiarCodigosExpirados($pdo);
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'register':
        $input = json_decode(file_get_contents('php://input'), true);
        
        $email = limpiarInput($input['email'] ?? '');
        $nombre = limpiarInput($input['nombre'] ?? '');
        $password = $input['password'] ?? '';
        
        if (empty($email) || empty($nombre) || empty($password)) {
            echo json_encode(['success' => false, 'error' => 'Faltan datos requeridos']);
            exit;
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'error' => 'Email inválido']);
            exit;
        }
        
        if (strlen($password) < 6) {
            echo json_encode(['success' => false, 'error' => 'La contraseña debe tener al menos 6 caracteres']);
            exit;
        }
        
        try {
            // Verificar si el email ya existe
            $stmt = $pdo->prepare("SELECT id FROM usuarios_aplicaciones WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->fetch()) {
                echo json_encode(['success' => false, 'error' => 'Este email ya está registrado']);
                exit;
            }
            
            // Generar código de verificación
            $codigo = generarCodigoVerificacion();
            $tiempo_expiracion = date('Y-m-d H:i:s', strtotime('+24 hours'));
            
            // Insertar usuario (activo = 0 hasta verificar)
            $stmt = $pdo->prepare("
                INSERT INTO usuarios_aplicaciones 
                (email, nombre, password, activo, verification_code, verification_expiry, fecha_registro) 
                VALUES (?, ?, ?, 0, ?, ?, NOW())
            ");
            
            $password_hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt->execute([$email, $nombre, $password_hash, $codigo, $tiempo_expiracion]);
            
            // Enviar email de verificación
            $email_enviado = enviarEmailVerificacion($email, $nombre, $codigo);
            
            $response = [
                'success' => true,
                'message' => 'Registro exitoso. Revisa tu email para el código de verificación.',
                'email_sent' => $email_enviado,
                'requires_verification' => true,
                'user_key' => generarUserKey($email)
            ];
            
            // En modo desarrollo, incluir el código si el email falla
            if (!$email_enviado) {
                $response['debug_code'] = $codigo;
                $response['message'] .= ' (Modo desarrollo: código = ' . $codigo . ')';
            }
            
            echo json_encode($response);
            
        } catch (Exception $e) {
            error_log("Error en registro: " . $e->getMessage());
            echo json_encode(['success' => false, 'error' => 'Error interno del servidor']);
        }
        break;
        
    case 'verify_code':
        $input = json_decode(file_get_contents('php://input'), true);
        
        $email = limpiarInput($input['email'] ?? '');
        $codigo = limpiarInput($input['codigo'] ?? '');
        
        if (empty($email) || empty($codigo)) {
            echo json_encode(['success' => false, 'error' => 'Faltan datos requeridos']);
            exit;
        }
        
        try {
            $stmt = $pdo->prepare("
                SELECT id, verification_code, verification_expiry 
                FROM usuarios_aplicaciones 
                WHERE email = ? AND activo = 0
            ");
            $stmt->execute([$email]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$usuario) {
                echo json_encode(['success' => false, 'error' => 'Usuario no encontrado o ya verificado']);
                exit;
            }
            
            if ($usuario['verification_code'] !== $codigo) {
                echo json_encode(['success' => false, 'error' => 'Código incorrecto']);
                exit;
            }
            
            if (!codigoEsValido($usuario['verification_expiry'])) {
                echo json_encode(['success' => false, 'error' => 'Código expirado']);
                exit;
            }
            
            // Activar cuenta
            $stmt = $pdo->prepare("
                UPDATE usuarios_aplicaciones 
                SET activo = 1, 
                    verification_code = NULL, 
                    verification_expiry = NULL,
                    verified_at = NOW()
                WHERE email = ?
            ");
            $stmt->execute([$email]);
            
            echo json_encode([
                'success' => true,
                'message' => '¡Cuenta verificada correctamente!',
                'verified' => true,
                'user_key' => generarUserKey($email)
            ]);
            
        } catch (Exception $e) {
            error_log("Error en verificación: " . $e->getMessage());
            echo json_encode(['success' => false, 'error' => 'Error interno del servidor']);
        }
        break;
        
    case 'resend_code':
        $input = json_decode(file_get_contents('php://input'), true);
        
        $email = limpiarInput($input['email'] ?? '');
        
        if (empty($email)) {
            echo json_encode(['success' => false, 'error' => 'Email requerido']);
            exit;
        }
        
        try {
            $stmt = $pdo->prepare("
                SELECT id, nombre, verification_code, verification_expiry 
                FROM usuarios_aplicaciones 
                WHERE email = ? AND activo = 0
            ");
            $stmt->execute([$email]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$usuario) {
                echo json_encode(['success' => false, 'error' => 'Usuario no encontrado o ya verificado']);
                exit;
            }
            
            // Generar nuevo código
            $codigo = generarCodigoVerificacion();
            $tiempo_expiracion = date('Y-m-d H:i:s', strtotime('+24 hours'));
            
            // Actualizar código
            $stmt = $pdo->prepare("
                UPDATE usuarios_aplicaciones 
                SET verification_code = ?, verification_expiry = ?
                WHERE email = ?
            ");
            $stmt->execute([$codigo, $tiempo_expiracion, $email]);
            
            // Enviar email
            $email_enviado = enviarEmailVerificacion($email, $usuario['nombre'], $codigo);
            
            $response = [
                'success' => true,
                'message' => 'Código reenviado a tu email',
                'email_sent' => $email_enviado
            ];
            
            if (!$email_enviado) {
                $response['debug_code'] = $codigo;
            }
            
            echo json_encode($response);
            
        } catch (Exception $e) {
            error_log("Error reenviando código: " . $e->getMessage());
            echo json_encode(['success' => false, 'error' => 'Error interno del servidor']);
        }
        break;
        
    case 'login':
        $input = json_decode(file_get_contents('php://input'), true);
        
        $username = limpiarInput($input['username'] ?? '');
        $password = $input['password'] ?? '';
        
        if (empty($username) || empty($password)) {
            echo json_encode(['success' => false, 'error' => 'Usuario y contraseña requeridos']);
            exit;
        }
        
        try {
            $stmt = $pdo->prepare("
                SELECT id, email, nombre, password, activo, verified_at 
                FROM usuarios_aplicaciones 
                WHERE email = ?
            ");
            $stmt->execute([$username]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$usuario || !password_verify($password, $usuario['password'])) {
                echo json_encode(['success' => false, 'error' => 'Credenciales incorrectas']);
                exit;
            }
            
            // Verificar que la cuenta esté activa
            if ($usuario['activo'] != 1) {
                echo json_encode(['success' => false, 'error' => 'Debes verificar tu email antes de iniciar sesión']);
                exit;
            }
            
            // Crear sesión
            session_start();
            $_SESSION['user_id'] = $usuario['id'];
            $_SESSION['user_email'] = $usuario['email'];
            $_SESSION['user_nombre'] = $usuario['nombre'];
            
            echo json_encode([
                'success' => true,
                'message' => 'Login exitoso',
                'user' => [
                    'id' => $usuario['id'],
                    'email' => $usuario['email'],
                    'nick' => $usuario['nombre'],
                    'verified' => !empty($usuario['verified_at'])
                ]
            ]);
            
        } catch (Exception $e) {
            error_log("Error en login: " . $e->getMessage());
            echo json_encode(['success' => false, 'error' => 'Error interno del servidor']);
        }
        break;
        
    case 'check_session':
        session_start();
        
        if (isset($_SESSION['user_id'])) {
            try {
                $stmt = $pdo->prepare("
                    SELECT id, email, nombre, activo, verified_at 
                    FROM usuarios_aplicaciones 
                    WHERE id = ?
                ");
                $stmt->execute([$_SESSION['user_id']]);
                $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($usuario && $usuario['activo'] == 1) {
                    echo json_encode([
                        'success' => true,
                        'user' => [
                            'id' => $usuario['id'],
                            'email' => $usuario['email'],
                            'nick' => $usuario['nombre'],
                            'verified' => !empty($usuario['verified_at'])
                        ]
                    ]);
                } else {
                    session_destroy();
                    echo json_encode(['success' => false, 'error' => 'Sesión inválida']);
                }
            } catch (Exception $e) {
                error_log("Error verificando sesión: " . $e->getMessage());
                echo json_encode(['success' => false, 'error' => 'Error interno del servidor']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'No hay sesión activa']);
        }
        break;
        
    case 'logout':
        session_start();
        session_destroy();
        echo json_encode(['success' => true, 'message' => 'Sesión cerrada']);
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Acción no válida']);
        break;
}
?>