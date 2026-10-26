---
name: sync-studio-changelog
description: Mirror the Etch Studio changelog API into the static docs page studio-docs/changelog.md.
disable-model-invocation: true
---

# Sync the Studio changelog

`docs/studio-docs/changelog.md` is a **mirror** of `https://studio.etchbuilder.io/api/changelog`. The API is the source of truth: anything added, edited or removed there is added, edited or removed on the page.

## Steps

1. **Fetch** `https://studio.etchbuilder.io/api/changelog`. If an entry has `details` (a path like `/changelog/2026-10-21-new-x.md`), fetch `https://studio.etchbuilder.io<path>` too. If any request fails, stop and report it, leaving the page as it was.
2. **Rewrite** every date section of `changelog.md` from the API data, in the format below. Leave the front matter and intro untouched. Done when every API entry appears exactly once and the page has no entry the API lacks.
3. **Build.** From `docs/`, run `CI=1 npm run build`. It must finish with `[SUCCESS]`. On an MDX error, fix the escaping and build again.
4. **Report** the entries added, changed and removed (by date and title), or "No changes". Leave the changes uncommitted for the user to review.

## Format

Dates go newest first. Within a date, keep the API's order.

```md
## October 21, 2026 {#2026-10-21}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Redirects per route**

  Send a route's visitors to another address.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Steady search preview**

  The search preview no longer jumps around.

  <details>
  <summary>Show details</summary>

  The details Markdown, as fetched, indented to sit inside the list item.

  </details>
```

- **Date heading:** English month name, day without a leading zero, four-digit year, followed by the `{#YYYY-MM-DD}` id.
- **Type badge:** the `<span>` above, with the modifier `changelog-badge--new`, `--improved` or `--fixed` and the label `New`, `Improved` or `Fixed`. The colours and the timeline come from `docs/src/css/custom.css`.
- **Spacing:** keep a blank line between items, and indent the description and details by two spaces under the title line.
- **No description:** the item is just the title line.
- **Details:** add the `<details>` block only when the entry has one, and drop any front matter from the fetched file.

## Escaping

Docusaurus compiles `.md` as MDX. Outside code spans and code blocks, write `{` as `\{`, `}` as `\}` and `<` as `\<` in any text copied from the API, raw HTML in details included. Leave code verbatim.
