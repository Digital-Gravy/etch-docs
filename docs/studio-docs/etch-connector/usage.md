---
title: Usage
sidebar_position: 20
last_update:
  date: 2026-06-22
---

# Usage

You connect Etch to your AI agent from chat. There's nothing to install — you paste one command into your AI agent and click a button in the builder.

## 1. Turn on the AI Connector (once)

Connecting relies on Etch's **AI Connector** feature, which is off by default. In the Etch builder, open **Settings**, go to the **AI** section, and turn on **AI Connector** (it's experimental). This adds the connect button you'll use in step 3. You only need to do this once — it stays on. The setting and connector require the `aiConnector.use` permission; client-role users cannot use the AI Connector.

## 2. Open the page in the Etch builder

Open the page or template you want to work on **in the Etch builder**, and leave that tab open while you work. The builder itself has to be on screen — editing a page or template in Etch — not just the front end of your site.

## 3. Connect

1. In the Etch builder toolbar, click the **AI sparkles** button (its tooltip reads _"Connect external AI agent"_). The button is waiting for the connector to start — it won't light up yet.

2. In your AI agent’s chat (Claude Code, Codex, Opencode, or similar), paste and send:

   ```bash
   npx @digital-gravy/etch-connector serve
   ```

   Your agent runs this for you — you don't need a separate terminal or a global install.

3. Once the agent confirms the connection, the sparkles button in the builder lights up. You're linked — describe what you want in chat ("add a hero section to the homepage", "create a card component", …) and the agent builds it in your open tab.

Click the sparkles button again any time to disconnect.

### Connect manually from the console

For advanced use, start the connector as above, then run this in the **builder tab's browser console** instead of clicking the AI button:

```js
const connection = window.etch.connectAs("homepage");
```

The name identifies this tab in `etch-connector tabs` and can be used with `etch-connector eval -t homepage`. The toolbar button always uses the default URL. If the connector was started with a custom `--ws-port`, connect manually and pass the same port:

```js
const connection = window.etch.connectAs("homepage", { port: 7441 });
```

Keep the returned handle to check `connection.connected` or call `connection.close()` to disconnect and stop reconnecting. A connected socket does not grant script execution permission: Studio still checks `aiConnector.use` for pushed scripts. The toolbar button controls its own connection, not this manually opened one. See the [`connectAs()` reference](../public-api/index.md#connecting-an-external-tool) for options and security guidance.

## Multi-Agent & Maintaining Connection

The connection requires the connector's `serve` process to keep running. You can start new chats and use the same running connector without starting it again. Whether closing the original chat stops the process depends on your agent and how it manages that process.

The connection also lives in your open builder tab. Don't close or navigate away from the Etch builder tab — that ends the connection.

You can work on multiple sites at the same time — connect a builder tab on each site and the agent can switch between them. Do not connect multiple builder tabs on the same site. Stick to one connected tab per site.

## Troubleshooting

### The connect button isn't in the toolbar

The button only appears when the **AI Connector** setting is on and your account has `aiConnector.use` permission. In the builder, open **Settings → AI** and turn on **AI Connector**, then look for the AI sparkles button in the toolbar. Client-role users cannot use the AI Connector.

### It worked before, but a chat can't reach Etch

Check that the connector's `serve` process is still running. If it stopped, run `npx @digital-gravy/etch-connector serve` again. If the sparkles button is still lit in the builder, you don't need to click it again. An open connection does not grant `aiConnector.use`: Studio refuses script execution for accounts without that permission.
