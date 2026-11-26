---
title: Content Types
sidebar_position: 136
---

# Content Types

A **content type is a kind of page**. "Team member", "Recipe" and "Course" are
each a page with blocks and a slug like any other, plus structured fields that
belong to that kind of thing: a job title, a serving count, a difficulty level.

That's the whole idea, and it's worth stating plainly because it rules out a
common misreading: a content type is _not_ a separate table of records living
next to your pages. A team member **is** a page. It appears in the page list, it
renders, it exports, it gets a URL.

## Types hold the schema; pages hold the values

Two halves, and knowing which is which explains most of the behaviour:

- **The content type** holds the **field definitions**, meaning what a Course
  _has_: a `level`, a `duration`, an `instructor`, each with a type and
  validation rules.
- **The page** holds the **values**: this course's level is `beginner`, its
  duration is `45`.

Definitions live in exactly one place. Rename a field's label or tighten its
validation and every page of that type picks it up at once, because there's no
copy on each page to drift out of sync.

## The `page` type

Every project has a content type keyed `page`. It's what an ordinary page is,
and it's what a query reads when it doesn't name a type.

You can't delete it. Deleting a content type deletes its pages, and deleting
`page` would take the whole site, so Studio refuses.

## Creating a content type

In the **Content Hub**, on the **Content** tab:

1. Select **+** next to **Content Types**.
2. Enter a name, such as `Course`, in the new sidebar entry and confirm it.

Studio selects the new type, generates its initial key from the name (for
example, `course`), and creates a data source for it. The name is the label
shown in the editor; the key is the machine name used in queries. You can
change the name later without changing the key.

## Creating pages of a type

Select the type in the sidebar to see its pages. Enter a title in the table's
footer row and select **Create Item**, or press <kbd>Enter</kbd>. The **New
Item** button above the table focuses the title field.

Use the row's **Open in Builder** action to edit the page. To give it an
address, assign it to a route in the [Routes Manager](../routing/README.md).
Assign a page to the `/` route to make it the homepage.

An item created under the `page` type is an ordinary page of that type.

## Fields

A field definition has three parts:

| Part     | Notes                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| **Name** | The human label shown in the editor.                                                                             |
| **Key**  | The machine name a query reads. New keys start with a lowercase letter, followed by letters (uppercase or lowercase), digits or underscores. Existing hyphenated keys remain readable, but new ones are refused. |
| **Type** | Which editor the field gets and what it accepts.                                                                 |

The **Fields** tab in the sidebar edits them for whichever type is selected. The
**+** next to the **Fields** heading opens a menu of types; picking one appends a
field and scrolls to it. Hold <kbd>⇧</kbd> while clicking to add several without
the menu closing.

Each field is a card with its name, key and type in the header. The copy button
beside the key puts it on the clipboard, ready to paste into a query.

### Field types

**Text** · **Textarea** · **Number** · **Link** · **Email** · **Boolean** ·
**Select** · **Image** · **Relationship** · **Repeater**

A field's settings are on the card's **General** tab. Every type takes a **Help
text**, shown to whoever fills the field in, and the **Make field required**
button in the header makes it required. On top of that:

| Type                                        | Settings                                                               |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| **Text**, **Textarea**, **Link**, **Email** | **Placeholder** and **Default value**                                  |
| **Number**                                  | **Placeholder**, **Default value**, and **Min** and **Max**            |
| **Boolean**                                 | **Default value**, and optional labels for the two states              |
| **Select**                                  | **Options** and **Default value**                                      |
| **Relationship**                            | The type it links to, one item or many, and the label of the link back |
| **Repeater**                                | Its **Sub-fields**. See [Repeater fields](repeater-fields.md)          |

**Select** takes its options one per line, as a label and a value separated by a
colon:

```
Beginner : beginner
Intermediate : intermediate
Advanced : advanced
```

A line with no colon uses its text as both label and value.

The **Repeater** menu is experimental: turn it on in **Settings → Experimental →
Repeater Field**. The [public API](../public-api/content.md) can add repeater fields without checking this setting.

The **Advanced**, **Validation** and **Conditions** tabs are visible but not yet
enabled.

### Renaming

You can rename a content type by editing its name in the header or
double-clicking it in the sidebar. Its key stays the same. To change the key,
edit it separately in the header. Pages reference the type by ID, but update any
queries and data sources that refer to the old key.

A **field's key** can be changed too. Every page of the type stores its value
under that key, so renaming `role` to `job_title` moves the value on every page
along with the definition. What Etch doesn't rewrite is your own markup and
queries: a `{this.fields.role}` or a `where: { 'fields.role': … }` still reads
the old key, and finds nothing, until you update it.

Deleting a field deletes its value from every page.

### Reading fields

On a page of the type, and in a template that serves it, the page's own fields
are under `this.fields`: `{this.fields.level}`. A [query](querying-content.md)
returns them the same way, so a loop over courses reads `{course.fields.level}`.

## Next

- [Querying content](querying-content.md): `queryContent()`, filters, ordering,
  and what comes back
- [Repeater fields](repeater-fields.md): lists of items inside a single field
- [JavaScript sources](../data-sources/javascript.md): where queries are written
- [Data Sources](../data-sources/README.md): using the result in your markup
