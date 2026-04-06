"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { useTranslations } from "next-intl";
import type { BootcampModule, BootcampLesson } from "@/app/bootcamp/catalog";
import type { ModuleMission, ScenarioOption } from "@/app/bootcamp/missions";
import {
  SCENARIO_TONE_BORDER as TONE_BORDER,
  SCENARIO_TONE_BADGE as TONE_BADGE,
  SCENARIO_TONE_TEXT as TONE_TEXT,
  SCENARIO_TONE_FEEDBACK_BG as TONE_FEEDBACK_BG,
  SCENARIO_TONE_ICON as TONE_ICON,
} from "@/app/bootcamp/tone-styles";

/* ------------------------------------------------------------------ */
/*  ScenarioOptionCard                                                  */
/* ------------------------------------------------------------------ */

function ScenarioOptionCard({
  option,
  isRevealed,
  allDone,
  onReveal,
  t,
}: {
  option: ScenarioOption;
  isRevealed: boolean;
  allDone: boolean;
  onReveal: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const borderColor = !isRevealed
    ? "border-gray-200 hover:border-indigo-300 hover:shadow-md"
    : TONE_BORDER[option.feedbackTone];

  return (
    <button
      type="button"
      onClick={onReveal}
      disabled={allDone}
      className={`w-full rounded-xl border p-4 transition-all cursor-pointer text-left ${borderColor} ${allDone ? "pointer-events-none" : ""}`}
    >
      <div className="flex items-start gap-3">
        <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
          !isRevealed
            ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
            : TONE_BADGE[option.feedbackTone]
        }`}>
          {option.id.toUpperCase()}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${isRevealed ? TONE_TEXT[option.feedbackTone] : "text-gray-800"}`}>
            {t(option.labelKey)}
          </p>

          {isRevealed && (
            <div className={`mt-3 rounded-lg p-3 text-sm leading-relaxed ${TONE_FEEDBACK_BG[option.feedbackTone]}`}>
              <div className="flex items-start gap-2">
                <span className="text-base shrink-0" aria-hidden>
                  {TONE_ICON[option.feedbackTone]}
                </span>
                <p>{t(option.consequenceKey)}</p>
              </div>
            </div>
          )}

          {!isRevealed && (
            <p className="mt-1 text-xs text-gray-400">{t("contentMissions.tapToReveal")}</p>
          )}
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  ScenarioMissionCard                                                 */
/* ------------------------------------------------------------------ */

export function ScenarioMissionCard({
  mission,
  lesson,
  index,
  total,
  done,
  moduleSlug,
  onToggle,
  t,
  tDocs,
}: {
  mission: Extract<ModuleMission, { missionType: "scenario" }>;
  lesson: BootcampLesson;
  index: number;
  total: number;
  done: boolean;
  moduleSlug: string;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations>;
  tDocs: ReturnType<typeof useTranslations>;
  module: BootcampModule;
}) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [firstRevealed, setFirstRevealed] = useState<string | null>(null);

  const bestOption = mission.options.find((o) => o.isBest)!;
  const bestRevealed = revealed.has(bestOption.id);
  const missionComplete = bestRevealed;

  const firstRevealedOption = firstRevealed
    ? mission.options.find((o) => o.id === firstRevealed) ?? null
    : null;
  const firstRevealScore = firstRevealedOption?.score ?? 0;
  const maxScore = bestOption.score;

  useEffect(() => {
    if (!done) return;
    setRevealed(new Set(mission.options.map((o) => o.id)));
  }, [done, mission.options]);

  function reveal(optId: string) {
    if (done) return;
    if (firstRevealed === null) {
      setFirstRevealed(optId);
    }
    setRevealed((prev) => new Set(prev).add(optId));
  }

  function handleComplete() {
    if (!done && !missionComplete) return;
    onToggle();
  }

  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* header */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-gray-100 px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
            {t("lessonNumber", { current: index + 1, total })} · {t("contentMissions.scenarioLabel")}
          </p>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mt-1">{tDocs(lesson.titleKey)}</h2>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* scenario description */}
        <div className="rounded-lg bg-indigo-50/60 border border-indigo-100 p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5" aria-hidden>📋</span>
            <div>
              <p className="text-sm font-semibold text-indigo-800">{t("contentMissions.scenarioPrompt")}</p>
              <p className="mt-1 text-sm text-indigo-900 leading-relaxed">{t(mission.scenarioKey)}</p>
            </div>
          </div>
        </div>

        {/* question prompt */}
        <p className="text-sm font-semibold text-gray-800">{t("contentMissions.whatWouldYouDo")}</p>

        {/* options grid */}
        <div className="grid gap-3">
          {mission.options.map((opt) => (
            <ScenarioOptionCard
              key={opt.id}
              option={opt}
              isRevealed={revealed.has(opt.id)}
              allDone={done}
              onReveal={() => reveal(opt.id)}
              t={t}
            />
          ))}
        </div>

        {/* hint when some explored but not best */}
        {revealed.size > 0 && !bestRevealed && !done && (
          <p className="text-xs text-gray-500 italic">
            {t("contentMissions.keepExploring")}
          </p>
        )}

        {/* score display after completion */}
        {(done || missionComplete) && firstRevealed !== null && (
          <div className={`rounded-lg p-3 flex items-center gap-3 ${
            firstRevealScore === maxScore
              ? "bg-green-50 border border-green-200"
              : firstRevealScore >= 2
                ? "bg-blue-50 border border-blue-200"
                : firstRevealScore === 1
                  ? "bg-amber-50 border border-amber-200"
                  : "bg-red-50 border border-red-200"
          }`}>
            <span className="text-2xl font-bold tabular-nums">
              {firstRevealScore}/{maxScore}
            </span>
            <div>
              <p className={`text-sm font-semibold ${
                firstRevealScore === maxScore
                  ? "text-green-800"
                  : firstRevealScore >= 2
                    ? "text-blue-800"
                    : firstRevealScore === 1
                      ? "text-amber-800"
                      : "text-red-800"
              }`}>
                {firstRevealScore === maxScore
                  ? "Perfect choice!"
                  : firstRevealScore >= 2
                    ? "Good choice!"
                    : firstRevealScore === 1
                      ? "Not quite..."
                      : "Try a better approach next time"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Score based on your first pick
              </p>
            </div>
          </div>
        )}

        {/* docs link + complete button */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={`/documentation/module/${moduleSlug}#${lesson.sectionId}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
          >
            {t("actions.openDocs")}
            <span aria-hidden>→</span>
          </Link>

          <div className="flex-1" />

          <button
            type="button"
            onClick={handleComplete}
            disabled={!done && !missionComplete}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors shrink-0 ${
              done
                ? "text-green-700 bg-green-50 hover:bg-green-100"
                : "text-white bg-teal-600 hover:bg-teal-700"
            } ${!done && !missionComplete ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {done ? t("actions.completed") : t("contentMissions.markCompleted")}
          </button>
        </div>
      </div>
    </article>
  );
}
