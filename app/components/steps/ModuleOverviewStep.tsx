"use client";

import { useTranslations } from "next-intl";
import type { BootcampModule } from "@/app/bootcamp/catalog";
import { getModuleBySlug } from "@/app/documentation/modules";
import type { ModuleStepDef } from "@/app/bootcamp/steps";
import { XP_VALUES } from "@/app/bootcamp/xp";
import { BADGE_DEFS } from "@/app/bootcamp/badges";

const stepIcons: Record<string, string> = {
  overview: "1",
  tour: "🎥",
  content: "📖",
  quiz: "✍️",
  results: "🏆",
};

export function ModuleOverviewStep({
  module,
  steps,
  onContinue,
}: {
  module: BootcampModule;
  steps: ModuleStepDef[];
  onContinue: () => void;
}) {
  const t = useTranslations("bootcamp");
  const tDocs = useTranslations("docs");

  const docModule = getModuleBySlug(module.documentationModuleSlug);
  const sections = docModule?.sections ?? [];
  const essentialCount = sections.filter((s) => s.priority === "essential").length;
  const totalMinutes = module.lessons.reduce((sum, l) => sum + l.durationMin, 0);

  // Rough XP estimate: tour(50) + missions(30 each) + quiz_pass(50) + module_complete(100)
  const lessonCount = module.lessons.filter((l) => l.type !== "tour").length;
  const estimatedXP =
    XP_VALUES.tour_complete +
    XP_VALUES.mission_complete * lessonCount +
    XP_VALUES.quiz_pass +
    XP_VALUES.module_complete;

  // Badges available for this module
  const availableBadges = BADGE_DEFS.filter(
    (b) =>
      b.conditionValue === module.slug ||
      b.conditionType === "quiz_perfect" ||
      b.conditionType === "quiz_first_try"
  );

  return (
    <div className="space-y-6 animate-content-enter">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2">
          {t("overview.eyebrow")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {tDocs(module.titleKey)}
        </h2>
        <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl">
          {tDocs(module.descriptionKey)}
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 font-medium">
            <span>{sections.length}</span> {t("overview.sections")}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 font-medium">
            <span>{essentialCount}</span> {t("overview.essential")}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
            ~{totalMinutes} min
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 font-medium">
            Earn up to ~{estimatedXP} XP
          </div>
        </div>

        {/* Available Badges */}
        {availableBadges.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              {t("overview.availableBadges")}
            </p>
            <div className="flex flex-wrap gap-2">
              {availableBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-sm"
                >
                  <span>{badge.icon}</span>
                  <span className="font-medium text-amber-800">{t(badge.nameKey)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("overview.roadmap")}</h3>
        <div className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <div
              key={step.type}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 text-sm font-bold shrink-0">
                {stepIcons[step.type] ?? i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{t(step.labelKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sections.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("overview.topicsCovered")}</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {sections.map((section) => (
              <li
                key={section.id}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span
                  className={`mt-0.5 inline-block w-2 h-2 rounded-full shrink-0 ${
                    section.priority === "essential" ? "bg-teal-500" : "bg-gray-300"
                  }`}
                />
                {tDocs(section.titleKey)}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-1.5 align-middle" />
            {t("overview.essentialLegend")}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
        >
          {t("overview.startButton")}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
