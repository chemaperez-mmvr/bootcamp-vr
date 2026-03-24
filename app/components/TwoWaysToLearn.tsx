"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { IconBook, IconCheck, IconGraduationCap } from "./icons";

const bootcampBullets = ["curated", "stepByStep", "progressTracking", "linksToDocs"] as const;
const docsBullets = ["exhaustiveRef", "powerfulSearch", "categorized", "linksToBootcamp"] as const;
const listStaggerClasses = ["animate-stagger-4", "animate-stagger-5", "animate-stagger-6", "animate-stagger-7"] as const;

export function TwoWaysToLearn() {
  const t = useTranslations("twoWays");

  return (
    <section className="py-16 sm:py-24 bg-white">
      <AnimateOnScroll>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-stagger-1">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              {t("heading")}
            </h2>
            <p className="mt-1 text-muted-foreground max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="section-card-hover rounded-xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm flex flex-col animate-stagger-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-600">
                <IconGraduationCap className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                {t("learningPath")}
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">{t("bootcamp")}</h3>
            <p className="mt-1 text-muted-foreground mb-6 flex-1">
              {t("bootcampDesc")}
            </p>
            <ul className="space-y-3 mb-6">
              {bootcampBullets.map((key, i) => (
                <li
                  key={key}
                  className={`flex items-center gap-3 text-gray-700 ${listStaggerClasses[i]}`}
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-500 text-white flex-shrink-0">
                    <IconCheck className="w-3 h-3" />
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 text-base font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
            >
              {t("startLearning")}
            </Link>
          </div>

          <div className="section-card-hover rounded-xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm flex flex-col animate-stagger-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-600">
                <IconBook className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                {t("referenceMode")}
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">{t("documentation")}</h3>
            <p className="mt-1 text-muted-foreground mb-6 flex-1">
              {t("docsDesc")}
            </p>
            <ul className="space-y-3 mb-6">
              {docsBullets.map((key, i) => (
                <li
                  key={key}
                  className={`flex items-center gap-3 text-gray-700 ${listStaggerClasses[i]}`}
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-500 text-white flex-shrink-0">
                    <IconCheck className="w-3 h-3" />
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
            <Link
              href="/documentation"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 text-base font-medium text-gray-700 bg-white border-2 border-teal-500 rounded-lg hover:bg-teal-50 transition-colors"
            >
              {t("browseDocs")}
            </Link>
          </div>
        </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
