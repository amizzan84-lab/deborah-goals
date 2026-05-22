import { getStore } from "@netlify/blobs";

type ReminderPreferences = {
  unsubscribed?: boolean;
  updatedAt?: string;
};

const STORE_NAME = "morning-reminder";
const PREFERENCES_KEY = "preferences";

export default async (request: Request) => {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const token = url.searchParams.get("token");
  const expectedToken = process.env.REMINDER_UNSUBSCRIBE_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return htmlResponse("Link non valido", "Questo link non sembra valido. Puoi chiudere questa pagina.", 403);
  }

  const store = getStore(STORE_NAME);

  if (action === "unsubscribe") {
    const preferences: ReminderPreferences = {
      unsubscribed: true,
      updatedAt: new Date().toISOString(),
    };

    await store.setJSON(PREFERENCES_KEY, preferences);
    return htmlResponse(
      "Promemoria disattivato",
      "Da domani non riceverai piu' l'email del mattino. Puoi comunque aprire Deborah Goals quando vuoi.",
    );
  }

  return htmlResponse("Azione non riconosciuta", "Questo link non contiene un'azione valida.", 400);
};

function htmlResponse(title: string, message: string, status = 200) {
  return new Response(
    `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#f7efe6;color:#2d2a25;font-family:Arial,sans-serif;">
    <main style="max-width:560px;margin:0 auto;padding:36px 20px;">
      <section style="background:#fffdf8;border:1px solid #eadfd3;border-radius:12px;padding:24px;">
        <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:32px;line-height:1.05;">${escapeHtml(title)}</h1>
        <p style="margin:0;font-size:16px;line-height:1.6;">${escapeHtml(message)}</p>
      </section>
    </main>
  </body>
</html>`,
    {
      status,
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
