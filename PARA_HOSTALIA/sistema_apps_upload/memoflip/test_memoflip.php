<?php
/**
 * Test de autenticación para Memoflip
 * Script para probar login y registro
 */

// Configuración de Memoflip (usar las mismas credenciales que Lumetrix)
define('DB_HOST',    'PMYSQL165.dns-servicio.com');
define('DB_USUARIO', 'sistema_apps_user');
define('DB_CONTRA',  'GestionUploadSistemaApps!');
define('DB_NOMBRE',  '9606966_sistema_apps_db');
define('DB_CHARSET', 'utf8');
define('DB_PORT',    3306);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Test Memoflip</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}input,button{padding:8px;margin:4px;background:#111;color:#00ff88;border:1px solid #00ff88;border-radius:4px;}</style>";
echo "</head><body>";
echo "<h1>🧪 Test de Autenticación - Memoflip</h1>";

// ========================================
// FUNCIONES
// ========================================

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    $dsn = 'mysql:host='.DB_HOST.';port='.DB_PORT.';dbname='.DB_NOMBRE.';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USUARIO, DB_CONTRA, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function key_from_email(string $email): string {
    return strtolower(trim($email)) . '_memoflip';
}

// ========================================
// PROCESAR FORMULARIOS
// ========================================

if ($_POST) {
    echo "<pre>";
    
    try {
        $pdo = db();
        
        if (isset($_POST['action']) && $_POST['action'] === 'register') {
            // REGISTRO
            $email = $_POST['email'] ?? '';
            $nombre = $_POST['nombre'] ?? '';
            $nick = $_POST['nick'] ?? '';
            $password = $_POST['password'] ?? '';
            
            if (empty($email) || empty($nombre) || empty($nick) || empty($password)) {
                echo "<span class='error'>❌ Todos los campos son obligatorios</span>\n";
            } else {
                $uakey = key_from_email($email);
                $password_hash = password_hash($password, PASSWORD_DEFAULT);
                
                $st = $pdo->prepare("
                    INSERT INTO usuarios_aplicaciones 
                    (usuario_aplicacion_key, email, nombre, nick, password_hash, app_codigo) 
                    VALUES (?, ?, ?, ?, ?, 'memoflip')
                ");
                
                $st->execute([$uakey, $email, $nombre, $nick, $password_hash]);
                
                echo "<span class='success'>✅ Usuario registrado correctamente</span>\n";
                echo "<span class='info'>   Email: $email</span>\n";
                echo "<span class='info'>   Nick: $nick</span>\n";
                echo "<span class='info'>   UAKey: $uakey</span>\n";
            }
            
        } elseif (isset($_POST['action']) && $_POST['action'] === 'login') {
            // LOGIN
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            
            if (empty($email) || empty($password)) {
                echo "<span class='error'>❌ Email y contraseña son obligatorios</span>\n";
            } else {
                $uakey = key_from_email($email);
                
                $st = $pdo->prepare("
                    SELECT usuario_aplicacion_key, email, nombre, nick, password_hash, activo 
                    FROM usuarios_aplicaciones 
                    WHERE usuario_aplicacion_key = ? AND app_codigo = 'memoflip'
                ");
                
                $st->execute([$uakey]);
                $user = $st->fetch(PDO::FETCH_ASSOC);
                
                if ($user && password_verify($password, $user['password_hash'])) {
                    if ($user['activo']) {
                        echo "<span class='success'>✅ Login exitoso</span>\n";
                        echo "<span class='info'>   Email: {$user['email']}</span>\n";
                        echo "<span class='info'>   Nombre: {$user['nombre']}</span>\n";
                        echo "<span class='info'>   Nick: {$user['nick']}</span>\n";
                        echo "<span class='info'>   UAKey: {$user['usuario_aplicacion_key']}</span>\n";
                    } else {
                        echo "<span class='error'>❌ Usuario inactivo</span>\n";
                    }
                } else {
                    echo "<span class='error'>❌ Credenciales incorrectas</span>\n";
                }
            }
        }
        
    } catch (PDOException $e) {
        echo "<span class='error'>❌ Error de base de datos: {$e->getMessage()}</span>\n";
    }
    
    echo "</pre>";
}

// ========================================
// FORMULARIOS
// ========================================

echo "<div style='display:flex;gap:20px;margin:20px 0;'>";

// FORMULARIO DE REGISTRO
echo "<div style='flex:1;border:1px solid #00ff88;padding:16px;border-radius:8px;'>";
echo "<h3 style='color:#00ffff;margin-top:0;'>📝 Registro</h3>";
echo "<form method='POST'>";
echo "<input type='hidden' name='action' value='register'>";
echo "<div style='margin:8px 0;'>";
echo "<label>Email:</label><br>";
echo "<input type='email' name='email' required style='width:100%;'>";
echo "</div>";
echo "<div style='margin:8px 0;'>";
echo "<label>Nombre:</label><br>";
echo "<input type='text' name='nombre' required style='width:100%;'>";
echo "</div>";
echo "<div style='margin:8px 0;'>";
echo "<label>Nick:</label><br>";
echo "<input type='text' name='nick' required style='width:100%;'>";
echo "</div>";
echo "<div style='margin:8px 0;'>";
echo "<label>Contraseña:</label><br>";
echo "<input type='password' name='password' required style='width:100%;'>";
echo "</div>";
echo "<button type='submit' style='width:100%;background:#00ff88;color:#000;font-weight:bold;'>Registrar</button>";
echo "</form>";
echo "</div>";

// FORMULARIO DE LOGIN
echo "<div style='flex:1;border:1px solid #00ff88;padding:16px;border-radius:8px;'>";
echo "<h3 style='color:#00ffff;margin-top:0;'>🔑 Login</h3>";
echo "<form method='POST'>";
echo "<input type='hidden' name='action' value='login'>";
echo "<div style='margin:8px 0;'>";
echo "<label>Email:</label><br>";
echo "<input type='email' name='email' required style='width:100%;'>";
echo "</div>";
echo "<div style='margin:8px 0;'>";
echo "<label>Contraseña:</label><br>";
echo "<input type='password' name='password' required style='width:100%;'>";
echo "</div>";
echo "<button type='submit' style='width:100%;background:#00ff88;color:#000;font-weight:bold;'>Entrar</button>";
echo "</form>";
echo "</div>";

echo "</div>";

// ========================================
// INFORMACIÓN DE CONEXIÓN
// ========================================

echo "<div style='border:1px solid #00ff88;padding:16px;border-radius:8px;margin:20px 0;'>";
echo "<h3 style='color:#00ffff;margin-top:0;'>🔧 Información de Conexión</h3>";
echo "<pre>";
echo "<span class='info'>Host: " . DB_HOST . "</span>\n";
echo "<span class='info'>Base: " . DB_NOMBRE . "</span>\n";
echo "<span class='info'>Usuario: " . DB_USUARIO . "</span>\n";
echo "<span class='info'>App: memoflip</span>\n";
echo "</pre>";
echo "</div>";

echo "<p><a href='verificar_memoflip.php' style='color:#00ffff'>→ Verificar estructura</a></p>";
echo "<p><a href='../lumetrix/verificar_estructura.php' style='color:#00ffff'>← Ver Lumetrix</a></p>";

echo "</body></html>";
?>

