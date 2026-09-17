---
title: Nested Loops
sidebar_position: 2
---

# Nested Loops

Nested loops in Etch allow you to repeat content within another loop, enabling you to display hierarchical or related data, such as categories with their posts, or authors with their books.

## Example: WP Query (Categories and Posts)

Suppose you want to display a list of categories, and under each category, a list of posts in that category:

**Parent Loop (Categories):**

```php
// Query for all categories
$category_args = [
  'taxonomy' => 'category',
  'hide_empty' => false
];
```

**Nested Loop (Posts in Category):**

```php
// Query for posts in the current category
$post_args = [
  'post_type' => 'post',
  'posts_per_page' => 5,
  'orderby' => 'date',
  'order' => 'DESC',
  'post_status' => 'publish',
  'cat' => $cat // Use the current category\'s term_id
];
```

- Add a Loop element for categories, then inside it, add another Loop element for posts, using the current category's ID.
- The outer loop syntax would be: `{#loop categories as category}`
- The inner loop syntax would be: `{#loop posts($cat: category.id) as post}`

:::tip
The key relationship here is passing the `category.id` (term_id) from the parent loop into the nested loop's `$cat` parameter. This creates the parent-child relationship, ensuring that each nested loop only displays posts belonging to the current category in the outer loop. Without this connection, the nested loop would show all posts regardless of category.
:::

---

## Example: Custom Post Types and Custom Taxonomies

Nested loops are particularly useful when working with Custom Post Types (CPTs) and their associated Custom Taxonomies. This example demonstrates how to display **Project Statuses** (`project-status`) and the **Projects** (`project`) within each status:

**Parent Loop (Project Status Taxonomy):**

```php
// Query for all project statuses
$query_args = [
  'taxonomy' => 'project-status',
  'orderby' => 'name',
  'order' => 'ASC'
];
```

**Nested Loop (Projects in each Status):**

```php
// Query for projects with the current status
$query_args = [
  'post_type' => 'project',
  'posts_per_page' => 10,
  'post_status' => 'publish',
  'orderby' => 'date',
  'order' => 'DESC',
  'tax_query' => [
    [
      'taxonomy' => 'project-status',
      'field' => 'term_id',
      'terms' => $status // Use the current status' term_id
    ]
  ]
];
```

- Add a Loop element for project statuses, then inside it, add another Loop element for projects.
- The outer loop syntax would be: `{#loop projectStatus as status}`
- The inner loop syntax would be: `{#loop projects($status: status.id) as project}`
- This pattern works for any post type and its associated custom taxonomies.

:::tip
Just like in the Categories example, we're passing the `status.id` (which is the `term_id`) from the parent loop into the nested loop's `$status` parameter. This creates the relationship between the taxonomy term and its associated posts, ensuring each nested loop only shows projects with the current status. The main difference here from the previous example is that with custom taxonomies, we use the `tax_query` parameter instead of the `cat` parameter which is specific to the default Category taxonomy.
:::

---

## Example: Custom JSON (Authors and Books)

Suppose you have a list of authors, each with a list of books:

```json
[
    {
        "name": "Jane Austen",
        "books": [
            { "title": "Pride and Prejudice" },
            { "title": "Sense and Sensibility" }
        ]
    },
    {
        "name": "Mark Twain",
        "books": [
            { "title": "Adventures of Huckleberry Finn" },
            { "title": "The Adventures of Tom Sawyer" }
        ]
    }
]
```

- Add a Loop element and set the data source type to JSON (use the above data).
- Inside the author loop, add another Loop element and set its data source to `{item.books}`.
- Add a child element (e.g., Heading) inside the nested loop and use `{item.title}` to display each book's title.

:::note
When a nested loop uses the same name as its parent loop (here both are `item`), the inner loop hides the outer one completely: inside the book loop, `{item.name}` reads the book, not the author, and stays empty because books have no `name`. Before Etch 1.6.8, a field missing on the inner item fell back to the outer item.

To use data from both loops, give them different names, e.g. `{#loop authors as author}` and `{#loop author.books as book}`.
:::

---

## See Also

- [Loops](/loops/basic-loops)
