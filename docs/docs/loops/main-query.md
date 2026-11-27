---
title: Main Query Loops
description: Use WordPress’s Main Query as a loop data source (archives, taxonomy, search, etc.)
sidebar_position: 5
---

# Main Query Loops

Etch’s **Main Query** loop type is designed for **archive-style templates**, where WordPress already has a “main query” that determines *which posts are being listed* (and how they’re paginated).

Instead of rebuilding that query from scratch (like a normal WP Query loop), a Main Query loop **inherits the current page’s query context** and then lets you optionally override parts of it.

## When to use Main Query

Use **Main Query** when you’re building templates that represent a listing page driven by WordPress routing:

- **Post type archives** (example: `Service Archive, Product Archive`)
- **Taxonomy archives** (example: `Category Taxonomy Archive`, `Product Category Taxonomy Archive`)
- **Search results** (`search`)

If you’re building a **static listing** that should be the same everywhere (ex: “Latest 3 posts” on the homepage), you usually want our regular **WP Query** loop instead.

## Why Main Query is useful

- **Matches what WordPress is already doing**: the loop “just works” on archives without you having to re-enter post type / taxonomy / search conditions manually.

:::note
Main Query loops are intended for **archive templates**. If you use it in a context where WordPress does not have an archive-like main query, results may be empty or surprising.
:::

## Creating a Main Query loop

Etch ships with a global preset named **Main Query**:

- **Loop name**: `Main Query`
- **Loop key**: `mainQuery`
- **Loop type**: `main-query`

You can use that preset as-is, or create your own Main Query loop preset if you want different defaults.

### Default arguments (built-in preset)

The built-in preset is designed to be easy to control via [Loop Arguments](/loops/loop-arguments):

- `posts_per_page` uses `$count ?? 10`
- `orderby` uses `$orderby ?? 'date'`
- `order` uses `$order ?? 'DESC'`
- `offset` uses `$offset ?? 0`

That means you can reuse the same loop and just pass different values per template or per component.

## WooCommerce shop pages

On the WooCommerce shop and product archives (category, tag, attribute, brand and product search pages), a Main Query loop lists the same products WooCommerce shows on the page:

- as many products per page as the shop shows (`loop_shop_per_page`)
- in the order picked in the sorting dropdown or set with `?orderby=` in the URL, including price, popularity and rating
- with the shop's price and attribute filters applied
- paged, so `/page/2/` lists the second page

To get this, use the built-in **Main Query** preset as shipped and pass no `$count`, `$orderby`, `$order` or `$offset`:

```html
{#loop mainQuery as product}
  <h2>{product.title}</h2>
{/loop}
```

The loop then reuses the products WooCommerce already loaded and runs no query of its own.

:::tip
To change how many products the shop shows, set the number in WooCommerce (for example with the `loop_shop_per_page` filter) and leave the preset as shipped. Sorting and filters keep working.
:::

### Setting your own count or order

A loop argument such as `mainQuery($count: 6)`, or a preset argument you edited (for example `$count ?? 6` or a fixed `12`), takes priority over WooCommerce. The loop then runs its own query from the page's query: it keeps the archive, the search, the page number and the sort orders WordPress supports, such as default, date and title. Sorting by price, popularity or rating falls back to date in the direction WooCommerce set, so `?orderby=price` lists the oldest products first. The price filter applies only to WooCommerce's own query, and so do attribute filters when WooCommerce filters through its product attributes lookup table.

Pagination links still count WooCommerce's pages. With fewer products per page than WooCommerce, the last products can't be reached, because pages past WooCommerce's last one return a 404. With more, the last pages are linked but empty.

Before Etch 1.8.4, the Main Query loop always ran its own query with the preset's arguments: it showed 10 products, newest first, ignored WooCommerce's products per page and sorting, and repeated the first page on `/page/2/`.

## Using a Main Query loop in markup

Basic usage:

```html
{#loop mainQuery as item}
  <h2>{item.title}</h2>
  <a href="{item.permalink.relative}">Read more</a>
{/loop}
```

Override how many items are shown:

```html
{#loop mainQuery($count: 3) as item}
  <h2>{item.title}</h2>
{/loop}
```

Override ordering (strings should be quoted):

```html
{#loop mainQuery($orderby: "title", $order: "ASC") as item}
  <h2>{item.title}</h2>
{/loop}
```

Show all posts (WordPress convention: `-1` means “no limit”):

```html
{#loop mainQuery($count: -1) as item}
  <h2>{item.title}</h2>
{/loop}
```

## Dynamic data keys (same as other loops)

Main Query loop items use the **same dynamic data system** as any other post loop in Etch.

- Use `{item.title}`, `{item.excerpt}`, `{item.image.url}`, `{item.author.displayName}`, etc.
- For the full list of available keys, see [Dynamic Data Keys](/dynamic-data/dynamic-data-keys).
- For an intro to how dynamic data works in general, see [Dynamic Data Intro](/dynamic-data/dynamic-data-intro).

## `item.main.*` (advanced passthrough)

Main Query loops also support an **escape hatch** for integrations: `item.main.*`.

- **What it is**: a passthrough object that can contain the **raw main query item data** (for example, if a third-party plugin attaches extra fields to posts during the main query).
- **Why it exists**: Etch’s standard loop item (`item.*`) is normalized into Etch’s dynamic data shape. `item.main.*` exists so you can access any **extra/unmapped fields** without Etch transforming them.

Example:

```html
{#loop mainQuery as item}
  <h2>{item.title}</h2>
  <!-- Advanced: access passthrough fields when present -->
  <pre>{item.main.some_special_field_from_third_party_plugin}</pre>
{/loop}
```

:::caution
`item.main.*` is meant for advanced cases and may vary depending on the active theme/plugins and what they attach to the main query results. Prefer `item.*` for normal template work.
:::

## See Also

- [Loops](/loops/basic-loops)
- [Loop Arguments](/loops/loop-arguments)
- [Nested Loops](/loops/nested-loops)
- [Dynamic Data Keys](/dynamic-data/dynamic-data-keys)
