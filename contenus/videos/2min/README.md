# Scripts vidéo de 1 min 20 à 3 minutes

**Depuis le 18 octobre 2026**, il n'y a plus de texte du jour, de visuel, de prompt d'image ni de workflow JSON. Chaque thème du [calendrier](../../motivation/calendrier-themes.md) (un thème tous les trois jours) reçoit **un seul livrable** : un script vidéo de **1 min 20 à 3 minutes (80 à 180 s, jamais plus)**, écrit le premier jour du thème, dans ce dossier : `bloc-NN-theme.md`. Le modèle : [bloc-09-le-matin.md](bloc-09-le-matin.md).

## Ce que doit être la vidéo (la demande de Mr Zika)

**Direct. Très actif. Il parle en face à la personne qui écoute, femme ou homme, pour secouer ce qu'elle croit et lui donner envie de changer de vie. Celle ou celui qui regarde doit sentir, dès la première seconde, que c'est à lui qu'on parle.**

- **Il parle directement à la personne**, en « tu », sans tourner autour du pot : « Toi. Oui, toi qui regardes cette vidéo. », « Arrête. », « C'est à toi que je parle. Pas à ton voisin. À toi. » Dur avec l'excuse, jamais méprisant avec la personne.
- **Femme ou homme : chaque phrase marche pour les deux.** Pas d'adjectif qui se féminise ou se masculinise quand on parle à « tu » (« tu es à bout », pas « tu es fatigué » ; « tu restes au lit », pas « tu restes couché ») ; pas de « frère » tout seul ; « si tu… » plutôt que « celui qui… ». Les personnages des histoires peuvent être des femmes ou des hommes : on alterne d'un thème à l'autre.
- **Actif, pas raconté** : des verbes à l'impératif (« Arrête », « Pense à ce matin », « Regarde-moi », « Va le gagner »), des questions posées en face, un geste demandé pendant la vidéo (« Pense à… », « Regarde ton… »), des phrases de 3 à 10 mots, « Pas demain. Ce soir. »
- **Une histoire simple, précisément sur le thème** : **une** personne, **une** situation, **un** fait concret (un chiffre, une phrase, un moment), **une** fin claire. Pas de détour, pas de symbole à deviner : on doit tout comprendre à la première écoute.
- **Une conclusion** qu'on tire de l'histoire, en une ou deux phrases : « Alors retiens ça. »
- **Un conseil concret** : deux ou trois gestes, faisables dès ce soir ou demain matin.
- **Des phrases de motivation** qui restent, courtes, martelées, une par plan.
- **Un défi** pour finir, avec **un mot à écrire en commentaire**.
- **Basé sur les textes que Mr Zika envoie** : chaque script reprend au moins une idée des analyses (`analyses/`), notée sous « Idées de la source NN » dans le bloc du calendrier, et l'indique en tête du fichier. On garde l'idée vraie, on laisse de côté ce que l'analyse a corrigé.
- **Durée** : entre 1 min 20 et 3 minutes, environ **200 à 420 mots** parlés (150 par minute, silences compris), selon la richesse du thème.

## La structure (depuis le 18 octobre, à la demande de Mr Zika)

**Le thème s'affiche, une histoire émouvante et sincère, puis la motivation.**

| Temps (environ) | Partie | Ce qu'on fait |
|---|---|---|
| 0:00–0:04 | **Le thème à l'écran** | Quelques mots seuls, sur fond sobre (ex. `TOMBER N'EST PAS ÉCHOUER`). Pas encore de voix, ou une seule respiration |
| 0:04–1:15 | **L'histoire** | Émouvante et sincère. **Une** personne (femme ou homme, on alterne d'un thème à l'autre), un lieu, un problème, un moment qui serre le cœur, une phrase dite par quelqu'un, un tournant, une fin claire. Chronologique, simple, comprise à la première écoute : rien à deviner. Présentée comme une histoire (« écoute l'histoire de… »), jamais comme un fait réel |
| 1:15–1:35 | **Et toi** | On se tourne vers la personne qui écoute : « Et toi… », « C'est à toi que je parle. » On relie l'histoire à sa vie |
| 1:35–2:00 | **La vérité** | La croyance qui tombe, la conclusion de l'histoire et du thème (« Alors retiens bien ça. ») |
| 2:00–2:25 | **Le conseil et les phrases qui restent** | Deux ou trois gestes concrets (« Pas demain. Ce soir. »), puis deux ou trois phrases de motivation courtes, dont une tirée des textes envoyés |
| 2:25–2:50 | **Le défi** | « Regarde-moi. Je te lance un défi. » Faisable, vérifiable, avec le mot à écrire en commentaire, et une dernière phrase à l'impératif |

L'**agent expert en motivation** (`.claude/agents/expert-motivation.md`) écrit les scripts dans cette forme. Il « sculpte » d'abord, phrase par phrase, chaque texte que Mr Zika envoie, et il en tire les thèmes et les histoires.

## Ce que contient chaque fichier
1. En tête : la durée, **les idées tirées des textes envoyés** (avec le lien vers l'analyse), le défi et le mot à écrire.
2. **Le script minuté**, avec les indications entre parenthèses (*plan serré*, *fort*, *un pas vers la caméra*, *silence 1 s*) et les mots à appuyer en **gras**.
3. **Le texte à l'écran**, minuté.
4. **Le tournage** en quelques lignes : lieu, tenue, deux cadres, montage, musique.
5. **La légende**, avec 3 à 5 hashtags dont #MrZika, qui finit par une question en « toi » et rappelle le défi.

## Le rythme du montage
- **Debout**, face caméra : l'énergie passe par le corps et les mains.
- **Deux cadres sans bouger le trépied** : le large, et le serré (un pas en avant sur un repère au sol).
- **Une coupe toutes les 2 à 3 secondes**, un zoom rapide (punch-in) sur chaque mot en gras, les chiffres en gros à l'écran.
- **Musique rythmée** (afrobeat instrumental, percussions), qui **s'arrête net** pour le défi et reprend sur la dernière phrase.
- **Sous-titres** gros, centrés, mot par mot ; le mot-clé en or.

## Les règles du compte (elles ne changent pas)
Histoires présentées comme des histoires. Jamais de citation inventée. Pas de « toutes les femmes », pas de technique, pas de mot qui déclenche la modération (soumission, dominée, dresser). On ne promet rien sur personne : on parle de ce que l'homme fait. Secouer l'excuse, jamais humilier la personne. Si le thème touche à la violence, au contrôle ou aux idées noires, on oriente d'abord vers une aide réelle.

## Quand Mr Zika envoie un texte : le workflow

1. Le texte est enregistré tel quel dans `sources/NN-texte-integral.md`, **phrase par phrase, numérotées** (A-001, A-002…).
2. On lance le workflow **`texte-vers-scripts`** (`.claude/workflows/texte-vers-scripts.js`) avec `{numero: "NN", source: "sources/NN-texte-integral.md"}`. L'agent expert en motivation :
   - **lit tout le texte** : de quoi il parle, tous ses thèmes, ce que chacun veut dire, les phrases exactes qui les portent, ce qu'il faut corriger ;
   - **le sculpte phrase par phrase** : `analyses/NN-sculpture-*.md` ;
   - **écrit les scripts** des thèmes les plus forts (un script peut en réunir plusieurs), de 1 min 20 à 3 minutes, le thème affiché devant, l'histoire, la motivation, avec les mots du texte : `contenus/videos/2min/source-NN-*.md` ;
   - fait **relire chaque script par un relecteur exigeant**, puis le corrige ;
   - rassemble tout dans **`analyses/NN-themes-et-scripts.md`**, la fiche à lire en premier.

