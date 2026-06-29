---
title: Skills
sidebar_position: 85
sidebar_custom_props:
  badge: "New"
last_update:
  date: 2026-06-29
---

# Skills

`etch.skills` (`EtchSkillsApi`) exposes the bundled, **read-only authoring guides** the Etch builder ships — for example the Automatic.css conventions. They're meant to be read by tooling driving the builder (an AI assistant connected over the [AI Connector](../etch-connector/introduction.md), say) so it can follow Etch's authoring conventions instead of guessing.

Skills follow a **progressive-disclosure** model: a lightweight summary for discovery, a full guide body, and per-reference subskill documents loaded on demand. The expected flow is `list()` → `get()` the relevant skill → `getReference()` for individual references only when needed.

:::info Read-only and synchronous
All three methods are synchronous and never hit the network — content is bundled at build time or generated from live page state. There are no mutating methods here, and no `saveAsync()` is involved.
:::

:::note Runtime-dependent set
The available skills depend on what's active on the page: a skill tied to an integration is only listed when that integration is present (e.g. the ACSS skill appears only when Automatic.css is installed), and some references are generated on demand from live page state rather than bundled. Always call `list()` to see what's currently available rather than assuming a fixed set.
:::

## Skills

```ts
interface EtchSkillsApi {
  list(): SkillSummary[];                                    // all skills (no bodies)
  get(name: string): SkillDetail | undefined;                // one skill incl. its body
  getReference(name: string, file: string): string | undefined; // one reference document
}
```

Lookups by an unknown `name` or reference `file`, or for a skill whose integration isn't currently active, return `undefined` rather than throwing — so you can probe the surface without guarding every call.

```ts
interface SkillSummary {
  name: string;                       // stable id from frontmatter `name`, e.g. "acss" (lowercase)
  description: string;                // one-line summary of when the skill applies
  metadata: Record<string, unknown>;  // arbitrary frontmatter metadata, e.g. { acss_min_version: "..." }
  references: string[];               // reference (subskill) filenames, e.g. ["colors.md", "spacing.md"]
}

interface SkillDetail extends SkillSummary {
  content: string;                    // the primary guide as Markdown, frontmatter stripped (the SKILL.md body)
}
```

:::tip `name` is the frontmatter name
The `name` used to address a skill in `get()` and `getReference()` is the skill's frontmatter `name` (e.g. `acss`), **not** its on-disk directory name. The `references` array is derived from the files that actually ship, so it never drifts from what's loadable.
:::

```ts
// 1. Discover what's available
const skills = etch.skills.list();
// → [{ name: "acss", description: "Automatic.css conventions…", metadata: {…}, references: ["colors.md", "spacing.md"] }, …]

// 2. Load a full guide body by name
const acss = etch.skills.get("acss");
if (acss) {
  console.log(acss.content); // the SKILL.md body as Markdown
}

// 3. Pull an individual reference only when you need it
const colors = etch.skills.getReference("acss", "colors.md");
if (colors) {
  console.log(colors); // Markdown content of that reference
}

// Unknown names / references return undefined rather than throwing
etch.skills.get("does-not-exist");                 // → undefined
etch.skills.getReference("acss", "missing.md");    // → undefined
```
