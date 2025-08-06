---
title: Dynamic Data Keys
sidebar_position: 50
---

# Dynamic Data Keys

This page will serve as the master doc page for all dynamic data keys. Feel free to bookmark it.

## Available Keys
- **Templates** use `this.key`.
- **Loops** use `item.key` by default (but you control the key).

| Key                | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `id`               | The unique identifier for the item (post, page, etc).                       |
| `title`            | The title of the item.                                                      |
| `slug`             | The URL-friendly slug for the item.                                         |
| `content`          | The main content/body of the item.                                          |
| `excerpt`          | The summary or excerpt of the item.                                         |
| `permalink.relative` | The relative permalink (URL path) to the item (e.g., `/blog/my-post`).    |
| `permalink.full`   | The full absolute permalink (URL) to the item (e.g., `https://site.com/blog/my-post`). |
| `featuredImage`    | The URL of the featured image for the item.                                 |
| `date`             | The publish date of the item.                                               |
| `status`           | The status of the item (e.g., `publish`, `draft`).                          |
| `type`             | The post type (e.g., `post`, `page`, `product`).                            |
| `thumbnail`        | The URL of the thumbnail image for the item.                                |
| `author`           | The author object for the item.                                             |
| `author.id`        | The unique identifier for the author.                                       |
| `author.name`      | The display name of the author.                                             |
| `template`         | The template object assigned to the item.                                   |
| `template.slug`    | The slug of the template.                                                   |
| `template.id`      | The unique identifier for the template.                                     |
| `template.title`   | The title of the template.                                                  |

## User Keys

| Key                | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `user`             | The user object for the current user.                                       |
| `user.id`          | The unique identifier for the user.                                         |
| `user.login`       | The username/login of the user.                                             |
| `user.email`       | The email address of the user.                                              |
| `user.displayName` | The display name of the user.                                               |
| `user.firstName`   | The first name of the user.                                                 |
| `user.lastName`    | The last name of the user.                                                  |
| `user.nickname`    | The nickname of the user.                                                   |
| `user.fullName`    | The full name of the user (first + last).                                  |
| `user.description` | The biographical description of the user.                                   |
| `user.userUrl`     | The website URL of the user.                                                |
| `user.avatar`      | The URL of the user's avatar image.                                        |
| `user.registered`  | The registration date of the user.                                          |
| `user.roles`       | The roles assigned to the user.                                             |
| `user.roleNames`   | The human-readable role names for the user.                               |
| `user.capabilities`| The capabilities/permissions of the user.                                  |
| `user.loggedIn`    | Whether the user is currently logged in (boolean).                        |

## Site Keys

| Key                | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `site.name`             | The site name/title.                                                        |
| `site.description`      | The site tagline/description.                                               |
| `site.home_url`         | The home URL of the site.                                                   |
| `site.url`              | The site URL.                                                               |
| `site.version`          | The WordPress version.                                                      |
| `site.language`         | The site language code.                                                     |
| `site.isMultisite`      | Whether the site is part of a multisite network (boolean).                |

## URL Keys

| Key                | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `url.full`             | The current full URL of the page.                                           |
| `url.relative`         | The relative path portion of the current URL.                                        |
| `url.parameter`            | The URL parameters/query string of the current page.                       |

`url.parameter` allows you to reference the value of any parameter key in the url string, which can be very helpful for personalizing page content by injecting content or creating conditions.

For example, if you have a URL of `/thank-you/?firstName=John`, you can use `{url.parameter.firstName}` to output `John`.

**Tips:**
- This key is case sensitive. If you have a parameter of `Name` in your URL, you need to use `{url.parameter.Name}`, not `{url.parameter.name}`
- For security, all URL parameters are automatically sanitized using WordPress's `sanitize_text_field()` function to prevent XSS attacks.

## Etch Custom Fields Support

Custom fields created within Etch can be accessed with the `etch` extension.

For example, `item.etch.field_id` in a loop or `this.etch.field_id` in a template.

## Generic Meta Field Support

Custom fields created registered to WordPress can be accessed with the `meta` extension.

For example, `item.meta.field_id` in a loop or `this.meta.field_id` in a template.

## Advanced Custom Fields (ACF) Support

Custom fields created with Advanced Custom Fields can be accessed with the `acf` extension.

For example, `item.acf.field_id` in a loop or `this.acf.field_id` in a template.

## Tips
- Some keys (like `author`, `template`) are objects. Their data can be accessed via their sub-keys (e.g., `author.name`, `template.slug`).
- If your key outputs an array, you need to drill down to subkey (f.e. `item.author.name`) to get to the data you're looking for.
- Not all keys are available for every item type. Availability depends on the context (e.g., posts, pages, custom post types).