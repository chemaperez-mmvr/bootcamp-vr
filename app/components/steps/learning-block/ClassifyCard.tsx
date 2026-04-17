"use client";

import { useState, useCallback, useRef } from "react";
import type { MicroCheckClassify } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

export function ClassifyCard({
  check,
  onPass,
  onFail,
  t,
}: {
  check: MicroCheckClassify;
  onPass: () => void;
  onFail: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<
    { itemId: string; chosenCategoryId: string; correct: boolean }[]
  >([]);
  const [showSummary, setShowSummary] = useState(false);
  const [itemFeedback, setItemFeedback] = useState<{
    correct: boolean;
    correctCategoryLabel: string;
  } | null>(null);

  const total = check.items.length;
  const item = check.items[currentIdx];

  const handleClassify = useCallback(
    (categoryId: string) => {
      if (itemFeedback) return;
      const correct = categoryId === item.correctCategoryId;
      const correctCat = check.categories.find(
        (c) => c.id === item.correctCategoryId
      );

      setItemFeedback({
        correct,
        correctCategoryLabel: correctCat ? t(correctCat.labelKey) : "",
      });
      setResults((prev) => [
        ...prev,
        { itemId: item.id, chosenCategoryId: categoryId, correct },
      ]);
    },
    [itemFeedback, item, check.categories, t]
  );

  const handleNext = useCallback(() => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= total) {
      setShowSummary(true);
    } else {
      setCurrentIdx(nextIdx);
      setItemFeedback(null);
    }
  }, [currentIdx, total]);

  const handleFinish = useCallback(() => {
    const wrongCount = results.filter((r) => !r.correct).length;
    if (wrongCount > 0) onFail();
    onPass();
  }, [results, onPass, onFail]);

  /* Summary view — kept simple list */
  if (showSummary) {
    const wrongCount = results.filter((r) => !r.correct).length;
    const allCorrect = wrongCount === 0;

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-5">
          {t("learningBlocks.classifyTitle")}
        </div>

        <div className="space-y-3 mb-5">
          {check.items.map((itm, i) => {
            const result = results[i];
            const correctCat = check.categories.find(
              (c) => c.id === itm.correctCategoryId
            );
            return (
              <div
                key={itm.id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  result?.correct
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                {result?.correct ? (
                  <IconCheck className="w-4 h-4 text-green-600 shrink-0" />
                ) : (
                  <IconClose className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{t(itm.labelKey)}</p>
                  {!result?.correct && correctCat && (
                    <p className="text-xs text-red-600 mt-0.5">
                      {t("learningBlocks.classifyItemWrong", {
                        category: t(correctCat.labelKey),
                      })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`rounded-xl border p-4 mb-5 ${
            allCorrect
              ? "border-green-200 bg-green-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              allCorrect ? "text-green-800" : "text-amber-800"
            }`}
          >
            {allCorrect
              ? t("learningBlocks.classifyCorrect")
              : t("learningBlocks.classifyWrong", {
                  wrong: wrongCount,
                  total,
                })}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleFinish}
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
              allCorrect
                ? "text-white bg-teal-600 hover:bg-teal-700"
                : "text-amber-800 bg-amber-100 hover:bg-amber-200"
            }`}
          >
            {allCorrect
              ? t("learningBlocks.continueToNext")
              : t("learningBlocks.microCheckRetry")}
            <span aria-hidden>{allCorrect ? "→" : "↩"}</span>
          </button>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const countIn = (catId: string) =>
    results.filter((r) => r.chosenCategoryId === catId).length;

  return (
    <ClassifyDragSurface
      item={item}
      categories={check.categories}
      instruction={t(check.instructionKey)}
      title={t("learningBlocks.classifyTitle")}
      currentIdx={currentIdx}
      total={total}
      items={check.items}
      countIn={countIn}
      onClassify={handleClassify}
      onNext={handleNext}
      itemFeedback={itemFeedback}
      t={t}
    />
  );
}

/* ================================================================== */
/*  Drag-and-drop surface — the actual mini-game                        */
/* ================================================================== */

function ClassifyDragSurface({
  item,
  categories,
  instruction,
  title,
  currentIdx,
  total,
  items,
  countIn,
  onClassify,
  onNext,
  itemFeedback,
  t,
}: {
  item: MicroCheckClassify["items"][number];
  categories: MicroCheckClassify["categories"];
  instruction: string;
  title: string;
  currentIdx: number;
  total: number;
  items: MicroCheckClassify["items"];
  countIn: (id: string) => number;
  onClassify: (catId: string) => void;
  onNext: () => void;
  itemFeedback: { correct: boolean; correctCategoryLabel: string } | null;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const zoneRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragStart = useRef<{ cardCx: number; cardCy: number; pointerId: number } | null>(null);

  const [drag, setDrag] = useState<{ dx: number; dy: number; active: boolean }>({
    dx: 0,
    dy: 0,
    active: false,
  });
  const [hoverCat, setHoverCat] = useState<string | null>(null);
  const [proximity, setProximity] = useState(1); // 1 far, 0.4 near, 0 inside

  const findZoneAt = useCallback((clientX: number, clientY: number): string | null => {
    for (const cat of categories) {
      const el = zoneRefs.current[cat.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (
        clientX >= r.left &&
        clientX <= r.right &&
        clientY >= r.top &&
        clientY <= r.bottom
      ) {
        return cat.id;
      }
    }
    return null;
  }, [categories]);

  /* Min distance from (x,y) to any zone's edge. 0 = inside a zone. */
  const distanceToNearestZone = useCallback((clientX: number, clientY: number): number => {
    let min = Infinity;
    for (const cat of categories) {
      const el = zoneRefs.current[cat.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const cx = Math.max(r.left, Math.min(r.right, clientX));
      const cy = Math.max(r.top, Math.min(r.bottom, clientY));
      const d = Math.hypot(clientX - cx, clientY - cy);
      if (d < min) min = d;
    }
    return min === Infinity ? 0 : min;
  }, [categories]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (itemFeedback) return;
    /* Record the card's natural (untranslated) center so every subsequent move
       snaps the card center to the pointer — regardless of where it was grabbed. */
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cardCx = rect.left + rect.width / 2;
    const cardCy = rect.top + rect.height / 2;
    dragStart.current = { cardCx, cardCy, pointerId: e.pointerId };
    /* Jump center to pointer immediately */
    setDrag({ dx: e.clientX - cardCx, dy: e.clientY - cardCy, active: true });
    setProximity(1);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.cardCx;
    const dy = e.clientY - dragStart.current.cardCy;
    setDrag({ dx, dy, active: true });
    setHoverCat(findZoneAt(e.clientX, e.clientY));
    /* Lerp scale: 1 when far (>=250px), 0.45 when just outside, 0 when inside */
    const dist = distanceToNearestZone(e.clientX, e.clientY);
    const MAX = 250;
    if (dist === 0) {
      setProximity(0);
    } else {
      const t = Math.min(1, dist / MAX);
      setProximity(0.45 + t * 0.55);
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const zoneAtDrop = findZoneAt(e.clientX, e.clientY);
    const dist = Math.hypot(drag.dx, drag.dy);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(dragStart.current.pointerId);
    dragStart.current = null;

    if (zoneAtDrop && dist > 30) {
      setDrag({ dx: 0, dy: 0, active: false });
      setHoverCat(null);
      setProximity(1);
      onClassify(zoneAtDrop);
    } else {
      setDrag({ dx: 0, dy: 0, active: false });
      setHoverCat(null);
      setProximity(1);
    }
  };

  const cardRotation = drag.active ? Math.max(-12, Math.min(12, drag.dx * 0.04)) : 0;
  const inZone = Boolean(hoverCat);

  /* Outer translate follows pointer instantly during drag */
  const outerStyle: React.CSSProperties = {
    transform: `translate(${drag.dx}px, ${drag.dy}px)`,
    transition: drag.active ? "none" : "transform 220ms cubic-bezier(0.4, 0, 0.2, 1)",
    touchAction: "none",
  };

  /* Inner scale+rotate animates smoothly — lerp based on proximity to zone */
  const cardScale = drag.active ? proximity : 1;
  const innerStyle: React.CSSProperties = {
    transform: `scale(${cardScale}) rotate(${cardRotation}deg)`,
    transition: "transform 160ms cubic-bezier(0.4, 0, 0.2, 1)",
    transformOrigin: "center",
  };

  return (
    <div
      ref={surfaceRef}
      className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter"
    >
      {/* Badge + progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
          {title}
          <span className="ml-1 text-teal-500 tabular-nums">
            ({currentIdx + 1}/{total})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIdx
                  ? "bg-teal-500 scale-125"
                  : i < currentIdx
                    ? "bg-teal-300"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Instruction */}
      <p className="text-sm text-gray-600 mb-2">{instruction}</p>
      {!itemFeedback && (
        <p className="text-xs text-teal-600 font-semibold mb-5 flex items-center gap-1.5">
          <span aria-hidden>✋</span>
          Arrastra la tarjeta hasta la categoría correcta
        </p>
      )}

      {!itemFeedback && (
        <div className="relative">
          {/* Card area — holds a ghost placeholder and the draggable overlay */}
          <div className="relative mx-auto max-w-md">
            {/* Ghost: stays in original position; fades in while dragging */}
            <div
              aria-hidden
              className={`pointer-events-none transition-opacity duration-150 ${
                drag.active ? "opacity-35" : "opacity-0"
              }`}
            >
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                {item.imageUrl && (
                  <div className="relative w-full bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-full h-auto max-h-48 object-cover"
                      draggable={false}
                    />
                  </div>
                )}
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900 leading-relaxed text-center">
                    {t(item.labelKey)}
                  </p>
                </div>
              </div>
            </div>

          {/* Draggable overlay — absolute so it follows pointer while ghost holds the slot */}
          <div
            key={item.id}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={outerStyle}
            className="absolute inset-0 z-20 select-none cursor-grab active:cursor-grabbing"
          >
            <div className="relative">
              {/* Card layer — scales smoothly, fades when inside zone */}
              <div
                style={innerStyle}
                className={`transition-opacity duration-150 ${
                  inZone ? "opacity-0" : "opacity-100"
                }`}
              >
                <div
                  className={`rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow duration-200 ${
                    drag.active ? "shadow-2xl" : "shadow-lg"
                  }`}
                >
                  {item.imageUrl && (
                    <div className="relative w-full bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-full h-auto max-h-48 object-cover pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  )}
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 leading-relaxed text-center">
                      {t(item.labelKey)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble layer — visible only inside zone, text at normal size */}
              <div
                className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${
                  inZone ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="inline-block rounded-2xl bg-white border-2 border-teal-400 shadow-xl px-4 py-2.5 max-w-[16rem]">
                  <p className="text-sm font-medium text-gray-900 leading-snug text-center">
                    {t(item.labelKey)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Drop zones — below */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
            {categories.map((cat, idx) => {
              const count = countIn(cat.id);
              const isHover = hoverCat === cat.id && drag.active;
              const accent = idx === 0 ? "teal" : "amber";
              return (
                <div
                  key={cat.id}
                  ref={(el) => { zoneRefs.current[cat.id] = el; }}
                  onClick={() => !drag.active && onClassify(cat.id)}
                  className={`relative min-h-[9rem] rounded-xl border-2 border-dashed flex flex-col items-center justify-center px-4 py-5 transition-all cursor-pointer ${
                    isHover
                      ? accent === "teal"
                        ? "border-teal-500 bg-teal-100 scale-[1.02] shadow-lg"
                        : "border-amber-500 bg-amber-100 scale-[1.02] shadow-lg"
                      : accent === "teal"
                        ? "border-teal-300 bg-teal-50/40 hover:bg-teal-50"
                        : "border-amber-300 bg-amber-50/40 hover:bg-amber-50"
                  }`}
                >
                  <p
                    className={`text-[11px] uppercase tracking-[0.18em] font-semibold text-center ${
                      accent === "teal" ? "text-teal-700" : "text-amber-700"
                    }`}
                  >
                    {t(cat.labelKey)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 tabular-nums">
                    {count} {count === 1 ? "clasificado" : "clasificados"}
                  </p>
                  {isHover && (
                    <p
                      className={`text-xs font-semibold mt-2 ${
                        accent === "teal" ? "text-teal-700" : "text-amber-700"
                      }`}
                    >
                      Soltar aquí
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Item feedback */}
      {itemFeedback && (
        <div className="animate-wizard-feedback">
          <div
            className={`rounded-xl border p-4 flex items-center gap-3 ${
              itemFeedback.correct
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            {itemFeedback.correct ? (
              <IconCheck className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <IconClose className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <p
              className={`text-sm font-semibold ${
                itemFeedback.correct ? "text-green-800" : "text-red-800"
              }`}
            >
              {itemFeedback.correct
                ? t("learningBlocks.classifyItemCorrect")
                : t("learningBlocks.classifyItemWrong", {
                    category: itemFeedback.correctCategoryLabel,
                  })}
            </p>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              {currentIdx < total - 1
                ? t("learningBlocks.continueToNext")
                : t("learningBlocks.continueToCheck")}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
