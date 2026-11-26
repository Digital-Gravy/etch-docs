---
title: JavaScript Sources
sidebar_position: 30
---

# JavaScript Sources

A JavaScript source is a function you write. Studio runs it and whatever you
`return` becomes the value of `data('key')`.

It's the source type to reach for when the data has to be _computed_: derived
lists, generated ranges, data shaped to fit your markup, and above all
[querying your own content](../content-types/querying-content.md).

## Creating one

In the Data Manager, select **+**, name the source, choose **JavaScript**, and
create it. The editor opens with a starting point:

```js
const category = args[0] ?? 'all';

return [];
```

What you write is a **function body**, not a whole file, so `return` is yours to
use directly and there's no wrapper to declare.

{/* TODO: screenshot of a JavaScript source open in the editor, with the format and snippet buttons in the editor bar and the returned value as a tree in the preview */}

The editor bar has two tools:

- **Format JavaScript** tidies your code.
- **Insert snippet** (the lightning icon) drops in a ready-made starting point.
  Today: **Query Pages**, **Query by Type**, and **Filter by Field**.

> **💡 Tip:** AI models write this kind of code well, so describe what you want
> back ("group these posts by year, newest first") and paste it in. Two things
> are worth putting in the prompt: it's a **function body**, not a whole file,
> so it should `return` directly rather than declare a wrapper; and it runs in
> [a sandbox](#the-sandbox) whose only inputs are `args` and `queryContent()`,
> with no `fetch`, no `import` and no npm packages.

Every keystroke is saved. Unlike JSON there's nothing to parse first, so code
that doesn't run yet is still stored.

## What you get

### `args`

Whatever the expression passed to `data()` arrives as an array named `args`:

<!-- prettier-ignore -->
```html
{#loop data('coursesByCategory', 'yoga', 5) as course}
  <li>{course.name}</li>
{/loop}
```

```js
const [category = 'page', limit = 10] = args;

return await queryContent({
	type: category,
	limit: Number(limit)
});
```

Each distinct set of arguments is cached separately, so `data('c', 'yoga')` and
`data('c', 'pilates')` each run the function once.

### `queryContent()`

The one host function lent to your code. It queries the project's own content:
pages and any content types you've defined.

```js
return await queryContent({
	type: 'page',
	orderBy: 'title',
	order: 'asc',
	limit: 10
});
```

It's `async`, so `await` it. The full query vocabulary (`where` operators,
ordering, limits, and what comes back in each record) is documented in
[Querying content](../content-types/querying-content.md).

### What you return

Anything JSON-serialisable: objects, arrays, strings, numbers, booleans, `null`.

Returning a **function** or a **symbol** is rejected with a message rather than
silently handing you an empty object.

## The sandbox

Your code runs in an isolated sandbox with no access to the page, the network, or
Studio's internals. That's what makes it safe to run both in the builder and on
the server at build time.

Concretely, inside a JavaScript source there is **no**:

- `fetch`, `XMLHttpRequest` or any other way to make a request
- `window`, `document` or DOM
- `localStorage`, cookies, or file access
- `require` / `import`
- access to other data sources; `data()` is not available inside a source

The only way in is `args`. The only ways out are your return value and
`queryContent()`.

Standard JavaScript itself is all there: `Array`, `Object`, `Math`, `JSON`,
`Date`, `String`, destructuring, `async`/`await`, and so on.

### Limits

| Limit          | Value    |
| -------------- | -------- |
| Execution time | 1 second |
| Memory         | 16 MB    |
| Stack          | 512 KB   |

Time spent waiting on `queryContent()` is **not** charged against your second;
the clock only covers your own computation.

Exceed a limit and the source fails with a message:

```text
stopped after 1000ms — the code ran too long
```

## When it fails

Anything that goes wrong (a thrown error, a syntax error, an infinite loop, an
unserialisable return value) resolves the source to nothing and shows the reason
in the Data Manager. Pages using it render with that value empty rather than
breaking.

**Empty code is not a failure.** A source you haven't written yet is just empty.

You can catch problems yourself and return a fallback:

```js
try {
	return await queryContent({ type: 'course', limit: 10 });
} catch {
	return [];
}
```

## Examples

### Every page, newest first

```js
return await queryContent({
	type: 'page',
	orderBy: 'createdAt',
	order: 'desc'
});
```

### A parameterised query

```js
const [type = 'page', limit = -1] = args;

return await queryContent({
	type,
	limit: Number(limit)
});
```

Used as `data('content', 'course', 6)`.

### Grouping content for nested loops

```js
const courses = await queryContent({ type: 'course', limit: -1 });

const byLevel = {};
for (const course of courses) {
	(byLevel[course.fields.level] ??= []).push(course);
}

return Object.entries(byLevel).map(([level, items]) => ({ level, items }));
```

<!-- prettier-ignore -->
```html
{#loop data('coursesByLevel') as group}
  <h2>{group.level}</h2>
  {#loop group.items as course}
    <li>{course.title}</li>
  {/loop}
{/loop}
```

### Data with no source at all

```js
const year = 2026;
return Array.from({ length: 12 }, (_, month) => ({
	month: month + 1,
	label: new Date(year, month, 1).toLocaleString('en', { month: 'long' })
}));
```

## Notes

- Runs once per key + arguments per render, then caches. Saving the source or
  selecting **Reload** in the preview re-runs it.
- Runs on the server at deploy time too, so the result is baked into the
  deployed HTML. See
  [how values are resolved](README.md#how-values-are-resolved).
