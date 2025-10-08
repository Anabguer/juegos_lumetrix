<?php
require_once __DIR__.'/config_hostalia.php';

echo "<h2>🎮 Creando jugadores falsos (versión simple)</h2>";

try {
    $pdo = db();
    
    // Crear solo 5 jugadores para probar
    $jugadores = [
        ['nick' => 'ProGamer', 'email' => 'pro@test.com', 'nivel' => 50, 'tiempo' => 1200],
        ['nick' => 'SpeedRun', 'email' => 'speed@test.com', 'nivel' => 45, 'tiempo' => 1100],
        ['nick' => 'Master', 'email' => 'master@test.com', 'nivel' => 40, 'tiempo' => 1000],
        ['nick' => 'Neon', 'email' => 'neon@test.com', 'nivel' => 35, 'tiempo' => 900],
        ['nick' => 'Cyber', 'email' => 'cyber@test.com', 'nivel' => 30, 'tiempo' => 800]
    ];
    
    foreach ($jugadores as $j) {
        $uakey = $j['email'] . '_lumetrix';
        
        // Insertar usuario
        $sql1 = "INSERT INTO usuarios_aplicaciones (usuario_aplicacion_key, email, nick, password_hash, app_codigo, fecha_registro) VALUES (?, ?, ?, ?, 'lumetrix', NOW())";
        $st1 = $pdo->prepare($sql1);
        $st1->execute([$uakey, $j['email'], $j['nick'], password_hash('123', PASSWORD_DEFAULT)]);
        
        // Insertar progreso
        $sql2 = "INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s) VALUES (?, ?, ?)";
        $st2 = $pdo->prepare($sql2);
        $st2->execute([$uakey, $j['nivel'], $j['tiempo']]);
        
        echo "✅ {$j['nick']} - Nivel {$j['nivel']} ({$j['tiempo']}s)<br>";
    }
    
    echo "<br><strong>✅ ¡5 jugadores creados exitosamente!</strong><br>";
    
} catch (Exception $e) {
    echo "<br><strong>❌ Error:</strong> " . $e->getMessage() . "<br>";
}

echo "<br><a href='debug_ranking.php'>🔍 Ver debug</a> | ";
echo "<a href='ranking.php?action=global' target='_blank'>🏆 Ver ranking</a>";
?>
