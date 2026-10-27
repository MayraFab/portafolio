import IconoLinea, { iconosCertificado } from '../Iconos/IconoLinea';

/*
  Ícono de línea para los certificados (los dibujos están en src/components/Iconos/IconoLinea.jsx).
  En src/data/certificados.js, el campo "icono" usa uno de estos nombres:
    'codigo' · 'datos' · 'seguridad' · 'iot' · 'redes' · 'hardware' · 'certificado'
  Si el nombre no existe, se muestra 'certificado'.
*/
export const nombresIconos = iconosCertificado;

const IconoCertificado = ({ nombre, tamano = 28 }) => (
  <IconoLinea nombre={nombre} tamano={tamano} respaldo="certificado" />
);

export default IconoCertificado;
