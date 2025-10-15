# 📧 CONFIGURACIÓN SMTP PARA ENVÍO RÁPIDO DE EMAILS - LUMETRIX

## 🎯 **OBJETIVO**
Configurar el envío de emails de verificación para que lleguen **en segundos** en lugar de **horas**.

---

## 📋 **PASO 1: Obtener datos SMTP de Hostalia**

### Opción A: Panel de Hostalia Web

1. 🌐 Acceder a: https://www.hostalia.com/area-de-clientes
2. 📧 Ir a **"Correo electrónico"** → **"Cuentas de correo"**
3. 🔍 Buscar el email: `noreply@colisan.com`
   - Si no existe, créalo:
     - Click en **"Añadir cuenta de correo"**
     - Email: `noreply@colisan.com`
     - Contraseña: (elige una segura y apúntala)
     - Cuota: 100 MB (suficiente)
4. 📝 **Anotar estos datos:**
   ```
   Servidor SMTP: mail.colisan.com (o el que te indiquen)
   Puerto: 587 (STARTTLS) o 465 (SSL)
   Usuario: noreply@colisan.com
   Contraseña: [la que configuraste]
   ```

### Opción B: Soporte de Hostalia

Si no encuentras los datos SMTP:

1. 📞 Contactar con soporte de Hostalia
2. 📧 Solicitar: "Datos de configuración SMTP para envío de emails desde PHP"
3. 📝 Te darán:
   - Servidor SMTP (ej: mail.colisan.com)
   - Puerto (587 o 465)
   - Método de seguridad (TLS o SSL)

---

## 📋 **PASO 2: Configurar el archivo config_smtp.php**

1. 📂 Abrir el archivo: `PARA_HOSTALIA/sistema_apps_upload/lumetrix/config_smtp.php`

2. ✏️ **Completar con tus datos:**

```php
// ⚠️ CAMBIAR ESTOS VALORES CON TUS DATOS REALES:

define('SMTP_HOST', 'mail.colisan.com');  // Tu servidor SMTP de Hostalia
define('SMTP_PORT', 587);                   // Puerto: 587 (TLS) o 465 (SSL)
define('SMTP_USER', 'noreply@colisan.com'); // Tu email de Hostalia
define('SMTP_PASS', 'TU_CONTRASEÑA_REAL');  // ⚠️ Poner tu contraseña SMTP
define('SMTP_FROM', 'noreply@colisan.com'); // Email del remitente
define('SMTP_NAME', 'LUMETRIX');            // Nombre que verán los usuarios

define('SMTP_SECURE', 'tls');  // 'tls' si puerto 587, 'ssl' si puerto 465
```

3. 💾 **Guardar el archivo**

---

## 📋 **PASO 3: Probar la configuración**

### Antes de subir a producción, probar localmente:

1. 🚀 Subir los archivos al servidor:
   ```
   - config_smtp.php
   - enviar_email_smtp.php
   - test_smtp.php
   ```

2. 🌐 Acceder a: `https://colisan.com/sistema_apps_upload/lumetrix/test_smtp.php`

3. 📧 Introducir tu email y hacer click en **"Enviar Email de Prueba"**

4. ⏱️ **Verificar:**
   - ✅ El email debería llegar en **menos de 10 segundos**
   - ✅ Revisa tanto la bandeja principal como spam
   - ✅ El código en el email debe ser el mismo que muestra la página

5. 🎉 **Si funciona:**
   - ✅ Configuración correcta
   - ✅ Listo para usar en producción

6. ❌ **Si NO funciona:**
   - Revisar los mensajes de error en la página
   - Verificar que los datos SMTP sean correctos
   - Comprobar que el puerto no esté bloqueado
   - Contactar con soporte de Hostalia si persiste

---

## 📋 **PASO 4: Subir a producción**

Una vez que `test_smtp.php` funcione correctamente:

1. 📂 Subir todos los archivos al servidor:
   ```bash
   # Ejecutar el BAT de deploy
   deploy_lumetrix_correcto.bat
   ```

   O manualmente vía FTP:
   ```
   /sistema_apps_upload/lumetrix/
   ├── config_smtp.php         (NUEVO - con tus datos)
   ├── enviar_email_smtp.php   (NUEVO - sistema SMTP)
   ├── auth.php                (MODIFICADO - usa SMTP)
   └── test_smtp.php           (NUEVO - para testing)
   ```

2. 🧪 **Probar registro completo:**
   - Abrir la app Lumetrix
   - Registrar un nuevo usuario
   - ⏱️ El código debería llegar en **menos de 10 segundos**
   - ✅ Verificar y completar login

3. 🗑️ **Opcional: Eliminar archivo de test**
   ```bash
   # Por seguridad, borrar test_smtp.php en producción
   # O dejarlo para futuras pruebas (no es crítico)
   ```

---

## 📊 **COMPARATIVA: mail() vs SMTP**

| Método | Tiempo de envío | Confiabilidad | Llegada a spam |
|--------|----------------|---------------|----------------|
| `mail()` (anterior) | **6-8 horas** ❌ | Baja | Alta |
| **SMTP (nuevo)** | **2-10 segundos** ✅ | Alta | Baja |

---

## 🔧 **TROUBLESHOOTING**

### Error: "No se pudo conectar al servidor SMTP"
**Causa:** Servidor o puerto incorrectos
**Solución:**
- Verificar `SMTP_HOST` y `SMTP_PORT` en `config_smtp.php`
- Contactar con Hostalia para confirmar datos

### Error: "Autenticación SMTP falló"
**Causa:** Usuario o contraseña incorrectos
**Solución:**
- Verificar `SMTP_USER` y `SMTP_PASS` en `config_smtp.php`
- Probar login en cliente de email (Outlook, Thunderbird)
- Regenerar contraseña en panel de Hostalia

### Error: "stream_socket_enable_crypto(): SSL operation failed"
**Causa:** Problema con certificado SSL/TLS
**Solución:**
- Cambiar `SMTP_SECURE` de `'tls'` a `'ssl'`
- O viceversa
- Probar puerto 465 si usabas 587 (o al revés)

### Email llega a spam
**Solución:**
- Configurar registros SPF y DKIM en DNS
- Contactar con Hostalia para ayuda con autenticación
- Usar email corporativo en lugar de noreply

### Email tarda más de 30 segundos
**Solución:**
- Aumentar `SMTP_TIMEOUT` en `config_smtp.php`
- Verificar velocidad de conexión del servidor
- Contactar con Hostalia por lentitud del SMTP

---

## 🔐 **SEGURIDAD**

⚠️ **IMPORTANTE:**

1. **NO subir `config_smtp.php` a Git**
   - Contiene contraseñas sensibles
   - Mantenerlo solo en el servidor

2. **Usar email específico (noreply@)**
   - No usar tu email personal
   - No usar el email principal de la empresa
   - Crear uno específico para la app

3. **Contraseña segura**
   - Mínimo 12 caracteres
   - Combinación de letras, números, símbolos
   - Diferente a otras contraseñas

---

## 📞 **SOPORTE**

Si después de seguir todos los pasos sigue sin funcionar:

1. 📧 **Email a soporte Hostalia:**
   ```
   Asunto: Configuración SMTP para envío desde PHP
   
   Hola,
   
   Necesito configurar el envío de emails desde mi aplicación PHP.
   
   ¿Podrían confirmarme los datos SMTP correctos para el dominio colisan.com?
   
   - Servidor SMTP
   - Puerto
   - Seguridad (TLS/SSL)
   - Usuario (noreply@colisan.com)
   
   Gracias.
   ```

2. 📱 **Teléfono Hostalia:** 932 500 400

---

## ✅ **CHECKLIST FINAL**

- [ ] Obtener datos SMTP de Hostalia
- [ ] Configurar `config_smtp.php` con datos reales
- [ ] Subir archivos al servidor
- [ ] Probar `test_smtp.php` → email llega rápido
- [ ] Probar registro en app → código llega en segundos
- [ ] ✅ **¡LISTO!** Verificación de email funciona correctamente

---

## 🎉 **RESULTADO ESPERADO**

Antes de SMTP:
```
Usuario se registra → Espera 6-8 horas → Código expirado → Frustración
```

Después de SMTP:
```
Usuario se registra → Código llega en 5 segundos → Verifica → ¡Juega! 🎮
```

---

**¡Buena suerte!** 🚀

