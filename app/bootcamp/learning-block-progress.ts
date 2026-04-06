/* ------------------------------------------------------------------ */
/*  Learning Block progress — localStorage persistence                 */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "vr-education-hub:learning-blocks:v1";

export type LearningBlockPhase = "scenario" | "insight" | "microcheck";

export type LearningBlockStepResult = {
  blockId: string;
  phase: "scenario" | "microcheck";
  choiceId?: string;
  wasCorrect: boolean;
};

export type LearningBlockProgress = {
  moduleSlug: string;
  completed: boolean;
  currentBlockIndex: number;
  currentPhase: LearningBlockPhase;
  blockResults: LearningBlockStepResult[];
  microCheckRetries: number;
  completedAt?: string;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAll(): Record<string, LearningBlockProgress> {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, LearningBlockProgress>): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function getLearningBlockProgress(
  moduleSlug: string
): LearningBlockProgress | null {
  const all = readAll();
  return all[moduleSlug] ?? null;
}

export function initLearningBlockProgress(
  moduleSlug: string
): LearningBlockProgress {
  const all = readAll();
  if (all[moduleSlug]) return all[moduleSlug];

  const progress: LearningBlockProgress = {
    moduleSlug,
    completed: false,
    currentBlockIndex: 0,
    currentPhase: "scenario",
    blockResults: [],
    microCheckRetries: 0,
  };
  all[moduleSlug] = progress;
  writeAll(all);
  return progress;
}

export function saveLearningBlockResult(
  moduleSlug: string,
  result: LearningBlockStepResult
): void {
  const all = readAll();
  const progress = all[moduleSlug];
  if (!progress) return;

  progress.blockResults.push(result);
  writeAll(all);
}

export function updateLearningBlockPhase(
  moduleSlug: string,
  blockIndex: number,
  phase: LearningBlockPhase
): void {
  const all = readAll();
  const progress = all[moduleSlug];
  if (!progress) return;

  progress.currentBlockIndex = blockIndex;
  progress.currentPhase = phase;
  writeAll(all);
}

export function incrementMicroCheckRetries(moduleSlug: string): void {
  const all = readAll();
  const progress = all[moduleSlug];
  if (!progress) return;

  progress.microCheckRetries += 1;
  writeAll(all);
}

export function completeLearningBlocks(moduleSlug: string): void {
  const all = readAll();
  const progress = all[moduleSlug];
  if (!progress) return;

  progress.completed = true;
  progress.completedAt = new Date().toISOString();
  writeAll(all);
}

export function resetLearningBlocks(moduleSlug: string): void {
  const all = readAll();
  delete all[moduleSlug];
  writeAll(all);
}
