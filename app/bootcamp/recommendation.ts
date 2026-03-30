import { bootcampCatalog } from "./catalog";
import { isLessonCompleted } from "./progress";

export function getNextRecommendedLesson():
  | {
      moduleSlug: string;
      lessonId: string;
    }
  | undefined {
  for (const module of bootcampCatalog) {
    for (const lesson of module.lessons) {
      if (!isLessonCompleted(module.slug, lesson.id)) {
        return { moduleSlug: module.slug, lessonId: lesson.id };
      }
    }
  }
  return undefined;
}
