// Detectar si estamos en Capacitor (APK) o en web
const isCapacitor = () => {
  return window.Capacitor !== undefined || window.location.protocol === 'capacitor:' || window.location.protocol === 'https:' && window.location.hostname === 'localhost';
};

// Base URL: en APK usar URL completa, en web usar ruta relativa
const BASE = isCapacitor() ? 'https://colisan.com/sistema_apps_upload/lumetrix/' : 'lumetrix/';

async function api(path, opt = {}) {
  const url = BASE + path;
  console.log('API Call:', url);
  
  // En Capacitor, usar el plugin HTTP nativo que evita CORS
  if (isCapacitor() && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.CapacitorHttp) {
    const { CapacitorHttp } = window.Capacitor.Plugins;
    const options = {
      url: url,
      headers: { 'Content-Type': 'application/json', ...(opt.headers || {}) },
      method: opt.method || 'GET',
    };
    
    if (opt.body) {
      options.data = typeof opt.body === 'string' ? JSON.parse(opt.body) : opt.body;
    }
    
    const response = await CapacitorHttp.request(options);
    return response.data;
  }
  
  // En web, usar fetch normal
  const res = await fetch(url, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(opt.headers || {}) },
    ...opt,
  });
  return res.json();
}
window.LUM_API = { api };

