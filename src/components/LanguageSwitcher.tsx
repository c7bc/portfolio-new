"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Row, ToggleButton } from "@once-ui-system/core";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export const LanguageSwitcher = () => {
  const { locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const setLocale = async (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(async () => {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: nextLocale }),
      });
      router.refresh();
    });
  };

  return (
    <Row gap="4" vertical="center" aria-label="Language switcher">
      {(["en", "pt"] as const).map((l) => (
        <ToggleButton
          key={l}
            label={l.toUpperCase()}
            selected={locale === l}
            disabled={isPending}
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
        />
      ))}
    </Row>
  );
};
