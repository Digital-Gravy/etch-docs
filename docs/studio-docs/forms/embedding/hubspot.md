---
title: HubSpot Forms
sidebar_position: 5
---

# Embedding HubSpot Forms

For leads that need to land in a CRM straight away: every submission creates or
updates a contact in HubSpot.

**Embed type:** [Script + container](README.md#script--container). A `<div>`
marks where the form goes, and HubSpot's script loads the form into it. You
style the form in HubSpot's form editor.

## Links

- **HubSpot:** [app.hubspot.com](https://app.hubspot.com), then **… More** →
  **Marketing** → **Forms**
- **Official help, embedding and styling:**
  [Set up and style HubSpot forms on an external site](https://knowledge.hubspot.com/forms/set-up-and-style-your-form-on-an-external-site)
- **Official help, troubleshooting placement:**
  [Form in the wrong place on external page](https://knowledge.hubspot.com/forms/form-in-the-wrong-place-on-external-page)

## 1. Get the embed code

1. In HubSpot's navigation, click **… More**, then **Marketing** → **Forms**.
2. Hover over your form and click **Edit**.
3. Click **Review and update**, then **Update** in the right panel.
4. In the dialog, click **Get embed code**.
5. On the **Embed code** tab, click **Copy**.

**Add your site's domain to HubSpot.** In HubSpot's tracking settings, add the
domain your site is deployed on. Submissions from domains that aren't listed are
marked as spam.

## 2. The code you get

```html
<script src="https://js.hsforms.net/forms/embed/1234567.js" defer></script>
<div
	class="hs-form-frame"
	data-region="na1"
	data-form-id="a1b2c3d4-…"
	data-portal-id="1234567"
></div>
```

- **The `<script>`** loads HubSpot's form script for your account. The number in
  the address is your account ID.
- **The `<div>`** is the container. Its attributes tell the script which form to
  load:
  - `data-form-id`: your form.
  - `data-portal-id`: your HubSpot account.
  - `data-region`: the data centre your account is on (`na1`, `eu1`…).

Keep all of it exactly as copied.

## 3. Add it to Etch

1. Select the block the form should sit inside or next to.
2. Open the **HTML** panel.
3. Paste the whole code from HubSpot, the `<script>` and the `<div>`, exactly as
   you copied it.

The form loads right away in the builder canvas, and works the same on the
deployed page.

## 4. Height and styling

**Height.** Handled by HubSpot's script. The form takes the height of its
content on every screen size.

**Styling.** Style the form in HubSpot: in the form editor, click the styling
icon in the left sidebar to open **Form styles**, and set fonts, colours, fields
and buttons. The styles apply to every step of the form.

## Troubleshooting

**The form doesn't show.** Make sure both parts are in the HTML panel, the
`<script>` and the `<div>`, and that the `data-…` attributes weren't changed. If
in doubt, copy the code again from HubSpot.

**Submissions arrive marked as spam.** Your site's domain isn't in HubSpot's
tracking settings. Add it.

**The form shows up twice, or in the wrong place.** The page has two HubSpot
forms, or the same code pasted twice. See HubSpot's
[placement guide](https://knowledge.hubspot.com/forms/form-in-the-wrong-place-on-external-page).

For anything else, see the general
[troubleshooting](README.md#4-troubleshooting).
