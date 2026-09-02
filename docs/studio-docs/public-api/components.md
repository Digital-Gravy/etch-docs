---
title: Components
sidebar_position: 40
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-11
---

# Components

`etch.components` (`EtchComponentsApi`) manages reusable component definitions and their configurable properties. To edit a component's internal block tree, see [component edit mode](./blocks.md#component-edit-mode).

:::info Persists immediately
`createAsync`, `updateAsync`, and `deleteAsync` **persist immediately** — you do **not** need `etch.saveAsync()` for them.
:::

## API

```ts
interface EtchComponentsApi {
  list(): PublicComponentSummary[];                       // all components (no block trees)
  getJson(componentId: number): PublicComponentJson;       // one component, with its block tree
  createAsync(name: string): Promise<number>;              // create empty; returns new numeric id
  updateAsync(componentId: number, patch: ComponentPatch): Promise<void>;
  deleteAsync(componentId: number): Promise<void>;
}
```

```ts
interface PublicComponentSummary {
  id: number;                     // numeric id
  name: string;                   // display name
  key: string;                    // PascalCase reference key, e.g. "Card"
  description?: string;
  properties: ComponentProperty[];
}

interface PublicComponentJson extends PublicComponentSummary {
  blocks: PublicBlockJson[];      // the component's block tree
}

interface ComponentPatch {
  name?: string;
  key?: string;                   // auto-converted to PascalCase
  description?: string;
  properties?: ComponentProperty[]; // replacement properties
  blocks?: EtchBlockJson[];         // replacement block tree
}
```

```ts
// List and inspect
const all = etch.components.list();
const card = all.find((c) => c.key === "Card");
const full = etch.components.getJson(card!.id);
console.log(full.blocks);

// Create and configure
const id = await etch.components.createAsync("Callout");
await etch.components.updateAsync(id, {
  description: "A highlighted callout box",
  properties: [
    { name: "Heading", key: "heading", type: { primitive: "string" }, default: "Note" },
  ],
});

// Delete
await etch.components.deleteAsync(id);
```

## Component properties

A component's `properties` are a discriminated union keyed by `type.primitive` (and an optional `type.specialized`). Every property shares this base:

```ts
interface ComponentPropertyBase {
  name: string;        // display name
  key: string;         // stable reference key
  description?: string;
}
```

The full union (`ComponentProperty = ComponentPropertyBase & (one of the below)`):

```ts
// string — text, with optional specializations
interface StringComponentProperty {
  type: {
    primitive: "string";
    specialized?: "color" | "url" | "image" | "select" | "array" | "wpMediaId";
  };
  default?: string;
  options?: string[];                    // allowed values when specialized is "select"
  selectOptionsString?: SelectOptionsString; // newline-separated "Label : Value"
}

// number — reserved; not yet implemented in the builder
interface NumberComponentProperty {
  type: { primitive: "number" };
  default?: number;
  options?: number[];
}

// boolean
interface BooleanComponentProperty {
  type: { primitive: "boolean" };
  default?: boolean | string; // string allows expression-driven defaults
}

// object
interface ObjectComponentProperty {
  type: { primitive: "object"; specialized?: string };
  default?: Record<string, unknown> | unknown[];
}

// array
interface ArrayComponentProperty {
  type: { primitive: "array"; specialized?: string };
  default?: unknown[];
}

// array specialized as "class" — a list of CSS class names
interface ClassComponentProperty {
  type: { primitive: "array"; specialized: "class" };
  default?: string[];
}

// object specialized as "group" — nested properties
interface GroupComponentProperty {
  type: { primitive: "object"; specialized: "group" };
  properties: ComponentProperty[];
}

// array specialized as "repeater" — nested properties, repeated per row
interface RepeaterComponentProperty {
  type: { primitive: "array"; specialized: "repeater" };
  properties: ComponentProperty[];
}

// string specialized as "condition" — a gated group shown when the condition is true
interface ConditionComponentProperty {
  type: { primitive: "string"; specialized: "condition" };
  properties: ComponentProperty[];
  default?: string; // the condition expression
}
```

### SelectOptionsString

For `select` properties, `selectOptionsString` is a newline-separated list of `Label : Value` entries:

```ts
type SelectOptionsString = string;
```

- Each line is `Label : Value`.
- A line with no ` : ` uses its text as both label and value.
- The first line is the default.

```ts
const colorProp = {
  name: "Color",
  key: "color",
  type: { primitive: "string", specialized: "select" },
  selectOptionsString: ["Red : #ff0000", "Green : #00ff00", "Blue : #0000ff"].join("\n"),
};
```
