"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  IconClose,
  IconGraduationCap,
  IconHome,
  IconMenu,
  IconSearch,
} from "./icons";
import { CircleHelp } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const TRANSITION_PX = 120;
const HEADER_HEIGHT_PX = 76;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const navItems = [
  { href: "/", labelKey: "home" as const, icon: IconHome },
  { href: "/bootcamp", labelKey: "bootcamp" as const, icon: IconGraduationCap },
  { href: "/documentation", labelKey: "documentation" as const, icon: IconSearch },
  { href: "/faqs", labelKey: "faqs" as const, icon: CircleHelp },
];

function navHrefIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("common");
  const tNav = useTranslations("common.nav");
  const isHome = pathname === "/";
  const [progress, setProgress] = useState(isHome ? 0 : 1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setProgress(1);
      return;
    }

    const updateProgress = () => {
      const hero = document.getElementById("hero");
      let p: number;
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
        // Navbar (sticky): su borde inferior en documento = scrollY + HEADER_HEIGHT_PX.
        // progress 0 = navbar aún dentro del hero; 1 = navbar ya salió (opaco + texto negro).
        const navbarBottomY = window.scrollY + HEADER_HEIGHT_PX;
        const transitionStartY = heroBottom - TRANSITION_PX;
        p = clamp((navbarBottomY - transitionStartY) / TRANSITION_PX, 0, 1);
      } else {
        p = clamp(window.scrollY / TRANSITION_PX, 0, 1);
      }

      setProgress((prev) => (Math.abs(prev - p) < 0.001 ? prev : p));
      rafRef.current = null;
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    const runUpdate = () => {
      updateProgress();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    // Recalcular cuando el DOM esté listo (por si el hero se monta después)
    const t = setTimeout(runUpdate, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(t);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isHome]);

  const bgOpacity = 0.15 + 0.85 * progress;
  const textR = Math.round(255 * (1 - progress));
  const textColor = `rgb(${textR}, ${textR}, ${textR})`;
  const iconR = Math.round(94 + (13 - 94) * progress);
  const iconG = Math.round(234 + (148 - 234) * progress);
  const iconB = Math.round(212 + (136 - 212) * progress);
  const iconColor = `rgb(${iconR}, ${iconG}, ${iconB})`;
  const dropShadow = progress < 0.5 ? "drop-shadow-md" : "";

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-transparent dark:border-transparent pt-5">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] bg-white text-gray-900 px-3 py-2 rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
      >
        {t("skipToContent")}
      </a>
      {/* Fondo: progresión suave de transparente a opaco */}
      <div
        className="absolute inset-x-0 top-0 z-0 h-[76px] backdrop-blur-[10px] backdrop-saturate-[1.8]"
        style={{
          backgroundColor: `rgba(255,255,255,${bgOpacity})`,
          boxShadow: `inset 0 1px 0 0 rgba(255,255,255,${0.15 * (1 - progress)}), 0 1px 3px rgba(0,0,0,${0.08 * progress})`,
          WebkitMaskImage: progress > 0.99 ? "none" : "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
          maskImage: progress > 0.99 ? "none" : "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-11 md:h-9 gap-2 md:gap-3">
          <Link
            href="/"
            className={`flex items-center gap-1.5 font-semibold justify-self-start text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded ${dropShadow}`}
            style={{ color: textColor }}
          >
            <span style={{ color: iconColor }}>
              <IconGraduationCap className="w-5 h-5" />
            </span>
            {t("brand")}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3 justify-center" aria-label={t("mainNavigation")}>
            {navItems.map(({ href, labelKey, icon: Icon }) => {
              const active = navHrefIsActive(pathname, href);
              const linkBgOpacity = active ? 0.35 - progress * 0.1 : 0;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${dropShadow} ${
                    active ? "" : "hover:opacity-80"
                  } ${progress < 0.5 ? "hover:bg-white/20" : "hover:bg-gray-100"}`}
                  style={{
                    color: textColor,
                    backgroundColor: active ? `rgba(20, 184, 166, ${linkBgOpacity})` : undefined,
                  }}
                >
                  <Icon className="w-5 h-5" />
                  {tNav(labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right: language switcher + mobile menu button */}
          <div className="flex justify-self-end items-center gap-2 col-start-3">
            <LanguageSwitcher />
            <button
              type="button"
              className={`md:hidden flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1 ${
                mobileMenuOpen
                  ? "border-teal-200 bg-teal-50 text-teal-700"
                  : "border-white/50 bg-white/60 text-teal-700 hover:bg-white/80"
              }`}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? t("menuClose") : t("menuOpen")}
            >
              {mobileMenuOpen ? <IconClose className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile nav panel */}
          <div
            id="mobile-nav"
            aria-hidden={!mobileMenuOpen}
            className={`md:hidden absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-gray-200/80 shadow-xl transition-[transform,opacity,visibility] duration-200 ease-out ${
              mobileMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundColor: `rgba(255,255,255,${0.96 + 0.02 * progress})`,
              backdropFilter: "blur(10px)",
            }}
          >
            <nav className="p-3" aria-label={t("mainNavigation")}>
              <ul className="flex flex-col gap-1.5">
                {navItems.map(({ href, labelKey, icon: Icon }) => {
                  const active = navHrefIsActive(pathname, href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-semibold leading-none tracking-[0.01em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1 ${
                          active
                            ? "bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-100"
                            : "text-gray-700 hover:bg-teal-50/70 hover:text-teal-700"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {tNav(labelKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
