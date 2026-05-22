# Deborah Goals

Una piccola app React pensata come rituale mattutino: ogni giorno propone a Deborah un obiettivo minuscolo, gentile e completabile anche nei giorni molto difficili.

## Idea

- Obiettivo singolo al giorno, con una versione ancora piu' morbida.
- Progressione settimanale in 4 fasi: rientro e assestamento, piccole routine, riprendere contatto con la vita, autonomia leggera.
- Catalogo attuale: 28 obiettivi, 7 per settimana, ciascuno con una versione morbida.
- Achievement teneri e non competitivi: contano i ritorni, non la perfezione.
- Messaggi post-completamento brevi e rassicuranti, scelti a rotazione.
- Possibilita' di completare, fare la versione morbida, rimandare o scegliere qualcosa di piu' piccolo.
- Salvataggio locale nel browser tramite `localStorage`.
- Asset rassicurante del porcospino in `public/assets/hedgehog-companion.png`.
- Manifest e service worker PWA per installazione su Android dal browser.

## Comandi

```bash
npm install
npm run dev
npm run build
```

## Deploy Vercel

Il progetto e' una normale app Vite. Su Vercel:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

Su Android, dopo il deploy HTTPS, aprire l'URL in Chrome e usare "Aggiungi a schermata Home" o "Installa app".

## Reminder email su Netlify

Il progetto include una Netlify Scheduled Function che puo' mandare un promemoria ogni mattina alle 10:00 ora italiana. Netlify esegue i cron in UTC, quindi la funzione gira alle 08:00 e 09:00 UTC e manda l'email solo quando in `Europe/Rome` sono le 10:00.

Configura queste variabili in Netlify, in **Site configuration > Environment variables**:

- `RESEND_API_KEY`: API key Resend.
- `REMINDER_TO_EMAIL`: indirizzo destinatario.
- `REMINDER_FROM_EMAIL`: mittente verificato in Resend, per esempio `Deborah Goals <ciao@tuodominio.it>`.
- `REMINDER_UNSUBSCRIBE_TOKEN`: stringa lunga casuale usata per il link di disattivazione.
- `REMINDER_APP_URL`: URL pubblico dell'app Netlify.

L'email contiene un link per disattivare i promemoria. Lo stato di disattivazione viene salvato in Netlify Blobs.

## Nota di cura

Questa app non sostituisce supporto clinico, terapia, medico o rete di emergenza. Deve restare un appoggio leggero: testi brevi, niente pressione, niente colpevolizzazione se salta un giorno.
