"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { IconBook, IconCheck, IconGraduationCap } from "./icons";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const VIDEO_SRC = "/video-seamlessly.mp4";

const bootcampBullets = ["curated", "stepByStep", "progressTracking"] as const;
const docsBullets = ["exhaustiveRef", "powerfulSearch", "categorized"] as const;

export function ConnectedLearningPaths() {
  const t = useTranslations("connectedPaths");
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {prefersReducedMotion ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/hero-bg.webp"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-bg.webp"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-white/85" aria-hidden />

      <AnimateOnScroll className="relative z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center animate-stagger-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
              {t("eyebrow")}
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-foreground">
              {t("heading")}
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10">
            <div className="section-card-hover rounded-xl border border-gray-200 bg-white p-6 lg:p-7 shadow-sm flex flex-col animate-stagger-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-600">
                  <IconGraduationCap className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  {t("learningPath")}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {t("bootcamp")}
              </h3>
              <p className="text-muted-foreground mb-5 flex-1">
                {t("bootcampDesc")}
              </p>
              <ul className="space-y-2.5 mb-6">
                {bootcampBullets.map((key) => (
                  <li key={key} className="flex items-center gap-3 text-sm text-gray-700">
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

            <div className="section-card-hover rounded-xl border border-gray-200 bg-white p-6 lg:p-7 shadow-sm flex flex-col animate-stagger-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-600">
                  <IconBook className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  {t("referenceMode")}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {t("documentation")}
              </h3>
              <p className="text-muted-foreground mb-5 flex-1">
                {t("docsDesc")}
              </p>
              <ul className="space-y-2.5 mb-6">
                {docsBullets.map((key) => (
                  <li key={key} className="flex items-center gap-3 text-sm text-gray-700">
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

          <div className="relative rounded-2xl border border-teal-200 bg-gradient-to-br from-white via-teal-50/40 to-white p-6 sm:p-8 lg:p-10 shadow-sm animate-stagger-4">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-10 sm:w-16 bg-teal-300" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                {t("bridgeLabel")}
              </span>
              <span className="h-px w-10 sm:w-16 bg-teal-300" aria-hidden />
            </div>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("bridgeDesc")}
            </p>

            <div
              className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-3 items-stretch"
              role="group"
              aria-label={t("bridgeLabel")}
            >
              <div className="flex flex-col rounded-xl border border-teal-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    <IconGraduationCap className="w-3.5 h-3.5" />
                    {t("exampleBootcampBadge")}
                  </span>
                </div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-teal-700/70 mb-1">
                  {t("exampleModuleLabel")}
                </p>
                <h4 className="text-base font-semibold text-foreground mb-2">
                  {t("exampleTitle")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("exampleBootcampHint")}
                </p>
              </div>

              <div
                className="hidden md:flex flex-col items-center justify-center gap-2 px-2"
                aria-hidden
              >
                <div className="flex flex-col items-center gap-1 text-teal-500">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="M11 5l-7 7 7 7" />
                  </svg>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600 text-center max-w-[7rem]">
                  {t("bridgeConnector")}
                </span>
              </div>

              <div
                className="flex md:hidden items-center justify-center gap-2 py-1 text-teal-500"
                aria-hidden
              >
                <span className="h-px flex-1 bg-teal-200" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600">
                  {t("bridgeConnector")}
                </span>
                <span className="h-px flex-1 bg-teal-200" />
              </div>

              <div className="flex flex-col rounded-xl border border-teal-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                    <IconBook className="w-3.5 h-3.5" />
                    {t("exampleDocsBadge")}
                  </span>
                </div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-teal-700/70 mb-1">
                  {t("exampleModuleLabel")}
                </p>
                <h4 className="text-base font-semibold text-foreground mb-2">
                  {t("exampleTitle")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("exampleDocsHint")}
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              {t("bridgeFootnote")}
            </p>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
