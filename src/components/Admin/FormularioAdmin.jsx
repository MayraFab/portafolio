import { useId, useState } from 'react';
import Modal from './Modal';

/*
  Formulario reutilizable del panel. Cada sección le pasa su lista de campos (ver campos.js).
  Tipos de campo: 'text' (por defecto) · 'textarea' · 'url' · 'select' · 'lista' (separada por comas)
*/
const opcionesDe = (campo) =>
  (campo.opciones || []).map((o) => (typeof o === 'string' ? { valor: o, texto: o } : o));

const aTexto = (campo, valor) => {
  if (campo.tipo === 'lista') return (valor || []).join(', ');
  if (valor === null || valor === undefined || valor === '#') {
    return campo.tipo === 'select' ? opcionesDe(campo)[0]?.valor ?? '' : campo.inicial ?? '';
  }
  return typeof valor === 'string' ? valor : '';
};

const deTexto = (campo, texto) =>
  campo.tipo === 'lista' ? texto.split(',').map((t) => t.trim()).filter(Boolean) : texto.trim();

const FormularioAdmin = ({ titulo, campos, inicial, validar, preparar, alGuardar, alCerrar }) => {
  const id = useId();
  const [datos, setDatos] = useState(() =>
    Object.fromEntries(campos.map((c) => [c.nombre, aTexto(c, inicial?.[c.nombre])]))
  );
  const [estado, setEstado] = useState({ cargando: false, error: '' });

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const alEnviar = async (e) => {
    e.preventDefault();
    let limpio = Object.fromEntries(campos.map((c) => [c.nombre, deTexto(c, datos[c.nombre])]));
    const error = validar?.(limpio);
    if (error) {
      setEstado({ cargando: false, error });
      return;
    }
    if (preparar) limpio = preparar(limpio);
    setEstado({ cargando: true, error: '' });
    try {
      await alGuardar(limpio);
      alCerrar();
    } catch (err) {
      setEstado({ cargando: false, error: err.message });
    }
  };

  const control = (campo) => {
    const comunes = {
      name: campo.nombre,
      value: datos[campo.nombre],
      onChange: cambiar,
      required: campo.requerido,
      placeholder: campo.placeholder,
    };
    if (campo.tipo === 'textarea') return <textarea {...comunes} rows="3" />;
    if (campo.tipo === 'select') {
      return (
        <select {...comunes}>
          {opcionesDe(campo).map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.texto}
            </option>
          ))}
        </select>
      );
    }
    return (
      <>
        <input
          {...comunes}
          type={campo.tipo === 'url' ? 'url' : 'text'}
          list={campo.sugerencias ? `${id}-${campo.nombre}` : undefined}
        />
        {campo.sugerencias && (
          <datalist id={`${id}-${campo.nombre}`}>
            {campo.sugerencias.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        )}
      </>
    );
  };

  return (
    <Modal titulo={titulo} alCerrar={alCerrar}>
      <form className="admin-form" onSubmit={alEnviar}>
        {campos.map((campo) => (
          <label key={campo.nombre}>
            {campo.etiqueta}
            {campo.requerido && ' *'} {campo.ayuda && <span>({campo.ayuda})</span>}
            {control(campo)}
          </label>
        ))}

        {estado.error && <p className="admin-error">{estado.error}</p>}
        <button type="submit" className="btn btn-primary" disabled={estado.cargando}>
          {estado.cargando ? 'Guardando…' : inicial ? 'Guardar cambios' : 'Guardar'}
        </button>
      </form>
    </Modal>
  );
};

export default FormularioAdmin;
