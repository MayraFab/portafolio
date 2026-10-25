import './Proyectos.css';

/*
  Arreglo de proyectos.
  - imagen: si tienes captura, impórtala arriba (import miCaptura from '../../assets/archivo.png')
            y escribe imagen: miCaptura. Si la dejas en null, se muestra una portada de color.
  - linkDemo / linkCodigo: si los dejas vacíos (''), el botón no aparece.
*/
const proyectosData = [
  {
    id: 1,
    imagen: null,
    portada: 'portada-rosa',
    emoji: '🎓',
    titulo: 'appEscuela – Sistema de Matrícula',
    descripcion:
      'Directorio de alumnos con tarjetas reutilizables, props y useState para cambiar el estado de cada matrícula.',
    tecnologias: ['React', 'Vite', 'Bootstrap'],
    linkDemo: '',
    linkCodigo: 'https://github.com/MayraFab/appEscuela',
  },
  {
    id: 2,
    imagen: null,
    portada: 'portada-verde',
    emoji: '✅',
    titulo: 'Gestor de Tareas',
    descripcion:
      'Aplicación web para gestionar tareas: crear, editar, eliminar y organizarlas por estado.',
    tecnologias: ['React', 'Vite'],
    linkDemo: '',
    linkCodigo: '',
  },
  {
    id: 3,
    imagen: null,
    portada: 'portada-arena',
    emoji: '🍔',
    titulo: 'BARBIVO-FOOD',
    descripcion:
      'Aplicación móvil de pedidos de comida desarrollada con Expo, con experiencia visual en modo claro y oscuro.',
    tecnologias: ['Expo', 'React Native', 'Modo claro/oscuro'],
    linkDemo: '',
    linkCodigo: '',
  },
  {
    id: 4,
    imagen: null,
    portada: 'portada-mixta',
    emoji: '🔌',
    titulo: 'Mensaje de bienvenida con Arduino',
    descripcion:
      'Proyecto con Arduino UNO que muestra un mensaje de bienvenida en una pantalla LCD.',
    tecnologias: ['Arduino UNO', 'LCD 16x2', 'Tinkercad'],
    linkDemo: '',
    linkCodigo: '',
  },
];

// Devuelve true solo si el enlace existe y no es '#'
const tieneEnlace = (link) => Boolean(link && link !== '#');

const Proyectos = () => {
  return (
    <section id="proyectos" className="proyectos-section">
      <div className="proyectos-container">
        <h2 className="section-title">Proyectos Destacados</h2>
        <p className="section-subtitle">Algunos trabajos que he desarrollado durante mi formación</p>

        <div className="proyectos-grid">
          {proyectosData.map((proyecto) => (
            <article key={proyecto.id} className="proyecto-card">
              {/* 1. Imagen o portada de color */}
              <div className="proyecto-imagen">
                {proyecto.imagen ? (
                  <img src={proyecto.imagen} alt={`Captura de ${proyecto.titulo}`} />
                ) : (
                  <div className={`proyecto-portada ${proyecto.portada}`}>
                    <span className="portada-emoji" aria-hidden="true">{proyecto.emoji}</span>
                  </div>
                )}
              </div>

              {/* 2. Contenido */}
              <div className="proyecto-contenido">
                <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
                <p className="proyecto-desc">{proyecto.descripcion}</p>

                {/* 3. Tecnologías (map anidado) */}
                <div className="proyecto-tags">
                  {proyecto.tecnologias.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {/* 4. Botones: solo se muestran si hay enlace */}
                {(tieneEnlace(proyecto.linkDemo) || tieneEnlace(proyecto.linkCodigo)) && (
                  <div className="proyecto-links">
                    {tieneEnlace(proyecto.linkDemo) && (
                      <a href={proyecto.linkDemo} target="_blank" rel="noopener noreferrer" className="btn-proyecto btn-demo">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Ver Demo
                      </a>
                    )}

                    {tieneEnlace(proyecto.linkCodigo) && (
                      <a href={proyecto.linkCodigo} target="_blank" rel="noopener noreferrer" className="btn-proyecto btn-codigo">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Ver Código
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
