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

`EtchUiApi` controls the canvas color scheme, the visibility of the builder chrome (panels and toolbars), and exiting the builder.

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

`EtchHistoryApi` drives the same undo/redo stack as the keyboard shortcuts. Because every scripting mutation routes through the guarded UI paths, your changes participate in undo/redo automatically.

```ts
interface EtchHistoryApi {
  undo(): void;          // undo the last builder mutation
  redo(): void;          // redo the last undone mutation
  canUndo(): boolean;
  canRedo(): boolean;
}
```

```ts
etch.blocks.setText(id, "Draft");
if (etch.history.canUndo()) etch.history.undo(); // reverts the setText above
```
