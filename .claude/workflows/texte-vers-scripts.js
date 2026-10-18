export const meta = {
  name: 'texte-vers-scripts',
  description: "Mr Zika : l'agent expert en motivation lit un texte envoyé, en tire les thèmes et leur sens avec les mots du texte, le sculpte phrase par phrase et écrit des scripts vidéo de 1 min 20 à 3 min (thème à l'écran, histoire, motivation), relus et corrigés",
  whenToUse: "Quand l'utilisateur envoie un texte (transcript, article) : d'abord l'enregistrer dans sources/NN-texte-integral.md, phrases numérotées, puis lancer ce workflow avec args {numero, source}",
  phases: [
    { title: 'Lire', detail: 'de quoi parle le texte, ses thèmes, leur sens, les mots du texte, le plan des scripts' },
    { title: 'Sculpter', detail: 'phrase par phrase, une partie par agent' },
    { title: 'Écrire', detail: 'un agent par script' },
    { title: 'Relire', detail: 'un relecteur exigeant par script, puis correction' },
    { title: 'Rassembler', detail: 'la fiche des thèmes et des scripts' },
  ],
}

// args : { numero: "41", source: "sources/41-texte-integral.md", sculpture: true, max_scripts: 5 }
const A = args || {}
const NUM = String(A.numero || '').padStart(2, '0')
const SOURCE = A.source
if (!NUM || NUM === '00' || !SOURCE) throw new Error("args requis : {numero, source}")
const SCULPTURE = A.sculpture !== false
const MAX = A.max_scripts || 5

const AGENT = "Tu es l'agent « expert en motivation » du compte Mr Zika. Lis d'abord .claude/agents/expert-motivation.md et suis-le. Lis aussi personnage.md, contenus/videos/2min/README.md et la section « Machiavel (le vrai) » de glossaire.md. Travaille dans le dépôt /home/user/Enseignememt-Machiavelique-pour-hommes. Ne fais aucun commit git."

const REGLES = `Règles du compte (non négociables) :
- jamais de citation inventée : une phrase de Machiavel seulement si elle est dans la section « Machiavel (le vrai) » du glossaire ; une citation d'un auteur seulement si elle est vérifiée (sinon, on garde l'idée sans attribution) ;
- jamais de promesse magique (« l'univers te le rendra », « tu deviens magnétique »), jamais de honte (« tu ne mérites pas »), jamais de mépris : on secoue l'excuse, on respecte la personne ;
- pas de « toutes les femmes », pas de technique de manipulation, pas de mot qui déclenche la modération (soumission, dominée, dresser), on ne promet rien sur les autres ;
- deuil, violence, humiliation, contrôle, idées noires : jamais « c'est optionnel » ni « garde le silence » ; on oriente d'abord vers une aide réelle (une personne de confiance, un médecin, une ligne d'écoute) ;
- chaque phrase dite à « tu » marche pour une femme comme pour un homme (pas d'adjectif accordé avec « tu ») ;
- les histoires sont présentées comme des histoires (« écoute l'histoire de… »), jamais comme un fait réel ou un client ; aucun visage d'enfant dans le tournage.`

const CARTE = {
  type: 'object',
  properties: {
    resume: { type: 'string', description: "De quoi parle le texte, en 3 à 5 phrases simples" },
    parties: { type: 'array', items: { type: 'object', properties: {
      id: { type: 'string', description: 'A, B, C… ou 1, 2, 3…' },
      titre: { type: 'string' },
      premiere: { type: 'string', description: 'numéro de la première phrase, ex. A-001' },
      derniere: { type: 'string', description: 'numéro de la dernière phrase, ex. A-387' },
    }, required: ['id', 'titre', 'premiere', 'derniere'] } },
    themes: { type: 'array', items: { type: 'object', properties: {
      id: { type: 'string', description: 'T1, T2…' },
      titre_ecran: { type: 'string', description: "Le thème tel qu'il s'affiche à l'écran, 2 à 6 mots, en majuscules" },
      sens: { type: 'string', description: "Ce que le thème veut dire, en 2 ou 3 phrases simples" },
      mots_du_texte: { type: 'array', items: { type: 'object', properties: {
        num: { type: 'string', description: 'numéro de la phrase, ex. B-312' },
        phrase: { type: 'string', description: 'la phrase exacte du texte' },
      }, required: ['num', 'phrase'] }, description: '3 à 8 phrases exactes du texte qui portent ce thème' },
      a_corriger: { type: 'string', description: "Ce que le texte dit de faux ou de dangereux sur ce thème, et la correction (ou « rien »)" },
      force: { type: 'integer', description: 'de 1 à 10 : combien ce thème peut changer la façon de voir de quelqu’un' },
    }, required: ['id', 'titre_ecran', 'sens', 'mots_du_texte', 'a_corriger', 'force'] } },
    scripts: { type: 'array', items: { type: 'object', properties: {
      slug: { type: 'string', description: 'nom de fichier court, minuscules et tirets, ex. tomber-n-est-pas-echouer' },
      titre_ecran: { type: 'string', description: "Le ou les thèmes affichés au début, ex. « TOMBER N'EST PAS ÉCHOUER »" },
      themes: { type: 'array', items: { type: 'string' }, description: 'ids des thèmes couverts (1 à 3)' },
      duree: { type: 'string', description: 'durée visée, entre 1:20 et 3:00' },
      histoire: { type: 'string', description: "L'idée d'histoire en 3 lignes : une personne (prénom, femme ou homme), un lieu, un problème, un moment qui touche, une phrase dite par quelqu'un, un tournant, une fin claire" },
      defi: { type: 'string', description: 'le défi et le mot à écrire en commentaire' },
    }, required: ['slug', 'titre_ecran', 'themes', 'duree', 'histoire', 'defi'] } },
  },
  required: ['resume', 'parties', 'themes', 'scripts'],
}

phase('Lire')
const carte = await agent(`${AGENT}

Lis EN ENTIER le texte ${SOURCE} (phrases numérotées). Si une analyse existe déjà (analyses/${NUM}-*.md), lis-la : ses corrections font foi.
Réponds :
1. De quoi parle le texte (résumé simple).
2. Ses parties (vidéos, chapitres, leçons) avec la première et la dernière phrase de chacune ; toutes les phrases doivent être dans une partie.
3. Tous les thèmes qu'il fait ressortir (souvent 5 à 12) : pour chacun, le titre à afficher à l'écran, ce qu'il veut dire, 3 à 8 phrases EXACTES du texte (avec leur numéro) qui le portent, ce que le texte dit de faux ou de dangereux à son sujet, et sa force.
4. Le plan de ${MAX} scripts au plus (au moins 2) : les thèmes les plus forts, un script peut réunir 1 à 3 thèmes proches. Pour chacun, une histoire émouvante, sincère et SIMPLE (une seule personne, chronologique, rien à deviner ; alterne héroïnes et héros), une durée entre 1:20 et 3:00 selon la richesse du thème, et un défi avec un mot à écrire en commentaire. Pas deux histoires semblables.

${REGLES}`, { label: 'Lire tout le texte', phase: 'Lire', schema: CARTE })

if (!carte) throw new Error("La lecture du texte a échoué")
log(`${carte.themes.length} thèmes, ${carte.parties.length} parties, ${carte.scripts.length} scripts prévus`)
const scripts = carte.scripts.slice(0, MAX)
if (carte.scripts.length > MAX) log(`${carte.scripts.length - MAX} scripts proposés laissés de côté (max_scripts = ${MAX})`)
const themesTexte = carte.themes.map(t =>
  `${t.id} — ${t.titre_ecran} (force ${t.force}/10)\nSens : ${t.sens}\nMots du texte : ${t.mots_du_texte.map(m => `${m.num} « ${m.phrase} »`).join(' ; ')}\nÀ corriger : ${t.a_corriger}`).join('\n\n')

const sculpter = () => parallel(carte.parties.map(p => () => agent(`${AGENT}

Mission 1 (sculpter) sur la partie « ${p.titre} » de ${SOURCE}, phrases ${p.premiere} à ${p.derniere}. Ne saute aucune phrase (regroupements de 3 phrases consécutives maximum, annoncés).
Écris analyses/${NUM}-sculpture-${p.id}.md : titre « Sculpture de la source ${NUM} — partie ${p.id} : ${p.titre} », deux lignes d'introduction (liens vers ../${SOURCE}), puis par sous-partie le tableau | N° | Ce que la phrase veut dire | Le levier | Verdict | Version Mr Zika |, « Ce que la partie enseigne vraiment », « Les deux meilleures phrases », « Un thème de script + une histoire émouvante possible » ; à la fin, les thèmes les plus forts et les phrases jetées les plus dangereuses.
Thèmes déjà repérés dans tout le texte (pour cohérence) :
${themesTexte}

${REGLES}

Réponds en 3 lignes : phrases couvertes (vérifie qu'aucune ne manque), nombre Garder/Corriger/Jeter, chemin du fichier.`, { label: `Sculpter ${p.id}`, phase: 'Sculpter' })))

const RELU = { type: 'object', properties: {
  ok: { type: 'boolean', description: 'true seulement si le script passe TOUS les contrôles' },
  duree_estimee: { type: 'string' },
  problemes: { type: 'array', items: { type: 'string' }, description: 'chaque problème précis, avec la ligne concernée et la correction attendue' },
}, required: ['ok', 'duree_estimee', 'problemes'] }

const ecrire = () => pipeline(scripts,
  (s) => agent(`${AGENT}

Mission 2 (écrire un script). Écris contenus/videos/2min/source-${NUM}-${s.slug}.md, sur le modèle de contenus/videos/2min/source-40-tomber-n-est-pas-echouer.md.
Le script :
- commence par LE THÈME BIEN AFFICHÉ DEVANT : « ${s.titre_ecran} », seul à l'écran, avant toute parole ;
- puis l'histoire, émouvante et sincère, simple et claire : ${s.histoire}
- puis la motivation : « Et toi ? », « Alors écoute-moi bien » (la vérité du thème), « Pas demain. Ce soir. » et le conseil (deux ou trois gestes), deux ou trois phrases qui restent, puis le défi en face : ${s.defi} ; une dernière phrase à l'impératif ;
- utilise LES MOTS DU TEXTE : reprends au moins trois phrases du texte (dans leur version juste, corrigée si besoin), sur les thèmes ${s.themes.join(', ')} :
${carte.themes.filter(t => s.themes.includes(t.id)).map(t => `${t.id} — ${t.titre_ecran} : ${t.sens}\nMots du texte : ${t.mots_du_texte.map(m => `${m.num} « ${m.phrase} »`).join(' ; ')}\nÀ corriger : ${t.a_corriger}`).join('\n\n')}
- durée visée ${s.duree} (entre 1:20 et 3:00 ; environ 150 mots par minute en comptant les silences) ;
- en tête du fichier : durée, thèmes couverts, les phrases du texte reprises (avec leur numéro et un lien vers ../../../${SOURCE}), le défi, le mot à écrire ; puis le script minuté (indications entre parenthèses, mots en gras), le texte à l'écran, le tournage, la légende (3 à 5 hashtags dont #MrZika, finit par une question en « toi » et rappelle le défi).

${REGLES}

Réponds en 2 lignes : le chemin du fichier et le nombre de mots parlés.`, { label: `Écrire ${s.slug}`, phase: 'Écrire' }),
  (res, s) => agent(`Tu es un relecteur exigeant, chargé de REFUSER un script de motivation qui n'est pas excellent. Lis contenus/videos/2min/source-${NUM}-${s.slug}.md, puis contenus/videos/2min/README.md, .claude/agents/expert-motivation.md, et le texte ${SOURCE}. Ne modifie rien.
Contrôle chaque point, et liste chaque problème précisément :
1. Le thème « ${s.titre_ecran} » s'affiche seul, au tout début, avant toute parole.
2. L'histoire est émouvante, sincère, et comprise à la première écoute (une personne, chronologique, rien à deviner) ; elle est présentée comme une histoire.
3. La motivation parle en face à la personne (« toi »), relie l'histoire au thème, donne un conseil concret, un défi vérifiable et un mot à écrire en commentaire.
4. Au moins trois phrases viennent vraiment du texte (vérifie les numéros et l'exactitude), et aucune n'est une idée que l'analyse ou la carte a jugée fausse.
5. Durée entre 1:20 et 3:00 (compte les mots parlés : environ 150 par minute).
6. Aucune citation inventée ou mal attribuée ; aucune promesse magique ; aucune honte ; rien pour seulement les hommes ou seulement les femmes ; pas d'adjectif accordé avec « tu ».
7. Deuil, violence, idées noires : aide réelle si le thème y touche.
8. Phrases courtes, actives, qu'on a envie de dire à voix haute.
${REGLES}`, { label: `Relire ${s.slug}`, phase: 'Relire', schema: RELU })
    .then(r => ({ relu: r, ecrit: res })),
  (x, s) => (!x || !x.relu || x.relu.ok) ? { slug: s.slug, ok: x && x.relu ? x.relu.ok : null, duree: x && x.relu ? x.relu.duree_estimee : null, corrige: false } :
    agent(`${AGENT}

Corrige contenus/videos/2min/source-${NUM}-${s.slug}.md en traitant CHAQUE problème relevé par le relecteur, sans rien perdre de ce qui marche :
${x.relu.problemes.map((p, i) => `${i + 1}. ${p}`).join('\n')}

${REGLES}

Réponds en 2 lignes : ce que tu as changé, et le nombre de mots parlés.`, { label: `Corriger ${s.slug}`, phase: 'Relire' })
      .then(() => ({ slug: s.slug, ok: false, duree: x.relu.duree_estimee, corrige: true, problemes: x.relu.problemes })))

const [sculptures, resultats] = await Promise.all([SCULPTURE ? sculpter() : Promise.resolve([]), ecrire()])

phase('Rassembler')
await agent(`${AGENT}

Écris analyses/${NUM}-themes-et-scripts.md, la fiche que Mr Zika lira en premier :
- « De quoi parle le texte » : ${carte.resume}
- « Les thèmes du texte » : pour chaque thème, le titre à l'écran, ce qu'il veut dire, les mots du texte (numéro + phrase exacte), ce qu'il faut corriger. Les thèmes :
${themesTexte}
- « Les scripts » : pour chacun, le lien vers contenus/videos/2min/source-${NUM}-<slug>.md (chemin relatif depuis analyses/ : ../contenus/videos/2min/…), le thème affiché, la durée, le défi. Scripts : ${scripts.map(s => `${s.slug} (${s.titre_ecran}, ${s.duree}, défi : ${s.defi})`).join(' ; ')}
- « La sculpture phrase par phrase » : les liens vers analyses/${NUM}-sculpture-*.md ${SCULPTURE ? '' : '(non faite cette fois)'}
- Une ligne vers le texte : ../${SOURCE}
Vérifie que chaque fichier de script existe avant de le lier. Réponds en une ligne : le chemin de la fiche.`, { label: 'Fiche des thèmes et des scripts', phase: 'Rassembler' })

return {
  resume: carte.resume,
  themes: carte.themes.map(t => ({ id: t.id, titre: t.titre_ecran, sens: t.sens, force: t.force })),
  scripts: resultats.filter(Boolean).map(r => ({ fichier: `contenus/videos/2min/source-${NUM}-${r.slug}.md`, relu_ok_du_premier_coup: r.ok, corrige: r.corrige, duree: r.duree })),
  sculptures: (sculptures || []).filter(Boolean),
  fiche: `analyses/${NUM}-themes-et-scripts.md`,
}
