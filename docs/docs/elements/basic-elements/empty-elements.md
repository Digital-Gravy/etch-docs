---
title: Empty Elements*
---

# Empty Elements*

Empty elements in Etch are elements that contain no content—no text, no child elements, and no background images. Understanding how empty elements behave in the builder is important for effective development.

## Minimum Dimensions in Builder

Empty elements in the builder interface have a **minimum** width and height of 35px to ensure they're selectable on the canvas. This is a builder-only feature and does not affect your production site.

Why 35px minimum? Without minimum dimensions the element would be invisible and impossible to select or manipulate in the visual interface. The 35px minimum ensures you can always click, drag, and modify empty elements during development.

## Expected Behavior

If you're trying to set dimensions on an empty element of less than 35px, you may notice that the element doesn't seem to respond. This is because the empty element is respecting its minimum dimensions in the builder interface.

**This behavior only applies in the builder.** On your live site, empty elements will render at their actual specified dimensions (or collapse to nothing if no dimensions are set).

## Customizing the Minimum Size

You can override the default 35px minimum by changing the value of the `--empty-element-size` CSS custom property.

### Element Level
Set it on a specific element using inline styles or the CSS panel:
```css
.my-element {
  --empty-element-size: 20px;
}
```

### Section Level
Apply it to a section to affect all empty elements within:
```css
.my-section {
  --empty-element-size: 20px;
}
```

### Global Override
Set it globally in your stylesheet:
```css
:root {
  --empty-element-size: 0;
}
```

:::warning Global Override is Not Recommended
Setting `--empty-element-size: 0` at the global level is typically undesirable and problematic. It will result in only being able to see, select, and manipulate empty elements via the structure panel. We recommend overriding it at the element level when necessary.
:::

## Common Use Cases

Empty elements are commonly used for:
- Spacers and layout gaps
- Decorative elements
- Structural containers that receive content dynamically

