/**
 * Returns section content (Markdown) for a module by slug and locale.
 * Keys are section ids; values are Markdown strings.
 */
import { getModule0SectionContent } from "./module-0";
import { getModule1SectionContent } from "./module-1";

export function getModuleSectionContent(
  moduleSlug: string,
  locale: string
): Record<string, string> {
  if (moduleSlug === "basic-foundations") {
    return getModule0SectionContent(locale);
  }
  if (moduleSlug === "getting-vr-ready") {
    return getModule1SectionContent(locale);
  }
  return {};
}
