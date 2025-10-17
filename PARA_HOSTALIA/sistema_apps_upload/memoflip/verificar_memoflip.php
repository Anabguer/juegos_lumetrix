<?php
/**
 * Verificar estructura y datos de Memoflip
 * Script para diagnosticar problemas de conexión y datos
 */

// Configuración de Memoflip (usar las mismas credenciales que Lumetrix)
define('DB_HOST',    'PMYSQL165.dns-servicio.com');
define('DB_USUARIO', 'sistema_apps_user');
define('DB_CONTRA',  'GestionUploadSistemaApps!');
define('DB_NOMBRE',  '9606966_sistema_apps_db');
define('DB_CHARSET', 'utf8');
define('DB_PORT',    3306);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Verificar Memoflip</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}table{border-collapse:collapse;margin:10px 0;}td,th{border:1px solid #00ff88;padding:8px;text-align:left;}</style>";
echo "</head><body>";
echo "<h1>🔍 Verificar Memoflip - Base de Datos</h1>";
echo "<pre>";

// ========================================
// 1. PROBAR CONEXIÓN
// ========================================

echo "\n<span class='info'>📋 1. Probando conexión a la base de datos</span>\n\n";

try {
    $dsn = 'mysql:host='.DB_HOST.';port='.DB_PORT.';dbname='.DB_NOMBRE.';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USUARIO, DB_CONTRA, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    echo "<span class='success'>✅ CONEXIÓN EXITOSA</span>\n";
    echo "<span class='info'>   Host: " . DB_HOST . "</span>\n";
    echo "<span class='info'>   Base: " . DB_NOMBRE . "</span>\n";
    echo "<span class='info'>   Usuario: " . DB_USUARIO . "</span>\n";
} catch (PDOException $e) {
    echo "<span class='error'>❌ ERROR DE CONEXIÓN: {$e->getMessage()}</span>\n";
    echo "</pre></body></html>";
    exit;
}

// ========================================
// 2. VERIFICAR TABLAS DE MEMOFLIP
// ========================================

echo "\n<span class='info'>📋 2. Tablas de Memoflip</span>\n\n";

try {
    // Buscar tablas que contengan 'memoflip'
    $st = $pdo->query("SHOW TABLES LIKE '%memoflip%'");
    $tablas = $st->fetchAll(PDO::FETCH_COLUMN);
    
    if (count($tablas) > 0) {
        echo "<span class='success'>✅ Tablas de Memoflip encontradas:</span>\n";
        foreach ($tablas as $tabla) {
            echo "   - $tabla\n";
        }
    } else {
        echo "<span class='warning'>⚠️  No se encontraron tablas con 'memoflip'</span>\n";
    }
    
    // Buscar tablas que contengan 'memo'
    $st = $pdo->query("SHOW TABLES LIKE '%memo%'");
    $tablas_memo = $st->fetchAll(PDO::FETCH_COLUMN);
    
    if (count($tablas_memo) > 0) {
        echo "\n<span class='info'>📋 Tablas con 'memo':</span>\n";
        foreach ($tablas_memo as $tabla) {
            echo "   - $tabla\n";
        }
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 3. VERIFICAR TABLA usuarios_aplicaciones PARA MEMOFLIP
// ========================================

echo "\n<span class='info'>📋 3. Usuarios de Memoflip</span>\n\n";

try {
    $st = $pdo->query("SELECT COUNT(*) as c FROM usuarios_aplicaciones WHERE app_codigo = 'memoflip'");
    $count = $st->fetch()['c'];
    echo "<span class='info'>👥 Usuarios de Memoflip: $count</span>\n";
    
    if ($count > 0) {
        echo "\n<span class='info'>📋 Lista de usuarios:</span>\n";
        $st = $pdo->query("SELECT email, nombre, nick, fecha_registro, activo FROM usuarios_aplicaciones WHERE app_codigo = 'memoflip' ORDER BY fecha_registro DESC LIMIT 10");
        $usuarios = $st->fetchAll(PDO::FETCH_ASSOC);
        
        echo "<table>";
        echo "<tr><th>Email</th><th>Nombre</th><th>Nick</th><th>Registro</th><th>Activo</th></tr>";
        foreach ($usuarios as $user) {
            echo "<tr>";
            echo "<td>{$user['email']}</td>";
            echo "<td>{$user['nombre']}</td>";
            echo "<td>{$user['nick']}</td>";
            echo "<td>{$user['fecha_registro']}</td>";
            echo "<td>" . ($user['activo'] ? '✅' : '❌') . "</td>";
            echo "</tr>";
        }
        echo "</table>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 4. VERIFICAR TODAS LAS APLICACIONES
// ========================================

echo "\n<span class='info'>📋 4. Todas las aplicaciones en la base de datos</span>\n\n";

try {
    $st = $pdo->query("SELECT app_codigo, COUNT(*) as usuarios FROM usuarios_aplicaciones GROUP BY app_codigo ORDER BY usuarios DESC");
    $apps = $st->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<table>";
    echo "<tr><th>Aplicación</th><th>Usuarios</th></tr>";
    foreach ($apps as $app) {
        echo "<tr>";
        echo "<td>{$app['app_codigo']}</td>";
        echo "<td>{$app['usuarios']}</td>";
        echo "</tr>";
    }
    echo "</table>\n";
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 5. VERIFICAR TABLAS ESPECÍFICAS DE MEMOFLIP
// ========================================

echo "\n<span class='info'>📋 5. Verificar tablas específicas de Memoflip</span>\n\n";

$tablas_memoflip = ['memoflip_progreso', 'memoflip_runs', 'memoflip_cards', 'memoflip_decks'];

foreach ($tablas_memoflip as $tabla) {
    try {
        $st = $pdo->query("SHOW TABLES LIKE '$tabla'");
        if ($st->rowCount() > 0) {
            echo "<span class='success'>✅ Tabla $tabla existe</span>\n";
            
            // Mostrar columnas
            $cols = $pdo->query("SHOW COLUMNS FROM $tabla")->fetchAll(PDO::FETCH_ASSOC);
            echo "<span class='info'>   Columnas: ";
            foreach ($cols as $col) {
                echo $col['Field'] . " ";
            }
            echo "</span>\n";
            
            // Contar registros
            $count = $pdo->query("SELECT COUNT(*) as c FROM $tabla")->fetch()['c'];
            echo "<span class='info'>   Registros: $count</span>\n";
            
        } else {
            echo "<span class='warning'>⚠️  Tabla $tabla NO existe</span>\n";
        }
    } catch (PDOException $e) {
        echo "<span class='error'>❌ Error en $tabla: {$e->getMessage()}</span>\n";
    }
}

// ========================================
// 6. RESUMEN FINAL
// ========================================

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='success'>✅ VERIFICACIÓN DE MEMOFLIP COMPLETADA</span>\n";
echo "<span class='info'>========================================</span>\n";

echo "\n<span class='info'>💡 PRÓXIMOS PASOS:</span>\n";
echo "<span class='info'>1. Si no hay usuarios de Memoflip, crear el primer usuario</span>\n";
echo "<span class='info'>2. Si no hay tablas específicas, crearlas</span>\n";
echo "<span class='info'>3. Si hay errores de conexión, verificar credenciales</span>\n";

echo "</pre>";
echo "<p><a href='test_memoflip.php' style='color:#00ffff'>→ Test de autenticación Memoflip</a></p>";
echo "<p><a href='../lumetrix/verificar_estructura.php' style='color:#00ffff'>← Ver Lumetrix</a></p>";
echo "</body></html>";
?>

