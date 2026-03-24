"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightTextInElement(element: HTMLElement, query: string): void {
  const q = query.trim();
  if (!q) return;
  const qLower = q.toLowerCase();
  const regex = new RegExp(`(${escapeRegex(q)})`, "gi");

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text);
  }

  for (const textNode of textNodes) {
    const text = textNode.textContent ?? "";
    const parts = text.split(regex);
    if (parts.length <= 1) continue;

    const fragment = document.createDocumentFragment();
    for (const part of parts) {
      if (part.toLowerCase() === qLower) {
        const mark = document.createElement("mark");
        mark.className =
          "doc-search-highlight doc-search-highlight-blink bg-teal-200/55 dark:bg-teal-700/40 text-foreground rounded px-0.5 font-medium";
        mark.textContent = part;
        fragment.appendChild(mark);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
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
