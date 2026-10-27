import { useState } from 'react';
import Modal from './Modal';
import { nombresIconos } from '../Certificados/IconoCertificado';

const vacio = {
  titulo: '',
  emisor: 'Cisco Networking Academy',
  fecha: '',
  link: '',
  icono: 'certificado',
};

const FormularioCertificado = ({ alGuardar, alCerrar }) => {
  const [datos, setDatos] = useState(vacio);
  const [estado, setEstado] = useState({ cargando: false, error: '' });

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const alEnviar = async (e) => {
    e.preventDefault();
    setEstado({ cargando: true, error: '' });
    try {
      await alGuardar({ ...datos, fecha: datos.fecha || null });
      alCerrar();
    } catch (error) {
      setEstado({ cargando: false, error: error.message });
    }
  };

  return (
    <Modal titulo="Agregar certificado" alCerrar={alCerrar}>
      <form className="admin-form" onSubmit={alEnviar}>
        <label>
          Nombre del certificado *
          <input name="titulo" value={datos.titulo} onChange={cambiar} required />
        </label>
        <label>
          Institución *
          <input name="emisor" value={datos.emisor} onChange={cambiar} required />
        </label>
        <div className="admin-fila">
          <label>
            Fecha <span>(opcional)</span>
            <input name="fecha" value={datos.fecha} onChange={cambiar} placeholder="Mar 2026" />
          </label>
          <label>
            Ícono
            <select name="icono" value={datos.icono} onChange={cambiar}>
              {nombresIconos.map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Enlace del PDF *
          <input
            name="link"
            type="url"
            value={datos.link}
            onChange={cambiar}
            placeholder="https://drive.google.com/file/d/…/view"
            required
          />
        </label>

        {estado.error && <p className="admin-error">{estado.error}</p>}
        <button type="submit" className="btn btn-primary" disabled={estado.cargando}>
          {estado.cargando ? 'Guardando…' : 'Guardar certificado'}
        </button>
      </form>
    </Modal>
  );
};

export default FormularioCertificado;
