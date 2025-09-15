import { getPosts } from "@/utils/utils";
import { baseURL, blog, person } from "@/resources";
import { NextResponse } from "next/server";
import { getMessages } from "@/i18n/server";

function buildFeed({
  language,
  title,
  description,
  posts,
}: {
  language: string;
  title: string;
  description: string;
  posts: ReturnType<typeof getPosts>;
}) {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <link>${baseURL}/${language}/blog</link>
    <description>${description}</description>
    <language>${language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseURL}/api/rss/${language}" rel="self" type="application/rss+xml" />
    <managingEditor>${person.email || "noreply@example.com"} (${person.name})</managingEditor>
    <webMaster>${person.email || "noreply@example.com"} (${person.name})</webMaster>
    <image>
      <url>${baseURL}${person.avatar || "/images/avatar.jpg"}</url>
      <title>${title}</title>
      <link>${baseURL}/${language}/blog</link>
    </image>
    ${sortedPosts
      .map(
        (post) => `
    <item>
      <title>${post.metadata.title}</title>
      <link>${baseURL}/${language}/blog/${post.slug}</link>
      <guid>${baseURL}/${language}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.metadata.summary}]]></description>
      ${post.metadata.image ? `<enclosure url="${baseURL}${post.metadata.image}" type="image/jpeg" />` : ""}
      ${post.metadata.tag ? `<category>${post.metadata.tag}</category>` : ""}
      <author>${person.email || "noreply@example.com"} (${person.name})</author>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;
}

export async function GET() {
  // Default English feed for backward compatibility
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const messages = await getMessages("en");
  const title = messages.sections?.blog?.title || blog.title;
  const description = (messages.sections?.blog?.description || blog.description).replace(
    /\{name\}/g,
    person.name,
  );
  const rssXml = buildFeed({ language: "en", title, description, posts });
  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
