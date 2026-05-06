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

  useEffect(() => {
    if (target <= 0) {
      setValue(0);
      return;
    }
    setValue(0);

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
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
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

  // Cooldown ref to prevent ghost clicks on options after question transition
  const cooldownRef = useRef(false);

  // Handlers
  const handleSelect = useCallback(
    (optionId: string) => {
      if (revealed || !currentQuestion || cooldownRef.current) return;
      setPendingSelection(optionId);
    },
    [revealed, currentQuestion]
  );

  const handleCheck = useCallback(() => {
    if (revealed || !currentQuestion || !pendingSelection) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: pendingSelection }));
    setRevealed(true);
  }, [revealed, currentQuestion, pendingSelection]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    setRevealed(false);
    setPendingSelection(null);

    // Block option clicks during question transition to prevent accidental selections
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 600);

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
    setPendingSelection(null);
    setRevealed(false);
    setResult(null);
    setCurrentIndex(0);
    setExpandedQuestions(new Set());
    // Block option clicks during transition back to first question
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 600);
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
    <div className="mb-4">
      <div className="flex items-end justify-between gap-4 mb-2">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-3xl sm:text-4xl font-black text-teal-600 tabular-nums leading-none">
            {isSummary ? "✓" : String(currentIndex + 1).padStart(2, "0")}
          </span>
          {!isSummary && (
            <span className="text-base font-bold text-gray-300 tabular-nums leading-none">
              / {String(totalQuestions).padStart(2, "0")}
            </span>
          )}
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full shrink-0">
          {t("quizStep.attempt", {
            number: attemptCount + (result ? 0 : 1),
          })}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Question Card                                                    */
  /* ---------------------------------------------------------------- */

  if (!isSummary && currentQuestion) {
    const submitted = answers[currentQuestion.id];
    const activeSelection = revealed ? submitted : pendingSelection;
    const isJudgment = currentQuestion.type === "judgment";
    const isTrueFalse = currentQuestion.type === "true-false";
    const isCorrectAnswer = revealed && submitted === currentQuestion.correctOptionId;

    return (
      <div className="space-y-6 animate-content-enter">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          {progressBar}

          <div key={currentIndex} className={`animate-content-enter ${currentQuestion.imageUrl ? "grid gap-4 sm:grid-cols-[minmax(0,360px)_minmax(0,1fr)]" : ""}`}>
            {/* Optional illustration — on the left, spans full right-column height */}
            {currentQuestion.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 min-h-[180px] sm:relative sm:self-stretch sm:min-h-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentQuestion.imageUrl}
                  alt={currentQuestion.imageAltKey ? t(currentQuestion.imageAltKey) : ""}
                  className="w-full block sm:absolute sm:inset-0 sm:h-full sm:object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className={currentQuestion.imageUrl ? "min-w-0" : ""}>
            {/* Question block — separated with left border accent */}
            <div
              className={`relative rounded-xl border border-l-4 px-4 py-3 sm:py-3.5 mb-3 ${
                isJudgment
                  ? "border-indigo-200 border-l-indigo-500 bg-indigo-50/40"
                  : "border-teal-200 border-l-teal-500 bg-teal-50/30"
              }`}
            >
              {isJudgment && (
                <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5">
                  {t("quizStep.judgmentScenario")}
                </div>
              )}
              <p className="text-sm sm:text-base font-semibold text-gray-900 leading-snug whitespace-pre-line">
                {t(currentQuestion.questionKey)}
              </p>
            </div>

            {/* Options */}
            <div
              className={`grid gap-2 ${
                isTrueFalse ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {currentQuestion.options.map((option, idx) => {
                const isSelected = activeSelection === option.id;
                const isOptionCorrect =
                  revealed && option.id === currentQuestion.correctOptionId;
                const isWrongSelection =
                  revealed && submitted === option.id && option.id !== currentQuestion.correctOptionId;

                const letter = isTrueFalse
                  ? option.id === "true" ? "V" : "F"
                  : String.fromCharCode(65 + idx);

                let wrapperClasses =
                  "group relative flex items-center gap-3 px-3 py-2 rounded-xl border-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";
                let pillClasses =
                  "flex items-center justify-center h-8 w-8 shrink-0 rounded-md text-sm font-black transition-all duration-200";

                if (revealed) {
                  if (isOptionCorrect) {
                    wrapperClasses += " border-green-400 bg-green-50 shadow-sm shadow-green-100";
                    pillClasses += " bg-green-500 text-white";
                  } else if (isWrongSelection) {
                    wrapperClasses += " border-red-400 bg-red-50 shadow-sm shadow-red-100";
                    pillClasses += " bg-red-500 text-white";
                  } else {
                    wrapperClasses += " border-gray-200 opacity-50";
                    pillClasses += " bg-gray-100 text-gray-400";
                  }
                  wrapperClasses += " cursor-default";
                } else if (isSelected) {
                  wrapperClasses += " border-teal-500 bg-teal-50 shadow-md scale-[1.015] cursor-pointer";
                  pillClasses += " bg-teal-600 text-white";
                } else {
                  wrapperClasses += " border-gray-200 hover:border-teal-300 hover:bg-teal-50/40 hover:shadow-sm cursor-pointer";
                  pillClasses += " bg-gray-100 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-700";
                }

                const pillContent = isOptionCorrect ? "✓" : isWrongSelection ? "✕" : letter;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    disabled={revealed}
                    className={wrapperClasses}
                  >
                    <span className={pillClasses}>{pillContent}</span>
                    <span className="flex-1 text-sm font-medium text-gray-800 leading-snug">
                      {t(option.labelKey)}
                    </span>
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div
                className={`mt-3 rounded-xl border-l-4 px-4 py-3 animate-content-enter ${
                  isCorrectAnswer
                    ? "border-green-200 border-l-green-500 bg-green-50/60"
                    : "border-red-200 border-l-red-500 bg-red-50/60"
                }`}
              >
                <p className={`text-[10px] uppercase tracking-[0.18em] font-bold mb-1 ${
                  isCorrectAnswer ? "text-green-700" : "text-red-700"
                }`}>
                  {isCorrectAnswer ? t("quizStep.correct") : t("quizStep.incorrect")}
                </p>
                {currentQuestion.explanationKey && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t(currentQuestion.explanationKey)}
                  </p>
                )}
              </div>
            )}

            {/* CTA — Comprobar (phase 1) → Siguiente (phase 2) */}
            <div className="mt-3 flex justify-end">
              {!revealed ? (
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={!pendingSelection}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                    pendingSelection
                      ? "text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 hover:shadow-lg active:scale-[0.98]"
                      : "text-gray-400 bg-gray-100 cursor-not-allowed shadow-none"
                  }`}
                >
                  {t("quizStep.check")}
                  <span aria-hidden>→</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {currentIndex < totalQuestions - 1
                    ? t("quizStep.nextQuestion")
                    : t("quizStep.seeResults")}
                  <span aria-hidden>→</span>
                </button>
              )}
            </div>
            </div>
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
  const { passed } = result;
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - displayPercent / 100);
  const ringColor = passed ? "#10b981" : "#f59e0b"; // emerald / amber (no red — less punitive)

  return (
    <div className="space-y-6 animate-content-enter">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-teal-700 mb-1">
              {t("quizStep.complete")}
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {passed ? t("quizStep.passTitle") : t("quizStep.failTitle")}
            </h3>
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full shrink-0">
            {t("quizStep.attempt", { number: attemptCount })}
          </span>
        </div>

        {/* Hero — donut score + stats */}
        <div className="grid gap-6 sm:grid-cols-[auto,1fr] sm:items-center mb-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-5 sm:p-6">
          {/* Donut */}
          <div className="relative w-[156px] h-[156px] mx-auto sm:mx-0 shrink-0">
            <svg width="156" height="156" viewBox="0 0 156 156" className="-rotate-90">
              <circle
                cx="78"
                cy="78"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              <circle
                cx="78"
                cy="78"
                r={radius}
                fill="none"
                stroke={ringColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 0.2s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-4xl sm:text-5xl font-black tabular-nums leading-none"
                style={{ color: ringColor }}
              >
                {displayPercent}
                <span className="text-xl">%</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400 mt-1">
                {t("quizStep.scoreOnly")}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatTile
              label={t("quizStep.correct")}
              value={`${result.score}/${result.total}`}
              accent="teal"
            />
            <StatTile
              label={t("quizStep.attemptShort")}
              value={String(attemptCount)}
              accent="gray"
            />
            <StatTile
              label={t("quizStep.passMark")}
              value="70%"
              accent="gray"
            />
          </div>
        </div>

        {/* Breakdown */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <h4 className="text-base font-bold text-gray-900">
              {t("quizStep.breakdown")}
            </h4>
            <p className="text-xs text-gray-500">
              {t("quizStep.breakdownHint")}
            </p>
          </div>
          <div className="space-y-2">
            {quiz.questions.map((question, qIndex) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctOptionId;
              const isExpanded = expandedQuestions.has(question.id);

              return (
                <div
                  key={question.id}
                  className={`rounded-xl border overflow-hidden transition-all ${
                    isCorrect
                      ? "border-green-200 bg-green-50/40"
                      : "border-amber-200 bg-amber-50/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpanded(question.id)}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-black/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  >
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black text-white shrink-0 ${
                        isCorrect ? "bg-green-500" : "bg-amber-500"
                      }`}
                    >
                      {isCorrect ? "✓" : "✕"}
                    </span>
                    <span className="flex-1 text-sm sm:text-base text-gray-800 font-medium truncate">
                      <span className="text-gray-400 mr-2 tabular-nums">
                        {String(qIndex + 1).padStart(2, "0")}
                      </span>
                      {t(question.questionKey)}
                    </span>
                    <span
                      className={`text-gray-400 text-xs transition-transform duration-200 shrink-0 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-3 sm:px-4 pb-4 animate-content-enter">
                      <div className="ml-11 space-y-2">
                        {!isCorrect && (
                          <div className="text-sm">
                            <span className="text-amber-700 font-semibold">
                              {t("quizStep.yourAnswer")}:{" "}
                            </span>
                            <span className="text-gray-700">
                              {t(
                                question.options.find(
                                  (o) => o.id === userAnswer
                                )?.labelKey ?? ""
                              )}
                            </span>
                          </div>
                        )}
                        <div className="text-sm">
                          <span className="text-green-700 font-semibold">
                            {t("quizStep.correctAnswer")}:{" "}
                          </span>
                          <span className="text-gray-700">
                            {t(
                              question.options.find(
                                (o) => o.id === question.correctOptionId
                              )?.labelKey ?? ""
                            )}
                          </span>
                        </div>
                        {question.explanationKey && (
                          <div className="rounded-lg bg-white border border-gray-200 p-3 mt-2">
                            <p className="text-xs text-gray-600 leading-relaxed italic">
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

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 justify-end pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("quizStep.tryAgain")}
          </button>
          {passed && (
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
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

function StatTile({ label, value, accent }: { label: string; value: string; accent: "teal" | "gray" }) {
  const valueColor = accent === "teal" ? "text-teal-700" : "text-gray-800";
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
      <p className={`text-xl sm:text-2xl font-black tabular-nums leading-none ${valueColor}`}>
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-gray-500 mt-1.5 leading-tight">
        {label}
      </p>
    </div>
  );
}
