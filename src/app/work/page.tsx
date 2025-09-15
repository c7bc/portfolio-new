import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getContent } from "@/resources/content";
import { detectLocale, getMessages, tServer } from "@/i18n/server";
export const dynamic = "force-dynamic";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  const { person, work } = getContent(locale);
  return Meta.generate({
    title: tServer(messages, "sections.work.title", { name: person.name }),
    description: tServer(messages, "sections.work.description", { name: person.name }),
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}


export default async function Work() {
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  const { person, work, about } = getContent(locale);
  const t = (k: string, vars?: Record<string, string>) => tServer(messages, k, vars);
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={t("sections.work.title", { name: person.name })}
        description={t("sections.work.description", { name: person.name })}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {t("sections.work.title", { name: person.name })}
      </Heading>
      <Projects locale={locale} />
    </Column>
  );
}
