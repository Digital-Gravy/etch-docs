---
title: Manage Submissions
sidebar_position: 50
---

# Manage submissions

Every client has a separate D1 database named `client-<slug>`. A submission is
saved before the Worker asks the mailer to send its notification, so you can
still find a message when email delivery fails.

## View submissions

1. Open the
   [D1 SQL database page](https://dash.cloudflare.com/?to=/:account/workers/d1)
   in the Cloudflare dashboard.
2. Select the client's `client-<slug>` database.
3. Select **Tables**.
4. Select `form_submissions`.
5. Open the row you want to read.

[Screenshot: form_submissions table for one client database]

Cloudflare's table browser shows these useful columns:

- `name`, `email`, `phone`, `company` and `message` contain the submitted
  contact details.
- `status` is `sent` when the notification was delivered to Cloudflare Email
  Sending or `mail_failed` when delivery failed.
- `created_at` is the submission time.
- `id` is the submission's unique reference.

The `fields_json` column contains the same accepted form values in one JSON
object.

## View the email-delivery log

1. Stay in the same client database.
2. Select **Tables**.
3. Select `mail_log`.
4. Match `submission_id` to the `id` in `form_submissions`.
5. Read `status` and `error`.

[Screenshot: mail_log table with a sent and failed entry]

The delivery log records the recipient, Cloudflare message ID and any returned
error. It does not contain the email body.

## What personal data is stored

The client database stores the submitted contact details, message, browser user
agent and a one-way hash used for the hourly rate limit. It does not store the
visitor's raw IP address.

Etch Forms does not automatically delete old submissions. Your agency is
responsible for setting a retention policy that fits the client's privacy
requirements.

## Change the notification recipient

1. Open the client's forms Worker in Cloudflare.
2. Select **Settings**.
3. Find **Variables and Secrets**.
4. Edit `RECIPIENT_EMAIL`.
5. Enter the new email address.
6. Select **Deploy**.
7. Send a test submission.

[Screenshot: RECIPIENT_EMAIL in Variables and Secrets]

This change affects new notifications only. Existing database rows keep their
original delivery history.

## Change the allowed domains

1. Open the client's forms Worker in Cloudflare.
2. Select **Settings**.
3. Find **Variables and Secrets**.
4. Edit `SITE_DOMAIN`.
5. Enter the allowed origins separated by commas.
6. Select **Deploy**.
7. Test from every live site address.

[Screenshot: SITE_DOMAIN in Variables and Secrets]

Use complete origins when there is more than one:

```text
https://example.com,https://www.example.com
```

The match is exact. `https://example.com` does not allow
`https://www.example.com`, and neither value allows an `http://` origin.

## Change the rate limits

Etch Forms has two rate limits:

1. `BURST_LIMITER` allows three attempts per minute from one visitor.
2. The D1 check allows five valid submissions per hour from one visitor.

These values are part of the copied source code, not dashboard variables. A
source change causes Workers Builds, Cloudflare's automatic build service, to
deploy the new version.

### Change the one-minute limit

1. Open the copied client forms repository.
2. Open `wrangler.jsonc`.
3. Find the `BURST_LIMITER` entry under `ratelimits`.
4. Change `limit` from `3` to the allowed number of attempts.
5. Change `period` only if you want a different window in seconds.
6. Commit the change to the production branch.
7. Wait for the Cloudflare build to pass.
8. Test the form.

### Change the hourly limit

1. Open the copied client forms repository.
2. Open `src/index.ts`.
3. Find `const HOURLY_LIMIT = 5`.
4. Replace `5` with the allowed number of valid submissions.
5. Commit the change to the production branch.
6. Wait for the Cloudflare build to pass.
7. Test the form.

:::caution
Changing the source is an advanced task. Ask a developer to review the change
if your agency does not normally edit code. A very high limit weakens spam
protection.
:::
