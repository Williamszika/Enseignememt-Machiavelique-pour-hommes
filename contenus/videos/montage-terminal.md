# Montage des vidéos depuis le terminal du Mac

**Le principe :** tu filmes, tu déposes les fichiers dans un dossier, et Claude Code (lancé dans le terminal de ton Mac, dans ce dépôt) fait le montage avec **ffmpeg** : tri des prises, assemblage, gros plans, plans de coupe, sous-titres, textes à l'écran, musique, couleur, export. Tu regardes, tu demandes des corrections, il refait.

Ce fichier sert aussi d'instructions pour la session Claude Code du Mac : elle doit le lire avant chaque montage, avec le script du bloc (`contenus/videos/bloc-NN-….md`) et sa fiche vidéo (`contenus/motivation/calendrier-themes.md`).

---

## 1. Installation (une seule fois)

1. **Claude Code** : suis la page officielle d'installation de Claude Code (code.claude.com), et copie la commande depuis la page pour avoir la version à jour.
2. **Récupérer le dépôt** sur le Mac, sur la branche de travail :
   ```
   git clone https://github.com/williamszika/Enseignememt-Machiavelique-pour-hommes.git
   cd Enseignememt-Machiavelique-pour-hommes
   git checkout claude/tiktok-coach-submission-slirvv
   ```
3. **Lancer Claude Code** dans ce dossier (`claude`), puis lui demander : *« Installe ce qu'il faut pour le montage, d'après contenus/videos/montage-terminal.md. »* Il installera **Homebrew** si besoin, **ffmpeg** (le montage) et **whisper-cpp** avec un modèle français (la transcription, pour les sous-titres et pour retrouver les prises). Tu valides chaque installation.

---

## 2. Déposer les vidéos

Transfère les fichiers du téléphone vers le Mac (AirDrop ou câble), **sans les renommer**, dans :

```
rushes/bloc-01/        ← toutes les prises face caméra et trois-quarts
rushes/bloc-01/coupe/  ← les plans de coupe (mains, objets, porte…)
rushes/musique/        ← la musique (un fichier que tu as le droit d'utiliser)
```

Ces dossiers **ne partent pas sur GitHub** (ils sont exclus par `.gitignore`) : les vidéos restent sur ton Mac.

**La musique :** la bibliothèque de CapCut ne sort pas de CapCut. Il faut un fichier de musique libre de droits (bibliothèque audio gratuite de YouTube, ou une musique achetée avec licence). Autre solution : **pas de musique au montage**, et tu en ajoutes une au moment de publier, depuis la bibliothèque de TikTok (mais tu ne contrôles plus le volume sous ta voix).

---

## 3. Lancer le montage

Dans le terminal, dans le dossier du dépôt, lance `claude` et dis simplement :

> *« Fais le montage de la vidéo du bloc 1 avec les rushes de rushes/bloc-01. »*

---

## 4. Ce que fait la session du Mac, étape par étape

1. **Transcrire** toutes les prises (whisper-cpp, français) avec les minutages.
2. **Retrouver chaque morceau du script** dans les prises (accroche, histoire 1 et 2, conseils, Machiavel, fin ; histoire en trois-quarts) et **proposer la meilleure prise** de chaque morceau (texte complet, peu d'hésitations, son propre). **Tu valides la liste avant l'assemblage.**
3. **Couper** chaque prise : garder les pauses voulues (`//` du script), enlever les « euh », les faux départs et les blancs involontaires.
4. **Assembler** dans l'ordre du script, en alternant plan A, **plan B** (recadrage à 130–150 % sur le visage) et plan C, **selon le tableau de montage du script**.
5. **Placer les plans de coupe** aux moments indiqués dans le tableau, par-dessus la voix.
6. **Sous-titres** : à partir de la transcription, **corrigés avec le texte exact du script**. Blanc, ombre noire, milieu bas de l'image, au-dessus de la zone de légende TikTok, jamais sur la bouche. Incrustés dans l'image.
7. **Textes à l'écran** du script, en or, aux minutages prévus.
8. **Musique** : très bas sous la voix (environ 10–15 %), coupée ou baissée aux moments indiqués, **descendue à zéro** pour le conseil de fin.
9. **Couleur** : selon la fiche vidéo du bloc (plus chaud, plus froid, nuit…), sans excès.
10. **Export** dans `exports/` : **1080 × 1920, 30 images/s, H.264, son AAC**, un seul fichier pour TikTok et les Reels Facebook. Plus **une image de couverture** (1080 × 1920) avec le titre de la fiche.
11. **Vérifier** : durée (idéalement ≤ 3 min 15), extraits d'images à plusieurs moments pour contrôler le cadre et les sous-titres, niveau sonore.

---

## 5. Les limites, à connaître

- **Claude ne « regarde » pas la vidéo comme toi.** Il travaille avec le son transcrit, des images extraites et les minutages. Il propose les prises, **toi tu valides**, et c'est toi qui regardes le résultat final avant de publier.
- **Le rendu est sobre** : coupes nettes, fondus simples, textes fixes. Pas d'animations de texte compliquées ni d'effets spectaculaires. C'est le style du compte, mais si tu veux des effets, tu peux finir dans CapCut à partir de l'export.
- **Le 4K est lent à traiter** sur un vieux Mac : compter quelques minutes par export.
- **Chaque correction se demande en français** : *« coupe la pause avant "Chez Ibrahim" d'une demi-seconde »*, *« remonte les sous-titres »*, *« la musique est trop forte au début »*. Il refait l'export.
