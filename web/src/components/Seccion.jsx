// Envoltura común: título y subtítulo de cada sección
export default function Seccion({ id, titulo, subtitulo, children }) {
  return (
    <section id={id} className="scroll-mt-6">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{titulo}</h2>
      {subtitulo && <p className="texto-2 mt-2 max-w-3xl">{subtitulo}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

