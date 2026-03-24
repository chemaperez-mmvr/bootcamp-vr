"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconGraduationCap } from "./icons";

export function Footer() {
  const t = useTranslations("common.footer");

  return (
    <footer className="bg-white border-t border-gray-200 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-gray-900 font-semibold">
              <span className="text-teal-600">
                <IconGraduationCap className="w-6 h-6" />
              </span>
              {t("brand")}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{t("tagline")}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t("platform")}</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/bootcamp" className="text-sm text-muted hover:text-teal-600 transition-colors">
                  {t("bootcamp")}
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-sm text-muted hover:text-teal-600 transition-colors">
                  {t("documentation")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t("learningPaths")}</h4>
            <p className="mt-1 text-xs text-gray-400 font-normal normal-case">{t("comingSoon")}</p>
            <ul className="mt-2 space-y-1.5">
              {(["vrFundamentals", "hardwareSetup", "pedagogicalDesign", "implementation"] as const).map((key) => (
                <li key={key}>
                  <span className="text-sm text-gray-400 cursor-default" aria-disabled="true">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t("company")}</h4>
            <p className="mt-1 text-xs text-gray-400 font-normal normal-case">{t("comingSoon")}</p>
            <ul className="mt-2 space-y-1.5">
              <li><span className="text-sm text-gray-400 cursor-default" aria-disabled="true">{t("aboutUs")}</span></li>
              <li><span className="text-sm text-gray-400 cursor-default" aria-disabled="true">{t("contact")}</span></li>
              <li><span className="text-sm text-gray-400 cursor-default" aria-disabled="true">{t("privacyPolicy")}</span></li>
              <li><span className="text-sm text-gray-400 cursor-default" aria-disabled="true">{t("termsOfService")}</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
