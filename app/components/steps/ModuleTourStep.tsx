"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { QuestTourInteractive } from "../QuestTourInteractive";
import { addXP, hasXPEvent, XP_VALUES } from "@/app/bootcamp/xp";
import { useCelebration } from "@/app/components/Celebrations";

export function ModuleTourStep({
  moduleSlug,
  onComplete,
  onContinue,
  isCompleted,
}: {
  moduleSlug: string;
  onComplete: () => void;
  onContinue: () => void;
  isCompleted: boolean;
}) {
  const t = useTranslations("bootcamp");
  const [justCompleted, setJustCompleted] = useState(false);
  const { showXPGain } = useCelebration();

  function handleTourComplete() {
    if (!isCompleted) {
      onComplete();
      setJustCompleted(true);
    }
  }

  // Award XP when tour is first completed
  useEffect(() => {
    if ((isCompleted || justCompleted) && !hasXPEvent("tour_complete", moduleSlug)) {
      const result = addXP("tour_complete", moduleSlug);
      showXPGain(result.xpGained);
    }
  }, [isCompleted, justCompleted, moduleSlug, showXPGain]);

  return (
    <div className="space-y-6 animate-content-enter">
      <QuestTourInteractive onComplete={handleTourComplete} />

      {(isCompleted || justCompleted) && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm text-center">
          <div className="text-3xl mb-2">✓</div>
          <p className="text-green-800 font-semibold text-lg">{t("tourStep.completedTitle")}</p>
          <p className="text-green-700 text-sm mt-1">{t("tourStep.completedDesc")}</p>
          <button
            type="button"
            onClick={onContinue}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
          >
            {t("tourStep.continueButton")}
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
