import { useState } from 'react';
import './TechStack.css';
import { techStack } from '../../data/techStack';

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
  const [seleccion, setSeleccion] = useState(null);

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
              <div key={seleccion.nombre} className="pantalla-contenido">
                <p className="pantalla-linea">
                  <span className="text-accent">&gt;</span> {seleccion.nombre}
                  <span className={`pantalla-estado estado-${seleccion.estado}`}>{textoEstado[seleccion.estado]}</span>
                </p>
                <p className="pantalla-desc">{seleccion.descripcion}</p>
              </div>
            ) : (
              <p className="pantalla-linea pantalla-vacia">
                <span className="text-accent">&gt;</span> presiona una tecla ⌨️<span className="cursor">▍</span>
              </p>
            )}
          </div>

          {/* Teclado */}
          <div className="teclado">
            {techStack.map((grupo) => (
              <div key={grupo.fila} className="teclado-fila">
                <span className="fila-etiqueta">{grupo.fila}</span>
                <div className="fila-teclas">
                  {grupo.items.map((item) => (
                    <button
                      key={item.nombre}
                      type="button"
                      className={`tecla ${seleccion?.nombre === item.nombre ? 'presionada' : ''}`}
                      onClick={() => setSeleccion(item)}
                      aria-pressed={seleccion?.nombre === item.nombre}
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
        </div>
      </div>
    </section>
  );
};

export default TechStack;
