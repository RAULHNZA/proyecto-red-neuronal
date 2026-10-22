import { useEffect, useState } from 'react'

const ENLACES = [
  ['problema', 'Problema'],
  ['datos', 'Datos'],
  ['arquitectura', 'Arquitectura'],
  ['entrenamiento', 'Entrenamiento'],
  ['metricas', 'Resultados'],
  ['conclusiones', 'Conclusiones'],
]

// Barra fija arriba, con una línea que muestra cuánto llevas de la página
export default function Nav() {
  const [avance, setAvance] = useState(0)

  useEffect(() => {
    const medir = () => {
      const h = document.documentElement
      setAvance(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight))
    }
    medir()
    window.addEventListener('scroll', medir, { passive: true })
    return () => window.removeEventListener('scroll', medir)
  }, [])

  return (
    <nav className="sticky top-0 z-20 border-b border-[var(--border)] bg-[rgb(245_248_252/0.78)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
            <g stroke="var(--series-1)" strokeOpacity=".45" strokeWidth="1.2">
              <path d="M4 5 10 10 4 15M10 10h6M4 5l6-1M4 15l6 1M10 4l6 6-6 6" />
            </g>
            <g fill="var(--series-1)">
              <circle cx="4" cy="5" r="1.8" /><circle cx="4" cy="15" r="1.8" />
              <circle cx="10" cy="4" r="1.8" /><circle cx="10" cy="10" r="1.8" /><circle cx="10" cy="16" r="1.8" />
              <circle cx="16" cy="10" r="2.2" fill="var(--series-2)" />
            </g>
          </svg>
          <span>red<span className="text-[var(--series-1)]">.</span>neuronal</span>
        </a>
        <ul className="ml-auto hidden gap-6 text-sm md:flex">
          {ENLACES.map(([id, texto]) => (
            <li key={id}>
              <a href={`#${id}`} className="texto-2 transition-colors hover:text-[var(--series-1)]">{texto}</a>
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/RAULHNZA/proyecto-red-neuronal"
          target="_blank"
          rel="noreferrer"
          className="ml-auto rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-3 py-1 font-mono text-xs transition-colors hover:border-[var(--series-1)] hover:text-[var(--series-1)] md:ml-0"
        >
          GitHub ↗
        </a>
      </div>
      <div
        className="h-0.5 origin-left bg-gradient-to-r from-[var(--series-1)] to-[var(--violeta)]"
        style={{ transform: `scaleX(${avance})` }}
      />
    </nav>
  )
}
