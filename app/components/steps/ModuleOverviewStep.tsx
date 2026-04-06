"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { BootcampModule } from "@/app/bootcamp/catalog";
import { theoreticalSlugs } from "@/app/bootcamp/catalog";
import { getModuleBySlug } from "@/app/documentation/modules";
import type { ModuleStepDef } from "@/app/bootcamp/steps";
import {
  IconLayers,
  IconPlay,
  IconBook,
  IconDocument,
  IconCheck,
  IconHeadset,
} from "@/app/components/icons";

/* ------------------------------------------------------------------ */
/*  Step icon mapping (SVG icons, no emojis)                           */
/* ------------------------------------------------------------------ */

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  overview: IconLayers,
  "intro-video": IconPlay,
  tour: IconHeadset,
  content: IconBook,
  quiz: IconDocument,
  results: IconCheck,
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function ModuleOverviewStep({
  module,
  steps,
  onContinue,
}: {
  module: BootcampModule;
  steps: ModuleStepDef[];
  onContinue: () => void;
}) {
  const t = useTranslations("bootcamp");
  const tDocs = useTranslations("docs");

  const docModule = getModuleBySlug(module.documentationModuleSlug);
  const sections = docModule?.sections ?? [];
  const totalMinutes = module.lessons.reduce((sum, l) => sum + l.durationMin, 0);
  const isTheoretical = theoreticalSlugs.has(module.slug);


  return (
    <div className="space-y-6 animate-content-enter">
      {/* ============================================================ */}
      {/*  Hero Section                                                 */}
      {/* ============================================================ */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm min-h-[280px] sm:min-h-[320px]">
        {/* Background: image or gradient fallback */}
        {module.heroImage ? (
          <Image
            src={module.heroImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950" />
        )}

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />

        {/* Content */}
        <div className="relative px-6 py-10 sm:px-10 sm:py-14 flex flex-col justify-end">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-2xl">
            {tDocs(module.titleKey)}
          </h2>
          <p className="mt-3 text-gray-300 leading-relaxed max-w-xl text-sm sm:text-base">
            {tDocs(module.descriptionKey)}
          </p>

          {/* Info + CTA */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p className="text-sm text-gray-300">
              {sections.length} {t("overview.sections")} · ~{totalMinutes} min
            </p>

            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-500 transition-colors shadow-md w-full sm:w-auto justify-center sm:justify-start sm:ml-auto focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {t("overview.startButton")}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Learning Path — Horizontal Timeline                          */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {t("overview.roadmap")}
        </h3>

        {/* Desktop: horizontal timeline */}
        <div className="hidden sm:flex items-start">
          {steps.map((step, i) => {
            const StepIcon = STEP_ICONS[step.type] ?? IconLayers;
            const isLast = i === steps.length - 1;
            const label = isTheoretical && step.type === "content"
              ? t("steps.learn")
              : t(step.labelKey);

            return (
              <div key={step.type} className={`flex items-start ${isLast ? "" : "flex-1"}`}>
                <div className="flex flex-col items-center w-20">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 border-2 border-teal-200 text-teal-600">
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-gray-700 text-center">
                    {label}
                  </p>
                </div>
                {!isLast && (
                  <div className="flex-1 h-0.5 bg-gray-200 mt-5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="sm:hidden space-y-0">
          {steps.map((step, i) => {
            const StepIcon = STEP_ICONS[step.type] ?? IconLayers;
            const isLast = i === steps.length - 1;
            const label = isTheoretical && step.type === "content"
              ? t("steps.learn")
              : t(step.labelKey);

            return (
              <div key={step.type} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-50 border-2 border-teal-200 text-teal-600 shrink-0">
                    <StepIcon className="w-4 h-4" />
                  </div>
                  {!isLast && (
                    <div className="w-0.5 h-6 bg-gray-200" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-700 mt-2">
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Topics Covered                                               */}
      {/* ============================================================ */}
      {sections.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("overview.topicsCovered")}
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {sections.map((section) => (
              <li
                key={section.id}
                className="flex items-start gap-2.5 text-sm text-gray-700"
              >
                <span
                  className="mt-1.5 inline-block w-2 h-2 rounded-full shrink-0 bg-teal-500"
                />
                {tDocs(section.titleKey)}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
