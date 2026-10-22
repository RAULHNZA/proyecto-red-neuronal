import { useEnVista } from '../hooks.js'

// Hace que su contenido aparezca suavemente cuando llega a la pantalla
export default function Revelar({ children, retraso = 0, className = '' }) {
  const [ref, visible] = useEnVista()
  return (
    <div
      ref={ref}
      className={`revelar ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      {children}
    </div>
  )
}
