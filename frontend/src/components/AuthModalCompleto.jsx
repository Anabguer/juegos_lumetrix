import React, { useState } from 'react';
import './AuthModalCompleto.css';

const AuthModalCompleto = ({ isOpen, onClose, onLoginSuccess }) => {
    const [mode, setMode] = useState('login'); // login, register, verify, forgot, reset
    const [formData, setFormData] = useState({
        nombre: '',
        username: '',
        email: '',
        password: '',
        codigo: '',
        new_password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            let endpoint = '';
            let data = {};

            switch (mode) {
                case 'register':
                    endpoint = 'auth_completo.php?action=register';
                    data = {
                        nombre: formData.nombre,
                        username: formData.username,
                        email: formData.email,
                        password: formData.password
                    };
                    break;

                case 'verify':
                    endpoint = 'auth_completo.php?action=verify_code';
                    data = {
                        email: formData.email,
                        codigo: formData.codigo
                    };
                    break;

                case 'login':
                    endpoint = 'auth_completo.php?action=login';
                    data = {
                        username: formData.username,
                        password: formData.password
                    };
                    break;

                case 'forgot':
                    endpoint = 'auth_completo.php?action=forgot_password';
                    data = {
                        email: formData.email
                    };
                    break;

                case 'reset':
                    endpoint = 'auth_completo.php?action=reset_password';
                    data = {
                        email: formData.email,
                        codigo: formData.codigo,
                        new_password: formData.new_password
                    };
                    break;

                default:
                    throw new Error('Modo no válido');
            }

            // Usar CapacitorHttp si está disponible (APK), fetch si no (web)
            let response;
            if (window.Capacitor && window.CapacitorHttp) {
                const { CapacitorHttp } = window.Capacitor.Plugins;
                response = await CapacitorHttp.request({
                    url: `https://colisan.com/sistema_apps_upload/lumetrix/${endpoint}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                });
                response = response.data;
            } else {
                response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                response = await response.json();
            }

            if (response.success) {
                setMessage(response.message);

                // Manejar diferentes casos de éxito
                switch (mode) {
                    case 'register':
                        setMode('verify');
                        setFormData(prev => ({ ...prev, codigo: '' }));
                        break;

                    case 'verify':
                        setMode('login');
                        setMessage('¡Cuenta verificada! Ahora puedes hacer login.');
                        break;

                    case 'login':
                        onLoginSuccess(response.user);
                        onClose();
                        break;

                    case 'forgot':
                        setMode('reset');
                        setFormData(prev => ({ ...prev, codigo: '' }));
                        break;

                    case 'reset':
                        setMode('login');
                        setMessage('Contraseña cambiada exitosamente. Ahora puedes hacer login.');
                        break;
                }
            } else {
                setError(response.message || response.error || 'Error desconocido');
            }
        } catch (err) {
            setError('Error de conexión: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!formData.email) {
            setError('Email es requerido para reenviar código');
            return;
        }

        setLoading(true);
        try {
            let response;
            if (window.Capacitor && window.CapacitorHttp) {
                const { CapacitorHttp } = window.Capacitor.Plugins;
                response = await CapacitorHttp.request({
                    url: 'https://colisan.com/sistema_apps_upload/lumetrix/auth_completo.php?action=resend_code',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: { email: formData.email }
                });
                response = response.data;
            } else {
                response = await fetch('auth_completo.php?action=resend_code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: formData.email })
                });
                response = await response.json();
            }

            if (response.success) {
                setMessage('Código reenviado. Revisa tu email.');
            } else {
                setError(response.message || response.error);
            }
        } catch (err) {
            setError('Error al reenviar código');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            username: '',
            email: '',
            password: '',
            codigo: '',
            new_password: ''
        });
        setError('');
        setMessage('');
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        resetForm();
    };

    if (!isOpen) return null;

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <div className="auth-modal-header">
                    <h2>
                        {mode === 'login' && '🎮 Iniciar Sesión'}
                        {mode === 'register' && '📝 Registrarse'}
                        {mode === 'verify' && '📧 Verificar Email'}
                        {mode === 'forgot' && '🔐 Recuperar Contraseña'}
                        {mode === 'reset' && '🔑 Nueva Contraseña'}
                    </h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="auth-modal-body">
                    {message && <div className="message success">{message}</div>}
                    {error && <div className="message error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        {/* Registro */}
                        {mode === 'register' && (
                            <>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Nombre completo"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Nombre de usuario"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña (mín. 6 caracteres)"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        minLength="6"
                                    />
                                </div>
                            </>
                        )}

                        {/* Login */}
                        {mode === 'login' && (
                            <>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Email o nombre de usuario"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {/* Verificación */}
                        {mode === 'verify' && (
                            <>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="codigo"
                                        placeholder="Código de verificación (6 dígitos)"
                                        value={formData.codigo}
                                        onChange={handleInputChange}
                                        required
                                        maxLength="6"
                                    />
                                </div>
                                <button type="button" onClick={handleResendCode} className="resend-btn">
                                    Reenviar código
                                </button>
                            </>
                        )}

                        {/* Recuperar contraseña */}
                        {mode === 'forgot' && (
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email de tu cuenta"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}

                        {/* Nueva contraseña */}
                        {mode === 'reset' && (
                            <>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="codigo"
                                        placeholder="Código recibido por email"
                                        value={formData.codigo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="new_password"
                                        placeholder="Nueva contraseña (mín. 6 caracteres)"
                                        value={formData.new_password}
                                        onChange={handleInputChange}
                                        required
                                        minLength="6"
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? '⏳ Procesando...' : 'Enviar'}
                        </button>
                    </form>

                    <div className="auth-modal-footer">
                        {mode === 'login' && (
                            <>
                                <button onClick={() => switchMode('register')} className="link-btn">
                                    ¿No tienes cuenta? Regístrate
                                </button>
                                <button onClick={() => switchMode('forgot')} className="link-btn">
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </>
                        )}
                        {mode === 'register' && (
                            <button onClick={() => switchMode('login')} className="link-btn">
                                ¿Ya tienes cuenta? Inicia sesión
                            </button>
                        )}
                        {mode === 'verify' && (
                            <button onClick={() => switchMode('login')} className="link-btn">
                                Volver al login
                            </button>
                        )}
                        {mode === 'forgot' && (
                            <button onClick={() => switchMode('login')} className="link-btn">
                                Volver al login
                            </button>
                        )}
                        {mode === 'reset' && (
                            <button onClick={() => switchMode('login')} className="link-btn">
                                Volver al login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModalCompleto;
