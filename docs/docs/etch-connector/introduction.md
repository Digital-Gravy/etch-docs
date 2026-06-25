---
title: Introduction
sidebar_position: 0
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-22
---

# Etch Connector

**Etch Connector** lets an AI coding assistant — like Claude Code or Cowork — work directly in a live Etch builder tab. Once it's connected, you can ask the assistant to build pages, add styles, create components, and more, and it makes those changes in the tab you have open.

Under the hood it does this by running small scripts against [Etch's Public API](../public-api/index.md) (the same `etch.*` commands you can use yourself from the browser console). You don't have to write those scripts — the assistant does. The connector is just the link that lets it reach your open tab.

It's published as a free, open-source npm package, [`@digital-gravy/etch-connector`](https://www.npmjs.com/package/@digital-gravy/etch-connector), with source at [Digital-Gravy/etch-connector](https://github.com/Digital-Gravy/etch-connector).

## How it works

There are three pieces:

1. **Your Etch tab** — a normal builder page open in your browser.
2. **The connector** — started by pasting `npx @digital-gravy/etch-connector serve` into your assistant's chat. The assistant runs it; you don't install anything.
3. **Your AI assistant** — a tool that can run commands, like Claude Code.

You connect by clicking the AI sparkles button in the builder, then pasting that command in chat. Once the assistant confirms the connection, it can send changes through the connector and they appear live in your tab.

## Get started

- [Usage](./usage.md) — turn on the AI Connector, open your builder, and connect from chat. **Start here.**
- [CLI Reference](./cli-reference.md) — the commands your assistant runs, for reference.
- [AI Agent Guide](./ai-agent-guide.md) — a few notes for the AI assistant driving Etch.
- [Security](./security.md) — what runs where, and how to stay safe.
