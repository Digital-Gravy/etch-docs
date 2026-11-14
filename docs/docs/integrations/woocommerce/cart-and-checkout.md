---
title: Cart and checkout
sidebar_position: 3
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
| `line-quantity` | `input` | Changes the quantity |
| `line-remove` | `button` | Removes the line |
| `coupon-code`, `coupon-apply`, `coupon-remove` | input and buttons | Coupons |
| `checkout-link` | `a` | Link to the checkout |
| `cart-toggle` | checkbox with `data-etch-woo-id` = product ID | Adds one of the product when checked, removes it when unchecked |
| `cart-drawer`, `drawer-open`, `drawer-close` | `aside` and buttons | A cart drawer; it also opens after a product form added a product |
| `shipping-form`, `shipping-country`, `shipping-state`, `shipping-postcode`, `shipping-city`, `shipping-update` | form and fields | Shipping calculator |
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
