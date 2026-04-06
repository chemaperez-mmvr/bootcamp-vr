"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { QuestTourInteractive } from "../QuestTourInteractive";
import { IconCheck } from "@/app/components/icons";

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

  function handleTourComplete() {
    if (!isCompleted) {
      onComplete();
      setJustCompleted(true);
    }
  }

  return (
    <div className="space-y-6 animate-content-enter">
      <QuestTourInteractive onComplete={handleTourComplete} />

      {(isCompleted || justCompleted) && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm text-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white mx-auto mb-3">
            <IconCheck className="w-5 h-5" />
          </div>
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
