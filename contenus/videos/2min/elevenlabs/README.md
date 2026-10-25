# Versions ElevenLabs des scripts (texte seul, avec les émotions)

**Règle de Mr Zika (25 octobre 2026) :** à partir de maintenant, **chaque script** est livré avec les émotions à l'intérieur. Pour chaque script `contenus/videos/2min/source-NN-<slug>.md`, ce dossier contient `source-NN-<slug>.txt` : le texte parlé, mot pour mot, avec les balises d'émotion en anglais entre crochets, prêt pour ElevenLabs. Le dépôt des vidéos (`Williamszika/reseau-sociaux-bots-`) vient le chercher ici pour fabriquer la voix et la vidéo.

## Pour fabriquer la voix
- **Modèle : `eleven_v3` (Eleven v3), obligatoirement.** Les anciens modèles (`eleven_multilingual_v2`, Flash) ne comprennent pas les balises : ils les liraient à voix haute.
- **Voix :** la voix clonée de Mr Zika seulement.
- **Stabilité :** « Natural » (0.5) ou « Creative » (0.0) ; « Robust » suit moins les balises.
- **Par morceaux :** un paragraphe (bloc séparé par une ligne vide) = un appel. Les six paragraphes suivent les parties du script : Je te vois, l'histoire, ce que tu te dis, la vérité, le geste et l'aide, le conseil.
- **Deux ou trois prises par morceau,** garder la meilleure, puis assembler.
- **Silences :** `…` = une respiration, `[pause]` ≈ 1 s, `[long pause]` = un silence long, à allonger au montage jusqu'à la durée notée dans le script (souvent 4 s).
- **Le thème à l'écran n'est pas lu** : il s'écrit à l'image pendant les 3 premières secondes (voir le script `.md`, section « Texte à l'écran »).
- **La phrase d'aide** (deuil, violence, idées noires) ne se coupe jamais et reste au moins 4 à 6 secondes à l'écran.
- Si la voix de la vidéo est générée : activer « Contenu généré par IA » sur TikTok.

## Le script du jour
Le dernier thème marqué « fait » dans [file-des-themes.md](../file-des-themes.md) donne le script du jour ; son `.txt` est ici, sous le même nom.
