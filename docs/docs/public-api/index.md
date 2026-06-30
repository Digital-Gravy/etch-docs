---
title: Introduction
sidebar_position: 0
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-11
---

# Public API

Etch exposes a typed scripting API on `window.etch` that lets your own scripts and plugins read and mutate the document the builder is editing — blocks, styles, loops, components, custom fields, and the builder UI itself. Every mutation routes through the same guarded paths as the UI, so undo/redo keeps working and nothing bypasses validation.

The contract is published as an MIT-licensed npm package that ships **types plus a thin accessor** — no heavy runtime is bundled. The runtime itself is provided by the Etch builder on the page.

```bash
npm install @digital-gravy/etch-public-api
```

:::warning Experimental surface
The current contract version is **`0.x`** — the surface is experimental and may change without a major version bump until it stabilizes. Prefer [feature detection](#feature-detection) over version comparison, and don't pin production plugins to `0.x`.
:::

## Acquiring the API

Two functions get you a typed handle on the API:

```ts
getEtch(options?: ConnectOptions): Etch
isEtchAvailable(): boolean
```

| Function            | Returns   | Notes                                                                                                     |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `isEtchAvailable()` | `boolean` | `true` when `window.etch` is present. Use it to guard code that should no-op outside the builder.         |
| `getEtch(options?)` | `Etch`    | Returns the typed API. **Throws** `EtchApiError` with code `NOT_AVAILABLE` when the builder isn't loaded. |

```ts
import { getEtch, isEtchAvailable } from "@digital-gravy/etch-public-api";

function run() {
  if (!isEtchAvailable()) return; // not running inside the Etch builder
  const etch = getEtch();
  const textIds = etch.blocks.find({ type: "etch/text" });
  etch.blocks.setText(textIds[0], "Hello world");
}
```

### Waiting for Etch to load

`window.etch` is injected by the builder during page load. If your script can run before the builder finishes initializing, poll for availability:

```ts
async function whenEtchReady(timeoutMs = 10_000) {
  const start = Date.now();
  while (!isEtchAvailable()) {
    if (Date.now() - start > timeoutMs) throw new Error("Etch did not load");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return getEtch();
}

const etch = await whenEtchReady();
```

### ConnectOptions

```ts
interface ConnectOptions {
  apiVersion?: string; // e.g. "^1.0" — reserved for the future 1.x runtime
  id?: string; // your plugin identifier, for telemetry
}
```

On today's `0.x` runtime, `getEtch()` returns the global directly after a best-effort version check (it **warns**, but does not throw, on a major-version mismatch). When a future stable runtime exposes a native `connect()`, version negotiation is delegated to it.

```ts
const etch = getEtch({ apiVersion: "^1.0", id: "my-plugin" });
```

## The `Etch` object

`getEtch()` returns the root `Etch` interface — eleven namespaces plus a few top-level members:

```ts
interface Etch {
  blocks: EtchBlocksApi;
  loops: EtchLoopsApi;
  styles: EtchStylesApi;
  stylesheets: EtchStylesheetsApi;
  components: EtchComponentsApi;
  navigation: EtchNavigationApi;
  fields: EtchFieldsApi;
  ui: EtchUiApi;
  history: EtchHistoryApi;
  skills: EtchSkillsApi;
  ai: EtchAiApi;

  saveAsync(): Promise<void>;
  connect?(options?: ConnectOptions): Etch; // reserved for the future stable runtime
  readonly apiVersion: string; // scripting contract version, e.g. "0.x"
  readonly version: string; // Etch product version
}
```

| Namespace                  | Page                                    | What it covers                                                       |
| -------------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| `etch.blocks`              | [Blocks](./blocks.md)                   | Select, read, create, mutate, and delete blocks; component edit mode |
| `etch.styles`              | [Styles](./styles.md)                   | CSS rules and `:root` custom properties (variables)                  |
| `etch.stylesheets`         | [Stylesheets](./stylesheets.md)         | Global stylesheets and `@custom-media` definitions                   |
| `etch.components`          | [Components](./components.md)           | Reusable component definitions and their properties                  |
| `etch.loops`               | [Loops](./loops.md)                     | Loop definitions (WP queries, JSON) and block binding                |
| `etch.navigation`          | [Navigation](./navigation.md)           | Move around the builder UI; switch posts/templates                   |
| `etch.fields`              | [Custom Fields](./fields.md)            | Custom field groups and per-post values                              |
| `etch.ui` / `etch.history` | [UI & History](./ui-and-history.md)     | Color scheme, chrome visibility, undo/redo                           |
| `etch.skills`              | [Skills](./skills.md)                   | Bundled, read-only authoring guides (e.g. ACSS conventions)          |
| `etch.ai`                  | [AI Presence](./ai.md)                  | Advertise an external agent's presence and phase to the builder      |
| —                          | [Types Reference](./types-reference.md) | Block JSON union, shared types, errors                               |

## Saving and the persistence model

How a change reaches the database depends on which namespace it lives in:

- **`blocks`, `styles`, `loops`** — buffered in the editor. They are persisted when you call `etch.saveAsync()` (the same save the UI performs).
- **`stylesheets`, `components`, `fields`** — every mutating method is `*Async` and **persists immediately**; you do not need `saveAsync()` for them.

```ts
etch.blocks.setText(id, "Hello world");
etch.blocks.addClass(id, "lead");
await etch.saveAsync(); // persists the block changes above
```

## Error handling

Every API error is an `EtchApiError` carrying a machine-readable `code`. Use the `isEtchApiError` type guard to narrow caught values:

```ts
import { isEtchApiError } from "@digital-gravy/etch-public-api";

try {
  etch.blocks.getJson("does-not-exist");
} catch (err) {
  if (isEtchApiError(err)) {
    console.warn(err.code, err.message); // e.g. "BLOCK_NOT_FOUND"
  }
}
```

```ts
class EtchApiError extends Error {
  readonly code: EtchApiErrorCode;
  name: "EtchApiError";
  constructor(code: EtchApiErrorCode, message: string);
}

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
  | (string & {}); // open-ended for forward compatibility
```

## Feature detection

Because the surface is experimental, guard against methods that may not exist on the runtime you're running against, rather than comparing version strings:

```ts
const etch = getEtch();
if (typeof etch.blocks.someNewMethod === "function") {
  // safe to use
}
```

## Module exports

```ts
// Runtime
export { getEtch, isEtchAvailable } from "@digital-gravy/etch-public-api";
export { EtchApiError, isEtchApiError } from "@digital-gravy/etch-public-api";
export { ETCH_API_VERSION } from "@digital-gravy/etch-public-api"; // "0.x"

// Types (all contract interfaces, unions, and the Etch root)
export type {
  Etch,
  ConnectOptions,
  EtchApiErrorCode /* …and the rest */,
} from "@digital-gravy/etch-public-api";
```

| Export                      | Kind     | Description                                         |
| --------------------------- | -------- | --------------------------------------------------- |
| `getEtch`                   | function | Acquire the API from `window.etch`                  |
| `isEtchAvailable`           | function | Check whether the API is present                    |
| `isEtchApiError`            | function | Type guard for `EtchApiError`                       |
| `EtchApiError`              | class    | Typed error with a `code` property                  |
| `ETCH_API_VERSION`          | const    | `"0.x"` — the contract version this package targets |
| `Etch` + all contract types | type     | The root interface plus every namespace/type        |
