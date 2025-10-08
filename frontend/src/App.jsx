import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

/**
 * LUMETRIX – React (build-safe, JS only)
 *
 * Esta versión soluciona el error de build por variables no definidas
 * y mantiene todo lo que tenías funcional:
 *  - Sonido robusto (no rompe si no hay AudioContext) y melodía de victoria corta con 300ms de retraso
 *  - Colores por nivel (las fichas aciertan pintando al color del borde)
 *  - Al empezar un nivel NUNCA hay fichas del color del borde
 *  - Pista inicial con retardo
 *  - Tiempo acumulado por intento (derrota o victoria), con reset en Opciones
 *  - Selector de nivel (debug) en Opciones
 *  - Overlays: ganar ✨ / perder 💔 con margen correcto
 */

// ---------------- Utilidades de nivel ----------------
const ACCENTS = [
  "#39ff14", // lima
  "#ff2fbf", // fucsia
  "#00e5ff", // cian
  "#ff6b6b", // coral
  "#ffd93d", // amarillo
  "#7c3aed", // violeta
];
const ACCENT_HUE = { "#39ff14":110, "#ff2fbf":320, "#00e5ff":190, "#ff6b6b":0, "#ffd93d":55, "#7c3aed":265 };
function colorForLevel(level){ return ACCENTS[(level-1) % ACCENTS.length]; }
// Función para obtener configuración de un nivel específico
function getLevelConfig(level) {
  const world = Math.floor((level-1)/10) + 1;
  const levelInWorld = ((level-1)%10) + 1;
  const worldConfig = LEVEL_CONFIG.worlds[world-1];
  
  if (!worldConfig) {
    // Fallback para niveles fuera de rango
    return {
      world: world,
      levelInWorld: levelInWorld,
      tiles: Math.min(4 + Math.floor(level/3), 10),
      time: Math.max(35 - Math.floor(level/2), 12),
      mechanics: ["touch"]
    };
  }
  
  return {
    world: world,
    levelInWorld: levelInWorld,
    tiles: worldConfig.tiles[levelInWorld-1] || worldConfig.tiles[0],
    time: worldConfig.time[levelInWorld-1] || worldConfig.time[0],
    mechanics: worldConfig.mechanics[levelInWorld-1] || worldConfig.mechanics[0]
  };
}

function tilesFor(level){
  return getLevelConfig(level).tiles;
}

function timeFor(level){
  return getLevelConfig(level).time;
}

function getWorldMechanics(world) {
  const worldConfig = LEVEL_CONFIG.worlds[world-1];
  if (!worldConfig) return { name: 'Desconocido', description: 'Mundo no definido' };
  
  const mechanics = worldConfig.mechanics;
  if (mechanics.includes('combo') || (mechanics.includes('touch') && mechanics.includes('drag') && mechanics.includes('double'))) {
    return { name: 'Combinado', description: 'Todas las mecánicas' };
  } else if (mechanics.includes('double')) {
    return { name: 'Doble toque', description: 'Fichas con doble toque' };
  } else if (mechanics.includes('drag')) {
    return { name: 'Arrastre', description: 'Arrastra las fichas correctas' };
  } else {
    return { name: 'Introducción', description: 'Toques simples' };
  }
}

// ---------------- Catálogo de melodías (hasta 15 notas) ----------------
const MELODIES = [
  // Escalas y motivos base
  [262,294,330,349,392,440,494,523,494,440,392,349,330,294,262],
  [523,494,440,392,349,330,294,262],
  // Populares (fragmentos cortos 5–15 notas)
  [262,262,262,294,330,330,330,294,262,262,294,330,262], // La cucaracha (inicio)
  [262,262,392,392,440,440,392,349,349,330,330,294,294,262], // Twinkle
  [294,294,330,294,262,220,196,220,262], // Seven Nation Army
  [392,440,494,440,392,392,440,494,440,392,330,349,392], // Bella Ciao
  [392,392,440,392,349,330,330,349,392,349,330], // Shape of You
  [330,349,392,330,349,392,349,330,294,262], // Despacito
  [294,294,440,440,349,349,262,262], // Smells Like Teen Spirit
  [392,392,392,330,392,392,392,330,294], // We Will Rock You
  // Añadidas
  [659,494,523,587,523,494,440,440,523,659,587,523,494], // Tetris A
  [659,784,740,659,988,932,880,740,932,988], // Hedwig's Theme (inicio)
  [392,392,392,311,466,392,311,466,392], // Imperial March
  [330,330,349,392,392,349,330,294,262,262,294,330,330,294,294], // Ode to Joy
  [392,392,440,392,523,494], // Happy Birthday (arranque)
  [659,659,659,523,659,784,392,523], // Super Mario (arranque)
  [440,587,659,587,659,587,523,659,587,440], // Zelda's Lullaby
  [330,392,440,330,392,440,494,523,494,440,392,349], // Pirates (motivo)
  [392,392,392,392,392,392,392,494,330,349,392], // Jingle Bells
  [392,440,392,349,294,294,349,392,440,392,349,330], // Titanic (motivo)
];

// ---------------- Configuración de Niveles ----------------
const LEVEL_CONFIG = {
  worlds: [
    {
      id: 1,
      mechanics: [["touch"],["touch"],["touch"],["touch"],["touch"],["touch"],["touch"],["touch"],["touch"],["touch"]],
      tiles: [4,4,5,5,6,6,7,7,8,8],
      time: [35,32,30,28,26,24,22,20,18,16],
      notes: "Mundo 1 — introducción y aprendizaje."
    },
    {
      id: 2,
      mechanics: [["drag"],["drag"],["drag"],["drag"],["drag"],["drag"],["drag"],["drag"],["drag"],["drag"]],
      tiles: [4,4,5,5,6,6,7,8,8,9],
      time: [32,30,28,26,24,22,20,18,17,16],
      notes: "Mundo 2 — introduce y domina arrastre."
    },
    {
      id: 3,
      mechanics: [["drag"],["drag"],["drag"],["drag"],["drag"],["drag"],["drag"],["drag"],["drag"],["drag"]],
      tiles: [5,5,6,6,7,7,8,8,9,9],
      time: [30,28,26,24,22,20,20,20,20,20],
      notes: "Mundo 3 — más fichas y menos tiempo."
    },
    {
      id: 4,
      mechanics: [["double"],["double"],["double"],["drag","double"],["drag"],["double"],["drag","double"],["drag","double"],["double"],["drag","double"]],
      tiles: [5,5,6,6,7,7,8,8,9,9],
      time: [28,26,24,22,20,20,20,19,18,20],
      notes: "Mundo 4 — introduce doble toque y combina mecánicas."
    },
    {
      id: 5,
      mechanics: [["touch","drag","double"],["touch","drag","double"],["touch","drag","double"],["touch","drag","double"],["touch","drag","double"],["touch","drag","double"],["touch","drag","double"],["touch","drag","double"],["touch","drag","double"],["touch","drag","double"]],
      tiles: [6,7,8,8,9,9,9,9,9,9],
      time: [24,22,20,20,20,20,19,18,18,20],
      notes: "Mundo 5 — dominio total de todas las mecánicas."
    }
  ]
};

// ---------------- Sonido (WebAudio) ----------------
function useSFX(enabled, volume = 0.15){
  const ctxRef = useRef(null);
  const bgAudioRef = useRef(null);
  const startAudioRef = useRef(null);
  const safeWindow = typeof window !== 'undefined' ? window : {};
  const getCtx = ()=>{
    if(!enabled) return null;
    try{
      if(!ctxRef.current){
        const C = safeWindow.AudioContext || safeWindow.webkitAudioContext;
        if(!C) return null; // sin soporte → silencio
        ctxRef.current = new C();
      }
      return ctxRef.current;
    }catch{ return null; }
  };
  const tone = (f=440,d=0.12,type='sine',gain=0.07)=>{
    const ctx=getCtx(); if(!ctx) return; try{
      const o=ctx.createOscillator(); const g=ctx.createGain();
      o.type=type; o.frequency.value=f; g.gain.value=gain;
      o.connect(g); g.connect(ctx.destination);
      if(ctx.state === 'suspended') { ctx.resume().catch(()=>{}); }
      const t0=ctx.currentTime; o.start(t0); o.stop(t0+d);
    }catch{}
  };
  const playMelody = (arr,dur=0.12,gap=0.04)=>{
    const ctx=getCtx(); if(!ctx||!arr||!arr.length) return; try{
      if(ctx.state === 'suspended') { ctx.resume().catch(()=>{}); }
      arr.forEach((f,i)=>{
        const o=ctx.createOscillator(); const g=ctx.createGain();
        o.type='triangle'; o.frequency.value=f; g.gain.value=0.08;
        o.connect(g); g.connect(ctx.destination);
        const t=ctx.currentTime + i*(dur+gap);
        o.start(t); o.stop(t+dur);
      });
    }catch{}
  };
  // Audio de fondo
  const initBgAudio = () => {
    if (bgAudioRef.current) return;
    try {
      const audio = new Audio('lumetrix/audio/audiofondo.mp3');
      audio.loop = true;
      audio.volume = volume; // Volumen dinámico
      bgAudioRef.current = audio;
    } catch (e) {
      console.log('Error cargando audio de fondo:', e);
    }
  };

  const startBgMusic = (musicEnabled = true) => {
    if (!musicEnabled || !bgAudioRef.current) return;
    try {
      bgAudioRef.current.play().catch(e => {
        console.log('Error reproduciendo audio de fondo:', e);
      });
    } catch (e) {}
  };

  const stopBgMusic = () => {
    if (!bgAudioRef.current) return;
    try {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0;
    } catch (e) {}
  };

  const updateBgVolume = (newVolume) => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = newVolume;
    }
  };

  // Audio de inicio (jugar.mp3)
  const initStartAudio = () => {
    if (startAudioRef.current) return;
    try {
      const audio = new Audio('lumetrix/audio/jugar.mp3');
      audio.volume = 0.7; // Volumen medio para el sonido de inicio
      startAudioRef.current = audio;
    } catch (e) {
      console.log('Error cargando audio de inicio:', e);
    }
  };

  const playStartSound = () => {
    if (!enabled || !startAudioRef.current) return;
    try {
      startAudioRef.current.currentTime = 0;
      startAudioRef.current.play().catch(e => {
        console.log('Error reproduciendo audio de inicio:', e);
      });
    } catch (e) {}
  };

  return {
    start: ()=>{ 
      // Usar archivo jugar.mp3 en lugar de acorde sintético
      playStartSound();
    },
    ok:    (f)=>tone(f||880,0.1,'triangle',0.07),
    fail:  ()=>tone(260,0.12,'sine',0.045), // suave "meck"
    blink: (f)=>tone(f||720,0.12,'sine',0.08),
    // Victoria: siempre trozo corto (5–6 notas) + retraso 300ms
    winMelody: (arr)=>{ const short=(arr&&arr.length?arr.slice(0,6):[659.25,880.0,1046.5]); setTimeout(()=>playMelody(short,0.12,0.04), 300); },
    // Audio de fondo
    initBg: initBgAudio,
    startBg: startBgMusic,
    stopBg: stopBgMusic,
    updateVolume: updateBgVolume,
    // Audio de inicio
    initStart: initStartAudio,
  };
}
function vibrate(ms, enabled){ try{ if(enabled && navigator.vibrate) navigator.vibrate(ms); }catch{} }

// ---------------- CSS (inyección) ----------------
function useLumetrixStyles(){
  useEffect(()=>{
    const id='lumetrix-css'; if(document.getElementById(id)) return;
    const tag=document.createElement('style'); tag.id=id; tag.textContent=`
      @import url('https://fonts.googleapis.com/css2?family=Tektur:wght@400;500;600;700;800;900&display=swap');
      :root{ --bg:#000; --fg:#e5e7eb; --muted:#9ca3af; --neon1:#ff2fbf; --neon2:#00e5ff; --accent:#39ff14; }
      *{box-sizing:border-box}
      html,body,#root{height:100%}
      body{margin:0;background:#000;color:#fff;font-family:'Tektur', sans-serif}
      .shell{min-height:100svh;display:flex;align-items:stretch;justify-content:center}
      .device{width:min(390px,100vw);height:100svh;background:#000;position:relative;overflow:hidden}
      @media (min-width:768px){.shell{padding:24px}.device{height:844px;border-radius:24px;border:1px solid #ffffff1a;box-shadow:0 0 0 8px #ffffff08}}
      .screen{position:absolute;inset:0}
      /* Intro */
      .introWrap{position:relative;height:100%;display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box}
      .introBg{position:absolute;inset:12px}
      .introBg i{position:absolute;border-radius:10px;opacity:.6;filter:blur(.5px)}
      .panel{position:relative;z-index:2;width:100%;max-width:300px;border-radius:16px;padding:40px 24px;background:#11111135;border:3px solid #00e5ff;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 0 22px rgba(0,0,0,.55);margin:0 20px;display:flex;flex-direction:column;justify-content:flex-start}
      .logo{font-weight:900;text-align:center;margin:0 0 8px;letter-spacing:.18em;line-height:1;display:flex;justify-content:center;align-items:center}
      .logo span{display:inline-block;background:linear-gradient(90deg,var(--neon1),var(--neon2));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 8px #ff2fbf59,0 0 12px #00e5ff47}
      .actions{display:flex;gap:8px;justify-content:center}
      .btn{appearance:none;border-radius:12px;border:1px solid #ffffff44;background:transparent;color:#fff;font-weight:700;padding:12px 18px;cursor:pointer;font-size:16px}
      .btn-start{appearance:none;border-radius:16px;border:2px solid #39ff14;background:rgba(57,255,20,0.1);color:#39ff14;font-weight:900;padding:20px 32px;cursor:pointer;font-size:20px;box-shadow:0 0 20px rgba(57,255,20,0.3);transition:all 0.3s ease}
      .btn-start:hover{background:rgba(57,255,20,0.2);box-shadow:0 0 30px rgba(57,255,20,0.5);transform:scale(1.05)}
      .btn1{border-color:#f0abfc99;color:#f0abfc}.btn1:hover{background:#ff2fbf22}
      .btn2{border-color:#7dd3fc99;color:#7dd3fc}.btn2:hover{background:#00e5ff22}
      .copy{position:absolute;left:0;right:0;bottom:24px;text-align:center;color:#ffffffb3;font-size:10px;z-index:3}
      /* HUD / Board */
      .topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 10px}
      .brand{font-size:18px;font-weight:800;background:linear-gradient(90deg,var(--neon1),var(--neon2));-webkit-background-clip:text;background-clip:text;color:transparent}
      .icons{display:flex;gap:12px}
      .icon{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;color:#fff;border:none;background:transparent;cursor:pointer}
      .hud{display:flex;align-items:center;gap:8px;padding:0 10px}
      .meta{display:flex;align-items:center;gap:6px;margin-left:4px;font-size:11px;opacity:.9}
      .chip{border:1px solid #ffffff33;border-radius:999px;padding:4px 12px;background:#ffffff10;box-shadow:0 0 4px #ffffff16}
      .meta .chip b{font-weight:700;margin-right:4px}
      .timebar{flex:1;height:12px;border-radius:999px;border:1px solid var(--accent);box-shadow:0 0 6px #ffffff22, 0 0 12px var(--accent)}
      .timefill{display:block;height:8px;margin:2px;border-radius:999px;background:linear-gradient(90deg,var(--accent),#fff);box-shadow:0 0 8px var(--accent);width:100%}
      .board{position:relative;margin:10px 10px 5px 10px;border-radius:16px;border:2px solid var(--accent);box-shadow:0 0 12px var(--accent);height:calc(100% - 105px);overflow:hidden;animation:pulseGlow 2s ease-in-out infinite}
      @keyframes pulseGlow{0%,100%{box-shadow:0 0 12px var(--accent)}50%{box-shadow:0 0 14px var(--accent),0 0 18px var(--accent)}}
      .tile{position:absolute;border-radius:12px;border:1px solid #ffffff2f;z-index:1;touch-action:manipulation;transition:filter .12s ease, transform .06s ease;cursor:pointer}
      .tile:active{transform:scale(.985)}
      .tile.dragging{transform:scale(1.1);z-index:100;box-shadow:0 0 20px rgba(255,255,255,0.5);cursor:grabbing}
      .drop-zone{border:3px solid #ffffff66;border-radius:12px;background:transparent;pointer-events:none;z-index:100}
      .drop-zone.drag-over{border-style:solid;transform:scale(1.1);box-shadow:0 0 25px currentColor}
      .lit{box-shadow:0 0 10px var(--accent), 0 0 18px var(--accent); filter:brightness(1.18)}
      .overlay{position:absolute;inset:0;display:grid;place-items:center;z-index:2}
      .modal{position:fixed;inset:0;background:#000c;display:flex;align-items:center;justify-content:center;z-index:50;padding:20px 0}
      .card{position:relative;width:280px;max-width:85vw;background:#000;border:1px solid #ffffff1f;border-radius:14px;box-shadow:0 0 12px #ff2fbf55;color:#fff;padding:20px;min-height:400px}
      .card h3{margin-top:0;margin-bottom:16px;padding-top:4px}
      .card-compact{position:relative;width:240px;max-width:80vw;background:#000;border:1px solid #ffffff1f;border-radius:14px;box-shadow:0 0 12px #ff2fbf55;color:#fff;padding:20px;min-height:180px;max-height:220px}
      .closer{position:absolute;right:-10px;top:-10px;width:32px;height:32px;border-radius:999px;background:#000b;border:1px solid #ffffff33;color:#fff;display:grid;place-items:center;cursor:pointer}
      .list{display:flex;flex-direction:column;gap:8px}
      .bokeh{pointer-events:none}
      .bokeh i{position:absolute;border-radius:999px;filter:blur(24px)}
      .b1{left:-10%;top:10%;width:220px;height:220px;background:var(--neon1);opacity:.16;animation:blob1 14s linear infinite}
      .b2{left:60%;top:-8%;width:280px;height:280px;background:var(--neon2);opacity:.14;animation:blob2 18s linear infinite}
      .b3{left:20%;bottom:-12%;width:260px;height:260px;background:#7c3aed;opacity:.12;animation:blob3 20s linear infinite}
      @keyframes blob1{0%{transform:translate(0,0)}50%{transform:translate(40px,10px)}100%{transform:translate(0,0)} }
      @keyframes blob2{0%{transform:translate(0,0)}50%{transform:translate(-30px,30px)}100%{transform:translate(0,0)} }
      @keyframes blob3{0%{transform:translate(0,0)}50%{transform:translate(20px,-30px)}100%{transform:translate(0,0)} }
      /* Líneas de neón en bordes */
      .neon-borders{position:absolute;inset:12px;pointer-events:none;z-index:5;border-radius:16px;overflow:hidden}
      .neon-line{position:absolute;box-shadow:0 0 10px currentColor, 0 0 20px currentColor;animation:neonFlow 4s linear infinite}
      .neon-line.top{top:0;left:0;right:0;height:3px;background:#ff2fbf;color:#ff2fbf;animation-delay:0s;border-radius:0 0 3px 3px}
      .neon-line.right{right:0;top:0;bottom:0;width:3px;background:#00e5ff;color:#00e5ff;animation-delay:1s;border-radius:3px 0 0 3px}
      .neon-line.bottom{bottom:0;left:0;right:0;height:3px;background:#39ff14;color:#39ff14;animation-delay:2s;border-radius:3px 3px 0 0}
      .neon-line.left{left:0;top:0;bottom:0;width:3px;background:#ff6b6b;color:#ff6b6b;animation-delay:3s;border-radius:0 3px 3px 0}
      @keyframes neonFlow{0%{opacity:0;transform:scaleX(0)}25%{opacity:1;transform:scaleX(1)}75%{opacity:1;transform:scaleX(1)}100%{opacity:0;transform:scaleX(0)} }
      @keyframes logoGlow{0%{filter:drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 60px #ff00ff)}50%{filter:drop-shadow(0 0 30px #ff00ff) drop-shadow(0 0 50px #39ff14) drop-shadow(0 0 80px #00ffff)}100%{filter:drop-shadow(0 0 25px #00ffff) drop-shadow(0 0 45px #ff00ff) drop-shadow(0 0 70px #39ff14)} }
      
      /* ---- Drag Nudge / Hints ---- */
      @keyframes nudgeShake {
        0% { transform: translate(0,0) rotate(0deg) }
        20% { transform: translate(2px, -1px) rotate(-1.2deg) }
        40% { transform: translate(-2px, 1px) rotate(1.2deg) }
        60% { transform: translate(2px, 0px) rotate(-0.8deg) }
        80% { transform: translate(-1px, 1px) rotate(0.8deg) }
        100% { transform: translate(0,0) rotate(0deg) }
      }
      .tile.nudge-shake {
        animation: nudgeShake .45s ease both;
        filter: brightness(1.12);
      }

      @keyframes pulseRing {
        0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.35), 0 0 18px currentColor; }
        70%  { box-shadow: 0 0 0 10px rgba(255,255,255,0),   0 0 18px currentColor; }
        100% { box-shadow: 0 0 0 0 rgba(255,255,255,0),      0 0 18px currentColor; }
      }
      .drop-zone.pulse {
        animation: pulseRing .9s ease-out 1;
      }

      .drag-hint {
        position: absolute;
        pointer-events: none;
        z-index: 1000;
        padding: 6px 10px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 800;
        color: #000;
        background: #00fff0;
        box-shadow: 0 0 12px #00fff077;
        transform: translate(-50%, -140%);
        opacity: 0;
        transition: opacity .12s ease, transform .25s ease;
      }
      .drag-hint.show {
        opacity: 1;
        transform: translate(-50%, -160%);
      }
      .drag-hint::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -6px;
        width: 0; height: 0;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #00fff0;
      }
    `;
    document.head.appendChild(tag);
    return ()=>{ try{ document.head.removeChild(tag); }catch{} };
  },[]);
}

// ---------------- Intro ----------------
function Intro({ onPlay, onAuth }){
  const bgRef = useRef(null); const logoRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  const handleLogout = async () => {
    try {
      await window.LUM_API.api('auth.php?action=logout');
      setIsLoggedIn(false);
      setUserInfo(null);
      window.location.reload();
    } catch (e) {
      console.log('Error al cerrar sesión');
    }
  };
  
  useEffect(()=>{ 
    const bg=bgRef.current; if(!bg) return; 
    const spawn=()=>{ 
      const i=document.createElement('i'); 
      // Más variedad de tamaños
      const w=20+Math.random()*25, h=40+Math.random()*60; 
      
      // Distribución dentro del área con margen (12px desde los bordes)
      // El área de figuras es 100% - 24px (12px de margen en cada lado)
      let x, y;
      const centerAvoid = Math.random() < 0.7; // 70% evitan el centro
      if (centerAvoid) {
        // Zonas periféricas: bordes y esquinas (dentro del área con margen)
        const zones = [
          {x: [0, 15], y: [0, 100]}, // Lado izquierdo
          {x: [85, 100], y: [0, 100]}, // Lado derecho  
          {x: [0, 100], y: [0, 15]}, // Parte superior
          {x: [0, 100], y: [85, 100]}, // Parte inferior
        ];
        const zone = zones[Math.floor(Math.random() * zones.length)];
        x = zone.x[0] + Math.random() * (zone.x[1] - zone.x[0]);
        y = zone.y[0] + Math.random() * (zone.y[1] - zone.y[0]);
      } else {
        // 30% pueden aparecer en el centro (pero dentro del área con margen)
        x = Math.random()*100;
        y = Math.random()*100;
      }
      
      i.style.left=x+'%'; 
      i.style.top=y+'%'; 
      i.style.width=w+'px'; 
      i.style.height=h+'px'; 
      
      // Colores más vibrantes y variados
      const hues = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315]; // Más colores neón
      const hue = hues[Math.floor(Math.random() * hues.length)];
      i.style.background=`hsl(${hue} 95% 65% / .9)`; 
      bg.appendChild(i); 
      setTimeout(()=>i.remove(), 3000); // Más tiempo visible
    }; 
    const t=setInterval(spawn, 80); // Más frecuente (antes 120ms)
    return ()=>clearInterval(t); 
  },[]);
  useEffect(()=>{ const fit=()=>{ const el=logoRef.current; if(!el) return; const panel=el.parentElement?.parentElement; if(!panel) return; el.style.fontSize=''; let size=Math.min(42, Math.max(28, Math.floor(panel.clientWidth*0.16))); el.style.fontSize=size+'px'; el.style.letterSpacing='0.16em'; let loops=0; while(el.scrollWidth>panel.clientWidth-24 && loops<20){ size-=1; el.style.fontSize=size+'px'; loops++; } }; fit(); const ro=new ResizeObserver(fit); ro.observe(document.body); return ()=>ro.disconnect(); },[]);
  
  // Verificar estado de autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const result = await window.LUM_API.api('auth.php?action=check_session');
          if (result && result.success) {
            setIsLoggedIn(true);
            setUserInfo(result.user);
          }
        }
      } catch (e) {
        console.log('No hay sesión activa');
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };
    checkAuth();
  }, []);
  return (
    <section className="screen intro">
      <div className="introWrap">
        <div className="introBg" ref={bgRef} />
        <div className="neon-borders">
          <div className="neon-line top"></div>
          <div className="neon-line right"></div>
          <div className="neon-line bottom"></div>
          <div className="neon-line left"></div>
        </div>
        <div className="panel">
          <h1 className="logo">
            <img src="lumetrix/img/logo.png" alt="LUMETRIX" style={{
              height:'150px',
              width:'500px',
              filter:'drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 60px #ff00ff)',
              animation:'logoGlow 2s ease-in-out infinite alternate'
            }} onError={(e)=>{e.target.style.display='none';e.target.nextSibling.style.display='block';}} />
            <div style={{display:'none',fontSize:'48px',fontWeight:'900',letterSpacing:'0.1em',background:'linear-gradient(90deg,#39ff14,#00ffff,#ff00ff)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',textShadow:'0 0 20px #39ff14,0 0 40px #00ffff,0 0 60px #ff00ff'}}>LUMETRIX</div>
          </h1>
          <div style={{textAlign:'center',fontSize:18,opacity:.9,marginTop:20,marginBottom:8,lineHeight:'1.4',fontWeight:500}}>Esto no es un Simón: es el <b>anti‑Simón</b>.<br/><br/><b>Encuentra</b> la secuencia y pinta <b>todas</b> las piezas del color del borde.</div>
          
          {isLoggedIn ? (
            // Usuario logueado - mostrar progreso guardado
            <div style={{textAlign:'center',marginTop:20}}>
              <div style={{fontSize:18,opacity:0.9,color:'#39ff14',fontWeight:700,marginBottom:4}}>¡Hola, {userInfo?.nick || 'Usuario'}!</div>
              <div style={{fontSize:13,opacity:0.6,marginBottom:16}}>Partida guardada</div>
              <div className="actions" style={{marginBottom:8}}>
                <button className="btn btn1" onClick={onPlay}>CONTINUAR</button>
              </div>
              <button 
                className="btn btn2" 
                onClick={handleLogout} 
                style={{fontSize:11,padding:'6px 12px',opacity:0.7}}
              >
                Salir
              </button>
            </div>
          ) : (
            // Usuario NO logueado - opción invitado o entrar
            <div style={{textAlign:'center',marginTop:20}}>
              <div className="actions" style={{marginBottom:16}}>
                <button className="btn btn1" onClick={onPlay}>JUGAR</button>
              </div>
              <div style={{fontSize:12,opacity:0.5,marginBottom:6}}>¿Ya tienes cuenta?</div>
              <button 
                className="btn btn2" 
                onClick={onAuth}
                style={{fontSize:12,padding:'6px 14px'}}
              >
                Entrar
              </button>
            </div>
          )}
        </div>
        <div className="copy" style={{fontSize:'14px',fontWeight:500}}>© @intocables13 · Todos los derechos reservados</div>
      </div>
    </section>
  );
}

// ---------------- Game ----------------
function Game({ level, setLevel, soundOn, musicOn, musicVolume, vibrateOn, onOpenAuth, onOpenRanking, onOpenOptions, onTotalUpdate, totalTime: totalProp }){
  const boardRef = useRef(null);
  const [time, setTime] = useState(timeFor(level));
  const [running, setRunning] = useState(false);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [totalTime, setTotalTime] = useState(()=>{ try{ return Number(JSON.parse(localStorage.getItem('lum_total')||'0'))||0; }catch{return 0;} });
  useEffect(()=>{ if(typeof totalProp === 'number') setTotalTime(totalProp); }, [totalProp]);

  const SFX = useSFX(soundOn, musicVolume);
  const world = Math.floor((level-1)/10) + 1;
  const levelInWorld = ((level-1)%10) + 1;
  const accent = useMemo(()=> colorForLevel(level), [level]);

  // Inicializar audios al cargar
  useEffect(() => {
    SFX.initBg();
    SFX.initStart();
    // Iniciar música de fondo después de un pequeño delay (solo si está habilitada)
    const timer = setTimeout(() => {
      SFX.startBg(musicOn);
    }, 1000);
    return () => clearTimeout(timer);
  }, [SFX, musicOn]);


  // Controlar música de fondo cuando cambie el estado
  useEffect(() => {
    if (musicOn) {
      SFX.startBg(true);
    } else {
      SFX.stopBg();
    }
  }, [musicOn, SFX]);

  // Actualizar volumen cuando cambie
  useEffect(() => {
    SFX.updateVolume(musicVolume);
  }, [musicVolume, SFX]);

  // Función para actualizar zonas de drop
  const updateDropZones = () => {
    const currentWorld = Math.floor((level-1)/10) + 1;
    const config = getLevelConfig(level);
    if ((currentWorld >= 2 || config.mechanics.includes('combo') || (config.mechanics.includes('touch') && config.mechanics.includes('drag') && config.mechanics.includes('double'))) && running && seqRef.current.length > 0) {
      const zones = createDropZones(seqRef.current, level, dragTileId);
      setDropZones(zones);
    }
  };

  // Función para resetear paso actual (sin resetear todo el nivel)
  const resetCurrentStep = () => {
    SFX.fail();
    vibrate(80, vibrateOn);
    stepRef.current = 0;
    
    // si hay especial, asegúrate de devolverla a origen SIEMPRE
    restoreSpecialTile('resetCurrentStep');
    
    resetTiles();
    partiallyTouchedRef.current.clear(); // Reset fichas de doble toque
    setPartiallyTouched(new Set());
    const currentWorld = Math.floor((level-1)/10) + 1;
    if (currentWorld >= 2 && seqRef.current.length > 0) {
      updateDropZones();
    }
  };

  // Función para configurar mecánicas del nivel
  const setupLevelMechanics = (levelNum) => {
    const config = getLevelConfig(levelNum);
    const mechanics = config.mechanics;
    const currentWorld = Math.floor((levelNum-1)/10) + 1;
    
    // SIMPLE: Si tiene drag Y double = COMBO
    if (mechanics.includes('drag') && mechanics.includes('double')) {
      // Mundo 4-5: Mecánica combo - SIEMPRE 1 de cada tipo especial
      const totalTiles = config.tiles;
      const dragCount = 1;    // SIEMPRE 1 ficha de arrastre
      const doubleCount = 1;  // SIEMPRE 1 ficha de doble toque
      const touchCount = totalTiles - dragCount - doubleCount; // Resto toque normal
      
      // Crear sets para cada tipo
      const allIndices = Array.from({length: totalTiles}, (_, i) => i);
      const shuffled = [...allIndices].sort(() => Math.random() - 0.5);
      
      const dragTiles = new Set(shuffled.slice(0, dragCount));
      const doubleTiles = new Set(shuffled.slice(dragCount, dragCount + doubleCount));
      const touchTiles = new Set(shuffled.slice(dragCount + doubleCount));
      
      setComboDragTiles(dragTiles);
      setComboDoubleTiles(doubleTiles);
      setComboTouchTiles(touchTiles);
      
      // Para compatibilidad con doble toque
      setDoubleTouchTiles(doubleTiles);
      doubleTouchTilesRef.current = doubleTiles; // ¡IMPORTANTE: Configurar la referencia persistente!
      
      // Para compatibilidad con arrastre - configurar la primera ficha de arrastre
      if (dragTiles.size > 0) {
        const firstDragTile = Array.from(dragTiles)[0];
        setSpecialId(firstDragTile);
        specialIdRef.current = firstDragTile;
        setDragTileId(firstDragTile);
      } else {
        setSpecialId(null);
        specialIdRef.current = null;
        setDragTileId(null);
      }
      
    } else if (mechanics.includes('double') && !(mechanics.includes('drag'))) {
      // Mundo 4: Solo doble toque - empezar con 1 ficha
      const numDoubleTiles = 1; // Siempre 1 ficha de doble toque para empezar
      const doubleTiles = new Set();
      
      // Crear fichas de doble toque únicas
      while (doubleTiles.size < numDoubleTiles) {
        const randomIndex = Math.floor(Math.random() * config.tiles);
        doubleTiles.add(randomIndex);
      }
      doubleTouchTilesRef.current = doubleTiles;
      setDoubleTouchTiles(doubleTiles);
      setComboDragTiles(new Set());
      setComboDoubleTiles(new Set());
      setComboTouchTiles(new Set());
      setDragTileId(null); // No se usa en doble toque
      setSpecialId(null); // Limpiar ficha especial
      specialIdRef.current = null; // Limpiar referencia
      
    } else if (currentWorld >= 2 && mechanics.includes('drag')) {
      // Mundo 2-3: Seleccionar aleatoriamente UNA ficha para arrastre (nunca la primera)
      const totalTiles = config.tiles;
      const availableTiles = Array.from({length: totalTiles - 1}, (_, i) => i + 1);
      const randomIndex = Math.floor(Math.random() * availableTiles.length);
      const specialTileId = availableTiles[randomIndex];
      setSpecialId(specialTileId);
      specialIdRef.current = specialTileId;
      
      doubleTouchTilesRef.current.clear();
      setDoubleTouchTiles(new Set());
      setComboDragTiles(new Set());
      setComboDoubleTiles(new Set());
      setComboTouchTiles(new Set());
    } else {
      // Mundo 1: Solo toque normal
      doubleTouchTilesRef.current.clear();
      setDoubleTouchTiles(new Set());
      setComboDragTiles(new Set());
      setComboDoubleTiles(new Set());
      setComboTouchTiles(new Set());
      setSpecialId(null);
      specialIdRef.current = null;
    }
    
    // Reset estado de doble toque
    partiallyTouchedRef.current.clear();
    setPartiallyTouched(new Set());
  };
  
  // Estado para mecánica de arrastre
  const [tiles, setTiles] = useState([]); // Fichas renderizadas con React
  const [drop, setDrop] = useState(null); // Zona de drop para ficha especial
  const [draggingId, setDraggingId] = useState(null); // ID de ficha siendo arrastrada
  const [specialId, setSpecialId] = useState(null); // ID de la ficha especial (arrastrable)
  
  // Refs para drag
  const draggingPointerIdRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const dragPosRef = useRef({ x: 0, y: 0 });
  const specialIdRef = useRef(null);
  const currentSpecialIdRef = specialIdRef; // Alias de compatibilidad
  const originalPositionRef = useRef(null); // Para guardar posición original de ficha especial
  
  // Estado para mecánica de doble toque
  const [doubleTouchTiles, setDoubleTouchTiles] = useState(new Set()); // Fichas que requieren doble toque
  const doubleTouchTilesRef = useRef(new Set()); // Referencia persistente para fichas de doble toque
  const [partiallyTouched, setPartiallyTouched] = useState(new Set()); // Fichas con primer toque
  const partiallyTouchedRef = useRef(new Set()); // Referencia persistente para fichas con primer toque
  
  // Estado para mecánica combo (Mundo 5)
  const [comboDragTiles, setComboDragTiles] = useState(new Set()); // Fichas que se arrastran en combo
  const [comboDoubleTiles, setComboDoubleTiles] = useState(new Set()); // Fichas doble toque en combo
  const [comboTouchTiles, setComboTouchTiles] = useState(new Set()); // Fichas toque normal en combo
  const [dragTileId, setDragTileId] = useState(null); // Ficha que requiere arrastre en Mundo 2+

  const seqRef = useRef([]);
  const stepRef = useRef(0);
  // Posiciones originales por id → para poder volver tras fallos posteriores
  const origPosRef = useRef(new Map());
  const timerRef = useRef(null);
  const runningRef = useRef(false);

  // Umbral para distinguir entre tap y drag real
  const DRAG_MIN_PX = 8;
  const dragStartRef = useRef({ x: 0, y: 0 });
  const suppressClickRef = useRef(false);

  // Paso actual espera ARRASTRE (drag)? Ignora todos los clics; sólo vale arrastrar.
  const isCurrentStepDrag = (expectedId) => {
    const cfg = getLevelConfig(level) || { mechanics: [] };
    const mechanics = cfg.mechanics || [];
    const currentWorld = Math.floor((level-1)/10) + 1;

    // Combo (mundo 5): la ficha esperada es de arrastre si está en comboDragTiles
    const isCombo = mechanics.includes('combo') ||
      (mechanics.includes('touch') && mechanics.includes('drag') && mechanics.includes('double'));
    if (isCombo) return comboDragTiles.has(expectedId);

    // Mundos 2-3 (drag simple): la ficha esperada es arrastre si expected === specialId
    if (currentWorld >= 2 && mechanics.includes('drag')) {
      return specialIdRef.current === expectedId;
    }
    return false;
  };

  // Pequeño "nudge" cuando tocan la especial sin arrastrar
  const nudgeSpecialTile = (reason = 'tap') => {
    const board = boardRef.current;
    if (!board || specialIdRef.current == null) return;

    const el = board.querySelector(`.tile[data-id="${specialIdRef.current}"]`);
    if (!el) return;

    // 1) Wiggle en la ficha
    el.classList.remove('nudge-shake');
    // reflow para reiniciar anim
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    el.classList.add('nudge-shake');
    setTimeout(() => el.classList.remove('nudge-shake'), 550);

    // 2) Pulso en la zona de drop (si existe)
    setDrop(d => d ? ({ ...d, hint: true }) : d);
    setTimeout(() => setDrop(d => d ? ({ ...d, hint: false }) : d), 900);

    // 3) Globito "arrastra"
    const rect = el.getBoundingClientRect();
    const brect = board.getBoundingClientRect();
    const hint = document.createElement('div');
    hint.className = 'drag-hint';
    hint.textContent = 'arrastra';
    Object.assign(hint.style, {
      left: `${rect.left - brect.left + rect.width/2}px`,
      top: `${rect.top - brect.top}px`,
    });
    board.appendChild(hint);
    requestAnimationFrame(() => hint.classList.add('show'));
    setTimeout(() => {
      hint.classList.remove('show');
      setTimeout(() => { try { hint.remove(); } catch {} }, 180);
    }, 800);

    // Opcional: un "pip" suave y vibración mini
    try { SFX.blink(720); } catch {}
    vibrate(10, vibrateOn);
  };

  // Pequeño "nudge" cuando tocan una ficha de doble toque una sola vez
  const nudgeDoubleTile = (tileId) => {
    const board = boardRef.current;
    if (!board) return;

    const el = board.querySelector(`.tile[data-id="${tileId}"]`);
    if (!el) return;

    // 1) Wiggle en la ficha
    el.classList.remove('nudge-shake');
    // reflow para reiniciar anim
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    el.classList.add('nudge-shake');
    setTimeout(() => el.classList.remove('nudge-shake'), 550);

    // 2) Globito "dos veces" o "doble click"
    const rect = el.getBoundingClientRect();
    const brect = board.getBoundingClientRect();
    const hint = document.createElement('div');
    hint.className = 'drag-hint';
    hint.textContent = 'dos veces';
    Object.assign(hint.style, {
      left: `${rect.left - brect.left + rect.width/2}px`,
      top: `${rect.top - brect.top}px`,
    });
    board.appendChild(hint);
    requestAnimationFrame(() => hint.classList.add('show'));
    setTimeout(() => {
      hint.classList.remove('show');
      setTimeout(() => { try { hint.remove(); } catch {} }, 180);
    }, 800);

    // Opcional: un "pip" suave y vibración mini
    try { SFX.blink(720); } catch {}
    vibrate(10, vibrateOn);
  };

  // Función centralizada para restaurar ficha especial
  const restoreSpecialTile = (reason = 'unknown') => {
    const board = boardRef.current;
    const id = specialIdRef.current;
    if (!board || id == null) return;

    const el = board.querySelector(`.tile[data-id="${id}"]`);
    if (!el) return;

    // Usa el snapshot en ref o, si no existe, el de data-attrs (fallback)
    let orig = originalPositionRef.current;
    if (!orig && el.dataset.origX) {
      orig = {
        x: parseFloat(el.dataset.origX),
        y: parseFloat(el.dataset.origY),
        width: parseFloat(el.dataset.origW),
        height: parseFloat(el.dataset.origH),
      };
    }
    if (!orig) {
      console.warn('restoreSpecialTile: no original position', { reason, id });
      return;
    }

    el.style.position = 'absolute';
    el.style.left = `${orig.x}px`;
    el.style.top = `${orig.y}px`;
    el.style.width = `${orig.width}px`;
    el.style.height = `${orig.height}px`;
    el.classList.remove('dragging');
    el.style.zIndex = '';
    el.style.pointerEvents = ''; // vuelve a ser clicable
    setDraggingId(null);
    draggingPointerIdRef.current = null;

  };

  // Función para verificar si está dentro del área magnética
  const insideMagnetic = (cxViewport, cyViewport, dropZone, boardEl, MAGNET = 48) => {
    if (!dropZone || !boardEl) return false;
    const br = boardEl.getBoundingClientRect();
    const cx = cxViewport - br.left;
    const cy = cyViewport - br.top;
    return (
      cx > dropZone.x - MAGNET &&
      cx < dropZone.x + dropZone.w + MAGNET &&
      cy > dropZone.y - MAGNET &&
      cy < dropZone.y + dropZone.h + MAGNET
    );
  };

  // Función para pintar y bloquear ficha (usada solo para drag & drop)
  const paintAndLock = (id) => {
    const el = boardRef.current?.querySelector(`.tile[data-id="${id}"]`);
    if (el) {
      const pitch = parseFloat(el.dataset.pitch||'880');
      el.style.background = (paintRef.current || accent);
      el.style.pointerEvents = 'none';
      el.style.opacity = '0.7';
      SFX.ok(pitch);
      vibrate(20, vibrateOn);
    }
  };

  // Función para avanzar paso
  const advance = () => {
    stepRef.current++;
    if (stepRef.current >= seqRef.current.length) {
      // GANAR
      if (!endedRef.current) {
        endedRef.current = true;
        const spent = Math.ceil((Date.now() - startTimeRef.current) / 1000);
        saveTotal(spent);
        
        // Guardar progreso en API (nivel desbloqueado = actual + 1)
        try {
          if (window.LUM_API) {
            window.LUM_API.api('game.php?action=save_progress', {
              method: 'POST',
              body: JSON.stringify({
                level: level + 1,  // Próximo nivel desbloqueado
                total_time_s: spent,
                success: 1
              })
            }).catch(e => {
              console.log('No hay sesión activa para guardar progreso');
            });
          }
        } catch (_) {}
      }
      
      if (timerRef.current) { clearInterval(timerRef.current); }
      setRunning(false); 
      runningRef.current = false; 
      setWin(true);
      try { SFX.winMelody((melodyRef.current||[]).slice(0,6)); } catch {}
    }
  };

  // Función para fallar paso
  const failStep = () => {
    SFX.fail();
    vibrate(80, vibrateOn);
    stepRef.current = 0;
    resetTiles();
    partiallyTouchedRef.current.clear();
    setPartiallyTouched(new Set());
    
    // Reposicionar fichas especiales a su posición original si están en absolute/fixed
    const board = boardRef.current;
    if (board && specialIdRef.current !== null && originalPositionRef.current) {
      const specialTile = board.querySelector(`.tile[data-id="${specialIdRef.current}"]`);
      if (specialTile) {
        // Restaurar posición original exacta
        specialTile.style.position = 'absolute';
        specialTile.style.left = `${originalPositionRef.current.x}px`;
        specialTile.style.top = `${originalPositionRef.current.y}px`;
        specialTile.style.width = `${originalPositionRef.current.width}px`;
        specialTile.style.height = `${originalPositionRef.current.height}px`;
        specialTile.style.zIndex = '';
        specialTile.style.pointerEvents = '';
        specialTile.classList.remove('dragging');
      }
    }
  };
  const startTimeRef = useRef(0);
  const melodyRef = useRef([]);
  const paintRef = useRef(accent);
  const endedRef = useRef(false);

  useEffect(()=>{ const root=boardRef.current?.closest('.device'); if(root) root.style.setProperty('--accent', accent); },[accent]);

  const saveTotal=(secs)=>{ try{ const prev=Number(JSON.parse(localStorage.getItem('lum_total')||'0'))||0; const next=prev+secs; localStorage.setItem('lum_total', JSON.stringify(next)); setTotalTime(next); if (typeof onTotalUpdate === 'function') onTotalUpdate(next); }catch{} };

  function placeTiles(n, currentSpecialId = null, doubleTilesOverride = null){
    // Determinar qué set usar según el mundo/nivel
    const config = getLevelConfig(level);
    const mechanics = config.mechanics;
    const isCombo = mechanics.includes('drag') && mechanics.includes('double');
    
    const currentDoubleTiles = doubleTilesOverride || (isCombo ? comboDoubleTiles : doubleTouchTilesRef.current);
    const board = boardRef.current; if(!board) return;
    board.querySelectorAll('.tile, .dropzone').forEach(e=>e.remove());
    const rect = board.getBoundingClientRect(); const W=rect.width, H=rect.height;
    const rand=(min,max)=>Math.random()*(max-min)+min;

    const baseHue = ACCENT_HUE[paintRef.current || accent] ?? 0;
    const farHue = ()=>{ let hue=Math.floor(Math.random()*360), tries=0; while(Math.min(Math.abs(hue-baseHue), 360-Math.abs(hue-baseHue))<30 && tries++<120){ hue=Math.floor(Math.random()*360);} return hue; };

    // Generar color único para ficha especial
    let specialColor = null;
    const currentWorld = Math.floor((level-1)/10) + 1;
    if (currentWorld >= 2 && currentSpecialId !== null) {
      // Asegurar que la ficha especial tenga un color único (fucsia/magenta)
      specialColor = `hsl(300 96% 58%)`; // Fucsia vibrante
    }

    const placed=[];
    const usedColors = new Set(); // Para evitar colores duplicados
    
    for(let i=0;i<n;i++){
      let w=0,h=0,x=0,y=0,ok=false,guard=0;
      while(!ok && guard++<300){
        w=Math.max(56,Math.min(140,60+Math.random()*80));
        h=Math.max(56,Math.min(160,60+Math.random()*100));
        x=Math.max(8,Math.min(W-w-8, rand(0,W-w)));
        y=Math.max(8,Math.min(H-h-8, rand(0,H-h)));
        ok = !placed.some(p=>!(x+w<=p.x || p.x+p.w<=x || y+h<=p.y || p.y+p.h<=y));
      }
      placed.push({x,y,w,h});
      const b=document.createElement('button'); b.type='button'; b.className='tile';
      
      // Asignar color: especial si es la ficha especial, aleatorio para las demás
      let tileColor;
      if (currentSpecialId === i && specialColor) {
        tileColor = specialColor;
        usedColors.add(specialColor);
      } else {
        // Generar color aleatorio que no sea fucsia y no esté usado
        let hue;
        do {
          hue = farHue();
          tileColor = `hsl(${hue} 96% 58%)`;
        } while (usedColors.has(tileColor) || tileColor === specialColor);
        usedColors.add(tileColor);
      }
      
      Object.assign(b.style,{ left:x+'px', top:y+'px', width:w+'px', height:h+'px', background: tileColor });
      // blindaje extra: si por casualidad coincide exactamente con el color de nivel, vira 180º
      if (b.style.background === (paintRef.current || accent)) {
        const alt = (((ACCENT_HUE[paintRef.current || accent] || 0) + 180) % 360);
        b.style.background = `hsl(${alt} 96% 58%)`;
      }
      b.dataset.id=String(i);
      b.dataset.orig=b.style.background;
      const m=melodyRef.current||[]; b.dataset.pitch=String((m[i % m.length])||660);
      
      const config = getLevelConfig(level);
      const mechanics = config.mechanics;
      const currentWorld = Math.floor((level-1)/10) + 1;
      
      // Configurar cursor por defecto
      b.style.cursor = 'pointer';
      
      // Marcar ficha especial para drag & drop
      if (currentWorld >= 2 && specialIdRef.current === i) {
        // Agregar clase CSS para identificar ficha especial
        b.classList.add('special-drag-tile');
        
        b.addEventListener('dragstart', (e) => e.preventDefault());
        b.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
        // 👉 Listener directo: inicia drag SIEMPRE en la especial
        b.addEventListener('pointerdown', (e) => {
          onTilePointerDown(e, { id: i });
        }, { passive: false });
        
        // Guardar posición original de la ficha especial
        setTimeout(() => {
          const rect = b.getBoundingClientRect();
          const boardRect = boardRef.current?.getBoundingClientRect();
          if (boardRect) {
            const orig = {
              x: rect.left - boardRect.left,
              y: rect.top - boardRect.top,
              width: rect.width,
              height: rect.height
            };
            originalPositionRef.current = orig;
            b.dataset.origX = String(orig.x);
            b.dataset.origY = String(orig.y);
            b.dataset.origW = String(orig.width);
            b.dataset.origH = String(orig.height);
          }
        }, 50);
      }
      
      // Estilos según mecánica (Mundo 5 combo tiene prioridad)
      if (mechanics.includes('combo') || (mechanics.includes('touch') && mechanics.includes('drag') && mechanics.includes('double'))) {
        if (comboDragTiles.has(i)) {
          // Ficha de arrastre en combo - borde sutil del color de la pieza
          const tileColor = b.style.background;
          b.style.border = `1px solid ${tileColor}`;
          b.style.boxShadow = `0 0 8px ${tileColor}88`;
          b.style.cursor = 'grab';
          b.addEventListener('pointerdown', (e) => onTilePointerDown(e, i));
          b.addEventListener('dragstart', (e) => e.preventDefault());
        } else if (comboDoubleTiles.has(i)) {
          // Ficha de doble toque en combo - DOS BORDES BLANCOS REALES
          b.style.setProperty('border', '2px solid white', 'important');
          b.style.setProperty('outline', '2px solid white', 'important');
          b.style.setProperty('outline-offset', '4px', 'important');
        } else {
          // Ficha de toque normal en combo - sin borde especial
          b.style.border = '1px solid rgba(255,255,255,0.2)';
          b.style.boxShadow = 'none';
        }
      } else {
        // Mundos 1-4: mecánicas individuales
        if (currentDoubleTiles.has(i)) {
          // Ficha de doble toque (Mundo 4) - DOS BORDES BLANCOS REALES
          b.style.setProperty('border', '2px solid white', 'important');
          b.style.setProperty('outline', '2px solid white', 'important');
          b.style.setProperty('outline-offset', '4px', 'important');
        }
      }
      
      // Configurar cursor final para fichas especiales (después de toda la lógica de mecánicas)
      if (currentWorld >= 2 && specialIdRef.current === i) {
        b.style.cursor = 'grab';
      }
      
      board.appendChild(b);
    }

    // Delegación única (funciona móvil/desktop, sin doble evento)
    if (board.__lumDeleg) { board.removeEventListener('pointerdown', board.__lumDeleg); }
    const deleg = (e) => {
      const el = e.target && e.target.closest && e.target.closest('.tile');
      if (!el || !board.contains(el) || !runningRef.current) return;

      const id = Number(el.dataset.id);
      const expected = seqRef.current[stepRef.current];
      const dragStep = isCurrentStepDrag(expected);

      // Siempre: si tocan la especial, iniciamos drag (no validamos por click)
      if (el.classList.contains('special-drag-tile') || id === specialIdRef.current) {
        onTilePointerDown(e, { id });
        return; // nunca tap() sobre la especial
      }

      // Si el paso actual espera drag, ignoramos todos los clics (no error)
      if (dragStep) {
        return; // ni sonido ni vibración, sólo silencio
      }

      // Paso normal → permitir tap
      e.preventDefault && e.preventDefault();
      tap(id);
    };
    board.addEventListener('pointerdown', deleg, { passive: false });
    board.__lumDeleg = deleg;
  }

  // Función para crear zona de drop para ficha especial
  const createDropZone = (specialTile) => {
    if (!specialTile || !boardRef.current) return null;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    // Posicionar zona de drop fuera del tablero principal
    const zoneX = 20;
    const zoneY = 100;
    
    return {
      x: zoneX,
      y: zoneY,
      w: specialTile.w,
      h: specialTile.h,
      color: specialTile.backgroundColor,
      over: false
    };
  };

  function blink(id){ 
    const b=boardRef.current; 
    const el=b && b.querySelector(`.tile[data-id="${id}"]`); 
    if(!el) return; 
    const prev=el.style.background; 
    const prevBorder=el.style.border; 
    const prevBoxShadow=el.style.boxShadow; 
    const prevOutline=el.style.outline; 
    const prevOutlineOffset=el.style.outlineOffset; 
    el.classList.add('lit'); 
    el.style.background = (paintRef.current || accent); 
    SFX.blink(parseFloat(el.dataset.pitch||'720')); 
    setTimeout(()=>{ 
      el.classList.remove('lit'); 
      // el.style.background=prev; // Comentado para que las fichas se queden marcadas
      // Restaurar estilos especiales si es ficha de doble toque
      if(doubleTouchTilesRef.current.has(id)){
        el.style.border = prevBorder; 
        el.style.boxShadow = prevBoxShadow; 
        el.style.outline = prevOutline; 
        el.style.outlineOffset = prevOutlineOffset; 
      }
    }, 260); 
  }
  
  function hint(){ 
    const s=seqRef.current; 
    if(s && s.length) blink(s[0]); 
  }
  
  function resetTiles(){ 
    const b=boardRef.current; 
    if(!b) return; 
    b.querySelectorAll('.tile').forEach((el)=>{ 
      el.style.background=el.dataset.orig||el.style.background; 
      el.classList.remove('lit');
      el.style.opacity = '1'; // Restaurar opacidad para fichas de doble toque
    }); 
  }

  function start(nextLevelArg){
    const lv = (typeof nextLevelArg === 'number' ? nextLevelArg : level);
    const root = boardRef.current?.closest('.device');
    paintRef.current = colorForLevel(lv);
    if (root) root.style.setProperty('--accent', paintRef.current);

    setWin(false); setLose(false); setGameComplete(false); endedRef.current = false;
    if(timerRef.current) clearInterval(timerRef.current);
    const n=tilesFor(lv);
    // Generar secuencia asegurando que la primera nunca sea especial
    const allTiles = Array.from({length:n},(_,i)=>i);
    const firstTile = 0; // La primera ficha siempre es la 0 (nunca especial)
    const remainingTiles = allTiles.slice(1).sort(()=>Math.random()-0.5);
    seqRef.current = [firstTile, ...remainingTiles];
    stepRef.current = 0;
    melodyRef.current = MELODIES[Math.floor(Math.random()*MELODIES.length)] || [440,494,523,587,659,698,784,880,988,1046,1174,1318,1396,1567,1760];
    
    // Configurar mecánicas del nivel
    setupLevelMechanics(lv);
    
    // Calcular fichas especiales directamente
    let currentSpecialId = null;
    let currentDoubleTiles = new Set();
    const currentWorld = Math.floor((lv-1)/10) + 1;
    const config = getLevelConfig(lv);
    const mechanics = config.mechanics;
    
    // NO duplicar lógica - setupLevelMechanics ya se encarga de todo
    // Solo usar los valores que ya se configuraron
    currentSpecialId = specialIdRef.current;
    currentDoubleTiles = doubleTouchTilesRef.current;
    
    // Crear fichas con DOM (sistema original)
    placeTiles(n, currentSpecialId, currentDoubleTiles);

    // Crear zona de drop para ficha especial (solo si hay mecánica drag)
    setTimeout(() => {
      const config = getLevelConfig(lv);
      if (currentWorld >= 2 && currentSpecialId !== null && config.mechanics.includes('drag')) {
        const specialTile = boardRef.current?.querySelector(`.tile[data-id="${currentSpecialId}"]`);
        if (specialTile) {
          const rect = specialTile.getBoundingClientRect();
          const boardRect = boardRef.current?.getBoundingClientRect();
          if (boardRect) {
            // Posicionar zona de drop en la esquina superior izquierda con margen generoso
            const boardRect = boardRef.current?.getBoundingClientRect();
            const margin = 60; // Margen muy generoso para evitar solapamiento con fichas
            const dropZone = {
              x: margin, // Esquina izquierda con margen
              y: margin, // Esquina superior con margen
              w: rect.width,
              h: rect.height,
              color: specialTile.style.backgroundColor,
              over: false
            };
            setDrop(dropZone);
          }
        }
      } else {
        setDrop(null);
      }
    }, 100);

    const t=timeFor(lv); setTime(t); setRunning(true); runningRef.current=true; SFX.start(); startTimeRef.current=Date.now();
    const t0=Date.now();
    timerRef.current=setInterval(()=>{
      const el=(Date.now()-t0)/1000; const rem=Math.max(0,t-el);
      setTime(Math.ceil(rem));
      if(rem<=0){
        if(!endedRef.current){
          endedRef.current = true;
          const spent = Math.ceil((Date.now()-startTimeRef.current)/1000);
          saveTotal(spent);
          
          // Al PERDER (tiempo agotado): guardar progreso en API (solo si hay sesión)
          try {
            if (window.LUM_API) {
              window.LUM_API.api('game.php?action=save_progress', {
                method: 'POST',
                body: JSON.stringify({
                  level,
                  total_time_s: spent,
                  success: 0
                })
              }).catch(e => {
                console.log('No hay sesión activa para guardar progreso');
              });
            }
          } catch (_) {}
        }
        clearInterval(timerRef.current);
        setRunning(false); runningRef.current=false; 
        restoreSpecialTile('timeout'); // por si estaba movida
        setLose(true); SFX.fail(); resetTiles();
      }
    },100);

    setTimeout(hint, 1500);
  }

  // Capturador global de click para anular clicks sintéticos tras drag
  useEffect(() => {
    const handleClickCapture = (e) => {
      if (suppressClickRef.current) {
        e.preventDefault();
        e.stopPropagation();
        suppressClickRef.current = false;
      }
    };
    
    document.addEventListener('click', handleClickCapture, true);
    return () => document.removeEventListener('click', handleClickCapture, true);
  }, []);

  // Exponer funciones de test para debugging
  useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, {
      start,
      state: () => ({ level, world, levelInWorld, running, time, seqLen: (seqRef.current || []).length }),
      tapExpected: () => { const id = seqRef.current[stepRef.current]; if (id != null) tap(id); },
      tapId: (x) => tap(x),
      isDragStep: () => { const exp = seqRef.current[stepRef.current]; return isCurrentStepDrag(exp); },
      test: {
        ignoreClicksOnDragStep: () => {
          const exp = seqRef.current[stepRef.current];
          const wasStep = stepRef.current;
          if (!isCurrentStepDrag(exp)) return { ok: false, reason: 'not drag step' };
          const wrong = (exp === 0 ? 1 : 0); // cualquier ficha que NO sea la esperada
          tap(wrong);                       // debería ignorarse
          return { ok: stepRef.current === wasStep, step: stepRef.current, expected: exp };
        }
      }
    });
  }, [level, world, levelInWorld, running, time]);

  // Función para manejar pointerdown en ficha
  const onTilePointerDown = (e, tile) => {
    if (!runningRef.current) return;
    const expected = seqRef.current[stepRef.current];
    const board = boardRef.current;
    const el = board?.querySelector(`.tile[data-id="${tile.id}"]`);
    if (!el) return; // seguridad

    if (tile.id === specialIdRef.current) {
      // Siempre drag, jamás validación por click
      e.preventDefault();
      e.stopPropagation();
      const r = el.getBoundingClientRect();
      
      // Guardar posición inicial para detectar tap vs drag
      dragStartRef.current = { x: r.left, y: r.top };
      
      // Activar supresión de click sintético
      suppressClickRef.current = true;
      
      setDraggingId(tile.id);
      draggingPointerIdRef.current = e.pointerId ?? null;
      dragOffsetRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      dragPosRef.current = { x: r.left, y: r.top };
      el.style.zIndex = 1000;
      el.classList.add('dragging');
      el.style.pointerEvents = 'none';
      el.style.touchAction = 'none';
      return;
    }

    // ficha normal: solo si es su turno
    if (tile.id !== expected) return failStep();
    paintAndLock(tile.id); // pinta a verde y desactiva
    advance();
  };

  function tap(id){
    if(!runningRef.current) return; 
    
    const config = getLevelConfig(level);
    
    // Ignorar taps sobre la especial cuando la mecánica es drag
    if (config.mechanics.includes('drag') && id === specialIdRef.current) {
      return; // NUNCA validar por tap la especial
    }
    
    const expected=seqRef.current[stepRef.current];
    const board=boardRef.current;
    
    // Si este paso requiere ARRASTRE, ignoramos cualquier tap
    if (isCurrentStepDrag(expected)) {
      return; // sin fallo
    }
    
    const el=board && board.querySelector(`.tile[data-id="${id}"]`); 
    if(!el) return;
    
    const pitch = parseFloat(el.dataset.pitch||'880');
    
    // Usar la referencia persistente de doubleTouchTiles
    const isDoubleTile = doubleTouchTilesRef.current.has(id);
    const isComboDouble = (config.mechanics.includes('combo') || (config.mechanics.includes('touch') && config.mechanics.includes('drag') && config.mechanics.includes('double'))) && comboDoubleTiles.has(id);
    
    // Lógica de doble toque (Mundo 4+) y combo (Mundo 5)
    if ((isDoubleTile && config.mechanics.includes('double')) || isComboDouble) {
      // Solo permitir tocar fichas de doble toque cuando sea su turno
      if (id === expected) {
        if (partiallyTouchedRef.current.has(id)) {
          // Segundo toque - completar doble toque
          el.style.opacity = '1';
          blink(id); // Usar función blink para el efecto de brillo
          SFX.ok(pitch); 
          vibrate(20, vibrateOn);
          stepRef.current++;
          
          // Limpiar estado de doble toque
          partiallyTouchedRef.current.delete(id);
          setPartiallyTouched(new Set(partiallyTouchedRef.current));
        } else {
          // Primer toque - marcar como parcialmente tocada
          // NO cambiar el color, solo reducir opacidad para indicar que está parcialmente tocada
          el.style.opacity = '0.6';
          blink(id); // Usar función blink para el efecto de brillo
          SFX.ok(pitch); 
          vibrate(20, vibrateOn);
          
          // Añadir a fichas parcialmente tocadas
          partiallyTouchedRef.current.add(id);
          setPartiallyTouched(new Set(partiallyTouchedRef.current));
          
          // Mostrar nudge para guiar al jugador
          nudgeDoubleTile(id);
          
          return; // No avanzar paso aún
        }
      } else {
        // Ficha de doble toque pero no es su turno - error
        SFX.fail(); 
        vibrate(80, vibrateOn); 
        stepRef.current = 0; 
        resetTiles();
        partiallyTouchedRef.current.clear();
        setPartiallyTouched(new Set());
        return;
      }
    } else if (id === expected) {
      // Toque normal en ficha correcta
      blink(id); // Usar función blink para el efecto de brillo
      SFX.ok(pitch); 
      vibrate(20, vibrateOn);
      stepRef.current++;
      
      // Actualizar zona de drop para Mundo 2+ y combo
      const currentWorld = Math.floor((level-1)/10) + 1;
      if ((currentWorld >= 2 || config.mechanics.includes('combo') || (config.mechanics.includes('touch') && config.mechanics.includes('drag') && config.mechanics.includes('double'))) && stepRef.current < seqRef.current.length) {
        // Crear nueva zona de drop para la siguiente ficha especial
        setTimeout(() => {
          const currentWorld = Math.floor((level-1)/10) + 1;
          if (currentWorld >= 2 && specialIdRef.current !== null) {
            const specialTile = boardRef.current?.querySelector(`.tile[data-id="${specialIdRef.current}"]`);
            if (specialTile) {
              // Posicionar zona de drop en la esquina superior izquierda con margen generoso
              const boardRect = boardRef.current?.getBoundingClientRect();
              const margin = 60; // Margen muy generoso para evitar solapamiento con fichas
              const dropZone = {
                x: margin, // Esquina izquierda con margen
                y: margin, // Esquina superior con margen
                w: specialTile.offsetWidth,
                h: specialTile.offsetHeight,
                color: specialTile.style.backgroundColor,
                over: false
              };
              setDrop(dropZone);
            }
          }
        }, 100);
      } else if (currentWorld >= 2 || config.mechanics.includes('combo') || (config.mechanics.includes('touch') && config.mechanics.includes('drag') && config.mechanics.includes('double'))) {
        setDrop(null); // No más zonas cuando se complete la secuencia
      }
      
      if(stepRef.current>=seqRef.current.length){
          if(!endedRef.current){
            endedRef.current = true;
            const spent = Math.ceil((Date.now()-startTimeRef.current)/1000);
            saveTotal(spent);
            
            // Al GANAR: guardar progreso en API (próximo nivel desbloqueado)
            try {
              if (window.LUM_API) {
                window.LUM_API.api('game.php?action=save_progress', {
                  method: 'POST',
                  body: JSON.stringify({
                    level: level + 1,  // Próximo nivel desbloqueado
                    total_time_s: spent,
                    success: 1
                  })
                }).catch(e => {
                  console.log('No hay sesión activa para guardar progreso');
                });
              }
            } catch (_) { /* opcional: mostrar un aviso suave */ }
          }
          if (timerRef.current) { clearInterval(timerRef.current); }
          setRunning(false); runningRef.current=false;
          
          // Verificar si es el nivel 50 (final del juego)
          if (level === 50) {
            setGameComplete(true);
          } else {
            setWin(true);
          }
          
          try { SFX.winMelody((melodyRef.current||[]).slice(0,6)); } catch {}
        }
    } else {
      // Error - resetear todo incluyendo doble toque
      SFX.fail(); 
      vibrate(80, vibrateOn); 
      stepRef.current = 0; 
      restoreSpecialTile('wrong-tap'); // ← clave cuando venías de un drag válido
      resetTiles();
      partiallyTouchedRef.current.clear();
      setPartiallyTouched(new Set());
    }
  }

  function nextLevel(){
    setWin(false); setLose(false); setGameComplete(false);
    const nl = level + 1;
    setLevel(nl);
    setTimeout(()=>start(nl), 0);
  }

  useEffect(()=>{ window.LumetrixTest = { start, state:()=>({level,world,levelInWorld,running,time,seqLen:(seqRef.current||[]).length}), tapExpected:()=>{ const id=seqRef.current[stepRef.current]; if(id!=null) tap(id); } }; },[level,world,levelInWorld,running,time]);

  // Event listeners para drag & drop robusto
  useEffect(() => {
    const move = (ev) => {
      if (draggingId == null) return;
      if (draggingPointerIdRef.current !== null &&
          ev.pointerId !== draggingPointerIdRef.current) return;

      const nx = ev.clientX - dragOffsetRef.current.x;
      const ny = ev.clientY - dragOffsetRef.current.y;
      const el = boardRef.current?.querySelector(`.tile[data-id="${draggingId}"]`);
      
      if (!el) return;
      
      // Solo cambiar a fixed cuando haya movimiento significativo (más de 5px)
      const dx = Math.abs(nx - dragPosRef.current.x);
      const dy = Math.abs(ny - dragPosRef.current.y);
      const threshold = 5;
      
      if (dx > threshold || dy > threshold || el.style.position === 'fixed') {
        el.style.position = 'fixed';
        el.style.left = `${nx}px`;
        el.style.top = `${ny}px`;
        dragPosRef.current = { x: nx, y: ny };
      }

      const cx = nx + (el?.offsetWidth || 0) / 2;
      const cy = ny + (el?.offsetHeight || 0) / 2;
      const inside = insideMagnetic(cx, cy, drop, boardRef.current, 48);
      setDrop(d => d ? ({...d, over: inside}) : null);
    };

    const up = (ev) => {
      if (draggingId == null) return;
      if (draggingPointerIdRef.current !== null &&
          ev.pointerId !== draggingPointerIdRef.current) return;

      const expected = seqRef.current[stepRef.current];
      const el = boardRef.current?.querySelector(`.tile[data-id="${draggingId}"]`);
      const nx = dragPosRef.current.x;
      const ny = dragPosRef.current.y;
      const cx = nx + (el?.offsetWidth || 0) / 2;
      const cy = ny + (el?.offsetHeight || 0) / 2;
      const inside = insideMagnetic(cx, cy, drop, boardRef.current, 48);

      // Debug info
      console.debug('Drag drop validation:', {
        expected,
        draggingId,
        special: specialIdRef.current,
        inside,
        step: stepRef.current,
        drop: drop
      });

      if (draggingId === expected && draggingId === specialIdRef.current && inside && el) {
        // ÉXITO: snap + pintar + avanzar
        el.style.position = 'absolute';
        el.style.left = `${drop.x + (drop.w - el.offsetWidth) / 2}px`;
        el.style.top = `${drop.y + (drop.h - el.offsetHeight) / 2}px`;
        
        // limpiar estado drag
        setDraggingId(null);
        draggingPointerIdRef.current = null;
        setDrop(d => d ? ({...d, over: false}) : null);
        if (el) {
          el.classList.remove('dragging');
          el.style.pointerEvents = '';
          el.style.zIndex = '';
        }
        
        paintAndLock(draggingId);
        return advance();
      } else {
        // Verificar si fue un tap (movimiento insuficiente) o drag real
        if (draggingId === specialIdRef.current) {
          const dist = Math.hypot(nx - dragStartRef.current.x, ny - dragStartRef.current.y);
          
          if (dist < DRAG_MIN_PX) {
            // Fue un TAP: restaurar visual y SALIR sin fallar
            restoreSpecialTile('tap-detected');
            setDraggingId(null);
            draggingPointerIdRef.current = null;
            setDrop(d => d ? ({...d, over: false}) : null);
            
            // Mostrar nudge para guiar al jugador
            nudgeSpecialTile('tap');
            
            return; // No llamar a failStep()
          } else {
            // Fue un DRAG real pero falló: restaurar y fallar
            restoreSpecialTile('drop-miss');
          }
        }
        
        // limpiar estado drag
        setDraggingId(null);
        draggingPointerIdRef.current = null;
        setDrop(d => d ? ({...d, over: false}) : null);
        
        failStep(); // no inside / fuera de turno
      }
    };

    document.addEventListener('pointermove', move, true);
    document.addEventListener('pointerup', up, true);
    document.addEventListener('pointercancel', up, true);
    
    return () => {
      document.removeEventListener('pointermove', move, true);
      document.removeEventListener('pointerup', up, true);
      document.removeEventListener('pointercancel', up, true);
    };
  }, [draggingId, drop, tiles]);

  return (
    <section className="screen">
      <div className="topbar">
        <div className="brand">
          <img src="lumetrix/img/logo2.png" alt="LUMETRIX" style={{height:'32px',width:'auto'}} onError={(e)=>{e.target.style.display='none';e.target.nextSibling.style.display='inline';}} />
          <span style={{display:'none',fontSize:'16px',fontWeight:'900',letterSpacing:'0.1em',color:'#fff'}}>LUMETRIX</span>
        </div>
        <div className="icons">
          <button className="icon" onClick={onOpenRanking} aria-label="Ranking">
            <img src="lumetrix/img/ico_ranking.png" alt="Ranking" style={{width:'32px',height:'32px',objectFit:'contain'}} onError={(e)=>{e.target.style.display='none';e.target.nextSibling.style.display='inline';}} />
            <span style={{display:'none',fontSize:'20px'}}>🏆</span>
          </button>
          <button className="icon" onClick={onOpenOptions} aria-label="Opciones">
            <img src="lumetrix/img/ico_config.png" alt="Configuración" style={{width:'32px',height:'32px',objectFit:'contain'}} onError={(e)=>{e.target.style.display='none';e.target.nextSibling.style.display='inline';}} />
            <span style={{display:'none',fontSize:'20px'}}>⚙️</span>
          </button>
          <button className="icon" onClick={onOpenAuth} aria-label="Login">
            <img src="lumetrix/img/ico_user.png" alt="Usuario" style={{width:'32px',height:'32px',objectFit:'contain'}} onError={(e)=>{e.target.style.display='none';e.target.nextSibling.style.display='inline';}} />
            <span style={{display:'none',fontSize:'20px'}}>👤</span>
          </button>
        </div>
      </div>
      <div className="hud">
        <div className="timebar"><i className="timefill" style={{ width: `${Math.max(0, Math.min(100, (time / timeFor(level)) * 100))}%` }} /></div>
        <div className="meta">
          <span className="chip">Nivel <b>{level}</b></span>
          <span className="chip">⏱ <b>{totalTime}s</b></span>
        </div>
      </div>
      <div className="board" ref={boardRef}>
        {/* Zona de drop para ficha especial */}
        {drop && (
          <div
            className={`drop-zone ${drop.over ? 'drag-over' : ''} ${drop.hint ? 'pulse' : ''}`}
            style={{
              position: 'absolute',
              left: drop.x,
              top: drop.y,
              width: drop.w,
              height: drop.h,
              border: `3px dashed ${drop.color}`,
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              zIndex: 10,
              transition: 'all 0.2s ease',
              boxShadow: drop.over ? `0 0 25px ${drop.color}` : `0 0 15px ${drop.color}33`
            }}
          />
        )}
        
        {!running && !win && !lose && (
          <div className="overlay" style={{textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%'}}>
            <button className="btn-start" onClick={()=>start()}>EMPEZAR</button>
            <div style={{marginTop:'16px',color:'#ffffff88',fontSize:'16px',fontWeight:600}}>
              Nivel {level} • Mundo {world}
            </div>
          </div>
        )}
        {win && (
          <div className="overlay">
            <div className="card-compact" style={{textAlign:'center'}}>
              <div style={{fontSize:32, marginBottom:8, textShadow:'0 0 10px var(--neon2), 0 0 20px var(--neon2)'}}>✨</div>
              <h3 style={{color:'var(--neon2)', marginBottom:12}}>¡Nivel superado!</h3>
              <button className="btn btn1" onClick={nextLevel}>Siguiente</button>
            </div>
          </div>
        )}
        {lose && (
          <div className="overlay">
            <div className="card-compact" style={{textAlign:'center'}}>
              <div style={{fontSize:32, marginBottom:8, textShadow:'0 0 10px var(--neon1), 0 0 20px var(--neon1)'}}>💔</div>
              <h3 style={{color:'var(--neon1)', marginBottom:12}}>Tiempo agotado</h3>
              <button className="btn btn1" onClick={()=>start()}>Reintentar</button>
            </div>
          </div>
        )}
        {gameComplete && (
          <div className="overlay">
            <div className="card-compact" style={{textAlign:'center', maxWidth:'90vw', padding:'24px'}}>
              <div style={{fontSize:48, marginBottom:16, textShadow:'0 0 20px #ffd700, 0 0 40px #ffd700'}}>🏆</div>
              <h2 style={{color:'#ffd700', marginBottom:16, fontSize:'24px', fontWeight:'bold', textShadow:'0 0 10px #ffd700'}}>
                ¡CRACK TOTAL! 🎯
              </h2>
              <p style={{color:'#ffffff', marginBottom:20, fontSize:'16px', lineHeight:'1.4'}}>
                Has completado todos los 50 niveles.<br/>
                ¡Eres una máquina de LUMETRIX! 🤖
              </p>
              <p style={{color:'#00ffff', marginBottom:24, fontSize:'14px', fontStyle:'italic'}}>
                Si hay más cracks como tú,<br/>
                añadiremos más niveles. ¡Sigue practicando! 💪
              </p>
              <div style={{display:'flex', gap:'12px', justifyContent:'center'}}>
                <button className="btn btn1" onClick={()=>{setGameComplete(false); setLevel(1);}}>
                  Reiniciar
                </button>
                <button className="btn btn1" onClick={()=>{setGameComplete(false); onOpenRanking();}}>
                  Ranking
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="bokeh"><i className="b1"/><i className="b2"/><i className="b3"/></div>
      </div>
    </section>
  );
}

// ---------------- Modales ----------------
function Ranking({ onClose, total }){
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRanking = async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const result = await window.LUM_API.api('ranking.php?action=global');
          if (result && result.success && result.data) {
            setRankingData(result.data.map((player, index) => ({
              rank: index + 1,
              name: player.nick,
              level: player.level,
              time: player.total_time_s,
              world: Math.floor((player.level - 1) / 10) + 1
            })));
          }
        }
      } catch (e) {
        console.log('Error cargando ranking:', e);
        setRankingData([]);
      } finally {
        setLoading(false);
      }
    };
    loadRanking();
  }, []);

  const getRankColor = (rank) => {
    if (rank === 1) return '#FFD700'; // Oro
    if (rank === 2) return '#C0C0C0'; // Plata
    if (rank === 3) return '#CD7F32'; // Bronce
    return '#00ffff'; // Cian
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '1';
    if (rank === 2) return '2';
    if (rank === 3) return '3';
    return rank;
  };

  return (
    <div className="modal"><div className="card" style={{border:'2px solid #00ffff',boxShadow:'0 0 20px #00ffff44'}}>
      <button className="closer" onClick={onClose} style={{border:'2px solid #00ffff',boxShadow:'0 0 10px #00ffff',background:'#000'}}>✕</button>
      <h3 style={{ color: '#00ffff', marginTop:0, textShadow:'0 0 10px #00ffff, 0 0 20px #00ffff', fontSize:'20px' }}>RANKING GLOBAL</h3>
      {loading ? (
        <div style={{textAlign:'center',padding:'40px',color:'#00ffff66'}}>Cargando ranking...</div>
      ) : rankingData.length === 0 ? (
        <div style={{textAlign:'center',padding:'40px',color:'#00ffff66'}}>
          <div style={{fontSize:16,marginBottom:8}}>Aún no hay jugadores</div>
          <div style={{fontSize:12}}>¡Sé el primero en aparecer aquí!</div>
        </div>
      ) : (
        <div className="list" style={{gap:'8px',maxHeight:'300px',overflowY:'auto'}}>
          {rankingData.map(player => {
            return (
              <div key={player.rank} style={{
                background: 'rgba(0,255,255,0.1)',
                border: '1px solid #00ffff33',
                borderRadius:'8px',
                padding:'10px',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center'
              }}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{
                    color: getRankColor(player.rank), 
                    fontWeight:'bold', 
                    fontSize:'14px',
                    minWidth:'30px'
                  }}>
                    #{getRankIcon(player.rank)}
                  </span>
                  <span style={{color: '#fff', fontSize:'12px'}}>{player.name}</span>
                </div>
                <div style={{textAlign:'right', fontSize:'11px', opacity:0.8}}>
                  <div>Mundo {player.world} • Nivel {player.level}</div>
                  <div style={{color:'#00ffff'}}>{Math.round(player.time)}s</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div></div>
  );
}
function Options({ onClose, onOpenAuth, level, setLevel, soundOn, musicOn, vibrateOn, setSoundOn, setMusicOn, setVibrateOn, onResetTotal, musicVolume, setMusicVolume }){
  return (
    <div className="modal"><div className="card" style={{border:'2px solid #39ff14',boxShadow:'0 0 20px #39ff1444'}}>
      <button className="closer" onClick={onClose} style={{border:'2px solid #39ff14',boxShadow:'0 0 10px #39ff14',background:'#000'}}>✕</button>
      <h3 style={{ color: '#39ff14', marginTop:0, textShadow:'0 0 10px #39ff14, 0 0 20px #39ff14', fontSize:'20px' }}>CONFIGURACIÓN</h3>
      <div className="list" style={{gap:'12px'}}>
        <label style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'center',background:'rgba(57,255,20,0.1)',border:'1px solid #39ff1433',borderRadius:'8px',padding:'12px'}}>
          <span style={{color:'#39ff14',fontWeight:'bold'}}>Música de fondo</span>
          <input type="checkbox" checked={musicOn} onChange={e=>setMusicOn(e.target.checked)} style={{transform:'scale(1.2)',accentColor:'#39ff14'}} />
        </label>
        {musicOn && (
          <div style={{background:'rgba(57,255,20,0.1)',border:'1px solid #39ff1433',borderRadius:'8px',padding:'12px'}}>
            <div style={{color:'#39ff14',fontWeight:'bold',marginBottom:'8px',display:'flex',alignItems:'center',gap:'8px'}}>
              Volumen: {Math.round(musicVolume * 100)}%
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={musicVolume} 
              onChange={e=>setMusicVolume(parseFloat(e.target.value))}
              style={{
                width:'100%',
                accentColor:'#39ff14',
                background:'transparent'
              }}
            />
          </div>
        )}
        <label style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'center',background:'rgba(57,255,20,0.1)',border:'1px solid #39ff1433',borderRadius:'8px',padding:'12px'}}>
          <span style={{color:'#39ff14',fontWeight:'bold'}}>Vibración</span>
          <input type="checkbox" checked={vibrateOn} onChange={e=>setVibrateOn(e.target.checked)} style={{transform:'scale(1.2)',accentColor:'#39ff14'}} />
        </label>
      </div>
    </div></div>
  );
}
function Auth({ onClose }){
  const [mode, setMode] = useState('login'); // 'login' o 'register'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Verificar sesión al abrir modal
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const result = await window.LUM_API.api('auth.php?action=check_session');
          if (result && result.success) {
            setIsLoggedIn(true);
            setUserInfo(result.user);
          }
        }
      } catch (e) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await window.LUM_API.api('auth.php?action=logout');
      window.location.reload();
    } catch (e) {
      setMessage('❌ Error al cerrar sesión');
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setMessage('❌ Rellena todos los campos');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const result = await window.LUM_API.api('auth.php?action=register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      });
      
      if (result.success) {
        setMessage('✅ ¡Registrado! Ahora inicia sesión');
        setMode('login');
        setPassword('');
      } else {
        setMessage('❌ ' + (result.message || 'Error en registro'));
      }
    } catch (e) {
      setMessage('❌ Error de conexión');
    }
    
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('❌ Rellena email y contraseña');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const result = await window.LUM_API.api('auth.php?action=login', {
        method: 'POST',
        body: JSON.stringify({ username: email, password })
      });
      
      if (result.success) {
        setMessage('✅ ¡Bienvenido!');
        setTimeout(() => {
          window.location.reload(); // Recargar para actualizar estado
        }, 500);
      } else {
        setMessage('❌ ' + (result.message || 'Credenciales incorrectas'));
      }
    } catch (e) {
      setMessage('❌ Error de conexión');
    }
    
    setLoading(false);
  };

  return (
    <div className="modal"><div className="card" style={{maxWidth:'420px',border:'2px solid #ff00ff',boxShadow:'0 0 20px #ff00ff44'}}>
      <button className="closer" onClick={onClose} style={{border:'2px solid #ff00ff',boxShadow:'0 0 10px #ff00ff',background:'#000'}}>✕</button>
      
      {isLoggedIn ? (
        // Usuario ya logueado - mostrar info y logout
        <>
          <h3 style={{ color: '#ff00ff', marginTop:0, marginBottom:12, textShadow:'0 0 10px #ff00ff, 0 0 20px #ff00ff', fontSize:'18px' }}>
            Mi cuenta
          </h3>
          <div className="list" style={{gap:12}}>
            {userInfo && (
              <div style={{background:'rgba(255,0,255,0.1)',border:'1px solid #ff00ff33',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
                <div style={{fontSize:12,opacity:0.6,marginBottom:4}}>Jugador</div>
                <div style={{fontSize:20,color:'#ff00ff',fontWeight:'bold',marginBottom:4}}>{userInfo.nick}</div>
                <div style={{fontSize:11,opacity:0.5,marginBottom:8}}>{userInfo.email}</div>
                {userInfo.fecha_registro && (
                  <div style={{fontSize:9,opacity:0.4}}>
                    Desde {new Date(userInfo.fecha_registro).toLocaleDateString('es-ES', {year: 'numeric', month: 'short', day: 'numeric'})}
                  </div>
                )}
              </div>
            )}
            
            <button 
              className="btn" 
              onClick={handleLogout}
              disabled={loading}
              style={{border:'2px solid #ff4466',color:'#ff4466',boxShadow:'0 0 10px #ff446644',fontWeight:'bold',width:'100%',opacity:loading?0.5:1}}
            >
              {loading ? 'Cerrando...' : 'Cerrar sesión'}
            </button>

            <div style={{fontSize:10,opacity:0.4,textAlign:'center',marginTop:8,lineHeight:1.4}}>
              ¿Eliminar cuenta?{' '}
              <a 
                href="mailto:info@intocables13.com?subject=Eliminar cuenta - Lumetrix&body=Solicito la eliminación de mi cuenta con el email: " 
                style={{color:'#ff00ff',textDecoration:'underline'}}
              >
                Contactar
              </a>
            </div>
          </div>
        </>
      ) : (
        // Usuario NO logueado - mostrar login/registro
        <>
          {/* Tabs */}
          <div style={{display:'flex',gap:8,marginBottom:16,borderBottom:'1px solid #ff00ff33',paddingBottom:8}}>
            <button 
              onClick={() => setMode('login')}
              style={{
                background: mode === 'login' ? 'rgba(255,0,255,0.2)' : 'transparent',
                border: 'none',
                color: mode === 'login' ? '#ff00ff' : '#ffffff66',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: mode === 'login' ? 'bold' : 'normal',
                fontSize: '14px'
              }}
            >
              Entrar
            </button>
            <button 
              onClick={() => setMode('register')}
              style={{
                background: mode === 'register' ? 'rgba(255,0,255,0.2)' : 'transparent',
                border: 'none',
                color: mode === 'register' ? '#ff00ff' : '#ffffff66',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: mode === 'register' ? 'bold' : 'normal',
                fontSize: '14px'
              }}
            >
              Crear cuenta
            </button>
          </div>

          <h3 style={{ color: '#ff00ff', marginTop:0, marginBottom:12, textShadow:'0 0 10px #ff00ff, 0 0 20px #ff00ff', fontSize:'18px' }}>
            {mode === 'login' ? 'Entrar con tu cuenta' : 'Crear nueva cuenta'}
          </h3>
      
      <div className="list" style={{gap:12}}>
        {mode === 'register' && (
          <input 
            placeholder="Nick" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ background:'rgba(255,0,255,0.1)', border:'2px solid #ff00ff33', borderRadius:10, padding:12, color:'#fff', boxShadow:'0 0 10px #ff00ff22', outline:'none' }} 
          />
        )}
        <input 
          placeholder="Email" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ background:'rgba(255,0,255,0.1)', border:'2px solid #ff00ff33', borderRadius:10, padding:12, color:'#fff', boxShadow:'0 0 10px #ff00ff22', outline:'none' }} 
        />
        <input 
          placeholder="Contraseña" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleRegister())}
          style={{ background:'rgba(255,0,255,0.1)', border:'2px solid #ff00ff33', borderRadius:10, padding:12, color:'#fff', boxShadow:'0 0 10px #ff00ff22', outline:'none' }} 
        />
        
        {message && (
          <div style={{fontSize:14,textAlign:'center',marginTop:4,color:message.includes('✅') ? '#39ff14' : '#ff4466'}}>
            {message}
          </div>
        )}
        
        <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:8}}>
          <button 
            className="btn btn1" 
            onClick={mode === 'login' ? handleLogin : handleRegister}
            disabled={loading}
            style={{border:'2px solid #39ff14',color:'#39ff14',boxShadow:'0 0 10px #39ff1444',fontWeight:'bold',opacity:loading?0.5:1}}
          >
            {loading ? 'Cargando...' : (mode === 'login' ? 'Entrar' : 'Crear cuenta')}
          </button>
          <button 
            className="btn" 
            onClick={onClose}
            disabled={loading}
            style={{border:'2px solid #00ffff',color:'#00ffff',boxShadow:'0 0 10px #00ffff44',fontWeight:'bold',opacity:loading?0.5:1}}
          >
            Cancelar
          </button>
        </div>
      </div>
        </>
      )}
    </div></div>
  );
}

// ---------------- App ----------------
export default function App(){
  useLumetrixStyles();
  const [screen, setScreen] = useState('intro');
  const [showRanking, setShowRanking] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.15);
  const [vibrateOn, setVibrateOn] = useState(true);
  const [level, setLevel] = useState(1);
  const [totalTime, setTotalTime] = useState(()=>{ try{ return Number(JSON.parse(localStorage.getItem('lum_total')||'0'))||0; }catch{return 0;} });

  // Cargar nivel guardado desde API al iniciar
  useEffect(() => {
    const loadProgress = async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const result = await window.LUM_API.api('auth.php?action=check_session');
          if (result && result.success) {
            // Cargar progreso del usuario
            const progreso = await window.LUM_API.api('game.php?action=get_progress');
            if (progreso && progreso.success && progreso.data) {
              const savedLevel = progreso.data.nivel_actual || 1;
              const savedTime = progreso.data.total_time_s || 0;
              setLevel(savedLevel);
              setTotalTime(savedTime);
              console.log(`Progreso cargado: Nivel ${savedLevel}, Tiempo ${savedTime}s`);
            }
          }
        }
      } catch (e) {
        console.log('Sin progreso guardado, empezando desde nivel 1');
      }
    };
    loadProgress();
  }, []);

  useEffect(()=>{ 
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help:'LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar' }); 
  }, []);

  // Función para iniciar un nivel específico
  const startLevel = (levelNum) => {
    setLevel(levelNum);
    // La función start se ejecutará automáticamente cuando cambie el level
  };

  return (
    <div className="shell">
      <div className="device">
        {screen==='intro' ? (
          <Intro onPlay={()=>setScreen('game')} onAuth={()=>setShowAuth(true)} />
        ) : (
          <Game level={level} setLevel={setLevel} soundOn={soundOn} musicOn={musicOn} musicVolume={musicVolume} vibrateOn={vibrateOn}
                onOpenAuth={()=>setShowAuth(true)} onOpenRanking={()=>setShowRanking(true)} onOpenOptions={()=>setShowOptions(true)}
                onTotalUpdate={setTotalTime} totalTime={totalTime} />
        )}

        {showRanking && <Ranking onClose={()=>setShowRanking(false)} total={totalTime} />}
        {showOptions && (
          <Options onClose={()=>setShowOptions(false)} onOpenAuth={()=>{ setShowOptions(false); setShowAuth(true); }}
                   level={level} setLevel={setLevel} soundOn={soundOn} musicOn={musicOn} vibrateOn={vibrateOn} setSoundOn={setSoundOn} setMusicOn={setMusicOn} setVibrateOn={setVibrateOn}
                   musicVolume={musicVolume} setMusicVolume={setMusicVolume}
                   onResetTotal={()=>{ try{ localStorage.removeItem('lum_total'); }catch{}; setTotalTime(0); }} />
        )}
        {showAuth && <Auth onClose={()=>setShowAuth(false)} />}
      </div>
    </div>
  );
}
