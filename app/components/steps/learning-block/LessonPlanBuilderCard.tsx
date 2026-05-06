"use client";

import { useState, useCallback } from "react";
import type { LessonPlanBuilderExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";
import { LearningBlockShell } from "./LearningBlockShell";

type StepChoice = {
  stepId: string;
  optionId: string;
  quality: "best" | "good" | "poor";
  labelKey: string;
  feedbackKey: string;
};

export function LessonPlanBuilderCard({
  exercise,
  onPass,
  t,
}: {
  exercise: LessonPlanBuilderExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [choices, setChoices] = useState<StepChoice[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const currentStep = exercise.steps[currentStepIdx];
  const selectedOption = currentStep?.options.find(
    (o) => o.id === selectedOptionId
  );

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (showFeedback) return;
      setSelectedOptionId(optionId);
      setShowFeedback(true);

      const option = currentStep.options.find((o) => o.id === optionId);
      if (option) {
        setChoices((prev) => [
          ...prev,
          {
            stepId: currentStep.id,
            optionId: option.id,
            quality: option.quality,
            labelKey: option.labelKey,
            feedbackKey: option.feedbackKey,
          },
        ]);
      }
    },
    [showFeedback, currentStep]
  );

  const handleContinue = useCallback(() => {
    const nextIdx = currentStepIdx + 1;
    if (nextIdx >= exercise.steps.length) {
      setShowEvaluation(true);
    } else {
      setCurrentStepIdx(nextIdx);
      setSelectedOptionId(null);
      setShowFeedback(false);
    }
  }, [currentStepIdx, exercise.steps.length]);

  const handleRebuild = useCallback(() => {
    setCurrentStepIdx(0);
    setChoices([]);
    setSelectedOptionId(null);
    setShowFeedback(false);
    setShowEvaluation(false);
  }, []);

  const goodCount = choices.filter(
    (c) => c.quality === "best" || c.quality === "good"
  ).length;
  const passed = goodCount >= exercise.minGoodChoices;

  const handleFinish = useCallback(() => {
    if (passed) onPass();
  }, [passed, onPass]);

  const feedbackBorder = (quality: "best" | "good" | "poor") => {
    if (quality === "best") return "border-green-200 bg-green-50";
    if (quality === "good") return "border-amber-200 bg-amber-50";
    return "border-red-200 bg-red-50";
  };

  const feedbackText = (quality: "best" | "good" | "poor") => {
    if (quality === "best") return "text-green-800";
    if (quality === "good") return "text-amber-800";
    return "text-red-800";
  };

  const feedbackIcon = (quality: "best" | "good" | "poor") => {
    if (quality === "best")
      return <IconCheck className="w-4 h-4 text-green-600 shrink-0" />;
    if (quality === "good")
      return <IconCheck className="w-4 h-4 text-amber-600 shrink-0" />;
    return <IconClose className="w-4 h-4 text-red-600 shrink-0" />;
  };

  // ── Evaluation screen ──
  if (showEvaluation) {
    return (
      <LearningBlockShell
        tone="indigo"
        badgeLabel={t("learningBlocks.lessonPlanBuilderTitle")}
        title={t("learningBlocks.lessonPlanBuilderReview")}
      >
        {/* Review each step choice */}
        <div className="space-y-3 mb-5">
          {exercise.steps.map((step, i) => {
            const choice = choices[i];
            if (!choice) return null;
            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 p-3 rounded-xl border ${feedbackBorder(choice.quality)}`}
              >
                {feedbackIcon(choice.quality)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">
                    {t(step.labelKey)}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {t(choice.labelKey)}
                  </p>
                  <p
                    className={`text-xs mt-1 ${feedbackText(choice.quality)}`}
                  >
                    {t(choice.feedbackKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div
          className={`rounded-xl border p-4 mb-5 ${
            passed
              ? "border-green-200 bg-green-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              passed ? "text-green-800" : "text-amber-800"
            }`}
          >
            {passed
              ? t("learningBlocks.lessonPlanBuilderPass", {
                  good: goodCount,
                  total: exercise.steps.length,
                })
              : t("learningBlocks.lessonPlanBuilderFail", {
                  good: goodCount,
                  needed: exercise.minGoodChoices,
                })}
          </p>
        </div>

        <div className="flex justify-end">
          {passed ? (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {t("learningBlocks.continueToNext")}
              <span aria-hidden>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRebuild}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {t("learningBlocks.lessonPlanBuilderRebuild")}
              <span aria-hidden>↩</span>
            </button>
          )}
        </div>
      </LearningBlockShell>
    );
  }

  if (!currentStep) return null;

  // ── Step builder view ──
  return (
    <LearningBlockShell
      tone="indigo"
      badgeLabel={`${t("learningBlocks.lessonPlanBuilderTitle")} (${currentStepIdx + 1}/${exercise.steps.length})`}
      title={t(exercise.instructionKey)}
    >
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left: stepper + current step */}
        <div className="flex-1 min-w-0">
          {/* Vertical stepper */}
          <div className="flex gap-4 mb-5">
            <div className="flex flex-col items-center gap-0">
              {exercise.steps.map((step, i) => {
                const isDone = i < currentStepIdx;
                const isCurrent = i === currentStepIdx;
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    {/* Dot */}
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full border-2 text-xs font-bold shrink-0 transition-colors ${
                        isDone
                          ? "bg-green-500 border-green-500 text-white"
                          : isCurrent
                            ? "bg-teal-500 border-teal-500 text-white"
                            : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {isDone ? (
                        <IconCheck className="w-3.5 h-3.5" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    {/* Connecting line */}
                    {i < exercise.steps.length - 1 && (
                      <div
                        className={`w-0.5 h-6 ${
                          isDone ? "bg-green-300" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step labels */}
            <div className="flex flex-col gap-0">
              {exercise.steps.map((step, i) => {
                const isDone = i < currentStepIdx;
                const isCurrent = i === currentStepIdx;
                return (
                  <div
                    key={step.id}
                    className="flex items-center"
                    style={{ height: i < exercise.steps.length - 1 ? "calc(1.75rem + 1.5rem)" : "1.75rem" }}
                  >
                    <span
                      className={`text-sm leading-none ${
                        isDone
                          ? "text-green-700 font-medium"
                          : isCurrent
                            ? "text-teal-700 font-semibold"
                            : "text-gray-400"
                      }`}
                    >
                      {t(step.labelKey)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current step question */}
          <div
            key={currentStep.id}
            className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-5 animate-content-enter"
          >
            <p className="text-base font-medium text-gray-900 leading-relaxed">
              {t(currentStep.descriptionKey)}
            </p>
          </div>

          {/* Option cards */}
          {!showFeedback && (
            <div className="grid gap-3 animate-content-enter">
              {currentStep.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(option.id)}
                  className="p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {t(option.labelKey)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t(option.descriptionKey)}
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* Feedback */}
          {showFeedback && selectedOption && (
            <div className="animate-wizard-feedback">
              {/* Selected option highlight */}
              <div
                className={`p-4 rounded-xl border-2 mb-3 ${
                  selectedOption.quality === "best"
                    ? "border-teal-400 bg-teal-50"
                    : selectedOption.quality === "good"
                      ? "border-teal-400 bg-teal-50"
                      : "border-teal-400 bg-teal-50"
                }`}
              >
                <p className="text-sm font-semibold text-gray-800">
                  {t(selectedOption.labelKey)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t(selectedOption.descriptionKey)}
                </p>
              </div>

              {/* Quality feedback */}
              <div
                className={`rounded-xl border p-4 flex items-start gap-3 ${feedbackBorder(selectedOption.quality)}`}
              >
                {feedbackIcon(selectedOption.quality)}
                <p
                  className={`text-sm font-semibold ${feedbackText(selectedOption.quality)}`}
                >
                  {t(selectedOption.feedbackKey)}
                </p>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {currentStepIdx < exercise.steps.length - 1
                    ? t("learningBlocks.continueToNext")
                    : t("learningBlocks.continueToCheck")}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Lesson Plan Preview */}
        {choices.length > 0 && (
          <div className="lg:w-64 xl:w-72 shrink-0">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 sticky top-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                {t("learningBlocks.lessonPlanBuilderPreview")}
              </h4>
              <div className="space-y-2">
                {choices.map((choice, i) => {
                  const step = exercise.steps[i];
                  return (
                    <div
                      key={choice.stepId}
                      className="flex items-start gap-2"
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          choice.quality === "best"
                            ? "bg-green-500"
                            : choice.quality === "good"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      >
                        {choice.quality !== "poor" ? (
                          <IconCheck className="w-2.5 h-2.5 text-white" />
                        ) : (
                          <IconClose className="w-2.5 h-2.5 text-white" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-600">
                          {step ? t(step.labelKey) : ""}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {t(choice.labelKey)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </LearningBlockShell>
  );
}
