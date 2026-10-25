import './Footer.css';

const Footer = () => {
  const anio = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-contenido">
        <p className="footer-nombre">
          <span className="footer-acento">Mayra Fabiola</span> Mallqui Paccini
        </p>
        <p className="footer-texto">
          © {anio} · Hecho con React y Vite 🌿
        </p>
        <a href="#inicio" className="footer-arriba">Volver arriba ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
