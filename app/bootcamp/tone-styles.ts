import type { WizardStepFeedbackTone } from "@/app/bootcamp/wizard-types";
import type { ScenarioOption } from "@/app/bootcamp/missions";

/* ================================================================== */
/*  Wizard feedback tones (correct / partial / incorrect)              */
/* ================================================================== */

export const WIZARD_TONE: Record<
  WizardStepFeedbackTone,
  { border: string; bg: string; text: string; icon: string }
> = {
  correct:   { border: "border-green-300", bg: "bg-green-50", text: "text-green-800", icon: "\u2705" },
  partial:   { border: "border-amber-300", bg: "bg-amber-50", text: "text-amber-800", icon: "\u26A0\uFE0F" },
  incorrect: { border: "border-red-300",   bg: "bg-red-50",   text: "text-red-800",   icon: "\u274C" },
};

/* ================================================================== */
/*  Scenario feedback tones (best / acceptable / caution / danger)     */
/* ================================================================== */

export const SCENARIO_TONE_BORDER: Record<ScenarioOption["feedbackTone"], string> = {
  best: "border-green-300 bg-green-50/50",
  acceptable: "border-blue-300 bg-blue-50/50",
  caution: "border-amber-300 bg-amber-50/50",
  danger: "border-red-300 bg-red-50/50",
};

export const SCENARIO_TONE_BADGE: Record<ScenarioOption["feedbackTone"], string> = {
  best: "bg-green-200 text-green-800 border border-green-300",
  acceptable: "bg-blue-200 text-blue-800 border border-blue-300",
  caution: "bg-amber-200 text-amber-800 border border-amber-300",
  danger: "bg-red-200 text-red-800 border border-red-300",
};

export const SCENARIO_TONE_TEXT: Record<ScenarioOption["feedbackTone"], string> = {
  best: "text-green-900",
  acceptable: "text-blue-900",
  caution: "text-amber-900",
  danger: "text-red-900",
};

export const SCENARIO_TONE_FEEDBACK_BG: Record<ScenarioOption["feedbackTone"], string> = {
  best: "bg-green-100/70 text-green-800 border border-green-200",
  acceptable: "bg-blue-100/70 text-blue-800 border border-blue-200",
  caution: "bg-amber-100/70 text-amber-800 border border-amber-200",
  danger: "bg-red-100/70 text-red-800 border border-red-200",
};

export const SCENARIO_TONE_ICON: Record<ScenarioOption["feedbackTone"], string> = {
  best: "\u2705",
  acceptable: "\u2139\uFE0F",
  caution: "\u26A0\uFE0F",
  danger: "\u274C",
};

/* ================================================================== */
/*  Encouragement system                                               */
/* ================================================================== */

export const ENCOURAGE_PROBABILITY = 0.4;

export const ENCOURAGE_KEYS = [
  "wizardMissions.encourage.nice",
  "wizardMissions.encourage.keepGoing",
  "wizardMissions.encourage.awesome",
  "wizardMissions.encourage.almostThere",
  "wizardMissions.encourage.greatJob",
];
