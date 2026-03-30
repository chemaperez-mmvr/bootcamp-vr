/* ------------------------------------------------------------------ */
/*  Wizard simulation types — reusable across all modules              */
/* ------------------------------------------------------------------ */

export type WizardStepFeedbackTone = "correct" | "partial" | "incorrect";

export type WizardChoice = {
  id: string;
  labelKey: string;
  feedbackKey: string;
  feedbackTone: WizardStepFeedbackTone;
  isCorrect: boolean;
  xpBonus: number;
};

export type WizardStepType = "choice" | "info" | "confirm";

export type WizardStepBase = {
  id: string;
  contextKey: string;
  tipKey?: string;
};

export type WizardChoiceStep = WizardStepBase & {
  stepType: "choice";
  choices: WizardChoice[];
};

export type WizardInfoStep = WizardStepBase & {
  stepType: "info";
  bodyKey: string;
};

export type WizardConfirmStep = WizardStepBase & {
  stepType: "confirm";
  confirmLabelKey: string;
};

export type WizardStep = WizardChoiceStep | WizardInfoStep | WizardConfirmStep;

export type WizardMissionDef = {
  missionId: string;
  sectionId: string;
  titleKey: string;
  descriptionKey: string;
  iconEmoji: string;
  xpReward: number;
  isBossLevel: boolean;
  steps: WizardStep[];
};
