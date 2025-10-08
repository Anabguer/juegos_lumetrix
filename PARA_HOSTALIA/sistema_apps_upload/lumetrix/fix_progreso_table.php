<?php
/**
 * Corregir tabla lumetrix_progreso (eliminar id AUTO_INCREMENT)
 */

require_once __DIR__.'/_common.php';

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Fix lumetrix_progreso</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}</style>";
echo "</head><body>";
echo "<h1>🔧 Fix lumetrix_progreso</h1>";
echo "<pre>";

$pdo = db();

echo "<span class='info'>========================================</span>\n";
echo "<span class='info'>🔧 CORRECCIÓN DE lumetrix_progreso</span>\n";
echo "<span class='info'>========================================</span>\n\n";

try {
    // Verificar si hay datos
    $count = $pdo->query("SELECT COUNT(*) as c FROM lumetrix_progreso")->fetch()['c'];
    echo "<span class='info'>📊 Registros actuales: $count</span>\n\n";
    
    if ($count > 0) {
        echo "<span class='warning'>⚠️  Hay datos en la tabla. Haciendo backup...</span>\n";
        
        // Crear tabla temporal con datos
        $pdo->exec("
            CREATE TEMPORARY TABLE lumetrix_progreso_backup AS
            SELECT usuario_aplicacion_key, nivel_actual, total_time_s, updated_at
            FROM lumetrix_progreso
        ");
        
        echo "<span class='success'>✅ Backup temporal creado</span>\n";
    }
    
    // Eliminar la tabla actual
    echo "\n<span class='warning'>⚠️  Eliminando tabla actual...</span>\n";
    $pdo->exec("DROP TABLE IF EXISTS lumetrix_progreso");
    echo "<span class='success'>✅ Tabla eliminada</span>\n";
    
    // Crear tabla correcta (sin id, con usuario_aplicacion_key como PK)
    echo "\n<span class='info'>📋 Creando tabla correcta...</span>\n";
    $pdo->exec("
        CREATE TABLE `lumetrix_progreso` (
          `usuario_aplicacion_key` VARCHAR(150) NOT NULL,
          `nivel_actual` INT NOT NULL DEFAULT 1,
          `total_time_s` INT NOT NULL DEFAULT 0,
          `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (`usuario_aplicacion_key`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    echo "<span class='success'>✅ Tabla creada correctamente (sin id)</span>\n";
    
    // Restaurar datos si había
    if ($count > 0) {
        echo "\n<span class='info'>📥 Restaurando datos...</span>\n";
        $pdo->exec("
            INSERT INTO lumetrix_progreso 
            SELECT * FROM lumetrix_progreso_backup
        ");
        echo "<span class='success'>✅ Datos restaurados ($count registros)</span>\n";
    }
    
    // Crear Foreign Key
    echo "\n<span class='info'>🔗 Creando Foreign Key...</span>\n";
    
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
        echo "<span class='error'>❌ Error creando FK: {$e->getMessage()}</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// VERIFICACIÓN FINAL
// ========================================

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='info'>📊 VERIFICACIÓN FINAL</span>\n";
echo "<span class='info'>========================================</span>\n\n";

// Mostrar estructura
echo "<span class='info'>📋 Estructura de lumetrix_progreso:</span>\n\n";
$cols = $pdo->query("SHOW COLUMNS FROM lumetrix_progreso")->fetchAll(PDO::FETCH_ASSOC);
foreach ($cols as $col) {
    $key = $col['Key'] === 'PRI' ? '🔑' : ($col['Key'] === 'UNI' ? '🎯' : '  ');
    echo "   $key {$col['Field']}: {$col['Type']}\n";
}

// Verificar FK
echo "\n<span class='info'>🔗 Foreign Keys de Lumetrix:</span>\n\n";
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

foreach ($fks as $fk) {
    echo "<span class='success'>   ✅ {$fk['TABLE_NAME']}.{$fk['CONSTRAINT_NAME']}</span>\n";
    echo "<span class='info'>      {$fk['COLUMN_NAME']} → {$fk['REFERENCED_TABLE_NAME']}.{$fk['REFERENCED_COLUMN_NAME']}</span>\n";
}

echo "\n<span class='info'>========================================</span>\n";

if (count($fks) >= 2) {
    echo "<span class='success'>✅ TODAS LAS FOREIGN KEYS CREADAS</span>\n";
} else {
    echo "<span class='warning'>⚠️  Falta alguna Foreign Key</span>\n";
}

echo "<span class='info'>========================================</span>\n";

echo "</pre>";
echo "<p><a href='verificar_estructura.php' style='color:#00ffff'>→ Verificar estructura completa</a></p>";
echo "<p><a href='test_auth.html' style='color:#00ffff'>→ Test de autenticación</a></p>";
echo "</body></html>";

