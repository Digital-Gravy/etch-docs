---
title: How Routing Works
sidebar_position: 10
---

# How Routing Works

Routes decide **which content is published, and at which URL**. They live in the
**Routes Manager**, and they are the only thing that gives content an address.
A page or a record that no route serves isn't published at all: it doesn't
appear on the deployed site or in `sitemap.xml`.

A route is one piece of a URL. `/team/john/` is two routes: `team`, and a route
beneath it that spells `john`. You build URLs by nesting routes, and the full
path is always read off the tree, so renaming `team` moves everything under it.

Each route has three things:

| Column       | What it does                                                                             |
| ------------ | ---------------------------------------------------------------------------------------- |
| **Name**     | The URL segment. Static text like `team`, or an expression like `{this.title.toSlug()}`. |
| **Content**  | What the route serves: a single page, individual records, or whole content types.        |
| **Template** | The template the served content is rendered through. Optional.                           |

## Kinds of route

The Routes Manager's toolbar starts a route in one of three ways. They differ
only in the name the route opens with, and **the name alone decides what kind of
route it is**.

### The site root

The `/` row at the top of the tree is your homepage. There is exactly one, and
every other route hangs beneath it. Assign it a page and that page is served at
the bare domain.

### Static route

A fixed name, like `team`, `about` or `getting-started`. Lowercase letters and
numbers, separated by `-` or `_`.

A static route serves **at most one** page. It can also serve nothing: then it
answers with a 404 and simply holds the routes nested under it. That's normal,
and it's how you get `/brands/vantara/` without a page at `/brands/`.

### Dynamic route

A name with curly braces, like `{this.title.toSlug()}`. A dynamic route produces
**one page per record** it serves: assign it the _Employee_ content type and
every employee gets a page.

The name is resolved once per record, with that record as `this`. It's the same
[dynamic data](../dynamic-data/dynamic-data-intro.md) engine the canvas uses,
so essentially any dynamic data template works in a route name: fields,
relationships, [modifiers](../dynamic-data/dynamic-data-modifiers/basic-modifiers.mdx)
and [expression functions](../dynamic-data/expression-functions.mdx), mixed
with plain text:

```text
{this.title.toSlug()}                     →  john
{this.fields.year}-{this.title.toSlug()}  →  2026-launch-party
{this.fields.brand.title.toSlug()}        →  northwind
```

A dynamic route can serve any mix of content: whole content types, or records
picked one by one.

:::tip Always slugify
`this.title` on its own gives you `John` or `Red Fox Motors`, with capitals and
spaces. Add `.toSlug()` so every URL comes out lowercase and URL-safe.
:::

### Group

A name in parentheses, like `(marketing)`. A group **adds nothing to the URL**
and serves nothing. It exists to give a set of routes a shared template without
inventing a path segment for them: `/(marketing)/pricing` is published at
`/pricing/`.

## Nested dynamic routes

Every expression in a path is resolved against **the record the deepest route
serves**. The routes above it don't pass records down; they are just more of
that one record's address.

Take this tree, where only the last route has content assigned:

```text
brands
└── {this.fields.brand.title.toSlug()}     no content
    └── {this.title.toSlug()}              serves: Cars
```

For the car _Breeze_, both expressions read the Breeze: `this.title` is `Breeze`, and
`this.fields.brand.title` follows its _brand_ relationship to `Northwind`. The page
lands at `/brands/northwind/breeze/`. The route that owns the content owns its whole
path.

That's also why a dynamic route with no content produces no pages of its own:
there's no record to spell its name with. If you want `/brands/northwind/` as a page
too, give a route at that level its own content. See
[Cars and Brands](cars-and-brands.md) for the full walkthrough.

A record whose expression resolves to nothing, for example an empty field, is
skipped: it has no address, so it isn't published.

## Templates

A template is a page from a **template type**, which you create under
**Templates** in the Content Hub. You design it in the builder like any page.
When a route renders content through it, `this` is the record being served:

```html
<h1>Meet {this.title}</h1>
```

While editing a template you can pick which record to preview it with, so you
see real data on the canvas.

A few rules:

- **Templates are inherited.** A route without a template uses the nearest one
  above it. The Routes Manager shows an inherited template dimmed, marked
  _Inherited_. Choose **Inherit from parent** to clear a route's own template.
- **Templates don't stack.** The nearest template wins, and only that one. For
  a shared header and footer, use a component inside each template.
- **Templates are never published themselves.** They can't be assigned as a
  route's content, and the content picker doesn't offer them.
- **No template means the record renders its own blocks**, as a plain page does.

To render the record's own blocks inside a template, add a
[Render element](../elements/render.md) and point it at `this.content`:

```html
<article>
  <h1>{this.title}</h1>
  {@render this.content}
</article>
```

Whatever you built on the record itself in the builder shows up there, wrapped
in the template around it.

## When two routes want the same URL

Routes can overlap, for example a static `team/careers` next to a dynamic
`team/{this.title.toSlug()}`. The build settles it:

- **The more specific route wins.** Static text beats an expression, and a
  longer fixed part beats a shorter one. `careers` always wins over a team
  member that happens to be called _Careers_.
- **Two records nothing can tell apart fail the deploy.** If two employees are
  both called _John_, both want `/team/john/`, and the deploy stops with an
  error naming both. Make the name more specific, for example
  `{this.title.toSlug()}-{this.fields.role.toSlug()}`.
- **URLs that differ only in case fail the deploy.** `/team/John/` and
  `/team/john/` are the same file on many systems and duplicate pages to
  search engines. Using `.toSlug()` avoids this.

A name that resolves to something no URL can hold, such as a `/`, also stops
the deploy with an error naming the record.

## Where a page is served

Every item in the Content Hub shows **Served under**: the routes that publish
it. A page served by a static route shows its exact path, like `/team/`. A
record served by a dynamic route currently shows the route's pattern, like
`/team/{this.title.toSlug()}`, rather than its resolved URL. _Nowhere yet_
means no route serves it.

## Published URLs

- Every page is published with a trailing slash: `/team/john/`. The bare form,
  `/team/john`, redirects to it.
- `sitemap.xml` lists every published URL.
- Routes, and new content they pick up, take effect **on the next deploy**.
  You don't need to revisit the Routes Manager when you add content: a new
  employee gets their page as soon as you deploy.

## `this.slug` and `this.isHomepage`

A record's `slug` is **read from the routes**, not typed in: it's the record's
path without the surrounding slashes, taken from the static routes that serve
it.

| Published at   | `slug`       | `isHomepage` |
| -------------- | ------------ | ------------ |
| `/`            | `''`         | `true`       |
| `/about/`      | `about`      | `false`      |
| `/docs/intro/` | `docs/intro` | `false`      |
| nowhere        | absent       | `false`      |

So `https://example.com/{this.slug}/` is always a page's real address. To move a
page, rename its route.

Because the routes decide `slug` and `isHomepage`, a route's name can't use
either of them. Use `{this.title.toSlug()}` or another field instead.

:::caution Known limitation
A record served **only** by a dynamic route has no `slug` yet. Link to it by
building the same expression the route uses, for example
`/team/{member.title.toSlug()}/`.
:::
