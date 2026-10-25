import './Banner.css';
import miFoto from '../../assets/miFoto.png';

// Cuando reemplaces src/assets/miFoto.png por tu foto real, cambia esto a true
const TENGO_FOTO = false;

const Banner = () => {
  return (
    <section id="inicio" className="hero-section">
      {/* Manchas decorativas de fondo */}
      <span className="blob blob-rosa" aria-hidden="true"></span>
      <span className="blob blob-verde" aria-hidden="true"></span>

      <div className="hero-content">
        {/* 1. Etiqueta de estado */}
        <div className="status-badge">
          <span className="status-dot"></span>
          Disponible para nuevos proyectos
        </div>

        {/* 2. Foto de perfil (o iniciales si aún no hay foto) */}
        <div className="profile-photo-container">
          {TENGO_FOTO ? (
            <img src={miFoto} alt="Foto de Mayra Mallqui" className="profile-photo" />
          ) : (
            <div className="profile-photo profile-initials" aria-label="Iniciales de Mayra Mallqui">
              MM
            </div>
          )}
        </div>

        {/* 3. Título principal */}
        <h1 className="hero-title">
          Mayra Fabiola <br />
          <span className="text-accent">Mallqui Paccini</span>
        </h1>

        {/* 4. Subtítulo (rol) */}
        <h2 className="hero-subtitle">
          Estudiante de Ingeniería de Software con IA | SENATI
        </h2>

        {/* 5. Descripción */}
        <p className="hero-description">
          Me interesa crear soluciones digitales útiles y accesibles. Combino curiosidad,
          aprendizaje constante y trabajo en equipo para convertir ideas en experiencias
          bien construidas.
        </p>

        {/* 6. Botones de acción */}
        <div className="hero-buttons">
          <a href="#proyectos" className="btn btn-primary">Ver Proyectos</a>
          <a href="#contacto" className="btn btn-secondary">Contáctame</a>
        </div>
      </div>

      {/* 7. Indicador de scroll */}
      <a href="#sobre-mi" className="scroll-indicator" aria-label="Bajar a Sobre mí">
        ↓
      </a>
    </section>
  );
};

export default Banner;
