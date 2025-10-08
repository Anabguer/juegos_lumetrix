<?php
/**
 * Verificar estructura de la base de datos
 * Para diagnosticar por qué no se crean las Foreign Keys
 */

require_once __DIR__.'/_common.php';

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Verificar Estructura</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}table{border-collapse:collapse;margin:10px 0;}td,th{border:1px solid #00ff88;padding:8px;text-align:left;}</style>";
echo "</head><body>";
echo "<h1>🔍 Verificar Estructura de Base de Datos</h1>";
echo "<pre>";

$pdo = db();

// ========================================
// 1. VERIFICAR SI EXISTE usuarios_aplicaciones
// ========================================

echo "\n<span class='info'>📋 1. Tabla usuarios_aplicaciones</span>\n\n";

try {
    $st = $pdo->query("SHOW TABLES LIKE 'usuarios_aplicaciones'");
    
    if ($st->rowCount() > 0) {
        echo "<span class='success'>✅ Tabla existe</span>\n\n";
        
        // Mostrar columnas
        echo "<span class='info'>📋 Columnas:</span>\n";
        $cols = $pdo->query("SHOW COLUMNS FROM usuarios_aplicaciones")->fetchAll(PDO::FETCH_ASSOC);
        
        echo "<table>";
        echo "<tr><th>Campo</th><th>Tipo</th><th>Null</th><th>Key</th><th>Default</th></tr>";
        foreach ($cols as $col) {
            echo "<tr>";
            echo "<td>{$col['Field']}</td>";
            echo "<td>{$col['Type']}</td>";
            echo "<td>{$col['Null']}</td>";
            echo "<td>{$col['Key']}</td>";
            echo "<td>{$col['Default']}</td>";
            echo "</tr>";
        }
        echo "</table>\n";
        
        // Verificar si existe usuario_aplicacion_key
        $hasKey = false;
        foreach ($cols as $col) {
            if ($col['Field'] === 'usuario_aplicacion_key') {
                $hasKey = true;
                echo "\n<span class='success'>✅ Columna usuario_aplicacion_key existe (tipo: {$col['Type']})</span>\n";
                
                if ($col['Key'] === 'UNI' || $col['Key'] === 'PRI') {
                    echo "<span class='success'>✅ Es UNIQUE o PRIMARY KEY</span>\n";
                } else {
                    echo "<span class='warning'>⚠️  NO es UNIQUE (puede causar problemas)</span>\n";
                }
            }
        }
        
        if (!$hasKey) {
            echo "\n<span class='error'>❌ Columna usuario_aplicacion_key NO existe</span>\n";
            echo "<span class='warning'>⚠️  Las Foreign Keys no se pueden crear sin esta columna</span>\n";
        }
        
        // Mostrar índices
        echo "\n<span class='info'>📇 Índices:</span>\n";
        $indices = $pdo->query("SHOW INDEX FROM usuarios_aplicaciones")->fetchAll(PDO::FETCH_ASSOC);
        foreach ($indices as $idx) {
            echo "   - {$idx['Key_name']}: {$idx['Column_name']} ({$idx['Index_type']})\n";
        }
        
    } else {
        echo "<span class='error'>❌ Tabla NO existe</span>\n";
        echo "<span class='warning'>⚠️  Necesitas crear usuarios_aplicaciones primero</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 2. VERIFICAR lumetrix_progreso
// ========================================

echo "\n<span class='info'>📋 2. Tabla lumetrix_progreso</span>\n\n";

try {
    $cols = $pdo->query("SHOW COLUMNS FROM lumetrix_progreso")->fetchAll(PDO::FETCH_ASSOC);
    echo "<span class='success'>✅ Tabla existe</span>\n\n";
    
    echo "<table>";
    echo "<tr><th>Campo</th><th>Tipo</th><th>Null</th><th>Key</th><th>Default</th></tr>";
    foreach ($cols as $col) {
        echo "<tr>";
        echo "<td>{$col['Field']}</td>";
        echo "<td>{$col['Type']}</td>";
        echo "<td>{$col['Null']}</td>";
        echo "<td>{$col['Key']}</td>";
        echo "<td>{$col['Default']}</td>";
        echo "</tr>";
    }
    echo "</table>\n";
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 3. VERIFICAR lumetrix_runs
// ========================================

echo "\n<span class='info'>📋 3. Tabla lumetrix_runs</span>\n\n";

try {
    $cols = $pdo->query("SHOW COLUMNS FROM lumetrix_runs")->fetchAll(PDO::FETCH_ASSOC);
    echo "<span class='success'>✅ Tabla existe</span>\n\n";
    
    echo "<table>";
    echo "<tr><th>Campo</th><th>Tipo</th><th>Null</th><th>Key</th><th>Default</th></tr>";
    foreach ($cols as $col) {
        echo "<tr>";
        echo "<td>{$col['Field']}</td>";
        echo "<td>{$col['Type']}</td>";
        echo "<td>{$col['Null']}</td>";
        echo "<td>{$col['Key']}</td>";
        echo "<td>{$col['Default']}</td>";
        echo "</tr>";
    }
    echo "</table>\n";
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 4. VERIFICAR FOREIGN KEYS
// ========================================

echo "\n<span class='info'>📋 4. Foreign Keys</span>\n\n";

try {
    $fks = $pdo->query("
        SELECT 
            TABLE_NAME,
            CONSTRAINT_NAME,
            COLUMN_NAME,
            REFERENCED_TABLE_NAME,
            REFERENCED_COLUMN_NAME
        FROM 
            information_schema.KEY_COLUMN_USAGE
        WHERE 
            TABLE_SCHEMA = '" . DB_NOMBRE . "'
            AND TABLE_NAME LIKE 'lumetrix_%'
            AND REFERENCED_TABLE_NAME IS NOT NULL
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($fks) > 0) {
        echo "<span class='success'>✅ Foreign Keys encontradas:</span>\n\n";
        echo "<table>";
        echo "<tr><th>Tabla</th><th>FK Name</th><th>Columna</th><th>Ref. Tabla</th><th>Ref. Columna</th></tr>";
        foreach ($fks as $fk) {
            echo "<tr>";
            echo "<td>{$fk['TABLE_NAME']}</td>";
            echo "<td>{$fk['CONSTRAINT_NAME']}</td>";
            echo "<td>{$fk['COLUMN_NAME']}</td>";
            echo "<td>{$fk['REFERENCED_TABLE_NAME']}</td>";
            echo "<td>{$fk['REFERENCED_COLUMN_NAME']}</td>";
            echo "</tr>";
        }
        echo "</table>\n";
    } else {
        echo "<span class='warning'>⚠️  No se encontraron Foreign Keys</span>\n";
        echo "<span class='info'>   Esto puede ser porque:</span>\n";
        echo "<span class='info'>   - La tabla usuarios_aplicaciones no tiene usuario_aplicacion_key</span>\n";
        echo "<span class='info'>   - El tipo de dato no coincide exactamente</span>\n";
        echo "<span class='info'>   - La tabla es MyISAM (necesita InnoDB)</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 5. DATOS DE PRUEBA
// ========================================

echo "\n<span class='info'>📋 5. Datos existentes</span>\n\n";

try {
    // Contar usuarios
    $count_users = $pdo->query("SELECT COUNT(*) as c FROM usuarios_aplicaciones WHERE app_codigo = 'lumetrix'")->fetch()['c'];
    echo "<span class='info'>👥 Usuarios de Lumetrix: $count_users</span>\n";
    
    // Contar progreso
    $count_prog = $pdo->query("SELECT COUNT(*) as c FROM lumetrix_progreso")->fetch()['c'];
    echo "<span class='info'>📊 Registros de progreso: $count_prog</span>\n";
    
    // Contar runs
    $count_runs = $pdo->query("SELECT COUNT(*) as c FROM lumetrix_runs")->fetch()['c'];
    echo "<span class='info'>🎮 Partidas jugadas: $count_runs</span>\n";
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='success'>✅ VERIFICACIÓN COMPLETADA</span>\n";
echo "<span class='info'>========================================</span>\n";

echo "</pre>";
echo "<p><a href='test_auth.html' style='color:#00ffff'>→ Test de autenticación</a></p>";
echo "<p><a href='test_db.php' style='color:#00ffff'>← Volver a test DB</a></p>";
echo "</body></html>";

