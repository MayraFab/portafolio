import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Modal from '../components/Admin/Modal';
import { borrarSesion, iniciarSesion, leerSesion, supabaseConfigurado } from '../utils/supabase';

const AdminContext = createContext(null);

// Formulario de inicio de sesión del panel
const Login = ({ alEntrar, alCerrar }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [estado, setEstado] = useState({ cargando: false, error: '' });

  const alEnviar = async (e) => {
    e.preventDefault();
    setEstado({ cargando: true, error: '' });
    try {
      alEntrar(await iniciarSesion(email, password));
    } catch (error) {
      setEstado({ cargando: false, error: error.message });
    }
  };

  if (!supabaseConfigurado) {
    return (
      <Modal titulo="Panel de administración" alCerrar={alCerrar}>
        <p className="admin-aviso">
          El panel todavía no está conectado a la base de datos. Sigue la guía de configuración (Supabase) y
          coloca las claves en el archivo <code>.env</code>.
        </p>
      </Modal>
    );
  }

  return (
    <Modal titulo="Panel de administración" alCerrar={alCerrar}>
      <form className="admin-form" onSubmit={alEnviar}>
        <label>
          Correo
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {estado.error && <p className="admin-error">{estado.error}</p>}
        <button type="submit" className="btn btn-primary" disabled={estado.cargando}>
          {estado.cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </Modal>
  );
};

export const AdminProvider = ({ children }) => {
  const [sesion, setSesion] = useState(leerSesion);
  const [loginAbierto, setLoginAbierto] = useState(false);

  const abrirLogin = useCallback(() => setLoginAbierto(true), []);
  const cerrarLogin = useCallback(() => setLoginAbierto(false), []);

  const salir = useCallback(() => {
    borrarSesion();
    setSesion(null);
  }, []);

  // Entrar a la web con #admin al final de la dirección también abre el login
  useEffect(() => {
    const revisarHash = () => window.location.hash === '#admin' && setLoginAbierto(true);
    revisarHash();
    window.addEventListener('hashchange', revisarHash);
    return () => window.removeEventListener('hashchange', revisarHash);
  }, []);

  return (
    <AdminContext.Provider value={{ sesion, abrirLogin, salir }}>
      {children}

      {loginAbierto && !sesion && (
        <Login
          alCerrar={cerrarLogin}
          alEntrar={(nueva) => {
            setSesion(nueva);
            setLoginAbierto(false);
          }}
        />
      )}

      {/* Barra visible solo mientras estás en modo edición */}
      {sesion && (
        <div className="admin-barra" role="status">
          <span>✎ Modo edición · {sesion.email}</span>
          <button type="button" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      )}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
