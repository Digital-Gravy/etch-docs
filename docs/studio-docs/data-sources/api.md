---
title: API Sources
sidebar_position: 20
---

# API Sources

An API source is an HTTP request. Studio calls the URL, parses the JSON response,
and that response _is_ the value `data('key')` returns.

Use it for anything that lives in another system: a headless CMS, a booking
platform, a product catalogue, a public dataset.

## Creating one

In the Data Manager, select **+**, name the source, choose **API**, and create
it. The editor opens on the **Visual** view.

Fill in the request:

- **Method:** `GET` or `POST`.
- **URL:** the endpoint, e.g. `https://api.example.com/courses`.
- **Query Params:** a name/value table. Rows are a synchronised view of the URL's
  query string: editing a row rewrites the URL, editing the URL rewrites the
  rows. A row only enters the URL once it has a name. Use the trailing blank row
  to add one.
- **Headers:** a name/value table. Select **Add Header** for a new row, and the
  bin icon to remove one. Unnamed rows are ignored.

{/* TODO: screenshot of the API editor Visual view, with a URL filled in, two query param rows and an Authorization header */}

The preview pane resolves the request and shows the response as a tree. Use
**Reload** to fire the request again. The resolved value is cached, so without it
you'd keep seeing the previous response.

## Importing from cURL

The **cURL** tab beside **Visual** takes a `curl` command and fills in the form
from it. Most API documentation hands you one, and most HTTP clients will export
one, which makes this the fastest way to get a working request:

```sh
curl 'https://api.example.com/courses?limit=10' \
  -H 'Authorization: Bearer sk_live_…' \
  -H 'Accept: application/json'
```

Paste it in, and the URL, method, query params and headers land in the Visual
view ready to edit.

## The response

The response body is parsed as **JSON**. Whatever the endpoint returns is what
the source resolves to; Studio does not unwrap, rename or reshape it.

That means the shape is the API's, not yours. An endpoint returning

```json
{ "data": { "items": [ … ], "total": 42 } }
```

is read as:

<!-- prettier-ignore -->
```html
{#loop data('courses').data.items as course}
  <li>{course.name}</li>
{/loop}
```

The preview tree is the reliable way to see the real shape, and you reach into it
with dot notation and modifiers at the point of use. Reshaping the response inside
Studio isn't possible today: a [JavaScript source](javascript.md) can't make HTTP
requests, so it can't wrap the call for you.

## When a request fails

A non-`2xx` response is a failure. The source resolves to nothing and the Data
Manager shows the reason:

```text
404 Not Found from https://api.example.com/courses
```

Pages using the source render with that value empty rather than breaking.

A source with **no URL yet** isn't a failure, because there's nothing to call.
It's simply empty until you fill it in.

## Where the request runs

Two contexts, and the difference matters:

**In the builder**, the request is made by your browser. Normal browser rules
apply, including CORS and mixed-content restrictions. `localhost` refers to the
computer running your browser, so a local endpoint may be reachable if those
rules allow it.

**At deploy or download**, the request is made in the build environment, and
the response is **baked into the generated HTML**. In a remote build,
`localhost` refers to that environment, not your computer; an API running only
on your computer is not available there. Your deployed site is static: it does
not call the API when a visitor arrives. To publish updated data, deploy again.

If you need data that's live per visitor, an API source isn't the tool. That's a
job for client-side JavaScript on the deployed page.

## Credentials

Headers are how you authenticate, and they're stored with your project.

> **⚠️ Treat API source headers as project-visible.** Anyone who can open the
> project can read them in the Data Manager, and they are stored unencrypted
> today. Prefer read-only keys scoped to exactly what the source needs.

## Notes

- Arguments passed to `data('key', …)` don't change the request, since the URL is
  fixed. Each distinct set of arguments does get its own cache entry. A request
  that varies per call isn't something an API source can express today; create a
  source per variant, or filter the response at the point of use.
- The response is fetched **once per key per render** and reused. **Reload** in
  the preview is what re-fires it while you're editing.
- `POST` sends the method and headers, but the editor has no request-body field
  yet, so a `POST` today is a `POST` with no body.
