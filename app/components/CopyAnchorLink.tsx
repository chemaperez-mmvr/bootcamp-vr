"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type CopyAnchorLinkProps = {
  sectionId: string;
  className?: string;
};

export function CopyAnchorLink({ sectionId, className = "" }: CopyAnchorLinkProps) {
  const t = useTranslations("docs");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const url = typeof window !== "undefined" 
      ? `${window.location.origin}${window.location.pathname}#${sectionId}`
      : `#${sectionId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`inline-flex items-center justify-center w-6 h-6 rounded text-gray-500 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1 transition-colors ${className}`}
      aria-label={copied ? t("linkCopied") : t("copyLink")}
      title={copied ? t("linkCopied") : t("copyLink")}
    >
      {copied ? (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      )}
    </button>
  );
}
