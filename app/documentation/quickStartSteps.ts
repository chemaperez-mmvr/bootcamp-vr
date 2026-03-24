/**
 * Quick Start flow: 5 essential steps that link across modules.
 * Used by the documentation index page and by the in-page QuickStartNav.
 */
export type QuickStartStep = {
  /** 1-based step number */
  step: number;
  titleKey: string;
  descKey: string;
  /** Module slug */
  moduleSlug: string;
  /** Section anchor id */
  sectionId: string;
};

export const quickStartSteps: QuickStartStep[] = [
  {
    step: 1,
    titleKey: "quickStart.step1Title",
    descKey: "quickStart.step1Desc",
    moduleSlug: "basic-foundations",
    sectionId: "what-is-vr",
  },
  {
    step: 2,
    titleKey: "quickStart.step2Title",
    descKey: "quickStart.step2Desc",
    moduleSlug: "getting-vr-ready",
    sectionId: "pre-class-checklist",
  },
  {
    step: 3,
    titleKey: "quickStart.step3Title",
    descKey: "quickStart.step3Desc",
    moduleSlug: "designing-meaningful-learning",
    sectionId: "objectives-that-work",
  },
  {
    step: 4,
    titleKey: "quickStart.step4Title",
    descKey: "quickStart.step4Desc",
    moduleSlug: "classroom-implementation",
    sectionId: "student-briefing",
  },
  {
    step: 5,
    titleKey: "quickStart.step5Title",
    descKey: "quickStart.step5Desc",
    moduleSlug: "safety-wellbeing-accessibility",
    sectionId: "physical-safety-wellbeing",
  },
];

export const QUICK_START_TOTAL = quickStartSteps.length;

export function getQuickStartHref(step: QuickStartStep, withFlow = false): string {
  const path = `/documentation/module/${step.moduleSlug}`;
  if (withFlow) {
    return `${path}?qs=${step.step}#${step.sectionId}`;
  }
  return `${path}#${step.sectionId}`;
}
