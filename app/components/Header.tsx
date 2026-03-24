"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
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

export function Header({ currentPath = "/" }: { currentPath?: string }) {
  const t = useTranslations("common");
  const tNav = useTranslations("common.nav");
  const isHome = currentPath === "/";
  const [progress, setProgress] = useState(isHome ? 0 : 1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

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
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-9 gap-3">
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
          <nav className="hidden md:flex items-center gap-3 justify-center" aria-label="Main navigation">
            {navItems.map(({ href, labelKey, icon: Icon }) => {
              const active = currentPath === href;
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
              className={`md:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${progress < 0.5 ? "hover:bg-white/20" : "hover:bg-gray-100"}`}
              style={{ color: textColor }}
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
            className={`md:hidden absolute left-0 right-0 top-full mt-0 rounded-b-lg shadow-lg overflow-hidden transition-[visibility,opacity] duration-200 ${
              mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundColor: `rgba(255,255,255,${0.98 * (0.15 + 0.85 * progress)})`,
              backdropFilter: "blur(10px)",
            }}
          >
            <nav className="px-4 py-3 border-t border-gray-200/80" aria-label="Main navigation">
              <ul className="flex flex-col gap-1">
                {navItems.map(({ href, labelKey, icon: Icon }) => {
                  const active = currentPath === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                          active ? "bg-teal-50 text-teal-700" : "text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
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
