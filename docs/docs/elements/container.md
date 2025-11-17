---
title: Container
---

# Container

The **Container** element in Etch is the essential companion to the **Section** element, working together to create proper semantic structure and consistent layout. While the **Section** element establishes the outer semantic wrapper, the **Container** element handles the inner content organization, width constraints, and spacing.

:::info
All examples on this page show the resulting HTML output of the element, but **users are not required to view, write, or edit HTML to use Etch.** This documentation is a teaching aid to help you understand web design. In Etch, you can do everything you need to do visually, without interacting with code.
:::

## What Makes Etch's Container Element Special?

In most website builders, you have to manually create container structure through multiple steps:

1. Add a generic div element
2. Apply container classes manually
3. Set up proper width constraints
4. Configure centering and spacing

This typically requires additional CSS and manual configuration. In Etch, you simply drag the **Container** element inside a **Section** and it automatically handles:

- **Content Width**: Establishes your website's content width
- **Centering**: Automatically centers content on the inline axis
- **Flexbox Layout**: Sets up proper flex direction for content organization
- **Gap Support**: Enables easy spacing between child elements

## Why Container Structure Matters

### Layout Benefits
The Container element automatically handles:

- **Content Width**: The container establishes your website's content width using `max-width: var(--content-width)`
- **Centering**: Content is automatically centered using `align-self: center`
- **Flexbox Layout**: Sets up `display: flex` and `flex-direction: column` for easy content organization
- **Gap Support**: Enables CSS gap properties for consistent spacing between child elements

### Semantic Benefits
While containers don't have semantic meaning like sections, they provide crucial structural benefits:

- **Content Grouping**: Groups associated content for easier styling and manipulation
- **Consistent Spacing**: Establishes uniform spacing patterns across your site
- **Responsive Behavior**: Handles responsive behavior automatically
- **Maintainability**: Makes your layout structure clear and predictable

## How to Use the Container Element in Etch

### Adding a Container
1. Drag the **Container** element from the Elements panel into a **Section**
2. Add your content inside the Container
3. The proper structure and styling is applied automatically

### Recommended Content Structure
```html
<section data-etch-element="section">
  <div data-etch-element="container">
    <h2>About Our Services</h2>
    <p>Discover the wide range of solutions we offer to help your business grow and succeed.</p>
    <div class="services-grid">
      <!-- Additional content -->
    </div>
  </div>
</section>
```

## Container Defaults

Etch applies sensible defaults to all Container elements:

```css
display: flex;
flex-direction: column;
width: 100%;
max-width: var(--content-width);
align-self: center;
```

These defaults:
- Start all contained content at your website's content width
- Enable gaps by default for easy spacing
- Ensure contained content always starts in the center of the page
- Never get in your way – they only help you work more efficiently

:::info
Etch defaults are always added with 0,0,0 specificity, making them extremely easy to override without specificity conflicts. You can remove the applied defaults entirely by removing the `data-etch-element` attribute from the element.
:::

## Best Practices

### 1. Use Containers Within Sections
Containers should always be used within **Section** style elements (`header` and `footer` are typically more precise versions of a `section`) because they have no inherent gutter. If you use them inside of a generic container like a `div`, you'll want to make sure you set a gutter on the parent `div`.

```html
<!-- Good -->
<section data-etch-element="section">
  <div data-etch-element="container">
    <h2>Our Services</h2>
    <p>Professional solutions for your business needs.</p>
  </div>
</section>

<!-- Avoid -->
<div data-etch-element="container">
  <h2>Our Services</h2>
  <p>Professional solutions for your business needs.</p>
</div>
```

### 2. Group Related Content
Use containers to group content that belongs together. In the below example, note that the heading and introduction paragraph are grouped and contained separately from the Features grid. This is good structure.

```html
<!-- Good - Related content grouped -->
<section data-etch-element="section">
  <div data-etch-element="container">
    <h2>Product Features</h2>
    <p>Explore the key features that make our product stand out and help you achieve your goals.</p>
  </div>
  <div data-etch-element="container">
    <div class="features-grid">
      <div class="feature">
        <h3>Easy to Use</h3>
        <p>Intuitive interface designed for everyone.</p>
      </div>
      <div class="feature">
        <h3>Powerful</h3>
        <p>Advanced capabilities for power users.</p>
      </div>
    </div>
  </div>
</section>
```

### 3. Only put content _outside_ of a container in circumstances where you explicitly need it unrestricted and ungrouped.

Only place content outside of a container when you intentionally want it to span the full width of the section or break out of the standard content width. This is useful for elements like background images, full-width banners, or dividers that should not be constrained by the container's max width.

### 4. Manipulate the `--content-width` variable when you need to change the width of a container.

```css
/* Good */
.my-container {
  --content-width: 460px;
}
/* Not as good */
.my-container {
  max-width: 460px;
}
```

## Styling Considerations

Containers work seamlessly with your CSS framework or custom styles. If you're using [Automatic.css](https://automaticcss.com), containers will automatically work with the framework's spacing and layout system.

For custom styling, you can target containers specifically:

```css
/* Target all containers */
:where([data-etch-element="container"]) {
  /* Default Styles */
}
```

## When Not to Use Containers

- **Don't use outside of sections**: Containers should always be within **Section** elements
- **Don't nest unnecessarily**: Keep your container structure simple and logical

## Related Elements

- **[Section:](section)** Use to establish semantic page structure and contain your containers

---

The Container element is essential for creating well-organized, maintainable layouts. Working together with the Section element, they provide the foundation for professional website structure that's both semantic and flexible. 