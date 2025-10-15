<?php
/**
 * 🔍 DIAGNÓSTICO SMTP - Probar múltiples configuraciones
 * 
 * Este script prueba diferentes servidores SMTP comunes de Hostalia
 * para encontrar la configuración correcta.
 */

// Configuraciones SMTP a probar
$configuraciones = [
    [
        'nombre' => 'mail.intocables13.com (puerto 587)',
        'host' => 'mail.intocables13.com',
        'puerto' => 587,
        'secure' => 'tls'
    ],
    [
        'nombre' => 'mail.intocables13.com (puerto 465)',
        'host' => 'mail.intocables13.com',
        'puerto' => 465,
        'secure' => 'ssl'
    ],
    [
        'nombre' => 'smtp.hostalia.com (puerto 587)',
        'host' => 'smtp.hostalia.com',
        'puerto' => 587,
        'secure' => 'tls'
    ],
    [
        'nombre' => 'smtp.hostalia.com (puerto 465)',
        'host' => 'smtp.hostalia.com',
        'puerto' => 465,
        'secure' => 'ssl'
    ],
    [
        'nombre' => 'mail.hostalia.com (puerto 587)',
        'host' => 'mail.hostalia.com',
        'puerto' => 587,
        'secure' => 'tls'
    ],
    [
        'nombre' => 'mail.hostalia.com (puerto 465)',
        'host' => 'mail.hostalia.com',
        'puerto' => 465,
        'secure' => 'ssl'
    ]
];

$usuario = 'info@intocables13.com';
$password = 'Anabguer13';

function probarConexionSMTP($host, $puerto, $usuario, $password, $secure) {
    $resultado = [
        'host' => $host,
        'puerto' => $puerto,
        'secure' => $secure,
        'conexion' => false,
        'autenticacion' => false,
        'error' => null,
        'tiempo' => 0
    ];
    
    $inicio = microtime(true);
    
    try {
        // Intentar conectar
        $socket = @fsockopen($host, $puerto, $errno, $errstr, 10);
        if (!$socket) {
            $resultado['error'] = "No se pudo conectar: $errstr ($errno)";
            return $resultado;
        }
        
        $resultado['conexion'] = true;
        
        // Leer respuesta inicial
        $response = fgets($socket, 515);
        if (strpos($response, '220') === false) {
            fclose($socket);
            $resultado['error'] = "Respuesta inicial incorrecta: $response";
            return $resultado;
        }
        
        // EHLO
        fputs($socket, "EHLO " . $host . "\r\n");
        $response = leerRespuestaSMTP($socket);
        
        // STARTTLS si es necesario
        if ($secure === 'tls') {
            fputs($socket, "STARTTLS\r\n");
            $response = fgets($socket, 515);
            if (strpos($response, '220') === false) {
                fclose($socket);
                $resultado['error'] = "STARTTLS falló: $response";
                return $resultado;
            }
            
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            
            // EHLO de nuevo después de TLS
            fputs($socket, "EHLO " . $host . "\r\n");
            leerRespuestaSMTP($socket);
        }
        
        // AUTH LOGIN
        fputs($socket, "AUTH LOGIN\r\n");
        fgets($socket, 515);
        
        fputs($socket, base64_encode($usuario) . "\r\n");
        fgets($socket, 515);
        
        fputs($socket, base64_encode($password) . "\r\n");
        $response = fgets($socket, 515);
        
        if (strpos($response, '235') !== false) {
            $resultado['autenticacion'] = true;
        } else {
            $resultado['error'] = "Autenticación falló: $response";
        }
        
        // QUIT
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
    } catch (Exception $e) {
        $resultado['error'] = $e->getMessage();
    }
    
    $resultado['tiempo'] = round((microtime(true) - $inicio) * 1000);
    return $resultado;
}

function leerRespuestaSMTP($socket) {
    $response = '';
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }
    return $response;
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔍 Diagnóstico SMTP - LUMETRIX</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #000 0%, #1a1a2e 100%);
            color: #fff;
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid #39ff14;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 0 50px rgba(57, 255, 20, 0.3);
        }
        h1 {
            font-size: 32px;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #39ff14, #00ffff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-align: center;
        }
        .subtitle {
            text-align: center;
            color: #aaa;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .info {
            background: rgba(0, 255, 255, 0.1);
            border: 2px solid #00ffff;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 30px;
            font-size: 14px;
            line-height: 1.6;
        }
        .test-result {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid;
        }
        .test-success {
            background: rgba(57, 255, 20, 0.1);
            border-color: #39ff14;
            color: #39ff14;
        }
        .test-error {
            background: rgba(255, 0, 0, 0.1);
            border-color: #ff0000;
            color: #ff6b6b;
        }
        .test-warning {
            background: rgba(255, 165, 0, 0.1);
            border-color: #ffa500;
            color: #ffa500;
        }
        .test-title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .test-details {
            font-size: 14px;
            line-height: 1.4;
        }
        .status {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            margin-right: 10px;
        }
        .status-ok { background: #39ff14; color: #000; }
        .status-error { background: #ff0000; color: #fff; }
        .status-warning { background: #ffa500; color: #000; }
        button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(90deg, #39ff14, #00ffff);
            border: none;
            border-radius: 8px;
            color: #000;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 20px;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(57, 255, 20, 0.5);
        }
        .config-recommendation {
            background: rgba(57, 255, 20, 0.1);
            border: 2px solid #39ff14;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
            display: none;
        }
        .config-code {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid #39ff14;
            border-radius: 4px;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            margin-top: 10px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Diagnóstico SMTP</h1>
        <p class="subtitle">Probando diferentes configuraciones de Hostalia</p>

        <div class="info">
            🔍 <strong>Diagnóstico automático:</strong><br>
            Este script probará diferentes servidores SMTP comunes de Hostalia para encontrar la configuración correcta.
            <br><br>
            📧 <strong>Credenciales:</strong> info@intocables13.com
        </div>

        <?php if ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
            <div id="results">
                <h3 style="margin-bottom: 20px; color: #39ff14;">📊 Resultados del diagnóstico:</h3>
                
                <?php
                $configuracion_exitosa = null;
                
                foreach ($configuraciones as $config) {
                    $resultado = probarConexionSMTP(
                        $config['host'], 
                        $config['puerto'], 
                        $usuario, 
                        $password, 
                        $config['secure']
                    );
                    
                    $clase = 'test-error';
                    $status_conexion = 'status-error';
                    $status_auth = 'status-error';
                    
                    if ($resultado['conexion'] && $resultado['autenticacion']) {
                        $clase = 'test-success';
                        $status_conexion = 'status-ok';
                        $status_auth = 'status-ok';
                        $configuracion_exitosa = $config;
                    } elseif ($resultado['conexion']) {
                        $clase = 'test-warning';
                        $status_conexion = 'status-ok';
                        $status_auth = 'status-error';
                    }
                    
                    echo '<div class="test-result ' . $clase . '">';
                    echo '<div class="test-title">' . $config['nombre'] . '</div>';
                    echo '<div class="test-details">';
                    echo '<span class="status ' . $status_conexion . '">Conexión</span>';
                    echo '<span class="status ' . $status_auth . '">Autenticación</span>';
                    echo '<span style="color: #aaa;">Tiempo: ' . $resultado['tiempo'] . 'ms</span>';
                    if ($resultado['error']) {
                        echo '<br><span style="color: #ff6b6b;">Error: ' . htmlspecialchars($resultado['error']) . '</span>';
                    }
                    echo '</div>';
                    echo '</div>';
                }
                ?>
                
                <?php if ($configuracion_exitosa): ?>
                    <div class="config-recommendation" style="display: block;">
                        <h3 style="color: #39ff14; margin-bottom: 15px;">✅ ¡Configuración encontrada!</h3>
                        <p>La siguiente configuración funciona correctamente:</p>
                        <div class="config-code">
define('SMTP_HOST', '<?php echo $configuracion_exitosa['host']; ?>');<br>
define('SMTP_PORT', <?php echo $configuracion_exitosa['puerto']; ?>);<br>
define('SMTP_USER', '<?php echo $usuario; ?>');<br>
define('SMTP_PASS', '<?php echo $password; ?>');<br>
define('SMTP_FROM', '<?php echo $usuario; ?>');<br>
define('SMTP_NAME', 'LUMETRIX');<br>
define('SMTP_SECURE', '<?php echo $configuracion_exitosa['secure']; ?>');
                        </div>
                        <p style="margin-top: 15px;">
                            <strong>Próximo paso:</strong> Actualizar el archivo <code>config_smtp.php</code> con estos valores.
                        </p>
                    </div>
                <?php else: ?>
                    <div class="test-result test-error">
                        <div class="test-title">❌ Ninguna configuración funcionó</div>
                        <div class="test-details">
                            Posibles causas:<br>
                            • Contraseña incorrecta<br>
                            • Servidor SMTP bloqueado por firewall<br>
                            • Configuración específica de Hostalia no probada<br>
                            • Cuenta de email desactivada<br><br>
                            <strong>Recomendación:</strong> Contactar con soporte de Hostalia para obtener los datos SMTP correctos.
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        <?php else: ?>
            <form method="POST">
                <button type="submit">🔍 Iniciar Diagnóstico SMTP</button>
            </form>
            
            <div class="info">
                <strong>¿Qué hace este diagnóstico?</strong><br>
                1. Prueba conexión a diferentes servidores SMTP<br>
                2. Verifica autenticación con tus credenciales<br>
                3. Te muestra la configuración correcta si la encuentra<br>
                4. Tiempo estimado: 30-60 segundos
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
