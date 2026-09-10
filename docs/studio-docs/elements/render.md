---
title: Render
---

# The Render Element

The Render Element renders a block tree that only exists as data at render time. You point it at a dynamic expression, and whatever that expression resolves to is parsed as Etch JSON and rendered in its place.

The common case is content: a content record comes back from a query with its own blocks under `content`, so a template can render the page it queried.

## Adding the Render Element

Write it in the HTML panel:

```html
{@render post.content}
```

It shows up in the Structure panel as `{@render post.content}`, where the target can be edited inline. With the Render Element selected, the Properties panel also gives you a **Render Target** input.

:::info It's a tag, not an element
The Render Element isn't written as `<etch:render>`. It's a `{@render ...}` tag, the same shape as a slot placeholder.
:::

## The target

The target is an ordinary dynamic expression, so anything you can write elsewhere works here:

```html
{@render course.content}
{@render data('aboutPage').content}
{@render myJson($arg1: 2)}
```

What it resolves to has to be **Etch JSON**: a block, or an array of blocks, where each one has a `type` that starts with `etch/`. A JSON string of that shape works too, so a source that hands back serialized JSON doesn't need unpacking first.

:::note Etch JSON, not HTML
If your data is an HTML string (a rich text field, say) the Render Element is the wrong tool. Use the [HTML Element](html.mdx) instead.
:::

| | Takes | Use it for |
| --- | --- | --- |
| [HTML Element](html.mdx) | An HTML string | Rich text fields, markup from an API |
| Render Element | An Etch JSON block tree | Page and content records, blocks stored as data |

## The output isn't part of your page structure

The Render Element accepts no children of its own. Everything below it is parsed fresh from the resolved data on every render, which means it isn't part of the builder tree: you can't select, edit or style those blocks individually in the builder. The Render Element stands in for all of them.

To change what renders, edit the content it points at, where that content actually lives.

## When it can't render

If the target doesn't work out, the Render Element says so in place rather than failing silently. You'll see `Render failed:` followed by the reason:

- **Could not resolve target "..."** — the expression itself errored.
- **Target "..." resolved to undefined** (or `null`) — the expression is fine, but there's nothing there. Usually a typo in the path, or a query that returned nothing.
- **Target "..." did not resolve to valid Etch JSON** — something came back, but it isn't a block tree. This is what you get when you point a Render Element at an HTML string or a plain field value.

## Loop protection

A page whose content holds a Render Element pointing back at that same page would nest forever. Etch stops that in two ways, and both surface as a render failure instead of a hung canvas:

- A Render Element that resolves to content already being rendered around it stops there.
- Nesting more than **16** renders deep stops as well, which catches a cycle whose content differs at every level.

:::danger Rendering a page into itself
The most common way to hit this is pointing a template's Render Element at the same page the template is rendering. Query the content you actually want to render, and keep it distinct from the page doing the rendering.
:::

## Related

- [Querying content](../content-types/querying-content.md) — how to get content records, and what comes back on them
- [Data Sources](../data-sources/README.md) — using a resolved value in your markup
