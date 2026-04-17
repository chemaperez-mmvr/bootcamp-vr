import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  alternatesForLocalizedPath,
  defaultOgImage,
  openGraphLocales,
  siteName,
} from "@/i18n/languageAlternates";
import { Link } from "@/i18n/navigation";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { IconGraduationCap, IconSearch } from "../components/icons";
import { ConnectedLearningPaths } from "../components/ConnectedLearningPaths";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const title = t("metaTitle");
  const description = t("metaDesc");
  const og = openGraphLocales(locale);
  return {
    title,
    description,
    alternates: alternatesForLocalizedPath(locale, "/"),
    openGraph: {
      ...og,
      title,
      description,
      url: `/${locale}`,
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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <HeroSection>
          <p className="text-sm font-medium uppercase tracking-wider mb-3">
            {t("forTeachers")}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            <span className="block">{t("title1")}</span>
            <span className="block">{t("title2")}</span>
          </h1>
          <p className="mt-1 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors shadow-sm"
            >
              <IconGraduationCap className="w-5 h-5" />
              {t("startBootcamp")}
            </Link>
            <Link
              href="/documentation"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-white/20 border border-white/60 rounded-lg hover:bg-white/30 transition-colors shadow-sm backdrop-blur-sm"
            >
              <IconSearch className="w-5 h-5" />
              {t("searchDocs")}
            </Link>
          </div>
        </HeroSection>

        <ConnectedLearningPaths />
      </main>

      <Footer />
    </div>
  );
}
