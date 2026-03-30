import { bootcampCatalog } from "./catalog";

const BOOTCAMP_PROGRESS_STORAGE_KEY = "vr-education-hub:bootcamp-progress:v1";

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
  const total = module.lessons.length;
  const completed = module.lessons.reduce(
    (acc, lesson) => acc + (isLessonCompleted(module.slug, lesson.id) ? 1 : 0),
    0
  );
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
  const allLessons = bootcampCatalog.flatMap((module) =>
    module.lessons.map((lesson) => ({ moduleSlug: module.slug, lessonId: lesson.id }))
  );
  const total = allLessons.length;
  const completed = allLessons.reduce(
    (acc, lesson) => acc + (isLessonCompleted(lesson.moduleSlug, lesson.lessonId) ? 1 : 0),
    0
  );
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}
