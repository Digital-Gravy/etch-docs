---
title: Security
sidebar_position: 50
last_update:
  date: 2026-10-22
---

# Security

The connector is designed to stay on your own computer, and to keep the scripts it runs on a tight leash. Here's what that means in practice.

## Network access

By default, the connector listens on `127.0.0.1` — your own machine. The `--ws-host` and `--control-host` options can change the listening addresses and expose them to other devices. Run it on a machine you trust, and keep its ports local unless you understand the risk.

The HTTP control server rejects requests carrying a browser `Origin` header. The WebSocket listener used by builder tabs does not apply the same check, so do not assume every browser-originated connection is refused.

## Downloads don't overwrite your files

When the agent uses `download`, the file name can come from the Etch tab. The connector refuses a tab-supplied name starting with `.` (like `.bashrc`). It also refuses to overwrite an existing file unless the agent passes `--force`; `--force` does not permit tab-supplied dotfile names.

## Scripts run in a safe mode

The normal connector CLI runs scripts in a restricted safe mode: they can use Etch's `etch.*` API and standard JavaScript, but obvious access to the wider page — such as `window`, `document`, network requests, and browser storage — is blocked. Safe mode is not enforced by the server: a trusted control client or custom WebSocket server can request unsafe execution with full page access.

Safe mode is a **guardrail, not a vault**. It is not built to contain deliberately malicious code — a determined attacker writing hostile scripts could still find a way around it.

:::caution Run trusted tools only
Treat the connector like any other developer tool on your machine: only connect AI agents and run scripts you trust, and keep its ports on your own computer.
:::
