<?php
/**
 * Setup completo de base de datos para Lumetrix
 * Ejecutar UNA VEZ para verificar/crear toda la estructura
 */

require_once __DIR__.'/_common.php';

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Lumetrix - Setup DB Completo</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}</style>";
echo "</head><body>";
echo "<h1>🔧 Lumetrix - Setup Completo de Base de Datos</h1>";
echo "<pre>";

$pdo = db();

// ========================================
// 1. VERIFICAR usuarios_aplicaciones
// ========================================

echo "\n<span class='info'>📋 PASO 1: Verificar tabla usuarios_aplicaciones</span>\n";

try {
    $st = $pdo->query("SHOW CREATE TABLE usuarios_aplicaciones");
    $result = $st->fetch(PDO::FETCH_ASSOC);
    echo "<span class='success'>✅ usuarios_aplicaciones existe</span>\n";
    
    // Verificar columna usuario_aplicacion_key
    $st = $pdo->query("SHOW COLUMNS FROM usuarios_aplicaciones LIKE 'usuario_aplicacion_key'");
    $col = $st->fetch(PDO::FETCH_ASSOC);
    
    if ($col) {
        echo "<span class='success'>✅ Columna usuario_aplicacion_key existe (tipo: {$col['Type']})</span>\n";
    } else {
        echo "<span class='error'>❌ Columna usuario_aplicacion_key NO existe</span>\n";
        echo "<span class='warning'>   Creando columna...</span>\n";
        
        $pdo->exec("
            ALTER TABLE usuarios_aplicaciones 
            ADD COLUMN usuario_aplicacion_key VARCHAR(190) NULL UNIQUE
        ");
        
        echo "<span class='success'>✅ Columna usuario_aplicacion_key creada</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
    echo "<span class='warning'>⚠️  Creando tabla usuarios_aplicaciones...</span>\n";
    
    // Crear tabla base
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `usuarios_aplicaciones` (
          `usuario_aplicacion_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
          `usuario_aplicacion_key` VARCHAR(190) NOT NULL UNIQUE,
          `email` VARCHAR(255) NOT NULL,
          `nombre` VARCHAR(255) NULL,
          `nick` VARCHAR(100) NULL,
          `password_hash` VARCHAR(255) NOT NULL,
          `app_codigo` VARCHAR(50) NOT NULL,
          `fecha_registro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `ultimo_acceso` DATETIME NULL,
          `activo` TINYINT(1) NOT NULL DEFAULT 1,
          `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`usuario_aplicacion_id`),
          UNIQUE KEY `uk_key` (`usuario_aplicacion_key`),
          KEY `idx_email` (`email`),
          KEY `idx_app` (`app_codigo`),
          KEY `idx_nick_app` (`nick`, `app_codigo`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    
    echo "<span class='success'>✅ usuarios_aplicaciones creada</span>\n";
}

// ========================================
// 2. CREAR lumetrix_progreso
// ========================================

echo "\n<span class='info'>📋 PASO 2: Crear lumetrix_progreso</span>\n";

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `lumetrix_progreso` (
          `usuario_aplicacion_key` VARCHAR(190) NOT NULL,
          `nivel_actual` INT NOT NULL DEFAULT 1,
          `total_time_s` INT NOT NULL DEFAULT 0,
          `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (`usuario_aplicacion_key`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    
    echo "<span class='success'>✅ lumetrix_progreso creada</span>\n";
    
    // Verificar si existe la FK
    $st = $pdo->query("
        SELECT CONSTRAINT_NAME 
        FROM information_schema.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = '" . DB_NOMBRE . "' 
        AND TABLE_NAME = 'lumetrix_progreso' 
        AND CONSTRAINT_TYPE = 'FOREIGN KEY'
        AND CONSTRAINT_NAME = 'fk_lx_prog_user'
    ");
    
    if ($st->rowCount() == 0) {
        echo "<span class='warning'>⚠️  FK fk_lx_prog_user no existe, creando...</span>\n";
        
        $pdo->exec("
            ALTER TABLE lumetrix_progreso
            ADD CONSTRAINT fk_lx_prog_user
            FOREIGN KEY (usuario_aplicacion_key)
            REFERENCES usuarios_aplicaciones(usuario_aplicacion_key)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        ");
        
        echo "<span class='success'>✅ FK fk_lx_prog_user creada</span>\n";
    } else {
        echo "<span class='success'>✅ FK fk_lx_prog_user ya existe</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 3. CREAR lumetrix_runs
// ========================================

echo "\n<span class='info'>📋 PASO 3: Crear lumetrix_runs</span>\n";

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `lumetrix_runs` (
          `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
          `usuario_aplicacion_key` VARCHAR(190) NOT NULL,
          `level` INT NOT NULL,
          `duration_s` INT NOT NULL DEFAULT 0,
          `success` TINYINT(1) NOT NULL DEFAULT 0,
          `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`),
          KEY `idx_lx_runs_user` (`usuario_aplicacion_key`),
          KEY `idx_lx_runs_level` (`level`),
          KEY `idx_lx_runs_success` (`success`),
          KEY `idx_lx_runs_created` (`created_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    
    echo "<span class='success'>✅ lumetrix_runs creada</span>\n";
    
    // Verificar si existe la FK
    $st = $pdo->query("
        SELECT CONSTRAINT_NAME 
        FROM information_schema.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = '" . DB_NOMBRE . "' 
        AND TABLE_NAME = 'lumetrix_runs' 
        AND CONSTRAINT_TYPE = 'FOREIGN KEY'
        AND CONSTRAINT_NAME = 'fk_lx_runs_user'
    ");
    
    if ($st->rowCount() == 0) {
        echo "<span class='warning'>⚠️  FK fk_lx_runs_user no existe, creando...</span>\n";
        
        $pdo->exec("
            ALTER TABLE lumetrix_runs
            ADD CONSTRAINT fk_lx_runs_user
            FOREIGN KEY (usuario_aplicacion_key)
            REFERENCES usuarios_aplicaciones(usuario_aplicacion_key)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        ");
        
        echo "<span class='success'>✅ FK fk_lx_runs_user creada</span>\n";
    } else {
        echo "<span class='success'>✅ FK fk_lx_runs_user ya existe</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 4. CREAR VISTA
// ========================================

echo "\n<span class='info'>📋 PASO 4: Crear vista lumetrix_ranking</span>\n";

try {
    $pdo->exec("
        CREATE OR REPLACE VIEW `lumetrix_ranking` AS
        SELECT 
            ua.nick,
            ua.email,
            p.nivel_actual,
            p.total_time_s,
            p.updated_at,
            (SELECT COUNT(*) FROM lumetrix_runs r WHERE r.usuario_aplicacion_key = ua.usuario_aplicacion_key AND r.success = 1) AS victorias,
            (SELECT COUNT(*) FROM lumetrix_runs r WHERE r.usuario_aplicacion_key = ua.usuario_aplicacion_key) AS intentos_totales
        FROM 
            usuarios_aplicaciones ua
            INNER JOIN lumetrix_progreso p ON p.usuario_aplicacion_key = ua.usuario_aplicacion_key
        WHERE 
            ua.app_codigo = 'lumetrix'
            AND ua.activo = 1
        ORDER BY 
            p.nivel_actual DESC,
            p.total_time_s ASC
    ");
    
    echo "<span class='success'>✅ Vista lumetrix_ranking creada</span>\n";
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 5. VERIFICACIÓN FINAL
// ========================================

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='info'>📊 VERIFICACIÓN FINAL</span>\n";
echo "<span class='info'>========================================</span>\n\n";

// Listar todas las tablas de Lumetrix
$tables = $pdo->query("SHOW TABLES LIKE 'lumetrix_%'")->fetchAll(PDO::FETCH_COLUMN);
echo "<span class='success'>📁 Tablas de Lumetrix:</span>\n";
foreach ($tables as $table) {
    $count = $pdo->query("SELECT COUNT(*) as c FROM `$table`")->fetch()['c'];
    echo "   ✅ $table ($count registros)\n";
}

// Listar Foreign Keys
echo "\n<span class='success'>🔗 Foreign Keys:</span>\n";
$fks = $pdo->query("
    SELECT 
        TABLE_NAME,
        CONSTRAINT_NAME,
        REFERENCED_TABLE_NAME
    FROM 
        information_schema.KEY_COLUMN_USAGE
    WHERE 
        TABLE_SCHEMA = '" . DB_NOMBRE . "'
        AND TABLE_NAME LIKE 'lumetrix_%'
        AND REFERENCED_TABLE_NAME IS NOT NULL
")->fetchAll(PDO::FETCH_ASSOC);

if (count($fks) > 0) {
    foreach ($fks as $fk) {
        echo "   ✅ {$fk['TABLE_NAME']}.{$fk['CONSTRAINT_NAME']} → {$fk['REFERENCED_TABLE_NAME']}\n";
    }
} else {
    echo "   <span class='warning'>⚠️  No se encontraron Foreign Keys (pero las tablas funcionan)</span>\n";
}

// Listar índices
echo "\n<span class='success'>📇 Índices en lumetrix_runs:</span>\n";
$indices = $pdo->query("SHOW INDEX FROM lumetrix_runs WHERE Key_name != 'PRIMARY'")->fetchAll(PDO::FETCH_ASSOC);
foreach ($indices as $idx) {
    echo "   ✅ {$idx['Key_name']} en columna {$idx['Column_name']}\n";
}

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='success'>✅ SETUP COMPLETO</span>\n";
echo "<span class='info'>========================================</span>\n\n";

echo "<span class='info'>🎯 Próximo paso:</span>\n";
echo "   1. Jugar en: <a href='../app_lumetrix.html' style='color:#00ffff'>app_lumetrix.html</a>\n";
echo "   2. Test auth: <a href='test_auth.html' style='color:#00ffff'>test_auth.html</a>\n";
echo "   3. Verificar en Navicat que aparecen tus partidas\n";

echo "</pre></body></html>";

