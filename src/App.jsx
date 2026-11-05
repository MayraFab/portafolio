import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Perfil from './components/Perfil/Perfil';
import Habilidades from './components/Habilidades/Habilidades';
import TechStack from './components/TechStack/TechStack';
import Proyectos from './components/Proyectos/Proyectos';
import Certificados from './components/Certificados/Certificados';
import Contacto from './components/Contacto/Contacto';
import Footer from './components/Footer/Footer';
import OndaSismica from './components/OndaSismica/OndaSismica';
import { AdminProvider } from './context/AdminContext';
import { ContenidoProvider } from './context/ContenidoContext';
import './index.css';

function App() {
  // Hace aparecer suavemente cada elemento con la clase .reveal al llegar a él
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const observarPendientes = () =>
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observador.observe(el));
    observarPendientes();

    // Si una sección se vuelve a montar (p. ej. al recargar en caliente), también se observa
    const vigia = new MutationObserver(observarPendientes);
    vigia.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      vigia.disconnect();
    };
  }, []);

  return (
    <AdminProvider>
      <ContenidoProvider>
        <Navbar />
        <main>
          <Banner />
          <Perfil />
          <Habilidades />
          <TechStack />
          <Proyectos />
          <Certificados />
          <Contacto />
        </main>
        <Footer />
        <OndaSismica />
      </ContenidoProvider>
    </AdminProvider>
  );
}

export default App;
