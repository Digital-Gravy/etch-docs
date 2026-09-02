---
title: How to Set Global Heading Styles
sidebar_position: 30
---

# How to Set Global Heading Styles

:::info
[Automatic.css](https://automaticcss.com) users do not need to do follow this tutorial. ACSS sets and manages your heading styles and you can adjust them in the ACSS dashboard.
:::

:::info
In the future, Etch will have a dedicated section in the Styles Manager for managing global styling. The below method will still work, but it will be made easier soon.
:::

Etch's selector system empowers you to select and style any element by its tag name. For headings, this means you can add every heading level as a stylable selector.

To get started, open Etch, select any element on the page (it doesn't matter which element you select), and press <kbd>Command</kbd> <kbd>⌘</kbd> + <kbd>Enter</kbd> (on Mac) or <kbd>Ctrl</kbd> + <kbd>Enter</kbd> (on Windows) to open the [Attribute Bar](../../interface/attributes-bar.md).

Type in:

```css
{h1} {h2} {h3} {h4} {h5} {h6}
```

Once you hit enter, open the [Style Manager](../../interface/style-manager.md).

If you have a lot of selectors, you can filter down to elements by choosing the "Tag" category.

You should now see your heading selectors waiting to be styled.

![Style Manager showing heading selectors](../../interface/img/style-manager-elements.avif)

## How to Add & Preview Styles

Etch will have a dedicated global styles manager in the future with a preview pane for seeing what you're doing.

For now, though, the best way to add your global styles (especially if you don't want to write CSS) is to close the style manager and add each heading level to the canvas.

When you click on a heading element, you'll see the [Selector Pill](../../interface/selector-pills.md) available. Click it and use the [CSS Panel](../../interface/css-panel.md) to add your styles.

Using this method will allow you to see exactly what you're doing as you work.

## Grouping Heading Styles

For any shared heading styles, you can create a more efficient selector, which gives you a single source of truth for the shared styles:

```css
:where(h1,h2,h3,h4,h5,h6)
```

This can be added in Etch by putting brackets around the selector.

Any styles applied to this selector will apply to all headings.