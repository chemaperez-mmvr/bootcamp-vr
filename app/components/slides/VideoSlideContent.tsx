"use client";

import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { useLocale } from "next-intl";
import type { VideoSlide } from "@/app/bootcamp/slides";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function PlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function VolumeOnIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function VolumeOffIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

function FullscreenIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  );
}

function ReplayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function VideoSlideContent({
  slide,
  t,
  onEnded,
}: {
  slide: VideoSlide;
  t: (key: string) => string;
  onEnded?: () => void;
}) {
  const locale = useLocale();
  const resolvedVideoUrl = useMemo(
    () => slide.videoUrl?.replace("{locale}", locale),
    [slide.videoUrl, locale]
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* ---- Auto-hide controls while playing ---- */
  const scheduleHide = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowControls(true);
    hideTimeout.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 2500);
  }, []);

  const handleMouseMove = useCallback(() => {
    scheduleHide();
  }, [scheduleHide]);

  /* ---- Play / Pause ---- */
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  }, []);

  /* ---- Seek on progress bar click ---- */
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const v = videoRef.current;
      const bar = progressRef.current;
      if (!v || !bar || duration === 0) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      v.currentTime = ratio * duration;
    },
    [duration]
  );

  /* ---- Mute ---- */
  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  /* ---- Fullscreen ---- */
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  /* ---- Replay ---- */
  const replay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
    setEnded(false);
  }, []);

  /* ---- Video event listeners ---- */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => { setPlaying(true); scheduleHide(); };
    const onPause = () => { setPlaying(false); setShowControls(true); };
    const onTimeUpdate = () => setCurrentTime(v.currentTime);
    const onLoadedMetadata = () => setDuration(v.duration);
    const onVideoEnded = () => {
      setEnded(true);
      setPlaying(false);
      setShowControls(true);
      onEnded?.();
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("ended", onVideoEnded);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("ended", onVideoEnded);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [onEnded, scheduleHide]);

  if (!resolvedVideoUrl) {
    // Placeholder when no video URL yet
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 px-6 py-12 sm:px-8 sm:py-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
            <PlayIcon className="w-10 h-10 text-white/70" />
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

  return (
    <div className="rounded-2xl border border-gray-200 bg-black shadow-sm overflow-hidden">
      {/* Video container */}
      <div
        ref={containerRef}
        className="relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { if (playing) setShowControls(false); }}
        onClick={(e) => {
          // Don't toggle play when clicking controls
          if ((e.target as HTMLElement).closest("[data-controls]")) return;
          togglePlay();
        }}
      >
        <video
          ref={videoRef}
          src={resolvedVideoUrl}
          playsInline
          aria-label={t(slide.titleKey)}
          className="w-full aspect-video"
        />

        {/* Big center play button (when paused & not ended) */}
        {!playing && !ended && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform hover:scale-110">
              <PlayIcon className="w-7 h-7 sm:w-9 sm:h-9 text-gray-900 ml-1" />
            </div>
          </div>
        )}

        {/* Replay overlay when ended */}
        {ended && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); replay(); }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            >
              <ReplayIcon className="w-7 h-7 sm:w-9 sm:h-9 text-gray-900" />
            </button>
          </div>
        )}

        {/* Bottom controls bar */}
        <div
          data-controls
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-4 transition-opacity duration-300 ${
            showControls || !playing ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group/progress"
            onClick={(e) => { e.stopPropagation(); handleProgressClick(e); }}
          >
            <div
              className="h-full bg-teal-400 rounded-full relative transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-sm opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="text-white hover:text-teal-300 transition-colors"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </button>

            <span className="text-xs text-white/70 font-medium tabular-nums min-w-[80px]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex-1" />

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="text-white hover:text-teal-300 transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeOffIcon className="w-5 h-5" /> : <VolumeOnIcon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              className="text-white hover:text-teal-300 transition-colors"
              aria-label="Fullscreen"
            >
              <FullscreenIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Title below video */}
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
