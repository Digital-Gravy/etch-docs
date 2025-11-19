---
title: Auto Block Authoring
sidebar_position: 10
last_update:
  date: 2025-11-17
---

# Auto Block Authoring

:::note
Etch now authors everything you build to custom Gutenberg blocks (not core blocks). This architectural change improves fidelity, editing stability, and long‑term maintainability while preserving Gutenberg as the client-facing content editor. For further reading, see [Auto Block Authoring: Core Blocks vs Custom Blocks](https://etchwp.com/blog/auto-block-authoring-core-vs-custom/).
:::


Etch authors everything you build to custom Gutenberg blocks and maintains a bi-directional sync between Etch and Gutenberg. They render in the editor exactly as they do in Etch, and all content is stored in WordPress for portability and longevity. This keeps Etch as your development environment while Gutenberg remains a simple, client-facing editor, which improves stability and day-to-day editing.

## Why Author to Blocks

1. **Data Liberation**: The content you add to pages and templates is stored in WordPress, not Etch.
2. **Compatibility**: Blocks work with all plugins without conflicts.
3. **Client Editing**: Gutenberg's simple interface is perfect for client editing.
4. **Pattern Library Compatibility**: Your patterns can be saved to the WordPress pattern library.
5. **Synced Library Compatibility**: Your components can be saved to the WordPress synced pattern library.
6. **Template Library Compatibility**: Your templates are stored in the WordPress templates area.
8. **Plugin Compatibility**: Unsupported blocks from other plugins will passthrough Etch to the front-end automatically.

## Bi-Directional Sync

What you build in Etch automatically appears in the block editor as custom blocks, complete with the same structure panel names and labels you see in Etch, so the editor mirrors your build faithfully.

When you edit content or make layout adjustments in the block editor and save, those changes are synced back to Etch and the front end, keeping everything in step without extra effort.

Likewise, changes you make in Etch flow back into the block editor on save, which keeps both views aligned while you work across environments.

There is no manual syncing or configuration to manage because synchronization is part of Etch's architecture and runs automatically in the background.

## Why Custom Blocks (Not Core Blocks)?

Core blocks seemed like the most “native” and flexible path, but in practice they were too limited for modern workflows. Achieving the necessary fidelity required manipulating output, removing wrappers, and overriding defaults, which is an unstable, maintenance-heavy approach.

Custom blocks, by contrast, give us precise rendering, a smoother editor experience, and a far more stable foundation across your stack.

### Advantages of Custom Blocks

- **1 to 1 Design Representation**: Patterns, components, loops, and templates render in Gutenberg exactly as you built them in Etch, without hacky overrides or wrappers.
- **Seamless Editing Experience**: Custom blocks support nuanced content editing (for example, spans inside headings or paragraphs, inline links, and single buttons) while protecting structure.
- **Improved Stability**: Custom blocks reduce breakage from core updates and remove brittle workarounds required by core blocks.
- **Ecosystem Flexibility (Phase 2)**: Etch's custom block authoring enables building and distributing custom blocks, libraries, and prefabs directly from WordPress. More details are coming in the second phase of this refactor.

## Where Should Things Be Built?

Etch is the development environment. The block editor is only for content editing. Do not build things in the block editor: 

- There's no point. Etch is where your power and control are.
- The block editor is NOT a development environment

The block editor is essentially a client-editing interface. In the future you will be able to control exactly which things the client can edit and will be able to lock certain aspects of patterns and components if you don't want them to be editable.

## A Brand New Custom Block Development Experience

With Etch, you visually build what would traditionally require custom block development. You do not need to write React or manage third‑party dependencies. Build patterns, components, libraries, and templates in Etch and author them as custom blocks for a fast, consistent workflow.

If you can write HTML, CSS, and JS, you can build custom blocks. Etch will generate the React code for you.

Phase 2 of this refactor will introduce new distribution possibilities for sharing/selling blocks and libraries to non‑Etch users directly within the WordPress ecosystem.