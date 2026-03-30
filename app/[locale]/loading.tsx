"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("ui");

  return (
    <div
      className="min-h-[50vh] flex flex-col items-center justify-center gap-6 px-4 py-16 bg-white"
      role="status"
      aria-live="polite"
      aria-label={t("loading")}
    >
      <div className="relative h-12 w-12 shrink-0">
        <div
          className="absolute inset-0 rounded-full border-2 border-teal-100"
          aria-hidden
        />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-500 border-r-teal-600 animate-spin"
          aria-hidden
        />
      </div>
      <p className="text-sm font-medium text-gray-600 animate-pulse">{t("loading")}</p>
    </div>
  );
}
