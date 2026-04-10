"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { TheorySlide } from "@/app/bootcamp/slides";
import { VideoSlideContent } from "@/app/components/slides/VideoSlideContent";
import { ContentSlideContent } from "@/app/components/slides/ContentSlideContent";

/* ================================================================== */
/*  Main slider                                                        */
/* ================================================================== */

export function TheorySliderStep({
  slides,
  onComplete,
}: {
  slides: TheorySlide[];
  onComplete: () => void;
}) {
  const t = useTranslations("bootcamp");
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const slide = slides[current];
  const isLast = current === total - 1;
  const isFirst = current === 0;

  const goNext = useCallback(() => {
    if (isLast) {
      onComplete();
    } else {
      setCurrent((i) => Math.min(i + 1, total - 1));
    }
  }, [isLast, onComplete, total]);

  const goPrev = useCallback(() => {
    setCurrent((i) => Math.max(i - 1, 0));
  }, []);

  if (!slide) return null;

  return (
    <div className="space-y-6 animate-content-enter">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-500 shrink-0 tabular-nums">
          {t("slides.progress", { current: current + 1, total })}
        </span>
      </div>

      {/* Slide content — dispatched by type */}
      {slide.type === "video" ? (
        <VideoSlideContent slide={slide} t={t} />
      ) : (
        <ContentSlideContent slide={slide} t={t} />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
            isFirst
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span aria-hidden>←</span>
          {t("slides.prev")}
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                s.type === "video" ? "w-3.5 h-2.5" : "w-2.5 h-2.5"
              } ${
                i === current
                  ? "bg-teal-500 scale-125"
                  : i < current
                    ? "bg-teal-300"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          {isLast ? t("slides.startQuiz") : t("slides.next")}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
