<?php
/**
 * Funciones comunes para Lumetrix
 */

require_once __DIR__.'/config_hostalia.php';

// Iniciar sesión si no está iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Genera la clave canónica usuario_aplicacion_key
 * REGLA: email + '_' + app (sin modificar @ ni .)
 * 
 * @param string $email Email del usuario (será normalizado a lowercase)
 * @param string $app Código de la aplicación (default: 'lumetrix')
 * @return string Clave canónica
 */
function uakey_from_email(string $email, string $app = 'lumetrix'): string {
    $email = strtolower(trim($email));
    return $email . '_' . $app;
}

/**
 * Obtiene la clave de usuario actual desde la sesión
 * 
 * @return string|null Clave del usuario o null si no hay sesión
 */
function uakey(): ?string {
    return $_SESSION['uakey'] ?? null;
}

/**
 * Requiere que el usuario esté logueado
 * Si no hay sesión, retorna 401 y termina la ejecución
 */
function require_login(): void {
    if (!uakey()) {
        http_response_code(401);
        json_out(['success' => false, 'message' => 'unauthorized']);
    }
}

/**
 * Obtiene la conexión PDO a la base de datos
 * 
 * @return PDO Conexión a la base de datos
 */
function db(): PDO {
    static $pdo = null;
    
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            json_out(['success' => false, 'message' => 'database connection failed']);
        }
    }
    
    return $pdo;
}

/**
 * Envía respuesta JSON y termina la ejecución
 * 
 * @param array $data Datos a enviar como JSON
 */
function json_out(array $data): void {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}
