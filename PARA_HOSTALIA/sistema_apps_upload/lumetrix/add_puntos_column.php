<?php
require_once __DIR__.'/config_hostalia.php';

echo "<h2>🏆 Añadiendo sistema de puntos a Lumetrix</h2>";

try {
    $pdo = db();
    
    // Añadir columna puntos a lumetrix_progreso
    echo "<h3>📊 Modificando tabla lumetrix_progreso:</h3>";
    
    $sql1 = "ALTER TABLE lumetrix_progreso ADD COLUMN total_puntos INT DEFAULT 0";
    $pdo->exec($sql1);
    echo "✅ Columna 'total_puntos' añadida<br>";
    
    // Añadir columna puntos a lumetrix_runs
    echo "<h3>🎮 Modificando tabla lumetrix_runs:</h3>";
    
    $sql2 = "ALTER TABLE lumetrix_runs ADD COLUMN puntos INT DEFAULT 0";
    $pdo->exec($sql2);
    echo "✅ Columna 'puntos' añadida<br>";
    
    // Inicializar puntos existentes (migración)
    echo "<h3>🔄 Migrando datos existentes:</h3>";
    
    // Calcular puntos para runs existentes (aproximado)
    $sql3 = "UPDATE lumetrix_runs SET puntos = 
        CASE 
            WHEN level <= 10 THEN 10
            WHEN level <= 20 THEN 15
            WHEN level <= 30 THEN 20
            WHEN level <= 40 THEN 25
            ELSE 30
        END + 
        CASE 
            WHEN duration_s <= 5 THEN 0
            WHEN duration_s <= 10 THEN 5
            WHEN duration_s <= 15 THEN 10
            ELSE 15
        END
        WHERE success = 1";
    
    $affected = $pdo->exec($sql3);
    echo "✅ {$affected} partidas migradas con puntos<br>";
    
    // Actualizar total_puntos por usuario
    $sql4 = "UPDATE lumetrix_progreso p 
             SET total_puntos = (
                 SELECT COALESCE(SUM(puntos), 0) 
                 FROM lumetrix_runs r 
                 WHERE r.usuario_aplicacion_key = p.usuario_aplicacion_key 
                 AND r.success = 1
             )";
    
    $affected2 = $pdo->exec($sql4);
    echo "✅ {$affected2} usuarios con total_puntos actualizado<br>";
    
    echo "<br><strong>🎉 ¡Sistema de puntos implementado exitosamente!</strong><br>";
    
} catch (Exception $e) {
    echo "<br><strong>❌ Error:</strong> " . $e->getMessage() . "<br>";
}

echo "<br><a href='debug_ranking.php'>🔍 Ver debug</a> | ";
echo "<a href='ranking.php?action=global' target='_blank'>🏆 Ver ranking</a>";
?>
