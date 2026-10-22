---
title: Redirects & Error Pages
sidebar_position: 50
---

# Redirects & Error Pages

The second tab of the route panel answers two questions: **where visitors go
when a URL doesn't exist**, and **where they go when you've moved something**.

Select a route to set it for that route. Select the `/` row for the site-wide
version.

## The error page

Pick any page as the 404, under **404 Error page**. It is rendered through the
template of the route that sets it, like any other page, so it looks like the
rest of the site.

**Each route can set its own**, and a route that sets none inherits. The select
says which page that would be:

```text
Inherit — Error 404
```

### How the inheriting works

Not by walking the route tree — **by walking the URL**. The published site
serves the nearest error page *up the requested path*:

```text
/                 404 page: "Error 404"
└── docs          404 page: "Docs not found"
    └── guides    404 page: (inherit)
```

- `/docs/guides/missing` → _Docs not found_, from `/docs/`
- `/docs/missing` → _Docs not found_
- `/missing` → _Error 404_

So a documentation section can answer with a page that links to the docs index,
while the rest of the site keeps the general one.

On the root the choice reads **Host default** when you set nothing: there is
nothing above it to inherit from, and an unstyled 404 from the host is what a
visitor gets.

:::note Groups have no error page
A group like `(marketing)` adds nothing to the URL, so it owns no folder of its
own. Missing paths there are answered by the route it sits in, and the panel
says so instead of offering the control.
:::

## Redirecting a route

Switch **Redirect this route** on, give it a destination, and choose whether it
is permanent or temporary. **The redirect is only live once both are given** —
a destination on its own sends nobody anywhere.

| Type          | Status | Use it when                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| **Temporary** | 302    | The move might be undone. Browsers come back and ask again.    |
| **Permanent** | 301    | The move is final. Search engines move the ranking across.     |

Temporary is the default on purpose: browsers cache a permanent redirect, so a
301 pointed at the wrong place outlives the fix for anyone who already followed
it.

### What it does to the page

**The page is still published.** The redirect shadows it, which means switching
the redirect off brings the page straight back — no rebuild of anything, just
your next deploy. While the redirect is on, the page leaves `sitemap.xml`,
because an address that answers with a redirect should not be offered to search
engines.

**Routes below it are not redirected.** A redirect applies to the address of
that route. If you want a whole section to move, set it on each route, or point
the section's routes at their new content instead.

A **dynamic route** gets one redirect per record it publishes — all of them to
the same destination.

### What cannot be redirected

- **The site root**, because that would redirect the entire site, including
  anything it points at inside the site.
- **A group**, because it has no address of its own.

The panel explains both in place rather than offering a switch that cannot work.

### Destinations

A destination is a path or a full URL, written literally:

```text
/new-home/
https://example.com/somewhere-else/
```

Expressions are not supported here yet, so a dynamic route cannot redirect per
record.

:::caution Two things stop the deploy
A route redirected to **its own address** answers itself forever, so the build
refuses it rather than publishing a page nobody can reach.

A site can publish **2,000 redirects**. Past that the build stops, because the
host silently ignores the rest — a limit that fails loudly is better than one
that quietly drops half your rules.
:::

## When it takes effect

On the next deploy, like everything else in the Routes Manager.
