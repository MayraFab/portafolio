import { useEffect, useState } from 'react';
import './Navbar.css';

// Enlaces del menú: cada uno apunta al id de una sección
const links = [
  { num: '01', label: 'Perfil', href: '#sobre-mi' },
  { num: '02', label: 'Habilidades', href: '#habilidades' },
  { num: '03', label: 'Tech Stack', href: '#tech-stack' },
  { num: '04', label: 'Proyectos', href: '#proyectos' },
  { num: '05', label: 'Certificados', href: '#certificados' },
  { num: '06', label: 'Contacto', href: '#contacto' },
];

const Navbar = () => {
  // Estado para controlar el menú hamburguesa en móviles
  const [isOpen, setIsOpen] = useState(false);
  // Porcentaje recorrido del portafolio (barra de progreso)
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const alHacerScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const porcentaje = total > 0 ? Math.min(100, Math.round((window.scrollY / total) * 100)) : 0;
      setProgreso(porcentaje);
    };
    alHacerScroll();
    window.addEventListener('scroll', alHacerScroll, { passive: true });
    return () => window.removeEventListener('scroll', alHacerScroll);
  }, []);

  return (
    <nav className="navbar" aria-label="Navegación principal">
      {/* Logo: lleva al inicio */}
      <a href="#inicio" className="navbar-logo" onClick={() => setIsOpen(false)}>
        <span className="logo-tag">&lt;</span>
        Mayra<span className="logo-acento">.dev</span>
        <span className="logo-tag"> /&gt;</span>
      </a>

      {/* Botón hamburguesa (solo visible en móviles) */}
      <button
        type="button"
        className={`navbar-toggle ${isOpen ? 'active' : ''}`}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Enlaces de navegación */}
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
            <span className="link-num">{link.num}.</span>
            {link.label}
          </a>
        ))}
      </div>

      {/* Barra de progreso de lectura */}
      <div className="progreso-bar" aria-hidden="true">
        <span style={{ width: `${progreso}%` }}></span>
      </div>
    </nav>
  );
};

export default Navbar;
