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

const loaders: Record<string, (locale: string) => Record<string, string>> = {
  "basic-foundations": getModule0SectionContent,
  "getting-vr-ready": getModule1SectionContent,
  "designing-meaningful-learning": getModule2SectionContent,
  "classroom-implementation": getModule3SectionContent,
  "safety-wellbeing-accessibility": getModule4SectionContent,
  "briefing-and-debriefing": getModule5SectionContent,
  "solving-common-vr-problems": getModule6SectionContent,
  "vr-educational-apps": getModule7SectionContent,
};

export function getModuleSectionContent(
  moduleSlug: string,
  locale: string
): Record<string, string> {
  const loader = loaders[moduleSlug];
  return loader ? loader(locale) : {};
}
