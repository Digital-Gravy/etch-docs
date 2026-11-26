---
title: Product pages
sidebar_position: 6
---

# Product pages

You design the product page around WooCommerce's own add to cart form. That form adds every product type: simple, variable, grouped and external products, and products of plugins with their own fields, such as bookings or add-ons. A product region around it updates the cart regions after adding, and lets WooCommerce's variation script update the page when a shopper picks a variation.

## Product region

Add the region with **Product Region** in the element bar, and place WooCommerce's form inside it with a hook block on `woocommerce_single_product_summary`, priority `30` to `30`:

```html
<woo:product class="product-page">
  <div class="gallery images">
    <div class="woocommerce-product-gallery__image">
      <img class="wp-post-image" src="{this.image.url}" alt="{this.image.alt}" />
    </div>
  </div>
  <div class="summary">
    <h1>{this.title}</h1>
    <p class="price">{this.woo.price}</p>
    <woo:hook name="woocommerce_single_product_summary" priority-from="30" priority-to="30" />
    <p class="product_meta">SKU: <span class="sku">{this.woo.sku}</span></p>
  </div>
</woo:product>
```

The region renders like any Etch element and adds the class `product`, by which WooCommerce's script finds the product. When a shopper picks a variation, WooCommerce's script then:

- shows the variation's price and availability inside the form, and enables the button once the choice can be bought,
- swaps the product image for the variation's image. It looks for `images` around the gallery, `woocommerce-product-gallery__image` around the main image and `wp-post-image` on it,
- swaps the SKU inside `product_meta` → `sku`.

This happens in the browser, without a request. Adding to cart is sent in the background: the cart regions on the page update and WooCommerce's "added to your cart" notice appears in a cart region that prints the notices. The product region itself keeps the shopper's choice.

The inside of the form is WooCommerce's markup, so you style it with CSS. A link can preselect a variation with WooCommerce's parameters, for example `/product/hoodie/?attribute_pa_color=blue`.

### Your own form for simple products

A simple product can also use a form of your own inside the region. It posts WooCommerce's `add-to-cart`:

```html
<woo:product>
  {#if this.woo.quick_add}
  <form method="post">
    <input type="number" name="quantity" value="1" min="1" aria-label="Quantity" />
    <button type="submit" name="add-to-cart" value="{this.id}">Add to cart</button>
  </form>
  {/if}
</woo:product>
```

`this.woo.quick_add` is true for simple products that can be bought and are in stock. For every other product, use WooCommerce's form.

## Extensions

Plugins such as Germanized print their notes (incl. VAT, shipping costs, unit price, delivery time) on `woocommerce_single_product_summary`, between WooCommerce's own outputs. Place hook blocks set to **Only extensions** around your own price and form to keep them. See [Hook block](./woocommerce.md#hook-block).

## The Woo Product starter

**Woo Product** (Settings → WooCommerce → Starters) builds the single product page and puts it into the **Single product** template. Your saved template is kept and comes back when you remove the starter. It brings four components:

| Component | What it shows |
| --- | --- |
| **Woo Product** | The page: WooCommerce's notices, then the gallery and the summary (title, rating, buy box, SKU) inside a product region, then description, reviews and related products (`this.woo.related_products`) |
| **Woo Product Gallery** | The product image and the gallery images, with the classes WooCommerce's script needs to show a variation's image |
| **Woo Product Form** | The buy box: price, the short description and WooCommerce's add to cart form |
| **Woo Product Reviews** | Approved reviews and the review form. See [Reviews](./product-data.md#reviews) |

**Extensions keep their output.** Hook blocks for `woocommerce_single_product_summary`, set to **Only extensions**, sit after the price (priorities 1–19), after the short description (21–29) and after the form (31 and up). WooCommerce's own title, price and short description stay out, so nothing shows twice.

**Notices.** The starter prints WooCommerce's notices from `woocommerce_before_single_product` (priority 10) inside a cart region, so "added to your cart" appears there after adding in the background. Extensions on that hook print around it.

The starter's styles cover WooCommerce's form, including the variation dropdowns and the quantity field, and read the custom properties `--woo-product-gap`, `--woo-product-border`, `--woo-product-field-border`, `--woo-product-surface`, `--woo-product-muted`, `--woo-product-accent` and `--woo-product-accent-text`.

## Good to know

- **Without JavaScript,** simple products are added with a page reload. A variable product cannot be added, because WooCommerce's form picks the variation with its script.
- **Related products** come with prices and images in `this.woo.related_products`, up to four. For other lists, such as upsells, use a [product loop](./product-data.md#product-loops) with `relation`.
