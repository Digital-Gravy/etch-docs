---
title: Integrations
---

# Integrations

This section covers various integrations available in Etch, allowing you to extend functionality and connect with other systems and plugins.

## Available Integrations

Most third-party custom field plugins are supported since you can access any custom field using the `this.meta` namespace. However, sometimes data is stored in a more specialized or structured way, and we provide specific documentation for those plugins to make it easier to work with their data.

For example, you can access all ACF data using the `this.acf` namespace. Their data is stored in a more structured way, so we output all that info nested under `this.acf`.

WooCommerce has its own integration: product, cart and account data under `woo`, product loops, and roles that turn your own markup into a live cart, checkout and product form. See [WooCommerce](./woocommerce/woocommerce.md).
