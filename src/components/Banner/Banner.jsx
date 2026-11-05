import { useEffect, useState } from 'react';
import './Banner.css';
import Rocas from '../Rocas/Rocas';
import { useSeccion } from '../../context/ContenidoContext';

// Frases que se escriben y borran solas en el subtítulo
const roles = [
  'Desarrolladora Frontend',
  'Estudiante de Software con IA',
  'Maker de IoT con Arduino',
  'Creadora de apps móviles',
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

// Decoración de fondo en los bordes del inicio: hojas, circuitos, puntos, formas y destellos.
// El centro queda libre para el nombre, la descripción y los botones.
const Hoja = ({ x, y, giro, escala = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${giro}) scale(${escala})`}>
    <path d="M0 0 C 14 -18, 40 -20, 58 0 C 40 20, 14 18, 0 0 Z" />
    <path className="hoja-vena" d="M2 0 L54 0" />
  </g>
);

const Rama = ({ className }) => (
  <svg className={`deco deco-rama ${className}`} viewBox="0 0 240 240" aria-hidden="true">
    <path className="rama-tallo" d="M0 30 C 60 40, 110 70, 150 130 S 210 220, 230 240" />
    <Hoja x={40} y={36} giro={-35} />
    <Hoja x={70} y={48} giro={40} escala={0.9} />
    <Hoja x={105} y={78} giro={-20} escala={1.05} />
    <Hoja x={128} y={104} giro={65} escala={0.85} />
    <Hoja x={160} y={150} giro={10} escala={0.9} />
    <Hoja x={182} y={185} giro={80} escala={0.75} />
  </svg>
);

const Circuito = ({ className }) => (
  <svg className={`deco deco-circuito ${className}`} viewBox="0 0 200 260" aria-hidden="true">
    <path d="M0 40 H60 L90 70 V140 L120 170 H170" />
    <path d="M0 110 H40 L60 130 V210 H110" />
    <path d="M0 190 H25 L45 210 V260" />
    <path d="M90 100 H140 L160 80 V30" />
    <circle cx="170" cy="170" r="5" />
    <circle cx="110" cy="210" r="5" />
    <circle cx="160" cy="30" r="5" />
    <circle cx="90" cy="70" r="3" className="nodo-lleno" />
    <circle cx="60" cy="130" r="3" className="nodo-lleno" />
  </svg>
);

const Destello = ({ className }) => (
  <svg className={`deco deco-destello ${className}`} viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10 0 C 11 7, 13 9, 20 10 C 13 11, 11 13, 10 20 C 9 13, 7 11, 0 10 C 7 9, 9 7, 10 0 Z" />
  </svg>
);

const DecoracionHero = () => (
  <div className="hero-deco" aria-hidden="true">
    <span className="deco deco-forma forma-1"></span>
    <span className="deco deco-forma forma-2"></span>
    <span className="deco deco-forma forma-3"></span>
    <span className="deco deco-puntos puntos-1"></span>
    <span className="deco deco-puntos puntos-2"></span>
    <span className="deco deco-cuadricula"></span>
    <Rama className="rama-1" />
    <Rama className="rama-2" />
    <Circuito className="circuito-1" />
    <Circuito className="circuito-2" />
    <Destello className="destello-1" />
    <Destello className="destello-2" />
    <Destello className="destello-3" />
    <Destello className="destello-4" />
    <Destello className="destello-5" />
  </div>
);

const Banner = () => {
  const rol = useMaquinaDeEscribir(roles);
  const proyectos = useSeccion('proyectos').items;
  const certificados = useSeccion('certificados').items;

  // Datos rápidos debajo de los botones (se actualizan solos al agregar o quitar desde el panel)
  const datos = [
    { valor: '5.º', texto: 'semestre en SENATI' },
    { valor: proyectos.length, texto: 'proyectos' },
    { valor: certificados.length, texto: 'certificados' },
  ];

  return (
    <section id="inicio" className="hero-section">
      <DecoracionHero />
      <Rocas invertida />

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
