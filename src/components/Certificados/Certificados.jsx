import { useCallback, useEffect, useRef, useState } from 'react';
import './Certificados.css';
import { ingles } from '../../data/certificados';
import { useAdmin } from '../../context/AdminContext';
import { useSeccion } from '../../context/ContenidoContext';
import FormularioAdmin from '../Admin/FormularioAdmin';
import AccionesAdmin from '../Admin/AccionesAdmin';
import { camposCertificado } from '../Admin/campos';
import IconoCertificado from './IconoCertificado';

/*
  Los certificados vienen de dos lugares:
  - src/data/certificados.js (los que escribes en el código, con su link)
  - el panel de administración (agregar, editar o eliminar cualquiera desde la web)
*/
// Convierte un link de Google Drive al formato que se puede mostrar dentro de la web
const urlParaVer = (link) => {
  const drive = link.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  return drive ? `https://drive.google.com/file/d/${drive[1]}/preview` : link;
};

// Ventana que muestra el PDF del certificado
const VisorCertificado = ({ certificado, alCerrar }) => {
  const botonCerrar = useRef(null);

  useEffect(() => {
    botonCerrar.current?.focus();
    document.body.style.overflow = 'hidden';
    const alPresionar = (e) => e.key === 'Escape' && alCerrar();
    window.addEventListener('keydown', alPresionar);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', alPresionar);
    };
  }, [alCerrar]);

  return (
    <div className="visor-fondo" onClick={alCerrar}>
      <div
        className="visor"
        role="dialog"
        aria-modal="true"
        aria-labelledby="visor-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="visor-cabecera">
          <div>
            <p id="visor-titulo" className="visor-titulo">{certificado.titulo}</p>
            <p className="visor-emisor">{certificado.emisor}</p>
          </div>
          <div className="visor-acciones">
            <a className="visor-externo" href={certificado.link} target="_blank" rel="noopener noreferrer">
              Abrir en pestaña nueva ↗
            </a>
            <button ref={botonCerrar} type="button" className="visor-cerrar" onClick={alCerrar} aria-label="Cerrar">
              ✕
            </button>
          </div>
        </div>
        <iframe
          className="visor-pdf"
          src={urlParaVer(certificado.link)}
          title={`Certificado: ${certificado.titulo}`}
        ></iframe>
      </div>
    </div>
  );
};

const Certificados = () => {
  const [abierto, setAbierto] = useState(null);
  // null = cerrado · 'nuevo' = agregar · un certificado = editar ese certificado
  const [formulario, setFormulario] = useState(null);
  const { sesion } = useAdmin();
  const { items, agregar, editar, quitar, restaurar } = useSeccion('certificados');

  const cerrar = useCallback(() => setAbierto(null), []);
  const cerrarForm = useCallback(() => setFormulario(null), []);

  const guardar = (datos) => (formulario === 'nuevo' ? agregar(datos) : editar(formulario, datos));

  return (
    <section id="certificados" className="section">
      <div className="section-container reveal">
        <header className="section-header">
          <span className="section-kicker">05 · certificados</span>
          <h2 className="section-title">
            Certificados e <span className="text-accent">idiomas</span>
          </h2>
          <p className="section-subtitle">
            Formación complementaria que respalda lo que hago y lo que sigo aprendiendo.
          </p>
        </header>

        {/* Idioma: inglés */}
        <article className="ingles-card">
          <div className="ingles-info">
            <span className="ingles-icono" aria-hidden="true">EN</span>
            <div>
              <p className="ingles-etiqueta">Idioma</p>
              <h3 className="ingles-titulo">Inglés {ingles.nivel}</h3>
              <p className="ingles-lugar">
                {ingles.institucion} · <span className="ingles-estado">{ingles.estado}</span>
              </p>
            </div>
          </div>

          {/* Camino de niveles */}
          <ol className="ingles-camino" aria-label="Progreso en inglés">
            {ingles.etapas.map((etapa, i) => (
              <li
                key={etapa}
                className={i < ingles.actual ? 'superada' : i === ingles.actual ? 'actual' : ''}
                aria-current={i === ingles.actual ? 'step' : undefined}
              >
                <span className="camino-punto"></span>
                <span className="camino-nombre">{etapa}</span>
              </li>
            ))}
          </ol>
        </article>

        {/* Certificados */}
        <div className="certificados-grid">
          {items.map((cert) => (
            <article key={cert.clave} className="certificado-card">
              <div className="cert-icono" aria-hidden="true">
                <IconoCertificado nombre={cert.icono} />
              </div>
              <h3 className="certificado-titulo">{cert.titulo}</h3>
              <p className="certificado-emisor">
                {cert.emisor}
                {cert.fecha && ` · ${cert.fecha}`}
              </p>

              {/* El botón queda siempre abajo para que todas las tarjetas se alineen */}
              {cert.link ? (
                <button type="button" className="certificado-boton" onClick={() => setAbierto(cert)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  Ver certificado
                </button>
              ) : (
                <span className="certificado-boton pendiente">Enlace pendiente</span>
              )}

              {sesion && (
                <AccionesAdmin
                  item={cert}
                  nombre={cert.titulo}
                  alEditar={setFormulario}
                  quitar={quitar}
                  restaurar={restaurar}
                  puedeBorrarFijos
                />
              )}
            </article>
          ))}

          {/* Solo en modo edición */}
          {sesion && (
            <button type="button" className="tarjeta-agregar" onClick={() => setFormulario('nuevo')}>
              <span aria-hidden="true">+</span>
              Agregar certificado
            </button>
          )}
        </div>
      </div>

      {abierto && <VisorCertificado certificado={abierto} alCerrar={cerrar} />}
      {formulario && sesion && (
        <FormularioAdmin
          key={formulario === 'nuevo' ? 'nuevo' : formulario.clave}
          titulo={formulario === 'nuevo' ? 'Agregar certificado' : 'Editar certificado'}
          campos={camposCertificado}
          inicial={formulario === 'nuevo' ? null : formulario}
          alCerrar={cerrarForm}
          alGuardar={guardar}
        />
      )}
    </section>
  );
};

export default Certificados;
