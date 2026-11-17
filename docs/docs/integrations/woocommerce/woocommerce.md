---
title: WooCommerce
sidebar_position: 1
---

# WooCommerce

:::note In development
The WooCommerce integration is not part of a released Etch version yet. This page describes the current development state and may change before the release.
:::

Etch lets you design every page of a WooCommerce shop yourself: product pages, shop and category pages, the cart, the cart drawer, the checkout and the customer account. You write the markup and the styles. Etch supplies the shop data and the behaviour.

The integration is active as soon as WooCommerce is active. New to it? Start with [Get started with WooCommerce](./get-started.md). It has four parts:

| Part | What it gives you | Read more |
| --- | --- | --- |
| Dynamic data | Product, cart, order and account data under `woo` | [Product data and loops](./product-data.md) |
| Product loops | A `woo-products` loop type with WooCommerce's filters and sorting | [Product data and loops](./product-data.md#product-loops) |
| Roles | Turn your own elements into live shop controls: cart, checkout, product forms | [Cart and checkout](./cart-and-checkout.md), [Product pages](./product-pages.md) |
| Hook block | Place WooCommerce's and plugins' own output where you want it | [Hook block](#hook-block) |

Which screen is a page and which is a template: [Shop pages and templates](./shop-pages.md).

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
- **Woo Account:** My account with menu, dashboard, orders and addresses.

## Hook block

The **WooCommerce Hook** element runs one WooCommerce hook where you place it, for example `woocommerce_single_product_summary`. Use it to keep what other plugins add (legal notes, delivery times, trust badges) next to your own layout. Add it with **Add WooCommerce Hook** in the element bar.

It has three settings:

- **Hook:** which hook to run. Only WooCommerce's template hooks for product, shop, cart, checkout, thank-you and account pages can be placed. Plugins can add their own hooks to that list with the `etch/woo/hooks` filter.
- **Output:** `All output` runs every callback. `Only extensions` leaves out WooCommerce's own callbacks, so the title, price and add to cart button do not appear twice next to your layout.
- **Priority range (optional):** runs only the callbacks between two priorities. See below.

In the HTML editor:

```text
{@woo-hook woocommerce_single_product_summary only=extensions priority=11-29}
```

### Priorities

A hook is a list of callbacks, small functions that each print something. Every callback has a **priority**, a number that sets its order: lower numbers run first. WooCommerce uses round numbers for its own output, so plugins can slot in between.

On the product summary (`woocommerce_single_product_summary`) a shop with Germanized runs:

| Priority | Output | From |
| --- | --- | --- |
| 5 | Title | WooCommerce |
| 10 | Rating, price | WooCommerce |
| 10 | Deposit packaging type | Germanized |
| 11 | Unit price | Germanized |
| 12 | Tax and shipping note | Germanized |
| 13 | Deposit | Germanized |
| 15 | Nutri-Score | Germanized |
| 20 | Short description | WooCommerce |
| 21 | Defect description | Germanized |
| 27 | Delivery time | Germanized |
| 30 | Add to cart form | WooCommerce |
| 40 | SKU, categories, tags | WooCommerce |
| 50 | Sharing | WooCommerce |

The priority range picks a slice of that list. Both ends count, and either end may stay empty:

| Range | Runs |
| --- | --- |
| empty, empty | everything |
| `11`–`29` | everything from 11 to 29, including WooCommerce's short description at 20 |
| `11`–`29` with **Only extensions** | only what plugins add between price and add to cart button: unit price, tax note, delivery time |
| `31`–empty | everything after the add to cart form |
| empty–`9` | everything before the rating and price |

Output and range work together: the range picks the priorities, **Only extensions** then drops WooCommerce's own callbacks from them.

**Recipe: legal notes under your own price.** Your template prints the price itself. Place a hook block right below it with hook `woocommerce_single_product_summary`, **Only extensions** and range `11`–`29`. Germanized's unit price, tax note and delivery time appear there, nothing of WooCommerce's appears twice, and a plugin you add later shows up in the same place.

Callbacks that share a priority (rating and price at 10) can only be taken together. Note that Germanized's deposit packaging type also sits at 10, so a range starting at 11 leaves it out; start at 10 with **Only extensions** to keep it.

### Finding a plugin's priority

Plugins rarely document their priorities. To see them on your site, install [Query Monitor](https://wordpress.org/plugins/query-monitor/), open a product page and look at **Hooks & Actions**: it lists every callback of each hook with its priority. WooCommerce's own priorities are in its file `includes/wc-template-hooks.php`.

Common WooCommerce priorities:

| Hook | WooCommerce's callbacks |
| --- | --- |
| `woocommerce_before_main_content` | content wrapper 10, breadcrumb 20 |
| `woocommerce_before_single_product_summary` | sale badge 10, product images 20 |
| `woocommerce_after_single_product_summary` | tabs 10, upsells 15, related products 20 |
| `woocommerce_before_shop_loop` | notices 10, result count 20, sorting 30 |
| `woocommerce_after_shop_loop` | pagination 10 |
| `woocommerce_cart_collaterals` | cross-sells 10, cart totals 10 |
| `woocommerce_thankyou` | order details 10 |

## Settings

The integration needs no setting: dynamic data, product loops, roles, starters and the hook block work as soon as WooCommerce is active. **Settings → WooCommerce** (shown while WooCommerce is active) holds the options that change how the shop is delivered.

### Remove default WooCommerce styles

Off by default. When on, WooCommerce's own stylesheets stay out of the frontend:

- the classic shop styles (`woocommerce-general`, `woocommerce-layout`, `woocommerce-smallscreen`),
- the styles of WooCommerce's blocks (`wc-blocks-style` and the per-block styles),
- WooCommerce's inline styles.

Turn it on when your templates style the shop themselves, so the browser loads less CSS and WooCommerce's rules no longer compete with yours. Everything WooCommerce still renders then needs your styles: output of a hook block, the account forms, notices, and WooCommerce's own Cart or Checkout block if you use one. Styles of other plugins stay, even when they style WooCommerce's elements.

Check the cart, checkout, account and a product page after turning it on.
