---
title: Introduction to Components
sidebar_position: 0
---

# Components in Etch

Components are the fundamental building blocks of modern web development. They are reusable, self-contained elements or groups of elements that can be combined to create complex layouts and functionality.

Each component is a self-contained chunk of code that handles a specific part of your website’s look or functionality, and you can use it many times across different pages and areas of your site. It can render the same content over and over again, or each instance can render unique content.

Here are some examples of common components:

**Header:** The top bar with your logo, navigation (Shop, About, Contact), and perhaps a CTA. It's built once and reused on every page for consistent navigation.

**Footer:** The bottom section with contact info, social media links, and perhaps a newsletter signup.

**Cards:** Product displays showing a product's image, name, and price. You reuse the same card design for every product on your site, perhaps with different variations or attributes.

**Call to Action Areas (CTAs):** Promotional banners with special offers, discount codes, or limited-time deals. These components can be reused across your site to highlight sales, new products, or seasonal promotions.

**Buttons:** Interactive elements that trigger actions like form submissions, navigation, or data processing. These components can be customized with different styles, sizes, and behaviors while maintaining consistent design patterns across your site.

:::info
Many traditional builders refer to components (like the header and footer, but even other types of components) as "templates." This is incorrect & confusing nomenclature and is an architectural disaster. Components and templates are two very different things. If you come from the world of page building, it's important to retrain your brain to understand components separately from templates.
:::


## Why components are useful

- **Reusability:** Create a component once and use it throughout your site. A card component, for example, can be used for products, services, or blog post previews with different content and styling.

- **Consistency:** Components ensure consistent design and behavior across your site. When you update a component, all instances automatically reflect the changes.

- **Maintainability:** Breaking your UI into components makes your project more organized and easier to maintain because each important part of your site has a single source of truth.

- **Scalability:** Components make it easy to add new features or pages by combining existing components in new ways.

## How components handle data

Props control how each instance of a component renders and behaves and the unique content that's passed into key areas of your component. 

For example, if you have a card for displaying information for a service, you wouldn't want every card to repeat the same service name. The only way a component is useful is if each component instance can display a different service.

To make this work, you create a "prop" (property) for the name of the service, like `serviceName`, and then you plug that prop into the heading area of the card. Now, when you add a service card component, you fill out the field for service-name and the component will display the correct service name.

A text prop like this is essentially a placeholder for whatever text content you want to add.

We'll talk more about data props later.

## How components can have variations

Props also allow you to control how a component behaves. 

For example, let's say you're creating a card component for e-commerce products. You want to make sure that when a product is on sale, you can display an "on sale" badge.

You can create a boolean prop (there are many different prop types to help you accomplish your goals) called `onSale`. Boolean props resolve to true or false. You can then create your "on sale" badge and place it inside a conditional logic element in Etch. This conditional logic element can check the value of `onSale` and show the badge if it's true and hide it if it's false.

We'll talk more about boolean props and component variants later.

## Conclusion

Whether you're building a simple landing page or a complex e-commerce site, components will help you organize your code, maintain consistency, and deliver a better developer experience. The reusability and maintainability that components offer make them an essential tool in any web developer's toolkit.

## Next steps

Now that you understand the basics of components, here are the next steps to continue your learning journey:


