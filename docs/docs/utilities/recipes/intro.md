---
title: Introduction
sidebar_position: 10
---

# Introduction

Recipes are code snippets that can be expanded in Etch. They save a tremendous amount of typing and give users instant access to solving various development challenges with instant code expansions.

## Simple Example: Flex & Grid Layouts

Typing the same property/value pairs over and over again in CSS is inefficient and boring. For example, setting a div to flex column:

```css
.foo {
    display: flex;
    flex-direction: column;
}
```

It's not a ton of typing, but it's really annoying and unnecessary.

With Recipes, you can just do this:

```css
.foo {
    ?flex-column;
}
```

This will instantly expand the recipe to the code above.

Instead of writing this for grid:

```css
.foo {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: 1fr;
}
```

You can just write this:

```css
.foo {
    ?grid-3;
}
```

The `?` triggers the expansion system for auto-suggest and auto-complete, so you don't even really have to type the full recipe name.

## Complex Example: Auto Grid

Recipes aren't just for simple stuff. They can be used to solve complex problems as well. For example, we've cooked up an extremely powerful Auto Grid recipe for making automatically responsive grids that perfectly match the minimum allowable size of your grid items.

Typing this:

```css
.foo {
    ?auto-grid;
}
```

Expands to this:

```css
.foo {
    /* Begin Auto Grid */
    display: grid !important;
    grid-template-columns: var(--grid-template-columns);
    /* Set or change column count */
    --column-count: 4;
    /* Set or change stacking aggressiveness */
    --auto-grid-aggressiveness: .7;
    /* Don't touch the stuff below unless you have a PhD in CSS */
    --min: calc(((var(--content-width) - ((var(--column-count) - 1) * var(--grid-gap))) / var(--column-count)) * var(--auto-grid-aggressiveness));
    --grid-template-columns: repeat(auto-fit, minmax(var(--min-formula), 1fr));
    --grid-template-columns-even: repeat(auto-fit, minmax(var(--min-formula), 1fr) minmax(var(--min-formula), 1fr));
    --min-formula: min(100%, max(var(--min), (100% - (var(--column-count) - 1) * var(--grid-gap)) / var(--column-count)));
    /* Special handling for children */
    > * {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: break-word;
    }
    gap: var(--grid-gap); /* No touchey - redefine this variable if you want to change the gap, but don't replace the variable or your grid will break */
    /* End Auto Grid */
}
```

Recipes is a development innovation we first introduced in Automatic.css in 2024 and it proved to be an absolute game changer for development efficiency. We're proud to have this functionality merged into Etch core now – we know users are going to love it.