"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { useTranslations } from "next-intl";
import type { BootcampModule, BootcampLesson } from "@/app/bootcamp/catalog";
import type { ModuleMission } from "@/app/bootcamp/missions";

export function ChecklistMissionCard({
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
