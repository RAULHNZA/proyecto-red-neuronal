import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Seccion from './Seccion.jsx'
import CajaTooltip from './Tooltip.jsx'
import { ejes, fmt } from '../utils.js'

const SERIES = [
  { clave: 'train', nombre: 'Entrenamiento', color: 'var(--series-1)' },
  { clave: 'val', nombre: 'Validación', color: 'var(--series-2)' },
]

export default function GraficaLoss({ loss }) {
  const inicio = loss[0]
  const fin = loss.at(-1)
  // Marcas del eje X cada 1,000 épocas
  const epocas = Math.ceil(fin.epoca / 1000) * 1000
  const marcas = Array.from({ length: epocas / 1000 + 1 }, (_, i) => i * 1000)

  return (
    <Seccion
      id="entrenamiento"
      titulo="El entrenamiento"
      subtitulo="El loss (MSE con los datos normalizados) en cada época. Si baja, la red está aprendiendo; si el de validación baja junto con el de entrenamiento, no solo está memorizando."
    >
      <div className="tarjeta p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {SERIES.map((s) => (
            <span key={s.clave} className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-5 rounded" style={{ background: s.color }} />
              <span className="texto-2">{s.nombre}</span>
              <span className="tabular-nums">
                {fmt(inicio[s.clave], 3)} → <strong>{fmt(fin[s.clave], 3)}</strong>
              </span>
            </span>
          ))}
        </div>
        <div className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={loss} margin={{ top: 8, right: 12, bottom: 20, left: 0 }}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="epoca" type="number" domain={[0, epocas]} ticks={marcas} {...ejes}
                tickFormatter={(v) => v.toLocaleString('es-MX')}
                label={{ value: 'Época', position: 'insideBottom', offset: -12, fill: 'var(--text-muted)', fontSize: 12 }} />
              <YAxis {...ejes} axisLine={false} width={48} domain={['auto', 'auto']}
                tickFormatter={(v) => fmt(v, 2)} />
              <Tooltip
                cursor={{ stroke: 'var(--text-muted)', strokeDasharray: '3 3' }}
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <CajaTooltip
                      titulo={`Época ${label.toLocaleString('es-MX')}`}
                      filas={SERIES.map((s) => ({
                        color: s.color,
                        nombre: s.nombre,
                        valor: fmt(payload[0].payload[s.clave], 4),
                      }))}
                    />
                  ) : null
                }
              />
              {SERIES.map((s) => (
                <Line key={s.clave} dataKey={s.clave} name={s.nombre} stroke={s.color}
                  strokeWidth={2} dot={false} isAnimationActive={false}
                  activeDot={{ r: 4, stroke: 'var(--surface-1)', strokeWidth: 2 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Seccion>
  )
}
