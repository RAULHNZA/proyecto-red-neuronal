# Guía paso a paso (para Raúl)

Aquí están, con cada clic, las cosas que tienes que hacer tú. Todo lo demás lo hace Claude.
Si algo no se ve igual que aquí, toma una captura de pantalla y pásasela a Claude.

---

## Parte 1: entrenar la red en Google Colab (unos 10 minutos)

**¿Por qué en Colab y no en tu computadora?** Windows bloquea una de las librerías que usa el notebook (pandas) con el mensaje *"Una directiva de Control de aplicaciones bloqueó este archivo"*. Es una protección de Windows y no conviene apagarla. Colab es una página de Google que corre el notebook en sus computadoras, así que no te afecta ese bloqueo y no tienes que instalar nada.

**Lo que necesitas:** internet y una cuenta de Google (la de Gmail sirve).

### Paso 1: abrir Colab

1. Abre Chrome (o tu navegador).
2. En la barra de direcciones escribe **colab.research.google.com** y presiona Enter.
3. Si te pide iniciar sesión, entra con tu cuenta de Google.
4. Aparece una ventana para "Abrir cuaderno". Si no aparece, en el menú de arriba haz clic en **Archivo → Abrir cuaderno** (en inglés: *File → Open notebook*).

### Paso 2: subir el notebook

1. En esa ventana, haz clic en la pestaña **Subir** (*Upload*), que está arriba a la derecha.
2. Haz clic en **Explorar** (*Browse*).
3. Busca esta carpeta: **Este equipo → Disco local (C:) → Usuarios → crule → Red Neuronal → notebooks**.
4. Elige el archivo **red_neuronal.ipynb** y haz clic en **Abrir**.
5. Se abre el notebook: vas a ver el título "Red Neuronal Multicapa para Predicción de Consumo Energético".

### Paso 3: correr todo

1. En el menú de arriba haz clic en **Entorno de ejecución → Ejecutar todas** (en inglés: *Runtime → Run all*).
   - Atajo: **Ctrl + F9**.
2. Si sale un aviso que dice *"Advertencia: Este notebook no fue creado por Google"*, haz clic en **Ejecutar de todos modos** (*Run anyway*). Es normal: el notebook es tuyo.
3. Espera. Vas a ver que las celdas se van ejecutando de arriba hacia abajo y aparecen textos y gráficas.
   - El entrenamiento tarda unos **2 a 3 minutos**. Verás líneas como `Época 500/5000 | loss train: ...`.
4. Al final, el navegador **descarga solo** un archivo llamado **resultados.zip**.
   - Si arriba a la derecha del navegador aparece un aviso de que la página quiere descargar archivos, haz clic en **Permitir**.

**Cómo saber que salió bien:** baja hasta el final y busca estos textos:
- `✅ backprop correcto`
- `✅ Las métricas hechas a mano coinciden con scikit-learn`
- `✅ Descargando resultados.zip`

Si ves un texto en rojo que dice `Error`, toma captura y pásasela a Claude.

### Paso 4: descargar el notebook con los resultados

1. En el menú de arriba haz clic en **Archivo → Descargar → Descargar .ipynb** (*File → Download → Download .ipynb*).
2. Se descarga **red_neuronal.ipynb**.

### Paso 5: avisarle a Claude

No muevas nada. Los dos archivos (**resultados.zip** y **red_neuronal.ipynb**) quedan en tu carpeta de **Descargas**. Solo escríbele a Claude: *"ya están en Descargas"*. Claude los acomoda en el proyecto, revisa los números y actualiza la página web.

---

## Parte 2: publicar la página en Vercel

_Se escribe cuando terminemos la Parte 1._
