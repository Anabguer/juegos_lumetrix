// Versión offline compatible con APK
(function() {
  'use strict';
  
  // Esperar a que se cargue el DOM
  document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('gameRoot');
    
    if (root) {
      // Verificar si game.bundle.js se cargó correctamente
      if (typeof window.LumetrixGame !== 'undefined') {
        window.LumetrixGame.mount(root);
      } else {
        // Fallback: crear un mensaje de error
        root.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: #e0e0e0;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          ">
            <h1 style="color: #00ffff; margin-bottom: 20px;">🎮 Lumetrix</h1>
            <p style="margin-bottom: 10px;">Cargando juego...</p>
            <div style="
              width: 40px;
              height: 40px;
              border: 3px solid #00ffff;
              border-top: 3px solid transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 20px auto;
            "></div>
            <p style="font-size: 14px; color: #888;">Si el juego no carga, verifica tu conexión a internet</p>
          </div>
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        `;
      }
    }
  });
})();
