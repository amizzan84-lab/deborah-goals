import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";
import { Resend } from "resend";

type ReminderPreferences = {
  unsubscribed?: boolean;
  updatedAt?: string;
};

const STORE_NAME = "morning-reminder";
const PREFERENCES_KEY = "preferences";
const LAST_SENT_KEY = "last-sent-date";
const TIME_ZONE = "Europe/Rome";

export default async (_request: Request, context: Context) => {
  const env = readEnv(context);
  if (!env.ok) {
    console.error(env.error);
    return new Response(env.error, { status: 500 });
  }

  const now = new Date();
  const rome = getRomeDateParts(now);

  if (rome.hour !== 10) {
    return new Response(`Skipped: local hour is ${rome.hour} in ${TIME_ZONE}.`);
  }

  const store = getStore(STORE_NAME);
  const preferences = await store.get(PREFERENCES_KEY, { type: "json" }) as ReminderPreferences | null;

  if (preferences?.unsubscribed) {
    return new Response("Skipped: recipient unsubscribed.");
  }

  const lastSentDate = await store.get(LAST_SENT_KEY, { type: "text" });
  if (lastSentDate === rome.dateKey) {
    return new Response(`Skipped: reminder already sent for ${rome.dateKey}.`);
  }

  const unsubscribeUrl = new URL("/.netlify/functions/reminder-preferences", env.value.appUrl);
  unsubscribeUrl.searchParams.set("action", "unsubscribe");
  unsubscribeUrl.searchParams.set("token", env.value.unsubscribeToken);

  const resend = new Resend(env.value.resendApiKey);
  const { error } = await resend.emails.send({
    from: env.value.fromEmail,
    to: env.value.toEmail,
    subject: "Una cosa piccola per stamattina",
    html: renderEmailHtml(env.value.appUrl, unsubscribeUrl.toString()),
    text: renderEmailText(env.value.appUrl, unsubscribeUrl.toString()),
  });

  if (error) {
    console.error("Resend error", error);
    return new Response("Email send failed.", { status: 502 });
  }

  await store.set(LAST_SENT_KEY, rome.dateKey);
  return new Response(`Reminder sent for ${rome.dateKey}.`);
};

export const config: Config = {
  // Netlify cron runs in UTC. Running at 08:00 and 09:00 UTC plus the in-code
  // Europe/Rome hour check keeps delivery at 10:00 across daylight saving time.
  schedule: "0 8,9 * * *",
};

function readEnv(context: Context) {
  const appUrl = process.env.REMINDER_APP_URL || context.site.url;
  const required = {
    resendApiKey: process.env.RESEND_API_KEY,
    toEmail: process.env.REMINDER_TO_EMAIL,
    fromEmail: process.env.REMINDER_FROM_EMAIL,
    unsubscribeToken: process.env.REMINDER_UNSUBSCRIBE_TOKEN,
    appUrl,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    return {
      ok: false as const,
      error: `Missing reminder environment variables: ${missing.join(", ")}`,
    };
  }

  return {
    ok: true as const,
    value: required as {
      resendApiKey: string;
      toEmail: string;
      fromEmail: string;
      unsubscribeToken: string;
      appUrl: string;
    },
  };
}

function getRomeDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || "";

  return {
    dateKey: `${value("year")}-${value("month")}-${value("day")}`,
    hour: Number(value("hour")),
  };
}

function renderEmailHtml(appUrl: string, unsubscribeUrl: string) {
  return `<!doctype html>
<html lang="it">
  <body style="margin:0;background:#f7efe6;color:#2d2a25;font-family:Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:28px 20px;">
      <div style="background:#fffdf8;border:1px solid #eadfd3;border-radius:12px;padding:24px;">
        <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Ciao Deborah,</p>
        <p style="margin:0 0 18px;font-size:18px;line-height:1.55;font-weight:700;">
          Se ti va, il porcospino ti aspetta per una cosa piccola.
        </p>
        <p style="margin:0 0 22px;font-size:15px;line-height:1.6;">
          Anche aprire l'app per un minuto va bene. Nessuna corsa.
        </p>
        <a href="${escapeHtml(appUrl)}" style="display:inline-block;background:#46643d;color:#fffdf8;text-decoration:none;border-radius:10px;padding:13px 18px;font-weight:700;">
          Apri Deborah Goals
        </a>
        <p style="margin:22px 0 0;font-size:13px;line-height:1.5;color:#746d5f;">
          Non vuoi piu' ricevere questa email del mattino?
          <a href="${escapeHtml(unsubscribeUrl)}" style="color:#46643d;">Disattivala qui</a>.
        </p>
      </div>
    </div>
  </body>
</html>`;
}

function renderEmailText(appUrl: string, unsubscribeUrl: string) {
  return [
    "Ciao Deborah,",
    "",
    "Se ti va, il porcospino ti aspetta per una cosa piccola.",
    "Anche aprire l'app per un minuto va bene. Nessuna corsa.",
    "",
    `Apri Deborah Goals: ${appUrl}`,
    "",
    `Non vuoi piu' ricevere questa email del mattino? Disattivala qui: ${unsubscribeUrl}`,
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
