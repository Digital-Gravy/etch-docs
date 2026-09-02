---
title: Pseudo Selector Recipes
sidebar_position: 35
---

# Pseudo Selector Recipes

Pseudo selector recipes provide utility patterns for working with CSS pseudo-classes and pseudo-elements in Etch.

- **::before**: Creates a `::before` pseudo-element with an empty `content` property. Useful for decorative elements, icons, or overlays.

- **::after**: Creates an `::after` pseudo-element with an empty `content` property. Useful for decorative elements, icons, or overlays.

- **::before, ::after**: Creates both `::before` and `::after` pseudo-elements with empty `content` properties in a single selector. Useful when you need to style both pseudo-elements the same way.

- **:hover**: Creates a `:hover` pseudo-class selector. Useful for interactive states and hover effects.

- **:focus-visible**: Creates a `:focus-visible` pseudo-class selector. Useful for keyboard navigation focus states that should only appear when using keyboard navigation.

- **:hover, :focus-visible**: Creates a combined selector for both `:hover` and `:focus-visible` states. Useful when you want the same styling for both hover and keyboard focus states.

- **hover-exclude-touch**: Creates a media query that only applies styles on devices with a mouse/trackpad, excluding touch devices. This prevents hover effects from being triggered on mobile/touch devices where hover states can cause usability issues.

