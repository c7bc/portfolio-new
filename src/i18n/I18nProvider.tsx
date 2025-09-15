"use client";

import type React from "react";
import { createContext, useContext } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Messages = Record<string, any>;

interface I18nContextValue {
  locale: string;
  messages: Messages;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function getByPath(obj: any, path: string): string | undefined {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return path.split(".").reduce((acc: any, part) => (acc ? acc[part] : undefined), obj);
}

export const I18nProvider = ({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: Messages;
  children: React.ReactNode;
}) => {
  const t = (key: string, vars?: Record<string, string | number>) => {
    const found = getByPath(messages, key);
    if (typeof found !== "string") return key;
    if (!vars) return found;
    return found.replace(/\{(.*?)\}/g, (_, k) => `${vars[k] ?? `{${k}}`}`);
  };

  return (
    <I18nContext.Provider value={{ locale, messages, t }}>{children}</I18nContext.Provider>
  );
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
