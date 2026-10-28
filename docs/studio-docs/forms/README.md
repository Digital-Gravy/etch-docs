---
title: Forms
sidebar_position: 137
---

# Forms

Etch Studio builds a **static site**, and forms fit right in: a service built
for forms receives the submissions, so there's no backend for you to write, host
or maintain.

Start from what you need the form to do.

## What do you need?

| I want…                                                       | Use                                                 | Guide                                          |
| ------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------- |
| **A working form in minutes**, with answers by email          | A free embedded form, such as Tally or Google Forms | [Embedding a form](embedding/README.md)        |
| **Leads in my CRM**, and an alert to the sales team           | My CRM's own form, such as HubSpot Forms            | [HubSpot Forms](embedding/hubspot.md)          |
| **A form that matches my design**, with answers by email      | My own form + a form backend                        | [Form backends](custom-forms/form-backends.md) |
| **A form that matches my design**, sending data to other apps | My own form + Make                                  | [Make](custom-forms/make.md)                   |

Not sure? Start with an embedded form. You can always move to your own form
later.

## The three ways to add a form

### 1. Embed a provider's form

A form service hosts the form. You copy its embed code into the **HTML** panel,
and it handles fields, validation, storage, spam and notifications.

- **Effort:** copy and paste.
- **Design:** styled in the provider's own editor.
- **Guides:** Google Forms, Microsoft Forms, Tally, Fillout, HubSpot Forms,
  Jotform and Typeform, all in [Embedding a form](embedding/README.md).

### 2. Your own form + a form backend

You write the form in the **HTML** and **CSS** panels, and it posts to a form
backend such as Web3Forms, which emails each submission to you.

- **Effort:** a few attributes and hidden fields, or a short script.
- **Design:** entirely yours.
- **Guide:** [Form backends](custom-forms/form-backends.md).

### 3. Your own form + an automation platform

You write the form, and it posts to a webhook on an automation platform. A
workflow you build sends each submission on: to your CRM, Slack, Google Sheets,
email, or all of them.

- **Effort:** a workflow on the platform, and a script in the **Javascript**
  panel.
- **Design:** entirely yours, including your own error messages.
- **Guides:** [Make](custom-forms/make.md), the recommended starting point, and
  [Other automation platforms](custom-forms/other-platforms.md) for Zapier,
  Pipedream and n8n.

Routes 2 and 3 are compared side by side in
[Building your own form](custom-forms/README.md).

## Good to know

Submissions are sent **from the visitor's browser** when they submit, not when
the site is built. This is the same build-time-versus-runtime split described in
[Deploying](../deploying/README.md). Two things follow:

- **The receiving service must accept requests from your site** (CORS). Form
  services and automation webhooks do this already.
- **Anything in the page is public.** A form endpoint or webhook address is
  readable by anyone who views the source, which is how these services are
  designed to work. Never put a secret, such as a private API key, in a form.
