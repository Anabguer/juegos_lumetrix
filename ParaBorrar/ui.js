(function(){
  const qs = s => document.querySelector(s);
  const hide = id => { const el = document.getElementById(id); if (el) el.hidden = true; };
  const show = id => { const el = document.getElementById(id); if (el) el.hidden = false; };

  // Crear pantalla de login modal (solo cuando se necesite)
  function createLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'lum_loginModal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
      z-index: 1000;
    `;
    modal.innerHTML = `
      <div style="width:320px;max-width:90vw;background:#000;border:1px solid #ffffff33;border-radius:12px;padding:16px">
        <h3 style="margin:0 0 12px;color:#fff">Iniciar sesión</h3>
        <input id="lum_user" placeholder="Usuario o email" style="width:100%;margin:6px 0;padding:10px;border-radius:8px;border:1px solid #ffffff33;background:#000;color:#fff"/>
        <input id="lum_pass" placeholder="Contraseña" type="password" style="width:100%;margin:6px 0;padding:10px;border-radius:8px;border:1px solid #ffffff33;background:#000;color:#fff"/>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px">
          <button id="lum_doLogin" class="btn">Entrar</button>
          <button id="lum_closeModal" class="btn btn1">Cancelar</button>
        </div>
        <div id="lum_msg" style="color:#f99;margin-top:8px;font-size:12px"></div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  // Crear pantalla de registro modal
  function createRegisterModal() {
    const modal = document.createElement('div');
    modal.id = 'lum_registerModal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
      z-index: 1000;
    `;
    modal.innerHTML = `
      <div style="width:320px;max-width:90vw;background:#000;border:1px solid #ffffff33;border-radius:12px;padding:16px">
        <h3 style="margin:0 0 12px;color:#fff">Registrarse</h3>
        <input id="lum_reg_user" placeholder="Usuario" style="width:100%;margin:6px 0;padding:10px;border-radius:8px;border:1px solid #ffffff33;background:#000;color:#fff"/>
        <input id="lum_reg_email" placeholder="Email" type="email" style="width:100%;margin:6px 0;padding:10px;border-radius:8px;border:1px solid #ffffff33;background:#000;color:#fff"/>
        <input id="lum_reg_pass" placeholder="Contraseña" type="password" style="width:100%;margin:6px 0;padding:10px;border-radius:8px;border:1px solid #ffffff33;background:#000;color:#fff"/>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px">
          <button id="lum_doRegister" class="btn">Registrar</button>
          <button id="lum_closeRegModal" class="btn btn1">Cancelar</button>
        </div>
        <div id="lum_reg_msg" style="color:#f99;margin-top:8px;font-size:12px"></div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  async function init(){
    // Siempre mostrar el juego principal, no el login
    show('gameScreen'); 
    hide('loginScreen');
    
    // Verificar si hay sesión activa
    try { 
      const s = await window.LUM_AUTH.lum_check(); 
      if (s && s.success) {
        console.log('Usuario autenticado:', s.user);
      }
    } catch (e) {
      console.log('No hay sesión activa');
    }
  }

  document.addEventListener('click', async (e)=>{
    // Botón de login en el juego
    if (e.target && e.target.id === 'lum_showLogin') {
      createLoginModal();
    }
    
    // Botón de registro en el juego
    if (e.target && e.target.id === 'lum_showRegister') {
      createRegisterModal();
    }
    
    // Login desde modal
    if (e.target && e.target.id === 'lum_doLogin') {
      const u = (qs('#lum_user')||{}).value || '';
      const p = (qs('#lum_pass')||{}).value || '';
      const msg = qs('#lum_msg');
      try {
        const r = await window.LUM_AUTH.lum_login({username:u, password:p});
        if (r && r.success) { 
          msg && (msg.textContent=''); 
          const modal = qs('#lum_loginModal');
          if (modal) modal.remove();
          console.log('Login exitoso:', r.user);
        }
        else { 
          msg && (msg.textContent=(r && r.message) || 'Error de credenciales'); 
        }
      } catch { 
        msg && (msg.textContent='Fallo de red o servidor'); 
      }
    }
    
    // Registro desde modal
    if (e.target && e.target.id === 'lum_doRegister') {
      const u = (qs('#lum_reg_user')||{}).value || '';
      const e = (qs('#lum_reg_email')||{}).value || '';
      const p = (qs('#lum_reg_pass')||{}).value || '';
      const msg = qs('#lum_reg_msg');
      try {
        const r = await window.LUM_AUTH.lum_register({username:u, email:e, password:p});
        if (r && r.success) { 
          msg && (msg.textContent='Registro exitoso'); 
          const modal = qs('#lum_registerModal');
          if (modal) modal.remove();
          console.log('Registro exitoso:', r.user);
        }
        else { 
          msg && (msg.textContent=(r && r.message) || 'Error en el registro'); 
        }
      } catch { 
        msg && (msg.textContent='Fallo de red o servidor'); 
      }
    }
    
    // Cerrar modales
    if (e.target && e.target.id === 'lum_closeModal') {
      const modal = qs('#lum_loginModal');
      if (modal) modal.remove();
    }
    
    if (e.target && e.target.id === 'lum_closeRegModal') {
      const modal = qs('#lum_registerModal');
      if (modal) modal.remove();
    }
  });

  init();
})();
