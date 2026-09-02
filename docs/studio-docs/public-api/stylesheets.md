---
title: Stylesheets
sidebar_position: 30
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-11
---

# Stylesheets

`etch.stylesheets` (`EtchStylesheetsApi`) manages global stylesheets and `@custom-media` definitions.

:::info Persists immediately
Every mutating method here is `*Async` and **persists immediately** — you do **not** need to call `etch.saveAsync()` for stylesheet changes.
:::

## Stylesheets

```ts
interface EtchStylesheetsApi {
  list(): StylesheetSummary[];                                  // all stylesheets
  get(stylesheetId: string): StylesheetSummary;                  // one by id
  createAsync(input: StylesheetInput): Promise<string>;          // create; returns new id
  updateAsync(stylesheetId: string, patch: StylesheetPatch): Promise<void>;
  appendAsync(stylesheetId: string, css: string): Promise<void>; // append CSS (a newline is inserted)
  deleteAsync(stylesheetId: string): Promise<void>;              // delete by id
}
```

```ts
interface StylesheetSummary {
  id: string;          // stable id
  name: string;        // display name
  css: string;         // full CSS contents
  type: StylesheetType;
}

interface StylesheetInput {
  name: string;        // display name
  css: string;         // initial CSS contents
  type?: StylesheetType; // defaults to "default"
}

interface StylesheetPatch {
  name?: string;
  css?: string;
  type?: StylesheetType;
}

type StylesheetType = "default" | "@custom-media";
```

```ts
// Create a stylesheet
const id = await etch.stylesheets.createAsync({
  name: "Utilities",
  css: ".u-hidden { display: none; }",
});

// Append to it (no save needed)
await etch.stylesheets.appendAsync(id, ".u-flex { display: flex; }");

// Rename / replace contents
await etch.stylesheets.updateAsync(id, { name: "Helpers" });

// Read back
const sheet = etch.stylesheets.get(id);
console.log(sheet.css);

// Delete
await etch.stylesheets.deleteAsync(id);
```

## Custom media

`@custom-media` definitions let you name reusable media queries.

```ts
interface EtchStylesheetsApi {
  listCustomMedia(): Record<string, string>;                  // all definitions, keyed by name
  addCustomMediaAsync(name: string, query: string): Promise<void>; // add or look up
}
```

```ts
await etch.stylesheets.addCustomMediaAsync("--md", "(min-width: 768px)");
etch.stylesheets.listCustomMedia(); // { "--md": "(min-width: 768px)", ... }
```
