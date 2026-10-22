import { useEffect, useState } from 'react'
import { reducirMovimiento, useEnVista } from '../hooks.js'
import { fmt } from '../utils.js'

// Número que cuenta desde 0 hasta su valor cuando aparece en pantalla
export default function Contador({ valor, dec = 0, sufijo = '' }) {
  const [ref, visible] = useEnVista()
  const [actual, setActual] = useState(0)
  const quieto = reducirMovimiento()

  useEffect(() => {
    if (!visible || quieto) return
    let raf
    const inicio = performance.now()
    const duracion = 1400
    const paso = (t) => {
      const p = Math.min(1, (t - inicio) / duracion)
      setActual(valor * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(paso)
    }
    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [visible, valor, quieto])

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(quieto ? valor : actual, dec)}
      {sufijo}
    </span>
  )
}
