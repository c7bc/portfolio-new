import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  locale?: string; // passado pela página
  preferLocaleVariant?: boolean;
}

// Agrupa por slug e escolhe melhor variante (locale preferido se existir)
function groupAndSelect(
  posts: ReturnType<typeof getPosts>,
  locale: string | undefined,
  preferLocaleVariant: boolean,
) {
  const bySlug = new Map<
    string,
    { base?: (typeof posts)[number]; localeVariant?: (typeof posts)[number] }
  >();

  for (const p of posts) {
    const entry = bySlug.get(p.slug) || {};
    const fp = p.filePath || "";
    // Variante PT somente se arquivo termina exatamente com .pt.mdx
    const isPt = /\.pt\.mdx$/i.test(fp);
    if (isPt) entry.localeVariant = p; else entry.base = p;
    bySlug.set(p.slug, entry);
  }

  const result: typeof posts = [];
  for (const [, pair] of bySlug.entries()) {
    let chosen = pair.base;
    // Preferimos variante localizada se configurado, mas só se tiver título ou conteúdo úteis
    if (
      preferLocaleVariant &&
      locale?.startsWith("pt") &&
      pair.localeVariant &&
      (pair.localeVariant.metadata.title?.trim() || pair.localeVariant.content.trim())
    ) {
      chosen = pair.localeVariant;
      // Herdar campos faltantes da base
      if (pair.base) {
        if (!chosen.metadata.title?.trim()) chosen.metadata.title = pair.base.metadata.title;
        if (!chosen.metadata.summary?.trim()) chosen.metadata.summary = pair.base.metadata.summary;
        if (!chosen.metadata.image?.trim()) chosen.metadata.image = pair.base.metadata.image;
        if (!chosen.metadata.tag) chosen.metadata.tag = pair.base.metadata.tag;
      }
    } else if (!chosen && pair.localeVariant) {
      // Caso não exista base mas só a variante
      chosen = pair.localeVariant;
    }
    if (chosen) result.push(chosen);
  }
  return result;
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  locale,
  preferLocaleVariant = true,
}: PostsProps) {
  // Carrega todos os posts (inclui variantes .pt.mdx)
  // Carrega todas as variantes (base + .pt) e deixa o agrupamento decidir
  let allBlogs = getPosts(["src", "app", "blog", "posts"]);

  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  // Ordena por data desc antes de agrupar (para priorizar variante mais recente se necessário)
  allBlogs.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  // Deduplicação com preferência de variante traduzida
  const uniqueBlogs = groupAndSelect(allBlogs, locale, preferLocaleVariant);

  const displayedBlogs = range
    ? uniqueBlogs.slice(
        range[0] - 1,
        range.length === 2 ? range[1] : uniqueBlogs.length,
      )
    : uniqueBlogs;

  if (!displayedBlogs.length) return null;

  return (
    <Grid
      columns={columns}
      s={{ columns: 1 }}
      fillWidth
      marginBottom="40"
      gap="16"
    >
      {displayedBlogs.map((post) => (
        <Post
          key={post.slug}
          post={post}
          thumbnail={thumbnail}
          direction={direction}
        />
      ))}
    </Grid>
  );
}
