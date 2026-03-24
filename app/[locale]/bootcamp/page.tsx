import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IconGraduationCap } from "../../components/icons";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bootcamp" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BootcampPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("bootcamp");

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/bootcamp" />
      <main id="main-content" tabIndex={-1} className="flex-1 flex items-center justify-center bg-gray-50">
        <div id="module-2" className="max-w-md mx-auto px-4 py-16 text-center animate-content-enter">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6">
            <IconGraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {t("title")}
          </h1>
          <p className="mt-1 text-muted-foreground mb-8">{t("inDevelopment")}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
          >
            {t("backHome")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
