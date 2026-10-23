# Scripts vidéo de 1 min 20 à 3 minutes

**Depuis le 18 octobre 2026**, il n'y a plus de texte du jour, de visuel, de prompt d'image ni de workflow JSON. Chaque jour, un thème de la [file](file-des-themes.md) reçoit **un seul livrable** : un script vidéo de **1 min 20 à 3 minutes (80 à 180 s, jamais plus)**, dans ce dossier : `source-NN-theme.md`. Depuis le 24 octobre, le modèle est [« Face à toi »](modele-face-a-toi.md).

## Le modèle « Face à toi » (depuis le 24 octobre 2026, à la demande de Mr Zika)

**Il n'y a plus d'histoire racontée sur quelqu'un d'autre : la personne qui écoute est l'histoire.** Mr Zika lui parle seul à seul, comme en appel vidéo. Il décrit son moment à elle, au présent, puis il le vit avec elle pendant la vidéo. Le modèle : [modele-face-a-toi.md](modele-face-a-toi.md). Les scripts écrits du 18 au 23 octobre (histoire racontée, puis « Et toi ? ») restent dans ce dossier, mais ne servent plus de modèle.

- **« C'est à toi que je parle » dès la 3e seconde.** Pas de personnage, pas de prénom, pas de « écoute l'histoire de… ». La scène, c'est la sienne : « Il y a quelqu'un qui t'a mis le sang à la tête. Aujourd'hui. »
- **Des détails concrets du corps et du quotidien** : la mâchoire serrée, le pouce au-dessus du bouton, l'heure, le plafond à minuit. La personne doit se reconnaître, pas deviner.
- **La voix dans sa tête, citée mot pour mot**, puis démontée en une phrase.
- **Le ton d'une personne assise en face** : la voix basse et proche, sans crier. Ferme avec l'excuse, jamais méprisant avec la personne.
- **Un seul geste, fait pendant la vidéo**, avec de vrais silences : « Fais-le avec moi. Là. Pendant que je parle. »
- **La fin : une phrase à répéter** à voix basse, puis à écrire en commentaire, et une dernière phrase à l'impératif.
- **Femme ou homme : chaque phrase marche pour les deux.** Pas d'adjectif accordé quand on parle à « tu » (« la colère monte », pas « tu es furieux ») ; pas de « frère » tout seul ; on cite plusieurs personnes possibles (« un chef, un frère, une sœur »).
- **Basé sur les textes que Mr Zika envoie** : au moins trois phrases du texte, dans leur version juste (sculpture et analyse), indiquées en tête du fichier avec leur numéro.
- **Durée** : entre 1 min 20 et 3 minutes, environ **200 à 380 mots** parlés (moins de mots qu'avant : les silences comptent).

## La structure

| Temps (environ) | Partie | Ce qu'on fait |
|---|---|---|
| 0:00–0:03 | **Le thème à l'écran** | Quelques mots seuls, sur fond sobre (ex. `TA COLÈRE EST UN SIGNAL, PAS UN ORDRE.`). Aucun son |
| 0:03–0:40 | **Je te vois** | « Attends. C'est à toi que je parle. » Puis la scène de la personne, au présent, avec des détails concrets |
| 0:40–1:05 | **Ce que tu te dis** | La voix dans sa tête, citée (« Si je ne réponds pas maintenant… »), puis démontée en une phrase |
| 1:05–1:40 | **Si j'étais assis en face de toi** | La vérité du thème, avec trois ou quatre phrases du texte envoyé, dites doucement |
| 1:40–2:10 | **Fais-le avec moi, maintenant** | Un seul geste, fait en direct, avec des silences gardés au montage. Si le thème touche à la violence, au deuil, au contrôle ou aux idées noires : la phrase d'aide réelle ici |
| 2:10–2:25 | **Ta phrase** | « Répète après moi, à voix basse : … » Puis « Écris-le ici : … » (le mot à écrire en commentaire), et une dernière phrase à l'impératif |

L'**agent expert en motivation** (`.claude/agents/expert-motivation.md`) écrit les scripts dans cette forme. Il « sculpte » d'abord, phrase par phrase, chaque texte que Mr Zika envoie, et il en tire les thèmes et les scènes.

## Ce que contient chaque fichier
1. En tête : la durée, **les phrases tirées des textes envoyés** (numéros et lien vers la sculpture), ce qui est laissé de côté, la phrase à répéter et le mot à écrire.
2. **Le script minuté**, avec les indications entre parenthèses (*très près*, *plus bas*, *silence 4 s*) et les mots à appuyer en **gras**.
3. **Le texte à l'écran**, minuté, avec peu de texte, pour garder le face-à-face.
4. **Le tournage** en quelques lignes.
5. **La légende**, avec 3 à 5 hashtags dont #MrZika, qui rappelle la phrase et le mot à écrire.

## Le tournage
- **Un seul cadre** : le téléphone à hauteur des yeux, à 50 cm, comme un appel vidéo. Assis, lumière douce de face, le regard dans l'objectif.
- **Une seule prise si possible**, sans plans de coupe : l'impression d'être là, en vrai.
- **Les silences restent** au montage (le « Souffle » de 4 secondes ne se coupe pas).
- **Musique** : aucune, ou une seule note grave très basse.
- **Sous-titres** gros, centrés ; le mot-clé en or.

## Les règles du compte (elles ne changent pas)
Pas de personnage présenté comme un fait réel ou un client. Jamais de citation inventée. Pas de « toutes les femmes », pas de technique, pas de mot qui déclenche la modération (soumission, dominée, dresser). On ne promet rien sur personne : on parle de ce que la personne fait. Secouer l'excuse, jamais humilier la personne. Si le thème touche à la violence, au contrôle ou aux idées noires, on oriente d'abord vers une aide réelle.

## Un thème par jour : la file

Chaque jour, la routine prend **le premier thème « à faire »** de [file-des-themes.md](file-des-themes.md), le fait écrire en script par l'agent expert en motivation (relu et corrigé), le marque « fait » avec son lien, et l'envoie à Mr Zika. Quand la file est vide, elle demande un nouveau texte.

## Quand Mr Zika envoie un texte : le workflow

1. Le texte est enregistré tel quel dans `sources/NN-texte-integral.md`, **phrase par phrase, numérotées** (A-001, A-002…).
2. On lance le workflow **`texte-vers-scripts`** (`.claude/workflows/texte-vers-scripts.js`) avec `{numero: "NN", source: "sources/NN-texte-integral.md"}`. L'agent expert en motivation :
   - **lit tout le texte** : de quoi il parle, tous ses thèmes, ce que chacun veut dire, les phrases exactes qui les portent, ce qu'il faut corriger ;
   - **le sculpte phrase par phrase** : `analyses/NN-sculpture-*.md` ;
   - **ajoute ses thèmes à la fin de la file**, du plus fort au moins fort : un script par jour ensuite ;
   - rassemble tout dans **`analyses/NN-themes-et-scripts.md`**, la fiche à lire en premier.
   - Avec `max_scripts: N`, il écrit aussi N scripts tout de suite, chacun relu par un relecteur exigeant puis corrigé.
