"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  getXPData,
  getCurrentLevel,
  getXPToNextLevel,
  type LevelDef,
} from "@/app/bootcamp/xp";

/* ------------------------------------------------------------------ */
/*  XPBar — shows level, progress bar, XP to next level               */
/* ------------------------------------------------------------------ */

export function XPBar({ className = "" }: { className?: string }) {
  const t = useTranslations("bootcamp");
  const [totalXP, setTotalXP] = useState(0);
  const [level, setLevel] = useState<LevelDef | null>(null);
  const [progress, setProgress] = useState({ current: 0, needed: 0, percent: 0 });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const data = getXPData();
    setTotalXP(data.totalXP);
    setLevel(getCurrentLevel(data.totalXP));
    setProgress(getXPToNextLevel(data.totalXP));
    setHydrated(true);
  }, []);

  if (!hydrated || !level) {
    return (
      <div className={`animate-pulse rounded-lg bg-gray-100 h-16 ${className}`} />
    );
  }

  const isMaxLevel = progress.needed === 0;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Level name + XP total */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-teal-700">
          {t(level.nameKey)}
        </span>
        <span className="font-semibold text-gray-600">
          {totalXP} XP
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress.percent}%`,
            background: "linear-gradient(90deg, #00a8ab 0%, #44babe 50%, #fbbf24 100%)",
          }}
        />
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "cel-shimmer 2s linear infinite",
          }}
        />
      </div>

      {/* XP to next level */}
      <div className="text-xs text-gray-500 text-right">
        {isMaxLevel ? (
          <span className="font-semibold text-amber-600">MAX LEVEL ⭐</span>
        ) : (
          <span>
            {progress.current} / {progress.needed} XP
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  XPBadge — small inline badge showing total XP                      */
/* ------------------------------------------------------------------ */

export function XPBadge({
  xp,
  className = "",
}: {
  xp: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-bold ${className}`}
      style={{
        background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
        color: "#b45309",
        border: "1px solid #fcd34d",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: "0.9em",
          filter: "drop-shadow(0 0 2px rgba(251,191,36,0.6))",
        }}
      >
        ⭐
      </span>
      {xp} XP
    </span>
  );
}
