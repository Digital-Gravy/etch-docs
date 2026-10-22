---
title: SEO
sidebar_position: 40
---

# SEO

Select a route in the Routes Manager and a panel opens beside the tree. Its
**SEO** tab is where you say what the pages that route publishes tell search
engines and social networks: their title, their description, the language they
are in, and the image they share.

Select nothing, or select the `/` row, and the panel reads **Root settings**.
Those are your site-wide values.

## The fields

| Field                 | What it sets                                                        |
| --------------------- | ------------------------------------------------------------------- |
| **Title**             | The `<title>` and the matching `og:title`.                          |
| **Meta description**  | The `<meta name="description">` and `og:description`.               |
| **Canonical URL**     | Where the page should be considered canonical, when not its own address. |
| **Search visibility** | Whether search engines are told to leave these pages out.           |
| **Language**          | The `<html lang>` every page below carries.                         |
| **Social image**      | The `og:image` shared when a page is linked.                        |
| **Favicon**           | The site's icon. Root settings only — a site has exactly one.       |

Under the title and description, a **search preview** shows roughly how the page
reads in results, using a real page the route publishes.

## Inheritance

This is the part worth reading twice.

**Title, description, language and social image are inherited.** A route that
leaves one empty uses the nearest route above it that sets one, and the root is
every route's ancestor — so Root settings are the site default, not a fallback
bolted on behind them.

The field shows what it would inherit as its placeholder, with the route it
comes from named underneath: _Inherited from /blog/_. Type to override it for
that route and everything below. Empty it again to go back to inheriting.

```text
/                 title: "Acme"              →  pages say "Acme"
└── blog          title: "Blog | Acme"       →  pages under /blog/ say "Blog | Acme"
    └── {slug}    title: (empty)             →  inherits "Blog | Acme"
```

**The canonical URL is not inherited, deliberately.** It is an address, and one
handed down would point every page below at the same place — which tells search
engines those pages are duplicates of one page. Each route states its own, or
leaves it **Automatic**, which means "this page is canonical at its own
address". That is what every page does until you say otherwise.

**The favicon lives on the root only.** A site has one icon. A section that
needs its own can write a `<link rel="icon">` in a
[Head Element](../elements/head.md).

## Expressions

Title, description and canonical URL accept the same
[dynamic data](../dynamic-data/dynamic-data-intro.md) you use anywhere else, and
they are resolved **once per record**, with that record as `this`:

```text
{this.title} | Acme                     →  Breeze | Acme
{this.fields.summary}                   →  the record's own summary
```

Put `{this.title} | Acme` on the root and every page in the site gets its own
title in that shape, without setting a title per route.

## Search visibility

Three states: **Inherit**, **Index** and **Noindex**. Inherit takes the nearest
answer above; the root has nothing above it, so it is offered only Index and
Noindex.

Under the control, the panel says what the pages actually end up as — a route
set to _Inherit_ beneath a hidden one reads **noindex**, because that is what it
inherits.

- Hiding a route hides everything below it, until a route below says **Index**
  again.
- A hidden page gets `<meta name="robots" content="noindex">` and **leaves
  `sitemap.xml`**.
- Hiding the whole site is done on the root, and the panel warns you when it is.

:::note Noindex is not a lock
`robots.txt` still allows the page to be fetched; it asks search engines not to
list it. Do not use it to hide something private.
:::

## What you write by hand wins

If a page, template or component writes a tag itself in a
[Head Element](../elements/head.md), that tag stays and the route's value is not
added. A `<title>` you render wins over the route's title, and `og:title`
follows whichever won, so the browser tab and the social card agree.

Everything you do not write by hand is filled in from the route.

## When it takes effect

On the next deploy. The fields are stored as soon as you leave them, and the
published site changes when you publish.
