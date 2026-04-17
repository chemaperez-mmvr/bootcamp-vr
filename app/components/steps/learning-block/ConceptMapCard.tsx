"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import type { ConceptMapExercise } from "@/app/bootcamp/learning-block-types";

type ConnectionKey = string;
const connKey = (a: string, b: string) => [a, b].sort().join("--");

export function ConceptMapCard({
  exercise,
  onPass,
  t,
}: {
  exercise: ConceptMapExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [firstTap, setFirstTap] = useState<string | null>(null);
  const [wrongTap, setWrongTap] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [drawn, setDrawn] = useState<Set<ConnectionKey>>(new Set());
  /* Track the most recently drawn connection for one-shot "draw" animation */
  const [justDrawn, setJustDrawn] = useState<ConnectionKey | null>(null);
  /* Track the most recently tapped node for a pop animation */
  const [popNode, setPopNode] = useState<string | null>(null);
  /* Track the most recent correctly-drawn connection to show an explanation pop */
  const [lastExplained, setLastExplained] = useState<{
    fromId: string;
    toId: string;
    labelKey?: string;
    stamp: number;
  } | null>(null);
  /* Track the most recent incorrect attempt with a specific reason */
  const [lastWrongExplained, setLastWrongExplained] = useState<{
    fromId: string;
    toId: string;
    reasonKey?: string;
    stamp: number;
  } | null>(null);
  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number; labelKey?: string; fromId: string; toId: string }[]
  >([]);

  const total = exercise.validConnections.length;
  const validSet = useMemo(
    () => new Set(exercise.validConnections.map((c) => connKey(c.fromId, c.toId))),
    [exercise.validConnections]
  );
  const done = drawn.size >= total;

  const getNode = useCallback(
    (id: string) => exercise.nodes.find((n) => n.id === id),
    [exercise.nodes]
  );

  /* Recalc lines */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const next: typeof lines = [];
    for (const conn of exercise.validConnections) {
      const fromEl = nodeRefs.current[conn.fromId];
      const toEl = nodeRefs.current[conn.toId];
      if (!fromEl || !toEl) continue;
      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();
      next.push({
        x1: fr.left + fr.width / 2 - cRect.left,
        y1: fr.top + fr.height / 2 - cRect.top,
        x2: tr.left + tr.width / 2 - cRect.left,
        y2: tr.top + tr.height / 2 - cRect.top,
        labelKey: conn.labelKey,
        fromId: conn.fromId,
        toId: conn.toId,
      });
    }
    setLines(next);
  }, [exercise.validConnections, drawn]);

  useEffect(() => {
    const onResize = () => setDrawn((s) => new Set(s));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Handle a node being tapped — user connects two nodes to form a relationship. */
  const handleTap = useCallback(
    (nodeId: string) => {
      if (done) return;

      /* First tap: any node is allowed. Store as the start of the connection. */
      if (!firstTap) {
        setFirstTap(nodeId);
        setWrongTap(null);
        setPopNode(nodeId);
        setTimeout(() => setPopNode((p) => (p === nodeId ? null : p)), 400);
        return;
      }

      /* Tapping the same node deselects */
      if (nodeId === firstTap) {
        setFirstTap(null);
        return;
      }

      /* Second tap — evaluate the connection against any valid, not-yet-drawn pair */
      const attempted = connKey(firstTap, nodeId);

      if (validSet.has(attempted) && !drawn.has(attempted)) {
        /* Correct connection */
        setDrawn((prev) => {
          const next = new Set(prev);
          next.add(attempted);
          return next;
        });
        setJustDrawn(attempted);
        setPopNode(nodeId);
        const conn = exercise.validConnections.find(
          (c) => connKey(c.fromId, c.toId) === attempted
        );
        if (conn) {
          setLastExplained({
            fromId: conn.fromId,
            toId: conn.toId,
            labelKey: conn.labelKey,
            stamp: Date.now(),
          });
          setLastWrongExplained(null);
        }
        setTimeout(() => setPopNode((p) => (p === nodeId ? null : p)), 400);
        setTimeout(() => setJustDrawn((k) => (k === attempted ? null : k)), 1500);
        setFirstTap(null);
        setWrongTap(null);
      } else if (drawn.has(attempted)) {
        /* Already drawn — silently deselect */
        setFirstTap(null);
      } else {
        /* Wrong — flash both nodes, show specific reason, then deselect */
        setWrongTap(nodeId);
        const invalid = exercise.invalidExplanations?.find(
          (e) => connKey(e.fromId, e.toId) === attempted
        );
        setLastWrongExplained({
          fromId: firstTap,
          toId: nodeId,
          reasonKey: invalid?.reasonKey,
          stamp: Date.now(),
        });
        setTimeout(() => {
          setWrongTap((prev) => (prev === nodeId ? null : prev));
          setFirstTap(null);
        }, 600);
      }
    },
    [done, firstTap, validSet, drawn, exercise.validConnections, exercise.invalidExplanations]
  );

  /* Canvas height */
  const canvasHeight = 360;

  const isFirstSelected = (id: string) => firstTap === id;
  const isWrong = (id: string) => wrongTap === id;

  /* Shared midY offset — all hierarchical siblings share the same trunk bar
     so the lines look like a single organizational-chart split, not a fan. */
  const midYOffsetByConn: Record<string, number> = useMemo(() => ({}), []);

  /* Dedupe labels per (fromId, labelKey) — keep only the one with toNode closest vertically to fromNode */
  const labelIndices = useMemo(() => {
    const groups: Record<string, number[]> = {};
    exercise.validConnections.forEach((c, i) => {
      if (!c.labelKey) return;
      const key = `${c.fromId}::${c.labelKey}`;
      (groups[key] = groups[key] || []).push(i);
    });
    const set = new Set<number>();
    for (const indices of Object.values(groups)) {
      if (indices.length === 1) { set.add(indices[0]); continue; }
      const fromNode = exercise.nodes.find(
        (n) => n.id === exercise.validConnections[indices[0]].fromId
      );
      if (!fromNode) continue;
      let best = indices[0];
      let bestDist = Infinity;
      for (const idx of indices) {
        const toNode = exercise.nodes.find(
          (n) => n.id === exercise.validConnections[idx].toId
        );
        const d = toNode ? Math.abs(toNode.x - fromNode.x) : Infinity;
        if (d < bestDist) { bestDist = d; best = idx; }
      }
      set.add(best);
    }
    return set;
  }, [exercise.validConnections, exercise.nodes]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Badge + progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
          {t("learningBlocks.conceptMapTitle")}
        </div>
        <span className="text-xs font-medium text-gray-500 tabular-nums">
          {drawn.size} <span className="text-gray-300">/</span> {total}
        </span>
      </div>

      {/* Instruction */}
      <p className="text-base font-semibold text-gray-900 mb-4">
        {t(exercise.instructionKey)}
      </p>

      {/* Tree canvas — all nodes visible, connections appear as steps complete */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl border border-gray-100 bg-gradient-to-b from-gray-50/50 to-white overflow-hidden mb-5"
        style={{ height: canvasHeight }}
      >
        {/* Preview of the flow between firstTap and hoveredNode — follows the skeleton path if one exists */}
        {firstTap && hoveredNode && hoveredNode !== firstTap && containerRef.current && (() => {
          /* Match against the existing skeleton lines so we reuse the exact same path */
          const matchingLine = lines.find(
            (l) =>
              (l.fromId === firstTap && l.toId === hoveredNode) ||
              (l.fromId === hoveredNode && l.toId === firstTap)
          );

          let pathD: string;
          if (matchingLine) {
            const fromNode = getNode(matchingLine.fromId);
            const toNode = getNode(matchingLine.toId);
            const sameLevel =
              fromNode && toNode && Math.abs(fromNode.y - toNode.y) < 0.1;
            if (sameLevel) {
              pathD = `M ${matchingLine.x1} ${matchingLine.y1} L ${matchingLine.x2} ${matchingLine.y2}`;
            } else {
              const offset = midYOffsetByConn[connKey(matchingLine.fromId, matchingLine.toId)] ?? 0;
              const midY = (matchingLine.y1 + matchingLine.y2) / 2 + offset;
              pathD = `M ${matchingLine.x1} ${matchingLine.y1} L ${matchingLine.x1} ${midY} L ${matchingLine.x2} ${midY} L ${matchingLine.x2} ${matchingLine.y2}`;
            }
          } else {
            /* No pre-drawn line for this pair — fall back to straight line between centers */
            const fromEl = nodeRefs.current[firstTap];
            const toEl = nodeRefs.current[hoveredNode];
            if (!fromEl || !toEl) return null;
            const cRect = containerRef.current.getBoundingClientRect();
            const fr = fromEl.getBoundingClientRect();
            const tr = toEl.getBoundingClientRect();
            const x1 = fr.left + fr.width / 2 - cRect.left;
            const y1 = fr.top + fr.height / 2 - cRect.top;
            const x2 = tr.left + tr.width / 2 - cRect.left;
            const y2 = tr.top + tr.height / 2 - cRect.top;
            pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
          }

          return (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]" style={{ overflow: "visible" }}>
              <path
                d={pathD}
                fill="none"
                stroke="#14b8a6"
                strokeWidth={3}
                strokeDasharray="10 6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.9}
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="0.7s" repeatCount="indefinite" />
              </path>
            </svg>
          );
        })()}

        {/* SVG lines — skeleton (dashed) for undrawn, solid teal for drawn */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          {lines.map((line, i) => {
            const key = connKey(line.fromId, line.toId);
            const isDrawn = drawn.has(key);
            if (!isDrawn) return null;
            const fromNode = getNode(line.fromId);
            const toNode = getNode(line.toId);
            const sameLevel = fromNode && toNode && Math.abs(fromNode.y - toNode.y) < 0.1;

            const stroke = "#14b8a6";
            const width = 3;
            const dash = "none";
            const opacity = 0.95;

            let pathD: string;
            let labelX: number;
            let labelY: number;

            if (sameLevel) {
              /* Lateral extends — straight line between same-level nodes */
              pathD = `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`;
              labelX = (line.x1 + line.x2) / 2;
              labelY = (line.y1 + line.y2) / 2 - 6;
            } else {
              /* Hierarchical — orthogonal L, staggered midY so siblings don't overlap */
              const offset = midYOffsetByConn[key] ?? 0;
              const midY = (line.y1 + line.y2) / 2 + offset;
              pathD = `M ${line.x1} ${line.y1} L ${line.x1} ${midY} L ${line.x2} ${midY} L ${line.x2} ${line.y2}`;
              labelX = (line.x1 + line.x2) / 2;
              labelY = midY - 6;
              /* If the child is directly below the parent (vertical line) the
                 label would sit on top of the stroke — nudge it sideways. */
              if (Math.abs(line.x1 - line.x2) < 1) {
                labelX = line.x1 + 32;
              }
            }

            const isPreview = false; /* Free preview is rendered separately below */

            const isJustDrawn = justDrawn === key;

            return (
              <g key={i}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={isPreview ? "#14b8a6" : stroke}
                  strokeWidth={isPreview ? 3 : width}
                  strokeDasharray={
                    isJustDrawn ? undefined : isPreview ? "10 6" : dash
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={isPreview ? 0.9 : opacity}
                  className={isJustDrawn ? "animate-concept-line-draw" : undefined}
                  style={isJustDrawn ? ({ ["--len" as string]: "500" } as React.CSSProperties) : undefined}
                >
                  {isPreview && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-32"
                      dur="0.7s"
                      repeatCount="indefinite"
                    />
                  )}
                </path>
                {isDrawn && line.labelKey && labelIndices.has(i) && (
                  <text
                    x={labelX}
                    y={labelY + 4}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={700}
                    fill="#0f766e"
                    stroke="white"
                    strokeWidth={4}
                    paintOrder="stroke"
                    className={isJustDrawn ? "animate-concept-label" : undefined}
                    style={{ strokeLinejoin: "round", transformOrigin: `${labelX}px ${labelY}px` }}
                  >
                    {t(line.labelKey)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes always visible */}
        {exercise.nodes.map((node) => {
          const wrong = isWrong(node.id);
          const first = isFirstSelected(node.id);
          const isInDrawn = Array.from(drawn).some((k) => k.split("--").includes(node.id));
          return (
            <button
              key={node.id}
              ref={(el) => { nodeRefs.current[node.id] = el; }}
              type="button"
              onClick={() => handleTap(node.id)}
              onPointerEnter={() => setHoveredNode(node.id)}
              onPointerLeave={() => setHoveredNode((prev) => (prev === node.id ? null : prev))}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 inline-flex flex-col items-center gap-0.5 px-3.5 py-2 rounded-xl border-2 shadow-sm transition-all max-w-[11rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                wrong
                  ? "border-red-500 bg-red-50 text-red-900 animate-pulse"
                  : first
                    ? "border-teal-500 bg-teal-100 text-teal-900 ring-2 ring-teal-300 scale-[1.05]"
                    : isInDrawn
                      ? "border-teal-400 bg-teal-50 text-teal-900 hover:bg-teal-100 cursor-pointer"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
              } ${popNode === node.id ? "animate-concept-node-pop" : ""}`}
              style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}
            >
              <span className="text-sm font-semibold text-center leading-tight">
                {t(node.labelKey)}
              </span>
              {node.descriptionKey && isInDrawn && (
                <span
                  key={`${node.id}-desc`}
                  className="text-[12px] sm:text-[13px] text-gray-700 leading-snug text-center mt-0.5 animate-concept-description-pop"
                  style={{ opacity: 0 }}
                >
                  {t(node.descriptionKey)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Free-exploration prompt — success explanation, error reason, or default hint */}
      {!done && (() => {
        const showExplanation = lastExplained && !firstTap && !lastWrongExplained;
        const explainedFrom = showExplanation ? getNode(lastExplained!.fromId) : null;
        const explainedTo = showExplanation ? getNode(lastExplained!.toId) : null;
        const showWrong = lastWrongExplained && !firstTap;
        const wrongFrom = showWrong ? getNode(lastWrongExplained!.fromId) : null;
        const wrongTo = showWrong ? getNode(lastWrongExplained!.toId) : null;

        const containerClasses = showWrong
          ? "relative rounded-xl border border-red-200 bg-red-50/50 overflow-hidden p-5 mb-2"
          : "relative rounded-xl border border-teal-200 bg-teal-50/40 overflow-hidden p-5 mb-2";

        return (
          <div className={containerClasses}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {showWrong && wrongFrom && wrongTo ? (
                  <div
                    key={lastWrongExplained!.stamp}
                    className="animate-concept-explanation-pop"
                    style={{ opacity: 0 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-red-700 mb-2">
                      Conexión incorrecta
                    </p>
                    <p className="text-base sm:text-lg text-gray-900 leading-snug">
                      <span className="font-bold">{t(wrongFrom.labelKey)}</span>{" "}
                      <span className="text-red-700 font-bold">no se relaciona con</span>{" "}
                      <span className="font-bold">{t(wrongTo.labelKey)}</span>.
                    </p>
                    {lastWrongExplained!.reasonKey && (
                      <p className="text-xs sm:text-sm text-gray-700 italic mt-2 leading-relaxed">
                        {t(lastWrongExplained!.reasonKey)}
                      </p>
                    )}
                  </div>
                ) : showExplanation && explainedFrom && explainedTo ? (
                  <div
                    key={lastExplained!.stamp}
                    className="animate-concept-explanation-pop"
                    style={{ opacity: 0 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-teal-700 mb-2">
                      Nueva conexión
                    </p>
                    <p className="text-base sm:text-lg text-gray-900 leading-snug">
                      <span className="font-bold">{t(explainedFrom.labelKey)}</span>{" "}
                      <span className="font-bold text-teal-700">
                        {lastExplained!.labelKey ? t(lastExplained!.labelKey) : ""}
                      </span>{" "}
                      a <span className="font-bold">{t(explainedTo.labelKey)}</span>.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                      {firstTap
                        ? `Ahora toca otro concepto para conectarlo con ${t(getNode(firstTap)!.labelKey)}`
                        : "Toca dos conceptos para descubrir su relación"}
                    </p>
                    <p className="text-xs text-teal-700 mt-2 flex items-center gap-1.5">
                      <span aria-hidden>🔗</span>
                      Orden libre — encuentra las {total} conexiones en cualquier orden
                    </p>
                  </>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${showWrong ? "text-red-700" : "text-teal-700"}`}>
                  Descubiertas
                </p>
                <p className={`text-3xl font-black tabular-nums leading-none mt-1 ${showWrong ? "text-red-700" : "text-teal-700"}`}>
                  {drawn.size}
                  <span className="text-gray-300 text-xl font-bold"> / {total}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Success — kinetic reveal */}
      {done && (
        <div className="relative rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white overflow-hidden p-6 mt-2">
          <p
            className="animate-concept-success text-2xl sm:text-3xl font-black text-teal-700 leading-tight mb-2"
            style={{ opacity: 0 }}
          >
            Has construido
            <br />
            la taxonomía XR.
          </p>
          <p className="text-sm text-gray-600 mb-5">
            {t("learningBlocks.conceptMapSuccess")}
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onPass}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {t("learningBlocks.exerciseDone")}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

