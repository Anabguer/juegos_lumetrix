<?php
require_once __DIR__.'/_common.php';

// Verificar que es el administrador (básico)
$admin_key = $_GET['admin_key'] ?? '';
if ($admin_key !== 'lumetrix_admin_2024') {
    die('❌ Acceso denegado. Se requiere clave de administrador.');
}

$pdo = db();

// Procesar acciones
$action = $_GET['action'] ?? '';
$solicitud_id = $_GET['id'] ?? '';

if ($action === 'procesar' && $solicitud_id) {
    $notas = $_POST['notas'] ?? '';
    
    // Marcar como procesada
    $stmt = $pdo->prepare('UPDATE solicitudes_eliminacion SET estado = "procesada", fecha_procesamiento = NOW(), notas_admin = ? WHERE id = ?');
    $stmt->execute([$notas, $solicitud_id]);
    
    // Obtener datos del usuario para eliminación
    $stmt = $pdo->prepare('SELECT usuario_aplicacion_key, email, nombre, nick FROM solicitudes_eliminacion WHERE id = ?');
    $stmt->execute([$solicitud_id]);
    $solicitud = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($solicitud) {
        // Eliminar usuario de la tabla principal
        $stmt = $pdo->prepare('DELETE FROM usuarios_aplicaciones WHERE usuario_aplicacion_key = ? AND app_codigo = ?');
        $stmt->execute([$solicitud['usuario_aplicacion_key'], 'lumetrix']);
        
        // Eliminar progreso del juego
        $stmt = $pdo->prepare('DELETE FROM lumetrix_progreso WHERE usuario_aplicacion_key = ?');
        $stmt->execute([$solicitud['usuario_aplicacion_key']]);
        
        echo "✅ Usuario eliminado exitosamente: {$solicitud['email']}\n";
    }
}

if ($action === 'rechazar' && $solicitud_id) {
    $notas = $_POST['notas'] ?? '';
    
    // Marcar como rechazada
    $stmt = $pdo->prepare('UPDATE solicitudes_eliminacion SET estado = "rechazada", fecha_procesamiento = NOW(), notas_admin = ? WHERE id = ?');
    $stmt->execute([$notas, $solicitud_id]);
    
    echo "✅ Solicitud rechazada.\n";
}

// Obtener todas las solicitudes
$stmt = $pdo->query('SELECT * FROM solicitudes_eliminacion ORDER BY fecha_solicitud DESC');
$solicitudes = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin - Solicitudes de Eliminación - LUMETRIX</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 2px solid #ff4466; padding-bottom: 10px; }
        .solicitud { border: 1px solid #ddd; margin: 15px 0; padding: 15px; border-radius: 8px; background: #fafafa; }
        .solicitud.pendiente { border-left: 5px solid #ffa500; }
        .solicitud.procesada { border-left: 5px solid #28a745; }
        .solicitud.rechazada { border-left: 5px solid #dc3545; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .estado { padding: 4px 8px; border-radius: 4px; color: white; font-size: 12px; font-weight: bold; }
        .estado.pendiente { background: #ffa500; }
        .estado.procesada { background: #28a745; }
        .estado.rechazada { background: #dc3545; }
        .info { margin: 5px 0; }
        .razon { background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; border-left: 3px solid #007bff; }
        .actions { margin-top: 15px; }
        .btn { padding: 8px 16px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-success { background: #28a745; color: white; }
        .btn-danger { background: #dc3545; color: white; }
        .btn-info { background: #17a2b8; color: white; }
        .form-group { margin: 10px 0; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .stats { display: flex; gap: 20px; margin-bottom: 20px; }
        .stat { background: #e9ecef; padding: 15px; border-radius: 8px; text-align: center; }
        .stat h3 { margin: 0; color: #495057; }
        .stat p { margin: 5px 0 0 0; font-size: 24px; font-weight: bold; }
        .stat.pendientes p { color: #ffa500; }
        .stat.procesadas p { color: #28a745; }
        .stat.rechazadas p { color: #dc3545; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🗑️ Solicitudes de Eliminación - LUMETRIX</h1>
        
        <?php
        // Estadísticas
        $pendientes = count(array_filter($solicitudes, fn($s) => $s['estado'] === 'pendiente'));
        $procesadas = count(array_filter($solicitudes, fn($s) => $s['estado'] === 'procesada'));
        $rechazadas = count(array_filter($solicitudes, fn($s) => $s['estado'] === 'rechazada'));
        ?>
        
        <div class="stats">
            <div class="stat pendientes">
                <h3>Pendientes</h3>
                <p><?= $pendientes ?></p>
            </div>
            <div class="stat procesadas">
                <h3>Procesadas</h3>
                <p><?= $procesadas ?></p>
            </div>
            <div class="stat rechazadas">
                <h3>Rechazadas</h3>
                <p><?= $rechazadas ?></p>
            </div>
        </div>
        
        <?php if (empty($solicitudes)): ?>
            <p>No hay solicitudes de eliminación.</p>
        <?php else: ?>
            <?php foreach ($solicitudes as $solicitud): ?>
                <div class="solicitud <?= $solicitud['estado'] ?>">
                    <div class="header">
                        <h3><?= htmlspecialchars($solicitud['nombre']) ?> (<?= htmlspecialchars($solicitud['nick']) ?>)</h3>
                        <span class="estado <?= $solicitud['estado'] ?>"><?= strtoupper($solicitud['estado']) ?></span>
                    </div>
                    
                    <div class="info">
                        <strong>Email:</strong> <?= htmlspecialchars($solicitud['email']) ?><br>
                        <strong>Fecha solicitud:</strong> <?= $solicitud['fecha_solicitud'] ?><br>
                        <?php if ($solicitud['fecha_procesamiento']): ?>
                            <strong>Fecha procesamiento:</strong> <?= $solicitud['fecha_procesamiento'] ?><br>
                        <?php endif; ?>
                    </div>
                    
                    <div class="razon">
                        <strong>Razón:</strong><br>
                        <?= nl2br(htmlspecialchars($solicitud['razon'])) ?>
                    </div>
                    
                    <?php if ($solicitud['notas_admin']): ?>
                        <div class="razon" style="border-left-color: #28a745;">
                            <strong>Notas del administrador:</strong><br>
                            <?= nl2br(htmlspecialchars($solicitud['notas_admin'])) ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if ($solicitud['estado'] === 'pendiente'): ?>
                        <div class="actions">
                            <form method="post" action="?admin_key=<?= $admin_key ?>&action=procesar&id=<?= $solicitud['id'] ?>" style="display: inline;">
                                <div class="form-group">
                                    <label>Notas (opcional):</label>
                                    <textarea name="notas" rows="2" placeholder="Notas sobre la eliminación..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-success" onclick="return confirm('¿Confirmar eliminación de la cuenta?')">✅ Procesar y Eliminar</button>
                            </form>
                            
                            <form method="post" action="?admin_key=<?= $admin_key ?>&action=rechazar&id=<?= $solicitud['id'] ?>" style="display: inline;">
                                <div class="form-group">
                                    <label>Motivo del rechazo:</label>
                                    <textarea name="notas" rows="2" placeholder="Motivo del rechazo..." required></textarea>
                                </div>
                                <button type="submit" class="btn btn-danger" onclick="return confirm('¿Rechazar la solicitud?')">❌ Rechazar</button>
                            </form>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
            <p>Panel de administración - LUMETRIX</p>
            <p><a href="?admin_key=<?= $admin_key ?>" class="btn btn-info">🔄 Actualizar</a></p>
        </div>
    </div>
</body>
</html>
