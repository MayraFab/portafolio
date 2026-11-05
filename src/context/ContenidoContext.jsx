import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAdmin } from './AdminContext';
import { actualizar, eliminar, insertar, listar, supabaseConfigurado } from '../utils/supabase';
import { proyectosData } from '../data/proyectos';
import { certificadosData } from '../data/certificados';
import { techStack } from '../data/techStack';
import { areasData, blandasData } from '../data/habilidades';

/*
  Junta lo que está escrito en el código (src/data/) con lo que cambiaste desde el panel.
  Todo lo del panel vive en UNA tabla de Supabase llamada "contenido" (ver supabase/esquema.sql):
  - fila sin "reemplaza"        → algo nuevo que agregaste
  - fila con "reemplaza"        → tu versión editada de un dato del código (se muestra en su lugar)
  - fila con "oculto" = true    → un dato del código que eliminaste
  Si Supabase no responde, la web muestra igual los datos del código.
*/
const TABLA = 'contenido';

// "clave" identifica cada dato del código para poder editarlo desde el panel
const fijos = {
  proyectos: proyectosData.map((p) => ({ ...p, clave: String(p.id) })),
  certificados: certificadosData.map((c) => ({ ...c, clave: String(c.id) })),
  tecnologias: techStack.flatMap((grupo) => grupo.items.map((t) => ({ ...t, fila: grupo.fila, clave: t.nombre }))),
  areas: areasData.map((a) => ({ ...a, clave: a.id })),
  blandas: blandasData.map((b) => ({ ...b, clave: b.nombre })),
};

const desdeFila = (fila) => ({
  ...fila.datos,
  clave: `r-${fila.id}`,
  idRemoto: fila.id,
  reemplaza: fila.reemplaza,
  oculto: fila.oculto,
});

// Quita los campos internos para guardar solo el contenido
const soloDatos = ({ clave, idRemoto, reemplaza, oculto, id, ...datos }) => datos;

// Agrupa las teclas del tech stack por su fila, en el orden en que aparecen
export const agruparPorFila = (tecnologias) =>
  tecnologias.reduce((grupos, tecla) => {
    const grupo = grupos.find((g) => g.fila === tecla.fila);
    if (grupo) grupo.items.push(tecla);
    else grupos.push({ fila: tecla.fila, items: [tecla] });
    return grupos;
  }, []);

const ContenidoContext = createContext(null);

export const ContenidoProvider = ({ children }) => {
  const [filas, setFilas] = useState([]);
  const { sesion } = useAdmin();
  const token = sesion?.token;

  useEffect(() => {
    if (!supabaseConfigurado) return;
    let activo = true;
    listar(TABLA)
      .then((datos) => activo && setFilas(datos))
      .catch(() => {
        // Si la base no responde, se muestran solo los datos del código
      });
    return () => {
      activo = false;
    };
  }, []);

  const acciones = useMemo(() => {
    const conSesion = () => {
      if (!token) throw new Error('Tu sesión terminó. Vuelve a entrar desde "Administrar" al final de la página.');
      return token;
    };
    return {
      crear: async (fila) => {
        const nueva = await insertar(TABLA, fila, conSesion());
        setFilas((previas) => [...previas, nueva]);
      },
      cambiar: async (id, cambios) => {
        const nueva = await actualizar(TABLA, id, cambios, conSesion());
        setFilas((previas) => previas.map((f) => (f.id === id ? nueva : f)));
      },
      borrar: async (id) => {
        await eliminar(TABLA, id, conSesion());
        setFilas((previas) => previas.filter((f) => f.id !== id));
      },
    };
  }, [token]);

  const valor = useMemo(() => ({ filas, ...acciones }), [filas, acciones]);

  return <ContenidoContext.Provider value={valor}>{children}</ContenidoContext.Provider>;
};

/*
  Devuelve los datos de una sección ya combinados y las acciones del panel:
  - agregar(datos)        → crea uno nuevo
  - editar(item, datos)   → guarda los cambios
  - quitar(item)          → elimina (si es del código, lo oculta)
  - restaurar(item)       → descarta tus cambios y vuelve al original del código
*/
export const useSeccion = (seccion) => {
  const { filas, crear, cambiar, borrar } = useContext(ContenidoContext);

  const items = useMemo(() => {
    const propias = filas.filter((f) => f.seccion === seccion).map(desdeFila);
    const reemplazos = new Map(propias.filter((r) => r.reemplaza).map((r) => [r.reemplaza, r]));
    return [
      ...fijos[seccion].map((item) => reemplazos.get(item.clave) || item),
      ...propias.filter((r) => !r.reemplaza),
    ].filter((item) => !item.oculto);
  }, [filas, seccion]);

  return useMemo(
    () => ({
      items,
      agregar: (datos) => crear({ seccion, datos }),
      editar: (item, datos) =>
        item.idRemoto ? cambiar(item.idRemoto, { datos }) : crear({ seccion, reemplaza: item.clave, datos }),
      quitar: (item) => {
        if (!item.idRemoto) return crear({ seccion, reemplaza: item.clave, oculto: true, datos: soloDatos(item) });
        if (item.reemplaza) return cambiar(item.idRemoto, { oculto: true });
        return borrar(item.idRemoto);
      },
      restaurar: (item) => borrar(item.idRemoto),
    }),
    [items, seccion, crear, cambiar, borrar]
  );
};
