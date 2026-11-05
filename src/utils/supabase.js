/*
  Conexión con Supabase (base de datos gratuita) para el panel de administración.
  Las claves se leen del archivo .env (en Vercel, de Environment Variables):
    VITE_SUPABASE_URL=https://xxxx.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJ...
  La contraseña NO está en el código: Supabase la verifica en su servidor.
  Se usa fetch directamente, así no hace falta instalar paquetes (igual que con EmailJS).
*/
// Si la URL se pegó con "/rest/v1/" o con "/" al final, se limpia para dejar solo https://xxxx.supabase.co
const URL_BASE = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
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

// Mensajes claros según lo que responda Supabase
const erroresLogin = {
  invalid_credentials: 'Correo o contraseña incorrectos',
  email_not_confirmed: 'Tu correo aún no está confirmado. En Supabase: Authentication → Users → confirma el usuario.',
  over_request_rate_limit: 'Demasiados intentos. Espera unos minutos y vuelve a probar.',
};

export const iniciarSesion = async (email, password) => {
  let respuesta;
  try {
    respuesta = await fetch(`${URL_BASE}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: cabeceras(),
      body: JSON.stringify({ email: email.trim(), password }),
    });
  } catch {
    throw new Error('No se pudo conectar con Supabase. Revisa tu internet o la URL del archivo .env.');
  }
  if (!respuesta.ok) {
    const detalle = await respuesta.json().catch(() => ({}));
    if (respuesta.status === 404) throw new Error('La URL de Supabase no es correcta: debe ser solo https://xxxx.supabase.co');
    throw new Error(erroresLogin[detalle.error_code] || detalle.msg || 'Correo o contraseña incorrectos');
  }
  const datos = await respuesta.json();
  const sesion = { token: datos.access_token, email, expira: Date.now() + datos.expires_in * 1000 };
  guardarSesion(sesion);
  return sesion;
};

// ---------- Datos ----------
const SIN_PERMISO = 'La base de datos no permitió el cambio. Revisa que hayas entrado con tu correo de administradora.';

// Avisa a la app que la sesión venció (la barra de edición se cierra sola)
export const EVENTO_SESION_VENCIDA = 'portafolio-sesion-vencida';

const revisarRespuesta = async (respuesta, accion) => {
  if (respuesta.ok) return;
  if (respuesta.status === 401) {
    borrarSesion();
    window.dispatchEvent(new Event(EVENTO_SESION_VENCIDA));
    throw new Error('Tu sesión venció. Vuelve a entrar desde "Administrar" al final de la página.');
  }
  if (respuesta.status === 403) throw new Error(SIN_PERMISO);
  throw new Error(`No se pudo ${accion}. Inténtalo de nuevo en unos segundos.`);
};

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
  await revisarRespuesta(respuesta, 'guardar');
  const [creada] = await respuesta.json();
  return creada;
};

export const actualizar = async (tabla, id, cambios, token) => {
  const respuesta = await fetch(`${URL_BASE}/rest/v1/${tabla}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...cabeceras(token), Prefer: 'return=representation' },
    body: JSON.stringify(cambios),
  });
  await revisarRespuesta(respuesta, 'guardar');
  const [actualizada] = await respuesta.json();
  // Sin filas devueltas = la base no dejó modificarla (cuenta sin permiso o ya no existe)
  if (!actualizada) throw new Error(SIN_PERMISO);
  return actualizada;
};

export const eliminar = async (tabla, id, token) => {
  const respuesta = await fetch(`${URL_BASE}/rest/v1/${tabla}?id=eq.${id}`, {
    method: 'DELETE',
    headers: { ...cabeceras(token), Prefer: 'return=representation' },
  });
  await revisarRespuesta(respuesta, 'eliminar');
  const borradas = await respuesta.json();
  if (!borradas.length) throw new Error(SIN_PERMISO);
};
