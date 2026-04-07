import type { BootcampModule } from "./catalog";
import { theoreticalSlugs } from "./catalog";
import { getQuizForModule } from "./quizzes";
import { getSlidesForModule } from "./slides";
import { isLessonCompleted } from "./progress";
import { hasPassedQuiz } from "./quiz-progress";

export type ModuleStepType = "overview" | "intro-video" | "tour" | "content" | "quiz" | "results";

export type ModuleStepDef = {
  type: ModuleStepType;
  labelKey: string;
};

const STEP_STORAGE_KEY = "vr-education-hub:module-step:v1";
const OVERVIEW_VISITED_KEY = "vr-education-hub:overview-visited:v1";
const INTRO_VIDEO_KEY = "vr-education-hub:intro-video-watched:v1";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getModuleSteps(module: BootcampModule): ModuleStepDef[] {
  const steps: ModuleStepDef[] = [{ type: "overview", labelKey: "steps.overview" }];

  const hasIntroVideo = getSlidesForModule(module.slug).some(
    (s) => s.type === "video" && s.videoUrl
  );
  if (hasIntroVideo) {
    steps.push({ type: "intro-video", labelKey: "steps.introVideo" });
  }

  const hasTour = module.lessons.some((l) => l.type === "tour");
  if (hasTour) {
    steps.push({ type: "tour", labelKey: "steps.tour" });
  }

  const isTheoretical = theoreticalSlugs.has(module.slug);
  steps.push({ type: "content", labelKey: isTheoretical ? "steps.learn" : "steps.content" });

  const quiz = getQuizForModule(module.slug);
  if (quiz) {
    steps.push({ type: "quiz", labelKey: "steps.quiz" });
  }

  steps.push({ type: "results", labelKey: "steps.results" });
  return steps;
}

export function isStepUnlocked(
  module: BootcampModule,
  steps: ModuleStepDef[],
  stepIndex: number,
  completedMap: Record<string, boolean>
): boolean {
  if (stepIndex === 0) return true;

  const step = steps[stepIndex];
  if (!step) return false;

  const prevStep = steps[stepIndex - 1];
  if (!prevStep) return false;

  switch (step.type) {
    case "intro-video":
      return isOverviewVisited(module.slug);

    case "tour": {
      const hasIntroVideoStep = steps.some(s => s.type === "intro-video");
      return hasIntroVideoStep ? isIntroVideoWatched(module.slug) : isOverviewVisited(module.slug);
    }

    case "content": {
      if (prevStep.type === "tour") {
        const tourLesson = module.lessons.find((l) => l.type === "tour");
        return tourLesson ? Boolean(completedMap[tourLesson.id]) : true;
      }

      if (prevStep.type === "intro-video") {
        return isIntroVideoWatched(module.slug);
      }

      return isOverviewVisited(module.slug);
    }

    case "quiz": {
      const contentLessons = module.lessons.filter((l) => l.type !== "tour");
      return contentLessons.every((l) => Boolean(completedMap[l.id]));
    }

    case "results": {
      const tourLesson = module.lessons.find((l) => l.type === "tour");
      const tourDone = tourLesson ? Boolean(completedMap[tourLesson.id]) : true;

      const contentLessons = module.lessons.filter((l) => l.type !== "tour");
      const contentDone = contentLessons.every((l) => Boolean(completedMap[l.id]));

      const quiz = getQuizForModule(module.slug);
      const quizDone = quiz ? hasPassedQuiz(module.slug) : true;

      return tourDone && contentDone && quizDone;
    }

    default:
      return false;
  }
}

export function getSavedStepIndex(moduleSlug: string): number {
  if (!canUseStorage()) return 0;
  try {
    const raw = window.localStorage.getItem(STEP_STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw) as Record<string, number>;
    return data[moduleSlug] ?? 0;
  } catch {
    return 0;
  }
}

export function saveStepIndex(moduleSlug: string, index: number): void {
  if (!canUseStorage()) return;
  try {
    const raw = window.localStorage.getItem(STEP_STORAGE_KEY);
    const data: Record<string, number> = raw ? JSON.parse(raw) : {};
    data[moduleSlug] = index;
    window.localStorage.setItem(STEP_STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function isOverviewVisited(moduleSlug: string): boolean {
  if (!canUseStorage()) return false;
  try {
    const raw = window.localStorage.getItem(OVERVIEW_VISITED_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as Record<string, boolean>;
    return Boolean(data[moduleSlug]);
  } catch {
    return false;
  }
}

export function markOverviewVisited(moduleSlug: string): void {
  if (!canUseStorage()) return;
  try {
    const raw = window.localStorage.getItem(OVERVIEW_VISITED_KEY);
    const data: Record<string, boolean> = raw ? JSON.parse(raw) : {};
    data[moduleSlug] = true;
    window.localStorage.setItem(OVERVIEW_VISITED_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function isIntroVideoWatched(moduleSlug: string): boolean {
  if (!canUseStorage()) return false;
  try {
    const raw = window.localStorage.getItem(INTRO_VIDEO_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as Record<string, boolean>;
    return Boolean(data[moduleSlug]);
  } catch {
    return false;
  }
}

export function markIntroVideoWatched(moduleSlug: string): void {
  if (!canUseStorage()) return;
  try {
    const raw = window.localStorage.getItem(INTRO_VIDEO_KEY);
    const data: Record<string, boolean> = raw ? JSON.parse(raw) : {};
    data[moduleSlug] = true;
    window.localStorage.setItem(INTRO_VIDEO_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}
