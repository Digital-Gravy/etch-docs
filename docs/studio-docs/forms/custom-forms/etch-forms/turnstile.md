---
title: Optional Spam Protection
sidebar_position: 60
---

# Optional spam protection with Turnstile

[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) checks
whether a submission is likely to come from a person rather than an automated
bot. It is optional because Etch Forms already checks the origin, a hidden
honeypot and two rate limits.

Turnstile gives you two values:

- A **sitekey** is a public identifier placed in the form.
- A **secret key** is a private value stored only in the forms Worker.

Do not add the secret to the Worker until the form sends a Turnstile response.
Once the secret exists, every submission without a valid response is rejected.

## 1. Create the Turnstile widget

1. Open the
   [Turnstile page](https://dash.cloudflare.com/?to=/:account/turnstile) in the
   Cloudflare dashboard.
2. Select **Add widget**.
3. Enter a descriptive widget name, such as `Acme contact form`.
4. Add the client's live hostname.
5. Add the `www` hostname if the site uses it.
6. Choose **Managed** widget mode.
7. Select **Create**.
8. Copy the sitekey.
9. Copy the secret key to a secure password manager.

[Screenshot: Turnstile widget settings for a client site]

Managed mode lets Cloudflare decide how much interaction a visitor needs.

## 2. Add Turnstile to the Etch form

1. Open the form in Etch Studio.
2. Open the **HTML** panel.
3. Add the Turnstile script inside `<etch:head>`.
4. Add the widget inside the `<form>`.
5. Replace `YOUR_SITEKEY` with the public sitekey.

```html title="HTML panel"
<etch:head>
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js"
		async
		defer
	></script>
</etch:head>

<form
	action="https://forms-acme.your-subdomain.workers.dev/api/contact"
	method="POST"
>
	<!-- Your name, email, message and website fields -->

	<div class="cf-turnstile" data-sitekey="YOUR_SITEKEY"></div>
	<button type="submit">Send message</button>
</form>
```

Turnstile automatically adds a form value named `cf-turnstile-response`. The
forms Worker already knows how to verify that value.

## 3. Publish the form

1. Publish the Etch site.
2. Open the live form.
3. Confirm that the Turnstile widget loads.

[Screenshot: Turnstile widget inside the published Etch form]

Do not continue until the widget works on the live hostname.

## 4. Add the secret to the forms Worker

1. Open the client's forms Worker in Cloudflare.
2. Select **Settings**.
3. Find **Variables and Secrets**.
4. Select **Add**.
5. Choose the **Secret** type.
6. Enter `TURNSTILE_SECRET` as the variable name.
7. Paste the secret key as the value.
8. Select **Deploy**.

[Screenshot: TURNSTILE_SECRET added as a secret]

A Cloudflare **secret** is an encrypted Worker variable whose saved value cannot
be viewed again in the dashboard.

## 5. Test the protection

1. Open the published form.
2. Complete the Turnstile check if it appears.
3. Submit a valid message.
4. Confirm that the message is accepted.
5. Confirm that the notification arrives.

If valid submissions return `Verification failed. Please try again.`, confirm
that the widget hostname matches the published site and that the correct secret
was added to this client's Worker.

## Turn Turnstile off

1. Open the client's forms Worker in Cloudflare.
2. Select **Settings**.
3. Find **Variables and Secrets**.
4. Delete `TURNSTILE_SECRET`.
5. Select **Deploy**.
6. Remove the Turnstile widget from the Etch form.
7. Remove the Turnstile script from the Etch form.
8. Publish the site again.
