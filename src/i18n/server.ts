// Avoid importing next/headers at module top so this file can be used in edge/build contexts without SSR APIs.
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let cookiesFn: any = null;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let headersFn: any = null;
try {
  // Dynamically require to prevent build-time evaluation in non-server contexts
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("next/headers");
  cookiesFn = mod.cookies;
  headersFn = mod.headers;
} catch {
  // noop fallback
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Messages = Record<string, any>;

export async function detectLocale(): Promise<string> {
  try {
    const cookieLocale = await (async () => {
      if (!cookiesFn) return undefined;
      const store = await cookiesFn();
      return store.get("locale")?.value;
    })();
    const headerLocale = await (async () => {
      if (!headersFn) return undefined;
      const hdrs = await headersFn();
      const accepted = hdrs.get("accept-language") || "en";
      return accepted.split(",")[0].split("-")[0];
    })();
    const chosen = (cookieLocale || headerLocale || "en").startsWith("pt") ? "pt" : "en";
    return chosen;
  } catch {
    return "en";
  }
}

export async function getMessages(locale: string): Promise<Messages> {
  try {
    switch (locale) {
      case "pt":
        return (await import("@/i18n/messages/pt.json")).default;
      default:
        return (await import("@/i18n/messages/en.json")).default;
    }
  } catch {
    return (await import("@/i18n/messages/en.json")).default;
  }
}

export function tServer(
  messages: Messages,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const value = key
    .split(".")
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    .reduce((acc: any, part) => (acc ? acc[part] : undefined), messages) || key;
  if (typeof value !== "string") return key;
  if (!vars) return value;
  return value.replace(/\{(.*?)\}/g, (_, k) => `${vars[k] ?? `{${k}}`}`);
}