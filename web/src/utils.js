// Formato de números en español (separador de miles con coma, como en el notebook)
export const fmt = (v, dec = 1) =>
  Number(v).toLocaleString('es-MX', { minimumFractionDigits: dec, maximumFractionDigits: dec })

// Estilo común de los ejes de Recharts
export const ejes = {
  stroke: 'var(--border)',
  tick: { fill: 'var(--text-muted)', fontSize: 12 },
  tickLine: false,
}
