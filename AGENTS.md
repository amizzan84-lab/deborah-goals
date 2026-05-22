# AGENTS.md

## Memoria del progetto

Questo progetto si chiama `Deborah Goals`. Nasce da un prototipo Lovable per Deborah, una ragazza uscita da una clinica dopo un periodo di depressione grave. L'app deve essere un appoggio mattutino molto piccolo: un obiettivo semplice al giorno, grafica rassicurante, progressi leggeri e nessuna pressione.

## Principi di prodotto

- La mattina e' il momento piu' delicato: l'app deve aprirsi subito su un obiettivo concreto.
- La progressione attuale ha 28 obiettivi, 7 per settimana: rientro e assestamento, piccole routine, riprendere contatto con la vita, autonomia leggera.
- Ogni goal deve essere fattibile anche con pochissima energia.
- Ogni goal deve avere una `softerOption`, cioe' una versione ancora piu' facile.
- Evitare streak punitivi, messaggi colpevolizzanti, toni motivazionali aggressivi o promesse di guarigione.
- Frasi vietate: "ce la devi fare", "reagisci", "pensa positivo", "non mollare".
- Frasi coerenti: "oggi basta poco", "una cosa alla volta", "anche farlo male va bene".
- Gli achievement devono celebrare ritorni e piccoli gesti, non prestazioni.
- L'app non deve sembrare clinica. Deve sembrare calda, calma, abitabile.
- Il porcospino e' il compagno visivo principale.

## Architettura attuale

- `src/App.tsx`: UI principale, navigazione tra Oggi, Progressi e Aiuto.
- `src/data/goals.ts`: contenuti editoriali, obiettivi, temi settimanali e achievement.
- `completionMessages` in `src/data/goals.ts`: frasi post-completamento come "Va bene cosi'", "Anche poco conta", "Il porcospino approva".
- `src/lib/progress.ts`: persistenza `localStorage`, scelta goal del giorno, completamenti, streak e statistiche.
- `src/styles.css`: stile globale responsive.
- `public/assets/hedgehog-companion.png`: illustrazione generata per il progetto.

## Scelte importanti

- Deploy target: Vercel come app Vite statica.
- Persistenza: solo locale, nessun account e nessun backend.
- Android: la prima opzione consigliata e' PWA/browser installabile. Il progetto include `manifest.webmanifest` e `sw.js`. Eventualmente usare Capacitor solo se serve una vera app Android. Electron non e' adatto per smartphone.
- Linguaggio UI: italiano, diretto e morbido.
- Palette: crema caldo, verde salvia, corallo spento, lavanda morbido. Evitare interfaccia tutta beige o tutta viola.

## Quando aggiungi obiettivi

Ogni nuovo obiettivo in `src/data/goals.ts` dovrebbe includere:

- `title` con un gesto singolo.
- `minutes` tra 1 e 5, salvo motivo forte.
- 3 step massimi, brevi.
- `why` non terapeutico e non assoluto.
- `softerOption` realmente piu' facile.

Esempio di tono: "Fai un sorso d'acqua" va bene. "Rimettiti in carreggiata" non va bene.

## Safety

Mantenere una sezione di aiuto chiara ma non dominante. Se ci sono riferimenti a pericolo immediato o autolesionismo, indicare di contattare una persona vicina, medico, 112 o pronto soccorso. Non trasformare l'app in consulenza medica.
