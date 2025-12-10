---
title: Controls
sidebar_position: 2
---

# Controls

Etch allows you to extend the builder interface by adding custom controls.

## Settings Bar Controls

You can add custom buttons to the Settings Bar (the left sidebar in the builder) using the `window.etchControls.builder.settingsBar` API.

### Locations

The settings bar is divided into three sections where you can inject controls:

- `top`: Top section of the bar.
- `center`: Middle section.
- `bottom`: Bottom section.

Each location provides `addBefore()` and `addAfter()` methods to position your control relative to existing items in that section.

### Icons

Etch supports [Iconify](https://iconify.design/), which means you can use any icon string from their library (e.g., `mdi:home`, `ph:pencil`, `carbon:settings`).

### Example

To ensure the Etch API is available when your script runs, we recommend wrapping your code in a `window.addEventListener('load', ...)` listener.

```javascript
window.addEventListener('load', () => {
    // Add a custom button to the top section of the settings bar
    window.etchControls.builder.settingsBar.top.addAfter({
        icon: 'ph:rocket-duotone', // Any icon from https://iconify.design/
        tooltip: 'Launch Rocket',
        callback: () => {
            alert('Rocket launched! 🚀');
        }
    });
});
```

### API Reference

#### Methods

Available on `top`, `center`, and `bottom` locations:

- **`addBefore(control)`**: Adds a control to the beginning of the section's list.
- **`addAfter(control)`**: Adds a control to the end of the section's list.
- **`remove(id)`**: Removes a control by its ID.

#### Control Object

When adding a control, pass an object with the following properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `icon` | `string` | **Required**. The icon identifier (e.g., `mdi:check`). |
| `tooltip` | `string` | **Required**. Text to display on hover. |
| `callback` | `function` | **Required**. Function to execute when clicked. |
| `id` | `string` | *Optional*. Unique ID for the control. If omitted, one is automatically generated. |
