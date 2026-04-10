"use client";

import { useState, useCallback, useMemo } from "react";
import type { DecisionTreeExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

type TreeNode = DecisionTreeExercise["nodes"][number];

type JourneyStep = {
  nodeId: string;
  chosenOptionId: string;
  quality: "good" | "okay" | "poor";
};

const QUALITY_STYLES = {
  good: {
    border: "border-green-200",
    bg: "bg-green-50",
    text: "text-green-800",
    dot: "bg-green-500",
    label: "Good choice",
  },
  okay: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-800",
    dot: "bg-amber-500",
    label: "Acceptable",
  },
  poor: {
    border: "border-red-200",
    bg: "bg-red-50",
    text: "text-red-800",
    dot: "bg-red-500",
    label: "Needs rethinking",
  },
};

export function DecisionTreeCard({
  exercise,
  onPass,
  t,
}: {
  exercise: DecisionTreeExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const nodeMap = useMemo(
    () => new Map<string, TreeNode>(exercise.nodes.map((n) => [n.id, n])),
    [exercise.nodes]
  );

  const [currentNodeId, setCurrentNodeId] = useState(exercise.startNodeId);
  const [journey, setJourney] = useState<JourneyStep[]>([]);
  const [feedback, setFeedback] = useState<{
    text: string;
    quality: "good" | "okay" | "poor";
    nextNodeId: string;
  } | null>(null);
  const [ended, setEnded] = useState(false);
  const [endData, setEndData] = useState<{
    feedbackText: string;
    isGood: boolean;
  } | null>(null);

  const currentNode = nodeMap.get(currentNodeId);

  /* Choose an option */
  const handleChoose = useCallback(
    (option: {
      id: string;
      labelKey: string;
      nextNodeId: string;
      feedbackKey: string;
      quality: "good" | "okay" | "poor";
    }) => {
      if (feedback || ended) return;

      setJourney((prev) => [
        ...prev,
        {
          nodeId: currentNodeId,
          chosenOptionId: option.id,
          quality: option.quality,
        },
      ]);

      setFeedback({
        text: t(option.feedbackKey),
        quality: option.quality,
        nextNodeId: option.nextNodeId,
      });
    },
    [feedback, ended, currentNodeId, t]
  );

  /* Continue to next node */
  const handleContinue = useCallback(() => {
    if (!feedback) return;

    const nextNode = nodeMap.get(feedback.nextNodeId);
    if (nextNode?.isEnd) {
      setCurrentNodeId(feedback.nextNodeId);
      setFeedback(null);
      setEnded(true);
      setEndData({
        feedbackText: nextNode.endFeedbackKey ? t(nextNode.endFeedbackKey) : "",
        isGood: nextNode.endIsGood ?? false,
      });

      if (nextNode.endIsGood) {
        onPass();
      }
    } else {
      setCurrentNodeId(feedback.nextNodeId);
      setFeedback(null);
    }
  }, [feedback, nodeMap, t, onPass]);

  /* Try again from start */
  const handleRetry = useCallback(() => {
    setCurrentNodeId(exercise.startNodeId);
    setJourney([]);
    setFeedback(null);
    setEnded(false);
    setEndData(null);
  }, [exercise.startNodeId]);

  /* Count good choices for summary */
  const goodCount = journey.filter((s) => s.quality === "good").length;
  const totalSteps = journey.length;

  if (!currentNode) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-4">
        {t("learningBlocks.decisionTreeTitle")}
      </div>

      {/* Instruction */}
      <p className="text-base font-semibold text-gray-900 mb-1">
        {t(exercise.instructionKey)}
      </p>

      {/* Scenario context */}
      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-xl overflow-hidden mb-5">
        {exercise.scenarioImageUrl && (
          <div className="p-4 pb-0">
            <img
              src={exercise.scenarioImageUrl}
              alt=""
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-line">
            {t(exercise.scenarioKey)}
          </p>
        </div>
      </div>

      {/* Journey trail */}
      {journey.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t("learningBlocks.decisionTreeJourney")}
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {journey.map((step, i) => {
              const style = QUALITY_STYLES[step.quality];
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    className={`w-3 h-3 rounded-full ${style.dot} shrink-0`}
                    title={style.label}
                  />
                  {i < journey.length - 1 && (
                    <div className="w-4 h-px bg-gray-300" />
                  )}
                </div>
              );
            })}
            {!ended && (
              <>
                <div className="w-4 h-px bg-gray-300" />
                <div className="w-3 h-3 rounded-full border-2 border-dashed border-violet-300 shrink-0" />
              </>
            )}
          </div>
        </div>
      )}

      {/* End state */}
      {ended && endData && (
        <div className="animate-content-enter">
          {/* End node prompt */}
          {currentNode.promptKey && (
            <p className="text-lg font-semibold text-gray-900 mb-4">
              {t(currentNode.promptKey)}
            </p>
          )}

          {/* End feedback */}
          <div
            className={`rounded-xl border p-4 mb-5 ${
              endData.isGood
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            <div className="flex items-start gap-2">
              {endData.isGood ? (
                <IconCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              ) : (
                <IconClose className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`text-sm font-semibold mb-1 ${
                    endData.isGood ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {endData.isGood
                    ? t("learningBlocks.decisionTreeGoodEnd")
                    : t("learningBlocks.decisionTreeBadEnd")}
                </p>
                {endData.feedbackText && (
                  <p
                    className={`text-sm leading-relaxed ${
                      endData.isGood ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {endData.feedbackText}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-5">
            <p className="text-sm text-gray-600">
              {t("learningBlocks.decisionTreeSummary", {
                good: goodCount,
                total: totalSteps,
              })}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {!endData.isGood && (
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                {t("learningBlocks.decisionTreeRetry")}
                <span aria-hidden>&larr;</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Active node (not ended) */}
      {!ended && (
        <div className="animate-content-enter" key={currentNodeId}>
          {/* Node prompt */}
          <p className="text-lg font-semibold text-gray-900 mb-4">
            {t(currentNode.promptKey)}
          </p>

          {/* Feedback for chosen option */}
          {feedback && (
            <div className="animate-wizard-feedback mb-5">
              <div
                className={`rounded-xl border p-4 ${
                  QUALITY_STYLES[feedback.quality].border
                } ${QUALITY_STYLES[feedback.quality].bg}`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      QUALITY_STYLES[feedback.quality].dot
                    } shrink-0 mt-0.5`}
                  />
                  <p
                    className={`text-sm leading-relaxed ${
                      QUALITY_STYLES[feedback.quality].text
                    }`}
                  >
                    {feedback.text}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {t("learningBlocks.decisionTreeContinue")}
                  <span aria-hidden>&rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* Options (hidden when feedback is showing) */}
          {!feedback && (
            <div className="grid gap-3">
              {currentNode.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleChoose(option)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 text-left text-sm font-medium text-gray-700 hover:border-violet-400 hover:bg-violet-50/30 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  <span className="leading-relaxed">{t(option.labelKey)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
