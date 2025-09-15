// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import fs from "fs";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  locale: string;
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

type PostRecord = {
  filePath: string;
  metadata: Metadata;
  slug: string; // canonical slug (without .lang)
  lang?: string; // extracted language code
  content: string;
  originalSlug: string; // raw filename slug
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    locale: ""
  };

  return { metadata, content };
}

function splitSlugLocale(raw: string): { base: string; lang?: string } {
  // convention: name.lang (e.g., my-post.pt)
  const parts = raw.split(".");
  if (parts.length >= 2) {
    const potentialLang = parts[parts.length - 1];
    if (potentialLang.length === 2) {
      return { base: parts.slice(0, -1).join("."), lang: potentialLang };
    }
  }
  return { base: raw };
}

function getMDXData(dir: string): PostRecord[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const absolutePath = path.join(dir, file);
    const { metadata, content } = readMDXFile(absolutePath);
    const slug = path.basename(file, path.extname(file));
    const { base, lang } = splitSlugLocale(slug);
    const enrichedMetadata = { ...metadata, locale: lang || metadata.locale };
    return {
      filePath: absolutePath,
      metadata: enrichedMetadata,
      slug: base,
      lang,
      content,
      originalSlug: slug,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""], locale?: string) {
  const postsDir = path.join(process.cwd(), ...customPath);
  const data = getMDXData(postsDir);
  // Importante: retornamos SEM filtrar para permitir que componentes façam merge / herança.
  // O param locale fica reservado para futura otimização (não usado agora para não esconder variantes .pt).
  return data;
}

export type { PostRecord };
