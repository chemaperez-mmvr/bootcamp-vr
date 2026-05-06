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

Elegimos `@dnd-kit/core` (^6), `@dnd-kit/sortable` (^8), `@dnd-kit/utilities` (^3) — ~18 KB gzipped (~75 KB minified) frente a:

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

- **`PointerSensor`** con `activationConstraint: { distance: 8 }`. El usuario debe mover 8 px antes de iniciar el drag. Esto cubre tanto mouse como touch (Pointer Events son unificados); evita que un scroll vertical en tablet se interprete como arrastre y permite que toques cortos no agarren nada.
- **`KeyboardSensor`** con `sortableKeyboardCoordinates` de `@dnd-kit/sortable`.

**Decisión deliberada: no usamos `TouchSensor`.** `PointerSensor` ya maneja eventos touch en navegadores modernos (incluido iPadOS Safari ≥13), y duplicar con `TouchSensor` introduce dos rutas de activación con reglas distintas (`delay`/`tolerance` vs `distance`) que pueden competir. Si en QA aparecen problemas específicos en iPadOS Safari, se reevalúa añadir `TouchSensor({ activationConstraint: { delay: 150, tolerance: 5 } })`.

### Estados visuales

| Estado | Estilo |
|---|---|
| Normal | Como hoy (border gris, hover violeta) + `cursor: grab` |
| Arrastrando (item agarrado) | `cursor: grabbing`, `shadow-lg`, `ring-2 ring-violet-300`, `z-10`, opacidad 100 % |
| Items desplazándose | Transición FLIP automática de `@dnd-kit` (~250 ms ease) — sin estilo extra |
| Después de "Comprobar" — correcto | Verde como hoy, drag desactivado |
| Después de "Comprobar" — incorrecto | Rojo como hoy, drag desactivado |

**Sin `scale-*` en el item agarrado.** `@dnd-kit` aplica `transform: translate3d(...)` como `style` inline (vía `CSS.Transform.toString(transform)`), y una utilidad Tailwind `scale-[1.02]` sobrescribe completamente esa cadena de transform porque ambas usan la propiedad `transform`. Para conservar la sensación de "elevado" sin chocar con el transform de dnd-kit, usamos solo `shadow-lg` + `ring-2` + `z-10`. Si en QA se quiere acentuar la elevación, se compone manualmente: `style={{ transform: CSS.Transform.toString({ ...transform, scaleX: 1.02, scaleY: 1.02 }) }}`.

El "estado seleccionado" violeta del tap-to-swap actual desaparece (ya no aplica).

### Elemento DOM del item

Cada `SortableItem` renderiza un `<button type="button">` (igual que hoy). Justificación: ya tenemos el focus ring (`focus-visible:ring-teal-500`), Enter/Space activación nativa, soporte de `disabled`. `@dnd-kit/sortable` está documentado como compatible con `<button>`: el `KeyboardSensor` controla la captura de Space cuando el item está enfocado y delega correctamente.

`disabled={checked}` reemplaza al `disabled` actual cuando ya se comprobó la respuesta. Mientras `!checked`, los items son draggables; al chequear, dnd-kit los desactiva vía `useSortable({ id, disabled: true })` (patrón documentado).

### Lógica que se conserva (sin cambios de comportamiento)

- Shuffle inicial de items (ver "SSR y shuffle" más abajo — el dónde cambia).
- `handleCheck`: compara `order` contra `correctPosition`, marca `wrongPositions`, fija `checked = true`.
- `handleReset`: reshuffle + `checked = false` + `wrongPositions = new Set()`.
- Botones "Comprobar" / "Reintentar" / "Continuar" y panel de resultado verde/rojo.
- Etiquetas de escala (start/end) arriba de la lista.
- `LearningBlockShell` con `tone="violet"` y los textos i18n actuales.

### SSR y shuffle inicial

El componente actual hace `useState(() => [...items].sort(() => Math.random() - 0.5))`, lo cual ejecuta `Math.random()` tanto en el render del servidor (SSR) como en la hidratación del cliente, produciendo órdenes distintos y un mismatch de hidratación cuando dnd-kit empieza a inyectar atributos `aria-*` y `style` que dependen de la posición.

**Patrón a usar:** inicializar `order` con el orden tal cual viene de `exercise.items` (determinista) y disparar el shuffle dentro de un `useEffect(() => { setOrder(prev => [...prev].sort(() => Math.random() - 0.5)); }, [])` que solo corre tras el mount. Lo mismo aplica al reshuffle de `handleReset` (que ya corre en cliente, sin cambios).

Esto evita el mismatch incluso si en el futuro se cambia el árbol de renderizado.

### Lógica que se elimina

- Estado `selectedIdx` y `setSelectedIdx`.
- Función `handleTap` y la rama "intercambio de posiciones" dentro de ella.
- Clase visual del estado seleccionado (`border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-300 shadow-md -translate-y-0.5`).

### Lógica nueva

- `handleDragEnd(event)` con la firma exacta:
  ```ts
  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    setOrder((prev) =>
      arrayMove(prev, prev.indexOf(active.id as string), prev.indexOf(over.id as string))
    );
  }
  ```
  El `if (!over || ...)` cubre el caso de soltar fuera de la lista (`over` es `null`) y el no-op de soltar sobre uno mismo. `arrayMove` recibe **índices**, no ids — por eso el `indexOf` previo.
- Cuando `checked === true`, cada `SortableItem` recibe `disabled: true` en su llamada a `useSortable({ id, disabled: checked })`. **No se vacían los sensores del `DndContext`**; usar `sensors={[]}` rompería la accesibilidad por teclado en el camino sin chequear.

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
- `prefers-reduced-motion`: **no se aplica automáticamente** en `@dnd-kit`. Hay que detectarlo manualmente y pasar `transition: null` al `useSortable` cuando el usuario lo prefiera. La app ya tiene el hook `usePrefersReducedMotion` (`app/components/usePrefersReducedMotion.ts`); reutilizarlo dentro de `SortableItem` y, si es `true`, sustituir el objeto `transition` retornado por `useSortable` por `null` antes de aplicarlo al estilo.

## Consideraciones técnicas

- **SSR:** `OrderingCard` ya es client-only (`"use client"` en línea 1). `@dnd-kit` no rompe nada server-side.
- **Bundle:** ~18 KB gzipped extra (~75 KB minified). Solo se carga en bundles que importen `OrderingCard`, que son los pasos de learning block — ya client-side.
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
