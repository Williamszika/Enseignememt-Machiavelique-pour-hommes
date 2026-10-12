# Dessin animé en code (gratuit)

Un test pour fabriquer les histoires des vidéos en **dessin animé**, sans aucun outil payant : les personnages et les décors sont dessinés en code (SVG), animés image par image, puis assemblés en vidéo.

## Ce qu'il y a ici

| Fichier | Rôle |
|---|---|
| `ismael-ca-va.html` | La scène test (bloc 6) : Ismaël au téléphone le soir, les « ça va » de sa mère, de ses amis, du travail, puis « Ça ne va pas », et le carton de fin « Tu as dit « ça va » à qui ? ». Ouvre-la dans un navigateur pour voir la première image |
| `rendu.py` | Transforme une scène en vidéo MP4 1080 × 1920, 30 images/s |

## Ce que la scène anime

- Le personnage : clignement des yeux, respiration, bouche qui bouge quand il parle, regard qui tombe et sourire qui disparaît.
- Le décor : lumières de la ville qui scintillent, vapeur de la tasse, lueur du téléphone, lampe qui baisse.
- La caméra : zoom lent vers le visage.
- Les textes : sous-titres mot par mot (blancs pour Ismaël et le récit, jaunes pour la mère au téléphone), bulles de messages, carton de fin en or.

La vidéo est **muette** : la voix est celle du présentateur, enregistrée au téléphone et posée au montage.

## Fabriquer la vidéo

```
pip install playwright imageio-ffmpeg
python3 -m playwright install chromium          # sur Mac, une seule fois
python3 outils/dessin-anime/rendu.py outils/dessin-anime/ismael-ca-va.html exports/test-dessin-anime-ismael.mp4
```

Une seule image, pour vérifier vite : ajouter `--apercu 13.5` (le temps en secondes) et une sortie en `.png`.

La vidéo sort dans `exports/`, qui n'est pas envoyé sur GitHub.

## Pour une nouvelle scène

On copie `ismael-ca-va.html` et on change trois choses :
1. **Le décor et le personnage**, dans le SVG : couleurs, vêtements, objets.
2. **Les répliques**, dans le tableau `repliques` : qui parle, quand, et les mots du sous-titre. Les temps se calent sur la voix enregistrée.
3. **La durée**, dans `window.DUREE`.

Les règles du compte valent aussi en dessin animé : aucun logo ni marque sur les vêtements, aucun personnage qui ressemble à une personne réelle, des histoires toujours présentées comme des histoires.
