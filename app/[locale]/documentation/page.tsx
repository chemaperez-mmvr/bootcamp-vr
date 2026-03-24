"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IconGraduationCap, IconLightning } from "../../components/icons";
import { DocModulesNav } from "../../components/DocModulesNav";
import { DocSearchBar } from "../../components/DocSearchBar";
import type { ModuleCategoryId } from "@/app/documentation/modules";
import {
  documentationModules,
  type DocumentationModule,
  type ModuleSection,
} from "@/app/documentation/modules";
import { getModuleSectionContent } from "@/app/documentation/content";
import { quickStartSteps, getQuickStartHref } from "@/app/documentation/quickStartSteps";

/** Map module categoryId to docs i18n key for the tag label */
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

/** Category ids that have at least one module (order = first appearance in modules). */
const categoryIdsWithModules = [...new Set(documentationModules.map((m) => m.categoryId))] as ModuleCategoryId[];

export default function DocumentationPage() {
  const t = useTranslations("docs");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ModuleCategoryId | "">("");

  /** Filter modules by search and by category. */
  const filteredModulesForDisplay = useMemo((): {
    module: DocumentationModule;
    sections: ModuleSection[];
  }[] => {
    const q = searchQuery.trim().toLowerCase();

    let list: { module: DocumentationModule; sections: ModuleSection[] }[];

    if (!q) {
      list = documentationModules.map((m) => ({ module: m, sections: m.sections }));
    } else {
      list = documentationModules
        .map((m) => {
          const modTitle = t(m.titleKey).toLowerCase();
          const sectionContent = getModuleSectionContent(m.slug, locale);

          const titleMatches = modTitle.includes(q);
          const sectionsMatching = m.sections.filter((s) => {
            const sectionTitle = t(s.titleKey).toLowerCase();
            const titleMatch = sectionTitle.includes(q);
            const body = (sectionContent?.[s.id] ?? "").toLowerCase();
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
  }, [searchQuery, categoryFilter, t, locale]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPath="/documentation" />

      <main id="main-content" tabIndex={-1} className="flex-1 bg-white pt-10 sm:pt-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
            <p className="mt-2 text-sm text-gray-500">{t("sampleNote")}</p>
          </header>

          {/* Quick Start Guide */}
          {!searchQuery && !categoryFilter && (
            <div className="mb-10 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50/80 to-white p-6 sm:p-8 doc-part-enter" style={{ animationDelay: "120ms" }}>
              <div className="flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500 text-white shrink-0">
                  <IconLightning className="w-5 h-5" />
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t("quickStart.title")}
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-6 ml-12">
                {t("quickStart.subtitle")}
              </p>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 list-none p-0 m-0">
                {quickStartSteps.map((step) => (
                  <li key={step.step}>
                    <Link
                      href={getQuickStartHref(step, true)}
                      className="group flex flex-col h-full rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-teal-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                    >
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-sm font-bold mb-2 shrink-0">
                        {step.step}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 mb-1">
                        {t(step.titleKey)}
                      </span>
                      <span className="text-xs text-gray-500 flex-1">
                        {t(step.descKey)}
                      </span>
                      <span className="mt-2 text-xs font-medium text-teal-600 group-hover:text-teal-700 transition-colors">
                        {t("quickStart.readSection")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Search Bar - Centered */}
          <div className="mb-6 flex justify-center">
            <DocSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              variant="filter"
              className="max-w-2xl w-full"
            />
          </div>

          {/* Two-column layout (sidebar + content) */}
          <div className="flex flex-col lg:flex-row gap-8 pb-12">
            {/* Left Sidebar - Navigation */}
            <aside className="lg:w-64 shrink-0 lg:sticky lg:top-[76px] lg:self-start lg:h-[calc(100vh-100px)] flex flex-col">
              <div className="mb-4 pr-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("modulesLabel")}
                </h2>
                <label htmlFor="doc-category-filter" className="sr-only">
                  {t("categories")}
                </label>
                <select
                  id="doc-category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter((e.target.value || "") as ModuleCategoryId | "")}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  aria-label={t("categories")}
                >
                  <option value="">{t("filterAll")}</option>
                  {categoryIdsWithModules.map((id) => (
                    <option key={id} value={id}>
                      {t(getCategoryLabelKey(id))}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto pr-2">
                <DocModulesNav modules={filteredModulesForDisplay} />
              </div>
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
                <ul className="space-y-4" role="list" data-testid="module-list">
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
                            <p className="text-xs font-medium text-gray-500 mb-1.5">{t("includesLabel")}</p>
                            <ul className="flex flex-wrap gap-1.5" role="list" aria-label={t("includesLabel")}>
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
        </div>

        {/* CTA Bootcamp */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-gray-200 bg-gray-100/80 shadow-sm doc-part-enter doc-part-delay-cta">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500 text-white shrink-0">
                <IconGraduationCap className="w-6 h-6" />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{t("wantGuided")}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  {t("bootcampCta")}
                </p>
              </div>
            </div>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-700 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {t("startBootcamp")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
