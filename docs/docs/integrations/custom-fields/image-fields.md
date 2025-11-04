---
title: Image Fields
sidebar_position: 3
---

# Image Fields

Image fields allow you to store and display images in your templates. These can be used for featured images, galleries, logos, and other visual elements.

## General Usage

In Etch, image fields can be accessed using the appropriate syntax based on the custom fields plugin you're using.

```html
<!-- General syntax -->
<img src="{this.field_source.image_field}" />
```

## Plugin-Specific Usage

### Advanced Custom Fields (ACF)

ACF image fields return an object with various properties. The most common way to use them is:

```html
<!-- Basic usage for image URL -->
<img src="{this.acf.image_field.url}" alt="{this.acf.image_field.alt}" />

<!-- Using other available properties -->
<figure>
  <img 
    src="{this.acf.image_field.url}" 
    alt="{this.acf.image_field.alt}"
    width="{this.acf.image_field.width}"
    height="{this.acf.image_field.height}"
  />
  <figcaption>{this.acf.image_field.caption}</figcaption>
</figure>
```

#### ACF Image Field Data Structure

Each image field in ACF returns a comprehensive object with many properties.

:::tip
You can use `{this}` or the loop manager to view the same JSON output we show below to view all the fields you have available to access in your template.
:::

Here's an example of what the data structure looks like for an image field.

```json
"acf": {
  "my_image_field": {
    "id": 123,
    "url": "https://example.com/wp-content/uploads/2025/08/image.jpg",
    "alt": "Image alt text",
    "title": "Image title",
    "caption": "Image caption",
    "description": "Image description",
    "filename": "image.jpg",
    "sizes": {
      "thumbnail": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-150x150.jpg",
        "width": 150,
        "height": 150
      },
      "medium": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-300x200.jpg",
        "width": 300,
        "height": 200
      },
      "large": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-1024x683.jpg",
        "width": 1024,
        "height": 683
      },
      "full": {
        "url": "https://example.com/wp-content/uploads/2025/08/image.jpg",
        "width": 1600,
        "height": 1067
      }
    },
    "srcset": "https://example.com/wp-content/uploads/2025/08/image-300x200.jpg 300w, https://example.com/wp-content/uploads/2025/08/image-1024x683.jpg 1024w, https://example.com/wp-content/uploads/2025/08/image.jpg 1600w",
    "width": 1600,
    "height": 1067,
    "filesize": 256000,
    "mime_type": "image/jpeg"
  }
}
```

### Meta Box

Meta Box image fields return an object with various properties. The most common way to use them is:

```html
<!-- Basic usage for image URL -->
<img src="{this.metabox.image_field.url}" alt="{this.metabox.image_field.alt}" />

<!-- Using other available properties -->
<figure>
  <img 
    src="{this.metabox.image_field.url}" 
    alt="{this.metabox.image_field.alt}"
    width="{this.metabox.image_field.width}"
    height="{this.metabox.image_field.height}"
  />
  <figcaption>{this.metabox.image_field.caption}</figcaption>
</figure>
```

#### Meta Box Image Field Data Structure

Each image field in Meta Box returns a comprehensive object with many properties.

:::tip
You can use `{this}` or the loop manager to view the same JSON output we show below to view all the fields you have available to access in your template.
:::

Here's an example of what the data structure looks like for an image field.

```json
"metabox": {
  "my_image_field": {
    "id": 123,
    "url": "https://example.com/wp-content/uploads/2025/08/image.jpg",
    "alt": "Image alt text",
    "title": "Image title",
    "caption": "Image caption",
    "description": "Image description",
    "filename": "image.jpg",
    "sizes": {
      "thumbnail": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-150x150.jpg",
        "width": 150,
        "height": 150
      },
      "medium": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-300x200.jpg",
        "width": 300,
        "height": 200
      },
      "large": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-1024x683.jpg",
        "width": 1024,
        "height": 683
      },
      "full": {
        "url": "https://example.com/wp-content/uploads/2025/08/image.jpg",
        "width": 1600,
        "height": 1067
      }
    },
    "srcset": "https://example.com/wp-content/uploads/2025/08/image-300x200.jpg 300w, https://example.com/wp-content/uploads/2025/08/image-1024x683.jpg 1024w, https://example.com/wp-content/uploads/2025/08/image.jpg 1600w",
    "width": 1600,
    "height": 1067,
    "filesize": 256000,
    "mime_type": "image/jpeg"
  }
}
```

### Jet Engine

Jet Engine image fields return an object with various properties. The most common way to use them is:

```html
<!-- Basic usage for image URL -->
<img src="{this.jetengine.image_field.url}" alt="{this.jetengine.image_field.alt}" />

<!-- Using other available properties -->
<figure>
  <img 
    src="{this.jetengine.image_field.url}" 
    alt="{this.jetengine.image_field.alt}"
    width="{this.jetengine.image_field.width}"
    height="{this.jetengine.image_field.height}"
  />
  <figcaption>{this.jetengine.image_field.caption}</figcaption>
</figure>
```

#### Jet Engine Image Field Data Structure

Each image field in Jet Engine returns a comprehensive object with many properties.

:::tip
You can use `{this}` or the loop manager to view the same JSON output we show below to view all the fields you have available to access in your template.
:::

Here's an example of what the data structure looks like for an image field.

```json
"jetengine": {
  "my_image_field": {
    "id": 123,
    "url": "https://example.com/wp-content/uploads/2025/08/image.jpg",
    "alt": "Image alt text",
    "title": "Image title",
    "caption": "Image caption",
    "description": "Image description",
    "filename": "image.jpg",
    "sizes": {
      "thumbnail": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-150x150.jpg",
        "width": 150,
        "height": 150
      },
      "medium": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-300x200.jpg",
        "width": 300,
        "height": 200
      },
      "large": {
        "url": "https://example.com/wp-content/uploads/2025/08/image-1024x683.jpg",
        "width": 1024,
        "height": 683
      },
      "full": {
        "url": "https://example.com/wp-content/uploads/2025/08/image.jpg",
        "width": 1600,
        "height": 1067
      }
    },
    "srcset": "https://example.com/wp-content/uploads/2025/08/image-300x200.jpg 300w, https://example.com/wp-content/uploads/2025/08/image-1024x683.jpg 1024w, https://example.com/wp-content/uploads/2025/08/image.jpg 1600w",
    "width": 1600,
    "height": 1067,
    "filesize": 256000,
    "mime_type": "image/jpeg"
  }
}
```

## Tips

- Always include alt text for accessibility
- You can use conditional logic to provide fallback images: `{#if this.acf.custom_logo}{this.acf.custom_logo.url}{#else}{this.site.logo}{/if}`
- For background images in CSS, use inline styles: `<div style="background-image: url({this.acf.background_image.url})"></div>`
