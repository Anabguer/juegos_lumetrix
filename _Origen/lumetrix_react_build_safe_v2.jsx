import React, { useEffect, useMemo, useRef, useState } from "react";

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
function tilesFor(level){
  const world = Math.floor((level-1)/10) + 1;
  const idx = ((level-1)%10) + 1;
  const M1 = [4,4,5,5,6,6,7,8,9,9];
  const M2 = M1.map(n=>n+1); // mundo 2 sube +1 ficha
  const table = world===1?M1:M2;
  return table[idx-1] || 9;
}
function timeFor(level){
  const base = 35; const min = 20; const dec = Math.floor((level-1)/2);
  return Math.max(min, base - dec);
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

// ---------------- Sonido (WebAudio) ----------------
function useSFX(enabled){
  const ctxRef = useRef(null);
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
  return {
    start: ()=>tone(600,0.1,'triangle',0.06),
    ok:    (f)=>tone(f||880,0.1,'triangle',0.07),
    fail:  ()=>tone(260,0.12,'sine',0.045), // suave "meck"
    blink: (f)=>tone(f||720,0.08,'sine',0.05),
    // Victoria: siempre trozo corto (5–6 notas) + retraso 300ms
    winMelody: (arr)=>{ const short=(arr&&arr.length?arr.slice(0,6):[659.25,880.0,1046.5]); setTimeout(()=>playMelody(short,0.12,0.04), 300); },
  };
}
function vibrate(ms, enabled){ try{ if(enabled && navigator.vibrate) navigator.vibrate(ms); }catch{} }

// ---------------- CSS (inyección) ----------------
function useLumetrixStyles(){
  useEffect(()=>{
    const id='lumetrix-css'; if(document.getElementById(id)) return;
    const tag=document.createElement('style'); tag.id=id; tag.textContent=`
      :root{ --bg:#000; --fg:#e5e7eb; --muted:#9ca3af; --neon1:#ff2fbf; --neon2:#00e5ff; --accent:#39ff14; }
      *{box-sizing:border-box}
      html,body,#root{height:100%}
      body{margin:0;background:#000;color:#fff}
      .shell{min-height:100svh;display:flex;align-items:stretch;justify-content:center}
      .device{width:min(390px,100vw);height:100svh;background:#000;position:relative;overflow:hidden}
      @media (min-width:768px){.shell{padding:24px}.device{height:844px;border-radius:24px;border:1px solid #ffffff1a;box-shadow:0 0 0 8px #ffffff08}}
      .screen{position:absolute;inset:0}
      /* Intro */
      .introWrap{position:relative;height:100%;display:flex;align-items:center;justify-content:center;padding:0 12px}
      .introBg{position:absolute;inset:0}
      .introBg i{position:absolute;border-radius:10px;opacity:.6;filter:blur(.5px)}
      .panel{position:relative;z-index:2;width:100%;max-width:360px;border-radius:16px;padding:16px;background:#ffffff22;border:1px solid #ffffff4d;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 0 22px rgba(0,0,0,.55)}
      .logo{font-weight:900;text-align:center;margin:0 0 6px;letter-spacing:.18em;line-height:1}
      .logo span{display:inline-block;background:linear-gradient(90deg,var(--neon1),var(--neon2));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 8px #ff2fbf59,0 0 12px #00e5ff47}
      .actions{display:flex;gap:8px;justify-content:center}
      .btn{appearance:none;border-radius:12px;border:1px solid #ffffff44;background:transparent;color:#fff;font-weight:700;padding:10px 14px;cursor:pointer}
      .btn1{border-color:#f0abfc99;color:#f0abfc}.btn1:hover{background:#ff2fbf22}
      .btn2{border-color:#7dd3fc99;color:#7dd3fc}.btn2:hover{background:#00e5ff22}
      .copy{position:absolute;left:0;right:0;bottom:8px;text-align:center;color:#ffffffb3;font-size:10px}
      /* HUD / Board */
      .topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 10px}
      .brand{font-size:18px;font-weight:800;background:linear-gradient(90deg,var(--neon1),var(--neon2));-webkit-background-clip:text;background-clip:text;color:transparent}
      .icons{display:flex;gap:12px}
      .icon{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;color:#fff;border:none;background:transparent;cursor:pointer}
      .hud{display:flex;align-items:center;gap:8px;padding:0 10px}
      .meta{display:flex;align-items:center;gap:6px;margin-left:4px;font-size:11px;opacity:.9}
      .chip{border:1px solid #ffffff33;border-radius:999px;padding:2px 8px;background:#ffffff10;box-shadow:0 0 4px #ffffff16}
      .meta .chip b{font-weight:700}
      .timebar{flex:1;height:12px;border-radius:999px;border:1px solid var(--accent);box-shadow:0 0 6px #ffffff22, 0 0 12px var(--accent)}
      .timefill{display:block;height:8px;margin:2px;border-radius:999px;background:linear-gradient(90deg,var(--accent),#fff);box-shadow:0 0 8px var(--accent);width:100%}
      .board{position:relative;margin:10px;border-radius:16px;border:2px solid var(--accent);box-shadow:0 0 12px var(--accent);height:calc(100% - 120px);overflow:hidden}
      .tile{position:absolute;border-radius:12px;border:1px solid #ffffff2f;z-index:1;touch-action:manipulation;transition:filter .12s ease, transform .06s ease;cursor:pointer}
      .tile:active{transform:scale(.985)}
      .lit{box-shadow:0 0 10px var(--accent), 0 0 18px var(--accent); filter:brightness(1.18)}
      .overlay{position:absolute;inset:0;display:grid;place-items:center;z-index:2}
      .modal{position:fixed;inset:0;background:#000c;display:flex;align-items:center;justify-content:center;z-index:50}
      .card{position:relative;width:320px;max-width:90vw;background:#000;border:1px solid #ffffff1f;border-radius:14px;box-shadow:0 0 12px #ff2fbf55;color:#fff;padding:16px}
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
    `;
    document.head.appendChild(tag);
    return ()=>{ try{ document.head.removeChild(tag); }catch{} };
  },[]);
}

// ---------------- Intro ----------------
function Intro({ onPlay, onAuth }){
  const bgRef = useRef(null); const logoRef = useRef(null);
  useEffect(()=>{ const bg=bgRef.current; if(!bg) return; const spawn=()=>{ const i=document.createElement('i'); const w=28+Math.random()*18, h=60+Math.random()*40; i.style.left=Math.random()*100+'%'; i.style.top=Math.random()*100+'%'; i.style.width=w+'px'; i.style.height=h+'px'; const hue=Math.floor(Math.random()*360); i.style.background=`hsl(${hue} 95% 55% / .85)`; bg.appendChild(i); setTimeout(()=>i.remove(), 2400); }; const t=setInterval(spawn, 120); return ()=>clearInterval(t); },[]);
  useEffect(()=>{ const fit=()=>{ const el=logoRef.current; if(!el) return; const panel=el.parentElement?.parentElement; if(!panel) return; el.style.fontSize=''; let size=Math.min(42, Math.max(28, Math.floor(panel.clientWidth*0.16))); el.style.fontSize=size+'px'; el.style.letterSpacing='0.16em'; let loops=0; while(el.scrollWidth>panel.clientWidth-24 && loops<20){ size-=1; el.style.fontSize=size+'px'; loops++; } }; fit(); const ro=new ResizeObserver(fit); ro.observe(document.body); return ()=>ro.disconnect(); },[]);
  return (
    <section className="screen intro">
      <div className="introWrap">
        <div className="introBg" ref={bgRef} />
        <div className="panel">
          <h1 className="logo"><span ref={logoRef}>LUMETRIX</span></h1>
          <div style={{textAlign:'center',fontSize:12,opacity:.9,marginBottom:8}}>Esto no es un Simón: es el <b>anti‑Simón</b>. Encuentra la secuencia y pinta <b>todas</b> las piezas del color del borde.</div>
          <div className="actions">
            <button className="btn btn1" onClick={onPlay}>Jugar</button>
            <button className="btn btn2" onClick={onAuth}>Identificarse</button>
          </div>
        </div>
        <div className="copy">© @intocables13 · Todos los derechos reservados</div>
      </div>
    </section>
  );
}

// ---------------- Game ----------------
function Game({ level, setLevel, soundOn, vibrateOn, onOpenAuth, onOpenRanking, onOpenOptions, onTotalUpdate, totalTime: totalProp }){
  const boardRef = useRef(null);
  const [time, setTime] = useState(timeFor(level));
  const [running, setRunning] = useState(false);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [totalTime, setTotalTime] = useState(()=>{ try{ return Number(JSON.parse(localStorage.getItem('lum_total')||'0'))||0; }catch{return 0;} });
  useEffect(()=>{ if(typeof totalProp === 'number') setTotalTime(totalProp); }, [totalProp]);

  const SFX = useSFX(soundOn);
  const world = Math.floor((level-1)/10) + 1;
  const levelInWorld = ((level-1)%10) + 1;
  const accent = useMemo(()=> colorForLevel(level), [level]);

  const seqRef = useRef([]);
  const stepRef = useRef(0);
  const timerRef = useRef(null);
  const runningRef = useRef(false);
  const startTimeRef = useRef(0);
  const melodyRef = useRef([]);
  const paintRef = useRef(accent);
  const endedRef = useRef(false);

  useEffect(()=>{ const root=boardRef.current?.closest('.device'); if(root) root.style.setProperty('--accent', accent); },[accent]);

  const saveTotal=(secs)=>{ try{ const prev=Number(JSON.parse(localStorage.getItem('lum_total')||'0'))||0; const next=prev+secs; localStorage.setItem('lum_total', JSON.stringify(next)); setTotalTime(next); if (typeof onTotalUpdate === 'function') onTotalUpdate(next); }catch{} };

  function placeTiles(n){
    const board = boardRef.current; if(!board) return;
    board.querySelectorAll('.tile, .dropzone').forEach(e=>e.remove());
    const rect = board.getBoundingClientRect(); const W=rect.width, H=rect.height;
    const rand=(min,max)=>Math.random()*(max-min)+min;

    const baseHue = ACCENT_HUE[paintRef.current || accent] ?? 0;
    const farHue = ()=>{ let hue=Math.floor(Math.random()*360), tries=0; while(Math.min(Math.abs(hue-baseHue), 360-Math.abs(hue-baseHue))<30 && tries++<120){ hue=Math.floor(Math.random()*360);} return hue; };

    const placed=[];
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
      Object.assign(b.style,{ left:x+'px', top:y+'px', width:w+'px', height:h+'px', background:`hsl(${farHue()} 96% 58%)` });
      // blindaje extra: si por casualidad coincide exactamente con el color de nivel, vira 180º
      if (b.style.background === (paintRef.current || accent)) {
        const alt = (((ACCENT_HUE[paintRef.current || accent] || 0) + 180) % 360);
        b.style.background = `hsl(${alt} 96% 58%)`;
      }
      b.dataset.id=String(i);
      b.dataset.orig=b.style.background;
      const m=melodyRef.current||[]; b.dataset.pitch=String((m[i % m.length])||660);
      board.appendChild(b);
    }

    // Delegación única (funciona móvil/desktop, sin doble evento)
    if(board.__lumDeleg){ board.removeEventListener('pointerdown', board.__lumDeleg); }
    const deleg=(e)=>{
      const el=e.target && e.target.closest && e.target.closest('.tile');
      if(!el || !board.contains(el) || !runningRef.current) return;
      e.preventDefault && e.preventDefault();
      const id=Number(el.dataset.id);
      tap(id);
    };
    board.addEventListener('pointerdown', deleg, {passive:false});
    board.__lumDeleg=deleg;
  }

  function blink(id){ const b=boardRef.current; const el=b && b.querySelector(`.tile[data-id="${id}"]`); if(!el) return; const prev=el.style.background; el.classList.add('lit'); el.style.background = (paintRef.current || accent); SFX.blink(parseFloat(el.dataset.pitch||'720')); setTimeout(()=>{ el.classList.remove('lit'); el.style.background=prev; }, 260); }
  function hint(){ const s=seqRef.current; if(s && s.length) blink(s[0]); }
  function resetTiles(){ const b=boardRef.current; if(!b) return; b.querySelectorAll('.tile').forEach((el)=>{ el.style.background=el.dataset.orig||el.style.background; el.classList.remove('lit'); }); }

  function start(nextLevelArg){
    const lv = (typeof nextLevelArg === 'number' ? nextLevelArg : level);
    const root = boardRef.current?.closest('.device');
    paintRef.current = colorForLevel(lv);
    if (root) root.style.setProperty('--accent', paintRef.current);

    setWin(false); setLose(false); endedRef.current = false;
    if(timerRef.current) clearInterval(timerRef.current);
    const n=tilesFor(lv);
    seqRef.current = Array.from({length:n},(_,i)=>i).sort(()=>Math.random()-0.5);
    stepRef.current = 0;
    melodyRef.current = MELODIES[Math.floor(Math.random()*MELODIES.length)] || [440,494,523,587,659,698,784,880,988,1046,1174,1318,1396,1567,1760];
    placeTiles(n);

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
        }
        clearInterval(timerRef.current);
        setRunning(false); runningRef.current=false; setLose(true); SFX.fail(); resetTiles();
      }
    },100);

    setTimeout(hint, 700);
  }

  function tap(id){
    if(!runningRef.current) return; const expected=seqRef.current[stepRef.current];
    const board=boardRef.current;
    if(id===expected){ const el=board && board.querySelector(`.tile[data-id="${id}"]`); if(el){ const pitch = parseFloat(el.dataset.pitch||'880'); el.style.background = (paintRef.current || accent); el.classList.remove('lit'); SFX.ok(pitch); vibrate(20, vibrateOn); } stepRef.current++; if(stepRef.current>=seqRef.current.length){
        if(!endedRef.current){
          endedRef.current = true;
          const spent = Math.ceil((Date.now()-startTimeRef.current)/1000);
          saveTotal(spent);
        }
        if (timerRef.current) { clearInterval(timerRef.current); }
        setRunning(false); runningRef.current=false; setWin(true);
        try { SFX.winMelody((melodyRef.current||[]).slice(0,6)); } catch {}
      } }
    else {
      SFX.fail(); vibrate(80, vibrateOn);
      stepRef.current=0; resetTiles();
    }
  }

  function nextLevel(){
    setWin(false); setLose(false);
    const nl = level + 1;
    setLevel(nl);
    setTimeout(()=>start(nl), 0);
  }

  useEffect(()=>{ window.LumetrixTest = { start, state:()=>({level,world,levelInWorld,running,time,seqLen:(seqRef.current||[]).length}), tapExpected:()=>{ const id=seqRef.current[stepRef.current]; if(id!=null) tap(id); } }; },[level,world,levelInWorld,running,time]);

  return (
    <section className="screen">
      <div className="topbar">
        <div className="brand">LUMETRIX</div>
        <div className="icons">
          <button className="icon" onClick={onOpenRanking} aria-label="Ranking">🏆</button>
          <button className="icon" onClick={onOpenOptions} aria-label="Opciones">⚙️</button>
          <button className="icon" onClick={onOpenAuth} aria-label="Login">👤</button>
        </div>
      </div>
      <div className="hud">
        <div className="timebar"><i className="timefill" style={{ width: `${Math.max(0, Math.min(100, (time / timeFor(level)) * 100))}%` }} /></div>
        <div className="meta">
          <span className="chip">W<b>{world}</b></span>
          <span className="chip">N<b>{levelInWorld}</b></span>
          <span className="chip">⏱<b>{totalTime}s</b></span>
        </div>
      </div>
      <div className="board" ref={boardRef}>
        {!running && !win && !lose && (<div className="overlay"><button className="btn btn1" onClick={()=>start()}>Empezar</button></div>)}
        {win && (
          <div className="overlay">
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:32, marginBottom:8, textShadow:'0 0 10px var(--neon2), 0 0 20px var(--neon2)'}}>✨</div>
              <h3 style={{color:'var(--neon2)', marginBottom:12}}>¡Nivel superado!</h3>
              <button className="btn btn1" onClick={nextLevel}>Siguiente</button>
            </div>
          </div>
        )}
        {lose && (
          <div className="overlay">
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:32, marginBottom:8, textShadow:'0 0 10px var(--neon1), 0 0 20px var(--neon1)'}}>💔</div>
              <h3 style={{color:'var(--neon1)', marginBottom:12}}>Tiempo agotado</h3>
              <button className="btn btn1" onClick={()=>start()}>Reintentar</button>
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
  return (
    <div className="modal"><div className="card">
      <button className="closer" onClick={onClose}>✕</button>
      <h3 style={{ color: 'var(--neon2)', marginTop:0 }}>Ranking (demo)</h3>
      <div className="list"><div>Tu tiempo acumulado: <b>{total}s</b></div></div>
    </div></div>
  );
}
function Options({ onClose, onOpenAuth, level, setLevel, soundOn, vibrateOn, setSoundOn, setVibrateOn, onResetTotal }){
  return (
    <div className="modal"><div className="card">
      <button className="closer" onClick={onClose}>✕</button>
      <h3 style={{ color: 'var(--neon2)', marginTop:0 }}>Opciones</h3>
      <div className="list">
        <label style={{display:'flex',justifyContent:'space-between',gap:8}}><span>Sonido</span><input type="checkbox" checked={soundOn} onChange={e=>setSoundOn(e.target.checked)} /></label>
        <label style={{display:'flex',justifyContent:'space-between',gap:8}}><span>Vibración</span><input type="checkbox" checked={vibrateOn} onChange={e=>setVibrateOn(e.target.checked)} /></label>
        <label style={{display:'flex',justifyContent:'space-between',gap:8}}>
          <span>Ir a nivel</span>
          <input type="number" min={1} max={20} value={level} onChange={e=>setLevel(Math.max(1, Math.min(20, Number(e.target.value)||1)))} style={{width:88, background:'#000', color:'#fff', border:'1px solid #ffffff33', borderRadius:8, padding:6}} />
        </label>
        <button className="btn" onClick={onOpenAuth}>Identificarse</button>
        <button className="btn" onClick={()=>{ if(confirm('¿Reiniciar el tiempo total acumulado?')) onResetTotal && onResetTotal(); }}>Reiniciar tiempo total</button>
      </div>
    </div></div>
  );
}
function Auth({ onClose }){
  return (
    <div className="modal"><div className="card">
      <button className="closer" onClick={onClose}>✕</button>
      <h3 style={{ color: 'var(--neon2)', marginTop:0 }}>Identificarse</h3>
      <div className="list">
        <input placeholder="Email" style={{ background:'#000', border:'1px solid #ffffff33', borderRadius:10, padding:8, color:'#fff' }} />
        <input placeholder="Contraseña" type="password" style={{ background:'#000', border:'1px solid #ffffff33', borderRadius:10, padding:8, color:'#fff' }} />
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn1">Login</button>
          <button className="btn" onClick={onClose}>Cancelar</button>
        </div>
      </div>
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
  const [vibrateOn, setVibrateOn] = useState(true);
  const [level, setLevel] = useState(1);
  const [totalTime, setTotalTime] = useState(()=>{ try{ return Number(JSON.parse(localStorage.getItem('lum_total')||'0'))||0; }catch{return 0;} });

  useEffect(()=>{ window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help:'LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar' }); },[]);

  return (
    <div className="shell">
      <div className="device">
        {screen==='intro' ? (
          <Intro onPlay={()=>setScreen('game')} onAuth={()=>setShowAuth(true)} />
        ) : (
          <Game level={level} setLevel={setLevel} soundOn={soundOn} vibrateOn={vibrateOn}
                onOpenAuth={()=>setShowAuth(true)} onOpenRanking={()=>setShowRanking(true)} onOpenOptions={()=>setShowOptions(true)}
                onTotalUpdate={setTotalTime} totalTime={totalTime} />
        )}

        {showRanking && <Ranking onClose={()=>setShowRanking(false)} total={totalTime} />}
        {showOptions && (
          <Options onClose={()=>setShowOptions(false)} onOpenAuth={()=>{ setShowOptions(false); setShowAuth(true); }}
                   level={level} setLevel={setLevel} soundOn={soundOn} vibrateOn={vibrateOn} setSoundOn={setSoundOn} setVibrateOn={setVibrateOn}
                   onResetTotal={()=>{ try{ localStorage.removeItem('lum_total'); }catch{}; setTotalTime(0); }} />
        )}
        {showAuth && <Auth onClose={()=>setShowAuth(false)} />}
      </div>
    </div>
  );
}
