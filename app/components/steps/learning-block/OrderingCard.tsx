"use client";

import { useState, useCallback } from "react";
import type { OrderingExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";
import { LearningBlockShell } from "./LearningBlockShell";

export function OrderingCard({
  exercise,
  onPass,
  t,
}: {
  exercise: OrderingExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  // Shuffle items for initial order
  const [order, setOrder] = useState<string[]>(() =>
    [...exercise.items].sort(() => Math.random() - 0.5).map((i) => i.id)
  );
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [wrongPositions, setWrongPositions] = useState<Set<number>>(new Set());

  const handleTap = useCallback(
    (idx: number) => {
      if (checked) return;
      if (selectedIdx === null) {
        setSelectedIdx(idx);
      } else if (selectedIdx === idx) {
        setSelectedIdx(null);
      } else {
        // Swap
        setOrder((prev) => {
          const next = [...prev];
          [next[selectedIdx], next[idx]] = [next[idx], next[selectedIdx]];
          return next;
        });
        setSelectedIdx(null);
      }
    },
    [checked, selectedIdx]
  );

  const handleCheck = useCallback(() => {
    const wrong = new Set<number>();
    const correctOrder = [...exercise.items]
      .sort((a, b) => a.correctPosition - b.correctPosition)
      .map((i) => i.id);

    order.forEach((id, idx) => {
      if (id !== correctOrder[idx]) wrong.add(idx);
    });

    setWrongPositions(wrong);
    setChecked(true);
  }, [order, exercise.items]);

  const handleReset = useCallback(() => {
    setOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
    setSelectedIdx(null);
    setChecked(false);
    setWrongPositions(new Set());
  }, []);

  const allCorrect = checked && wrongPositions.size === 0;

  const itemMap = new Map(exercise.items.map((i) => [i.id, i]));

  return (
    <LearningBlockShell
      tone="violet"
      badgeLabel={t("learningBlocks.orderingTitle")}
      title={t(exercise.instructionKey)}
      subtitle={t("learningBlocks.orderingInstruction")}
    >
      {/* Scale labels */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {t(exercise.scaleStartKey)}
        </span>
        <div className="flex-1 mx-3 h-px bg-gray-200" />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {t(exercise.scaleEndKey)}
        </span>
      </div>

      {/* Sortable items */}
      <div className="space-y-2">
        {order.map((id, idx) => {
          const item = itemMap.get(id);
          if (!item) return null;

          const isSelected = selectedIdx === idx;
          const isWrong = wrongPositions.has(idx);
          const isCorrectChecked = checked && !isWrong;

          let classes =
            "w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

          if (checked) {
            if (isCorrectChecked) {
              classes += " border-green-400 bg-green-50 text-green-800";
            } else {
              classes += " border-red-400 bg-red-50 text-red-800";
            }
          } else if (isSelected) {
            classes +=
              " border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-300 shadow-md -translate-y-0.5";
          } else {
            classes +=
              " border-gray-200 text-gray-700 hover:border-violet-300 hover:bg-violet-50/30 cursor-pointer";
          }

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTap(idx)}
              disabled={checked}
              className={classes}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
                    checked && isCorrectChecked
                      ? "bg-green-500 text-white"
                      : checked && isWrong
                        ? "bg-red-500 text-white"
                        : isSelected
                          ? "bg-violet-500 text-white"
                          : "bg-gray-100 text-gray-500 border border-gray-300"
                  }`}
                >
                  {checked && isCorrectChecked ? (
                    <IconCheck className="w-3.5 h-3.5" />
                  ) : checked && isWrong ? (
                    <IconClose className="w-3.5 h-3.5" />
                  ) : (
                    idx + 1
                  )}
                </span>
                <span className="leading-relaxed">{t(item.labelKey)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        {!checked && (
          <button
            type="button"
            onClick={handleCheck}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span aria-hidden>→</span>
          </button>
        )}

        {checked && !allCorrect && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.orderingReset")}
            <span aria-hidden>↩</span>
          </button>
        )}

        {allCorrect && (
          <button
            type="button"
            onClick={onPass}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span aria-hidden>→</span>
          </button>
        )}
      </div>

      {/* Result */}
      {checked && (
        <div
          className={`mt-4 rounded-xl border p-4 animate-wizard-feedback ${
            allCorrect
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              allCorrect ? "text-green-800" : "text-red-800"
            }`}
          >
            {allCorrect
              ? t("learningBlocks.orderingCorrect")
              : t("learningBlocks.orderingWrong")}
          </p>
        </div>
      )}
    </LearningBlockShell>
  );
}
