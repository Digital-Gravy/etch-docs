---
title: Creating Component Variations
sidebar_position: 60
---

# Creating Component Variations

Many component systems rely on "snapshot" variations — duplicated versions of a component for each visual or behavioral state. A "dark card" and a "light card" would be two separate component "variants," for example.

**This approach is fragile, hard to maintain, and scales poorly, which is why Etch doesn't use it.**

Etch handles variations of a component solely with props, conditional styles, and conditional logic. With this approach, you end up with one component that can handle many different scenarios.

## Why Props Beat Snapshots

With snapshot variations, every change to the base design needs to be applied to every duplicate. Add a new feature? Update every variation. Fix a bug? Fix it in every variation. The more variations you have, the more maintenance overhead you create.

With prop-driven variations, you have a single source of truth. Props control what's visible, how it's styled, and how it behaves. Update the component once and every variation updates with it.

| | Snapshot Variations | Prop-Driven Variations |
|---|---------------------|------------------------|
| **Maintenance** | Update every duplicate | Update once |
| **Consistency** | Prone to drift | Guaranteed consistency |
| **Scalability** | Each variation is a new component | One component handles all cases |
| **Flexibility** | Locked into predefined versions | Mix and match any combination |

## Showing and Hiding Elements

The most basic variation is controlling which elements are visible. Use a **Boolean** prop combined with **conditional logic** to show or hide parts of a component.

**Example: Section Intro with optional lede and CTA**

A section intro component might always show a heading, but the lede paragraph and call to action should be optional. Create two Boolean props:

- **Show Lede** — controls whether the lede paragraph is visible
- **Show CTA** — controls whether the call to action is visible

Wrap the lede in a conditional block:

```html
{#if props.showLede}
  <p>{props.lede}</p>
{/if}
```

Wrap the CTA the same way:

```html
{#if props.showCta}
  <a href="{props.ctaUrl}">{props.ctaText}</a>
{/if}
```

Now every instance of the component can independently toggle the lede and CTA on or off. No duplicate components needed.

## Choosing Between Options

When a variation isn't a simple on/off but a choice between multiple options, use a **Select** prop.

**Example: Card color theme**

A card component needs to support dark, light, and primary color themes. Create a Select prop called **Theme** with the options:

```
dark
light
primary
```

You can then use this prop to control styling in multiple ways (see below).

## Altering Styles with Inline Tokens

One way to apply variation styles is by passing prop values directly into the `style` attribute as CSS custom properties (tokens).

Using the card theme example, you could define color tokens per theme and pass them inline:

```html
style="--card-bg: {props.cardBg}; --card-color: {props.cardColor};"
```

The component's CSS references these tokens:

```css
.card {
  background: var(--card-bg);
  color: var(--card-color);
}
```

This approach is ideal when the variation is purely cosmetic and involves a small number of CSS values. Each instance can have completely custom colors without predefined options.

## Altering Styles with Data Attributes and CSS

For more complex style variations — where multiple CSS properties change together — use a **data attribute** driven by a Select prop, then target it with nested CSS.

Using the card theme example, output the selected theme as a data attribute:

```html
data-theme="{props.theme}"
```

Then write your variation styles in CSS:

```css
.card[data-theme="dark"] {
  background: var(--dark-bg);
  color: var(--dark-text);
  border-color: var(--dark-border);
}

.card[data-theme="light"] {
  background: var(--light-bg);
  color: var(--light-text);
  border-color: var(--light-border);
}

.card[data-theme="primary"] {
  background: var(--primary-bg);
  color: var(--primary-text);
  border-color: var(--primary-border);
}
```

This approach is ideal when variations involve many CSS changes or when you want to keep styling logic in CSS rather than inline styles. It's also easier to manage with design tokens and keeps your markup clean.

## Combining Techniques

Real-world components often combine multiple techniques. A card component might use:

- A **Boolean** prop to show/hide a "featured" badge
- A **Select** prop with a data attribute to control the color theme
- A **Text** prop with an inline token to set a custom accent color
- **Conditional logic** to swap between different layouts

Because each variation is controlled by an independent prop, users can mix and match any combination — featured + dark theme, non-featured + primary theme with a custom accent, and so on. All from a single component.
