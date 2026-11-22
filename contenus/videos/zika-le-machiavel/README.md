# Rubrique « Zika le Machiavel »

**Créée le 9 novembre 2026, à la demande de Mr Zika.** C'est une rubrique à part de la file quotidienne de motivation (`../2min/`). Quand Mr Zika envoie un texte, il dit dans quelle rubrique il va. S'il ne le dit pas et que le texte parle de pouvoir, de stratégie ou de Machiavel, l'agent propose cette rubrique. **La décision revient toujours à Mr Zika.**

## ⭐⭐ Le sujet de la rubrique : l'homme dans sa relation avec une femme (règle de Mr Zika, 22 novembre 2026)

Ses mots : « La rubrique machiavélique doit parler des relations : un homme dans une relation, un homme et une femme. La vie, c'est les idées stoïciennes. Le machiavélisme, c'est la stratégie et tout ce qui rentre avec. On donne des conseils aux hommes, mon frère, pour qu'ils puissent changer. Ne cache pas les mots. Parle fort pour qu'il comprenne. On doit sentir qu'on parle aux hommes qui se font manipuler par les femmes. »

- **Chaque épisode parle d'un homme et d'une femme** : la séduction, le couple, la rupture, l'argent dans le couple, le temps qu'il donne, le respect, les signes qu'on le manipule. Les thèmes de « la vie » (discipline, peur, sommeil, travail) restent dans la file stoïcienne.
- **La stratégie** : lire la situation, voir le schéma (silence, miette, demande), poser sa ligne, savoir partir, garder sa valeur.
- **Le ton : franc, fort, sans détour.** Mr Zika parle à un frère et dit les choses en face : « Plus tu donnes ton temps à cette fille qui ne te répond que quand elle a besoin, moins tu en as pour ta vie. » Des exemples concrets, des phrases qu'il peut dire, des gestes qu'il peut faire ce soir.
- **On parle aux hommes qui se font manipuler** : on nomme la manipulation clairement (« celle qui te fait ça te joue »), on montre comment la reconnaître et comment en sortir.
- Ce qui reste, parce que c'est vrai et que ça protège le compte : on parle de **cette** femme, jamais de « toutes les femmes » ; on n'enseigne aucune technique pour manipuler en retour ; la sortie est toujours la dignité, la limite claire, et partir si besoin.

## ⭐ Le rythme : un épisode chaque mercredi à 10 h (règle de Mr Zika, 17 novembre 2026)

- **Publication : le mercredi à 10 h 00, heure de Berlin**, un épisode par semaine. **Le mercredi n'appartient qu'à cette rubrique** : pas de vidéo de motivation ce jour-là (elles continuent du jeudi au mardi).
- **Le lundi**, la tâche programmée « Zika le Machiavel du mercredi » écrit l'épisode suivant de la file sur le modèle de ZM-15, fait la voix Paul K et pousse `script.md`, `elevenlabs.txt`, `plan.json` et `voix-paul-k.mp3` dans le dépôt des vidéos (`videos/scripts-du-jour/AAAA-MM-JJ-zm-<slug>/`, date du mercredi).
- Le dépôt des vidéos fabrique, fait contrôler, envoie la vidéo et la légende à Mr Zika, et programme la publication du mercredi 10 h **après son accord** (demande `demandes/2026-11-17_zika-le-machiavel-chaque-mercredi-10h.md` de ce dépôt).
- Ordre : ZM-15 (18 nov.), puis ZM-07 à ZM-14, puis ZM-01 à ZM-06 réécrits sur le modèle de ZM-15.

## ⭐ La voix de la rubrique (choix de Mr Zika, 17 novembre 2026)

Quand la voix est générée par ElevenLabs, la rubrique utilise **Paul K — Deep French Narrator** (`5l4ttmr4SKNgi0HnOelT`) : une voix française grave, qui parle avec autorité et énergie. Modèle `eleven_multilingual_v2`, réglages : stabilité 0,35, similarité 0,8, style 0,7, speaker boost activé, vitesse 1,03. La voix clonée « Monsieur Zika » n'est pas utilisée (essai refusé le 17 novembre).

## Ce que c'est

Mr Zika parle **à un homme**, seul à seul, comme s'il était assis en face de lui. Il ne fait pas un cours et ne raconte pas un conte à tout le monde : il s'adresse à un frère.

- **Voix imposante** : grave, posée et sûre d'elle, sans jamais crier. Elle ne traîne pas pour autant (règle du Patron du 01/11 sur la voix, sans lenteur) : la force vient des phrases courtes, du poids mis sur les mots-clés et d'un silence avant chaque règle.
- **Sincère** : il dit ce qu'il pense, il dit ce que ça coûte, il reconnaît ses propres erreurs. Son autorité vient de son vécu, pas d'un ton de gourou.
- **Avec la couleur ivoirienne**, légère et naturelle, compréhensible par tout francophone d'Afrique et de la diaspora (voir plus bas).
- **Avec des illustrations** :
  - à l'oral, chaque règle est montrée par une scène concrète (bureau, chantier, marché, famille, quartier, affaires) ;
  - à l'image, chaque idée a son plan d'illustration dans le `plan.json` (échiquier, mains qui signent, porte qui se ferme, table de réunion, rue la nuit…).

## Reconnaître un texte « machiavélique »

Un texte va dans cette rubrique quand il parle de :
- pouvoir, réputation, autorité ;
- stratégie, alliances, ennemis, loyauté ou trahison ;
- se faire respecter, ne pas se laisser manipuler, lire les intentions, garder ses plans pour soi, négocier ;
- *Le Prince* et Machiavel, ou des auteurs du même terrain (les « lois du pouvoir », l'art de la guerre…).

Dans ce cas, l'agent le dit en une ligne (« Ce texte est machiavélique : je le range dans Zika le Machiavel ? ») et range les thèmes dans cette rubrique.

## La structure d'un script (1 min 30 à 3 min, environ 200 à 400 mots)

1. **L'interpellation** (0–3 s) : le moment le plus fort, au plus 12 mots, à « tu ». Par exemple : « Mon frère, celui qui sait tout de toi te tient. »
2. **La règle** : une seule par vidéo. Elle vient de *Machiavel le vrai*, avec son chapitre (voir `glossaire.md`, section « Machiavel (le vrai) »), ou c'est la phrase juste tirée du texte envoyé.
3. **L'illustration** : une histoire courte racontée comme on raconte une affaire à un ami (« Je vais te dire une affaire… »), avec un prénom, un lieu et un détail concret. C'est une fiction, présentée comme une histoire.
4. **Ce que la règle veut vraiment dire, et sa limite** : ce que Machiavel ne dit pas, et où commence la ligne rouge (voir plus bas).
5. **Une seule chose à faire**, aujourd'hui.
6. **Une question qui se répond en un mot.**
7. **La citation de Mr Zika**, en Pinyon Script or #D4AF37 sous la citation en blanc, signée « — Mr Zika ».

Les fichiers sont les mêmes que pour la file quotidienne :
- `zm-NN-<slug>.md` dans ce dossier, avec la version Eleven v4 ;
- `elevenlabs/zm-NN-<slug>.txt` ;
- `plan.json`.

Le script est poussé dans le dépôt des vidéos, sous `videos/scripts-du-jour/AAAA-MM-JJ-zm-<slug>/`.
Dans le dépôt des vidéos, chaque dossier de la rubrique porte `-zm-` dans son nom, `"rubrique": "Zika le Machiavel"` et `"episode": "ZM-NN"` en tête du `plan.json`, et un bandeau en tête du `script.md`. La mise en forme (nom de la rubrique sur la couverture, playlist à part, légende « Zika le Machiavel — ZM-NN ») est décrite dans `videos/scripts-du-jour/README.md` de ce dépôt.

## La couleur ivoirienne (légère, jamais une caricature)

Deux à quatre tournures par script, pas plus. Chacune doit se comprendre par le contexte. On n'imite jamais un accent pour en rire.

| Tournure | Sens | Exemple |
|---|---|---|
| Mon frère / mon petit | l'adresse directe | « Mon frère, écoute-moi bien. » |
| Je vais te dire une affaire | annoncer l'histoire | « Je vais te dire une affaire qui s'est passée au bureau. » |
| C'est pas pour rien | il y a une raison | « Il souriait trop. C'est pas pour rien. » |
| Faut pas laisser ça | ne passe pas là-dessus | « Quand ta parole ne compte plus, faut pas laisser ça. » |
| Gbê est mieux que drap | la vérité vaut mieux que le mensonge (expression ivoirienne) | « Dis la vérité. Gbê est mieux que drap. » |
| Môgô | un gars, un type | « Le môgô-là parlait trop de ses plans. » |
| On est ensemble | je suis avec toi | pour finir, avant la question |
| Ça va aller | encouragement | après une leçon dure |
| Dêh / hein | appuyer une phrase | « Ça, c'est pas petit dêh. » |

Le texte reste en français clair : la couleur est dans le rythme et dans quelques mots, pas dans un argot difficile à suivre pour la diaspora.

## Ce qui ne change pas (lignes rouges du compte, voir `personnage.md`)

- **Machiavel pour de vrai** : chapitre à l'appui, aucune citation inventée attribuée à une personne réelle. Seul Mr Zika peut avoir des citations inventées.
- **Pas de technique de manipulation** à appliquer à une compagne, à la famille ou aux proches : pas de chaud/froid, pas de silence pour punir, pas de jalousie provoquée. Le Machiavel de Mr Zika apprend à **voir** les jeux de pouvoir et à **ne pas se faire avoir**, pas à écraser les siens. Machiavel lui-même dit « craint, mais jamais haï » (ch. XVII).
- **Pas de « toutes les femmes »**, pas de mépris : l'homme à qui il parle respecte les femmes.
- **Pas de mot qui déclenche la modération** dans le titre ou la légende : soumission, dominée, dresser, utilisée.
- **Aucun visage d'enfant, et rien d'une personne réelle sans son accord.**

**Seule différence avec la file quotidienne :** ici, Mr Zika s'adresse à un homme (décision du 9 novembre 2026). La règle « chaque phrase à "tu" marche pour une femme comme pour un homme » ne s'applique pas à cette rubrique, mais le respect, si.

## Exemple de ton (à valider par Mr Zika)

> Mon frère, celui qui sait tout de toi te tient.
> Je vais te dire une affaire. Serge, au bureau, racontait tout. Son salaire, ses dettes, le poste qu'il voulait. Tout le monde l'aimait.
> Le jour où le poste s'est libéré, c'est un autre qui l'a eu. Avec ses idées à lui. C'est pas pour rien.
> Machiavel l'a écrit dans *Le Prince*, chapitre dix-huit : les hommes jugent avec leurs yeux. Ils voient ce que tu montres, pas ce que tu es.
> Ça veut pas dire mentir, dêh. Gbê est mieux que drap. Ça veut dire : tes plans, tu les gardes jusqu'au jour où ils sont faits.
> Aujourd'hui, choisis un projet. Ne le raconte à personne tant qu'il n'est pas lancé.
> Tu tiens ta langue cette semaine ? Oui ou non.

## Comment on travaille (décision de Mr Zika, 11 novembre 2026)

1. Mr Zika envoie un texte et dit : « rubrique Zika le Machiavel ».
2. L'agent **découpe le texte en thèmes** (un thème = une vidéo), comme pour les autres textes, et les range dans [la file de la rubrique](file-zika-le-machiavel.md).
3. Pour chaque thème, l'agent écrit **un script normal, à lire par Mr Zika lui-même** : Mr Zika parle à une personne, face caméra, avec la structure ci-dessus. Pas de voix ElevenLabs ni de plan.json pour la vidéo automatique : **Mr Zika enregistre lui-même la vidéo**, puis l'envoie à l'équipe qui ajoute les illustrations.
4. Chaque script contient donc deux colonnes : **ce que Mr Zika dit**, et **l'illustration proposée** pour l'équipe de montage (image, plan, mot à l'écran), plus le texte prompteur seul.
5. Fichiers : `zm-NN-<slug>.md` dans ce dossier ; copie dans le dépôt des vidéos sous `videos/zika-le-machiavel/AAAA-MM-JJ-<slug>/script.md`.

**Les deux chaînes restent séparées :**
- la file quotidienne de motivation (`../2min/`) continue chaque jour, avec la vidéo automatique (voix, plan.json) ;
- la rubrique « Zika le Machiavel » : des scripts à tourner par Mr Zika, chaque titre et chaque compte-rendu commence par **[Zika le Machiavel]** pour qu'on ne les confonde jamais.

## Hashtags

#mrzika #zikalemachiavel #machiavel #leprince + un hashtag du thème.
