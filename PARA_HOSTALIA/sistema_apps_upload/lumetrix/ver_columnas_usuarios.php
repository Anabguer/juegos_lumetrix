<?php
/**
 * VERIFICACIÓN: Mostrar columnas de la tabla usuarios_aplicaciones
 */

require_once __DIR__.'/_common.php';

header('Content-Type: text/html; charset=utf-8');

echo "<h1>🔍 VERIFICACIÓN: Columnas de la tabla usuarios_aplicaciones</h1>";
echo "<hr>";

try {
    $pdo = db();
    
    // Mostrar todas las columnas de la tabla
    echo "<h3>📋 Columnas existentes en 'usuarios_aplicaciones':</h3>";
    $stmt = $pdo->query("SHOW COLUMNS FROM usuarios_aplicaciones");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<table border='1' style='border-collapse:collapse;margin:10px 0;width:100%;'>";
    echo "<tr><th style='padding:8px;background:#333;color:#fff;'>Campo</th><th style='padding:8px;background:#333;color:#fff;'>Tipo</th><th style='padding:8px;background:#333;color:#fff;'>Nulo</th><th style='padding:8px;background:#333;color:#fff;'>Default</th></tr>";
    
    foreach ($columns as $col) {
        $highlight = '';
        if (stripos($col['Field'], 'verific') !== false || stripos($col['Field'], 'codigo') !== false || stripos($col['Field'], 'email') !== false) {
            $highlight = 'background:#ffffcc;';
        }
        echo "<tr>";
        echo "<td style='padding:8px;{$highlight}'><strong>{$col['Field']}</strong></td>";
        echo "<td style='padding:8px;{$highlight}'>{$col['Type']}</td>";
        echo "<td style='padding:8px;{$highlight}'>{$col['Null']}</td>";
        echo "<td style='padding:8px;{$highlight}'>" . ($col['Default'] ?: 'NULL') . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
    // Contar usuarios de Lumetrix
    echo "<h3>📊 Usuarios de Lumetrix:</h3>";
    $st = $pdo->query("SELECT COUNT(*) as total FROM usuarios_aplicaciones WHERE app_codigo = 'lumetrix'");
    $res = $st->fetch(PDO::FETCH_ASSOC);
    echo "<p>Total usuarios Lumetrix: <strong>{$res['total']}</strong></p>";
    
} catch (Exception $e) {
    echo "<h2 style='color:red;'>❌ ERROR</h2>";
    echo "<p style='color:red;'>{$e->getMessage()}</p>";
}
?>

