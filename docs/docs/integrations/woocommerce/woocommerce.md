---
title: WooCommerce
sidebar_position: 1
---

# WooCommerce

:::note In development
The WooCommerce integration is not part of a released Etch version yet. This page describes the current development state and may change before the release.
:::

Etch lets you design every page of a WooCommerce shop yourself: product pages, shop and category pages, the cart, the cart drawer, the checkout and the customer account. You write the markup and the styles. Etch supplies the shop data and the behaviour.

The integration is active as soon as WooCommerce is active. It has four parts:

| Part | What it gives you | Read more |
| --- | --- | --- |
| Dynamic data | Product, cart, order and account data under `woo` | [Product data and loops](./product-data.md) |
| Product loops | A `woo-products` loop type with WooCommerce's filters and sorting | [Product data and loops](./product-data.md#product-loops) |
| Roles | Turn your own elements into live shop controls: cart, checkout, product forms | [Cart and checkout](./cart-and-checkout.md), [Product pages](./product-pages.md) |
| Hook block | Place WooCommerce's and plugins' own output where you want it | [Hook block](#hook-block) |

## How roles work

An element becomes a shop control by carrying a role in `data-etch-woo-role`:

```html
<span data-etch-woo-role="cart-total">{woo.cart.total}</span>
```

- The server renders the element with its current value and adds what the control needs, such as `type` or `aria-live`. You can style, move or wrap it freely.
- One script per page keeps every bound element in sync. The cart count in the header, the cart drawer and the cart page always show the same cart, without a page reload.
- Roles that point at one thing among many (a cart line, a product, a coupon) also need `data-etch-woo-id`.
- The elements panel offers one element per role, already bound, so you rarely type the attributes yourself.

There is no switch per feature. A template that uses the roles gets Etch's behaviour. A template that places WooCommerce's own output with the hook block keeps WooCommerce's behaviour, together with the plugins that hook into it.

## Starters

Starters are ready-made component families built from the roles. Install one, then restyle it like any of your components.

- **Woo Cart:** cart page, cart drawer and cart button.
- **Woo Checkout:** checkout with contact, addresses, shipping, payment and summary.

## Hook block

The **WooCommerce Hook** element runs one WooCommerce hook where you place it, for example `woocommerce_single_product_summary`. Use it to keep what other plugins add (legal notes, delivery times, trust badges) next to your own layout.

- **Output:** `all` runs every callback. `extensions` leaves out WooCommerce's own callbacks, so the title, price and add to cart button do not appear twice next to your layout.
- **Priority range:** run only the callbacks between two priorities, for example `11–29` for what plugins add between WooCommerce's price and its add to cart button.

In the HTML editor:

```text
{@woo-hook woocommerce_single_product_summary only=extensions}
```

Only WooCommerce's template hooks for product, shop, cart, checkout, thank-you and account pages can be placed. Plugins can add their own hooks to that list with the `etch/woo/hooks` filter.

## Settings

**Remove default WooCommerce styles** (Settings, shown while WooCommerce is active) leaves WooCommerce's own stylesheets out of the frontend. Use it when your templates style everything themselves. Styles of other plugins stay.
