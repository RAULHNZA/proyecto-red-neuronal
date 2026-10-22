# Guía paso a paso (para Raúl)

Aquí están, con cada clic, las cosas que tienes que hacer tú. Todo lo demás lo hace Claude.
Si algo no se ve igual que aquí, toma una captura de pantalla y pásasela a Claude.

---

## Parte 1: entrenar la red con Google Colab (unos 10 minutos)

**¿Por qué Colab y no tu computadora?** Windows bloquea una de las librerías que usa el notebook (pandas) con el mensaje *"Una directiva de Control de aplicaciones bloqueó este archivo"*. Es una protección de Windows y no conviene apagarla. Colab son computadoras de Google que corren el notebook por ti, así que el bloqueo no importa y no tienes que instalar nada.

**Lo que necesitas:** internet y una cuenta de Google (la de Gmail sirve).

Hay tres formas. **Usa la Opción A**: es la más fácil y no hay que descargar nada.

---

### Opción A (recomendada): desde VS Code, con la extensión de Colab

La extensión **Google Colab** ya está instalada en tu VS Code. Hace que el notebook, abierto aquí en VS Code, se ejecute en las computadoras de Google. Los resultados se guardan dentro del mismo archivo, y Claude los saca de ahí.

**Paso A1: abrir el notebook**
1. En VS Code, en la barra de la izquierda, haz clic en el ícono de **hojas de papel** (Explorador). Es el de hasta arriba.
2. Abre la carpeta **notebooks** y haz doble clic en **red_neuronal.ipynb**.
3. Se abre el notebook con el título "Red Neuronal Multicapa para Predicción de Consumo Energético".

**Paso A2: conectarlo a Colab**
1. Arriba a la derecha del notebook hay un botón que dice **Seleccionar kernel** (*Select Kernel*). Haz clic.
2. En el menú que aparece arriba, elige **Colab**.
3. Elige **Auto Connect** (Conectar automáticamente).
4. La primera vez te pide iniciar sesión en Google:
   - Sale un aviso de VS Code que quiere abrir una página. Haz clic en **Abrir**.
   - En el navegador, elige tu cuenta de Google y haz clic en **Permitir** / **Continuar**.
   - Cuando diga que ya puedes cerrar la página, regresa a VS Code. Si VS Code pregunta si dejas que la extensión abra un enlace, haz clic en **Abrir**.
5. Espera unos segundos. Arriba a la derecha, donde decía "Seleccionar kernel", ahora debe decir algo con **Colab**.

**Paso A3: correr todo**
1. En la barra de arriba del notebook haz clic en **Ejecutar todo** (*Run All*). Tiene un ícono de dos flechas ▶▶.
2. Espera unos **3 minutos**. Las celdas se van ejecutando de arriba hacia abajo. Las que están corriendo tienen un círculo girando; las que terminaron tienen una palomita ✓ verde.
3. Cuando todas tengan palomita, baja hasta el final. Antes de "Conclusiones" debes ver las tres gráficas otra vez y un texto largo que empieza con `{`.

**Paso A4: guardar**
1. Presiona **Ctrl + S**.
2. Escríbele a Claude: **"ya corrí el notebook en VS Code"**. Claude saca de ahí las gráficas y los números con `codigo/extraer_resultados.py` y actualiza la página.

**Si sale un error** (texto rojo), toma captura y pásasela a Claude.

**Al terminar** (después de guardar), puedes apagar el servidor de Colab para no gastar tu cuota gratis: presiona **Ctrl + Shift + P**, escribe **Colab: Remove Server** y presiona Enter.

---

### Opción B: que Claude lo haga desde Chrome

Con la extensión **Claude para Chrome** (ya instalada), Claude puede abrir la página de Colab, subir el notebook y correrlo. Para darle permiso (solo una vez):
1. En Chrome, haz clic en el ícono de Claude (arriba a la derecha) y revisa que estés en la **misma cuenta** que usas en Claude Code.
2. En el cuadro donde le escribes a Claude en VS Code, escribe **/chrome** y presiona Enter.
3. Activa el interruptor **"Enabled by default"** y revisa que diga **Status: Enabled** y **Extension: Installed**.
4. Abre un chat nuevo y escribe: *"ya activé Chrome, corre el notebook en Colab"*.
5. Cuando Chrome muestre avisos *"Claude quiere…"*, haz clic en **Permitir**.

---

### Opción C: tú, en la página de Colab

**Paso C1: abrir Colab**

1. Abre Chrome (o tu navegador).
2. En la barra de direcciones escribe **colab.research.google.com** y presiona Enter.
3. Si te pide iniciar sesión, entra con tu cuenta de Google.
4. Aparece una ventana para "Abrir cuaderno". Si no aparece, en el menú de arriba haz clic en **Archivo → Abrir cuaderno** (en inglés: *File → Open notebook*).

**Paso C2: subir el notebook**

1. En esa ventana, haz clic en la pestaña **Subir** (*Upload*), que está arriba a la derecha.
2. Haz clic en **Explorar** (*Browse*).
3. Busca esta carpeta: **Este equipo → Disco local (C:) → Usuarios → crule → Red Neuronal → notebooks**.
4. Elige el archivo **red_neuronal.ipynb** y haz clic en **Abrir**.
5. Se abre el notebook: vas a ver el título "Red Neuronal Multicapa para Predicción de Consumo Energético".

**Paso C3: correr todo**

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
- `✅ Descargando resultados.zip (si estás en la página de Colab, revisa Descargas)`

Si ves un texto en rojo que dice `Error`, toma captura y pásasela a Claude.

**Paso C4: descargar el notebook con los resultados**

1. En el menú de arriba haz clic en **Archivo → Descargar → Descargar .ipynb** (*File → Download → Download .ipynb*).
2. Se descarga **red_neuronal.ipynb**.

**Paso C5: avisarle a Claude**

No muevas nada. Los dos archivos (**resultados.zip** y **red_neuronal.ipynb**) quedan en tu carpeta de **Descargas**. Solo escríbele a Claude: *"ya están en Descargas"*. Claude los acomoda en el proyecto, revisa los números y actualiza la página web.

---

## Parte 2: publicar la página en Vercel

_Se escribe cuando terminemos la Parte 1._
