"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BootcampModule } from "@/app/bootcamp/catalog";
import { theoreticalSlugs } from "@/app/bootcamp/catalog";
import {
  getModuleProgress,
  isLessonCompleted,
  setLessonCompleted,
} from "@/app/bootcamp/progress";
import {
  getModuleSteps,
  isStepUnlocked,
  getSavedStepIndex,
  saveStepIndex,
  markOverviewVisited,
  markIntroVideoWatched,
  type ModuleStepDef,
} from "@/app/bootcamp/steps";
import { hasPassedQuiz } from "@/app/bootcamp/quiz-progress";
import { ModuleOverviewStep } from "./steps/ModuleOverviewStep";
import { ModuleTourStep } from "./steps/ModuleTourStep";
import { ModuleContentStep } from "./steps/ModuleContentStep";
import { TheorySliderStep } from "./steps/TheorySliderStep";
import { ModuleQuizStep } from "./steps/ModuleQuizStep";
import { ModuleResultsStep } from "./steps/ModuleResultsStep";
import { LearningBlockStep } from "./steps/LearningBlockStep";
import { getSlidesForModule, type VideoSlide } from "@/app/bootcamp/slides";
import { getLearningBlocksForModule } from "@/app/bootcamp/learning-blocks";
import { VideoSlideContent } from "./slides/VideoSlideContent";

export function BootcampModuleClient({ module }: { module: BootcampModule }) {
  const t = useTranslations("bootcamp");
  const tDocs = useTranslations("docs");

  const steps = useMemo(() => getModuleSteps(module), [module]);

  // Important: keep the first client render identical to SSR to avoid hydration mismatch.
  // We read localStorage only after mount.
  const [currentStep, setCurrentStep] = useState(0);

  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [moduleProgress, setModuleProgress] = useState<{
    completed: number;
    total: number;
    status: "not_started" | "in_progress" | "completed";
    percent: number;
  }>(() => ({
    completed: 0,
    total: module.lessons.length,
    status: "not_started",
    percent: 0,
  }));

  useEffect(() => {
    // Load saved step index after mount (client-side only).
    const saved = getSavedStepIndex(module.slug);
    setCurrentStep(Math.min(saved, steps.length - 1));
  }, [module.slug, steps.length]);

  useEffect(() => {
    const nextMap = Object.fromEntries(
      module.lessons.map((lesson) => [
        lesson.id,
        isLessonCompleted(module.slug, lesson.id),
      ])
    );
    setCompletedMap(nextMap);
    setModuleProgress(getModuleProgress(module.slug));
  }, [module.lessons, module.slug]);

  const goToStep = useCallback(
    (index: number) => {
      if (index < 0 || index >= steps.length) return;
      if (!isStepUnlocked(module, steps, index, completedMap)) return;
      setCurrentStep(index);
      saveStepIndex(module.slug, index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [module, steps, completedMap]
  );

  const advanceToNext = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  function onToggleLesson(lessonId: string): void {
    const nextCompleted = !completedMap[lessonId];
    setLessonCompleted(module.slug, lessonId, nextCompleted);
    const nextMap = { ...completedMap, [lessonId]: nextCompleted };
    setCompletedMap(nextMap);
    setModuleProgress(getModuleProgress(module.slug));
  }

  function completeTourLesson(): void {
    const tourLesson = module.lessons.find((l) => l.type === "tour");
    if (!tourLesson || completedMap[tourLesson.id]) return;
    setLessonCompleted(module.slug, tourLesson.id, true);
    setCompletedMap((prev) => ({ ...prev, [tourLesson.id]: true }));
    setModuleProgress(getModuleProgress(module.slug));
  }

  function handleOverviewContinue(): void {
    markOverviewVisited(module.slug);
    goToStep(currentStep + 1);
  }

  function handleIntroVideoComplete(): void {
    markIntroVideoWatched(module.slug);
    goToStep(currentStep + 1);
  }

  const introVideoSlide = useMemo(
    () =>
      getSlidesForModule(module.slug).find(
        (s) => s.type === "video" && s.videoUrl
      ) as VideoSlide | undefined,
    [module.slug]
  );

  const stepDef = steps[currentStep];

  return (
    <div className="space-y-6">
      {/* Header + Step indicator — hidden on overview step */}
      {stepDef?.type !== "overview" && (
        <>
          <header className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <Link
                  href="/bootcamp"
                  className="inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg"
                >
                  ← {t("actions.backToBootcamp")}
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">
                  {tDocs(module.titleKey)}
                </h1>
              </div>
              <p className="text-sm text-gray-600">
                {t("progress.module", {
                  completed: moduleProgress.completed,
                  total: moduleProgress.total,
                  percent: moduleProgress.percent,
                })}
              </p>
            </div>
          </header>

          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            completedMap={completedMap}
            module={module}
            onStepClick={goToStep}
            t={t}
          />
        </>
      )}

      {/* Step content */}
      {stepDef?.type === "overview" && (
        <ModuleOverviewStep
          module={module}
          steps={steps}
          onContinue={handleOverviewContinue}
        />
      )}
      {stepDef?.type === "intro-video" && introVideoSlide && (
        <IntroVideoStep
          slide={introVideoSlide}
          onComplete={handleIntroVideoComplete}
          t={t}
        />
      )}
      {stepDef?.type === "tour" && (
        <ModuleTourStep
          moduleSlug={module.slug}
          onComplete={completeTourLesson}
          onContinue={advanceToNext}
          isCompleted={Boolean(
            completedMap[
              module.lessons.find((l) => l.type === "tour")?.id ?? ""
            ]
          )}
        />
      )}
      {stepDef?.type === "content" && theoreticalSlugs.has(module.slug) &&
        (getLearningBlocksForModule(module.slug) ? (
          <LearningBlockStep
            moduleSlug={module.slug}
            blockSet={getLearningBlocksForModule(module.slug)!}
            slides={getSlidesForModule(module.slug)}
            onComplete={() => {
              module.lessons.forEach((l) => {
                if (!completedMap[l.id]) onToggleLesson(l.id);
              });
              advanceToNext();
            }}
          />
        ) : (
          <TheorySliderStep
            slides={getSlidesForModule(module.slug)}
            onComplete={() => {
              module.lessons.forEach((l) => {
                if (!completedMap[l.id]) onToggleLesson(l.id);
              });
              advanceToNext();
            }}
          />
        ))}
      {stepDef?.type === "content" && !theoreticalSlugs.has(module.slug) && (
        <ModuleContentStep
          module={module}
          completedMap={completedMap}
          onToggleLesson={onToggleLesson}
          onContinue={advanceToNext}
        />
      )}
      {stepDef?.type === "quiz" && (
        <ModuleQuizStep
          moduleSlug={module.slug}
          onContinue={advanceToNext}
        />
      )}
      {stepDef?.type === "results" && <ModuleResultsStep module={module} />}
    </div>
  );
}

function IntroVideoStep({
  slide,
  onComplete,
  t,
}: {
  slide: import("@/app/bootcamp/slides").VideoSlide;
  onComplete: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="space-y-6 animate-content-enter">
      <VideoSlideContent
        slide={slide}
        t={t}
        onEnded={() => setVideoEnded(true)}
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onComplete}
          disabled={!videoEnded}
          className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
            videoEnded
              ? "text-white bg-teal-600 hover:bg-teal-700"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }`}
        >
          {t("steps.continueAfterVideo")}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

function StepIndicator({
  steps,
  currentStep,
  completedMap,
  module,
  onStepClick,
  t,
}: {
  steps: ModuleStepDef[];
  currentStep: number;
  completedMap: Record<string, boolean>;
  module: BootcampModule;
  onStepClick: (index: number) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <nav aria-label={t("steps.navigation")} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm overflow-x-auto">
      <ol className="flex items-center gap-1 sm:min-w-max">
        {steps.map((step, i) => {
          const unlocked = isStepUnlocked(module, steps, i, completedMap);
          const isCurrent = i === currentStep;
          const isPast = i < currentStep && unlocked;

          let circleClasses =
            "flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-colors";
          let labelClasses = "hidden sm:inline text-xs font-medium whitespace-nowrap transition-colors";

          if (isCurrent) {
            circleClasses += " bg-teal-600 text-white";
            labelClasses += " text-teal-700";
          } else if (isPast) {
            circleClasses += " bg-teal-100 text-teal-700";
            labelClasses += " text-gray-600";
          } else if (unlocked) {
            circleClasses += " bg-gray-100 text-gray-600";
            labelClasses += " text-gray-500";
          } else {
            circleClasses += " bg-gray-100 text-gray-300";
            labelClasses += " text-gray-300";
          }

          return (
            <li key={step.type} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => unlocked && onStepClick(i)}
                disabled={!unlocked}
                aria-label={t(step.labelKey)}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                  unlocked && !isCurrent
                    ? "hover:bg-gray-50 cursor-pointer"
                    : isCurrent
                      ? "bg-teal-50"
                      : "cursor-not-allowed"
                }`}
              >
                <span className={circleClasses}>
                  {isPast ? "✓" : i + 1}
                </span>
                <span className={labelClasses}>{t(step.labelKey)}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`w-4 sm:w-6 h-2 rounded-full shrink-0 ${
                    isPast ? "bg-teal-300" : "bg-gray-200"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
