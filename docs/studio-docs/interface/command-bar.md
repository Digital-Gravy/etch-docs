---
title: Command Bar
sidebar_position: 50
sidebar_custom_props:
  badge: "New"
---

# Command Bar

Etch's **Command Bar** is present throughout the app and gives you a convenient way to move around the different contexts of the app (Builder/Content Hub/Styles Manager/etc.) and have access to all actions right at your fingertips.

It includes different modes and actions relevant to those modes and the current context.

## Accessing the Command Bar and its modes

![Screenshot of the Command Bar in Etch, open in its default "Action" mode](./img/command-bar.avif)

You can invoke the Command Bar by pressing <kbd>Cmd</kbd> + <kbd>K</kbd> on Mac, or <kbd>Ctrl</kbd> + <kbd>K</kbd> on Windows/Linux.

The different modes of the **Command Bar** can be accessed a few ways:

If the **Command Bar** is visible:
- You can press <kbd>⇥ Tab</kbd> to cycle through modes from left to right, or <kbd>⇧ Shift</kbd> + <kbd>⇥ Tab</kbd> to cycle from right to left.
- You can jump to a specific mode by pressing its shortcut sequence (the shortcut key specific to the mode, immediately followed by <kbd>⇥ Tab</kbd>).
- You can jump to your target mode by pressing its combination shortcut (<kbd>Cmd</kbd> + the mode's key on Mac, or <kbd>Ctrl</kbd> + the mode's key on Windows/Linux).
- Pressing the combination shortcut for a mode that is already active will close the **Command Bar**.

If the **Command Bar** is not already visible, you can invoke it directly in your target mode by pressing its combination shortcut.

| Mode                 | Shortcut sequence (with Command Bar visible)    | Combination shortcut (regardless of state)     |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| `Action`             | <kbd>A</kbd>, then <kbd>⇥ Tab</kbd>                  | <kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd>                        |
| `Navigate`           | <kbd>N</kbd>, then <kbd>⇥ Tab</kbd>                  | <kbd>Cmd/Ctrl</kbd> + <kbd>M</kbd>                        |
| `Insert`             | <kbd>I</kbd>, then <kbd>⇥ Tab</kbd>                  | <kbd>Cmd/Ctrl</kbd> + <kbd>I</kbd>                        |

## Understanding the modes

- **Action mode**: Action mode allows you to perform actions relevant to your current context. As such, the actions available are dependent on what you're currently doing in Etch. Within the Builder context (the main editing view of Etch), you're able to perform actions such as interacting with the selected element (if there is one), switching to a context within the app (Builder/Content Hub/Styles Manager/etc.), or managing the Interface visibility. A more granular implementation of actions will be added in future releases.
- **Navigate mode**: Navigate mode allows you to quickly jump to different pieces of content within your project. You can search for and navigate to native Post Types (Pages and Posts) as well as other content types available on your website.
- **Insert mode**: Insert mode allows you to quickly add elements to your page. You can search for and insert native HTML elements (like `div`, `section`, `header`, etc.), native Etch Components (when they are available in the future), as well as custom Components you've created in your project. You can also enter an Emmet abbreviation to quickly generate complex structures.

:::info
At the time of writing, only a subset of the Builder context actions are available. More actions and modes will be added in future releases.
:::