import { useCallback, useState } from 'react';
import './Proyectos.css';
import { useAdmin } from '../../context/AdminContext';
import { useSeccion } from '../../context/ContenidoContext';
import FormularioAdmin from '../Admin/FormularioAdmin';
import AccionesAdmin from '../Admin/AccionesAdmin';
import { camposProyecto, prepararProyecto, validarProyecto } from '../Admin/campos';
import IconoLinea from '../Iconos/IconoLinea';

/*
  Los proyectos vienen de dos lugares:
  - src/data/proyectos.js (los que escribes en el código)
  - el panel de administración (agregar, editar o eliminar cualquiera desde la web)
*/
const filtros = [
  { id: 'todos', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'movil', label: 'Móvil' },
  { id: 'iot', label: 'IoT' },
];

// Si un proyecto aún no tiene repositorio propio, el botón lleva a tu perfil de GitHub
const GITHUB_PERFIL = 'https://github.com/MayraFab';

// Devuelve true solo si el enlace existe y no es '#'
const tieneEnlace = (link) => Boolean(link && link !== '#');

const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Inclina la tarjeta siguiendo al mouse (efecto 3D)
const inclinar = (e) => {
  if (sinMovimiento()) return;
  const tarjeta = e.currentTarget;
  const caja = tarjeta.getBoundingClientRect();
  const x = (e.clientX - caja.left) / caja.width - 0.5;
  const y = (e.clientY - caja.top) / caja.height - 0.5;
  tarjeta.style.setProperty('--ry', `${x * 4}deg`);
  tarjeta.style.setProperty('--rx', `${-y * 4}deg`);
};

const enderezar = (e) => {
  e.currentTarget.style.setProperty('--ry', '0deg');
  e.currentTarget.style.setProperty('--rx', '0deg');
};

const Proyectos = () => {
  const [filtro, setFiltro] = useState('todos');
  // null = cerrado · 'nuevo' = agregar · un proyecto = editar ese proyecto
  const [formulario, setFormulario] = useState(null);
  const { sesion } = useAdmin();
  const { items, agregar, editar, quitar, restaurar } = useSeccion('proyectos');

  const visibles = filtro === 'todos' ? items : items.filter((p) => p.categoria === filtro);
  const cerrarForm = useCallback(() => setFormulario(null), []);

  const guardar = (datos) => (formulario === 'nuevo' ? agregar(datos) : editar(formulario, datos));

  return (
    <section id="proyectos" className="section section-alt">
      <div className="section-container reveal">
        <header className="section-header">
          <span className="section-kicker">04 · proyectos</span>
          <h2 className="section-title">
            Proyectos <span className="text-accent">destacados</span>
          </h2>
          <p className="section-subtitle">Algunos trabajos que he desarrollado durante mi formación.</p>
        </header>

        {/* Filtros */}
        <div className="filtros" role="group" aria-label="Filtrar proyectos">
          {filtros.map((f) => {
            const cantidad = f.id === 'todos' ? items.length : items.filter((p) => p.categoria === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                className={`filtro ${filtro === f.id ? 'activo' : ''}`}
                aria-pressed={filtro === f.id}
                onClick={() => setFiltro(f.id)}
              >
                {f.label} <span>{cantidad}</span>
              </button>
            );
          })}
        </div>

        <div className="proyectos-grid">
          {visibles.map((proyecto) => (
            <article key={proyecto.clave} className="proyecto-card" onMouseMove={inclinar} onMouseLeave={enderezar}>
              {/* 1. Barra tipo ventana con el nombre del archivo */}
              <div className="proyecto-barra">
                <span className="punto punto-1"></span>
                <span className="punto punto-2"></span>
                <span className="punto punto-3"></span>
                <span className="proyecto-archivo">{proyecto.archivo}</span>
              </div>

              {/* 2. Imagen o portada */}
              <div className="proyecto-imagen">
                {proyecto.imagen ? (
                  <img src={proyecto.imagen} alt={`Captura de ${proyecto.titulo}`} />
                ) : (
                  <div className={`proyecto-portada portada-${proyecto.categoria}`}>
                    <span className="portada-icono" aria-hidden="true">
                      <IconoLinea nombre={proyecto.icono} tamano={44} respaldo="carpeta" grosor={1.4} />
                    </span>
                  </div>
                )}
              </div>

              {/* 3. Contenido */}
              <div className="proyecto-contenido">
                <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
                <p className="proyecto-desc">{proyecto.descripcion}</p>

                <div className="proyecto-tags">
                  {(proyecto.tecnologias || []).map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {/* 4. Botones: GitHub siempre; "Ver página" solo si tiene web publicada */}
                <div className="proyecto-links">
                  <a
                    href={tieneEnlace(proyecto.linkCodigo) ? proyecto.linkCodigo : GITHUB_PERFIL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-proyecto btn-codigo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>

                  {tieneEnlace(proyecto.linkDemo) && (
                    <a href={proyecto.linkDemo} target="_blank" rel="noopener noreferrer" className="btn-proyecto btn-demo">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Ver página
                    </a>
                  )}
                </div>

                {sesion && (
                  <AccionesAdmin
                    item={proyecto}
                    nombre={proyecto.titulo}
                    alEditar={setFormulario}
                    quitar={quitar}
                    restaurar={restaurar}
                    puedeBorrarFijos
                  />
                )}
              </div>
            </article>
          ))}

          {/* Modo edición: agregar proyecto. Si no, espacio para el próximo */}
          {sesion ? (
            <button type="button" className="tarjeta-agregar" onClick={() => setFormulario('nuevo')}>
              <span aria-hidden="true">+</span>
              Agregar proyecto
            </button>
          ) : (
            <article className="proyecto-card proyecto-bloqueado" aria-label="Próximo proyecto en desarrollo">
              <span className="bloqueado-icono" aria-hidden="true">
                <IconoLinea nombre="herramienta" tamano={30} />
              </span>
              <p className="bloqueado-titulo">Próximamente</p>
              <p className="bloqueado-texto">Estoy trabajando en mi siguiente proyecto.</p>
            </article>
          )}
        </div>
      </div>

      {formulario && sesion && (
        <FormularioAdmin
          key={formulario === 'nuevo' ? 'nuevo' : formulario.clave}
          titulo={formulario === 'nuevo' ? 'Agregar proyecto' : 'Editar proyecto'}
          campos={camposProyecto}
          inicial={formulario === 'nuevo' ? null : formulario}
          validar={validarProyecto}
          preparar={prepararProyecto}
          alCerrar={cerrarForm}
          alGuardar={guardar}
        />
      )}
    </section>
  );
};

export default Proyectos;
