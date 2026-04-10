"use client";

import { useState, useCallback } from "react";
import type { TriageSortExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

/** Map category color tokens to Tailwind utility classes. */
const COLOR_MAP: Record<
  string,
  { header: string; border: string; bg: string; pill: string; text: string }
> = {
  red: {
    header: "bg-red-100 border-red-300 text-red-800",
    border: "border-red-300",
    bg: "bg-red-50",
    pill: "bg-red-100 text-red-700 border-red-200",
    text: "text-red-700",
  },
  amber: {
    header: "bg-amber-100 border-amber-300 text-amber-800",
    border: "border-amber-300",
    bg: "bg-amber-50",
    pill: "bg-amber-100 text-amber-700 border-amber-200",
    text: "text-amber-700",
  },
  green: {
    header: "bg-green-100 border-green-300 text-green-800",
    border: "border-green-300",
    bg: "bg-green-50",
    pill: "bg-green-100 text-green-700 border-green-200",
    text: "text-green-700",
  },
  blue: {
    header: "bg-blue-100 border-blue-300 text-blue-800",
    border: "border-blue-300",
    bg: "bg-blue-50",
    pill: "bg-blue-100 text-blue-700 border-blue-200",
    text: "text-blue-700",
  },
  purple: {
    header: "bg-purple-100 border-purple-300 text-purple-800",
    border: "border-purple-300",
    bg: "bg-purple-50",
    pill: "bg-purple-100 text-purple-700 border-purple-200",
    text: "text-purple-700",
  },
};

const FALLBACK_COLOR = COLOR_MAP.blue;

function getColor(color: string) {
  return COLOR_MAP[color] ?? FALLBACK_COLOR;
}

export function TriageSortCard({
  exercise,
  onPass,
  t,
}: {
  exercise: TriageSortExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  // Items that haven't been placed yet
  const [pool, setPool] = useState<string[]>(() =>
    [...exercise.items].sort(() => Math.random() - 0.5).map((i) => i.id)
  );
  // Category assignments: categoryId -> itemId[]
  const [assignments, setAssignments] = useState<Record<string, string[]>>(
    () => Object.fromEntries(exercise.categories.map((c) => [c.id, []]))
  );
  // Currently selected item (tap-to-place)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  // Check results
  const [checked, setChecked] = useState(false);
  const [wrongItemIds, setWrongItemIds] = useState<Set<string>>(new Set());

  const itemMap = new Map(exercise.items.map((i) => [i.id, i]));
  const allPlaced = pool.length === 0;
  const allCorrect = checked && wrongItemIds.size === 0;

  /** Tap an item in the pool — select it. */
  const handlePoolTap = useCallback(
    (itemId: string) => {
      if (checked) return;
      setSelectedItemId((prev) => (prev === itemId ? null : itemId));
    },
    [checked]
  );

  /** Tap a category — place the selected item there. */
  const handleCategoryTap = useCallback(
    (categoryId: string) => {
      if (checked || !selectedItemId) return;

      // Remove from pool if it's there
      setPool((prev) => prev.filter((id) => id !== selectedItemId));

      // Remove from any other category
      setAssignments((prev) => {
        const next: Record<string, string[]> = {};
        for (const [catId, items] of Object.entries(prev)) {
          next[catId] = items.filter((id) => id !== selectedItemId);
        }
        // Add to target category
        next[categoryId] = [...(next[categoryId] ?? []), selectedItemId];
        return next;
      });

      setSelectedItemId(null);
    },
    [checked, selectedItemId]
  );

  /** Tap an item inside a category — move it back to pool. */
  const handleCategoryItemTap = useCallback(
    (itemId: string, categoryId: string) => {
      if (checked) return;

      setAssignments((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId].filter((id) => id !== itemId),
      }));
      setPool((prev) => [...prev, itemId]);
      setSelectedItemId(null);
    },
    [checked]
  );

  /** Check all placements. */
  const handleCheck = useCallback(() => {
    const wrong = new Set<string>();

    for (const [categoryId, itemIds] of Object.entries(assignments)) {
      for (const itemId of itemIds) {
        const item = itemMap.get(itemId);
        if (item && item.correctCategoryId !== categoryId) {
          wrong.add(itemId);
        }
      }
    }

    setWrongItemIds(wrong);
    setChecked(true);

    // Move wrong items back to pool after a brief delay so animation plays
    if (wrong.size > 0) {
      setTimeout(() => {
        setAssignments((prev) => {
          const next: Record<string, string[]> = {};
          for (const [catId, items] of Object.entries(prev)) {
            next[catId] = items.filter((id) => !wrong.has(id));
          }
          return next;
        });
        setPool((prev) => [...prev, ...Array.from(wrong)]);
        setChecked(false);
        setWrongItemIds(new Set());
      }, 1800);
    }
  }, [assignments, itemMap]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-4">
        {t("learningBlocks.triageSortTitle")}
      </div>

      {/* Instruction */}
      <p className="text-base font-semibold text-gray-900 mb-2">
        {t(exercise.instructionKey)}
      </p>
      <p className="text-sm text-gray-500 mb-5">
        {t("learningBlocks.triageSortInstruction")}
      </p>

      {/* Unsorted pool */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          {t("learningBlocks.triageSortPool")}
        </p>
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[56px]">
          {pool.length === 0 && !checked && (
            <p className="text-sm text-gray-400 text-center py-1">
              {t("learningBlocks.triageSortPoolEmpty")}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {pool.map((itemId) => {
              const item = itemMap.get(itemId);
              if (!item) return null;
              const isSelected = selectedItemId === itemId;
              const isWrong = wrongItemIds.has(itemId);

              return (
                <button
                  key={itemId}
                  type="button"
                  onClick={() => handlePoolTap(itemId)}
                  disabled={checked}
                  className={`px-3.5 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                    isWrong
                      ? "border-red-400 bg-red-50 text-red-800 animate-wizard-feedback"
                      : isSelected
                        ? "ring-2 ring-teal-400 shadow-md scale-[1.05] border-teal-400 bg-teal-50 text-teal-800"
                        : "border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50/40 cursor-pointer hover:shadow-sm"
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category columns */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${exercise.categories.length}, minmax(0, 1fr))`,
        }}
      >
        {exercise.categories.map((category) => {
          const color = getColor(category.color);
          const items = assignments[category.id] ?? [];
          const isTargetable = selectedItemId !== null && !checked;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryTap(category.id)}
              disabled={!isTargetable}
              className={`rounded-xl border-2 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                color.border
              } ${
                isTargetable
                  ? `${color.bg} shadow-sm hover:shadow-md hover:scale-[1.01] cursor-pointer`
                  : color.bg
              }`}
            >
              {/* Category header */}
              <div
                className={`px-3 py-2 rounded-t-[10px] border-b ${color.header}`}
              >
                <p className="text-xs sm:text-sm font-bold text-center">
                  {t(category.labelKey)}
                </p>
              </div>

              {/* Placed items */}
              <div className="p-3 min-h-[64px]">
                {items.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-2">
                    {t("learningBlocks.triageSortDropHere")}
                  </p>
                )}
                <div className="flex flex-col gap-1.5">
                  {items.map((itemId) => {
                    const item = itemMap.get(itemId);
                    if (!item) return null;
                    const isCorrectChecked =
                      checked && !wrongItemIds.has(itemId);
                    const isWrongChecked = checked && wrongItemIds.has(itemId);

                    return (
                      <span
                        key={itemId}
                        role="button"
                        tabIndex={checked ? -1 : 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!checked) handleCategoryItemTap(itemId, category.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!checked)
                              handleCategoryItemTap(itemId, category.id);
                          }
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${
                          isCorrectChecked
                            ? "border-green-300 bg-green-100 text-green-800"
                            : isWrongChecked
                              ? "border-red-300 bg-red-100 text-red-800 animate-wizard-feedback"
                              : `${color.pill} hover:opacity-80 cursor-pointer`
                        }`}
                      >
                        {isCorrectChecked && (
                          <IconCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        )}
                        {isWrongChecked && (
                          <IconClose className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        )}
                        {t(item.labelKey)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        {!checked && allPlaced && !allCorrect && (
          <button
            type="button"
            onClick={handleCheck}
            className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.triageSortCheck")}
            <span className="ml-2" aria-hidden>
              &rarr;
            </span>
          </button>
        )}

        {allCorrect && (
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
        )}
      </div>

      {/* Result feedback */}
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
              ? t("learningBlocks.triageSortCorrect")
              : t("learningBlocks.triageSortWrong", {
                  wrong: wrongItemIds.size,
                  total: exercise.items.length,
                })}
          </p>
        </div>
      )}
    </div>
  );
}
