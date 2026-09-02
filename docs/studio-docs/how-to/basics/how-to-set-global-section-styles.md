---
title: How to Set Global Section Styles
sidebar_position: 20
---

# How to Set Global Section Styles

:::info
[Automatic.css](https://automaticcss.com) users do not need to do follow this tutorial. ACSS sets and manages your section styles and you can adjust them in the ACSS dashboard.
:::

:::info
In the future, Etch will have a dedicated section in the Styles Manager for managing global styling. The below method will still work, but it will be made easier soon.
:::

When you first add a Section element to the page (if you're not an Automatic.css user), you'll notice two things:

1. It has no default padding.
2. It has no gutter.

That means your Container is touching the top and bottom edges of your Section and your content will touch the device edges on mobile.

This is undesirable!

Smart developers solve this by setting default padding for sections.

## Selecting the Right Sections

The safest and best way way to set default Section styles is a little trick we came up with when developing ACSS:

```css
:where(section:not(section section)) {
    padding-block: /* value */;
    padding-inline: /* value */;
}
```

Let me quickly explain this so you understand it:

`:where()` - This sets the specificity of the styles we're about to add to `0,0,0`. This is best practice for setting global defaults.

`section:not(section section)` - This essentially says, "select all sections except sections that are children of over sections. 

The end result is that only top level sections are selected. Sections can be nested in other sections, but you wouldn't want any of these default styles applied in that case, so we exclude that scenario.

In Etch, you can use the [Attribute Bar](../../interface/attributes-bar.md) to add that selector by wrapping it in braces:

```css
{:where(section:not(section section))}
```

## Adding the Styles

Once you've added the selector, you can add the padding styles:

Question is: what should the padding values be?

I can help!

First, you can absolutely do this:

```css
:where(section:not(section section)) {
    padding-inline: 16px;
    padding-block: 4rem;
}
```

But that's hot garbage and you shouldn't build hot garbage.

Let's do it a better way:

Since the padding-inline value represents your site's "gutter" and the gutter needs to be consistent across the entire site, let's make a token for it:

```css
:where(section:not(section section)) {
    padding-inline: var(--gutter);
}
```

Where does gutter get its value from? Hop back over to the Variable Manager and add:

```css
--gutter: clamp(16px, 10dvw, 80px);
```

Haven't see a `clamp()` function before?

Let's learn!

What this formula effectively does is it scales your gutter from `16px` to `80px` automatically depending on the device width.

The `clamp()` function says, "use the middle value, but `16px` is the minimum and `80px` is the maximum. Since the middle value is a `dvh` value (device width percentage), it scales fluidly between the other two values.

You can set the min and max to any value you prefer.

Phew. Okay, on to the block padding!

We're essentially going to do the same thing, with a minor adjustment to the values since section block padding needs to be bigger than gutter padding.

```css
:where(section:not(section section)) {
    padding-inline: var(--gutter); /* Left and right */
    padding-block: clamp(30px, 5dvw, 80px); /* Top and bottom */
}
```

Now when you add a section element, it'll have a gutter and default padding. And your default padding can easily be overwritten with any new padding value you'd like!

:::warning
This isn't the absolute best way to set `clamp()` function values. The best way uses a complex math formula to set the middle value based on your content width dimensions and a minimum device size. This requires a clamp calculator or a framework like ACSS. But you can "get by" with the values above.
:::