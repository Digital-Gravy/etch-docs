---
title: Assets
sidebar_position: 50
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-11-05
---

# Assets

`etch.assets` manages WordPress media and the collections shown in the Asset Manager. An asset's `id` is its WordPress attachment ID; use it as the `mediaId` of an `etch/dynamic-image` block. Changes persist immediately and do not require `etch.saveAsync()`.

:::note Availability
The operations below are available in current EtchWP development builds. Older runtimes may not expose them. Check the relevant capability and the optional namespace before calling an operation; namespace presence alone does not promise the full asset API.
:::

## Feature detection

The `assets` capability promises the full asset contract, including features not currently supported by EtchWP. The granular flags promise only the subsets below; they can coexist with `wpMedia` and do not imply `assets`. A missing flag means unavailable. A capability indicates support, not permission or a guarantee that a request succeeds.

| Capability | Supported operations |
| --- | --- |
| `assetsRead` | `listAsync`, `getAsync` |
| `assetsUpload` | `uploadAsync` without the `compress` option |
| `assetsDownload` | `downloadAsync` |
| `assetsUpdate` | `updateAsync` for `alt` and `collectionIds`, not `fileName` |
| `assetsDelete` | `deleteAsync` |
| `assetsCollections` | List, create, update and delete collections |
| `assetsCompressInPlace` | `compressAsync` with `keepOriginal` omitted or `false` |

Current EtchWP development builds advertise these seven flags and `wpMedia`, not the full `assets` capability. For a script that also supports a runtime with the full contract, accept either the full capability or the relevant granular flag:

```ts
const capabilities = etch.environment?.capabilities;
const assets = etch.assets;
if (assets && (capabilities?.assets === true || capabilities?.assetsRead === true)) {
  const images = await assets.listAsync({ mimeType: "image/" });
}
```

## Reading and uploading

`listAsync` accepts optional `mimeType` and `collectionId` filters. A MIME filter can be a prefix such as `image/`; a collection filter includes nested collections. Results are ordered oldest first. `getAsync(id)` returns one asset.

```ts
const hero = await etch.assets!.uploadAsync({
  data: base64,
  fileName: "hero.jpg",
  alt: "Team on the roof",
});
```

For connector calls, file bytes are base64 without a `data:` prefix. Scripts running in the page may instead pass a `Blob`. `downloadAsync(id)` returns `{ fileName, mimeType, data }`, with `data` as base64. The asset's `url` is a WordPress attachment URL and `path` is its read-only attachment path.

The [connector upload and download commands](../etch-connector/cli-reference.md#upload) handle file encoding for you. WordPress permissions and upload restrictions still apply.

## Updating, compressing and deleting

```ts
await etch.assets!.updateAsync(hero.id, { alt: "Our team", collectionIds: [collectionId] });
const compressed = await etch.assets!.compressAsync(hero.id, { format: "webp", quality: 80 });
await etch.assets!.deleteAsync(compressed.id);
```

`updateAsync` replaces the supplied collection membership; `[]` removes all memberships and `alt: null` clears alt text. Omitted fields are unchanged. Filename updates are not supported.

`compressAsync` re-encodes a supported raster image in place, retaining its attachment ID. It accepts `format` (`webp`, `avif`, `jpeg`, or `png`), `quality` (a whole number from 0 to 100), and an optional resize. The filename and URL can change when the format changes; avoid relying on a hard-coded URL. `keepOriginal: true` is not supported. Upload-time compression is also unavailable: upload first, then compress in place if needed.

`replaceAsync` is not exposed by the current EtchWP implementation. Do not assume that methods or options outside an advertised subset are available.

## Collections

`listCollectionsAsync()`, `createCollectionAsync(name, parentId?)`, `updateCollectionAsync(id, patch)`, and `deleteCollectionAsync(id)` manage asset collections. The update patch accepts `name` and `parentId`; `parentId: null` moves a collection to the root. Collections may be nested up to two levels.

## Errors and retries

Missing assets or collections can produce `ASSET_NOT_FOUND` or `COLLECTION_NOT_FOUND`; invalid input can produce `INVALID_ARGUMENT`. Unsupported options such as upload-time compression, filename updates, or `keepOriginal: true` return `NOT_AVAILABLE`. WordPress and network failures can also be returned.

An upload may have succeeded even if its response was lost or the server returned an error. An upload can also succeed while a requested collection assignment fails. Check the asset library before retrying an uncertain upload to avoid duplicates.
