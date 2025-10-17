<?php
/**
 * Verificar puntos en la base de datos
 * Para diagnosticar discrepancias entre juego y BD
 */

require_once __DIR__.'/_common.php';

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Verificar Puntos</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}table{border-collapse:collapse;margin:10px 0;}td,th{border:1px solid #00ff88;padding:8px;text-align:left;}</style>";
echo "</head><body>";
echo "<h1>🔍 Verificar Puntos - Lumetrix</h1>";
echo "<pre>";

$pdo = db();

// ========================================
// 1. VERIFICAR PROGRESO DE USUARIOS
// ========================================

echo "\n<span class='info'>📋 1. Progreso de usuarios (tabla lumetrix_progreso)</span>\n\n";

try {
    $st = $pdo->query("
        SELECT 
            ua.email,
            ua.nick,
            p.nivel_actual,
            p.total_time_s,
            p.total_puntos,
            p.updated_at
        FROM lumetrix_progreso p
        JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = p.usuario_aplicacion_key
        WHERE ua.app_codigo = 'lumetrix'
        ORDER BY p.total_puntos DESC
    ");
    
    $progreso = $st->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($progreso) > 0) {
        echo "<table>";
        echo "<tr><th>Email</th><th>Nick</th><th>Nivel</th><th>Tiempo Total</th><th>Puntos Total</th><th>Última Actualización</th></tr>";
        foreach ($progreso as $user) {
            echo "<tr>";
            echo "<td>{$user['email']}</td>";
            echo "<td>{$user['nick']}</td>";
            echo "<td>{$user['nivel_actual']}</td>";
            echo "<td>{$user['total_time_s']}s</td>";
            echo "<td style='color:#FFD700;font-weight:bold;'>{$user['total_puntos']}</td>";
            echo "<td>{$user['updated_at']}</td>";
            echo "</tr>";
        }
        echo "</table>\n";
    } else {
        echo "<span class='warning'>⚠️  No hay registros de progreso</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 2. VERIFICAR PARTIDAS RECIENTES
// ========================================

echo "\n<span class='info'>📋 2. Partidas recientes (tabla lumetrix_runs)</span>\n\n";

try {
    $st = $pdo->query("
        SELECT 
            ua.email,
            ua.nick,
            r.level,
            r.duration_s,
            r.success,
            r.puntos,
            r.created_at
        FROM lumetrix_runs r
        JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = r.usuario_aplicacion_key
        WHERE ua.app_codigo = 'lumetrix'
        ORDER BY r.created_at DESC
        LIMIT 20
    ");
    
    $runs = $st->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($runs) > 0) {
        echo "<table>";
        echo "<tr><th>Email</th><th>Nick</th><th>Nivel</th><th>Duración</th><th>Éxito</th><th>Puntos</th><th>Fecha</th></tr>";
        foreach ($runs as $run) {
            $success = $run['success'] ? '✅' : '❌';
            echo "<tr>";
            echo "<td>{$run['email']}</td>";
            echo "<td>{$run['nick']}</td>";
            echo "<td>{$run['level']}</td>";
            echo "<td>{$run['duration_s']}s</td>";
            echo "<td>$success</td>";
            echo "<td style='color:#FFD700;font-weight:bold;'>{$run['puntos']}</td>";
            echo "<td>{$run['created_at']}</td>";
            echo "</tr>";
        }
        echo "</table>\n";
    } else {
        echo "<span class='warning'>⚠️  No hay partidas registradas</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 3. ANÁLISIS DE PUNTOS POR NIVEL
// ========================================

echo "\n<span class='info'>📋 3. Análisis de puntos por nivel</span>\n\n";

try {
    $st = $pdo->query("
        SELECT 
            r.level,
            COUNT(*) as total_runs,
            SUM(CASE WHEN r.success = 1 THEN 1 ELSE 0 END) as successful_runs,
            AVG(r.puntos) as avg_puntos,
            MIN(r.puntos) as min_puntos,
            MAX(r.puntos) as max_puntos,
            SUM(r.puntos) as total_puntos
        FROM lumetrix_runs r
        JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = r.usuario_aplicacion_key
        WHERE ua.app_codigo = 'lumetrix' AND r.success = 1
        GROUP BY r.level
        ORDER BY r.level
        LIMIT 20
    ");
    
    $analisis = $st->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($analisis) > 0) {
        echo "<table>";
        echo "<tr><th>Nivel</th><th>Partidas</th><th>Éxitos</th><th>Puntos Promedio</th><th>Puntos Mín</th><th>Puntos Máx</th><th>Total Puntos</th></tr>";
        foreach ($analisis as $nivel) {
            echo "<tr>";
            echo "<td>{$nivel['level']}</td>";
            echo "<td>{$nivel['total_runs']}</td>";
            echo "<td>{$nivel['successful_runs']}</td>";
            echo "<td style='color:#00ffff;'>" . round($nivel['avg_puntos'], 1) . "</td>";
            echo "<td>{$nivel['min_puntos']}</td>";
            echo "<td>{$nivel['max_puntos']}</td>";
            echo "<td style='color:#FFD700;font-weight:bold;'>{$nivel['total_puntos']}</td>";
            echo "</tr>";
        }
        echo "</table>\n";
    } else {
        echo "<span class='warning'>⚠️  No hay datos para analizar</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 4. VERIFICAR DISCREPANCIAS
// ========================================

echo "\n<span class='info'>📋 4. Verificar discrepancias</span>\n\n";

try {
    // Buscar partidas con puntos = 25 (que mencionaste)
    $st = $pdo->query("
        SELECT 
            ua.email,
            ua.nick,
            r.level,
            r.puntos,
            r.created_at
        FROM lumetrix_runs r
        JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = r.usuario_aplicacion_key
        WHERE ua.app_codigo = 'lumetrix' AND r.puntos = 25
        ORDER BY r.created_at DESC
        LIMIT 10
    ");
    
    $puntos25 = $st->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($puntos25) > 0) {
        echo "<span class='info'>🎯 Partidas con exactamente 25 puntos:</span>\n";
        echo "<table>";
        echo "<tr><th>Email</th><th>Nick</th><th>Nivel</th><th>Puntos</th><th>Fecha</th></tr>";
        foreach ($puntos25 as $run) {
            echo "<tr>";
            echo "<td>{$run['email']}</td>";
            echo "<td>{$run['nick']}</td>";
            echo "<td>{$run['level']}</td>";
            echo "<td style='color:#FFD700;font-weight:bold;'>{$run['puntos']}</td>";
            echo "<td>{$run['created_at']}</td>";
            echo "</tr>";
        }
        echo "</table>\n";
    } else {
        echo "<span class='warning'>⚠️  No se encontraron partidas con 25 puntos</span>\n";
    }
    
    // Buscar partidas con puntos = 50 (que mencionaste)
    $st = $pdo->query("
        SELECT 
            ua.email,
            ua.nick,
            r.level,
            r.puntos,
            r.created_at
        FROM lumetrix_runs r
        JOIN usuarios_aplicaciones ua ON ua.usuario_aplicacion_key = r.usuario_aplicacion_key
        WHERE ua.app_codigo = 'lumetrix' AND r.puntos = 50
        ORDER BY r.created_at DESC
        LIMIT 10
    ");
    
    $puntos50 = $st->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($puntos50) > 0) {
        echo "\n<span class='info'>🎯 Partidas con exactamente 50 puntos:</span>\n";
        echo "<table>";
        echo "<tr><th>Email</th><th>Nick</th><th>Nivel</th><th>Puntos</th><th>Fecha</th></tr>";
        foreach ($puntos50 as $run) {
            echo "<tr>";
            echo "<td>{$run['email']}</td>";
            echo "<td>{$run['nick']}</td>";
            echo "<td>{$run['level']}</td>";
            echo "<td style='color:#FFD700;font-weight:bold;'>{$run['puntos']}</td>";
            echo "<td>{$run['created_at']}</td>";
            echo "</tr>";
        }
        echo "</table>\n";
    } else {
        echo "<span class='warning'>⚠️  No se encontraron partidas con 50 puntos</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Error: {$e->getMessage()}</span>\n";
}

// ========================================
// 5. RESUMEN FINAL
// ========================================

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='success'>✅ VERIFICACIÓN DE PUNTOS COMPLETADA</span>\n";
echo "<span class='info'>========================================</span>\n";

echo "\n<span class='info'>💡 INFORMACIÓN DEL JUEGO:</span>\n";
echo "<span class='info'>- Puntos base por nivel: 10-30 (según nivel)</span>\n";
echo "<span class='info'>- Bonus por velocidad: 0-15 puntos</span>\n";
echo "<span class='info'>- Bonus especial: +10 (primer intento) +5 (sin errores)</span>\n";
echo "<span class='info'>- Total máximo por nivel: ~60 puntos</span>\n";

echo "\n<span class='info'>🔍 POSIBLES CAUSAS DE DISCREPANCIA:</span>\n";
echo "<span class='info'>1. Modo práctica (no suma puntos)</span>\n";
echo "<span class='info'>2. Reintentos (no suma puntos)</span>\n";
echo "<span class='info'>3. Tiempo restante bajo (menos bonus)</span>\n";
echo "<span class='info'>4. Errores en el nivel (menos bonus)</span>\n";
echo "<span class='info'>5. Sincronización pendiente</span>\n";

echo "</pre>";
echo "<p><a href='verificar_estructura.php' style='color:#00ffff'>→ Verificar estructura</a></p>";
echo "<p><a href='test_auth.html' style='color:#00ffff'>→ Test de autenticación</a></p>";
echo "</body></html>";
?>
