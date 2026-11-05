/*
  Botones del modo edición para un elemento: Editar · Deshacer cambios · Eliminar
  - puedeBorrarFijos: si es true, también se pueden eliminar los datos escritos en el código.
    Si es false, solo se puede eliminar lo que agregaste desde el panel.
*/
const AccionesAdmin = ({ item, nombre, alEditar, quitar, restaurar, puedeBorrarFijos = false, compactas = false }) => {
  const esNuevo = item.idRemoto && !item.reemplaza;
  const puedeBorrar = puedeBorrarFijos || esNuevo;

  const ejecutar = async (pregunta, accion) => {
    if (!window.confirm(pregunta)) return;
    try {
      await accion(item);
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div className={`acciones-admin ${compactas ? 'compactas' : ''}`}>
      <button type="button" className="boton-editar" onClick={() => alEditar(item)}>
        Editar
      </button>
      {item.reemplaza && (
        <button
          type="button"
          className="boton-eliminar"
          onClick={() => ejecutar(`¿Deshacer los cambios de "${nombre}" y volver al original?`, restaurar)}
        >
          Deshacer cambios
        </button>
      )}
      {puedeBorrar && (
        <button type="button" className="boton-eliminar" onClick={() => ejecutar(`¿Eliminar "${nombre}"?`, quitar)}>
          Eliminar
        </button>
      )}
    </div>
  );
};

export default AccionesAdmin;
