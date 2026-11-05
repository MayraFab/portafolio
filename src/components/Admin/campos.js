import { iconosCertificado, iconosProyecto, todosLosIconos } from '../Iconos/IconoLinea';

/*
  Campos de los formularios del panel, uno por sección.
  Para pedir un dato más, agrega un objeto { nombre, etiqueta, tipo } a la lista.
*/

// ---------- Proyectos ----------
export const camposProyecto = [
  { nombre: 'titulo', etiqueta: 'Título', requerido: true },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: true },
  {
    nombre: 'categoria',
    etiqueta: 'Categoría',
    tipo: 'select',
    opciones: [
      { valor: 'web', texto: 'Web' },
      { valor: 'movil', texto: 'Móvil' },
      { valor: 'iot', texto: 'IoT' },
    ],
  },
  { nombre: 'icono', etiqueta: 'Ícono de portada', tipo: 'select', opciones: iconosProyecto },
  { nombre: 'tecnologias', etiqueta: 'Tecnologías', ayuda: 'separadas por comas', tipo: 'lista', placeholder: 'React, Vite, CSS' },
  {
    nombre: 'linkCodigo',
    etiqueta: 'Enlace de GitHub',
    tipo: 'url',
    requerido: true,
    placeholder: 'https://github.com/MayraFab/mi-proyecto',
  },
  { nombre: 'linkDemo', etiqueta: 'Enlace de la página web', ayuda: 'opcional', tipo: 'url', placeholder: 'https://…' },
  { nombre: 'imagen', etiqueta: 'Imagen de portada', ayuda: 'opcional, enlace a una captura', tipo: 'url', placeholder: 'https://…' },
  { nombre: 'archivo', etiqueta: 'Nombre en la barra de la tarjeta', ayuda: 'opcional, se crea solo', placeholder: 'mi-proyecto.js' },
];

// Arma un nombre de archivo a partir del título: "Gestor de Tareas" → "gestor-de-tareas.js"
const nombreArchivo = (titulo) =>
  `${titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}.js`;

export const validarProyecto = (datos) =>
  /^https:\/\/github\.com\//.test(datos.linkCodigo) ? '' : 'El enlace de GitHub debe empezar con https://github.com/';

export const prepararProyecto = (datos) => ({ ...datos, archivo: datos.archivo || nombreArchivo(datos.titulo) });

// ---------- Certificados ----------
export const camposCertificado = [
  { nombre: 'titulo', etiqueta: 'Nombre del certificado', requerido: true },
  { nombre: 'emisor', etiqueta: 'Institución', requerido: true, inicial: 'Cisco Networking Academy' },
  { nombre: 'fecha', etiqueta: 'Fecha', ayuda: 'opcional', placeholder: 'Mar 2026' },
  { nombre: 'icono', etiqueta: 'Ícono', tipo: 'select', opciones: iconosCertificado },
  {
    nombre: 'link',
    etiqueta: 'Enlace del PDF',
    tipo: 'url',
    requerido: true,
    placeholder: 'https://drive.google.com/file/d/…/view',
  },
];

// ---------- Teclas del tech stack ----------
// "filas" son los nombres de las filas que ya existen, para sugerirlos al escribir
export const camposTecla = (filas) => [
  { nombre: 'nombre', etiqueta: 'Nombre de la tecnología', requerido: true },
  {
    nombre: 'fila',
    etiqueta: 'Fila del teclado',
    ayuda: 'elige una o escribe una nueva',
    requerido: true,
    sugerencias: filas,
  },
  {
    nombre: 'estado',
    etiqueta: 'Estado',
    tipo: 'select',
    opciones: [
      { valor: 'en-uso', texto: 'En uso' },
      { valor: 'aprendiendo', texto: 'Aprendiendo (tecla con luz)' },
    ],
  },
  { nombre: 'descripcion', etiqueta: 'Qué haces con ella', tipo: 'textarea', requerido: true },
  {
    nombre: 'icono',
    etiqueta: 'Ícono',
    ayuda: 'opcional, enlace a un SVG de devicon.dev',
    tipo: 'url',
    placeholder: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/…',
  },
  { nombre: 'sigla', etiqueta: 'Sigla si no hay ícono', ayuda: 'opcional, 2 a 4 letras', placeholder: 'TC' },
];

// ---------- Áreas técnicas ----------
export const camposArea = [
  { nombre: 'nombre', etiqueta: 'Nombre del área', requerido: true },
  { nombre: 'icono', etiqueta: 'Ícono', tipo: 'select', opciones: todosLosIconos },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: true },
  { nombre: 'tecnologias', etiqueta: 'Tecnologías', ayuda: 'separadas por comas', tipo: 'lista', placeholder: 'Git, GitHub' },
];

// ---------- Habilidades blandas ----------
export const camposBlanda = [
  { nombre: 'nombre', etiqueta: 'Habilidad', requerido: true },
  { nombre: 'icono', etiqueta: 'Ícono', tipo: 'select', opciones: todosLosIconos },
  { nombre: 'detalle', etiqueta: 'Detalle', tipo: 'textarea', requerido: true },
];
