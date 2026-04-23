---
title: Component Namespace
sidebar_position: 55
---

import VersionBadge from '@site/src/components/VersionBadge/VersionBadge';

<VersionBadge version="1.4.14" />

# Component Namespace

The `component` namespace gives you access to metadata about the component itself from within the component's HTML. This is useful when you need to reference the component's identity or its prop defaults without hardcoding values.

## Available Keys

| Key | Type | Description |
|---|---|---|
| `component.id` | Number | The component's ID. May be empty for unsaved components. |
| `component.name` | String | The component's display name (e.g., `"Blog Card"`). |
| `component.key` | String | The component's HTML key (e.g., `"BlogCard"`). |
| `component.defaults.<propKey>` | Varies | The resolved default value of a prop. |

## Accessing Prop Defaults

`component.defaults` exposes the **resolved default value** of every prop defined on the component. "Resolved" means the values go through the same transformation as regular props:

- **Class props** resolve from internal style IDs to class names (e.g., `hero` instead of a numeric ID).
- **Media props** resolve from attachment ID or URL.
- **Group props** resolve recursively, so nested defaults are accessible via dot notation.

## Usage

Use the `component` namespace in curly braces like any other dynamic data key:

```html
<div data-component="{component.key}">
  {props.heading}
</div>
```

### Displaying component identity

```html
<span class="component-label">{component.name}</span>
```

```html
<!-- Useful for data attributes, debugging, or styling hooks -->
<div data-component-id="{component.id}" data-component-key="{component.key}">
  ...
</div>
```

### Using defaults for comparison

A common pattern is checking whether an instance prop differs from the component's default. For example, highlighting a card when the user has set a custom title:

```html
{#if props.title !== component.defaults.title}
  <span class="custom-badge">Custom</span>
{/if}
<h2>{props.title}</h2>
```

### Accessing nested group defaults

If your component has a [Group prop](./props/prop-group) (e.g., `layout` with children `width` and `gap`), you can access each child's default with dot notation:

```html
<div style="max-width: {component.defaults.layout.width};">
  ...
</div>
```

### Accessing class prop defaults

If a prop is a [Class prop](./props/prop-class) with a default of `hero`, the default resolves to the class name - not the internal ID:

```html
<p>Default classes: {component.defaults.classes}</p>
<!-- Output: "Default classes: hero" -->
```

## Scope

The `component` namespace is **only available inside the component's own HTML**. It works everywhere the component renders — in the component editor, on the canvas, in Gutenberg, and on the frontend. However, it is not accessible from the outside: the page or template where you place a component instance cannot read its `component` namespace.

This follows the same scoping rules as `props`: component internals stay internal.

## Relationship to Other Namespaces

| Namespace | Scope | Purpose |
|---|---|---|
| `this` | Templates | Current post/page data |
| `item` | Loops | Current loop iteration data |
| `props` | Components | Instance prop values (what was passed in) |
| `component` | Components | Component metadata and prop defaults |
| `site` | Global | Site-wide information |
| `url` | Global | Current URL data |
| `environment` | Global | Rendering environment info |

:::tip
`props` gives you what the user **passed in** (or the default if nothing was passed). `component.defaults` always gives you the **original default**, regardless of what the instance received. Together, they let you detect overrides and build smarter conditional logic.
:::
