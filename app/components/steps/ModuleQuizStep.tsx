"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { getQuizForModule, calculateQuizScore } from "@/app/bootcamp/quizzes";
import { saveQuizAttempt, getQuizAttempts } from "@/app/bootcamp/quiz-progress";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ScoreResult = {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
};

/* ------------------------------------------------------------------ */
/*  Count-up hook                                                      */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (target <= 0) {
      setValue(0);
      return;
    }
    if (started.current) return;
    started.current = true;

    const stepTime = Math.max(Math.floor(duration / target), 16);
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setValue(current);
    }, stepTime);

    return () => clearInterval(interval);
  }, [target, duration]);

  return value;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function ModuleQuizStep({
  moduleSlug,
  onContinue,
}: {
  moduleSlug: string;
  onContinue: () => void;
}) {
  const t = useTranslations("bootcamp");
  const quiz = useMemo(() => getQuizForModule(moduleSlug), [moduleSlug]);
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [attemptCount, setAttemptCount] = useState(() =>
    getQuizAttempts(moduleSlug).length
  );
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set()
  );
  const totalQuestions = quiz?.questions.length ?? 0;
  const isSummary = currentIndex >= totalQuestions;
  const currentQuestion = quiz?.questions[currentIndex] ?? null;

  // Handlers
  const handleSelect = useCallback(
    (optionId: string) => {
      if (revealed || !currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
      setRevealed(true);
    },
    [revealed, currentQuestion]
  );

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    setRevealed(false);

    if (nextIndex >= totalQuestions) {
      // Calculate score and finalize
      const updatedAnswers = { ...answers };
      const scoreResult = calculateQuizScore(moduleSlug, updatedAnswers);
      setResult(scoreResult);
      setAttemptCount((prev) => prev + 1);

      saveQuizAttempt(moduleSlug, {
        answers: updatedAnswers,
        score: scoreResult.score,
        total: scoreResult.total,
        percent: scoreResult.percent,
        passed: scoreResult.passed,
        attemptedAt: new Date().toISOString(),
      });
    }

    setCurrentIndex(nextIndex);
  }, [
    currentIndex,
    totalQuestions,
    answers,
    moduleSlug,
  ]);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setRevealed(false);
    setResult(null);
    setCurrentIndex(0);
    setExpandedQuestions(new Set());
  }, []);

  const toggleExpanded = useCallback((questionId: string) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  }, []);

  if (!quiz) return null;

  /* ---------------------------------------------------------------- */
  /*  Progress Bar                                                     */
  /* ---------------------------------------------------------------- */

  const progressPercent = isSummary
    ? 100
    : ((currentIndex) / totalQuestions) * 100;

  const progressBar = (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">
          {isSummary
            ? t("quizStep.complete")
            : t("quizStep.questionOf", {
                current: currentIndex + 1,
                total: totalQuestions,
              })}
        </span>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          {t("quizStep.attempt", {
            number: attemptCount + (result ? 0 : 1),
          })}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Question Card                                                    */
  /* ---------------------------------------------------------------- */

  if (!isSummary && currentQuestion) {
    const selected = answers[currentQuestion.id];
    const isJudgment = currentQuestion.type === "judgment";
    const isTrueFalse = currentQuestion.type === "true-false";

    return (
      <div className="space-y-4 animate-content-enter">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          {progressBar}

          <div key={currentIndex} className="animate-content-enter">
            {/* Judgment badge */}
            {isJudgment && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
                {t("quizStep.judgmentScenario")}
              </div>
            )}

            {/* Question card */}
            <div
              className={`rounded-xl border p-5 mb-5 ${
                isJudgment
                  ? "border-indigo-200 bg-indigo-50/40"
                  : "border-gray-200 bg-gray-50/30"
              }`}
            >
              <p className="text-base font-medium text-gray-900 leading-relaxed">
                <span className="text-teal-600 font-bold mr-2">
                  {currentIndex + 1}.
                </span>
                {t(currentQuestion.questionKey)}
              </p>
            </div>

            {/* Options */}
            <div
              className={`grid gap-3 ${
                isTrueFalse ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {currentQuestion.options.map((option) => {
                const isSelected = selected === option.id;
                const isOptionCorrect =
                  revealed && option.id === currentQuestion.correctOptionId;
                const isWrongSelection =
                  revealed && isSelected && option.id !== currentQuestion.correctOptionId;

                let optionClasses =
                  "flex items-center gap-3 p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200";

                if (revealed) {
                  if (isOptionCorrect) {
                    optionClasses +=
                      " border-green-400 bg-green-50 text-green-900 shadow-sm shadow-green-100";
                  } else if (isWrongSelection) {
                    optionClasses +=
                      " border-red-400 bg-red-50 text-red-900 shadow-sm shadow-red-100";
                  } else {
                    optionClasses +=
                      " border-gray-200 text-gray-400 opacity-50";
                  }
                  optionClasses += " cursor-default";
                } else if (isSelected) {
                  optionClasses +=
                    " border-teal-400 bg-teal-50 text-teal-900 ring-2 ring-teal-300 shadow-sm";
                } else {
                  optionClasses +=
                    " border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 text-gray-700 cursor-pointer";
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    disabled={revealed}
                    className={optionClasses}
                  >
                    {/* Indicator */}
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 text-xs font-bold transition-all duration-200 ${
                        isOptionCorrect
                          ? "border-green-500 bg-green-500 text-white"
                          : isWrongSelection
                            ? "border-red-500 bg-red-500 text-white"
                            : isSelected
                              ? "border-teal-500 bg-teal-500 text-white"
                              : "border-gray-300"
                      }`}
                    >
                      {isOptionCorrect
                        ? "✓"
                        : isWrongSelection
                          ? "✕"
                          : isSelected
                            ? "●"
                            : ""}
                    </span>
                    <span className="flex-1 text-left">
                      {t(option.labelKey)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation (shown after reveal) */}
            {revealed && currentQuestion.explanationKey && (
              <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4 animate-content-enter">
                <p className="text-sm text-blue-800 leading-relaxed">
                  {t(currentQuestion.explanationKey)}
                </p>
              </div>
            )}

            {/* Next button */}
            {revealed && (
              <div className="mt-6 flex justify-end animate-content-enter">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  {currentIndex < totalQuestions - 1
                    ? t("quizStep.nextQuestion")
                    : t("quizStep.seeResults")}
                  <span aria-hidden>→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Summary Screen                                                   */
  /* ---------------------------------------------------------------- */

  if (isSummary && result) {
    return (
      <SummaryScreen
        quiz={quiz}
        result={result}
        answers={answers}
        expandedQuestions={expandedQuestions}
        toggleExpanded={toggleExpanded}
        onRetry={handleRetry}
        onContinue={onContinue}
        t={t}
        attemptCount={attemptCount}
      />
    );
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  Summary Screen (separated for the count-up hook)                   */
/* ------------------------------------------------------------------ */

function SummaryScreen({
  quiz,
  result,
  answers,
  expandedQuestions,
  toggleExpanded,
  onRetry,
  onContinue,
  t,
  attemptCount,
}: {
  quiz: NonNullable<ReturnType<typeof getQuizForModule>>;
  result: ScoreResult;
  answers: Record<string, string>;
  expandedQuestions: Set<string>;
  toggleExpanded: (id: string) => void;
  onRetry: () => void;
  onContinue: () => void;
  t: ReturnType<typeof useTranslations>;
  attemptCount: number;
}) {
  const displayPercent = useCountUp(result.percent, 1000);

  return (
    <div className="space-y-4 animate-content-enter">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        {/* Progress bar at 100% */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              {t("quizStep.complete")}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              {t("quizStep.attempt", { number: attemptCount })}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500 ease-out"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Score hero */}
        <div
          key="summary"
          className="animate-content-enter text-center py-6"
        >
          <div
            className={`text-7xl sm:text-8xl font-black tabular-nums mb-2 ${
              result.passed ? "text-green-500" : "text-red-500"
            }`}
            aria-label={`${displayPercent}% — ${result.passed ? t("quizStep.passTitle") : t("quizStep.failTitle")}`}
          >
            {displayPercent}%
          </div>
          <p
            className={`text-xl font-bold mb-1 ${
              result.passed ? "text-green-700" : "text-red-700"
            }`}
          >
            {result.passed
              ? t("quizStep.passTitle")
              : t("quizStep.failTitle")}
          </p>
          <p className="text-sm text-gray-500">
            {t("quizStep.scoreLabel", {
              score: result.score,
              total: result.total,
              percent: result.percent,
            })}
          </p>
        </div>

        {/* Question breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            {t("quizStep.breakdown")}
          </h4>
          <div className="space-y-2">
            {quiz.questions.map((question, qIndex) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctOptionId;
              const isExpanded = expandedQuestions.has(question.id);

              return (
                <div
                  key={question.id}
                  className={`rounded-lg border overflow-hidden transition-all ${
                    isCorrect
                      ? "border-green-200 bg-green-50/50"
                      : "border-red-200 bg-red-50/50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpanded(question.id)}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-black/5 transition-colors"
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white shrink-0 ${
                        isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isCorrect ? "✓" : "✕"}
                    </span>
                    <span className="flex-1 text-sm text-gray-800 font-medium truncate">
                      <span className="text-gray-500 mr-1">
                        {qIndex + 1}.
                      </span>
                      {t(question.questionKey)}
                    </span>
                    <span
                      className={`text-gray-400 text-xs transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 animate-content-enter">
                      <div className="ml-9 space-y-2">
                        {/* User's answer */}
                        {!isCorrect && (
                          <div className="text-sm">
                            <span className="text-red-600 font-medium">
                              {t("quizStep.yourAnswer")}:{" "}
                            </span>
                            <span className="text-red-700">
                              {t(
                                question.options.find(
                                  (o) => o.id === userAnswer
                                )?.labelKey ?? ""
                              )}
                            </span>
                          </div>
                        )}
                        {/* Correct answer */}
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">
                            {t("quizStep.correctAnswer")}:{" "}
                          </span>
                          <span className="text-green-700">
                            {t(
                              question.options.find(
                                (o) =>
                                  o.id === question.correctOptionId
                              )?.labelKey ?? ""
                            )}
                          </span>
                        </div>
                        {/* Explanation */}
                        {question.explanationKey && (
                          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 mt-2">
                            <p className="text-xs text-blue-800 leading-relaxed">
                              {t(question.explanationKey)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-4 justify-end">
          {!result.passed && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-teal-700 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
            >
              {t("quizStep.tryAgain")}
            </button>
          )}
          {result.passed && (
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {t("quizStep.continueButton")}
              <span aria-hidden>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
