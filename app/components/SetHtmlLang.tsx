"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

export function SetHtmlLang() {
  const locale = useLocale();
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
