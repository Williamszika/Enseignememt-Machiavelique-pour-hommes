# Workflows vidéo : la vidéo de 3 minutes, prête à être fabriquée par un autre dépôt

Chaque script vidéo (`contenus/videos/bloc-NN-….md`) a ici son **workflow** : un fichier JSON qui contient tout ce qu'il faut pour fabriquer la vidéo sans relire le script. Un autre dépôt (ou une autre session Claude Code, ou un outil de montage) le lit et produit la vidéo.

Ce que contient un workflow :
- le texte exact de chaque segment ;
- la diction (pauses, mots appuyés, ton) ;
- les gestes du présentateur et les mouvements de caméra ;
- les plans de coupe, avec leur prompt de génération IA en anglais, leur prompt négatif, et la façon de les filmer soi-même ;
- le montage seconde par seconde : image, mouvement, transition, niveau de musique, textes à l'écran ;
- la couleur et la musique (y compris un prompt pour la générer) ;
- la couverture, la légende, les hashtags ;
- quoi couper si la vidéo dépasse 3 minutes.

**Règle absolue : 180 secondes maximum.** Chaque workflow est calé sur 3:00 pile, et `valider.py` refuse tout fichier qui dépasse.

---

## Les fichiers

| Fichier | Rôle |
|---|---|
| `commun.json` | Réglages communs à toutes les vidéos : export (1080 × 1920, 30 i/s, H.264, -14 LUFS), plans de caméra A / B / C, style des textes à l'écran et des sous-titres, règles de musique, paramètres de génération IA, règles du compte |
| `bloc-NN-theme.workflow.json` | Ce qui est propre à une vidéo. Hérite de `commun.json` (clé `herite_de`) ; en cas de conflit, le bloc l'emporte |
| `valider.py` | Contrôle automatique : durée ≤ 180 s, segments et montage continus, plans de coupe existants et décrits, phrase de Machiavel bien dite, musique à zéro à la fin, mots interdits |

| Bloc | Thème | Workflow |
|---|---|---|
| 1 | La parole donnée | [bloc-01-la-parole-donnee.workflow.json](bloc-01-la-parole-donnee.workflow.json) |
| 2 | L'argent | [bloc-02-l-argent.workflow.json](bloc-02-l-argent.workflow.json) |
| 3 | Le cercle | [bloc-03-le-cercle.workflow.json](bloc-03-le-cercle.workflow.json) |
| 4 | Le père (version 2, avec « À toi » : **modèle des suivants**) | [bloc-04-le-pere.workflow.json](bloc-04-le-pere.workflow.json) |
| 5 | La peur d'oser | [bloc-05-la-peur-d-oser.workflow.json](bloc-05-la-peur-d-oser.workflow.json) |

---

## Structure d'un workflow de bloc

| Clé | Contenu |
|---|---|
| `id`, `bloc`, `theme`, `titre`, `script`, `publication` | Identité de la vidéo et lien vers le script lisible |
| `duree` | `cible_s` et `max_s` (180) |
| `ambiance` | Position, lieu, décor, lumière, tenue, moment, cadre du plan A, position du plan C, couleur (avec un `filtre_ffmpeg` de départ), musique (style, mots-clés de recherche, `prompt_generation_en`), rythme, transitions |
| `presentateur_ia_variables` | Les valeurs à injecter dans `commun.json → generation_ia.presentateur_ia.prompt_modele_en` (solution de secours seulement) |
| `machiavel` | La seule phrase de Machiavel autorisée dans la vidéo, avec sa référence |
| `segments[]` | Les parties parlées, dans l'ordre : accroche, histoire 1 et 2, **`a_toi`** (le présentateur parle directement à l'abonné, en « tu » ; obligatoire depuis le bloc 4, donc 9 segments), conseils 1 à 3, Machiavel, conseil de fin. Les blocs 1, 2, 3 et 5, écrits avant cette règle, en ont 8 : `debut_s`, `fin_s`, `plans`, `rushes`, `texte` (exact, pour les sous-titres ou une voix), `diction` (annotée), `ton`, `gestes`, `mouvement_camera` |
| `plans_de_coupe[]` | Chaque image d'illustration : `description`, `duree_utilisee_s`, `mouvement_camera`, `prompt_en`, `prompt_negatif`, `tournage_maison` (comment la filmer soi-même), parfois des variantes |
| `timeline[]` | Le montage seconde par seconde : `debut_s`, `fin_s`, `image` (A, B, C ou un plan de coupe), `mouvement`, transitions, `musique.niveau` (0 à 1) et `musique.note`, `texte_ecran[]` avec leurs minutages |
| `couverture` | Image source, texte, style, prompt pour la générer |
| `legende`, `hashtags` | À coller à la publication |
| `si_trop_long` | Ce qu'on coupe, dans l'ordre, si la vidéo dépasse 180 s, et ce qu'on ne coupe jamais |

Code de diction dans `diction` : `/` petite pause · `//` vraie pause (1 à 2 s) · `**mot**` mot appuyé · `*(…)*` ton, voix d'un personnage ou geste.

---

## Comment un autre dépôt s'en sert

### 1. Récupérer les fichiers
Le dépôt est privé : l'autre dépôt doit avoir accès à celui-ci, par exemple en l'ajoutant comme sous-module, ou en lisant les fichiers avec un jeton GitHub en lecture seule. Chemin des fichiers sur la branche de travail :

```
claude/tiktok-coach-submission-slirvv : contenus/videos/workflows/
```

Toujours lire `commun.json` **et** le fichier du bloc, puis fusionner (le bloc l'emporte).

### 2. Fabriquer la vidéo, étape par étape
1. **Valider** : `python3 valider.py bloc-NN-….workflow.json`. Ne rien fabriquer si le fichier est refusé.
2. **Rushes du présentateur** (voie normale) : les prises A et C filmées par le présentateur, déposées dans `rushes/bloc-NN/`. Transcrire (whisper-cpp, français), retrouver chaque segment par son `texte`, proposer la meilleure prise, et **faire valider la sélection par le présentateur** avant d'assembler.
3. **Plans de coupe** : pour chaque entrée de `plans_de_coupe`, soit le rush filmé (`rushes/bloc-NN/coupe/`), soit une génération IA :
   - prompt `prompt_en`, prompt négatif `prompt_negatif`, format 9:16, 5 s ;
   - une seule génération par plan, puis vérification ; on ne régénère que si la règle du compte n'est pas respectée, car chaque génération est payante ;
   - on garde `duree_utilisee_s` au montage.
4. **Assembler** en suivant `timeline` dans l'ordre :
   - `A` et `C` : les rushes ;
   - `B` : le recadrage de A défini dans `commun.json` ;
   - `C1`, `C2`… : les plans de coupe ;
   - les transitions et mouvements sont indiqués sur chaque étape.
5. **Voix** : celle des rushes. Les silences `//` du script sont gardés. Les « euh » et les faux départs sont retirés.
6. **Sous-titres** : depuis la transcription, corrigés mot par mot avec `segments[].texte` (le texte du script fait foi), style de `commun.json`.
7. **Textes à l'écran** : `timeline[].texte_ecran`, style de `commun.json`, aux minutages donnés.
8. **Musique** :
   - un fichier dont on a les droits, ou généré avec `ambiance.musique.prompt_generation_en` ;
   - le niveau suit `timeline[].musique.niveau`, avec ducking sous la voix ;
   - la musique est à zéro pour le conseil de fin.
9. **Couleur** : `ambiance.couleur.filtre_ffmpeg` comme point de départ, appliqué à tout, plans de coupe générés compris.
10. **Contrôler la durée** : si elle dépasse 180 s, appliquer `si_trop_long` dans l'ordre.
11. **Exporter** selon `commun.json → export`, avec la couverture.
12. **Ne rien publier** : le présentateur regarde la vidéo finale et publie lui-même. Tout plan réaliste généré par IA est signalé à la publication (option « contenu généré par l'IA »).

### 3. Le présentateur généré par IA (secours uniquement)
La voie normale reste le tournage réel. Si l'autre dépôt doit générer le présentateur, il le fait :
- **à partir de la propre photo du présentateur, avec son accord**, jamais du visage de quelqu'un d'autre ;
- en remplissant `commun.json → generation_ia.presentateur_ia.prompt_modele_en` avec `presentateur_ia_variables` ;
- en signalant la vidéo comme contenu IA.

---

## Pour chaque nouveau script

Le jour où un script vidéo est écrit, son workflow est écrit le même jour, au même nom : `contenus/videos/bloc-NN-theme.md` donne `contenus/videos/workflows/bloc-NN-theme.workflow.json`. Il est ajouté au tableau ci-dessus et vérifié avec `valider.py` avant le commit.
