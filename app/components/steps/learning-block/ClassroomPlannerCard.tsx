"use client";

import { useState, useCallback, useMemo } from "react";
import type { ClassroomPlannerExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";
import { LearningBlockShell } from "./LearningBlockShell";

/* Visual tone per zone, indexed by position. */
const ZONE_TONES = [
  {
    chip: "bg-blue-600 text-white",
    bgGrid: "bg-blue-100/80",
    text: "text-blue-700",
    legendBorder: "border-blue-200",
    legendBg: "bg-blue-50/50",
  },
  {
    chip: "bg-emerald-600 text-white",
    bgGrid: "bg-emerald-100/80",
    text: "text-emerald-700",
    legendBorder: "border-emerald-200",
    legendBg: "bg-emerald-50/50",
  },
  {
    chip: "bg-amber-600 text-white",
    bgGrid: "bg-amber-100/80",
    text: "text-amber-700",
    legendBorder: "border-amber-200",
    legendBg: "bg-amber-50/50",
  },
  {
    chip: "bg-purple-600 text-white",
    bgGrid: "bg-purple-100/80",
    text: "text-purple-700",
    legendBorder: "border-purple-200",
    legendBg: "bg-purple-50/50",
  },
] as const;

const ZONE_GLYPHS = ["①", "②", "③", "④"];

type Placement = { itemId: string; col: number; row: number };

type ItemDef = ClassroomPlannerExercise["items"][number];
type ZoneDef = ClassroomPlannerExercise["zones"][number];
type ObstacleDef = NonNullable<ClassroomPlannerExercise["obstacles"]>[number];

const DRAG_MIME = "application/x-vr-planner-item";

function rectContains(
  outer: { col: number; row: number; width: number; height: number },
  inner: { col: number; row: number; width: number; height: number }
): boolean {
  return (
    inner.col >= outer.col &&
    inner.col + inner.width <= outer.col + outer.width &&
    inner.row >= outer.row &&
    inner.row + inner.height <= outer.row + outer.height
  );
}

export function ClassroomPlannerCard({
  exercise,
  onPass,
  t,
}: {
  exercise: ClassroomPlannerExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [hoverCell, setHoverCell] = useState<{ col: number; row: number } | null>(null);
  const [checked, setChecked] = useState(false);
  const [zoneResults, setZoneResults] = useState<Record<string, boolean>>({});
  const [wrongItemIds, setWrongItemIds] = useState<string[]>([]);

  const obstacles: ObstacleDef[] = useMemo(
    () => exercise.obstacles ?? [],
    [exercise.obstacles]
  );

  const itemMap = useMemo(
    () => new Map<string, ItemDef>(exercise.items.map((i) => [i.id, i])),
    [exercise.items]
  );

  const placedItemIds = useMemo(
    () => new Set(placements.map((p) => p.itemId)),
    [placements]
  );

  const palette = useMemo(
    () => exercise.items.filter((i) => !placedItemIds.has(i.id)),
    [exercise.items, placedItemIds]
  );

  const allPlaced = palette.length === 0;
  const activeId = draggingItemId ?? selectedItemId;
  const activeItem = activeId ? itemMap.get(activeId) ?? null : null;

  /* ----- Cell occupancy maps ----- */

  /** Cells covered by obstacles (`col,row` -> obstacleId). */
  const obstacleCells = useMemo(() => {
    const m = new Map<string, string>();
    for (const o of obstacles) {
      for (let c = o.col; c < o.col + o.width; c++) {
        for (let r = o.row; r < o.row + o.height; r++) {
          m.set(`${c},${r}`, o.id);
        }
      }
    }
    return m;
  }, [obstacles]);

  /** Cells covered by placed items (`col,row` -> itemId). */
  const occupiedCells = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of placements) {
      const item = itemMap.get(p.itemId);
      if (!item) continue;
      for (let c = p.col; c < p.col + item.width; c++) {
        for (let r = p.row; r < p.row + item.height; r++) {
          m.set(`${c},${r}`, p.itemId);
        }
      }
    }
    return m;
  }, [placements, itemMap]);

  /** Map cell -> first zone index it belongs to (for background tinting). */
  const cellZoneIndex = useMemo(() => {
    const m = new Map<string, number>();
    exercise.zones.forEach((zone, zi) => {
      for (let c = zone.col; c < zone.col + zone.width; c++) {
        for (let r = zone.row; r < zone.row + zone.height; r++) {
          if (!m.has(`${c},${r}`)) m.set(`${c},${r}`, zi);
        }
      }
    });
    return m;
  }, [exercise.zones]);

  const canPlace = useCallback(
    (itemId: string, col: number, row: number): boolean => {
      const item = itemMap.get(itemId);
      if (!item) return false;
      if (col < 0 || row < 0) return false;
      if (col + item.width > exercise.gridCols) return false;
      if (row + item.height > exercise.gridRows) return false;
      for (let c = col; c < col + item.width; c++) {
        for (let r = row; r < row + item.height; r++) {
          const key = `${c},${r}`;
          if (obstacleCells.has(key)) return false;
          const occupant = occupiedCells.get(key);
          if (occupant && occupant !== itemId) return false;
        }
      }
      return true;
    },
    [itemMap, exercise.gridCols, exercise.gridRows, obstacleCells, occupiedCells]
  );

  /* ----- Placement helpers ----- */

  const placeItem = useCallback(
    (itemId: string, col: number, row: number) => {
      if (checked) return;
      if (!canPlace(itemId, col, row)) return;
      setPlacements((prev) => [
        ...prev.filter((p) => p.itemId !== itemId),
        { itemId, col, row },
      ]);
      setSelectedItemId(null);
    },
    [checked, canPlace]
  );

  const pickUpItem = useCallback(
    (itemId: string) => {
      if (checked) return;
      setPlacements((prev) => prev.filter((p) => p.itemId !== itemId));
      setSelectedItemId(itemId);
    },
    [checked]
  );

  /* ----- Click handlers ----- */

  const handlePaletteClick = useCallback(
    (itemId: string) => {
      if (checked) return;
      setSelectedItemId((prev) => (prev === itemId ? null : itemId));
    },
    [checked]
  );

  const handleCellClick = useCallback(
    (col: number, row: number) => {
      if (checked) return;
      const key = `${col},${row}`;
      if (obstacleCells.has(key)) return;

      const occupant = occupiedCells.get(key);
      if (occupant) {
        pickUpItem(occupant);
        return;
      }
      if (selectedItemId) {
        placeItem(selectedItemId, col, row);
      }
    },
    [checked, obstacleCells, occupiedCells, selectedItemId, placeItem, pickUpItem]
  );

  /* ----- Drag handlers ----- */

  const handleDragStart = useCallback(
    (e: React.DragEvent, itemId: string) => {
      if (checked) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData(DRAG_MIME, itemId);
      e.dataTransfer.setData("text/plain", itemId);
      setDraggingItemId(itemId);
      setSelectedItemId(itemId);
    },
    [checked]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingItemId(null);
    setHoverCell(null);
  }, []);

  const handleCellDragOver = useCallback(
    (e: React.DragEvent, col: number, row: number) => {
      if (checked || !activeId) return;
      if (!canPlace(activeId, col, row)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setHoverCell({ col, row });
    },
    [checked, activeId, canPlace]
  );

  const handleCellDrop = useCallback(
    (e: React.DragEvent, col: number, row: number) => {
      e.preventDefault();
      const itemId =
        e.dataTransfer.getData(DRAG_MIME) ||
        e.dataTransfer.getData("text/plain") ||
        draggingItemId;
      if (!itemId) return;
      placeItem(itemId, col, row);
      setDraggingItemId(null);
      setHoverCell(null);
    },
    [draggingItemId, placeItem]
  );

  /* ----- Validation ----- */

  const handleCheck = useCallback(() => {
    const results: Record<string, boolean> = {};
    const wrong: string[] = [];

    for (const zone of exercise.zones) {
      const allInZone = zone.requiredItemIds.every((reqId) => {
        const placement = placements.find((p) => p.itemId === reqId);
        if (!placement) return false;
        const item = itemMap.get(reqId);
        if (!item) return false;
        return rectContains(zone, { col: placement.col, row: placement.row, width: item.width, height: item.height });
      });
      results[zone.id] = allInZone;
      if (!allInZone) {
        for (const reqId of zone.requiredItemIds) {
          if (!wrong.includes(reqId)) wrong.push(reqId);
        }
      }
    }

    /* Clearance violations */
    if (exercise.clearanceRule) {
      const { itemIds, cells } = exercise.clearanceRule;
      for (const id of itemIds) {
        const placement = placements.find((p) => p.itemId === id);
        const item = itemMap.get(id);
        if (!placement || !item) continue;
        const minC = placement.col - cells;
        const maxC = placement.col + item.width - 1 + cells;
        const minR = placement.row - cells;
        const maxR = placement.row + item.height - 1 + cells;
        let violated = false;
        outer: for (let c = minC; c <= maxC; c++) {
          for (let r = minR; r <= maxR; r++) {
            const inSelf =
              c >= placement.col &&
              c < placement.col + item.width &&
              r >= placement.row &&
              r < placement.row + item.height;
            if (inSelf) continue;
            if (c < 0 || r < 0 || c >= exercise.gridCols || r >= exercise.gridRows) {
              violated = true;
              break outer;
            }
            if (obstacleCells.has(`${c},${r}`)) {
              violated = true;
              break outer;
            }
          }
        }
        if (violated && !wrong.includes(id)) {
          wrong.push(id);
          /* Mark VR zone as not OK if clearance fails — we look up the zone owning this item. */
          for (const zone of exercise.zones) {
            if (zone.requiredItemIds.includes(id)) {
              results[zone.id] = false;
            }
          }
        }
      }
    }

    setZoneResults(results);
    setWrongItemIds(wrong);
    setChecked(true);
  }, [exercise.zones, exercise.clearanceRule, exercise.gridCols, exercise.gridRows, placements, itemMap, obstacleCells]);

  const handleRetry = useCallback(() => {
    setPlacements((prev) => prev.filter((p) => !wrongItemIds.includes(p.itemId)));
    setChecked(false);
    setZoneResults({});
    setWrongItemIds([]);
  }, [wrongItemIds]);

  const handleClearAll = useCallback(() => {
    setPlacements([]);
    setSelectedItemId(null);
  }, []);

  const allCorrect =
    checked &&
    Object.keys(zoneResults).length > 0 &&
    Object.values(zoneResults).every(Boolean);

  /* ----- Ghost preview cells (where the active item would land) ----- */
  const ghostCells = useMemo(() => {
    const set = new Set<string>();
    if (!activeItem || !hoverCell || checked) return set;
    if (!canPlace(activeItem.id, hoverCell.col, hoverCell.row)) return set;
    for (let c = hoverCell.col; c < hoverCell.col + activeItem.width; c++) {
      for (let r = hoverCell.row; r < hoverCell.row + activeItem.height; r++) {
        set.add(`${c},${r}`);
      }
    }
    return set;
  }, [activeItem, hoverCell, checked, canPlace]);

  /* ----- Clearance preview cells (yellow halo around ghost when active is a clearance item) ----- */
  const clearanceCells = useMemo(() => {
    const set = new Set<string>();
    const rule = exercise.clearanceRule;
    if (!rule || !activeItem || !hoverCell || checked) return set;
    if (!rule.itemIds.includes(activeItem.id)) return set;
    if (!canPlace(activeItem.id, hoverCell.col, hoverCell.row)) return set;
    const minC = hoverCell.col - rule.cells;
    const maxC = hoverCell.col + activeItem.width - 1 + rule.cells;
    const minR = hoverCell.row - rule.cells;
    const maxR = hoverCell.row + activeItem.height - 1 + rule.cells;
    for (let c = minC; c <= maxC; c++) {
      for (let r = minR; r <= maxR; r++) {
        if (c < 0 || r < 0 || c >= exercise.gridCols || r >= exercise.gridRows) continue;
        const inSelf =
          c >= hoverCell.col &&
          c < hoverCell.col + activeItem.width &&
          r >= hoverCell.row &&
          r < hoverCell.row + activeItem.height;
        if (inSelf) continue;
        set.add(`${c},${r}`);
      }
    }
    return set;
  }, [exercise.clearanceRule, exercise.gridCols, exercise.gridRows, activeItem, hoverCell, checked, canPlace]);

  /* ----- Cell rendering helpers ----- */

  const isAnchorCell = useCallback(
    (col: number, row: number): Placement | undefined =>
      placements.find((p) => p.col === col && p.row === row),
    [placements]
  );

  const obstacleAt = useCallback(
    (col: number, row: number): ObstacleDef | undefined => {
      const id = obstacleCells.get(`${col},${row}`);
      if (!id) return undefined;
      return obstacles.find((o) => o.id === id && o.col === col && o.row === row);
    },
    [obstacleCells, obstacles]
  );

  /* ----- Build hint list when failing ----- */
  const failureHints = useMemo(() => {
    if (!checked || allCorrect) return [];
    const hints: { itemId: string; label: string; hint: string }[] = [];
    /* Clearance violation has top priority and shows once. */
    if (exercise.clearanceRule) {
      const { itemIds, violationKey } = exercise.clearanceRule;
      for (const id of itemIds) {
        if (!wrongItemIds.includes(id)) continue;
        const item = itemMap.get(id);
        if (!item) continue;
        hints.push({ itemId: id, label: t(item.labelKey), hint: t(violationKey) });
      }
    }
    /* Per-item placement hints. */
    for (const id of wrongItemIds) {
      if (hints.find((h) => h.itemId === id)) continue;
      const item = itemMap.get(id);
      if (!item) continue;
      const hintKey = exercise.itemMistakeHints?.[id];
      if (!hintKey) continue;
      hints.push({ itemId: id, label: t(item.labelKey), hint: t(hintKey) });
    }
    return hints;
  }, [checked, allCorrect, wrongItemIds, exercise.clearanceRule, exercise.itemMistakeHints, itemMap, t]);

  /* =================================================================
     RENDER
     ================================================================= */

  return (
    <LearningBlockShell
      tone="emerald"
      badgeIcon="🏫"
      badgeLabel={t("learningBlocks.classroomPlannerTitle")}
      title={t(exercise.instructionKey)}
      subtitle={t("learningBlocks.classroomPlannerInstruction")}
    >
      {/* Two-column layout (palette + grid) */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
        {/* ============ Palette ============ */}
        <aside className="lg:w-56 lg:shrink-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t("learningBlocks.classroomPlannerPalette")}
          </p>
          <div className="flex flex-row lg:flex-col flex-wrap gap-2">
            {palette.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  draggable={!checked}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handlePaletteClick(item.id)}
                  disabled={checked}
                  className={`group relative w-full text-left rounded-xl border-2 p-2.5 transition-all
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
                    ${
                      isSelected
                        ? "border-teal-500 bg-teal-50 ring-2 ring-teal-300 shadow-md"
                        : "border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/40 cursor-grab active:cursor-grabbing"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Visual size preview */}
                    <span
                      className="grid shrink-0 rounded-md bg-white border border-gray-300 p-0.5"
                      style={{
                        gridTemplateColumns: `repeat(${item.width}, 14px)`,
                        gridTemplateRows: `repeat(${item.height}, 14px)`,
                        gap: "2px",
                      }}
                      aria-hidden
                    >
                      {Array.from({ length: item.width * item.height }).map((_, i) => (
                        <span
                          key={i}
                          className="rounded-[3px] bg-gradient-to-br from-teal-100 to-teal-200"
                        />
                      ))}
                    </span>
                    <div className="min-w-0 flex-1 flex items-center gap-1.5">
                      <span className="text-base leading-none">{item.emoji}</span>
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {t(item.labelKey)}
                      </span>
                      {(item.width > 1 || item.height > 1) && (
                        <span className="shrink-0 text-[10px] text-gray-400 font-normal">
                          {item.width}&times;{item.height}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            {allPlaced && (
              <p className="text-xs text-gray-400 italic py-2">
                {t("learningBlocks.classroomPlannerPaletteEmpty")}
              </p>
            )}
          </div>
        </aside>

        {/* ============ Grid + legend ============ */}
        <div className="flex-1 min-w-0">
          {/* Grid container */}
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <div
              className="relative mx-auto rounded-xl bg-gradient-to-b from-gray-50 to-gray-100/60 border border-gray-200 p-2 planner-grid-frame"
              style={{ width: "fit-content" }}
            >
              {/* Front-of-room marker — labels the topmost zone if there is one */}
              {(() => {
                const topZone = exercise.zones.find((z) => z.row === 0);
                if (!topZone) return null;
                return (
                  <div className="text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    ↑ {t(topZone.labelKey)}
                  </div>
                );
              })()}

              <div
                className="grid planner-grid"
                style={{
                  gridTemplateColumns: `repeat(${exercise.gridCols}, var(--cell))`,
                  gridTemplateRows: `repeat(${exercise.gridRows}, var(--cell))`,
                }}
              >
                {Array.from({ length: exercise.gridRows }, (_, row) =>
                  Array.from({ length: exercise.gridCols }, (_, col) => {
                    const cellKey = `${col},${row}`;
                    const obstacle = obstacleAt(col, row);
                    const isObstacleCell = obstacleCells.has(cellKey);
                    const placement = isAnchorCell(col, row);
                    const placedItem = placement ? itemMap.get(placement.itemId) : null;
                    const isOccupied = occupiedCells.has(cellKey);
                    const isAnchor = Boolean(placement);
                    const zoneIdx = cellZoneIndex.get(cellKey);
                    const tone = zoneIdx !== undefined ? ZONE_TONES[zoneIdx % ZONE_TONES.length] : null;

                    /* Is this cell the top-left of its zone? Then render the chip badge. */
                    const zoneBadge =
                      zoneIdx !== undefined &&
                      exercise.zones[zoneIdx].col === col &&
                      exercise.zones[zoneIdx].row === row
                        ? { idx: zoneIdx, tone: ZONE_TONES[zoneIdx % ZONE_TONES.length], glyph: ZONE_GLYPHS[zoneIdx] }
                        : null;

                    const isGhost = ghostCells.has(cellKey);
                    const isGhostAnchor = isGhost && hoverCell?.col === col && hoverCell?.row === row;
                    const isClearance = clearanceCells.has(cellKey);

                    /* Targetable hint when active item is selected */
                    const targetable =
                      activeId &&
                      !checked &&
                      !isOccupied &&
                      !isObstacleCell &&
                      canPlace(activeId, col, row);

                    /* Validation visuals after check */
                    const itemIsWrong =
                      checked && placement && wrongItemIds.includes(placement.itemId);
                    const itemIsCorrect = checked && placement && !wrongItemIds.includes(placement.itemId);

                    /* Base background */
                    let bgClass = "bg-white";
                    if (isObstacleCell) {
                      bgClass = "bg-gray-100";
                    } else if (tone) {
                      bgClass = tone.bgGrid;
                    }
                    if (isClearance && !isOccupied && !isObstacleCell) {
                      bgClass = "bg-amber-200/70";
                    }
                    if (targetable) {
                      bgClass = "bg-teal-200/70";
                    }

                    /* Border */
                    const borderClass = isObstacleCell
                      ? "border-2 border-dashed border-gray-400"
                      : "border border-white/60";

                    return (
                      <button
                        key={cellKey}
                        type="button"
                        onClick={() => handleCellClick(col, row)}
                        onDragOver={(e) => handleCellDragOver(e, col, row)}
                        onDragLeave={() => setHoverCell(null)}
                        onDrop={(e) => handleCellDrop(e, col, row)}
                        onMouseEnter={() => {
                          if (activeId && !checked && !isOccupied && !isObstacleCell) {
                            setHoverCell({ col, row });
                          }
                        }}
                        onMouseLeave={() => setHoverCell(null)}
                        disabled={
                          (checked && !isOccupied) ||
                          (isObstacleCell && !isAnchor)
                        }
                        className={`relative planner-cell rounded-md ${bgClass} ${borderClass} transition-colors duration-150
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1
                          ${isObstacleCell ? "cursor-not-allowed" : !checked ? "cursor-pointer" : ""}
                        `}
                        aria-label={
                          obstacle
                            ? t(obstacle.labelKey)
                            : placedItem
                              ? t(placedItem.labelKey)
                              : `${t("learningBlocks.classroomPlannerCell")} ${col + 1},${row + 1}`
                        }
                      >
                        {/* Zone numbered chip (top-left of zone, inside the cell) */}
                        {zoneBadge && (
                          <span
                            className={`absolute top-1 left-1 z-30 inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold shadow-sm ${zoneBadge.tone.chip}`}
                            aria-hidden
                          >
                            {zoneBadge.glyph}
                          </span>
                        )}

                        {/* Obstacle render */}
                        {obstacle && (
                          <span
                            className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl select-none pointer-events-none"
                          >
                            {obstacle.emoji}
                          </span>
                        )}

                        {/* Placed item (anchor renders the full footprint) */}
                        {isAnchor && placedItem && (
                          <span
                            draggable={!checked}
                            onDragStart={(e) => handleDragStart(e, placedItem.id)}
                            onDragEnd={handleDragEnd}
                            className={`absolute top-0 left-0 z-20 flex items-center justify-center text-2xl sm:text-[26px] select-none rounded-md border-2
                              ${
                                checked
                                  ? itemIsCorrect
                                    ? "border-emerald-500 bg-emerald-50"
                                    : itemIsWrong
                                      ? "border-red-500 bg-red-50"
                                      : "border-gray-300 bg-white"
                                  : "border-teal-400 bg-white shadow-sm cursor-grab active:cursor-grabbing"
                              }`}
                            style={{
                              width: `calc(${placedItem.width} * (var(--cell) + 4px) - 4px)`,
                              height: `calc(${placedItem.height} * (var(--cell) + 4px) - 4px)`,
                            }}
                          >
                            {placedItem.emoji}
                            {checked && itemIsCorrect && (
                              <IconCheck className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white p-0.5" />
                            )}
                            {checked && itemIsWrong && (
                              <IconClose className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white p-0.5" />
                            )}
                          </span>
                        )}

                        {/* Ghost preview */}
                        {isGhostAnchor && activeItem && (
                          <span
                            className="absolute top-0 left-0 z-10 flex items-center justify-center text-2xl select-none rounded-md border-2 border-dashed border-teal-500 bg-teal-100/60 opacity-80 pointer-events-none"
                            style={{
                              width: `calc(${activeItem.width} * (var(--cell) + 4px) - 4px)`,
                              height: `calc(${activeItem.height} * (var(--cell) + 4px) - 4px)`,
                            }}
                          >
                            {activeItem.emoji}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* ============ Legend ============ */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {t("learningBlocks.classroomPlannerLegend")}
            </p>
            <ul className="grid sm:grid-cols-3 gap-2">
              {exercise.zones.map((zone, zi) => {
                const tone = ZONE_TONES[zi % ZONE_TONES.length];
                const ok = zoneResults[zone.id];
                const showResult = checked;
                return (
                  <li
                    key={zone.id}
                    className={`rounded-lg border p-2.5 ${tone.legendBorder} ${tone.legendBg} ${
                      showResult
                        ? ok
                          ? "ring-2 ring-emerald-300"
                          : "ring-2 ring-red-300"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${tone.chip}`}
                      >
                        {ZONE_GLYPHS[zi]}
                      </span>
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold ${tone.text}`}>
                          {t(zone.labelKey)}
                          {showResult && (
                            <span className="ml-1.5 inline-flex items-center align-middle">
                              {ok ? (
                                <IconCheck className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <IconClose className="w-3.5 h-3.5 text-red-600" />
                              )}
                            </span>
                          )}
                        </p>
                        {zone.descriptionKey && (
                          <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                            {t(zone.descriptionKey)}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {obstacles.length > 0 && (
              <p className="text-[11px] text-gray-500 mt-2 flex items-center gap-1.5">
                <span aria-hidden>{obstacles[0].emoji}</span>
                {t("learningBlocks.classroomPlannerObstacle")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ============ Actions ============ */}
      <div className="mt-6 flex flex-wrap justify-end gap-3 animate-content-enter">
        {!checked && placements.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.classroomPlannerClearAll")}
          </button>
        )}

        {!checked && allPlaced && (
          <button
            type="button"
            onClick={handleCheck}
            className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.classroomPlannerCheckLayout")}
          </button>
        )}

        {checked && !allCorrect && (
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.classroomPlannerRetry")}
          </button>
        )}

        {allCorrect && (
          <button
            type="button"
            onClick={onPass}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span aria-hidden>→</span>
          </button>
        )}
      </div>

      {/* ============ Result panels ============ */}
      {checked && !allCorrect && failureHints.length > 0 && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 animate-wizard-feedback">
          <p className="text-sm font-semibold text-red-800 mb-2">
            {t("learningBlocks.classroomPlannerHintsTitle")}
          </p>
          <ul className="space-y-2">
            {failureHints.map((h) => (
              <li key={h.itemId} className="flex items-start gap-2 text-sm text-red-900">
                <IconClose className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>
                  <strong className="font-semibold">{h.label}:</strong> {h.hint}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {allCorrect && exercise.successJustificationKeys && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 animate-wizard-feedback">
          <p className="text-sm font-semibold text-emerald-900 mb-2">
            ✅ {t("learningBlocks.classroomPlannerWhyItWorks")}
          </p>
          <ul className="space-y-1.5">
            {exercise.successJustificationKeys.map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm text-emerald-900">
                <IconCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cell-size variable: bigger on desktop, smaller on mobile */}
      <style jsx>{`
        .planner-grid-frame {
          --cell: 44px;
        }
        @media (min-width: 640px) {
          .planner-grid-frame {
            --cell: 56px;
          }
        }
        .planner-cell {
          width: var(--cell);
          height: var(--cell);
        }
        .planner-grid {
          gap: 4px;
        }
      `}</style>
    </LearningBlockShell>
  );
}
