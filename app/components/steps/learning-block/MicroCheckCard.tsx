"use client";

import { useState } from "react";
import type {
  MicroCheckQuestion,
  MicroCheckClassic,
  MicroCheckTrueFalse,
  MicroCheckClassify,
} from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose, IconLightbulb } from "@/app/components/icons";
import { TrueFalseCard } from "./TrueFalseCard";
import { ClassifyCard } from "./ClassifyCard";

/* ------------------------------------------------------------------ */
/*  Dispatcher                                                          */
/* ------------------------------------------------------------------ */

export function MicroCheckCard({
  questions,
  onPass,
  onFail,
  t,
}: {
  questions: MicroCheckQuestion[];
  onPass: () => void;
  onFail: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  // New-style: single typed micro-check
  const first = questions[0];
  if (!first) return null;

  if ("type" in first) {
    switch (first.type) {
      case "trueFalse":
        return (
          <TrueFalseCard
            check={first}
            onPass={onPass}
            onFail={onFail}
            t={t}
          />
        );
      case "classify":
        return (
          <ClassifyCard
            check={first}
            onPass={onPass}
            onFail={onFail}
            t={t}
          />
        );
      case "classic":
        return (
          <ClassicMicroCheckCard
            questions={questions as MicroCheckClassic[]}
            onPass={onPass}
            onFail={onFail}
            t={t}
          />
        );
    }
  }

  // Legacy: untyped questions (no "type" field) — treat as classic
  return (
    <ClassicMicroCheckCard
      questions={questions as MicroCheckClassic[]}
      onPass={onPass}
      onFail={onFail}
      t={t}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Classic multiple-choice (original implementation)                   */
/* ------------------------------------------------------------------ */

function ClassicMicroCheckCard({
  questions,
  onPass,
  onFail,
  t,
}: {
  questions: MicroCheckClassic[];
  onPass: () => void;
  onFail: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = questions[currentQ];
  if (!question) return null;

  const handleSelect = (optionId: string) => {
    if (revealed) return;
    setSelectedId(optionId);
    setRevealed(true);
    setIsCorrect(optionId === question.correctOptionId);
  };

  const handleNext = () => {
    if (!isCorrect) {
      onFail(); // track retry count
    }

    const nextQ = currentQ + 1;
    if (nextQ >= questions.length) {
      onPass(); // always continue
    } else {
      setCurrentQ(nextQ);
      setSelectedId(null);
      setRevealed(false);
      setIsCorrect(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-4">
        {t("learningBlocks.microCheckTitle")}
        {questions.length > 1 && (
          <span className="ml-1 text-teal-500">
            ({currentQ + 1}/{questions.length})
          </span>
        )}
      </div>

      <div key={question.id} className="animate-content-enter">
        <p className="text-base font-medium text-gray-900 leading-relaxed mb-5">
          {t(question.questionKey)}
        </p>

        <div className="grid gap-3">
          {question.options.map((option) => {
            const isSelected = selectedId === option.id;
            const isOptionCorrect =
              revealed && option.id === question.correctOptionId;
            const isWrongSelection =
              revealed && isSelected && option.id !== question.correctOptionId;

            let optionClasses =
              "flex items-center gap-3 p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

            if (revealed) {
              if (isOptionCorrect) {
                optionClasses +=
                  " border-green-400 bg-green-50 text-green-900 shadow-sm shadow-green-100";
              } else if (isWrongSelection) {
                optionClasses +=
                  " border-red-400 bg-red-50 text-red-900 shadow-sm shadow-red-100";
              } else {
                optionClasses += " border-gray-200 text-gray-400 opacity-50";
              }
              optionClasses += " cursor-default";
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
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 text-xs font-bold transition-all duration-200 ${
                    isOptionCorrect
                      ? "border-green-500 bg-green-500 text-white"
                      : isWrongSelection
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-gray-300"
                  }`}
                >
                  {isOptionCorrect
                    ? "✓"
                    : isWrongSelection
                      ? "✕"
                      : ""}
                </span>
                <span className="flex-1 text-left">{t(option.labelKey)}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-4 animate-content-enter">
            {isCorrect ? (
              <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                <div className="flex gap-2">
                  <IconCheck className="w-4 h-4 text-green-600 shrink-0" />
                  <p className="text-sm font-semibold text-green-800">
                    {t("learningBlocks.microCheckCorrect")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                  <div className="flex gap-2">
                    <IconClose className="w-4 h-4 text-red-600 shrink-0" />
                    <p className="text-sm font-semibold text-red-800">
                      {t("learningBlocks.microCheckWrong")}
                    </p>
                  </div>
                </div>
                {question.explanationKey && (
                  <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                    <div className="flex gap-2">
                      <IconLightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800 leading-relaxed">
                        {t(question.explanationKey)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                {currentQ < questions.length - 1
                  ? t("learningBlocks.continueToCheck")
                  : t("learningBlocks.continueToNext")}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
