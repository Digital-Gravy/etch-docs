---
title: 'Walkthrough: Cars and Brands'
sidebar_position: 30
---

# Walkthrough: Cars and Brands

This builds on [Team Pages](team-pages.md). We'll publish a page per car brand,
and under each brand a page per car model, grouped by the brand each car
belongs to:

```text
/brands/northwind/
/brands/northwind/breeze/
/brands/northwind/gale-sport/
/brands/vantara/
/brands/vantara/v4/
/brands/red-fox-motors/
/brands/red-fox-motors/arc/
```

The finished route tree:

```text
/                                              serves: Homepage
└── brands                                     no content
    ├── {this.title.toSlug()}                  serves: all Car Brands   template: Single Car Brand
    └── {this.fields.brand.title.toSlug()}     no content
        └── {this.title.toSlug()}              serves: all Cars         template: Single Car
```

## 1. The content

Two content types, linked by a relationship:

- **Car Brand**, with records _Northwind_, _Vantara_ and _Red Fox Motors_.
- **Car**, with records like _Breeze_, _Gale Sport_, _V4_ and _Arc_, and a
  **brand** relationship field pointing at a Car Brand. _Breeze_ links to _Northwind_,
  _V4_ to _Vantara_.

And two templates:

- **Single Car Brand**: `<h1>{this.title}</h1>` with a short intro to the brand
- **Single Car**: `<h1>{this.fields.brand.title} {this.title}</h1>`, for example _Northwind Breeze_

In the Single Car template, `this` is a car: `this.title` is the model name, and
`this.fields.brand.title` follows the relationship to the brand's title.

## 2. Brand pages

1. Add a **Static route** named `brands`. Leave its content empty.
2. Under it, add a **Dynamic route**, keep `{this.title.toSlug()}`, set its
   content to **All Car Brand** and its template to **Single Car Brand**.

Deploy. `/brands/northwind/`, `/brands/vantara/` and `/brands/red-fox-motors/` exist.
`/brands/` itself is a 404: a route with no content publishes no page, it only
holds the routes under it. Give it a page if you want a brand overview there.

## 3. Car pages

A car's URL needs its brand in it. Build that from the car's own data:

1. Under `brands`, add another **Dynamic route** and name it
   `{this.fields.brand.title.toSlug()}`. Leave its content and template empty.
2. Under that, add a **Dynamic route**, keep `{this.title.toSlug()}`, set its
   content to **All Car** and its template to **Single Car**.

Deploy, and every car appears under its own brand: `/brands/northwind/breeze/`,
`/brands/vantara/v4/`. Each car shows up only under its own brand.

### Why this works

The route that serves the content owns its whole path. For each car, Studio
spells every segment from `brands` down with **that car** as `this`:

```text
brands / {this.fields.brand.title.toSlug()} / {this.title.toSlug()}
brands / northwind                          / breeze
```

The middle route never needs brands of its own. It reads the brand through the
car's relationship field, which is why the cars group correctly without any
filtering.

Note that the two dynamic routes under `brands` are siblings, not parent and
child. The brand page route serves brands; the car routes spell the brand from
each car. Both land under `/brands/northwind/`, and neither depends on the other.

## 4. Add more brands and cars

Add a new Car Brand, or a new Car linked to a brand, and deploy. Its page
appears at the right URL, with no changes in the Routes Manager.
