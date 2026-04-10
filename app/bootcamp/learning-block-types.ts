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
    /** Optional image shown alongside the item text. Path relative to /public. */
    imageUrl?: string;
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

/* ------------------------------------------------------------------ */
/*  New minigame exercise types                                        */
/* ------------------------------------------------------------------ */

/** Myth Busters — label statements as Myth or Fact. */
export type MythBustersExercise = {
  type: "mythBusters";
  id: string;
  instructionKey: string;
  statements: {
    id: string;
    statementKey: string;
    isTrue: boolean;
    explanationKey: string;
  }[];
};

/** Memory Match — flip cards to find matching pairs. */
export type MemoryMatchExercise = {
  type: "memoryMatch";
  id: string;
  instructionKey: string;
  pairs: {
    id: string;
    termKey: string;
    definitionKey: string;
  }[];
};

/** Concept Map — drag nodes and connect them with valid relationships. */
export type ConceptMapExercise = {
  type: "conceptMap";
  id: string;
  instructionKey: string;
  nodes: {
    id: string;
    labelKey: string;
    /** Initial position hint (0-1 range, relative to container). */
    x: number;
    y: number;
  }[];
  validConnections: {
    fromId: string;
    toId: string;
    labelKey?: string;
  }[];
};

/** Troubleshooting — step through a diagnostic decision tree. */
export type TroubleshootingExercise = {
  type: "troubleshooting";
  id: string;
  instructionKey: string;
  scenarioKey: string;
  /** Optional image shown in the scenario header. */
  scenarioImageUrl?: string;
  startNodeId: string;
  nodes: {
    id: string;
    promptKey: string;
    options: {
      id: string;
      labelKey: string;
      nextNodeId: string | null; // null = solution reached
      feedbackKey: string;
      isCorrect: boolean;
    }[];
  }[];
};

/** Classroom Planner — arrange items on a classroom grid. */
export type ClassroomPlannerExercise = {
  type: "classroomPlanner";
  id: string;
  instructionKey: string;
  gridCols: number;
  gridRows: number;
  items: {
    id: string;
    labelKey: string;
    emoji: string;
    width: number;
    height: number;
  }[];
  zones: {
    id: string;
    labelKey: string;
    requiredItemIds: string[];
    col: number;
    row: number;
    width: number;
    height: number;
  }[];
};

/** Triage Sort — categorize items by priority. */
export type TriageSortExercise = {
  type: "triageSort";
  id: string;
  instructionKey: string;
  categories: {
    id: string;
    labelKey: string;
    color: string;
  }[];
  items: {
    id: string;
    labelKey: string;
    correctCategoryId: string;
  }[];
};

/** Fill the Gaps — drag words into sentence blanks. */
export type FillGapsExercise = {
  type: "fillGaps";
  id: string;
  instructionKey: string;
  /** Segments alternate between text and blanks. Blanks use __blankId__ (double underscores). */
  templateKey: string;
  blanks: {
    id: string;
    correctWordKey: string;
  }[];
  /** Extra wrong options to add as distractors. */
  distractorKeys: string[];
};

/** Decision Tree — branching narrative with pedagogical choices. */
export type DecisionTreeExercise = {
  type: "decisionTree";
  id: string;
  instructionKey: string;
  scenarioKey: string;
  /** Optional image shown in the scenario header. */
  scenarioImageUrl?: string;
  startNodeId: string;
  nodes: {
    id: string;
    promptKey: string;
    isEnd?: boolean;
    endFeedbackKey?: string;
    endIsGood?: boolean;
    options: {
      id: string;
      labelKey: string;
      nextNodeId: string;
      feedbackKey: string;
      quality: "good" | "okay" | "poor";
    }[];
  }[];
};

/** Lesson Plan Builder — select components step-by-step. */
export type LessonPlanBuilderExercise = {
  type: "lessonPlanBuilder";
  id: string;
  instructionKey: string;
  steps: {
    id: string;
    labelKey: string;
    descriptionKey: string;
    options: {
      id: string;
      labelKey: string;
      descriptionKey: string;
      quality: "best" | "good" | "poor";
      feedbackKey: string;
    }[];
  }[];
  /** Minimum "best"+"good" choices to pass. */
  minGoodChoices: number;
};

/** Resource Allocation — distribute limited resources with constraints. */
export type ResourceAllocationExercise = {
  type: "resourceAllocation";
  id: string;
  instructionKey: string;
  scenarioKey: string;
  resources: {
    id: string;
    labelKey: string;
    min: number;
    max: number;
    unit: string;
    idealMin: number;
    idealMax: number;
  }[];
  totalBudget: number;
  totalBudgetUnit: string;
};

export type BlockExercise =
  | MatchingExercise
  | OrderingExercise
  | MythBustersExercise
  | MemoryMatchExercise
  | ConceptMapExercise
  | TroubleshootingExercise
  | ClassroomPlannerExercise
  | TriageSortExercise
  | FillGapsExercise
  | DecisionTreeExercise
  | LessonPlanBuilderExercise
  | ResourceAllocationExercise;

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
