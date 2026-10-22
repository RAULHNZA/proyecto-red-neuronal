import {
  CartesianGrid, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis,
} from 'recharts'
import Seccion from './Seccion.jsx'
import CajaTooltip from './Tooltip.jsx'
import { ejes, fmt } from '../utils.js'

export default function GraficaPrediccion({ puntos }) {
  // Mismo rango en ambos ejes, en múltiplos de 100 (la red puede predecir valores negativos)
  const valores = puntos.flatMap((p) => [p.real, p.prediccion])
  const min = Math.min(0, Math.floor(Math.min(...valores) / 100) * 100)
  const max = Math.ceil(Math.max(...valores) / 100) * 100
  const dominio = [min, max]
  const paso = max - min > 600 ? 200 : 100
  const marcas = Array.from({ length: Math.floor((max - min) / paso) + 1 }, (_, i) => min + i * paso)

  return (
    <Seccion
      id="predicciones"
      titulo="Predicción vs. consumo real"
      subtitulo={`${puntos.length} puntos al azar del set de prueba (datos que la red nunca vio). Si la predicción fuera perfecta, todos los puntos caerían sobre la línea punteada y = x.`}
    >
      <div className="tarjeta p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <span className="flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full bg-[var(--series-1)]" />
            <span className="texto-2">Red neuronal</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-5 border-t-2 border-dashed border-[var(--text-secondary)]" />
            <span className="texto-2">Predicción perfecta (y = x)</span>
          </span>
        </div>
        <div className="mx-auto aspect-square max-h-[520px] w-full max-w-[560px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 8, right: 12, bottom: 24, left: 8 }}>
              <CartesianGrid stroke="var(--grid)" />
              <XAxis type="number" dataKey="real" domain={dominio} ticks={marcas} {...ejes}
                label={{ value: 'Consumo real (Wh)', position: 'insideBottom', offset: -14, fill: 'var(--text-muted)', fontSize: 12 }} />
              <YAxis type="number" dataKey="prediccion" domain={dominio} ticks={marcas} {...ejes} width={52}
                label={{ value: 'Predicho (Wh)', angle: -90, position: 'insideLeft', offset: 4, fill: 'var(--text-muted)', fontSize: 12, style: { textAnchor: 'middle' } }} />
              <ReferenceLine segment={[{ x: min, y: min }, { x: max, y: max }]}
                stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="6 4" ifOverflow="hidden" />
              <Tooltip
                cursor={false}
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <CajaTooltip filas={[
                      { nombre: 'Real', valor: `${fmt(payload[0].payload.real, 0)} Wh` },
                      { nombre: 'Predicción', valor: `${fmt(payload[0].payload.prediccion, 1)} Wh` },
                      { nombre: 'Error', valor: `${fmt(payload[0].payload.prediccion - payload[0].payload.real, 1)} Wh` },
                    ]} />
                  ) : null
                }
              />
              <Scatter data={puntos} fill="var(--series-1)" fillOpacity={0.45} isAnimationActive={false}
                shape={(p) => <circle cx={p.cx} cy={p.cy} r={4} fill="var(--series-1)" fillOpacity={0.45} />}
                activeShape={(p) => <circle cx={p.cx} cy={p.cy} r={6} fill="var(--series-1)" stroke="var(--surface-1)" strokeWidth={2} />} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="texto-2 mt-3 text-sm">
          Los consumos altos (picos) quedan por debajo de la línea: la red tiende a predecir valores
          cercanos al promedio porque los picos dependen de lo que hacen las personas, y eso no está en
          las 6 variables.
        </p>
      </div>
    </Seccion>
  )
}
