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
    document.querySelectorAll('.reveal').forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  return (
    <AdminProvider>
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
    </AdminProvider>
  );
}

export default App;
