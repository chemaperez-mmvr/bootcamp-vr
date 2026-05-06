"use client";

import { useState, useCallback } from "react";
import type { TroubleshootingExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";
import { LearningBlockShell } from "./LearningBlockShell";

export function TroubleshootingCard({
  exercise,
  onPass,
  t,
}: {
  exercise: TroubleshootingExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const [currentNodeId, setCurrentNodeId] = useState(exercise.startNodeId);
  const [visitedNodeIds, setVisitedNodeIds] = useState<string[]>([
    exercise.startNodeId,
  ]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const nodeMap = new Map(exercise.nodes.map((n) => [n.id, n]));
  const currentNode = nodeMap.get(currentNodeId);

  const selectedOption = currentNode?.options.find(
    (o) => o.id === selectedOptionId
  );

  const handleChoose = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedOption) return;

    if (selectedOption.isCorrect && selectedOption.nextNodeId === null) {
      // Solved — final correct step
      setSolved(true);
      return;
    }

    if (selectedOption.isCorrect && selectedOption.nextNodeId) {
      // Advance to next node
      const nextId = selectedOption.nextNodeId;
      setCurrentNodeId(nextId);
      setVisitedNodeIds((prev) => [...prev, nextId]);
      setSelectedOptionId(null);
    }
  }, [selectedOption]);

  const handleRetry = useCallback(() => {
    setSelectedOptionId(null);
  }, []);

  if (!currentNode) return null;

  return (
    <LearningBlockShell
      tone="orange"
      badgeLabel={t("learningBlocks.troubleshootingTitle")}
      title={t(exercise.instructionKey)}
    >
      {/* Breadcrumb trail */}
      {visitedNodeIds.length > 1 && (
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {visitedNodeIds.map((nodeId, idx) => {
            const isCurrentStep = nodeId === currentNodeId && !solved;
            const isCompletedStep = idx < visitedNodeIds.length - 1 || solved;

            return (
              <div key={nodeId} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <span className="text-gray-300 text-xs" aria-hidden>
                    &rarr;
                  </span>
                )}
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 transition-colors ${
                    isCompletedStep
                      ? "bg-green-500 text-white"
                      : isCurrentStep
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompletedStep ? (
                    <IconCheck className="w-3.5 h-3.5" />
                  ) : (
                    idx + 1
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Per-node image takes priority; falls back to the scenario-wide image. */}
      <div
        className={
          (currentNode.imageUrl ?? exercise.scenarioImageUrl)
            ? "grid gap-4 sm:grid-cols-[minmax(0,360px)_minmax(0,1fr)]"
            : ""
        }
      >
        {/* Image — alone on the left */}
        {(currentNode.imageUrl ?? exercise.scenarioImageUrl) && (
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 self-stretch min-h-[180px]">
            <img
              src={currentNode.imageUrl ?? exercise.scenarioImageUrl}
              alt=""
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          </div>
        )}

        {/* Right column: report + active/solved */}
        <div className={(currentNode.imageUrl ?? exercise.scenarioImageUrl) ? "min-w-0" : ""}>
          {/* Scenario — problem report */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 mb-5">
            <div className="flex items-start gap-2.5">
              <span className="text-lg shrink-0" aria-hidden>
                &#9888;&#65039;
              </span>
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                  {t("learningBlocks.troubleshootingReport")}
                </p>
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-line">
                  {t(exercise.scenarioKey)}
                </p>
              </div>
            </div>
          </div>

      {/* Solved state */}
      {solved && selectedOption && (
        <div className="animate-content-enter">
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 mb-5 animate-wizard-feedback">
            <div className="flex items-start gap-3">
              <IconCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800 mb-1">
                  {t("learningBlocks.troubleshootingSolved")}
                </p>
                <p className="text-sm text-green-700 leading-relaxed">
                  {t(selectedOption.feedbackKey)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onPass}
              className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {t("learningBlocks.exerciseDone")}
              <span className="ml-2" aria-hidden>
                &rarr;
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Active node */}
      {!solved && (
        <div className="animate-content-enter">
          {/* Current prompt */}
          <p className="text-base font-semibold text-gray-900 mb-4">
            {t(currentNode.promptKey)}
          </p>

          {/* Options */}
          <div className="grid gap-3">
            {currentNode.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const showFeedback = isSelected && selectedOption;

              return (
                <div key={option.id}>
                  <button
                    type="button"
                    onClick={() => handleChoose(option.id)}
                    disabled={selectedOptionId !== null}
                    className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                      isSelected
                        ? option.isCorrect
                          ? "border-green-400 bg-green-50"
                          : "border-red-400 bg-red-50"
                        : selectedOptionId !== null
                          ? "border-gray-100 bg-gray-50 opacity-50"
                          : "border-gray-200 hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-full border-2 text-xs font-bold shrink-0 transition-colors ${
                          isSelected && option.isCorrect
                            ? "border-green-400 bg-green-500 text-white"
                            : isSelected && !option.isCorrect
                              ? "border-red-400 bg-red-500 text-white"
                              : "border-gray-300 text-gray-500"
                        }`}
                      >
                        {isSelected && option.isCorrect ? (
                          <IconCheck className="w-3.5 h-3.5" />
                        ) : isSelected && !option.isCorrect ? (
                          <IconClose className="w-3.5 h-3.5" />
                        ) : (
                          option.id.toUpperCase()
                        )}
                      </span>
                      <span className="text-sm text-gray-800 leading-relaxed">
                        {t(option.labelKey)}
                      </span>
                    </div>
                  </button>

                  {/* Feedback */}
                  {showFeedback && (
                    <div
                      className={`mt-2 ml-10 rounded-lg border-l-4 p-3 animate-wizard-feedback ${
                        option.isCorrect
                          ? "border-green-400 bg-green-50"
                          : "border-red-400 bg-red-50"
                      }`}
                    >
                      <p
                        className={`text-sm leading-relaxed ${
                          option.isCorrect
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        {t(option.feedbackKey)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          {selectedOption && (
            <div className="mt-6 flex justify-end animate-content-enter">
              {selectedOption.isCorrect ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {selectedOption.nextNodeId === null
                    ? t("learningBlocks.exerciseDone")
                    : t("learningBlocks.troubleshootingContinue")}
                  <span className="ml-2" aria-hidden>
                    &rarr;
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {t("learningBlocks.troubleshootingRetry")}
                  <span aria-hidden>&larr;</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
        </div>
      </div>
    </LearningBlockShell>
  );
}
