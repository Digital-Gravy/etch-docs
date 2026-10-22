---
title: CLI Reference
sidebar_position: 30
last_update:
  date: 2026-10-22
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
  etch-connector upload   <file…> [-t name] [--alt text] [--collection id] [--compress webp:80[:maxWidth]] [--cdp]
  etch-connector download <id…>   [-t name] [-o|--out dir|file] [--force] [--cdp]
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

### `upload`

Stores files from your computer in the project's asset library, the same one the Asset Manager shows, and prints each stored asset. Its `id` is what an image block's `mediaId` takes.

```bash
etch-connector upload <file…> [-t name] [--alt text] [--collection id] [--compress webp:80[:maxWidth]]
```

| Option | What it does |
| --- | --- |
| `--alt` | Alt text for the image. Describes one image, so it takes **one file per command**. |
| `--collection` | Put the files into this collection (by id). |
| `--compress` | Re-encode before storing: a format (`webp`, `avif`, `jpeg`, `png`), then optionally a quality (0–100) and a maximum width, e.g. `webp:80:2400`. Never enlarges. |
| `--timeout` | How long to wait, in milliseconds. Defaults to 4 minutes, since compressing a large photo takes a while. |

A file over **24.9 MiB** is refused before anything is sent. With `--compress` the limit applies to the compressed result, so an original up to 60 MiB may go.

```bash
etch-connector upload ./hero.jpg --alt "Team on the roof" --compress webp:80:2400
```

:::note Etch Studio
`upload` and `download` work where the runtime backs the `assets` capability, which today is Etch Studio. Elsewhere they stop with "this runtime has no etch.assets".
:::

### `download`

Writes assets' files to your computer and prints where each one went.

```bash
etch-connector download <id…> [-t name] [-o|--out dir|file] [--force]
```

| Option | What it does |
| --- | --- |
| `-o`, `--out` | A folder (the asset's own name goes inside it) or, for a single id, the file path. A trailing slash (`out/`, or `out\` on Windows) creates the folder if needed. Defaults to the current folder. |
| `--force` | Overwrite a file that already exists. Without it, `download` refuses. |

`download` also refuses a file name starting with `.`, since the name comes from the tab.

```bash
etch-connector download 12 --out /tmp/hero.webp
```

:::caution A timeout doesn't mean nothing was stored
If an `upload` times out, the tab may still finish storing the file. Check the asset list before uploading again.
:::

### Results: where they go

When `eval` runs, results come back in a predictable way so a tool can read them:

- The command's **result** is printed as the main output.
- Any **log messages** the script produced are printed separately.
- A **success/failure code** tells the agent whether it worked: `0` means success, `2` means the script hit an error, and `1` means something operational went wrong (the tab wasn't found, the request timed out, the connector wasn't reachable, or `upload`/`download` refused a file).

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
