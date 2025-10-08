const BASE = 'lumetrix/';
async function api(path, opt = {}) {
  const res = await fetch(BASE + path, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(opt.headers || {}) },
    ...opt,
  });
  return res.json();
}
window.LUM_API = { api };

