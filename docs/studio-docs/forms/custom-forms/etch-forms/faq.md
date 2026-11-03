---
title: FAQ
sidebar_position: 80
---

# Frequently asked questions

## How much does Etch Forms cost?

Etch Forms is open source and has no Etch Forms subscription fee.

Cloudflare charges your agency for the services it uses. Sending to arbitrary
client recipients requires Workers Paid. At the time this guide was written:

- Workers Paid had a $5 USD monthly minimum per Cloudflare account.
- Email Sending included 3,000 outbound emails per account each month.
- Additional outbound email cost $0.35 per 1,000 messages.

Worker requests and D1 usage also follow Cloudflare's included allowances and
overage pricing. One shared paid account can host the mailer and multiple client
forms Workers.

Check the current
[Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/),
[Email Sending pricing](https://developers.cloudflare.com/email-service/platform/pricing/)
and [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) before
quoting a client.

## Where is submission data stored?

Each client's submissions are stored in that client's D1 database inside your
agency's Cloudflare account. The shared mailer stores no submission data.

The notification email passes through Cloudflare Email Sending and is delivered
to the configured recipient. Etch Forms has no separate hosted service that
receives a copy.

## Does Etch Forms store IP addresses?

It does not write raw IP addresses to D1. It stores a one-way SHA-256 hash made
from the visitor's IP address and the configured site origin. The forms Worker
uses that hash for the hourly rate limit.

The database also stores the submitted fields, browser user agent, delivery
status and timestamps.

## Does Etch Forms delete old submissions?

No. Submissions remain in D1 until your agency deletes them or deletes the
database.

Set a retention period with the client. Consider the type of data collected,
the client's privacy notice and applicable law. This guide is not legal advice.

## Can one mailer serve every client?

Yes. Deploy `etch-mailer` once in the agency account. Every client forms Worker
in that same account connects to it through a private service binding.

Each client still gets a separate forms Worker, D1 database, allowed-origin
list and recipient.

## Can a client use more than one recipient?

Not in the current template. `RECIPIENT_EMAIL` contains one address. Sending to
multiple recipients requires a reviewed source-code change.

## Can a client use both `www` and non-`www`?

Yes. Put both complete origins in `SITE_DOMAIN`, separated by a comma:

```text
https://example.com,https://www.example.com
```

## How do updates work?

The Deploy to Cloudflare button creates a separate copy of the selected template
in your GitHub or GitLab account. Cloudflare automatically deploys commits made
to that copied repository, but changes to the original Etch Forms template do
not flow into your copy automatically.

For an update:

1. Read the update notes in the
   [Etch Forms repository](https://github.com/kevingeary/etch-forms).
2. Identify whether the update changes the mailer, forms Worker or database.
3. Ask a developer to compare the template with each copied repository.
4. Back up client submission data before a database change.
5. Apply the documented source changes to the copied repository.
6. Run the template's typecheck, lint and test commands.
7. Commit the reviewed changes to the production branch.
8. Wait for the Cloudflare build to pass.
9. Send a test submission.

Do not click the deployment button over an existing client as an update method.
It can create another repository, Worker and database instead of updating the
existing installation.

## How do I remove one client site?

Removing the forms Worker stops new submissions. Deleting D1 permanently
removes the stored submissions.

1. Remove or replace the form action on the published Etch site.
2. Publish the site.
3. Export any submissions the client must retain.
4. Open the client's forms Worker in Cloudflare.
5. Use the Worker's delete action.
6. Open the client's `client-<slug>` D1 database.
7. Use the database's delete action.
8. Delete or archive the copied client repository in GitHub or GitLab.
9. Confirm that the old action URL no longer accepts submissions.

[Screenshot: Worker and D1 delete actions for one client]

:::caution
Database deletion cannot be undone. Confirm the backup before deleting D1.
:::

:::note
Cloudflare's dashboard labels and placement for destructive delete actions can
change. Confirm this screenshot and the current controls before publishing this
guide.
:::

Keep `etch-mailer` while any client forms Worker still uses it.

## How do I remove Etch Forms completely?

1. Remove every client using the steps above.
2. Confirm that no forms Worker still has a `MAILER` binding to `etch-mailer`.
3. Open `etch-mailer` in Cloudflare.
4. Use the Worker's delete action.
5. Delete or archive the copied mailer repository.
6. Remove the Email Sending domain only if no other application uses it.

## Can the forms Worker use a custom domain?

The standard setup uses the generated `workers.dev` URL shown on the Worker's
home page. Cloudflare Workers supports custom domains, but the Etch Forms deploy
template does not configure one. Keep the generated action URL unless a
developer sets up and tests a custom domain.
