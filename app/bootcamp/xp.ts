const XP_STORAGE_KEY = "vr-education-hub:xp:v1";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type LevelDef = {
  level: number;
  nameKey: string;
  minXP: number;
};

type XPData = {
  totalXP: number;
  /** eventType::eventKey → xp awarded (prevents double-counting) */
  events: Record<string, number>;
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

export const XP_VALUES: Record<string, number> = {
  tour_complete: 50,
  mission_complete: 30,
  mission_best_choice: 10,
  checklist_item: 5,
  quiz_attempt: 10,
  quiz_pass: 50,
  perfect_quiz: 30,
  first_try_pass: 20,
  wizard_step_correct: 5,
  boss_complete: 60,
  module_complete: 100,
};

const LEVELS: LevelDef[] = [
  { level: 1, nameKey: "xp.levels.novice", minXP: 0 },
  { level: 2, nameKey: "xp.levels.explorer", minXP: 100 },
  { level: 3, nameKey: "xp.levels.practitioner", minXP: 300 },
  { level: 4, nameKey: "xp.levels.champion", minXP: 600 },
  { level: 5, nameKey: "xp.levels.master", minXP: 1000 },
];

/* ------------------------------------------------------------------ */
/*  Storage helpers                                                    */
/* ------------------------------------------------------------------ */

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getStoredData(): XPData {
  if (!canUseStorage()) return { totalXP: 0, events: {} };
  try {
    const raw = window.localStorage.getItem(XP_STORAGE_KEY);
    if (!raw) return { totalXP: 0, events: {} };
    const parsed = JSON.parse(raw) as XPData;
    if (!parsed || typeof parsed !== "object") return { totalXP: 0, events: {} };
    return {
      totalXP: parsed.totalXP ?? 0,
      events: parsed.events ?? {},
    };
  } catch {
    return { totalXP: 0, events: {} };
  }
}

function saveStoredData(data: XPData): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(XP_STORAGE_KEY, JSON.stringify(data));
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

function eventKey(eventType: string, key: string): string {
  return `${eventType}::${key}`;
}

export function hasXPEvent(eventType: string, key: string): boolean {
  const data = getStoredData();
  return eventKey(eventType, key) in data.events;
}

export function addXP(
  eventType: string,
  key: string
): { xpGained: number; leveledUp: boolean; newLevel?: LevelDef } {
  const data = getStoredData();
  const ek = eventKey(eventType, key);

  // Prevent double-awarding
  if (ek in data.events) {
    return { xpGained: 0, leveledUp: false };
  }

  const amount = XP_VALUES[eventType] ?? 0;
  const prevLevel = getCurrentLevel(data.totalXP);

  data.events[ek] = amount;
  data.totalXP += amount;
  saveStoredData(data);

  const newLevel = getCurrentLevel(data.totalXP);
  const leveledUp = newLevel.level > prevLevel.level;

  return { xpGained: amount, leveledUp, newLevel: leveledUp ? newLevel : undefined };
}

export function getXPData(): XPData {
  return getStoredData();
}

export function getModuleXP(moduleSlug: string): number {
  const data = getStoredData();
  let total = 0;
  for (const [key, amount] of Object.entries(data.events)) {
    if (key.includes(moduleSlug)) {
      total += amount;
    }
  }
  return total;
}

export function getCurrentLevel(totalXP?: number): LevelDef {
  const xp = totalXP ?? getStoredData().totalXP;
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.minXP) {
      current = level;
    } else {
      break;
    }
  }
  return current;
}

export function getXPToNextLevel(totalXP: number): {
  current: number;
  needed: number;
  percent: number;
} {
  const currentLevel = getCurrentLevel(totalXP);
  const currentIdx = LEVELS.indexOf(currentLevel);
  const nextLevel = LEVELS[currentIdx + 1];

  if (!nextLevel) {
    // Max level reached
    return { current: 0, needed: 0, percent: 100 };
  }

  const xpIntoLevel = totalXP - currentLevel.minXP;
  const xpForLevel = nextLevel.minXP - currentLevel.minXP;
  const percent = xpForLevel === 0 ? 100 : Math.round((xpIntoLevel / xpForLevel) * 100);

  return { current: xpIntoLevel, needed: xpForLevel, percent };
}
