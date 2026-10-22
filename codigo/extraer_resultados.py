"""Recupera la carpeta resultados/ desde las salidas guardadas del notebook.

Sirve cuando el notebook se corrió con la extensión de Colab en VS Code: ahí los
archivos se crean en el servidor de Colab, pero la penúltima celda los imprime
(texto) y los muestra (imágenes) para que queden guardados dentro del .ipynb.

Solo usa la biblioteca estándar de Python (no necesita numpy ni pandas).

Uso, desde la raíz del proyecto:
    python codigo/extraer_resultados.py
"""

import base64
import json
import re
import shutil
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
NOTEBOOK = RAIZ / "notebooks" / "red_neuronal.ipynb"
SALIDA = RAIZ / "resultados"
COPIA_WEB = RAIZ / "web" / "src" / "data" / "resultados.json"
MARCA = re.compile(r"^=== ARCHIVO (.+?) ===$")
FIN = "=== FIN ==="


def extraer(notebook=NOTEBOOK):
    nb = json.loads(Path(notebook).read_text(encoding="utf-8"))
    SALIDA.mkdir(exist_ok=True)
    guardados = []
    for celda in nb["cells"]:
        actual, lineas = None, []

        def cerrar():
            if actual and lineas:
                (SALIDA / actual).write_text("".join(lineas).rstrip("\n") + "\n", encoding="utf-8", newline="\n")
                guardados.append(actual)

        for out in celda.get("outputs", []):
            if out.get("output_type") == "stream":
                for linea in "".join(out["text"]).splitlines(keepends=True):
                    m = MARCA.match(linea.strip())
                    if linea.strip() == FIN:
                        cerrar()
                        actual, lineas = None, []
                    elif m:
                        cerrar()
                        actual, lineas = m.group(1), []
                    elif actual and not actual.endswith(".png"):
                        lineas.append(linea)
            elif "image/png" in out.get("data", {}) and actual and actual.endswith(".png"):
                (SALIDA / actual).write_bytes(base64.b64decode(out["data"]["image/png"]))
                guardados.append(actual)
                actual = None
        cerrar()

    if not guardados:
        raise SystemExit("No se encontraron resultados: ¿el notebook se corrió completo y se guardó?")
    json.loads((SALIDA / "resultados.json").read_text(encoding="utf-8"))  # valida el JSON
    shutil.copyfile(SALIDA / "resultados.json", COPIA_WEB)
    print("Guardados en resultados/:", ", ".join(sorted(set(guardados))))
    print("Copiado a web/src/data/resultados.json")


if __name__ == "__main__":
    import sys
    extraer(*sys.argv[1:2])
