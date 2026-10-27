import { useCallback, useEffect, useState } from 'react';
import { actualizar, eliminar, insertar, listar, supabaseConfigurado } from '../utils/supabase';

/*
  Junta los datos fijos (de src/data/) con los que agregaste desde el panel (Supabase).
  - base:        arreglo de src/data/
  - tabla:       nombre de la tabla en Supabase
  - desdeTabla:  convierte una fila de la tabla al formato que usa la web
  Una fila con "reemplaza" es una versión editada de un dato fijo: se muestra en su lugar.
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

  // Si el item ya está en la base se actualiza; si es un dato fijo se guarda una copia que lo reemplaza
  const editar = useCallback(
    async (item, fila, token) => {
      if (item.idRemoto) {
        const nueva = desdeTabla(await actualizar(tabla, item.idRemoto, fila, token));
        setRemotos((previos) => previos.map((r) => (r.idRemoto === item.idRemoto ? nueva : r)));
      } else {
        await agregar({ ...fila, reemplaza: String(item.id) }, token);
      }
    },
    [tabla, desdeTabla, agregar]
  );

  const quitar = useCallback(
    async (item, token) => {
      await eliminar(tabla, item.idRemoto, token);
      setRemotos((previos) => previos.filter((r) => r.idRemoto !== item.idRemoto));
    },
    [tabla]
  );

  const reemplazos = new Map(remotos.filter((r) => r.reemplaza).map((r) => [r.reemplaza, r]));
  const items = [
    ...base.map((item) => reemplazos.get(String(item.id)) || item),
    ...remotos.filter((r) => !r.reemplaza),
  ];

  return { items, agregar, editar, quitar };
};
