import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {},
    'global': 'window'
  },
  build: {
    lib: {
      entry: 'src/entry.jsx',
      name: 'LumetrixGame',
      fileName: () => 'game.bundle.js',
      formats: ['iife']
    },
    outDir: 'dist',
    sourcemap: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        extend: true,
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
