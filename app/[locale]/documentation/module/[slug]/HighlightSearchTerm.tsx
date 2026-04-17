"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function normalize(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function highlightTextInElement(element: HTMLElement, query: string): void {
  const q = query.trim();
  if (!q) return;
  const qNorm = normalize(q);
  if (!qNorm) return;

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text);
  }

  for (const textNode of textNodes) {
    const text = textNode.textContent ?? "";
    const textNorm = normalize(text);
    if (!textNorm.includes(qNorm)) continue;

    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let idx = textNorm.indexOf(qNorm);
    while (idx !== -1) {
      if (idx > cursor) {
        fragment.appendChild(document.createTextNode(text.slice(cursor, idx)));
      }
      const mark = document.createElement("mark");
      mark.className =
        "doc-search-highlight doc-search-highlight-blink bg-teal-200/55 dark:bg-teal-700/40 text-foreground rounded px-0.5 font-medium";
      mark.textContent = text.slice(idx, idx + qNorm.length);
      fragment.appendChild(mark);
      cursor = idx + qNorm.length;
      idx = textNorm.indexOf(qNorm, cursor);
    }
    if (cursor < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(cursor)));
    }
    textNode.parentNode?.replaceChild(fragment, textNode);
  }
}

function removeHighlightsAndQuery(): void {
  const marks = document.querySelectorAll(".doc-search-highlight");
  marks.forEach((mark) => {
    const text = document.createTextNode(mark.textContent ?? "");
    mark.parentNode?.replaceChild(text, mark);
  });
  const url = new URL(window.location.href);
  url.searchParams.delete("q");
  const newUrl = url.pathname + url.search + url.hash;
  window.history.replaceState(null, "", newUrl);
}

/**
 * Reads ?q= from the URL and highlights matching text in the section (from hash)
 * or in the whole article. Runs after mount. On first click anywhere, removes
 * the highlight and the ?q= from the URL.
 */
export function HighlightSearchTerm() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() ?? "";

  useEffect(() => {
    if (!q) return;

    const run = () => {
      const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
      const root = document.querySelector("article");
      if (!root) return;

      const target = hash ? document.getElementById(hash) : root;
      if (!target) return;

      highlightTextInElement(target, q);
    };

    const t = setTimeout(run, 100);

    const onDocumentClick = () => {
      removeHighlightsAndQuery();
      document.removeEventListener("click", onDocumentClick, true);
    };
    document.addEventListener("click", onDocumentClick, true);

    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onDocumentClick, true);
    };
  }, [q]);

  return null;
}
