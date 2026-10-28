---
title: Typeform
sidebar_position: 7
---

# Embedding Typeform

Conversational, one-question-at-a-time forms.

**Embed type:** [Script + container](README.md#script--container). A `<div>`
marks where the form goes, and Typeform's script loads the form into it. You
style the form in Typeform's **Design** panel.

## Links

- **Typeform:** [typeform.com](https://www.typeform.com)
- **Official help, embedding:**
  [Embed your form](https://help.typeform.com/hc/en-us/articles/360029249212-Embed-your-form)
- **Developer reference:**
  [Inline embed](https://www.typeform.com/developers/embed/inline/)

## 1. Get the embed code

1. Open your form in Typeform and make sure it's **published**.
2. Open the **Share** panel and choose **Embed in a web page**.
3. Choose **Standard**.
4. Set the **width** and **height** the form should take on your page.
5. Click **Start embedding**, then copy the code.

## 2. The code you get

```html
<div data-tf-live="01JABCDEFGHIJKLMNOPQRSTUVW"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

- **The `<div>`** is the container. `data-tf-live` holds your embed's ID. It's a
  _live_ embed: the size and options you set in Typeform are stored there, so
  when you change them in Typeform, your page picks them up without copying the
  code again.
- **The `<script>`** loads Typeform's embed script, which finds the `<div>` and
  builds the form inside it.

Keep both exactly as copied. Typeform's embed only works with its own code.

## 3. Add it to Etch

1. Select the block the form should sit inside or next to.
2. Open the **HTML** panel.
3. Paste the whole code from Typeform, the `<div>` and the `<script>`, exactly as
   you copied it.

## 4. Height and styling

**Height.** Set in Typeform: the **width** and **height** from step 1 decide how
much room the form takes. To change them, edit the embed in Typeform's **Share**
panel; the page updates on its own.

**On phones**, Typeform opens a standard embed as a full-screen popup by
default. To keep it inline on mobile too, add `data-tf-inline-on-mobile` right
after `data-tf-live`:

```html
<div data-tf-live="01JABCDEFGHIJKLMNOPQRSTUVW" data-tf-inline-on-mobile></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

**Styling.** Style the form in Typeform's **Design** panel: theme, colours,
fonts, background. The form renders inside an iframe Typeform creates, so its
look comes from Typeform.

## Troubleshooting

**The form doesn't show.** Make sure both parts are in the HTML panel, the
`<div>` and the `<script>`, exactly as copied. Typeform also requires the page to
be served over **HTTPS**, which deployed sites are.

**The form is cut off, or has empty space around it.** Adjust the height in the
embed settings in Typeform's **Share** panel.

**On phones, the form opens as a popup.** That's Typeform's default for mobile.
Add `data-tf-inline-on-mobile` as shown above.

For anything else, see the general
[troubleshooting](README.md#4-troubleshooting).
