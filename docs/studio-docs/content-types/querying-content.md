---
title: Querying Content
sidebar_position: 10
---

# Querying Content

`queryContent()` reads your project's own content: pages, and any
[content type](README.md) you've defined. It's available inside a
[JavaScript data source](../data-sources/javascript.md), and nowhere else.

```js
return await queryContent({
	type: 'course',
	where: { 'fields.level': 'beginner' },
	orderBy: 'title',
	order: 'asc',
	limit: 10
});
```

Whatever it returns becomes the value of `data('key')`, ready to loop:

<!-- prettier-ignore -->
```html
{#loop data('beginnerCourses') as course}
  <article>
    <h2>{course.title}</h2>
    <p>{course.fields.level}</p>
    <a href="/{course.slug}">Read more</a>
  </article>
{/loop}
```

## The query

Every clause is optional. `queryContent()` with no arguments reads every page.

| Clause          | Type                | Meaning                                                                       |
| --------------- | ------------------- | ----------------------------------------------------------------------------- |
| `type`          | string              | A content type's **key**. Defaults to `page`.                                 |
| `where`         | object              | Filters, keyed by field name.                                                 |
| `orderBy`       | string              | The field to sort by.                                                         |
| `order`         | `'asc'` \| `'desc'` | Sort direction.                                                               |
| `limit`         | number              | How many to take. `-1` means all of them.                                     |
| `offset`        | number              | How many to skip.                                                             |
| `relationDepth` | number `0`–`5`      | Levels of [relationship links](#relationship-fields) to resolve. Default `3`. |

The query runs **in the database**. A `limit` of 10 fetches ten rows, not a
thousand rows filtered down to ten afterwards, so paging and filtering stay
cheap as a project grows.

## `where`

Keys are field names, values are conditions. A bare value means equality:

```js
where: {
	slug: 'about';
}
```

Everything else is an operator object:

| Operator       | Example                                  | Matches                 |
| -------------- | ---------------------------------------- | ----------------------- |
| `not`          | `{ slug: { not: 'about' } }`             | Not equal to            |
| `in`           | `{ slug: { in: ['about', 'contact'] } }` | Any of                  |
| `contains`     | `{ title: { contains: 'guide' } }`       | Substring               |
| `gt` / `gte`   | `{ id: { gte: 100 } }`                   | Greater than / or equal |
| `lt` / `lte`   | `{ id: { lt: 50 } }`                     | Less than / or equal    |

Multiple keys are combined, and all of them must match:

```js
return await queryContent({
	where: {
		id: { equals: 12 },
		title: { contains: 'guide' }
	},
	orderBy: 'createdAt',
	order: 'desc'
});
```

`in` takes at least one value. `gt`/`gte`/`lt`/`lte` take numbers; `contains`
takes a string.

## Which fields you can filter and sort by

The page's own columns, named as they are:

`id` · `slug` · `title` · `contentTypeId` · `createdAt` ·
`updatedAt`

And every field the type declares, named `fields.<key>` — the same prefix you
read them back under:

```js
return await queryContent({
	type: 'course',
	where: { 'fields.level': 'beginner', 'fields.duration': { lte: 60 } },
	orderBy: 'fields.duration'
});
```

Both work in `where` and `orderBy`, and the two can be mixed in one query.
Values compare as the field's type: a number field compares as a number, a
boolean as a boolean.

**An item with no value for the field matches nothing** — not even `not`, which
asks whether a value differs and needs a value to ask about. A key nothing has
is the same case, so `fields.levl` is an empty result rather than an error.
Check the spelling in the Data Manager's preview when a filter comes back with
less than you expected.

Dropping the prefix is different: `where: { level: … }` is an error, because
that slot is where a page column goes and there is no column called `level`.

## What comes back

An array of records. Each one is the page's own columns, with the values of its
declared fields under `fields`:

```json
{
  "id": 12,
  "slug": "morning-vinyasa",
  "title": "Morning Vinyasa",
  "contentTypeId": 4,
  "content": [ … ],
  "fields": {
    "level": "beginner",
    "duration": 45,
    "instructor": "Ada Lovelace"
  },
  "createdAt": "2026-08-01T09:12:00.000Z",
  "updatedAt": "2026-08-04T14:03:00.000Z"
}
```

Two things to note:

- **`content` is the page's block tree**, decoded. It's returned but there is
  nothing useful to do with it in markup, since it's a document, not a value.
- **Your fields have a namespace of their own.** Read them as
  `{course.fields.level}`, never `{course.level}`. Nothing you name can collide
  with a page column, so a field keyed `title` is yours — and a column added to
  pages in a later release can't take a key away from a field you already
  defined.

The Data Manager's preview pane shows the real records for your query, which is
the quickest way to confirm a shape before writing the loop.

## Relationship fields

A relationship field comes back resolved into the full record it links to,
block tree included — and that record's own links are resolved too, three
levels deep by default. A link past the last resolved level is the `id` it
points at.

On a densely linked content model the payload multiplies with every level and
can exhaust the sandbox's memory. Pass `relationDepth` to resolve less:

```js
return await queryContent({
	type: 'course',
	relationDepth: 1
});
```

| `relationDepth` | Result                                             |
| --------------- | -------------------------------------------------- |
| `0`             | Every link stays the `id` it points at             |
| `1`             | Only directly linked records are resolved          |
| `3`             | The default                                        |
| `5`             | The maximum; anything higher is an `invalid query` |

There is no field selection, so if a loop needs only a few values, return a
compact projection instead of the raw records:

```js
const courses = await queryContent({ type: 'course', relationDepth: 1 });

return courses.map((course) => ({
	title: course.title,
	slug: course.slug,
	instructor: course.fields.instructor?.title
}));
```

## Errors

`queryContent()` throws, which fails the data source and shows the reason in the
Data Manager:

| Message                                                                                                                     | Cause                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `content type "course" does not exist`                                                                                      | No type with that key in this project                                                                           |
| `invalid query: Unknown field "level" — available fields: id, slug, title, contentTypeId, createdAt, updatedAt` | A `where` or `orderBy` naming no page column — most often a declared field written without its `fields.` prefix |
| `invalid query: limit: must be a positive number, or -1 for no limit`                                                       | A malformed clause; the message names the problem                                                               |
| `queryContent failed: …`                                                                                                    | Anything else                                                                                                   |

Catch it yourself if you'd rather degrade quietly:

```js
try {
	return await queryContent({ type: 'course', limit: 6 });
} catch {
	return [];
}
```

## Recipes

### The N most recent pages

```js
return await queryContent({
	orderBy: 'createdAt',
	order: 'desc',
	limit: 3
});
```

### One page by slug

```js
const [slug] = args;
const [page] = await queryContent({ where: { slug } });

return page;
```

Used as `{data('pageBySlug', 'about').title}`.

### Paged listing driven by arguments

```js
const [page = 1, perPage = 10] = args;

return await queryContent({
	type: 'course',
	orderBy: 'title',
	order: 'asc',
	limit: Number(perPage),
	offset: (Number(page) - 1) * Number(perPage)
});
```

### A type's pages, grouped

See [grouping content for nested loops](../data-sources/javascript.md#grouping-content-for-nested-loops).

## Remember when this runs

Queries resolve **while the site is being built**, not when a visitor arrives.
The deployed site is static HTML with the results already in it. Add a page and
the live site won't show it until the next deploy.

## Next

- [JavaScript sources](../data-sources/javascript.md): the sandbox queries run in
- [Content Types](README.md): defining the types you query
- [Data Sources](../data-sources/README.md): using the result across your site
