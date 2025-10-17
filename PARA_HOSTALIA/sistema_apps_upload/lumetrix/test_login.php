<?php
require_once __DIR__.'/_common.php';

// Test directo del login
$email = 'losmajos13@gmail.com';
$password = '111111';

echo "<h2>🔍 DIAGNÓSTICO DE LOGIN</h2>";

$pdo = db();
$uakey = key_from_email($email);

echo "<p><strong>Email:</strong> $email</p>";
echo "<p><strong>Uakey:</strong> $uakey</p>";

// Buscar usuario
$st = $pdo->prepare('SELECT * FROM usuarios_aplicaciones WHERE usuario_aplicacion_key=? AND app_codigo=?');
$st->execute([$uakey, 'lumetrix']);
$row = $st->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    echo "<p style='color:red'>❌ Usuario no encontrado</p>";
    exit;
}

echo "<p style='color:green'>✅ Usuario encontrado</p>";
echo "<p><strong>Nick:</strong> " . $row['nick'] . "</p>";
echo "<p><strong>Activo:</strong> " . ($row['activo'] ? 'SÍ' : 'NO') . "</p>";
echo "<p><strong>Verificado:</strong> " . ($row['verified_at'] ? 'SÍ (' . $row['verified_at'] . ')' : 'NO') . "</p>";

// Verificar contraseña
if (!password_verify($password, $row['password_hash'])) {
    echo "<p style='color:red'>❌ Contraseña incorrecta</p>";
    exit;
}

echo "<p style='color:green'>✅ Contraseña correcta</p>";

// Verificar estado de verificación
if ($row['verified_at'] === NULL) {
    echo "<p style='color:orange'>⚠️ Email NO verificado</p>";
    echo "<p><strong>Código de verificación:</strong> " . $row['verification_code'] . "</p>";
    echo "<p><strong>Expira:</strong> " . $row['verification_expiry'] . "</p>";
} else {
    echo "<p style='color:green'>✅ Email verificado</p>";
}

// Verificar estado activo
if ($row['activo'] != 1) {
    echo "<p style='color:orange'>⚠️ Cuenta NO activa</p>";
} else {
    echo "<p style='color:green'>✅ Cuenta activa</p>";
}

echo "<hr>";
echo "<h3>📊 RESUMEN:</h3>";
if ($row['verified_at'] === NULL) {
    echo "<p style='color:red'><strong>PROBLEMA:</strong> El email no está verificado. El usuario debe verificar su email antes de poder hacer login.</p>";
} elseif ($row['activo'] != 1) {
    echo "<p style='color:red'><strong>PROBLEMA:</strong> La cuenta no está activa.</p>";
} else {
    echo "<p style='color:green'><strong>ESTADO:</strong> Todo correcto, el login debería funcionar.</p>";
}
?>


