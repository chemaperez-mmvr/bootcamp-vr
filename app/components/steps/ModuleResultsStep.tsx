"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BootcampModule } from "@/app/bootcamp/catalog";
import { bootcampCatalog } from "@/app/bootcamp/catalog";
import { getBestQuizAttempt } from "@/app/bootcamp/quiz-progress";
import { getQuizForModule } from "@/app/bootcamp/quizzes";
import { getModuleBySlug } from "@/app/documentation/modules";
import { IconCheck, IconBook } from "@/app/components/icons";

export function ModuleResultsStep({ module }: { module: BootcampModule }) {
  const t = useTranslations("bootcamp");
  const tDocs = useTranslations("docs");

  const hasQuiz = Boolean(getQuizForModule(module.slug));
  const bestAttempt = useMemo(() => getBestQuizAttempt(module.slug), [module.slug]);

  const nextModule = useMemo(() => {
    const idx = bootcampCatalog.findIndex((m) => m.slug === module.slug);
    return idx >= 0 && idx < bootcampCatalog.length - 1
      ? bootcampCatalog[idx + 1]
      : undefined;
  }, [module.slug]);

  const docModule = getModuleBySlug(module.documentationModuleSlug);
  const sections = docModule?.sections ?? [];

  return (
    <div className="space-y-6 animate-content-enter">
      <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-teal-50 p-5 sm:p-6 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <IconCheck className="w-7 h-7" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t("resultsStep.congratsTitle")}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          {t("resultsStep.congratsDesc", { module: tDocs(module.titleKey) })}
        </p>
      </div>

      {/* Quiz Score */}
      {hasQuiz && bestAttempt && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            {t("resultsStep.bestScore")}
          </p>
          <p className="text-3xl font-bold text-teal-700">{bestAttempt.percent}%</p>
          <p className="text-sm text-gray-500 mt-1">
            {bestAttempt.score}/{bestAttempt.total} {t("resultsStep.correct")}
          </p>
        </div>
      )}

      {/* Topics Covered */}
      {sections.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <IconBook className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-700">
              {t("resultsStep.topicsCovered")}
            </h3>
          </div>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-teal-400" />
                {tDocs(section.titleKey)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Module CTA */}
      {nextModule && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
          <p className="text-xs font-medium tracking-wide text-teal-700 uppercase mb-1">
            {t("resultsStep.upNext")}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {tDocs(nextModule.titleKey)}
          </h3>
          <Link
            href={`/bootcamp/module/${nextModule.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("resultsStep.nextModule", { module: tDocs(nextModule.titleKey) })}
            <span aria-hidden>&#8594;</span>
          </Link>
        </div>
      )}

      {/* Back to Bootcamp */}
      <div className="flex justify-center">
        <Link
          href="/bootcamp"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-teal-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          &#8592; {t("actions.backToBootcamp")}
        </Link>
      </div>
    </div>
  );
}
