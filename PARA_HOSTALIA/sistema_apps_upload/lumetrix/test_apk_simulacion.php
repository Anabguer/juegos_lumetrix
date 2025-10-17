<?php
/**
 * SIMULACIÓN EXACTA DE LO QUE HACE LA APK
 */

header('Content-Type: text/html; charset=utf-8');
echo "<h1>📱 SIMULACIÓN EXACTA DE LA APK</h1>";
echo "<p>Fecha: " . date('Y-m-d H:i:s') . "</p>";

echo "<h2>1. SIMULAR FETCH DESDE JAVASCRIPT</h2>";

// Simular exactamente el fetch que hace la APK
$fetch_simulation = '
// Código JavaScript que ejecuta la APK:
const response = await fetch("https://colisan.com/sistema_apps_upload/lumetrix/game.php?action=save_progress", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        level: 8,
        total_time_s: 600,
        puntos: 200,
        success: 1
    })
});

const result = await response.json();
console.log("Resultado:", result);
';

echo "<h3>Código JavaScript que ejecuta la APK:</h3>";
echo "<pre>" . htmlspecialchars($fetch_simulation) . "</pre>";

echo "<h2>2. EJECUTAR LA MISMA PETICIÓN DESDE PHP</h2>";

$apk_data = [
    'level' => 8,
    'total_time_s' => 600,
    'puntos' => 200,
    'success' => 1
];

echo "<h3>Datos que envía la APK:</h3>";
echo "<pre>" . json_encode($apk_data, JSON_PRETTY_PRINT) . "</pre>";

// Hacer la petición exactamente como la APK
$url = 'https://colisan.com/sistema_apps_upload/lumetrix/game.php?action=save_progress';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($apk_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'User-Agent: Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
$info = curl_getinfo($ch);
curl_close($ch);

echo "<h3>Resultado de la petición:</h3>";
echo "<p><strong>HTTP Code:</strong> " . $http_code . "</p>";
echo "<p><strong>URL Final:</strong> " . $info['url'] . "</p>";
echo "<p><strong>Error cURL:</strong> " . ($error ?: 'Ninguno') . "</p>";
echo "<p><strong>Respuesta JSON:</strong></p>";
echo "<pre>" . htmlspecialchars($response) . "</pre>";

// Decodificar JSON
$json_response = json_decode($response, true);
if ($json_response) {
    echo "<h3>JSON Decodificado:</h3>";
    echo "<pre>" . json_encode($json_response, JSON_PRETTY_PRINT) . "</pre>";
    
    if (isset($json_response['success']) && $json_response['success'] === true) {
        echo "<p style='color: green; font-weight: bold;'>✅ ¡ÉXITO! El servidor respondió correctamente</p>";
    } else {
        echo "<p style='color: red; font-weight: bold;'>❌ ERROR: El servidor devolvió success=false</p>";
    }
} else {
    echo "<p style='color: red; font-weight: bold;'>❌ ERROR: No se pudo decodificar el JSON</p>";
}

echo "<h2>3. VERIFICAR EN BASE DE DATOS</h2>";

try {
    require_once __DIR__.'/_common.php';
    $pdo = db();
    
    $st = $pdo->prepare("SELECT * FROM lumetrix_progreso WHERE usuario_aplicacion_key = 'bitj2a@gmail.com_lumetrix'");
    $st->execute();
    $data = $st->fetch(PDO::FETCH_ASSOC);
    
    if ($data) {
        echo "<p>✅ <strong>Datos actuales en BD:</strong></p>";
        echo "<pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre>";
        
        // Verificar si se actualizó
        if ($data['nivel_actual'] == 8 && $data['total_puntos'] == 200) {
            echo "<p style='color: green; font-weight: bold;'>✅ ¡PERFECTO! Los datos se guardaron correctamente</p>";
        } else {
            echo "<p style='color: orange; font-weight: bold;'>⚠️ Los datos no se actualizaron. Esperado: nivel 8, puntos 200. Actual: nivel " . $data['nivel_actual'] . ", puntos " . $data['total_puntos'] . "</p>";
        }
    } else {
        echo "<p style='color: red; font-weight: bold;'>❌ No se encontraron datos en la BD</p>";
    }
    
} catch (Exception $e) {
    echo "<p style='color: red; font-weight: bold;'>❌ Error consultando BD: " . $e->getMessage() . "</p>";
}

echo "<h2>4. PROBAR CORS Y HEADERS</h2>";

// Probar con headers de CORS
$cors_headers = [
    'Content-Type: application/json',
    'Accept: application/json',
    'Origin: https://localhost',
    'Access-Control-Request-Method: POST',
    'Access-Control-Request-Headers: Content-Type'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($apk_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, $cors_headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, true);

$response_with_headers = curl_exec($ch);
$http_code_cors = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "<h3>Respuesta con headers CORS:</h3>";
echo "<p><strong>HTTP Code:</strong> " . $http_code_cors . "</p>";
echo "<pre>" . htmlspecialchars($response_with_headers) . "</pre>";

echo "<h2>✅ SIMULACIÓN COMPLETADA</h2>";
echo "<p>Este test simula exactamente lo que hace la APK cuando intenta guardar datos.</p>";
?>
