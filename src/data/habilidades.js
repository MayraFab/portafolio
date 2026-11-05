/*
  ============================================================
  HABILIDADES — también se pueden agregar y editar desde el panel
  de administración (botón "Administrar" al final de la web).
  ============================================================
  - icono: nombre de un ícono de src/components/Iconos/IconoLinea.jsx
*/

// Habilidades blandas
export const blandasData = [
  { icono: 'comunicacion', nombre: 'Comunicación', detalle: 'Explico ideas técnicas de forma clara y sencilla.' },
  { icono: 'equipo', nombre: 'Trabajo en equipo', detalle: 'Colaboro, escucho y aporto para que el grupo avance.' },
  { icono: 'curiosidad', nombre: 'Curiosidad', detalle: 'Me gusta entender cómo funcionan las cosas por dentro.' },
  { icono: 'aprendizaje', nombre: 'Aprendizaje constante', detalle: 'Cada semestre sumo nuevas herramientas y lenguajes.' },
  { icono: 'adaptabilidad', nombre: 'Adaptabilidad', detalle: 'Me muevo entre web, móvil e IoT sin miedo a lo nuevo.' },
  { icono: 'scrum', nombre: 'Trabajo ágil (Scrum)', detalle: 'Co-lidero un equipo en ELOMUX mientras aprendo la metodología Scrum.' },
];

// Áreas técnicas: en la web se elige una para ver el detalle
export const areasData = [
  {
    id: 'frontend',
    icono: 'codigo',
    nombre: 'Frontend',
    tecnologias: ['React', 'JavaScript', 'HTML / CSS', 'Vite'],
    descripcion: 'Construyo interfaces con componentes reutilizables, props y estado.',
  },
  {
    id: 'diseno',
    icono: 'diseno',
    nombre: 'Diseño web',
    tecnologias: ['Flexbox', 'Grid', 'Bootstrap'],
    descripcion: 'Layouts responsivos que se ven bien en cualquier pantalla.',
  },
  {
    id: 'datos',
    icono: 'basedatos',
    nombre: 'Bases de datos',
    tecnologias: ['SQL', 'PostgreSQL', 'MySQL', 'MariaDB', 'Supabase', 'Workbench', 'Postman'],
    descripcion: 'Es el área en la que más trabajo: diseño tablas y relaciones, escribo consultas SQL y pruebo APIs que guardan y leen datos.',
  },
  {
    id: 'versiones',
    icono: 'versiones',
    nombre: 'Control de versiones',
    tecnologias: ['Git', 'GitHub'],
    descripcion: 'Historial de cambios, ramas y publicación de proyectos en GitHub.',
  },
  {
    id: 'iot',
    icono: 'hardware',
    nombre: 'IoT y electrónica',
    tecnologias: ['Arduino UNO', 'Tinkercad', 'LCD 16x2'],
    descripcion: 'Prototipos con sensores y pantallas, simulados en Tinkercad antes de armarlos.',
  },
  {
    id: 'movil',
    icono: 'movil',
    nombre: 'Desarrollo móvil',
    tecnologias: ['Android Studio (Java)', 'Expo', 'React Native'],
    descripcion: 'Apps con actividades, bases de datos locales y modo claro/oscuro.',
  },
];
