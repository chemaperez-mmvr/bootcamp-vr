"use client";

import { useEffect, useRef } from "react";

const HEADER_OFFSET = 220; // header (76px) + sticky search+breadcrumb bar (~125px) + breathing room
const MAX_RETRIES = 25; // 25 × 100ms = 2.5s max wait for element to appear
const RETRY_INTERVAL = 100; // ms between retries

const PERSIST_CLASS = "anchor-highlight-persist";
const BLINK_CLASS = "anchor-highlight-blink";

function clearHighlight() {
  document.querySelectorAll(`.${PERSIST_CLASS}`).forEach((el) => {
    el.classList.remove(PERSIST_CLASS, BLINK_CLASS);
  });
}

/** Target scroll position for an element, accounting for the sticky header. */
function targetScrollTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
}

/**
 * Scrolls to a target element using manual offset calculation instead of
 * scrollIntoView, which doesn't reliably respect scroll-margin-top across
 * browsers. Uses window.scrollTo with the header offset subtracted.
 */
function scrollToElement(el: HTMLElement, smooth: boolean) {
  window.scrollTo({
    top: targetScrollTop(el),
    behavior: smooth ? "smooth" : "instant",
  });
}

/**
 * After the initial scroll, images/fonts above the target may still be loading,
 * shifting the layout and leaving us at the wrong position. This schedules
 * several instant correction passes that re-check and re-scroll if the element
 * has drifted beyond a small tolerance.
 */
function scheduleCorrections(
  el: HTMLElement,
  abortSignal?: AbortSignal
) {
  const TOLERANCE = 2; // px — ignore sub-pixel drift
  const delays = [150, 400, 900, 1800]; // ms — covers most image loads
  const timers: ReturnType<typeof setTimeout>[] = [];

  for (const delay of delays) {
    timers.push(
      setTimeout(() => {
        if (abortSignal?.aborted) return;
        const target = targetScrollTop(el);
        if (Math.abs(window.scrollY - target) > TOLERANCE) {
          window.scrollTo({ top: target, behavior: "instant" });
        }
      }, delay)
    );
  }

  // Also correct once all images in the page finish loading
  if (document.readyState !== "complete") {
    const onLoad = () => {
      if (abortSignal?.aborted) return;
      const target = targetScrollTop(el);
      if (Math.abs(window.scrollY - target) > TOLERANCE) {
        window.scrollTo({ top: target, behavior: "instant" });
      }
    };
    window.addEventListener("load", onLoad, { once: true });
    timers.push(
      // Cleanup if abort happens before load
      setTimeout(() => window.removeEventListener("load", onLoad), 10000)
    );
  }
}

function highlightElement(el: HTMLElement) {
  clearHighlight();
  el.classList.remove(BLINK_CLASS);
  void el.offsetHeight;
  el.classList.add(BLINK_CLASS, PERSIST_CLASS);
  el.addEventListener("animationend", function removeBlink() {
    el.classList.remove(BLINK_CLASS);
    el.removeEventListener("animationend", removeBlink);
  });
}

/**
 * Waits for the element to appear in the DOM (handles Suspense/hydration),
 * then scrolls to it and highlights it. Retries up to MAX_RETRIES times.
 *
 * @param smooth - false on initial page load (instant jump, no flicker),
 *                 true on hashchange (user clicked a link, smooth UX).
 */
function scrollToSectionAndHighlight(
  id: string,
  smooth: boolean,
  abortSignal?: AbortSignal
) {
  let retries = 0;

  function attempt() {
    if (abortSignal?.aborted) return;
    const el = document.getElementById(id);
    if (el) {
      scrollToElement(el, smooth);
      highlightElement(el);
      // On initial load, images above the target may still be loading and will
      // shift the layout — schedule correction passes to guarantee final position.
      if (!smooth) {
        scheduleCorrections(el, abortSignal);
      }
      return;
    }
    if (retries < MAX_RETRIES) {
      retries++;
      setTimeout(attempt, RETRY_INTERVAL);
    }
  }

  // Use rAF to ensure we run after the current paint cycle
  requestAnimationFrame(attempt);
}

/**
 * On mount, if the URL has a hash, scroll to the section and apply a blink
 * then a persistent highlight. The highlight is removed on any click, touch,
 * key press or scroll (user interaction).
 *
 * Uses manual scroll offset calculation (not scrollIntoView) to guarantee
 * consistent positioning below the sticky header across all browsers.
 * Retries finding the target element to handle Suspense/lazy rendering.
 */
export function ScrollToHash() {
  const clearOnInteractionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    function setupInteractionClear() {
      if (clearOnInteractionRef.current) return;
      const clear = () => {
        clearHighlight();
      };
      window.addEventListener("click", clear, true);
      window.addEventListener("touchstart", clear, true);
      window.addEventListener("keydown", clear, true);
      clearOnInteractionRef.current = () => {
        window.removeEventListener("click", clear, true);
        window.removeEventListener("touchstart", clear, true);
        window.removeEventListener("keydown", clear, true);
      };
    }

    // Initial mount: instant scroll (no animation) to avoid flicker
    const initialHash = window.location.hash?.slice(1);
    if (initialHash) {
      scrollToSectionAndHighlight(
        initialHash,
        false, // instant — override whatever native scroll did
        abortController.signal
      );
      setupInteractionClear();
    }

    // Subsequent hash changes (sidebar clicks, etc.): smooth scroll
    function handleHashChange() {
      const hash = window.location.hash?.slice(1);
      if (!hash) return;
      scrollToSectionAndHighlight(hash, true, abortController.signal);
      setupInteractionClear();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      abortController.abort();
      window.removeEventListener("hashchange", handleHashChange);
      clearOnInteractionRef.current?.();
      clearOnInteractionRef.current = null;
    };
  }, []);

  return null;
}
