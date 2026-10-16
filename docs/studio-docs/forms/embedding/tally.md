---
title: Tally
sidebar_position: 3
---

# Embedding Tally

A generous free tier, a lot of field types, and an embed that resizes itself to
fit the form.

**Embed type:** [Iframe](README.md#iframe) with a small helper script. The script
loads the form into the iframe and keeps its height matched to the content, so
there's no height for you to manage.

## Links

- **Tally:** [tally.so](https://tally.so)
- **Official help, embedding:**
  [How to embed Tally forms on your website](https://tally.so/help/embed-your-form)
- **Official help, design:**
  [Customize your form's style](https://tally.so/help/customize-your-form)
- **Developer reference:** [Embeds](https://developers.tally.so/widgets/embeds)

## 1. Get the embed code

1. Open your form in Tally and **Publish** it.
2. Open the **Share** tab.
3. Under the embed options, choose **Standard**. A preview opens.
4. Set the options:
   - **Dynamic height**: turn it on. The form grows and shrinks with its
     content, with no scrollbar.
   - **Hide form title**: on, if your page already has a heading for the form.
   - **Transparent background**: on, so your page's background shows through.
   - **Align content to the left**: on, if the form sits in a left-aligned
     layout. Forms are centred by default.
5. Click **Get the code** and copy it.

## 2. The code you get

```html
<iframe
	data-tally-src="https://tally.so/embed/mRoDv3?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
	loading="lazy"
	width="100%"
	height="200"
	frameborder="0"
	marginheight="0"
	marginwidth="0"
	title="Contact form"
></iframe>
<script>
	var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
</script>
```

- **`data-tally-src`** holds the form's address. Note it's `data-tally-src`, not
  `src`: the script reads it and loads the form. Without the script, the iframe
  stays empty.
- **The `<script>`** loads Tally's embed script and starts the form. In Etch it
  goes in the **Javascript** panel, not in the HTML (see step 3).
- **The parameters** after `?` are the options you picked:
  `dynamicHeight=1`, `hideTitle=1`, `transparentBackground=1`, `alignLeft=1`.
  To change an option, change it in Tally and copy the code again.
- **`height="200"`** is only the starting height. With dynamic height on, the
  script replaces it as soon as the form loads.
- **`title`** is read by screen readers. Set it to something that describes the
  form.

## 3. Add it to Etch

The code Tally gives you has two parts, and each goes in a different panel:

```html
<!-- Part 1 → HTML panel -->
<iframe
	data-tally-src="https://tally.so/embed/mRoDv3?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
	loading="lazy"
	width="100%"
	height="200"
	frameborder="0"
	marginheight="0"
	marginwidth="0"
	title="Contact form"
></iframe>

<!-- Part 2 → Javascript panel (code only) -->
<script>
	var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
</script>
```

> **💡 The `<script>` and `</script>` tags themselves are left out.** The
> Javascript panel only takes the code between them. Studio adds the tags when it
> outputs the page.

### HTML panel: the iframe

1. Select the block the form should sit inside or next to.
2. Open the **HTML** panel.
3. Paste **part 1**, the `<iframe>`, and add `class="form-embed"` to it:

```html title="HTML panel"
<iframe
	class="form-embed"
	data-tally-src="https://tally.so/embed/mRoDv3?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
	loading="lazy"
	width="100%"
	height="200"
	frameborder="0"
	marginheight="0"
	marginwidth="0"
	title="Contact form"
></iframe>
```

### Javascript panel: the script contents

1. Select the iframe block you just added.
2. Open the **Javascript** panel.
3. Paste **part 2**: only the code that was between `<script>` and `</script>`.

```js title="Javascript panel"
var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
```

Studio outputs this as a script on the page, both in the canvas and in the
exported site.

### CSS panel: the size

Open the **CSS** panel and give the iframe its width:

```css title="CSS panel"
.form-embed {
	display: block;
	width: 100%;
	border: 0;
}
```

With dynamic height on, leave `height` out of the CSS. The script sets it.

## 4. Height and styling

**Height.** Handled by **Dynamic height**. The iframe follows the form's
length on every screen size, through multi-page forms and the thank-you screen.
If you'd rather have a fixed height, turn dynamic height off in Tally, copy the
code again, and set `height` in the CSS panel as in the
[iframe steps](README.md#sizing-an-iframe).

**Styling.** Style the form in Tally's editor: open **Customize** to set the
theme, colours, font and button style. With **Transparent background** on, the
form sits directly on your page's background, so it blends in with the section
around it. On Tally Pro, you can also add your own CSS to the form through
**Custom domain**.

In Etch, style the iframe and the block around it: width, margins, spacing.

## Troubleshooting

**The space is there but the form is blank.** The script isn't running. Check
that its contents are in the **Javascript** panel of the iframe block, without
the `<script>` tags.

**The form has a scrollbar inside it.** Dynamic height is off. Turn it on in
the **Standard** embed options and copy the code again.

**An option you changed in Tally doesn't show.** Embed options live in the
code. Copy the code again and replace the old one.

For anything else, see the general
[troubleshooting](README.md#4-troubleshooting).
