# Plan de trabajo: red neuronal y página web

Última actualización: 2026-10-21

**Siguiente paso: la Fase 1.** Raúl corre `notebooks/red_neuronal.ipynb` en VS Code con la extensión de Colab (kernel remoto) siguiendo [GUIA_PASO_A_PASO.md](GUIA_PASO_A_PASO.md), Parte 1, Opción A, y guarda con Ctrl+S. Después Claude corre `python codigo/extraer_resultados.py`, que saca `resultados/` de las salidas del notebook y copia el JSON a la web. La página de React ya está hecha con datos de ejemplo; solo falta cambiarle el JSON por el real.

Proyecto final de **Seminario de Sistemas II**: Raúl Hernández Nuñez, matrícula 2173770, carrera IAS, grupo 002. Para instalar el entorno, ver [INSTALACION.md](INSTALACION.md).

---

## Estado actual

| Pieza | Estado | Dónde |
|---|---|---|
| Contexto del proyecto y guion | ✅ Hecho | Google Drive, carpeta "Red Neuronal - Seminario" (ver `CLAUDE.md`) |
| Presentación Act-5 | ✅ Hecha y presentada | Drive: `Act-5_2173770_presentacion.pptx` |
| Notebook de la red neuronal | ✅ Hecho; probado solo con datos sintéticos | `notebooks/red_neuronal.ipynb` |
| Resultados reales (gráficas, métricas, `resultados.json`) | ⏳ Pendiente (Fase 1) | `resultados/`, todavía no existe |
| Ajustar las conclusiones del notebook a los números reales | ⏳ Pendiente (Fase 1) | Última celda del notebook |
| `codigo/red_neuronal.py` y `README.md` | ✅ Hechos; al README le faltan las métricas reales | `codigo/`, `README.md` |
| Repositorio en GitHub | ⏳ Pendiente (Fase 2) | — |
| Página web en React | ✅ Hecha con datos de ejemplo; falta poner el `resultados.json` real | `web/` |
| Página publicada en Vercel | ⏳ Pendiente (Fase 4) | — |

El flujo completo es una línea:

```
Google Colab ──resultados/──▶ GitHub ──resultados.json──▶ React (web/) ──código──▶ Vercel
  Fase 1                       Fase 2                       Fase 3                   Fase 4
  entrena la red               guarda el código             dibuja las gráficas      publica la página
```

---

## Fase 1: correr el notebook (empieza aquí)

Al terminar esta fase tienes tus métricas reales y la carpeta `resultados/` con todo lo que necesita la página web. Toma unos 30 minutos.

1. Abre el notebook. Hay dos formas (en la laptop de Raúl solo sirve Colab; ver la bitácora del 2026-10-21):
   - **En Colab (recomendado):** entra a [colab.research.google.com](https://colab.research.google.com), ve a *File → Upload notebook* y sube `notebooks/red_neuronal.ipynb`.
   - **En local:** sigue [INSTALACION.md](INSTALACION.md).
2. Si ya tienes el CSV de UCI, ponlo junto al notebook o en `datos/energydata_complete.csv`. Si no, el notebook lo descarga solo con `ucimlrepo`.
3. Ve a *Runtime → Run all* (en Colab) y espera unos 2 minutos. Se entrenan dos redes de 5000 épocas.
4. Revisa que salga todo esto:
   - El *gradient check* dice "backprop correcto".
   - La curva de la Gráfica 1 (loss vs épocas) baja.
   - La red tiene menor MAE que la regresión lineal.
5. En Colab, `resultados.zip` se descarga solo: lo hace la penúltima celda del notebook (agregada el 2026-10-21).
6. Anota tus métricas de test (MAE, RMSE, R²) en la tabla de "Resultados reales" que está abajo.
7. Corrige la celda de **Conclusiones** del notebook para que coincida con los números reales.
8. Guarda el notebook con sus salidas (*File → Download → Download .ipynb*) y reemplaza el de `notebooks/`.

Lo que debe quedar en `resultados/`:

| Archivo | Para qué sirve |
|---|---|
| `grafica_loss.png` | Loss vs épocas: README y entrega |
| `grafica_prediccion.png` | Predicción vs real: README y entrega |
| `grafica_comparacion.png` | Red neuronal vs regresión lineal |
| `metricas.txt` | Tabla de métricas en texto |
| `resultados.json` | Datos que lee la página de React |

**Expectativa realista:** el R² de test probablemente quedará por debajo de 0.4. Con solo 6 variables de tiempo y clima es normal, porque el consumo depende del comportamiento de las personas, que no está en los datos. Los documentos originales prometían un R² de 0.92; hay que explicar la diferencia en las conclusiones, no esconderla.

### Resultados reales (llenar al terminar la Fase 1)

| Modelo | MAE test (Wh) | RMSE test (Wh) | R² test |
|---|---|---|---|
| Red neuronal [6, 16, 8, 1] | _pendiente_ | _pendiente_ | _pendiente_ |
| Regresión lineal | _pendiente_ | _pendiente_ | _pendiente_ |

---

## Fase 2: subir el proyecto a GitHub

GitHub guarda el código y es lo que Vercel lee para publicar la página.

1. Crea una cuenta en [github.com](https://github.com) si no tienes.
2. Crea un repositorio público llamado `proyecto-red-neuronal`.
3. Usa esta estructura de carpetas:
   ```
   proyecto-red-neuronal/
   ├── notebooks/red_neuronal.ipynb   (con salidas)
   ├── codigo/red_neuronal.py         (la clase NeuralNetwork sola)
   ├── resultados/                    (lo que salió de la Fase 1)
   ├── web/                           (página de React, Fase 3)
   ├── docs/                          (este plan y la instalación)
   ├── requirements.txt
   └── README.md
   ```
4. **No subas el CSV del dataset.** Pesa unos 12 MB y el notebook lo descarga solo; en el README basta con el enlace a UCI. Agrega `datos/` al `.gitignore`.
5. El README debe tener: qué es el proyecto, la arquitectura 6→16→8→1, cómo correr el notebook, las dos gráficas, la tabla de métricas y el enlace a la página de Vercel.
6. Sube todo con `git push`, o arrastrando los archivos en GitHub (*Add file → Upload files*).

Pendiente de generar: `codigo/red_neuronal.py` (la clase `NeuralNetwork` copiada del notebook) y `README.md` (con las métricas reales).

---

## Fase 3: construir la página web en React

La página **no entrena** la red: lee `resultados.json` y lo dibuja con gráficas interactivas. Por eso necesita la Fase 1 terminada.

**Herramientas:** React con [Vite](https://vite.dev) (no uses `create-react-app`, ya está descontinuado), [Recharts](https://recharts.org) para las gráficas y [Tailwind CSS](https://tailwindcss.com) para los estilos.

1. Crea el proyecto dentro de `web/` con los comandos de [INSTALACION.md](INSTALACION.md#4-página-web-react).
2. Copia `resultados/resultados.json` a `web/src/data/resultados.json`.
3. Construye un componente por sección, en este orden:

| Sección | Componente | Qué muestra | Datos |
|---|---|---|---|
| Portada | `Hero.jsx` | Título, nombre, materia, matrícula | Texto fijo |
| El problema | `Problema.jsx` | 30 % de la energía mundial y 27 % del CO₂ vienen de edificios; impacto | Texto fijo (de la presentación) |
| Los datos | `Datos.jsx` | Dataset UCI, 19,735 registros, 6 variables, división 70/15/15 | Texto fijo |
| Arquitectura | `Arquitectura.jsx` | Diagrama 6 → 16 (ReLU) → 8 (ReLU) → 1 (lineal) | SVG |
| Entrenamiento | `GraficaLoss.jsx` | Loss de train y val por época (`LineChart`) | `resultados.json` → `loss` |
| Predicciones | `GraficaPrediccion.jsx` | Predicción vs real con la línea y = x (`ScatterChart`) | `resultados.json` → `prediccion_vs_real` |
| Métricas | `Metricas.jsx` | MAE, RMSE y R² en train, val y test | `resultados.json` → `metricas.red_neuronal` |
| Comparación | `Comparacion.jsx` | Barras de red vs regresión lineal (`BarChart`) | `resultados.json` → `metricas` |
| Conclusiones | `Conclusiones.jsx` | Lo aprendido, limitaciones y mejoras | Texto (del notebook) |

4. Ve la página en local con `npm run dev` → http://localhost:5173
5. Revísala en vista de celular (herramientas de desarrollador del navegador).
6. Antes de publicar, prueba `npm run build` y `npm run preview`.

### Formato de `resultados.json` (lo genera la última celda de código del notebook)

```json
{
  "arquitectura": [6, 16, 8, 1],
  "hiperparametros": {"learning_rate": 0.01, "epochs": 5000, "init": "he"},
  "metricas": {
    "red_neuronal": {
      "Entrenamiento": {"MAE (Wh)": 0.0, "RMSE (Wh)": 0.0, "R²": 0.0},
      "Validación":    {"MAE (Wh)": 0.0, "RMSE (Wh)": 0.0, "R²": 0.0},
      "Prueba":        {"MAE (Wh)": 0.0, "RMSE (Wh)": 0.0, "R²": 0.0}
    },
    "regresion_lineal_test": {"MAE (Wh)": 0.0, "RMSE (Wh)": 0.0, "R²": 0.0}
  },
  "loss": [{"epoca": 1, "train": 0.0, "val": 0.0}, "... 500 puntos (1 de cada 10 épocas)"],
  "prediccion_vs_real": [{"real": 0.0, "prediccion": 0.0}, "... 500 puntos al azar del test"]
}
```

La página acepta además una clave opcional `"ejemplo": true`, que solo tiene el JSON de ejemplo de `web/src/data/`. Si existe, la página muestra un aviso amarillo de "Datos de ejemplo". El notebook no la genera, así que al copiar el JSON real el aviso desaparece solo.

Nota: algunas claves tienen espacios, acentos o símbolos (`"MAE (Wh)"`, `"R²"`, `"Validación"`). En JavaScript se leen con corchetes: `m["R²"]`.

---

## Fase 4: publicar en Vercel

1. Entra a [vercel.com](https://vercel.com) con la cuenta de GitHub (plan Hobby, gratis).
2. Ve a *Add New → Project* y elige el repositorio `proyecto-red-neuronal`.
3. En **Root Directory** pon `web`.
4. Vercel detecta Vite solo: el build command es `npm run build` y el output directory es `dist`.
5. Haz clic en *Deploy*. Te da una dirección como `proyecto-red-neuronal.vercel.app`.
6. Ábrela en el celular y en otra computadora.
7. Pon la dirección en el README.

Cada push a GitHub vuelve a publicar la página automáticamente.

---

## Fase 5: lista final de entrega

- [ ] El notebook corre completo con *Run all* y sin errores
- [ ] El gradient check dice "backprop correcto"
- [ ] La Gráfica 1 (loss vs épocas) muestra una curva que baja
- [ ] La Gráfica 2 (predicción vs real) tiene la línea y = x
- [ ] MAE, RMSE y R² de test anotados en la tabla de arriba
- [ ] La red tiene menor MAE que la regresión lineal
- [ ] Las conclusiones del notebook coinciden con los números reales
- [ ] Las unidades dicen **Wh** en todos lados (la presentación dice kWh en la diapositiva de arquitectura)
- [ ] Repositorio en GitHub con la estructura de carpetas y el README
- [ ] Página publicada en Vercel y probada en el celular
- [ ] Enlace de la página en el README

---

## Bitácora (lo que ya se hizo)

| Fecha | Qué se hizo |
|---|---|
| 2026-10-07 | Presentación Act-5 y guion por slide (en Drive) |
| 2026-10-09 | Se leyó todo el contexto de Drive y se generó `notebooks/red_neuronal.ipynb` (32 celdas) |
| 2026-10-09 | El notebook se probó de punta a punta con datos sintéticos de la misma forma que el CSV de UCI: todas las celdas corren y el gradient check da 4.3e-11 |
| 2026-10-09 | Se comprobó que la inicialización `Normal(0, 0.01)` del plan original no aprende (loss ≈ 1.0, igual a predecir el promedio). Se cambió a inicialización He por defecto; el notebook entrena ambas para justificarlo |
| 2026-10-09 | Se agregó `ucimlrepo` (`fetch_ucirepo(id=374)`) como forma principal de cargar los datos, con respaldos: CSV local → ucimlrepo → URL directa → ZIP → subir a mano en Colab |
| 2026-10-09 | Se escribieron este plan, `INSTALACION.md`, `CLAUDE.md` y `requirements.txt` para migrar el proyecto a otra computadora |
| 2026-10-21 | Se creó `codigo/red_neuronal.py` (la clase del notebook más una prueba rápida), `README.md` (con métricas pendientes) y `.gitignore` |
| 2026-10-21 | Se construyó la página en `web/` (Vite 8, React 19, Recharts 3, Tailwind 4) con los 9 componentes de la Fase 3, modo claro/oscuro y vista de celular revisada. Usa un `resultados.json` de ejemplo marcado con `"ejemplo": true` hasta tener el real |
| 2026-10-21 | Se intentó correr el notebook en local: se creó `.venv` y se instaló `requirements.txt`, pero Windows bloquea una DLL de pandas (*"Una directiva de Control de aplicaciones bloqueó este archivo"*, probablemente Control inteligente de aplicaciones). No se intentó saltar el bloqueo. Decisión: la Fase 1 se corre en Colab |
| 2026-10-21 | Se agregó al notebook una celda (antes de Conclusiones) que en Colab descarga `resultados.zip` sola; fuera de Colab no hace nada. El notebook queda con 33 celdas |
| 2026-10-21 | Se escribió `docs/GUIA_PASO_A_PASO.md`: instrucciones con cada clic para correr el notebook en Colab. Raúl no conoce Colab, así que las guías para él no dan nada por sabido |
| 2026-10-21 | Raúl preguntó si Claude puede correr Colab por él. Sí: con la extensión Claude para Chrome (ya instalada) conectada con `/chrome` → "Enabled by default". Falta que Raúl la active y abra un chat nuevo. La extensión Google Colab de VS Code no sirve para esto (se maneja solo con clics en VS Code). Pasos en GUIA_PASO_A_PASO.md |
| 2026-10-21 | Se revisó a fondo la extensión Google Colab de VS Code (`google.colab` 0.9.7). Es un proveedor de kernel: el notebook abierto en VS Code se ejecuta en un servidor de Colab. No tiene API ni comandos que Claude pueda usar (su único servidor local es para el login de Google), así que Raúl tiene que conectarla (Seleccionar kernel → Colab → Auto Connect) y darle Ejecutar todo. Ventaja: las salidas quedan en el `.ipynb` local y no hay que descargar nada. Se volvió la opción recomendada |
| 2026-10-21 | Con el kernel de Colab, los archivos de `resultados/` se crean en el servidor y no en la PC. Por eso la penúltima celda del notebook ahora muestra las 3 PNG e imprime `metricas.txt` y `resultados.json` entre marcas (`=== ARCHIVO ... ===`, `=== FIN ===`), y se creó `codigo/extraer_resultados.py` (solo biblioteca estándar) para reconstruir `resultados/` y copiar el JSON a `web/src/data/`. Se probó con un notebook simulado |
| 2026-10-21 | Primera corrida real con la extensión de Colab en VS Code: los datos se descargaron con `ucimlrepo`, pero la celda `cell-08` falló con `DateParseError` porque `ucimlrepo` trae la fecha pegada a la hora (`2016-01-1117:00:00`). Se corrigió agregando el espacio con una expresión regular antes de `pd.to_datetime` |
| 2026-10-21 | Se agregó `.vscode/settings.json` que apaga el corrector de ortografía (cSpell) en el proyecto: estaba en inglés y marcaba todo el español. Los avisos de Pylance sobre `google.colab` e `IPython` son normales (Pylance revisa con el Python de la PC, pero el notebook corre en Colab) |
