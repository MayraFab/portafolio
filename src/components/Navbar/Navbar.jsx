import { useState } from 'react';
import './Navbar.css';

// Enlaces del menú: cada uno apunta al id de una sección
const links = [
  { label: 'Perfil', href: '#sobre-mi' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

const Navbar = () => {
  // Estado para controlar el menú hamburguesa en móviles
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Navegación principal">
      {/* Logo: lleva al inicio */}
      <a href="#inicio" className="navbar-logo" onClick={() => setIsOpen(false)}>
        <span className="logo-nombre">Mayra Fabiola</span> Mallqui Paccini
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
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
