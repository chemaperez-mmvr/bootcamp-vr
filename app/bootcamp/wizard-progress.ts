const WIZARD_PROGRESS_KEY = "vr-education-hub:wizard-progress:v1";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type WizardStepResult = {
  stepId: string;
  choiceId?: string;
  wasCorrect: boolean;
  xpEarned: number;
};

export type WizardMissionProgress = {
  missionId: string;
  moduleSlug: string;
  completed: boolean;
  currentStepIndex: number;
  stepResults: WizardStepResult[];
  totalXpEarned: number;
  completedAt?: string;
};

type WizardData = {
  missions: Record<string, WizardMissionProgress>;
};

/* ------------------------------------------------------------------ */
/*  Storage helpers                                                    */
/* ------------------------------------------------------------------ */

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function progressKey(moduleSlug: string, missionId: string): string {
  return `${moduleSlug}::${missionId}`;
}

function getData(): WizardData {
  if (!canUseStorage()) return { missions: {} };
  try {
    const raw = window.localStorage.getItem(WIZARD_PROGRESS_KEY);
    if (!raw) return { missions: {} };
    const parsed = JSON.parse(raw) as WizardData;
    if (!parsed || typeof parsed !== "object" || !parsed.missions) {
      return { missions: {} };
    }
    return parsed;
  } catch {
    return { missions: {} };
  }
}

function saveData(data: WizardData): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(WIZARD_PROGRESS_KEY, JSON.stringify(data));
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getWizardProgress(
  moduleSlug: string,
  missionId: string
): WizardMissionProgress | null {
  const data = getData();
  return data.missions[progressKey(moduleSlug, missionId)] ?? null;
}

export function saveWizardStepResult(
  moduleSlug: string,
  missionId: string,
  result: WizardStepResult
): void {
  const data = getData();
  const key = progressKey(moduleSlug, missionId);

  if (!data.missions[key]) {
    data.missions[key] = {
      missionId,
      moduleSlug,
      completed: false,
      currentStepIndex: 0,
      stepResults: [],
      totalXpEarned: 0,
    };
  }

  const mission = data.missions[key];
  mission.stepResults.push(result);
  mission.currentStepIndex = mission.stepResults.length;
  mission.totalXpEarned += result.xpEarned;

  saveData(data);
}

export function completeWizardMission(
  moduleSlug: string,
  missionId: string
): void {
  const data = getData();
  const key = progressKey(moduleSlug, missionId);

  if (data.missions[key]) {
    data.missions[key].completed = true;
    data.missions[key].completedAt = new Date().toISOString();
  }

  saveData(data);
}

export function resetWizardMission(
  moduleSlug: string,
  missionId: string
): void {
  const data = getData();
  const key = progressKey(moduleSlug, missionId);
  delete data.missions[key];
  saveData(data);
}

export function isWizardMissionComplete(
  moduleSlug: string,
  missionId: string
): boolean {
  const progress = getWizardProgress(moduleSlug, missionId);
  return progress?.completed ?? false;
}
