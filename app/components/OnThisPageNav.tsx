"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { ModuleSection } from "@/app/documentation/modules";

type OnThisPageNavProps = {
  sections: ModuleSection[];
};

export function OnThisPageNav({ sections }: OnThisPageNavProps) {
  const t = useTranslations("docs");
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      rootMargin: "-100px 0px -66% 0px",
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
    <aside className="hidden xl:block w-64 shrink-0 sticky top-[76px] self-start h-[calc(100vh-100px)] overflow-y-auto">
      <div className="border-l-2 border-gray-200 pl-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          {t("onThisPage")}
        </h2>
        <nav className="space-y-1" aria-label="Table of contents">
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
