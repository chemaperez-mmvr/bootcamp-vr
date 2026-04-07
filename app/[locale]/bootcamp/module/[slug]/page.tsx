import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  alternatesForLocalizedPath,
  defaultOgImage,
  openGraphLocales,
  siteName,
} from "@/i18n/languageAlternates";
import { routing } from "@/i18n/routing";
import { Header } from "../../../../components/Header";
import { Footer } from "../../../../components/Footer";
import { bootcampCatalog, getBootcampModuleBySlug } from "@/app/bootcamp/catalog";
import { BootcampModuleClient } from "../../../../components/BootcampModuleClient";


type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    bootcampCatalog
      .filter((module) => module.enabled)
      .map((module) => ({ locale, slug: module.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const module = getBootcampModuleBySlug(slug);
  if (!module) notFound();

  const t = await getTranslations({ locale, namespace: "bootcamp" });
  const title = `${t("title")} | VR Education Hub`;
  const description = t("subtitle");
  const og = openGraphLocales(locale);
  const path = `/bootcamp/module/${slug}`;

  return {
    title,
    description,
    alternates: alternatesForLocalizedPath(locale, path),
    openGraph: {
      ...og,
      title,
      description,
      url: `/${locale}${path}`,
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

export default async function BootcampModulePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const module = getBootcampModuleBySlug(slug);
  if (!module || !module.enabled) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-10 sm:pt-12">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <BootcampModuleClient module={module} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
