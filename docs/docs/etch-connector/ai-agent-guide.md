---
title: AI Agent Guide
sidebar_position: 40
last_update:
  date: 2026-11-05
---

# AI Agent Guide

This page is written for the AI agent driving Etch — you can point it at this page, or it can read it on its own. It covers what's specific to working _through the connector_. It does **not** document the API itself — for the actual commands a script calls (`etch.blocks`, `etch.styles`, `etch.components`, and so on), see the [Public API](../public-api/index.md) docs.

:::tip Read the manual first
The connector's own agent instructions live in `etch-connector --help`. It documents the backends, commands, flags, the stdout/stderr/exit-code contract, and how to pull the current Etch docs. Read the entire output before driving a tab.
:::

## How scripts run

- Run scripts with `etch-connector eval -t <tab> "<js>"` (or `-f file.js`). See [Usage](./usage.md) for the full flow.
- The body runs as an **async function** — use `await` and `return` a value. The return value comes back on stdout as JSON.
- Tabs connect in **safe mode**: only the `etch` global plus standard JS exist. There is no `window`/`document` — reference `etch.*` directly. See [Security](./security.md).

## Saving your changes

How a change reaches the database depends on which part of the API you used:

- `etch.blocks`, `etch.styles`, and `etch.loops` are buffered — persist them with `await etch.saveAsync()`.
- `etch.components.*`, `etch.stylesheets.*`, and `etch.assets.*` persist immediately; no `saveAsync()` needed.

This matches the [persistence model in the Public API docs](../public-api/index.md#saving-and-the-persistence-model) — refer there for the per-namespace details.

## Files and images

When the connected runtime supports the relevant operations, use `etch-connector upload <file> --alt "…"` to upload an image and bind the returned `id` to an `etch/dynamic-image` block's `mediaId`. Use `etch-connector download <id> --out <path>` to write an existing image to disk. These commands handle encoding; do not paste file contents into an `eval`. Check the [asset capabilities](../public-api/assets.md#feature-detection) first. Upload-time `--compress` is not available in EtchWP's partial implementation.
