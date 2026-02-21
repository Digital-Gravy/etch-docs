---
title: Relationship Fields
sidebar_position: 5
last_update:
  date: 2026-02-21
---

# Relationship Fields

Relationship fields allow you to create connections between posts, pages, or custom post types. This is perfect for displaying related content, featured posts, or creating curated lists of content.

## General Usage

In Etch, relationship fields can be accessed using the loop syntax. Each custom fields plugin will have its own namespace and data structure, but the general approach of looping through related content remains consistent.

```html
<!-- General syntax -->
{#loop this.field_source.relationship_field_name as item}
  <!-- Your relationship content here -->
  <!-- Access post data using the appropriate properties -->
{/loop}
```

The exact field path and available properties will depend on your specific plugin. You can use Etch's loop manager to explore the available data structure for your particular setup.

## Plugin-Specific Usage

### Advanced Custom Fields (ACF)

ACF Relationship fields allow you to create connections between posts, pages, or custom post types. This is perfect for displaying related content, featured posts, or creating curated lists of content. Etch makes it easy to loop through relationship field data and display the connected posts.

Under the hood, ACF stores relationship data as custom fields in the WordPress database. Unlike some other plugins that use dedicated relationship tables, ACF uses the standard WordPress meta tables, storing either post IDs or post objects as serialized data. This approach means ACF relationship fields function more like custom fields that reference other content.

#### How ACF Relationship Loops Work

ACF relationship loops use the `this.acf.your_relationship_field` syntax as the data source. The relationship field returns an array of post objects that you can loop through to display the connected content.

**Important:** Make sure your ACF relationship field is set to return "Post Object" rather than "Post ID" in the field settings. If you select "Post Object", you'll get basic post data like this:
```json
"author_books": [
  {
    "id": 38,
    "title": "Pride and Prejudice", 
    "permalink": { "relative": "/book/pride-and-prejudice/" },
    "featuredImage": "...",
    // ... other post data
  }
]
```

If you select "Post ID", you'll only get the IDs:
```json
"author_books": [38]
```

The basic structure is:
```html
{#loop this.acf.relationship_field_name as post}
  <!-- Access post data using {post.title}, {post.permalink}, etc. -->
{/loop}
```

#### Example: Authors and Their Books

Suppose you have two custom post types: "Author" and "Book", with an ACF relationship field called "author_books" on the Author post type that connects to Book posts. Here's how you'd display a list of authors with their books:

```html
<section data-etch-element="section" class="authors-section">
    <div data-etch-element="container">
        <h2 class="authors-section__title">Authors & Their Books</h2>
        <ul class="authors-grid">
            {#loop authors as author}
                <li class="author-card">
                    <div class="author-card__info">
                        <h3 class="author-card__name">{author.title}</h3>
                        <div class="author-card__bio">{author.excerpt}</div>
                    </div>
                    <ul class="author-card__books-list">
                        {#loop author.acf.author_books as book}
                            <li class="author-card__book">
                                <a href="{book.permalink.relative}" class="author-card__book-link">
                                    {book.title}
                                </a>
                            </li>
                        {/loop}
                    </ul>
                </li>
            {/loop}
        </ul>
    </div>
</section>
```

**What's happening here:**
1. The outer loop targets a WP Query called "authors" that gets Author posts (set up in the loop manager)
2. Each author is aliased as `author` for easy reference
3. The inner loop targets `author.acf.author_books` (the relationship field on the Author post)
4. Each connected book is aliased as `book` and we can access basic post data like `title`, `permalink`, `excerpt` (these keys can be seen in the JSON output in the loop manager)
5. The author card displays both author info and their related books

### Meta Box (MB Relationships)

Meta Box relationships are stored in a separate relationships table (rather than post meta). Because of that, you can’t pull relationship data directly off of `this` the same way you would with ACF.

Instead, you query for related posts by using Meta Box’s relationship query arguments, and then loop the query results.

It’s recommended to set up `mbFrom` and `mbTo` as reusable utility loops in Etch’s loop manager so you can use the same relationship queries consistently throughout your project.

#### Querying relationships (from)

When you want to fetch posts related *from* the current post (i.e. where the current post is the “from” side of the relationship), your query args should include a `relationship` array with `from`.

Utility loop: `mbFrom`

```php
$query_args = [
  'post_type' => $related_cpt,
  'posts_per_page' => 10,
  'post_status' => 'publish',
  'relationship' => [
    'id' => $rel_field,
    'from' => $from_id
  ]
];
```

Etch loop example:

```html
{#loop mbFrom($related_cpt: 'my_cpt', $rel_field: 'relationship_field', $from_id: this.id) as related}
  <!-- Render related item -->
{/loop}
```

#### Querying relationships (to)

When you want to fetch posts related *to* the current post (i.e. a reverse/backwards query where the current post is on the “to” side of the relationship), use `to`.

Utility loop: `mbTo`

```php
$query_args = [
  'post_type' => $related_cpt,
  'posts_per_page' => 10,
  'post_status' => 'publish',
  'relationship' => [
    'id' => $rel_field,
    'to' => $to_id
  ]
];
```

Etch loop example:

```html
{#loop mbTo($related_cpt: 'my_cpt', $rel_field: 'relationship_field', $to_id: this.id) as related}
  <!-- Render related item -->
{/loop}
```

#### Using MB relationships inside a loop (nested loops)

If you’re not on a singular template (for example: you’re looping over a list of posts), you’ll typically need to nest your relationship loop so it uses the *current loop item’s* ID, not `this.id`.

```html
{#loop posts as post}
  <h3>{post.title}</h3>
  {#loop mbFrom($related_cpt: 'my_cpt', $rel_field: 'relationship_field', $from_id: post.id) as related}
    <!-- Render related item -->
  {/loop}
{/loop}
```

For more details on Meta Box’s relationship query arguments, see:
https://docs.metabox.io/extensions/mb-relationships/#posts

## Tips

- Always loop the container element that should be repeated for each related post. In the example above, we loop the `<li>` author card for each author, then loop the `<li>` for each book within that author's book list.
- To see what data you have access to in your relationship field, check the loop manager in Etch's interface. Alternatively, you can temporarily output `{this}` in your template to see all available data (though it will be unformatted).
- If you need more detailed meta data from the related posts than what's available in the relationship field, you'll need to set up a nested query on that post ID. This allows you to access custom fields and other detailed information from the related posts.