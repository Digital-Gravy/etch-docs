---
title: Dynamic Data Keys
sidebar_position: 50
last_update:
  date: 2025-10-24
---

# Dynamic Data Keys

This page will serve as the master doc page for all dynamic data keys. Feel free to bookmark it.

## Available Keys

- **Templates** use `this.key`.
- **Taxonomies** use `taxonomy.key` and `term.key`.
- **Loops** use `item.key` by default (but you control the key).

| Key                  | Description                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| `id`                 | The unique identifier for the item (post, page, etc).                                  |
| `title`              | The title of the item.                                                                 |
| `slug`               | The URL-friendly slug for the item.                                                    |
| `content`            | The main content/body of the item.                                                     |
| `excerpt`            | The summary or excerpt of the item.                                                    |
| `permalink.relative` | The relative permalink (URL path) to the item (e.g., `/blog/my-post`).                 |
| `permalink.full`     | The full absolute permalink (URL) to the item (e.g., `https://site.com/blog/my-post`). |
| `image`              | All image object data (two examples of use below).                                     |
| `image.url`          | The URL to the image.                                                                  |
| `image.alt`          | The image's alt text.                                                                  |
| `date`               | The publish date of the item.                                                          |
| `modified`           | The last modified date of the item.                                                    |
| `status`             | The status of the item (e.g., `publish`, `draft`).                                     |
| `type`               | The post type (e.g., `post`, `page`, `product`).                                       |
| `thumbnail`          | The URL of the thumbnail image for the item.                                           |
| `author`             | The author object for the item.                                                        |
| `author.id`          | The unique identifier for the author.                                                  |
| `author.name`        | The display name of the author.                                                        |
| `template`           | The template object assigned to the item.                                              |
| `template.slug`      | The slug of the template.                                                              |
| `template.id`        | The unique identifier for the template.                                                |
| `template.title`     | The title of the template.                                                             |
| `readingTime`        | The estimated reading time in minutes based on content word count (200 words/min).     |

## User Keys

| Key                 | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `user`              | The user object for the current user.                   |
| `user.id`           | The unique identifier for the user.                     |
| `user.login`        | The username/login of the user.                         |
| `user.email`        | The email address of the user.                          |
| `user.displayName`  | The display name of the user.                           |
| `user.firstName`    | The first name of the user.                             |
| `user.lastName`     | The last name of the user.                              |
| `user.nickname`     | The nickname of the user.                               |
| `user.fullName`     | The full name of the user (first + last).               |
| `user.description`  | The biographical description of the user.               |
| `user.userUrl`      | The website URL of the user.                            |
| `user.avatar`       | The URL of the user's avatar image.                     |
| `user.registered`   | The registration date of the user.                      |
| `user.userRoles`    | Array of all roles assigned to the user.                |
| `user.userRole`     | The primary role of the user (first role in the array). |
| `user.capabilities` | The capabilities/permissions of the user.               |
| `user.loggedIn`     | Whether the user is currently logged in (boolean).      |

## Site Keys

| Key                | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `site.name`        | The site name/title.                                          |
| `site.description` | The site tagline/description.                                 |
| `site.home_url`    | The home URL of the site.                                     |
| `site.url`         | The site URL.                                                 |
| `site.version`     | The WordPress version.                                        |
| `site.language`    | The site language code.                                       |
| `site.isMultisite` | Whether the site is part of a multisite network (boolean).    |
| `site.currentDate` | References the current date. Is returned as a unix timestamp. |

## Options Keys

The `options` key provides access to global site options configured via options pages. These values are available everywhere (pages, templates, loops, headers/footers, etc.).

For up-to-date integrations, namespaces, and scoping patterns, see the [Options Pages](/integrations/custom-fields/options-pages) documentation. It covers:

- Which integrations are currently supported.
- The required namespace for each integration (e.g., `acf`, `metabox`, `jetengine`).
- Integration-specific syntax (for example, Meta Box requiring a option page name: `options.metabox.option_page_name.field_name`).

### Notes

- Requires an Options Page created in the integration plugin.
- Keys resolve globally; no post context is required.

## URL Keys

| Key             | Description                                          |
| --------------- | ---------------------------------------------------- |
| `url.full`      | The current full URL of the page.                    |
| `url.relative`  | The relative path portion of the current URL.        |
| `url.parameter` | The URL parameters/query string of the current page. |

`url.parameter` allows you to reference the value of any parameter key in the url string, which can be very helpful for personalizing page content by injecting content or creating conditions.

For example, if you have a URL of `/thank-you/?firstName=John`, you can use `{url.parameter.firstName}` to output `John`.

For security, all URL parameters are automatically sanitized using WordPress's `sanitize_text_field()` function to prevent XSS attacks.

:::tip
This key is case sensitive. If you have a parameter of `Name` in your URL, you need to use `{url.parameter.Name}`, not `{url.parameter.name}`
:::

## Etch Custom Fields Support

Custom fields created within Etch can be accessed with the `etch` extension.

For example, `item.etch.field_id` in a loop or `this.etch.field_id` in a template.

## Generic Meta Field Support

Custom fields registered to WordPress can be accessed with the `meta` extension.

For example, `item.meta.field_id` in a loop or `this.meta.field_id` in a template.

## Third-Party Custom Fields

Etch integrates with third-party custom field solutions like Advanced Custom Fields (ACF).

For detailed information on working with third-party custom fields, see the [Custom Fields](/integrations/custom-fields) section in Integrations.

## Tips for Working with Dynamic Data

- Not all keys are available for every item type. Availability depends on the context (e.g., posts, pages, custom post types).
  - Use the Loop Manager (or just output `{this}` on the page/template) to view the data available for the the post type you are working with. This will show the full JSON object for the item in question, which can be helpful for understanding what data is available.
- Some keys output the data directly (e.g., `{item.title}`, `{this.content}`, etc). If your key outputs a string, you can use it directly in your page or template.
- Some keys are objects (e.g., `author`, `template`). These are inside of curly braces `{}`. If your key outputs an object, you need to drill down to a sub-key (e.g., `{item.author.name}`, `{this.template.slug`) to get to the data you're looking for.
- Some keys are arrays (e.g., `categories`, `tags`). These are inside of square brackets `[]`. If your key outputs an array, you can `{#loop}` through it or access a specific item by index (e.g., `{this.categories.at(0).name}`). See the [Accessing Data in Arrays](#accessing-data-in-arrays) section below for more information.
- If you want to output curly braces (`{` and `}`) **without the dynamic data engine interpreting them**, you can do so by adding them as a separate string inside the dynamic expression. For example: `{"{This will be output as is}"}`

## Accessing Data in Arrays

Some dynamic data keys return arrays (for example, `categories`, `tags`, etc). You can work with these arrays in two common ways:

**1) Loop through the items**

- Create a loop that returns the array items you want to render, then output each item’s fields.

_Example: Loop categories for the current post:_

```html
{#loop categories as category}
<span>{category.name}</span>
{/loop}
```

**2) Access a specific item by index (zero-based)**

- Us the `.at()` modifier to access a specific item.

_Example: Get the first category’s name for the current post:_

```html
{this.categories.at(0).name}
```

**Notes:**

- Indexing is zero-based (`0` is the first item, `1` is the second, etc.).
- It is possible to get the last item with `-1`, or the second to last item with `-2` and so on.
- Ensure the array and the requested index exist before using them (e.g., a post may have no categories).
