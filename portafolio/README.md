# Portafolio – Mayra Fabiola Mallqui Paccini

Portafolio personal hecho con **React + Vite**, con paleta natural (crema, beige, rosa palo y verde salvia).

## Ejecutar en tu computadora
```bash
npm install
npm run dev
```
Abre http://localhost:5173

## Formulario de contacto (EmailJS)
1. Copia `.env.example` y renómbralo a `.env`.
2. Coloca tus claves de EmailJS.
3. Reinicia `npm run dev`.

## Publicar en Vercel
1. Sube el proyecto a GitHub.
2. En Vercel: **Add New → Project → Import** tu repositorio.
3. En **Environment Variables** agrega las 3 variables `VITE_EMAILJS_...`.
4. **Deploy**.

## Estructura
- `src/index.css` → paleta de colores y estilos compartidos
- `src/components/` → Navbar, Banner, Perfil, Habilidades, Proyectos, Contacto, Footer
- `src/assets/miFoto.png` → reemplázala por tu foto cuadrada y en `Banner.jsx` cambia `TENGO_FOTO` a `true`
