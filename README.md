# VR Education Hub

Sitio educativo para profesores y formadores que quieren integrar la realidad virtual (VR) en el aula. Ofrece dos formas de aprendizaje conectadas: un **Bootcamp** guiado (en desarrollo) y una **Documentación** de referencia por módulos, con búsqueda por texto y etiquetas de categoría.

---

## Características

- **Internacionalización (i18n):** Inglés y español con rutas prefijadas (`/en/`, `/es/`). Cambio de idioma sin perder contexto.
- **Home:** Hero con animación al scroll, secciones "Two Ways to Learn" y "Seamlessly Connected" con enlaces cruzados funcionales entre Bootcamp y Documentación.
- **Bootcamp:** Ruta preparada para un itinerario de aprendizaje secuencial; actualmente muestra mensaje "en desarrollo".
- **Documentación:**
  - Listado de módulos con búsqueda por texto (títulos de módulo, secciones y contenido) y filtro por categoría en el sidebar.
  - Cada tarjeta de módulo muestra: etiqueta de categoría, título, descripción y vista previa de 3 temas destacados (chips visuales).
  - Páginas de módulo (`/documentation/module/[slug]`) con secciones anclables, contenido en Markdown (EN/ES), tabla de contenidos y búsqueda; enlaces al Bootcamp en la página.
- **SEO:** Metadata por página (título, descripción) y `generateStaticParams` para pregenerar rutas estáticas donde aplica.
- **Accesibilidad:** Foco visible con teal, ARIA en navegación y búsqueda, `lang` correcto en el documento.

---

## Stack técnico

| Área        | Tecnología |
|------------|------------|
| Framework  | Next.js 14 (App Router) |
| Lenguaje  | TypeScript |
| Estilos   | Tailwind CSS |
| i18n      | next-intl |
| Fuentes   | Geist (geist) |
| Iconos    | Lucide React |
| Markdown  | react-markdown |
| Tests     | Jest, Testing Library, jest-environment-jsdom |

---

## Requisitos

- Node.js 20+
- npm (o pnpm/yarn)

---

## Cómo empezar

```bash
# Clonar e instalar dependencias
npm install

# Desarrollo (http://localhost:3000)
npm run dev

# Build de producción
npm run build

# Servir build
npm start
```

En desarrollo, las rutas con locale son por ejemplo:

- `http://localhost:3000/en`
- `http://localhost:3000/es`
- `http://localhost:3000/en/documentation`
- `http://localhost:3000/es/documentation/module/getting-vr-ready`

El middleware de next-intl redirige la raíz al locale por defecto (`en`).

---

## Scripts

| Script        | Descripción |
|---------------|-------------|
| `npm run dev` | Servidor de desarrollo (Next.js). |
| `npm run build` | Build de producción. |
| `npm start`  | Sirve el build (`next start`). |
| `npm run lint` | Lint con ESLint (configuración Next). |
| `npm run test` | Tests con Jest. |
| `npm run test:watch` | Jest en modo watch. |

---

## Estructura del proyecto

```
├── app/
│   ├── [locale]/                    # Rutas con idioma (en, es)
│   │   ├── layout.tsx               # Layout por locale (NextIntlClientProvider, SetHtmlLang)
│   │   ├── page.tsx                 # Home
│   │   ├── bootcamp/
│   │   │   └── page.tsx             # Bootcamp (en desarrollo)
│   │   ├── documentation/
│   │   │   ├── layout.tsx           # Metadata docs
│   │   │   ├── page.tsx             # Listado de módulos con búsqueda (client)
│   │   │   ├── module/
│   │   │   │   ├── page.tsx         # Página genérica "en desarrollo"
│   │   │   │   └── [slug]/page.tsx  # Módulo por slug (secciones, TOC, Markdown)
│   │   │   └── __tests__/           # Tests del listado
│   │   └── faqs/
│   │       └── page.tsx             # FAQs
│   ├── components/                  # Componentes compartidos (Header, Footer, Hero, etc.)
│   ├── documentation/               # Datos y lógica de documentación
│   │   ├── modules.ts               # Definición de módulos (id, slug, categoryId, sections)
│   │   ├── docImages.ts             # Slots de imágenes [IMAGE:slotId] por módulo
│   │   └── content/                 # Contenido Markdown por módulo e idioma
│   │       ├── index.ts             # getModuleSectionContent(moduleSlug, locale)
│   │       └── module-0..3/          # sections.en.ts, sections.es.ts, index.ts
│   ├── globals.css
│   ├── layout.tsx                   # Root layout (html lang desde getLocale())
│   └── template.tsx
├── i18n/
│   ├── navigation.ts                # Link, redirect, usePathname, useRouter (next-intl)
│   ├── request.ts                   # getRequestConfig (mensajes por locale)
│   └── routing.ts                   # locales, defaultLocale, localePrefix
├── messages/
│   ├── en.json
│   └── es.json
├── public/                          # hero-bg.jpg, hero-video.mp4, hero-vr.jpg, video-seamlessly.mp4, documentation/module-0/*.jpg
├── middleware.ts                    # next-intl middleware
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── jest.config.mjs
└── jest.setup.js
```

---

## Rutas y locales

- **Locales:** `en` (por defecto), `es`. Definidos en `i18n/routing.ts` con `localePrefix: "always"`.
- **Rutas principales:**
  - `/[locale]` — Home
  - `/[locale]/bootcamp` — Bootcamp
  - `/[locale]/documentation` — Listado de módulos (con búsqueda)
  - `/[locale]/documentation/module` — Página genérica de módulo (en desarrollo)
  - `/[locale]/documentation/module/[slug]` — Módulo por slug (ej. `basic-foundations`, `getting-vr-ready`)
  - `/[locale]/faqs` — FAQs

La navegación entre páginas debe usar `Link` y `useRouter` de `@/i18n/navigation` para mantener el locale.

---

## Internacionalización (i18n)

- **Configuración:** next-intl con plugin en `next.config.mjs`, `middleware.ts` para el matcher, e `i18n/request.ts` que carga `messages/${locale}.json`.
- **Namespaces en mensajes:** `common` (nav, footer, menú), `home`, `twoWays`, `seamless`, `bootcamp`, `docs`, `docsModule`, `faqs`. En componentes: `useTranslations("home")` o `getTranslations("docs")` en server.
- **Añadir un idioma:** Añadir el locale en `i18n/routing.ts` (`locales`) y crear `messages/<locale>.json` con la misma estructura que `en.json` (o `es.json`).

---

## Documentación (módulos)

- **Estructura:** La documentación se organiza en **módulos**. Cada módulo tiene un `slug`, una categoría (`categoryId`), y una lista de **secciones** con `id` y `titleKey`. La definición está en `app/documentation/modules.ts` (`documentationModules`, `getModuleBySlug`, `getModuleById`).
- **Contenido:** El texto de cada sección (Markdown) vive en `app/documentation/content/module-<n>/sections.en.ts` y `sections.es.ts`. `content/index.ts` exporta `getModuleSectionContent(moduleSlug, locale)` que devuelve un objeto `Record<sectionId, markdownString>`.
- **Imágenes:** En el Markdown se usan placeholders `[IMAGE:slotId]`. `app/documentation/docImages.ts` define los slots por módulo (src, alt en en/es) y `resolveDocImages(markdown, moduleSlug, locale)` los sustituye por sintaxis Markdown de imagen antes de renderizar con `react-markdown`. Las imágenes del módulo 0 están en `public/documentation/module-0/` (ver README en esa carpeta para generarlas).
- **Búsqueda:** En el listado (`/documentation`) se filtra por texto en títulos de módulo y en títulos y contenido de secciones. En la página del módulo (`/documentation/module/[slug]`) el término de búsqueda (query string) se usa para resaltar coincidencias (`HighlightSearchTerm`).
- **Filtro por categoría:** En el sidebar del listado hay un dropdown "Categories" (encima de "Modules") que permite filtrar por categoría (All, VR Fundamentals, Hardware & Setup, Pedagogical Design, Implementation). El filtro se combina con la búsqueda por texto.
- **Vista previa de temas:** Cada tarjeta de módulo muestra los primeros 3 temas del módulo como chips visuales (fondo teal-50, texto teal-700) debajo de la descripción, para que el profesor vea de un vistazo qué incluye (ej. "Getting started", "Classroom setup", "Casting").
- **Categorías:** Cada módulo tiene un `categoryId` (fundamentals, hardware, pedagogy, implementation, etc.) que se muestra como etiqueta en la tarjeta del listado; las etiquetas se traducen con las claves de `docs` en los mensajes (ej. `vrFundamentals`, `hardwareSetup`).

Para añadir un módulo: (1) añadir el objeto en `modules.ts` con `slug`, `sections`, etc.; (2) crear `content/module-<n>/` con `sections.en.ts`, `sections.es.ts` e `index.ts`; (3) registrar el módulo en `content/index.ts` y, si usa imágenes, en `docImages.ts`.

---

## Tests

- **Componente:** `app/[locale]/documentation/__tests__/DocumentationPage.test.tsx` — listado de documentación: título, búsqueda, resultados filtrados, mensaje sin resultados, header/footer. Usa mocks de `next-intl` y `@/i18n/navigation`.

Jest usa `next/jest`, `jest.setup.js` (jest-dom), y `moduleNameMapper` para `@/`. Ejecutar: `npm run test` o `npm run test:watch`.

---

## Configuración relevante

- **Next.js:** `next.config.mjs` — plugin next-intl, `transpilePackages: ["geist"]`, y supresión del warning de next-intl en webpack.
- **TypeScript:** `paths` `@/*` → `./*`; `strict: true`; incluido `.next/types`.
- **Tailwind:** `content` en `./app/**/*.{js,ts,jsx,tsx,mdx}`; tema con colores `foreground`, `muted`, `teal` y fuente Geist.
- **Jest:** `testEnvironment: "jsdom"`, `collectCoverageFrom` en `app/**/*.{ts,tsx}` (excl. `.d.ts` y node_modules).

---

## Variables de entorno

El proyecto no usa variables de entorno propias en el código. Si en el futuro se añaden (p. ej. API keys), usar `NEXT_PUBLIC_*` para las expuestas al cliente y documentarlas en un `.env.example`. Los archivos `.env*.local` están en `.gitignore`.

---

## Resumen para dar contexto

- **Qué es:** Un hub educativo sobre VR para docentes, con home con enlaces cruzados, Bootcamp (próximamente) y documentación por módulos con búsqueda, filtro por categoría y vista previa de temas destacados, todo traducido (EN/ES).
- **Cómo está hecho:** Next.js 14 App Router, TypeScript, Tailwind, next-intl (en/es); documentación en `modules.ts` + contenido Markdown por módulo en `content/module-*`.
- **Dónde está lo importante:** Rutas en `app/[locale]/`, datos y contenido en `app/documentation/` (modules.ts, content/, docImages.ts), traducciones en `messages/`, i18n en `i18n/` y `middleware.ts`, componentes en `app/components/`.
- **Cómo se prueba:** `npm run test` (Jest + Testing Library para la página de listado de documentación).
- **Cómo se ejecuta:** `npm install` → `npm run dev` para desarrollo; `npm run build` y `npm start` para producción.
