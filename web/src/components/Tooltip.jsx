// Tooltip común para las gráficas de Recharts
export default function CajaTooltip({ titulo, filas }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm shadow-lg">
      {titulo && <p className="texto-3 mb-1 text-xs">{titulo}</p>}
      {filas.map(({ color, nombre, valor }) => (
        <p key={nombre} className="flex items-center gap-2">
          {color && <span className="inline-block size-2.5 rounded-full" style={{ background: color }} />}
          <span className="texto-2">{nombre}</span>
          <span className="ml-auto pl-4 font-medium tabular-nums">{valor}</span>
        </p>
      ))}
    </div>
  )
}

