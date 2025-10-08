#!/usr/bin/env node
/**
 * Script para copiar bundle a carpeta de producción
 * 
 * Copia automáticamente el bundle generado desde dist/ 
 * hacia PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/js/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const TARGET_DIR = path.join(__dirname, '..', '..', 'PARA_HOSTALIA', 'sistema_apps_upload', 'lumetrix', 'js');

const FILES_TO_COPY = [
  'game.bundle.js',
  'game.bundle.js.map'
];

console.log('📦 Lumetrix - Deploy Copy\n');

// Verificar que existe el directorio dist
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ ERROR: No existe el directorio dist/');
  console.error('   Ejecuta primero: npm run build');
  process.exit(1);
}

// Verificar que existe el directorio destino
if (!fs.existsSync(TARGET_DIR)) {
  console.error('❌ ERROR: No existe el directorio de destino:');
  console.error(`   ${TARGET_DIR}`);
  console.error('');
  console.error('   Verifica la estructura de carpetas del proyecto.');
  process.exit(1);
}

console.log('📂 Origen:  dist/');
console.log(`📁 Destino: ${path.relative(process.cwd(), TARGET_DIR)}\n`);

let copiedCount = 0;
let errorCount = 0;

FILES_TO_COPY.forEach(file => {
  const sourcePath = path.join(DIST_DIR, file);
  const targetPath = path.join(TARGET_DIR, file);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️  Omitido: ${file} (no existe en dist/)`);
    return;
  }
  
  try {
    // Copiar archivo
    fs.copyFileSync(sourcePath, targetPath);
    
    // Verificar tamaño
    const stats = fs.statSync(targetPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`✅ Copiado: ${file} (${sizeKB} KB)`);
    copiedCount++;
  } catch (error) {
    console.error(`❌ Error copiando ${file}:`);
    console.error(`   ${error.message}`);
    errorCount++;
  }
});

console.log('');
console.log('========================================');

if (errorCount > 0) {
  console.log(`⚠️  Proceso completado con ${errorCount} error(es)`);
  console.log(`   Archivos copiados: ${copiedCount}/${FILES_TO_COPY.length}`);
  process.exit(1);
} else {
  console.log(`✨ Deploy Copy completado exitosamente`);
  console.log(`   Archivos copiados: ${copiedCount}/${FILES_TO_COPY.length}`);
  console.log('');
  console.log('🚀 Siguiente paso:');
  console.log('   Subir PARA_HOSTALIA/sistema_apps_upload/ a Hostalia por FTP');
}

console.log('========================================\n');

