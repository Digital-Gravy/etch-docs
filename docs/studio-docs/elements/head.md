---
title: Head
---

# The Head Element

The Head Element is a ghost element in Etch (it outputs nothing where it sits) whose children are rendered into the document `<head>` instead: the canvas's head while you're editing, and the exported page's head when the site is built.

Anything that belongs up there goes in it — a `<title>`, a `<meta>`, a `<link>`, or a `<script>`.

## Adding the Head Element

Write it in the HTML panel, like any other markup:

```html
<etch:head>
  <meta name="robots" content="noindex" />
</etch:head>
```

Etch parses what you write into blocks, so the Head Element becomes part of the page structure like anything else. It shows up in the Structure panel as `<etch:head>`, and it's selectable and movable.

:::info The Head Element is not self-closing
It's a container, not a tag with attributes. Write it like `<etch:head>...</etch:head>` and put the tags you want in the head inside it.
:::

Where you place it in the page doesn't matter. Its children always end up in the head, and nothing renders in its place.

## What Etch already puts in the head

Every exported page gets a baseline head without you doing anything: the charset and viewport metas, the page's `<title>` and a matching `og:title`, and `og:type`. Your project's description, favicon and social image are added too, when they're set.

So the Head Element is for what's specific to a page, template or component — not for the basics.

## Overriding the page title

A document can only have one title, so a `<title>` inside a Head Element takes the place of the one Etch would have written from the page's name. `og:title` follows whichever of the two won, which keeps the browser tab and the social card in agreement.

```html
<etch:head>
  <title>{props.title}</title>
</etch:head>
```

## Using dynamic data

The children of a Head Element are ordinary elements, so dynamic data works inside them exactly like it does anywhere else. That's what makes the Head Element useful in templates and components: a per-page title, a canonical URL built from a slug, or a social image from a custom field.

```html
<etch:head>
  <title>{course.title}</title>
  <meta name="description" content={course.fields.summary} />
</etch:head>
```

## Loader scripts

Third-party embeds often ask for a loader script "in the `<head>`". The Head Element is where it goes. See [Embedding a form](../forms/embedding.md) for a worked example.

:::note
If a provider doesn't specifically ask for the head, leaving its script inline next to the thing it powers is fine.
:::
