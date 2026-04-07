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
];

export const QUICK_START_TOTAL = quickStartSteps.length;

export function getQuickStartHref(step: QuickStartStep, withFlow = false): string {
  const path = `/documentation/module/${step.moduleSlug}`;
  if (withFlow) {
    return `${path}?qs=${step.step}#${step.sectionId}`;
  }
  return `${path}#${step.sectionId}`;
}
