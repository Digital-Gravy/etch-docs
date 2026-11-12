---
title: MCP Server
sidebar_position: 335
sidebar_custom_props:
  badge: New
last_update:
  date: 2026-11-12
---

# MCP Server

:::warning Early state
The MCP server is at an early stage. Its tools and behavior may still change,
and you may run into rough edges.
:::

The **Etch Studio MCP server** lets an AI assistant such as Claude, Claude Code or
Cursor build in your Etch Studio projects. The assistant opens a project in a
builder of its own that runs in the cloud and is signed in as you. It makes
changes there through the [Public API](./public-api/index.md).

There is nothing to install and no builder tab to keep open. This is the main
difference from [Etch Connector](./etch-connector/introduction.md), which links
an agent on your computer to a builder tab open in your browser.

## Add the server

The server address is:

```
https://studio.etchbuilder.io/mcp
```

- **Claude (claude.ai or the desktop app):** open **Settings → Connectors**,
  select **Add custom connector**, and paste the address. It then works in the
  mobile app too.
- **Claude Code:** run
  `claude mcp add --transport http etch-studio https://studio.etchbuilder.io/mcp`.
- **Other clients:** add it as a remote (HTTP) MCP server. See your client's
  documentation for where.

When you connect, sign in with your Etch Studio account. The assistant can
reach the same workspaces and projects you can, and nothing more.

## Quickstart

Once the server is added, ask your assistant something like:

```markdown
Use the Etch Studio MCP server to open my "Portfolio" project and add a hero section to the homepage. Show me a screenshot before you save.
```

## How a session works

1. The assistant lists your workspaces and projects, then opens one. If
   someone else has it open, it first gets
   [editing control](#working-alongside-others).
2. It runs small scripts against the project's builder to read and change it.
3. It can take screenshots of the builder to check its work.
4. When it's done, it saves, closes the project and tells you what it saved.

### Saving

The assistant saves when it closes the project, unless you've asked it not to.
Nobody else sees its builder, so anything it doesn't save is lost.

Page structure and styles stay in the assistant's builder until it saves.
Components, stylesheets, content, routes, data sources and assets are written
as soon as the assistant changes them, so they're kept even if you tell it not
to save. See the [persistence model](./public-api/index.md#saving-and-the-persistence-model).

If the assistant does nothing for about **10 minutes**, its builder shuts down
and changes it hasn't saved are lost. Ask it to save before you step away.

### Working alongside others

Only one builder tab at a time has **editing control** of a project, and only
that tab can save. The assistant's builder counts as a tab like any other.
Others in the project see it under the name and logo of the app driving it,
such as Claude. Without control, every change the assistant tries to save or
write is refused.

When the project is already open somewhere else, the assistant still opens it,
but it asks for control before it edits:

- If someone else has the project open, it checks with you first, since asking
  interrupts them. If the only other tab is your own, it just asks.
- The person editing sees a **Control request** and can choose **Save +
  Accept**, **Undo changes + Accept** or **Decline**. If they don't answer within
  30 seconds, control passes to the assistant and their unsaved changes are
  discarded.
- If they decline, the assistant tells you and doesn't ask again unless you
  tell it to.
- Getting control reloads the assistant's builder with the latest saved
  version, so it asks before it makes any changes.

You can also ask the assistant for control from your own tab while it works.
It can't answer the request itself, so after 30 seconds it saves what it has
and hands over. It checks with you before taking control back.

## Tools

These are the tools the server gives your assistant. You don't call them
yourself; they're listed so you can follow what the assistant is doing.

| Tool | What it does |
| --- | --- |
| `list_projects` | Lists your workspaces and the projects in each. |
| `open_project` | Opens a project and returns a handle the other tools use, along with who else has the project open. |
| `request_control` | Asks whoever has editing control to hand it over, and waits up to about 30 seconds for the answer. |
| `get_guide` | Returns the server's instructions for the assistant. |
| `eval` | Runs a script in the builder with `etch` in scope, and returns its result, errors and console logs. |
| `screenshot` | Returns a PNG of the builder, or of one element in it. |
| `close_project` | Closes the builder. With `save: true` it saves first, and stays open if the save fails. |

## Notes for the AI agent

This section is for the assistant using the server. Call `get_guide` before the
first `eval`; it is the authoritative version of these notes.

- `eval` runs its `code` as the body of an async function. Use `await` and
  `return` a value to see it.
- `open_project` returns `othersPresent`. If it isn't empty, call
  `request_control` before the first write. Ask the user first, unless the
  only entry has `isYou: true`. Call it before you change anything, because
  getting control reloads the builder and loses earlier edits. If the answer is
  `granted: false`, tell the user and don't ask again unless they tell you to.
- If saves start failing partway through, someone asked for control and the
  builder handed over after 30 seconds, saving first. Ask the user before you
  request control again.
- When done, call `close_project` with `save: true` unless the user said not
  to save, then tell the user what was saved. `await etch.saveAsync()` saves
  mid-session. See the [persistence model](./public-api/index.md#saving-and-the-persistence-model).
- Before the first write, read every skill that `etch.skills.list()` returns
  with `etch.skills.get(name).content`. They describe how to build in Etch and
  the conventions the project has turned on. See [Skills](./public-api/skills.md).
- Make every change through the `etch.*` API. Don't touch the canvas DOM,
  inject `<style>` tags or set attributes on canvas elements.
- `open_project` returns `etch.environment`. Branch on the capabilities it
  lists, not on the product name; an unsupported namespace throws.
- Call `etch.dataSources.resolveAsync(key)` to see a data source's real shape
  before using its properties.

## Your own conventions

Like Etch Connector, the server only adds the project's own skills, including
the conventions turned on under **Settings → AI** in the builder, such as BEM
class names. Put your
naming, structure and tooling preferences in your assistant's instructions, as
described in [Training & Guidance](./etch-connector/training-and-guidance.md).
