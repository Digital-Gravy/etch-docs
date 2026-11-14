---
title: Product data and loops
sidebar_position: 2
---

# Product data and loops

## Product fields

Every product carries a `woo` object. On a product page the path is `this.woo`. Inside a product loop it is `item.woo`, or whatever you named the loop item.

```html
<h1>{this.title}</h1>
<p class="price">{this.woo.price}</p>
{#if this.woo.is_on_sale}
  <span class="badge">−{this.woo.sale_percentage} %</span>
{/if}
```

Prices are plain text in the shop's format, with currency and tax as the shop displays them. Each price also exists as a number (`*_amount`) for conditions and calculations.

| Field | Content |
| --- | --- |
| `product_type`, `sku` | WooCommerce's product type (`simple`, `variable`, …) and the SKU |
| `price`, `regular_price`, `sale_price` | Formatted prices; a range for variable and grouped products |
| `price_min`, `price_max` | Lowest and highest price |
| `price_amount`, `regular_price_amount`, `sale_price_amount`, `price_min_amount`, `price_max_amount` | The same as numbers, `null` without a price |
| `price_html`, `price_suffix` | WooCommerce's price markup (for a raw HTML block) and the price suffix |
| `currency`, `currency_symbol` | ISO code and symbol |
| `is_on_sale`, `sale_percentage`, `sale_date_from`, `sale_date_to` | Sale state; the percentage is the biggest discount of any variation |
| `stock_status`, `stock_label`, `stock_quantity` | Stock; the quantity is `null` when stock is not managed |
| `is_in_stock`, `is_purchasable`, `is_featured`, `backorders_allowed` | Booleans |
| `add_to_cart_url`, `add_to_cart_text` | WooCommerce's add to cart link and button text |
| `weight`, `dimensions`, `shipping_class`, `tax_class` | Formatted with units |
| `gallery_images`, `has_gallery` | Gallery images, each with `url`, `alt` and `sizes` |
| `attributes` | List of `{ name, slug, options: [{ name, slug }], visible, variation }` |
| `variations` | For variable products: `{ id, sku, attributes, price, price_amount, is_on_sale, stock_status, is_in_stock, is_purchasable, image }` |
| `upsell_ids`, `cross_sell_ids`, `related_ids` | Product IDs, with `has_upsells`, `has_cross_sells`, `has_related` |
| `children`, `external_url` | Grouped products' children and external products' link |

### Reviews

| Field | Content |
| --- | --- |
| `rating`, `rating_count`, `review_count` | Average rating and counts |
| `rating_label` | The average with one decimal in the shop's number format, such as `4,5` |
| `reviews` | Up to 20 approved reviews, newest first: `{ id, author, rating, text, date, date_iso, verified }` |
| `reviews_open` | The shop takes reviews and the product is open for them |
| `can_review` | The visitor may write a review. When WooCommerce allows reviews by verified owners only, this needs a logged-in customer who bought the product |

A review form is your own markup. It posts to WordPress, which validates, stores and moderates the review as for WooCommerce's own form:

```html
{#if this.woo.can_review}
<form action="/wp-comments-post.php" method="post">
  <fieldset>
    <legend>Your rating</legend>
    <input type="radio" name="rating" id="rating-5" value="5" required />
    <label for="rating-5">5 stars</label>
    <!-- 4 to 1 the same way -->
  </fieldset>
  <label for="review-text">Your review</label>
  <textarea id="review-text" name="comment" required></textarea>
  <input type="hidden" name="comment_post_ID" value="{this.id}" />
  <input type="hidden" name="comment_parent" value="0" />
  <button type="submit">Send review</button>
</form>
{/if}
```

## Shop-wide data

These keys work on every page:

| Key | Content |
| --- | --- |
| `woo.cart` | `items`, `count`, `subtotal`, `total`, `is_empty`, `url`, `cross_sells` |
| `woo.checkout.url` | Link to the checkout |
| `woo.account` | `url`, `endpoint`, `menu`, `is_logged_in`, and for customers `orders` and `addresses` |
| `woo.order` | The current order on the thank-you page and in the account, following WooCommerce's access rules |

Loop over the cart with `woo.cart.items`. Each item is one line: `item.name`, `item.quantity`, `item.price`.

A page that renders a filled cart is marked as not cacheable, as WooCommerce does for its cart and checkout.

## Product loops

The **WooCommerce Products** loop type (`woo-products`) lists products. Every item carries `item.woo`. All arguments are optional; without any, the loop lists the catalog.

| Argument | Meaning |
| --- | --- |
| `mode` | `custom` (default) or `inherit`: on shop, category and search pages, use the page's own products with WooCommerce's sorting, filters and paging |
| `per_page`, `page`, `offset` | Paging; `per_page` defaults to 12, `-1` for all |
| `orderby`, `order` | `menu_order`, `date`, `title`, `price`, `price-desc`, `popularity`, `rating`, `rand`, `id` |
| `category`, `tag`, `brand`, `type`, `stock_status` | Slugs, as a string, a comma list or a list |
| `attribute` | For example `{ "pa_color": ["blue"] }` |
| `on_sale`, `featured` | Booleans |
| `price_min`, `price_max` | Numbers |
| `include`, `exclude` | Product IDs |
| `relation` with `product_id` | `related`, `upsells`, `cross_sells` (without `product_id`: the cart's cross-sells) or `children` |

Arguments take loop parameters, so one loop serves many places. A loop with `include: "$ids"` shows the products you pass in:

```html
{#loop productList($ids: '90,87,86') as part}
  <a href="{part.permalink.relative}">{part.title} – {part.woo.price}</a>
{/loop}
```

Catalog visibility and the shop's "Hide out of stock items" setting apply. A limiting argument (`include`, `relation`, `on_sale`) that matches nothing returns no products, never all of them.
