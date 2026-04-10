"use client";

import { useEffect, useRef, useState } from "react";
import {
  ROW_HEIGHT,
  LEFT_X,
  RIGHT_X,
  buildSerpentinePath,
  buildSerpentinePathFromPositions,
} from "./serpentine-path";

export function useSerpentineScroll(moduleCount: number) {
  /* ── Hover-based path fill ── */
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  hoveredIndexRef.current = hoveredIndex;
  const maxConnectedRef = useRef(0);
  const handleHover = (index: number) => {
    if (index <= maxConnectedRef.current) setHoveredIndex(index);
  };

  /* ── SVG path refs ── */
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopBgPathRef = useRef<SVGPathElement>(null);
  const desktopMaskPathRef = useRef<SVGPathElement>(null);
  const flowPulsePathRef = useRef<SVGPathElement>(null);
  const measurePathRef = useRef<SVGPathElement>(null);

  /* ── SVG path length measurement ── */
  const [desktopPathLength, setDesktopPathLength] = useState(1000);
  const [desktopNodeLengths, setDesktopNodeLengths] = useState<number[]>([]);
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
  }, [moduleCount]);

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

  // Measure sub-path lengths for node-based stroke offsets
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

    if (desktopPathRef.current?.ownerSVGElement) {
      const { total, nodeLengths } = measureSubPathLengths(
        desktopPathRef.current.ownerSVGElement,
        buildSerpentinePath,
        moduleCount
      );
      setDesktopPathLength(total);
      setDesktopNodeLengths(nodeLengths);
    }
  }, [moduleCount]);

  return {
    hoveredIndex,
    setHoveredIndex,
    handleHover,
    desktopPathLength,
    desktopNodeLengths,
    timelineRef,
    desktopPathRef,
    desktopBgPathRef,
    desktopMaskPathRef,
    flowPulsePathRef,
    measurePathRef,
  };
}
