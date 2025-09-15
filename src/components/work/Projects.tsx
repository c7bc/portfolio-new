import { Column } from "@once-ui-system/core";
import { ProjectCard } from "../ProjectCard";
import { getPosts } from "@/utils/utils";

interface ProjectsProps {
  range?: [number] | [number, number];
  exclude?: string[];
  locale?: string;
}

type ProjectRecord = ReturnType<typeof getPosts>[number];

function mergeVariant(pt: ProjectRecord, base?: ProjectRecord): ProjectRecord {
  if (!base) return pt;
  // Clone to avoid mutating originals if reused elsewhere
  const merged: ProjectRecord = { ...pt, metadata: { ...pt.metadata } };
  if (!merged.metadata.title?.trim()) merged.metadata.title = base.metadata.title;
  if (!merged.metadata.summary?.trim()) merged.metadata.summary = base.metadata.summary;
  if (!(merged.metadata.images?.length)) merged.metadata.images = base.metadata.images;
  if (!merged.metadata.image && base.metadata.image) merged.metadata.image = base.metadata.image;
  if (!merged.metadata.tag) merged.metadata.tag = base.metadata.tag;
  return merged;
}

function selectLocalizedProjects(items: ProjectRecord[], locale?: string) {
  const groups = new Map<string, { base?: ProjectRecord; pt?: ProjectRecord }>();
  for (const p of items) {
    const entry = groups.get(p.slug) || {};
  const isPt = p.lang === "pt" || /\.pt\.mdx$/i.test(p.filePath);
  if (isPt) entry.pt = p; else entry.base = p;
    groups.set(p.slug, entry);
  }
  const result: ProjectRecord[] = [];
  const usePt = locale?.startsWith("pt");
  for (const [slug, { base, pt }] of groups.entries()) {
    if (usePt && pt) result.push(mergeVariant(pt, base));
    else if (base) result.push(base);
    else if (pt) result.push(pt); // fallback if only pt exists
  }
  return result;
}

// Fallback extra de deduplicação caso slug repita após seleção
function dedupe(projects: ProjectRecord[]) {
  const seen = new Set<string>();
  return projects.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export function Projects({ range, exclude = [], locale }: ProjectsProps) {
  let projects = getPosts(["src", "app", "work", "projects"]);

  if (exclude.length) {
    projects = projects.filter((p) => !exclude.includes(p.slug));
  }

  projects.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt || "1970-01-01").getTime() -
      new Date(a.metadata.publishedAt || "1970-01-01").getTime(),
  );

  const localized = selectLocalizedProjects(projects, locale);
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[Projects localization debug] locale=", locale, localized.map(p => ({ slug: p.slug, lang: p.lang, title: p.metadata.title })));
  }
  const uniqueProjects = dedupe(localized);

  const displayed = range
    ? uniqueProjects.slice(
        range[0] - 1,
        range.length === 2 ? range[1] : uniqueProjects.length,
      )
    : uniqueProjects;

  if (!displayed.length) return null;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
    {displayed.map((post, index) => (
        <ProjectCard
          key={post.slug}
          priority={index < 2}
          href={`/work/${post.slug}`}
          title={locale?.startsWith("pt") && post.lang === "pt" ? `${post.metadata.title}` : post.metadata.title}
          description={post.metadata.summary}
          // Ajuste/adicione conforme seu metadata:
          images={
            Array.isArray(post.metadata.images)
              ? post.metadata.images
              : post.metadata.image
              ? [post.metadata.image]
              : []
          }
          content={post.content ? post.content.slice(0, 1) : ""} // placeholder; ajuste se quiser
          avatars={
            post.metadata.team
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              ? post.metadata.team.map((m: any) => ({ src: m.avatar }))
              : []
          }
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
