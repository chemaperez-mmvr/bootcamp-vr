"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { ModuleSection } from "@/app/documentation/modules";
import { getBootcampModuleBySlug } from "@/app/bootcamp/catalog";
import { Link } from "@/i18n/navigation";
import { IconGraduationCap } from "./icons";

type OnThisPageNavProps = {
  sections: ModuleSection[];
  moduleSlug: string;
};

export function OnThisPageNav({ sections, moduleSlug }: OnThisPageNavProps) {
  const t = useTranslations("docs");
  const [activeSection, setActiveSection] = useState<string>("");
  const bootcampModule = getBootcampModuleBySlug(moduleSlug);
  const hasBootcamp = bootcampModule?.enabled ?? false;

  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      rootMargin: "-220px 0px -66% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sectionElements = sections.map((section) =>
      document.getElementById(section.id)
    ).filter(Boolean) as HTMLElement[];

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0 sticky self-start overflow-y-auto xl:[top:var(--docs-sticky-offset,204px)] xl:[height:calc(100vh-var(--docs-sticky-offset,204px)-24px)] xl:transition-[top,height] xl:duration-200 xl:ease-out">
      <div className="border-l-2 border-gray-200 pl-6">
        {hasBootcamp && (
          <Link
            href={`/bootcamp/module/${moduleSlug}`}
            className="group mb-6 block rounded-lg border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-3 shadow-sm transition-all hover:border-teal-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1"
          >
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                <IconGraduationCap className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                  {t("practiceInBootcampLabel")}
                </p>
                <p className="mt-0.5 text-sm font-medium text-gray-900 leading-snug">
                  {t("practiceInBootcampCta")}
                  <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </p>
              </div>
            </div>
          </Link>
        )}
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          {t("onThisPage")}
        </h2>
        <nav className="space-y-1" aria-label={t("tableOfContents")}>
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const isEssential = section.priority === "essential";
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center gap-1.5 text-sm py-1.5 transition-colors rounded-md px-2 -ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1 ${
                  isActive
                    ? "text-teal-600 font-medium bg-teal-50"
                    : "text-gray-600 hover:text-teal-600 hover:bg-gray-50"
                }`}
              >
                {isEssential && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" aria-label={t("essentialBadge")} />
                )}
                <span>{t(section.titleKey)}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
