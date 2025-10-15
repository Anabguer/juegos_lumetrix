<?php
/**
 * 🧪 TEST DE CONFIGURACIÓN SMTP
 * 
 * Este script prueba que el envío de emails por SMTP funciona correctamente.
 * 
 * INSTRUCCIONES:
 * 1. Configurar config_smtp.php con tus datos de Hostalia
 * 2. Acceder a: https://colisan.com/sistema_apps_upload/lumetrix/test_smtp.php
 * 3. Introducir tu email para recibir una prueba
 * 4. Verificar que el email llega en pocos segundos
 */

require_once __DIR__ . '/enviar_email_smtp.php';

// Modo debug activado para este test
if (!defined('SMTP_DEBUG')) {
    define('SMTP_DEBUG', true);
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🧪 Test SMTP - LUMETRIX</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #000 0%, #1a1a2e 100%);
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            width: 100%;
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
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #39ff14;
            font-weight: 600;
        }
        input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(57, 255, 20, 0.3);
            border-radius: 8px;
            color: #fff;
            font-size: 16px;
            transition: all 0.3s;
        }
        input:focus {
            outline: none;
            border-color: #39ff14;
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
        }
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
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(57, 255, 20, 0.5);
        }
        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .result {
            margin-top: 30px;
            padding: 20px;
            border-radius: 8px;
            display: none;
        }
        .result.success {
            background: rgba(57, 255, 20, 0.1);
            border: 2px solid #39ff14;
            color: #39ff14;
        }
        .result.error {
            background: rgba(255, 0, 0, 0.1);
            border: 2px solid #ff0000;
            color: #ff6b6b;
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
        .config-status {
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            font-size: 14px;
        }
        .config-status span {
            display: block;
            margin-bottom: 5px;
        }
        .status-ok { color: #39ff14; }
        .status-error { color: #ff6b6b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 Test SMTP</h1>
        <p class="subtitle">Prueba de envío de emails - LUMETRIX</p>

        <div class="config-status">
            <h3 style="margin-bottom: 10px; color: #39ff14;">📋 Configuración actual:</h3>
            <span>🌐 Servidor: <strong><?php echo SMTP_HOST; ?></strong></span>
            <span>🔌 Puerto: <strong><?php echo SMTP_PORT; ?></strong></span>
            <span>👤 Usuario: <strong><?php echo SMTP_USER; ?></strong></span>
            <span>🔒 Seguridad: <strong><?php echo strtoupper(SMTP_SECURE); ?></strong></span>
            <span>📧 Remitente: <strong><?php echo SMTP_NAME; ?> &lt;<?php echo SMTP_FROM; ?>&gt;</strong></span>
            <?php if (SMTP_PASS === 'TU_PASSWORD_AQUI'): ?>
                <span class="status-error">⚠️ <strong>CONTRASEÑA NO CONFIGURADA</strong> - Edita config_smtp.php</span>
            <?php else: ?>
                <span class="status-ok">✅ Contraseña configurada</span>
            <?php endif; ?>
        </div>

        <?php if (SMTP_PASS === 'TU_PASSWORD_AQUI'): ?>
            <div class="info">
                ⚠️ <strong>Primero debes configurar tu contraseña SMTP:</strong><br><br>
                1. Edita el archivo <code>config_smtp.php</code><br>
                2. Cambia <code>SMTP_PASS</code> por tu contraseña real<br>
                3. Guarda y recarga esta página
            </div>
        <?php else: ?>
            <div class="info">
                📧 Introduce tu email para recibir un código de prueba.<br>
                El email debería llegar en <strong>menos de 10 segundos</strong>.
            </div>

            <form method="POST">
                <div class="form-group">
                    <label for="email">📧 Email de prueba:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="tu@email.com" 
                        required
                        value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>"
                    >
                </div>
                <button type="submit">🚀 Enviar Email de Prueba</button>
            </form>

            <?php
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['email'])) {
                $email_test = trim($_POST['email']);
                $codigo_test = generarCodigoVerificacion();
                
                echo '<div class="result" id="result" style="display: block;">';
                echo '<p><strong>⏳ Enviando email...</strong></p>';
                flush();
                
                $inicio = microtime(true);
                
                try {
                    $resultado = enviarEmailVerificacion($email_test, 'Usuario Test', $codigo_test);
                    
                    $tiempo = round((microtime(true) - $inicio) * 1000); // en milisegundos
                    
                    if ($resultado) {
                        echo '<script>document.getElementById("result").className = "result success";</script>';
                        echo '<p><strong>✅ ¡EMAIL ENVIADO CORRECTAMENTE!</strong></p>';
                        echo '<p>📧 Destinatario: <strong>' . htmlspecialchars($email_test) . '</strong></p>';
                        echo '<p>🔢 Código enviado: <strong>' . $codigo_test . '</strong></p>';
                        echo '<p>⚡ Tiempo de envío: <strong>' . $tiempo . ' ms</strong></p>';
                        echo '<p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #39ff14;">';
                        echo '🎉 <strong>Todo funciona correctamente!</strong><br>';
                        echo 'Revisa tu bandeja de entrada (y spam) para verificar que el email llegó.';
                        echo '</p>';
                    } else {
                        echo '<script>document.getElementById("result").className = "result error";</script>';
                        echo '<p><strong>❌ Error al enviar el email</strong></p>';
                        echo '<p>Revisa los logs del servidor para más detalles.</p>';
                    }
                } catch (Exception $e) {
                    echo '<script>document.getElementById("result").className = "result error";</script>';
                    echo '<p><strong>❌ Error de conexión SMTP:</strong></p>';
                    echo '<p>' . htmlspecialchars($e->getMessage()) . '</p>';
                    echo '<p style="margin-top: 15px;"><strong>Posibles causas:</strong></p>';
                    echo '<ul style="margin-left: 20px;">';
                    echo '<li>Contraseña incorrecta</li>';
                    echo '<li>Servidor SMTP incorrecto</li>';
                    echo '<li>Puerto bloqueado por firewall</li>';
                    echo '<li>Datos de configuración incorrectos</li>';
                    echo '</ul>';
                }
                
                echo '</div>';
            }
            ?>
        <?php endif; ?>
    </div>
</body>
</html>

