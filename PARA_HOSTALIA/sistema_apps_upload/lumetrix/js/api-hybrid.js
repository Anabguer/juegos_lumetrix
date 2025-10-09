// api-hybrid.js
// Sistema híbrido para APK: Online + Offline

class HybridAPI {
    constructor() {
        this.isOnline = navigator.onLine;
        this.baseURL = 'https://colisan.com/lumetrix/';
        this.fallbackURL = 'http://82.194.68.83/lumetrix/';
        this.offlineData = this.loadOfflineData();
        
        // Escuchar cambios de conexión
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncOfflineData();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }
    
    loadOfflineData() {
        try {
            return JSON.parse(localStorage.getItem('lumetrix_offline_data') || '{}');
        } catch {
            return {};
        }
    }
    
    saveOfflineData() {
        localStorage.setItem('lumetrix_offline_data', JSON.stringify(this.offlineData));
    }
    
    async api(endpoint, options = {}) {
        const url = this.baseURL + endpoint;
        
        if (this.isOnline) {
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    // Guardar datos para modo offline
                    this.cacheResponse(endpoint, data);
                    return data;
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.warn('API online falló, usando datos offline:', error);
                return this.getOfflineData(endpoint);
            }
        } else {
            return this.getOfflineData(endpoint);
        }
    }
    
    cacheResponse(endpoint, data) {
        this.offlineData[endpoint] = {
            data: data,
            timestamp: Date.now()
        };
        this.saveOfflineData();
    }
    
    getOfflineData(endpoint) {
        const cached = this.offlineData[endpoint];
        if (cached && (Date.now() - cached.timestamp) < 24 * 60 * 60 * 1000) { // 24 horas
            return cached.data;
        }
        
        // Datos por defecto para modo offline
        return this.getDefaultOfflineData(endpoint);
    }
    
    getDefaultOfflineData(endpoint) {
        switch (endpoint) {
            case 'auth.php?action=check_session':
                return { success: false, message: 'Modo offline' };
            
            case 'game.php?action=get_progress':
                return {
                    success: true,
                    data: {
                        nivel_actual: 1,
                        total_time_s: 0,
                        total_puntos: 0
                    }
                };
            
            case 'ranking.php':
                return {
                    success: true,
                    data: [
                        { nick: 'Jugador Offline', total_puntos: 100, nivel_actual: 5 }
                    ]
                };
            
            default:
                return { success: false, message: 'Endpoint no disponible offline' };
        }
    }
    
    async syncOfflineData() {
        // Sincronizar datos pendientes cuando vuelva la conexión
        console.log('Sincronizando datos offline...');
        // Aquí se implementaría la lógica de sincronización
    }
}

// Inicializar API híbrida
window.LUM_API_HYBRID = new HybridAPI();

// Mantener compatibilidad con API existente
if (typeof window.LUM_API === 'undefined') {
    window.LUM_API = {
        api: (endpoint, options) => window.LUM_API_HYBRID.api(endpoint, options)
    };
}
