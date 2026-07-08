---
title: Build Mode
sidebar_position: 20
---

# Build Mode

Build Mode is the default mode of Etch Intelligence and its action-oriented side. Where [Ask Mode](./ask-mode.md) answers questions, Build Mode makes things.

It's not just for building pages. Build Mode works across your whole site — it can write insertable code, but it can also create loop definitions, access and work with your media, register custom post types, create custom fields, create posts and pages, and insert data into them. In other words, it can both build the design _and_ set up the content and data structures that the design depends on.

Think of Ask Mode as a knowledgeable advisor and Build Mode as a pair programmer that actually does the work.

## The Mode Toggle

The Etch Intelligence panel opens in Build Mode by default. The **Ask / Build** toggle at the top of the chat input lets you switch between the two modes:

- **Build** (the magic wand icon) — the default. The input placeholder reads _"Ask the AI to build something..."_
- **Ask** (the chat bubble icon) — switch here when you just want answers rather than changes.

Your selection is remembered, so the panel reopens in whichever mode you used last.

## What Build Mode Can Do

### Generate code

Describe what you want and Build Mode returns insertable code that follows Etch's conventions:

- **HTML** using Etch's Svelte-inspired syntax — dynamic data (`{this.title}`), loops (`{#loop posts as post}`), and conditions (`{#if ...}`).
- **CSS** using flat BEM selectors, logical properties, custom properties, and modern features like `clamp()` and container queries.
- **JavaScript** when it's genuinely needed — vanilla and minimal.

### Create and manage content structures

Build Mode reaches well beyond the canvas. It can set up the content and data layer your designs run on:

- **Loop definitions** — create loops, including WordPress query loops, so your markup has something to iterate over.
- **Custom post types** — register new post types for your content.
- **Custom fields** — create field groups, define fields, and read or set their values.
- **Posts and pages** — create the actual content to populate your designs.
- **Insert data** — write values into posts, pages, and custom fields, so your templates render against real content instead of placeholders.

### Work with what already exists

Build Mode can also inspect your site and build on top of it rather than starting from scratch — it can:

- **Access your media library** — find images and other media to use in what it builds.
- **Read the current page** — see the blocks already on the canvas and reference them.
- **Find existing content** — look up posts, post types, and existing loop definitions to reuse.

## Inserting Generated Code

Every code block Build Mode produces has actions in its top corner:

- **Insert** — for HTML, drops the code straight into the canvas as a new element.
- **Replace** — for HTML, swaps the selected element with the generated markup. Use this when the element already exists and you're changing it rather than adding something new.
- **Copy** — copies the code to your clipboard for any block, so you can paste it wherever you need it.

When Build Mode performs a structural action — like creating a loop or a custom field group — you'll see it happen as a step in the chat, so you always know what changed.

## Giving Build Mode Context

The more context you give, the better the result. In the chat input you can:

- **Attach files and images** — paste, drag, or drop them in to give Build Mode a reference to work from (see [Working With Files](#working-with-files)).
- **Add elements as context** — point Build Mode at specific elements on your page (see [Making Surgical Edits & Adding Element Context](#making-surgical-edits--adding-element-context)).

## Making Surgical Edits & Adding Element Context

Build Mode does its best work when it knows exactly which element you're talking about. The **Add to AI Context** feature lets you hand any element on your page directly to the chat, so your request applies to that element precisely instead of the whole page.

### Adding an element

There are two ways to add an element to the context:

- **From the canvas** — select an element and click the **AI sparkles** button on its badge.
- **From the right-click menu** — right-click an element on the canvas or in the Structure panel and choose **Add to AI context**. You can also select multiple elements first and choose **Add N elements to AI context** to add them all at once.

Each element you add appears as a pill above the chat input so you can see exactly what's in context. To remove one, click the **×** on its pill, or right-click the element again and choose **Remove from AI context**.

### Why it matters

Adding elements as context is what makes **surgical edits** possible. Once an element is in context, you can ask for a targeted change — "make this heading larger," "add a hover state to this button," "turn this list into a grid" — and Build Mode works against that specific element rather than guessing or rebuilding the surrounding markup. It's the difference between editing one component and regenerating the whole section.

:::tip
Add the element _before_ describing your change. With the element in context, "this" and "this one" refer to exactly what you selected.
:::

## Working With Files

Build Mode can take files as input, which opens up workflows that go well beyond typing a prompt. Paste, drag, or drop a file into the chat input and it attaches as context for your next message.

- **Screenshots and images as build references** — drop in a design mockup, a screenshot of another site, or any visual reference, and Build Mode will build what it's shown. This is the fastest way to recreate a layout you already have in mind.
- **CSV files for bulk data input** — attach a spreadsheet of content and Build Mode can use it to create posts and pages or populate custom fields in bulk, instead of you entering each record by hand.
- **Files for architectural workflows** — hand over structured files to drive larger setup tasks, like spinning up a custom post type and its fields from a data file, then generating the content to match.

Attached files show as pills above the chat input, and you can remove any of them with the **×** before sending. Files have a 10 MB size limit each.

- **Be specific.** "A three-column pricing section with a highlighted middle plan" beats "make a pricing section."
- **Build from a design.** A screenshot gives Build Mode an exact target to match.
- **Reference what exists.** Add the relevant block as context when you want changes to an existing element.
- **Review before relying on it.** Read the generated code and check structural changes — Build Mode is fast, but you're still the developer in charge.

## Build Mode vs. Ask Mode

| | Ask Mode | Build Mode |
| --- | --- | --- |
| Purpose | Answer questions and explain | Produce code and make changes |
| Output | Explanations and copyable snippets | Insertable code and direct actions |
| Best for | Learning, troubleshooting, how-to | Building pages, content, and data structures |

If you ask Ask Mode to do something that requires building, it will suggest switching to Build Mode.

:::note
Etch Intelligence is experimental. See [Activating Etch Intelligence](./activating-ai.md) to enable it.
:::
