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
  getPlaces(): NavigationPlace[];            // every area goTo accepts

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
  | "loop-manager"
  | "asset-manager";

interface PostSummary {
  id: number;
  title: string;
  slug: string;
  status: string;   // e.g. "publish", "draft"
  postType: string; // e.g. "page", "post", or a custom type
}

interface TemplateSummary {
  id: number;
  title: string;
  slug: string;
}
```

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
