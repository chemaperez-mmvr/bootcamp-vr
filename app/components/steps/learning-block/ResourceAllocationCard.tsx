"use client";

import { useState, useCallback, useMemo } from "react";
import type { ResourceAllocationExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";
import { LearningBlockShell } from "./LearningBlockShell";

export function ResourceAllocationCard({
  exercise,
  onPass,
  t,
}: {
  exercise: ResourceAllocationExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
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

  const handleChange = useCallback(
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
      const rangeWidth = res.idealMax - res.idealMin;
      const tolerance = Math.max(1, Math.ceil(rangeWidth * 0.3));
      if (val >= res.idealMin - tolerance && val <= res.idealMax + tolerance)
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

  return (
    <LearningBlockShell
      tone="cyan"
      badgeLabel={t("learningBlocks.resourceAllocationTitle")}
      title={t(exercise.instructionKey)}
    >
      {/* Scenario */}
      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-xl p-4 mb-6">
        <p className="text-sm sm:text-base text-gray-900 leading-relaxed whitespace-pre-line">
          {t(exercise.scenarioKey)}
        </p>
      </div>

      {/* Budget bar — prominent at top */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            {t("learningBlocks.resourceAllocationBudget", {
              used: totalAllocated,
              total: exercise.totalBudget,
              unit: exercise.totalBudgetUnit,
            })}
          </span>
          <span
            className={`text-sm font-bold tabular-nums ${
              isOverBudget
                ? "text-red-600"
                : isExactBudget
                  ? "text-green-600"
                  : "text-gray-500"
            }`}
          >
            {remaining >= 0 ? remaining : `+${Math.abs(remaining)}`} {exercise.totalBudgetUnit}{" "}
            {remaining >= 0
              ? t("learningBlocks.resourceAllocationLeft")
              : t("learningBlocks.resourceAllocationOverLabel")}
          </span>
        </div>
        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isOverBudget
                ? "bg-red-500"
                : isExactBudget
                  ? "bg-green-500"
                  : "bg-teal-500"
            }`}
            style={{ width: `${Math.min(budgetPercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Resource sliders */}
      <div className="space-y-4 mb-6">
        {exercise.resources.map((res) => {
          const val = allocations[res.id] ?? res.min;
          const status = submitted ? resourceStatus(res) : null;
          const percent = ((val - res.min) / (res.max - res.min)) * 100;

          // Ideal zone markers for the track
          const idealStart = ((res.idealMin - res.min) / (res.max - res.min)) * 100;
          const idealWidth = ((res.idealMax - res.idealMin) / (res.max - res.min)) * 100;

          return (
            <div
              key={res.id}
              className={`rounded-xl border p-4 transition-all duration-300 ${
                status === "ideal"
                  ? "border-green-300 bg-green-50/50"
                  : status === "close"
                    ? "border-amber-300 bg-amber-50/50"
                    : status === "outside"
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200 bg-white"
              }`}
            >
              {/* Label + value */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-800">
                  {t(res.labelKey)}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold tabular-nums ${
                    status === "ideal"
                      ? "bg-green-100 text-green-700"
                      : status === "close"
                        ? "bg-amber-100 text-amber-700"
                        : status === "outside"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {status === "ideal" && <IconCheck className="w-3.5 h-3.5" />}
                  {status === "outside" && <IconClose className="w-3.5 h-3.5" />}
                  {val} {res.unit}
                </span>
              </div>

              {/* Slider track */}
              <div className="relative mb-1">
                {/* Ideal range indicator (green band behind the track) */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 rounded-full bg-green-200/60 pointer-events-none"
                  style={{ left: `${idealStart}%`, width: `${idealWidth}%` }}
                />
                {/* Filled portion */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 h-3 rounded-full pointer-events-none transition-all duration-150 ${
                    isOverBudget ? "bg-red-300/60" : "bg-teal-300/60"
                  }`}
                  style={{ left: 0, width: `${percent}%` }}
                />
                <input
                  type="range"
                  min={res.min}
                  max={res.max}
                  value={val}
                  onChange={(e) => handleChange(res.id, Number(e.target.value))}
                  disabled={submitted}
                  className="relative w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-teal-600 z-10 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "transparent" }}
                />
              </div>

              {/* Min/max + ideal range labels */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{res.min} {res.unit}</span>
                {!submitted && (
                  <span className="text-[10px] text-green-600 font-medium">
                    {t("learningBlocks.resourceAllocationIdealRange", {
                      min: res.idealMin,
                      max: res.idealMax,
                    })}
                  </span>
                )}
                <span className="text-[10px] text-gray-400">{res.max} {res.unit}</span>
              </div>

              {/* Per-resource feedback on submit */}
              {submitted && (
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
            <span aria-hidden>&rarr;</span>
          </button>
        )}

        {submitted && !allInIdealRange && (
          <button
            type="button"
            onClick={handleAdjust}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.resourceAllocationAdjustBtn")}
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
    </LearningBlockShell>
  );
}
