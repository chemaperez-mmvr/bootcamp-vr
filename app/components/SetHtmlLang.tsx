"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/**
 * Root `app/layout.tsx` sets `<html lang>` from the server on first load, but Next.js
 * keeps that layout mounted across client navigations. The language switcher uses
 * `router.replace(..., { locale })`, so the document `lang` must be updated here when
 * `useLocale()` changes; otherwise assistive tech and browsers keep the previous locale.
 */
export function SetHtmlLang() {
  const locale = useLocale();
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
