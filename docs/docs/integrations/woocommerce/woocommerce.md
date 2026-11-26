---
title: WooCommerce
sidebar_position: 1
---

# WooCommerce

:::note In development
The WooCommerce integration is not part of a released Etch version yet. This page describes the current development state and may change before the release.
:::

Etch lets you design every page of a WooCommerce shop yourself: product pages, shop and category pages, the cart, the cart drawer, the checkout and the customer account. You write the layout and the styles. WooCommerce keeps doing the shop's work: its forms, prices, taxes, notices and payment, and the plugins that hook into them keep working.

New to it? Start with [Get started with WooCommerce](./get-started.md). The integration has these parts:

| Part | What it gives you | Read more |
| --- | --- | --- |
| Dynamic data | Product, cart, shop, order and account data under `woo` | [Product data and loops](./product-data.md) |
| Product loops | A `woo-products` loop type with WooCommerce's filters and sorting | [Product data and loops](./product-data.md#product-loops) |
| Cart and product regions | `<woo:cart>` and `<woo:product>`: content that updates after a cart change, without a page reload | [Cart and checkout](./cart-and-checkout.md), [Product pages](./product-pages.md) |
| Checkout | `<woo:checkout>` and its four pieces: WooCommerce's checkout form in your own layout | [Cart and checkout](./cart-and-checkout.md#checkout) |
| Hook block | `<woo:hook>`: WooCommerce's and plugins' own output where you want it | [Hook block](#hook-block) |
| Starters | Ready-made shop pages you install and then own | [Get started](./get-started.md#install-the-starters) |

Which screen is a page and which is a template: [Shop pages and templates](./shop-pages.md).

## How it works

The server renders the whole shop. Prices, totals, taxes and notices always come from WooCommerce, never from a calculation in the browser.

Every action is one of WooCommerce's own forms or links: a quantity form, the remove link of a cart line, a coupon form, an add to cart button. They work without JavaScript, with a page reload.

Inside a cart or product region, these actions happen without a page reload, and every cart region on the page updates. The cart page, the cart drawer and the count in the header therefore always show the same cart. See [Cart regions](./cart-and-checkout.md#cart-regions).

## Elements

The element bar offers these elements while WooCommerce is active. The command bar lists all of them except the hook block under **WooCommerce** (search "woo").

| Element | In the HTML editor | What it does |
| --- | --- | --- |
| **WooCommerce Hook** | `<woo:hook name="…" />` | Runs one WooCommerce hook. See [Hook block](#hook-block). |
| **Store Notices** | – | WooCommerce's notices, such as "added to your cart". See [Store notices](./cart-and-checkout.md#store-notices). |
| **Cart Region** | `<woo:cart>…</woo:cart>` | Content that updates after every cart change, such as a cart drawer or a count. |
| **Product Region** | `<woo:product>…</woo:product>` | Wraps WooCommerce's add to cart form on a product page. |
| **Checkout** | `<woo:checkout>…</woo:checkout>` | WooCommerce's checkout form. Inserted with its four pieces inside. |
| **Checkout Billing Details**, **Checkout Shipping**, **Checkout Order Review**, **Checkout Payment** | `<woo:checkout-billing />`, `<woo:checkout-shipping />`, `<woo:checkout-order-review />`, `<woo:checkout-payment />` | The pieces of the checkout form. |

## Starters

Starters are ready-made component families. Install one under **Settings → WooCommerce → Starters**, then restyle and change it like any of your components.

- **Woo Header:** site name, product search, account link, cart button and cart drawer.
- **Woo Shop:** product list of shop, category, tag and search pages.
- **Woo Product:** single product page with gallery, WooCommerce's add to cart form, reviews and related products.
- **Woo Cart:** cart page with an order bump, cart drawer and cart button.
- **Woo Checkout:** WooCommerce's checkout in two columns: billing and shipping details, then order review and payment.
- **Woo Account:** My account with menu, dashboard, orders and addresses.

See [Get started with WooCommerce](./get-started.md#install-the-starters).

## Hook block

The **WooCommerce Hook** element runs one WooCommerce hook where you place it, for example `woocommerce_single_product_summary`. Use it to keep what other plugins add (legal notes, delivery times, trust badges) next to your own layout. Add it with **Add WooCommerce Hook** in the element bar.

It has three settings:

- **Hook:** which hook to run. Only WooCommerce's template hooks for product, shop, cart, checkout, thank-you and account pages can be placed. Plugins can add their own hooks to that list with the `etch/woo/hooks` filter.
- **Output:** `All output` runs every callback. `Only extensions` leaves out WooCommerce's own callbacks, so the title, price and add to cart button do not appear twice next to your layout.
- **Priority range (optional):** runs only the callbacks between two priorities. See below.

In the HTML editor:

```html
<woo:hook name="woocommerce_single_product_summary" only="extensions" priority-from="11" priority-to="29" />
```

`only` and the priority attributes are optional. The output is not wrapped in an element, so your markup decides the layout.

The block finds its product the way dynamic data does: the nearest loop item or `this` that is a product. On the thank-you page, `woocommerce_thankyou` without a priority range also prints the payment method's instructions, such as bank details, as WooCommerce's own template does.

In the builder, the canvas shows what the hook prints for the preview post. When it prints nothing, a placeholder with the hook name marks its position. Scripts in the output do not run in the canvas.

The hooks of the checkout form fire by themselves inside the [Checkout](./cart-and-checkout.md#checkout) element. Placing one of them again with a hook block prints it twice.

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
| `30`–`30` | WooCommerce's add to cart form alone |
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
| `woocommerce_before_single_product` | notices 10 |
| `woocommerce_before_single_product_summary` | sale badge 10, product images 20 |
| `woocommerce_after_single_product_summary` | tabs 10, upsells 15, related products 20 |
| `woocommerce_before_shop_loop` | notices 10, result count 20, sorting 30 |
| `woocommerce_after_shop_loop` | pagination 10 |
| `woocommerce_cart_collaterals` | cross-sells 10, cart totals 10 |
| `woocommerce_account_content` | notices 5, account page content 10 |
| `woocommerce_thankyou` | order details 10 |

## Settings

**Settings → WooCommerce** in the builder holds the [Starters](./get-started.md#install-the-starters) and one option.

### Remove default WooCommerce styles

Off by default. When on, WooCommerce's own stylesheets stay out of the frontend:

- the classic shop styles (`woocommerce-general`, `woocommerce-layout`, `woocommerce-smallscreen`),
- the styles of WooCommerce's blocks (`wc-blocks-style` and the per-block styles),
- WooCommerce's inline styles.

Turn it on when your templates style the shop themselves, so the browser loads less CSS and WooCommerce's rules no longer compete with yours. Everything WooCommerce still renders then needs your styles: output of a hook block, the add to cart form, the checkout's fields, the account forms, notices, and WooCommerce's own Cart or Checkout block if you use one. The Starters bring styles for the WooCommerce markup they contain. Styles of other plugins stay, even when they style WooCommerce's elements.

Check the cart, checkout, account and a product page after turning it on.
