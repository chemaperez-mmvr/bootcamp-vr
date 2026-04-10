"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { MatchingExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

/* Palette for connection lines & badges — each pair gets a distinct color */
const PAIR_COLORS = [
  { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-300", stroke: "#818cf8", fill: "#e0e7ff" },
  { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", stroke: "#fbbf24", fill: "#fef3c7" },
  { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-300", stroke: "#fb7185", fill: "#ffe4e6" },
  { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300", stroke: "#34d399", fill: "#d1fae5" },
  { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-300", stroke: "#38bdf8", fill: "#e0f2fe" },
  { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300", stroke: "#a78bfa", fill: "#ede9fe" },
];

type Line = { x1: number; y1: number; x2: number; y2: number; colorIdx: number };

export function MatchingCard({
  exercise,
  onPass,
  t,
}: {
  exercise: MatchingExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [wrongPairs, setWrongPairs] = useState<Set<string>>(new Set());

  const [shuffledRight] = useState(() =>
    [...exercise.pairs].sort(() => Math.random() - 0.5)
  );

  /* Refs for SVG line drawing */
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<Line[]>([]);

  const allConnected = Object.keys(connections).length === exercise.pairs.length;

  /* Build an ordered list of connection indices (for consistent coloring) */
  const connectionIndex = useCallback(
    (leftId: string): number => {
      const connectedIds = Object.keys(connections).sort();
      return connectedIds.indexOf(leftId);
    },
    [connections]
  );

  /* Recalculate SVG lines when connections change */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const newLines: Line[] = [];
    const rect = container.getBoundingClientRect();
    const connectedIds = Object.keys(connections).sort();

    for (const leftId of connectedIds) {
      const rightId = connections[leftId];
      const leftEl = leftRefs.current[leftId];
      const rightEl = rightRefs.current[rightId];
      if (!leftEl || !rightEl) continue;

      const lRect = leftEl.getBoundingClientRect();
      const rRect = rightEl.getBoundingClientRect();

      newLines.push({
        x1: lRect.right - rect.left,
        y1: lRect.top + lRect.height / 2 - rect.top,
        x2: rRect.left - rect.left,
        y2: rRect.top + rRect.height / 2 - rect.top,
        colorIdx: connectedIds.indexOf(leftId) % PAIR_COLORS.length,
      });
    }
    setLines(newLines);
  }, [connections, checked]);

  /* Recalculate on resize */
  useEffect(() => {
    const onResize = () => {
      // Trigger recalc
      setConnections((prev) => ({ ...prev }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const connect = useCallback(
    (leftId: string, rightId: string) => {
      const newConnections = { ...connections };
      // Remove any existing connection from this left
      delete newConnections[leftId];
      // Remove any existing connection to this right
      for (const [l, r] of Object.entries(newConnections)) {
        if (r === rightId) delete newConnections[l];
      }
      newConnections[leftId] = rightId;
      setConnections(newConnections);
      setSelectedLeft(null);
      setSelectedRight(null);
    },
    [connections]
  );

  const handleLeftClick = useCallback(
    (pairId: string) => {
      if (checked) return;
      // If a right is already selected, complete the connection
      if (selectedRight) {
        connect(pairId, selectedRight);
        return;
      }
      // Toggle left selection, clear right
      setSelectedRight(null);
      setSelectedLeft((prev) => (prev === pairId ? null : pairId));
    },
    [checked, selectedRight, connect]
  );

  const handleRightClick = useCallback(
    (pairId: string) => {
      if (checked) return;
      // If a left is already selected, complete the connection
      if (selectedLeft) {
        connect(selectedLeft, pairId);
        return;
      }
      // Toggle right selection, clear left
      setSelectedLeft(null);
      setSelectedRight((prev) => (prev === pairId ? null : pairId));
    },
    [checked, selectedLeft, connect]
  );

  const handleCheck = useCallback(() => {
    const wrong = new Set<string>();
    for (const [leftId, rightId] of Object.entries(connections)) {
      if (leftId !== rightId) wrong.add(leftId);
    }
    setWrongPairs(wrong);
    setChecked(true);
  }, [connections]);

  const handleReset = useCallback(() => {
    setConnections({});
    setSelectedLeft(null);
    setSelectedRight(null);
    setChecked(false);
    setWrongPairs(new Set());
  }, []);

  const handleContinue = useCallback(() => {
    if (wrongPairs.size === 0) onPass();
  }, [wrongPairs, onPass]);

  const allCorrect = checked && wrongPairs.size === 0;

  const getLeftForRight = (rightId: string) =>
    Object.entries(connections).find(([, r]) => r === rightId)?.[0];

  /* Color badge for a connected pair */
  const PairBadge = ({ idx }: { idx: number }) => {
    const c = PAIR_COLORS[idx % PAIR_COLORS.length];
    return (
      <span
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 ${c.bg} ${c.text}`}
      >
        {idx + 1}
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
        {t("learningBlocks.matchingTitle")}
      </div>

      {/* Instruction */}
      <p className="text-base font-semibold text-gray-900 mb-1">
        {t(exercise.instructionKey)}
      </p>
      <p className="text-sm text-gray-500 mb-5">
        {t("learningBlocks.matchingInstruction")}
      </p>

      {/* Columns + SVG overlay */}
      <div ref={containerRef} className="relative">
        {/* SVG connector lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: "visible" }}
        >
          {lines.map((line, i) => {
            const c = PAIR_COLORS[line.colorIdx];
            const isWrong =
              checked &&
              wrongPairs.has(
                Object.keys(connections).sort()[line.colorIdx] ?? ""
              );
            const isCorrect = checked && !isWrong;
            const strokeColor = checked
              ? isCorrect
                ? "#22c55e"
                : "#ef4444"
              : c.stroke;

            return (
              <g key={i}>
                {/* Glow/shadow line */}
                <line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={strokeColor}
                  strokeWidth={6}
                  strokeLinecap="round"
                  opacity={0.15}
                />
                {/* Main line */}
                <line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={strokeColor}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray={checked ? "none" : "6 4"}
                  opacity={0.85}
                />
                {/* Endpoint dots */}
                <circle cx={line.x1} cy={line.y1} r={4} fill={strokeColor} opacity={0.7} />
                <circle cx={line.x2} cy={line.y2} r={4} fill={strokeColor} opacity={0.7} />
              </g>
            );
          })}
        </svg>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-3 items-start">
          {/* Left column */}
          <div className="space-y-2.5">
            {exercise.pairs.map((pair) => {
              const isSelected = selectedLeft === pair.id;
              const isConnected = pair.id in connections;
              const idx = connectionIndex(pair.id);
              const isWrong = wrongPairs.has(pair.id);
              const isCorrectChecked = checked && isConnected && !isWrong;
              const isTargetable = selectedRight && !checked;

              let classes =
                "w-full p-3 sm:p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";
              if (checked) {
                if (isCorrectChecked) {
                  classes += " border-green-400 bg-green-50 text-green-800";
                } else if (isWrong) {
                  classes += " border-red-400 bg-red-50 text-red-800";
                } else {
                  classes += " border-gray-200 text-gray-600";
                }
              } else if (isSelected) {
                classes +=
                  " border-indigo-400 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-300 shadow-md scale-[1.02]";
              } else if (isConnected) {
                const c = PAIR_COLORS[idx % PAIR_COLORS.length];
                classes += ` ${c.border} text-gray-800`;
              } else if (isTargetable) {
                classes +=
                  " border-indigo-200 border-dashed text-gray-700 hover:border-indigo-400 hover:bg-indigo-50/40 cursor-pointer hover:scale-[1.02] hover:shadow-sm";
              } else {
                classes +=
                  " border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/40 cursor-pointer";
              }

              return (
                <button
                  key={pair.id}
                  ref={(el) => { leftRefs.current[pair.id] = el; }}
                  type="button"
                  onClick={() => handleLeftClick(pair.id)}
                  disabled={checked}
                  className={classes}
                  style={
                    !checked && isConnected
                      ? { backgroundColor: PAIR_COLORS[idx % PAIR_COLORS.length].fill }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2.5">
                    {checked && isCorrectChecked && (
                      <IconCheck className="w-4 h-4 text-green-600 shrink-0" />
                    )}
                    {checked && isWrong && (
                      <IconClose className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    {!checked && isConnected && <PairBadge idx={idx} />}
                    {!checked && !isConnected && isTargetable && (
                      <span className="w-5 h-5 rounded-full border-2 border-dashed border-indigo-300 shrink-0" />
                    )}
                    <span className="leading-relaxed">{t(pair.leftKey)}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center gutter — visual separator */}
          <div className="flex flex-col items-center justify-center h-full pt-2 pb-2">
            {exercise.pairs.map((_, i) => (
              <div
                key={i}
                className="w-px flex-1 bg-gradient-to-b from-transparent via-gray-200 to-transparent"
              />
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-2.5">
            {shuffledRight.map((pair) => {
              const connectedLeft = getLeftForRight(pair.id);
              const isConnected = Boolean(connectedLeft);
              const idx = connectedLeft ? connectionIndex(connectedLeft) : -1;
              const isSelected = selectedRight === pair.id;
              const isTargetable = selectedLeft && !checked;
              const isWrong = connectedLeft ? wrongPairs.has(connectedLeft) : false;
              const isCorrectChecked = checked && isConnected && !isWrong;

              let classes =
                "w-full p-3 sm:p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";
              if (checked) {
                if (isCorrectChecked) {
                  classes += " border-green-400 bg-green-50 text-green-800";
                } else if (isWrong) {
                  classes += " border-red-400 bg-red-50 text-red-800";
                } else {
                  classes += " border-gray-200 text-gray-600";
                }
              } else if (isSelected) {
                classes +=
                  " border-indigo-400 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-300 shadow-md scale-[1.02]";
              } else if (isConnected) {
                const c = PAIR_COLORS[idx % PAIR_COLORS.length];
                classes += ` ${c.border} text-gray-800`;
              } else if (isTargetable) {
                classes +=
                  " border-indigo-200 border-dashed text-gray-700 hover:border-indigo-400 hover:bg-indigo-50/40 cursor-pointer hover:scale-[1.02] hover:shadow-sm";
              } else {
                classes += " border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/40 cursor-pointer";
              }

              return (
                <button
                  key={pair.id}
                  ref={(el) => { rightRefs.current[pair.id] = el; }}
                  type="button"
                  onClick={() => handleRightClick(pair.id)}
                  disabled={checked}
                  className={classes}
                  style={
                    !checked && isConnected && idx >= 0
                      ? { backgroundColor: PAIR_COLORS[idx % PAIR_COLORS.length].fill }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2.5">
                    {checked && isCorrectChecked && (
                      <IconCheck className="w-4 h-4 text-green-600 shrink-0" />
                    )}
                    {checked && isWrong && (
                      <IconClose className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    {!checked && isConnected && <PairBadge idx={idx} />}
                    {!checked && !isConnected && isTargetable && (
                      <span className="w-5 h-5 rounded-full border-2 border-dashed border-indigo-300 shrink-0" />
                    )}
                    <span className="leading-relaxed">{t(pair.rightKey)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3 animate-content-enter">
        {!checked && Object.keys(connections).length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.matchingClearAll")}
          </button>
        )}

        {!checked && allConnected && (
          <button
            type="button"
            onClick={handleCheck}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span aria-hidden>→</span>
          </button>
        )}

        {checked && !allCorrect && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.matchingReset")}
            <span aria-hidden>↩</span>
          </button>
        )}

        {allCorrect && (
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span aria-hidden>→</span>
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
              ? t("learningBlocks.matchingCorrect")
              : t("learningBlocks.matchingWrong", {
                  wrong: wrongPairs.size,
                  total: exercise.pairs.length,
                })}
          </p>
        </div>
      )}
    </div>
  );
}
