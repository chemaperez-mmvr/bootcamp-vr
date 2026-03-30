import { getXPData } from "./xp";

const BADGES_STORAGE_KEY = "vr-education-hub:badges:v1";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type BadgeDef = {
  id: string;
  icon: string;
  nameKey: string;
  descriptionKey: string;
  conditionType: string;
  conditionValue: string;
};

type BadgeData = {
  earned: Record<string, true>;
};

/* ------------------------------------------------------------------ */
/*  Badge definitions                                                  */
/* ------------------------------------------------------------------ */

export const BADGE_DEFS: BadgeDef[] = [
  {
    id: "hardware-hero",
    icon: "🔧",
    nameKey: "badges.hardwareHero.name",
    descriptionKey: "badges.hardwareHero.description",
    conditionType: "module_complete",
    conditionValue: "getting-vr-ready",
  },
  {
    id: "sharp-eye",
    icon: "🎯",
    nameKey: "badges.sharpEye.name",
    descriptionKey: "badges.sharpEye.description",
    conditionType: "quiz_perfect",
    conditionValue: "any",
  },
  {
    id: "quick-learner",
    icon: "⚡",
    nameKey: "badges.quickLearner.name",
    descriptionKey: "badges.quickLearner.description",
    conditionType: "quiz_first_try",
    conditionValue: "any",
  },
  {
    id: "explorer",
    icon: "🧭",
    nameKey: "badges.explorer.name",
    descriptionKey: "badges.explorer.description",
    conditionType: "tour_complete",
    conditionValue: "any",
  },
  {
    id: "mission-master",
    icon: "🏅",
    nameKey: "badges.missionMaster.name",
    descriptionKey: "badges.missionMaster.description",
    conditionType: "all_best_choices",
    conditionValue: "any",
  },
  {
    id: "xp-100",
    icon: "⭐",
    nameKey: "badges.xp100.name",
    descriptionKey: "badges.xp100.description",
    conditionType: "xp_threshold",
    conditionValue: "100",
  },
  {
    id: "xp-300",
    icon: "🌟",
    nameKey: "badges.xp300.name",
    descriptionKey: "badges.xp300.description",
    conditionType: "xp_threshold",
    conditionValue: "300",
  },
  {
    id: "xp-600",
    icon: "💫",
    nameKey: "badges.xp600.name",
    descriptionKey: "badges.xp600.description",
    conditionType: "xp_threshold",
    conditionValue: "600",
  },
  {
    id: "xp-1000",
    icon: "🏆",
    nameKey: "badges.xp1000.name",
    descriptionKey: "badges.xp1000.description",
    conditionType: "xp_threshold",
    conditionValue: "1000",
  },
];

/* ------------------------------------------------------------------ */
/*  Storage helpers                                                    */
/* ------------------------------------------------------------------ */

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getBadgeData(): BadgeData {
  if (!canUseStorage()) return { earned: {} };
  try {
    const raw = window.localStorage.getItem(BADGES_STORAGE_KEY);
    if (!raw) return { earned: {} };
    const parsed = JSON.parse(raw) as BadgeData;
    if (!parsed || typeof parsed !== "object" || !parsed.earned) {
      return { earned: {} };
    }
    return parsed;
  } catch {
    return { earned: {} };
  }
}

function saveBadgeData(data: BadgeData): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(data));
}

function awardBadge(badgeId: string): void {
  const data = getBadgeData();
  data.earned[badgeId] = true;
  saveBadgeData(data);
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getEarnedBadgeDefs(): BadgeDef[] {
  const data = getBadgeData();
  return BADGE_DEFS.filter((b) => b.id in data.earned);
}

export function checkAndAwardBadges(context: {
  moduleSlug: string;
  completedModules: string[];
  tourCompleted: boolean;
  allBestChoices: boolean;
}): BadgeDef[] {
  const data = getBadgeData();
  const xpData = getXPData();
  const newlyEarned: BadgeDef[] = [];

  for (const badge of BADGE_DEFS) {
    // Skip already earned
    if (badge.id in data.earned) continue;

    let earned = false;

    switch (badge.conditionType) {
      case "module_complete":
        earned = context.completedModules.includes(badge.conditionValue);
        break;

      case "quiz_perfect":
        // Checked externally via XP event "perfect_quiz"
        earned = Object.keys(xpData.events).some((k) => k.startsWith("perfect_quiz::"));
        break;

      case "quiz_first_try":
        earned = Object.keys(xpData.events).some((k) => k.startsWith("first_try_pass::"));
        break;

      case "tour_complete":
        earned = context.tourCompleted;
        break;

      case "all_best_choices":
        earned = context.allBestChoices;
        break;

      case "xp_threshold":
        earned = xpData.totalXP >= Number(badge.conditionValue);
        break;
    }

    if (earned) {
      awardBadge(badge.id);
      newlyEarned.push(badge);
    }
  }

  return newlyEarned;
}
