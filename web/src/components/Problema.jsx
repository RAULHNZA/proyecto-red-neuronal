import Seccion from './Seccion.jsx'

const cifras = [
  { valor: '30 %', texto: 'de la energía mundial la consumen los edificios' },
  { valor: '27 %', texto: 'de las emisiones de CO₂ vienen de los edificios' },
]

export default function Problema() {
  return (
    <Seccion
      id="problema"
      titulo="El problema"
      subtitulo="Saber de antemano cuánta energía se va a consumir permite planear mejor y desperdiciar menos."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {cifras.map((c) => (
          <div key={c.valor} className="tarjeta p-6">
            <p className="text-5xl font-bold tracking-tight">{c.valor}</p>
            <p className="texto-2 mt-2">{c.texto}</p>
          </div>
        ))}
      </div>
      <div className="tarjeta mt-4 p-6">
        <h3 className="font-semibold">Impacto</h3>
        <p className="texto-2 mt-2">
          Este proyecto se relaciona con dos Objetivos de Desarrollo Sostenible de la ONU:
          el <strong className="text-[var(--text-primary)]">ODS 7</strong> (energía asequible y no
          contaminante) y el <strong className="text-[var(--text-primary)]">ODS 13</strong> (acción
          por el clima). Predecir el consumo ayuda a reducir el desperdicio y, con ello, las emisiones.
        </p>
      </div>
    </Seccion>
  )
}
