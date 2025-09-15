import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";
import { detectLocale, getMessages, tServer } from "@/i18n/server";
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  return Meta.generate({
    title: tServer(messages, "sections.blog.title"),
    description: tServer(messages, "sections.blog.description", {
      name: person.name,
    }),
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}


export default async function Blog() {
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  const t = (k: string, vars?: Record<string, string>) =>
    tServer(messages, k, vars);

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={t("sections.blog.title")}
        description={t("sections.blog.description", { name: person.name })}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading
        marginBottom="l"
        variant="heading-strong-xl"
        marginLeft="24"
      >
        {t("sections.blog.title")}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail locale={locale} />
        <Posts
          range={[2, 3]}
          columns="2"
            thumbnail
          direction="column"
          locale={locale}
        />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          {t("home.earlierPosts")}
        </Heading>
        <Posts
          range={[4]}
          columns="2"
          thumbnail
          direction="column"
          locale={locale}
        />
      </Column>
    </Column>
  );
}
