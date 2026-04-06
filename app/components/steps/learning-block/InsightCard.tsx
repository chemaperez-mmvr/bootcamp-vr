"use client";

import { useState, useCallback } from "react";
import type { LearningBlockDef, LearningBlockScenario } from "@/app/bootcamp/learning-block-types";
import type { ContentSlide } from "@/app/bootcamp/slides";
import { WIZARD_TONE as TONE_STYLES } from "@/app/bootcamp/tone-styles";
import { IconTarget, IconLightbulb } from "@/app/components/icons";

/* ------------------------------------------------------------------ */
/*  MiniScenarioCard — explore perspectives, no scoring                */
/* ------------------------------------------------------------------ */

function MiniScenarioCard({
  scenario,
  onDone,
  t,
}: {
  scenario: LearningBlockScenario;
  onDone: () => void;
  t: (key: string) => string;
}) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const handleReveal = useCallback((choiceId: string) => {
    setRevealedIds((prev) => new Set(prev).add(choiceId));
  }, []);

  const exploredEnough = revealedIds.size >= 2;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm animate-content-enter">
      {/* Context */}
      <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 mb-5">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
          {t(scenario.contextKey)}
        </p>
      </div>

      {/* Question */}
      <p className="text-sm font-semibold text-gray-900 mb-2">
        {t(scenario.questionKey)}
      </p>
      <p className="text-xs text-gray-500 mb-4">
        {t("learningBlocks.tapToExplore")}
      </p>

      {/* Explorable choices */}
      <div className="grid gap-3">
        {scenario.choices.map((choice) => {
          const isRevealed = revealedIds.has(choice.id);
          const style = TONE_STYLES[choice.feedbackTone];

          return (
            <div key={choice.id}>
              <button
                type="button"
                onClick={() => handleReveal(choice.id)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                  isRevealed
                    ? `${style.border} ${style.bg}`
                    : "border-gray-200 hover:border-teal-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
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
                  <span className="text-sm text-gray-800 leading-relaxed">
                    {t(choice.labelKey)}
                  </span>
                </div>
              </button>

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
        <p className="mt-3 text-xs text-gray-500 italic text-center">
          {t("learningBlocks.keepExploring")}
        </p>
      )}

      {/* Next button */}
      {exploredEnough && (
        <div className="mt-5 flex justify-end animate-content-enter">
          <button
            type="button"
            onClick={onDone}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal-700 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
          >
            {t("learningBlocks.continueToNext")}
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  InsightCard                                                         */
/* ------------------------------------------------------------------ */

export function InsightCard({
  block,
  slide,
  emphasis,
  onContinue,
  t,
}: {
  block: LearningBlockDef;
  slide: ContentSlide;
  emphasis: boolean;
  onContinue: () => void;
  t: (key: string) => string;
}) {
  const scenarios = block.conceptScenarios;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const handleMiniDone = useCallback(() => {
    const next = currentIdx + 1;
    if (next >= scenarios.length) {
      setAllDone(true);
    } else {
      setCurrentIdx(next);
    }
  }, [currentIdx, scenarios.length]);

  return (
    <div className="space-y-4 animate-content-enter">
      {/* Retry emphasis banner */}
      {emphasis && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start gap-2">
            <IconTarget className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-amber-800">
              {t("learningBlocks.reviewCarefully")}
            </p>
          </div>
        </div>
      )}

      {/* Mini-scenario counter */}
      {!allDone && scenarios.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {scenarios.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIdx
                  ? "bg-teal-500 scale-125"
                  : i < currentIdx
                    ? "bg-teal-300"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      )}

      {/* Current mini-scenario */}
      {!allDone && scenarios[currentIdx] && (
        <MiniScenarioCard
          key={scenarios[currentIdx].id}
          scenario={scenarios[currentIdx]}
          onDone={handleMiniDone}
          t={t}
        />
      )}

      {/* Summary highlight — shown after all mini-scenarios done */}
      {allDone && (
        <>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-content-enter">
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 px-6 py-5 sm:px-8">
              <h3 className="text-lg font-bold text-white">
                {t(slide.titleKey)}
              </h3>
            </div>
            <div className="p-6 sm:p-8">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                <div className="flex items-start gap-3">
                  <IconLightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                      {t("learningBlocks.insightKeyTakeaway")}
                    </span>
                    <p className="mt-1 text-sm font-semibold text-amber-900 leading-relaxed">
                      {t(slide.highlightKey)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end animate-content-enter">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
            >
              {t("learningBlocks.continueToCheck")}
              <span aria-hidden>→</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
