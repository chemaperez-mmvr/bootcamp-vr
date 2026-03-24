"use client";

import { useSearchParams } from "next/navigation";
import { quickStartSteps } from "@/app/documentation/quickStartSteps";

/**
 * Wraps a section and adds a slide-in animation if it's the active quick-start step.
 */
export function QuickStartSectionWrapper({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const qsParam = searchParams.get("qs");

  if (!qsParam) return <>{children}</>;

  const stepNum = parseInt(qsParam, 10);
  const stepData = quickStartSteps[stepNum - 1];
  const isActive = stepData?.sectionId === sectionId;

  if (!isActive) return <>{children}</>;

  return <div className="qs-section-enter">{children}</div>;
}
