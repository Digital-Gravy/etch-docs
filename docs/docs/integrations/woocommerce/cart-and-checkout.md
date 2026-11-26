---
title: Cart and checkout
sidebar_position: 5
---

# Cart and checkout

You build the cart from your own markup, `woo.cart` data and WooCommerce's own cart forms and links. A cart region keeps it up to date without a page reload. The checkout is WooCommerce's checkout form, split into four pieces that you place in your own layout.

The **Woo Cart** and **Woo Checkout** starters contain complete, working versions you can restyle.

## Cart regions

A cart region is an element whose content the server renders again after every cart change. Add it with **Cart Region** in the element bar, or write it in the HTML editor:

```html
<woo:cart tag="aside" class="drawer">
  {#loop woo.cart.items as item}
    <p>{item.quantity} × {item.name}</p>
  {/loop}
  <p>{woo.cart.total}</p>
</woo:cart>
```

A region renders like any Etch element: `tag` sets its element (`div` by default), and the other attributes, dynamic data and children work as usual.

### What updates

WooCommerce's cart forms and links inside a cart or product region (quantity, remove, coupon, add to cart) are sent in the background. Afterwards **every** cart region on the page shows the new cart, WooCommerce's notices included, so the cart page, a drawer and a count in the header always agree. WooCommerce's own ajax add to cart buttons, such as those on shop cards, update the regions too.

A changed quantity sends itself once the shopper stops typing, so an Update button is only needed without JavaScript. Without JavaScript, every form and link still works, with a page reload.

### Rules for regions

- **Live values belong inside a region.** Only the content is swapped. The region element itself stays, with its attributes as first rendered, so a drawer that is the region stays open.
- **Post cart forms to the current page.** Leave out `action`. WooCommerce shows a form's notices on the page it was posted to.
- **Content inside a region is replaced.** Event listeners bound to elements inside it are lost, and scripts inside it do not run again. Use native controls (`popover`, `<dialog>`, `<details>`) or listen on `document`.
- **Page caches.** WooCommerce's answer is a full page. Pages with a cart are usually not cached, but a cache that ignores the cart shows a stale one.

## Build a cart

Everything is your own markup. WooCommerce only needs its field and button names.

```html
<woo:cart class="cart">
  {#if woo.cart.is_empty}
    <p>Your cart is empty.</p>
  {/if}
  {#if !woo.cart.is_empty}
    <form method="post">
      <input type="hidden" name="woocommerce-cart-nonce" value="{woo.cart.nonce}" />
      {#loop woo.cart.items as item}
        <div class="cart-line">
          <a href="{item.permalink}">{item.name}</a>
          <input type="number" name="cart[{item.key}][qty]" value="{item.quantity}" min="0" aria-label="Quantity: {item.name}" />
          <span>{item.line_subtotal}</span>
          <a href="{item.remove_url}" aria-label="Remove: {item.name}">Remove</a>
        </div>
      {/loop}
      <button type="submit" name="update_cart" value="1">Update cart</button>
    </form>

    <form method="post">
      <input name="coupon_code" aria-label="Coupon code" />
      <button type="submit" name="apply_coupon" value="1">Apply</button>
    </form>

    <p>Total: {woo.cart.total}</p>
    <a href="{woo.checkout.url}">Proceed to checkout</a>
  {/if}
</woo:cart>
```

- The quantity form needs the hidden `woocommerce-cart-nonce` field. Without it, WooCommerce ignores the update.
- A quantity of 0 removes the line. `item.quantity_max` is `1` for products sold individually.
- Each coupon in `woo.cart.coupons` has `code`, `discount` and a `remove_url`.
- The totals are in `woo.cart`: `subtotal`, `discount_total`, `shipping_total`, `tax_total` and `total`. See [Product data and loops](./product-data.md#shop-wide-data).

### Shipping

`woo.cart.shipping_rates` lists the shipping packages, each with its `rates`. A form that posts `etch_update_shipping` with the cart nonce saves the chosen rate and, optionally, an address for the estimate:

```html
<form method="post">
  <input type="hidden" name="woocommerce-cart-nonce" value="{woo.cart.nonce}" />
  {#loop woo.cart.shipping_rates as package}
    <fieldset>
      <legend>{package.name}</legend>
      {#loop package.rates as rate}
        <label>
          {#if rate.selected}<input type="radio" name="shipping_method[{package.package_id}]" value="{rate.id}" checked />{/if}
          {#if !rate.selected}<input type="radio" name="shipping_method[{package.package_id}]" value="{rate.id}" />{/if}
          {rate.name} {rate.price}
        </label>
      {/loop}
    </fieldset>
  {/loop}
  <button type="submit" name="etch_update_shipping" value="1">Update</button>
</form>
```

For the address, add the fields `calc_shipping_country`, `calc_shipping_state`, `calc_shipping_postcode` and `calc_shipping_city`, as WooCommerce's own shipping calculator does. **Woo Cart Shipping** has a complete version: it fills the country list from `woo.shipping.countries` and the states from `woo.shipping.states`, and on the cart page the state field follows the chosen country. Show the address fields only when `woo.shipping.calculator` is true (**Enable the shipping calculator on the cart page** in WooCommerce → Settings → Shipping → Options), and the whole form only when `woo.cart.needs_shipping` is true.

### Cart drawer

A drawer is a native popover with a cart region inside, opened by a button:

```html
<woo:cart tag="button" type="button" popovertarget="cart-drawer">Cart {woo.cart.count}</woo:cart>

<aside popover id="cart-drawer" aria-label="Your cart">
  <button type="button" popovertarget="cart-drawer" popovertargetaction="hide">Close</button>
  <woo:cart>
    <!-- lines, total and checkout link -->
  </woo:cart>
</aside>
```

The button is a cart region itself, so its count updates. The drawer is not one, so it stays open while its content updates.

The drawer does not open by itself after adding to cart. To open it then, listen for the event:

```js
document.addEventListener('etch:woo-cart-updated', () => {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer.matches(':popover-open')) drawer.showPopover();
});
```

The event fires after every cart change on the page, including changes on the cart page itself.

## The Woo Cart starter

**Woo Cart** puts a complete cart on the cart page. Its components:

| Component | What it shows |
| --- | --- |
| **Woo Cart** | The cart page as one cart region: the empty state, or the lines, the order bump and the totals |
| **Woo Cart Lines** | The lines in WooCommerce's quantity form: image, name, variation, plugin details, price, quantity, line total and remove link. Used by the cart page and the drawer |
| **Woo Cart Totals** | Subtotal, coupons with their remove links, discount, shipping, tax and total, the shipping form, the coupon form and the checkout link |
| **Woo Cart Shipping** | The shipping rates and the address estimate |
| **Woo Order Bump** | Extra products to add with one click. See [Order bump](#order-bump) |
| **Woo Cart Drawer** | A popover with the lines, the total, the checkout link and a link to the cart |
| **Woo Cart Button** | A header button with the item count that opens the drawer |

Quantities update as soon as the shopper stops changing them, so the **Update cart** button shows only when JavaScript is off.

## Order bump

**Woo Order Bump** offers extra products below the cart lines, each with an **Add** button.

| Property | Default | What it does |
| --- | --- | --- |
| **Product** | empty | The ID of the product to offer. Empty: the cross-sells of the products in the cart (**Product data → Linked Products → Cross-sells**) |
| **Label** | `Add to your order` | The line above each product's title |
| **Add label** | `Add` | The button text |
| **Cross-sells shown** | `2` | How many cross-sells, when no Product is set |

Only simple products in stock show (`quick_add`); the others need a choice first. WooCommerce leaves out cross-sells the cart already holds, so an added product leaves the offer. The bump uses two loops that the starter adds: `wooOrderBumpProduct` and `wooOrderBumpCrossSells`.

The checkout has no order bump: its form cannot hold the bump's forms.

### Your own order bump

Take the products from WooCommerce's cross-sells, so the shop owner picks them per product and the markup holds no IDs, names or prices.

**1. Create the loop.** Add a loop of the type **WooCommerce Products** with the key `orderBumps` and these arguments:

```json
{ "relation": "cross_sells", "per_page": 2 }
```

Without `product_id`, `cross_sells` lists the cross-sells of the products in the cart, without those the cart already holds. Add `"include_in_cart": true` to keep offering them.

**2. Put it inside a cart region.** Each offer is a small form that posts WooCommerce's `add-to-cart`:

```html
{#loop orderBumps as bump}
  {#if bump.woo.quick_add}
  <form method="post" class="bump">
    <img src="{bump.image.url}" alt="" width="48" height="48" />
    <span>{bump.title} + {bump.woo.price}</span>
    <button type="submit" name="add-to-cart" value="{bump.id}" aria-label="Add: {bump.title}">Add</button>
  </form>
  {/if}
{/loop}
```

- The cart lines, totals and drawer update without a reload.
- `bump.woo.quick_add` keeps out products that need a choice first (variable products) or their own form (bookings).
- When the cart has no products with cross-sells, the loop shows nothing.

## Checkout

The **Checkout** element is WooCommerce's checkout form. Inside it, you place its four pieces wherever your layout wants them:

```html
<woo:checkout class="checkout">
  <div class="checkout__details">
    <woo:checkout-billing />
    <woo:checkout-shipping />
  </div>
  <aside class="checkout__summary">
    <woo:checkout-order-review />
    <woo:checkout-payment />
  </aside>
</woo:checkout>
```

Adding **Checkout** from the element bar inserts it with the four pieces already inside.

| Piece | Element | What it shows |
| --- | --- | --- |
| `<woo:checkout-billing />` | **Checkout Billing Details** | The billing fields, and what plugins print before the customer details, such as express payment buttons |
| `<woo:checkout-shipping />` | **Checkout Shipping** | **Ship to a different address** with the shipping fields, the order notes, and what plugins print after the customer details |
| `<woo:checkout-order-review />` | **Checkout Order Review** | The order table: products, subtotal, shipping choice, coupons and total |
| `<woo:checkout-payment />` | **Checkout Payment** | The payment methods, the terms and the **Place order** button |

Each piece also prints the hooks WooCommerce's checkout fires next to it, so plugins that hook into the checkout show up without a hook block. You only choose the layout.

WooCommerce's own checkout script does the rest: it checks the fields, updates the order review and payment when the address changes, applies coupons and places the order. Etch adds no checkout script. Without JavaScript, the shopper presses WooCommerce's **Update totals** after changing the address, then places the order.

### Rules for the checkout

- **The checkout is always a `form`.** It has no Tag setting, because WooCommerce's script looks for WooCommerce's form. Your classes and attributes are added to it.
- **Pieces take no attributes.** Wrap them in your own elements to lay them out and style them. The inside of each piece is WooCommerce's markup; style it with CSS.
- **Pieces render only inside the Checkout element,** also through components and loops inside it. Outside it, they render nothing.
- **Place all four pieces.** Without the payment piece there is no Place order button.
- **Above the form,** WooCommerce prints its notices and, where they apply, its login and coupon forms. They sit outside the form, because forms cannot be nested.
- **WooCommerce decides what shows.** On a "Pay for this order" link the element shows WooCommerce's pay form. With an empty cart it shows nothing, and WooCommerce sends shoppers from the checkout page to the cart. When the store requires an account a guest cannot create, WooCommerce's message replaces the form.
- **Do not put the checkout inside a cart region.** A cart change elsewhere on the page would replace the form and lose what the shopper typed.
- **Cart regions on the checkout page** do not follow a coupon applied in the checkout until the next cart change. The checkout's own order review is always right.
- In the builder, each piece shows as a placeholder, because the builder has no cart to render it with.

### Where the checkout goes

Put the Checkout element on WooCommerce's checkout page, in place of WooCommerce's Checkout block. The **Woo Checkout** starter does exactly that, and **Remove** puts the Checkout block back. Until then, WooCommerce's block checkout keeps working.

Any page that renders the Checkout element counts as a checkout, so WooCommerce loads its checkout scripts there. WooCommerce and payment plugins also look at the checkout page's content to tell a block checkout from a classic one, which is why the element belongs on that page.

:::caution Payment methods for the block checkout
The Checkout element is WooCommerce's classic checkout. Payment methods and checkout extensions that only support WooCommerce's block checkout do not work in it. Keep WooCommerce's Checkout block if you need them.
:::

**One checkout page.** WooCommerce has one checkout page, and payment plugins rely on it. To offer different checkouts, put them on that page and switch between them with conditions, for example on what the cart contains.

## The Woo Checkout starter

**Woo Checkout** puts the checkout on the checkout page in two columns: billing and shipping details on the left, a summary with the order review and payment on the right.

| Component | What it shows |
| --- | --- |
| **Woo Checkout** | The Checkout element with the details column and the summary |
| **Woo Checkout Summary** | A heading (**Title**, default `Order summary`), the order review and the payment |

The starter's styles cover WooCommerce's fields, the order table and the payment methods, and read the custom properties `--woo-checkout-gap`, `--woo-checkout-border`, `--woo-checkout-radius`, `--woo-checkout-muted`, `--woo-checkout-accent`, `--woo-checkout-accent-text`, `--woo-checkout-summary-bg` and `--woo-checkout-error`.

## Store notices

WooCommerce's notices ("added to your cart", "out of stock", coupon and shipping messages) come from the **Store Notices** element or from WooCommerce's notice hooks. Printing a notice clears it: WooCommerce keeps a notice until a page prints it.

- **Etch's Cart, Checkout and Order Confirmation templates** print the notices above the page content. On the cart template they sit in a cart region, so "Cart updated" and the **Undo** link follow background cart actions. See [Shop pages and templates](./shop-pages.md).
- **The Checkout element** prints WooCommerce's checkout notices above the form.
- **The starters** print them through hook blocks: Woo Product on `woocommerce_before_single_product` inside a cart region, Woo Shop on `woocommerce_before_shop_loop` (priority 10) and Woo Account on `woocommerce_account_content` (priority 5).
- **Your own pages** need them too, for example a product page you build yourself. Add **Store Notices**, or a hook block on WooCommerce's notice hook, where shoppers should see them. Put it inside a cart region when the notices should update after background cart actions.

### Styling the notices

The notices are WooCommerce's markup, so you style them through their classes. The `woo-notices` style that comes with the starters covers them, and it keeps working when WooCommerce's stylesheets are left out (Settings → WooCommerce). Edit it like any other class:

| Selector | What it is |
| --- | --- |
| `.woo-notices` | the element around the notices; hidden while there is no notice |
| `.wc-block-components-notice-banner` | one notice |
| `.is-success`, `.is-error`, `.is-info` | the kind of notice, on the same element |
| `.wc-block-components-notice-banner > svg` | the notice icon |
| `.wc-block-components-notice-banner__content` | the text, which may contain a link |

The style reads the custom properties `--woo-notice-bg`, `--woo-notice-color`, `--woo-notice-success-bg`, `--woo-notice-success`, `--woo-notice-error-bg` and `--woo-notice-error`, so you can match your colours without touching the rules.

## Customizing the starters

WooCommerce's field and button names, and the few WooCommerce classes in the starters (those without the `woo-` prefix, such as `ajax_add_to_cart`, `orderby`, `country_to_state` or `sku`), carry the behaviour, because WooCommerce reads them. The `woo-…` classes carry only the look: rename, change or add them freely.

Pick the approach by how much the result should differ:

| You want | Do this |
| --- | --- |
| One look for the whole shop | Edit the starter's classes directly. They are your styles after installing, and Etch updates do not change them. |
| The same checkout with a small variation, such as a compact layout | Add a modifier class to the component's root, for example `woo-checkout--compact`, and style only the differences under it. The base classes stay as they are. |
| A checkout with a different structure | Change the component's structure, or build your own from the Checkout element and its pieces. |

**No starter rule outweighs one class.** Each starter style targets a single class, and everything nested in it (child elements, states, WooCommerce's markup) sits in `:where()`. A class of your own on the same element therefore overrides the starter as long as it comes later in the stylesheet, which is the case for classes you create after installing.

Avoid stacking extra classes on top of the starter's classes only to override them. The CSS then exists twice and it becomes unclear which rule wins.
