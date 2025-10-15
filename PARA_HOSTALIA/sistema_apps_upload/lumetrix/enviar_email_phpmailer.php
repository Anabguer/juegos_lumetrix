<?php
/**
 * 📧 Sistema de envío de emails con PHPMailer - LUMETRIX
 * Versión mejorada usando PHPMailer (más confiable que SMTP nativo)
 * ⚡ Configuración idéntica a tu otra web que ya funciona
 */

require_once __DIR__ . '/config_smtp.php';

/**
 * Enviar email de verificación con PHPMailer
 */
function enviarEmailVerificacion($email, $nombre, $codigo) {
    $asunto = "🔐 Verifica tu cuenta en LUMETRIX";
    
    $html = generarHTMLVerificacion($nombre, $codigo);
    
    try {
        return enviarEmailPHPMailer($email, $asunto, $html);
    } catch (Exception $e) {
        error_log("❌ Error enviando email de verificación a $email: " . $e->getMessage());
        return false;
    }
}

/**
 * Generar HTML del email de verificación
 */
function generarHTMLVerificacion($nombre, $codigo) {
    return '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de cuenta - LUMETRIX</title>
    <style>
        body { 
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #000 0%, #111 50%, #000 100%);
            color: #fff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: linear-gradient(135deg, #000 0%, #111 50%, #000 100%);
            border: 2px solid #39ff14;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 0 30px rgba(57, 255, 20, 0.3);
        }
        .header { 
            background: linear-gradient(90deg, #39ff14, #00ffff, #ff00ff);
            padding: 30px 20px;
            text-align: center;
            color: #000;
        }
        .header h1 { 
            margin: 0; 
            font-size: 32px; 
            font-weight: 900;
            letter-spacing: 0.1em;
            text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .content { 
            padding: 40px 30px; 
            text-align: center;
        }
        .codigo { 
            font-size: 48px; 
            font-weight: 900; 
            color: #39ff14;
            background: rgba(57, 255, 20, 0.1);
            border: 3px solid #39ff14;
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
            letter-spacing: 0.2em;
            text-shadow: 0 0 20px #39ff14;
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
        }
        .instrucciones {
            font-size: 16px;
            line-height: 1.6;
            margin: 20px 0;
            color: #e5e7eb;
        }
        .advertencia {
            background: rgba(255, 0, 255, 0.1);
            border: 2px solid #ff00ff;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: #ff00ff;
            font-weight: bold;
        }
        .footer { 
            background: rgba(0, 0, 0, 0.5);
            padding: 20px; 
            text-align: center; 
            font-size: 12px; 
            color: #9ca3af;
            border-top: 1px solid #39ff14;
        }
        .logo {
            font-size: 24px;
            font-weight: 900;
            background: linear-gradient(90deg, #39ff14, #00ffff, #ff00ff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">LUMETRIX</div>
            <h1>🔐 Verificación de Cuenta</h1>
        </div>
        <div class="content">
            <h2>¡Hola, ' . htmlspecialchars($nombre) . '!</h2>
            <p class="instrucciones">
                Gracias por registrarte en <strong>LUMETRIX</strong>.<br>
                Para activar tu cuenta, introduce este código en la aplicación:
            </p>
            
            <div class="codigo">' . $codigo . '</div>
            
            <p class="instrucciones">
                Este código es válido por <strong>15 minutos</strong>.<br>
                Una vez verificado, podrás acceder a todos los niveles del juego.
            </p>
            
            <div class="advertencia">
                ⚠️ Si no solicitaste esta verificación, ignora este email.
            </div>
        </div>
        <div class="footer">
            <p>Este es un email automático, por favor no respondas.</p>
            <p>© 2024 LUMETRIX - Sistema de verificación de cuentas</p>
        </div>
    </div>
</body>
</html>';
}

/**
 * 🚀 ENVIAR EMAIL VÍA PHPMailer (MÁS CONFIABLE)
 * Usa la misma configuración que tu otra web que ya funciona
 */
function enviarEmailPHPMailer($to, $subject, $htmlBody) {
    if (SMTP_DEBUG) {
        error_log("📧 Iniciando envío PHPMailer a: $to");
    }
    
    // Verificar si PHPMailer está disponible
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        // Si no está PHPMailer, usar SMTP nativo como fallback
        return enviarEmailSMTPNativo($to, $subject, $htmlBody);
    }
    
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        
        // Configuración del servidor SMTP (igual que tu otra web)
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;           // smtp.colisan.com
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;       // info@colisan.com
        $mail->Password = SMTP_PASS;       // IgdAmg19521954
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;           // 587
        
        // Configuración del remitente (igual que tu otra web)
        $mail->setFrom(SMTP_FROM, SMTP_NAME);  // info@intocables.com, LUMETRIX
        $mail->addReplyTo(SMTP_FROM, SMTP_NAME);
        
        // Destinatario
        $mail->addAddress($to);
        
        // Contenido
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $htmlBody;
        $mail->CharSet = 'UTF-8';
        
        // Enviar
        $resultado = $mail->send();
        
        if (SMTP_DEBUG) {
            error_log("✅ Email PHPMailer enviado correctamente a: $to");
        }
        
        return $resultado;
        
    } catch (Exception $e) {
        error_log("❌ Error PHPMailer: " . $e->getMessage());
        throw $e;
    }
}

/**
 * 🛡️ FALLBACK: SMTP nativo si PHPMailer no está disponible
 * Usa la misma configuración pero con sockets nativos
 */
function enviarEmailSMTPNativo($to, $subject, $htmlBody) {
    if (SMTP_DEBUG) {
        error_log("📧 Usando SMTP nativo como fallback para: $to");
    }
    
    $inicio = microtime(true);
    
    try {
        // Conectar al servidor SMTP
        $socket = @fsockopen(SMTP_HOST, SMTP_PORT, $errno, $errstr, SMTP_TIMEOUT);
        if (!$socket) {
            throw new Exception("No se pudo conectar al servidor SMTP: $errstr ($errno)");
        }
        
        // Leer respuesta inicial del servidor
        $response = fgets($socket, 515);
        if (SMTP_DEBUG) error_log("Server: $response");
        
        // EHLO
        fputs($socket, "EHLO " . SMTP_HOST . "\r\n");
        $response = leerRespuestaSMTP($socket);
        if (SMTP_DEBUG) error_log("EHLO: $response");
        
        // STARTTLS
        fputs($socket, "STARTTLS\r\n");
        $response = fgets($socket, 515);
        if (SMTP_DEBUG) error_log("STARTTLS: $response");
        
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        
        // EHLO de nuevo después de TLS
        fputs($socket, "EHLO " . SMTP_HOST . "\r\n");
        $response = leerRespuestaSMTP($socket);
        
        // AUTH LOGIN
        fputs($socket, "AUTH LOGIN\r\n");
        fgets($socket, 515);
        
        fputs($socket, base64_encode(SMTP_USER) . "\r\n");
        fgets($socket, 515);
        
        fputs($socket, base64_encode(SMTP_PASS) . "\r\n");
        $response = fgets($socket, 515);
        if (SMTP_DEBUG) error_log("AUTH: $response");
        
        if (strpos($response, '235') === false) {
            fclose($socket);
            throw new Exception("Autenticación SMTP falló: $response");
        }
        
        // MAIL FROM
        fputs($socket, "MAIL FROM: <" . SMTP_FROM . ">\r\n");
        fgets($socket, 515);
        
        // RCPT TO
        fputs($socket, "RCPT TO: <$to>\r\n");
        fgets($socket, 515);
        
        // DATA
        fputs($socket, "DATA\r\n");
        fgets($socket, 515);
        
        // Headers y cuerpo del email
        $headers = "From: " . SMTP_NAME . " <" . SMTP_FROM . ">\r\n";
        $headers .= "Reply-To: " . SMTP_FROM . "\r\n";
        $headers .= "To: $to\r\n";
        $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "Content-Transfer-Encoding: 8bit\r\n";
        $headers .= "X-Mailer: LUMETRIX-PHPMailer/1.0\r\n";
        $headers .= "Date: " . date('r') . "\r\n";
        $headers .= "\r\n";
        
        fputs($socket, $headers);
        fputs($socket, $htmlBody . "\r\n");
        fputs($socket, ".\r\n");
        
        $response = fgets($socket, 515);
        if (SMTP_DEBUG) error_log("DATA: $response");
        
        // QUIT
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        $tiempo = round((microtime(true) - $inicio) * 1000);
        
        if (strpos($response, '250') !== false) {
            if (SMTP_DEBUG) error_log("✅ Email SMTP nativo enviado correctamente a: $to en {$tiempo}ms");
            return true;
        } else {
            throw new Exception("Error al enviar email: $response");
        }
        
    } catch (Exception $e) {
        error_log("❌ Error SMTP nativo: " . $e->getMessage());
        throw $e;
    }
}

/**
 * Leer respuesta completa del servidor SMTP
 */
function leerRespuestaSMTP($socket) {
    $response = '';
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        // Si la línea tiene formato "250 OK" (sin guion), es la última
        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }
    return $response;
}

/**
 * Generar código de verificación de 6 dígitos
 */
function generarCodigoVerificacion() {
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
}

/**
 * Verificar si un código es válido (no expirado)
 */
function codigoEsValido($verification_expiry) {
    if (!$verification_expiry) return false;
    
    $ahora = new DateTime();
    $expiry = new DateTime($verification_expiry);
    
    return $ahora < $expiry;
}

/**
 * Limpiar códigos expirados de la base de datos
 */
function limpiarCodigosExpirados($pdo) {
    try {
        $stmt = $pdo->prepare("
            UPDATE usuarios_aplicaciones 
            SET verification_code = NULL, 
                verification_expiry = NULL 
            WHERE verification_expiry < NOW() 
            AND verification_code IS NOT NULL
        ");
        $stmt->execute();
        
        $limpiados = $stmt->rowCount();
        if ($limpiados > 0) {
            error_log("Limpieza automática: $limpiados códigos expirados eliminados");
        }
        
        return $limpiados;
    } catch (Exception $e) {
        error_log("Error limpiando códigos expirados: " . $e->getMessage());
        return 0;
    }
}
?>
