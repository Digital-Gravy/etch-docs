---
title: Deploy
sidebar_position: 75
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-11-24
---

# Deploy

`etch.deploy` (`EtchDeployApi`) saves the current editor changes, builds the site, and publishes it to Cloudflare. For hosting setup and what the build includes, see [Deploying](../deploying/README.md).

## Availability

The namespace is optional. Check the `deploy` capability and the namespace before calling it:

```ts
if (etch.environment?.capabilities.deploy === true && etch.deploy) {
  const result = await etch.deploy.deployAsync();
  if (result.url) console.log(result.url);
}
```

A supported runtime can still need deployment settings or permissions before a deploy succeeds.

## Deploying

```ts
interface EtchDeployApi {
  deployAsync(): Promise<EtchDeployResult>;
}

interface EtchDeployResult {
  url?: string;
}
```

`deployAsync()` saves first, so a failed save prevents the deploy. It then builds and uploads the site. The promise resolves when Cloudflare accepts the deploy; the URL can take a few more seconds to respond.

The optional `url` is the primary custom domain when one is attached, or the `workers.dev` URL otherwise. It can be absent when Cloudflare does not provide one.

## Errors

- `DEPLOY_BLOCKED` means the hosting setup needs the user to act, for example to configure or renew credentials or grant permissions. The error message describes the blocker; see [Deployment settings](../deploying/README.md#deploying-to-cloudflare).
- `OPERATION_FAILED` means a deploy is already running, or the build or upload failed.
- The initial save can also reject with an ordinary `Error`, for example if this tab cannot save. Do not assume every rejection is an `EtchApiError`.
