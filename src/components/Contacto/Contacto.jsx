import { useState } from 'react';
import './Contacto.css';

// Credenciales de EmailJS: se leen del archivo .env (en Vercel, de Environment Variables)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const MI_CORREO = '1582403@senati.pe';

const Contacto = () => {
  // Estado del formulario (formulario controlado)
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  // Estado del envío: 'inactivo' | 'enviando' | 'enviado' | 'error'
  const [estadoEnvio, setEstadoEnvio] = useState('inactivo');

  // Actualiza solo el campo que cambió (según su atributo name)
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // Envía el mensaje con la API de EmailJS (no necesita instalar paquetes)
  const manejarEnvio = async (e) => {
    e.preventDefault();

    // Si faltan las credenciales, abrimos el correo del visitante como respaldo
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const asunto = encodeURIComponent(`Mensaje de ${formulario.nombre} desde mi portafolio`);
      const cuerpo = encodeURIComponent(`${formulario.mensaje}\n\nResponder a: ${formulario.email}`);
      window.location.href = `mailto:${MI_CORREO}?subject=${asunto}&body=${cuerpo}`;
      return;
    }

    setEstadoEnvio('enviando');

    try {
      const respuesta = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          // Enviamos varios nombres para que coincida con las variables de tu plantilla
          template_params: {
            nombre: formulario.nombre,
            name: formulario.nombre,
            from_name: formulario.nombre,
            email: formulario.email,
            from_email: formulario.email,
            reply_to: formulario.email,
            mensaje: formulario.mensaje,
            message: formulario.mensaje,
          },
        }),
      });

      if (!respuesta.ok) throw new Error('Error al enviar');

      setEstadoEnvio('enviado');
      setFormulario({ nombre: '', email: '', mensaje: '' });
    } catch {
      setEstadoEnvio('error');
    }
  };

  return (
    <section id="contacto" className="section section-alt contacto-section">
      <div className="section-container reveal">
        <header className="section-header">
          <span className="section-kicker">06 · contacto</span>
          <h2 className="section-title">
            Trabajemos <span className="text-accent">juntos</span>
          </h2>
          <p className="section-subtitle">Escríbeme y te respondo lo antes posible.</p>
        </header>

        <div className="contacto-grid">
          {/* =====================================
              COLUMNA IZQUIERDA: INFORMACIÓN
          ====================================== */}
          <div className="contacto-info">
            <h3 className="info-title">Ponte en contacto</h3>
            <p className="info-desc">
              ¿Tienes una idea, un proyecto o una oportunidad de prácticas? Me encantaría
              conversar y ver cómo puedo aportar.
            </p>

            <div className="info-items">
              {/* Email */}
              <a className="info-item" href={`mailto:${MI_CORREO}`}>
                <div className="info-icon icon-rosa">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="item-label">Email</span>
                  <p className="item-text">{MI_CORREO}</p>
                </div>
              </a>

              {/* GitHub */}
              <a className="info-item" href="https://github.com/MayraFab" target="_blank" rel="noopener noreferrer">
                <div className="info-icon icon-verde">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <div>
                  <span className="item-label">GitHub</span>
                  <p className="item-text">MayraFab</p>
                </div>
              </a>

              {/* Ubicación */}
              <div className="info-item">
                <div className="info-icon icon-rosa">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <span className="item-label">Ubicación</span>
                  <p className="item-text">Lima – Perú</p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================
              COLUMNA DERECHA: FORMULARIO
          ====================================== */}
          <div className="contacto-form-wrapper">
            {/* Barra tipo ventana de editor */}
            <div className="form-barra">
              <span className="punto punto-1"></span>
              <span className="punto punto-2"></span>
              <span className="punto punto-3"></span>
              <span className="form-archivo">nuevo-mensaje.txt</span>
            </div>
            <form onSubmit={manejarEnvio} className="contacto-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formulario.email}
                  onChange={manejarCambio}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-submit" disabled={estadoEnvio === 'enviando'}>
                {estadoEnvio === 'enviando' ? 'Enviando…' : 'ENVIAR MENSAJE'}
              </button>

              {/* Mensajes de resultado */}
              {estadoEnvio === 'enviado' && (
                <p className="form-aviso aviso-ok">¡Gracias! Tu mensaje fue enviado. Te responderé pronto. ✨</p>
              )}
              {estadoEnvio === 'error' && (
                <p className="form-aviso aviso-error">
                  No se pudo enviar. Inténtalo otra vez o escríbeme a {MI_CORREO}.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
