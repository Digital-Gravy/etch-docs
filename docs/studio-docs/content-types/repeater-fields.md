---
title: Repeater Fields
sidebar_position: 20
---

# Repeater Fields

A **repeater** is a field that holds a list of the same small shape: the lessons
of a course, the talking points of a feature, the slides of a hero. You define
the shape once, as **sub-fields**, and each page of the type adds as many
**items** as it needs.

It's built into the Content Hub, so there's nothing to set up outside Etch: no
custom fields plugin, no trip to another admin screen.

:::caution Experimental
Repeater fields are experimental. They may change before they're final. Turn
them on per project in **Settings → Experimental → Repeater Field**.

Turning the switch off only hides **Repeater** from the field type menu.
Repeaters you've already created keep their items and keep rendering.
:::

## Creating a repeater

1. In the **Content Hub**, select a content type and open the **Fields** tab.
2. Use the **+** next to the **Fields** heading and pick **Repeater**.
3. Give it a **name** and a **key**, as any other field: `Lessons`, `lessons`.
4. In the card's **Sub-fields** section, use **Add sub-field** to add the
   fields every item holds.

A sub-field is set up like a top-level field: name, key, type and the same
settings. Its key only has to be unique within the repeater, so two repeaters
can each have a `title`. Sub-field keys can't contain hyphens: use `video_url`,
not `video-url`.

Drag a sub-field by its handle to change the order it's shown in.

### Sub-field types

**Text** · **Textarea** · **Number** · **Link** · **Email** · **Boolean** ·
**Select** · **Image**

A repeater is one level deep. It can't hold a **Relationship** or another
**Repeater**.

## Adding items

Open a page of the type. The repeater shows its items, each labelled
**Item #1**, **Item #2** and so on:

- **Add item** appends an empty one.
- The bin icon removes an item.
- The chevron collapses or expands an item.
- Drag an item by its handle to reorder it.

Items are checked when you save, sub-field by sub-field, with the same rules a
top-level field follows: a required sub-field must be filled, a number must be
within its bounds, an email must be an email.

There's no limit on how many items a repeater holds.

## Using a repeater in a template

A repeater's value is a list, so you read it with a loop. In a template for the
type, the current page's fields are under `this.fields`:

```html
<ul class="lessons">
  {#loop this.fields.lessons as lesson}
    <li class="lesson">
      <h3 class="lesson__title">{lesson.title}</h3>
      <p class="lesson__summary">{lesson.summary}</p>
    </li>
  {/loop}
</ul>
```

:::tip
Loop the element that should repeat, not its parent or its children. Here
that's the `<li>`, once per lesson, not the `<ul>`.
:::

**What's happening here:**

1. The loop targets `this.fields.lessons`, the repeater.
2. Each item is aliased as `lesson`.
3. Sub-fields are read by key: `{lesson.title}`, `{lesson.summary}`.

### Images

An **Image** sub-field resolves to the image itself, so read its `url`:

```html
{#loop this.fields.slides as slide}
  <figure class="slide">
    <img src="{slide.image.url}" alt="{slide.caption}" />
    <figcaption>{slide.caption}</figcaption>
  </figure>
{/loop}
```

An image used by any item counts as in use, so it can't be deleted from the
asset manager while a repeater still points at it.

### Through a query

A repeater comes back from [`queryContent()`](querying-content.md) with the rest
of a record's fields, as a list of items. Loop it inside the loop over the
records:

```html
{#loop courses as course}
  <article class="course">
    <h2>{course.title}</h2>
    {#loop course.fields.lessons as lesson}
      <p>{lesson.title}</p>
    {/loop}
  </article>
{/loop}
```

You can't filter or sort a query by the values inside a repeater's items yet.

## Renaming and removing sub-fields

Sub-fields follow the same rules as [top-level fields](README.md#renaming).
Rename a sub-field's key and Etch rewrites every item of every page so each
value moves to the new key. Loops that read the old key, like
`{lesson.title}`, aren't updated: change them yourself.

Removing a sub-field removes its value from every item. That can't be undone.

## From scripts and agents

The [Public API](../public-api/content.md#fields) and the
[MCP server](../mcp-server.md) read and write repeaters too, so an agent can
define one and fill its items:

```js
await etch.content.addFieldAsync('course', {
  key: 'lessons',
  name: 'Lessons',
  type: 'repeater',
  fields: [
    { key: 'title', name: 'Title', type: 'text', required: true },
    { key: 'summary', name: 'Summary', type: 'textarea' }
  ]
});

await etch.content.updateItemAsync(courseId, {
  fields: {
    lessons: [
      { title: 'Intro', summary: 'What we will build.' },
      { title: 'Runes', summary: 'State in Svelte 5.' }
    ]
  }
});
```

Writing a repeater's value replaces all of its items.
