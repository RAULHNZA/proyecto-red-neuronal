import { useEffect, useRef } from 'react'
import { reducirMovimiento } from '../hooks.js'

const DISTANCIA = 150 // px: a menos de esto, dos neuronas se conectan

// Fondo animado: neuronas que flotan y se conectan. De vez en cuando una señal
// viaja por una conexión. Va detrás de todo, muy tenue, y un velo lo aclara
// en la columna del texto para que nunca estorbe la lectura.
export default function FondoRed() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const quieto = reducirMovimiento()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let ancho, alto, nodos, raf
    let senales = []

    function iniciar() {
      ancho = window.innerWidth
      alto = window.innerHeight
      canvas.width = ancho * dpr
      canvas.height = alto * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(95, (ancho * alto) / 15000))
      nodos = Array.from({ length: n }, () => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1.3 + Math.random() * 1.7,
      }))
      senales = []
    }

    function vecinos(i) {
      const a = nodos[i]
      return nodos
        .map((b, j) => j)
        .filter((j) => j !== i && Math.hypot(nodos[j].x - a.x, nodos[j].y - a.y) < DISTANCIA)
    }

    function cuadro() {
      ctx.clearRect(0, 0, ancho, alto)

      if (!quieto) {
        for (const p of nodos) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > ancho) p.vx *= -1
          if (p.y < 0 || p.y > alto) p.vy *= -1
        }
      }

      // Conexiones: más visibles mientras más cerca estén
      ctx.lineWidth = 1
      for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
          const d = Math.hypot(nodos[i].x - nodos[j].x, nodos[i].y - nodos[j].y)
          if (d < DISTANCIA) {
            ctx.strokeStyle = `rgba(42, 120, 214, ${(1 - d / DISTANCIA) * 0.28})`
            ctx.beginPath()
            ctx.moveTo(nodos[i].x, nodos[i].y)
            ctx.lineTo(nodos[j].x, nodos[j].y)
            ctx.stroke()
          }
        }
      }

      // Neuronas
      ctx.fillStyle = 'rgba(42, 120, 214, 0.45)'
      for (const p of nodos) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Señales que viajan de una neurona a otra
      if (!quieto) {
        if (senales.length < 7 && Math.random() < 0.05) {
          const i = Math.floor(Math.random() * nodos.length)
          const v = vecinos(i)
          if (v.length) senales.push({ a: i, b: v[Math.floor(Math.random() * v.length)], t: 0 })
        }
        senales = senales.filter((s) => s.t < 1)
        for (const s of senales) {
          s.t += 0.018
          const a = nodos[s.a]
          const b = nodos[s.b]
          const x = a.x + (b.x - a.x) * s.t
          const y = a.y + (b.y - a.y) * s.t
          const brillo = ctx.createRadialGradient(x, y, 0, x, y, 9)
          brillo.addColorStop(0, 'rgba(98, 80, 214, 0.55)')
          brillo.addColorStop(1, 'rgba(98, 80, 214, 0)')
          ctx.fillStyle = brillo
          ctx.beginPath()
          ctx.arc(x, y, 9, 0, Math.PI * 2)
          ctx.fill()
        }
        raf = requestAnimationFrame(cuadro)
      }
    }

    function alCambiarTamano() {
      iniciar()
      if (quieto) cuadro()
    }

    // Pausa cuando la pestaña no se ve, para no gastar batería
    function alCambiarVisibilidad() {
      cancelAnimationFrame(raf)
      if (!document.hidden && !quieto) raf = requestAnimationFrame(cuadro)
    }

    iniciar()
    cuadro()
    window.addEventListener('resize', alCambiarTamano)
    document.addEventListener('visibilitychange', alCambiarVisibilidad)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', alCambiarTamano)
      document.removeEventListener('visibilitychange', alCambiarVisibilidad)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={ref} className="h-full w-full" />
      {/* Velo: aclara el centro, donde va el texto, y deja ver la red a los lados */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgb(245 248 252 / 0.15) 0%, rgb(245 248 252 / 0.82) 22%, rgb(245 248 252 / 0.88) 50%, rgb(245 248 252 / 0.82) 78%, rgb(245 248 252 / 0.15) 100%)',
        }}
      />
    </div>
  )
}
