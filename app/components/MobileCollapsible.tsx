"use client";

import { useState, type ReactNode } from "react";
import { IconChevronDown } from "./icons";

/**
 * Shows children as-is on lg+ screens. On smaller screens, collapses them
 * behind a toggle button labeled with `label`.
 */
export function MobileCollapsible({
  label,
  children,
  defaultOpen = false,
  id,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = id ?? "mobile-collapsible-panel";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden flex items-center justify-between w-full gap-2 px-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-medium text-sm text-gray-900">{label}</span>
        <IconChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div id={panelId} className={`${open ? "block" : "hidden"} lg:block`}>
        {children}
      </div>
    </>
  );
}
