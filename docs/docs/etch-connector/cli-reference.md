---
title: CLI Reference
sidebar_position: 30
last_update:
  date: 2026-06-22
---

# CLI Reference

The full set of commands. **You don't run these yourself** — your AI agent runs them for you when you connect from chat (see [Usage](./usage.md)). This page is here for reference, so you can see what the agent is doing.

:::note Command names
The agent runs the connector via `npx` (e.g. `npx @digital-gravy/etch-connector serve`). For readability, the examples below use the short `etch-connector` form.
:::

```
etch-connector — drive a live Etch tab from the command line

Usage:
  etch-connector serve [--ws-port 7331] [--control-port 7332] [--ws-host 127.0.0.1]
  etch-connector tabs  [--json] [--control-port 7332] [--cdp]
  etch-connector eval  [code] [-t|--tab name] [-f|--file path] [--timeout ms] [--cdp]
  etch-connector shot      [-t name] [-s|--selector css] [--full] [--jpeg] [-o|--out file] [--freeze=false]   (CDP)
  etch-connector html      <selector> [-t name]                                              (CDP)
  etch-connector computed  <selector> [-t name] [--props a,b,c]                               (CDP)
```

## Commands

### `serve`

Starts the connector and leaves it running. This is the program your tab connects to.

```bash
etch-connector serve [--ws-port 7331] [--control-port 7332] [--ws-host 127.0.0.1]
```

| Option | Default | What it does |
| --- | --- | --- |
| `--ws-port` | `7331` | The port your Etch tab connects on. Change it if `7331` is already in use. |
| `--control-port` | `7332` | The port the other commands use to talk to the running connector. |
| `--ws-host` | `127.0.0.1` | The address to listen on. Leave this as-is unless you have a specific reason to change it. |

### `tabs`

Lists the Etch tabs currently connected.

```bash
etch-connector tabs [--json]
```

### `eval`

Runs a command in a connected tab. This is what your agent uses to make changes.

```bash
etch-connector eval [code] [-t|--tab name] [-f|--file path] [--timeout ms]
```

| Option | What it does |
| --- | --- |
| `-t`, `--tab` | Which tab to act on. Optional when only one tab is connected. |
| `-f`, `--file` | Run a script saved in a file instead of typing it inline. |
| `--timeout` | How long to wait (in milliseconds) before giving up. |

### Results: where they go

When `eval` runs, results come back in a predictable way so a tool can read them:

- The command's **result** is printed as the main output.
- Any **log messages** the script produced are printed separately.
- A **success/failure code** tells the agent whether it worked: `0` means success, `2` means the script hit an error, and `1` means something operational went wrong (the tab wasn't found, the request timed out, or the connector wasn't reachable).

## Screenshots & inspection (advanced)

The connector has a second mode, called **CDP**, that connects to Chrome's developer tools instead of going through your Etch tab. It can do a few things the normal mode can’t — take screenshots, read rendered HTML, and check the final computed styles of an element. It’s mainly useful for letting an agent *verify* its own work visually.

To use it, start Chrome with remote debugging enabled (`--remote-debugging-port=9222`) and add `--cdp` to the commands below.

| Command | What it does |
| --- | --- |
| `etch-connector shot [-s selector] [-o file]` | Save a screenshot of the page, or of one element. |
| `etch-connector html <selector>` | Return the rendered HTML for an element. |
| `etch-connector computed <selector> [--props a,b,c]` | Return the final, computed CSS for an element. |

### Examples

```bash
etch-connector shot --cdp -t etch -s .orbit -o orbit.png
etch-connector computed --cdp -t etch -s .orbit__chip --props transform,animation-duration
```
