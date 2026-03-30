"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Hotspot = {
  id: string;
  hotspotXPercent: number;
  hotspotYPercent: number;
  cardXPercent: number;
  cardYPercent: number;
  cardAnchor: "left" | "right";
  partName: string;
  title: string;
  description: string;
};

type TourStep = {
  id: string;
  startTime: number;
  pauseTime: number;
  hotspots: Hotspot[];
};

const tourSteps: TourStep[] = [
  {
    id: "quest3-overview",
    startTime: 0,
    pauseTime: 2,
    hotspots: [
      {
        id: "overview",
        hotspotXPercent: 50,
        hotspotYPercent: 46,
        cardXPercent: 12,
        cardYPercent: 8,
        cardAnchor: "left",
        partName: "Quest 3",
        title: "interactiveTour.phase1.title",
        description: "interactiveTour.phase1.description",
      },
    ],
  },
  {
    id: "cameras",
    startTime: 2,
    pauseTime: 6,
    hotspots: [
      {
        id: "cameras",
        hotspotXPercent: 50,
        hotspotYPercent: 42,
        cardXPercent: 60,
        cardYPercent: 8,
        cardAnchor: "left",
        partName: "Cameras",
        title: "interactiveTour.phase2.title",
        description: "interactiveTour.phase2.description",
      },
    ],
  },
  {
    id: "ipd-button",
    startTime: 6,
    pauseTime: 9,
    hotspots: [
      {
        id: "ipd",
        hotspotXPercent: 46,
        hotspotYPercent: 58,
        cardXPercent: 55,
        cardYPercent: 10,
        cardAnchor: "left",
        partName: "IPD",
        title: "interactiveTour.phase3.title",
        description: "interactiveTour.phase3.description",
      },
    ],
  },
  {
    id: "power-audio",
    startTime: 9,
    pauseTime: 13,
    hotspots: [
      {
        id: "power",
        hotspotXPercent: 47,
        hotspotYPercent: 56,
        cardXPercent: 4,
        cardYPercent: 4,
        cardAnchor: "left",
        partName: "Power",
        title: "interactiveTour.phase4a.title",
        description: "interactiveTour.phase4a.description",
      },
      {
        id: "audio",
        hotspotXPercent: 39,
        hotspotYPercent: 85,
        cardXPercent: 56,
        cardYPercent: 4,
        cardAnchor: "left",
        partName: "Audio",
        title: "interactiveTour.phase4b.title",
        description: "interactiveTour.phase4b.description",
      },
    ],
  },
  {
    id: "power-led",
    startTime: 13,
    pauseTime: 15.7,
    hotspots: [
      {
        id: "power-led",
        hotspotXPercent: 40,
        hotspotYPercent: 48,
        cardXPercent: 55,
        cardYPercent: 8,
        cardAnchor: "left",
        partName: "LED",
        title: "interactiveTour.phase5.title",
        description: "interactiveTour.phase5.description",
      },
    ],
  },
  {
    id: "head-strap",
    startTime: 15.7,
    pauseTime: 18.5,
    hotspots: [
      {
        id: "strap",
        hotspotXPercent: 50,
        hotspotYPercent: 40,
        cardXPercent: 4,
        cardYPercent: 6,
        cardAnchor: "left",
        partName: "Head Strap",
        title: "interactiveTour.phase6.title",
        description: "interactiveTour.phase6.description",
      },
    ],
  },
  {
    id: "usb-c",
    startTime: 18.5,
    pauseTime: 23,
    hotspots: [
      {
        id: "usb-c",
        hotspotXPercent: 45,
        hotspotYPercent: 48,
        cardXPercent: 55,
        cardYPercent: 6,
        cardAnchor: "left",
        partName: "USB-C",
        title: "interactiveTour.phase7.title",
        description: "interactiveTour.phase7.description",
      },
    ],
  },
  {
    id: "controller",
    startTime: 23,
    pauseTime: 27.8,
    hotspots: [
      {
        id: "btn-y",
        hotspotXPercent: 38,
        hotspotYPercent: 24,
        cardXPercent: 3,
        cardYPercent: 3,
        cardAnchor: "left",
        partName: "Y",
        title: "interactiveTour.phase8a.title",
        description: "interactiveTour.phase8a.description",
      },
      {
        id: "btn-x",
        hotspotXPercent: 54,
        hotspotYPercent: 24,
        cardXPercent: 58,
        cardYPercent: 3,
        cardAnchor: "left",
        partName: "X",
        title: "interactiveTour.phase8b.title",
        description: "interactiveTour.phase8b.description",
      },
      {
        id: "thumbstick",
        hotspotXPercent: 34,
        hotspotYPercent: 54,
        cardXPercent: 3,
        cardYPercent: 55,
        cardAnchor: "left",
        partName: "Thumbstick",
        title: "interactiveTour.phase8c.title",
        description: "interactiveTour.phase8c.description",
      },
      {
        id: "menu-btn",
        hotspotXPercent: 55,
        hotspotYPercent: 54,
        cardXPercent: 58,
        cardYPercent: 55,
        cardAnchor: "left",
        partName: "Menu",
        title: "interactiveTour.phase8d.title",
        description: "interactiveTour.phase8d.description",
      },
    ],
  },
  {
    id: "trigger",
    startTime: 27.8,
    pauseTime: 29.8,
    hotspots: [
      {
        id: "trigger",
        hotspotXPercent: 42,
        hotspotYPercent: 42,
        cardXPercent: 55,
        cardYPercent: 6,
        cardAnchor: "left",
        partName: "Trigger",
        title: "interactiveTour.phase9.title",
        description: "interactiveTour.phase9.description",
      },
    ],
  },
  {
    id: "grip",
    startTime: 29.8,
    pauseTime: 32,
    hotspots: [
      {
        id: "grip",
        hotspotXPercent: 42,
        hotspotYPercent: 46,
        cardXPercent: 55,
        cardYPercent: 6,
        cardAnchor: "left",
        partName: "Grip",
        title: "interactiveTour.phase10.title",
        description: "interactiveTour.phase10.description",
      },
    ],
  },
  {
    id: "full-kit",
    startTime: 32,
    pauseTime: 37,
    hotspots: [
      {
        id: "full-kit",
        hotspotXPercent: 50,
        hotspotYPercent: 45,
        cardXPercent: 56,
        cardYPercent: 8,
        cardAnchor: "left",
        partName: "Quest 3 Kit",
        title: "interactiveTour.phase11.title",
        description: "interactiveTour.phase11.description",
      },
    ],
  },
];

function HotspotDot({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <span className="block w-3 h-3 rounded-full bg-teal-500 shadow-md" />
      <span className="absolute inset-0 w-3 h-3 rounded-full bg-teal-400 animate-ping opacity-75" />
    </div>
  );
}

function HotspotCard({
  hotspot,
  titleText,
  descriptionText,
  hasPrev,
  hasNext,
  prevLabel,
  nextLabel,
  closeLabel,
  onPrev,
  onNext,
  onClose,
}: {
  hotspot: Hotspot;
  titleText: string;
  descriptionText: string;
  hasPrev: boolean;
  hasNext: boolean;
  prevLabel: string;
  nextLabel: string;
  closeLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const cardLeft = hotspot.cardAnchor === "left" ? `${hotspot.cardXPercent}%` : undefined;
  const cardRight = hotspot.cardAnchor === "right" ? `${100 - hotspot.cardXPercent}%` : undefined;

  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1={hotspot.hotspotXPercent}
          y1={hotspot.hotspotYPercent}
          x2={hotspot.cardAnchor === "left" ? hotspot.cardXPercent + 14 : hotspot.cardXPercent - 14}
          y2={hotspot.cardYPercent + 6}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.18"
        />
      </svg>

      <aside
        className="absolute z-20 w-[54%] sm:w-[46%] max-w-xs rounded-[20px] bg-white/85 backdrop-blur-xl p-4 sm:p-5 shadow-2xl ring-1 ring-black/5 tour-card-enter"
        style={{ left: cardLeft, right: cardRight, top: `${hotspot.cardYPercent}%` }}
      >
        <p className="text-[10px] sm:text-[11px] font-semibold text-teal-600 uppercase tracking-[0.14em]">
          {hotspot.partName}
        </p>
        <h3 className="mt-1.5 text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug">
          {titleText}
        </h3>
        <p className="mt-1.5 text-xs sm:text-[13px] text-gray-600 leading-relaxed">{descriptionText}</p>

        <div className="mt-4 flex items-center gap-1.5">
          {hasPrev ? (
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] sm:text-xs font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <span aria-hidden>←</span>
              {prevLabel}
            </button>
          ) : null}
          {hasNext ? (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-colors"
            >
              {nextLabel}
              <span aria-hidden>→</span>
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-400 bg-gray-100 hover:bg-gray-200 transition-colors text-xs"
            aria-label={closeLabel}
          >
            ✕
          </button>
        </div>
      </aside>
    </>
  );
}

function StepOverlay({
  step,
  t,
  hasPrev,
  hasNext,
  prevLabel,
  nextLabel,
  closeLabel,
  onPrev,
  onNext,
}: {
  step: TourStep;
  t: ReturnType<typeof useTranslations>;
  hasPrev: boolean;
  hasNext: boolean;
  prevLabel: string;
  nextLabel: string;
  closeLabel: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  const visibleHotspots = step.hotspots.filter((h) => !hiddenIds.has(h.id));
  const showNavOnFirst = step.hotspots.length === 1 || visibleHotspots[0]?.id === step.hotspots[0]?.id;

  return (
    <>
      {step.hotspots.map((hotspot) => (
        <div key={hotspot.id}>
          <HotspotDot x={hotspot.hotspotXPercent} y={hotspot.hotspotYPercent} />

          {hiddenIds.has(hotspot.id) ? (
            <button
              type="button"
              onClick={() => {
                setHiddenIds((prev) => {
                  const next = new Set(prev);
                  next.delete(hotspot.id);
                  return next;
                });
              }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 border-teal-400/60 bg-transparent cursor-pointer hover:bg-teal-500/10 transition-colors"
              style={{ left: `${hotspot.hotspotXPercent}%`, top: `${hotspot.hotspotYPercent}%` }}
              aria-label={hotspot.partName}
            />
          ) : (
            <HotspotCard
              hotspot={hotspot}
              titleText={t(hotspot.title)}
              descriptionText={t(hotspot.description)}
              hasPrev={hasPrev && showNavOnFirst && hotspot.id === visibleHotspots[0]?.id}
              hasNext={hasNext && hotspot.id === visibleHotspots[0]?.id}
              prevLabel={prevLabel}
              nextLabel={nextLabel}
              closeLabel={closeLabel}
              onPrev={onPrev}
              onNext={onNext}
              onClose={() => {
                setHiddenIds((prev) => new Set(prev).add(hotspot.id));
              }}
            />
          )}
        </div>
      ))}
    </>
  );
}

export function QuestTourInteractive({ onComplete }: { onComplete?: () => void }) {
  const t = useTranslations("bootcamp");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pausedAtStepRef = useRef(false);
  const rewindRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const landAtPauseRef = useRef(false);
  const continuePlayRef = useRef(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPausedAtStep, setIsPausedAtStep] = useState(false);

  const currentStep = useMemo(() => tourSteps[stepIndex], [stepIndex]);
  const hasPrevStep = stepIndex > 0;
  const hasNextStep = stepIndex < tourSteps.length - 1;

  const hasReportedCompletionRef = useRef(false);

  useEffect(() => {
    if (!onComplete) return;
    if (hasReportedCompletionRef.current) return;
    if (isPausedAtStep && stepIndex === tourSteps.length - 1) {
      hasReportedCompletionRef.current = true;
      onComplete();
    }
  }, [onComplete, isPausedAtStep, stepIndex]);

  useEffect(() => {
    return () => {
      if (rewindRef.current) {
        clearInterval(rewindRef.current);
        rewindRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentStep) return;

    if (landAtPauseRef.current) {
      landAtPauseRef.current = false;
      video.currentTime = currentStep.pauseTime;
      video.pause();
      video.playbackRate = 1;
      pausedAtStepRef.current = true;
      setIsPausedAtStep(true);
      return;
    }

    const shouldContinue = continuePlayRef.current;
    continuePlayRef.current = false;

    pausedAtStepRef.current = false;
    setIsPausedAtStep(false);
    video.playbackRate = 2.5;

    let rafId: number | null = null;

    function checkPause() {
      if (pausedAtStepRef.current || !video) return;
      if (video.currentTime >= currentStep.pauseTime) {
        video.pause();
        video.currentTime = currentStep.pauseTime;
        video.playbackRate = 1;
        pausedAtStepRef.current = true;
        setIsPausedAtStep(true);
        return;
      }
      rafId = requestAnimationFrame(checkPause);
    }

    if (shouldContinue) {
      rafId = requestAnimationFrame(checkPause);
      return () => { if (rafId !== null) cancelAnimationFrame(rafId); };
    }

    const onLoadedMetadata = () => {
      if (video.currentTime < currentStep.startTime) {
        video.currentTime = currentStep.startTime;
      }
      void video.play().catch(() => {});
      rafId = requestAnimationFrame(checkPause);
    };

    if (video.readyState >= 1) onLoadedMetadata();
    else video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [currentStep]);

  function stopRewind(): void {
    if (rewindRef.current) {
      clearInterval(rewindRef.current);
      rewindRef.current = null;
    }
  }

  function goToStep(targetIndex: number): void {
    stopRewind();
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(targetIndex, tourSteps.length - 1));
    const target = tourSteps[clamped];

    landAtPauseRef.current = false;
    pausedAtStepRef.current = false;
    setIsPausedAtStep(false);
    setStepIndex(clamped);
    video.currentTime = target.startTime;
    video.playbackRate = 2.5;
    void video.play().catch(() => {});
  }

  function goNext(): void {
    if (!hasNextStep) return;
    stopRewind();
    const video = videoRef.current;
    if (!video) return;

    continuePlayRef.current = true;
    landAtPauseRef.current = false;
    pausedAtStepRef.current = false;
    setIsPausedAtStep(false);
    setStepIndex(stepIndex + 1);
    video.playbackRate = 2.5;
    void video.play().catch(() => {});
  }

  function goPrev(): void {
    if (!hasPrevStep) return;
    stopRewind();

    const video = videoRef.current;
    if (!video) return;

    const prevIndex = stepIndex - 1;
    const target = tourSteps[prevIndex];
    const destination = target.pauseTime;

    video.pause();
    setIsPausedAtStep(false);

    const STEP_SEC = 0.05;
    const INTERVAL_MS = 20;

    rewindRef.current = setInterval(() => {
      if (video.currentTime <= destination) {
        stopRewind();
        video.currentTime = destination;
        pausedAtStepRef.current = true;
        landAtPauseRef.current = true;
        setStepIndex(prevIndex);
        return;
      }
      video.currentTime = Math.max(destination, video.currentTime - STEP_SEC);
    }, INTERVAL_MS);
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      <header className="mb-3 sm:mb-4">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
          {t("interactiveTour.label")}
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{t("interactiveTour.heading")}</h2>
        <p className="mt-1.5 text-sm text-gray-600">{t("interactiveTour.subtitle")}</p>
      </header>

      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black">
        <video
          ref={videoRef}
          className="w-full h-auto"
          src="/quest-tour-model.mp4"
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
        />

        {isPausedAtStep ? (
          <StepOverlay
            key={currentStep.id}
            step={currentStep}
            t={t}
            hasPrev={hasPrevStep}
            hasNext={hasNextStep}
            prevLabel={t("interactiveTour.prev")}
            nextLabel={t("interactiveTour.next")}
            closeLabel={t("interactiveTour.close")}
            onPrev={goPrev}
            onNext={goNext}
          />
        ) : null}

        {isPausedAtStep && !hasNextStep ? (
          <button
            type="button"
            onClick={() => goToStep(0)}
            className="absolute bottom-4 right-4 z-30 inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-600/90 backdrop-blur-sm rounded-full hover:bg-teal-700 transition-colors shadow-lg"
          >
            <span aria-hidden>↺</span>
            {t("interactiveTour.restart")}
          </button>
        ) : null}
      </div>

    </section>
  );
}
