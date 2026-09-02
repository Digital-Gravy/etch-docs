---
title: Etch's Philosophy
sidebar_position: 1
---

# A New Era of Responsive Development

Every other builder in current existence promotes a traditional media query workflow with device-oriented "breakpoints." 

Etch, on the other hand, promotes a **container-query-first workflow**. 

This isn't just a technical difference — it's a fundamental shift in how we think about building responsive websites. And it's important for you to understand it so that you're comfortable with the approach and the interface differences.

### The Problem with Media Queries

Media queries ask: "How big is the screen?"

Container queries ask: "How much space is available for the elements?"

This subtle difference is actually massive. With over 2,300 unique device sizes on the modern web, trying to optimize for "standard breakpoints" is increasingly meaningless. 

Additionally, a card that works perfectly in your main content area might look terrible when dropped into a grid. Media queries can't solve this problem because they only know about the viewport, not the component's actual context and location on the page. 

### Why Container Queries Are Better

Container queries let your components adapt to their actual available space, regardless of where they're placed and regardless of the device being used. 

This means:
- **Truly reusable components** that work anywhere
- **No more breakpoint guessing** or arbitrary device sizes
- **Better performance** with fewer media queries
- **More logical responsive behavior**

Container queries solve the problem of context-based-responsiveness while simultaneously solving the problem of device-based-responsiveness. It's the best of both worlds and the future of modern responsive development.

## The Absence of Traditional "Breakpoints" in Etch

If you're used to seeing predefined breakpoints (like "Mobile: 768px, Tablet: 1024px"), you won't find them in Etch. Here's why:

**Container queries don't need global breakpoints.** Each component or Block defines its own responsive behavior based on its actual context. 

A card might switch layouts at 412px, while a navigation might adapt at 322px. The numbers chosen are based on the dimensions that make sense for that specific component, which is the most logical and appropriate way to build responsive websites.

Breakpoints are from Era 1, 2, and 3 of web development. Etch is an Era 4+ tool that isn't interested in copying and promoting outdated, illogical, and clearly inferior approaches to building websites.

## Making the Adjustment

The container-query-first workflow creates a small learning curve when you're first transitioning to it, but the benefits are well worth the adjustment.

And when I say that it's a small learning curve, I really mean it. Container queries use the exact same syntax as media queries and we're working very hard to make sure they're as easy as possible to implement in Etch.

To help make your transition feel effortless, here are three tips:

1. **Think component-first**: Instead of "mobile vs desktop," think "how should this component/block adapt to its space?"
2. **Embrace the flexibility**: Your components will work in more contexts than ever before
3. **Trust the process**: The discomfort will fade as you see how much more logical this approach is

The modern web demands this shift. Container queries are the future of responsive design, and Etch is built to help you embrace that future.

## Recommended Further Reading

For a deeper dive into container queries vs media queries and the reasoning behind this shift, check out [Container Queries vs Media Queries: A New Era of Responsive Web Design](https://geary.co/container-queries-vs-media-queries-a-new-era-of-responsive-web-design/) by Etch's founder, Kevin Geary.