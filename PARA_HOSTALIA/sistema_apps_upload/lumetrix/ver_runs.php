<?php
/**
 * Ver el histórico de runs (partidas) de un usuario
 */

require_once __DIR__.'/_common.php';
require_login();

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Mis Partidas</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}table{border-collapse:collapse;width:100%;margin:20px 0;}th,td{border:1px solid #00ff88;padding:8px;text-align:left;}th{background:#00ff8822;color:#00ffff;}tr:hover{background:#00ff8811;}.win{color:#39ff14;}.lose{color:#ff4466;}</style>";
echo "</head><body>";
echo "<h1>🎮 Mis Partidas - Histórico Completo</h1>";

$pdo = db();
$uakey = $_SESSION['uakey'];

// Obtener todas las runs del usuario
$st = $pdo->prepare("
    SELECT 
        id,
        level,
        duration_s,
        success,
        created_at
    FROM lumetrix_runs
    WHERE usuario_aplicacion_key = ?
    ORDER BY created_at DESC
    LIMIT 100
");
$st->execute([$uakey]);
$runs = $st->fetchAll(PDO::FETCH_ASSOC);

// Estadísticas
$total_runs = count($runs);
$victorias = count(array_filter($runs, fn($r) => $r['success'] == 1));
$derrotas = $total_runs - $victorias;
$tiempo_total = array_sum(array_column($runs, 'duration_s'));

echo "<div style='background:#111;border:1px solid #00ff88;border-radius:8px;padding:16px;margin-bottom:20px;'>";
echo "<h2 style='margin:0 0 12px 0;color:#00ffff;'>📊 Estadísticas Generales</h2>";
echo "<div style='display:grid;grid-template-columns:repeat(4,1fr);gap:16px;'>";
echo "<div><div style='font-size:12px;opacity:0.7;'>Total partidas</div><div style='font-size:24px;font-weight:bold;'>{$total_runs}</div></div>";
echo "<div><div style='font-size:12px;opacity:0.7;'>Victorias</div><div style='font-size:24px;font-weight:bold;color:#39ff14;'>{$victorias}</div></div>";
echo "<div><div style='font-size:12px;opacity:0.7;'>Derrotas</div><div style='font-size:24px;font-weight:bold;color:#ff4466;'>{$derrotas}</div></div>";
echo "<div><div style='font-size:12px;opacity:0.7;'>Tiempo total</div><div style='font-size:24px;font-weight:bold;'>{$tiempo_total}s</div></div>";
echo "</div>";

if ($victorias > 0) {
    $tasa_exito = round(($victorias / $total_runs) * 100, 1);
    echo "<div style='margin-top:12px;font-size:14px;'>Tasa de éxito: <span style='color:#00ffff;font-weight:bold;'>{$tasa_exito}%</span></div>";
}

echo "</div>";

if ($total_runs > 0) {
    echo "<h2 style='color:#00ffff;'>📜 Histórico de Partidas</h2>";
    echo "<table>";
    echo "<tr>";
    echo "<th>#</th>";
    echo "<th>Nivel</th>";
    echo "<th>Duración</th>";
    echo "<th>Resultado</th>";
    echo "<th>Fecha</th>";
    echo "</tr>";
    
    foreach ($runs as $run) {
        $resultado = $run['success'] == 1 ? 'Victoria' : 'Derrota';
        $clase = $run['success'] == 1 ? 'win' : 'lose';
        $fecha = date('d/m/Y H:i', strtotime($run['created_at']));
        
        echo "<tr>";
        echo "<td>{$run['id']}</td>";
        echo "<td>Nivel {$run['level']}</td>";
        echo "<td>{$run['duration_s']}s</td>";
        echo "<td class='$clase'><b>$resultado</b></td>";
        echo "<td>{$fecha}</td>";
        echo "</tr>";
    }
    
    echo "</table>";
} else {
    echo "<div style='text-align:center;padding:40px;color:#00ffff66;'>";
    echo "<div style='font-size:18px;margin-bottom:8px;'>No hay partidas aún</div>";
    echo "<div style='font-size:14px;'>¡Empieza a jugar para ver tu histórico!</div>";
    echo "</div>";
}

echo "<p style='margin-top:30px;'><a href='test_auth.html' style='color:#00ffff;'>← Volver</a></p>";
echo "</body></html>";

