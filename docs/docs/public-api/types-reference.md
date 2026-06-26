---
title: Types Reference
sidebar_position: 90
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-24
---

# Types Reference

This page collects the shared types referenced throughout the [Public API](./index.md) — the block JSON union, the common block shape, and HTML/Gutenberg helper types. For per-namespace types (styles, components, loops, fields), see each namespace page.

## Block JSON

Block JSON is a **discriminated union on `type`**. The authoring shape is `EtchBlockJson`; reads return `PublicBlockJson`, which adds identity (`id`, `parentId`) and, on styled blocks, a read-only `styles` array.

```ts
type EtchBlockType = `etch/${string}`;          // namespaced block type
type EtchBlockTypeName = EtchBlockJson["type"];  // the union of all discriminants
type EtchBlockJson = /* union of every block interface below */;
type PublicBlockJson = WithIdentity<EtchBlockJson>; // adds id, parentId, recursive children
```

### Common shape

Every block extends this base:

```ts
interface EtchBlockCommon {
  version: number;            // schema version
  context: EtchBlockContext;  // editor metadata
  script?: EtchBlockScript;   // optional inline script
  options?: EtchBlockOptions; // block-type-specific options
  children: EtchBlockJson[];  // child blocks
}

interface EtchBlockContext {
  name?: string;                          // structure-panel label
  structureState?: "open" | "closed";     // expanded/collapsed in the structure panel
  hidden?: boolean;                       // hidden on the canvas
}

interface EtchBlockScript {
  code: string; // see Block scripts in blocks.md for usage
}

interface EtchBlockOptions {
  [key: string]: unknown;
}
```

On `PublicBlockJson`, reads also expose:

- `id: string` — the block's id
- `parentId: string | null` — `null` at the document root
- `children: PublicBlockJson[]` — the same union, recursively
- `styles: readonly string[]` — on styled blocks (e.g. `etch/element`); **read-only**, set via [`etch.blocks.addClass()`](./blocks.md#text-naming-attributes-and-classes)

### Block variants

```ts
interface EtchTextBlockJson extends EtchBlockCommon {
  type: "etch/text";
  text: string;
}

interface EtchElementBlockJson extends EtchBlockCommon {
  type: "etch/element";
  tag: string;                  // HTML tag name (div, p, h1, …)
  attributes: EtchHtmlAttributes;
}

interface EtchDynamicElementBlockJson extends EtchBlockCommon {
  type: "etch/dynamic-element";
  attributes: EtchHtmlAttributes; // rendered tag read from attributes.tag
}

interface EtchDynamicImageBlockJson extends EtchBlockCommon {
  type: "etch/dynamic-image";
  attributes: EtchHtmlAttributes; // special: mediaId, useSrcSet, maximumSize
}

interface EtchSvgBlockJson extends EtchBlockCommon {
  type: "etch/svg";
  attributes: EtchHtmlAttributes; // special: src, stripColors
}

interface EtchLoopBlockJson extends EtchBlockCommon {
  type: "etch/loop";
  itemId: string;                       // variable name for the current item
  target?: string;                      // what to iterate over (dynamic path)
  indexId?: string;                     // variable name for the current index
  loopId?: string;                      // registered loop definition id
  loopParams?: Record<string, unknown>; // loop parameter values
}

interface EtchConditionBlockJson extends EtchBlockCommon {
  type: "etch/condition";
  conditionString: string;
}

interface EtchComponentBlockJson extends EtchBlockCommon {
  type: "etch/component";
  componentId: number;            // the component being instantiated
  attributes: EtchHtmlAttributes; // values bound to its properties
}

interface EtchSlotContentBlockJson extends EtchBlockCommon {
  type: "etch/slot-content";
  slotName: string;               // target slot
}

interface EtchSlotPlaceholderBlockJson extends EtchBlockCommon {
  type: "etch/slot-placeholder";
  slotName: string;
}

interface EtchPostContentBlockJson extends EtchBlockCommon {
  type: "etch/post-content";      // no extra fields
}

interface EtchRawHtmlBlockJson extends EtchBlockCommon {
  type: "etch/raw-html";
  content: string;                // sanitized HTML
  unsafe: string;                 // original, unsanitized HTML
}

interface EtchPassthroughBlockJson extends EtchBlockCommon {
  type: "etch/passthrough";
  gutenbergBlock: GutenbergBlock; // wrapped Gutenberg block
}
```

## HTML and Gutenberg types

```ts
type EtchHtmlAttributes = Record<string, string | undefined>;

interface GutenbergBlock {
  blockName: string;                  // e.g. "core/paragraph"
  innerBlocks: GutenbergBlock[];
  innerHTML: string;
  innerContent: (string | null)[];
  attrs: { [key: string]: unknown };
}
```

## Copy payload

`CopyObject` is the portable, JSON-serializable snapshot produced by [`etch.blocks.copy()`](./blocks.md#copy-paste) and consumed by [`etch.blocks.pasteAsync()`](./blocks.md#copy-paste). Treat it as an **opaque token** — hold it, store it, or pass it back to `pasteAsync()`. The bundled `styles` / `loops` / `components` / `customMediaDefinitions` are Etch-internal definitions that paste re-creates and re-maps to fresh ids, so don't depend on their shape.

```ts
interface CopyObject {
  type: "block";                                        // payload kind (currently always "block")
  version: number;                                      // schema version, from the block's features
  gutenbergBlock: GutenbergBlock;                       // the copied subtree in Gutenberg grammar
  styles?: { [styleId: string]: unknown };              // referenced global styles (opaque)
  loops?: { [loopId: string]: unknown };                // referenced loop definitions (opaque)
  components?: { [componentId: number]: unknown };      // referenced component definitions (opaque)
  customMediaDefinitions?: { [name: string]: unknown }; // referenced @custom-media rules (opaque)
  timestamp?: string;                                   // ISO 8601 time the copy was produced
}
```

:::warning
The `gutenbergBlock` shape is **not yet stable**. Before the stable release it will be replaced with an Etch-native block representation, so use it with caution — treat the `CopyObject` as an opaque token you round-trip through [`pasteAsync()`](./blocks.md#copy-paste) rather than reading or constructing `gutenbergBlock` by hand.
:::

## Errors

```ts
class EtchApiError extends Error {
  readonly code: EtchApiErrorCode;
  name: "EtchApiError";
  constructor(code: EtchApiErrorCode, message: string);
}

function isEtchApiError(value: unknown): value is EtchApiError;

type EtchApiErrorCode =
  | "BLOCK_NOT_FOUND"
  | "WRONG_BLOCK_TYPE"
  | "READONLY"
  | "INVALID_ARGUMENT"
  | "LOOP_NOT_FOUND"
  | "STYLE_NOT_FOUND"
  | "STYLESHEET_NOT_FOUND"
  | "COMPONENT_NOT_FOUND"
  | "POST_NOT_FOUND"
  | "OPERATION_FAILED"
  | "NOT_AVAILABLE"
  | (string & {});
```

See [Error handling](./index.md#error-handling) for usage.
