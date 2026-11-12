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
           'tareas' · 'comida' · 'enchufe' · 'movil' · 'diseno' · 'datos' · 'iot' ·
           'salud' · 'tienda' · 'termometro'
           (los dibujos están en src/components/Iconos/IconoLinea.jsx)
  - linkDemo / linkCodigo: si los dejas vacíos (''), el botón no aparece.
               Si linkDemo es de Tinkercad, el botón dice "Ver simulación".
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
  // Nova Salud usa ids 5 y 6 (no 3): el 3 quedó marcado como oculto en el panel
  {
    id: 5,
    categoria: 'web',
    archivo: 'nova-salud-erp.jsx',
    icono: 'salud',
    imagen: null,
    titulo: 'Nova Salud – ERP interno',
    descripcion:
      'Panel interno de una farmacia para controlar el inventario. Solo lo usa el personal: cajero, administrador y almacenista, cada uno con sus permisos.',
    tecnologias: ['React', 'Vite', 'JavaScript', 'CSS', 'Vercel'],
    linkDemo: 'https://nova-salud-erp.vercel.app/',
    linkCodigo: 'https://github.com/nova-salud-equipo/nova-salud-erp',
  },
  {
    id: 6,
    categoria: 'web',
    archivo: 'nova-salud-tienda.jsx',
    icono: 'tienda',
    imagen: null,
    titulo: 'Nova Salud – Tienda online',
    descripcion:
      'Página pública de la farmacia donde los clientes compran productos y reservan citas.',
    tecnologias: ['React', 'Vite', 'JavaScript', 'CSS', 'jsPDF', 'Vercel'],
    linkDemo: 'https://nova-salud-tienda.vercel.app/',
    linkCodigo: 'https://github.com/nova-salud-equipo/nova-salud-tienda',
  },
  {
    id: 4,
    categoria: 'iot',
    archivo: 'control-temperatura.ino',
    icono: 'termometro',
    imagen: null,
    titulo: 'Sistema de control de temperatura automatizado',
    descripcion:
      'Circuito con Arduino UNO que mide la temperatura con un sensor y activa automáticamente la respuesta del sistema, mostrando las lecturas en una pantalla LCD. Simulado en Tinkercad.',
    tecnologias: ['Arduino UNO', 'Sensor de temperatura', 'LCD 16x2', 'Tinkercad'],
    linkDemo: 'https://www.tinkercad.com/things/2aX6wOTctdU-laboratorio-14?sharecode=JaBdvC6Z5Lu9z4f3DBkUGOe2-glAO9vzu9FDlWrae-Q',
    linkCodigo: '',
  },
];
