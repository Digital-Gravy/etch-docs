---
title: AI Presence
sidebar_position: 90
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-30
---

# AI Presence

`etch.ai` (`EtchAiApi`) lets an external AI agent advertise that it is working in this tab and what phase it is in. Setting a non-idle state shows a presence overlay in the builder so the human watching the tab can see an agent is active; clearing it removes the overlay.

This is built for tooling driving the builder over the [AI Connector](../etch-connector/introduction.md). Scripts pushed over that bridge run with access to `window.etch` only — they can't dispatch DOM events or reach the page — so this namespace is the supported way to toggle presence.

:::info Synchronous and local
Both `getState()` and `setState()` are synchronous and never hit the network. Presence is in-memory UI state, so there is no `saveAsync()` involved and nothing is persisted across reloads.
:::

## etch.ai

```ts
interface EtchAiApi {
  getState(): ExternalAiState;
  setState(state: ExternalAiState): void; // shows/updates/hides the overlay
  hide(): void;                            // shorthand for setState("idle")
}

type ExternalAiState = "idle" | "working" | "waiting" | "thinking";
```

| State      | Overlay  | Meaning                                          |
| ---------- | -------- | ------------------------------------------------ |
| `idle`     | hidden   | No agent present (the default).                  |
| `working`  | shown    | The agent is actively editing the canvas.        |
| `waiting`  | shown    | The agent is waiting on the human.               |
| `thinking` | shown    | The agent is reasoning before it acts.           |

`setState()` **throws** `EtchApiError` with code `INVALID_ARGUMENT` for any value outside that union.

```ts
// Announce presence as work begins
etch.ai.setState("thinking");

etch.blocks.setText(id, "Draft");
etch.ai.setState("working");

// Hand back to the human
etch.ai.setState("waiting");

// Done — remove the overlay
etch.ai.hide(); // or etch.ai.setState("idle")
```

:::tip Always clear presence when you finish
Presence is just state you set — nothing clears it for you. Wrap a session in `try`/`finally` so the overlay never gets stuck on after a disconnect or error:

```ts
etch.ai.setState("working");
try {
  // …drive the builder…
} finally {
  etch.ai.hide();
}
```
:::
