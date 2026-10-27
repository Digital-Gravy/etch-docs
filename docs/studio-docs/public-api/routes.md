---
title: Routes
sidebar_position: 54
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-10-27
---

# Routes

`etch.routes` (`EtchRoutesApi`) reads and edits the site's route tree: the same tree the **Routes Manager** shows, which decides which content is published and at which URL. For how routing works from the author's side, start with [How Routing Works](../routing/README.md).

:::note Optional namespace
`etch.routes` is optional: a runtime without the `routes` capability omits it. Check before using it (contract `@digital-gravy/etch-public-api` 0.12.0):

```ts
if (etch.environment?.capabilities.routes === true) {
  const routes = etch.routes!;
  // …
}
```
:::

## API

```ts
interface EtchRoutesApi {
  listAsync(): Promise<EtchRoute[]>;            // every route, the site root included
  getPathsAsync(): Promise<EtchRoutedPath[]>;   // every URL the tree resolves to
  createAsync(route: EtchRouteInput): Promise<EtchRoute>;
  updateAsync(routeId: string, patch: EtchRoutePatch): Promise<EtchRoute>;
  deleteAsync(routeId: string): Promise<void>;  // the route and everything beneath it
}
```

Every write **persists immediately**; none of them wait for `etch.saveAsync()`. An open Routes Manager shows the change.

## Segments

A route's URL is its ancestors' segments joined by `/`. What a segment is depends on how it's written:

| Segment | Kind | What it does |
| --- | --- | --- |
| `''` | `root` | The site root. There is exactly one; it can't be created or deleted. |
| `about` | `static` | Lowercase letters and digits joined by `-` or `_`. Serves at most one record. |
| `(marketing)` | `group` | Nests routes without adding to the URL. Serves nothing itself. |
| `{this.title.toSlug()}` | `dynamic` | Resolved once per record it serves, from that record's fields. Serves any mix of records, whole content types and data sources. |

A dynamic segment can use the full [dynamic data](../dynamic-data/dynamic-data-intro.md) syntax, except `this.slug` and `this.isHomepage`: the routes decide those.

## Types

```ts
type EtchRouteSegmentKind = "root" | "static" | "group" | "dynamic";

interface EtchRoute {
  id: string;                // opaque
  parentId?: string;         // absent only on the site root
  segment: string;
  kind: EtchRouteSegmentKind;
  source: EtchRouteSource;
  templateId?: number;       // absent: inherited from the nearest ancestor
}

interface EtchRouteSource {
  postIds: number[];         // records, as navigation.listPostsAsync() returns them
  postTypes: string[];       // content type keys (PostSummary.postType); dynamic routes only
  dataSources: string[];     // data source keys, as etch.dataSources lists them; dynamic routes only
}

interface EtchRouteInput {
  segment: string;
  parentId?: string;                  // defaults to the site root
  source?: Partial<EtchRouteSource>;  // defaults to serving nothing
  templateId?: number;
}

interface EtchRoutePatch {
  segment?: string;                   // renames the route; its subtree moves with it
  parentId?: string;                  // moves the route and its subtree
  source?: Partial<EtchRouteSource>;  // replaces what it serves, whole; a missing dataSources keeps the route's
  templateId?: number | null;         // null clears it, so the route inherits again
}

interface EtchRoutedPath {
  routeId: string;
  postId?: number;           // absent for a static route that only holds its path, and for a data source's page
  title?: string;            // for a data source's page: its name and position, like "Products #3"
  path: string;              // the URL path, or the route as written when invalid
  status: "published" | "shadowed" | "conflict" | "invalid";
  reason?: string;           // why it is not published
}
```

Records are what [`navigation.listPostsAsync()`](./navigation.md) lists, so the fields keep the `post` names. Templates are records of a template content type ([`navigation.listTemplatesAsync()`](./navigation.md)).

## Creating routes

```ts
const team = await etch.routes.createAsync({ segment: "team" });

await etch.routes.createAsync({
  segment: "{this.title.toSlug()}",
  parentId: team.id,
  source: { postTypes: ["employee"] },
  templateId: employeeTemplateId,
});
```

A new route goes under the site root unless you pass `parentId`. Moving a route with `updateAsync(id, { parentId })` places it after its new siblings.

A route renders the records it serves through its template, or through the nearest ancestor's when it has none. Pass `templateId: null` to go back to inheriting.

Replacing a dynamic route's `source` keeps any records the author excluded from it in the Routes Manager.

## Serving a data source

A dynamic route can serve [data sources](../data-sources/README.md) by key. A source that returns an array gets a page per element; anything else gets one page. The template reads that value as `this`, so the segment does too:

```ts
await etch.routes.createAsync({
  segment: "{this.sku}",
  parentId: shop.id,
  source: { dataSources: ["products"] },
  templateId: productTemplateId,
});
```

- A route serving a data source **needs a template**, its own or an inherited one. A value has no blocks of its own to render.
- A data source that fails to resolve **fails the build**, so an API outage doesn't unpublish its pages.
- In `updateAsync`, a `source` without `dataSources` **keeps the route's data sources**, so a script that only sets `postTypes` can't drop them. Pass `dataSources: []` to clear them.

## Checking where content lands

After a change, read `getPathsAsync()` to see what the build would publish. Each resolved URL has a status:

| Status | Meaning |
| --- | --- |
| `published` | The record is published at `path`. |
| `shadowed` | A more specific route takes this URL. |
| `conflict` | Two records want the same URL. |
| `invalid` | The segment can't be resolved for this record; `reason` says why. |

See [When two routes want the same URL](../routing/README.md#when-two-routes-want-the-same-url) for how the build settles conflicts.

## Errors

| Code | When |
| --- | --- |
| `ROUTE_NOT_FOUND` | No route has that id, or `parentId` names no route. |
| `INVALID_ARGUMENT` | A malformed segment, a source its kind forbids, a name a sibling already has, an unknown content type, an unknown data source key, a template that isn't a template record, a move into the route's own subtree, or deleting the site root. |
| `OPERATION_FAILED` | The route could not be written. |

See [Error handling](./index.md#error-handling).
