"use client";

import { Card, Column, Media, Row, Avatar, Text, SmartLink } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

interface PostProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <Card
      fillWidth
      key={post.slug}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {thumbnail && (
        <SmartLink href={`/blog/${post.slug}`} style={{ display: "block", lineHeight: 0 }}>
          <Media
            priority
            sizes="(max-width: 768px) 100vw, 640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="l"
            src={post.metadata.image || "/images/gallery/horizontal-1.jpg"}
            // biome-ignore lint/style/useTemplate: <explanation>
            alt={"Thumbnail of " + post.metadata.title}
            aspectRatio="16 / 9"
          />
        </SmartLink>
      )}
      <Row fillWidth>
        <Column maxWidth={28} paddingY="24" paddingX="l" gap="20" vertical="center">
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Row>
          <SmartLink href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
            <Text variant="heading-strong-l" wrap="balance">
              {post.metadata.title}
            </Text>
          </SmartLink>
          {post.metadata.tag && (
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {post.metadata.tag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
