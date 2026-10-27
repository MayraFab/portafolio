import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Mensaje secreto para quien abra la consola del navegador 👀
console.log(
  '%c¡Hola! 👋%c\n¿Revisando el código? Me encanta. Escribe "help" en la terminal del portafolio para conocerme mejor.',
  'font: 700 18px monospace; color: #b9694e;',
  'font: 13px monospace; color: #4f6577;'
)
