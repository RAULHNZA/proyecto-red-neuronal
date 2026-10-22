import Seccion from './Seccion.jsx'
import { fmt } from '../utils.js'

const CLAVES = [
  { clave: 'MAE (Wh)', nombre: 'MAE', unidad: 'Wh', dec: 1, desc: 'Error promedio: en cuántos Wh se equivoca la red, en promedio.' },
  { clave: 'RMSE (Wh)', nombre: 'RMSE', unidad: 'Wh', dec: 1, desc: 'Como el MAE, pero castiga más los errores grandes.' },
  { clave: 'R²', nombre: 'R²', unidad: '', dec: 3, desc: 'Qué parte de la variación del consumo explica el modelo (1 = perfecto, 0 = igual que predecir el promedio).' },
]
const CONJUNTOS = ['Entrenamiento', 'Validación', 'Prueba']

export default function Metricas({ metricas }) {
  const prueba = metricas['Prueba']
  return (
    <Seccion
      id="metricas"
      titulo="Métricas"
      subtitulo="Calculadas a mano con NumPy y comprobadas contra scikit-learn. Las del set de prueba son las que cuentan, porque son datos que la red nunca vio."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {CLAVES.map((c) => (
          <div key={c.clave} className="tarjeta p-6">
            <p className="texto-2 text-sm font-medium">{c.nombre} en prueba</p>
            <p className="mt-1 text-4xl font-bold tracking-tight tabular-nums">
              {fmt(prueba[c.clave], c.dec)}
              {c.unidad && <span className="texto-3 ml-1 text-lg font-medium">{c.unidad}</span>}
            </p>
            <p className="texto-3 mt-2 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="tarjeta mt-4 overflow-x-auto p-2 sm:p-4">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="texto-3 text-left">
              <th className="px-3 py-2 font-medium">Conjunto</th>
              {CLAVES.map((c) => <th key={c.clave} className="px-3 py-2 text-right font-medium">{c.clave}</th>)}
            </tr>
          </thead>
          <tbody>
            {CONJUNTOS.map((n) => (
              <tr key={n} className={`border-t border-[var(--border)] ${n === 'Prueba' ? 'font-semibold' : ''}`}>
                <td className="px-3 py-2">{n}</td>
                {CLAVES.map((c) => (
                  <td key={c.clave} className="px-3 py-2 text-right tabular-nums">{fmt(metricas[n][c.clave], c.dec)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Seccion>
  )
}
