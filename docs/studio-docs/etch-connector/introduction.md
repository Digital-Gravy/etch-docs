---
title: Introduction
sidebar_position: 0
last_update:
  date: 2026-06-22
---

# Etch Connector

**Etch Connector** lets an AI coding agent — like Claude Code or Codex — work directly in a live Etch builder tab. Once it's connected, you can ask the agent to build pages, add styles, create components, and more, and it makes those changes in the browser tab you have connected.

Under the hood it does this by running small scripts and leveraging [Etch's Public API](../public-api/index.md). You don't have to write those scripts — the assistant does. The connector is just the link that lets it reach your open tab.

It's published as a free, open-source npm package, [`@digital-gravy/etch-connector`](https://www.npmjs.com/package/@digital-gravy/etch-connector), with source at [Digital-Gravy/etch-connector](https://github.com/Digital-Gravy/etch-connector).

## Quickstart

Copy the following prompt, and send it to your AI agent:

```markdown
I'd like your help to work in Etch. Read the documentation page at https://docs.etchwp.com/etch-connector/usage and https://docs.etchwp.com/etch-connector/ai-agent-guide to learn how it works, run `npx @digital-gravy/etch-connector serve`, and guide me.
```


## How it works

There are three pieces:

1. **Your Etch tab** — a normal builder page open in your browser.
2. **The connector** — started by pasting `npx @digital-gravy/etch-connector serve` into your AI agent's chat. The agent runs it; you don't have to manually install anything.
3. **Your AI agent** — a tool that lets an LLM model run commands on your machine, like Claude Code.

You connect by clicking the AI sparkles button in the builder, then pasting the connector command in chat. Once the agent confirms the connection, it can send changes through the connector and they appear live in your tab.

## Get started

- [Usage](./usage.md) — turn on the AI Connector, open your builder, and connect from chat. **Start here.**
- [CLI Reference](./cli-reference.md) — the commands your AI agent runs, for reference.
- [AI Agent Guide](./ai-agent-guide.md) — a few notes for the AI agent driving Etch.
- [Security](./security.md) — what runs where, and how to stay safe.
