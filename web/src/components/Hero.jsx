export default function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24">
      <p className="text-sm font-medium tracking-wide text-[var(--series-1)] uppercase">
        Proyecto final · Seminario de Sistemas II
      </p>
      <h1 className="mt-3 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
        Red neuronal multicapa para predecir el consumo de energía
      </h1>
      <p className="texto-2 mt-5 max-w-2xl text-lg">
        Una red neuronal programada desde cero con NumPy, sin TensorFlow, Keras ni PyTorch,
        que predice cuánta electricidad usan los electrodomésticos de una casa a partir de la
        hora, el día y el clima.
      </p>
      <dl className="texto-2 mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        <div><dt className="texto-3 inline">Autor: </dt><dd className="inline font-medium text-[var(--text-primary)]">Raúl Hernández Nuñez</dd></div>
        <div><dt className="texto-3 inline">Matrícula: </dt><dd className="inline">2173770</dd></div>
        <div><dt className="texto-3 inline">Carrera: </dt><dd className="inline">IAS · Grupo 002</dd></div>
      </dl>
    </header>
  )
}
