---
title: Content
sidebar_position: 52
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-10-22
---

# Content

`etch.content` (`EtchContentApi`) models the project's content in the **Content Hub**: content types, the fields they declare, and the items of each type. For the author's side of the same model, see [Content Types](../content-types/README.md).

:::note Optional namespace
`etch.content` is optional: a runtime without the `content` capability omits it. Check before using it (contract `@digital-gravy/etch-public-api` 0.13.0):

```ts
if (etch.environment?.capabilities.content === true) {
  const content = etch.content!;
  // …
}
```
:::

## The model

- A **content type** ("Team member", "Recipe") declares the **fields** its items carry. Its `key` is the `postType` that [`navigation.listPostsAsync()`](./navigation.md) and [`etch.routes`](./routes.md) use.
- An **item** has a numeric `id`, the same id as a `PostSummary`, plus a title and field values.
- **Templates are items too**: items of a type created with `isTemplate: true`. A template type has no fields, and stays a template type for good.
- Items carry their title and field values here, **not their blocks**. To edit an item's layout, open it with `navigation.openPostAsync()` or `openTemplateAsync()` and use [`etch.blocks`](./blocks.md).

## API

```ts
interface EtchContentApi {
  // types
  listTypesAsync(): Promise<EtchContentType[]>;        // template types included, in creation order
  getTypeAsync(key: string): Promise<EtchContentType>;
  createTypeAsync(type: EtchContentTypeInput): Promise<EtchContentType>;
  updateTypeAsync(key: string, patch: EtchContentTypePatch): Promise<EtchContentType>;
  deleteTypeAsync(key: string): Promise<void>;         // the type and every item of it

  // fields
  addFieldAsync(typeKey: string, field: EtchContentFieldInput): Promise<EtchContentType>;
  updateFieldAsync(typeKey: string, fieldKey: string, patch: EtchContentFieldPatch): Promise<EtchContentType>;
  removeFieldAsync(typeKey: string, fieldKey: string): Promise<EtchContentType>;

  // items
  listItemsAsync(postType?: string): Promise<EtchContentItem[]>;
  getItemAsync(id: number): Promise<EtchContentItem>;
  createItemAsync(item: EtchContentItemInput): Promise<EtchContentItem>;
  updateItemAsync(id: number, patch: EtchContentItemPatch): Promise<EtchContentItem>;
  deleteItemAsync(id: number): Promise<void>;
}
```

Every write **persists immediately**; none of them wait for `etch.saveAsync()`.

## Types

```ts
interface EtchContentType {
  key: string;              // machine name, the postType of its items
  name: string;
  isTemplate: boolean;      // fixed at creation
  fields: EtchContentField[];
}

interface EtchContentTypeInput {
  name: string;
  key?: string;             // slugged from name when omitted
  isTemplate?: boolean;     // default false; a template type can't have fields
  fields?: EtchContentFieldInput[];
}

interface EtchContentTypePatch {
  name?: string;
  key?: string;             // its items follow
}

interface EtchContentItem {
  id: number;
  title: string;
  postType: string;
  slug?: string;            // canonical path without slashes, as the routes decide; absent when unserved
  fields: Record<string, unknown>;
}

interface EtchContentItemInput {
  postType: string;
  title: string;
  fields?: Record<string, unknown>;
}

interface EtchContentItemPatch {
  title?: string;
  fields?: Record<string, unknown>; // merged per key; null clears one
}
```

## Fields

```ts
type EtchContentFieldType =
  | "text" | "textarea" | "number" | "link" | "email" | "boolean" | "select"
  | "image"
  | "relationship" | "relationshipList" | "relationshipBacklink";

interface EtchContentField {
  key: string;              // lowercase letter first, then a-z 0-9 - _; unique per type
  name: string;             // display label
  type: EtchContentFieldType;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  min?: number;             // inclusive integer bounds of a number
  max?: number;
  options?: { label: string; value: string }[];  // select
  trueLabel?: string;       // boolean
  falseLabel?: string;
  showLabels?: boolean;
  target?: string;          // relation fields: key of the type they link to
  source?: { postType: string; fieldKey: string }; // backlinks: the field they mirror
}
```

What a field's value is:

| Type | Value |
| --- | --- |
| `text`, `textarea`, `link`, `email`, `select` | A string. |
| `number` | A number, within `min`/`max`. |
| `boolean` | `true` or `false`. |
| `image` | An asset id from [`etch.assets`](./assets.md). Available only when **Settings → Experimental → Image Content Field** is on. |
| `relationship` | One item id of the `target` type. |
| `relationshipList` | An ordered array of such ids. |
| `relationshipBacklink` | The other end of a relationship declared on another type: the items that link here. Written by Etch, read-only on items, and can't be added. |

Renaming a field with a new `key` keeps every item's value under the new key. Changing a relation field's `target`, or changing its `type` to something that isn't a relation, drops every item's links in that field.

## Example

```ts
const team = await etch.content.createTypeAsync({
  name: "Team member",
  fields: [
    { key: "role", name: "Role", type: "text", required: true },
    { key: "email", name: "Email", type: "email" },
  ],
});

const jo = await etch.content.createItemAsync({
  postType: team.key,
  title: "Jo",
  fields: { role: "Designer" },
});

await etch.content.updateItemAsync(jo.id, { fields: { role: "Lead designer" } });
```

Creating a non-template type also creates a matching [JavaScript data source](../data-sources/javascript.md) that queries its items, as the Content Hub does. The new item is unpublished until a [route](./routes.md) serves it or its type.

## Errors

| Code | When |
| --- | --- |
| `CONTENT_TYPE_NOT_FOUND` | No type has that key, or a relation field targets no type. |
| `FIELD_NOT_FOUND` | The type has no field with that key. |
| `POST_NOT_FOUND` | No item has that id. |
| `INVALID_ARGUMENT` | A malformed key, a name or key another type has, fields on a template type, a field type that isn't available, a relation to a template type, deleting the `page` type, changing an item's `postType`, or a value its field refuses (required, number bounds, email, link, image, or a link to an item of the wrong type). |
| `READONLY` | Writing a backlink's value, or changing a backlink other than its `key` and `name`. |

See [Error handling](./index.md#error-handling).
