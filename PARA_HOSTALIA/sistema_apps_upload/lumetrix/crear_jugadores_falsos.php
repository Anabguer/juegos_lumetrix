<?php
require_once __DIR__.'/config_hostalia.php';

echo "<h2>🎮 Creando jugadores falsos para Lumetrix</h2>";

$pdo = db();

// Lista de jugadores falsos con datos realistas
$jugadores_falsos = [
    ['nick' => 'ProGamer2024', 'email' => 'pro@example.com', 'nivel' => 50, 'tiempo' => 1200],
    ['nick' => 'SpeedRunner', 'email' => 'speed@example.com', 'nivel' => 48, 'tiempo' => 1150],
    ['nick' => 'LumetrixMaster', 'email' => 'master@example.com', 'nivel' => 45, 'tiempo' => 1100],
    ['nick' => 'NeonPlayer', 'email' => 'neon@example.com', 'nivel' => 42, 'tiempo' => 1050],
    ['nick' => 'CyberGamer', 'email' => 'cyber@example.com', 'nivel' => 40, 'tiempo' => 1000],
    ['nick' => 'PixelHunter', 'email' => 'pixel@example.com', 'nivel' => 38, 'tiempo' => 950],
    ['nick' => 'GameChampion', 'email' => 'champion@example.com', 'nivel' => 35, 'tiempo' => 900],
    ['nick' => 'LumetrixPro', 'email' => 'pro2@example.com', 'nivel' => 32, 'tiempo' => 850],
    ['nick' => 'SpeedDemon', 'email' => 'demon@example.com', 'nivel' => 30, 'tiempo' => 800],
    ['nick' => 'NeonNinja', 'email' => 'ninja@example.com', 'nivel' => 28, 'tiempo' => 750],
    ['nick' => 'CyberWarrior', 'email' => 'warrior@example.com', 'nivel' => 25, 'tiempo' => 700],
    ['nick' => 'GameLegend', 'email' => 'legend@example.com', 'nivel' => 22, 'tiempo' => 650],
    ['nick' => 'LumetrixKing', 'email' => 'king@example.com', 'nivel' => 20, 'tiempo' => 600],
    ['nick' => 'PixelMaster', 'email' => 'pixel2@example.com', 'nivel' => 18, 'tiempo' => 550],
    ['nick' => 'SpeedGod', 'email' => 'god@example.com', 'nivel' => 15, 'tiempo' => 500],
    ['nick' => 'NeonHero', 'email' => 'hero@example.com', 'nivel' => 12, 'tiempo' => 450],
    ['nick' => 'CyberElite', 'email' => 'elite@example.com', 'nivel' => 10, 'tiempo' => 400],
    ['nick' => 'GameWizard', 'email' => 'wizard@example.com', 'nivel' => 8, 'tiempo' => 350],
    ['nick' => 'LumetrixStar', 'email' => 'star@example.com', 'nivel' => 5, 'tiempo' => 300],
    ['nick' => 'PixelRookie', 'email' => 'rookie@example.com', 'nivel' => 3, 'tiempo' => 250]
];

$creados = 0;
$errores = 0;

foreach ($jugadores_falsos as $jugador) {
    try {
        $uakey = uakey_from_email($jugador['email'], 'lumetrix');
        
        // Insertar usuario
        $st = $pdo->prepare("INSERT IGNORE INTO usuarios_aplicaciones (usuario_aplicacion_key, email, nick, password_hash, app_codigo, fecha_registro) VALUES (?, ?, ?, ?, ?, NOW())");
        $st->execute([$uakey, $jugador['email'], $jugador['nick'], password_hash('password123', PASSWORD_DEFAULT), 'lumetrix']);
        
        // Insertar progreso
        $st = $pdo->prepare("INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s) VALUES (?, ?, ?)");
        $st->execute([$uakey, $jugador['nivel'], $jugador['tiempo']]);
        
        // Insertar algunas partidas
        for ($i = 1; $i <= min($jugador['nivel'], 10); $i++) {
            $duracion = rand(15, 30);
            $st = $pdo->prepare("INSERT IGNORE INTO lumetrix_runs (usuario_aplicacion_key, level, duration_s, success, created_at) VALUES (?, ?, ?, 1, DATE_SUB(NOW(), INTERVAL ? DAY))");
            $st->execute([$uakey, $i, $duracion, rand(1, 30)]);
        }
        
        $creados++;
        echo "✅ {$jugador['nick']} - Nivel {$jugador['nivel']} ({$jugador['tiempo']}s)<br>";
        
    } catch (Exception $e) {
        $errores++;
        echo "❌ Error con {$jugador['nick']}: " . $e->getMessage() . "<br>";
    }
}

echo "<br><h3>📊 Resumen:</h3>";
echo "✅ Jugadores creados: $creados<br>";
echo "❌ Errores: $errores<br>";

echo "<br><a href='ranking.php?action=global' target='_blank'>🏆 Ver ranking actualizado</a>";
?>
