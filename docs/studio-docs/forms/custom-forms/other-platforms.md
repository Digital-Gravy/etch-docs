---
title: Other Automation Platforms
sidebar_position: 30
---

# Other automation platforms

The [Make guide](make.md) is the full walkthrough for sending your own form to
an automation platform. Zapier, Pipedream and n8n work the same way: the form
posts to a **webhook**, and a workflow handles each submission.

So start from the Make guide and keep what doesn't change:

- **[1. Write the form](make.md#1-write-the-form)**: the same HTML.
- **[2. Style it](make.md#2-style-it)**: the same CSS.
- **[4. Wire it up](make.md#4-wire-it-up)**: the same JavaScript, with your
  platform's webhook address. Zapier is the one exception, below.

What changes is step 3, setting up the webhook, and that's what this page
covers for each platform.

## At a glance

|                        | [Zapier](#zapier)                    | [Pipedream](#pipedream)                   | [n8n](#n8n)                                   |
| ---------------------- | ------------------------------------ | ----------------------------------------- | --------------------------------------------- |
| **Cost**               | Webhooks need a paid plan            | Free plan                                 | Free to self-host; n8n Cloud is paid          |
| **Answer to the form** | Always the same; can't be customised | Yours: `{ success, errors }`              | Yours: `{ success, errors }`                  |
| **JavaScript in Etch** | A shorter version, below             | The Make guide's, unchanged               | The Make guide's, unchanged                   |
| **Choose it when**     | Your team already runs on Zapier     | You want free, and don't mind a code step | You want free, unlimited, and your own server |

All three keep the same response shape as the Make guide, except Zapier:

```json
{ "success": false, "errors": { "email": "That email address does not look right." } }
```

## Zapier

[Zapier](https://zapier.com) ·
[Webhook docs](https://help.zapier.com/hc/en-us/articles/8496288690317)

> **💡 Webhooks need a paid Zapier plan:** Professional, Team or Enterprise.

### Set up the webhook

1. Click **Create** → **Zaps**.
2. For the trigger, choose **Webhooks by Zapier**, then the event **Catch
   Hook**, and click **Continue**.
3. On the **Test** tab, copy the webhook URL:
   `https://hooks.zapier.com/hooks/catch/1234567/abcdefg/`.
4. Submit your form once from the deployed page, then click **Test trigger** so
   Zapier learns the field names.
5. Add your actions (Gmail, Slack, Google Sheets, a CRM), map the fields, and
   **Publish** the Zap.

### What's different in the JavaScript

Zapier always answers "received", so it can't send errors back. Two changes
follow:

- **Validate in the browser.** Remove `novalidate` from the form and add
  `required` to the fields that need it, so the browser checks them before
  sending.
- **Send form data, not JSON.** A JSON request from a browser is blocked by
  Zapier (a CORS error). Form data goes through.

Use this handler in the **Javascript** panel instead of the Make guide's:

```js title="Javascript panel"
const WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/1234567/abcdefg/';

const form = document.querySelector('#contact-form');
const status = form.querySelector('.form-status');
const button = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
	event.preventDefault();

	const data = new FormData(form);

	// The spam trap: only a bot fills this in. Pretend it worked.
	if (data.get('company')) {
		status.textContent = 'Thanks! We will be in touch.';
		return;
	}
	data.delete('company');

	button.disabled = true;
	status.textContent = 'Sending…';

	try {
		await fetch(WEBHOOK_URL, { method: 'POST', body: data, mode: 'no-cors' });
		form.reset();
		status.textContent = 'Thanks! We will be in touch.';
	} catch (error) {
		console.error(error);
		status.textContent = 'Something went wrong. Please try again.';
	} finally {
		button.disabled = false;
	}
});
```

`mode: 'no-cors'` sends the request without reading Zapier's reply, which is
always the same anyway.

## Pipedream

[Pipedream](https://pipedream.com) ·
[Trigger docs](https://pipedream.com/docs/workflows/building-workflows/triggers)

### Set up the webhook

1. Create a new **workflow**.
2. For the trigger, choose **HTTP / Webhook** → **New Requests**.
3. Under **HTTP Response**, choose **Return a custom response from your
   workflow**.
4. Copy the endpoint: `https://eo1a2b3c4d5e6f.m.pipedream.net`. This is the
   `WEBHOOK_URL` in the Make guide's JavaScript.

### Check the fields and answer the form

Add a **Node.js** code step after the trigger, with this code:

```js title="Pipedream code step"
export default defineComponent({
	async run({ steps, $ }) {
		const { name = '', email = '', message = '', company = '' } = steps.trigger.event.body ?? {};
		const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

		// The spam trap: answer as if it worked, and stop here.
		if (company) {
			await $.respond({ status: 200, headers, body: { success: true } });
			return $.flow.exit('Spam');
		}

		const errors = {};
		if (!name.trim()) errors.name = 'Please tell us your name.';
		if (!email.trim()) errors.email = 'Please enter your email.';
		else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
			errors.email = 'That email address does not look right.';
		if (!message.trim()) errors.message = 'Please write a message.';

		if (Object.keys(errors).length > 0) {
			await $.respond({ status: 200, headers, body: { success: false, errors } });
			return $.flow.exit('Invalid submission');
		}

		await $.respond({ status: 200, headers, body: { success: true } });
		return steps.trigger.event.body;
	}
});
```

- **`$.respond()`** sends the answer to the form.
- **`$.flow.exit()`** stops the workflow for spam and invalid submissions, so
  your actions only run for good ones.

Then add your actions after the code step, using its return value (for example
`steps.code.$return_value.email`), and click **Deploy**.

## n8n

[n8n](https://n8n.io) ·
[Webhook node docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

### Where to run it

n8n has to be reachable from the internet over HTTPS. Use
[n8n Cloud](https://n8n.io/pricing/) (paid, with a trial), or run the free
Community Edition on your own server; n8n's
[hosting guides](https://docs.n8n.io/hosting/) cover it, with
[Docker Compose](https://docs.n8n.io/hosting/installation/server-setups/docker-compose/)
as the recommended setup.

### Set up the webhook

The workflow is four nodes before your actions:

```text
Webhook  →  Code  →  Respond to Webhook  →  If  →  your actions
```

1. **Webhook** node:
   - **HTTP Method**: `POST`.
   - **Respond**: **Using 'Respond to Webhook' Node**.
   - **Options** → **Allowed Origins (CORS)**: your site's address, for example
     `https://www.example.com`.
   - Copy the **Production URL**. This is the `WEBHOOK_URL` in the Make guide's
     JavaScript.
2. **Code** node (JavaScript):

   ```js title="n8n Code node"
   const { name = '', email = '', message = '', company = '' } = $input.first().json.body ?? {};

   const errors = {};
   if (!name.trim()) errors.name = 'Please tell us your name.';
   if (!email.trim()) errors.email = 'Please enter your email.';
   else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
   	errors.email = 'That email address does not look right.';
   if (!message.trim()) errors.message = 'Please write a message.';

   const spam = Boolean(company);
   const valid = Object.keys(errors).length === 0;

   return [
   	{
   		json: {
   			success: spam || valid,
   			errors: spam ? {} : errors,
   			save: valid && !spam,
   			name,
   			email,
   			message
   		}
   	}
   ];
   ```

3. **Respond to Webhook** node: **Respond With** **JSON**, and as the
   **Response Body** expression:

   ```text
   {{ JSON.stringify({ success: $json.success, errors: $json.errors }) }}
   ```

4. **If** node: condition `{{ $json.save }}` is true. Add your actions on its
   **true** branch, so they only run for real, valid submissions.
5. **Publish** the workflow. The Production URL only works once it's published.

## Troubleshooting

**Zapier: the console shows a CORS error.** The request is sent as JSON. Use the
form data handler above.

**Pipedream: the endpoint answers with a 400 error.** The code step didn't reach
`$.respond()`. Open the event in Pipedream to see where it stopped.

**n8n: CORS error, or no execution.** Check **Allowed Origins (CORS)** matches
your site exactly, that the script uses the **Production URL**, and that the
workflow is published.

For everything else (the form, the JavaScript, testing), see the
[Make guide's troubleshooting](make.md#troubleshooting).
