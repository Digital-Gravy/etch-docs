---
title: Data Sources
sidebar_position: 56
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-10-22
---

# Data Sources

`etch.dataSources` (`EtchDataSourcesApi`) defines the project's data sources, the same ones the **Data Manager** shows, and resolves them to their values. A source is defined once and read anywhere an expression goes, through `data('key')`. For the author's side, see [Data Sources](../data-sources/README.md).

:::note Optional namespace
`etch.dataSources` is optional: a runtime without the `dataSources` capability omits it. Check before using it (contract `@digital-gravy/etch-public-api` 0.11.0):

```ts
if (etch.environment?.capabilities.dataSources === true) {
  const sources = etch.dataSources!;
  // …
}
```
:::

## API

```ts
interface EtchDataSourcesApi {
  list(): EtchDataSource[];                            // every source in the project
  get(key: string): EtchDataSource;
  findDataSource(query: string): EtchDataSource[];     // fuzzy search by name or key, best first
  createAsync(source: EtchDataSource): Promise<EtchDataSource>;
  updateAsync(key: string, patch: EtchDataSourcePatch): Promise<EtchDataSource>;
  deleteAsync(key: string): Promise<void>;
  resolveAsync(key: string, ...args: unknown[]): Promise<unknown>; // what data('key', ...args) returns
}
```

**Reads are synchronous**: the project's sources are loaded before `window.etch` exists. **Writes persist immediately**; none of them wait for `etch.saveAsync()`. A write also drops any value already resolved from that source, so the canvas reads it again.

## Types

```ts
type EtchDataSourceType = "json" | "api" | "js" | (string & {});

interface EtchDataSource {
  key: string;      // the name data('key') uses; unique in the project
  name: string;     // display name in the Data Manager
  type: EtchDataSourceType;
  metadata: Record<string, unknown>; // configuration, depending on type
}

type EtchDataSourcePatch = Partial<EtchDataSource>;
```

Etch Studio serves the three built-in types. Each reads its own `metadata`, and a key the type doesn't know is refused:

| Type | `metadata` | Value |
| --- | --- | --- |
| [`json`](../data-sources/json.md) | `{ data: unknown }` | `data`, served as-is. |
| [`api`](../data-sources/api.md) | `{ url?: string; method?: string; headers?: [string, string][] }` | The response, parsed as JSON. A non-OK response fails the source. Without a `url` it resolves to `undefined`. |
| [`js`](../data-sources/javascript.md) | `{ code?: string }` | What the function body returns. It runs in a sandbox, gets the expression's arguments as `args`, and can call `queryContent()`. |

:::caution Headers are visible to the project
An `api` source's headers are stored with the project. Anyone who can open the project can read them, so don't put secrets there.
:::

## Example

```ts
await etch.dataSources.createAsync({
  key: "courses",
  name: "Courses",
  type: "js",
  metadata: {
    code: "return await queryContent({ type: 'course' });",
  },
});

const courses = await etch.dataSources.resolveAsync("courses");
```

Resolve a source **before** writing the property paths that read it (`data('courses')[0].title`, …). Don't guess its shape.

## Using a source in a loop

On a runtime with `dataSources`, an `etch/loop` block has no `loopId`. Its required `target` is any expression that yields a list:

```ts
etch.blocks.create(
  {
    type: "etch/loop",
    version: 1,
    context: {},
    children: [],
    target: "data('courses')",
    itemId: "course",
  },
  parentId
);
```

The target can also be a path into a source (`data('products').items`), nested data from an enclosing loop (`item.tags`), or a generated list (`range(1, 10)`).

## Keys and failures

- A source's `key` is part of every expression that reads it. Renaming it with `updateAsync(key, { key: "new" })` breaks those expressions until they're updated, and so does deleting it: they resolve to `undefined`.
- A source that fails (a request error, a throwing script) resolves to `undefined` instead of rejecting, which is also what the page renders. The Data Manager shows the reason.
- Each set of arguments is cached separately, so `resolveAsync("c", "yoga")` and `resolveAsync("c", "pilates")` each run once.

Creating a content type through [`etch.content`](./content.md) also creates a `js` source that queries its items.

## Errors

| Code | When |
| --- | --- |
| `DATA_SOURCE_NOT_FOUND` | No source has that key. |
| `INVALID_ARGUMENT` | A malformed source, a type this runtime doesn't serve, `metadata` its type can't read, or a key that's already taken. |

See [Error handling](./index.md#error-handling).
