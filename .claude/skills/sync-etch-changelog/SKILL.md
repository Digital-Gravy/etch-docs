---
name: sync-etch-changelog
description: Mirror the Etch changelog from account.etchwp.com into the static docs page docs/changelog.md.
disable-model-invocation: true
---

# Sync the Etch changelog

`docs/docs/changelog.md` is a **mirror** of `https://account.etchwp.com/changelog/`. That site is the source of truth: a release added, edited or removed there is added, edited or removed on the page. Never edit a release section by hand; the next sync overwrites it.

The Etch Studio changelog is a different page with its own skill, `sync-changelog`.

## Steps

1. **Sync.** From `docs/`, run `node scripts/sync-etch-changelog.js`. It reads every release from the site's REST API and rewrites all release sections, leaving the front matter and intro untouched. If it fails, stop and report the error; the page is only written after every request succeeded.
2. **Build.** From `docs/`, run `CI=1 npm run build`. It must finish with `[SUCCESS]`.
3. **Report** the releases the script lists as added, changed and removed, or "No changes". Leave the changes uncommitted for the user to review.

## When the build fails

- **Broken link:** a release links to a docs page that has moved. Add the old and new path to `MOVED_DOCS` in the script, then sync and build again.
- **MDX error:** a release contains a character the script does not escape yet. Fix `escapeText` in the script, not the page.

## Format

One section per release, newest first. The script produces it; this is what to expect in the diff.

```md
## 1.8.2 · November 10, 2026 {#1-8-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Structure rendering now supports an opt-in `lazy-once` mode.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Generated excerpts now preserve whitespace between adjacent elements.

<details>
<summary>Release notes</summary>

The release's prose, when it has any.

</details>
```

The badge modifiers are `--new`, `--improved`, `--fixed` and `--breaking`. Their colours and the timeline come from `docs/src/css/custom.css`.
