---
title: Section
---

# Section

The **Section** element in Etch is one of the most fundamental and mission-critical elements for building well-structured websites. Unlike many website builders that make you manually create section structure through multiple steps, Etch provides a dedicated Section element that automatically handles the proper semantic structure, spacing, and layout.

:::info
All examples on this page show the resulting HTML output of the element, but **users are not required to view, write, or edit HTML to use Etch.** This documentation is a teaching aid to help you understand web design. In Etch, you can do everything you need to do visually, without interacting with code.
:::

## Why Proper Section Structure Matters

### Semantic Benefits
The `<section>` tag tells browsers and assistive technologies that the content inside is a distinct, meaningful part of your page. This improves:

- **Accessibility**: Screen readers can better understand your page structure
- **SEO**: Search engines can better understand your content organization
- **Maintainability**: Clear content grouping makes your code easier to manage

### Layout Benefits
Etch's Section element can automatically handle:

- **Content Width**: The inner container establishes your website's content width
- **Gutter System**: Protects your content from touching the edge of the screen at different device sizes
- **Vertical Rhythm**: Block padding establishes consistent vertical spacing
- **Centering**: Content is automatically centered on the inline axis

## What Makes Etch's Section Element Special?

Most website builders require you to manually create section structure through a complex process:

1. Add a generic container
2. Change its tag to `<section>`
3. Add an inner container for content
4. Apply proper classes and styling

This typically takes 4+ clicks per section. And since many page builder users aren't familiar with proper semantics, they often end up building a site with no **Sections** because they don't know they're supposed to create them.

In Etch, you simply drag the **Section** element onto your page and you're done. It automatically creates the proper structure:

```html
<section data-etch-element="section">
  <div data-etch-element="container">
    <!-- Your content here -->
  </div>
</section>
```

## Section Attribute & Sensible Default Styling

You'll notice that the **Section** and **Container** both have a `data-etch-element` attribute. This is to identify it as an Etch element, which helps us (or you) apply any default styles.

For Sections, we set the following sensible defaults:

```css
display: flex;
flex-direction: column;
align-items: center;
```

This starts all Section content in the center and allows you to use gaps to space out your Containers and content.

For Containers, we set the following sensible defaults:

```css
display: flex;
flex-direction: column;
width: 100%;
max-width: var(--content-width);
align-self: center;
```

This starts all your contained content at your website's content width, enables gaps by default, and ensures that contained content always starts int the center of the page.

These defaults will never get in your way – they'll only help you work more efficiently.

:::info
Etch defaults are always added with 0,0,0 specificity, making them extremely easy to override without specificity conflicts. You can remove the applied defaults entirely by removing the `data-etch-element` attribute from the element.
:::

## How to Use the Section Element in Etch

### Adding a Section
1. Click the **Section** element from the Elements panel to add it your page
2. Add your content inside the Section's **Container** element (or outside of it).
3. That's it! The proper structure is created automatically

You can have multiple **Containers** in a **Section** if you'd like, or no containers at all. Unlike traditional page builders, the Etch **Section** element is completely flexible and within your control.

### Recommended Basic Content Structure
```html
<section data-etch-element="section">
   <div data-etch-element="container">
    <h2>About Our Services</h2>
    <p>Discover the wide range of solutions we offer to help your business grow and succeed. Our team is dedicated to providing top-notch support and expertise for every project.</p>
    <a href="/services/overview">Learn more about our services</a>
  </div>
</section>
```

## Best Practices

### 1. Always Include a Heading
Every Section should start with a descriptive heading that clearly indicates its purpose. The first section on the page should include an `H1` and all the others should start with an `H2`. If you don't feel your section needs a heading, then it probably shouldn't be a semantic `section`. You can change it to `div`.

```html
<!-- Good -->
<section data-etch-element="section">
  <h2>Customer Testimonials</h2>
  <!-- testimonials content -->
</section>

<!-- Avoid -->
<section data-etch-element="section">
  <div data-etch-element="container">
    <p>Discover the wide range of solutions we offer to help your business grow and succeed. Our team is dedicated to providing top-notch support and expertise for every project.</p>
    <a href="/services/overview">Learn more about our services</a>
  </div>
</section>
```

### 2. Use Meaningful Section Names
Choose section names that describe the subject of the content. This is important for all users, but especially important for assistive technology (accessibility).

```html
<!-- Good -->
<section data-etch-element="section">
  <h2>Product Features</h2>
  <!-- features content -->
</section>

<!-- Avoid -->
<section data-etch-element="section">
  <h2>Gray Box</h2>
  <!-- content -->
</section>
```

### 3. Keep Sections Focused
Each Section should contain related content that serves a single purpose. If you want to start a new sub topic of the page, start a new section.

```html
<!-- Good - Each section has a clear purpose -->
<section data-etch-element="section">
  <h2>About Our Company</h2>
  <p>We've been serving customers since 2010...</p>
</section>

<section data-etch-element="section">
  <h2>Our Team</h2>
  <div class="team-members">
    <!-- team member cards -->
  </div>
</section>
```

### 4. Consider Accessibility
Sections help screen readers and other assistive technologies understand your page structure:

- Use proper heading hierarchy (h1 → h2 → h3, etc.)
- Ensure each section has a unique, descriptive heading
- Don't skip heading levels

## Styling Considerations

Top level Section elements typically need a consistent block padding default and inline padding default (for gutter). If you're not using a framework like [Automatic.css](https://automaticcss.com) that takes care of this stuff for you, then you'll want to set these defaults yourself.


**See also:**  
- [How to Set Content Width](/how-to/basics/how-to-set-content-width.md)  
- [How to Set Global Section Styles](/how-to/basics/how-to-set-global-section-styles.md)


## When Not to Use Sections

- **Don't use as generic containers:** Use `<div>` for non-semantic wrappers.
- **Don't nest unnecessarily:** Keep your structure simple and logical.

## Related Elements

- [**Container:**](container) Use to constrain content width and group associated content.

---

For more information on proper section structure, see [Every Website Builder Should Have a Proper Semantic Section Element](https://geary.co/section-structure/).


