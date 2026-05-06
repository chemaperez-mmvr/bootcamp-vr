"use client";

import type { ReactNode } from "react";

/**
 * Shared shell for every learning-block card.
 *
 * Color tokens follow an *intentional* mapping by exercise category, not random:
 *   - teal     → micro-checks, matching, classify, fill-in (quick checks)
 *   - emerald  → physical-space planning (classroom planner)
 *   - sky      → memory recall (memory match)
 *   - rose     → contradictions / myths (myth busters)
 *   - violet   → sequence / logic (ordering, decision tree)
 *   - amber    → triage / urgency (triage sort)
 *   - orange   → diagnostics (troubleshooting)
 *   - cyan     → resource allocation
 *   - indigo   → narrative scenario / lesson plan building
 *
 * Add new tones below as needed; do not pick "whatever looks nice".
 */
export type LearningBlockTone =
  | "teal"
  | "emerald"
  | "sky"
  | "rose"
  | "violet"
  | "amber"
  | "orange"
  | "cyan"
  | "indigo";

const TONE_BADGE: Record<LearningBlockTone, string> = {
  teal: "bg-teal-100 text-teal-700",
  emerald: "bg-emerald-100 text-emerald-700",
  sky: "bg-sky-100 text-sky-700",
  rose: "bg-rose-100 text-rose-700",
  violet: "bg-violet-100 text-violet-700",
  amber: "bg-amber-100 text-amber-700",
  orange: "bg-orange-100 text-orange-700",
  cyan: "bg-cyan-100 text-cyan-700",
  indigo: "bg-indigo-100 text-indigo-700",
};

export function LearningBlockShell({
  tone,
  badgeIcon,
  badgeLabel,
  title,
  subtitle,
  children,
}: {
  tone: LearningBlockTone;
  /** Optional icon/emoji shown before the badge label. */
  badgeIcon?: ReactNode;
  badgeLabel: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${TONE_BADGE[tone]}`}
      >
        {badgeIcon}
        {badgeLabel}
      </div>

      <p className="text-base sm:text-lg font-semibold text-gray-900 mb-1 leading-snug">
        {title}
      </p>
      {subtitle && (
        <p className="text-sm text-gray-500 mb-5">{subtitle}</p>
      )}

      {children}
    </div>
  );
}
