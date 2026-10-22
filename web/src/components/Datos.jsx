import Seccion from './Seccion.jsx'

const variables = [
  ['hour', 'Hora del día (0 a 23)', 'Derivada de la fecha'],
  ['dayofweek', 'Día de la semana (0 = lunes)', 'Derivada de la fecha'],
  ['is_weekend', '1 si es sábado o domingo', 'Derivada de la fecha'],
  ['month', 'Mes del año', 'Derivada de la fecha'],
  ['T_out', 'Temperatura exterior (°C)', 'Del dataset'],
  ['RH_out', 'Humedad exterior (%)', 'Del dataset'],
]

const division = [
  { nombre: 'Entrenamiento', pct: 70 },
  { nombre: 'Validación', pct: 15 },
  { nombre: 'Prueba', pct: 15 },
]

export default function Datos() {
  return (
    <Seccion
      id="datos"
      titulo="Los datos"
      subtitulo={
        <>
          Dataset{' '}
          <a
            className="text-[var(--series-1)] underline underline-offset-2"
            href="https://archive.ics.uci.edu/dataset/374/appliances+energy+prediction"
            target="_blank"
            rel="noreferrer"
          >
            UCI Appliances Energy Prediction
          </a>
          : 19,735 mediciones tomadas cada 10 minutos en una casa de Bélgica, de enero a mayo de 2016.
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="tarjeta overflow-x-auto p-6 lg:col-span-3">
          <h3 className="font-semibold">6 variables de entrada</h3>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {variables.map(([nombre, desc, origen]) => (
                <tr key={nombre} className="border-t border-[var(--border)]">
                  <td className="py-2 pr-3 font-mono text-[13px]">{nombre}</td>
                  <td className="texto-2 py-2 pr-3">{desc}</td>
                  <td className="texto-3 py-2 text-right whitespace-nowrap">{origen}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="texto-2 mt-4 text-sm">
            <span className="font-medium text-[var(--text-primary)]">Objetivo a predecir:</span>{' '}
            <span className="font-mono text-[13px]">Appliances</span>, el consumo de los electrodomésticos en Wh.
          </p>
        </div>
        <div className="tarjeta p-6 lg:col-span-2">
          <h3 className="font-semibold">División 70 / 15 / 15</h3>
          <p className="texto-2 mt-1 text-sm">Al azar y con semilla fija (42).</p>
          <div className="mt-4 flex h-3 gap-0.5 overflow-hidden rounded-full">
            {division.map((d, i) => (
              <div
                key={d.nombre}
                style={{ width: `${d.pct}%`, background: 'var(--series-1)', opacity: [1, 0.6, 0.35][i] }}
              />
            ))}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {division.map((d, i) => (
              <li key={d.nombre} className="flex items-center gap-2">
                <span
                  className="inline-block size-2.5 rounded-sm"
                  style={{ background: 'var(--series-1)', opacity: [1, 0.6, 0.35][i] }}
                />
                <span className="texto-2">{d.nombre}</span>
                <span className="ml-auto font-medium tabular-nums">{d.pct} %</span>
              </li>
            ))}
          </ul>
          <p className="texto-2 mt-4 text-sm">
            Los datos se normalizan con z-score usando solo la media y la desviación del set de
            entrenamiento, para que la red no vea información de prueba por adelantado.
          </p>
        </div>
      </div>
    </Seccion>
  )
}
