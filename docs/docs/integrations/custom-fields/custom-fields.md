---
title: Custom Fields
sidebar_position: 1
last_update:
  date: 2025-10-19
---

# Custom Fields

Etch integrates seamlessly with third-party custom field solutions, allowing you to use custom field data in your templates and designs.

## Third-Party Integrations

Etch supports popular third-party custom field plugins to enhance your content management capabilities.

### Advanced Custom Fields (ACF)

Custom fields created with Advanced Custom Fields can be accessed with the `acf` namespace.

```html
<!-- In a template -->
{this.acf.field_id}

<!-- In a loop -->
{item.acf.field_id}
```

:::info
- Since **alpha-3**, the system has returned a full object by default for fields where users can configure the return format — including `Posts`, `Taxonomies`, `Users`, `Relationships`, and Links. This approach provided access to more comprehensive data.
- Since **alpha-8**, a [Feature Flag (`RETURN_ACF_DYNAMIC_DATA`)](../../feature-flags/index.md) has been introduced, allowing users to enable the return of data according to the ACF field’s configured return setting — for example, returning a *Post ID* instead of a *Post Object*.
:::

### JetEngine

Custom fields created with JetEngine can be accessed with the `jetengine` namespace.

```html
<!-- In a template -->
{this.jetengine.field_id}

<!-- In a loop -->
{item.jetengine.field_id}
```

### Meta Box

Custom fields created with Meta Box can be accessed with the `metabox` namespace.

```html
<!-- In a template -->
{this.metabox.field_id}

<!-- In a loop -->
{item.metabox.field_id}
```

:::info
For information about Etch native fields and WordPress meta fields, see the [Dynamic Data Keys](/dynamic-data/dynamic-data-keys) documentation.
:::

## Custom Field Types

- **[Text Fields](./text-fields.md)** - Working with text-based custom fields
- **[Image Fields](./image-fields.md)** - Working with image custom fields
- **[Gallery Fields](./gallery-fields.md)** - Working with multiple image galleries
- **[Repeater Fields](./repeater-fields.md)** - Working with repeatable field groups
- **[Relationship Fields](./relationship-fields.md)** - Working with connections between posts, pages, or custom post types
- **[ACF Flexible Content Loops](./flexible-content-fields.md)** - Creating dynamic layouts with ACF Flexible Content
- **[Options Pages](./options-pages.mdx)** - Global site settings accessible via the `options` key
