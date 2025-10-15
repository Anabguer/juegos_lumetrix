<?php
/**
 * 📦 INSTALADOR AUTOMÁTICO DE PHPMailer
 * 
 * Este script descarga e instala PHPMailer automáticamente
 * para que funcione el envío de emails.
 */

echo "<h1>📦 Instalando PHPMailer...</h1>";

// Verificar si ya está instalado
if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    echo "<p style='color: green;'>✅ PHPMailer ya está instalado.</p>";
    exit;
}

// Crear directorio vendor si no existe
$vendorDir = __DIR__ . '/vendor';
if (!is_dir($vendorDir)) {
    if (!mkdir($vendorDir, 0755, true)) {
        die("<p style='color: red;'>❌ No se pudo crear el directorio vendor/</p>");
    }
    echo "<p style='color: blue;'>📁 Directorio vendor/ creado.</p>";
}

// URL de descarga de PHPMailer
$phpmailerUrl = 'https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip';
$zipFile = __DIR__ . '/phpmailer.zip';

echo "<p>📥 Descargando PHPMailer desde GitHub...</p>";

// Descargar PHPMailer
$zipContent = file_get_contents($phpmailerUrl);
if ($zipContent === false) {
    die("<p style='color: red;'>❌ No se pudo descargar PHPMailer desde GitHub.</p>");
}

// Guardar el ZIP
if (file_put_contents($zipFile, $zipContent) === false) {
    die("<p style='color: red;'>❌ No se pudo guardar el archivo ZIP.</p>");
}

echo "<p style='color: green;'>✅ PHPMailer descargado correctamente.</p>";

// Verificar si ZipArchive está disponible
if (!class_exists('ZipArchive')) {
    die("<p style='color: red;'>❌ ZipArchive no está disponible en este servidor. Contacta con Hostalia para habilitarlo.</p>");
}

// Extraer el ZIP
$zip = new ZipArchive();
if ($zip->open($zipFile) === TRUE) {
    // Extraer solo la carpeta src
    for ($i = 0; $i < $zip->numFiles; $i++) {
        $filename = $zip->getNameIndex($i);
        if (strpos($filename, 'PHPMailer-master/src/') === 0) {
            $localPath = str_replace('PHPMailer-master/src/', 'vendor/PHPMailer/PHPMailer/', $filename);
            $localDir = dirname($localPath);
            
            if (!is_dir($localDir)) {
                mkdir($localDir, 0755, true);
            }
            
            $content = $zip->getFromIndex($i);
            if ($content !== false) {
                file_put_contents($localPath, $content);
            }
        }
    }
    $zip->close();
    echo "<p style='color: green;'>✅ PHPMailer extraído correctamente.</p>";
} else {
    die("<p style='color: red;'>❌ No se pudo extraer el archivo ZIP.</p>");
}

// Eliminar el archivo ZIP
unlink($zipFile);

// Crear archivo de autoload simple
$autoloadContent = '<?php
// Autoload simple para PHPMailer
spl_autoload_register(function ($class) {
    $prefix = "PHPMailer\\\\PHPMailer\\\\";
    $base_dir = __DIR__ . "/vendor/PHPMailer/PHPMailer/";
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace("\\\\", "/", $relative_class) . ".php";
    
    if (file_exists($file)) {
        require $file;
    }
});
?>';

file_put_contents(__DIR__ . '/vendor/autoload.php', $autoloadContent);

echo "<p style='color: green;'>✅ Autoload creado correctamente.</p>";

// Verificar instalación
require_once __DIR__ . '/vendor/autoload.php';

if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    echo "<p style='color: green; font-size: 18px; font-weight: bold;'>🎉 ¡PHPMailer instalado correctamente!</p>";
    echo "<p>Ahora puedes probar el envío de emails.</p>";
    echo "<p><a href='test_smtp.php' style='background: #39ff14; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;'>🧪 Probar Envío de Emails</a></p>";
} else {
    echo "<p style='color: red;'>❌ Error: PHPMailer no se instaló correctamente.</p>";
}
?>
