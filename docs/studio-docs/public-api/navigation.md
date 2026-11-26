---
title: Navigation
sidebar_position: 60
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-11
---

# Navigation

`etch.navigation` (`EtchNavigationApi`) moves around the builder UI and switches the post or template open on the canvas.

## API

```ts
interface EtchNavigationApi {
  // UI areas
  goTo(place: NavigationPlace): void;        // navigate to a builder area
  getCurrentPlace(): NavigationPlace;        // the current area
  getPlaces(): NavigationPlace[];            // areas available to the current viewer

  // post / template switching
  openPostAsync(postId: number): Promise<void>;
  openTemplateAsync(templateId: number): Promise<void>;

  // status
  getActivePostId(): number | null;          // post/template open now, or null
  isEditingTemplate(): boolean;

  // listing
  listPostsAsync(postType?: string): Promise<PostSummary[]>;
  listTemplatesAsync(): Promise<TemplateSummary[]>;
}

type NavigationPlace =
  | "builder"
  | "templates"
  | "content-hub"
  | "style-manager"
  | "data-manager"
  | "asset-manager"
  | "routes";

interface PostSummary {
  id: number;
  title: string;
  slug: string;
  status: string;   // always "publish" in Studio
  postType: string; // e.g. "page", "post", or a custom type
}

interface TemplateSummary {
  id: number;
  title: string;
  slug: string;
}
```

Studio returns `"publish"` for every post summary; it does not indicate whether a route serves the item. A post summary's `slug` is empty when no static route supplies one, which does not distinguish an unrouted item from one served dynamically. Template summaries always have an empty `slug`.

In Studio, `goTo("templates")` opens the content hub. The `routes` place requires permission to manage routes: without it, `getPlaces()` omits it and `goTo("routes")` throws `NOT_AVAILABLE`.

## Examples

```ts
// Jump to the style manager and back
etch.navigation.goTo("style-manager");
console.log(etch.navigation.getCurrentPlace()); // "style-manager"
etch.navigation.goTo("builder");

// Open a different page on the canvas
const pages = await etch.navigation.listPostsAsync("page");
await etch.navigation.openPostAsync(pages[0].id);

// What's open right now?
console.log(etch.navigation.getActivePostId());
console.log(etch.navigation.isEditingTemplate());
```
