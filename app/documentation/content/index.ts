/**
 * Returns section content (Markdown) for a module by slug and locale.
 * Keys are section ids; values are Markdown strings.
 */
import { getModule0SectionContent } from "./module-0";
import { getModule1SectionContent } from "./module-1";
import { getModule2SectionContent } from "./module-2";
import { getModule3SectionContent } from "./module-3";
import { getModule4SectionContent } from "./module-4";
import { getModule5SectionContent } from "./module-5";
import { getModule6SectionContent } from "./module-6";
import { getModule7SectionContent } from "./module-7";

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
  if (moduleSlug === "designing-meaningful-learning") {
    return getModule2SectionContent(locale);
  }
  if (moduleSlug === "classroom-implementation") {
    return getModule3SectionContent(locale);
  }
  if (moduleSlug === "safety-wellbeing-accessibility") {
    return getModule4SectionContent(locale);
  }
  if (moduleSlug === "briefing-and-debriefing") {
    return getModule5SectionContent(locale);
  }
  if (moduleSlug === "solving-common-vr-problems") {
    return getModule6SectionContent(locale);
  }
  if (moduleSlug === "vr-educational-apps") {
    return getModule7SectionContent(locale);
  }
  return {};
}
