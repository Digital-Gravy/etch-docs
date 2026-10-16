---
title: Embedding a Form
sidebar_position: 10
---

# Embedding a third-party form

The fastest route. A form service hosts the form, receives the submissions and
notifies you; your page just has to load it.

This works with any provider that hands you an embed snippet — a `<script>` tag,
an `<iframe>`, or both. Studio has no special integration with any of them, and
doesn't need one.

## Providers to look at

A few common ones, and what to expect from each:

| Service                                   | Good for                                       | Styling                                                      |
| ----------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| **[Google Forms](google-forms.md)**       | Free, quick, answers land in a spreadsheet     | Iframe — theming is limited to Google's own options          |
| **Typeform**                              | Conversational, one-question-at-a-time forms   | Iframe, themed in Typeform's editor                          |
| **[Tally](tally.md)**                     | A generous free tier and a lot of field types  | Iframe, with theme controls in Tally                         |
| **Jotform**                               | Long forms, conditional logic, payments        | Iframe by default; also offers a full-source embed you style |
| **HubSpot Forms**                         | Leads that need to land in a CRM straight away | Rendered into your page, so your CSS reaches it              |
| **[Microsoft Forms](microsoft-forms.md)** | Teams already on Microsoft 365                 | Iframe, themed in Microsoft Forms' own options               |
| **Fillout**                               | Multi-step forms with a modern editor          | Script embed, themed in Fillout's editor                     |

## How embedding works

Every provider guide follows the same four steps. Using a provider that isn't
listed? Follow them with the code it gives you:

1. **[Identify your embed type](#1-identify-your-embed-type)** by looking at the
   code the provider gives you.
2. **[Add it to Etch](#2-add-it-to-etch)** following the steps for that type.
3. **[Adjust sizing and styling](#3-adjust-sizing-and-styling)** so the form
   fits your page.
4. **[Troubleshooting](#4-troubleshooting)**, only if something doesn't show up
   as expected.

## 1. Identify your embed type

Most form embeds follow one of these two patterns. If your provider gives you
something different, check its instructions before adding the code.

### Iframe

A single `<iframe>` tag. The form is a page hosted by the provider, shown inside
a window on yours.

```html
<iframe
	src="https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true"
	width="640"
	height="800"
	frameborder="0"
></iframe>
```

**How to recognise it:** the code starts with `<iframe` and has a `src`
pointing at the provider.

### Script + container

An empty **container** (usually a `<div>`) that marks where the form goes, and a
**loader script** that builds the form in it.

```html
<!-- the container: where the form appears -->
<div data-form-id="abc123"></div>

<!-- the loader: builds the form inside the container -->
<script src="https://forms.example.com/embed.js" async></script>
```

**How to recognise it:** the code contains a `<script>` tag. Some providers give
you a single `<script>` tag that writes the form where the tag sits, with no
separate container.

## 2. Add it to Etch

### Adding an iframe

1. In the builder, select the block the form should sit inside or next to.
2. Open the **HTML** panel.
3. Paste the `<iframe>` exactly as the provider gave it to you.
4. Add a class to it, and remove the `width` and `height` attributes. You'll set
   both in CSS in [step 3](#3-adjust-sizing-and-styling).

   ```html
   <iframe
   	class="form-embed"
   	src="https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true"
   	frameborder="0"
   ></iframe>
   ```

### Adding a script + container

1. In the builder, select the block the form should sit inside or next to.
2. Open the **HTML** panel.
3. Paste the **container** where you want the form to appear.
4. Paste the **script** right after it.
5. Leave the container's `id`, `class` and `data-` attributes exactly as they
   are. They're how the script finds it.

```html
<div data-form-id="abc123"></div>
<script src="https://forms.example.com/embed.js" async></script>
```

**If the provider asks for the script "in the `<head>`"**, wrap it in
`<etch:head>`. Anything inside an `<etch:head>` block renders into the document
head: the canvas's head while you're editing, and the exported page's head when
the site is built.

<!-- prettier-ignore -->
```html
<etch:head>
  <script src="https://forms.example.com/embed.js" async></script>
</etch:head>

<div data-form-id="abc123"></div>
```

`<etch:head>` shows up in **Structure** like any other block, and produces no
output where it sits, only its children, up in the head. If the provider doesn't
ask for the head, keep the script next to the container.

### What happens next

Studio parses what you paste into blocks, so the embed becomes part of the page
structure: visible in **Structure**, selectable, movable. When the site is
built, the code goes into the exported HTML exactly as you wrote it, and the
form loads in the visitor's browser when the page opens.

## 3. Adjust sizing and styling

### Sizing an iframe

Open the **CSS** panel and give the class from step 2 a width and a height:

```css
.form-embed {
	width: 100%;
	height: 800px;
	border: 0;
}
```

`width: 100%` makes the form follow its container on every screen size. For the
height, pick a value that fits the whole form: too short and the visitor scrolls
inside it, too tall and there's empty space below. Submit a test answer and
check the confirmation screen too, since it's often a different height. Some
providers offer automatic resizing; their guides cover it.

### Styling the form

**When the form renders inside an iframe**, style it in the provider's own
settings: colours, fonts, a theme. In Etch, style the iframe itself (width,
height, border, margins) and the block around it.

**When the form renders directly into your page**, style it in the **CSS**
panel like anything else. To find the classes the provider outputs, open the
deployed page, right-click a field and choose **Inspect**.

## 4. Troubleshooting

These apply to every provider. Each provider guide adds its own.

**The form doesn't appear in the canvas.** Some provider scripts only run on the
published page. Check it on the real output: **Download Site** or **Deploy**
(see [Deploying](../../deploying/README.md)), then open the page.

**The form doesn't appear on the deployed page either.** Open the browser
console. The usual causes:

- the loader script is missing;
- the container's `id`, `class` or `data-` attribute was changed and no longer
  matches what the script looks for;
- an ad or tracking blocker is stopping the provider's script.

**The iframe is cut off, or there's a scrollbar inside the form.** Raise the
`height` in the CSS panel.

**Your styles don't apply.** The form is rendered inside an iframe. Style it in
the provider's settings, as in [Styling the form](#styling-the-form).
