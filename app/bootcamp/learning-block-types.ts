/* ------------------------------------------------------------------ */
/*  Learning Block types — "Decide, Learn, Verify" for theory modules  */
/* ------------------------------------------------------------------ */

import type { WizardStepFeedbackTone } from "./wizard-types";

export type LearningBlockChoice = {
  id: string;
  labelKey: string;
  feedbackKey: string;
  feedbackTone: WizardStepFeedbackTone;
  isCorrect: boolean;
};

export type LearningBlockScenario = {
  id: string;
  /** Translation key for the classroom situation description. */
  contextKey: string;
  /** Translation key for the decision prompt. */
  questionKey: string;
  choices: LearningBlockChoice[];
};

/* ------------------------------------------------------------------ */
/*  Micro-check types                                                   */
/* ------------------------------------------------------------------ */

/** Classic multiple-choice (legacy, kept as fallback). */
export type MicroCheckClassic = {
  type: "classic";
  id: string;
  questionKey: string;
  options: { id: string; labelKey: string }[];
  correctOptionId: string;
  explanationKey?: string;
};

/** True/False rapid-fire — quick statements to confirm or deny. */
export type MicroCheckTrueFalse = {
  type: "trueFalse";
  id: string;
  statements: {
    id: string;
    statementKey: string;
    isTrue: boolean;
    explanationKey: string;
  }[];
};

/** Classify items into categories (e.g., VR vs AR). */
export type MicroCheckClassify = {
  type: "classify";
  id: string;
  instructionKey: string;
  categories: { id: string; labelKey: string }[];
  items: {
    id: string;
    labelKey: string;
    correctCategoryId: string;
  }[];
};

/** Union of all micro-check types. */
export type MicroCheckQuestion = MicroCheckClassic | MicroCheckTrueFalse | MicroCheckClassify;

/* ------------------------------------------------------------------ */
/*  Interactive exercises (replace scenario A/B/C)                      */
/* ------------------------------------------------------------------ */

/** Matching — connect pairs across two columns via drag or tap. */
export type MatchingExercise = {
  type: "matching";
  id: string;
  instructionKey: string;
  pairs: {
    id: string;
    leftKey: string;
    rightKey: string;
  }[];
};

/** Ordering — drag items into the correct sequence. */
export type OrderingExercise = {
  type: "ordering";
  id: string;
  instructionKey: string;
  scaleStartKey: string;
  scaleEndKey: string;
  items: {
    id: string;
    labelKey: string;
    correctPosition: number;
  }[];
};

export type BlockExercise = MatchingExercise | OrderingExercise;

/* ------------------------------------------------------------------ */
/*  Block definitions                                                   */
/* ------------------------------------------------------------------ */

export type LearningBlockDef = {
  blockId: string;
  titleKey: string;
  iconEmoji: string;
  /** Interactive exercise — replaces scenario A/B/C when present. */
  exercise?: BlockExercise;
  /** Main opening scenario for the block (legacy, used when no exercise). */
  scenario: LearningBlockScenario;
  /** Mini-scenarios that teach each concept via decisions + feedback (legacy). */
  conceptScenarios: LearningBlockScenario[];
  /** References a ContentSlide.id from slides.ts (used for the summary highlight). */
  insightSlideId: string;
  microChecks: MicroCheckQuestion[];
};

export type LearningBlockSetDef = {
  moduleSlug: string;
  /** If present, show video slide before block 1. References a VideoSlide.id. */
  videoSlideId?: string;
  blocks: LearningBlockDef[];
};
