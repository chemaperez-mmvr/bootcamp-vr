"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { BootcampModule, BootcampLesson } from "@/app/bootcamp/catalog";
import type { ModuleMission } from "@/app/bootcamp/missions";
import { getMissionForLesson } from "@/app/bootcamp/missions";
import { getWizardMissionById } from "@/app/bootcamp/wizard-missions";
import {
  ScenarioMissionCard,
  ChecklistMissionCard,
  WizardMissionCard,
  LessonCard,
} from "./module-content";

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
