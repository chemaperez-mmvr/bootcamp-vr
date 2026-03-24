"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  quickStartSteps,
  getQuickStartHref,
  QUICK_START_TOTAL,
} from "@/app/documentation/quickStartSteps";

/**
 * Inline quick-start flow navigation rendered inside the active section.
 * Only visible when the page is accessed with a ?qs=N query param.
 * `sectionId` determines which section this instance belongs to — it only
 * renders if this section matches the current quick-start step.
 */
export function QuickStartNav({ sectionId }: { sectionId: string }) {
  const t = useTranslations("docs");
  const searchParams = useSearchParams();
  const qsParam = searchParams.get("qs");

  if (!qsParam) return null;

  const currentStep = parseInt(qsParam, 10);
  if (isNaN(currentStep) || currentStep < 1 || currentStep > QUICK_START_TOTAL)
    return null;

  const stepData = quickStartSteps[currentStep - 1];
  if (stepData.sectionId !== sectionId) return null;

  const prev = currentStep > 1 ? quickStartSteps[currentStep - 2] : null;
  const next =
    currentStep < QUICK_START_TOTAL ? quickStartSteps[currentStep] : null;
  const progressPct = (currentStep / QUICK_START_TOTAL) * 100;

  return (
    <div className="not-prose mt-8 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50/80 to-white overflow-hidden qs-nav-enter">
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100">
        <div
          className="h-full bg-teal-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="px-5 py-4 sm:px-6">
        {/* Top row: label + step indicator */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-100 rounded-full px-3 py-1">
            {t("quickStart.flowLabel")}
          </span>

          <div className="flex items-center gap-1.5">
            {quickStartSteps.map((step) => (
              <Link
                key={step.step}
                href={getQuickStartHref(step, true)}
                className={`w-2 h-2 rounded-full transition-all ${
                  step.step === currentStep
                    ? "bg-teal-500 scale-125"
                    : step.step < currentStep
                      ? "bg-teal-400"
                      : "bg-gray-300"
                }`}
                aria-label={t("quickStart.stepOf", {
                  current: step.step,
                  total: QUICK_START_TOTAL,
                })}
              />
            ))}
          </div>

          <span className="text-xs text-gray-500">
            {t("quickStart.stepOf", {
              current: currentStep,
              total: QUICK_START_TOTAL,
            })}
          </span>
        </div>

        {/* Next step preview + navigation */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            {next && (
              <p className="text-sm text-gray-600">
                <span className="text-gray-400">{t("quickStart.next").replace(" →", ":")} </span>
                <span className="font-medium text-gray-800">{t(next.titleKey)}</span>
              </p>
            )}
            {!next && (
              <p className="text-sm text-gray-600 font-medium">
                {t("quickStart.finish")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {prev && (
              <Link
                href={getQuickStartHref(prev, true)}
                className="text-sm font-medium !text-gray-600 !no-underline hover:!text-teal-700 px-3 py-2 rounded-lg hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {t("quickStart.prev")}
              </Link>
            )}

            {next ? (
              <Link
                href={getQuickStartHref(next, true)}
                className="text-sm font-medium !text-white !no-underline bg-teal-500 hover:bg-teal-600 px-5 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                {t("quickStart.next")}
              </Link>
            ) : (
              <Link
                href="/documentation"
                className="text-sm font-medium !text-white !no-underline bg-teal-500 hover:bg-teal-600 px-5 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                {t("quickStart.finish")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
