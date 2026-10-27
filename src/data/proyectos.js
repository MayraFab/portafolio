/*
  ============================================================
  TUS PROYECTOS — para agregar uno nuevo, copia un bloque { ... }
  y pégalo al final del arreglo. Se mostrará automáticamente en
  la sección Proyectos, en la terminal (comando "proyectos") y
  en las misiones de la ficha RPG.
  ============================================================
  - categoria: 'web' | 'movil' | 'iot'  (sirve para los filtros)
  - archivo:   nombre "de archivo" que aparece en la barra de la tarjeta
  - imagen:    si tienes captura, guárdala en src/assets/ e impórtala arriba:
                 import capturaEscuela from '../assets/escuela.png';
               y luego escribe  imagen: capturaEscuela
               Si la dejas en null, se muestra una portada con el ícono.
  - icono: ícono de línea negra de la portada. Opciones: 'carpeta' · 'codigo' · 'escuela' ·
           'tareas' · 'comida' · 'enchufe' · 'movil' · 'diseno' · 'datos' · 'iot'
           (los dibujos están en src/components/Iconos/IconoLinea.jsx)
  - linkDemo / linkCodigo: si los dejas vacíos (''), el botón no aparece.
*/
export const proyectosData = [
  {
    id: 1,
    categoria: 'web',
    archivo: 'appEscuela.jsx',
    icono: 'escuela',
    imagen: null,
    titulo: 'appEscuela – Sistema de Matrícula',
    descripcion:
      'Directorio de alumnos con tarjetas reutilizables, props y useState para cambiar el estado de cada matrícula.',
    tecnologias: ['React', 'Vite', 'Bootstrap'],
    linkDemo: '',
    linkCodigo: 'https://github.com/MayraFab/appEscuela',
  },
  {
    id: 2,
    categoria: 'web',
    archivo: 'gestor-tareas.jsx',
    icono: 'tareas',
    imagen: null,
    titulo: 'Gestor de Tareas',
    descripcion:
      'Aplicación web para gestionar tareas: crear, editar, eliminar y organizarlas por estado.',
    tecnologias: ['React', 'Vite'],
    linkDemo: '',
    linkCodigo: '',
  },
  {
    id: 3,
    categoria: 'movil',
    archivo: 'barbivo-food.tsx',
    icono: 'comida',
    imagen: null,
    titulo: 'BARBIVO-FOOD',
    descripcion:
      'Aplicación móvil de pedidos de comida desarrollada con Expo, con experiencia visual en modo claro y oscuro.',
    tecnologias: ['Expo', 'React Native', 'Modo claro/oscuro'],
    linkDemo: '',
    linkCodigo: '',
  },
  {
    id: 4,
    categoria: 'iot',
    archivo: 'bienvenida.ino',
    icono: 'enchufe',
    imagen: null,
    titulo: 'Mensaje de bienvenida con Arduino',
    descripcion:
      'Proyecto con Arduino UNO que muestra un mensaje de bienvenida en una pantalla LCD.',
    tecnologias: ['Arduino UNO', 'LCD 16x2', 'Tinkercad'],
    linkDemo: '',
    linkCodigo: '',
  },
];
