"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ConceptMapExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck } from "@/app/components/icons";

const COLORS = ["#818cf8", "#fbbf24", "#fb7185", "#34d399", "#38bdf8", "#a78bfa"];

type Connection = { fromId: string; toId: string };

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colorIdx: number;
  fromId: string;
  toId: string;
};

function connectionsEqual(a: Connection, b: Connection) {
  return (
    (a.fromId === b.fromId && a.toId === b.toId) ||
    (a.fromId === b.toId && a.toId === b.fromId)
  );
}

function connectionKey(c: Connection) {
  return [c.fromId, c.toId].sort().join("--");
}

export function ConceptMapCard({
  exercise,
  onPass,
  t,
}: {
  exercise: ConceptMapExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [verified, setVerified] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [passed, setPassed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<Line[]>([]);

  const totalRequired = exercise.validConnections.length;

  /* Check if a connection already exists */
  const findConnection = useCallback(
    (fromId: string, toId: string) =>
      connections.find((c) => connectionsEqual(c, { fromId, toId })),
    [connections]
  );

  /* Recalculate SVG lines when connections change */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newLines: Line[] = [];

    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      const fromEl = nodeRefs.current[conn.fromId];
      const toEl = nodeRefs.current[conn.toId];
      if (!fromEl || !toEl) continue;

      const fRect = fromEl.getBoundingClientRect();
      const tRect = toEl.getBoundingClientRect();

      newLines.push({
        x1: fRect.left + fRect.width / 2 - rect.left,
        y1: fRect.top + fRect.height / 2 - rect.top,
        x2: tRect.left + tRect.width / 2 - rect.left,
        y2: tRect.top + tRect.height / 2 - rect.top,
        colorIdx: i % COLORS.length,
        fromId: conn.fromId,
        toId: conn.toId,
      });
    }
    setLines(newLines);
  }, [connections, verified, wrong]);

  /* Recalculate on resize */
  useEffect(() => {
    const onResize = () => {
      setConnections((prev) => [...prev]);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Node tap handler */
  const handleNodeClick = useCallback(
    (nodeId: string) => {
      if (passed) return;

      if (selectedNode === null) {
        setSelectedNode(nodeId);
        return;
      }

      if (selectedNode === nodeId) {
        setSelectedNode(null);
        return;
      }

      /* Check if this connection already exists */
      const existing = findConnection(selectedNode, nodeId);
      if (existing) {
        /* Deselect if tapping into an already-connected node */
        setSelectedNode(null);
        return;
      }

      /* Create new connection */
      setConnections((prev) => [...prev, { fromId: selectedNode, toId: nodeId }]);
      setSelectedNode(null);
    },
    [selectedNode, findConnection, passed]
  );

  /* Remove a connection by clicking its SVG line */
  const handleLineClick = useCallback(
    (fromId: string, toId: string) => {
      if (passed) return;
      const key = connectionKey({ fromId, toId });
      /* Don't allow removing verified connections */
      if (verified.has(key)) return;

      setConnections((prev) =>
        prev.filter((c) => !connectionsEqual(c, { fromId, toId }))
      );
      setWrong((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    },
    [passed, verified]
  );

  /* Check button */
  const handleCheck = useCallback(() => {
    const newVerified = new Set(verified);
    const newWrong = new Set<string>();

    for (const conn of connections) {
      const key = connectionKey(conn);
      if (newVerified.has(key)) continue;

      const isValid = exercise.validConnections.some(
        (vc) => connectionsEqual(conn, { fromId: vc.fromId, toId: vc.toId })
      );

      if (isValid) {
        newVerified.add(key);
      } else {
        newWrong.add(key);
      }
    }

    setVerified(newVerified);
    setWrong(newWrong);

    /* Remove wrong connections after 1s */
    if (newWrong.size > 0) {
      setTimeout(() => {
        setConnections((prev) =>
          prev.filter((c) => !newWrong.has(connectionKey(c)))
        );
        setWrong(new Set());
      }, 1000);
    }

    /* Check if all valid connections are found */
    if (newVerified.size >= totalRequired && newWrong.size === 0) {
      setPassed(true);
    }
  }, [connections, exercise.validConnections, totalRequired, verified]);

  /* Success continue */
  const handleContinue = useCallback(() => {
    onPass();
  }, [onPass]);

  /* Show check when user has made enough unverified connections to fill the remaining gaps */
  const unverifiedCount = connections.filter(
    (c) => !verified.has(connectionKey(c))
  ).length;
  const remaining = totalRequired - verified.size;
  const showCheck = !passed && unverifiedCount > 0 && unverifiedCount >= remaining;

  /* Node connection state helpers */
  const isNodeConnected = (nodeId: string) =>
    connections.some((c) => c.fromId === nodeId || c.toId === nodeId);

  const isNodeVerified = (nodeId: string) =>
    connections.some(
      (c) =>
        (c.fromId === nodeId || c.toId === nodeId) &&
        verified.has(connectionKey(c))
    );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-4">
        {t("learningBlocks.conceptMapTitle")}
      </div>

      {/* Instruction */}
      <p className="text-base font-semibold text-gray-900 mb-1">
        {t(exercise.instructionKey)}
      </p>
      <p className="text-sm text-gray-500 mb-5">
        {t("learningBlocks.conceptMapInstruction")}
      </p>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${(verified.size / totalRequired) * 100}%` }}
          />
        </div>
        <span className="tabular-nums font-medium">
          {verified.size}/{totalRequired}
        </span>
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl border border-gray-100 overflow-hidden"
        style={{
          height: 400,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: "visible" }}
        >
          {lines.map((line, i) => {
            const key = connectionKey({ fromId: line.fromId, toId: line.toId });
            const isVerified = verified.has(key);
            const isWrong = wrong.has(key);

            const strokeColor = isVerified
              ? "#22c55e"
              : isWrong
                ? "#ef4444"
                : COLORS[line.colorIdx];

            return (
              <g
                key={`${line.fromId}-${line.toId}`}
                className={isWrong ? "animate-shake" : ""}
                style={{ pointerEvents: "auto", cursor: passed || isVerified ? "default" : "pointer" }}
                onClick={() => handleLineClick(line.fromId, line.toId)}
              >
                {/* Hit area (invisible, wider for easier clicking) */}
                <line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="transparent"
                  strokeWidth={16}
                  strokeLinecap="round"
                />
                {/* Glow line */}
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
                  strokeDasharray={isVerified ? "none" : "6 4"}
                  opacity={0.85}
                />
                {/* Endpoint circles */}
                <circle cx={line.x1} cy={line.y1} r={4} fill={strokeColor} opacity={0.7} />
                <circle cx={line.x2} cy={line.y2} r={4} fill={strokeColor} opacity={0.7} />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {exercise.nodes.map((node) => {
          const isSelected = selectedNode === node.id;
          const connected = isNodeConnected(node.id);
          const nodeVerified = isNodeVerified(node.id);

          let classes =
            "absolute px-4 py-2 rounded-full border-2 text-sm font-semibold cursor-pointer transition-all duration-200 z-20 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

          if (passed && nodeVerified) {
            classes +=
              " border-green-400 bg-green-50 text-green-800 cursor-default";
          } else if (isSelected) {
            classes +=
              " border-teal-500 bg-teal-50 text-teal-800 ring-2 ring-teal-300 shadow-md scale-110";
          } else if (connected && nodeVerified) {
            classes +=
              " border-green-400 bg-green-50 text-green-800";
          } else if (connected) {
            classes +=
              " border-indigo-400 bg-indigo-50 text-indigo-800";
          } else {
            classes +=
              " border-gray-300 bg-white text-gray-700 hover:border-teal-400 hover:scale-105 hover:shadow-sm";
          }

          return (
            <button
              key={node.id}
              ref={(el) => {
                nodeRefs.current[node.id] = el;
              }}
              type="button"
              onClick={() => handleNodeClick(node.id)}
              disabled={passed}
              className={classes}
              style={{
                left: `${node.x * 100}%`,
                top: `${node.y * 100}%`,
                transform: `translate(-50%, -50%)${isSelected ? " scale(1.1)" : ""}`,
              }}
            >
              {passed && nodeVerified && (
                <IconCheck className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5 text-green-600" />
              )}
              {t(node.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3 animate-content-enter">
        {!passed && connections.length > verified.size && (
          <button
            type="button"
            onClick={() => {
              setConnections((prev) =>
                prev.filter((c) => verified.has(connectionKey(c)))
              );
              setWrong(new Set());
              setSelectedNode(null);
            }}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.matchingClearAll")}
          </button>
        )}

        {showCheck && (
          <button
            type="button"
            onClick={handleCheck}
            className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span className="ml-1" aria-hidden>
              →
            </span>
          </button>
        )}

        {passed && (
          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span className="ml-1" aria-hidden>
              →
            </span>
          </button>
        )}
      </div>

      {/* Success message */}
      {passed && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 animate-wizard-feedback">
          <p className="text-sm font-semibold text-green-800">
            {t("learningBlocks.matchingCorrect")}
          </p>
        </div>
      )}
    </div>
  );
}
