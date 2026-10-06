#!/usr/bin/env python3
"""Vérifie les fichiers workflow des vidéos Mr Zika.

Usage :
    python3 contenus/videos/workflows/valider.py            # tous les blocs
    python3 contenus/videos/workflows/valider.py bloc-05-la-peur-d-oser.workflow.json

Contrôles : structure, durée <= 180 s, segments et timeline continus,
plans de coupe référencés et décrits (prompt + négatif), phrase de Machiavel
dite dans un segment, musique à zéro pour la fin, mots interdits.
Sortie non nulle s'il y a une erreur. Uniquement la bibliothèque standard.
"""
import json
import re
import sys
from pathlib import Path

DOSSIER = Path(__file__).resolve().parent
CLES_BLOC = [
    "herite_de", "id", "bloc", "theme", "titre", "script", "duree", "ambiance",
    "machiavel", "segments", "plans_de_coupe", "timeline", "couverture",
    "legende", "hashtags", "si_trop_long",
]
CLES_SEGMENT = ["id", "partie", "debut_s", "fin_s", "plans", "texte", "diction", "gestes"]
CLES_COUPE = ["id", "description", "duree_utilisee_s", "mouvement_camera", "prompt_en", "prompt_negatif", "tournage_maison"]
MOTS_INTERDITS = ["soumission", "dominée", "dresser"]
REF_COUPE = re.compile(r"\bC\d+(?:bis)?\b")


def verifier(chemin, commun):
    erreurs = []
    try:
        w = json.loads(chemin.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return [f"JSON invalide : {e}"]

    for cle in CLES_BLOC:
        if cle not in w:
            erreurs.append(f"clé manquante : {cle}")
    if erreurs:
        return erreurs

    if not (DOSSIER / w["herite_de"]).exists():
        erreurs.append(f"herite_de introuvable : {w['herite_de']}")

    max_s = min(w["duree"].get("max_s", 180), commun["duree"]["max_s"])

    # Segments : continus de 0 à la fin, sous la durée max.
    fin_prec = 0
    for s in w["segments"]:
        for cle in CLES_SEGMENT:
            if cle not in s:
                erreurs.append(f"segment {s.get('id', '?')} : clé manquante {cle}")
        if s.get("debut_s") != fin_prec:
            erreurs.append(f"segment {s.get('id')} : commence à {s.get('debut_s')} s au lieu de {fin_prec} s")
        if s.get("fin_s", 0) <= s.get("debut_s", 0):
            erreurs.append(f"segment {s.get('id')} : fin avant le début")
        fin_prec = s.get("fin_s", fin_prec)
        for mot in MOTS_INTERDITS:
            if mot in s.get("texte", "").lower():
                erreurs.append(f"segment {s.get('id')} : mot interdit « {mot} »")
    if fin_prec > max_s:
        erreurs.append(f"segments : durée totale {fin_prec} s > {max_s} s")

    # Plans de coupe : décrits et tous référencés existent.
    ids_coupe = set()
    for c in w["plans_de_coupe"]:
        for cle in CLES_COUPE:
            if not c.get(cle):
                erreurs.append(f"plan de coupe {c.get('id', '?')} : {cle} manquant ou vide")
        ids_coupe.add(c.get("id"))

    # Timeline : continue de 0 à la fin, références valides.
    fin_prec = 0
    for i, t in enumerate(w["timeline"]):
        if t.get("debut_s") != fin_prec:
            erreurs.append(f"timeline[{i}] : commence à {t.get('debut_s')} s au lieu de {fin_prec} s")
        if t.get("fin_s", 0) <= t.get("debut_s", 0):
            erreurs.append(f"timeline[{i}] : fin avant le début")
        fin_prec = t.get("fin_s", fin_prec)
        for ref in REF_COUPE.findall(t.get("image", "")):
            if ref not in ids_coupe:
                erreurs.append(f"timeline[{i}] : plan de coupe {ref} inconnu")
        niveau = t.get("musique", {}).get("niveau")
        if niveau is None or not 0 <= niveau <= 1:
            erreurs.append(f"timeline[{i}] : niveau de musique absent ou hors 0-1")
        for txt in t.get("texte_ecran", []):
            if not 0 <= txt["debut_s"] < txt["fin_s"] <= max_s:
                erreurs.append(f"timeline[{i}] : texte « {txt['texte']} » hors des bornes")
    if fin_prec > max_s:
        erreurs.append(f"timeline : durée totale {fin_prec} s > {max_s} s")
    if w["segments"] and fin_prec != w["segments"][-1]["fin_s"]:
        erreurs.append(f"timeline ({fin_prec} s) et segments ({w['segments'][-1]['fin_s']} s) ne finissent pas au même moment")
    if w["timeline"] and w["timeline"][-1].get("musique", {}).get("niveau") != 0:
        erreurs.append("la musique doit être à 0 sur le dernier élément de la timeline")

    # La phrase de Machiavel doit être dite telle quelle (au moins son début).
    debut_phrase = w["machiavel"]["phrase"].split(":")[0].split(",")[0].strip().rstrip(".").lower()
    if not any(debut_phrase in s.get("texte", "").lower() for s in w["segments"]):
        erreurs.append("la phrase de Machiavel n'apparaît dans aucun segment")

    return erreurs


def main():
    commun = json.loads((DOSSIER / "commun.json").read_text(encoding="utf-8"))
    fichiers = [DOSSIER / a for a in sys.argv[1:]] or sorted(DOSSIER.glob("bloc-*.workflow.json"))
    total = 0
    for f in fichiers:
        erreurs = verifier(f, commun)
        total += len(erreurs)
        if erreurs:
            print(f"✗ {f.name}")
            for e in erreurs:
                print(f"    - {e}")
        else:
            w = json.loads(f.read_text(encoding="utf-8"))
            print(f"✓ {f.name} : {w['segments'][-1]['fin_s']} s, "
                  f"{len(w['segments'])} segments, {len(w['plans_de_coupe'])} plans de coupe, "
                  f"{len(w['timeline'])} étapes de montage")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
