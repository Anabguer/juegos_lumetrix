<?php
/**
 * Diagnóstico detallado de por qué no se crea la FK
 */

require_once __DIR__.'/_common.php';

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Diagnóstico FK</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}</style>";
echo "</head><body>";
echo "<h1>🔍 Diagnóstico de Foreign Key</h1>";
echo "<pre>";

$pdo = db();

echo "<span class='info'>========================================</span>\n";
echo "<span class='info'>🔍 REQUISITOS PARA FOREIGN KEY</span>\n";
echo "<span class='info'>========================================</span>\n\n";

// 1. Motor de tabla
echo "<span class='info'>1. Verificar motor de tablas (debe ser InnoDB):</span>\n\n";

$st = $pdo->query("
    SELECT TABLE_NAME, ENGINE, TABLE_COLLATION
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = '" . DB_NOMBRE . "'
    AND TABLE_NAME IN ('usuarios_aplicaciones', 'lumetrix_progreso', 'lumetrix_runs')
");
$tables = $st->fetchAll(PDO::FETCH_ASSOC);

foreach ($tables as $table) {
    $ok = $table['ENGINE'] === 'InnoDB' ? 'success' : 'error';
    echo "   <span class='$ok'>{$table['TABLE_NAME']}: {$table['ENGINE']} ({$table['TABLE_COLLATION']})</span>\n";
}

// 2. Tipos de datos
echo "\n<span class='info'>2. Verificar tipos de datos (deben coincidir exactamente):</span>\n\n";

$col_ua = $pdo->query("SHOW FULL COLUMNS FROM usuarios_aplicaciones WHERE Field = 'usuario_aplicacion_key'")->fetch(PDO::FETCH_ASSOC);
$col_prog = $pdo->query("SHOW FULL COLUMNS FROM lumetrix_progreso WHERE Field = 'usuario_aplicacion_key'")->fetch(PDO::FETCH_ASSOC);

echo "   usuarios_aplicaciones.usuario_aplicacion_key:\n";
echo "      Tipo: <span class='info'>{$col_ua['Type']}</span>\n";
echo "      Collation: <span class='info'>{$col_ua['Collation']}</span>\n";
echo "      Null: <span class='info'>{$col_ua['Null']}</span>\n";
echo "      Key: <span class='info'>{$col_ua['Key']}</span>\n\n";

echo "   lumetrix_progreso.usuario_aplicacion_key:\n";
echo "      Tipo: <span class='info'>{$col_prog['Type']}</span>\n";
echo "      Collation: <span class='info'>{$col_prog['Collation']}</span>\n";
echo "      Null: <span class='info'>{$col_prog['Null']}</span>\n";
echo "      Key: <span class='info'>{$col_prog['Key']}</span>\n\n";

$tipo_ok = ($col_ua['Type'] === $col_prog['Type']) ? 'success' : 'error';
$collation_ok = ($col_ua['Collation'] === $col_prog['Collation']) ? 'success' : 'warning';

echo "   Tipo coincide: <span class='$tipo_ok'>" . ($col_ua['Type'] === $col_prog['Type'] ? '✅ SÍ' : '❌ NO') . "</span>\n";
echo "   Collation coincide: <span class='$collation_ok'>" . ($col_ua['Collation'] === $col_prog['Collation'] ? '✅ SÍ' : '⚠️  NO') . "</span>\n";

// 3. Índices
echo "\n<span class='info'>3. Verificar índices (columna referenciada debe tener índice):</span>\n\n";

$indices_ua = $pdo->query("SHOW INDEX FROM usuarios_aplicaciones WHERE Column_name = 'usuario_aplicacion_key'")->fetchAll(PDO::FETCH_ASSOC);
echo "   usuarios_aplicaciones.usuario_aplicacion_key:\n";
foreach ($indices_ua as $idx) {
    echo "      - <span class='success'>{$idx['Key_name']}: {$idx['Index_type']}</span>\n";
}

// 4. Verificar si ya existe la FK (por algún motivo)
echo "\n<span class='info'>4. Verificar si la FK ya existe:</span>\n\n";

$existing_fks = $pdo->query("
    SELECT CONSTRAINT_NAME
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE TABLE_SCHEMA = '" . DB_NOMBRE . "'
    AND TABLE_NAME = 'lumetrix_progreso'
    AND CONSTRAINT_TYPE = 'FOREIGN KEY'
")->fetchAll(PDO::FETCH_COLUMN);

if (count($existing_fks) > 0) {
    echo "   <span class='warning'>⚠️  FK existentes:</span>\n";
    foreach ($existing_fks as $fk) {
        echo "      - $fk\n";
    }
} else {
    echo "   <span class='info'>   No hay FKs existentes</span>\n";
}

// ========================================
// INTENTO DE CORRECCIÓN AUTOMÁTICA
// ========================================

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='info'>🔧 INTENTO DE CORRECCIÓN</span>\n";
echo "<span class='info'>========================================</span>\n\n";

// Si la collation no coincide, corregirla
if ($col_ua['Collation'] !== $col_prog['Collation']) {
    echo "<span class='warning'>⚠️  Collation diferente, corrigiendo...</span>\n";
    
    try {
        $pdo->exec("
            ALTER TABLE lumetrix_progreso 
            MODIFY COLUMN usuario_aplicacion_key VARCHAR(150) 
            CHARACTER SET utf8mb4 COLLATE {$col_ua['Collation']} NOT NULL
        ");
        echo "<span class='success'>✅ Collation corregida a {$col_ua['Collation']}</span>\n";
    } catch (PDOException $e) {
        echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
    }
}

// Intentar crear la FK
echo "\n<span class='info'>🔗 Intentando crear FK...</span>\n";

try {
    $pdo->exec("
        ALTER TABLE lumetrix_progreso
        ADD CONSTRAINT fk_lx_prog_user
        FOREIGN KEY (usuario_aplicacion_key)
        REFERENCES usuarios_aplicaciones(usuario_aplicacion_key)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    ");
    echo "<span class='success'>✅✅✅ FK fk_lx_prog_user CREADA EXITOSAMENTE</span>\n";
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n\n";
    
    // Mostrar query de verificación manual
    echo "<span class='warning'>📝 Verificación manual recomendada:</span>\n\n";
    echo "<span class='info'>-- Verificar que no haya valores huérfanos:</span>\n";
    echo "<span class='info'>SELECT p.usuario_aplicacion_key</span>\n";
    echo "<span class='info'>FROM lumetrix_progreso p</span>\n";
    echo "<span class='info'>LEFT JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = p.usuario_aplicacion_key</span>\n";
    echo "<span class='info'>WHERE ua.usuario_aplicacion_key IS NULL;</span>\n\n";
    
    echo "<span class='info'>Si hay resultados, eliminarlos o crear los usuarios correspondientes.</span>\n";
}

// ========================================
// VERIFICACIÓN FINAL
// ========================================

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='info'>📊 VERIFICACIÓN FINAL</span>\n";
echo "<span class='info'>========================================</span>\n\n";

$fks = $pdo->query("
    SELECT 
        TABLE_NAME,
        CONSTRAINT_NAME
    FROM 
        information_schema.TABLE_CONSTRAINTS
    WHERE 
        TABLE_SCHEMA = '" . DB_NOMBRE . "'
        AND TABLE_NAME LIKE 'lumetrix_%'
        AND CONSTRAINT_TYPE = 'FOREIGN KEY'
")->fetchAll(PDO::FETCH_ASSOC);

echo "<span class='success'>🔗 Foreign Keys de Lumetrix:</span>\n\n";

if (count($fks) >= 2) {
    echo "<span class='success'>✅✅ TODAS LAS FOREIGN KEYS CREADAS:</span>\n\n";
    foreach ($fks as $fk) {
        echo "   <span class='success'>✅ {$fk['TABLE_NAME']}.{$fk['CONSTRAINT_NAME']}</span>\n";
    }
} else {
    echo "<span class='warning'>⚠️  FK encontradas: " . count($fks) . "/2</span>\n\n";
    foreach ($fks as $fk) {
        echo "   <span class='success'>✅ {$fk['TABLE_NAME']}.{$fk['CONSTRAINT_NAME']}</span>\n";
    }
    
    if (count($fks) === 1) {
        echo "\n<span class='warning'>⚠️  Falta FK en lumetrix_progreso</span>\n";
        echo "<span class='info'>   El sistema FUNCIONARÁ igual, solo sin validación automática</span>\n";
    }
}

echo "\n<span class='info'>========================================</span>\n";

if (count($fks) >= 2) {
    echo "<span class='success'>🎉 BASE DE DATOS COMPLETAMENTE CONFIGURADA</span>\n";
} else {
    echo "<span class='warning'>⚠️  FK incompletas pero SISTEMA FUNCIONAL</span>\n";
}

echo "<span class='info'>========================================</span>\n";

echo "</pre>";
echo "<p><a href='test_auth.html' style='color:#00ffff;font-size:18px;'>→ Probar autenticación ahora</a></p>";
echo "</body></html>";

