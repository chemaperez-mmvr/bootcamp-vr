"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import type { FillGapsExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

type BlankState = {
  blankId: string;
  placedWord: string | null;
};

export function FillGapsCard({
  exercise,
  onPass,
  t,
}: {
  exercise: FillGapsExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  /* Build word bank: correct words + distractors, shuffled once */
  const allWords = useMemo(() => {
    const words = [
      ...exercise.blanks.map((b) => t(b.correctWordKey)),
      ...exercise.distractorKeys.map((k) => t(k)),
    ];
    return words.sort(() => Math.random() - 0.5);
  }, [exercise.blanks, exercise.distractorKeys, t]);

  /* Parse template into segments: text | blank placeholder */
  const segments = useMemo(() => {
    const template = t(exercise.templateKey);
    const parts = template.split(/(__[^_]+__)/);
    return parts.map((part) => {
      const match = part.match(/^__(.+)__$/);
      if (match) {
        return { type: "blank" as const, blankId: match[1] };
      }
      return { type: "text" as const, text: part };
    });
  }, [exercise.templateKey, t]);

  /* Blank states */
  const [blanks, setBlanks] = useState<BlankState[]>(() =>
    exercise.blanks.map((b) => ({ blankId: b.id, placedWord: null }))
  );
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  /* Drag state */
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [hoveredBlank, setHoveredBlank] = useState<string | null>(null);
  const dragGhostRef = useRef<HTMLDivElement>(null);

  /* Words currently placed in blanks */
  const placedWords = useMemo(
    () => new Set(blanks.map((b) => b.placedWord).filter(Boolean)),
    [blanks]
  );

  /* Available words in the bank */
  const bankWords = useMemo(
    () => allWords.filter((w) => !placedWords.has(w)),
    [allWords, placedWords]
  );

  const allFilled = blanks.every((b) => b.placedWord !== null);

  /* ---- Drag handlers ---- */

  const handleDragStart = useCallback(
    (e: React.DragEvent, word: string) => {
      if (checked) return;
      setDraggedWord(word);
      setSelectedWord(null);

      /* Custom ghost */
      if (dragGhostRef.current) {
        dragGhostRef.current.textContent = word;
        e.dataTransfer.setDragImage(dragGhostRef.current, 40, 16);
      }
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", word);
    },
    [checked]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedWord(null);
    setHoveredBlank(null);
  }, []);

  const handleDragOverBlank = useCallback(
    (e: React.DragEvent, blankId: string) => {
      if (checked) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setHoveredBlank(blankId);
    },
    [checked]
  );

  const handleDragLeaveBlank = useCallback(() => {
    setHoveredBlank(null);
  }, []);

  const handleDropOnBlank = useCallback(
    (e: React.DragEvent, blankId: string) => {
      e.preventDefault();
      if (checked) return;
      const word = e.dataTransfer.getData("text/plain") || draggedWord;
      if (!word) return;

      setBlanks((prev) => {
        const idx = prev.findIndex((b) => b.blankId === blankId);
        if (idx === -1) return prev;
        /* If blank already has a word, swap it back to bank */
        const next = [...prev];
        next[idx] = { ...next[idx], placedWord: word };
        return next;
      });

      setDraggedWord(null);
      setHoveredBlank(null);
      setSelectedWord(null);
    },
    [checked, draggedWord]
  );

  /* ---- Tap handlers (fallback for mobile) ---- */

  const handleWordTap = useCallback(
    (word: string) => {
      if (checked) return;
      setSelectedWord((prev) => (prev === word ? null : word));
    },
    [checked]
  );

  const handleBlankTap = useCallback(
    (blankId: string) => {
      if (checked) return;

      setBlanks((prev) => {
        const idx = prev.findIndex((b) => b.blankId === blankId);
        if (idx === -1) return prev;
        const current = prev[idx];

        /* If blank is filled, remove the word back to bank */
        if (current.placedWord !== null) {
          const next = [...prev];
          next[idx] = { ...current, placedWord: null };
          return next;
        }

        /* If a word is selected, place it */
        if (selectedWord) {
          const next = [...prev];
          next[idx] = { ...current, placedWord: selectedWord };
          return next;
        }

        return prev;
      });

      if (selectedWord) {
        setSelectedWord(null);
      }
    },
    [checked, selectedWord]
  );

  /* ---- Check answers ---- */
  const handleCheck = useCallback(() => {
    const correctMap = new Map(
      exercise.blanks.map((b) => [b.id, t(b.correctWordKey)])
    );
    const newResults: Record<string, boolean> = {};
    const wrongBlanks: string[] = [];

    for (const blank of blanks) {
      const correct = correctMap.get(blank.blankId) === blank.placedWord;
      newResults[blank.blankId] = correct;
      if (!correct) wrongBlanks.push(blank.blankId);
    }

    setResults(newResults);
    setChecked(true);

    if (wrongBlanks.length > 0) {
      setTimeout(() => {
        setBlanks((prev) =>
          prev.map((b) =>
            wrongBlanks.includes(b.blankId)
              ? { ...b, placedWord: null }
              : b
          )
        );
      }, 1200);
    }

    if (wrongBlanks.length === 0) {
      onPass();
    }
  }, [blanks, exercise.blanks, t, onPass]);

  /* Reset for retry */
  const handleRetry = useCallback(() => {
    setBlanks(exercise.blanks.map((b) => ({ blankId: b.id, placedWord: null })));
    setSelectedWord(null);
    setChecked(false);
    setResults({});
  }, [exercise.blanks]);

  const allCorrect = checked && Object.values(results).every(Boolean);
  const hasWrong = checked && !allCorrect;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Hidden drag ghost */}
      <div
        ref={dragGhostRef}
        className="fixed -left-[9999px] px-3 py-1.5 rounded-full bg-teal-600 text-white text-sm font-semibold shadow-lg"
        aria-hidden
      />

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-4">
        {t("learningBlocks.fillGapsTitle")}
      </div>

      {/* Instruction */}
      <p className="text-base font-semibold text-gray-900 mb-1">
        {t(exercise.instructionKey)}
      </p>
      <p className="text-sm text-gray-500 mb-5">
        {t("learningBlocks.fillGapsInstruction")}
      </p>

      {/* Template with inline blanks */}
      <div className="text-base leading-[2.5] text-gray-800 mb-6">
        {segments.map((seg, i) => {
          if (seg.type === "text") {
            return <span key={i}>{seg.text}</span>;
          }

          const blank = blanks.find((b) => b.blankId === seg.blankId);
          if (!blank) return null;

          const isFilled = blank.placedWord !== null;
          const isCorrect = results[blank.blankId] === true;
          const isWrong = results[blank.blankId] === false;
          const isHovered = hoveredBlank === blank.blankId && draggedWord !== null;
          const isEmptyAndWordSelected = !isFilled && selectedWord !== null;

          let slotClasses =
            "inline-flex items-center justify-center min-w-[90px] px-3 py-1 mx-1 align-baseline rounded-lg transition-all duration-200 border-2";

          if (checked && isCorrect) {
            slotClasses +=
              " border-green-500 bg-green-50 text-green-800 font-semibold";
          } else if (checked && isWrong) {
            slotClasses +=
              " border-red-500 bg-red-50 text-red-800 font-semibold animate-[shake_0.3s_ease-in-out]";
          } else if (isHovered) {
            slotClasses +=
              " border-teal-500 bg-teal-100 text-teal-600 shadow-md scale-105 ring-2 ring-teal-300";
          } else if (isFilled) {
            slotClasses +=
              " border-teal-400 bg-teal-50 text-teal-800 font-semibold cursor-pointer hover:border-red-300 hover:bg-red-50/50";
          } else if (isEmptyAndWordSelected) {
            slotClasses +=
              " border-teal-400 border-dashed bg-teal-50/50 text-teal-500 cursor-pointer hover:bg-teal-100 hover:border-teal-500 hover:shadow-md hover:scale-105";
          } else {
            slotClasses +=
              " border-dashed border-gray-300 text-gray-400 cursor-pointer hover:border-gray-400 hover:bg-gray-50";
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleBlankTap(blank.blankId)}
              onDragOver={(e) => handleDragOverBlank(e, blank.blankId)}
              onDragLeave={handleDragLeaveBlank}
              onDrop={(e) => handleDropOnBlank(e, blank.blankId)}
              disabled={checked}
              className={slotClasses}
              aria-label={
                isFilled
                  ? blank.placedWord!
                  : t("learningBlocks.fillGapsEmptyBlank")
              }
            >
              {isFilled ? (
                <span className="flex items-center gap-1.5">
                  {checked && isCorrect && (
                    <IconCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  )}
                  {checked && isWrong && (
                    <IconClose className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  )}
                  {blank.placedWord}
                </span>
              ) : isHovered ? (
                <span className="text-sm font-medium text-teal-600">{draggedWord}</span>
              ) : isEmptyAndWordSelected ? (
                <span className="text-xs text-teal-500 animate-pulse">
                  {t("learningBlocks.triageSortDropHere")}
                </span>
              ) : (
                <span className="text-sm text-gray-300">{"_ _ _"}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Word bank */}
      {!allCorrect && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t("learningBlocks.fillGapsWordBank")}
          </p>
          <div className="flex flex-wrap gap-2">
            {bankWords.map((word, i) => {
              const isSelected = selectedWord === word;
              const isDragging = draggedWord === word;

              let chipClasses =
                "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-grab active:cursor-grabbing select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

              if (isDragging) {
                chipClasses +=
                  " opacity-40 scale-95 border-teal-400 bg-teal-50 text-teal-800";
              } else if (isSelected) {
                chipClasses +=
                  " ring-2 ring-teal-400 bg-teal-100 border-teal-400 text-teal-800 shadow-md scale-105";
              } else {
                chipClasses +=
                  " border-gray-300 bg-white text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:shadow-sm hover:scale-[1.02]";
              }

              return (
                <button
                  key={`${word}-${i}`}
                  type="button"
                  draggable={!checked}
                  onClick={() => handleWordTap(word)}
                  onDragStart={(e) => handleDragStart(e, word)}
                  onDragEnd={handleDragEnd}
                  disabled={checked}
                  className={chipClasses}
                >
                  {word}
                </button>
              );
            })}

            {bankWords.length === 0 && !checked && (
              <p className="text-sm text-gray-400 italic">
                {t("learningBlocks.fillGapsAllPlaced")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!checked && allFilled && (
          <button
            type="button"
            onClick={handleCheck}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span aria-hidden>&rarr;</span>
          </button>
        )}

        {hasWrong && (
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.fillGapsRetry")}
            <span aria-hidden>&larr;</span>
          </button>
        )}
      </div>

      {/* Result message */}
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
              ? t("learningBlocks.fillGapsCorrect")
              : t("learningBlocks.fillGapsWrong")}
          </p>
        </div>
      )}
    </div>
  );
}
