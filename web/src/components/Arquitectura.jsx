import Seccion from './Seccion.jsx'

const ENTRADAS = ['hour', 'dayofweek', 'is_weekend', 'month', 'T_out', 'RH_out']
const ETIQUETAS = ['Entrada', 'Oculta 1 · ReLU', 'Oculta 2 · ReLU', 'Salida · lineal']

// Diagrama SVG de la red: un círculo por neurona y líneas entre capas
function Diagrama({ capas }) {
  const ancho = 640
  const alto = 400
  const margenY = 28
  const xs = capas.map((_, i) => 110 + (i * (ancho - 200)) / (capas.length - 1))
  const posiciones = capas.map((n, i) => {
    const paso = Math.min(22, (alto - 2 * margenY - 30) / Math.max(n - 1, 1))
    const inicio = (alto - 30) / 2 - ((n - 1) * paso) / 2
    return Array.from({ length: n }, (_, j) => ({ x: xs[i], y: inicio + j * paso }))
  })

  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} className="h-auto w-full" role="img"
      aria-label={`Red neuronal con capas ${capas.join(', ')}`}>
      {posiciones.slice(0, -1).map((capa, i) =>
        capa.flatMap((a, j) =>
          posiciones[i + 1].map((b, k) => (
            <line key={`${i}-${j}-${k}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="var(--text-muted)" strokeOpacity="0.18" strokeWidth="1" />
          )),
        ),
      )}
      {posiciones.map((capa, i) =>
        capa.map((p, j) => (
          <circle key={`${i}-${j}`} cx={p.x} cy={p.y} r={i === 0 || i === capas.length - 1 ? 8 : 6.5}
            fill={i === capas.length - 1 ? 'var(--series-2)' : i === 0 ? 'var(--surface-1)' : 'var(--series-1)'}
            stroke={i === 0 ? 'var(--series-1)' : 'var(--surface-1)'} strokeWidth="2" />
        )),
      )}
      {posiciones[0].map((p, j) => (
        <text key={ENTRADAS[j]} x={p.x - 16} y={p.y + 4} textAnchor="end" fontSize="12"
          fontFamily="ui-monospace, monospace" fill="var(--text-secondary)">{ENTRADAS[j]}</text>
      ))}
      <text x={posiciones.at(-1)[0].x + 16} y={posiciones.at(-1)[0].y + 4} fontSize="12"
        fontFamily="ui-monospace, monospace" fill="var(--text-secondary)">Wh</text>
      {xs.map((x, i) => (
        <g key={x}>
          <text x={x} y={alto - 22} textAnchor="middle" fontSize="13" fontWeight="600"
            fill="var(--text-primary)">{capas[i]}</text>
          <text x={x} y={alto - 6} textAnchor="middle" fontSize="11"
            fill="var(--text-muted)">{ETIQUETAS[i]}</text>
        </g>
      ))}
    </svg>
  )
}

export default function Arquitectura({ datos }) {
  const capas = datos.arquitectura
  const h = datos.hiperparametros
  const parametros = capas.slice(1).reduce((t, n, i) => t + capas[i] * n + n, 0)
  const pasos = [
    ['Forward', 'Los datos pasan capa por capa: z = a·W + b y luego ReLU.'],
    ['Loss', 'Se mide el error con MSE (error cuadrático medio).'],
    ['Backpropagation', 'La regla de la cadena calcula cuánto contribuye cada peso al error.'],
    ['Gradient descent', 'Cada peso se mueve un poco en contra de su gradiente: W ← W − η·∂L/∂W.'],
  ]

  return (
    <Seccion
      id="arquitectura"
      titulo="La arquitectura"
      subtitulo={`${capas.join(' → ')}: dos capas ocultas con ReLU y una salida lineal que da el consumo en Wh. En total son ${parametros} parámetros entrenables.`}
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="tarjeta p-4 sm:p-6 lg:col-span-3">
          <Diagrama capas={capas} />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <div className="tarjeta p-6">
            <h3 className="font-semibold">Así aprende, en cada época</h3>
            <ol className="mt-3 space-y-3 text-sm">
              {pasos.map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--series-1)]">{i + 1}</span>
                  <span><span className="font-medium">{t}.</span> <span className="texto-2">{d}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="tarjeta p-6 text-sm">
            <h3 className="font-semibold">Hiperparámetros</h3>
            <dl className="mt-3 grid grid-cols-2 gap-y-2">
              <dt className="texto-2">Learning rate</dt><dd className="text-right tabular-nums">{h.learning_rate}</dd>
              <dt className="texto-2">Épocas</dt><dd className="text-right tabular-nums">{h.epochs.toLocaleString('es-MX')}</dd>
              <dt className="texto-2">Batch</dt><dd className="text-right">completo</dd>
              <dt className="texto-2">Inicialización</dt><dd className="text-right">{h.init === 'he' ? 'He' : h.init}</dd>
            </dl>
          </div>
        </div>
      </div>
    </Seccion>
  )
}
