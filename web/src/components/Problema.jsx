import Seccion from './Seccion.jsx'
import Contador from './Contador.jsx'

const cifras = [
  { valor: 30, texto: 'de la energía mundial la consumen los edificios' },
  { valor: 27, texto: 'de las emisiones de CO₂ vienen de los edificios' },
]

export default function Problema() {
  return (
    <Seccion
      id="problema"
      numero="01"
      titulo="El problema"
      subtitulo="Saber de antemano cuánta energía se va a consumir permite planear mejor y desperdiciar menos."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {cifras.map((c) => (
          <div key={c.valor} className="tarjeta p-7">
            <p className="text-6xl font-semibold tracking-tight">
              <Contador valor={c.valor} sufijo=" %" />
            </p>
            <p className="texto-2 mt-3">{c.texto}</p>
          </div>
        ))}
      </div>
      <div className="tarjeta mt-4 flex flex-col gap-4 p-7 sm:flex-row sm:items-start">
        <div className="flex shrink-0 gap-2">
          {['ODS 7', 'ODS 13'].map((o) => (
            <span key={o} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-semibold text-[var(--series-1)]">{o}</span>
          ))}
        </div>
        <p className="texto-2 leading-relaxed">
          Este proyecto se relaciona con dos Objetivos de Desarrollo Sostenible de la ONU:
          energía asequible y no contaminante (<strong className="text-[var(--text-primary)]">ODS 7</strong>) y
          acción por el clima (<strong className="text-[var(--text-primary)]">ODS 13</strong>). Predecir el
          consumo ayuda a reducir el desperdicio y, con ello, las emisiones.
        </p>
      </div>
    </Seccion>
  )
}
