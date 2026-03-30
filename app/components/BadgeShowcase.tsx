"use client";

import { useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BadgeItem = {
  id: string;
  icon: string;
  nameKey: string;
  descriptionKey: string;
  isNew?: boolean;
};

type BadgeShowcaseProps = {
  badges: BadgeItem[];
  className?: string;
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BadgeShowcase({
  badges,
  className = "",
}: BadgeShowcaseProps) {
  const t = useTranslations("bootcamp");

  if (badges.length === 0) {
    return (
      <div
        className={`rounded-xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-400 ${className}`}
      >
        <div className="text-4xl mb-2">🏅</div>
        <p className="text-sm font-medium">
          {t("badges.emptyState")}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}
    >
      {badges.map((badge) => (
        <BadgeCard key={badge.id} badge={badge} t={t} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge Card                                                         */
/* ------------------------------------------------------------------ */

function BadgeCard({
  badge,
  t,
}: {
  badge: BadgeItem;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      className="relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md"
      style={{
        ...(badge.isNew
          ? {
              borderColor: "#fbbf24",
              boxShadow: "0 0 12px rgba(251,191,36,0.2)",
            }
          : {}),
      }}
    >
      {/* NEW shimmer badge */}
      {badge.isNew && <NewShimmer />}

      {/* Icon */}
      <div className="text-3xl mb-1.5 leading-none">{badge.icon}</div>

      {/* Name */}
      <div className="font-semibold text-sm text-gray-800 leading-tight">
        {t(badge.nameKey)}
      </div>

      {/* Description */}
      <div className="text-xs text-gray-600 mt-0.5 leading-snug">
        {t(badge.descriptionKey)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NEW shimmer tag                                                    */
/* ------------------------------------------------------------------ */

function NewShimmer() {
  return (
    <span
      className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white select-none"
      style={{
        background: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)",
        backgroundSize: "200% auto",
        animation: "cel-shimmer 1.5s linear infinite",
        boxShadow: "0 0 8px rgba(251,191,36,0.5)",
      }}
    >
      NEW
    </span>
  );
}
