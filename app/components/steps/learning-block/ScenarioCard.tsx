"use client";

import { useState, useCallback } from "react";
import type {
  LearningBlockDef,
  LearningBlockChoice,
} from "@/app/bootcamp/learning-block-types";
import { WIZARD_TONE as TONE_STYLES } from "@/app/bootcamp/tone-styles";
import { LearningBlockShell } from "./LearningBlockShell";

export function ScenarioCard({
  block,
  onChoiceMade,
  t,
}: {
  block: LearningBlockDef;
  onChoiceMade: (choice: LearningBlockChoice) => void;
  t: (key: string) => string;
}) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const handleReveal = useCallback((choiceId: string) => {
    setRevealedIds((prev) => new Set(prev).add(choiceId));
  }, []);

  const exploredEnough = revealedIds.size >= 2;
  const bestChoice = block.scenario.choices.find((c) => c.isCorrect) ?? block.scenario.choices[0];

  return (
    <LearningBlockShell
      tone="indigo"
      badgeLabel={t("learningBlocks.scenarioLabel")}
      title={t(block.scenario.questionKey)}
      subtitle={t("learningBlocks.explorePrompt")}
    >
      {/* Context — preserved from the original layout (now rendered after subtitle) */}
      <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-5 mb-5">
        <p className="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-line">
          {t(block.scenario.contextKey)}
        </p>
      </div>

      {/* Explorable choices */}
      <div className="grid gap-3">
        {block.scenario.choices.map((choice) => {
          const isRevealed = revealedIds.has(choice.id);
          const style = TONE_STYLES[choice.feedbackTone];

          return (
            <div key={choice.id}>
              <button
                type="button"
                onClick={() => handleReveal(choice.id)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                  isRevealed
                    ? `${style.border} ${style.bg}`
                    : "border-gray-200 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full border-2 text-xs font-bold shrink-0 transition-colors ${
                      isRevealed
                        ? `${style.border} ${style.bg} ${style.text}`
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {choice.id.toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-800 leading-relaxed">
                      {t(choice.labelKey)}
                    </span>
                    {!isRevealed && (
                      <p className="mt-1 text-xs text-gray-400">
                        {t("learningBlocks.tapToExplore")}
                      </p>
                    )}
                  </div>
                </div>
              </button>

              {/* Feedback — always visible once revealed */}
              {isRevealed && (
                <div
                  className={`mt-2 ml-10 rounded-lg border-l-4 ${style.border} ${style.bg} p-3 animate-wizard-feedback`}
                >
                  <div className="flex gap-2">
                    <span className="text-base shrink-0">{style.icon}</span>
                    <p className={`text-sm ${style.text} leading-relaxed`}>
                      {t(choice.feedbackKey)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Explore hint */}
      {!exploredEnough && revealedIds.size > 0 && (
        <p className="mt-4 text-xs text-gray-500 italic text-center">
          {t("learningBlocks.keepExploring")}
        </p>
      )}

      {/* Continue button */}
      {exploredEnough && (
        <div className="mt-6 flex justify-end animate-content-enter">
          <button
            type="button"
            onClick={() => onChoiceMade(bestChoice)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.continueToInsight")}
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </LearningBlockShell>
  );
}
