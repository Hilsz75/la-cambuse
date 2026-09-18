"use strict";

/* =========================================================================
   La Cambuse — implémentation statique HTML/CSS/JS du prototype Claude Design
   Connexion simulée (pas de vrai backend), fidèle au comportement du canvas.
   ========================================================================= */

const STAR = "polygon(50% 0%,57% 6%,64% 1%,69% 9%,77% 5%,80% 14%,89% 12%,89% 21%,98% 22%,95% 30%,100% 38%,94% 44%,97% 53%,90% 57%,91% 66%,83% 68%,81% 77%,73% 76%,68% 84%,61% 81%,53% 87%,47% 81%,39% 84%,34% 76%,26% 77%,24% 68%,16% 66%,17% 57%,10% 53%,13% 44%,7% 38%,12% 30%,9% 22%,18% 21%,18% 12%,27% 14%,30% 5%,38% 9%,43% 1%,50% 6%)";

const FAMILIES = [
  { name: "Besoins physiologiques et de santé", color: "#F0A81C", ink: "#191713",
    short: "Incluent l'alimentation, le sommeil, l'hygiène et la santé physique. Ils garantissent les bases nécessaires pour grandir, apprendre et se développer dans de bonnes conditions.",
    p1: "Les besoins physiologiques et de santé constituent la base indispensable au développement global des jeunes. Alimentation, sommeil, hygiène et accès aux soins ne concernent pas uniquement le corps : ils influencent directement la capacité de concentration, la régulation émotionnelle et la construction de l'estime de soi.",
    p2: "Un manque de satisfaction de ces besoins fondamentaux peut fragiliser l'équilibre psychologique, générer de l'anxiété, affecter la réussite scolaire et entraver les relations sociales. Chaque signe de négligence ou de carence doit donc être considéré comme un indicateur majeur du vécu et du bien-être du jeune.",
    p3: "En tant que professionnels, il est essentiel d'accorder une attention particulière à ces besoins de base, non seulement pour protéger la santé physique, mais aussi pour créer les conditions d'une sécurité affective et d'un développement psychologique harmonieux.",
    subs: ["Activité physique / sport", "Hygiène corporelle", "Alimentation", "Sommeil", "Hygiène bucco-dentaire", "Vêtements", "Manger à sa faim", "Consommation réseaux sociaux", "Consommation jeux vidéos", "Consommation cannabis", "Consommation tabac", "Consommation écrans", "Consommation alcool", "Dépendances", "Relation avec la nourriture", "Sexualité", "Santé physique", "Santé mentale", "Connaissance du réseau santé", "Contraception"] },
  { name: "Besoin d'expérience et d'exploration du monde", color: "#17A05B", ink: "#FFFFFF",
    short: "Découvrir, essayer, se tromper, recommencer : l'expérience directe du monde construit la confiance et ouvre des possibles que le discours seul n'atteint pas.",
    p1: "Explorer le monde, c'est se confronter au réel : tester une activité, rencontrer d'autres milieux, se déplacer seul, découvrir un métier. Ces expériences produisent des apprentissages qu'aucun entretien ne peut remplacer.",
    p2: "Un jeune privé d'expériences manque de points de comparaison pour se projeter : l'horizon se rétrécit, l'inconnu devient menaçant et l'orientation se fait par défaut.",
    p3: "Le rôle du professionnel est de provoquer des premières fois accompagnées, de sécuriser la prise de risque, puis d'aider le jeune à relire avec lui ce qu'il en retient.",
    subs: ["Sorties culturelles", "Découverte des métiers", "Mobilité et transports", "Sport et nature", "Séjours et camps", "Engagement citoyen", "Créativité", "Vie associative", "Usages du numérique", "Ouverture internationale"] },
  { name: "Besoin de protection", color: "#1E8FE0", ink: "#FFFFFF",
    short: "Être protégé des violences, des négligences et des situations de danger, et savoir vers qui se tourner quand la sécurité n'est plus assurée.",
    p1: "La protection est le préalable de toute relation de confiance : un jeune qui ne se sent pas en sécurité ne se raconte pas, ou raconte ce qu'on attend de lui.",
    p2: "Violences subies, négligences, exposition au danger ou cyberharcèlement laissent des traces durables, souvent exprimées par la fuite, l'agressivité ou l'isolement plutôt que par la parole.",
    p3: "Le professionnel identifie les figures protectrices du jeune, repère les signaux, tient le cadre de la protection de l'enfance et explique au jeune ses droits et les recours existants.",
    subs: ["Figures protectrices", "Violences physiques", "Violences psychologiques", "Négligences", "Cyberharcèlement", "Droits du jeune", "Situations de danger", "Ressources d'urgence", "Sécurité du lieu de vie"] },
  { name: "Besoin d'estime de soi et de valorisation de soi", color: "#D6408F", ink: "#FFFFFF",
    short: "Se sentir capable, reconnu et utile. L'estime de soi se construit par des réussites réelles, nommées et partagées avec d'autres.",
    p1: "Beaucoup de jeunes accompagnés arrivent avec un long récit d'échecs. Sans réussites visibles et récentes, aucun objectif ne paraît atteignable et toute proposition devient une menace supplémentaire.",
    p2: "La dévalorisation se traduit par le renoncement anticipé, l'opposition défensive ou une dépendance forte au regard du groupe.",
    p3: "Le professionnel crée des occasions de réussite accessibles, rend les progrès visibles et distingue toujours l'acte du jeune de sa valeur en tant que personne.",
    subs: ["Réussites et progrès", "Image de soi", "Prise de parole", "Compétences valorisables", "Rapport à l'échec", "Reconnaissance par le groupe", "Corps et apparence", "Place dans le collectif"] },
  { name: "Besoin de cadre, de repères et de limites", color: "#4B4FA6", ink: "#FFFFFF",
    short: "Des règles claires, stables et expliquées permettent au jeune de savoir où il est, ce qu'il peut attendre et ce qu'on attend de lui.",
    p1: "Le cadre n'est pas une contrainte ajoutée à l'accompagnement : il est ce qui rend l'environnement prévisible, et donc supportable.",
    p2: "Quand les règles varient d'un adulte à l'autre, le jeune teste la limite jusqu'à la trouver : transgressions répétées, conflits d'autorité, angoisse face à l'imprévisible.",
    p3: "Le professionnel pose des règles peu nombreuses et tenues, en explique le sens, reste cohérent avec l'équipe et privilégie la réparation à la punition.",
    subs: ["Règles du lieu de vie", "Rythmes et horaires", "Gestion des conflits", "Rapport à l'autorité", "Responsabilités", "Sanction et réparation", "Cohérence d'équipe", "Scolarité et assiduité"] },
  { name: "Besoin d'identité", color: "#B3B0AA", ink: "#191713",
    short: "Savoir d'où l'on vient, qui l'on est et qui l'on devient : histoire familiale, culture, genre, croyances et projets de vie.",
    p1: "Construire un projet suppose un récit de soi tenable. Les ruptures de parcours, les placements successifs et les silences familiaux fragmentent ce récit.",
    p2: "Le sentiment de vide identitaire ouvre la porte aux identifications de substitution, à la rupture avec l'histoire familiale ou au refus de se projeter.",
    p3: "Le professionnel aide le jeune à rassembler son histoire, accueille ses questionnements sans les orienter et travaille avec la famille chaque fois que c'est possible.",
    subs: ["Histoire familiale", "Origines et culture", "Identité de genre", "Orientation affective", "Croyances", "Papiers et statut", "Récit de soi", "Projet de vie"] },
  { name: "Besoin de sécurité affective et relationnelle", color: "#F2707A", ink: "#191713",
    short: "Compter pour quelqu'un, disposer de liens stables et savoir que la relation résiste au conflit comme à l'absence.",
    p1: "La qualité des liens détermine la capacité du jeune à demander de l'aide et à supporter les frustrations inévitables de son parcours.",
    p2: "Des attachements insécures produisent des ruptures provoquées, une dépendance intense ou, à l'inverse, un évitement relationnel et de l'isolement.",
    p3: "Le professionnel garantit la continuité de la relation, annonce les départs et les changements, et soutient les liens familiaux et amicaux existants.",
    subs: ["Liens familiaux", "Amitiés", "Relations amoureuses", "Confiance en l'adulte", "Gestion des émotions", "Solitude", "Ruptures et séparations", "Vie affective du groupe"] }
];

const DOCS = {
  ateliers: {
    title: "Ateliers",
    intro: "Retrouvez ici des ateliers pratiques conçus pour aider les jeunes à mieux comprendre et intégrer ce besoin dans leur quotidien. Ces supports offrent des idées d'activités simples, ludiques et directement utilisables dans l'accompagnement.",
    items: [
      { title: "Comment bien se brosser les dents.pdf", size: "4,8 Mo" },
      { title: "Les brosses à dents autour du monde.pdf", size: "2,1 Mo" },
      { title: "J'ai peur d'aller chez le dentiste.pdf", size: "3,4 Mo" },
      { title: "Mon journal de brossage (1 semaine).pdf", size: "0,9 Mo" }
    ] },
  infos: {
    title: "Infos pratiques",
    intro: "Accédez à des guides et documents concrets pour appliquer ce besoin dans la vie quotidienne des jeunes. Ces ressources vous aident à mettre en place des gestes simples et à assurer un suivi efficace.",
    items: [
      { title: "Les recommandations de l'AHS pour une bonne hygiène bucco-dentaire.pdf", size: "5,2 Mo" },
      { title: "Formulaire CERFA n. 785/9 pour RDV dentaire annuel.pdf", size: "0,4 Mo" },
      { title: "Orienter vers un centre de santé : mode d'emploi.pdf", size: "1,6 Mo" }
    ] },
  textes: {
    title: "Textes / apport théorique",
    intro: "Découvrez des analyses et réflexions qui éclairent l'importance de ce besoin. Ces textes offrent un cadre théorique pour mieux comprendre ses impacts sur le développement et la santé globale.",
    items: [
      { title: "Pourquoi les enfants ont peur d'aller chez le dentiste selon Dr. MACHIN.pdf", size: "6,1 Mo" },
      { title: "Comment l'hygiène bucco-dentaire affecte l'état général de santé.pdf", size: "4,3 Mo" }
    ] },
  partenaires: {
    title: "Partenaires",
    intro: "Retrouvez ici les contacts de professionnels et de structures partenaires. Ils constituent un réseau de soutien et de collaboration pour accompagner vos actions auprès des jeunes." }
};

const PARTNERS = [
  { city: "Meudon", dept: "Hauts-de-Seine", spec: "Dentiste", contact: "Dr. DUPONT", addr: "78 rue Diderot", cityLine: "Meudon", tel: "12 34 56 78 91" },
  { city: "Boulogne-Billancourt", dept: "Hauts-de-Seine", spec: "Orthodontiste", contact: "Dr. DUJARDIN", addr: "888 rue de la Paix", cityLine: "Boulogne-Billancourt", tel: "87 42 68 39" },
  { city: "Paris 14e", dept: "Île-de-France", spec: "Centre dentaire", contact: "Centre Dentaire de l'Assurance Maladie", addr: "89 rue du Général", cityLine: "Paris 14", tel: "78 59 46 20 34" }
];

const THREADS = [
  { name: "Nadia B.", initials: "NB", role: "Éducatrice spécialisée", date: "12 mars 2026", likes: 5,
    text: "L'atelier « journal de brossage » fonctionne bien en petit groupe le samedi matin. On l'a couplé à un passage en pharmacie pour choisir sa propre brosse à dents : l'appropriation change complètement.",
    replies: [
      { name: "Thomas R.", initials: "TR", date: "13 mars 2026", text: "Nous l'avons repris sur trois semaines plutôt qu'une, avec un point hebdomadaire. Moins de décrochage au bout de quatre jours." },
      { name: "Awa D.", initials: "AD", date: "14 mars 2026", text: "Pensez à prévoir une version en pictogrammes : deux jeunes non lecteurs ont pu suivre l'atelier sans aide." }
    ] },
  { name: "Julien M.", initials: "JM", role: "Psychologue", date: "4 mars 2026", likes: 12,
    text: "Attention à ne pas transformer le suivi en outil de contrôle. Nous le remplissons avec le jeune, à l'oral, et il garde la fiche : la restitution change la portée de l'exercice.",
    replies: [
      { name: "Nadia B.", initials: "NB", date: "5 mars 2026", text: "D'accord, et l'annoncer dès le départ évite le sentiment d'évaluation. On le précise maintenant dans la consigne." }
    ] }
];

const TOOLS = [
  { name: "Jeu de cartes « Horizons »", key: "horizons", tagline: "Le point de départ de tout le parcours",
    body: "Ce jeu a été créé pour identifier et prioriser les besoins fondamentaux pour et avec le jeune. À travers un processus ludique, visuel et structuré en plusieurs phases, il favorise l'expression de ses attentes : sa parole est écoutée dans son intégralité et la personne accompagnée est au cœur de son projet." },
  { name: "Cahier « Mon Cap »" },
  { name: "Grille d'analyse « La Vigie »" },
  { name: "Plateforme « La Cambuse »", key: "cambuse", tagline: "Une boîte à outils partagée et vivante",
    body: "La Cambuse met à disposition des ressources concrètes pour chaque carte Horizons : ateliers éducatifs, infos pratiques, textes théoriques, partenaires mobilisables. Interactive et évolutive, elle permet aux professionnels de proposer et d'adapter des outils en fonction des besoins identifiés." },
  { name: "PPJ « L'Ancre »" },
  { name: "Lutin individuel « Timon »" },
  { name: "Cahier de sortie « Le Gouvernail »" }
];

const PROFILE = {
  firstName: "Camille", lastName: "Durand", initials: "C",
  role: "Éducatrice spécialisée", institution: "Association CidadeDeDeus",
  email: "camille.durand@association.fr", phone: "06 12 34 56 78"
};

/* ---------------------------------------------------------------------- */

const state = {
  page: "home", auth: false, family: 0, sub: null, tab: "ateliers", openTool: null,
  pendingFamily: null, loginFrom: null, menuOpen: false, alertsOpen: false, searchOpen: false, query: "",
  likes: THREADS.map((t) => t.likes)
};

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
/* JS string literal, then HTML-attribute-escaped so it's safe inside onclick="..." even
   when the value itself contains quotes or apostrophes (e.g. "Rapport à l'échec"). */
function jsStr(v) {
  return esc(JSON.stringify(v));
}
function norm(v) {
  return String(v).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/* ---------------------------------------------------------------------- */
/* Actions                                                                 */
/* ---------------------------------------------------------------------- */

const A = {};

A.go = (page) => { state.page = page; render(); window.scrollTo(0, 0); };

A.requireFamily = (i) => {
  if (state.auth) { state.page = "zoom"; state.family = i; render(); window.scrollTo(0, 0); }
  else { state.page = "login"; state.loginFrom = "family"; state.pendingFamily = i; render(); window.scrollTo(0, 0); }
};

A.doLogin = () => {
  if (state.loginFrom === "family") { state.auth = true; state.page = "zoom"; state.family = state.pendingFamily ?? 0; state.loginFrom = null; }
  else { state.auth = true; state.page = "home"; state.loginFrom = null; }
  render(); window.scrollTo(0, 0);
};

function scrollToSection(id) {
  const jump = (smooth) => {
    const el = document.getElementById(id);
    if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: smooth ? "smooth" : "auto" }); return true; }
    return false;
  };
  if (jump(true)) return;
  state.page = "home"; render();
  setTimeout(() => jump(false), 80);
}
A.scrollMethode = () => scrollToSection("methode");
A.scrollFamilles = () => scrollToSection("familles");
A.scrollApropos = () => scrollToSection("apropos");

A.openSub = (name) => { state.page = "boite"; state.sub = name; state.tab = "ateliers"; render(); window.scrollTo(0, 0); };

A.setFamily = (i) => { state.family = i; render(); };
A.prevFamily = () => { state.family = (state.family - 1 + FAMILIES.length) % FAMILIES.length; render(); };
A.nextFamily = () => { state.family = (state.family + 1) % FAMILIES.length; render(); };

A.toggleTool = (key) => { state.openTool = state.openTool === key ? null : key; render(); };

A.askLoginHeader = () => { if (state.auth) A.go("methode"); else { state.page = "login"; state.loginFrom = "header"; render(); window.scrollTo(0, 0); } };
A.goHome = () => A.go("home");
A.goMethode = () => { state.sub = null; A.go("methode"); };
A.goCommunaute = () => A.go("communaute");
A.goContact = () => A.go("contact");
A.breadcrumbBack = () => { if (state.page === "boite") A.go("zoom"); else A.go("methode"); };
A.crumbMethode = () => { state.sub = null; A.go("methode"); };
A.crumbFamily = () => A.go("zoom");

A.toggleAlerts = () => { state.alertsOpen = !state.alertsOpen; state.menuOpen = false; state.searchOpen = false; render(); };
A.goCommunauteFromAlert = () => { state.alertsOpen = false; A.go("communaute"); };
A.toggleSearch = () => { state.searchOpen = !state.searchOpen; state.alertsOpen = false; state.menuOpen = false; render(); };
A.closeSearch = () => { state.searchOpen = false; state.query = ""; render(); };
A.toggleMenu = () => { state.menuOpen = !state.menuOpen; state.alertsOpen = false; state.searchOpen = false; render(); };
A.menuMethode = () => { state.menuOpen = false; state.sub = null; A.go("methode"); };
A.menuCommunaute = () => { state.menuOpen = false; A.go("communaute"); };
A.menuContact = () => { state.menuOpen = false; A.go("contact"); };
A.menuProfil = () => { state.menuOpen = false; A.go("profil"); };
A.logout = () => { state.menuOpen = false; state.auth = false; A.go("home"); };

A.setTab = (key) => { state.tab = key; render(); };
A.likeComment = (i) => { state.likes[i] = state.likes[i] + 1; render(); };
A.pickSuggestion = (label) => {
  state.query = label;
  const inp = document.getElementById("searchInput");
  if (inp) inp.value = label;
  updateSearchResultsPartial();
};

/* ---------------------------------------------------------------------- */
/* Search                                                                  */
/* ---------------------------------------------------------------------- */

function computeSearchResults() {
  const q = norm(state.query.trim());
  const dot = (color) => `background:${color}`;
  let results = [];
  if (q.length >= 2) {
    FAMILIES.forEach((f, fi) => {
      if (norm(f.name).indexOf(q) >= 0)
        results.push({ label: f.name, context: "Famille de besoins · La méthode", dot: dot(f.color),
          action: `A.closeSearch(); A.requireFamily(${fi})` });
      f.subs.forEach((n) => {
        if (norm(n).indexOf(q) >= 0)
          results.push({ label: n, context: f.name + " · Boîte à outils", dot: dot(f.color),
            action: `state.family=${fi}; A.closeSearch(); A.openSub(${jsStr(n)})` });
      });
    });
    Object.keys(DOCS).forEach((k) => {
      (DOCS[k].items || []).forEach((it) => {
        if (norm(it.title).indexOf(q) >= 0)
          results.push({ label: it.title, context: DOCS[k].title + " · " + (state.sub ?? FAMILIES[state.family].subs[0]), dot: dot("#C4BEB3"),
            action: `A.closeSearch(); state.tab=${jsStr(k)}; A.go('boite')` });
      });
    });
    PARTNERS.forEach((p) => {
      if (norm(p.city + " " + p.spec + " " + p.contact).indexOf(q) >= 0)
        results.push({ label: p.contact + " — " + p.spec, context: p.city + " · Partenaires", dot: dot("#F8D46A"),
          action: `A.closeSearch(); state.tab='partenaires'; A.go('boite')` });
    });
    results = results.slice(0, 12);
  }
  const status = !state.query.trim()
    ? "Tapez au moins deux lettres : familles de besoins, sous-thèmes, ateliers et documents."
    : (results.length ? results.length + " résultat(s) pour « " + esc(state.query.trim()) + " »" : "Aucune correspondance pour « " + esc(state.query.trim()) + " »");
  return { status, results, showSuggestions: !state.query.trim() };
}

function searchResultsHTML() {
  const { results } = computeSearchResults();
  return results.map((res) => `
    <div onclick="${res.action}" style="display:flex; align-items:center; gap:14px; padding:13px 8px; border-bottom:1px solid #F2EFE9; cursor:pointer" class="dropdown-item">
      <div style="flex:none; width:14px; height:14px; border-radius:4px; ${res.dot}"></div>
      <div style="min-width:0">
        <div style="font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:15px">${esc(res.label)}</div>
        <div style="font-size:12px; color:#8C877D; margin-top:2px">${esc(res.context)}</div>
      </div>
    </div>`).join("");
}
function searchSuggestionsHTML() {
  const { showSuggestions } = computeSearchResults();
  if (!showSuggestions) return "";
  const chips = ["Sommeil", "Hygiène bucco-dentaire", "Cyberharcèlement", "Estime de soi", "Partenaires"];
  return `<div style="margin-top:18px">
    <span style="font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.08em; color:#A09A90">RECHERCHES FRÉQUENTES</span>
    <div style="margin-top:12px; display:flex; flex-wrap:wrap; gap:10px">
      ${chips.map((label) => `<span onclick="A.pickSuggestion(${jsStr(label)})" style="padding:9px 16px; border-radius:40px; background:#F2EFE9; font-size:13px; font-weight:600; cursor:pointer" class="dropdown-item">${esc(label)}</span>`).join("")}
    </div>
  </div>`;
}
function updateSearchResultsPartial() {
  const { status } = computeSearchResults();
  const st = document.getElementById("searchStatus");
  const list = document.getElementById("searchResultsList");
  const sugg = document.getElementById("searchSuggestionsWrap");
  if (st) st.textContent = status;
  if (list) list.innerHTML = searchResultsHTML();
  if (sugg) sugg.innerHTML = searchSuggestionsHTML();
}

/* ---------------------------------------------------------------------- */
/* Shared pieces                                                          */
/* ---------------------------------------------------------------------- */

function starCard(name, bg, onclick, big) {
  return `<div onclick="${onclick}" class="sub-card" style="background:${bg}; border-radius:18px; border:3px solid #FDF7EC; box-shadow:0 5px 14px rgba(25,23,19,0.09); aspect-ratio:4/5; display:grid; place-items:center; padding:12px; overflow:hidden;">
    <div style="width:100%; aspect-ratio:1/1; max-width:112px; max-height:100%; margin:auto; background:#F4E7D8; clip-path:${STAR}; display:grid; place-items:center; padding:0 18%; text-align:center; font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:11px; line-height:1.16; letter-spacing:-0.01em; color:#191713; overflow-wrap:break-word;">${esc(name)}</div>
  </div>`;
}

function marqueeHTML() {
  const items = "<span>Des besoins transformés en objectifs concrets</span><span>✳</span><span>Un cadre commun pour les professionnels</span><span>✳</span><span>Les jeunes au cœur de leur accompagnement</span><span>✳</span><span>Une boîte à outils partagée et vivante</span><span>✳</span>";
  return `<div style="background:var(--accent); color:#fff; overflow:hidden; padding:13px 0">
    <div style="display:flex; width:max-content; animation:cambuse-marquee 32s linear infinite">
      <div style="display:flex; align-items:center; gap:34px; padding-right:34px; font-size:14px; font-weight:700">${items}</div>
      <div style="display:flex; align-items:center; gap:34px; padding-right:34px; font-size:14px; font-weight:700">${items}</div>
    </div>
  </div>`;
}

function familyFanHTML() {
  let cards = "";
  for (let o = -2; o <= 2; o++) {
    const idx = (state.family + o + FAMILIES.length) % FAMILIES.length;
    const f = FAMILIES[idx];
    const center = o === 0;
    const transform = `translateX(${o * 108}px) translateY(${Math.abs(o) * 16}px) rotate(${o * 8}deg) scale(${center ? 1.14 : 1})`;
    const z = 20 - Math.abs(o);
    const shadow = center ? "0 18px 40px rgba(0,0,0,0.22)" : "0 8px 20px rgba(0,0,0,0.14)";
    const onclick = center ? `A.requireFamily(${idx})` : `A.setFamily(${idx})`;
    cards += `<div onclick="${onclick}" class="family-fan-card" style="position:absolute; left:50%; top:50%; width:190px; height:268px; margin-left:-95px; margin-top:-134px; transform:${transform}; background:${f.color}; border-radius:18px; border:3px solid rgba(255,255,255,0.92); box-shadow:${shadow}; z-index:${z}; display:grid; place-items:center; padding:22px; text-align:center; transition:transform 0.35s ease, box-shadow 0.35s ease;">
      <span style="font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:${center ? 20 : 16}px; line-height:1.15; color:${f.ink}; opacity:${center ? 1 : 0.85};">${esc(f.name)}</span>
    </div>`;
  }
  return `<div style="position:relative; height:420px; margin-top:30px">
    <div onclick="A.prevFamily()" style="position:absolute; left:0; top:50%; transform:translateY(-50%); z-index:40; width:46px; height:46px; border-radius:50%; background:rgba(255,255,255,0.92); color:#191713; display:grid; place-items:center; cursor:pointer; font-size:20px; box-shadow:0 4px 14px rgba(0,0,0,0.12)">‹</div>
    <div onclick="A.nextFamily()" style="position:absolute; right:0; top:50%; transform:translateY(-50%); z-index:40; width:46px; height:46px; border-radius:50%; background:rgba(255,255,255,0.92); color:#191713; display:grid; place-items:center; cursor:pointer; font-size:20px; box-shadow:0 4px 14px rgba(0,0,0,0.12)">›</div>
    ${cards}
  </div>`;
}

function familyDotsHTML(light) {
  return `<div style="display:flex; justify-content:center; gap:8px; margin-top:30px">
    ${FAMILIES.map((f, i) => {
      const active = i === state.family;
      const bg = active ? (light ? "#191713" : "#fff") : (light ? "rgba(25,23,19,0.3)" : "rgba(255,255,255,0.45)");
      return `<div onclick="A.setFamily(${i})" style="width:${active ? 26 : 10}px; height:10px; border-radius:10px; cursor:pointer; background:${bg}; transition:width 0.3s ease"></div>`;
    }).join("")}
  </div>`;
}

function carouselSectionHTML({ id, eyebrow, dots }) {
  const fam = FAMILIES[state.family];
  const light = fam.ink === "#191713";
  return `<section ${id ? `id="${id}"` : ""} style="padding:88px 28px 96px; background:${fam.color}; color:${fam.ink}; transition:background 0.45s ease">
    <div style="max-width:1180px; margin:0 auto; text-align:center">
      ${eyebrow ? `<span style="font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.1em; opacity:0.7">LES 7 FAMILLES DE BESOINS FONDAMENTAUX</span>` : ""}
      <h2 style="margin-top:${eyebrow ? 16 : 0}px; font-size:clamp(28px,3.2vw,48px); line-height:1.08">${esc(fam.name)}</h2>
      ${familyFanHTML()}
      <p style="margin:28px auto 0; max-width:620px; font-size:17px; line-height:1.6; font-weight:500">${esc(fam.short)}</p>
      <div style="margin-top:26px">
        <span onclick="A.requireFamily(${state.family})" style="display:inline-flex; align-items:center; gap:12px; padding:16px 28px; border-radius:999px; font-weight:700; cursor:pointer; box-shadow:0 8px 22px rgba(25,23,19,0.14); background:${light ? "#191713" : "#FFFFFF"}; color:${light ? "#FFFFFF" : "#191713"}">Approfondir cette famille</span>
      </div>
      ${dots ? familyDotsHTML(light) : ""}
    </div>
  </section>`;
}

/* ---------------------------------------------------------------------- */
/* Header                                                                  */
/* ---------------------------------------------------------------------- */

function logoHTML(size) {
  return `<div onclick="A.goHome()" style="display:flex; align-items:center; gap:10px; cursor:pointer">
    <div style="width:26px; height:26px; border-radius:50%; border:2px solid var(--accent); display:grid; place-items:center">
      <div style="width:8px; height:8px; border-radius:50%; background:var(--accent)"></div>
    </div>
    <span style="font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:${size || 18}px">La Cambuse</span>
  </div>`;
}

function renderPublicHeader() {
  return `<header style="position:sticky; top:0; z-index:60; display:flex; align-items:center; justify-content:space-between; gap:24px; padding:14px 28px; background:rgba(255,255,255,0.94); backdrop-filter:blur(10px); border-bottom:1px solid #ECE7DE">
    ${logoHTML()}
    <nav style="display:flex; align-items:center; gap:28px; font-size:15px; font-weight:700">
      <span class="nav-link" onclick="A.scrollMethode()">La méthode</span>
      <span class="nav-link" onclick="A.scrollFamilles()">Les outils</span>
      <span class="nav-link" onclick="A.scrollApropos()">À propos</span>
      <span class="nav-link" onclick="A.goContact()">Nous contacter</span>
      ${state.auth ? renderAvatarBlock() : `<span class="header-cta" onclick="A.askLoginHeader()">Espace professionnel</span>`}
    </nav>
  </header>`;
}

function renderAlertsDropdown() {
  if (!state.alertsOpen) return "";
  const items = [
    { onclick: "A.goCommunauteFromAlert()", text: 'Votre contribution <strong>« Mon journal de brossage »</strong> a été validée et publiée.', time: "Il y a 2 heures" },
    { onclick: "A.goCommunauteFromAlert()", text: '<strong>Thomas R.</strong> a répondu à votre message dans « Hygiène bucco-dentaire ».', time: "Hier" },
    { onclick: "", text: "4 nouveaux partenaires ajoutés dans votre département.", time: "Lundi" }
  ];
  return `<div style="position:absolute; top:40px; right:-40px; z-index:80; width:330px; background:#fff; border:1px solid #ECE7DE; border-radius:12px; box-shadow:0 12px 30px rgba(0,0,0,0.14); overflow:hidden; animation:cambuse-in 0.18s ease">
    <div style="padding:14px 18px; border-bottom:1px solid #F2EFE9; display:flex; align-items:baseline; justify-content:space-between; gap:12px">
      <span style="font-weight:700; font-size:15px">Notifications</span>
      <span style="font-size:12px; color:#8C877D">3 non lues</span>
    </div>
    <div style="display:flex; flex-direction:column">
      ${items.map((it) => `<div ${it.onclick ? `onclick="${it.onclick}"` : ""} class="dropdown-item" style="display:flex; gap:12px; padding:14px 18px; border-bottom:1px solid #F7F5F0; cursor:pointer">
        <div style="flex:none; width:8px; height:8px; border-radius:50%; background:#1F9E5A; margin-top:6px"></div>
        <div><p style="font-size:14px; line-height:1.5">${it.text}</p><span style="font-size:12px; color:#A09A90">${it.time}</span></div>
      </div>`).join("")}
    </div>
    <div style="padding:13px 18px; border-top:1px solid #F2EFE9; font-size:13px; font-weight:700; color:var(--accent); cursor:pointer">Tout marquer comme lu</div>
  </div>`;
}

function renderProfileDropdown() {
  if (!state.menuOpen) return "";
  return `<div style="position:absolute; top:42px; right:0; z-index:80; width:230px; background:#fff; border:1px solid #ECE7DE; border-radius:12px; box-shadow:0 12px 30px rgba(0,0,0,0.14); overflow:hidden; animation:cambuse-in 0.18s ease">
    <div style="padding:16px 18px 14px; border-bottom:1px solid #F2EFE9">
      <div style="font-weight:700; font-size:15px">${esc(PROFILE.firstName + " " + PROFILE.lastName)}</div>
      <div style="font-size:12px; color:#8C877D; margin-top:3px">${esc(PROFILE.email)}</div>
    </div>
    <div style="display:flex; flex-direction:column; padding:8px 0">
      <span class="dropdown-item" onclick="A.menuMethode()" style="padding:12px 18px; font-size:14px; font-weight:600; cursor:pointer">La méthode</span>
      <span class="dropdown-item" onclick="A.menuCommunaute()" style="padding:12px 18px; font-size:14px; font-weight:600; cursor:pointer">Communauté</span>
      <span class="dropdown-item" onclick="A.menuProfil()" style="padding:12px 18px; font-size:14px; font-weight:600; cursor:pointer; color:#4A463E">Mon profil</span>
      <span class="dropdown-item" onclick="A.menuContact()" style="padding:12px 18px; font-size:14px; font-weight:600; cursor:pointer; color:#4A463E">Nous contacter</span>
    </div>
    <div class="dropdown-item" onclick="A.logout()" style="padding:14px 18px; border-top:1px solid #F2EFE9; font-size:14px; font-weight:700; color:var(--accent); cursor:pointer">Se déconnecter</div>
  </div>`;
}

function renderSearchPanel() {
  if (!state.searchOpen) return "";
  const { status } = computeSearchResults();
  return `<div style="background:#fff; border-bottom:1px solid #ECE7DE; box-shadow:0 10px 24px rgba(0,0,0,0.08); animation:cambuse-in 0.18s ease">
    <div style="max-width:900px; margin:0 auto; padding:24px 28px 28px">
      <div style="display:flex; align-items:center; gap:14px; border-bottom:2px solid #191713; padding-bottom:12px">
        <div style="flex:none; width:20px; height:20px; position:relative">
          <div style="width:15px; height:15px; border-radius:50%; border:2px solid #6B665C; position:absolute; top:0; left:0"></div>
          <div style="position:absolute; right:1px; bottom:2px; width:8px; height:2px; background:#6B665C; transform:rotate(45deg)"></div>
        </div>
        <input id="searchInput" type="text" placeholder="Rechercher un besoin, une famille, une ressource…" style="flex:1; border:none; outline:none; font-size:19px; font-family:'Familjen Grotesk',sans-serif; font-weight:700; min-width:0" />
        <span onclick="A.closeSearch()" style="font-size:13px; font-weight:700; color:#8C877D; cursor:pointer">Fermer</span>
      </div>
      <p id="searchStatus" style="margin-top:14px; font-size:13px; color:#8C877D">${status}</p>
      <div style="margin-top:10px; display:flex; flex-direction:column; max-height:46vh; overflow:auto">
        <div id="searchResultsList">${searchResultsHTML()}</div>
      </div>
      <div id="searchSuggestionsWrap">${searchSuggestionsHTML()}</div>
    </div>
  </div>`;
}

function renderSubBar() {
  if (state.page !== "zoom" && state.page !== "boite") return "";
  const fam = FAMILIES[state.family];
  const isBoite = state.page === "boite";
  return `<div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; padding:14px 28px; background:#fff; border-bottom:1px solid #ECE7DE; box-shadow:0 2px 8px rgba(0,0,0,0.04)">
    <div style="display:flex; align-items:center; flex-wrap:wrap; gap:10px; font-size:14px; font-weight:700">
      <span onclick="A.breadcrumbBack()" style="color:var(--accent); cursor:pointer">‹</span>
      <span class="nav-link" onclick="A.crumbMethode()" style="color:#8C877D">La méthode</span>
      <span style="color:#C9C3B8">/</span>
      <span class="nav-link" onclick="A.crumbFamily()" style="color:${state.page === "zoom" ? "#191713" : "#8C877D"}">${esc(fam.name)}</span>
      ${isBoite ? `<div style="display:flex; align-items:center; gap:10px"><span style="color:#C9C3B8">/</span><span style="color:#191713">${esc(state.sub ?? fam.subs[0])}</span></div>` : ""}
    </div>
    ${isBoite ? `<label style="display:flex; align-items:center; gap:12px; font-size:13px; color:#6B665C">Filtrer par localisation
      <select style="padding:10px 14px; border:1px solid #E2DBD0; border-radius:8px; background:#fff; font-size:14px">
        <option>Toute la France</option><option>Île-de-France</option><option>Hauts-de-Seine</option><option>Paris</option>
      </select>
    </label>` : ""}
  </div>`;
}

function renderAvatarBlock() {
  return `<div style="position:relative">
    <div onclick="A.toggleMenu()" style="width:32px; height:32px; border-radius:50%; background:var(--accent); color:#fff; display:grid; place-items:center; font-weight:700; font-size:14px; cursor:pointer; box-shadow:${state.menuOpen ? "0 0 0 3px rgba(221,11,62,0.22)" : "none"}">${esc(PROFILE.initials)}</div>
    ${renderProfileDropdown()}
  </div>`;
}

function renderAppHeader() {
  return `<div style="position:sticky; top:0; z-index:60">
    <header style="display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:20px; padding:16px 28px; background:#fff; border-bottom:1px solid #ECE7DE">
      <div style="justify-self:start">${logoHTML(17)}</div>
      <nav style="display:flex; align-items:center; gap:30px; font-size:15px; font-weight:700; justify-self:center">
        <span class="nav-link" onclick="A.goMethode()" style="color:${state.page === "methode" || state.page === "zoom" || state.page === "boite" ? "var(--accent)" : "#191713"}">La méthode</span>
        <span class="nav-link" onclick="A.goCommunaute()" style="color:${state.page === "communaute" ? "var(--accent)" : "#191713"}">Communauté</span>
      </nav>
      <div style="display:flex; align-items:center; gap:18px; justify-self:end">
        <div style="position:relative">
          <div onclick="A.toggleAlerts()" title="Notifications" style="position:relative; width:26px; height:26px; cursor:pointer; display:grid; place-items:end center">
            <div style="position:absolute; top:1px; left:4px; width:18px; height:16px; border:2px solid #191713; border-bottom:none; border-radius:9px 9px 2px 2px"></div>
            <div style="position:absolute; top:16px; left:1px; width:24px; height:2px; background:#191713; border-radius:2px"></div>
            <div style="position:absolute; top:19px; left:10px; width:6px; height:5px; background:#191713; border-radius:0 0 4px 4px"></div>
            <div style="position:absolute; top:-2px; right:-2px; width:9px; height:9px; border-radius:50%; background:#1F9E5A; border:2px solid #fff"></div>
          </div>
          ${renderAlertsDropdown()}
        </div>
        <div onclick="A.toggleSearch()" title="Recherche" style="width:24px; height:24px; cursor:pointer; position:relative; display:grid; place-items:center">
          <div style="width:17px; height:17px; border-radius:50%; border:2px solid #191713; position:absolute; top:1px; left:1px"></div>
          <div style="position:absolute; right:1px; bottom:2px; width:9px; height:2px; background:#191713; border-radius:2px; transform:rotate(45deg)"></div>
        </div>
        ${renderAvatarBlock()}
      </div>
    </header>
    ${renderSearchPanel()}
    ${renderSubBar()}
  </div>`;
}

/* ---------------------------------------------------------------------- */
/* Home                                                                    */
/* ---------------------------------------------------------------------- */

function benefitIcon(svg) {
  return `<div style="width:46px; height:46px; border-radius:13px; background:#F3F0E9; display:grid; place-items:center">${svg}</div>`;
}

function renderHome() {
  const toolFanLabels = ["Besoin de protection", "Identification de figures protectrices", "Négligences", "Violences"];
  const toolFan = toolFanLabels.map((label, i) => `<div style="position:absolute; left:50%; top:10px; width:128px; height:188px; margin-left:-64px; transform:translateX(${(i - 1.5) * 104}px) rotate(${(i - 1.5) * 9}deg); background:${i === 0 ? "#7FC4E8" : "#1E8FE0"}; border-radius:14px; border:2px solid rgba(255,255,255,0.9); box-shadow:0 10px 22px rgba(0,0,0,0.16); z-index:${i}">
    <div style="position:absolute; left:10px; top:14px; bottom:14px; width:86px; border-radius:10px; background:rgba(255,255,255,0.88); display:grid; place-items:center; padding:8px 6px; text-align:center; font-size:10px; font-weight:700; color:#1E3550; line-height:1.3; overflow-wrap:anywhere;">${esc(label)}</div>
  </div>`).join("");

  const toolsHTML = TOOLS.map((t) => {
    const clickable = !!t.key;
    const open = clickable && state.openTool === t.key;
    return `<div style="border-top:1px solid #ECE7DE">
      <div ${clickable ? `onclick="A.toggleTool('${t.key}')"` : ""} style="display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 0; cursor:${clickable ? "pointer" : "default"}; color:${clickable ? "#191713" : "#7A756B"}">
        <span style="font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:18px">${esc(t.name)}</span>
        ${clickable ? `<span style="font-size:22px; color:var(--accent); line-height:1">${open ? "−" : "+"}</span>` : ""}
      </div>
      ${open ? `<div style="padding:4px 0 28px 20px; border-left:3px solid #C9DDA4; animation:cambuse-in 0.25s ease">
        <p style="font-style:italic; font-weight:700; font-size:16px">${esc(t.tagline)}</p>
        <p style="margin-top:12px; font-size:15px; line-height:1.65; color:#4A463E">${esc(t.body)}</p>
        ${open && t.key === "horizons" ? horizonsGamePanel() : ""}
      </div>` : ""}
    </div>`;
  }).join("") + `<div style="border-top:1px solid #ECE7DE"></div>`;

  const hero = state.auth ? "" : `
    <section style="position:relative; min-height:560px; display:flex; align-items:flex-end; padding:80px 28px; overflow:hidden; background:#2C2A26">
      <div style="position:absolute; inset:0; background-image:repeating-linear-gradient(135deg, #3A3832 0 14px, #2F2D28 14px 28px); display:grid; place-items:end end; padding:20px 24px">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:12px; color:#8C877D; letter-spacing:0.08em; text-align:right">PHOTO LIFESTYLE — jeunes jouant aux cartes en extérieur</span>
      </div>
      <div style="position:absolute; inset:0; background:linear-gradient(90deg, rgba(20,19,16,0.9) 0%, rgba(20,19,16,0.6) 58%, rgba(20,19,16,0.25) 100%)"></div>
      <div style="position:relative; max-width:1180px; width:100%; margin:0 auto">
        <h1 style="color:#fff; font-size:clamp(34px,4.2vw,60px); line-height:1.05; font-weight:700; max-width:830px">La Cambuse : une plateforme qui nourrit le travail éducatif et partage les ressources des professionnels</h1>
        <p style="color:#EFE9DF; font-size:clamp(16px,1.3vw,20px); line-height:1.5; max-width:620px; margin-top:24px; font-weight:500">Une méthode ludique et structurée qui place la parole des jeunes et le travail des professionnels au centre de l'accompagnement éducatif.</p>
        <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:34px">
          <span onclick="A.scrollFamilles()" class="pill-cta accent">Accéder à la plateforme <span style="font-size:17px">→</span></span>
          <span onclick="A.scrollMethode()" class="pill-cta ghost">Découvrir la méthode</span>
        </div>
      </div>
    </section>`;

  return `<div>
    ${hero}

    ${marqueeHTML()}

    <section id="methode" style="padding:96px 28px; background:#fff">
      <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(320px,1fr)); gap:64px; align-items:start">
        <div style="background:#C9DDA4; border-radius:22px; padding:34px; min-height:460px; position:relative; overflow:hidden">
          <div style="width:60px; height:60px; border-radius:50%; background:#F1F0E6; display:grid; place-items:center; margin-left:auto">
            <div style="width:22px; height:22px; border-radius:50%; border:2px solid #4C5A34"></div>
          </div>
          <div style="position:relative; height:300px; margin-top:18px">${toolFan}</div>
          <span style="font-family:'IBM Plex Mono',monospace; font-size:11px; color:#4C5A34; letter-spacing:0.06em">PHOTO — cartes Horizons en éventail</span>
        </div>
        <div>
          <h2 style="font-size:clamp(30px,3vw,46px); line-height:1.08; font-weight:700; max-width:500px">La méthode Cap : un parcours en 7 outils</h2>
          <p style="margin-top:22px; font-size:17px; line-height:1.6; color:#4A463E; max-width:560px">Cap aide les jeunes à exprimer leurs besoins et à en faire des objectifs concrets. La méthode repose sur 7 outils complémentaires, du jeu de cartes initial jusqu'au cahier de sortie. Chaque étape a un rôle précis et permet aux équipes de garder un cadre commun, clair et cohérent tout au long du parcours.</p>
          <div style="margin-top:34px; display:flex; flex-direction:column">${toolsHTML}</div>
        </div>
      </div>
    </section>

    <section id="apropos" style="padding:96px 28px; background:#FAF7F2">
      <div style="max-width:1180px; margin:0 auto">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:56px; align-items:start">
          <div>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.1em; color:var(--accent)">À PROPOS DE LA MÉTHODE</span>
            <h2 style="margin-top:16px; font-size:clamp(28px,2.7vw,42px); line-height:1.1">Du besoin ressenti à l'objectif mesurable</h2>
          </div>
          <div style="display:flex; flex-direction:column; gap:20px; font-size:17px; line-height:1.65; color:#4A463E">
            <p><strong>Le constat de départ.</strong> Les équipes éducatives partagent un même métier mais pas toujours un même langage : chacun observe, nomme et priorise les besoins d'un jeune avec ses propres repères. Les jeunes, de leur côté, subissent souvent des objectifs écrits pour eux plutôt qu'avec eux.</p>
            <p><strong>Ce que change la méthode Cap.</strong> Les 7 familles de besoins fondamentaux donnent une grille de lecture commune. Le jeu de cartes Horizons fait dire au jeune ce qui compte le plus pour lui, puis traduit ces priorités en objectifs concrets, mesurables et limités dans le temps, inscrits dans son Projet Personnalisé.</p>
          </div>
        </div>
        <div style="margin-top:64px; display:grid; grid-template-columns:repeat(auto-fit, minmax(270px,1fr)); gap:24px">
          ${benefitCard(benefitIcon('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10"/><path d="M18 7h2"/><path d="M4 12h4"/><path d="M12 12h8"/><path d="M4 17h12"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="19" cy="17" r="2"/></svg>'), "Des pratiques harmonisées", "Un vocabulaire et une grille de lecture partagés entre tous les professionnels de l'association.")}
          ${benefitCard(benefitIcon('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7.5" r="3.2"/><path d="M4 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M18.5 3l1 2.2 2.4.3-1.8 1.7.5 2.3-2.1-1.2-2.1 1.2.5-2.3-1.8-1.7 2.4-.3z"/></svg>'), "Des jeunes acteurs", "Le jeune classe lui-même ses besoins et formule ses objectifs : il devient acteur de son parcours.")}
          ${benefitCard(benefitIcon('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6.5l2 2 3.5-3.5"/><path d="M3 13l2 2 3.5-3.5"/><path d="M3 19.5l2 2 3.5-3.5"/><path d="M12 6h9"/><path d="M12 12.5h9"/><path d="M12 19h9"/></svg>'), "Des actions concrètes", "Chaque besoin identifié se traduit en atelier, en démarche ou en rendez-vous, jamais en intention floue.")}
          ${benefitCard(benefitIcon('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h9l5 5v13H5z"/><path d="M14 3v5h5"/><path d="M8 16.5l2.5-3 2 2L16 11"/></svg>'), "Un suivi documenté", "Les cycles de 6 mois laissent une trace écrite et comparable dans le temps, du PPJ au cahier de sortie.")}
          ${benefitCard(benefitIcon('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="4" width="8" height="12" rx="1.6"/><path d="M7.5 6.2L4.6 15.6a1.6 1.6 0 001 2l4.2 1.3"/><path d="M18.5 6.2l2.9 9.4a1.6 1.6 0 01-1 2l-4.2 1.3"/><path d="M12 8.5v3M11 10h3"/></svg>'), "Une approche visuelle", "Cartes, couleurs et échelles rendent l'entretien accessible, y compris aux jeunes peu à l'aise avec l'écrit.")}
          ${benefitCard(benefitIcon('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5.5" r="2.5"/><circle cx="5" cy="17" r="2.5"/><circle cx="19" cy="17" r="2.5"/><path d="M10.4 7.6L6.6 14.5"/><path d="M13.6 7.6l3.8 6.9"/><path d="M7.5 17.5h9"/></svg>'), "Un travail collaboratif", "Jeunes, éducateurs et psychologues travaillent sur le même support, et les équipes s'enrichissent entre elles.")}
        </div>
      </div>
    </section>

    ${carouselSectionHTML({ id: "familles", eyebrow: true, dots: true })}
  </div>`;
}

function benefitCard(iconHTML, title, text) {
  return `<div class="benefit-card" style="background:#fff; border:1px solid #EFEAE1; border-radius:22px; padding:28px; box-shadow:0 1px 2px rgba(25,23,19,0.04)">
    ${iconHTML}
    <h3 style="margin-top:18px; font-size:20px">${esc(title)}</h3>
    <p style="margin-top:10px; font-size:15px; line-height:1.6; color:#4A463E">${esc(text)}</p>
  </div>`;
}

function statBlock(n, label) {
  return `<div><p style="font-family:'Familjen Grotesk',sans-serif; font-size:34px; font-weight:700; color:#fff; line-height:1">${n}</p><p style="font-size:12px; color:#A09A90; margin-top:4px">${label}</p></div>`;
}

function stepCard(n, title, body) {
  return `<div class="tool-step-card" style="position:relative; background:#fff; border:1px solid #ECE7DE; border-radius:16px; padding:20px 20px 20px 22px; overflow:hidden">
    <span style="position:absolute; right:12px; top:2px; font-family:'Familjen Grotesk',sans-serif; font-size:52px; font-weight:700; color:#F3F0E9; line-height:1">${n}</span>
    <div style="position:relative">
      <span style="font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.1em; color:var(--accent)">ÉTAPE ${n}</span>
      <p style="margin-top:8px; font-size:16px; font-weight:700; line-height:1.3">${esc(title)}</p>
      <p style="margin-top:8px; font-size:14.5px; line-height:1.6; color:#4A463E">${esc(body)}</p>
    </div>
  </div>`;
}

function horizonsGamePanel() {
  return `<div>
    <div style="margin-top:22px; background:#191713; border-radius:20px; padding:26px 28px; display:flex; flex-wrap:wrap; align-items:center; gap:28px; justify-content:space-between">
      <div style="min-width:220px">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.12em; color:#C9DDA4">OUTIL 01 · LE POINT DE DÉPART</span>
        <p style="margin-top:10px; color:#fff; font-size:20px; font-weight:700; line-height:1.25; max-width:320px">Le jeune classe ses besoins, l'équipe en fait des objectifs.</p>
      </div>
      <div style="display:flex; align-items:center; gap:30px">
        <div style="display:flex; align-items:center">
          <div style="width:42px; height:60px; border-radius:6px; background:#C9DDA4; transform:rotate(-14deg) translateY(4px); box-shadow:0 4px 10px rgba(0,0,0,0.25); margin:0 -8px"></div>
          <div style="width:42px; height:60px; border-radius:6px; background:#FBEDD2; transform:rotate(0deg) translateY(-4px); box-shadow:0 4px 10px rgba(0,0,0,0.25); margin:0 -8px"></div>
          <div style="width:42px; height:60px; border-radius:6px; background:#D8EDE2; transform:rotate(14deg) translateY(4px); box-shadow:0 4px 10px rgba(0,0,0,0.25); margin:0 -8px"></div>
        </div>
        <div style="display:flex; gap:26px">
          ${statBlock(7, "familles<br/>de besoins")}
          ${statBlock(5, "gradations<br/>sur l'échelle")}
          ${statBlock(6, "mois<br/>par cycle")}
        </div>
      </div>
    </div>

    <div style="margin-top:18px; display:grid; grid-template-columns:repeat(auto-fit, minmax(230px,1fr)); gap:18px">
      <div style="background:#EDF3DF; border-radius:16px; padding:22px; border:1px solid #DCE7C6">
        <div style="display:flex; align-items:center; gap:10px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4C5A34" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.6"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/></svg>
          <h4 style="font-size:12px; text-transform:uppercase; letter-spacing:0.1em; color:#4C5A34">But du jeu</h4>
        </div>
        <p style="margin-top:12px; font-size:15px; line-height:1.6; color:#3F4A2C">Formuler et établir <strong>7 objectifs maximum</strong> pour les 6 mois d'accompagnement éducatif dans la structure.</p>
      </div>
      <div style="background:#F5F2EC; border-radius:16px; padding:22px; border:1px solid #E8E2D6">
        <div style="display:flex; align-items:center; gap:10px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7A6A4A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M8 7V5h8v2"/><path d="M3 12h18"/></svg>
          <h4 style="font-size:12px; text-transform:uppercase; letter-spacing:0.1em; color:#7A6A4A">Matériel</h4>
        </div>
        <div style="margin-top:12px; display:flex; flex-direction:column; gap:8px; font-size:14.5px; line-height:1.5; color:#4A463E">
          <div style="display:flex; gap:8px"><span style="color:var(--accent); font-weight:700">—</span><span><strong>Cartes « Besoins »</strong> · 7 familles de besoins fondamentaux</span></div>
          <div style="display:flex; gap:8px"><span style="color:var(--accent); font-weight:700">—</span><span><strong>Échelle</strong> · 5 gradations, de « à travailler » à « ne pas travailler »</span></div>
          <div style="display:flex; gap:8px"><span style="color:var(--accent); font-weight:700">—</span><span><strong>Cahier « Mon Cap »</strong> · besoins et axes de travail du PPJ</span></div>
          <div style="display:flex; gap:8px"><span style="color:var(--accent); font-weight:700">—</span><span><strong>Appareil photo</strong> · traces des cartes et visionnage des vidéos</span></div>
        </div>
      </div>
      <div style="background:#E6EEF5; border-radius:16px; padding:22px; border:1px solid #D3E0EB">
        <div style="display:flex; align-items:center; gap:10px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F4A63" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18"/><path d="M6 18v-4M11 18V9M16 18v-6M21 18V6"/></svg>
          <h4 style="font-size:12px; text-transform:uppercase; letter-spacing:0.1em; color:#2F4A63">Mise en place</h4>
        </div>
        <p style="margin-top:12px; font-size:15px; line-height:1.6; color:#2F4A63"><strong>Premier PPJ :</strong> installer l'échelle à 5 niveaux à l'horizontale, sur une surface assez grande pour poser toutes les cartes d'une famille.</p>
        <p style="margin-top:8px; font-size:15px; line-height:1.6; color:#2F4A63"><strong>Renouvellement :</strong> reproduire la configuration d'une des photos du PPJ précédent, puis répéter pour les 6 autres familles.</p>
      </div>
    </div>

    <div style="margin-top:30px; display:flex; align-items:center; gap:14px">
      <h4 style="font-size:12px; text-transform:uppercase; letter-spacing:0.1em; color:#8C877D; flex:none">Déroulé du jeu · 7 étapes</h4>
      <div style="flex:1; height:1px; background:#ECE7DE"></div>
    </div>
    <div style="margin-top:16px; display:grid; grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); gap:14px">
      ${stepCard(1, "Expliquer clairement le contexte.", "Le jeu prépare le PPJ et sert de structure pour tout l'accompagnement : la personne accueillie explore les éléments qu'elle et l'équipe vont travailler — ou pas — sur la période couverte.")}
      ${stepCard(2, "Donner la consigne.", "La personne accueillie situe les cartes sur l'échelle, selon sa propre analyse, de « à travailler » à « ne pas travailler ».")}
      ${stepCard(3, "Visionner la vidéo.", "L'éducateur propose la vidéo qui explique la famille de besoin choisie.")}
      ${stepCard(4, "Répartir les cartes.", "Pour chaque carte posée, le jeune commente son choix. Ce n'est pas une réflexion commune : le professionnel apporte ou demande des précisions de compréhension uniquement.")}
      ${stepCard(5, "Cheeeese !", "L'éducateur photographie l'ensemble des cartes disposées sur l'échelle.")}
      ${stepCard(6, "Répéter.", "Rejouer les étapes 3, 4 et 5 pour les 6 autres familles de besoin.")}
      ${stepCard(7, "Clôturer le jeu.", "L'éducateur propose un espace de parole pour les jours qui suivent, assurable par tous les membres de l'équipe éducative.")}
    </div>

    <div style="margin-top:20px; background:#FBEDD2; border-radius:14px; padding:18px 20px">
      <p style="font-size:14px; line-height:1.6; color:#6B4A16"><strong>Attention :</strong> l'exercice est présenté comme un jeu mais demande une forte mobilisation émotionnelle, pour le jeune comme pour le professionnel.</p>
    </div>

    <div style="margin-top:14px; background:#D8EDE2; border-radius:14px; padding:20px 22px">
      <h4 style="font-size:17px">Précisions</h4>
      <ul style="margin:10px 0 0; padding-left:18px; font-size:15px; line-height:1.7; color:#2E4A3C">
        <li>Seules les cartes situées dans la couleur la plus foncée de l'échelle sont soumises à la formulation d'objectifs.</li>
        <li>Si toutes les cartes d'une famille sont placées à l'extrémité « ne pas travailler », aucun objectif n'est formulé — mais elles sont reprises dans la grille d'analyse « La Vigie ».</li>
        <li>Ensuite, c'est à l'équipe de jouer : en réunion, les professionnels établissent les objectifs de travail à retranscrire dans « Mon Cap », d'autres étant proposés en autonomie dans le journal de bord.</li>
      </ul>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------------- */
/* Login / Contact                                                        */
/* ---------------------------------------------------------------------- */

function renderLogin() {
  const hint = state.loginFrom === "family" ? `Connectez-vous pour approfondir « ${esc(FAMILIES[state.pendingFamily ?? 0].name)} ».` : "";
  return `<section style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px,1fr)); min-height:640px; background:#fff">
    <div style="display:flex; align-items:center; justify-content:center; padding:72px 32px">
      <div style="width:100%; max-width:420px">
        <h1 style="font-size:clamp(28px,3vw,40px); line-height:1.1">Bienvenue sur La Cambuse</h1>
        <p style="margin-top:14px; font-size:16px; line-height:1.6; color:#4A463E">Un espace collaboratif dédié aux professionnels pour accompagner les jeunes à travers leurs besoins fondamentaux.</p>
        ${hint ? `<p style="margin-top:14px; font-size:14px; font-weight:700; color:var(--accent)">${hint}</p>` : ""}
        <div style="margin-top:26px; display:flex; flex-direction:column; gap:12px">
          <input type="email" placeholder="Email professionnel" style="width:100%; padding:15px 16px; border:1px solid #ECE7DE; background:#F5F2EC; border-radius:8px; outline:none" />
          <input type="password" placeholder="Mot de passe" style="width:100%; padding:15px 16px; border:1px solid #ECE7DE; background:#F5F2EC; border-radius:8px; outline:none" />
          <button onclick="A.doLogin()" class="btn-accent" style="margin-top:6px; padding:16px; border:none; border-radius:8px">Se connecter</button>
        </div>
        <div style="margin-top:18px; display:flex; align-items:center; justify-content:space-between; gap:16px; font-size:14px">
          <label style="display:flex; align-items:center; gap:9px; color:#4A463E; cursor:pointer"><input type="checkbox" style="width:16px; height:16px; accent-color:#DD0B3E" />Se souvenir de moi</label>
          <a href="#">Mot de passe oublié ?</a>
        </div>
        <p onclick="A.goHome()" style="margin-top:30px; font-size:14px; color:#8C877D; cursor:pointer">← Retour à l'accueil</p>
      </div>
    </div>
    <div style="position:relative; min-height:420px; background-image:repeating-linear-gradient(135deg, #EDE7DC 0 14px, #E5DED1 14px 28px); display:grid; place-items:end end; padding:20px 24px">
      <span style="font-family:'IBM Plex Mono',monospace; font-size:12px; color:#8C877D; letter-spacing:0.08em; text-align:right">PHOTO LIFESTYLE — jeune avec une tablette</span>
    </div>
  </section>`;
}

function renderContact() {
  return `<div>
    <section style="padding:76px 28px 56px; background:#F7F5F0">
      <div style="max-width:1180px; margin:0 auto">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.1em; color:var(--accent)">NOUS CONTACTER</span>
        <h1 style="margin-top:16px; font-size:clamp(30px,3.4vw,50px); line-height:1.06; max-width:720px">Une question sur la méthode Cap ou la plateforme ?</h1>
        <p style="margin-top:18px; max-width:640px; font-size:17px; line-height:1.6; color:#4A463E">Écrivez-nous, appelez-nous ou passez nous voir. Nous répondons aux professionnels sous 48 heures ouvrées.</p>
      </div>
    </section>
    <section style="padding:56px 28px 92px; background:#fff">
      <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:34px; align-items:start">
        <div style="display:flex; flex-direction:column; gap:18px">
          <div class="contact-card" style="display:flex; gap:18px; background:#FAF7F2; border:1px solid #EFEAE1; border-radius:22px; padding:26px">
            <div style="flex:none; width:46px; height:46px; border-radius:13px; background:#fff; display:grid; place-items:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg></div>
            <div>
              <h3 style="font-size:19px">Par e-mail</h3>
              <p style="margin-top:8px; font-size:15px; line-height:1.6; color:#4A463E">Pour toute question sur la méthode, un accès professionnel ou une contribution.</p>
              <a href="mailto:contact@lacambuse.fr" style="display:inline-block; margin-top:10px; font-weight:700; font-size:15px">contact@lacambuse.fr</a>
            </div>
          </div>
          <div class="contact-card" style="display:flex; gap:18px; background:#FAF7F2; border:1px solid #EFEAE1; border-radius:22px; padding:26px">
            <div style="flex:none; width:46px; height:46px; border-radius:13px; background:#fff; display:grid; place-items:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3.5h3.5l1.8 4.2-2.3 1.6a11.5 11.5 0 006.7 6.7l1.6-2.3 4.2 1.8V19a1.6 1.6 0 01-1.8 1.6C10.6 19.9 4.1 13.4 3.4 5.3A1.6 1.6 0 015 3.5z"/></svg></div>
            <div>
              <h3 style="font-size:19px">Par téléphone</h3>
              <p style="margin-top:8px; font-size:15px; line-height:1.6; color:#4A463E">Du lundi au vendredi, de 9 h à 12 h 30 et de 14 h à 17 h.</p>
              <a href="tel:+33145678910" style="display:inline-block; margin-top:10px; font-weight:700; font-size:15px">01 45 67 89 10</a>
            </div>
          </div>
          <div class="contact-card" style="display:flex; gap:18px; background:#FAF7F2; border:1px solid #EFEAE1; border-radius:22px; padding:26px">
            <div style="flex:none; width:46px; height:46px; border-radius:13px; background:#fff; display:grid; place-items:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191713" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg></div>
            <div>
              <h3 style="font-size:19px">Nous rendre visite</h3>
              <p style="margin-top:8px; font-size:15px; line-height:1.6; color:#4A463E">La Cambuse — 12 rue des Peupliers, 92190 Meudon. Sur rendez-vous uniquement.</p>
            </div>
          </div>
        </div>
        <div style="background:#fff; border:1px solid #ECE7DE; border-radius:24px; padding:32px; box-shadow:0 14px 34px rgba(25,23,19,0.07)">
          <h2 style="font-size:24px; line-height:1.2; color:var(--accent)">Écrivez-nous</h2>
          <div style="margin-top:22px; display:flex; flex-direction:column; gap:16px">
            <label class="form-label">Votre nom<input type="text" placeholder="Marie Dupont" class="form-input" /></label>
            <label class="form-label">Adresse e-mail professionnelle<input type="email" placeholder="marie.dupont@institution.fr" class="form-input" /></label>
            <label class="form-label">Motif
              <select class="form-input">
                <option>Demander un accès professionnel</option><option>Question sur la méthode Cap</option><option>Proposer une ressource</option><option>Signaler un problème technique</option>
              </select>
            </label>
            <label class="form-label">Votre message<textarea rows="5" placeholder="Décrivez votre demande en quelques lignes" class="form-input" style="resize:vertical"></textarea></label>
            <span class="pill-cta accent" style="justify-content:center">Envoyer le message <span style="font-size:17px">→</span></span>
            <p style="font-size:12.5px; line-height:1.55; color:#8C877D">Merci de ne transmettre aucune donnée personnelle concernant un jeune accompagné dans ce formulaire.</p>
          </div>
        </div>
      </div>
      <div style="max-width:1180px; margin:34px auto 0">
        <span onclick="A.goHome()" class="nav-link" style="font-size:14px; color:#8C877D; cursor:pointer">← Retour à l'accueil</span>
      </div>
    </section>
  </div>`;
}

/* ---------------------------------------------------------------------- */
/* Méthode overview / zoom                                                */
/* ---------------------------------------------------------------------- */

function renderMethodeOverview() {
  return `<div>
    <section style="padding:72px 28px 60px; background:#F7F5F0; text-align:center">
      <h1 style="font-size:clamp(30px,3.4vw,50px)">Bienvenue sur La Cambuse</h1>
      <p style="margin:16px auto 0; max-width:700px; font-size:16px; line-height:1.6; color:#4A463E">Voici les 7 familles de besoins fondamentaux. Chaque famille mène à une page dédiée regroupant tous les besoins de cette catégorie.</p>
      <div style="margin:44px auto 0; max-width:1180px; display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:22px; text-align:left">
        <div class="overview-card" style="background:#C9DDA4; border-radius:24px; padding:30px">
          <div style="width:52px; height:52px; border-radius:15px; background:#F1F0E6; display:grid; place-items:center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C5A34" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.2 8.8l-1.9 4.5-4.5 1.9 1.9-4.5z"/></svg></div>
          <h3 style="margin-top:22px; font-size:26px; line-height:1.1">Le sens de la méthode</h3>
          <p style="margin-top:12px; font-size:15px; line-height:1.6; color:#3E4A2B">Cap accompagne les professionnels dans l'identification et la hiérarchisation des besoins fondamentaux des jeunes. Elle repose sur 7 familles de besoins, véritables repères éducatifs partagés par tous.</p>
        </div>
        <div class="overview-card" style="background:#D9542B; border-radius:24px; padding:30px; color:#fff">
          <div style="width:52px; height:52px; border-radius:15px; background:#FBEDD2; display:grid; place-items:center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4451F" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="5" height="8" rx="1.2"/><rect x="9.5" y="7.5" width="5" height="11.5" rx="1.2"/><rect x="16" y="4" width="5" height="15" rx="1.2"/><path d="M2.5 21.5h19"/></svg></div>
          <h3 style="margin-top:22px; font-size:26px; line-height:1.1; color:#fff">Son fonctionnement</h3>
          <p style="margin-top:12px; font-size:15px; line-height:1.6; color:#FDEDE6">Chaque famille regroupe des cartes représentant des besoins spécifiques. Les jeunes peuvent les classer du plus prioritaire au moins urgent grâce à un système visuel, favorisant la parole et la mise en projet.</p>
        </div>
        <div class="overview-card" style="background:#A9D2D5; border-radius:24px; padding:30px">
          <div style="width:52px; height:52px; border-radius:15px; background:#F1F0E6; display:grid; place-items:center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#24484C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="8" width="19" height="11.5" rx="2"/><path d="M9 8V6.2A2.2 2.2 0 0111.2 4h1.6A2.2 2.2 0 0115 6.2V8"/><path d="M2.5 13h19"/><path d="M10.5 13h3v2.4h-3z"/></svg></div>
          <h3 style="margin-top:22px; font-size:26px; line-height:1.1">Ce que vous trouverez ici</h3>
          <p style="margin-top:12px; font-size:15px; line-height:1.6; color:#24484C">En cliquant sur une famille, vous accédez à l'ensemble des besoins associés. Dans chaque carte : des ateliers pratiques, des apports théoriques, des partenaires locaux et un espace d'échange entre professionnels.</p>
        </div>
      </div>
    </section>

    ${carouselSectionHTML({ id: null, eyebrow: false, dots: false })}

    <section style="padding:72px 28px; background:#fff">
      <div style="max-width:1180px; margin:0 auto">
        <h3 style="font-size:24px">Accès rapide à une famille</h3>
        <div style="margin-top:22px; display:flex; flex-wrap:wrap; gap:12px">
          ${FAMILIES.map((f, i) => `<span onclick="A.requireFamily(${i})" style="padding:12px 18px; border-radius:40px; background:${f.color}; color:${f.ink}; font-weight:700; font-size:14px; cursor:pointer">${esc(f.name)}</span>`).join("")}
        </div>
      </div>
    </section>
  </div>`;
}

function renderMethodeZoom() {
  const fam = FAMILIES[state.family];
  const tint = `color-mix(in srgb, ${fam.color} 30%, #FFFFFF)`;
  return `<section style="padding:48px 28px 80px; background:${tint}; color:#191713">
    <div style="max-width:1240px; margin:0 auto; display:grid; grid-template-columns:minmax(240px,300px) minmax(0,1fr); gap:40px; align-items:start">
      <div>
        <div style="background:${fam.color}; border-radius:26px; border:4px solid #FDF7EC; box-shadow:0 10px 26px rgba(25,23,19,0.12); aspect-ratio:4/5; display:grid; place-items:center; padding:30px 24px; color:${fam.ink}">
          <h1 style="font-size:clamp(24px,2.2vw,32px); line-height:1.15; text-align:center">${esc(fam.name)}</h1>
        </div>
        <div style="margin-top:28px; display:flex; flex-direction:column; gap:18px; font-size:15px; line-height:1.65; color:#35312A">
          <p>${esc(fam.p1)}</p><p>${esc(fam.p2)}</p><p>${esc(fam.p3)}</p>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:16px">
        ${fam.subs.map((n) => starCard(n, fam.color, `A.openSub(${jsStr(n)})`)).join("")}
      </div>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------------- */
/* Boîte à outils                                                         */
/* ---------------------------------------------------------------------- */

function renderBoite() {
  const fam = FAMILIES[state.family];
  const sub = state.sub ?? fam.subs[0];
  const tint = `color-mix(in srgb, ${fam.color} 30%, #FFFFFF)`;
  const bank = DOCS[state.tab];
  const subIntro = "Ressources, repères et partenaires mobilisables autour de « " + sub.toLowerCase() + " ». Cet apprentissage du quotidien est un repère de base pour la santé globale et l'autonomie des jeunes accompagnés.";

  const tabs = [
    { key: "ateliers", label: "Ateliers" },
    { key: "infos", label: "Infos pratiques" },
    { key: "textes", label: "Textes / apport théorique" },
    { key: "partenaires", label: "Partenaires" }
  ];
  const tabsHTML = tabs.map((t) => `<span onclick="A.setTab('${t.key}')" style="padding:18px 22px; font-weight:700; font-size:15px; cursor:pointer; border-bottom:2px solid ${state.tab === t.key ? "var(--accent)" : "transparent"}; color:${state.tab === t.key ? "#191713" : "#6B665C"}">${esc(t.label)}</span>`).join("");

  let bodyHTML;
  if (state.tab === "partenaires") {
    bodyHTML = `<div style="margin-top:40px; display:flex; flex-direction:column; gap:40px">
      ${PARTNERS.map((p, i) => `<div style="display:flex; flex-wrap:wrap; align-items:stretch; flex-direction:${i % 2 === 0 ? "row" : "row-reverse"}">
        <div style="flex:1 1 320px; min-height:230px; border-radius:4px; background-image:repeating-linear-gradient(135deg, #EDEBE6 0 12px, #E4E1DA 12px 24px); position:relative; display:grid; place-items:center">
          <div style="width:22px; height:22px; border-radius:50% 50% 50% 0; background:var(--accent); transform:rotate(-45deg)"></div>
          <span style="position:absolute; bottom:10px; right:12px; font-family:'IBM Plex Mono',monospace; font-size:11px; color:#9A948A">CARTE — ${esc(p.city)}</span>
        </div>
        <div style="flex:1 1 280px; padding:30px 32px; color:#191713; background:${i % 2 === 0 ? "#F8D46A" : "#C2CE8E"}; align-self:center">
          <h3 style="font-size:22px; line-height:1.2">${esc(p.city)}, ${esc(p.dept)}</h3>
          <div style="margin-top:10px; font-size:15px; font-weight:700">${esc(p.spec)}</div>
          <div style="margin-top:14px; font-size:14px; line-height:1.7">${esc(p.contact)}<br />${esc(p.addr)}<br />${esc(p.cityLine)}</div>
          <div style="margin-top:12px; font-size:14px">Tel : ${esc(p.tel)}</div>
        </div>
      </div>`).join("")}
    </div>`;
  } else {
    bodyHTML = `<div style="margin-top:40px; display:flex; flex-direction:column; gap:14px">
      ${(bank.items || []).map((doc) => `<div class="doc-row" style="display:flex; align-items:center; justify-content:space-between; gap:18px; background:#FBFAF8; border:1px solid #ECE7DE; border-radius:14px; padding:18px 20px">
        <div style="display:flex; align-items:center; gap:16px; min-width:0">
          <div style="flex:none; width:26px; height:32px; border:1.5px solid #C4BEB3; border-radius:3px; position:relative; background:#fff">
            <div style="position:absolute; left:5px; right:5px; top:8px; height:1.5px; background:#C4BEB3"></div>
            <div style="position:absolute; left:5px; right:5px; top:14px; height:1.5px; background:#C4BEB3"></div>
            <div style="position:absolute; left:5px; right:9px; top:20px; height:1.5px; background:#C4BEB3"></div>
          </div>
          <div style="min-width:0">
            <div style="font-size:15px; font-weight:500; overflow-wrap:anywhere">${esc(doc.title)}</div>
            <div style="font-size:12px; color:#A09A90; margin-top:3px">${esc(doc.size)}</div>
          </div>
        </div>
        <div title="Télécharger" class="doc-download" style="flex:none; width:36px; height:36px; border-radius:50%; background:var(--accent); color:#fff; display:grid; place-items:center; font-size:15px">↓</div>
      </div>`).join("")}
    </div>`;
  }

  const related = fam.subs.filter((n) => n !== sub).slice(0, 6);

  return `<div>
    <section style="padding:40px 28px 44px; background:${tint}; color:#191713">
      <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:minmax(150px,180px) 1fr; gap:40px; align-items:center">
        <div style="background:${fam.color}; border-radius:18px; border:3px solid #FDF7EC; box-shadow:0 5px 14px rgba(25,23,19,0.09); aspect-ratio:4/5; display:grid; place-items:center; padding:12px; overflow:hidden; cursor:default">
          <div style="width:100%; aspect-ratio:1/1; max-width:112px; max-height:100%; margin:auto; background:#F4E7D8; clip-path:${STAR}; display:grid; place-items:center; padding:0 18%; text-align:center; font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:11px; line-height:1.16; color:#191713;">${esc(sub)}</div>
        </div>
        <div>
          <span style="font-size:14px; font-weight:700">${esc(fam.name)}</span>
          <h1 style="margin-top:10px; font-size:clamp(28px,3vw,42px); line-height:1.1">${esc(sub)}</h1>
          <p style="margin-top:14px; max-width:760px; font-size:16px; line-height:1.6">${esc(subIntro)}</p>
        </div>
      </div>
    </section>

    <section style="background:#fff; border-bottom:1px solid #ECE7DE">
      <div style="max-width:1180px; margin:0 auto; display:flex; flex-wrap:wrap; justify-content:center; gap:10px; padding:0 28px">${tabsHTML}</div>
    </section>

    <section style="padding:56px 28px 32px; background:#fff">
      <div style="max-width:1060px; margin:0 auto">
        <h2 style="text-align:center; font-size:clamp(26px,2.6vw,38px); color:var(--accent)">${esc(bank.title)}</h2>
        <p style="margin:14px auto 0; max-width:700px; text-align:center; font-size:15px; line-height:1.6; color:#4A463E">${esc(bank.intro)}</p>
        ${bodyHTML}
      </div>
    </section>

    <section style="padding:40px 28px 56px; background:#fff">
      <div style="max-width:1180px; margin:0 auto; position:relative; border-radius:6px; overflow:hidden; background:#2C2A26">
        <div style="position:absolute; inset:0; background-image:repeating-linear-gradient(135deg, #3A3832 0 14px, #2F2D28 14px 28px)"></div>
        <div style="position:relative; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:24px; padding:42px 40px">
          <div style="max-width:560px">
            <h3 style="color:#fff; font-size:clamp(22px,2.2vw,32px); line-height:1.15">Vous avez une idée, un atelier ou une ressource à partager ?</h3>
            <p style="margin-top:12px; font-size:15px; font-weight:700; color:#E6E1D8">Découvrez comment fonctionne l'espace Communauté.</p>
          </div>
          <span onclick="A.goCommunaute()" class="pill-cta accent" style="border-radius:8px; white-space:nowrap"><span style="font-size:18px">+</span>Savoir plus</span>
        </div>
      </div>
    </section>

    <section style="padding:64px 28px; background:#F7F5F0">
      <div style="max-width:1060px; margin:0 auto">
        <h2 style="text-align:center; font-size:clamp(26px,2.6vw,36px); color:var(--accent)">Partage d'expériences</h2>
        <p style="margin:14px auto 0; max-width:760px; text-align:center; font-size:15px; line-height:1.6; color:#4A463E">Avez-vous des conseils, des expériences passées ou des recommandations à partager ? Cet espace vivant est dédié à tous les professionnels pour échanger des idées et proposer des pistes qui enrichissent notre manière d'accompagner les jeunes.</p>
        <div style="margin-top:36px; display:flex; align-items:center; gap:16px">
          <div style="flex:none; width:44px; height:44px; border-radius:50%; background:var(--accent); color:#fff; display:grid; place-items:center; font-weight:700; font-size:15px; border:2px solid #fff">C</div>
          <div style="flex:1; display:flex; align-items:center; gap:12px; background:#fff; border:1px solid #ECE7DE; border-radius:8px; padding:10px 10px 10px 18px">
            <input type="text" placeholder="Avez-vous des conseils ou des expériences à partager ?" style="flex:1; border:none; outline:none; font-size:15px; background:transparent; min-width:0" />
            <span class="btn-accent" style="padding:11px 20px; border-radius:6px; font-size:14px; white-space:nowrap">Envoyer</span>
          </div>
        </div>
        <div style="margin-top:26px; display:flex; flex-direction:column; gap:22px">
          ${THREADS.map((t, i) => `<div>
            <div style="display:flex; gap:14px">
              <div style="flex:none; width:42px; height:42px; border-radius:50%; background:${fam.color}; color:${fam.ink}; display:grid; place-items:center; font-weight:700; font-size:14px">${t.initials}</div>
              <div style="flex:1; min-width:0">
                <div style="display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:10px">
                  <span style="font-weight:700; font-size:15px">${esc(t.name)}</span>
                  <span style="font-size:12px; color:#A09A90">${esc(t.role)} · ${esc(t.date)}</span>
                </div>
                <p style="margin-top:8px; font-size:15px; line-height:1.65; color:#35312A">${esc(t.text)}</p>
                <div style="margin-top:10px; display:flex; justify-content:flex-end; gap:18px; font-size:13px; color:#6B665C">
                  <span onclick="A.likeComment(${i})" style="cursor:pointer; font-weight:600">↑ ${state.likes[i]}</span>
                  <span style="cursor:pointer; font-weight:600">↩ ${t.replies.length}</span>
                </div>
              </div>
            </div>
            <div style="margin:12px 0 0 56px; display:flex; flex-direction:column; gap:12px">
              ${t.replies.map((r) => `<div style="display:flex; gap:12px; background:#fff; border-radius:10px; padding:14px 16px">
                <div style="flex:none; width:34px; height:34px; border-radius:50%; background:#E7E1D7; color:#4A463E; display:grid; place-items:center; font-weight:700; font-size:12px">${r.initials}</div>
                <div style="flex:1; min-width:0">
                  <div style="display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:10px">
                    <span style="font-weight:700; font-size:14px">${esc(r.name)}</span>
                    <span style="font-size:12px; color:#A09A90">${esc(r.date)}</span>
                  </div>
                  <p style="margin-top:6px; font-size:14px; line-height:1.6; color:#4A463E">${esc(r.text)}</p>
                </div>
              </div>`).join("")}
            </div>
          </div>`).join("")}
        </div>
        <p style="margin-top:22px; font-size:13px; font-weight:700; color:#6B665C; cursor:pointer">Voir plus</p>
      </div>
    </section>

    <section style="padding:64px 28px 88px; background:#fff">
      <div style="max-width:1180px; margin:0 auto">
        <h2 style="font-size:clamp(22px,2.2vw,30px); color:var(--accent)">Poursuivre l'exploration</h2>
        <p style="margin-top:10px; font-size:15px; color:#4A463E">Parcourez d'autres cartes de la famille « ${esc(fam.name)} »</p>
        <div style="margin-top:26px; display:grid; grid-template-columns:repeat(auto-fill, minmax(150px,1fr)); gap:20px">
          ${related.map((n) => `<div onclick="A.openSub(${jsStr(n)})" class="related-card" style="background:${fam.color}; border-radius:18px; border:3px solid #FDF7EC; box-shadow:0 5px 14px rgba(25,23,19,0.09); aspect-ratio:4/5; display:grid; place-items:center; padding:12px; overflow:hidden">
            <div style="width:100%; aspect-ratio:1/1; max-width:112px; max-height:100%; margin:auto; background:#F4E7D8; clip-path:${STAR}; display:grid; place-items:center; padding:0 18%; text-align:center; font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:11px; line-height:1.16; color:#191713;">${esc(n)}</div>
          </div>`).join("")}
        </div>
      </div>
    </section>
  </div>`;
}

/* ---------------------------------------------------------------------- */
/* Communauté                                                             */
/* ---------------------------------------------------------------------- */

function renderCommunaute() {
  const familyOptions = FAMILIES.map((f) => `<option>${esc(f.name)}</option>`).join("");
  return `<div>
    <section style="padding:72px 28px 56px; background:#fff">
      <div style="max-width:900px; margin:0 auto; text-align:center">
        <h1 style="font-size:clamp(30px,3.4vw,46px); line-height:1.12">La méthode Cap est un système vivant</h1>
        <p style="margin:20px auto 0; max-width:700px; font-size:16px; line-height:1.65; color:#4A463E">Elle évolue grâce aux contributions de tous les professionnels qui l'utilisent au quotidien. Cet espace est dédié au partage d'idées, d'articles, d'ateliers et de ressources qui enrichissent notre pratique commune.</p>
        <div style="margin-top:32px"><a href="#contribuer" class="pill-cta accent" style="border-radius:8px; text-decoration:none"><span style="font-size:18px">+</span>Partager une ressource</a></div>
      </div>
      <div style="max-width:1180px; margin:40px auto 0; height:220px; border-radius:16px; background-image:repeating-linear-gradient(135deg, #EDE7DC 0 14px, #E5DED1 14px 28px); display:grid; place-items:end end; padding:16px 20px">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:12px; color:#8C877D; letter-spacing:0.08em">ILLUSTRATION — professionnels assemblant un puzzle</span>
      </div>
    </section>

    <section style="padding:0 28px 56px; background:#fff">
      <div style="max-width:1180px; margin:0 auto; background:#F8D46A; border-radius:12px; padding:48px 40px; text-align:center">
        <h2 style="font-size:clamp(24px,2.4vw,34px)">La communauté, c'est vous</h2>
        <p style="margin:16px auto 0; max-width:720px; font-size:16px; line-height:1.65; font-weight:500; color:#4A3A12">Chaque proposition compte. En partageant vos expériences, vous participez à l'amélioration continue de l'outil et à la création d'un cadre encore plus adapté aux besoins des jeunes.</p>
      </div>
    </section>

    ${marqueeHTML()}

    <section id="contribuer" style="padding:72px 28px; background:#fff">
      <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(340px,1fr)); gap:48px; align-items:start">
        <div>
          <h2 style="font-size:clamp(26px,2.6vw,36px); line-height:1.12">Comment sont traitées vos contributions ?</h2>
          <p style="margin-top:16px; font-size:15px; line-height:1.6; font-weight:600; color:#35312A">Toutes les soumissions passent par un processus de relecture et de validation réalisé par des professionnels. Cela permet de garantir la qualité, la pertinence et la cohérence des ressources partagées avec la communauté.</p>
          <div style="margin-top:28px; background:#F2EFE9; border-radius:10px; padding:26px 28px">
            <h3 style="font-size:18px">Ce que vous pouvez partager :</h3>
            <div style="margin-top:18px; display:flex; flex-direction:column; gap:14px">
              <div style="display:flex; gap:12px; font-size:14px; line-height:1.55; color:#35312A"><span style="color:#4C8A5A; font-weight:700">✓</span><span>Idées et ateliers : activités éducatives, jeux, supports pédagogiques.</span></div>
              <div style="display:flex; gap:12px; font-size:14px; line-height:1.55; color:#35312A"><span style="color:#4C8A5A; font-weight:700">✓</span><span>Ressources pratiques : documents génériques, guides, formulaires, outils utiles pour les équipes.</span></div>
              <div style="display:flex; gap:12px; font-size:14px; line-height:1.55; color:#35312A"><span style="color:#4C8A5A; font-weight:700">✓</span><span>Textes et réflexions : articles, apports théoriques, retours d'expérience professionnels.</span></div>
              <div style="display:flex; gap:12px; font-size:14px; line-height:1.55; color:#35312A"><span style="color:#4C8A5A; font-weight:700">✓</span><span>Contacts utiles : partenaires, associations, institutions, structures de soutien.</span></div>
            </div>
          </div>
          <div style="margin-top:30px; padding:0 2px">
            <h3 style="font-size:18px">Ce qu'il ne faut pas partager :</h3>
            <div style="margin-top:18px; display:flex; flex-direction:column; gap:14px">
              <div style="display:flex; gap:12px; font-size:14px; line-height:1.55; color:#35312A"><span style="color:var(--accent); font-weight:700">✕</span><span>Aucune donnée personnelle identifiable d'un jeune (nom, prénom, adresse, numéro, etc.).</span></div>
              <div style="display:flex; gap:12px; font-size:14px; line-height:1.55; color:#35312A"><span style="color:var(--accent); font-weight:700">✕</span><span>Aucune photo, vidéo ou enregistrement permettant de reconnaître un jeune ou son entourage.</span></div>
              <div style="display:flex; gap:12px; font-size:14px; line-height:1.55; color:#35312A"><span style="color:var(--accent); font-weight:700">✕</span><span>Aucun dossier ou document médical individuel.</span></div>
              <div style="display:flex; gap:12px; font-size:14px; line-height:1.55; color:#35312A"><span style="color:var(--accent); font-weight:700">✕</span><span>Aucune information sensible pouvant mettre en danger la vie privée d'un jeune ou de sa famille.</span></div>
            </div>
          </div>
        </div>
        <div style="border:1px solid #ECE7DE; border-radius:10px; padding:34px">
          <h2 style="font-size:clamp(22px,2.2vw,28px); line-height:1.2; color:var(--accent)">Partagez vos idées et enrichissez la communauté</h2>
          <div style="margin-top:26px; display:flex; flex-direction:column; gap:18px">
            <label class="form-label" style="font-size:14px">Votre nom*<input type="text" placeholder="Marie Dupont" class="form-input" /></label>
            <label class="form-label" style="font-size:14px">Adresse e-mail professionnelle*<input type="email" placeholder="marie.dupont@institution.fr" class="form-input" /></label>
            <label class="form-label" style="font-size:14px">Famille / besoin associé*<select class="form-input">${familyOptions}</select></label>
            <label class="form-label" style="font-size:14px">Titre de la ressource*<input type="text" placeholder="Atelier de sensibilisation à l'hygiène" class="form-input" /></label>
            <label class="form-label" style="font-size:14px">Description*<textarea rows="3" placeholder="Décrivez brièvement la ressource et son objectif" class="form-input" style="resize:vertical"></textarea></label>
            <label class="form-label" style="font-size:14px">Type (idée, article, atelier, outil, autre)*<input type="text" placeholder="Atelier pratique, article théorique, outil numérique…" class="form-input" /></label>
            <label class="form-label" style="font-size:14px">Fichier ou lien*
              <span style="display:flex; align-items:center; gap:10px; padding:8px 10px 8px 16px; border:1px solid #ECE7DE; border-radius:8px; background:#FAF9F6">
                <input type="text" placeholder="Joindre un fichier / Coller un lien" style="flex:1; border:none; outline:none; background:transparent; font-weight:400; min-width:0" />
                <span style="flex:none; width:30px; height:30px; border-radius:50%; background:var(--accent); color:#fff; display:grid; place-items:center; font-size:14px; cursor:pointer">↑</span>
              </span>
            </label>
            <label style="display:flex; align-items:flex-start; gap:10px; font-size:14px; line-height:1.5"><input type="checkbox" style="width:17px; height:17px; margin-top:2px; accent-color:#DD0B3E" />Je confirme que ma contribution ne contient aucune donnée permettant d'identifier un jeune.</label>
            <button class="btn-accent" style="display:flex; align-items:center; justify-content:center; gap:10px; padding:17px; border:none; border-radius:8px"><span style="font-size:18px">+</span>Soumettre</button>
            <p style="font-size:11px; font-style:italic; line-height:1.6; color:#8C877D; text-align:center">Toutes les contributions sont relues et validées avant publication. Merci de respecter la confidentialité et la dignité des jeunes : vos partages doivent toujours rester génériques, pédagogiques et tournés vers la pratique professionnelle.</p>
          </div>
        </div>
      </div>
    </section>

    <section style="position:relative; padding:72px 28px; background:#6B4A2E; overflow:hidden">
      <div style="position:absolute; inset:0; background-image:repeating-linear-gradient(135deg, #7A5636 0 16px, #6B4A2E 16px 32px); display:grid; place-items:end end; padding:14px 18px">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:11px; color:#C9AE93">PHOTO — cartes Horizons étalées sur une table</span>
      </div>
      <div style="position:relative; max-width:900px; margin:0 auto; background:#fff; border-radius:6px; padding:56px 40px; text-align:center">
        <h2 style="font-size:clamp(26px,2.8vw,38px)">Poursuivre l'exploration</h2>
        <p style="margin-top:14px; font-size:15px; line-height:1.6; color:#4A463E">Retournez aux 7 familles de besoins fondamentaux et explorez de nouvelles cartes.</p>
        <div style="margin-top:26px"><span onclick="A.goMethode()" class="btn-accent" style="display:inline-block; padding:15px 26px; border-radius:6px">Revenir aux 7 familles</span></div>
      </div>
    </section>
  </div>`;
}

/* ---------------------------------------------------------------------- */
/* Mon profil                                                             */
/* ---------------------------------------------------------------------- */

function renderProfil() {
  return `<section style="padding:64px 28px 96px; background:#F7F5F0">
    <div style="max-width:900px; margin:0 auto">
      <span style="font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.1em; color:var(--accent)">MON PROFIL</span>
      <h1 style="margin-top:16px; font-size:clamp(28px,3vw,40px); line-height:1.1">Vos informations professionnelles</h1>

      <div style="margin-top:36px; display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:34px; align-items:start">
        <div style="display:flex; flex-direction:column; align-items:center; gap:16px; background:#fff; border:1px solid #ECE7DE; border-radius:24px; padding:36px 24px">
          <div style="width:96px; height:96px; border-radius:50%; background:var(--accent); color:#fff; display:grid; place-items:center; font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:36px">${esc(PROFILE.initials)}</div>
          <div style="text-align:center">
            <div style="font-family:'Familjen Grotesk',sans-serif; font-weight:700; font-size:20px">${esc(PROFILE.firstName + " " + PROFILE.lastName)}</div>
            <div style="margin-top:4px; font-size:14px; color:#6B665C">${esc(PROFILE.role)}</div>
          </div>
          <span style="margin-top:6px; font-size:13px; font-weight:700; color:var(--accent); cursor:pointer">Changer la photo</span>
        </div>

        <div style="background:#fff; border:1px solid #ECE7DE; border-radius:24px; padding:34px">
          <div style="display:flex; flex-direction:column; gap:18px">
            <label class="form-label">Prénom<input type="text" value="${esc(PROFILE.firstName)}" class="form-input" /></label>
            <label class="form-label">Nom<input type="text" value="${esc(PROFILE.lastName)}" class="form-input" /></label>
            <label class="form-label">Fonction<input type="text" value="${esc(PROFILE.role)}" class="form-input" /></label>
            <label class="form-label">Structure / association<input type="text" value="${esc(PROFILE.institution)}" class="form-input" /></label>
            <label class="form-label">Téléphone<input type="tel" value="${esc(PROFILE.phone)}" class="form-input" /></label>
            <label class="form-label">Adresse e-mail professionnelle<input type="email" value="${esc(PROFILE.email)}" class="form-input" /></label>
            <button class="btn-accent" style="padding:16px; border:none; border-radius:8px">Enregistrer les modifications</button>
          </div>
        </div>
      </div>

      <p onclick="A.goMethode()" class="nav-link" style="margin-top:30px; font-size:14px; color:#8C877D; cursor:pointer">← Retour à la méthode</p>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------------- */
/* Footer                                                                  */
/* ---------------------------------------------------------------------- */

function renderFooter() {
  return `<footer style="background:#35322D; color:#fff; padding:46px 28px 40px">
    <div style="max-width:1180px; margin:0 auto">
      <div style="display:flex; flex-wrap:wrap; align-items:center; gap:60px; padding-bottom:28px; border-bottom:1px solid #4B4741">
        <h3 style="color:#fff; font-size:20px">Retrouvez-nous sur</h3>
        <div style="display:flex; gap:22px">
          <div style="width:22px; height:22px; border:1.5px solid #fff; border-radius:4px; display:grid; place-items:center; font-size:12px; font-weight:700; cursor:pointer">f</div>
          <div style="width:22px; height:22px; border:1.5px solid #fff; border-radius:6px; display:grid; place-items:center; cursor:pointer"><div style="width:9px; height:9px; border:1.5px solid #fff; border-radius:50%"></div></div>
          <div style="width:22px; height:22px; border:1.5px solid #fff; border-radius:4px; display:grid; place-items:center; font-size:11px; font-weight:700; cursor:pointer">in</div>
          <div style="width:26px; height:20px; border:1.5px solid #fff; border-radius:5px; display:grid; place-items:center; cursor:pointer"><div style="width:0; height:0; border-left:7px solid #fff; border-top:4px solid transparent; border-bottom:4px solid transparent"></div></div>
        </div>
      </div>
      <div style="padding-top:28px; display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); gap:28px; align-items:start">
        <p style="font-size:14px; line-height:1.6; font-weight:700; max-width:280px">Cap est un outil développé par nous au service des professionnels et des jeunes accompagnés.</p>
        <div style="display:flex; flex-direction:column; gap:8px; font-size:14px">
          <span onclick="A.askLoginHeader()" style="cursor:pointer; font-weight:600">Se connecter</span>
          <span onclick="A.goContact()" style="cursor:pointer; font-weight:600">Nous contacter</span>
          <span style="cursor:pointer; font-weight:600">Mentions légales</span>
        </div>
        <div style="display:flex; justify-content:flex-end">
          <span onclick="A.goContact()" class="pill-cta accent footer-contact">Nous contacter <span style="font-size:17px">→</span></span>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ---------------------------------------------------------------------- */
/* Root render                                                            */
/* ---------------------------------------------------------------------- */

function render() {
  const s = state;
  let html = "";
  const showPublicHeader = s.page === "home" || s.page === "login" || (s.page === "contact" && !s.auth);
  const showAppHeader = ["methode", "zoom", "boite", "communaute", "profil"].indexOf(s.page) >= 0 || (s.page === "contact" && s.auth);

  if (showPublicHeader) html += renderPublicHeader();
  if (showAppHeader) html += renderAppHeader();

  html += '<main style="flex:1">';
  if (s.page === "home") html += renderHome();
  else if (s.page === "login") html += renderLogin();
  else if (s.page === "contact") html += renderContact();
  else if (s.page === "methode") html += renderMethodeOverview();
  else if (s.page === "zoom") html += renderMethodeZoom();
  else if (s.page === "boite") html += renderBoite();
  else if (s.page === "communaute") html += renderCommunaute();
  else if (s.page === "profil") html += renderProfil();
  html += "</main>";

  html += renderFooter();

  document.getElementById("app").innerHTML = `<div style="min-height:100vh; display:flex; flex-direction:column">${html}</div>`;

  if (s.searchOpen) {
    const inp = document.getElementById("searchInput");
    if (inp) {
      inp.value = s.query;
      inp.focus();
      inp.addEventListener("input", (e) => { state.query = e.target.value; updateSearchResultsPartial(); });
    }
  }
}

render();
