"use client";

import { useEffect, useRef } from "react";

const PERSIST_CLASS = "anchor-highlight-persist";
const BLINK_CLASS = "anchor-highlight-blink";

function clearHighlight() {
  document.querySelectorAll(`.${PERSIST_CLASS}`).forEach((el) => {
    el.classList.remove(PERSIST_CLASS, BLINK_CLASS);
  });
}

function scrollToSectionAndHighlight(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  clearHighlight();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.classList.remove(BLINK_CLASS);
  void el.offsetHeight;
  el.classList.add(BLINK_CLASS, PERSIST_CLASS);
  el.addEventListener("animationend", function removeBlink() {
    el.classList.remove(BLINK_CLASS);
    el.removeEventListener("animationend", removeBlink);
  });
}

/**
 * On mount, if the URL has a hash, scroll to the section and apply a blink
 * then a persistent highlight. The highlight is removed on any click, touch,
 * key press or scroll (user interaction).
 */
export function ScrollToHash() {
  const clearOnInteractionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash?.slice(1);
      if (!hash) return;
      scrollToSectionAndHighlight(hash);
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

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      clearOnInteractionRef.current?.();
      clearOnInteractionRef.current = null;
    };
  }, []);

  return null;
}
