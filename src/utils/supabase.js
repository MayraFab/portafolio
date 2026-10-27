/*
  Conexión con Supabase (base de datos gratuita) para el panel de administración.
  Las claves se leen del archivo .env (en Vercel, de Environment Variables):
    VITE_SUPABASE_URL=https://xxxx.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJ...
  La contraseña NO está en el código: Supabase la verifica en su servidor.
  Se usa fetch directamente, así no hace falta instalar paquetes (igual que con EmailJS).
*/
const URL_BASE = import.meta.env.VITE_SUPABASE_URL;
const CLAVE_PUBLICA = import.meta.env.VITE_SUPABASE_ANON_KEY;
const CLAVE_SESION = 'portafolio-sesion';

export const supabaseConfigurado = Boolean(URL_BASE && CLAVE_PUBLICA);

// El token solo se envía cuando hay sesión (funciona con la clave "anon" y con la nueva "publishable")
const cabeceras = (token) => ({
  apikey: CLAVE_PUBLICA,
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

// ---------- Sesión (se guarda solo mientras la pestaña esté abierta) ----------
export const leerSesion = () => {
  try {
    const sesion = JSON.parse(sessionStorage.getItem(CLAVE_SESION));
    return sesion && sesion.expira > Date.now() ? sesion : null;
  } catch {
    return null;
  }
};

const guardarSesion = (sesion) => {
  try {
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  } catch {
    // Sin almacenamiento: la sesión dura hasta recargar la página
  }
};

export const borrarSesion = () => {
  try {
    sessionStorage.removeItem(CLAVE_SESION);
  } catch {
    // Nada que borrar
  }
};

export const iniciarSesion = async (email, password) => {
  const respuesta = await fetch(`${URL_BASE}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: cabeceras(),
    body: JSON.stringify({ email, password }),
  });
  if (!respuesta.ok) throw new Error('Correo o contraseña incorrectos');
  const datos = await respuesta.json();
  const sesion = { token: datos.access_token, email, expira: Date.now() + datos.expires_in * 1000 };
  guardarSesion(sesion);
  return sesion;
};

// ---------- Datos ----------
export const listar = async (tabla) => {
  const respuesta = await fetch(`${URL_BASE}/rest/v1/${tabla}?select=*&order=creado.asc`, {
    headers: cabeceras(),
  });
  if (!respuesta.ok) throw new Error(`No se pudo leer ${tabla}`);
  return respuesta.json();
};

export const insertar = async (tabla, fila, token) => {
  const respuesta = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: 'POST',
    headers: { ...cabeceras(token), Prefer: 'return=representation' },
    body: JSON.stringify(fila),
  });
  if (!respuesta.ok) throw new Error('No se pudo guardar. ¿Tu sesión sigue activa?');
  const [creada] = await respuesta.json();
  return creada;
};

export const eliminar = async (tabla, id, token) => {
  const respuesta = await fetch(`${URL_BASE}/rest/v1/${tabla}?id=eq.${id}`, {
    method: 'DELETE',
    headers: cabeceras(token),
  });
  if (!respuesta.ok) throw new Error('No se pudo eliminar. ¿Tu sesión sigue activa?');
};
