---
title: Quick Notes
sidebar_position: 20
sidebar_custom_props:
  badge: "New"
---

# Quick Notes

Quick Notes allows you to add developer notes to any element in the Etch builder. These notes are visible when hovering over elements on the canvas, making it easy to leave reminders, instructions, or context for yourself or team members.

This is one of two pathways for creating developer only notes. A "note" element will be coming in the future for adding long-form notes.

:::note
These notes will only show up in the Etch builder. There will be dedicated way to display notes for clients in the future.
:::

## Enabling Quick Notes

Quick Notes can be toggled on or off in the **Structure Panel** settings:

1. Click the **settings icon** (⚙️) in the Structure Panel header
2. Toggle **Quick Notes** on or off

When enabled, any element with a note will display its note as an overlay when you hover over it on the canvas.

## Adding a Note to an Element

To add a note to an element:

1. Select the element you want to annotate
2. In the **Attributes Panel**, add the `data-etch-note` attribute
3. Enter your note as the attribute value

**Example:**
```
data-etch-note="This section needs review before launch"
```

## How Notes Are Displayed

When Quick Notes is enabled and you hover over an element that has a `data-etch-note` attribute, the note appears as a tooltip overlay near the element. The note is prefixed with "Note:" for clarity.

## Important: Notes Are Not Published

Quick Notes are a **builder-only feature**. The `data-etch-note` attribute is automatically stripped from the HTML when your page is rendered on the frontend. This means:

- Notes are only visible in the Etch builder
- Notes do not affect your live site
- Notes add zero overhead to your published pages

This makes Quick Notes perfect for leaving development reminders without any impact on production.

## Use Cases

- **Development reminders**: Leave notes about incomplete features or TODOs
- **Team communication**: Share context with collaborators about specific elements
- **Client instructions**: Document why certain design decisions were made
- **Accessibility notes**: Remind yourself to add ARIA attributes or alt text
- **Responsive design**: Note breakpoint-specific styling requirements

