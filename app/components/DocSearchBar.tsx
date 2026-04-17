"use client";

import { useState, useMemo, useRef, useEffect, type KeyboardEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { IconClose, IconGraduationCap, IconSearch } from "./icons";
import {
  documentationModules,
  getModuleBySlug,
  type DocumentationModule,
  type ModuleSection,
} from "@/app/documentation/modules";
import { getModuleSectionContent } from "@/app/documentation/content";

/** Curated quick starts shown when the search is focused but empty. */
const POPULAR_TOPICS: Array<{ moduleSlug: string; sectionId: string }> = [
  { moduleSlug: "basic-foundations", sectionId: "what-is-vr" },
  { moduleSlug: "getting-vr-ready", sectionId: "casting" },
  { moduleSlug: "classroom-implementation", sectionId: "student-briefing" },
  { moduleSlug: "safety-wellbeing-accessibility", sectionId: "motion-sickness-fatigue" },
  { moduleSlug: "solving-common-vr-problems", sectionId: "wifi-connection" },
];

/** Lowercase + strip diacritics so "conexion" matches "Conexión", "video" matches "vídeo", etc. */
function normalize(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

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
  | { type: "section"; module: DocumentationModule; section: ModuleSection; snippet?: string; titleMatch?: boolean };

/** Extract a short readable snippet from body containing the query (original casing, accent-insensitive). */
function extractSnippet(body: string, query: string, maxLength = 140): string {
  const q = normalize(query.trim());
  if (!q || !body) return "";
  const bodyNorm = normalize(body);
  const idx = bodyNorm.indexOf(q);
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

/** Renders snippet with the query term in bold (case and accent-insensitive, preserves original text). */
function SnippetWithHighlight({ snippet, query }: { snippet: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{snippet}</>;
  const qNorm = normalize(q);
  const snippetNorm = normalize(snippet);
  if (!qNorm || !snippetNorm.includes(qNorm)) return <>{snippet}</>;

  const parts: Array<{ text: string; match: boolean }> = [];
  let cursor = 0;
  let idx = snippetNorm.indexOf(qNorm);
  while (idx !== -1) {
    if (idx > cursor) parts.push({ text: snippet.slice(cursor, idx), match: false });
    parts.push({ text: snippet.slice(idx, idx + qNorm.length), match: true });
    cursor = idx + qNorm.length;
    idx = snippetNorm.indexOf(qNorm, cursor);
  }
  if (cursor < snippet.length) parts.push({ text: snippet.slice(cursor), match: false });

  return (
    <>
      {parts.map((p, i) =>
        p.match ? (
          <strong key={i} className="font-semibold text-foreground">
            {p.text}
          </strong>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  );
}

/** Max body-only mentions to show (reduces noise). */
const MAX_BODY_MENTIONS = 3;

function getMatches(
  query: string,
  t: (key: string) => string,
  locale: string
): MatchItem[] {
  const q = normalize(query.trim());
  if (!q) return [];
  const titleHits: MatchItem[] = [];
  const bodyHits: MatchItem[] = [];

  for (const m of documentationModules) {
    const modTitle = normalize(t(m.titleKey));
    const moduleTitleMatches = modTitle.includes(q);
    const sectionContent = getModuleSectionContent(m.slug, locale);

    if (moduleTitleMatches) {
      titleHits.push({ type: "module", module: m });
      for (const s of m.sections) {
        titleHits.push({ type: "section", module: m, section: s, titleMatch: true });
      }
      continue;
    }

    for (const s of m.sections) {
      const sectionTitle = normalize(t(s.titleKey));
      const sectionTitleMatches = sectionTitle.includes(q);
      const rawBody = sectionContent?.[s.id] ?? "";
      const body = normalize(rawBody);
      const bodyMatches = body.includes(q);

      if (sectionTitleMatches) {
        titleHits.push({ type: "section", module: m, section: s, titleMatch: true });
      } else if (bodyMatches) {
        const snippet = extractSnippet(rawBody, query);
        bodyHits.push({ type: "section", module: m, section: s, snippet, titleMatch: false });
      }
    }
  }

  return [...titleHits, ...bodyHits.slice(0, MAX_BODY_MENTIONS)];
}

function itemKey(item: MatchItem): string {
  if (item.type === "module") return `mod-${item.module.id}`;
  return `sec-${item.module.id}-${item.section.id}`;
}

function itemHref(item: MatchItem, query: string): string {
  const trimmed = query.trim();
  const qParam = trimmed ? `?q=${encodeURIComponent(trimmed)}` : "";
  if (item.type === "module") {
    return `/documentation/module/${item.module.slug}${qParam}`;
  }
  return `/documentation/module/${item.module.slug}${qParam}#${item.section.id}`;
}

function splitMatches(matches: MatchItem[]) {
  const titleHits = matches.filter((m) => m.type === "module" || m.titleMatch);
  const bodyOnly = matches.filter((m) => m.type === "section" && !m.titleMatch);
  const hasBoth = titleHits.length > 0 && bodyOnly.length > 0;
  const primary = titleHits.length > 0 ? titleHits : bodyOnly;
  const secondary = hasBoth ? bodyOnly : [];
  return { primary, secondary };
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
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isMac, setIsMac] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const matches = useMemo(
    () => (variant === "navigate" ? getMatches(value, t, locale) : []),
    [variant, value, t, locale]
  );
  const { primary, secondary } = useMemo(() => splitMatches(matches), [matches]);
  const flatItems = useMemo(() => [...primary, ...secondary], [primary, secondary]);
  const showDropdown = variant === "navigate" && value.trim().length > 0 && (focused || isDropdownOpen);
  const activeId = activeIdx >= 0 && flatItems[activeIdx] ? `doc-search-item-${itemKey(flatItems[activeIdx])}` : undefined;

  useEffect(() => {
    setActiveIdx(-1);
  }, [value]);

  useEffect(() => {
    setIsMac(/Mac|iPad|iPhone|iPod/.test(navigator.platform));
  }, []);

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

  useEffect(() => {
    if (variant !== "navigate") return;
    const onGlobalKey = (e: globalThis.KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        return;
      }
      if (e.key === "/") {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [variant]);

  useEffect(() => {
    if (activeIdx < 0 || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const closeAndReset = () => {
    onChange("");
    setDropdownOpen(false);
    setActiveIdx(-1);
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (variant !== "navigate") return;
    if (e.key === "ArrowDown") {
      if (flatItems.length === 0) return;
      e.preventDefault();
      setDropdownOpen(true);
      setActiveIdx((i) => (i + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      if (flatItems.length === 0) return;
      e.preventDefault();
      setDropdownOpen(true);
      setActiveIdx((i) => (i <= 0 ? flatItems.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (flatItems.length === 0) return;
      const target = activeIdx >= 0 ? flatItems[activeIdx] : flatItems[0];
      if (!target) return;
      e.preventDefault();
      router.push(itemHref(target, value));
      closeAndReset();
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (showDropdown) {
        setDropdownOpen(false);
        setActiveIdx(-1);
      } else if (value) {
        onChange("");
      } else {
        inputRef.current?.blur();
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative">
        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
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
          onKeyDown={onInputKeyDown}
          className={`w-full pl-12 ${variant === "navigate" ? "pr-20" : "pr-10"} py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:appearance-none ${inputClassName}`}
          aria-label={t("searchLabel")}
          aria-expanded={showDropdown}
          aria-haspopup={variant === "navigate" ? "listbox" : undefined}
          aria-controls={variant === "navigate" ? "doc-search-results" : undefined}
          aria-activedescendant={activeId}
          role="combobox"
          autoComplete="off"
        />
        {variant === "navigate" && !focused && !value && (
          <kbd
            aria-hidden
            className="hidden sm:inline-flex items-center gap-1 absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 text-[11px] font-sans font-medium text-gray-500 pointer-events-none"
          >
            <span>{isMac ? "⌘" : "Ctrl"}</span>
            <span>K</span>
          </kbd>
        )}
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            aria-label={t("clearSearch")}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition-colors"
          >
            <IconClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && flatItems.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto"
          role="listbox"
          id="doc-search-results"
        >
          {primary.map((item, i) => {
            const idx = i;
            const isActive = idx === activeIdx;
            const id = `doc-search-item-${itemKey(item)}`;
            if (item.type === "module") {
              return (
                <li key={itemKey(item)} role="option" aria-selected={isActive} id={id} data-idx={idx}>
                  <Link
                    href={itemHref(item, value)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={closeAndReset}
                    className={`block px-4 py-3 focus:outline-none transition-colors ${isActive ? "bg-teal-100" : "hover:bg-teal-50 focus:bg-teal-50"}`}
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {t(item.module.titleKey)}
                    </span>
                  </Link>
                </li>
              );
            }
            return (
              <li key={itemKey(item)} role="option" aria-selected={isActive} id={id} data-idx={idx}>
                <Link
                  href={itemHref(item, value)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={closeAndReset}
                  className={`block px-4 py-3 focus:outline-none transition-colors ${isActive ? "bg-teal-100" : "hover:bg-teal-50 focus:bg-teal-50"}`}
                >
                  <span className="block text-sm font-semibold text-gray-900">
                    {t(item.section.titleKey)}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5">
                    {t(item.module.titleKey)}
                  </span>
                </Link>
              </li>
            );
          })}
          {secondary.length > 0 && (
            <>
              <li className="px-4 py-2 bg-gray-50 border-t border-gray-100" role="separator">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                  {t("alsoMentioned")}
                </span>
              </li>
              {secondary.map((item, i) => {
                if (item.type !== "section") return null;
                const idx = primary.length + i;
                const isActive = idx === activeIdx;
                const id = `doc-search-item-${itemKey(item)}`;
                return (
                  <li key={itemKey(item)} role="option" aria-selected={isActive} id={id} data-idx={idx}>
                    <Link
                      href={itemHref(item, value)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={closeAndReset}
                      className={`block px-4 py-2 focus:outline-none transition-colors ${isActive ? "bg-teal-100" : "hover:bg-gray-50 focus:bg-gray-50"}`}
                    >
                      <span className="block text-xs text-gray-500">
                        {t(item.section.titleKey)}
                        <span className="text-gray-300 mx-1">·</span>
                        <span className="text-gray-400">{t(item.module.titleKey)}</span>
                      </span>
                      {item.snippet && (
                        <p className="mt-0.5 text-[11px] text-gray-400 line-clamp-1">
                          <SnippetWithHighlight snippet={item.snippet} query={value} />
                        </p>
                      )}
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      )}

      {variant === "navigate" && focused && !value.trim() && (
        <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2">
            <div className="px-3 pt-1 pb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                {t("popularTopics")}
              </span>
            </div>
            <ul role="list" className="space-y-0.5">
              {POPULAR_TOPICS.map(({ moduleSlug, sectionId }) => {
                const mod = getModuleBySlug(moduleSlug);
                if (!mod) return null;
                const section = mod.sections.find((s) => s.id === sectionId);
                if (!section) return null;
                return (
                  <li key={`${moduleSlug}-${sectionId}`}>
                    <Link
                      href={`/documentation/module/${moduleSlug}#${sectionId}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { setDropdownOpen(false); setFocused(false); inputRef.current?.blur(); }}
                      className="flex items-baseline gap-2 px-3 py-2 rounded-md hover:bg-teal-50 focus:outline-none focus:bg-teal-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {t(section.titleKey)}
                      </span>
                      <span className="text-xs text-gray-400 truncate ml-auto">
                        {t(mod.titleKey)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border-t border-gray-100 bg-gray-50 p-2">
            <Link
              href="/bootcamp"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { setDropdownOpen(false); setFocused(false); inputRef.current?.blur(); }}
              className="group flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white focus:outline-none focus:bg-white transition-colors"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                <IconGraduationCap className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-gray-900">{t("newToVr")}</span>
                <span className="block text-xs text-gray-500">{t("startBootcampHint")}</span>
              </span>
              <span aria-hidden className="text-teal-500 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
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
