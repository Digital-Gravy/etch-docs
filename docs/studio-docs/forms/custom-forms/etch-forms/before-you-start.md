---
title: Before You Start
sidebar_position: 20
---

# Before you start

Gather the accounts and details below before you deploy Etch Forms.

## 1. Check your Cloudflare account

Cloudflare hosts the Workers, databases and email delivery used by Etch Forms.

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Sign in to the account your agency will use for all client sites.
3. Confirm that you can open the account without an access error.

[Screenshot: Cloudflare account home after signing in]

You also need a GitHub or GitLab account. Cloudflare copies each Etch Forms
template into that account so it can build and update the Worker.

## 2. Check your sending domain

The **sending domain** is the domain after the `@` in the notification sender.
For example, if notifications come from `forms@agency.com`, the sending domain
is `agency.com`.

Cloudflare Email Sending requires the domain to use
[Cloudflare DNS](https://developers.cloudflare.com/dns/). DNS is the system
that connects a domain name to services on the internet.

1. In the Cloudflare dashboard, confirm that the agency domain appears in your
   account.
2. Open the domain.
3. Confirm that Cloudflare shows the domain as active.
4. Open the domain's DNS records.
5. Confirm that Cloudflare is managing the records.

[Screenshot: Active agency domain in Cloudflare]

If the domain is missing or not active, add it to Cloudflare and update its
nameservers before continuing. Follow
[Cloudflare's domain setup guide](https://developers.cloudflare.com/fundamentals/setup/manage-domains/add-site/).

## 3. Check the Workers plan

Sending notifications to arbitrary client email addresses requires the
**Workers Paid plan**. This is Cloudflare's paid plan for Workers.

1. Open
   [Cloudflare's Workers pricing page](https://developers.cloudflare.com/workers/platform/pricing/).
2. Confirm the current Workers Paid price and included usage.
3. In the Cloudflare dashboard, check whether the agency account already has
   Workers Paid.
4. Upgrade the account if it is still on Workers Free.

[Screenshot: Workers plan shown for the agency account]

At the time this guide was written, Workers Paid had a minimum charge of
$5 USD per month. Cloudflare Email Sending included 3,000 outbound emails per
account each month, then charged $0.35 per 1,000 additional emails. Check the
[current Email Sending pricing](https://developers.cloudflare.com/email-service/platform/pricing/)
before quoting a client.

:::note
Cloudflare changes dashboard layouts from time to time. Its current public
documentation confirms the plan requirement and pricing, but does not give one
stable dashboard path for viewing the account's Workers subscription.
:::

## 4. Gather the agency details

Write down:

1. The sending domain, such as `agency.com`.
2. The GitHub or GitLab account that should own the copied repositories.

The sender will be `forms@your-sending-domain`. That mailbox does not need to
exist. Replies go to the email address entered by the person who submitted the
form.

## 5. Gather each client's details

For every client, write down:

1. A short lowercase name, called a **slug**, such as `acme`.
2. The site's friendly name, such as `Acme Dental`.
3. Every live website origin, such as `https://acmedental.com` and
   `https://www.acmedental.com`.
4. The email address that should receive notifications.

An **origin** includes `https://` and the exact hostname. A site using both the
`www` and non-`www` address needs both origins.

Next, [install the shared mailer](install-mailer.md).
