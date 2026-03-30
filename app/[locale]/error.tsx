"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations("ui");
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-md text-center space-y-5">
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 ring-1 ring-teal-100"
          aria-hidden
        >
          <span className="text-2xl font-bold text-teal-600">!</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-900">{t("errorTitle")}</h1>
          <p className="text-sm text-gray-600 leading-relaxed">{t("errorDescription")}</p>
        </div>
        {isDev ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-left text-xs font-mono text-red-900 break-words border border-red-100">
            {error.message}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          {t("retry")}
        </button>
      </div>
    </div>
  );
}
