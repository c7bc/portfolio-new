# Daniel Neri — Portfolio

This repository hosts my personal portfolio website built with Next.js, MDX and Once UI.

Live demo: (deployed site or local) — this project serves a responsive portfolio showcasing projects, blog posts and a short about/CV.

![Daniel Neri Portfolio](public/images/home.jpg)

## Tech stack

- Next.js (App Router)
- MDX for content-driven pages (projects / blog)
- Once UI for design tokens and UI primitives
- TypeScript

## Quick start

1. Clone the repository

```bash
git clone https://github.com/c7bc/portfolio-new.git
```

1. Install dependencies

```bash
npm install
```

1. Run dev server

```bash
npm run dev
```

1. Edit site content

Modify `src/resources/content.tsx` to update personal details, links and the OG image used in metadata.

1. Add blog post or project

Create a new `.mdx` file under `src/app/blog/posts` or `src/app/work/projects`.

## Author

Daniel Neri — Software & Product Engineer

GitHub: [https://github.com/c7bc](https://github.com/c7bc)

## Notes

- The project uses Next.js metadata helpers (server-side) to generate Open Graph metadata. The OG image is configured in `src/resources/content.tsx`.
- Social preview caches (Facebook / Twitter) may need clearing if you change the OG image.
- If you want a raster OG image for broader social compatibility, I can generate a 1200×630 JPG and place it at `public/images/og/home.jpg`.

---

License: see `LICENSE`
