import { routing } from "./routing";

export const siteName = "VR Education Hub";

export const defaultOgImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: siteName,
} as const;

function normalizePath(pathWithoutLocale: string) {
  if (pathWithoutLocale === "/" || pathWithoutLocale === "") return "";
  return pathWithoutLocale.startsWith("/")
    ? pathWithoutLocale
    : `/${pathWithoutLocale}`;
}

/**
 * Path without locale prefix: "/" or "" for home, "/bootcamp", "/documentation/module/slug", etc.
 */
export function alternatesForLocalizedPath(
  locale: string,
  pathWithoutLocale: string
) {
  const path = normalizePath(pathWithoutLocale);
  const canonical = path === "" ? `/${locale}` : `/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = path === "" ? `/${loc}` : `/${loc}${path}`;
  }
  languages["x-default"] =
    path === ""
      ? `/${routing.defaultLocale}`
      : `/${routing.defaultLocale}${path}`;

  return { canonical, languages };
}

export function openGraphLocales(locale: string) {
  const toOg = (l: string) => (l === "es" ? "es_ES" : "en_US");
  return {
    locale: toOg(locale),
    alternateLocale: routing.locales
      .filter((l) => l !== locale)
      .map(toOg),
  };
}
