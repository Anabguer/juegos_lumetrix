<?php
/**
 * DEBUG DETALLADO PARA APK - Análisis completo del problema
 */

header('Content-Type: text/html; charset=utf-8');
echo "<h1>🔍 DEBUG DETALLADO PARA APK</h1>";
echo "<p>Fecha: " . date('Y-m-d H:i:s') . "</p>";

echo "<h2>1. ANÁLISIS DEL PROBLEMA</h2>";
echo "<p>El usuario reporta: <strong>'no va.... no se guardan los datos'</strong></p>";
echo "<p>Vamos a analizar cada posible causa:</p>";

echo "<h2>2. VERIFICAR ESTADO ACTUAL DEL SERVIDOR</h2>";

// Verificar si el servidor está funcionando
try {
    require_once __DIR__.'/_common.php';
    $pdo = db();
    echo "<p>✅ Conexión a BD: OK</p>";
    
    // Ver datos actuales
    $st = $pdo->prepare("SELECT * FROM lumetrix_progreso WHERE usuario_aplicacion_key = 'bitj2a@gmail.com_lumetrix'");
    $st->execute();
    $current_data = $st->fetch(PDO::FETCH_ASSOC);
    
    if ($current_data) {
        echo "<p>✅ Datos actuales en BD:</p>";
        echo "<pre>" . json_encode($current_data, JSON_PRETTY_PRINT) . "</pre>";
    } else {
        echo "<p>⚠️ No hay datos en BD para el usuario de prueba</p>";
    }
    
} catch (Exception $e) {
    echo "<p>❌ Error BD: " . $e->getMessage() . "</p>";
}

echo "<h2>3. PROBAR ENDPOINT CON DIFERENTES MÉTODOS</h2>";

$test_data = [
    'level' => 9,
    'total_time_s' => 700,
    'puntos' => 225,
    'success' => 1
];

echo "<h3>3.1. Método 1: cURL (simula APK)</h3>";
$url = 'https://colisan.com/sistema_apps_upload/lumetrix/game.php?action=save_progress';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response1 = curl_exec($ch);
$http_code1 = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "<p>HTTP: " . $http_code1 . " | Respuesta: " . htmlspecialchars($response1) . "</p>";

echo "<h3>3.2. Método 2: file_get_contents (simula fetch)</h3>";
$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => json_encode($test_data)
    ]
]);

$response2 = file_get_contents($url, false, $context);
$http_code2 = isset($http_response_header) ? $http_response_header[0] : 'Unknown';

echo "<p>HTTP: " . $http_code2 . " | Respuesta: " . htmlspecialchars($response2) . "</p>";

echo "<h2>4. VERIFICAR SI LOS DATOS SE GUARDARON</h2>";

try {
    $st = $pdo->prepare("SELECT * FROM lumetrix_progreso WHERE usuario_aplicacion_key = 'bitj2a@gmail.com_lumetrix'");
    $st->execute();
    $updated_data = $st->fetch(PDO::FETCH_ASSOC);
    
    if ($updated_data) {
        echo "<p>✅ Datos después de las pruebas:</p>";
        echo "<pre>" . json_encode($updated_data, JSON_PRETTY_PRINT) . "</pre>";
        
        if ($updated_data['nivel_actual'] == 9 && $updated_data['total_puntos'] == 225) {
            echo "<p style='color: green; font-weight: bold;'>✅ ¡EL SERVIDOR FUNCIONA! Los datos se guardaron correctamente</p>";
            echo "<p><strong>CONCLUSIÓN:</strong> El problema está en la APK, no en el servidor.</p>";
        } else {
            echo "<p style='color: orange; font-weight: bold;'>⚠️ Los datos no se actualizaron correctamente</p>";
            echo "<p><strong>CONCLUSIÓN:</strong> Hay un problema en el servidor o en la consulta SQL.</p>";
        }
    }
    
} catch (Exception $e) {
    echo "<p>❌ Error verificando datos: " . $e->getMessage() . "</p>";
}

echo "<h2>5. ANÁLISIS DE POSIBLES CAUSAS</h2>";

echo "<h3>5.1. ¿La APK está usando la URL correcta?</h3>";
echo "<p>URL que debería usar: <code>https://colisan.com/sistema_apps_upload/lumetrix/game.php?action=save_progress</code></p>";

echo "<h3>5.2. ¿La APK está enviando los datos correctos?</h3>";
echo "<p>Datos que debería enviar:</p>";
echo "<pre>" . json_encode($test_data, JSON_PRETTY_PRINT) . "</pre>";

echo "<h3>5.3. ¿La APK está recibiendo la respuesta?</h3>";
echo "<p>Respuesta esperada: <code>{\"success\":true,\"uakey\":\"bitj2a@gmail.com_lumetrix\",\"level\":9}</code></p>";

echo "<h3>5.4. ¿Hay problemas de CORS?</h3>";
echo "<p>La APK usa Capacitor, que debería manejar CORS automáticamente.</p>";

echo "<h2>6. RECOMENDACIONES</h2>";

echo "<h3>6.1. Si el servidor funciona (como parece):</h3>";
echo "<ul>";
echo "<li>Verificar que la APK esté usando la URL correcta</li>";
echo "<li>Verificar que la APK esté enviando los datos en el formato correcto</li>";
echo "<li>Verificar que la APK esté procesando la respuesta correctamente</li>";
echo "<li>Revisar los logs de la APK para ver errores de JavaScript</li>";
echo "</ul>";

echo "<h3>6.2. Si el servidor no funciona:</h3>";
echo "<ul>";
echo "<li>Revisar el archivo game.php</li>";
echo "<li>Revisar la configuración de la base de datos</li>";
echo "<li>Revisar los logs del servidor</li>";
echo "</ul>";

echo "<h2>7. PRÓXIMOS PASOS</h2>";
echo "<ol>";
echo "<li>Ejecutar este diagnóstico</li>";
echo "<li>Si el servidor funciona → Revisar la APK</li>";
echo "<li>Si el servidor no funciona → Revisar el código PHP</li>";
echo "<li>Probar con la APK actualizada</li>";
echo "</ol>";

echo "<h2>✅ DIAGNÓSTICO COMPLETADO</h2>";
echo "<p>Revisa los resultados arriba para determinar la causa del problema.</p>";
?>
