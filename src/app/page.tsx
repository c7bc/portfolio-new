import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { baseURL, routes } from "@/resources";
import { getContent } from "@/resources/content";
import { detectLocale, getMessages, tServer } from "@/i18n/server";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  const { person, home } = getContent(locale);
  return Meta.generate({
    title: tServer(messages, "home.title", { name: person.name }),
    description: tServer(messages, "home.description", { role: person.role }),
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}


export default async function Home() {
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  const t = (k: string, vars?: Record<string, string>) => tServer(messages, k, vars);
  const { home, about, person } = getContent(locale);
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={t("home.title", { name: person.name })}
        description={t("home.description", { role: person.role })}
        image={`/api/og/generate?title=${encodeURIComponent(t("home.title", { name: person.name }))}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{t("home.featuredWork")}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {t("home.headline")}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {t("home.subline", { name: person.firstName, company: "Vettano, Nexo e Infinity Boost" })}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
  <Projects range={[1, 1]} locale={locale} />
      </RevealFx>
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                {t("home.latestFromBlog")}
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts
                range={[1, 2]}
                columns="2"
                thumbnail
                direction="column"
                locale={locale}
              />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
  <Projects range={[2,3]} locale={locale} />
      <Mailchimp />
    </Column>
  );
}
