import Revelar from './Revelar.jsx'

// Envoltura común: número, título y subtítulo de cada sección
export default function Seccion({ id, numero, titulo, subtitulo, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <Revelar>
        {numero && (
          <p className="etiqueta flex items-center gap-3">
            <span>{numero}</span>
            <span className="h-px w-10 bg-[var(--series-1)] opacity-40" />
          </p>
        )}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{titulo}</h2>
        {subtitulo && <p className="texto-2 mt-3 max-w-3xl leading-relaxed">{subtitulo}</p>}
      </Revelar>
      <Revelar retraso={120}>
        <div className="mt-8">{children}</div>
      </Revelar>
    </section>
  )
}
