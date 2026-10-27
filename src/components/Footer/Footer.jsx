import './Footer.css';
import { useAdmin } from '../../context/AdminContext';

const Footer = () => {
  const anio = new Date().getFullYear();
  const { sesion, abrirLogin } = useAdmin();

  return (
    <footer className="footer zona-oscura">
      <div className="footer-contenido">
        <p className="footer-nombre">
          <span className="footer-acento">El final de la página, pero el inicio de algo grande. </span>
          <span className="footer-pregunta">¿Conectamos?</span>
        </p>
        <p className="footer-texto">© {anio} · Diseñado por Mayra Mallqui Paccini.</p>
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
