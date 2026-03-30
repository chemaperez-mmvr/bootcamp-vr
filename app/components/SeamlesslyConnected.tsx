"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { IconBook, IconDocument, IconGraduationCap } from "./icons";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const SEAMLESS_VIDEO_SRC = "/video-seamlessly.mp4";

export function SeamlesslyConnected() {
  const t = useTranslations("seamless");
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Video de fondo */}
      {prefersReducedMotion ? (
        <div className="absolute inset-0 w-full h-full" aria-hidden>
          <Image
            src="/hero-bg.jpg"
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
          poster="/hero-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        >
          <source src={SEAMLESS_VIDEO_SRC} type="video/mp4" />
        </video>
      )}
      {/* Filtro blanco sobre el video */}
      <div className="absolute inset-0 bg-white/75" aria-hidden />
      <AnimateOnScroll className="relative z-10">
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
          <div className="section-card-hover rounded-xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm animate-stagger-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-teal-600">
                <IconGraduationCap className="w-6 h-6" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{t("fromBootcamp")}</h3>
            </div>
            <p className="mt-1 text-muted-foreground mb-6">
              {t("fromBootcampDesc")}
            </p>
            <Link
              href="/documentation/module/getting-vr-ready#specifications"
              className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              <IconBook className="w-5 h-5 flex-shrink-0" />
              {t("relatedHardware")}
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="section-card-hover rounded-xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm animate-stagger-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-teal-600">
                <IconDocument className="w-6 h-6" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{t("fromDocs")}</h3>
            </div>
            <p className="mt-1 text-muted-foreground mb-6">
              {t("fromDocsDesc")}
            </p>
            <Link
              href="/documentation/module/getting-vr-ready"
              className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              <IconGraduationCap className="w-5 h-5 flex-shrink-0" />
              {t("learnInContext")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
