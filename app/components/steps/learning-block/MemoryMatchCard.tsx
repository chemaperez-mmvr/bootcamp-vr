"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { MemoryMatchExercise } from "@/app/bootcamp/learning-block-types";
import { LearningBlockShell } from "./LearningBlockShell";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type CardData = {
  /** Unique card id (pair id + side) */
  cardId: string;
  /** The pair this card belongs to */
  pairId: string;
  /** Translation key for the text */
  textKey: string;
  /** "term" or "definition" — determines badge and face-up border color */
  side: "term" | "definition";
};

type CardStatus = "faceDown" | "faceUp" | "matched";

/* ------------------------------------------------------------------ */
/*  Keyframes (injected once into <head>)                               */
/* ------------------------------------------------------------------ */

const STYLE_ID = "memory-match-keyframes";

const keyframes = `
@keyframes memory-shake {
  0%, 100% { transform: rotateY(180deg) translateX(0); }
  20%  { transform: rotateY(180deg) translateX(-6px); }
  40%  { transform: rotateY(180deg) translateX(6px); }
  60%  { transform: rotateY(180deg) translateX(-4px); }
  80%  { transform: rotateY(180deg) translateX(4px); }
}
@keyframes memory-match-pop {
  0%   { transform: rotateY(180deg) scale(1); }
  50%  { transform: rotateY(180deg) scale(1.08); }
  100% { transform: rotateY(180deg) scale(1); }
}
`;

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = keyframes;
  document.head.appendChild(style);
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Fisher-Yates shuffle (returns new array). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function MemoryMatchCard({
  exercise,
  onPass,
  t,
}: {
  exercise: MemoryMatchExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  /* Inject keyframes on mount */
  useEffect(() => {
    ensureStyles();
  }, []);

  /* Build shuffled deck once */
  const [cards] = useState<CardData[]>(() => {
    const deck: CardData[] = [];
    for (const pair of exercise.pairs) {
      deck.push({
        cardId: `${pair.id}-term`,
        pairId: pair.id,
        textKey: pair.termKey,
        side: "term",
      });
      deck.push({
        cardId: `${pair.id}-def`,
        pairId: pair.id,
        textKey: pair.definitionKey,
        side: "definition",
      });
    }
    return shuffle(deck);
  });

  const [statuses, setStatuses] = useState<Record<string, CardStatus>>(() => {
    const init: Record<string, CardStatus> = {};
    for (const c of cards) init[c.cardId] = "faceDown";
    return init;
  });

  const [firstFlip, setFirstFlip] = useState<string | null>(null);
  const [secondFlip, setSecondFlip] = useState<string | null>(null);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [shaking, setShaking] = useState<Set<string>>(new Set());
  const [recentMatch, setRecentMatch] = useState<Set<string>>(new Set());
  const [complete, setComplete] = useState(false);

  const lockRef = useRef(false);
  const totalPairs = exercise.pairs.length;

  /* ---------------------------------------------------------------- */
  /*  Handle completion                                                */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (matchedCount === totalPairs && !complete) {
      setComplete(true);
      const timer = setTimeout(() => onPass(), 1200);
      return () => clearTimeout(timer);
    }
  }, [matchedCount, totalPairs, complete, onPass]);

  /* ---------------------------------------------------------------- */
  /*  Flip logic                                                       */
  /* ---------------------------------------------------------------- */

  const handleFlip = useCallback(
    (cardId: string) => {
      if (lockRef.current) return;
      if (statuses[cardId] !== "faceDown") return;
      if (cardId === firstFlip) return;

      /* First card of the pair */
      if (firstFlip === null) {
        setFirstFlip(cardId);
        setStatuses((prev) => ({ ...prev, [cardId]: "faceUp" }));
        return;
      }

      /* Second card — lock further input */
      lockRef.current = true;
      setSecondFlip(cardId);
      setStatuses((prev) => ({ ...prev, [cardId]: "faceUp" }));
      setMoves((m) => m + 1);

      const first = cards.find((c) => c.cardId === firstFlip)!;
      const second = cards.find((c) => c.cardId === cardId)!;

      if (first.pairId === second.pairId) {
        /* Match! */
        setTimeout(() => {
          setStatuses((prev) => ({
            ...prev,
            [firstFlip]: "matched",
            [cardId]: "matched",
          }));
          setRecentMatch(new Set([firstFlip, cardId]));
          setMatchedCount((c) => c + 1);
          setFirstFlip(null);
          setSecondFlip(null);
          lockRef.current = false;

          /* Clear recent-match highlight after animation */
          setTimeout(() => setRecentMatch(new Set()), 600);
        }, 500);
      } else {
        /* No match — shake then flip back */
        setTimeout(() => {
          setShaking(new Set([firstFlip, cardId]));
          setTimeout(() => {
            setStatuses((prev) => ({
              ...prev,
              [firstFlip]: "faceDown",
              [cardId]: "faceDown",
            }));
            setShaking(new Set());
            setFirstFlip(null);
            setSecondFlip(null);
            lockRef.current = false;
          }, 600);
        }, 800);
      }
    },
    [firstFlip, statuses, cards],
  );

  /* ---------------------------------------------------------------- */
  /*  Determine grid rows based on pair count                          */
  /* ---------------------------------------------------------------- */

  const gridRows = cards.length <= 8 ? "grid-rows-2" : "grid-rows-3";

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <LearningBlockShell
      tone="sky"
      badgeLabel={t("learningBlocks.memoryMatchTitle")}
      title={t(exercise.instructionKey)}
      subtitle={t("learningBlocks.memoryMatchMoves", { count: moves })}
    >
      {/* Card grid */}
      <div
        className={`grid grid-cols-4 ${gridRows} gap-2 sm:gap-3`}
        style={{ perspective: "1000px" }}
      >
        {cards.map((card) => {
          const status = statuses[card.cardId];
          const isFlipped = status === "faceUp" || status === "matched";
          const isMatched = status === "matched";
          const isShaking = shaking.has(card.cardId);
          const isRecentMatch = recentMatch.has(card.cardId);

          return (
            <button
              key={card.cardId}
              type="button"
              onClick={() => handleFlip(card.cardId)}
              disabled={isFlipped || complete}
              aria-label={
                isFlipped ? t(card.textKey) : t("learningBlocks.memoryMatchTitle")
              }
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-xl"
              style={{
                perspective: "600px",
                height: "clamp(80px, 12vw, 100px)",
              }}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  animation: isShaking
                    ? "memory-shake 0.4s ease-in-out"
                    : isRecentMatch
                      ? "memory-match-pop 0.4s ease-out"
                      : "none",
                }}
              >
                {/* Back face (face-down) */}
                <div
                  className="absolute inset-0 rounded-xl flex items-center justify-center bg-teal-600 text-white border-2 border-teal-700 cursor-pointer hover:bg-teal-500 transition-colors duration-200"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-2xl font-bold select-none">?</span>
                </div>

                {/* Front face (face-up) */}
                <div
                  className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center p-2 text-center transition-all duration-300
                    ${
                      isMatched
                        ? "bg-green-50 border-2 border-green-400 opacity-80"
                        : card.side === "term"
                          ? "bg-white border-2 border-teal-300"
                          : "bg-white border-2 border-amber-300"
                    }
                  `}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Side badge */}
                  <span
                    className="text-xs leading-none mb-1 select-none"
                    aria-hidden
                  >
                    {card.side === "term" ? "\ud83d\udcdd" : "\ud83d\udca1"}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-medium leading-snug line-clamp-3 ${
                      isMatched ? "text-green-700" : "text-gray-800"
                    }`}
                  >
                    {t(card.textKey)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Completion message */}
      {complete && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-center animate-wizard-feedback">
          <p className="text-sm font-semibold text-green-800">
            {t("learningBlocks.memoryMatchComplete", { moves })}
          </p>
        </div>
      )}

    </LearningBlockShell>
  );
}
