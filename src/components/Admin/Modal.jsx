import { useEffect, useRef } from 'react';
import './Admin.css';

// Ventana emergente reutilizable (login y formularios del panel)
const Modal = ({ titulo, alCerrar, children }) => {
  const ventana = useRef(null);

  useEffect(() => {
    ventana.current?.querySelector('input, select, textarea, button')?.focus();
    document.body.style.overflow = 'hidden';
    const alPresionar = (e) => e.key === 'Escape' && alCerrar();
    window.addEventListener('keydown', alPresionar);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', alPresionar);
    };
  }, [alCerrar]);

  return (
    <div className="modal-fondo" onClick={alCerrar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        ref={ventana}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-cabecera">
          <h3>{titulo}</h3>
          <button type="button" className="modal-cerrar" onClick={alCerrar} aria-label="Cerrar">
            ✕
          </button>
        </div>
        <div className="modal-cuerpo">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
