# Revue de script — « Parle-toi comme à quelqu'un que tu aimes » (01/11/2026)

Relu par la veille du skill analyse-reseaux-sociaux, contre les consignes d'écriture (`retours-video/dernier.md`), le cahier des charges vidéo et les ordres d'amélioration du Patron (31/10). Le script n'a pas été modifié. À recopier dans `retours-video/revue_parle-toi-comme-a-quelqu-un-que-tu-aimes.md` du dépôt des scripts (la veille n'a pas pu y écrire).

## Ce qui est bien
- Longueur : 257 mots, bien sous la limite de 400 mots (3 minutes à l'oral, pauses comprises).
- Titre court, utilisable seul à l'ouverture ; la première phrase est forte (« Quatorze fois en un mois… "Je suis bête." »).
- Diaspora (Adjoa à Berlin) et une amie proche (Efua) ; déclic par une simple question retournée.
- Relances régulières : « Et là, c'est le déclic », « Tu sais ce qu'elle a fait, le lendemain ? », « Et toi ? », les deux leçons numérotées.
- Une seule action (« Ce soir, écris ta nouvelle phrase ») ; citation courte et originale signée Mr Zika ; pas de fausse science, commentaire épinglé prudent.

## 3 corrections
1. **Climax posé, pas explosif.** Les ordres du Patron (31/10) demandent une voix posée : pas de registre `explosif` ni de « montée ». Dans le script, le `plan.json` (bloc `climax`, `register: "solennel"`) et la version ElevenLabs (remplacer `[deep breath, voice rising, projected, powerful]` par `[calm, slow, solemn]`) :
   > Le dirais-tu à quelqu'un que tu aimes ? [PAUSE 1s] / Non ? [PAUSE 0,7s] / Alors ne te le dis **plus**. ↘
2. **Question finale à un mot, dans le texte.** Le « Oui ou non » n'existe que dans la légende. L'ajouter en voix et à l'écran, juste avant la citation :
   > Et toi, ce soir, tu l'écris ? [PAUSE 1s] Oui ou non.
3. **Arrêts et registres du `plan.json`.** La plupart des segments n'ont pas de `pause_after`, et les blocs `declic` et `lecons` sont en registre `ferme`. Mettre `pause_after: 0.7` après chaque phrase, 1.5 en fin de bloc, 2.0 avant la citation ; registres `intime`, `conteur` ou `solennel` seulement ; `music.level` à 0 (le son est ajouté à la publication). Exemple pour les leçons :
   > Un : « je suis comme ça », / ce n'est pas une description. [PAUSE 0,7s] / C'est une **sentence**. [PAUSE 0,7s]
