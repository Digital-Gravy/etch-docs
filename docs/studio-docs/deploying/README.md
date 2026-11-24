---
title: Deploying
sidebar_position: 10
---

# Deploying

Studio renders every page of your project to static HTML, CSS, JS and assets.
Two ways to get that out of the builder:

- **Download Site** in the action bar produces `site.zip`, the build as plain
  files, ready for any static host.
- **Deploy** publishes it directly to a hosting target you've connected.

**Cloudflare Workers is the deploy target available today.** More targets are
planned; deploying somewhere else in the meantime means downloading the build and
uploading it yourself.

Etch Studio never hosts your site. It builds the artifact; you own where it runs,
which is also why your site's uptime never depends on ours.

## What gets deployed

**Only content a route serves is published.** The [routes](../routing/README.md)
decide which pages and records go out, and at which URLs. A page no route serves
isn't in the build or in `sitemap.xml`. Routes are resolved at build time too,
so a new record picked up by a dynamic route gets its page on the next deploy.

Every page is rendered on the server, so **anything dynamic is resolved at build
time and baked into the output**. A [data source](../data-sources/README.md) that
calls an external API is fetched during the build, and the deployed site serves
whatever that call returned. To publish fresh data, deploy again.

## Deploying to Cloudflare

Studio publishes to a **Cloudflare Worker with static assets**, running on your
own Cloudflare account. Two ways to give it access:

| Method                                            | When to use it                                             |
| ------------------------------------------------- | ---------------------------------------------------------- |
| **[OAuth](#connect-with-oauth-recommended)**      | The default. Select a button, approve in Cloudflare, done. |
| **[API token](#configure-an-api-token-manually)** | When you want a scoped token you control.                  |

Either way, you also need a **Worker name**.

### Connect with OAuth (recommended)

1. In the builder, open **Settings** (bottom of the left rail).
2. Go to the **Deployment** tab.
3. Select **Connect Cloudflare** and approve the authorization.

Studio comes back with the connection stored, and fills in **Worker Name** from
your project's name if it was empty, so there's usually nothing left to
configure.

![The Deployment tab of Settings, showing the Cloudflare card with the Connect Cloudflare button](../images/settings-deployment-cloudflare.webp)

Once connected, the API Token and Account ID fields disappear, since they're what
OAuth replaces. **Reconnect Cloudflare** re-runs the flow; **Disconnect
Cloudflare** drops the connection.

A connection belongs to a **project**, so authorize each project separately even
when they all deploy to the same Cloudflare account.

### Configure an API token manually

Three values, all on **Settings → Deployment**.

**Account ID.** Sign in to the
[Cloudflare Dashboard](https://dash.cloudflare.com), select your account, and
copy the ID from the URL (`https://dash.cloudflare.com/<account-id>`) or from the
three-dot menu next to **+ Add**.

**API Token.** Go to
[API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token**
and create a custom token. Add permissions for the features you use:

| Feature | Permission |
| --- | --- |
| Deploy to Workers | **Account** → **Workers Scripts** → **Edit** |
| Find and select a custom domain | **Zone** → **Zone** → **Read** |
| Manage the redirect between a primary domain and its `www` or apex counterpart | **Zone** → **Dynamic URL Redirects** → **Edit** |

Scope the account permission to the account identified by your Account ID. For
the zone permissions, include the zones containing the domains you want Studio
to manage. The Workers Scripts permission also lets Studio attach a Worker
custom domain. The redirect permission is only needed when Studio manages a
redirect between the primary hostname and its counterpart.

Cloudflare's **Edit Cloudflare Workers** template grants additional permissions,
including access to Workers KV and R2; it is not equivalent to the custom token
above and does not list the zone permissions above. Review its permissions and
resources before using it. See Cloudflare's
[token templates](https://developers.cloudflare.com/fundamentals/api/reference/template/)
and [permissions reference](https://developers.cloudflare.com/fundamentals/api/reference/permissions/).

Create the token and copy it into Studio. Cloudflare only shows it once.

**Worker Name.** See below.

![The Deployment tab of Settings with the API Token, Account ID and Worker Name fields filled in](../images/settings-deployment-api-token.webp)

### Worker name

Any name works, like `my-site` or `acme-marketing`. The Worker is created on your
account the first time you deploy, and served at:

```text
https://<worker-name>.<your-subdomain>.workers.dev
```

If you'd rather create the Worker yourself in the Cloudflare dashboard, enter its
name here and Studio deploys into it.

Names are normalized to what Cloudflare accepts (lowercase, hyphens).

### Deploying

Select the **cloud upload** button in the action bar. It stays disabled until the
project has credentials _and_ a Worker name, and the tooltip then reads
"Configure Cloudflare settings first".

On success you get a toast with the live URL, and the **link** button beside it
opens the deployed Worker any time.

![The action bar's Download, Deploy and View Worker buttons](../images/action-bar-deploy.webp)

### Size limit

The total site must stay under **25 MB**, Cloudflare's limit for Workers static
assets. A deploy over the limit is refused before anything is uploaded, with the
actual size in the message. Large images are usually the cause; the Asset
Manager's compression presets are the first place to look.

### Troubleshooting

**The deploy button is disabled.** Missing credentials or a missing Worker name.

**"Deploy failed" with an authorization error.** For OAuth, use **Reconnect
Cloudflare** and approve the requested permissions. For a manual token, check that
the Account ID and the token's account scope match, and that it has **Workers
Scripts: Edit**. An authorization error can have other causes, so also check
Cloudflare's error details.

**Custom domains do not appear.** Confirm the domain's zone is in the Cloudflare
account and that the token has **Zone: Read** for that zone.

**The site deployed, but its primary-domain redirect failed.** Check that the
token has **Dynamic URL Redirects: Edit** for the domain's zone. With OAuth,
reconnect Cloudflare to grant any newly requested permissions. The site can deploy
even when the redirect cannot be updated.

**The site deployed but the data is stale.** Expected: data resolves at build
time. Deploy again.
