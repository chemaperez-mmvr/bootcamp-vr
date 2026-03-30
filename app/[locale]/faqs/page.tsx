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
import { routing } from "@/i18n/routing";
import { FaqAccordion } from "./FaqAccordion";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqs" });
  const title = t("metaTitle");
  const description = t("metaDesc");
  const og = openGraphLocales(locale);
  return {
    title,
    description,
    alternates: alternatesForLocalizedPath(locale, "/faqs"),
    openGraph: {
      ...og,
      title,
      description,
      url: `/${locale}/faqs`,
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

export default async function FaqsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faqs");

  const itemsById: Record<string, { id: string; question: string; answer: string }> = {
    q1: { id: "q1", question: t("q1"), answer: t("a1") },
    q2: { id: "q2", question: t("q2"), answer: t("a2") },
    q3: { id: "q3", question: t("q3"), answer: t("a3") },
    q4: { id: "q4", question: t("q4"), answer: t("a4") },
    q5: { id: "q5", question: t("q5"), answer: t("a5") },
    q6: { id: "q6", question: t("q6"), answer: t("a6") },
    q7: { id: "q7", question: t("q7"), answer: t("a7") },
    q8: { id: "q8", question: t("q8"), answer: t("a8") },
  };

  const sections = [
    { label: t("categoryAbout"), itemIds: ["q4", "q5", "q3", "q8"] as const },
    { label: t("categoryBootcampDocs"), itemIds: ["q1", "q2", "q7"] as const },
    { label: t("categoryClassroom"), itemIds: ["q6"] as const },
  ].map(({ label, itemIds }) => ({
    label,
    items: itemIds.map((id) => itemsById[id]),
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 min-h-0 overflow-y-auto"
        data-faq-scroll-container
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-content-enter">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-teal-600 uppercase tracking-wider mb-2">
              {t("eyebrow")}
            </p>
            <h1 className="text-3xl font-semibold text-foreground">{t("title")}</h1>
            <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
          </div>

          <FaqAccordion sections={sections} sectionLabel={t("sectionLabel")} />
        </div>
      </main>

      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
}

