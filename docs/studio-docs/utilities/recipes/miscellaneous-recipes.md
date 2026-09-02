---
title: Miscellaneous Recipes
sidebar_position: 70
---

# Miscellaneous Recipes

Miscellaneous recipes provide additional utility patterns for various common tasks in Etch.


- **columns**: 
Creates auto-responsive multi-column layouts with configurable column count, minimum width, gaps, and custom visual separators between columns. Ensures items do not break awkwardly between columns.

- **line-clamp**: 
Limits multi-line content to a maximum number of lines with an ellipsis for overflowing text. The number of visible lines can be easily configured.

- **concentric-radius**: 
Applies concentric border radius and enhances padding for nested elements, ensuring child elements have a unified rounded appearance and remain visually cohesive.

- **concentric-radius-reverse**: 
The reverse of concentric-radius. Sets `--radius` on the outer element and calculates a smaller inner radius for child elements. Useful when you want to define the outer radius and have inner elements automatically adjust. Includes a `--minimum-inner-radius` to prevent the inner radius from becoming too small.

- **font-face**:
Outputs a complete `@font-face` declaration template for adding custom fonts. Includes placeholders for font family name, file path, style, weight, and uses `font-display: swap` for optimal loading.

- **is-bg**:
Turns any element into a background element and automatically handles the layering of multiple background elements.

- **brace-contain**:
Outputs escaped curly braces with an empty interior `{""}` for use in dynamic data contexts where you need to wrap content in literal braces.

- **brace-left**:
Outputs an escaped left curly brace `{"{"}` for use in dynamic data contexts where a literal opening brace is needed.

- **brace-right**:
Outputs an escaped right curly brace `{"}"}` for use in dynamic data contexts where a literal closing brace is needed.

- **footer-reveal**:
Creates a "reveal" effect where the footer is sticky at the bottom and appears to be revealed as the main content scrolls away. Automatically styles the main element with proper z-index and shadow for the effect. Must be used in a template on a footer element that is adjacent to the main tag.
