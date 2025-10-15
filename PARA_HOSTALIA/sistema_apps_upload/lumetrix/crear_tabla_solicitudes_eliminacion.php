<?php
require_once __DIR__.'/_common.php';

try {
    $pdo = db();
    
    // Leer el archivo SQL
    $sql = file_get_contents(__DIR__.'/crear_tabla_solicitudes_eliminacion.sql');
    
    // Ejecutar la creación de la tabla
    $pdo->exec($sql);
    
    echo "✅ Tabla 'solicitudes_eliminacion' creada exitosamente.\n";
    
    // Verificar que la tabla existe
    $stmt = $pdo->query("SHOW TABLES LIKE 'solicitudes_eliminacion'");
    if ($stmt->rowCount() > 0) {
        echo "✅ Verificación: La tabla existe en la base de datos.\n";
        
        // Mostrar estructura de la tabla
        $stmt = $pdo->query("DESCRIBE solicitudes_eliminacion");
        echo "\n📋 Estructura de la tabla:\n";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "- {$row['Field']}: {$row['Type']} " . ($row['Null'] === 'NO' ? 'NOT NULL' : 'NULL') . "\n";
        }
    } else {
        echo "❌ Error: La tabla no se creó correctamente.\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
