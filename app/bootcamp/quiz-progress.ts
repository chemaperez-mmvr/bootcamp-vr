const QUIZ_PROGRESS_KEY = "vr-education-hub:quiz-progress:v1";

export type QuizAttempt = {
  answers: Record<string, string>;
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  attemptedAt: string;
};

type QuizProgressData = {
  attempts: Record<string, QuizAttempt[]>;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getQuizProgress(): QuizProgressData {
  if (!canUseStorage()) return { attempts: {} };
  try {
    const raw = window.localStorage.getItem(QUIZ_PROGRESS_KEY);
    if (!raw) return { attempts: {} };
    const parsed = JSON.parse(raw) as QuizProgressData;
    if (!parsed || typeof parsed !== "object" || !parsed.attempts) {
      return { attempts: {} };
    }
    return parsed;
  } catch {
    return { attempts: {} };
  }
}

function saveQuizProgress(data: QuizProgressData): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(data));
}

export function getQuizAttempts(moduleSlug: string): QuizAttempt[] {
  return getQuizProgress().attempts[moduleSlug] ?? [];
}

export function saveQuizAttempt(moduleSlug: string, attempt: QuizAttempt): void {
  const data = getQuizProgress();
  if (!data.attempts[moduleSlug]) {
    data.attempts[moduleSlug] = [];
  }
  data.attempts[moduleSlug].push(attempt);
  saveQuizProgress(data);
}

export function getBestQuizAttempt(moduleSlug: string): QuizAttempt | undefined {
  const attempts = getQuizAttempts(moduleSlug);
  if (attempts.length === 0) return undefined;
  return attempts.reduce((best, current) =>
    current.percent > best.percent ? current : best
  );
}

export function hasPassedQuiz(moduleSlug: string): boolean {
  return getQuizAttempts(moduleSlug).some((a) => a.passed);
}
