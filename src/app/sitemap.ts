import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

const locales = ["en", "pt"] as const;

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).flatMap((post) =>
    locales.map((l) => ({
      url: `${baseURL}/${l}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const works = getPosts(["src", "app", "work", "projects"]).flatMap((post) =>
    locales.map((l) => ({
      url: `${baseURL}/${l}/work/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.flatMap((route) =>
    locales.map((l) => ({
      url: `${baseURL}/${l}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
    })),
  );

  return [...routes, ...blogs, ...works];
}
