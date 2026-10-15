---
title: Forms
sidebar_position: 137
---

# Forms

Etch Studio builds a **static site**: every page is rendered ahead of time and
served as plain HTML. Submissions are handled by a service built for exactly
that, which means no backend to write, host or maintain.

Two ways to set one up.

## Two routes

| Route                                               | What you get                                                                | What you give up                                                  |
| --------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **[Embed a third-party form](embedding/README.md)** | Fields, validation, storage, spam protection and notifications, all managed | Control over the markup, and often over the styling               |
| **[Build your own](custom-forms.md)**               | Your exact markup, classes, validation and states                           | You wire up delivery yourself, by posting to a webhook you create |

Both end up as static output. Neither needs a backend from you.

## How to choose

- **You want a working contact form with the least setup.** Embed one — it's as
  simple as copy and paste.
- **The form has to match your design system.** Build your own. Embeds limit how
  far you can take the styling, and some can't be styled at all.
- **The submission has to land somewhere specific** — a CRM, a Slack channel, a
  spreadsheet. Either route can do it, but building your own puts you on an
  automation platform anyway, and that's where those integrations already live.

## What both routes share

The submission is sent **from the visitor's browser**, not from Studio and not
at build time. Two consequences worth knowing before you start:

- **The receiving endpoint must allow your site's origin** (CORS). Form services
  and automation webhooks normally do; your own API might not.
- **Anything in the page is public.** A form endpoint, a webhook URL or a public
  key is readable by anyone who views the source. Never put a secret in a form.

This is the same build-time-versus-runtime split described in
[Deploying](../deploying/README.md): data sources resolve when the site is built, while
a form runs when a visitor arrives.

## Next

- [Embedding a third-party form](embedding/README.md)
- [Building your own form](custom-forms.md)
