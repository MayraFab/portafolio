import './Footer.css';
import { useAdmin } from '../../context/AdminContext';

const Footer = () => {
  const anio = new Date().getFullYear();
  const { sesion, abrirLogin } = useAdmin();

  return (
    <footer className="footer zona-oscura">
      <div className="footer-contenido">
        <p className="footer-nombre">
          <span className="footer-acento">Mayra Fabiola</span> Mallqui Paccini
        </p>
        <p className="footer-texto">© {anio} · Hecho con React, Vite y mucho.</p>
        <a href="#inicio" className="footer-arriba">Volver arriba ↑</a>
        {!sesion && (
          <button type="button" className="footer-admin" onClick={abrirLogin}>
            Administrar
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
