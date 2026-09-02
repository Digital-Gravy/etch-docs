---
title: Using a Component (Dynamic)
sidebar_position: 50
---

# Using a Component (Dynamic Data)

Dynamic usage means a component's props are populated by dynamic data keys — from loops, templates, or other dynamic contexts — rather than manually entered values. This is how you build repeating, data-driven layouts with components.

## Component Scope

Before anything else, there is one critical concept to understand:

:::warning
**Never use loop or template keys directly inside a component.** Components have their own scope and cannot access external data unless it's explicitly passed in via a prop.
:::

Keys like `{post.title}`, `{item.name}`, or any loop/template-level data will **not** resolve inside a component. This is by design. Components are self-contained — they only have access to global data (`this`, `site`, `url`) and whatever is explicitly passed in through their props.

To use dynamic data in a component, you pass dynamic data keys as prop values when using the component instance.

## Using Components in Loops

The most common dynamic use case is placing a component inside a loop. The workflow is straightforward:

### 1. Build the component with regular props

In the component editor, create your props as normal — Text, Image, Boolean, etc. Map them to the component's elements just like you would for static usage.

For example, a blog post card might have:

- **Post Title** (Text) → mapped to the heading element
- **Post Image** (Image) → mapped to the image element
- **Post Link** (Text) → mapped to the link's `href`

### 2. Place the component inside a loop

Drop your component inside a loop on the canvas. For example, place your blog post card inside a posts loop.

### 3. Fill in props with dynamic data keys

When you select the component instance, you'll see the prop inputs in the properties panel — the same inputs you'd use for static data. Instead of typing hardcoded values, enter dynamic data keys:

- **Post Title** → `{item.title}`
- **Post Image** → `{item.image.id}`
- **Post Link** → `{item.permalink.relative}`

Each iteration of the loop will resolve these keys to the correct data for that item.

## Using Components in Templates

The same approach works in templates. If a template provides dynamic context (like the current post being viewed), pass that data into the component's props using dynamic data keys.

For example, a hero component used in a single post template might have:

- **Heading** → `{this.title}`
- **Featured Image** → `{this.featuredImage}`

The component itself never directly references template-level data — it always receives data through its props.

## Example: Blog Post Card in a Loop

Here's a complete example tying everything together.

**Component setup (in the component editor):**

1. Create the following props:
   - **Post Title** (Text)
   - **Post Image** (Image)
   - **Post Link** (Text)
   - **Is Featured** (Boolean)
2. Map each prop to the appropriate element in the component
3. Save the component

**Usage (on a page or template):**

1. Create a loop for your blog posts
2. Drop the blog post card component inside the loop
3. Fill in the props with dynamic data keys:
   - **Post Title** → `{item.title}`
   - **Post Image** → `{item.image.id}`
   - **Post Link** → `{item.permalink.relative}`
   - **Is Featured** → leave as static (toggle on/off per instance) or use a dynamic key if available

Each card now renders with the correct post title, image, and link for that iteration of the loop.

## Static vs Dynamic: When to Use Which

| | Static | Dynamic |
|---|--------|---------|
| **Data source** | Manually entered by the user | Populated from loops, templates, or queries |
| **Best for** | One-off pages, unique content | Repeating layouts, data-driven content |
| **Prop values** | Hardcoded text, selected images, toggles | Dynamic data keys like `{item.title}` |
| **Examples** | Landing page hero, about section | Blog post grid, product listings, team members |

:::tip
A single component can be used both ways. You might use a card component statically on a landing page and dynamically inside a loop on an archive page. The component doesn't care where its data comes from — it just needs its props filled in.
:::

## Next Steps

- [Create component variations](./creating-component-variations)
