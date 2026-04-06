import { bootcampCatalog } from "./catalog";
import { getQuizForModule } from "./quizzes";
import { hasPassedQuiz } from "./quiz-progress";

const BOOTCAMP_PROGRESS_STORAGE_KEY = "vr-education-hub:bootcamp-progress:v1";
const OVERVIEW_VISITED_KEY = "vr-education-hub:overview-visited:v1";

type ProgressData = {
  completedLessons: Record<string, true>;
};

const defaultProgress: ProgressData = {
  completedLessons: {},
};

function lessonProgressKey(moduleSlug: string, lessonId: string): string {
  return `${moduleSlug}::${lessonId}`;
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getProgress(): ProgressData {
  if (!canUseStorage()) return defaultProgress;
  try {
    const raw = window.localStorage.getItem(BOOTCAMP_PROGRESS_STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as ProgressData;
    if (!parsed || typeof parsed !== "object" || !parsed.completedLessons) {
      return defaultProgress;
    }
    return parsed;
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: ProgressData): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(BOOTCAMP_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function isLessonCompleted(moduleSlug: string, lessonId: string): boolean {
  const progress = getProgress();
  return Boolean(progress.completedLessons[lessonProgressKey(moduleSlug, lessonId)]);
}

export function setLessonCompleted(moduleSlug: string, lessonId: string, completed: boolean): void {
  const progress = getProgress();
  const key = lessonProgressKey(moduleSlug, lessonId);
  if (completed) {
    progress.completedLessons[key] = true;
  } else {
    delete progress.completedLessons[key];
  }
  saveProgress(progress);
}

/* ------------------------------------------------------------------ */
/*  Step-based progress (overview → tour? → content → quiz? → done)   */
/* ------------------------------------------------------------------ */

function isOverviewVisitedLocal(moduleSlug: string): boolean {
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

export function getModuleProgress(moduleSlug: string): {
  completed: number;
  total: number;
  status: "not_started" | "in_progress" | "completed";
  percent: number;
} {
  const module = bootcampCatalog.find((item) => item.slug === moduleSlug);
  if (!module) {
    return { completed: 0, total: 0, status: "not_started", percent: 0 };
  }

  const milestones: boolean[] = [];

  // 1. Overview visited
  milestones.push(isOverviewVisitedLocal(moduleSlug));

  // 2. Tour completed (if module has a tour lesson)
  const tourLesson = module.lessons.find((l) => l.type === "tour");
  if (tourLesson) {
    milestones.push(isLessonCompleted(moduleSlug, tourLesson.id));
  }

  // 3. Content completed (all non-tour lessons done)
  const contentLessons = module.lessons.filter((l) => l.type !== "tour");
  const contentDone =
    contentLessons.length > 0 &&
    contentLessons.every((l) => isLessonCompleted(moduleSlug, l.id));
  milestones.push(contentDone);

  // 4. Quiz passed (if module has a quiz)
  const quiz = getQuizForModule(moduleSlug);
  if (quiz) {
    milestones.push(hasPassedQuiz(moduleSlug));
  }

  const total = milestones.length;
  const completed = milestones.filter(Boolean).length;
  const status =
    completed === 0 ? "not_started" : completed >= total ? "completed" : "in_progress";
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, status, percent };
}

export function getGlobalProgress(): {
  completed: number;
  total: number;
  percent: number;
} {
  let totalSteps = 0;
  let completedSteps = 0;

  for (const module of bootcampCatalog) {
    const mp = getModuleProgress(module.slug);
    totalSteps += mp.total;
    completedSteps += mp.completed;
  }

  const percent = totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);
  return { completed: completedSteps, total: totalSteps, percent };
}
