import './Perfil.css';

// Datos de la línea de tiempo (agrega o quita ítems aquí)
const timelineData = [
  {
    id: 1,
    titulo: 'Ingeniería de Software con IA',
    lugar: 'SENATI',
    estado: 'En curso',
  },
  {
    id: 2,
    titulo: 'Formación dual',
    lugar: 'ELOMUX',
    estado: 'En curso',
  },
];

const Perfil = () => {
  return (
    <section id="sobre-mi" className="sobre-mi-section">
      <div className="sobre-mi-container">
        <h2 className="section-title">Sobre mí</h2>
        <p className="section-subtitle">Un poco de quién soy y cómo trabajo</p>

        <div className="sobre-mi-grid">
          {/* =====================================
              TARJETA 1: PERFIL PROFESIONAL
          ====================================== */}
          <div className="card">
            <div className="card-header">
              <div className="icon-box icon-rosa">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Perfil profesional</h3>
            </div>

            <p className="card-text">
              Soy estudiante de quinto semestre de Ingeniería de Software con Inteligencia
              Artificial en SENATI. Actualmente complemento mi formación con el modelo dual en
              la empresa ELOMUX, donde conozco de cerca el trabajo y los retos de un entorno
              profesional.
            </p>
            <p className="card-text">
              Me considero una persona multifacética, curiosa y comprometida con aprender cosas
              nuevas constantemente. Disfruto explorar distintas áreas de la tecnología y aplicar
              lo aprendido en proyectos concretos.
            </p>
            <p className="card-text">
              Destaco por mis habilidades blandas, la colaboración y la comunicación clara de
              ideas, cualidades que me ayudan a aportar y crecer junto a cada equipo.
            </p>
          </div>

          {/* =====================================
              TARJETA 2: EDUCACIÓN Y EXPERIENCIA
          ====================================== */}
          <div className="card">
            <div className="card-header">
              <div className="icon-box icon-verde">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3>Formación</h3>
            </div>

            <div className="timeline">
              {timelineData.map((item) => (
                <div key={item.id} className="timeline-item">
                  <span className="badge badge-outline">{item.estado}</span>
                  <h4>{item.titulo}</h4>
                  <span className="timeline-date">{item.lugar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
