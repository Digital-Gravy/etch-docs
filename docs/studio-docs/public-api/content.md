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
  | "relationship" | "relationshipList" | "relationshipBacklink"
  | "repeater";

interface EtchContentField {
  key: string;              // lowercase letter first, then letters, digits or underscores; unique per type
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
  fields?: EtchContentSubField[]; // repeaters: the sub-fields each item holds, in order
}

// A repeater row holds plain values, not relationships or nested repeaters.
type EtchContentSubFieldType =
  | "text" | "textarea" | "number" | "link" | "email" | "boolean" | "select" | "image";

type EtchContentSubField = Omit<EtchContentField, "type" | "target" | "source" | "fields"> & {
  type: EtchContentSubFieldType;
};

type EtchContentFieldInput = Omit<EtchContentField, "source" | "type"> & {
  type: Exclude<EtchContentFieldType, "relationshipBacklink">;
};

type EtchContentFieldPatch = Partial<EtchContentFieldInput>;
```

New field keys start with a lowercase letter and may then contain uppercase or lowercase letters, digits and underscores. Existing hyphenated keys remain readable, but new hyphenated keys are refused. Sub-field keys must be unique within their repeater and cannot contain hyphens. Content-type keys have separate rules.

Backlinks are returned as fields but cannot be added as input. Their values are read-only; their field definitions can only be renamed by changing `key` or `name`.

What a field's value is:

| Type | Value |
| --- | --- |
| `text`, `textarea`, `link`, `email` | A string. |
| `select` | A string; a nonblank value must match an option's value. |
| `number` | An integer, within `min`/`max`. |
| `boolean` | `true` or `false`. |
| `image` | An asset id from [`etch.assets`](./assets.md). |
| `relationship` | One item id of the `target` type. |
| `relationshipList` | An ordered array of such ids. |
| `relationshipBacklink` | The other end of a relationship declared on another type: the items that link here. Written by Etch, read-only on items, and can't be added. |
| `repeater` | An ordered array of items, each an object keyed by sub-field key and valued as that sub-field's type says. Writing it replaces every item. The same value validation applies inside each row. Settings → Experimental → Repeater Field controls the UI menu; the public API does not check that setting when adding a repeater. See [Repeater fields](../content-types/repeater-fields.md). |

Renaming a field with a new `key` keeps every item's value under the new key. A repeater's `fields` is replaced whole: change one sub-field's `key` in place, the list otherwise as it was, to rename it and keep its values; a sub-field left out is removed from every item. Rename and reshape in separate calls. Changing a relation field's `target`, or changing its `type` to something that isn't a relation, drops every item's links in that field.

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

If `createTypeAsync` fails while creating the data source, the content type may already exist. Check `listTypesAsync` before retrying; also check the data source before creating a replacement.

## Errors

| Code | When |
| --- | --- |
| `CONTENT_TYPE_NOT_FOUND` | No type has that key, or a relation field targets no type. |
| `FIELD_NOT_FOUND` | The type has no field with that key. |
| `POST_NOT_FOUND` | No item has that id. |
| `INVALID_ARGUMENT` | A malformed key, a name or key another type has, fields on a template type, a field type that isn't available, a relation to a template type, narrowing a `relationshipList` to `relationship` while an item has multiple links, deleting the `page` type, changing an item's `postType`, sub-fields on a field that isn't a repeater, or a value its field refuses (required, integer or number bounds, select option, email, link, image, a link to an item of the wrong type, a repeater item that fails its sub-fields' rules, or an item key no sub-field declares). |
| `READONLY` | Writing a backlink's value, removing a backlink directly, or changing a backlink other than its `key` and `name`. Remove the relationship it mirrors instead. |

See [Error handling](./index.md#error-handling).
