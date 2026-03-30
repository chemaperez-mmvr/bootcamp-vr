"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BootcampModule, BootcampLesson } from "@/app/bootcamp/catalog";
import type { ModuleMission, ScenarioOption } from "@/app/bootcamp/missions";
import { getMissionForLesson } from "@/app/bootcamp/missions";
import { addXP, hasXPEvent } from "@/app/bootcamp/xp";
import { useCelebration } from "@/app/components/Celebrations";
import { getWizardMissionById } from "@/app/bootcamp/wizard-missions";
import { WizardMissionPlayer } from "@/app/components/WizardMissionPlayer";

/* ================================================================== */
/*  Feedback-tone color maps                                           */
/* ================================================================== */

const TONE_BORDER: Record<ScenarioOption["feedbackTone"], string> = {
  best: "border-green-300 bg-green-50/50",
  acceptable: "border-blue-300 bg-blue-50/50",
  caution: "border-amber-300 bg-amber-50/50",
  danger: "border-red-300 bg-red-50/50",
};

const TONE_BADGE: Record<ScenarioOption["feedbackTone"], string> = {
  best: "bg-green-200 text-green-800 border border-green-300",
  acceptable: "bg-blue-200 text-blue-800 border border-blue-300",
  caution: "bg-amber-200 text-amber-800 border border-amber-300",
  danger: "bg-red-200 text-red-800 border border-red-300",
};

const TONE_TEXT: Record<ScenarioOption["feedbackTone"], string> = {
  best: "text-green-900",
  acceptable: "text-blue-900",
  caution: "text-amber-900",
  danger: "text-red-900",
};

const TONE_FEEDBACK_BG: Record<ScenarioOption["feedbackTone"], string> = {
  best: "bg-green-100/70 text-green-800 border border-green-200",
  acceptable: "bg-blue-100/70 text-blue-800 border border-blue-200",
  caution: "bg-amber-100/70 text-amber-800 border border-amber-200",
  danger: "bg-red-100/70 text-red-800 border border-red-200",
};

const TONE_ICON: Record<ScenarioOption["feedbackTone"], string> = {
  best: "\u2705",
  acceptable: "\u2139\uFE0F",
  caution: "\u26A0\uFE0F",
  danger: "\u274C",
};

/* ================================================================== */
/*  ModuleContentStep (main export)                                    */
/* ================================================================== */

export function ModuleContentStep({
  module,
  completedMap,
  onToggleLesson,
  onContinue,
}: {
  module: BootcampModule;
  completedMap: Record<string, boolean>;
  onToggleLesson: (lessonId: string) => void;
  onContinue: () => void;
}) {
  const t = useTranslations("bootcamp");
  const tDocs = useTranslations("docs");

  const contentLessons = useMemo(
    () => module.lessons.filter((l) => l.type !== "tour"),
    [module.lessons]
  );

  const completedCount = contentLessons.filter((l) => completedMap[l.id]).length;
  const allDone = completedCount === contentLessons.length;

  return (
    <div className="space-y-5 animate-content-enter">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">{t("contentStep.title")}</h3>
        <p className="mt-1 text-sm text-gray-600">{t("contentStep.subtitle")}</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${contentLessons.length === 0 ? 0 : (completedCount / contentLessons.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-500 shrink-0">
            {completedCount}/{contentLessons.length}
          </span>
        </div>
      </div>

      {contentLessons.map((lesson, index) => (
        <div key={lesson.id}>
          <MissionOrFallbackCard
            lesson={lesson}
            index={index}
            total={contentLessons.length}
            done={Boolean(completedMap[lesson.id])}
            moduleSlug={module.documentationModuleSlug}
            onToggle={() => onToggleLesson(lesson.id)}
            t={t}
            tDocs={tDocs}
            module={module}
          />
        </div>
      ))}

      {allDone && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
          >
            {t("contentStep.continueButton")}
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Dispatcher                                                         */
/* ================================================================== */

function MissionOrFallbackCard({
  module,
  lesson,
  index,
  total,
  done,
  moduleSlug,
  onToggle,
  t,
  tDocs,
}: {
  module: BootcampModule;
  lesson: BootcampLesson;
  index: number;
  total: number;
  done: boolean;
  moduleSlug: string;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations>;
  tDocs: ReturnType<typeof useTranslations>;
}) {
  const mission: ModuleMission | undefined = getMissionForLesson(module.slug, lesson.sectionId);

  if (!mission) {
    return (
      <LessonCard
        lesson={lesson}
        index={index}
        total={total}
        done={done}
        moduleSlug={moduleSlug}
        onToggle={onToggle}
        t={t}
        tDocs={tDocs}
      />
    );
  }

  switch (mission.missionType) {
    case "wizard": {
      const wizardDef = getWizardMissionById(module.slug, mission.wizardMissionId);
      if (!wizardDef) break;
      return (
        <WizardMissionCard
          wizardDef={wizardDef}
          lesson={lesson}
          index={index}
          total={total}
          done={done}
          moduleSlug={moduleSlug}
          onToggle={onToggle}
          t={t}
          tDocs={tDocs}
          module={module}
        />
      );
    }
    case "scenario":
      return (
        <ScenarioMissionCard
          mission={mission}
          lesson={lesson}
          index={index}
          total={total}
          done={done}
          moduleSlug={moduleSlug}
          onToggle={onToggle}
          t={t}
          tDocs={tDocs}
          module={module}
        />
      );
    case "checklist":
      return (
        <ChecklistMissionCard
          mission={mission}
          lesson={lesson}
          index={index}
          total={total}
          done={done}
          moduleSlug={moduleSlug}
          onToggle={onToggle}
          t={t}
          tDocs={tDocs}
          module={module}
        />
      );
    default:
      break;
  }

  return (
    <LessonCard
      lesson={lesson}
      index={index}
      total={total}
      done={done}
      moduleSlug={moduleSlug}
      onToggle={onToggle}
      t={t}
      tDocs={tDocs}
    />
  );
}

/* ================================================================== */
/*  Wizard Mission Card                                                */
/* ================================================================== */

function WizardMissionCard({
  wizardDef,
  lesson,
  index,
  total,
  done,
  moduleSlug,
  onToggle,
  t,
  tDocs,
  module,
}: {
  wizardDef: import("@/app/bootcamp/wizard-types").WizardMissionDef;
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
  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className={`border-b border-gray-100 px-5 py-4 sm:px-6 ${
        wizardDef.isBossLevel
          ? "bg-gradient-to-r from-amber-50 to-orange-50"
          : "bg-gradient-to-r from-teal-50/50 to-indigo-50/30"
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {t("lessonNumber", { current: index + 1, total })}
              {wizardDef.isBossLevel && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                  🏆 {t("wizardMissions.bossLabel")}
                </span>
              )}
            </p>
            <h2 className="text-lg font-semibold text-gray-900 mt-1">
              <span className="mr-2">{wizardDef.iconEmoji}</span>
              {t(wizardDef.titleKey)}
            </h2>
          </div>
          {done && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              ✓ {t("actions.completed")}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{t(wizardDef.descriptionKey)}</p>
      </div>

      {/* Wizard Player */}
      <div className="p-5 sm:p-6">
        <WizardMissionPlayer
          mission={wizardDef}
          moduleSlug={module.slug}
          isCompleted={done}
          onComplete={onToggle}
        />

        {/* Docs link */}
        {wizardDef.sectionId !== "full-prep-boss" && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href={`/documentation/module/${moduleSlug}#${lesson.sectionId}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
            >
              {t("actions.openDocs")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

/* ================================================================== */
/*  Scenario Mission Card                                              */
/* ================================================================== */

function ScenarioMissionCard({
  mission,
  lesson,
  index,
  total,
  done,
  moduleSlug,
  onToggle,
  t,
  tDocs,
  module,
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
  const { showXPGain } = useCelebration();
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [firstRevealed, setFirstRevealed] = useState<string | null>(null);
  const [xpAwarded, setXpAwarded] = useState(false);

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

    if (!xpAwarded && !done) {
      const alreadyAwarded = hasXPEvent("mission_complete", module.slug + ":" + lesson.sectionId);
      if (!alreadyAwarded) {
        const result = addXP("mission_complete", module.slug);
        showXPGain(result.xpGained);

        if (firstRevealed === bestOption.id) {
          const bonusResult = addXP("mission_best_choice", module.slug);
          showXPGain(bonusResult.xpGained);
        }
      }
      setXpAwarded(true);
    }

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
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
            +30 XP
          </span>
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

/* ================================================================== */
/*  Single scenario option                                             */
/* ================================================================== */

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
    <div
      role="button"
      tabIndex={0}
      onClick={onReveal}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onReveal(); }}
      className={`rounded-xl border p-4 transition-all cursor-pointer ${borderColor} ${allDone ? "pointer-events-none" : ""}`}
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
    </div>
  );
}

/* ================================================================== */
/*  Checklist Mission Card                                             */
/* ================================================================== */

function ChecklistMissionCard({
  mission,
  lesson,
  index,
  total,
  done,
  moduleSlug,
  onToggle,
  t,
  tDocs,
  module,
}: {
  mission: Extract<ModuleMission, { missionType: "checklist" }>;
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
  const { showXPGain } = useCelebration();
  const [checked, setChecked] = useState<boolean[]>(() => mission.itemLabelKeys.map(() => false));
  const [missingLabels, setMissingLabels] = useState<string[] | null>(null);

  const itemCount = mission.itemLabelKeys.length;
  const checkedCount = checked.filter(Boolean).length;
  const missionComplete = checkedCount === itemCount;

  useEffect(() => {
    if (!done) return;
    setChecked(mission.itemLabelKeys.map(() => true));
    setMissingLabels(null);
  }, [done, mission.itemLabelKeys]);

  function handleCheckItem(idx: number, isNowChecked: boolean) {
    setMissingLabels(null);
    const next = [...checked];
    next[idx] = isNowChecked;
    setChecked(next);

    if (isNowChecked) {
      const eventKey = module.slug + ":" + lesson.sectionId + ":item" + idx;
      const alreadyAwarded = hasXPEvent("checklist_item", eventKey);
      if (!alreadyAwarded) {
        const result = addXP("checklist_item", eventKey);
        showXPGain(result.xpGained);
      }
    }
  }

  function handleComplete() {
    if (done) {
      onToggle();
      return;
    }

    if (!missionComplete) {
      const missing = mission.itemLabelKeys
        .map((itemKey, idx) => ({ itemKey, idx }))
        .filter(({ idx }) => !checked[idx])
        .map(({ itemKey }) => t(itemKey));
      setMissingLabels(missing);
      return;
    }

    const alreadyAwarded = hasXPEvent("mission_complete", module.slug + ":" + lesson.sectionId);
    if (!alreadyAwarded) {
      const result = addXP("mission_complete", module.slug);
      showXPGain(result.xpGained);
    }

    onToggle();
  }

  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* header */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-gray-100 px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
            {t("lessonNumber", { current: index + 1, total })} · {t(`lessonTypes.${lesson.type}`)}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
            +30 XP
          </span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mt-1">{tDocs(lesson.titleKey)}</h2>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* prompt */}
        <div className="rounded-lg bg-amber-50 border border-amber-100 p-4">
          <p className="text-sm font-semibold text-amber-800">{t("contentMissions.checklistLabel")}</p>
          <p className="mt-1 text-sm text-amber-900">{t(mission.promptKey)}</p>
        </div>

        {/* vertical stepper */}
        <div className="relative pl-8">
          {mission.itemLabelKeys.map((itemKey, idx) => {
            const isChecked = checked[idx];
            return (
              <div key={itemKey} className="relative pb-6 last:pb-0">
                {/* vertical line */}
                {idx < itemCount - 1 && (
                  <div className="absolute left-[-20px] top-8 bottom-0 w-0.5 bg-gray-200" />
                )}
                {/* step circle + content */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isChecked
                        ? "bg-green-500 text-white scale-110 animate-scale-bounce"
                        : "bg-gray-100 text-gray-500 border border-gray-300"
                    }`}
                  >
                    {isChecked ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xs font-bold">{idx + 1}</span>
                    )}
                  </div>
                  <label
                    className={`flex-1 p-3 rounded-lg border cursor-pointer transition-colors select-none ${
                      done
                        ? "border-green-200 bg-green-50"
                        : isChecked
                          ? "border-teal-300 bg-teal-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={done}
                      onChange={(e) => handleCheckItem(idx, e.target.checked)}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-800">{t(itemKey)}</span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* progress counter */}
        <div className="text-xs text-gray-500">
          {checkedCount}/{itemCount} {t("contentMissions.checked")}
        </div>

        {/* missing items warning */}
        {missingLabels && missingLabels.length > 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm font-semibold text-red-800">
              {t("contentMissions.missingItems", { items: missingLabels.join(", ") })}
            </p>
          </div>
        )}

        {/* all done banner */}
        {done && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-sm font-semibold text-green-800">{t("contentMissions.allDone")}</p>
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
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors shrink-0 ${
              done
                ? "text-green-700 bg-green-50 hover:bg-green-100"
                : missionComplete
                  ? "text-white bg-teal-600 hover:bg-teal-700"
                  : "text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200"
            }`}
          >
            {done ? t("actions.completed") : t("contentMissions.markCompleted")}
          </button>
        </div>
      </div>

    </article>
  );
}

/* ================================================================== */
/*  Fallback Lesson Card                                               */
/* ================================================================== */

function LessonCard({
  lesson,
  index,
  total,
  done,
  moduleSlug,
  onToggle,
  t,
  tDocs,
}: {
  lesson: BootcampLesson;
  index: number;
  total: number;
  done: boolean;
  moduleSlug: string;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations>;
  tDocs: ReturnType<typeof useTranslations>;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
            {t("lessonNumber", { current: index + 1, total })} ·{" "}
            {t(`lessonTypes.${lesson.type}`)}
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1">
            {tDocs(lesson.titleKey)}
          </h2>
          <p className="mt-2 text-gray-600">{t(lesson.descriptionKey)}</p>
          <p className="mt-2 text-sm text-gray-500">
            {t("duration", { minutes: lesson.durationMin })}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/documentation/module/${moduleSlug}#${lesson.sectionId}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
            >
              {t("actions.openDocs")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            done
              ? "text-green-700 bg-green-50 hover:bg-green-100"
              : "text-white bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {done ? t("actions.completed") : t("actions.markDone")}
        </button>
      </div>
    </article>
  );
}
