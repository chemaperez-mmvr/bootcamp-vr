"use client";

import { useState, useCallback, useMemo } from "react";
import type { ClassroomPlannerExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";

/* Distinct colors for zones */
const ZONE_COLORS = [
  { border: "border-blue-400", bg: "bg-blue-50/40", text: "text-blue-700", dashOk: "border-green-500", dashBad: "border-red-500" },
  { border: "border-amber-400", bg: "bg-amber-50/40", text: "text-amber-700", dashOk: "border-green-500", dashBad: "border-red-500" },
  { border: "border-purple-400", bg: "bg-purple-50/40", text: "text-purple-700", dashOk: "border-green-500", dashBad: "border-red-500" },
  { border: "border-rose-400", bg: "bg-rose-50/40", text: "text-rose-700", dashOk: "border-green-500", dashBad: "border-red-500" },
  { border: "border-emerald-400", bg: "bg-emerald-50/40", text: "text-emerald-700", dashOk: "border-green-500", dashBad: "border-red-500" },
  { border: "border-sky-400", bg: "bg-sky-50/40", text: "text-sky-700", dashOk: "border-green-500", dashBad: "border-red-500" },
];

type Placement = { itemId: string; col: number; row: number };

/**
 * Check whether an item of given size fits entirely within a zone.
 * Items occupy cells [col, col+width) x [row, row+height).
 * Zones occupy cells [zone.col, zone.col+zone.width) x [zone.row, zone.row+zone.height).
 * An item is "within" a zone if every cell of the item falls inside the zone.
 */
function isItemInZone(
  placement: Placement,
  itemWidth: number,
  itemHeight: number,
  zone: ClassroomPlannerExercise["zones"][number]
): boolean {
  const itemEndCol = placement.col + itemWidth;
  const itemEndRow = placement.row + itemHeight;
  const zoneEndCol = zone.col + zone.width;
  const zoneEndRow = zone.row + zone.height;

  return (
    placement.col >= zone.col &&
    itemEndCol <= zoneEndCol &&
    placement.row >= zone.row &&
    itemEndRow <= zoneEndRow
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
  const [checked, setChecked] = useState(false);
  const [zoneResults, setZoneResults] = useState<Record<string, boolean>>({});

  type Item = ClassroomPlannerExercise["items"][number];

  const itemMap = useMemo(
    () => new Map<string, Item>(exercise.items.map((i) => [i.id, i])),
    [exercise.items]
  );

  const placedItemIds = useMemo(
    () => new Set(placements.map((p) => p.itemId)),
    [placements]
  );

  const allPlaced = placedItemIds.size === exercise.items.length;

  /** Get which cells are occupied and by which item */
  const occupiedCells = useMemo(() => {
    const cells = new Map<string, string>(); // "col,row" -> itemId
    for (const p of placements) {
      const item = itemMap.get(p.itemId);
      if (!item) continue;
      for (let c = p.col; c < p.col + item.width; c++) {
        for (let r = p.row; r < p.row + item.height; r++) {
          cells.set(`${c},${r}`, p.itemId);
        }
      }
    }
    return cells;
  }, [placements, itemMap]);

  /** Check whether an item of given size can be placed at (col, row) without overlap */
  const canPlace = useCallback(
    (itemId: string, col: number, row: number): boolean => {
      const item = itemMap.get(itemId);
      if (!item) return false;
      if (col + item.width > exercise.gridCols) return false;
      if (row + item.height > exercise.gridRows) return false;

      for (let c = col; c < col + item.width; c++) {
        for (let r = row; r < row + item.height; r++) {
          const existing = occupiedCells.get(`${c},${r}`);
          if (existing && existing !== itemId) return false;
        }
      }
      return true;
    },
    [itemMap, exercise.gridCols, exercise.gridRows, occupiedCells]
  );

  /** Handle tapping a palette item */
  const handlePaletteSelect = useCallback(
    (itemId: string) => {
      if (checked) return;
      setSelectedItemId((prev) => (prev === itemId ? null : itemId));
    },
    [checked]
  );

  /** Handle tapping a grid cell */
  const handleGridCellTap = useCallback(
    (col: number, row: number) => {
      if (checked) return;

      const cellKey = `${col},${row}`;
      const existingItemId = occupiedCells.get(cellKey);

      // If tapping a placed item, pick it up
      if (existingItemId) {
        setPlacements((prev) => prev.filter((p) => p.itemId !== existingItemId));
        setSelectedItemId(existingItemId);
        return;
      }

      // If an item is selected, try to place it
      if (selectedItemId && canPlace(selectedItemId, col, row)) {
        // Remove if already placed elsewhere
        setPlacements((prev) => [
          ...prev.filter((p) => p.itemId !== selectedItemId),
          { itemId: selectedItemId, col, row },
        ]);
        setSelectedItemId(null);
      }
    },
    [checked, occupiedCells, selectedItemId, canPlace]
  );

  /** Validate all zones */
  const handleCheck = useCallback(() => {
    const results: Record<string, boolean> = {};

    for (const zone of exercise.zones) {
      const allRequired = zone.requiredItemIds.every((reqId) => {
        const placement = placements.find((p) => p.itemId === reqId);
        if (!placement) return false;
        const item = itemMap.get(reqId);
        if (!item) return false;
        return isItemInZone(placement, item.width, item.height, zone);
      });
      results[zone.id] = allRequired;
    }

    setZoneResults(results);
    setChecked(true);

    // If any wrong, bounce wrong items back after a delay
    const wrongZones = exercise.zones.filter((z) => !results[z.id]);
    if (wrongZones.length > 0) {
      const wrongItemIds = new Set<string>();
      for (const zone of wrongZones) {
        for (const reqId of zone.requiredItemIds) {
          const placement = placements.find((p) => p.itemId === reqId);
          if (!placement) {
            wrongItemIds.add(reqId);
            continue;
          }
          const item = itemMap.get(reqId);
          if (!item || !isItemInZone(placement, item.width, item.height, zone)) {
            wrongItemIds.add(reqId);
          }
        }
      }

      setTimeout(() => {
        setPlacements((prev) => prev.filter((p) => !wrongItemIds.has(p.itemId)));
        setChecked(false);
        setZoneResults({});
      }, 2000);
    }
  }, [exercise.zones, placements, itemMap]);

  const allCorrect = checked && Object.values(zoneResults).every(Boolean) && Object.keys(zoneResults).length > 0;

  /** Build zone lookup: which zone occupies each cell */
  const cellZoneMap = useMemo(() => {
    const map = new Map<string, number>(); // "col,row" -> zone index
    for (let zi = 0; zi < exercise.zones.length; zi++) {
      const zone = exercise.zones[zi];
      for (let c = zone.col; c < zone.col + zone.width; c++) {
        for (let r = zone.row; r < zone.row + zone.height; r++) {
          map.set(`${c},${r}`, zi);
        }
      }
    }
    return map;
  }, [exercise.zones]);

  /** Get the placement whose item covers a specific cell */
  const getItemAtCell = useCallback(
    (col: number, row: number): Placement | undefined => {
      return placements.find((p) => {
        const item = itemMap.get(p.itemId);
        if (!item) return false;
        return (
          col >= p.col &&
          col < p.col + item.width &&
          row >= p.row &&
          row < p.row + item.height
        );
      });
    },
    [placements, itemMap]
  );

  /** Check if this cell is the top-left anchor of a placed item */
  const isAnchorCell = useCallback(
    (col: number, row: number): Placement | undefined => {
      return placements.find((p) => p.col === col && p.row === row);
    },
    [placements]
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-content-enter">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
        {t("learningBlocks.classroomPlannerTitle")}
      </div>

      {/* Instruction */}
      <p className="text-base font-semibold text-gray-900 mb-1">
        {t(exercise.instructionKey)}
      </p>
      <p className="text-sm text-gray-500 mb-5">
        {t("learningBlocks.classroomPlannerInstruction")}
      </p>

      {/* Grid — scrollable on mobile */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div
          className="relative mx-auto border border-gray-200 rounded-xl bg-gray-50 p-1"
          style={{ width: "fit-content" }}
        >
          {/* Zone labels (absolute overlays) */}
          {exercise.zones.map((zone, zi) => {
            const color = ZONE_COLORS[zi % ZONE_COLORS.length];
            const zoneOk = zoneResults[zone.id];
            const zoneBad = checked && !zoneOk;
            const borderClass = checked
              ? zoneOk
                ? "border-green-500"
                : "border-red-500"
              : color.border;

            return (
              <div
                key={zone.id}
                className="pointer-events-none absolute z-10"
                style={{
                  /* Position over the CSS grid cells via calc.
                     Each cell is ~52px (48px + 4px gap). */
                  left: `calc(${zone.col} * (48px + 4px) + 4px)`,
                  top: `calc(${zone.row} * (48px + 4px) + 4px)`,
                  width: `calc(${zone.width} * (48px + 4px) - 4px)`,
                  height: `calc(${zone.height} * (48px + 4px) - 4px)`,
                }}
              >
                <div
                  className={`w-full h-full rounded-lg border-2 border-dashed ${borderClass} ${checked ? (zoneOk ? "bg-green-50/50" : "bg-red-50/50") : color.bg} transition-colors duration-300`}
                >
                  <span
                    className={`absolute -top-2.5 left-2 px-1.5 py-0 text-[10px] font-semibold rounded ${
                      checked
                        ? zoneOk
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        : `bg-white ${color.text}`
                    } leading-tight`}
                  >
                    {checked && zoneOk && (
                      <IconCheck className="w-3 h-3 inline-block mr-0.5 -mt-0.5" />
                    )}
                    {zoneBad && (
                      <IconClose className="w-3 h-3 inline-block mr-0.5 -mt-0.5" />
                    )}
                    {t(zone.labelKey)}
                  </span>
                </div>
              </div>
            );
          })}

          {/* CSS Grid */}
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${exercise.gridCols}, 48px)`,
              gridTemplateRows: `repeat(${exercise.gridRows}, 48px)`,
            }}
          >
            {Array.from({ length: exercise.gridRows }, (_, row) =>
              Array.from({ length: exercise.gridCols }, (_, col) => {
                const cellKey = `${col},${row}`;
                const placementAtCell = getItemAtCell(col, row);
                const anchor = isAnchorCell(col, row);
                const anchorItem = anchor ? itemMap.get(anchor.itemId) : null;
                const isOccupied = Boolean(placementAtCell);
                const zoneIdx = cellZoneMap.get(cellKey);
                const isInZone = zoneIdx !== undefined;
                const isSelectable = selectedItemId && !isOccupied && !checked;

                // Determine if this cell is highlighted as a valid target
                let targetable = false;
                if (selectedItemId && !checked && !isOccupied) {
                  targetable = canPlace(selectedItemId, col, row);
                }

                return (
                  <button
                    key={cellKey}
                    type="button"
                    onClick={() => handleGridCellTap(col, row)}
                    disabled={checked && !isOccupied}
                    className={`
                      relative w-12 h-12 rounded-md border transition-all duration-150
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1
                      ${
                        isOccupied && !checked
                          ? "border-teal-300 bg-teal-50 cursor-pointer hover:border-teal-400"
                          : isOccupied && checked
                            ? "border-gray-300 bg-white"
                            : targetable
                              ? "border-teal-300 border-dashed bg-teal-50/50 cursor-pointer hover:bg-teal-100/60"
                              : isSelectable
                                ? "border-gray-200 bg-white/60 cursor-pointer hover:bg-gray-100/60"
                                : isInZone
                                  ? "border-gray-200/60 bg-transparent"
                                  : "border-gray-200/60 bg-white/30"
                      }
                    `}
                    aria-label={
                      anchorItem
                        ? t(anchorItem.labelKey)
                        : `${t("learningBlocks.classroomPlannerCell")} ${col + 1},${row + 1}`
                    }
                  >
                    {/* Show emoji for anchor cell of placed item */}
                    {anchor && anchorItem && (
                      <span
                        className="absolute inset-0 flex items-center justify-center text-2xl pointer-events-none select-none z-20"
                        style={{
                          width: `calc(${anchorItem.width} * (48px + 4px) - 4px)`,
                          height: `calc(${anchorItem.height} * (48px + 4px) - 4px)`,
                        }}
                      >
                        {anchorItem.emoji}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Palette */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          {t("learningBlocks.classroomPlannerPalette")}
        </p>
        <div className="flex flex-wrap gap-2">
          {exercise.items
            .filter((item) => !placedItemIds.has(item.id))
            .map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePaletteSelect(item.id)}
                  disabled={checked}
                  className={`
                    inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
                    ${
                      isSelected
                        ? "border-teal-500 bg-teal-50 text-teal-800 ring-2 ring-teal-300 shadow-md scale-[1.03]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50/40 cursor-pointer"
                    }
                  `}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span>{t(item.labelKey)}</span>
                  {item.width > 1 || item.height > 1 ? (
                    <span className="text-[10px] text-gray-400 font-normal">
                      {item.width}x{item.height}
                    </span>
                  ) : null}
                </button>
              );
            })}
          {placedItemIds.size === exercise.items.length && !checked && (
            <p className="text-sm text-gray-400 italic py-2">
              {t("learningBlocks.classroomPlannerAllPlaced")}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3 animate-content-enter">
        {!checked && placements.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setPlacements([]);
              setSelectedItemId(null);
            }}
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

      {/* Result message */}
      {checked && (
        <div
          className={`mt-4 rounded-xl border p-4 animate-wizard-feedback ${
            allCorrect
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              allCorrect ? "text-green-800" : "text-red-800"
            }`}
          >
            {allCorrect
              ? t("learningBlocks.classroomPlannerCorrect")
              : t("learningBlocks.classroomPlannerWrong")}
          </p>
        </div>
      )}
    </div>
  );
}
