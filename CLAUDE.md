# Red Neuronal Multicapa: predicción de consumo energético

Proyecto final de **Seminario de Sistemas II** de Raúl Hernández Nuñez (matrícula 2173770, carrera IAS, grupo 002). Es una red neuronal multicapa **programada desde cero con NumPy** que predice el consumo eléctrico de electrodomésticos de un edificio. Después se muestra en una página web hecha con React.

## Lee esto primero

- [docs/PLAN.md](docs/PLAN.md): qué está hecho, qué falta y la bitácora. **Actualiza la tabla de estado y la bitácora cada vez que termines algo.**
- [docs/INSTALACION.md](docs/INSTALACION.md): cómo instalar el entorno, conseguir los datos y correr cada parte.

**Siguiente paso:** ver la lista "Dónde nos quedamos" al inicio de `docs/PLAN.md` (revisión del rediseño, `git push` pendiente, Vercel, kWh en la presentación y requisitos de entrega). Fases 1, 2 y 3 hechas con resultados reales (R² test 0.159). El repo es **público**: https://github.com/RAULHNZA/proyecto-red-neuronal. **Para correr el notebook usa GitHub Actions** (`gh workflow run notebook.yml` o un push que cambie el notebook; luego `gh run download <id> -n resultados`). En la laptop no se puede porque Windows bloquea pandas; numpy y Pillow sí funcionan en `.venv`.

## Estructura

```
notebooks/red_neuronal.ipynb   Notebook principal (33 celdas, 7 secciones), guardado con salidas. Es la fuente de la verdad del modelo.
docs/PLAN.md                   Plan por fases, estado y bitácora
docs/INSTALACION.md            Instalación, datos y problemas conocidos
docs/GUIA_PASO_A_PASO.md       Instrucciones con cada clic para Raúl (Colab y luego Vercel)
requirements.txt               Librerías de Python
resultados/                    Lo genera el notebook (corrida de Actions): PNGs, metricas.txt y resultados.json
.github/workflows/notebook.yml Corre el notebook en GitHub Actions y guarda los resultados como artefacto
codigo/red_neuronal.py         La clase NeuralNetwork como script (copia de la celda cell-12)
codigo/extraer_resultados.py   Saca resultados/ de las salidas guardadas del notebook (para cuando corre en Colab)
README.md                      Para GitHub; las métricas siguen pendientes
web/                           Página en React + Vite + Recharts + Tailwind; lee web/src/data/resultados.json
datos/                         (opcional, no se sube a git) energydata_complete.csv
```

## Especificación del modelo (no cambiar sin preguntarle a Raúl)

- **Restricción principal:** desde cero. Prohibido usar TensorFlow, Keras o PyTorch. scikit-learn se usa **solo** para la regresión lineal de comparación y para comprobar las métricas.
- Arquitectura `[6, 16, 8, 1]`: ReLU en las capas ocultas y salida lineal. Loss MSE, backpropagation manual y gradient descent con batch completo.
- Learning rate 0.01, 5000 épocas, semilla 42.
- Entradas: `hour`, `dayofweek`, `is_weekend`, `month` (derivadas de `date`), `T_out` y `RH_out`. Target: `Appliances`, en **Wh** (no kWh).
- División aleatoria 70/15/15. Normalización z-score calculada **solo con train**. Las predicciones se desnormalizan para reportar en Wh.
- Métricas MAE, RMSE y R², implementadas a mano y comparadas contra `LinearRegression`.
- **Inicialización He por defecto.** El plan original pedía `Normal(0, 0.01)`, pero se comprobó que con ella la red no aprende (loss ≈ 1.0). El notebook entrena ambas versiones para justificar el cambio. Raúl ya está enterado.

## Decisiones y advertencias

- Los documentos originales de Drive prometen un R² de alrededor de 0.92 ("90 % de precisión"). **Eso no es realista** con estas 6 variables: espera un R² menor a 0.4. Raúl ya lo sabe. Reporta los números reales con honestidad, no los maquilles.
- Datos: `fetch_ucirepo(id=374).data.original`, con respaldos (ver INSTALACION.md §3). Se usa `.data.original` porque hace falta la columna `date`.
- La presentación usa kWh en la diapositiva de arquitectura; lo correcto es Wh.
- **Diseño de la web (2026-10-21):** tema claro único, minimalista y tecnológico, con animaciones que nunca tapan el texto (Raúl lo pidió así; no quiere fondo negro). Todas las animaciones respetan `prefers-reduced-motion`. Ojo: el Windows de Raúl tiene apagados los efectos de animación, así que en su PC la página se ve sin movimiento; para capturas usa Chrome con `--force-prefers-no-reduced-motion`.
- `resultados.json` es el contrato entre el notebook y la página web. Su formato está en PLAN.md (Fase 3). Si cambias la celda que lo genera, actualiza también la web.
- El notebook se editó como JSON. Para cambiarlo, usa una herramienta de edición de notebooks y conserva los ids de las celdas.

## Contexto original

El contexto completo vive en el Google Drive personal de Raúl, carpeta **"Red Neuronal - Seminario"**:
- `Contexto_Completo_Proyecto_Red_Neuronal`: especificación técnica y estructura del código.
- `Informacion_Proyecto_Red_Neuronal_Transcripcion`: plan original y herramientas.
- `Act-5_2173770_presentacion.pptx` y `Presentacion_Actividad5_ConsumoEnergia`: presentación ya expuesta. Sirven como fuente del texto de la página: el problema (30 % de la energía mundial y 27 % del CO₂ vienen de edificios) y el impacto (ODS 7 y 13).
- `GUIÓN POR SLIDE.docx`: guion de 5 minutos de la presentación.

## Cómo trabajar con Raúl

- Escríbele en español, con palabras sencillas.
- **Documenta todo en automático, sin que te lo pida.** Cada cosa que hagas va a la bitácora y a la tabla de estado de `docs/PLAN.md` (con fecha), y si cambia cómo se hace algo, a la guía que corresponda en `docs/`. Todo se queda dentro de este proyecto.
- **No des nada por sabido.** Raúl no sabe usar Colab ni herramientas técnicas. Haz tú todo lo que se pueda hacer desde la computadora. Cuando él tenga que hacer algo, dale pasos numerados y cortos: dónde hacer clic y qué debe ver. Las guías para él están en `docs/GUIA_PASO_A_PASO.md`.
- Esta computadora (`C:\Users\crule`) es **personal**: se puede instalar y descargar sin preguntar. Subir a GitHub o publicar en Vercel sí se le pregunta antes.
- Si estás en una **computadora de la empresa**, no hagas túneles (`ngrok`, `cloudflared`), no expongas servidores fuera de `localhost` y pregunta antes de `npm install`, `git push`, publicar en Vercel o cualquier descarga. El 05-oct-2026 un túnel generó una alerta de ciberseguridad a su nombre. Ver INSTALACION.md §6.
- Al terminar, detén los servidores que hayas iniciado (`npm run dev`).
