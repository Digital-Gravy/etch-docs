---
title: Edit Control
sidebar_position: 85
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-11-24
---

# Edit Control

`etch.presence` (`EtchPresenceApi`) manages the project's edit lock. When edit control is enabled (`EDITOR_TAKEOVER`, on by default), one builder tab at a time holds control; other tabs cannot save. For the MCP workflow, see [Working alongside others](../mcp-server.md#working-alongside-others).

This is separate from [`etch.ai`](./ai.md), which shows an agent's activity in the builder but does not grant editing control.

## Availability

The namespace is optional. Check the `presence` capability and the namespace before calling it:

```ts
if (etch.environment?.capabilities.presence === true && etch.presence) {
  const granted = await etch.presence.requestControlAsync();
  console.log(granted);
}
```

## API

```ts
interface EtchPresenceApi {
  requestControlAsync(): Promise<boolean>;
  handOverControlAsync(options?: { save?: boolean }): Promise<void>;
}
```

## Requesting control

`requestControlAsync()` asks the current editor to hand over control. It resolves `true` when this tab can save, immediately if it already holds control. It resolves `false` if the editor declines or this tab leaves the project before receiving an answer.

When control is newly granted, the tab reloads shortly afterwards to load the last saved state. Stop the current script and continue only after the builder and `window.etch` are available again; changes made before the reload can be lost.

An editor who does not answer normally hands over after about 30 seconds. An unattended agent starts saving at that point, but the presence service can transfer control before a slow save finishes. This is not a timeout on the request itself: it can wait longer if the presence service is unreachable. When requesting control interrupts another person, check with the user first.

## Handing over control

When this tab holds control and is finished editing, call `handOverControlAsync()` to release it without waiting to be asked. A waiting tab can then take control; otherwise it is available to the next tab that connects or asks.

```ts
await etch.presence?.handOverControlAsync(); // saves first
```

The default is `save: true`. If the save rejects, the handover rejects without releasing control; a pending request may still be transferred by the presence service. Subscription-related save failures are reported in Studio but may not reject the save, so control can still be released without all changes saved. A save rejection can be an ordinary `Error`. Retry, or explicitly use `handOverControlAsync({ save: false })` to release without saving buffered changes; those changes will not be available to the next editor.

In Studio, the default call attempts to save even when the tab does not hold control, so it may reject rather than acting as a no-op. Call it when the tab holds control.
