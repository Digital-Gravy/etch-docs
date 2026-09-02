---
title: Styles
sidebar_position: 20
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-11
---

# Styles

`etch.styles` (`EtchStylesApi`) manages CSS rules (the classes, ids, and selectors you apply to blocks) and `:root` custom properties (variables). Changes are buffered and persisted with [`etch.saveAsync()`](./index.md#saving-and-the-persistence-model).

## CSS rules

```ts
interface EtchStylesApi {
  list(filter?: StyleListFilter): StyleSummary[];   // all styles, optionally filtered
  create(selector: string, css?: string): string;   // create a rule; returns its id
  update(styleId: string, patch: StylePatch): void;  // patch selector and/or css
  delete(styleId: string): void;                     // delete a rule by id
}
```

```ts
interface StyleSummary {
  id: string;                            // stable id — pass this to blocks.addClass etc.
  selector: string;                      // CSS selector, e.g. ".lead"
  type: StyleSelectorType | undefined;    // inferred selector type
  collection: string;                    // internal; always "default" for the public API
  css: string;                           // the CSS declarations
}

interface StyleListFilter {
  type?: StyleSelectorType; // filter by selector type
}

interface StylePatch {
  selector?: string; // new selector
  css?: string;       // new declarations
}

type StyleSelectorType = "class" | "id" | "tag" | "element" | "attribute" | "custom";
```

```ts
// Create a class rule
const styleId = etch.styles.create(".lead", "font-size: 1.25rem;");

// Find existing styles
const classStyles = etch.styles.list({ type: "class" });
const myStyle = etch.styles.list().find((s) => s.selector === ".lead");
console.log(myStyle?.id);

// Update / delete
etch.styles.update(styleId, { css: "font-size: 1.5rem; font-weight: 600;" });
etch.styles.delete(styleId);
```

## CSS variables

Read and write `:root` custom properties. Variable methods accept an optional `collection` argument for multi-collection `:root` setups; omit it to target the default collection.

```ts
interface EtchStylesApi {
  listVariables(collection?: string): Record<string, string>;
  getVariable(name: string, collection?: string): string | undefined;
  setVariable(name: string, value: string, collection?: string): void;
  removeVariable(name: string, collection?: string): void;
}
```

```ts
// Default collection
etch.styles.setVariable("--brand", "#0af");
etch.styles.getVariable("--brand");   // "#0af"
etch.styles.listVariables();          // { "--brand": "#0af", ... }
etch.styles.removeVariable("--brand");

// A named collection
etch.styles.setVariable("--brand", "#0af", "theme-a");
etch.styles.getVariable("--brand", "theme-a"); // "#0af"
etch.styles.listVariables("theme-a");
etch.styles.removeVariable("--brand", "theme-a");
```

:::tip
The `id` returned by `create()` (and present on each `StyleSummary`) is the value you pass to [`etch.blocks.addClass()`](./blocks.md#text-naming-attributes-and-classes) and related block methods.
:::
