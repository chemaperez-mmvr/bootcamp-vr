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
  t: (key: string, values?: Record<string, string | number | Date>) => string;
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
      if (feedback) return;
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
      if (answeredCorrectly < total) onFail();
      onPass();
    } else {
      setCurrentIdx(nextIdx);
      setFeedback(null);
    }
  }, [currentIdx, total, answeredCorrectly, onPass, onFail]);

  if (!statement) return null;

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-slate-50 shadow-sm animate-content-enter overflow-hidden">
      {/* Subtle top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400" />

      <div className="p-6 sm:p-8">
        {/* Header row: label + progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-500">
            {t("learningBlocks.trueFalseTitle")}
          </span>
          <span className="text-xs font-medium text-slate-500 tabular-nums">
            {currentIdx + 1} <span className="text-slate-300">/</span> {total}
          </span>
        </div>

        {/* Statement — editorial quote */}
        <div key={statement.id} className="animate-content-enter">
          {statement.imageUrl && (
            <div className="relative w-full max-w-xl mx-auto mb-6 rounded-xl overflow-hidden border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={statement.imageUrl}
                alt=""
                className="w-full h-auto"
              />
            </div>
          )}
          <div className="relative px-2 sm:px-4 py-2 mb-8">
            <span
              aria-hidden
              className="absolute -left-1 -top-2 text-5xl font-serif text-teal-300/70 leading-none select-none"
            >
              &ldquo;
            </span>
            <p className="pl-6 pr-2 text-lg sm:text-xl font-serif text-slate-800 leading-snug italic">
              {t(statement.statementKey)}
            </p>
          </div>

          {/* Answer prompt + pill buttons */}
          {!feedback && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 text-center">
                {t("learningBlocks.trueFalsePrompt")}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleAnswer(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {t("learningBlocks.trueFalseTrue")}
                </button>
                <span className="text-xs text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => handleAnswer(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {t("learningBlocks.trueFalseFalse")}
                </button>
              </div>
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
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
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
    </div>
  );
}
