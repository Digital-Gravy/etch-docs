---
title: "Walkthrough: Team Pages"
sidebar_position: 20
---

# Walkthrough: Team Pages

We'll build a team section from scratch: an overview at `/team/`, and a page
for every team member at `/team/<name>/` that appears on its own whenever a new
member is added.

The finished route tree:

```text
/                            serves: Homepage
└── team                     serves: Team page
    └── {this.title.toSlug()}   serves: all Employees   template: Single Employee
```

## 1. Create the content

1. In the Content Hub, create a content type called **Employee** and add a few
   records: _Maya_, _Oliver_, _David_, _Sam_.
2. Under **Templates**, create a template type, for example **Team Templates**,
   and add a template called **Single Employee**.
3. Create a regular page called **Team**. This will be the overview.

None of this is published yet. Deploy now and you get the homepage and nothing
else; `sitemap.xml` lists only `/`.

## 2. Build the overview page

Open **Team** in the builder. Add a heading, then a [Loop](../elements/loop.md),
choose the _Employee_ content type as its data, and put a paragraph inside it:

```html
<p>{item.title}</p>
```

## 3. Build the template

Open **Single Employee** in the builder and add a heading. Here `this` is the
employee being rendered:

```html
<h1>Meet {this.title}</h1>
```

Use the preview picker to choose which employee the canvas shows. Pick _Maya_
and the heading reads _Meet Maya_.

## 4. Add a static route for the overview

In the Routes Manager:

1. Click **Static route** and name it `team`.
2. Set its content to the **Team** page.

Deploy. `/team/` now shows the overview. `/team/maya/` is still a 404, because
nothing serves it yet.

## 5. Add a dynamic route for the members

1. With `team` selected, click **Dynamic route** so it's nested under `team`.
   It opens named `{this.title.toSlug()}`, which is what we want: each
   member's title, lowercased and URL-safe.
2. Set its content to **All Employee**, the whole content type.
3. Set its template to **Single Employee**.

Deploy, then check `sitemap.xml`:

```text
/
/team/
/team/maya/
/team/oliver/
/team/david/
/team/sam/
```

Open `/team/maya/` and you see the Single Employee template with _Maya_ filled
in. One route gives you a page for every employee.

## 6. Add a new member

Add _Lena_ to the Employee content type and deploy. You don't need to open
the Routes Manager: `/team/lena/` exists, and the overview lists them too.

## Next

[Cars and Brands](cars-and-brands.md) nests dynamic routes and builds URLs from
relationship fields.
