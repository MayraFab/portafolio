import { useEffect, useState } from 'react';
import './Banner.css';
import Rocas from '../Rocas/Rocas';
import { proyectosData } from '../../data/proyectos';
import { certificadosData } from '../../data/certificados';

// Frases que se escriben y borran solas en el subtítulo
const roles = [
  'Desarrolladora Frontend',
  'Estudiante de Software con IA',
  'Maker de IoT con Arduino',
  'Creadora de apps móviles',
];

// Datos rápidos debajo de los botones (se actualizan solos al agregar proyectos o certificados)
const datos = [
  { valor: '5.º', texto: 'semestre en SENATI' },
  { valor: proyectosData.length, texto: 'proyectos' },
  { valor: certificadosData.length, texto: 'certificados' },
];

// Efecto máquina de escribir: escribe una palabra, espera, la borra y pasa a la siguiente
const useMaquinaDeEscribir = (palabras) => {
  const [texto, setTexto] = useState('');
  const [indice, setIndice] = useState(0);
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const palabra = palabras[indice];
    const completa = !borrando && texto === palabra;
    const vacia = borrando && texto === '';
    const espera = completa ? 1700 : vacia ? 300 : borrando ? 35 : 75;

    const temporizador = setTimeout(() => {
      if (completa) setBorrando(true);
      else if (vacia) {
        setBorrando(false);
        setIndice((indice + 1) % palabras.length);
      } else {
        setTexto(palabra.slice(0, texto.length + (borrando ? -1 : 1)));
      }
    }, espera);

    return () => clearTimeout(temporizador);
  }, [texto, borrando, indice, palabras]);

  return texto;
};

const Banner = () => {
  const rol = useMaquinaDeEscribir(roles);

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-content">
        {/* 1. Etiqueta de estado */}
        <div className="status-badge">
          <span className="status-dot"></span>
          Disponible para nuevos proyectos
        </div>

        {/* 2. Título principal */}
        <h1 className="hero-title">
          Mayra Fabiola <span className="hero-apellido">Mallqui Paccini</span>
        </h1>

        {/* 3. Rol que se escribe solo */}
        <h2 className="hero-subtitle" aria-label={roles.join(', ')}>
          <span aria-hidden="true">
            <span className="hero-prompt">&gt;</span> {rol}
            <span className="cursor">▍</span>
          </span>
        </h2>

        {/* 4. Descripción */}
        <p className="hero-description">
          Me interesa crear soluciones digitales útiles y accesibles. Combino curiosidad,
          aprendizaje constante y trabajo en equipo para convertir ideas en experiencias
          bien construidas.
        </p>

        {/* 5. Botones de acción */}
        <div className="hero-buttons">
          <a href="#proyectos" className="btn btn-primary">Ver proyectos</a>
          <a href="#contacto" className="btn btn-ghost">Contáctame</a>
        </div>

        {/* 6. Datos rápidos */}
        <ul className="hero-datos">
          {datos.map((dato) => (
            <li key={dato.texto}>
              <strong>{dato.valor}</strong>
              <span>{dato.texto}</span>
            </li>
          ))}
        </ul>
      </div>

      <Rocas />
    </section>
  );
};

export default Banner;
