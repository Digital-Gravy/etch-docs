---
title: Form Backends
sidebar_position: 10
---

# Sending your form to a form backend

The simplest destination for a form you build yourself. A form backend gives
you an address to send submissions to. It stores them, emails you, and filters
spam. No automation to set up, no response format to agree on.

You keep full control of the markup and the styling. The backend only receives
the data.

[Formspree](https://formspree.io) is the worked example below.
[Other backends](#other-form-backends) work the same way.

## Two ways to send

| Option                                                | What happens on submit                             | What it takes                          |
| ----------------------------------------------------- | -------------------------------------------------- | -------------------------------------- |
| **[A. Plain HTML](#option-a-plain-html)**             | The visitor goes to Formspree's thank-you page     | One attribute on the `<form>`          |
| **[B. Stay on the page](#option-b-stay-on-the-page)** | The form shows a success or error message in place | A short script in the Javascript panel |

Both start the same way: create the form on Formspree and copy its endpoint.

## 1. Create the form on Formspree

1. Create an account at [formspree.io](https://formspree.io). The free plan is
   enough for a contact form.
2. Click **New form**, give it a name, and choose the email address submissions
   should go to.
3. Copy the form's **endpoint**. It looks like this:

   ```text
   https://formspree.io/f/xyzabcde
   ```

The last part, `xyzabcde`, is your form's ID.

## Option A: Plain HTML

The form posts straight to Formspree. No JavaScript at all.

1. Select the block the form should go in, and open the **HTML** panel.
2. Write the form with your endpoint as the `action` and `method="POST"`:

```html title="HTML panel"
<form action="https://formspree.io/f/xyzabcde" method="POST">
	<label for="contact-name">Name</label>
	<input id="contact-name" name="name" type="text" autocomplete="name" required />

	<label for="contact-email">Email</label>
	<input id="contact-email" name="email" type="email" autocomplete="email" required />

	<label for="contact-message">Message</label>
	<textarea id="contact-message" name="message" rows="6" required></textarea>

	<!-- Spam trap: Formspree drops any submission that fills this in. -->
	<input type="text" name="_gotcha" style="display:none" />

	<button type="submit">Send message</button>
</form>
```

- **Every field needs a `name`.** That's the label the field gets in your
  Formspree inbox and emails.
- **`required` and `type="email"`** let the browser check the fields before
  sending.
- **`_gotcha`** is Formspree's spam trap. People never see it; bots fill it in,
  and Formspree discards those submissions.

Style the form in the **CSS** panel like any other part of the page.

When a visitor submits, the browser opens Formspree's thank-you page. That's the
whole setup.

## Option B: Stay on the page

The visitor stays where they are, and the form shows the result in place. Start
from the HTML in option A, add an `id` to the form, and add an element for the
messages:

```html title="HTML panel"
<form id="contact-form" action="https://formspree.io/f/xyzabcde" method="POST">
	<label for="contact-name">Name</label>
	<input id="contact-name" name="name" type="text" autocomplete="name" required />

	<label for="contact-email">Email</label>
	<input id="contact-email" name="email" type="email" autocomplete="email" required />

	<label for="contact-message">Message</label>
	<textarea id="contact-message" name="message" rows="6" required></textarea>

	<input type="text" name="_gotcha" style="display:none" />

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
			body: new FormData(form),
			headers: { Accept: 'application/json' }
		});

		if (response.ok) {
			form.reset();
			status.textContent = 'Thanks! We will be in touch.';
			return;
		}

		const result = await response.json().catch(() => ({}));
		status.textContent = result.errors
			? result.errors.map((error) => error.message).join(' ')
			: 'Something went wrong. Please try again.';
	} catch (error) {
		console.error(error);
		status.textContent = 'Something went wrong. Please try again.';
	} finally {
		button.disabled = false;
	}
});
```

- **`Accept: application/json`** tells Formspree to answer with data instead of
  its thank-you page, so the script can show the result itself.
- **`response.ok`** is true when the submission was accepted.
- **`result.errors`** is a list Formspree sends back when it rejects a
  submission. Each entry has a `message` the script shows to the visitor.
- **The endpoint comes from the form's `action`**, so it lives in one place. If
  the script doesn't run, the form still works the option A way.

## Check it works

1. **Download Site** or **Deploy** (see [Deploying](../../deploying/README.md)).
2. Open the page and submit the form.
3. Check the submission arrives in your Formspree dashboard and by email.
4. Submit with an invalid email to see how errors show.

## Other form backends

These work the same way: create a form, copy the endpoint, post to it. The
details of each live in its own docs.

| Backend                                | Endpoint looks like                | Note                                                                    |
| -------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| **[Formspree](https://formspree.io)**  | `https://formspree.io/f/<form-id>` | The example on this page                                                |
| **[Web3Forms](https://web3forms.com)** | `https://api.web3forms.com/submit` | One endpoint for everyone; your form sends an `access_key` hidden field |
| **[Basin](https://usebasin.com)**      | `https://usebasin.com/f/<form-id>` | Same pattern as Formspree                                               |

## When you need more

A form backend stores and forwards submissions. When a submission has to go
further, such as creating a CRM lead, posting to Slack, or adding a row to a
spreadsheet, or you want your own validation rules and response, send it to an
automation platform instead. See
[Automation platforms](README.md#automation-platforms).

## Troubleshooting

**Option B shows "Something went wrong."** Check the browser console. Usually
the endpoint in `action` is wrong, or the form's `id` doesn't match the one in
the script.

**Fields arrive empty or missing.** A field has no `name`. Only named fields are
sent.

**Submissions stop with a "too many requests" error.** Formspree limits how
often one visitor can submit. Wait a moment and try again.
