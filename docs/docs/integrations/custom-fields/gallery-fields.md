---
title: Gallery Fields
sidebar_position: 4
---

# Gallery Fields

Gallery fields allow you to store and display multiple images in your templates. These can be used for image galleries, sliders, carousels, and other multi-image components.

## General Usage

In Etch, gallery fields can be accessed using loops to iterate through each image in the gallery.

```html
<!-- General syntax -->
<ul class="gallery">
  {#loop this.field_source.gallery_field as image}
    <li class="gallery-item">
      <img src="{image.url}" />
    </li>
  {/loop}
</ul>
```

## Plugin-Specific Usage

### Advanced Custom Fields (ACF)

ACF gallery fields return an array of image objects with a rich set of properties. Each image in the gallery contains comprehensive metadata that you can use in your templates.

```html
<!-- Basic usage -->
<ul class="gallery">
  {#loop this.acf.gallery_field as image}
    <li class="gallery-item">
      <img src="{image.url}" alt="{image.alt}" />
    </li>
  {/loop}
</ul>

<!-- Using more image properties -->
<ul class="gallery">
  {#loop this.acf.gallery_field as image}
    <li class="gallery-item">
      <figure>
        <img 
          src="{image.url}" 
          alt="{image.alt}"
          width="{image.width}"
          height="{image.height}"
        />
        {#if image.caption}
          <figcaption>{image.caption}</figcaption>
        {/if}
      </figure>
    </li>
  {/loop}
</ul>
```

### Meta Box

Meta Box gallery fields (Image Advanced or other image fields with cloneable option checked) return an array of image objects with a rich set of properties. Each image in the gallery contains comprehensive metadata that you can use in your templates.

```html
<!-- Basic usage -->
<ul class="gallery">
  {#loop this.metabox.gallery_field as image}
    <li class="gallery-item">
      <img src="{image.url}" alt="{image.alt}" />
    </li>
  {/loop}
</ul>

<!-- Using more image properties -->
<ul class="gallery">
  {#loop this.metabox.gallery_field as image}
    <li class="gallery-item">
      <figure>
        <img 
          src="{image.url}" 
          alt="{image.alt}"
          width="{image.width}"
          height="{image.height}"
        />
        {#if image.caption}
          <figcaption>{image.caption}</figcaption>
        {/if}
      </figure>
    </li>
  {/loop}
</ul>
```

### Jet Engine

Jet Engine gallery fields return an array of image objects with a rich set of properties. Each image in the gallery contains comprehensive metadata that you can use in your templates.

```html
<!-- Basic usage -->
<ul class="gallery">
  {#loop this.jetengine.gallery_field as image}
    <li class="gallery-item">
      <img src="{image.url}" alt="{image.alt}" />
    </li>
  {/loop}
</ul>

<!-- Using more image properties -->
<ul class="gallery">
  {#loop this.jetengine.gallery_field as image}
    <li class="gallery-item">
      <figure>
        <img 
          src="{image.url}" 
          alt="{image.alt}"
          width="{image.width}"
          height="{image.height}"
        />
        {#if image.caption}
          <figcaption>{image.caption}</figcaption>
        {/if}
      </figure>
    </li>
  {/loop}
</ul>
```

### Gallery Field Data Structure

Each image in an gallery field is an object with a range of properties that you can access in your templates. The exact properties available depend on the image and the configuration of your ACF field.

- **Basic properties**: `url`, `alt`, `title`, `caption`, `description`
- **Dimensions**: `width`, `height`
- **Metadata**: `date`, `modified`, `filesize`
- **Responsive images**: A `sizes` object containing URLs and dimensions for various WordPress image sizes (thumbnail, medium, large, etc.)

This rich data structure allows you to create sophisticated gallery displays with proper accessibility, responsive images, and detailed metadata.

:::tip
You can use `{this}` or the loop manager to view the JSON output of all the fields you have available to access in your gallery loop.
:::

## Advanced Usage

- **Responsive Images**: Leverage the `sizes` object to serve appropriately sized images for different screen sizes
- **Performance**: 
  - Use the smallest appropriate image size from the `sizes` object for thumbnails
  - Add `loading="lazy"` to images that appear below the fold
  - Include `width` and `height` attributes to prevent layout shifts
- **Fallbacks**: Use conditional logic to handle missing data: `{#if image.caption}{image.caption}{#else}No caption available{/if}`
- **Metadata**:
  - Store the image ID with `data-id="{image.ID}"` for JavaScript interactions
  - Access file metadata like `mime_type` or `filesize` for filtering or display purposes
  - You can get a specific image from a gallery field without need to run a loop using the modifier `.at(0)`: `{this.acf.gallery_name.at(0).url}`
- **Integration**: Combine with JavaScript libraries for features like lightboxes, masonry layouts, or carousels for enhanced gallery experiences

