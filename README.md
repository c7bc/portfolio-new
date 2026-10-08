# Daniel Neri - Portfolio

Bilingual developer portfolio: https://danielneri.pro/pt and /en.

## Run

```sh
npm ci
npm run dev
```

Validation: `npm run typecheck` and `npm run build`.

## Current structure

- `src/components/Portfolio.tsx`: Portuguese/English copy, projects, filters, engineering studies and contact.
- `src/components/HeroSculpture.tsx`: interactive Three.js metal ribbon, with generated-art fallback.
- `src/app/portfolio.css`: responsive visual identity, motion and reduced-motion support.
- `src/app/[locale]/page.tsx`: static routes and localized metadata.
- `public/media`: optimized identity artwork, approved portrait and actual website captures.
- `public/resume`: selectable-text resumes, PT/EN, with optional visual/photo versions.

Zapyflow is under ongoing development. Vettano is undergoing a React-to-Godot/C# reboot; its captures show the current redesign provided by Daniel. Infinity Boost and Kalevo are archived partnership projects. Kalevo uses an actual capture from kalevo.com.br; Infinity Boost uses product screenshots from Daniel’s LinkedIn post. NexoAgro is not presented as implementation experience.

## Design and provenance

The October 2026 redesign uses a graphite/ivory/chartreuse palette, editorial typography and an interactive procedural Three.js ribbon with generated satin-metal artwork as fallback. Section mockups are design references; the live site uses real HTML text and controls. Fonts: DM Sans and Instrument Serif. Portrait selected by Daniel; no colored lighting on the portrait.

This repository originated from a Next.js / Once UI portfolio. The original source is retained in Git history; some unused template components remain for compatibility. The former MDX/blog routes were retired as part of the redesign. The MDX dependency was updated to 6.x to resolve the prior Vercel deployment block. Existing license: see LICENSE (CC BY-NC 4.0).

## Deployment

Next.js framework on the existing Vercel project `portfolio-new`. Main branch is production. Existing legacy /about, /work, /blog and /gallery URLs redirect to the portfolio sections.
