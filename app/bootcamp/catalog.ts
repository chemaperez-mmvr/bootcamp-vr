import {
  documentationModules,
  type DocumentationModule,
  type ModuleSection,
} from "@/app/documentation/modules";

export type BootcampLessonType = "video" | "practice" | "checklist" | "tour";

export type BootcampLesson = {
  id: string;
  type: BootcampLessonType;
  titleKey: string;
  descriptionKey: string;
  durationMin: number;
  sectionId: string;
};

export type BootcampModule = {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  documentationModuleSlug: string;
  lessons: BootcampLesson[];
};

/** Theoretical modules: video + quiz only (no interactive missions). */
export const theoreticalSlugs = new Set([
  "basic-foundations",             // M0
  "designing-meaningful-learning", // M2
  "briefing-and-debriefing",       // M5
  "vr-educational-apps",           // M7
]);

function getEssentialSections(module: DocumentationModule): ModuleSection[] {
  const essentials = module.sections.filter((section) => section.priority === "essential");
  return essentials.length > 0 ? essentials : module.sections.slice(0, 3);
}

function buildModuleLessons(module: DocumentationModule): BootcampLesson[] {
  const sections = getEssentialSections(module);

  if (theoreticalSlugs.has(module.slug)) {
    // Theoretical: all lessons are "video" (teaching via video, validated by quiz)
    return sections.map((section, index) => ({
      id: `lesson-${index + 1}`,
      type: "video" as BootcampLessonType,
      titleKey: section.titleKey,
      descriptionKey: "lessonTemplates.video.description",
      durationMin: 8,
      sectionId: section.id,
    }));
  }

  // Practical: mix of video, practice, checklist (with interactive missions)
  const lessonTypes: BootcampLessonType[] = ["video", "practice", "checklist", "practice", "checklist"];
  const durations = [8, 12, 10, 10, 8];
  return sections.map((section, index) => ({
    id: `lesson-${index + 1}`,
    type: lessonTypes[index] ?? "practice",
    titleKey: section.titleKey,
    descriptionKey: `lessonTemplates.${lessonTypes[index] ?? "practice"}.description`,
    durationMin: durations[index] ?? 10,
    sectionId: section.id,
  }));
}

export const bootcampCatalog: BootcampModule[] = documentationModules.map((module) => {
  const lessons = buildModuleLessons(module);

  if (module.slug === "getting-vr-ready") {
    const tourSectionId = lessons[0]?.sectionId ?? "";
    lessons.unshift({
      id: "tour-quest3",
      type: "tour",
      titleKey: "tourLesson.title",
      descriptionKey: "tourLesson.description",
      durationMin: 6,
      sectionId: tourSectionId,
    });

    // Boss level mission — integrating final challenge
    lessons.push({
      id: "boss-full-prep",
      type: "practice",
      titleKey: "wizardMissions.fullPrep.title",
      descriptionKey: "wizardMissions.fullPrep.description",
      durationMin: 15,
      sectionId: "full-prep-boss",
    });
  }

  return {
    slug: module.slug,
    titleKey: module.titleKey,
    descriptionKey: module.descriptionKey,
    documentationModuleSlug: module.slug,
    lessons,
  };
});

export function getBootcampModuleBySlug(slug: string): BootcampModule | undefined {
  return bootcampCatalog.find((module) => module.slug === slug);
}
