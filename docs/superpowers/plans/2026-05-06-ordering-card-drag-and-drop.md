# OrderingCard Drag-and-Drop Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers-extended-cc:subagent-driven-development (if subagents available) or superpowers-extended-cc:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el tap-to-swap actual de `OrderingCard` por drag-and-drop real con animaciones FLIP, soporte de teclado y respeto a `prefers-reduced-motion`. Aplica a los 7 ejercicios `ordering` del bootcamp (M1, M2, M3, M4 ×2, M5, M6) sin tocar cada módulo.

**Architecture:** Un único componente cliente (`app/components/steps/learning-block/OrderingCard.tsx`) se reescribe para envolver la lista en `DndContext` + `SortableContext` de `@dnd-kit`. Cada item se extrae a un sub-componente `SortableItem` que usa `useSortable` con `disabled={checked}`. Shuffle inicial movido a `useEffect` para evitar mismatch de hidratación SSR. Reduced-motion vía el hook existente `usePrefersReducedMotion`.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind v3, next-intl v4, `@dnd-kit/core@^6`, `@dnd-kit/sortable@^8`, `@dnd-kit/utilities@^3`.

**Spec de referencia:** `docs/superpowers/specs/2026-05-06-ordering-card-drag-and-drop-design.md`.

**Nota sobre verificación:** Este codebase **no usa tests automatizados de componentes** (ver `CLAUDE.md`). La verificación se hace con `npm run lint`, `npm run build` y validación manual en navegador vía Playwright MCP.

---

## File Structure

| Archivo | Tipo | Responsabilidad |
|---|---|---|
| `package.json` | Modify | Añadir 3 dependencias `@dnd-kit/*`. |
| `package-lock.json` | Modify | Generado por `npm install`. |
| `messages/es.json` | Modify (1 línea) | Acortar `learningBlocks.orderingInstruction`. |
| `messages/en.json` | Modify (1 línea) | Acortar `learningBlocks.orderingInstruction`. |
| `app/components/steps/learning-block/OrderingCard.tsx` | Rewrite | Toda la lógica nueva. |

No se crean archivos nuevos: el `SortableItem` vive como sub-componente local dentro del mismo `.tsx` (mantiene el archivo cohesionado y evita una abstracción que solo se usa una vez).

---

## Task 0: Instalar dependencias de @dnd-kit

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Instalar las 3 dependencias en versiones estables**

```bash
npm install @dnd-kit/core@^6 @dnd-kit/sortable@^8 @dnd-kit/utilities@^3
```

- [ ] **Step 2: Verificar que aparecen en `dependencies`**

```bash
npm pkg get dependencies.@dnd-kit/core dependencies.@dnd-kit/sortable dependencies.@dnd-kit/utilities
```

Expected: salida JSON con las tres versiones, todas con prefijo `^` (ej. `{"dependencies.@dnd-kit/core":"^6.x.x", ...}`).

- [ ] **Step 3: Build sanity check**

```bash
npm run build
```

Expected: build pasa sin errores. Las dependencias se resuelven y no rompe nada existente (no las usamos todavía).

- [ ] **Step 4: Commit**

```bash
rtk git add package.json package-lock.json
rtk git commit -m "Add @dnd-kit dependencies for OrderingCard drag-and-drop"
```

---

## Task 1: Actualizar las traducciones

**Files:**
- Modify: `messages/es.json:681`
- Modify: `messages/en.json:681`

El subtítulo actual menciona "tap to swap", funcionalidad que vamos a eliminar. Cambiamos los textos antes de tocar el componente para que no quede una pantalla intermedia mintiendo al usuario.

- [ ] **Step 1: Editar la clave en `messages/es.json`**

Cambiar la línea 681 de:
```json
"orderingInstruction": "Arrastra para reordenar, o toca para intercambiar posiciones",
```
a:
```json
"orderingInstruction": "Arrastra para reordenar",
```

- [ ] **Step 2: Editar la clave en `messages/en.json`**

Cambiar la línea 681 de:
```json
"orderingInstruction": "Drag to reorder, or tap to swap positions",
```
a:
```json
"orderingInstruction": "Drag to reorder",
```

- [ ] **Step 3: Verificar que ambos JSON siguen siendo válidos**

Correr `npm run lint` (incluye el chequeo de JSON parsing implícito al cargar las traducciones) — alternativamente, vía Bash tool:

```bash
node -e "require('./messages/es.json'); require('./messages/en.json'); console.log('ok')"
```

Expected: imprime `ok`. Si falla, hay un error de sintaxis en el JSON.

- [ ] **Step 4: Commit**

```bash
rtk git add messages/es.json messages/en.json
rtk git commit -m "Shorten ordering instruction text to match drag-only UX"
```

---

## Task 2: Reescribir OrderingCard con dnd-kit

**Files:**
- Rewrite: `app/components/steps/learning-block/OrderingCard.tsx`

Este es el cambio principal. El componente se reescribe completo siguiendo el spec.

- [ ] **Step 1: Reemplazar el contenido entero del archivo**

Reemplazar `app/components/steps/learning-block/OrderingCard.tsx` con:

```tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { OrderingExercise } from "@/app/bootcamp/learning-block-types";
import { IconCheck, IconClose } from "@/app/components/icons";
import { usePrefersReducedMotion } from "@/app/components/usePrefersReducedMotion";
import { LearningBlockShell } from "./LearningBlockShell";

type ItemMeta = {
  id: string;
  labelKey: string;
};

function SortableItem({
  id,
  index,
  labelText,
  checked,
  isWrong,
  reduceMotion,
}: {
  id: string;
  index: number;
  labelText: string;
  checked: boolean;
  isWrong: boolean;
  reduceMotion: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: checked,
    transition: reduceMotion ? null : undefined,
  });

  const isCorrectChecked = checked && !isWrong;

  let classes =
    "w-full p-4 rounded-xl border-2 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2";

  if (checked) {
    classes += isCorrectChecked
      ? " border-green-400 bg-green-50 text-green-800"
      : " border-red-400 bg-red-50 text-red-800";
  } else if (isDragging) {
    classes +=
      " border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-300 shadow-lg cursor-grabbing";
  } else {
    classes +=
      " border-gray-200 text-gray-700 hover:border-violet-300 hover:bg-violet-50/30 cursor-grab";
  }

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    touchAction: "none",
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      disabled={checked}
      className={classes}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
            checked && isCorrectChecked
              ? "bg-green-500 text-white"
              : checked && isWrong
                ? "bg-red-500 text-white"
                : isDragging
                  ? "bg-violet-500 text-white"
                  : "bg-gray-100 text-gray-500 border border-gray-300"
          }`}
        >
          {checked && isCorrectChecked ? (
            <IconCheck className="w-3.5 h-3.5" />
          ) : checked && isWrong ? (
            <IconClose className="w-3.5 h-3.5" />
          ) : (
            index + 1
          )}
        </span>
        <span className="leading-relaxed">{labelText}</span>
      </div>
    </button>
  );
}

export function OrderingCard({
  exercise,
  onPass,
  t,
}: {
  exercise: OrderingExercise;
  onPass: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}) {
  // Initial order is deterministic (input order) to avoid SSR hydration mismatch.
  // The shuffle runs in useEffect after mount.
  const [order, setOrder] = useState<string[]>(() =>
    exercise.items.map((i) => i.id)
  );
  const [checked, setChecked] = useState(false);
  const [wrongPositions, setWrongPositions] = useState<Set<number>>(new Set());
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    setOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const itemMap = useMemo<Map<string, ItemMeta>>(
    () => new Map(exercise.items.map((i) => [i.id, i])),
    [exercise.items]
  );

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setOrder((prev) =>
      arrayMove(
        prev,
        prev.indexOf(active.id as string),
        prev.indexOf(over.id as string)
      )
    );
  }, []);

  const handleCheck = useCallback(() => {
    const wrong = new Set<number>();
    const correctOrder = [...exercise.items]
      .sort((a, b) => a.correctPosition - b.correctPosition)
      .map((i) => i.id);

    order.forEach((id, idx) => {
      if (id !== correctOrder[idx]) wrong.add(idx);
    });

    setWrongPositions(wrong);
    setChecked(true);
  }, [order, exercise.items]);

  const handleReset = useCallback(() => {
    setOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
    setChecked(false);
    setWrongPositions(new Set());
  }, []);

  const allCorrect = checked && wrongPositions.size === 0;

  return (
    <LearningBlockShell
      tone="violet"
      badgeLabel={t("learningBlocks.orderingTitle")}
      title={t(exercise.instructionKey)}
      subtitle={t("learningBlocks.orderingInstruction")}
    >
      {/* Scale labels */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {t(exercise.scaleStartKey)}
        </span>
        <div className="flex-1 mx-3 h-px bg-gray-200" />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {t(exercise.scaleEndKey)}
        </span>
      </div>

      {/* Sortable items */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {order.map((id, idx) => {
              const item = itemMap.get(id);
              if (!item) return null;
              return (
                <SortableItem
                  key={id}
                  id={id}
                  index={idx}
                  labelText={t(item.labelKey)}
                  checked={checked}
                  isWrong={wrongPositions.has(idx)}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        {!checked && (
          <button
            type="button"
            onClick={handleCheck}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.exerciseDone")}
            <span aria-hidden>→</span>
          </button>
        )}

        {checked && !allCorrect && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-800 bg-amber-100 rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            {t("learningBlocks.orderingReset")}
            <span aria-hidden>↩</span>
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

      {/* Result */}
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
              ? t("learningBlocks.orderingCorrect")
              : t("learningBlocks.orderingWrong")}
          </p>
        </div>
      )}
    </LearningBlockShell>
  );
}
```

Notas técnicas embebidas en el código:

- `touchAction: "none"` en el item evita que el navegador intercepte el gesto antes de que `PointerSensor` lo capture en touch.
- `useSortable({ ..., transition: reduceMotion ? null : undefined })` apaga la animación FLIP a nivel del hook cuando el usuario prefiere movimiento reducido (alineado con el spec). El `transition` que retorna el hook ya viene como `null` en ese caso, así que el `style` lo aplica directamente.
- **Limitación conocida:** `usePrefersReducedMotion` arranca con `false` y se actualiza tras el primer `useEffect`. Para un usuario con `prefers-reduced-motion: reduce`, una única transición justo tras el mount podría animarse antes de que el estado se sincronice. Impacto: bajo (el primer drag rara vez ocurre en el primer paint). Si en QA molesta, sustituir el hook por `useSyncExternalStore` para lectura síncrona en SSR/primer render.
- `disabled={checked}` se aplica tanto al `<button>` (HTML nativo, bloquea click) como al `useSortable` (bloquea drag y teclado de dnd-kit).
- `closestCenter` es la estrategia de detección recomendada para listas verticales con items de altura uniforme.
- `useMemo` para `itemMap` evita recrear el `Map` en cada render.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: sin errores nuevos. Si aparece "React Hook useEffect has a missing dependency", revisar — no debería, el `setOrder` callback es estable.

- [ ] **Step 3: Type-check vía build**

```bash
npm run build
```

Expected: build pasa. TypeScript valida los imports de dnd-kit, los tipos de `DragEndEvent`, y que `OrderingExercise` siga siendo compatible.

- [ ] **Step 4: Commit**

```bash
rtk git add app/components/steps/learning-block/OrderingCard.tsx
rtk git commit -m "Replace OrderingCard tap-to-swap with @dnd-kit drag-and-drop"
```

---

## Task 3: Verificación manual con Playwright

**Files:** ninguno modificado — solo verificación.

Esta tarea exige levantar el dev server y exercitar el componente en el navegador real. Usar Playwright MCP (`mcp__playwright__browser_*`).

- [ ] **Step 1: Asegurar dev server corriendo**

Si no está corriendo, iniciarlo en background:
```bash
npm run dev
```
Esperar a que el log diga `Ready in ...`. Confirmar que escucha en `http://localhost:3000`.

- [ ] **Step 2: Navegar al ejercicio M1 de ordering**

Usar `mcp__playwright__browser_navigate` con URL `http://localhost:3000/es/bootcamp/module/getting-vr-ready`. Para garantizar acceso al Tema 5 (b5-order) sin depender del progreso previo del usuario, primero limpiar progreso vía `mcp__playwright__browser_evaluate`:

```js
() => { Object.keys(localStorage).filter(k => k.startsWith("vr-education-hub:")).forEach(k => localStorage.removeItem(k)); location.reload(); }
```

Después navegar paso a paso (Tema 1 → 2 → 3 → 4 → 5) usando el botón "Skip scenario →" cuando esté disponible, hasta llegar al ejercicio b5-order. Confirmar con un snapshot que estamos en el card "Ordena".

- [ ] **Step 3: Sacar screenshot del estado inicial**

```
mcp__playwright__browser_take_screenshot fullPage:false filename:ordering-after-initial.png
```

Confirmar visualmente que: (a) el subtítulo dice "Arrastra para reordenar" (sin "o toca..."), (b) los items aparecen barajados, (c) cursor `grab` no se ve en screenshot pero el estilo está aplicado.

- [ ] **Step 4: Probar drag con mouse**

Usar `mcp__playwright__browser_drag` para arrastrar el primer item al cuarto puesto. Confirmar con un nuevo screenshot que la posición cambió y que ningún item desapareció.

- [ ] **Step 5: Probar drop fuera de la lista**

Iniciar un drag y soltar fuera del card (por ejemplo, sobre el header). El orden no debe cambiar. Verificar con screenshot.

- [ ] **Step 6: Probar comportamiento de scroll vertical en viewport pequeño**

```
mcp__playwright__browser_resize width:390 height:600
```

Hacer scroll dentro del card con la rueda/touch. El scroll de la página debe funcionar (no se debe disparar drag accidental). Volver a `width:1280 height:800` después.

- [ ] **Step 7: Probar accesibilidad por teclado**

```js
// vía mcp__playwright__browser_evaluate
() => document.querySelectorAll('[role="button"], button').length
```

Hacer focus en el primer item del listado (Tab repetido o `mcp__playwright__browser_press_key key:Tab`). Pulsar Space, luego ArrowDown dos veces, luego Space. Verificar que el item se movió dos posiciones hacia abajo.

- [ ] **Step 8: Probar "Comprobar" → "Reintentar"**

Pulsar "Continuar" (que en estado pre-check funciona como "Comprobar"). El feedback verde/rojo debe aparecer y los items deben dejar de ser arrastrables (intentar drag y verificar que no se mueven). Pulsar "Reintentar": los items se deben re-barajar visiblemente con animación.

- [ ] **Step 9: Probar resultado correcto**

Ordenar los items en la posición correcta (referencia en `app/documentation/content/module-1/sections.es.ts` para el orden esperado del b5). Pulsar "Continuar" → debe mostrar el panel verde "¡Orden perfecto!" y avanzar al pulsar "Continuar".

- [ ] **Step 10: Verificar en EN locale**

Navegar a `http://localhost:3000/en/bootcamp/module/getting-vr-ready`, ir al mismo paso, screenshot. Subtítulo debe decir "Drag to reorder".

- [ ] **Step 11: Verificar en otro módulo (M2)**

Navegar a `http://localhost:3000/es/bootcamp/module/designing-meaningful-learning` → paso "Aprender → Tema 2" (es el `b2-order`). Confirmar que el drag-and-drop también funciona ahí. Esto valida el spec key claim: "aplica a todos los módulos".

- [ ] **Step 12: Probar reduced-motion (opcional pero recomendado)**

```
mcp__playwright__browser_evaluate function: "() => { const s=document.createElement('style'); s.textContent='@media (prefers-reduced-motion: no-preference){}'; document.head.appendChild(s); }"
```

O preferiblemente, en DevTools simular `prefers-reduced-motion: reduce` (no hay API directa de Playwright para esto sin reiniciar el navegador con flag — si no es práctico, anotar como limitación de la verificación y dejar para QA manual del usuario).

- [ ] **Step 13: Limpiar screenshots de verificación**

El shell por default es PowerShell. Usar:

```powershell
Remove-Item -ErrorAction SilentlyContinue ordering-after-initial.png,ordering-after-drag.png,ordering-after-drop-outside.png,ordering-en-after.png,ordering-m2-after.png
```

(O moverlos a una carpeta temporal si el usuario quiere conservarlos.)

- [ ] **Step 14: Resumen de verificación**

Reportar al usuario qué se verificó y qué quedó pendiente (si reduced-motion no se pudo simular, mencionarlo). Si todo pasó, marcar la tarea como completa. Si algo falla, NO avanzar — investigar la causa raíz y corregir antes de cerrar.

---

## Acceptance criteria (resumen ejecutivo)

Para considerar el plan completo:

- ✅ Las 3 dependencias `@dnd-kit/*` están en `dependencies`.
- ✅ `npm run lint` pasa.
- ✅ `npm run build` pasa.
- ✅ El subtítulo del ejercicio dice "Arrastra para reordenar" (ES) / "Drag to reorder" (EN).
- ✅ Drag con mouse funciona y los items vecinos se desplazan con animación FLIP.
- ✅ Drag con teclado funciona (Tab → Space → flechas → Space).
- ✅ Drop fuera de la lista no rompe el orden.
- ✅ Después de "Comprobar", el drag está desactivado.
- ✅ "Reintentar" re-baraja con animación.
- ✅ Mismo comportamiento confirmado en al menos 2 módulos distintos.
- ✅ 4 commits limpios, uno por tarea.
