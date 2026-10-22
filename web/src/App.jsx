import resultados from './data/resultados.json'
import Hero from './components/Hero.jsx'
import Problema from './components/Problema.jsx'
import Datos from './components/Datos.jsx'
import Arquitectura from './components/Arquitectura.jsx'
import GraficaLoss from './components/GraficaLoss.jsx'
import GraficaPrediccion from './components/GraficaPrediccion.jsx'
import Metricas from './components/Metricas.jsx'
import Comparacion from './components/Comparacion.jsx'
import Conclusiones from './components/Conclusiones.jsx'

export default function App() {
  return (
    <>
      {resultados.ejemplo && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">
          Datos de ejemplo: todavía no son los resultados reales del notebook.
        </div>
      )}
      <Hero />
      <main className="mx-auto max-w-5xl space-y-16 px-4 pb-20 sm:px-6">
        <Problema />
        <Datos />
        <Arquitectura datos={resultados} />
        <GraficaLoss loss={resultados.loss} />
        <GraficaPrediccion puntos={resultados.prediccion_vs_real} />
        <Metricas metricas={resultados.metricas.red_neuronal} />
        <Comparacion metricas={resultados.metricas} />
        <Conclusiones metricas={resultados.metricas} />
      </main>
      <footer className="texto-3 border-t border-[var(--border)] px-4 py-6 text-center text-sm">
        Raúl Hernández Nuñez · 2173770 · Seminario de Sistemas II · 2026
      </footer>
    </>
  )
}
