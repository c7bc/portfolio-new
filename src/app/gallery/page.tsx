import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";
import { detectLocale, getMessages, tServer } from "@/i18n/server";
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  return Meta.generate({
    title: tServer(messages, "sections.gallery.title", { name: person.name }),
    description: tServer(messages, "sections.gallery.description", { name: person.name }),
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}


export default async function Gallery() {
  const locale = await detectLocale();
  const messages = await getMessages(locale);
  const t = (k: string, vars?: Record<string, string>) => tServer(messages, k, vars);
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={t("sections.gallery.title", { name: person.name })}
        description={t("sections.gallery.description", { name: person.name })}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView />
    </Flex>
  );
}
