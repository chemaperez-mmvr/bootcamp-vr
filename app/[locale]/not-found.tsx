import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("ui");
  const tNav = await getTranslations("common.nav");

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-lg text-center space-y-6">
        <p
          className="text-7xl sm:text-8xl font-bold tabular-nums text-teal-500/25 select-none"
          aria-hidden
        >
          404
        </p>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{t("notFoundTitle")}</h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t("notFoundDescription")}
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          {tNav("home")}
        </Link>
      </div>
    </div>
  );
}
