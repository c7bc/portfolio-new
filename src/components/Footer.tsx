import { Row, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { getContent, personDefault } from "@/resources/content";
import { detectLocale } from "@/i18n/server";
import styles from "./Footer.module.scss";

export const Footer = async () => {
  const currentYear = new Date().getFullYear();
  // Fallback padrão
  let person = personDefault;
  let social: ReturnType<typeof getContent>["social"] = [];
  try {
    const locale = await detectLocale();
    const content = getContent(locale);
    person = content.person;
    social = content.social;
  } catch (e) {
    // silencioso: usa fallback en
  }

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
          
         
        </Text>
        <Row gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
