# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VR Education Hub — a bilingual (English/Spanish) Next.js site that teaches educators how to integrate virtual reality into classrooms. Two main sections: a guided **Bootcamp** (step-by-step learning path) and a **Documentation** reference (searchable module library).

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm test             # Jest tests
npm run test:watch   # Jest in watch mode
npm run analyze      # Bundle analysis (ANALYZE=true)
```

## Architecture

### Routing & i18n (next-intl v4)

- **Locales**: `en`, `es` — configured in `i18n/routing.ts`, prefix mode `always` (URLs are always `/en/...` or `/es/...`)
- **Middleware** (`middleware.ts`): next-intl locale detection/redirect
- **Navigation helpers**: `i18n/navigation.ts` exports locale-aware `Link`, `useRouter`, `usePathname`, `redirect` — always use these instead of `next/link` or `next/navigation`
- **Translation files**: `messages/en.json`, `messages/es.json` — flat namespace structure. Server components use `getTranslations()`, client components use `useTranslations()`
- **SEO alternates**: `i18n/languageAlternates.ts` provides `alternatesForLocalizedPath()` and `openGraphLocales()` for metadata

### Page Structure

All pages live under `app/[locale]/`. The locale layout (`app/[locale]/layout.tsx`) wraps children in `NextIntlClientProvider`.

- **Home** (`app/[locale]/page.tsx`) — landing page
- **Bootcamp** (`app/[locale]/bootcamp/`) — guided learning path with module pages
- **Documentation** (`app/[locale]/documentation/`) — reference docs with module index and individual module pages (`module/[slug]/`)
- **FAQs** (`app/[locale]/faqs/`)

### Content Data Layer

Two parallel data systems feed both Bootcamp and Documentation:

- **Documentation modules** (`app/documentation/modules.ts`): defines module structure (slugs, sections, categories, priorities). Section content lives in `app/documentation/content/module-N/sections.{en,es}.ts` — one file per locale per module.
- **Bootcamp catalog** (`app/bootcamp/catalog.ts`): derives bootcamp lessons from documentation modules (filters "essential" sections). Supporting logic in `app/bootcamp/` (progress, missions, quizzes, steps, wizard system).

### Components

All in `app/components/`. Key patterns:
- Server components by default; client components have `"use client"` directive and often a `*Client.tsx` suffix (e.g., `BootcampHomeClient.tsx`, `DocSearchClient.tsx`)
- Step components for bootcamp module flow live in `app/components/steps/`
- `Header.tsx` and `Footer.tsx` are shared across all pages

### Styling

- **Tailwind CSS v3** with `@tailwindcss/typography` plugin
- Custom color palette: `teal-50` through `teal-950` (brand color `#00a8ab`)
- Font: Geist Sans via `geist` package, loaded as CSS variable `--font-geist-sans`
- Global styles in `app/globals.css`

### Path Aliases

`@/` maps to project root (configured in tsconfig.json). Use `@/app/...`, `@/i18n/...`, etc.

### Security Headers

Configured in `next.config.mjs`: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`.

## Key Conventions

- Every page must call `setRequestLocale(locale)` for static rendering support
- Every page should export `generateMetadata` with proper alternates via `alternatesForLocalizedPath()`
- `params` in Next.js 14 page/layout props is `Promise<{ locale: string }>` — must be awaited
- When adding translation keys, update both `messages/en.json` and `messages/es.json`
- Tests use `__tests__` directories colocated with the code they test (e.g., `app/[locale]/documentation/__tests__/`)
