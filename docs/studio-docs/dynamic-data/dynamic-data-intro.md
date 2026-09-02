---
title: Dynamic Data Intro
sidebar_position: 1
---


# Getting Started With Dynamic Data

Dynamic data is the foundation of proper content management in modern web design. They allow you to pull content from various sources and display it dynamically throughout your website.

For example, let's say you're building a website for a plumbing company that wants to list their services and create individual pages for each service. 

Instead of manually creating each service listing and page, you can create a template that controls what all service pages look like, create a component for what all service cards are supposed to look like (which you would place in a [loop](/loops/basic-loops)), and then use dynamic data to automatically pull all the service content into the templates and cards.

This is proper, scalable, maintainable modern web design and content management.

**Without dynamic data, you'd need to:**
- Create individual cards for each service listing
- Manually create separate pages for each service
- Duplicate styling and structure for each service
- Risk inconsistencies between service pages
- Manually update content when new services are added

**With dynamic data:**
- Create one card component
- Create on loop
- Create one template
- Have centralized control over all structure, styling, and content from one place.

## Benefits of Dynamic Data

- **Centralized Content Management**: All your content lives in Content Manager, making it easy to update, organize, and maintain. No more scattered content across multiple pages and areas of your site.

- **Automatic Updates**: When you update content, all pages using that content automatically reflect the changes. No manual updates required.

- **Scalability**: Add new content (posts, products, services) and it automatically appears on your site without additional development work.

- **Consistency**: Templates ensure all content follows the same structure and styling, maintaining brand consistency across your entire site.

- **Performance**: Dynamic data is loaded efficiently, only pulling the content that's actually needed for each page.

- **Flexibility**: Display the same content in multiple ways - as cards, lists, grids, or detailed pages - all from the same data source.

## Next Steps

Now that you understand why it's important to use dynamic data, let's talk about how to use it in Etch.

