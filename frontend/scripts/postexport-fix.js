#!/usr/bin/env node
/**
 * Script de post-exportación para Lumetrix → Hostalia
 * 
 * Tareas:
 * - Verificar que el bundle se generó correctamente
 * - Generar manifiesto de archivos para deploy
 * - Validar tamaños de archivos
 * - Listar todos los assets generados
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const MANIFEST_FILE = path.join(DIST_DIR, 'deploy_manifest.txt');
const BUNDLE_FILE = path.join(DIST_DIR, 'game.bundle.js');
const MAP_FILE = path.join(DIST_DIR, 'game.bundle.js.map');

console.log('🔧 Lumetrix - Post-export para Hostalia\n');

// 1. Verificar que existe el bundle
if (!fs.existsSync(BUNDLE_FILE)) {
  console.error('❌ ERROR: No se encontró game.bundle.js');
  console.error('   Ejecuta: npm run build');
  process.exit(1);
}

console.log('✅ Bundle generado: game.bundle.js');

// 2. Verificar tamaño del bundle
const bundleStats = fs.statSync(BUNDLE_FILE);
const bundleSizeKB = (bundleStats.size / 1024).toFixed(2);
console.log(`📦 Tamaño bundle: ${bundleSizeKB} KB`);

if (bundleStats.size > 500 * 1024) {
  console.warn(`⚠️  ADVERTENCIA: Bundle muy grande (>${bundleSizeKB}KB)`);
  console.warn('   Considera code-splitting o lazy loading');
}

// 3. Verificar source map
if (fs.existsSync(MAP_FILE)) {
  const mapStats = fs.statSync(MAP_FILE);
  const mapSizeKB = (mapStats.size / 1024).toFixed(2);
  console.log(`🗺️  Source map: ${mapSizeKB} KB`);
} else {
  console.warn('⚠️  No se generó source map');
}

// 4. Generar manifiesto de archivos
console.log('\n📋 Generando manifiesto de deploy...');

const manifest = [];
manifest.push('========================================');
manifest.push('LUMETRIX - MANIFIESTO DE DESPLIEGUE');
manifest.push('========================================');
manifest.push('');
manifest.push(`Fecha: ${new Date().toISOString()}`);
manifest.push(`Build: Vite production`);
manifest.push('');
manifest.push('ARCHIVOS GENERADOS:');
manifest.push('');

function listFiles(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  const result = [];
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const relativePath = path.relative(DIST_DIR, filePath);
    
    if (stat.isDirectory()) {
      result.push(`${prefix}📁 ${file}/`);
      result.push(...listFiles(filePath, prefix + '  '));
    } else {
      const sizeKB = (stat.size / 1024).toFixed(2);
      result.push(`${prefix}📄 ${file} (${sizeKB} KB)`);
    }
  });
  
  return result;
}

const fileList = listFiles(DIST_DIR);
manifest.push(...fileList);

manifest.push('');
manifest.push('========================================');
manifest.push('INSTRUCCIONES DE DESPLIEGUE:');
manifest.push('========================================');
manifest.push('');
manifest.push('1. Copiar archivos a producción:');
manifest.push('   cp dist/game.bundle.js ../PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/js/');
manifest.push('   cp dist/game.bundle.js.map ../PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/js/');
manifest.push('');
manifest.push('2. Subir por FTP a Hostalia:');
manifest.push('   Upload: PARA_HOSTALIA/sistema_apps_upload/* → /sistema_apps_upload/');
manifest.push('');
manifest.push('3. Verificar en navegador:');
manifest.push('   https://tu-dominio.com/app_lumetrix.html');
manifest.push('');
manifest.push('========================================');
manifest.push('RUTAS EN PRODUCCIÓN:');
manifest.push('========================================');
manifest.push('');
manifest.push('HTML principal: /sistema_apps_upload/app_lumetrix.html');
manifest.push('Bundle React:   /sistema_apps_upload/sistema_apps_api/lumetrix/js/game.bundle.js');
manifest.push('API Backend:    /sistema_apps_upload/sistema_apps_api/lumetrix/*.php');
manifest.push('Assets:         /sistema_apps_upload/sistema_apps_api/lumetrix/img/');
manifest.push('                /sistema_apps_upload/sistema_apps_api/lumetrix/*.mp3');
manifest.push('');

fs.writeFileSync(MANIFEST_FILE, manifest.join('\n'), 'utf-8');

console.log(`✅ Manifiesto generado: ${path.relative(process.cwd(), MANIFEST_FILE)}`);

// 5. Resumen final
console.log('\n========================================');
console.log('✨ BUILD COMPLETADO PARA HOSTALIA');
console.log('========================================');
console.log('');
console.log('📦 Archivos listos en: dist/');
console.log('📋 Ver manifiesto: dist/deploy_manifest.txt');
console.log('');
console.log('🚀 Siguiente paso:');
console.log('   cp dist/game.bundle.js* ../PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/js/');
console.log('');

