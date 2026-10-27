import { useEffect, useRef, useState } from 'react';
import './Perfil.css';
import { proyectosData } from '../../data/proyectos';
import { techStack } from '../../data/techStack';
import { certificadosData, ingles } from '../../data/certificados';
import miFoto from '../../assets/miFoto.png';
import IconoCertificado from '../Certificados/IconoCertificado';

// Cuando reemplaces src/assets/miFoto.png por tu foto real, cambia esto a true
const TENGO_FOTO = false;

const PROMPT = 'mayra@senati:~$';
const MI_CORREO = '1582403@senati.pe';

// Datos de formación (agrega o quita ítems aquí)
const formacion = [
  { titulo: 'Ingeniería de Software con IA', lugar: 'SENATI', estado: 'En curso · 5.º semestre' },
  { titulo: 'Formación dual', lugar: 'ELOMUX', estado: 'En curso' },
];

const perfil = [
  'Soy estudiante de quinto semestre de Ingeniería de Software con Inteligencia Artificial en SENATI. Actualmente complemento mi formación con el modelo dual en la empresa ELOMUX, donde conozco de cerca el trabajo y los retos de un entorno profesional.',
  'Me considero una persona multifacética, curiosa y comprometida con aprender cosas nuevas constantemente. Disfruto explorar distintas áreas de la tecnología y aplicar lo aprendido en proyectos concretos.',
  'Destaco por mis habilidades blandas, la colaboración y la comunicación clara de ideas, cualidades que me ayudan a aportar y crecer junto a cada equipo.',
];

// Comandos rápidos debajo de la terminal (útiles en el celular)
const atajos = [
  { comando: 'help', detalle: 'Ver comandos' },
  { comando: 'whoami', detalle: 'Quién soy' },
  { comando: 'perfil', detalle: 'Mi perfil' },
  { comando: 'educacion', detalle: 'Formación' },
  { comando: 'skills', detalle: 'Tecnologías' },
  { comando: 'certificados', detalle: 'Cursos' },
  { comando: 'proyectos', detalle: 'Mis trabajos' },
  { comando: 'contacto', detalle: 'Escríbeme' },
];

// Tipos de línea: cmd (lo que se escribió), out (respuesta), ok, err, sis (sistema), link
const out = (texto) => ({ tipo: 'out', texto });
const ok = (texto) => ({ tipo: 'ok', texto });
const err = (texto) => ({ tipo: 'err', texto });
const sis = (texto) => ({ tipo: 'sis', texto });
const link = (texto, href) => ({ tipo: 'link', texto, href });

const ayuda = [
  out('Comandos disponibles:'),
  out('  whoami          → quién soy'),
  out('  perfil          → mi perfil profesional'),
  out('  educacion       → dónde estudio y practico'),
  out('  skills          → tecnologías que uso'),
  out('  certificados    → cursos y certificados'),
  out('  ingles          → mi nivel de inglés'),
  out('  proyectos       → lista de proyectos'),
  out('  contacto        → cómo encontrarme'),
  out('  sudo contratar  → 😉'),
  out('  clear           → limpiar la pantalla'),
];

// Devuelve las líneas de respuesta para un comando
const responder = (entrada) => {
  const texto = entrada.trim().toLowerCase();

  if (texto === '') return [];
  if (['help', 'ayuda', '?'].includes(texto)) return ayuda;
  if (texto === 'whoami') {
    return [
      ok('Mayra Fabiola Mallqui Paccini'),
      out('Estudiante de Ingeniería de Software con IA · SENATI · Lima, Perú'),
    ];
  }
  if (['perfil', 'cat perfil.txt', 'about', 'sobre-mi'].includes(texto)) {
    return perfil.map((parrafo) => out(parrafo));
  }
  if (['educacion', 'educación', 'formacion', 'formación'].includes(texto)) {
    return formacion.map((item) => out(`▸ ${item.titulo} — ${item.lugar} [${item.estado}]`));
  }
  if (['skills', 'habilidades', 'stack'].includes(texto)) {
    return [
      ...techStack.map((grupo) => out(`${grupo.fila.padEnd(14, ' ')} ${grupo.items.map((i) => i.nombre).join(' · ')}`)),
      sis('→ Mira mi ficha de personaje RPG más abajo'),
    ];
  }
  if (['certificados', 'cursos'].includes(texto)) {
    return certificadosData.map((c) => out(`🏅 ${c.titulo} — ${c.emisor}`));
  }
  if (['ingles', 'inglés', 'english'].includes(texto)) {
    return [ok(`Inglés ${ingles.nivel} — ${ingles.institucion} [${ingles.estado}]`), out('Nice to meet you! 👋')];
  }
  if (['proyectos', 'ls', 'ls proyectos'].includes(texto)) {
    return proyectosData.map((p) => out(`📁 ${p.archivo.padEnd(20, ' ')} ${p.titulo}`));
  }
  if (['contacto', 'contact'].includes(texto)) {
    return [
      link(`✉  ${MI_CORREO}`, `mailto:${MI_CORREO}`),
      link('⌥  github.com/MayraFab', 'https://github.com/MayraFab'),
    ];
  }
  if (texto.startsWith('sudo')) {
    if (/contrat|hire/.test(texto)) {
      setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 1800);
      return [
        out('[sudo] contraseña para reclutador: ********'),
        ok('✔ Acceso concedido. ¡Excelente decisión! 🎉'),
        sis('Redirigiendo a #contacto…'),
      ];
    }
    return [err('Permiso denegado: solo reclutadores 😄 Prueba "sudo contratar"')];
  }
  if (['cafe', 'café', 'coffee'].includes(texto)) {
    return [out('☕ Preparando café…'), ok('Listo. Ahora sí, a programar.')];
  }
  if (['date', 'fecha'].includes(texto)) return [out(new Date().toLocaleString('es-PE'))];
  if (texto.startsWith('echo ')) return [out(entrada.trim().slice(5))];
  if (texto === 'exit') return [out('No puedes salir tan fácil 😉 Mejor escribe "proyectos".')];
  if (texto.startsWith('rm ')) return [err('Buen intento 😏 Este portafolio está protegido.')];

  return [err(`comando no encontrado: ${entrada.trim()}. Escribe "help" para ver los comandos.`)];
};

const Perfil = () => {
  const [lineas, setLineas] = useState([]);
  const [entrada, setEntrada] = useState('');
  // Texto que se "teclea" solo durante la presentación automática
  const [tecleando, setTecleando] = useState('');
  const [listo, setListo] = useState(false);

  const terminalRef = useRef(null);
  const cuerpoRef = useRef(null);
  const inputRef = useRef(null);
  const historial = useRef([]);
  const posHistorial = useRef(0);

  // Presentación automática: cuando la terminal aparece en pantalla, se escriben dos comandos
  useEffect(() => {
    let cancelado = false;
    const temporizadores = [];
    const esperar = (ms) => new Promise((resolver) => temporizadores.push(setTimeout(resolver, ms)));

    const teclear = async (comando) => {
      for (let i = 1; i <= comando.length; i++) {
        if (cancelado) return;
        setTecleando(comando.slice(0, i));
        await esperar(65);
      }
      await esperar(250);
      if (cancelado) return;
      const respuesta = responder(comando);
      setTecleando('');
      setLineas((previas) => [...previas, { tipo: 'cmd', texto: comando }, ...respuesta]);
      await esperar(450);
    };

    const observador = new IntersectionObserver(
      async ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        await teclear('whoami');
        await teclear('cat perfil.txt');
        if (cancelado) return;
        setLineas((previas) => [...previas, sis('Escribe "help" o toca un comando de abajo ✨')]);
        setListo(true);
      },
      { threshold: 0.35 },
    );

    observador.observe(terminalRef.current);
    return () => {
      cancelado = true;
      observador.disconnect();
      temporizadores.forEach(clearTimeout);
    };
  }, []);

  // Mantiene la terminal desplazada hasta la última línea
  useEffect(() => {
    const cuerpo = cuerpoRef.current;
    cuerpo.scrollTop = cuerpo.scrollHeight;
  }, [lineas, tecleando]);

  const ejecutar = (comando) => {
    const limpio = comando.trim();
    if (limpio) {
      historial.current = [...historial.current, limpio];
      posHistorial.current = historial.current.length;
    }
    if (['clear', 'cls'].includes(limpio.toLowerCase())) {
      setLineas([]);
      return;
    }
    const respuesta = responder(limpio);
    setLineas((previas) => [...previas, { tipo: 'cmd', texto: limpio }, ...respuesta]);
  };

  const alEnviar = (e) => {
    e.preventDefault();
    ejecutar(entrada);
    setEntrada('');
  };

  // Flechas arriba/abajo recorren los comandos anteriores, como en una terminal real
  const alPresionarTecla = (e) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();
    const total = historial.current.length;
    if (!total) return;
    const nueva = Math.max(0, Math.min(total, posHistorial.current + (e.key === 'ArrowUp' ? -1 : 1)));
    posHistorial.current = nueva;
    setEntrada(historial.current[nueva] ?? '');
  };

  return (
    <section id="sobre-mi" className="section sobre-mi-section">
      <div className="section-container reveal">
        <header className="section-header">
          <span className="section-kicker">01 · perfil</span>
          <h2 className="section-title">
            Sobre <span className="text-accent">mí</span>
          </h2>
          <p className="section-subtitle">
            Lo esencial sobre mí y mi perfil en el formato que más uso: una terminal. Escribe un comando o toca los
            atajos.
          </p>
        </header>

        <div className="perfil-grid">
          {/* Tarjeta de presentación */}
          <aside className="tarjeta">
            <div className="tarjeta-cabecera">
              <span>Perfil</span>
              <span className="tarjeta-id">Lima · PE</span>
            </div>

            <div className="tarjeta-foto">
              {TENGO_FOTO ? (
                <img src={miFoto} alt="Foto de Mayra Mallqui" />
              ) : (
                <svg viewBox="0 0 64 64" role="img" aria-label="Espacio para foto de perfil">
                  <circle cx="32" cy="24" r="12" />
                  <path d="M10 60c0-13 10-20 22-20s22 7 22 20z" />
                </svg>
              )}
            </div>

            <h3 className="tarjeta-nombre">Mayra Fabiola Mallqui Paccini</h3>

            <dl className="tarjeta-datos">
              <div>
                <dt>Región</dt>
                <dd>Lima, Perú</dd>
              </div>
              <div>
                <dt>Base</dt>
                <dd>SENATI · 5.º semestre</dd>
              </div>
              <div>
                <dt>Formación dual</dt>
                <dd>ELOMUX</dd>
              </div>
              <div>
                <dt>Idioma</dt>
                <dd>Inglés {ingles.nivel}</dd>
              </div>
            </dl>

            <a className="tarjeta-certificados" href="#certificados">
              <span className="certificados-titulo">{certificadosData.length} certificados</span>
              <span className="certificados-fila" aria-hidden="true">
                {certificadosData.map((c) => (
                  <span key={c.id} title={c.titulo}>
                    <IconoCertificado nombre={c.icono} tamano={16} />
                  </span>
                ))}
              </span>
            </a>
          </aside>

          <div className="perfil-terminal">
            <div
              className="terminal zona-oscura"
              ref={terminalRef}
              onClick={() => listo && inputRef.current?.focus({ preventScroll: true })}
            >
              {/* Barra superior de la ventana */}
              <div className="terminal-barra">
                <span className="punto punto-1"></span>
                <span className="punto punto-2"></span>
                <span className="punto punto-3"></span>
                <span className="terminal-titulo">mayra@senati: ~/perfil — zsh</span>
              </div>

              <div className="terminal-cuerpo" ref={cuerpoRef} aria-live="polite">
                <p className="linea linea-sis">
                  Último inicio de sesión: {new Date().toLocaleDateString('es-PE')} en ttys001
                </p>

                {lineas.map((linea, i) =>
                  linea.tipo === 'cmd' ? (
                    <p key={i} className="linea">
                      <span className="prompt">{PROMPT}</span> {linea.texto}
                    </p>
                  ) : linea.tipo === 'link' ? (
                    <p key={i} className="linea">
                      <a className="linea-link" href={linea.href} target="_blank" rel="noopener noreferrer">
                        {linea.texto}
                      </a>
                    </p>
                  ) : (
                    <p key={i} className={`linea linea-${linea.tipo}`}>
                      {linea.texto}
                    </p>
                  ),
                )}

                {/* Línea activa: autoescritura o input real */}
                {listo ? (
                  <form className="linea linea-input" onSubmit={alEnviar}>
                    <label htmlFor="terminal-input" className="prompt">
                      {PROMPT}
                    </label>
                    <input
                      id="terminal-input"
                      ref={inputRef}
                      value={entrada}
                      onChange={(e) => setEntrada(e.target.value)}
                      onKeyDown={alPresionarTecla}
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      aria-label="Escribe un comando"
                    />
                  </form>
                ) : (
                  <p className="linea">
                    <span className="prompt">{PROMPT}</span> {tecleando}
                    <span className="cursor-bloque">█</span>
                  </p>
                )}
              </div>
            </div>

            {/* Atajos de comandos */}
            <div className="terminal-atajos" aria-label="Comandos rápidos">
              {atajos.map((atajo) => (
                <button
                  key={atajo.comando}
                  type="button"
                  className="atajo"
                  disabled={!listo}
                  onClick={() => ejecutar(atajo.comando)}
                >
                  <span className="atajo-comando">
                    <span className="atajo-signo">$</span> {atajo.comando}
                  </span>
                  <span className="atajo-detalle">{atajo.detalle}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
