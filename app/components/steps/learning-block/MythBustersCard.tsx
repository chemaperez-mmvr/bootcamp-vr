"use client";

import { useState, useCallback, useMemo } from "react";
import type { MythBustersExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

type AnswerRecord = { statementId: string; correct: boolean };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MythBustersCard({
  exercise,
  onPass,
  t,
}: {
  exercise: MythBustersExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  /* Shuffled order of statements — reset on retry */
  const [order, setOrder] = useState(() =>
    shuffle(exercise.statements)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    explanation: string;
    answeredFact: boolean;
  } | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const total = order.length;
  const statement = order[currentIdx];

  const correctCount = useMemo(
    () => answers.filter((a) => a.correct).length,
    [answers]
  );

  /* ---- Handle Myth / Fact choice ---- */
  const handleChoice = useCallback(
    (choseFact: boolean) => {
      if (feedback) return;
      const isCorrect = choseFact === statement.isTrue;
      setFeedback({
        correct: isCorrect,
        explanation: t(statement.explanationKey),
        answeredFact: choseFact,
      });
      setAnswers((prev) => [
        ...prev,
        { statementId: statement.id, correct: isCorrect },
      ]);
    },
    [feedback, statement, t]
  );

  /* ---- Advance to next or summary ---- */
  const handleNext = useCallback(() => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= total) {
      setShowSummary(true);
    } else {
      setCurrentIdx(nextIdx);
      setFeedback(null);
    }
  }, [currentIdx, total]);

  /* ---- Retry: reshuffle and reset ---- */
  const handleRetry = useCallback(() => {
    setOrder(shuffle(exercise.statements));
    setCurrentIdx(0);
    setAnswers([]);
    setFeedback(null);
    setShowSummary(false);
  }, [exercise.statements]);

  /* ================================================================== */
  /*  Summary screen                                                     */
  /* ================================================================== */
  if (showSummary) {
    const allCorrect = correctCount === total;

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-4">
          {t("learningBlocks.mythBustersTitle")}
        </div>

        {/* Score */}
        <div className="text-center py-4">
          <p className="text-4xl font-bold text-gray-900 mb-1">
            {correctCount} / {total}
          </p>
          <p className="text-sm text-gray-500">
            {t("learningBlocks.mythBustersScore", { correct: correctCount, total })}
          </p>
        </div>

        {/* Per-statement results */}
        <div className="space-y-2 mb-6">
          {order.map((st, i) => {
            const ans = answers[i];
            return (
              <div
                key={st.id}
                className={`flex items-start gap-2.5 rounded-xl border p-3 transition-colors ${
                  ans?.correct
                    ? "border-green-200 bg-green-50/60"
                    : "border-red-200 bg-red-50/60"
                }`}
              >
                {ans?.correct ? (
                  <IconCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <IconClose className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-relaxed">
                    {t(st.statementKey)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {st.isTrue
                      ? t("learningBlocks.mythBustersFact")
                      : t("learningBlocks.mythBustersMythLabel")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action */}
        <div className="flex justify-end gap-3">
          {allCorrect ? (
            <button
              type="button"
              onClick={onPass}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {t("learningBlocks.exerciseDone")}
              <span aria-hidden>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {t("learningBlocks.mythBustersTryAgain")}
              <span aria-hidden>↩</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ================================================================== */
  /*  Statement card                                                     */
  /* ================================================================== */
  if (!statement) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Badge + progress */}
      <div className="flex items-center justify-between mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
          {t("learningBlocks.mythBustersTitle")}
        </div>
        <div className="text-xs font-medium text-gray-400 tabular-nums">
          {currentIdx + 1} / {total}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mb-5">
        {order.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < currentIdx
                ? answers[i]?.correct
                  ? "bg-green-400"
                  : "bg-red-400"
                : i === currentIdx
                  ? "bg-teal-500"
                  : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Instruction */}
      <p className="text-sm text-gray-500 mb-4">
        {t(exercise.instructionKey)}
      </p>

      {/* Statement — animated per card */}
      <div key={statement.id} className="animate-content-enter">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-6">
          <p className="text-base font-medium text-gray-900 leading-relaxed text-center">
            &ldquo;{t(statement.statementKey)}&rdquo;
          </p>
        </div>

        {/* Myth / Fact buttons */}
        {!feedback && (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChoice(false)}
              className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-red-200 bg-red-50/50 text-red-700 font-semibold text-sm sm:text-base hover:border-red-400 hover:bg-red-100 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              <IconClose className="w-5 h-5" />
              {t("learningBlocks.mythBustersMythLabel")}
            </button>
            <button
              type="button"
              onClick={() => handleChoice(true)}
              className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-green-200 bg-green-50/50 text-green-700 font-semibold text-sm sm:text-base hover:border-green-400 hover:bg-green-100 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              <IconCheck className="w-5 h-5" />
              {t("learningBlocks.mythBustersFact")}
            </button>
          </div>
        )}

        {/* Feedback reveal */}
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
                      ? t("learningBlocks.mythBustersCorrect")
                      : t("learningBlocks.mythBustersWrong")}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {statement.isTrue
                      ? t("learningBlocks.mythBustersFact")
                      : t("learningBlocks.mythBustersMythLabel")}
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
                  : t("learningBlocks.mythBustersViewResults")}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
