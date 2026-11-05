import { useCallback, useState } from 'react';
import './Habilidades.css';
import IconoLinea from '../Iconos/IconoLinea';
import { useAdmin } from '../../context/AdminContext';
import { useSeccion } from '../../context/ContenidoContext';
import FormularioAdmin from '../Admin/FormularioAdmin';
import AccionesAdmin from '../Admin/AccionesAdmin';
import { camposArea, camposBlanda } from '../Admin/campos';

/*
  Las habilidades blandas y las áreas técnicas están en src/data/habilidades.js.
  Desde el panel puedes agregar nuevas y editar cualquiera (las del código no se eliminan).
*/

// Hacia dónde voy: "actual" marca la etapa de hoy
const ruta = [
  { etiqueta: 'Hoy', titulo: 'Estudiante de Software con IA', detalle: '5.º semestre en SENATI y formación dual en ELOMUX' },
  { etiqueta: 'Próximo paso', titulo: 'Desarrolladora Junior', detalle: 'Prácticas o primer empleo en un equipo de desarrollo' },
  { etiqueta: 'Meta', titulo: 'Ingeniera de Software', detalle: 'Especializada en soluciones con Inteligencia Artificial' },
];
const ETAPA_ACTUAL = 0;

// Textos del formulario según lo que se esté editando
const formularios = {
  areas: { campos: camposArea, agregar: 'Agregar área técnica', editar: 'Editar área técnica' },
  blandas: { campos: camposBlanda, agregar: 'Agregar habilidad blanda', editar: 'Editar habilidad blanda' },
};

const Habilidades = () => {
  const { sesion } = useAdmin();
  const blandas = useSeccion('blandas');
  const areas = useSeccion('areas');
  const [claveElegida, setClaveElegida] = useState('datos');
  // null = cerrado · { seccion, item } (item null = agregar uno nuevo)
  const [formulario, setFormulario] = useState(null);
  const cerrarForm = useCallback(() => setFormulario(null), []);

  // Si el área elegida se eliminó, se muestra la primera
  const seleccion = areas.items.find((a) => a.clave === claveElegida) || areas.items[0];

  const guardar = async (datos) => {
    const { seccion, item } = formulario;
    const coleccion = seccion === 'areas' ? areas : blandas;
    if (item) await coleccion.editar(item, datos);
    else await coleccion.agregar(datos);
  };

  const configForm = formulario && formularios[formulario.seccion];

  return (
    <section id="habilidades" className="section section-alt">
      <div className="section-container reveal">
        <header className="section-header">
          <span className="section-kicker">02 · habilidades</span>
          <h2 className="section-title">
            Lo que <span className="text-accent">sé hacer</span>
          </h2>
          <p className="section-subtitle">
            Cómo trabajo, en qué áreas me muevo y hacia dónde quiero llegar.
          </p>
        </header>

        <div className="habilidades-grid">
          {/* Habilidades blandas */}
          <article className="hab-card">
            <h3 className="hab-subtitulo">Habilidades blandas</h3>
            <ul className="blandas">
              {blandas.items.map((b) => (
                <li key={b.clave}>
                  <span className="blanda-icono" aria-hidden="true">
                    <IconoLinea nombre={b.icono} tamano={20} />
                  </span>
                  <div>
                    <p className="blanda-nombre">{b.nombre}</p>
                    <p className="blanda-detalle">{b.detalle}</p>
                    {sesion && (
                      <AccionesAdmin
                        item={b}
                        nombre={b.nombre}
                        alEditar={(item) => setFormulario({ seccion: 'blandas', item })}
                        quitar={blandas.quitar}
                        restaurar={blandas.restaurar}
                        compactas
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {sesion && (
              <button type="button" className="boton-agregar" onClick={() => setFormulario({ seccion: 'blandas', item: null })}>
                + Agregar habilidad blanda
              </button>
            )}
          </article>

          {/* Áreas técnicas */}
          <article className="hab-card">
            <h3 className="hab-subtitulo">Áreas técnicas</h3>
            <div className="areas">
              {areas.items.map((a) => (
                <button
                  key={a.clave}
                  type="button"
                  className={`area ${seleccion?.clave === a.clave ? 'activa' : ''}`}
                  onClick={() => setClaveElegida(a.clave)}
                  aria-pressed={seleccion?.clave === a.clave}
                >
                  <span className="area-icono" aria-hidden="true">
                    <IconoLinea nombre={a.icono} tamano={20} />
                  </span>
                  <span className="area-nombre">{a.nombre}</span>
                </button>
              ))}
            </div>

            {seleccion && (
              <div className="area-detalle" key={seleccion.clave}>
                <p className="detalle-texto">{seleccion.descripcion}</p>
                <div className="detalle-tags">
                  {(seleccion.tecnologias || []).map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
                {sesion && (
                  <AccionesAdmin
                    item={seleccion}
                    nombre={seleccion.nombre}
                    alEditar={(item) => setFormulario({ seccion: 'areas', item })}
                    quitar={areas.quitar}
                    restaurar={areas.restaurar}
                    compactas
                  />
                )}
              </div>
            )}
            {sesion && (
              <button type="button" className="boton-agregar" onClick={() => setFormulario({ seccion: 'areas', item: null })}>
                + Agregar área técnica
              </button>
            )}
          </article>
        </div>

        {/* Hacia dónde voy */}
        <article className="hab-card ruta-card">
          <h3 className="hab-subtitulo">Hacia dónde voy</h3>
          <ol className="ruta">
            {ruta.map((etapa, i) => (
              <li key={etapa.titulo} className={i === ETAPA_ACTUAL ? 'actual' : ''}>
                <span className="ruta-punto" aria-hidden="true"></span>
                <span className="ruta-etiqueta">{etapa.etiqueta}</span>
                <span className="ruta-titulo">{etapa.titulo}</span>
                <span className="ruta-detalle">{etapa.detalle}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>

      {configForm && sesion && (
        <FormularioAdmin
          key={formulario.item?.clave || `nuevo-${formulario.seccion}`}
          titulo={formulario.item ? configForm.editar : configForm.agregar}
          campos={configForm.campos}
          inicial={formulario.item}
          alCerrar={cerrarForm}
          alGuardar={guardar}
        />
      )}
    </section>
  );
};

export default Habilidades;
