---
title: Flex Div
---

# Flex Div

The **Flex Div** element in Etch is a powerful layout tool that gives you a basic div that's automatically set to `display: flex;` and `flex-direction: column;`

This allows you to instantly use flex alignment controls and gap spacing without going through the process of setting the display and direction every single time.

It's essentially an efficiency element.

### Adding a Flex Div
1. Drag the **Flex Div** element from the Elements panel into your layout.
2. Add your content inside the Flex Div.
3. Configure flex direction, alignment, and spacing as needed.

## Flex Div Defaults

Etch applies the following defaults to Flex Div elements (with zero specificity):

```css
display: flex;
flex-direction: column;
inline-size: 100%;
```

:::info
Etch defaults are always added with 0,0,0 specificity, making them extremely easy to override without specificity conflicts. You can remove the applied defaults entirely by removing the `data-etch-element` attribute from the element.
:::


By setting the `flex-direction` to `column` and the `inline-size` to `100%`, Flex Divs behave exactly like regular block-level divs, with the added benefit of supporting flex alignments and gap out of the box.