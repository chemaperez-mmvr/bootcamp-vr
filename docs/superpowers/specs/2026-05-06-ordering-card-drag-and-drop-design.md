# OrderingCard: drag-and-drop con animaciones suaves

**Fecha:** 2026-05-06
**Componente afectado:** `app/components/steps/learning-block/OrderingCard.tsx`
**Alcance:** Aplica automáticamente a todos los módulos del bootcamp que usen ejercicios de tipo `ordering` (componente único, sin duplicación).

## Contexto

Hoy `OrderingCard` solo soporta **tap-to-swap**: el usuario toca un item para seleccionarlo y luego toca otro para intercambiar sus posiciones. El subtítulo en pantalla anuncia "Arrastra para reordenar, o toca para intercambiar posiciones", pero el drag-and-drop nunca fue implementado — el texto es engañoso.

Además, los reordenamientos son **instantáneos**: el array cambia en estado y React vuelve a renderizar sin transición visual. Para una app educativa que se va a usar en tablets de aula, esto se siente brusco y poco profesional.

## Objetivo

Implementar drag-and-drop real con animaciones suaves de reordenamiento. Eliminar el tap-to-swap; en su lugar, mantener un solo modelo mental ("agarra y arrastra") y delegar la accesibilidad al teclado.

## Decisiones de diseño

### 1. Librería: `@dnd-kit`

Elegimos `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities` (~30 KB minified) frente a:

- HTML5 native drag-and-drop (no funciona en touch sin polyfill — descartado para audiencia tablet).
- Implementación a mano con pointer events + FLIP (~150-250 LOC, riesgo alto de bugs sutiles en touch + teclado).

`@dnd-kit` cubre out-of-the-box: pointer (mouse + touch) y teclado, animaciones FLIP integradas, anuncios de screen reader, soporte de `prefers-reduced-motion`.

### 2. Solo drag + teclado (eliminar tap-to-swap)

El tap-to-swap se elimina. Razón: con drag real, "click sin arrastrar" se vuelve ambiguo. La accesibilidad por teclado de `@dnd-kit` (Space para agarrar, flechas para mover, Space para soltar, Esc para cancelar) cubre a usuarios sin capacidad de drag.

## Arquitectura del componente

### Estructura

```
<DndContext sensors={[PointerSensor, KeyboardSensor]} onDragEnd={handleDragEnd}>
  <SortableContext items={order} strategy={verticalListSortingStrategy}>
    {order.map(id => <SortableItem key={id} id={id} item={...} />)}
  </SortableContext>
</DndContext>
```

`SortableItem` es un sub-componente local que usa `useSortable({ id })` para obtener `attributes`, `listeners`, `setNodeRef`, `transform`, `transition`, `isDragging`. Aplica esos al elemento raíz para que `@dnd-kit` controle la posición.

### Sensores

- **`PointerSensor`** con `activationConstraint: { distance: 8 }`. El usuario debe mover 8 px antes de iniciar el drag. Esto evita que un scroll vertical en tablet se interprete como arrastre y permite que toques cortos no agarren nada.
- **`KeyboardSensor`** con `sortableKeyboardCoordinates` de `@dnd-kit/sortable`.

### Estados visuales

| Estado | Estilo |
|---|---|
| Normal | Como hoy (border gris, hover violeta) + `cursor: grab` |
| Arrastrando (item agarrado) | `cursor: grabbing`, `shadow-lg`, `scale-[1.02]`, `ring-2 ring-violet-300`, `z-10` |
| Items desplazándose | Transición FLIP automática de `@dnd-kit` (~250 ms ease) — sin estilo extra |
| Después de "Comprobar" — correcto | Verde como hoy, drag desactivado |
| Después de "Comprobar" — incorrecto | Rojo como hoy, drag desactivado |

El "estado seleccionado" violeta del tap-to-swap actual desaparece (ya no aplica).

### Lógica que se conserva (sin cambios)

- Shuffle inicial de items (`useState(() => [...items].sort(() => Math.random() - 0.5))`).
- `handleCheck`: compara `order` contra `correctPosition`, marca `wrongPositions`, fija `checked = true`.
- `handleReset`: reshuffle + `checked = false` + `wrongPositions = new Set()`.
- Botones "Comprobar" / "Reintentar" / "Continuar" y panel de resultado verde/rojo.
- Etiquetas de escala (start/end) arriba de la lista.
- `LearningBlockShell` con `tone="violet"` y los textos i18n actuales.

### Lógica que se elimina

- Estado `selectedIdx` y `setSelectedIdx`.
- Función `handleTap` y la rama "intercambio de posiciones" dentro de ella.
- Clase visual del estado seleccionado (`border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-300 shadow-md -translate-y-0.5`).

### Lógica nueva

- `handleDragEnd(event)`: si `active.id !== over?.id`, reordena `order` usando `arrayMove` de `@dnd-kit/sortable`.
- Cuando `checked === true`, el `DndContext` se renderiza con sensores vacíos (o cada `SortableItem` con `disabled: true`) para impedir movimientos después del chequeo.

## Cambios fuera del componente

### Dependencias (`package.json`)

Añadir a `dependencies`:
- `@dnd-kit/core`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`

### Traducciones (`messages/{en,es}.json`, clave `learningBlocks.orderingInstruction`)

| Locale | Antes | Después |
|---|---|---|
| ES | "Arrastra para reordenar, o toca para intercambiar posiciones" | "Arrastra para reordenar" |
| EN | "Drag to reorder, or tap to swap positions" | "Drag to reorder" |

## Accesibilidad

- Navegación por teclado garantizada por `KeyboardSensor`. Tab para enfocar un item, Space para agarrarlo, flechas ↑/↓ para moverlo, Space para soltar, Esc para cancelar.
- `@dnd-kit` añade automáticamente un `aria-live` con anuncios de screen reader ("Picked up item X. Moved to position Y."). Se mantienen los textos por defecto en inglés inicialmente; si más adelante se quieren localizar, se pasa `accessibility.announcements` al `DndContext` con strings traducidos.
- `prefers-reduced-motion`: `@dnd-kit` lo respeta por default acortando la duración de la transición. Verificar manualmente en QA.

## Consideraciones técnicas

- **SSR:** `OrderingCard` ya es client-only (`"use client"` en línea 1). `@dnd-kit` no rompe nada server-side.
- **Bundle:** ~30 KB extra. Solo se carga en bundles que importen `OrderingCard`, que son los pasos de learning block — ya client-side.
- **Touch:** validado por `activationConstraint: { distance: 8 }`. Probar manualmente en una tablet o con DevTools en modo móvil para confirmar que el scroll vertical sigue funcionando dentro del card.
- **Hover-to-swap accidental:** ya no aplica, pues no hay tap-to-swap.

## Plan de verificación

Antes de declarar la tarea terminada:

1. `npm run build` y `npm run lint` sin errores.
2. Probar el ejercicio en M1, paso "Aprender → Tema 5" (`/es/bootcamp/module/getting-vr-ready`):
   - Drag con mouse: el item agarrado se eleva visualmente; los demás se desplazan suaves.
   - Soltar fuera de la lista no rompe el orden.
   - Click corto sin mover: no pasa nada.
   - Scroll vertical dentro del card en viewport pequeño: el scroll funciona, no se inicia drag.
   - Teclado: Tab → Space → flechas → Space mueve el item.
   - Comprobar: drag se desactiva, feedback verde/rojo aparece.
   - Reintentar: shuffle visible (los items se reordenan con animación).
3. Cambiar locale a EN: el subtítulo dice "Drag to reorder".
4. Verificar al menos otro módulo que use `ordering` para confirmar que el cambio aplica globalmente.

## Fuera de alcance

- Localizar los anuncios de screen reader de `@dnd-kit` (queda como mejora futura).
- Cambios visuales fuera del listado de items (header, botones, feedback panel).
- Cualquier modificación a otros tipos de learning block.
- Cambiar la lógica de scoring o la estructura de datos `OrderingExercise`.
