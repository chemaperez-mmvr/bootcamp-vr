"use client";

import { useState, useCallback } from "react";
import type { TriageSortExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

/** Map category color tokens to Tailwind utility classes. */
const COLOR_MAP: Record<
  string,
  { border: string; bg: string; bgActive: string; header: string; chip: string; chipPlaced: string }
> = {
  red: {
    border: "border-red-200",
    bg: "bg-red-50/50",
    bgActive: "bg-red-50 border-red-400 shadow-sm ring-2 ring-red-200",
    header: "text-red-700",
    chip: "bg-red-100 text-red-800 border-red-200",
    chipPlaced: "bg-red-50 text-red-700 border-red-200",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50/50",
    bgActive: "bg-amber-50 border-amber-400 shadow-sm ring-2 ring-amber-200",
    header: "text-amber-700",
    chip: "bg-amber-100 text-amber-800 border-amber-200",
    chipPlaced: "bg-amber-50 text-amber-700 border-amber-200",
  },
  green: {
    border: "border-green-200",
    bg: "bg-green-50/50",
    bgActive: "bg-green-50 border-green-400 shadow-sm ring-2 ring-green-200",
    header: "text-green-700",
    chip: "bg-green-100 text-green-800 border-green-200",
    chipPlaced: "bg-green-50 text-green-700 border-green-200",
  },
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50/50",
    bgActive: "bg-blue-50 border-blue-400 shadow-sm ring-2 ring-blue-200",
    header: "text-blue-700",
    chip: "bg-blue-100 text-blue-800 border-blue-200",
    chipPlaced: "bg-blue-50 text-blue-700 border-blue-200",
  },
  purple: {
    border: "border-purple-200",
    bg: "bg-purple-50/50",
    bgActive: "bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-200",
    header: "text-purple-700",
    chip: "bg-purple-100 text-purple-800 border-purple-200",
    chipPlaced: "bg-purple-50 text-purple-700 border-purple-200",
  },
};

const FALLBACK = COLOR_MAP.blue;
function getColor(color: string) {
  return COLOR_MAP[color] ?? FALLBACK;
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
  const [pool, setPool] = useState<string[]>(() =>
    [...exercise.items].sort(() => Math.random() - 0.5).map((i) => i.id)
  );
  const [assignments, setAssignments] = useState<Record<string, string[]>>(
    () => Object.fromEntries(exercise.categories.map((c) => [c.id, []]))
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [wrongItemIds, setWrongItemIds] = useState<Set<string>>(new Set());

  const itemMap = new Map(exercise.items.map((i) => [i.id, i]));
  const allPlaced = pool.length === 0;
  const allCorrect = checked && wrongItemIds.size === 0;

  const handlePoolTap = useCallback(
    (itemId: string) => {
      if (checked) return;
      setSelectedItemId((prev) => (prev === itemId ? null : itemId));
    },
    [checked]
  );

  const handleCategoryTap = useCallback(
    (categoryId: string) => {
      if (checked || !selectedItemId) return;
      setPool((prev) => prev.filter((id) => id !== selectedItemId));
      setAssignments((prev) => {
        const next: Record<string, string[]> = {};
        for (const [catId, items] of Object.entries(prev)) {
          next[catId] = items.filter((id) => id !== selectedItemId);
        }
        next[categoryId] = [...(next[categoryId] ?? []), selectedItemId];
        return next;
      });
      setSelectedItemId(null);
    },
    [checked, selectedItemId]
  );

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
  }, [assignments, itemMap]);

  const handleRetry = useCallback(() => {
    const wrongArr = Array.from(wrongItemIds);
    setAssignments((prev) => {
      const next: Record<string, string[]> = {};
      for (const [catId, items] of Object.entries(prev)) {
        next[catId] = items.filter((id) => !wrongItemIds.has(id));
      }
      return next;
    });
    setPool((prev) => [...prev, ...wrongArr]);
    setChecked(false);
    setWrongItemIds(new Set());
  }, [wrongItemIds]);

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

      {/* Pool of unsorted items */}
      {pool.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t("learningBlocks.triageSortPool")}
          </p>
          <div className="flex flex-wrap gap-2">
            {pool.map((itemId) => {
              const item = itemMap.get(itemId);
              if (!item) return null;
              const isSelected = selectedItemId === itemId;

              return (
                <button
                  key={itemId}
                  type="button"
                  onClick={() => handlePoolTap(itemId)}
                  disabled={checked}
                  className={`
                    px-3.5 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
                    ${
                      isSelected
                        ? "border-teal-500 bg-teal-50 text-teal-800 shadow-md scale-[1.03]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50/40 cursor-pointer"
                    }
                  `}
                >
                  {t(item.labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hint */}
      {selectedItemId && !checked && (
        <p className="text-sm text-teal-600 font-medium mb-3 animate-content-enter">
          {t("learningBlocks.triageSortSelectCategory")}
        </p>
      )}

      {/* All sorted message */}
      {allPlaced && !checked && (
        <p className="text-sm text-teal-600 font-medium mb-4 text-center">
          {t("learningBlocks.triageSortPoolEmpty")}
        </p>
      )}

      {/* Categories */}
      <div className="space-y-3">
        {exercise.categories.map((category) => {
          const color = getColor(category.color);
          const items = assignments[category.id] ?? [];
          const isTarget = selectedItemId !== null && !checked;

          return (
            <div
              key={category.id}
              role="button"
              tabIndex={isTarget ? 0 : -1}
              onClick={() => handleCategoryTap(category.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCategoryTap(category.id);
                }
              }}
              className={`
                rounded-xl border-2 p-4 transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
                ${
                  isTarget
                    ? `${color.bgActive} cursor-pointer`
                    : `${color.border} ${color.bg}`
                }
              `}
            >
              {/* Category label */}
              <p className={`text-sm font-bold ${color.header} mb-2`}>
                {t(category.labelKey)}
              </p>

              {/* Items in this category */}
              {items.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {items.map((itemId) => {
                    const item = itemMap.get(itemId);
                    if (!item) return null;
                    const isCorrectChecked = checked && !wrongItemIds.has(itemId);
                    const isWrongChecked = checked && wrongItemIds.has(itemId);

                    return (
                      <span
                        key={itemId}
                        role={checked ? undefined : "button"}
                        tabIndex={checked ? undefined : 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!checked) handleCategoryItemTap(itemId, category.id);
                        }}
                        onKeyDown={(e) => {
                          if (!checked && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCategoryItemTap(itemId, category.id);
                          }
                        }}
                        className={`
                          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium
                          transition-all duration-200
                          ${
                            isCorrectChecked
                              ? "border-green-300 bg-green-100 text-green-800"
                              : isWrongChecked
                                ? "border-red-300 bg-red-100 text-red-800 animate-wizard-feedback"
                                : `${color.chipPlaced} hover:opacity-70 cursor-pointer group`
                          }
                        `}
                      >
                        {isCorrectChecked && (
                          <IconCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        )}
                        {isWrongChecked && (
                          <IconClose className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        )}
                        {t(item.labelKey)}
                        {!checked && (
                          <IconClose className="w-3 h-3 text-gray-400 group-hover:text-red-500 ml-0.5 shrink-0" />
                        )}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  {t("learningBlocks.triageSortDropHere")}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        {!checked && allPlaced && (
          <button
            type="button"
            onClick={handleCheck}
            className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.triageSortCheck")}
            <span className="ml-2" aria-hidden>&rarr;</span>
          </button>
        )}

        {checked && !allCorrect && (
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.triageSortRetry")}
          </button>
        )}

        {allCorrect && (
          <button
            type="button"
            onClick={onPass}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span aria-hidden>&rarr;</span>
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
