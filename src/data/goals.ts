export type GoalKind =
  | "breath"
  | "body"
  | "light"
  | "care"
  | "contact"
  | "space"
  | "creative";

export type DailyGoal = {
  id: string;
  week: number;
  kind: GoalKind;
  title: string;
  minutes: number;
  steps: string[];
  why: string;
  softerOption: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  isUnlocked: (stats: {
    totalCompleted: number;
    bestStreak: number;
    completionDates: string[];
    completedKinds: GoalKind[];
    postponedDates: string[];
  }) => boolean;
};

export const affirmations = [
  "Questa mattina non deve essere perfetta.",
  "Un passo minuscolo conta comunque.",
  "Puoi iniziare piano. Anche pianissimo.",
  "Oggi basta poco.",
  "Una cosa alla volta.",
  "Anche farlo male va bene.",
  "Il corpo puo' ricevere gentilezza prima delle parole.",
  "Restare qui un altro minuto e' gia' una forma di cura.",
  "Non serve sentirsi pronta per fare una cosa piccola.",
  "Oggi basta un gesto che non faccia male.",
  "Se e' una mattina difficile, scegli la versione piu' morbida.",
];

export const completionMessages = [
  "Va bene cosi'.",
  "Anche poco conta.",
  "Una cosa alla volta.",
  "Oggi basta questo.",
  "Hai attraversato il momento.",
  "Nessuna corsa.",
  "Non devi recuperare tutta la vita oggi.",
  "Anche farlo male e' farlo.",
  "Il porcospino approva.",
  "Sei arrivata fin qui.",
];

export const weeklyThemes = [
  {
    week: 1,
    title: "Rientro e assestamento",
    note: "Gesti piccoli per rientrare nella mattina senza chiedere troppo.",
  },
  {
    week: 2,
    title: "Piccole routine",
    note: "Gesti ripetibili, semplici, senza richiesta di farli bene.",
  },
  {
    week: 3,
    title: "Riprendere contatto con la vita",
    note: "Piccoli contatti con fuori, persone, stanza e cose familiari.",
  },
  {
    week: 4,
    title: "Autonomia leggera",
    note: "Scelte morbide, un po' di fuori, una traccia personale.",
  },
];

export const goals: DailyGoal[] = [
  {
    id: "w1-window-01",
    week: 1,
    kind: "light",
    title: "Aprire la finestra per un minuto",
    minutes: 1,
    steps: [
      "Apri la finestra o sposta un poco la tenda.",
      "Lascia entrare aria o luce per un minuto.",
      "Poi richiudi, se vuoi.",
    ],
    why: "Un po' d'aria puo' segnare l'inizio della giornata senza grandi decisioni.",
    softerOption: "Alza solo la tapparella.",
  },
  {
    id: "w1-drink-02",
    week: 1,
    kind: "care",
    title: "Bere qualcosa appena sveglia",
    minutes: 2,
    steps: [
      "Prendi acqua, te', succo o quello che hai vicino.",
      "Bevi lentamente.",
      "Non serve finire tutto.",
    ],
    why: "E' un gesto concreto, piccolo, e non richiede energia mentale.",
    softerOption: "Due sorsi bastano.",
  },
  {
    id: "w1-face-teeth-03",
    week: 1,
    kind: "care",
    title: "Lavarsi viso e denti senza fretta",
    minutes: 5,
    steps: [
      "Vai in bagno piano.",
      "Lava viso e denti come riesci.",
      "Fermati appena basta.",
    ],
    why: "Una routine minima puo' aiutare il corpo a capire che la giornata e' iniziata.",
    softerOption: "Fai anche solo una delle due cose.",
  },
  {
    id: "w1-walk-04",
    week: 1,
    kind: "body",
    title: "Fare una mini camminata",
    minutes: 5,
    steps: [
      "Cammina in casa, sul pianerottolo o sotto casa.",
      "Vai piano.",
      "Quando senti che basta, torna.",
    ],
    why: "Non e' allenamento. E' solo spostare il corpo un poco.",
    softerOption: "Arriva solo sotto casa.",
  },
  {
    id: "w1-away-bed-05",
    week: 1,
    kind: "space",
    title: "Stare dieci minuti lontana dal letto",
    minutes: 10,
    steps: [
      "Scegli un punto diverso dal letto.",
      "Porta con te coperta, acqua o telefono se serve.",
      "Resta li' dieci minuti, senza fare altro.",
    ],
    why: "Cambiare posto per poco puo' alleggerire il blocco del risveglio.",
    softerOption: "Siediti altrove con una coperta.",
  },
  {
    id: "w1-food-06",
    week: 1,
    kind: "care",
    title: "Preparare qualcosa di semplice da mangiare",
    minutes: 5,
    steps: [
      "Scegli una cosa facile.",
      "Mettila davanti a te.",
      "Mangiane anche solo un po'.",
    ],
    why: "Il corpo merita qualcosa anche quando l'appetito e' lontano.",
    softerOption: "Anche yogurt, biscotti o toast.",
  },
  {
    id: "w1-song-07",
    week: 1,
    kind: "care",
    title: "Mettere una canzone che conosci bene",
    minutes: 4,
    steps: [
      "Scegli una canzone familiare.",
      "Premi play.",
      "Puoi ascoltarla senza fare nient'altro.",
    ],
    why: "Una cosa conosciuta puo' fare da piccolo appiglio.",
    softerOption: "Ascoltane solo un pezzo.",
  },
  {
    id: "w2-visit-08",
    week: 2,
    kind: "contact",
    title: "Andare dai tuoi o da un'amica anche poco",
    minutes: 10,
    steps: [
      "Scegli una persona o un posto sicuro.",
      "Valuta se passare anche solo poco.",
      "Puoi restare il tempo che riesci.",
    ],
    why: "Un contatto piccolo puo' bastare, senza dover spiegare tutto.",
    softerOption: "Manda solo un messaggio.",
  },
  {
    id: "w2-corner-09",
    week: 2,
    kind: "space",
    title: "Sistemare un piccolo angolo della casa",
    minutes: 3,
    steps: [
      "Scegli un punto molto piccolo.",
      "Sposta o sistema una cosa.",
      "Fermati prima che diventi troppo.",
    ],
    why: "Non e' pulire casa. E' rendere un punto appena piu' abitabile.",
    softerOption: "Sposta solo una cosa.",
  },
  {
    id: "w2-shower-10",
    week: 2,
    kind: "care",
    title: "Fare una doccia tranquilla",
    minutes: 10,
    steps: [
      "Prepara asciugamano e vestiti comodi.",
      "Fai una doccia senza fretta.",
      "Dopo puoi sederti subito.",
    ],
    why: "L'acqua puo' essere un gesto di cura, non una prova da superare.",
    softerOption: "Anche solo lavarsi i capelli o il viso.",
  },
  {
    id: "w2-draw-11",
    week: 2,
    kind: "creative",
    title: "Disegnare cinque minuti",
    minutes: 5,
    steps: [
      "Prendi carta o note del telefono.",
      "Disegna qualcosa per cinque minuti.",
      "Non deve avere senso.",
    ],
    why: "Lasciare una traccia piccola puo' aiutare a tornare presente.",
    softerOption: "Fai solo linee o forme a caso.",
  },
  {
    id: "w2-walk-audio-12",
    week: 2,
    kind: "body",
    title: "Fare una passeggiata ascoltando qualcosa",
    minutes: 10,
    steps: [
      "Scegli musica, podcast o un audio leggero.",
      "Esci o cammina vicino casa.",
      "Rientra quando ne hai abbastanza.",
    ],
    why: "Camminare con un suono familiare puo' rendere il fuori piu' sostenibile.",
    softerOption: "Stai solo all'aperto qualche minuto.",
  },
  {
    id: "w2-clothes-13",
    week: 2,
    kind: "space",
    title: "Preparare i vestiti per domani",
    minutes: 5,
    steps: [
      "Scegli un punto dove appoggiarli.",
      "Metti insieme vestiti comodi.",
      "Non serve decidere tutto perfettamente.",
    ],
    why: "Preparare una cosa piccola puo' togliere peso alla mattina dopo.",
    softerOption: "Scegli solo la maglia.",
  },
  {
    id: "w2-natural-light-14",
    week: 2,
    kind: "light",
    title: "Stare un po' alla luce naturale",
    minutes: 5,
    steps: [
      "Avvicinati a una finestra, balcone o porta.",
      "Resta li' qualche minuto.",
      "Guarda senza dover pensare.",
    ],
    why: "La luce naturale puo' dare al corpo un riferimento gentile.",
    softerOption: "Guarda fuori dalla finestra.",
  },
  {
    id: "w3-shop-15",
    week: 3,
    kind: "contact",
    title: "Entrare in un negozio anche senza comprare niente",
    minutes: 10,
    steps: [
      "Scegli un negozio facile o vicino.",
      "Entra anche solo per poco.",
      "Puoi uscire senza comprare niente.",
    ],
    why: "Stare in un luogo normale per poco puo' essere gia' contatto con la vita.",
    softerOption: "Passaci davanti.",
  },
  {
    id: "w3-errand-16",
    week: 3,
    kind: "space",
    title: "Fare una commissione piccola",
    minutes: 10,
    steps: [
      "Scegli una commissione minuscola.",
      "Fai solo quella.",
      "Dopo puoi fermarti.",
    ],
    why: "Una cosa pratica piccola puo' dare un punto fermo alla giornata.",
    softerOption: "Pensala e basta.",
  },
  {
    id: "w3-cook-17",
    week: 3,
    kind: "care",
    title: "Cucinare una cosa un po' piu' vera",
    minutes: 15,
    steps: [
      "Scegli una cosa semplice ma calda o preparata.",
      "Fai un passaggio alla volta.",
      "Va bene se viene imperfetta.",
    ],
    why: "Preparare cibo puo' essere un gesto di presenza verso il corpo.",
    softerOption: "Prepara solo gli ingredienti.",
  },
  {
    id: "w3-longer-walk-18",
    week: 3,
    kind: "body",
    title: "Fare una camminata piu' lunga del solito",
    minutes: 15,
    steps: [
      "Scegli un giro facile.",
      "Cammina un po' piu' del solito.",
      "Torna prima di stancarti troppo.",
    ],
    why: "Allungare appena il confine puo' bastare.",
    softerOption: "Cinque minuti bastano.",
  },
  {
    id: "w3-write-19",
    week: 3,
    kind: "creative",
    title: "Scrivere tre righe su come ti senti oggi",
    minutes: 5,
    steps: [
      "Apri note o un foglio.",
      "Scrivi tre righe sincere.",
      "Non devi spiegare bene.",
    ],
    why: "Mettere qualche parola puo' dare forma a quello che pesa.",
    softerOption: "Una frase sola.",
  },
  {
    id: "w3-good-thing-20",
    week: 3,
    kind: "care",
    title: "Guardare qualcosa che ti faceva stare bene",
    minutes: 10,
    steps: [
      "Scegli una serie, video, foto o cosa familiare.",
      "Guardane un pezzo.",
      "Puoi fermarti quando vuoi.",
    ],
    why: "Non deve aggiustare tutto. Puo' solo ricordare una cosa buona.",
    softerOption: "Cercalo senza guardarlo tutto.",
  },
  {
    id: "w3-room-21",
    week: 3,
    kind: "space",
    title: "Sistemare una parte minuscola della tua stanza",
    minutes: 5,
    steps: [
      "Scegli una parte piccolissima.",
      "Sistema solo quella.",
      "Fermati quando hai fatto una cosa.",
    ],
    why: "Una parte minuscola puo' essere abbastanza.",
    softerOption: "Piega una felpa.",
  },
  {
    id: "w4-start-22",
    week: 4,
    kind: "body",
    title: "Fare una cosa senza pensarci troppo prima",
    minutes: 5,
    steps: [
      "Scegli una cosa piccola.",
      "Iniziala prima di ragionarci troppo.",
      "Puoi fermarti dopo il primo minuto.",
    ],
    why: "A volte iniziare minuscolo e' piu' gentile che convincersi.",
    softerOption: "Iniziala per un minuto.",
  },
  {
    id: "w4-liked-23",
    week: 4,
    kind: "creative",
    title: "Fare qualcosa che prima ti piaceva",
    minutes: 10,
    steps: [
      "Scegli una cosa che un tempo ti piaceva.",
      "Preparala o fanne un pezzetto.",
      "Non devi provare subito lo stesso piacere.",
    ],
    why: "Il legame con le cose buone puo' tornare piano.",
    softerOption: "Preparati a farla.",
  },
  {
    id: "w4-outside-24",
    week: 4,
    kind: "light",
    title: "Passare un po' di tempo fuori casa senza fretta",
    minutes: 15,
    steps: [
      "Esci senza dover fare qualcosa di preciso.",
      "Resta fuori un po'.",
      "Rientra quando senti che basta.",
    ],
    why: "Il fuori puo' essere solo un posto dove stare, non una performance.",
    softerOption: "Stai fuori cinque minuti.",
  },
  {
    id: "w4-photo-25",
    week: 4,
    kind: "creative",
    title: "Fare una foto a qualcosa di bello o strano",
    minutes: 5,
    steps: [
      "Guarda intorno mentre sei in casa o fuori.",
      "Trova qualcosa che ti colpisce appena.",
      "Fagli una foto.",
    ],
    why: "Notare una cosa e' gia' un piccolo contatto con il mondo.",
    softerOption: "Guardalo e basta.",
  },
  {
    id: "w4-good-food-26",
    week: 4,
    kind: "care",
    title: "Preparare qualcosa di buono da mangiare",
    minutes: 15,
    steps: [
      "Scegli una cosa che ti sembra buona.",
      "Preparala con il ritmo che hai.",
      "Mangiane anche poco.",
    ],
    why: "Il gusto puo' tornare come un dettaglio, non come un obbligo.",
    softerOption: "Scegli cosa mangerai.",
  },
  {
    id: "w4-text-27",
    week: 4,
    kind: "contact",
    title: "Scrivere a qualcuno senza motivo preciso",
    minutes: 5,
    steps: [
      "Scegli una persona con cui ti senti al sicuro.",
      "Scrivi una frase semplice.",
      "Non devi spiegare per forza come stai.",
    ],
    why: "Un contatto puo' essere leggero e non avere uno scopo enorme.",
    softerOption: "Apri la chat.",
  },
  {
    id: "w4-bad-day-28",
    week: 4,
    kind: "breath",
    title: "Fare pace con una giornata storta",
    minutes: 2,
    steps: [
      "Fermati un momento.",
      "Nota che oggi puo' essere storta.",
      "Di' piano: oggi va cosi'.",
    ],
    why: "Non tutte le giornate si aggiustano. Alcune si attraversano.",
    softerOption: "Dirti: oggi va cosi'.",
  },
];

export const achievements: Achievement[] = [
  {
    id: "first-morning",
    title: "Hai attraversato la mattina",
    description: "Hai completato un obiettivo. Piccolo, reale.",
    isUnlocked: ({ totalCompleted }) => totalCompleted >= 1,
  },
  {
    id: "small-step",
    title: "Piccolo passo fatto",
    description: "Una cosa alla volta. Anche cosi' va bene.",
    isUnlocked: ({ totalCompleted }) => totalCompleted >= 2,
  },
  {
    id: "hedgehog-out",
    title: "Il porcospino e' uscito dalla tana",
    description: "Hai scelto un contatto con luce, corpo o stanza.",
    isUnlocked: ({ completedKinds }) =>
      completedKinds.some((kind) => ["light", "body", "space"].includes(kind)),
  },
  {
    id: "three-days",
    title: "Tre giorni di presenza",
    description: "Tre ritorni nel tempo, senza richiesta di perfezione.",
    isUnlocked: ({ completionDates }) => new Set(completionDates).size >= 3,
  },
  {
    id: "one-thing",
    title: "Una cosa alla volta",
    description: "Cinque obiettivi completati nel tuo ritmo.",
    isUnlocked: ({ totalCompleted }) => totalCompleted >= 5,
  },
  {
    id: "soft-postpone",
    title: "Anche rimandare con gentilezza conta",
    description: "Hai scelto di non forzare quando era troppo.",
    isUnlocked: ({ postponedDates }) => postponedDates.length >= 1,
  },
  {
    id: "steady-light",
    title: "Tre mattine vicine",
    description: "Tre giorni di fila. Piano, ma c'eri.",
    isUnlocked: ({ bestStreak }) => bestStreak >= 3,
  },
];
