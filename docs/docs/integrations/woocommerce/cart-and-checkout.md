---
title: Cart and checkout
sidebar_position: 5
---

# Cart and checkout

The cart and the checkout are built from roles (see [How roles work](./woocommerce.md#how-roles-work)). The **Woo Cart** and **Woo Checkout** starters contain complete, working versions you can restyle.

## Cart roles

| Role | Element | What it does |
| --- | --- | --- |
| `cart` | any container | A cart region; marked busy while a change is saved |
| `cart-empty`, `cart-filled` | container | Shown when the cart is empty or has items |
| `cart-count`, `cart-subtotal`, `cart-total`, `cart-shipping`, `cart-discount`, `cart-tax` | text | Live values |
| `cart-error` | `p` | The last error, hidden otherwise |
| `cart-line` | `li` with `data-etch-woo-id="{item.key}"` | One cart line; hidden once it leaves the cart |
| `line-name`, `line-price`, `line-total` | text inside a line | Line values |
| `line-quantity` | `input` | Changes the quantity; read-only for products that can be bought only once, such as bookings, and limited to the minimum, maximum and step WooCommerce allows |
| `quantity-step` | `button` with `data-etch-woo-step="1"` or `"-1"`, inside the line | Raises or lowers the line's quantity by one step; disabled at the minimum or maximum and while the quantity is read-only. Never goes below 1: removing is `line-remove`'s job |
| `line-remove` | `button` | Removes the line |
| `coupon-code`, `coupon-apply`, `coupon-remove` | input and buttons | Coupons |
| `checkout-link` | `a` | Link to the checkout |
| `cart-toggle` | checkbox with `data-etch-woo-id` = product ID | Adds one of the product when checked, removes it when unchecked. Disabled for products with their own add to cart form, such as bookings |
| `cart-drawer`, `drawer-open`, `drawer-close` | `aside` and buttons | A cart drawer; it also opens after a product form added a product |
| `shipping-form`, `shipping-country`, `shipping-state`, `shipping-postcode`, `shipping-city`, `shipping-update` | form and fields | Shipping calculator. Woo Cart folds the address fields into a closed `<details>` (**Calculate shipping**) and keeps the rates visible. It follows WooCommerce's settings: without **Enable the shipping calculator on the cart page** (WooCommerce → Settings → Shipping → Options) the address fields are left out, and a cart that needs no shipping shows no shipping box. Conditions on `woo.shipping.calculator` and `woo.cart.needs_shipping` do this. |
| `shipping-rates`, `shipping-package`, `shipping-rate` | containers and radios | Choose a shipping rate |

## Checkout roles

| Role | Element | What it does |
| --- | --- | --- |
| `checkout` | `form` | The checkout form; the roles below sit inside it |
| `field`, `field-error` | container and `p` | One field, named with `data-etch-woo-field` (for example `billing_address.first_name`), and its error |
| `shipping-fields` | container | Shown when the customer ships to a different address |
| `payment-methods`, `express-payments` | container | The payment methods, rendered by their payment plugins |
| `checkout-area` | container, `data-etch-woo-id` = checkout block area | Shows every block plugins add to that area, such as legal checkboxes or newsletter opt-ins |
| `checkout-block` | container, `data-etch-woo-id` = block name | Shows one plugin block |
| `checkout-slot` | container, `data-etch-woo-id="order-meta"` | WooCommerce's slot for plugin notices |
| `checkout-error` | `p` | Errors of the order |
| `place-order` | `button` | Places the order |

A cart region may sit next to the checkout form, but the place order button, areas and slots must be inside the form. To show the order button in a summary sidebar, make the sidebar part of the form.

## Store notices

WooCommerce's notices ("added to your cart", "out of stock", coupon and shipping messages) come from the **Store Notices** block. Etch's templates do not print them: the page decides where they go.

- **Woo Cart** and **Woo Checkout** bring them in an element named **Notices** with the class `woo-notices`, under the page title. Move that element to show the notices somewhere else.
- **Your own cart or checkout page**, or WooCommerce's own Cart or Checkout block, needs them too. Use **Add Store Notices** in the element bar; the builder shows a warning while a page with shop elements has none.

Every cart and checkout page needs the notices. WooCommerce keeps error notices until a page prints them, and while one is stored, the checkout refuses to place the order.

### Styling the notices

The notices are WooCommerce's markup, so you style them through their classes. The `woo-notices` style that comes with the starters covers them, and it keeps working when WooCommerce's stylesheets are left out (Settings → WooCommerce). Edit it like any other class:

| Selector | What it is |
| --- | --- |
| `.woo-notices` | the Notices element; hidden while there is no notice |
| `.wc-block-components-notice-banner` | one notice |
| `.is-success`, `.is-error`, `.is-info` | the kind of notice, on the same element |
| `.wc-block-components-notice-banner > svg` | the notice icon |
| `.wc-block-components-notice-banner__content` | the text, which may contain a link |

The style reads the custom properties `--woo-notice-bg`, `--woo-notice-color`, `--woo-notice-success-bg`, `--woo-notice-success`, `--woo-notice-error-bg` and `--woo-notice-error`, so you can match your colours without touching the rules.

## Customizing the starters

The roles carry the behaviour, the classes only the look. You can rename, change or add classes on a starter without breaking anything, as long as the `data-etch-woo-role` attributes stay.

Pick the approach by how much the result should differ:

| You want | Do this |
| --- | --- |
| One look for the whole shop | Edit the starter's classes directly. They are your styles after installing, and Etch updates do not change them. |
| The same checkout with a small variation, such as a compact layout | Add a modifier class to the component's root, for example `woo-checkout--compact`, and style only the differences under it. The base classes stay as they are. |
| A checkout with a different structure | Install a copy (**Install a copy** in Settings → WooCommerce) and change its structure. |

**No starter rule outweighs one class.** Each starter style targets a single class, and everything nested in it (child elements, states such as `:read-only`, WooCommerce's notice markup) sits in `:where()`. A class of your own on the same element therefore overrides the starter as long as it comes later in the stylesheet, which is the case for classes you create after installing.

Avoid stacking extra classes on top of the starter's classes only to override them. The CSS then exists twice and it becomes unclear which rule wins.

**Copies share classes.** A copy of a starter uses the same class names as the original, because the installer reuses classes that already exist and keeps their CSS. Changing a class therefore changes the original and the copy. Rename the classes in the copy (for example `woo-checkout-b__…`) or use a modifier class when the two should look different.

**One checkout page.** WooCommerce has one checkout page, and payment plugins rely on it. To offer different checkouts, put them on that page and switch between them with conditions, for example on what the cart contains.

## Recipe: order bump

An order bump offers one extra product in the cart or the checkout. Everything except the checkbox is your own markup:

```html
<div class="bump">
  <input type="checkbox" id="bump" data-etch-woo-role="cart-toggle" data-etch-woo-id="94" />
  <label for="bump">
    <span>Add to your order</span>
    <strong>A bottle of Brìo</strong>
    <span>+ 5,99 €</span>
  </label>
</div>
```

The checkbox is checked exactly when the cart holds product 94. Removing the product in the cart or the drawer unchecks it.
