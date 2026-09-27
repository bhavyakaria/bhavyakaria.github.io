# AGENTS.md

## About
Personal portfolio site for Bhavya Karia (Full Stack Engineer, Mumbai). Static site — no backend, no CMS. Content lives in this repo: blog posts are Markdown files, home/projects pages are `.astro` files. Content edits = editing Markdown/`.astro`; structural changes go through layouts/components.

## Stack
- Astro 3 (SSG, `.astro` files), Tailwind CSS 3 (+ `@tailwindcss/typography`), DaisyUI 3
- Content collections via `astro:content` with Zod schemas; Markdown posts (MDX integration enabled)
- Integrations: `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/tailwind`, `@astrojs/rss`
- Deployed to GitHub Pages via GitHub Actions (branch `master`)

## Commands
| Command | What |
|---------|------|
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

Local dev uses npm (`package-lock.json`); CI installs with **pnpm 8.12 / Node 18** (`pnpm-lock.yaml`). Keep both lockfiles updated when changing dependencies.

## Structure
```
src/
  pages/         → Routes (file-based): index.astro, projects.astro, cv.astro (redirect to resume),
                   404.astro, rss.xml.js, blog/[...page].astro, blog/[slug].astro,
                   blog/tag/[tag]/[...page].astro
  layouts/       → BaseLayout.astro (HTML shell, nav, theme toggle), PostLayout.astro (blog post wrapper)
  components/    → BaseHead.astro (SEO meta)
  content/       → blog/*.md posts + config.ts (Zod collection schema)
  styles/        → global.css (CSS variables for theme colors)
  config.ts      → SITE_TITLE, SITE_DESCRIPTION
```

## Content
- Blog posts: `src/content/blog/*.md` (schema: title, description, pubDate, updatedDate?, heroImage?, badge?, tags?[])
- Schema defined in `src/content/config.ts` with Zod; tags must be unique
- Posts sorted by `pubDate` desc, paginated 10/page; `/blog/tag/<tag>/` filters by tag
- New post = drop a `.md` file with the frontmatter; slug = filename

## Styling
- Theme colors are CSS variables: `surface`, `t-primary`, `t-accent`, `b-color` (see `global.css` + `tailwind.config.cjs`)
- DaisyUI light/dark themes; dark is default; toggle persisted in `localStorage`
- Font: iA Writer Mono; article text styled via `@tailwindcss/typography`

## Rules
- Do not add new frameworks or dependencies without asking
- `npm run build` must succeed before considering work complete
- Keep the existing Astro/Tailwind/DaisyUI patterns — don't introduce new CSS approaches
