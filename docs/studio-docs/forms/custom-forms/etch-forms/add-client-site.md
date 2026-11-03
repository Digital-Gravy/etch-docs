---
title: Add a Client Site
sidebar_position: 40
---

# Add a client site

Repeat this guide once for every client. Each deployment creates a separate
forms Worker and D1 database while using the shared `etch-mailer`.

## 1. Choose the names

Use the same short client slug in the Worker and database names:

- Worker: `forms-<slug>`, such as `forms-acme`
- D1 database: `client-<slug>`, such as `client-acme`

Use lowercase letters, numbers and hyphens. Clear names make it easier to find a
client's Worker and submissions later.

## 2. Start the forms deployment

1. Confirm that `etch-mailer` is already deployed in the same Cloudflare
   account.
2. Open the button below in a new tab.

[![Deploy Etch Forms to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kevingeary/etch-forms/tree/main/forms)

3. Sign in to Cloudflare if asked.
4. Choose the same GitHub or GitLab owner used for the mailer.

[Screenshot: First Deploy to Cloudflare setup screen for a client forms Worker]

## 3. Complete the setup prompts

Enter these values when their prompts appear:

1. Name the copied repository, such as `forms-acme`.
2. Keep the production branch Cloudflare proposes.
3. Name the Worker `forms-<slug>`, such as `forms-acme`.
4. Set `SITE_NAME` to the friendly client name, such as `Acme Dental`.
5. Set `SITE_DOMAIN` to the live site origin, such as
   `https://acmedental.com`.
6. Set `RECIPIENT_EMAIL` to the address that should receive notifications.
7. Rename the proposed D1 database from `client-site` to `client-<slug>`.
8. Keep the D1 binding name as `DB`.
9. Keep the service binding name as `MAILER`.
10. Confirm that `MAILER` connects to `etch-mailer`.
11. Keep the rate limiter binding name as `BURST_LIMITER`.
12. Keep the detected deploy command as `npm run deploy`.
13. Leave the build command empty if Cloudflare leaves it empty.
14. Start the deployment.

[Screenshot: Client forms Worker prompts completed before deployment]

The technical values mean:

- **`SITE_NAME`:** The name shown on the Worker's home page and in email
  subjects.
- **`SITE_DOMAIN`:** The only website origin allowed to submit the form. Add
  multiple origins later if the site uses both `www` and non-`www`.
- **`RECIPIENT_EMAIL`:** The inbox that receives the notification.
- **D1 database:** The client's private submission storage.
- **`DB`:** The name the Worker code uses to reach that D1 database.
- **`MAILER`:** The private connection to the shared `etch-mailer` Worker.
- **`BURST_LIMITER`:** Cloudflare's fast check that allows three attempts per
  minute from one visitor.

The deploy command applies the included database tables before publishing the
Worker.

## 4. Copy the form action

1. Wait for the deployment to finish.
2. Open the new Worker's `workers.dev` URL.
3. Confirm that the page says the form service is healthy.
4. Select **Copy** beside the action URL.

[Screenshot: Forms Worker home page with healthy status and action URL]

The copied address ends in `/api/contact`. It looks like:

```text
https://forms-acme.your-subdomain.workers.dev/api/contact
```

## 5. Connect the Etch form

1. Open the client's form in Etch Studio.
2. Open the **HTML** panel.
3. Set the form's `action` to the copied address.
4. Set the form's `method` to `POST`.
5. Name the required fields `name`, `email` and `message`.
6. Add `phone` or `company` fields if needed.
7. Add a hidden field named `website`.
8. Leave the hidden field's value empty.

The form should follow this pattern:

```html title="HTML panel"
<form
	action="https://forms-acme.your-subdomain.workers.dev/api/contact"
	method="POST"
>
	<label for="contact-name">Name</label>
	<input id="contact-name" name="name" type="text" required />

	<label for="contact-email">Email</label>
	<input id="contact-email" name="email" type="email" required />

	<label for="contact-message">Message</label>
	<textarea id="contact-message" name="message" required></textarea>

	<input name="website" type="hidden" value="" />
	<button type="submit">Send message</button>
</form>
```

The message must contain at least 10 characters. The Worker also limits the
length of every accepted field.

## 6. Allow all live site origins

Skip this section if the client uses only the exact origin entered during
deployment.

1. Open the client forms Worker in Cloudflare.
2. Select **Settings**.
3. Find **Variables and Secrets**.
4. Edit `SITE_DOMAIN`.
5. Enter every live origin separated by a comma.
6. Select **Deploy**.

For example:

```text
https://example.com,https://www.example.com
```

[Screenshot: SITE_DOMAIN with www and non-www origins]

## 7. Test a submission

1. Publish the site.
2. Open the live page.
3. Fill in every required field.
4. Enter a message longer than 10 characters.
5. Submit the form once.
6. Confirm that the response contains `"ok": true` and a submission ID.
7. Confirm that the recipient receives the notification.
8. Reply to the notification.
9. Confirm that the reply is addressed to the person who filled in the form.

[Screenshot: Successful test response and notification email]

A plain HTML form opens the JSON response after submission. Add your own
JavaScript success message later if you want the visitor to stay on the page.

If the test fails, use [Troubleshooting](troubleshooting.md).
