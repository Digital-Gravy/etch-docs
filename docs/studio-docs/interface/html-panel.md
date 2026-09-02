---
title: HTML Panel
sidebar_position: 40
---

# HTML Panel

The HTML Panel provides a powerful code editor for writing and editing HTML markup directly within Etch's interface. Built on CodeMirror, it offers a professional coding experience with syntax highlighting, auto-completion, and advanced editing features.

## Basic Usage

The HTML Panel shows the current HTML structure of your page in real-time. As you make changes on the canvas or in other panels, the HTML updates automatically. You can also edit the HTML directly, and your changes will be reflected immediately on the canvas.

## Keyboard Shortcuts

The HTML Panel includes many powerful keyboard shortcuts to speed up your workflow:

### Multi-Cursor and Selection
- **Cmd+D** (Mac) / **Ctrl+D** (Windows/Linux): Select the next occurrence of the current selection
- **Cmd+Shift+L** (Mac) / **Ctrl+Shift+L** (Windows/Linux): Select all occurrences of the current selection
- **Alt+Click**: Add additional cursors at click positions
- **Cmd+Alt+Up/Down** (Mac) / **Ctrl+Alt+Up/Down** (Windows/Linux): Add cursors above/below

### Search and Replace
- **Cmd+F** (Mac) / **Ctrl+F** (Windows/Linux): Open search dialog
- **Cmd+H** (Mac) / **Ctrl+H** (Windows/Linux): Open search and replace dialog
- **Cmd+G** (Mac) / **Ctrl+G** (Windows/Linux): Find next occurrence
- **Cmd+Shift+G** (Mac) / **Ctrl+Shift+G** (Windows/Linux): Find previous occurrence

### Navigation
- **Cmd+Up/Down** (Mac) / **Ctrl+Up/Down** (Windows/Linux): Scroll without moving cursor
- **Cmd+Home/End** (Mac) / **Ctrl+Home/End** (Windows/Linux): Go to beginning/end of file
- **Cmd+Left/Right** (Mac) / **Ctrl+Left/Right** (Windows/Linux): Go to beginning/end of line

### Editing
- **Cmd+Z** (Mac) / **Ctrl+Z** (Windows/Linux): Undo
- **Cmd+Shift+Z** (Mac) / **Ctrl+Shift+Z** (Windows/Linux): Redo
- **Cmd+X/C/V** (Mac) / **Ctrl+X/C/V** (Windows/Linux): Cut/Copy/Paste
- **Tab**: Indent selection
- **Shift+Tab**: Unindent selection

## Advanced Features

### Auto-Completion
The HTML Panel provides intelligent auto-completion for HTML tags, attributes, and values. As you type, suggestions will appear automatically. Use **Tab** or **Enter** to accept suggestions.

### Syntax Highlighting
HTML syntax is highlighted with different colors for tags, attributes, values, and content, making it easy to read and understand your code structure.

### Error Detection
The editor will highlight syntax errors and provide helpful error messages to help you write valid HTML.

### Code Folding
You can fold and unfold code blocks by clicking on the fold indicators in the gutter, or using **Cmd+Shift+[** (Mac) / **Ctrl+Shift+[** (Windows/Linux) to fold and **Cmd+Shift+]** (Mac) / **Ctrl+Shift+]** (Windows/Linux) to unfold.

## Tips and Tricks

### Working with Multiple Elements
When you need to edit multiple similar elements, use **Cmd+D** to select each occurrence one by one, or **Cmd+Shift+L** to select all occurrences at once. This is especially useful for adding classes or attributes to multiple elements.

### Search and Replace with Regular Expressions
In the search dialog, you can enable regular expressions for advanced find and replace operations. This is powerful for making systematic changes across your HTML.

### Split View
You can have multiple panels open simultaneously. For example, keep the HTML Panel open while working in the Structure Panel to see how your changes affect the code in real-time.

### Keyboard Navigation
Learn to navigate efficiently using keyboard shortcuts. This will significantly speed up your HTML editing workflow, especially when working with large files.

## Integration with Other Panels

The HTML Panel works seamlessly with all other panels in Etch:

- Changes in the HTML Panel are immediately reflected on the **Canvas**
- The **Structure Panel** updates to show the new structure
- The **Properties Panel** will show the properties of the currently selected element
- The **CSS Panel** can be used alongside the HTML Panel for comprehensive styling

This integration ensures that you always have a complete view of your page's structure and can make changes from any perspective that's most convenient for your current task.