---
title: Data Sources
sidebar_position: 135
---

# Data Sources

A **data source** is a named piece of data that belongs to your project. Define
it once in the Data Manager, give it a key, and read it anywhere an Etch
expression is allowed:

<!-- prettier-ignore -->
```html
<h1>{data('siteConfig').tagline}</h1>
```

Three kinds ship today:

| Type           | What it holds                                                 | Page                                |
| -------------- | ------------------------------------------------------------- | ----------------------------------- |
| **JSON**       | Data you write by hand                                        | [JSON sources](json.md)             |
| **API**        | The response of an HTTP request                               | [API sources](api.md)               |
| **JavaScript** | Whatever your code returns, including your own site's content | [JavaScript sources](javascript.md) |

## Why data sources replace loop sources

In Etch for WordPress, a loop's data came from a **loop source**: a query you
configured on the loop, for the loop. It answered one question ("what does this
loop repeat over?") and nothing else could ask it. Wanting the same list in a
heading, a `data-` attribute, or a conditional was not easily possible.

Studio inverts that. **The data is the thing that exists; the loop is just one
consumer of it.**

- **Defined once, in one place.** Every source lives in the Data Manager under a
  key. Change the query, and every place that reads it changes with it.
- **Usable anywhere, not just in loops.** `data('key')` is an expression
  function, so it works wherever expressions work: text, attributes, loop
  targets, component props, conditions.
- **Inspectable before you use it.** The Data Manager shows the resolved value
  next to the editor, so you see the real shape before you write a single
  `{item.…}`.
- **Not limited to a query builder.** A JavaScript source can shape, merge,
  filter and combine data any way you like, including
  [querying your own content](../content-types/querying-content.md).

A loop, in other words, no longer owns its data. It points at a data source like
everything else does:

<!-- prettier-ignore -->
```html
{#loop data('courses') as course}
  <li>{course.name}</li>
{/loop}
```

## Creating a data source

1. Open the **Data Manager** from the left rail (the database icon). The command
   bar also has a "Data Manager" action.
2. Select **+** in the sidebar.
3. Fill in the create form:
   - **Name:** the label you'll see in the sidebar. Rename it freely later.
   - **Key:** the identifier `data()` uses. Auto-derived in camelCase from the
     name; edit it if you want something else. Keys must be unique in the
     project.
   - **Type:** JSON, API or JavaScript.
4. Select **Create**.

{/* TODO: screenshot of the Data Manager create form, with the Name, Key and Type fields and the Create button */}

The new source opens in the editor with a starting point for its type.

### Choosing a key

The key is what your markup says, so it's worth a moment's thought. `courses`
reads better than `dataSource1`, and `upcomingCourses` better still if that's
what it is. Renaming a source's **name** is free; changing its **key** means
updating every `data('…')` that referenced the old one.

## The Data Manager

**The sidebar** lists every source grouped by type (`JSON DATA`,
`EXTERNAL APIS`, `JAVASCRIPT`) with a search box above. Right-click a source
for **Rename**, **Duplicate** and **Delete**. Renaming changes the display name
only; the key stays put, so nothing that reads it breaks.

**The editor** in the middle is specific to the source's type, with a tab strip
for switching type and, where a type offers them, its sub-views (Visual / Code
for JSON, Visual / cURL for API).

**The preview** on the right shows the resolved value as an expandable tree: the
exact value `data('key')` returns. Selecting a row copies its path, so you can
paste `item.address.city` rather than typing it out. **Reload** clears the cached
value and resolves the source again, which is what re-runs an API request.

If a source fails, the preview shows why: a failed request, a JavaScript error,
a query naming a content type that doesn't exist.

## Using a data source

### Anywhere an expression goes

`data()` is an ordinary expression function, so any place that accepts `{…}`
accepts it:

<!-- prettier-ignore -->
```html
<h1>{data('siteConfig').tagline}</h1>
<img src="{data('hero').image.url}" alt="{data('hero').image.alt}" />
<a href="{data('siteConfig').ctaUrl}">Get started</a>
<div data-region="{data('siteConfig').region}"></div>
```

That's the point worth internalising: **a data source is not a loop feature.**
Site-wide settings, a hero image, a phone number in the footer, a feature flag
driving a condition: all reasonable data sources, none of them loops.

### Reaching into the value

Use dot notation for object properties and bracket notation for array indexes:

<!-- prettier-ignore -->
```html
{data('profile').name}
{data('courses')[0].title}
{data('settings').contact.email}
```

### Modifiers

The usual Etch modifiers chain off the result:

<!-- prettier-ignore -->
```html
{data('tags').join(', ')}
{data('courses').length()}
{data('article').publishedAt.format('F d, Y')}
```

### In loops

Point the loop at the source:

<!-- prettier-ignore -->
```html
{#loop data('courses') as course}
  <li>
    <h3>{course.name}</h3>
    <p>{course.time}</p>
  </li>
{/loop}
```

You can select the source from the loop's properties panel instead of typing it.
The **Select Data Source** dropdown lists every source in the project and inserts
the matching `data('…')` for you.

Add an index by naming a second variable:

<!-- prettier-ignore -->
```html
{#loop data('courses') as course, index}
  <li data-position="{index}">{course.name}</li>
{/loop}
```

Nested data loops the same way, and the inner loop doesn't need its own source:

<!-- prettier-ignore -->
```html
{#loop data('categories') as category}
  <h2>{category.name}</h2>
  {#loop category.courses as course}
    <li>{course.name}</li>
  {/loop}
{/loop}
```

### Passing arguments

Extra arguments to `data()` travel through to the source:

<!-- prettier-ignore -->
```html
{#loop data('coursesByCategory', 'yoga', 5) as course}
  <li>{course.name}</li>
{/loop}
```

Only [JavaScript sources](javascript.md) do anything with them, where they arrive
as `args`. JSON and API sources ignore them, but each distinct set of arguments
is cached separately.

## How values are resolved

**Resolved once, then cached.** The first `data('courses')` of a render fetches
and computes; the rest reuse the result. The cache key is the source's key plus
the arguments, so `data('c', 'yoga')` and `data('c', 'pilates')` are separate
entries.

**Editing invalidates.** Saving a source in the Data Manager drops its cached
value, so the canvas re-resolves it. **Reload** in the preview forces the same
thing without an edit.

**Failure is survivable.** A source that throws, whether a 500 from an API or a
JavaScript error, resolves to nothing rather than breaking the render. The page
renders with that value empty and the Data Manager shows the reason. An
unconfigured source (an API with no URL, a JavaScript source with no code) is
simply empty; that's not an error.

**Resolution happens at build time for deployed sites.** When you deploy or
download, every page is rendered on the server and the resolved values are baked
into the HTML. Your deployed site is static: it does not call your API on each
visit. To publish fresh data, deploy again.

## Next

- [JSON sources](json.md): hand-written data
- [API sources](api.md): external HTTP endpoints
- [JavaScript sources](javascript.md): computed data and content queries
- [Querying content](../content-types/querying-content.md): reading your own pages
