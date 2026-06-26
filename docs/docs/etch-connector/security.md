---
title: Security
sidebar_position: 50
last_update:
  date: 2026-06-22
---

# Security

The connector is designed to stay on your own computer, and to keep the scripts it runs on a tight leash. Here's what that means in practice.

## Everything stays local

The connector only listens on `127.0.0.1` — your own machine. Other computers on your network (and the internet) can't reach it. Run it on a machine you trust, and don't deliberately open its ports up to other devices.

## Scripts run in a safe mode

When your agent sends a command, it runs in a restricted mode: the script can use Etch's `etch.*` API and standard JavaScript, but it's blocked from touching the wider page — things like `window`, `document`, network requests, and browser storage are off-limits.

This is a **guardrail, not a vault.** It reliably keeps everyday and AI-written scripts on the Etch API and blocks the obvious ways out, which is exactly what it's for. It is not built to contain deliberately malicious code — a determined attacker writing hostile scripts could still find a way around it.

:::caution Run trusted tools only
Treat the connector like any other developer tool on your machine: only connect AI agents and run scripts you trust, and keep its ports on your own computer.
:::
