"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqSection = {
  label: string;
  items: FaqItem[];
};

function getFaqScrollContainer(from: HTMLElement | null): HTMLElement | null {
  if (!from) return null;
  const container = from.closest<HTMLElement>("[data-faq-scroll-container]");
  return container ?? null;
}

export function FaqAccordion({
  sections,
  sectionLabel,
}: {
  sections: FaqSection[];
  sectionLabel: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const scrollRestoreRef = useRef<number | null>(null);

  const toggle = useCallback((id: string) => {
    const scroller =
      getFaqScrollContainer(rootRef.current) ??
      (document.scrollingElement as HTMLElement | null);
    scrollRestoreRef.current = scroller ? scroller.scrollTop : null;

    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Restaurar scroll después de que el DOM se actualice al abrir/cerrar, para no mover la página
  useEffect(() => {
    const saved = scrollRestoreRef.current;
    if (saved === null) return;
    scrollRestoreRef.current = null;
    const scroller =
      getFaqScrollContainer(rootRef.current) ??
      (document.scrollingElement as HTMLElement | null);
    if (!scroller) return;
    const restore = () => {
      scroller.scrollTop = saved;
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(restore);
    });
  }, [openIds]);

  return (
    <section
      aria-label={sectionLabel}
      className="space-y-8"
      style={{ overflowAnchor: "none" }}
    >
      <div ref={rootRef} className="space-y-8" id={listId}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-700 bg-teal-50/80 border-l-4 border-teal-500 rounded-r px-4 py-2.5">
              {section.label}
            </h2>
            <div className="space-y-3 pl-0">
              {section.items.map((item) => {
                const open = openIds.has(item.id);
                const panelId = `${listId}-${sectionIndex}-${item.id}-panel`;
                const buttonId = `${listId}-${sectionIndex}-${item.id}-button`;

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                    style={{ overflowAnchor: "none" }}
                  >
                    <button
                      id={buttonId}
                      type="button"
                      className="w-full text-left cursor-pointer font-semibold text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-md"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="flex items-start justify-between gap-4">
                        <span className="text-[15px] leading-6">{item.question}</span>
                        <span
                          aria-hidden
                          className={`shrink-0 text-teal-600 transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                        >
                          ▾
                        </span>
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      aria-hidden={!open}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pt-2 text-[15px] leading-7 text-muted-foreground">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

