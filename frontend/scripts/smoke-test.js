#!/usr/bin/env node
/**
 * Smoke Test para Lumetrix
 * 
 * Simula el entorno de Hostalia localmente y verifica:
 * - Que el bundle carga correctamente
 * - Que las rutas de assets son correctas
 * - Que no hay errores 404
 * - Que la estructura de carpetas es correcta
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
const ROOT_DIR = path.join(__dirname, '..', '..');

console.log('🧪 Lumetrix - Smoke Test (simulando Hostalia)\n');

// Mapa de tipos MIME
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.map': 'application/json',
};

let requestLog = [];

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT_DIR, 'PARA_HOSTALIA', 'sistema_apps_upload', req.url === '/' ? 'app_lumetrix.html' : req.url);
  
  // Log de request
  const logEntry = {
    url: req.url,
    path: filePath,
    exists: false,
    status: 404
  };
  
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      logEntry.status = 404;
      requestLog.push(logEntry);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    
    logEntry.exists = true;
    logEntry.status = 200;
    logEntry.size = stats.size;
    requestLog.push(logEntry);
    
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🌐 Servidor de prueba iniciado en http://localhost:${PORT}`);
  console.log('');
  console.log('📋 Simulando estructura de Hostalia:');
  console.log(`   Root: ${ROOT_DIR}/PARA_HOSTALIA/sistema_apps_upload/`);
  console.log('');
  console.log('🔍 Tests a ejecutar:');
  console.log('   1. Abrir http://localhost:8080/app_lumetrix.html');
  console.log('   2. Verificar que carga el bundle React');
  console.log('   3. Verificar que las imágenes cargan');
  console.log('   4. Verificar que no hay errores 404 en consola');
  console.log('');
  console.log('⏱️  Servidor activo - presiona Ctrl+C para detener y ver reporte');
  console.log('');
});

// Handler para Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n========================================');
  console.log('📊 REPORTE DE SMOKE TEST');
  console.log('========================================\n');
  
  const requests = requestLog.filter(r => !r.url.includes('favicon'));
  const successful = requests.filter(r => r.status === 200);
  const failed = requests.filter(r => r.status === 404);
  
  console.log(`Total requests: ${requests.length}`);
  console.log(`✅ Exitosos: ${successful.length}`);
  console.log(`❌ Fallidos: ${failed.length}`);
  console.log('');
  
  if (failed.length > 0) {
    console.log('⚠️  ARCHIVOS NO ENCONTRADOS (404):');
    failed.forEach(r => {
      console.log(`   ❌ ${r.url}`);
    });
    console.log('');
  }
  
  if (successful.length > 0) {
    console.log('✅ ARCHIVOS CARGADOS CORRECTAMENTE:');
    successful.forEach(r => {
      const sizeKB = r.size ? `(${(r.size / 1024).toFixed(2)} KB)` : '';
      console.log(`   ✓ ${r.url} ${sizeKB}`);
    });
    console.log('');
  }
  
  // Verificaciones específicas
  console.log('🔍 VERIFICACIONES ESPECÍFICAS:');
  
  const bundleLoaded = successful.some(r => r.url.includes('game.bundle.js'));
  console.log(`   ${bundleLoaded ? '✅' : '❌'} Bundle React cargado`);
  
  const htmlLoaded = successful.some(r => r.url.includes('.html'));
  console.log(`   ${htmlLoaded ? '✅' : '❌'} HTML principal cargado`);
  
  const imagesLoaded = successful.filter(r => r.url.includes('/img/')).length;
  console.log(`   ${imagesLoaded > 0 ? '✅' : '⚠️ '} Imágenes cargadas: ${imagesLoaded}`);
  
  const audioLoaded = successful.filter(r => r.url.includes('.mp3')).length;
  console.log(`   ${audioLoaded > 0 ? '✅' : '⚠️ '} Audio cargado: ${audioLoaded}`);
  
  console.log('');
  console.log('========================================');
  
  if (failed.length === 0) {
    console.log('✨ SMOKE TEST EXITOSO - Todo funcionó correctamente');
  } else {
    console.log('⚠️  SMOKE TEST CON ERRORES - Revisar archivos faltantes');
  }
  
  console.log('========================================\n');
  
  server.close();
  process.exit(failed.length === 0 ? 0 : 1);
});

