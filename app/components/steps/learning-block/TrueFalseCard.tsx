"use client";

import { useState, useCallback } from "react";
import type { MicroCheckTrueFalse } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

export function TrueFalseCard({
  check,
  onPass,
  onFail,
  t,
}: {
  check: MicroCheckTrueFalse;
  onPass: () => void;
  onFail: () => void;
  t: (key: string, values?: Record<string, unknown>) => string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(0);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    explanation: string;
  } | null>(null);

  const total = check.statements.length;
  const statement = check.statements[currentIdx];

  const handleAnswer = useCallback(
    (answeredTrue: boolean) => {
      if (feedback) return; // already answered
      const isCorrect = answeredTrue === statement.isTrue;
      setFeedback({
        correct: isCorrect,
        explanation: t(statement.explanationKey),
      });
      if (isCorrect) {
        setAnsweredCorrectly((prev) => prev + 1);
      }
    },
    [feedback, statement, t]
  );

  const handleNext = useCallback(() => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= total) {
      // All statements done — pass only if all were correct.
      // answeredCorrectly already includes this answer (setState batched before re-render).
      // But to be safe, compute from feedback:
      const totalCorrect = answeredCorrectly;
      if (totalCorrect === total) {
        onPass();
      } else {
        onFail();
      }
    } else {
      setCurrentIdx(nextIdx);
      setFeedback(null);
    }
  }, [currentIdx, total, answeredCorrectly, onPass, onFail]);

  if (!statement) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm animate-content-enter">
      {/* Badge + progress */}
      <div className="flex items-center justify-between mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
          {t("learningBlocks.trueFalseTitle")}
        </div>
        <div className="flex items-center gap-1.5">
          {check.statements.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIdx
                  ? "bg-violet-500 scale-125"
                  : i < currentIdx
                    ? "bg-violet-300"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Statement */}
      <div
        key={statement.id}
        className="animate-content-enter"
      >
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-6">
          <p className="text-base font-medium text-gray-900 leading-relaxed text-center">
            &ldquo;{t(statement.statementKey)}&rdquo;
          </p>
        </div>

        {/* Buttons */}
        {!feedback && (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleAnswer(true)}
              className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-green-200 bg-green-50/50 text-green-700 font-semibold text-base hover:border-green-400 hover:bg-green-100 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.97]"
            >
              <IconCheck className="w-5 h-5" />
              {t("learningBlocks.trueFalseTrue")}
            </button>
            <button
              type="button"
              onClick={() => handleAnswer(false)}
              className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-red-200 bg-red-50/50 text-red-700 font-semibold text-base hover:border-red-400 hover:bg-red-100 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.97]"
            >
              <IconClose className="w-5 h-5" />
              {t("learningBlocks.trueFalseFalse")}
            </button>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="animate-wizard-feedback">
            <div
              className={`rounded-xl border p-4 ${
                feedback.correct
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start gap-2">
                {feedback.correct ? (
                  <IconCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <IconClose className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p
                    className={`text-sm font-semibold mb-1 ${
                      feedback.correct ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {feedback.correct
                      ? t("learningBlocks.trueFalseCorrect")
                      : t("learningBlocks.trueFalseWrong")}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${
                      feedback.correct ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {feedback.explanation}
                  </p>
                </div>
              </div>
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
