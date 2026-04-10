import { sectionsEn } from "./sections.en";
import { sectionsEs } from "./sections.es";

export type ModuleContentLocale = "en" | "es";

const byLocale: Record<ModuleContentLocale, Record<string, string>> = {
  en: sectionsEn,
  es: sectionsEs,
};

export function getModule7SectionContent(
  locale: string
): Record<string, string> {
  const lang = locale === "es" ? "es" : "en";
  return byLocale[lang] ?? byLocale.en;
}
