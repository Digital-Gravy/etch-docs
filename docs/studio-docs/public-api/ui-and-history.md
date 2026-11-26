---
title: UI & History
sidebar_position: 80
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-11
---

# UI & History

Two small namespaces control the builder chrome and the undo/redo stack.

## etch.ui

`EtchUiApi` controls the canvas color scheme and the visibility of the builder chrome (panels and toolbars).

```ts
interface EtchUiApi {
  // color scheme
  getColorScheme(): ColorScheme;
  setColorScheme(scheme: ColorScheme): void; // persisted locally
  toggleColorScheme(): void;                  // light <-> dark

  // interface visibility
  isInterfaceHidden(): boolean;
  setInterfaceHidden(hidden: boolean): void;
  toggleInterface(): void;
}

type ColorScheme = "light" | "dark";
```

```ts
// Force dark mode
etch.ui.setColorScheme("dark");

// Distraction-free: hide all chrome
if (!etch.ui.isInterfaceHidden()) etch.ui.toggleInterface();

```

## etch.history

`EtchHistoryApi` drives the same undo/redo stack as the keyboard shortcuts. It tracks changes to registered builder state, not every scripting mutation. Do not assume an immediately persisted content or asset change can be undone through this stack. Changes recorded close together can be grouped into one history step.

```ts
interface EtchHistoryApi {
  undo(): void;          // undo the last recorded history step
  redo(): void;          // redo the last undone history step
  canUndo(): boolean;
  canRedo(): boolean;
}
```

```ts
if (etch.history.canUndo()) etch.history.undo();
```
