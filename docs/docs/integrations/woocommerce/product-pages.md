---
title: Product pages
sidebar_position: 6
---

# Product pages

A product form adds a product to the cart. You design it completely: swatches, prices, quantity buttons and accessories are your markup. Roles connect it to the cart (see [How roles work](./woocommerce.md#how-roles-work)).

## The Woo Product starter

**Woo Product** (Settings → WooCommerce → Starters) builds the single product page and puts it into the **Single product** template. Your saved template is kept and comes back when you remove the starter. It brings four components:

| Component | What it shows |
| --- | --- |
| **Woo Product** | The page: store notices, gallery and summary side by side, then description, reviews and related products (`this.woo.related_products`) |
| **Woo Product Gallery** | The product image and the gallery images |
| **Woo Product Form** | Price, short description, one choice per variation option, quantity buttons and add to cart |
| **Woo Product Reviews** | Approved reviews and the review form |

**Extensions keep their output.** Germanized's price notes (incl. VAT, shipping costs, unit price, delivery time) and similar output of other plugins appear without work: **WooCommerce Hook** blocks for `woocommerce_single_product_summary`, set to **Only extensions**, sit after the price (priorities 1–19), after the short description (21–29) and after the form (31 and up). WooCommerce's own title, price and button stay out, so nothing shows twice.

**Products the form cannot add** (grouped, external, bookings and other products with their own form) keep WooCommerce's form: the condition `this.woo.uses_product_form` switches to a hook block that prints it, styled by the starter.

## Product roles

| Role | Element | What it does |
| --- | --- | --- |
| `product-form` | `form` with `data-etch-woo-id="{this.id}"` | The product's add to cart form |
| `variation-option` | radio, `name="{attribute.slug}"`, `value="{option.slug}"` | Chooses an option; disabled when no variation in stock fits the other choices |
| `option-price` | text inside the option's label | The option's price once it settles the variation |
| `product-price` | text, `{this.woo.price}` | The chosen variation's price; the server's price until one is chosen |
| `product-quantity` | `input` | Quantity; 1 when left out |
| `quantity-step` | `button` with `data-etch-woo-step="1"` or `"-1"` | Changes the quantity, never below 1 |
| `product-addon` | checkbox with `data-etch-woo-id` = product or variation ID | An accessory added together with the product, in the same quantity |
| `product-total` | text | Chosen variation plus checked add-ons, times the quantity; empty until a variation is chosen |
| `add-to-cart` | `button` | Disabled until a variation that can be bought is chosen; adds it and opens the cart drawer |

Prices and stock come live from WooCommerce, so sold-out options are blocked as soon as the page loads. All product forms on a page load their data together.

A link can choose a variation with WooCommerce's parameters, for example `/product/kanne/?attribute_pa_size=30-liter`. The form checks that option when the page loads, if a variation in stock still matches.

## Recipe: swatches

Loop over the product's attributes and their options. Each option is a radio inside a label, and the label is the swatch:

```html
<form data-etch-woo-role="product-form" data-etch-woo-id="{this.id}" class="product-form">
  <p data-etch-woo-role="product-price">{this.woo.price}</p>

  {#loop this.woo.attributes as attribute}
    {#if attribute.variation}
    <fieldset class="swatches">
      <legend>{attribute.name}</legend>
      {#loop attribute.options as option}
      <label class="swatch">
        <input data-etch-woo-role="variation-option" type="radio" name="{attribute.slug}" value="{option.slug}" />
        <span>{option.name}</span>
        <span data-etch-woo-role="option-price"></span>
      </label>
      {/loop}
    </fieldset>
    {/if}
  {/loop}

  <input data-etch-woo-role="product-quantity" type="number" value="1" />
  <button data-etch-woo-role="add-to-cart" type="submit">Add to cart</button>
</form>
```

Style the states with `:has()`:

```css
.swatch { position: relative; padding: 1rem; border: 1px solid var(--neutral-semi-light); cursor: pointer; }
.swatch input { position: absolute; inset: 0; opacity: 0; }
.swatch:has(input:checked) { background: var(--primary); border-color: var(--text-dark); }
.swatch:has(input:disabled) { opacity: 0.4; cursor: not-allowed; }
.swatch:has(input:focus-visible) { outline: 2px solid var(--text-dark); outline-offset: 2px; }
```

A simple product uses the same form without the attribute loop.

## Recipe: accessory, total and quantity buttons

An accessory, such as a drain tap fitted before shipping, is a checkbox in the form. Unlike an order bump, it goes into the cart only together with the product. Its price appears in the `option-price` inside its label.

```html
<label class="addon">
  <input data-etch-woo-role="product-addon" data-etch-woo-id="{this.meta.addon_id}" type="checkbox" />
  Drain tap, fitted before shipping
  + <span data-etch-woo-role="option-price"></span>
</label>

<p>Total <span data-etch-woo-role="product-total"></span></p>

<button data-etch-woo-role="quantity-step" data-etch-woo-step="-1" type="button">−</button>
<input data-etch-woo-role="product-quantity" type="number" value="1" />
<button data-etch-woo-role="quantity-step" data-etch-woo-step="1" type="button">+</button>
```

The total leaves out shipping; say so next to it. Which accessory a product offers is your data, here a custom field.

## Other product types

Grouped and external products, and products from plugins that need their own add to cart form (a booking with a date, a bundle with choices), keep WooCommerce's own form. Place it with the hook block and a condition on `this.woo.product_type`.

Etch tells these products apart the way WooCommerce's own buttons do: a product form adds a product only when it is variable, a variation, or WooCommerce's add to cart link adds it directly. For any other product the `add-to-cart` button stays disabled and the browser console names the product. Simple subscriptions add like simple products.
