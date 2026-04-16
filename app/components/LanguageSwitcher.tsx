"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useRef, useEffect, useState, useId, type KeyboardEvent } from "react";
import { Globe } from "lucide-react";

type AppLocale = (typeof routing.locales)[number];

const LOCALE_LABELS: Record<AppLocale, string> = {
  en: "English",
  es: "Español",
};

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pendingMenuFocus = useRef<"first" | "last" | null>(null);
  const triggerId = useId();
  const menuId = useId();

  function handleChange(newLocale: AppLocale) {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }
    const hash = window.location.hash;
    router.replace(pathname + hash, { locale: newLocale });
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!open || pendingMenuFocus.current === null) return;
    const which = pendingMenuFocus.current;
    pendingMenuFocus.current = null;
    const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (!items?.length) return;
    if (which === "first") items[0].focus();
    else items[items.length - 1].focus();
  }, [open]);

  function focusSiblingMenuItem(current: HTMLElement, delta: number) {
    const menu = menuRef.current;
    if (!menu) return;
    const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    if (items.length === 0) return;
    const i = items.indexOf(current);
    const from = i < 0 ? (delta > 0 ? -1 : 0) : i;
    const next = (from + delta + items.length) % items.length;
    items[next]?.focus();
  }

  function handleMenuKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.getAttribute("role") === "menuitem") {
        focusSiblingMenuItem(active, e.key === "ArrowDown" ? 1 : -1);
      } else {
        const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        (e.key === "ArrowDown" ? items?.[0] : items?.[items.length - 1])?.focus();
      }
    }
    if (e.key === "Home") {
      e.preventDefault();
      menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    }
    if (e.key === "End") {
      e.preventDefault();
      const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
      items?.[items.length - 1]?.focus();
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        aria-label={t("changeLanguage")}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) {
              pendingMenuFocus.current = e.key === "ArrowDown" ? "first" : "last";
              setOpen(true);
            } else {
              queueMicrotask(() => {
                const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
                if (e.key === "ArrowDown") items?.[0]?.focus();
                else items?.[items.length - 1]?.focus();
              });
            }
          }
        }}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/50 bg-white/60 text-teal-700 shadow-sm transition-all duration-200 hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1 md:h-10 md:w-10 md:rounded-full"
      >
        <Globe className="w-5 h-5" strokeWidth={2} />
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          className="absolute right-0 top-full mt-2 min-w-[10rem] rounded-xl border border-gray-200 bg-white shadow-lg py-1 z-[100]"
          role="menu"
          aria-labelledby={triggerId}
          aria-orientation="vertical"
          onKeyDown={handleMenuKeyDown}
        >
          {routing.locales.map((code) => (
            <button
              key={code}
              type="button"
              role="menuitem"
              onClick={() => handleChange(code)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset first:rounded-t-xl last:rounded-b-xl ${
                locale === code
                  ? "bg-teal-50 text-teal-700 hover:bg-teal-100"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {LOCALE_LABELS[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
