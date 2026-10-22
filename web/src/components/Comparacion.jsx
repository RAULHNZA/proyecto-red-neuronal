import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Seccion from './Seccion.jsx'
import CajaTooltip from './Tooltip.jsx'
import { ejes, fmt } from '../utils.js'

const MODELOS = [
  { nombre: 'Regresión lineal', color: 'var(--neutral)' },
  { nombre: 'Red neuronal', color: 'var(--series-1)' },
]
// Una gráfica por métrica: cada una tiene su propia escala
const GRAFICAS = [
  { clave: 'MAE (Wh)', dec: 1, menorEsMejor: true },
  { clave: 'RMSE (Wh)', dec: 1, menorEsMejor: true },
  { clave: 'R²', dec: 3, menorEsMejor: false },
]

// Cuánto mejora la red respecto a la regresión lineal
function mejora(red, lin, g) {
  return g.menorEsMejor
    ? `${fmt((1 - red / lin) * 100, 1)} % menos error`
    : `${red - lin >= 0 ? '+' : ''}${fmt(red - lin, 3)}`
}

export default function Comparacion({ metricas }) {
  const red = metricas.red_neuronal['Prueba']
  const lin = metricas.regresion_lineal_test

  return (
    <Seccion
      id="comparacion"
      titulo="Red neuronal vs. regresión lineal"
      subtitulo="Una regresión lineal de scikit-learn entrenada con exactamente los mismos datos sirve como punto de comparación. Resultados en el set de prueba."
    >
      <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {MODELOS.map((m) => (
          <span key={m.nombre} className="flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-sm" style={{ background: m.color }} />
            <span className="texto-2">{m.nombre}</span>
          </span>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {GRAFICAS.map((g) => {
          const datos = [
            { ...MODELOS[0], valor: lin[g.clave] },
            { ...MODELOS[1], valor: red[g.clave] },
          ]
          return (
            <div key={g.clave} className="tarjeta p-5">
              <p className="font-semibold">{g.clave}</p>
              <p className="texto-3 text-xs">{g.menorEsMejor ? 'Menos es mejor' : 'Más es mejor'}</p>
              <div className="mt-3 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datos} margin={{ top: 22, right: 4, bottom: 0, left: 4 }} barCategoryGap="24%">
                    <XAxis dataKey="nombre" {...ejes} tick={{ ...ejes.tick, fontSize: 11 }} interval={0} />
                    <YAxis hide domain={[0, 'auto']} />
                    <Tooltip
                      cursor={{ fill: 'var(--grid)', opacity: 0.5 }}
                      content={({ active, payload }) =>
                        active && payload?.length ? (
                          <CajaTooltip filas={[{
                            color: payload[0].payload.color,
                            nombre: payload[0].payload.nombre,
                            valor: fmt(payload[0].payload.valor, g.dec),
                          }]} />
                        ) : null
                      }
                    />
                    <Bar dataKey="valor" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                      {datos.map((d) => <Cell key={d.nombre} fill={d.color} />)}
                      <LabelList dataKey="valor" position="top" fill="var(--text-primary)" fontSize={13}
                        formatter={(v) => fmt(v, g.dec)} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="texto-2 mt-2 text-sm">
                Red vs. lineal: <span className="font-medium text-[var(--text-primary)]">{mejora(red[g.clave], lin[g.clave], g)}</span>
              </p>
            </div>
          )
        })}
      </div>
    </Seccion>
  )
}
