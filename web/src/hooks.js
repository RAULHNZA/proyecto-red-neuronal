import { useEffect, useRef, useState } from 'react'

// Avisa (una sola vez) cuando el elemento entra a la pantalla
export function useEnVista(margen = '0px 0px -12% 0px') {
  const ref = useRef(null)
  // Sin IntersectionObserver (navegadores muy viejos) se muestra todo de inmediato
  const [visible, setVisible] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: margen },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [margen, visible])

  return [ref, visible]
}

export const reducirMovimiento = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
