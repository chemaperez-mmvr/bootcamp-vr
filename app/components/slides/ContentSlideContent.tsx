"use client";

import type { ContentSlide } from "@/app/bootcamp/slides";

export function ContentSlideContent({
  slide,
  t,
  emphasis,
}: {
  slide: ContentSlide;
  t: (key: string) => string;
  /** When true, the insight card pulses to draw attention (micro-check retry). */
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden ${
        emphasis ? "animate-insight-emphasis" : ""
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 px-6 py-8 sm:px-8 sm:py-10">
        <p className="text-teal-200 text-sm font-medium mb-2">
          {t(slide.subtitleKey)}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {t(slide.titleKey)}
        </h2>
      </div>

      {/* Points */}
      <div className="px-6 py-6 sm:px-8 sm:py-8 space-y-4">
        {slide.points.map((point, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
          >
            <span className="text-2xl shrink-0 mt-0.5" aria-hidden>
              {point.icon}
            </span>
            <p className="text-base text-gray-800 leading-relaxed">
              {t(point.key)}
            </p>
          </div>
        ))}
      </div>

      {/* Highlight / takeaway */}
      <div className="mx-6 mb-6 sm:mx-8 sm:mb-8 rounded-xl bg-amber-50 border border-amber-200 p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0" aria-hidden>💡</span>
          <p className="text-sm font-semibold text-amber-900 leading-relaxed">
            {t(slide.highlightKey)}
          </p>
        </div>
      </div>
    </div>
  );
}
