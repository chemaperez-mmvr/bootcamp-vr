"use client";

import { useState, useCallback } from "react";
import type { MicroCheckClassify } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

export function ClassifyCard({
  check,
  onPass,
  onFail,
  t,
}: {
  check: MicroCheckClassify;
  onPass: () => void;
  onFail: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<
    { itemId: string; chosenCategoryId: string; correct: boolean }[]
  >([]);
  const [showSummary, setShowSummary] = useState(false);
  const [itemFeedback, setItemFeedback] = useState<{
    correct: boolean;
    correctCategoryLabel: string;
  } | null>(null);

  const total = check.items.length;
  const item = check.items[currentIdx];

  const handleClassify = useCallback(
    (categoryId: string) => {
      if (itemFeedback) return;
      const correct = categoryId === item.correctCategoryId;
      const correctCat = check.categories.find(
        (c) => c.id === item.correctCategoryId
      );

      setItemFeedback({
        correct,
        correctCategoryLabel: correctCat ? t(correctCat.labelKey) : "",
      });
      setResults((prev) => [
        ...prev,
        { itemId: item.id, chosenCategoryId: categoryId, correct },
      ]);
    },
    [itemFeedback, item, check.categories, t]
  );

  const handleNext = useCallback(() => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= total) {
      setShowSummary(true);
    } else {
      setCurrentIdx(nextIdx);
      setItemFeedback(null);
    }
  }, [currentIdx, total]);

  const handleFinish = useCallback(() => {
    const wrongCount = results.filter((r) => !r.correct).length;
    if (wrongCount === 0) {
      onPass();
    } else {
      onFail();
    }
  }, [results, onPass, onFail]);

  // Summary view
  if (showSummary) {
    const wrongCount = results.filter((r) => !r.correct).length;
    const allCorrect = wrongCount === 0;

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm animate-content-enter">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-5">
          {t("learningBlocks.classifyTitle")}
        </div>

        {/* Results per item */}
        <div className="space-y-3 mb-5">
          {check.items.map((itm, i) => {
            const result = results[i];
            const correctCat = check.categories.find(
              (c) => c.id === itm.correctCategoryId
            );
            return (
              <div
                key={itm.id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  result?.correct
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                {result?.correct ? (
                  <IconCheck className="w-4 h-4 text-green-600 shrink-0" />
                ) : (
                  <IconClose className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{t(itm.labelKey)}</p>
                  {!result?.correct && correctCat && (
                    <p className="text-xs text-red-600 mt-0.5">
                      {t("learningBlocks.classifyItemWrong", {
                        category: t(correctCat.labelKey),
                      })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary message */}
        <div
          className={`rounded-xl border p-4 mb-5 ${
            allCorrect
              ? "border-green-200 bg-green-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              allCorrect ? "text-green-800" : "text-amber-800"
            }`}
          >
            {allCorrect
              ? t("learningBlocks.classifyCorrect")
              : t("learningBlocks.classifyWrong", {
                  wrong: wrongCount,
                  total,
                })}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleFinish}
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-colors shadow-sm ${
              allCorrect
                ? "text-white bg-teal-600 hover:bg-teal-700"
                : "text-amber-800 bg-amber-100 hover:bg-amber-200"
            }`}
          >
            {allCorrect
              ? t("learningBlocks.continueToNext")
              : t("learningBlocks.microCheckRetry")}
            <span aria-hidden>{allCorrect ? "→" : "↩"}</span>
          </button>
        </div>
      </div>
    );
  }

  if (!item) return null;

  // Classification view — one item at a time
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm animate-content-enter">
      {/* Badge + progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
          {t("learningBlocks.classifyTitle")}
          <span className="ml-1 text-teal-500">
            ({currentIdx + 1}/{total})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {check.items.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIdx
                  ? "bg-teal-500 scale-125"
                  : i < currentIdx
                    ? "bg-teal-300"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Instruction */}
      <p className="text-sm text-gray-600 mb-5">
        {t(check.instructionKey)}
      </p>

      <div key={item.id} className="animate-content-enter">
        {/* Item card */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-5">
          <p className="text-base font-medium text-gray-900 leading-relaxed text-center">
            {t(item.labelKey)}
          </p>
        </div>

        {/* Category buttons */}
        {!itemFeedback && (
          <div className="grid grid-cols-2 gap-3">
            {check.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleClassify(cat.id)}
                className="py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-semibold text-base hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.97]"
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>
        )}

        {/* Item feedback */}
        {itemFeedback && (
          <div className="animate-wizard-feedback">
            <div
              className={`rounded-xl border p-4 flex items-center gap-3 ${
                itemFeedback.correct
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              {itemFeedback.correct ? (
                <IconCheck className="w-5 h-5 text-green-600 shrink-0" />
              ) : (
                <IconClose className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <p
                className={`text-sm font-semibold ${
                  itemFeedback.correct ? "text-green-800" : "text-red-800"
                }`}
              >
                {itemFeedback.correct
                  ? t("learningBlocks.classifyItemCorrect")
                  : t("learningBlocks.classifyItemWrong", {
                      category: itemFeedback.correctCategoryLabel,
                    })}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
              >
                {currentIdx < total - 1
                  ? t("learningBlocks.continueToNext")
                  : t("learningBlocks.continueToCheck")}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
