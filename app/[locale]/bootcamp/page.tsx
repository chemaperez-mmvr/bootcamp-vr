import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  alternatesForLocalizedPath,
  defaultOgImage,
  openGraphLocales,
  siteName,
} from "@/i18n/languageAlternates";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { BootcampHomeClient } from "../../components/BootcampHomeClient";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bootcamp" });
  const title = t("metaTitle");
  const description = t("metaDesc");
  const og = openGraphLocales(locale);
  return {
    title,
    description,
    alternates: alternatesForLocalizedPath(locale, "/bootcamp"),
    openGraph: {
      ...og,
      title,
      description,
      url: `/${locale}/bootcamp`,
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BootcampPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations("bootcamp");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <BootcampHomeClient />
      </main>
      <Footer />
    </div>
  );
}
