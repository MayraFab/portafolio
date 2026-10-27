-- =============================================================
-- Tablas del panel de administración del portafolio
-- Cópialo completo en Supabase → SQL Editor → New query → Run
-- Antes, cambia TU_CORREO@ejemplo.com por el correo con el que vas a iniciar sesión.
-- =============================================================

create table if not exists proyectos (
  id bigint generated always as identity primary key,
  creado timestamptz not null default now(),
  titulo text not null,
  descripcion text not null,
  categoria text not null default 'web' check (categoria in ('web', 'movil', 'iot')),
  archivo text,
  icono text default 'carpeta',
  imagen text,
  tecnologias text[] not null default '{}',
  link_codigo text not null,
  link_demo text
);

create table if not exists certificados (
  id bigint generated always as identity primary key,
  creado timestamptz not null default now(),
  titulo text not null,
  emisor text not null,
  fecha text,
  link text not null,
  icono text default 'certificado'
);

-- Seguridad: todos pueden LEER, solo tu cuenta puede AGREGAR o ELIMINAR
alter table proyectos enable row level security;
alter table certificados enable row level security;

create policy "Lectura pública de proyectos" on proyectos
  for select using (true);
create policy "Solo la dueña edita proyectos" on proyectos
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'mayramallqui22sxxi@gmail.com')
  with check (auth.jwt() ->> 'email' = 'mayramallqui22sxxi@gmail.com');

create policy "Lectura pública de certificados" on certificados
  for select using (true);
create policy "Solo la dueña edita certificados" on certificados
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'mayramallqui22sxxi@gmail.com')
  with check (auth.jwt() ->> 'email' = 'mayramallqui22sxxi@gmail.com');
