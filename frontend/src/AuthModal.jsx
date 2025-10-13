import React, { useState } from 'react';
import VerificationModal from './VerificationModal';

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' o 'register'
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const handleRegister = async () => {
    if (!nombre.trim() || !username.trim() || !email.trim() || !password.trim()) {
      setMessage('Todos los campos son requeridos');
      return;
    }

    if (!email.includes('@')) {
      setMessage('Email inválido');
      return;
    }

    if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await window.LUM_API.api('auth.php?action=register', {
        method: 'POST',
        body: JSON.stringify({ 
          nombre: nombre.trim(),
          username: username.trim(),
          email: email.trim(), 
          password: password 
        })
      });

      if (result && result.success) {
        setMessage('✅ ' + result.message);
        setPendingEmail(email.trim());
        setShowVerification(true);
      } else {
        setMessage('❌ ' + (result?.error || 'Error en el registro'));
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setMessage('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage('Email y contraseña requeridos');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await window.LUM_API.api('auth.php?action=login', {
        method: 'POST',
        body: JSON.stringify({ 
          username: email.trim(), 
          password: password 
        })
      });

      if (result && result.success) {
        // Guardar credenciales para auto-login
        localStorage.setItem('lum_user_email', email.trim());
        localStorage.setItem('lum_user_token', btoa(password));
        
        setMessage('✅ Login exitoso');
        setTimeout(() => {
          onLoginSuccess(result.user);
          onClose();
        }, 1000);
      } else {
        setMessage('❌ ' + (result?.error || 'Credenciales incorrectas'));
      }
    } catch (error) {
      console.error('Error en login:', error);
      setMessage('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    setMessage('✅ ¡Cuenta verificada! Ahora puedes hacer login');
    setShowVerification(false);
    setMode('login');
    // Pre-llenar el email en el login
    setEmail(pendingEmail);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (mode === 'login') {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #000 0%, #111 50%, #000 100%)',
          border: '2px solid #ff00ff',
          borderRadius: '16px',
          padding: '30px',
          maxWidth: '420px',
          width: '100%',
          color: '#fff',
          fontFamily: 'Tektur, sans-serif',
          boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: '2px solid #ff00ff',
              color: '#ff00ff',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            borderBottom: '1px solid #ff00ff33',
            paddingBottom: '8px'
          }}>
            <button 
              onClick={() => setMode('login')}
              style={{
                background: mode === 'login' ? 'rgba(255,0,255,0.2)' : 'transparent',
                border: 'none',
                color: mode === 'login' ? '#ff00ff' : '#ffffff66',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: mode === 'login' ? 'bold' : 'normal',
                fontSize: '14px',
                borderRadius: '8px'
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
                fontSize: '14px',
                borderRadius: '8px'
              }}
            >
              Crear cuenta
            </button>
          </div>

          <h3 style={{ 
            color: '#ff00ff', 
            marginTop: 0, 
            marginBottom: '20px', 
            textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff', 
            fontSize: '18px',
            textAlign: 'center'
          }}>
            {mode === 'login' ? 'Entrar con tu cuenta' : 'Crear nueva cuenta'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mode === 'register' && (
              <>
                <input 
                  placeholder="Nombre completo" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={{ 
                    background: 'rgba(255,0,255,0.1)', 
                    border: '2px solid #ff00ff33', 
                    borderRadius: '10px', 
                    padding: '12px', 
                    color: '#fff', 
                    boxShadow: '0 0 10px #ff00ff22', 
                    outline: 'none',
                    fontSize: '14px'
                  }} 
                />
                <input 
                  placeholder="Nick (nombre de usuario)" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ 
                    background: 'rgba(255,0,255,0.1)', 
                    border: '2px solid #ff00ff33', 
                    borderRadius: '10px', 
                    padding: '12px', 
                    color: '#fff', 
                    boxShadow: '0 0 10px #ff00ff22', 
                    outline: 'none',
                    fontSize: '14px'
                  }} 
                />
              </>
            )}
            
            <input 
              placeholder="Email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                background: 'rgba(255,0,255,0.1)', 
                border: '2px solid #ff00ff33', 
                borderRadius: '10px', 
                padding: '12px', 
                color: '#fff', 
                boxShadow: '0 0 10px #ff00ff22', 
                outline: 'none',
                fontSize: '14px'
              }} 
            />
            
            <input 
              placeholder="Contraseña" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ 
                background: 'rgba(255,0,255,0.1)', 
                border: '2px solid #ff00ff33', 
                borderRadius: '10px', 
                padding: '12px', 
                color: '#fff', 
                boxShadow: '0 0 10px #ff00ff22', 
                outline: 'none',
                fontSize: '14px'
              }} 
            />
            
            {message && (
              <div style={{
                fontSize: '14px',
                textAlign: 'center',
                marginTop: '4px',
                color: message.includes('✅') ? '#39ff14' : '#ff4466',
                padding: '8px',
                borderRadius: '8px',
                background: message.includes('✅') 
                  ? 'rgba(57, 255, 20, 0.1)' 
                  : 'rgba(255, 68, 102, 0.1)',
                border: `1px solid ${message.includes('✅') ? '#39ff14' : '#ff4466'}`
              }}>
                {message}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
              <button 
                onClick={mode === 'login' ? handleLogin : handleRegister}
                disabled={loading}
                style={{
                  border: '2px solid #39ff14',
                  color: '#39ff14',
                  boxShadow: '0 0 10px #39ff1444',
                  fontWeight: 'bold',
                  opacity: loading ? 0.5 : 1,
                  background: 'rgba(57, 255, 20, 0.1)',
                  border: '2px solid #39ff14',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                {loading ? 'Cargando...' : (mode === 'login' ? 'Entrar' : 'Crear cuenta')}
              </button>
              <button 
                onClick={onClose}
                disabled={loading}
                style={{
                  border: '2px solid #00ffff',
                  color: '#00ffff',
                  boxShadow: '0 0 10px #00ffff44',
                  fontWeight: 'bold',
                  opacity: loading ? 0.5 : 1,
                  background: 'transparent',
                  border: '2px solid #00ffff',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de verificación */}
      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        email={pendingEmail}
        onVerificationSuccess={handleVerificationSuccess}
      />
    </>
  );
}

export default AuthModal;
