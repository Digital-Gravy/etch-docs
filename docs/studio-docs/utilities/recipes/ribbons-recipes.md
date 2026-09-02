---
title: Ribbons Recipes
sidebar_position: 75
---

# Ribbons Recipes

Ribbon recipes help you create decorative corner ribbons for cards, images, and other container elements.

- **corner-ribbon**: Creates a corner ribbon element that can be positioned at the top-left or top-right of a parent container. Includes configurable width, offset, colors, shadow, and text styling.

## Usage

1. Add a text element (span, div, etc.) inside the container where you want the ribbon
2. Apply the `corner-ribbon` recipe to the element
3. Add the `data-ribbon-position` attribute with value `top-left` or `top-right` to position the ribbon

## Available Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--ribbon-width` | `300px` | Width of the ribbon |
| `--ribbon-offset` | `to-rem(20px)` | Offset from the corner |
| `--ribbon-background-color` | `var(--black, #000)` | Background color |
| `--ribbon-text-color` | `var(--white, #fff)` | Text color |
| `--ribbon-text-size` | `1em` | Font size |
| `--ribbon-shadow` | `0 5px 10px #ccc` | Box shadow |
| `--ribbon-padding` | `.5em 1em` | Padding |

## Position Attributes

- `data-ribbon-position="top-right"` - Positions ribbon at top-right corner
- `data-ribbon-position="top-left"` - Positions ribbon at top-left corner
