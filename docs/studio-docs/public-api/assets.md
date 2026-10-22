---
title: Assets
sidebar_position: 50
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-10-22
---

# Assets

`etch.assets` (`EtchAssetsApi`) manages the project's uploaded files — the same library the [Asset Manager](../interface/asset-manager.md) shows — and the collections that organize them. It lets a script or an AI agent upload, download, compress, rename, describe and organize assets without opening the Asset Manager.

An asset's numeric `id` is what an `etch/dynamic-image` block's `mediaId` attribute and an `image` content field take.

:::note Optional namespace
`etch.assets` is optional: a runtime without the `assets` capability omits it. Check before using it (contract `@digital-gravy/etch-public-api` 0.14.0):

```ts
if (etch.environment?.capabilities.assets === true) {
  const assets = etch.assets!;
  // …
}
```
:::

## API

```ts
interface EtchAssetsApi {
  // assets
  listAsync(filter?: EtchAssetListFilter): Promise<EtchAsset[]>;
  getAsync(id: number): Promise<EtchAsset>;
  uploadAsync(input: EtchAssetInput): Promise<EtchAsset>;
  updateAsync(id: number, patch: EtchAssetPatch): Promise<EtchAsset>;
  replaceAsync(id: number, replacement: EtchAssetReplacement): Promise<EtchAsset>;
  compressAsync(id: number, options?: EtchAssetCompressRequest): Promise<EtchAsset>;
  downloadAsync(id: number): Promise<EtchAssetFile>;
  deleteAsync(id: number): Promise<void>;

  // collections
  listCollectionsAsync(): Promise<EtchAssetCollection[]>;
  createCollectionAsync(name: string, parentId?: number): Promise<EtchAssetCollection>;
  updateCollectionAsync(id: number, patch: EtchAssetCollectionPatch): Promise<EtchAssetCollection>;
  deleteCollectionAsync(id: number): Promise<void>;
}
```

Every write **persists immediately** — none of them wait for `etch.saveAsync()`. An open Asset Manager shows the change without a reload.

## Bytes travel as base64

File contents cross the API as **base64 strings without a `data:` prefix**, because the [Etch Connector](../etch-connector/introduction.md) bridge carries JSON only. Scripts running in the page may pass a `Blob` to `uploadAsync` and `replaceAsync` instead. `downloadAsync` always returns base64.

When you work through the connector, you don't handle base64 yourself: the [`upload` and `download` commands](../etch-connector/cli-reference.md#upload) read and write files on disk.

## Types

```ts
interface EtchAsset {
  id: number;                  // what mediaId and image fields take
  fileName: string;
  path: string;                // always "/" today; read-only
  url: string;                 // bare "/assets/…" URL, the form that belongs in content
  mimeType: string;
  fileSize: number;            // bytes
  width?: number;              // raster images only
  height?: number;
  alt?: string;
  collectionIds: number[];
  responsiveWidths?: number[]; // widths of the generated responsive variants
  createdAt: string;
  updatedAt: string;
}

interface EtchAssetInput {
  data: string | Blob;         // base64 (no data: prefix), or a Blob in-page
  fileName: string;            // slugified on upload: "My Photo.JPG" → "my-photo.jpg"
  mimeType?: string;           // defaults to the Blob's type, else the extension's
  alt?: string;
  collectionIds?: number[];
  compress?: EtchAssetCompressOptions; // compress before storing
}

interface EtchAssetPatch {
  fileName?: string;           // slugified, as on upload
  alt?: string | null;         // null clears it
  collectionIds?: number[];    // replaces the asset's collections; [] removes it from all
}

interface EtchAssetReplacement {
  data: string | Blob;
  fileName?: string;           // defaults to the current name
  mimeType?: string;           // pass it (or a new fileName) when base64 bytes change format
}

interface EtchAssetCompressOptions {
  format?: "webp" | "avif" | "jpeg" | "png"; // default webp
  quality?: number;                          // whole number 0–100, higher is better; default 75
  resize?: EtchAssetResize;
}

type EtchAssetResize =
  | { type: "axis"; axis: "width" | "height"; pixels: number }
  | { type: "side"; side: "long" | "short"; pixels: number }
  | { type: "scale"; factor: number };       // at most 1

interface EtchAssetCompressRequest extends EtchAssetCompressOptions {
  keepOriginal?: boolean;      // upload the result as a new asset instead of replacing
}

interface EtchAssetFile {
  fileName: string;
  mimeType: string;
  data: string;                // base64, no data: prefix
}

interface EtchAssetCollection {
  id: number;
  name: string;
  parentId?: number;           // absent at the top level
  position: number;            // order among its siblings
}

interface EtchAssetListFilter {
  collectionId?: number;       // includes collections nested under it
  mimeType?: string;           // a type or a prefix, e.g. "image/"
}

interface EtchAssetCollectionPatch {
  name?: string;
  parentId?: number | null;    // null moves it to the top level
}
```

## Uploading

```ts
const hero = await etch.assets.uploadAsync({
  data: base64,
  fileName: "Hero.jpg",
  alt: "Our team on the roof",
  compress: {
    format: "webp",
    quality: 80,
    resize: { type: "axis", axis: "width", pixels: 2400 },
  },
});
// hero.fileName === "hero.webp" — bind it with mediaId: String(hero.id)
```

- Raster images (JPEG, PNG, WebP, AVIF) get **responsive variants** automatically, as in the Asset Manager.
- The **size limit is 24.9 MiB per stored file**. With `compress`, the limit applies to the compressed result, so a larger original can still go in.
- A name another asset already has is refused with `INVALID_ARGUMENT`.
- `mimeType` must be a single `type/subtype`.

## Compressing and resizing

`compressAsync` re-encodes a raster image in the tab, with the same encoder the Asset Manager uses. By default it **replaces the asset in place**: the `id` stays, so `mediaId` and `image` field bindings keep working — but the extension follows the new format (`hero.png` → `hero.webp`), so a hard-coded `/assets/…` URL does not.

With `keepOriginal: true` the result is uploaded as a new asset in the same collections, carrying the same alt text. When the format leaves the extension unchanged, the copy is named `hero-copy.webp`.

A resize **never enlarges**: `pixels` larger than the image leaves it at its size, and a `scale` factor above `1` is refused.

## Organizing

Users see **collections** as folders. An asset can belong to several, and a collection can nest under another.

```ts
const heroes = await etch.assets.createCollectionAsync("Heroes");
await etch.assets.updateAsync(hero.id, { collectionIds: [heroes.id] });

const inHeroes = await etch.assets.listAsync({ collectionId: heroes.id });
```

Deleting a collection keeps its assets and moves its sub-collections to the top level.

## Errors

| Code | When |
| --- | --- |
| `ASSET_NOT_FOUND` | No asset has that id. |
| `COLLECTION_NOT_FOUND` | No collection has that id, or the parent named doesn't exist. |
| `ASSET_IN_USE` | `deleteAsync` while an `image` content field holds the asset. |
| `INVALID_ARGUMENT` | Malformed base64, a file over the size limit, a taken name, an invalid `compress` option, compressing a file that isn't a raster image, or moving a collection into itself. |
| `OPERATION_FAILED` | The file could not be read or written, e.g. the network failed. |

See [Error handling](./index.md#error-handling).
