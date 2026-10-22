import Seccion from './Seccion.jsx'

const ENTRADAS = ['hour', 'dayofweek', 'is_weekend', 'month', 'T_out', 'RH_out']
const ETIQUETAS = ['Entrada', 'Oculta 1 · ReLU', 'Oculta 2 · ReLU', 'Salida · lineal']
const RETRASO_CAPA = 0.9 // segundos entre capas: lo que tarda una señal en cruzar (30 % de 3.2 s)

// Diagrama SVG de la red: un círculo por neurona y líneas entre capas.
// Algunas conexiones llevan una "señal" animada que avanza capa por capa (forward).
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
      <defs>
        {/* Colores fijos y userSpaceOnUse: así también se pintan las líneas horizontales */}
        <linearGradient id="grad-senal" gradientUnits="userSpaceOnUse" x1="100" y1="0" x2={ancho - 80} y2="0">
          <stop offset="0" stopColor="#2a78d6" />
          <stop offset="1" stopColor="#6250d6" />
        </linearGradient>
      </defs>
      {posiciones.slice(0, -1).map((capa, i) =>
        capa.flatMap((a, j) =>
          posiciones[i + 1].map((b, k) => (
            <line key={`${i}-${j}-${k}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="var(--text-muted)" strokeOpacity="0.16" strokeWidth="1" />
          )),
        ),
      )}
      {/* Señales: una de cada pocas conexiones, con retraso según la capa */}
      {posiciones.slice(0, -1).map((capa, i) =>
        capa.flatMap((a, j) =>
          posiciones[i + 1].map((b, k) =>
            (j * 7 + k * 3 + i) % 5 === 0 ? (
              <line key={`s-${i}-${j}-${k}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} pathLength="100"
                className="senal" stroke="url(#grad-senal)" strokeWidth="2.5" strokeLinecap="round"
                style={{ animationDelay: `${i * RETRASO_CAPA + ((j + k) % 4) * 0.06}s` }} />
            ) : null,
          ),
        ),
      )}
      {posiciones.map((capa, i) =>
        capa.map((p, j) => {
          const salida = i === capas.length - 1
          const entrada = i === 0
          return (
            <g key={`${i}-${j}`}>
              {!entrada && (
                <circle cx={p.x} cy={p.y} r={salida ? 9 : 6.5} className="halo"
                  fill={salida ? 'var(--series-2)' : 'var(--series-1)'}
                  style={{ animationDelay: `${(i - 1) * RETRASO_CAPA + 0.9}s` }} />
              )}
              <circle cx={p.x} cy={p.y} r={entrada || salida ? 8 : 6.5}
                fill={salida ? 'var(--series-2)' : entrada ? 'var(--surface-1)' : 'var(--series-1)'}
                stroke={entrada ? 'var(--series-1)' : 'var(--surface-1)'} strokeWidth="2" />
            </g>
          )
        }),
      )}
      {posiciones[0].map((p, j) => (
        <text key={ENTRADAS[j]} x={p.x - 16} y={p.y + 4} textAnchor="end" fontSize="12"
          fontFamily="JetBrains Mono, ui-monospace, monospace" fill="var(--text-secondary)">{ENTRADAS[j]}</text>
      ))}
      <text x={posiciones.at(-1)[0].x + 18} y={posiciones.at(-1)[0].y + 4} fontSize="12"
        fontFamily="JetBrains Mono, ui-monospace, monospace" fill="var(--text-secondary)">Wh</text>
      {xs.map((x, i) => (
        <g key={x}>
          <text x={x} y={alto - 22} textAnchor="middle" fontSize="13" fontWeight="600"
            fontFamily="JetBrains Mono, ui-monospace, monospace" fill="var(--text-primary)">{capas[i]}</text>
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
      numero="03"
      titulo="La arquitectura"
      subtitulo={`${capas.join(' → ')}: dos capas ocultas con ReLU y una salida lineal que da el consumo en Wh. En total son ${parametros} parámetros entrenables.`}
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="tarjeta flex items-center p-4 sm:p-6 lg:col-span-3">
          <Diagrama capas={capas} />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <div className="tarjeta p-6">
            <h3 className="font-semibold">Así aprende, en cada época</h3>
            <ol className="mt-4 space-y-3 text-sm">
              {pasos.map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] font-mono text-xs font-semibold text-[var(--series-1)]">{i + 1}</span>
                  <span><span className="font-medium">{t}.</span> <span className="texto-2">{d}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="tarjeta p-6 text-sm">
            <h3 className="font-semibold">Hiperparámetros</h3>
            <dl className="mt-3 grid grid-cols-2 gap-y-2">
              <dt className="texto-2">Learning rate</dt><dd className="text-right font-mono">{h.learning_rate}</dd>
              <dt className="texto-2">Épocas</dt><dd className="text-right font-mono">{h.epochs.toLocaleString('es-MX')}</dd>
              <dt className="texto-2">Batch</dt><dd className="text-right font-mono">completo</dd>
              <dt className="texto-2">Inicialización</dt><dd className="text-right font-mono">{h.init === 'he' ? 'He' : h.init}</dd>
            </dl>
          </div>
        </div>
      </div>
    </Seccion>
  )
}
