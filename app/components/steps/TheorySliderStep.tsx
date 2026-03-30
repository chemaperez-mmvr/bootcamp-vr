"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import type { TheorySlide, VideoSlide, ContentSlide } from "@/app/bootcamp/slides";

/* ================================================================== */
/*  Video slide renderer                                               */
/* ================================================================== */

function VideoSlideContent({
  slide,
  t,
}: {
  slide: VideoSlide;
  t: ReturnType<typeof useTranslations>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (slide.videoUrl) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-black shadow-sm overflow-hidden">
        <video
          ref={videoRef}
          src={slide.videoUrl}
          controls
          playsInline
          className="w-full aspect-video"
          controlsList="nodownload"
        >
          <track kind="captions" />
        </video>
        <div className="bg-white px-6 py-5 sm:px-8">
          <h2 className="text-xl font-bold text-gray-900">
            {t(slide.titleKey)}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {t(slide.subtitleKey)}
          </p>
        </div>
      </div>
    );
  }

  // Placeholder when no video URL yet
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 px-6 py-12 sm:px-8 sm:py-16 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
          <svg className="w-10 h-10 text-white/70" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {t(slide.titleKey)}
        </h2>
        <p className="mt-3 text-gray-400 text-sm max-w-md">
          {t(slide.subtitleKey)}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/60 text-xs font-medium">
          {t("slides.videoComingSoon")}
        </span>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Content slide renderer                                             */
/* ================================================================== */

function ContentSlideContent({
  slide,
  t,
}: {
  slide: ContentSlide;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
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
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
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
          className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors ${
            isFirst
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 bg-gray-100 hover:bg-gray-200"
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
              className={`rounded-full transition-all duration-300 ${
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
          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors shadow-sm text-white bg-teal-600 hover:bg-teal-700"
        >
          {isLast ? t("slides.startQuiz") : t("slides.next")}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
