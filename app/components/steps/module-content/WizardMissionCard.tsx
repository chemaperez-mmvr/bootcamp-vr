"use client";

import { Link } from "@/i18n/navigation";
import type { useTranslations } from "next-intl";
import type { BootcampModule, BootcampLesson } from "@/app/bootcamp/catalog";
import type { WizardMissionDef } from "@/app/bootcamp/wizard-types";
import { WizardMissionPlayer } from "@/app/components/WizardMissionPlayer";

export function WizardMissionCard({
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
  wizardDef: WizardMissionDef;
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
    <article className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className={`border-b border-gray-100 px-5 py-4 sm:px-6 ${
        wizardDef.isBossLevel
          ? "bg-gradient-to-r from-amber-50 to-orange-50"
          : "bg-gradient-to-r from-teal-50/50 to-indigo-50/30"
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {t("lessonNumber", { current: index + 1, total })}
              {wizardDef.isBossLevel && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                  🏆 {t("wizardMissions.bossLabel")}
                </span>
              )}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
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
        <p className="mt-1 text-sm sm:text-base text-gray-600">{t(wizardDef.descriptionKey)}</p>
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
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
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
