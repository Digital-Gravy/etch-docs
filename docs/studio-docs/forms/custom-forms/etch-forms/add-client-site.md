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

Use the following exact settings in **Set up your application**:

1. Set **Git account** to the agency's GitHub or GitLab account.
2. Turn on **Create private Git repository**.
3. Set **Project name** to `forms-<slug>`, such as `forms-acme`.
4. Set **SITE_NAME** to the friendly client name, such as `Acme Dental`.
5. Set **SITE_DOMAIN** to the live site origin, such as
   `https://acmedental.com`.
6. Set **RECIPIENT_EMAIL** to the address that should receive notifications.
7. Set the **D1 database name** to `client-<slug>`, such as `client-acme`.
8. Leave **Build command** completely empty.
9. Keep **Deploy command** as `npm run deploy`.
10. Keep **Preview command** as `npx wrangler preview`.
11. Turn off **Enable Preview builds**.
12. Leave **Protect with Cloudflare Access** off.
13. Select **Deploy**.

[Screenshot: Client forms Worker prompts completed before deployment]

### Why to use these settings

- **Git account** controls who owns the copied source repository. Use the same
  agency account that owns the mailer repository.
- **Create private Git repository** keeps the client's deployment copy and
  configuration out of public search.
- **Project name** becomes the repository and Worker project name. Give every
  client a unique `forms-<slug>` name.
- **`SITE_NAME`** is the name shown on the Worker's home page and in email
  subjects.
- **`SITE_DOMAIN`** is the only website origin allowed to submit the form. Add
  multiple origins later if the site uses both `www` and non-`www`.
- **`RECIPIENT_EMAIL`** is the inbox that receives the notification.
- **D1 database name** identifies the client's private submission storage. A
  unique `client-<slug>` name keeps each client's data separate.
- **Build command** is blank because this Worker has no separate compilation
  step.
- **Deploy command** first applies the included D1 database tables and then
  publishes the Worker. Do not replace it with the Cloudflare default.
- **Preview command** is Cloudflare's standard command for temporary branch
  previews. Leave the text unchanged even though preview builds are off.
- **Enable Preview builds** is off because previews need their own database and
  settings. This installation only needs the production Worker.
- **Protect with Cloudflare Access** must stay off. The client's public website
  needs to reach `/api/contact` without asking every visitor to sign in.

The template automatically creates these bindings:

- **`DB`** connects the Worker to the client's D1 database.
- **`MAILER`** connects privately to the shared `etch-mailer` Worker.
- **`BURST_LIMITER`** allows three attempts per minute from one visitor.

These binding names are not editable fields on the setup panel. Do not rename
them later.

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
