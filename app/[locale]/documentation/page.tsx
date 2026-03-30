import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  alternatesForLocalizedPath,
  defaultOgImage,
  openGraphLocales,
  siteName,
} from "@/i18n/languageAlternates";
import { Link } from "@/i18n/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IconGraduationCap } from "../../components/icons";
import {
  documentationModules,
  type ModuleCategoryId,
} from "@/app/documentation/modules";
import { getModuleSectionContent } from "@/app/documentation/content";
import { routing } from "@/i18n/routing";
import { DocSearchClient } from "../../components/DocSearchClient";

const categoryIdsWithModules = Array.from(
  new Set(documentationModules.map((m) => m.categoryId))
) as ModuleCategoryId[];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });
  const title = t("metaTitle");
  const description = t("metaDesc");
  const og = openGraphLocales(locale);
  return {
    title,
    description,
    alternates: alternatesForLocalizedPath(locale, "/documentation"),
    openGraph: {
      ...og,
      title,
      description,
      url: `/${locale}/documentation`,
      type: "website",
      siteName,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

export default async function DocumentationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });

  const sectionContentByModule: Record<string, Record<string, string>> = {};
  for (const mod of documentationModules) {
    sectionContentByModule[mod.slug] = getModuleSectionContent(
      mod.slug,
      locale
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 bg-white pt-10 sm:pt-12"
      >
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

          {/* Interactive search/filter island */}
          <DocSearchClient
            modules={documentationModules}
            sectionContentByModule={sectionContentByModule}
            categoryIds={categoryIdsWithModules}
          />
        </div>

        {/* CTA Bootcamp */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-gray-200 bg-gray-100/80 shadow-sm doc-part-enter doc-part-delay-cta">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500 text-white shrink-0">
                <IconGraduationCap className="w-6 h-6" />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("wantGuided")}
                </h2>
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
