"use client";
import { Column, Heading, Text } from "@once-ui-system/core";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {t("ui.notFoundTitle")}
      </Heading>
      <Text onBackground="neutral-weak">{t("ui.notFoundDescription")}</Text>
    </Column>
  );
}
