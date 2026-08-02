# AGENTS.md

## Stack
- Astro 3 (SSG, `.astro` files), Tailwind CSS 3, DaisyUI 3
- MDX for content (`@astrojs/mdx`)
- Deployed to GitHub Pages via GitHub Actions

## Commands
| Command | What |
|---------|------|
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

## Structure
```
src/
  pages/         → Routes (file-based routing)
  layouts/       → BaseLayout.astro, PostLayout.astro, StoreItemLayout.astro
  components/    → Reusable .astro components
  content/       → MDX collections (blog/, store/)
  styles/        → global.css
  config.ts      → SITE_TITLE, SITE_DESCRIPTION
```

## Content
- Blog posts: `src/content/blog/*.md` (schema: title, description, pubDate, tags[], heroImage?, badge?)
- Store items: `src/content/store/*.md` (schema: title, description, pricing, checkoutUrl, heroImage?)
- Schemas defined in `src/content/config.ts` with Zod

## Rules
- Do not add new frameworks or dependencies without asking
- `npm run build` must succeed before considering work complete
- Keep the existing Astro/Tailwind/DaisyUI patterns — don't introduce new CSS approaches
