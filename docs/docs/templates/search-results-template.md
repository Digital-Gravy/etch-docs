---
title: Search Results Template
sidebar_position: 70
---

# Search Results Template

A Search Results Template displays the results of an internal site search.

To build a functional search results template, you'll need:

1. The template itself (via Etch).
2. A loop that is configured to display the results.
3. A loop argument to inject the search term dynamically into the loop.
4. A search form (custom or pre-made).

Follow the steps below to build a search results template in Etch.

## Step #1: Create the Template

![Search Results Template in Etch](img/etch-search-results-template.webp)

From the Etch Template Manager, click the plus sign next to "Miscellaneous" and then choose "Search Results."

This will generate a WordPress search results template.

Once the template appears in the Misc column, hover over its thumbnail area and click "edit."

## Step #2: Configure the Loop

You can add whatever content you want to the search results template, but the heart of the template is the loop that will dynamically display a visitor's search results.

This loop should be configured in the loop manager.

Create a new loop called "Search Results" and paste the following:

```php
<?php

$query_args = [
  'post_type' => 'post',
  'posts_per_page' => $count,
  'post_status' => 'publish',
  'orderby' => 'date',
  'order' => 'DESC',
  's' => $term
];
```

The important line in that loop is `'s' => $term`.

The `'s'` key is the default WP key for returning search results and `$term` is a custom Etch loop argument for dynamically inserting a value.

Additionally, the loop contains a `$count` argument for dynamically changing the count on each instance of the loop.

## Step #3: Build the Loop

Once you've created and saved your loop, you can use it in your search results template. It should look like this:

```html
{#loop searchResults($count: -1, $term: url.parameter.s) as item}
```
Here's an explanation of how it works:

- `{#loop searchResults}` calls the search results loop.
- `$count: -1` instructs the loop to return all results. You can change this to any number you'd like.
- `$term: url.parameter.s` injects the search term (which WordPress places in the URL) into the loop.

You can now place anything you'd like inside the loop. The minimum required structure would be a heading with a link inside it. The heading would display `{item.title}` and the link would point to `{item.permalink.relative}`. This would display the titles of the posts and link the users to each post.

## Step #4: Add a Search Form

You can add a search form in WordPress any number of ways. Our recommended approach at this time is to use [WS Form](https://gearyco.link/wsform). There's a 1-click search results form template in both the free and pro version.