/*
  ============================================================
  TECH STACK — cada tecnología es una "tecla" del teclado.
  Para agregar una, copia un objeto { ... } dentro de su fila.
  ============================================================
  - icono: URL de un ícono de Devicon (https://devicon.dev). Si no existe,
           déjalo en null y escribe una "sigla" corta que se mostrará en su lugar.
  - estado: 'en-uso' | 'aprendiendo'
*/
const DEVICON = 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons';

export const techStack = [
  {
    fila: 'Frontend',
    items: [
      { nombre: 'React', icono: `${DEVICON}/react/react-original.svg`, estado: 'en-uso', descripcion: 'Construcción de interfaces y componentes reutilizables.' },
      { nombre: 'JavaScript', icono: `${DEVICON}/javascript/javascript-original.svg`, estado: 'aprendiendo', descripcion: 'Fundamentos del lenguaje para experiencias interactivas.' },
      { nombre: 'HTML5', icono: `${DEVICON}/html5/html5-original.svg`, estado: 'en-uso', descripcion: 'Estructura semántica y accesible para sitios web.' },
      { nombre: 'CSS3', icono: `${DEVICON}/css3/css3-original.svg`, estado: 'en-uso', descripcion: 'Estilos, animaciones y diseño responsivo.' },
      { nombre: 'Vite', icono: `${DEVICON}/vitejs/vitejs-original.svg`, estado: 'en-uso', descripcion: 'Entorno de desarrollo rápido para mis proyectos con React.' },
    ],
  },
  {
    fila: 'Diseño web',
    items: [
      { nombre: 'Flexbox y Grid', icono: null, sigla: '▦', estado: 'en-uso', descripcion: 'Diseño de layouts adaptables a distintas pantallas.' },
      { nombre: 'Bootstrap', icono: `${DEVICON}/bootstrap/bootstrap-original.svg`, estado: 'en-uso', descripcion: 'Maquetación rápida con componentes y grid predefinidos.' },
    ],
  },
  {
    fila: 'Móvil',
    items: [
      { nombre: 'React Native', icono: `${DEVICON}/react/react-original.svg`, estado: 'aprendiendo', descripcion: 'Apps móviles multiplataforma con componentes de React.' },
      { nombre: 'Expo', icono: null, sigla: 'EXPO', estado: 'aprendiendo', descripcion: 'Desarrollo y pruebas de apps móviles sin configuración complicada.' },
      { nombre: 'Android Studio', icono: `${DEVICON}/androidstudio/androidstudio-original.svg`, estado: 'aprendiendo', descripcion: 'Aplicaciones Android con actividades y bases de datos locales.' },
      { nombre: 'Java', icono: `${DEVICON}/java/java-original.svg`, estado: 'aprendiendo', descripcion: 'Lenguaje que uso para programar apps en Android Studio.' },
    ],
  },
  {
    fila: 'Bases de datos',
    items: [
      { nombre: 'PostgreSQL', icono: `${DEVICON}/postgresql/postgresql-original.svg`, estado: 'en-uso', descripcion: 'Base de datos relacional: tablas, relaciones y consultas SQL.' },
      { nombre: 'MySQL', icono: `${DEVICON}/mysql/mysql-original.svg`, estado: 'en-uso', descripcion: 'Diseño de tablas y consultas SQL para aplicaciones web.' },
      { nombre: 'MariaDB', icono: `${DEVICON}/mariadb/mariadb-original.svg`, estado: 'en-uso', descripcion: 'Motor compatible con MySQL para proyectos y prácticas.' },
      { nombre: 'MySQL Workbench', icono: null, sigla: 'WB', estado: 'en-uso', descripcion: 'Modelado visual de bases de datos y ejecución de consultas.' },
    ],
  },
  {
    fila: 'Herramientas',
    items: [
      { nombre: 'Git', icono: `${DEVICON}/git/git-original.svg`, estado: 'aprendiendo', descripcion: 'Control de versiones y gestión del historial de cambios.' },
      { nombre: 'GitHub', icono: `${DEVICON}/github/github-original.svg`, estado: 'en-uso', descripcion: 'Colaboración y publicación de proyectos de software.' },
      { nombre: 'Postman', icono: `${DEVICON}/postman/postman-original.svg`, estado: 'en-uso', descripcion: 'Pruebas de APIs: peticiones, respuestas y colecciones.' },
    ],
  },
  {
    fila: 'IoT',
    items: [
      { nombre: 'Arduino', icono: `${DEVICON}/arduino/arduino-original.svg`, estado: 'en-uso', descripcion: 'Prototipos con sensores y pantallas LCD.' },
      { nombre: 'Tinkercad', icono: null, sigla: 'TC', estado: 'en-uso', descripcion: 'Simulación de circuitos antes de armarlos en físico.' },
    ],
  },
];
