"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useRef, useEffect, useState } from "react";
import { Globe } from "lucide-react";

const locales = [
  { code: "en" as const, label: "English" },
  { code: "es" as const, label: "Español" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleChange(newLocale: "en" | "es") {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
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

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Cambiar idioma / Change language"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur-sm text-teal-600 hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1 transition-colors"
      >
        <Globe className="w-5 h-5" strokeWidth={2} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 min-w-[10rem] rounded-xl border border-gray-200 bg-white shadow-lg py-1 z-[100]"
          role="menu"
          aria-orientation="vertical"
        >
          {locales.map(({ code, label }) => (
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
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
