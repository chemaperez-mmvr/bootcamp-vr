import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { bootcampCatalog } from "@/app/bootcamp/catalog";
import { useTranslations } from "next-intl";
import { IconClock } from "./icons";

/* ═══════════════════════════════════════════════════════════════════
   Module Card — glassmorphic design for video background
   ═══════════════════════════════════════════════════════════════════ */

export function ModuleCard({
  module,
  progress,
  moduleMinutes,
  tBootcamp,
  tDocs,
}: {
  module: (typeof bootcampCatalog)[number];
  progress: { completed: number; total: number; status: string; percent: number };
  moduleMinutes: number;
  tBootcamp: ReturnType<typeof useTranslations>;
  tDocs: ReturnType<typeof useTranslations>;
}) {
  const statusColors: Record<string, string> = {
    completed: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
    in_progress: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    not_started: "bg-white/10 text-gray-300 border border-white/20",
  };

  /* ── Disabled / placeholder card ── */
  if (!module.enabled) {
    return (
      <article className="overflow-hidden rounded-xl border border-dashed border-white/15 bg-white/5 shadow-none select-none backdrop-blur-lg">
        {/* Image */}
        <div className="relative h-28 sm:h-36 md:h-40 w-full overflow-hidden">
          {module.heroImage ? (
            <Image
              src={module.heroImage}
              alt=""
              fill
              className="object-cover grayscale opacity-30"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-700 to-gray-800" />
          )}
          <div className="absolute inset-0 bg-black/50" />

          <span className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full bg-white/15 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-300 backdrop-blur-sm">
            {tBootcamp("status.coming_soon" as Parameters<typeof tBootcamp>[0])}
          </span>
        </div>

        {/* Body */}
        <div className="p-3 sm:p-4 md:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-300 leading-snug">
            {tDocs(module.titleKey as Parameters<typeof tDocs>[0])}
          </h3>
          <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm leading-relaxed text-gray-400 line-clamp-2">
            {tDocs(module.descriptionKey as Parameters<typeof tDocs>[0])}
          </p>

          <div className="mt-3 sm:mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10" />

          <span className="mt-3 sm:mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-400 cursor-not-allowed border border-white/10">
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            {tBootcamp("status.coming_soon" as Parameters<typeof tBootcamp>[0])}
          </span>
        </div>
      </article>
    );
  }

  /* ── Enabled card (glassmorphic) ── */
  return (
    <article className="overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-lg shadow-black/10 backdrop-blur-xl transition-all hover:bg-white/15 hover:shadow-xl hover:shadow-black/20">
      {/* Hero image */}
      <div className="relative h-28 sm:h-36 md:h-40 w-full overflow-hidden">
        {module.heroImage ? (
          <Image
            src={module.heroImage}
            alt=""
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-teal-600 to-cyan-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Status badge */}
        <span
          className={`absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium backdrop-blur-sm ${
            statusColors[progress.status] ?? statusColors.not_started
          }`}
        >
          {tBootcamp(`status.${progress.status}` as Parameters<typeof tBootcamp>[0])}
        </span>
      </div>

      {/* Card body */}
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
          {tDocs(module.titleKey as Parameters<typeof tDocs>[0])}
        </h3>
        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm leading-relaxed text-gray-300 line-clamp-2">
          {tDocs(module.descriptionKey as Parameters<typeof tDocs>[0])}
        </p>

        {/* Progress bar */}
        <div className="mt-3 sm:mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        {/* Progress text */}
        <div className="mt-1.5 sm:mt-2 text-xs text-gray-400">
          <span>
            {progress.completed}/{progress.total} ({progress.percent}%)
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/bootcamp/module/${module.slug}`}
          className="mt-3 sm:mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600/30 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-teal-300 transition-colors hover:bg-teal-600/50 border border-teal-500/30"
        >
          {progress.completed > 0
            ? tBootcamp("actions.resume")
            : tBootcamp("actions.start")}
          <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
    </article>
  );
}
