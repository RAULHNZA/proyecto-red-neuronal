import Revelar from './Revelar.jsx'
import { fmt } from '../utils.js'

export default function Hero({ datos }) {
  const capas = datos.arquitectura
  const parametros = capas.slice(1).reduce((t, n, i) => t + capas[i] * n + n, 0)
  const datosClave = [
    ['Arquitectura', capas.join(' → ')],
    ['Parámetros', parametros.toLocaleString('es-MX')],
    ['Épocas', datos.hiperparametros.epochs.toLocaleString('es-MX')],
    ['R² en prueba', fmt(datos.metricas.red_neuronal['Prueba']['R²'], 3)],
  ]

  return (
    <header id="inicio" className="mx-auto max-w-5xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
      <Revelar>
        <p className="etiqueta flex items-center gap-3">
          <span className="punto-vivo" />
          Proyecto final · Seminario de Sistemas II
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl">
          Una red neuronal que aprende a <span className="degradado">predecir el consumo de energía</span>
        </h1>
        <p className="texto-2 mt-6 max-w-2xl text-lg leading-relaxed">
          Programada desde cero con NumPy, sin TensorFlow, Keras ni PyTorch. A partir de la hora,
          el día y el clima, estima cuánta electricidad usan los electrodomésticos de una casa.
        </p>
      </Revelar>

      <Revelar retraso={150}>
        <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {datosClave.map(([nombre, valor]) => (
            <div key={nombre} className="tarjeta px-4 py-3">
              <dt className="texto-3 text-xs">{nombre}</dt>
              <dd className="mt-1 font-mono text-sm font-semibold tracking-tight sm:text-base">{valor}</dd>
            </div>
          ))}
        </dl>
      </Revelar>

      <Revelar retraso={300}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#metricas"
            className="rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
            Ver resultados
          </a>
          <a href="https://github.com/RAULHNZA/proyecto-red-neuronal" target="_blank" rel="noreferrer"
            className="rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--series-1)] hover:text-[var(--series-1)]">
            Código en GitHub ↗
          </a>
        </div>
        <p className="texto-2 mt-10 text-sm">
          <span className="font-medium text-[var(--text-primary)]">Raúl Hernández Nuñez</span>
          <span className="texto-3"> · Matrícula 2173770 · IAS · Grupo 002</span>
        </p>
        <a href="#problema" className="bajar texto-3 mt-12 inline-flex items-center gap-2 font-mono text-xs" aria-label="Bajar a El problema">
          ↓ desliza
        </a>
      </Revelar>
    </header>
  )
}
