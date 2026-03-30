"use client";

import { useTranslations } from "next-intl";

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="h-5 w-24 rounded-md bg-gray-100 animate-pulse" />
      <div className="mt-3 h-5 max-w-md w-3/4 rounded bg-gray-200 animate-pulse" />
      <div className="mt-2 h-4 w-full rounded bg-gray-100 animate-pulse" />
      <div className="mt-2 h-4 w-11/12 max-w-xl rounded bg-gray-100 animate-pulse" />
      <div className="mt-4 flex flex-wrap gap-1.5">
        <div className="h-6 w-20 rounded-full bg-teal-100/90 animate-pulse" />
        <div className="h-6 w-28 rounded-full bg-teal-100/90 animate-pulse" />
        <div className="h-6 w-16 rounded-full bg-teal-50 animate-pulse" />
      </div>
    </div>
  );
}

export default function DocumentationLoading() {
  const t = useTranslations("ui");

  return (
    <div
      className="min-h-screen flex flex-col bg-white"
      role="status"
      aria-live="polite"
      aria-label={t("loadingDocs")}
    >
      <div className="flex-1 bg-white pt-10 sm:pt-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8 flex flex-col items-center gap-3">
            <div className="h-9 w-56 rounded-lg bg-gray-200 animate-pulse sm:h-10 sm:w-72" />
            <div className="h-5 w-full max-w-2xl rounded-md bg-gray-100 animate-pulse" />
            <div className="h-4 w-40 rounded-md bg-gray-100 animate-pulse" />
          </header>

          <div className="mb-10 h-36 sm:h-40 rounded-2xl border border-teal-100/80 bg-gradient-to-br from-teal-50/60 to-gray-50 animate-pulse" />

          <div className="mb-6 flex justify-center">
            <div className="h-11 w-full max-w-2xl rounded-lg border border-gray-200 bg-gray-50 animate-pulse" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 pb-12">
            <aside className="lg:w-64 shrink-0 space-y-4" aria-hidden>
              <div className="h-6 w-28 rounded-md bg-gray-200 animate-pulse" />
              <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 animate-pulse" />
              <ul className="space-y-2 pt-2 list-none p-0 m-0">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <li key={i}>
                    <div
                      className={`h-9 rounded-md bg-gray-100 animate-pulse ${
                        i === 1 ? "delay-75" : i === 2 ? "delay-150" : i === 3 ? "delay-200" : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </aside>

            <div className="flex-1 min-w-0 max-w-4xl space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
