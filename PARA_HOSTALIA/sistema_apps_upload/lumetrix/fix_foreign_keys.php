<?php
/**
 * Corregir tipos de datos y crear Foreign Keys
 */

require_once __DIR__.'/_common.php';

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Fix Foreign Keys</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}</style>";
echo "</head><body>";
echo "<h1>🔧 Lumetrix - Corregir Foreign Keys</h1>";
echo "<pre>";

$pdo = db();

echo "<span class='info'>========================================</span>\n";
echo "<span class='info'>🔧 CORRECCIÓN DE TIPOS DE DATOS</span>\n";
echo "<span class='info'>========================================</span>\n\n";

// ========================================
// 1. CORREGIR lumetrix_progreso
// ========================================

echo "<span class='info'>📋 1. Corrigiendo lumetrix_progreso</span>\n\n";

try {
    // Modificar tipo de columna a VARCHAR(150) para coincidir
    $pdo->exec("
        ALTER TABLE lumetrix_progreso 
        MODIFY COLUMN usuario_aplicacion_key VARCHAR(150) NOT NULL
    ");
    
    echo "<span class='success'>✅ usuario_aplicacion_key → VARCHAR(150)</span>\n";
    
    // Eliminar columna id si existe (no debería estar)
    $cols = $pdo->query("SHOW COLUMNS FROM lumetrix_progreso")->fetchAll(PDO::FETCH_ASSOC);
    $hasId = false;
    foreach ($cols as $col) {
        if ($col['Field'] === 'id' && $col['Key'] === 'PRI') {
            $hasId = true;
            break;
        }
    }
    
    if ($hasId) {
        echo "<span class='warning'>⚠️  Columna 'id' innecesaria encontrada, eliminando...</span>\n";
        
        // Primero eliminar la PRIMARY KEY
        $pdo->exec("ALTER TABLE lumetrix_progreso DROP PRIMARY KEY");
        // Eliminar columna id
        $pdo->exec("ALTER TABLE lumetrix_progreso DROP COLUMN id");
        // Crear PRIMARY KEY en usuario_aplicacion_key
        $pdo->exec("ALTER TABLE lumetrix_progreso ADD PRIMARY KEY (usuario_aplicacion_key)");
        
        echo "<span class='success'>✅ Columna 'id' eliminada, PK en usuario_aplicacion_key</span>\n";
    }
    
    // Intentar crear FK
    echo "<span class='info'>🔗 Creando FK fk_lx_prog_user...</span>\n";
    
    try {
        $pdo->exec("
            ALTER TABLE lumetrix_progreso
            ADD CONSTRAINT fk_lx_prog_user
            FOREIGN KEY (usuario_aplicacion_key)
            REFERENCES usuarios_aplicaciones(usuario_aplicacion_key)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        ");
        echo "<span class='success'>✅ FK fk_lx_prog_user creada</span>\n";
    } catch (PDOException $e) {
        if (strpos($e->getMessage(), 'Duplicate') !== false) {
            echo "<span class='warning'>⚠️  FK ya existe (OK)</span>\n";
        } else {
            echo "<span class='error'>❌ Error creando FK: {$e->getMessage()}</span>\n";
        }
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 2. CORREGIR lumetrix_runs
// ========================================

echo "\n<span class='info'>📋 2. Corrigiendo lumetrix_runs</span>\n\n";

try {
    // Modificar tipo de columna a VARCHAR(150)
    $pdo->exec("
        ALTER TABLE lumetrix_runs 
        MODIFY COLUMN usuario_aplicacion_key VARCHAR(150) NOT NULL
    ");
    
    echo "<span class='success'>✅ usuario_aplicacion_key → VARCHAR(150)</span>\n";
    
    // Intentar crear FK
    echo "<span class='info'>🔗 Creando FK fk_lx_runs_user...</span>\n";
    
    try {
        $pdo->exec("
            ALTER TABLE lumetrix_runs
            ADD CONSTRAINT fk_lx_runs_user
            FOREIGN KEY (usuario_aplicacion_key)
            REFERENCES usuarios_aplicaciones(usuario_aplicacion_key)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        ");
        echo "<span class='success'>✅ FK fk_lx_runs_user creada</span>\n";
    } catch (PDOException $e) {
        if (strpos($e->getMessage(), 'Duplicate') !== false) {
            echo "<span class='warning'>⚠️  FK ya existe (OK)</span>\n";
        } else {
            echo "<span class='error'>❌ Error creando FK: {$e->getMessage()}</span>\n";
        }
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 3. VERIFICACIÓN FINAL
// ========================================

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='info'>📊 VERIFICACIÓN FINAL</span>\n";
echo "<span class='info'>========================================</span>\n\n";

// Verificar FK creadas
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
    echo "<span class='success'>✅ Foreign Keys creadas:</span>\n\n";
    foreach ($fks as $fk) {
        echo "<span class='success'>   ✅ {$fk['TABLE_NAME']}.{$fk['CONSTRAINT_NAME']}</span>\n";
        echo "<span class='info'>      {$fk['COLUMN_NAME']} → {$fk['REFERENCED_TABLE_NAME']}.{$fk['REFERENCED_COLUMN_NAME']}</span>\n";
    }
} else {
    echo "<span class='error'>❌ No se crearon Foreign Keys</span>\n";
    echo "<span class='warning'>   Puede ser problema de permisos o motor MyISAM</span>\n";
}

// Verificar tipos de datos
echo "\n<span class='info'>📋 Tipos de datos de usuario_aplicacion_key:</span>\n";

$tipo_ua = $pdo->query("SHOW COLUMNS FROM usuarios_aplicaciones LIKE 'usuario_aplicacion_key'")->fetch()['Type'];
$tipo_prog = $pdo->query("SHOW COLUMNS FROM lumetrix_progreso LIKE 'usuario_aplicacion_key'")->fetch()['Type'];
$tipo_runs = $pdo->query("SHOW COLUMNS FROM lumetrix_runs LIKE 'usuario_aplicacion_key'")->fetch()['Type'];

echo "   - usuarios_aplicaciones: <span class='" . ($tipo_ua === 'varchar(150)' ? 'success' : 'warning') . "'>$tipo_ua</span>\n";
echo "   - lumetrix_progreso: <span class='" . ($tipo_prog === 'varchar(150)' ? 'success' : 'warning') . "'>$tipo_prog</span>\n";
echo "   - lumetrix_runs: <span class='" . ($tipo_runs === 'varchar(150)' ? 'success' : 'warning') . "'>$tipo_runs</span>\n";

if ($tipo_ua === $tipo_prog && $tipo_prog === $tipo_runs) {
    echo "\n<span class='success'>✅ Todos los tipos coinciden</span>\n";
} else {
    echo "\n<span class='warning'>⚠️  Los tipos NO coinciden (puede impedir FK)</span>\n";
}

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='success'>✅ CORRECCIÓN COMPLETADA</span>\n";
echo "<span class='info'>========================================</span>\n";

echo "</pre>";
echo "<p><a href='verificar_estructura.php' style='color:#00ffff'>→ Verificar estructura completa</a></p>";
echo "<p><a href='test_auth.html' style='color:#00ffff'>→ Test de autenticación</a></p>";
echo "</body></html>";

