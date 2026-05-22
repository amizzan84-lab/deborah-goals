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

export const weeklyThemes = [
  {
    week: 1,
    title: "Sopravvivenza dolce",
    note: "Micro-azioni minime per attraversare l'inizio della giornata.",
  },
  {
    week: 2,
    title: "Piccole routine",
    note: "Gesti ripetibili, semplici, senza richiesta di farli bene.",
  },
  {
    week: 3,
    title: "Luce e movimento leggero",
    note: "Contatto con aria, fuori, corpo e passi piccoli.",
  },
  {
    week: 4,
    title: "Creativita' e autonomia minima",
    note: "Una scelta piccola, una traccia, un gesto un po' tuo.",
  },
];

export const goals: DailyGoal[] = [
  {
    id: "w1-breathe-01",
    week: 1,
    kind: "breath",
    title: "Tre respiri con una mano sul petto",
    minutes: 1,
    steps: [
      "Appoggia una mano sul petto o sulla pancia.",
      "Fai tre respiri lenti, senza forzarli.",
      "Quando hai finito, di' solo: sono qui.",
    ],
    why: "Serve solo a dare al corpo un segnale di presenza, non a sistemare tutto.",
    softerOption: "Se tre respiri sono troppi, fanne uno.",
  },
  {
    id: "w1-water-02",
    week: 1,
    kind: "care",
    title: "Bere qualche sorso d'acqua",
    minutes: 2,
    steps: [
      "Prendi un bicchiere o una bottiglia.",
      "Bevi due o tre sorsi lentamente.",
      "Nota la temperatura dell'acqua per un secondo.",
    ],
    why: "E' un gesto concreto, piccolo, e non richiede energia mentale.",
    softerOption: "Tieni l'acqua vicino al letto e fai un solo sorso.",
  },
  {
    id: "w1-bed-03",
    week: 1,
    kind: "body",
    title: "Sedersi sul bordo del letto",
    minutes: 2,
    steps: [
      "Sposta solo un po' il corpo verso il bordo.",
      "Appoggia i piedi a terra se riesci.",
      "Resta seduta per tre respiri.",
    ],
    why: "Non e' alzarsi davvero. E' dare al corpo una prima direzione.",
    softerOption: "Sposta solo una gamba o gira il viso verso la stanza.",
  },
  {
    id: "w1-light-04",
    week: 1,
    kind: "light",
    title: "Aprire appena la finestra",
    minutes: 2,
    steps: [
      "Apri la finestra o sposta un poco la tenda.",
      "Lascia entrare aria o luce per trenta secondi.",
      "Non devi fare altro.",
    ],
    why: "La mattina puo' iniziare da un segnale esterno, non da una grande decisione.",
    softerOption: "Guarda solo verso la finestra.",
  },
  {
    id: "w1-body-05",
    week: 1,
    kind: "body",
    title: "Muovere spalle e mani",
    minutes: 2,
    steps: [
      "Alza e abbassa le spalle due volte.",
      "Apri e chiudi le mani lentamente.",
      "Lascia cadere le braccia dove stanno comode.",
    ],
    why: "Un movimento minuscolo puo' ricordare al corpo che non e' bloccato.",
    softerOption: "Muovi solo le dita.",
  },
  {
    id: "w1-space-06",
    week: 1,
    kind: "space",
    title: "Mettere a posto una sola cosa",
    minutes: 3,
    steps: [
      "Scegli un oggetto piccolo vicino a te.",
      "Mettilo in un posto leggermente piu' comodo.",
      "Fermati li'. Una cosa basta.",
    ],
    why: "Non e' pulire la stanza. E' togliere un granello di attrito.",
    softerOption: "Indica con lo sguardo cosa sposteresti, senza farlo.",
  },
  {
    id: "w1-contact-07",
    week: 1,
    kind: "contact",
    title: "Mandare un segnale semplice",
    minutes: 3,
    steps: [
      "Scegli una persona sicura.",
      "Manda un messaggio breve: buongiorno, oggi parto piano.",
      "Non serve iniziare una conversazione.",
    ],
    why: "Il contatto puo' essere leggero e restare comunque reale.",
    softerOption: "Apri la chat senza scrivere.",
  },
  {
    id: "w2-teeth-01",
    week: 2,
    kind: "care",
    title: "Lavarsi i denti in versione minima",
    minutes: 3,
    steps: [
      "Prendi lo spazzolino.",
      "Lava i denti anche solo per pochi secondi.",
      "Sciacqua e fermati li'.",
    ],
    why: "Una routine puo' essere valida anche quando e' corta e imperfetta.",
    softerOption: "Metti solo il dentifricio sullo spazzolino.",
  },
  {
    id: "w2-care-02",
    week: 2,
    kind: "care",
    title: "Lavare il viso o le mani",
    minutes: 4,
    steps: [
      "Vai in bagno senza correre.",
      "Lava viso o mani con acqua tiepida.",
      "Asciugati con calma.",
    ],
    why: "Un gesto di cura fisica puo' precedere la motivazione.",
    softerOption: "Passa solo un po' d'acqua sulle mani.",
  },
  {
    id: "w2-music-03",
    week: 2,
    kind: "care",
    title: "Mettere una canzone tranquilla",
    minutes: 4,
    steps: [
      "Scegli una canzone che non chieda troppo.",
      "Premi play.",
      "Puoi ascoltarla sdraiata o seduta.",
    ],
    why: "A volte serve un suono esterno per non restare sola con il rumore interno.",
    softerOption: "Apri solo l'app della musica.",
  },
  {
    id: "w2-light-04",
    week: 2,
    kind: "light",
    title: "Guardare fuori per un minuto",
    minutes: 2,
    steps: [
      "Siediti o resta in piedi vicino a una finestra.",
      "Cerca tre colori fuori o nella stanza.",
      "Lascia che basti cosi'.",
    ],
    why: "Guardare cose esterne puo' dare alla mente un appiglio tranquillo.",
    softerOption: "Trova un solo colore.",
  },
  {
    id: "w2-food-05",
    week: 2,
    kind: "care",
    title: "Preparare qualcosa di semplice da mangiare",
    minutes: 5,
    steps: [
      "Scegli una cosa facile: yogurt, frutta, pane, biscotti o te'.",
      "Mettila davanti a te.",
      "Prendine anche solo un pezzetto.",
    ],
    why: "Nutrire il corpo puo' essere un gesto piccolo, non una prova da superare.",
    softerOption: "Metti il cibo vicino a te senza obbligarti a mangiarlo.",
  },
  {
    id: "w2-space-06",
    week: 2,
    kind: "space",
    title: "Preparare un angolo morbido",
    minutes: 5,
    steps: [
      "Scegli cuscino, coperta o felpa.",
      "Mettili in un punto dove puoi stare un po'.",
      "Aggiungi acqua o fazzoletti se servono.",
    ],
    why: "Rendere il posto piu' abitabile e' un obiettivo valido.",
    softerOption: "Avvicina solo la coperta.",
  },
  {
    id: "w3-body-01",
    week: 3,
    kind: "body",
    title: "Fare due passi lenti",
    minutes: 3,
    steps: [
      "Alzati se puoi.",
      "Fai due passi lenti nella stanza.",
      "Torna dove eri e siediti se ti serve.",
    ],
    why: "Il punto non e' allenarsi. E' cambiare posizione per un momento.",
    softerOption: "Sposta solo i piedi da seduta.",
  },
  {
    id: "w3-light-02",
    week: 3,
    kind: "light",
    title: "Stare due minuti vicino alla luce",
    minutes: 3,
    steps: [
      "Avvicinati a una finestra, balcone o porta.",
      "Resta li' per due minuti, anche in silenzio.",
      "Nota se l'aria e' calda, fredda o ferma.",
    ],
    why: "Un po' di luce puo' aiutare il corpo a capire che la giornata e' iniziata.",
    softerOption: "Guarda la luce da dove sei.",
  },
  {
    id: "w3-walk-03",
    week: 3,
    kind: "body",
    title: "Tre minuti di camminata morbida",
    minutes: 3,
    steps: [
      "Cammina in casa, sul pianerottolo o fuori dalla porta.",
      "Vai piano, senza contare i passi.",
      "Fermati appena senti che basta.",
    ],
    why: "Movimento leggero, non allenamento. Solo un cambio d'aria nel corpo.",
    softerOption: "Fai trenta secondi o resta in piedi.",
  },
  {
    id: "w3-outside-04",
    week: 3,
    kind: "light",
    title: "Aprire la porta di casa",
    minutes: 3,
    steps: [
      "Arriva fino alla porta.",
      "Aprila per qualche secondo.",
      "Puoi richiuderla subito.",
    ],
    why: "Non serve uscire davvero per fare un piccolo contatto con il fuori.",
    softerOption: "Tocca solo la maniglia.",
  },
  {
    id: "w3-body-05",
    week: 3,
    kind: "body",
    title: "Allungare il collo senza sforzo",
    minutes: 3,
    steps: [
      "Abbassa appena il mento.",
      "Ruota lentamente la testa a destra e sinistra.",
      "Fermati se qualcosa da' fastidio.",
    ],
    why: "Un allungamento delicato puo' sciogliere un filo di tensione.",
    softerOption: "Lascia cadere le spalle una volta.",
  },
  {
    id: "w4-contact-01",
    week: 4,
    kind: "contact",
    title: "Scrivere una frase vera",
    minutes: 5,
    steps: [
      "Apri note o una chat con te stessa.",
      "Scrivi: stamattina mi sento...",
      "Non devi correggere o spiegare.",
    ],
    why: "Dare un nome leggero a quello che c'e' puo' ridurre il peso del caos.",
    softerOption: "Scegli solo una parola.",
  },
  {
    id: "w4-drawing-02",
    week: 4,
    kind: "creative",
    title: "Fare un piccolo disegno",
    minutes: 5,
    steps: [
      "Prendi carta, note del telefono o qualsiasi spazio.",
      "Disegna una linea, una forma o un colore.",
      "Non deve essere bello.",
    ],
    why: "Lasciare una traccia puo' essere un modo minimo di esserci.",
    softerOption: "Fai solo un punto.",
  },
  {
    id: "w4-space-03",
    week: 4,
    kind: "space",
    title: "Fare il letto in versione minima",
    minutes: 5,
    steps: [
      "Tira su solo la coperta o sistema un cuscino.",
      "Non cercare ordine perfetto.",
      "Guarda il risultato per due secondi.",
    ],
    why: "Un gesto visibile puo' dare una piccola sensazione di chiusura e inizio.",
    softerOption: "Sistema solo il cuscino.",
  },
  {
    id: "w4-contact-04",
    week: 4,
    kind: "contact",
    title: "Chiedere una presenza leggera",
    minutes: 5,
    steps: [
      "Scegli una persona fidata.",
      "Scrivi: oggi mi farebbe bene un check piu' tardi.",
      "Puoi mandarlo anche senza spiegare tutto.",
    ],
    why: "Chiedere un appoggio piccolo non e' un fallimento.",
    softerOption: "Prepara il messaggio e decidi dopo se inviarlo.",
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
