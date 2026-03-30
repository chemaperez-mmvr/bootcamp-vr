"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BootcampModule } from "@/app/bootcamp/catalog";
import { bootcampCatalog } from "@/app/bootcamp/catalog";
import { getBestQuizAttempt } from "@/app/bootcamp/quiz-progress";
import { getQuizForModule } from "@/app/bootcamp/quizzes";
import { getModuleXP, getCurrentLevel, getXPData, addXP, hasXPEvent } from "@/app/bootcamp/xp";
import { getEarnedBadgeDefs, checkAndAwardBadges, type BadgeDef } from "@/app/bootcamp/badges";
import { useCelebration } from "@/app/components/Celebrations";
import { XPBar } from "@/app/components/XPDisplay";
import BadgeShowcase from "@/app/components/BadgeShowcase";

export function ModuleResultsStep({ module }: { module: BootcampModule }) {
  const t = useTranslations("bootcamp");
  const tDocs = useTranslations("docs");
  const { fireConfetti, showXPGain, showBadgeToast } = useCelebration();

  const [newBadgeIds, setNewBadgeIds] = useState<Set<string>>(new Set());
  const [earnedBadges, setEarnedBadges] = useState<BadgeDef[]>([]);
  const [moduleXP, setModuleXP] = useState(0);
  const [level, setLevel] = useState(getCurrentLevel());
  const [initialized, setInitialized] = useState(false);

  const hasQuiz = Boolean(getQuizForModule(module.slug));
  const bestAttempt = useMemo(() => getBestQuizAttempt(module.slug), [module.slug]);

  const nextModule = useMemo(() => {
    const idx = bootcampCatalog.findIndex((m) => m.slug === module.slug);
    return idx >= 0 && idx < bootcampCatalog.length - 1
      ? bootcampCatalog[idx + 1]
      : undefined;
  }, [module.slug]);

  // On mount: fire confetti, award XP, check badges
  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    // Fire confetti celebration
    fireConfetti();

    // Award module_complete XP if not already awarded
    if (!hasXPEvent("module_complete", module.slug)) {
      const result = addXP("module_complete", module.slug);
      showXPGain(result.xpGained);
      if (result.leveledUp) {
        // Level up is handled by the celebration provider
      }
    }

    // Check and award any new badges
    const newBadges = checkAndAwardBadges({
      moduleSlug: module.slug,
      completedModules: [module.slug],
      tourCompleted: true,
      allBestChoices: false,
    });

    if (newBadges.length > 0) {
      const ids = new Set(newBadges.map((b) => b.id));
      setNewBadgeIds(ids);

      // Show badge toast for first new badge
      showBadgeToast({
        icon: newBadges[0].icon,
        name: t(newBadges[0].nameKey),
      });
    }

    // Refresh state after awards
    setEarnedBadges(getEarnedBadgeDefs());
    setModuleXP(getModuleXP(module.slug));
    setLevel(getCurrentLevel());
  }, [initialized, module.slug, fireConfetti, showXPGain, showBadgeToast, t]);

  // Refresh earned badges on mount (for when already initialized)
  useEffect(() => {
    setEarnedBadges(getEarnedBadgeDefs());
    setModuleXP(getModuleXP(module.slug));
    setLevel(getCurrentLevel());
  }, [module.slug]);

  return (
    <div className="space-y-6 animate-content-enter">
      {/* Trophy + Congrats Header */}
      <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-teal-50 p-8 sm:p-10 shadow-sm text-center">
        <div className="text-5xl mb-4 animate-content-enter">🏆</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t("resultsStep.congratsTitle")}
        </h2>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          {t("resultsStep.congratsDesc", { module: tDocs(module.titleKey) })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Quiz Score */}
        {hasQuiz && bestAttempt && (
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
              {t("resultsStep.bestScore")}
            </p>
            <p className="text-2xl font-bold text-teal-700">{bestAttempt.percent}%</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {bestAttempt.score}/{bestAttempt.total} {t("resultsStep.correct")}
            </p>
          </div>
        )}

        {/* XP Earned in Module */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            XP Earned
          </p>
          <p className="text-2xl font-bold text-amber-600">{moduleXP}</p>
          <p className="text-xs text-gray-400 mt-0.5">in this module</p>
        </div>

        {/* Current Level */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            Level
          </p>
          <p className="text-2xl font-bold text-indigo-600">{level.level}</p>
          <p className="text-xs text-gray-400 mt-0.5">{t(level.nameKey)}</p>
        </div>

        {/* Badges Earned */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            Badges
          </p>
          <p className="text-2xl font-bold text-rose-600">{earnedBadges.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">earned so far</p>
        </div>
      </div>

      {/* XP Bar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Overall Progress</h3>
        <XPBar />
      </div>

      {/* Badge Showcase */}
      {earnedBadges.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Badges</h3>
          <BadgeShowcase
            badges={earnedBadges.map((b) => ({
              ...b,
              isNew: newBadgeIds.has(b.id),
            }))}
          />
        </div>
      )}

      {/* Motivational Message */}
      <div className="rounded-xl bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-100 p-5 text-center">
        <p className="text-lg font-semibold text-teal-800">
          You&apos;re ready to teach with VR!
        </p>
      </div>

      {/* Next Module Card */}
      {nextModule && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">
            {t("resultsStep.upNext")}
          </p>
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {tDocs(nextModule.titleKey)}
          </h3>
          <Link
            href={`/bootcamp/module/${nextModule.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
          >
            {t("resultsStep.nextModule", { module: tDocs(nextModule.titleKey) })}
            <span aria-hidden>→</span>
          </Link>
        </div>
      )}

      {/* Back to Bootcamp */}
      <div className="flex justify-center">
        <Link
          href="/bootcamp"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-teal-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
        >
          ← {t("actions.backToBootcamp")}
        </Link>
      </div>
    </div>
  );
}
