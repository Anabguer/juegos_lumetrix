<?php
/**
 * Script de administración de base de datos
 * Ejecutar UNA VEZ para crear/actualizar tablas
 * 
 * IMPORTANTE: Proteger este archivo o eliminarlo después de usar
 */

require_once __DIR__.'/_common.php';

// Leer el esquema SQL
$schema = file_get_contents(__DIR__ . '/schema.sql');
if (!$schema) {
    die("❌ Error: No se pudo leer schema.sql");
}

// Eliminar comentarios SQL para facilitar ejecución
$schema = preg_replace('/--.*$/m', '', $schema);

// Dividir en statements individuales
$statements = array_filter(
    array_map('trim', explode(';', $schema)),
    fn($s) => !empty($s) && stripos($s, 'USE ') !== 0
);

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Lumetrix - Admin DB</title></head><body>";
echo "<h1>🔧 Lumetrix - Administración de Base de Datos</h1>";
echo "<pre>";

$pdo = db();
$success = 0;
$errors = 0;

foreach ($statements as $i => $sql) {
    $sql = trim($sql);
    if (empty($sql)) continue;
    
    // Mostrar qué se va a ejecutar
    $preview = substr($sql, 0, 100);
    echo "\n[" . ($i + 1) . "] Ejecutando: " . $preview . (strlen($sql) > 100 ? '...' : '') . "\n";
    
    try {
        $pdo->exec($sql);
        echo "    ✅ OK\n";
        $success++;
    } catch (PDOException $e) {
        echo "    ⚠️  Error: " . $e->getMessage() . "\n";
        $errors++;
    }
}

echo "\n========================================\n";
echo "RESUMEN:\n";
echo "  ✅ Exitosos: $success\n";
echo "  ⚠️  Errores: $errors\n";
echo "========================================\n";

// Verificar tablas creadas
echo "\n📊 VERIFICACIÓN DE TABLAS:\n\n";

try {
    // Verificar lumetrix_progreso
    $st = $pdo->query("SHOW CREATE TABLE lumetrix_progreso");
    $result = $st->fetch(PDO::FETCH_ASSOC);
    echo "✅ lumetrix_progreso existe\n";
    
    // Verificar lumetrix_runs
    $st = $pdo->query("SHOW CREATE TABLE lumetrix_runs");
    $result = $st->fetch(PDO::FETCH_ASSOC);
    echo "✅ lumetrix_runs existe\n";
    
    // Verificar vista
    $st = $pdo->query("SHOW CREATE VIEW lumetrix_ranking");
    $result = $st->fetch(PDO::FETCH_ASSOC);
    echo "✅ lumetrix_ranking (vista) existe\n";
    
    // Contar registros
    $count_prog = $pdo->query("SELECT COUNT(*) as c FROM lumetrix_progreso")->fetch()['c'];
    $count_runs = $pdo->query("SELECT COUNT(*) as c FROM lumetrix_runs")->fetch()['c'];
    
    echo "\n📈 REGISTROS:\n";
    echo "  - lumetrix_progreso: $count_prog usuario(s)\n";
    echo "  - lumetrix_runs: $count_runs partida(s)\n";
    
} catch (PDOException $e) {
    echo "⚠️  Error en verificación: " . $e->getMessage() . "\n";
}

// Verificar Foreign Keys
echo "\n🔗 FOREIGN KEYS:\n\n";
try {
    $st = $pdo->query("
        SELECT 
            TABLE_NAME,
            CONSTRAINT_NAME,
            REFERENCED_TABLE_NAME
        FROM 
            information_schema.KEY_COLUMN_USAGE
        WHERE 
            TABLE_SCHEMA = '" . DB_NAME . "'
            AND TABLE_NAME LIKE 'lumetrix_%'
            AND REFERENCED_TABLE_NAME IS NOT NULL
    ");
    
    $fks = $st->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($fks) > 0) {
        foreach ($fks as $fk) {
            echo "  ✅ {$fk['TABLE_NAME']}.{$fk['CONSTRAINT_NAME']} → {$fk['REFERENCED_TABLE_NAME']}\n";
        }
    } else {
        echo "  ⚠️  No se encontraron Foreign Keys\n";
    }
    
} catch (PDOException $e) {
    echo "  ⚠️  Error verificando FKs: " . $e->getMessage() . "\n";
}

echo "\n========================================\n";
echo "✅ PROCESO COMPLETADO\n";
echo "========================================\n";

echo "</pre>";
echo "<p><a href='test_db.php'>← Volver a test DB</a></p>";
echo "</body></html>";

