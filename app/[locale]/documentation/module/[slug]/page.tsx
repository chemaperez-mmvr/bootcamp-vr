import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link as NavLink } from "@/i18n/navigation";
import { Header } from "../../../../components/Header";
import { Footer } from "../../../../components/Footer";
import { DocModulesNav } from "../../../../components/DocModulesNav";
import { DocSearchBarNavigate } from "../../../../components/DocSearchBar";
import { OnThisPageNav } from "../../../../components/OnThisPageNav";
import { CopyAnchorLink } from "../../../../components/CopyAnchorLink";
import {
  getModuleBySlug,
  documentationModules,
} from "@/app/documentation/modules";
import { getModuleSectionContent } from "@/app/documentation/content";
import { resolveDocImages } from "@/app/documentation/docImages";
import { routing } from "@/i18n/routing";
import { ScrollToHash } from "./ScrollToHash";
import { HighlightSearchTerm } from "./HighlightSearchTerm";
import { QuickStartNav } from "../../../../components/QuickStartNav";
import { QuickStartSectionWrapper } from "./QuickStartSectionWrapper";
import { Suspense } from "react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    documentationModules.map((m) => ({ locale, slug: m.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) return { title: "Documentation | VR Education Hub" };
  const t = await getTranslations({ locale, namespace: "docs" });
  const title = t(mod.titleKey);
  const description = t(mod.descriptionKey);
  return {
    title: `${title} | VR Education Hub`,
    description,
  };
}

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="leading-relaxed text-foreground mb-3">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-6 my-3 space-y-1 text-foreground">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-6 my-3 space-y-1 text-foreground">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-teal-500 pl-4 py-2 my-4 bg-teal-50/70 dark:bg-teal-950/30 rounded-r text-foreground [&>p]:mb-0 [&>p:last-child]:mt-0">
      {children}
    </blockquote>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base font-semibold text-foreground mt-4 mb-2">{children}</h3>
  ),
  img: ({ src, alt }: { src?: string; alt?: string | null }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className="max-w-xl w-full aspect-video object-cover rounded-lg my-4 border border-gray-200 shadow-sm"
    />
  ),
};

export default async function DocumentationModuleSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const mod = getModuleBySlug(slug);
  if (!mod) notFound();

  const t = await getTranslations("docs");
  const sectionContent = getModuleSectionContent(mod.slug, locale);

  const allModulesForNav = documentationModules.map((m) => ({
    module: m,
    sections: m.sections,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPath="/documentation" />
      <ScrollToHash />
      <Suspense fallback={null}>
        <HighlightSearchTerm />
      </Suspense>

      <main id="main-content" tabIndex={-1} className="flex-1 bg-white pt-10 sm:pt-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar - Above content */}
          <div className="mb-6 flex justify-center">
            <DocSearchBarNavigate className="max-w-2xl w-full" />
          </div>

          {/* Three-column layout inspired by Meta Horizon */}
          <div className="flex flex-col lg:flex-row gap-8 pb-12">
            {/* Left Sidebar - Navigation */}
            <aside className="lg:w-64 shrink-0 lg:sticky lg:top-[76px] lg:self-start lg:h-[calc(100vh-100px)] flex flex-col">
              <div className="mb-4 pr-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("modulesLabel")}
                </h2>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto pr-2">
                <DocModulesNav
                  key={`nav-${mod.slug}`}
                  modules={allModulesForNav}
                  currentModuleSlug={mod.slug}
                />
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 max-w-4xl">
              <article>
                {/* Page Header */}
                <header className="mb-8 text-center">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                    {t(mod.titleKey)}
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    {t(mod.descriptionKey)}
                  </p>
                </header>

                {/* Content Sections */}
                <div className="prose prose-lg max-w-none">
                  {mod.sections.map((section) => {
                    const markdown = sectionContent[section.id];
                    const isEssential = section.priority === "essential";
                    return (
                      <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-24 mb-12 pb-8 border-b border-gray-200 last:border-b-0 last:pb-0"
                      >
                        <Suspense fallback={null}>
                          <QuickStartSectionWrapper sectionId={section.id}>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-0 flex items-center gap-2 flex-wrap">
                              <CopyAnchorLink sectionId={section.id} />
                              {t(section.titleKey)}
                              {isEssential ? (
                                <span className="inline-flex items-center rounded-full bg-teal-100 text-teal-700 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap">
                                  {t("essentialBadge")}
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-500 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap">
                                  {t("referenceBadge")}
                                </span>
                              )}
                            </h2>
                            {markdown ? (
                              <div className="text-gray-700 leading-relaxed">
                                <ReactMarkdown components={markdownComponents}>
                                  {resolveDocImages(markdown, mod.slug, locale)}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm italic">
                                {t("sectionContentComingSoon")}
                              </p>
                            )}
                            <Suspense fallback={null}>
                              <QuickStartNav sectionId={section.id} />
                            </Suspense>
                          </QuickStartSectionWrapper>
                        </Suspense>
                      </section>
                    );
                  })}
                </div>
              </article>
            </div>

            {/* Right Sidebar - On This Page */}
            {mod.sections.length > 0 && (
              <OnThisPageNav sections={mod.sections} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
