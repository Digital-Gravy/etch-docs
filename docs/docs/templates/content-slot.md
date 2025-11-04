---
title: Content Slot
sidebar_position: 100
---

# Content Slot

The Content Slot pulls Gutenberg-based content into Etch. It's used almost exclusively when creating templates. 

Instead of pulling Gutenberg's content into a template with a dynamic data tag like `{this.content}`, you should pull Gutenberg's content with the Content Slot `{@slot content}`.

When editing a template, you'll see the icon for the Content Slot in the Element Bar:

![Content Slot in Etch](img/etch-content-slot.webp)

Click that icon and Etch will insert a Content Slot for you automatically.

## Index Template

In your Index Template, the Content Slot usually goes inside of a `main` tag:

```html
<main>
    {@slot content}
</main>
```

## Blog Post Template

In your Blog Post Template, the Content Slot usually goes inside of a `article` tag:

```html
<article>
    {@slot content}
</article>
```

It's your job as a developer to determine where the content should be appropriately injected into any given template based on the structure of that template.