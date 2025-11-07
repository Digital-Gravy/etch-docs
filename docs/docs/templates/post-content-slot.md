---
title: Post Content Slot
sidebar_position: 100
last_update:
  date: 2025-11-07
---

# Post Content Slot

The **Post Content Slot** pulls Gutenberg-based content into Etch. It's used almost exclusively when creating templates.

Instead of pulling Gutenberg's content into a template with a dynamic data tag like `{this.content}`, you should pull Gutenberg's content with the Post Content Slot `{@post-content}`.

:::info
In older versions of Etch, the Post Content Slot was represented as `{@slot content}`.  
It has since been renamed to `{@post-content}` to better reflect its purpose and to prevent conflicts with the generic [`{@slot}`](/components/prop-slot) syntax used in components.  
This change also frees up the name `"content"` for use as a generic slot.

No user action is required, existing templates will continue to work without modification.
:::

When editing a template, you'll see the icon for the Post Content Slot in the Element Bar:

![Post Content Slot in Etch](img/etch-post-content-slot.webp)

Click that icon and Etch will insert a Post Content Slot for you automatically.

## Index Template

In your Index Template, the Post Content Slot usually goes inside of a `main` tag:

```html
<main>
    {@post-content}
</main>
```

## Blog Post Template

In your Blog Post Template, the Post Content Slot usually goes inside of a `article` tag:

```html
<article>
    {@post-content}
</article>
```

It's your job as a developer to determine where the content should be appropriately injected into any given template based on the structure of that template.
