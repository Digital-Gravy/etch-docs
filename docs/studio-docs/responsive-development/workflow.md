---
title: Recommended Workflow
sidebar_position: 1.5
---

# Recommended Workflow

This guide walks through a practical, start-to-finish workflow for building fully responsive pages and components in Etch. If you follow this approach, you'll end up with designs that respond smoothly across the entire range of device sizes — not just at a handful of arbitrary breakpoints.

## Step 1: Build the structure and add your selectors

Before thinking about responsiveness, focus on building the HTML structure for your page or component. Add your elements, nest them properly, and assign your CSS selectors (classes, IDs, etc.) using the selector bar (`Cmd/Ctrl + Enter`).

Getting a clean, semantic structure in place first gives you a solid foundation. Responsive adjustments are much easier when your markup is well-organized and your selectors are already attached.

## Step 2: Style mobile-first (recommended)

While Etch doesn't force any particular direction, starting from the smallest canvas size and working up is generally more efficient. Here's why:

- **Less code overall.** Small-screen layouts tend to be simpler — usually a single column with stacked elements. Writing your base styles for this simple layout means your responsive queries only need to *add* complexity (like multi-column grids) rather than *undo* it.
- **Progressive enhancement.** You're layering on enhancements as space becomes available, which is more logical than writing complex layouts first and then overriding them for smaller screens.
- **Fewer overrides.** Desktop-first workflows often require more `max-width` queries to strip away styles at smaller sizes. Mobile-first naturally avoids this.

In most other page builders, working desktop-down is often more practical — not because it's the better approach in theory, but because those tools are built around fixed breakpoint systems with inefficient styling panels, no canvas measuring, and no auto-query insertion. Their workflows simply aren't optimized for mobile-first development, so fighting against their grain costs you time.

Etch is different. It's a fully featured responsive development environment with a fluid canvas, precise auto-measuring, and automatic query generation. These tools remove the friction that makes mobile-first tedious in other builders, letting you take the approach that actually produces cleaner, more efficient code.

That said, this is a recommendation, not a requirement. Some components or layouts genuinely make more sense to style desktop-first. Use your judgment.

## Step 3: Use the dynamic canvas and auto-generated queries

This is where Etch's responsive workflow really shines compared to traditional builders.

1. **Drag the canvas** using the responsive handles to preview your design fluidly across the full range of sizes. There are no preset "breakpoints" to click through — you see exactly how your design behaves at every width.
2. **Spot where things break.** As you drag, you'll notice points where your layout stops working well — text overflows, columns get too narrow, spacing looks off. These are the points where you need responsive adjustments.
3. **Let Etch generate the query.** When you find a point that needs a change, use the responsive controls to auto-insert a container query or media query. Etch reads the current canvas measurement (for media queries) or element measurement (for container queries) and writes the query condition for you with the exact value.
4. **Add your style changes inside the query.** Once Etch inserts the query block, the CSS Quick Actions Bar resets so you can immediately start adding the styles that should apply at that size — no manual query writing required.

This approach means your responsive "breakpoints" are determined by your content and layout needs, not by arbitrary device sizes. Every query exists because something actually needed to change at that specific dimension.

:::tip
When using container queries, add the "Has Me" selector first (available in the responsive controls). This ensures your container query context is automatically established wherever the component is placed. See the [Responsive Controls](../interface/responsive-controls) article for details.
:::

## Step 4: Use @custom-media for recurring queries

If you find yourself writing the same query condition across multiple selectors — for example, a width where your site's navigation collapses, or a size threshold shared by several card components — define it as a `@custom-media` token.

```css
@custom-media --nav-collapse (width <= 820px);
@custom-media --card-wide (width >= 421px);
```

Then reference the token instead of repeating raw values:

```css
.nav {
	@media (--nav-collapse) {
		/* collapsed nav styles */
	}
}
```

Named tokens make your responsive code more readable, easier to maintain, and portable when sharing components. See the [Custom Media](./custom-media) article for setup details.

## The result: full-range responsiveness

When you follow this workflow — clean structure, mobile-first base styles, content-driven queries via the dynamic canvas, and named tokens for shared conditions — your designs won't just work at "mobile, tablet, and desktop." They'll work smoothly at every size in between.

This is the core difference between Etch's approach and traditional breakpoint-based builders. Instead of optimizing for three or four snapshot sizes and hoping everything in between looks acceptable, you're building a design that genuinely responds to available space throughout the entire device range.
