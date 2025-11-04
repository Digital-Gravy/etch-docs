---
title: Text Fields
sidebar_position: 2
---

# Text Fields

Text fields are the most common type of custom fields, allowing you to store and display various types of text data in your templates.

:::info 
For information about Etch native fields and WordPress meta fields, see the [Dynamic Data Keys](/dynamic-data/dynamic-data-keys) documentation.
:::

## General Usage

In Etch, third party text fields can be accessed using the appropriate syntax based on the custom fields plugin you're using.

```html
<!-- General syntax -->
{this.field_source.field_name}
```

## Plugin-Specific Usage

### Advanced Custom Fields (ACF)

ACF text fields can be accessed using the `acf` namespace:

```html
{this.acf.field_name}
```

### Meta Box

Meta Box text fields can be accessed using the `metabox` namespace:

```html
{this.metabox.field_name}
```

### Jet Engine

Jet Engine text fields can be accessed using the `jetengine` namespace:

```html
{this.jetengine.field_name}
```

## Examples

### Simple Text Field

```html
<h2>{this.acf.headline}</h2>
<p class="subheading">{this.acf.subheading}</p>
```

### Text Area Field

```html
<div class="description">
  {this.acf.description}
</div>
```

### WYSIWYG Field

```html
<div class="content">
  {this.acf.content}
</div>
```

## Tips

- Text fields can be used in conditional statements: `{#if this.acf.headline}{this.acf.headline}{#else}Default Headline{/if}`
- For fields that might contain HTML (like WYSIWYG fields), Etch will render that HTML.
