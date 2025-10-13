import React, { useState, useEffect } from 'react';

function VerificationModal({ isOpen, onClose, email, onVerificationSuccess }) {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 horas en segundos

  // Contador de tiempo
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerificar = async () => {
    if (codigo.length !== 6) {
      setMessage('El código debe tener 6 dígitos');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await window.LUM_API.api('auth.php?action=verify_code', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          codigo: codigo
        })
      });

      if (response && response.success) {
        setMessage('✅ ¡Cuenta verificada correctamente!');
        setTimeout(() => {
          onVerificationSuccess();
          onClose();
        }, 1500);
      } else {
        setMessage(response?.error || 'Error verificando el código');
      }
    } catch (error) {
      console.error('Error verificando código:', error);
      setMessage('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReenviar = async () => {
    setResendLoading(true);
    setMessage('');

    try {
      const response = await window.LUM_API.api('auth.php?action=resend_code', {
        method: 'POST',
        body: JSON.stringify({
          email: email
        })
      });

      if (response && response.success) {
        setMessage('✅ Código reenviado a tu email');
        setTimeLeft(24 * 60 * 60); // Reset timer
      } else {
        setMessage(response?.error || 'Error reenviando el código');
      }
    } catch (error) {
      console.error('Error reenviando código:', error);
      setMessage('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerificar();
    }
  };

  if (!isOpen) return null;

  return (
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
        border: '2px solid #39ff14',
        borderRadius: '16px',
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
        color: '#fff',
        fontFamily: 'Tektur, sans-serif',
        boxShadow: '0 0 30px rgba(57, 255, 20, 0.3)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: '1px solid #39ff14',
            color: '#39ff14',
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

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{
            color: '#39ff14',
            margin: '0 0 10px 0',
            fontSize: '24px',
            fontWeight: 'bold',
            textShadow: '0 0 10px #39ff14'
          }}>
            🔐 Verificar Email
          </h2>
          <p style={{ margin: '0', opacity: 0.8, fontSize: '14px' }}>
            Hemos enviado un código a:<br/>
            <strong style={{ color: '#00ffff' }}>{email}</strong>
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={codigo}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setCodigo(value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="123456"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              letterSpacing: '0.2em',
              background: 'rgba(57, 255, 20, 0.1)',
              border: '2px solid #39ff14',
              borderRadius: '12px',
              color: '#39ff14',
              outline: 'none',
              boxShadow: '0 0 10px rgba(57, 255, 20, 0.3)'
            }}
          />
        </div>

        {timeLeft > 0 && (
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#ff00ff'
          }}>
            ⏰ Expira en: <strong>{formatTime(timeLeft)}</strong>
          </div>
        )}

        {message && (
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '14px',
            background: message.includes('✅') 
              ? 'rgba(57, 255, 20, 0.1)' 
              : 'rgba(255, 0, 0, 0.1)',
            border: `1px solid ${message.includes('✅') ? '#39ff14' : '#ff4466'}`,
            color: message.includes('✅') ? '#39ff14' : '#ff4466'
          }}>
            {message}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <button
            onClick={handleVerificar}
            disabled={loading || codigo.length !== 6}
            style={{
              width: '100%',
              padding: '15px',
              background: 'rgba(57, 255, 20, 0.1)',
              border: '2px solid #39ff14',
              borderRadius: '12px',
              color: '#39ff14',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading || codigo.length !== 6 ? 'not-allowed' : 'pointer',
              opacity: loading || codigo.length !== 6 ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Verificando...' : 'Verificar Código'}
          </button>

          <button
            onClick={handleReenviar}
            disabled={resendLoading}
            style={{
              width: '100%',
              padding: '10px',
              background: 'transparent',
              border: '1px solid #00ffff',
              borderRadius: '8px',
              color: '#00ffff',
              fontSize: '14px',
              cursor: resendLoading ? 'not-allowed' : 'pointer',
              opacity: resendLoading ? 0.5 : 1
            }}
          >
            {resendLoading ? 'Reenviando...' : 'Reenviar Código'}
          </button>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
          opacity: 0.6
        }}>
          Si no recibes el email, revisa tu carpeta de spam
        </div>
      </div>
    </div>
  );
}

export default VerificationModal;
