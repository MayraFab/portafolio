/*
  ============================================================
  CERTIFICADOS E IDIOMAS
  ============================================================

  Formas de poner el link:
   1) Google Drive (recomendado): sube el PDF, clic derecho → Compartir →
      "Cualquier persona con el enlace" → Copiar enlace. Pega el link tal cual,
      por ejemplo: 'https://drive.google.com/file/d/1AbC.../view?usp=sharing'
      (la web lo convierte sola al formato de vista previa).
   2) PDF dentro del proyecto: guarda el archivo en public/certificados/
      (por ejemplo public/certificados/python.pdf) y escribe:
      link: '/certificados/python.pdf'
   3) Otro enlace (Credly, Cisco, etc.): también funciona, pero algunas páginas
      no se dejan mostrar dentro de otra web; en ese caso el visor ofrece
      el botón "Abrir en pestaña nueva".

  - icono: 'codigo' | 'datos' | 'seguridad' | 'iot' | 'redes' | 'hardware' | 'certificado'
    (íconos de línea negra; están en src/components/Certificados/IconoCertificado.jsx)

  Si dejas link vacío (''), el botón aparece como "Enlace pendiente".
  Para agregar un certificado nuevo, copia un bloque { ... } y pégalo al final.
*/
export const ingles = {
  nivel: 'Intermedio 11',
  institucion: 'ICPNA',
  estado: 'En curso',
  // Etapas del camino; "actual" marca dónde estás
  etapas: ['Básico', 'Intermedio', 'Avanzado'],
  actual: 1,
};

export const certificadosData = [
  {
    id: 1,
    icono: 'codigo',
    titulo: 'Fundamentos de Python 1',
    emisor: 'Cisco Networking Academy',
    fecha: '',
    link: 'https://drive.google.com/file/d/1GBPpI7840gGXANr6BMQrBRGnj5zildtA/view?usp=drive_link',
  },
  {
    id: 2,
    icono: 'datos',
    titulo: 'Introducción a la Ciencia de Datos',
    emisor: 'Cisco Networking Academy',
    fecha: '',
    link: 'https://drive.google.com/file/d/1OE8bu5iN-POrZtwI_XUEzETGf0kN0gZV/view?usp=drive_link',
  },
  {
    id: 3,
    icono: 'seguridad',
    titulo: 'Introducción a la Ciberseguridad',
    emisor: 'Cisco Networking Academy',
    fecha: '',
    link: 'https://drive.google.com/file/d/10qSo4LqZOMl1X2SpaudYEb2oBeovkEJ0/view?usp=drive_link',
  },
  {
    id: 4,
    icono: 'iot',
    titulo: 'Introducción a IoT',
    emisor: 'Cisco Networking Academy',
    fecha: '',
    link: 'https://drive.google.com/file/d/10S2gpGzd9MNpRRHol3YycAseU9u8vz-S/view?usp=drive_link',
  },
  {
    id: 5,
    icono: 'redes',
    titulo: 'Conceptos Básicos de Redes',
    emisor: 'Cisco Networking Academy',
    fecha: '',
    link: 'https://drive.google.com/file/d/1PSEUQMOftnUFFAsXO2VRjTeOvT-3gaLD/view?usp=drive_link',
  },
  {
    id: 6,
    icono: 'hardware',
    titulo: 'Conceptos Básicos de Hardware de Computadora',
    emisor: 'Cisco Networking Academy',
    fecha: '',
    link: 'https://drive.google.com/file/d/1YBu4bwOqL9-Nm4wFeKhC2AAEdOZdyYPk/view?usp=drive_link',
  },
];
