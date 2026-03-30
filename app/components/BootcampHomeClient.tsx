"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bootcampCatalog } from "@/app/bootcamp/catalog";
import { getGlobalProgress, getModuleProgress } from "@/app/bootcamp/progress";
import { getNextRecommendedLesson } from "@/app/bootcamp/recommendation";
import { IconCheck, IconClock, IconTarget } from "./icons";

type ModuleProgress = ReturnType<typeof getModuleProgress>;
type HomeFilter = "all" | "not_started" | "in_progress" | "completed";

export function BootcampHomeClient() {
  const tBootcamp = useTranslations("bootcamp");
  const tDocs = useTranslations("docs");
  const [hydrated, setHydrated] = useState(false);
  const [globalProgress, setGlobalProgress] = useState({ completed: 0, total: 0, percent: 0 });
  const [moduleProgressMap, setModuleProgressMap] = useState<Record<string, ModuleProgress>>({});
  const [activeFilter, setActiveFilter] = useState<HomeFilter>("all");

  useEffect(() => {
    const moduleEntries = Object.fromEntries(
      bootcampCatalog.map((module) => [module.slug, getModuleProgress(module.slug)])
    );
    setModuleProgressMap(moduleEntries);
    setGlobalProgress(getGlobalProgress());
    setHydrated(true);
  }, []);

  const recommendationHref = useMemo(() => {
    const next = getNextRecommendedLesson();
    if (!next) return `/bootcamp/module/${bootcampCatalog[0]?.slug ?? ""}`;
    return `/bootcamp/module/${next.moduleSlug}#${next.lessonId}`;
  }, [hydrated]);

  const modulesWithProgress = useMemo(
    () =>
      bootcampCatalog.map((module) => ({
        module,
        progress: moduleProgressMap[module.slug] ?? {
          completed: 0,
          total: module.lessons.length,
          status: "not_started" as const,
          percent: 0,
        },
      })),
    [moduleProgressMap]
  );

  const filteredModules = useMemo(
    () =>
      modulesWithProgress.filter(({ progress }) =>
        activeFilter === "all" ? true : progress.status === activeFilter
      ),
    [activeFilter, modulesWithProgress]
  );

  const featuredModule = useMemo(
    () => modulesWithProgress.find(({ progress }) => progress.status !== "completed") ?? modulesWithProgress[0],
    [modulesWithProgress]
  );

  const inProgressCount = modulesWithProgress.filter(
    ({ progress }) => progress.status === "in_progress"
  ).length;
  const completedModulesCount = modulesWithProgress.filter(
    ({ progress }) => progress.status === "completed"
  ).length;
  const totalEstimatedMinutes = bootcampCatalog.reduce(
    (sum, module) => sum + module.lessons.reduce((acc, lesson) => acc + lesson.durationMin, 0),
    0
  );

  return (
    <div className="space-y-8 animate-content-enter">
      <section className="relative min-h-[calc(100dvh-76px)] w-full overflow-hidden text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src="/hero-bootcamp.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-slate-900/50 to-slate-950/80" aria-hidden />
        <div className="bootcamp-hero-glow bootcamp-hero-glow-1" aria-hidden />
        <div className="bootcamp-hero-glow bootcamp-hero-glow-2" aria-hidden />

        <div className="relative z-10 h-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-end">
            <div className="pb-2 sm:pb-4">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100">
                {tBootcamp("eyebrow")}
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {tBootcamp("title")}
              </h1>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-cyan-50/95 leading-relaxed max-w-2xl">
                {tBootcamp("subtitle")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={recommendationHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-teal-700 bg-white rounded-xl hover:bg-teal-50 transition-colors"
                >
                  {tBootcamp("actions.continue")}
                  <span aria-hidden>→</span>
                </Link>
                {featuredModule ? (
                  <Link
                    href={`/bootcamp/module/${featuredModule.module.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white border border-white/40 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {tBootcamp("actions.resume")}
                    <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm p-5 mb-1">
              <p className="text-xs uppercase tracking-wide text-cyan-100">
                {tBootcamp("progress.global")}
              </p>
              <p className="mt-2 text-3xl font-bold">{globalProgress.percent}%</p>
              <p className="text-sm text-cyan-50">
                {globalProgress.completed}/{globalProgress.total}
              </p>

              <div className="mt-4 h-2.5 rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${globalProgress.percent}%` }}
                />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-white/15 p-2">
                  <p className="text-lg font-semibold">{completedModulesCount}</p>
                  <p className="text-[11px] text-cyan-100">{tBootcamp("stats.completed")}</p>
                </div>
                <div className="rounded-lg bg-white/15 p-2">
                  <p className="text-lg font-semibold">{inProgressCount}</p>
                  <p className="text-[11px] text-cyan-100">{tBootcamp("stats.active")}</p>
                </div>
                <div className="rounded-lg bg-white/15 p-2">
                  <p className="text-lg font-semibold">{totalEstimatedMinutes}</p>
                  <p className="text-[11px] text-cyan-100">{tBootcamp("stats.minutes")}</p>
                </div>
              </div>
            </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
        {featuredModule ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
            {tBootcamp("featured")}
          </p>
          <div className="mt-3 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                {tDocs(featuredModule.module.titleKey)}
              </h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {tDocs(featuredModule.module.descriptionKey)}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <IconTarget className="w-4 h-4 text-teal-600" />
                  {tBootcamp("progress.module", {
                    completed: featuredModule.progress.completed,
                    total: featuredModule.progress.total,
                    percent: featuredModule.progress.percent,
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IconClock className="w-4 h-4 text-teal-600" />
                  {featuredModule.module.lessons.reduce((acc, lesson) => acc + lesson.durationMin, 0)}{" "}
                  {tBootcamp("stats.minutes")}
                </span>
              </div>
            </div>
            <Link
              href={`/bootcamp/module/${featuredModule.module.slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors shrink-0"
            >
              {tBootcamp("actions.resume")}
              <span aria-hidden>→</span>
            </Link>
          </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {(["all", "not_started", "in_progress", "completed"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter === "all" ? tBootcamp("filters.all") : tBootcamp(`status.${filter}`)}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {filteredModules.map(({ module, progress }) => {
            const moduleMinutes = module.lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0);
            return (
              <article
                key={module.slug}
                className="bootcamp-module-card rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="relative w-14 h-14 rounded-full shrink-0"
                    style={{
                      background: `conic-gradient(#14b8a6 ${progress.percent}%, #e5e7eb ${progress.percent}% 100%)`,
                    }}
                    aria-hidden
                  >
                    <div className="absolute inset-[5px] rounded-full bg-white flex items-center justify-center text-sm font-semibold text-gray-700">
                      {progress.percent}%
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
                      {tBootcamp(`status.${progress.status}`)}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">
                      {tDocs(module.titleKey)}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-gray-600 leading-relaxed">{tDocs(module.descriptionKey)}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {module.lessons.map((lesson) => (
                    <span
                      key={lesson.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                    >
                      {lesson.type === "checklist" ? <IconCheck className="w-3.5 h-3.5" /> : null}
                      {tBootcamp(`lessonTypes.${lesson.type}`)}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {tBootcamp("progress.module", {
                      completed: progress.completed,
                      total: progress.total,
                      percent: progress.percent,
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconClock className="w-4 h-4 text-teal-600" />
                    {moduleMinutes} {tBootcamp("stats.minutes")}
                  </span>
                </div>

                <div className="mt-5">
                  <Link
                    href={`/bootcamp/module/${module.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                  >
                    {progress.completed > 0
                      ? tBootcamp("actions.resume")
                      : tBootcamp("actions.start")}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            );
          })}

          {filteredModules.length === 0 ? (
            <article className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600 md:col-span-2">
              {tBootcamp("filters.empty")}
            </article>
          ) : null}
        </section>
      </div>
    </div>
  );
}
