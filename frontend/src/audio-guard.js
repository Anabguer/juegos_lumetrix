/**
 * AUDIO GUARD - Kill Switch para Audio
 * 
 * Solución definitiva para pausar audio al minimizar la app
 * Basado en la receta del usuario para atacar por WebView + JS
 */

(function () {
  console.log('🛡️ [AUDIO-GUARD] Inicializando kill-switch de audio...');
  
  const bg = window.__bgAudio || new Audio('audio/audiofondo.mp3');
  bg.loop = true;
  window.__bgAudio = bg;

  window.__pauseAllAudio = () => {
    try { 
      document.querySelectorAll('audio').forEach(a => { 
        a.pause(); 
        a.currentTime = 0; 
        console.log('🔇 [AUDIO-GUARD] Audio DOM pausado:', a.src || 'sin src');
      }); 
    } catch(e){
      console.error('🔇 [AUDIO-GUARD] Error pausando audio DOM:', e);
    }
    
    try { 
      if (window.Howler) {
        Howler.stop();
        console.log('🔇 [AUDIO-GUARD] Howler detenido');
      }
    } catch(e){
      console.error('🔇 [AUDIO-GUARD] Error deteniendo Howler:', e);
    }
    
    try { 
      if (window.audioCtx && window.audioCtx.state === 'running') {
        window.audioCtx.suspend();
        console.log('🔇 [AUDIO-GUARD] AudioContext suspendido');
      }
    } catch(e){
      console.error('🔇 [AUDIO-GUARD] Error suspendiendo AudioContext:', e);
    }
    
    try { 
      console.log('🔇 [AUDIO-GUARD] JS kill-switch ejecutado. bg.paused=', bg.paused, 't=', bg.currentTime); 
    } catch(e){
      console.error('🔇 [AUDIO-GUARD] Error en log final:', e);
    }
  };

  window.__suspendAudioContext = () => {
    try { 
      if (window.audioCtx && window.audioCtx.state === 'running') {
        window.audioCtx.suspend();
        console.log('🔇 [AUDIO-GUARD] AudioContext suspendido desde nativo');
      }
    } catch(e){
      console.error('🔇 [AUDIO-GUARD] Error suspendiendo AudioContext desde nativo:', e);
    }
  };

  console.log('✅ [AUDIO-GUARD] Kill-switch de audio configurado');
})();


