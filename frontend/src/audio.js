/**
 * AUDIO CENTRALIZADO PARA LUMETRIX
 * 
 * Solución completa para pausar audio al minimizar la app
 * Basado en la receta del usuario para atacar por dos frentes: JS y nativo
 */

// Audio de fondo centralizado
export const bg = new Audio('audio/audiofondo.mp3');
bg.loop = true;
bg.preload = 'auto';

// Audio de efectos de sonido
export const sfx = {
  jugar: new Audio('audio/jugar.mp3'),
  // Agregar más efectos aquí si es necesario
};

// Configurar efectos de sonido
Object.values(sfx).forEach(audio => {
  audio.preload = 'auto';
});

// Funciones de control del audio de fondo
export function startBg() {
  // Llamar tras gesto del usuario
  bg.play().catch(() => { 
    console.log('🔇 [AUDIO] Error autoplay silenciado'); 
  });
}

export function stopBg() { 
  try { 
    bg.pause(); 
    bg.currentTime = 0; 
    console.log('🔇 [AUDIO] Audio de fondo detenido');
  } catch(e) {
    console.error('🔇 [AUDIO] Error deteniendo audio:', e);
  }
}

export function pauseBg() { 
  try { 
    bg.pause(); 
    console.log('🔇 [AUDIO] Audio de fondo pausado, paused=', bg.paused, 'time=', bg.currentTime);
  } catch(e) {
    console.error('🔇 [AUDIO] Error pausando audio:', e);
  }
}

export function resumeBg() { 
  try { 
    if (bg.paused) {
      bg.play().catch(err => console.error('🔇 [AUDIO] Error resuming audio:', err));
      console.log('🔊 [AUDIO] Audio de fondo reanudado');
    }
  } catch(e) {
    console.error('🔇 [AUDIO] Error reanudando audio:', e);
  }
}

// Pausar todos los audios de efectos de sonido
export function pauseAllSfx() {
  Object.values(sfx).forEach(audio => {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch(e) {
      console.error('🔇 [AUDIO] Error pausando SFX:', e);
    }
  });
}

// Por si hay más audios sueltos en el DOM
export function pauseAllTagAudios() {
  document.querySelectorAll('audio').forEach(a => { 
    try { 
      a.pause(); 
      console.log('🔇 [AUDIO] Audio DOM pausado:', a.src || 'sin src');
    } catch(e) {
      console.error('🔇 [AUDIO] Error pausando audio DOM:', e);
    }
  });
}

// Función principal para pausar TODO el audio
export function pauseAllAudio() {
  console.log('🔇 [AUDIO] PAUSANDO TODO EL AUDIO...');
  pauseBg();
  pauseAllSfx();
  pauseAllTagAudios();
  
  // Pausar AudioContext si existe
  if (window.audioContext && window.audioContext.state === 'running') {
    try {
      window.audioContext.suspend();
      console.log('🔇 [AUDIO] AudioContext suspendido');
    } catch(e) {
      console.error('🔇 [AUDIO] Error suspendiendo AudioContext:', e);
    }
  }
}

// Función para reanudar TODO el audio
export function resumeAllAudio() {
  console.log('🔊 [AUDIO] REANUDANDO TODO EL AUDIO...');
  resumeBg();
  
  // Reanudar AudioContext si existe
  if (window.audioContext && window.audioContext.state === 'suspended') {
    try {
      window.audioContext.resume();
      console.log('🔊 [AUDIO] AudioContext reanudado');
    } catch(e) {
      console.error('🔊 [AUDIO] Error reanudando AudioContext:', e);
    }
  }
}

// Exponer funciones globales para llamar desde nativo
window.__pauseAllAudio = pauseAllAudio;
window.__resumeAllAudio = resumeAllAudio;
window.__pauseBg = pauseBg;
window.__resumeBg = resumeBg;

console.log('🎵 [AUDIO] Módulo de audio centralizado cargado');


