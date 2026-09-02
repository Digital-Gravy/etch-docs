---
title: Gradient Recipes
sidebar_position: 40
---

# Gradient Recipes

Gradient recipes provide utility patterns for creating CSS gradients in Etch. All gradient recipes use CSS custom properties for colors and stops, making them easy to customize.

- **gradient-linear**: Creates a linear gradient with a default 180deg direction. Uses `--color-1` and `--color-2` custom properties for the gradient colors.

- **gradient-radial**: Creates a radial gradient in a circular shape. Uses `--color-1` and `--color-2` custom properties for the gradient colors.

- **gradient-conic**: Creates a conic gradient starting from 0deg. Uses `--color-1` and `--color-2` custom properties for the gradient colors.

- **gradient-sharp**: Creates a linear gradient with a sharp transition at a specified stop point. Uses `--color-1`, `--color-2`, and `--stop` custom properties. The `--stop` property controls where the color transition occurs (default: 50%).

- **gradient-fade**: Creates a linear gradient that fades from a color to transparent. Uses `--color-1` custom property for the starting color.

- **gradient-vignette**: Creates a radial gradient vignette effect that transitions from transparent in the center to a color at the edges. Uses `--color-1` and `--stop` custom properties. The `--stop` property controls the size of the transparent center (default: 50%).

- **gradient-text**: Creates a gradient text effect using background-clip. Uses `--color-1` and `--color-2` custom properties for the gradient colors. This recipe sets the text color to transparent and applies the gradient as the background.

- **gradient-border**: Creates a gradient border effect using a double background technique. Uses `--color-1` for the background color, and `--color-2` and `--color-3` for the border gradient colors. The border width defaults to 2px.

