"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconSearch } from "./icons";
import {
  documentationModules,
  type DocumentationModule,
  type ModuleSection,
} from "@/app/documentation/modules";
import { getModuleSectionContent } from "@/app/documentation/content";

export type DocSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  /** "filter" = only input (e.g. list page). "navigate" = input + dropdown to jump to module/section */
  variant?: "filter" | "navigate";
  className?: string;
  /** Optional: limit dropdown height (navigate mode) */
  inputClassName?: string;
};

type MatchItem =
  | { type: "module"; module: DocumentationModule }
  | { type: "section"; module: DocumentationModule; section: ModuleSection; snippet?: string };

/** Extract a short readable snippet from body containing the query (original casing). */
function extractSnippet(body: string, query: string, maxLength = 140): string {
  const q = query.trim().toLowerCase();
  if (!q || !body) return "";
  const bodyLower = body.toLowerCase();
  const idx = bodyLower.indexOf(q);
  if (idx === -1) return "";

  const half = Math.floor((maxLength - q.length) / 2);
  let start = Math.max(0, idx - half);
  let end = Math.min(body.length, idx + query.length + half);

  let snippet = body.slice(start, end);
  snippet = snippet.replace(/\s+/g, " ").trim();
  snippet = snippet.replace(/\*\*([^*]+)\*\*/g, "$1");
  snippet = snippet.replace(/\[IMAGE[^\]]*\]/gi, "").trim();
  snippet = snippet.replace(/\s+/g, " ").trim();

  if (start > 0) snippet = "… " + snippet;
  if (end < body.length) snippet = snippet + " …";
  return snippet;
}

/** Renders snippet with the query term in bold (case-insensitive match, preserves original casing). */
function SnippetWithHighlight({ snippet, query }: { snippet: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{snippet}</>;
  const parts = snippet.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function getMatches(
  query: string,
  t: (key: string) => string,
  locale: string
): MatchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const items: MatchItem[] = [];
  for (const m of documentationModules) {
    const modTitle = t(m.titleKey).toLowerCase();
    const moduleTitleMatches = modTitle.includes(q);
    const sectionContent = getModuleSectionContent(m.slug, locale);

    const matchingSectionsWhenNoTitleMatch: { section: ModuleSection; snippet?: string }[] = [];

    for (const s of m.sections) {
      const sectionTitle = t(s.titleKey).toLowerCase();
      const sectionTitleMatches = sectionTitle.includes(q);
      const rawBody = sectionContent?.[s.id] ?? "";
      const body = rawBody.toLowerCase();
      const bodyMatches = body.includes(q);

      if (!moduleTitleMatches && (sectionTitleMatches || bodyMatches)) {
        const snippet = bodyMatches ? extractSnippet(rawBody, query) : undefined;
        matchingSectionsWhenNoTitleMatch.push({ section: s, snippet });
      }
    }

    if (moduleTitleMatches) {
      items.push({ type: "module", module: m });
      for (const s of m.sections) {
        items.push({ type: "section", module: m, section: s });
      }
    } else {
      for (const { section: s, snippet } of matchingSectionsWhenNoTitleMatch) {
        items.push({ type: "section", module: m, section: s, snippet });
      }
    }
  }
  return items;
}

export function DocSearchBar({
  value,
  onChange,
  variant = "filter",
  className = "",
  inputClassName = "",
}: DocSearchBarProps) {
  const t = useTranslations("docs");
  const locale = useLocale();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(
    () => (variant === "navigate" ? getMatches(value, t, locale) : []),
    [variant, value, t, locale]
  );
  const showDropdown = variant === "navigate" && value.trim().length > 0 && (focused || isDropdownOpen);

  useEffect(() => {
    if (variant !== "navigate" || !showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant, showDropdown]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative">
        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (variant === "navigate") setDropdownOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            if (variant === "navigate" && value.trim().length > 0) setDropdownOpen(true);
          }}
          onBlur={() => setFocused(false)}
          className={`w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputClassName}`}
          aria-label={t("searchLabel")}
          aria-expanded={showDropdown}
          aria-haspopup={variant === "navigate" ? "listbox" : undefined}
          role="combobox"
          autoComplete="off"
        />
      </div>

      {showDropdown && matches.length > 0 && (
        <ul
          className="absolute z-20 left-0 right-0 mt-1 py-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto"
          role="listbox"
          id="doc-search-results"
        >
          {matches.map((item) => {
            if (item.type === "module") {
              return (
                <li key={`mod-${item.module.id}`} role="option">
                  <Link
                    href={
                      value.trim()
                        ? `/documentation/module/${item.module.slug}?q=${encodeURIComponent(value.trim())}`
                        : `/documentation/module/${item.module.slug}`
                    }
                    className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-teal-50 hover:text-teal-700 focus:outline-none focus:bg-teal-50 focus:text-teal-700"
                    onClick={() => {
                      onChange("");
                      setDropdownOpen(false);
                    }}
                  >
                    {t(item.module.titleKey)}
                  </Link>
                </li>
              );
            }
            return (
              <li key={`sec-${item.module.id}-${item.section.id}`} role="option">
                <Link
                  href={
                    value.trim()
                      ? `/documentation/module/${item.module.slug}?q=${encodeURIComponent(value.trim())}#${item.section.id}`
                      : `/documentation/module/${item.module.slug}#${item.section.id}`
                  }
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-teal-50 hover:text-teal-700 pl-6 focus:outline-none focus:bg-teal-50 focus:text-teal-700"
                  onClick={() => {
                    onChange("");
                    setDropdownOpen(false);
                  }}
                >
                  <span className="font-medium text-foreground">{t(item.section.titleKey)}</span>
                  <span className="text-gray-500 font-normal ml-1">
                    — {t(item.module.titleKey)}
                  </span>
                  {item.snippet && (
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2" title={item.snippet}>
                      <SnippetWithHighlight snippet={item.snippet} query={value} />
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {variant === "navigate" && value.trim().length > 0 && matches.length === 0 && showDropdown && (
        <div className="absolute z-20 left-0 right-0 mt-1 py-3 px-4 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-muted-foreground">
          {t("noMatchModules", { query: value })}
        </div>
      )}
    </div>
  );
}

/** Client wrapper with its own state for use on the module page (navigate mode). */
export function DocSearchBarNavigate({ className }: { className?: string }) {
  const [value, setValue] = useState("");
  return (
    <DocSearchBar value={value} onChange={setValue} variant="navigate" className={className} />
  );
}
