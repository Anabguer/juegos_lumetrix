<?php
require_once __DIR__.'/config_hostalia.php';

echo "<h2>🔍 Debug del Ranking</h2>";

$pdo = db();

// Verificar si hay jugadores en la base de datos
echo "<h3>📊 Jugadores en usuarios_aplicaciones:</h3>";
$st = $pdo->prepare("SELECT nick, email, app_codigo FROM usuarios_aplicaciones WHERE app_codigo = 'lumetrix'");
$st->execute();
$usuarios = $st->fetchAll();

echo "Total usuarios Lumetrix: " . count($usuarios) . "<br><br>";

foreach ($usuarios as $usuario) {
    echo "👤 {$usuario['nick']} ({$usuario['email']})<br>";
}

echo "<br><h3>🎮 Progreso en lumetrix_progreso:</h3>";
$st = $pdo->prepare("SELECT p.usuario_aplicacion_key, p.nivel_actual, p.total_time_s, ua.nick 
                     FROM lumetrix_progreso p 
                     JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = p.usuario_aplicacion_key 
                     WHERE ua.app_codigo = 'lumetrix' 
                     ORDER BY p.nivel_actual DESC, p.total_time_s ASC");
$st->execute();
$progreso = $st->fetchAll();

echo "Total registros de progreso: " . count($progreso) . "<br><br>";

foreach ($progreso as $p) {
    echo "🏆 {$p['nick']} - Nivel {$p['nivel_actual']} ({$p['total_time_s']}s)<br>";
}

echo "<br><h3>🎯 Test del ranking API:</h3>";
$st = $pdo->prepare("SELECT ua.nick AS nick, ua.email AS email, p.nivel_actual AS level, p.total_time_s
                     FROM lumetrix_progreso p
                     JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = p.usuario_aplicacion_key
                     WHERE ua.app_codigo = ?
                     ORDER BY p.nivel_actual DESC, p.total_time_s ASC
                     LIMIT 100");
$st->execute(['lumetrix']);
$ranking = $st->fetchAll();

echo "Resultado del ranking API: " . count($ranking) . " jugadores<br><br>";

foreach ($ranking as $r) {
    echo "🥇 {$r['nick']} - Nivel {$r['level']} ({$r['total_time_s']}s)<br>";
}

echo "<br><a href='crear_jugadores_falsos.php'>🎮 Crear jugadores falsos</a> | ";
echo "<a href='ranking.php?action=global' target='_blank'>🏆 Ver ranking</a>";
?>
