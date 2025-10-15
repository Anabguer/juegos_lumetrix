<?php
/**
 * 🔐 CONFIGURACIÓN SMTP PARA ENVÍO DE EMAILS - HOSTALIA
 * 
 * INSTRUCCIONES:
 * 1. Completar los datos SMTP de tu cuenta de Hostalia
 * 2. Guardar este archivo
 * 3. NO subir a Git (está en .gitignore)
 */

// ========================================
// 📧 CONFIGURACIÓN SMTP DE HOSTALIA
// ========================================

define('SMTP_HOST', 'smtp.colisan.com');       // Servidor SMTP (mismo que tu otra web)
define('SMTP_PORT', 25);                       // Puerto SMTP (25 sin TLS - ¡FUNCIONA!)
define('SMTP_USER', 'info@colisan.com');       // Usuario SMTP (mismo que tu otra web)
define('SMTP_PASS', 'IgdAmg19521954');         // Contraseña SMTP original
define('SMTP_FROM', 'info@intocables.com');    // Email del remitente (mismo que tu otra web)
define('SMTP_NAME', 'LUMETRIX');               // Nombre del remitente

// ========================================
// 🔧 CONFIGURACIÓN AVANZADA (opcional)
// ========================================

define('SMTP_SECURE', 'none');  // 'none' - ¡SIN TLS!
define('SMTP_TIMEOUT', 30);    // Timeout en segundos
define('SMTP_DEBUG', true);    // true para ver logs de debug

// ========================================
// 📋 NOTAS IMPORTANTES
// ========================================

/**
 * CÓMO OBTENER TUS DATOS SMTP DE HOSTALIA:
 * 
 * 1. Acceder a tu panel de Hostalia
 * 2. Ir a "Correo electrónico" → "Cuentas de correo"
 * 3. Buscar o crear el email: noreply@colisan.com
 * 4. Copiar:
 *    - Servidor SMTP: mail.colisan.com (o el que te indiquen)
 *    - Puerto: 587 (STARTTLS) o 465 (SSL)
 *    - Usuario: noreply@colisan.com
 *    - Contraseña: (la que configuraste para ese email)
 * 
 * VERIFICACIÓN:
 * - Probar desde un cliente de email (Outlook, Thunderbird, etc.)
 * - Si funciona ahí, funcionará en PHP
 * 
 * SEGURIDAD:
 * - Este archivo NO debe subirse a Git
 * - Mantener la contraseña segura
 * - Usar un email específico (noreply) en lugar del email principal
 */
?>

