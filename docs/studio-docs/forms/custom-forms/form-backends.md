---
title: Form Backends
sidebar_position: 10
---

# Sending your form to a form backend

The simplest destination for a form you build yourself. A form backend gives
you an address to send submissions to, and emails each one to you. No
automation to set up, no response format to agree on.

You keep full control of the markup and the styling. The backend only receives
the data.

[Web3Forms](https://web3forms.com) is the worked example below. Its free plan
covers 250 submissions a month across unlimited forms, and includes redirecting
visitors to a thank-you page on your own site.
[Other backends](#other-form-backends) work the same way.

## Two ways to send

| Option                                                | What happens on submit                             | What it takes                          |
| ----------------------------------------------------- | -------------------------------------------------- | -------------------------------------- |
| **[A. Plain HTML](#option-a-plain-html)**             | The visitor goes to a thank-you page               | A few attributes and hidden fields     |
| **[B. Stay on the page](#option-b-stay-on-the-page)** | The form shows a success or error message in place | A short script in the Javascript panel |

Both start the same way: get your access key.

## 1. Get your access key

1. Go to [web3forms.com](https://web3forms.com) and click **Create Access
   Key**.
2. Enter the email address submissions should go to.
3. Web3Forms emails you the **access key**. It looks like this:

   ```text
   a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

Every form sends this key along with its fields, so Web3Forms knows which inbox
to deliver to. The key is made to sit in your page's code: it can only send
submissions to your inbox, nothing else.

## Option A: Plain HTML

The form posts straight to Web3Forms. No JavaScript at all.

1. Select the block the form should go in, and open the **HTML** panel.
2. Write the form, with Web3Forms' address as the `action` and your access key
   in a hidden field:

```html title="HTML panel"
<form action="https://api.web3forms.com/submit" method="POST">
	<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
	<input type="hidden" name="subject" value="New message from the website" />
	<input type="hidden" name="redirect" value="https://www.example.com/thank-you" />

	<label for="contact-name">Name</label>
	<input id="contact-name" name="name" type="text" autocomplete="name" required />

	<label for="contact-email">Email</label>
	<input id="contact-email" name="email" type="email" autocomplete="email" required />

	<label for="contact-message">Message</label>
	<textarea id="contact-message" name="message" rows="6" required></textarea>

	<!-- Spam trap: real people never tick this. -->
	<input type="checkbox" name="botcheck" style="display: none;" />

	<button type="submit">Send message</button>
</form>
```

- **`access_key`**: your key from step 1.
- **`subject`**: the subject line of the email you receive.
- **`redirect`**: where the visitor goes after submitting. Use the full address
  of a page on your site, starting with `https://`. Without it, Web3Forms shows
  its own success page.
- **Every other field needs a `name`.** That's the label the field gets in the
  email. `email` is also used as the reply-to address, so you can answer
  straight from your inbox.
- **`required` and `type="email"`** let the browser check the fields before
  sending.
- **`botcheck`** is a spam trap: hidden from people, ticked only by bots, and
  Web3Forms discards those submissions.

Style the form in the **CSS** panel like any other part of the page, and create
the thank-you page in Etch. That's the whole setup.

## Option B: Stay on the page

The visitor stays where they are, and the form shows the result in place. Start
from the HTML in option A: give the form an `id`, remove the `redirect` field,
and add an element for the messages:

```html title="HTML panel"
<form id="contact-form" action="https://api.web3forms.com/submit" method="POST">
	<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
	<input type="hidden" name="subject" value="New message from the website" />

	<label for="contact-name">Name</label>
	<input id="contact-name" name="name" type="text" autocomplete="name" required />

	<label for="contact-email">Email</label>
	<input id="contact-email" name="email" type="email" autocomplete="email" required />

	<label for="contact-message">Message</label>
	<textarea id="contact-message" name="message" rows="6" required></textarea>

	<input type="checkbox" name="botcheck" style="display: none;" />

	<button type="submit">Send message</button>

	<p class="form-status" role="status" aria-live="polite"></p>
</form>
```

Then select the form block, open the **Javascript** panel, and add the submit
handler:

```js title="Javascript panel"
const form = document.querySelector('#contact-form');
const status = form.querySelector('.form-status');
const button = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
	event.preventDefault();

	button.disabled = true;
	status.textContent = 'Sending…';

	try {
		const response = await fetch(form.action, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify(Object.fromEntries(new FormData(form)))
		});

		const result = await response.json();

		if (result.success) {
			form.reset();
			status.textContent = 'Thanks! We will be in touch.';
		} else {
			status.textContent = result.message || 'Something went wrong. Please try again.';
		}
	} catch (error) {
		console.error(error);
		status.textContent = 'Something went wrong. Please try again.';
	} finally {
		button.disabled = false;
	}
});
```

- **The fields are sent as JSON**, including the hidden `access_key`.
- **`result.success`** is `true` when Web3Forms accepted the submission.
- **`result.message`** explains what went wrong when it didn't, and the script
  shows it to the visitor.
- **The address comes from the form's `action`**, so it lives in one place. If
  the script doesn't run, the form still works the option A way.

## Check it works

1. **Download Site** or **Deploy** (see [Deploying](../../deploying/README.md)).
2. Open the page and submit the form.
3. Check the email arrives in the inbox you used for the access key.
4. Reply to it to confirm the reply goes to the address typed in the form.

## Other form backends

These work the same way: create a form or key, point your form at the
backend's address, and post to it. Each has its own docs.

| Backend                                | Address looks like                 | Note                                                        |
| -------------------------------------- | ---------------------------------- | ----------------------------------------------------------- |
| **[Web3Forms](https://web3forms.com)** | `https://api.web3forms.com/submit` | The example on this page                                    |
| **[Formspree](https://formspree.io)**  | `https://formspree.io/f/<form-id>` | A dashboard to browse submissions; Slack and Discord alerts |
| **[Basin](https://usebasin.com)**      | `https://usebasin.com/f/<form-id>` | One address per form, like Formspree                        |
| **[Getform](https://getform.io)**      | `https://getform.io/f/<form-id>`   | One address per form, like Formspree                        |

## When you need more

A form backend delivers submissions to your inbox. When a submission has to go
further, such as creating a CRM lead, posting to Slack, or adding a row to a
spreadsheet, or you want your own validation rules and response, send it to an
automation platform instead. See
[Automation platforms](README.md#automation-platforms).

## Troubleshooting

**No email arrives.** Check the access key in the form matches the one
Web3Forms emailed you, and look in your spam folder for the first submissions.

**Option A doesn't go to your thank-you page.** The `redirect` value must be a
full address starting with `https://`, on the same site as the form.

**Option B shows "Something went wrong."** Check the browser console. Usually
the form's `id` doesn't match the one in the script, or the access key is
missing.

**Fields are missing from the email.** A field has no `name`. Only named fields
are sent.

**Submissions stop with a "too many requests" message.** Web3Forms limits how
often one visitor can submit. Wait a moment and try again.
