---
title: Troubleshooting
sidebar_position: 70
---

# Troubleshooting

Start with the error shown by the form or in the database.

## `Origin not allowed`

The browser's exact origin is missing from `SITE_DOMAIN`.

1. Open the page that contains the form.
2. Copy the origin from the address bar.
3. Open the client forms Worker in Cloudflare.
4. Select **Settings**.
5. Find **Variables and Secrets**.
6. Edit `SITE_DOMAIN`.
7. Add the copied origin.
8. Separate multiple origins with commas.
9. Select **Deploy**.
10. Test the published form again.

For example:

```text
https://example.com,https://www.example.com
```

The endpoint rejects requests with no browser origin. Test through the published
site, not by opening `/api/contact` directly.

## The submission is saved, but email does not arrive

First check the delivery record:

1. Open the client's D1 database.
2. Select **Tables**.
3. Open `form_submissions`.
4. Find the submission.
5. Check whether `status` is `mail_failed`.
6. Open `mail_log`.
7. Find the matching `submission_id`.
8. Read the `error` value.

[Screenshot: Failed mail_log entry and error value]

Then check the mailer:

1. Confirm that the shared Worker is named exactly `etch-mailer`.
2. Confirm that the client Worker's `MAILER` service binding points to
   `etch-mailer`.
3. Confirm that the mailer's Email Sending binding is named `EMAIL`.
4. Confirm that the mailer's `SENDING_DOMAIN` contains only the domain.
5. Check the recipient's spam folder.
6. Send another test submission.

The submission stays in D1 even when notification delivery fails.

## The sending domain is not verified

Errors such as `E_SENDER_NOT_VERIFIED` or
`E_SENDER_DOMAIN_NOT_AVAILABLE` mean Cloudflare cannot send from the configured
domain.

1. Go to **Compute > Email Service > Email Sending**.
2. Confirm that the domain has been onboarded.
3. Open the domain's **Settings**.
4. Confirm that every sending DNS record is configured.
5. Wait if the records were added recently.
6. Open the `etch-mailer` Worker.
7. Confirm that `SENDING_DOMAIN` matches the onboarded domain.
8. Submit the form again.

[Screenshot: Email Sending domain status and DNS records]

DNS changes usually finish in 5 to 15 minutes, but can take up to 24 hours.

## The form returns `429`

`429` means one visitor has sent too many requests.

- `Too many requests. Try again in a minute.` comes from the burst limit of
  three attempts per minute.
- `Too many submissions. Try again later.` comes from the limit of five valid
  submissions per hour.

1. Stop submitting the form.
2. Wait for the stated time window.
3. Submit one valid test.

If normal visitors reach the limit, review
[Change the rate limits](manage-submissions.md#change-the-rate-limits).

## The forms Worker does not deploy

The service binding cannot connect until the mailer exists.

1. Confirm that the mailer deployment finished.
2. Confirm that its Worker name is exactly `etch-mailer`.
3. Return to the client Worker's failed build.
4. Confirm that the service binding is named `MAILER`.
5. Confirm that it targets `etch-mailer`.
6. Confirm that the D1 binding is named `DB`.
7. Retry the deployment.

[Screenshot: Failed build details with the retry control]

:::note
Cloudflare's current public docs explain Workers Builds, but the exact location
of the retry control can change. Confirm this screenshot and path during a real
deployment.
:::

## The Worker home page works, but the form fails

1. Confirm that the form action ends in `/api/contact`.
2. Confirm that the form method is `POST`.
3. Confirm that the required fields are named `name`, `email` and `message`.
4. Confirm that the message has at least 10 characters.
5. Confirm that the hidden `website` field is empty.
6. Confirm that the test runs on the published site.
7. Check `SITE_DOMAIN` for the published site's exact origin.

If Turnstile is enabled, also confirm that the form sends
`cf-turnstile-response`.

## `Invalid request body`

The endpoint accepts standard form data, multipart form data and JSON.

1. Remove any custom `Content-Type` value from the form script.
2. Send a browser `FormData` object directly if you use JavaScript.
3. Test the form again.

The browser sets the correct multipart boundary automatically.

## `Submission rejected`

The hidden honeypot contains a value.

1. Find the field named `website`.
2. Confirm that its default value is empty.
3. Confirm that password managers or scripts do not fill it.
4. Test the form again.
