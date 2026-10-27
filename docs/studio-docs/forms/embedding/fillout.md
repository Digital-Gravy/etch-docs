---
title: Fillout
sidebar_position: 4
---

# Embedding Fillout

Multi-step forms with a modern editor, and an embed that can resize itself to
fit the form.

**Embed type:** [Script + container](README.md#script--container). A `<div>`
marks where the form goes, and Fillout's script loads the form into it. The form
renders inside an iframe the script creates, so you style it in Fillout's editor.

## Links

- **Fillout:** [fillout.com](https://www.fillout.com)
- **Official help, sharing and embedding:**
  [Sharing & embedding](https://www.fillout.com/blog/embed-a-google-calendar/sharing-embedding)

## 1. Get the embed code

1. Open your form in Fillout and click **Publish** at the top right.
2. Open the **Share** tab.
3. Choose the **Standard** embed. It places the form as a block on your page.
4. In the embed settings, turn on **Auto-resize height**, so the form grows and
   shrinks with its content.
5. Click **Get the code** and copy it.

## 2. The code you get

```html
<div
	style="width:100%;height:500px;"
	data-fillout-id="abc123"
	data-fillout-embed-type="standard"
	data-fillout-inherit-parameters
	data-fillout-dynamic-resize
></div>
<script src="https://server.fillout.com/embed/v1/"></script>
```

- **The `<div>`** is the container. Its `data-fillout-…` attributes tell the
  script which form to load and how:
  - `data-fillout-id`: your form.
  - `data-fillout-embed-type="standard"`: the embed style you picked.
  - `data-fillout-inherit-parameters`: passes the page's URL parameters (such as
    `?utm_source=…`) to the form.
  - `data-fillout-dynamic-resize`: added by **Auto-resize height**; the form
    adjusts its height to its content.
- **`style`** sets the container's width and starting height. Leave it as it
  is; with auto-resize on, the script adjusts the height.
- **The `<script>`** loads Fillout's embed script, which finds the `<div>` and
  builds the form inside it.

## 3. Add it to Etch

1. Select the block the form should sit inside or next to.
2. Open the **HTML** panel.
3. Paste the whole code from Fillout, the `<div>` and the `<script>`, exactly as
   you copied it.

That's all. The form appears on the deployed page: run **Download Site** or
**Deploy** (see [Deploying](../../deploying/README.md)) and open the page to see
it. In the builder canvas, the container shows as an empty block.

## 4. Height and styling

**Height.** Handled by **Auto-resize height**. The form follows its content on
every screen size, through every step and the thank-you screen.

**Styling.** Style the form in Fillout's editor: theme, colours, fonts and
buttons. The form renders inside an iframe the script creates, so its look comes
from Fillout.

## Troubleshooting

**The form doesn't show in the builder.** That's expected: Fillout's script runs
on the deployed page. Check it there.

**The form doesn't show on the deployed page either.** Make sure both parts are
in the HTML panel, the `<div>` and the `<script>`. If either was edited, copy
the code again from Fillout.

**The form has a scrollbar inside it, or is cut off.** **Auto-resize height** is
off. Turn it on in the embed settings and copy the code again.

For anything else, see the general
[troubleshooting](README.md#4-troubleshooting).
