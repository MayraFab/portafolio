-- =============================================================
-- Tabla del panel de administración del portafolio
-- Cópialo completo en Supabase → SQL Editor → New query → Run
-- Se puede ejecutar varias veces sin duplicar nada.
-- =============================================================

-- Todo lo que cambias desde la web se guarda aquí, una fila por cambio:
--   seccion:   proyectos | certificados | tecnologias | areas | blandas
--   datos:     el contenido (título, descripción, enlaces, etc.)
--   reemplaza: si tiene valor, la fila es tu versión editada de un dato de src/data/
--   oculto:    true = ese dato de src/data/ lo eliminaste desde el panel
create table if not exists contenido (
  id bigint generated always as identity primary key,
  creado timestamptz not null default now(),
  seccion text not null check (seccion in ('proyectos', 'certificados', 'tecnologias', 'areas', 'blandas')),
  reemplaza text,
  oculto boolean not null default false,
  datos jsonb not null default '{}'::jsonb
);

-- Cada dato de src/data/ solo puede tener una versión editada
create unique index if not exists contenido_reemplaza_unico
  on contenido (seccion, reemplaza) where reemplaza is not null;

-- Seguridad: todos pueden LEER, solo tu cuenta puede AGREGAR, EDITAR o ELIMINAR
alter table contenido enable row level security;

drop policy if exists "Lectura pública del contenido" on contenido;
create policy "Lectura pública del contenido" on contenido
  for select using (true);

drop policy if exists "Solo la dueña edita el contenido" on contenido;
create policy "Solo la dueña edita el contenido" on contenido
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'mayramallqui22sxxi@gmail.com')
  with check (auth.jwt() ->> 'email' = 'mayramallqui22sxxi@gmail.com');

-- -------------------------------------------------------------
-- Pasa lo que ya tenías en las tablas antiguas ("proyectos" y "certificados")
-- a la tabla nueva. Solo copia si esa sección todavía está vacía, así no se duplica.
-- Después de comprobar que la web se ve bien, puedes borrar las tablas antiguas.
-- -------------------------------------------------------------
do $$
begin
  if to_regclass('public.proyectos') is not null
     and not exists (select 1 from contenido where seccion = 'proyectos') then
    insert into contenido (creado, seccion, reemplaza, datos)
    select creado, 'proyectos', reemplaza, jsonb_build_object(
      'titulo', titulo,
      'descripcion', descripcion,
      'categoria', categoria,
      'archivo', archivo,
      'icono', icono,
      'imagen', imagen,
      'tecnologias', to_jsonb(tecnologias),
      'linkCodigo', link_codigo,
      'linkDemo', link_demo
    )
    from proyectos
    order by id;
  end if;

  if to_regclass('public.certificados') is not null
     and not exists (select 1 from contenido where seccion = 'certificados') then
    insert into contenido (creado, seccion, datos)
    select creado, 'certificados', jsonb_build_object(
      'titulo', titulo,
      'emisor', emisor,
      'fecha', fecha,
      'link', link,
      'icono', icono
    )
    from certificados
    order by id;
  end if;
end $$;
