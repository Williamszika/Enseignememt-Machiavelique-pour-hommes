export const meta = {
  name: 'texte-vers-scripts',
  description: "Mr Zika : l'agent expert en motivation lit un texte envoyé, en tire les thèmes et leur sens avec les mots du texte, le sculpte phrase par phrase et ajoute ses thèmes à la file quotidienne (un script de 1 min 20 à 3 min par jour) ; avec max_scripts > 0, il écrit aussi des scripts tout de suite, relus et corrigés",
  whenToUse: "Quand l'utilisateur envoie un texte (transcript, article) : d'abord l'enregistrer dans sources/NN-texte-integral.md, phrases numérotées, puis lancer ce workflow avec args {numero, source}",
  phases: [
    { title: 'Lire', detail: 'de quoi parle le texte, ses thèmes, leur sens, les mots du texte, le plan des scripts' },
    { title: 'Sculpter', detail: 'phrase par phrase, une partie par agent' },
    { title: 'Écrire', detail: 'un agent par script' },
    { title: 'Relire', detail: 'un relecteur exigeant par script, puis correction' },
    { title: 'Rassembler', detail: 'la fiche des thèmes et des scripts, et les thèmes ajoutés à la file quotidienne' },
  ],
}

// args : { numero: "41", source: "sources/41-texte-integral.md", sculpture: true, max_scripts: 0 }
// Par défaut (max_scripts: 0), aucun script n'est écrit tout de suite : les thèmes s'ajoutent à la fin de
// contenus/videos/2min/file-des-themes.md et la routine quotidienne en écrit un par jour.
// max_scripts: N > 0 écrit en plus N scripts immédiatement.
const A = args || {}
const NUM = String(A.numero || '').padStart(2, '0')
const SOURCE = A.source
if (!NUM || NUM === '00' || !SOURCE) throw new Error("args requis : {numero, source}")
const SCULPTURE = A.sculpture !== false
const MAX = (A.max_scripts === undefined || A.max_scripts === null) ? 0 : A.max_scripts

const AGENT = "Tu es l'agent « expert en motivation » du compte Mr Zika. Lis d'abord .claude/agents/expert-motivation.md et suis-le. Lis aussi personnage.md, contenus/videos/2min/README.md et la section « Machiavel (le vrai) » de glossaire.md. Travaille dans le dépôt /home/user/Enseignememt-Machiavelique-pour-hommes. Ne fais aucun commit git."

const REGLES = `Règles du compte (non négociables) :
- jamais de citation inventée : une phrase de Machiavel seulement si elle est dans la section « Machiavel (le vrai) » du glossaire ; une citation d'un auteur seulement si elle est vérifiée (sinon, on garde l'idée sans attribution) ;
- jamais de promesse magique (« l'univers te le rendra », « tu deviens magnétique »), jamais de honte (« tu ne mérites pas »), jamais de mépris : on secoue l'excuse, on respecte la personne ;
- pas de « toutes les femmes », pas de technique de manipulation, pas de mot qui déclenche la modération (soumission, dominée, dresser), on ne promet rien sur les autres ;
- deuil, violence, humiliation, contrôle, idées noires : jamais « c'est optionnel » ni « garde le silence » ; on oriente d'abord vers une aide réelle (une personne de confiance, un médecin, une ligne d'écoute) ;
- chaque phrase dite à « tu » marche pour une femme comme pour un homme (pas d'adjectif accordé avec « tu ») ;
- modèle « Face à toi » : l'histoire est racontée à la personne qui écoute, comme à quelqu'un assis en face ; elle est toujours présentée comme une histoire (« Appelons-la… »), jamais « je l'ai vu », jamais un fait réel ou un client ; aucun visage d'enfant dans le tournage.`

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
      duree: { type: 'string', description: 'durée visée, entre 0:60 et 1:15 (format court)' },
      histoire: { type: 'string', description: "En 3 lignes (modèle « Face à toi ») : la scène de la personne qui écoute (au présent, à « tu ») ; l'histoire à lui raconter (une personne, prénom, femme ou homme, un lieu, un problème, un moment qui touche, une phrase dite par quelqu'un, un tournant, une fin honnête) ; le seul geste à faire avec elle pendant la vidéo" },
      defi: { type: 'string', description: 'la question oui/non dite à la fin (un seul appel à l\'action)' },
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
4. Le plan de scripts, un par thème fort (de 3 à 15 selon la richesse du texte), classés du plus fort au moins fort : les thèmes les plus forts, un script peut réunir 1 à 3 thèmes proches. Pour chacun, au modèle « Face à toi » (contenus/videos/2min/modele-face-a-toi.md) : la scène de la personne qui écoute (son moment à elle, au présent, à « tu »), une histoire émouvante, sincère et SIMPLE à lui raconter comme à quelqu'un assis en face (une seule personne, chronologique, rien à deviner ; alterne héroïnes et héros), un seul geste à faire pendant la vidéo, une phrase à répéter et un mot à écrire en commentaire ; une durée entre 1:20 et 3:00. Pas deux histoires semblables.

${REGLES}`, { label: 'Lire tout le texte', phase: 'Lire', schema: CARTE })

if (!carte) throw new Error("La lecture du texte a échoué")
log(`${carte.themes.length} thèmes, ${carte.parties.length} parties, ${carte.scripts.length} scripts prévus`)
const scripts = carte.scripts.slice(0, MAX)
log(MAX ? `${scripts.length} scripts écrits maintenant, ${carte.scripts.length - scripts.length} ajoutés à la file` : `${carte.scripts.length} thèmes de scripts ajoutés à la file (un par jour)`)
const themesTexte = carte.themes.map(t =>
  `${t.id} — ${t.titre_ecran} (force ${t.force}/10)\nSens : ${t.sens}\nMots du texte : ${t.mots_du_texte.map(m => `${m.num} « ${m.phrase} »`).join(' ; ')}\nÀ corriger : ${t.a_corriger}`).join('\n\n')

const sculpter = () => parallel(carte.parties.map(p => () => agent(`${AGENT}

Mission 1 (sculpter) sur la partie « ${p.titre} » de ${SOURCE}, phrases ${p.premiere} à ${p.derniere}. Ne saute aucune phrase (regroupements de 3 phrases consécutives maximum, annoncés).
Écris analyses/${NUM}-sculpture-${p.id}.md : titre « Sculpture de la source ${NUM} — partie ${p.id} : ${p.titre} », deux lignes d'introduction (liens vers ../${SOURCE}), puis par sous-partie le tableau | N° | Ce que la phrase veut dire | Le levier | Verdict | Version Mr Zika |, « Ce que la partie enseigne vraiment », « Les deux meilleures phrases », « Un thème de script + une histoire à raconter à la personne qui écoute » ; à la fin, les thèmes les plus forts et les phrases jetées les plus dangereuses.
Thèmes déjà repérés dans tout le texte (pour cohérence) :
${themesTexte}

${REGLES}

Réponds en 3 lignes : phrases couvertes (vérifie qu'aucune ne manque), nombre Garder/Corriger/Jeter, chemin du fichier.`, { label: `Sculpter ${p.id}`, phase: 'Sculpter' })))

const RELU = { type: 'object', properties: {
  ok: { type: 'boolean', description: 'true seulement si le script passe TOUS les contrôles' },
  duree_estimee: { type: 'string' },
  problemes: { type: 'array', items: { type: 'string' }, description: 'chaque problème précis, avec la ligne concernée et la correction attendue' },
}, required: ['ok', 'duree_estimee', 'problemes'] }

const ecrire = () => !scripts.length ? Promise.resolve([]) : pipeline(scripts,
  (s) => agent(`${AGENT}

Mission 2 (écrire un script) avec la méthode du skill script-motivation-realisation (modèle : contenus/videos/2min/source-40-ose-le-brouillon.md ; registre : contenus/videos/2min/registre-m-zika.md ; 2 min au maximum). Écris contenus/videos/2min/source-${NUM}-${s.slug}.md, sur le modèle « Face à toi » : contenus/videos/2min/modele-face-a-toi.md.
Le script :
- commence par LE THÈME BIEN AFFICHÉ DEVANT : « ${s.titre_ecran} », seul à l'écran, avant toute parole ;
- puis « Je te vois » : « Attends. C'est à toi que je parle. », la scène de la personne qui écoute en deux ou trois phrases, et « Je vais te raconter une histoire. » ;
- puis « L'histoire, racontée à toi » : racontée comme à quelqu'un assis en face (« Tu sais ce qu'elle répond ? », « Attends, la suite. », « Tu imagines ? »), toujours présentée comme une histoire : ${s.histoire}
- puis « Ce que tu te dis » (la voix dans sa tête, citée, puis démontée), « Si j'étais assis en face de toi » (la vérité du thème, dite doucement, avec deux à quatre phrases du texte, pas plus), « Fais-le avec moi, maintenant » (un seul geste fait pendant la vidéo, silences notés ; l'aide réelle ici si le thème l'exige), « Mon conseil pour toi » (un conseil très motivant pour la vie, la voix qui monte : « Et maintenant, écoute mon conseil. », une règle claire, une phrase forte ; puis la phrase à répéter et le mot à écrire en commentaire : ${s.defi}) ; une dernière phrase à l'impératif ;
- utilise LES MOTS DU TEXTE avec mesure : reprends deux à quatre phrases du texte (dans leur version juste, corrigée si besoin), le reste en mots simples, sur les thèmes ${s.themes.join(', ')} :
${carte.themes.filter(t => s.themes.includes(t.id)).map(t => `${t.id} — ${t.titre_ecran} : ${t.sens}\nMots du texte : ${t.mots_du_texte.map(m => `${m.num} « ${m.phrase} »`).join(' ; ')}\nÀ corriger : ${t.a_corriger}`).join('\n\n')}
- FORMAT COURT (depuis le 26 octobre 2026, section « Le format court fait foi » du README) : durée visée ${s.duree}, 40 s à 2 min au maximum (90 s par défaut), skill script-motivation-realisation ; l'histoire : question, réponse, déclic, décision, puis le lendemain ; le conseil dit pourquoi (« Pourquoi ? Parce que… » : ce que ça apporte, permet, évite) ; ouvrir sur le moment de crise, morale à la fin, un seul appel à l'action (la question oui/non), sous-titres seulement, le thème en couverture ; ceci remplace la structure longue ci-dessus si elle la contredit ;
- en tête du fichier : durée, thèmes couverts, les phrases du texte reprises (avec leur numéro et un lien vers ../../../${SOURCE}), le défi, le mot à écrire ; puis le script minuté (indications entre parenthèses, mots en gras), le texte à l'écran, le tournage (un seul cadre, comme un appel vidéo), la légende (3 à 5 hashtags dont #MrZika, rappelle la phrase et le mot à écrire).

${REGLES}

Réponds en 2 lignes : le chemin du fichier et le nombre de mots parlés.`, { label: `Écrire ${s.slug}`, phase: 'Écrire' }),
  (res, s) => agent(`Tu es un relecteur exigeant, chargé de REFUSER un script de motivation qui n'est pas excellent. Lis contenus/videos/2min/source-${NUM}-${s.slug}.md, puis contenus/videos/2min/README.md, .claude/agents/expert-motivation.md, et le texte ${SOURCE}. Ne modifie rien.
Contrôle chaque point, et liste chaque problème précisément :
1. Le thème « ${s.titre_ecran} » s'affiche seul, au tout début, avant toute parole.
2. Modèle « Face à toi » : « C'est à toi que je parle » dans les premières secondes ; l'histoire est émouvante, simple, comprise à la première écoute, racontée À la personne (questions, apartés), et présentée comme une histoire (jamais « je l'ai vu »).
3. Les parties sont là, dans l'ordre : Je te vois, L'histoire racontée à toi, Ce que tu te dis, Si j'étais assis en face de toi, Fais-le avec moi maintenant (un seul geste, silences notés), Mon conseil pour toi (un conseil très motivant, concret, pour la vie ; puis la phrase à répéter et le mot à écrire en commentaire), une dernière phrase à l'impératif.
4. Deux à quatre phrases viennent vraiment du texte (vérifie les numéros et l'exactitude), et aucune n'est une idée que l'analyse ou la carte a jugée fausse.
5. Durée : 2 min au maximum (≈ 260 mots), déclic et décision dans l'histoire, « pourquoi » dans le conseil, ouverture sur la crise, un seul appel à l'action (question oui/non).
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
Vérifie que chaque fichier de script existe avant de le lier.
Puis AJOUTE À LA FIN du tableau de contenus/videos/2min/file-des-themes.md une ligne par script prévu qui n'a pas encore été écrit, dans l'ordre (du plus fort au moins fort), sans toucher aux lignes existantes : N° (à la suite), « Jour prévu » (le jour qui suit le dernier jour prévu du tableau), « Thème à l'écran », « D'où il vient » (Source ${NUM}, partie, numéros de phrases), « Idée d'histoire », « à faire », et une colonne Script vide. Les scripts prévus : ${carte.scripts.map(s => `${s.titre_ecran} — thèmes ${s.themes.join('+')} — histoire : ${s.histoire} — défi : ${s.defi}`).join(' || ')}. Les scripts déjà écrits maintenant (à marquer « fait » avec leur lien) : ${scripts.map(s => `source-${NUM}-${s.slug}.md`).join(', ') || 'aucun'}.
Réponds en une ligne : le chemin de la fiche et le nombre de thèmes ajoutés à la file.`, { label: 'Fiche des thèmes et des scripts', phase: 'Rassembler' })

return {
  resume: carte.resume,
  themes: carte.themes.map(t => ({ id: t.id, titre: t.titre_ecran, sens: t.sens, force: t.force })),
  scripts: resultats.filter(Boolean).map(r => ({ fichier: `contenus/videos/2min/source-${NUM}-${r.slug}.md`, relu_ok_du_premier_coup: r.ok, corrige: r.corrige, duree: r.duree })),
  sculptures: (sculptures || []).filter(Boolean),
  fiche: `analyses/${NUM}-themes-et-scripts.md`,
}
