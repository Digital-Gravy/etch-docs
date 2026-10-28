---
title: Make
sidebar_position: 20
---

# Sending your form to Make

Build the form yourself and post it to a webhook on [Make](https://www.make.com).
Make receives each submission, checks it, answers the form, and passes the data
on to your CRM, inbox, spreadsheet or any other app it connects to.

Four steps:

1. **Write the form** in the HTML panel.
2. **Style it** in the CSS panel.
3. **Create a webhook** in Make, and decide what happens to the submissions.
4. **Wire it up** in the Javascript panel: validate, `POST`, show the result.

The result is still a static page. Nothing runs on a server of yours.

## 1. Write the form

Open the **HTML** panel and write the form. Nothing here is Etch-specific — it's
ordinary HTML, and that's the point.

Two things matter for what comes later:

- **Every field needs a `name`.** Those names become the keys of the JSON you
  send, and the keys the webhook reads.
- **Give the form an `id`,** so the JavaScript can find it.

<!-- prettier-ignore -->
```html
<form id="contact-form" novalidate>
  <div class="field">
    <label for="etch-form-name">Name</label>
    <input id="etch-form-name" name="name" type="text" autocomplete="name" />
    <span class="field-error" data-error-for="name"></span>
  </div>

  <div class="field">
    <label for="etch-form-email">Email</label>
    <input id="etch-form-email" name="email" type="email" autocomplete="email" />
    <span class="field-error" data-error-for="email"></span>
  </div>

  <div class="field">
    <label for="etch-form-subject">Subject</label>
    <input id="etch-form-subject" name="subject" type="text" />
    <span class="field-error" data-error-for="subject"></span>
  </div>

  <div class="field">
    <label for="etch-form-message">Message</label>
    <textarea id="etch-form-message" name="message" rows="6"></textarea>
    <span class="field-error" data-error-for="message"></span>
  </div>

  <!-- Spam trap: real people never fill this in. Hide it with CSS. -->
  <input class="honeypot" name="company" type="text" tabindex="-1" autocomplete="off" />

  <button type="submit">Send message</button>

  <p class="form-status" role="status" aria-live="polite"></p>
</form>
```

`novalidate` turns off the browser's own validation bubbles, so your messages
are the only ones the visitor sees. Drop it if you'd rather keep them.

The empty `<span data-error-for="…">` next to each field is where the error
message goes, and the `role="status"` paragraph is where the overall result
goes. Screen readers announce both.

## 2. Style it

Open the **CSS** panel and style the form like any other part of the page. Two
rules earn their keep straight away:

```css
.field-error:empty {
	display: none;
}

.honeypot {
	position: absolute;
	left: -9999px;
}
```

The first keeps the error slots from taking up space when there's nothing in
them. The second hides the spam trap from people while leaving it in the DOM for
bots to fill in.

## 3. Create the webhook

The form needs somewhere to post to. An automation platform gives you a URL that
receives the submission and then does whatever you tell it — save it, email it,
push it into a CRM.

Make's free plan includes webhooks, and its AI assistant can build most of the
scenario for you. Using Zapier, Pipedream or n8n instead? The form and most of
this guide stay the same; see
[Other automation platforms](other-platforms.md) for what changes.

### Set up a scenario in Make

1. **Create a free account** at [make.com](https://www.make.com). The free tier
   is enough for a contact form.
2. **Create a new scenario.**
3. **Add a _Custom webhook_ as the first module** and create a new webhook.
   Make gives you a URL that looks like
   `https://hook.eu2.make.com/xxxxxxxxxxxxxxxxxxxxxxxx`. Copy it.
4. **Describe what you want.** Make's AI assistant builds most of the scenario
   for you if you tell it what the form sends and what it should send back. A
   prompt like this works:

   > Create a form integration using a webhook. The form sends the fields
   > `name`, `email`, `subject` and `message`. `name`, `email` and `message` are
   > required, and `email` must be a valid address. Respond with JSON. On
   > failure, return `{ "success": false, "errors": { "<field>": "<message>" } }`
   > with one message per invalid field. On success, return
   > `{ "success": true }`.

   Adjust the field list to match your form. The important part is that the
   **response shape is fixed**, because the JavaScript in step 4 reads it.

5. **Test it.** Make waits for a sample submission to learn the data structure.
   Submit your form once (or send a test request), then check that each field
   arrives under the right name and that both responses come back as you
   specified. Send a deliberately invalid submission too.
6. **Decide what happens next.** This is where Make earns its place — the
   integrations already exist, so the module after the webhook can:
   - create a lead or contact in your CRM,
   - send you an email or a Slack message,
   - append a row to Google Sheets or Airtable,
   - or several of these at once.
7. **Turn the scenario on.** A scenario that's off returns nothing, and your
   form will look broken.

> **⚠️ The webhook URL is public.** It ships in your page's JavaScript, and
> anyone can read it. That's normal for this pattern, but it means the scenario
> should validate everything it receives, and you should keep an eye on your
> operations quota. The spam trap in step 1 and rate limiting on the platform
> side are your first line of defence.

## 4. Wire it up

Select the form block, open the **Javascript** panel, and write the submit
handler. Studio attaches the code to that block and emits it as a module script
on the page — in the canvas while you're editing, and in the exported HTML when
the site is built. Module scripts run after the document is parsed, so the form
is already in the DOM when your code looks for it.

```js
const WEBHOOK_URL = 'https://hook.eu2.make.com/xxxxxxxxxxxxxxxxxxxxxxxx';

const form = document.querySelector('#contact-form');
const status = form.querySelector('.form-status');
const button = form.querySelector('button[type="submit"]');

const showErrors = (errors) => {
	form.querySelectorAll('[data-error-for]').forEach((slot) => {
		slot.textContent = errors[slot.dataset.errorFor] ?? '';
	});
};

const validate = (payload) => {
	const errors = {};

	if (!payload.name.trim()) errors.name = 'Please tell us your name.';
	if (!payload.email.trim()) errors.email = 'Please enter your email.';
	else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email))
		errors.email = 'That email address does not look right.';
	if (!payload.message.trim()) errors.message = 'Please write a message.';

	return errors;
};

form.addEventListener('submit', async (event) => {
	event.preventDefault();

	const payload = Object.fromEntries(new FormData(form));

	// The spam trap: only a bot fills this in. Pretend it worked.
	if (payload.company) {
		status.textContent = 'Thanks! We will be in touch.';
		return;
	}

	const errors = validate(payload);
	showErrors(errors);
	if (Object.keys(errors).length > 0) {
		status.textContent = '';
		return;
	}

	button.disabled = true;
	status.textContent = 'Sending…';

	try {
		const response = await fetch(WEBHOOK_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			throw new Error('HTTP response ' + response.status);
		}

		const result = await response.json();

		if (result.success) {
			form.reset();
			showErrors({});
			status.textContent = 'Thanks! We will be in touch.';
		} else {
			showErrors(result.errors ?? {});
			status.textContent = 'Please check the fields above.';
		}
	} catch (error) {
		console.error(error);
		status.textContent = 'Something went wrong. Please try again.';
	} finally {
		button.disabled = false;
	}
});
```

Client-side validation is there so the visitor gets an answer instantly. It is
**not** security: anyone can post to the webhook directly, which is exactly why
the scenario validates too.

> **💡 Tip:** AI models write this kind of code well. Give the model your field
> list, the webhook URL and the response shape from step 3, and ask for a submit
> handler that validates, posts JSON and renders the errors it gets back. Then
> read what comes out and test it — the failure cases are the ones that get
> skipped.

## Check it works

There's no preview in the builder, so test on the real output:

1. **Download Site** or **Deploy** (see [Deploying](../../deploying/README.md)).
2. Open the page and submit the form.
3. Watch the run appear in Make's scenario history, and confirm the fields
   arrived under the right names.
4. Submit an invalid form and confirm the messages appear next to the right
   fields.

## Notes

- **CORS.** The browser posts directly to the webhook, so the endpoint has to
  allow your site's origin. Make's webhooks do. A custom endpoint of your own
  may need configuring.
- **No JavaScript, no form.** The handler above is the only thing sending the
  submission. That's an acceptable trade for most sites; if it isn't for yours,
  give the `<form>` a real `action` and `method` as a fallback.
- **One handler per form.** If a page has two forms, either give each its own
  block script or select by `id` inside a single one.
- **Keep the response shape stable.** The JavaScript and the Make scenario agree
  on `{ success, errors }`. Change it in one place and you have to change it in
  the other.

## Troubleshooting

**Nothing happens on submit.** Check the browser console. Usually the `id` in
`querySelector` doesn't match the form's `id`, or the script is attached to a
different block than you think.

**The console shows a CORS error.** The endpoint isn't allowing your origin.
Confirm you copied the webhook URL correctly, and that the scenario is on.

**The request succeeds but nothing arrives in Make.** The scenario is off, or
it's still waiting to determine its data structure. Re-run the test in step 3.

**Fields arrive empty.** A field is missing its `name` attribute — `FormData`
only collects named fields — or the name doesn't match what the scenario reads.

**The success message never shows.** The response isn't the JSON shape you
agreed on. Log `result` and compare it with what the scenario returns.
