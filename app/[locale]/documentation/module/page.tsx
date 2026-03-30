import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  alternatesForLocalizedPath,
  defaultOgImage,
  openGraphLocales,
  siteName,
} from "@/i18n/languageAlternates";
import { Link as NavLink } from "@/i18n/navigation";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docsModule" });
  const title = `${t("title")} | VR Education Hub`;
  const description = t("inDevelopment");
  const og = openGraphLocales(locale);
  return {
    title,
    description,
    alternates: alternatesForLocalizedPath(locale, "/documentation/module"),
    openGraph: {
      ...og,
      title,
      description,
      url: `/${locale}/documentation/module`,
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

export default async function DocumentationModulePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("docsModule");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavLink
            href="/documentation"
            className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 mb-6"
          >
            {t("backToDocs")}
          </NavLink>

          <article className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
                {t("title")}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("inDevelopment")}
              </p>
              <NavLink
                href="/documentation"
                className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
              >
                {t("backToDocs")}
              </NavLink>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
