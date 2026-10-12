#!/usr/bin/env python3
"""Transforme une scène de dessin animé HTML/SVG en vidéo MP4 (1080 x 1920, 30 i/s).

La scène doit définir une fonction JavaScript render(t) et window.DUREE (secondes).
Chaque image est dessinée par Chromium, puis ffmpeg assemble la vidéo.

Installation (une seule fois) :
    pip install playwright imageio-ffmpeg

Usage :
    python3 outils/dessin-anime/rendu.py outils/dessin-anime/ismael-ca-va.html exports/test-ismael.mp4
    python3 outils/dessin-anime/rendu.py scene.html sortie.mp4 --apercu 13.5   # une seule image PNG

Sur Mac, Chromium est celui de Playwright (« python3 -m playwright install chromium »).
Dans l'environnement cloud, la variable CHROMIUM peut pointer vers un Chromium déjà installé.
"""
import argparse
import os
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from playwright.sync_api import sync_playwright

FPS = 30


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("scene")
    ap.add_argument("sortie")
    ap.add_argument("--apercu", type=float, help="ne rendre qu'une image PNG à ce temps (secondes)")
    a = ap.parse_args()

    scene = Path(a.scene).resolve()
    sortie = Path(a.sortie).resolve()
    sortie.parent.mkdir(parents=True, exist_ok=True)

    lancement = {}
    if os.environ.get("CHROMIUM"):
        lancement["executable_path"] = os.environ["CHROMIUM"]

    with sync_playwright() as p:
        nav = p.chromium.launch(**lancement)
        page = nav.new_page(viewport={"width": 1080, "height": 1920})
        page.goto(scene.as_uri())
        duree = page.evaluate("window.DUREE")
        svg = page.locator("#scene")

        if a.apercu is not None:
            page.evaluate(f"render({a.apercu})")
            svg.screenshot(path=str(sortie))
            print(f"Aperçu : {sortie}")
            nav.close()
            return

        n = int(round(duree * FPS))
        ff = subprocess.Popen(
            [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
             "-f", "image2pipe", "-framerate", str(FPS), "-i", "-",
             "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "19", "-preset", "medium",
             "-movflags", "+faststart", str(sortie)],
            stdin=subprocess.PIPE)
        for i in range(n):
            page.evaluate(f"render({i / FPS})")
            ff.stdin.write(svg.screenshot(type="png"))
            if i % FPS == 0:
                print(f"\r{i // FPS}/{int(duree)} s", end="", file=sys.stderr, flush=True)
        ff.stdin.close()
        ff.wait()
        nav.close()
    print(f"\nVidéo : {sortie} ({n} images, {duree} s)")


if __name__ == "__main__":
    main()
