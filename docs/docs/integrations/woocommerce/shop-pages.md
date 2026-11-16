---
title: Shop pages and templates
sidebar_position: 2
---

# Shop pages and templates

A WooCommerce shop has two kinds of screens: **pages** that exist once (cart, checkout, account) and **templates** that WordPress fills with whatever is shown (a product, a category, the shop). Etch follows WordPress here.

**Rule of thumb:** the page holds the content, the template is the frame around it.

## Where you edit what

| Screen | Edit the content in | Frame (header, footer, `main`) |
| --- | --- | --- |
| Cart | the **Cart page** (WooCommerce → Settings → Advanced) | template **Cart** (`page-cart`) |
| Checkout | the **Checkout page** | template **Checkout** (`page-checkout`) |
| My account | the **My account page** | your normal page template (`page`) |
| Order confirmation | template **Order Confirmation** (`order-confirmation`) | the same template |
| Single product | template **Single Product** (`single-product`) | the same template |
| Shop | template **Products Archive** (`archive-product`) | the same template |
| Product category | template **Product Category Archive** (`taxonomy-product_cat`), or one per category such as `taxonomy-product_cat-wine` | the same template |
| Product search | template **Product Search Results** | the same template |

The templates are listed in the template hub under **WooCommerce**. Single product and shop archive are under **Products**.

## Cart and checkout

WooCommerce shows its cart and checkout pages through the templates **Cart** and **Checkout**, whatever template the page itself selects. Keep those templates as a frame: header, a `main` element with the post content inside it, footer.

```html
<SiteHeader />
<main id="main" class="site-main">
  {post content}
</main>
<SiteFooter />
```

The cart or checkout itself goes into the page. Installing a starter with placement does exactly that: the checkout component lands in the checkout page, and the frame stays in the template.

A frame of its own is useful for the checkout. Give the **Checkout** template a reduced header (logo, help link, no navigation) and the checkout page keeps its content.

### WooCommerce's own cart or checkout

Etch's builder offers no element for WooCommerce's original Cart and Checkout blocks, because the roles and starters replace them. If a plugin needs WooCommerce's own cart or checkout:

1. Open the cart or checkout page in the block editor (Pages → Cart → Edit).
2. Delete every block on the page. On the checkout page this includes the Checkout block that is already there: it is the hidden carrier of Etch's checkout and stays empty on the frontend.
3. Add a new **Cart** or **Checkout** block from WooCommerce and save.

The template stays the frame around it.

## Order confirmation

The order confirmation is not a page. WooCommerce shows it at the end of the checkout URL (`/checkout/order-received/…`), so its content lives in the template **Order Confirmation**. Read the order from `woo.order`.

## Pages with their own frame

Any page can get a different frame. Create a custom template (for example "Legal" with a side navigation, or "Focus" without header and footer) and choose it in the page settings. The content stays in the page.

## Templates come back

Etch keeps the templates that the theme and plugins provide. If you delete one, Etch creates it again the next time you open the builder, with the default content of the theme or plugin. Delete only templates you created yourself. To use a different frame for a WooCommerce screen, edit its template instead.
