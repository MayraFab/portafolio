import { useCallback, useEffect, useState } from 'react';
import { eliminar, insertar, listar, supabaseConfigurado } from '../utils/supabase';

/*
  Junta los datos fijos (de src/data/) con los que agregaste desde el panel (Supabase).
  - base:        arreglo de src/data/
  - tabla:       nombre de la tabla en Supabase
  - desdeTabla:  convierte una fila de la tabla al formato que usa la web
*/
export const useColeccion = (base, tabla, desdeTabla) => {
  const [remotos, setRemotos] = useState([]);

  useEffect(() => {
    if (!supabaseConfigurado) return;
    let activo = true;
    listar(tabla)
      .then((filas) => activo && setRemotos(filas.map(desdeTabla)))
      .catch(() => {
        // Si la base no responde, se muestran solo los datos fijos
      });
    return () => {
      activo = false;
    };
  }, [tabla, desdeTabla]);

  const agregar = useCallback(
    async (fila, token) => {
      const creada = await insertar(tabla, fila, token);
      setRemotos((previos) => [...previos, desdeTabla(creada)]);
    },
    [tabla, desdeTabla]
  );

  const quitar = useCallback(
    async (item, token) => {
      await eliminar(tabla, item.idRemoto, token);
      setRemotos((previos) => previos.filter((r) => r.idRemoto !== item.idRemoto));
    },
    [tabla]
  );

  return { items: [...base, ...remotos], agregar, quitar };
};
