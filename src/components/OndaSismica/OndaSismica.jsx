import { useEffect, useState } from 'react';
import './OndaSismica.css';

/*
  Inspirado en Toph Beifong, que "ve" sintiendo las vibraciones de la tierra:
  cada clic en la página genera una onda suave que se expande desde ese punto.
*/
const OndaSismica = () => {
  const [ondas, setOndas] = useState([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let contador = 0;

    const alTocar = (e) => {
      const id = contador++;
      setOndas((previas) => [...previas.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setOndas((previas) => previas.filter((o) => o.id !== id)), 1100);
    };

    window.addEventListener('pointerdown', alTocar);
    return () => window.removeEventListener('pointerdown', alTocar);
  }, []);

  return (
    <div className="ondas" aria-hidden="true">
      {ondas.map((o) => (
        <span key={o.id}>
          <span className="onda" style={{ left: o.x, top: o.y }}></span>
          <span className="onda onda-oro" style={{ left: o.x, top: o.y }}></span>
        </span>
      ))}
    </div>
  );
};

export default OndaSismica;
