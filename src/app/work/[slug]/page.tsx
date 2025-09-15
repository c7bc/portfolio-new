import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
  Carousel,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { detectLocale, getMessages, tServer } from "@/i18n/server";
import { getContent } from "@/resources/content";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import { Projects } from "@/components/work/Projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const locale = await detectLocale();
  const posts = getPosts(["src", "app", "work", "projects"]);
  const variants = posts.filter((p) => p.slug === slugPath);
  const base = variants.find((v) => !v.lang);
  const pt = variants.find((v) => v.lang === "pt");
  const usePt = locale.startsWith("pt") && pt;
  // merge simple (reuse logic later in component too if needed)
  const merged = (() => {
    if (usePt && pt) {
      const m = { ...pt, metadata: { ...pt.metadata } };
      if (!m.metadata.title?.trim()) m.metadata.title = base?.metadata.title || m.metadata.title;
      if (!m.metadata.summary?.trim()) m.metadata.summary = base?.metadata.summary || m.metadata.summary;
      if (!m.metadata.images?.length) m.metadata.images = base?.metadata.images || m.metadata.images;
      if (!m.metadata.image && base?.metadata.image) m.metadata.image = base?.metadata.image;
      if (!m.metadata.tag && base?.metadata.tag) m.metadata.tag = base?.metadata.tag;
      return m;
    }
    return base || pt; // fallback if only pt exists
  })();

  if (!merged) return {};

  return Meta.generate({
    title: merged.metadata.title,
    description: merged.metadata.summary,
    baseURL: baseURL,
    image:
      merged.metadata.image ||
      `/api/og/generate?title=${encodeURIComponent(merged.metadata.title)}`,
    path: `${work.path}/${merged.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  const t = (k: string, vars?: Record<string, string>) => tServer(messages, k, vars);
  const { about: aboutContent } = getContent(locale);

  const posts = getPosts(["src", "app", "work", "projects"]);
  const variants = posts.filter((p) => p.slug === slugPath);
  if (!variants.length) notFound();
  const base = variants.find((v) => !v.lang);
  const pt = variants.find((v) => v.lang === "pt");
  const usePt = locale.startsWith("pt") && pt;
  const post = (() => {
    if (usePt && pt) {
      const m = { ...pt, metadata: { ...pt.metadata } };
      if (!m.metadata.title?.trim()) m.metadata.title = base?.metadata.title || m.metadata.title;
      if (!m.metadata.summary?.trim()) m.metadata.summary = base?.metadata.summary || m.metadata.summary;
      if (!m.metadata.images?.length) m.metadata.images = base?.metadata.images || m.metadata.images;
      if (!m.metadata.image && base?.metadata.image) m.metadata.image = base?.metadata.image;
      if (!m.metadata.tag && base?.metadata.tag) m.metadata.tag = base?.metadata.tag;
      return m;
    }
  return base || pt || variants[0]; // prefer base else pt else first variant
  })();

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${aboutContent.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">{t("sections.work.back") || "Projects"}</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => {
              const key = `${member.name}-${idx}`; // garante chave única mesmo se linkedin repetir
              const link = member.linkedIn || undefined;
              return (
                <span key={key}>
                  {idx > 0 && (
                    <Text as="span" onBackground="neutral-weak">
                      ,{" "}
                    </Text>
                  )}
                  {link ? (
                    <SmartLink href={link}>{member.name}</SmartLink>
                  ) : (
                    <Text as="span">{member.name}</Text>
                  )}
                </span>
              );
            })}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        post.metadata.images.length === 1 ? (
          <Media
            priority
            radius="m"
            alt={post.metadata.title}
            src={post.metadata.images[0]}
            sizes="(max-width: 960px) 100vw, 960px"
          />
        ) : (
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={post.metadata.images.map((image: string) => ({
              slide: image,
              alt: post.metadata.title,
            }))}
          />
        )
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          {t("sections.work.related") || "Related projects"}
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} locale={locale} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
