---
title: Loop Arguments
description: How to use arguments in Etch loops
sidebar_position: 3
---

# Loop Arguments

Creating and saving a loop in Etch makes the loop configuration easily re-usable, but what happens when you need to change part of the configuration? Do you have to save a *new* instance of the loop?

Nope! That would be tragic. And in Etch, we steer clear of tragic situations.

## Example Scenario

Let's keep it super basic.

You want to create a loop that loops through your blog posts. It looks something like this: 

```php
$query_args = [
  'post_type' => 'post',
  'posts_per_page' => 10,
  'orderby' => 'date',
  'order' => 'ASC',
  'post_status' => 'publish',
  'ignore_sticky_posts' => 1
];
```

This loops through the most recent ten published posts, putting them in date order.

Nice! You save the loop in Etch and name it, "Blog Posts."

Now, you go to your Home page and try to create a "Latest Posts" section.

In this section, you want to show three posts, not ten. That's a problem, since your "Blog Posts" loop is configured to show ten.

What should you do?

**OPTION A**: Create a **new** loop configuration and name it "Blog Posts 3" or "Featured Blog Posts?"

**OPTION B**: Be an Etch ninja and use custom args (arguments)?

:::tip
_Always_ choose to be an Etch ninja.
:::

## Creating Custom Args

Custom arguments allow you to pass an argument value through as a placeholder token, just like you do with CSS custom properties.

If you've done anything like this:

```css
:root {
  --primary: red;
}
.foo {
  color: var(--primary);
}
```
Then you're fully trained and licensed to use loop arguments!

Check this out:

```php
$query_args = [
  'post_type' => 'post',
  'posts_per_page' => $count,
  'orderby' => 'date',
  'order' => 'ASC',
  'post_status' => 'publish',
  'ignore_sticky_posts' => 1
];
```

Look carefully at the `posts_per_page` line.

See that `$count` token? That's a custom arg. And all you have to do to create an arg like that is literally write it in.

## Using Custom Args

Now imagine that you're back on the Home page, trying to create that "Latest Posts" section. Can you picture yourself there?

Great, add a Loop element and choose the "Blog Posts" loop you made.

In the HTML editor you'll see something like this:

```html
{#loop blog-posts as item}
```

All you're going to do is change it to this:

```html
{#loop blog-posts($count: 3) as item}
```

Now, whenever you use the loop, you have full control over the number of items that is displayed.

You can extend this same technique to ANY argument in a loop. You can even use dynamic data as the value for the custom argument.

:::tip
You can pass more than one argument at a time. You just have to separate them with commas. For example, you might combine a count with another argument like a current post ID:

```html
{#loop relatedPosts($count: 3, $post_id: this.id) as post}
  <!-- loop item markup -->
{/loop}
```
:::

## Custom Args + Dynamic Data

Custom args don't only accept static values - they can accept dynamic data as well. For example, you can pass values like `this.id` (current post ID) directly into an argument.

You might be thinking ahead and wondering if custom args can accept dynamic data and if loops can function inside components while still being controllable "from the outside."

The answer is, "Yes."

Here's an example of a "Blog Posts" component where a blog post loop is inside of a component:
```html
<component>
{#loop recent_posts($count: props.numberOfPosts) as item}
  <div data-etch-element="flex-div">
    <h2>Insert your heading here...</h2>
    <p>Insert your text here...</p>
  </div>
{/loop}
</component>
```

A component prop was created called "numberOfPosts" that accepts a numeric value. You can easily pass that prop into the loop argument:

`{#loop recent_posts($count: props.numberOfPosts) as item}`

This gives you the ability to control the number of loop items from the parent component.

Any dynamic data that makes sense to pass as the value of an argument can be passed into the loop this way.

Pretty awesome, right?

### Related Posts Example

A common pattern is a "Related Posts" section on single post templates. You can exclude the current post from the results by using a custom argument for the current post ID and passing it into your saved loop.

1) Define your loop (e.g., name it `relatedPosts`) with a `$post_id` argument and exclude it via `post__not_in`:

```php
$query_args = [
  'post_type' => 'post',
  'posts_per_page' => 3,
  'post_status' => 'publish',
  'orderby' => 'date',
  'order' => 'DESC',
  'post__not_in' => [$post_id]
];
```
**Note:** `post__not_in` must be an array, so that's why it is wrapped in brackets.

2) Use the loop in your single post template, passing the current post’s ID into `$post_id`. In Etch, `this.id` refers to the current post’s ID in a singular context:

```html
<ul class="related-posts-grid">
{#loop relatedPosts($post_id: this.id) as post}
  <li class="related-post-card">
    <h3>{post.title}</h3>
    <!-- other info here -->
  </li>
{/loop}
</ul>
```

### Related Posts with Taxonomy Filter

If you want the related posts to be in the same taxonomy term (e.g., same category), add a taxonomy filter to the saved loop and pass the current post’s term dynamically.

Update your loop definition to accept `$taxonomy` and `$term_id` and add a `tax_query`:

```php
$query_args = [
  'post_type' => 'post',
  'posts_per_page' => 3,
  'post_status' => 'publish',
  'orderby' => 'date',
  'order' => 'DESC',
  'post__not_in' => [$post_id],
  'tax_query' => [
    [
      'taxonomy' => $taxonomy,
      'field' => 'term_id',
      'terms' => [$term_id]
    ]
  ]
];
```

Then, pass the current post’s first category ID (as an example) from the template:

```html
<ul class="related-posts-grid">
{#loop relatedPosts($post_id: this.id, $taxonomy: "category", $term_id: this.categories.at(0).id) as post}
  <li class="related-post-card">
    <h3>{post.title}</h3>
    <!-- other info here -->
  </li>
{/loop}
</ul>
```

**Notes:**
- We have to put quotes around the taxonomy value in the loop arg (e.g., `$taxonomy: "category"`) because in the PHP query, `$taxonomy` is a variable and must remain unquoted. If you quoted it there, it would become the literal string `$taxonomy`. Quoting the value at call time ensures the WP query receives a proper string (e.g., `category`).
- `terms` must be an array. That's why `$term_id` is wrapped in brackets in the `tax_query`.
- If you prefer to filter by term slug, set `'field' => 'slug'` and pass a slug value instead of an ID.
- Adjust which term you pass (e.g., first category vs. a specific taxonomy) to match your content model.

## More to come!

In the future, you'll be able to set fallback values and do other really awesome things with custom arguments. There will also be a fancy dancy UI to make everything so much easier and ensure that you don't have to touch the code if you don't want to.

Happy Etching!