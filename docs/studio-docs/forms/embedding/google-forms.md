---
title: Google Forms
sidebar_position: 1
---

# Embedding Google Forms

Free, quick to set up, and every answer can land in a Google Sheet.

**Embed type:** [Iframe](README.md#iframe). You paste one `<iframe>` tag, set its
height in CSS, and style the form in Google Forms' theme options.

## Links

- **Google Forms:** [forms.google.com](https://forms.google.com)
- **Official help, publishing and embedding:**
  [Send your form to people](https://support.google.com/docs/answer/2839588)
- **Official help, theme:**
  [Change the theme or font of your form](https://support.google.com/docs/answer/145737)

## 1. Get the embed code

1. Open your form at [forms.google.com](https://forms.google.com).
2. **Publish it.** Click **Publish** at the top right, choose who can respond
   under **General access** (for a public site, **Anyone with the link**), and
   confirm. The top right now shows **Published**. An unpublished form doesn't
   load for visitors.
3. Click the **More** menu (the three dots, top right).
4. Select **Embed HTML**.
5. Click **Copy**.

## 2. The code you get

```html
<iframe
	src="https://docs.google.com/forms/d/e/1FAIpQLSf…/viewform?embedded=true"
	width="640"
	height="1095"
	frameborder="0"
	marginheight="0"
	marginwidth="0"
>
	Loading…
</iframe>
```

- **`src`** is your form's address. Keep it exactly as copied, including
  `?embedded=true`, which removes Google's page chrome around the form.
- **`width` and `height`** are fixed pixel sizes. You'll replace them with CSS.
- **`Loading…`** is the text shown while the form loads. Keep it, or translate
  it.

## 3. Add it to Etch

1. Select the block the form should sit inside or next to.
2. Open the **HTML** panel and paste the code.
3. Add `class="form-embed"` to the `<iframe>`, and remove `width`, `height`,
   `marginheight` and `marginwidth`:

   ```html
   <iframe
   	class="form-embed"
   	src="https://docs.google.com/forms/d/e/1FAIpQLSf…/viewform?embedded=true"
   	frameborder="0"
   >
   	Loading…
   </iframe>
   ```

4. Open the **CSS** panel and size it:

   ```css
   .form-embed {
   	width: 100%;
   	height: 1100px;
   	border: 0;
   }
   ```

## 4. Height and styling

**Height.** Google Forms keeps the iframe at the height you set. A good starting
point is the `height` Google put in the copied code. Then open the deployed
page and adjust:

- Fields stack taller on phones, so give small screens more room:

  ```css
  .form-embed {
  	width: 100%;
  	height: 1100px;
  	border: 0;
  }

  @media (max-width: 640px) {
  	.form-embed {
  		height: 1400px;
  	}
  }
  ```

- Submit a test answer and check the confirmation screen fits as well.
- For a multi-section form, size it for the longest section.

**Styling.** Style the form in Google Forms: click the **Customize theme** icon
(the palette, at the top) to set the header image, theme and background colours,
and fonts. In Etch, style the iframe itself and the block around it: width,
height, border, margins.

## Troubleshooting

**Visitors see "You need permission" or a sign-in page.** The form isn't
published, or **General access** is limited to your organisation. Publish it
with **Anyone with the link**.

**The form asks visitors to sign in to Google.** Some settings require a Google
account, such as file upload questions or limiting each person to one response.
Turn those off for a form anyone can fill in.

**There's a scrollbar inside the form, or empty space below it.** Adjust the
`height` in the CSS panel, including the mobile value.

For anything else, see the general
[troubleshooting](README.md#4-troubleshooting).
