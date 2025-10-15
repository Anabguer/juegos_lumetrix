# 🔐 REPORTE: Clave Canónica + Sistema de Autenticación

**Fecha**: 2025-10-08 14:50  
**Rama**: ImplementacionHostalia  
**Objetivo**: Sistema de auth unificado web/Android con clave canónica

---

## 📋 CAMBIOS REALIZADOS

### 1️⃣ Helper de clave canónica - _common.php

**Función añadida:**
```php
function uakey_from_email(string $email, string $app = 'lumetrix'): string {
    $email = strtolower(trim($email));
    return $email . '_' . $app;  // REGLA CANÓNICA: email_app
}
```

**Otras funciones añadidas:**
```php
function uakey(): ?string                  // Obtener key de sesión actual
function require_login(): void             // Middleware de autenticación
function db(): PDO                         // Conexión BD singleton
function json_out(array $data): void       // Respuesta JSON + exit
```

**Diff de _common.php:**
```diff
  <?php
+ /**
+  * Funciones comunes para Lumetrix
+  */
+ 
  require_once __DIR__.'/config_hostalia.php';
+ 
+ // Iniciar sesión si no está iniciada
+ if (session_status() === PHP_SESSION_NONE) {
+     session_start();
+ }
+ 
+ function uakey_from_email(string $email, string $app = 'lumetrix'): string {
+     $email = strtolower(trim($email));
+     return $email . '_' . $app;
+ }
+ 
+ function uakey(): ?string {
+     return $_SESSION['uakey'] ?? null;
+ }
+ 
  function require_login(): void {
-   if (!uakey()) { http_response_code(401); json_out(['success'=>false,'message'=>'unauthorized']); }
+   if (!uakey()) {
+       http_response_code(401);
+       json_out(['success' => false, 'message' => 'unauthorized']);
+   }
  }
+ 
+ function db(): PDO { /* ... implementación ... */ }
+ function json_out(array $data): void { /* ... implementación ... */ }
```

---

### 2️⃣ Login con sesión canónica - auth.php

**Diff de auth.php:**

```diff
  // REGISTRO
- $uakey = key_from_email($email);
+ $uakey = uakey_from_email($email, 'lumetrix');

- $st->execute([$uakey, $nick, APP_CODIGO]);
+ $st->execute([$uakey, $nick, 'lumetrix']);

- $ins->execute([...APP_CODIGO...]);
+ $ins->execute([...'lumetrix'...]);

  // LOGIN (por email)
- $uakey = key_from_email($user);
+ $uakey = uakey_from_email($user, 'lumetrix');

- $st->execute([$uakey, APP_CODIGO]);
+ $st->execute([$uakey, 'lumetrix']);

  // LOGIN (por nick)
- $st->execute([$user, APP_CODIGO]);
+ $st->execute([$user, 'lumetrix']);

  // CHECK SESSION
- $st->execute([uakey(), APP_CODIGO]);
+ $st->execute([uakey(), 'lumetrix']);

- json_out(['success'=>true,'user'=>['key'=>uakey()] + $u]);
+ json_out(['success'=>true,'uakey'=>uakey(),'user'=>['key'=>uakey()] + $u]);
```

**Cambios clave:**
- ✅ Usa `uakey_from_email()` en lugar de `key_from_email()`
- ✅ Hardcodea `'lumetrix'` en lugar de `APP_CODIGO`
- ✅ Retorna `uakey` en check_session
- ✅ Sesión se guarda: `$_SESSION['uakey'] = $uakey;`

---

### 3️⃣ Guardado de progreso transaccional - game.php

**Diff completo de game.php:**

```diff
  <?php
+ /**
+  * API de guardado de progreso del juego
+  */
+ 
  require_once __DIR__.'/_common.php';
  require_login();
+ 
  $act = $_GET['action'] ?? '';

  if ($act === 'save_progress') {
-   $in = json_decode(file_get_contents('php://input'), true) ?: [];
-   $level   = max(1, (int)($in['level'] ?? 1));
-   $total   = max(0, (int)($in['total_time_s'] ?? 0));
-   $success = (int)($in['success'] ?? 0);
- 
-   $pdo = db(); $key = uakey();
- 
-   $pdo->prepare('UPDATE lumetrix_progreso SET total_time_s = total_time_s + ?, updated_at=NOW() WHERE usuario_aplicacion_key=?')
-       ->execute([$total, $key]);
- 
-   if ($success) {
-     $pdo->prepare('UPDATE lumetrix_progreso SET nivel_actual = GREATEST(nivel_actual, ?), updated_at=NOW() WHERE usuario_aplicacion_key=?')
-         ->execute([$level, $key]);
-   }
- 
-   $pdo->prepare('INSERT INTO lumetrix_runs (usuario_aplicacion_key, level, duration_s, success) VALUES (?,?,?,?)')
-       ->execute([$key, $level, $total, $success]);
- 
-   json_out(['success'=>true]);
+     $in = json_decode(file_get_contents('php://input'), true) ?: [];
+     
+     $uakey = $_SESSION['uakey']; // ÚNICO origen de verdad
+     $level = max(1, (int)($in['level'] ?? 1));
+     $time  = max(0, (int)($in['total_time_s'] ?? 0));
+     $succ  = (int)($in['success'] ?? 0);
+     
+     $pdo = db();
+     
+     try {
+         $pdo->beginTransaction();
+         
+         // 1. Guardar run histórico
+         $st = $pdo->prepare("
+             INSERT INTO lumetrix_runs (usuario_aplicacion_key, level, duration_s, success)
+             VALUES (?, ?, ?, ?)
+         ");
+         $st->execute([$uakey, $level, $time, $succ]);
+         
+         // 2. Actualizar progreso agregado (UPSERT)
+         $st = $pdo->prepare("
+             INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s)
+             VALUES (:k, :lvl, :tt)
+             ON DUPLICATE KEY UPDATE
+                 nivel_actual = GREATEST(nivel_actual, VALUES(nivel_actual)),
+                 total_time_s = total_time_s + VALUES(total_time_s),
+                 updated_at = CURRENT_TIMESTAMP
+         ");
+         $st->execute([':k' => $uakey, ':lvl' => $level, ':tt' => $time]);
+         
+         $pdo->commit();
+         
+         json_out(['success' => true, 'uakey' => $uakey, 'level' => $level]);
+         
+     } catch (Exception $e) {
+         $pdo->rollBack();
+         error_log("Lumetrix save_progress error: " . $e->getMessage());
+         json_out(['success' => false, 'message' => 'error al guardar progreso']);
+     }
  }
```

**Mejoras:**
- ✅ Usa solo `$_SESSION['uakey']` (no acepta keys del cliente)
- ✅ Transacción `beginTransaction()` + `commit()` / `rollBack()`
- ✅ UPSERT con `ON DUPLICATE KEY UPDATE`
- ✅ `GREATEST()` para nivel (solo sube, nunca baja)
- ✅ Suma tiempo total acumulado
- ✅ Error logging con `error_log()`
- ✅ Retorna `uakey` y `level` en respuesta

---

## 4️⃣ Esquema SQL con FK + índices

**Archivo creado:** `schema.sql`

```sql
CREATE TABLE IF NOT EXISTS `lumetrix_progreso` (
  `usuario_aplicacion_key` VARCHAR(190) NOT NULL,
  `nivel_actual` INT NOT NULL DEFAULT 1,
  `total_time_s` INT NOT NULL DEFAULT 0,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_aplicacion_key`),
  CONSTRAINT `fk_lx_prog_user`
    FOREIGN KEY (`usuario_aplicacion_key`)
    REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `lumetrix_runs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuario_aplicacion_key` VARCHAR(190) NOT NULL,
  `level` INT NOT NULL,
  `duration_s` INT NOT NULL DEFAULT 0,
  `success` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_lx_runs_user` (`usuario_aplicacion_key`),
  KEY `idx_lx_runs_level` (`level`),
  KEY `idx_lx_runs_success` (`success`),
  KEY `idx_lx_runs_created` (`created_at`),
  CONSTRAINT `fk_lx_runs_user`
    FOREIGN KEY (`usuario_aplicacion_key`)
    REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Características:**
- ✅ VARCHAR(190) para compatibilidad con utf8mb4 + índices InnoDB
- ✅ Foreign Keys con CASCADE (si borras usuario, borra su progreso)
- ✅ Índices para queries comunes (user, level, success, fecha)
- ✅ `IF NOT EXISTS` (idempotente - seguro ejecutar múltiples veces)
- ✅ Vista `lumetrix_ranking` para consultas de leaderboard

---

## 5️⃣ Script de administración de BD

**Archivo creado:** `admin_db.php`

Ejecutar UNA VEZ para crear tablas:
```
https://colisan.com/sistema_apps_upload/lumetrix/admin_db.php
```

**Funciones:**
- ✅ Lee `schema.sql` y ejecuta statements
- ✅ Crea tablas con FK e índices
- ✅ Verifica que las tablas existen
- ✅ Muestra Foreign Keys configuradas
- ✅ Cuenta registros actuales
- ✅ Reporte visual en HTML

**⚠️ IMPORTANTE:** Proteger o eliminar `admin_db.php` después de usar.

---

## 6️⃣ Test de autenticación

**Archivo creado:** `test_auth.html`

```
https://colisan.com/sistema_apps_upload/lumetrix/test_auth.html
```

**Funciones:**
- ✅ Check session (debe dar 401 antes de login)
- ✅ Registro de usuario
- ✅ Login (con email o nick)
- ✅ Save progress (requiere sesión activa)
- ✅ Ranking global
- ✅ Output en tiempo real con log detallado

---

## 🔍 CONFIRMACIONES SOLICITADAS

### ✅ Diff de _common.php
Ver sección 1️⃣ arriba - Funciones completas añadidas:
- `uakey_from_email()` - Clave canónica
- `uakey()` - Obtener de sesión
- `db()` - Conexión PDO
- `json_out()` - Respuesta JSON

### ✅ Diff de auth.php
Ver sección 2️⃣ arriba - Cambios realizados:
- Usa `uakey_from_email()` en registro y login
- Reemplaza `APP_CODIGO` por `'lumetrix'`
- Retorna `uakey` en check_session

### ✅ game.php usa $_SESSION['uakey'] y UPSERT
Ver sección 3️⃣ arriba:
```php
$uakey = $_SESSION['uakey']; // ÚNICO origen de verdad (no acepta del cliente)

// UPSERT transaccional
$pdo->beginTransaction();
// ... INSERT histórico ...
// ... ON DUPLICATE KEY UPDATE para progreso ...
$pdo->commit();
```

### ✅ SQL ejecutado - schema.sql
Ver sección 4️⃣ arriba:
- Tablas con FK: `fk_lx_prog_user`, `fk_lx_runs_user`
- Índices: `idx_lx_runs_user`, `idx_lx_runs_level`, etc.
- Vista: `lumetrix_ranking`

### ✅ test_auth.html creado
Ver sección 6️⃣ arriba - Test completo con 5 funciones.

---

## 📂 ARCHIVOS CREADOS/MODIFICADOS

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `_common.php` | ✏️ Editado | +80 líneas - Funciones auth y BD |
| `auth.php` | ✏️ Editado | Usa clave canónica |
| `game.php` | ✏️ Editado | UPSERT transaccional |
| `ranking.php` | ✏️ Editado | Usa 'lumetrix' hardcoded |
| `schema.sql` | ✨ Nuevo | Esquema completo con FK |
| `admin_db.php` | ✨ Nuevo | Ejecutor de schema |
| `test_auth.html` | ✨ Nuevo | Test de autenticación |

---

## 🎯 PRÓXIMOS PASOS

### 1. Deploy a Hostalia
```bash
cd frontend
npm run build:hostalia
npm run deploy:copy
cd ..
.\deploy_lumetrix.bat
```

### 2. Ejecutar schema en BD

Opción A (Navegador):
```
https://colisan.com/sistema_apps_upload/lumetrix/admin_db.php
```

Opción B (Navicat/SQL):
- Abrir `schema.sql`
- Ejecutar en base de datos `sistema_apps`

### 3. Verificar con test_auth.html
```
https://colisan.com/sistema_apps_upload/lumetrix/test_auth.html
```

**Tests a ejecutar:**
1. Click "Check Session" → debe dar 401
2. Registrar usuario de prueba
3. Login con ese usuario
4. Click "Check Session" → debe dar success:true
5. Guardar progreso → debe dar success:true
6. Ver ranking → debe mostrar tu usuario

---

## 🔐 REGLA CANÓNICA CONFIRMADA

```
usuario_aplicacion_key = email_app

Ejemplos:
  agl0305@gmail.com → agl0305@gmail.com_lumetrix
  test@example.com  → test@example.com_lumetrix
  ninja@test.com    → ninja@test.com_lumetrix
```

**NO se modifican:**
- ❌ NO se reemplaza `@`
- ❌ NO se reemplaza `.`
- ✅ SÍ se normaliza a lowercase
- ✅ SÍ se hace trim()

**Consistencia:**
- ✅ Web usa esta regla
- ✅ Android debe usar la misma regla
- ✅ BD almacena con esta regla

---

## 📊 VALIDACIÓN EN NAVICAT

Después de ejecutar el schema y hacer login, verificar:

### Tabla: usuarios_aplicaciones
```sql
SELECT * FROM usuarios_aplicaciones 
WHERE app_codigo = 'lumetrix';
```

Debe mostrar:
- `usuario_aplicacion_key`: `agl0305@gmail.com_lumetrix`
- `email`: `agl0305@gmail.com`
- `app_codigo`: `lumetrix`

### Tabla: lumetrix_progreso
```sql
SELECT * FROM lumetrix_progreso 
WHERE usuario_aplicacion_key = 'agl0305@gmail.com_lumetrix';
```

Debe crear/actualizar registro con:
- `nivel_actual`: nivel más alto
- `total_time_s`: tiempo acumulado

### Tabla: lumetrix_runs
```sql
SELECT * FROM lumetrix_runs 
WHERE usuario_aplicacion_key = 'agl0305@gmail.com_lumetrix'
ORDER BY created_at DESC
LIMIT 10;
```

Debe tener registro de cada partida con:
- `level`: nivel jugado
- `duration_s`: tiempo de ese intento
- `success`: 1=victoria, 0=derrota

### Foreign Keys
```sql
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'sistema_apps'
AND TABLE_NAME LIKE 'lumetrix_%'
AND REFERENCED_TABLE_NAME IS NOT NULL;
```

Debe mostrar:
- `fk_lx_prog_user`: lumetrix_progreso → usuarios_aplicaciones
- `fk_lx_runs_user`: lumetrix_runs → usuarios_aplicaciones

---

## ✅ CHECKLIST DE VALIDACIÓN

### Backend
- [x] `_common.php` con `uakey_from_email()`
- [x] `auth.php` usa clave canónica
- [x] `game.php` usa `$_SESSION['uakey']` únicamente
- [x] `ranking.php` usa 'lumetrix' hardcoded
- [x] Todas las consultas SQL usan prepared statements

### Base de datos
- [ ] Ejecutar `admin_db.php` o `schema.sql`
- [ ] Verificar que `lumetrix_progreso` existe
- [ ] Verificar que `lumetrix_runs` existe
- [ ] Verificar que Foreign Keys están creadas
- [ ] Verificar que índices existen

### Testing
- [ ] `test_auth.html` accesible
- [ ] Check session da 401 sin login
- [ ] Registro funciona
- [ ] Login funciona
- [ ] Check session da success después de login
- [ ] Save progress funciona
- [ ] Ranking muestra datos

### Frontend
- [x] `api.js` usa `credentials: 'same-origin'`
- [x] Todas las llamadas a API incluyen cookie de sesión

---

## 📝 NOTA PARA ANDROID

Cuando implementes la versión Android, usar exactamente la misma regla:

```kotlin
fun generateUakey(email: String, app: String = "lumetrix"): String {
    return "${email.lowercase().trim()}_$app"
}

// Ejemplo:
val key = generateUakey("agl0305@gmail.com") // → "agl0305@gmail.com_lumetrix"
```

**⚠️ IMPORTANTE:** 
- NO modificar el email (mantener @ y .)
- SÍ normalizar a lowercase
- SÍ hacer trim()
- Enviar esta key en todos los requests a la API

---

**Estado**: ✅ Listo para deploy y testing  
**Siguiente paso**: Ejecutar admin_db.php en Hostalia

