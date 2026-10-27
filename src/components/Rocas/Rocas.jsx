import './Rocas.css';

// Silueta de rocas y pilares de tierra al pie del inicio (inspirada en el control de la tierra de Toph)
const Rocas = () => (
  <svg className="rocas" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
    <path
      className="rocas-fondo"
      d="M0 120 L0 80 L45 55 L90 71 L135 36 L180 78 L225 47 L270 71 L315 40 L360 70 L405 66 L450 71 L495 70 L540 73 L585 54 L630 72 L675 56 L720 77 L765 40 L810 72 L855 35 L900 73 L945 45 L990 70 L1035 61 L1080 77 L1125 61 L1170 72 L1215 46 L1260 69 L1305 70 L1350 70 L1395 66 L1440 78 L1440 120 Z"
    />
    <path
      className="rocas-frente"
      d="M0 120 L0 100 L65 72 L131 98 L196 67 L262 90 L327 89 L393 99 L458 40 L524 92 L589 86 L655 95 L720 55 L785 100 L851 34 L916 92 L982 79 L1047 100 L1113 87 L1178 94 L1244 66 L1309 99 L1375 77 L1440 99 L1440 120 Z"
    />
  </svg>
);

export default Rocas;
