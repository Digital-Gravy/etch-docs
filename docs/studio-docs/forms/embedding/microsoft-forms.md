---
title: Microsoft Forms
sidebar_position: 2
---

# Embedding Microsoft Forms

A good fit for teams already on Microsoft 365. Responses stay with the form and
open in Excel.

**Embed type:** [Iframe](README.md#iframe). You paste one `<iframe>` tag, set its
height in CSS, and style the form in Microsoft Forms' **Style** options.

## Links

- **Microsoft Forms:** [forms.office.com](https://forms.office.com)
- **Official help, sharing and embedding:**
  [Send a form to get responses](https://support.microsoft.com/en-us/forms/send-a-form-to-get-responses)
- **Official help, theme:**
  [Change a form theme](https://support.microsoft.com/en-us/forms/change-a-form-theme)

## 1. Get the embed code

1. Open your form at [forms.office.com](https://forms.office.com).
2. Select **Collect responses** at the top right.
3. **Set who can respond to Anyone can respond.** With a work or school account
   the default is **Only people in my organization can respond**, which asks
   visitors to sign in. Forms made with a personal Microsoft account are open to
   anyone already.
4. In the sharing options, select **Embed** (the `</>` icon).
5. Click **Copy**.

## 2. The code you get

```html
<iframe
	width="640px"
	height="480px"
	src="https://forms.office.com/Pages/ResponsePage.aspx?id=…&embed=true"
	frameborder="0"
	marginwidth="0"
	marginheight="0"
	style="border: none; max-width:100%; max-height:100vh"
	allowfullscreen
	webkitallowfullscreen
	mozallowfullscreen
	msallowfullscreen
>
</iframe>
```

- **`src`** is your form's address. Keep it exactly as copied, including
  `embed=true`.
- **`width` and `height`** are fixed sizes. You'll replace them with CSS.
- **`style`** caps the form at the height of the screen (`max-height:100vh`).
  Remove it, so the height you set in CSS is the one that applies.
- **`allowfullscreen`** and its prefixed versions can stay as they are.

## 3. Add it to Etch

1. Select the block the form should sit inside or next to.
2. Open the **HTML** panel and paste the code.
3. Add `class="form-embed"` to the `<iframe>`, and remove `width`, `height`,
   `marginwidth`, `marginheight` and `style`:

   ```html
   <iframe
   	class="form-embed"
   	src="https://forms.office.com/Pages/ResponsePage.aspx?id=…&embed=true"
   	frameborder="0"
   	allowfullscreen
   	webkitallowfullscreen
   	mozallowfullscreen
   	msallowfullscreen
   >
   </iframe>
   ```

4. Open the **CSS** panel and size it:

   ```css
   .form-embed {
   	width: 100%;
   	height: 900px;
   	border: 0;
   }
   ```

## 4. Height and styling

**Height.** Microsoft Forms keeps the iframe at the height you set. The `480px`
in the copied code is usually too short for more than a couple of questions, so
start higher and adjust on the deployed page:

- Give small screens more room, since fields stack taller on phones:

  ```css
  @media (max-width: 640px) {
  	.form-embed {
  		height: 1200px;
  	}
  }
  ```

- Keep both width and height above `320px`. Smaller than that, the form may not
  display.
- Submit a test answer and check the thank-you screen fits as well.

**Styling.** Style the form in Microsoft Forms: select **Style** at the top to
pick a theme, a colour or a background image. In Etch, style the iframe itself
and the block around it: width, height, border, margins.

## Troubleshooting

**Visitors are asked to sign in.** The form is set to **Only people in my
organization can respond**. Change it to **Anyone can respond** under **Collect
responses**.

**The form is cut off at the bottom of the screen.** The `style` attribute with
`max-height:100vh` is still on the iframe. Remove it.

**The form shows as a link instead of the form itself.** The iframe is too small
or hidden when the page loads, for example inside a closed modal or tab. Give it
at least `320px` in both directions, and place it where it's visible on load.

For anything else, see the general
[troubleshooting](README.md#4-troubleshooting).
