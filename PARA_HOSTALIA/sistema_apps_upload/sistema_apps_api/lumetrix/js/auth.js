async function lum_register({username, email, password}) {
  return LUM_API.api('auth.php?action=register', { method:'POST', body: JSON.stringify({username,email,password}) });
}
async function lum_login({username, password}) {
  return LUM_API.api('auth.php?action=login', { method:'POST', body: JSON.stringify({username,password}) });
}
async function lum_check() {
  return LUM_API.api('auth.php?action=check_session');
}
window.LUM_AUTH = { lum_register, lum_login, lum_check };

