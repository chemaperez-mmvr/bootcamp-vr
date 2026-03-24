"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconChevronDown, IconChevronRight } from "./icons";
import type { DocumentationModule, ModuleSection } from "@/app/documentation/modules";

export type DocModulesNavItem = {
  module: DocumentationModule;
  sections: ModuleSection[];
};

type DocModulesNavProps = {
  modules: DocModulesNavItem[];
  /** When set, this module is expanded by default and can be visually highlighted */
  currentModuleSlug?: string;
};

export function DocModulesNav({ modules, currentModuleSlug }: DocModulesNavProps) {
  const t = useTranslations("docs");

  const initialExpanded = useMemo(() => {
    const map: Record<string, boolean> = {};
    const currentIndex = currentModuleSlug
      ? modules.findIndex(({ module }) => module.slug === currentModuleSlug)
      : 0;
    const toExpand = currentIndex >= 0 ? modules[currentIndex]?.module.id : modules[0]?.module.id;
    if (toExpand) map[toExpand] = true;
    return map;
  }, [modules, currentModuleSlug]);

  const [expandedModuleIds, setExpandedModuleIds] = useState<Record<string, boolean>>(initialExpanded);

  const toggleModule = (moduleId: string) => {
    setExpandedModuleIds((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  return (
    <nav className="space-y-1" role="navigation" aria-label="Documentation modules">
      {modules.map(({ module: mod, sections }) => {
        const isExpanded = expandedModuleIds[mod.id] ?? false;
        const isCurrent = currentModuleSlug === mod.slug;
        return (
          <div key={mod.id} className="mb-1">
            <div className="flex items-center gap-1 group">
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="flex items-center justify-center w-6 h-6 shrink-0 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition-colors"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Collapse module" : "Expand module"}
              >
                {isExpanded ? (
                  <IconChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <IconChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
              <Link
                href={`/documentation/module/${mod.slug}`}
                className={`flex-1 min-w-0 py-1.5 px-2 text-sm rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1 ${
                  isCurrent
                    ? "text-teal-600 font-medium bg-teal-50"
                    : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                }`}
              >
                {t(mod.titleKey)}
              </Link>
            </div>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <ul
                  className="ml-7 mt-0.5 mb-2 space-y-0.5 border-l-2 border-gray-200 pl-4 min-h-0"
                  role="list"
                >
                  {sections.map((section) => {
                    const isCurrentSection = isCurrent && typeof window !== 'undefined' && window.location.hash === `#${section.id}`;
                    const isEssential = section.priority === "essential";
                    return (
                      <li key={section.id}>
                        <Link
                          href={`/documentation/module/${mod.slug}#${section.id}`}
                          className={`flex items-center gap-1.5 py-1.5 text-sm rounded-md px-2 -ml-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1 ${
                            isCurrentSection
                              ? "text-teal-600 font-medium bg-teal-50"
                              : "text-gray-600 hover:text-teal-600 hover:bg-gray-50"
                          }`}
                        >
                          {isEssential && (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                          )}
                          <span>{t(section.titleKey)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
