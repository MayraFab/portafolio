import { useState } from 'react';
import Modal from './Modal';
import { iconosProyecto } from '../Iconos/IconoLinea';

const vacio = {
  titulo: '',
  descripcion: '',
  categoria: 'web',
  tecnologias: '',
  icono: 'carpeta',
  archivo: '',
  imagen: '',
  link_codigo: '',
  link_demo: '',
};

// Arma un nombre de archivo a partir del título: "Gestor de Tareas" → "gestor-de-tareas.js"
const nombreArchivo = (titulo) =>
  `${titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}.js`;

// Pasa un proyecto de la web al formato del formulario (para editarlo)
const aFormulario = (p) => ({
  titulo: p.titulo || '',
  descripcion: p.descripcion || '',
  categoria: p.categoria || 'web',
  tecnologias: (p.tecnologias || []).join(', '),
  icono: p.icono || 'carpeta',
  archivo: p.archivo || '',
  imagen: typeof p.imagen === 'string' ? p.imagen : '',
  link_codigo: p.linkCodigo && p.linkCodigo !== '#' ? p.linkCodigo : '',
  link_demo: p.linkDemo && p.linkDemo !== '#' ? p.linkDemo : '',
});

// Sin "inicial" agrega un proyecto nuevo; con "inicial" edita ese proyecto
const FormularioProyecto = ({ inicial, alGuardar, alCerrar }) => {
  const [datos, setDatos] = useState(() => (inicial ? aFormulario(inicial) : vacio));
  const [estado, setEstado] = useState({ cargando: false, error: '' });

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const alEnviar = async (e) => {
    e.preventDefault();
    if (!/^https:\/\/github\.com\//.test(datos.link_codigo)) {
      setEstado({ cargando: false, error: 'El enlace de GitHub debe empezar con https://github.com/' });
      return;
    }
    setEstado({ cargando: true, error: '' });
    try {
      await alGuardar({
        ...datos,
        archivo: datos.archivo || nombreArchivo(datos.titulo),
        tecnologias: datos.tecnologias.split(',').map((t) => t.trim()).filter(Boolean),
        imagen: datos.imagen || null,
        link_demo: datos.link_demo || null,
      });
      alCerrar();
    } catch (error) {
      setEstado({ cargando: false, error: error.message });
    }
  };

  return (
    <Modal titulo={inicial ? 'Editar proyecto' : 'Agregar proyecto'} alCerrar={alCerrar}>
      <form className="admin-form" onSubmit={alEnviar}>
        <label>
          Título *
          <input name="titulo" value={datos.titulo} onChange={cambiar} required />
        </label>
        <label>
          Descripción *
          <textarea name="descripcion" value={datos.descripcion} onChange={cambiar} rows="3" required />
        </label>
        <div className="admin-fila">
          <label>
            Categoría
            <select name="categoria" value={datos.categoria} onChange={cambiar}>
              <option value="web">Web</option>
              <option value="movil">Móvil</option>
              <option value="iot">IoT</option>
            </select>
          </label>
          <label>
            Ícono de portada
            <select name="icono" value={datos.icono} onChange={cambiar}>
              {iconosProyecto.map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Tecnologías <span>(separadas por comas)</span>
          <input name="tecnologias" value={datos.tecnologias} onChange={cambiar} placeholder="React, Vite, CSS" />
        </label>
        <label>
          Enlace de GitHub *
          <input
            name="link_codigo"
            type="url"
            value={datos.link_codigo}
            onChange={cambiar}
            placeholder="https://github.com/MayraFab/mi-proyecto"
            required
          />
        </label>
        <label>
          Enlace de la página web <span>(opcional)</span>
          <input name="link_demo" type="url" value={datos.link_demo} onChange={cambiar} placeholder="https://…" />
        </label>
        <label>
          Imagen de portada <span>(opcional, enlace a una captura)</span>
          <input name="imagen" type="url" value={datos.imagen} onChange={cambiar} placeholder="https://…" />
        </label>

        {estado.error && <p className="admin-error">{estado.error}</p>}
        <button type="submit" className="btn btn-primary" disabled={estado.cargando}>
          {estado.cargando ? 'Guardando…' : inicial ? 'Guardar cambios' : 'Guardar proyecto'}
        </button>
      </form>
    </Modal>
  );
};

export default FormularioProyecto;
