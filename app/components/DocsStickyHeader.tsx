"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const SHOW_ALWAYS_BELOW_Y = 120;
const SCROLL_DELTA_MIN = 6;
/** Ignore scroll toggles briefly after a hash change (programmatic scroll correction). */
const HASHCHANGE_LOCK_MS = 1500;

const OFFSET_VISIBLE = 204;
const OFFSET_HIDDEN = 76;
const STICKY_OFFSET_VAR = "--docs-sticky-offset";

/**
 * Scroll-aware sticky wrapper. Hides on scroll down, shows on scroll up or
 * near the top. Exposes the effective top offset (sticky bottom) via the
 * `--docs-sticky-offset` CSS variable so sibling sticky elements (sidebars)
 * can follow along.
 */
export function DocsStickyHeader({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const prevY = useRef(0);
  const lockUntil = useRef(0);

  useEffect(() => {
    prevY.current = window.scrollY;

    const onScroll = () => {
      if (Date.now() < lockUntil.current) {
        prevY.current = window.scrollY;
        return;
      }
      const y = window.scrollY;
      const dy = y - prevY.current;
      if (Math.abs(dy) < SCROLL_DELTA_MIN) return;

      if (y < SHOW_ALWAYS_BELOW_Y) {
        setHidden(false);
      } else if (dy > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      prevY.current = y;
    };

    const onHashChange = () => {
      lockUntil.current = Date.now() + HASHCHANGE_LOCK_MS;
      setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      STICKY_OFFSET_VAR,
      `${hidden ? OFFSET_HIDDEN : OFFSET_VISIBLE}px`
    );
    return () => {
      root.style.removeProperty(STICKY_OFFSET_VAR);
    };
  }, [hidden]);

  return (
    <div
      className={`sticky top-[76px] z-30 -mx-4 sm:-mx-6 lg:-mx-8 mb-6 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-transform duration-200 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden={hidden}
    >
      {children}
    </div>
  );
}
