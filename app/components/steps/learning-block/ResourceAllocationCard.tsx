"use client";

import { useState, useCallback, useMemo } from "react";
import type { ResourceAllocationExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

export function ResourceAllocationCard({
  exercise,
  onPass,
  t,
}: {
  exercise: ResourceAllocationExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  // Initialize each resource at its minimum value
  const [allocations, setAllocations] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const res of exercise.resources) {
      initial[res.id] = res.min;
    }
    return initial;
  });
  const [submitted, setSubmitted] = useState(false);

  const totalAllocated = useMemo(
    () => Object.values(allocations).reduce((sum, v) => sum + v, 0),
    [allocations]
  );

  const remaining = exercise.totalBudget - totalAllocated;
  const isOverBudget = remaining < 0;
  const isExactBudget = remaining === 0;

  const handleSliderChange = useCallback(
    (resourceId: string, value: number) => {
      if (submitted) return;
      setAllocations((prev) => ({ ...prev, [resourceId]: value }));
    },
    [submitted]
  );

  const resourceStatus = useCallback(
    (res: (typeof exercise.resources)[number]) => {
      const val = allocations[res.id] ?? res.min;
      if (val >= res.idealMin && val <= res.idealMax) return "ideal";
      // "Close" = within 20% of ideal range width on either side
      const rangeWidth = res.idealMax - res.idealMin;
      const tolerance = Math.max(1, Math.ceil(rangeWidth * 0.3));
      if (
        val >= res.idealMin - tolerance &&
        val <= res.idealMax + tolerance
      )
        return "close";
      return "outside";
    },
    [allocations]
  );

  const allInIdealRange = useMemo(
    () => exercise.resources.every((res) => resourceStatus(res) === "ideal"),
    [exercise.resources, resourceStatus]
  );

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    if (allInIdealRange) {
      // Small delay so user sees the success state
      setTimeout(() => onPass(), 600);
    }
  }, [allInIdealRange, onPass]);

  const handleAdjust = useCallback(() => {
    setSubmitted(false);
  }, []);

  const budgetPercent = Math.min(
    100,
    Math.max(0, (totalAllocated / exercise.totalBudget) * 100)
  );

  const statusBorderClass = (res: (typeof exercise.resources)[number]) => {
    const s = resourceStatus(res);
    if (s === "ideal") return "border-l-green-500";
    if (s === "close") return "border-l-amber-500";
    return "border-l-red-500";
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold mb-4">
        {t("learningBlocks.resourceAllocationTitle")}
      </div>

      {/* Instruction */}
      <p className="text-sm text-gray-600 mb-4">
        {t(exercise.instructionKey)}
      </p>

      {/* Scenario */}
      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-xl p-4 mb-5">
        <p className="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-line">
          {t(exercise.scenarioKey)}
        </p>
      </div>

      {/* Budget bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-semibold text-gray-700">
            {t("learningBlocks.resourceAllocationBudget")}
          </span>
          <span
            className={`text-sm font-bold ${
              isOverBudget
                ? "text-red-600"
                : isExactBudget
                  ? "text-green-600"
                  : "text-gray-600"
            }`}
          >
            {totalAllocated} / {exercise.totalBudget} {exercise.totalBudgetUnit}
          </span>
        </div>
        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isOverBudget ? "bg-red-500" : "bg-teal-500"
            }`}
            style={{ width: `${Math.min(budgetPercent, 100)}%` }}
          />
        </div>
        {isOverBudget && (
          <p className="text-xs text-red-600 mt-1">
            {t("learningBlocks.resourceAllocationOver", {
              over: Math.abs(remaining),
              unit: exercise.totalBudgetUnit,
            })}
          </p>
        )}
        {!isOverBudget && !isExactBudget && (
          <p className="text-xs text-gray-500 mt-1">
            {t("learningBlocks.resourceAllocationRemaining", {
              remaining,
              unit: exercise.totalBudgetUnit,
            })}
          </p>
        )}
      </div>

      {/* Resource sliders */}
      <div className="space-y-3 mb-6">
        {exercise.resources.map((res) => {
          const val = allocations[res.id] ?? res.min;
          const status = resourceStatus(res);
          const showFeedback = submitted;

          return (
            <div
              key={res.id}
              className={`p-4 rounded-xl border border-gray-200 bg-gray-50 border-l-4 transition-colors ${statusBorderClass(res)}`}
            >
              {/* Label + value */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">
                  {t(res.labelKey)}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    status === "ideal"
                      ? "bg-green-100 text-green-700"
                      : status === "close"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {val} {res.unit}
                </span>
              </div>

              {/* Slider */}
              <div className="relative">
                {/* Ideal range visual indicator */}
                <div className="absolute top-1/2 -translate-y-1/2 h-2 rounded-lg bg-green-200/50 pointer-events-none"
                  style={{
                    left: `${((res.idealMin - res.min) / (res.max - res.min)) * 100}%`,
                    width: `${((res.idealMax - res.idealMin) / (res.max - res.min)) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min={res.min}
                  max={res.max}
                  value={val}
                  onChange={(e) =>
                    handleSliderChange(res.id, Number(e.target.value))
                  }
                  disabled={submitted}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600 relative z-10 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Min/max labels */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-gray-400">
                  {res.min} {res.unit}
                </span>
                <span className="text-[10px] text-gray-400">
                  {res.max} {res.unit}
                </span>
              </div>

              {/* Per-resource feedback on submit */}
              {showFeedback && (
                <div
                  className={`mt-2 flex items-center gap-2 text-xs font-medium animate-wizard-feedback ${
                    status === "ideal"
                      ? "text-green-700"
                      : status === "close"
                        ? "text-amber-700"
                        : "text-red-700"
                  }`}
                >
                  {status === "ideal" ? (
                    <IconCheck className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <IconClose className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>
                    {status === "ideal"
                      ? t("learningBlocks.resourceAllocationIdeal")
                      : t("learningBlocks.resourceAllocationAdjust", {
                          min: res.idealMin,
                          max: res.idealMax,
                          unit: res.unit,
                        })}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!submitted && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isExactBudget}
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
              isExactBudget
                ? "text-white bg-teal-600 hover:bg-teal-700 cursor-pointer"
                : "text-gray-400 bg-gray-200 cursor-not-allowed"
            }`}
          >
            {t("learningBlocks.resourceAllocationSubmit")}
            <span aria-hidden>→</span>
          </button>
        )}

        {submitted && !allInIdealRange && (
          <button
            type="button"
            onClick={handleAdjust}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.resourceAllocationAdjustBtn")}
            <span aria-hidden>↩</span>
          </button>
        )}
      </div>

      {/* Result message */}
      {submitted && (
        <div
          className={`mt-4 rounded-xl border p-4 animate-wizard-feedback ${
            allInIdealRange
              ? "border-green-200 bg-green-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              allInIdealRange ? "text-green-800" : "text-amber-800"
            }`}
          >
            {allInIdealRange
              ? t("learningBlocks.resourceAllocationPass")
              : t("learningBlocks.resourceAllocationRetry")}
          </p>
        </div>
      )}
    </div>
  );
}
