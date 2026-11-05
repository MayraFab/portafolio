import { useCallback, useState } from 'react';
import './TechStack.css';
import { useAdmin } from '../../context/AdminContext';
import { agruparPorFila, useSeccion } from '../../context/ContenidoContext';
import FormularioAdmin from '../Admin/FormularioAdmin';
import AccionesAdmin from '../Admin/AccionesAdmin';
import { camposTecla } from '../Admin/campos';

/*
  Las teclas están en src/data/techStack.js.
  Desde el panel puedes agregar teclas nuevas y editar cualquiera (las del código no se eliminan).
*/

const textoEstado = {
  'en-uso': 'En uso',
  aprendiendo: 'Aprendiendo',
};

// Ícono de la tecla: si la imagen falla, muestra la sigla o la inicial
const Icono = ({ item }) => {
  const [fallo, setFallo] = useState(false);

  if (!item.icono || fallo) {
    return <span className="tecla-sigla">{item.sigla || item.nombre.slice(0, 2)}</span>;
  }
  return (
    <img
      src={item.icono}
      alt=""
      className="tecla-icono"
      loading="lazy"
      onError={() => setFallo(true)}
    />
  );
};

const TechStack = () => {
  const { sesion } = useAdmin();
  const { items, agregar, editar, quitar, restaurar } = useSeccion('tecnologias');
  const [claveElegida, setClaveElegida] = useState(null);
  // null = cerrado · 'nueva' = agregar · una tecla = editar esa tecla
  const [formulario, setFormulario] = useState(null);
  const cerrarForm = useCallback(() => setFormulario(null), []);

  const filas = agruparPorFila(items);
  const seleccion = items.find((t) => t.clave === claveElegida) || null;

  const guardar = (datos) => (formulario === 'nueva' ? agregar(datos) : editar(formulario, datos));

  return (
    <section id="tech-stack" className="section">
      <div className="section-container reveal">
        <header className="section-header">
          <span className="section-kicker">03 · tech stack</span>
          <h2 className="section-title">
            Mi <span className="text-accent">teclado</span> de herramientas
          </h2>
          <p className="section-subtitle">
            Cada tecla es una tecnología con la que trabajo o que estoy aprendiendo. Presiona una para ver qué hago con ella.
          </p>
        </header>

        <div className="teclado-wrap zona-oscura">
          {/* Pantallita que muestra la tecla presionada */}
          <div className="pantalla" aria-live="polite">
            {seleccion ? (
              <div key={seleccion.clave} className="pantalla-contenido">
                <p className="pantalla-linea">
                  <span className="text-accent">&gt;</span> {seleccion.nombre}
                  <span className={`pantalla-estado estado-${seleccion.estado}`}>{textoEstado[seleccion.estado]}</span>
                </p>
                <p className="pantalla-desc">{seleccion.descripcion}</p>
                {sesion && (
                  <AccionesAdmin
                    item={seleccion}
                    nombre={seleccion.nombre}
                    alEditar={setFormulario}
                    quitar={quitar}
                    restaurar={restaurar}
                    compactas
                  />
                )}
              </div>
            ) : (
              <p className="pantalla-linea pantalla-vacia">
                <span className="text-accent">&gt;</span> presiona una tecla<span className="cursor">▍</span>
              </p>
            )}
          </div>

          {/* Teclado */}
          <div className="teclado">
            {filas.map((grupo) => (
              <div key={grupo.fila} className="teclado-fila">
                <span className="fila-etiqueta">{grupo.fila}</span>
                <div className="fila-teclas">
                  {grupo.items.map((item) => (
                    <button
                      key={item.clave}
                      type="button"
                      className={`tecla ${seleccion?.clave === item.clave ? 'presionada' : ''}`}
                      onClick={() => setClaveElegida(item.clave)}
                      aria-pressed={seleccion?.clave === item.clave}
                    >
                      {item.estado === 'aprendiendo' && <span className="tecla-led" title="Aprendiendo"></span>}
                      <Icono item={item} />
                      <span className="tecla-nombre">{item.nombre}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="teclado-leyenda">
            <span className="led-ejemplo"></span> = aprendiendo · sin luz = en uso
          </p>

          {sesion && (
            <button type="button" className="boton-agregar" onClick={() => setFormulario('nueva')}>
              + Agregar tecla
            </button>
          )}
        </div>
      </div>

      {formulario && sesion && (
        <FormularioAdmin
          key={formulario === 'nueva' ? 'nueva' : formulario.clave}
          titulo={formulario === 'nueva' ? 'Agregar tecla' : 'Editar tecla'}
          campos={camposTecla(filas.map((g) => g.fila))}
          inicial={formulario === 'nueva' ? null : formulario}
          alCerrar={cerrarForm}
          alGuardar={guardar}
        />
      )}
    </section>
  );
};

export default TechStack;
