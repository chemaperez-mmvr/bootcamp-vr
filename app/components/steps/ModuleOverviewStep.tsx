"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BootcampModule } from "@/app/bootcamp/catalog";
import { theoreticalSlugs } from "@/app/bootcamp/catalog";
import { getModuleBySlug } from "@/app/documentation/modules";
import { getQuizForModule } from "@/app/bootcamp/quizzes";
import { getLearningBlocksForModule } from "@/app/bootcamp/learning-blocks";
import { isOverviewVisited } from "@/app/bootcamp/steps";
import type { ModuleStepDef } from "@/app/bootcamp/steps";
import {
  IconLayers,
  IconPlay,
  IconBook,
  IconDocument,
  IconCheck,
  IconHeadset,
  IconClock,
} from "@/app/components/icons";

/* ------------------------------------------------------------------ */
/*  Icon mappings                                                      */
/* ------------------------------------------------------------------ */

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  overview: IconLayers,
  "intro-video": IconPlay,
  tour: IconHeadset,
  content: IconBook,
  quiz: IconDocument,
  results: IconCheck,
};

/** Maps exercise/microCheck type → { titleKey, descKey, emoji }. */
const EXERCISE_META: Record<string, { titleKey: string; descKey: string; emoji: string }> = {
  matching:           { titleKey: "learningBlocks.matchingTitle",           descKey: "learningBlocks.matchingDesc",           emoji: "🔗" },
  ordering:           { titleKey: "learningBlocks.orderingTitle",           descKey: "learningBlocks.orderingDesc",           emoji: "📋" },
  mythBusters:        { titleKey: "learningBlocks.mythBustersTitle",        descKey: "learningBlocks.mythBustersDesc",        emoji: "🎭" },
  conceptMap:         { titleKey: "learningBlocks.conceptMapTitle",         descKey: "learningBlocks.conceptMapDesc",         emoji: "🧩" },
  troubleshooting:    { titleKey: "learningBlocks.troubleshootingTitle",    descKey: "learningBlocks.troubleshootingDesc",    emoji: "🔧" },
  triageSort:         { titleKey: "learningBlocks.triageSortTitle",         descKey: "learningBlocks.triageSortDesc",         emoji: "🏷️" },
  classroomPlanner:   { titleKey: "learningBlocks.classroomPlannerTitle",   descKey: "learningBlocks.classroomPlannerDesc",   emoji: "🗺️" },
  fillGaps:           { titleKey: "learningBlocks.fillGapsTitle",           descKey: "learningBlocks.fillGapsDesc",           emoji: "✏️" },
  decisionTree:       { titleKey: "learningBlocks.decisionTreeTitle",       descKey: "learningBlocks.decisionTreeDesc",       emoji: "🔀" },
  lessonPlanBuilder:  { titleKey: "learningBlocks.lessonPlanBuilderTitle",  descKey: "learningBlocks.lessonPlanBuilderDesc",  emoji: "📝" },
  resourceAllocation: { titleKey: "learningBlocks.resourceAllocationTitle", descKey: "learningBlocks.resourceAllocationDesc", emoji: "⏱️" },
  trueFalse:          { titleKey: "learningBlocks.trueFalseTitle",          descKey: "learningBlocks.trueFalseDesc",          emoji: "✅" },
  classify:           { titleKey: "learningBlocks.classifyTitle",           descKey: "learningBlocks.classifyDesc",           emoji: "📂" },
  memoryMatch:        { titleKey: "learningBlocks.memoryMatchTitle",        descKey: "learningBlocks.memoryMatchDesc",        emoji: "🃏" },
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
  const allSections = docModule?.sections ?? [];
  const essentialSections = allSections.filter((s) => s.priority === "essential");
  const referenceSections = allSections.filter((s) => s.priority !== "essential");
  const totalMinutes = module.lessons.reduce((sum, l) => sum + l.durationMin, 0);
  const isTheoretical = theoreticalSlugs.has(module.slug);
  const quiz = getQuizForModule(module.slug);
  const moduleNumber = docModule?.order ?? 0;
  const hasIntroVideo = steps.some((s) => s.type === "intro-video");

  // Collect unique exercise types from learning blocks for the activity preview
  const blockSet = getLearningBlocksForModule(module.slug);
  const exerciseTypes: string[] = [];
  if (blockSet) {
    const seen = new Set<string>();
    for (const block of blockSet.blocks) {
      if (block.exercise && !seen.has(block.exercise.type)) {
        seen.add(block.exercise.type);
        exerciseTypes.push(block.exercise.type);
      }
      for (const mc of block.microChecks) {
        if (!seen.has(mc.type)) {
          seen.add(mc.type);
          exerciseTypes.push(mc.type);
        }
      }
    }
  }

  // Returning-user state (deferred to useEffect to avoid hydration mismatch)
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    setHasStarted(isOverviewVisited(module.slug));
  }, [module.slug]);

  return (
    <div className="space-y-6">
      {/* Back to bootcamp */}
      <div className="doc-part-enter doc-part-delay-0">
        <Link
          href="/bootcamp"
          className="inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <span aria-hidden>&larr;</span> {t("actions.backToBootcamp")}
        </Link>
      </div>

      {/* ============================================================ */}
      {/*  Hero Section                                                 */}
      {/* ============================================================ */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm min-h-[280px] sm:min-h-[340px] doc-part-enter doc-part-delay-1">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30" />

        {/* Content */}
        <div className="relative px-6 py-10 sm:px-10 sm:py-14 flex flex-col justify-end min-h-[280px] sm:min-h-[340px]">
          {/* Module number badge */}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300 sm:text-sm mb-2">
            {t("overview.moduleNumber", { number: moduleNumber })}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-2xl">
            {tDocs(module.titleKey)}
          </h2>

          <p className="mt-3 text-gray-300 leading-relaxed max-w-xl text-sm sm:text-base">
            {tDocs(module.descriptionKey)}
          </p>

          {/* Tagline */}
          <p className="mt-3 text-sm text-teal-200/90 italic border-l-2 border-teal-400/40 pl-3 max-w-lg">
            {t(`taglines.${module.slug}`)}
          </p>

          {/* Info chips + CTA */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex flex-wrap items-center gap-2">
              {/* Lessons + duration chip */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-gray-300">
                <IconClock className="w-3.5 h-3.5" />
                {t("overview.lessons", { count: module.lessons.length })} &middot; ~{totalMinutes} min
              </span>

              {/* Quiz chip */}
              {quiz && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-gray-300">
                  <IconDocument className="w-3.5 h-3.5" />
                  {t("overview.quizIncluded")}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-md w-full sm:w-auto justify-center sm:justify-start sm:ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              {hasStarted ? t("overview.continueButton") : t("overview.startButton")}
              <span aria-hidden>&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  What you'll do — Activity Preview                            */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm doc-part-enter doc-part-delay-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-5">
          {t("overview.whatYoullDo")}
        </h3>

        {/* Summary row: video + lessons + quiz */}
        <div className="flex flex-wrap gap-3 mb-5">
          {hasIntroVideo && (
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <IconPlay className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-gray-700">{t("overview.activityVideo")}</span>
            </div>
          )}
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
            <IconBook className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-gray-700">
              {t("overview.lessons", { count: module.lessons.length })}
            </span>
          </div>
          {quiz && (
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <IconDocument className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-gray-700">{t("overview.quizIncluded")}</span>
            </div>
          )}
        </div>

        {/* Exercise types from learning blocks */}
        {exerciseTypes.length > 0 && (
          <>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              {t("overview.activityTypes")}
            </p>
            <div className="space-y-2">
              {exerciseTypes.map((type, i) => {
                const meta = EXERCISE_META[type];
                if (!meta) return null;
                return (
                  <div
                    key={type}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5"
                  >
                    <span className="text-lg leading-none shrink-0 w-7 text-center" aria-hidden>
                      {meta.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 leading-tight">
                        {t(meta.titleKey)}
                      </p>
                      <p className="text-xs text-gray-500 leading-snug mt-0.5">
                        {t(meta.descKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Quiz callout */}
        {quiz && (
          <div className="mt-5 rounded-lg bg-teal-50 border border-teal-100 p-3 flex items-start gap-2.5">
            <IconDocument className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <p className="text-sm text-teal-800">
              {t("overview.quizCallout", { percent: Math.round(quiz.passingScore * 100) })}
            </p>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/*  Learning Path — Timeline                                     */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm doc-part-enter doc-part-delay-3">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {t("overview.roadmap")}
        </h3>

        {/* Desktop: horizontal timeline */}
        <div className="hidden sm:flex items-start">
          {steps.map((step, i) => {
            const StepIcon = STEP_ICONS[step.type] ?? IconLayers;
            const isLast = i === steps.length - 1;
            const isCurrent = i === 0;
            const label = isTheoretical && step.type === "content"
              ? t("steps.learn")
              : t(step.labelKey);

            return (
              <div key={step.type} className={`flex items-start ${isLast ? "" : "flex-1"}`}>
                <div className="flex flex-col items-center w-24">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCurrent
                        ? "bg-teal-600 border-teal-600 text-white timeline-node-active"
                        : "bg-teal-50 border-teal-200 text-teal-600"
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-gray-700 text-center">
                    {label}
                  </p>
                  <p className="text-[10px] text-gray-400 text-center mt-0.5 leading-tight">
                    {t(`overview.stepDesc.${step.type}`)}
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
            const isCurrent = i === 0;
            const label = isTheoretical && step.type === "content"
              ? t("steps.learn")
              : t(step.labelKey);

            return (
              <div key={step.type} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full border-2 shrink-0 ${
                      isCurrent
                        ? "bg-teal-600 border-teal-600 text-white timeline-node-active"
                        : "bg-teal-50 border-teal-200 text-teal-600"
                    }`}
                  >
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
      {allSections.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm doc-part-enter doc-part-delay-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("overview.topicsCovered")}
          </h3>

          {/* Essential legend */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-500" />
            {t("overview.essentialLegend")}
          </div>

          {/* Essential topics */}
          {essentialSections.length > 0 && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {essentialSections.map((section) => (
                <li
                  key={section.id}
                  className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700 font-medium"
                >
                  <span className="mt-1.5 inline-block w-2 h-2 rounded-full shrink-0 bg-teal-500" />
                  {tDocs(section.titleKey)}
                </li>
              ))}
            </ul>
          )}

          {/* Reference topics */}
          {referenceSections.length > 0 && (
            <>
              <div className="border-t border-gray-100 mt-4 pt-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                  {t("overview.referenceSections")}
                </p>
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {referenceSections.map((section) => (
                    <li
                      key={section.id}
                      className="flex items-start gap-2.5 text-sm text-gray-500"
                    >
                      <span className="mt-1.5 inline-block w-2 h-2 rounded-full shrink-0 bg-gray-300" />
                      {tDocs(section.titleKey)}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/*  Bottom CTA                                                   */}
      {/* ============================================================ */}
      <div className="flex justify-center doc-part-enter doc-part-delay-5">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          {hasStarted ? t("overview.continueButton") : t("overview.startButton")}
          <span aria-hidden>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
