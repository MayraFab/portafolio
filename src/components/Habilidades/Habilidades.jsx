import { useState } from 'react';
import './Habilidades.css';
import IconoLinea from '../Iconos/IconoLinea';

// Habilidades blandas
const blandas = [
  { icono: 'comunicacion', nombre: 'Comunicación', detalle: 'Explico ideas técnicas de forma clara y sencilla.' },
  { icono: 'equipo', nombre: 'Trabajo en equipo', detalle: 'Colaboro, escucho y aporto para que el grupo avance.' },
  { icono: 'curiosidad', nombre: 'Curiosidad', detalle: 'Me gusta entender cómo funcionan las cosas por dentro.' },
  { icono: 'aprendizaje', nombre: 'Aprendizaje constante', detalle: 'Cada semestre sumo nuevas herramientas y lenguajes.' },
  { icono: 'adaptabilidad', nombre: 'Adaptabilidad', detalle: 'Me muevo entre web, móvil e IoT sin miedo a lo nuevo.' },
  { icono: 'scrum', nombre: 'Trabajo ágil (Scrum)', detalle: 'Co-lidero un equipo en ELOMUX mientras aprendo la metodología Scrum.' },
];

// Áreas técnicas: elige una para ver el detalle
const areas = [
  {
    id: 'frontend',
    icono: 'codigo',
    nombre: 'Frontend',
    nivel: 'Intermedio',
    tecnologias: ['React', 'JavaScript', 'HTML / CSS', 'Vite'],
    descripcion: 'Construyo interfaces con componentes reutilizables, props y estado. Es el área en la que más trabajo.',
  },
  {
    id: 'diseno',
    icono: 'diseno',
    nombre: 'Diseño web',
    nivel: 'Intermedio',
    tecnologias: ['Flexbox', 'Grid', 'Bootstrap'],
    descripcion: 'Layouts responsivos que se ven bien en cualquier pantalla.',
  },
  {
    id: 'datos',
    icono: 'basedatos',
    nombre: 'Bases de datos',
    nivel: 'Avanzado',
    tecnologias: ['PostgreSQL', 'MySQL', 'MariaDB', 'Workbench', 'Postman'],
    descripcion: 'Diseño tablas y relaciones, escribo consultas SQL y pruebo APIs que guardan y leen datos.',
  },
  {
    id: 'versiones',
    icono: 'versiones',
    nombre: 'Control de versiones',
    nivel: 'Avanzado',
    tecnologias: ['Git', 'GitHub'],
    descripcion: 'Historial de cambios, ramas y publicación de proyectos en GitHub.',
  },
  {
    id: 'iot',
    icono: 'hardware',
    nombre: 'IoT y electrónica',
    nivel: 'Básico',
    tecnologias: ['Arduino UNO', 'Tinkercad', 'LCD 16x2'],
    descripcion: 'Prototipos con sensores y pantallas, simulados en Tinkercad antes de armarlos.',
  },
  {
    id: 'movil',
    icono: 'movil',
    nombre: 'Desarrollo móvil',
    nivel: 'Básico',
    tecnologias: ['Android Studio (Java)', 'Expo', 'React Native'],
    descripcion: 'Apps con actividades, bases de datos locales y modo claro/oscuro.',
  },
];

// Hacia dónde voy: "actual" marca la etapa de hoy
const ruta = [
  { etiqueta: 'Hoy', titulo: 'Estudiante de Software con IA', detalle: '5.º semestre en SENATI y formación dual en ELOMUX' },
  { etiqueta: 'Próximo paso', titulo: 'Desarrolladora Junior', detalle: 'Prácticas o primer empleo en un equipo de desarrollo' },
  { etiqueta: 'Meta', titulo: 'Ingeniera de Software', detalle: 'Especializada en soluciones con Inteligencia Artificial' },
];
const ETAPA_ACTUAL = 0;

const Habilidades = () => {
  const [seleccion, setSeleccion] = useState(areas[0]);

  return (
    <section id="habilidades" className="section section-alt">
      <div className="section-container reveal">
        <header className="section-header">
          <span className="section-kicker">02 · habilidades</span>
          <h2 className="section-title">
            Lo que <span className="text-accent">sé hacer</span>
          </h2>
          <p className="section-subtitle">
            Cómo trabajo, en qué áreas me muevo y hacia dónde quiero llegar.
          </p>
        </header>

        <div className="habilidades-grid">
          {/* Habilidades blandas */}
          <article className="hab-card">
            <h3 className="hab-subtitulo">Habilidades blandas</h3>
            <ul className="blandas">
              {blandas.map((b) => (
                <li key={b.nombre}>
                  <span className="blanda-icono" aria-hidden="true">
                    <IconoLinea nombre={b.icono} tamano={20} />
                  </span>
                  <div>
                    <p className="blanda-nombre">{b.nombre}</p>
                    <p className="blanda-detalle">{b.detalle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Áreas técnicas */}
          <article className="hab-card">
            <h3 className="hab-subtitulo">Áreas técnicas</h3>
            <div className="areas">
              {areas.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`area ${seleccion.id === a.id ? 'activa' : ''}`}
                  onClick={() => setSeleccion(a)}
                  aria-pressed={seleccion.id === a.id}
                >
                  <span className="area-icono" aria-hidden="true">
                    <IconoLinea nombre={a.icono} tamano={20} />
                  </span>
                  <span className="area-nombre">{a.nombre}</span>
                  <span className="area-nivel">{a.nivel}</span>
                </button>
              ))}
            </div>

            <div className="area-detalle" key={seleccion.id}>
              <p className="detalle-texto">{seleccion.descripcion}</p>
              <div className="detalle-tags">
                {seleccion.tecnologias.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* Hacia dónde voy */}
        <article className="hab-card ruta-card">
          <h3 className="hab-subtitulo">Hacia dónde voy</h3>
          <ol className="ruta">
            {ruta.map((etapa, i) => (
              <li key={etapa.titulo} className={i === ETAPA_ACTUAL ? 'actual' : ''}>
                <span className="ruta-punto" aria-hidden="true"></span>
                <span className="ruta-etiqueta">{etapa.etiqueta}</span>
                <span className="ruta-titulo">{etapa.titulo}</span>
                <span className="ruta-detalle">{etapa.detalle}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
};

export default Habilidades;
