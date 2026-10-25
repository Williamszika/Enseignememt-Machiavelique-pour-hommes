# Versions ElevenLabs des scripts (texte seul, avec les émotions)

**Règle de Mr Zika (25 octobre 2026) :** à partir de maintenant, **chaque script** est livré avec les émotions à l'intérieur. Pour chaque script `contenus/videos/2min/source-NN-<slug>.md`, ce dossier contient `source-NN-<slug>.txt` : le texte parlé, mot pour mot, avec les balises d'émotion en anglais entre crochets, prêt pour ElevenLabs. Le dépôt des vidéos (`Williamszika/reseau-sociaux-bots-`) vient le chercher ici pour fabriquer la voix et la vidéo.

## Pour fabriquer la voix
- **Modèle : Eleven v4, pour tous les nouveaux scripts (règle de Mr Zika, 25 octobre 2026).** Ses balises sont combinées et décrites en mots (`[warm, rising hope]`). Vérifier son `model_id` exact dans la documentation ElevenLabs avant d'appeler l'API. Les anciens modèles (`eleven_multilingual_v2`, Flash) ne comprennent pas les balises : ils les liraient à voix haute. Les `.txt` écrits avant le 26 octobre sont au format Eleven v3 (balises simples), que v4 comprend aussi.
- **Voix :** la voix clonée de Mr Zika seulement.
- **Stabilité :** « Natural » (0.5) ou « Creative » (0.0) ; « Robust » suit moins les balises.
- **En une fois** si le texte fait moins de 3 000 caractères (le format court y tient) ; sinon, un paragraphe (bloc séparé par une ligne vide) = un appel. Au format court (depuis le 26 octobre 2026), les cinq paragraphes suivent les parties du script : l'accroche de crise, l'histoire, toi et la vérité, le conseil (avec l'aide réelle si besoin), la question oui/non.
- **Format court :** 60 à 75 s (80 s avec la phrase d'aide). La vidéo se fait d'abord avec le visage et la vraie voix de Mr Zika ; la voix ElevenLabs est un dépannage.
- **Deux ou trois prises par morceau,** garder la meilleure, puis assembler.
- **Silences :** `…` = une respiration, `[pause]` ≈ 1 s, `[long pause]` = un silence long, à allonger au montage jusqu'à la durée notée dans le script (souvent 4 s).
- **Le thème n'est pas lu** : depuis le 26 octobre, c'est la couverture (miniature) de la vidéo ; à l'écran, seulement les sous-titres.
- **La phrase d'aide** (deuil, violence, idées noires) ne se coupe jamais et reste au moins 4 à 6 secondes à l'écran.
- Si la voix de la vidéo est générée : activer « Contenu généré par IA » sur TikTok.

## Le script du jour
Le dernier thème marqué « fait » dans [file-des-themes.md](../file-des-themes.md) donne le script du jour ; son `.txt` est ici, sous le même nom.
