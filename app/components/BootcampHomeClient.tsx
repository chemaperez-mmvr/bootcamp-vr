"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { bootcampCatalog } from "@/app/bootcamp/catalog";
import { getGlobalProgress, getModuleProgress } from "@/app/bootcamp/progress";
import { IconCheck, IconClock } from "./icons";

type ModuleProgress = ReturnType<typeof getModuleProgress>;

/* ═══════════════════════════════════════════════════════════════════
   SVG Serpentine Path Builder
   ═══════════════════════════════════════════════════════════════════ */

const ROW_HEIGHT = 400;
const LEFT_X = 35;
const RIGHT_X = 65;
const CENTER_X = 50;

function buildSerpentinePath(moduleCount: number): string {
  if (moduleCount === 0) return "";

  // Start directly at node 0
  const firstX = LEFT_X;
  const firstY = ROW_HEIGHT * 0.5;
  let d = `M ${firstX} ${firstY}`;

  for (let i = 1; i < moduleCount; i++) {
    const nodeY = ROW_HEIGHT * 0.5 + i * ROW_HEIGHT;
    const nodeX = i % 2 === 0 ? LEFT_X : RIGHT_X;
    const prevNodeX = i % 2 === 0 ? RIGHT_X : LEFT_X;
    const prevNodeY = ROW_HEIGHT * 0.5 + (i - 1) * ROW_HEIGHT;

    const cp1X = prevNodeX;
    const cp1Y = prevNodeY + (nodeY - prevNodeY) * 0.5;
    const cp2X = nodeX;
    const cp2Y = nodeY - (nodeY - prevNodeY) * 0.5;

    d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${nodeX} ${nodeY}`;
  }

  return d;
}

function buildMobileWavyPath(moduleCount: number): string {
  if (moduleCount === 0) return "";
  const MOBILE_ROW = 220;
  const X_CENTER = 20;
  const WAVE_AMP = 6;

  // Start directly at node 0
  const firstY = MOBILE_ROW * 0.5;
  let d = `M ${X_CENTER} ${firstY}`;

  for (let i = 1; i < moduleCount; i++) {
    const nodeY = MOBILE_ROW * 0.5 + i * MOBILE_ROW;
    const prevY = MOBILE_ROW * 0.5 + (i - 1) * MOBILE_ROW;
    const midY = (prevY + nodeY) / 2;
    const cpX = i % 2 === 0 ? X_CENTER + WAVE_AMP : X_CENTER - WAVE_AMP;

    d += ` Q ${cpX} ${midY}, ${X_CENTER} ${nodeY}`;
  }

  return d;
}

/* ═══════════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════════ */

export function BootcampHomeClient() {
  const tBootcamp = useTranslations("bootcamp");
  const tDocs = useTranslations("docs");
  const [globalProgress, setGlobalProgress] = useState({ completed: 0, total: 0, percent: 0 });
  const [moduleProgressMap, setModuleProgressMap] = useState<Record<string, ModuleProgress>>({});

  useEffect(() => {
    const moduleEntries = Object.fromEntries(
      bootcampCatalog.map((module) => [module.slug, getModuleProgress(module.slug)])
    );
    setModuleProgressMap(moduleEntries);
    setGlobalProgress(getGlobalProgress());
  }, []);

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

  /* ── Hover-based path fill ── */
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxConnectedRef = useRef(0); // module 0 is always connected
  const handleHover = (index: number) => {
    if (index <= maxConnectedRef.current) setHoveredIndex(index);
  };

  /* ── SVG path length measurement ── */
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopBgPathRef = useRef<SVGPathElement>(null);
  const [desktopPathLength, setDesktopPathLength] = useState(1000);
  const [desktopNodeLengths, setDesktopNodeLengths] = useState<number[]>([]);
  const desktopNodeLengthsRef = useRef<number[]>([]);
  desktopNodeLengthsRef.current = desktopNodeLengths;

  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobileBgPathRef = useRef<SVGPathElement>(null);
  const [mobilePathLength, setMobilePathLength] = useState(1000);
  const [mobileNodeLengths, setMobileNodeLengths] = useState<number[]>([]);
  const mobileNodeLengthsRef = useRef<number[]>([]);
  mobileNodeLengthsRef.current = mobileNodeLengths;

  /* ── Scroll-driven card reveal + path drawing ── */
  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const SLIDE_PX = 300;

    function update() {
      const animatedCards = root!.querySelectorAll<HTMLElement>(".timeline-card-enter");
      const allCards = root!.querySelectorAll<HTMLElement>("[data-idx]");
      const vh = window.innerHeight;

      animatedCards.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.55)));
        const ease = progress * progress;
        const dir = el.dataset.dir === "left" ? -1 : 1;
        const offset = SLIDE_PX * (1 - ease) * dir;
        const scale = 0.85 + 0.15 * ease;
        el.style.opacity = String(progress);
        el.style.transform = `translateX(${offset}px) scale(${scale})`;
      });

      // Draw SVG path proportional to scroll
      const rootRect = root!.getBoundingClientRect();
      const rawScroll = Math.max(0, (vh * 0.5 - rootRect.top) / rootRect.height);
      const scrollProgress = Math.min(1, rawScroll * (1 + rawScroll * 0.25));

      // Determine which nodes the line has reached based on card visibility
      let maxIdx = 0;
      allCards.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.7) {
          const idx = Number(el.dataset.idx);
          if (!isNaN(idx) && idx > maxIdx) maxIdx = idx;
        }
      });
      maxConnectedRef.current = maxIdx;

      if (desktopBgPathRef.current) {
        const len = desktopBgPathRef.current.getTotalLength();
        desktopBgPathRef.current.style.strokeDasharray = String(len);
        desktopBgPathRef.current.style.strokeDashoffset = String(len * (1 - scrollProgress));
      }
      if (mobileBgPathRef.current) {
        const len = mobileBgPathRef.current.getTotalLength();
        mobileBgPathRef.current.style.strokeDasharray = String(len);
        mobileBgPathRef.current.style.strokeDashoffset = String(len * (1 - scrollProgress));
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [modulesWithProgress.length]);

  const MOBILE_ROW = 220;

  useEffect(() => {
    function measureSubPathLengths(
      svgEl: SVGSVGElement,
      buildFn: (n: number) => string,
      count: number
    ): { total: number; nodeLengths: number[] } {
      const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tempPath.style.visibility = "hidden";
      svgEl.appendChild(tempPath);

      const nodeLengths: number[] = [];
      for (let i = 1; i <= count; i++) {
        tempPath.setAttribute("d", buildFn(i));
        nodeLengths.push(tempPath.getTotalLength());
      }

      tempPath.setAttribute("d", buildFn(count));
      const total = tempPath.getTotalLength();
      svgEl.removeChild(tempPath);
      return { total, nodeLengths };
    }

    const count = modulesWithProgress.length;

    if (desktopPathRef.current?.ownerSVGElement) {
      const { total, nodeLengths } = measureSubPathLengths(
        desktopPathRef.current.ownerSVGElement,
        buildSerpentinePath,
        count
      );
      setDesktopPathLength(total);
      setDesktopNodeLengths(nodeLengths);
    }
    if (mobilePathRef.current?.ownerSVGElement) {
      const { total, nodeLengths } = measureSubPathLengths(
        mobilePathRef.current.ownerSVGElement,
        buildMobileWavyPath,
        count
      );
      setMobilePathLength(total);
      setMobileNodeLengths(nodeLengths);
    }
  }, [modulesWithProgress.length]);

  /* ── Derived SVG values ── */
  const moduleCount = modulesWithProgress.length;
  const totalSvgHeight = moduleCount * ROW_HEIGHT;
  const desktopPathD = buildSerpentinePath(moduleCount);

  const totalMobileSvgHeight = moduleCount * MOBILE_ROW;
  const mobilePathD = buildMobileWavyPath(moduleCount);

  const desktopProgressOffset =
    hoveredIndex !== null && desktopNodeLengths[hoveredIndex] != null
      ? desktopPathLength - desktopNodeLengths[hoveredIndex]
      : desktopPathLength;

  const mobileProgressOffset =
    hoveredIndex !== null && mobileNodeLengths[hoveredIndex] != null
      ? mobilePathLength - mobileNodeLengths[hoveredIndex]
      : mobilePathLength;

  return (
    <div className="animate-content-enter">
      {/* ════════════════════════════════════════════════════════════
          FIXED FULL-PAGE VIDEO BACKGROUND
         ════════════════════════════════════════════════════════════ */}
      <video
        className="fixed inset-0 h-full w-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/hero-bootcamp.mp4" type="video/mp4" />
      </video>

      {/* Persistent dark overlay */}
      <div
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"
        aria-hidden
      />

      {/* ════════════════════════════════════════════════════════════
          1. HERO — full viewport, split layout
         ════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 flex items-end text-white pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="w-full px-6 sm:px-10 lg:px-16">

          {/* Top row: Title + Progress side by side on desktop, stacked on mobile */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            {/* Left: Title block */}
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300 sm:text-sm">
                {tBootcamp("eyebrow")}
              </p>
              <h1 className="mt-2 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
                {tBootcamp("title")}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-gray-300 sm:text-lg lg:text-xl">
                {tBootcamp("subtitle")}
              </p>
            </div>

            {/* Right: Compact progress panel */}
            <div className="w-full max-w-lg rounded-xl border border-white/10 bg-white/8 p-5 backdrop-blur-xl sm:p-6 lg:flex-shrink-0">
              {/* Percentage + bar */}
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold tabular-nums text-teal-400">
                  {globalProgress.percent}
                  <span className="text-2xl">%</span>
                </span>
                <div className="flex-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {tBootcamp("progress.global")}
                  </span>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-teal-500 transition-all duration-500"
                      style={{ width: `${globalProgress.percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-center">
                <div>
                  <p className="text-xl font-semibold tabular-nums text-white">{completedModulesCount}</p>
                  <p className="text-[11px] text-gray-400">{tBootcamp("stats.completed")}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold tabular-nums text-white">{inProgressCount}</p>
                  <p className="text-[11px] text-gray-400">{tBootcamp("stats.active")}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold tabular-nums text-white">{totalEstimatedMinutes}</p>
                  <p className="text-[11px] text-gray-400">{tBootcamp("stats.minutes")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator — bottom center */}
          <div className="mt-8 mb-[-3rem] flex justify-center" aria-hidden>
            <svg className="h-10 w-10 animate-bounce text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. TIMELINE SECTION — overlaid on video
         ════════════════════════════════════════════════════════════ */}
      <div ref={timelineRef} className="relative z-10 mx-auto max-w-[1100px] px-4 pb-24 sm:px-6 lg:px-8">

        {/* ── 2b/2c. Timeline + Module Cards ── */}
        {modulesWithProgress.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-12 text-center text-gray-300 backdrop-blur-lg">
            {tBootcamp("filters.empty")}
          </div>
        ) : (
          <div className="relative">

            {/* ════════════════════════════════════
                MOBILE: Wavy left-aligned timeline
               ════════════════════════════════════ */}
            <div className="md:hidden">
              <div
                className="relative"
                style={{ minHeight: `${totalMobileSvgHeight}px` }}
              >
                {/* Mobile SVG wavy path */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox={`0 0 100 ${totalMobileSvgHeight}`}
                  preserveAspectRatio="none"
                  fill="none"
                >
                  {/* Background path */}
                  <path
                    ref={mobileBgPathRef}
                    d={mobilePathD}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Progress path */}
                  <path
                    ref={mobilePathRef}
                    d={mobilePathD}
                    stroke="url(#tealGradientMobile)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={mobilePathLength}
                    strokeDashoffset={mobileProgressOffset}
                    className="transition-all duration-700 ease-in-out"
                  />
                  {/* Flow energy pulse (mobile) */}
                  {hoveredIndex !== null && (() => {
                    const filledLen = mobileNodeLengths[hoveredIndex] ?? 0;
                    if (filledLen < 10) return null;
                    const dashSize = Math.max(filledLen * 0.06, 4);
                    return (
                      <path
                        key={`flow-mobile-${hoveredIndex}`}
                        d={mobilePathD}
                        stroke="url(#flowGlowMobile)"
                        strokeWidth="1.2"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${dashSize} ${mobilePathLength - dashSize}`}
                        mask="url(#progressMaskMobile)"
                        className="timeline-flow-pulse"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values={`0;${-filledLen}`}
                          dur="1.8s"
                          repeatCount="indefinite"
                          calcMode="spline"
                          keySplines="0.4 0 0.2 1"
                        />
                      </path>
                    );
                  })()}
                  <defs>
                    <mask id="progressMaskMobile" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height={totalMobileSvgHeight}>
                      <path
                        d={mobilePathD}
                        stroke="white"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={mobilePathLength}
                        strokeDashoffset={mobileProgressOffset}
                        className="transition-all duration-700 ease-in-out"
                      />
                    </mask>
                    <linearGradient id="tealGradientMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                    <linearGradient id="flowGlowMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5eead4" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#5eead4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Mobile module rows */}
                {modulesWithProgress.map(({ module, progress }, index) => {
                  const isCompleted = progress.status === "completed";
                  const isActive = progress.status === "in_progress";
                  const moduleMinutes = module.lessons.reduce(
                    (sum, lesson) => sum + lesson.durationMin,
                    0
                  );

                  return (
                    <div
                      key={module.slug}
                      className={`relative flex gap-4${index > 0 ? " timeline-card-enter" : ""}`}
                      data-dir={index % 2 === 0 ? "right" : "left"}
                      data-idx={index}
                      style={{ height: `${MOBILE_ROW}px`, alignItems: "center" }}
                    >
                      {/* Node circle */}
                      <div
                        className="relative z-20 flex-shrink-0"
                        style={{ width: 40, marginLeft: "calc(20% - 20px)" }}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${
                            isCompleted
                              ? "bg-teal-500 text-white"
                              : isActive
                                ? "border-2 border-teal-500 bg-white/10 backdrop-blur-sm timeline-node-active"
                                : "border-2 border-white/30 bg-white/10 backdrop-blur-sm"
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-sm font-semibold text-gray-300">
                              {index}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        className="flex-1 min-w-0 pr-2"
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <ModuleCard
                          module={module}
                          progress={progress}
                          moduleMinutes={moduleMinutes}
                          tBootcamp={tBootcamp}
                          tDocs={tDocs}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ════════════════════════════════════
                DESKTOP: Curved serpentine timeline
               ════════════════════════════════════ */}
            <div className="hidden md:block">
              <div
                className="relative"
                style={{ minHeight: `${totalSvgHeight}px` }}
              >
                {/* Desktop SVG serpentine path */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox={`0 0 100 ${totalSvgHeight}`}
                  preserveAspectRatio="none"
                  fill="none"
                >
                  {/* Background path */}
                  <path
                    ref={desktopBgPathRef}
                    d={desktopPathD}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="0.3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Progress path */}
                  <path
                    ref={desktopPathRef}
                    d={desktopPathD}
                    stroke="url(#tealGradientDesktop)"
                    strokeWidth="0.3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={desktopPathLength}
                    strokeDashoffset={desktopProgressOffset}
                    className="transition-all duration-700 ease-in-out"
                  />
                  {/* Flow energy pulse */}
                  {hoveredIndex !== null && (() => {
                    const filledLen = desktopNodeLengths[hoveredIndex] ?? 0;
                    if (filledLen < 10) return null;
                    const dashSize = Math.max(filledLen * 0.06, 4);
                    return (
                      <path
                        key={`flow-desktop-${hoveredIndex}`}
                        d={desktopPathD}
                        stroke="url(#flowGlowDesktop)"
                        strokeWidth="0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${dashSize} ${desktopPathLength - dashSize}`}
                        mask="url(#progressMaskDesktop)"
                        className="timeline-flow-pulse"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values={`0;${-filledLen}`}
                          dur="1.8s"
                          repeatCount="indefinite"
                          calcMode="spline"
                          keySplines="0.4 0 0.2 1"
                        />
                      </path>
                    );
                  })()}
                  <defs>
                    <mask id="progressMaskDesktop" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height={totalSvgHeight}>
                      <path
                        d={desktopPathD}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={desktopPathLength}
                        strokeDashoffset={desktopProgressOffset}
                        className="transition-all duration-700 ease-in-out"
                      />
                    </mask>
                    <linearGradient id="tealGradientDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                    <linearGradient id="flowGlowDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5eead4" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#5eead4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Desktop module rows */}
                {modulesWithProgress.map(({ module, progress }, index) => {
                  const isCompleted = progress.status === "completed";
                  const isActive = progress.status === "in_progress";
                  const isEven = index % 2 === 0;
                  const moduleMinutes = module.lessons.reduce(
                    (sum, lesson) => sum + lesson.durationMin,
                    0
                  );

                  return (
                    <div
                      key={module.slug}
                      className={`relative${index > 0 ? " timeline-card-enter" : ""}`}
                      data-dir={isEven ? "left" : "right"}
                      data-idx={index}
                      style={{ height: `${ROW_HEIGHT}px` }}
                    >
                      {/* Node circle */}
                      <div
                        className="absolute z-20"
                        style={{
                          left: isEven ? `${LEFT_X}%` : `${RIGHT_X}%`,
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-500 ${
                            hoveredIndex !== null && index <= hoveredIndex
                              ? "bg-teal-500 text-white scale-110"
                              : isCompleted
                                ? "bg-teal-500 text-white"
                                : isActive
                                  ? "border-2 border-teal-500 bg-white/10 backdrop-blur-sm timeline-node-active"
                                  : "border-2 border-white/30 bg-white/10 backdrop-blur-sm"
                          }`}
                        >
                          {hoveredIndex !== null && index <= hoveredIndex ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : isCompleted ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-sm font-semibold text-gray-300">
                              {index}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Connector line from node to card */}
                      <div
                        className={`absolute top-1/2 h-0.5 -translate-y-px transition-colors duration-500 ${
                          hoveredIndex !== null && index <= hoveredIndex ? "bg-teal-400" : "bg-white/15"
                        }`}
                        style={
                          isEven
                            ? { right: `${100 - LEFT_X + 1}%`, width: "3%", left: "auto" }
                            : { left: `${RIGHT_X + 1}%`, width: "3%" }
                        }
                        aria-hidden
                      />

                      {/* Card */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={
                          isEven
                            ? { right: `${100 - LEFT_X + 4}%`, maxWidth: "480px", width: "100%" }
                            : { left: `${RIGHT_X + 4}%`, maxWidth: "480px", width: "100%" }
                        }
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <ModuleCard
                          module={module}
                          progress={progress}
                          moduleMinutes={moduleMinutes}
                          tBootcamp={tBootcamp}
                          tDocs={tDocs}
                        />
                      </div>

                      {/* Tagline — opposite side of the card */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 max-w-[320px]"
                        style={
                          isEven
                            ? { left: `${LEFT_X + 5}%` }
                            : { right: `${100 - RIGHT_X + 5}%` }
                        }
                      >
                        <p className={`text-2xl leading-snug font-semibold text-white/80 ${isEven ? "text-left" : "text-right"}`}>
                          {tBootcamp(`taglines.${module.slug}` as Parameters<typeof tBootcamp>[0])}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Module Card — glassmorphic design for video background
   ═══════════════════════════════════════════════════════════════════ */

function ModuleCard({
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
        <div className="relative h-40 w-full overflow-hidden">
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
          <div className="absolute inset-0 bg-black/30" />

          <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-gray-400 backdrop-blur-sm">
            {tBootcamp("status.coming_soon" as Parameters<typeof tBootcamp>[0])}
          </span>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-gray-400 leading-snug">
            {tDocs(module.titleKey as Parameters<typeof tDocs>[0])}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-500 line-clamp-2">
            {tDocs(module.descriptionKey as Parameters<typeof tDocs>[0])}
          </p>

          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10" />

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>&mdash;</span>
            <span className="inline-flex items-center gap-1">
              <IconClock className="h-3.5 w-3.5 text-gray-500" />
              {moduleMinutes} min
            </span>
          </div>

          <span className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-500 cursor-not-allowed border border-white/10">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      <div className="relative h-40 w-full overflow-hidden">
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
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${
            statusColors[progress.status] ?? statusColors.not_started
          }`}
        >
          {tBootcamp(`status.${progress.status}` as Parameters<typeof tBootcamp>[0])}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-semibold text-white leading-snug">
          {tDocs(module.titleKey as Parameters<typeof tDocs>[0])}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-300 line-clamp-2">
          {tDocs(module.descriptionKey as Parameters<typeof tDocs>[0])}
        </p>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        {/* Progress text + Duration */}
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span>
            {progress.completed}/{progress.total} ({progress.percent}%)
          </span>
          <span className="inline-flex items-center gap-1">
            <IconClock className="h-3.5 w-3.5 text-gray-400" />
            {moduleMinutes} min
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/bootcamp/module/${module.slug}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600/30 px-4 py-2.5 text-sm font-medium text-teal-300 transition-colors hover:bg-teal-600/50 border border-teal-500/30"
        >
          {progress.completed > 0
            ? tBootcamp("actions.resume")
            : tBootcamp("actions.start")}
          <span aria-hidden>&#8594;</span>
        </Link>
      </div>
    </article>
  );
}
