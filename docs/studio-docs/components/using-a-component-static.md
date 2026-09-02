---
title: Using a Component (Static)
sidebar_position: 40
---

# Using a Component (Static Data)

Once a component is built, saved, and its props are [mapped](./mapping-component-props), it's ready to be used. "Static" usage means you fill in prop values manually with hardcoded content — no loops, no dynamic data sources.

## Adding a Component to a Page

You can add a component to any page using <kbd>Cmd</kbd> + <kbd>I</kbd> to open the insert menu, then search for or select your component.

{/* TODO: screenshot of adding a component to the canvas */}

Once placed, the component will render using its default prop values (if any were set during creation).

Remember: When you're not in component editor mode, you'll see the **prop inputs** for filling in values rather than the prop setup/configuration you saw when building the component.

## Filling in Props

When you select a component instance on the canvas, its props appear in a dedicated **properties panel**. This is where you provide the values for each prop.

{/* TODO: screenshot of component properties panel */}

Each prop type has its own input:

- **Text** — A text field where you type your content directly (e.g., a heading, description, or label)
- **Boolean** — A toggle switch for true/false values (e.g., show/hide a badge)
- **Select** — A dropdown to choose from predefined options (e.g., size, theme, or layout variation)
- **Image** — A media selector to choose an image from the media library or enter a URL
- **Array** — A structured input for lists or collections of data
- **Slot** — A content area where you can drag and drop other elements or components

Fill in each prop with the specific content for this instance of the component.

## Example: Static Service Card

Imagine a service card component with these props:

| Label | Type | Purpose |
|-------|------|---------|
| Service Name | Text | The name of the service |
| Service Description | Text | A brief description |
| Service Image | Image | The service's icon or photo |
| Is Featured | Boolean | Whether to show a "featured" badge |

To use this component statically:

1. Drop the service card component onto your page
2. Select it and find the properties panel
3. Fill in the props:
   - **Service Name** → "Web Design"
   - **Service Description** → "Custom websites tailored to your brand and goals."
   - **Service Image** → Select an image from the media library
   - **Is Featured** → Toggle on if this service should be highlighted

Each instance of the card can have completely different values. Place three cards on the page and fill in different service information for each one.

## When to Use Static Data

Static data is ideal when:

- You're building one-off pages (landing pages, about pages)
- The content is unique to each component instance and manually entered
- You don't have a data source like a loop or query to pull from
- You're prototyping or building out a design before connecting to dynamic data

If you find yourself placing the same component repeatedly inside a loop or template and want it populated automatically from a data source, that's where [dynamic data](./using-a-component-dynamic) comes in.

## Next Steps

- [Use a component with dynamic data](./using-a-component-dynamic)
