---
title: Jotform
sidebar_position: 6
---

# Embedding Jotform

Long forms, conditional logic and payments, with a one-line embed.

**Embed type:** [Script](README.md#script--container), in its single-tag form.
One `<script>` tag both loads Jotform and places the form where the tag sits.
You style the form in Jotform's Form Builder.

## Links

- **Jotform:** [jotform.com](https://www.jotform.com), then **My Workspace**
- **Official help, embedding:**
  [How to embed a form on a web page](https://www.jotform.com/help/34-embedding-a-form-to-a-web-page/)
- **Official help, iFrame code:**
  [How to find your form's iFrame code](https://www.jotform.com/help/148-getting-the-form-iframe-code/)

## 1. Get the embed code

1. In **My Workspace**, hover over your form and click **Edit Form**.
2. In the Form Builder, click **Publish** in the orange bar at the top.
3. Click **Embed** in the left menu.
4. Click **Copy Code**.

**Make the form public.** Under **Publish** → **Quick Share**, check the form
isn't set to private. A private form asks visitors to sign in.

## 2. The code you get

```html
<script
	type="text/javascript"
	src="https://form.jotform.com/jsform/241234567890123"
></script>
```

- **One tag, no container.** The script writes the form right where the tag
  sits, so where you paste it is where the form appears.
- **The number at the end of `src`** is your form's ID.

## 3. Add it to Etch

1. Select the block the form should sit inside or next to.
2. Open the **HTML** panel.
3. Paste the `<script>` tag exactly as you copied it, at the spot where the form
   should appear.

## 4. Height and styling

**Height.** Handled by Jotform's script. The form takes the height of its
content on every screen size.

**Styling.** Style the form in Jotform's Form Builder: layout, colours, fonts
and spacing. Changes you make there show up in the embedded form automatically,
with no need to copy the code again.

## Alternative: iFrame embed

Jotform also offers an iFrame version of the same form. It loads the form in its
own frame, separate from the rest of the page's scripts, which Jotform
recommends when the script embed conflicts with something else on the page.

To get it, follow step 1 and select **iFrame** in the **Embed** options before
clicking **Copy Code**. Paste it into the **HTML** panel the same way.

## Troubleshooting

**Visitors are asked to sign in.** The form is set to private. Make it public
under **Publish** → **Quick Share**.

**The form doesn't show.** Check the `<script>` tag is in the HTML panel exactly
as copied. If the page has other scripts that might conflict, try the
[iFrame embed](#alternative-iframe-embed).

For anything else, see the general
[troubleshooting](README.md#4-troubleshooting).
