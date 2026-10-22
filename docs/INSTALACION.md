# Instalación y datos

Cómo preparar el entorno, conseguir el dataset y correr cada parte del proyecto en una computadora nueva. Para saber qué falta por hacer, ver [PLAN.md](PLAN.md).

**Camino más corto:** Google Colab no requiere instalar nada (sección 1). Solo la página de React necesita Node.js en la computadora (sección 4).

---

## 1. Opción A: Google Colab (recomendada, sin instalar nada)

1. Entra a https://colab.research.google.com.
2. Ve a *File → Upload notebook* y sube `notebooks/red_neuronal.ipynb`.
3. *Runtime → Run all*.

La primera celda de código instala `ucimlrepo` con `!pip install -q ucimlrepo`. Colab ya trae numpy, pandas, matplotlib y scikit-learn.

---

## 2. Opción B: correr el notebook en local

### Requisitos

| Herramienta | Versión | Para qué |
|---|---|---|
| Python | 3.10 o más reciente | Correr el notebook |
| pip | La que viene con Python | Instalar librerías |
| VS Code + extensión Jupyter, o JupyterLab | Cualquiera reciente | Abrir el `.ipynb` |

### Pasos (desde la raíz del proyecto)

**Windows (PowerShell):**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**macOS / Linux:**

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Después abre `notebooks/red_neuronal.ipynb` en VS Code, elige el kernel `.venv` y ejecuta todo. También puedes usar `jupyter lab` y abrirlo desde el navegador.

`requirements.txt` instala numpy, pandas, matplotlib, scikit-learn, ucimlrepo y jupyter.

**Ojo con la carpeta de trabajo:** el notebook guarda `resultados/` en la carpeta desde donde se ejecuta. En VS Code suele ser `notebooks/`, así que los resultados quedan en `notebooks/resultados/`; muévelos a la raíz `resultados/` al terminar.

---

## 3. Los datos

**Dataset:** UCI *Appliances Energy Prediction*, id 374 (https://archive.ics.uci.edu/dataset/374/appliances+energy+prediction).

- 19,735 registros, uno cada 10 minutos, de enero a mayo de 2016, de una casa en Bélgica.
- 29 columnas. El proyecto usa solo estas:

| Columna del CSV | Uso en el proyecto |
|---|---|
| `date` | De aquí se derivan `hour`, `dayofweek`, `is_weekend` y `month` |
| `T_out` | Entrada: temperatura exterior (°C) |
| `RH_out` | Entrada: humedad exterior (%) |
| `Appliances` | **Target:** consumo en Wh |

### Cómo carga el notebook los datos

La función `cargar_dataset()` prueba en este orden y usa el primero que funcione:

1. **Archivo local:** `energydata_complete.csv` en la carpeta de trabajo o en `datos/energydata_complete.csv`.
2. **ucimlrepo**, el método oficial de UCI:
   ```python
   from ucimlrepo import fetch_ucirepo
   appliances_energy_prediction = fetch_ucirepo(id=374)
   df = appliances_energy_prediction.data.original   # todas las columnas, incluida `date`
   ```
   Se usa `.data.original` en vez de `.data.features` y `.data.targets` porque hace falta la columna `date`.
3. **URL directa del CSV:** https://archive.ics.uci.edu/ml/machine-learning-databases/00374/energydata_complete.csv
4. **ZIP oficial:** https://archive.ics.uci.edu/static/public/374/appliances+energy+prediction.zip
5. **Subir el archivo a mano** (solo funciona en Colab).

**Nota:** el código de ejemplo de la página de UCI aparece traducido al español si el navegador traduce la página (`obtener_ucirepo`, `datos.características_...`). Esa versión no funciona. Los nombres reales están en inglés, como en el bloque de arriba.

Para trabajar sin internet, descarga el CSV una vez y guárdalo en `datos/energydata_complete.csv` (unos 12 MB). No lo subas a GitHub.

---

## 4. Página web (React)

### Requisitos

| Herramienta | Versión |
|---|---|
| Node.js | 22 LTS (Vite pide 20.19 o más) |
| npm | La que viene con Node |

Comprueba las versiones con `node -v` y `npm -v`.

### Crear el proyecto (solo la primera vez)

Desde la raíz del proyecto:

```bash
npm create vite@latest web -- --template react
cd web
npm install
npm install recharts
npm install tailwindcss @tailwindcss/vite
```

Para configurar Tailwind (v4):

`web/vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

`web/src/index.css`: reemplaza todo su contenido por:

```css
@import "tailwindcss";
```

Luego copia los datos del notebook:

```bash
mkdir -p src/data
cp ../resultados/resultados.json src/data/resultados.json
```

### Comandos del día a día (dentro de `web/`)

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias (después de clonar el repo) |
| `npm run dev` | Servidor local en http://localhost:5173 |
| `npm run build` | Genera la versión final en `web/dist/` |
| `npm run preview` | Sirve `dist/` para revisarla antes de publicar |

Cierra `npm run dev` con Ctrl+C al terminar.

---

## 5. Problemas conocidos

| Síntoma | Causa | Solución |
|---|---|---|
| `fetch_ucirepo` falla | Sin internet o la API de UCI está caída | El notebook pasa solo a la siguiente opción; o pon el CSV en `datos/` |
| `ModuleNotFoundError: sklearn` en local | Falta instalar las librerías | `pip install -r requirements.txt` con el `.venv` activado |
| `UnicodeEncodeError` con los emojis ✅ al correr el código como script en la consola de Windows | La consola usa cp1252 | No pasa en Jupyter ni en Colab; en consola usa `set PYTHONIOENCODING=utf-8` |
| La red con `init="small"` no aprende (loss ≈ 1.0) | Comportamiento esperado: pesos `Normal(0, 0.01)` muy pequeños | Por eso la red principal usa `init="he"`; el notebook lo muestra a propósito |
| Entrenamiento lento (unos 40 s por red en una laptop) | 5000 épocas con batch completo de 13,814 filas | Normal; en Colab tarda algo parecido |
| R² bajo (menor a 0.4) | Las 6 variables no explican el comportamiento humano | Es esperado; se explica en las conclusiones |

---

## 6. Si migras desde la computadora del trabajo

En la computadora original (de la empresa) había reglas de ciberseguridad. Si el proyecto vuelve a correr en una PC corporativa, aplícalas:

- No crear túneles (`ngrok`, `cloudflared`, etc.) ni exponer servidores fuera de `localhost`.
- Preguntar antes de cualquier `npm install`, `git push` o publicación en Vercel desde esa PC.
- Si un dominio no resuelve o algo no conecta, no buscar cómo saltarse el bloqueo: consultar con TI.

En una computadora personal estas restricciones no aplican.
