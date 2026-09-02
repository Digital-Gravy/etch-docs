---
title: Image
---

# Image

The Image element creates a standard HTML image tag with the `src` and `alt` attributes automatically added. You can edit the `src` and `alt` via the HTML editor, the Attributes Panel, or the Add Attribute Bar.

![Etch Image Element](img/etch-image-element-squashed.webp)

Example output:

```html
<img src="path/to/image.jpg" alt="Description of the image" />
```

## Essential Attributes & Selecting an Image

You can click on the thumbnail in the image attributes panel to to open the asset picker and choose an image. This will replace the `src` attribute with the path to the new image.

![Etch Image Element](img/etch-image-attributes-squashed.webp)

### `src`
The `src` attribute is mandatory and contains the URL or path to the image file. This is automatically added with a placeholder path when you add an Image element to the canvas.

### `alt`
The `alt` attribute provides alternative text for screen readers and accessibility. It's crucial for web accessibility and should describe the image content.

```html
<img src="/uploads/hero-banner.jpg" alt="A beautiful sunset over the mountains" />
```

## Additional Attributes

You can add any additional attributes you'd like, such as:

### `loading`
Control when the image loads:

```html
<!-- Lazy load (default for images below the fold) -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded image" />

<!-- Eager load (for above-the-fold images) -->
<img src="hero.jpg" loading="eager" alt="Hero image" />
```

### `decoding`
Control image decoding:

```html
<!-- Async decoding (default) -->
<img src="image.jpg" decoding="async" alt="Async decoded image" />

<!-- Sync decoding (for critical images) -->
<img src="hero.jpg" decoding="sync" alt="Hero image" />
```

## Working with Dynamic Data

Rather than statically referencing a source, you can insert a dynamic data key as the src. For example, if you're looping through items, you can dynamically reference the post's Featured Image:

```html
<img src="{item.featuredImage}">
```

All attributes support dynamic data.

Read more about [Dynamic Data Keys](../../dynamic-data/dynamic-data-keys).

## Wrapping Images with a Figure Element

To wrap an image in a `figure` tag, you can right click the image and choose "wrap with div" from the context menu. Once this action occurs, simply change the `div` to `figure`. You can also add a `figcaption` element inside the figure if you'd like. To do this, just add text inside the figure element and change the tag from `p` to `figcaption`.

We're considering making this process more automatic in the future.