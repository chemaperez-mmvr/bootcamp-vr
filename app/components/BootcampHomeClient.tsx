"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bootcampCatalog } from "@/app/bootcamp/catalog";
import { getGlobalProgress, getModuleProgress } from "@/app/bootcamp/progress";
import { ModuleCard } from "./ModuleCard";
import { CertificateDownload } from "./CertificateDownload";

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

function buildSerpentinePathFromPositions(positions: { x: number; y: number }[]): string {
  if (positions.length === 0) return "";
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const cp1X = prev.x;
    const cp1Y = prev.y + (curr.y - prev.y) * 0.5;
    const cp2X = curr.x;
    const cp2Y = curr.y - (curr.y - prev.y) * 0.5;
    d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`;
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
  const enabledModulesCount = bootcampCatalog.filter((m) => m.enabled).length;
  const totalEstimatedMinutes = bootcampCatalog.reduce(
    (sum, module) => sum + module.lessons.reduce((acc, lesson) => acc + lesson.durationMin, 0),
    0
  );

  /* ── Hover-based path fill ── */
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  hoveredIndexRef.current = hoveredIndex;
  const maxConnectedRef = useRef(0); // module 0 is always connected
  const handleHover = (index: number) => {
    if (index <= maxConnectedRef.current) setHoveredIndex(index);
  };

  /* ── SVG path length measurement ── */
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopBgPathRef = useRef<SVGPathElement>(null);
  const desktopMaskPathRef = useRef<SVGPathElement>(null);
  const flowPulsePathRef = useRef<SVGPathElement>(null);
  const measurePathRef = useRef<SVGPathElement>(null);
  const [desktopPathLength, setDesktopPathLength] = useState(1000);
  const [desktopNodeLengths, setDesktopNodeLengths] = useState<number[]>([]);
  const desktopNodeLengthsRef = useRef<number[]>([]);
  desktopNodeLengthsRef.current = desktopNodeLengths;
  const nodeRatiosRef = useRef<number[]>([]);
  const dynamicTotalLenRef = useRef(1000);
  const dynamicPositionsRef = useRef<{ x: number; y: number }[]>([]);

  /* ── Scroll-driven card reveal + path drawing ── */
  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const SLIDE_PX = 300;

    function update() {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const animatedCards = root!.querySelectorAll<HTMLElement>(".timeline-card-enter");
      const allCards = root!.querySelectorAll<HTMLElement>("[data-idx]");
      const vh = window.innerHeight;

      if (prefersReducedMotion) {
        animatedCards.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      } else {
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
      }

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

      // Compute dynamic node positions accounting for entrance animation
      const containerWidth = rootRect.width;
      const positions: { x: number; y: number }[] = [];
      allCards.forEach((el) => {
        const idx = Number(el.dataset.idx);
        if (isNaN(idx)) return;
        const isEven = idx % 2 === 0;
        const baseX = isEven ? LEFT_X : RIGHT_X;
        const baseY = ROW_HEIGHT * 0.5 + idx * ROW_HEIGHT;

        if (prefersReducedMotion || !el.classList.contains("timeline-card-enter")) {
          positions[idx] = { x: baseX, y: baseY };
          return;
        }

        const elRect = el.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh - elRect.top) / (vh * 0.55)));
        const ease = progress * progress;
        const dir = el.dataset.dir === "left" ? -1 : 1;
        const offsetPx = SLIDE_PX * (1 - ease) * dir;
        const scale = 0.85 + 0.15 * ease;

        const scaledX = 50 + (baseX - 50) * scale;
        const svgOffsetX = containerWidth > 0 ? (offsetPx / containerWidth) * 100 : 0;
        positions[idx] = { x: scaledX + svgOffsetX, y: baseY };
      });

      // Rebuild SVG path from actual node positions
      const dynamicD = buildSerpentinePathFromPositions(positions);
      dynamicPositionsRef.current = positions;

      if (desktopBgPathRef.current) {
        desktopBgPathRef.current.setAttribute("d", dynamicD);
        desktopBgPathRef.current.style.strokeDasharray = '';
        desktopBgPathRef.current.style.strokeDashoffset = '';
        const len = desktopBgPathRef.current.getTotalLength();
        dynamicTotalLenRef.current = len;
      }

      // Update progress path and mask (hover) imperatively
      const len = dynamicTotalLenRef.current;
      const hi = hoveredIndexRef.current;
      let dynamicFilledLen = 0;
      if (hi !== null && measurePathRef.current && positions[hi]) {
        const subD = buildSerpentinePathFromPositions(positions.slice(0, hi + 1));
        measurePathRef.current.setAttribute("d", subD);
        dynamicFilledLen = measurePathRef.current.getTotalLength();
      }
      const offset = hi !== null ? len - dynamicFilledLen : len;

      if (desktopPathRef.current) {
        desktopPathRef.current.setAttribute("d", dynamicD);
        desktopPathRef.current.style.strokeDasharray = String(len);
        desktopPathRef.current.style.strokeDashoffset = String(offset);
      }
      if (desktopMaskPathRef.current) {
        desktopMaskPathRef.current.setAttribute("d", dynamicD);
        desktopMaskPathRef.current.style.strokeDasharray = String(len);
        desktopMaskPathRef.current.style.strokeDashoffset = String(offset);
      }
      if (flowPulsePathRef.current) {
        flowPulsePathRef.current.setAttribute("d", dynamicD);
      }
    }

    let rafId = 0;
    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [modulesWithProgress.length]);

  // Update progress path on hover changes (between scroll events)
  useEffect(() => {
    const len = dynamicTotalLenRef.current;
    const hi = hoveredIndex;
    const positions = dynamicPositionsRef.current;
    let dynamicFilledLen = 0;
    if (hi !== null && measurePathRef.current && positions[hi]) {
      const subD = buildSerpentinePathFromPositions(positions.slice(0, hi + 1));
      measurePathRef.current.setAttribute("d", subD);
      dynamicFilledLen = measurePathRef.current.getTotalLength();
    }
    const offset = hi !== null ? len - dynamicFilledLen : len;

    if (desktopPathRef.current) {
      desktopPathRef.current.style.strokeDasharray = String(len);
      desktopPathRef.current.style.strokeDashoffset = String(offset);
    }
    if (desktopMaskPathRef.current) {
      desktopMaskPathRef.current.style.strokeDasharray = String(len);
      desktopMaskPathRef.current.style.strokeDashoffset = String(offset);
    }
  }, [hoveredIndex]);

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
      nodeRatiosRef.current = nodeLengths.map((len) => len / total);
    }
  }, [modulesWithProgress.length]);

  /* ── Derived SVG values ── */
  const moduleCount = modulesWithProgress.length;
  const totalSvgHeight = moduleCount * ROW_HEIGHT;
  const desktopPathD = buildSerpentinePath(moduleCount);


  return (
    <div className="animate-content-enter">
      {/* ════════════════════════════════════════════════════════════
          FIXED FULL-PAGE VIDEO BACKGROUND
         ════════════════════════════════════════════════════════════ */}
      <video
        className="fixed inset-0 h-full w-full object-cover z-0 hidden sm:block"
        poster="/hero-bootcamp-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/hero-bootcamp.mp4" type="video/mp4" />
      </video>

      {/* Mobile-only static background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center sm:hidden"
        style={{ backgroundImage: "url('/hero-bootcamp-poster.jpg')" }}
        aria-hidden="true"
      />

      {/* Persistent dark overlay */}
      <div
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"
        aria-hidden="true"
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
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-300">
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

              {/* Certificate link */}
              <a
                href="#certificate"
                className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-xs font-semibold text-teal-300 transition-colors hover:bg-teal-500/20"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
                {tBootcamp("certificate.goTo")}
                <span aria-hidden>&#8595;</span>
              </a>

              {/* Stats row */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-center">
                <div>
                  <p className="text-xl font-semibold tabular-nums text-white">{completedModulesCount}</p>
                  <p className="text-xs text-gray-300">{tBootcamp("stats.completed")}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold tabular-nums text-white">{inProgressCount}</p>
                  <p className="text-xs text-gray-300">{tBootcamp("stats.active")}</p>
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
      <div ref={timelineRef} className="relative z-10 mx-auto max-w-[1100px] px-4 pt-10 pb-24 sm:px-6 sm:pt-0 lg:px-8">

        {/* ── 2b/2c. Timeline + Module Cards ── */}
        {modulesWithProgress.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-12 text-center text-gray-300 backdrop-blur-lg">
            {tBootcamp("filters.empty")}
          </div>
        ) : (
          <div className="relative">

            {/* ════════════════════════════════════
                MOBILE: Simple vertical timeline
               ════════════════════════════════════ */}
            <div className="lg:hidden">
              <div className="relative flex flex-col gap-4 sm:gap-6 md:gap-8 md:mx-auto md:max-w-2xl">
                {/* Vertical timeline line — left on mobile, hidden on tablet (nodes are centered) */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-white/15 left-[19px] md:hidden"
                  aria-hidden="true"
                />

                {/* Module rows */}
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
                      className={`relative${index > 0 ? " timeline-card-enter" : ""}`}
                      data-dir={index % 2 === 0 ? "right" : "left"}
                      data-idx={index}
                    >
                      {/* Mobile: side-by-side | Tablet: stacked centered */}
                      <div className="flex items-start gap-3 sm:gap-4 md:flex-col md:items-center md:gap-3">
                        {/* Node circle */}
                        <div className="relative z-20 flex-shrink-0 pt-4 md:pt-0">
                          <div
                            className={`flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full shadow-sm ${
                              isCompleted
                                ? "bg-teal-500 text-white"
                                : isActive
                                  ? "border-2 border-teal-500 bg-white/10 backdrop-blur-sm timeline-node-active"
                                  : "border-2 border-white/30 bg-white/10 backdrop-blur-sm"
                            }`}
                          >
                            {isCompleted ? (
                              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-xs sm:text-sm font-semibold text-gray-300">
                                {index}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card */}
                        <div
                          className="flex-1 min-w-0 md:w-full"
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
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ════════════════════════════════════
                DESKTOP: Curved serpentine timeline
               ════════════════════════════════════ */}
            <div className="hidden lg:block">
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
                  {/* Hidden path for dynamic sub-path measurement */}
                  <path ref={measurePathRef} style={{ visibility: 'hidden' }} />
                  {/* Background path */}
                  <path
                    ref={desktopBgPathRef}
                    d={desktopPathD}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="0.3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Progress path — strokeDash set imperatively in update() */}
                  <path
                    ref={desktopPathRef}
                    d={desktopPathD}
                    stroke="url(#tealGradientDesktop)"
                    strokeWidth="0.3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Flow energy pulse */}
                  {hoveredIndex !== null && (() => {
                    const filledLen = desktopNodeLengths[hoveredIndex] ?? 0;
                    if (filledLen < 10) return null;
                    const dashSize = Math.max(desktopPathLength * 0.015, 4);
                    return (
                      <path
                        ref={flowPulsePathRef}
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
                          dur={`${Math.max(filledLen / 600, 0.4)}s`}
                          repeatCount="indefinite"
                          calcMode="linear"
                        />
                      </path>
                    );
                  })()}
                  <defs>
                    <mask id="progressMaskDesktop" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height={totalSvgHeight}>
                      <path
                        ref={desktopMaskPathRef}
                        d={desktopPathD}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
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
                            ? { right: `${100 - LEFT_X + 2}%`, width: "3%", left: "auto" }
                            : { left: `${RIGHT_X + 2}%`, width: "3%" }
                        }
                        aria-hidden="true"
                      />

                      {/* Card */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={
                          isEven
                            ? { right: `${100 - LEFT_X + 6}%`, maxWidth: "520px", width: "100%" }
                            : { left: `${RIGHT_X + 6}%`, maxWidth: "520px", width: "100%" }
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
                            ? { left: `${LEFT_X + 3}%` }
                            : { right: `${100 - RIGHT_X + 3}%` }
                        }
                      >
                        <p className={`text-2xl leading-snug font-semibold text-white/80 ${isEven ? "text-left border-l-2 border-teal-500/30 pl-4" : "text-right border-r-2 border-teal-500/30 pr-4"}`}>
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

        {/* ════════════════════════════════════
            CERTIFICATE GOAL
           ════════════════════════════════════ */}
        <CertificateDownload
          unlocked={enabledModulesCount > 0 && completedModulesCount >= enabledModulesCount}
          enabledCount={enabledModulesCount}
          completedCount={completedModulesCount}
        />
      </div>
    </div>
  );
}

