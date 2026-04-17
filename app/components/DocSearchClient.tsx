"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DocModulesNav } from "./DocModulesNav";
import { DocSearchBar } from "./DocSearchBar";
import { MobileCollapsible } from "./MobileCollapsible";
import type {
  DocumentationModule,
  ModuleSection,
  ModuleCategoryId,
} from "@/app/documentation/modules";

const categoryLabelKeys: Record<string, string> = {
  fundamentals: "vrFundamentals",
  hardware: "hardwareSetup",
  pedagogy: "pedagogicalDesign",
  implementation: "implementation",
  assessment: "assessment",
  troubleshooting: "troubleshooting",
  safety: "safetyCompliance",
};

function getCategoryLabelKey(categoryId: string): string {
  return categoryLabelKeys[categoryId] ?? "vrFundamentals";
}

type DocSearchClientProps = {
  modules: DocumentationModule[];
  sectionContentByModule: Record<string, Record<string, string>>;
  categoryIds: ModuleCategoryId[];
};

export function DocSearchClient({
  modules,
  sectionContentByModule,
  categoryIds,
}: DocSearchClientProps) {
  const t = useTranslations("docs");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ModuleCategoryId | "">(
    ""
  );

  const filteredModulesForDisplay = useMemo((): {
    module: DocumentationModule;
    sections: ModuleSection[];
  }[] => {
    const q = searchQuery.trim().toLowerCase();

    let list: { module: DocumentationModule; sections: ModuleSection[] }[];

    if (!q) {
      list = modules.map((m) => ({ module: m, sections: m.sections }));
    } else {
      list = modules
        .map((m) => {
          const modTitle = t(m.titleKey).toLowerCase();
          const sectionContent = sectionContentByModule[m.slug] ?? {};

          const titleMatches = modTitle.includes(q);
          const sectionsMatching = m.sections.filter((s) => {
            const sectionTitle = t(s.titleKey).toLowerCase();
            const titleMatch = sectionTitle.includes(q);
            const body = (sectionContent[s.id] ?? "").toLowerCase();
            const bodyMatch = body.includes(q);
            return titleMatch || bodyMatch;
          });

          const moduleMatches = titleMatches || sectionsMatching.length > 0;

          if (!moduleMatches) {
            return { module: m, sections: [] };
          }

          const sections = titleMatches ? m.sections : sectionsMatching;
          return { module: m, sections };
        })
        .filter((x) => x.sections.length > 0);
    }

    if (categoryFilter) {
      list = list.filter(({ module: m }) => m.categoryId === categoryFilter);
    }

    return list;
  }, [searchQuery, categoryFilter, t, modules, sectionContentByModule]);

  return (
    <>
      {/* Search Bar - Centered */}
      <div className="mb-6 flex justify-center">
        <DocSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          variant="navigate"
          className="max-w-2xl w-full"
        />
      </div>

      {/* Two-column layout (sidebar + content) */}
      <div className="flex flex-col lg:flex-row gap-8 pb-12">
        {/* Left Sidebar - Navigation */}
        <aside className="lg:w-64 shrink-0 lg:sticky lg:top-[76px] lg:self-start lg:h-[calc(100vh-100px)] flex flex-col">
          <MobileCollapsible label={t("modulesLabel")} id="docs-index-modules-nav">
            <div className="hidden lg:block mb-4 pr-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {t("modulesLabel")}
              </h2>
            </div>
            <div className="mb-4 pr-2">
              <label htmlFor="doc-category-filter" className="sr-only">
                {t("categories")}
              </label>
              <select
                id="doc-category-filter"
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    (e.target.value || "") as ModuleCategoryId | ""
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                aria-label={t("categories")}
              >
                <option value="">{t("filterAll")}</option>
                {categoryIds.map((id) => (
                  <option key={id} value={id}>
                    {t(getCategoryLabelKey(id))}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto pr-2 mb-6 lg:mb-0">
              <DocModulesNav modules={filteredModulesForDisplay} />
            </div>
          </MobileCollapsible>
        </aside>

        {/* Main Content - Module list */}
        <div className="flex-1 min-w-0 max-w-4xl min-h-[420px]">
          {filteredModulesForDisplay.length === 0 ? (
            <div className="rounded-lg bg-white px-6 py-12 text-center border border-gray-200">
              <p className="text-gray-500">
                {t("noMatchModules", { query: searchQuery })}
              </p>
            </div>
          ) : (
            <ul
              className="space-y-4"
              role="list"
              data-testid="module-list"
            >
              {filteredModulesForDisplay.map(({ module: mod }, index) => (
                <li
                  key={mod.id}
                  className="relative rounded-lg bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:bg-teal-50/50 hover:border-teal-500 doc-part-enter"
                  style={{ animationDelay: `${240 + index * 50}ms` }}
                >
                  <Link
                    href={`/documentation/module/${mod.slug}`}
                    className="block px-5 py-5 sm:px-6 sm:py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg pr-20"
                  >
                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
                        {t(getCategoryLabelKey(mod.categoryId))}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-gray-900">
                      {t(mod.titleKey)}
                    </h3>
                    <p className="mt-1 text-[15px] text-gray-600 leading-snug">
                      {t(mod.descriptionKey)}
                    </p>
                    {mod.sections.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-500 mb-1.5">
                          {t("includesLabel")}
                        </p>
                        <ul
                          className="flex flex-wrap gap-1.5"
                          role="list"
                          aria-label={t("includesLabel")}
                        >
                          {mod.sections.slice(0, 3).map((s) => (
                            <li key={s.id}>
                              <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                {t(s.titleKey)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Link>
                  <Link
                    href={`/documentation/module/${mod.slug}`}
                    className="absolute top-5 right-5 sm:top-6 sm:right-6 underline hover:no-underline text-xs font-medium text-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                  >
                    {t("goToModule")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
