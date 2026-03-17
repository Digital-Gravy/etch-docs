---
title: Class Prop
sidebar_position: 56
---

# Class Prop

The Class Prop lets you apply CSS classes to elements inside a component from the outside. This gives component users the ability to customize styling without editing the component's internal structure.

## Why the Class Prop Exists

Components are designed to be self-contained and reusable. But sometimes the same component needs to look different depending on where it's used — a card might need rounded corners on one page and sharp corners on another, or a button might need a specific color scheme to match its section.

The Class Prop solves this by exposing a "styling hook" on the component. The component author decides which elements can be styled from the outside, and the component user applies classes as needed.

## Adding a Class Prop

In the component editor, click the "+" icon and select "Class" from the prop types.

Give the prop a meaningful name that describes what it styles (e.g., "Card Style", "Button Classes", "Wrapper Classes").

## Mapping a Class Prop

Class props are mapped to elements via the `class` attribute. In the component's HTML, reference the prop like this:

```html
<div class="{props.cardStyle}">...</div>
```

You can combine a class prop with static classes:

```html
<div class="card {props.cardStyle}">...</div>
```

## Setting Default Classes

In the component editor, you can assign default classes to a class prop. These are the classes that will be applied when the component user hasn't provided their own.

To add defaults, click the "+" button next to the class prop and type a class name (e.g., `.rounded`). You can add multiple classes.

:::info
Class props reference Etch styles. When you type a class name, Etch will create a style for it if it doesn't already exist. The classes you see in the component editor are linked to styles you can edit in the CSS panel.
:::

## Using a Class Prop (Component Instance)

When you use the component on a page, the class prop appears in the properties panel as a class input. You can:

- **Keep the defaults** — If the component author set default classes, they'll be applied automatically. Default classes appear greyed out.
- **Override with your own classes** — Type a class name and press Enter. Adding your own classes replaces the defaults entirely.
- **Remove classes** — Click the "x" on any class badge to remove it.

## Example: Flexible Card Component

A card component with a class prop for the wrapper:

| Prop        | Type  | Purpose                          |
| ----------- | ----- | -------------------------------- |
| Title       | Text  | The card's heading               |
| Description | Text  | The card's body text             |
| Card Style  | Class | CSS classes for the card wrapper |

The component author maps the class prop:

```html
<div class="card {props.cardStyle}">
  <h3>{props.title}</h3>
  <p>{props.description}</p>
</div>
```

And sets `.card--rounded` as the default class.

When using the component, the user can keep `.card--rounded` or override it with `.card--sharp .card--shadow` to get a completely different look — without touching the component's internal code.
