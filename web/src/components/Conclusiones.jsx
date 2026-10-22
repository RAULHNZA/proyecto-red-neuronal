import Seccion from './Seccion.jsx'
import { fmt } from '../utils.js'

export default function Conclusiones({ metricas }) {
  const red = metricas.red_neuronal['Prueba']
  const lin = metricas.regresion_lineal_test
  const gana = red['MAE (Wh)'] < lin['MAE (Wh)']

  // Los números salen de resultados.json; el texto se ajusta a ellos
  const puntos = [
    {
      titulo: 'La red se programó completamente desde cero',
      texto: 'Forward, MSE, backpropagation y gradient descent están escritos con NumPy. Un gradient check compara las derivadas hechas a mano contra una aproximación numérica y confirma que son correctas.',
    },
    {
      titulo: 'La red aprende',
      texto: 'El loss de entrenamiento baja de forma sostenida y el de validación lo acompaña: la red generaliza y no solo memoriza.',
    },
    gana
      ? {
          titulo: 'Supera a la regresión lineal',
          texto: `En el set de prueba la red tiene un MAE de ${fmt(red['MAE (Wh)'])} Wh contra ${fmt(lin['MAE (Wh)'])} Wh de la regresión lineal, porque captura relaciones no lineales, como el cambio del consumo según la hora y el día.`,
        }
      : {
          titulo: 'No supera a la regresión lineal',
          texto: `En el set de prueba la red tiene un MAE de ${fmt(red['MAE (Wh)'])} Wh contra ${fmt(lin['MAE (Wh)'])} Wh de la regresión lineal. Con estas 6 variables hay poca relación no lineal que aprovechar.`,
        },
    {
      titulo: `Limitaciones: R² de ${fmt(red['R²'], 3)}`,
      texto: `Con solo 6 variables de tiempo y clima exterior el modelo explica cerca del ${fmt(red['R²'] * 100, 0)} % de la variación del consumo. El consumo depende sobre todo de lo que hacen las personas (cuándo cocinan, lavan, etc.), que no está en los datos, y tiene picos muy altos e impredecibles. Las expectativas iniciales de un R² cercano a 0.92 no eran realistas con estas variables.`,
    },
    {
      titulo: 'Mejoras posibles',
      texto: 'Agregar el consumo de los registros anteriores (lags), codificar la hora de forma cíclica (seno/coseno), usar las temperaturas y humedades interiores del dataset, entrenar con mini-batches o con el optimizador Adam y aplicar early stopping con el set de validación.',
    },
  ]

  return (
    <Seccion id="conclusiones" numero="08" titulo="Conclusiones">
      <ol className="space-y-4">
        {puntos.map((p, i) => (
          <li key={p.titulo} className="tarjeta flex gap-4 p-6">
            <span className="font-mono text-sm font-semibold text-[var(--series-1)]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-semibold">{p.titulo}</h3>
              <p className="texto-2 mt-1">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="texto-3 mt-8 text-sm">
        Código completo:{' '}
        <a className="text-[var(--series-1)] underline underline-offset-2"
          href="https://github.com/RAULHNZA/proyecto-red-neuronal" target="_blank" rel="noreferrer">
          github.com/RAULHNZA/proyecto-red-neuronal
        </a>
      </p>
    </Seccion>
  )
}
