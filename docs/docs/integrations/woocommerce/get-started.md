---
title: Get started with WooCommerce
sidebar_position: 2
---

# Get started with WooCommerce

This page walks through setting up a shop with Etch: what you need, what Etch does by itself once WooCommerce is active, and how to add the ready-made cart and checkout.

## Requirements

- Etch and the Etch theme.
- WooCommerce, with its setup finished so that the Shop, Cart, Checkout and My account pages exist (WooCommerce → Settings → Advanced lists them).

There is nothing to switch on. The integration starts as soon as both Etch and WooCommerce are active.

## What happens when WooCommerce is active

Etch adds the integration and leaves your content alone. Nothing is created or placed in your pages.

| Where | What you get |
| --- | --- |
| Dynamic data | `this.woo` on products, and `woo.cart`, `woo.checkout`, `woo.account` and `woo.order` everywhere. See [Product data and loops](./product-data.md). |
| Loops | The **WooCommerce Products** loop type. |
| Elements | **Add WooCommerce Hook** and **Add Store Notices** in the element bar; one element per shop role in the command bar (search "woo"). |
| Templates | A **WooCommerce** group in the template hub with cart, checkout, order confirmation, product search, category, tag and attribute archives. Single product and shop archive are under **Products**. See [Shop pages and templates](./shop-pages.md). |
| Settings | A **WooCommerce** tab in Etch's settings. |
| Site Health | Checks for the Etch checkout (Tools → Site Health). |

Your shop keeps working as before. The cart and checkout pages show WooCommerce's own blocks inside the Etch theme's frame until you replace them.

The template hub lists the templates the theme and WooCommerce provide. When you open it, Etch saves them as editable templates, so they appear in the list.

## Add the cart, checkout and account

The **Woo Cart**, **Woo Checkout** and **Woo Account** starters are complete, working designs built from the shop roles and dynamic data. They are never installed automatically, and Etch never removes WooCommerce's blocks or shortcodes by itself: you install the starters when you want them, and after that they are your own components.

Install them under **Settings → WooCommerce → Starters** in the builder. Each starter has an **Install** button. Installing saves your unsaved changes and then reloads the builder, so it knows the new components and styles.

### 1. Install the cart

Leave **Put it on WooCommerce's cart page** checked and click **Install** next to **Woo Cart**. This adds the components **Woo Cart**, **Woo Cart Lines**, **Woo Cart Totals**, **Woo Cart Shipping**, **Woo Cart Drawer** and **Woo Cart Button**, together with their styles, and puts **Woo Cart** on WooCommerce's cart page in place of WooCommerce's Cart block, inside a section and container with the page title as heading. The component holds only the cart; the section, container and title are ordinary elements of the page. The page's previous content is kept, so you can go back. Uncheck the option to only add the components and place **Woo Cart** yourself.

Then put **Woo Cart Button** and **Woo Cart Drawer** in your header, so every page has the cart count and the drawer.

### 2. Install the checkout

Leave **Put it on WooCommerce's checkout page** checked and click **Install** next to **Woo Checkout**. This adds the checkout components and puts **Woo Checkout** on WooCommerce's checkout page, framed the same way, together with a hidden carrier block, which lets payment plugins load their checkout code. The page's previous content is kept, so you can go back. Uncheck the option to only add the components and place **Woo Checkout** yourself.

### 3. Install the account

Leave **Put it on WooCommerce's My account page** checked and click **Install** next to **Woo Account**. This adds **Woo Account**, **Woo Account Nav** and **Woo Account Dashboard** and puts **Woo Account** on the My account page, framed like the cart. Customers get a menu of the account pages and a dashboard with their latest orders and addresses; the other account pages and the login for guests stay WooCommerce's, styled by the starter. See [My account](./account.md).

### 4. Check the result

- Add a product to the cart: the cart count, the drawer and the cart page update together.
- Open the checkout: your payment methods and any blocks plugins add (legal checkboxes, newsletter opt-ins) are there.
- Tools → Site Health shows no Etch checkout warnings.

## Good to know

- **Starters belong to you after installing.** Restyle and change them like any component. Updating Etch does not change installed starters.
- **Update, Reinstall and Remove.** The settings show which version is installed and when a newer one ships. **Update** (or **Reinstall**) removes the installed starter, copies included, and installs the shipped version afresh, placed again where it was. **Remove** deletes its components and the styles it created and puts back what its page held. Both ask first and say which components you changed since installing and where else they are used, because **your changes to the starter are lost**.
- **Install a copy** creates a second set of components with new keys (`WooCart1`, …) next to the first.
- **With WP-CLI**, the same works from the command line: `wp etch starter install woo-cart --place`, `wp etch starter install woo-checkout --place`, `--new-copy` for a copy, `wp etch starter update woo-cart --place`, `wp etch starter remove woo-cart` (`--force` when other content uses it) and `wp etch starter list` for what is installed.
- **Existing styles win.** If your site already has a class with the same selector as a starter style, the starter uses your class and keeps its CSS.
- **Your own design instead of a starter.** Everything the starters do is available as shop roles. Start from an empty page and use the elements from the command bar. See [Cart and checkout](./cart-and-checkout.md) and [Product pages](./product-pages.md).
- **Keeping WooCommerce's Cart or Checkout block?** Add **Store Notices** to that page. Etch's templates print none, and the checkout refuses orders while an error notice is stored. See [Store notices](./cart-and-checkout.md#store-notices).
- **WooCommerce's styles.** Once your templates style the shop themselves, you can leave WooCommerce's stylesheets out under Settings → WooCommerce.
