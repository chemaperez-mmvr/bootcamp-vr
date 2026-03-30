"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type {
  WizardMissionDef,
  WizardStep,
  WizardChoice,
  WizardStepFeedbackTone,
} from "@/app/bootcamp/wizard-types";
import {
  getWizardProgress,
  saveWizardStepResult,
  completeWizardMission,
} from "@/app/bootcamp/wizard-progress";
import { addXP, hasXPEvent } from "@/app/bootcamp/xp";
import { useCelebration } from "@/app/components/Celebrations";

/* ------------------------------------------------------------------ */
/*  Encouraging messages (Duolingo-style)                              */
/* ------------------------------------------------------------------ */

const ENCOURAGE_KEYS = [
  "wizardMissions.encourage.nice",
  "wizardMissions.encourage.keepGoing",
  "wizardMissions.encourage.awesome",
  "wizardMissions.encourage.almostThere",
  "wizardMissions.encourage.greatJob",
];

/* ------------------------------------------------------------------ */
/*  Tone styling map                                                   */
/* ------------------------------------------------------------------ */

const TONE_STYLES: Record<WizardStepFeedbackTone, { border: string; bg: string; text: string; icon: string }> = {
  correct:   { border: "border-green-300", bg: "bg-green-50", text: "text-green-800", icon: "check-circle" },
  partial:   { border: "border-amber-300", bg: "bg-amber-50", text: "text-amber-800", icon: "alert-circle" },
  incorrect: { border: "border-red-300",   bg: "bg-red-50",   text: "text-red-800",   icon: "x-circle" },
};

const TONE_ICONS: Record<string, string> = {
  "check-circle": "\u2705",
  "alert-circle": "\u26A0\uFE0F",
  "x-circle": "\u274C",
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function WizardMissionPlayer({
  mission,
  moduleSlug,
  isCompleted,
  onComplete,
}: {
  mission: WizardMissionDef;
  moduleSlug: string;
  isCompleted: boolean;
  onComplete: () => void;
}) {
  const t = useTranslations("bootcamp");
  const { showXPGain, fireConfetti } = useCelebration();

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [feedbackRevealed, setFeedbackRevealed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [stepXP, setStepXP] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [missionDone, setMissionDone] = useState(isCompleted);
  const [encourageKey, setEncourageKey] = useState<string | null>(null);
  const hasCompletedRef = useRef(false);
  const stepCardRef = useRef<HTMLDivElement>(null);

  const currentStep = mission.steps[currentStepIdx];
  const totalSteps = mission.steps.length;
  const progressPercent = totalSteps === 0 ? 0 : Math.round((currentStepIdx / totalSteps) * 100);
  const isLastStep = currentStepIdx === totalSteps - 1;

  // Restore progress on mount
  useEffect(() => {
    const saved = getWizardProgress(moduleSlug, mission.missionId);
    if (saved && saved.completed) {
      setMissionDone(true);
      setCurrentStepIdx(totalSteps);
      setTotalCorrect(saved.stepResults.filter((r) => r.wasCorrect).length);
      setTotalXP(saved.totalXpEarned);
    } else if (saved && saved.currentStepIndex > 0 && saved.currentStepIndex < totalSteps) {
      setCurrentStepIdx(saved.currentStepIndex);
      setTotalCorrect(saved.stepResults.filter((r) => r.wasCorrect).length);
      setTotalXP(saved.totalXpEarned);
    }
  }, [moduleSlug, mission.missionId, totalSteps]);

  // Can advance to next step?
  const canAdvance = useMemo(() => {
    if (!currentStep) return false;
    switch (currentStep.stepType) {
      case "info":
        return true;
      case "choice":
        return feedbackRevealed;
      case "confirm":
        return confirmed;
      default:
        return false;
    }
  }, [currentStep, feedbackRevealed, confirmed]);

  const handleSelectChoice = useCallback((choice: WizardChoice) => {
    if (feedbackRevealed) return;
    setSelectedChoiceId(choice.id);
    setFeedbackRevealed(true);
    setStepXP(choice.xpBonus);

    if (choice.xpBonus > 0) {
      showXPGain(choice.xpBonus);
    }

    if (choice.isCorrect) {
      setTotalCorrect((prev) => prev + 1);
    }
    setTotalXP((prev) => prev + choice.xpBonus);

    // Save step result
    saveWizardStepResult(moduleSlug, mission.missionId, {
      stepId: currentStep!.id,
      choiceId: choice.id,
      wasCorrect: choice.isCorrect,
      xpEarned: choice.xpBonus,
    });
  }, [feedbackRevealed, moduleSlug, mission.missionId, currentStep, showXPGain]);

  const handleConfirm = useCallback(() => {
    setConfirmed(true);
    saveWizardStepResult(moduleSlug, mission.missionId, {
      stepId: currentStep!.id,
      wasCorrect: true,
      xpEarned: 0,
    });
  }, [moduleSlug, mission.missionId, currentStep]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      // Complete mission
      completeWizardMission(moduleSlug, mission.missionId);
      setMissionDone(true);
      setCurrentStepIdx(totalSteps);

      // Award XP
      const xpKey = `${moduleSlug}:${mission.missionId}`;
      if (!hasXPEvent("mission_complete", xpKey)) {
        const result = addXP("mission_complete", xpKey);
        showXPGain(result.xpGained);
      }

      // Award boss XP
      if (mission.isBossLevel && !hasXPEvent("boss_complete", xpKey)) {
        const result = addXP("boss_complete", xpKey);
        if (result.xpGained > 0) showXPGain(result.xpGained);
      }

      // Check for perfect run
      const choiceSteps = mission.steps.filter((s) => s.stepType === "choice");
      const perfectRun = totalCorrect === choiceSteps.length && choiceSteps.length > 0;
      if (perfectRun) {
        fireConfetti();
      }

      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete();
      }
    } else {
      // Show encouragement randomly
      if (Math.random() < 0.4) {
        const key = ENCOURAGE_KEYS[Math.floor(Math.random() * ENCOURAGE_KEYS.length)];
        setEncourageKey(key);
        setTimeout(() => setEncourageKey(null), 1500);
      }

      // Advance to next step
      setCurrentStepIdx((prev) => prev + 1);
      setSelectedChoiceId(null);
      setFeedbackRevealed(false);
      setConfirmed(false);
      setStepXP(0);

      // Focus step card for accessibility
      requestAnimationFrame(() => {
        stepCardRef.current?.focus();
      });
    }
  }, [
    isLastStep, totalSteps, moduleSlug, mission, totalCorrect,
    showXPGain, fireConfetti, onComplete,
  ]);

  const handleInfoNext = useCallback(() => {
    saveWizardStepResult(moduleSlug, mission.missionId, {
      stepId: currentStep!.id,
      wasCorrect: true,
      xpEarned: 0,
    });
    handleNext();
  }, [moduleSlug, mission.missionId, currentStep, handleNext]);

  // Mission complete view
  if (missionDone || currentStepIdx >= totalSteps) {
    const choiceSteps = mission.steps.filter((s) => s.stepType === "choice");
    const perfectRun = totalCorrect === choiceSteps.length && choiceSteps.length > 0;

    return (
      <div className="animate-content-enter">
        <div className={`rounded-2xl border p-6 sm:p-8 text-center ${
          mission.isBossLevel
            ? "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50"
            : "border-green-200 bg-gradient-to-br from-green-50 to-teal-50"
        }`}>
          <div className="text-4xl mb-3">{perfectRun ? "🌟" : "✅"}</div>
          <h3 className="text-xl font-bold text-gray-900">
            {t("wizardMissions.missionComplete")}
          </h3>
          {choiceSteps.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {t("wizardMissions.stepsCorrect", {
                correct: totalCorrect,
                total: choiceSteps.length,
              })}
            </p>
          )}
          {perfectRun && (
            <p className="mt-1 text-sm font-semibold text-amber-700">
              {t("wizardMissions.perfectRun")}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!currentStep) return null;

  return (
    <div className="space-y-4 animate-content-enter">
      {/* Progress bar */}
      <WizardProgressBar
        current={currentStepIdx + 1}
        total={totalSteps}
        percent={progressPercent}
        isBoss={mission.isBossLevel}
        t={t}
      />

      {/* Encouraging message flyup */}
      {encourageKey && (
        <div className="text-center animate-wizard-encourage">
          <span className="text-sm font-bold text-teal-600">{t(encourageKey)}</span>
        </div>
      )}

      {/* Step card */}
      <div
        ref={stepCardRef}
        tabIndex={-1}
        className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-wizard-step-enter outline-none"
        key={currentStepIdx}
      >
        {/* Step header */}
        <div className={`px-5 py-3 border-b border-gray-100 ${
          mission.isBossLevel
            ? "bg-gradient-to-r from-amber-50 to-orange-50"
            : "bg-gradient-to-r from-gray-50 to-teal-50/30"
        }`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {t("wizardMissions.stepOf", { current: currentStepIdx + 1, total: totalSteps })}
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Context text */}
          <p className="text-sm text-gray-800 leading-relaxed">
            {t(currentStep.contextKey)}
          </p>

          {/* Tip callout */}
          {currentStep.tipKey && (
            <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 flex items-start gap-2">
              <span className="text-base shrink-0">💡</span>
              <p className="text-xs text-amber-800 leading-relaxed">{t(currentStep.tipKey)}</p>
            </div>
          )}

          {/* Step-type specific content */}
          {currentStep.stepType === "info" && (
            <InfoStepContent step={currentStep} t={t} onNext={handleInfoNext} />
          )}

          {currentStep.stepType === "choice" && (
            <ChoiceStepContent
              step={currentStep}
              selectedChoiceId={selectedChoiceId}
              feedbackRevealed={feedbackRevealed}
              onSelect={handleSelectChoice}
              t={t}
            />
          )}

          {currentStep.stepType === "confirm" && (
            <ConfirmStepContent
              step={currentStep}
              confirmed={confirmed}
              onConfirm={handleConfirm}
              t={t}
            />
          )}

          {/* Next button (for choice/confirm steps) */}
          {currentStep.stepType !== "info" && canAdvance && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
              >
                {isLastStep ? t("wizardMissions.finishMission") : t("wizardMissions.nextStep")}
                <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress Bar                                                       */
/* ------------------------------------------------------------------ */

function WizardProgressBar({
  current,
  total,
  percent,
  isBoss,
  t,
}: {
  current: number;
  total: number;
  percent: number;
  isBoss: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: isBoss
              ? "linear-gradient(90deg, #f59e0b 0%, #f97316 100%)"
              : "linear-gradient(90deg, #00a8ab 0%, #44babe 100%)",
          }}
        />
      </div>
      <span className="text-xs font-medium text-gray-500 shrink-0 tabular-nums">
        {current}/{total}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Info Step                                                          */
/* ------------------------------------------------------------------ */

function InfoStepContent({
  step,
  t,
  onNext,
}: {
  step: Extract<WizardStep, { stepType: "info" }>;
  t: ReturnType<typeof useTranslations>;
  onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-indigo-50/60 border border-indigo-100 p-4">
        <p className="text-sm text-indigo-900 leading-relaxed">{t(step.bodyKey)}</p>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
        >
          {t("wizardMissions.gotIt")}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Choice Step                                                        */
/* ------------------------------------------------------------------ */

function ChoiceStepContent({
  step,
  selectedChoiceId,
  feedbackRevealed,
  onSelect,
  t,
}: {
  step: Extract<WizardStep, { stepType: "choice" }>;
  selectedChoiceId: string | null;
  feedbackRevealed: boolean;
  onSelect: (choice: WizardChoice) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-700">{t("wizardMissions.chooseAction")}</p>

      <div className="grid gap-2">
        {step.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          const style = TONE_STYLES[choice.feedbackTone];

          let cardClasses = "relative rounded-xl border p-4 text-left transition-all duration-200";

          if (!feedbackRevealed) {
            cardClasses += " border-gray-200 hover:border-teal-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer";
          } else if (isSelected) {
            cardClasses += ` ${style.border} ${style.bg}`;
          } else {
            cardClasses += " border-gray-200 opacity-50";
          }

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onSelect(choice)}
              disabled={feedbackRevealed}
              className={cardClasses}
            >
              <div className="flex items-start gap-3">
                <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
                  feedbackRevealed && isSelected
                    ? choice.isCorrect
                      ? "bg-green-200 text-green-800 border border-green-300"
                      : "bg-red-200 text-red-800 border border-red-300"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}>
                  {choice.id.toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{t(choice.labelKey)}</p>

                  {feedbackRevealed && isSelected && (
                    <div className={`mt-3 rounded-lg border-l-4 p-3 text-sm leading-relaxed animate-wizard-feedback ${style.border} ${style.bg}`}>
                      <div className="flex items-start gap-2">
                        <span className="text-base shrink-0">{TONE_ICONS[style.icon]}</span>
                        <div>
                          <p className={`font-semibold ${style.text} mb-1`}>
                            {t(`wizardMissions.tone.${choice.feedbackTone}`)}
                          </p>
                          <p className={style.text}>{t(choice.feedbackKey)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Confirm Step                                                       */
/* ------------------------------------------------------------------ */

function ConfirmStepContent({
  step,
  confirmed,
  onConfirm,
  t,
}: {
  step: Extract<WizardStep, { stepType: "confirm" }>;
  confirmed: boolean;
  onConfirm: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-4">
      <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
        confirmed
          ? "border-green-300 bg-green-50"
          : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
      }`}>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={() => { if (!confirmed) onConfirm(); }}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
        <span className="text-sm font-medium text-gray-800">{t(step.confirmLabelKey)}</span>
      </label>
    </div>
  );
}
