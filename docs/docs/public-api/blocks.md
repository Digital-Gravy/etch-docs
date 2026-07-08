---
title: Blocks
sidebar_position: 10
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-24
---

# Blocks

`etch.blocks` (`EtchBlocksApi`) is the core of the scripting API: it selects, reads, creates, mutates, and deletes the blocks that make up the document. Mutations are buffered and persisted with [`etch.saveAsync()`](./index.md#saving-and-the-persistence-model).

## Reading and selection

```ts
interface EtchBlocksApi {
  select(blockId: string): void;            // select a block in the canvas
  deselect(): void;                         // clear the current selection
  getSelectedId(): string | null;           // id of the selected block, or null

  getJson(blockId: string): PublicBlockJson; // a block + its subtree, with id/parentId
  getTree(): PublicBlockJson[];              // the whole document as top-level blocks
  find(predicate: FindBlocksPredicate): string[]; // ids of matching blocks
}
```

### find()

```ts
interface FindBlocksPredicate {
  type?: string;      // exact type match, e.g. "etch/text"
  class?: string;     // has this CSS class
  attribute?: string; // has this HTML attribute set
}
```

```ts
const textIds = etch.blocks.find({ type: "etch/text" });
const buttons = etch.blocks.find({ class: "btn" });
const linked = etch.blocks.find({ attribute: "href" });
```

### Reading typed JSON

`getJson()` returns a [`PublicBlockJson`](./types-reference.md#block-json) — the discriminated union of all block shapes, plus `id` and `parentId`. Narrow on `type` to access type-specific fields:

```ts
const block = etch.blocks.getJson(id);

if (block.type === "etch/text") {
  console.log(block.text);            // narrowed to the text-block shape
} else if (block.type === "etch/element") {
  console.log(block.tag, block.attributes, block.styles); // styles is read-only
}
```

## Mutations

```ts
interface EtchBlocksApi {
  create(json: EtchBlockJson, parentId?: string | null, index?: number): string; // returns new id
  delete(blockId: string): void;                                          // remove block + subtree
  duplicate(blockId: string): string;                                     // deep-copy; returns new id
  move(blockId: string, newParentId: string | null, index?: number): void;
  replace(blockId: string, json: EtchBlockJson): string;                  // returns new id
  update(blockId: string, patch: BlockPatch): void;                       // patch in place

  copy(blockId: string): CopyObject;                                      // serialize a block + subtree
  pasteAsync(payload: CopyObject, targetId?: string | null, index?: number): Promise<string>; // insert a copy; returns new id
}
```

`create()`, `duplicate()`, `replace()`, and `pasteAsync()` all return the id of the resulting block. To target the document root, omit the parent id — or pass `null` (`parentId` on `create()`, `targetId` on `pasteAsync()`, `newParentId` on `move()`).

### create()

Authoring is type-checked against the [block JSON union](./types-reference.md#block-json). The `styles` array is **read-only** — it appears on reads but is rejected on authoring.

```ts
const id = etch.blocks.create({
  type: "etch/element",
  version: 1,
  context: {},
  children: [],
  tag: "div",
  attributes: { id: "main" },
});

// ✗ Type error — an etch/text block has no `tag`:
etch.blocks.create({ type: "etch/text", version: 1, context: {}, children: [], tag: "div" });
```

Creating a block under a parent that cannot contain it — a text block, a void element like `img`, or a text container handed a block-level child — throws `WRONG_BLOCK_TYPE`. The same rule applies to `move()` (the block is left in place) and to indexed `pasteAsync()`.

### update()

`update()` patches only the editable surface of a block:

```ts
interface BlockPatch {
  name?: string;                                  // structure-panel label
  hidden?: boolean;                               // hide or show on canvas
  attributes?: Record<string, string | undefined>; // merge attrs/props (undefined removes a key)
  text?: string;                                  // replace text (text blocks only)
}
```

```ts
etch.blocks.update(id, { name: "Hero heading", hidden: false });
```

The `attributes` patch works on HTML blocks (HTML attributes) and on component instances, whose attributes are their props — see [Component props](#component-props).

### copy() and pasteAsync() {#copy-paste}

`copy()` serializes a block and its subtree — together with the global styles, loops, and components it references — into a portable [`CopyObject`](./types-reference.md#copy-payload). `pasteAsync()` inserts one back, re-creating and re-mapping those styles/loops/components to fresh ids.

Unlike the builder's Cmd-C / Cmd-V shortcuts, these **never touch the system clipboard**, so they work in fully programmatic flows — no user gesture or clipboard permission required. The `CopyObject` is plain JSON: hold it, store it, or send it over the wire.

```ts
const payload = etch.blocks.copy(sourceId);          // a plain, serializable CopyObject

const newId = await etch.blocks.pasteAsync(payload);        // append to the document root
await etch.blocks.pasteAsync(payload, containerId);         // into a container (or after it)
await etch.blocks.pasteAsync(payload, containerId, 2);      // as the container's 3rd child
await etch.saveAsync();
```

**Placement** mirrors [`create()`](#create):

- **No `targetId`** (omitted or `null`) — appended to the document root, or inserted there at `index` when given.
- **`targetId` + `index`** — inserted as a child of the target at `index`. Throws `WRONG_BLOCK_TYPE` when the target can't contain the block: an explicit `index` is a deliberate "place it here as a child" request, so an impossible target is an error rather than a silent miss.
- **`targetId`, no `index`** — inserted into the target when it accepts children, otherwise immediately after it (handy for "paste near this block").

`index` is clamped to the valid range; a negative `index` counts from the end (`-1` appends).

:::tip
`copy()` produces the same payload the Cmd-C shortcut would put on the clipboard, so you can persist it and `pasteAsync()` it later — even on a different page; the bundled styles, loops, and components are re-created on paste.
:::

## Text, naming, attributes, and classes

```ts
interface EtchBlocksApi {
  // text & naming
  setText(blockId: string, text: string): void;   // text blocks only
  rename(blockId: string, name: string): void;     // structure-panel label

  // attributes (HTML attributes, or component props — see Component props below)
  getAttribute(blockId: string, key: string): string | undefined;
  setAttribute(blockId: string, key: string, value?: string): void; // undefined clears
  removeAttribute(blockId: string, key: string): void;

  // CSS classes
  addClass(blockId: string, className: string): void;
  removeClass(blockId: string, className: string): void;
  hasClass(blockId: string, className: string): boolean;
}
```

```ts
const [id] = etch.blocks.find({ type: "etch/text" });
etch.blocks.setText(id, "Hello world");
etch.blocks.addClass(id, "lead");
etch.blocks.setAttribute(id, "data-track", "hero");
await etch.saveAsync();
```

### Special element attributes

Some block types read behavior from specific attribute keys:

```ts
// etch/dynamic-image — bind to a media source
etch.blocks.setAttribute(imgBlockId, "mediaId", "{post.featured_image_id}");
etch.blocks.setAttribute(imgBlockId, "useSrcSet", "true");

// etch/svg — load and recolor an SVG
etch.blocks.setAttribute(svgBlockId, "src", "/icons/logo.svg");
etch.blocks.setAttribute(svgBlockId, "stripColors", "true");
```

## Block scripts

Any block can carry an optional `script` field. The code is enqueued in the document `<head>` as a deferred `type="module"` — the same way all JavaScript works in Etch. The script has no runtime link to the block's element, so you must always target it by selector.

```ts
interface EtchBlockScript {
  code: string;
}
```

```ts
const id = etch.blocks.create({
  type: "etch/element",
  version: 1,
  context: { name: "My Block" },
  options: {},
  children: [...],
  tag: "div",
  attributes: { class: "my-block" },
  script: {
    code: `document.querySelectorAll(".my-block").forEach(function (el) {
  // initialise each instance
});`,
  },
});
```


## Component props

A component **instance** (`etch/component`) exposes its bound props as block attributes. Set them with `setAttribute` / `update` and read them with `getAttribute` — the same methods you use for HTML attributes.

Unlike an HTML block's free-form attributes, a component's props are a **closed schema**: the key must be a property declared by the component definition. An unknown key throws `INVALID_ARGUMENT` (or `OPERATION_FAILED` if the component definition has not loaded yet).

```ts
const [cardId] = etch.blocks.find({ type: "etch/component" });

// Set a declared prop
etch.blocks.setAttribute(cardId, "title", "Hello world");
etch.blocks.getAttribute(cardId, "title"); // "Hello world"

// Patch several props at once
etch.blocks.update(cardId, { attributes: { title: "Hi", variant: "primary" } });

// An undeclared key is rejected
etch.blocks.setAttribute(cardId, "notAProp", "x"); // throws INVALID_ARGUMENT
```

Values are stored as-is. For typed props such as classes or repeater/group data, pass the value in the component's internal format.

This sets props **without** entering [component edit mode](#component-edit-mode) — that's for editing the component's internal block tree, covered next.

## Component edit mode

To edit the internals of a `etch/component` block, enter component edit mode. The component's block tree then becomes accessible through the same `blocks` methods.

```ts
interface EtchBlocksApi {
  enterComponentEditMode(blockId: string): void;
  exitComponentEditMode(options?: { revert?: boolean }): void; // revert: discard changes
  isInComponentEditMode(): boolean;
  saveComponentEditModeAsync(): Promise<void>; // persist the component definition
}
```

```ts
const [compId] = etch.blocks.find({ type: "etch/component" });

etch.blocks.enterComponentEditMode(compId);

// Inspect or mutate the component's children
const tree = etch.blocks.getTree();
etch.blocks.setText(tree[0].children[0].id, "Updated label");

await etch.blocks.saveComponentEditModeAsync(); // persist the component definition
await etch.saveAsync();                          // persist the page
etch.blocks.exitComponentEditMode();
```

Discard changes instead of saving:

```ts
etch.blocks.exitComponentEditMode({ revert: true });
```

See the [Types Reference](./types-reference.md#block-json) for the full block JSON union and every block-specific field.
