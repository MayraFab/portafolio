import './Habilidades.css';

// Arreglo de datos: estado puede ser 'en-uso' o 'aprendiendo'
const skillsData = [
  { id: 1, titulo: 'React', descripcion: 'Construcción de interfaces y componentes reutilizables.', area: 'Frontend', estado: 'en-uso' },
  { id: 2, titulo: 'JavaScript', descripcion: 'Fundamentos del lenguaje para experiencias interactivas.', area: 'Frontend', estado: 'aprendiendo' },
  { id: 3, titulo: 'HTML / CSS', descripcion: 'Estructura semántica y estilos para sitios responsivos.', area: 'Frontend', estado: 'en-uso' },
  { id: 4, titulo: 'Flexbox y Grid', descripcion: 'Diseño de layouts adaptables a distintas pantallas.', area: 'Diseño web', estado: 'en-uso' },
  { id: 5, titulo: 'Bootstrap', descripcion: 'Maquetación rápida con componentes y grid predefinidos.', area: 'Diseño web', estado: 'en-uso' },
  { id: 6, titulo: 'Git', descripcion: 'Control de versiones y gestión del historial de cambios.', area: 'Herramientas', estado: 'aprendiendo' },
  { id: 7, titulo: 'GitHub', descripcion: 'Colaboración y publicación de proyectos de software.', area: 'Herramientas', estado: 'en-uso' },
  { id: 8, titulo: 'Arduino y Tinkercad', descripcion: 'Prototipos IoT con sensores, LCD y simulación de circuitos.', area: 'IoT', estado: 'en-uso' },
  { id: 9, titulo: 'Android Studio (Java)', descripcion: 'Aplicaciones móviles con actividades y bases de datos locales.', area: 'Móvil', estado: 'aprendiendo' },
];

const textoBadge = {
  'en-uso': 'En uso',
  aprendiendo: 'Aprendiendo',
};

const Habilidades = () => {
  return (
    <section id="tech-stack" className="habilidades-section">
      <div className="habilidades-container">
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">Tecnologías con las que trabajo y sigo aprendiendo</p>

        {/* Recorremos el arreglo con .map() */}
        <div className="habilidades-grid">
          {skillsData.map((skill) => (
            <div key={skill.id} className="skill-card">
              {/* Cabecera: ícono y etiqueta */}
              <div className="skill-header">
                <div className="skill-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>

                {/* Clase dinámica según el estado */}
                <span className={`skill-badge ${skill.estado === 'aprendiendo' ? 'badge-rosa' : 'badge-verde'}`}>
                  {textoBadge[skill.estado]}
                </span>
              </div>

              {/* Cuerpo: textos */}
              <div className="skill-body">
                <h3 className="skill-title">{skill.titulo}</h3>
                <p className="skill-desc">{skill.descripcion}</p>
                <span className="skill-level">{skill.area}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Habilidades;
